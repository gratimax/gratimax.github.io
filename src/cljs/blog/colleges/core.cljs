(ns blog.colleges.core
  (:require [blog.colleges.list :refer [colleges-list]]
            [blog.d3 :as d3]))

(enable-console-print!)

(defn mk-date [[month day year]]
  (js/Date. (+ 2000 year) (- month 1) day))

(defn mk-date-vector [date]
  [(+ (.getMonth date) 1) (.getDate date) (- (.getFullYear date) 2000)])

(defn add-days [d days]
  (let [new-date (js/Date. d)]
    (.setDate new-date (+ (.getDate d) days))
    new-date))

(def colleges-dates
  (map (comp mk-date :date) colleges-list))

(def full-date-extent
  (let [[min max] (d3/extent colleges-dates)]
    [(add-days min -3)
     (add-days max 3)]))

(def first-date (first full-date-extent))
(def last-date (second full-date-extent))

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
    (concat graph-existing [last-point])))

(def viz (d3/select "#viz"))
(def viz-node (d3/node viz))
(def d3-window (d3/select js/window))

(def viz-width (d3/attr viz :width))
(def viz-height (d3/attr viz :height))

(defn in-bounds [x y]
  (and (< 0 x viz-width) (< 0 y viz-height)))

(def time-format (d3/time-format "%d %b %y"))

(def x-scale
  (d3/time-scale :domain full-date-extent :range [0 viz-width]))

(def y-scale-above
  (d3/linear-scale :domain [0 10] :range [(/ viz-height 2) 0]))

(def y-scale-below
  (d3/linear-scale :domain [0 10] :range [(/ viz-height 2) viz-height]))

(defn make-axes []
  (let [x-axis (d3/axis :scale x-scale :ticks 0 :outer-tick-size 0)]
    (-> viz
        (d3/append :g)
        (d3/attrs :class "x axis"
                  :transform (d3/translate 0 (/ viz-height 2)))
        (d3/call x-axis))))


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
        (d3/append :rect)
        (d3/attrs :class "area upcoming"
                  :x min-x :y min-y :width dx :height dy))
    (doseq [date upcoming-dates
            :let [x (x-scale date)]]
      (-> viz
          (d3/append :line)
          (d3/attrs :class "college-upcoming-line"
                    :x1 x :y1 min-y :x2 x :y2 max-y)))))

(defn make-areas []
  (let [accept-area (d3/area :x #(x-scale (:date %))
                             :y0 (constantly (y-scale-above 0))
                             :y1 #(y-scale-above (:accept %))
                             :interpolate :step-after)
        reject-area (d3/area :x #(x-scale (:date %))
                             :y0 #(y-scale-below (:waitlist %))
                             :y1 (fn [d]
                                   (y-scale-below (+ (:waitlist d) (:reject d))))
                             :interpolate :step-after)
        waitlist-area (d3/area :x #(x-scale (:date %))
                               :y0 (constantly (y-scale-below 0))
                               :y1 #(y-scale-below (:waitlist %))
                               :interpolate :step-after)]
    (-> viz
        (d3/append :path)
        (d3/datum colleges-graph)
        (d3/attrs :class "area accept"
                  :d accept-area))
    (-> viz
        (d3/append :path)
        (d3/datum colleges-graph)
        (d3/attrs :class "area reject"
                  :d reject-area))
    (-> viz
        (d3/append :path)
        (d3/datum colleges-graph)
        (d3/attrs :class "area waitlist"
                  :d waitlist-area))
    (make-upcoming-rect)))

(defn make-current-day []
  (let [x-pos (x-scale last-or-current-date)]
    (-> viz
        (d3/append :line)
        (d3/attrs :class "current-day"
                  :stroke-dasharray "5, 5"
                  :x1 x-pos :y1 0 :x2 x-pos :y2 viz-height))))

(def hover-line (atom nil))

(defn add-to-hover-line [g date]
  (-> g
      (d3/append :line)
      (d3/attrs :x1 0 :x2 0 :y1 0 :y2 viz-height))
  (-> g
      (d3/append :text)
      (d3/text (time-format date))
      (d3/attrs :y 20))
  g)

(def human-status
  {:accept   "Accepted!"
   :reject   "Rejected"
   :waitlist "Waitlisted"
   :upcoming "Upcoming"})

(defn set-college-result [sel]
  (-> sel
      (d3/attrs :class (fn [d]
                         (str "college-result " (name (:status d))))
                :y (fn [d i] (+ 40 (* 20 i))))
      (d3/text (fn [d]
                 (str (:name d) " (" (human-status (:status d)) ")")))))

(def results-by-date (group-by :date colleges-list))

(defn set-hover-line-colleges [g date]
  (let [colleges-on-day (or (results-by-date (mk-date-vector date)) [])
        sel (-> g
                (d3/selectAll "text.college-result")
                (d3/data colleges-on-day))]
    (set-college-result sel)
    (-> sel
        (d3/exit)
        (d3/remove))
    (-> sel
        (d3/enter)
        (d3/append :text)
        (set-college-result))))

(defn get-hover-date [x]
  (let [corresponding-date (d3/invert x-scale x)]
    (last (take-while #(<= % corresponding-date) colleges-dates))))

(defn delete-hover []
  (when-let [cur-line @hover-line]
    (d3/remove cur-line)
    (reset! hover-line nil)))

(defn make-hover [date]
  (let [line-x (x-scale date)
        anchor-start? (< line-x (/ viz-width 2))
        cur-line @hover-line
        cur (or cur-line (-> viz
                             (d3/append :g)
                             (add-to-hover-line date)))]
    (-> cur
        (d3/transition :duration 500 :ease :elastic)
        (d3/attrs :transform (d3/translate line-x 0)
                  :class (str "hover"
                              (when anchor-start?
                                " anchor-start")))
        (d3/select "text")
        (d3/text (time-format date)))
    (set-hover-line-colleges cur date)
    (-> cur
        (d3/selectAll "text")
        (d3/attrs :x (if anchor-start? 5 -5)))
    (reset! hover-line cur)))

(defn listen-to-mouse []
  (d3/on d3/window :mousemove
         (fn []
           (let [[x y] (d3/mouse viz-node)]
             (if (in-bounds x y)
               (if-let [hover-date (get-hover-date x)]
                 (make-hover hover-date)
                 (delete-hover))
               (delete-hover))))))

(make-areas)
(make-axes)
(make-current-day)
(listen-to-mouse)