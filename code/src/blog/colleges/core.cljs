(ns blog.colleges.core
  (:require [blog.colleges.list :refer [colleges-list]]
            cljsjs.d3))


(enable-console-print!)

(defn mk-date [[month day year]]
  (js/Date. (+ 2000 year) (- month 1) day))

(defn mk-date-vector [date]
  [(+ (.getMonth date) 1) (.getDate date) (- (.getFullYear date) 2000)])

(defn add-days [d days]
  (let [new-date (js/Date. d)]
    (.setDate new-date (+ (.getDate d) days))
    new-date))

(defn augment-date-extent [date-extent]
  #js [(add-days (aget date-extent 0) -3)
       (add-days (aget date-extent 1) 3)])

(def colleges-dates
  (->> colleges-list
       (map (comp mk-date :date))
       (into-array)))

(def full-date-extent (augment-date-extent (js/d3.extent colleges-dates)))

(def first-date (aget full-date-extent 0))
(def last-date (aget full-date-extent 1))

(def last-or-current-date (min (js/Date.) last-date))

(def colleges-graph
  (let [graph-existing
        (->> colleges-list
             (reductions
               (fn [acc college]
                 (-> acc
                     (assoc :date (mk-date (:date college)))
                     (update (:status college) inc)))
               {:accept 0 :waitlist 0 :reject 0})
             (next)
             (take-while #(not (:upcoming %))))
        last-point (merge (last graph-existing) {:date last-or-current-date :cur-day true})]
    (into-array (concat graph-existing [last-point]))))

(def viz (js/d3.select "#viz"))
(def viz-node (.node viz))
(def d3-window (js/d3.select js/window))

(def viz-width (.attr viz "width"))
(def viz-height (.attr viz "height"))

(defn in-bounds [x y]
  (and (< 0 x viz-width) (< 0 y viz-height)))

(def time-format (js/d3.time.format "%d %b %y"))

(def x-scale
  (-> (js/d3.time.scale)
      (.domain full-date-extent)
      (.range #js [0 (- viz-width 0)])))

(def y-scale-above
  (-> (js/d3.scale.linear)
      (.domain #js [0 10])
      (.range #js [(/ viz-height 2) 0])))

(def y-scale-below
  (-> (js/d3.scale.linear)
      (.domain #js [0 10])
      (.range #js [(/ viz-height 2) viz-height])))

(defn make-axes []
  (let [x-axis (-> (js/d3.svg.axis)
                   (.scale x-scale)
                   (.ticks 0)
                   (.outerTickSize 0))]
    (-> viz
        (.append "g")
        (.attr "class" "x axis")
        (.attr "transform" (str "translate(0, " (/ viz-height 2) ")"))
        (.call x-axis))))

(def upcoming-dates
  (->> colleges-list
       (filter #(= (:status %) :upcoming))
       (map :date)
       (distinct)
       (map mk-date)))

(defn make-upcoming-rect []
  (let [last-of-graph (last colleges-graph)
        min-x (x-scale (:date last-of-graph))
        max-x (x-scale (last colleges-dates))
        dx (- max-x min-x)
        min-y (y-scale-above (:accept last-of-graph))
        max-y (y-scale-below (+ (:waitlist last-of-graph) (:reject last-of-graph)))
        dy (- max-y min-y)]
    (-> viz
        (.append "rect")
        (.attr "class" "area upcoming")
        (.attr "x" min-x)
        (.attr "y" min-y)
        (.attr "width" dx)
        (.attr "height" dy))
    (doseq [date upcoming-dates
            :let [x (x-scale date)]]
      (-> viz
          (.append "line")
          (.attr "class" "college-upcoming-line")
          (.attr "x1" x)
          (.attr "y1" min-y)
          (.attr "x2" x)
          (.attr "y2" max-y)))))

(defn make-areas []
  (let [accept-area (-> (js/d3.svg.area)
                        (.x #(x-scale (:date %)))
                        (.y0 (constantly (y-scale-above 0)))
                        (.y1 #(y-scale-above (:accept %)))
                        (.interpolate "step-after"))
        reject-area (-> (js/d3.svg.area)
                        (.x #(x-scale (:date %)))
                        (.y0 #(y-scale-below (:waitlist %)))
                        (.y1 (fn [d]
                               (y-scale-below (+ (:waitlist d) (:reject d)))))
                        (.interpolate "step-after"))
        waitlist-area (-> (js/d3.svg.area)
                          (.x #(x-scale (:date %)))
                          (.y0 (constantly (y-scale-below 0)))
                          (.y1 #(y-scale-below (:waitlist %)))
                          (.interpolate "step-after"))]
    (-> viz
        (.append "path")
        (.datum colleges-graph)
        (.attr "class" "area accept")
        (.attr "d" accept-area))
    (-> viz
        (.append "path")
        (.datum colleges-graph)
        (.attr "class" "area reject")
        (.attr "d" reject-area))
    (-> viz
        (.append "path")
        (.datum colleges-graph)
        (.attr "class" "area waitlist")
        (.attr "d" waitlist-area))
    (make-upcoming-rect)))

(defn make-current-day []
  (let [x-pos (x-scale last-or-current-date)]
    (-> viz
        (.append "line")
        (.attr "class" "current-day")
        (.attr "stroke-dasharray" "5, 5")
        (.attr "x1" x-pos)
        (.attr "y1" 0)
        (.attr "x2" x-pos)
        (.attr "y2" viz-height))))

(def hover-line (atom nil))

(defn add-to-hover-line [g date]
  (-> g
      (.append "line")
      (.attr "x1" 0)
      (.attr "x2" 0)
      (.attr "y1" 0)
      (.attr "y2" viz-height))
  (-> g
      (.append "text")
      (.text (time-format date))
      (.attr "y" 20))
  g)

(def human-status
  {:accept   "Accepted!"
   :reject   "Rejected"
   :waitlist "Waitlisted"
   :upcoming "Upcoming"})

(defn set-college-result [sel]
  (-> sel
      (.attr "class" (fn [d]
                       (str "college-result " (name (:status d)))))
      (.text (fn [d]
               (str (:name d) " (" (human-status (:status d)) ")")))
      (.attr "y" (fn [d i] (+ 40 (* 20 i))))))

(def results-by-date (group-by :date colleges-list))

(defn set-hover-line-colleges [g date]
  (let [colleges-on-day (or (results-by-date (mk-date-vector date)) [])
        sel (-> g
                (.selectAll "text.college-result")
                (.data (into-array colleges-on-day)))]
    (set-college-result sel)
    (-> sel
        (.exit)
        (.remove))
    (-> sel
        (.enter)
        (.append "text")
        (set-college-result))))

(defn get-hover-date [x]
  (let [corresponding-date (.invert x-scale x)]
    (last (take-while #(<= % corresponding-date) colleges-dates))))

(defn delete-hover []
  (when-let [cur-line @hover-line]
    (.remove cur-line)
    (reset! hover-line nil)))

(defn make-hover [date]
  (let [line-x (x-scale date)
        anchor-start? (< line-x (/ viz-width 2))
        cur-line @hover-line
        cur (or cur-line (-> viz
                             (.append "g")
                             (add-to-hover-line date)))]
    (-> cur
        (.transition)
        (.duration 500)
        (.ease "elastic")
        (.attr "transform" (str "translate(" line-x ",0)"))
        (.attr "class"
               (str "hover"
                    (if anchor-start?
                      " anchor-start"
                      "")))
        (.select "text")
        (.text (time-format date)))
    (set-hover-line-colleges cur date)
    (-> cur
        (.selectAll "text")
        (.attr "x" (if anchor-start? 5 -5)))
    (reset! hover-line cur)))

(defn listen-to-mouse []
  (.on d3-window "mousemove"
       (fn []
         (let [[x y] (js->clj (js/d3.mouse viz-node))]
           (if (in-bounds x y)
             (if-let [hover-date (get-hover-date x)]
               (make-hover hover-date)
               (delete-hover))
             (delete-hover))))))

(make-areas)
(make-axes)
(make-current-day)
(listen-to-mouse)