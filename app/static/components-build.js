/**
 * @license
 * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */
// @version: 0.3.5
window.PolymerGestures={},function(a){var b=!1,c=document.createElement("meta");if(c.createShadowRoot){var d=c.createShadowRoot(),e=document.createElement("span");d.appendChild(e),c.addEventListener("testpath",function(a){a.path&&(b=a.path[0]===e),a.stopPropagation()});var f=new CustomEvent("testpath",{bubbles:!0});document.head.appendChild(c),e.dispatchEvent(f),c.parentNode.removeChild(c),d=e=null}c=null;var g={shadow:function(a){return a?a.shadowRoot||a.webkitShadowRoot:void 0},canTarget:function(a){return a&&Boolean(a.elementFromPoint)},targetingShadow:function(a){var b=this.shadow(a);return this.canTarget(b)?b:void 0},olderShadow:function(a){var b=a.olderShadowRoot;if(!b){var c=a.querySelector("shadow");c&&(b=c.olderShadowRoot)}return b},allShadows:function(a){for(var b=[],c=this.shadow(a);c;)b.push(c),c=this.olderShadow(c);return b},searchRoot:function(a,b,c){var d,e;return a?(d=a.elementFromPoint(b,c),d?e=this.targetingShadow(d):a!==document&&(e=this.olderShadow(a)),this.searchRoot(e,b,c)||d):void 0},owner:function(a){if(!a)return document;for(var b=a;b.parentNode;)b=b.parentNode;return b.nodeType!=Node.DOCUMENT_NODE&&b.nodeType!=Node.DOCUMENT_FRAGMENT_NODE&&(b=document),b},findTarget:function(a){if(b&&a.path)return a.path[0];var c=a.clientX,d=a.clientY,e=this.owner(a.target);return e.elementFromPoint(c,d)||(e=document),this.searchRoot(e,c,d)},findTouchAction:function(a){var c;if(b&&a.path){for(var d=a.path,e=0;e<d.length;e++)if(c=d[e],c.nodeType===Node.ELEMENT_NODE&&c.hasAttribute("touch-action"))return c.getAttribute("touch-action")}else for(c=a.target;c;){if(c.hasAttribute("touch-action"))return c.getAttribute("touch-action");c=c.parentNode||c.host}return"auto"},LCA:function(a,b){if(a===b)return a;if(a&&!b)return a;if(b&&!a)return b;if(!b&&!a)return document;if(a.contains&&a.contains(b))return a;if(b.contains&&b.contains(a))return b;var c=this.depth(a),d=this.depth(b),e=c-d;for(e>=0?a=this.walk(a,e):b=this.walk(b,-e);a&&b&&a!==b;)a=a.parentNode||a.host,b=b.parentNode||b.host;return a},walk:function(a,b){for(var c=0;a&&b>c;c++)a=a.parentNode||a.host;return a},depth:function(a){for(var b=0;a;)b++,a=a.parentNode||a.host;return b},deepContains:function(a,b){var c=this.LCA(a,b);return c===a},insideNode:function(a,b,c){var d=a.getBoundingClientRect();return d.left<=b&&b<=d.right&&d.top<=c&&c<=d.bottom}};a.targetFinding=g,a.findTarget=g.findTarget.bind(g),a.deepContains=g.deepContains.bind(g),a.insideNode=g.insideNode}(window.PolymerGestures),function(){function a(a){return"html /deep/ "+b(a)}function b(a){return'[touch-action="'+a+'"]'}function c(a){return"{ -ms-touch-action: "+a+"; touch-action: "+a+";}"}var d=["none","auto","pan-x","pan-y",{rule:"pan-x pan-y",selectors:["pan-x pan-y","pan-y pan-x"]},"manipulation"],e="",f="string"==typeof document.head.style.touchAction,g=!window.ShadowDOMPolyfill&&document.head.createShadowRoot;if(f){d.forEach(function(d){String(d)===d?(e+=b(d)+c(d)+"\n",g&&(e+=a(d)+c(d)+"\n")):(e+=d.selectors.map(b)+c(d.rule)+"\n",g&&(e+=d.selectors.map(a)+c(d.rule)+"\n"))});var h=document.createElement("style");h.textContent=e,document.head.appendChild(h)}}(),function(a){var b=["bubbles","cancelable","view","detail","screenX","screenY","clientX","clientY","ctrlKey","altKey","shiftKey","metaKey","button","relatedTarget","pageX","pageY"],c=[!1,!1,null,null,0,0,0,0,!1,!1,!1,!1,0,null,0,0],d=function(){return function(){}},e={preventTap:d,makeBaseEvent:function(a,b){var c=document.createEvent("Event");return c.initEvent(a,b.bubbles||!1,b.cancelable||!1),c.preventTap=e.preventTap(c),c},makeGestureEvent:function(a,b){b=b||Object.create(null);for(var c,d=this.makeBaseEvent(a,b),e=0,f=Object.keys(b);e<f.length;e++)c=f[e],d[c]=b[c];return d},makePointerEvent:function(a,d){d=d||Object.create(null);for(var e,f=this.makeBaseEvent(a,d),g=0;g<b.length;g++)e=b[g],f[e]=d[e]||c[g];f.buttons=d.buttons||0;var h=0;return h=d.pressure?d.pressure:f.buttons?.5:0,f.x=f.clientX,f.y=f.clientY,f.pointerId=d.pointerId||0,f.width=d.width||0,f.height=d.height||0,f.pressure=h,f.tiltX=d.tiltX||0,f.tiltY=d.tiltY||0,f.pointerType=d.pointerType||"",f.hwTimestamp=d.hwTimestamp||0,f.isPrimary=d.isPrimary||!1,f._source=d._source||"",f}};a.eventFactory=e}(window.PolymerGestures),function(a){function b(){if(c){var a=new Map;return a.pointers=d,a}this.keys=[],this.values=[]}var c=window.Map&&window.Map.prototype.forEach,d=function(){return this.size};b.prototype={set:function(a,b){var c=this.keys.indexOf(a);c>-1?this.values[c]=b:(this.keys.push(a),this.values.push(b))},has:function(a){return this.keys.indexOf(a)>-1},"delete":function(a){var b=this.keys.indexOf(a);b>-1&&(this.keys.splice(b,1),this.values.splice(b,1))},get:function(a){var b=this.keys.indexOf(a);return this.values[b]},clear:function(){this.keys.length=0,this.values.length=0},forEach:function(a,b){this.values.forEach(function(c,d){a.call(b,c,this.keys[d],this)},this)},pointers:function(){return this.keys.length}},a.PointerMap=b}(window.PolymerGestures),function(a){var b=["bubbles","cancelable","view","detail","screenX","screenY","clientX","clientY","ctrlKey","altKey","shiftKey","metaKey","button","relatedTarget","buttons","pointerId","width","height","pressure","tiltX","tiltY","pointerType","hwTimestamp","isPrimary","type","target","currentTarget","which","pageX","pageY","timeStamp","preventTap","tapPrevented","_source"],c=[!1,!1,null,null,0,0,0,0,!1,!1,!1,!1,0,null,0,0,0,0,0,0,0,"",0,!1,"",null,null,0,0,0,0,function(){},!1],d="undefined"!=typeof SVGElementInstance,e=a.eventFactory,f={pointermap:new a.PointerMap,eventMap:Object.create(null),eventSources:Object.create(null),eventSourceList:[],gestures:[],dependencyMap:{down:{listeners:0,index:-1},up:{listeners:0,index:-1}},gestureQueue:[],registerSource:function(a,b){var c=b,d=c.events;d&&(d.forEach(function(a){c[a]&&(this.eventMap[a]=c[a].bind(c))},this),this.eventSources[a]=c,this.eventSourceList.push(c))},registerGesture:function(a,b){var c=Object.create(null);c.listeners=0,c.index=this.gestures.length;for(var d,e=0;e<b.exposes.length;e++)d=b.exposes[e].toLowerCase(),this.dependencyMap[d]=c;this.gestures.push(b)},register:function(a,b){for(var c,d=this.eventSourceList.length,e=0;d>e&&(c=this.eventSourceList[e]);e++)c.register.call(c,a,b)},unregister:function(a){for(var b,c=this.eventSourceList.length,d=0;c>d&&(b=this.eventSourceList[d]);d++)b.unregister.call(b,a)},down:function(a){this.fireEvent("down",a)},move:function(a){a.type="move",this.fillGestureQueue(a)},up:function(a){this.fireEvent("up",a)},cancel:function(a){a.tapPrevented=!0,this.fireEvent("up",a)},eventHandler:function(a){if(!a._handledByPG){var b=a.type,c=this.eventMap&&this.eventMap[b];c&&c(a),a._handledByPG=!0}},listen:function(a,b){for(var c,d=0,e=b.length;e>d&&(c=b[d]);d++)this.addEvent(a,c)},unlisten:function(a,b){for(var c,d=0,e=b.length;e>d&&(c=b[d]);d++)this.removeEvent(a,c)},addEvent:function(a,b){a.addEventListener(b,this.boundHandler)},removeEvent:function(a,b){a.removeEventListener(b,this.boundHandler)},makeEvent:function(a,b){var c=e.makePointerEvent(a,b);return c.preventDefault=b.preventDefault,c.tapPrevented=b.tapPrevented,c._target=c._target||b.target,c},fireEvent:function(a,b){var c=this.makeEvent(a,b);return this.dispatchEvent(c)},cloneEvent:function(a){for(var e,f=Object.create(null),g=0;g<b.length;g++)e=b[g],f[e]=a[e]||c[g],("target"===e||"relatedTarget"===e)&&d&&f[e]instanceof SVGElementInstance&&(f[e]=f[e].correspondingUseElement);return f.preventDefault=function(){a.preventDefault()},f},dispatchEvent:function(a){var b=a._target;if(b){b.dispatchEvent(a);var c=this.cloneEvent(a);c.target=b,this.fillGestureQueue(c)}},gestureTrigger:function(){for(var a,b=0;b<this.gestureQueue.length;b++){a=this.gestureQueue[b];for(var c,d,e=0;e<this.gestures.length;e++)c=this.gestures[e],d=c[a.type],c.enabled&&d&&d.call(c,a)}this.gestureQueue.length=0},fillGestureQueue:function(a){this.gestureQueue.length||requestAnimationFrame(this.boundGestureTrigger),this.gestureQueue.push(a)}};f.boundHandler=f.eventHandler.bind(f),f.boundGestureTrigger=f.gestureTrigger.bind(f),a.dispatcher=f,a.activateGesture=function(a,b){var c=b.toLowerCase(),d=f.dependencyMap[c];if(d){var e=f.gestures[d.index];if(0===d.listeners&&e&&(e.enabled=!0),d.listeners++,a._pgListeners||(f.register(a),a._pgListeners=0),e){var g,h=e.defaultActions&&e.defaultActions[c];switch(a.nodeType){case Node.ELEMENT_NODE:g=a;break;case Node.DOCUMENT_FRAGMENT_NODE:g=a.host;break;default:g=null}h&&g&&!g.hasAttribute("touch-action")&&g.setAttribute("touch-action",h)}a._pgListeners++}return Boolean(d)},a.addEventListener=function(b,c,d,e){d&&(a.activateGesture(b,c),b.addEventListener(c,d,e))},a.deactivateGesture=function(a,b){var c=b.toLowerCase(),d=f.dependencyMap[c];if(d){if(d.listeners>0&&d.listeners--,0===d.listeners){var e=f.gestures[d.index];e&&(e.enabled=!1)}a._pgListeners>0&&a._pgListeners--,0===a._pgListeners&&f.unregister(a)}return Boolean(d)},a.removeEventListener=function(b,c,d,e){d&&(a.deactivateGesture(b,c),b.removeEventListener(c,d,e))}}(window.PolymerGestures),function(a){var b=a.dispatcher,c=b.pointermap,d=25,e=[0,1,4,2],f=!1;try{f=1===new MouseEvent("test",{buttons:1}).buttons}catch(g){}var h={POINTER_ID:1,POINTER_TYPE:"mouse",events:["mousedown","mousemove","mouseup"],exposes:["down","up","move"],register:function(a){b.listen(a,this.events)},unregister:function(a){b.unlisten(a,this.events)},lastTouches:[],isEventSimulatedFromTouch:function(a){for(var b,c=this.lastTouches,e=a.clientX,f=a.clientY,g=0,h=c.length;h>g&&(b=c[g]);g++){var i=Math.abs(e-b.x),j=Math.abs(f-b.y);if(d>=i&&d>=j)return!0}},prepareEvent:function(a){var c=b.cloneEvent(a);return c.pointerId=this.POINTER_ID,c.isPrimary=!0,c.pointerType=this.POINTER_TYPE,c._source="mouse",f||(c.buttons=e[c.which]||0),c},mousedown:function(d){if(!this.isEventSimulatedFromTouch(d)){var e=c.has(this.POINTER_ID);e&&this.mouseup(d);var f=this.prepareEvent(d);f.target=a.findTarget(d),c.set(this.POINTER_ID,f.target),b.down(f)}},mousemove:function(a){if(!this.isEventSimulatedFromTouch(a)){var d=c.get(this.POINTER_ID);if(d){var e=this.prepareEvent(a);e.target=d,0===e.buttons?(b.cancel(e),this.cleanupMouse()):b.move(e)}}},mouseup:function(d){if(!this.isEventSimulatedFromTouch(d)){var e=this.prepareEvent(d);e.relatedTarget=a.findTarget(d),e.target=c.get(this.POINTER_ID),b.up(e),this.cleanupMouse()}},cleanupMouse:function(){c["delete"](this.POINTER_ID)}};a.mouseEvents=h}(window.PolymerGestures),function(a){var b=a.dispatcher,c=(a.targetFinding.allShadows.bind(a.targetFinding),b.pointermap),d=(Array.prototype.map.call.bind(Array.prototype.map),2500),e=200,f=20,g=!1,h={events:["touchstart","touchmove","touchend","touchcancel"],exposes:["down","up","move"],register:function(a,c){c||b.listen(a,this.events)},unregister:function(a){b.unlisten(a,this.events)},scrollTypes:{EMITTER:"none",XSCROLLER:"pan-x",YSCROLLER:"pan-y"},touchActionToScrollType:function(a){var b=a,c=this.scrollTypes;return b===c.EMITTER?"none":b===c.XSCROLLER?"X":b===c.YSCROLLER?"Y":"XY"},POINTER_TYPE:"touch",firstTouch:null,isPrimaryTouch:function(a){return this.firstTouch===a.identifier},setPrimaryTouch:function(a){(0===c.pointers()||1===c.pointers()&&c.has(1))&&(this.firstTouch=a.identifier,this.firstXY={X:a.clientX,Y:a.clientY},this.scrolling=null,this.cancelResetClickCount())},removePrimaryPointer:function(a){a.isPrimary&&(this.firstTouch=null,this.firstXY=null,this.resetClickCount())},clickCount:0,resetId:null,resetClickCount:function(){var a=function(){this.clickCount=0,this.resetId=null}.bind(this);this.resetId=setTimeout(a,e)},cancelResetClickCount:function(){this.resetId&&clearTimeout(this.resetId)},typeToButtons:function(a){var b=0;return("touchstart"===a||"touchmove"===a)&&(b=1),b},findTarget:function(b,d){if("touchstart"===this.currentTouchEvent.type){if(this.isPrimaryTouch(b)){var e={clientX:b.clientX,clientY:b.clientY,path:this.currentTouchEvent.path,target:this.currentTouchEvent.target};return a.findTarget(e)}return a.findTarget(b)}return c.get(d)},touchToPointer:function(a){var c=this.currentTouchEvent,d=b.cloneEvent(a),e=d.pointerId=a.identifier+2;d.target=this.findTarget(a,e),d.bubbles=!0,d.cancelable=!0,d.detail=this.clickCount,d.buttons=this.typeToButtons(c.type),d.width=a.webkitRadiusX||a.radiusX||0,d.height=a.webkitRadiusY||a.radiusY||0,d.pressure=a.webkitForce||a.force||.5,d.isPrimary=this.isPrimaryTouch(a),d.pointerType=this.POINTER_TYPE,d._source="touch";var f=this;return d.preventDefault=function(){f.scrolling=!1,f.firstXY=null,c.preventDefault()},d},processTouches:function(a,b){var d=a.changedTouches;this.currentTouchEvent=a;for(var e,f,g=0;g<d.length;g++)e=d[g],f=this.touchToPointer(e),"touchstart"===a.type&&c.set(f.pointerId,f.target),c.has(f.pointerId)&&b.call(this,f),("touchend"===a.type||a._cancel)&&this.cleanUpPointer(f)},shouldScroll:function(b){if(this.firstXY){var c,d=a.targetFinding.findTouchAction(b),e=this.touchActionToScrollType(d);if("none"===e)c=!1;else if("XY"===e)c=!0;else{var f=b.changedTouches[0],g=e,h="Y"===e?"X":"Y",i=Math.abs(f["client"+g]-this.firstXY[g]),j=Math.abs(f["client"+h]-this.firstXY[h]);c=i>=j}return c}},findTouch:function(a,b){for(var c,d=0,e=a.length;e>d&&(c=a[d]);d++)if(c.identifier===b)return!0},vacuumTouches:function(a){var b=a.touches;if(c.pointers()>=b.length){var d=[];c.forEach(function(a,c){if(1!==c&&!this.findTouch(b,c-2)){var e=a;d.push(e)}},this),d.forEach(function(a){this.cancel(a),c.delete(a.pointerId)})}},touchstart:function(a){this.vacuumTouches(a),this.setPrimaryTouch(a.changedTouches[0]),this.dedupSynthMouse(a),this.scrolling||(this.clickCount++,this.processTouches(a,this.down))},down:function(a){b.down(a)},touchmove:function(a){if(g)a.cancelable&&this.processTouches(a,this.move);else if(this.scrolling){if(this.firstXY){var b=a.changedTouches[0],c=b.clientX-this.firstXY.X,d=b.clientY-this.firstXY.Y,e=Math.sqrt(c*c+d*d);e>=f&&(this.touchcancel(a),this.scrolling=!0,this.firstXY=null)}}else null===this.scrolling&&this.shouldScroll(a)?this.scrolling=!0:(this.scrolling=!1,a.preventDefault(),this.processTouches(a,this.move))},move:function(a){b.move(a)},touchend:function(a){this.dedupSynthMouse(a),this.processTouches(a,this.up)},up:function(c){c.relatedTarget=a.findTarget(c),b.up(c)},cancel:function(a){b.cancel(a)},touchcancel:function(a){a._cancel=!0,this.processTouches(a,this.cancel)},cleanUpPointer:function(a){c["delete"](a.pointerId),this.removePrimaryPointer(a)},dedupSynthMouse:function(b){var c=a.mouseEvents.lastTouches,e=b.changedTouches[0];if(this.isPrimaryTouch(e)){var f={x:e.clientX,y:e.clientY};c.push(f);var g=function(a,b){var c=a.indexOf(b);c>-1&&a.splice(c,1)}.bind(null,c,f);setTimeout(g,d)}}};a.touchEvents=h}(window.PolymerGestures),function(a){var b=a.dispatcher,c=b.pointermap,d=window.MSPointerEvent&&"number"==typeof window.MSPointerEvent.MSPOINTER_TYPE_MOUSE,e={events:["MSPointerDown","MSPointerMove","MSPointerUp","MSPointerCancel"],register:function(a){a===document&&b.listen(a,this.events)},unregister:function(a){b.unlisten(a,this.events)},POINTER_TYPES:["","unavailable","touch","pen","mouse"],prepareEvent:function(a){var c=a;return c=b.cloneEvent(a),d&&(c.pointerType=this.POINTER_TYPES[a.pointerType]),c._source="ms",c},cleanup:function(a){c["delete"](a)},MSPointerDown:function(d){var e=this.prepareEvent(d);e.target=a.findTarget(d),c.set(d.pointerId,e.target),b.down(e)},MSPointerMove:function(a){var d=this.prepareEvent(a);d.target=c.get(d.pointerId),b.move(d)},MSPointerUp:function(d){var e=this.prepareEvent(d);e.relatedTarget=a.findTarget(d),e.target=c.get(e.pointerId),b.up(e),this.cleanup(d.pointerId)},MSPointerCancel:function(d){var e=this.prepareEvent(d);e.relatedTarget=a.findTarget(d),e.target=c.get(e.pointerId),b.cancel(e),this.cleanup(d.pointerId)}};a.msEvents=e}(window.PolymerGestures),function(a){var b=a.dispatcher,c=b.pointermap,d={events:["pointerdown","pointermove","pointerup","pointercancel"],prepareEvent:function(a){var c=b.cloneEvent(a);return c._source="pointer",c},register:function(a){a===document&&b.listen(a,this.events)},unregister:function(a){b.unlisten(a,this.events)},cleanup:function(a){c["delete"](a)},pointerdown:function(d){var e=this.prepareEvent(d);e.target=a.findTarget(d),c.set(e.pointerId,e.target),b.down(e)},pointermove:function(a){var d=this.prepareEvent(a);d.target=c.get(d.pointerId),b.move(d)},pointerup:function(d){var e=this.prepareEvent(d);e.relatedTarget=a.findTarget(d),e.target=c.get(e.pointerId),b.up(e),this.cleanup(d.pointerId)},pointercancel:function(d){var e=this.prepareEvent(d);e.relatedTarget=a.findTarget(d),e.target=c.get(e.pointerId),b.cancel(e),this.cleanup(d.pointerId)}};a.pointerEvents=d}(window.PolymerGestures),function(a){var b=a.dispatcher,c=window.navigator;if(window.PointerEvent)b.registerSource("pointer",a.pointerEvents);else if(c.msPointerEnabled)b.registerSource("ms",a.msEvents);else if(b.registerSource("mouse",a.mouseEvents),void 0!==window.ontouchstart){b.registerSource("touch",a.touchEvents);var d=c.userAgent.match("Safari")&&!c.userAgent.match("Chrome");d&&document.body.addEventListener("touchstart",function(){})}b.register(document,!0)}(window.PolymerGestures),function(a){var b=a.dispatcher,c=a.eventFactory,d=new a.PointerMap,e={events:["down","move","up"],exposes:["trackstart","track","trackx","tracky","trackend"],defaultActions:{track:"none",trackx:"pan-y",tracky:"pan-x"},WIGGLE_THRESHOLD:4,clampDir:function(a){return a>0?1:-1},calcPositionDelta:function(a,b){var c=0,d=0;return a&&b&&(c=b.pageX-a.pageX,d=b.pageY-a.pageY),{x:c,y:d}},fireTrack:function(a,b,d){var e=d,f=this.calcPositionDelta(e.downEvent,b),g=this.calcPositionDelta(e.lastMoveEvent,b);if(g.x)e.xDirection=this.clampDir(g.x);else if("trackx"===a)return;if(g.y)e.yDirection=this.clampDir(g.y);else if("tracky"===a)return;var h={bubbles:!0,cancelable:!0,trackInfo:e.trackInfo,relatedTarget:b.relatedTarget,pointerType:b.pointerType,pointerId:b.pointerId,_source:"track"};"tracky"!==a&&(h.x=b.x,h.dx=f.x,h.ddx=g.x,h.clientX=b.clientX,h.pageX=b.pageX,h.screenX=b.screenX,h.xDirection=e.xDirection),"trackx"!==a&&(h.dy=f.y,h.ddy=g.y,h.y=b.y,h.clientY=b.clientY,h.pageY=b.pageY,h.screenY=b.screenY,h.yDirection=e.yDirection);var i=c.makeGestureEvent(a,h);e.downTarget.dispatchEvent(i)},down:function(a){if(a.isPrimary&&("mouse"===a.pointerType?1===a.buttons:!0)){var b={downEvent:a,downTarget:a.target,trackInfo:{},lastMoveEvent:null,xDirection:0,yDirection:0,tracking:!1};d.set(a.pointerId,b)}},move:function(a){var b=d.get(a.pointerId);if(b){if(!b.tracking){var c=this.calcPositionDelta(b.downEvent,a),e=c.x*c.x+c.y*c.y;e>this.WIGGLE_THRESHOLD&&(b.tracking=!0,b.lastMoveEvent=b.downEvent,this.fireTrack("trackstart",a,b))}b.tracking&&(this.fireTrack("track",a,b),this.fireTrack("trackx",a,b),this.fireTrack("tracky",a,b)),b.lastMoveEvent=a}},up:function(a){var b=d.get(a.pointerId);b&&(b.tracking&&this.fireTrack("trackend",a,b),d.delete(a.pointerId))}};b.registerGesture("track",e)}(window.PolymerGestures),function(a){var b=a.dispatcher,c=a.eventFactory,d={HOLD_DELAY:200,WIGGLE_THRESHOLD:16,events:["down","move","up"],exposes:["hold","holdpulse","release"],heldPointer:null,holdJob:null,pulse:function(){var a=Date.now()-this.heldPointer.timeStamp,b=this.held?"holdpulse":"hold";this.fireHold(b,a),this.held=!0},cancel:function(){clearInterval(this.holdJob),this.held&&this.fireHold("release"),this.held=!1,this.heldPointer=null,this.target=null,this.holdJob=null},down:function(a){a.isPrimary&&!this.heldPointer&&(this.heldPointer=a,this.target=a.target,this.holdJob=setInterval(this.pulse.bind(this),this.HOLD_DELAY))},up:function(a){this.heldPointer&&this.heldPointer.pointerId===a.pointerId&&this.cancel()},move:function(a){if(this.heldPointer&&this.heldPointer.pointerId===a.pointerId){var b=a.clientX-this.heldPointer.clientX,c=a.clientY-this.heldPointer.clientY;b*b+c*c>this.WIGGLE_THRESHOLD&&this.cancel()}},fireHold:function(a,b){var d={bubbles:!0,cancelable:!0,pointerType:this.heldPointer.pointerType,pointerId:this.heldPointer.pointerId,x:this.heldPointer.clientX,y:this.heldPointer.clientY,_source:"hold"};b&&(d.holdTime=b);var e=c.makeGestureEvent(a,d);this.target.dispatchEvent(e)}};b.registerGesture("hold",d)}(window.PolymerGestures),function(a){var b=a.dispatcher,c=a.eventFactory,d=new a.PointerMap,e={events:["down","up"],exposes:["tap"],down:function(a){a.isPrimary&&!a.tapPrevented&&d.set(a.pointerId,{target:a.target,buttons:a.buttons,x:a.clientX,y:a.clientY})},shouldTap:function(a,b){return"mouse"===a.pointerType?1===b.buttons:!a.tapPrevented},up:function(b){var e=d.get(b.pointerId);if(e&&this.shouldTap(b,e)){var f=a.targetFinding.LCA(e.target,b.relatedTarget);if(f){var g=c.makeGestureEvent("tap",{bubbles:!0,cancelable:!0,x:b.clientX,y:b.clientY,detail:b.detail,pointerType:b.pointerType,pointerId:b.pointerId,altKey:b.altKey,ctrlKey:b.ctrlKey,metaKey:b.metaKey,shiftKey:b.shiftKey,_source:"tap"});f.dispatchEvent(g)}}d.delete(b.pointerId)}};c.preventTap=function(a){return function(){a.tapPrevented=!0,d.delete(a.pointerId)}},b.registerGesture("tap",e)}(window.PolymerGestures),function(a){"use strict";function b(a,b){if(!a)throw new Error("ASSERT: "+b)}function c(a){return a>=48&&57>=a}function d(a){return 32===a||9===a||11===a||12===a||160===a||a>=5760&&"\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\ufeff".indexOf(String.fromCharCode(a))>0}function e(a){return 10===a||13===a||8232===a||8233===a}function f(a){return 36===a||95===a||a>=65&&90>=a||a>=97&&122>=a}function g(a){return 36===a||95===a||a>=65&&90>=a||a>=97&&122>=a||a>=48&&57>=a}function h(a){return"this"===a}function i(){for(;Y>X&&d(W.charCodeAt(X));)++X}function j(){var a,b;for(a=X++;Y>X&&(b=W.charCodeAt(X),g(b));)++X;return W.slice(a,X)}function k(){var a,b,c;return a=X,b=j(),c=1===b.length?S.Identifier:h(b)?S.Keyword:"null"===b?S.NullLiteral:"true"===b||"false"===b?S.BooleanLiteral:S.Identifier,{type:c,value:b,range:[a,X]}}function l(){var a,b,c=X,d=W.charCodeAt(X),e=W[X];switch(d){case 46:case 40:case 41:case 59:case 44:case 123:case 125:case 91:case 93:case 58:case 63:return++X,{type:S.Punctuator,value:String.fromCharCode(d),range:[c,X]};default:if(a=W.charCodeAt(X+1),61===a)switch(d){case 37:case 38:case 42:case 43:case 45:case 47:case 60:case 62:case 124:return X+=2,{type:S.Punctuator,value:String.fromCharCode(d)+String.fromCharCode(a),range:[c,X]};case 33:case 61:return X+=2,61===W.charCodeAt(X)&&++X,{type:S.Punctuator,value:W.slice(c,X),range:[c,X]}}}return b=W[X+1],e===b&&"&|".indexOf(e)>=0?(X+=2,{type:S.Punctuator,value:e+b,range:[c,X]}):"<>=!+-*%&|^/".indexOf(e)>=0?(++X,{type:S.Punctuator,value:e,range:[c,X]}):void s({},V.UnexpectedToken,"ILLEGAL")}function m(){var a,d,e;if(e=W[X],b(c(e.charCodeAt(0))||"."===e,"Numeric literal must start with a decimal digit or a decimal point"),d=X,a="","."!==e){for(a=W[X++],e=W[X],"0"===a&&e&&c(e.charCodeAt(0))&&s({},V.UnexpectedToken,"ILLEGAL");c(W.charCodeAt(X));)a+=W[X++];e=W[X]}if("."===e){for(a+=W[X++];c(W.charCodeAt(X));)a+=W[X++];e=W[X]}if("e"===e||"E"===e)if(a+=W[X++],e=W[X],("+"===e||"-"===e)&&(a+=W[X++]),c(W.charCodeAt(X)))for(;c(W.charCodeAt(X));)a+=W[X++];else s({},V.UnexpectedToken,"ILLEGAL");return f(W.charCodeAt(X))&&s({},V.UnexpectedToken,"ILLEGAL"),{type:S.NumericLiteral,value:parseFloat(a),range:[d,X]}}function n(){var a,c,d,f="",g=!1;for(a=W[X],b("'"===a||'"'===a,"String literal must starts with a quote"),c=X,++X;Y>X;){if(d=W[X++],d===a){a="";break}if("\\"===d)if(d=W[X++],d&&e(d.charCodeAt(0)))"\r"===d&&"\n"===W[X]&&++X;else switch(d){case"n":f+="\n";break;case"r":f+="\r";break;case"t":f+="	";break;case"b":f+="\b";break;case"f":f+="\f";break;case"v":f+="";break;default:f+=d}else{if(e(d.charCodeAt(0)))break;f+=d}}return""!==a&&s({},V.UnexpectedToken,"ILLEGAL"),{type:S.StringLiteral,value:f,octal:g,range:[c,X]}}function o(a){return a.type===S.Identifier||a.type===S.Keyword||a.type===S.BooleanLiteral||a.type===S.NullLiteral}function p(){var a;return i(),X>=Y?{type:S.EOF,range:[X,X]}:(a=W.charCodeAt(X),40===a||41===a||58===a?l():39===a||34===a?n():f(a)?k():46===a?c(W.charCodeAt(X+1))?m():l():c(a)?m():l())}function q(){var a;return a=$,X=a.range[1],$=p(),X=a.range[1],a}function r(){var a;a=X,$=p(),X=a}function s(a,c){var d,e=Array.prototype.slice.call(arguments,2),f=c.replace(/%(\d)/g,function(a,c){return b(c<e.length,"Message reference must be in range"),e[c]});throw d=new Error(f),d.index=X,d.description=f,d}function t(a){s(a,V.UnexpectedToken,a.value)}function u(a){var b=q();(b.type!==S.Punctuator||b.value!==a)&&t(b)}function v(a){return $.type===S.Punctuator&&$.value===a}function w(a){return $.type===S.Keyword&&$.value===a}function x(){var a=[];for(u("[");!v("]");)v(",")?(q(),a.push(null)):(a.push(bb()),v("]")||u(","));return u("]"),Z.createArrayExpression(a)}function y(){var a;return i(),a=q(),a.type===S.StringLiteral||a.type===S.NumericLiteral?Z.createLiteral(a):Z.createIdentifier(a.value)}function z(){var a,b;return a=$,i(),(a.type===S.EOF||a.type===S.Punctuator)&&t(a),b=y(),u(":"),Z.createProperty("init",b,bb())}function A(){var a=[];for(u("{");!v("}");)a.push(z()),v("}")||u(",");return u("}"),Z.createObjectExpression(a)}function B(){var a;return u("("),a=bb(),u(")"),a}function C(){var a,b,c;return v("(")?B():(a=$.type,a===S.Identifier?c=Z.createIdentifier(q().value):a===S.StringLiteral||a===S.NumericLiteral?c=Z.createLiteral(q()):a===S.Keyword?w("this")&&(q(),c=Z.createThisExpression()):a===S.BooleanLiteral?(b=q(),b.value="true"===b.value,c=Z.createLiteral(b)):a===S.NullLiteral?(b=q(),b.value=null,c=Z.createLiteral(b)):v("[")?c=x():v("{")&&(c=A()),c?c:void t(q()))}function D(){var a=[];if(u("("),!v(")"))for(;Y>X&&(a.push(bb()),!v(")"));)u(",");return u(")"),a}function E(){var a;return a=q(),o(a)||t(a),Z.createIdentifier(a.value)}function F(){return u("."),E()}function G(){var a;return u("["),a=bb(),u("]"),a}function H(){var a,b,c;for(a=C();;)if(v("["))c=G(),a=Z.createMemberExpression("[",a,c);else if(v("."))c=F(),a=Z.createMemberExpression(".",a,c);else{if(!v("("))break;b=D(),a=Z.createCallExpression(a,b)}return a}function I(){var a,b;return $.type!==S.Punctuator&&$.type!==S.Keyword?b=ab():v("+")||v("-")||v("!")?(a=q(),b=I(),b=Z.createUnaryExpression(a.value,b)):w("delete")||w("void")||w("typeof")?s({},V.UnexpectedToken):b=ab(),b}function J(a){var b=0;if(a.type!==S.Punctuator&&a.type!==S.Keyword)return 0;switch(a.value){case"||":b=1;break;case"&&":b=2;break;case"==":case"!=":case"===":case"!==":b=6;break;case"<":case">":case"<=":case">=":case"instanceof":b=7;break;case"in":b=7;break;case"+":case"-":b=9;break;case"*":case"/":case"%":b=11}return b}function K(){var a,b,c,d,e,f,g,h;if(g=I(),b=$,c=J(b),0===c)return g;for(b.prec=c,q(),e=I(),d=[g,b,e];(c=J($))>0;){for(;d.length>2&&c<=d[d.length-2].prec;)e=d.pop(),f=d.pop().value,g=d.pop(),a=Z.createBinaryExpression(f,g,e),d.push(a);b=q(),b.prec=c,d.push(b),a=I(),d.push(a)}for(h=d.length-1,a=d[h];h>1;)a=Z.createBinaryExpression(d[h-1].value,d[h-2],a),h-=2;return a}function L(){var a,b,c;return a=K(),v("?")&&(q(),b=L(),u(":"),c=L(),a=Z.createConditionalExpression(a,b,c)),a}function M(){var a,b;return a=q(),a.type!==S.Identifier&&t(a),b=v("(")?D():[],Z.createFilter(a.value,b)}function N(){for(;v("|");)q(),M()}function O(){i(),r();var a=bb();a&&(","===$.value||"in"==$.value&&a.type===U.Identifier?Q(a):(N(),"as"===$.value?P(a):Z.createTopLevel(a))),$.type!==S.EOF&&t($)}function P(a){q();var b=q().value;Z.createAsExpression(a,b)}function Q(a){var b;","===$.value&&(q(),$.type!==S.Identifier&&t($),b=q().value),q();var c=bb();N(),Z.createInExpression(a.name,b,c)}function R(a,b){return Z=b,W=a,X=0,Y=W.length,$=null,_={labelSet:{}},O()}var S,T,U,V,W,X,Y,Z,$,_;S={BooleanLiteral:1,EOF:2,Identifier:3,Keyword:4,NullLiteral:5,NumericLiteral:6,Punctuator:7,StringLiteral:8},T={},T[S.BooleanLiteral]="Boolean",T[S.EOF]="<end>",T[S.Identifier]="Identifier",T[S.Keyword]="Keyword",T[S.NullLiteral]="Null",T[S.NumericLiteral]="Numeric",T[S.Punctuator]="Punctuator",T[S.StringLiteral]="String",U={ArrayExpression:"ArrayExpression",BinaryExpression:"BinaryExpression",CallExpression:"CallExpression",ConditionalExpression:"ConditionalExpression",EmptyStatement:"EmptyStatement",ExpressionStatement:"ExpressionStatement",Identifier:"Identifier",Literal:"Literal",LabeledStatement:"LabeledStatement",LogicalExpression:"LogicalExpression",MemberExpression:"MemberExpression",ObjectExpression:"ObjectExpression",Program:"Program",Property:"Property",ThisExpression:"ThisExpression",UnaryExpression:"UnaryExpression"},V={UnexpectedToken:"Unexpected token %0",UnknownLabel:"Undefined label '%0'",Redeclaration:"%0 '%1' has already been declared"};var ab=H,bb=L;a.esprima={parse:R}}(this),function(a){"use strict";function b(a,b,d,e){var f;try{if(f=c(a),f.scopeIdent&&(d.nodeType!==Node.ELEMENT_NODE||"TEMPLATE"!==d.tagName||"bind"!==b&&"repeat"!==b))throw Error("as and in can only be used within <template bind/repeat>")}catch(g){return void console.error("Invalid expression syntax: "+a,g)}return function(a,b,c){var d=f.getBinding(a,e,c);return f.scopeIdent&&d&&(b.polymerExpressionScopeIdent_=f.scopeIdent,f.indexIdent&&(b.polymerExpressionIndexIdent_=f.indexIdent)),d}}function c(a){var b=q[a];if(!b){var c=new j;esprima.parse(a,c),b=new l(c),q[a]=b}return b}function d(a){this.value=a,this.valueFn_=void 0}function e(a){this.name=a,this.path=Path.get(a)}function f(a,b,c){this.computed="["==c,this.dynamicDeps="function"==typeof a||a.dynamicDeps||this.computed&&!(b instanceof d),this.simplePath=!this.dynamicDeps&&(b instanceof e||b instanceof d)&&(a instanceof f||a instanceof e),this.object=this.simplePath?a:i(a),this.property=!this.computed||this.simplePath?b:i(b)}function g(a,b){this.name=a,this.args=[];for(var c=0;c<b.length;c++)this.args[c]=i(b[c])}function h(){throw Error("Not Implemented")}function i(a){return"function"==typeof a?a:a.valueFn()}function j(){this.expression=null,this.filters=[],this.deps={},this.currentPath=void 0,this.scopeIdent=void 0,this.indexIdent=void 0,this.dynamicDeps=!1}function k(a){this.value_=a}function l(a){if(this.scopeIdent=a.scopeIdent,this.indexIdent=a.indexIdent,!a.expression)throw Error("No expression found.");this.expression=a.expression,i(this.expression),this.filters=a.filters,this.dynamicDeps=a.dynamicDeps}function m(a){return String(a).replace(/[A-Z]/g,function(a){return"-"+a.toLowerCase()})}function n(a,b){for(;a[t]&&!Object.prototype.hasOwnProperty.call(a,b);)a=a[t];return a}function o(a){switch(a){case"":return!1;case"false":case"null":case"true":return!0}return isNaN(Number(a))?!1:!0}function p(){}var q=Object.create(null);d.prototype={valueFn:function(){if(!this.valueFn_){var a=this.value;this.valueFn_=function(){return a}}return this.valueFn_}},e.prototype={valueFn:function(){if(!this.valueFn_){var a=(this.name,this.path);this.valueFn_=function(b,c){return c&&c.addPath(b,a),a.getValueFrom(b)}}return this.valueFn_},setValue:function(a,b){return 1==this.path.length,a=n(a,this.path[0]),this.path.setValueFrom(a,b)}},f.prototype={get fullPath(){if(!this.fullPath_){var a=this.object instanceof f?this.object.fullPath.slice():[this.object.name];a.push(this.property instanceof e?this.property.name:this.property.value),this.fullPath_=Path.get(a)}return this.fullPath_},valueFn:function(){if(!this.valueFn_){var a=this.object;if(this.simplePath){var b=this.fullPath;this.valueFn_=function(a,c){return c&&c.addPath(a,b),b.getValueFrom(a)}}else if(this.computed){var c=this.property;this.valueFn_=function(b,d,e){var f=a(b,d,e),g=c(b,d,e);return d&&d.addPath(f,[g]),f?f[g]:void 0}}else{var b=Path.get(this.property.name);this.valueFn_=function(c,d,e){var f=a(c,d,e);return d&&d.addPath(f,b),b.getValueFrom(f)}}}return this.valueFn_},setValue:function(a,b){if(this.simplePath)return this.fullPath.setValueFrom(a,b),b;var c=this.object(a),d=this.property instanceof e?this.property.name:this.property(a);return c[d]=b}},g.prototype={transform:function(a,b,c,d,e){var f=c[this.name],g=a;
if(f)g=void 0;else if(f=g[this.name],!f)return void console.error("Cannot find function or filter: "+this.name);if(d?f=f.toModel:"function"==typeof f.toDOM&&(f=f.toDOM),"function"!=typeof f)return void console.error("Cannot find function or filter: "+this.name);for(var h=e||[],j=0;j<this.args.length;j++)h.push(i(this.args[j])(a,b,c));return f.apply(g,h)}};var r={"+":function(a){return+a},"-":function(a){return-a},"!":function(a){return!a}},s={"+":function(a,b){return a+b},"-":function(a,b){return a-b},"*":function(a,b){return a*b},"/":function(a,b){return a/b},"%":function(a,b){return a%b},"<":function(a,b){return b>a},">":function(a,b){return a>b},"<=":function(a,b){return b>=a},">=":function(a,b){return a>=b},"==":function(a,b){return a==b},"!=":function(a,b){return a!=b},"===":function(a,b){return a===b},"!==":function(a,b){return a!==b},"&&":function(a,b){return a&&b},"||":function(a,b){return a||b}};j.prototype={createUnaryExpression:function(a,b){if(!r[a])throw Error("Disallowed operator: "+a);return b=i(b),function(c,d,e){return r[a](b(c,d,e))}},createBinaryExpression:function(a,b,c){if(!s[a])throw Error("Disallowed operator: "+a);switch(b=i(b),c=i(c),a){case"||":return this.dynamicDeps=!0,function(a,d,e){return b(a,d,e)||c(a,d,e)};case"&&":return this.dynamicDeps=!0,function(a,d,e){return b(a,d,e)&&c(a,d,e)}}return function(d,e,f){return s[a](b(d,e,f),c(d,e,f))}},createConditionalExpression:function(a,b,c){return a=i(a),b=i(b),c=i(c),this.dynamicDeps=!0,function(d,e,f){return a(d,e,f)?b(d,e,f):c(d,e,f)}},createIdentifier:function(a){var b=new e(a);return b.type="Identifier",b},createMemberExpression:function(a,b,c){var d=new f(b,c,a);return d.dynamicDeps&&(this.dynamicDeps=!0),d},createCallExpression:function(a,b){if(!(a instanceof e))throw Error("Only identifier function invocations are allowed");var c=new g(a.name,b);return function(a,b,d){return c.transform(a,b,d,!1)}},createLiteral:function(a){return new d(a.value)},createArrayExpression:function(a){for(var b=0;b<a.length;b++)a[b]=i(a[b]);return function(b,c,d){for(var e=[],f=0;f<a.length;f++)e.push(a[f](b,c,d));return e}},createProperty:function(a,b,c){return{key:b instanceof e?b.name:b.value,value:c}},createObjectExpression:function(a){for(var b=0;b<a.length;b++)a[b].value=i(a[b].value);return function(b,c,d){for(var e={},f=0;f<a.length;f++)e[a[f].key]=a[f].value(b,c,d);return e}},createFilter:function(a,b){this.filters.push(new g(a,b))},createAsExpression:function(a,b){this.expression=a,this.scopeIdent=b},createInExpression:function(a,b,c){this.expression=c,this.scopeIdent=a,this.indexIdent=b},createTopLevel:function(a){this.expression=a},createThisExpression:h},k.prototype={open:function(){return this.value_},discardChanges:function(){return this.value_},deliver:function(){},close:function(){}},l.prototype={getBinding:function(a,b,c){function d(){if(h)return h=!1,g;i.dynamicDeps&&f.startReset();var c=i.getValue(a,i.dynamicDeps?f:void 0,b);return i.dynamicDeps&&f.finishReset(),c}function e(c){return i.setValue(a,c,b),c}if(c)return this.getValue(a,void 0,b);var f=new CompoundObserver,g=this.getValue(a,f,b),h=!0,i=this;return new ObserverTransform(f,d,e,!0)},getValue:function(a,b,c){for(var d=i(this.expression)(a,b,c),e=0;e<this.filters.length;e++)d=this.filters[e].transform(a,b,c,!1,[d]);return d},setValue:function(a,b,c){for(var d=this.filters?this.filters.length:0;d-->0;)b=this.filters[d].transform(a,void 0,c,!0,[b]);return this.expression.setValue?this.expression.setValue(a,b):void 0}};var t="@"+Math.random().toString(36).slice(2);p.prototype={styleObject:function(a){var b=[];for(var c in a)b.push(m(c)+": "+a[c]);return b.join("; ")},tokenList:function(a){var b=[];for(var c in a)a[c]&&b.push(c);return b.join(" ")},prepareInstancePositionChanged:function(a){var b=a.polymerExpressionIndexIdent_;if(b)return function(a,c){a.model[b]=c}},prepareBinding:function(a,c,d){var e=Path.get(a);{if(o(a)||!e.valid)return b(a,c,d,this);if(1==e.length)return function(a,b,c){if(c)return e.getValueFrom(a);var d=n(a,e[0]);return new PathObserver(d,e)}}},prepareInstanceModel:function(a){var b=a.polymerExpressionScopeIdent_;if(b){var c=a.templateInstance?a.templateInstance.model:a.model,d=a.polymerExpressionIndexIdent_;return function(a){return u(c,a,b,d)}}}};var u="__proto__"in{}?function(a,b,c,d){var e={};return e[c]=b,e[d]=void 0,e[t]=a,e.__proto__=a,e}:function(a,b,c,d){var e=Object.create(a);return Object.defineProperty(e,c,{value:b,configurable:!0,writable:!0}),Object.defineProperty(e,d,{value:void 0,configurable:!0,writable:!0}),Object.defineProperty(e,t,{value:a,configurable:!0,writable:!0}),e};a.PolymerExpressions=p,p.getExpression=c}(this),Polymer={version:"0.3.5"},"function"==typeof window.Polymer&&(Polymer={}),function(a){function b(a,b){return a&&b&&Object.getOwnPropertyNames(b).forEach(function(c){var d=Object.getOwnPropertyDescriptor(b,c);d&&(Object.defineProperty(a,c,d),"function"==typeof d.value&&(d.value.nom=c))}),a}a.extend=b}(Polymer),function(a){function b(a,b,d){return a?a.stop():a=new c(this),a.go(b,d),a}var c=function(a){this.context=a,this.boundComplete=this.complete.bind(this)};c.prototype={go:function(a,b){this.callback=a;var c;b?(c=setTimeout(this.boundComplete,b),this.handle=function(){clearTimeout(c)}):(c=requestAnimationFrame(this.boundComplete),this.handle=function(){cancelAnimationFrame(c)})},stop:function(){this.handle&&(this.handle(),this.handle=null)},complete:function(){this.handle&&(this.stop(),this.callback.call(this.context))}},a.job=b}(Polymer),function(){var a={};HTMLElement.register=function(b,c){a[b]=c},HTMLElement.getPrototypeForTag=function(b){var c=b?a[b]:HTMLElement.prototype;return c||Object.getPrototypeOf(document.createElement(b))};var b=Event.prototype.stopPropagation;Event.prototype.stopPropagation=function(){this.cancelBubble=!0,b.apply(this,arguments)}}(Polymer),function(a){function b(a){var e=b.caller,g=e.nom,h=e._super;h||(g||(g=e.nom=c.call(this,e)),g||console.warn("called super() on a method not installed declaratively (has no .nom property)"),h=d(e,g,f(this)));var i=h[g];return i?(i._super||d(i,g,h),i.apply(this,a||[])):void 0}function c(a){for(var b=this.__proto__;b&&b!==HTMLElement.prototype;){for(var c,d=Object.getOwnPropertyNames(b),e=0,f=d.length;f>e&&(c=d[e]);e++){var g=Object.getOwnPropertyDescriptor(b,c);if("function"==typeof g.value&&g.value===a)return c}b=b.__proto__}}function d(a,b,c){var d=e(c,b,a);return d[b]&&(d[b].nom=b),a._super=d}function e(a,b,c){for(;a;){if(a[b]!==c&&a[b])return a;a=f(a)}return Object}function f(a){return a.__proto__}a.super=b}(Polymer),function(a){function b(a){return a}function c(a,b){var c=typeof b;return b instanceof Date&&(c="date"),d[c](a,b)}var d={string:b,undefined:b,date:function(a){return new Date(Date.parse(a)||Date.now())},"boolean":function(a){return""===a?!0:"false"===a?!1:!!a},number:function(a){var b=parseFloat(a);return 0===b&&(b=parseInt(a)),isNaN(b)?a:b},object:function(a,b){if(null===b)return a;try{return JSON.parse(a.replace(/'/g,'"'))}catch(c){return a}},"function":function(a,b){return b}};a.deserializeValue=c}(Polymer),function(a){var b=a.extend,c={};c.declaration={},c.instance={},c.publish=function(a,c){for(var d in a)b(c,a[d])},a.api=c}(Polymer),function(a){var b={async:function(a,b,c){Platform.flush(),b=b&&b.length?b:[b];var d=function(){(this[a]||a).apply(this,b)}.bind(this),e=c?setTimeout(d,c):requestAnimationFrame(d);return c?e:~e},cancelAsync:function(a){0>a?cancelAnimationFrame(~a):clearTimeout(a)},fire:function(a,b,c,d,e){var f=c||this,b=null===b||void 0===b?{}:b,g=new CustomEvent(a,{bubbles:void 0!==d?d:!0,cancelable:void 0!==e?e:!0,detail:b});return f.dispatchEvent(g),g},asyncFire:function(){this.async("fire",arguments)},classFollows:function(a,b,c){b&&b.classList.remove(c),a&&a.classList.add(c)},injectBoundHTML:function(a,b){var c=document.createElement("template");c.innerHTML=a;var d=this.instanceTemplate(c);return b&&(b.textContent="",b.appendChild(d)),d}},c=function(){},d={};b.asyncMethod=b.async,a.api.instance.utils=b,a.nop=c,a.nob=d}(Polymer),function(a){var b=window.logFlags||{},c="on-",d={EVENT_PREFIX:c,addHostListeners:function(){var a=this.eventDelegates;b.events&&Object.keys(a).length>0&&console.log("[%s] addHostListeners:",this.localName,a);for(var c in a){var d=a[c];PolymerGestures.addEventListener(this,c,this.element.getEventHandler(this,this,d))}},dispatchMethod:function(a,c,d){if(a){b.events&&console.group("[%s] dispatch [%s]",a.localName,c);var e="function"==typeof c?c:a[c];e&&e[d?"apply":"call"](a,d),b.events&&console.groupEnd(),Platform.flush()}}};a.api.instance.events=d,a.addEventListener=PolymerGestures.addEventListener,a.removeEventListener=PolymerGestures.removeEventListener}(Polymer),function(a){var b={copyInstanceAttributes:function(){var a=this._instanceAttributes;for(var b in a)this.hasAttribute(b)||this.setAttribute(b,a[b])},takeAttributes:function(){if(this._publishLC)for(var a,b=0,c=this.attributes,d=c.length;(a=c[b])&&d>b;b++)this.attributeToProperty(a.name,a.value)},attributeToProperty:function(b,c){var b=this.propertyForAttribute(b);if(b){if(c&&c.search(a.bindPattern)>=0)return;var d=this[b],c=this.deserializeValue(c,d);c!==d&&(this[b]=c)}},propertyForAttribute:function(a){var b=this._publishLC&&this._publishLC[a];return b},deserializeValue:function(b,c){return a.deserializeValue(b,c)},serializeValue:function(a,b){return"boolean"===b?a?"":void 0:"object"!==b&&"function"!==b&&void 0!==a?a:void 0},reflectPropertyToAttribute:function(a){var b=typeof this[a],c=this.serializeValue(this[a],b);void 0!==c?this.setAttribute(a,c):"boolean"===b&&this.removeAttribute(a)}};a.api.instance.attributes=b}(Polymer),function(a){function b(a,b){return a===b?0!==a||1/a===1/b:f(a)&&f(b)?!0:a!==a&&b!==b}function c(a,b){return void 0===b&&null===a?b:null===b||void 0===b?a:b}var d=window.logFlags||{},e={object:void 0,type:"update",name:void 0,oldValue:void 0},f=Number.isNaN||function(a){return"number"==typeof a&&isNaN(a)},g={createPropertyObserver:function(){var a=this._observeNames;if(a&&a.length){var b=this._propertyObserver=new CompoundObserver(!0);this.registerObserver(b);for(var c,d=0,e=a.length;e>d&&(c=a[d]);d++)b.addPath(this,c),this.observeArrayValue(c,this[c],null)}},openPropertyObserver:function(){this._propertyObserver&&this._propertyObserver.open(this.notifyPropertyChanges,this)},notifyPropertyChanges:function(a,b,c){var d,e,f={};for(var g in b)if(d=c[2*g+1],e=this.observe[d]){var h=b[g],i=a[g];this.observeArrayValue(d,i,h),f[e]||(void 0!==h&&null!==h||void 0!==i&&null!==i)&&(f[e]=!0,this.invokeMethod(e,[h,i,arguments]))}},deliverChanges:function(){this._propertyObserver&&this._propertyObserver.deliver()},propertyChanged_:function(a){this.reflect[a]&&this.reflectPropertyToAttribute(a)},observeArrayValue:function(a,b,c){var e=this.observe[a];if(e&&(Array.isArray(c)&&(d.observe&&console.log("[%s] observeArrayValue: unregister observer [%s]",this.localName,a),this.closeNamedObserver(a+"__array")),Array.isArray(b))){d.observe&&console.log("[%s] observeArrayValue: register observer [%s]",this.localName,a,b);var f=new ArrayObserver(b);f.open(function(a,b){this.invokeMethod(e,[b])},this),this.registerNamedObserver(a+"__array",f)}},emitPropertyChangeRecord:function(a,c,d){if(!b(c,d)&&(this.propertyChanged_(a,c,d),Observer.hasObjectObserve)){var f=this.notifier_;f||(f=this.notifier_=Object.getNotifier(this)),e.object=this,e.name=a,e.oldValue=d,f.notify(e)}},bindToAccessor:function(a,c,d){var e=a+"_",f=a+"Observable_";this[f]=c;var g=this[e],h=this,i=c.open(function(b,c){h[e]=b,h.emitPropertyChangeRecord(a,b,c)});if(d&&!b(g,i)){var j=d(g,i);b(i,j)||(i=j,c.setValue&&c.setValue(i))}this[e]=i,this.emitPropertyChangeRecord(a,i,g);var k={close:function(){c.close(),h[f]=void 0}};return this.registerObserver(k),k},createComputedProperties:function(){if(this._computedNames)for(var a=0;a<this._computedNames.length;a++){var b=this._computedNames[a],c=this.computed[b];try{var d=PolymerExpressions.getExpression(c),e=d.getBinding(this,this.element.syntax);this.bindToAccessor(b,e)}catch(f){console.error("Failed to create computed property",f)}}},bindProperty:function(a,b,d){return d?void(this[a]=b):this.bindToAccessor(a,b,c)},invokeMethod:function(a,b){var c=this[a]||a;"function"==typeof c&&c.apply(this,b)},registerObserver:function(a){return this._observers?void this._observers.push(a):void(this._observers=[a])},closeObservers:function(){if(this._observers){for(var a=this._observers,b=0;b<a.length;b++){var c=a[b];c&&"function"==typeof c.close&&c.close()}this._observers=[]}},registerNamedObserver:function(a,b){var c=this._namedObservers||(this._namedObservers={});c[a]=b},closeNamedObserver:function(a){var b=this._namedObservers;return b&&b[a]?(b[a].close(),b[a]=null,!0):void 0},closeNamedObservers:function(){if(this._namedObservers){for(var a in this._namedObservers)this.closeNamedObserver(a);this._namedObservers={}}}};a.api.instance.properties=g}(Polymer),function(a){var b=window.logFlags||0,c={instanceTemplate:function(a){for(var b=this.syntax||!a.bindingDelegate&&this.element.syntax,c=a.createInstance(this,b),d=c.bindings_,e=0;e<d.length;e++)this.registerObserver(d[e]);return c},bind:function(a,b,c){var d=this.propertyForAttribute(a);if(d){var e=this.bindProperty(d,b,c);return Platform.enableBindingsReflection&&e&&(e.path=b.path_,this._recordBinding(d,e)),this.reflect[d]&&this.reflectPropertyToAttribute(d),e}return this.mixinSuper(arguments)},bindFinished:function(){this.makeElementReady()},_recordBinding:function(a,b){this.bindings_=this.bindings_||{},this.bindings_[a]=b},asyncUnbindAll:function(){this._unbound||(b.unbind&&console.log("[%s] asyncUnbindAll",this.localName),this._unbindAllJob=this.job(this._unbindAllJob,this.unbindAll,0))},unbindAll:function(){this._unbound||(this.closeObservers(),this.closeNamedObservers(),this._unbound=!0)},cancelUnbindAll:function(){return this._unbound?void(b.unbind&&console.warn("[%s] already unbound, cannot cancel unbindAll",this.localName)):(b.unbind&&console.log("[%s] cancelUnbindAll",this.localName),void(this._unbindAllJob&&(this._unbindAllJob=this._unbindAllJob.stop())))}},d=/\{\{([^{}]*)}}/;a.bindPattern=d,a.api.instance.mdv=c}(Polymer),function(a){function b(a){return a.hasOwnProperty("PolymerBase")}function c(){}var d={PolymerBase:!0,job:function(a,b,c){if("string"!=typeof a)return Polymer.job.call(this,a,b,c);var d="___"+a;this[d]=Polymer.job.call(this,this[d],b,c)},"super":Polymer.super,created:function(){},ready:function(){},createdCallback:function(){this.templateInstance&&this.templateInstance.model&&console.warn("Attributes on "+this.localName+" were data bound prior to Polymer upgrading the element. This may result in incorrect binding types."),this.created(),this.prepareElement(),this.ownerDocument.isStagingDocument||this.makeElementReady()},prepareElement:function(){return this._elementPrepared?void console.warn("Element already prepared",this.localName):(this._elementPrepared=!0,this.shadowRoots={},this.createPropertyObserver(),this.openPropertyObserver(),this.copyInstanceAttributes(),this.takeAttributes(),void this.addHostListeners())},makeElementReady:function(){this._readied||(this._readied=!0,this.createComputedProperties(),this.parseDeclarations(this.__proto__),this.removeAttribute("unresolved"),this.ready())},attachedCallback:function(){this.cancelUnbindAll(),this.attached&&this.attached(),this.enteredView&&this.enteredView(),this.hasBeenAttached||(this.hasBeenAttached=!0,this.domReady&&this.async("domReady"))},detachedCallback:function(){this.preventDispose||this.asyncUnbindAll(),this.detached&&this.detached(),this.leftView&&this.leftView()},enteredViewCallback:function(){this.attachedCallback()},leftViewCallback:function(){this.detachedCallback()},enteredDocumentCallback:function(){this.attachedCallback()},leftDocumentCallback:function(){this.detachedCallback()},parseDeclarations:function(a){a&&a.element&&(this.parseDeclarations(a.__proto__),a.parseDeclaration.call(this,a.element))},parseDeclaration:function(a){var b=this.fetchTemplate(a);if(b){var c=this.shadowFromTemplate(b);this.shadowRoots[a.name]=c}},fetchTemplate:function(a){return a.querySelector("template")},shadowFromTemplate:function(a){if(a){var b=this.createShadowRoot(),c=this.instanceTemplate(a);return b.appendChild(c),this.shadowRootReady(b,a),b}},lightFromTemplate:function(a,b){if(a){this.eventController=this;var c=this.instanceTemplate(a);return b?this.insertBefore(c,b):this.appendChild(c),this.shadowRootReady(this),c}},shadowRootReady:function(a){this.marshalNodeReferences(a)},marshalNodeReferences:function(a){var b=this.$=this.$||{};if(a)for(var c,d=a.querySelectorAll("[id]"),e=0,f=d.length;f>e&&(c=d[e]);e++)b[c.id]=c},attributeChangedCallback:function(a){"class"!==a&&"style"!==a&&this.attributeToProperty(a,this.getAttribute(a)),this.attributeChanged&&this.attributeChanged.apply(this,arguments)},onMutation:function(a,b){var c=new MutationObserver(function(a){b.call(this,c,a),c.disconnect()}.bind(this));c.observe(a,{childList:!0,subtree:!0})}};c.prototype=d,d.constructor=c,a.Base=c,a.isBase=b,a.api.instance.base=d}(Polymer),function(a){function b(a){return a.__proto__}function c(a,b){var c="",d=!1;b&&(c=b.localName,d=b.hasAttribute("is"));var e=Platform.ShadowCSS.makeScopeSelector(c,d);return Platform.ShadowCSS.shimCssText(a,e)}var d=(window.logFlags||{},window.ShadowDOMPolyfill),e="element",f="controller",g={STYLE_SCOPE_ATTRIBUTE:e,installControllerStyles:function(){var a=this.findStyleScope();if(a&&!this.scopeHasNamedStyle(a,this.localName)){for(var c=b(this),d="";c&&c.element;)d+=c.element.cssTextForScope(f),c=b(c);d&&this.installScopeCssText(d,a)}},installScopeStyle:function(a,b,c){var c=c||this.findStyleScope(),b=b||"";if(c&&!this.scopeHasNamedStyle(c,this.localName+b)){var d="";if(a instanceof Array)for(var e,f=0,g=a.length;g>f&&(e=a[f]);f++)d+=e.textContent+"\n\n";else d=a.textContent;this.installScopeCssText(d,c,b)}},installScopeCssText:function(a,b,e){if(b=b||this.findStyleScope(),e=e||"",b){d&&(a=c(a,b.host));var g=this.element.cssTextToScopeStyle(a,f);Polymer.applyStyleToScope(g,b),this.styleCacheForScope(b)[this.localName+e]=!0}},findStyleScope:function(a){for(var b=a||this;b.parentNode;)b=b.parentNode;return b},scopeHasNamedStyle:function(a,b){var c=this.styleCacheForScope(a);return c[b]},styleCacheForScope:function(a){if(d){var b=a.host?a.host.localName:a.localName;return h[b]||(h[b]={})}return a._scopeStyles=a._scopeStyles||{}}},h={};a.api.instance.styles=g}(Polymer),function(a){function b(a,b){if(1===arguments.length&&"string"!=typeof arguments[0]){b=a;var c=document._currentScript;if(a=c&&c.parentNode&&c.parentNode.getAttribute?c.parentNode.getAttribute("name"):"",!a)throw"Element name could not be inferred."}if(f[a])throw"Already registered (Polymer) prototype for element "+a;e(a,b),d(a)}function c(a,b){h[a]=b}function d(a){h[a]&&(h[a].registerWhenReady(),delete h[a])}function e(a,b){return i[a]=b||{}}function f(a){return i[a]}var g=a.extend,h=(a.api,{}),i={};a.getRegisteredPrototype=f,a.waitingForPrototype=c,window.Polymer=b,g(Polymer,a);var j=Platform.deliverDeclarations();if(j)for(var k,l=0,m=j.length;m>l&&(k=j[l]);l++)b.apply(null,k)}(Polymer),function(a){var b={resolveElementPaths:function(a){Platform.urlResolver.resolveDom(a)},addResolvePathApi:function(){var a=this.getAttribute("assetpath")||"",b=new URL(a,this.ownerDocument.baseURI);this.prototype.resolvePath=function(a,c){var d=new URL(a,c||b);return d.href}}};a.api.declaration.path=b}(Polymer),function(a){function b(a,b){var c=new URL(a.getAttribute("href"),b).href;return"@import '"+c+"';"}function c(a,b){if(a){b===document&&(b=document.head),i&&(b=document.head);var c=d(a.textContent),e=a.getAttribute(h);e&&c.setAttribute(h,e);var f=b.firstElementChild;if(b===document.head){var g="style["+h+"]",j=document.head.querySelectorAll(g);j.length&&(f=j[j.length-1].nextElementSibling)}b.insertBefore(c,f)}}function d(a,b){b=b||document,b=b.createElement?b:b.ownerDocument;var c=b.createElement("style");return c.textContent=a,c}function e(a){return a&&a.__resource||""}function f(a,b){return q?q.call(a,b):void 0}var g=(window.logFlags||{},a.api.instance.styles),h=g.STYLE_SCOPE_ATTRIBUTE,i=window.ShadowDOMPolyfill,j="style",k="@import",l="link[rel=stylesheet]",m="global",n="polymer-scope",o={loadStyles:function(a){var b=this.fetchTemplate(),c=b&&this.templateContent();if(c){this.convertSheetsToStyles(c);var d=this.findLoadableStyles(c);if(d.length){var e=b.ownerDocument.baseURI;return Platform.styleResolver.loadStyles(d,e,a)}}a&&a()},convertSheetsToStyles:function(a){for(var c,e,f=a.querySelectorAll(l),g=0,h=f.length;h>g&&(c=f[g]);g++)e=d(b(c,this.ownerDocument.baseURI),this.ownerDocument),this.copySheetAttributes(e,c),c.parentNode.replaceChild(e,c)},copySheetAttributes:function(a,b){for(var c,d=0,e=b.attributes,f=e.length;(c=e[d])&&f>d;d++)"rel"!==c.name&&"href"!==c.name&&a.setAttribute(c.name,c.value)},findLoadableStyles:function(a){var b=[];if(a)for(var c,d=a.querySelectorAll(j),e=0,f=d.length;f>e&&(c=d[e]);e++)c.textContent.match(k)&&b.push(c);return b},installSheets:function(){this.cacheSheets(),this.cacheStyles(),this.installLocalSheets(),this.installGlobalStyles()},cacheSheets:function(){this.sheets=this.findNodes(l),this.sheets.forEach(function(a){a.parentNode&&a.parentNode.removeChild(a)})},cacheStyles:function(){this.styles=this.findNodes(j+"["+n+"]"),this.styles.forEach(function(a){a.parentNode&&a.parentNode.removeChild(a)})},installLocalSheets:function(){var a=this.sheets.filter(function(a){return!a.hasAttribute(n)}),b=this.templateContent();if(b){var c="";if(a.forEach(function(a){c+=e(a)+"\n"}),c){var f=d(c,this.ownerDocument);b.insertBefore(f,b.firstChild)}}},findNodes:function(a,b){var c=this.querySelectorAll(a).array(),d=this.templateContent();if(d){var e=d.querySelectorAll(a).array();c=c.concat(e)}return b?c.filter(b):c},installGlobalStyles:function(){var a=this.styleForScope(m);c(a,document.head)},cssTextForScope:function(a){var b="",c="["+n+"="+a+"]",d=function(a){return f(a,c)},g=this.sheets.filter(d);g.forEach(function(a){b+=e(a)+"\n\n"});var h=this.styles.filter(d);return h.forEach(function(a){b+=a.textContent+"\n\n"}),b},styleForScope:function(a){var b=this.cssTextForScope(a);return this.cssTextToScopeStyle(b,a)},cssTextToScopeStyle:function(a,b){if(a){var c=d(a);return c.setAttribute(h,this.getAttribute("name")+"-"+b),c}}},p=HTMLElement.prototype,q=p.matches||p.matchesSelector||p.webkitMatchesSelector||p.mozMatchesSelector;a.api.declaration.styles=o,a.applyStyleToScope=c}(Polymer),function(a){var b=(window.logFlags||{},a.api.instance.events),c=b.EVENT_PREFIX,d={};["webkitAnimationStart","webkitAnimationEnd","webkitTransitionEnd","DOMFocusOut","DOMFocusIn","DOMMouseScroll"].forEach(function(a){d[a.toLowerCase()]=a});var e={parseHostEvents:function(){var a=this.prototype.eventDelegates;this.addAttributeDelegates(a)},addAttributeDelegates:function(a){for(var b,c=0;b=this.attributes[c];c++)this.hasEventPrefix(b.name)&&(a[this.removeEventPrefix(b.name)]=b.value.replace("{{","").replace("}}","").trim())},hasEventPrefix:function(a){return a&&"o"===a[0]&&"n"===a[1]&&"-"===a[2]},removeEventPrefix:function(a){return a.slice(f)},findController:function(a){for(;a.parentNode;){if(a.eventController)return a.eventController;a=a.parentNode}return a.host},getEventHandler:function(a,b,c){var d=this;return function(e){a&&a.PolymerBase||(a=d.findController(b));var f=[e,e.detail,e.currentTarget];a.dispatchMethod(a,c,f)}},prepareEventBinding:function(a,b){if(this.hasEventPrefix(b)){var c=this.removeEventPrefix(b);c=d[c]||c;var e=this;return function(b,d,f){function g(){return"{{ "+a+" }}"}var h=e.getEventHandler(void 0,d,a);return PolymerGestures.addEventListener(d,c,h),f?void 0:{open:g,discardChanges:g,close:function(){PolymerGestures.removeEventListener(d,c,h)}}}}}},f=c.length;a.api.declaration.events=e}(Polymer),function(a){var b={inferObservers:function(a){var b,c=a.observe;for(var d in a)"Changed"===d.slice(-7)&&(c||(c=a.observe={}),b=d.slice(0,-7),c[b]=c[b]||d)},explodeObservers:function(a){var b=a.observe;if(b){var c={};for(var d in b)for(var e,f=d.split(" "),g=0;e=f[g];g++)c[e]=b[d];a.observe=c}},optimizePropertyMaps:function(a){if(a.observe){var b=a._observeNames=[];for(var c in a.observe)for(var d,e=c.split(" "),f=0;d=e[f];f++)b.push(d)}if(a.publish){var b=a._publishNames=[];for(var c in a.publish)b.push(c)}if(a.computed){var b=a._computedNames=[];for(var c in a.computed)b.push(c)}},publishProperties:function(a,b){var c=a.publish;c&&(this.requireProperties(c,a,b),a._publishLC=this.lowerCaseMap(c))},requireProperties:function(a,b){b.reflect=b.reflect||{};for(var c in a){var d=a[c];d&&void 0!==d.reflect&&(b.reflect[c]=Boolean(d.reflect),d=d.value),void 0!==d&&(b[c]=d)}},lowerCaseMap:function(a){var b={};for(var c in a)b[c.toLowerCase()]=c;return b},createPropertyAccessor:function(a){var b=this.prototype,c=a+"_",d=a+"Observable_";b[c]=b[a],Object.defineProperty(b,a,{get:function(){var a=this[d];return a&&a.deliver(),this[c]},set:function(b){var e=this[d];if(e)return void e.setValue(b);var f=this[c];return this[c]=b,this.emitPropertyChangeRecord(a,b,f),b},configurable:!0})},createPropertyAccessors:function(a){var b=a._publishNames;if(b&&b.length)for(var c,d=0,e=b.length;e>d&&(c=b[d]);d++)this.createPropertyAccessor(c);var b=a._computedNames;if(b&&b.length)for(var c,d=0,e=b.length;e>d&&(c=b[d]);d++)this.createPropertyAccessor(c)}};a.api.declaration.properties=b}(Polymer),function(a){var b="attributes",c=/\s|,/,d={inheritAttributesObjects:function(a){this.inheritObject(a,"publishLC"),this.inheritObject(a,"_instanceAttributes")},publishAttributes:function(a){var d=this.getAttribute(b);if(d)for(var e,f=a.publish||(a.publish={}),g=d.split(c),h=0,i=g.length;i>h;h++)e=g[h].trim(),e&&void 0===f[e]&&(f[e]=void 0)},accumulateInstanceAttributes:function(){for(var a,b=this.prototype._instanceAttributes,c=this.attributes,d=0,e=c.length;e>d&&(a=c[d]);d++)this.isInstanceAttribute(a.name)&&(b[a.name]=a.value)},isInstanceAttribute:function(a){return!this.blackList[a]&&"on-"!==a.slice(0,3)},blackList:{name:1,"extends":1,constructor:1,noscript:1,assetpath:1,"cache-csstext":1}};d.blackList[b]=1,a.api.declaration.attributes=d}(Polymer),function(a){var b=a.api.declaration.events,c=new PolymerExpressions,d=c.prepareBinding;c.prepareBinding=function(a,e,f){return b.prepareEventBinding(a,e,f)||d.call(c,a,e,f)};var e={syntax:c,fetchTemplate:function(){return this.querySelector("template")},templateContent:function(){var a=this.fetchTemplate();return a&&Platform.templateContent(a)},installBindingDelegate:function(a){a&&(a.bindingDelegate=this.syntax)}};a.api.declaration.mdv=e}(Polymer),function(a){function b(a){if(!Object.__proto__){var b=Object.getPrototypeOf(a);a.__proto__=b,d(b)&&(b.__proto__=Object.getPrototypeOf(b))}}var c=a.api,d=a.isBase,e=a.extend,f=window.ShadowDOMPolyfill,g={register:function(a,b){this.buildPrototype(a,b),this.registerPrototype(a,b),this.publishConstructor()},buildPrototype:function(b,c){var d=a.getRegisteredPrototype(b),e=this.generateBasePrototype(c);this.desugarBeforeChaining(d,e),this.prototype=this.chainPrototypes(d,e),this.desugarAfterChaining(b,c)},desugarBeforeChaining:function(a,b){a.element=this,this.publishAttributes(a,b),this.publishProperties(a,b),this.inferObservers(a),this.explodeObservers(a)},chainPrototypes:function(a,c){this.inheritMetaData(a,c);var d=this.chainObject(a,c);return b(d),d},inheritMetaData:function(a,b){this.inheritObject("observe",a,b),this.inheritObject("publish",a,b),this.inheritObject("reflect",a,b),this.inheritObject("_publishLC",a,b),this.inheritObject("_instanceAttributes",a,b),this.inheritObject("eventDelegates",a,b)},desugarAfterChaining:function(a,b){this.optimizePropertyMaps(this.prototype),this.createPropertyAccessors(this.prototype),this.installBindingDelegate(this.fetchTemplate()),this.installSheets(),this.resolveElementPaths(this),this.accumulateInstanceAttributes(),this.parseHostEvents(),this.addResolvePathApi(),f&&Platform.ShadowCSS.shimStyling(this.templateContent(),a,b),this.prototype.registerCallback&&this.prototype.registerCallback(this)},publishConstructor:function(){var a=this.getAttribute("constructor");a&&(window[a]=this.ctor)},generateBasePrototype:function(a){var b=this.findBasePrototype(a);if(!b){var b=HTMLElement.getPrototypeForTag(a);b=this.ensureBaseApi(b),h[a]=b}return b},findBasePrototype:function(a){return h[a]},ensureBaseApi:function(a){if(a.PolymerBase)return a;var b=Object.create(a);return c.publish(c.instance,b),this.mixinMethod(b,a,c.instance.mdv,"bind"),b},mixinMethod:function(a,b,c,d){var e=function(a){return b[d].apply(this,a)};a[d]=function(){return this.mixinSuper=e,c[d].apply(this,arguments)}},inheritObject:function(a,b,c){var d=b[a]||{};b[a]=this.chainObject(d,c[a])},registerPrototype:function(a,b){var c={prototype:this.prototype},d=this.findTypeExtension(b);d&&(c.extends=d),HTMLElement.register(a,this.prototype),this.ctor=document.registerElement(a,c)},findTypeExtension:function(a){if(a&&a.indexOf("-")<0)return a;var b=this.findBasePrototype(a);return b.element?this.findTypeExtension(b.element.extends):void 0}},h={};g.chainObject=Object.__proto__?function(a,b){return a&&b&&a!==b&&(a.__proto__=b),a}:function(a,b){if(a&&b&&a!==b){var c=Object.create(b);a=e(c,a)}return a},c.declaration.prototype=g}(Polymer),function(a){function b(a){return document.contains(a)?i:h}function c(){return h.length?h[0]:i[0]}function d(a){e.waitToReady=!0,CustomElements.ready=!1,HTMLImports.whenImportsReady(function(){e.addReadyCallback(a),e.waitToReady=!1,e.check()})}var e={wait:function(a){a.__queue||(a.__queue={},f.push(a))},enqueue:function(a,c,d){var e=a.__queue&&!a.__queue.check;return e&&(b(a).push(a),a.__queue.check=c,a.__queue.go=d),0!==this.indexOf(a)},indexOf:function(a){var c=b(a).indexOf(a);return c>=0&&document.contains(a)&&(c+=HTMLImports.useNative||HTMLImports.ready?h.length:1e9),c},go:function(a){var b=this.remove(a);b&&(a.__queue.flushable=!0,this.addToFlushQueue(b),this.check())},remove:function(a){var c=this.indexOf(a);if(0===c)return b(a).shift()},check:function(){var a=this.nextElement();return a&&a.__queue.check.call(a),this.canReady()?(this.ready(),!0):void 0},nextElement:function(){return c()},canReady:function(){return!this.waitToReady&&this.isEmpty()},isEmpty:function(){for(var a,b=0,c=f.length;c>b&&(a=f[b]);b++)if(a.__queue&&!a.__queue.flushable)return;return!0},addToFlushQueue:function(a){g.push(a)},flush:function(){if(!this.flushing){this.flushing=!0;for(var a;g.length;)a=g.shift(),a.__queue.go.call(a),a.__queue=null;this.flushing=!1}},ready:function(){this.flush(),CustomElements.ready===!1&&(CustomElements.upgradeDocumentTree(document),CustomElements.ready=!0),Platform.flush(),requestAnimationFrame(this.flushReadyCallbacks)},addReadyCallback:function(a){a&&j.push(a)},flushReadyCallbacks:function(){if(j)for(var a;j.length;)(a=j.shift())()},waitToReady:!0},f=[],g=[],h=[],i=[],j=[];document.addEventListener("WebComponentsReady",function(){CustomElements.ready=!1}),a.elements=f,a.queue=e,a.whenReady=a.whenPolymerReady=d}(Polymer),function(a){function b(a,b){a?(document.head.appendChild(a),d(b)):b&&b()}function c(a,c){if(a&&a.length){for(var d,e,f=document.createDocumentFragment(),g=0,h=a.length;h>g&&(d=a[g]);g++)e=document.createElement("link"),e.rel="import",e.href=d,f.appendChild(e);b(f,c)}else c&&c()}var d=a.whenPolymerReady;a.import=c,a.importElements=b}(Polymer),function(a){function b(a){return Boolean(HTMLElement.getPrototypeForTag(a))}function c(a){return a&&a.indexOf("-")>=0}var d=a.extend,e=a.api,f=a.queue,g=a.whenPolymerReady,h=a.getRegisteredPrototype,i=a.waitingForPrototype,j=d(Object.create(HTMLElement.prototype),{createdCallback:function(){this.getAttribute("name")&&this.init()},init:function(){this.name=this.getAttribute("name"),this.extends=this.getAttribute("extends"),f.wait(this),this.loadResources(),this.registerWhenReady()
},registerWhenReady:function(){this.registered||this.waitingForPrototype(this.name)||this.waitingForQueue()||this.waitingForResources()||f.go(this)},_register:function(){c(this.extends)&&!b(this.extends)&&console.warn("%s is attempting to extend %s, an unregistered element or one that was not registered with Polymer.",this.name,this.extends),this.register(this.name,this.extends),this.registered=!0},waitingForPrototype:function(a){return h(a)?void 0:(i(a,this),this.handleNoScript(a),!0)},handleNoScript:function(a){this.hasAttribute("noscript")&&!this.noscript&&(this.noscript=!0,Polymer(a))},waitingForResources:function(){return this._needsResources},waitingForQueue:function(){return f.enqueue(this,this.registerWhenReady,this._register)},loadResources:function(){this._needsResources=!0,this.loadStyles(function(){this._needsResources=!1,this.registerWhenReady()}.bind(this))}});e.publish(e.declaration,j),g(function(){document.body.removeAttribute("unresolved"),document.dispatchEvent(new CustomEvent("polymer-ready",{bubbles:!0}))}),document.registerElement("polymer-element",{prototype:j})}(Polymer),function(){var a=document.createElement("polymer-element");a.setAttribute("name","auto-binding"),a.setAttribute("extends","template"),a.init(),Polymer("auto-binding",{createdCallback:function(){this.syntax=this.bindingDelegate=this.makeSyntax(),Polymer.whenPolymerReady(function(){this.model=this,this.setAttribute("bind",""),this.async(function(){this.marshalNodeReferences(this.parentNode),this.fire("template-bound")})}.bind(this))},makeSyntax:function(){var a=Object.create(Polymer.api.declaration.events),b=this;a.findController=function(){return b.model};var c=new PolymerExpressions,d=c.prepareBinding;return c.prepareBinding=function(b,e,f){return a.prepareEventBinding(b,e,f)||d.call(c,b,e,f)},c}})}();
//# sourceMappingURL=polymer.js.map;


    Polymer('core-xhr', {

      /**
       * Sends a HTTP request to the server and returns the XHR object.
       *
       * @method request
       * @param {Object} inOptions
       *    @param {String} inOptions.url The url to which the request is sent.
       *    @param {String} inOptions.method The HTTP method to use, default is GET.
       *    @param {boolean} inOptions.sync By default, all requests are sent asynchronously. To send synchronous requests, set to true.
       *    @param {Object} inOptions.params Data to be sent to the server.
       *    @param {Object} inOptions.body The content for the request body for POST method.
       *    @param {Object} inOptions.headers HTTP request headers.
       *    @param {String} inOptions.responseType The response type. Default is 'text'.
       *    @param {boolean} inOptions.withCredentials Whether or not to send credentials on the request. Default is false.
       *    @param {Object} inOptions.callback Called when request is completed.
       * @returns {Object} XHR object.
       */
      request: function(options) {
        var xhr = new XMLHttpRequest();
        var url = options.url;
        var method = options.method || 'GET';
        var async = !options.sync;
        //
        var params = this.toQueryString(options.params);
        if (params && method == 'GET') {
          url += (url.indexOf('?') > 0 ? '&' : '?') + params;
        }
        var xhrParams = this.isBodyMethod(method) ? (options.body || params) : null;
        //
        xhr.open(method, url, async);
        if (options.responseType) {
          xhr.responseType = options.responseType;
        }
        if (options.withCredentials) {
          xhr.withCredentials = true;
        }
        this.makeReadyStateHandler(xhr, options.callback);
        this.setRequestHeaders(xhr, options.headers);
        xhr.send(xhrParams);
        if (!async) {
          xhr.onreadystatechange(xhr);
        }
        return xhr;
      },
    
      toQueryString: function(params) {
        var r = [];
        for (var n in params) {
          var v = params[n];
          n = encodeURIComponent(n);
          r.push(v == null ? n : (n + '=' + encodeURIComponent(v)));
        }
        return r.join('&');
      },

      isBodyMethod: function(method) {
        return this.bodyMethods[(method || '').toUpperCase()];
      },
      
      bodyMethods: {
        POST: 1,
        PUT: 1,
        DELETE: 1
      },

      makeReadyStateHandler: function(xhr, callback) {
        xhr.onreadystatechange = function() {
          if (xhr.readyState == 4) {
            callback && callback.call(null, xhr.response, xhr);
          }
        };
      },

      setRequestHeaders: function(xhr, headers) {
        if (headers) {
          for (var name in headers) {
            xhr.setRequestHeader(name, headers[name]);
          }
        }
      }

    });

  ;


  Polymer('core-ajax', {
    /**
     * Fired when a response is received.
     * 
     * @event core-response
     */

    /**
     * Fired when an error is received.
     * 
     * @event core-error
     */

    /**
     * Fired whenever a response or an error is received.
     *
     * @event core-complete
     */

    /**
     * The URL target of the request.
     * 
     * @attribute url
     * @type string
     * @default ''
     */
    url: '',

    /**
     * Specifies what data to store in the `response` property, and
     * to deliver as `event.response` in `response` events.
     * 
     * One of:
     * 
     *    `text`: uses `XHR.responseText`.
     *    
     *    `xml`: uses `XHR.responseXML`.
     *    
     *    `json`: uses `XHR.responseText` parsed as JSON.
     *
     *    `arraybuffer`: uses `XHR.response`.
     *
     *    `blob`: uses `XHR.response`.
     *
     *    `document`: uses `XHR.response`.
     *  
     * @attribute handleAs
     * @type string
     * @default 'text'
     */
    handleAs: '',

    /**
     * If true, automatically performs an Ajax request when either `url` or `params` changes.
     *
     * @attribute auto
     * @type boolean
     * @default false
     */
    auto: false,

    /**
     * Parameters to send to the specified URL, as JSON.
     *  
     * @attribute params
     * @type string (JSON)
     * @default ''
     */
    params: '',

    /**
     * Returns the response object.
     *
     * @attribute response
     * @type Object
     * @default null
     */
    response: null,

    /**
     * The HTTP method to use such as 'GET', 'POST', 'PUT', or 'DELETE'.
     * Default is 'GET'.
     *
     * @attribute method
     * @type string
     * @default ''
     */
    method: '',

    /**
     * HTTP request headers to send.
     *
     * Example:
     *
     *     <core-ajax 
     *         auto
     *         url="http://somesite.com"
     *         headers='{"X-Requested-With": "XMLHttpRequest"}'
     *         handleAs="json"
     *         on-core-response="{{handleResponse}}"></core-ajax>
     *  
     * @attribute headers
     * @type Object
     * @default null
     */
    headers: null,

    /**
     * Optional raw body content to send when method === "POST".
     *
     * Example:
     *
     *     <core-ajax method="POST" auto url="http://somesite.com"
     *         body='{"foo":1, "bar":2}'>
     *     </core-ajax>
     *  
     * @attribute body
     * @type Object
     * @default null
     */
    body: null,

    /**
     * Content type to use when sending data.
     *
     * @attribute contentType
     * @type string
     * @default 'application/x-www-form-urlencoded'
     */
    contentType: 'application/x-www-form-urlencoded',

    /**
     * Set the withCredentials flag on the request.
     * 
     * @attribute withCredentials
     * @type boolean
     * @default false
     */
    withCredentials: false,
    
    /**
     * Additional properties to send to core-xhr.
     *
     * Can be set to an object containing default properties
     * to send as arguments to the `core-xhr.request()` method
     * which implements the low-level communication.
     * 
     * @property xhrArgs
     * @type Object
     * @default null
     */
    xhrArgs: null,
     
    ready: function() {
      this.xhr = document.createElement('core-xhr');
    },

    receive: function(response, xhr) {
      if (this.isSuccess(xhr)) {
        this.processResponse(xhr);
      } else {
        this.error(xhr);
      }
      this.complete(xhr);
    },

    isSuccess: function(xhr) {
      var status = xhr.status || 0;
      return !status || (status >= 200 && status < 300);
    },

    processResponse: function(xhr) {
      var response = this.evalResponse(xhr);
      this.response = response;
      this.fire('core-response', {response: response, xhr: xhr});
    },

    error: function(xhr) {
      var response = xhr.status + ': ' + xhr.responseText;
      this.fire('core-error', {response: response, xhr: xhr});
    },

    complete: function(xhr) {
      this.fire('core-complete', {response: xhr.status, xhr: xhr});
    },

    evalResponse: function(xhr) {
      return this[(this.handleAs || 'text') + 'Handler'](xhr);
    },

    xmlHandler: function(xhr) {
      return xhr.responseXML;
    },

    textHandler: function(xhr) {
      return xhr.responseText;
    },

    jsonHandler: function(xhr) {
      var r = xhr.responseText;
      try {
        return JSON.parse(r);
      } catch (x) {
        console.warn('core-ajax caught an exception trying to parse reponse as JSON:');
        console.warn('url:', this.url);
        console.warn(x);
        return r;
      }
    },

    documentHandler: function(xhr) {
      return xhr.response;
    },

    blobHandler: function(xhr) {
      return xhr.response;
    },

    arraybufferHandler: function(xhr) {
      return xhr.response;
    },

    urlChanged: function() {
      if (!this.handleAs) {
        var ext = String(this.url).split('.').pop();
        switch (ext) {
          case 'json':
            this.handleAs = 'json';
            break;
        }
      }
      this.autoGo();
    },

    paramsChanged: function() {
      this.autoGo();
    },

    autoChanged: function() {
      this.autoGo();
    },

    // TODO(sorvell): multiple side-effects could call autoGo 
    // during one micro-task, use a job to have only one action 
    // occur
    autoGo: function() {
      if (this.auto) {
        this.goJob = this.job(this.goJob, this.go, 0);
      }
    },

    /**
     * Performs an Ajax request to the specified URL.
     *
     * @method go
     */
    go: function() {
      var args = this.xhrArgs || {};
      // TODO(sjmiles): we may want XHR to default to POST if body is set
      args.body = this.body || args.body;
      args.params = this.params || args.params;
      if (args.params && typeof(args.params) == 'string') {
        args.params = JSON.parse(args.params);
      }
      args.headers = this.headers || args.headers || {};
      if (args.headers && typeof(args.headers) == 'string') {
        args.headers = JSON.parse(args.headers);
      }
      if (this.contentType) {
        args.headers['content-type'] = this.contentType;
      }
      if (this.handleAs === 'arraybuffer' || this.handleAs === 'blob' ||
          this.handleAs === 'document') {
        args.responseType = this.handleAs;
      }
      args.withCredentials = this.withCredentials;
      args.callback = this.receive.bind(this);
      args.url = this.url;
      args.method = this.method;
      return args.url && this.xhr.request(args);
    }

  });

;

    Polymer('core-selection', {
      /**
       * If true, multiple selections are allowed.
       *
       * @attribute multi
       * @type boolean
       * @default false
       */
      multi: false,
      ready: function() {
        this.clear();
      },
      clear: function() {
        this.selection = [];
      },
      /**
       * Retrieves the selected item(s).
       * @method getSelection
       * @returns Returns the selected item(s). If the multi property is true,
       * getSelection will return an array, otherwise it will return 
       * the selected item or undefined if there is no selection.
      */
      getSelection: function() {
        return this.multi ? this.selection : this.selection[0];
      },
      /**
       * Indicates if a given item is selected.
       * @method isSelected
       * @param {any} item The item whose selection state should be checked.
       * @returns Returns true if `item` is selected.
      */
      isSelected: function(item) {
        return this.selection.indexOf(item) >= 0;
      },
      setItemSelected: function(item, isSelected) {
        if (item !== undefined && item !== null) {
          if (isSelected) {
            this.selection.push(item);
          } else {
            var i = this.selection.indexOf(item);
            if (i >= 0) {
              this.selection.splice(i, 1);
            }
          }
          this.fire("core-select", {isSelected: isSelected, item: item});
        }
      },
      /**
       * Set the selection state for a given `item`. If the multi property
       * is true, then the selected state of `item` will be toggled; otherwise
       * the `item` will be selected.
       * @method select
       * @param {any} item: The item to select.
      */
      select: function(item) {
        if (this.multi) {
          this.toggle(item);
        } else if (this.getSelection() !== item) {
          this.setItemSelected(this.getSelection(), false);
          this.setItemSelected(item, true);
        }
      },
      /**
       * Toggles the selection state for `item`.
       * @method toggle
       * @param {any} item: The item to toggle.
      */
      toggle: function(item) {
        this.setItemSelected(item, !this.isSelected(item));
      }
    });
  ;


    Polymer('core-selector', {

      /**
       * Gets or sets the selected element.  Default to use the index
       * of the item element.
       *
       * If you want a specific attribute value of the element to be
       * used instead of index, set "valueattr" to that attribute name.
       *
       * Example:
       *
       *     <core-selector valueattr="label" selected="foo">
       *       <div label="foo"></div>
       *       <div label="bar"></div>
       *       <div label="zot"></div>
       *     </core-selector>
       *
       * In multi-selection this should be an array of values.
       *
       * Example:
       *
       *     <core-selector id="selector" valueattr="label" multi>
       *       <div label="foo"></div>
       *       <div label="bar"></div>
       *       <div label="zot"></div>
       *     </core-selector>
       *
       *     this.$.selector.selected = ['foo', 'zot'];
       *
       * @attribute selected
       * @type Object
       * @default null
       */
      selected: null,

      /**
       * If true, multiple selections are allowed.
       *
       * @attribute multi
       * @type boolean
       * @default false
       */
      multi: false,

      /**
       * Specifies the attribute to be used for "selected" attribute.
       *
       * @attribute valueattr
       * @type string
       * @default 'name'
       */
      valueattr: 'name',

      /**
       * Specifies the CSS class to be used to add to the selected element.
       * 
       * @attribute selectedClass
       * @type string
       * @default 'core-selected'
       */
      selectedClass: 'core-selected',

      /**
       * Specifies the property to be used to set on the selected element
       * to indicate its active state.
       *
       * @attribute selectedProperty
       * @type string
       * @default ''
       */
      selectedProperty: '',

      /**
       * Specifies the attribute to set on the selected element to indicate
       * its active state.
       *
       * @attribute selectedAttribute
       * @type string
       * @default 'active'
       */
      selectedAttribute: 'active',

      /**
       * Returns the currently selected element. In multi-selection this returns
       * an array of selected elements.
       * 
       * @attribute selectedItem
       * @type Object
       * @default null
       */
      selectedItem: null,

      /**
       * In single selection, this returns the model associated with the
       * selected element.
       * 
       * @attribute selectedModel
       * @type Object
       * @default null
       */
      selectedModel: null,

      /**
       * In single selection, this returns the selected index.
       *
       * @attribute selectedIndex
       * @type number
       * @default -1
       */
      selectedIndex: -1,

      /**
       * The target element that contains items.  If this is not set 
       * core-selector is the container.
       * 
       * @attribute target
       * @type Object
       * @default null
       */
      target: null,

      /**
       * This can be used to query nodes from the target node to be used for 
       * selection items.  Note this only works if the 'target' property is set.
       *
       * Example:
       *
       *     <core-selector target="{{$.myForm}}" itemsSelector="input[type=radio]"></core-selector>
       *     <form id="myForm">
       *       <label><input type="radio" name="color" value="red"> Red</label> <br>
       *       <label><input type="radio" name="color" value="green"> Green</label> <br>
       *       <label><input type="radio" name="color" value="blue"> Blue</label> <br>
       *       <p>color = {{color}}</p>
       *     </form>
       * 
       * @attribute itemsSelector
       * @type string
       * @default ''
       */
      itemsSelector: '',

      /**
       * The event that would be fired from the item element to indicate
       * it is being selected.
       *
       * @attribute activateEvent
       * @type string
       * @default 'tap'
       */
      activateEvent: 'tap',

      /**
       * Set this to true to disallow changing the selection via the
       * `activateEvent`.
       *
       * @attribute notap
       * @type boolean
       * @default false
       */
      notap: false,

      ready: function() {
        this.activateListener = this.activateHandler.bind(this);
        this.observer = new MutationObserver(this.updateSelected.bind(this));
        if (!this.target) {
          this.target = this;
        }
      },

      get items() {
        if (!this.target) {
          return [];
        }
        var nodes = this.target !== this ? (this.itemsSelector ? 
            this.target.querySelectorAll(this.itemsSelector) : 
                this.target.children) : this.$.items.getDistributedNodes();
        return Array.prototype.filter.call(nodes || [], function(n) {
          return n && n.localName !== 'template';
        });
      },

      targetChanged: function(old) {
        if (old) {
          this.removeListener(old);
          this.observer.disconnect();
          this.clearSelection();
        }
        if (this.target) {
          this.addListener(this.target);
          this.observer.observe(this.target, {childList: true});
          this.updateSelected();
        }
      },

      addListener: function(node) {
        Polymer.addEventListener(node, this.activateEvent, this.activateListener);
      },

      removeListener: function(node) {
        Polymer.removeEventListener(node, this.activateEvent, this.activateListener);
      },

      get selection() {
        return this.$.selection.getSelection();
      },

      selectedChanged: function() {
        this.updateSelected();
      },

      updateSelected: function() {
        this.validateSelected();
        if (this.multi) {
          this.clearSelection();
          this.selected && this.selected.forEach(function(s) {
            this.valueToSelection(s);
          }, this);
        } else {
          this.valueToSelection(this.selected);
        }
      },

      validateSelected: function() {
        // convert to an array for multi-selection
        if (this.multi && !Array.isArray(this.selected) && 
            this.selected !== null && this.selected !== undefined) {
          this.selected = [this.selected];
        }
      },

      clearSelection: function() {
        if (this.multi) {
          this.selection.slice().forEach(function(s) {
            this.$.selection.setItemSelected(s, false);
          }, this);
        } else {
          this.$.selection.setItemSelected(this.selection, false);
        }
        this.selectedItem = null;
        this.$.selection.clear();
      },

      valueToSelection: function(value) {
        var item = (value === null || value === undefined) ? 
            null : this.items[this.valueToIndex(value)];
        this.$.selection.select(item);
      },

      updateSelectedItem: function() {
        this.selectedItem = this.selection;
      },

      selectedItemChanged: function() {
        if (this.selectedItem) {
          var t = this.selectedItem.templateInstance;
          this.selectedModel = t ? t.model : undefined;
        } else {
          this.selectedModel = null;
        }
        this.selectedIndex = this.selectedItem ? 
            parseInt(this.valueToIndex(this.selected)) : -1;
      },

      valueToIndex: function(value) {
        // find an item with value == value and return it's index
        for (var i=0, items=this.items, c; (c=items[i]); i++) {
          if (this.valueForNode(c) == value) {
            return i;
          }
        }
        // if no item found, the value itself is probably the index
        return value;
      },

      valueForNode: function(node) {
        return node[this.valueattr] || node.getAttribute(this.valueattr);
      },

      // events fired from <core-selection> object
      selectionSelect: function(e, detail) {
        this.updateSelectedItem();
        if (detail.item) {
          this.applySelection(detail.item, detail.isSelected);
        }
      },

      applySelection: function(item, isSelected) {
        if (this.selectedClass) {
          item.classList.toggle(this.selectedClass, isSelected);
        }
        if (this.selectedProperty) {
          item[this.selectedProperty] = isSelected;
        }
        if (this.selectedAttribute && item.setAttribute) {
          if (isSelected) {
            item.setAttribute(this.selectedAttribute, '');
          } else {
            item.removeAttribute(this.selectedAttribute);
          }
        }
      },

      // event fired from host
      activateHandler: function(e) {
        if (!this.notap) {
          var i = this.findDistributedTarget(e.target, this.items);
          if (i >= 0) {
            var item = this.items[i];
            var s = this.valueForNode(item) || i;
            if (this.multi) {
              if (this.selected) {
                this.addRemoveSelected(s);
              } else {
                this.selected = [s];
              }
            } else {
              this.selected = s;
            }
            this.asyncFire('core-activate', {item: item});
          }
        }
      },

      addRemoveSelected: function(value) {
        var i = this.selected.indexOf(value);
        if (i >= 0) {
          this.selected.splice(i, 1);
        } else {
          this.selected.push(value);
        }
        this.valueToSelection(value);
      },

      findDistributedTarget: function(target, nodes) {
        // find first ancestor of target (including itself) that
        // is in nodes, if any
        while (target && target != this) {
          var i = Array.prototype.indexOf.call(nodes, target);
          if (i >= 0) {
            return i;
          }
          target = target.parentNode;
        }
      }
    });
  ;

(function() {

window.CoreStyle = window.CoreStyle || {
  g: {},
  list: {},
  refMap: {}
};

Polymer('core-style', {
  /**
   * The `id` property should be set if the `core-style` is a producer
   * of styles. In this case, the `core-style` should have text content
   * that is cssText.
   *
   * @attribute id
   * @type string
   * @default ''
   */


  publish: {
    /**
     * The `ref` property should be set if the `core-style` element is a 
     * consumer of styles. Set it to the `id` of the desired `core-style`
     * element.
     *
     * @attribute ref
     * @type string
     * @default ''
     */
    ref: ''
  },

  // static
  g: CoreStyle.g,
  refMap: CoreStyle.refMap,

  /**
   * The `list` is a map of all `core-style` producers stored by `id`. It 
   * should be considered readonly. It's useful for nesting one `core-style`
   * inside another.
   *
   * @attribute list
   * @type object (readonly)
   * @default {map of all `core-style` producers}
   */
  list: CoreStyle.list,

  // if we have an id, we provide style
  // if we have a ref, we consume/require style
  ready: function() {
    if (this.id) {
      this.provide();
    } else {
      this.registerRef(this.ref);
      if (!window.ShadowDOMPolyfill) {
        this.require();
      }  
    }
  },

  // can't shim until attached if using SD polyfill because need to find host
  attached: function() {
    if (!this.id && window.ShadowDOMPolyfill) {
      this.require();
    }
  },

  /****** producer stuff *******/

  provide: function() {
    this.register();
    // we want to do this asap, especially so we can do so before definitions
    // that use this core-style are registered.
    if (this.textContent) {
      this._completeProvide();
    } else {
      this.async(this._completeProvide);
    }
  },

  register: function() {
    var i = this.list[this.id];
    if (i) {
      if (!Array.isArray(i)) {
        this.list[this.id] = [i];
      }
      this.list[this.id].push(this);
    } else {
      this.list[this.id] = this;  
    }
  },

  // stamp into a shadowRoot so we can monitor dom of the bound output
  _completeProvide: function() {
    this.createShadowRoot();
    this.domObserver = new MutationObserver(this.domModified.bind(this))
        .observe(this.shadowRoot, {subtree: true, 
        characterData: true, childList: true});
    this.provideContent();
  },

  provideContent: function() {
    this.ensureTemplate();
    this.shadowRoot.textContent = '';
    this.shadowRoot.appendChild(this.instanceTemplate(this.template));
    this.cssText = this.shadowRoot.textContent;
  },

  ensureTemplate: function() {
    if (!this.template) {
      this.template = this.querySelector('template:not([repeat]):not([bind])');
      // move content into the template
      if (!this.template) {
        this.template = document.createElement('template');
        var n = this.firstChild;
        while (n) {
          this.template.content.appendChild(n.cloneNode(true));
          n = n.nextSibling;
        }
      }
    }
  },

  domModified: function() {
    this.cssText = this.shadowRoot.textContent;
    this.notify();
  },

  // notify instances that reference this element
  notify: function() {
    var s$ = this.refMap[this.id];
    if (s$) {
      for (var i=0, s; (s=s$[i]); i++) {
        s.require();
      }
    }
  },

  /****** consumer stuff *******/

  registerRef: function(ref) {
    //console.log('register', ref);
    this.refMap[this.ref] = this.refMap[this.ref] || [];
    this.refMap[this.ref].push(this);
  },

  applyRef: function(ref) {
    this.ref = ref;
    this.registerRef(this.ref);
    this.require();
  },

  require: function() {
    var cssText = this.cssTextForRef(this.ref);
    //console.log('require', this.ref, cssText);
    if (cssText) {
      this.ensureStyleElement();
      // do nothing if cssText has not changed
      if (this.styleElement._cssText === cssText) {
        return;
      }
      this.styleElement._cssText = cssText;
      if (window.ShadowDOMPolyfill) {
        this.styleElement.textContent = cssText;
        cssText = Platform.ShadowCSS.shimStyle(this.styleElement,
            this.getScopeSelector());
      }
      this.styleElement.textContent = cssText;
    }
  },

  cssTextForRef: function(ref) {
    var s$ = this.byId(ref);
    var cssText = '';
    if (s$) {
      if (Array.isArray(s$)) {
        var p = [];
        for (var i=0, l=s$.length, s; (i<l) && (s=s$[i]); i++) {
          p.push(s.cssText);
        }
        cssText = p.join('\n\n');
      } else {
        cssText = s$.cssText;
      }
    }
    if (s$ && !cssText) {
      console.warn('No styles provided for ref:', ref);
    }
    return cssText;
  },

  byId: function(id) {
    return this.list[id];
  },

  ensureStyleElement: function() {
    if (!this.styleElement) {
      this.styleElement = window.ShadowDOMPolyfill ? 
          this.makeShimStyle() :
          this.makeRootStyle();
    }
    if (!this.styleElement) {
      console.warn(this.localName, 'could not setup style.');
    }
  },

  makeRootStyle: function() {
    var style = document.createElement('style');
    this.appendChild(style);
    return style;
  },

  makeShimStyle: function() {
    var host = this.findHost(this);
    if (host) {
      var name = host.localName;
      var style = document.querySelector('style[' + name + '=' + this.ref +']');
      if (!style) {
        style = document.createElement('style');
        style.setAttribute(name, this.ref);
        document.head.appendChild(style);
      }
      return style;
    }
  },

  getScopeSelector: function() {
    if (!this._scopeSelector) {
      var selector = '', host = this.findHost(this);
      if (host) {
        var typeExtension = host.hasAttribute('is');
        var name = typeExtension ? host.getAttribute('is') : host.localName;
        selector = Platform.ShadowCSS.makeScopeSelector(name, 
            typeExtension);
      }
      this._scopeSelector = selector;
    }
    return this._scopeSelector;
  },

  findHost: function(node) {
    while (node.parentNode) {
      node = node.parentNode;
    }
    return node.host || wrap(document.documentElement);
  },

  /* filters! */
  // TODO(dfreedm): add more filters!

  cycle: function(rgb, amount) {
    if (rgb.match('#')) {
      var o = this.hexToRgb(rgb);
      if (!o) {
        return rgb;
      }
      rgb = 'rgb(' + o.r + ',' + o.b + ',' + o.g + ')';
    }

    function cycleChannel(v) {
      return Math.abs((Number(v) - amount) % 255);
    }

    return rgb.replace(/rgb\(([^,]*),([^,]*),([^,]*)\)/, function(m, a, b, c) {
      return 'rgb(' + cycleChannel(a) + ',' + cycleChannel(b) + ', ' 
          + cycleChannel(c) + ')';
    });
  },

  hexToRgb: function(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
  }

});


})();
;


  (function() {
    
    var SKIP_ID = 'meta';
    var metaData = {}, metaArray = {};

    Polymer('core-meta', {
      
      /**
       * The type of meta-data.  All meta-data with the same type with be
       * stored together.
       * 
       * @attribute type
       * @type string
       * @default 'default'
       */
      type: 'default',
      
      alwaysPrepare: true,
      
      ready: function() {
        this.register(this.id);
      },
      
      get metaArray() {
        var t = this.type;
        if (!metaArray[t]) {
          metaArray[t] = [];
        }
        return metaArray[t];
      },
      
      get metaData() {
        var t = this.type;
        if (!metaData[t]) {
          metaData[t] = {};
        }
        return metaData[t];
      },
      
      register: function(id, old) {
        if (id && id !== SKIP_ID) {
          this.unregister(this, old);
          this.metaData[id] = this;
          this.metaArray.push(this);
        }
      },
      
      unregister: function(meta, id) {
        delete this.metaData[id || meta.id];
        var i = this.metaArray.indexOf(meta);
        if (i >= 0) {
          this.metaArray.splice(i, 1);
        }
      },
      
      /**
       * Returns a list of all meta-data elements with the same type.
       * 
       * @property list
       * @type array
       * @default []
       */
      get list() {
        return this.metaArray;
      },
      
      /**
       * Retrieves meta-data by ID.
       *
       * @method byId
       * @param {String} id The ID of the meta-data to be returned.
       * @returns Returns meta-data.
       */
      byId: function(id) {
        return this.metaData[id];
      }
      
    });
    
  })();
  
;

    Polymer('core-transition', {
      
      type: 'transition',

      /**
       * Run the animation.
       *
       * @method go
       * @param {Node} node The node to apply the animation on
       * @param {Object} state State info
       */
      go: function(node, state) {
        this.complete(node);
      },

      /**
       * Set up the animation. This may include injecting a stylesheet,
       * applying styles, creating a web animations object, etc.. This
       *
       * @method setup
       * @param {Node} node The animated node
       */
      setup: function(node) {
      },

      /**
       * Tear down the animation.
       *
       * @method teardown
       * @param {Node} node The animated node
       */
      teardown: function(node) {
      },

      /**
       * Called when the animation completes. This function also fires the
       * `core-transitionend` event.
       *
       * @method complete
       * @param {Node} node The animated node
       */
      complete: function(node) {
        this.fire('core-transitionend', null, node);
      },

      /**
       * Utility function to listen to an event on a node once.
       *
       * @method listenOnce
       * @param {Node} node The animated node
       * @param {string} event Name of an event
       * @param {Function} fn Event handler
       * @param {Array} args Additional arguments to pass to `fn`
       */
      listenOnce: function(node, event, fn, args) {
        var self = this;
        var listener = function() {
          fn.apply(self, args);
          node.removeEventListener(event, listener, false);
        }
        node.addEventListener(event, listener, false);
      }

    });
  ;


(function () {

// create some basic transition styling data.
var transitions = CoreStyle.g.transitions = CoreStyle.g.transitions || {};
transitions.duration = '500ms';
transitions.heroDelay = '50ms';
transitions.scaleDelay = '500ms';
transitions.cascadeFadeDuration = '250ms';

Polymer('core-transition-pages',{

  publish: {
    /**
     * This class will be applied to the scope element in the `prepare` function.
     * It is removed in the `complete` function. Used to activate a set of CSS
     * rules that need to apply before the transition runs, e.g. a default opacity
     * or transform for the non-active pages.
     *
     * @attribute scopeClass
     * @type string
     * @default ''
     */
    scopeClass: '',

    /**
     * This class will be applied to the scope element in the `go` function. It is
     * remoived in the `complete' function. Generally used to apply a CSS transition
     * rule only during the transition.
     *
     * @attribute activeClass
     * @type string
     * @default ''
     */
    activeClass: '',

    /**
     * Specifies which CSS property to look for when it receives a `transitionEnd` event
     * to determine whether the transition is complete. If not specified, the first
     * transitionEnd event received will complete the transition.
     *
     * @attribute transitionProperty
     * @type string
     * @default ''
     */
    transitionProperty: ''
  },

  /**
   * True if this transition is complete.
   *
   * @attribute completed
   * @type boolean
   * @default false
   */
  completed: false,

  prepare: function(scope, options) {
    this.boundCompleteFn = this.complete.bind(this, scope);
    if (this.scopeClass) {
      scope.classList.add(this.scopeClass);
    }
  },

  go: function(scope, options) {
    this.completed = false;
    if (this.activeClass) {
      scope.classList.add(this.activeClass);
    }
    scope.addEventListener('transitionend', this.boundCompleteFn, false);
  },

  setup: function(scope) {
    if (!scope._pageTransitionStyles) {
      scope._pageTransitionStyles = {};
    }

    var name = this.calcStyleName();
    
    if (!scope._pageTransitionStyles[name]) {
      this.installStyleInScope(scope, name);
      scope._pageTransitionStyles[name] = true;
    }
  },

  calcStyleName: function() {
    return this.id || this.localName;
  },

  installStyleInScope: function(scope, id) {
    if (!scope.shadowRoot) {
      scope.createShadowRoot().innerHTML = '<content></content>';
    }
    var root = scope.shadowRoot;
    var scopeStyle = document.createElement('core-style');
    root.insertBefore(scopeStyle, root.firstChild);
    scopeStyle.applyRef(id);
  },

  complete: function(scope, e) {
    // TODO(yvonne): hack, need to manage completion better
    if (e.propertyName !== 'box-shadow' && (!this.transitionProperty || e.propertyName.indexOf(this.transitionProperty) !== -1)) {
      this.completed = true;
      this.fire('core-transitionend', this, scope);
    }
  },

  // TODO(sorvell): ideally we do this in complete.
  ensureComplete: function(scope) {
    scope.removeEventListener('transitionend', this.boundCompleteFn, false);
    if (this.scopeClass) {
      scope.classList.remove(this.scopeClass);
    }
    if (this.activeClass) {
      scope.classList.remove(this.activeClass);
    }
  }

});

})();

;

(function() {

  var webkitStyles = '-webkit-transition' in document.documentElement.style
  var TRANSITION_CSSNAME = webkitStyles ? '-webkit-transition' : 'transition';
  var TRANSFORM_CSSNAME = webkitStyles ? '-webkit-transform' : 'transform';
  var TRANSITION_NAME = webkitStyles ? 'webkitTransition' : 'transition';
  var TRANSFORM_NAME = webkitStyles ? 'webkitTransform' : 'transform';

  var hasShadowDOMPolyfill = window.ShadowDOMPolyfill;

  Polymer('hero-transition',{

    go: function(scope, options) {
      var props = [
        'border-radius',
        'width',
        'height',
        TRANSFORM_CSSNAME
      ];

      var duration = options && options.duration || 
          (CoreStyle.g.transitions.heroDuration || 
          CoreStyle.g.transitions.duration);

      scope._heroes.forEach(function(h) {
        var d = h.h0.hasAttribute('hero-delayed') ? CoreStyle.g.transitions.heroDelay : '';
        var wt = [];
        props.forEach(function(p) {
          wt.push(p + ' ' + duration + ' ' + options.easing + ' ' + d);
        });

        h.h1.style[TRANSITION_NAME] = wt.join(', ');
        h.h1.style.borderRadius = h.r1;
        h.h1.style[TRANSFORM_NAME] = 'none';
      });

      this.super(arguments);

      if (!scope._heroes.length) {
        this.completed = true;
      }
    },

    prepare: function(scope, options) {
      this.super(arguments);
      var src = options.src, dst = options.dst;

      if (scope._heroes && scope._heroes.length) {
        this.ensureComplete(scope);
      } else {
        scope._heroes = [];
      }

      // FIXME(yvonne): basic support for nested pages.
      // Look for heroes in the light DOM and one level of shadow DOM of the src and dst,
      // and also in src.selectedItem or dst.selectedItem, then transform the dst hero to src
      var ss = '[hero]';
      var h$ = this.findAllInShadows(src, ss);
      if (src.selectedItem) {
        hs$ = this.findAllInShadows(src.selectedItem, ss);
        hsa$ = [];
        // De-duplicate items
        Array.prototype.forEach.call(hs$, function(hs) {
          if (h$.indexOf(hs) === -1) {
            hsa$.push(hs);
          }
        })
        h$ = h$.concat(hsa$);
      }

      for (var i=0, h0; h0=h$[i]; i++) {
        var v = h0.getAttribute('hero-id');
        var ds = '[hero][hero-id="' + v + '"]';
        var h1 = this.findInShadows(dst, ds);

        if (!h1 && dst.selectedItem) {
          h1 = this.findInShadows(dst.selectedItem, ds);
        }

        // console.log('src', src);
        // console.log('dst', dst, dst.selectedItem);
        // console.log(v, h0, h1);
        if (v && h1) {
          var c0 = getComputedStyle(h0);
          var c1 = getComputedStyle(h1);
          var h = {
            h0: h0,
            b0: h0.getBoundingClientRect(),
            r0: c0.borderRadius,
            h1: h1,
            b1: h1.getBoundingClientRect(),
            r1: c1.borderRadius
          };

          var dl = h.b0.left - h.b1.left;
          var dt = h.b0.top - h.b1.top;
          var sw = h.b0.width / h.b1.width;
          var sh = h.b0.height / h.b1.height;

          // h.scaley = h.h0.hasAttribute('scaley');
          // if (!h.scaley && (sw !== 1 || sh !== 1)) {
          //   sw = sh = 1;
          //   h.h1.style.width = h.b0.width + 'px';
          //   h.h1.style.height = h.b0.height + 'px';
          // }

          // Also animate the border-radius for the circle-to-square transition
          if (h.r0 !== h.r1) {
            h.h1.style.borderRadius = h.r0;
          }

          // console.log(h);

          h.h1.style[TRANSFORM_NAME] = 'translate(' + dl + 'px,' + dt + 'px)' + ' scale(' + sw + ',' + sh + ')';
          h.h1.style[TRANSFORM_NAME + 'Origin'] = '0 0';

          scope._heroes.push(h);
        }
      }

    },

    // carefully look into ::shadow with polyfill specific hack
    findInShadows: function(node, selector) {
      return node.querySelector(selector) || (hasShadowDOMPolyfill ? 
          Platform.queryAllShadows(node, selector) :
          node.querySelector('::shadow ' + selector));
    },

    findAllInShadows: function(node, selector) {
      if (hasShadowDOMPolyfill) {
        var nodes = node.querySelectorAll(selector).array();
        var shadowNodes = Platform.queryAllShadows(node, selector, true);
        return nodes.concat(shadowNodes);
      } else {
        return node.querySelectorAll(selector).array().concat(node.shadowRoot ? node.shadowRoot.querySelectorAll(selector).array() : []);
      }
    },

    ensureComplete: function(scope) {
      this.super(arguments);
      if (scope._heroes) {
        scope._heroes.forEach(function(h) {
          h.h1.style[TRANSITION_NAME] = null;
          h.h1.style[TRANSFORM_NAME] = null;
        });
        scope._heroes = [];
      }
    },

    complete: function(scope, e) {
      // if (e.propertyName === TRANSFORM_CSSNAME) {
        var done = false;
        scope._heroes.forEach(function(h) {
          if (h.h1 === e.path[0]) {
            done = true;
          }
        });

        if (done) {
          this.super(arguments);
        }
      // }
    }

  });

})();
;


  Polymer('core-animated-pages',{

    eventDelegates: {
      'core-transitionend': 'transitionEnd'
    },

    /**
     * A space-delimited string of transitions to use when switching between pages in this element.
     * The strings are `id`s of `core-transition-pages` elements included elsewhere. See the
     * individual transition's document for specific details.
     *
     * @attribute transitions
     * @type string
     * @default ''
     */
    transitions: '',

    selected: 0,

    /**
     * The last page selected. This property is useful to dynamically set transitions based
     * on incoming and outgoing pages.
     *
     * @attribute lastSelected
     * @type Object
     * @default null
     */
    lastSelected: null,

    registerCallback: function() {
      this.tmeta = document.createElement('core-transition');
    },

    created: function() {
      this._transitions = [];
      this.transitioning = [];
    },

    transitionsChanged: function() {
      this._transitions = this.transitions.split(' ');
    },

    _transitionsChanged: function(old) {
      if (this._transitionElements) {
        this._transitionElements.forEach(function(t) {
          t.teardown(this);
        }, this);
      }
      this._transitionElements = [];
      this._transitions.forEach(function(transitionId) {
        var t = this.getTransition(transitionId);
        if (t) {
          this._transitionElements.push(t);
          t.setup(this);
        }
      }, this);
    },

    getTransition: function(transitionId) {
      return this.tmeta.byId(transitionId);
    },

    selectionSelect: function(e, detail) {
      this.updateSelectedItem();
      // Wait to call applySelection when we run the transition
    },

    applyTransition: function(src, dst) {
      if (this.animating) {
        this.cancelAsync(this.animating);
        this.animating = null;
      }

      Platform.flush();

      if (this.transitioning.indexOf(src) === -1) {
        this.transitioning.push(src);
      }
      if (this.transitioning.indexOf(dst) === -1) {
        this.transitioning.push(dst);
      }
      // force src, dst to display 
      src.setAttribute('animate', '');
      dst.setAttribute('animate', '');
      //
      var options = {
        src: src,
        dst: dst,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
      }

      // fire an event so clients have a chance to do something when the
      // new page becomes visible but before it draws.
      this.fire('core-animated-pages-transition-prepare');

      //
      // prepare transition
      this._transitionElements.forEach(function(transition) {
        transition.prepare(this, options);
      }, this);
      //
      // force layout!
      src.offsetTop;

      //
      // apply selection
      this.applySelection(dst, true);
      this.applySelection(src, false);
      //
      // start transition
      this._transitionElements.forEach(function(transition) {
        transition.go(this, options);
      }, this);

      if (!this._transitionElements.length) {
        this.complete();
      } else {
        this.animating = this.async(this.complete.bind(this), null, 5000);
      }
    },

    complete: function() {
      if (this.animating) {
        this.cancelAsync(this.animating);
        this.animating = null;
      }

      this.transitioning.forEach(function(t) {
        t.removeAttribute('animate');
      });
      this.transitioning = [];

      this._transitionElements.forEach(function(transition) {
        transition.ensureComplete(this);
      }, this);

      this.fire('core-animated-pages-transition-end');
    },
    
    transitionEnd: function(e) {
      if (this.transitioning.length) {
        var completed = true;
        this._transitionElements.forEach(function(transition) {
          if (!transition.completed) {
            completed = false;
          }
        });
        if (completed) {
          this.job('transitionWatch', function() {
            this.complete();
          }, 100);
        }
      }
    },

    selectedChanged: function(old) {
      this.lastSelected = old;
      this.super(arguments);
    },

    selectedItemChanged: function(oldItem) {
      this.super(arguments);

      if (!oldItem) {
        this.applySelection(this.selectedItem, true);
        return;
      }

      if (this.hasAttribute('no-transition') || !this._transitionElements || !this._transitionElements.length) {
        this.applySelection(oldItem, false);
        this.applySelection(this.selectedItem, true);
        return;
      }

      if (oldItem && this.selectedItem) {
        // TODO(sorvell): allow bindings to update first?
        var self = this;
        Platform.flush();
        Platform.endOfMicrotask(function() {
          self.applyTransition(oldItem, self.selectedItem);
        });
      }
    }

  });

;


  Polymer('core-collapse', {
    /**
     * Fired when the target element has been resized as a result of the opened
     * state changing.
     * 
     * @event core-resize
    */

    /**
     * The target element.
     *
     * @attribute target
     * @type object
     * @default null
     */
    target: null,

    /**
     * If true, the orientation is horizontal; otherwise is vertical.
     *
     * @attribute horizontal
     * @type boolean
     * @default false
     */
    horizontal: false,

    /**
     * Set opened to true to show the collapse element and to false to hide it.
     *
     * @attribute opened
     * @type boolean
     * @default false
     */
    opened: false,

    /**
     * Collapsing/expanding animation duration in second.
     *
     * @attribute duration
     * @type number
     * @default 0.33
     */
    duration: 0.33,

    /**
     * If true, the size of the target element is fixed and is set
     * on the element.  Otherwise it will try to 
     * use auto to determine the natural size to use
     * for collapsing/expanding.
     *
     * @attribute fixedSize
     * @type boolean
     * @default false
     */
    fixedSize: false,

    created: function() {
      this.transitionEndListener = this.transitionEnd.bind(this);
    },
    
    ready: function() {
      this.target = this.target || this;
    },

    domReady: function() {
      this.async(function() {
        this.afterInitialUpdate = true;
      });
    },

    detached: function() {
      if (this.target) {
        this.removeListeners(this.target);
      }
    },

    targetChanged: function(old) {
      if (old) {
        this.removeListeners(old);
      }
      if (!this.target) {
        return;
      }
      this.isTargetReady = !!this.target;
      this.classList.toggle('core-collapse-closed', this.target !== this);
      this.target.style.overflow = 'hidden';
      this.horizontalChanged();
      this.addListeners(this.target);
      // set core-collapse-closed class initially to hide the target
      this.toggleClosedClass(true);
      this.update();
    },

    addListeners: function(node) {
      node.addEventListener('transitionend', this.transitionEndListener);
    },

    removeListeners: function(node) {
      node.removeEventListener('transitionend', this.transitionEndListener);
    },

    horizontalChanged: function() {
      this.dimension = this.horizontal ? 'width' : 'height';
    },

    openedChanged: function() {
      this.update();
    },

    /**
     * Toggle the opened state.
     *
     * @method toggle
     */
    toggle: function() {
      this.opened = !this.opened;
    },

    setTransitionDuration: function(duration) {
      var s = this.target.style;
      s.transition = duration ? (this.dimension + ' ' + duration + 's') : null;
      if (duration === 0) {
        this.async('transitionEnd');
      }
    },

    transitionEnd: function() {
      if (this.opened && !this.fixedSize) {
        this.updateSize('auto', null);
      }
      this.setTransitionDuration(null);
      this.toggleClosedClass(!this.opened);
      this.asyncFire('core-resize', null, this.target);
    },

    toggleClosedClass: function(closed) {
      this.hasClosedClass = closed;
      this.target.classList.toggle('core-collapse-closed', closed);
    },

    updateSize: function(size, duration, forceEnd) {
      this.setTransitionDuration(duration);
      this.calcSize();
      var s = this.target.style;
      var nochange = s[this.dimension] === size;
      s[this.dimension] = size;
      // transitonEnd will not be called if the size has not changed
      if (forceEnd && nochange) {
        this.transitionEnd();
      }
    },

    update: function() {
      if (!this.target) {
        return;
      }
      if (!this.isTargetReady) {
        this.targetChanged(); 
      }
      this.horizontalChanged();
      this[this.opened ? 'show' : 'hide']();
    },

    calcSize: function() {
      return this.target.getBoundingClientRect()[this.dimension] + 'px';
    },

    getComputedSize: function() {
      return getComputedStyle(this.target)[this.dimension];
    },

    show: function() {
      this.toggleClosedClass(false);
      // for initial update, skip the expanding animation to optimize
      // performance e.g. skip calcSize
      if (!this.afterInitialUpdate) {
        this.transitionEnd();
        return;
      }
      if (!this.fixedSize) {
        this.updateSize('auto', null);
        var s = this.calcSize();
        this.updateSize(0, null);
      }
      this.async(function() {
        this.updateSize(this.size || s, this.duration, true);
      });
    },

    hide: function() {
      // don't need to do anything if it's already hidden
      if (this.hasClosedClass && !this.fixedSize) {
        return;
      }
      if (this.fixedSize) {
        // save the size before hiding it
        this.size = this.getComputedSize();
      } else {
        this.updateSize(this.calcSize(), null);
      }
      this.async(function() {
        this.updateSize(0, this.duration);
      });
    }

  });

;

  
  (function() {
  
    Polymer('core-layout', {

      isContainer: false,
      /**
       * Controls if the element lays out vertically or not.
       *
       * @attribute vertical
       * @type boolean
       * @default false
       */
      vertical: false,
      /**
       * Controls how the items are aligned in the main-axis direction. For 
       * example for a horizontal layout, this controls how each item is aligned
       * horizontally.
       *
       * @attribute justify
       * @type string start|center|end|between
       * @default ''
       */
      justify: '',
      /**
       * Controls how the items are aligned in cross-axis direction. For 
       * example for a horizontal layout, this controls how each item is aligned
       * vertically.
       *
       * @attribute align
       * @type string start|center|end
       * @default ''
       */
      align: '',
      /**
       * Controls whether or not the items layout in reverse order.
       *
       * @attribute reverse
       * @type boolean
       * @default false
       */
      reverse: false,
      layoutPrefix: 'core-',
  
      // NOTE: include template so that styles are loaded, but remove
      // so that we can decide dynamically what part to include
      registerCallback: function(polymerElement) {
        var template = polymerElement.querySelector('template');
        this.styles = template.content.querySelectorAll('style').array();
        this.styles.forEach(function(s) {
          s.removeAttribute('no-shim');
        })
      },
  
      fetchTemplate: function() {
        return null;
      },
  
      attached: function() {
        this.installScopeStyle(this.styles[0]);
        if (this.children.length) {
          this.isContainer = true;
        }
        var container = this.isContainer ? this : this.parentNode;  
        // detect if laying out a shadowRoot host.
        var forHost = container instanceof ShadowRoot;
        if (forHost) {
          this.installScopeStyle(this.styles[1], 'host');
          container = container.host || document.body;
        }
        this.layoutContainer = container;
      },

      detached: function() {
        this.layoutContainer = null;
      },

      layoutContainerChanged: function(old) {
        this.style.display = this.layoutContainer === this ? null : 'none';
        this.verticalChanged();
        this.alignChanged();
        this.justifyChanged();
      },

      setLayoutClass: function(prefix, old, newValue) {
        if (this.layoutContainer) {
          prefix = this.layoutPrefix + prefix;
          if (old) {
            this.layoutContainer.classList.remove(prefix + old);
          }
          if (newValue) {
            this.layoutContainer.classList.add(prefix + newValue);
          }
        }
      },

      verticalChanged: function(old) {
        old = old ? 'v' : 'h';
        var vertical = this.vertical ? 'v' : 'h';
        this.setLayoutClass('', old, vertical);
      },

      alignChanged: function(old) {
        this.setLayoutClass('align-', old, this.align);
      },

      justifyChanged: function(old) {
        this.setLayoutClass('justify-', old, this.justify);
      },

      reverseChanged: function(old) {
        old = old ? 'reverse' : '';
        var newValue = this.reverse ? 'reverse' : '';
        this.setLayoutClass('', old, newValue);
      }

    });

  })();
  ;

  
    Polymer('core-iconset', {
  
      /**
       * The URL of the iconset image.
       *
       * @attribute src
       * @type string
       * @default ''
       */
      src: '',

      /**
       * The width of the iconset image. This must only be specified if the
       * icons are arranged into separate rows inside the image.
       *
       * @attribute width
       * @type number
       * @default 0
       */
      width: 0,

      /**
       * A space separated list of names corresponding to icons in the iconset
       * image file. This list must be ordered the same as the icon images
       * in the image file.
       *
       * @attribute icons
       * @type string
       * @default ''
       */
      icons: '',

      /**
       * The size of an individual icon. Note that icons must be square.
       *
       * @attribute iconSize
       * @type number
       * @default 24
       */
      iconSize: 24,

      /**
       * The horizontal offset of the icon images in the inconset src image.
       * This is typically used if the image resource contains additional images
       * beside those intended for the iconset.
       *
       * @attribute offsetX
       * @type number
       * @default 0
       */
      offsetX: 0,
      /**
       * The vertical offset of the icon images in the inconset src image.
       * This is typically used if the image resource contains additional images
       * beside those intended for the iconset.
       *
       * @attribute offsetY
       * @type number
       * @default 0
       */
      offsetY: 0,
      type: 'iconset',

      created: function() {
        this.iconMap = {};
        this.iconNames = [];
        this.themes = {};
      },
  
      ready: function() {
        // TODO(sorvell): ensure iconset's src is always relative to the main
        // document
        if (this.src && (this.ownerDocument !== document)) {
          this.src = this.resolvePath(this.src, this.ownerDocument.baseURI);
        }
        this.super();
        this.updateThemes();
      },

      iconsChanged: function() {
        var ox = this.offsetX;
        var oy = this.offsetY;
        this.icons && this.icons.split(/\s+/g).forEach(function(name, i) {
          this.iconNames.push(name);
          this.iconMap[name] = {
            offsetX: ox,
            offsetY: oy
          }
          if (ox + this.iconSize < this.width) {
            ox += this.iconSize;
          } else {
            ox = this.offsetX;
            oy += this.iconSize;
          }
        }, this);
      },

      updateThemes: function() {
        var ts = this.querySelectorAll('property[theme]');
        ts && ts.array().forEach(function(t) {
          this.themes[t.getAttribute('theme')] = {
            offsetX: parseInt(t.getAttribute('offsetX')) || 0,
            offsetY: parseInt(t.getAttribute('offsetY')) || 0
          };
        }, this);
      },

      // TODO(ffu): support retrived by index e.g. getOffset(10);
      /**
       * Returns an object containing `offsetX` and `offsetY` properties which
       * specify the pixel locaion in the iconset's src file for the given
       * `icon` and `theme`. It's uncommon to call this method. It is useful,
       * for example, to manually position a css backgroundImage to the proper
       * offset. It's more common to use the `applyIcon` method.
       *
       * @method getOffset
       * @param {String|Number} icon The name of the icon or the index of the
       * icon within in the icon image.
       * @param {String} theme The name of the theme.
       * @returns {Object} An object specifying the offset of the given icon 
       * within the icon resource file; `offsetX` is the horizontal offset and
       * `offsetY` is the vertical offset. Both values are in pixel units.
       */
      getOffset: function(icon, theme) {
        var i = this.iconMap[icon];
        if (!i) {
          var n = this.iconNames[Number(icon)];
          i = this.iconMap[n];
        }
        var t = this.themes[theme];
        if (i && t) {
          return {
            offsetX: i.offsetX + t.offsetX,
            offsetY: i.offsetY + t.offsetY
          }
        }
        return i;
      },

      /**
       * Applies an icon to the given element as a css background image. This
       * method does not size the element, and it's often necessary to set 
       * the element's height and width so that the background image is visible.
       *
       * @method applyIcon
       * @param {Element} element The element to which the background is
       * applied.
       * @param {String|Number} icon The name or index of the icon to apply.
       * @param {Number} scale (optional, defaults to 1) A scaling factor 
       * with which the icon can be magnified.
       * @return {Element} The icon element.
       */
      applyIcon: function(element, icon, scale) {
        var offset = this.getOffset(icon);
        scale = scale || 1;
        if (element && offset) {
          var icon = element._icon || document.createElement('div');
          var style = icon.style;
          style.backgroundImage = 'url(' + this.src + ')';
          style.backgroundPosition = (-offset.offsetX * scale + 'px') + 
             ' ' + (-offset.offsetY * scale + 'px');
          style.backgroundSize = scale === 1 ? 'auto' :
             this.width * scale + 'px';
          if (icon.parentNode !== element) {
            element.appendChild(icon);
          }
          return icon;
        }
      }

    });

  ;

(function() {
  
  // mono-state
  var meta;
  
  Polymer('core-icon', {

    /**
     * The URL of an image for the icon. If the src property is specified,
     * the icon property should not be.
     *
     * @attribute src
     * @type string
     * @default ''
     */
    src: '',

    /**
     * Specifies the icon name or index in the set of icons available in
     * the icon's icon set. If the icon property is specified,
     * the src property should not be.
     *
     * @attribute icon
     * @type string
     * @default ''
     */
    icon: '',

    /**
     * Alternative text content for accessibility support.
     * If alt is present and not empty, it will set the element's role to img and add an aria-label whose content matches alt.
     * If alt is present and is an empty string, '', it will hide the element from the accessibility layer
     * If alt is not present, it will set the element's role to img and the element will fallback to using the icon attribute for its aria-label.
     * 
     * @attribute alt
     * @type string
     * @default ''
     */
    alt: null,

    observe: {
      'icon': 'updateIcon',
      'alt': 'updateAlt'
    },

    defaultIconset: 'icons',

    ready: function() {
      if (!meta) {
        meta = document.createElement('core-iconset');
      }

      // Allow user-provided `aria-label` in preference to any other text alternative.
      if (this.hasAttribute('aria-label')) {
        // Set `role` if it has not been overridden.
        if (!this.hasAttribute('role')) {
          this.setAttribute('role', 'img');
        }
        return;
      }
      this.updateAlt();
    },

    srcChanged: function() {
      var icon = this._icon || document.createElement('div');
      icon.textContent = '';
      icon.setAttribute('fit', '');
      icon.style.backgroundImage = 'url(' + this.src + ')';
      icon.style.backgroundPosition = 'center';
      icon.style.backgroundSize = '100%';
      if (!icon.parentNode) {
        this.appendChild(icon);
      }
      this._icon = icon;
    },

    getIconset: function(name) {
      return meta.byId(name || this.defaultIconset);
    },

    updateIcon: function(oldVal, newVal) {
      if (!this.icon) {
        this.updateAlt();
        return;
      }
      var parts = String(this.icon).split(':');
      var icon = parts.pop();
      if (icon) {
        var set = this.getIconset(parts.pop());
        if (set) {
          this._icon = set.applyIcon(this, icon);
          if (this._icon) {
            this._icon.setAttribute('fit', '');
          }
        }
      }
      // Check to see if we're using the old icon's name for our a11y fallback
      if (oldVal) {
        if (oldVal.split(':').pop() == this.getAttribute('aria-label')) {
          this.updateAlt();
        }
      }
    },

    updateAlt: function() {
      // Respect the user's decision to remove this element from
      // the a11y tree
      if (this.getAttribute('aria-hidden')) {
        return;
      }

      // Remove element from a11y tree if `alt` is empty, otherwise
      // use `alt` as `aria-label`.
      if (this.alt === '') {
        this.setAttribute('aria-hidden', 'true');
        if (this.hasAttribute('role')) {
          this.removeAttribute('role');
        }
        if (this.hasAttribute('aria-label')) {
          this.removeAttribute('aria-label');
        }
      } else {
        this.setAttribute('aria-label', this.alt ||
                                        this.icon.split(':').pop());
        if (!this.hasAttribute('role')) {
          this.setAttribute('role', 'img');
        }
        if (this.hasAttribute('aria-hidden')) {
          this.removeAttribute('aria-hidden');
        }
      }
    }

  });
  
})();
;


    Polymer('core-iconset-svg', {


      /**
       * The size of an individual icon. Note that icons must be square.
       *
       * @attribute iconSize
       * @type number
       * @default 24
       */
      iconSize: 24,
      type: 'iconset',

      created: function() {
        this._icons = {};
      },

      ready: function() {
        this.super();
        this.updateIcons();
      },

      iconById: function(id) {
        return this._icons[id] || (this._icons[id] = this.querySelector('#' + id));
      },

      cloneIcon: function(id) {
        var icon = this.iconById(id);
        if (icon) {
          var content = icon.cloneNode(true);
          content.removeAttribute('id');
          var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
          svg.setAttribute('viewBox', '0 0 ' + this.iconSize + ' ' +
              this.iconSize);
          // NOTE(dfreedm): work around https://crbug.com/370136
          svg.style.pointerEvents = 'none';
          svg.appendChild(content);
          return svg;
        }
      },

      get iconNames() {
        if (!this._iconNames) {
          this._iconNames = this.findIconNames();
        }
        return this._iconNames;
      },

      findIconNames: function() {
        var icons = this.querySelectorAll('[id]').array();
        if (icons.length) {
          return icons.map(function(n){ return n.id });
        }
      },

      /**
       * Applies an icon to the given element. The svg icon is added to the
       * element's shadowRoot if one exists or directly to itself.
       *
       * @method applyIcon
       * @param {Element} element The element to which the icon is
       * applied.
       * @param {String|Number} icon The name the icon to apply.
       * @return {Element} The icon element
       */
      applyIcon: function(element, icon) {
        var root = element;
        // remove old
        var old = root.querySelector('svg');
        if (old) {
          old.remove();
        }
        // install new
        var svg = this.cloneIcon(icon);
        if (!svg) {
          return;
        }
        svg.setAttribute('height', '100%');
        svg.setAttribute('width', '100%');
        svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
        svg.style.display = 'block';
        root.insertBefore(svg, root.firstElementChild);
        return svg;
      },
      
      /**
       * Tell users of the iconset, that the set has loaded.
       * This finds all elements matching the selector argument and calls 
       * the method argument on them.
       * @method updateIcons
       * @param selector {string} css selector to identify iconset users, 
       * defaults to '[icon]'
       * @param method {string} method to call on found elements, 
       * defaults to 'updateIcon'
       */
      updateIcons: function(selector, method) {
        selector = selector || '[icon]';
        method = method || 'updateIcon';
        var deep = window.ShadowDOMPolyfill ? '' : 'html /deep/ ';
        var i$ = document.querySelectorAll(deep + selector);
        for (var i=0, e; e=i$[i]; i++) {
          if (e[method]) {
            e[method].call(e);
          }
        }
      }
      

    });

  ;


    Polymer('core-icon-button', {

      /**
       * The URL of an image for the icon.  Should not use `icon` property
       * if you are using this property.
       *
       * @attribute src
       * @type string
       * @default ''
       */
      src: '',

      /**
       * If true, border is placed around the button to indicate it's
       * active state.
       *
       * @attribute active
       * @type boolean
       * @default false
       */
      active: false,

      /**
       * Specifies the icon name or index in the set of icons available in
       * the icon set.  Should not use `src` property if you are using this
       * property.
       *
       * @attribute icon
       * @type string
       * @default ''
       */
      icon: '',

      activeChanged: function() {
        this.classList.toggle('selected', this.active);
      }

    });

  ;
Polymer('core-toolbar');;


  Polymer('core-header-panel', {
    
    /**
     * Fired when the content has been scrolled.  `details.target` returns
     * the scrollable element which you can use to access scroll info such as
     * `scrollTop`.
     *
     * @event scroll
     */

    publish: {
      /**
       * Controls header and scrolling behavior. Options are
       * `standard`, `seamed`, `waterfall`, `waterfall-tall`, 
       * `waterfall-medium-tall`, `scroll` and `cover`.
       * Default is `standard`.
       *
       * `standard`: The header is a step above the panel. The header will consume the 
       * panel at the point of entry, preventing it from passing through to the 
       * opposite side.
       *
       * `seamed`: The header is presented as seamed with the panel.
       *
       * `waterfall`: Similar to standard mode, but header is initially presented as 
       * seamed with panel, but then separates to form the step.
       *
       * `waterfall-tall`: The header is initially taller (`tall` class is added to 
       * the header).  As the user scrolls, the header separates (forming an edge)
       * while condensing (`tall` class is removed from the header).
       *
       * `scroll`: The header keeps its seam with the panel, and is pushed off screen.
       *
       * `cover`: The panel covers the whole `core-header-panel` including the
       * header. This allows user to style the panel in such a way that the panel is
       * partially covering the header.
       *
       *     <style>
       *       core-header-panel[mode=cover]::shadow #mainContainer {
       *         left: 80px;
       *       }
       *       .content {
       *         margin: 60px 60px 60px 0;
       *       }
       *     </style>
       * 
       *     <core-header-panel mode="cover">
       *       <core-appbar class="tall">
       *         <core-icon-button icon="menu"></core-icon-button>
       *       </core-appbar>
       *       <div class="content"></div>
       *     </core-header-panel>
       *
       * @attribute mode
       * @type string
       * @default ''
       */
      mode: {value: '', reflect: true},
      
      /**
       * The class used in waterfall-tall mode.  Change this if the header
       * accepts a different class for toggling height, e.g. "medium-tall"
       *
       * @attribute tallClass
       * @type string
       * @default 'tall'
       */
      tallClass: 'tall',
      
      /**
       * If true, the drop-shadow is always shown no matter what mode is set to.
       *
       * @attribute shadow
       * @type boolean
       * @default false
       */
      shadow: false
    },
    
    domReady: function() {
      this.async('scroll');
    },

    modeChanged: function() {
      this.scroll();
    },

    get header() {
      return this.$.headerContent.getDistributedNodes()[0];
    },
    
    /**
     * Returns the scrollable element.
     *
     * @property scroller
     * @type Object
     */
    get scroller() {
      return this.mode === 'scroll' ? 
          this.$.outerContainer : this.$.mainContainer;
    },
    
    scroll: function() {
      var shadowMode = {'waterfall': 1, 'waterfall-tall': 1};
      var noShadow = {'seamed': 1, 'cover': 1, 'scroll': 1};
      var tallMode = {'waterfall-tall': 1};
      
      var main = this.$.mainContainer;
      var header = this.header;
      
      var sTop = main.scrollTop;
      var atTop = sTop === 0;
      
      if (header) {
        this.$.dropShadow.classList.toggle('hidden', !this.shadow &&
            (atTop && shadowMode[this.mode] || noShadow[this.mode]));
        
        if (tallMode[this.mode]) {
          header.classList.toggle(this.tallClass, atTop || 
              main.scrollHeight < this.$.outerContainer.offsetHeight);
        }
        
        header.classList.toggle('animate', tallMode[this.mode]);
      }
      
      this.fire('scroll', {target: this.scroller}, this, false);
    }

  });

;
/**
 * marked - a markdown parser
 * Copyright (c) 2011-2014, Christopher Jeffrey. (MIT Licensed)
 * https://github.com/chjj/marked
 */

;(function() {

/**
 * Block-Level Grammar
 */

var block = {
  newline: /^\n+/,
  code: /^( {4}[^\n]+\n*)+/,
  fences: noop,
  hr: /^( *[-*_]){3,} *(?:\n+|$)/,
  heading: /^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,
  nptable: noop,
  lheading: /^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,
  blockquote: /^( *>[^\n]+(\n(?!def)[^\n]+)*\n*)+/,
  list: /^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,
  html: /^ *(?:comment|closed|closing) *(?:\n{2,}|\s*$)/,
  def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,
  table: noop,
  paragraph: /^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/,
  text: /^[^\n]+/
};

block.bullet = /(?:[*+-]|\d+\.)/;
block.item = /^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/;
block.item = replace(block.item, 'gm')
  (/bull/g, block.bullet)
  ();

block.list = replace(block.list)
  (/bull/g, block.bullet)
  ('hr', '\\n+(?=\\1?(?:[-*_] *){3,}(?:\\n+|$))')
  ('def', '\\n+(?=' + block.def.source + ')')
  ();

block.blockquote = replace(block.blockquote)
  ('def', block.def)
  ();

block._tag = '(?!(?:'
  + 'a|em|strong|small|s|cite|q|dfn|abbr|data|time|code'
  + '|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo'
  + '|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|[^\\w\\s@]*@)\\b';

block.html = replace(block.html)
  ('comment', /<!--[\s\S]*?-->/)
  ('closed', /<(tag)[\s\S]+?<\/\1>/)
  ('closing', /<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/)
  (/tag/g, block._tag)
  ();

block.paragraph = replace(block.paragraph)
  ('hr', block.hr)
  ('heading', block.heading)
  ('lheading', block.lheading)
  ('blockquote', block.blockquote)
  ('tag', '<' + block._tag)
  ('def', block.def)
  ();

/**
 * Normal Block Grammar
 */

block.normal = merge({}, block);

/**
 * GFM Block Grammar
 */

block.gfm = merge({}, block.normal, {
  fences: /^ *(`{3,}|~{3,}) *(\S+)? *\n([\s\S]+?)\s*\1 *(?:\n+|$)/,
  paragraph: /^/
});

block.gfm.paragraph = replace(block.paragraph)
  ('(?!', '(?!'
    + block.gfm.fences.source.replace('\\1', '\\2') + '|'
    + block.list.source.replace('\\1', '\\3') + '|')
  ();

/**
 * GFM + Tables Block Grammar
 */

block.tables = merge({}, block.gfm, {
  nptable: /^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,
  table: /^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/
});

/**
 * Block Lexer
 */

function Lexer(options) {
  this.tokens = [];
  this.tokens.links = {};
  this.options = options || marked.defaults;
  this.rules = block.normal;

  if (this.options.gfm) {
    if (this.options.tables) {
      this.rules = block.tables;
    } else {
      this.rules = block.gfm;
    }
  }
}

/**
 * Expose Block Rules
 */

Lexer.rules = block;

/**
 * Static Lex Method
 */

Lexer.lex = function(src, options) {
  var lexer = new Lexer(options);
  return lexer.lex(src);
};

/**
 * Preprocessing
 */

Lexer.prototype.lex = function(src) {
  src = src
    .replace(/\r\n|\r/g, '\n')
    .replace(/\t/g, '    ')
    .replace(/\u00a0/g, ' ')
    .replace(/\u2424/g, '\n');

  return this.token(src, true);
};

/**
 * Lexing
 */

Lexer.prototype.token = function(src, top, bq) {
  var src = src.replace(/^ +$/gm, '')
    , next
    , loose
    , cap
    , bull
    , b
    , item
    , space
    , i
    , l;

  while (src) {
    // newline
    if (cap = this.rules.newline.exec(src)) {
      src = src.substring(cap[0].length);
      if (cap[0].length > 1) {
        this.tokens.push({
          type: 'space'
        });
      }
    }

    // code
    if (cap = this.rules.code.exec(src)) {
      src = src.substring(cap[0].length);
      cap = cap[0].replace(/^ {4}/gm, '');
      this.tokens.push({
        type: 'code',
        text: !this.options.pedantic
          ? cap.replace(/\n+$/, '')
          : cap
      });
      continue;
    }

    // fences (gfm)
    if (cap = this.rules.fences.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'code',
        lang: cap[2],
        text: cap[3]
      });
      continue;
    }

    // heading
    if (cap = this.rules.heading.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'heading',
        depth: cap[1].length,
        text: cap[2]
      });
      continue;
    }

    // table no leading pipe (gfm)
    if (top && (cap = this.rules.nptable.exec(src))) {
      src = src.substring(cap[0].length);

      item = {
        type: 'table',
        header: cap[1].replace(/^ *| *\| *$/g, '').split(/ *\| */),
        align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
        cells: cap[3].replace(/\n$/, '').split('\n')
      };

      for (i = 0; i < item.align.length; i++) {
        if (/^ *-+: *$/.test(item.align[i])) {
          item.align[i] = 'right';
        } else if (/^ *:-+: *$/.test(item.align[i])) {
          item.align[i] = 'center';
        } else if (/^ *:-+ *$/.test(item.align[i])) {
          item.align[i] = 'left';
        } else {
          item.align[i] = null;
        }
      }

      for (i = 0; i < item.cells.length; i++) {
        item.cells[i] = item.cells[i].split(/ *\| */);
      }

      this.tokens.push(item);

      continue;
    }

    // lheading
    if (cap = this.rules.lheading.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'heading',
        depth: cap[2] === '=' ? 1 : 2,
        text: cap[1]
      });
      continue;
    }

    // hr
    if (cap = this.rules.hr.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'hr'
      });
      continue;
    }

    // blockquote
    if (cap = this.rules.blockquote.exec(src)) {
      src = src.substring(cap[0].length);

      this.tokens.push({
        type: 'blockquote_start'
      });

      cap = cap[0].replace(/^ *> ?/gm, '');

      // Pass `top` to keep the current
      // "toplevel" state. This is exactly
      // how markdown.pl works.
      this.token(cap, top, true);

      this.tokens.push({
        type: 'blockquote_end'
      });

      continue;
    }

    // list
    if (cap = this.rules.list.exec(src)) {
      src = src.substring(cap[0].length);
      bull = cap[2];

      this.tokens.push({
        type: 'list_start',
        ordered: bull.length > 1
      });

      // Get each top-level item.
      cap = cap[0].match(this.rules.item);

      next = false;
      l = cap.length;
      i = 0;

      for (; i < l; i++) {
        item = cap[i];

        // Remove the list item's bullet
        // so it is seen as the next token.
        space = item.length;
        item = item.replace(/^ *([*+-]|\d+\.) +/, '');

        // Outdent whatever the
        // list item contains. Hacky.
        if (~item.indexOf('\n ')) {
          space -= item.length;
          item = !this.options.pedantic
            ? item.replace(new RegExp('^ {1,' + space + '}', 'gm'), '')
            : item.replace(/^ {1,4}/gm, '');
        }

        // Determine whether the next list item belongs here.
        // Backpedal if it does not belong in this list.
        if (this.options.smartLists && i !== l - 1) {
          b = block.bullet.exec(cap[i + 1])[0];
          if (bull !== b && !(bull.length > 1 && b.length > 1)) {
            src = cap.slice(i + 1).join('\n') + src;
            i = l - 1;
          }
        }

        // Determine whether item is loose or not.
        // Use: /(^|\n)(?! )[^\n]+\n\n(?!\s*$)/
        // for discount behavior.
        loose = next || /\n\n(?!\s*$)/.test(item);
        if (i !== l - 1) {
          next = item.charAt(item.length - 1) === '\n';
          if (!loose) loose = next;
        }

        this.tokens.push({
          type: loose
            ? 'loose_item_start'
            : 'list_item_start'
        });

        // Recurse.
        this.token(item, false, bq);

        this.tokens.push({
          type: 'list_item_end'
        });
      }

      this.tokens.push({
        type: 'list_end'
      });

      continue;
    }

    // html
    if (cap = this.rules.html.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: this.options.sanitize
          ? 'paragraph'
          : 'html',
        pre: cap[1] === 'pre' || cap[1] === 'script' || cap[1] === 'style',
        text: cap[0]
      });
      continue;
    }

    // def
    if ((!bq && top) && (cap = this.rules.def.exec(src))) {
      src = src.substring(cap[0].length);
      this.tokens.links[cap[1].toLowerCase()] = {
        href: cap[2],
        title: cap[3]
      };
      continue;
    }

    // table (gfm)
    if (top && (cap = this.rules.table.exec(src))) {
      src = src.substring(cap[0].length);

      item = {
        type: 'table',
        header: cap[1].replace(/^ *| *\| *$/g, '').split(/ *\| */),
        align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
        cells: cap[3].replace(/(?: *\| *)?\n$/, '').split('\n')
      };

      for (i = 0; i < item.align.length; i++) {
        if (/^ *-+: *$/.test(item.align[i])) {
          item.align[i] = 'right';
        } else if (/^ *:-+: *$/.test(item.align[i])) {
          item.align[i] = 'center';
        } else if (/^ *:-+ *$/.test(item.align[i])) {
          item.align[i] = 'left';
        } else {
          item.align[i] = null;
        }
      }

      for (i = 0; i < item.cells.length; i++) {
        item.cells[i] = item.cells[i]
          .replace(/^ *\| *| *\| *$/g, '')
          .split(/ *\| */);
      }

      this.tokens.push(item);

      continue;
    }

    // top-level paragraph
    if (top && (cap = this.rules.paragraph.exec(src))) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'paragraph',
        text: cap[1].charAt(cap[1].length - 1) === '\n'
          ? cap[1].slice(0, -1)
          : cap[1]
      });
      continue;
    }

    // text
    if (cap = this.rules.text.exec(src)) {
      // Top-level should never reach here.
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'text',
        text: cap[0]
      });
      continue;
    }

    if (src) {
      throw new
        Error('Infinite loop on byte: ' + src.charCodeAt(0));
    }
  }

  return this.tokens;
};

/**
 * Inline-Level Grammar
 */

var inline = {
  escape: /^\\([\\`*{}\[\]()#+\-.!_>])/,
  autolink: /^<([^ >]+(@|:\/)[^ >]+)>/,
  url: noop,
  tag: /^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^'">])*?>/,
  link: /^!?\[(inside)\]\(href\)/,
  reflink: /^!?\[(inside)\]\s*\[([^\]]*)\]/,
  nolink: /^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,
  strong: /^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,
  em: /^\b_((?:__|[\s\S])+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,
  code: /^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,
  br: /^ {2,}\n(?!\s*$)/,
  del: noop,
  text: /^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/
};

inline._inside = /(?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*/;
inline._href = /\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/;

inline.link = replace(inline.link)
  ('inside', inline._inside)
  ('href', inline._href)
  ();

inline.reflink = replace(inline.reflink)
  ('inside', inline._inside)
  ();

/**
 * Normal Inline Grammar
 */

inline.normal = merge({}, inline);

/**
 * Pedantic Inline Grammar
 */

inline.pedantic = merge({}, inline.normal, {
  strong: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
  em: /^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/
});

/**
 * GFM Inline Grammar
 */

inline.gfm = merge({}, inline.normal, {
  escape: replace(inline.escape)('])', '~|])')(),
  url: /^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,
  del: /^~~(?=\S)([\s\S]*?\S)~~/,
  text: replace(inline.text)
    (']|', '~]|')
    ('|', '|https?://|')
    ()
});

/**
 * GFM + Line Breaks Inline Grammar
 */

inline.breaks = merge({}, inline.gfm, {
  br: replace(inline.br)('{2,}', '*')(),
  text: replace(inline.gfm.text)('{2,}', '*')()
});

/**
 * Inline Lexer & Compiler
 */

function InlineLexer(links, options) {
  this.options = options || marked.defaults;
  this.links = links;
  this.rules = inline.normal;
  this.renderer = this.options.renderer || new Renderer;
  this.renderer.options = this.options;

  if (!this.links) {
    throw new
      Error('Tokens array requires a `links` property.');
  }

  if (this.options.gfm) {
    if (this.options.breaks) {
      this.rules = inline.breaks;
    } else {
      this.rules = inline.gfm;
    }
  } else if (this.options.pedantic) {
    this.rules = inline.pedantic;
  }
}

/**
 * Expose Inline Rules
 */

InlineLexer.rules = inline;

/**
 * Static Lexing/Compiling Method
 */

InlineLexer.output = function(src, links, options) {
  var inline = new InlineLexer(links, options);
  return inline.output(src);
};

/**
 * Lexing/Compiling
 */

InlineLexer.prototype.output = function(src) {
  var out = ''
    , link
    , text
    , href
    , cap;

  while (src) {
    // escape
    if (cap = this.rules.escape.exec(src)) {
      src = src.substring(cap[0].length);
      out += cap[1];
      continue;
    }

    // autolink
    if (cap = this.rules.autolink.exec(src)) {
      src = src.substring(cap[0].length);
      if (cap[2] === '@') {
        text = cap[1].charAt(6) === ':'
          ? this.mangle(cap[1].substring(7))
          : this.mangle(cap[1]);
        href = this.mangle('mailto:') + text;
      } else {
        text = escape(cap[1]);
        href = text;
      }
      out += this.renderer.link(href, null, text);
      continue;
    }

    // url (gfm)
    if (!this.inLink && (cap = this.rules.url.exec(src))) {
      src = src.substring(cap[0].length);
      text = escape(cap[1]);
      href = text;
      out += this.renderer.link(href, null, text);
      continue;
    }

    // tag
    if (cap = this.rules.tag.exec(src)) {
      if (!this.inLink && /^<a /i.test(cap[0])) {
        this.inLink = true;
      } else if (this.inLink && /^<\/a>/i.test(cap[0])) {
        this.inLink = false;
      }
      src = src.substring(cap[0].length);
      out += this.options.sanitize
        ? escape(cap[0])
        : cap[0];
      continue;
    }

    // link
    if (cap = this.rules.link.exec(src)) {
      src = src.substring(cap[0].length);
      this.inLink = true;
      out += this.outputLink(cap, {
        href: cap[2],
        title: cap[3]
      });
      this.inLink = false;
      continue;
    }

    // reflink, nolink
    if ((cap = this.rules.reflink.exec(src))
        || (cap = this.rules.nolink.exec(src))) {
      src = src.substring(cap[0].length);
      link = (cap[2] || cap[1]).replace(/\s+/g, ' ');
      link = this.links[link.toLowerCase()];
      if (!link || !link.href) {
        out += cap[0].charAt(0);
        src = cap[0].substring(1) + src;
        continue;
      }
      this.inLink = true;
      out += this.outputLink(cap, link);
      this.inLink = false;
      continue;
    }

    // strong
    if (cap = this.rules.strong.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.strong(this.output(cap[2] || cap[1]));
      continue;
    }

    // em
    if (cap = this.rules.em.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.em(this.output(cap[2] || cap[1]));
      continue;
    }

    // code
    if (cap = this.rules.code.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.codespan(escape(cap[2], true));
      continue;
    }

    // br
    if (cap = this.rules.br.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.br();
      continue;
    }

    // del (gfm)
    if (cap = this.rules.del.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.del(this.output(cap[1]));
      continue;
    }

    // text
    if (cap = this.rules.text.exec(src)) {
      src = src.substring(cap[0].length);
      out += escape(this.smartypants(cap[0]));
      continue;
    }

    if (src) {
      throw new
        Error('Infinite loop on byte: ' + src.charCodeAt(0));
    }
  }

  return out;
};

/**
 * Compile Link
 */

InlineLexer.prototype.outputLink = function(cap, link) {
  var href = escape(link.href)
    , title = link.title ? escape(link.title) : null;

  return cap[0].charAt(0) !== '!'
    ? this.renderer.link(href, title, this.output(cap[1]))
    : this.renderer.image(href, title, escape(cap[1]));
};

/**
 * Smartypants Transformations
 */

InlineLexer.prototype.smartypants = function(text) {
  if (!this.options.smartypants) return text;
  return text
    // em-dashes
    .replace(/--/g, '\u2014')
    // opening singles
    .replace(/(^|[-\u2014/(\[{"\s])'/g, '$1\u2018')
    // closing singles & apostrophes
    .replace(/'/g, '\u2019')
    // opening doubles
    .replace(/(^|[-\u2014/(\[{\u2018\s])"/g, '$1\u201c')
    // closing doubles
    .replace(/"/g, '\u201d')
    // ellipses
    .replace(/\.{3}/g, '\u2026');
};

/**
 * Mangle Links
 */

InlineLexer.prototype.mangle = function(text) {
  var out = ''
    , l = text.length
    , i = 0
    , ch;

  for (; i < l; i++) {
    ch = text.charCodeAt(i);
    if (Math.random() > 0.5) {
      ch = 'x' + ch.toString(16);
    }
    out += '&#' + ch + ';';
  }

  return out;
};

/**
 * Renderer
 */

function Renderer(options) {
  this.options = options || {};
}

Renderer.prototype.code = function(code, lang, escaped) {
  if (this.options.highlight) {
    var out = this.options.highlight(code, lang);
    if (out != null && out !== code) {
      escaped = true;
      code = out;
    }
  }

  if (!lang) {
    return '<pre><code>'
      + (escaped ? code : escape(code, true))
      + '\n</code></pre>';
  }

  return '<pre><code class="'
    + this.options.langPrefix
    + escape(lang, true)
    + '">'
    + (escaped ? code : escape(code, true))
    + '\n</code></pre>\n';
};

Renderer.prototype.blockquote = function(quote) {
  return '<blockquote>\n' + quote + '</blockquote>\n';
};

Renderer.prototype.html = function(html) {
  return html;
};

Renderer.prototype.heading = function(text, level, raw) {
  return '<h'
    + level
    + ' id="'
    + this.options.headerPrefix
    + raw.toLowerCase().replace(/[^\w]+/g, '-')
    + '">'
    + text
    + '</h'
    + level
    + '>\n';
};

Renderer.prototype.hr = function() {
  return this.options.xhtml ? '<hr/>\n' : '<hr>\n';
};

Renderer.prototype.list = function(body, ordered) {
  var type = ordered ? 'ol' : 'ul';
  return '<' + type + '>\n' + body + '</' + type + '>\n';
};

Renderer.prototype.listitem = function(text) {
  return '<li>' + text + '</li>\n';
};

Renderer.prototype.paragraph = function(text) {
  return '<p>' + text + '</p>\n';
};

Renderer.prototype.table = function(header, body) {
  return '<table>\n'
    + '<thead>\n'
    + header
    + '</thead>\n'
    + '<tbody>\n'
    + body
    + '</tbody>\n'
    + '</table>\n';
};

Renderer.prototype.tablerow = function(content) {
  return '<tr>\n' + content + '</tr>\n';
};

Renderer.prototype.tablecell = function(content, flags) {
  var type = flags.header ? 'th' : 'td';
  var tag = flags.align
    ? '<' + type + ' style="text-align:' + flags.align + '">'
    : '<' + type + '>';
  return tag + content + '</' + type + '>\n';
};

// span level renderer
Renderer.prototype.strong = function(text) {
  return '<strong>' + text + '</strong>';
};

Renderer.prototype.em = function(text) {
  return '<em>' + text + '</em>';
};

Renderer.prototype.codespan = function(text) {
  return '<code>' + text + '</code>';
};

Renderer.prototype.br = function() {
  return this.options.xhtml ? '<br/>' : '<br>';
};

Renderer.prototype.del = function(text) {
  return '<del>' + text + '</del>';
};

Renderer.prototype.link = function(href, title, text) {
  if (this.options.sanitize) {
    try {
      var prot = decodeURIComponent(unescape(href))
        .replace(/[^\w:]/g, '')
        .toLowerCase();
    } catch (e) {
      return '';
    }
    if (prot.indexOf('javascript:') === 0) {
      return '';
    }
  }
  var out = '<a href="' + href + '"';
  if (title) {
    out += ' title="' + title + '"';
  }
  out += '>' + text + '</a>';
  return out;
};

Renderer.prototype.image = function(href, title, text) {
  var out = '<img src="' + href + '" alt="' + text + '"';
  if (title) {
    out += ' title="' + title + '"';
  }
  out += this.options.xhtml ? '/>' : '>';
  return out;
};

/**
 * Parsing & Compiling
 */

function Parser(options) {
  this.tokens = [];
  this.token = null;
  this.options = options || marked.defaults;
  this.options.renderer = this.options.renderer || new Renderer;
  this.renderer = this.options.renderer;
  this.renderer.options = this.options;
}

/**
 * Static Parse Method
 */

Parser.parse = function(src, options, renderer) {
  var parser = new Parser(options, renderer);
  return parser.parse(src);
};

/**
 * Parse Loop
 */

Parser.prototype.parse = function(src) {
  this.inline = new InlineLexer(src.links, this.options, this.renderer);
  this.tokens = src.reverse();

  var out = '';
  while (this.next()) {
    out += this.tok();
  }

  return out;
};

/**
 * Next Token
 */

Parser.prototype.next = function() {
  return this.token = this.tokens.pop();
};

/**
 * Preview Next Token
 */

Parser.prototype.peek = function() {
  return this.tokens[this.tokens.length - 1] || 0;
};

/**
 * Parse Text Tokens
 */

Parser.prototype.parseText = function() {
  var body = this.token.text;

  while (this.peek().type === 'text') {
    body += '\n' + this.next().text;
  }

  return this.inline.output(body);
};

/**
 * Parse Current Token
 */

Parser.prototype.tok = function() {
  switch (this.token.type) {
    case 'space': {
      return '';
    }
    case 'hr': {
      return this.renderer.hr();
    }
    case 'heading': {
      return this.renderer.heading(
        this.inline.output(this.token.text),
        this.token.depth,
        this.token.text);
    }
    case 'code': {
      return this.renderer.code(this.token.text,
        this.token.lang,
        this.token.escaped);
    }
    case 'table': {
      var header = ''
        , body = ''
        , i
        , row
        , cell
        , flags
        , j;

      // header
      cell = '';
      for (i = 0; i < this.token.header.length; i++) {
        flags = { header: true, align: this.token.align[i] };
        cell += this.renderer.tablecell(
          this.inline.output(this.token.header[i]),
          { header: true, align: this.token.align[i] }
        );
      }
      header += this.renderer.tablerow(cell);

      for (i = 0; i < this.token.cells.length; i++) {
        row = this.token.cells[i];

        cell = '';
        for (j = 0; j < row.length; j++) {
          cell += this.renderer.tablecell(
            this.inline.output(row[j]),
            { header: false, align: this.token.align[j] }
          );
        }

        body += this.renderer.tablerow(cell);
      }
      return this.renderer.table(header, body);
    }
    case 'blockquote_start': {
      var body = '';

      while (this.next().type !== 'blockquote_end') {
        body += this.tok();
      }

      return this.renderer.blockquote(body);
    }
    case 'list_start': {
      var body = ''
        , ordered = this.token.ordered;

      while (this.next().type !== 'list_end') {
        body += this.tok();
      }

      return this.renderer.list(body, ordered);
    }
    case 'list_item_start': {
      var body = '';

      while (this.next().type !== 'list_item_end') {
        body += this.token.type === 'text'
          ? this.parseText()
          : this.tok();
      }

      return this.renderer.listitem(body);
    }
    case 'loose_item_start': {
      var body = '';

      while (this.next().type !== 'list_item_end') {
        body += this.tok();
      }

      return this.renderer.listitem(body);
    }
    case 'html': {
      var html = !this.token.pre && !this.options.pedantic
        ? this.inline.output(this.token.text)
        : this.token.text;
      return this.renderer.html(html);
    }
    case 'paragraph': {
      return this.renderer.paragraph(this.inline.output(this.token.text));
    }
    case 'text': {
      return this.renderer.paragraph(this.parseText());
    }
  }
};

/**
 * Helpers
 */

function escape(html, encode) {
  return html
    .replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function unescape(html) {
  return html.replace(/&([#\w]+);/g, function(_, n) {
    n = n.toLowerCase();
    if (n === 'colon') return ':';
    if (n.charAt(0) === '#') {
      return n.charAt(1) === 'x'
        ? String.fromCharCode(parseInt(n.substring(2), 16))
        : String.fromCharCode(+n.substring(1));
    }
    return '';
  });
}

function replace(regex, opt) {
  regex = regex.source;
  opt = opt || '';
  return function self(name, val) {
    if (!name) return new RegExp(regex, opt);
    val = val.source || val;
    val = val.replace(/(^|[^\[])\^/g, '$1');
    regex = regex.replace(name, val);
    return self;
  };
}

function noop() {}
noop.exec = noop;

function merge(obj) {
  var i = 1
    , target
    , key;

  for (; i < arguments.length; i++) {
    target = arguments[i];
    for (key in target) {
      if (Object.prototype.hasOwnProperty.call(target, key)) {
        obj[key] = target[key];
      }
    }
  }

  return obj;
}


/**
 * Marked
 */

function marked(src, opt, callback) {
  if (callback || typeof opt === 'function') {
    if (!callback) {
      callback = opt;
      opt = null;
    }

    opt = merge({}, marked.defaults, opt || {});

    var highlight = opt.highlight
      , tokens
      , pending
      , i = 0;

    try {
      tokens = Lexer.lex(src, opt)
    } catch (e) {
      return callback(e);
    }

    pending = tokens.length;

    var done = function() {
      var out, err;

      try {
        out = Parser.parse(tokens, opt);
      } catch (e) {
        err = e;
      }

      opt.highlight = highlight;

      return err
        ? callback(err)
        : callback(null, out);
    };

    if (!highlight || highlight.length < 3) {
      return done();
    }

    delete opt.highlight;

    if (!pending) return done();

    for (; i < tokens.length; i++) {
      (function(token) {
        if (token.type !== 'code') {
          return --pending || done();
        }
        return highlight(token.text, token.lang, function(err, code) {
          if (code == null || code === token.text) {
            return --pending || done();
          }
          token.text = code;
          token.escaped = true;
          --pending || done();
        });
      })(tokens[i]);
    }

    return;
  }
  try {
    if (opt) opt = merge({}, marked.defaults, opt);
    return Parser.parse(Lexer.lex(src, opt), opt);
  } catch (e) {
    e.message += '\nPlease report this to https://github.com/chjj/marked.';
    if ((opt || marked.defaults).silent) {
      return '<p>An error occured:</p><pre>'
        + escape(e.message + '', true)
        + '</pre>';
    }
    throw e;
  }
}

/**
 * Options
 */

marked.options =
marked.setOptions = function(opt) {
  merge(marked.defaults, opt);
  return marked;
};

marked.defaults = {
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: false,
  silent: false,
  highlight: null,
  langPrefix: 'lang-',
  smartypants: false,
  headerPrefix: '',
  renderer: new Renderer,
  xhtml: false
};

/**
 * Expose
 */

marked.Parser = Parser;
marked.parser = Parser.parse;

marked.Renderer = Renderer;

marked.Lexer = Lexer;
marked.lexer = Lexer.lex;

marked.InlineLexer = InlineLexer;
marked.inlineLexer = InlineLexer.output;

marked.parse = marked;

if (typeof exports === 'object') {
  module.exports = marked;
} else if (typeof define === 'function' && define.amd) {
  define(function() { return marked; });
} else {
  this.marked = marked;
}

}).call(function() {
  return this || (typeof window !== 'undefined' ? window : global);
}());
;


  Polymer('marked-element', {

    text: '',

    attached: function() {
      marked.setOptions({
        highlight: this.highlight.bind(this)
      });
      if (!this.text) {
        this.text = this.innerHTML;
      }
    },

    textChanged: function () {
      this.innerHTML = marked(this.text);
    },

    highlight: function(code, lang) {
      var event = this.fire('marked-js-highlight', {code: code, lang: lang});
      return event.detail.code || code;
    }

  });

;
// Copyright (C) 2006 Google Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


/**
 * @fileoverview
 * some functions for browser-side pretty printing of code contained in html.
 *
 * <p>
 * For a fairly comprehensive set of languages see the
 * <a href="http://google-code-prettify.googlecode.com/svn/trunk/README.html#langs">README</a>
 * file that came with this source.  At a minimum, the lexer should work on a
 * number of languages including C and friends, Java, Python, Bash, SQL, HTML,
 * XML, CSS, Javascript, and Makefiles.  It works passably on Ruby, PHP and Awk
 * and a subset of Perl, but, because of commenting conventions, doesn't work on
 * Smalltalk, Lisp-like, or CAML-like languages without an explicit lang class.
 * <p>
 * Usage: <ol>
 * <li> include this source file in an html page via
 *   {@code <script type="text/javascript" src="/path/to/prettify.js"><\/script>}
 * <li> define style rules.  See the example page for examples.
 * <li> mark the {@code <pre>} and {@code <code>} tags in your source with
 *    {@code class=prettyprint.}
 *    You can also use the (html deprecated) {@code <xmp>} tag, but the pretty
 *    printer needs to do more substantial DOM manipulations to support that, so
 *    some css styles may not be preserved.
 * </ol>
 * That's it.  I wanted to keep the API as simple as possible, so there's no
 * need to specify which language the code is in, but if you wish, you can add
 * another class to the {@code <pre>} or {@code <code>} element to specify the
 * language, as in {@code <pre class="prettyprint lang-java">}.  Any class that
 * starts with "lang-" followed by a file extension, specifies the file type.
 * See the "lang-*.js" files in this directory for code that implements
 * per-language file handlers.
 * <p>
 * Change log:<br>
 * cbeust, 2006/08/22
 * <blockquote>
 *   Java annotations (start with "@") are now captured as literals ("lit")
 * </blockquote>
 * @requires console
 */

// JSLint declarations
/*global console, document, navigator, setTimeout, window, define */

/** @define {boolean} */
var IN_GLOBAL_SCOPE = true;

/**
 * Split {@code prettyPrint} into multiple timeouts so as not to interfere with
 * UI events.
 * If set to {@code false}, {@code prettyPrint()} is synchronous.
 */
window['PR_SHOULD_USE_CONTINUATION'] = true;

/**
 * Pretty print a chunk of code.
 * @param {string} sourceCodeHtml The HTML to pretty print.
 * @param {string} opt_langExtension The language name to use.
 *     Typically, a filename extension like 'cpp' or 'java'.
 * @param {number|boolean} opt_numberLines True to number lines,
 *     or the 1-indexed number of the first line in sourceCodeHtml.
 * @return {string} code as html, but prettier
 */
var prettyPrintOne;
/**
 * Find all the {@code <pre>} and {@code <code>} tags in the DOM with
 * {@code class=prettyprint} and prettify them.
 *
 * @param {Function} opt_whenDone called when prettifying is done.
 * @param {HTMLElement|HTMLDocument} opt_root an element or document
 *   containing all the elements to pretty print.
 *   Defaults to {@code document.body}.
 */
var prettyPrint;


(function () {
  var win = window;
  // Keyword lists for various languages.
  // We use things that coerce to strings to make them compact when minified
  // and to defeat aggressive optimizers that fold large string constants.
  var FLOW_CONTROL_KEYWORDS = ["break,continue,do,else,for,if,return,while"];
  var C_KEYWORDS = [FLOW_CONTROL_KEYWORDS,"auto,case,char,const,default," + 
      "double,enum,extern,float,goto,inline,int,long,register,short,signed," +
      "sizeof,static,struct,switch,typedef,union,unsigned,void,volatile"];
  var COMMON_KEYWORDS = [C_KEYWORDS,"catch,class,delete,false,import," +
      "new,operator,private,protected,public,this,throw,true,try,typeof"];
  var CPP_KEYWORDS = [COMMON_KEYWORDS,"alignof,align_union,asm,axiom,bool," +
      "concept,concept_map,const_cast,constexpr,decltype,delegate," +
      "dynamic_cast,explicit,export,friend,generic,late_check," +
      "mutable,namespace,nullptr,property,reinterpret_cast,static_assert," +
      "static_cast,template,typeid,typename,using,virtual,where"];
  var JAVA_KEYWORDS = [COMMON_KEYWORDS,
      "abstract,assert,boolean,byte,extends,final,finally,implements,import," +
      "instanceof,interface,null,native,package,strictfp,super,synchronized," +
      "throws,transient"];
  var CSHARP_KEYWORDS = [JAVA_KEYWORDS,
      "as,base,by,checked,decimal,delegate,descending,dynamic,event," +
      "fixed,foreach,from,group,implicit,in,internal,into,is,let," +
      "lock,object,out,override,orderby,params,partial,readonly,ref,sbyte," +
      "sealed,stackalloc,string,select,uint,ulong,unchecked,unsafe,ushort," +
      "var,virtual,where"];
  var COFFEE_KEYWORDS = "all,and,by,catch,class,else,extends,false,finally," +
      "for,if,in,is,isnt,loop,new,no,not,null,of,off,on,or,return,super,then," +
      "throw,true,try,unless,until,when,while,yes";
  var JSCRIPT_KEYWORDS = [COMMON_KEYWORDS,
      "debugger,eval,export,function,get,null,set,undefined,var,with," +
      "Infinity,NaN"];
  var PERL_KEYWORDS = "caller,delete,die,do,dump,elsif,eval,exit,foreach,for," +
      "goto,if,import,last,local,my,next,no,our,print,package,redo,require," +
      "sub,undef,unless,until,use,wantarray,while,BEGIN,END";
  var PYTHON_KEYWORDS = [FLOW_CONTROL_KEYWORDS, "and,as,assert,class,def,del," +
      "elif,except,exec,finally,from,global,import,in,is,lambda," +
      "nonlocal,not,or,pass,print,raise,try,with,yield," +
      "False,True,None"];
  var RUBY_KEYWORDS = [FLOW_CONTROL_KEYWORDS, "alias,and,begin,case,class," +
      "def,defined,elsif,end,ensure,false,in,module,next,nil,not,or,redo," +
      "rescue,retry,self,super,then,true,undef,unless,until,when,yield," +
      "BEGIN,END"];
   var RUST_KEYWORDS = [FLOW_CONTROL_KEYWORDS, "as,assert,const,copy,drop," +
      "enum,extern,fail,false,fn,impl,let,log,loop,match,mod,move,mut,priv," +
      "pub,pure,ref,self,static,struct,true,trait,type,unsafe,use"];
  var SH_KEYWORDS = [FLOW_CONTROL_KEYWORDS, "case,done,elif,esac,eval,fi," +
      "function,in,local,set,then,until"];
  var ALL_KEYWORDS = [
      CPP_KEYWORDS, CSHARP_KEYWORDS, JSCRIPT_KEYWORDS, PERL_KEYWORDS,
      PYTHON_KEYWORDS, RUBY_KEYWORDS, SH_KEYWORDS];
  var C_TYPES = /^(DIR|FILE|vector|(de|priority_)?queue|list|stack|(const_)?iterator|(multi)?(set|map)|bitset|u?(int|float)\d*)\b/;

  // token style names.  correspond to css classes
  /**
   * token style for a string literal
   * @const
   */
  var PR_STRING = 'str';
  /**
   * token style for a keyword
   * @const
   */
  var PR_KEYWORD = 'kwd';
  /**
   * token style for a comment
   * @const
   */
  var PR_COMMENT = 'com';
  /**
   * token style for a type
   * @const
   */
  var PR_TYPE = 'typ';
  /**
   * token style for a literal value.  e.g. 1, null, true.
   * @const
   */
  var PR_LITERAL = 'lit';
  /**
   * token style for a punctuation string.
   * @const
   */
  var PR_PUNCTUATION = 'pun';
  /**
   * token style for plain text.
   * @const
   */
  var PR_PLAIN = 'pln';

  /**
   * token style for an sgml tag.
   * @const
   */
  var PR_TAG = 'tag';
  /**
   * token style for a markup declaration such as a DOCTYPE.
   * @const
   */
  var PR_DECLARATION = 'dec';
  /**
   * token style for embedded source.
   * @const
   */
  var PR_SOURCE = 'src';
  /**
   * token style for an sgml attribute name.
   * @const
   */
  var PR_ATTRIB_NAME = 'atn';
  /**
   * token style for an sgml attribute value.
   * @const
   */
  var PR_ATTRIB_VALUE = 'atv';

  /**
   * A class that indicates a section of markup that is not code, e.g. to allow
   * embedding of line numbers within code listings.
   * @const
   */
  var PR_NOCODE = 'nocode';

  
  
  /**
   * A set of tokens that can precede a regular expression literal in
   * javascript
   * http://web.archive.org/web/20070717142515/http://www.mozilla.org/js/language/js20/rationale/syntax.html
   * has the full list, but I've removed ones that might be problematic when
   * seen in languages that don't support regular expression literals.
   *
   * <p>Specifically, I've removed any keywords that can't precede a regexp
   * literal in a syntactically legal javascript program, and I've removed the
   * "in" keyword since it's not a keyword in many languages, and might be used
   * as a count of inches.
   *
   * <p>The link above does not accurately describe EcmaScript rules since
   * it fails to distinguish between (a=++/b/i) and (a++/b/i) but it works
   * very well in practice.
   *
   * @private
   * @const
   */
  var REGEXP_PRECEDER_PATTERN = '(?:^^\\.?|[+-]|[!=]=?=?|\\#|%=?|&&?=?|\\(|\\*=?|[+\\-]=|->|\\/=?|::?|<<?=?|>>?>?=?|,|;|\\?|@|\\[|~|{|\\^\\^?=?|\\|\\|?=?|break|case|continue|delete|do|else|finally|instanceof|return|throw|try|typeof)\\s*';
  
  // CAVEAT: this does not properly handle the case where a regular
  // expression immediately follows another since a regular expression may
  // have flags for case-sensitivity and the like.  Having regexp tokens
  // adjacent is not valid in any language I'm aware of, so I'm punting.
  // TODO: maybe style special characters inside a regexp as punctuation.

  /**
   * Given a group of {@link RegExp}s, returns a {@code RegExp} that globally
   * matches the union of the sets of strings matched by the input RegExp.
   * Since it matches globally, if the input strings have a start-of-input
   * anchor (/^.../), it is ignored for the purposes of unioning.
   * @param {Array.<RegExp>} regexs non multiline, non-global regexs.
   * @return {RegExp} a global regex.
   */
  function combinePrefixPatterns(regexs) {
    var capturedGroupIndex = 0;
  
    var needToFoldCase = false;
    var ignoreCase = false;
    for (var i = 0, n = regexs.length; i < n; ++i) {
      var regex = regexs[i];
      if (regex.ignoreCase) {
        ignoreCase = true;
      } else if (/[a-z]/i.test(regex.source.replace(
                     /\\u[0-9a-f]{4}|\\x[0-9a-f]{2}|\\[^ux]/gi, ''))) {
        needToFoldCase = true;
        ignoreCase = false;
        break;
      }
    }
  
    var escapeCharToCodeUnit = {
      'b': 8,
      't': 9,
      'n': 0xa,
      'v': 0xb,
      'f': 0xc,
      'r': 0xd
    };
  
    function decodeEscape(charsetPart) {
      var cc0 = charsetPart.charCodeAt(0);
      if (cc0 !== 92 /* \\ */) {
        return cc0;
      }
      var c1 = charsetPart.charAt(1);
      cc0 = escapeCharToCodeUnit[c1];
      if (cc0) {
        return cc0;
      } else if ('0' <= c1 && c1 <= '7') {
        return parseInt(charsetPart.substring(1), 8);
      } else if (c1 === 'u' || c1 === 'x') {
        return parseInt(charsetPart.substring(2), 16);
      } else {
        return charsetPart.charCodeAt(1);
      }
    }
  
    function encodeEscape(charCode) {
      if (charCode < 0x20) {
        return (charCode < 0x10 ? '\\x0' : '\\x') + charCode.toString(16);
      }
      var ch = String.fromCharCode(charCode);
      return (ch === '\\' || ch === '-' || ch === ']' || ch === '^')
          ? "\\" + ch : ch;
    }
  
    function caseFoldCharset(charSet) {
      var charsetParts = charSet.substring(1, charSet.length - 1).match(
          new RegExp(
              '\\\\u[0-9A-Fa-f]{4}'
              + '|\\\\x[0-9A-Fa-f]{2}'
              + '|\\\\[0-3][0-7]{0,2}'
              + '|\\\\[0-7]{1,2}'
              + '|\\\\[\\s\\S]'
              + '|-'
              + '|[^-\\\\]',
              'g'));
      var ranges = [];
      var inverse = charsetParts[0] === '^';
  
      var out = ['['];
      if (inverse) { out.push('^'); }
  
      for (var i = inverse ? 1 : 0, n = charsetParts.length; i < n; ++i) {
        var p = charsetParts[i];
        if (/\\[bdsw]/i.test(p)) {  // Don't muck with named groups.
          out.push(p);
        } else {
          var start = decodeEscape(p);
          var end;
          if (i + 2 < n && '-' === charsetParts[i + 1]) {
            end = decodeEscape(charsetParts[i + 2]);
            i += 2;
          } else {
            end = start;
          }
          ranges.push([start, end]);
          // If the range might intersect letters, then expand it.
          // This case handling is too simplistic.
          // It does not deal with non-latin case folding.
          // It works for latin source code identifiers though.
          if (!(end < 65 || start > 122)) {
            if (!(end < 65 || start > 90)) {
              ranges.push([Math.max(65, start) | 32, Math.min(end, 90) | 32]);
            }
            if (!(end < 97 || start > 122)) {
              ranges.push([Math.max(97, start) & ~32, Math.min(end, 122) & ~32]);
            }
          }
        }
      }
  
      // [[1, 10], [3, 4], [8, 12], [14, 14], [16, 16], [17, 17]]
      // -> [[1, 12], [14, 14], [16, 17]]
      ranges.sort(function (a, b) { return (a[0] - b[0]) || (b[1]  - a[1]); });
      var consolidatedRanges = [];
      var lastRange = [];
      for (var i = 0; i < ranges.length; ++i) {
        var range = ranges[i];
        if (range[0] <= lastRange[1] + 1) {
          lastRange[1] = Math.max(lastRange[1], range[1]);
        } else {
          consolidatedRanges.push(lastRange = range);
        }
      }
  
      for (var i = 0; i < consolidatedRanges.length; ++i) {
        var range = consolidatedRanges[i];
        out.push(encodeEscape(range[0]));
        if (range[1] > range[0]) {
          if (range[1] + 1 > range[0]) { out.push('-'); }
          out.push(encodeEscape(range[1]));
        }
      }
      out.push(']');
      return out.join('');
    }
  
    function allowAnywhereFoldCaseAndRenumberGroups(regex) {
      // Split into character sets, escape sequences, punctuation strings
      // like ('(', '(?:', ')', '^'), and runs of characters that do not
      // include any of the above.
      var parts = regex.source.match(
          new RegExp(
              '(?:'
              + '\\[(?:[^\\x5C\\x5D]|\\\\[\\s\\S])*\\]'  // a character set
              + '|\\\\u[A-Fa-f0-9]{4}'  // a unicode escape
              + '|\\\\x[A-Fa-f0-9]{2}'  // a hex escape
              + '|\\\\[0-9]+'  // a back-reference or octal escape
              + '|\\\\[^ux0-9]'  // other escape sequence
              + '|\\(\\?[:!=]'  // start of a non-capturing group
              + '|[\\(\\)\\^]'  // start/end of a group, or line start
              + '|[^\\x5B\\x5C\\(\\)\\^]+'  // run of other characters
              + ')',
              'g'));
      var n = parts.length;
  
      // Maps captured group numbers to the number they will occupy in
      // the output or to -1 if that has not been determined, or to
      // undefined if they need not be capturing in the output.
      var capturedGroups = [];
  
      // Walk over and identify back references to build the capturedGroups
      // mapping.
      for (var i = 0, groupIndex = 0; i < n; ++i) {
        var p = parts[i];
        if (p === '(') {
          // groups are 1-indexed, so max group index is count of '('
          ++groupIndex;
        } else if ('\\' === p.charAt(0)) {
          var decimalValue = +p.substring(1);
          if (decimalValue) {
            if (decimalValue <= groupIndex) {
              capturedGroups[decimalValue] = -1;
            } else {
              // Replace with an unambiguous escape sequence so that
              // an octal escape sequence does not turn into a backreference
              // to a capturing group from an earlier regex.
              parts[i] = encodeEscape(decimalValue);
            }
          }
        }
      }
  
      // Renumber groups and reduce capturing groups to non-capturing groups
      // where possible.
      for (var i = 1; i < capturedGroups.length; ++i) {
        if (-1 === capturedGroups[i]) {
          capturedGroups[i] = ++capturedGroupIndex;
        }
      }
      for (var i = 0, groupIndex = 0; i < n; ++i) {
        var p = parts[i];
        if (p === '(') {
          ++groupIndex;
          if (!capturedGroups[groupIndex]) {
            parts[i] = '(?:';
          }
        } else if ('\\' === p.charAt(0)) {
          var decimalValue = +p.substring(1);
          if (decimalValue && decimalValue <= groupIndex) {
            parts[i] = '\\' + capturedGroups[decimalValue];
          }
        }
      }
  
      // Remove any prefix anchors so that the output will match anywhere.
      // ^^ really does mean an anchored match though.
      for (var i = 0; i < n; ++i) {
        if ('^' === parts[i] && '^' !== parts[i + 1]) { parts[i] = ''; }
      }
  
      // Expand letters to groups to handle mixing of case-sensitive and
      // case-insensitive patterns if necessary.
      if (regex.ignoreCase && needToFoldCase) {
        for (var i = 0; i < n; ++i) {
          var p = parts[i];
          var ch0 = p.charAt(0);
          if (p.length >= 2 && ch0 === '[') {
            parts[i] = caseFoldCharset(p);
          } else if (ch0 !== '\\') {
            // TODO: handle letters in numeric escapes.
            parts[i] = p.replace(
                /[a-zA-Z]/g,
                function (ch) {
                  var cc = ch.charCodeAt(0);
                  return '[' + String.fromCharCode(cc & ~32, cc | 32) + ']';
                });
          }
        }
      }
  
      return parts.join('');
    }
  
    var rewritten = [];
    for (var i = 0, n = regexs.length; i < n; ++i) {
      var regex = regexs[i];
      if (regex.global || regex.multiline) { throw new Error('' + regex); }
      rewritten.push(
          '(?:' + allowAnywhereFoldCaseAndRenumberGroups(regex) + ')');
    }
  
    return new RegExp(rewritten.join('|'), ignoreCase ? 'gi' : 'g');
  }

  /**
   * Split markup into a string of source code and an array mapping ranges in
   * that string to the text nodes in which they appear.
   *
   * <p>
   * The HTML DOM structure:</p>
   * <pre>
   * (Element   "p"
   *   (Element "b"
   *     (Text  "print "))       ; #1
   *   (Text    "'Hello '")      ; #2
   *   (Element "br")            ; #3
   *   (Text    "  + 'World';")) ; #4
   * </pre>
   * <p>
   * corresponds to the HTML
   * {@code <p><b>print </b>'Hello '<br>  + 'World';</p>}.</p>
   *
   * <p>
   * It will produce the output:</p>
   * <pre>
   * {
   *   sourceCode: "print 'Hello '\n  + 'World';",
   *   //                     1          2
   *   //           012345678901234 5678901234567
   *   spans: [0, #1, 6, #2, 14, #3, 15, #4]
   * }
   * </pre>
   * <p>
   * where #1 is a reference to the {@code "print "} text node above, and so
   * on for the other text nodes.
   * </p>
   *
   * <p>
   * The {@code} spans array is an array of pairs.  Even elements are the start
   * indices of substrings, and odd elements are the text nodes (or BR elements)
   * that contain the text for those substrings.
   * Substrings continue until the next index or the end of the source.
   * </p>
   *
   * @param {Node} node an HTML DOM subtree containing source-code.
   * @param {boolean} isPreformatted true if white-space in text nodes should
   *    be considered significant.
   * @return {Object} source code and the text nodes in which they occur.
   */
  function extractSourceSpans(node, isPreformatted) {
    var nocode = /(?:^|\s)nocode(?:\s|$)/;
  
    var chunks = [];
    var length = 0;
    var spans = [];
    var k = 0;
  
    function walk(node) {
      var type = node.nodeType;
      if (type == 1) {  // Element
        if (nocode.test(node.className)) { return; }
        for (var child = node.firstChild; child; child = child.nextSibling) {
          walk(child);
        }
        var nodeName = node.nodeName.toLowerCase();
        if ('br' === nodeName || 'li' === nodeName) {
          chunks[k] = '\n';
          spans[k << 1] = length++;
          spans[(k++ << 1) | 1] = node;
        }
      } else if (type == 3 || type == 4) {  // Text
        var text = node.nodeValue;
        if (text.length) {
          if (!isPreformatted) {
            text = text.replace(/[ \t\r\n]+/g, ' ');
          } else {
            text = text.replace(/\r\n?/g, '\n');  // Normalize newlines.
          }
          // TODO: handle tabs here?
          chunks[k] = text;
          spans[k << 1] = length;
          length += text.length;
          spans[(k++ << 1) | 1] = node;
        }
      }
    }
  
    walk(node);
  
    return {
      sourceCode: chunks.join('').replace(/\n$/, ''),
      spans: spans
    };
  }

  /**
   * Apply the given language handler to sourceCode and add the resulting
   * decorations to out.
   * @param {number} basePos the index of sourceCode within the chunk of source
   *    whose decorations are already present on out.
   */
  function appendDecorations(basePos, sourceCode, langHandler, out) {
    if (!sourceCode) { return; }
    var job = {
      sourceCode: sourceCode,
      basePos: basePos
    };
    langHandler(job);
    out.push.apply(out, job.decorations);
  }

  var notWs = /\S/;

  /**
   * Given an element, if it contains only one child element and any text nodes
   * it contains contain only space characters, return the sole child element.
   * Otherwise returns undefined.
   * <p>
   * This is meant to return the CODE element in {@code <pre><code ...>} when
   * there is a single child element that contains all the non-space textual
   * content, but not to return anything where there are multiple child elements
   * as in {@code <pre><code>...</code><code>...</code></pre>} or when there
   * is textual content.
   */
  function childContentWrapper(element) {
    var wrapper = undefined;
    for (var c = element.firstChild; c; c = c.nextSibling) {
      var type = c.nodeType;
      wrapper = (type === 1)  // Element Node
          ? (wrapper ? element : c)
          : (type === 3)  // Text Node
          ? (notWs.test(c.nodeValue) ? element : wrapper)
          : wrapper;
    }
    return wrapper === element ? undefined : wrapper;
  }

  /** Given triples of [style, pattern, context] returns a lexing function,
    * The lexing function interprets the patterns to find token boundaries and
    * returns a decoration list of the form
    * [index_0, style_0, index_1, style_1, ..., index_n, style_n]
    * where index_n is an index into the sourceCode, and style_n is a style
    * constant like PR_PLAIN.  index_n-1 <= index_n, and style_n-1 applies to
    * all characters in sourceCode[index_n-1:index_n].
    *
    * The stylePatterns is a list whose elements have the form
    * [style : string, pattern : RegExp, DEPRECATED, shortcut : string].
    *
    * Style is a style constant like PR_PLAIN, or can be a string of the
    * form 'lang-FOO', where FOO is a language extension describing the
    * language of the portion of the token in $1 after pattern executes.
    * E.g., if style is 'lang-lisp', and group 1 contains the text
    * '(hello (world))', then that portion of the token will be passed to the
    * registered lisp handler for formatting.
    * The text before and after group 1 will be restyled using this decorator
    * so decorators should take care that this doesn't result in infinite
    * recursion.  For example, the HTML lexer rule for SCRIPT elements looks
    * something like ['lang-js', /<[s]cript>(.+?)<\/script>/].  This may match
    * '<script>foo()<\/script>', which would cause the current decorator to
    * be called with '<script>' which would not match the same rule since
    * group 1 must not be empty, so it would be instead styled as PR_TAG by
    * the generic tag rule.  The handler registered for the 'js' extension would
    * then be called with 'foo()', and finally, the current decorator would
    * be called with '<\/script>' which would not match the original rule and
    * so the generic tag rule would identify it as a tag.
    *
    * Pattern must only match prefixes, and if it matches a prefix, then that
    * match is considered a token with the same style.
    *
    * Context is applied to the last non-whitespace, non-comment token
    * recognized.
    *
    * Shortcut is an optional string of characters, any of which, if the first
    * character, gurantee that this pattern and only this pattern matches.
    *
    * @param {Array} shortcutStylePatterns patterns that always start with
    *   a known character.  Must have a shortcut string.
    * @param {Array} fallthroughStylePatterns patterns that will be tried in
    *   order if the shortcut ones fail.  May have shortcuts.
    *
    * @return {function (Object)} a
    *   function that takes source code and returns a list of decorations.
    */
  function createSimpleLexer(shortcutStylePatterns, fallthroughStylePatterns) {
    var shortcuts = {};
    var tokenizer;
    (function () {
      var allPatterns = shortcutStylePatterns.concat(fallthroughStylePatterns);
      var allRegexs = [];
      var regexKeys = {};
      for (var i = 0, n = allPatterns.length; i < n; ++i) {
        var patternParts = allPatterns[i];
        var shortcutChars = patternParts[3];
        if (shortcutChars) {
          for (var c = shortcutChars.length; --c >= 0;) {
            shortcuts[shortcutChars.charAt(c)] = patternParts;
          }
        }
        var regex = patternParts[1];
        var k = '' + regex;
        if (!regexKeys.hasOwnProperty(k)) {
          allRegexs.push(regex);
          regexKeys[k] = null;
        }
      }
      allRegexs.push(/[\0-\uffff]/);
      tokenizer = combinePrefixPatterns(allRegexs);
    })();

    var nPatterns = fallthroughStylePatterns.length;

    /**
     * Lexes job.sourceCode and produces an output array job.decorations of
     * style classes preceded by the position at which they start in
     * job.sourceCode in order.
     *
     * @param {Object} job an object like <pre>{
     *    sourceCode: {string} sourceText plain text,
     *    basePos: {int} position of job.sourceCode in the larger chunk of
     *        sourceCode.
     * }</pre>
     */
    var decorate = function (job) {
      var sourceCode = job.sourceCode, basePos = job.basePos;
      /** Even entries are positions in source in ascending order.  Odd enties
        * are style markers (e.g., PR_COMMENT) that run from that position until
        * the end.
        * @type {Array.<number|string>}
        */
      var decorations = [basePos, PR_PLAIN];
      var pos = 0;  // index into sourceCode
      var tokens = sourceCode.match(tokenizer) || [];
      var styleCache = {};

      for (var ti = 0, nTokens = tokens.length; ti < nTokens; ++ti) {
        var token = tokens[ti];
        var style = styleCache[token];
        var match = void 0;

        var isEmbedded;
        if (typeof style === 'string') {
          isEmbedded = false;
        } else {
          var patternParts = shortcuts[token.charAt(0)];
          if (patternParts) {
            match = token.match(patternParts[1]);
            style = patternParts[0];
          } else {
            for (var i = 0; i < nPatterns; ++i) {
              patternParts = fallthroughStylePatterns[i];
              match = token.match(patternParts[1]);
              if (match) {
                style = patternParts[0];
                break;
              }
            }

            if (!match) {  // make sure that we make progress
              style = PR_PLAIN;
            }
          }

          isEmbedded = style.length >= 5 && 'lang-' === style.substring(0, 5);
          if (isEmbedded && !(match && typeof match[1] === 'string')) {
            isEmbedded = false;
            style = PR_SOURCE;
          }

          if (!isEmbedded) { styleCache[token] = style; }
        }

        var tokenStart = pos;
        pos += token.length;

        if (!isEmbedded) {
          decorations.push(basePos + tokenStart, style);
        } else {  // Treat group 1 as an embedded block of source code.
          var embeddedSource = match[1];
          var embeddedSourceStart = token.indexOf(embeddedSource);
          var embeddedSourceEnd = embeddedSourceStart + embeddedSource.length;
          if (match[2]) {
            // If embeddedSource can be blank, then it would match at the
            // beginning which would cause us to infinitely recurse on the
            // entire token, so we catch the right context in match[2].
            embeddedSourceEnd = token.length - match[2].length;
            embeddedSourceStart = embeddedSourceEnd - embeddedSource.length;
          }
          var lang = style.substring(5);
          // Decorate the left of the embedded source
          appendDecorations(
              basePos + tokenStart,
              token.substring(0, embeddedSourceStart),
              decorate, decorations);
          // Decorate the embedded source
          appendDecorations(
              basePos + tokenStart + embeddedSourceStart,
              embeddedSource,
              langHandlerForExtension(lang, embeddedSource),
              decorations);
          // Decorate the right of the embedded section
          appendDecorations(
              basePos + tokenStart + embeddedSourceEnd,
              token.substring(embeddedSourceEnd),
              decorate, decorations);
        }
      }
      job.decorations = decorations;
    };
    return decorate;
  }

  /** returns a function that produces a list of decorations from source text.
    *
    * This code treats ", ', and ` as string delimiters, and \ as a string
    * escape.  It does not recognize perl's qq() style strings.
    * It has no special handling for double delimiter escapes as in basic, or
    * the tripled delimiters used in python, but should work on those regardless
    * although in those cases a single string literal may be broken up into
    * multiple adjacent string literals.
    *
    * It recognizes C, C++, and shell style comments.
    *
    * @param {Object} options a set of optional parameters.
    * @return {function (Object)} a function that examines the source code
    *     in the input job and builds the decoration list.
    */
  function sourceDecorator(options) {
    var shortcutStylePatterns = [], fallthroughStylePatterns = [];
    if (options['tripleQuotedStrings']) {
      // '''multi-line-string''', 'single-line-string', and double-quoted
      shortcutStylePatterns.push(
          [PR_STRING,  /^(?:\'\'\'(?:[^\'\\]|\\[\s\S]|\'{1,2}(?=[^\']))*(?:\'\'\'|$)|\"\"\"(?:[^\"\\]|\\[\s\S]|\"{1,2}(?=[^\"]))*(?:\"\"\"|$)|\'(?:[^\\\']|\\[\s\S])*(?:\'|$)|\"(?:[^\\\"]|\\[\s\S])*(?:\"|$))/,
           null, '\'"']);
    } else if (options['multiLineStrings']) {
      // 'multi-line-string', "multi-line-string"
      shortcutStylePatterns.push(
          [PR_STRING,  /^(?:\'(?:[^\\\']|\\[\s\S])*(?:\'|$)|\"(?:[^\\\"]|\\[\s\S])*(?:\"|$)|\`(?:[^\\\`]|\\[\s\S])*(?:\`|$))/,
           null, '\'"`']);
    } else {
      // 'single-line-string', "single-line-string"
      shortcutStylePatterns.push(
          [PR_STRING,
           /^(?:\'(?:[^\\\'\r\n]|\\.)*(?:\'|$)|\"(?:[^\\\"\r\n]|\\.)*(?:\"|$))/,
           null, '"\'']);
    }
    if (options['verbatimStrings']) {
      // verbatim-string-literal production from the C# grammar.  See issue 93.
      fallthroughStylePatterns.push(
          [PR_STRING, /^@\"(?:[^\"]|\"\")*(?:\"|$)/, null]);
    }
    var hc = options['hashComments'];
    if (hc) {
      if (options['cStyleComments']) {
        if (hc > 1) {  // multiline hash comments
          shortcutStylePatterns.push(
              [PR_COMMENT, /^#(?:##(?:[^#]|#(?!##))*(?:###|$)|.*)/, null, '#']);
        } else {
          // Stop C preprocessor declarations at an unclosed open comment
          shortcutStylePatterns.push(
              [PR_COMMENT, /^#(?:(?:define|e(?:l|nd)if|else|error|ifn?def|include|line|pragma|undef|warning)\b|[^\r\n]*)/,
               null, '#']);
        }
        // #include <stdio.h>
        fallthroughStylePatterns.push(
            [PR_STRING,
             /^<(?:(?:(?:\.\.\/)*|\/?)(?:[\w-]+(?:\/[\w-]+)+)?[\w-]+\.h(?:h|pp|\+\+)?|[a-z]\w*)>/,
             null]);
      } else {
        shortcutStylePatterns.push([PR_COMMENT, /^#[^\r\n]*/, null, '#']);
      }
    }
    if (options['cStyleComments']) {
      fallthroughStylePatterns.push([PR_COMMENT, /^\/\/[^\r\n]*/, null]);
      fallthroughStylePatterns.push(
          [PR_COMMENT, /^\/\*[\s\S]*?(?:\*\/|$)/, null]);
    }
    var regexLiterals = options['regexLiterals'];
    if (regexLiterals) {
      /**
       * @const
       */
      var regexExcls = regexLiterals > 1
        ? ''  // Multiline regex literals
        : '\n\r';
      /**
       * @const
       */
      var regexAny = regexExcls ? '.' : '[\\S\\s]';
      /**
       * @const
       */
      var REGEX_LITERAL = (
          // A regular expression literal starts with a slash that is
          // not followed by * or / so that it is not confused with
          // comments.
          '/(?=[^/*' + regexExcls + '])'
          // and then contains any number of raw characters,
          + '(?:[^/\\x5B\\x5C' + regexExcls + ']'
          // escape sequences (\x5C),
          +    '|\\x5C' + regexAny
          // or non-nesting character sets (\x5B\x5D);
          +    '|\\x5B(?:[^\\x5C\\x5D' + regexExcls + ']'
          +             '|\\x5C' + regexAny + ')*(?:\\x5D|$))+'
          // finally closed by a /.
          + '/');
      fallthroughStylePatterns.push(
          ['lang-regex',
           RegExp('^' + REGEXP_PRECEDER_PATTERN + '(' + REGEX_LITERAL + ')')
           ]);
    }

    var types = options['types'];
    if (types) {
      fallthroughStylePatterns.push([PR_TYPE, types]);
    }

    var keywords = ("" + options['keywords']).replace(/^ | $/g, '');
    if (keywords.length) {
      fallthroughStylePatterns.push(
          [PR_KEYWORD,
           new RegExp('^(?:' + keywords.replace(/[\s,]+/g, '|') + ')\\b'),
           null]);
    }

    shortcutStylePatterns.push([PR_PLAIN,       /^\s+/, null, ' \r\n\t\xA0']);

    var punctuation =
      // The Bash man page says

      // A word is a sequence of characters considered as a single
      // unit by GRUB. Words are separated by metacharacters,
      // which are the following plus space, tab, and newline: { }
      // | & $ ; < >
      // ...
      
      // A word beginning with # causes that word and all remaining
      // characters on that line to be ignored.

      // which means that only a '#' after /(?:^|[{}|&$;<>\s])/ starts a
      // comment but empirically
      // $ echo {#}
      // {#}
      // $ echo \$#
      // $#
      // $ echo }#
      // }#

      // so /(?:^|[|&;<>\s])/ is more appropriate.

      // http://gcc.gnu.org/onlinedocs/gcc-2.95.3/cpp_1.html#SEC3
      // suggests that this definition is compatible with a
      // default mode that tries to use a single token definition
      // to recognize both bash/python style comments and C
      // preprocessor directives.

      // This definition of punctuation does not include # in the list of
      // follow-on exclusions, so # will not be broken before if preceeded
      // by a punctuation character.  We could try to exclude # after
      // [|&;<>] but that doesn't seem to cause many major problems.
      // If that does turn out to be a problem, we should change the below
      // when hc is truthy to include # in the run of punctuation characters
      // only when not followint [|&;<>].
      '^.[^\\s\\w.$@\'"`/\\\\]*';
    if (options['regexLiterals']) {
      punctuation += '(?!\s*\/)';
    }

    fallthroughStylePatterns.push(
        // TODO(mikesamuel): recognize non-latin letters and numerals in idents
        [PR_LITERAL,     /^@[a-z_$][a-z_$@0-9]*/i, null],
        [PR_TYPE,        /^(?:[@_]?[A-Z]+[a-z][A-Za-z_$@0-9]*|\w+_t\b)/, null],
        [PR_PLAIN,       /^[a-z_$][a-z_$@0-9]*/i, null],
        [PR_LITERAL,
         new RegExp(
             '^(?:'
             // A hex number
             + '0x[a-f0-9]+'
             // or an octal or decimal number,
             + '|(?:\\d(?:_\\d+)*\\d*(?:\\.\\d*)?|\\.\\d\\+)'
             // possibly in scientific notation
             + '(?:e[+\\-]?\\d+)?'
             + ')'
             // with an optional modifier like UL for unsigned long
             + '[a-z]*', 'i'),
         null, '0123456789'],
        // Don't treat escaped quotes in bash as starting strings.
        // See issue 144.
        [PR_PLAIN,       /^\\[\s\S]?/, null],
        [PR_PUNCTUATION, new RegExp(punctuation), null]);

    return createSimpleLexer(shortcutStylePatterns, fallthroughStylePatterns);
  }

  var decorateSource = sourceDecorator({
        'keywords': ALL_KEYWORDS,
        'hashComments': true,
        'cStyleComments': true,
        'multiLineStrings': true,
        'regexLiterals': true
      });

  /**
   * Given a DOM subtree, wraps it in a list, and puts each line into its own
   * list item.
   *
   * @param {Node} node modified in place.  Its content is pulled into an
   *     HTMLOListElement, and each line is moved into a separate list item.
   *     This requires cloning elements, so the input might not have unique
   *     IDs after numbering.
   * @param {boolean} isPreformatted true iff white-space in text nodes should
   *     be treated as significant.
   */
  function numberLines(node, opt_startLineNum, isPreformatted) {
    var nocode = /(?:^|\s)nocode(?:\s|$)/;
    var lineBreak = /\r\n?|\n/;
  
    var document = node.ownerDocument;
  
    var li = document.createElement('li');
    while (node.firstChild) {
      li.appendChild(node.firstChild);
    }
    // An array of lines.  We split below, so this is initialized to one
    // un-split line.
    var listItems = [li];
  
    function walk(node) {
      var type = node.nodeType;
      if (type == 1 && !nocode.test(node.className)) {  // Element
        if ('br' === node.nodeName) {
          breakAfter(node);
          // Discard the <BR> since it is now flush against a </LI>.
          if (node.parentNode) {
            node.parentNode.removeChild(node);
          }
        } else {
          for (var child = node.firstChild; child; child = child.nextSibling) {
            walk(child);
          }
        }
      } else if ((type == 3 || type == 4) && isPreformatted) {  // Text
        var text = node.nodeValue;
        var match = text.match(lineBreak);
        if (match) {
          var firstLine = text.substring(0, match.index);
          node.nodeValue = firstLine;
          var tail = text.substring(match.index + match[0].length);
          if (tail) {
            var parent = node.parentNode;
            parent.insertBefore(
              document.createTextNode(tail), node.nextSibling);
          }
          breakAfter(node);
          if (!firstLine) {
            // Don't leave blank text nodes in the DOM.
            node.parentNode.removeChild(node);
          }
        }
      }
    }
  
    // Split a line after the given node.
    function breakAfter(lineEndNode) {
      // If there's nothing to the right, then we can skip ending the line
      // here, and move root-wards since splitting just before an end-tag
      // would require us to create a bunch of empty copies.
      while (!lineEndNode.nextSibling) {
        lineEndNode = lineEndNode.parentNode;
        if (!lineEndNode) { return; }
      }
  
      function breakLeftOf(limit, copy) {
        // Clone shallowly if this node needs to be on both sides of the break.
        var rightSide = copy ? limit.cloneNode(false) : limit;
        var parent = limit.parentNode;
        if (parent) {
          // We clone the parent chain.
          // This helps us resurrect important styling elements that cross lines.
          // E.g. in <i>Foo<br>Bar</i>
          // should be rewritten to <li><i>Foo</i></li><li><i>Bar</i></li>.
          var parentClone = breakLeftOf(parent, 1);
          // Move the clone and everything to the right of the original
          // onto the cloned parent.
          var next = limit.nextSibling;
          parentClone.appendChild(rightSide);
          for (var sibling = next; sibling; sibling = next) {
            next = sibling.nextSibling;
            parentClone.appendChild(sibling);
          }
        }
        return rightSide;
      }
  
      var copiedListItem = breakLeftOf(lineEndNode.nextSibling, 0);
  
      // Walk the parent chain until we reach an unattached LI.
      for (var parent;
           // Check nodeType since IE invents document fragments.
           (parent = copiedListItem.parentNode) && parent.nodeType === 1;) {
        copiedListItem = parent;
      }
      // Put it on the list of lines for later processing.
      listItems.push(copiedListItem);
    }
  
    // Split lines while there are lines left to split.
    for (var i = 0;  // Number of lines that have been split so far.
         i < listItems.length;  // length updated by breakAfter calls.
         ++i) {
      walk(listItems[i]);
    }
  
    // Make sure numeric indices show correctly.
    if (opt_startLineNum === (opt_startLineNum|0)) {
      listItems[0].setAttribute('value', opt_startLineNum);
    }
  
    var ol = document.createElement('ol');
    ol.className = 'linenums';
    var offset = Math.max(0, ((opt_startLineNum - 1 /* zero index */)) | 0) || 0;
    for (var i = 0, n = listItems.length; i < n; ++i) {
      li = listItems[i];
      // Stick a class on the LIs so that stylesheets can
      // color odd/even rows, or any other row pattern that
      // is co-prime with 10.
      li.className = 'L' + ((i + offset) % 10);
      if (!li.firstChild) {
        li.appendChild(document.createTextNode('\xA0'));
      }
      ol.appendChild(li);
    }
  
    node.appendChild(ol);
  }
  /**
   * Breaks {@code job.sourceCode} around style boundaries in
   * {@code job.decorations} and modifies {@code job.sourceNode} in place.
   * @param {Object} job like <pre>{
   *    sourceCode: {string} source as plain text,
   *    sourceNode: {HTMLElement} the element containing the source,
   *    spans: {Array.<number|Node>} alternating span start indices into source
   *       and the text node or element (e.g. {@code <BR>}) corresponding to that
   *       span.
   *    decorations: {Array.<number|string} an array of style classes preceded
   *       by the position at which they start in job.sourceCode in order
   * }</pre>
   * @private
   */
  function recombineTagsAndDecorations(job) {
    var isIE8OrEarlier = /\bMSIE\s(\d+)/.exec(navigator.userAgent);
    isIE8OrEarlier = isIE8OrEarlier && +isIE8OrEarlier[1] <= 8;
    var newlineRe = /\n/g;
  
    var source = job.sourceCode;
    var sourceLength = source.length;
    // Index into source after the last code-unit recombined.
    var sourceIndex = 0;
  
    var spans = job.spans;
    var nSpans = spans.length;
    // Index into spans after the last span which ends at or before sourceIndex.
    var spanIndex = 0;
  
    var decorations = job.decorations;
    var nDecorations = decorations.length;
    // Index into decorations after the last decoration which ends at or before
    // sourceIndex.
    var decorationIndex = 0;
  
    // Remove all zero-length decorations.
    decorations[nDecorations] = sourceLength;
    var decPos, i;
    for (i = decPos = 0; i < nDecorations;) {
      if (decorations[i] !== decorations[i + 2]) {
        decorations[decPos++] = decorations[i++];
        decorations[decPos++] = decorations[i++];
      } else {
        i += 2;
      }
    }
    nDecorations = decPos;
  
    // Simplify decorations.
    for (i = decPos = 0; i < nDecorations;) {
      var startPos = decorations[i];
      // Conflate all adjacent decorations that use the same style.
      var startDec = decorations[i + 1];
      var end = i + 2;
      while (end + 2 <= nDecorations && decorations[end + 1] === startDec) {
        end += 2;
      }
      decorations[decPos++] = startPos;
      decorations[decPos++] = startDec;
      i = end;
    }
  
    nDecorations = decorations.length = decPos;
  
    var sourceNode = job.sourceNode;
    var oldDisplay;
    if (sourceNode) {
      oldDisplay = sourceNode.style.display;
      sourceNode.style.display = 'none';
    }
    try {
      var decoration = null;
      while (spanIndex < nSpans) {
        var spanStart = spans[spanIndex];
        var spanEnd = spans[spanIndex + 2] || sourceLength;
  
        var decEnd = decorations[decorationIndex + 2] || sourceLength;
  
        var end = Math.min(spanEnd, decEnd);
  
        var textNode = spans[spanIndex + 1];
        var styledText;
        if (textNode.nodeType !== 1  // Don't muck with <BR>s or <LI>s
            // Don't introduce spans around empty text nodes.
            && (styledText = source.substring(sourceIndex, end))) {
          // This may seem bizarre, and it is.  Emitting LF on IE causes the
          // code to display with spaces instead of line breaks.
          // Emitting Windows standard issue linebreaks (CRLF) causes a blank
          // space to appear at the beginning of every line but the first.
          // Emitting an old Mac OS 9 line separator makes everything spiffy.
          if (isIE8OrEarlier) {
            styledText = styledText.replace(newlineRe, '\r');
          }
          textNode.nodeValue = styledText;
          var document = textNode.ownerDocument;
          var span = document.createElement('span');
          span.className = decorations[decorationIndex + 1];
          var parentNode = textNode.parentNode;
          parentNode.replaceChild(span, textNode);
          span.appendChild(textNode);
          if (sourceIndex < spanEnd) {  // Split off a text node.
            spans[spanIndex + 1] = textNode
                // TODO: Possibly optimize by using '' if there's no flicker.
                = document.createTextNode(source.substring(end, spanEnd));
            parentNode.insertBefore(textNode, span.nextSibling);
          }
        }
  
        sourceIndex = end;
  
        if (sourceIndex >= spanEnd) {
          spanIndex += 2;
        }
        if (sourceIndex >= decEnd) {
          decorationIndex += 2;
        }
      }
    } finally {
      if (sourceNode) {
        sourceNode.style.display = oldDisplay;
      }
    }
  }

  /** Maps language-specific file extensions to handlers. */
  var langHandlerRegistry = {};
  /** Register a language handler for the given file extensions.
    * @param {function (Object)} handler a function from source code to a list
    *      of decorations.  Takes a single argument job which describes the
    *      state of the computation.   The single parameter has the form
    *      {@code {
    *        sourceCode: {string} as plain text.
    *        decorations: {Array.<number|string>} an array of style classes
    *                     preceded by the position at which they start in
    *                     job.sourceCode in order.
    *                     The language handler should assigned this field.
    *        basePos: {int} the position of source in the larger source chunk.
    *                 All positions in the output decorations array are relative
    *                 to the larger source chunk.
    *      } }
    * @param {Array.<string>} fileExtensions
    */
  function registerLangHandler(handler, fileExtensions) {
    for (var i = fileExtensions.length; --i >= 0;) {
      var ext = fileExtensions[i];
      if (!langHandlerRegistry.hasOwnProperty(ext)) {
        langHandlerRegistry[ext] = handler;
      } else if (win['console']) {
        console['warn']('cannot override language handler %s', ext);
      }
    }
  }
  function langHandlerForExtension(extension, source) {
    if (!(extension && langHandlerRegistry.hasOwnProperty(extension))) {
      // Treat it as markup if the first non whitespace character is a < and
      // the last non-whitespace character is a >.
      extension = /^\s*</.test(source)
          ? 'default-markup'
          : 'default-code';
    }
    return langHandlerRegistry[extension];
  }
  registerLangHandler(decorateSource, ['default-code']);
  registerLangHandler(
      createSimpleLexer(
          [],
          [
           [PR_PLAIN,       /^[^<?]+/],
           [PR_DECLARATION, /^<!\w[^>]*(?:>|$)/],
           [PR_COMMENT,     /^<\!--[\s\S]*?(?:-\->|$)/],
           // Unescaped content in an unknown language
           ['lang-',        /^<\?([\s\S]+?)(?:\?>|$)/],
           ['lang-',        /^<%([\s\S]+?)(?:%>|$)/],
           [PR_PUNCTUATION, /^(?:<[%?]|[%?]>)/],
           ['lang-',        /^<xmp\b[^>]*>([\s\S]+?)<\/xmp\b[^>]*>/i],
           // Unescaped content in javascript.  (Or possibly vbscript).
           ['lang-js',      /^<script\b[^>]*>([\s\S]*?)(<\/script\b[^>]*>)/i],
           // Contains unescaped stylesheet content
           ['lang-css',     /^<style\b[^>]*>([\s\S]*?)(<\/style\b[^>]*>)/i],
           ['lang-in.tag',  /^(<\/?[a-z][^<>]*>)/i]
          ]),
      ['default-markup', 'htm', 'html', 'mxml', 'xhtml', 'xml', 'xsl']);
  registerLangHandler(
      createSimpleLexer(
          [
           [PR_PLAIN,        /^[\s]+/, null, ' \t\r\n'],
           [PR_ATTRIB_VALUE, /^(?:\"[^\"]*\"?|\'[^\']*\'?)/, null, '\"\'']
           ],
          [
           [PR_TAG,          /^^<\/?[a-z](?:[\w.:-]*\w)?|\/?>$/i],
           [PR_ATTRIB_NAME,  /^(?!style[\s=]|on)[a-z](?:[\w:-]*\w)?/i],
           ['lang-uq.val',   /^=\s*([^>\'\"\s]*(?:[^>\'\"\s\/]|\/(?=\s)))/],
           [PR_PUNCTUATION,  /^[=<>\/]+/],
           ['lang-js',       /^on\w+\s*=\s*\"([^\"]+)\"/i],
           ['lang-js',       /^on\w+\s*=\s*\'([^\']+)\'/i],
           ['lang-js',       /^on\w+\s*=\s*([^\"\'>\s]+)/i],
           ['lang-css',      /^style\s*=\s*\"([^\"]+)\"/i],
           ['lang-css',      /^style\s*=\s*\'([^\']+)\'/i],
           ['lang-css',      /^style\s*=\s*([^\"\'>\s]+)/i]
           ]),
      ['in.tag']);
  registerLangHandler(
      createSimpleLexer([], [[PR_ATTRIB_VALUE, /^[\s\S]+/]]), ['uq.val']);
  registerLangHandler(sourceDecorator({
          'keywords': CPP_KEYWORDS,
          'hashComments': true,
          'cStyleComments': true,
          'types': C_TYPES
        }), ['c', 'cc', 'cpp', 'cxx', 'cyc', 'm']);
  registerLangHandler(sourceDecorator({
          'keywords': 'null,true,false'
        }), ['json']);
  registerLangHandler(sourceDecorator({
          'keywords': CSHARP_KEYWORDS,
          'hashComments': true,
          'cStyleComments': true,
          'verbatimStrings': true,
          'types': C_TYPES
        }), ['cs']);
  registerLangHandler(sourceDecorator({
          'keywords': JAVA_KEYWORDS,
          'cStyleComments': true
        }), ['java']);
  registerLangHandler(sourceDecorator({
          'keywords': SH_KEYWORDS,
          'hashComments': true,
          'multiLineStrings': true
        }), ['bash', 'bsh', 'csh', 'sh']);
  registerLangHandler(sourceDecorator({
          'keywords': PYTHON_KEYWORDS,
          'hashComments': true,
          'multiLineStrings': true,
          'tripleQuotedStrings': true
        }), ['cv', 'py', 'python']);
  registerLangHandler(sourceDecorator({
          'keywords': PERL_KEYWORDS,
          'hashComments': true,
          'multiLineStrings': true,
          'regexLiterals': 2  // multiline regex literals
        }), ['perl', 'pl', 'pm']);
  registerLangHandler(sourceDecorator({
          'keywords': RUBY_KEYWORDS,
          'hashComments': true,
          'multiLineStrings': true,
          'regexLiterals': true
        }), ['rb', 'ruby']);
  registerLangHandler(sourceDecorator({
          'keywords': JSCRIPT_KEYWORDS,
          'cStyleComments': true,
          'regexLiterals': true
        }), ['javascript', 'js']);
  registerLangHandler(sourceDecorator({
          'keywords': COFFEE_KEYWORDS,
          'hashComments': 3,  // ### style block comments
          'cStyleComments': true,
          'multilineStrings': true,
          'tripleQuotedStrings': true,
          'regexLiterals': true
        }), ['coffee']);
  registerLangHandler(sourceDecorator({
          'keywords': RUST_KEYWORDS,
          'cStyleComments': true,
          'multilineStrings': true
        }), ['rc', 'rs', 'rust']);
  registerLangHandler(
      createSimpleLexer([], [[PR_STRING, /^[\s\S]+/]]), ['regex']);

  function applyDecorator(job) {
    var opt_langExtension = job.langExtension;

    try {
      // Extract tags, and convert the source code to plain text.
      var sourceAndSpans = extractSourceSpans(job.sourceNode, job.pre);
      /** Plain text. @type {string} */
      var source = sourceAndSpans.sourceCode;
      job.sourceCode = source;
      job.spans = sourceAndSpans.spans;
      job.basePos = 0;

      // Apply the appropriate language handler
      langHandlerForExtension(opt_langExtension, source)(job);

      // Integrate the decorations and tags back into the source code,
      // modifying the sourceNode in place.
      recombineTagsAndDecorations(job);
    } catch (e) {
      if (win['console']) {
        console['log'](e && e['stack'] || e);
      }
    }
  }

  /**
   * Pretty print a chunk of code.
   * @param sourceCodeHtml {string} The HTML to pretty print.
   * @param opt_langExtension {string} The language name to use.
   *     Typically, a filename extension like 'cpp' or 'java'.
   * @param opt_numberLines {number|boolean} True to number lines,
   *     or the 1-indexed number of the first line in sourceCodeHtml.
   */
  function $prettyPrintOne(sourceCodeHtml, opt_langExtension, opt_numberLines) {
    var container = document.createElement('div');
    // This could cause images to load and onload listeners to fire.
    // E.g. <img onerror="alert(1337)" src="nosuchimage.png">.
    // We assume that the inner HTML is from a trusted source.
    // The pre-tag is required for IE8 which strips newlines from innerHTML
    // when it is injected into a <pre> tag.
    // http://stackoverflow.com/questions/451486/pre-tag-loses-line-breaks-when-setting-innerhtml-in-ie
    // http://stackoverflow.com/questions/195363/inserting-a-newline-into-a-pre-tag-ie-javascript
    container.innerHTML = '<pre>' + sourceCodeHtml + '</pre>';
    container = container.firstChild;
    if (opt_numberLines) {
      numberLines(container, opt_numberLines, true);
    }

    var job = {
      langExtension: opt_langExtension,
      numberLines: opt_numberLines,
      sourceNode: container,
      pre: 1
    };
    applyDecorator(job);
    return container.innerHTML;
  }

   /**
    * Find all the {@code <pre>} and {@code <code>} tags in the DOM with
    * {@code class=prettyprint} and prettify them.
    *
    * @param {Function} opt_whenDone called when prettifying is done.
    * @param {HTMLElement|HTMLDocument} opt_root an element or document
    *   containing all the elements to pretty print.
    *   Defaults to {@code document.body}.
    */
  function $prettyPrint(opt_whenDone, opt_root) {
    var root = opt_root || document.body;
    var doc = root.ownerDocument || document;
    function byTagName(tn) { return root.getElementsByTagName(tn); }
    // fetch a list of nodes to rewrite
    var codeSegments = [byTagName('pre'), byTagName('code'), byTagName('xmp')];
    var elements = [];
    for (var i = 0; i < codeSegments.length; ++i) {
      for (var j = 0, n = codeSegments[i].length; j < n; ++j) {
        elements.push(codeSegments[i][j]);
      }
    }
    codeSegments = null;

    var clock = Date;
    if (!clock['now']) {
      clock = { 'now': function () { return +(new Date); } };
    }

    // The loop is broken into a series of continuations to make sure that we
    // don't make the browser unresponsive when rewriting a large page.
    var k = 0;
    var prettyPrintingJob;

    var langExtensionRe = /\blang(?:uage)?-([\w.]+)(?!\S)/;
    var prettyPrintRe = /\bprettyprint\b/;
    var prettyPrintedRe = /\bprettyprinted\b/;
    var preformattedTagNameRe = /pre|xmp/i;
    var codeRe = /^code$/i;
    var preCodeXmpRe = /^(?:pre|code|xmp)$/i;
    var EMPTY = {};

    function doWork() {
      var endTime = (win['PR_SHOULD_USE_CONTINUATION'] ?
                     clock['now']() + 250 /* ms */ :
                     Infinity);
      for (; k < elements.length && clock['now']() < endTime; k++) {
        var cs = elements[k];

        // Look for a preceding comment like
        // <?prettify lang="..." linenums="..."?>
        var attrs = EMPTY;
        {
          for (var preceder = cs; (preceder = preceder.previousSibling);) {
            var nt = preceder.nodeType;
            // <?foo?> is parsed by HTML 5 to a comment node (8)
            // like <!--?foo?-->, but in XML is a processing instruction
            var value = (nt === 7 || nt === 8) && preceder.nodeValue;
            if (value
                ? !/^\??prettify\b/.test(value)
                : (nt !== 3 || /\S/.test(preceder.nodeValue))) {
              // Skip over white-space text nodes but not others.
              break;
            }
            if (value) {
              attrs = {};
              value.replace(
                  /\b(\w+)=([\w:.%+-]+)/g,
                function (_, name, value) { attrs[name] = value; });
              break;
            }
          }
        }

        var className = cs.className;
        if ((attrs !== EMPTY || prettyPrintRe.test(className))
            // Don't redo this if we've already done it.
            // This allows recalling pretty print to just prettyprint elements
            // that have been added to the page since last call.
            && !prettyPrintedRe.test(className)) {

          // make sure this is not nested in an already prettified element
          var nested = false;
          for (var p = cs.parentNode; p; p = p.parentNode) {
            var tn = p.tagName;
            if (preCodeXmpRe.test(tn)
                && p.className && prettyPrintRe.test(p.className)) {
              nested = true;
              break;
            }
          }
          if (!nested) {
            // Mark done.  If we fail to prettyprint for whatever reason,
            // we shouldn't try again.
            cs.className += ' prettyprinted';

            // If the classes includes a language extensions, use it.
            // Language extensions can be specified like
            //     <pre class="prettyprint lang-cpp">
            // the language extension "cpp" is used to find a language handler
            // as passed to PR.registerLangHandler.
            // HTML5 recommends that a language be specified using "language-"
            // as the prefix instead.  Google Code Prettify supports both.
            // http://dev.w3.org/html5/spec-author-view/the-code-element.html
            var langExtension = attrs['lang'];
            if (!langExtension) {
              langExtension = className.match(langExtensionRe);
              // Support <pre class="prettyprint"><code class="language-c">
              var wrapper;
              if (!langExtension && (wrapper = childContentWrapper(cs))
                  && codeRe.test(wrapper.tagName)) {
                langExtension = wrapper.className.match(langExtensionRe);
              }

              if (langExtension) { langExtension = langExtension[1]; }
            }

            var preformatted;
            if (preformattedTagNameRe.test(cs.tagName)) {
              preformatted = 1;
            } else {
              var currentStyle = cs['currentStyle'];
              var defaultView = doc.defaultView;
              var whitespace = (
                  currentStyle
                  ? currentStyle['whiteSpace']
                  : (defaultView
                     && defaultView.getComputedStyle)
                  ? defaultView.getComputedStyle(cs, null)
                  .getPropertyValue('white-space')
                  : 0);
              preformatted = whitespace
                  && 'pre' === whitespace.substring(0, 3);
            }

            // Look for a class like linenums or linenums:<n> where <n> is the
            // 1-indexed number of the first line.
            var lineNums = attrs['linenums'];
            if (!(lineNums = lineNums === 'true' || +lineNums)) {
              lineNums = className.match(/\blinenums\b(?::(\d+))?/);
              lineNums =
                lineNums
                ? lineNums[1] && lineNums[1].length
                  ? +lineNums[1] : true
                : false;
            }
            if (lineNums) { numberLines(cs, lineNums, preformatted); }

            // do the pretty printing
            prettyPrintingJob = {
              langExtension: langExtension,
              sourceNode: cs,
              numberLines: lineNums,
              pre: preformatted
            };
            applyDecorator(prettyPrintingJob);
          }
        }
      }
      if (k < elements.length) {
        // finish up in a continuation
        setTimeout(doWork, 250);
      } else if ('function' === typeof opt_whenDone) {
        opt_whenDone();
      }
    }

    doWork();
  }

  /**
   * Contains functions for creating and registering new language handlers.
   * @type {Object}
   */
  var PR = win['PR'] = {
        'createSimpleLexer': createSimpleLexer,
        'registerLangHandler': registerLangHandler,
        'sourceDecorator': sourceDecorator,
        'PR_ATTRIB_NAME': PR_ATTRIB_NAME,
        'PR_ATTRIB_VALUE': PR_ATTRIB_VALUE,
        'PR_COMMENT': PR_COMMENT,
        'PR_DECLARATION': PR_DECLARATION,
        'PR_KEYWORD': PR_KEYWORD,
        'PR_LITERAL': PR_LITERAL,
        'PR_NOCODE': PR_NOCODE,
        'PR_PLAIN': PR_PLAIN,
        'PR_PUNCTUATION': PR_PUNCTUATION,
        'PR_SOURCE': PR_SOURCE,
        'PR_STRING': PR_STRING,
        'PR_TAG': PR_TAG,
        'PR_TYPE': PR_TYPE,
        'prettyPrintOne':
           IN_GLOBAL_SCOPE
             ? (win['prettyPrintOne'] = $prettyPrintOne)
             : (prettyPrintOne = $prettyPrintOne),
        'prettyPrint': prettyPrint =
           IN_GLOBAL_SCOPE
             ? (win['prettyPrint'] = $prettyPrint)
             : (prettyPrint = $prettyPrint)
      };

  // Make PR available via the Asynchronous Module Definition (AMD) API.
  // Per https://github.com/amdjs/amdjs-api/wiki/AMD:
  // The Asynchronous Module Definition (AMD) API specifies a
  // mechanism for defining modules such that the module and its
  // dependencies can be asynchronously loaded.
  // ...
  // To allow a clear indicator that a global define function (as
  // needed for script src browser loading) conforms to the AMD API,
  // any global define function SHOULD have a property called "amd"
  // whose value is an object. This helps avoid conflict with any
  // other existing JavaScript code that could have defined a define()
  // function that does not conform to the AMD API.
  if (typeof define === "function" && define['amd']) {
    define("google-code-prettify", [], function () {
      return PR; 
    });
  }
})();
;
(function(scope) {
  
  var ContextFreeParser = {
    parse: function(text) {
      var top = {};
      var entities = [];
      var current = top;
      var subCurrent = {};
  
      var scriptDocCommentClause = '\\/\\*\\*([\\s\\S]*?)\\*\\/';
      var htmlDocCommentClause = '<!--([\\s\\S]*?)-->';
  
      // matches text between /** and */ inclusive and <!-- and --> inclusive
      var docCommentRegex = new RegExp(scriptDocCommentClause + '|' + htmlDocCommentClause, 'g');
  
      // acquire all script doc comments
      var docComments = text.match(docCommentRegex) || [];
  
      // each match represents a single block of doc comments
      docComments.forEach(function(m) {
        // unify line ends, remove all comment characters, split into individual lines
        var lines = m.replace(/\r\n/g, '\n').replace(/^\s*\/\*\*|^\s*\*\/|^\s*\* ?|^\s*\<\!-\-|^s*\-\-\>/gm, '').split('\n');
  
        // pragmas (@-rules) must occur on a line by themselves
        var pragmas = [];
        // filter lines whose first non-whitespace character is @ into the pragma list
        // (and out of the `lines` array)
        lines = lines.filter(function(l) {
          var m = l.match(/\s*@([\w-]*) (.*)/);
          if (!m) {
            return true;
          }
          pragmas.push(m);
        });
  
        // collect all other text into a single block
        var code = lines.join('\n');
        
        // process pragmas
        pragmas.forEach(function(m) {
          var pragma = m[1], content = m[2];
          switch (pragma) {
  
            // currently all entities are either @class or @element
            case 'class':
            case 'element':
              current = {
                name: content,
                description: code
              };
              entities.push(current);
              break;
            
            // an entity may have these describable sub-features
            case 'attribute':
            case 'property':
            case 'method':
            case 'event':
              subCurrent = {
                name: content,
                description: code
              };
              var label = pragma == 'property' ? 'properties' : pragma + 's';
              makePragma(current, label, subCurrent);
              break;
  
            // sub-feature pragmas
            case 'default':
            case 'type':
              subCurrent[pragma] = content;
              break;

            case 'param':
              var eventParmsRe = /\{(.+)\}\s+(\w+[.\w+]+)\s+(.*)$/;

              var params = content.match(eventParmsRe);
              if (params) {
                var subEventObj = {
                  type: params[1],
                  name: params[2],
                  description: params[3]
                };
                makePragma(subCurrent, pragma + 's', subEventObj);
              }

              break;
  
            // everything else
            default:
              current[pragma] = content;
              break;
          }
        });
  
        // utility function, yay hoisting
        function makePragma(object, pragma, content) {
          var p$ = object;
          var p = p$[pragma];
          if (!p) {
            p$[pragma] = p = [];
          }
          p.push(content);
        }
  
      });
  
      if (entities.length === 0) {
        entities.push({name: 'Entity', description: '**Undocumented**'});
      }
      return entities;
    }
  };
  
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = ContextFreeParser;
  } else {
    scope.ContextFreeParser = ContextFreeParser;
  }
  
})(this);;


  Polymer('context-free-parser', {

    text: null,

    textChanged: function() {
      if (this.text) {
        var entities = ContextFreeParser.parse(this.text);
        if (!entities || entities.length === 0) {
          entities = [
            {name: this.url.split('/').pop(), description: '**Undocumented**'}
          ];
        }
        this.data = { classes: entities };
      }
    },

    dataChanged: function() {
      this.fire('data-ready');
    }

  });

;


    Polymer('core-doc-page', {

      hilight: function(event, detail, sender) {
        detail.code = prettyPrintOne((detail.code || '').replace(/</g,'&lt;').replace(/>/g,'&gt;'));
      },

      homepageFilter: function(data) {
        if (!data) {
          return '';
        }
        if (!data.homepage || data.homepage === 'github.io') {
          return '//polymer.github.io/' + data.name;
        } else {
          return data.homepage;
        }
      }

    });

  ;
Polymer('core-menu');;


  Polymer('core-item', {
    
    /**
     * The URL of an image for the icon.
     *
     * @attribute src
     * @type string
     * @default ''
     */

    /**
     * Specifies the icon from the Polymer icon set.
     *
     * @attribute icon
     * @type string
     * @default ''
     */

    /**
     * Specifies the label for the menu item.
     *
     * @attribute label
     * @type string
     * @default ''
     */

  });

;


    Polymer('core-doc-toc', {

      searchAction: function() {
        this.$.searchBar.style.opacity = 1;
        this.$.searchBar.style.display = '';
      },

      closeSearchAction: function() {
        this.$.searchBar.style.opacity = 0;
        this.$.searchBar.style.display = 'none';
      }

    });

  ;


    Polymer('core-doc-viewer', {
      /**
       * A single file to parse for docs
       *
       * @attribute url
       * @type String
       * @default ''
       */

      /**
       * Class documentation extracted from the parser
       *
       * @property classes
       * @type Array
       * @default []
       */
      classes: [],

      /**
       * Files to parse for docs
       *
       * @attribute sources
       * @type Array
       * @default []
       */
      sources: [],

      ready: function() {
        window.addEventListener('hashchange', this.parseLocationHash.bind(this));
        this.parseLocationHash();
      },

      parseLocationHash: function() {
        this.route = window.location.hash.slice(1);
      },

      routeChanged: function() {
        this.validateRoute();
      },

      validateRoute: function() {
        if (this.route) {
          this.classes.some(function(c) {
            if (c.name === this.route) {
              this.data = c;
              this.route = '';
              return;
            }
          }, this);
        }
      },

      selectedChanged: function() { 
        this.data = this.classes[this.selected];
      },

      parserDataReady: function(event) {
        this.assimilateData(event.target.data);
      },

      assimilateData: function(data) {
        this.classes = this.classes.concat(data.classes);
        this.classes.sort(function(a, b) {
          var na = a && a.name.toLowerCase(), nb = b && b.name.toLowerCase();
          return (na < nb) ? -1 : (na == nb) ? 0 : 1;
        });
        if (!this.data && !this.route && this.classes.length) {
          this.data = this.classes[0];
        }
        if (this.classes.length > 1) {
          this.$.toc.style.display = 'block';
        }
        this.validateRoute();
      }

    });

  ;


  Polymer('core-drag-drop', {

    observe: {
      'x y': 'coordinatesChanged'
    },

    ready: function() {
      if (!this.__proto__.avatar) {
        this.__proto__.avatar = document.createElement('core-drag-avatar');
        document.body.appendChild(this.avatar);
      }
      this.dragging = false;
    },

    draggingChanged: function() {
      this.avatar.style.display = this.dragging ? '' : 'none';
    },

    coordinatesChanged: function() {
      var x = this.x, y = this.y;
      this.avatar.style.transform = 
        this.avatar.style.webkitTransform = 
          'translate(' + x + 'px, ' + y + 'px)';
    },

    attached: function() {
      var listen = function(event, handler) {
        Polymer.addEventListener(this.parentNode, event, this[handler].bind(this));
      }.bind(this);
      //
      listen('trackstart', 'trackStart');
      listen('track', 'track');
      listen('trackend', 'trackEnd');
      //
      var host = this.parentNode.host || this.parentNode;
      host.style.cssText += '; user-select: none; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none;';
    },

    trackStart: function(event) {
      this.avatar.style.cssText = '';
      this.dragInfo = {
        event: event,
        avatar: this.avatar
      };
      this.fire('drag-start', this.dragInfo);
      // flaw #1: what if user doesn't need `drag()`?
      this.dragging = Boolean(this.dragInfo.drag);
    },

    track: function(event) {
      if (this.dragging) {
        this.x = event.pageX;
        this.y = event.pageY;
        this.dragInfo.event = event;
        this.dragInfo.p = {x : this.x, y: this.y};
        this.dragInfo.drag(this.dragInfo);
      }
    },

    trackEnd: function(event) {
      if (this.dragging) {
        this.dragging = false;
        if (this.dragInfo.drop) {
          this.dragInfo.framed = this.framed(event.relatedTarget);
          this.dragInfo.event = event;
          this.dragInfo.drop(this.dragInfo);
        }
      }
      this.dragInfo = null;
    },

    framed: function(node) {
      var local = node.getBoundingClientRect();
      return {x: this.x - local.left, y: this.y - local.top};
    }

  });

;

    Polymer('core-media-query', {

      /**
       * The Boolean return value of the media query
       *
       * @attribute queryMatches
       * @type Boolean
       * @default false
       */
      queryMatches: false,

      /**
       * The CSS media query to evaulate
       *
       * @attribute query
       * @type string
       * @default ''
       */
      query: '',
      ready: function() {
        this._mqHandler = this.queryHandler.bind(this);
        this._mq = null;
      },
      queryChanged: function() {
        if (this._mq) {
          this._mq.removeListener(this._mqHandler);
        }
        var query = this.query;
        if (query[0] !== '(') {
          query = '(' + this.query + ')';
        }
        this._mq = window.matchMedia(query);
        this._mq.addListener(this._mqHandler);
        this.queryHandler(this._mq);
      },
      queryHandler: function(mq) {
        this.queryMatches = mq.matches;
        this.asyncFire('core-media-change', mq);
      }
    });
  ;


  Polymer('core-drawer-panel', {
    /**
     * Fired when the narrow layout changes.
     * 
     * @event core-responsive-change
     * @param {Object} detail
     * @param {boolean} detail.narrow true if the panel is in narrow layout.
     */

    publish: {
      
      /**
       * Width of the drawer panel.
       *
       * @attribute drawerWidth
       * @type string
       * @default '256px'
       */
      drawerWidth: '256px',
      
      /**
       * Max-width when the panel changes to narrow layout.
       *
       * @attribute responsiveWidth
       * @type string
       * @default '640px'
       */
      responsiveWidth: '640px',
      
      /**
       * The panel that is being selected. `drawer` for the drawer panel and
       * `main` for the main panel.
       *
       * @attribute selected
       * @type string
       * @default null
       */
      selected: {value: null, reflect: true},
      
      /**
       * The panel to be selected when `core-drawer-panel` changes to narrow 
       * layout.
       *
       * @attribute defaultSelected
       * @type string
       * @default 'main'
       */
      defaultSelected: 'main',
    
      /**
       * Returns true if the panel is in narrow layout.  This is useful if you
       * need to show/hide elements based on the layout.
       *
       * @attribute narrow
       * @type boolean
       * @default false
       */
      narrow: {value: false, reflect: true},
      
      /**
       * If true, position the drawer to the right.
       *
       * @attribute rightDrawer
       * @type boolean
       * @default false
       */
      rightDrawer: false,
      
      /**
       * If true, swipe to open/close the drawer is disabled.
       *
       * @attribute disableSwipe
       * @type boolean
       * @default false
       */
      disableSwipe: false
    },
    
    eventDelegates: {
      trackstart: 'trackStart',
      trackx: 'trackx',
      trackend: 'trackEnd'
    },
    
    transition: false,

    edgeSwipeSensitivity : 15,
    
    dragging : false,
    
    domReady: function() {
      // to avoid transition at the beginning e.g. page loads
      // NOTE: domReady is already raf delayed and delaying another frame
      // ensures a layout has occurred.
      this.async(function() {
        this.transition = true;
      });
    },

    /**
     * Toggles the panel open and closed.
     * 
     * @method togglePanel
     */
    togglePanel: function() {
      this.selected = this.selected === 'main' ? 'drawer' : 'main';
    },
    
    /**
     * Opens the drawer.
     * 
     * @method openDrawer
     */
    openDrawer: function() {
      this.selected = 'drawer';
    },
    
    /**
     * Closes the drawer.
     * 
     * @method closeDrawer
     */
    closeDrawer: function() {
      this.selected = 'main';
    },

    queryMatchesChanged: function() {
      if (this.queryMatches) {
        this.selected = this.defaultSelected;
      }
      this.narrow = this.queryMatches;
      this.setAttribute('touch-action', 
          this.narrow && !this.disableSwipe ? 'pan-y' : '');
      this.fire('core-responsive-change', {narrow: this.narrow});
    },
    
    // swipe support for the drawer, inspired by
    // https://github.com/Polymer/core-drawer-panel/pull/6
    trackStart : function(e) {
      if (this.narrow && !this.disableSwipe) {
        this.dragging = true;

        if (this.selected === 'main') {
          this.dragging = this.rightDrawer ?
              e.pageX >= this.offsetWidth - this.edgeSwipeSensitivity :
              e.pageX <= this.edgeSwipeSensitivity;
        }

        if (this.dragging) {
          this.width = this.$.drawer.offsetWidth;
          this.transition = false;
          e.preventTap();
        }
      }
    },

    trackx : function(e) {
      if (this.dragging) {
        var x;
        if (this.rightDrawer) {
          x = Math.max(0, (this.selected === 'main') ? this.width + e.dx : e.dx);
        } else {
          x = Math.min(0, (this.selected === 'main') ? e.dx - this.width : e.dx);
        }
        this.moveDrawer(x);
      }
    },

    trackEnd : function(e) {
      if (this.dragging) {
        this.dragging = false;
        this.transition = true;
        this.moveDrawer(null);

        if (this.rightDrawer) {
          this.selected = e.xDirection > 0 ? 'main' : 'drawer';
        } else {
          this.selected = e.xDirection > 0 ? 'drawer' : 'main';
        }
      }
    },
    
    moveDrawer: function(translateX) {
      var s = this.$.drawer.style;
      s.webkitTransform = s.transform = 
          translateX === null ? '' : 'translate3d(' + translateX + 'px, 0, 0)';
    }

  });

;

    Polymer('core-key-helper', {
      ENTER_KEY: 13,
      ESCAPE_KEY: 27
    });
  ;

(function() {

  Polymer('core-overlay-layer', {
    publish: {
      opened: false
    },
    openedChanged: function() {
      this.classList.toggle('core-opened', this.opened);
    },
    /**
     * Adds an element to the overlay layer
     */
    addElement: function(element) {
      if (!this.parentNode) {
        document.querySelector('body').appendChild(this);
      }
      if (element.parentNode !== this) {
        element.__contents = [];
        var ip$ = element.querySelectorAll('content');
        for (var i=0, l=ip$.length, n; (i<l) && (n = ip$[i]); i++) {
          this.moveInsertedElements(n);
          this.cacheDomLocation(n);
          n.parentNode.removeChild(n);
          element.__contents.push(n);
        }
        this.cacheDomLocation(element);
        this.updateEventController(element);
        var h = this.makeHost();
        h.shadowRoot.appendChild(element);
        element.__host = h;
      }
    },
    makeHost: function() {
      var h = document.createElement('overlay-host');
      h.createShadowRoot();
      this.appendChild(h);
      return h;
    },
    moveInsertedElements: function(insertionPoint) {
      var n$ = insertionPoint.getDistributedNodes();
      var parent = insertionPoint.parentNode;
      insertionPoint.__contents = [];
      for (var i=0, l=n$.length, n; (i<l) && (n=n$[i]); i++) {
        this.cacheDomLocation(n);
        this.updateEventController(n);
        insertionPoint.__contents.push(n);
        parent.appendChild(n);  
      }
    },
    updateEventController: function(element) {
      element.eventController = this.element.findController(element);
    },
    /**
     * Removes an element from the overlay layer
     */
    removeElement: function(element) {
      element.eventController = null;
      this.replaceElement(element);
      var h = element.__host;
      if (h) {
        h.parentNode.removeChild(h);
      }
    },
    replaceElement: function(element) {
      if (element.__contents) {
        for (var i=0, c$=element.__contents, c; (c=c$[i]); i++) {
          this.replaceElement(c);
        }
        element.__contents = null;
      }
      if (element.__parentNode) {
        var n = element.__nextElementSibling && element.__nextElementSibling 
            === element.__parentNode ? element.__nextElementSibling : null;
        element.__parentNode.insertBefore(element, n);
      }
    },
    cacheDomLocation: function(element) {
      element.__nextElementSibling = element.nextElementSibling;
      element.__parentNode = element.parentNode;
    }
  });
  
})();
;

(function() {

  Polymer('core-overlay', {

    publish: {
      /**
       * The target element that will be shown when the overlay is 
       * opened. If unspecified, the core-overlay itself is the target.
       *
       * @attribute target
       * @type Object
       * @default the overlay element
       */
      target: null,


      /**
       * A `core-overlay`'s size is guaranteed to be 
       * constrained to the window size. To achieve this, the sizingElement
       * is sized with a max-height/width. By default this element is the 
       * target element, but it can be specifically set to a specific element
       * inside the target if that is more appropriate. This is useful, for 
       * example, when a region inside the overlay should scroll if needed.
       *
       * @attribute sizingTarget
       * @type Object
       * @default the target element
       */
      sizingTarget: null,
    
      /**
       * Set opened to true to show an overlay and to false to hide it.
       * A `core-overlay` may be made initially opened by setting its
       * `opened` attribute.
       * @attribute opened
       * @type boolean
       * @default false
       */
      opened: false,

      /**
       * If true, the overlay has a backdrop darkening the rest of the screen.
       * The backdrop element is attached to the document body and may be styled
       * with the class `core-overlay-backdrop`. When opened the `core-opened`
       * class is applied.
       *
       * @attribute backdrop
       * @type boolean
       * @default false
       */    
      backdrop: false,

      /**
       * If true, the overlay is guaranteed to display above page content.
       *
       * @attribute layered
       * @type boolean
       * @default false
      */
      layered: false,
    
      /**
       * By default an overlay will close automatically if the user
       * taps outside it or presses the escape key. Disable this
       * behavior by setting the `autoCloseDisabled` property to true.
       * @attribute autoCloseDisabled
       * @type boolean
       * @default false
       */
      autoCloseDisabled: false,

      /**
       * This property specifies an attribute on elements that should
       * close the overlay on tap. Should not set `closeSelector` if this
       * is set.
       *
       * @attribute closeAttribute
       * @type string
       * @default "core-overlay-toggle"
       */
      closeAttribute: 'core-overlay-toggle',

      /**
       * This property specifies a selector matching elements that should
       * close the overlay on tap. Should not set `closeAttribute` if this
       * is set.
       *
       * @attribute closeSelector
       * @type string
       * @default ""
       */
      closeSelector: '',

      /**
       * A `core-overlay` target's size is constrained to the window size.
       * The `margin` property specifies a pixel amount around the overlay 
       * that will be reserved. It's useful for ensuring that, for example, 
       * a shadow displayed outside the target will always be visible.
       *
       * @attribute margin
       * @type number
       * @default 0
       */
      margin: 0,

      /**
       * The transition property specifies a string which identifies a 
       * <a href="../core-transition/">`core-transition`</a> element that 
       * will be used to help the overlay open and close. The default
       * `core-transition-fade` will cause the overlay to fade in and out.
       *
       * @attribute transition
       * @type string
       * @default 'core-transition-fade'
       */
      transition: 'core-transition-fade'

    },

    captureEventName: 'tap',
    targetListeners: {
      'tap': 'tapHandler',
      'keydown': 'keydownHandler',
      'core-transitionend': 'transitionend'
    },
    
    registerCallback: function(element) {
      this.layer = document.createElement('core-overlay-layer');
      this.keyHelper = document.createElement('core-key-helper');
      this.meta = document.createElement('core-transition');
      this.scrim = document.createElement('div');
      this.scrim.className = 'core-overlay-backdrop';
    },

    ready: function() {
      this.target = this.target || this;
      // flush to ensure styles are installed before paint
      Platform.flush();
    },

    /** 
     * Toggle the opened state of the overlay.
     * @method toggle
     */
    toggle: function() {
      this.opened = !this.opened;
    },

    /** 
     * Open the overlay. This is equivalent to setting the `opened`
     * property to true.
     * @method open
     */
    open: function() {
      this.opened = true;
    },

    /** 
     * Close the overlay. This is equivalent to setting the `opened` 
     * property to false.
     * @method close
     */
    close: function() {
      this.opened = false;
    },

    domReady: function() {
      this.ensureTargetSetup();
    },

    targetChanged: function(old) {
      if (this.target) {
        // really make sure tabIndex is set
        if (this.target.tabIndex < 0) {
          this.target.tabIndex = -1;
        }
        this.addElementListenerList(this.target, this.targetListeners);
        this.target.style.display = 'none';
      }
      if (old) {
        this.removeElementListenerList(old, this.targetListeners);
        var transition = this.getTransition();
        if (transition) {
          transition.teardown(old);
        } else {
          old.style.position = '';
          old.style.outline = '';
        }
        old.style.display = '';
      }
    },

    // NOTE: wait to call this until we're as sure as possible that target
    // is styled.
    ensureTargetSetup: function() {
      if (!this.target || this.target.__overlaySetup) {
        return;
      }
      this.target.__overlaySetup = true;
      this.target.style.display = '';
      var transition = this.getTransition();
      if (transition) {
        transition.setup(this.target);
      }
      var computed = getComputedStyle(this.target);
      this.targetStyle = {
        position: computed.position === 'static' ? 'fixed' :
            computed.position
      }
      if (!transition) {
        this.target.style.position = this.targetStyle.position;
        this.target.style.outline = 'none';
      }
      this.target.style.display = 'none';
    },

    openedChanged: function() {
      this.transitioning = true;
      this.ensureTargetSetup();
      this.prepareRenderOpened();
      // continue styling after delay so display state can change
      // without aborting transitions
      // note: we wait a full frame so that transition changes executed
      // during measuring do not cause transition
      this.async(function() {
        this.target.style.display = '';
        this.async('renderOpened');
      });
      this.fire('core-overlay-open', this.opened);
    },

    // tasks which must occur before opening; e.g. making the element visible
    prepareRenderOpened: function() {
      if (this.opened) {
        addOverlay(this);
      }
      this.prepareBackdrop();
      // async so we don't auto-close immediately via a click.
      this.async(function() {
        if (!this.autoCloseDisabled) {
          this.enableElementListener(this.opened, document,
              this.captureEventName, 'captureHandler', true);
        }
      });
      this.enableElementListener(this.opened, window, 'resize',
          'resizeHandler');

      if (this.opened) {
        // TODO(sorvell): force SD Polyfill to render
        forcePolyfillRender(this.target);
        if (!this._shouldPosition) {
          this.target.style.position = 'absolute';
          var computed = getComputedStyle(this.target);
          var t = (computed.top === 'auto' && computed.bottom === 'auto');
          var l = (computed.left === 'auto' && computed.right === 'auto');
          this.target.style.position = this.targetStyle.position;
          this._shouldPosition = {top: t, left: l};
        }
        // if we are showing, then take care when measuring
        this.prepareMeasure(this.target);
        this.updateTargetDimensions();
        this.finishMeasure(this.target);
        if (this.layered) {
          this.layer.addElement(this.target);
          this.layer.opened = this.opened;
        }
      }
    },

    // tasks which cause the overlay to actually open; typically play an
    // animation
    renderOpened: function() {
      var transition = this.getTransition();
      if (transition) {
        transition.go(this.target, {opened: this.opened});
      } else {
        this.transitionend();
      }
      this.renderBackdropOpened();
    },

    // finishing tasks; typically called via a transition
    transitionend: function(e) {
      // make sure this is our transition event.
      if (e && e.target !== this.target) {
        return;
      }
      this.transitioning = false;
      if (!this.opened) {
        this.resetTargetDimensions();
        this.target.style.display = 'none';
        this.completeBackdrop();
        removeOverlay(this);
        if (this.layered) {
          if (!currentOverlay()) {
            this.layer.opened = this.opened;
          }
          this.layer.removeElement(this.target);
        }
      }
      this.applyFocus();
    },

    prepareBackdrop: function() {
      if (this.backdrop && this.opened) {
        if (!this.scrim.parentNode) {
          document.body.appendChild(this.scrim);
          this.scrim.style.zIndex = currentOverlayZ() - 1;
        }
        trackBackdrop(this);
      }
    },

    renderBackdropOpened: function() {
      if (this.backdrop && getBackdrops().length < 2) {
        this.scrim.classList.toggle('core-opened', this.opened);
      }
    },

    completeBackdrop: function() {
      if (this.backdrop) {
        trackBackdrop(this);
        if (getBackdrops().length === 0) {
          this.scrim.parentNode.removeChild(this.scrim);
        }
      }
    },

    prepareMeasure: function(target) {
      target.style.transition = target.style.webkitTransition = 'none';
      target.style.transform = target.style.webkitTransform = 'none';
      target.style.display = '';
    },

    finishMeasure: function(target) {
      target.style.display = 'none';
      target.style.transform = target.style.webkitTransform = '';
      target.style.transition = target.style.webkitTransition = '';
    },

    getTransition: function() {
      return this.meta.byId(this.transition);
    },

    getFocusNode: function() {
      return this.target.querySelector('[autofocus]') || this.target;
    },

    applyFocus: function() {
      var focusNode = this.getFocusNode();
      if (this.opened) {
        focusNode.focus();
      } else {
        focusNode.blur();
        if (currentOverlay() == this) {
          console.warn('Current core-overlay is attempting to focus itself as next! (bug)');
        } else {
          focusOverlay();
        }
      }
    },

    updateTargetDimensions: function() {
      this.positionTarget();
      this.sizeTarget();
      //
      if (this.layered) {
        var rect = this.target.getBoundingClientRect();
        this.target.style.top = rect.top + 'px';
        this.target.style.left = rect.left + 'px';
        this.target.style.right = this.target.style.bottom = 'auto';
      }
    },

    sizeTarget: function() {
      var sizer = this.sizingTarget || this.target;
      var rect = sizer.getBoundingClientRect();
      var mt = rect.top === this.margin ? this.margin : this.margin * 2;
      var ml = rect.left === this.margin ? this.margin : this.margin * 2;
      var h = window.innerHeight - rect.top - mt;
      var w = window.innerWidth - rect.left - ml;
      sizer.style.maxHeight = h + 'px';
      sizer.style.maxWidth = w + 'px';
      sizer.style.boxSizing = 'border-box';
    },

    positionTarget: function() {
      // vertically and horizontally center if not positioned
      if (this._shouldPosition.top) {
        var t = Math.max((window.innerHeight - 
            this.target.offsetHeight - this.margin*2) / 2, this.margin);
        this.target.style.top = t + 'px';
      }
      if (this._shouldPosition.left) {
        var l = Math.max((window.innerWidth - 
            this.target.offsetWidth - this.margin*2) / 2, this.margin);
        this.target.style.left = l + 'px';
      }
    },

    resetTargetDimensions: function() {
      this.target.style.top = this.target.style.left = '';
      this.target.style.right = this.target.style.bottom = '';
      this.target.style.width = this.target.style.height = '';
      this._shouldPosition = null;
    },

    tapHandler: function(e) {
      // closeSelector takes precedence since closeAttribute has a default non-null value.
      if (e.target &&
          (this.closeSelector && e.target.matches(this.closeSelector)) ||
          (this.closeAttribute && e.target.hasAttribute(this.closeAttribute))) {
        this.toggle();
      } else {
        if (this.autoCloseJob) {
          this.autoCloseJob.stop();
          this.autoCloseJob = null;
        }
      }
    },
    
    // We use the traditional approach of capturing events on document
    // to to determine if the overlay needs to close. However, due to 
    // ShadowDOM event retargeting, the event target is not useful. Instead
    // of using it, we attempt to close asynchronously and prevent the close
    // if a tap event is immediately heard on the target.
    // TODO(sorvell): This approach will not work with modal. For
    // this we need a scrim.
    captureHandler: function(e) {
      if (!this.autoCloseDisabled && (currentOverlay() == this)) {
        this.autoCloseJob = this.job(this.autoCloseJob, function() {
          this.close();
        });
      }
    },

    keydownHandler: function(e) {
      if (!this.autoCloseDisabled && (e.keyCode == this.keyHelper.ESCAPE_KEY)) {
        this.close();
        e.stopPropagation();
      }
    },

    /**
     * Extensions of core-overlay should implement the `resizeHandler`
     * method to adjust the size and position of the overlay when the 
     * browser window resizes.
     * @method resizeHandler
     */
    resizeHandler: function() {
      this.updateTargetDimensions();
    },

    // TODO(sorvell): these utility methods should not be here.
    addElementListenerList: function(node, events) {
      for (var i in events) {
        this.addElementListener(node, i, events[i]);
      }
    },

    removeElementListenerList: function(node, events) {
      for (var i in events) {
        this.removeElementListener(node, i, events[i]);
      }
    },

    enableElementListener: function(enable, node, event, methodName, capture) {
      if (enable) {
        this.addElementListener(node, event, methodName, capture);
      } else {
        this.removeElementListener(node, event, methodName, capture);
      }
    },

    addElementListener: function(node, event, methodName, capture) {
      var fn = this._makeBoundListener(methodName);
      if (node && fn) {
        Polymer.addEventListener(node, event, fn, capture);
      }
    },

    removeElementListener: function(node, event, methodName, capture) {
      var fn = this._makeBoundListener(methodName);
      if (node && fn) {
        Polymer.removeEventListener(node, event, fn, capture);
      }
    },

    _makeBoundListener: function(methodName) {
      var self = this, method = this[methodName];
      if (!method) {
        return;
      }
      var bound = '_bound' + methodName;
      if (!this[bound]) {
        this[bound] = function(e) {
          method.call(self, e);
        }
      }
      return this[bound];
    },
  });

  function forcePolyfillRender(target) {
    if (window.ShadowDOMPolyfill) {
      target.offsetHeight;
    }
  }

  // TODO(sorvell): This should be an element with private state so it can
  // be independent of overlay.
  // track overlays for z-index and focus managemant
  var overlays = [];
  function addOverlay(overlay) {
    var z0 = currentOverlayZ();
    overlays.push(overlay);
    var z1 = currentOverlayZ();
    if (z1 <= z0) {
      applyOverlayZ(overlay, z0);
    }
  }

  function removeOverlay(overlay) {
    var i = overlays.indexOf(overlay);
    if (i >= 0) {
      overlays.splice(i, 1);
      setZ(overlay, '');
    }
  }
  
  function applyOverlayZ(overlay, aboveZ) {
    setZ(overlay.target, aboveZ + 2);
  }
  
  function setZ(element, z) {
    element.style.zIndex = z;
  }

  function currentOverlay() {
    return overlays[overlays.length-1];
  }
  
  var DEFAULT_Z = 10;
  
  function currentOverlayZ() {
    var z;
    var current = currentOverlay();
    if (current) {
      var z1 = window.getComputedStyle(current.target).zIndex;
      if (!isNaN(z1)) {
        z = Number(z1);
      }
    }
    return z || DEFAULT_Z;
  }
  
  function focusOverlay() {
    var current = currentOverlay();
    // We have to be careful to focus the next overlay _after_ any current
    // transitions are complete (due to the state being toggled prior to the
    // transition). Otherwise, we risk infinite recursion when a transitioning
    // (closed) overlay becomes the current overlay.
    //
    // NOTE: We make the assumption that any overlay that completes a transition
    // will call into focusOverlay to kick the process back off. Currently:
    // transitionend -> applyFocus -> focusOverlay.
    if (current && !current.transitioning) {
      current.applyFocus();
    }
  }

  var backdrops = [];
  function trackBackdrop(element) {
    if (element.opened) {
      backdrops.push(element);
    } else {
      var i = backdrops.indexOf(element);
      if (i >= 0) {
        backdrops.splice(i, 1);
      }
    }
  }

  function getBackdrops() {
    return backdrops;
  }
})();
;


  Polymer('core-dropdown',{

    publish: {

      /**
       * True if the menu is open.
       *
       * @attribute opened
       * @type boolean
       * @default false
       */
      opened: false,

      /**
       * A label for the control. The label is displayed if no item is selected.
       *
       * @attribute label
       * @type string
       * @default 'Select an item'
       */
      label: 'Select an item',

      /**
       * The currently selected element. By default this is the index of the item element.
       * If you want a specific attribute value of the element to be used instead of the
       * index, set `valueattr` to that attribute name.
       *
       * @attribute selected
       * @type Object
       * @default null
       */
      selected: null,

      /**
       * Specifies the attribute to be used for "selected" attribute.
       *
       * @attribute valueattr
       * @type string
       * @default 'name'
       */
      valueattr: 'name',

      /**
       * Specifies the CSS class to be used to add to the selected element.
       * 
       * @attribute selectedClass
       * @type string
       * @default 'core-selected'
       */
      selectedClass: 'core-selected',

      /**
       * Specifies the property to be used to set on the selected element
       * to indicate its active state.
       *
       * @attribute selectedProperty
       * @type string
       * @default ''
       */
      selectedProperty: '',

      /**
       * Specifies the attribute to set on the selected element to indicate
       * its active state.
       *
       * @attribute selectedAttribute
       * @type string
       * @default 'active'
       */
      selectedAttribute: 'selected',

      /**
       * The currently selected element.
       *
       * @attribute selectedItem
       * @type Object
       * @default null
       */
      selectedItem: null,

      /**
       * Horizontally align the overlay with the control.
       * @attribute halign
       * @type "left"|"right"
       * @default "left"
       */
      halign: {value: 'left', reflect: true},

      /**
       * Vertically align the dropdown menu with the control.
       * @attribute valign
       * @type "top"|"bottom"
       * @default "bottom"
       */
      valign: {value: 'bottom', reflect: true}

    },

    toggle: function() {
      this.opened = !this.opened;
    },

    openAction: function(e) {
      if (e.detail) {
        var rect = this.$.control.getBoundingClientRect();
        if (this.valign === 'top') {
          this.$.menu.style.top = 'auto';
          this.$.menu.style.bottom = rect.height + 'px';
          this.$.menu.style.maxHeight = (window.innerHeight - (window.innerHeight - rect.top) - 12) + 'px';
        } else {
          this.$.menu.style.top = rect.height + 'px';
          this.$.menu.style.bottom = 'auto';
          this.$.menu.style.maxHeight = (window.innerHeight - rect.height - rect.top - 12) + 'px';
        }
        this.$.menu.style.minWidth = rect.width + 'px';
      }
    },

    selectAction: function() {
      this.opened = false;
    }
  });

;
Polymer('core-field');;


    Polymer('core-input', {
      publish: {
        /**
         * Placeholder text that hints to the user what can be entered in
         * the input.
         *
         * @attribute placeholder
         * @type string
         * @default ''
         */
        placeholder: '',
  
        /**
         * If true, this input cannot be focused and the user cannot change
         * its value.
         *
         * @attribute disabled
         * @type boolean
         * @default false
         */
        disabled: false,
  
        /**
         * If true, the user cannot modify the value of the input.
         *
         * @attribute readonly
         * @type boolean
         * @default false
         */
        readonly: false,

        /**
         * If true, this input will automatically gain focus on page load.
         *
         * @attribute autofocus
         * @type boolean
         * @default false
         */
        autofocus: false,

        /**
         * If true, this input accepts multi-line input like a `<textarea>`
         *
         * @attribute multiline
         * @type boolean
         * @default false
         */
        multiline: false,
  
        /**
         * (multiline only) The height of this text input in rows. The input
         * will scroll internally if more input is entered beyond the size
         * of the component. This property is meaningless if multiline is
         * false. You can also set this property to "fit" and size the
         * component with CSS to make the input fit the CSS size.
         *
         * @attribute rows
         * @type number|'fit'
         * @default 'fit'
         */
        rows: 'fit',
  
        /**
         * The current value of this input. Changing inputValue programmatically
         * will cause value to be out of sync. Instead, change value directly
         * or call commit() after changing inputValue.
         *
         * @attribute inputValue
         * @type string
         * @default ''
         */
        inputValue: '',
  
        /**
         * The value of the input committed by the user, either by changing the
         * inputValue and blurring the input, or by hitting the `enter` key.
         *
         * @attribute value
         * @type string
         * @default ''
         */
        value: '',

        /**
         * Set the input type. Not supported for `multiline`.
         *
         * @attribute type
         * @type string
         * @default text
         */
        type: 'text',

        /**
         * If true, the input is invalid if its value is null.
         *
         * @attribute required
         * @type boolean
         * @default false
         */
        required: false,

        /**
         * A regular expression to validate the input value against. See
         * https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation#Validation-related_attributes
         * for more info. Not supported if `multiline` is true.
         *
         * @attribute pattern
         * @type string
         * @default '.*'
         */
        // FIXME(yvonne): The default is set to .* because we can't bind to pattern such
        // that the attribute is unset if pattern is null.
        pattern: '.*',

        /**
         * If set, the input is invalid if the value is less than this property. See
         * https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation#Validation-related_attributes
         * for more info. Not supported if `multiline` is true.
         *
         * @attribute min
         */
        min: null,

        /**
         * If set, the input is invalid if the value is greater than this property. See
         * https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation#Validation-related_attributes
         * for more info. Not supported if `multiline` is true.
         *
         * @attribute max
         */
        max: null,

        /**
         * If set, the input is invalid if the value is not `min` plus an integral multiple
         * of this property. See
         * https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation#Validation-related_attributes
         * for more info. Not supported if `multiline` is true.
         *
         * @attribute step
         */
        step: null,

        /**
         * The maximum length of the input value.
         *
         * @attribute maxlength
         * @type number
         */
        maxlength: null,
  
        /**
         * If this property is true, the text input's inputValue failed validation.
         *
         * @attribute invalid
         * @type boolean
         * @default false
         */
        invalid: false
      },

      ready: function() {
        this.handleTabindex(this.getAttribute('tabindex'));
      },

      invalidChanged: function() {
        this.classList.toggle('invalid', this.invalid);
        this.fire('input-'+ (this.invalid ? 'invalid' : 'valid'), {value: this.inputValue});
      },

      inputValueChanged: function() {
        this.updateValidity_();
      },

      valueChanged: function() {
        this.inputValue = this.value;
      },

      requiredChanged: function() {
        this.updateValidity_();
      },

      attributeChanged: function(attr, oldVal, curVal) {
        if (attr === 'tabindex') {
          this.handleTabindex(curVal);
        }
      },

      handleTabindex: function(tabindex) {
        if (tabindex > 0) {
          this.$.input.setAttribute('tabindex', -1);
        } else {
          this.$.input.removeAttribute('tabindex');
        }
      },

      /**
       * Commits the inputValue to value.
       *
       * @method commit
       */
      commit: function() {
         this.value = this.inputValue;
      },

      updateValidity_: function() {
        if (this.$.input.willValidate) {
          this.invalid = !this.$.input.validity.valid;
        }
      },

      keydownAction: function() {
        // for type = number, the value is the empty string unless the input is a valid number.
        // FIXME(yvonne): check other types
        if (this.type === 'number') {
          this.async(function() {
            this.updateValidity_();
          });
        }
      },

      inputChangeAction: function() {
        this.commit();
        if (!window.ShadowDOMPolyfill) {
          // re-fire event that does not bubble across shadow roots
          this.fire('change', null, this);
        }
      },

      focusAction: function(e) {
        if (this.getAttribute('tabindex') > 0) {
          // Forward focus to the inner input if tabindex is set on the element
          // This will not cause an infinite loop because focus will not fire on the <input>
          // again if it's already focused.
          this.$.input.focus();
        }
      },

      inputFocusAction: function(e) {
        if (window.ShadowDOMPolyfill) {
          // re-fire non-bubbling event if polyfill
          this.fire('focus', null, this, false);
        }
      },

      inputBlurAction: function() {
        if (window.ShadowDOMPolyfill) {
          // re-fire non-bubbling event
          this.fire('blur', null, this, false);
        }
      },

      blur: function() {
        // forward blur method to the internal input / textarea element
        this.$.input.blur();
      },

      click: function() {
        // forward click method to the internal input / textarea element
        this.$.input.click();
      },

      focus: function() {
        // forward focus method to the internal input / textarea element
        this.$.input.focus();
      },

      select: function() {
        // forward select method to the internal input / textarea element
        this.$.input.focus();
      },

      setSelectionRange: function(selectionStart, selectionEnd, selectionDirection) {
        // forward setSelectionRange method to the internal input / textarea element
        this.$.input.setSelectionRange(selectionStart, selectionEnd, selectionDirection);
      },

      setRangeText: function(replacement, start, end, selectMode) {
        // forward setRangeText method to the internal input element
        if (!this.multiline) {
          this.$.input.setRangeText(replacement, start, end, selectMode);
        }
      },

      stepDown: function(n) {
        // forward stepDown method to the internal input element
        if (!this.multiline) {
          this.$.input.stepDown(n);
        }
      },

      stepUp: function(n) {
        // forward stepUp method to the internal input element
        if (!this.multiline) {
          this.$.input.stepUp(n);
        }
      },

      get willValidate() {
        return this.$.input.willValidate;
      },

      get validity() {
        return this.$.input.validity;
      },

      get validationMessage() {
        return this.$.input.validationMessage;
      },

      checkValidity: function() {
        var r = this.$.input.checkValidity();
        this.updateValidity_();
        return r;
      },

      setCustomValidity: function(message) {
        this.$.input.setCustomValidity(message);
        this.updateValidity_();
      }

    });
  ;

  (function() {

    Polymer('core-layout-grid', {

      nodes: null,
      layout: null,
      auto: false,

      created: function() {
        this.layout = [];
      },

      nodesChanged: function() {
        this.invalidate();
      },

      layoutChanged: function() {
        this.invalidate();
      },

      autoNodes: function() {
        this.nodes = this.parentNode.children.array().filter(
          function(node) {
            switch(node.localName) {
              case 'core-layout-grid':
              case 'style':
                return false;
            }
            return true;
          }
        );
      },

      invalidate: function() {
        if (this.layout && this.layout.length) {
          // job debounces layout, only letting it occur every N ms
          this.layoutJob = this.job(this.layoutJob, this.relayout);
        }
      },

      relayout: function() {
        if (!this.nodes || this.auto) {
          this.autoNodes();
        }
        layout(this.layout, this.nodes);
        this.asyncFire('core-layout');
      }

    });

    //

    var lineParent;

    function line(axis, p, d) {
      var l = document.createElement('line');
      var extent = (axis === 'left' ? 'width' : 
        (axis === 'top' ? 'height' : axis));
      l.setAttribute('extent', extent);
      if (d < 0) {
        axis = (axis === 'left' ? 'right' : 
          (axis === 'top' ? 'bottom' : axis));
      }
      p = Math.abs(p);
      l.style[axis] = p + 'px';
      l.style[extent] = '0px';
      lineParent.appendChild(l);
    }

    var colCount, colOwners, rowCount, rowOwners;

    function matrixillate(matrix) {
      // mesaure the matrix, must be rectangular
      rowCount = matrix.length;
      colCount = rowCount && matrix[0].length || 0;
      // transpose matrix
      var transpose = [];
      for (var i=0; i<colCount; i++) {
        var c = [];
        for (var j=0; j<rowCount; j++) {
          c.push(matrix[j][i]);
        }
        transpose.push(c);
      }
      // assign sizing control
      colOwners = findOwners(matrix);
      rowOwners = findOwners(transpose);
      //console.log('colOwners', colOwners);
      //console.log('rowOwners', rowOwners);
    }

    function findOwners(matrix) {
      var majCount = matrix.length;
      var minCount = majCount && matrix[0].length || 0;
      var owners = [];
      // for each column (e.g.)
      for (var i=0; i<minCount; i++) {
        // array of contained areas
        var contained = {};
        // look at each row to find a containing area
        for (var j=0; j<majCount; j++) {
          // get the row vector
          var vector = matrix[j]
          // node index at [i,j]
          var nodei = vector[i];
          // if a node is there
          if (nodei) {
            // determine if it bounds this column
            var owns = false;
            if (i === 0) {
              owns = (i === minCount-1) || (nodei !== vector[i+1]);
            } else if (i === minCount - 1) {
              owns = (i === 0) || (nodei !== vector[i-1]);
            } else {
              owns = nodei !== vector[i-1] && nodei !== vector[i+1];
            }
            if (owns) {
              contained[nodei] = 1;
            }
          }
          // store the owners for this column
          owners[i] = contained;
        }
      }
      return owners;
    }

    var nodes;

    function colWidth(i) {
      for (var col in colOwners[i]) {
        col = Number(col);
        if (col === 0) {
          return 96;
        }
        var node = nodes[col - 1];
        if (node.hasAttribute('h-flex') || node.hasAttribute('flex')) {
          return -1;
        }
        var w = node.offsetWidth;
        //console.log('colWidth(' + i + ') ==', w);
        return w;
      }
      return -1;
    }

    function rowHeight(i) {
      for (var row in rowOwners[i]) {
        row = Number(row);
        if (row === 0) {
          return 96;
        }
        var node = nodes[row - 1];
        if (node.hasAttribute('v-flex') || node.hasAttribute('flex')) {
          return -1;
        }
        var h = node.offsetHeight;
        //console.log('rowHeight(' + i + ') ==', h);
        return h;
      }
      return -1;
    }

    var m = 0;

    function railize(count, sizeFn) {
      //
      // create rails for `count` tracks using 
      // sizing function `sizeFn(trackNo)`
      //
      // for n tracks there are (n+1) rails
      //
      //   |track|track|track|
      //  0|->sz0|->sz1|<-sz2|0
      //
      //   |track|track|track|
      //  0|->sz0|     |<-sz2|0
      //
      // there can be one elastic track per set
      //
      //   |track|track|track|track|
      //  0|-->s0|-->s1|<--s1|<--s2|0
      //
      // sz1 spans multiple  tracks which makes
      // it elastic (it's underconstrained)
      //
      var rails = [];
      var a = 0;
      for (var i=0, x; i<count; i++) {
        rails[i] = {p: a, s: 1};
        x = sizeFn(i) + m + m;
        if (x == -1) {
          break;
        }
        a += x;
      }
      if (i === count) {
        rails[i] = {p: 0, s: -1};
      }
      var b = 0;
      for (var ii=count, x; ii>i; ii--) {
        rails[ii] = {p: b, s: -1};
        x = sizeFn(ii - 1) + m + m;
        if (x !== -1) {
          b += x;
        }
      }
      return rails;
    }

    // TODO(sjmiles): this code tries to preserve actual position,
    // so 'unposition' is really 'naturalize' or something
    function unposition(box) {
      var style = box.style;
      //style.right = style.bottom = style.width = style.height = '';
      style.position = 'absolute';
      style.display = 'inline-block';
      style.boxSizing = style.mozBoxSizing = 'border-box';
    }

    function _position(style, maj, min, ext, a, b) {
      style[maj] = style[min] = '';
      style[ext] = 'auto';
      if (a.s < 0 && b.s < 0) {
        var siz = a.p - b.p - m - m;
        style[ext] = siz + 'px';
        var c = 'calc(100% - ' + (b.p + siz + m) + 'px' + ')';
        style[maj] = '-webkit-' + c;
        style[maj] = c;
      } else if (b.s < 0) {
        style[maj] = a.p + m + 'px';
        style[min] = b.p + m + 'px';
      } else {
        style[maj] = a.p + m + 'px';
        style[ext] = b.p - a.p - m - m + 'px';
      }
    }

    function position(elt, left, right, top, bottom) {
      _position(elt.style, 'top', 'bottom', 'height', rows[top], 
          rows[bottom]);
      _position(elt.style, 'left', 'right', 'width', columns[left], 
          columns[right]);
    }

    function layout(matrix, anodes, alineParent) {
      //console.group('layout');

      lineParent = alineParent;
      nodes = anodes;
      matrixillate(matrix);

      nodes.forEach(unposition);

      columns = railize(colCount, colWidth);
      rows = railize(rowCount, rowHeight);

      if (alineParent) {
        //console.group('column rails');
        columns.forEach(function(c) {
          //console.log(c.p, c.s);
          line('left', c.p, c.s);
        });
        //console.groupEnd();

        //console.group('row rails');
        rows.forEach(function(r) {
          //console.log(r.p, r.s);
          line('top', r.p, r.s);
        });
        //console.groupEnd();
      }

      //console.group('rail boundaries');
      nodes.forEach(function(node, i) {
        // node indices are 1-based
        var n = i + 1;
        // boundary rails
        var l, r, t = 1e10, b = -1e10;
        matrix.forEach(function(vector, i) {
          var f = vector.indexOf(n);
          if (f > -1) {
            l = f;
            r = vector.lastIndexOf(n) + 1;
            t = Math.min(t, i);
            b = Math.max(b, i) + 1;
          }
        });
        if (l == undefined) {
          //console.log('unused');
          node.style.position = 'absolute';
          var offscreen = node.getAttribute('offscreen');
          switch (offscreen) {
            case 'basement':
              node.style.zIndex = 0;
              break;
            case 'left':
            case 'top':
              node.style[offscreen] = node.offsetWidth * -2 + 'px';
              break;
            case 'right':
              node.style.left = node.offsetParent.offsetWidth 
                  + node.offsetWidth + 'px';
              break;
            case 'bottom':
              node.style.top = node.parentNode.offsetHeight 
                  + node.offsetHeight + 'px';
              break;
            default:
              node.style[Math.random() >= 0.5 ? 'left' : 'top'] = '-110%';
          }
          //node.style.opacity = 0;
          node.style.pointerEvents = 'none';
        } else {
          node.style.pointerEvents = '';
          //node.style.opacity = '';
          //console.log(l, r, t, b);
          position(node, l, r, t, b);
        }
      });
      //console.groupEnd();
      //console.groupEnd();
    }

  })();
;


    Polymer('core-layout-trbl', {

      vertical: false,

      ready: function() {
        this.setAttribute('nolayout', '');
      },

      attached: function() {
        this.asyncMethod(function() {
          this.prepare();
          this.layout();
        });
      },

      prepare: function() {
        var parent = this.parentNode.host || this.parentNode;
        // explicit position harmful on <body>
        if (parent.localName !== 'body') {
        // may recalc
          var cs = window.getComputedStyle(parent);
          if (cs.position === 'static') {
            parent.style.position = 'relative';
          }
          //parent.style.overflow = 'hidden';
        }
        // changes will cause another recalc at next validation step
        var stylize = this.stylize, vertical;
        this.parentNode.childNodes.array().forEach(function(c, i) {
          if (c.nodeType === Node.ELEMENT_NODE && !c.hasAttribute('nolayout')) {
            stylize(c, {
              position: 'absolute',
              boxSizing: 'border-box',
              MozBoxSizing: 'border-box',
            });
            // test for auto-vertical
            if (vertical === undefined) {
              vertical = (c.offsetWidth == 0 && c.offsetHeight !== 0);
            }
          }
        });
        this.vertical = this.vertical || vertical;
      },

      /**
       * Arrange sibling nodes end-to-end in one dimension.
       *
       * Arrangement is horizontal unless the `vertical`
       * attribute is applied on this node.
       *
       * @method layout
       */
      layout: function() {
        var parent = this.parentNode.host || this.parentNode;
        var vertical = this.vertical;
        var ww = 0, hh = 0, pre = [], fit, post = [];
        var list = pre;
        // gather element information (at most one recalc)
        this.parentNode.childNodes.array().forEach(function(c, i) {
          if (c.nodeType===Node.ELEMENT_NODE && !c.hasAttribute('nolayout')) {
            var info = {
              element: c,
              w: c.offsetWidth,
              h: c.offsetHeight
            };
            if (!c.hasAttribute('fit') && !c.hasAttribute('flex')) {
              ww += c.offsetWidth;
              hh += c.offsetHeight;
              list.push(info);
            } else {
              fit = c;
              list = post;
              ww = hh = 0;
            }
          }
        });
        // update layout styles (invalidate, no recalc)
        var v = 0;
        var mxp = 0, myp = 0;
        var stylize = this.stylize;
        pre.forEach(function(info) {
          if (vertical) {
            stylize(info.element, {
              top: v + 'px', right: mxp, height: info.h + 'px', left: mxp
            });
          } else {
            stylize(info.element, {
              top: myp, width: info.w + 'px', bottom: myp, left: v + 'px'
            });
          }
          v += vertical ? info.h : info.w;
        });
        if (fit) {
          if (vertical) {
            stylize(fit, {
              top: v + 'px', right: mxp, bottom: hh + 'px', left: mxp
            });
          } else {
            stylize(fit, {
              top: myp, right: ww + 'px', bottom: myp, left: v + 'px'
            });
          }
          v = vertical ? hh : ww;
          post.forEach(function(info) {
            v -= vertical ? info.h : info.w;
            if (vertical) {
              stylize(info.element, {
                height: info.h + 'px', right: mxp, bottom: v + 'px', left: mxp
              });
            } else {
              stylize(info.element, {
                top: myp, right: v + 'px', bottom: myp, width: info.w + 'px'
              });
            }
          });
        }
      },

      stylize: function(element, styles) {
        var style = element.style;
        Object.keys(styles).forEach(function(k){
          style[k] = styles[k];
        });
      }

  });

  ;

(function() {

  Polymer('core-list', {
    
    publish: {
      /**
       * Fired when an item element is tapped.
       * 
       * @event core-activate
       * @param {Object} detail
       *   @param {Object} detail.item the item element
       */

      /**
       * 
       * An array of source data for the list to display.
       *
       * @attribute data
       * @type array
       * @default null
       */
      data: null,

      /**
       * 
       * An optional element on which to listen for scroll events.
       *
       * @attribute scrollTarget
       * @type Element
       * @default core-list
       */
      scrollTarget: null,

      /**
       * 
       * The height of a list item. `core-list` currently supports only fixed-height
       * list items. This height must be specified via the height property.
       *
       * @attribute height
       * @type number
       * @default 80
       */
      height: 80,

      /**
       * 
       * The number of extra items rendered above the minimum set required to
       * fill the list's height.
       *
       * @attribute extraItems
       * @type number
       * @default 30
       */
      extraItems: 30,

      /**
       * 
       * The property set on the list view data to represent selection state. 
       * This should set so that it does not conflict with other data properties.
       * Note, selection data is not stored on the data in given in the data property.
       *
       * @attribute selectedProperty
       * @type string
       * @default 'selected'
       */
      selectedProperty: 'selected',

      // TODO(sorvell): experimental
      /**
       * 
       * If true, data is sync'd from the list back to the list's data.
       *
       * @attribute sync
       * @type boolean
       * @default false
       */
      sync: false,

      /**
       * 
       * Set to true to support multiple selection.
       *
       * @attribute multi
       * @type boolean
       * @default false
       */
      multi: false

    },
    
    observe: {
      'data template scrollTarget': 'initialize'
    },

    ready: function() {
      this.clearSelection();
      this._boundScrollHandler = this.scrollHandler.bind(this);
    },

    attached: function() {
      this.template = this.querySelector('template');
    },

    // TODO(sorvell): it'd be nice to dispense with 'data' and just use 
    // template repeat's model. However, we need tighter integration
    // with TemplateBinding for this.
    initialize: function() {
      if (!this.data || !this.template) {
        return;
      }
      var target = this.scrollTarget || this;
      if (this._target !== target) {
        if (this._target) {
          this._target.removeEventListener('scroll', this._boundScrollHandler, false);
        }
        this._target = target;
        this._target.addEventListener('scroll', this._boundScrollHandler, false);
      }

      this.initializeViewport();
      this.initalizeData();
      this.onMutation(this, this.initializeItems);
    },

    // TODO(sorvell): need to handle resizing
    initializeViewport: function() {
      this.$.viewport.style.height = this.height * this.data.length + 'px';
      this._visibleCount = Math.ceil(this._target.offsetHeight / this.height);
      this._physicalCount = Math.min(this._visibleCount + this.extraItems,
          this.data.length);
      this._physicalHeight = this.height * this._physicalCount;
    },

    // TODO(sorvell): selection currently cannot be maintained when
    // items are added or deleted.
    initalizeData: function() {
      var exampleDatum = this.data[0] || {};
      this._propertyNames = Object.getOwnPropertyNames(exampleDatum);
      this._physicalData = new Array(this._physicalCount);
      for (var i = 0; i < this._physicalCount; ++i) {
        this._physicalData[i] = {};
        this.updateItem(i, i);
      }
      this.template.model = this._physicalData;
      this.template.setAttribute('repeat', '');
    },

    initializeItems: function() {
      this._physicalItems = new Array(this._physicalCount);
      for (var i = 0, item = this.template.nextElementSibling;
           item && i < this._physicalCount;
           ++i, item = item.nextElementSibling) {
        this._physicalItems[i] = item;
        item._transformValue = 0;
      }
      this.refresh(false);
    },

    updateItem: function(virtualIndex, physicalIndex) {
      var virtualDatum = this.data[virtualIndex];
      var physicalDatum = this._physicalData[physicalIndex];
      this.pushItemData(virtualDatum, physicalDatum);
      physicalDatum._physicalIndex = physicalIndex;
      physicalDatum._virtualIndex = virtualIndex;
      if (this.selectedProperty) {
        physicalDatum[this.selectedProperty] = this._selectedData.get(virtualDatum);
      }
    },

    pushItemData: function(source, dest) {
      for (var i = 0; i < this._propertyNames.length; ++i) {
        var propertyName = this._propertyNames[i];
        dest[propertyName] = source[propertyName];
      }
    },

    // experimental: push physical data back to this.data.
    // this is optional when scrolling and needs to be called at other times.
    syncData: function() {
      if (this.firstPhysicalIndex === undefined || 
          this.baseVirtualIndex === undefined) {
        return;
      }
      var p, v;
      for (var i = 0; i < this.firstPhysicalIndex; ++i) {
        p = this._physicalData[i];
        v = this.data[this.baseVirtualIndex + this._physicalCount + i];
        this.pushItemData(p, v);
      }
      for (var i = this.firstPhysicalIndex; i < this._physicalCount; ++i) {
        p = this._physicalData[i];
        v = this.data[this.baseVirtualIndex + i];
        this.pushItemData(p, v);
      }
    },

    scrollHandler: function(e, detail) {
      this._scrollTop = e.detail ? e.detail.target.scrollTop : e.target.scrollTop;
      this.refresh(false);
    },

    /**
     * Refresh the list at the current scroll position.
     *
     * @method refresh
     */
    refresh: function(force) {
      var firstVisibleIndex = Math.floor(this._scrollTop / this.height);
      var visibleMidpoint = firstVisibleIndex + this._visibleCount / 2;

      var firstReifiedIndex = Math.max(0, Math.floor(visibleMidpoint - 
          this._physicalCount / 2));
      firstReifiedIndex = Math.min(firstReifiedIndex, this.data.length - 
          this._physicalCount);

      var firstPhysicalIndex = firstReifiedIndex % this._physicalCount;
      var baseVirtualIndex = firstReifiedIndex - firstPhysicalIndex;

      var baseTransformValue = Math.floor(this.height * baseVirtualIndex);
      var nextTransformValue = Math.floor(baseTransformValue + 
          this._physicalHeight);

      var baseTransformString = 'translate3d(0,' + baseTransformValue + 'px,0)';
      var nextTransformString = 'translate3d(0,' + nextTransformValue + 'px,0)';
      // TODO(sorvell): experiemental for sync'ing back to virtual data.
      if (this.sync) {
        this.syncData();
      }
      this.firstPhysicalIndex = firstPhysicalIndex;
      this.baseVirtualIndex = baseVirtualIndex;

      for (var i = 0; i < firstPhysicalIndex; ++i) {
        var item = this._physicalItems[i];
        if (force || item._transformValue != nextTransformValue) {
          this.updateItem(baseVirtualIndex + this._physicalCount + i, i);
          setTransform(item, nextTransformString, nextTransformValue);
        }
      }
      for (var i = firstPhysicalIndex; i < this._physicalCount; ++i) {
        var item = this._physicalItems[i];
        if (force || item._transformValue != baseTransformValue) {
          this.updateItem(baseVirtualIndex + i, i);
          setTransform(item, baseTransformString, baseTransformValue);
        }
      }
    },

    // list selection
    tapHandler: function(e) {
      if (e.target === this) {
        return;
      }
      if (this.sync) {
        this.syncData();
      }
      var n = e.target;
      var model = n.templateInstance && n.templateInstance.model;
      if (model) {
        var vi = model._virtualIndex, pi = model._physicalIndex;
        var data = this.data[vi], item = this._physicalItems[pi];
        this.$.selection.select(data);
        this.asyncFire('core-activate', {data: data, item: item});
      }
    },

    selectedHandler: function(e, detail) {
      if (this.selectedProperty) {
        var i$ = this.indexesForData(detail.item);
        // TODO(sorvell): we should be relying on selection to store the
        // selected data but we want to optimize for lookup.
        this._selectedData.set(detail.item, detail.isSelected);
        if (i$.physical >= 0) {
          this.updateItem(i$.virtual, i$.physical);
        }
      }
    },

    /**
     * Select the list item at the given index.
     *
     * @method selectItem
     * @param {number} index 
     */
    selectItem: function(index) {
      var data = this.data[index];
      if (data) {
        this.$.selection.select(data);
      }
    },

    /**
     * Set the selected state of the list item at the given index.
     *
     * @method setItemSelected
     * @param {number} index 
     * @param {boolean} isSelected 
     */
    setItemSelected: function(index, isSelected) {
      var data = this.data[index];
      if (data) {
        this.$.selection.setItemSelected(data, isSelected);
      }
    },

    indexesForData: function(data) {
      var virtual = this.data.indexOf(data);
      var physical = this.virtualToPhysicalIndex(virtual);
      return { virtual: virtual, physical: physical };
    },

    virtualToPhysicalIndex: function(index) {
      for (var i=0, l=this._physicalData.length; i<l; i++) {
        if (this._physicalData[i]._virtualIndex === index) {
          return i;
        }
      }
      return -1;
    },

    get selection() {
      return this.$.selection.getSelection();
    },

    selectedChanged: function() {
      this.$.selection.select(this.selected);
    },

    clearSelection: function() {
      this._selectedData = new WeakMap();
      if (this.multi) {
        var s$ = this.selection;
        for (var i=0, l=s$.length, s; (i<l) && (s=s$[i]); i++) {
          this.$.selection.setItemSelected(s, false);
        }
      } else {
        this.$.selection.setItemSelected(this.selection, false);
      }
      this.$.selection.clear();
    },

    scrollToItem: function(index) {
      this.scrollTop = index * this.height;
    }

  });

  // determine proper transform mechanizm
  if (document.documentElement.style.transform !== undefined) {
    function setTransform(element, string, value) {
      element.style.transform = string;
      element._transformValue = value;
    }
  } else {
    function setTransform(element, string, value) {
      element.style.webkitTransform = string;
      element._transformValue = value;
    }
  }

})();
;


  Polymer('core-localstorage', {
    
    /**
     * Fired when a value is loaded from localStorage.
     * @event core-localstorage-load
     */
     
    /**
     * The key to the data stored in localStorage.
     *
     * @attribute name
     * @type string
     * @default null
     */
    name: '',
    
    /**
     * The data associated with the specified name.
     *
     * @attribute value
     * @type object
     * @default null
     */
    value: null,
    
    /**
     * If true, the value is stored and retrieved without JSON processing.
     *
     * @attribute useRaw
     * @type boolean
     * @default false
     */
    useRaw: false,
    
    /**
     * If true, auto save is disabled.
     *
     * @attribute autoSaveDisabled
     * @type boolean
     * @default false
     */
    autoSaveDisabled: false,
    
    attached: function() {
      // wait for bindings are all setup
      this.async('load');
    },
    
    valueChanged: function() {
      if (this.loaded && !this.autoSaveDisabled) {
        this.save();
      }
    },
    
    load: function() {
      var v = localStorage.getItem(this.name);
      if (this.useRaw) {
        this.value = v;
      } else {
        // localStorage has a flaw that makes it difficult to determine
        // if a key actually exists or not (getItem returns null if the
        // key doesn't exist, which is not distinguishable from a stored
        // null value)
        // however, if not `useRaw`, an (unparsed) null value unambiguously
        // signals that there is no value in storage (a stored null value would
        // be escaped, i.e. "null")
        // in this case we save any non-null current (default) value
        if (v === null) {
          if (this.value !== null) {
            this.save();
          }
        } else {
          try {
            v = JSON.parse(v);
          } catch(x) {
          }
          this.value = v;
        }
      }
      this.loaded = true;
      this.asyncFire('core-localstorage-load');
    },
    
    /** 
     * Saves the value to localStorage.
     *
     * @method save
     */
    save: function() {
      var v = this.useRaw ? this.value : JSON.stringify(this.value);
      localStorage.setItem(this.name, v);
    }
    
  });

;


  Polymer('core-submenu', {

    publish: {
      active: {value: false, reflect: true}
    },

    opened: false,

    get items() {
      return this.$.submenu.items;
    },

    hasItems: function() {
      return !!this.items.length;
    },

    unselectAllItems: function() {
      this.$.submenu.selected = null;
      this.$.submenu.clearSelection();
    },

    activeChanged: function() {
      if (this.hasItems()) {
        this.opened = this.active;
      }
      if (!this.active) {
        this.unselectAllItems();
      }
    },
    
    toggle: function() {
      this.opened = !this.opened;
    },

    activate: function() {
      if (this.hasItems() && this.active) {
        this.toggle();
        this.unselectAllItems();
      }
    }
    
  });

;

    Polymer('core-menu-button', {
      /**
       * The icon to display.
       * @attribute icon
       * @type string
       */
      icon: 'dots',
      src: '',
      /**
       * The index of the selected menu item.
       * @attribute selected
       * @type number
       */
      selected: '',
      /**
       * Set to true to open the menu.
       * @attribute opened
       * @type boolean
       */
      opened: false,
      /**
       * Set to true to cause the menu popup to be displayed inline rather 
       * than in its own layer.
       * @attribute inlineMenu
       * @type boolean
       */
      inlineMenu: false,
      /**
       * Horizontally align the overlay with the button. Accepted values are
       * ["left", "center", "right"].
       * @attribute halign
       * @type string
       */
      halign: 'center',
      /**
       * Display the overlay on top or below the button. Accepted values are
       * ["top", "bottom"].
       * @attribute valign
       * @type string
       */
      valign: 'bottom',
      multi: false,
      closeAction: function() {
        this.opened = false;
      },
      /**
       * Toggle the opened state of the dropdown.
       * @method toggle
       */
      toggle: function() {
        this.opened = !this.opened;
      },
      /**
       * The selected menu item.
       * @property selection
       * @type Node
       */
      get selection() {
        return this.$.menu.selection;
      }
    });
  ;
Polymer('core-pages');;


  Polymer('core-range', {
    
    /**
     * The number that represents the current value.
     *
     * @attribute value
     * @type number
     * @default 0
     */
    value: 0,
    
    /**
     * The number that indicates the minimum value of the range.
     *
     * @attribute min
     * @type number
     * @default 0
     */
    min: 0,
    
    /**
     * The number that indicates the maximum value of the range.
     *
     * @attribute max
     * @type number
     * @default 100
     */
    max: 100,
    
    /**
     * Specifies the value granularity of the range's value.
     *
     * @attribute step
     * @type number
     * @default 1
     */
    step: 1,
    
    /**
     * Returns the ratio of the value.
     *
     * @attribute ratio
     * @type number
     * @default 0
     */
    ratio: 0,
    
    observe: {
      'value min max step': 'update'
    },
    
    calcRatio: function(value) {
      return (this.clampValue(value) - this.min) / (this.max - this.min);
    },
    
    clampValue: function(value) {
      return Math.min(this.max, Math.max(this.min, this.calcStep(value)));
    },
    
    calcStep: function(value) {
      return this.step ? (Math.round(value / this.step) / (1 / this.step)) : value;
    },
    
    validateValue: function() {
      var v = this.clampValue(this.value);
      this.value = this.oldValue = isNaN(v) ? this.oldValue : v;
      return this.value !== v;
    },
    
    update: function() {
      this.validateValue();
      this.ratio = this.calcRatio(this.value) * 100;
    }
    
  });
  
;


  Polymer('core-scaffold', {
    
    publish: {
      /**
       * When the browser window size is smaller than the `responsiveWidth`, 
       * `core-drawer-panel` changes to a narrow layout. In narrow layout, 
       * the drawer will be stacked on top of the main panel.
       *
       * @attribute responsiveWidth
       * @type string
       * @default '600px'
       */    
      responsiveWidth: '600px',
  
      /**
       * Used to control the header and scrolling behaviour of `core-header-panel`
       *
       * @attribute mode
       * @type string
       * @default 'seamed'
       */     
      mode: {value: 'seamed', reflect: true}
    },

    /**
      * Toggle the drawer panel
      * @method togglePanel
      */    
    togglePanel: function() {
      this.$.drawerPanel.togglePanel();
    },

    /**
      * Open the drawer panel
      * @method openDrawer
      */      
    openDrawer: function() {
      this.$.drawerPanel.openDrawer();
    },

    /**
      * Close the drawer panel
      * @method closeDrawer
      */     
    closeDrawer: function() {
      this.$.drawerPanel.closeDrawer();
    }
    
  });

;


  Polymer('core-scroll-header-panel', {
    
    /**
     * Fired when the content has been scrolled.
     *
     * @event scroll
     */
     
    /**
     * Fired when the header is transformed.
     *
     * @event core-header-transform
     */
     
    publish: {
      /**
       * If true, the header's height will condense to `_condensedHeaderHeight`
       * as the user scrolls down from the top of the content area.
       *
       * @attribute condenses
       * @type boolean
       * @default false
       */
      condenses: false,

      /**
       * If true, no cross-fade transition from one background to another.
       *
       * @attribute noDissolve
       * @type boolean
       * @default false
       */
      noDissolve: false,

      /**
       * If true, the header doesn't slide back in when scrolling back up.
       *
       * @attribute noReveal
       * @type boolean
       * @default false
       */
      noReveal: false,

      /**
       * If true, the header is fixed to the top and never moves away.
       *
       * @attribute fixed
       * @type boolean
       * @default false
       */
      fixed: false,
      
      /**
       * If true, the condensed header is always shown and does not move away.
       *
       * @attribute keepCondensedHeader
       * @type boolean
       * @default false
       */
      keepCondensedHeader: false,

      /**
       * The height of the header when it is at its full size.
       *
       * By default, the height will be measured when it is ready.  If the height
       * changes later the user needs to either set this value to reflect the
       * new height or invoke `measureHeaderHeight()`.
       *
       * @attribute headerHeight
       * @type number
       */
      headerHeight: 0,

      /**
       * The height of the header when it is condensed.
       *
       * By default, `_condensedHeaderHeight` is 1/3 of `headerHeight` unless
       * this is specified.
       *
       * @attribute condensedHeaderHeight
       * @type number
       */
      condensedHeaderHeight: 0
    },

    prevScrollTop: 0,
    
    headerMargin: 0,
    
    y: 0,
    
    observe: {
      'headerMargin fixed': 'setup'
    },
    
    domReady: function() {
      this.async('measureHeaderHeight');
    },

    get header() {
      return this.$.headerContent.getDistributedNodes()[0];
    },
    
    get scroller() {
      return this.$.mainContainer;
    },
    
    measureHeaderHeight: function() {
      var header = this.header;
      if (this.header) {
        this.headerHeight = header.offsetHeight;
      }
    },
    
    headerHeightChanged: function() {
      if (!this.condensedHeaderHeight) {
        // assume _condensedHeaderHeight is 1/3 of the headerHeight
        this._condensedHeaderHeight = this.headerHeight * 1 / 3;
      }
      this.condensedHeaderHeightChanged();
    },
    
    condensedHeaderHeightChanged: function() {
      if (this.condensedHeaderHeight) {
        this._condensedHeaderHeight = this.condensedHeaderHeight;
      }
      if (this.headerHeight) {
        this.headerMargin = this.headerHeight - this._condensedHeaderHeight;
      }
    },
    
    condensesChanged: function() {
      if (this.condenses) {
        this.scroll();
      } else {
        // reset transform/opacity set on the header
        this.condenseHeader(null);
      }
    },
    
    setup: function() {
      var s = this.scroller.style;
      s.paddingTop = this.fixed ? '' : this.headerHeight + 'px';
      s.top = this.fixed ? this.headerHeight + 'px' : '';
      if (this.fixed) {
        this.transformHeader(null);
      } else {
        this.scroll();
      }
    },
    
    transformHeader: function(y) {
      var s = this.$.headerContainer.style;
      this.translateY(s, -y);
      
      if (this.condenses) {
        this.condenseHeader(y);
      }
      
      this.fire('core-header-transform', {y: y, height: this.headerHeight, 
          condensedHeight: this._condensedHeaderHeight});
    },
    
    condenseHeader: function(y) {
      var reset = y == null;
      // adjust top bar in core-header so the top bar stays at the top
      if (this.header.$ && this.header.$.topBar) {
        this.translateY(this.header.$.topBar.style, 
            reset ? null : Math.min(y, this.headerMargin));
      }
      // transition header bg
      var hbg = this.$.headerBg.style;
      if (!this.noDissolve) {
        hbg.opacity = reset ? '' : (this.headerMargin - y) / this.headerMargin;
      }
      // adjust header bg so it stays at the center
      this.translateY(hbg, reset ? null : y / 2);
      // transition condensed header bg
      var chbg = this.$.condensedHeaderBg.style;
      if (!this.noDissolve) {
        chbg = this.$.condensedHeaderBg.style;
        chbg.opacity = reset ? '' : y / this.headerMargin;
        // adjust condensed header bg so it stays at the center
        this.translateY(chbg, reset ? null : y / 2);
      }
    },
    
    translateY: function(s, y) {
      s.transform = s.webkitTransform = y == null ? '' : 
          'translate3d(0, ' + y + 'px, 0)';
    },
    
    scroll: function(event) {
      if (!this.header) {
        return;
      }
      
      var sTop = this.scroller.scrollTop;
      
      var y = Math.min(this.keepCondensedHeader ? 
          this.headerMargin : this.headerHeight, Math.max(0, 
          (this.noReveal ? sTop : this.y + sTop - this.prevScrollTop)));
      
      if (this.condenses && this.prevScrollTop >= sTop && sTop > this.headerMargin) {
        y = Math.max(y, this.headerMargin);
      }
      
      if (!event || !this.fixed && y !== this.y) {
        requestAnimationFrame(this.transformHeader.bind(this, y));
      }
      
      this.prevScrollTop = sTop;
      this.y = y;
      
      if (event) {
        this.fire('scroll', {target: this.scroller}, this, false);
      }
    }

  });

;

(function() {
  
  Polymer('core-shared-lib',{
    
    notifyEvent: 'core-shared-lib-load',
    
    ready: function() {
      if (!this.url && this.defaultUrl) {
        this.url = this.defaultUrl;
      }
    },
    
    urlChanged: function() {
      require(this.url, this, this.callbackName);
    },
    
    provide: function() {
      this.async('notify');
    },
    
    notify: function() {
      this.fire(this.notifyEvent, arguments);
    }
    
  });

  var apiMap = {};
  
  function require(url, notifiee, callbackName) {
    // make hashable string form url
    var name = nameFromUrl(url);
    // lookup existing loader instance
    var loader = apiMap[name];
    // create a loader as needed
    if (!loader) {
      loader = apiMap[name] = new Loader(name, url, callbackName);
    }
    loader.requestNotify(notifiee);
  }
  
  function nameFromUrl(url) {
    return url.replace(/[\:\/\%\?\&\.\=\-]/g, '_') + '_api';
  }

  var Loader = function(name, url, callbackName) {
    this.instances = [];
    this.callbackName = callbackName;
    if (this.callbackName) {
      window[this.callbackName] = this.success.bind(this);
    } else {
      if (url.indexOf(this.callbackMacro) >= 0) {
        this.callbackName = name + '_loaded';
        window[this.callbackName] = this.success.bind(this);
        url = url.replace(this.callbackMacro, this.callbackName);
      } else {
        // TODO(sjmiles): we should probably fallback to listening to script.load
        throw 'core-shared-api: a %%callback%% parameter is required in the API url';
      }
    }
    //
    this.addScript(url);
  };
  
  Loader.prototype = {
    
    callbackMacro: '%%callback%%',
    loaded: false,
    
    addScript: function(src) {
      var script = document.createElement('script');
      script.src = src;
      script.onerror = this.error.bind(this);
      var s = document.querySelector('script');
      s.parentNode.insertBefore(script, s);
      this.script = script;
    },
    
    removeScript: function() {
      if (this.script.parentNode) {
        this.script.parentNode.removeChild(this.script);
      }
      this.script = null;
    },
    
    error: function() {
      this.cleanup();
    },
    
    success: function() {
      this.loaded = true;
      this.cleanup();
      this.result = Array.prototype.slice.call(arguments);
      this.instances.forEach(this.provide, this);
      this.instances = null;
    },
    
    cleanup: function() {
      delete window[this.callbackName];
    },

    provide: function(instance) {
      instance.notify(instance, this.result);
    },
    
    requestNotify: function(instance) {
      if (this.loaded) {
        this.provide(instance);
      } else {
        this.instances.push(instance);
      }
    }
    
  };
  
})();
;

(function(){
  
  Polymer('core-signals',{
    attached: function() {
      signals.push(this);
    },
    removed: function() {
      var i = signals.indexOf(this);
      if (i >= 0) {
        signals.splice(i, 1);
      }
    }
  });

  // private shared database
  var signals = [];

  // signal dispatcher
  function notify(name, data) {
    // convert generic-signal event to named-signal event
    var signal = new CustomEvent('core-signal-' + name, {
      // if signals bubble, it's easy to get confusing duplicates
      // (1) listen on a container on behalf of local child
      // (2) some deep child ignores the event and it bubbles 
      //     up to said container
      // (3) local child event bubbles up to container
      // also, for performance, we avoid signals flying up the
      // tree from all over the place
      bubbles: false,
      detail: data
    });
    // dispatch named-signal to all 'signals' instances,
    // only interested listeners will react
    signals.forEach(function(s) {
      s.dispatchEvent(signal);
    });
  }

  // signal listener at document
  document.addEventListener('core-signal', function(e) {
    notify(e.detail.name, e.detail.data);
  });
  
})();
;


  Polymer('core-splitter', {

    /**
     * Possible values are "left", "right", "up" and "down".
     *
     * @attribute direction
     * @type string
     * @default 'left'
     */
    direction: 'left',

    /**
     * Minimum width to which the splitter target can be sized
     *
     * @attribute minSize
     * @type number
     * @default 0
     */
    minSize: 0,

    /**
     * Locks the split bar so it can't be dragged.
     *
     * @attribute locked
     * @type boolean
     * @default false
     */
    locked: false,

    /**
     * By default the parent and siblings of the splitter are set to overflow hidden. This helps
     * avoid elements bleeding outside the splitter regions. Set this property to true to allow
     * these elements to overflow.
     *
     * @attribute allowOverflow
     * @type boolean
     * @default false
     */
    allowOverflow: false,

    ready: function() {
      this.directionChanged();
    },

    domReady: function() {
      if (!this.allowOverflow) {
        this.parentNode.style.overflow = this.nextElementSibling.style.overflow =
            this.previousElementSibling.style.overflow = 'hidden';
      }
    },

    directionChanged: function() {
      this.isNext = this.direction === 'right' || this.direction === 'down';
      this.horizontal = this.direction === 'up' || this.direction === 'down';
      this.update();
    },

    update: function() {
      this.target = this.isNext ? this.nextElementSibling : this.previousElementSibling;
      this.dimension = this.horizontal ? 'height' : 'width';
      this.classList.toggle('horizontal', this.horizontal);
    },

    targetChanged: function(old) {
      if (old) {
        old.style[old.__splitterMinSize] = '';
      }
      var min = this.target.__splitterMinSize = this.horizontal ? 'minHeight' : 'minWidth';
      this.target.style[min] = this.minSize + 'px';
    },

    trackStart: function() {
      this.update();
      this.size = parseInt(getComputedStyle(this.target)[this.dimension]);
    },

    track: function(e) {
      if (this.locked) {
        return;
      }
      var d = e[this.horizontal ? 'dy' : 'dx'];
      this.target.style[this.dimension] =
          this.size + (this.isNext ? -d : d) + 'px';
    },

    preventSelection: function(e) {
      e.preventDefault();
    }
  });

;


  Polymer('core-tooltip', {

    /**
     * A simple string label for the tooltip to display. To display a rich
     * that includes HTML, use the `tip` attribute on the content.
     *
     * @attribute label
     * @type string
     * @default null
     */
    label: null,

    /**
     * If true, the tooltip an arrow pointing towards the content.
     *
     * @attribute noarrow
     * @type boolean
     * @default false
     */
    noarrow: false,

    /**
     * If true, the tooltip displays by default.
     *
     * @attribute show
     * @type boolean
     * @default false
     */
    show: false,

    /**
     * Positions the tooltip to the top, right, bottom, left of its content.
     *
     * @attribute position
     * @type string
     * @default 'bottom'
     */
    position: 'bottom',

    attached: function() {
      this.setPosition();
    },

    labelChanged: function(oldVal, newVal) {
      // Run if we're not after attached().
      if (oldVal) {
        this.setPosition();
      }
    },

    setPosition: function() {
      var controlWidth = this.clientWidth;
      var controlHeight = this.clientHeight;

      var styles = getComputedStyle(this.$.tooltip);
      var toolTipWidth = parseFloat(styles.width);
      var toolTipHeight = parseFloat(styles.height);

      switch (this.position) {
        case 'top':
        case 'bottom':
          this.$.tooltip.style.left = (controlWidth - toolTipWidth) / 2 + 'px';
          break;
        case 'left':
        case 'right':
          this.$.tooltip.style.top = (controlHeight - toolTipHeight) / 2 + 'px';
          break;
      }
    }
  });

;

    Polymer('paper-focusable', {

      publish: {

        /**
         * If true, the button is currently active either because the
         * user is holding down the button, or the button is a toggle
         * and is currently in the active state.
         *
         * @attribute active
         * @type boolean
         * @default false
         */
        active: {value: false, reflect: true},

        /**
         * If true, the element currently has focus due to keyboard
         * navigation.
         *
         * @attribute focused
         * @type boolean
         * @default false
         */
        focused: {value: false, reflect: true},

        /**
         * If true, the user is currently holding down the button.
         *
         * @attribute pressed
         * @type boolean
         * @default false
         */
        pressed: {value: false, reflect: true},

        /**
         * If true, the user cannot interact with this element.
         *
         * @attribute disabled
         * @type boolean
         * @default false
         */
        disabled: {value: false, reflect: true},

        /**
         * If true, the button toggles the active state with each tap.
         * Otherwise, the button becomes active when the user is holding
         * it down.
         *
         * @attribute isToggle
         * @type boolean
         * @default false
         */
        isToggle: {value: false, reflect: false}

      },

      disabledChanged: function() {
        if (this.disabled) {
          this.removeAttribute('tabindex');
        } else {
          this.setAttribute('tabindex', 0);
        }
      },

      downAction: function() {
        this.pressed = true;
        this.focused = false;

        if (this.isToggle) {
          this.active = !this.active;
        } else {
          this.active = true;
        }
      },

      // Pulling up the context menu for an item should focus it; but we need to
      // be careful about how we deal with down/up events surrounding context
      // menus. The up event typically does not fire until the context menu
      // closes: so we focus immediately.
      //
      // This fires _after_ downAction.
      contextMenuAction: function(e) {
        // Note that upAction may fire _again_ on the actual up event.
        this.upAction(e);
        this.focusAction();
      },

      upAction: function() {
        this.pressed = false;

        if (!this.isToggle) {
          this.active = false;
        }
      },

      focusAction: function() {
        if (!this.pressed) {
          // Only render the "focused" state if the element gains focus due to
          // keyboard navigation.
          this.focused = true;
        }
      },

      blurAction: function() {
        this.focused = false;
      }

    });

  ;


  (function() {

    var waveMaxRadius = 150;
    //
    // INK EQUATIONS
    //
    function waveRadiusFn(touchDownMs, touchUpMs, anim) {
      // Convert from ms to s.
      var touchDown = touchDownMs / 1000;
      var touchUp = touchUpMs / 1000;
      var totalElapsed = touchDown + touchUp;
      var ww = anim.width, hh = anim.height;
      // use diagonal size of container to avoid floating point math sadness
      var waveRadius = Math.min(Math.sqrt(ww * ww + hh * hh), waveMaxRadius) * 1.1 + 5;
      var duration = 1.1 - .2 * (waveRadius / waveMaxRadius);
      var tt = (totalElapsed / duration);

      var size = waveRadius * (1 - Math.pow(80, -tt));
      return Math.abs(size);
    }

    function waveOpacityFn(td, tu, anim) {
      // Convert from ms to s.
      var touchDown = td / 1000;
      var touchUp = tu / 1000;
      var totalElapsed = touchDown + touchUp;

      if (tu <= 0) {  // before touch up
        return anim.initialOpacity;
      }
      return Math.max(0, anim.initialOpacity - touchUp * anim.opacityDecayVelocity);
    }

    function waveOuterOpacityFn(td, tu, anim) {
      // Convert from ms to s.
      var touchDown = td / 1000;
      var touchUp = tu / 1000;

      // Linear increase in background opacity, capped at the opacity
      // of the wavefront (waveOpacity).
      var outerOpacity = touchDown * 0.3;
      var waveOpacity = waveOpacityFn(td, tu, anim);
      return Math.max(0, Math.min(outerOpacity, waveOpacity));
    }

    // Determines whether the wave should be completely removed.
    function waveDidFinish(wave, radius, anim) {
      var waveOpacity = waveOpacityFn(wave.tDown, wave.tUp, anim);
      // If the wave opacity is 0 and the radius exceeds the bounds
      // of the element, then this is finished.
      if (waveOpacity < 0.01 && radius >= Math.min(wave.maxRadius, waveMaxRadius)) {
        return true;
      }
      return false;
    };

    function waveAtMaximum(wave, radius, anim) {
      var waveOpacity = waveOpacityFn(wave.tDown, wave.tUp, anim);
      if (waveOpacity >= anim.initialOpacity && radius >= Math.min(wave.maxRadius, waveMaxRadius)) {
        return true;
      }
      return false;
    }

    //
    // DRAWING
    //
    function drawRipple(ctx, x, y, radius, innerColor, outerColor) {
      if (outerColor) {
        ctx.fillStyle = outerColor;
        ctx.fillRect(0,0,ctx.canvas.width, ctx.canvas.height);
      }
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
      ctx.fillStyle = innerColor;
      ctx.fill();
    }

    //
    // SETUP
    //
    function createWave(elem) {
      var elementStyle = window.getComputedStyle(elem);
      var fgColor = elementStyle.color;

      var wave = {
        waveColor: fgColor,
        maxRadius: 0,
        isMouseDown: false,
        mouseDownStart: 0.0,
        mouseUpStart: 0.0,
        tDown: 0,
        tUp: 0
      };
      return wave;
    }

    function removeWaveFromScope(scope, wave) {
      if (scope.waves) {
        var pos = scope.waves.indexOf(wave);
        scope.waves.splice(pos, 1);
      }
    };

    // Shortcuts.
    var pow = Math.pow;
    var now = Date.now;
    if (window.performance && performance.now) {
      now = performance.now.bind(performance);
    }

    function cssColorWithAlpha(cssColor, alpha) {
        var parts = cssColor.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        if (typeof alpha == 'undefined') {
            alpha = 1;
        }
        if (!parts) {
          return 'rgba(255, 255, 255, ' + alpha + ')';
        }
        return 'rgba(' + parts[1] + ', ' + parts[2] + ', ' + parts[3] + ', ' + alpha + ')';
    }

    function dist(p1, p2) {
      return Math.sqrt(pow(p1.x - p2.x, 2) + pow(p1.y - p2.y, 2));
    }

    function distanceFromPointToFurthestCorner(point, size) {
      var tl_d = dist(point, {x: 0, y: 0});
      var tr_d = dist(point, {x: size.w, y: 0});
      var bl_d = dist(point, {x: 0, y: size.h});
      var br_d = dist(point, {x: size.w, y: size.h});
      return Math.max(tl_d, tr_d, bl_d, br_d);
    }

    Polymer('paper-ripple', {

      /**
       * The initial opacity set on the wave.
       *
       * @attribute initialOpacity
       * @type number
       * @default 0.25
       */
      initialOpacity: 0.25,

      /**
       * How fast (opacity per second) the wave fades out.
       *
       * @attribute opacityDecayVelocity
       * @type number
       * @default 0.8
       */
      opacityDecayVelocity: 0.8,

      backgroundFill: true,
      pixelDensity: 2,

      eventDelegates: {
        down: 'downAction',
        up: 'upAction'
      },

      attached: function() {
        // create the canvas element manually becase ios
        // does not render the canvas element if it is not created in the
        // main document (component templates are created in a
        // different document). See:
        // https://bugs.webkit.org/show_bug.cgi?id=109073.
        if (!this.$.canvas) {
          var canvas = document.createElement('canvas');
          canvas.id = 'canvas';
          this.shadowRoot.appendChild(canvas);
          this.$.canvas = canvas;
        }
      },

      ready: function() {
        this.waves = [];
      },

      setupCanvas: function() {
        this.$.canvas.setAttribute('width', this.$.canvas.clientWidth * this.pixelDensity + "px");
        this.$.canvas.setAttribute('height', this.$.canvas.clientHeight * this.pixelDensity + "px");
        var ctx = this.$.canvas.getContext('2d');
        ctx.scale(this.pixelDensity, this.pixelDensity);
        if (!this._loop) {
          this._loop = this.animate.bind(this, ctx);
        }
      },

      downAction: function(e) {
        this.setupCanvas();
        var wave = createWave(this.$.canvas);

        this.cancelled = false;
        wave.isMouseDown = true;
        wave.tDown = 0.0;
        wave.tUp = 0.0;
        wave.mouseUpStart = 0.0;
        wave.mouseDownStart = now();

        var width = this.$.canvas.width / 2; // Retina canvas
        var height = this.$.canvas.height / 2;
        var rect = this.getBoundingClientRect();
        var touchX = e.x - rect.left;
        var touchY = e.y - rect.top;

        wave.startPosition = {x:touchX, y:touchY};

        if (this.classList.contains("recenteringTouch")) {
          wave.endPosition = {x: width / 2,  y: height / 2};
          wave.slideDistance = dist(wave.startPosition, wave.endPosition);
        }
        wave.containerSize = Math.max(width, height);
        wave.maxRadius = distanceFromPointToFurthestCorner(wave.startPosition, {w: width, h: height});
        this.waves.push(wave);
        requestAnimationFrame(this._loop);
      },

      upAction: function() {
        for (var i = 0; i < this.waves.length; i++) {
          // Declare the next wave that has mouse down to be mouse'ed up.
          var wave = this.waves[i];
          if (wave.isMouseDown) {
            wave.isMouseDown = false
            wave.mouseUpStart = now();
            wave.mouseDownStart = 0;
            wave.tUp = 0.0;
            break;
          }
        }
        this._loop && requestAnimationFrame(this._loop);
      },

      cancel: function() {
        this.cancelled = true;
      },

      animate: function(ctx) {
        var shouldRenderNextFrame = false;

        // Clear the canvas
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        var deleteTheseWaves = [];
        // The oldest wave's touch down duration
        var longestTouchDownDuration = 0;
        var longestTouchUpDuration = 0;
        // Save the last known wave color
        var lastWaveColor = null;
        // wave animation values
        var anim = {
          initialOpacity: this.initialOpacity,
          opacityDecayVelocity: this.opacityDecayVelocity,
          height: ctx.canvas.height,
          width: ctx.canvas.width
        }

        for (var i = 0; i < this.waves.length; i++) {
          var wave = this.waves[i];

          if (wave.mouseDownStart > 0) {
            wave.tDown = now() - wave.mouseDownStart;
          }
          if (wave.mouseUpStart > 0) {
            wave.tUp = now() - wave.mouseUpStart;
          }

          // Determine how long the touch has been up or down.
          var tUp = wave.tUp;
          var tDown = wave.tDown;
          longestTouchDownDuration = Math.max(longestTouchDownDuration, tDown);
          longestTouchUpDuration = Math.max(longestTouchUpDuration, tUp);

          // Obtain the instantenous size and alpha of the ripple.
          var radius = waveRadiusFn(tDown, tUp, anim);
          var waveAlpha =  waveOpacityFn(tDown, tUp, anim);
          var waveColor = cssColorWithAlpha(wave.waveColor, waveAlpha);
          lastWaveColor = wave.waveColor;

          // Position of the ripple.
          var x = wave.startPosition.x;
          var y = wave.startPosition.y;

          // Ripple gravitational pull to the center of the canvas.
          if (wave.endPosition) {

            // This translates from the origin to the center of the view  based on the max dimension of  
            var translateFraction = Math.min(1, radius / wave.containerSize * 2 / Math.sqrt(2) );

            x += translateFraction * (wave.endPosition.x - wave.startPosition.x);
            y += translateFraction * (wave.endPosition.y - wave.startPosition.y);
          }

          // If we do a background fill fade too, work out the correct color.
          var bgFillColor = null;
          if (this.backgroundFill) {
            var bgFillAlpha = waveOuterOpacityFn(tDown, tUp, anim);
            bgFillColor = cssColorWithAlpha(wave.waveColor, bgFillAlpha);
          }

          // Draw the ripple.
          drawRipple(ctx, x, y, radius, waveColor, bgFillColor);

          // Determine whether there is any more rendering to be done.
          var maximumWave = waveAtMaximum(wave, radius, anim);
          var waveDissipated = waveDidFinish(wave, radius, anim);
          var shouldKeepWave = !waveDissipated || maximumWave;
          var shouldRenderWaveAgain = !waveDissipated && !maximumWave;
          shouldRenderNextFrame = shouldRenderNextFrame || shouldRenderWaveAgain;
          if (!shouldKeepWave || this.cancelled) {
            deleteTheseWaves.push(wave);
          }
       }

        if (shouldRenderNextFrame) {
          requestAnimationFrame(this._loop);
        }

        for (var i = 0; i < deleteTheseWaves.length; ++i) {
          var wave = deleteTheseWaves[i];
          removeWaveFromScope(this, wave);
        }

        if (!this.waves.length) {
          // If there is nothing to draw, clear any drawn waves now because
          // we're not going to get another requestAnimationFrame any more.
          ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
          this._loop = null;
        }
      }

    });

  })();

;

    Polymer('paper-shadow', {

      publish: {
        /**
         * If set, the shadow is applied to this node.
         *
         * @attribute target
         * @type Element
         * @default null
         */
        target: {value: null, reflect: true},

        /**
         * The z-depth of this shadow, from 0-5.
         *
         * @attribute z
         * @type number
         * @default 1
         */
        z: {value: 1, reflect: true},

        /**
         * If true, the shadow animates between z-depth changes.
         *
         * @attribute animated
         * @type boolean
         * @default false
         */
        animated: {value: false, reflect: true},

        /**
         * Workaround: getComputedStyle is wrong sometimes so `paper-shadow`
         * may overwrite the `position` CSS property. Set this property to
         * true to prevent this.
         *
         * @attribute hasPosition
         * @type boolean
         * @default false
         */
        hasPosition: {value: false}
      },

      // NOTE: include template so that styles are loaded, but remove
      // so that we can decide dynamically what part to include
      registerCallback: function(polymerElement) {
        var template = polymerElement.querySelector('template');
        this._style = template.content.querySelector('style');
        this._style.removeAttribute('no-shim');
      },

      fetchTemplate: function() {
        return null;
      },

      attached: function() {
        this.installScopeStyle(this._style);

        // If no target is bound at attach, default the target to the parent
        // element or shadow host.
        if (!this.target) {
          if (!this.parentElement && this.parentNode.host) {
            this.target = this.parentNode.host;
          } else if (this.parentElement && (window.ShadowDOMPolyfill ? this.parentElement !== wrap(document.body) : this.parentElement !== document.body)) {
            this.target = this.parentElement;
          }
        }
      },

      targetChanged: function(old) {
        if (old) {
          this.removeShadow(old);
        }
        if (this.target) {
          this.addShadow(this.target);
        }
      },

      zChanged: function(old) {
        if (this.target && this.target._paperShadow) {
          var shadow = this.target._paperShadow;
          ['top', 'bottom'].forEach(function(s) {
            shadow[s].classList.remove('paper-shadow-' + s + '-z-' + old);
            shadow[s].classList.add('paper-shadow-' + s + '-z-' + this.z);
          }.bind(this));
        }
      },

      animatedChanged: function() {
        if (this.target && this.target._paperShadow) {
          var shadow = this.target._paperShadow;
          ['top', 'bottom'].forEach(function(s) {
            if (this.animated) {
              shadow[s].classList.add('paper-shadow-animated');
            } else {
              shadow[s].classList.remove('paper-shadow-animated');
            }
          }.bind(this));
        }
      },

      addShadow: function(node) {
        if (node._paperShadow) {
          return;
        }

        var computed = getComputedStyle(node);
        if (!this.hasPosition && computed.position === 'static') {
          node.style.position = 'relative';
        }
        node.style.overflow = 'visible';

        // Both the top and bottom shadows are children of the target, so
        // it does not affect the classes and CSS properties of the target.
        ['top', 'bottom'].forEach(function(s) {
          var inner = (node._paperShadow && node._paperShadow[s]) || document.createElement('div');
          inner.classList.add('paper-shadow');
          inner.classList.add('paper-shadow-' + s + '-z-' + this.z);
          if (this.animated) {
            inner.classList.add('paper-shadow-animated');
          }

          if (node.shadowRoot) {
            node.shadowRoot.insertBefore(inner, node.shadowRoot.firstChild);
          } else {
            node.insertBefore(inner, node.firstChild);
          }

          node._paperShadow = node._paperShadow || {};
          node._paperShadow[s] = inner;
        }.bind(this));

      },

      removeShadow: function(node) {
        if (!node._paperShadow) {
          return;
        }

        ['top', 'bottom'].forEach(function(s) {
          node._paperShadow[s].remove();
        });
        node._paperShadow = null;

        node.style.position = null;
      }

    });
  ;

    Polymer('paper-button', {

      publish: {

        /**
         * The label of the button.
         *
         * @attribute label
         * @type string
         * @default ''
         */
        label: '',

        /**
         * If true, the button will be styled as a "raised" button.
         *
         * @attribute raisedButton
         * @type boolean
         * @default false
         */
        raisedButton: {value: false, reflect: true},

        /**
         * (optional) The URL of an image for an icon to use in the button.
         * Should not use `icon` property if you are using this property.
         *
         * @attribute iconSrc
         * @type string
         * @default ''
         */
         iconSrc: '',

         /**
          * (optional) Specifies the icon name or index in the set of icons
          * available in the icon set. If using this property, load the icon
          * set separately where the icon is used. Should not use `src`
          * if you are using this property.
          *
          * @attribute icon
          * @type string
          * @default ''
          */
         icon: ''

      },

      z: 1,

      attached: function() {
        if (this.textContent && !this.textContent.match(/\s+/)) {
          console.warn('Using textContent to label the button is deprecated. Use the "label" property instead');
          this.label = this.textContent;
        }
      },

      activeChanged: function() {
        this.super();

        if (this.active) {
          // FIXME: remove when paper-ripple can have a default 'down' state.
          if (!this.lastEvent) {
            var rect = this.getBoundingClientRect();
            this.lastEvent = {
              x: rect.left + rect.width / 2,
              y: rect.top + rect.height / 2
            }
          }
          this.$.ripple.downAction(this.lastEvent);
        } else {
          this.$.ripple.upAction();
        }
        this.adjustZ();
      },

      focusedChanged: function() {
        this.super();
        this.adjustZ();
      },

      disabledChanged: function() {
        this.super();
        this.adjustZ();
      },

      // waitForSpillCompleted: function(callback) {
      //   this.async(callback, null, (this.$.ink.spillCompleted ? 0 : this.duration));
      // },

      // resetInk: function() {
      //   this.active = false;
      //   this.$.ink.reset();
      // },

      insideButton: function(x, y) {
        var rect = this.getBoundingClientRect();
        return (rect.left <= x) && (x <= rect.right) && (rect.top <= y) && (y <= rect.bottom);
      },

      adjustZ: function() {
        if (this.focused) {
          this.classList.add('paper-shadow-animate-z-1-z-2');
        } else {
          this.classList.remove('paper-shadow-animate-z-1-z-2');

          if (this.active) {
            this.z = 2;
          } else if (this.disabled) {
            this.z = 0;
          } else {
            this.z = 1;
          }

        }
      },

      downAction: function(e) {
        this.super(e);
        this.lastEvent = e;
      },

      labelChanged: function() {
        this.setAttribute('aria-label', this.label);
      }

    });
  ;


  Polymer('paper-radio-button', {
    
    /**
     * Fired when the checked state changes.
     *
     * @event change
     */
    
    publish: {
      /**
       * Gets or sets the state, `true` is checked and `false` is unchecked.
       *
       * @attribute checked
       * @type boolean
       * @default false
       */
      checked: {value: false, reflect: true},
      
      /**
       * The label for the radio button.
       *
       * @attribute label
       * @type string
       * @default ''
       */
      label: '',
      
      /**
       * Normally the user cannot uncheck the radio button by tapping once
       * checked.  Setting this property to `true` makes the radio button
       * toggleable from checked to unchecked.
       *
       * @attribute toggles
       * @type boolean
       * @default false
       */
      toggles: false,
      
      /**
       * If true, the user cannot interact with this element.
       *
       * @attribute disabled
       * @type boolean
       * @default false
       */
      disabled: {value: false, reflect: true}
    },
    
    eventDelegates: {
      tap: 'tap'
    },
    
    tap: function() {
      this.toggle();
      this.fire('paper-radio-button-activate');
    },
    
    toggle: function() {
      this.checked = !this.toggles || !this.checked;
    },
    
    checkedChanged: function() {
      this.$.onRadio.classList.toggle('fill', this.checked);
      this.setAttribute('aria-checked', this.checked ? 'true': 'false');
      this.fire('change');
    },
    
    labelChanged: function() {
      this.setAttribute('aria-label', this.label);
    }
    
  });
  
;


  Polymer('paper-checkbox', {
    
    /**
     * Fired when the checked state changes.
     *
     * @event change
     */
    
    toggles: true,

    checkedChanged: function() {
      var cl = this.$.checkbox.classList;
      cl.toggle('checked', this.checked);
      cl.toggle('unchecked', !this.checked);
      cl.toggle('checkmark', !this.checked);
      cl.toggle('box', this.checked);
      this.setAttribute('aria-checked', this.checked ? 'true': 'false');
      this.fire('change');
    },

    checkboxAnimationEnd: function() {
      var cl = this.$.checkbox.classList;
      cl.toggle('checkmark', this.checked && !cl.contains('checkmark'));
      cl.toggle('box', !this.checked && !cl.contains('box'));
    }

  });
  
;


    Polymer('paper-dialog', {

      /**
       * Set opened to true to show the dialog and to false to hide it.
       * A dialog may be made intially opened by setting its opened attribute.

       * @attribute opened
       * @type boolean
       * @default false
       */
      opened: false,

      /**
       * If true, the dialog has a backdrop darkening the rest of the screen.
       * The backdrop element is attached to the document body and may be styled
       * with the class `core-overlay-backdrop`. When opened the `core-opened`
       * class is applied.
       *
       * @attribute backdrop
       * @type boolean
       * @default false
       */
      backdrop: false,

      /**
       * If true, the dialog is guaranteed to display above page content.
       *
       * @attribute layered
       * @type boolean
       * @default false
      */
      layered: false,

      /**
       * By default a dialog will close automatically if the user
       * taps outside it or presses the escape key. Disable this
       * behavior by setting the `autoCloseDisabled` property to true.
       * @attribute autoCloseDisabled
       * @type boolean
       * @default false
       */
      autoCloseDisabled: false,

      /**
       * This property specifies a selector matching elements that should
       * close the dialog on tap.
       *
       * @attribute closeSelector
       * @type string
       * @default ""
       */
      closeSelector: '[dismissive],[affirmative]',

      /**
       * @attribute heading
       * @type string
       * @default ''
       */
      heading: '',

      /**
       * Set this property to the id of a <core-transition> element to specify
       * the transition to use when opening/closing this dialog.
       *
       * @attribute transition
       * @type string
       * @default ''
       */
      transition: '',

      /**
       * Toggle the dialog's opened state.
       * @method toggle
       */
      toggle: function() {
        this.$.overlay.toggle();
      },

      headingChanged: function() {
        this.setAttribute('aria-label', this.heading);
      }

    });

  ;

  
    Polymer('paper-icon-button', {

      publish: {

        /**
         * If true, the ripple expands to a square to fill the containing box.
         *
         * @attribute fill
         * @type boolean
         * @default false
         */
        fill: {value: false, reflect: true}

      },

      ready: function() {
        this.$.ripple.classList.add('recenteringTouch');
        this.fillChanged();
      },

      fillChanged: function() {
        this.$.ripple.classList.toggle('circle', !this.fill);
      },

      iconChanged: function(oldIcon) {
        if (!this.label) {
          this.setAttribute('aria-label', this.icon);
        }
      }

    });
    
  ;

    Polymer('paper-fab', {

      publish: {

        /**
         * See [`<paper-button>`](../paper-button).
         *
         * @attribute raisedButton
         * @type boolean
         * @default true
         */
        raisedButton: {value: true, reflect: true}

      }

    });
  ;


  (function() {

    var paperInput = CoreStyle.g.paperInput = CoreStyle.g.paperInput || {};
    paperInput.focusedColor = '#4059a9';
    paperInput.invalidColor = '#d34336';

    Polymer('paper-input', {

      /**
       * The label for this input. It normally appears as grey text inside
       * the text input and disappears once the user enters text.
       *
       * @attribute label
       * @type string
       * @default ''
       */
      label: '',

      /**
       * If true, the label will "float" above the text input once the
       * user enters text instead of disappearing.
       *
       * @attribute floatingLabel
       * @type boolean
       * @default false
       */
      floatingLabel: false,

      /**
       * (multiline only) If set to a non-zero value, the height of this
       * text input will grow with the value changes until it is maxRows
       * rows tall. If the maximum size does not fit the value, the text
       * input will scroll internally.
       *
       * @attribute maxRows
       * @type number
       * @default 0
       */
      maxRows: 0,

      /**
       * The message to display if the input value fails validation. If this
       * is unset or the empty string, a default message is displayed depending
       * on the type of validation error.
       *
       * @attribute error
       * @type string
       */
      error: '',

      focused: false,
      pressed: false,

      attached: function() {
        if (this.multiline) {
          this.resizeInput();
          window.requestAnimationFrame(function() {
            this.$.underlineContainer.classList.add('animating');
          }.bind(this));
        }
      },

      resizeInput: function() {
        var height = this.$.inputClone.getBoundingClientRect().height;
        var bounded = this.maxRows > 0 || this.rows > 0;
        if (bounded) {
          var minHeight = this.$.minInputHeight.getBoundingClientRect().height;
          var maxHeight = this.$.maxInputHeight.getBoundingClientRect().height;
          height = Math.max(minHeight, Math.min(height, maxHeight));
        }
        this.$.inputContainer.style.height = height + 'px';
        this.$.underlineContainer.style.top = height + 'px';
      },

      prepareLabelTransform: function() {
        var toRect = this.$.floatedLabelSpan.getBoundingClientRect();
        var fromRect = this.$.labelSpan.getBoundingClientRect();
        if (toRect.width !== 0) {
          this.$.label.cachedTransform = 'scale(' + (toRect.width / fromRect.width) + ') ' +
            'translateY(' + (toRect.bottom - fromRect.bottom) + 'px)';
        }
      },

      toggleLabel: function(force) {
        var v = force !== undefined ? force : this.inputValue;

        if (!this.floatingLabel) {
          this.$.label.classList.toggle('hidden', v);
        }

        if (this.floatingLabel && !this.focused) {
          this.$.label.classList.toggle('hidden', v);
          this.$.floatedLabel.classList.toggle('hidden', !v);
        }
      },

      rowsChanged: function() {
        if (this.multiline && !isNaN(parseInt(this.rows))) {
          this.$.minInputHeight.innerHTML = '';
          for (var i = 0; i < this.rows; i++) {
            this.$.minInputHeight.appendChild(document.createElement('br'));
          }
          this.resizeInput();
        }
      },

      maxRowsChanged: function() {
        if (this.multiline && !isNaN(parseInt(this.maxRows))) {
          this.$.maxInputHeight.innerHTML = '';
          for (var i = 0; i < this.maxRows; i++) {
            this.$.maxInputHeight.appendChild(document.createElement('br'));
          }
          this.resizeInput();
        }
      },

      inputValueChanged: function() {
        this.super();

        if (this.multiline) {
          var escaped = this.inputValue.replace(/\n/gm, '<br>');
          if (!escaped || escaped.lastIndexOf('<br>') === escaped.length - 4) {
            escaped += '&nbsp';
          }
          this.$.inputCloneSpan.innerHTML = escaped;
          this.resizeInput();
        }

        this.toggleLabel();
      },

      labelChanged: function() {
        if (this.floatingLabel && this.$.floatedLabel && this.$.label) {
          // If the element is created programmatically, labelChanged is called before
          // binding. Run the measuring code in async so the DOM is ready.
          this.async(function() {
            this.prepareLabelTransform();
          });
        }
      },

      placeholderChanged: function() {
        this.label = this.placeholder;
      },

      inputFocusAction: function() {
        if (!this.pressed) {
          if (this.floatingLabel) {
            this.$.floatedLabel.classList.remove('hidden');
            this.$.floatedLabel.classList.add('focused');
            this.$.floatedLabel.classList.add('focusedColor');
          }
          this.$.label.classList.add('hidden');
          this.$.underlineHighlight.classList.add('focused');
          this.$.caret.classList.add('focused');

          this.super(arguments);
        }
        this.focused = true;
      },

      shouldFloatLabel: function() {
        // if type = number, the input value is the empty string until a valid number
        // is entered so we must do some hacks here
        return this.inputValue || (this.type === 'number' && !this.validity.valid);
      },

      inputBlurAction: function() {
        this.super(arguments);

        this.$.underlineHighlight.classList.remove('focused');
        this.$.caret.classList.remove('focused');

        if (this.floatingLabel) {
          this.$.floatedLabel.classList.remove('focused');
          this.$.floatedLabel.classList.remove('focusedColor');
          if (!this.shouldFloatLabel()) {
            this.$.floatedLabel.classList.add('hidden');
          }
        }

        // type = number hack. see core-input for more info
        if (!this.shouldFloatLabel()) {
          this.$.label.classList.remove('hidden');
          this.$.label.classList.add('animating');
          this.async(function() {
            this.$.label.style.webkitTransform = 'none';
            this.$.label.style.transform = 'none';
          });
        }

        this.focused = false;
      },

      downAction: function(e) {
        if (this.disabled) {
          return;
        }

        if (this.focused) {
          return;
        }

        this.pressed = true;
        var rect = this.$.underline.getBoundingClientRect();
        var right = e.x - rect.left;
        this.$.underlineHighlight.style.webkitTransformOriginX = right + 'px';
        this.$.underlineHighlight.style.transformOriginX = right + 'px';
        this.$.underlineHighlight.classList.remove('focused');
        this.underlineAsync = this.async(function() {
          this.$.underlineHighlight.classList.add('pressed');
        }, null, 200);

        // No caret animation if there is text in the input.
        if (!this.inputValue) {
          this.$.caret.classList.remove('focused');
        }
      },

      upAction: function(e) {
        if (this.disabled) {
          return;
        }

        if (!this.pressed) {
          return;
        }

        // if a touchevent caused the up, the synthentic mouseevents will blur
        // the input, make sure to prevent those from being generated.
        if (e._source === 'touch') {
          e.preventDefault();
        }

        if (this.underlineAsync) {
          clearTimeout(this.underlineAsync);
          this.underlineAsync = null;
        }

        // Focus the input here to bring up the virtual keyboard.
        this.$.input.focus();
        this.pressed = false;
        this.animating = true;

        this.$.underlineHighlight.classList.remove('pressed');
        this.$.underlineHighlight.classList.add('animating');
        this.async(function() {
          this.$.underlineHighlight.classList.add('focused');
        });

        // No caret animation if there is text in the input.
        if (!this.inputValue) {
          this.$.caret.classList.add('animating');
          this.async(function() {
            this.$.caret.classList.add('focused');
          }, null, 100);
        }

        if (this.floatingLabel) {
          this.$.label.classList.add('focusedColor');
          this.$.label.classList.add('animating');
          if (!this.$.label.cachedTransform) {
            this.prepareLabelTransform();
          }
          this.$.label.style.webkitTransform = this.$.label.cachedTransform;
          this.$.label.style.transform = this.$.label.cachedTransform;
        }
      },

      keydownAction: function() {
        this.super();

        // more type = number hacks. see core-input for more info
        if (this.type === 'number') {
          this.async(function() {
            if (!this.inputValue) {
              this.toggleLabel(!this.validity.valid);
            }
          });
        }
      },

      keypressAction: function() {
        if (this.animating) {
          this.transitionEndAction();
        }
      },

      transitionEndAction: function(e) {
        this.animating = false;
        if (this.pressed) {
          return;
        }

        if (this.focused) {

          if (this.floatingLabel || this.inputValue) {
            this.$.label.classList.add('hidden');
          }

          if (this.floatingLabel) {
            this.$.label.classList.remove('focusedColor');
            this.$.label.classList.remove('animating');
            this.$.floatedLabel.classList.remove('hidden');
            this.$.floatedLabel.classList.add('focused');
            this.$.floatedLabel.classList.add('focusedColor');
          }

          this.async(function() {
            this.$.underlineHighlight.classList.remove('animating');
            this.$.caret.classList.remove('animating');
          }, null, 100);

        } else {

          this.$.label.classList.remove('animating');

        }
      }

    });

  }());

  ;

    Polymer('paper-item', {

      publish: {

        /**
         * The label for the item.
         *
         * @attribute label
         * @type string
         * @default ''
         */
        label: '',

        /**
         * (optional) The URL of an image for an icon to use in the button.
         * Should not use `icon` property if you are using this property.
         *
         * @attribute iconSrc
         * @type string
         * @default ''
         */
        iconSrc: '',

        /**
         * (optional) Specifies the icon name or index in the set of icons
         * available in the icon set. If using this property, load the icon
         * set separately where the icon is used. Should not use `src`
         * if you are using this property.
         *
         * @attribute icon
         * @type string
         * @default ''
         */
        icon: ''

      },

      eventDelegates: {
        'down': 'downAction',
        'up': 'upAction'
      },

      downAction: function(e) {
        this.$.ripple.downAction(e);
      },

      upAction: function(e) {
        this.$.ripple.upAction(e);
      }
    });
  ;

    Polymer('paper-menu-button-overlay', {

      publish: {

        /**
         * The `relatedTarget` is an element used to position the overlay, for example a
         * button the user taps to show a menu.
         *
         * @attribute relatedTarget
         * @type Element
         */
        relatedTarget: null,

        /**
         * The horizontal alignment of the overlay relative to the `relatedTarget`.
         *
         * @attribute halign
         * @type 'left'|'right'|'center'
         * @default 'left'
         */
        halign: 'left'

      },

      updateTargetDimensions: function() {
        this.super();

        var t = this.target;
        this.target.cachedSize = t.getBoundingClientRect();
      },

      positionTarget: function() {
        if (this.relatedTarget) {

          var rect = this.relatedTarget.getBoundingClientRect();

          if (this.halign === 'left') {
            this.target.style.left = rect.left + 'px';
          } else if (this.halign === 'right') {
            this.target.style.right = (window.innerWidth - rect.right) + 'px';
          } else {
            this.target.style.left = (rect.left - (rect.width - this.target.cachedSize.width) / 2) + 'px';
          }

          if (this.valign === 'top') {
            this.target.style.top = rect.top + 'px';
          } else if (this.valign === 'bottom') {
            this.target.style.top = rect.bottom + 'px';
          } else {
            this.target.style.top = rect.top + 'px';
          }

          // this.target.style.top = rect.top + 'px';

        } else {
          this.super();
        }
      }

    });
  ;


  Polymer('core-transition-css', {
    
    /**
     * The class that will be applied to all animated nodes.
     *
     * @attribute baseClass
     * @type string
     * @default "core-transition"
     */
    baseClass: 'core-transition',

    /**
     * The class that will be applied to nodes in the opened state.
     *
     * @attribute openedClass
     * @type string
     * @default "core-opened"
     */
    openedClass: 'core-opened',

    /**
     * The class that will be applied to nodes in the closed state.
     *
     * @attribute closedClass
     * @type string
     * @default "core-closed"
     */
    closedClass: 'core-closed',

    /**
     * Event to listen to for animation completion.
     *
     * @attribute completeEventName
     * @type string
     * @default "transitionEnd"
     */
    completeEventName: 'transitionend',

    publish: {
      /**
       * A secondary configuration attribute for the animation. The class
       * `<baseClass>-<transitionType` is applied to the animated node during
       * `setup`.
       *
       * @attribute transitionType
       * @type string
       */
      transitionType: null
    },

    registerCallback: function(element) {
      this.transitionStyle = element.templateContent().firstElementChild;
    },

    // template is just for loading styles, we don't need a shadowRoot
    fetchTemplate: function() {
      return null;
    },

    go: function(node, state) {
      if (state.opened !== undefined) {
        this.transitionOpened(node, state.opened);
      }
    },

    setup: function(node) {
      if (!node._hasTransitionStyle) {
        if (!node.shadowRoot) {
          node.createShadowRoot().innerHTML = '<content></content>';
        }
        this.installScopeStyle(this.transitionStyle, 'transition',
            node.shadowRoot);
        node._hasTransitionStyle = true;
      }
      node.classList.add(this.baseClass);
      if (this.transitionType) {
        node.classList.add(this.baseClass + '-' + this.transitionType);
      }
    },

    teardown: function(node) {
      node.classList.remove(this.baseClass);
      if (this.transitionType) {
        node.classList.remove(this.baseClass + '-' + this.transitionType);
      }
    },

    transitionOpened: function(node, opened) {
      this.listenOnce(node, this.completeEventName, function() {
        node.classList.toggle(this.revealedClass, opened);
        if (!opened) {
          node.classList.remove(this.closedClass);
        }
        this.complete(node);
      });
      node.classList.toggle(this.openedClass, opened);
      node.classList.toggle(this.closedClass, !opened);
    }

  });
;
/**
 * Copyright 2012 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

(function() {
'use strict';

var ASSERT_ENABLED = false;
var SVG_NS = 'http://www.w3.org/2000/svg';

function assert(check, message) {
  console.assert(ASSERT_ENABLED,
      'assert should not be called when ASSERT_ENABLED is false');
  console.assert(check, message);
  // Some implementations of console.assert don't actually throw
  if (!check) { throw message; }
}

function detectFeatures() {
  var el = createDummyElement();
  el.style.cssText = 'width: calc(0px);' +
                     'width: -webkit-calc(0px);';
  var calcFunction = el.style.width.split('(')[0];
  function detectProperty(candidateProperties) {
    return [].filter.call(candidateProperties, function(property) {
      return property in el.style;
    })[0];
  }
  var transformProperty = detectProperty([
    'transform',
    'webkitTransform',
    'msTransform']);
  var perspectiveProperty = detectProperty([
    'perspective',
    'webkitPerspective',
    'msPerspective']);
  return {
    calcFunction: calcFunction,
    transformProperty: transformProperty,
    transformOriginProperty: transformProperty + 'Origin',
    perspectiveProperty: perspectiveProperty,
    perspectiveOriginProperty: perspectiveProperty + 'Origin'
  };
}
var features = detectFeatures();

function prefixProperty(property) {
  switch (property) {
    case 'transform':
      return features.transformProperty;
    case 'transformOrigin':
      return features.transformOriginProperty;
    case 'perspective':
      return features.perspectiveProperty;
    case 'perspectiveOrigin':
      return features.perspectiveOriginProperty;
    default:
      return property;
  }
}

function createDummyElement() {
  return document.documentElement.namespaceURI == SVG_NS ?
         document.createElementNS(SVG_NS, 'g') :
         document.createElement('div');
}

var constructorToken = {};
var deprecationsSilenced = {};

var createObject = function(proto, obj) {
  var newObject = Object.create(proto);
  Object.getOwnPropertyNames(obj).forEach(function(name) {
    Object.defineProperty(
        newObject, name, Object.getOwnPropertyDescriptor(obj, name));
  });
  return newObject;
};

var abstractMethod = function() {
  throw 'Abstract method not implemented.';
};

var deprecated = function(name, deprecationDate, advice, plural) {
  if (deprecationsSilenced[name]) {
    return;
  }
  var auxVerb = plural ? 'are' : 'is';
  var today = new Date();
  var cutoffDate = new Date(deprecationDate);
  cutoffDate.setMonth(cutoffDate.getMonth() + 3); // 3 months grace period

  if (today < cutoffDate) {
    console.warn('Web Animations: ' + name +
        ' ' + auxVerb + ' deprecated and will stop working on ' +
        cutoffDate.toDateString() + '. ' + advice);
    deprecationsSilenced[name] = true;
  } else {
    throw new Error(name + ' ' + auxVerb + ' no longer supported. ' + advice);
  }
};

var defineDeprecatedProperty = function(object, property, getFunc, setFunc) {
  var descriptor = {
    get: getFunc,
    configurable: true
  };
  if (setFunc) {
    descriptor.set = setFunc;
  }
  Object.defineProperty(object, property, descriptor);
};

var IndexSizeError = function(message) {
  Error.call(this);
  this.name = 'IndexSizeError';
  this.message = message;
};

IndexSizeError.prototype = Object.create(Error.prototype);



/** @constructor */
var TimingDict = function(timingInput) {
  if (typeof timingInput === 'object') {
    for (var k in timingInput) {
      if (k in TimingDict.prototype) {
        this[k] = timingInput[k];
      }
    }
  } else if (isDefinedAndNotNull(timingInput)) {
    this.duration = Number(timingInput);
  }
};

TimingDict.prototype = {
  delay: 0,
  endDelay: 0,
  fill: 'auto',
  iterationStart: 0,
  iterations: 1,
  duration: 'auto',
  playbackRate: 1,
  direction: 'normal',
  easing: 'linear'
};



/** @constructor */
var Timing = function(token, timingInput, changeHandler) {
  if (token !== constructorToken) {
    throw new TypeError('Illegal constructor');
  }
  this._dict = new TimingDict(timingInput);
  this._changeHandler = changeHandler;
};

Timing.prototype = {
  _timingFunction: function(timedItem) {
    var timingFunction = TimingFunction.createFromString(
        this.easing, timedItem);
    this._timingFunction = function() {
      return timingFunction;
    };
    return timingFunction;
  },
  _invalidateTimingFunction: function() {
    delete this._timingFunction;
  },
  _iterations: function() {
    var value = this._dict.iterations;
    return value < 0 ? 1 : value;
  },
  _duration: function() {
    var value = this._dict.duration;
    return typeof value === 'number' ? value : 'auto';
  },
  _clone: function() {
    return new Timing(
        constructorToken, this._dict, this._updateInternalState.bind(this));
  }
};

// Configures an accessor descriptor for use with Object.defineProperty() to
// allow the property to be changed and enumerated, to match __defineGetter__()
// and __defineSetter__().
var configureDescriptor = function(descriptor) {
  descriptor.configurable = true;
  descriptor.enumerable = true;
  return descriptor;
};

Timing._defineProperty = function(prop) {
  Object.defineProperty(Timing.prototype, prop, configureDescriptor({
    get: function() {
      return this._dict[prop];
    },
    set: function(value) {
      if (isDefinedAndNotNull(value)) {
        if (prop == 'duration' && value == 'auto') {
          // duration is not always a number
        } else if (['delay', 'endDelay', 'iterationStart', 'iterations',
                    'duration', 'playbackRate'].indexOf(prop) >= 0) {
          value = Number(value);
        }
        this._dict[prop] = value;
      } else {
        delete this._dict[prop];
      }
      // FIXME: probably need to implement specialized handling parsing
      // for each property
      if (prop === 'easing') {
        // Cached timing function may be invalid now.
        this._invalidateTimingFunction();
      }
      this._changeHandler();
    }
  }));
};

for (var prop in TimingDict.prototype) {
  Timing._defineProperty(prop);
}

var isDefined = function(val) {
  return typeof val !== 'undefined';
};

var isDefinedAndNotNull = function(val) {
  return isDefined(val) && (val !== null);
};



/** @constructor */
var AnimationTimeline = function(token) {
  if (token !== constructorToken) {
    throw new TypeError('Illegal constructor');
  }
  // TODO: This will probably need to change.
  this._startTime = documentTimeZeroAsClockTime;
};

AnimationTimeline.prototype = {
  get currentTime() {
    if (this._startTime === undefined) {
      this._startTime = documentTimeZeroAsClockTime;
      if (this._startTime === undefined) {
        return null;
      }
    }
    return relativeTime(cachedClockTime(), this._startTime);
  },
  get effectiveCurrentTime() {
    return this.currentTime || 0;
  },
  play: function(source) {
    return new AnimationPlayer(constructorToken, source, this);
  },
  getCurrentPlayers: function() {
    return PLAYERS.filter(function(player) {
      return !player._isPastEndOfActiveInterval();
    });
  },
  toTimelineTime: function(otherTime, other) {
    if ((this.currentTime === null) || (other.currentTime === null)) {
      return null;
    } else {
      return otherTime + other._startTime - this._startTime;
    }
  },
  _pauseAnimationsForTesting: function(pauseAt) {
    PLAYERS.forEach(function(player) {
      player.pause();
      player.currentTime = pauseAt;
    });
  }
};

// TODO: Remove dead players from here?
var PLAYERS = [];
var playersAreSorted = false;
var playerSequenceNumber = 0;

// Methods for event target objects.
var initializeEventTarget = function(eventTarget) {
  eventTarget._handlers = {};
  eventTarget._onHandlers = {};
};
var setOnEventHandler = function(eventTarget, type, handler) {
  if (typeof handler === 'function') {
    eventTarget._onHandlers[type] = {
      callback: handler,
      index: (eventTarget._handlers[type] || []).length
    };
  } else {
    eventTarget._onHandlers[type] = null;
  }
};
var getOnEventHandler = function(eventTarget, type) {
  if (isDefinedAndNotNull(eventTarget._onHandlers[type])) {
    return eventTarget._onHandlers[type].callback;
  }
  return null;
};
var addEventHandler = function(eventTarget, type, handler) {
  if (typeof handler !== 'function') {
    return;
  }
  if (!isDefinedAndNotNull(eventTarget._handlers[type])) {
    eventTarget._handlers[type] = [];
  } else if (eventTarget._handlers[type].indexOf(handler) !== -1) {
    return;
  }
  eventTarget._handlers[type].push(handler);
};
var removeEventHandler = function(eventTarget, type, handler) {
  if (!eventTarget._handlers[type]) {
    return;
  }
  var index = eventTarget._handlers[type].indexOf(handler);
  if (index === -1) {
    return;
  }
  eventTarget._handlers[type].splice(index, 1);
  if (isDefinedAndNotNull(eventTarget._onHandlers[type]) &&
      (index < eventTarget._onHandlers[type].index)) {
    eventTarget._onHandlers[type].index -= 1;
  }
};
var hasEventHandlersForEvent = function(eventTarget, type) {
  return (isDefinedAndNotNull(eventTarget._handlers[type]) &&
      eventTarget._handlers[type].length > 0) ||
      isDefinedAndNotNull(eventTarget._onHandlers[type]);
};
var callEventHandlers = function(eventTarget, type, event) {
  var callbackList;
  if (isDefinedAndNotNull(eventTarget._handlers[type])) {
    callbackList = eventTarget._handlers[type].slice();
  } else {
    callbackList = [];
  }
  if (isDefinedAndNotNull(eventTarget._onHandlers[type])) {
    callbackList.splice(eventTarget._onHandlers[type].index, 0,
        eventTarget._onHandlers[type].callback);
  }
  setTimeout(function() {
    for (var i = 0; i < callbackList.length; i++) {
      callbackList[i].call(eventTarget, event);
    }
  }, 0);
};
var createEventPrototype = function() {
  var prototype = Object.create(window.Event.prototype, {
    type: { get: function() { return this._type; } },
    target: { get: function() { return this._target; } },
    currentTarget: { get: function() { return this._target; } },
    eventPhase: { get: function() { return this._eventPhase; } },
    bubbles: { get: function() { return false; } },
    cancelable: { get: function() { return false; } },
    timeStamp: { get: function() { return this._timeStamp; } },
    defaultPrevented: { get: function() { return false; } }
  });
  prototype._type = '';
  prototype._target = null;
  prototype._eventPhase = Event.NONE;
  prototype._timeStamp = 0;
  prototype._initialize = function(target) {
    this._target = target;
    this._eventPhase = Event.AT_TARGET;
    this._timeStamp = cachedClockTime();
  };
  return prototype;
};



/** @constructor */
var AnimationPlayer = function(token, source, timeline) {
  if (token !== constructorToken) {
    throw new TypeError('Illegal constructor');
  }
  enterModifyCurrentAnimationState();
  try {
    this._registeredOnTimeline = false;
    this._sequenceNumber = playerSequenceNumber++;
    this._timeline = timeline;
    this._startTime =
        this.timeline.currentTime === null ? 0 : this.timeline.currentTime;
    this._storedTimeLag = 0.0;
    this._pausedState = false;
    this._holdTime = null;
    this._previousCurrentTime = null;
    this._playbackRate = 1.0;
    this._hasTicked = false;

    this.source = source;
    this._lastCurrentTime = undefined;
    this._finishedFlag = false;
    initializeEventTarget(this);

    playersAreSorted = false;
    maybeRestartAnimation();
  } finally {
    exitModifyCurrentAnimationState(ensureRetickBeforeGetComputedStyle);
  }
};

AnimationPlayer.prototype = {
  set source(source) {
    enterModifyCurrentAnimationState();
    try {
      if (isDefinedAndNotNull(this.source)) {
        // To prevent infinite recursion.
        var oldTimedItem = this.source;
        this._source = null;
        oldTimedItem._attach(null);
      }
      this._source = source;
      if (isDefinedAndNotNull(this.source)) {
        this.source._attach(this);
        this._update();
        maybeRestartAnimation();
      }
    } finally {
      exitModifyCurrentAnimationState(repeatLastTick);
    }
  },
  get source() {
    return this._source;
  },
  // This is the effective current time.
  set currentTime(currentTime) {
    enterModifyCurrentAnimationState();
    try {
      this._currentTime = currentTime;
    } finally {
      exitModifyCurrentAnimationState(repeatLastTick);
    }
  },
  get currentTime() {
    return this._currentTime;
  },
  set _currentTime(seekTime) {
    // If we are paused or seeking to a time where limiting applies (i.e. beyond
    // the end in the current direction), update the hold time.
    var sourceContentEnd = this.source ? this.source.endTime : 0;
    if (this.paused ||
        (this.playbackRate > 0 && seekTime >= sourceContentEnd) ||
        (this.playbackRate < 0 && seekTime <= 0)) {
      this._holdTime = seekTime;
    // Otherwise, clear the hold time (it may been set by previously seeking to
    // a limited time) and update the time lag.
    } else {
      this._holdTime = null;
      this._storedTimeLag = (this.timeline.effectiveCurrentTime -
          this.startTime) * this.playbackRate - seekTime;
    }
    this._update();
    maybeRestartAnimation();
  },
  get _currentTime() {
    this._previousCurrentTime = (this.timeline.effectiveCurrentTime -
        this.startTime) * this.playbackRate - this.timeLag;
    return this._previousCurrentTime;
  },
  get _unlimitedCurrentTime() {
    return (this.timeline.effectiveCurrentTime - this.startTime) *
        this.playbackRate - this._storedTimeLag;
  },
  get timeLag() {
    if (this.paused) {
      return this._pauseTimeLag;
    }

    // Apply limiting at start of interval when playing in reverse
    if (this.playbackRate < 0 && this._unlimitedCurrentTime <= 0) {
      if (this._holdTime === null) {
        this._holdTime = Math.min(this._previousCurrentTime, 0);
      }
      return this._pauseTimeLag;
    }

    // Apply limiting at end of interval when playing forwards
    var sourceContentEnd = this.source ? this.source.endTime : 0;
    if (this.playbackRate > 0 &&
        this._unlimitedCurrentTime >= sourceContentEnd) {
      if (this._holdTime === null) {
        this._holdTime = Math.max(this._previousCurrentTime, sourceContentEnd);
      }
      return this._pauseTimeLag;
    }

    // Finished limiting so store pause time lag
    if (this._holdTime !== null) {
      this._storedTimeLag = this._pauseTimeLag;
      this._holdTime = null;
    }

    return this._storedTimeLag;
  },
  get _pauseTimeLag() {
    return ((this.timeline.currentTime || 0) - this.startTime) *
        this.playbackRate - this._holdTime;
  },
  set startTime(startTime) {
    enterModifyCurrentAnimationState();
    try {
      // This seeks by updating _startTime and hence the currentTime. It does
      // not affect _storedTimeLag.
      this._startTime = startTime;
      this._holdTime = null;
      playersAreSorted = false;
      this._update();
      maybeRestartAnimation();
    } finally {
      exitModifyCurrentAnimationState(repeatLastTick);
    }
  },
  get startTime() {
    return this._startTime;
  },
  set _paused(isPaused) {
    if (isPaused === this._pausedState) {
      return;
    }
    if (this._pausedState) {
      this._storedTimeLag = this.timeLag;
      this._holdTime = null;
      maybeRestartAnimation();
    } else {
      this._holdTime = this.currentTime;
    }
    this._pausedState = isPaused;
  },
  get paused() {
    return this._pausedState;
  },
  get timeline() {
    return this._timeline;
  },
  set playbackRate(playbackRate) {
    enterModifyCurrentAnimationState();
    try {
      var cachedCurrentTime = this.currentTime;
      // This will impact currentTime, so perform a compensatory seek.
      this._playbackRate = playbackRate;
      this.currentTime = cachedCurrentTime;
    } finally {
      exitModifyCurrentAnimationState(repeatLastTick);
    }
  },
  get playbackRate() {
    return this._playbackRate;
  },
  get finished() {
    return this._isLimited;
  },
  get _isLimited() {
    var sourceEnd = this.source ? this.source.endTime : 0;
    return ((this.playbackRate > 0 && this.currentTime >= sourceEnd) ||
        (this.playbackRate < 0 && this.currentTime <= 0));
  },
  cancel: function() {
    this.source = null;
  },
  finish: function() {
    if (this.playbackRate < 0) {
      this.currentTime = 0;
    } else if (this.playbackRate > 0) {
      var sourceEndTime = this.source ? this.source.endTime : 0;
      if (sourceEndTime === Infinity) {
        throw new Error('InvalidStateError');
      }
      this.currentTime = sourceEndTime;
    }
  },
  play: function() {
    this._paused = false;
    if (!this.source) {
      return;
    }
    if (this.playbackRate > 0 &&
        (this.currentTime < 0 ||
         this.currentTime >= this.source.endTime)) {
      this.currentTime = 0;
    } else if (this.playbackRate < 0 &&
        (this.currentTime <= 0 ||
        this.currentTime > this.source.endTime)) {
      this.currentTime = this.source.endTime;
    }
  },
  pause: function() {
    this._paused = true;
  },
  reverse: function() {
    if (this.playbackRate === 0) {
      return;
    }
    if (this.source) {
      if (this.playbackRate > 0 && this.currentTime >= this.source.endTime) {
        this.currentTime = this.source.endTime;
      } else if (this.playbackRate < 0 && this.currentTime < 0) {
        this.currentTime = 0;
      }
    }
    this.playbackRate = -this.playbackRate;
    this._paused = false;
  },
  _update: function() {
    if (this.source !== null) {
      this.source._updateInheritedTime(
          this.timeline.currentTime === null ? null : this._currentTime);
      this._registerOnTimeline();
    }
  },
  _hasFutureAnimation: function() {
    return this.source === null || this.playbackRate === 0 ||
        this.source._hasFutureAnimation(this.playbackRate > 0);
  },
  _isPastEndOfActiveInterval: function() {
    return this.source === null ||
        this.source._isPastEndOfActiveInterval();
  },
  _isCurrent: function() {
    return this.source && this.source._isCurrent();
  },
  _hasFutureEffect: function() {
    return this.source && this.source._hasFutureEffect();
  },
  _getLeafItemsInEffect: function(items) {
    if (this.source) {
      this.source._getLeafItemsInEffect(items);
    }
  },
  _isTargetingElement: function(element) {
    return this.source && this.source._isTargetingElement(element);
  },
  _getAnimationsTargetingElement: function(element, animations) {
    if (this.source) {
      this.source._getAnimationsTargetingElement(element, animations);
    }
  },
  set onfinish(handler) {
    return setOnEventHandler(this, 'finish', handler);
  },
  get onfinish() {
    return getOnEventHandler(this, 'finish');
  },
  addEventListener: function(type, handler) {
    if (type === 'finish') {
      addEventHandler(this, type, handler);
    }
  },
  removeEventListener: function(type, handler) {
    if (type === 'finish') {
      removeEventHandler(this, type, handler);
    }
  },
  _generateEvents: function() {
    if (!this._finishedFlag && this.finished &&
        hasEventHandlersForEvent(this, 'finish')) {
      var event = new AnimationPlayerEvent('finish', {
        currentTime: this.currentTime,
        timelineTime: this.timeline.currentTime
      });
      event._initialize(this);
      callEventHandlers(this, 'finish', event);
    }
    this._finishedFlag = this.finished;

    // The following code is for deprecated TimedItem event handling and should
    // be removed once we stop supporting it.
    if (!isDefinedAndNotNull(this._lastCurrentTime)) {
      this._lastCurrentTime = 0;
    }

    this._lastCurrentTime = this._unlimitedCurrentTime;
  },
  _registerOnTimeline: function() {
    if (!this._registeredOnTimeline) {
      PLAYERS.push(this);
      this._registeredOnTimeline = true;
    }
  },
  _deregisterFromTimeline: function() {
    PLAYERS.splice(PLAYERS.indexOf(this), 1);
    this._registeredOnTimeline = false;
  }
};



/** @constructor */
var AnimationPlayerEvent = function(type, eventInit) {
  this._type = type;
  this.currentTime = eventInit.currentTime;
  this.timelineTime = eventInit.timelineTime;
};

AnimationPlayerEvent.prototype = createEventPrototype();



/** @constructor */
var TimedItem = function(token, timingInput) {
  if (token !== constructorToken) {
    throw new TypeError('Illegal constructor');
  }
  this.timing = new Timing(
      constructorToken, timingInput,
      this._specifiedTimingModified.bind(this));
  this._inheritedTime = null;
  this.currentIteration = null;
  this._iterationTime = null;
  this._animationTime = null;
  this._startTime = 0.0;
  this._player = null;
  this._parent = null;
  this._updateInternalState();
  this._fill = this._resolveFillMode(this.timing.fill);
  initializeEventTarget(this);
};

TimedItem.prototype = {
  // TODO: It would be good to avoid the need for this. We would need to modify
  // call sites to instead rely on a call from the parent.
  get _effectiveParentTime() {
    return this.parent !== null && this.parent._iterationTime !== null ?
        this.parent._iterationTime : 0;
  },
  get localTime() {
    return this._inheritedTime === null ?
        null : this._inheritedTime - this._startTime;
  },
  get startTime() {
    return this._startTime;
  },
  get duration() {
    var result = this.timing._duration();
    if (result === 'auto') {
      result = this._intrinsicDuration();
    }
    return result;
  },
  get activeDuration() {
    var repeatedDuration = this.duration * this.timing._iterations();
    return repeatedDuration / Math.abs(this.timing.playbackRate);
  },
  get endTime() {
    return this._startTime + this.activeDuration + this.timing.delay +
        this.timing.endDelay;
  },
  get parent() {
    return this._parent;
  },
  get previousSibling() {
    if (!this.parent) {
      return null;
    }
    var siblingIndex = this.parent.indexOf(this) - 1;
    if (siblingIndex < 0) {
      return null;
    }
    return this.parent.children[siblingIndex];
  },
  get nextSibling() {
    if (!this.parent) {
      return null;
    }
    var siblingIndex = this.parent.indexOf(this) + 1;
    if (siblingIndex >= this.parent.children.length) {
      return null;
    }
    return this.parent.children[siblingIndex];
  },
  _attach: function(player) {
    // Remove ourselves from our parent, if we have one. This also removes any
    // exsisting player.
    this._reparent(null);
    this._player = player;
  },
  // Takes care of updating the outgoing parent. This is called with a non-null
  // parent only from TimingGroup.splice(), which takes care of calling
  // TimingGroup._childrenStateModified() for the new parent.
  _reparent: function(parent) {
    if (parent === this) {
      throw new Error('parent can not be set to self!');
    }
    enterModifyCurrentAnimationState();
    try {
      if (this._player !== null) {
        this._player.source = null;
        this._player = null;
      }
      if (this.parent !== null) {
        this.remove();
      }
      this._parent = parent;
      // In the case of a AnimationSequence parent, _startTime will be updated
      // by TimingGroup.splice().
      if (this.parent === null || this.parent.type !== 'seq') {
        this._startTime =
            this._stashedStartTime === undefined ? 0.0 : this._stashedStartTime;
        this._stashedStartTime = undefined;
      }
      // In the case of the parent being non-null, _childrenStateModified() will
      // call this via _updateChildInheritedTimes().
      // TODO: Consider optimising this case by skipping this call.
      this._updateTimeMarkers();
    } finally {
      exitModifyCurrentAnimationState(
          Boolean(this.player) ? repeatLastTick : null);
    }
  },
  _intrinsicDuration: function() {
    return 0.0;
  },
  _resolveFillMode: abstractMethod,
  _updateInternalState: function() {
    this._fill = this._resolveFillMode(this.timing.fill);
    if (this.parent) {
      this.parent._childrenStateModified();
    } else if (this._player) {
      this._player._registerOnTimeline();
    }
    this._updateTimeMarkers();
  },
  _specifiedTimingModified: function() {
    enterModifyCurrentAnimationState();
    try {
      this._updateInternalState();
    } finally {
      exitModifyCurrentAnimationState(
          Boolean(this.player) ? repeatLastTick : null);
    }
  },
  // We push time down to children. We could instead have children pull from
  // above, but this is tricky because a TimedItem may use either a parent
  // TimedItem or an AnimationPlayer. This requires either logic in
  // TimedItem, or for TimedItem and AnimationPlayer to implement Timeline
  // (or an equivalent), both of which are ugly.
  _updateInheritedTime: function(inheritedTime) {
    this._inheritedTime = inheritedTime;
    this._updateTimeMarkers();
  },
  _updateAnimationTime: function() {
    if (this.localTime < this.timing.delay) {
      if (this._fill === 'backwards' ||
          this._fill === 'both') {
        this._animationTime = 0;
      } else {
        this._animationTime = null;
      }
    } else if (this.localTime <
        this.timing.delay + this.activeDuration) {
      this._animationTime = this.localTime - this.timing.delay;
    } else {
      if (this._fill === 'forwards' ||
          this._fill === 'both') {
        this._animationTime = this.activeDuration;
      } else {
        this._animationTime = null;
      }
    }
  },
  _updateIterationParamsZeroDuration: function() {
    this._iterationTime = 0;
    var isAtEndOfIterations = this.timing._iterations() !== 0 &&
        this.localTime >= this.timing.delay;
    this.currentIteration = (
        isAtEndOfIterations ?
        this._floorWithOpenClosedRange(
            this.timing.iterationStart + this.timing._iterations(),
            1.0) :
        this._floorWithClosedOpenRange(this.timing.iterationStart, 1.0));
    // Equivalent to unscaledIterationTime below.
    var unscaledFraction = (
        isAtEndOfIterations ?
        this._modulusWithOpenClosedRange(
            this.timing.iterationStart + this.timing._iterations(),
            1.0) :
        this._modulusWithClosedOpenRange(this.timing.iterationStart, 1.0));
    var timingFunction = this.timing._timingFunction(this);
    this._timeFraction = (
        this._isCurrentDirectionForwards() ?
        unscaledFraction :
        1.0 - unscaledFraction);
    ASSERT_ENABLED && assert(
        this._timeFraction >= 0.0 && this._timeFraction <= 1.0,
        'Time fraction should be in the range [0, 1]');
    if (timingFunction) {
      this._timeFraction = timingFunction.scaleTime(this._timeFraction);
    }
  },
  _getAdjustedAnimationTime: function(animationTime) {
    var startOffset =
        multiplyZeroGivesZero(this.timing.iterationStart, this.duration);
    return (this.timing.playbackRate < 0 ?
        (animationTime - this.activeDuration) : animationTime) *
        this.timing.playbackRate + startOffset;
  },
  _scaleIterationTime: function(unscaledIterationTime) {
    return this._isCurrentDirectionForwards() ?
        unscaledIterationTime :
        this.duration - unscaledIterationTime;
  },
  _updateIterationParams: function() {
    var adjustedAnimationTime =
        this._getAdjustedAnimationTime(this._animationTime);
    var repeatedDuration = this.duration * this.timing._iterations();
    var startOffset = this.timing.iterationStart * this.duration;
    var isAtEndOfIterations = (this.timing._iterations() !== 0) &&
        (adjustedAnimationTime - startOffset === repeatedDuration);
    this.currentIteration = isAtEndOfIterations ?
        this._floorWithOpenClosedRange(
            adjustedAnimationTime, this.duration) :
        this._floorWithClosedOpenRange(
            adjustedAnimationTime, this.duration);
    var unscaledIterationTime = isAtEndOfIterations ?
        this._modulusWithOpenClosedRange(
            adjustedAnimationTime, this.duration) :
        this._modulusWithClosedOpenRange(
            adjustedAnimationTime, this.duration);
    this._iterationTime = this._scaleIterationTime(unscaledIterationTime);
    if (this.duration == Infinity) {
      this._timeFraction = 0;
      return;
    }
    this._timeFraction = this._iterationTime / this.duration;
    ASSERT_ENABLED && assert(
        this._timeFraction >= 0.0 && this._timeFraction <= 1.0,
        'Time fraction should be in the range [0, 1], got ' +
        this._timeFraction + ' ' + this._iterationTime + ' ' +
        this.duration + ' ' + isAtEndOfIterations + ' ' +
        unscaledIterationTime);
    var timingFunction = this.timing._timingFunction(this);
    if (timingFunction) {
      this._timeFraction = timingFunction.scaleTime(this._timeFraction);
    }
    this._iterationTime = this._timeFraction * this.duration;
  },
  _updateTimeMarkers: function() {
    if (this.localTime === null) {
      this._animationTime = null;
      this._iterationTime = null;
      this.currentIteration = null;
      this._timeFraction = null;
      return false;
    }
    this._updateAnimationTime();
    if (this._animationTime === null) {
      this._iterationTime = null;
      this.currentIteration = null;
      this._timeFraction = null;
    } else if (this.duration === 0) {
      this._updateIterationParamsZeroDuration();
    } else {
      this._updateIterationParams();
    }
    maybeRestartAnimation();
  },
  _floorWithClosedOpenRange: function(x, range) {
    return Math.floor(x / range);
  },
  _floorWithOpenClosedRange: function(x, range) {
    return Math.ceil(x / range) - 1;
  },
  _modulusWithClosedOpenRange: function(x, range) {
    ASSERT_ENABLED && assert(
        range > 0, 'Range must be strictly positive');
    var modulus = x % range;
    var result = modulus < 0 ? modulus + range : modulus;
    ASSERT_ENABLED && assert(
        result >= 0.0 && result < range,
        'Result should be in the range [0, range)');
    return result;
  },
  _modulusWithOpenClosedRange: function(x, range) {
    var modulus = this._modulusWithClosedOpenRange(x, range);
    var result = modulus === 0 ? range : modulus;
    ASSERT_ENABLED && assert(
        result > 0.0 && result <= range,
        'Result should be in the range (0, range]');
    return result;
  },
  _isCurrentDirectionForwards: function() {
    if (this.timing.direction === 'normal') {
      return true;
    }
    if (this.timing.direction === 'reverse') {
      return false;
    }
    var d = this.currentIteration;
    if (this.timing.direction === 'alternate-reverse') {
      d += 1;
    }
    // TODO: 6.13.3 step 3. wtf?
    return d % 2 === 0;
  },
  clone: abstractMethod,
  before: function() {
    var newItems = [];
    for (var i = 0; i < arguments.length; i++) {
      newItems.push(arguments[i]);
    }
    this.parent._splice(this.parent.indexOf(this), 0, newItems);
  },
  after: function() {
    var newItems = [];
    for (var i = 0; i < arguments.length; i++) {
      newItems.push(arguments[i]);
    }
    this.parent._splice(this.parent.indexOf(this) + 1, 0, newItems);
  },
  replace: function() {
    var newItems = [];
    for (var i = 0; i < arguments.length; i++) {
      newItems.push(arguments[i]);
    }
    this.parent._splice(this.parent.indexOf(this), 1, newItems);
  },
  remove: function() {
    this.parent._splice(this.parent.indexOf(this), 1);
  },
  // Gets the leaf TimedItems currently in effect. Note that this is a superset
  // of the leaf TimedItems in their active interval, as a TimedItem can have an
  // effect outside its active interval due to fill.
  _getLeafItemsInEffect: function(items) {
    if (this._timeFraction !== null) {
      this._getLeafItemsInEffectImpl(items);
    }
  },
  _getLeafItemsInEffectImpl: abstractMethod,
  _hasFutureAnimation: function(timeDirectionForwards) {
    return timeDirectionForwards ? this._inheritedTime < this.endTime :
        this._inheritedTime > this.startTime;
  },
  _isPastEndOfActiveInterval: function() {
    return this._inheritedTime >= this.endTime;
  },
  get player() {
    return this.parent === null ?
        this._player : this.parent.player;
  },
  _isCurrent: function() {
    return !this._isPastEndOfActiveInterval() ||
           (this.parent !== null && this.parent._isCurrent());
  },
  _isTargetingElement: abstractMethod,
  _getAnimationsTargetingElement: abstractMethod,
  _netEffectivePlaybackRate: function() {
    var effectivePlaybackRate = this._isCurrentDirectionForwards() ?
        this.timing.playbackRate : -this.timing.playbackRate;
    return this.parent === null ? effectivePlaybackRate :
        effectivePlaybackRate * this.parent._netEffectivePlaybackRate();
  },
  // Note that this restriction is currently incomplete - for example,
  // Animations which are playing forwards and have a fill of backwards
  // are not in effect unless current.
  // TODO: Complete this restriction.
  _hasFutureEffect: function() {
    return this._isCurrent() || this._fill !== 'none';
  },
  _toSubRanges: function(fromTime, toTime, iterationTimes) {
    if (fromTime > toTime) {
      var revRanges = this._toSubRanges(toTime, fromTime, iterationTimes);
      revRanges.ranges.forEach(function(a) { a.reverse(); });
      revRanges.ranges.reverse();
      revRanges.start = iterationTimes.length - revRanges.start - 1;
      revRanges.delta = -1;
      return revRanges;
    }
    var skipped = 0;
    // TODO: this should be calculatable. This would be more efficient
    // than searching through the list.
    while (iterationTimes[skipped] < fromTime) {
      skipped++;
    }
    var currentStart = fromTime;
    var ranges = [];
    for (var i = skipped; i < iterationTimes.length; i++) {
      if (iterationTimes[i] < toTime) {
        ranges.push([currentStart, iterationTimes[i]]);
        currentStart = iterationTimes[i];
      } else {
        ranges.push([currentStart, toTime]);
        return {start: skipped, delta: 1, ranges: ranges};
      }
    }
    ranges.push([currentStart, toTime]);
    return {start: skipped, delta: 1, ranges: ranges};
  }
};

var TimingEvent = function(
    token, target, type, localTime, timelineTime, iterationIndex, seeked) {
  if (token !== constructorToken) {
    throw new TypeError('Illegal constructor');
  }
  this._initialize(target);
  this._type = type;
  this.localTime = localTime;
  this.timelineTime = timelineTime;
  this.iterationIndex = iterationIndex;
  this.seeked = seeked ? true : false;
};

TimingEvent.prototype = createEventPrototype();

var isEffectCallback = function(animationEffect) {
  return typeof animationEffect === 'function';
};

var interpretAnimationEffect = function(animationEffect) {
  if (animationEffect instanceof AnimationEffect ||
      isEffectCallback(animationEffect)) {
    return animationEffect;
  } else if (isDefinedAndNotNull(animationEffect) &&
      typeof animationEffect === 'object') {
    // The spec requires animationEffect to be an instance of
    // OneOrMoreKeyframes, but this type is just a dictionary or a list of
    // dictionaries, so the best we can do is test for an object.
    return new KeyframeEffect(animationEffect);
  }
  return null;
};

var cloneAnimationEffect = function(animationEffect) {
  if (animationEffect instanceof AnimationEffect) {
    return animationEffect.clone();
  } else if (isEffectCallback(animationEffect)) {
    return animationEffect;
  } else {
    return null;
  }
};



/** @constructor */
var Animation = function(target, animationEffect, timingInput) {
  enterModifyCurrentAnimationState();
  try {
    TimedItem.call(this, constructorToken, timingInput);
    this.effect = interpretAnimationEffect(animationEffect);
    this._target = target;
  } finally {
    exitModifyCurrentAnimationState(null);
  }
};

Animation.prototype = createObject(TimedItem.prototype, {
  _resolveFillMode: function(fillMode) {
    return fillMode === 'auto' ? 'none' : fillMode;
  },
  _sample: function() {
    if (isDefinedAndNotNull(this.effect) &&
        !(this.target instanceof PseudoElementReference)) {
      if (isEffectCallback(this.effect)) {
        this.effect(this._timeFraction, this.target, this);
      } else {
        this.effect._sample(this._timeFraction, this.currentIteration,
            this.target, this.underlyingValue);
      }
    }
  },
  _getLeafItemsInEffectImpl: function(items) {
    items.push(this);
  },
  _isTargetingElement: function(element) {
    return element === this.target;
  },
  _getAnimationsTargetingElement: function(element, animations) {
    if (this._isTargetingElement(element)) {
      animations.push(this);
    }
  },
  get target() {
    return this._target;
  },
  set effect(effect) {
    enterModifyCurrentAnimationState();
    try {
      this._effect = effect;
      this.timing._invalidateTimingFunction();
    } finally {
      exitModifyCurrentAnimationState(
          Boolean(this.player) ? repeatLastTick : null);
    }
  },
  get effect() {
    return this._effect;
  },
  clone: function() {
    return new Animation(this.target,
        cloneAnimationEffect(this.effect), this.timing._dict);
  },
  toString: function() {
    var effectString = '<none>';
    if (this.effect instanceof AnimationEffect) {
      effectString = this.effect.toString();
    } else if (isEffectCallback(this.effect)) {
      effectString = 'Effect callback';
    }
    return 'Animation ' + this.startTime + '-' + this.endTime + ' (' +
        this.localTime + ') ' + effectString;
  }
});

function throwNewHierarchyRequestError() {
  var element = document.createElement('span');
  element.appendChild(element);
}



/** @constructor */
var TimedItemList = function(token, children) {
  if (token !== constructorToken) {
    throw new TypeError('Illegal constructor');
  }
  this._children = children;
  this._getters = 0;
  this._ensureGetters();
};

TimedItemList.prototype = {
  get length() {
    return this._children.length;
  },
  _ensureGetters: function() {
    while (this._getters < this._children.length) {
      this._ensureGetter(this._getters++);
    }
  },
  _ensureGetter: function(i) {
    Object.defineProperty(this, i, {
      get: function() {
        return this._children[i];
      }
    });
  }
};



/** @constructor */
var TimingGroup = function(token, type, children, timing) {
  if (token !== constructorToken) {
    throw new TypeError('Illegal constructor');
  }
  // Take a copy of the children array, as it could be modified as a side-effect
  // of creating this object. See
  // https://github.com/web-animations/web-animations-js/issues/65 for details.
  var childrenCopy = (children && Array.isArray(children)) ?
      children.slice() : [];
  // used by TimedItem via _intrinsicDuration(), so needs to be set before
  // initializing super.
  this.type = type || 'par';
  this._children = [];
  this._cachedTimedItemList = null;
  this._cachedIntrinsicDuration = null;
  TimedItem.call(this, constructorToken, timing);
  // We add children after setting the parent. This means that if an ancestor
  // (including the parent) is specified as a child, it will be removed from our
  // ancestors and used as a child,
  this.append.apply(this, childrenCopy);
};

TimingGroup.prototype = createObject(TimedItem.prototype, {
  _resolveFillMode: function(fillMode) {
    return fillMode === 'auto' ? 'both' : fillMode;
  },
  _childrenStateModified: function() {
    // See _updateChildStartTimes().
    this._isInChildrenStateModified = true;
    if (this._cachedTimedItemList) {
      this._cachedTimedItemList._ensureGetters();
    }
    this._cachedIntrinsicDuration = null;

    // We need to walk up and down the tree to re-layout. endTime and the
    // various durations (which are all calculated lazily) are the only
    // properties of a TimedItem which can affect the layout of its ancestors.
    // So it should be sufficient to simply update start times and time markers
    // on the way down.

    // This calls up to our parent, then calls _updateTimeMarkers().
    this._updateInternalState();
    this._updateChildInheritedTimes();

    // Update child start times before walking down.
    this._updateChildStartTimes();

    this._isInChildrenStateModified = false;
  },
  _updateInheritedTime: function(inheritedTime) {
    this._inheritedTime = inheritedTime;
    this._updateTimeMarkers();
    this._updateChildInheritedTimes();
  },
  _updateChildInheritedTimes: function() {
    for (var i = 0; i < this._children.length; i++) {
      var child = this._children[i];
      child._updateInheritedTime(this._iterationTime);
    }
  },
  _updateChildStartTimes: function() {
    if (this.type === 'seq') {
      var cumulativeStartTime = 0;
      for (var i = 0; i < this._children.length; i++) {
        var child = this._children[i];
        if (child._stashedStartTime === undefined) {
          child._stashedStartTime = child._startTime;
        }
        child._startTime = cumulativeStartTime;
        // Avoid updating the child's inherited time and time markers if this is
        // about to be done in the down phase of _childrenStateModified().
        if (!child._isInChildrenStateModified) {
          // This calls _updateTimeMarkers() on the child.
          child._updateInheritedTime(this._iterationTime);
        }
        cumulativeStartTime += Math.max(0, child.timing.delay +
            child.activeDuration + child.timing.endDelay);
      }
    }
  },
  get children() {
    if (!this._cachedTimedItemList) {
      this._cachedTimedItemList = new TimedItemList(
          constructorToken, this._children);
    }
    return this._cachedTimedItemList;
  },
  get firstChild() {
    return this._children[0];
  },
  get lastChild() {
    return this._children[this.children.length - 1];
  },
  _intrinsicDuration: function() {
    if (!isDefinedAndNotNull(this._cachedIntrinsicDuration)) {
      if (this.type === 'par') {
        var dur = Math.max.apply(undefined, this._children.map(function(a) {
          return a.endTime;
        }));
        this._cachedIntrinsicDuration = Math.max(0, dur);
      } else if (this.type === 'seq') {
        var result = 0;
        this._children.forEach(function(a) {
          result += a.activeDuration + a.timing.delay + a.timing.endDelay;
        });
        this._cachedIntrinsicDuration = result;
      } else {
        throw 'Unsupported type ' + this.type;
      }
    }
    return this._cachedIntrinsicDuration;
  },
  _getLeafItemsInEffectImpl: function(items) {
    for (var i = 0; i < this._children.length; i++) {
      this._children[i]._getLeafItemsInEffect(items);
    }
  },
  clone: function() {
    var children = [];
    this._children.forEach(function(child) {
      children.push(child.clone());
    });
    return this.type === 'par' ?
        new AnimationGroup(children, this.timing._dict) :
        new AnimationSequence(children, this.timing._dict);
  },
  clear: function() {
    this._splice(0, this._children.length);
  },
  append: function() {
    var newItems = [];
    for (var i = 0; i < arguments.length; i++) {
      newItems.push(arguments[i]);
    }
    this._splice(this._children.length, 0, newItems);
  },
  prepend: function() {
    var newItems = [];
    for (var i = 0; i < arguments.length; i++) {
      newItems.push(arguments[i]);
    }
    this._splice(0, 0, newItems);
  },
  _addInternal: function(child) {
    this._children.push(child);
    this._childrenStateModified();
  },
  indexOf: function(item) {
    return this._children.indexOf(item);
  },
  _splice: function(start, deleteCount, newItems) {
    enterModifyCurrentAnimationState();
    try {
      var args = arguments;
      if (args.length === 3) {
        args = [start, deleteCount].concat(newItems);
      }
      for (var i = 2; i < args.length; i++) {
        var newChild = args[i];
        if (this._isInclusiveAncestor(newChild)) {
          throwNewHierarchyRequestError();
        }
        newChild._reparent(this);
      }
      var result = Array.prototype.splice.apply(this._children, args);
      for (var i = 0; i < result.length; i++) {
        result[i]._parent = null;
      }
      this._childrenStateModified();
      return result;
    } finally {
      exitModifyCurrentAnimationState(
          Boolean(this.player) ? repeatLastTick : null);
    }
  },
  _isInclusiveAncestor: function(item) {
    for (var ancestor = this; ancestor !== null; ancestor = ancestor.parent) {
      if (ancestor === item) {
        return true;
      }
    }
    return false;
  },
  _isTargetingElement: function(element) {
    return this._children.some(function(child) {
      return child._isTargetingElement(element);
    });
  },
  _getAnimationsTargetingElement: function(element, animations) {
    this._children.map(function(child) {
      return child._getAnimationsTargetingElement(element, animations);
    });
  },
  toString: function() {
    return this.type + ' ' + this.startTime + '-' + this.endTime + ' (' +
        this.localTime + ') ' + ' [' +
        this._children.map(function(a) { return a.toString(); }) + ']';
  }
});



/** @constructor */
var AnimationGroup = function(children, timing, parent) {
  TimingGroup.call(this, constructorToken, 'par', children, timing, parent);
};

AnimationGroup.prototype = Object.create(TimingGroup.prototype);



/** @constructor */
var AnimationSequence = function(children, timing, parent) {
  TimingGroup.call(this, constructorToken, 'seq', children, timing, parent);
};

AnimationSequence.prototype = Object.create(TimingGroup.prototype);



/** @constructor */
var PseudoElementReference = function(element, pseudoElement) {
  this.element = element;
  this.pseudoElement = pseudoElement;
  console.warn('PseudoElementReference is not supported.');
};



/** @constructor */
var MediaReference = function(mediaElement, timing, parent, delta) {
  TimedItem.call(this, constructorToken, timing, parent);
  this._media = mediaElement;

  // We can never be sure when _updateInheritedTime() is going to be called
  // next, due to skipped frames or the player being seeked. Plus the media
  // element's currentTime may drift from our iterationTime. So if a media
  // element has loop set, we can't be sure that we'll stop it before it wraps.
  // For this reason, we simply disable looping.
  // TODO: Maybe we should let it loop if our duration exceeds it's
  // length?
  this._media.loop = false;

  // If the media element has a media controller, we detach it. This mirrors the
  // behaviour when re-parenting a TimedItem, or attaching one to an
  // AnimationPlayer.
  // TODO: It would be neater to assign to MediaElement.controller, but this was
  // broken in Chrome until recently. See crbug.com/226270.
  this._media.mediaGroup = '';

  this._delta = delta;
};

MediaReference.prototype = createObject(TimedItem.prototype, {
  _resolveFillMode: function(fillMode) {
    // TODO: Fill modes for MediaReferences are still undecided. The spec is not
    // clear what 'auto' should mean for TimedItems other than Animations and
    // groups.
    return fillMode === 'auto' ? 'none' : fillMode;
  },
  _intrinsicDuration: function() {
    // TODO: This should probably default to zero. But doing so means that as
    // soon as our inheritedTime is zero, the polyfill deems the animation to be
    // done and stops ticking, so we don't get any further calls to
    // _updateInheritedTime(). One way around this would be to modify
    // TimedItem._isPastEndOfActiveInterval() to recurse down the tree, then we
    // could override it here.
    return isNaN(this._media.duration) ?
        Infinity : this._media.duration / this._media.defaultPlaybackRate;
  },
  _unscaledMediaCurrentTime: function() {
    return this._media.currentTime / this._media.defaultPlaybackRate;
  },
  _getLeafItemsInEffectImpl: function(items) {
    items.push(this);
  },
  _ensurePlaying: function() {
    // The media element is paused when created.
    if (this._media.paused) {
      this._media.play();
    }
  },
  _ensurePaused: function() {
    if (!this._media.paused) {
      this._media.pause();
    }
  },
  _isSeekableUnscaledTime: function(time) {
    var seekTime = time * this._media.defaultPlaybackRate;
    var ranges = this._media.seekable;
    for (var i = 0; i < ranges.length; i++) {
      if (seekTime >= ranges.start(i) && seekTime <= ranges.end(i)) {
        return true;
      }
    }
    return false;
  },
  // Note that a media element's timeline may not start at zero, although its
  // duration is always the timeline time at the end point. This means that an
  // element's duration isn't always it's length and not all values of the
  // timline are seekable. Furthermore, some types of media further limit the
  // range of seekable timeline times. For this reason, we always map an
  // iteration to the range [0, duration] and simply seek to the nearest
  // seekable time.
  _ensureIsAtUnscaledTime: function(time) {
    if (this._unscaledMediaCurrentTime() !== time) {
      this._media.currentTime = time * this._media.defaultPlaybackRate;
    }
  },
  // This is called by the polyfill on each tick when our AnimationPlayer's tree
  // is active.
  _updateInheritedTime: function(inheritedTime) {
    this._inheritedTime = inheritedTime;
    this._updateTimeMarkers();

    // The polyfill uses a sampling model whereby time values are propagated
    // down the tree at each sample. However, for the media item, we need to use
    // play() and pause().

    // Handle the case of being outside our effect interval.
    if (this._iterationTime === null) {
      this._ensureIsAtUnscaledTime(0);
      this._ensurePaused();
      return;
    }

    if (this._iterationTime >= this._intrinsicDuration()) {
      // Our iteration time exceeds the media element's duration, so just make
      // sure the media element is at the end. It will stop automatically, but
      // that could take some time if the seek below is significant, so force
      // it.
      this._ensureIsAtUnscaledTime(this._intrinsicDuration());
      this._ensurePaused();
      return;
    }

    var finalIteration = this._floorWithOpenClosedRange(
        this.timing.iterationStart + this.timing._iterations(), 1.0);
    var endTimeFraction = this._modulusWithOpenClosedRange(
        this.timing.iterationStart + this.timing._iterations(), 1.0);
    if (this.currentIteration === finalIteration &&
        this._timeFraction === endTimeFraction &&
        this._intrinsicDuration() >= this.duration) {
      // We have reached the end of our final iteration, but the media element
      // is not done.
      this._ensureIsAtUnscaledTime(this.duration * endTimeFraction);
      this._ensurePaused();
      return;
    }

    // Set the appropriate playback rate.
    var playbackRate =
        this._media.defaultPlaybackRate * this._netEffectivePlaybackRate();
    if (this._media.playbackRate !== playbackRate) {
      this._media.playbackRate = playbackRate;
    }

    // Set the appropriate play/pause state. Note that we may not be able to
    // seek to the desired time. In this case, the media element's seek
    // algorithm repositions the seek to the nearest seekable time. This is OK,
    // but in this case, we don't want to play the media element, as it prevents
    // us from synchronising properly.
    if (this.player.paused ||
        !this._isSeekableUnscaledTime(this._iterationTime)) {
      this._ensurePaused();
    } else {
      this._ensurePlaying();
    }

    // Seek if required. This could be due to our AnimationPlayer being seeked,
    // or video slippage. We need to handle the fact that the video may not play
    // at exactly the right speed. There's also a variable delay when the video
    // is first played.
    // TODO: What's the right value for this delta?
    var delta = isDefinedAndNotNull(this._delta) ? this._delta :
        0.2 * Math.abs(this._media.playbackRate);
    if (Math.abs(this._iterationTime - this._unscaledMediaCurrentTime()) >
        delta) {
      this._ensureIsAtUnscaledTime(this._iterationTime);
    }
  },
  _isTargetingElement: function(element) {
    return this._media === element;
  },
  _getAnimationsTargetingElement: function() { },
  _attach: function(player) {
    this._ensurePaused();
    TimedItem.prototype._attach.call(this, player);
  }
});



/** @constructor */
var AnimationEffect = function(token) {
  if (token !== constructorToken) {
    throw new TypeError('Illegal constructor');
  }
};

AnimationEffect.prototype = {
  _sample: abstractMethod,
  clone: abstractMethod,
  toString: abstractMethod
};

var clamp = function(x, min, max) {
  return Math.max(Math.min(x, max), min);
};



/** @constructor */
var MotionPathEffect = function(path, autoRotate, angle, composite) {
  var iterationComposite = undefined;
  var options = autoRotate;
  if (typeof options == 'string' || options instanceof String ||
      angle || composite) {
    // FIXME: add deprecation warning - please pass an options dictionary to
    // MotionPathEffect constructor
  } else if (options) {
    autoRotate = options.autoRotate;
    angle = options.angle;
    composite = options.composite;
    iterationComposite = options.iterationComposite;
  }

  enterModifyCurrentAnimationState();
  try {
    AnimationEffect.call(this, constructorToken);

    this.composite = composite;
    this.iterationComposite = iterationComposite;

    // TODO: path argument is not in the spec -- seems useful since
    // SVGPathSegList doesn't have a constructor.
    this.autoRotate = isDefined(autoRotate) ? autoRotate : 'none';
    this.angle = isDefined(angle) ? angle : 0;
    this._path = document.createElementNS(SVG_NS, 'path');
    if (path instanceof SVGPathSegList) {
      this.segments = path;
    } else {
      var tempPath = document.createElementNS(SVG_NS, 'path');
      tempPath.setAttribute('d', String(path));
      this.segments = tempPath.pathSegList;
    }
  } finally {
    exitModifyCurrentAnimationState(null);
  }
};

MotionPathEffect.prototype = createObject(AnimationEffect.prototype, {
  get composite() {
    return this._composite;
  },
  set composite(value) {
    enterModifyCurrentAnimationState();
    try {
      // Use the default value if an invalid string is specified.
      this._composite = value === 'add' ? 'add' : 'replace';
    } finally {
      exitModifyCurrentAnimationState(repeatLastTick);
    }
  },
  get iterationComposite() {
    return this._iterationComposite;
  },
  set iterationComposite(value) {
    enterModifyCurrentAnimationState();
    try {
      // Use the default value if an invalid string is specified.
      this._iterationComposite =
          value === 'accumulate' ? 'accumulate' : 'replace';
      this._updateOffsetPerIteration();
    } finally {
      exitModifyCurrentAnimationState(repeatLastTick);
    }
  },
  _sample: function(timeFraction, currentIteration, target) {
    // TODO: Handle accumulation.
    var lengthAtTimeFraction = this._lengthAtTimeFraction(timeFraction);
    var point = this._path.getPointAtLength(lengthAtTimeFraction);
    var x = point.x - target.offsetWidth / 2;
    var y = point.y - target.offsetHeight / 2;
    if (currentIteration !== 0 && this._offsetPerIteration) {
      x += this._offsetPerIteration.x * currentIteration;
      y += this._offsetPerIteration.y * currentIteration;
    }
    // TODO: calc(point.x - 50%) doesn't work?
    var value = [{t: 'translate', d: [{px: x}, {px: y}]}];
    var angle = this.angle;
    if (this._autoRotate === 'auto-rotate') {
      // Super hacks
      var lastPoint = this._path.getPointAtLength(lengthAtTimeFraction - 0.01);
      var dx = point.x - lastPoint.x;
      var dy = point.y - lastPoint.y;
      var rotation = Math.atan2(dy, dx);
      angle += rotation / 2 / Math.PI * 360;
    }
    value.push({t: 'rotate', d: [angle]});
    compositor.setAnimatedValue(target, 'transform',
        new AddReplaceCompositableValue(value, this.composite));
  },
  _lengthAtTimeFraction: function(timeFraction) {
    var segmentCount = this._cumulativeLengths.length - 1;
    if (!segmentCount) {
      return 0;
    }
    var scaledFraction = timeFraction * segmentCount;
    var index = clamp(Math.floor(scaledFraction), 0, segmentCount);
    return this._cumulativeLengths[index] + ((scaledFraction % 1) * (
        this._cumulativeLengths[index + 1] - this._cumulativeLengths[index]));
  },
  _updateOffsetPerIteration: function() {
    if (this.iterationComposite === 'accumulate' &&
        this._cumulativeLengths &&
        this._cumulativeLengths.length > 0) {
      this._offsetPerIteration = this._path.getPointAtLength(
          this._cumulativeLengths[this._cumulativeLengths.length - 1]);
    } else {
      this._offsetPerIteration = null;
    }
  },
  clone: function() {
    return new MotionPathEffect(this._path.getAttribute('d'));
  },
  toString: function() {
    return '<MotionPathEffect>';
  },
  set autoRotate(autoRotate) {
    enterModifyCurrentAnimationState();
    try {
      this._autoRotate = String(autoRotate);
    } finally {
      exitModifyCurrentAnimationState(repeatLastTick);
    }
  },
  get autoRotate() {
    return this._autoRotate;
  },
  set angle(angle) {
    enterModifyCurrentAnimationState();
    try {
      // TODO: This should probably be a string with a unit, but the spec
      //       says it's a double.
      this._angle = Number(angle);
    } finally {
      exitModifyCurrentAnimationState(repeatLastTick);
    }
  },
  get angle() {
    return this._angle;
  },
  set segments(segments) {
    enterModifyCurrentAnimationState();
    try {
      var targetSegments = this.segments;
      targetSegments.clear();
      var cumulativeLengths = [0];
      // TODO: *moving* the path segments is not correct, but pathSegList
      //       is read only
      var items = segments.numberOfItems;
      while (targetSegments.numberOfItems < items) {
        var segment = segments.removeItem(0);
        targetSegments.appendItem(segment);
        if (segment.pathSegType !== SVGPathSeg.PATHSEG_MOVETO_REL &&
            segment.pathSegType !== SVGPathSeg.PATHSEG_MOVETO_ABS) {
          cumulativeLengths.push(this._path.getTotalLength());
        }
      }
      this._cumulativeLengths = cumulativeLengths;
      this._updateOffsetPerIteration();
    } finally {
      exitModifyCurrentAnimationState(repeatLastTick);
    }
  },
  get segments() {
    return this._path.pathSegList;
  }
});

var shorthandToLonghand = {
  background: [
    'backgroundImage',
    'backgroundPosition',
    'backgroundSize',
    'backgroundRepeat',
    'backgroundAttachment',
    'backgroundOrigin',
    'backgroundClip',
    'backgroundColor'
  ],
  border: [
    'borderTopColor',
    'borderTopStyle',
    'borderTopWidth',
    'borderRightColor',
    'borderRightStyle',
    'borderRightWidth',
    'borderBottomColor',
    'borderBottomStyle',
    'borderBottomWidth',
    'borderLeftColor',
    'borderLeftStyle',
    'borderLeftWidth'
  ],
  borderBottom: [
    'borderBottomWidth',
    'borderBottomStyle',
    'borderBottomColor'
  ],
  borderColor: [
    'borderTopColor',
    'borderRightColor',
    'borderBottomColor',
    'borderLeftColor'
  ],
  borderLeft: [
    'borderLeftWidth',
    'borderLeftStyle',
    'borderLeftColor'
  ],
  borderRadius: [
    'borderTopLeftRadius',
    'borderTopRightRadius',
    'borderBottomRightRadius',
    'borderBottomLeftRadius'
  ],
  borderRight: [
    'borderRightWidth',
    'borderRightStyle',
    'borderRightColor'
  ],
  borderTop: [
    'borderTopWidth',
    'borderTopStyle',
    'borderTopColor'
  ],
  borderWidth: [
    'borderTopWidth',
    'borderRightWidth',
    'borderBottomWidth',
    'borderLeftWidth'
  ],
  font: [
    'fontFamily',
    'fontSize',
    'fontStyle',
    'fontVariant',
    'fontWeight',
    'lineHeight'
  ],
  margin: [
    'marginTop',
    'marginRight',
    'marginBottom',
    'marginLeft'
  ],
  outline: [
    'outlineColor',
    'outlineStyle',
    'outlineWidth'
  ],
  padding: [
    'paddingTop',
    'paddingRight',
    'paddingBottom',
    'paddingLeft'
  ]
};

// This delegates parsing shorthand value syntax to the browser.
var shorthandExpanderElem = createDummyElement();
var expandShorthand = function(property, value, result) {
  shorthandExpanderElem.style[property] = value;
  var longProperties = shorthandToLonghand[property];
  for (var i in longProperties) {
    var longProperty = longProperties[i];
    var longhandValue = shorthandExpanderElem.style[longProperty];
    result[longProperty] = longhandValue;
  }
};

var normalizeKeyframeDictionary = function(properties) {
  var result = {
    offset: null,
    composite: null,
    easing: presetTimingFunctions.linear
  };
  var animationProperties = [];
  for (var property in properties) {
    // TODO: Apply the CSS property to IDL attribute algorithm.
    if (property === 'offset') {
      if (typeof properties.offset === 'number') {
        result.offset = properties.offset;
      }
    } else if (property === 'composite') {
      if (properties.composite === 'add' ||
          properties.composite === 'replace') {
        result.composite = properties.composite;
      }
    } else if (property === 'easing') {
      result.easing = TimingFunction.createFromString(properties.easing);
    } else {
      // TODO: Check whether this is a supported property.
      animationProperties.push(property);
    }
  }
  // TODO: Remove prefixed properties if the unprefixed version is also
  // supported and present.
  animationProperties = animationProperties.sort(playerSortFunction);
  for (var i = 0; i < animationProperties.length; i++) {
    // TODO: Apply the IDL attribute to CSS property algorithm.
    var property = animationProperties[i];
    // TODO: The spec does not specify how to handle null values.
    // See https://www.w3.org/Bugs/Public/show_bug.cgi?id=22572
    var value = isDefinedAndNotNull(properties[property]) ?
        properties[property].toString() : '';
    if (property in shorthandToLonghand) {
      expandShorthand(property, value, result);
    } else {
      result[property] = value;
    }
  }
  return result;
};



/** @constructor */
var KeyframeEffect = function(oneOrMoreKeyframeDictionaries,
    composite) {
  enterModifyCurrentAnimationState();
  try {
    AnimationEffect.call(this, constructorToken);

    this.composite = composite;

    this.setFrames(oneOrMoreKeyframeDictionaries);
  } finally {
    exitModifyCurrentAnimationState(null);
  }
};

KeyframeEffect.prototype = createObject(AnimationEffect.prototype, {
  get composite() {
    return this._composite;
  },
  set composite(value) {
    enterModifyCurrentAnimationState();
    try {
      // Use the default value if an invalid string is specified.
      this._composite = value === 'add' ? 'add' : 'replace';
    } finally {
      exitModifyCurrentAnimationState(repeatLastTick);
    }
  },
  getFrames: function() {
    return this._keyframeDictionaries.slice(0);
  },
  setFrames: function(oneOrMoreKeyframeDictionaries) {
    enterModifyCurrentAnimationState();
    try {
      if (!Array.isArray(oneOrMoreKeyframeDictionaries)) {
        oneOrMoreKeyframeDictionaries = [oneOrMoreKeyframeDictionaries];
      }
      this._keyframeDictionaries =
          oneOrMoreKeyframeDictionaries.map(normalizeKeyframeDictionary);
      // Set lazily
      this._cachedPropertySpecificKeyframes = null;
    } finally {
      exitModifyCurrentAnimationState(repeatLastTick);
    }
  },
  _sample: function(timeFraction, currentIteration, target) {
    var frames = this._propertySpecificKeyframes();
    for (var property in frames) {
      compositor.setAnimatedValue(target, property,
          this._sampleForProperty(
              frames[property], timeFraction, currentIteration));
    }
  },
  _sampleForProperty: function(frames, timeFraction, currentIteration) {
    ASSERT_ENABLED && assert(
        frames.length >= 2,
        'Interpolation requires at least two keyframes');

    var startKeyframeIndex;
    var length = frames.length;
    // We extrapolate differently depending on whether or not there are multiple
    // keyframes at offsets of 0 and 1.
    if (timeFraction < 0.0) {
      if (frames[1].offset === 0.0) {
        return new AddReplaceCompositableValue(frames[0].rawValue(),
            this._compositeForKeyframe(frames[0]));
      } else {
        startKeyframeIndex = 0;
      }
    } else if (timeFraction >= 1.0) {
      if (frames[length - 2].offset === 1.0) {
        return new AddReplaceCompositableValue(frames[length - 1].rawValue(),
            this._compositeForKeyframe(frames[length - 1]));
      } else {
        startKeyframeIndex = length - 2;
      }
    } else {
      for (var i = length - 1; i >= 0; i--) {
        if (frames[i].offset <= timeFraction) {
          ASSERT_ENABLED && assert(frames[i].offset !== 1.0);
          startKeyframeIndex = i;
          break;
        }
      }
    }
    var startKeyframe = frames[startKeyframeIndex];
    var endKeyframe = frames[startKeyframeIndex + 1];
    if (startKeyframe.offset === timeFraction) {
      return new AddReplaceCompositableValue(startKeyframe.rawValue(),
          this._compositeForKeyframe(startKeyframe));
    }
    if (endKeyframe.offset === timeFraction) {
      return new AddReplaceCompositableValue(endKeyframe.rawValue(),
          this._compositeForKeyframe(endKeyframe));
    }
    var intervalDistance = (timeFraction - startKeyframe.offset) /
        (endKeyframe.offset - startKeyframe.offset);
    if (startKeyframe.easing) {
      intervalDistance = startKeyframe.easing.scaleTime(intervalDistance);
    }
    return new BlendedCompositableValue(
        new AddReplaceCompositableValue(startKeyframe.rawValue(),
            this._compositeForKeyframe(startKeyframe)),
        new AddReplaceCompositableValue(endKeyframe.rawValue(),
            this._compositeForKeyframe(endKeyframe)),
        intervalDistance);
  },
  _propertySpecificKeyframes: function() {
    if (isDefinedAndNotNull(this._cachedPropertySpecificKeyframes)) {
      return this._cachedPropertySpecificKeyframes;
    }

    this._cachedPropertySpecificKeyframes = {};
    var distributedFrames = this._getDistributedKeyframes();
    for (var i = 0; i < distributedFrames.length; i++) {
      for (var property in distributedFrames[i].cssValues) {
        if (!(property in this._cachedPropertySpecificKeyframes)) {
          this._cachedPropertySpecificKeyframes[property] = [];
        }
        var frame = distributedFrames[i];
        this._cachedPropertySpecificKeyframes[property].push(
            new PropertySpecificKeyframe(frame.offset, frame.composite,
                frame.easing, property, frame.cssValues[property]));
      }
    }

    for (var property in this._cachedPropertySpecificKeyframes) {
      var frames = this._cachedPropertySpecificKeyframes[property];
      ASSERT_ENABLED && assert(
          frames.length > 0,
          'There should always be keyframes for each property');

      // Add synthetic keyframes at offsets of 0 and 1 if required.
      if (frames[0].offset !== 0.0) {
        var keyframe = new PropertySpecificKeyframe(0.0, 'add',
            presetTimingFunctions.linear, property, cssNeutralValue);
        frames.unshift(keyframe);
      }
      if (frames[frames.length - 1].offset !== 1.0) {
        var keyframe = new PropertySpecificKeyframe(1.0, 'add',
            presetTimingFunctions.linear, property, cssNeutralValue);
        frames.push(keyframe);
      }
      ASSERT_ENABLED && assert(
          frames.length >= 2,
          'There should be at least two keyframes including' +
          ' synthetic keyframes');
    }

    return this._cachedPropertySpecificKeyframes;
  },
  clone: function() {
    var result = new KeyframeEffect([], this.composite);
    result._keyframeDictionaries = this._keyframeDictionaries.slice(0);
    return result;
  },
  toString: function() {
    return '<KeyframeEffect>';
  },
  _compositeForKeyframe: function(keyframe) {
    return isDefinedAndNotNull(keyframe.composite) ?
        keyframe.composite : this.composite;
  },
  _allKeyframesUseSameCompositeOperation: function(keyframes) {
    ASSERT_ENABLED && assert(
        keyframes.length >= 1, 'This requires at least one keyframe');
    var composite = this._compositeForKeyframe(keyframes[0]);
    for (var i = 1; i < keyframes.length; i++) {
      if (this._compositeForKeyframe(keyframes[i]) !== composite) {
        return false;
      }
    }
    return true;
  },
  _areKeyframeDictionariesLooselySorted: function() {
    var previousOffset = -Infinity;
    for (var i = 0; i < this._keyframeDictionaries.length; i++) {
      if (isDefinedAndNotNull(this._keyframeDictionaries[i].offset)) {
        if (this._keyframeDictionaries[i].offset < previousOffset) {
          return false;
        }
        previousOffset = this._keyframeDictionaries[i].offset;
      }
    }
    return true;
  },
  // The spec describes both this process and the process for interpretting the
  // properties of a keyframe dictionary as 'normalizing'. Here we use the term
  // 'distributing' to avoid confusion with normalizeKeyframeDictionary().
  _getDistributedKeyframes: function() {
    if (!this._areKeyframeDictionariesLooselySorted()) {
      return [];
    }

    var distributedKeyframes = this._keyframeDictionaries.map(
        KeyframeInternal.createFromNormalizedProperties);

    // Remove keyframes with offsets out of bounds.
    var length = distributedKeyframes.length;
    var count = 0;
    for (var i = 0; i < length; i++) {
      var offset = distributedKeyframes[i].offset;
      if (isDefinedAndNotNull(offset)) {
        if (offset >= 0) {
          break;
        } else {
          count = i;
        }
      }
    }
    distributedKeyframes.splice(0, count);

    length = distributedKeyframes.length;
    count = 0;
    for (var i = length - 1; i >= 0; i--) {
      var offset = distributedKeyframes[i].offset;
      if (isDefinedAndNotNull(offset)) {
        if (offset <= 1) {
          break;
        } else {
          count = length - i;
        }
      }
    }
    distributedKeyframes.splice(length - count, count);

    // Distribute offsets.
    length = distributedKeyframes.length;
    if (length > 1 && !isDefinedAndNotNull(distributedKeyframes[0].offset)) {
      distributedKeyframes[0].offset = 0;
    }
    if (length > 0 &&
        !isDefinedAndNotNull(distributedKeyframes[length - 1].offset)) {
      distributedKeyframes[length - 1].offset = 1;
    }
    var lastOffsetIndex = 0;
    var nextOffsetIndex = 0;
    for (var i = 1; i < distributedKeyframes.length - 1; i++) {
      var keyframe = distributedKeyframes[i];
      if (isDefinedAndNotNull(keyframe.offset)) {
        lastOffsetIndex = i;
        continue;
      }
      if (i > nextOffsetIndex) {
        nextOffsetIndex = i;
        while (!isDefinedAndNotNull(
            distributedKeyframes[nextOffsetIndex].offset)) {
          nextOffsetIndex++;
        }
      }
      var lastOffset = distributedKeyframes[lastOffsetIndex].offset;
      var nextOffset = distributedKeyframes[nextOffsetIndex].offset;
      var unspecifiedKeyframes = nextOffsetIndex - lastOffsetIndex - 1;
      ASSERT_ENABLED && assert(unspecifiedKeyframes > 0);
      var localIndex = i - lastOffsetIndex;
      ASSERT_ENABLED && assert(localIndex > 0);
      distributedKeyframes[i].offset = lastOffset +
          (nextOffset - lastOffset) * localIndex / (unspecifiedKeyframes + 1);
    }

    // Remove invalid property values.
    for (var i = distributedKeyframes.length - 1; i >= 0; i--) {
      var keyframe = distributedKeyframes[i];
      for (var property in keyframe.cssValues) {
        if (!KeyframeInternal.isSupportedPropertyValue(
            keyframe.cssValues[property])) {
          delete(keyframe.cssValues[property]);
        }
      }
      if (Object.keys(keyframe).length === 0) {
        distributedKeyframes.splice(i, 1);
      }
    }

    return distributedKeyframes;
  }
});



/**
 * An internal representation of a keyframe. The Keyframe type from the spec is
 * just a dictionary and is not exposed.
 *
 * @constructor
 */
var KeyframeInternal = function(offset, composite, easing) {
  ASSERT_ENABLED && assert(
      typeof offset === 'number' || offset === null,
      'Invalid offset value');
  ASSERT_ENABLED && assert(
      composite === 'add' || composite === 'replace' || composite === null,
      'Invalid composite value');
  this.offset = offset;
  this.composite = composite;
  this.easing = easing;
  this.cssValues = {};
};

KeyframeInternal.prototype = {
  addPropertyValuePair: function(property, value) {
    ASSERT_ENABLED && assert(!this.cssValues.hasOwnProperty(property));
    this.cssValues[property] = value;
  },
  hasValueForProperty: function(property) {
    return property in this.cssValues;
  }
};

KeyframeInternal.isSupportedPropertyValue = function(value) {
  ASSERT_ENABLED && assert(
      typeof value === 'string' || value === cssNeutralValue);
  // TODO: Check this properly!
  return value !== '';
};

KeyframeInternal.createFromNormalizedProperties = function(properties) {
  ASSERT_ENABLED && assert(
      isDefinedAndNotNull(properties) && typeof properties === 'object',
      'Properties must be an object');
  var keyframe = new KeyframeInternal(properties.offset, properties.composite,
      properties.easing);
  for (var candidate in properties) {
    if (candidate !== 'offset' &&
        candidate !== 'composite' &&
        candidate !== 'easing') {
      keyframe.addPropertyValuePair(candidate, properties[candidate]);
    }
  }
  return keyframe;
};



/** @constructor */
var PropertySpecificKeyframe = function(offset, composite, easing, property,
    cssValue) {
  this.offset = offset;
  this.composite = composite;
  this.easing = easing;
  this.property = property;
  this.cssValue = cssValue;
  // Calculated lazily
  this.cachedRawValue = null;
};

PropertySpecificKeyframe.prototype = {
  rawValue: function() {
    if (!isDefinedAndNotNull(this.cachedRawValue)) {
      this.cachedRawValue = fromCssValue(this.property, this.cssValue);
    }
    return this.cachedRawValue;
  }
};



/** @constructor */
var TimingFunction = function() {
  throw new TypeError('Illegal constructor');
};

TimingFunction.prototype.scaleTime = abstractMethod;

TimingFunction.createFromString = function(spec, timedItem) {
  var preset = presetTimingFunctions[spec];
  if (preset) {
    return preset;
  }
  if (spec === 'paced') {
    if (timedItem instanceof Animation &&
        timedItem.effect instanceof MotionPathEffect) {
      return new PacedTimingFunction(timedItem.effect);
    }
    return presetTimingFunctions.linear;
  }
  var stepMatch = /steps\(\s*(\d+)\s*,\s*(start|end|middle)\s*\)/.exec(spec);
  if (stepMatch) {
    return new StepTimingFunction(Number(stepMatch[1]), stepMatch[2]);
  }
  var bezierMatch =
      /cubic-bezier\(([^,]*),([^,]*),([^,]*),([^)]*)\)/.exec(spec);
  if (bezierMatch) {
    return new CubicBezierTimingFunction([
      Number(bezierMatch[1]),
      Number(bezierMatch[2]),
      Number(bezierMatch[3]),
      Number(bezierMatch[4])
    ]);
  }
  return presetTimingFunctions.linear;
};



/** @constructor */
var CubicBezierTimingFunction = function(spec) {
  this.params = spec;
  this.map = [];
  for (var ii = 0; ii <= 100; ii += 1) {
    var i = ii / 100;
    this.map.push([
      3 * i * (1 - i) * (1 - i) * this.params[0] +
          3 * i * i * (1 - i) * this.params[2] + i * i * i,
      3 * i * (1 - i) * (1 - i) * this.params[1] +
          3 * i * i * (1 - i) * this.params[3] + i * i * i
    ]);
  }
};

CubicBezierTimingFunction.prototype = createObject(TimingFunction.prototype, {
  scaleTime: function(fraction) {
    var fst = 0;
    while (fst !== 100 && fraction > this.map[fst][0]) {
      fst += 1;
    }
    if (fraction === this.map[fst][0] || fst === 0) {
      return this.map[fst][1];
    }
    var yDiff = this.map[fst][1] - this.map[fst - 1][1];
    var xDiff = this.map[fst][0] - this.map[fst - 1][0];
    var p = (fraction - this.map[fst - 1][0]) / xDiff;
    return this.map[fst - 1][1] + p * yDiff;
  }
});



/** @constructor */
var StepTimingFunction = function(numSteps, position) {
  this.numSteps = numSteps;
  this.position = position || 'end';
};

StepTimingFunction.prototype = createObject(TimingFunction.prototype, {
  scaleTime: function(fraction) {
    if (fraction >= 1) {
      return 1;
    }
    var stepSize = 1 / this.numSteps;
    if (this.position === 'start') {
      fraction += stepSize;
    } else if (this.position === 'middle') {
      fraction += stepSize / 2;
    }
    return fraction - fraction % stepSize;
  }
});

var presetTimingFunctions = {
  'linear': null,
  'ease': new CubicBezierTimingFunction([0.25, 0.1, 0.25, 1.0]),
  'ease-in': new CubicBezierTimingFunction([0.42, 0, 1.0, 1.0]),
  'ease-out': new CubicBezierTimingFunction([0, 0, 0.58, 1.0]),
  'ease-in-out': new CubicBezierTimingFunction([0.42, 0, 0.58, 1.0]),
  'step-start': new StepTimingFunction(1, 'start'),
  'step-middle': new StepTimingFunction(1, 'middle'),
  'step-end': new StepTimingFunction(1, 'end')
};



/** @constructor */
var PacedTimingFunction = function(pathEffect) {
  ASSERT_ENABLED && assert(pathEffect instanceof MotionPathEffect);
  this._pathEffect = pathEffect;
  // Range is the portion of the effect over which we pace, normalized to
  // [0, 1].
  this._range = {min: 0, max: 1};
};

PacedTimingFunction.prototype = createObject(TimingFunction.prototype, {
  setRange: function(range) {
    ASSERT_ENABLED && assert(range.min >= 0 && range.min <= 1);
    ASSERT_ENABLED && assert(range.max >= 0 && range.max <= 1);
    ASSERT_ENABLED && assert(range.min < range.max);
    this._range = range;
  },
  scaleTime: function(fraction) {
    var cumulativeLengths = this._pathEffect._cumulativeLengths;
    var numSegments = cumulativeLengths.length - 1;
    if (!cumulativeLengths[numSegments] || fraction <= 0) {
      return this._range.min;
    }
    if (fraction >= 1) {
      return this._range.max;
    }
    var minLength = this.lengthAtIndex(this._range.min * numSegments);
    var maxLength = this.lengthAtIndex(this._range.max * numSegments);
    var length = interp(minLength, maxLength, fraction);
    var leftIndex = this.findLeftIndex(cumulativeLengths, length);
    var leftLength = cumulativeLengths[leftIndex];
    var segmentLength = cumulativeLengths[leftIndex + 1] - leftLength;
    if (segmentLength > 0) {
      return (leftIndex + (length - leftLength) / segmentLength) / numSegments;
    }
    return leftLength / cumulativeLengths.length;
  },
  findLeftIndex: function(array, value) {
    var leftIndex = 0;
    var rightIndex = array.length;
    while (rightIndex - leftIndex > 1) {
      var midIndex = (leftIndex + rightIndex) >> 1;
      if (array[midIndex] <= value) {
        leftIndex = midIndex;
      } else {
        rightIndex = midIndex;
      }
    }
    return leftIndex;
  },
  lengthAtIndex: function(i) {
    ASSERT_ENABLED &&
        console.assert(i >= 0 && i <= cumulativeLengths.length - 1);
    var leftIndex = Math.floor(i);
    var startLength = this._pathEffect._cumulativeLengths[leftIndex];
    var endLength = this._pathEffect._cumulativeLengths[leftIndex + 1];
    var indexFraction = i % 1;
    return interp(startLength, endLength, indexFraction);
  }
});

var interp = function(from, to, f, type) {
  if (Array.isArray(from) || Array.isArray(to)) {
    return interpArray(from, to, f, type);
  }
  var zero = (type && type.indexOf('scale') === 0) ? 1 : 0;
  to = isDefinedAndNotNull(to) ? to : zero;
  from = isDefinedAndNotNull(from) ? from : zero;

  return to * f + from * (1 - f);
};

var interpArray = function(from, to, f, type) {
  ASSERT_ENABLED && assert(
      Array.isArray(from) || from === null,
      'From is not an array or null');
  ASSERT_ENABLED && assert(
      Array.isArray(to) || to === null,
      'To is not an array or null');
  ASSERT_ENABLED && assert(
      from === null || to === null || from.length === to.length,
      'Arrays differ in length ' + from + ' : ' + to);
  var length = from ? from.length : to.length;

  var result = [];
  for (var i = 0; i < length; i++) {
    result[i] = interp(from ? from[i] : null, to ? to[i] : null, f, type);
  }
  return result;
};

var typeWithKeywords = function(keywords, type) {
  var isKeyword;
  if (keywords.length === 1) {
    var keyword = keywords[0];
    isKeyword = function(value) {
      return value === keyword;
    };
  } else {
    isKeyword = function(value) {
      return keywords.indexOf(value) >= 0;
    };
  }
  return createObject(type, {
    add: function(base, delta) {
      if (isKeyword(base) || isKeyword(delta)) {
        return delta;
      }
      return type.add(base, delta);
    },
    interpolate: function(from, to, f) {
      if (isKeyword(from) || isKeyword(to)) {
        return nonNumericType.interpolate(from, to, f);
      }
      return type.interpolate(from, to, f);
    },
    toCssValue: function(value, svgMode) {
      return isKeyword(value) ? value : type.toCssValue(value, svgMode);
    },
    fromCssValue: function(value) {
      return isKeyword(value) ? value : type.fromCssValue(value);
    }
  });
};

var numberType = {
  add: function(base, delta) {
    // If base or delta are 'auto', we fall back to replacement.
    if (base === 'auto' || delta === 'auto') {
      return nonNumericType.add(base, delta);
    }
    return base + delta;
  },
  interpolate: function(from, to, f) {
    // If from or to are 'auto', we fall back to step interpolation.
    if (from === 'auto' || to === 'auto') {
      return nonNumericType.interpolate(from, to);
    }
    return interp(from, to, f);
  },
  toCssValue: function(value) { return value + ''; },
  fromCssValue: function(value) {
    if (value === 'auto') {
      return 'auto';
    }
    var result = Number(value);
    return isNaN(result) ? undefined : result;
  }
};

var integerType = createObject(numberType, {
  interpolate: function(from, to, f) {
    // If from or to are 'auto', we fall back to step interpolation.
    if (from === 'auto' || to === 'auto') {
      return nonNumericType.interpolate(from, to);
    }
    return Math.floor(interp(from, to, f));
  }
});

var fontWeightType = {
  add: function(base, delta) { return base + delta; },
  interpolate: function(from, to, f) {
    return interp(from, to, f);
  },
  toCssValue: function(value) {
    value = Math.round(value / 100) * 100;
    value = clamp(value, 100, 900);
    if (value === 400) {
      return 'normal';
    }
    if (value === 700) {
      return 'bold';
    }
    return String(value);
  },
  fromCssValue: function(value) {
    // TODO: support lighter / darker ?
    var out = Number(value);
    if (isNaN(out) || out < 100 || out > 900 || out % 100 !== 0) {
      return undefined;
    }
    return out;
  }
};

// This regular expression is intentionally permissive, so that
// platform-prefixed versions of calc will still be accepted as
// input. While we are restrictive with the transform property
// name, we need to be able to read underlying calc values from
// computedStyle so can't easily restrict the input here.
var outerCalcRE = /^\s*(-webkit-)?calc\s*\(\s*([^)]*)\)/;
var valueRE = /^\s*(-?[0-9]+(\.[0-9])?[0-9]*)([a-zA-Z%]*)/;
var operatorRE = /^\s*([+-])/;
var autoRE = /^\s*auto/i;
var percentLengthType = {
  zero: function() { return {}; },
  add: function(base, delta) {
    var out = {};
    for (var value in base) {
      out[value] = base[value] + (delta[value] || 0);
    }
    for (value in delta) {
      if (value in base) {
        continue;
      }
      out[value] = delta[value];
    }
    return out;
  },
  interpolate: function(from, to, f) {
    var out = {};
    for (var value in from) {
      out[value] = interp(from[value], to[value], f);
    }
    for (var value in to) {
      if (value in out) {
        continue;
      }
      out[value] = interp(0, to[value], f);
    }
    return out;
  },
  toCssValue: function(value) {
    var s = '';
    var singleValue = true;
    for (var item in value) {
      if (s === '') {
        s = value[item] + item;
      } else if (singleValue) {
        if (value[item] !== 0) {
          s = features.calcFunction +
              '(' + s + ' + ' + value[item] + item + ')';
          singleValue = false;
        }
      } else if (value[item] !== 0) {
        s = s.substring(0, s.length - 1) + ' + ' + value[item] + item + ')';
      }
    }
    return s;
  },
  fromCssValue: function(value) {
    var result = percentLengthType.consumeValueFromString(value);
    if (result) {
      return result.value;
    }
    return undefined;
  },
  consumeValueFromString: function(value) {
    if (!isDefinedAndNotNull(value)) {
      return undefined;
    }
    var autoMatch = autoRE.exec(value);
    if (autoMatch) {
      return {
        value: { auto: true },
        remaining: value.substring(autoMatch[0].length)
      };
    }
    var out = {};
    var calcMatch = outerCalcRE.exec(value);
    if (!calcMatch) {
      var singleValue = valueRE.exec(value);
      if (singleValue && (singleValue.length === 4)) {
        out[singleValue[3]] = Number(singleValue[1]);
        return {
          value: out,
          remaining: value.substring(singleValue[0].length)
        };
      }
      return undefined;
    }
    var remaining = value.substring(calcMatch[0].length);
    var calcInnards = calcMatch[2];
    var firstTime = true;
    while (true) {
      var reversed = false;
      if (firstTime) {
        firstTime = false;
      } else {
        var op = operatorRE.exec(calcInnards);
        if (!op) {
          return undefined;
        }
        if (op[1] === '-') {
          reversed = true;
        }
        calcInnards = calcInnards.substring(op[0].length);
      }
      value = valueRE.exec(calcInnards);
      if (!value) {
        return undefined;
      }
      var valueUnit = value[3];
      var valueNumber = Number(value[1]);
      if (!isDefinedAndNotNull(out[valueUnit])) {
        out[valueUnit] = 0;
      }
      if (reversed) {
        out[valueUnit] -= valueNumber;
      } else {
        out[valueUnit] += valueNumber;
      }
      calcInnards = calcInnards.substring(value[0].length);
      if (/\s*/.exec(calcInnards)[0].length === calcInnards.length) {
        return {
          value: out,
          remaining: remaining
        };
      }
    }
  },
  negate: function(value) {
    var out = {};
    for (var unit in value) {
      out[unit] = -value[unit];
    }
    return out;
  }
};

var percentLengthAutoType = typeWithKeywords(['auto'], percentLengthType);

var positionKeywordRE = /^\s*left|^\s*center|^\s*right|^\s*top|^\s*bottom/i;
var positionType = {
  zero: function() { return [{ px: 0 }, { px: 0 }]; },
  add: function(base, delta) {
    return [
      percentLengthType.add(base[0], delta[0]),
      percentLengthType.add(base[1], delta[1])
    ];
  },
  interpolate: function(from, to, f) {
    return [
      percentLengthType.interpolate(from[0], to[0], f),
      percentLengthType.interpolate(from[1], to[1], f)
    ];
  },
  toCssValue: function(value) {
    return value.map(percentLengthType.toCssValue).join(' ');
  },
  fromCssValue: function(value) {
    var tokens = positionType.consumeAllTokensFromString(value);
    if (!tokens || tokens.length > 4) {
      return undefined;
    }

    if (tokens.length === 1) {
      var token = tokens[0];
      return (positionType.isHorizontalToken(token) ?
          [token, 'center'] : ['center', token]).map(positionType.resolveToken);
    }

    if (tokens.length === 2 &&
        positionType.isHorizontalToken(tokens[0]) &&
        positionType.isVerticalToken(tokens[1])) {
      return tokens.map(positionType.resolveToken);
    }

    if (tokens.filter(positionType.isKeyword).length !== 2) {
      return undefined;
    }

    var out = [undefined, undefined];
    var center = false;
    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];
      if (!positionType.isKeyword(token)) {
        return undefined;
      }
      if (token === 'center') {
        if (center) {
          return undefined;
        }
        center = true;
        continue;
      }
      var axis = Number(positionType.isVerticalToken(token));
      if (out[axis]) {
        return undefined;
      }
      if (i === tokens.length - 1 || positionType.isKeyword(tokens[i + 1])) {
        out[axis] = positionType.resolveToken(token);
        continue;
      }
      var percentLength = tokens[++i];
      if (token === 'bottom' || token === 'right') {
        percentLength = percentLengthType.negate(percentLength);
        percentLength['%'] = (percentLength['%'] || 0) + 100;
      }
      out[axis] = percentLength;
    }
    if (center) {
      if (!out[0]) {
        out[0] = positionType.resolveToken('center');
      } else if (!out[1]) {
        out[1] = positionType.resolveToken('center');
      } else {
        return undefined;
      }
    }
    return out.every(isDefinedAndNotNull) ? out : undefined;
  },
  consumeAllTokensFromString: function(remaining) {
    var tokens = [];
    while (remaining.trim()) {
      var result = positionType.consumeTokenFromString(remaining);
      if (!result) {
        return undefined;
      }
      tokens.push(result.value);
      remaining = result.remaining;
    }
    return tokens;
  },
  consumeTokenFromString: function(value) {
    var keywordMatch = positionKeywordRE.exec(value);
    if (keywordMatch) {
      return {
        value: keywordMatch[0].trim().toLowerCase(),
        remaining: value.substring(keywordMatch[0].length)
      };
    }
    return percentLengthType.consumeValueFromString(value);
  },
  resolveToken: function(token) {
    if (typeof token === 'string') {
      return percentLengthType.fromCssValue({
        left: '0%',
        center: '50%',
        right: '100%',
        top: '0%',
        bottom: '100%'
      }[token]);
    }
    return token;
  },
  isHorizontalToken: function(token) {
    if (typeof token === 'string') {
      return token in { left: true, center: true, right: true };
    }
    return true;
  },
  isVerticalToken: function(token) {
    if (typeof token === 'string') {
      return token in { top: true, center: true, bottom: true };
    }
    return true;
  },
  isKeyword: function(token) {
    return typeof token === 'string';
  }
};

// Spec: http://dev.w3.org/csswg/css-backgrounds/#background-position
var positionListType = {
  zero: function() { return [positionType.zero()]; },
  add: function(base, delta) {
    var out = [];
    var maxLength = Math.max(base.length, delta.length);
    for (var i = 0; i < maxLength; i++) {
      var basePosition = base[i] ? base[i] : positionType.zero();
      var deltaPosition = delta[i] ? delta[i] : positionType.zero();
      out.push(positionType.add(basePosition, deltaPosition));
    }
    return out;
  },
  interpolate: function(from, to, f) {
    var out = [];
    var maxLength = Math.max(from.length, to.length);
    for (var i = 0; i < maxLength; i++) {
      var fromPosition = from[i] ? from[i] : positionType.zero();
      var toPosition = to[i] ? to[i] : positionType.zero();
      out.push(positionType.interpolate(fromPosition, toPosition, f));
    }
    return out;
  },
  toCssValue: function(value) {
    return value.map(positionType.toCssValue).join(', ');
  },
  fromCssValue: function(value) {
    if (!isDefinedAndNotNull(value)) {
      return undefined;
    }
    if (!value.trim()) {
      return [positionType.fromCssValue('0% 0%')];
    }
    var positionValues = value.split(',');
    var out = positionValues.map(positionType.fromCssValue);
    return out.every(isDefinedAndNotNull) ? out : undefined;
  }
};

var rectangleRE = /rect\(([^,]+),([^,]+),([^,]+),([^)]+)\)/;
var rectangleType = {
  add: function(base, delta) {
    return {
      top: percentLengthType.add(base.top, delta.top),
      right: percentLengthType.add(base.right, delta.right),
      bottom: percentLengthType.add(base.bottom, delta.bottom),
      left: percentLengthType.add(base.left, delta.left)
    };
  },
  interpolate: function(from, to, f) {
    return {
      top: percentLengthType.interpolate(from.top, to.top, f),
      right: percentLengthType.interpolate(from.right, to.right, f),
      bottom: percentLengthType.interpolate(from.bottom, to.bottom, f),
      left: percentLengthType.interpolate(from.left, to.left, f)
    };
  },
  toCssValue: function(value) {
    return 'rect(' +
        percentLengthType.toCssValue(value.top) + ',' +
        percentLengthType.toCssValue(value.right) + ',' +
        percentLengthType.toCssValue(value.bottom) + ',' +
        percentLengthType.toCssValue(value.left) + ')';
  },
  fromCssValue: function(value) {
    var match = rectangleRE.exec(value);
    if (!match) {
      return undefined;
    }
    var out = {
      top: percentLengthType.fromCssValue(match[1]),
      right: percentLengthType.fromCssValue(match[2]),
      bottom: percentLengthType.fromCssValue(match[3]),
      left: percentLengthType.fromCssValue(match[4])
    };
    if (out.top && out.right && out.bottom && out.left) {
      return out;
    }
    return undefined;
  }
};

var originType = {
  zero: function() { return [{'%': 0}, {'%': 0}, {px: 0}]; },
  add: function(base, delta) {
    return [
      percentLengthType.add(base[0], delta[0]),
      percentLengthType.add(base[1], delta[1]),
      percentLengthType.add(base[2], delta[2])
    ];
  },
  interpolate: function(from, to, f) {
    return [
      percentLengthType.interpolate(from[0], to[0], f),
      percentLengthType.interpolate(from[1], to[1], f),
      percentLengthType.interpolate(from[2], to[2], f)
    ];
  },
  toCssValue: function(value) {
    var result = percentLengthType.toCssValue(value[0]) + ' ' +
        percentLengthType.toCssValue(value[1]);
    // Return the third value if it is non-zero.
    for (var unit in value[2]) {
      if (value[2][unit] !== 0) {
        return result + ' ' + percentLengthType.toCssValue(value[2]);
      }
    }
    return result;
  },
  fromCssValue: function(value) {
    var tokens = positionType.consumeAllTokensFromString(value);
    if (!tokens) {
      return undefined;
    }
    var out = ['center', 'center', {px: 0}];
    switch (tokens.length) {
      case 0:
        return originType.zero();
      case 1:
        if (positionType.isHorizontalToken(tokens[0])) {
          out[0] = tokens[0];
        } else if (positionType.isVerticalToken(tokens[0])) {
          out[1] = tokens[0];
        } else {
          return undefined;
        }
        return out.map(positionType.resolveToken);
      case 3:
        if (positionType.isKeyword(tokens[2])) {
          return undefined;
        }
        out[2] = tokens[2];
      case 2:
        if (positionType.isHorizontalToken(tokens[0]) &&
            positionType.isVerticalToken(tokens[1])) {
          out[0] = tokens[0];
          out[1] = tokens[1];
        } else if (positionType.isVerticalToken(tokens[0]) &&
            positionType.isHorizontalToken(tokens[1])) {
          out[0] = tokens[1];
          out[1] = tokens[0];
        } else {
          return undefined;
        }
        return out.map(positionType.resolveToken);
      default:
        return undefined;
    }
  }
};

var shadowType = {
  zero: function() {
    return {
      hOffset: lengthType.zero(),
      vOffset: lengthType.zero()
    };
  },
  _addSingle: function(base, delta) {
    if (base && delta && base.inset !== delta.inset) {
      return delta;
    }
    var result = {
      inset: base ? base.inset : delta.inset,
      hOffset: lengthType.add(
          base ? base.hOffset : lengthType.zero(),
          delta ? delta.hOffset : lengthType.zero()),
      vOffset: lengthType.add(
          base ? base.vOffset : lengthType.zero(),
          delta ? delta.vOffset : lengthType.zero()),
      blur: lengthType.add(
          base && base.blur || lengthType.zero(),
          delta && delta.blur || lengthType.zero())
    };
    if (base && base.spread || delta && delta.spread) {
      result.spread = lengthType.add(
          base && base.spread || lengthType.zero(),
          delta && delta.spread || lengthType.zero());
    }
    if (base && base.color || delta && delta.color) {
      result.color = colorType.add(
          base && base.color || colorType.zero(),
          delta && delta.color || colorType.zero());
    }
    return result;
  },
  add: function(base, delta) {
    var result = [];
    for (var i = 0; i < base.length || i < delta.length; i++) {
      result.push(this._addSingle(base[i], delta[i]));
    }
    return result;
  },
  _interpolateSingle: function(from, to, f) {
    if (from && to && from.inset !== to.inset) {
      return f < 0.5 ? from : to;
    }
    var result = {
      inset: from ? from.inset : to.inset,
      hOffset: lengthType.interpolate(
          from ? from.hOffset : lengthType.zero(),
          to ? to.hOffset : lengthType.zero(), f),
      vOffset: lengthType.interpolate(
          from ? from.vOffset : lengthType.zero(),
          to ? to.vOffset : lengthType.zero(), f),
      blur: lengthType.interpolate(
          from && from.blur || lengthType.zero(),
          to && to.blur || lengthType.zero(), f)
    };
    if (from && from.spread || to && to.spread) {
      result.spread = lengthType.interpolate(
          from && from.spread || lengthType.zero(),
          to && to.spread || lengthType.zero(), f);
    }
    if (from && from.color || to && to.color) {
      result.color = colorType.interpolate(
          from && from.color || colorType.zero(),
          to && to.color || colorType.zero(), f);
    }
    return result;
  },
  interpolate: function(from, to, f) {
    var result = [];
    for (var i = 0; i < from.length || i < to.length; i++) {
      result.push(this._interpolateSingle(from[i], to[i], f));
    }
    return result;
  },
  _toCssValueSingle: function(value) {
    return (value.inset ? 'inset ' : '') +
        lengthType.toCssValue(value.hOffset) + ' ' +
        lengthType.toCssValue(value.vOffset) + ' ' +
        lengthType.toCssValue(value.blur) +
        (value.spread ? ' ' + lengthType.toCssValue(value.spread) : '') +
        (value.color ? ' ' + colorType.toCssValue(value.color) : '');
  },
  toCssValue: function(value) {
    return value.map(this._toCssValueSingle).join(', ');
  },
  fromCssValue: function(value) {
    var shadowRE = /(([^(,]+(\([^)]*\))?)+)/g;
    var match;
    var shadows = [];
    while ((match = shadowRE.exec(value)) !== null) {
      shadows.push(match[0]);
    }

    var result = shadows.map(function(value) {
      if (value === 'none') {
        return shadowType.zero();
      }
      value = value.replace(/^\s+|\s+$/g, '');

      var partsRE = /([^ (]+(\([^)]*\))?)/g;
      var parts = [];
      while ((match = partsRE.exec(value)) !== null) {
        parts.push(match[0]);
      }

      if (parts.length < 2 || parts.length > 7) {
        return undefined;
      }
      var result = {
        inset: false
      };

      var lengths = [];
      while (parts.length) {
        var part = parts.shift();

        var length = lengthType.fromCssValue(part);
        if (length) {
          lengths.push(length);
          continue;
        }

        var color = colorType.fromCssValue(part);
        if (color) {
          result.color = color;
        }

        if (part === 'inset') {
          result.inset = true;
        }
      }

      if (lengths.length < 2 || lengths.length > 4) {
        return undefined;
      }
      result.hOffset = lengths[0];
      result.vOffset = lengths[1];
      if (lengths.length > 2) {
        result.blur = lengths[2];
      }
      if (lengths.length > 3) {
        result.spread = lengths[3];
      }
      return result;
    });

    return result.every(isDefined) ? result : undefined;
  }
};

var nonNumericType = {
  add: function(base, delta) {
    return isDefined(delta) ? delta : base;
  },
  interpolate: function(from, to, f) {
    return f < 0.5 ? from : to;
  },
  toCssValue: function(value) {
    return value;
  },
  fromCssValue: function(value) {
    return value;
  }
};

var visibilityType = createObject(nonNumericType, {
  interpolate: function(from, to, f) {
    if (from !== 'visible' && to !== 'visible') {
      return nonNumericType.interpolate(from, to, f);
    }
    if (f <= 0) {
      return from;
    }
    if (f >= 1) {
      return to;
    }
    return 'visible';
  },
  fromCssValue: function(value) {
    if (['visible', 'hidden', 'collapse'].indexOf(value) !== -1) {
      return value;
    }
    return undefined;
  }
});

var lengthType = percentLengthType;
var lengthAutoType = typeWithKeywords(['auto'], lengthType);

var colorRE = new RegExp(
    '(hsla?|rgba?)\\(' +
    '([\\-0-9]+%?),?\\s*' +
    '([\\-0-9]+%?),?\\s*' +
    '([\\-0-9]+%?)(?:,?\\s*([\\-0-9\\.]+%?))?' +
    '\\)');
var colorHashRE = new RegExp(
    '#([0-9A-Fa-f][0-9A-Fa-f]?)' +
    '([0-9A-Fa-f][0-9A-Fa-f]?)' +
    '([0-9A-Fa-f][0-9A-Fa-f]?)');

function hsl2rgb(h, s, l) {
  // Cribbed from http://dev.w3.org/csswg/css-color/#hsl-color
  // Wrap to 0->360 degrees (IE -10 === 350) then normalize
  h = (((h % 360) + 360) % 360) / 360;
  s = s / 100;
  l = l / 100;
  function hue2rgb(m1, m2, h) {
    if (h < 0) {
      h += 1;
    }
    if (h > 1) {
      h -= 1;
    }
    if (h * 6 < 1) {
      return m1 + (m2 - m1) * h * 6;
    }
    if (h * 2 < 1) {
      return m2;
    }
    if (h * 3 < 2) {
      return m1 + (m2 - m1) * (2 / 3 - h) * 6;
    }
    return m1;
  }
  var m2;
  if (l <= 0.5) {
    m2 = l * (s + 1);
  } else {
    m2 = l + s - l * s;
  }

  var m1 = l * 2 - m2;
  var r = Math.ceil(hue2rgb(m1, m2, h + 1 / 3) * 255);
  var g = Math.ceil(hue2rgb(m1, m2, h) * 255);
  var b = Math.ceil(hue2rgb(m1, m2, h - 1 / 3) * 255);
  return [r, g, b];
}

var namedColors = {
  aliceblue: [240, 248, 255, 1],
  antiquewhite: [250, 235, 215, 1],
  aqua: [0, 255, 255, 1],
  aquamarine: [127, 255, 212, 1],
  azure: [240, 255, 255, 1],
  beige: [245, 245, 220, 1],
  bisque: [255, 228, 196, 1],
  black: [0, 0, 0, 1],
  blanchedalmond: [255, 235, 205, 1],
  blue: [0, 0, 255, 1],
  blueviolet: [138, 43, 226, 1],
  brown: [165, 42, 42, 1],
  burlywood: [222, 184, 135, 1],
  cadetblue: [95, 158, 160, 1],
  chartreuse: [127, 255, 0, 1],
  chocolate: [210, 105, 30, 1],
  coral: [255, 127, 80, 1],
  cornflowerblue: [100, 149, 237, 1],
  cornsilk: [255, 248, 220, 1],
  crimson: [220, 20, 60, 1],
  cyan: [0, 255, 255, 1],
  darkblue: [0, 0, 139, 1],
  darkcyan: [0, 139, 139, 1],
  darkgoldenrod: [184, 134, 11, 1],
  darkgray: [169, 169, 169, 1],
  darkgreen: [0, 100, 0, 1],
  darkgrey: [169, 169, 169, 1],
  darkkhaki: [189, 183, 107, 1],
  darkmagenta: [139, 0, 139, 1],
  darkolivegreen: [85, 107, 47, 1],
  darkorange: [255, 140, 0, 1],
  darkorchid: [153, 50, 204, 1],
  darkred: [139, 0, 0, 1],
  darksalmon: [233, 150, 122, 1],
  darkseagreen: [143, 188, 143, 1],
  darkslateblue: [72, 61, 139, 1],
  darkslategray: [47, 79, 79, 1],
  darkslategrey: [47, 79, 79, 1],
  darkturquoise: [0, 206, 209, 1],
  darkviolet: [148, 0, 211, 1],
  deeppink: [255, 20, 147, 1],
  deepskyblue: [0, 191, 255, 1],
  dimgray: [105, 105, 105, 1],
  dimgrey: [105, 105, 105, 1],
  dodgerblue: [30, 144, 255, 1],
  firebrick: [178, 34, 34, 1],
  floralwhite: [255, 250, 240, 1],
  forestgreen: [34, 139, 34, 1],
  fuchsia: [255, 0, 255, 1],
  gainsboro: [220, 220, 220, 1],
  ghostwhite: [248, 248, 255, 1],
  gold: [255, 215, 0, 1],
  goldenrod: [218, 165, 32, 1],
  gray: [128, 128, 128, 1],
  green: [0, 128, 0, 1],
  greenyellow: [173, 255, 47, 1],
  grey: [128, 128, 128, 1],
  honeydew: [240, 255, 240, 1],
  hotpink: [255, 105, 180, 1],
  indianred: [205, 92, 92, 1],
  indigo: [75, 0, 130, 1],
  ivory: [255, 255, 240, 1],
  khaki: [240, 230, 140, 1],
  lavender: [230, 230, 250, 1],
  lavenderblush: [255, 240, 245, 1],
  lawngreen: [124, 252, 0, 1],
  lemonchiffon: [255, 250, 205, 1],
  lightblue: [173, 216, 230, 1],
  lightcoral: [240, 128, 128, 1],
  lightcyan: [224, 255, 255, 1],
  lightgoldenrodyellow: [250, 250, 210, 1],
  lightgray: [211, 211, 211, 1],
  lightgreen: [144, 238, 144, 1],
  lightgrey: [211, 211, 211, 1],
  lightpink: [255, 182, 193, 1],
  lightsalmon: [255, 160, 122, 1],
  lightseagreen: [32, 178, 170, 1],
  lightskyblue: [135, 206, 250, 1],
  lightslategray: [119, 136, 153, 1],
  lightslategrey: [119, 136, 153, 1],
  lightsteelblue: [176, 196, 222, 1],
  lightyellow: [255, 255, 224, 1],
  lime: [0, 255, 0, 1],
  limegreen: [50, 205, 50, 1],
  linen: [250, 240, 230, 1],
  magenta: [255, 0, 255, 1],
  maroon: [128, 0, 0, 1],
  mediumaquamarine: [102, 205, 170, 1],
  mediumblue: [0, 0, 205, 1],
  mediumorchid: [186, 85, 211, 1],
  mediumpurple: [147, 112, 219, 1],
  mediumseagreen: [60, 179, 113, 1],
  mediumslateblue: [123, 104, 238, 1],
  mediumspringgreen: [0, 250, 154, 1],
  mediumturquoise: [72, 209, 204, 1],
  mediumvioletred: [199, 21, 133, 1],
  midnightblue: [25, 25, 112, 1],
  mintcream: [245, 255, 250, 1],
  mistyrose: [255, 228, 225, 1],
  moccasin: [255, 228, 181, 1],
  navajowhite: [255, 222, 173, 1],
  navy: [0, 0, 128, 1],
  oldlace: [253, 245, 230, 1],
  olive: [128, 128, 0, 1],
  olivedrab: [107, 142, 35, 1],
  orange: [255, 165, 0, 1],
  orangered: [255, 69, 0, 1],
  orchid: [218, 112, 214, 1],
  palegoldenrod: [238, 232, 170, 1],
  palegreen: [152, 251, 152, 1],
  paleturquoise: [175, 238, 238, 1],
  palevioletred: [219, 112, 147, 1],
  papayawhip: [255, 239, 213, 1],
  peachpuff: [255, 218, 185, 1],
  peru: [205, 133, 63, 1],
  pink: [255, 192, 203, 1],
  plum: [221, 160, 221, 1],
  powderblue: [176, 224, 230, 1],
  purple: [128, 0, 128, 1],
  red: [255, 0, 0, 1],
  rosybrown: [188, 143, 143, 1],
  royalblue: [65, 105, 225, 1],
  saddlebrown: [139, 69, 19, 1],
  salmon: [250, 128, 114, 1],
  sandybrown: [244, 164, 96, 1],
  seagreen: [46, 139, 87, 1],
  seashell: [255, 245, 238, 1],
  sienna: [160, 82, 45, 1],
  silver: [192, 192, 192, 1],
  skyblue: [135, 206, 235, 1],
  slateblue: [106, 90, 205, 1],
  slategray: [112, 128, 144, 1],
  slategrey: [112, 128, 144, 1],
  snow: [255, 250, 250, 1],
  springgreen: [0, 255, 127, 1],
  steelblue: [70, 130, 180, 1],
  tan: [210, 180, 140, 1],
  teal: [0, 128, 128, 1],
  thistle: [216, 191, 216, 1],
  tomato: [255, 99, 71, 1],
  transparent: [0, 0, 0, 0],
  turquoise: [64, 224, 208, 1],
  violet: [238, 130, 238, 1],
  wheat: [245, 222, 179, 1],
  white: [255, 255, 255, 1],
  whitesmoke: [245, 245, 245, 1],
  yellow: [255, 255, 0, 1],
  yellowgreen: [154, 205, 50, 1]
};

var colorType = typeWithKeywords(['currentColor'], {
  zero: function() { return [0, 0, 0, 0]; },
  _premultiply: function(value) {
    var alpha = value[3];
    return [value[0] * alpha, value[1] * alpha, value[2] * alpha];
  },
  add: function(base, delta) {
    var alpha = Math.min(base[3] + delta[3], 1);
    if (alpha === 0) {
      return [0, 0, 0, 0];
    }
    base = this._premultiply(base);
    delta = this._premultiply(delta);
    return [(base[0] + delta[0]) / alpha, (base[1] + delta[1]) / alpha,
            (base[2] + delta[2]) / alpha, alpha];
  },
  interpolate: function(from, to, f) {
    var alpha = clamp(interp(from[3], to[3], f), 0, 1);
    if (alpha === 0) {
      return [0, 0, 0, 0];
    }
    from = this._premultiply(from);
    to = this._premultiply(to);
    return [interp(from[0], to[0], f) / alpha,
            interp(from[1], to[1], f) / alpha,
            interp(from[2], to[2], f) / alpha, alpha];
  },
  toCssValue: function(value) {
    return 'rgba(' + Math.round(value[0]) + ', ' + Math.round(value[1]) +
        ', ' + Math.round(value[2]) + ', ' + value[3] + ')';
  },
  fromCssValue: function(value) {
    // http://dev.w3.org/csswg/css-color/#color
    var out = [];

    var regexResult = colorHashRE.exec(value);
    if (regexResult) {
      if (value.length !== 4 && value.length !== 7) {
        return undefined;
      }

      var out = [];
      regexResult.shift();
      for (var i = 0; i < 3; i++) {
        if (regexResult[i].length === 1) {
          regexResult[i] = regexResult[i] + regexResult[i];
        }
        var v = Math.max(Math.min(parseInt(regexResult[i], 16), 255), 0);
        out[i] = v;
      }
      out.push(1.0);
    }

    var regexResult = colorRE.exec(value);
    if (regexResult) {
      regexResult.shift();
      var type = regexResult.shift().substr(0, 3);
      for (var i = 0; i < 3; i++) {
        var m = 1;
        if (regexResult[i][regexResult[i].length - 1] === '%') {
          regexResult[i] = regexResult[i].substr(0, regexResult[i].length - 1);
          m = 255.0 / 100.0;
        }
        if (type === 'rgb') {
          out[i] = clamp(Math.round(parseInt(regexResult[i], 10) * m), 0, 255);
        } else {
          out[i] = parseInt(regexResult[i], 10);
        }
      }

      // Convert hsl values to rgb value
      if (type === 'hsl') {
        out = hsl2rgb.apply(null, out);
      }

      if (typeof regexResult[3] !== 'undefined') {
        out[3] = Math.max(Math.min(parseFloat(regexResult[3]), 1.0), 0.0);
      } else {
        out.push(1.0);
      }
    }

    if (out.some(isNaN)) {
      return undefined;
    }
    if (out.length > 0) {
      return out;
    }
    return namedColors[value];
  }
});

var convertToDeg = function(num, type) {
  switch (type) {
    case 'grad':
      return num / 400 * 360;
    case 'rad':
      return num / 2 / Math.PI * 360;
    case 'turn':
      return num * 360;
    default:
      return num;
  }
};

var extractValue = function(values, pos, hasUnits) {
  var value = Number(values[pos]);
  if (!hasUnits) {
    return value;
  }
  var type = values[pos + 1];
  if (type === '') { type = 'px'; }
  var result = {};
  result[type] = value;
  return result;
};

var extractValues = function(values, numValues, hasOptionalValue,
    hasUnits) {
  var result = [];
  for (var i = 0; i < numValues; i++) {
    result.push(extractValue(values, 1 + 2 * i, hasUnits));
  }
  if (hasOptionalValue && values[1 + 2 * numValues]) {
    result.push(extractValue(values, 1 + 2 * numValues, hasUnits));
  }
  return result;
};

var SPACES = '\\s*';
var NUMBER = '[+-]?(?:\\d+|\\d*\\.\\d+)';
var RAW_OPEN_BRACKET = '\\(';
var RAW_CLOSE_BRACKET = '\\)';
var RAW_COMMA = ',';
var UNIT = '[a-zA-Z%]*';
var START = '^';

function capture(x) { return '(' + x + ')'; }
function optional(x) { return '(?:' + x + ')?'; }

var OPEN_BRACKET = [SPACES, RAW_OPEN_BRACKET, SPACES].join('');
var CLOSE_BRACKET = [SPACES, RAW_CLOSE_BRACKET, SPACES].join('');
var COMMA = [SPACES, RAW_COMMA, SPACES].join('');
var UNIT_NUMBER = [capture(NUMBER), capture(UNIT)].join('');

function transformRE(name, numParms, hasOptionalParm) {
  var tokenList = [START, SPACES, name, OPEN_BRACKET];
  for (var i = 0; i < numParms - 1; i++) {
    tokenList.push(UNIT_NUMBER);
    tokenList.push(COMMA);
  }
  tokenList.push(UNIT_NUMBER);
  if (hasOptionalParm) {
    tokenList.push(optional([COMMA, UNIT_NUMBER].join('')));
  }
  tokenList.push(CLOSE_BRACKET);
  return new RegExp(tokenList.join(''));
}

function buildMatcher(name, numValues, hasOptionalValue, hasUnits,
    baseValue) {
  var baseName = name;
  if (baseValue) {
    if (name[name.length - 1] === 'X' || name[name.length - 1] === 'Y') {
      baseName = name.substring(0, name.length - 1);
    } else if (name[name.length - 1] === 'Z') {
      baseName = name.substring(0, name.length - 1) + '3d';
    }
  }

  var f = function(x) {
    var r = extractValues(x, numValues, hasOptionalValue, hasUnits);
    if (baseValue !== undefined) {
      if (name[name.length - 1] === 'X') {
        r.push(baseValue);
      } else if (name[name.length - 1] === 'Y') {
        r = [baseValue].concat(r);
      } else if (name[name.length - 1] === 'Z') {
        r = [baseValue, baseValue].concat(r);
      } else if (hasOptionalValue) {
        while (r.length < 2) {
          if (baseValue === 'copy') {
            r.push(r[0]);
          } else {
            r.push(baseValue);
          }
        }
      }
    }
    return r;
  };
  return [transformRE(name, numValues, hasOptionalValue), f, baseName];
}

function buildRotationMatcher(name, numValues, hasOptionalValue,
    baseValue) {
  var m = buildMatcher(name, numValues, hasOptionalValue, true, baseValue);

  var f = function(x) {
    var r = m[1](x);
    return r.map(function(v) {
      var result = 0;
      for (var type in v) {
        result += convertToDeg(v[type], type);
      }
      return result;
    });
  };
  return [m[0], f, m[2]];
}

function build3DRotationMatcher() {
  var m = buildMatcher('rotate3d', 4, false, true);
  var f = function(x) {
    var r = m[1](x);
    var out = [];
    for (var i = 0; i < 3; i++) {
      out.push(r[i].px);
    }
    var angle = 0;
    for (var unit in r[3]) {
      angle += convertToDeg(r[3][unit], unit);
    }
    out.push(angle);
    return out;
  };
  return [m[0], f, m[2]];
}

var transformREs = [
  buildRotationMatcher('rotate', 1, false),
  buildRotationMatcher('rotateX', 1, false),
  buildRotationMatcher('rotateY', 1, false),
  buildRotationMatcher('rotateZ', 1, false),
  build3DRotationMatcher(),
  buildRotationMatcher('skew', 1, true, 0),
  buildRotationMatcher('skewX', 1, false),
  buildRotationMatcher('skewY', 1, false),
  buildMatcher('translateX', 1, false, true, {px: 0}),
  buildMatcher('translateY', 1, false, true, {px: 0}),
  buildMatcher('translateZ', 1, false, true, {px: 0}),
  buildMatcher('translate', 1, true, true, {px: 0}),
  buildMatcher('translate3d', 3, false, true),
  buildMatcher('scale', 1, true, false, 'copy'),
  buildMatcher('scaleX', 1, false, false, 1),
  buildMatcher('scaleY', 1, false, false, 1),
  buildMatcher('scaleZ', 1, false, false, 1),
  buildMatcher('scale3d', 3, false, false),
  buildMatcher('perspective', 1, false, true),
  buildMatcher('matrix', 6, false, false),
  buildMatcher('matrix3d', 16, false, false)
];

var decomposeMatrix = (function() {
  // this is only ever used on the perspective matrix, which has 0, 0, 0, 1 as
  // last column
  function determinant(m) {
    return m[0][0] * m[1][1] * m[2][2] +
           m[1][0] * m[2][1] * m[0][2] +
           m[2][0] * m[0][1] * m[1][2] -
           m[0][2] * m[1][1] * m[2][0] -
           m[1][2] * m[2][1] * m[0][0] -
           m[2][2] * m[0][1] * m[1][0];
  }

  // from Wikipedia:
  //
  // [A B]^-1 = [A^-1 + A^-1B(D - CA^-1B)^-1CA^-1     -A^-1B(D - CA^-1B)^-1]
  // [C D]      [-(D - CA^-1B)^-1CA^-1                (D - CA^-1B)^-1      ]
  //
  // Therefore
  //
  // [A [0]]^-1 = [A^-1       [0]]
  // [C  1 ]      [ -CA^-1     1 ]
  function inverse(m) {
    var iDet = 1 / determinant(m);
    var a = m[0][0], b = m[0][1], c = m[0][2];
    var d = m[1][0], e = m[1][1], f = m[1][2];
    var g = m[2][0], h = m[2][1], k = m[2][2];
    var Ainv = [
      [(e * k - f * h) * iDet, (c * h - b * k) * iDet,
       (b * f - c * e) * iDet, 0],
      [(f * g - d * k) * iDet, (a * k - c * g) * iDet,
       (c * d - a * f) * iDet, 0],
      [(d * h - e * g) * iDet, (g * b - a * h) * iDet,
       (a * e - b * d) * iDet, 0]
    ];
    var lastRow = [];
    for (var i = 0; i < 3; i++) {
      var val = 0;
      for (var j = 0; j < 3; j++) {
        val += m[3][j] * Ainv[j][i];
      }
      lastRow.push(val);
    }
    lastRow.push(1);
    Ainv.push(lastRow);
    return Ainv;
  }

  function transposeMatrix4(m) {
    return [[m[0][0], m[1][0], m[2][0], m[3][0]],
            [m[0][1], m[1][1], m[2][1], m[3][1]],
            [m[0][2], m[1][2], m[2][2], m[3][2]],
            [m[0][3], m[1][3], m[2][3], m[3][3]]];
  }

  function multVecMatrix(v, m) {
    var result = [];
    for (var i = 0; i < 4; i++) {
      var val = 0;
      for (var j = 0; j < 4; j++) {
        val += v[j] * m[j][i];
      }
      result.push(val);
    }
    return result;
  }

  function normalize(v) {
    var len = length(v);
    return [v[0] / len, v[1] / len, v[2] / len];
  }

  function length(v) {
    return Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
  }

  function combine(v1, v2, v1s, v2s) {
    return [v1s * v1[0] + v2s * v2[0], v1s * v1[1] + v2s * v2[1],
            v1s * v1[2] + v2s * v2[2]];
  }

  function cross(v1, v2) {
    return [v1[1] * v2[2] - v1[2] * v2[1],
            v1[2] * v2[0] - v1[0] * v2[2],
            v1[0] * v2[1] - v1[1] * v2[0]];
  }

  // TODO: Implement 2D matrix decomposition.
  // http://dev.w3.org/csswg/css-transforms/#decomposing-a-2d-matrix
  function decomposeMatrix(matrix) {
    var m3d = [
      matrix.slice(0, 4),
      matrix.slice(4, 8),
      matrix.slice(8, 12),
      matrix.slice(12, 16)
    ];

    // skip normalization step as m3d[3][3] should always be 1
    if (m3d[3][3] !== 1) {
      throw 'attempt to decompose non-normalized matrix';
    }

    var perspectiveMatrix = m3d.concat(); // copy m3d
    for (var i = 0; i < 3; i++) {
      perspectiveMatrix[i][3] = 0;
    }

    if (determinant(perspectiveMatrix) === 0) {
      return false;
    }

    var rhs = [];

    var perspective;
    if (m3d[0][3] !== 0 || m3d[1][3] !== 0 || m3d[2][3] !== 0) {
      rhs.push(m3d[0][3]);
      rhs.push(m3d[1][3]);
      rhs.push(m3d[2][3]);
      rhs.push(m3d[3][3]);

      var inversePerspectiveMatrix = inverse(perspectiveMatrix);
      var transposedInversePerspectiveMatrix =
          transposeMatrix4(inversePerspectiveMatrix);
      perspective = multVecMatrix(rhs, transposedInversePerspectiveMatrix);
    } else {
      perspective = [0, 0, 0, 1];
    }

    var translate = m3d[3].slice(0, 3);

    var row = [];
    row.push(m3d[0].slice(0, 3));
    var scale = [];
    scale.push(length(row[0]));
    row[0] = normalize(row[0]);

    var skew = [];
    row.push(m3d[1].slice(0, 3));
    skew.push(dot(row[0], row[1]));
    row[1] = combine(row[1], row[0], 1.0, -skew[0]);

    scale.push(length(row[1]));
    row[1] = normalize(row[1]);
    skew[0] /= scale[1];

    row.push(m3d[2].slice(0, 3));
    skew.push(dot(row[0], row[2]));
    row[2] = combine(row[2], row[0], 1.0, -skew[1]);
    skew.push(dot(row[1], row[2]));
    row[2] = combine(row[2], row[1], 1.0, -skew[2]);

    scale.push(length(row[2]));
    row[2] = normalize(row[2]);
    skew[1] /= scale[2];
    skew[2] /= scale[2];

    var pdum3 = cross(row[1], row[2]);
    if (dot(row[0], pdum3) < 0) {
      for (var i = 0; i < 3; i++) {
        scale[i] *= -1;
        row[i][0] *= -1;
        row[i][1] *= -1;
        row[i][2] *= -1;
      }
    }

    var t = row[0][0] + row[1][1] + row[2][2] + 1;
    var s;
    var quaternion;

    if (t > 1e-4) {
      s = 0.5 / Math.sqrt(t);
      quaternion = [
        (row[2][1] - row[1][2]) * s,
        (row[0][2] - row[2][0]) * s,
        (row[1][0] - row[0][1]) * s,
        0.25 / s
      ];
    } else if (row[0][0] > row[1][1] && row[0][0] > row[2][2]) {
      s = Math.sqrt(1 + row[0][0] - row[1][1] - row[2][2]) * 2.0;
      quaternion = [
        0.25 * s,
        (row[0][1] + row[1][0]) / s,
        (row[0][2] + row[2][0]) / s,
        (row[2][1] - row[1][2]) / s
      ];
    } else if (row[1][1] > row[2][2]) {
      s = Math.sqrt(1.0 + row[1][1] - row[0][0] - row[2][2]) * 2.0;
      quaternion = [
        (row[0][1] + row[1][0]) / s,
        0.25 * s,
        (row[1][2] + row[2][1]) / s,
        (row[0][2] - row[2][0]) / s
      ];
    } else {
      s = Math.sqrt(1.0 + row[2][2] - row[0][0] - row[1][1]) * 2.0;
      quaternion = [
        (row[0][2] + row[2][0]) / s,
        (row[1][2] + row[2][1]) / s,
        0.25 * s,
        (row[1][0] - row[0][1]) / s
      ];
    }

    return {
      translate: translate, scale: scale, skew: skew,
      quaternion: quaternion, perspective: perspective
    };
  }
  return decomposeMatrix;
})();

function dot(v1, v2) {
  var result = 0;
  for (var i = 0; i < v1.length; i++) {
    result += v1[i] * v2[i];
  }
  return result;
}

function multiplyMatrices(a, b) {
  return [
    a[0] * b[0] + a[4] * b[1] + a[8] * b[2] + a[12] * b[3],
    a[1] * b[0] + a[5] * b[1] + a[9] * b[2] + a[13] * b[3],
    a[2] * b[0] + a[6] * b[1] + a[10] * b[2] + a[14] * b[3],
    a[3] * b[0] + a[7] * b[1] + a[11] * b[2] + a[15] * b[3],

    a[0] * b[4] + a[4] * b[5] + a[8] * b[6] + a[12] * b[7],
    a[1] * b[4] + a[5] * b[5] + a[9] * b[6] + a[13] * b[7],
    a[2] * b[4] + a[6] * b[5] + a[10] * b[6] + a[14] * b[7],
    a[3] * b[4] + a[7] * b[5] + a[11] * b[6] + a[15] * b[7],

    a[0] * b[8] + a[4] * b[9] + a[8] * b[10] + a[12] * b[11],
    a[1] * b[8] + a[5] * b[9] + a[9] * b[10] + a[13] * b[11],
    a[2] * b[8] + a[6] * b[9] + a[10] * b[10] + a[14] * b[11],
    a[3] * b[8] + a[7] * b[9] + a[11] * b[10] + a[15] * b[11],

    a[0] * b[12] + a[4] * b[13] + a[8] * b[14] + a[12] * b[15],
    a[1] * b[12] + a[5] * b[13] + a[9] * b[14] + a[13] * b[15],
    a[2] * b[12] + a[6] * b[13] + a[10] * b[14] + a[14] * b[15],
    a[3] * b[12] + a[7] * b[13] + a[11] * b[14] + a[15] * b[15]
  ];
}

function convertItemToMatrix(item) {
  switch (item.t) {
    case 'rotateX':
      var angle = item.d * Math.PI / 180;
      return [1, 0, 0, 0,
              0, Math.cos(angle), Math.sin(angle), 0,
              0, -Math.sin(angle), Math.cos(angle), 0,
              0, 0, 0, 1];
    case 'rotateY':
      var angle = item.d * Math.PI / 180;
      return [Math.cos(angle), 0, -Math.sin(angle), 0,
              0, 1, 0, 0,
              Math.sin(angle), 0, Math.cos(angle), 0,
              0, 0, 0, 1];
    case 'rotate':
    case 'rotateZ':
      var angle = item.d * Math.PI / 180;
      return [Math.cos(angle), Math.sin(angle), 0, 0,
              -Math.sin(angle), Math.cos(angle), 0, 0,
              0, 0, 1, 0,
              0, 0, 0, 1];
    case 'rotate3d':
      var x = item.d[0];
      var y = item.d[1];
      var z = item.d[2];
      var sqrLength = x * x + y * y + z * z;
      if (sqrLength === 0) {
        x = 1;
        y = 0;
        z = 0;
      } else if (sqrLength !== 1) {
        var length = Math.sqrt(sqrLength);
        x /= length;
        y /= length;
        z /= length;
      }
      var s = Math.sin(item.d[3] * Math.PI / 360);
      var sc = s * Math.cos(item.d[3] * Math.PI / 360);
      var sq = s * s;
      return [
        1 - 2 * (y * y + z * z) * sq,
        2 * (x * y * sq + z * sc),
        2 * (x * z * sq - y * sc),
        0,

        2 * (x * y * sq - z * sc),
        1 - 2 * (x * x + z * z) * sq,
        2 * (y * z * sq + x * sc),
        0,

        2 * (x * z * sq + y * sc),
        2 * (y * z * sq - x * sc),
        1 - 2 * (x * x + y * y) * sq,
        0,

        0, 0, 0, 1
      ];
    case 'scale':
      return [item.d[0], 0, 0, 0,
              0, item.d[1], 0, 0,
              0, 0, 1, 0,
              0, 0, 0, 1];
    case 'scale3d':
      return [item.d[0], 0, 0, 0,
              0, item.d[1], 0, 0,
              0, 0, item.d[2], 0,
              0, 0, 0, 1];
    case 'skew':
      return [1, Math.tan(item.d[1] * Math.PI / 180), 0, 0,
              Math.tan(item.d[0] * Math.PI / 180), 1, 0, 0,
              0, 0, 1, 0,
              0, 0, 0, 1];
    case 'skewX':
      return [1, 0, 0, 0,
              Math.tan(item.d * Math.PI / 180), 1, 0, 0,
              0, 0, 1, 0,
              0, 0, 0, 1];
    case 'skewY':
      return [1, Math.tan(item.d * Math.PI / 180), 0, 0,
              0, 1, 0, 0,
              0, 0, 1, 0,
              0, 0, 0, 1];
    // TODO: Work out what to do with non-px values.
    case 'translate':
      return [1, 0, 0, 0,
              0, 1, 0, 0,
              0, 0, 1, 0,
              item.d[0].px, item.d[1].px, 0, 1];
    case 'translate3d':
      return [1, 0, 0, 0,
              0, 1, 0, 0,
              0, 0, 1, 0,
              item.d[0].px, item.d[1].px, item.d[2].px, 1];
    case 'perspective':
      return [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, -1 / item.d.px,
        0, 0, 0, 1];
    case 'matrix':
      return [item.d[0], item.d[1], 0, 0,
              item.d[2], item.d[3], 0, 0,
              0, 0, 1, 0,
              item.d[4], item.d[5], 0, 1];
    case 'matrix3d':
      return item.d;
    default:
      ASSERT_ENABLED && assert(false, 'Transform item type ' + item.t +
          ' conversion to matrix not yet implemented.');
  }
}

function convertToMatrix(transformList) {
  if (transformList.length === 0) {
    return [1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1];
  }
  return transformList.map(convertItemToMatrix).reduce(multiplyMatrices);
}

var composeMatrix = (function() {
  function multiply(a, b) {
    var result = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 4; j++) {
        for (var k = 0; k < 4; k++) {
          result[i][j] += b[i][k] * a[k][j];
        }
      }
    }
    return result;
  }

  function is2D(m) {
    return (
        m[0][2] == 0 &&
        m[0][3] == 0 &&
        m[1][2] == 0 &&
        m[1][3] == 0 &&
        m[2][0] == 0 &&
        m[2][1] == 0 &&
        m[2][2] == 1 &&
        m[2][3] == 0 &&
        m[3][2] == 0 &&
        m[3][3] == 1);
  }

  function composeMatrix(translate, scale, skew, quat, perspective) {
    var matrix = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];

    for (var i = 0; i < 4; i++) {
      matrix[i][3] = perspective[i];
    }

    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        matrix[3][i] += translate[j] * matrix[j][i];
      }
    }

    var x = quat[0], y = quat[1], z = quat[2], w = quat[3];

    var rotMatrix = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];

    rotMatrix[0][0] = 1 - 2 * (y * y + z * z);
    rotMatrix[0][1] = 2 * (x * y - z * w);
    rotMatrix[0][2] = 2 * (x * z + y * w);
    rotMatrix[1][0] = 2 * (x * y + z * w);
    rotMatrix[1][1] = 1 - 2 * (x * x + z * z);
    rotMatrix[1][2] = 2 * (y * z - x * w);
    rotMatrix[2][0] = 2 * (x * z - y * w);
    rotMatrix[2][1] = 2 * (y * z + x * w);
    rotMatrix[2][2] = 1 - 2 * (x * x + y * y);

    matrix = multiply(matrix, rotMatrix);

    var temp = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
    if (skew[2]) {
      temp[2][1] = skew[2];
      matrix = multiply(matrix, temp);
    }

    if (skew[1]) {
      temp[2][1] = 0;
      temp[2][0] = skew[0];
      matrix = multiply(matrix, temp);
    }

    if (skew[0]) {
      temp[2][0] = 0;
      temp[1][0] = skew[0];
      matrix = multiply(matrix, temp);
    }

    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        matrix[i][j] *= scale[i];
      }
    }

    if (is2D(matrix)) {
      return {
        t: 'matrix',
        d: [matrix[0][0], matrix[0][1], matrix[1][0], matrix[1][1],
            matrix[3][0], matrix[3][1]]
      };
    }
    return {
      t: 'matrix3d',
      d: matrix[0].concat(matrix[1], matrix[2], matrix[3])
    };
  }
  return composeMatrix;
})();

function interpolateDecomposedTransformsWithMatrices(fromM, toM, f) {
  var product = dot(fromM.quaternion, toM.quaternion);
  product = clamp(product, -1.0, 1.0);

  var quat = [];
  if (product === 1.0) {
    quat = fromM.quaternion;
  } else {
    var theta = Math.acos(product);
    var w = Math.sin(f * theta) * 1 / Math.sqrt(1 - product * product);

    for (var i = 0; i < 4; i++) {
      quat.push(fromM.quaternion[i] * (Math.cos(f * theta) - product * w) +
                toM.quaternion[i] * w);
    }
  }

  var translate = interp(fromM.translate, toM.translate, f);
  var scale = interp(fromM.scale, toM.scale, f);
  var skew = interp(fromM.skew, toM.skew, f);
  var perspective = interp(fromM.perspective, toM.perspective, f);

  return composeMatrix(translate, scale, skew, quat, perspective);
}

function interpTransformValue(from, to, f) {
  var type = from.t ? from.t : to.t;
  switch (type) {
    case 'matrix':
    case 'matrix3d':
      ASSERT_ENABLED && assert(false,
          'Must use matrix decomposition when interpolating raw matrices');
    // Transforms with unitless parameters.
    case 'rotate':
    case 'rotateX':
    case 'rotateY':
    case 'rotateZ':
    case 'rotate3d':
    case 'scale':
    case 'scaleX':
    case 'scaleY':
    case 'scaleZ':
    case 'scale3d':
    case 'skew':
    case 'skewX':
    case 'skewY':
      return {t: type, d: interp(from.d, to.d, f, type)};
    default:
      // Transforms with lengthType parameters.
      var result = [];
      var maxVal;
      if (from.d && to.d) {
        maxVal = Math.max(from.d.length, to.d.length);
      } else if (from.d) {
        maxVal = from.d.length;
      } else {
        maxVal = to.d.length;
      }
      for (var j = 0; j < maxVal; j++) {
        var fromVal = from.d ? from.d[j] : {};
        var toVal = to.d ? to.d[j] : {};
        result.push(lengthType.interpolate(fromVal, toVal, f));
      }
      return {t: type, d: result};
  }
}

function isMatrix(item) {
  return item.t[0] === 'm';
}

// The CSSWG decided to disallow scientific notation in CSS property strings
// (see http://lists.w3.org/Archives/Public/www-style/2010Feb/0050.html).
// We need this function to hakonitize all numbers before adding them to
// property strings.
// TODO: Apply this function to all property strings
function n(num) {
  return Number(num).toFixed(4);
}

var transformType = {
  add: function(base, delta) { return base.concat(delta); },
  interpolate: function(from, to, f) {
    var out = [];
    for (var i = 0; i < Math.min(from.length, to.length); i++) {
      if (from[i].t !== to[i].t || isMatrix(from[i])) {
        break;
      }
      out.push(interpTransformValue(from[i], to[i], f));
    }

    if (i < Math.min(from.length, to.length) ||
        from.some(isMatrix) || to.some(isMatrix)) {
      if (from.decompositionPair !== to) {
        from.decompositionPair = to;
        from.decomposition = decomposeMatrix(convertToMatrix(from.slice(i)));
      }
      if (to.decompositionPair !== from) {
        to.decompositionPair = from;
        to.decomposition = decomposeMatrix(convertToMatrix(to.slice(i)));
      }
      out.push(interpolateDecomposedTransformsWithMatrices(
          from.decomposition, to.decomposition, f));
      return out;
    }

    for (; i < from.length; i++) {
      out.push(interpTransformValue(from[i], {t: null, d: null}, f));
    }
    for (; i < to.length; i++) {
      out.push(interpTransformValue({t: null, d: null}, to[i], f));
    }
    return out;
  },
  toCssValue: function(value, svgMode) {
    // TODO: fix this :)
    var out = '';
    for (var i = 0; i < value.length; i++) {
      ASSERT_ENABLED && assert(
          value[i].t, 'transform type should be resolved by now');
      switch (value[i].t) {
        case 'rotate':
        case 'rotateX':
        case 'rotateY':
        case 'rotateZ':
        case 'skewX':
        case 'skewY':
          var unit = svgMode ? '' : 'deg';
          out += value[i].t + '(' + value[i].d + unit + ') ';
          break;
        case 'skew':
          var unit = svgMode ? '' : 'deg';
          out += value[i].t + '(' + value[i].d[0] + unit;
          if (value[i].d[1] === 0) {
            out += ') ';
          } else {
            out += ', ' + value[i].d[1] + unit + ') ';
          }
          break;
        case 'rotate3d':
          var unit = svgMode ? '' : 'deg';
          out += value[i].t + '(' + value[i].d[0] + ', ' + value[i].d[1] +
              ', ' + value[i].d[2] + ', ' + value[i].d[3] + unit + ') ';
          break;
        case 'translateX':
        case 'translateY':
        case 'translateZ':
        case 'perspective':
          out += value[i].t + '(' + lengthType.toCssValue(value[i].d[0]) +
              ') ';
          break;
        case 'translate':
          if (svgMode) {
            if (value[i].d[1] === undefined) {
              out += value[i].t + '(' + value[i].d[0].px + ') ';
            } else {
              out += (
                  value[i].t + '(' + value[i].d[0].px + ', ' +
                  value[i].d[1].px + ') ');
            }
            break;
          }
          if (value[i].d[1] === undefined) {
            out += value[i].t + '(' + lengthType.toCssValue(value[i].d[0]) +
                ') ';
          } else {
            out += value[i].t + '(' + lengthType.toCssValue(value[i].d[0]) +
                ', ' + lengthType.toCssValue(value[i].d[1]) + ') ';
          }
          break;
        case 'translate3d':
          var values = value[i].d.map(lengthType.toCssValue);
          out += value[i].t + '(' + values[0] + ', ' + values[1] +
              ', ' + values[2] + ') ';
          break;
        case 'scale':
          if (value[i].d[0] === value[i].d[1]) {
            out += value[i].t + '(' + value[i].d[0] + ') ';
          } else {
            out += value[i].t + '(' + value[i].d[0] + ', ' + value[i].d[1] +
                ') ';
          }
          break;
        case 'scaleX':
        case 'scaleY':
        case 'scaleZ':
          out += value[i].t + '(' + value[i].d[0] + ') ';
          break;
        case 'scale3d':
          out += value[i].t + '(' + value[i].d[0] + ', ' +
              value[i].d[1] + ', ' + value[i].d[2] + ') ';
          break;
        case 'matrix':
        case 'matrix3d':
          out += value[i].t + '(' + value[i].d.map(n).join(', ') + ') ';
          break;
      }
    }
    return out.substring(0, out.length - 1);
  },
  fromCssValue: function(value) {
    // TODO: fix this :)
    if (value === undefined) {
      return undefined;
    }
    var result = [];
    while (value.length > 0) {
      var r;
      for (var i = 0; i < transformREs.length; i++) {
        var reSpec = transformREs[i];
        r = reSpec[0].exec(value);
        if (r) {
          result.push({t: reSpec[2], d: reSpec[1](r)});
          value = value.substring(r[0].length);
          break;
        }
      }
      if (!isDefinedAndNotNull(r)) {
        return result;
      }
    }
    return result;
  }
};

var pathType = {
  // Properties ...
  // - path: The target path element
  // - points: The absolute points to set on the path
  // - cachedCumulativeLengths: The lengths at the end of each segment
  add: function() { throw 'Addition not supported for path attribute' },
  cumulativeLengths: function(value) {
    if (isDefinedAndNotNull(value.cachedCumulativeLengths))
      return value.cachedCumulativeLengths;
    var path = value.path.cloneNode(true);
    var cumulativeLengths = [];
    while (path.pathSegList.numberOfItems > 0) {
      // TODO: It would be good to skip moves here and when generating points.
      cumulativeLengths.unshift(path.getTotalLength());
      path.pathSegList.removeItem(path.pathSegList.numberOfItems - 1);
    }
    value.cachedCumulativeLengths = cumulativeLengths;
    return value.cachedCumulativeLengths;
  },
  appendFractions: function(fractions, cumulativeLengths) {
    ASSERT_ENABLED && assert(cumulativeLengths[0] === 0);
    var totalLength = cumulativeLengths[cumulativeLengths.length - 1];
    for (var i = 1; i < cumulativeLengths.length - 1; ++i)
      fractions.push(cumulativeLengths[i] / totalLength);
  },
  interpolate: function(from, to, f) {
    // FIXME: Handle non-linear path segments.
    // Get the fractions at which we need to sample.
    var sampleFractions = [0, 1];
    pathType.appendFractions(sampleFractions, pathType.cumulativeLengths(from));
    pathType.appendFractions(sampleFractions, pathType.cumulativeLengths(to));
    sampleFractions.sort();
    ASSERT_ENABLED && assert(sampleFractions[0] === 0);
    ASSERT_ENABLED && assert(sampleFractions[sampleFractions.length - 1] === 1);

    // FIXME: Cache the 'from' and 'to' points.
    var fromTotalLength = from.path.getTotalLength();
    var toTotalLength = to.path.getTotalLength();
    var points = [];
    for (var i = 0; i < sampleFractions.length; ++i) {
      var fromPoint = from.path.getPointAtLength(
          fromTotalLength * sampleFractions[i]);
      var toPoint = to.path.getPointAtLength(
          toTotalLength * sampleFractions[i]);
      points.push({
        x: interp(fromPoint.x, toPoint.x, f),
        y: interp(fromPoint.y, toPoint.y, f)
      });
    }
    return {points: points};
  },
  pointToString: function(point) {
    return point.x + ',' + point.y;
  },
  toCssValue: function(value, svgMode) {
    // FIXME: It would be good to use PathSegList API on the target directly,
    // rather than generating this string, but that would require a hack to
    // setValue().
    ASSERT_ENABLED && assert(svgMode,
        'Path type should only be used with SVG \'d\' attribute');
    if (value.path)
      return value.path.getAttribute('d');
    var ret = 'M' + pathType.pointToString(value.points[0]);
    for (var i = 1; i < value.points.length; ++i)
      ret += 'L' + pathType.pointToString(value.points[i]);
    return ret;
  },
  fromCssValue: function(value) {
    var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    if (value)
      path.setAttribute('d', value);
    return {path: path};
  }
};

var propertyTypes = {
  backgroundColor: colorType,
  backgroundPosition: positionListType,
  borderBottomColor: colorType,
  borderBottomLeftRadius: percentLengthType,
  borderBottomRightRadius: percentLengthType,
  borderBottomWidth: lengthType,
  borderLeftColor: colorType,
  borderLeftWidth: lengthType,
  borderRightColor: colorType,
  borderRightWidth: lengthType,
  borderSpacing: lengthType,
  borderTopColor: colorType,
  borderTopLeftRadius: percentLengthType,
  borderTopRightRadius: percentLengthType,
  borderTopWidth: lengthType,
  bottom: percentLengthAutoType,
  boxShadow: shadowType,
  clip: typeWithKeywords(['auto'], rectangleType),
  color: colorType,
  cx: lengthType,
  cy: lengthType,
  d: pathType,
  dx: lengthType,
  dy: lengthType,
  fill: colorType,
  floodColor: colorType,

  // TODO: Handle these keywords properly.
  fontSize: typeWithKeywords(['smaller', 'larger'], percentLengthType),
  fontWeight: typeWithKeywords(['lighter', 'bolder'], fontWeightType),

  height: percentLengthAutoType,
  left: percentLengthAutoType,
  letterSpacing: typeWithKeywords(['normal'], lengthType),
  lightingColor: colorType,
  lineHeight: percentLengthType, // TODO: Should support numberType as well.
  marginBottom: lengthAutoType,
  marginLeft: lengthAutoType,
  marginRight: lengthAutoType,
  marginTop: lengthAutoType,
  maxHeight: typeWithKeywords(
      ['none', 'max-content', 'min-content', 'fill-available', 'fit-content'],
      percentLengthType),
  maxWidth: typeWithKeywords(
      ['none', 'max-content', 'min-content', 'fill-available', 'fit-content'],
      percentLengthType),
  minHeight: typeWithKeywords(
      ['max-content', 'min-content', 'fill-available', 'fit-content'],
      percentLengthType),
  minWidth: typeWithKeywords(
      ['max-content', 'min-content', 'fill-available', 'fit-content'],
      percentLengthType),
  opacity: numberType,
  outlineColor: typeWithKeywords(['invert'], colorType),
  outlineOffset: lengthType,
  outlineWidth: lengthType,
  paddingBottom: lengthType,
  paddingLeft: lengthType,
  paddingRight: lengthType,
  paddingTop: lengthType,
  perspective: typeWithKeywords(['none'], lengthType),
  perspectiveOrigin: originType,
  r: lengthType,
  right: percentLengthAutoType,
  stopColor: colorType,
  stroke: colorType,
  textIndent: typeWithKeywords(['each-line', 'hanging'], percentLengthType),
  textShadow: shadowType,
  top: percentLengthAutoType,
  transform: transformType,
  transformOrigin: originType,
  verticalAlign: typeWithKeywords([
    'baseline',
    'sub',
    'super',
    'text-top',
    'text-bottom',
    'middle',
    'top',
    'bottom'
  ], percentLengthType),
  visibility: visibilityType,
  width: typeWithKeywords([
    'border-box',
    'content-box',
    'auto',
    'max-content',
    'min-content',
    'available',
    'fit-content'
  ], percentLengthType),
  wordSpacing: typeWithKeywords(['normal'], percentLengthType),
  x: lengthType,
  y: lengthType,
  zIndex: typeWithKeywords(['auto'], integerType)
};

var svgProperties = {
  'cx': 1,
  'cy': 1,
  'd': 1,
  'dx': 1,
  'dy': 1,
  'fill': 1,
  'floodColor': 1,
  'height': 1,
  'lightingColor': 1,
  'r': 1,
  'stopColor': 1,
  'stroke': 1,
  'width': 1,
  'x': 1,
  'y': 1
};

var borderWidthAliases = {
  initial: '3px',
  thin: '1px',
  medium: '3px',
  thick: '5px'
};

var propertyValueAliases = {
  backgroundColor: { initial: 'transparent' },
  backgroundPosition: { initial: '0% 0%' },
  borderBottomColor: { initial: 'currentColor' },
  borderBottomLeftRadius: { initial: '0px' },
  borderBottomRightRadius: { initial: '0px' },
  borderBottomWidth: borderWidthAliases,
  borderLeftColor: { initial: 'currentColor' },
  borderLeftWidth: borderWidthAliases,
  borderRightColor: { initial: 'currentColor' },
  borderRightWidth: borderWidthAliases,
  // Spec says this should be 0 but in practise it is 2px.
  borderSpacing: { initial: '2px' },
  borderTopColor: { initial: 'currentColor' },
  borderTopLeftRadius: { initial: '0px' },
  borderTopRightRadius: { initial: '0px' },
  borderTopWidth: borderWidthAliases,
  bottom: { initial: 'auto' },
  clip: { initial: 'rect(0px, 0px, 0px, 0px)' },
  color: { initial: 'black' }, // Depends on user agent.
  fontSize: {
    initial: '100%',
    'xx-small': '60%',
    'x-small': '75%',
    'small': '89%',
    'medium': '100%',
    'large': '120%',
    'x-large': '150%',
    'xx-large': '200%'
  },
  fontWeight: {
    initial: '400',
    normal: '400',
    bold: '700'
  },
  height: { initial: 'auto' },
  left: { initial: 'auto' },
  letterSpacing: { initial: 'normal' },
  lineHeight: {
    initial: '120%',
    normal: '120%'
  },
  marginBottom: { initial: '0px' },
  marginLeft: { initial: '0px' },
  marginRight: { initial: '0px' },
  marginTop: { initial: '0px' },
  maxHeight: { initial: 'none' },
  maxWidth: { initial: 'none' },
  minHeight: { initial: '0px' },
  minWidth: { initial: '0px' },
  opacity: { initial: '1.0' },
  outlineColor: { initial: 'invert' },
  outlineOffset: { initial: '0px' },
  outlineWidth: borderWidthAliases,
  paddingBottom: { initial: '0px' },
  paddingLeft: { initial: '0px' },
  paddingRight: { initial: '0px' },
  paddingTop: { initial: '0px' },
  right: { initial: 'auto' },
  textIndent: { initial: '0px' },
  textShadow: {
    initial: '0px 0px 0px transparent',
    none: '0px 0px 0px transparent'
  },
  top: { initial: 'auto' },
  transform: {
    initial: '',
    none: ''
  },
  verticalAlign: { initial: '0px' },
  visibility: { initial: 'visible' },
  width: { initial: 'auto' },
  wordSpacing: { initial: 'normal' },
  zIndex: { initial: 'auto' }
};

var propertyIsSVGAttrib = function(property, target) {
  return target.namespaceURI === 'http://www.w3.org/2000/svg' &&
      property in svgProperties;
};

var getType = function(property) {
  return propertyTypes[property] || nonNumericType;
};

var add = function(property, base, delta) {
  if (delta === rawNeutralValue) {
    return base;
  }
  if (base === 'inherit' || delta === 'inherit') {
    return nonNumericType.add(base, delta);
  }
  return getType(property).add(base, delta);
};


/**
 * Interpolate the given property name (f*100)% of the way from 'from' to 'to'.
 * 'from' and 'to' are both raw values already converted from CSS value
 * strings. Requires the target element to be able to determine whether the
 * given property is an SVG attribute or not, as this impacts the conversion of
 * the interpolated value back into a CSS value string for transform
 * translations.
 *
 * e.g. interpolate('transform', elem, 'rotate(40deg)', 'rotate(50deg)', 0.3);
 *   will return 'rotate(43deg)'.
 */
var interpolate = function(property, from, to, f) {
  ASSERT_ENABLED && assert(
      isDefinedAndNotNull(from) && isDefinedAndNotNull(to),
      'Both to and from values should be specified for interpolation');
  if (from === 'inherit' || to === 'inherit') {
    return nonNumericType.interpolate(from, to, f);
  }
  if (f === 0) {
    return from;
  }
  if (f === 1) {
    return to;
  }
  return getType(property).interpolate(from, to, f);
};


/**
 * Convert the provided interpolable value for the provided property to a CSS
 * value string. Note that SVG transforms do not require units for translate
 * or rotate values while CSS properties require 'px' or 'deg' units.
 */
var toCssValue = function(property, value, svgMode) {
  if (value === 'inherit') {
    return value;
  }
  return getType(property).toCssValue(value, svgMode);
};

var fromCssValue = function(property, value) {
  if (value === cssNeutralValue) {
    return rawNeutralValue;
  }
  if (value === 'inherit') {
    return value;
  }
  if (property in propertyValueAliases &&
      value in propertyValueAliases[property]) {
    value = propertyValueAliases[property][value];
  }
  var result = getType(property).fromCssValue(value);
  // Currently we'll hit this assert if input to the API is bad. To avoid this,
  // we should eliminate invalid values when normalizing the list of keyframes.
  // See the TODO in isSupportedPropertyValue().
  ASSERT_ENABLED && assert(isDefinedAndNotNull(result),
      'Invalid property value "' + value + '" for property "' + property + '"');
  return result;
};

// Sentinel values
var cssNeutralValue = {};
var rawNeutralValue = {};



/** @constructor */
var CompositableValue = function() {
};

CompositableValue.prototype = {
  compositeOnto: abstractMethod,
  // This is purely an optimization.
  dependsOnUnderlyingValue: function() {
    return true;
  }
};



/** @constructor */
var AddReplaceCompositableValue = function(value, composite) {
  this.value = value;
  this.composite = composite;
  ASSERT_ENABLED && assert(
      !(this.value === cssNeutralValue && this.composite === 'replace'),
      'Should never replace-composite the neutral value');
};

AddReplaceCompositableValue.prototype = createObject(
    CompositableValue.prototype, {
      compositeOnto: function(property, underlyingValue) {
        switch (this.composite) {
          case 'replace':
            return this.value;
          case 'add':
            return add(property, underlyingValue, this.value);
          default:
            ASSERT_ENABLED && assert(
                false, 'Invalid composite operation ' + this.composite);
        }
      },
      dependsOnUnderlyingValue: function() {
        return this.composite === 'add';
      }
    });



/** @constructor */
var BlendedCompositableValue = function(startValue, endValue, fraction) {
  this.startValue = startValue;
  this.endValue = endValue;
  this.fraction = fraction;
};

BlendedCompositableValue.prototype = createObject(
    CompositableValue.prototype, {
      compositeOnto: function(property, underlyingValue) {
        return interpolate(property,
            this.startValue.compositeOnto(property, underlyingValue),
            this.endValue.compositeOnto(property, underlyingValue),
            this.fraction);
      },
      dependsOnUnderlyingValue: function() {
        // Travis crashes here randomly in Chrome beta and unstable,
        // this try catch is to help debug the problem.
        try {
          return this.startValue.dependsOnUnderlyingValue() ||
              this.endValue.dependsOnUnderlyingValue();
        }
        catch (error) {
          throw new Error(
              error + '\n JSON.stringify(this) = ' + JSON.stringify(this));
        }
      }
    });

/** @constructor */
var CompositedPropertyMap = function(target) {
  this.properties = {};
  this.baseValues = {};
  this.target = target;
};

CompositedPropertyMap.prototype = {
  addValue: function(property, animValue) {
    if (!(property in this.properties)) {
      this.properties[property] = [];
    }
    if (!(animValue instanceof CompositableValue)) {
      throw new TypeError('expected CompositableValue');
    }
    this.properties[property].push(animValue);
  },
  stackDependsOnUnderlyingValue: function(stack) {
    for (var i = 0; i < stack.length; i++) {
      if (!stack[i].dependsOnUnderlyingValue()) {
        return false;
      }
    }
    return true;
  },
  clear: function() {
    for (var property in this.properties) {
      if (this.stackDependsOnUnderlyingValue(this.properties[property])) {
        clearValue(this.target, property);
      }
    }
  },
  captureBaseValues: function() {
    for (var property in this.properties) {
      var stack = this.properties[property];
      if (stack.length > 0 && this.stackDependsOnUnderlyingValue(stack)) {
        var baseValue = fromCssValue(property, getValue(this.target, property));
        // TODO: Decide what to do with elements not in the DOM.
        ASSERT_ENABLED && assert(
            isDefinedAndNotNull(baseValue) && baseValue !== '',
            'Base value should always be set. ' +
            'Is the target element in the DOM?');
        this.baseValues[property] = baseValue;
      } else {
        this.baseValues[property] = undefined;
      }
    }
  },
  applyAnimatedValues: function() {
    for (var property in this.properties) {
      var valuesToComposite = this.properties[property];
      if (valuesToComposite.length === 0) {
        continue;
      }
      var baseValue = this.baseValues[property];
      var i = valuesToComposite.length - 1;
      while (i > 0 && valuesToComposite[i].dependsOnUnderlyingValue()) {
        i--;
      }
      for (; i < valuesToComposite.length; i++) {
        baseValue = valuesToComposite[i].compositeOnto(property, baseValue);
      }
      ASSERT_ENABLED && assert(
          isDefinedAndNotNull(baseValue) && baseValue !== '',
          'Value should always be set after compositing');
      var isSvgMode = propertyIsSVGAttrib(property, this.target);
      setValue(this.target, property, toCssValue(property, baseValue,
          isSvgMode));
      this.properties[property] = [];
    }
  }
};


var cssStyleDeclarationAttribute = {
  cssText: true,
  length: true,
  parentRule: true,
  'var': true
};

var cssStyleDeclarationMethodModifiesStyle = {
  getPropertyValue: false,
  getPropertyCSSValue: false,
  removeProperty: true,
  getPropertyPriority: false,
  setProperty: true,
  item: false
};

var copyInlineStyle = function(sourceStyle, destinationStyle) {
  for (var i = 0; i < sourceStyle.length; i++) {
    var property = sourceStyle[i];
    destinationStyle[property] = sourceStyle[property];
  }
};

var retickThenGetComputedStyle = function() {
  repeatLastTick();
  ensureOriginalGetComputedStyle();
  return window.getComputedStyle.apply(this, arguments);
};

// This redundant flag is to support Safari which has trouble determining
// function object equality during an animation.
var isGetComputedStylePatched = false;
var originalGetComputedStyle = window.getComputedStyle;

var ensureRetickBeforeGetComputedStyle = function() {
  if (!isGetComputedStylePatched) {
    Object.defineProperty(window, 'getComputedStyle', configureDescriptor({
      value: retickThenGetComputedStyle
    }));
    isGetComputedStylePatched = true;
  }
};

var ensureOriginalGetComputedStyle = function() {
  if (isGetComputedStylePatched) {
    Object.defineProperty(window, 'getComputedStyle', configureDescriptor({
      value: originalGetComputedStyle
    }));
    isGetComputedStylePatched = false;
  }
};

// Changing the inline style of an element under animation may require the
// animation to be recomputed ontop of the new inline style if
// getComputedStyle() is called inbetween setting the style and the next
// animation frame.
// We modify getComputedStyle() to re-evaluate the animations only if it is
// called instead of re-evaluating them here potentially unnecessarily.
var animatedInlineStyleChanged = function() {
  maybeRestartAnimation();
  ensureRetickBeforeGetComputedStyle();
};



/** @constructor */
var AnimatedCSSStyleDeclaration = function(element) {
  ASSERT_ENABLED && assert(
      !(element.style instanceof AnimatedCSSStyleDeclaration),
      'Element must not already have an animated style attached.');

  // Stores the inline style of the element on its behalf while the
  // polyfill uses the element's inline style to simulate web animations.
  // This is needed to fake regular inline style CSSOM access on the element.
  this._surrogateElement = createDummyElement();
  this._style = element.style;
  this._length = 0;
  this._isAnimatedProperty = {};

  // Populate the surrogate element's inline style.
  copyInlineStyle(this._style, this._surrogateElement.style);
  this._updateIndices();
};

AnimatedCSSStyleDeclaration.prototype = {
  get cssText() {
    return this._surrogateElement.style.cssText;
  },
  set cssText(text) {
    var isAffectedProperty = {};
    for (var i = 0; i < this._surrogateElement.style.length; i++) {
      isAffectedProperty[this._surrogateElement.style[i]] = true;
    }
    this._surrogateElement.style.cssText = text;
    this._updateIndices();
    for (var i = 0; i < this._surrogateElement.style.length; i++) {
      isAffectedProperty[this._surrogateElement.style[i]] = true;
    }
    for (var property in isAffectedProperty) {
      if (!this._isAnimatedProperty[property]) {
        this._style.setProperty(property,
            this._surrogateElement.style.getPropertyValue(property));
      }
    }
    animatedInlineStyleChanged();
  },
  get length() {
    return this._surrogateElement.style.length;
  },
  get parentRule() {
    return this._style.parentRule;
  },
  get 'var'() {
    return this._style.var;
  },
  _updateIndices: function() {
    while (this._length < this._surrogateElement.style.length) {
      Object.defineProperty(this, this._length, {
        configurable: true,
        enumerable: false,
        get: (function(index) {
          return function() {
            return this._surrogateElement.style[index];
          };
        })(this._length)
      });
      this._length++;
    }
    while (this._length > this._surrogateElement.style.length) {
      this._length--;
      Object.defineProperty(this, this._length, {
        configurable: true,
        enumerable: false,
        value: undefined
      });
    }
  },
  _clearAnimatedProperty: function(property) {
    this._style[property] = this._surrogateElement.style[property];
    this._isAnimatedProperty[property] = false;
  },
  _setAnimatedProperty: function(property, value) {
    this._style[property] = value;
    this._isAnimatedProperty[property] = true;
  }
};

for (var method in cssStyleDeclarationMethodModifiesStyle) {
  AnimatedCSSStyleDeclaration.prototype[method] =
      (function(method, modifiesStyle) {
    return function() {
      var result = this._surrogateElement.style[method].apply(
          this._surrogateElement.style, arguments);
      if (modifiesStyle) {
        if (!this._isAnimatedProperty[arguments[0]]) {
          this._style[method].apply(this._style, arguments);
        }
        this._updateIndices();
        animatedInlineStyleChanged();
      }
      return result;
    }
  })(method, cssStyleDeclarationMethodModifiesStyle[method]);
}

for (var property in document.documentElement.style) {
  if (cssStyleDeclarationAttribute[property] ||
      property in cssStyleDeclarationMethodModifiesStyle) {
    continue;
  }
  (function(property) {
    Object.defineProperty(AnimatedCSSStyleDeclaration.prototype, property,
        configureDescriptor({
          get: function() {
            return this._surrogateElement.style[property];
          },
          set: function(value) {
            this._surrogateElement.style[property] = value;
            this._updateIndices();
            if (!this._isAnimatedProperty[property]) {
              this._style[property] = value;
            }
            animatedInlineStyleChanged();
          }
        }));
  })(property);
}

// This function is a fallback for when we can't replace an element's style with
// AnimatatedCSSStyleDeclaration and must patch the existing style to behave
// in a similar way.
// Only the methods listed in cssStyleDeclarationMethodModifiesStyle will
// be patched to behave in the same manner as a native implementation,
// getter properties like style.left or style[0] will be tainted by the
// polyfill's animation engine.
var patchInlineStyleForAnimation = function(style) {
  var surrogateElement = document.createElement('div');
  copyInlineStyle(style, surrogateElement.style);
  var isAnimatedProperty = {};
  for (var method in cssStyleDeclarationMethodModifiesStyle) {
    if (!(method in style)) {
      continue;
    }
    Object.defineProperty(style, method, configureDescriptor({
      value: (function(method, originalMethod, modifiesStyle) {
        return function() {
          var result = surrogateElement.style[method].apply(
              surrogateElement.style, arguments);
          if (modifiesStyle) {
            if (!isAnimatedProperty[arguments[0]]) {
              originalMethod.apply(style, arguments);
            }
            animatedInlineStyleChanged();
          }
          return result;
        }
      })(method, style[method], cssStyleDeclarationMethodModifiesStyle[method])
    }));
  }

  style._clearAnimatedProperty = function(property) {
    this[property] = surrogateElement.style[property];
    isAnimatedProperty[property] = false;
  };

  style._setAnimatedProperty = function(property, value) {
    this[property] = value;
    isAnimatedProperty[property] = true;
  };
};



/** @constructor */
var Compositor = function() {
  this.targets = [];
};

Compositor.prototype = {
  setAnimatedValue: function(target, property, animValue) {
    if (target !== null) {
      if (target._animProperties === undefined) {
        target._animProperties = new CompositedPropertyMap(target);
        this.targets.push(target);
      }
      target._animProperties.addValue(property, animValue);
    }
  },
  applyAnimatedValues: function() {
    for (var i = 0; i < this.targets.length; i++) {
      this.targets[i]._animProperties.clear();
    }
    for (var i = 0; i < this.targets.length; i++) {
      this.targets[i]._animProperties.captureBaseValues();
    }
    for (var i = 0; i < this.targets.length; i++) {
      this.targets[i]._animProperties.applyAnimatedValues();
    }
  }
};

var ensureTargetInitialised = function(property, target) {
  if (propertyIsSVGAttrib(property, target)) {
    ensureTargetSVGInitialised(property, target);
  } else {
    ensureTargetCSSInitialised(target);
  }
};

var ensureTargetSVGInitialised = function(property, target) {
  if (!isDefinedAndNotNull(target._actuals)) {
    target._actuals = {};
    target._bases = {};
    target.actuals = {};
    target._getAttribute = target.getAttribute;
    target._setAttribute = target.setAttribute;
    target.getAttribute = function(name) {
      if (isDefinedAndNotNull(target._bases[name])) {
        return target._bases[name];
      }
      return target._getAttribute(name);
    };
    target.setAttribute = function(name, value) {
      if (isDefinedAndNotNull(target._actuals[name])) {
        target._bases[name] = value;
      } else {
        target._setAttribute(name, value);
      }
    };
  }
  if (!isDefinedAndNotNull(target._actuals[property])) {
    var baseVal = target.getAttribute(property);
    target._actuals[property] = 0;
    target._bases[property] = baseVal;

    Object.defineProperty(target.actuals, property, configureDescriptor({
      set: function(value) {
        if (value === null) {
          target._actuals[property] = target._bases[property];
          target._setAttribute(property, target._bases[property]);
        } else {
          target._actuals[property] = value;
          target._setAttribute(property, value);
        }
      },
      get: function() {
        return target._actuals[property];
      }
    }));
  }
};

var ensureTargetCSSInitialised = function(target) {
  if (target.style._webAnimationsStyleInitialised) {
    return;
  }
  try {
    var animatedStyle = new AnimatedCSSStyleDeclaration(target);
    Object.defineProperty(target, 'style', configureDescriptor({
      get: function() { return animatedStyle; }
    }));
  } catch (error) {
    patchInlineStyleForAnimation(target.style);
  }
  target.style._webAnimationsStyleInitialised = true;
};

var setValue = function(target, property, value) {
  ensureTargetInitialised(property, target);
  property = prefixProperty(property);
  if (propertyIsSVGAttrib(property, target)) {
    target.actuals[property] = value;
  } else {
    target.style._setAnimatedProperty(property, value);
  }
};

var clearValue = function(target, property) {
  ensureTargetInitialised(property, target);
  property = prefixProperty(property);
  if (propertyIsSVGAttrib(property, target)) {
    target.actuals[property] = null;
  } else {
    target.style._clearAnimatedProperty(property);
  }
};

var getValue = function(target, property) {
  ensureTargetInitialised(property, target);
  property = prefixProperty(property);
  if (propertyIsSVGAttrib(property, target)) {
    return target.actuals[property];
  } else {
    return getComputedStyle(target)[property];
  }
};

var rafScheduled = false;

var compositor = new Compositor();

var usePerformanceTiming =
    typeof window.performance === 'object' &&
    typeof window.performance.timing === 'object' &&
    typeof window.performance.now === 'function';

// Don't use a local named requestAnimationFrame, to avoid potential problems
// with hoisting.
var nativeRaf = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;
var raf;
if (nativeRaf) {
  raf = function(callback) {
    nativeRaf(function() {
      callback(clockMillis());
    });
  };
} else {
  raf = function(callback) {
    setTimeout(function() {
      callback(clockMillis());
    }, 1000 / 60);
  };
}

var clockMillis = function() {
  return usePerformanceTiming ? window.performance.now() : Date.now();
};
// Set up the zero times for document time. Document time is relative to the
// document load event.
var documentTimeZeroAsRafTime;
var documentTimeZeroAsClockTime;
var load;
if (usePerformanceTiming) {
  load = function() {
    // RAF time is relative to the navigationStart event.
    documentTimeZeroAsRafTime =
        window.performance.timing.loadEventStart -
        window.performance.timing.navigationStart;
    // performance.now() uses the same origin as RAF time.
    documentTimeZeroAsClockTime = documentTimeZeroAsRafTime;
  };
} else {
  // The best approximation we have for the relevant clock and RAF times is to
  // listen to the load event.
  load = function() {
    raf(function(rafTime) {
      documentTimeZeroAsRafTime = rafTime;
    });
    documentTimeZeroAsClockTime = Date.now();
  };
}
// Start timing when load event fires or if this script is processed when
// document loading is already complete.
if (document.readyState === 'complete') {
  // When performance timing is unavailable and this script is loaded
  // dynamically, document zero time is incorrect.
  // Warn the user in this case.
  if (!usePerformanceTiming) {
    console.warn(
        'Web animations can\'t discover document zero time when ' +
        'asynchronously loaded in the absence of performance timing.');
  }
  load();
} else {
  addEventListener('load', function() {
    load();
    if (usePerformanceTiming) {
      // We use setTimeout() to clear cachedClockTimeMillis at the end of a
      // frame, but this will not run until after other load handlers. We need
      // those handlers to pick up the new value of clockMillis(), so we must
      // clear the cached value.
      cachedClockTimeMillis = undefined;
    }
  });
}

// A cached document time for use during the current callstack.
var cachedClockTimeMillis;
// Calculates one time relative to another, returning null if the zero time is
// undefined.
var relativeTime = function(time, zeroTime) {
  return isDefined(zeroTime) ? time - zeroTime : null;
};

var lastClockTimeMillis;

var cachedClockTime = function() {
  // Cache a document time for the remainder of this callstack.
  if (!isDefined(cachedClockTimeMillis)) {
    cachedClockTimeMillis = clockMillis();
    lastClockTimeMillis = cachedClockTimeMillis;
    setTimeout(function() { cachedClockTimeMillis = undefined; }, 0);
  }
  return cachedClockTimeMillis;
};


// These functions should be called in every stack that could possibly modify
// the effect results that have already been calculated for the current tick.
var modifyCurrentAnimationStateDepth = 0;
var enterModifyCurrentAnimationState = function() {
  modifyCurrentAnimationStateDepth++;
};
var exitModifyCurrentAnimationState = function(updateCallback) {
  modifyCurrentAnimationStateDepth--;
  // updateCallback is set to null when we know we can't possibly affect the
  // current state (eg. a TimedItem which is not attached to a player). We track
  // the depth of recursive calls trigger just one repeat per entry. Only the
  // updateCallback from the outermost call is considered, this allows certain
  // locatations (eg. constructors) to override nested calls that would
  // otherwise set updateCallback unconditionally.
  if (modifyCurrentAnimationStateDepth === 0 && updateCallback) {
    updateCallback();
  }
};

var repeatLastTick = function() {
  if (isDefined(lastTickTime)) {
    ticker(lastTickTime, true);
  }
};

var playerSortFunction = function(a, b) {
  var result = a.startTime - b.startTime;
  return result !== 0 ? result : a._sequenceNumber - b._sequenceNumber;
};

var lastTickTime;
var ticker = function(rafTime, isRepeat) {
  // Don't tick till the page is loaded....
  if (!isDefined(documentTimeZeroAsRafTime)) {
    raf(ticker);
    return;
  }

  if (!isRepeat) {
    if (rafTime < lastClockTimeMillis) {
      rafTime = lastClockTimeMillis;
    }
    lastTickTime = rafTime;
    cachedClockTimeMillis = rafTime;
  }

  // Clear any modifications to getComputedStyle.
  ensureOriginalGetComputedStyle();

  // Get animations for this sample. We order by AnimationPlayer then by DFS
  // order within each AnimationPlayer's tree.
  if (!playersAreSorted) {
    PLAYERS.sort(playerSortFunction);
    playersAreSorted = true;
  }
  var finished = true;
  var paused = true;
  var animations = [];
  var finishedPlayers = [];
  PLAYERS.forEach(function(player) {
    player._update();
    finished = finished && !player._hasFutureAnimation();
    if (!player._hasFutureEffect()) {
      finishedPlayers.push(player);
    }
    paused = paused && player.paused;
    player._getLeafItemsInEffect(animations);
  });

  // Apply animations in order
  for (var i = 0; i < animations.length; i++) {
    if (animations[i] instanceof Animation) {
      animations[i]._sample();
    }
  }

  // Generate events
  PLAYERS.forEach(function(player) {
    player._generateEvents();
  });

  // Remove finished players. Warning: _deregisterFromTimeline modifies
  // the PLAYER list. It should not be called from within a PLAYERS.forEach
  // loop directly.
  finishedPlayers.forEach(function(player) {
    player._deregisterFromTimeline();
    playersAreSorted = false;
  });

  // Composite animated values into element styles
  compositor.applyAnimatedValues();

  if (!isRepeat) {
    if (finished || paused) {
      rafScheduled = false;
    } else {
      raf(ticker);
    }
    cachedClockTimeMillis = undefined;
  }
};

// Multiplication where zero multiplied by any value (including infinity)
// gives zero.
var multiplyZeroGivesZero = function(a, b) {
  return (a === 0 || b === 0) ? 0 : a * b;
};

var maybeRestartAnimation = function() {
  if (rafScheduled) {
    return;
  }
  raf(ticker);
  rafScheduled = true;
};

var DOCUMENT_TIMELINE = new AnimationTimeline(constructorToken);
// attempt to override native implementation
try {
  Object.defineProperty(document, 'timeline', {
    configurable: true,
    get: function() { return DOCUMENT_TIMELINE }
  });
} catch (e) { }
// maintain support for Safari
try {
  document.timeline = DOCUMENT_TIMELINE;
} catch (e) { }

window.Element.prototype.animate = function(effect, timing) {
  var anim = new Animation(this, effect, timing);
  DOCUMENT_TIMELINE.play(anim);
  return anim.player;
};
window.Element.prototype.getCurrentPlayers = function() {
  return PLAYERS.filter((function(player) {
    return player._isCurrent() && player._isTargetingElement(this);
  }).bind(this));
};
window.Element.prototype.getCurrentAnimations = function() {
  var animations = [];
  PLAYERS.forEach((function(player) {
    if (player._isCurrent()) {
      player._getAnimationsTargetingElement(this, animations);
    }
  }).bind(this));
  return animations;
};

window.Animation = Animation;
window.AnimationEffect = AnimationEffect;
window.AnimationGroup = AnimationGroup;
window.AnimationPlayer = AnimationPlayer;
window.AnimationSequence = AnimationSequence;
window.AnimationTimeline = AnimationTimeline;
window.KeyframeEffect = KeyframeEffect;
window.MediaReference = MediaReference;
window.MotionPathEffect = MotionPathEffect;
window.PseudoElementReference = PseudoElementReference;
window.TimedItem = TimedItem;
window.TimedItemList = TimedItemList;
window.Timing = Timing;
window.TimingEvent = TimingEvent;
window.TimingGroup = TimingGroup;

window._WebAnimationsTestingUtilities = {
  _constructorToken: constructorToken,
  _deprecated: deprecated,
  _positionListType: positionListType,
  _hsl2rgb: hsl2rgb,
  _types: propertyTypes,
  _knownPlayers: PLAYERS,
  _pacedTimingFunction: PacedTimingFunction,
  _prefixProperty: prefixProperty,
  _propertyIsSVGAttrib: propertyIsSVGAttrib
};

})();
;

    Polymer('paper-menu-button-transition', {

      baseClass: 'paper-menu-button-transition',
      revealedClass: 'paper-menu-button-revealed',
      openedClass: 'paper-menu-button-opened',
      closedClass: 'paper-menu-button-closed',

      duration: 500,

      setup: function(node) {
        this.super(arguments);

        var bg = node.querySelector('.paper-menu-button-overlay-bg');
        bg.style.transformOrigin = this.transformOrigin;
        bg.style.webkitTransformOrigin = this.transformOrigin;
      },

      transitionOpened: function(node, opened) {
        this.super(arguments);

        if (opened) {
          if (this.player) {
            this.player.cancel();
          }

          var anims = [];

          var ink = node.querySelector('.paper-menu-button-overlay-ink');
          var offset = 40 / Math.max(node.cachedSize.width, node.cachedSize.height);
          anims.push(new Animation(ink, [{
            'opacity': 0.9,
            'transform': 'scale(0)',
          }, {
            'opacity': 0.9,
            'transform': 'scale(1)'
          }], {
            duration: this.duration * offset
          }));

          var bg = node.querySelector('.paper-menu-button-overlay-bg');
          anims.push(new Animation(bg, [{
            'opacity': 0.9,
            'transform': 'scale(' + 40 / node.cachedSize.width + ',' + 40 / node.cachedSize.height + ')',
          }, {
            'opacity': 1,
            'transform': 'scale(0.95, 0.5)'
          }, {
            'opacity': 1,
            'transform': 'scale(1, 1)'
          }], {
            delay: this.duration * offset,
            duration: this.duration * (1 - offset),
            fill: 'forwards'
          }));

          var nodes = window.ShadowDOMPolyfill ? Platform.queryAllShadows(node.querySelector('core-menu'), 'content').getDistributedNodes() : node.querySelector('core-menu::shadow content').getDistributedNodes().array();
          var items = nodes.filter(function(n) {
            return n.nodeType === Node.ELEMENT_NODE;
          });
          var itemDelay = offset + (1 - offset) / 2;
          var itemDuration = this.duration * (1 - itemDelay) / items.length;
          items.forEach(function(item, i) {
            anims.push(new Animation(item, [{
              'opacity': 0
            }, {
              'opacity': 1
            }], {
              delay: this.duration * itemDelay + itemDuration * i,
              duration: itemDuration,
              fill: 'both'
            }));
          }.bind(this));

          var shadow = node.querySelector('paper-shadow');
          anims.push(new Animation(shadow, function(t, target) {
            if (t > offset * 2 && shadow.z === 0) {
              shadow.z = 1
            }
          }, {
            duration: this.duration
          }));

          var group = new AnimationGroup(anims, {
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
          });
          this.player = document.timeline.play(group);
        }
      },

    });
  ;
Polymer('paper-menu-button-overlay-container');;

    Polymer('paper-menu-button', {

      publish: {

        /**
         * If true, this menu is currently visible.
         *
         * @attribute opened
         * @type boolean
         * @default false
         */
        opened: { value: false, reflect: true },

        /**
         * The horizontal alignment of the pulldown menu relative to the button.
         *
         * @attribute halign
         * @type 'left' | 'right'
         * @default 'left'
         */
        halign: { value: 'left', reflect: true },

        /**
         * The vertical alignment of the pulldown menu relative to the button.
         *
         * @attribute valign
         * @type 'bottom' | 'top'
         * @default 'top'
         */
        valign: {value: 'top', reflect: true}
      },

      /**
       * The URL of an image for the icon.  Should not use `icon` property
       * if you are using this property.
       *
       * @attribute src
       * @type string
       * @default ''
       */
      src: '',

      /**
       * Specifies the icon name or index in the set of icons available in
       * the icon set.  Should not use `src` property if you are using this
       * property.
       *
       * @attribute icon
       * @type string
       * @default ''
       */
      icon: '',

      slow: false,

      tapAction: function() {
        if (this.disabled) {
          return;
        }

        this.super();
        this.toggle();
      },

      /**
       * Toggle the opened state of the menu.
       *
       * @method toggle
       */
      toggle: function() {
        this.opened = !this.opened;
      }

    });
  ;

  
    Polymer('paper-progress', {
      
      /**
       * The number that represents the current secondary progress.
       *
       * @attribute secondaryProgress
       * @type number
       * @default 0
       */
      secondaryProgress: 0,
      
      step: 0,
      
      observe: {
        'value secondaryProgress min max': 'update'
      },
      
      update: function() {
        this.super();
        this.secondaryProgress = this.clampValue(this.secondaryProgress);
        this.secondaryRatio = this.calcRatio(this.secondaryProgress) * 100;
      }
      
    });
    
  ;

  
    Polymer('paper-radio-group', {
      
      selectedAttribute: 'checked',
      activateEvent: 'paper-radio-button-activate'
      
    });
  
  ;


  Polymer('paper-slider', {
    
    /**
     * Fired when the slider's value changes.
     *
     * @event change
     */

    /**
     * Fired when the slider's value changes due to manual interaction.
     *
     * Changes to the slider's value due to changes in an underlying
     * bound variable will not trigger this event.
     *
     * @event manual-change
     */
     
    /**
     * If true, the slider thumb snaps to tick marks evenly spaced based
     * on the `step` property value.
     *
     * @attribute snaps
     * @type boolean
     * @default false
     */
    snaps: false,
    
    /**
     * If true, a pin with numeric value label is shown when the slider thumb 
     * is pressed.  Use for settings for which users need to know the exact 
     * value of the setting.
     *
     * @attribute pin
     * @type boolean
     * @default false
     */
    pin: false,
    
    /**
     * If true, this slider is disabled.  A disabled slider cannot be tapped
     * or dragged to change the slider value.
     *
     * @attribute disabled
     * @type boolean
     * @default false
     */
    disabled: false,
    
    /**
     * The number that represents the current secondary progress.
     *
     * @attribute secondaryProgress
     * @type number
     * @default 0
     */
    secondaryProgress: 0,
    
    /**
     * If true, an input is shown and user can use it to set the slider value.
     *
     * @attribute editable
     * @type boolean
     * @default false
     */
    editable: false,
    
    /**
     * The immediate value of the slider.  This value is updated while the user
     * is dragging the slider.
     *
     * @attribute immediateValue
     * @type number
     * @default 0
     */
    
    observe: {
      'min max step snaps': 'update'
    },
    
    ready: function() {
      this.update();
    },
    
    update: function() {
      this.positionKnob(this.calcRatio(this.value));
      this.updateMarkers();
    },
    
    valueChanged: function() {
      this.update();
      this.fire('change');
    },
    
    expandKnob: function() {
      this.$.sliderKnob.classList.add('expand');
    },
    
    resetKnob: function() {
      this.expandJob && this.expandJob.stop();
      this.$.sliderKnob.classList.remove('expand');
    },
    
    positionKnob: function(ratio) {
      this._ratio = ratio;
      this.immediateValue = this.calcStep(this.calcKnobPosition()) || 0;
      if (this.snaps) {
        this._ratio = this.calcRatio(this.immediateValue);
      }
      this.$.sliderKnob.style.left = this._ratio * 100 + '%';
    },
    
    immediateValueChanged: function() {
      this.$.sliderKnob.classList.toggle('ring', this.immediateValue <= this.min);
    },
    
    inputChange: function() {
      this.value = this.$.input.value;
      this.fire('manual-change');
    },
    
    calcKnobPosition: function() {
      return (this.max - this.min) * this._ratio + this.min;
    },
    
    measureWidth: function() {
      this._w = this.$.sliderBar.offsetWidth;
    },
    
    trackStart: function(e) {
      this.measureWidth();
      this._x = this._ratio * this._w;
      this._startx = this._x || 0;
      this._minx = - this._startx;
      this._maxx = this._w - this._startx;
      this.$.sliderKnob.classList.add('dragging');
      e.preventTap();
    },

    trackx: function(e) {
      var x = Math.min(this._maxx, Math.max(this._minx, e.dx));
      this._x = this._startx + x;
      this._ratio = this._x / this._w;
      this.immediateValue = this.calcStep(this.calcKnobPosition()) || 0;
      var s =  this.$.sliderKnob.style;
      s.transform = s.webkitTransform = 'translate3d(' + (this.snaps ? 
          (this.calcRatio(this.immediateValue) * this._w) - this._startx : x) + 'px, 0, 0)';
    },
    
    trackEnd: function() {
      var s =  this.$.sliderKnob.style;
      s.transform = s.webkitTransform = '';
      this.$.sliderKnob.classList.remove('dragging');
      this.resetKnob();
      this.value = this.immediateValue;
      this.fire('manual-change');
    },
    
    bardown: function(e) {
      this.measureWidth();
      this.$.sliderKnob.classList.add('transiting');
      var rect = this.$.sliderBar.getBoundingClientRect();
      this.positionKnob((e.x - rect.left) / this._w);
      this.value = this.calcStep(this.calcKnobPosition());
      this.expandJob = this.job(this.expandJob, this.expandKnob, 60);
      this.fire('manual-change');
    },
    
    knobTransitionEnd: function() {
      this.$.sliderKnob.classList.remove('transiting');
    },
    
    updateMarkers: function() {
      this.markers = [], l = (this.max - this.min) / this.step;
      for (var i = 0; i < l; i++) {
        this.markers.push('');
      }
    },
    
    increment: function() {
      this.value = this.clampValue(this.value + this.step);
    },
    
    decrement: function() {
      this.value = this.clampValue(this.value - this.step);
    },
    
    keydown: function(e) {
      if (this.disabled) {
        return;
      }
      var c = e.keyCode;
      if (c === 37) {
        this.decrement();
        this.fire('manual-change');
      } else if (c === 39) {
        this.increment();
        this.fire('manual-change');
      }
    }

  });

;


  Polymer('paper-tab', {
    
    /**
     * If true, ink ripple effect is disabled.
     *
     * @attribute noink
     * @type boolean
     * @default false
     */
    noink: false
    
  });
  
;


  Polymer('paper-tabs', {
    
    /**
     * If true, ink effect is disabled.
     *
     * @attribute noink
     * @type boolean
     * @default false
     */
    noink: false,
    
    /**
     * If true, the bottom bar to indicate the selected tab will not be shown.
     *
     * @attribute nobar
     * @type boolean
     * @default false
     */
    nobar: false,
    
    activateEvent: 'down',
    
    nostretch: false,
    
    selectedIndexChanged: function(old) {
      var s = this.$.selectionBar.style;
      
      if (!this.selectedItem) {
        s.width = 0;
        s.left = 0;
        return;
      } 
      
      var w = 100 / this.items.length;
      
      if (this.nostretch || old === null || old === -1) {
        s.width = w + '%';
        s.left = this.selectedIndex * w + '%';
        return;
      }
      
      var m = 5;
      this.$.selectionBar.classList.add('expand');
      if (old < this.selectedIndex) {
        s.width = w + w * (this.selectedIndex - old) - m + '%';
      } else {
        s.width = w + w * (old - this.selectedIndex) - m + '%';
        s.left = this.selectedIndex * w + m + '%';
      }
    },
    
    barTransitionEnd: function() {
      var cl = this.$.selectionBar.classList;
      if (cl.contains('expand')) {
        cl.remove('expand');
        cl.add('contract');
        var s = this.$.selectionBar.style;
        var w = 100 / this.items.length;
        s.width = w + '%';
        s.left = this.selectedIndex * w + '%';
      } else if (cl.contains('contract')) {
        cl.remove('contract');
      }
    }
    
  });
  
;


  (function() {
  
    var currentToast;
  
    Polymer('paper-toast', {
  
      /**
       * The text shows in a toast.
       *
       * @attribute text
       * @type string
       * @default ''
       */
      text: '',
      
      /**
       * The duration in milliseconds to show the toast.
       *
       * @attribute duration
       * @type number
       * @default 3000
       */
      duration: 3000,
      
      /**
       * Set opened to true to show the toast and to false to hide it.
       *
       * @attribute opened
       * @type boolean
       * @default false
       */
      opened: false,
      
      /**
       * Min-width when the toast changes to narrow layout.  In narrow layout,
       * the toast fits at the bottom of the screen when opened.
       *
       * @attribute responsiveWidth
       * @type string
       * @default '480px'
       */
      responsiveWidth: '480px',
      
      /**
       * If true, the toast can't be swiped.
       *
       * @attribute swipeDisabled
       * @type boolean
       * @default false
       */
      swipeDisabled: false,
      
      eventDelegates: {
        trackstart: 'trackStart',
        track: 'track',
        trackend: 'trackEnd',
        transitionend: 'transitionEnd'
      },
      
      narrowModeChanged: function() {
        this.classList.toggle('fit-bottom', this.narrowMode);
      },
      
      openedChanged: function() {
        if (this.opened) {
          this.dismissJob = this.job(this.dismissJob, this.dismiss, this.duration);
        } else {
          this.dismissJob && this.dismissJob.stop();
          this.dismiss();
        }
      },
      
      /** 
       * Toggle the opened state of the toast.
       * @method toggle
       */
      toggle: function() {
        this.opened = !this.opened;
      },
      
      /** 
       * Show the toast for the specified duration
       * @method show
       */
      show: function() {
        if (currentToast) {
          currentToast.dismiss();
        }
        currentToast = this;
        this.opened = true;
      },
      
      /** 
       * Dismiss the toast and hide it.
       * @method dismiss
       */
      dismiss: function() {
        if (this.dragging) {
          this.shouldDismiss = true;
        } else {
          this.opened = false;
          if (currentToast === this) {
            currentToast = null;
          }
        }
      },
      
      trackStart: function(e) {
        if (!this.swipeDisabled) {
          e.preventTap();
          this.vertical = e.yDirection;
          this.w = this.offsetWidth;
          this.h = this.offsetHeight;
          this.dragging = true;
          this.classList.add('dragging');
        }
      },
      
      track: function(e) {
        if (this.dragging) {
          var s = this.style;
          if (this.vertical) {
            var y = e.dy;
            s.opacity = (this.h - Math.abs(y)) / this.h;
            s.webkitTransform = s.transform =  'translate3d(0, ' + y + 'px, 0)';
          } else {
            var x = e.dx;
            s.opacity = (this.w - Math.abs(x)) / this.w;
            s.webkitTransform = s.transform = 'translate3d(' + x + 'px, 0, 0)';
          }
        }
      },
      
      trackEnd: function(e) {
        if (this.dragging) {
          this.classList.remove('dragging');
          this.style.opacity = null;
          this.style.webkitTransform = this.style.transform = null;
          var cl = this.classList;
          if (this.vertical) {
            cl.toggle('fade-out-down', e.yDirection === 1 && e.dy > 0);
            cl.toggle('fade-out-up', e.yDirection === -1 && e.dy < 0);
          } else {
            cl.toggle('fade-out-right', e.xDirection === 1 && e.dx > 0);
            cl.toggle('fade-out-left', e.xDirection === -1 && e.dx < 0);
          }
          this.dragging = false;
        }
      },
      
      transitionEnd: function() {
        var cl = this.classList;
        if (cl.contains('fade-out-right') || cl.contains('fade-out-left') || 
            cl.contains('fade-out-down') || cl.contains('fade-out-up')) {
          this.dismiss();
          cl.remove('fade-out-right', 'fade-out-left', 
              'fade-out-down', 'fade-out-up');
        } else if (this.shouldDismiss) {
          this.dismiss();
        }
        this.shouldDismiss = false;
      }
  
    });
    
  })();

;


  Polymer('paper-toggle-button', {
    
    /**
     * Fired when the checked state changes.
     *
     * @event change
     */

    /**
     * Gets or sets the state, `true` is checked and `false` is unchecked.
     *
     * @attribute checked
     * @type boolean
     * @default false
     */
    checked: false,

    trackStart: function(e) {
      this._w = this.$.toggleBar.offsetLeft + this.$.toggleBar.offsetWidth;
      e.preventTap();
    },

    trackx: function(e) {
      this._x = Math.min(this._w, 
          Math.max(0, this.checked ? this._w + e.dx : e.dx));
      this.$.toggleRadio.classList.add('dragging');
      var s =  this.$.toggleRadio.style;
      s.webkitTransform = s.transform = 'translate3d(' + this._x + 'px,0,0)';
    },

    trackEnd: function() {
      var s =  this.$.toggleRadio.style;
      s.webkitTransform = s.transform = null;
      this.$.toggleRadio.classList.remove('dragging');
      this.checked = Math.abs(this._x) > this._w / 2;
    },

    checkedChanged: function() {
      this.setAttribute('aria-pressed', Boolean(this.checked));
      this.fire('change');
    }

  });

