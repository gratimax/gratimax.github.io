(defproject code "0.0.1-SNAPSHOT"
  :dependencies [[org.clojure/clojure "1.8.0"]
                 [org.clojure/clojurescript "1.8.34"]
                 [cljsjs/d3 "3.5.7-1"]
                 [stasis "2.3.0"]]
  :plugins [[lein-cljsbuild "1.1.3"]]
  :source-path ["src/clj/" "src/cljc/"]
  :cljsbuild {:builds
              {:college-decisions-tracker
               {:source-paths ["src/cljs/" "src/cljc"]
                :compiler     {:output-to     "../_site/js/colleges.js"
                               :main          "blog.colleges.core"
                               :asset-path    "/js"
                               :output-dir    "../_site/js/"
                               :optimizations :none
                               :pretty-print  true}}}}
  :profiles {:prod
             {:cljsbuild {:builds
                          {:college-decisions-tracker
                           {:compiler {:optimizations :advanced
                                       :pretty-print  false}}}}}})