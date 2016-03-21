// Compiled by ClojureScript 1.8.34 {:static-fns true, :optimize-constants true}
goog.provide('blog.colleges.core');
goog.require('cljs.core');
goog.require('blog.colleges.list');
blog.colleges.core.mk_date = (function blog$colleges$core$mk_date(p__11871){
var vec__11873 = p__11871;
var month = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11873,(0),null);
var day = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11873,(1),null);
var year = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11873,(2),null);
return (new Date(((2000) + year),(month - (1)),day));
});
blog.colleges.core.mk_date_vector = (function blog$colleges$core$mk_date_vector(date){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(date.getMonth() + (1)),date.getDate(),(date.getFullYear() - (2000))], null);
});
blog.colleges.core.viz = d3.select("#viz");
blog.colleges.core.viz_node = blog.colleges.core.viz.node();
blog.colleges.core.d3_window = d3.select(window);
blog.colleges.core.viz_width = blog.colleges.core.viz.attr("width");
blog.colleges.core.viz_height = blog.colleges.core.viz.attr("height");
blog.colleges.core.in_bounds = (function blog$colleges$core$in_bounds(x,y){
return ((((0) < x)) && ((x < blog.colleges.core.viz_width))) && ((((0) < y)) && ((y < blog.colleges.core.viz_height)));
});
cljs.core.enable_console_print_BANG_();
blog.colleges.core.colleges_dates = cljs.core.into_array.cljs$core$IFn$_invoke$arity$1(cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.comp.cljs$core$IFn$_invoke$arity$2(blog.colleges.core.mk_date,cljs.core.cst$kw$date),blog.colleges.list.colleges_list));
blog.colleges.core.time_format = d3.time.format("%d %b %y");
blog.colleges.core.add_days = (function blog$colleges$core$add_days(d,days){
var new_date = (new Date(d));
new_date.setDate((d.getDate() + days));

return new_date;
});
blog.colleges.core.augment_date_extent = (function blog$colleges$core$augment_date_extent(date_extent){
return [blog.colleges.core.add_days((date_extent[(0)]),(-3)),blog.colleges.core.add_days((date_extent[(1)]),(3))];
});
blog.colleges.core.full_date_extent = blog.colleges.core.augment_date_extent(d3.extent(blog.colleges.core.colleges_dates));
blog.colleges.core.last_date = (function (){var x__6548__auto__ = (new Date());
var y__6549__auto__ = (blog.colleges.core.full_date_extent[(1)]);
return ((x__6548__auto__ < y__6549__auto__) ? x__6548__auto__ : y__6549__auto__);
})();
blog.colleges.core.first_date = (blog.colleges.core.full_date_extent[(0)]);
blog.colleges.core.x_scale = d3.time.scale().domain(blog.colleges.core.full_date_extent).range([(0),(blog.colleges.core.viz_width - (0))]);
blog.colleges.core.y_scale_above = d3.scale.linear().domain([(0),(10)]).range([(blog.colleges.core.viz_height / (2)),(0)]);
blog.colleges.core.y_scale_below = d3.scale.linear().domain([(0),(10)]).range([(blog.colleges.core.viz_height / (2)),blog.colleges.core.viz_height]);
blog.colleges.core.colleges_graph = (function (){var graph_existing = cljs.core.take_while.cljs$core$IFn$_invoke$arity$2((function (p1__11874_SHARP_){
return cljs.core.not(cljs.core.cst$kw$upcoming.cljs$core$IFn$_invoke$arity$1(p1__11874_SHARP_));
}),cljs.core.next(cljs.core.reductions.cljs$core$IFn$_invoke$arity$3((function (acc,college){
return cljs.core.update.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(acc,cljs.core.cst$kw$date,blog.colleges.core.mk_date(cljs.core.cst$kw$date.cljs$core$IFn$_invoke$arity$1(college))),cljs.core.cst$kw$status.cljs$core$IFn$_invoke$arity$1(college),cljs.core.inc);
}),new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$accept,(0),cljs.core.cst$kw$waitlist,(0),cljs.core.cst$kw$reject,(0)], null),blog.colleges.list.colleges_list)));
var last_point = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.last(graph_existing),new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$date,blog.colleges.core.last_date,cljs.core.cst$kw$cur_DASH_day,true], null)], 0));
return cljs.core.into_array.cljs$core$IFn$_invoke$arity$1(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(graph_existing,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [last_point], null)));
})();
blog.colleges.core.results_by_date = cljs.core.group_by(cljs.core.cst$kw$date,blog.colleges.list.colleges_list);
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([blog.colleges.core.results_by_date], 0));
blog.colleges.core.make_axis = (function blog$colleges$core$make_axis(){
var x_axis = d3.svg.axis().scale(blog.colleges.core.x_scale).ticks((0)).outerTickSize((0));
var axis = blog.colleges.core.viz.append("g").attr("class","x axis").attr("transform",[cljs.core.str("translate(0, "),cljs.core.str((blog.colleges.core.viz_height / (2))),cljs.core.str(")")].join('')).call(x_axis);
return axis;
});
blog.colleges.core.upcoming_dates = cljs.core.map.cljs$core$IFn$_invoke$arity$2(blog.colleges.core.mk_date,cljs.core.distinct.cljs$core$IFn$_invoke$arity$1(cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$date,cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__11875_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$status.cljs$core$IFn$_invoke$arity$1(p1__11875_SHARP_),cljs.core.cst$kw$upcoming);
}),blog.colleges.list.colleges_list))));
blog.colleges.core.make_upcoming_rect = (function blog$colleges$core$make_upcoming_rect(){
var last_of_graph = cljs.core.last(blog.colleges.core.colleges_graph);
var min_x = (function (){var G__11886 = cljs.core.cst$kw$date.cljs$core$IFn$_invoke$arity$1(last_of_graph);
return (blog.colleges.core.x_scale.cljs$core$IFn$_invoke$arity$1 ? blog.colleges.core.x_scale.cljs$core$IFn$_invoke$arity$1(G__11886) : blog.colleges.core.x_scale.call(null,G__11886));
})();
var max_x = (function (){var G__11887 = cljs.core.last(blog.colleges.core.colleges_dates);
return (blog.colleges.core.x_scale.cljs$core$IFn$_invoke$arity$1 ? blog.colleges.core.x_scale.cljs$core$IFn$_invoke$arity$1(G__11887) : blog.colleges.core.x_scale.call(null,G__11887));
})();
var dx = (max_x - min_x);
var min_y = (function (){var G__11888 = cljs.core.cst$kw$accept.cljs$core$IFn$_invoke$arity$1(last_of_graph);
return (blog.colleges.core.y_scale_above.cljs$core$IFn$_invoke$arity$1 ? blog.colleges.core.y_scale_above.cljs$core$IFn$_invoke$arity$1(G__11888) : blog.colleges.core.y_scale_above.call(null,G__11888));
})();
var max_y = (function (){var G__11889 = (cljs.core.cst$kw$waitlist.cljs$core$IFn$_invoke$arity$1(last_of_graph) + cljs.core.cst$kw$reject.cljs$core$IFn$_invoke$arity$1(last_of_graph));
return (blog.colleges.core.y_scale_below.cljs$core$IFn$_invoke$arity$1 ? blog.colleges.core.y_scale_below.cljs$core$IFn$_invoke$arity$1(G__11889) : blog.colleges.core.y_scale_below.call(null,G__11889));
})();
var dy = (max_y - min_y);
blog.colleges.core.viz.append("rect").attr("class","area upcoming").attr("x",min_x).attr("y",min_y).attr("width",dx).attr("height",dy);

var seq__11890 = cljs.core.seq(blog.colleges.core.upcoming_dates);
var chunk__11892 = null;
var count__11893 = (0);
var i__11894 = (0);
while(true){
if((i__11894 < count__11893)){
var date = chunk__11892.cljs$core$IIndexed$_nth$arity$2(null,i__11894);
var x_11896 = (blog.colleges.core.x_scale.cljs$core$IFn$_invoke$arity$1 ? blog.colleges.core.x_scale.cljs$core$IFn$_invoke$arity$1(date) : blog.colleges.core.x_scale.call(null,date));
blog.colleges.core.viz.append("line").attr("class","college-upcoming-line").attr("x1",x_11896).attr("y1",min_y).attr("x2",x_11896).attr("y2",max_y);

var G__11897 = seq__11890;
var G__11898 = chunk__11892;
var G__11899 = count__11893;
var G__11900 = (i__11894 + (1));
seq__11890 = G__11897;
chunk__11892 = G__11898;
count__11893 = G__11899;
i__11894 = G__11900;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq(seq__11890);
if(temp__4657__auto__){
var seq__11890__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__11890__$1)){
var c__7021__auto__ = cljs.core.chunk_first(seq__11890__$1);
var G__11901 = cljs.core.chunk_rest(seq__11890__$1);
var G__11902 = c__7021__auto__;
var G__11903 = cljs.core.count(c__7021__auto__);
var G__11904 = (0);
seq__11890 = G__11901;
chunk__11892 = G__11902;
count__11893 = G__11903;
i__11894 = G__11904;
continue;
} else {
var date = cljs.core.first(seq__11890__$1);
var x_11905 = (blog.colleges.core.x_scale.cljs$core$IFn$_invoke$arity$1 ? blog.colleges.core.x_scale.cljs$core$IFn$_invoke$arity$1(date) : blog.colleges.core.x_scale.call(null,date));
blog.colleges.core.viz.append("line").attr("class","college-upcoming-line").attr("x1",x_11905).attr("y1",min_y).attr("x2",x_11905).attr("y2",max_y);

var G__11906 = cljs.core.next(seq__11890__$1);
var G__11907 = null;
var G__11908 = (0);
var G__11909 = (0);
seq__11890 = G__11906;
chunk__11892 = G__11907;
count__11893 = G__11908;
i__11894 = G__11909;
continue;
}
} else {
return null;
}
}
break;
}
});
blog.colleges.core.make_areas = (function blog$colleges$core$make_areas(){
var accept_area = d3.svg.area().x((function (p1__11910_SHARP_){
var G__11923 = cljs.core.cst$kw$date.cljs$core$IFn$_invoke$arity$1(p1__11910_SHARP_);
return (blog.colleges.core.x_scale.cljs$core$IFn$_invoke$arity$1 ? blog.colleges.core.x_scale.cljs$core$IFn$_invoke$arity$1(G__11923) : blog.colleges.core.x_scale.call(null,G__11923));
})).y0(cljs.core.constantly((blog.colleges.core.y_scale_above.cljs$core$IFn$_invoke$arity$1 ? blog.colleges.core.y_scale_above.cljs$core$IFn$_invoke$arity$1((0)) : blog.colleges.core.y_scale_above.call(null,(0))))).y1((function (p1__11911_SHARP_){
var G__11924 = cljs.core.cst$kw$accept.cljs$core$IFn$_invoke$arity$1(p1__11911_SHARP_);
return (blog.colleges.core.y_scale_above.cljs$core$IFn$_invoke$arity$1 ? blog.colleges.core.y_scale_above.cljs$core$IFn$_invoke$arity$1(G__11924) : blog.colleges.core.y_scale_above.call(null,G__11924));
})).interpolate("step-after");
var reject_area = d3.svg.area().x(((function (accept_area){
return (function (p1__11912_SHARP_){
var G__11925 = cljs.core.cst$kw$date.cljs$core$IFn$_invoke$arity$1(p1__11912_SHARP_);
return (blog.colleges.core.x_scale.cljs$core$IFn$_invoke$arity$1 ? blog.colleges.core.x_scale.cljs$core$IFn$_invoke$arity$1(G__11925) : blog.colleges.core.x_scale.call(null,G__11925));
});})(accept_area))
).y0(((function (accept_area){
return (function (p1__11913_SHARP_){
var G__11926 = cljs.core.cst$kw$waitlist.cljs$core$IFn$_invoke$arity$1(p1__11913_SHARP_);
return (blog.colleges.core.y_scale_below.cljs$core$IFn$_invoke$arity$1 ? blog.colleges.core.y_scale_below.cljs$core$IFn$_invoke$arity$1(G__11926) : blog.colleges.core.y_scale_below.call(null,G__11926));
});})(accept_area))
).y1(((function (accept_area){
return (function (d){
var G__11927 = (cljs.core.cst$kw$waitlist.cljs$core$IFn$_invoke$arity$1(d) + cljs.core.cst$kw$reject.cljs$core$IFn$_invoke$arity$1(d));
return (blog.colleges.core.y_scale_below.cljs$core$IFn$_invoke$arity$1 ? blog.colleges.core.y_scale_below.cljs$core$IFn$_invoke$arity$1(G__11927) : blog.colleges.core.y_scale_below.call(null,G__11927));
});})(accept_area))
).interpolate("step-after");
var waitlist_area = d3.svg.area().x(((function (accept_area,reject_area){
return (function (p1__11914_SHARP_){
var G__11928 = cljs.core.cst$kw$date.cljs$core$IFn$_invoke$arity$1(p1__11914_SHARP_);
return (blog.colleges.core.x_scale.cljs$core$IFn$_invoke$arity$1 ? blog.colleges.core.x_scale.cljs$core$IFn$_invoke$arity$1(G__11928) : blog.colleges.core.x_scale.call(null,G__11928));
});})(accept_area,reject_area))
).y0(cljs.core.constantly((blog.colleges.core.y_scale_below.cljs$core$IFn$_invoke$arity$1 ? blog.colleges.core.y_scale_below.cljs$core$IFn$_invoke$arity$1((0)) : blog.colleges.core.y_scale_below.call(null,(0))))).y1(((function (accept_area,reject_area){
return (function (p1__11915_SHARP_){
var G__11929 = cljs.core.cst$kw$waitlist.cljs$core$IFn$_invoke$arity$1(p1__11915_SHARP_);
return (blog.colleges.core.y_scale_below.cljs$core$IFn$_invoke$arity$1 ? blog.colleges.core.y_scale_below.cljs$core$IFn$_invoke$arity$1(G__11929) : blog.colleges.core.y_scale_below.call(null,G__11929));
});})(accept_area,reject_area))
).interpolate("step-after");
blog.colleges.core.viz.append("path").datum(blog.colleges.core.colleges_graph).attr("class","area accept").attr("d",accept_area);

blog.colleges.core.viz.append("path").datum(blog.colleges.core.colleges_graph).attr("class","area reject").attr("d",reject_area);

blog.colleges.core.viz.append("path").datum(blog.colleges.core.colleges_graph).attr("class","area waitlist").attr("d",waitlist_area);

return blog.colleges.core.make_upcoming_rect();
});
blog.colleges.core.make_current_day = (function blog$colleges$core$make_current_day(){
var x_pos = (blog.colleges.core.x_scale.cljs$core$IFn$_invoke$arity$1 ? blog.colleges.core.x_scale.cljs$core$IFn$_invoke$arity$1(blog.colleges.core.last_date) : blog.colleges.core.x_scale.call(null,blog.colleges.core.last_date));
return blog.colleges.core.viz.append("line").attr("class","current-day").attr("stroke-dasharray","5, 5").attr("x1",x_pos).attr("y1",(0)).attr("x2",x_pos).attr("y2",blog.colleges.core.viz_height);
});
blog.colleges.core.hover_line = (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null) : cljs.core.atom.call(null,null));
blog.colleges.core.add_to_hover_line = (function blog$colleges$core$add_to_hover_line(g,date){
g.append("line").attr("x1",(0)).attr("x2",(0)).attr("y1",(0)).attr("y2",blog.colleges.core.viz_height);

g.append("text").text((blog.colleges.core.time_format.cljs$core$IFn$_invoke$arity$1 ? blog.colleges.core.time_format.cljs$core$IFn$_invoke$arity$1(date) : blog.colleges.core.time_format.call(null,date))).attr("y",(20));

return g;
});
blog.colleges.core.human_status = new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$accept,"Accepted!",cljs.core.cst$kw$reject,"Rejected",cljs.core.cst$kw$waitlist,"Waitlisted",cljs.core.cst$kw$upcoming,"Upcoming"], null);
blog.colleges.core.set_college_result = (function blog$colleges$core$set_college_result(sel){
return sel.attr("class",(function (d){
return [cljs.core.str("college-result "),cljs.core.str(cljs.core.name(cljs.core.cst$kw$status.cljs$core$IFn$_invoke$arity$1(d)))].join('');
})).text((function (d){
return [cljs.core.str(cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(d)),cljs.core.str(" ("),cljs.core.str((function (){var G__11931 = cljs.core.cst$kw$status.cljs$core$IFn$_invoke$arity$1(d);
return (blog.colleges.core.human_status.cljs$core$IFn$_invoke$arity$1 ? blog.colleges.core.human_status.cljs$core$IFn$_invoke$arity$1(G__11931) : blog.colleges.core.human_status.call(null,G__11931));
})()),cljs.core.str(")")].join('');
})).attr("y",(function (d,i){
return ((40) + ((20) * i));
}));
});
blog.colleges.core.set_hover_line_colleges = (function blog$colleges$core$set_hover_line_colleges(g,date){
var colleges_on_day = (function (){var or__6210__auto__ = (function (){var G__11935 = blog.colleges.core.mk_date_vector(date);
return (blog.colleges.core.results_by_date.cljs$core$IFn$_invoke$arity$1 ? blog.colleges.core.results_by_date.cljs$core$IFn$_invoke$arity$1(G__11935) : blog.colleges.core.results_by_date.call(null,G__11935));
})();
if(cljs.core.truth_(or__6210__auto__)){
return or__6210__auto__;
} else {
return cljs.core.PersistentVector.EMPTY;
}
})();
var sel = g.selectAll("text.college-result").data(cljs.core.into_array.cljs$core$IFn$_invoke$arity$1(colleges_on_day));
blog.colleges.core.set_college_result(sel);

sel.exit().remove();

return blog.colleges.core.set_college_result(sel.enter().append("text"));
});
blog.colleges.core.get_hover_date = (function blog$colleges$core$get_hover_date(x){
var corresponding_date = blog.colleges.core.x_scale.invert(x);
return cljs.core.last(cljs.core.take_while.cljs$core$IFn$_invoke$arity$2(((function (corresponding_date){
return (function (p1__11936_SHARP_){
return (p1__11936_SHARP_ <= corresponding_date);
});})(corresponding_date))
,blog.colleges.core.colleges_dates));
});
blog.colleges.core.delete_hover = (function blog$colleges$core$delete_hover(){
var temp__4657__auto__ = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(blog.colleges.core.hover_line) : cljs.core.deref.call(null,blog.colleges.core.hover_line));
if(cljs.core.truth_(temp__4657__auto__)){
var cur_line = temp__4657__auto__;
cur_line.remove();

return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(blog.colleges.core.hover_line,null) : cljs.core.reset_BANG_.call(null,blog.colleges.core.hover_line,null));
} else {
return null;
}
});
blog.colleges.core.make_hover = (function blog$colleges$core$make_hover(date){
var line_x = (blog.colleges.core.x_scale.cljs$core$IFn$_invoke$arity$1 ? blog.colleges.core.x_scale.cljs$core$IFn$_invoke$arity$1(date) : blog.colleges.core.x_scale.call(null,date));
var anchor_start_QMARK_ = (line_x < (blog.colleges.core.viz_width / (2)));
var cur_line = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(blog.colleges.core.hover_line) : cljs.core.deref.call(null,blog.colleges.core.hover_line));
var cur = (function (){var or__6210__auto__ = cur_line;
if(cljs.core.truth_(or__6210__auto__)){
return or__6210__auto__;
} else {
return blog.colleges.core.add_to_hover_line(blog.colleges.core.viz.append("g"),date);
}
})();
cur.transition().duration((500)).ease("elastic").attr("transform",[cljs.core.str("translate("),cljs.core.str(line_x),cljs.core.str(",0)")].join('')).attr("class",[cljs.core.str("hover"),cljs.core.str(((anchor_start_QMARK_)?" anchor-start":""))].join('')).select("text").text((blog.colleges.core.time_format.cljs$core$IFn$_invoke$arity$1 ? blog.colleges.core.time_format.cljs$core$IFn$_invoke$arity$1(date) : blog.colleges.core.time_format.call(null,date)));

blog.colleges.core.set_hover_line_colleges(cur,date);

cur.selectAll("text").attr("x",((anchor_start_QMARK_)?(5):(-5)));

return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(blog.colleges.core.hover_line,cur) : cljs.core.reset_BANG_.call(null,blog.colleges.core.hover_line,cur));
});
blog.colleges.core.listen_to_mouse = (function blog$colleges$core$listen_to_mouse(){
return blog.colleges.core.d3_window.on("mousemove",(function (){
var vec__11938 = cljs.core.js__GT_clj.cljs$core$IFn$_invoke$arity$1(d3.mouse(blog.colleges.core.viz_node));
var x = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11938,(0),null);
var y = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11938,(1),null);
if(cljs.core.truth_(blog.colleges.core.in_bounds(x,y))){
var temp__4655__auto__ = blog.colleges.core.get_hover_date(x);
if(cljs.core.truth_(temp__4655__auto__)){
var hover_date = temp__4655__auto__;
return blog.colleges.core.make_hover(hover_date);
} else {
return blog.colleges.core.delete_hover();
}
} else {
return blog.colleges.core.delete_hover();
}
}));
});
blog.colleges.core.make_areas();
blog.colleges.core.make_axis();
blog.colleges.core.make_current_day();
blog.colleges.core.listen_to_mouse();
