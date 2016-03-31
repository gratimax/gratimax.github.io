// Compiled by ClojureScript 1.8.34 {:static-fns true, :optimize-constants true}
goog.provide('blog.d3');
goog.require('cljs.core');
blog.d3.doprops = (function blog$d3$doprops(obj,prop_map,props){
var seq__11879_11887 = cljs.core.seq(cljs.core.partition.cljs$core$IFn$_invoke$arity$2((2),props));
var chunk__11881_11888 = null;
var count__11882_11889 = (0);
var i__11883_11890 = (0);
while(true){
if((i__11883_11890 < count__11882_11889)){
var vec__11885_11891 = chunk__11881_11888.cljs$core$IIndexed$_nth$arity$2(null,i__11883_11890);
var k_11892 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11885_11891,(0),null);
var v_11893 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11885_11891,(1),null);
var prop_11894 = (prop_map.cljs$core$IFn$_invoke$arity$1 ? prop_map.cljs$core$IFn$_invoke$arity$1(k_11892) : prop_map.call(null,k_11892));
(prop_11894.cljs$core$IFn$_invoke$arity$2 ? prop_11894.cljs$core$IFn$_invoke$arity$2(obj,v_11893) : prop_11894.call(null,obj,v_11893));

var G__11895 = seq__11879_11887;
var G__11896 = chunk__11881_11888;
var G__11897 = count__11882_11889;
var G__11898 = (i__11883_11890 + (1));
seq__11879_11887 = G__11895;
chunk__11881_11888 = G__11896;
count__11882_11889 = G__11897;
i__11883_11890 = G__11898;
continue;
} else {
var temp__4657__auto___11899 = cljs.core.seq(seq__11879_11887);
if(temp__4657__auto___11899){
var seq__11879_11900__$1 = temp__4657__auto___11899;
if(cljs.core.chunked_seq_QMARK_(seq__11879_11900__$1)){
var c__7021__auto___11901 = cljs.core.chunk_first(seq__11879_11900__$1);
var G__11902 = cljs.core.chunk_rest(seq__11879_11900__$1);
var G__11903 = c__7021__auto___11901;
var G__11904 = cljs.core.count(c__7021__auto___11901);
var G__11905 = (0);
seq__11879_11887 = G__11902;
chunk__11881_11888 = G__11903;
count__11882_11889 = G__11904;
i__11883_11890 = G__11905;
continue;
} else {
var vec__11886_11906 = cljs.core.first(seq__11879_11900__$1);
var k_11907 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11886_11906,(0),null);
var v_11908 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11886_11906,(1),null);
var prop_11909 = (prop_map.cljs$core$IFn$_invoke$arity$1 ? prop_map.cljs$core$IFn$_invoke$arity$1(k_11907) : prop_map.call(null,k_11907));
(prop_11909.cljs$core$IFn$_invoke$arity$2 ? prop_11909.cljs$core$IFn$_invoke$arity$2(obj,v_11908) : prop_11909.call(null,obj,v_11908));

var G__11910 = cljs.core.next(seq__11879_11900__$1);
var G__11911 = null;
var G__11912 = (0);
var G__11913 = (0);
seq__11879_11887 = G__11910;
chunk__11881_11888 = G__11911;
count__11882_11889 = G__11912;
i__11883_11890 = G__11913;
continue;
}
} else {
}
}
break;
}

return obj;
});
blog.d3.extent = (function blog$d3$extent(l){
return cljs.core.js__GT_clj.cljs$core$IFn$_invoke$arity$1((function (){var G__11915 = cljs.core.clj__GT_js(l);
return d3.extent(G__11915);
})());
});
blog.d3.select = (function blog$d3$select(var_args){
var args11916 = [];
var len__7279__auto___11919 = arguments.length;
var i__7280__auto___11920 = (0);
while(true){
if((i__7280__auto___11920 < len__7279__auto___11919)){
args11916.push((arguments[i__7280__auto___11920]));

var G__11921 = (i__7280__auto___11920 + (1));
i__7280__auto___11920 = G__11921;
continue;
} else {
}
break;
}

var G__11918 = args11916.length;
switch (G__11918) {
case 1:
return blog.d3.select.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return blog.d3.select.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args11916.length)].join('')));

}
});

blog.d3.select.cljs$core$IFn$_invoke$arity$1 = (function (selector){
return d3.select(selector);
});

blog.d3.select.cljs$core$IFn$_invoke$arity$2 = (function (sel,selector){
return sel.select(selector);
});

