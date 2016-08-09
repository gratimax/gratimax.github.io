(ns blog.views
  (:require [clojure.java.io :as io]
            [clojure.string :as str]
            [optimus.link :as o]
            [hiccup.core :refer [h]]
            [hiccup.page :refer [html5 include-css include-js]]
            [blog.util :as util]
            [environ.core :refer [env]]))

(def menu-icon (slurp (io/as-file "resources/menu-icon.svg")))

(def site-url "https://gratimax.net")

(defn head [ctx title]
  [:head
   [:meta {:charset "utf-8"}]
   [:meta {:http-equiv "X-UA-Compatible" :content "IE=edge"}]
   [:meta {:name "viewport" :content "width=device-width, initial-scale=1"}]
   (include-css (o/file-path ctx "/main.scss"))
   [:title title]])
;;<link rel="alternate" type="application/rss+xml" title="{{ site.title }}"
;; href="{{ "/feed.xml" | prepend: site.baseurl | prepend: site.url }}">

(defn header [ctx title]
  [:header.site-header
   [:div.wrapper
    [:a.site-title {:href "/"} "Max Ovsiankin"]
    [:nav.site-nav
     [:a.menu-icon {:href "#"} menu-icon]
     [:div.trigger
      (for [page (:pages ctx)]
        [:a.page-link {:href (:url page)} (:title page)])]]]])

(def mode (env :site-mode "dev"))

(def google-analytics (slurp (io/as-file "resources/google_analytics.html")))

(defn layout [ctx title & content]
  (html5
    (head ctx title)
    [:body
     (header ctx title)
     [:div.page-content
      [:div.wrapper content]]
     (when (not= mode "prod")
       google-analytics)]))

(defn post-listing [ctx post]
  [:li
   [:h2.post-title-home
    [:a.post-link {:href (:url post)} (:title post)]]
   [:span.post-meta (util/time-unparse (:date post))]])

(defn home [ctx posts]
  (layout
    ctx
    "Max Ovsiankin"
    [:div.home
     [:ul.post-list
      (map (partial post-listing ctx) posts)]]))

(defn post-time [post]
  (let [str-date (util/time-unparse (:date post))]
    [:time {:datetime str-date} str-date]))

(let [disqus-tpl (slurp (io/as-file "resources/disqus.html"))]
  (defn disqus [ctx post]
    (-> disqus-tpl
        (str/replace "PAGE_URL" (str site-url (:url post)))
        (str/replace "PAGE_IDENTIFIER" (:slug post)))))

(defn post [ctx post]
  (layout
    ctx
    (:title post)
    (for [css (:styles post)]
      (include-css (str "/css/" css ".css")))
    [:article.post
     [:header.post-header
      [:h1.post-title (:title post)]
        [:p.post-meta (post-time post)]]
     [:div.post-content
      (:html post)]]
    (for [js (:scripts post)]
      (include-js (str "/js/" js ".js")))
    (if-not (= ["true"] (:no-disqus post))
      (disqus ctx post))))

(defn page [ctx page]
  (layout
    ctx
    (:title page)
    [:article.post
     [:header.post-header
      [:h1.post-title (:title page)]]
     [:div.post-content
      (:html page)]]))