(ns blog.core
  (:require [clojure.string :as str]
            [stasis.core :as stasis]
            [optimus.prime :as optimus]
            [optimus.optimizations :as optimizations]
            [optimus.assets :as assets]
            [optimus.export :refer [save-assets]]
            [optimus.strategies :as strategies]
            [optimus-sass.core]
            [ring.middleware.content-type :refer [wrap-content-type]]
            [ring.middleware.default-charset :refer [wrap-default-charset]]
            [environ.core :refer [env]]
            [blog.markdown :as md]
            [blog.views :as views]
            [blog.util :as util :refer [map-values map-kv]]))

(def target-dir "resources/_public")

(def md-ext #"\.md$")

(def mode (env :site-mode "dev"))

;; TODO should refactor this into [stasis map] -> [blog] -> [stasis map]

(defn sanitize-name [name]
  (str/replace name md-ext "/"))

(let [post-info-reg #"^/([0-9]{4}-[0-9]{2}-[0-9]{2})-([^/]*)/$"]
  (defn get-post-info [url post]
    (let [group (re-find post-info-reg url)
          date-str (nth group 1)
          date (util/time-parse date-str)
          slug (nth group 2)]
      [(str "/" slug "/")
       (assoc post :date date
                   :slug slug)])))

(defn get-page-info [url page]
  [url (assoc page :slug (subs url 1 (dec (count url))))])

(defn filter-drafts [pages]
  (if (= mode "prod")
    (into {} (for [[url page] pages :when (not (:draft page))]
               [url page]))
    pages))

(defn markdown-files [pages info-fn]
  (->> pages
       (map-kv (fn [k v]
                 [(sanitize-name k) (md/md->html v)]))
       (map-kv (fn [k v]
                 (if (.endsWith k ".draft/")
                   [(str/replace k #"\.draft" "") (-> v
                                                      (assoc :draft true)
                                                      (update :title #(str % "*")))]
                   [k v])))
       (map-kv info-fn)
       (filter-drafts)
       (map-kv (fn [k v]
                 [k (assoc v :url k)]))))

(defn render-post [post]
  (fn [ctx]
    (views/post ctx post)))

(defn render-page [page]
  (fn [ctx]
    (views/page ctx page)))

(defn url-post-map->posts [posts]
  (->> posts
       (vals)
       (sort-by :date)
       (reverse)))

(defn get-static-pages [posts]
  {"/" (fn [ctx]
         (views/home ctx posts))})

(defn get-site []
  (let [url-post-map (markdown-files (stasis/slurp-directory "resources/posts" md-ext)
                                     get-post-info)
        url-page-map (markdown-files (stasis/slurp-directory "resources/pages" md-ext)
                                     get-page-info)
        posts (url-post-map->posts url-post-map)]
    (stasis/merge-page-sources
      {:posts  (map-values render-post url-post-map)
       :pages  (map-values render-page url-page-map)
       :static (get-static-pages posts)})))

(defn put-in-dir [dir assets]
  (map (fn [asset]
         (update asset :path #(str "/" dir %))) assets))

(defn get-assets []
  (concat
   (->>
    (assets/load-assets "styles" [#"/[^_].*\.scss$"])
    (put-in-dir "css"))
   (->>
    (assets/load-assets "built-cljs" [#"/.*\.js$"])
    (put-in-dir "js"))
  ;  [{:path "/CNAME"
  ;    :contents "gratimax.net"}]
   ))

(defn get-optimizations []
  (if (= mode "prod")
    optimizations/all
    optimizations/none))

;; this deserves a major refactor
(defn make-pages []
  (vals (markdown-files (stasis/slurp-directory "resources/pages" md-ext)
                        get-page-info)))

(def app
  (-> (stasis/serve-pages get-site
                          {:pages (make-pages)})
      (optimus/wrap get-assets
                    (get-optimizations)
                    strategies/serve-live-assets)
      (wrap-content-type)
      (wrap-default-charset "utf-8")))

(defn load-target-dir []
  (stasis/slurp-directory target-dir #"\.[^.]+$"))

(defn export []
  (let [app-assets (get-assets)
        pages (get-site)
        old-files (load-target-dir)]
    (stasis/empty-directory! target-dir)
    (save-assets ((get-optimizations) app-assets {}) target-dir)
    (stasis/export-pages pages target-dir {:optimus-assets app-assets
                                           :pages (make-pages)})
    (stasis/report-differences old-files (load-target-dir))))

(defn -main []
  (export))