blog.d3.select.cljs$lang$maxFixedArity = 2;
blog.d3.window = blog.d3.select.cljs$core$IFn$_invoke$arity$1(window);
blog.d3.selectAll = (function blog$d3$selectAll(var_args){
var args11923 = [];
var len__7279__auto___11926 = arguments.length;
var i__7280__auto___11927 = (0);
while(true){
if((i__7280__auto___11927 < len__7279__auto___11926)){
args11923.push((arguments[i__7280__auto___11927]));

var G__11928 = (i__7280__auto___11927 + (1));
i__7280__auto___11927 = G__11928;
continue;
} else {
}
break;
}

var G__11925 = args11923.length;
switch (G__11925) {
case 1:
return blog.d3.selectAll.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return blog.d3.selectAll.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args11923.length)].join('')));

}
});

blog.d3.selectAll.cljs$core$IFn$_invoke$arity$1 = (function (selector){
return d3.selectAll(selector);
});

blog.d3.selectAll.cljs$core$IFn$_invoke$arity$2 = (function (sel,selector){
return sel.selectAll(selector);
});

blog.d3.selectAll.cljs$lang$maxFixedArity = 2;
blog.d3.data = (function blog$d3$data(sel,d){
return sel.data(cljs.core.into_array.cljs$core$IFn$_invoke$arity$1(d));
});
blog.d3.datum = (function blog$d3$datum(sel,d){
return sel.datum(cljs.core.into_array.cljs$core$IFn$_invoke$arity$1(d));
});
blog.d3.attr = (function blog$d3$attr(sel,k){
return sel.attr(cljs.core.name(k));
});
blog.d3.node = (function blog$d3$node(sel){
return sel.node();
});
blog.d3.attrs = (function blog$d3$attrs(var_args){
var args__7286__auto__ = [];
var len__7279__auto___11940 = arguments.length;
var i__7280__auto___11941 = (0);
while(true){
if((i__7280__auto___11941 < len__7279__auto___11940)){
args__7286__auto__.push((arguments[i__7280__auto___11941]));

var G__11942 = (i__7280__auto___11941 + (1));
i__7280__auto___11941 = G__11942;
continue;
} else {
}
break;
}

var argseq__7287__auto__ = ((((1) < args__7286__auto__.length))?(new cljs.core.IndexedSeq(args__7286__auto__.slice((1)),(0),null)):null);
return blog.d3.attrs.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__7287__auto__);
});

blog.d3.attrs.cljs$core$IFn$_invoke$arity$variadic = (function (sel,props){
var seq__11932_11943 = cljs.core.seq(cljs.core.partition.cljs$core$IFn$_invoke$arity$2((2),props));
var chunk__11934_11944 = null;
var count__11935_11945 = (0);
var i__11936_11946 = (0);
while(true){
if((i__11936_11946 < count__11935_11945)){
var vec__11938_11947 = chunk__11934_11944.cljs$core$IIndexed$_nth$arity$2(null,i__11936_11946);
var k_11948 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11938_11947,(0),null);
var v_11949 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11938_11947,(1),null);
var n_11950 = cljs.core.name(k_11948);
sel.attr(n_11950,v_11949);

var G__11951 = seq__11932_11943;
var G__11952 = chunk__11934_11944;
var G__11953 = count__11935_11945;
var G__11954 = (i__11936_11946 + (1));
seq__11932_11943 = G__11951;
chunk__11934_11944 = G__11952;
count__11935_11945 = G__11953;
i__11936_11946 = G__11954;
continue;
} else {
var temp__4657__auto___11955 = cljs.core.seq(seq__11932_11943);
if(temp__4657__auto___11955){
var seq__11932_11956__$1 = temp__4657__auto___11955;
if(cljs.core.chunked_seq_QMARK_(seq__11932_11956__$1)){
var c__7021__auto___11957 = cljs.core.chunk_first(seq__11932_11956__$1);
var G__11958 = cljs.core.chunk_rest(seq__11932_11956__$1);
var G__11959 = c__7021__auto___11957;
var G__11960 = cljs.core.count(c__7021__auto___11957);
var G__11961 = (0);
seq__11932_11943 = G__11958;
chunk__11934_11944 = G__11959;
count__11935_11945 = G__11960;
i__11936_11946 = G__11961;
continue;
} else {
var vec__11939_11962 = cljs.core.first(seq__11932_11956__$1);
var k_11963 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11939_11962,(0),null);
var v_11964 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11939_11962,(1),null);
var n_11965 = cljs.core.name(k_11963);
sel.attr(n_11965,v_11964);

var G__11966 = cljs.core.next(seq__11932_11956__$1);
var G__11967 = null;
var G__11968 = (0);
var G__11969 = (0);
seq__11932_11943 = G__11966;
chunk__11934_11944 = G__11967;
count__11935_11945 = G__11968;
i__11936_11946 = G__11969;
continue;
}
} else {
}
}
break;
}

return sel;
});

blog.d3.attrs.cljs$lang$maxFixedArity = (1);

