(ns blog.markdown
  (:require [clygments.core :as clygments]
            [blog.util :as util])
  (:import (org.commonmark.parser Parser)
           (org.commonmark.html HtmlRenderer HtmlWriter
                                HtmlRenderer$HtmlRendererExtension HtmlRenderer$Builder)
           (org.commonmark.node Document FencedCodeBlock Heading)
           (org.commonmark.html.renderer NodeRendererFactory
                                         NodeRendererContext
                                         NodeRenderer)
           (java.util HashSet)
           (org.commonmark.ext.front.matter YamlFrontMatterExtension YamlFrontMatterVisitor)))

;; logic taken from CoreNodeRenderer
(defn get-lang [^FencedCodeBlock node]
  (when-let [info (.getInfo node)]
    (when (not (.isEmpty info))
      (let [space-index (.indexOf info " ")]
        (if (= space-index -1)
          info
          (subs info 0 space-index))))))

(defn render-fenced-code-block [^NodeRendererContext ctx ^FencedCodeBlock node]
  (let [^HtmlWriter writer (.getHtmlWriter ctx)
        lang (get-lang node)
        code (.getLiteral node)]
    (.line writer)
    (.tag writer "pre" (if lang {"class" "codehilite"} {}))
    (.tag writer "code" (if lang
                          {"class" (str "language-" lang)}
                          {}))
    (.raw writer (if lang
                   (clygments/highlight code lang :html {:nowrap true})
                   code))
    (.tag writer "/code")
    (.tag writer "/pre")
    (.line writer)))

(deftype HighlightSyntaxExtension []
  HtmlRenderer$HtmlRendererExtension
  (^void extend [_ ^HtmlRenderer$Builder builder]
    (.nodeRendererFactory
      builder
      (reify NodeRendererFactory
        (create [_ ctx]
          (reify NodeRenderer
            (getNodeTypes [_]
              (HashSet. [FencedCodeBlock]))
            (render [_ node]
              (render-fenced-code-block ctx node))))))))

(let [parser (-> (Parser/builder)
                 (.extensions [(YamlFrontMatterExtension/create)])
                 (.build))]
  (defn parse [source]
    (.parse parser source)))

(let [renderer (-> (HtmlRenderer/builder)
                   (.extensions [(HighlightSyntaxExtension.)])
                   (.build))]
  (defn render [document]
    (.render renderer document)))

(defn get-heading [^Document document]
  (let [first-child (.getFirstChild document)]
    (if (instance? Heading first-child)
      first-child
      (.getNext first-child))))

(defn get-and-remove-title [^Document document]
  (let [heading (get-heading document)
        title (.getLiteral (.getFirstChild heading))]
    (.unlink heading)
    title))

(defn get-frontmatter [^Document document]
  (let [visitor (YamlFrontMatterVisitor.)]
    (.visit visitor document)
    (->> (.getData visitor)
         (into {})
         (util/map-kv (fn [k v] [(keyword k) (vec v)])))))

(defn md->html [source]
  (let [document (parse source)
        title (get-and-remove-title document)]
    (merge {:title title :html (render document)}
           (get-frontmatter document))))