(ns blog.d3
  (:require cljsjs.d3))

(defn- doprops [obj prop-map props]
  (doseq [[k v] (partition 2 props)
          :let [prop (prop-map k)]]
    (prop obj v))
  obj)

(defn extent [l]
  (js->clj (js/d3.extent (clj->js l))))

(defn select
  ([selector] (js/d3.select selector))
  ([sel selector] (.select sel selector)))

(def window (select js/window))

(defn selectAll
  ([selector] (js/d3.selectAll selector))
  ([sel selector] (.selectAll sel selector)))

(defn data [sel d]
  (.data sel (into-array d)))

(defn datum [sel d]
  (.datum sel (into-array d)))

(defn attr [sel k]
  (.attr sel (name k)))

(defn node [sel]
  (.node sel))

(defn attrs [sel & props]
    (doseq [[k v] (partition 2 props)
            :let [n (name k)]]
      (.attr sel n v))
  sel)

(defn text [sel t]
  (.text sel t))

(defn append [sel elem]
  (.append sel (name elem)))

(defn on [sel evt f]
  (.on sel (name evt) f))

(defn remove [sel]
  (.remove sel))

(defn exit [sel]
  (.exit sel))

(defn enter [sel]
  (.enter sel))

(defn call [sel f]
  (.call sel f))

(defn translate [x y]
  (str "translate(" x ", " y ")"))

(defn time-format [format]
  (js/d3.time.format format))

(defn mouse [container]
  (js->clj (js/d3.mouse container)))

(defn ease [trans easing]
  (.ease trans (name easing)))

(defn duration [trans dur]
  (.duration trans dur))

(def ^:private transition-props {:ease ease :duration duration})

(defn transition [sel & props]
  (doprops (.transition sel) transition-props props))

(defn domain [scale dom]
  (.domain scale (clj->js dom)))

(defn range [scale ran]
  (.range scale (clj->js ran)))

(def ^:private scale-props {:domain domain :range range})

(defn linear-scale [& props]
  (doprops (js/d3.scale.linear) scale-props props))

(defn time-scale [& props]
  (doprops (js/d3.time.scale) scale-props props))

(defn invert [scale x]
  (.invert scale x))

(defn scale [axis s]
  (.scale axis s))

(defn ticks [axis ts]
  (.ticks axis ts))

(defn outer-tick-size [axis sz]
  (.outerTickSize axis sz))

(def ^:private axis-props
  {:scale scale :ticks ticks :outer-tick-size outer-tick-size})

(defn axis [& props]
  (doprops (js/d3.svg.axis) axis-props props))

(defn x [area v]
  (.x area v))

(defn y0 [area v]
  (.y0 area v))

(defn y1 [area v]
  (.y1 area v))

(defn interpolate [area i]
  (.interpolate area (name i)))

(def ^:private area-props
  {:x x :y0 y0 :y1 y1 :interpolate interpolate})

(defn area [& props]
  (doprops (js/d3.svg.area) area-props props))