blog.d3.attrs.cljs$lang$applyTo = (function (seq11930){
var G__11931 = cljs.core.first(seq11930);
var seq11930__$1 = cljs.core.next(seq11930);
return blog.d3.attrs.cljs$core$IFn$_invoke$arity$variadic(G__11931,seq11930__$1);
});
blog.d3.text = (function blog$d3$text(sel,t){
return sel.text(t);
});
blog.d3.append = (function blog$d3$append(sel,elem){
return sel.append(cljs.core.name(elem));
});
blog.d3.on = (function blog$d3$on(sel,evt,f){
return sel.on(cljs.core.name(evt),f);
});
blog.d3.remove = (function blog$d3$remove(sel){
return sel.remove();
});
blog.d3.exit = (function blog$d3$exit(sel){
return sel.exit();
});
blog.d3.enter = (function blog$d3$enter(sel){
return sel.enter();
});
blog.d3.call = (function blog$d3$call(sel,f){
return sel.call(f);
});
blog.d3.translate = (function blog$d3$translate(x,y){
return [cljs.core.str("translate("),cljs.core.str(x),cljs.core.str(", "),cljs.core.str(y),cljs.core.str(")")].join('');
});
blog.d3.time_format = (function blog$d3$time_format(format){
return d3.time.format(format);
});
blog.d3.mouse = (function blog$d3$mouse(container){
return cljs.core.js__GT_clj.cljs$core$IFn$_invoke$arity$1(d3.mouse(container));
});
blog.d3.ease = (function blog$d3$ease(trans,easing){
return trans.ease(cljs.core.name(easing));
});
blog.d3.duration = (function blog$d3$duration(trans,dur){
return trans.duration(dur);
});
blog.d3.transition_props = new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$ease,blog.d3.ease,cljs.core.cst$kw$duration,blog.d3.duration], null);
blog.d3.transition = (function blog$d3$transition(var_args){
var args__7286__auto__ = [];
var len__7279__auto___11972 = arguments.length;
var i__7280__auto___11973 = (0);
while(true){
if((i__7280__auto___11973 < len__7279__auto___11972)){
args__7286__auto__.push((arguments[i__7280__auto___11973]));

var G__11974 = (i__7280__auto___11973 + (1));
i__7280__auto___11973 = G__11974;
continue;
} else {
}
break;
}

var argseq__7287__auto__ = ((((1) < args__7286__auto__.length))?(new cljs.core.IndexedSeq(args__7286__auto__.slice((1)),(0),null)):null);
return blog.d3.transition.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__7287__auto__);
});

blog.d3.transition.cljs$core$IFn$_invoke$arity$variadic = (function (sel,props){
return blog.d3.doprops(sel.transition(),blog.d3.transition_props,props);
});

blog.d3.transition.cljs$lang$maxFixedArity = (1);

blog.d3.transition.cljs$lang$applyTo = (function (seq11970){
var G__11971 = cljs.core.first(seq11970);
var seq11970__$1 = cljs.core.next(seq11970);
return blog.d3.transition.cljs$core$IFn$_invoke$arity$variadic(G__11971,seq11970__$1);
});
blog.d3.domain = (function blog$d3$domain(scale,dom){
return scale.domain(cljs.core.clj__GT_js(dom));
});
blog.d3.range = (function blog$d3$range(scale,ran){
return scale.range(cljs.core.clj__GT_js(ran));
});
blog.d3.scale_props = new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$domain,blog.d3.domain,cljs.core.cst$kw$range,blog.d3.range], null);
blog.d3.linear_scale = (function blog$d3$linear_scale(var_args){
var args__7286__auto__ = [];
var len__7279__auto___11976 = arguments.length;
var i__7280__auto___11977 = (0);
while(true){
if((i__7280__auto___11977 < len__7279__auto___11976)){
args__7286__auto__.push((arguments[i__7280__auto___11977]));

var G__11978 = (i__7280__auto___11977 + (1));
i__7280__auto___11977 = G__11978;
continue;
} else {
}
break;
}

var argseq__7287__auto__ = ((((0) < args__7286__auto__.length))?(new cljs.core.IndexedSeq(args__7286__auto__.slice((0)),(0),null)):null);
return blog.d3.linear_scale.cljs$core$IFn$_invoke$arity$variadic(argseq__7287__auto__);
});

blog.d3.linear_scale.cljs$core$IFn$_invoke$arity$variadic = (function (props){
return blog.d3.doprops(d3.scale.linear(),blog.d3.scale_props,props);
});

blog.d3.linear_scale.cljs$lang$maxFixedArity = (0);

