// Compiled by ClojureScript 1.8.34 {:static-fns true, :optimize-constants true}
goog.provide('blog.colleges.core');
goog.require('cljs.core');
goog.require('blog.colleges.list');
goog.require('blog.d3');
cljs.core.enable_console_print_BANG_();
blog.colleges.core.mk_date = (function blog$colleges$core$mk_date(p__11993){
var vec__11995 = p__11993;
var month = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11995,(0),null);
var day = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11995,(1),null);
var year = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11995,(2),null);
return (new Date(((2000) + year),(month - (1)),day));
});
blog.colleges.core.mk_date_vector = (function blog$colleges$core$mk_date_vector(date){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(date.getMonth() + (1)),date.getDate(),(date.getFullYear() - (2000))], null);
});
blog.colleges.core.add_days = (function blog$colleges$core$add_days(d,days){
var new_date = (new Date(d));
new_date.setDate((d.getDate() + days));

return new_date;
});
blog.colleges.core.colleges_dates = cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.comp.cljs$core$IFn$_invoke$arity$2(blog.colleges.core.mk_date,cljs.core.cst$kw$date),blog.colleges.list.colleges_list);
blog.colleges.core.full_date_extent = (function (){var vec__11996 = blog.d3.extent(blog.colleges.core.colleges_dates);
var min = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11996,(0),null);
var max = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11996,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [blog.colleges.core.add_days(min,(-3)),blog.colleges.core.add_days(max,(3))], null);
})();
blog.colleges.core.first_date = cljs.core.first(blog.colleges.core.full_date_extent);
blog.colleges.core.last_date = cljs.core.second(blog.colleges.core.full_date_extent);
blog.colleges.core.last_or_current_date = (function (){var x__6548__auto__ = (new Date());
var y__6549__auto__ = blog.colleges.core.last_date;
return ((x__6548__auto__ < y__6549__auto__) ? x__6548__auto__ : y__6549__auto__);
})();
blog.colleges.core.colleges_graph = (function (){var graph_existing = cljs.core.take_while.cljs$core$IFn$_invoke$arity$2((function (p1__11997_SHARP_){
return cljs.core.not(cljs.core.cst$kw$upcoming.cljs$core$IFn$_invoke$arity$1(p1__11997_SHARP_));
}),cljs.core.next(cljs.core.reductions.cljs$core$IFn$_invoke$arity$3((function (acc,college){
return cljs.core.update.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(acc,cljs.core.cst$kw$date,blog.colleges.core.mk_date(cljs.core.cst$kw$date.cljs$core$IFn$_invoke$arity$1(college))),cljs.core.cst$kw$status.cljs$core$IFn$_invoke$arity$1(college),cljs.core.inc);
}),new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$accept,(0),cljs.core.cst$kw$waitlist,(0),cljs.core.cst$kw$reject,(0)], null),blog.colleges.list.colleges_list)));
var last_point = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.last(graph_existing),new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$date,blog.colleges.core.last_or_current_date,cljs.core.cst$kw$cur_DASH_day,true], null)], 0));
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(graph_existing,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [last_point], null));
})();
blog.colleges.core.viz = blog.d3.select.cljs$core$IFn$_invoke$arity$1("#viz");
blog.colleges.core.viz_node = blog.d3.node(blog.colleges.core.viz);
blog.colleges.core.d3_window = blog.d3.select.cljs$core$IFn$_invoke$arity$1(window);
blog.colleges.core.viz_width = blog.d3.attr(blog.colleges.core.viz,cljs.core.cst$kw$width);
blog.colleges.core.viz_height = blog.d3.attr(blog.colleges.core.viz,cljs.core.cst$kw$height);
blog.colleges.core.in_bounds = (function blog$colleges$core$in_bounds(x,y){
return ((((0) < x)) && ((x < blog.colleges.core.viz_width))) && ((((0) < y)) && ((y < blog.colleges.core.viz_height)));
});
blog.colleges.core.time_format = blog.d3.time_format("%d %b %y");
blog.colleges.core.x_scale = blog.d3.time_scale.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.cst$kw$domain,blog.colleges.core.full_date_extent,cljs.core.cst$kw$range,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),blog.colleges.core.viz_width], null)], 0));
blog.colleges.core.y_scale_above = blog.d3.linear_scale.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.cst$kw$domain,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(10)], null),cljs.core.cst$kw$range,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(blog.colleges.core.viz_height / (2)),(0)], null)], 0));
blog.colleges.core.y_scale_below = blog.d3.linear_scale.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.cst$kw$domain,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(10)], null),cljs.core.cst$kw$range,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(blog.colleges.core.viz_height / (2)),blog.colleges.core.viz_height], null)], 0));
blog.colleges.core.make_axes = (function blog$colleges$core$make_axes(){
var x_axis = blog.d3.axis.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.cst$kw$scale,blog.colleges.core.x_scale,cljs.core.cst$kw$ticks,(0),cljs.core.cst$kw$outer_DASH_tick_DASH_size,(0)], 0));
return blog.d3.call(blog.d3.attrs.cljs$core$IFn$_invoke$arity$variadic(blog.d3.append(blog.colleges.core.viz,cljs.core.cst$kw$g),cljs.core.array_seq([cljs.core.cst$kw$class,"x axis",cljs.core.cst$kw$transform,blog.d3.translate((0),(blog.colleges.core.viz_height / (2)))], 0)),x_axis);
});
blog.colleges.core.upcoming_dates = cljs.core.map.cljs$core$IFn$_invoke$arity$2(blog.colleges.core.mk_date,cljs.core.distinct.cljs$core$IFn$_invoke$arity$1(cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$date,cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__11998_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$status.cljs$core$IFn$_invoke$arity$1(p1__11998_SHARP_),cljs.core.cst$kw$upcoming);
}),blog.colleges.list.colleges_list))));
blog.colleges.core.make_upcoming_rect = (function blog$colleges$core$make_upcoming_rect(){
var last_of_graph = cljs.core.last(blog.colleges.core.colleges_graph);
var min_x = (function (){var G__12009 = cljs.core.cst$kw$date.cljs$core$IFn$_invoke$arity$1(last_of_graph);
return (blog.colleges.core.x_scale.cljs$core$IFn$_invoke$arity$1 ? blog.colleges.core.x_scale.cljs$core$IFn$_invoke$arity$1(G__12009) : blog.colleges.core.x_scale.call(null,G__12009));
})();
var max_x = (function (){var G__12010 = cljs.core.last(blog.colleges.core.colleges_dates);
return (blog.colleges.core.x_scale.cljs$core$IFn$_invoke$arity$1 ? blog.colleges.core.x_scale.cljs$core$IFn$_invoke$arity$1(G__12010) : blog.colleges.core.x_scale.call(null,G__12010));
})();
var dx = (max_x - min_x);
var min_y = (function (){var G__12011 = cljs.core.cst$kw$accept.cljs$core$IFn$_invoke$arity$1(last_of_graph);
return (blog.colleges.core.y_scale_above.cljs$core$IFn$_invoke$arity$1 ? blog.colleges.core.y_scale_above.cljs$core$IFn$_invoke$arity$1(G__12011) : blog.colleges.core.y_scale_above.call(null,G__12011));
})();
var max_y = (function (){var G__12012 = (cljs.core.cst$kw$waitlist.cljs$core$IFn$_invoke$arity$1(last_of_graph) + cljs.core.cst$kw$reject.cljs$core$IFn$_invoke$arity$1(last_of_graph));
return (blog.colleges.core.y_scale_below.cljs$core$IFn$_invoke$arity$1 ? blog.colleges.core.y_scale_below.cljs$core$IFn$_invoke$arity$1(G__12012) : blog.colleges.core.y_scale_below.call(null,G__12012));
})();
var dy = (max_y - min_y);
blog.d3.attrs.cljs$core$IFn$_invoke$arity$variadic(blog.d3.append(blog.colleges.core.viz,cljs.core.cst$kw$rect),cljs.core.array_seq([cljs.core.cst$kw$class,"area upcoming",cljs.core.cst$kw$x,min_x,cljs.core.cst$kw$y,min_y,cljs.core.cst$kw$width,dx,cljs.core.cst$kw$height,dy], 0));

var seq__12013 = cljs.core.seq(blog.colleges.core.upcoming_dates);
var chunk__12015 = null;
var count__12016 = (0);
var i__12017 = (0);
while(true){
if((i__12017 < count__12016)){
var date = chunk__12015.cljs$core$IIndexed$_nth$arity$2(null,i__12017);
var x_12019 = (blog.colleges.core.x_scale.cljs$core$IFn$_invoke$arity$1 ? blog.colleges.core.x_scale.cljs$core$IFn$_invoke$arity$1(date) : blog.colleges.core.x_scale.call(null,date));
blog.d3.attrs.cljs$core$IFn$_invoke$arity$variadic(blog.d3.append(blog.colleges.core.viz,cljs.core.cst$kw$line),cljs.core.array_seq([cljs.core.cst$kw$class,"college-upcoming-line",cljs.core.cst$kw$x1,x_12019,cljs.core.cst$kw$y1,min_y,cljs.core.cst$kw$x2,x_12019,cljs.core.cst$kw$y2,max_y], 0));

var G__12020 = seq__12013;
var G__12021 = chunk__12015;
var G__12022 = count__12016;
var G__12023 = (i__12017 + (1));
seq__12013 = G__12020;
chunk__12015 = G__12021;
count__12016 = G__12022;
i__12017 = G__12023;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq(seq__12013);
if(temp__4657__auto__){
var seq__12013__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__12013__$1)){
var c__7021__auto__ = cljs.core.chunk_first(seq__12013__$1);
var G__12024 = cljs.core.chunk_rest(seq__12013__$1);
var G__12025 = c__7021__auto__;
var G__12026 = cljs.core.count(c__7021__auto__);
var G__12027 = (0);
seq__12013 = G__12024;
chunk__12015 = G__12025;
count__12016 = G__12026;
i__12017 = G__12027;
continue;
} else {
var date = cljs.core.first(seq__12013__$1);
var x_12028 = (blog.colleges.core.x_scale.cljs$core$IFn$_invoke$arity$1 ? blog.colleges.core.x_scale.cljs$core$IFn$_invoke$arity$1(date) : blog.colleges.core.x_scale.call(null,date));
blog.d3.attrs.cljs$core$IFn$_invoke$arity$variadic(blog.d3.append(blog.colleges.core.viz,cljs.core.cst$kw$line),cljs.core.array_seq([cljs.core.cst$kw$class,"college-upcoming-line",cljs.core.cst$kw$x1,x_12028,cljs.core.cst$kw$y1,min_y,cljs.core.cst$kw$x2,x_12028,cljs.core.cst$kw$y2,max_y], 0));

var G__12029 = cljs.core.next(seq__12013__$1);
var G__12030 = null;
var G__12031 = (0);
var G__12032 = (0);
seq__12013 = G__12029;
chunk__12015 = G__12030;
count__12016 = G__12031;
i__12017 = G__12032;
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
var accept_area = blog.d3.area.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.cst$kw$x,(function (p1__12033_SHARP_){
var G__12046 = cljs.core.cst$kw$date.cljs$core$IFn$_invoke$arity$1(p1__12033_SHARP_);
return (blog.colleges.core.x_scale.cljs$core$IFn$_invoke$arity$1 ? blog.colleges.core.x_scale.cljs$core$IFn$_invoke$arity$1(G__12046) : blog.colleges.core.x_scale.call(null,G__12046));
}),cljs.core.cst$kw$y0,cljs.core.constantly((blog.colleges.core.y_scale_above.cljs$core$IFn$_invoke$arity$1 ? blog.colleges.core.y_scale_above.cljs$core$IFn$_invoke$arity$1((0)) : blog.colleges.core.y_scale_above.call(null,(0)))),cljs.core.cst$kw$y1,(function (p1__12034_SHARP_){
var G__12047 = cljs.core.cst$kw$accept.cljs$core$IFn$_invoke$arity$1(p1__12034_SHARP_);
return (blog.colleges.core.y_scale_above.cljs$core$IFn$_invoke$arity$1 ? blog.colleges.core.y_scale_above.cljs$core$IFn$_invoke$arity$1(G__12047) : blog.colleges.core.y_scale_above.call(null,G__12047));
}),cljs.core.cst$kw$interpolate,cljs.core.cst$kw$step_DASH_after], 0));
var reject_area = blog.d3.area.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.cst$kw$x,((function (accept_area){
return (function (p1__12035_SHARP_){
var G__12048 = cljs.core.cst$kw$date.cljs$core$IFn$_invoke$arity$1(p1__12035_SHARP_);
return (blog.colleges.core.x_scale.cljs$core$IFn$_invoke$arity$1 ? blog.colleges.core.x_scale.cljs$core$IFn$_invoke$arity$1(G__12048) : blog.colleges.core.x_scale.call(null,G__12048));
});})(accept_area))
,cljs.core.cst$kw$y0,((function (accept_area){
return (function (p1__12036_SHARP_){
var G__12049 = cljs.core.cst$kw$waitlist.cljs$core$IFn$_invoke$arity$1(p1__12036_SHARP_);
return (blog.colleges.core.y_scale_below.cljs$core$IFn$_invoke$arity$1 ? blog.colleges.core.y_scale_below.cljs$core$IFn$_invoke$arity$1(G__12049) : blog.colleges.core.y_scale_below.call(null,G__12049));
});})(accept_area))
,cljs.core.cst$kw$y1,((function (accept_area){
return (function (d){
var G__12050 = (cljs.core.cst$kw$waitlist.cljs$core$IFn$_invoke$arity$1(d) + cljs.core.cst$kw$reject.cljs$core$IFn$_invoke$arity$1(d));
return (blog.colleges.core.y_scale_below.cljs$core$IFn$_invoke$arity$1 ? blog.colleges.core.y_scale_below.cljs$core$IFn$_invoke$arity$1(G__12050) : blog.colleges.core.y_scale_below.call(null,G__12050));
});})(accept_area))
,cljs.core.cst$kw$interpolate,cljs.core.cst$kw$step_DASH_after], 0));
var waitlist_area = blog.d3.area.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.cst$kw$x,((function (accept_area,reject_area){
return (function (p1__12037_SHARP_){
var G__12051 = cljs.core.cst$kw$date.cljs$core$IFn$_invoke$arity$1(p1__12037_SHARP_);
return (blog.colleges.core.x_scale.cljs$core$IFn$_invoke$arity$1 ? blog.colleges.core.x_scale.cljs$core$IFn$_invoke$arity$1(G__12051) : blog.colleges.core.x_scale.call(null,G__12051));
});})(accept_area,reject_area))
,cljs.core.cst$kw$y0,cljs.core.constantly((blog.colleges.core.y_scale_below.cljs$core$IFn$_invoke$arity$1 ? blog.colleges.core.y_scale_below.cljs$core$IFn$_invoke$arity$1((0)) : blog.colleges.core.y_scale_below.call(null,(0)))),cljs.core.cst$kw$y1,((function (accept_area,reject_area){
return (function (p1__12038_SHARP_){
var G__12052 = cljs.core.cst$kw$waitlist.cljs$core$IFn$_invoke$arity$1(p1__12038_SHARP_);
return (blog.colleges.core.y_scale_below.cljs$core$IFn$_invoke$arity$1 ? blog.colleges.core.y_scale_below.cljs$core$IFn$_invoke$arity$1(G__12052) : blog.colleges.core.y_scale_below.call(null,G__12052));
});})(accept_area,reject_area))
,cljs.core.cst$kw$interpolate,cljs.core.cst$kw$step_DASH_after], 0));
blog.d3.attrs.cljs$core$IFn$_invoke$arity$variadic(blog.d3.datum(blog.d3.append(blog.colleges.core.viz,cljs.core.cst$kw$path),blog.colleges.core.colleges_graph),cljs.core.array_seq([cljs.core.cst$kw$class,"area accept",cljs.core.cst$kw$d,accept_area], 0));

