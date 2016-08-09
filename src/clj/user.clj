(ns user
  (:require [environ.core :refer [env]]
            [ring.adapter.jetty :refer [run-jetty]]
            [ring.middleware.reload :refer [wrap-reload]]
            [ring.middleware.stacktrace :refer [wrap-stacktrace]]
            [blog.core :as blog]))

(def dev-app
  (-> #'blog/app
      (wrap-reload)
      (wrap-stacktrace)))

(defonce global-server (atom nil))

(defn start []
  (if (nil? @global-server)
    (let [port (Integer. (:port env 3000))
          server (run-jetty #'dev-app {:port port :join? false})]
      (println "Server starting on port" port)
      (reset! global-server server))
    (throw (Exception. "Cannot start once server is started"))))

(defn stop []
  (if-not (nil? @global-server)
    (do (.stop @global-server)
        (reset! global-server nil))
    (throw (Exception. "Cannot stop with no server running"))))

(defn export []
  (blog/export))