blog.d3.linear_scale.cljs$lang$applyTo = (function (seq11975){
return blog.d3.linear_scale.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq11975));
});
blog.d3.time_scale = (function blog$d3$time_scale(var_args){
var args__7286__auto__ = [];
var len__7279__auto___11980 = arguments.length;
var i__7280__auto___11981 = (0);
while(true){
if((i__7280__auto___11981 < len__7279__auto___11980)){
args__7286__auto__.push((arguments[i__7280__auto___11981]));

var G__11982 = (i__7280__auto___11981 + (1));
i__7280__auto___11981 = G__11982;
continue;
} else {
}
break;
}

var argseq__7287__auto__ = ((((0) < args__7286__auto__.length))?(new cljs.core.IndexedSeq(args__7286__auto__.slice((0)),(0),null)):null);
return blog.d3.time_scale.cljs$core$IFn$_invoke$arity$variadic(argseq__7287__auto__);
});

blog.d3.time_scale.cljs$core$IFn$_invoke$arity$variadic = (function (props){
return blog.d3.doprops(d3.time.scale(),blog.d3.scale_props,props);
});

blog.d3.time_scale.cljs$lang$maxFixedArity = (0);

blog.d3.time_scale.cljs$lang$applyTo = (function (seq11979){
return blog.d3.time_scale.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq11979));
});
blog.d3.invert = (function blog$d3$invert(scale,x){
return scale.invert(x);
});
blog.d3.scale = (function blog$d3$scale(axis,s){
return axis.scale(s);
});
blog.d3.ticks = (function blog$d3$ticks(axis,ts){
return axis.ticks(ts);
});
blog.d3.outer_tick_size = (function blog$d3$outer_tick_size(axis,sz){
return axis.outerTickSize(sz);
});
blog.d3.axis_props = new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$scale,blog.d3.scale,cljs.core.cst$kw$ticks,blog.d3.ticks,cljs.core.cst$kw$outer_DASH_tick_DASH_size,blog.d3.outer_tick_size], null);
blog.d3.axis = (function blog$d3$axis(var_args){
var args__7286__auto__ = [];
var len__7279__auto___11984 = arguments.length;
var i__7280__auto___11985 = (0);
while(true){
if((i__7280__auto___11985 < len__7279__auto___11984)){
args__7286__auto__.push((arguments[i__7280__auto___11985]));

var G__11986 = (i__7280__auto___11985 + (1));
i__7280__auto___11985 = G__11986;
continue;
} else {
}
break;
}

var argseq__7287__auto__ = ((((0) < args__7286__auto__.length))?(new cljs.core.IndexedSeq(args__7286__auto__.slice((0)),(0),null)):null);
return blog.d3.axis.cljs$core$IFn$_invoke$arity$variadic(argseq__7287__auto__);
});

blog.d3.axis.cljs$core$IFn$_invoke$arity$variadic = (function (props){
return blog.d3.doprops(d3.svg.axis(),blog.d3.axis_props,props);
});

blog.d3.axis.cljs$lang$maxFixedArity = (0);

blog.d3.axis.cljs$lang$applyTo = (function (seq11983){
return blog.d3.axis.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq11983));
});
blog.d3.x = (function blog$d3$x(area,v){
return area.x(v);
});
blog.d3.y0 = (function blog$d3$y0(area,v){
return area.y0(v);
});
blog.d3.y1 = (function blog$d3$y1(area,v){
return area.y1(v);
});
blog.d3.interpolate = (function blog$d3$interpolate(area,i){
return area.interpolate(cljs.core.name(i));
});
blog.d3.area_props = new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$x,blog.d3.x,cljs.core.cst$kw$y0,blog.d3.y0,cljs.core.cst$kw$y1,blog.d3.y1,cljs.core.cst$kw$interpolate,blog.d3.interpolate], null);
blog.d3.area = (function blog$d3$area(var_args){
var args__7286__auto__ = [];
var len__7279__auto___11988 = arguments.length;
var i__7280__auto___11989 = (0);
while(true){
if((i__7280__auto___11989 < len__7279__auto___11988)){
args__7286__auto__.push((arguments[i__7280__auto___11989]));

var G__11990 = (i__7280__auto___11989 + (1));
i__7280__auto___11989 = G__11990;
continue;
} else {
}
break;
}

var argseq__7287__auto__ = ((((0) < args__7286__auto__.length))?(new cljs.core.IndexedSeq(args__7286__auto__.slice((0)),(0),null)):null);
return blog.d3.area.cljs$core$IFn$_invoke$arity$variadic(argseq__7287__auto__);
});

blog.d3.area.cljs$core$IFn$_invoke$arity$variadic = (function (props){
return blog.d3.doprops(d3.svg.area(),blog.d3.area_props,props);
});

blog.d3.area.cljs$lang$maxFixedArity = (0);

blog.d3.area.cljs$lang$applyTo = (function (seq11987){
return blog.d3.area.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq11987));
});
