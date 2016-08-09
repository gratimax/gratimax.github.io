(ns blog.util
  (:require [clj-time.format :as tf]))

(def time-format (tf/formatter "YYYY-MM-dd"))
(def human-format (tf/formatter "MMMM d, YYYY"))
(def url-format (tf/formatter "YYYY/MM/dd"))

(defn time-parse [time]
  (tf/parse time-format time))

(defn time-unparse [time]
  (tf/unparse human-format time))

(defn time-unparse-url [time]
  (tf/unparse url-format time))

(defn map-values [f m]
  (into {}
        (for [[k v] m]
          [k (f v)])))

(defn map-kv [f m]
  (into {}
        (for [[k v] m]
          (f k v))))