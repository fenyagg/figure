(window.webpackJsonpfigure=window.webpackJsonpfigure||[]).push([[0],{11:function(e,t,n){e.exports={canvas:"Canvas_canvas__2RoZx",cursorNW:"Canvas_cursorNW__33ger",cursorNE:"Canvas_cursorNE__nNk2-"}},12:function(e,t,n){e.exports={figure:"Figure_figure__11N-U",figureSelected:"Figure_figureSelected__ZPkLY",figureInside:"Figure_figureInside__2aIvI"}},15:function(e,t,n){e.exports={mainContainer:"Editor_mainContainer__1_Pj-",content:"Editor_content__3NR9L"}},21:function(e,t,n){e.exports=n(38)},37:function(e,t,n){},38:function(e,t,n){"use strict";n.r(t);n(22);var i,a,r=n(1),s=n.n(r),c=n(17),o=n.n(c),u=n(4),g=n(3),l=n(10),d=n(0),f=n(18),p=n(19),v=new(function(){function e(){Object(f.a)(this,e),this.STORAGE_NAME="CANVAS"}return Object(p.a)(e,[{key:"saveSnap",value:function(e){window.localStorage.setItem(this.STORAGE_NAME,JSON.stringify(e))}},{key:"getSnap",value:function(){var e=window.localStorage.getItem(this.STORAGE_NAME);return e?JSON.parse(e):{}}}]),e}()),h=["addFigure","deleteSelectedFigure","stopDragging","stopResizing"],m=n(20),F=n.n(m);!function(e){e.DISABLE="disable",e.LEFT_TOP="left-top",e.LEFT_BOT="left-bottom",e.RIGHT_TOP="right-top",e.RIGHT_BOT="right-bottom"}(i||(i={})),function(e){e.CIRCLE="circle",e.SQUARE="square",e.TRIANGLE="triangle"}(a||(a={}));var O=d.x.model({id:d.x.identifier,left:d.x.number,top:d.x.number,width:d.x.number,height:d.x.number,type:d.x.enumeration(Object.values(a))}),b=d.x.model({figures:d.x.array(O),selectedFigureId:d.x.maybeNull(d.x.string),width:d.x.optional(d.x.number,800),height:d.x.optional(d.x.number,600),draggingFigureId:d.x.maybeNull(d.x.string),resizingType:d.x.optional(d.x.enumeration(Object.values(i)),i.DISABLE),minFigureWidth:d.x.optional(d.x.number,100),minFigureHeight:d.x.optional(d.x.number,100),figureTypes:d.x.optional(d.x.array(d.x.enumeration(Object.values(a))),Object.values(a))}).views(function(e){return{get isResizing(){return e.resizingType!==i.DISABLE},get selectedFigure(){return e.figures.find(function(t){return t.id===e.selectedFigureId})},get isDragging(){return!!e.draggingFigureId}}}).views(function(e){return{get activeDotPosition(){if(e.selectedFigure)switch(e.resizingType){case i.LEFT_TOP:return{x:e.selectedFigure.left,y:e.selectedFigure.top};case i.LEFT_BOT:return{x:e.selectedFigure.left,y:e.selectedFigure.top+e.selectedFigure.height};case i.RIGHT_TOP:return{x:e.selectedFigure.left+e.selectedFigure.width,y:e.selectedFigure.top};case i.RIGHT_BOT:return{x:e.selectedFigure.left+e.selectedFigure.width,y:e.selectedFigure.top+e.selectedFigure.height};default:return}}}}).actions(function(e){return{addFigure:function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:150,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:150,a={id:F()(),type:t,width:n,height:i,left:e.width/2-n/2,top:e.height/2-i/2};return e.figures.push(a),e.selectedFigureId=a.id,a},selectFigure:function(t){e.selectedFigureId=t},moveDraggingFigure:function(t,n){var i=e.figures.find(function(t){return t.id===e.draggingFigureId});if(i){var a=i.left+t;a<0&&(a=0),a>e.width-i.width&&(a=e.width-i.width),i.left=a;var r=i.top+n;r<0&&(r=0),r>e.height-i.height&&(r=e.height-i.height),i.top=r}},deleteSelectedFigure:function(){var t=e.figures.find(function(t){return t.id===e.selectedFigureId});t&&(Object(d.h)(t),e.selectedFigureId=null)},startDragging:function(t){e.draggingFigureId=t},stopDragging:function(){e.draggingFigureId=null},setResizingType:function(t){e.resizingType=t},stopResizing:function(){e.resizingType=i.DISABLE},resizeSelectedFigure:function(t,n){if(e.selectedFigure&&(t||n)){var a={left:e.selectedFigure.left,top:e.selectedFigure.top,width:e.selectedFigure.width,height:e.selectedFigure.height},r=function(i,r,s,c){if(a.left+=t*i,a.top+=n*r,a.width+=t*s,a.height+=n*c,a.left<0&&(a.width+=a.left,a.left=0),a.left+a.width>e.width&&(a.width=e.width-a.left),a.top<0&&(a.height+=a.top,a.top=0),a.top+a.height>e.height&&(a.height=e.height-a.top),a.width<e.minFigureWidth){var o=e.minFigureWidth-a.width;a.width=e.minFigureWidth,a.left+=o*i*-1}if(a.height<e.minFigureHeight){var u=e.minFigureHeight-a.height;a.height=e.minFigureHeight,a.top+=u*r*-1}e.selectedFigure.left=a.left,e.selectedFigure.top=a.top,e.selectedFigure.width=a.width,e.selectedFigure.height=a.height};switch(e.resizingType){case i.LEFT_TOP:r(1,1,-1,-1);break;case i.LEFT_BOT:r(1,0,-1,1);break;case i.RIGHT_TOP:r(0,1,1,-1);break;case i.RIGHT_BOT:r(0,0,1,1);break;case i.DISABLE:return}}}}});function _(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,i)}return n}var y=d.x.model({figures:b.properties.figures}),w=d.x.model({snapShots:d.x.array(y),activeSnapIndex:d.x.optional(d.x.number,0)}).views(function(e){return{get canBack(){return!!e.activeSnapIndex},get canForward(){return e.activeSnapIndex+1<e.snapShots.length}}}).actions(function(e){return{addSnapShot:function(t){var n=e.activeSnapIndex+1;n<e.snapShots.length&&e.snapShots.splice(n,e.snapShots.length-n),e.snapShots.push(t),e.activeSnapIndex=e.snapShots.length-1,v.saveSnap(e.snapShots[e.activeSnapIndex])},changeIndexBy:function(t){var n=e.activeSnapIndex+t,i=Object(d.m)(e);if(!(n+1>e.snapShots.length)){var a=e.snapShots[n],r=function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?_(n,!0).forEach(function(t){Object(g.a)(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):_(n).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}({},Object(d.n)(i.canvas),{},Object(d.n)(a));e.activeSnapIndex=n,Object(d.e)(i.canvas,r),v.saveSnap(a)}}}});function E(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,i)}return n}var j=d.x.model({canvas:b,history:w}),T=function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?E(n,!0).forEach(function(t){Object(g.a)(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):E(n).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}({figures:[]},v.getSnap()),x=j.create({canvas:T,history:{snapShots:[T]}});Object(d.s)(x,function(e){if(Object(d.l)(x.canvas)===e.path&&h.includes(e.name)){var t=Object(d.n)(x.canvas);x.history.addSnapShot(t)}},!0);var I,S=s.a.createContext(x),N=function(){return Object(r.useContext)(S)},L=n(11),R=n.n(L),B=n(5),D=n.n(B),k=n(8),C=function(e){var t=e.insideEvents,n=void 0===t?{}:t,i=e.insideClassName,a=Object(k.a)(e,["insideEvents","insideClassName"]);return s.a.createElement("svg",Object.assign({viewBox:"-1 -1 32 32"},a),s.a.createElement("ellipse",Object.assign({className:i},n,{cx:"15",cy:"15",rx:"15",ry:"15"})))},P=function(e){var t=e.insideEvents,n=void 0===t?{}:t,i=e.insideClassName,a=Object(k.a)(e,["insideEvents","insideClassName"]);return s.a.createElement("svg",Object.assign({viewBox:"-1 -1 32 32"},a),s.a.createElement("rect",Object.assign({className:i},n,{width:"30",height:"30"})))},z=function(e){var t=e.insideEvents,n=void 0===t?{}:t,i=e.insideClassName,a=Object(k.a)(e,["insideEvents","insideClassName"]);return s.a.createElement("svg",Object.assign({viewBox:"-1 -1 32 32"},a),s.a.createElement("polygon",Object.assign({className:i},n,{points:"15,0 00,30 30,30"})))},A=(I={},Object(g.a)(I,a.SQUARE,P),Object(g.a)(I,a.TRIANGLE,z),Object(g.a)(I,a.CIRCLE,C),I),G=function(e){var t=e.type,n=Object(k.a)(e,["type"]),i=A[t];return i?s.a.createElement(i,n):null},H=n(12),M=n.n(H),W=Object(u.a)(function(e){var t=e.figure,n=N(),i=Object(r.useState)(!1),a=Object(l.a)(i,2),c=a[0],o=a[1],u=Object(r.useMemo)(function(){return t.id===n.canvas.selectedFigureId},[t.id,n.canvas.selectedFigureId]);return s.a.createElement(G,{type:t.type,style:{width:t.width,height:t.height,transform:"translate3d(\n          ".concat(t.left,"px,\n          ").concat(t.top,"px,\n          0\n        )")},preserveAspectRatio:"none",className:D()(M.a.figure,Object(g.a)({},M.a.figureSelected,u)),insideClassName:M.a.figureInside,onMouseMove:function(e){o(!1)},insideEvents:{onMouseUp:function(e){e.stopPropagation(),n.canvas.isDragging&&n.canvas.stopDragging(),!u&&c&&(n.canvas.selectFigure(t.id),o(!1))},onMouseDown:function(e){0===e.button&&(o(!0),n.canvas.startDragging(t.id))}}})}),J=n(6),U=n.n(J),Y=[{type:i.LEFT_TOP,className:U.a.dotLeftTop},{type:i.LEFT_BOT,className:U.a.dotLeftBot},{type:i.RIGHT_TOP,className:U.a.dotRightTop},{type:i.RIGHT_BOT,className:U.a.dotRightBot}],Z=Object(u.a)(function(){var e,t=N(),n=t.canvas.selectedFigure;return n?s.a.createElement("div",{style:{width:n.width,height:n.height,transform:"translate3d(\n          ".concat(n.left,"px,\n          ").concat(n.top,"px,\n          0\n        )")},className:D()(U.a.figureFrame,(e={},Object(g.a)(e,U.a.figureFrameCanDrag,!t.canvas.isResizing),Object(g.a)(e,U.a.figureFrameDragging,t.canvas.isDragging),Object(g.a)(e,U.a.figureFrameIsResizing,t.canvas.isResizing),e))},Y.map(function(e){return s.a.createElement("div",{key:e.type,onMouseDown:function(n){return function(e,n){e.stopPropagation(),0===e.button&&t.canvas.setResizingType(n)}(n,e.type)},className:D()(U.a.dot,e.className)})})):null}),V=Object(u.a)(function(){var e,t=N(),n=Object(r.useRef)(null),a=Object(r.useState)(!1),c=Object(l.a)(a,2),o=c[0],u=c[1];return Object(r.useEffect)(function(){var e=function(e){t.canvas.selectedFigureId&&("Delete"===e.key&&t.canvas.deleteSelectedFigure(),"Escape"===e.key&&t.canvas.selectFigure(null))};return window.document.addEventListener("keydown",e),function(){window.document.removeEventListener("keydown",e)}},[t.canvas]),s.a.createElement("div",{className:D()((e={},Object(g.a)(e,R.a.canvas,!0),Object(g.a)(e,R.a.cursorNW,[i.LEFT_TOP,i.RIGHT_BOT].includes(t.canvas.resizingType)),Object(g.a)(e,R.a.cursorNE,[i.LEFT_BOT,i.RIGHT_TOP].includes(t.canvas.resizingType)),e)),style:{width:t.canvas.width,height:t.canvas.height},onMouseMove:function(e){o&&u(!1),t.canvas.isDragging&&t.canvas.moveDraggingFigure(e.movementX,e.movementY);var i=t.canvas.activeDotPosition;t.canvas.isResizing&&n.current&&i&&t.canvas.resizeSelectedFigure(e.pageX-n.current.offsetLeft-i.x,e.pageY-n.current.offsetTop-i.y)},onMouseLeave:function(e){e.currentTarget===n.current&&(t.canvas.isDragging&&t.canvas.stopDragging(),t.canvas.isResizing&&t.canvas.stopResizing())},onMouseUp:function(e){e.currentTarget===n.current&&t.canvas.selectedFigureId&&o&&t.canvas.selectFigure(null),t.canvas.isResizing&&t.canvas.stopResizing()},onMouseDown:function(e){e.currentTarget===n.current&&u(!0)},ref:n},t.canvas.figures.map(function(e){return s.a.createElement(W,{key:e.id,figure:e})}),t.canvas.selectedFigure&&s.a.createElement(Z,null))}),Q=n(7),X=n.n(Q),q=Object(u.a)(function(){var e,t,n=N();return s.a.createElement("div",{className:X.a.controlBar},s.a.createElement("div",{className:X.a.figureList},n.canvas.figureTypes.map(function(e){return s.a.createElement(G,{key:e,type:e,onClick:function(){return n.canvas.addFigure(e)},className:X.a.figure})})),s.a.createElement("div",{className:X.a.nav},s.a.createElement("div",{onClick:function(){return n.history.changeIndexBy(-1)},className:D()((e={},Object(g.a)(e,X.a.navLink,!0),Object(g.a)(e,X.a.navLinkDisabled,!n.history.canBack),e))},"\u2190 prev"),s.a.createElement("div",{onClick:function(){return n.history.changeIndexBy(1)},className:D()((t={},Object(g.a)(t,X.a.navLink,!0),Object(g.a)(t,X.a.navLinkDisabled,!n.history.canForward),t))},"next \u2192")))}),$=n(15),K=n.n($),ee=Object(u.a)(function(){return s.a.createElement("div",{className:K.a.mainContainer},s.a.createElement("div",{className:K.a.content},s.a.createElement(q,null),s.a.createElement(V,null)))}),te=function(){return s.a.createElement(ee,null)};n(37),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(s.a.createElement(te,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},6:function(e,t,n){e.exports={figureFrame:"FigureFrame_figureFrame__3u_wv",figureFrameCanDrag:"FigureFrame_figureFrameCanDrag__zyI4L",figureFrameDragging:"FigureFrame_figureFrameDragging__Fz2Zn",figureFrameIsResizing:"FigureFrame_figureFrameIsResizing__2VczY",dot:"FigureFrame_dot__13GyJ",dotLeftTop:"FigureFrame_dotLeftTop__1ZFIB",dotLeftBot:"FigureFrame_dotLeftBot__2HOVY",dotRightTop:"FigureFrame_dotRightTop__3GUvo",dotRightBot:"FigureFrame_dotRightBot__2wy_8"}},7:function(e,t,n){e.exports={controlBar:"ControlBar_controlBar__3PY33",figureList:"ControlBar_figureList__1J69d",figure:"ControlBar_figure__2SWC2",nav:"ControlBar_nav__3-9BT",navLink:"ControlBar_navLink__35_ME",navLinkDisabled:"ControlBar_navLinkDisabled__LBITr"}}},[[21,1,2]]]);
//# sourceMappingURL=main.d3476ade.chunk.js.map