blog.d3.attrs.cljs$core$IFn$_invoke$arity$variadic(blog.d3.datum(blog.d3.append(blog.colleges.core.viz,cljs.core.cst$kw$path),blog.colleges.core.colleges_graph),cljs.core.array_seq([cljs.core.cst$kw$class,"area reject",cljs.core.cst$kw$d,reject_area], 0));

blog.d3.attrs.cljs$core$IFn$_invoke$arity$variadic(blog.d3.datum(blog.d3.append(blog.colleges.core.viz,cljs.core.cst$kw$path),blog.colleges.core.colleges_graph),cljs.core.array_seq([cljs.core.cst$kw$class,"area waitlist",cljs.core.cst$kw$d,waitlist_area], 0));

return blog.colleges.core.make_upcoming_rect();
});
blog.colleges.core.make_current_day = (function blog$colleges$core$make_current_day(){
var x_pos = (blog.colleges.core.x_scale.cljs$core$IFn$_invoke$arity$1 ? blog.colleges.core.x_scale.cljs$core$IFn$_invoke$arity$1(blog.colleges.core.last_or_current_date) : blog.colleges.core.x_scale.call(null,blog.colleges.core.last_or_current_date));
return blog.d3.attrs.cljs$core$IFn$_invoke$arity$variadic(blog.d3.append(blog.colleges.core.viz,cljs.core.cst$kw$line),cljs.core.array_seq([cljs.core.cst$kw$class,"current-day",cljs.core.cst$kw$stroke_DASH_dasharray,"5, 5",cljs.core.cst$kw$x1,x_pos,cljs.core.cst$kw$y1,(0),cljs.core.cst$kw$x2,x_pos,cljs.core.cst$kw$y2,blog.colleges.core.viz_height], 0));
});
blog.colleges.core.hover_line = (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null) : cljs.core.atom.call(null,null));
blog.colleges.core.add_to_hover_line = (function blog$colleges$core$add_to_hover_line(g,date){
blog.d3.attrs.cljs$core$IFn$_invoke$arity$variadic(blog.d3.append(g,cljs.core.cst$kw$line),cljs.core.array_seq([cljs.core.cst$kw$x1,(0),cljs.core.cst$kw$x2,(0),cljs.core.cst$kw$y1,(0),cljs.core.cst$kw$y2,blog.colleges.core.viz_height], 0));

blog.d3.attrs.cljs$core$IFn$_invoke$arity$variadic(blog.d3.text(blog.d3.append(g,cljs.core.cst$kw$text),(blog.colleges.core.time_format.cljs$core$IFn$_invoke$arity$1 ? blog.colleges.core.time_format.cljs$core$IFn$_invoke$arity$1(date) : blog.colleges.core.time_format.call(null,date))),cljs.core.array_seq([cljs.core.cst$kw$y,(20)], 0));

return g;
});
blog.colleges.core.human_status = new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$accept,"Accepted!",cljs.core.cst$kw$reject,"Rejected",cljs.core.cst$kw$waitlist,"Waitlisted",cljs.core.cst$kw$upcoming,"Upcoming"], null);
blog.colleges.core.set_college_result = (function blog$colleges$core$set_college_result(sel){
return blog.d3.text(blog.d3.attrs.cljs$core$IFn$_invoke$arity$variadic(sel,cljs.core.array_seq([cljs.core.cst$kw$class,(function (d){
return [cljs.core.str("college-result "),cljs.core.str(cljs.core.name(cljs.core.cst$kw$status.cljs$core$IFn$_invoke$arity$1(d)))].join('');
}),cljs.core.cst$kw$y,(function (d,i){
return ((40) + ((20) * i));
})], 0)),(function (d){
return [cljs.core.str(cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(d)),cljs.core.str(" ("),cljs.core.str((function (){var G__12054 = cljs.core.cst$kw$status.cljs$core$IFn$_invoke$arity$1(d);
return (blog.colleges.core.human_status.cljs$core$IFn$_invoke$arity$1 ? blog.colleges.core.human_status.cljs$core$IFn$_invoke$arity$1(G__12054) : blog.colleges.core.human_status.call(null,G__12054));
})()),cljs.core.str(")")].join('');
}));
});
blog.colleges.core.results_by_date = cljs.core.group_by(cljs.core.cst$kw$date,blog.colleges.list.colleges_list);
blog.colleges.core.set_hover_line_colleges = (function blog$colleges$core$set_hover_line_colleges(g,date){
var colleges_on_day = (function (){var or__6210__auto__ = (function (){var G__12058 = blog.colleges.core.mk_date_vector(date);
return (blog.colleges.core.results_by_date.cljs$core$IFn$_invoke$arity$1 ? blog.colleges.core.results_by_date.cljs$core$IFn$_invoke$arity$1(G__12058) : blog.colleges.core.results_by_date.call(null,G__12058));
})();
if(cljs.core.truth_(or__6210__auto__)){
return or__6210__auto__;
} else {
return cljs.core.PersistentVector.EMPTY;
}
})();
var sel = blog.d3.data(blog.d3.selectAll.cljs$core$IFn$_invoke$arity$2(g,"text.college-result"),colleges_on_day);
blog.colleges.core.set_college_result(sel);

blog.d3.remove(blog.d3.exit(sel));

return blog.colleges.core.set_college_result(blog.d3.append(blog.d3.enter(sel),cljs.core.cst$kw$text));
});
blog.colleges.core.get_hover_date = (function blog$colleges$core$get_hover_date(x){
var corresponding_date = blog.d3.invert(blog.colleges.core.x_scale,x);
return cljs.core.last(cljs.core.take_while.cljs$core$IFn$_invoke$arity$2(((function (corresponding_date){
return (function (p1__12059_SHARP_){
return (p1__12059_SHARP_ <= corresponding_date);
});})(corresponding_date))
,blog.colleges.core.colleges_dates));
});
blog.colleges.core.delete_hover = (function blog$colleges$core$delete_hover(){
var temp__4657__auto__ = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(blog.colleges.core.hover_line) : cljs.core.deref.call(null,blog.colleges.core.hover_line));
if(cljs.core.truth_(temp__4657__auto__)){
var cur_line = temp__4657__auto__;
blog.d3.remove(cur_line);

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
return blog.colleges.core.add_to_hover_line(blog.d3.append(blog.colleges.core.viz,cljs.core.cst$kw$g),date);
}
})();
blog.d3.text(blog.d3.select.cljs$core$IFn$_invoke$arity$2(blog.d3.attrs.cljs$core$IFn$_invoke$arity$variadic(blog.d3.transition.cljs$core$IFn$_invoke$arity$variadic(cur,cljs.core.array_seq([cljs.core.cst$kw$duration,(500),cljs.core.cst$kw$ease,cljs.core.cst$kw$elastic], 0)),cljs.core.array_seq([cljs.core.cst$kw$transform,blog.d3.translate(line_x,(0)),cljs.core.cst$kw$class,[cljs.core.str("hover"),cljs.core.str(((anchor_start_QMARK_)?" anchor-start":null))].join('')], 0)),"text"),(blog.colleges.core.time_format.cljs$core$IFn$_invoke$arity$1 ? blog.colleges.core.time_format.cljs$core$IFn$_invoke$arity$1(date) : blog.colleges.core.time_format.call(null,date)));

blog.colleges.core.set_hover_line_colleges(cur,date);

blog.d3.attrs.cljs$core$IFn$_invoke$arity$variadic(blog.d3.selectAll.cljs$core$IFn$_invoke$arity$2(cur,"text"),cljs.core.array_seq([cljs.core.cst$kw$x,((anchor_start_QMARK_)?(5):(-5))], 0));

return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(blog.colleges.core.hover_line,cur) : cljs.core.reset_BANG_.call(null,blog.colleges.core.hover_line,cur));
});
blog.colleges.core.listen_to_mouse = (function blog$colleges$core$listen_to_mouse(){
return blog.d3.on(blog.d3.window,cljs.core.cst$kw$mousemove,(function (){
var vec__12061 = blog.d3.mouse(blog.colleges.core.viz_node);
var x = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12061,(0),null);
var y = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12061,(1),null);
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
blog.colleges.core.make_axes();
blog.colleges.core.make_current_day();
blog.colleges.core.listen_to_mouse();
