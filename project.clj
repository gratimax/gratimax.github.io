(defproject blog "0.0.1-SNAPSHOT"

  :dependencies [[org.clojure/clojure "1.8.0"]
                 [org.clojure/clojurescript "1.8.34"]

                 [clj-time "0.12.0"]
                 [environ "1.1.0"]

                 [ring "1.5.0"]
                 [ring/ring-headers "0.2.0"]
                 [ring/ring-jetty-adapter "1.5.0"]
                 [stasis "2.3.0"]
                 [optimus "0.19.0"]
                 [optimus-sass "0.0.3"]

                 [hiccup "1.0.5"]
                 [com.atlassian.commonmark/commonmark "0.6.0"]
                 [com.atlassian.commonmark/commonmark-ext-yaml-front-matter "0.6.0"]
                 [clygments "0.1.1"]

                 [cljsjs/d3 "3.5.7-1"]]

  :plugins [[lein-cljsbuild "1.1.3"]
            [lein-environ "1.1.0"]]

  :source-paths ["src/clj/"]

  :clean-targets ^{:protect false} ["resources/_public" "resources/built-cljs"]

  :aliases {"build-site" ["with-profile" "prod"
                          "do" ["clean"] ["cljsbuild" "once"]
                          ["run" "-m" "blog.core"]]}

  :cljsbuild {:builds
              {:college-decisions-tracker
               {:source-paths ["src/cljs/"]
                :compiler     {:output-to     "resources/built-cljs/colleges.js"
                               :main          "blog.colleges.core"
                               :asset-path    "/js"
                               :output-dir    "resources/built-cljs/"
                               :optimizations :none
                               :pretty-print  true}}}}

  :profiles {:prod
             {:cljsbuild {:builds
                          {:college-decisions-tracker
                           {:compiler {:optimizations :advanced
                                       :output-dir    nil
                                       :pretty-print  false}}}}
              :env {:site-mode "prod"}}})