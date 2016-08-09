goog.provide("blog.colleges.core"),goog.require("cljs.core"),goog.require("blog.colleges.list"),goog.require("blog.d3"),cljs.core.enable_console_print_BANG_(),blog.colleges.core.mk_date=function(e){var c=e,l=cljs.core.nth.cljs$core$IFn$_invoke$arity$3(c,0,null),o=cljs.core.nth.cljs$core$IFn$_invoke$arity$3(c,1,null),r=cljs.core.nth.cljs$core$IFn$_invoke$arity$3(c,2,null);return new Date(2e3+r,l-1,o)},blog.colleges.core.mk_date_vector=function(e){return new cljs.core.PersistentVector(null,3,5,cljs.core.PersistentVector.EMPTY_NODE,[e.getMonth()+1,e.getDate(),e.getFullYear()-2e3],null)},blog.colleges.core.add_days=function(e,c){var l=new Date(e);return l.setDate(e.getDate()+c),l},blog.colleges.core.colleges_dates=cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.comp.cljs$core$IFn$_invoke$arity$2(blog.colleges.core.mk_date,cljs.core.cst$kw$date),blog.colleges.list.colleges_list),blog.colleges.core.full_date_extent=function(){var e=blog.d3.extent(blog.colleges.core.colleges_dates),c=cljs.core.nth.cljs$core$IFn$_invoke$arity$3(e,0,null),l=cljs.core.nth.cljs$core$IFn$_invoke$arity$3(e,1,null);return new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[blog.colleges.core.add_days(c,-3),blog.colleges.core.add_days(l,3)],null)}(),blog.colleges.core.first_date=cljs.core.first(blog.colleges.core.full_date_extent),blog.colleges.core.last_date=cljs.core.second(blog.colleges.core.full_date_extent),blog.colleges.core.last_or_current_date=function(){var e=new Date,c=blog.colleges.core.last_date;return c>e?e:c}(),blog.colleges.core.colleges_graph=function(){var e=cljs.core.take_while.cljs$core$IFn$_invoke$arity$2(function(e){return cljs.core.not(cljs.core.cst$kw$upcoming.cljs$core$IFn$_invoke$arity$1(e))},cljs.core.next(cljs.core.reductions.cljs$core$IFn$_invoke$arity$3(function(e,c){return cljs.core.update.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(e,cljs.core.cst$kw$date,blog.colleges.core.mk_date(cljs.core.cst$kw$date.cljs$core$IFn$_invoke$arity$1(c))),cljs.core.cst$kw$status.cljs$core$IFn$_invoke$arity$1(c),cljs.core.inc)},new cljs.core.PersistentArrayMap(null,3,[cljs.core.cst$kw$accept,0,cljs.core.cst$kw$waitlist,0,cljs.core.cst$kw$reject,0],null),blog.colleges.list.colleges_list))),c=cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.last(e),new cljs.core.PersistentArrayMap(null,2,[cljs.core.cst$kw$date,blog.colleges.core.last_or_current_date,cljs.core.cst$kw$cur_DASH_day,!0],null)],0));return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(e,new cljs.core.PersistentVector(null,1,5,cljs.core.PersistentVector.EMPTY_NODE,[c],null))}(),blog.colleges.core.viz=blog.d3.select.cljs$core$IFn$_invoke$arity$1("#viz"),blog.colleges.core.viz_node=blog.d3.node(blog.colleges.core.viz),blog.colleges.core.d3_window=blog.d3.select.cljs$core$IFn$_invoke$arity$1(window),blog.colleges.core.viz_width=blog.d3.attr(blog.colleges.core.viz,cljs.core.cst$kw$width),blog.colleges.core.viz_height=blog.d3.attr(blog.colleges.core.viz,cljs.core.cst$kw$height),blog.colleges.core.in_bounds=function(e,c){return e>0&&e<blog.colleges.core.viz_width&&c>0&&c<blog.colleges.core.viz_height},blog.colleges.core.time_format=blog.d3.time_format("%d %b %y"),blog.colleges.core.x_scale=blog.d3.time_scale.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.cst$kw$domain,blog.colleges.core.full_date_extent,cljs.core.cst$kw$range,new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[0,blog.colleges.core.viz_width],null)],0)),blog.colleges.core.y_scale_above=blog.d3.linear_scale.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.cst$kw$domain,new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[0,10],null),cljs.core.cst$kw$range,new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[blog.colleges.core.viz_height/2,0],null)],0)),blog.colleges.core.y_scale_below=blog.d3.linear_scale.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.cst$kw$domain,new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[0,10],null),cljs.core.cst$kw$range,new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[blog.colleges.core.viz_height/2,blog.colleges.core.viz_height],null)],0)),blog.colleges.core.make_axes=function(){var e=blog.d3.axis.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.cst$kw$scale,blog.colleges.core.x_scale,cljs.core.cst$kw$ticks,0,cljs.core.cst$kw$outer_DASH_tick_DASH_size,0],0));return blog.d3.call(blog.d3.attrs.cljs$core$IFn$_invoke$arity$variadic(blog.d3.append(blog.colleges.core.viz,cljs.core.cst$kw$g),cljs.core.array_seq([cljs.core.cst$kw$class,"x axis",cljs.core.cst$kw$transform,blog.d3.translate(0,blog.colleges.core.viz_height/2)],0)),e)},blog.colleges.core.upcoming_dates=cljs.core.map.cljs$core$IFn$_invoke$arity$2(blog.colleges.core.mk_date,cljs.core.distinct.cljs$core$IFn$_invoke$arity$1(cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$date,cljs.core.filter.cljs$core$IFn$_invoke$arity$2(function(e){return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$status.cljs$core$IFn$_invoke$arity$1(e),cljs.core.cst$kw$upcoming)},blog.colleges.list.colleges_list)))),blog.colleges.core.make_upcoming_rect=function(){var e=cljs.core.last(blog.colleges.core.colleges_graph),c=function(){var c=cljs.core.cst$kw$date.cljs$core$IFn$_invoke$arity$1(e);return blog.colleges.core.x_scale.cljs$core$IFn$_invoke$arity$1?blog.colleges.core.x_scale.cljs$core$IFn$_invoke$arity$1(c):blog.colleges.core.x_scale.call(null,c)}(),l=function(){var e=cljs.core.last(blog.colleges.core.colleges_dates);return blog.colleges.core.x_scale.cljs$core$IFn$_invoke$arity$1?blog.colleges.core.x_scale.cljs$core$IFn$_invoke$arity$1(e):blog.colleges.core.x_scale.call(null,e)}(),o=l-c,r=function(){var c=cljs.core.cst$kw$accept.cljs$core$IFn$_invoke$arity$1(e);return blog.colleges.core.y_scale_above.cljs$core$IFn$_invoke$arity$1?blog.colleges.core.y_scale_above.cljs$core$IFn$_invoke$arity$1(c):blog.colleges.core.y_scale_above.call(null,c)}(),s=function(){var c=cljs.core.cst$kw$waitlist.cljs$core$IFn$_invoke$arity$1(e)+cljs.core.cst$kw$reject.cljs$core$IFn$_invoke$arity$1(e);return blog.colleges.core.y_scale_below.cljs$core$IFn$_invoke$arity$1?blog.colleges.core.y_scale_below.cljs$core$IFn$_invoke$arity$1(c):blog.colleges.core.y_scale_below.call(null,c)}(),$=s-r;blog.d3.attrs.cljs$core$IFn$_invoke$arity$variadic(blog.d3.append(blog.colleges.core.viz,cljs.core.cst$kw$rect),cljs.core.array_seq([cljs.core.cst$kw$class,"area upcoming",cljs.core.cst$kw$x,c,cljs.core.cst$kw$y,r,cljs.core.cst$kw$width,o,cljs.core.cst$kw$height,$],0));for(var t=cljs.core.seq(blog.colleges.core.upcoming_dates),n=null,a=0,i=0;;)if(a>i){var g=n.cljs$core$IIndexed$_nth$arity$2(null,i),_=blog.colleges.core.x_scale.cljs$core$IFn$_invoke$arity$1?blog.colleges.core.x_scale.cljs$core$IFn$_invoke$arity$1(g):blog.colleges.core.x_scale.call(null,g);blog.d3.attrs.cljs$core$IFn$_invoke$arity$variadic(blog.d3.append(blog.colleges.core.viz,cljs.core.cst$kw$line),cljs.core.array_seq([cljs.core.cst$kw$class,"college-upcoming-line",cljs.core.cst$kw$x1,_,cljs.core.cst$kw$y1,r,cljs.core.cst$kw$x2,_,cljs.core.cst$kw$y2,s],0));var j=t,b=n,k=a,v=i+1;t=j,n=b,a=k,i=v}else{var u=cljs.core.seq(t);if(!u)return null;var y=u;if(cljs.core.chunked_seq_QMARK_(y)){var d=cljs.core.chunk_first(y),w=cljs.core.chunk_rest(y),I=d,F=cljs.core.count(d),f=0;t=w,n=I,a=F,i=f;continue}var g=cljs.core.first(y),h=blog.colleges.core.x_scale.cljs$core$IFn$_invoke$arity$1?blog.colleges.core.x_scale.cljs$core$IFn$_invoke$arity$1(g):blog.colleges.core.x_scale.call(null,g);blog.d3.attrs.cljs$core$IFn$_invoke$arity$variadic(blog.d3.append(blog.colleges.core.viz,cljs.core.cst$kw$line),cljs.core.array_seq([cljs.core.cst$kw$class,"college-upcoming-line",cljs.core.cst$kw$x1,h,cljs.core.cst$kw$y1,r,cljs.core.cst$kw$x2,h,cljs.core.cst$kw$y2,s],0));var m=cljs.core.next(y),p=null,x=0,z=0;t=m,n=p,a=x,i=z}},blog.colleges.core.make_areas=function(){var e=blog.d3.area.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.cst$kw$x,function(e){var c=cljs.core.cst$kw$date.cljs$core$IFn$_invoke$arity$1(e);return blog.colleges.core.x_scale.cljs$core$IFn$_invoke$arity$1?blog.colleges.core.x_scale.cljs$core$IFn$_invoke$arity$1(c):blog.colleges.core.x_scale.call(null,c)},cljs.core.cst$kw$y0,cljs.core.constantly(blog.colleges.core.y_scale_above.cljs$core$IFn$_invoke$arity$1?blog.colleges.core.y_scale_above.cljs$core$IFn$_invoke$arity$1(0):blog.colleges.core.y_scale_above.call(null,0)),cljs.core.cst$kw$y1,function(e){var c=cljs.core.cst$kw$accept.cljs$core$IFn$_invoke$arity$1(e);return blog.colleges.core.y_scale_above.cljs$core$IFn$_invoke$arity$1?blog.colleges.core.y_scale_above.cljs$core$IFn$_invoke$arity$1(c):blog.colleges.core.y_scale_above.call(null,c)},cljs.core.cst$kw$interpolate,cljs.core.cst$kw$step_DASH_after],0)),c=blog.d3.area.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.cst$kw$x,function(e){return function(e){var c=cljs.core.cst$kw$date.cljs$core$IFn$_invoke$arity$1(e);return blog.colleges.core.x_scale.cljs$core$IFn$_invoke$arity$1?blog.colleges.core.x_scale.cljs$core$IFn$_invoke$arity$1(c):blog.colleges.core.x_scale.call(null,c)}}(e),cljs.core.cst$kw$y0,function(e){return function(e){var c=cljs.core.cst$kw$waitlist.cljs$core$IFn$_invoke$arity$1(e);return blog.colleges.core.y_scale_below.cljs$core$IFn$_invoke$arity$1?blog.colleges.core.y_scale_below.cljs$core$IFn$_invoke$arity$1(c):blog.colleges.core.y_scale_below.call(null,c)}}(e),cljs.core.cst$kw$y1,function(e){return function(e){var c=cljs.core.cst$kw$waitlist.cljs$core$IFn$_invoke$arity$1(e)+cljs.core.cst$kw$reject.cljs$core$IFn$_invoke$arity$1(e);return blog.colleges.core.y_scale_below.cljs$core$IFn$_invoke$arity$1?blog.colleges.core.y_scale_below.cljs$core$IFn$_invoke$arity$1(c):blog.colleges.core.y_scale_below.call(null,c)}}(e),cljs.core.cst$kw$interpolate,cljs.core.cst$kw$step_DASH_after],0)),l=blog.d3.area.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.cst$kw$x,function(e,c){return function(e){var c=cljs.core.cst$kw$date.cljs$core$IFn$_invoke$arity$1(e);return blog.colleges.core.x_scale.cljs$core$IFn$_invoke$arity$1?blog.colleges.core.x_scale.cljs$core$IFn$_invoke$arity$1(c):blog.colleges.core.x_scale.call(null,c)}}(e,c),cljs.core.cst$kw$y0,cljs.core.constantly(blog.colleges.core.y_scale_below.cljs$core$IFn$_invoke$arity$1?blog.colleges.core.y_scale_below.cljs$core$IFn$_invoke$arity$1(0):blog.colleges.core.y_scale_below.call(null,0)),cljs.core.cst$kw$y1,function(e,c){return function(e){var c=cljs.core.cst$kw$waitlist.cljs$core$IFn$_invoke$arity$1(e);return blog.colleges.core.y_scale_below.cljs$core$IFn$_invoke$arity$1?blog.colleges.core.y_scale_below.cljs$core$IFn$_invoke$arity$1(c):blog.colleges.core.y_scale_below.call(null,c)}}(e,c),cljs.core.cst$kw$interpolate,cljs.core.cst$kw$step_DASH_after],0));return blog.d3.attrs.cljs$core$IFn$_invoke$arity$variadic(blog.d3.datum(blog.d3.append(blog.colleges.core.viz,cljs.core.cst$kw$path),blog.colleges.core.colleges_graph),cljs.core.array_seq([cljs.core.cst$kw$class,"area accept",cljs.core.cst$kw$d,e],0)),blog.d3.attrs.cljs$core$IFn$_invoke$arity$variadic(blog.d3.datum(blog.d3.append(blog.colleges.core.viz,cljs.core.cst$kw$path),blog.colleges.core.colleges_graph),cljs.core.array_seq([cljs.core.cst$kw$class,"area reject",cljs.core.cst$kw$d,c],0)),blog.d3.attrs.cljs$core$IFn$_invoke$arity$variadic(blog.d3.datum(blog.d3.append(blog.colleges.core.viz,cljs.core.cst$kw$path),blog.colleges.core.colleges_graph),cljs.core.array_seq([cljs.core.cst$kw$class,"area waitlist",cljs.core.cst$kw$d,l],0)),blog.colleges.core.make_upcoming_rect()},blog.colleges.core.make_current_day=function(){var e=blog.colleges.core.x_scale.cljs$core$IFn$_invoke$arity$1?blog.colleges.core.x_scale.cljs$core$IFn$_invoke$arity$1(blog.colleges.core.last_or_current_date):blog.colleges.core.x_scale.call(null,blog.colleges.core.last_or_current_date);return blog.d3.attrs.cljs$core$IFn$_invoke$arity$variadic(blog.d3.append(blog.colleges.core.viz,cljs.core.cst$kw$line),cljs.core.array_seq([cljs.core.cst$kw$class,"current-day",cljs.core.cst$kw$stroke_DASH_dasharray,"5, 5",cljs.core.cst$kw$x1,e,cljs.core.cst$kw$y1,0,cljs.core.cst$kw$x2,e,cljs.core.cst$kw$y2,blog.colleges.core.viz_height],0))},blog.colleges.core.hover_line=cljs.core.atom.cljs$core$IFn$_invoke$arity$1?cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null):cljs.core.atom.call(null,null),blog.colleges.core.add_to_hover_line=function(e,c){return blog.d3.attrs.cljs$core$IFn$_invoke$arity$variadic(blog.d3.append(e,cljs.core.cst$kw$line),cljs.core.array_seq([cljs.core.cst$kw$x1,0,cljs.core.cst$kw$x2,0,cljs.core.cst$kw$y1,0,cljs.core.cst$kw$y2,blog.colleges.core.viz_height],0)),blog.d3.attrs.cljs$core$IFn$_invoke$arity$variadic(blog.d3.text(blog.d3.append(e,cljs.core.cst$kw$text),blog.colleges.core.time_format.cljs$core$IFn$_invoke$arity$1?blog.colleges.core.time_format.cljs$core$IFn$_invoke$arity$1(c):blog.colleges.core.time_format.call(null,c)),cljs.core.array_seq([cljs.core.cst$kw$y,20],0)),e},blog.colleges.core.human_status=new cljs.core.PersistentArrayMap(null,4,[cljs.core.cst$kw$accept,"Accepted!",cljs.core.cst$kw$reject,"Rejected",cljs.core.cst$kw$waitlist,"Waitlisted",cljs.core.cst$kw$upcoming,"Upcoming"],null),blog.colleges.core.set_college_result=function(e){return blog.d3.text(blog.d3.attrs.cljs$core$IFn$_invoke$arity$variadic(e,cljs.core.array_seq([cljs.core.cst$kw$class,function(e){return[cljs.core.str("college-result "),cljs.core.str(cljs.core.name(cljs.core.cst$kw$status.cljs$core$IFn$_invoke$arity$1(e)))].join("")},cljs.core.cst$kw$y,function(e,c){return 40+20*c}],0)),function(e){return[cljs.core.str(cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(e)),cljs.core.str(" ("),cljs.core.str(function(){var c=cljs.core.cst$kw$status.cljs$core$IFn$_invoke$arity$1(e);return blog.colleges.core.human_status.cljs$core$IFn$_invoke$arity$1?blog.colleges.core.human_status.cljs$core$IFn$_invoke$arity$1(c):blog.colleges.core.human_status.call(null,c)}()),cljs.core.str(")")].join("")})},blog.colleges.core.results_by_date=cljs.core.group_by(cljs.core.cst$kw$date,blog.colleges.list.colleges_list),blog.colleges.core.set_hover_line_colleges=function(e,c){var l=function(){var e=function(){var e=blog.colleges.core.mk_date_vector(c);return blog.colleges.core.results_by_date.cljs$core$IFn$_invoke$arity$1?blog.colleges.core.results_by_date.cljs$core$IFn$_invoke$arity$1(e):blog.colleges.core.results_by_date.call(null,e)}();return cljs.core.truth_(e)?e:cljs.core.PersistentVector.EMPTY}(),o=blog.d3.data(blog.d3.selectAll.cljs$core$IFn$_invoke$arity$2(e,"text.college-result"),l);return blog.colleges.core.set_college_result(o),blog.d3.remove(blog.d3.exit(o)),blog.colleges.core.set_college_result(blog.d3.append(blog.d3.enter(o),cljs.core.cst$kw$text))},blog.colleges.core.get_hover_date=function(e){var c=blog.d3.invert(blog.colleges.core.x_scale,e);return cljs.core.last(cljs.core.take_while.cljs$core$IFn$_invoke$arity$2(function(e){return function(c){return e>=c}}(c),blog.colleges.core.colleges_dates))},blog.colleges.core.delete_hover=function(){var e=cljs.core.deref.cljs$core$IFn$_invoke$arity$1?cljs.core.deref.cljs$core$IFn$_invoke$arity$1(blog.colleges.core.hover_line):cljs.core.deref.call(null,blog.colleges.core.hover_line);if(cljs.core.truth_(e)){var c=e;return blog.d3.remove(c),cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2?cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(blog.colleges.core.hover_line,null):cljs.core.reset_BANG_.call(null,blog.colleges.core.hover_line,null)}return null},blog.colleges.core.make_hover=function(e){var c=blog.colleges.core.x_scale.cljs$core$IFn$_invoke$arity$1?blog.colleges.core.x_scale.cljs$core$IFn$_invoke$arity$1(e):blog.colleges.core.x_scale.call(null,e),l=c<blog.colleges.core.viz_width/2,o=cljs.core.deref.cljs$core$IFn$_invoke$arity$1?cljs.core.deref.cljs$core$IFn$_invoke$arity$1(blog.colleges.core.hover_line):cljs.core.deref.call(null,blog.colleges.core.hover_line),r=function(){var c=o;return cljs.core.truth_(c)?c:blog.colleges.core.add_to_hover_line(blog.d3.append(blog.colleges.core.viz,cljs.core.cst$kw$g),e)}();return blog.d3.text(blog.d3.select.cljs$core$IFn$_invoke$arity$2(blog.d3.attrs.cljs$core$IFn$_invoke$arity$variadic(blog.d3.transition.cljs$core$IFn$_invoke$arity$variadic(r,cljs.core.array_seq([cljs.core.cst$kw$duration,500,cljs.core.cst$kw$ease,cljs.core.cst$kw$elastic],0)),cljs.core.array_seq([cljs.core.cst$kw$transform,blog.d3.translate(c,0),cljs.core.cst$kw$class,[cljs.core.str("hover"),cljs.core.str(l?" anchor-start":null)].join("")],0)),"text"),blog.colleges.core.time_format.cljs$core$IFn$_invoke$arity$1?blog.colleges.core.time_format.cljs$core$IFn$_invoke$arity$1(e):blog.colleges.core.time_format.call(null,e)),blog.colleges.core.set_hover_line_colleges(r,e),blog.d3.attrs.cljs$core$IFn$_invoke$arity$variadic(blog.d3.selectAll.cljs$core$IFn$_invoke$arity$2(r,"text"),cljs.core.array_seq([cljs.core.cst$kw$x,l?5:-5],0)),cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2?cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(blog.colleges.core.hover_line,r):cljs.core.reset_BANG_.call(null,blog.colleges.core.hover_line,r)},blog.colleges.core.listen_to_mouse=function(){return blog.d3.on(blog.d3.window,cljs.core.cst$kw$mousemove,function(){var e=blog.d3.mouse(blog.colleges.core.viz_node),c=cljs.core.nth.cljs$core$IFn$_invoke$arity$3(e,0,null),l=cljs.core.nth.cljs$core$IFn$_invoke$arity$3(e,1,null);if(cljs.core.truth_(blog.colleges.core.in_bounds(c,l))){var o=blog.colleges.core.get_hover_date(c);if(cljs.core.truth_(o)){var r=o;return blog.colleges.core.make_hover(r)}return blog.colleges.core.delete_hover()}return blog.colleges.core.delete_hover()})},blog.colleges.core.make_areas(),blog.colleges.core.make_axes(),blog.colleges.core.make_current_day(),blog.colleges.core.listen_to_mouse();