// --- file[famous-global.min.js] ---

/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2015
 */
!function(t){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var i;"undefined"!=typeof window?i=window:"undefined"!=typeof global?i=global:"undefined"!=typeof self&&(i=self),i.famous=t()}}(function(){return function t(i,e,n){function o(r,a){if(!e[r]){if(!i[r]){var h="function"==typeof require&&require;if(!a&&h)return h(r,!0);if(s)return s(r,!0);var c=new Error("Cannot find module '"+r+"'");throw c.code="MODULE_NOT_FOUND",c}var p=e[r]={exports:{}};i[r][0].call(p.exports,function(t){var e=i[r][1][t];return o(e?e:t)},p,p.exports,t,i,e,n)}return e[r].exports}for(var s="function"==typeof require&&require,r=0;r<n.length;r++)o(n[r]);return o}({1:[function(t,i){function e(){var t=this.container;return[t.clientWidth,t.clientHeight]}function n(t){this.container=t,this._allocator=new r(t),this._node=new o,this._eventOutput=new s,this._size=e.call(this),this._perspectiveState=new h(0),this._perspective=void 0,this._nodeContext={allocator:this._allocator,transform:a.identity,opacity:1,origin:c,align:c,size:this._size},this._eventOutput.on("resize",function(){this.setSize(e.call(this))}.bind(this))}var o=t("./RenderNode"),s=t("./EventHandler"),r=t("./ElementAllocator"),a=t("./Transform"),h=t("../transitions/Transitionable"),c=[0,0],p=!("perspective"in document.documentElement.style),u=p?function(t,i){t.style.webkitPerspective=i?i.toFixed()+"px":""}:function(t,i){t.style.perspective=i?i.toFixed()+"px":""};n.prototype.getAllocator=function(){return this._allocator},n.prototype.add=function(t){return this._node.add(t)},n.prototype.migrate=function(t){t!==this.container&&(this.container=t,this._allocator.migrate(t))},n.prototype.getSize=function(){return this._size},n.prototype.setSize=function(t){t||(t=e.call(this)),this._size[0]=t[0],this._size[1]=t[1]},n.prototype.update=function(t){t&&(t.transform&&(this._nodeContext.transform=t.transform),t.opacity&&(this._nodeContext.opacity=t.opacity),t.origin&&(this._nodeContext.origin=t.origin),t.align&&(this._nodeContext.align=t.align),t.size&&(this._nodeContext.size=t.size));var i=this._perspectiveState.get();i!==this._perspective&&(u(this.container,i),this._perspective=i),this._node.commit(this._nodeContext)},n.prototype.getPerspective=function(){return this._perspectiveState.get()},n.prototype.setPerspective=function(t,i,e){return this._perspectiveState.set(t,i,e)},n.prototype.emit=function(t,i){return this._eventOutput.emit(t,i)},n.prototype.on=function(t,i){return this._eventOutput.on(t,i)},n.prototype.removeListener=function(t,i){return this._eventOutput.removeListener(t,i)},n.prototype.pipe=function(t){return this._eventOutput.pipe(t)},n.prototype.unpipe=function(t){return this._eventOutput.unpipe(t)},i.exports=n},{"../transitions/Transitionable":88,"./ElementAllocator":2,"./EventHandler":7,"./RenderNode":11,"./Transform":15}],2:[function(t,i){function e(t){t||(t=document.createDocumentFragment()),this.container=t,this.detachedNodes={},this.nodeCount=0}e.prototype.migrate=function(t){var i=this.container;if(t!==i){if(i instanceof DocumentFragment)t.appendChild(i);else for(;i.hasChildNodes();)t.appendChild(i.firstChild);this.container=t}},e.prototype.allocate=function(t){t=t.toLowerCase(),t in this.detachedNodes||(this.detachedNodes[t]=[]);var i,e=this.detachedNodes[t];return e.length>0?i=e.pop():(i=document.createElement(t),this.container.appendChild(i)),this.nodeCount++,i},e.prototype.deallocate=function(t){var i=t.nodeName.toLowerCase(),e=this.detachedNodes[i];e.push(t),this.nodeCount--},e.prototype.getNodeCount=function(){return this.nodeCount},i.exports=e},{}],3:[function(t,i){function e(t){this._matrix=null,this._opacity=1,this._origin=null,this._size=null,this._eventOutput=new c,this._eventOutput.bindThis(this),this.eventForwarder=function(t){this._eventOutput.emit(t.type,t)}.bind(this),this.id=h.register(this),this._element=null,this._sizeDirty=!1,this._originDirty=!1,this._transformDirty=!1,this._invisible=!1,t&&this.attach(t)}function n(t){for(var i in this._eventOutput.listeners)t.addEventListener(i,this.eventForwarder)}function o(t){for(var i in this._eventOutput.listeners)t.removeEventListener(i,this.eventForwarder)}function s(t){t[12]=Math.round(t[12]*l)/l,t[13]=Math.round(t[13]*l)/l;for(var i="matrix3d(",e=0;15>e;e++)i+=t[e]<1e-6&&t[e]>-1e-6?"0,":t[e]+",";return i+=t[15]+")"}function r(t){return 100*t[0]+"% "+100*t[1]+"%"}function a(t,i){return t&&i?t[0]!==i[0]||t[1]!==i[1]:t!==i}var h=t("./Entity"),c=t("./EventHandler"),p=t("./Transform"),u=!("transform"in document.documentElement.style),l=window.devicePixelRatio||1;e.prototype.on=function(t,i){this._element&&this._element.addEventListener(t,this.eventForwarder),this._eventOutput.on(t,i)},e.prototype.removeListener=function(t,i){this._eventOutput.removeListener(t,i)},e.prototype.emit=function(t,i){i&&!i.origin&&(i.origin=this);var e=this._eventOutput.emit(t,i);return e&&i&&i.stopPropagation&&i.stopPropagation(),e},e.prototype.pipe=function(t){return this._eventOutput.pipe(t)},e.prototype.unpipe=function(t){return this._eventOutput.unpipe(t)},e.prototype.render=function(){return this.id};var f;f=u?function(t,i){t.style.webkitTransform=s(i)}:function(t,i){t.style.transform=s(i)};var d=u?function(t,i){t.style.webkitTransformOrigin=r(i)}:function(t,i){t.style.transformOrigin=r(i)},_=u?function(t){t.style.webkitTransform="scale3d(0.0001,0.0001,0.0001)",t.style.opacity=0}:function(t){t.style.transform="scale3d(0.0001,0.0001,0.0001)",t.style.opacity=0};e.prototype.commit=function(t){var i=this._element;if(i){var e=t.transform,n=t.opacity,o=t.origin;if(t.size,!e&&this._matrix)return this._matrix=null,this._opacity=0,_(i),void 0;if(a(this._origin,o)&&(this._originDirty=!0),p.notEquals(this._matrix,e)&&(this._transformDirty=!0),this._invisible&&(this._invisible=!1,this._element.style.display=""),this._opacity!==n&&(this._opacity=n,i.style.opacity=n>=1?"0.999999":n),this._transformDirty||this._originDirty||this._sizeDirty){this._sizeDirty&&(this._sizeDirty=!1),this._originDirty&&(o?(this._origin||(this._origin=[0,0]),this._origin[0]=o[0],this._origin[1]=o[1]):this._origin=null,d(i,this._origin),this._originDirty=!1),e||(e=p.identity),this._matrix=e;var s=this._size?p.thenMove(e,[-this._size[0]*o[0],-this._size[1]*o[1],0]):e;f(i,s),this._transformDirty=!1}}},e.prototype.cleanup=function(){this._element&&(this._invisible=!0,this._element.style.display="none")},e.prototype.attach=function(t){this._element=t,n.call(this,t)},e.prototype.detach=function(){var t=this._element;return t&&(o.call(this,t),this._invisible&&(this._invisible=!1,this._element.style.display="")),this._element=null,t},i.exports=e},{"./Entity":5,"./EventHandler":7,"./Transform":15}],4:[function(t,i){function e(){w.runLoop?(f.step(),window.requestAnimationFrame(e)):O=!1}function n(){for(var t=0;t<d.length;t++)d[t].emit("resize");T.emit("resize")}function o(){window.addEventListener("touchmove",function(t){t.preventDefault()},!0),s()}function s(){return document.body?(document.body.classList.add("famous-root"),document.documentElement.classList.add("famous-root"),void 0):(f.nextTick(s),void 0)}function r(t,i){return document.body?(document.body.addEventListener(t,i),void 0):(f.nextTick(addEventListener.bind(this,t,i)),void 0)}function a(t,i){return document.body?(document.body.appendChild(i),t.emit("resize"),void 0):(f.nextTick(a.bind(this,t,i)),void 0)}var h,c,p=t("./Context"),u=t("./EventHandler"),l=t("./OptionsManager"),f={},d=[],_=[],g=0,y=0,v=[],m=Date.now(),O=!0,S={},T=new u,w={containerType:"div",containerClass:"famous-container",fpsCap:void 0,runLoop:!0,appMode:!0},b=new l(w),E=10;f.step=function(){g++,y=g;var t=Date.now();if(!(c&&c>t-m)){var i=0;h=t-m,m=t,T.emit("prerender");for(var e=_.length;e--;)_.shift()(g);for(;v.length&&Date.now()-t<E;)v.shift().call(this);for(i=0;i<d.length;i++)d[i].update();T.emit("postrender")}},window.requestAnimationFrame(e),window.addEventListener("resize",n,!1),n();var z=!1;f.pipe=function(t){return t.subscribe instanceof Function?t.subscribe(f):T.pipe(t)},f.unpipe=function(t){return t.unsubscribe instanceof Function?t.unsubscribe(f):T.unpipe(t)},f.on=function(t,i){return t in S||(S[t]=T.emit.bind(T,t),r(t,S[t])),T.on(t,i)},f.emit=function(t,i){return T.emit(t,i)},f.removeListener=function(t,i){return T.removeListener(t,i)},f.getFPS=function(){return 1e3/h},f.setFPSCap=function(t){c=Math.floor(1e3/t)},f.getOptions=function(t){return b.getOptions(t)},f.setOptions=function(){return b.setOptions.apply(b,arguments)},f.createContext=function(t){!z&&w.appMode&&f.nextTick(o);var i=!1;t||(t=document.createElement(w.containerType),t.classList.add(w.containerClass),i=!0);var e=new p(t);return f.registerContext(e),i&&a(e,t),e},f.registerContext=function(t){return d.push(t),t},f.getContexts=function(){return d},f.deregisterContext=function(t){var i=d.indexOf(t);i>=0&&d.splice(i,1)},f.nextTick=function(t){_.push(t)},f.defer=function(t){v.push(t)},b.on("change",function(t){"fpsCap"===t.id?f.setFPSCap(t.value):"runLoop"===t.id&&!O&&t.value&&(O=!0,window.requestAnimationFrame(e))}),i.exports=f},{"./Context":1,"./EventHandler":7,"./OptionsManager":10}],5:[function(t,i){function e(t){return r[t]}function n(t,i){r[t]=i}function o(t){var i=r.length;return n(i,t),i}function s(t){n(t,null)}var r=[];i.exports={register:o,unregister:s,get:e,set:n}},{}],6:[function(t,i){function e(){this.listeners={},this._owner=this}e.prototype.emit=function(t,i){var e=this.listeners[t];if(e)for(var n=0;n<e.length;n++)e[n].call(this._owner,i);return this},e.prototype.on=function(t,i){t in this.listeners||(this.listeners[t]=[]);var e=this.listeners[t].indexOf(i);return 0>e&&this.listeners[t].push(i),this},e.prototype.addListener=e.prototype.on,e.prototype.removeListener=function(t,i){var e=this.listeners[t];if(void 0!==e){var n=e.indexOf(i);n>=0&&e.splice(n,1)}return this},e.prototype.bindThis=function(t){this._owner=t},i.exports=e},{}],7:[function(t,i){function e(){n.apply(this,arguments),this.downstream=[],this.downstreamFn=[],this.upstream=[],this.upstreamListeners={}}var n=t("./EventEmitter");e.prototype=Object.create(n.prototype),e.prototype.constructor=e,e.setInputHandler=function(t,i){t.trigger=i.trigger.bind(i),i.subscribe&&i.unsubscribe&&(t.subscribe=i.subscribe.bind(i),t.unsubscribe=i.unsubscribe.bind(i))},e.setOutputHandler=function(t,i){i instanceof e&&i.bindThis(t),t.pipe=i.pipe.bind(i),t.unpipe=i.unpipe.bind(i),t.on=i.on.bind(i),t.addListener=t.on,t.removeListener=i.removeListener.bind(i)},e.prototype.emit=function(t,i){n.prototype.emit.apply(this,arguments);var e=0;for(e=0;e<this.downstream.length;e++)this.downstream[e].trigger&&this.downstream[e].trigger(t,i);for(e=0;e<this.downstreamFn.length;e++)this.downstreamFn[e](t,i);return this},e.prototype.trigger=e.prototype.emit,e.prototype.pipe=function(t){if(t.subscribe instanceof Function)return t.subscribe(this);var i=t instanceof Function?this.downstreamFn:this.downstream,e=i.indexOf(t);return 0>e&&i.push(t),t instanceof Function?t("pipe",null):t.trigger&&t.trigger("pipe",null),t},e.prototype.unpipe=function(t){if(t.unsubscribe instanceof Function)return t.unsubscribe(this);var i=t instanceof Function?this.downstreamFn:this.downstream,e=i.indexOf(t);return e>=0?(i.splice(e,1),t instanceof Function?t("unpipe",null):t.trigger&&t.trigger("unpipe",null),t):!1},e.prototype.on=function(t){if(n.prototype.on.apply(this,arguments),!(t in this.upstreamListeners)){var i=this.trigger.bind(this,t);this.upstreamListeners[t]=i;for(var e=0;e<this.upstream.length;e++)this.upstream[e].on(t,i)}return this},e.prototype.addListener=e.prototype.on,e.prototype.subscribe=function(t){var i=this.upstream.indexOf(t);if(0>i){this.upstream.push(t);for(var e in this.upstreamListeners)t.on(e,this.upstreamListeners[e])}return this},e.prototype.unsubscribe=function(t){var i=this.upstream.indexOf(t);if(i>=0){this.upstream.splice(i,1);for(var e in this.upstreamListeners)t.removeListener(e,this.upstreamListeners[e])}return this},i.exports=e},{"./EventEmitter":6}],8:[function(t,i){function e(t){s.call(this,t),this._shouldRecalculateSize=!1,this._container=document.createDocumentFragment(),this.context=new n(this._container),this.setContent(this._container),this._groupSize=[void 0,void 0]}var n=t("./Context"),o=t("./Transform"),s=t("./Surface");e.SIZE_ZERO=[0,0],e.prototype=Object.create(s.prototype),e.prototype.elementType="div",e.prototype.elementClass="famous-group",e.prototype.add=function(){return this.context.add.apply(this.context,arguments)},e.prototype.render=function(){return s.prototype.render.call(this)},e.prototype.deploy=function(t){this.context.migrate(t)},e.prototype.recall=function(){this._container=document.createDocumentFragment(),this.context.migrate(this._container)},e.prototype.commit=function(t){var i=t.transform,n=t.origin,r=t.opacity,a=t.size,h=s.prototype.commit.call(this,{allocator:t.allocator,transform:o.thenMove(i,[-n[0]*a[0],-n[1]*a[1],0]),opacity:r,origin:n,size:e.SIZE_ZERO});return(a[0]!==this._groupSize[0]||a[1]!==this._groupSize[1])&&(this._groupSize[0]=a[0],this._groupSize[1]=a[1],this.context.setSize(a)),this.context.update({transform:o.translate(-n[0]*a[0],-n[1]*a[1],0),origin:n,size:a}),h},i.exports=e},{"./Context":1,"./Surface":14,"./Transform":15}],9:[function(t,i){function e(t){this._transformGetter=null,this._opacityGetter=null,this._originGetter=null,this._alignGetter=null,this._sizeGetter=null,this._proportionGetter=null,this._legacyStates={},this._output={transform:o.identity,opacity:1,origin:null,align:null,size:null,proportions:null,target:null},t&&(t.transform&&this.transformFrom(t.transform),void 0!==t.opacity&&this.opacityFrom(t.opacity),t.origin&&this.originFrom(t.origin),t.align&&this.alignFrom(t.align),t.size&&this.sizeFrom(t.size),t.proportions&&this.proportionsFrom(t.proportions))}function n(){this._transformGetter&&(this._output.transform=this._transformGetter()),this._opacityGetter&&(this._output.opacity=this._opacityGetter()),this._originGetter&&(this._output.origin=this._originGetter()),this._alignGetter&&(this._output.align=this._alignGetter()),this._sizeGetter&&(this._output.size=this._sizeGetter()),this._proportionGetter&&(this._output.proportions=this._proportionGetter())}var o=t("./Transform"),s=t("../transitions/Transitionable"),r=t("../transitions/TransitionableTransform");e.prototype.transformFrom=function(t){return t instanceof Function?this._transformGetter=t:t instanceof Object&&t.get?this._transformGetter=t.get.bind(t):(this._transformGetter=null,this._output.transform=t),this},e.prototype.opacityFrom=function(t){return t instanceof Function?this._opacityGetter=t:t instanceof Object&&t.get?this._opacityGetter=t.get.bind(t):(this._opacityGetter=null,this._output.opacity=t),this},e.prototype.originFrom=function(t){return t instanceof Function?this._originGetter=t:t instanceof Object&&t.get?this._originGetter=t.get.bind(t):(this._originGetter=null,this._output.origin=t),this},e.prototype.alignFrom=function(t){return t instanceof Function?this._alignGetter=t:t instanceof Object&&t.get?this._alignGetter=t.get.bind(t):(this._alignGetter=null,this._output.align=t),this},e.prototype.sizeFrom=function(t){return t instanceof Function?this._sizeGetter=t:t instanceof Object&&t.get?this._sizeGetter=t.get.bind(t):(this._sizeGetter=null,this._output.size=t),this},e.prototype.proportionsFrom=function(t){return t instanceof Function?this._proportionGetter=t:t instanceof Object&&t.get?this._proportionGetter=t.get.bind(t):(this._proportionGetter=null,this._output.proportions=t),this},e.prototype.setTransform=function(t,i,e){return i||this._legacyStates.transform?(this._legacyStates.transform||(this._legacyStates.transform=new r(this._output.transform)),this._transformGetter||this.transformFrom(this._legacyStates.transform),this._legacyStates.transform.set(t,i,e),this):this.transformFrom(t)},e.prototype.setOpacity=function(t,i,e){return i||this._legacyStates.opacity?(this._legacyStates.opacity||(this._legacyStates.opacity=new s(this._output.opacity)),this._opacityGetter||this.opacityFrom(this._legacyStates.opacity),this._legacyStates.opacity.set(t,i,e)):this.opacityFrom(t)},e.prototype.setOrigin=function(t,i,e){return i||this._legacyStates.origin?(this._legacyStates.origin||(this._legacyStates.origin=new s(this._output.origin||[0,0])),this._originGetter||this.originFrom(this._legacyStates.origin),this._legacyStates.origin.set(t,i,e),this):this.originFrom(t)},e.prototype.setAlign=function(t,i,e){return i||this._legacyStates.align?(this._legacyStates.align||(this._legacyStates.align=new s(this._output.align||[0,0])),this._alignGetter||this.alignFrom(this._legacyStates.align),this._legacyStates.align.set(t,i,e),this):this.alignFrom(t)},e.prototype.setSize=function(t,i,e){return t&&(i||this._legacyStates.size)?(this._legacyStates.size||(this._legacyStates.size=new s(this._output.size||[0,0])),this._sizeGetter||this.sizeFrom(this._legacyStates.size),this._legacyStates.size.set(t,i,e),this):this.sizeFrom(t)},e.prototype.setProportions=function(t,i,e){return t&&(i||this._legacyStates.proportions)?(this._legacyStates.proportions||(this._legacyStates.proportions=new s(this._output.proportions||[0,0])),this._proportionGetter||this.proportionsFrom(this._legacyStates.proportions),this._legacyStates.proportions.set(t,i,e),this):this.proportionsFrom(t)},e.prototype.halt=function(){this._legacyStates.transform&&this._legacyStates.transform.halt(),this._legacyStates.opacity&&this._legacyStates.opacity.halt(),this._legacyStates.origin&&this._legacyStates.origin.halt(),this._legacyStates.align&&this._legacyStates.align.halt(),this._legacyStates.size&&this._legacyStates.size.halt(),this._legacyStates.proportions&&this._legacyStates.proportions.halt(),this._transformGetter=null,this._opacityGetter=null,this._originGetter=null,this._alignGetter=null,this._sizeGetter=null,this._proportionGetter=null},e.prototype.getTransform=function(){return this._transformGetter()},e.prototype.getFinalTransform=function(){return this._legacyStates.transform?this._legacyStates.transform.getFinal():this._output.transform},e.prototype.getOpacity=function(){return this._opacityGetter()},e.prototype.getOrigin=function(){return this._originGetter()},e.prototype.getAlign=function(){return this._alignGetter()},e.prototype.getSize=function(){return this._sizeGetter?this._sizeGetter():this._output.size},e.prototype.getProportions=function(){return this._proportionGetter?this._proportionGetter():this._output.proportions},e.prototype.modify=function(t){return n.call(this),this._output.target=t,this._output},i.exports=e},{"../transitions/Transitionable":88,"../transitions/TransitionableTransform":89,"./Transform":15}],10:[function(t,i){function e(t){this._value=t,this.eventOutput=null}function n(){this.eventOutput=new o,this.eventOutput.bindThis(this),o.setOutputHandler(this,this.eventOutput)}var o=t("./EventHandler");e.patch=function(t){for(var i=new e(t),n=1;n<arguments.length;n++)i.patch(arguments[n]);return t},e.prototype.patch=function(){for(var t=this._value,i=0;i<arguments.length;i++){var e=arguments[i];for(var n in e)n in t&&e[n]&&e[n].constructor===Object&&t[n]&&t[n].constructor===Object?(t.hasOwnProperty(n)||(t[n]=Object.create(t[n])),this.key(n).patch(e[n]),this.eventOutput&&this.eventOutput.emit("change",{id:n,value:this.key(n).value()})):this.set(n,e[n])}return this},e.prototype.setOptions=e.prototype.patch,e.prototype.key=function(t){var i=new e(this._value[t]);return(!(i._value instanceof Object)||i._value instanceof Array)&&(i._value={}),i},e.prototype.get=function(t){return t?this._value[t]:this._value},e.prototype.getOptions=e.prototype.get,e.prototype.set=function(t,i){var e=this.get(t);return this._value[t]=i,this.eventOutput&&i!==e&&this.eventOutput.emit("change",{id:t,value:i}),this},e.prototype.on=function(){return n.call(this),this.on.apply(this,arguments)},e.prototype.removeListener=function(){return n.call(this),this.removeListener.apply(this,arguments)},e.prototype.pipe=function(){return n.call(this),this.pipe.apply(this,arguments)},e.prototype.unpipe=function(){return n.call(this),this.unpipe.apply(this,arguments)},i.exports=e},{"./EventHandler":7}],11:[function(t,i){function e(t){this._object=null,this._child=null,this._hasMultipleChildren=!1,this._isRenderable=!1,this._isModifier=!1,this._resultCache={},this._prevResults={},this._childResult=null,t&&this.set(t)}function n(t,i,e){for(var r=s.parse(t,i),a=Object.keys(r),h=0;h<a.length;h++){var c=a[h],p=o.get(c),u=r[c];u.allocator=i.allocator;var l=p.commit(u);l?n(l,i,e):e[c]=u}}var o=t("./Entity"),s=t("./SpecParser");e.prototype.add=function(t){var i=t instanceof e?t:new e(t);return this._child instanceof Array?this._child.push(i):this._child?(this._child=[this._child,i],this._hasMultipleChildren=!0,this._childResult=[]):this._child=i,i},e.prototype.get=function(){return this._object||(this._hasMultipleChildren?null:this._child?this._child.get():null)},e.prototype.set=function(t){return this._childResult=null,this._hasMultipleChildren=!1,this._isRenderable=t.render?!0:!1,this._isModifier=t.modify?!0:!1,this._object=t,this._child=null,t instanceof e?t:this},e.prototype.getSize=function(){var t=null,i=this.get();return i&&i.getSize&&(t=i.getSize()),!t&&this._child&&this._child.getSize&&(t=this._child.getSize()),t},e.prototype.commit=function(t){for(var i=Object.keys(this._prevResults),e=0;e<i.length;e++){var s=i[e];if(void 0===this._resultCache[s]){var r=o.get(s);r.cleanup&&r.cleanup(t.allocator)}}this._prevResults=this._resultCache,this._resultCache={},n(this.render(),t,this._resultCache)},e.prototype.render=function(){if(this._isRenderable)return this._object.render();var t=null;if(this._hasMultipleChildren){t=this._childResult;for(var i=this._child,e=0;e<i.length;e++)t[e]=i[e].render()}else this._child&&(t=this._child.render());return this._isModifier?this._object.modify(t):t},i.exports=e},{"./Entity":5,"./SpecParser":13}],12:[function(t,i){function e(t){this.id=null,this._objects=null,this.node=new c,this._definition=null,t&&this.load(t)}function n(t){for(var i in p)if(i in t){var e=t[i];return e instanceof Array||(e=[e]),p[i].apply(this,e)}}function o(t){var i=t.transform,e=t.opacity,o=t.origin,s=t.align,r=t.size,c=a.identity;if(i instanceof Array)if(16===i.length&&"number"==typeof i[0])c=i;else for(var p=0;p<i.length;p++)c=a.multiply(c,n(i[p]));else i instanceof Function?c=i:i instanceof Object&&(c=n(i));var u=new h({transform:c,opacity:e,origin:o,align:s,size:r});return u}function s(t){for(var i=new c,e=0;e<t.length;e++){var n=r.call(this,t[e]);n&&i.add(n)}return i}function r(t){var i,e;if(t instanceof Array)i=s.call(this,t);else if(e=this._objects.length,t.render&&t.render instanceof Function)i=t;else if(t.target){var n=r.call(this,t.target),a=o.call(this,t);i=new c(a),i.add(n),t.id&&(this.id[t.id]=a)}else t.id&&(i=new c,this.id[t.id]=i);return this._objects[e]=i,i}var a=t("./Transform"),h=t("./Modifier"),c=t("./RenderNode"),p={translate:a.translate,rotate:a.rotate,rotateX:a.rotateX,rotateY:a.rotateY,rotateZ:a.rotateZ,rotateAxis:a.rotateAxis,scale:a.scale,skew:a.skew,matrix3d:function(){return arguments}};e.prototype.create=function(){return new e(this._definition)},e.prototype.load=function(t){this._definition=t,this.id={},this._objects=[],this.node.set(r.call(this,t))},e.prototype.add=function(){return this.node.add.apply(this.node,arguments)},e.prototype.render=function(){return this.node.render.apply(this.node,arguments)},i.exports=e},{"./Modifier":9,"./RenderNode":11,"./Transform":15}],13:[function(t,i){function e(){this.result={}}function n(t,i){return[t[0]*i[0]+t[1]*i[4]+t[2]*i[8],t[0]*i[1]+t[1]*i[5]+t[2]*i[9],t[0]*i[2]+t[1]*i[6]+t[2]*i[10]]}var o=t("./Transform");e._instance=new e,e.parse=function(t,i){return e._instance.parse(t,i)},e.prototype.parse=function(t,i){return this.reset(),this._parseSpec(t,i,o.identity),this.result},e.prototype.reset=function(){this.result={}};var s=[0,0];e.prototype._parseSpec=function(t,i,e){var r,a,h,c,p,u,l;if("number"==typeof t){if(r=t,h=i.transform,u=i.align||s,i.size&&u&&(u[0]||u[1])){var f=[u[0]*i.size[0],u[1]*i.size[1],0];h=o.thenMove(h,n(f,e))}this.result[r]={transform:h,opacity:i.opacity,origin:i.origin||s,align:i.align||s,size:i.size}}else{if(!t)return;if(t instanceof Array)for(var d=0;d<t.length;d++)this._parseSpec(t[d],i,e);else{a=t.target,h=i.transform,c=i.opacity,p=i.origin,u=i.align,l=i.size;var _=e;if(void 0!==t.opacity&&(c=i.opacity*t.opacity),t.transform&&(h=o.multiply(i.transform,t.transform)),t.origin&&(p=t.origin,_=i.transform),t.align&&(u=t.align),t.size||t.proportions){var g=l;l=[l[0],l[1]],t.size&&(void 0!==t.size[0]&&(l[0]=t.size[0]),void 0!==t.size[1]&&(l[1]=t.size[1])),t.proportions&&(void 0!==t.proportions[0]&&(l[0]=l[0]*t.proportions[0]),void 0!==t.proportions[1]&&(l[1]=l[1]*t.proportions[1])),g&&(u&&(u[0]||u[1])&&(h=o.thenMove(h,n([u[0]*g[0],u[1]*g[1],0],e))),p&&(p[0]||p[1])&&(h=o.moveThen([-p[0]*l[0],-p[1]*l[1],0],h))),_=i.transform,p=null,u=null}this._parseSpec(a,{transform:h,opacity:c,origin:p,align:u,size:l},_)}}},i.exports=e},{"./Transform":15}],14:[function(t,i){function e(t){c.call(this),this.options={},this.properties={},this.attributes={},this.content="",this.classList=[],this.size=null,this._classesDirty=!0,this._stylesDirty=!0,this._attributesDirty=!0,this._sizeDirty=!0,this._contentDirty=!0,this._trueSizeCheck=!0,this._dirtyClasses=[],t&&this.setOptions(t),this._currentTarget=null}function n(t){for(var i=0;i<this._dirtyClasses.length;i++)t.classList.remove(this._dirtyClasses[i]);this._dirtyClasses=[]}function o(t){for(var i in this.properties)t.style[i]=this.properties[i]}function s(t){for(var i in this.properties)t.style[i]=""}function r(t){for(var i in this.attributes)t.setAttribute(i,this.attributes[i])}function a(t){for(var i in this.attributes)t.removeAttribute(i)}function h(t,i){return t&&i?t[0]!==i[0]||t[1]!==i[1]:t!==i}var c=t("./ElementOutput");e.prototype=Object.create(c.prototype),e.prototype.constructor=e,e.prototype.elementType="div",e.prototype.elementClass="famous-surface",e.prototype.setAttributes=function(t){for(var i in t){if("style"===i)throw new Error('Cannot set styles via "setAttributes" as it will break Famo.us.  Use "setProperties" instead.');this.attributes[i]=t[i]}this._attributesDirty=!0},e.prototype.getAttributes=function(){return this.attributes},e.prototype.setProperties=function(t){for(var i in t)this.properties[i]=t[i];return this._stylesDirty=!0,this},e.prototype.getProperties=function(){return this.properties},e.prototype.addClass=function(t){return this.classList.indexOf(t)<0&&(this.classList.push(t),this._classesDirty=!0),this},e.prototype.removeClass=function(t){var i=this.classList.indexOf(t);return i>=0&&(this._dirtyClasses.push(this.classList.splice(i,1)[0]),this._classesDirty=!0),this},e.prototype.toggleClass=function(t){var i=this.classList.indexOf(t);return i>=0?this.removeClass(t):this.addClass(t),this},e.prototype.setClasses=function(t){var i=0,e=[];for(i=0;i<this.classList.length;i++)t.indexOf(this.classList[i])<0&&e.push(this.classList[i]);for(i=0;i<e.length;i++)this.removeClass(e[i]);for(i=0;i<t.length;i++)this.addClass(t[i]);return this},e.prototype.getClassList=function(){return this.classList},e.prototype.setContent=function(t){return this.content!==t&&(this.content=t,this._contentDirty=!0),this},e.prototype.getContent=function(){return this.content},e.prototype.setOptions=function(t){return t.size&&this.setSize(t.size),t.classes&&this.setClasses(t.classes),t.properties&&this.setProperties(t.properties),t.attributes&&this.setAttributes(t.attributes),t.content&&this.setContent(t.content),this},e.prototype.setup=function(t){var i=t.allocate(this.elementType);if(this.elementClass)if(this.elementClass instanceof Array)for(var e=0;e<this.elementClass.length;e++)i.classList.add(this.elementClass[e]);else i.classList.add(this.elementClass);i.style.display="",this.attach(i),this._opacity=null,this._currentTarget=i,this._stylesDirty=!0,this._classesDirty=!0,this._attributesDirty=!0,this._sizeDirty=!0,this._contentDirty=!0,this._originDirty=!0,this._transformDirty=!0},e.prototype.commit=function(t){this._currentTarget||this.setup(t.allocator);var i=this._currentTarget,e=t.size;if(this._classesDirty){n.call(this,i);for(var s=this.getClassList(),a=0;a<s.length;a++)i.classList.add(s[a]);this._classesDirty=!1,this._trueSizeCheck=!0}if(this._stylesDirty&&(o.call(this,i),this._stylesDirty=!1,this._trueSizeCheck=!0),this._attributesDirty&&(r.call(this,i),this._attributesDirty=!1,this._trueSizeCheck=!0),this.size){var p=t.size;if(e=[this.size[0],this.size[1]],void 0===e[0]&&(e[0]=p[0]),void 0===e[1]&&(e[1]=p[1]),e[0]===!0||e[1]===!0){if(e[0]===!0)if(this._trueSizeCheck||0===this._size[0]){var u=i.offsetWidth;this._size&&this._size[0]!==u&&(this._size[0]=u,this._sizeDirty=!0),e[0]=u}else this._size&&(e[0]=this._size[0]);if(e[1]===!0)if(this._trueSizeCheck||0===this._size[1]){var l=i.offsetHeight;this._size&&this._size[1]!==l&&(this._size[1]=l,this._sizeDirty=!0),e[1]=l}else this._size&&(e[1]=this._size[1]);this._trueSizeCheck=!1}}h(this._size,e)&&(this._size||(this._size=[0,0]),this._size[0]=e[0],this._size[1]=e[1],this._sizeDirty=!0),this._sizeDirty&&(this._size&&(i.style.width=this.size&&this.size[0]===!0?"":this._size[0]+"px",i.style.height=this.size&&this.size[1]===!0?"":this._size[1]+"px"),this._eventOutput.emit("resize")),this._contentDirty&&(this.deploy(i),this._eventOutput.emit("deploy"),this._contentDirty=!1,this._trueSizeCheck=!0),c.prototype.commit.call(this,t)},e.prototype.cleanup=function(t){var i=0,e=this._currentTarget;this._eventOutput.emit("recall"),this.recall(e),e.style.display="none",e.style.opacity="",e.style.width="",e.style.height="",s.call(this,e),a.call(this,e);var o=this.getClassList();for(n.call(this,e),i=0;i<o.length;i++)e.classList.remove(o[i]);if(this.elementClass)if(this.elementClass instanceof Array)for(i=0;i<this.elementClass.length;i++)e.classList.remove(this.elementClass[i]);else e.classList.remove(this.elementClass);this.detach(e),this._currentTarget=null,t.deallocate(e)},e.prototype.deploy=function(t){var i=this.getContent();if(i instanceof Node){for(;t.hasChildNodes();)t.removeChild(t.firstChild);t.appendChild(i)}else t.innerHTML=i},e.prototype.recall=function(t){for(var i=document.createDocumentFragment();t.hasChildNodes();)i.appendChild(t.firstChild);this.setContent(i)},e.prototype.getSize=function(){return this._size?this._size:this.size},e.prototype.setSize=function(t){return this.size=t?[t[0],t[1]]:null,this._sizeDirty=!0,this},i.exports=e},{"./ElementOutput":3}],15:[function(t,i){function e(t){return 2===t.length?t[0]*t[0]+t[1]*t[1]:t[0]*t[0]+t[1]*t[1]+t[2]*t[2]}function n(t){return Math.sqrt(e(t))}function o(t){return 0>t?-1:1}var s={};s.precision=1e-6,s.identity=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],s.multiply4x4=function(t,i){return[t[0]*i[0]+t[4]*i[1]+t[8]*i[2]+t[12]*i[3],t[1]*i[0]+t[5]*i[1]+t[9]*i[2]+t[13]*i[3],t[2]*i[0]+t[6]*i[1]+t[10]*i[2]+t[14]*i[3],t[3]*i[0]+t[7]*i[1]+t[11]*i[2]+t[15]*i[3],t[0]*i[4]+t[4]*i[5]+t[8]*i[6]+t[12]*i[7],t[1]*i[4]+t[5]*i[5]+t[9]*i[6]+t[13]*i[7],t[2]*i[4]+t[6]*i[5]+t[10]*i[6]+t[14]*i[7],t[3]*i[4]+t[7]*i[5]+t[11]*i[6]+t[15]*i[7],t[0]*i[8]+t[4]*i[9]+t[8]*i[10]+t[12]*i[11],t[1]*i[8]+t[5]*i[9]+t[9]*i[10]+t[13]*i[11],t[2]*i[8]+t[6]*i[9]+t[10]*i[10]+t[14]*i[11],t[3]*i[8]+t[7]*i[9]+t[11]*i[10]+t[15]*i[11],t[0]*i[12]+t[4]*i[13]+t[8]*i[14]+t[12]*i[15],t[1]*i[12]+t[5]*i[13]+t[9]*i[14]+t[13]*i[15],t[2]*i[12]+t[6]*i[13]+t[10]*i[14]+t[14]*i[15],t[3]*i[12]+t[7]*i[13]+t[11]*i[14]+t[15]*i[15]]},s.multiply=function(t,i){return[t[0]*i[0]+t[4]*i[1]+t[8]*i[2],t[1]*i[0]+t[5]*i[1]+t[9]*i[2],t[2]*i[0]+t[6]*i[1]+t[10]*i[2],0,t[0]*i[4]+t[4]*i[5]+t[8]*i[6],t[1]*i[4]+t[5]*i[5]+t[9]*i[6],t[2]*i[4]+t[6]*i[5]+t[10]*i[6],0,t[0]*i[8]+t[4]*i[9]+t[8]*i[10],t[1]*i[8]+t[5]*i[9]+t[9]*i[10],t[2]*i[8]+t[6]*i[9]+t[10]*i[10],0,t[0]*i[12]+t[4]*i[13]+t[8]*i[14]+t[12],t[1]*i[12]+t[5]*i[13]+t[9]*i[14]+t[13],t[2]*i[12]+t[6]*i[13]+t[10]*i[14]+t[14],1]
},s.thenMove=function(t,i){return i[2]||(i[2]=0),[t[0],t[1],t[2],0,t[4],t[5],t[6],0,t[8],t[9],t[10],0,t[12]+i[0],t[13]+i[1],t[14]+i[2],1]},s.moveThen=function(t,i){t[2]||(t[2]=0);var e=t[0]*i[0]+t[1]*i[4]+t[2]*i[8],n=t[0]*i[1]+t[1]*i[5]+t[2]*i[9],o=t[0]*i[2]+t[1]*i[6]+t[2]*i[10];return s.thenMove(i,[e,n,o])},s.translate=function(t,i,e){return void 0===e&&(e=0),[1,0,0,0,0,1,0,0,0,0,1,0,t,i,e,1]},s.thenScale=function(t,i){return[i[0]*t[0],i[1]*t[1],i[2]*t[2],0,i[0]*t[4],i[1]*t[5],i[2]*t[6],0,i[0]*t[8],i[1]*t[9],i[2]*t[10],0,i[0]*t[12],i[1]*t[13],i[2]*t[14],1]},s.scale=function(t,i,e){return void 0===e&&(e=1),void 0===i&&(i=t),[t,0,0,0,0,i,0,0,0,0,e,0,0,0,0,1]},s.rotateX=function(t){var i=Math.cos(t),e=Math.sin(t);return[1,0,0,0,0,i,e,0,0,-e,i,0,0,0,0,1]},s.rotateY=function(t){var i=Math.cos(t),e=Math.sin(t);return[i,0,-e,0,0,1,0,0,e,0,i,0,0,0,0,1]},s.rotateZ=function(t){var i=Math.cos(t),e=Math.sin(t);return[i,e,0,0,-e,i,0,0,0,0,1,0,0,0,0,1]},s.rotate=function(t,i,e){var n=Math.cos(t),o=Math.sin(t),s=Math.cos(i),r=Math.sin(i),a=Math.cos(e),h=Math.sin(e),c=[s*a,n*h+o*r*a,o*h-n*r*a,0,-s*h,n*a-o*r*h,o*a+n*r*h,0,r,-o*s,n*s,0,0,0,0,1];return c},s.rotateAxis=function(t,i){var e=Math.sin(i),n=Math.cos(i),o=1-n,s=t[0]*t[0]*o,r=t[0]*t[1]*o,a=t[0]*t[2]*o,h=t[1]*t[1]*o,c=t[1]*t[2]*o,p=t[2]*t[2]*o,u=t[0]*e,l=t[1]*e,f=t[2]*e,d=[s+n,r+f,a-l,0,r-f,h+n,c+u,0,a+l,c-u,p+n,0,0,0,0,1];return d},s.aboutOrigin=function(t,i){var e=t[0]-(t[0]*i[0]+t[1]*i[4]+t[2]*i[8]),n=t[1]-(t[0]*i[1]+t[1]*i[5]+t[2]*i[9]),o=t[2]-(t[0]*i[2]+t[1]*i[6]+t[2]*i[10]);return s.thenMove(i,[e,n,o])},s.skew=function(t,i,e){return[1,Math.tan(i),0,0,Math.tan(e),1,0,0,0,Math.tan(t),1,0,0,0,0,1]},s.skewX=function(t){return[1,0,0,0,Math.tan(t),1,0,0,0,0,1,0,0,0,0,1]},s.skewY=function(t){return[1,Math.tan(t),0,0,0,1,0,0,0,0,1,0,0,0,0,1]},s.perspective=function(t){return[1,0,0,0,0,1,0,0,0,0,1,-1/t,0,0,0,1]},s.getTranslate=function(t){return[t[12],t[13],t[14]]},s.inverse=function(t){var i=t[5]*t[10]-t[6]*t[9],e=t[4]*t[10]-t[6]*t[8],n=t[4]*t[9]-t[5]*t[8],o=t[1]*t[10]-t[2]*t[9],s=t[0]*t[10]-t[2]*t[8],r=t[0]*t[9]-t[1]*t[8],a=t[1]*t[6]-t[2]*t[5],h=t[0]*t[6]-t[2]*t[4],c=t[0]*t[5]-t[1]*t[4],p=t[0]*i-t[1]*e+t[2]*n,u=1/p,l=[u*i,-u*o,u*a,0,-u*e,u*s,-u*h,0,u*n,-u*r,u*c,0,0,0,0,1];return l[12]=-t[12]*l[0]-t[13]*l[4]-t[14]*l[8],l[13]=-t[12]*l[1]-t[13]*l[5]-t[14]*l[9],l[14]=-t[12]*l[2]-t[13]*l[6]-t[14]*l[10],l},s.transpose=function(t){return[t[0],t[4],t[8],t[12],t[1],t[5],t[9],t[13],t[2],t[6],t[10],t[14],t[3],t[7],t[11],t[15]]},s.interpret=function(t){var i=[t[0],t[1],t[2]],r=o(i[0]),a=n(i),h=[i[0]+r*a,i[1],i[2]],c=2/e(h);if(c>=1/0)return{translate:s.getTranslate(t),rotate:[0,0,0],scale:[0,0,0],skew:[0,0,0]};var p=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1];p[0]=1-c*h[0]*h[0],p[5]=1-c*h[1]*h[1],p[10]=1-c*h[2]*h[2],p[1]=-c*h[0]*h[1],p[2]=-c*h[0]*h[2],p[6]=-c*h[1]*h[2],p[4]=p[1],p[8]=p[2],p[9]=p[6];var u=s.multiply(p,t),l=[u[5],u[6]],f=o(l[0]),d=n(l),_=[l[0]+f*d,l[1]],g=2/e(_),y=[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1];y[5]=1-g*_[0]*_[0],y[10]=1-g*_[1]*_[1],y[6]=-g*_[0]*_[1],y[9]=y[6];var v=s.multiply(y,p),m=s.multiply(v,t),O=s.scale(m[0]<0?-1:1,m[5]<0?-1:1,m[10]<0?-1:1);m=s.multiply(m,O),v=s.multiply(O,v);var S={};return S.translate=s.getTranslate(t),S.rotate=[Math.atan2(-v[6],v[10]),Math.asin(v[2]),Math.atan2(-v[1],v[0])],S.rotate[0]||(S.rotate[0]=0,S.rotate[2]=Math.atan2(v[4],v[5])),S.scale=[m[0],m[5],m[10]],S.skew=[Math.atan2(m[9],S.scale[2]),Math.atan2(m[8],S.scale[2]),Math.atan2(m[4],S.scale[0])],Math.abs(S.rotate[0])+Math.abs(S.rotate[2])>1.5*Math.PI&&(S.rotate[1]=Math.PI-S.rotate[1],S.rotate[1]>Math.PI&&(S.rotate[1]-=2*Math.PI),S.rotate[1]<-Math.PI&&(S.rotate[1]+=2*Math.PI),S.rotate[0]<0?S.rotate[0]+=Math.PI:S.rotate[0]-=Math.PI,S.rotate[2]<0?S.rotate[2]+=Math.PI:S.rotate[2]-=Math.PI),S},s.average=function(t,i,e){e=void 0===e?.5:e;for(var n=s.interpret(t),o=s.interpret(i),r={translate:[0,0,0],rotate:[0,0,0],scale:[0,0,0],skew:[0,0,0]},a=0;3>a;a++)r.translate[a]=(1-e)*n.translate[a]+e*o.translate[a],r.rotate[a]=(1-e)*n.rotate[a]+e*o.rotate[a],r.scale[a]=(1-e)*n.scale[a]+e*o.scale[a],r.skew[a]=(1-e)*n.skew[a]+e*o.skew[a];return s.build(r)},s.build=function(t){var i=s.scale(t.scale[0],t.scale[1],t.scale[2]),e=s.skew(t.skew[0],t.skew[1],t.skew[2]),n=s.rotate(t.rotate[0],t.rotate[1],t.rotate[2]);return s.thenMove(s.multiply(s.multiply(n,e),i),t.translate)},s.equals=function(t,i){return!s.notEquals(t,i)},s.notEquals=function(t,i){return t===i?!1:!(t&&i)||t[12]!==i[12]||t[13]!==i[13]||t[14]!==i[14]||t[0]!==i[0]||t[1]!==i[1]||t[2]!==i[2]||t[4]!==i[4]||t[5]!==i[5]||t[6]!==i[6]||t[8]!==i[8]||t[9]!==i[9]||t[10]!==i[10]},s.normalizeRotation=function(t){var i=t.slice(0);for((i[0]===.5*Math.PI||i[0]===.5*-Math.PI)&&(i[0]=-i[0],i[1]=Math.PI-i[1],i[2]-=Math.PI),i[0]>.5*Math.PI&&(i[0]=i[0]-Math.PI,i[1]=Math.PI-i[1],i[2]-=Math.PI),i[0]<.5*-Math.PI&&(i[0]=i[0]+Math.PI,i[1]=-Math.PI-i[1],i[2]-=Math.PI);i[1]<-Math.PI;)i[1]+=2*Math.PI;for(;i[1]>=Math.PI;)i[1]-=2*Math.PI;for(;i[2]<-Math.PI;)i[2]+=2*Math.PI;for(;i[2]>=Math.PI;)i[2]-=2*Math.PI;return i},s.inFront=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,.001,1],s.behind=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,-.001,1],i.exports=s},{}],16:[function(t,i){function e(t){this._node=new s,this._eventInput=new n,this._eventOutput=new n,n.setInputHandler(this,this._eventInput),n.setOutputHandler(this,this._eventOutput),this.options=r.clone(this.constructor.DEFAULT_OPTIONS||e.DEFAULT_OPTIONS),this._optionsManager=new o(this.options),t&&this.setOptions(t)}var n=t("./EventHandler"),o=t("./OptionsManager"),s=t("./RenderNode"),r=t("../utilities/Utility");e.DEFAULT_OPTIONS={},e.prototype.getOptions=function(t){return this._optionsManager.getOptions(t)},e.prototype.setOptions=function(t){this._optionsManager.patch(t)},e.prototype.add=function(){return this._node.add.apply(this._node,arguments)},e.prototype._add=e.prototype.add,e.prototype.render=function(){return this._node.render()},e.prototype.getSize=function(){return this._node&&this._node.getSize?this._node.getSize.apply(this._node,arguments)||this.options.size:this.options.size},i.exports=e},{"../utilities/Utility":95,"./EventHandler":7,"./OptionsManager":10,"./RenderNode":11}],17:[function(t,i){function e(t){t||(t=[]),t instanceof Array&&(t={array:t}),this._=null,this.index=t.index||0,t.array?this._=new this.constructor.Backing(t.array):t._&&(this._=t._),this.index===this._.firstIndex&&(this._.firstNode=this),this.index===this._.firstIndex+this._.array.length-1&&(this._.lastNode=this),void 0!==t.loop&&(this._.loop=t.loop),void 0!==t.trackSize&&(this._.trackSize=t.trackSize),this._previousNode=null,this._nextNode=null}e.Backing=function(t){this.array=t,this.firstIndex=0,this.loop=!1,this.firstNode=null,this.lastNode=null,this.cumulativeSizes=[[0,0]],this.sizeDirty=!0,this.trackSize=!1},e.Backing.prototype.getValue=function(t){var i=t-this.firstIndex;return 0>i||i>=this.array.length?null:this.array[i]},e.Backing.prototype.setValue=function(t,i){this.array[t-this.firstIndex]=i},e.Backing.prototype.getSize=function(t){return this.cumulativeSizes[t]},e.Backing.prototype.calculateSize=function(t){t=t||this.array.length;for(var i=[0,0],e=0;t>e;e++){var n=this.array[e].getSize();if(!n)return void 0;void 0!==i[0]&&(void 0===n[0]?i[0]=void 0:i[0]+=n[0]),void 0!==i[1]&&(void 0===n[1]?i[1]=void 0:i[1]+=n[1]),this.cumulativeSizes[e+1]=i.slice()}return this.sizeDirty=!1,i},e.Backing.prototype.reindex=function(t,i,e){if(this.array[0]){for(var n=0,o=this.firstIndex,s=e-i,r=this.firstNode;t-1>o;)r=r.getNext(),o++;var a=r;for(n=0;i>n;n++)r=r.getNext(),r&&(r._previousNode=a);var h=r?r.getNext():null;for(a._nextNode=null,r=a,n=0;e>n;n++)r=r.getNext();if(o+=e,r!==h&&(r._nextNode=h,h&&(h._previousNode=r)),h)for(r=h,o++;r&&o<this.array.length+this.firstIndex;)r._nextNode?r.index+=s:r.index=o,r=r.getNext(),o++;this.trackSize&&(this.sizeDirty=!0)}},e.prototype.getPrevious=function(){var t=this._.array.length;return t?this.index===this._.firstIndex?this._.loop?(this._previousNode=this._.lastNode||new this.constructor({_:this._,index:this._.firstIndex+t-1}),this._previousNode._nextNode=this):this._previousNode=null:this._previousNode||(this._previousNode=new this.constructor({_:this._,index:this.index-1}),this._previousNode._nextNode=this):this._previousNode=null,this._previousNode},e.prototype.getNext=function(){var t=this._.array.length;return t?this.index===this._.firstIndex+t-1?this._.loop?(this._nextNode=this._.firstNode||new this.constructor({_:this._,index:this._.firstIndex}),this._nextNode._previousNode=this):this._nextNode=null:this._nextNode||(this._nextNode=new this.constructor({_:this._,index:this.index+1}),this._nextNode._previousNode=this):this._nextNode=null,this._nextNode},e.prototype.indexOf=function(t){return this._.array.indexOf(t)},e.prototype.getIndex=function(){return this.index},e.prototype.toString=function(){return""+this.index},e.prototype.unshift=function(){this._.array.unshift.apply(this._.array,arguments),this._.firstIndex-=arguments.length,this._.trackSize&&(this._.sizeDirty=!0)},e.prototype.push=function(){this._.array.push.apply(this._.array,arguments),this._.trackSize&&(this._.sizeDirty=!0)},e.prototype.splice=function(t,i){var e=Array.prototype.slice.call(arguments,2);this._.array.splice.apply(this._.array,[t-this._.firstIndex,i].concat(e)),this._.reindex(t,i,e.length)},e.prototype.swap=function(t){var i=t.get(),e=this.get();this._.setValue(this.index,i),this._.setValue(t.index,e);var n=this._previousNode,o=this._nextNode,s=this.index,r=t._previousNode,a=t._nextNode,h=t.index;this.index=h,this._previousNode=r===this?t:r,this._previousNode&&(this._previousNode._nextNode=this),this._nextNode=a===this?t:a,this._nextNode&&(this._nextNode._previousNode=this),t.index=s,t._previousNode=n===t?this:n,t._previousNode&&(t._previousNode._nextNode=t),t._nextNode=o===t?this:o,t._nextNode&&(t._nextNode._previousNode=t),this.index===this._.firstIndex?this._.firstNode=this:this.index===this._.firstIndex+this._.array.length-1&&(this._.lastNode=this),t.index===this._.firstIndex?this._.firstNode=t:t.index===this._.firstIndex+this._.array.length-1&&(this._.lastNode=t),this._.trackSize&&(this._.sizeDirty=!0)},e.prototype.get=function(){return this._.getValue(this.index)},e.prototype.getSize=function(){var t=this.get();return t?t.getSize():null},e.prototype.render=function(){this._.trackSize&&this._.sizeDirty&&this._.calculateSize();var t=this.get();return t?t.render.apply(t,arguments):null},i.exports=e},{}],18:[function(t,i){i.exports={Context:t("./Context"),ElementAllocator:t("./ElementAllocator"),ElementOutput:t("./ElementOutput"),Engine:t("./Engine"),Entity:t("./Entity"),EventEmitter:t("./EventEmitter"),EventHandler:t("./EventHandler"),Group:t("./Group"),Modifier:t("./Modifier"),OptionsManager:t("./OptionsManager"),RenderNode:t("./RenderNode"),Scene:t("./Scene"),SpecParser:t("./SpecParser"),Surface:t("./Surface"),Transform:t("./Transform"),View:t("./View"),ViewSequence:t("./ViewSequence")}},{"./Context":1,"./ElementAllocator":2,"./ElementOutput":3,"./Engine":4,"./Entity":5,"./EventEmitter":6,"./EventHandler":7,"./Group":8,"./Modifier":9,"./OptionsManager":10,"./RenderNode":11,"./Scene":12,"./SpecParser":13,"./Surface":14,"./Transform":15,"./View":16,"./ViewSequence":17}],19:[function(t,i){function e(t){this.dispatchers={},this.currMode=void 0,this.setMode(t)}var n=t("../core/EventHandler");e.prototype.setMode=function(t){if(t!==this.currMode){var i=this.currMode;this.dispatchers[this.currMode]&&this.dispatchers[this.currMode].trigger("unpipe"),this.currMode=t,this.dispatchers[t]&&this.dispatchers[t].emit("pipe"),this.emit("change",{from:i,to:t})}},e.prototype.forMode=function(t){return this.dispatchers[t]||(this.dispatchers[t]=new n),this.dispatchers[t]},e.prototype.emit=function(t,i){if(void 0===this.currMode)return!1;i||(i={});var e=this.dispatchers[this.currMode];return e?e.trigger(t,i):void 0},i.exports=e},{"../core/EventHandler":7}],20:[function(t,i){function e(t){n.call(this),this._condition=t}var n=t("../core/EventHandler");e.prototype=Object.create(n.prototype),e.prototype.constructor=e,e.prototype.emit=function(t,i){return this._condition(t,i)?n.prototype.emit.apply(this,arguments):void 0},e.prototype.trigger=e.prototype.emit,i.exports=e},{"../core/EventHandler":7}],21:[function(t,i){function e(t){n.call(this),this._mappingFunction=t}var n=t("../core/EventHandler");e.prototype=Object.create(n.prototype),e.prototype.constructor=e,e.prototype.subscribe=null,e.prototype.unsubscribe=null,e.prototype.emit=function(t,i){var e=this._mappingFunction.apply(this,arguments);e&&e.emit instanceof Function&&e.emit(t,i)},e.prototype.trigger=e.prototype.emit,i.exports=e},{"../core/EventHandler":7}],22:[function(t,i){i.exports={EventArbiter:t("./EventArbiter"),EventFilter:t("./EventFilter"),EventMapper:t("./EventMapper")}},{"./EventArbiter":19,"./EventFilter":20,"./EventMapper":21}],23:[function(t,i){i.exports={core:t("./core"),events:t("./events"),inputs:t("./inputs"),math:t("./math"),modifiers:t("./modifiers"),physics:t("./physics"),surfaces:t("./surfaces"),transitions:t("./transitions"),utilities:t("./utilities"),views:t("./views"),widgets:t("./widgets")}},{"./core":18,"./events":22,"./inputs":36,"./math":42,"./modifiers":47,"./physics":71,"./surfaces":82,"./transitions":92,"./utilities":96,"./views":112,"./widgets":117}],24:[function(t,i){function e(t,i){void 0===i&&(i="update"),this._state=t&&t.get&&t.set?t:new s(t||0),this._eventInput=new o,o.setInputHandler(this,this._eventInput),this._eventInput.on(i,n.bind(this))}function n(t){var i=t.delta,e=this.get();if(i.constructor===e.constructor){var n=i instanceof Array?[e[0]+i[0],e[1]+i[1]]:e+i;this.set(n)}}var o=t("../core/EventHandler"),s=t("../transitions/Transitionable");e.prototype.get=function(){return this._state.get()},e.prototype.set=function(t){this._state.set(t)},i.exports=e},{"../core/EventHandler":7,"../transitions/Transitionable":88}],25:[function(){function t(t){window.addEventListener(t,function(t){return t.stopPropagation(),!1},!0)}var i="ontouchstart"in window;i&&(t("mousedown"),t("mousemove"),t("mouseup"),t("mouseleave"))},{}],26:[function(){!function(){if(window.CustomEvent){var t=300,i=500,e={},n={},o=Date.now;window.addEventListener("touchstart",function(t){for(var i=o(),n=0;n<t.changedTouches.length;n++){var s=t.changedTouches[n];e[s.identifier]=i}}),window.addEventListener("touchmove",function(t){for(var i=0;i<t.changedTouches.length;i++){var n=t.changedTouches[i];delete e[n.identifier]}}),window.addEventListener("touchend",function(i){for(var s=o(),r=0;r<i.changedTouches.length;r++){var a=i.changedTouches[r],h=e[a.identifier];if(h&&t>s-h){var c=new window.CustomEvent("click",{bubbles:!0,detail:a});n[s]=i,i.target.dispatchEvent(c)}delete e[a.identifier]}}),window.addEventListener("click",function(t){var e=o();for(var s in n){var r=n[s];i>e-s?t instanceof window.MouseEvent&&t.target===r.target&&t.stopPropagation():delete n[s]}},!0)}}()},{}],27:[function(t,i){function e(t,i){this._eventInput=new o,this._eventOutput=new o,o.setInputHandler(this,this._eventInput),o.setOutputHandler(this,this._eventOutput),this._syncs={},t&&this.addSync(t),i&&this.setOptions(i)}function n(t,i){s[t]&&(this._syncs[t]=new s[t](i),this.pipeSync(t))}var o=t("../core/EventHandler");e.DIRECTION_X=0,e.DIRECTION_Y=1,e.DIRECTION_Z=2;var s={};e.register=function(t){for(var i in t)if(s[i]){if(s[i]!==t[i])throw new Error("Conflicting sync classes for key: "+i)}else s[i]=t[i]},e.prototype.setOptions=function(t){for(var i in this._syncs)this._syncs[i].setOptions(t)},e.prototype.pipeSync=function(t){var i=this._syncs[t];this._eventInput.pipe(i),i.pipe(this._eventOutput)},e.prototype.unpipeSync=function(t){var i=this._syncs[t];this._eventInput.unpipe(i),i.unpipe(this._eventOutput)},e.prototype.addSync=function(t){if(t instanceof Array)for(var i=0;i<t.length;i++)n.call(this,t[i]);else if(t instanceof Object)for(var e in t)n.call(this,e,t[e])},i.exports=e},{"../core/EventHandler":7}],28:[function(t,i){function e(t){this.options=Object.create(e.DEFAULT_OPTIONS),this._optionsManager=new h(this.options),t&&this.setOptions(t),this._eventInput=new a,this._eventOutput=new a,a.setInputHandler(this,this._eventInput),a.setOutputHandler(this,this._eventOutput),this._eventInput.on("mousedown",n.bind(this)),this._eventInput.on("mousemove",o.bind(this)),this._eventInput.on("mouseup",s.bind(this)),this.options.propogate?this._eventInput.on("mouseleave",r.bind(this)):this._eventInput.on("mouseleave",s.bind(this)),this.options.clickThreshold&&window.addEventListener("click",function(t){Math.sqrt(Math.pow(this._displacement[0],2)+Math.pow(this._displacement[1],2))>this.options.clickThreshold&&t.stopPropagation()}.bind(this),!0),this._payload={delta:null,position:null,velocity:null,clientX:0,clientY:0,offsetX:0,offsetY:0},this._positionHistory=[],this._position=null,this._prevCoord=void 0,this._prevTime=void 0,this._down=!1,this._moved=!1,this._displacement=[0,0],this._documentActive=!1}function n(t){var i,e;this.options.preventDefault&&t.preventDefault();var n=t.clientX,o=t.clientY;this._prevCoord=[n,o],this._prevTime=Date.now(),this._down=!0,this._move=!1,void 0!==this.options.direction?(this._position=0,i=0,e=0):(this._position=[0,0],i=[0,0],e=[0,0]),this.options.clickThreshold&&(this._displacement=[0,0]);var s=this._payload;s.delta=i,s.position=this._position,s.velocity=e,s.clientX=n,s.clientY=o,s.offsetX=t.offsetX,s.offsetY=t.offsetY,this._positionHistory.push({position:s.position.slice?s.position.slice(0):s.position,time:this._prevTime}),this._eventOutput.emit("start",s),this._documentActive=!1}function o(t){if(this._prevCoord){var i=this._prevCoord;this._prevTime;var n=t.clientX,o=t.clientY,s=Date.now(),r=n-i[0],a=o-i[1];this.options.rails&&(Math.abs(r)>Math.abs(a)?a=0:r=0);var h,p,u=Math.max(s-this._positionHistory[0].time,c),l=this.options.scale;this.options.direction===e.DIRECTION_X?(p=l*r,this._position+=p,h=l*(this._position-this._positionHistory[0].position)/u):this.options.direction===e.DIRECTION_Y?(p=l*a,this._position+=p,h=l*(this._position-this._positionHistory[0].position)/u):(p=[l*r,l*a],h=[l*(this._position[0]-this._positionHistory[0].position[0])/u,l*(this._position[1]-this._positionHistory[0].position[1])/u],this._position[0]+=p[0],this._position[1]+=p[1]),this.options.clickThreshold!==!1&&(this._displacement[0]+=r,this._displacement[1]+=a);var f=this._payload;f.delta=p,f.position=this._position,f.velocity=h,f.clientX=n,f.clientY=o,f.offsetX=t.offsetX,f.offsetY=t.offsetY,this._positionHistory.length===this.options.velocitySampleLength&&this._positionHistory.shift(),this._positionHistory.push({position:f.position.slice?f.position.slice(0):f.position,time:s}),this._eventOutput.emit("update",f),this._prevCoord=[n,o],this._prevTime=s,this._move=!0}}function s(){this._down&&(this._eventOutput.emit("end",this._payload),this._prevCoord=void 0,this._prevTime=void 0,this._down=!1,this._move=!1,this._positionHistory=[])}function r(t){if(this._down&&this._move&&!this._documentActive){var i=o.bind(this),e=function(t){s.call(this,t),document.removeEventListener("mousemove",i),document.removeEventListener("mouseup",e)}.bind(this,t);document.addEventListener("mousemove",i),document.addEventListener("mouseup",e),this._documentActive=!0}}var a=t("../core/EventHandler"),h=t("../core/OptionsManager");e.DEFAULT_OPTIONS={clickThreshold:void 0,direction:void 0,rails:!1,scale:1,propogate:!0,velocitySampleLength:10,preventDefault:!0},e.DIRECTION_X=0,e.DIRECTION_Y=1;var c=8;e.prototype.getOptions=function(){return this.options},e.prototype.setOptions=function(t){return this._optionsManager.setOptions(t)},i.exports=e},{"../core/EventHandler":7,"../core/OptionsManager":10}],29:[function(t,i){function e(t){n.call(this),this.options=Object.create(e.DEFAULT_OPTIONS),this._optionsManager=new o(this.options),t&&this.setOptions(t),this._displacement=0,this._previousDistance=0}var n=t("./TwoFingerSync"),o=t("../core/OptionsManager");e.prototype=Object.create(n.prototype),e.prototype.constructor=e,e.DEFAULT_OPTIONS={scale:1},e.prototype._startUpdate=function(t){this._previousDistance=n.calculateDistance(this.posA,this.posB),this._displacement=0,this._eventOutput.emit("start",{count:t.touches.length,touches:[this.touchAId,this.touchBId],distance:this._dist,center:n.calculateCenter(this.posA,this.posB)})},e.prototype._moveUpdate=function(t){var i=n.calculateDistance(this.posA,this.posB),e=n.calculateCenter(this.posA,this.posB),o=this.options.scale,s=o*(i-this._previousDistance),r=s/t;this._previousDistance=i,this._displacement+=s,this._eventOutput.emit("update",{delta:s,velocity:r,distance:i,displacement:this._displacement,center:e,touches:[this.touchAId,this.touchBId]})},e.prototype.getOptions=function(){return this.options},e.prototype.setOptions=function(t){return this._optionsManager.setOptions(t)},i.exports=e},{"../core/OptionsManager":10,"./TwoFingerSync":35}],30:[function(t,i){function e(t){n.call(this),this.options=Object.create(e.DEFAULT_OPTIONS),this._optionsManager=new o(this.options),t&&this.setOptions(t),this._angle=0,this._previousAngle=0}var n=t("./TwoFingerSync"),o=t("../core/OptionsManager");e.prototype=Object.create(n.prototype),e.prototype.constructor=e,e.DEFAULT_OPTIONS={scale:1},e.prototype._startUpdate=function(t){this._angle=0,this._previousAngle=n.calculateAngle(this.posA,this.posB);var i=n.calculateCenter(this.posA,this.posB);this._eventOutput.emit("start",{count:t.touches.length,angle:this._angle,center:i,touches:[this.touchAId,this.touchBId]})},e.prototype._moveUpdate=function(t){var i=this.options.scale,e=n.calculateAngle(this.posA,this.posB),o=n.calculateCenter(this.posA,this.posB),s=i*(e-this._previousAngle),r=s/t;this._angle+=s,this._eventOutput.emit("update",{delta:s,velocity:r,angle:this._angle,center:o,touches:[this.touchAId,this.touchBId]}),this._previousAngle=e},e.prototype.getOptions=function(){return this.options},e.prototype.setOptions=function(t){return this._optionsManager.setOptions(t)},i.exports=e},{"../core/OptionsManager":10,"./TwoFingerSync":35}],31:[function(t,i){function e(t){o.call(this),this.options=Object.create(e.DEFAULT_OPTIONS),this._optionsManager=new s(this.options),t&&this.setOptions(t),this._scaleFactor=1,this._startDist=0,this._eventInput.on("pipe",n.bind(this))}function n(){this.touchAId=void 0,this.touchBId=void 0}var o=t("./TwoFingerSync"),s=t("../core/OptionsManager");e.prototype=Object.create(o.prototype),e.prototype.constructor=e,e.DEFAULT_OPTIONS={scale:1},e.prototype._startUpdate=function(t){this._scaleFactor=1,this._startDist=o.calculateDistance(this.posA,this.posB),this._eventOutput.emit("start",{count:t.touches.length,touches:[this.touchAId,this.touchBId],distance:this._startDist,center:o.calculateCenter(this.posA,this.posB)})},e.prototype._moveUpdate=function(t){var i=this.options.scale,e=o.calculateDistance(this.posA,this.posB),n=o.calculateCenter(this.posA,this.posB),s=(e-this._startDist)/this._startDist,r=Math.max(1+i*s,0),a=(r-this._scaleFactor)/t;this._eventOutput.emit("update",{delta:s,scale:r,velocity:a,distance:e,center:n,touches:[this.touchAId,this.touchBId]}),this._scaleFactor=r},e.prototype.getOptions=function(){return this.options},e.prototype.setOptions=function(t){return this._optionsManager.setOptions(t)},i.exports=e},{"../core/OptionsManager":10,"./TwoFingerSync":35}],32:[function(t,i){function e(t){this.options=Object.create(e.DEFAULT_OPTIONS),this._optionsManager=new a(this.options),t&&this.setOptions(t),this._payload={delta:null,position:null,velocity:null,slip:!0},this._eventInput=new s,this._eventOutput=new s,s.setInputHandler(this,this._eventInput),s.setOutputHandler(this,this._eventOutput),this._position=void 0===this.options.direction?[0,0]:0,this._prevTime=void 0,this._prevVel=void 0,this._eventInput.on("mousewheel",o.bind(this)),this._eventInput.on("wheel",o.bind(this)),this._inProgress=!1,this._loopBound=!1}function n(){if(this._inProgress&&c()-this._prevTime>this.options.stallTime){this._inProgress=!1;var t=Math.abs(this._prevVel)>=this.options.minimumEndSpeed?this._prevVel:0,i=this._payload;i.position=this._position,i.velocity=t,i.slip=!0,this._eventOutput.emit("end",i)}}function o(t){this.options.preventDefault&&t.preventDefault(),this._inProgress||(this._inProgress=!0,this._position=void 0===this.options.direction?[0,0]:0,g=this._payload,g.slip=!0,g.position=this._position,g.clientX=t.clientX,g.clientY=t.clientY,g.offsetX=t.offsetX,g.offsetY=t.offsetY,this._eventOutput.emit("start",g),this._loopBound||(r.on("prerender",n.bind(this)),this._loopBound=!0));var i=c(),o=this._prevTime||i,s=void 0!==t.wheelDeltaX?t.wheelDeltaX:-t.deltaX,a=void 0!==t.wheelDeltaY?t.wheelDeltaY:-t.deltaY;1===t.deltaMode&&(s*=this.options.lineHeight,a*=this.options.lineHeight),this.options.rails&&(Math.abs(s)>Math.abs(a)?a=0:s=0);var p,u,l=Math.max(i-o,h),f=s/l,d=a/l,_=this.options.scale;this.options.direction===e.DIRECTION_X?(u=_*s,p=_*f,this._position+=u):this.options.direction===e.DIRECTION_Y?(u=_*a,p=_*d,this._position+=u):(u=[_*s,_*a],p=[_*f,_*d],this._position[0]+=u[0],this._position[1]+=u[1]);var g=this._payload;g.delta=u,g.velocity=p,g.position=this._position,g.slip=!0,this._eventOutput.emit("update",g),this._prevTime=i,this._prevVel=p}var s=t("../core/EventHandler"),r=t("../core/Engine"),a=t("../core/OptionsManager");e.DEFAULT_OPTIONS={direction:void 0,minimumEndSpeed:1/0,rails:!1,scale:1,stallTime:50,lineHeight:40,preventDefault:!0},e.DIRECTION_X=0,e.DIRECTION_Y=1;var h=8,c=Date.now;e.prototype.getOptions=function(){return this.options},e.prototype.setOptions=function(t){return this._optionsManager.setOptions(t)},i.exports=e},{"../core/Engine":4,"../core/EventHandler":7,"../core/OptionsManager":10}],33:[function(t,i){function e(t){this.options=Object.create(e.DEFAULT_OPTIONS),this._optionsManager=new h(this.options),t&&this.setOptions(t),this._eventOutput=new a,this._touchTracker=new r({touchLimit:this.options.touchLimit}),a.setOutputHandler(this,this._eventOutput),a.setInputHandler(this,this._touchTracker),this._touchTracker.on("trackstart",n.bind(this)),this._touchTracker.on("trackmove",o.bind(this)),this._touchTracker.on("trackend",s.bind(this)),this._payload={delta:null,position:null,velocity:null,clientX:void 0,clientY:void 0,count:0,touch:void 0},this._position=null}function n(t){var i,e;void 0!==this.options.direction?(this._position=0,i=0,e=0):(this._position=[0,0],i=[0,0],e=[0,0]);var n=this._payload;n.delta=e,n.position=this._position,n.velocity=i,n.clientX=t.x,n.clientY=t.y,n.count=t.count,n.touch=t.identifier,this._eventOutput.emit("start",n)}function o(t){var i=t.history,n=i[i.length-1],o=i[i.length-2],s=i[i.length-this.options.velocitySampleLength]?i[i.length-this.options.velocitySampleLength]:i[i.length-2],r=s.timestamp,a=n.timestamp,h=n.x-o.x,p=n.y-o.y,u=n.x-s.x,l=n.y-s.y;this.options.rails&&(Math.abs(h)>Math.abs(p)?p=0:h=0,Math.abs(u)>Math.abs(l)?l=0:u=0);var f,d,_=Math.max(a-r,c),g=u/_,y=l/_,v=this.options.scale;this.options.direction===e.DIRECTION_X?(d=v*h,f=v*g,this._position+=d):this.options.direction===e.DIRECTION_Y?(d=v*p,f=v*y,this._position+=d):(d=[v*h,v*p],f=[v*g,v*y],this._position[0]+=d[0],this._position[1]+=d[1]);var m=this._payload;m.delta=d,m.velocity=f,m.position=this._position,m.clientX=t.x,m.clientY=t.y,m.count=t.count,m.touch=t.identifier,this._eventOutput.emit("update",m)}function s(t){this._payload.count=t.count,this._eventOutput.emit("end",this._payload)}var r=t("./TouchTracker"),a=t("../core/EventHandler"),h=t("../core/OptionsManager");e.DEFAULT_OPTIONS={direction:void 0,rails:!1,touchLimit:1,velocitySampleLength:10,scale:1},e.DIRECTION_X=0,e.DIRECTION_Y=1;var c=8;e.prototype.setOptions=function(t){return this._optionsManager.setOptions(t)},e.prototype.getOptions=function(){return this.options},i.exports=e},{"../core/EventHandler":7,"../core/OptionsManager":10,"./TouchTracker":34}],34:[function(t,i){function e(t,i,e){return{x:t.clientX,y:t.clientY,identifier:t.identifier,origin:i.origin,timestamp:c(),count:i.touches.length,history:e}}function n(t){if(!(t.touches.length>this.touchLimit)){this.isTouched=!0;for(var i=0;i<t.changedTouches.length;i++){var n=t.changedTouches[i],o=e(n,t,null);this.eventOutput.emit("trackstart",o),this.selective||this.touchHistory[n.identifier]||this.track(o)}}}function o(t){if(!(t.touches.length>this.touchLimit))for(var i=0;i<t.changedTouches.length;i++){var n=t.changedTouches[i],o=this.touchHistory[n.identifier];if(o){var s=e(n,t,o);this.touchHistory[n.identifier].push(s),this.eventOutput.emit("trackmove",s)}}}function s(t){if(this.isTouched){for(var i=0;i<t.changedTouches.length;i++){var n=t.changedTouches[i],o=this.touchHistory[n.identifier];if(o){var s=e(n,t,o);this.eventOutput.emit("trackend",s),delete this.touchHistory[n.identifier]}}this.isTouched=!1}}function r(){for(var t in this.touchHistory){var i=this.touchHistory[t];this.eventOutput.emit("trackend",{touch:i[i.length-1].touch,timestamp:Date.now(),count:0,history:i}),delete this.touchHistory[t]}}function a(t){this.selective=t.selective,this.touchLimit=t.touchLimit||1,this.touchHistory={},this.eventInput=new h,this.eventOutput=new h,h.setInputHandler(this,this.eventInput),h.setOutputHandler(this,this.eventOutput),this.eventInput.on("touchstart",n.bind(this)),this.eventInput.on("touchmove",o.bind(this)),this.eventInput.on("touchend",s.bind(this)),this.eventInput.on("touchcancel",s.bind(this)),this.eventInput.on("unpipe",r.bind(this)),this.isTouched=!1}var h=t("../core/EventHandler"),c=Date.now;a.prototype.track=function(t){this.touchHistory[t.identifier]=[t]},i.exports=a},{"../core/EventHandler":7}],35:[function(t,i){function e(){this._eventInput=new n,this._eventOutput=new n,n.setInputHandler(this,this._eventInput),n.setOutputHandler(this,this._eventOutput),this.touchAEnabled=!1,this.touchAId=0,this.posA=null,this.timestampA=0,this.touchBEnabled=!1,this.touchBId=0,this.posB=null,this.timestampB=0,this._eventInput.on("touchstart",this.handleStart.bind(this)),this._eventInput.on("touchmove",this.handleMove.bind(this)),this._eventInput.on("touchend",this.handleEnd.bind(this)),this._eventInput.on("touchcancel",this.handleEnd.bind(this))}var n=t("../core/EventHandler");e.calculateAngle=function(t,i){var e=i[0]-t[0],n=i[1]-t[1];return Math.atan2(n,e)},e.calculateDistance=function(t,i){var e=i[0]-t[0],n=i[1]-t[1];return Math.sqrt(e*e+n*n)},e.calculateCenter=function(t,i){return[(t[0]+i[0])/2,(t[1]+i[1])/2]};var o=Date.now;e.prototype.handleStart=function(t){for(var i=0;i<t.changedTouches.length;i++){var e=t.changedTouches[i];this.touchAEnabled?this.touchBEnabled||(this.touchBId=e.identifier,this.touchBEnabled=!0,this.posB=[e.pageX,e.pageY],this.timestampB=o(),this._startUpdate(t)):(this.touchAId=e.identifier,this.touchAEnabled=!0,this.posA=[e.pageX,e.pageY],this.timestampA=o())}},e.prototype.handleMove=function(t){if(this.touchAEnabled&&this.touchBEnabled){for(var i,e=this.timestampA,n=this.timestampB,s=0;s<t.changedTouches.length;s++){var r=t.changedTouches[s];r.identifier===this.touchAId?(this.posA=[r.pageX,r.pageY],this.timestampA=o(),i=this.timestampA-e):r.identifier===this.touchBId&&(this.posB=[r.pageX,r.pageY],this.timestampB=o(),i=this.timestampB-n)}i&&this._moveUpdate(i)}},e.prototype.handleEnd=function(t){for(var i=0;i<t.changedTouches.length;i++){var e=t.changedTouches[i];(e.identifier===this.touchAId||e.identifier===this.touchBId)&&(this.touchAEnabled&&this.touchBEnabled&&this._eventOutput.emit("end",{touches:[this.touchAId,this.touchBId],angle:this._angle}),this.touchAEnabled=!1,this.touchAId=0,this.touchBEnabled=!1,this.touchBId=0)}},i.exports=e},{"../core/EventHandler":7}],36:[function(t,i){i.exports={Accumulator:t("./Accumulator"),DesktopEmulationMode:t("./DesktopEmulationMode"),FastClick:t("./FastClick"),GenericSync:t("./GenericSync"),MouseSync:t("./MouseSync"),PinchSync:t("./PinchSync"),RotateSync:t("./RotateSync"),ScaleSync:t("./ScaleSync"),ScrollSync:t("./ScrollSync"),TouchSync:t("./TouchSync"),TouchTracker:t("./TouchTracker"),TwoFingerSync:t("./TwoFingerSync")}
},{"./Accumulator":24,"./DesktopEmulationMode":25,"./FastClick":26,"./GenericSync":27,"./MouseSync":28,"./PinchSync":29,"./RotateSync":30,"./ScaleSync":31,"./ScrollSync":32,"./TouchSync":33,"./TouchTracker":34,"./TwoFingerSync":35}],37:[function(t,i){function e(t){return this.values=t||[[1,0,0],[0,1,0],[0,0,1]],this}var n=t("./Vector"),o=new e,s=new n;e.prototype.get=function(){return this.values},e.prototype.set=function(t){this.values=t},e.prototype.vectorMultiply=function(t){var i=this.get(),e=t.x,n=t.y,o=t.z,r=i[0],a=i[1],h=i[2],c=r[0],p=r[1],u=r[2],l=a[0],f=a[1],d=a[2],_=h[0],g=h[1],y=h[2];return s.setXYZ(c*e+p*n+u*o,l*e+f*n+d*o,_*e+g*n+y*o)},e.prototype.multiply=function(t){for(var i=this.get(),e=[[]],n=0;3>n;n++){e[n]=[];for(var s=0;3>s;s++){for(var r=0,a=0;3>a;a++)r+=i[n][a]*t[a][s];e[n][s]=r}}return o.set(e)},e.prototype.transpose=function(){for(var t=[[],[],[]],i=this.get(),e=0;3>e;e++)for(var n=0;3>n;n++)t[e][n]=i[n][e];return o.set(t)},e.prototype.clone=function(){for(var t=this.get(),i=[],n=0;3>n;n++)i[n]=t[n].slice();return new e(i)},i.exports=e},{"./Vector":41}],38:[function(t,i){function e(t,i,e,n){return 1===arguments.length?this.set(t):(this.w=void 0!==t?t:1,this.x=void 0!==i?i:0,this.y=void 0!==e?e:0,this.z=void 0!==n?n:0),this}var n=t("./Matrix"),o=new e(1,0,0,0);e.prototype.add=function(t){return o.setWXYZ(this.w+t.w,this.x+t.x,this.y+t.y,this.z+t.z)},e.prototype.sub=function(t){return o.setWXYZ(this.w-t.w,this.x-t.x,this.y-t.y,this.z-t.z)},e.prototype.scalarDivide=function(t){return this.scalarMultiply(1/t)},e.prototype.scalarMultiply=function(t){return o.setWXYZ(this.w*t,this.x*t,this.y*t,this.z*t)},e.prototype.multiply=function(t){var i=this.x,e=this.y,n=this.z,s=this.w,r=t.x,a=t.y,h=t.z,c=t.w||0;return o.setWXYZ(s*c-i*r-e*a-n*h,i*c+r*s+a*n-e*h,e*c+a*s+i*h-r*n,n*c+h*s+r*e-i*a)};var s=new e(1,0,0,0);e.prototype.rotateVector=function(t){return s.set(this.conj()),o.set(this.multiply(t).multiply(s))},e.prototype.inverse=function(){return o.set(this.conj().scalarDivide(this.normSquared()))},e.prototype.negate=function(){return this.scalarMultiply(-1)},e.prototype.conj=function(){return o.setWXYZ(this.w,-this.x,-this.y,-this.z)},e.prototype.normalize=function(t){return t=void 0===t?1:t,this.scalarDivide(t*this.norm())},e.prototype.makeFromAngleAndAxis=function(t,i){var e=i.normalize(),n=.5*t,o=-Math.sin(n);return this.x=o*e.x,this.y=o*e.y,this.z=o*e.z,this.w=Math.cos(n),this},e.prototype.setWXYZ=function(t,i,e,n){return o.clear(),this.w=t,this.x=i,this.y=e,this.z=n,this},e.prototype.set=function(t){return t instanceof Array?(this.w=0,this.x=t[0],this.y=t[1],this.z=t[2]):(this.w=t.w,this.x=t.x,this.y=t.y,this.z=t.z),this!==o&&o.clear(),this},e.prototype.put=function(t){t.set(o)},e.prototype.clone=function(){return new e(this)},e.prototype.clear=function(){return this.w=1,this.x=0,this.y=0,this.z=0,this},e.prototype.isEqual=function(t){return t.w===this.w&&t.x===this.x&&t.y===this.y&&t.z===this.z},e.prototype.dot=function(t){return this.w*t.w+this.x*t.x+this.y*t.y+this.z*t.z},e.prototype.normSquared=function(){return this.dot(this)},e.prototype.norm=function(){return Math.sqrt(this.normSquared())},e.prototype.isZero=function(){return!(this.x||this.y||this.z)},e.prototype.getTransform=function(){var t=this.normalize(1),i=t.x,e=t.y,n=t.z,o=t.w;return[1-2*e*e-2*n*n,2*i*e-2*n*o,2*i*n+2*e*o,0,2*i*e+2*n*o,1-2*i*i-2*n*n,2*e*n-2*i*o,0,2*i*n-2*e*o,2*e*n+2*i*o,1-2*i*i-2*e*e,0,0,0,0,1]};var r=new n;e.prototype.getMatrix=function(){var t=this.normalize(1),i=t.x,e=t.y,n=t.z,o=t.w;return r.set([[1-2*e*e-2*n*n,2*i*e+2*n*o,2*i*n-2*e*o],[2*i*e-2*n*o,1-2*i*i-2*n*n,2*e*n+2*i*o],[2*i*n+2*e*o,2*e*n-2*i*o,1-2*i*i-2*e*e]])};var a=1e-5;e.prototype.slerp=function(t,i){var e,n,s,r,h;return n=this.dot(t),1-n>a?(e=Math.acos(n),s=Math.sin(e),r=Math.sin((1-i)*e)/s,h=Math.sin(i*e)/s):(r=1-i,h=i),o.set(this.scalarMultiply(r/h).add(t).scalarMultiply(h))},i.exports=e},{"./Matrix":37}],39:[function(t,i){function e(t,i){return t+s()*(i-t)}function n(t,i){return t+(s()*(i-t+1)>>0)}function o(t,i,e,n){if(i=void 0!==i?i:0,e=void 0!==e?e:1,void 0!==n){for(var o=[],s=0;n>s;s++)o.push(t(i,e));return o}return t(i,e)}var s=Math.random,r={};r.integer=function(t,i,e){return o(n,t,i,e)},r.range=function(t,i,n){return o(e,t,i,n)},r.sign=function(t){return r.bool(t)?1:-1},r.bool=function(t){return t=void 0!==t?t:.5,s()<t},i.exports=r},{}],40:[function(t,i){var e={};e.clamp=function(t,i){return Math.max(Math.min(t,i[1]),i[0])},e.length=function(t){for(var i=0,e=0;e<t.length;e++)i+=t[e]*t[e];return Math.sqrt(i)},i.exports=e},{}],41:[function(t,i){function e(t,i,e){return 1===arguments.length&&void 0!==t?this.set(t):(this.x=t||0,this.y=i||0,this.z=e||0),this}function n(t,i,e){return this.x=t,this.y=i,this.z=e,this}function o(t){return n.call(this,t[0],t[1],t[2]||0)}function s(t){return n.call(this,t.x,t.y,t.z)}function r(t){return n.call(this,t,0,0)}var a=new e(0,0,0);e.prototype.add=function(t){return n.call(a,this.x+t.x,this.y+t.y,this.z+t.z)},e.prototype.sub=function(t){return n.call(a,this.x-t.x,this.y-t.y,this.z-t.z)},e.prototype.mult=function(t){return n.call(a,t*this.x,t*this.y,t*this.z)},e.prototype.div=function(t){return this.mult(1/t)},e.prototype.cross=function(t){var i=this.x,e=this.y,o=this.z,s=t.x,r=t.y,h=t.z;return n.call(a,o*r-e*h,i*h-o*s,e*s-i*r)},e.prototype.equals=function(t){return t.x===this.x&&t.y===this.y&&t.z===this.z},e.prototype.rotateX=function(t){var i=this.x,e=this.y,o=this.z,s=Math.cos(t),r=Math.sin(t);return n.call(a,i,e*s-o*r,e*r+o*s)},e.prototype.rotateY=function(t){var i=this.x,e=this.y,o=this.z,s=Math.cos(t),r=Math.sin(t);return n.call(a,o*r+i*s,e,o*s-i*r)},e.prototype.rotateZ=function(t){var i=this.x,e=this.y,o=this.z,s=Math.cos(t),r=Math.sin(t);return n.call(a,i*s-e*r,i*r+e*s,o)},e.prototype.dot=function(t){return this.x*t.x+this.y*t.y+this.z*t.z},e.prototype.normSquared=function(){return this.dot(this)},e.prototype.norm=function(){return Math.sqrt(this.normSquared())},e.prototype.normalize=function(t){0===arguments.length&&(t=1);var i=this.norm();return i>1e-7?s.call(a,this.mult(t/i)):n.call(a,t,0,0)},e.prototype.clone=function(){return new e(this)},e.prototype.isZero=function(){return!(this.x||this.y||this.z)},e.prototype.set=function(t){return t instanceof Array?o.call(this,t):"number"==typeof t?r.call(this,t):s.call(this,t)},e.prototype.setXYZ=function(){return n.apply(this,arguments)},e.prototype.set1D=function(t){return r.call(this,t)},e.prototype.put=function(t){this===a?s.call(t,a):s.call(t,this)},e.prototype.clear=function(){return n.call(this,0,0,0)},e.prototype.cap=function h(h){if(1/0===h)return s.call(a,this);var t=this.norm();return t>h?s.call(a,this.mult(h/t)):s.call(a,this)},e.prototype.project=function(t){return t.mult(this.dot(t))},e.prototype.reflectAcross=function(t){return t.normalize().put(t),s(a,this.sub(this.project(t).mult(2)))},e.prototype.get=function(){return[this.x,this.y,this.z]},e.prototype.get1D=function(){return this.x},i.exports=e},{}],42:[function(t,i){i.exports={Matrix:t("./Matrix"),Quaternion:t("./Quaternion"),Random:t("./Random"),Utilities:t("./Utilities"),Vector:t("./Vector")}},{"./Matrix":37,"./Quaternion":38,"./Random":39,"./Utilities":40,"./Vector":41}],43:[function(t,i){function e(t){this.options=Object.create(e.DEFAULT_OPTIONS),t&&this.setOptions(t),this._positionState=new c([0,0]),this._differential=[0,0],this._active=!0,this.sync=new l(["mouse","touch"],{scale:this.options.scale}),this.eventOutput=new p,p.setInputHandler(this,this.sync),p.setOutputHandler(this,this.eventOutput),a.call(this)}function n(t){var i=this.options,e=i.projection,n=i.snapX,o=i.snapY,s=e&_.x?t[0]:0,r=e&_.y?t[1]:0;return n>0&&(s-=s%n),o>0&&(r-=r%o),[s,r]}function o(){this._active&&(this._positionState.isActive()&&this._positionState.halt(),this.eventOutput.emit("start",{position:this.getPosition()}))}function s(t){if(this._active){var i=this.options;this._differential=t.position;var e=n.call(this,this._differential);this._differential[0]-=e[0],this._differential[1]-=e[1];var o=this.getPosition();if(o[0]+=e[0],o[1]+=e[1],i.xRange){var s=[i.xRange[0]+.5*i.snapX,i.xRange[1]-.5*i.snapX];o[0]=g(o[0],s)}if(i.yRange){var r=[i.yRange[0]+.5*i.snapY,i.yRange[1]-.5*i.snapY];o[1]=g(o[1],r)}this.eventOutput.emit("update",{position:o})}}function r(){this._active&&this.eventOutput.emit("end",{position:this.getPosition()})}function a(){this.sync.on("start",o.bind(this)),this.sync.on("update",s.bind(this)),this.sync.on("end",r.bind(this))}var h=t("../core/Transform"),c=t("../transitions/Transitionable"),p=t("../core/EventHandler"),u=t("../math/Utilities"),l=t("../inputs/GenericSync"),f=t("../inputs/MouseSync"),d=t("../inputs/TouchSync");l.register({mouse:f,touch:d});var _={x:1,y:2};e.DIRECTION_X=_.x,e.DIRECTION_Y=_.y;var g=u.clamp;e.DEFAULT_OPTIONS={projection:_.x|_.y,scale:1,xRange:null,yRange:null,snapX:0,snapY:0,transition:{duration:0}},e.prototype.setOptions=function(t){var i=this.options;if(void 0!==t.projection){var e=t.projection;this.options.projection=0,["x","y"].forEach(function(t){-1!==e.indexOf(t)&&(i.projection|=_[t])})}void 0!==t.scale&&(i.scale=t.scale,this.sync.setOptions({scale:t.scale})),void 0!==t.xRange&&(i.xRange=t.xRange),void 0!==t.yRange&&(i.yRange=t.yRange),void 0!==t.snapX&&(i.snapX=t.snapX),void 0!==t.snapY&&(i.snapY=t.snapY)},e.prototype.getPosition=function(){return this._positionState.get()},e.prototype.setRelativePosition=function(t,i,e){var n=this.getPosition(),o=[n[0]+t[0],n[1]+t[1]];this.setPosition(o,i,e)},e.prototype.setPosition=function(t,i,e){this._positionState.isActive()&&this._positionState.halt(),this._positionState.set(t,i,e)},e.prototype.activate=function(){this._active=!0},e.prototype.deactivate=function(){this._active=!1},e.prototype.toggle=function(){this._active=!this._active},e.prototype.modify=function(t){var i=this.getPosition();return{transform:h.translate(i[0],i[1]),target:t}},i.exports=e},{"../core/EventHandler":7,"../core/Transform":15,"../inputs/GenericSync":27,"../inputs/MouseSync":28,"../inputs/TouchSync":33,"../math/Utilities":40,"../transitions/Transitionable":88}],44:[function(t,i){function e(t,i){this.options=Object.create(e.DEFAULT_OPTIONS),this._optionsManager=new o(this.options),t&&this.setOptions(t),i||(i=0),this.transitionHelper=new n(i)}var n=t("../transitions/Transitionable"),o=t("../core/OptionsManager");e.DEFAULT_OPTIONS={cull:!1,transition:!0,pulseInTransition:!0,pulseOutTransition:!0},e.prototype.setOptions=function(t){return this._optionsManager.setOptions(t)},e.prototype.show=function(t,i){t=t||this.options.transition,this.set(1,t,i)},e.prototype.hide=function(t,i){t=t||this.options.transition,this.set(0,t,i)},e.prototype.set=function(t,i,e){this.halt(),this.transitionHelper.set(t,i,e)},e.prototype.halt=function(){this.transitionHelper.halt()},e.prototype.isVisible=function(){return this.transitionHelper.get()>0},e.prototype.modify=function(t){var i=this.transitionHelper.get();return this.options.cull&&!i?void 0:{opacity:i,target:t}},i.exports=e},{"../core/OptionsManager":10,"../transitions/Transitionable":88}],45:[function(t,i){function e(){this._chain=[],arguments.length&&this.addModifier.apply(this,arguments)}e.prototype.addModifier=function(){Array.prototype.push.apply(this._chain,arguments)},e.prototype.removeModifier=function(t){var i=this._chain.indexOf(t);0>i||this._chain.splice(i,1)},e.prototype.modify=function(t){for(var i=this._chain,e=t,n=0;n<i.length;n++)e=i[n].modify(e);return e},i.exports=e},{}],46:[function(t,i){function e(t){this._transformState=new r(o.identity),this._opacityState=new s(1),this._originState=new s([0,0]),this._alignState=new s([0,0]),this._sizeState=new s([0,0]),this._proportionsState=new s([0,0]),this._modifier=new n({transform:this._transformState,opacity:this._opacityState,origin:null,align:null,size:null,proportions:null}),this._hasOrigin=!1,this._hasAlign=!1,this._hasSize=!1,this._hasProportions=!1,t&&(t.transform&&this.setTransform(t.transform),void 0!==t.opacity&&this.setOpacity(t.opacity),t.origin&&this.setOrigin(t.origin),t.align&&this.setAlign(t.align),t.size&&this.setSize(t.size),t.proportions&&this.setProportions(t.proportions))}var n=t("../core/Modifier"),o=t("../core/Transform"),s=t("../transitions/Transitionable"),r=t("../transitions/TransitionableTransform");e.prototype.setTransform=function(t,i,e){return this._transformState.set(t,i,e),this},e.prototype.setOpacity=function(t,i,e){return this._opacityState.set(t,i,e),this},e.prototype.setOrigin=function(t,i,e){return null===t?(this._hasOrigin&&(this._modifier.originFrom(null),this._hasOrigin=!1),this):(this._hasOrigin||(this._hasOrigin=!0,this._modifier.originFrom(this._originState)),this._originState.set(t,i,e),this)},e.prototype.setAlign=function(t,i,e){return null===t?(this._hasAlign&&(this._modifier.alignFrom(null),this._hasAlign=!1),this):(this._hasAlign||(this._hasAlign=!0,this._modifier.alignFrom(this._alignState)),this._alignState.set(t,i,e),this)},e.prototype.setSize=function(t,i,e){return null===t?(this._hasSize&&(this._modifier.sizeFrom(null),this._hasSize=!1),this):(this._hasSize||(this._hasSize=!0,this._modifier.sizeFrom(this._sizeState)),this._sizeState.set(t,i,e),this)},e.prototype.setProportions=function(t,i,e){return null===t?(this._hasProportions&&(this._modifier.proportionsFrom(null),this._hasProportions=!1),this):(this._hasProportions||(this._hasProportions=!0,this._modifier.proportionsFrom(this._proportionsState)),this._proportionsState.set(t,i,e),this)},e.prototype.halt=function(){this._transformState.halt(),this._opacityState.halt(),this._originState.halt(),this._alignState.halt(),this._sizeState.halt(),this._proportionsState.halt()},e.prototype.getTransform=function(){return this._transformState.get()},e.prototype.getFinalTransform=function(){return this._transformState.getFinal()},e.prototype.getOpacity=function(){return this._opacityState.get()},e.prototype.getOrigin=function(){return this._hasOrigin?this._originState.get():null},e.prototype.getAlign=function(){return this._hasAlign?this._alignState.get():null},e.prototype.getSize=function(){return this._hasSize?this._sizeState.get():null},e.prototype.getProportions=function(){return this._hasProportions?this._proportionsState.get():null},e.prototype.modify=function(t){return this._modifier.modify(t)},i.exports=e},{"../core/Modifier":9,"../core/Transform":15,"../transitions/Transitionable":88,"../transitions/TransitionableTransform":89}],47:[function(t,i){i.exports={Draggable:t("./Draggable"),Fader:t("./Fader"),ModifierChain:t("./ModifierChain"),StateModifier:t("./StateModifier")}},{"./Draggable":43,"./Fader":44,"./ModifierChain":45,"./StateModifier":46}],48:[function(t,i){function e(t){this.options=Object.create(e.DEFAULT_OPTIONS),t&&this.setOptions(t),this._particles=[],this._bodies=[],this._agentData={},this._forces=[],this._constraints=[],this._buffer=0,this._prevTime=S(),this._isSleeping=!1,this._eventHandler=null,this._currAgentId=0,this._hasBodies=!1,this._eventHandler=null}function n(t){return t.applyForce?this._forces:t.applyConstraint?this._constraints:void 0}function o(t,i,e){return void 0===i&&(i=this.getParticlesAndBodies()),i instanceof Array||(i=[i]),t.on("change",this.wake.bind(this)),this._agentData[this._currAgentId]={agent:t,id:this._currAgentId,targets:i,source:e},n.call(this,t).push(this._currAgentId),this._currAgentId++}function s(t){return this._agentData[t]}function r(t){var i=s.call(this,this._forces[t]);i.agent.applyForce(i.targets,i.source)}function a(){for(var t=this._forces.length-1;t>-1;t--)r.call(this,t)}function h(t,i){var e=this._agentData[this._constraints[t]];return e.agent.applyConstraint(e.targets,e.source,i)}function c(t){for(var i=0;i<this.options.constraintSteps;){for(var e=this._constraints.length-1;e>-1;e--)h.call(this,e,t);i++}}function p(t,i){t.integrateVelocity(i),this.options.velocityCap&&t.velocity.cap(this.options.velocityCap).put(t.velocity)}function u(t,i){t.integrateAngularMomentum(i),t.updateAngularVelocity(),this.options.angularVelocityCap&&t.angularVelocity.cap(this.options.angularVelocityCap).put(t.angularVelocity)}function l(t,i){t.integrateOrientation(i)}function f(t,i){t.integratePosition(i),t.emit(T.update,t)}function d(t){a.call(this,t),this.forEach(p,t),this.forEachBody(u,t),c.call(this,t),this.forEachBody(l,t),this.forEach(f,t)}function _(){var t=0,i=0;return this.forEach(function(e){i=e.getEnergy(),t+=i}),t}function g(){var t=0;for(var i in this._agentData)t+=this.getAgentEnergy(i);return t}var y=t("../core/EventHandler"),v=17,m=1e3/120,O=17,S=Date.now,T={start:"start",update:"update",end:"end"};e.DEFAULT_OPTIONS={constraintSteps:1,sleepTolerance:1e-7,velocityCap:void 0,angularVelocityCap:void 0},e.prototype.setOptions=function(t){for(var i in t)this.options[i]&&(this.options[i]=t[i])},e.prototype.addBody=function(t){return t._engine=this,t.isBody?(this._bodies.push(t),this._hasBodies=!0):this._particles.push(t),t.on("start",this.wake.bind(this)),t},e.prototype.removeBody=function(t){var i=t.isBody?this._bodies:this._particles,e=i.indexOf(t);if(e>-1){for(var n in this._agentData)this._agentData.hasOwnProperty(n)&&this.detachFrom(this._agentData[n].id,t);i.splice(e,1)}0===this.getBodies().length&&(this._hasBodies=!1)},e.prototype.attach=function(t,i,e){if(this.wake(),t instanceof Array){for(var n=[],s=0;s<t.length;s++)n[s]=o.call(this,t[s],i,e);return n}return o.call(this,t,i,e)},e.prototype.attachTo=function(t,i){s.call(this,t).targets.push(i)},e.prototype.detach=function(t){var i=this.getAgent(t),e=n.call(this,i),o=e.indexOf(t);e.splice(o,1),delete this._agentData[t]},e.prototype.detachFrom=function(t,i){var e=s.call(this,t);if(e.source===i)this.detach(t);else{var n=e.targets,o=n.indexOf(i);o>-1&&n.splice(o,1)}},e.prototype.detachAll=function(){this._agentData={},this._forces=[],this._constraints=[],this._currAgentId=0},e.prototype.getAgent=function(t){return s.call(this,t).agent},e.prototype.getParticles=function(){return this._particles},e.prototype.getBodies=function(){return this._bodies},e.prototype.getParticlesAndBodies=function(){return this.getParticles().concat(this.getBodies())},e.prototype.forEachParticle=function(t,i){for(var e=this.getParticles(),n=0,o=e.length;o>n;n++)t.call(this,e[n],i)},e.prototype.forEachBody=function(t,i){if(this._hasBodies)for(var e=this.getBodies(),n=0,o=e.length;o>n;n++)t.call(this,e[n],i)},e.prototype.forEach=function(t,i){this.forEachParticle(t,i),this.forEachBody(t,i)},e.prototype.getAgentEnergy=function(t){var i=s.call(this,t);return i.agent.getEnergy(i.targets,i.source)},e.prototype.getEnergy=function(){return _.call(this)+g.call(this)},e.prototype.step=function(){if(!this.isSleeping()){var t=S(),i=t-this._prevTime;this._prevTime=t,m>i||(i>O&&(i=O),d.call(this,v),this.emit(T.update,this),this.getEnergy()<this.options.sleepTolerance&&this.sleep())}},e.prototype.isSleeping=function(){return this._isSleeping},e.prototype.isActive=function(){return!this._isSleeping},e.prototype.sleep=function(){this._isSleeping||(this.forEach(function(t){t.sleep()}),this.emit(T.end,this),this._isSleeping=!0)},e.prototype.wake=function(){this._isSleeping&&(this._prevTime=S(),this.emit(T.start,this),this._isSleeping=!1)},e.prototype.emit=function(t,i){null!==this._eventHandler&&this._eventHandler.emit(t,i)},e.prototype.on=function(t,i){null===this._eventHandler&&(this._eventHandler=new y),this._eventHandler.on(t,i)},i.exports=e},{"../core/EventHandler":7}],49:[function(t,i){function e(t){n.call(this,t),t=t||{},this.orientation=new r,this.angularVelocity=new s,this.angularMomentum=new s,this.torque=new s,t.orientation&&this.orientation.set(t.orientation),t.angularVelocity&&this.angularVelocity.set(t.angularVelocity),t.angularMomentum&&this.angularMomentum.set(t.angularMomentum),t.torque&&this.torque.set(t.torque),this.angularVelocity.w=0,this.setMomentsOfInertia(),this.pWorld=new s}var n=t("./Particle"),o=t("../../core/Transform"),s=t("../../math/Vector"),r=t("../../math/Quaternion"),a=t("../../math/Matrix"),h=t("../integrators/SymplecticEuler");e.DEFAULT_OPTIONS=n.DEFAULT_OPTIONS,e.DEFAULT_OPTIONS.orientation=[0,0,0,1],e.DEFAULT_OPTIONS.angularVelocity=[0,0,0],e.prototype=Object.create(n.prototype),e.prototype.constructor=e,e.prototype.isBody=!0,e.prototype.setMass=function(){n.prototype.setMass.apply(this,arguments),this.setMomentsOfInertia()},e.prototype.setMomentsOfInertia=function(){this.inertia=new a,this.inverseInertia=new a},e.prototype.updateAngularVelocity=function(){this.angularVelocity.set(this.inverseInertia.vectorMultiply(this.angularMomentum))},e.prototype.toWorldCoordinates=function(t){return this.pWorld.set(this.orientation.rotateVector(t))},e.prototype.getEnergy=function(){return n.prototype.getEnergy.call(this)+.5*this.inertia.vectorMultiply(this.angularVelocity).dot(this.angularVelocity)},e.prototype.reset=function(t,i,e,o){n.prototype.reset.call(this,t,i),this.angularVelocity.clear(),this.setOrientation(e||[1,0,0,0]),this.setAngularMomentum(o||[0,0,0])},e.prototype.setOrientation=function(t){this.orientation.set(t)},e.prototype.setAngularVelocity=function(t){this.wake(),this.angularVelocity.set(t)},e.prototype.setAngularMomentum=function(t){this.wake(),this.angularMomentum.set(t)},e.prototype.applyForce=function(t,i){n.prototype.applyForce.call(this,t),void 0!==i&&this.applyTorque(i.cross(t))},e.prototype.applyTorque=function(t){this.wake(),this.torque.set(this.torque.add(t))},e.prototype.getTransform=function(){return o.thenMove(this.orientation.getTransform(),o.getTranslate(n.prototype.getTransform.call(this)))},e.prototype._integrate=function(t){n.prototype._integrate.call(this,t),this.integrateAngularMomentum(t),this.updateAngularVelocity(t),this.integrateOrientation(t)},e.prototype.integrateAngularMomentum=function(t){h.integrateAngularMomentum(this,t)},e.prototype.integrateOrientation=function(t){h.integrateOrientation(this,t)},i.exports=e},{"../../core/Transform":15,"../../math/Matrix":37,"../../math/Quaternion":38,"../../math/Vector":41,"../integrators/SymplecticEuler":72,"./Particle":51}],50:[function(t,i){function e(t){t=t||{},this.setRadius(t.radius||0),n.call(this,t)}var n=t("./Body"),o=t("../../math/Matrix");e.prototype=Object.create(n.prototype),e.prototype.constructor=e,e.prototype.setRadius=function(t){this.radius=t,this.size=[2*this.radius,2*this.radius],this.setMomentsOfInertia()},e.prototype.setMomentsOfInertia=function(){var t=this.mass,i=this.radius;this.inertia=new o([[.25*t*i*i,0,0],[0,.25*t*i*i,0],[0,0,.5*t*i*i]]),this.inverseInertia=new o([[4/(t*i*i),0,0],[0,4/(t*i*i),0],[0,0,2/(t*i*i)]])},i.exports=e},{"../../math/Matrix":37,"./Body":49}],51:[function(t,i){function e(t){t=t||{};var i=e.DEFAULT_OPTIONS;this.position=new o,this.velocity=new o,this.force=new o,this._engine=null,this._isSleeping=!0,this._eventOutput=null,this.mass=void 0!==t.mass?t.mass:i.mass,this.inverseMass=1/this.mass,this.setPosition(t.position||i.position),this.setVelocity(t.velocity||i.velocity),this.force.set(t.force||[0,0,0]),this.transform=s.identity.slice(),this._spec={size:[!0,!0],target:{transform:this.transform,origin:[.5,.5],target:null}}}function n(){this._eventOutput=new r,this._eventOutput.bindThis(this),r.setOutputHandler(this,this._eventOutput)}var o=t("../../math/Vector"),s=t("../../core/Transform"),r=t("../../core/EventHandler"),a=t("../integrators/SymplecticEuler");e.DEFAULT_OPTIONS={position:[0,0,0],velocity:[0,0,0],mass:1};var h={start:"start",update:"update",end:"end"},c=Date.now;e.prototype.isBody=!1,e.prototype.isActive=function(){return!this._isSleeping},e.prototype.sleep=function(){this._isSleeping||(this.emit(h.end,this),this._isSleeping=!0)},e.prototype.wake=function(){this._isSleeping&&(this.emit(h.start,this),this._isSleeping=!1,this._prevTime=c(),this._engine&&this._engine.wake())},e.prototype.setPosition=function(t){this.position.set(t)},e.prototype.setPosition1D=function(t){this.position.x=t},e.prototype.getPosition=function(){return this._engine.step(),this.position.get()},e.prototype.getPosition1D=function(){return this._engine.step(),this.position.x},e.prototype.setVelocity=function(t){this.velocity.set(t),(0!==t[0]||0!==t[1]||0!==t[2])&&this.wake()},e.prototype.setVelocity1D=function(t){this.velocity.x=t,0!==t&&this.wake()},e.prototype.getVelocity=function(){return this.velocity.get()},e.prototype.setForce=function(t){this.force.set(t),this.wake()},e.prototype.getVelocity1D=function(){return this.velocity.x},e.prototype.setMass=function(t){this.mass=t,this.inverseMass=1/t},e.prototype.getMass=function(){return this.mass},e.prototype.reset=function(t,i){this.setPosition(t||[0,0,0]),this.setVelocity(i||[0,0,0])},e.prototype.applyForce=function(t){t.isZero()||(this.force.add(t).put(this.force),this.wake())},e.prototype.applyImpulse=function(t){if(!t.isZero()){var i=this.velocity;i.add(t.mult(this.inverseMass)).put(i)}},e.prototype.integrateVelocity=function(t){a.integrateVelocity(this,t)},e.prototype.integratePosition=function(t){a.integratePosition(this,t)},e.prototype._integrate=function(t){this.integrateVelocity(t),this.integratePosition(t)},e.prototype.getEnergy=function(){return.5*this.mass*this.velocity.normSquared()},e.prototype.getTransform=function(){this._engine.step();var t=this.position,i=this.transform;return i[12]=t.x,i[13]=t.y,i[14]=t.z,i},e.prototype.modify=function(t){var i=this._spec.target;return i.transform=this.getTransform(),i.target=t,this._spec},e.prototype.emit=function(t,i){this._eventOutput&&this._eventOutput.emit(t,i)},e.prototype.on=function(){return n.call(this),this.on.apply(this,arguments)},e.prototype.removeListener=function(){return n.call(this),this.removeListener.apply(this,arguments)},e.prototype.pipe=function(){return n.call(this),this.pipe.apply(this,arguments)},e.prototype.unpipe=function(){return n.call(this),this.unpipe.apply(this,arguments)},i.exports=e},{"../../core/EventHandler":7,"../../core/Transform":15,"../../math/Vector":41,"../integrators/SymplecticEuler":72}],52:[function(t,i){function e(t){t=t||{},this.size=t.size||[0,0],n.call(this,t)}var n=t("./Body"),o=t("../../math/Matrix");e.prototype=Object.create(n.prototype),e.prototype.constructor=e,e.prototype.setSize=function(t){this.size=t,this.setMomentsOfInertia()},e.prototype.setMomentsOfInertia=function(){var t=this.mass,i=this.size[0],e=this.size[1];this.inertia=new o([[t*e*e/12,0,0],[0,t*i*i/12,0],[0,0,t*(i*i+e*e)/12]]),this.inverseInertia=new o([[12/(t*e*e),0,0],[0,12/(t*i*i),0],[0,0,12/(t*(i*i+e*e))]])},i.exports=e},{"../../math/Matrix":37,"./Body":49}],53:[function(t,i){i.exports={Body:t("./Body"),Circle:t("./Circle"),Particle:t("./Particle"),Rectangle:t("./Rectangle")}},{"./Body":49,"./Circle":50,"./Particle":51,"./Rectangle":52}],54:[function(t,i){function e(t){this.options=Object.create(e.DEFAULT_OPTIONS),t&&this.setOptions(t),this.normal=new o,this.pDiff=new o,this.vDiff=new o,this.impulse1=new o,this.impulse2=new o,n.call(this)}var n=t("./Constraint"),o=t("../../math/Vector");e.prototype=Object.create(n.prototype),e.prototype.constructor=e,e.DEFAULT_OPTIONS={restitution:.5,drift:.5,slop:0},e.prototype.setOptions=function(t){for(var i in t)this.options[i]=t[i]},e.prototype.applyConstraint=function(t,i,e){if(void 0!==i)for(var n=i.velocity,o=i.position,s=i.inverseMass,r=i.radius,a=this.options,h=a.drift,c=-a.slop,p=a.restitution,u=this.normal,l=this.pDiff,f=this.vDiff,d=this.impulse1,_=this.impulse2,g=0;g<t.length;g++){var y=t[g];if(y!==i){var v=y.velocity,m=y.position,O=y.inverseMass,S=y.radius;l.set(m.sub(o)),f.set(v.sub(n));var T=l.norm(),w=T-(r+S),b=1/(s+O),E=0;if(0>w){if(u.set(l.normalize()),this._eventOutput){var z={target:y,source:i,overlap:w,normal:u};this._eventOutput.emit("preCollision",z),this._eventOutput.emit("collision",z)}var I=c>=w?((1+p)*u.dot(f)+h/e*(w-c))/(E+e/b):(1+p)*u.dot(f)/(E+e/b);u.mult(e*I).put(d),d.mult(-1).put(_),i.applyImpulse(d),y.applyImpulse(_),this._eventOutput&&this._eventOutput.emit("postCollision",z)}}}},i.exports=e},{"../../math/Vector":41,"./Constraint":55}],55:[function(t,i){function e(){this.options=this.options||{},this._eventOutput=new n,n.setOutputHandler(this,this._eventOutput)}var n=t("../../core/EventHandler");e.prototype.setOptions=function(t){this._eventOutput.emit("change",t)},e.prototype.applyConstraint=function(){},e.prototype.getEnergy=function(){return 0},i.exports=e},{"../../core/EventHandler":7}],56:[function(t,i){function e(t){this.options=Object.create(e.DEFAULT_OPTIONS),t&&this.setOptions(t),this.J=new o,this.impulse=new o,n.call(this)}var n=t("./Constraint"),o=t("../../math/Vector");e.prototype=Object.create(n.prototype),e.prototype.constructor=e;var s=1e-7,r=Math.PI;e.DEFAULT_OPTIONS={equation:function(){return 0},plane:function(t,i,e){return e},period:0,dampingRatio:0},e.prototype.setOptions=function(t){for(var i in t)this.options[i]=t[i]},e.prototype.applyConstraint=function(t,i,e){for(var n=this.options,o=this.impulse,a=this.J,h=n.equation,c=n.plane,p=n.dampingRatio,u=n.period,l=0;l<t.length;l++){var f,d,_=t[l],g=_.velocity,y=_.position,v=_.mass;if(0===u)f=0,d=1;else{var m=4*v*r*p/u,O=4*v*r*r/(u*u);f=1/(m+e*O),d=e*O/(m+e*O)}var S=y.x,T=y.y,w=y.z,b=h(S,T,w),E=(h(S+s,T,w)-b)/s,z=(h(S,T+s,w)-b)/s,I=(h(S,T,w+s)-b)/s,M=c(S,T,w),x=(c(S+s,T,w)-M)/s,C=(c(S,T+s,w)-M)/s,P=(c(S,T,w+s)-M)/s;a.setXYZ(E+x,z+C,I+P);var F=d/e*(b+M),D=-(a.dot(g)+F)/(f+e*a.normSquared()/v);o.set(a.mult(e*D)),_.applyImpulse(o)}},i.exports=e},{"../../math/Vector":41,"./Constraint":55}],57:[function(t,i){function e(t){this.options=Object.create(this.constructor.DEFAULT_OPTIONS),t&&this.setOptions(t),this.impulse=new o,this.normal=new o,this.diffP=new o,this.diffV=new o,n.call(this)}var n=t("./Constraint"),o=t("../../math/Vector");e.prototype=Object.create(n.prototype),e.prototype.constructor=e,e.DEFAULT_OPTIONS={anchor:null,length:0,minLength:0,period:0,dampingRatio:0};var s=Math.PI;e.prototype.setOptions=function(t){t.anchor&&(t.anchor.position instanceof o&&(this.options.anchor=t.anchor.position),t.anchor instanceof o&&(this.options.anchor=t.anchor),t.anchor instanceof Array&&(this.options.anchor=new o(t.anchor))),void 0!==t.length&&(this.options.length=t.length),void 0!==t.dampingRatio&&(this.options.dampingRatio=t.dampingRatio),void 0!==t.period&&(this.options.period=t.period),void 0!==t.minLength&&(this.options.minLength=t.minLength)},e.prototype.setAnchor=function(t){this.options.anchor||(this.options.anchor=new o),this.options.anchor.set(t)},e.prototype.applyConstraint=function(t,i,e){var n,o,r=this.normal,a=this.diffP,h=this.diffV,c=this.impulse,p=this.options,u=p.dampingRatio,l=p.period,f=p.minLength;if(i){var d=i.velocity;n=i.position,o=i.inverseMass}else n=this.options.anchor,o=0;for(var _=this.options.length,g=0;g<t.length;g++){var y=t[g],v=y.velocity,m=y.position,O=y.inverseMass;a.set(m.sub(n)),r.set(a.normalize());var S=a.norm()-_;if(Math.abs(S)<f)return;i?h.set(v.sub(d)):h.set(v);var T,w,b=1/(O+o);if(0===l)T=0,w=1;else{var E=4*b*s*u/l,z=4*b*s*s/(l*l);T=1/(E+e*z),w=e*z/(E+e*z)}var I=w/e*S,M=-(r.dot(h)+I)/(T+e/b);c.set(r.mult(e*M)),y.applyImpulse(c),i&&i.applyImpulse(c.mult(-1))}},i.exports=e},{"../../math/Vector":41,"./Constraint":55}],58:[function(t,i){function e(t){n.call(this),this.options=Object.create(this.constructor.DEFAULT_OPTIONS),t&&this.setOptions(t),this.pDiff=new o,this.vDiff=new o,this.impulse1=new o,this.impulse2=new o}var n=t("./Constraint"),o=t("../../math/Vector");e.prototype=Object.create(n.prototype),e.prototype.constructor=e,e.DEFAULT_OPTIONS={period:300,dampingRatio:.1,length:0,anchor:void 0};var s=Math.PI;e.prototype.setOptions=function(t){void 0!==t.anchor&&(t.anchor instanceof o&&(this.options.anchor=t.anchor),t.anchor.position instanceof o&&(this.options.anchor=t.anchor.position),t.anchor instanceof Array&&(this.options.anchor=new o(t.anchor))),void 0!==t.length&&(this.options.length=t.length),void 0!==t.dampingRatio&&(this.options.dampingRatio=t.dampingRatio),void 0!==t.period&&(this.options.period=t.period),n.prototype.setOptions.call(this,t)
},e.prototype.getEnergy=function(t,i){for(var e=this.options,n=e.length,o=e.anchor||i.position,r=Math.pow(2*s/e.period,2),a=0,h=0;h<t.length;h++){var c=t[h],p=o.sub(c.position).norm()-n;a+=.5*r*p*p}return a},e.prototype.applyConstraint=function(t,i,e){for(var n=this.options,o=this.pDiff,r=this.vDiff,a=this.impulse1,h=this.impulse2,c=n.length,p=n.anchor||i.position,u=n.period,l=n.dampingRatio,f=0;f<t.length;f++){var d=t[f],_=d.position,g=d.velocity,y=d.mass,v=d.inverseMass;o.set(_.sub(p));var m,O=o.norm()-c;if(i){var S=i.inverseMass,T=i.velocity;r.set(g.sub(T)),m=1/(v+S)}else r.set(g),m=y;var w,b;if(0===this.options.period)w=0,b=1;else{var E=4*m*s*s/(u*u),z=4*m*s*l/u;b=e*E/(z+e*E),w=1/(z+e*E)}var I=b/e*O;o.normalize(-I).sub(r).mult(e/(w+e/m)).put(a),d.applyImpulse(a),i&&(a.mult(-1).put(h),i.applyImpulse(h))}},i.exports=e},{"../../math/Vector":41,"./Constraint":55}],59:[function(t,i){function e(t){this.options=Object.create(e.DEFAULT_OPTIONS),t&&this.setOptions(t),this.J=new o,this.impulse=new o,n.call(this)}var n=t("./Constraint"),o=t("../../math/Vector");e.prototype=Object.create(n.prototype),e.prototype.constructor=e,e.DEFAULT_OPTIONS={equation:void 0,period:0,dampingRatio:0};var s=1e-7,r=Math.PI;e.prototype.setOptions=function(t){for(var i in t)this.options[i]=t[i]},e.prototype.applyConstraint=function(t,i,e){for(var n=this.impulse,o=this.J,a=this.options,h=a.equation,c=a.dampingRatio,p=a.period,u=0;u<t.length;u++){var l,f,d=t[u],_=d.velocity,g=d.position,y=d.mass;if(0===p)l=0,f=1;else{var v=4*y*r*c/p,m=4*y*r*r/(p*p);l=1/(v+e*m),f=e*m/(v+e*m)}var O=g.x,S=g.y,T=g.z,w=h(O,S,T),b=(h(O+s,g,g)-w)/s,E=(h(O,S+s,g)-w)/s,z=(h(O,S,g+s)-w)/s;o.setXYZ(b,E,z);var I=f/e*w,M=-(o.dot(_)+I)/(l+e*o.normSquared()/y);n.set(o.mult(e*M)),d.applyImpulse(n)}},i.exports=e},{"../../math/Vector":41,"./Constraint":55}],60:[function(t,i){function e(t){this.options=Object.create(e.DEFAULT_OPTIONS),t&&this.setOptions(t),this.diff=new h,this.impulse=new h,a.call(this)}function n(t,i){return i.dot(t)}function o(t){var i=this.options.normal,e=this.options.distance;return t.dot(i)+e}function s(t,i,n){var o=t.position,s=t.velocity,r=t.mass,a=this.options.normal,h=this.options.onContact,c=this.options.restitution,p=this.impulse,u=this.options.drift,l=-this.options.slop,f=0;if(this._eventOutput){var d={particle:t,wall:this,overlap:i,normal:a};this._eventOutput.emit("preCollision",d),this._eventOutput.emit("collision",d)}switch(h){case e.ON_CONTACT.REFLECT:var _=l>i?-((1+c)*a.dot(s)+u/n*(i-l))/(r*n+f):-((1+c)*a.dot(s))/(r*n+f);p.set(a.mult(n*_)),t.applyImpulse(p),t.setPosition(o.add(a.mult(-i)))}this._eventOutput&&this._eventOutput.emit("postCollision",d)}function r(t,i){var n=this.options.onContact,o=t.position,s=this.options.normal;n===e.ON_CONTACT.REFLECT&&t.setPosition(o.add(s.mult(-i)))}var a=t("./Constraint"),h=t("../../math/Vector");e.prototype=Object.create(a.prototype),e.prototype.constructor=e,e.ON_CONTACT={REFLECT:0,SILENT:1},e.DEFAULT_OPTIONS={restitution:.5,drift:.5,slop:0,normal:[1,0,0],distance:0,onContact:e.ON_CONTACT.REFLECT},e.prototype.setOptions=function(t){void 0!==t.normal&&(t.normal instanceof h&&(this.options.normal=t.normal.clone()),t.normal instanceof Array&&(this.options.normal=new h(t.normal))),void 0!==t.restitution&&(this.options.restitution=t.restitution),void 0!==t.drift&&(this.options.drift=t.drift),void 0!==t.slop&&(this.options.slop=t.slop),void 0!==t.distance&&(this.options.distance=t.distance),void 0!==t.onContact&&(this.options.onContact=t.onContact)},e.prototype.applyConstraint=function(t,i,e){for(var a=this.options.normal,h=0;h<t.length;h++){var c=t[h],p=c.position,u=c.velocity,l=c.radius||0,f=o.call(this,p.add(a.mult(-l))),d=n.call(this,a,u);0>=f&&(0>d?s.call(this,c,f,e):r.call(this,c,f,e))}},i.exports=e},{"../../math/Vector":41,"./Constraint":55}],61:[function(t,i){function e(t){this.options=Object.create(e.DEFAULT_OPTIONS),t&&this.setOptions(t),o.call(this,t.sides||this.options.sides),r.call(this)}function n(t,i,n){var o,s=e.SIDES;switch(parseInt(t)){case s.LEFT:o=i[0]*n[0];break;case s.TOP:o=i[1]*n[1];break;case s.FRONT:o=i[2]*n[2];break;case s.RIGHT:o=i[0]*(1-n[0]);break;case s.BOTTOM:o=i[1]*(1-n[1]);break;case s.BACK:o=i[2]*(1-n[2])}return o}function o(t){this.components={};for(var i=this.components,e=0;e<t.length;e++){var o=t[e];i[e]=new a({normal:c[o].clone(),distance:n(o,this.options.size,this.options.origin)})}}function s(t){this.forEach(function(i){i.setOptions(t)});for(var i in t)this.options[i]=t[i]}var r=t("./Constraint"),a=t("./Wall"),h=t("../../math/Vector");e.prototype=Object.create(r.prototype),e.prototype.constructor=e,e.ON_CONTACT=a.ON_CONTACT,e.SIDES={LEFT:0,RIGHT:1,TOP:2,BOTTOM:3,FRONT:4,BACK:5,TWO_DIMENSIONAL:[0,1,2,3],THREE_DIMENSIONAL:[0,1,2,3,4,5]},e.DEFAULT_OPTIONS={sides:e.SIDES.TWO_DIMENSIONAL,size:[window.innerWidth,window.innerHeight,0],origin:[.5,.5,.5],drift:.5,slop:0,restitution:.5,onContact:e.ON_CONTACT.REFLECT};var c={0:new h(1,0,0),1:new h(-1,0,0),2:new h(0,1,0),3:new h(0,-1,0),4:new h(0,0,1),5:new h(0,0,-1)};e.prototype.setOptions=function(t){var i=!1;void 0!==t.restitution&&s.call(this,{restitution:t.restitution}),void 0!==t.drift&&s.call(this,{drift:t.drift}),void 0!==t.slop&&s.call(this,{slop:t.slop}),void 0!==t.onContact&&s.call(this,{onContact:t.onContact}),void 0!==t.size&&(i=!0),void 0!==t.sides&&(this.options.sides=t.sides),void 0!==t.origin&&(i=!0),i&&this.setSize(t.size,t.origin)},e.prototype.setSize=function(t,i){i=i||this.options.origin,i.length<3&&(i[2]=.5),this.forEach(function(e,o){var s=n(o,t,i);e.setOptions({distance:s})}),this.options.size=t,this.options.origin=i},e.prototype.applyConstraint=function(t,i,e){this.forEach(function(n){n.applyConstraint(t,i,e)})},e.prototype.forEach=function(t){var i=this.options.sides;for(var e in this.sides)t(i[e],e)},e.prototype.rotateZ=function(t){this.forEach(function(i){var e=i.options.normal;e.rotateZ(t).put(e)})},e.prototype.rotateX=function(t){this.forEach(function(i){var e=i.options.normal;e.rotateX(t).put(e)})},e.prototype.rotateY=function(t){this.forEach(function(i){var e=i.options.normal;e.rotateY(t).put(e)})},e.prototype.reset=function(){var t=this.options.sides;for(var i in t){var e=this.components[i];e.options.normal.set(c[i])}},i.exports=e},{"../../math/Vector":41,"./Constraint":55,"./Wall":60}],62:[function(t,i){i.exports={Collision:t("./Collision"),Constraint:t("./Constraint"),Curve:t("./Curve"),Distance:t("./Distance"),Snap:t("./Snap"),Surface:t("./Surface"),Wall:t("./Wall"),Walls:t("./Walls")}},{"./Collision":54,"./Constraint":55,"./Curve":56,"./Distance":57,"./Snap":58,"./Surface":59,"./Wall":60,"./Walls":61}],63:[function(t,i){function e(t){this.options=Object.create(this.constructor.DEFAULT_OPTIONS),t&&this.setOptions(t),n.call(this)}var n=t("./Force");e.prototype=Object.create(n.prototype),e.prototype.constructor=e,e.FORCE_FUNCTIONS={LINEAR:function(t){return t},QUADRATIC:function(t){return t.mult(t.norm())}},e.DEFAULT_OPTIONS={strength:.01,forceFunction:e.FORCE_FUNCTIONS.LINEAR},e.prototype.applyForce=function(t){var i,e,n=this.options.strength,o=this.options.forceFunction,s=this.force;for(i=0;i<t.length;i++)e=t[i],o(e.velocity).mult(-n).put(s),e.applyForce(s)},e.prototype.setOptions=function(t){for(var i in t)this.options[i]=t[i]},i.exports=e},{"./Force":64}],64:[function(t,i){function e(t){this.force=new n(t),this._eventOutput=new o,o.setOutputHandler(this,this._eventOutput)}var n=t("../../math/Vector"),o=t("../../core/EventHandler");e.prototype.setOptions=function(t){this._eventOutput.emit("change",t)},e.prototype.applyForce=function(t){for(var i=t.length;i--;)t[i].applyForce(this.force)},e.prototype.getEnergy=function(){return 0},i.exports=e},{"../../core/EventHandler":7,"../../math/Vector":41}],65:[function(t,i){function e(t){this.options=Object.create(e.DEFAULT_OPTIONS),t&&this.setOptions(t),this.disp=new o,n.call(this)}var n=t("./Force"),o=t("../../math/Vector");e.prototype=Object.create(n.prototype),e.prototype.constructor=e,e.DECAY_FUNCTIONS={LINEAR:function(t,i){return Math.max(1-1/i*t,0)},MORSE:function(t,i){var e=0===i?100:i,n=t+e*(1-Math.log(2));return Math.max(1-Math.pow(1-Math.exp(n/e-1),2),0)},INVERSE:function(t,i){return 1/(1-i+t)},GRAVITY:function(t,i){return 1/(1-i+t*t)}},e.DEFAULT_OPTIONS={strength:1,anchor:void 0,range:[0,1/0],cutoff:0,cap:1/0,decayFunction:e.DECAY_FUNCTIONS.GRAVITY},e.prototype.setOptions=function(t){void 0!==t.anchor&&(t.anchor.position instanceof o&&(this.options.anchor=t.anchor.position),t.anchor instanceof Array&&(this.options.anchor=new o(t.anchor)),delete t.anchor);for(var i in t)this.options[i]=t[i]},e.prototype.applyForce=function(t,i){var e=this.options,n=this.force,o=this.disp,s=e.strength,r=e.anchor||i.position,a=e.cap,h=e.cutoff,c=e.range[0],p=e.range[1],u=e.decayFunction;if(0!==s)for(var l,f,d,_,g=t.length;g--;)l=t[g],l!==i&&(f=l.mass,d=l.position,o.set(d.sub(r)),_=o.norm(),p>_&&_>c&&(n.set(o.normalize(s*f*u(_,h)).cap(a)),l.applyForce(n)))},i.exports=e},{"../../math/Vector":41,"./Force":64}],66:[function(t,i){function e(t){n.call(this,t)}var n=t("./Drag");e.prototype=Object.create(n.prototype),e.prototype.constructor=e,e.DEFAULT_OPTIONS=n.DEFAULT_OPTIONS,e.FORCE_FUNCTIONS=n.FORCE_FUNCTIONS,e.FORCE_FUNCTIONS={LINEAR:function(t){return t},QUADRATIC:function(t){return t.mult(t.norm())}},e.prototype.applyForce=function(t){var i,e,n=this.options.strength,o=this.options.forceFunction,s=this.force;for(i=0;i<t.length;i++)e=t[i],o(e.angularVelocity).mult(-100*n).put(s),e.applyTorque(s)},e.prototype.setOptions=function(t){for(var i in t)this.options[i]=t[i]},i.exports=e},{"./Drag":63}],67:[function(t,i){function e(t){a.call(this,t)}function n(){var t=this.options;t.stiffness=Math.pow(2*c/t.period,2)}function o(){var t=this.options;t.damping=4*c*t.dampingRatio/t.period}function s(){n.call(this),o.call(this)}var r=t("./Force"),a=t("./Spring"),h=t("../../math/Quaternion");e.prototype=Object.create(a.prototype),e.prototype.constructor=e,e.DEFAULT_OPTIONS=a.DEFAULT_OPTIONS,e.FORCE_FUNCTIONS=a.FORCE_FUNCTIONS;var c=Math.PI;e.prototype.setOptions=function(t){void 0!==t.anchor&&(t.anchor instanceof h&&(this.options.anchor=t.anchor),t.anchor instanceof Array&&(this.options.anchor=new h(t.anchor))),void 0!==t.period&&(this.options.period=t.period),void 0!==t.dampingRatio&&(this.options.dampingRatio=t.dampingRatio),void 0!==t.length&&(this.options.length=t.length),void 0!==t.forceFunction&&(this.options.forceFunction=t.forceFunction),void 0!==t.maxLength&&(this.options.maxLength=t.maxLength),s.call(this),r.prototype.setOptions.call(this,t)},e.prototype.applyForce=function(t){var i,e,n,o,s=this.force,r=this.options,a=this.disp,h=r.stiffness,c=r.damping,p=r.length,u=r.anchor,l=r.forceFunction,f=r.maxLength;for(i=0;i<t.length;i++){if(e=t[i],a.set(u.sub(e.orientation)),n=a.norm()-p,0===n)return;o=e.mass,h*=o,c*=o,s.set(a.normalize(h*l(n,f))),c&&s.add(e.angularVelocity.mult(-c)).put(s),e.applyTorque(s)}},e.prototype.getEnergy=function(t){for(var i=this.options,e=i.length,n=i.anchor,o=i.stiffness,s=0,r=0;r<t.length;r++){var a=t[r],h=n.sub(a.orientation).norm()-e;s+=.5*o*h*h}return s},i.exports=e},{"../../math/Quaternion":38,"./Force":64,"./Spring":68}],68:[function(t,i){function e(t){r.call(this),this.options=Object.create(this.constructor.DEFAULT_OPTIONS),t&&this.setOptions(t),this.disp=new a(0,0,0),s.call(this)}function n(){var t=this.options;t.stiffness=Math.pow(2*h/t.period,2)}function o(){var t=this.options;t.damping=4*h*t.dampingRatio/t.period}function s(){n.call(this),o.call(this)}var r=t("./Force"),a=t("../../math/Vector");e.prototype=Object.create(r.prototype),e.prototype.constructor=e;var h=Math.PI,c=150;e.FORCE_FUNCTIONS={FENE:function(t,i){var e=.99*i,n=Math.max(Math.min(t,e),-e);return n/(1-n*n/(i*i))},HOOK:function(t){return t}},e.DEFAULT_OPTIONS={period:300,dampingRatio:.1,length:0,maxLength:1/0,anchor:void 0,forceFunction:e.FORCE_FUNCTIONS.HOOK},e.prototype.setOptions=function(t){void 0!==t.anchor&&(t.anchor.position instanceof a&&(this.options.anchor=t.anchor.position),t.anchor instanceof a&&(this.options.anchor=t.anchor),t.anchor instanceof Array&&(this.options.anchor=new a(t.anchor))),void 0!==t.period&&(t.period<c&&(t.period=c,console.warn("The period of a SpringTransition is capped at "+c+" ms. Use a SnapTransition for faster transitions")),this.options.period=t.period),void 0!==t.dampingRatio&&(this.options.dampingRatio=t.dampingRatio),void 0!==t.length&&(this.options.length=t.length),void 0!==t.forceFunction&&(this.options.forceFunction=t.forceFunction),void 0!==t.maxLength&&(this.options.maxLength=t.maxLength),s.call(this),r.prototype.setOptions.call(this,t)},e.prototype.applyForce=function(t,i){var e,n,o,s,r,a,h=this.force,c=this.disp,p=this.options,u=p.stiffness,l=p.damping,f=p.length,d=p.maxLength,_=p.anchor||i.position,g=p.forceFunction;for(e=0;e<t.length;e++){if(n=t[e],o=n.position,s=n.velocity,_.sub(o).put(c),r=c.norm()-f,0===r)return;a=n.mass,u*=a,l*=a,c.normalize(u*g(r,d)).put(h),l&&(i?h.add(s.sub(i.velocity).mult(-l)).put(h):h.add(s.mult(-l)).put(h)),n.applyForce(h),i&&i.applyForce(h.mult(-1))}},e.prototype.getEnergy=function(t,i){for(var e=this.options,n=e.length,o=i?i.position:e.anchor,s=e.stiffness,r=0,a=0;a<t.length;a++){var h=t[a],c=o.sub(h.position).norm()-n;r+=.5*s*c*c}return r},i.exports=e},{"../../math/Vector":41,"./Force":64}],69:[function(t,i){function e(t){o.call(this),this.options=Object.create(e.DEFAULT_OPTIONS),t&&this.setOptions(t),this.evaluation=new s}function n(t){var i=e.FIELDS;switch(t){case i.CONSTANT:this.options.direction?this.options.direction instanceof Array&&(this.options.direction=new s(this.options.direction)):this.options.direction=new s(0,1,0);break;case i.POINT_ATTRACTOR:this.options.position?this.options.position instanceof Array&&(this.options.position=new s(this.options.position)):this.options.position=new s(0,0,0)}}var o=t("./Force"),s=t("../../math/Vector");e.prototype=Object.create(o.prototype),e.prototype.constructor=e,e.FIELDS={CONSTANT:function(t,i){i.direction.put(this.evaluation)},LINEAR:function(t){t.put(this.evaluation)},RADIAL:function(t){t.mult(-1).put(this.evaluation)},POINT_ATTRACTOR:function(t,i){i.position.sub(t).put(this.evaluation)}},e.DEFAULT_OPTIONS={strength:.01,field:e.FIELDS.CONSTANT},e.prototype.setOptions=function(t){void 0!==t.strength&&(this.options.strength=t.strength),void 0!==t.direction&&(this.options.direction=t.direction),void 0!==t.field&&(this.options.field=t.field,n.call(this,this.options.field))},e.prototype.applyForce=function(t){var i,e,n=this.force,o=this.options.strength,s=this.options.field;for(i=0;i<t.length;i++)e=t[i],s.call(this,e.position,this.options),this.evaluation.mult(e.mass*o).put(n),e.applyForce(n)},e.prototype.getEnergy=function(t){var i,n,o=this.options.field,s=e.FIELDS,r=0;switch(o){case s.CONSTANT:r=t.length*this.options.direction.norm();break;case s.RADIAL:for(i=0;i<t.length;i++)n=t[i],r+=n.position.norm();break;case s.POINT_ATTRACTOR:for(i=0;i<t.length;i++)n=t[i],r+=n.position.sub(this.options.position).norm()}return r*=this.options.strength},i.exports=e},{"../../math/Vector":41,"./Force":64}],70:[function(t,i){i.exports={Drag:t("./Drag"),Force:t("./Force"),Repulsion:t("./Repulsion"),RotationalDrag:t("./RotationalDrag"),RotationalSpring:t("./RotationalSpring"),Spring:t("./Spring"),VectorField:t("./VectorField")}},{"./Drag":63,"./Force":64,"./Repulsion":65,"./RotationalDrag":66,"./RotationalSpring":67,"./Spring":68,"./VectorField":69}],71:[function(t,i){i.exports={PhysicsEngine:t("./PhysicsEngine"),bodies:t("./bodies"),constraints:t("./constraints"),forces:t("./forces"),integrators:t("./integrators")}},{"./PhysicsEngine":48,"./bodies":53,"./constraints":62,"./forces":70,"./integrators":73}],72:[function(t,i){var e={};e.integrateVelocity=function(t,i){var e=t.velocity,n=t.inverseMass,o=t.force;o.isZero()||(e.add(o.mult(i*n)).put(e),o.clear())},e.integratePosition=function(t,i){var e=t.position,n=t.velocity;e.add(n.mult(i)).put(e)},e.integrateAngularMomentum=function(t,i){var e=t.angularMomentum,n=t.torque;n.isZero()||(e.add(n.mult(i)).put(e),n.clear())},e.integrateOrientation=function(t,i){var e=t.orientation,n=t.angularVelocity;n.isZero()||e.add(e.multiply(n).scalarMultiply(.5*i)).put(e)},i.exports=e},{}],73:[function(t,i){i.exports={SymplecticEuler:t("./SymplecticEuler")}},{"./SymplecticEuler":72}],74:[function(t,i){function e(t){t&&t.canvasSize&&(this._canvasSize=t.canvasSize),n.apply(this,arguments),this._canvasSize||(this._canvasSize=this.getSize()),this._backBuffer=document.createElement("canvas"),this._canvasSize&&(this._backBuffer.width=this._canvasSize[0],this._backBuffer.height=this._canvasSize[1]),this._contextId=void 0}var n=t("../core/Surface");e.prototype=Object.create(n.prototype),e.prototype.constructor=e,e.prototype.elementType="canvas",e.prototype.elementClass="famous-surface",e.prototype.setContent=function(){},e.prototype.deploy=function(t){this._canvasSize&&(t.width=this._canvasSize[0],t.height=this._canvasSize[1]),"2d"===this._contextId&&(t.getContext(this._contextId).drawImage(this._backBuffer,0,0),this._backBuffer.width=0,this._backBuffer.height=0)},e.prototype.recall=function(t){this.getSize(),this._backBuffer.width=t.width,this._backBuffer.height=t.height,"2d"===this._contextId&&(this._backBuffer.getContext(this._contextId).drawImage(t,0,0),t.width=0,t.height=0)},e.prototype.getContext=function(t){return this._contextId=t,this._currentTarget?this._currentTarget.getContext(t):this._backBuffer.getContext(t)},e.prototype.setSize=function(t,i){n.prototype.setSize.apply(this,arguments),i&&(this._canvasSize=[i[0],i[1]]),this._currentTarget&&(this._currentTarget.width=this._canvasSize[0],this._currentTarget.height=this._canvasSize[1])},i.exports=e},{"../core/Surface":14}],75:[function(t,i){function e(t){n.call(this,t),this._container=document.createElement("div"),this._container.classList.add("famous-group"),this._container.classList.add("famous-container-group"),this._shouldRecalculateSize=!1,this.context=new o(this._container),this.setContent(this._container)}var n=t("../core/Surface"),o=t("../core/Context");e.prototype=Object.create(n.prototype),e.prototype.constructor=e,e.prototype.elementType="div",e.prototype.elementClass="famous-surface",e.prototype.add=function(){return this.context.add.apply(this.context,arguments)},e.prototype.render=function(){return this._sizeDirty&&(this._shouldRecalculateSize=!0),n.prototype.render.apply(this,arguments)},e.prototype.deploy=function(){return this._shouldRecalculateSize=!0,n.prototype.deploy.apply(this,arguments)},e.prototype.commit=function(){var t=this._size?[this._size[0],this._size[1]]:null,i=n.prototype.commit.apply(this,arguments);return(this._shouldRecalculateSize||t&&(this._size[0]!==t[0]||this._size[1]!==t[1]))&&(this.context.setSize(),this._shouldRecalculateSize=!1),this.context.update(),i},i.exports=e},{"../core/Context":1,"../core/Surface":14}],76:[function(t,i){function e(t){t&&(this._method=t.method||""),n.apply(this,arguments)}var n=t("./ContainerSurface");e.prototype=Object.create(n.prototype),e.prototype.constructor=e,e.prototype.elementType="form",e.prototype.deploy=function(t){return this._method&&(t.method=this._method),n.prototype.deploy.apply(this,arguments)},i.exports=e},{"./ContainerSurface":75}],77:[function(t,i){function e(){this._imageUrl=void 0,n.apply(this,arguments)}var n=t("../core/Surface"),o=[],s=[],r=[],a=!0;e.enableCache=function(){a=!0},e.disableCache=function(){a=!1},e.clearCache=function(){o=[],s=[],r=[]},e.getCache=function(){return{urlCache:o,countCache:s,nodeCache:r}},e.prototype=Object.create(n.prototype),e.prototype.constructor=e,e.prototype.elementType="img",e.prototype.elementClass="famous-surface",e.prototype.setContent=function(t){var i=o.indexOf(this._imageUrl);-1!==i&&(1===s[i]?(o.splice(i,1),s.splice(i,1),r.splice(i,1)):s[i]--),i=o.indexOf(t),-1===i?(o.push(t),s.push(1)):s[i]++,this._imageUrl=t,this._contentDirty=!0},e.prototype.deploy=function(t){var i=o.indexOf(this._imageUrl);if(void 0===r[i]&&a){var e=new Image;e.src=this._imageUrl||"",r[i]=e}t.src=this._imageUrl||""},e.prototype.recall=function(t){t.src=""},i.exports=e},{"../core/Surface":14}],78:[function(t,i){function e(t){this._placeholder=t.placeholder||"",this._value=t.value||"",this._type=t.type||"text",this._name=t.name||"",n.apply(this,arguments),this.on("click",this.focus.bind(this)),window.addEventListener("click",function(t){t.target!==this._currentTarget&&this.blur()}.bind(this))}var n=t("../core/Surface");e.prototype=Object.create(n.prototype),e.prototype.constructor=e,e.prototype.elementType="input",e.prototype.elementClass="famous-surface",e.prototype.setPlaceholder=function(t){return this._placeholder=t,this._contentDirty=!0,this},e.prototype.focus=function(){return this._currentTarget&&this._currentTarget.focus(),this},e.prototype.blur=function(){return this._currentTarget&&this._currentTarget.blur(),this},e.prototype.setValue=function(t){return this._value=t,this._contentDirty=!0,this},e.prototype.setType=function(t){return this._type=t,this._contentDirty=!0,this},e.prototype.getValue=function(){return this._currentTarget?this._currentTarget.value:this._value},e.prototype.setName=function(t){return this._name=t,this._contentDirty=!0,this},e.prototype.getName=function(){return this._name},e.prototype.deploy=function(t){""!==this._placeholder&&(t.placeholder=this._placeholder),t.value=this._value,t.type=this._type,t.name=this._name},i.exports=e},{"../core/Surface":14}],79:[function(t,i){function e(t){n.apply(this,arguments),this._type="submit",t&&t.onClick&&this.setOnClick(t.onClick)}var n=t("./InputSurface");e.prototype=Object.create(n.prototype),e.prototype.constructor=e,e.prototype.setOnClick=function(t){this.onClick=t},e.prototype.deploy=function(t){this.onclick&&(t.onClick=this.onClick),n.prototype.deploy.apply(this,arguments)},i.exports=e},{"./InputSurface":78}],80:[function(t,i){function e(t){this._placeholder=t.placeholder||"",this._value=t.value||"",this._name=t.name||"",this._wrap=t.wrap||"",this._cols=t.cols||"",this._rows=t.rows||"",n.apply(this,arguments),this.on("click",this.focus.bind(this))}var n=t("../core/Surface");e.prototype=Object.create(n.prototype),e.prototype.constructor=e,e.prototype.elementType="textarea",e.prototype.elementClass="famous-surface",e.prototype.setPlaceholder=function(t){return this._placeholder=t,this._contentDirty=!0,this},e.prototype.focus=function(){return this._currentTarget&&this._currentTarget.focus(),this},e.prototype.blur=function(){return this._currentTarget&&this._currentTarget.blur(),this},e.prototype.setValue=function(t){return this._value=t,this._contentDirty=!0,this},e.prototype.getValue=function(){return this._currentTarget?this._currentTarget.value:this._value},e.prototype.setName=function(t){return this._name=t,this._contentDirty=!0,this},e.prototype.getName=function(){return this._name},e.prototype.setWrap=function(t){return this._wrap=t,this._contentDirty=!0,this},e.prototype.setColumns=function(t){return this._cols=t,this._contentDirty=!0,this},e.prototype.setRows=function(t){return this._rows=t,this._contentDirty=!0,this},e.prototype.deploy=function(t){""!==this._placeholder&&(t.placeholder=this._placeholder),""!==this._value&&(t.value=this._value),""!==this._name&&(t.name=this._name),""!==this._wrap&&(t.wrap=this._wrap),""!==this._cols&&(t.cols=this._cols),""!==this._rows&&(t.rows=this._rows)},i.exports=e},{"../core/Surface":14}],81:[function(t,i){function e(t){n.apply(this,arguments),this._videoUrl=void 0,this.options=Object.create(e.DEFAULT_OPTIONS),t&&this.setOptions(t)}var n=t("../core/Surface");e.prototype=Object.create(n.prototype),e.prototype.constructor=e,e.DEFAULT_OPTIONS={autoplay:!1},e.prototype.elementType="video",e.prototype.elementClass="famous-surface",e.prototype.setOptions=function(t){t.size&&this.setSize(t.size),t.classes&&this.setClasses(t.classes),t.properties&&this.setProperties(t.properties),t.autoplay&&(this.options.autoplay=t.autoplay),t.src&&(this._videoUrl=t.src,this._contentDirty=!0)},e.prototype.setContent=function(t){this._videoUrl=t,this._contentDirty=!0},e.prototype.deploy=function(t){t.src=this._videoUrl,t.autoplay=this.options.autoplay},e.prototype.recall=function(t){t.src=""},i.exports=e},{"../core/Surface":14}],82:[function(t,i){i.exports={CanvasSurface:t("./CanvasSurface"),ContainerSurface:t("./ContainerSurface"),FormContainerSurface:t("./FormContainerSurface"),ImageSurface:t("./ImageSurface"),InputSurface:t("./InputSurface"),SubmitInputSurface:t("./SubmitInputSurface"),TextareaSurface:t("./TextareaSurface"),VideoSurface:t("./VideoSurface")}},{"./CanvasSurface":74,"./ContainerSurface":75,"./FormContainerSurface":76,"./ImageSurface":77,"./InputSurface":78,"./SubmitInputSurface":79,"./TextareaSurface":80,"./VideoSurface":81}],83:[function(t,i){function e(t){this._map=t||null,this._cachedOutput=null,this._cachedInput=Number.NaN}e.create=function(t){var i=new e(t);return i.get.bind(i)},e.prototype.get=function(t){return t!==this._cachedInput&&(this._cachedInput=t,this._cachedOutput=this._map(t)),this._cachedOutput},i.exports=e},{}],84:[function(t,i){var e={inQuad:function(t){return t*t},outQuad:function(t){return-(t-=1)*t+1},inOutQuad:function(t){return(t/=.5)<1?.5*t*t:-.5*(--t*(t-2)-1)},inCubic:function(t){return t*t*t},outCubic:function(t){return--t*t*t+1},inOutCubic:function(t){return(t/=.5)<1?.5*t*t*t:.5*((t-=2)*t*t+2)},inQuart:function(t){return t*t*t*t},outQuart:function(t){return-(--t*t*t*t-1)},inOutQuart:function(t){return(t/=.5)<1?.5*t*t*t*t:-.5*((t-=2)*t*t*t-2)},inQuint:function(t){return t*t*t*t*t},outQuint:function(t){return--t*t*t*t*t+1},inOutQuint:function(t){return(t/=.5)<1?.5*t*t*t*t*t:.5*((t-=2)*t*t*t*t+2)},inSine:function(t){return-1*Math.cos(t*(Math.PI/2))+1},outSine:function(t){return Math.sin(t*(Math.PI/2))},inOutSine:function(t){return-.5*(Math.cos(Math.PI*t)-1)},inExpo:function(t){return 0===t?0:Math.pow(2,10*(t-1))},outExpo:function(t){return 1===t?1:-Math.pow(2,-10*t)+1},inOutExpo:function(t){return 0===t?0:1===t?1:(t/=.5)<1?.5*Math.pow(2,10*(t-1)):.5*(-Math.pow(2,-10*--t)+2)},inCirc:function(t){return-(Math.sqrt(1-t*t)-1)},outCirc:function(t){return Math.sqrt(1- --t*t)},inOutCirc:function(t){return(t/=.5)<1?-.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1)},inElastic:function(t){var i=1.70158,e=0,n=1;return 0===t?0:1===t?1:(e||(e=.3),i=e/(2*Math.PI)*Math.asin(1/n),-(n*Math.pow(2,10*(t-=1))*Math.sin((t-i)*2*Math.PI/e)))},outElastic:function(t){var i=1.70158,e=0,n=1;return 0===t?0:1===t?1:(e||(e=.3),i=e/(2*Math.PI)*Math.asin(1/n),n*Math.pow(2,-10*t)*Math.sin((t-i)*2*Math.PI/e)+1)},inOutElastic:function(t){var i=1.70158,e=0,n=1;return 0===t?0:2===(t/=.5)?1:(e||(e=.3*1.5),i=e/(2*Math.PI)*Math.asin(1/n),1>t?-.5*n*Math.pow(2,10*(t-=1))*Math.sin((t-i)*2*Math.PI/e):.5*n*Math.pow(2,-10*(t-=1))*Math.sin((t-i)*2*Math.PI/e)+1)},inBack:function(t,i){return void 0===i&&(i=1.70158),t*t*((i+1)*t-i)},outBack:function(t,i){return void 0===i&&(i=1.70158),--t*t*((i+1)*t+i)+1},inOutBack:function(t,i){return void 0===i&&(i=1.70158),(t/=.5)<1?.5*t*t*(((i*=1.525)+1)*t-i):.5*((t-=2)*t*(((i*=1.525)+1)*t+i)+2)},inBounce:function(t){return 1-e.outBounce(1-t)},outBounce:function(t){return 1/2.75>t?7.5625*t*t:2/2.75>t?7.5625*(t-=1.5/2.75)*t+.75:2.5/2.75>t?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*(t-=2.625/2.75)*t+.984375},inOutBounce:function(t){return.5>t?.5*e.inBounce(2*t):.5*e.outBounce(2*t-1)+.5}};i.exports=e},{}],85:[function(t,i){function e(t){this.method=t,this._instances=[],this.state=[]}var n=t("../utilities/Utility");e.SUPPORTS_MULTIPLE=!0,e.prototype.get=function(){for(var t=0;t<this._instances.length;t++)this.state[t]=this._instances[t].get();return this.state},e.prototype.set=function(t,i,e){for(var o=n.after(t.length,e),s=0;s<t.length;s++)this._instances[s]||(this._instances[s]=new this.method),this._instances[s].set(t[s],i,o)},e.prototype.reset=function(t){for(var i=0;i<t.length;i++)this._instances[i]||(this._instances[i]=new this.method),this._instances[i].reset(t[i])},i.exports=e},{"../utilities/Utility":95}],86:[function(t,i){function e(t){t=t||0,this.endState=new v(t),this.initState=new v,this._dimensions=1,this._restTolerance=1e-10,this._absRestTolerance=this._restTolerance,this._callback=void 0,this.PE=new _,this.particle=new g,this.spring=new y({anchor:this.endState}),this.PE.addBody(this.particle),this.PE.attach(this.spring,this.particle)}function n(){return this.particle.getEnergy()+this.spring.getEnergy([this.particle])}function o(){var t=this.endState.sub(this.initState).normSquared();this._absRestTolerance=0===t?this._restTolerance:this._restTolerance*t}function s(t){this.endState.set(t),o.call(this)}function r(){this.PE.wake()}function a(){this.PE.sleep()}function h(t){this.particle.position.set(t)}function c(t){this.particle.velocity.set(t)}function p(){return 0===this._dimensions?this.particle.getPosition1D():this.particle.getPosition()}function u(){return 0===this._dimensions?this.particle.getVelocity1D():this.particle.getVelocity()}function l(t){this._callback=t}function f(t){var i=e.DEFAULT_OPTIONS;void 0===t.period&&(t.period=i.period),void 0===t.dampingRatio&&(t.dampingRatio=i.dampingRatio),void 0===t.velocity&&(t.velocity=i.velocity),this.spring.setOptions({period:t.period,dampingRatio:t.dampingRatio}),c.call(this,t.velocity)}function d(){if(this.PE.isSleeping()){if(this._callback){var t=this._callback;this._callback=void 0,t()}}else n.call(this)<this._absRestTolerance&&(h.call(this,this.endState),c.call(this,[0,0,0]),a.call(this))}var _=t("../physics/PhysicsEngine"),g=t("../physics/bodies/Particle"),y=t("../physics/constraints/Snap"),v=t("../math/Vector");e.SUPPORTS_MULTIPLE=3,e.DEFAULT_OPTIONS={period:100,dampingRatio:.2,velocity:0},e.prototype.reset=function(t,i){this._dimensions=t instanceof Array?t.length:0,this.initState.set(t),h.call(this,t),s.call(this,t),i&&c.call(this,i),l.call(this,void 0)},e.prototype.getVelocity=function(){return u.call(this)},e.prototype.setVelocity=function(t){this.call(this,c(t))},e.prototype.isActive=function(){return!this.PE.isSleeping()},e.prototype.halt=function(){this.set(this.get())},e.prototype.get=function(){return d.call(this),p.call(this)},e.prototype.set=function(t,i,e){return i?(this._dimensions=t instanceof Array?t.length:0,r.call(this),f.call(this,i),s.call(this,t),l.call(this,e),void 0):(this.reset(t),e&&e(),void 0)},i.exports=e},{"../math/Vector":41,"../physics/PhysicsEngine":48,"../physics/bodies/Particle":51,"../physics/constraints/Snap":58}],87:[function(t,i){function e(t){t=t||0,this.endState=new v(t),this.initState=new v,this._dimensions=void 0,this._restTolerance=1e-10,this._absRestTolerance=this._restTolerance,this._callback=void 0,this.PE=new _,this.spring=new y({anchor:this.endState}),this.particle=new g,this.PE.addBody(this.particle),this.PE.attach(this.spring,this.particle)}function n(){return this.particle.getEnergy()+this.spring.getEnergy([this.particle])}function o(t){this.particle.setPosition(t)}function s(t){this.particle.setVelocity(t)}function r(){return 0===this._dimensions?this.particle.getPosition1D():this.particle.getPosition()}function a(){return 0===this._dimensions?this.particle.getVelocity1D():this.particle.getVelocity()}function h(t){this._callback=t}function c(){this.PE.wake()}function p(){this.PE.sleep()}function u(){if(this.PE.isSleeping()){if(this._callback){var t=this._callback;this._callback=void 0,t()}}else n.call(this)<this._absRestTolerance&&(o.call(this,this.endState),s.call(this,[0,0,0]),p.call(this))}function l(t){var i=e.DEFAULT_OPTIONS;void 0===t.period&&(t.period=i.period),void 0===t.dampingRatio&&(t.dampingRatio=i.dampingRatio),void 0===t.velocity&&(t.velocity=i.velocity),t.period<150&&(t.period=150,console.warn("The period of a SpringTransition is capped at 150 ms. Use a SnapTransition for faster transitions")),this.spring.setOptions({period:t.period,dampingRatio:t.dampingRatio}),s.call(this,t.velocity)}function f(){var t=this.endState.sub(this.initState).normSquared();
this._absRestTolerance=0===t?this._restTolerance:this._restTolerance*t}function d(t){this.endState.set(t),f.call(this)}var _=t("../physics/PhysicsEngine"),g=t("../physics/bodies/Particle"),y=t("../physics/forces/Spring"),v=t("../math/Vector");e.SUPPORTS_MULTIPLE=3,e.DEFAULT_OPTIONS={period:300,dampingRatio:.5,velocity:0},e.prototype.reset=function(t,i){this._dimensions=t instanceof Array?t.length:0,this.initState.set(t),o.call(this,t),d.call(this,t),i&&s.call(this,i),h.call(this,void 0)},e.prototype.getVelocity=function(){return a.call(this)},e.prototype.setVelocity=function(t){this.call(this,s(t))},e.prototype.isActive=function(){return!this.PE.isSleeping()},e.prototype.halt=function(){this.set(this.get())},e.prototype.get=function(){return u.call(this),r.call(this)},e.prototype.set=function(t,i,e){return i?(this._dimensions=t instanceof Array?t.length:0,c.call(this),l.call(this,i),d.call(this,t),h.call(this,e),void 0):(this.reset(t),e&&e(),void 0)},i.exports=e},{"../math/Vector":41,"../physics/PhysicsEngine":48,"../physics/bodies/Particle":51,"../physics/forces/Spring":68}],88:[function(t,i){function e(t){this.currentAction=null,this.actionQueue=[],this.callbackQueue=[],this.state=0,this.velocity=void 0,this._callback=void 0,this._engineInstance=null,this._currentMethod=null,this.set(t)}function n(){if(this._callback){var t=this._callback;this._callback=void 0,t()}if(this.actionQueue.length<=0)return this.set(this.get()),void 0;this.currentAction=this.actionQueue.shift(),this._callback=this.callbackQueue.shift();var i=null,e=this.currentAction[0],a=this.currentAction[1];a instanceof Object&&a.method?(i=a.method,"string"==typeof i&&(i=r[i])):i=s,this._currentMethod!==i&&(this._engineInstance=!(e instanceof Object)||i.SUPPORTS_MULTIPLE===!0||e.length<=i.SUPPORTS_MULTIPLE?new i:new o(i),this._currentMethod=i),this._engineInstance.reset(this.state,this.velocity),void 0!==this.velocity&&(a.velocity=this.velocity),this._engineInstance.set(e,a,n.bind(this))}var o=t("./MultipleTransition"),s=t("./TweenTransition"),r={};e.register=function(t){var i=!0;for(var n in t)e.registerMethod(n,t[n])||(i=!1);return i},e.registerMethod=function(t,i){return t in r?!1:(r[t]=i,!0)},e.unregisterMethod=function(t){return t in r?(delete r[t],!0):!1},e.prototype.set=function(t,i,e){if(!i)return this.reset(t),e&&e(),this;var o=[t,i];return this.actionQueue.push(o),this.callbackQueue.push(e),this.currentAction||n.call(this),this},e.prototype.reset=function(t,i){this._currentMethod=null,this._engineInstance=null,this._callback=void 0,this.state=t,this.velocity=i,this.currentAction=null,this.actionQueue=[],this.callbackQueue=[]},e.prototype.delay=function(t,i){var e;return e=this.actionQueue.length?this.actionQueue[this.actionQueue.length-1][0]:this.currentAction?this.currentAction[0]:this.get(),this.set(e,{duration:t,curve:function(){return 0}},i)},e.prototype.get=function(t){return this._engineInstance&&(this._engineInstance.getVelocity&&(this.velocity=this._engineInstance.getVelocity()),this.state=this._engineInstance.get(t)),this.state},e.prototype.isActive=function(){return!!this.currentAction},e.prototype.halt=function(){return this.set(this.get())},i.exports=e},{"./MultipleTransition":85,"./TweenTransition":90}],89:[function(t,i){function e(t){this._final=r.identity.slice(),this._finalTranslate=[0,0,0],this._finalRotate=[0,0,0],this._finalSkew=[0,0,0],this._finalScale=[1,1,1],this.translate=new s(this._finalTranslate),this.rotate=new s(this._finalRotate),this.skew=new s(this._finalSkew),this.scale=new s(this._finalScale),t&&this.set(t)}function n(){return r.build({translate:this.translate.get(),rotate:this.rotate.get(),skew:this.skew.get(),scale:this.scale.get()})}function o(){return r.build({translate:this._finalTranslate,rotate:this._finalRotate,skew:this._finalSkew,scale:this._finalScale})}var s=t("./Transitionable"),r=t("../core/Transform"),a=t("../utilities/Utility");e.prototype.setTranslate=function(t,i,e){return this._finalTranslate=t,this._final=o.call(this),this.translate.set(t,i,e),this},e.prototype.setScale=function(t,i,e){return this._finalScale=t,this._final=o.call(this),this.scale.set(t,i,e),this},e.prototype.setRotate=function(t,i,e){return this._finalRotate=t,this._final=o.call(this),this.rotate.set(t,i,e),this},e.prototype.setSkew=function(t,i,e){return this._finalSkew=t,this._final=o.call(this),this.skew.set(t,i,e),this},e.prototype.set=function(t,i,e){var n=r.interpret(t);this._finalTranslate=n.translate,this._finalRotate=n.rotate,this._finalSkew=n.skew,this._finalScale=n.scale,this._final=t;var o=e?a.after(4,e):null;return this.translate.set(n.translate,i,o),this.rotate.set(n.rotate,i,o),this.skew.set(n.skew,i,o),this.scale.set(n.scale,i,o),this},e.prototype.setDefaultTransition=function(t){this.translate.setDefault(t),this.rotate.setDefault(t),this.skew.setDefault(t),this.scale.setDefault(t)},e.prototype.get=function(){return this.isActive()?n.call(this):this._final},e.prototype.getFinal=function(){return this._final},e.prototype.isActive=function(){return this.translate.isActive()||this.rotate.isActive()||this.scale.isActive()||this.skew.isActive()},e.prototype.halt=function(){return this.translate.halt(),this.rotate.halt(),this.skew.halt(),this.scale.halt(),this._final=this.get(),this._finalTranslate=this.translate.get(),this._finalRotate=this.rotate.get(),this._finalSkew=this.skew.get(),this._finalScale=this.scale.get(),this},i.exports=e},{"../core/Transform":15,"../utilities/Utility":95,"./Transitionable":88}],90:[function(t,i){function e(t){this.options=Object.create(e.DEFAULT_OPTIONS),t&&this.setOptions(t),this._startTime=0,this._startValue=0,this._updateTime=0,this._endValue=0,this._curve=void 0,this._duration=0,this._active=!1,this._callback=void 0,this.state=0,this.velocity=void 0}function n(t,i,e){return(1-e)*t+e*i}function o(t){return t instanceof Object?t instanceof Array?t.slice(0):Object.create(t):t}function s(t,i){var n={curve:i.curve};return i.duration&&(n.duration=i.duration),i.speed&&(n.speed=i.speed),t instanceof Object&&(void 0!==t.duration&&(n.duration=t.duration),t.curve&&(n.curve=t.curve),t.speed&&(n.speed=t.speed)),"string"==typeof n.curve&&(n.curve=e.getCurve(n.curve)),n}function r(t,i,e,n,o){var s,r=1e-7,a=(e(o)-e(o-r))/r;if(t instanceof Array){s=[];for(var h=0;h<t.length;h++)s[h]="number"==typeof t[h]?a*(t[h]-i[h])/n:0}else s=a*(t-i)/n;return s}function a(t,i,e){var o;if(t instanceof Array){o=[];for(var s=0;s<t.length;s++)o[s]="number"==typeof t[s]?n(t[s],i[s],e):t[s]}else o=n(t,i,e);return o}e.Curves={linear:function(t){return t},easeIn:function(t){return t*t},easeOut:function(t){return t*(2-t)},easeInOut:function(t){return.5>=t?2*t*t:-2*t*t+4*t-1},easeOutBounce:function(t){return t*(3-2*t)},spring:function(t){return(1-t)*Math.sin(6*Math.PI*t)+t}},e.SUPPORTS_MULTIPLE=!0,e.DEFAULT_OPTIONS={curve:e.Curves.linear,duration:500,speed:0};var h={};e.registerCurve=function(t,i){return h[t]?!1:(h[t]=i,!0)},e.unregisterCurve=function(t){return h[t]?(delete h[t],!0):!1},e.getCurve=function(t){var i=h[t];if(void 0!==i)return i;throw new Error("curve not registered")},e.getCurves=function(){return h},e.prototype.setOptions=function(t){void 0!==t.curve&&(this.options.curve=t.curve),void 0!==t.duration&&(this.options.duration=t.duration),void 0!==t.speed&&(this.options.speed=t.speed)},e.prototype.set=function(t,i,e){if(!i)return this.reset(t),e&&e(),void 0;if(this._startValue=o(this.get()),i=s(i,this.options),i.speed){var n=this._startValue;if(n instanceof Object){var r=0;for(var a in n)r+=(t[a]-n[a])*(t[a]-n[a]);i.duration=Math.sqrt(r)/i.speed}else i.duration=Math.abs(t-n)/i.speed}this._startTime=Date.now(),this._endValue=o(t),this._startVelocity=o(i.velocity),this._duration=i.duration,this._curve=i.curve,this._active=!0,this._callback=e},e.prototype.reset=function(t,i){if(this._callback){var e=this._callback;this._callback=void 0,e()}this.state=o(t),this.velocity=o(i),this._startTime=0,this._duration=0,this._updateTime=0,this._startValue=this.state,this._startVelocity=this.velocity,this._endValue=this.state,this._active=!1},e.prototype.getVelocity=function(){return this.velocity},e.prototype.get=function(t){return this.update(t),this.state},e.prototype.update=function(t){if(this._active){if(t||(t=Date.now()),!(this._updateTime>=t)){this._updateTime=t;var i=t-this._startTime;if(i>=this._duration)this.state=this._endValue,this.velocity=r(this.state,this._startValue,this._curve,this._duration,1),this._active=!1;else if(0>i)this.state=this._startValue,this.velocity=this._startVelocity;else{var e=i/this._duration;this.state=a(this._startValue,this._endValue,this._curve(e)),this.velocity=r(this.state,this._startValue,this._curve,this._duration,e)}}}else if(this._callback){var n=this._callback;this._callback=void 0,n()}},e.prototype.isActive=function(){return this._active},e.prototype.halt=function(){this.reset(this.get())},e.registerCurve("linear",e.Curves.linear),e.registerCurve("easeIn",e.Curves.easeIn),e.registerCurve("easeOut",e.Curves.easeOut),e.registerCurve("easeInOut",e.Curves.easeInOut),e.registerCurve("easeOutBounce",e.Curves.easeOutBounce),e.registerCurve("spring",e.Curves.spring),e.customCurve=function(t,i){return t=t||0,i=i||0,function(e){return t*e+(-2*t-i+3)*e*e+(t+i-2)*e*e*e}},i.exports=e},{}],91:[function(t,i){function e(t){t=t||0,this.endState=new m(t),this.initState=new m,this.spring=new y({anchor:this.endState}),this.wall=new v,this._restTolerance=1e-10,this._dimensions=1,this._absRestTolerance=this._restTolerance,this._callback=void 0,this.PE=new _,this.particle=new g,this.PE.addBody(this.particle),this.PE.attach([this.wall,this.spring],this.particle)}function n(){return this.particle.getEnergy()+this.spring.getEnergy([this.particle])}function o(){var t=this.endState.sub(this.initState).normSquared();this._absRestTolerance=0===t?this._restTolerance:this._restTolerance*t}function s(){this.PE.wake()}function r(){this.PE.sleep()}function a(t){this.endState.set(t);var i=this.endState.sub(this.initState).norm();this.wall.setOptions({distance:this.endState.norm(),normal:0===i?this.particle.velocity.normalize(-1):this.endState.sub(this.initState).normalize(-1)}),o.call(this)}function h(t){this.particle.position.set(t)}function c(t){this.particle.velocity.set(t)}function p(){return 0===this._dimensions?this.particle.getPosition1D():this.particle.getPosition()}function u(){return 0===this._dimensions?this.particle.getVelocity1D():this.particle.getVelocity()}function l(t){this._callback=t}function f(){if(this.PE.isSleeping()){if(this._callback){var t=this._callback;this._callback=void 0,t()}}else{var i=n.call(this);i<this._absRestTolerance&&(r.call(this),h.call(this,this.endState),c.call(this,[0,0,0]))}}function d(t){var i=e.DEFAULT_OPTIONS;void 0===t.period&&(t.period=i.period),void 0===t.dampingRatio&&(t.dampingRatio=i.dampingRatio),void 0===t.velocity&&(t.velocity=i.velocity),void 0===t.restitution&&(t.restitution=i.restitution),void 0===t.drift&&(t.drift=v.DEFAULT_OPTIONS.drift),void 0===t.slop&&(t.slop=v.DEFAULT_OPTIONS.slop),this.spring.setOptions({period:t.period,dampingRatio:t.dampingRatio}),this.wall.setOptions({restitution:t.restitution,drift:t.drift,slop:t.slop}),c.call(this,t.velocity)}var _=t("../physics/PhysicsEngine"),g=t("../physics/bodies/Particle"),y=t("../physics/forces/Spring"),v=t("../physics/constraints/Wall"),m=t("../math/Vector");e.SUPPORTS_MULTIPLE=3,e.DEFAULT_OPTIONS={period:300,dampingRatio:.5,velocity:0,restitution:.5},e.prototype.reset=function(t,i){this._dimensions=t instanceof Array?t.length:0,this.initState.set(t),h.call(this,t),i&&c.call(this,i),a.call(this,t),l.call(this,void 0)},e.prototype.getVelocity=function(){return u.call(this)},e.prototype.setVelocity=function(t){this.call(this,c(t))},e.prototype.isActive=function(){return!this.PE.isSleeping()},e.prototype.halt=function(){this.set(this.get())},e.prototype.get=function(){return f.call(this),p.call(this)},e.prototype.set=function(t,i,e){return i?(this._dimensions=t instanceof Array?t.length:0,s.call(this),d.call(this,i),a.call(this,t),l.call(this,e),void 0):(this.reset(t),e&&e(),void 0)},i.exports=e},{"../math/Vector":41,"../physics/PhysicsEngine":48,"../physics/bodies/Particle":51,"../physics/constraints/Wall":60,"../physics/forces/Spring":68}],92:[function(t,i){i.exports={CachedMap:t("./CachedMap"),Easing:t("./Easing"),MultipleTransition:t("./MultipleTransition"),SnapTransition:t("./SnapTransition"),SpringTransition:t("./SpringTransition"),Transitionable:t("./Transitionable"),TransitionableTransform:t("./TransitionableTransform"),TweenTransition:t("./TweenTransition"),WallTransition:t("./WallTransition")}},{"./CachedMap":83,"./Easing":84,"./MultipleTransition":85,"./SnapTransition":86,"./SpringTransition":87,"./Transitionable":88,"./TransitionableTransform":89,"./TweenTransition":90,"./WallTransition":91}],93:[function(t,i){var e={0:48,1:49,2:50,3:51,4:52,5:53,6:54,7:55,8:56,9:57,a:97,b:98,c:99,d:100,e:101,f:102,g:103,h:104,i:105,j:106,k:107,l:108,m:109,n:110,o:111,p:112,q:113,r:114,s:115,t:116,u:117,v:118,w:119,x:120,y:121,z:122,A:65,B:66,C:67,D:68,E:69,F:70,G:71,H:72,I:73,J:74,K:75,L:76,M:77,N:78,O:79,P:80,Q:81,R:82,S:83,T:84,U:85,V:86,W:87,X:88,Y:89,Z:90,ENTER:13,LEFT_ARROW:37,RIGHT_ARROW:39,UP_ARROW:38,DOWN_ARROW:40,SPACE:32,SHIFT:16,TAB:9};i.exports=e},{}],94:[function(t,i){function e(t){return c.on(p,t),t}function n(t,i){var n=u(),o=function(){var e=u();e-n>=i&&(t.apply(this,arguments),c.removeListener(p,o))};return e(o)}function o(t,i){var n=u(),o=function(){var e=u();e-n>=i&&(t.apply(this,arguments),n=u())};return e(o)}function s(t,i){if(void 0===i)return void 0;var n=function(){i--,0>=i&&(t.apply(this,arguments),a(n))};return e(n)}function r(t,i){i=i||1;var n=i,o=function(){i--,0>=i&&(t.apply(this,arguments),i=n)};return e(o)}function a(t){c.removeListener(p,t)}function h(t,i){var e,o,s,r,h;return function(){o=this,h=arguments,s=u();var c=function(){var a=u-s;i>a?e=n(c,i-a):(e=null,r=t.apply(o,h))};return a(e),e=n(c,i),r}}var c=t("../core/Engine"),p="prerender",u=window.performance&&window.performance.now?function(){return window.performance.now()}:function(){return Date.now()};i.exports={setTimeout:n,setInterval:o,debounce:h,after:s,every:r,clear:a}},{"../core/Engine":4}],95:[function(t,i){var e={};e.Direction={X:0,Y:1,Z:2},e.after=function(t,i){var e=t;return function(){e--,0===e&&i.apply(this,arguments)}},e.loadURL=function(t,i){var e=new XMLHttpRequest;e.onreadystatechange=function(){4===this.readyState&&i&&i(this.responseText)},e.open("GET",t),e.send()},e.createDocumentFragmentFromHTML=function(t){var i=document.createElement("div");i.innerHTML=t;for(var e=document.createDocumentFragment();i.hasChildNodes();)e.appendChild(i.firstChild);return e},e.clone=function(t){var i;if("object"==typeof t){i=t instanceof Array?[]:{};for(var n in t)if("object"==typeof t[n]&&null!==t[n])if(t[n]instanceof Array){i[n]=new Array(t[n].length);for(var o=0;o<t[n].length;o++)i[n][o]=e.clone(t[n][o])}else i[n]=e.clone(t[n]);else i[n]=t[n]}else i=t;return i},i.exports=e},{}],96:[function(t,i){i.exports={KeyCodes:t("./KeyCodes"),Timer:t("./Timer"),Utility:t("./Utility")}},{"./KeyCodes":93,"./Timer":94,"./Utility":95}],97:[function(t,i){function e(t){this.options=Object.create(this.constructor.DEFAULT_OPTIONS||e.DEFAULT_OPTIONS),this._optionsManager=new s(this.options),t&&this.setOptions(t),this._eventInput=new o,this._eventOutput=new o,o.setInputHandler(this,this._eventInput),o.setOutputHandler(this,this._eventOutput),this._id=n.register(this)}var n=t("../core/Entity");t("../core/Transform");var o=t("../core/EventHandler"),s=t("../core/OptionsManager");e.DEFAULT_OPTIONS={},e.prototype.setOptions=function(t){return this._optionsManager.setOptions(t)},e.prototype.getOptions=function(t){return this._optionsManager.getOptions(t)},e.prototype.render=function(){return this._id},e.prototype.commit=function(){},i.exports=e},{"../core/Entity":5,"../core/EventHandler":7,"../core/OptionsManager":10,"../core/Transform":15}],98:[function(t,i){function e(){c.apply(this,arguments),this.state=new a(0),this._isOpen=!1,this.setOutputFunction(function(t,i,e){var o=n.call(this),r=this.options.direction===h.Direction.X?s.translate(o*i,0,.001*(o-1)*i):s.translate(0,o*i,.001*(o-1)*i),a=t.render();if(this.options.stackRotation){var c=this.options.stackRotation*e*(1-o);a={transform:s.rotateZ(c),origin:[.5,.5],target:a}}return{transform:r,size:t.getSize(),target:a}})}function n(t){return t?this._isOpen?1:0:this.state.get()}function o(t,i,e){this.state.halt(),this.state.set(t,i,e)}var s=t("../core/Transform"),r=t("../core/OptionsManager"),a=t("../transitions/Transitionable"),h=t("../utilities/Utility"),c=t("./SequentialLayout");e.prototype=Object.create(c.prototype),e.prototype.constructor=e,e.DEFAULT_OPTIONS=r.patch(c.DEFAULT_OPTIONS,{transition:{curve:"easeOutBounce",duration:500},stackRotation:0}),e.prototype.getSize=function(){var t=c.prototype.getSize.apply(this,arguments),i=this._items?this._items.get().getSize():[0,0];i||(i=[0,0]);var e=n.call(this),o=1-e;return[i[0]*o+t[0]*e,i[1]*o+t[1]*e]},e.prototype.isOpen=function(){return this._isOpen},e.prototype.open=function(t){this._isOpen=!0,o.call(this,1,this.options.transition,t)},e.prototype.close=function(t){this._isOpen=!1,o.call(this,0,this.options.transition,t)},e.prototype.toggle=function(t){this._isOpen?this.close(t):this.open(t)},i.exports=e},{"../core/OptionsManager":10,"../core/Transform":15,"../transitions/Transitionable":88,"../utilities/Utility":95,"./SequentialLayout":110}],99:[function(t,i){function e(t){this.options=Object.create(e.DEFAULT_OPTIONS),this._optionsManager=new p(this.options),t&&this.setOptions(t),this._position=new u(0),this._direction=n(this.options.side),this._orientation=o(this.options.side),this._isOpen=!1,this._cachedLength=0,this.drawer=new h,this.content=new h,this._eventInput=new l,this._eventOutput=new l,l.setInputHandler(this,this._eventInput),l.setOutputHandler(this,this._eventOutput),this._eventInput.on("update",r.bind(this)),this._eventInput.on("end",a.bind(this))}function n(t){var i=e.SIDES;return t===i.LEFT||t===i.RIGHT?f:d}function o(t){var i=e.SIDES;return t===i.LEFT||t===i.TOP?1:-1}function s(t){var i,e=this.options;if(e.drawerLength)i=e.drawerLength;else{var n=t.getSize();i=n?n[this._direction]:e.drawerLength}return this._orientation*i}function r(t){var i,e,n=this.getPosition()+t.delta;this._cachedLength=s.call(this,this.drawer),1===this._orientation?(i=0,e=this._cachedLength):(i=this._cachedLength,e=0),n>e?n=e:i>n&&(n=i),this.setPosition(n)}function a(t){var i=t.velocity,e=this._orientation*this.getPosition(),n=this.options,o=this._orientation*this._cachedLength,s=n.positionThreshold||o/2,r=n.velocityThreshold;if(n.transition instanceof Object&&(n.transition.velocity=t.velocity),0===e)return this._isOpen=!1,void 0;if(e===o)return this._isOpen=!0,void 0;var a=Math.abs(i)>r||!this._isOpen&&e>s||this._isOpen&&s>e;a?this.toggle():this.reset()}var h=t("../core/RenderNode"),c=t("../core/Transform"),p=t("../core/OptionsManager"),u=t("../transitions/Transitionable"),l=t("../core/EventHandler"),f=0,d=1;e.SIDES={LEFT:0,TOP:1,RIGHT:2,BOTTOM:3},e.DEFAULT_OPTIONS={side:e.SIDES.LEFT,drawerLength:0,velocityThreshold:0,positionThreshold:0,transition:!0},e.prototype.setOptions=function(t){this._optionsManager.setOptions(t),void 0!==t.side&&(this._direction=n(t.side),this._orientation=o(t.side))},e.prototype.open=function(t,i){t instanceof Function&&(i=t),void 0===t&&(t=this.options.transition),this._cachedLength=s.call(this,this.drawer),this.setPosition(this._cachedLength,t,i),this._isOpen||(this._isOpen=!0,this._eventOutput.emit("open"))},e.prototype.close=function(t,i){t instanceof Function&&(i=t),void 0===t&&(t=this.options.transition),this.setPosition(0,t,i),this._isOpen&&(this._isOpen=!1,this._eventOutput.emit("close"))},e.prototype.setPosition=function(t,i,e){this._position.isActive()&&this._position.halt(),this._position.set(t,i,e)},e.prototype.getPosition=function(){return this._position.get()},e.prototype.setProgress=function(t,i,e){return this._position.set(t*this._cachedLength,i,e)},e.prototype.getProgress=function(){return this._position.get()/this._cachedLength},e.prototype.toggle=function(t){this._isOpen?this.close(t):this.open(t)},e.prototype.reset=function(t){this._isOpen?this.open(t):this.close(t)},e.prototype.isOpen=function(){return this._isOpen},e.prototype.render=function(){var t=this.getPosition();(!this._isOpen&&0>t&&1===this._orientation||t>0&&-1===this._orientation)&&(t=0,this.setPosition(t));var i=this._direction===f?c.translate(t,0,0):c.translate(0,t,0);return[{transform:c.behind,target:this.drawer.render()},{transform:i,target:this.content.render()}]},i.exports=e},{"../core/EventHandler":7,"../core/OptionsManager":10,"../core/RenderNode":11,"../core/Transform":15,"../transitions/Transitionable":88}],100:[function(t,i){function e(t){this._currentTarget=null,this._size=[void 0,void 0],this._controller=new h(t),this._controller.inTransformFrom(o.create(n.bind(this,1e-4))),this._controller.outTransformFrom(o.create(n.bind(this,-1e-4))),this._eventInput=new r,r.setInputHandler(this,this._eventInput),this._entityId=s.register(this),t&&this.setOptions(t)}function n(t,i){return a.translate(this._size[0]*(1-i),0,t*(1-i))}var o=t("../transitions/CachedMap"),s=t("../core/Entity"),r=t("../core/EventHandler"),a=t("../core/Transform"),h=t("./RenderController");e.prototype.show=function(t){this._currentTarget&&this._eventInput.unpipe(this._currentTarget),this._currentTarget=t,this._currentTarget&&this._currentTarget.trigger&&this._eventInput.pipe(this._currentTarget),this._controller.show.apply(this._controller,arguments)},e.prototype.setOptions=function(t){this._controller.setOptions(t)},e.prototype.render=function(){return this._entityId},e.prototype.commit=function(t){return this._size[0]=t.size[0],this._size[1]=t.size[1],{transform:t.transform,opacity:t.opacity,origin:t.origin,size:t.size,target:this._controller.render()}},i.exports=e},{"../core/Entity":5,"../core/EventHandler":7,"../core/Transform":15,"../transitions/CachedMap":83,"./RenderController":106}],101:[function(t,i){function e(t){this.options=Object.create(e.DEFAULT_OPTIONS),this.optionsManager=new a(this.options),t&&this.setOptions(t),this.id=s.register(this),this._ratios=new c(this.options.ratios),this._nodes=[],this._size=[0,0],this._cachedDirection=null,this._cachedLengths=[],this._cachedTransforms=null,this._ratiosDirty=!1,this._eventOutput=new h,h.setOutputHandler(this,this._eventOutput)}function n(t,i,n){var o,s,a,h,c=0,p=i,u=0;for(this._cachedLengths=[],this._cachedTransforms=[],h=0;h<t.length;h++)s=t[h],a=this._nodes[h],"number"!=typeof s?p-=a.getSize()[n]||0:u+=s;for(h=0;h<t.length;h++)a=this._nodes[h],s=t[h],i="number"==typeof s?p*s/u:a.getSize()[n],o=n===e.DIRECTION_X?r.translate(c,0,0):r.translate(0,c,0),this._cachedTransforms.push(o),this._cachedLengths.push(i),c+=i}function o(t,i){for(var e=0;e<t.length;e++)if("number"!=typeof t[e]&&this._nodes[e].getSize()[i]!==this._cachedLengths[e])return!0;return!1}var s=t("../core/Entity"),r=t("../core/Transform"),a=t("../core/OptionsManager"),h=t("../core/EventHandler"),c=t("../transitions/Transitionable");e.DIRECTION_X=0,e.DIRECTION_Y=1,e.DEFAULT_OPTIONS={direction:e.DIRECTION_X,transition:!1,ratios:[]},e.prototype.render=function(){return this.id},e.prototype.setOptions=function(t){this.optionsManager.setOptions(t)},e.prototype.sequenceFrom=function(t){if(this._nodes=t,0===this._ratios.get().length){for(var i=[],e=0;e<this._nodes.length;e++)i.push(1);this.setRatios(i)}},e.prototype.setRatios=function(t,i,e){void 0===i&&(i=this.options.transition);var n=this._ratios;0===n.get().length&&(i=void 0),n.isActive()&&n.halt(),n.set(t,i,e),this._ratiosDirty=!0},e.prototype.getSize=function(){return this._size},e.prototype.commit=function(t){var i,e=t.size,s=t.transform,a=t.origin,h=t.opacity,c=this._ratios.get(),p=this.options.direction,u=e[p];(u!==this._size[p]||this._ratiosDirty||this._ratios.isActive()||p!==this._cachedDirection||o.call(this,c,p))&&(n.call(this,c,u,p),u!==this._size[p]&&(this._size[0]=e[0],this._size[1]=e[1]),p!==this._cachedDirection&&(this._cachedDirection=p),this._ratiosDirty&&(this._ratiosDirty=!1));for(var l=[],f=0;f<c.length;f++)i=[void 0,void 0],u=this._cachedLengths[f],i[p]=u,l.push({transform:this._cachedTransforms[f],size:i,target:this._nodes[f].render()});return e&&0!==a[0]&&0!==a[1]&&(s=r.moveThen([-e[0]*a[0],-e[1]*a[1],0],s)),{transform:s,size:e,opacity:h,target:l}},i.exports=e},{"../core/Entity":5,"../core/EventHandler":7,"../core/OptionsManager":10,"../core/Transform":15,"../transitions/Transitionable":88}],102:[function(t,i){function e(t){this.options=Object.create(e.DEFAULT_OPTIONS),this._optionsManager=new s(this.options),t&&this.setOptions(t),this.angle=new o(0),this.frontNode=void 0,this.backNode=void 0,this.flipped=!1}var n=t("../core/Transform"),o=t("../transitions/Transitionable");t("../core/RenderNode");var s=t("../core/OptionsManager");e.DIRECTION_X=0,e.DIRECTION_Y=1;var r=1;e.DEFAULT_OPTIONS={transition:!0,direction:e.DIRECTION_X},e.prototype.flip=function(t,i){var e=this.flipped?0:Math.PI;this.setAngle(e,t,i),this.flipped=!this.flipped},e.prototype.setAngle=function(t,i,e){void 0===i&&(i=this.options.transition),this.angle.isActive()&&this.angle.halt(),this.angle.set(t,i,e)},e.prototype.setOptions=function(t){return this._optionsManager.setOptions(t)},e.prototype.setFront=function(t){this.frontNode=t},e.prototype.setBack=function(t){this.backNode=t},e.prototype.render=function(){var t,i,o=this.angle.get();this.options.direction===e.DIRECTION_X?(t=n.rotateY(o),i=n.rotateY(o+Math.PI)):(t=n.rotateX(o),i=n.rotateX(o+Math.PI));var s=[];return this.frontNode&&s.push({transform:t,target:this.frontNode.render()}),this.backNode&&s.push({transform:n.moveThen([0,0,r],i),target:this.backNode.render()}),s},i.exports=e},{"../core/OptionsManager":10,"../core/RenderNode":11,"../core/Transform":15,"../transitions/Transitionable":88}],103:[function(t,i){function e(t){this.options=Object.create(e.DEFAULT_OPTIONS),this.optionsManager=new u(this.options),t&&this.setOptions(t),this.id=r.register(this),this._modifiers=[],this._states=[],this._contextSizeCache=[0,0],this._dimensionsCache=[0,0],this._activeCount=0,this._eventOutput=new c,c.setOutputHandler(this,this._eventOutput)}function n(t,i,e){var n=[t[0],t[1]];n[0]-=this.options.gutterSize[0]*(i-1),n[1]-=this.options.gutterSize[1]*(e-1);for(var r,a=Math.round(n[1]/e),h=Math.round(n[0]/i),c=0,p=0,u=0;e>u;u++){r=0;for(var l=0;i>l;l++)void 0===this._modifiers[p]?o.call(this,p,[h,a],[r,c,0],1):s.call(this,p,[h,a],[r,c,0],1),p++,r+=h+this.options.gutterSize[0];c+=a+this.options.gutterSize[1]}for(this._dimensionsCache=[this.options.dimensions[0],this.options.dimensions[1]],this._contextSizeCache=[t[0],t[1]],this._activeCount=e*i,u=this._activeCount;u<this._modifiers.length;u++)s.call(this,u,[Math.round(h),Math.round(a)],[0,0],0);this._eventOutput.emit("reflow")}function o(t,i,e,n){var o={transform:new f(a.translate.apply(null,e)),opacity:new l(n),size:new l(i)},s=new p({transform:o.transform,opacity:o.opacity,size:o.size});this._states[t]=o,this._modifiers[t]=s}function s(t,i,e,n){var o=this._states[t],s=o.size,r=o.opacity,a=o.transform,h=this.options.transition;a.halt(),r.halt(),s.halt(),a.setTranslate(e,h),s.set(i,h),r.set(n,h)}var r=t("../core/Entity");t("../core/RenderNode");var a=t("../core/Transform"),h=t("../core/ViewSequence"),c=t("../core/EventHandler"),p=t("../core/Modifier"),u=t("../core/OptionsManager"),l=t("../transitions/Transitionable"),f=t("../transitions/TransitionableTransform");e.DEFAULT_OPTIONS={dimensions:[1,1],transition:!1,gutterSize:[0,0]},e.prototype.render=function(){return this.id},e.prototype.setOptions=function(t){return this.optionsManager.setOptions(t)},e.prototype.sequenceFrom=function(t){t instanceof Array&&(t=new h(t)),this.sequence=t},e.prototype.getSize=function(){return this._contextSizeCache},e.prototype.commit=function(t){var i=t.transform,e=t.opacity,o=t.origin,s=t.size,r=this.options.dimensions[0],h=this.options.dimensions[1];(s[0]!==this._contextSizeCache[0]||s[1]!==this._contextSizeCache[1]||r!==this._dimensionsCache[0]||h!==this._dimensionsCache[1])&&n.call(this,s,r,h);for(var c=this.sequence,p=[],u=0;c&&u<this._modifiers.length;){var l=c.get(),f=this._modifiers[u];u>=this._activeCount&&this._states[u].opacity.isActive()&&(this._modifiers.splice(u,1),this._states.splice(u,1)),l&&p.push(f.modify({origin:o,target:l.render()})),c=c.getNext(),u++}return s&&(i=a.moveThen([-s[0]*o[0],-s[1]*o[1],0],i)),{transform:i,opacity:e,size:s,target:p}},i.exports=e},{"../core/Entity":5,"../core/EventHandler":7,"../core/Modifier":9,"../core/OptionsManager":10,"../core/RenderNode":11,"../core/Transform":15,"../core/ViewSequence":17,"../transitions/Transitionable":88,"../transitions/TransitionableTransform":89}],104:[function(t,i){function e(t){this.options=Object.create(e.DEFAULT_OPTIONS),this._optionsManager=new c(this.options),t&&this.setOptions(t),this._entityId=r.register(this),this.header=new a,this.footer=new a,this.content=new a}function n(t,i){var e=t.getSize();return e?e[this.options.direction]:i}function o(t){return this.options.direction===e.DIRECTION_X?h.translate(t,0,0):h.translate(0,t,0)}function s(t,i){return this.options.direction===e.DIRECTION_X?[t,i[1]]:[i[0],t]}var r=t("../core/Entity"),a=t("../core/RenderNode"),h=t("../core/Transform"),c=t("../core/OptionsManager");e.DIRECTION_X=0,e.DIRECTION_Y=1,e.DEFAULT_OPTIONS={direction:e.DIRECTION_Y,headerSize:void 0,footerSize:void 0,defaultHeaderSize:0,defaultFooterSize:0},e.prototype.render=function(){return this._entityId},e.prototype.setOptions=function(t){return this._optionsManager.setOptions(t)},e.prototype.commit=function(t){var i=t.transform,e=t.origin,r=t.size,a=t.opacity,c=void 0!==this.options.headerSize?this.options.headerSize:n.call(this,this.header,this.options.defaultHeaderSize),p=void 0!==this.options.footerSize?this.options.footerSize:n.call(this,this.footer,this.options.defaultFooterSize),u=r[this.options.direction]-c-p;r&&(i=h.moveThen([-r[0]*e[0],-r[1]*e[1],0],i));var l=[{size:s.call(this,c,r),target:this.header.render()},{transform:o.call(this,c),size:s.call(this,u,r),target:this.content.render()},{transform:o.call(this,c+u),size:s.call(this,p,r),target:this.footer.render()}];return{transform:i,opacity:a,size:r,target:l}},i.exports=e},{"../core/Entity":5,"../core/OptionsManager":10,"../core/RenderNode":11,"../core/Transform":15}],105:[function(t,i){function e(t){this.options=Object.create(e.DEFAULT_OPTIONS),this._optionsManager=new a(this.options),t&&this.setOptions(t),this._showing=!1,this.nodes=[],this.transforms=[],this.states=[]}var n=t("../core/Transform"),o=t("../core/Modifier"),s=t("../core/RenderNode"),r=t("../utilities/Utility"),a=t("../core/OptionsManager"),h=t("../transitions/Transitionable"),c=t("../transitions/TransitionableTransform");e.DEFAULT_OPTIONS={inTransform:n.scale(.001,.001,.001),inOpacity:0,inOrigin:[.5,.5],inAlign:[.5,.5],outTransform:n.scale(.001,.001,.001),outOpacity:0,outOrigin:[.5,.5],outAlign:[.5,.5],showTransform:n.identity,showOpacity:1,showOrigin:[.5,.5],showAlign:[.5,.5],inTransition:!0,outTransition:!0,overlap:!1},e.prototype.setOptions=function(t){return this._optionsManager.setOptions(t)},e.prototype.show=function(t,i,e){if(!t)return this.hide(e);if(i instanceof Function&&(e=i,i=void 0),this._showing){if(!this.options.overlap)return this.hide(this.show.bind(this,t,i,e));this.hide()}this._showing=!0;var n={transform:new c(this.options.inTransform),origin:new h(this.options.inOrigin),align:new h(this.options.inAlign),opacity:new h(this.options.inOpacity)},a=new o({transform:n.transform,opacity:n.opacity,origin:n.origin,align:n.align}),p=new s;p.add(a).add(t),this.nodes.push(p),this.states.push(n),this.transforms.push(a);var u=e?r.after(3,e):void 0;i||(i=this.options.inTransition),n.transform.set(this.options.showTransform,i,u),n.opacity.set(this.options.showOpacity,i,u),n.origin.set(this.options.showOrigin,i,u),n.align.set(this.options.showAlign,i,u)
},e.prototype.hide=function(t,i){if(this._showing){this._showing=!1,t instanceof Function&&(i=t,t=void 0);var e=this.nodes[this.nodes.length-1],n=this.transforms[this.transforms.length-1],o=this.states[this.states.length-1],s=r.after(3,function(){this.nodes.splice(this.nodes.indexOf(e),1),this.states.splice(this.states.indexOf(o),1),this.transforms.splice(this.transforms.indexOf(n),1),i&&i.call(this)}.bind(this));t||(t=this.options.outTransition),o.transform.set(this.options.outTransform,t,s),o.opacity.set(this.options.outOpacity,t,s),o.origin.set(this.options.outOrigin,t,s),o.align.set(this.options.outAlign,t,s)}},e.prototype.render=function(){for(var t=[],i=0;i<this.nodes.length;i++)t.push(this.nodes[i].render());return t},i.exports=e},{"../core/Modifier":9,"../core/OptionsManager":10,"../core/RenderNode":11,"../core/Transform":15,"../transitions/Transitionable":88,"../transitions/TransitionableTransform":89,"../utilities/Utility":95}],106:[function(t,i){function e(){h.apply(this,arguments),this._showing=-1,this._outgoingRenderables=[],this._nextRenderable=null,this._renderables=[],this._nodes=[],this._modifiers=[],this._states=[],this.inTransformMap=e.DefaultMap.transform,this.inOpacityMap=e.DefaultMap.opacity,this.inOriginMap=e.DefaultMap.origin,this.inAlignMap=e.DefaultMap.align,this.outTransformMap=e.DefaultMap.transform,this.outOpacityMap=e.DefaultMap.opacity,this.outOriginMap=e.DefaultMap.origin,this.outAlignMap=e.DefaultMap.align,this._output=[]}function n(t,i){return t(i.get())}var o=t("../core/Modifier"),s=t("../core/RenderNode"),r=t("../core/Transform"),a=t("../transitions/Transitionable"),h=t("../core/View");e.prototype=Object.create(h.prototype),e.prototype.constructor=e,e.DEFAULT_OPTIONS={inTransition:!0,outTransition:!0,overlap:!0},e.DefaultMap={transform:function(){return r.identity},opacity:function(t){return t},origin:null,align:null},e.prototype.inTransformFrom=function(t){if(t instanceof Function)this.inTransformMap=t;else{if(!t||!t.get)throw new Error("inTransformFrom takes only function or getter object");this.inTransformMap=t.get.bind(t)}return this},e.prototype.inOpacityFrom=function(t){if(t instanceof Function)this.inOpacityMap=t;else{if(!t||!t.get)throw new Error("inOpacityFrom takes only function or getter object");this.inOpacityMap=t.get.bind(t)}return this},e.prototype.inOriginFrom=function(t){if(t instanceof Function)this.inOriginMap=t;else{if(!t||!t.get)throw new Error("inOriginFrom takes only function or getter object");this.inOriginMap=t.get.bind(t)}return this},e.prototype.inAlignFrom=function(t){if(t instanceof Function)this.inAlignMap=t;else{if(!t||!t.get)throw new Error("inAlignFrom takes only function or getter object");this.inAlignMap=t.get.bind(t)}return this},e.prototype.outTransformFrom=function(t){if(t instanceof Function)this.outTransformMap=t;else{if(!t||!t.get)throw new Error("outTransformFrom takes only function or getter object");this.outTransformMap=t.get.bind(t)}return this},e.prototype.outOpacityFrom=function(t){if(t instanceof Function)this.outOpacityMap=t;else{if(!t||!t.get)throw new Error("outOpacityFrom takes only function or getter object");this.outOpacityMap=t.get.bind(t)}return this},e.prototype.outOriginFrom=function(t){if(t instanceof Function)this.outOriginMap=t;else{if(!t||!t.get)throw new Error("outOriginFrom takes only function or getter object");this.outOriginMap=t.get.bind(t)}return this},e.prototype.outAlignFrom=function(t){if(t instanceof Function)this.outAlignMap=t;else{if(!t||!t.get)throw new Error("outAlignFrom takes only function or getter object");this.outAlignMap=t.get.bind(t)}return this},e.prototype.show=function(t,i,e){if(!t)return this.hide(e);if(i instanceof Function&&(e=i,i=null),this._showing>=0){if(!this.options.overlap)return this._nextRenderable?this._nextRenderable=t:(this._nextRenderable=t,this.hide(function(){this._nextRenderable===t&&this.show(this._nextRenderable,e),this._nextRenderable=null})),void 0;this.hide()}var r=null,h=this._renderables.indexOf(t);if(h>=0){this._showing=h,r=this._states[h],r.halt();var c=this._outgoingRenderables.indexOf(t);c>=0&&this._outgoingRenderables.splice(c,1)}else{r=new a(0);var p=new o({transform:this.inTransformMap?n.bind(this,this.inTransformMap,r):null,opacity:this.inOpacityMap?n.bind(this,this.inOpacityMap,r):null,origin:this.inOriginMap?n.bind(this,this.inOriginMap,r):null,align:this.inAlignMap?n.bind(this,this.inAlignMap,r):null}),u=new s;u.add(p).add(t),this._showing=this._nodes.length,this._nodes.push(u),this._modifiers.push(p),this._states.push(r),this._renderables.push(t)}i||(i=this.options.inTransition),r.set(1,i,e)},e.prototype.hide=function(t,i){if(!(this._showing<0)){var e=this._showing;this._showing=-1,t instanceof Function&&(i=t,t=void 0);var o=this._nodes[e],s=this._modifiers[e],r=this._states[e],a=this._renderables[e];s.transformFrom(this.outTransformMap?n.bind(this,this.outTransformMap,r):null),s.opacityFrom(this.outOpacityMap?n.bind(this,this.outOpacityMap,r):null),s.originFrom(this.outOriginMap?n.bind(this,this.outOriginMap,r):null),s.alignFrom(this.outAlignMap?n.bind(this,this.outAlignMap,r):null),this._outgoingRenderables.indexOf(a)<0&&this._outgoingRenderables.push(a),t||(t=this.options.outTransition),r.halt(),r.set(0,t,function(t,e,n,o){if(this._outgoingRenderables.indexOf(o)>=0){var s=this._nodes.indexOf(t);this._nodes.splice(s,1),this._modifiers.splice(s,1),this._states.splice(s,1),this._renderables.splice(s,1),this._outgoingRenderables.splice(this._outgoingRenderables.indexOf(o),1),this._showing>=s&&this._showing--}i&&i.call(this)}.bind(this,o,s,r,a))}},e.prototype.render=function(){var t=this._output;t.length>this._nodes.length&&t.splice(this._nodes.length);for(var i=0;i<this._nodes.length;i++)t[i]=this._nodes[i].render();return t},i.exports=e},{"../core/Modifier":9,"../core/RenderNode":11,"../core/Transform":15,"../core/View":16,"../transitions/Transitionable":88}],107:[function(t,i){function e(t){this.options=Object.create(e.DEFAULT_OPTIONS),this._optionsManager=new r(this.options),t&&this.setOptions(t),this.container=new n(this.options.container),this.scrollview=new s(this.options.scrollview),this.container.add(this.scrollview),this._eventInput=new o,o.setInputHandler(this,this._eventInput),this._eventInput.pipe(this.scrollview),this._eventOutput=new o,o.setOutputHandler(this,this._eventOutput),this.container.pipe(this._eventOutput),this.scrollview.pipe(this._eventOutput)}var n=t("../surfaces/ContainerSurface"),o=t("../core/EventHandler"),s=t("./Scrollview");t("../utilities/Utility");var r=t("../core/OptionsManager");e.DEFAULT_OPTIONS={container:{properties:{overflow:"hidden"}},scrollview:{}},e.prototype.setOptions=function(t){return this._optionsManager.setOptions(t)},e.prototype.sequenceFrom=function(){return this.scrollview.sequenceFrom.apply(this.scrollview,arguments)},e.prototype.getSize=function(){return this.container.getSize.apply(this.container,arguments)},e.prototype.render=function(){return this.container.render()},i.exports=e},{"../core/EventHandler":7,"../core/OptionsManager":10,"../surfaces/ContainerSurface":75,"../utilities/Utility":95,"./Scrollview":109}],108:[function(t,i){function e(t){this.options=Object.create(this.constructor.DEFAULT_OPTIONS),this._optionsManager=new c(this.options),t&&this._optionsManager.setOptions(t),this._node=null,this._position=0,this._positionOffset=0,this._positionGetter=null,this._outputFunction=null,this._masterOutputFunction=null,this.outputFrom(),this._onEdge=0,this.group=new h,this.group.add({render:r.bind(this)}),this._entityId=a.register(this),this._size=[void 0,void 0],this._contextSize=[void 0,void 0],this._eventInput=new f,this._eventOutput=new f,f.setInputHandler(this,this._eventInput),f.setOutputHandler(this,this._eventOutput)}function n(t){t||(t=this._contextSize);var i=this.options.direction;return void 0===t[i]?this._contextSize[i]:t[i]}function o(t,i,e){var o=t.getSize?t.getSize():this._contextSize,s=this._outputFunction(i);return e.push({transform:s,target:t.render()}),n.call(this,o)}function s(){return void 0!==this.options.clipSize?this.options.clipSize:this._contextSize[this.options.direction]>this.getCumulativeSize()[this.options.direction]?n.call(this,this.getCumulativeSize()):n.call(this,this._contextSize)}function r(){for(var t=null,i=this._position,e=[],r=-this._positionOffset,a=s.call(this),h=this._node;h&&r-i<a+this.options.margin;)r+=o.call(this,h,r,e),h=h.getNext?h.getNext():null;var c=this._node,p=n.call(this,c.getSize());if(a>r){for(;c&&a>p;)c=c.getPrevious(),c&&(p+=n.call(this,c.getSize()));for(c=this._node;c&&a>p;)c=c.getNext(),c&&(p+=n.call(this,c.getSize()))}for(!h&&a-d>r-i?1!==this._onEdge&&(this._onEdge=1,this._eventOutput.emit("onEdge",{position:r-a})):!this._node.getPrevious()&&-d>i?-1!==this._onEdge&&(this._onEdge=-1,this._eventOutput.emit("onEdge",{position:0})):0!==this._onEdge&&(this._onEdge=0,this._eventOutput.emit("offEdge")),h=this._node&&this._node.getPrevious?this._node.getPrevious():null,r=-this._positionOffset,h&&(t=h.getSize?h.getSize():this._contextSize,r-=n.call(this,t));h&&r-i>-(a+this.options.margin);)o.call(this,h,r,e),h=h.getPrevious?h.getPrevious():null,h&&(t=h.getSize?h.getSize():this._contextSize,r-=n.call(this,t));return e}var a=t("../core/Entity"),h=t("../core/Group"),c=t("../core/OptionsManager"),p=t("../core/Transform"),u=t("../utilities/Utility"),l=t("../core/ViewSequence"),f=t("../core/EventHandler");e.DEFAULT_OPTIONS={direction:u.Direction.Y,margin:0,clipSize:void 0,groupScroll:!1};var d=0;e.prototype.getCumulativeSize=function(t){return void 0===t&&(t=this._node._.cumulativeSizes.length-1),this._node._.getSize(t)},e.prototype.setOptions=function(t){t.groupScroll!==this.options.groupScroll&&(t.groupScroll?this.group.pipe(this._eventOutput):this.group.unpipe(this._eventOutput)),this._optionsManager.setOptions(t)},e.prototype.onEdge=function(){return this._onEdge},e.prototype.outputFrom=function(t,i){t||(t=function(t){return this.options.direction===u.Direction.X?p.translate(t,0):p.translate(0,t)}.bind(this),i||(i=t)),this._outputFunction=t,this._masterOutputFunction=i?i:function(i){return p.inverse(t(-i))}},e.prototype.positionFrom=function(t){t instanceof Function?this._positionGetter=t:t&&t.get?this._positionGetter=t.get.bind(t):(this._positionGetter=null,this._position=t),this._positionGetter&&(this._position=this._positionGetter.call(this))},e.prototype.sequenceFrom=function(t){t instanceof Array&&(t=new l({array:t})),this._node=t,this._positionOffset=0},e.prototype.getSize=function(t){return t?this._contextSize:this._size},e.prototype.render=function(){return this._node?(this._positionGetter&&(this._position=this._positionGetter.call(this)),this._entityId):null},e.prototype.commit=function(t){var i=t.transform,e=t.opacity,n=t.origin,o=t.size;this.options.clipSize||o[0]===this._contextSize[0]&&o[1]===this._contextSize[1]||(this._onEdge=0,this._contextSize[0]=o[0],this._contextSize[1]=o[1],this.options.direction===u.Direction.X?(this._size[0]=s.call(this),this._size[1]=void 0):(this._size[0]=void 0,this._size[1]=s.call(this)));var r=this._masterOutputFunction(-this._position);return{transform:p.multiply(i,r),size:o,opacity:e,origin:n,target:this.group.render()}},i.exports=e},{"../core/Entity":5,"../core/EventHandler":7,"../core/Group":8,"../core/OptionsManager":10,"../core/Transform":15,"../core/ViewSequence":17,"../utilities/Utility":95}],109:[function(t,i){function e(t){this.options=Object.create(e.DEFAULT_OPTIONS),this._optionsManager=new O(this.options),this._scroller=new T(this.options),this.sync=new b(["scroll","touch"],{direction:this.options.direction,scale:this.options.syncScale,rails:this.options.rails,preventDefault:void 0!==this.options.preventDefault?this.options.preventDefault:this.options.direction!==w.Direction.Y}),this._physicsEngine=new _,this._particle=new g,this._physicsEngine.addBody(this._particle),this.spring=new v({anchor:[0,0,0],period:this.options.edgePeriod,dampingRatio:this.options.edgeDamp}),this.drag=new y({forceFunction:y.FORCE_FUNCTIONS.QUADRATIC,strength:this.options.drag}),this.friction=new y({forceFunction:y.FORCE_FUNCTIONS.LINEAR,strength:this.options.friction}),this._node=null,this._touchCount=0,this._springState=I.NONE,this._onEdge=M.NONE,this._pageSpringPosition=0,this._edgeSpringPosition=0,this._touchVelocity=0,this._earlyEnd=!1,this._needsPaginationCheck=!1,this._displacement=0,this._totalShift=0,this._cachedIndex=0,this._scroller.positionFrom(this.getPosition.bind(this)),this._eventInput=new m,this._eventOutput=new m,this._eventInput.pipe(this.sync),this.sync.pipe(this._eventInput),m.setInputHandler(this,this._eventInput),m.setOutputHandler(this,this._eventOutput),r.call(this),t&&this.setOptions(t)}function n(t){this._touchCount=t.count,void 0===t.count&&(this._touchCount=1),h.call(this),this.setVelocity(0),this._touchVelocity=0,this._earlyEnd=!1}function o(t){var i=-t.velocity,e=-t.delta;if(this._onEdge!==M.NONE&&t.slip&&(0>i&&this._onEdge===M.TOP||i>0&&this._onEdge===M.BOTTOM?this._earlyEnd||(s.call(this,t),this._earlyEnd=!0):this._earlyEnd&&Math.abs(i)>Math.abs(this.getVelocity())&&n.call(this,t)),!this._earlyEnd){if(this._touchVelocity=i,t.slip){var o=this.options.speedLimit;-o>i?i=-o:i>o&&(i=o),this.setVelocity(i);var r=16*o;e>r?e=r:-r>e&&(e=-r)}this.setPosition(this.getPosition()+e),this._displacement+=e,this._springState===I.NONE&&f.call(this)}}function s(t){if(this._touchCount=t.count||0,!this._touchCount){h.call(this),this._onEdge!==M.NONE&&l.call(this,this._edgeSpringPosition,I.EDGE),a.call(this);var i=-t.velocity,e=this.options.speedLimit;t.slip&&(e*=this.options.edgeGrip),-e>i?i=-e:i>e&&(i=e),this.setVelocity(i),this._touchVelocity=0,this._needsPaginationCheck=!0}}function r(){this._eventInput.bindThis(this),this._eventInput.on("start",n),this._eventInput.on("update",o),this._eventInput.on("end",s),this._eventInput.on("resize",function(){this._node._.calculateSize()}.bind(this)),this._scroller.on("onEdge",function(t){this._edgeSpringPosition=t.position,p.call(this,this._scroller.onEdge()),this._eventOutput.emit("onEdge")}.bind(this)),this._scroller.on("offEdge",function(){this.sync.setOptions({scale:this.options.syncScale}),this._onEdge=this._scroller.onEdge(),this._eventOutput.emit("offEdge")}.bind(this)),this._particle.on("update",function(t){this._springState===I.NONE&&f.call(this),this._displacement=t.position.x-this._totalShift}.bind(this)),this._particle.on("end",function(){(!this.options.paginated||this.options.paginated&&this._springState!==I.NONE)&&this._eventOutput.emit("settle")}.bind(this))}function a(){this._springState?this._physicsEngine.attach([this.spring],this._particle):this._physicsEngine.attach([this.drag,this.friction],this._particle)}function h(){this._springState=I.NONE,this._physicsEngine.detachAll()}function c(t){var i=this.options.direction,e=t.getSize();return e?e[i]:this._scroller.getSize()[i]}function p(t){this.sync.setOptions({scale:this.options.edgeGrip}),this._onEdge=t,this._touchCount||this._springState===I.EDGE||l.call(this,this._edgeSpringPosition,I.EDGE),this._springState&&Math.abs(this.getVelocity())<.001&&(h.call(this),a.call(this))}function u(){if(!this._touchCount&&this._springState!==I.EDGE){var t=this.getVelocity();if(!(Math.abs(t)>=this.options.pageStopSpeed)){var i=this.getPosition(),e=Math.abs(t)>this.options.pageSwitchSpeed,n=c.call(this,this._node),o=i>.5*n,s=t>0,r=0>t;this._needsPaginationCheck=!1,o&&!e||e&&s?this.goToNextPage():e&&r?this.goToPreviousPage():l.call(this,0,I.PAGE)}}}function l(t,i){var e;i===I.EDGE?(this._edgeSpringPosition=t,e={anchor:[this._edgeSpringPosition,0,0],period:this.options.edgePeriod,dampingRatio:this.options.edgeDamp}):i===I.PAGE&&(this._pageSpringPosition=t,e={anchor:[this._pageSpringPosition,0,0],period:this.options.pagePeriod,dampingRatio:this.options.pageDamp}),this.spring.setOptions(e),i&&!this._springState&&(h.call(this),this._springState=i,a.call(this)),this._springState=i}function f(){var t=0,i=this.getPosition();i+=(0>i?-.5:.5)>>0;for(var e=c.call(this,this._node),n=this._node.getNext();t+i>=e&&n;)t-=e,this._scroller.sequenceFrom(n),this._node=n,n=this._node.getNext(),e=c.call(this,this._node);for(var o,s=this._node.getPrevious();0>=t+i&&s;)o=c.call(this,s),this._scroller.sequenceFrom(s),this._node=s,t+=o,s=this._node.getPrevious();t&&d.call(this,t),this._node&&(this._node.index!==this._cachedIndex?this.getPosition()<.5*e&&(this._cachedIndex=this._node.index,this._eventOutput.emit("pageChange",{direction:-1,index:this._cachedIndex})):this.getPosition()>.5*e&&(this._cachedIndex=this._node.index+1,this._eventOutput.emit("pageChange",{direction:1,index:this._cachedIndex})))}function d(t){this._edgeSpringPosition+=t,this._pageSpringPosition+=t,this.setPosition(this.getPosition()+t),this._totalShift+=t,this._springState===I.EDGE?this.spring.setOptions({anchor:[this._edgeSpringPosition,0,0]}):this._springState===I.PAGE&&this.spring.setOptions({anchor:[this._pageSpringPosition,0,0]})}var _=t("../physics/PhysicsEngine"),g=t("../physics/bodies/Particle"),y=t("../physics/forces/Drag"),v=t("../physics/forces/Spring"),m=t("../core/EventHandler"),O=t("../core/OptionsManager"),S=t("../core/ViewSequence"),T=t("../views/Scroller"),w=t("../utilities/Utility"),b=t("../inputs/GenericSync"),E=t("../inputs/ScrollSync"),z=t("../inputs/TouchSync");b.register({scroll:E,touch:z});var I={NONE:0,EDGE:1,PAGE:2},M={TOP:-1,NONE:0,BOTTOM:1};e.DEFAULT_OPTIONS={direction:w.Direction.Y,rails:!0,friction:.005,drag:1e-4,edgeGrip:.2,edgePeriod:300,edgeDamp:1,margin:1e3,paginated:!1,pagePeriod:500,pageDamp:.8,pageStopSpeed:10,pageSwitchSpeed:.5,speedLimit:5,groupScroll:!1,syncScale:1},e.prototype.getCurrentIndex=function(){return this._node.index},e.prototype.goToPreviousPage=function(){if(!this._node||this._onEdge===M.TOP)return null;if(this.getPosition()>1&&this._springState===I.NONE)return l.call(this,0,I.PAGE),this._node;var t=this._node.getPrevious();if(t){var i=c.call(this,t);this._scroller.sequenceFrom(t),this._node=t,d.call(this,i),l.call(this,0,I.PAGE)}return t},e.prototype.goToNextPage=function(){if(!this._node||this._onEdge===M.BOTTOM)return null;var t=this._node.getNext();if(t){var i=c.call(this,this._node);this._scroller.sequenceFrom(t),this._node=t,d.call(this,-i),l.call(this,0,I.PAGE)}return t},e.prototype.goToPage=function(t){var i,e=this.getCurrentIndex();if(e>t)for(i=0;e-t>i;i++)this.goToPreviousPage();if(t>e)for(i=0;t-e>i;i++)this.goToNextPage()},e.prototype.outputFrom=function(){return this._scroller.outputFrom.apply(this._scroller,arguments)},e.prototype.getPosition=function(){return this._particle.getPosition1D()},e.prototype.getAbsolutePosition=function(){return this._scroller.getCumulativeSize(this.getCurrentIndex())[this.options.direction]+this.getPosition()},e.prototype.getOffset=e.prototype.getPosition,e.prototype.setPosition=function(t){this._particle.setPosition1D(t)},e.prototype.setOffset=e.prototype.setPosition,e.prototype.getVelocity=function(){return this._touchCount?this._touchVelocity:this._particle.getVelocity1D()},e.prototype.setVelocity=function(t){this._particle.setVelocity1D(t)},e.prototype.setOptions=function(t){void 0!==t.direction&&("x"===t.direction?t.direction=w.Direction.X:"y"===t.direction&&(t.direction=w.Direction.Y)),t.groupScroll!==this.options.groupScroll&&(t.groupScroll?this.subscribe(this._scroller):this.unsubscribe(this._scroller)),this._optionsManager.setOptions(t),this._scroller.setOptions(t),void 0!==t.drag&&this.drag.setOptions({strength:this.options.drag}),void 0!==t.friction&&this.friction.setOptions({strength:this.options.friction}),(void 0!==t.edgePeriod||void 0!==t.edgeDamp)&&this.spring.setOptions({period:this.options.edgePeriod,dampingRatio:this.options.edgeDamp}),(t.rails||void 0!==t.direction||void 0!==t.syncScale||t.preventDefault)&&this.sync.setOptions({rails:this.options.rails,direction:this.options.direction===w.Direction.X?b.DIRECTION_X:b.DIRECTION_Y,scale:this.options.syncScale,preventDefault:this.options.preventDefault})},e.prototype.sequenceFrom=function(t){return t instanceof Array&&(t=new S({array:t,trackSize:!0})),this._node=t,this._scroller.sequenceFrom(t)},e.prototype.getSize=function(){return this._scroller.getSize.apply(this._scroller,arguments)},e.prototype.render=function(){return this.options.paginated&&this._needsPaginationCheck&&u.call(this),this._scroller.render()},i.exports=e},{"../core/EventHandler":7,"../core/OptionsManager":10,"../core/ViewSequence":17,"../inputs/GenericSync":27,"../inputs/ScrollSync":32,"../inputs/TouchSync":33,"../physics/PhysicsEngine":48,"../physics/bodies/Particle":51,"../physics/forces/Drag":63,"../physics/forces/Spring":68,"../utilities/Utility":95,"../views/Scroller":108}],110:[function(t,i){function e(t){this._items=null,this._size=null,this._outputFunction=e.DEFAULT_OUTPUT_FUNCTION,this.options=a.clone(this.constructor.DEFAULT_OPTIONS||e.DEFAULT_OPTIONS),this.optionsManager=new n(this.options),this.id=o.register(this),this.cachedSize=[void 0,void 0],t&&this.setOptions(t)}var n=t("../core/OptionsManager"),o=t("../core/Entity"),s=t("../core/Transform"),r=t("../core/ViewSequence"),a=t("../utilities/Utility");e.DEFAULT_OPTIONS={direction:a.Direction.Y,itemSpacing:0},e.DEFAULT_OUTPUT_FUNCTION=function(t,i){var e=this.options.direction===a.Direction.X?s.translate(i,0):s.translate(0,i);return{size:this.cachedSize,transform:e,target:t.render()}},e.prototype.getSize=function(){return this._size||this.render(),this._size},e.prototype.sequenceFrom=function(t){return t instanceof Array&&(t=new r(t)),this._items=t,this},e.prototype.setOptions=function(){return this.optionsManager.setOptions.apply(this.optionsManager,arguments),this},e.prototype.setOutputFunction=function(t){return this._outputFunction=t,this},e.prototype.render=function(){return this.id},e.prototype.commit=function(t){var i=0,e=1^this.options.direction,n=this._items,o=null,s=[],r={},a=[],h=0;for(this._size=[0,0],this.cachedSize=t.size;n&&(o=n.get());)o.getSize&&(s=o.getSize()),r=this._outputFunction.call(this,o,i,h++),a.push(r),s&&(s[this.options.direction]&&(i+=s[this.options.direction]),s[e]>this._size[e]&&(this._size[e]=s[e]),0===s[e]&&(this._size[e]=void 0)),n=n.getNext(),this.options.itemSpacing&&n&&(i+=this.options.itemSpacing);return this._size[this.options.direction]=i,{transform:t.transform,origin:t.origin,opacity:t.opacity,size:this.getSize(),target:a}},i.exports=e},{"../core/Entity":5,"../core/OptionsManager":10,"../core/Transform":15,"../core/ViewSequence":17,"../utilities/Utility":95}],111:[function(t,i){function e(){n.apply(this,arguments),this._id=o.register(this),this._parentSize=[]}var n=t("../core/View"),o=t("../core/Entity"),s=t("../core/Transform");e.prototype=Object.create(n.prototype),e.prototype.constructor=e,e.prototype.commit=function(t){var i=t.transform,e=t.opacity,n=t.origin;return this._parentSize&&this._parentSize[0]===t.size[0]&&this._parentSize[1]===t.size[1]||(this._parentSize[0]=t.size[0],this._parentSize[1]=t.size[1],this._eventInput.emit("parentResize",this._parentSize),this.onResize&&this.onResize(this._parentSize)),this._parentSize&&(i=s.moveThen([-this._parentSize[0]*n[0],-this._parentSize[1]*n[1],0],i)),{transform:i,opacity:e,size:this._parentSize,target:this._node.render()}},e.prototype.getParentSize=function(){return this._parentSize},e.prototype.render=function(){return this._id},i.exports=e},{"../core/Entity":5,"../core/Transform":15,"../core/View":16}],112:[function(t,i){i.exports={ContextualView:t("./ContextualView"),Deck:t("./Deck"),DrawerLayout:t("./DrawerLayout"),EdgeSwapper:t("./EdgeSwapper"),FlexibleLayout:t("./FlexibleLayout"),Flipper:t("./Flipper"),GridLayout:t("./GridLayout"),HeaderFooterLayout:t("./HeaderFooterLayout"),Lightbox:t("./Lightbox"),RenderController:t("./RenderController"),ScrollContainer:t("./ScrollContainer"),Scroller:t("./Scroller"),Scrollview:t("./Scrollview"),SequentialLayout:t("./SequentialLayout"),SizeAwareView:t("./SizeAwareView")}},{"./ContextualView":97,"./Deck":98,"./DrawerLayout":99,"./EdgeSwapper":100,"./FlexibleLayout":101,"./Flipper":102,"./GridLayout":103,"./HeaderFooterLayout":104,"./Lightbox":105,"./RenderController":106,"./ScrollContainer":107,"./Scroller":108,"./Scrollview":109,"./SequentialLayout":110,"./SizeAwareView":111}],113:[function(t,i){function e(){r.apply(this,arguments),this.title=new o({classes:this.options.classes,content:this.options.content}),this.back=new o({size:[this.options.size[1],this.options.size[1]],classes:this.options.classes,content:this.options.backContent}),this.back.on("click",function(){this._eventOutput.emit("back",{})}.bind(this)),this.more=new o({size:[this.options.size[1],this.options.size[1]],classes:this.options.classes,content:this.options.moreContent}),this.more.on("click",function(){this._eventOutput.emit("more",{})}.bind(this)),this.layout=new n({id:"master",size:this.options.size,target:[{transform:s.inFront,origin:[0,.5],align:[0,.5],target:this.back},{origin:[.5,.5],align:[.5,.5],target:this.title},{transform:s.inFront,origin:[1,.5],align:[1,.5],target:this.more}]}),this._add(this.layout),this._optionsManager.on("change",function(t){var i=t.id,e=t.value;"size"===i?(this.layout.id.master.setSize(e),this.title.setSize(e),this.back.setSize([e[1],e[1]]),this.more.setSize([e[1],e[1]])):"backClasses"===i?this.back.setOptions({classes:this.options.classes.concat(this.options.backClasses)}):"backContent"===i?this.back.setContent(this.options.backContent):"classes"===i?(this.title.setOptions({classes:this.options.classes}),this.back.setOptions({classes:this.options.classes.concat(this.options.backClasses)}),this.more.setOptions({classes:this.options.classes.concat(this.options.moreClasses)})):"content"===i?this.setContent(this.options.content):"moreClasses"===i?this.more.setOptions({classes:this.options.classes.concat(this.options.moreClasses)}):"moreContent"===i&&this.more.setContent(this.options.content)}.bind(this))}var n=t("../core/Scene"),o=t("../core/Surface"),s=t("../core/Transform"),r=t("../core/View");e.prototype=Object.create(r.prototype),e.prototype.constructor=e,e.DEFAULT_OPTIONS={size:[void 0,50],backClasses:["back"],backContent:"◀",classes:["navigation"],content:"",moreClasses:["more"],moreContent:"✚"},e.prototype.setContent=function(t){return this.title.setContent(t)},i.exports=e},{"../core/Scene":12,"../core/Surface":14,"../core/Transform":15,"../core/View":16}],114:[function(t,i){function e(t){this.options=Object.create(e.DEFAULT_OPTIONS),this.optionsManager=new c(this.options),t&&this.setOptions(t),this.indicator=new s({size:this.options.indicatorSize,classes:["slider-back"]}),this.label=new o({size:this.options.labelSize,content:this.options.label,properties:{pointerEvents:"none"},classes:["slider-label"]}),this.eventOutput=new a,this.eventInput=new a,a.setInputHandler(this,this.eventInput),a.setOutputHandler(this,this.eventOutput);var i=(this.options.range[1]-this.options.range[0])/this.options.indicatorSize[0];this.sync=new l(["mouse","touch"],{scale:i,direction:l.DIRECTION_X}),this.indicator.pipe(this.sync),this.sync.pipe(this),this.eventInput.on("update",function(t){this.set(t.position)}.bind(this)),this._drawPos=0,n.call(this)}function n(){this.label.setContent(this.options.label+'<span style="float: right">'+this.get().toFixed(this.options.precision)+"</span>")}var o=t("../core/Surface"),s=t("../surfaces/CanvasSurface"),r=t("../core/Transform"),a=t("../core/EventHandler"),h=t("../math/Utilities"),c=t("../core/OptionsManager"),p=t("../inputs/MouseSync"),u=t("../inputs/TouchSync"),l=t("../inputs/GenericSync");l.register({mouse:p,touch:u}),e.DEFAULT_OPTIONS={size:[200,60],indicatorSize:[200,30],labelSize:[200,30],range:[0,1],precision:2,value:0,label:"",fillColor:"rgba(170, 170, 170, 1)"},e.prototype.setOptions=function(t){return this.optionsManager.setOptions(t)},e.prototype.get=function(){return this.options.value},e.prototype.set=function(t){t!==this.options.value&&(this.options.value=h.clamp(t,this.options.range),n.call(this),this.eventOutput.emit("change",{value:t}))},e.prototype.getSize=function(){return this.options.size},e.prototype.render=function(){var t=this.options.range,i=Math.floor((this.get()-t[0])/(t[1]-t[0])*this.options.indicatorSize[0]);if(i<this._drawPos)this.indicator.getContext("2d").clearRect(i,0,this._drawPos-i+1,this.options.indicatorSize[1]);else if(i>this._drawPos){var e=this.indicator.getContext("2d");e.fillStyle=this.options.fillColor,e.fillRect(this._drawPos-1,0,i-this._drawPos+1,this.options.indicatorSize[1])}return this._drawPos=i,{size:this.options.size,target:[{origin:[0,0],target:this.indicator.render()},{transform:r.translate(0,0,1),origin:[0,0],target:this.label.render()}]}},i.exports=e},{"../core/EventHandler":7,"../core/OptionsManager":10,"../core/Surface":14,"../core/Transform":15,"../inputs/GenericSync":27,"../inputs/MouseSync":28,"../inputs/TouchSync":33,"../math/Utilities":40,"../surfaces/CanvasSurface":74}],115:[function(t,i){function e(){r.apply(this,arguments),this.layout=new a,this.buttons=[],this._buttonIds={},this._buttonCallbacks={},this.layout.sequenceFrom(this.buttons),this._add(this.layout),this._optionsManager.on("change",n.bind(this))}function n(t){var i=t.id,e=t.value;if("direction"===i)this.layout.setOptions({dimensions:o.call(this.buttons.length,this.options.direction)});else if("buttons"===i)for(var n in this.buttons)this.buttons[n].setOptions(e);else if("sections"===i)for(var s in this.options.sections)this.defineSection(s,this.options.sections[s])}function o(t,i){return i===s.Direction.X?[t,1]:[1,t]}var s=t("../utilities/Utility"),r=t("../core/View"),a=t("../views/GridLayout"),h=t("./ToggleButton");e.prototype=Object.create(r.prototype),e.prototype.constructor=e,e.DEFAULT_OPTIONS={sections:[],widget:h,size:[void 0,50],direction:s.Direction.X,buttons:{toggleMode:h.ON}},e.prototype.defineSection=function(t,i){var e,n=this._buttonIds[t];if(void 0===n){n=this.buttons.length,this._buttonIds[t]=n;var s=this.options.widget;e=new s,this.buttons[n]=e,this.layout.setOptions({dimensions:o(this.buttons.length,this.options.direction)})}else e=this.buttons[n],e.unbind("select",this._buttonCallbacks[t]);this.options.buttons&&e.setOptions(this.options.buttons),e.setOptions(i),this._buttonCallbacks[t]=this.select.bind(this,t),e.on("select",this._buttonCallbacks[t])},e.prototype.select=function(t){var i=this._buttonIds[t];this.buttons[i]&&this.buttons[i].isSelected()?this._eventOutput.emit("select",{id:t}):this.buttons[i]&&this.buttons[i].select();for(var e=0;e<this.buttons.length;e++)e!==i&&this.buttons[e].deselect()},i.exports=e},{"../core/View":16,"../utilities/Utility":95,"../views/GridLayout":103,"./ToggleButton":116}],116:[function(t,i){function e(t){this.options={content:["",""],offClasses:["off"],onClasses:["on"],size:void 0,outTransition:{curve:"easeInOut",duration:300},inTransition:{curve:"easeInOut",duration:300},toggleMode:e.TOGGLE,crossfade:!0},this._eventOutput=new o,o.setOutputHandler(this,this._eventOutput),this.offSurface=new n,this.offSurface.on("click",function(){this.options.toggleMode!==e.OFF&&this.select()}.bind(this)),this.offSurface.pipe(this._eventOutput),this.onSurface=new n,this.onSurface.on("click",function(){this.options.toggleMode!==e.ON&&this.deselect()}.bind(this)),this.onSurface.pipe(this._eventOutput),this.arbiter=new s({overlap:this.options.crossfade}),this.deselect(),t&&this.setOptions(t)}var n=t("../core/Surface"),o=t("../core/EventHandler"),s=t("../views/RenderController");e.OFF=0,e.ON=1,e.TOGGLE=2,e.prototype.select=function(t){this.selected=!0,this.arbiter.show(this.onSurface,this.options.inTransition),t||this._eventOutput.emit("select")},e.prototype.deselect=function(t){this.selected=!1,this.arbiter.show(this.offSurface,this.options.outTransition),t||this._eventOutput.emit("deselect")},e.prototype.isSelected=function(){return this.selected},e.prototype.setOptions=function(t){void 0!==t.content&&(t.content instanceof Array||(t.content=[t.content,t.content]),this.options.content=t.content,this.offSurface.setContent(this.options.content[0]),this.onSurface.setContent(this.options.content[1])),t.offClasses&&(this.options.offClasses=t.offClasses,this.offSurface.setClasses(this.options.offClasses)),t.onClasses&&(this.options.onClasses=t.onClasses,this.onSurface.setClasses(this.options.onClasses)),void 0!==t.size&&(this.options.size=t.size,this.onSurface.setSize(this.options.size),this.offSurface.setSize(this.options.size)),void 0!==t.toggleMode&&(this.options.toggleMode=t.toggleMode),void 0!==t.outTransition&&(this.options.outTransition=t.outTransition),void 0!==t.inTransition&&(this.options.inTransition=t.inTransition),void 0!==t.crossfade&&(this.options.crossfade=t.crossfade,this.arbiter.setOptions({overlap:this.options.crossfade}))
},e.prototype.getSize=function(){return this.options.size},e.prototype.render=function(){return this.arbiter.render()},i.exports=e},{"../core/EventHandler":7,"../core/Surface":14,"../views/RenderController":106}],117:[function(t,i){i.exports={NavigationBar:t("./NavigationBar"),Slider:t("./Slider"),TabBar:t("./TabBar"),ToggleButton:t("./ToggleButton")}},{"./NavigationBar":113,"./Slider":114,"./TabBar":115,"./ToggleButton":116}]},{},[23])(23)});

// --- file[famousflex.js] ---

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
if (typeof famousflex === 'undefined') {
    famousflex = {};
}

famousflex.FlexScrollView = require('../src/FlexScrollView');
famousflex.FlowLayoutNode = require('../src/FlowLayoutNode');
famousflex.LayoutContext = require('../src/LayoutContext');
famousflex.LayoutController = require('../src/LayoutController');
famousflex.LayoutNode = require('../src/LayoutNode');
famousflex.LayoutNodeManager = require('../src/LayoutNodeManager');
famousflex.LayoutUtility = require('../src/LayoutUtility');
famousflex.ScrollController = require('../src/ScrollController');
famousflex.VirtualViewSequence = require('../src/VirtualViewSequence');

famousflex.widgets = famousflex.widgets || {};
famousflex.widgets.DatePicker = require('../src/widgets/DatePicker');
famousflex.widgets.TabBar = require('../src/widgets/TabBar');

famousflex.layouts = famousflex.layouts || {};
famousflex.layouts.CollectionLayout = require('../src/layouts/CollectionLayout');
famousflex.layouts.CoverLayout = require('../src/layouts/CoverLayout');
famousflex.layouts.CubeLayout = require('../src/layouts/CubeLayout');
famousflex.layouts.GridLayout = require('../src/layouts/GridLayout');
famousflex.layouts.HeaderFooterLayout = require('../src/layouts/HeaderFooterLayout');
famousflex.layouts.ListLayout = require('../src/layouts/ListLayout');
famousflex.layouts.NavBarLayout = require('../src/layouts/NavBarLayout');
famousflex.layouts.ProportionalLayout = require('../src/layouts/ProportionalLayout');
famousflex.layouts.WheelLayout = require('../src/layouts/WheelLayout');

famousflex.helpers = famousflex.helpers || {};
famousflex.helpers.LayoutDockHelper = require('../src/helpers/LayoutDockHelper');

},{"../src/FlexScrollView":2,"../src/FlowLayoutNode":3,"../src/LayoutContext":4,"../src/LayoutController":5,"../src/LayoutNode":6,"../src/LayoutNodeManager":7,"../src/LayoutUtility":8,"../src/ScrollController":9,"../src/VirtualViewSequence":10,"../src/helpers/LayoutDockHelper":11,"../src/layouts/CollectionLayout":12,"../src/layouts/CoverLayout":13,"../src/layouts/CubeLayout":14,"../src/layouts/GridLayout":15,"../src/layouts/HeaderFooterLayout":16,"../src/layouts/ListLayout":17,"../src/layouts/NavBarLayout":18,"../src/layouts/ProportionalLayout":19,"../src/layouts/WheelLayout":21,"../src/widgets/DatePicker":22,"../src/widgets/TabBar":24}],2:[function(require,module,exports){
var LayoutUtility = require('./LayoutUtility');
var ScrollController = require('./ScrollController');
var ListLayout = require('./layouts/ListLayout');
var PullToRefreshState = {
        HIDDEN: 0,
        PULLING: 1,
        ACTIVE: 2,
        COMPLETED: 3,
        HIDDING: 4
    };
function FlexScrollView(options) {
    ScrollController.call(this, LayoutUtility.combineOptions(FlexScrollView.DEFAULT_OPTIONS, options));
    this._thisScrollViewDelta = 0;
    this._leadingScrollViewDelta = 0;
    this._trailingScrollViewDelta = 0;
}
FlexScrollView.prototype = Object.create(ScrollController.prototype);
FlexScrollView.prototype.constructor = FlexScrollView;
FlexScrollView.PullToRefreshState = PullToRefreshState;
FlexScrollView.DEFAULT_OPTIONS = {
    layout: ListLayout,
    direction: undefined,
    paginated: false,
    alignment: 0,
    flow: false,
    mouseMove: false,
    useContainer: false,
    visibleItemThresshold: 0.5,
    pullToRefreshHeader: undefined,
    pullToRefreshFooter: undefined,
    leadingScrollView: undefined,
    trailingScrollView: undefined
};
FlexScrollView.prototype.setOptions = function (options) {
    ScrollController.prototype.setOptions.call(this, options);
    if (options.pullToRefreshHeader || options.pullToRefreshFooter || this._pullToRefresh) {
        if (options.pullToRefreshHeader) {
            this._pullToRefresh = this._pullToRefresh || [
                undefined,
                undefined
            ];
            if (!this._pullToRefresh[0]) {
                this._pullToRefresh[0] = {
                    state: PullToRefreshState.HIDDEN,
                    prevState: PullToRefreshState.HIDDEN,
                    footer: false
                };
            }
            this._pullToRefresh[0].node = options.pullToRefreshHeader;
        } else if (!this.options.pullToRefreshHeader && this._pullToRefresh) {
            this._pullToRefresh[0] = undefined;
        }
        if (options.pullToRefreshFooter) {
            this._pullToRefresh = this._pullToRefresh || [
                undefined,
                undefined
            ];
            if (!this._pullToRefresh[1]) {
                this._pullToRefresh[1] = {
                    state: PullToRefreshState.HIDDEN,
                    prevState: PullToRefreshState.HIDDEN,
                    footer: true
                };
            }
            this._pullToRefresh[1].node = options.pullToRefreshFooter;
        } else if (!this.options.pullToRefreshFooter && this._pullToRefresh) {
            this._pullToRefresh[1] = undefined;
        }
        if (this._pullToRefresh && !this._pullToRefresh[0] && !this._pullToRefresh[1]) {
            this._pullToRefresh = undefined;
        }
    }
    return this;
};
FlexScrollView.prototype.sequenceFrom = function (node) {
    return this.setDataSource(node);
};
FlexScrollView.prototype.getCurrentIndex = function getCurrentIndex() {
    var item = this.getFirstVisibleItem();
    return item ? item.viewSequence.getIndex() : -1;
};
FlexScrollView.prototype.goToPage = function goToPage(index) {
    var viewSequence = this._viewSequence;
    if (!viewSequence) {
        return this;
    }
    while (viewSequence.getIndex() < index) {
        viewSequence = viewSequence.getNext();
        if (!viewSequence) {
            return this;
        }
    }
    while (viewSequence.getIndex() > index) {
        viewSequence = viewSequence.getPrevious();
        if (!viewSequence) {
            return this;
        }
    }
    this.goToRenderNode(viewSequence.get());
    return this;
};
FlexScrollView.prototype.getOffset = function () {
    return this._scrollOffsetCache;
};
FlexScrollView.prototype.getPosition = FlexScrollView.prototype.getOffset;
function _setPullToRefreshState(pullToRefresh, state) {
    if (pullToRefresh.state !== state) {
        pullToRefresh.state = state;
        if (pullToRefresh.node && pullToRefresh.node.setPullToRefreshStatus) {
            pullToRefresh.node.setPullToRefreshStatus(state);
        }
    }
}
function _getPullToRefresh(footer) {
    return this._pullToRefresh ? this._pullToRefresh[footer ? 1 : 0] : undefined;
}
FlexScrollView.prototype._postLayout = function (size, scrollOffset) {
    if (!this._pullToRefresh) {
        return;
    }
    if (this.options.alignment) {
        scrollOffset += size[this._direction];
    }
    var prevHeight;
    var nextHeight;
    var totalHeight;
    for (var i = 0; i < 2; i++) {
        var pullToRefresh = this._pullToRefresh[i];
        if (pullToRefresh) {
            var length = pullToRefresh.node.getSize()[this._direction];
            var pullLength = pullToRefresh.node.getPullToRefreshSize ? pullToRefresh.node.getPullToRefreshSize()[this._direction] : length;
            var offset;
            if (!pullToRefresh.footer) {
                prevHeight = this._calcScrollHeight(false);
                prevHeight = prevHeight === undefined ? -1 : prevHeight;
                offset = prevHeight >= 0 ? scrollOffset - prevHeight : prevHeight;
                if (this.options.alignment) {
                    nextHeight = this._calcScrollHeight(true);
                    nextHeight = nextHeight === undefined ? -1 : nextHeight;
                    totalHeight = prevHeight >= 0 && nextHeight >= 0 ? prevHeight + nextHeight : -1;
                    if (totalHeight >= 0 && totalHeight < size[this._direction]) {
                        offset = Math.round(scrollOffset - size[this._direction] + nextHeight);
                    }
                }
            } else {
                nextHeight = nextHeight === undefined ? nextHeight = this._calcScrollHeight(true) : nextHeight;
                nextHeight = nextHeight === undefined ? -1 : nextHeight;
                offset = nextHeight >= 0 ? scrollOffset + nextHeight : size[this._direction] + 1;
                if (!this.options.alignment) {
                    prevHeight = prevHeight === undefined ? this._calcScrollHeight(false) : prevHeight;
                    prevHeight = prevHeight === undefined ? -1 : prevHeight;
                    totalHeight = prevHeight >= 0 && nextHeight >= 0 ? prevHeight + nextHeight : -1;
                    if (totalHeight >= 0 && totalHeight < size[this._direction]) {
                        offset = Math.round(scrollOffset - prevHeight + size[this._direction]);
                    }
                }
                offset = -(offset - size[this._direction]);
            }
            var visiblePerc = Math.max(Math.min(offset / pullLength, 1), 0);
            switch (pullToRefresh.state) {
            case PullToRefreshState.HIDDEN:
                if (this._scroll.scrollForceCount) {
                    if (visiblePerc >= 1) {
                        _setPullToRefreshState(pullToRefresh, PullToRefreshState.ACTIVE);
                    } else if (offset >= 0.2) {
                        _setPullToRefreshState(pullToRefresh, PullToRefreshState.PULLING);
                    }
                }
                break;
            case PullToRefreshState.PULLING:
                if (this._scroll.scrollForceCount && visiblePerc >= 1) {
                    _setPullToRefreshState(pullToRefresh, PullToRefreshState.ACTIVE);
                } else if (offset < 0.2) {
                    _setPullToRefreshState(pullToRefresh, PullToRefreshState.HIDDEN);
                }
                break;
            case PullToRefreshState.ACTIVE:
                break;
            case PullToRefreshState.COMPLETED:
                if (!this._scroll.scrollForceCount) {
                    if (offset >= 0.2) {
                        _setPullToRefreshState(pullToRefresh, PullToRefreshState.HIDDING);
                    } else {
                        _setPullToRefreshState(pullToRefresh, PullToRefreshState.HIDDEN);
                    }
                }
                break;
            case PullToRefreshState.HIDDING:
                if (offset < 0.2) {
                    _setPullToRefreshState(pullToRefresh, PullToRefreshState.HIDDEN);
                }
                break;
            }
            if (pullToRefresh.state !== PullToRefreshState.HIDDEN) {
                var contextNode = {
                        renderNode: pullToRefresh.node,
                        prev: !pullToRefresh.footer,
                        next: pullToRefresh.footer,
                        index: !pullToRefresh.footer ? --this._nodes._contextState.prevGetIndex : ++this._nodes._contextState.nextGetIndex
                    };
                var scrollLength;
                if (pullToRefresh.state === PullToRefreshState.ACTIVE) {
                    scrollLength = length;
                } else if (this._scroll.scrollForceCount) {
                    scrollLength = Math.min(offset, length);
                }
                var set = {
                        size: [
                            size[0],
                            size[1]
                        ],
                        translate: [
                            0,
                            0,
                            -0.001
                        ],
                        scrollLength: scrollLength
                    };
                set.size[this._direction] = Math.max(Math.min(offset, pullLength), 0);
                set.translate[this._direction] = pullToRefresh.footer ? size[this._direction] - length : 0;
                this._nodes._context.set(contextNode, set);
            }
        }
    }
};
FlexScrollView.prototype.showPullToRefresh = function (footer) {
    var pullToRefresh = _getPullToRefresh.call(this, footer);
    if (pullToRefresh) {
        _setPullToRefreshState(pullToRefresh, PullToRefreshState.ACTIVE);
        this._scroll.scrollDirty = true;
    }
};
FlexScrollView.prototype.hidePullToRefresh = function (footer) {
    var pullToRefresh = _getPullToRefresh.call(this, footer);
    if (pullToRefresh && pullToRefresh.state === PullToRefreshState.ACTIVE) {
        _setPullToRefreshState(pullToRefresh, PullToRefreshState.COMPLETED);
        this._scroll.scrollDirty = true;
    }
    return this;
};
FlexScrollView.prototype.isPullToRefreshVisible = function (footer) {
    var pullToRefresh = _getPullToRefresh.call(this, footer);
    return pullToRefresh ? pullToRefresh.state === PullToRefreshState.ACTIVE : false;
};
FlexScrollView.prototype.applyScrollForce = function (delta) {
    var leadingScrollView = this.options.leadingScrollView;
    var trailingScrollView = this.options.trailingScrollView;
    if (!leadingScrollView && !trailingScrollView) {
        return ScrollController.prototype.applyScrollForce.call(this, delta);
    }
    var partialDelta;
    if (delta < 0) {
        if (leadingScrollView) {
            partialDelta = leadingScrollView.canScroll(delta);
            this._leadingScrollViewDelta += partialDelta;
            leadingScrollView.applyScrollForce(partialDelta);
            delta -= partialDelta;
        }
        if (trailingScrollView) {
            partialDelta = this.canScroll(delta);
            ScrollController.prototype.applyScrollForce.call(this, partialDelta);
            this._thisScrollViewDelta += partialDelta;
            delta -= partialDelta;
            trailingScrollView.applyScrollForce(delta);
            this._trailingScrollViewDelta += delta;
        } else {
            ScrollController.prototype.applyScrollForce.call(this, delta);
            this._thisScrollViewDelta += delta;
        }
    } else {
        if (trailingScrollView) {
            partialDelta = trailingScrollView.canScroll(delta);
            trailingScrollView.applyScrollForce(partialDelta);
            this._trailingScrollViewDelta += partialDelta;
            delta -= partialDelta;
        }
        if (leadingScrollView) {
            partialDelta = this.canScroll(delta);
            ScrollController.prototype.applyScrollForce.call(this, partialDelta);
            this._thisScrollViewDelta += partialDelta;
            delta -= partialDelta;
            leadingScrollView.applyScrollForce(delta);
            this._leadingScrollViewDelta += delta;
        } else {
            ScrollController.prototype.applyScrollForce.call(this, delta);
            this._thisScrollViewDelta += delta;
        }
    }
    return this;
};
FlexScrollView.prototype.updateScrollForce = function (prevDelta, newDelta) {
    var leadingScrollView = this.options.leadingScrollView;
    var trailingScrollView = this.options.trailingScrollView;
    if (!leadingScrollView && !trailingScrollView) {
        return ScrollController.prototype.updateScrollForce.call(this, prevDelta, newDelta);
    }
    var partialDelta;
    var delta = newDelta - prevDelta;
    if (delta < 0) {
        if (leadingScrollView) {
            partialDelta = leadingScrollView.canScroll(delta);
            leadingScrollView.updateScrollForce(this._leadingScrollViewDelta, this._leadingScrollViewDelta + partialDelta);
            this._leadingScrollViewDelta += partialDelta;
            delta -= partialDelta;
        }
        if (trailingScrollView && delta) {
            partialDelta = this.canScroll(delta);
            ScrollController.prototype.updateScrollForce.call(this, this._thisScrollViewDelta, this._thisScrollViewDelta + partialDelta);
            this._thisScrollViewDelta += partialDelta;
            delta -= partialDelta;
            this._trailingScrollViewDelta += delta;
            trailingScrollView.updateScrollForce(this._trailingScrollViewDelta, this._trailingScrollViewDelta + delta);
        } else if (delta) {
            ScrollController.prototype.updateScrollForce.call(this, this._thisScrollViewDelta, this._thisScrollViewDelta + delta);
            this._thisScrollViewDelta += delta;
        }
    } else {
        if (trailingScrollView) {
            partialDelta = trailingScrollView.canScroll(delta);
            trailingScrollView.updateScrollForce(this._trailingScrollViewDelta, this._trailingScrollViewDelta + partialDelta);
            this._trailingScrollViewDelta += partialDelta;
            delta -= partialDelta;
        }
        if (leadingScrollView) {
            partialDelta = this.canScroll(delta);
            ScrollController.prototype.updateScrollForce.call(this, this._thisScrollViewDelta, this._thisScrollViewDelta + partialDelta);
            this._thisScrollViewDelta += partialDelta;
            delta -= partialDelta;
            leadingScrollView.updateScrollForce(this._leadingScrollViewDelta, this._leadingScrollViewDelta + delta);
            this._leadingScrollViewDelta += delta;
        } else {
            ScrollController.prototype.updateScrollForce.call(this, this._thisScrollViewDelta, this._thisScrollViewDelta + delta);
            this._thisScrollViewDelta += delta;
        }
    }
    return this;
};
FlexScrollView.prototype.releaseScrollForce = function (delta, velocity) {
    var leadingScrollView = this.options.leadingScrollView;
    var trailingScrollView = this.options.trailingScrollView;
    if (!leadingScrollView && !trailingScrollView) {
        return ScrollController.prototype.releaseScrollForce.call(this, delta, velocity);
    }
    var partialDelta;
    if (delta < 0) {
        if (leadingScrollView) {
            partialDelta = Math.max(this._leadingScrollViewDelta, delta);
            this._leadingScrollViewDelta -= partialDelta;
            delta -= partialDelta;
            leadingScrollView.releaseScrollForce(this._leadingScrollViewDelta, delta ? 0 : velocity);
        }
        if (trailingScrollView) {
            partialDelta = Math.max(this._thisScrollViewDelta, delta);
            this._thisScrollViewDelta -= partialDelta;
            delta -= partialDelta;
            ScrollController.prototype.releaseScrollForce.call(this, this._thisScrollViewDelta, delta ? 0 : velocity);
            this._trailingScrollViewDelta -= delta;
            trailingScrollView.releaseScrollForce(this._trailingScrollViewDelta, delta ? velocity : 0);
        } else {
            this._thisScrollViewDelta -= delta;
            ScrollController.prototype.releaseScrollForce.call(this, this._thisScrollViewDelta, delta ? velocity : 0);
        }
    } else {
        if (trailingScrollView) {
            partialDelta = Math.min(this._trailingScrollViewDelta, delta);
            this._trailingScrollViewDelta -= partialDelta;
            delta -= partialDelta;
            trailingScrollView.releaseScrollForce(this._trailingScrollViewDelta, delta ? 0 : velocity);
        }
        if (leadingScrollView) {
            partialDelta = Math.min(this._thisScrollViewDelta, delta);
            this._thisScrollViewDelta -= partialDelta;
            delta -= partialDelta;
            ScrollController.prototype.releaseScrollForce.call(this, this._thisScrollViewDelta, delta ? 0 : velocity);
            this._leadingScrollViewDelta -= delta;
            leadingScrollView.releaseScrollForce(this._leadingScrollViewDelta, delta ? velocity : 0);
        } else {
            this._thisScrollViewDelta -= delta;
            ScrollController.prototype.updateScrollForce.call(this, this._thisScrollViewDelta, delta ? velocity : 0);
        }
    }
    return this;
};
FlexScrollView.prototype.commit = function (context) {
    var result = ScrollController.prototype.commit.call(this, context);
    if (this._pullToRefresh) {
        for (var i = 0; i < 2; i++) {
            var pullToRefresh = this._pullToRefresh[i];
            if (pullToRefresh) {
                if (pullToRefresh.state === PullToRefreshState.ACTIVE && pullToRefresh.prevState !== PullToRefreshState.ACTIVE) {
                    this._eventOutput.emit('refresh', {
                        target: this,
                        footer: pullToRefresh.footer
                    });
                }
                pullToRefresh.prevState = pullToRefresh.state;
            }
        }
    }
    return result;
};
module.exports = FlexScrollView;
},{"./LayoutUtility":8,"./ScrollController":9,"./layouts/ListLayout":17}],3:[function(require,module,exports){
(function (global){
var OptionsManager = typeof window !== 'undefined' ? window.famous.core.OptionsManager : typeof global !== 'undefined' ? global.famous.core.OptionsManager : null;
var Transform = typeof window !== 'undefined' ? window.famous.core.Transform : typeof global !== 'undefined' ? global.famous.core.Transform : null;
var Vector = typeof window !== 'undefined' ? window.famous.math.Vector : typeof global !== 'undefined' ? global.famous.math.Vector : null;
var Particle = typeof window !== 'undefined' ? window.famous.physics.bodies.Particle : typeof global !== 'undefined' ? global.famous.physics.bodies.Particle : null;
var Spring = typeof window !== 'undefined' ? window.famous.physics.forces.Spring : typeof global !== 'undefined' ? global.famous.physics.forces.Spring : null;
var PhysicsEngine = typeof window !== 'undefined' ? window.famous.physics.PhysicsEngine : typeof global !== 'undefined' ? global.famous.physics.PhysicsEngine : null;
var LayoutNode = require('./LayoutNode');
var Transitionable = typeof window !== 'undefined' ? window.famous.transitions.Transitionable : typeof global !== 'undefined' ? global.famous.transitions.Transitionable : null;
function FlowLayoutNode(renderNode, spec) {
    LayoutNode.apply(this, arguments);
    if (!this.options) {
        this.options = Object.create(this.constructor.DEFAULT_OPTIONS);
        this._optionsManager = new OptionsManager(this.options);
    }
    if (!this._pe) {
        this._pe = new PhysicsEngine();
        this._pe.sleep();
    }
    if (!this._properties) {
        this._properties = {};
    } else {
        for (var propName in this._properties) {
            this._properties[propName].init = false;
        }
    }
    if (!this._lockTransitionable) {
        this._lockTransitionable = new Transitionable(1);
    } else {
        this._lockTransitionable.halt();
        this._lockTransitionable.reset(1);
    }
    this._specModified = true;
    this._initial = true;
    if (spec) {
        this.setSpec(spec);
    }
}
FlowLayoutNode.prototype = Object.create(LayoutNode.prototype);
FlowLayoutNode.prototype.constructor = FlowLayoutNode;
FlowLayoutNode.DEFAULT_OPTIONS = {
    spring: {
        dampingRatio: 0.8,
        period: 300
    },
    particleRounding: 0.001
};
var DEFAULT = {
        opacity: 1,
        opacity2D: [
            1,
            0
        ],
        size: [
            0,
            0
        ],
        origin: [
            0,
            0
        ],
        align: [
            0,
            0
        ],
        scale: [
            1,
            1,
            1
        ],
        translate: [
            0,
            0,
            0
        ],
        rotate: [
            0,
            0,
            0
        ],
        skew: [
            0,
            0,
            0
        ]
    };
FlowLayoutNode.prototype.setOptions = function (options) {
    this._optionsManager.setOptions(options);
    var wasSleeping = this._pe.isSleeping();
    for (var propName in this._properties) {
        var prop = this._properties[propName];
        if (prop.force) {
            prop.force.setOptions(prop.force);
        }
    }
    if (wasSleeping) {
        this._pe.sleep();
    }
    return this;
};
FlowLayoutNode.prototype.setSpec = function (spec) {
    var set;
    if (spec.transform) {
        set = Transform.interpret(spec.transform);
    }
    if (!set) {
        set = {};
    }
    set.opacity = spec.opacity;
    set.size = spec.size;
    set.align = spec.align;
    set.origin = spec.origin;
    var oldRemoving = this._removing;
    var oldInvalidated = this._invalidated;
    this.set(set);
    this._removing = oldRemoving;
    this._invalidated = oldInvalidated;
};
FlowLayoutNode.prototype.reset = function () {
    if (this._invalidated) {
        for (var propName in this._properties) {
            this._properties[propName].invalidated = false;
        }
        this._invalidated = false;
    }
    this.trueSizeRequested = false;
    this.usesTrueSize = false;
};
FlowLayoutNode.prototype.remove = function (removeSpec) {
    this._removing = true;
    if (removeSpec) {
        this.setSpec(removeSpec);
    } else {
        this._pe.sleep();
        this._specModified = false;
    }
    this._invalidated = false;
};
FlowLayoutNode.prototype.releaseLock = function (duration) {
    this._lockTransitionable.halt();
    this._lockTransitionable.reset(0);
    this._lockTransitionable.set(1, { duration: duration || this.options.spring.period || 1000 });
};
function _getRoundedValue3D(prop, def, precision, lockValue) {
    if (!prop || !prop.init) {
        return def;
    }
    return [
        Math.round((prop.curState.x + (prop.endState.x - prop.curState.x) * lockValue) / precision) * precision,
        Math.round((prop.curState.y + (prop.endState.y - prop.curState.y) * lockValue) / precision) * precision,
        Math.round((prop.curState.z + (prop.endState.z - prop.curState.z) * lockValue) / precision) * precision
    ];
}
FlowLayoutNode.prototype.getSpec = function () {
    var endStateReached = this._pe.isSleeping();
    if (!this._specModified && endStateReached) {
        this._spec.removed = !this._invalidated;
        return this._spec;
    }
    this._initial = false;
    this._specModified = !endStateReached;
    this._spec.removed = false;
    if (!endStateReached) {
        this._pe.step();
    }
    var spec = this._spec;
    var precision = this.options.particleRounding;
    var lockValue = this._lockTransitionable.get();
    var prop = this._properties.opacity;
    if (prop && prop.init) {
        spec.opacity = Math.round(Math.max(0, Math.min(1, prop.curState.x)) / precision) * precision;
    } else {
        spec.opacity = undefined;
    }
    prop = this._properties.size;
    if (prop && prop.init) {
        spec.size = spec.size || [
            0,
            0
        ];
        spec.size[0] = Math.round((prop.curState.x + (prop.endState.x - prop.curState.x) * lockValue) / 0.1) * 0.1;
        spec.size[1] = Math.round((prop.curState.y + (prop.endState.y - prop.curState.y) * lockValue) / 0.1) * 0.1;
    } else {
        spec.size = undefined;
    }
    prop = this._properties.align;
    if (prop && prop.init) {
        spec.align = spec.align || [
            0,
            0
        ];
        spec.align[0] = Math.round((prop.curState.x + (prop.endState.x - prop.curState.x) * lockValue) / 0.1) * 0.1;
        spec.align[1] = Math.round((prop.curState.y + (prop.endState.y - prop.curState.y) * lockValue) / 0.1) * 0.1;
    } else {
        spec.align = undefined;
    }
    prop = this._properties.origin;
    if (prop && prop.init) {
        spec.origin = spec.origin || [
            0,
            0
        ];
        spec.origin[0] = Math.round((prop.curState.x + (prop.endState.x - prop.curState.x) * lockValue) / 0.1) * 0.1;
        spec.origin[1] = Math.round((prop.curState.y + (prop.endState.y - prop.curState.y) * lockValue) / 0.1) * 0.1;
    } else {
        spec.origin = undefined;
    }
    var translate = this._properties.translate;
    var translateX;
    var translateY;
    var translateZ;
    if (translate && translate.init) {
        translateX = Math.round((translate.curState.x + (translate.endState.x - translate.curState.x) * lockValue) / precision) * precision;
        translateY = Math.round((translate.curState.y + (translate.endState.y - translate.curState.y) * lockValue) / precision) * precision;
        translateZ = Math.round((translate.curState.z + (translate.endState.z - translate.curState.z) * lockValue) / precision) * precision;
    } else {
        translateX = 0;
        translateY = 0;
        translateZ = 0;
    }
    var scale = this._properties.scale;
    var skew = this._properties.skew;
    var rotate = this._properties.rotate;
    if (scale || skew || rotate) {
        spec.transform = Transform.build({
            translate: [
                translateX,
                translateY,
                translateZ
            ],
            skew: _getRoundedValue3D.call(this, skew, DEFAULT.skew, this.options.particleRounding, lockValue),
            scale: _getRoundedValue3D.call(this, scale, DEFAULT.scale, this.options.particleRounding, lockValue),
            rotate: _getRoundedValue3D.call(this, rotate, DEFAULT.rotate, this.options.particleRounding, lockValue)
        });
    } else if (translate) {
        if (!spec.transform) {
            spec.transform = Transform.translate(translateX, translateY, translateZ);
        } else {
            spec.transform[12] = translateX;
            spec.transform[13] = translateY;
            spec.transform[14] = translateZ;
        }
    } else {
        spec.transform = undefined;
    }
    return this._spec;
};
function _setPropertyValue(prop, propName, endState, defaultValue, immediate, isTranslate) {
    prop = prop || this._properties[propName];
    if (prop && prop.init) {
        prop.invalidated = true;
        var value = defaultValue;
        if (endState !== undefined) {
            value = endState;
        } else if (this._removing) {
            value = prop.particle.getPosition();
        }
        prop.endState.x = value[0];
        prop.endState.y = value.length > 1 ? value[1] : 0;
        prop.endState.z = value.length > 2 ? value[2] : 0;
        if (immediate) {
            prop.curState.x = prop.endState.x;
            prop.curState.y = prop.endState.y;
            prop.curState.z = prop.endState.z;
            prop.velocity.x = 0;
            prop.velocity.y = 0;
            prop.velocity.z = 0;
        } else if (prop.endState.x !== prop.curState.x || prop.endState.y !== prop.curState.y || prop.endState.z !== prop.curState.z) {
            this._pe.wake();
        }
        return;
    } else {
        var wasSleeping = this._pe.isSleeping();
        if (!prop) {
            prop = {
                particle: new Particle({ position: this._initial || immediate ? endState : defaultValue }),
                endState: new Vector(endState)
            };
            prop.curState = prop.particle.position;
            prop.velocity = prop.particle.velocity;
            prop.force = new Spring(this.options.spring);
            prop.force.setOptions({ anchor: prop.endState });
            this._pe.addBody(prop.particle);
            prop.forceId = this._pe.attach(prop.force, prop.particle);
            this._properties[propName] = prop;
        } else {
            prop.particle.setPosition(this._initial || immediate ? endState : defaultValue);
            prop.endState.set(endState);
        }
        if (!this._initial && !immediate) {
            this._pe.wake();
        } else if (wasSleeping) {
            this._pe.sleep();
        }
        prop.init = true;
        prop.invalidated = true;
    }
}
function _getIfNE2D(a1, a2) {
    return a1[0] === a2[0] && a1[1] === a2[1] ? undefined : a1;
}
function _getIfNE3D(a1, a2) {
    return a1[0] === a2[0] && a1[1] === a2[1] && a1[2] === a2[2] ? undefined : a1;
}
FlowLayoutNode.prototype.set = function (set, defaultSize) {
    if (defaultSize) {
        this._removing = false;
    }
    this._invalidated = true;
    this.scrollLength = set.scrollLength;
    this._specModified = true;
    var prop = this._properties.opacity;
    var value = set.opacity === DEFAULT.opacity ? undefined : set.opacity;
    if (value !== undefined || prop && prop.init) {
        _setPropertyValue.call(this, prop, 'opacity', value === undefined ? undefined : [
            value,
            0
        ], DEFAULT.opacity2D);
    }
    prop = this._properties.align;
    value = set.align ? _getIfNE2D(set.align, DEFAULT.align) : undefined;
    if (value || prop && prop.init) {
        _setPropertyValue.call(this, prop, 'align', value, DEFAULT.align);
    }
    prop = this._properties.origin;
    value = set.origin ? _getIfNE2D(set.origin, DEFAULT.origin) : undefined;
    if (value || prop && prop.init) {
        _setPropertyValue.call(this, prop, 'origin', value, DEFAULT.origin);
    }
    prop = this._properties.size;
    value = set.size || defaultSize;
    if (value || prop && prop.init) {
        _setPropertyValue.call(this, prop, 'size', value, defaultSize, this.usesTrueSize);
    }
    prop = this._properties.translate;
    value = set.translate;
    if (value || prop && prop.init) {
        _setPropertyValue.call(this, prop, 'translate', value, DEFAULT.translate, undefined, true);
    }
    prop = this._properties.scale;
    value = set.scale ? _getIfNE3D(set.scale, DEFAULT.scale) : undefined;
    if (value || prop && prop.init) {
        _setPropertyValue.call(this, prop, 'scale', value, DEFAULT.scale);
    }
    prop = this._properties.rotate;
    value = set.rotate ? _getIfNE3D(set.rotate, DEFAULT.rotate) : undefined;
    if (value || prop && prop.init) {
        _setPropertyValue.call(this, prop, 'rotate', value, DEFAULT.rotate);
    }
    prop = this._properties.skew;
    value = set.skew ? _getIfNE3D(set.skew, DEFAULT.skew) : undefined;
    if (value || prop && prop.init) {
        _setPropertyValue.call(this, prop, 'skew', value, DEFAULT.skew);
    }
};
module.exports = FlowLayoutNode;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./LayoutNode":6}],4:[function(require,module,exports){
function LayoutContext(methods) {
    for (var n in methods) {
        this[n] = methods[n];
    }
}
LayoutContext.prototype.size = undefined;
LayoutContext.prototype.direction = undefined;
LayoutContext.prototype.scrollOffset = undefined;
LayoutContext.prototype.scrollStart = undefined;
LayoutContext.prototype.scrollEnd = undefined;
LayoutContext.prototype.next = function () {
};
LayoutContext.prototype.prev = function () {
};
LayoutContext.prototype.get = function (node) {
};
LayoutContext.prototype.set = function (node, set) {
};
LayoutContext.prototype.resolveSize = function (node) {
};
module.exports = LayoutContext;
},{}],5:[function(require,module,exports){
(function (global){
var Utility = typeof window !== 'undefined' ? window.famous.utilities.Utility : typeof global !== 'undefined' ? global.famous.utilities.Utility : null;
var Entity = typeof window !== 'undefined' ? window.famous.core.Entity : typeof global !== 'undefined' ? global.famous.core.Entity : null;
var ViewSequence = typeof window !== 'undefined' ? window.famous.core.ViewSequence : typeof global !== 'undefined' ? global.famous.core.ViewSequence : null;
var OptionsManager = typeof window !== 'undefined' ? window.famous.core.OptionsManager : typeof global !== 'undefined' ? global.famous.core.OptionsManager : null;
var EventHandler = typeof window !== 'undefined' ? window.famous.core.EventHandler : typeof global !== 'undefined' ? global.famous.core.EventHandler : null;
var LayoutUtility = require('./LayoutUtility');
var LayoutNodeManager = require('./LayoutNodeManager');
var LayoutNode = require('./LayoutNode');
var FlowLayoutNode = require('./FlowLayoutNode');
var Transform = typeof window !== 'undefined' ? window.famous.core.Transform : typeof global !== 'undefined' ? global.famous.core.Transform : null;
require('./helpers/LayoutDockHelper');
function LayoutController(options, nodeManager) {
    this.id = Entity.register(this);
    this._isDirty = true;
    this._contextSizeCache = [
        0,
        0
    ];
    this._commitOutput = {};
    this._eventInput = new EventHandler();
    EventHandler.setInputHandler(this, this._eventInput);
    this._eventOutput = new EventHandler();
    EventHandler.setOutputHandler(this, this._eventOutput);
    this._layout = { options: Object.create({}) };
    this._layout.optionsManager = new OptionsManager(this._layout.options);
    this._layout.optionsManager.on('change', function () {
        this._isDirty = true;
    }.bind(this));
    this.options = Object.create(LayoutController.DEFAULT_OPTIONS);
    this._optionsManager = new OptionsManager(this.options);
    if (nodeManager) {
        this._nodes = nodeManager;
    } else if (options && options.flow) {
        this._nodes = new LayoutNodeManager(FlowLayoutNode, _initFlowLayoutNode.bind(this));
    } else {
        this._nodes = new LayoutNodeManager(LayoutNode);
    }
    this.setDirection(undefined);
    if (options) {
        this.setOptions(options);
    }
}
LayoutController.DEFAULT_OPTIONS = {
    nodeSpring: {
        dampingRatio: 0.8,
        period: 300
    },
    reflowOnResize: true
};
function _initFlowLayoutNode(node, spec) {
    if (!spec && this.options.insertSpec) {
        node.setSpec(this.options.insertSpec);
    }
}
LayoutController.prototype.setOptions = function setOptions(options) {
    if (options.alignment !== undefined && options.alignment !== this.options.alignment) {
        this._isDirty = true;
    }
    this._optionsManager.setOptions(options);
    if (options.dataSource) {
        this.setDataSource(options.dataSource);
    }
    if (options.layout) {
        this.setLayout(options.layout, options.layoutOptions);
    } else if (options.layoutOptions) {
        this.setLayoutOptions(options.layoutOptions);
    }
    if (options.direction !== undefined) {
        this.setDirection(options.direction);
    }
    if (options.nodeSpring && this.options.flow) {
        this._nodes.setNodeOptions({ spring: options.nodeSpring });
    }
    if (options.preallocateNodes) {
        this._nodes.preallocateNodes(options.preallocateNodes.count || 0, options.preallocateNodes.spec);
    }
    return this;
};
function _forEachRenderable(callback) {
    var dataSource = this._dataSource;
    if (dataSource instanceof Array) {
        for (var i = 0, j = dataSource.length; i < j; i++) {
            callback(dataSource[i]);
        }
    } else if (dataSource instanceof ViewSequence) {
        var renderable;
        while (dataSource) {
            renderable = dataSource.get();
            if (!renderable) {
                break;
            }
            callback(renderable);
            dataSource = dataSource.getNext();
        }
    } else {
        for (var key in dataSource) {
            callback(dataSource[key]);
        }
    }
}
LayoutController.prototype.setDataSource = function (dataSource) {
    this._dataSource = dataSource;
    this._nodesById = undefined;
    if (dataSource instanceof Array) {
        this._viewSequence = new ViewSequence(dataSource);
    } else if (dataSource instanceof ViewSequence || dataSource.getNext) {
        this._viewSequence = dataSource;
    } else if (dataSource instanceof Object) {
        this._nodesById = dataSource;
    }
    if (this.options.autoPipeEvents) {
        if (this._dataSource.pipe) {
            this._dataSource.pipe(this);
            this._dataSource.pipe(this._eventOutput);
        } else {
            _forEachRenderable.call(this, function (renderable) {
                if (renderable && renderable.pipe) {
                    renderable.pipe(this);
                    renderable.pipe(this._eventOutput);
                }
            }.bind(this));
        }
    }
    this._isDirty = true;
    return this;
};
LayoutController.prototype.getDataSource = function () {
    return this._dataSource;
};
LayoutController.prototype.setLayout = function (layout, options) {
    if (layout instanceof Function) {
        this._layout._function = layout;
        this._layout.capabilities = layout.Capabilities;
        this._layout.literal = undefined;
    } else if (layout instanceof Object) {
        this._layout.literal = layout;
        this._layout.capabilities = undefined;
        var helperName = Object.keys(layout)[0];
        var Helper = LayoutUtility.getRegisteredHelper(helperName);
        this._layout._function = Helper ? function (context, options2) {
            var helper = new Helper(context, options2);
            helper.parse(layout[helperName]);
        } : undefined;
    } else {
        this._layout._function = undefined;
        this._layout.capabilities = undefined;
        this._layout.literal = undefined;
    }
    if (options) {
        this.setLayoutOptions(options);
    }
    this.setDirection(this._configuredDirection);
    this._isDirty = true;
    return this;
};
LayoutController.prototype.getLayout = function () {
    return this._layout.literal || this._layout._function;
};
LayoutController.prototype.setLayoutOptions = function (options) {
    this._layout.optionsManager.setOptions(options);
    return this;
};
LayoutController.prototype.getLayoutOptions = function () {
    return this._layout.options;
};
function _getActualDirection(direction) {
    if (this._layout.capabilities && this._layout.capabilities.direction) {
        if (Array.isArray(this._layout.capabilities.direction)) {
            for (var i = 0; i < this._layout.capabilities.direction.length; i++) {
                if (this._layout.capabilities.direction[i] === direction) {
                    return direction;
                }
            }
            return this._layout.capabilities.direction[0];
        } else {
            return this._layout.capabilities.direction;
        }
    }
    return direction === undefined ? Utility.Direction.Y : direction;
}
LayoutController.prototype.setDirection = function (direction) {
    this._configuredDirection = direction;
    var newDirection = _getActualDirection.call(this, direction);
    if (newDirection !== this._direction) {
        this._direction = newDirection;
        this._isDirty = true;
    }
};
LayoutController.prototype.getDirection = function (actual) {
    return actual ? this._direction : this._configuredDirection;
};
LayoutController.prototype.getSpec = function (node, normalize) {
    if (!node) {
        return undefined;
    }
    if (node instanceof String || typeof node === 'string') {
        if (!this._nodesById) {
            return undefined;
        }
        node = this._nodesById[node];
        if (!node) {
            return undefined;
        }
        if (node instanceof Array) {
            return node;
        }
    }
    if (this._specs) {
        for (var i = 0; i < this._specs.length; i++) {
            var spec = this._specs[i];
            if (spec.renderNode === node) {
                if (normalize && spec.transform && spec.size && (spec.align || spec.origin)) {
                    var transform = spec.transform;
                    if (spec.align && (spec.align[0] || spec.align[1])) {
                        transform = Transform.thenMove(transform, [
                            spec.align[0] * this._contextSizeCache[0],
                            spec.align[1] * this._contextSizeCache[1],
                            0
                        ]);
                    }
                    if (spec.origin && (spec.origin[0] || spec.origin[1])) {
                        transform = Transform.moveThen([
                            -spec.origin[0] * spec.size[0],
                            -spec.origin[1] * spec.size[1],
                            0
                        ], transform);
                    }
                    return {
                        opacity: spec.opacity,
                        size: spec.size,
                        transform: transform
                    };
                }
                return spec;
            }
        }
    }
    return undefined;
};
LayoutController.prototype.reflowLayout = function () {
    this._isDirty = true;
    return this;
};
LayoutController.prototype.insert = function (indexOrId, renderable, insertSpec) {
    if (indexOrId instanceof String || typeof indexOrId === 'string') {
        if (this._dataSource === undefined) {
            this._dataSource = {};
            this._nodesById = this._dataSource;
        }
        if (this._nodesById[indexOrId] === renderable) {
            return;
        }
        this._nodesById[indexOrId] = renderable;
    } else {
        if (this._dataSource === undefined) {
            this._dataSource = [];
            this._viewSequence = new ViewSequence(this._dataSource);
        }
        var dataSource = this._viewSequence || this._dataSource;
        if (indexOrId === -1) {
            dataSource.push(renderable);
        } else if (indexOrId === 0) {
            if (dataSource === this._viewSequence) {
                dataSource.splice(0, 0, renderable);
                if (this._viewSequence.getIndex() === 0) {
                    var nextViewSequence = this._viewSequence.getNext();
                    if (nextViewSequence && nextViewSequence.get()) {
                        this._viewSequence = nextViewSequence;
                    }
                }
            } else {
                dataSource.splice(0, 0, renderable);
            }
        } else {
            dataSource.splice(indexOrId, 0, renderable);
        }
    }
    if (insertSpec) {
        this._nodes.insertNode(this._nodes.createNode(renderable, insertSpec));
    }
    if (this.options.autoPipeEvents && renderable && renderable.pipe) {
        renderable.pipe(this);
        renderable.pipe(this._eventOutput);
    }
    this._isDirty = true;
    return this;
};
LayoutController.prototype.push = function (renderable, insertSpec) {
    return this.insert(-1, renderable, insertSpec);
};
function _getViewSequenceAtIndex(index) {
    var viewSequence = this._viewSequence;
    var i = viewSequence ? viewSequence.getIndex() : index;
    if (index > i) {
        while (viewSequence) {
            viewSequence = viewSequence.getNext();
            if (!viewSequence) {
                return undefined;
            }
            i = viewSequence.getIndex();
            if (i === index) {
                return viewSequence;
            } else if (index < i) {
                return undefined;
            }
        }
    } else if (index < i) {
        while (viewSequence) {
            viewSequence = viewSequence.getPrevious();
            if (!viewSequence) {
                return undefined;
            }
            i = viewSequence.getIndex();
            if (i === index) {
                return viewSequence;
            } else if (index > i) {
                return undefined;
            }
        }
    }
    return viewSequence;
}
LayoutController.prototype.get = function (indexOrId) {
    if (this._nodesById || indexOrId instanceof String || typeof indexOrId === 'string') {
        return this._nodesById[indexOrId];
    }
    var viewSequence = _getViewSequenceAtIndex.call(this, indexOrId);
    return viewSequence ? viewSequence.get() : undefined;
};
LayoutController.prototype.swap = function (index, index2) {
    if (this._viewSequence) {
        _getViewSequenceAtIndex.call(this, index).swap(_getViewSequenceAtIndex.call(this, index2));
        this._isDirty = true;
    }
    return this;
};
LayoutController.prototype.remove = function (indexOrId, removeSpec) {
    var renderNode;
    if (this._nodesById || indexOrId instanceof String || typeof indexOrId === 'string') {
        renderNode = this._nodesById[indexOrId];
        if (renderNode) {
            delete this._nodesById[indexOrId];
        }
    } else {
        renderNode = this._dataSource.splice(indexOrId, 1)[0];
    }
    if (renderNode && removeSpec) {
        var node = this._nodes.getNodeByRenderNode(renderNode);
        if (node) {
            node.remove(removeSpec || this.options.removeSpec);
        }
    }
    if (renderNode) {
        this._isDirty = true;
    }
    return this;
};
LayoutController.prototype.removeAll = function (removeSpec) {
    if (this._nodesById) {
        var dirty = false;
        for (var key in this._nodesById) {
            delete this._nodesById[key];
            dirty = true;
        }
        if (dirty) {
            this._isDirty = true;
        }
    } else if (this._dataSource) {
        this.setDataSource([]);
    }
    if (removeSpec) {
        var node = this._nodes.getStartEnumNode();
        while (node) {
            node.remove(removeSpec || this.options.removeSpec);
            node = node._next;
        }
    }
    return this;
};
LayoutController.prototype.getSize = function () {
    return this._size || this.options.size;
};
LayoutController.prototype.render = function render() {
    return this.id;
};
LayoutController.prototype.commit = function commit(context) {
    var transform = context.transform;
    var origin = context.origin;
    var size = context.size;
    var opacity = context.opacity;
    if (size[0] !== this._contextSizeCache[0] || size[1] !== this._contextSizeCache[1] || this._isDirty || this._nodes._trueSizeRequested || this.options.alwaysLayout) {
        var eventData = {
                target: this,
                oldSize: this._contextSizeCache,
                size: size,
                dirty: this._isDirty,
                trueSizeRequested: this._nodes._trueSizeRequested
            };
        this._eventOutput.emit('layoutstart', eventData);
        if (this.options.flow && (this._isDirty || this.options.reflowOnResize && (size[0] !== this._contextSizeCache[0] || size[1] !== this._contextSizeCache[1]))) {
            var node = this._nodes.getStartEnumNode();
            while (node) {
                node.releaseLock();
                node = node._next;
            }
        }
        this._contextSizeCache[0] = size[0];
        this._contextSizeCache[1] = size[1];
        this._isDirty = false;
        var scrollEnd;
        if (this.options.size && this.options.size[this._direction] === true) {
            scrollEnd = 1000000;
        }
        var layoutContext = this._nodes.prepareForLayout(this._viewSequence, this._nodesById, {
                size: size,
                direction: this._direction,
                scrollEnd: scrollEnd
            });
        if (this._layout._function) {
            this._layout._function(layoutContext, this._layout.options);
        }
        this._nodes.removeNonInvalidatedNodes(this.options.removeSpec);
        this._nodes.removeVirtualViewSequenceNodes();
        if (scrollEnd) {
            scrollEnd = 0;
            node = this._nodes.getStartEnumNode();
            while (node) {
                if (node._invalidated && node.scrollLength) {
                    scrollEnd += node.scrollLength;
                }
                node = node._next;
            }
            this._size = this._size || [
                0,
                0
            ];
            this._size[0] = this.options.size[0];
            this._size[1] = this.options.size[1];
            this._size[this._direction] = scrollEnd;
        }
        var result = this._nodes.buildSpecAndDestroyUnrenderedNodes();
        this._commitOutput.target = result.specs;
        this._eventOutput.emit('reflow', { target: this });
        this._eventOutput.emit('layoutend', eventData);
    } else if (this.options.flow) {
        result = this._nodes.buildSpecAndDestroyUnrenderedNodes();
        this._commitOutput.target = result.specs;
        if (result.modified) {
            this._eventOutput.emit('reflow', { target: this });
        }
    }
    this._specs = this._commitOutput.target;
    var target = this._commitOutput.target;
    for (var i = 0, j = target.length; i < j; i++) {
        target[i].target = target[i].renderNode.render();
    }
    if (origin && (origin[0] !== 0 || origin[1] !== 0)) {
        transform = Transform.moveThen([
            -size[0] * origin[0],
            -size[1] * origin[1],
            0
        ], transform);
    }
    this._commitOutput.size = size;
    this._commitOutput.opacity = opacity;
    this._commitOutput.transform = transform;
    return this._commitOutput;
};
module.exports = LayoutController;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./FlowLayoutNode":3,"./LayoutNode":6,"./LayoutNodeManager":7,"./LayoutUtility":8,"./helpers/LayoutDockHelper":11}],6:[function(require,module,exports){
(function (global){
var Transform = typeof window !== 'undefined' ? window.famous.core.Transform : typeof global !== 'undefined' ? global.famous.core.Transform : null;
var LayoutUtility = require('./LayoutUtility');
function LayoutNode(renderNode, spec) {
    this.renderNode = renderNode;
    this._spec = spec ? LayoutUtility.cloneSpec(spec) : {};
    this._spec.renderNode = renderNode;
    this._specModified = true;
    this._invalidated = false;
    this._removing = false;
}
LayoutNode.prototype.setOptions = function (options) {
};
LayoutNode.prototype.destroy = function () {
    this.renderNode = undefined;
    this._spec.renderNode = undefined;
    this._viewSequence = undefined;
};
LayoutNode.prototype.reset = function () {
    this._invalidated = false;
    this.trueSizeRequested = false;
};
LayoutNode.prototype.setSpec = function (spec) {
    this._specModified = true;
    if (spec.align) {
        if (!spec.align) {
            this._spec.align = [
                0,
                0
            ];
        }
        this._spec.align[0] = spec.align[0];
        this._spec.align[1] = spec.align[1];
    } else {
        this._spec.align = undefined;
    }
    if (spec.origin) {
        if (!spec.origin) {
            this._spec.origin = [
                0,
                0
            ];
        }
        this._spec.origin[0] = spec.origin[0];
        this._spec.origin[1] = spec.origin[1];
    } else {
        this._spec.origin = undefined;
    }
    if (spec.size) {
        if (!spec.size) {
            this._spec.size = [
                0,
                0
            ];
        }
        this._spec.size[0] = spec.size[0];
        this._spec.size[1] = spec.size[1];
    } else {
        this._spec.size = undefined;
    }
    if (spec.transform) {
        if (!spec.transform) {
            this._spec.transform = spec.transform.slice(0);
        } else {
            for (var i = 0; i < 16; i++) {
                this._spec.transform[0] = spec.transform[0];
            }
        }
    } else {
        this._spec.transform = undefined;
    }
    this._spec.opacity = spec.opacity;
};
LayoutNode.prototype.set = function (set, size) {
    this._invalidated = true;
    this._specModified = true;
    this._removing = false;
    var spec = this._spec;
    spec.opacity = set.opacity;
    if (set.size) {
        if (!spec.size) {
            spec.size = [
                0,
                0
            ];
        }
        spec.size[0] = set.size[0];
        spec.size[1] = set.size[1];
    } else {
        spec.size = undefined;
    }
    if (set.origin) {
        if (!spec.origin) {
            spec.origin = [
                0,
                0
            ];
        }
        spec.origin[0] = set.origin[0];
        spec.origin[1] = set.origin[1];
    } else {
        spec.origin = undefined;
    }
    if (set.align) {
        if (!spec.align) {
            spec.align = [
                0,
                0
            ];
        }
        spec.align[0] = set.align[0];
        spec.align[1] = set.align[1];
    } else {
        spec.align = undefined;
    }
    if (set.skew || set.rotate || set.scale) {
        this._spec.transform = Transform.build({
            translate: set.translate || [
                0,
                0,
                0
            ],
            skew: set.skew || [
                0,
                0,
                0
            ],
            scale: set.scale || [
                1,
                1,
                1
            ],
            rotate: set.rotate || [
                0,
                0,
                0
            ]
        });
    } else if (set.translate) {
        this._spec.transform = Transform.translate(set.translate[0], set.translate[1], set.translate[2]);
    } else {
        this._spec.transform = undefined;
    }
    this.scrollLength = set.scrollLength;
};
LayoutNode.prototype.getSpec = function () {
    this._specModified = false;
    this._spec.removed = !this._invalidated;
    return this._spec;
};
LayoutNode.prototype.remove = function (removeSpec) {
    this._removing = true;
};
module.exports = LayoutNode;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./LayoutUtility":8}],7:[function(require,module,exports){
var LayoutContext = require('./LayoutContext');
var LayoutUtility = require('./LayoutUtility');
var MAX_POOL_SIZE = 100;
function LayoutNodeManager(LayoutNode, initLayoutNodeFn) {
    this.LayoutNode = LayoutNode;
    this._initLayoutNodeFn = initLayoutNodeFn;
    this._layoutCount = 0;
    this._context = new LayoutContext({
        next: _contextNext.bind(this),
        prev: _contextPrev.bind(this),
        get: _contextGet.bind(this),
        set: _contextSet.bind(this),
        resolveSize: _contextResolveSize.bind(this),
        size: [
            0,
            0
        ]
    });
    this._contextState = {};
    this._pool = {
        layoutNodes: { size: 0 },
        resolveSize: [
            0,
            0
        ]
    };
}
LayoutNodeManager.prototype.prepareForLayout = function (viewSequence, nodesById, contextData) {
    var node = this._first;
    while (node) {
        node.reset();
        node = node._next;
    }
    var context = this._context;
    this._layoutCount++;
    this._nodesById = nodesById;
    this._trueSizeRequested = false;
    this._reevalTrueSize = contextData.reevalTrueSize || !context.size || context.size[0] !== contextData.size[0] || context.size[1] !== contextData.size[1];
    var contextState = this._contextState;
    contextState.startSequence = viewSequence;
    contextState.nextSequence = viewSequence;
    contextState.prevSequence = viewSequence;
    contextState.start = undefined;
    contextState.nextGetIndex = 0;
    contextState.prevGetIndex = 0;
    contextState.nextSetIndex = 0;
    contextState.prevSetIndex = 0;
    contextState.addCount = 0;
    contextState.removeCount = 0;
    context.size[0] = contextData.size[0];
    context.size[1] = contextData.size[1];
    context.direction = contextData.direction;
    context.reverse = contextData.reverse;
    context.alignment = contextData.reverse ? 1 : 0;
    context.scrollOffset = contextData.scrollOffset || 0;
    context.scrollStart = contextData.scrollStart || 0;
    context.scrollEnd = contextData.scrollEnd || context.size[context.direction];
    return context;
};
LayoutNodeManager.prototype.removeNonInvalidatedNodes = function (removeSpec) {
    var node = this._first;
    while (node) {
        if (!node._invalidated && !node._removing) {
            node.remove(removeSpec);
        }
        node = node._next;
    }
};
LayoutNodeManager.prototype.removeVirtualViewSequenceNodes = function () {
    if (this._contextState.startSequence && this._contextState.startSequence.cleanup) {
        this._contextState.startSequence.cleanup();
    }
};
LayoutNodeManager.prototype.buildSpecAndDestroyUnrenderedNodes = function (translate) {
    var specs = [];
    var result = {
            specs: specs,
            modified: false
        };
    var node = this._first;
    while (node) {
        var modified = node._specModified;
        var spec = node.getSpec();
        if (spec.removed) {
            var destroyNode = node;
            node = node._next;
            _destroyNode.call(this, destroyNode);
            result.modified = true;
        } else {
            if (modified) {
                if (spec.transform && translate) {
                    spec.transform[12] += translate[0];
                    spec.transform[13] += translate[1];
                    spec.transform[14] += translate[2];
                    spec.transform[12] = Math.round(spec.transform[12] * 100000) / 100000;
                    spec.transform[13] = Math.round(spec.transform[13] * 100000) / 100000;
                }
                result.modified = true;
            }
            specs.push(spec);
            node = node._next;
        }
    }
    this._contextState.addCount = 0;
    this._contextState.removeCount = 0;
    return result;
};
LayoutNodeManager.prototype.getNodeByRenderNode = function (renderable) {
    var node = this._first;
    while (node) {
        if (node.renderNode === renderable) {
            return node;
        }
        node = node._next;
    }
    return undefined;
};
LayoutNodeManager.prototype.insertNode = function (node) {
    node._next = this._first;
    if (this._first) {
        this._first._prev = node;
    }
    this._first = node;
};
LayoutNodeManager.prototype.setNodeOptions = function (options) {
    this._nodeOptions = options;
    var node = this._first;
    while (node) {
        node.setOptions(options);
        node = node._next;
    }
    node = this._pool.layoutNodes.first;
    while (node) {
        node.setOptions(options);
        node = node._next;
    }
};
LayoutNodeManager.prototype.preallocateNodes = function (count, spec) {
    var nodes = [];
    for (var i = 0; i < count; i++) {
        nodes.push(this.createNode(undefined, spec));
    }
    for (i = 0; i < count; i++) {
        _destroyNode.call(this, nodes[i]);
    }
};
LayoutNodeManager.prototype.createNode = function (renderNode, spec) {
    var node;
    if (this._pool.layoutNodes.first) {
        node = this._pool.layoutNodes.first;
        this._pool.layoutNodes.first = node._next;
        this._pool.layoutNodes.size--;
        node.constructor.apply(node, arguments);
    } else {
        node = new this.LayoutNode(renderNode, spec);
        if (this._nodeOptions) {
            node.setOptions(this._nodeOptions);
        }
    }
    node._prev = undefined;
    node._next = undefined;
    node._viewSequence = undefined;
    node._layoutCount = 0;
    if (this._initLayoutNodeFn) {
        this._initLayoutNodeFn.call(this, node, spec);
    }
    return node;
};
function _destroyNode(node) {
    if (node._next) {
        node._next._prev = node._prev;
    }
    if (node._prev) {
        node._prev._next = node._next;
    } else {
        this._first = node._next;
    }
    node.destroy();
    if (this._pool.layoutNodes.size < MAX_POOL_SIZE) {
        this._pool.layoutNodes.size++;
        node._prev = undefined;
        node._next = this._pool.layoutNodes.first;
        this._pool.layoutNodes.first = node;
    }
}
LayoutNodeManager.prototype.getStartEnumNode = function (next) {
    if (next === undefined) {
        return this._first;
    } else if (next === true) {
        return this._contextState.start && this._contextState.startPrev ? this._contextState.start._next : this._contextState.start;
    } else if (next === false) {
        return this._contextState.start && !this._contextState.startPrev ? this._contextState.start._prev : this._contextState.start;
    }
};
function _contextGetCreateAndOrderNodes(renderNode, prev) {
    var node;
    var state = this._contextState;
    if (!state.start) {
        node = this._first;
        while (node) {
            if (node.renderNode === renderNode) {
                break;
            }
            node = node._next;
        }
        if (!node) {
            node = this.createNode(renderNode);
            node._next = this._first;
            if (this._first) {
                this._first._prev = node;
            }
            this._first = node;
        }
        state.start = node;
        state.startPrev = prev;
        state.prev = node;
        state.next = node;
        return node;
    }
    if (prev) {
        if (state.prev._prev && state.prev._prev.renderNode === renderNode) {
            state.prev = state.prev._prev;
            return state.prev;
        }
    } else {
        if (state.next._next && state.next._next.renderNode === renderNode) {
            state.next = state.next._next;
            return state.next;
        }
    }
    node = this._first;
    while (node) {
        if (node.renderNode === renderNode) {
            break;
        }
        node = node._next;
    }
    if (!node) {
        node = this.createNode(renderNode);
    } else {
        if (node._next) {
            node._next._prev = node._prev;
        }
        if (node._prev) {
            node._prev._next = node._next;
        } else {
            this._first = node._next;
        }
        node._next = undefined;
        node._prev = undefined;
    }
    if (prev) {
        if (state.prev._prev) {
            node._prev = state.prev._prev;
            state.prev._prev._next = node;
        } else {
            this._first = node;
        }
        state.prev._prev = node;
        node._next = state.prev;
        state.prev = node;
    } else {
        if (state.next._next) {
            node._next = state.next._next;
            state.next._next._prev = node;
        }
        state.next._next = node;
        node._prev = state.next;
        state.next = node;
    }
    return node;
}
function _contextNext() {
    if (!this._contextState.nextSequence) {
        return undefined;
    }
    if (this._context.reverse) {
        this._contextState.nextSequence = this._contextState.nextSequence.getNext();
        if (!this._contextState.nextSequence) {
            return undefined;
        }
    }
    var renderNode = this._contextState.nextSequence.get();
    if (!renderNode) {
        this._contextState.nextSequence = undefined;
        return undefined;
    }
    var nextSequence = this._contextState.nextSequence;
    if (!this._context.reverse) {
        this._contextState.nextSequence = this._contextState.nextSequence.getNext();
    }
    return {
        renderNode: renderNode,
        viewSequence: nextSequence,
        next: true,
        index: ++this._contextState.nextGetIndex
    };
}
function _contextPrev() {
    if (!this._contextState.prevSequence) {
        return undefined;
    }
    if (!this._context.reverse) {
        this._contextState.prevSequence = this._contextState.prevSequence.getPrevious();
        if (!this._contextState.prevSequence) {
            return undefined;
        }
    }
    var renderNode = this._contextState.prevSequence.get();
    if (!renderNode) {
        this._contextState.prevSequence = undefined;
        return undefined;
    }
    var prevSequence = this._contextState.prevSequence;
    if (this._context.reverse) {
        this._contextState.prevSequence = this._contextState.prevSequence.getPrevious();
    }
    return {
        renderNode: renderNode,
        viewSequence: prevSequence,
        prev: true,
        index: --this._contextState.prevGetIndex
    };
}
function _contextGet(contextNodeOrId) {
    if (this._nodesById && (contextNodeOrId instanceof String || typeof contextNodeOrId === 'string')) {
        var renderNode = this._nodesById[contextNodeOrId];
        if (!renderNode) {
            return undefined;
        }
        if (renderNode instanceof Array) {
            var result = [];
            for (var i = 0, j = renderNode.length; i < j; i++) {
                result.push({
                    renderNode: renderNode[i],
                    arrayElement: true
                });
            }
            return result;
        }
        return {
            renderNode: renderNode,
            byId: true
        };
    } else {
        return contextNodeOrId;
    }
}
function _contextSet(contextNodeOrId, set) {
    var contextNode = this._nodesById ? _contextGet.call(this, contextNodeOrId) : contextNodeOrId;
    if (contextNode) {
        var node = contextNode.node;
        if (!node) {
            if (contextNode.next) {
                if (contextNode.index < this._contextState.nextSetIndex) {
                    LayoutUtility.error('Nodes must be layed out in the same order as they were requested!');
                }
                this._contextState.nextSetIndex = contextNode.index;
            } else if (contextNode.prev) {
                if (contextNode.index > this._contextState.prevSetIndex) {
                    LayoutUtility.error('Nodes must be layed out in the same order as they were requested!');
                }
                this._contextState.prevSetIndex = contextNode.index;
            }
            node = _contextGetCreateAndOrderNodes.call(this, contextNode.renderNode, contextNode.prev);
            node._viewSequence = contextNode.viewSequence;
            node._layoutCount++;
            if (node._layoutCount === 1) {
                this._contextState.addCount++;
            }
            contextNode.node = node;
        }
        node.usesTrueSize = contextNode.usesTrueSize;
        node.trueSizeRequested = contextNode.trueSizeRequested;
        node.set(set, this._context.size);
        contextNode.set = set;
    }
    return set;
}
function _contextResolveSize(contextNodeOrId, parentSize) {
    var contextNode = this._nodesById ? _contextGet.call(this, contextNodeOrId) : contextNodeOrId;
    var resolveSize = this._pool.resolveSize;
    if (!contextNode) {
        resolveSize[0] = 0;
        resolveSize[1] = 0;
        return resolveSize;
    }
    var renderNode = contextNode.renderNode;
    var size = renderNode.getSize();
    if (!size) {
        return parentSize;
    }
    var configSize = renderNode.size && renderNode._trueSizeCheck !== undefined ? renderNode.size : undefined;
    if (configSize && (configSize[0] === true || configSize[1] === true)) {
        contextNode.usesTrueSize = true;
        var backupSize = renderNode._backupSize;
        if (renderNode._trueSizeCheck) {
            if (backupSize && configSize !== size) {
                var newWidth = configSize[0] === true ? Math.max(backupSize[0], size[0]) : size[0];
                var newHeight = configSize[1] === true ? Math.max(backupSize[1], size[1]) : size[1];
                if (newWidth !== backupSize[0] || newHeight !== backupSize[1]) {
                    this._trueSizeRequested = true;
                    contextNode.trueSizeRequested = true;
                }
                backupSize[0] = newWidth;
                backupSize[1] = newHeight;
                size = backupSize;
                renderNode._backupSize = undefined;
                backupSize = undefined;
            } else {
                this._trueSizeRequested = true;
                contextNode.trueSizeRequested = true;
            }
        }
        if (this._reevalTrueSize || backupSize && (backupSize[0] !== size[0] || backupSize[1] !== size[1])) {
            renderNode._trueSizeCheck = true;
            renderNode._sizeDirty = true;
            this._trueSizeRequested = true;
        }
        if (!backupSize) {
            renderNode._backupSize = [
                0,
                0
            ];
            backupSize = renderNode._backupSize;
        }
        backupSize[0] = size[0];
        backupSize[1] = size[1];
    }
    configSize = renderNode._nodes ? renderNode.options.size : undefined;
    if (configSize && (configSize[0] === true || configSize[1] === true)) {
        if (this._reevalTrueSize || renderNode._nodes._trueSizeRequested) {
            contextNode.usesTrueSize = true;
            contextNode.trueSizeRequested = true;
            this._trueSizeRequested = true;
        }
    }
    if (size[0] === undefined || size[0] === true || size[1] === undefined || size[1] === true) {
        resolveSize[0] = size[0];
        resolveSize[1] = size[1];
        size = resolveSize;
        if (size[0] === undefined) {
            size[0] = parentSize[0];
        } else if (size[0] === true) {
            size[0] = 0;
            this._trueSizeRequested = true;
            contextNode.trueSizeRequested = true;
        }
        if (size[1] === undefined) {
            size[1] = parentSize[1];
        } else if (size[1] === true) {
            size[1] = 0;
            this._trueSizeRequested = true;
            contextNode.trueSizeRequested = true;
        }
    }
    return size;
}
module.exports = LayoutNodeManager;
},{"./LayoutContext":4,"./LayoutUtility":8}],8:[function(require,module,exports){
(function (global){
var Utility = typeof window !== 'undefined' ? window.famous.utilities.Utility : typeof global !== 'undefined' ? global.famous.utilities.Utility : null;
function LayoutUtility() {
}
LayoutUtility.registeredHelpers = {};
var Capabilities = {
        SEQUENCE: 1,
        DIRECTION_X: 2,
        DIRECTION_Y: 4,
        SCROLLING: 8
    };
LayoutUtility.Capabilities = Capabilities;
LayoutUtility.normalizeMargins = function (margins) {
    if (!margins) {
        return [
            0,
            0,
            0,
            0
        ];
    } else if (!Array.isArray(margins)) {
        return [
            margins,
            margins,
            margins,
            margins
        ];
    } else if (margins.length === 0) {
        return [
            0,
            0,
            0,
            0
        ];
    } else if (margins.length === 1) {
        return [
            margins[0],
            margins[0],
            margins[0],
            margins[0]
        ];
    } else if (margins.length === 2) {
        return [
            margins[0],
            margins[1],
            margins[0],
            margins[1]
        ];
    } else {
        return margins;
    }
};
LayoutUtility.cloneSpec = function (spec) {
    var clone = {};
    if (spec.opacity !== undefined) {
        clone.opacity = spec.opacity;
    }
    if (spec.size !== undefined) {
        clone.size = spec.size.slice(0);
    }
    if (spec.transform !== undefined) {
        clone.transform = spec.transform.slice(0);
    }
    if (spec.origin !== undefined) {
        clone.origin = spec.origin.slice(0);
    }
    if (spec.align !== undefined) {
        clone.align = spec.align.slice(0);
    }
    return clone;
};
function _isEqualArray(a, b) {
    if (a === b) {
        return true;
    }
    if (a === undefined || b === undefined) {
        return false;
    }
    var i = a.length;
    if (i !== b.length) {
        return false;
    }
    while (i--) {
        if (a[i] !== b[i]) {
            return false;
        }
    }
    return true;
}
LayoutUtility.isEqualSpec = function (spec1, spec2) {
    if (spec1.opacity !== spec2.opacity) {
        return false;
    }
    if (!_isEqualArray(spec1.size, spec2.size)) {
        return false;
    }
    if (!_isEqualArray(spec1.transform, spec2.transform)) {
        return false;
    }
    if (!_isEqualArray(spec1.origin, spec2.origin)) {
        return false;
    }
    if (!_isEqualArray(spec1.align, spec2.align)) {
        return false;
    }
    return true;
};
LayoutUtility.getSpecDiffText = function (spec1, spec2) {
    var result = 'spec diff:';
    if (spec1.opacity !== spec2.opacity) {
        result += '\nopacity: ' + spec1.opacity + ' != ' + spec2.opacity;
    }
    if (!_isEqualArray(spec1.size, spec2.size)) {
        result += '\nsize: ' + JSON.stringify(spec1.size) + ' != ' + JSON.stringify(spec2.size);
    }
    if (!_isEqualArray(spec1.transform, spec2.transform)) {
        result += '\ntransform: ' + JSON.stringify(spec1.transform) + ' != ' + JSON.stringify(spec2.transform);
    }
    if (!_isEqualArray(spec1.origin, spec2.origin)) {
        result += '\norigin: ' + JSON.stringify(spec1.origin) + ' != ' + JSON.stringify(spec2.origin);
    }
    if (!_isEqualArray(spec1.align, spec2.align)) {
        result += '\nalign: ' + JSON.stringify(spec1.align) + ' != ' + JSON.stringify(spec2.align);
    }
    return result;
};
LayoutUtility.error = function (message) {
    console.log('ERROR: ' + message);
    throw message;
};
LayoutUtility.warning = function (message) {
    console.log('WARNING: ' + message);
};
LayoutUtility.log = function (args) {
    var message = '';
    for (var i = 0; i < arguments.length; i++) {
        var arg = arguments[i];
        if (arg instanceof Object || arg instanceof Array) {
            message += JSON.stringify(arg);
        } else {
            message += arg;
        }
    }
    console.log(message);
};
LayoutUtility.combineOptions = function (options1, options2, forceClone) {
    if (options1 && !options2 && !forceClone) {
        return options1;
    } else if (!options1 && options2 && !forceClone) {
        return options2;
    }
    var options = Utility.clone(options1 || {});
    if (options2) {
        for (var key in options2) {
            options[key] = options2[key];
        }
    }
    return options;
};
LayoutUtility.registerHelper = function (name, Helper) {
    if (!Helper.prototype.parse) {
        LayoutUtility.error('The layout-helper for name "' + name + '" is required to support the "parse" method');
    }
    if (this.registeredHelpers[name] !== undefined) {
        LayoutUtility.warning('A layout-helper with the name "' + name + '" is already registered and will be overwritten');
    }
    this.registeredHelpers[name] = Helper;
};
LayoutUtility.unregisterHelper = function (name) {
    delete this.registeredHelpers[name];
};
LayoutUtility.getRegisteredHelper = function (name) {
    return this.registeredHelpers[name];
};
module.exports = LayoutUtility;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],9:[function(require,module,exports){
(function (global){
var LayoutUtility = require('./LayoutUtility');
var LayoutController = require('./LayoutController');
var LayoutNode = require('./LayoutNode');
var FlowLayoutNode = require('./FlowLayoutNode');
var LayoutNodeManager = require('./LayoutNodeManager');
var ContainerSurface = typeof window !== 'undefined' ? window.famous.surfaces.ContainerSurface : typeof global !== 'undefined' ? global.famous.surfaces.ContainerSurface : null;
var Transform = typeof window !== 'undefined' ? window.famous.core.Transform : typeof global !== 'undefined' ? global.famous.core.Transform : null;
var EventHandler = typeof window !== 'undefined' ? window.famous.core.EventHandler : typeof global !== 'undefined' ? global.famous.core.EventHandler : null;
var Group = typeof window !== 'undefined' ? window.famous.core.Group : typeof global !== 'undefined' ? global.famous.core.Group : null;
var Vector = typeof window !== 'undefined' ? window.famous.math.Vector : typeof global !== 'undefined' ? global.famous.math.Vector : null;
var PhysicsEngine = typeof window !== 'undefined' ? window.famous.physics.PhysicsEngine : typeof global !== 'undefined' ? global.famous.physics.PhysicsEngine : null;
var Particle = typeof window !== 'undefined' ? window.famous.physics.bodies.Particle : typeof global !== 'undefined' ? global.famous.physics.bodies.Particle : null;
var Drag = typeof window !== 'undefined' ? window.famous.physics.forces.Drag : typeof global !== 'undefined' ? global.famous.physics.forces.Drag : null;
var Spring = typeof window !== 'undefined' ? window.famous.physics.forces.Spring : typeof global !== 'undefined' ? global.famous.physics.forces.Spring : null;
var ScrollSync = typeof window !== 'undefined' ? window.famous.inputs.ScrollSync : typeof global !== 'undefined' ? global.famous.inputs.ScrollSync : null;
var ViewSequence = typeof window !== 'undefined' ? window.famous.core.ViewSequence : typeof global !== 'undefined' ? global.famous.core.ViewSequence : null;
var Bounds = {
        NONE: 0,
        PREV: 1,
        NEXT: 2,
        BOTH: 3
    };
var SpringSource = {
        NONE: 'none',
        NEXTBOUNDS: 'next-bounds',
        PREVBOUNDS: 'prev-bounds',
        MINSIZE: 'minimal-size',
        GOTOSEQUENCE: 'goto-sequence',
        ENSUREVISIBLE: 'ensure-visible',
        GOTOPREVDIRECTION: 'goto-prev-direction',
        GOTONEXTDIRECTION: 'goto-next-direction'
    };
var PaginationMode = {
        PAGE: 0,
        SCROLL: 1
    };
function ScrollController(options) {
    options = LayoutUtility.combineOptions(ScrollController.DEFAULT_OPTIONS, options);
    var layoutManager = new LayoutNodeManager(options.flow ? FlowLayoutNode : LayoutNode, _initLayoutNode.bind(this));
    LayoutController.call(this, options, layoutManager);
    this._scroll = {
        activeTouches: [],
        pe: new PhysicsEngine(),
        particle: new Particle(this.options.scrollParticle),
        dragForce: new Drag(this.options.scrollDrag),
        frictionForce: new Drag(this.options.scrollFriction),
        springValue: undefined,
        springForce: new Spring(this.options.scrollSpring),
        springEndState: new Vector([
            0,
            0,
            0
        ]),
        groupStart: 0,
        groupTranslate: [
            0,
            0,
            0
        ],
        scrollDelta: 0,
        normalizedScrollDelta: 0,
        scrollForce: 0,
        scrollForceCount: 0,
        unnormalizedScrollOffset: 0,
        isScrolling: false
    };
    this._debug = {
        layoutCount: 0,
        commitCount: 0
    };
    this.group = new Group();
    this.group.add({ render: _innerRender.bind(this) });
    this._scroll.pe.addBody(this._scroll.particle);
    if (!this.options.scrollDrag.disabled) {
        this._scroll.dragForceId = this._scroll.pe.attach(this._scroll.dragForce, this._scroll.particle);
    }
    if (!this.options.scrollFriction.disabled) {
        this._scroll.frictionForceId = this._scroll.pe.attach(this._scroll.frictionForce, this._scroll.particle);
    }
    this._scroll.springForce.setOptions({ anchor: this._scroll.springEndState });
    this._eventInput.on('touchstart', _touchStart.bind(this));
    this._eventInput.on('touchmove', _touchMove.bind(this));
    this._eventInput.on('touchend', _touchEnd.bind(this));
    this._eventInput.on('touchcancel', _touchEnd.bind(this));
    this._eventInput.on('mousedown', _mouseDown.bind(this));
    this._eventInput.on('mouseup', _mouseUp.bind(this));
    this._eventInput.on('mousemove', _mouseMove.bind(this));
    this._scrollSync = new ScrollSync(this.options.scrollSync);
    this._eventInput.pipe(this._scrollSync);
    this._scrollSync.on('update', _scrollUpdate.bind(this));
    if (this.options.useContainer) {
        this.container = new ContainerSurface(this.options.container);
        this.container.add({
            render: function () {
                return this.id;
            }.bind(this)
        });
        if (!this.options.autoPipeEvents) {
            this.subscribe(this.container);
            EventHandler.setInputHandler(this.container, this);
            EventHandler.setOutputHandler(this.container, this);
        }
    }
}
ScrollController.prototype = Object.create(LayoutController.prototype);
ScrollController.prototype.constructor = ScrollController;
ScrollController.Bounds = Bounds;
ScrollController.PaginationMode = PaginationMode;
ScrollController.DEFAULT_OPTIONS = {
    flow: false,
    useContainer: false,
    container: { properties: { overflow: 'hidden' } },
    visibleItemThresshold: 0.5,
    scrollParticle: {},
    scrollDrag: {
        forceFunction: Drag.FORCE_FUNCTIONS.QUADRATIC,
        strength: 0.001,
        disabled: true
    },
    scrollFriction: {
        forceFunction: Drag.FORCE_FUNCTIONS.LINEAR,
        strength: 0.0025,
        disabled: false
    },
    scrollSpring: {
        dampingRatio: 1,
        period: 350
    },
    scrollSync: { scale: 0.2 },
    overscroll: true,
    paginated: false,
    paginationMode: PaginationMode.PAGE,
    paginationEnergyThresshold: 0.01,
    alignment: 0,
    touchMoveDirectionThresshold: undefined,
    touchMoveNoVelocityDuration: 100,
    mouseMove: false,
    enabled: true,
    layoutAll: false,
    alwaysLayout: false,
    extraBoundsSpace: [
        100,
        100
    ],
    debug: false
};
ScrollController.prototype.setOptions = function (options) {
    LayoutController.prototype.setOptions.call(this, options);
    if (this._scroll) {
        if (options.scrollSpring) {
            this._scroll.springForce.setOptions(options.scrollSpring);
        }
        if (options.scrollDrag) {
            this._scroll.dragForce.setOptions(options.scrollDrag);
        }
    }
    if (options.scrollSync && this._scrollSync) {
        this._scrollSync.setOptions(options.scrollSync);
    }
    return this;
};
function _initLayoutNode(node, spec) {
    if (!spec && this.options.insertSpec) {
        node.setSpec(this.options.insertSpec);
    }
}
function _updateSpring() {
    var springValue = this._scroll.scrollForceCount ? undefined : this._scroll.springPosition;
    if (this._scroll.springValue !== springValue) {
        this._scroll.springValue = springValue;
        if (springValue === undefined) {
            if (this._scroll.springForceId !== undefined) {
                this._scroll.pe.detach(this._scroll.springForceId);
                this._scroll.springForceId = undefined;
            }
        } else {
            if (this._scroll.springForceId === undefined) {
                this._scroll.springForceId = this._scroll.pe.attach(this._scroll.springForce, this._scroll.particle);
            }
            this._scroll.springEndState.set1D(springValue);
            this._scroll.pe.wake();
        }
    }
}
function _mouseDown(event) {
    if (!this.options.mouseMove) {
        return;
    }
    if (this._scroll.mouseMove) {
        this.releaseScrollForce(this._scroll.mouseMove.delta);
    }
    var current = [
            event.clientX,
            event.clientY
        ];
    var time = Date.now();
    this._scroll.mouseMove = {
        delta: 0,
        start: current,
        current: current,
        prev: current,
        time: time,
        prevTime: time
    };
    this.applyScrollForce(this._scroll.mouseMove.delta);
}
function _mouseMove(event) {
    if (!this._scroll.mouseMove || !this.options.enabled) {
        return;
    }
    var moveDirection = Math.atan2(Math.abs(event.clientY - this._scroll.mouseMove.prev[1]), Math.abs(event.clientX - this._scroll.mouseMove.prev[0])) / (Math.PI / 2);
    var directionDiff = Math.abs(this._direction - moveDirection);
    if (this.options.touchMoveDirectionThresshold === undefined || directionDiff <= this.options.touchMoveDirectionThresshold) {
        this._scroll.mouseMove.prev = this._scroll.mouseMove.current;
        this._scroll.mouseMove.current = [
            event.clientX,
            event.clientY
        ];
        this._scroll.mouseMove.prevTime = this._scroll.mouseMove.time;
        this._scroll.mouseMove.direction = moveDirection;
        this._scroll.mouseMove.time = Date.now();
    }
    var delta = this._scroll.mouseMove.current[this._direction] - this._scroll.mouseMove.start[this._direction];
    this.updateScrollForce(this._scroll.mouseMove.delta, delta);
    this._scroll.mouseMove.delta = delta;
}
function _mouseUp(event) {
    if (!this._scroll.mouseMove) {
        return;
    }
    var velocity = 0;
    var diffTime = this._scroll.mouseMove.time - this._scroll.mouseMove.prevTime;
    if (diffTime > 0 && Date.now() - this._scroll.mouseMove.time <= this.options.touchMoveNoVelocityDuration) {
        var diffOffset = this._scroll.mouseMove.current[this._direction] - this._scroll.mouseMove.prev[this._direction];
        velocity = diffOffset / diffTime;
    }
    this.releaseScrollForce(this._scroll.mouseMove.delta, velocity);
    this._scroll.mouseMove = undefined;
}
function _touchStart(event) {
    if (!this._touchEndEventListener) {
        this._touchEndEventListener = function (event2) {
            event2.target.removeEventListener('touchend', this._touchEndEventListener);
            _touchEnd.call(this, event2);
        }.bind(this);
    }
    var oldTouchesCount = this._scroll.activeTouches.length;
    var i = 0;
    var j;
    var touchFound;
    while (i < this._scroll.activeTouches.length) {
        var activeTouch = this._scroll.activeTouches[i];
        touchFound = false;
        for (j = 0; j < event.touches.length; j++) {
            var touch = event.touches[j];
            if (touch.identifier === activeTouch.id) {
                touchFound = true;
                break;
            }
        }
        if (!touchFound) {
            this._scroll.activeTouches.splice(i, 1);
        } else {
            i++;
        }
    }
    for (i = 0; i < event.touches.length; i++) {
        var changedTouch = event.touches[i];
        touchFound = false;
        for (j = 0; j < this._scroll.activeTouches.length; j++) {
            if (this._scroll.activeTouches[j].id === changedTouch.identifier) {
                touchFound = true;
                break;
            }
        }
        if (!touchFound) {
            var current = [
                    changedTouch.clientX,
                    changedTouch.clientY
                ];
            var time = Date.now();
            this._scroll.activeTouches.push({
                id: changedTouch.identifier,
                start: current,
                current: current,
                prev: current,
                time: time,
                prevTime: time
            });
            changedTouch.target.addEventListener('touchend', this._touchEndEventListener);
        }
    }
    if (!oldTouchesCount && this._scroll.activeTouches.length) {
        this.applyScrollForce(0);
        this._scroll.touchDelta = 0;
    }
}
function _touchMove(event) {
    if (!this.options.enabled) {
        return;
    }
    var primaryTouch;
    for (var i = 0; i < event.changedTouches.length; i++) {
        var changedTouch = event.changedTouches[i];
        for (var j = 0; j < this._scroll.activeTouches.length; j++) {
            var touch = this._scroll.activeTouches[j];
            if (touch.id === changedTouch.identifier) {
                var moveDirection = Math.atan2(Math.abs(changedTouch.clientY - touch.prev[1]), Math.abs(changedTouch.clientX - touch.prev[0])) / (Math.PI / 2);
                var directionDiff = Math.abs(this._direction - moveDirection);
                if (this.options.touchMoveDirectionThresshold === undefined || directionDiff <= this.options.touchMoveDirectionThresshold) {
                    touch.prev = touch.current;
                    touch.current = [
                        changedTouch.clientX,
                        changedTouch.clientY
                    ];
                    touch.prevTime = touch.time;
                    touch.direction = moveDirection;
                    touch.time = Date.now();
                    primaryTouch = j === 0 ? touch : undefined;
                }
            }
        }
    }
    if (primaryTouch) {
        var delta = primaryTouch.current[this._direction] - primaryTouch.start[this._direction];
        this.updateScrollForce(this._scroll.touchDelta, delta);
        this._scroll.touchDelta = delta;
    }
}
function _touchEnd(event) {
    var primaryTouch = this._scroll.activeTouches.length ? this._scroll.activeTouches[0] : undefined;
    for (var i = 0; i < event.changedTouches.length; i++) {
        var changedTouch = event.changedTouches[i];
        for (var j = 0; j < this._scroll.activeTouches.length; j++) {
            var touch = this._scroll.activeTouches[j];
            if (touch.id === changedTouch.identifier) {
                this._scroll.activeTouches.splice(j, 1);
                if (j === 0 && this._scroll.activeTouches.length) {
                    var newPrimaryTouch = this._scroll.activeTouches[0];
                    newPrimaryTouch.start[0] = newPrimaryTouch.current[0] - (touch.current[0] - touch.start[0]);
                    newPrimaryTouch.start[1] = newPrimaryTouch.current[1] - (touch.current[1] - touch.start[1]);
                }
                break;
            }
        }
    }
    if (!primaryTouch || this._scroll.activeTouches.length) {
        return;
    }
    var velocity = 0;
    var diffTime = primaryTouch.time - primaryTouch.prevTime;
    if (diffTime > 0 && Date.now() - primaryTouch.time <= this.options.touchMoveNoVelocityDuration) {
        var diffOffset = primaryTouch.current[this._direction] - primaryTouch.prev[this._direction];
        velocity = diffOffset / diffTime;
    }
    var delta = this._scroll.touchDelta;
    this.releaseScrollForce(delta, velocity);
    this._scroll.touchDelta = 0;
}
function _scrollUpdate(event) {
    if (!this.options.enabled) {
        return;
    }
    var offset = Array.isArray(event.delta) ? event.delta[this._direction] : event.delta;
    this.scroll(offset);
}
function _setParticle(position, velocity, phase) {
    if (position !== undefined) {
        this._scroll.particleValue = position;
        this._scroll.particle.setPosition1D(position);
    }
    if (velocity !== undefined) {
        var oldVelocity = this._scroll.particle.getVelocity1D();
        if (oldVelocity !== velocity) {
            this._scroll.particle.setVelocity1D(velocity);
        }
    }
}
function _calcScrollOffset(normalize, refreshParticle) {
    if (refreshParticle || this._scroll.particleValue === undefined) {
        this._scroll.particleValue = this._scroll.particle.getPosition1D();
        this._scroll.particleValue = Math.round(this._scroll.particleValue * 1000) / 1000;
    }
    var scrollOffset = this._scroll.particleValue;
    if (this._scroll.scrollDelta || this._scroll.normalizedScrollDelta) {
        scrollOffset += this._scroll.scrollDelta + this._scroll.normalizedScrollDelta;
        if (this._scroll.boundsReached & Bounds.PREV && scrollOffset > this._scroll.springPosition || this._scroll.boundsReached & Bounds.NEXT && scrollOffset < this._scroll.springPosition || this._scroll.boundsReached === Bounds.BOTH) {
            scrollOffset = this._scroll.springPosition;
        }
        if (normalize) {
            if (!this._scroll.scrollDelta) {
                this._scroll.normalizedScrollDelta = 0;
                _setParticle.call(this, scrollOffset, undefined, '_calcScrollOffset');
            }
            this._scroll.normalizedScrollDelta += this._scroll.scrollDelta;
            this._scroll.scrollDelta = 0;
        }
    }
    if (this._scroll.scrollForceCount && this._scroll.scrollForce) {
        if (this._scroll.springPosition !== undefined) {
            scrollOffset = (scrollOffset + this._scroll.scrollForce + this._scroll.springPosition) / 2;
        } else {
            scrollOffset += this._scroll.scrollForce;
        }
    }
    if (!this.options.overscroll) {
        if (this._scroll.boundsReached === Bounds.BOTH || this._scroll.boundsReached === Bounds.PREV && scrollOffset > this._scroll.springPosition || this._scroll.boundsReached === Bounds.NEXT && scrollOffset < this._scroll.springPosition) {
            scrollOffset = this._scroll.springPosition;
        }
    }
    return scrollOffset;
}
ScrollController.prototype._calcScrollHeight = function (next, lastNodeOnly) {
    var calcedHeight = 0;
    var node = this._nodes.getStartEnumNode(next);
    while (node) {
        if (node._invalidated) {
            if (node.trueSizeRequested) {
                calcedHeight = undefined;
                break;
            }
            if (node.scrollLength !== undefined) {
                calcedHeight = lastNodeOnly ? node.scrollLength : calcedHeight + node.scrollLength;
                if (!next && lastNodeOnly) {
                    break;
                }
            }
        }
        node = next ? node._next : node._prev;
    }
    return calcedHeight;
};
function _calcBounds(size, scrollOffset) {
    var prevHeight = this._calcScrollHeight(false);
    var nextHeight = this._calcScrollHeight(true);
    var enforeMinSize = this._layout.capabilities && this._layout.capabilities.sequentialScrollingOptimized;
    if (prevHeight === undefined || nextHeight === undefined) {
        this._scroll.boundsReached = Bounds.NONE;
        this._scroll.springPosition = undefined;
        this._scroll.springSource = SpringSource.NONE;
        return;
    }
    var totalHeight;
    if (enforeMinSize) {
        if (nextHeight !== undefined && prevHeight !== undefined) {
            totalHeight = prevHeight + nextHeight;
        }
        if (totalHeight !== undefined && totalHeight <= size[this._direction]) {
            this._scroll.boundsReached = Bounds.BOTH;
            this._scroll.springPosition = this.options.alignment ? -nextHeight : prevHeight;
            this._scroll.springSource = SpringSource.MINSIZE;
            return;
        }
    }
    if (this.options.alignment) {
        if (enforeMinSize) {
            if (nextHeight !== undefined && scrollOffset + nextHeight <= 0) {
                this._scroll.boundsReached = Bounds.NEXT;
                this._scroll.springPosition = -nextHeight;
                this._scroll.springSource = SpringSource.NEXTBOUNDS;
                return;
            }
        } else {
            var firstPrevItemHeight = this._calcScrollHeight(false, true);
            if (nextHeight !== undefined && firstPrevItemHeight && scrollOffset + nextHeight + size[this._direction] <= firstPrevItemHeight) {
                this._scroll.boundsReached = Bounds.NEXT;
                this._scroll.springPosition = nextHeight - (size[this._direction] - firstPrevItemHeight);
                this._scroll.springSource = SpringSource.NEXTBOUNDS;
                return;
            }
        }
    } else {
        if (prevHeight !== undefined && scrollOffset - prevHeight >= 0) {
            this._scroll.boundsReached = Bounds.PREV;
            this._scroll.springPosition = prevHeight;
            this._scroll.springSource = SpringSource.PREVBOUNDS;
            return;
        }
    }
    if (this.options.alignment) {
        if (prevHeight !== undefined && scrollOffset - prevHeight >= -size[this._direction]) {
            this._scroll.boundsReached = Bounds.PREV;
            this._scroll.springPosition = -size[this._direction] + prevHeight;
            this._scroll.springSource = SpringSource.PREVBOUNDS;
            return;
        }
    } else {
        var nextBounds = enforeMinSize ? size[this._direction] : this._calcScrollHeight(true, true);
        if (nextHeight !== undefined && scrollOffset + nextHeight <= nextBounds) {
            this._scroll.boundsReached = Bounds.NEXT;
            this._scroll.springPosition = nextBounds - nextHeight;
            this._scroll.springSource = SpringSource.NEXTBOUNDS;
            return;
        }
    }
    this._scroll.boundsReached = Bounds.NONE;
    this._scroll.springPosition = undefined;
    this._scroll.springSource = SpringSource.NONE;
}
function _calcScrollToOffset(size, scrollOffset) {
    var scrollToRenderNode = this._scroll.scrollToRenderNode || this._scroll.ensureVisibleRenderNode;
    if (!scrollToRenderNode) {
        return;
    }
    if (this._scroll.boundsReached === Bounds.BOTH || !this._scroll.scrollToDirection && this._scroll.boundsReached === Bounds.PREV || this._scroll.scrollToDirection && this._scroll.boundsReached === Bounds.NEXT) {
        return;
    }
    var foundNode;
    var scrollToOffset = 0;
    var node = this._nodes.getStartEnumNode(true);
    var count = 0;
    while (node) {
        count++;
        if (!node._invalidated || node.scrollLength === undefined) {
            break;
        }
        if (this.options.alignment) {
            scrollToOffset -= node.scrollLength;
        }
        if (node.renderNode === scrollToRenderNode) {
            foundNode = node;
            break;
        }
        if (!this.options.alignment) {
            scrollToOffset -= node.scrollLength;
        }
        node = node._next;
    }
    if (!foundNode) {
        scrollToOffset = 0;
        node = this._nodes.getStartEnumNode(false);
        while (node) {
            if (!node._invalidated || node.scrollLength === undefined) {
                break;
            }
            if (!this.options.alignment) {
                scrollToOffset += node.scrollLength;
            }
            if (node.renderNode === scrollToRenderNode) {
                foundNode = node;
                break;
            }
            if (this.options.alignment) {
                scrollToOffset += node.scrollLength;
            }
            node = node._prev;
        }
    }
    if (foundNode) {
        if (this._scroll.ensureVisibleSequence) {
            if (this.options.alignment) {
                if (scrollToOffset - foundNode.scrollLength < 0) {
                    this._scroll.springPosition = scrollToOffset;
                    this._scroll.springSource = SpringSource.ENSUREVISIBLE;
                } else if (scrollToOffset > size[this._direction]) {
                    this._scroll.springPosition = size[this._direction] - scrollToOffset;
                    this._scroll.springSource = SpringSource.ENSUREVISIBLE;
                } else {
                    this._scroll.ensureVisibleRenderNode = undefined;
                }
            } else {
                scrollToOffset = -scrollToOffset;
                if (scrollToOffset < 0) {
                    this._scroll.springPosition = scrollToOffset;
                    this._scroll.springSource = SpringSource.ENSUREVISIBLE;
                } else if (scrollToOffset + foundNode.scrollLength > size[this._direction]) {
                    this._scroll.springPosition = size[this._direction] - (scrollToOffset + foundNode.scrollLength);
                    this._scroll.springSource = SpringSource.ENSUREVISIBLE;
                } else {
                    this._scroll.ensureVisibleRenderNode = undefined;
                }
            }
        } else {
            this._scroll.springPosition = scrollToOffset;
            this._scroll.springSource = SpringSource.GOTOSEQUENCE;
        }
        return;
    }
    if (this._scroll.scrollToDirection) {
        this._scroll.springPosition = scrollOffset - size[this._direction];
        this._scroll.springSource = SpringSource.GOTONEXTDIRECTION;
    } else {
        this._scroll.springPosition = scrollOffset + size[this._direction];
        this._scroll.springSource = SpringSource.GOTOPREVDIRECTION;
    }
    if (this._viewSequence.cleanup) {
        var viewSequence = this._viewSequence;
        while (viewSequence.get() !== scrollToRenderNode) {
            viewSequence = this._scroll.scrollToDirection ? viewSequence.getNext(true) : viewSequence.getPrevious(true);
            if (!viewSequence) {
                break;
            }
        }
    }
}
function _snapToPage() {
    if (!this.options.paginated || this._scroll.scrollForceCount || this._scroll.springPosition !== undefined) {
        return;
    }
    var item;
    switch (this.options.paginationMode) {
    case PaginationMode.SCROLL:
        if (!this.options.paginationEnergyThresshold || Math.abs(this._scroll.particle.getEnergy()) <= this.options.paginationEnergyThresshold) {
            item = this.options.alignment ? this.getLastVisibleItem() : this.getFirstVisibleItem();
            if (item && item.renderNode) {
                this.goToRenderNode(item.renderNode);
            }
        }
        break;
    case PaginationMode.PAGE:
        item = this.options.alignment ? this.getLastVisibleItem() : this.getFirstVisibleItem();
        if (item && item.renderNode) {
            this.goToRenderNode(item.renderNode);
        }
        break;
    }
}
function _normalizePrevViewSequence(scrollOffset) {
    var count = 0;
    var normalizedScrollOffset = scrollOffset;
    var normalizeNextPrev = false;
    var node = this._nodes.getStartEnumNode(false);
    while (node) {
        if (!node._invalidated || !node._viewSequence) {
            break;
        }
        if (normalizeNextPrev) {
            this._viewSequence = node._viewSequence;
            normalizedScrollOffset = scrollOffset;
            normalizeNextPrev = false;
        }
        if (node.scrollLength === undefined || node.trueSizeRequested || scrollOffset < 0) {
            break;
        }
        scrollOffset -= node.scrollLength;
        count++;
        if (node.scrollLength) {
            if (this.options.alignment) {
                normalizeNextPrev = scrollOffset >= 0;
            } else {
                this._viewSequence = node._viewSequence;
                normalizedScrollOffset = scrollOffset;
            }
        }
        node = node._prev;
    }
    return normalizedScrollOffset;
}
function _normalizeNextViewSequence(scrollOffset) {
    var count = 0;
    var normalizedScrollOffset = scrollOffset;
    var node = this._nodes.getStartEnumNode(true);
    while (node) {
        if (!node._invalidated || node.scrollLength === undefined || node.trueSizeRequested || !node._viewSequence || scrollOffset > 0 && (!this.options.alignment || node.scrollLength !== 0)) {
            break;
        }
        if (this.options.alignment) {
            scrollOffset += node.scrollLength;
            count++;
        }
        if (node.scrollLength || this.options.alignment) {
            this._viewSequence = node._viewSequence;
            normalizedScrollOffset = scrollOffset;
        }
        if (!this.options.alignment) {
            scrollOffset += node.scrollLength;
            count++;
        }
        node = node._next;
    }
    return normalizedScrollOffset;
}
function _normalizeViewSequence(size, scrollOffset) {
    var caps = this._layout.capabilities;
    if (caps && caps.debug && caps.debug.normalize !== undefined && !caps.debug.normalize) {
        return scrollOffset;
    }
    if (this._scroll.scrollForceCount) {
        return scrollOffset;
    }
    var normalizedScrollOffset = scrollOffset;
    if (this.options.alignment && scrollOffset < 0) {
        normalizedScrollOffset = _normalizeNextViewSequence.call(this, scrollOffset);
    } else if (!this.options.alignment && scrollOffset > 0) {
        normalizedScrollOffset = _normalizePrevViewSequence.call(this, scrollOffset);
    }
    if (normalizedScrollOffset === scrollOffset) {
        if (this.options.alignment && scrollOffset > 0) {
            normalizedScrollOffset = _normalizePrevViewSequence.call(this, scrollOffset);
        } else if (!this.options.alignment && scrollOffset < 0) {
            normalizedScrollOffset = _normalizeNextViewSequence.call(this, scrollOffset);
        }
    }
    if (normalizedScrollOffset !== scrollOffset) {
        var delta = normalizedScrollOffset - scrollOffset;
        var particleValue = this._scroll.particle.getPosition1D();
        _setParticle.call(this, particleValue + delta, undefined, 'normalize');
        if (this._scroll.springPosition !== undefined) {
            this._scroll.springPosition += delta;
        }
        if (caps && caps.sequentialScrollingOptimized) {
            this._scroll.groupStart -= delta;
        }
    }
    return normalizedScrollOffset;
}
ScrollController.prototype.getVisibleItems = function () {
    var size = this._contextSizeCache;
    var scrollOffset = this.options.alignment ? this._scroll.unnormalizedScrollOffset + size[this._direction] : this._scroll.unnormalizedScrollOffset;
    var result = [];
    var node = this._nodes.getStartEnumNode(true);
    while (node) {
        if (!node._invalidated || node.scrollLength === undefined || scrollOffset > size[this._direction]) {
            break;
        }
        scrollOffset += node.scrollLength;
        if (scrollOffset >= 0 && node._viewSequence) {
            result.push({
                index: node._viewSequence.getIndex(),
                viewSequence: node._viewSequence,
                renderNode: node.renderNode,
                visiblePerc: node.scrollLength ? (Math.min(scrollOffset, size[this._direction]) - Math.max(scrollOffset - node.scrollLength, 0)) / node.scrollLength : 1,
                scrollOffset: scrollOffset - node.scrollLength,
                scrollLength: node.scrollLength,
                _node: node
            });
        }
        node = node._next;
    }
    scrollOffset = this.options.alignment ? this._scroll.unnormalizedScrollOffset + size[this._direction] : this._scroll.unnormalizedScrollOffset;
    node = this._nodes.getStartEnumNode(false);
    while (node) {
        if (!node._invalidated || node.scrollLength === undefined || scrollOffset < 0) {
            break;
        }
        scrollOffset -= node.scrollLength;
        if (scrollOffset < size[this._direction] && node._viewSequence) {
            result.unshift({
                index: node._viewSequence.getIndex(),
                viewSequence: node._viewSequence,
                renderNode: node.renderNode,
                visiblePerc: node.scrollLength ? (Math.min(scrollOffset + node.scrollLength, size[this._direction]) - Math.max(scrollOffset, 0)) / node.scrollLength : 1,
                scrollOffset: scrollOffset,
                scrollLength: node.scrollLength,
                _node: node
            });
        }
        node = node._prev;
    }
    return result;
};
ScrollController.prototype.getFirstVisibleItem = function (includeNode) {
    var size = this._contextSizeCache;
    var scrollOffset = this.options.alignment ? this._scroll.unnormalizedScrollOffset + size[this._direction] : this._scroll.unnormalizedScrollOffset;
    var node = this._nodes.getStartEnumNode(true);
    var nodeFoundVisiblePerc;
    var nodeFoundScrollOffset;
    var nodeFound;
    while (node) {
        if (!node._invalidated || node.scrollLength === undefined || scrollOffset > size[this._direction]) {
            break;
        }
        scrollOffset += node.scrollLength;
        if (scrollOffset >= 0 && node._viewSequence) {
            nodeFoundVisiblePerc = node.scrollLength ? (Math.min(scrollOffset, size[this._direction]) - Math.max(scrollOffset - node.scrollLength, 0)) / node.scrollLength : 1;
            nodeFoundScrollOffset = scrollOffset - node.scrollLength;
            if (nodeFoundVisiblePerc >= this.options.visibleItemThresshold || nodeFoundScrollOffset >= 0) {
                nodeFound = node;
                break;
            }
        }
        node = node._next;
    }
    scrollOffset = this.options.alignment ? this._scroll.unnormalizedScrollOffset + size[this._direction] : this._scroll.unnormalizedScrollOffset;
    node = this._nodes.getStartEnumNode(false);
    while (node) {
        if (!node._invalidated || node.scrollLength === undefined || scrollOffset < 0) {
            break;
        }
        scrollOffset -= node.scrollLength;
        if (scrollOffset < size[this._direction] && node._viewSequence) {
            var visiblePerc = node.scrollLength ? (Math.min(scrollOffset + node.scrollLength, size[this._direction]) - Math.max(scrollOffset, 0)) / node.scrollLength : 1;
            if (visiblePerc >= this.options.visibleItemThresshold || scrollOffset >= 0) {
                nodeFoundVisiblePerc = visiblePerc;
                nodeFoundScrollOffset = scrollOffset;
                nodeFound = node;
                break;
            }
        }
        node = node._prev;
    }
    return nodeFound ? {
        index: nodeFound._viewSequence.getIndex(),
        viewSequence: nodeFound._viewSequence,
        renderNode: nodeFound.renderNode,
        visiblePerc: nodeFoundVisiblePerc,
        scrollOffset: nodeFoundScrollOffset,
        scrollLength: nodeFound.scrollLength,
        _node: nodeFound
    } : undefined;
};
ScrollController.prototype.getLastVisibleItem = function () {
    var items = this.getVisibleItems();
    var size = this._contextSizeCache;
    for (var i = items.length - 1; i >= 0; i--) {
        var item = items[i];
        if (item.visiblePerc >= this.options.visibleItemThresshold || item.scrollOffset + item.scrollLength <= size[this._direction]) {
            return item;
        }
    }
    return items.length ? items[items.length - 1] : undefined;
};
function _scrollToSequence(viewSequence, next) {
    this._scroll.scrollToSequence = viewSequence;
    this._scroll.scrollToRenderNode = viewSequence.get();
    this._scroll.ensureVisibleRenderNode = undefined;
    this._scroll.scrollToDirection = next;
    this._scroll.scrollDirty = true;
}
function _ensureVisibleSequence(viewSequence, next) {
    this._scroll.scrollToSequence = undefined;
    this._scroll.scrollToRenderNode = undefined;
    this._scroll.ensureVisibleRenderNode = viewSequence.get();
    this._scroll.scrollToDirection = next;
    this._scroll.scrollDirty = true;
}
function _goToPage(amount) {
    var viewSequence = this._scroll.scrollToSequence || this._viewSequence;
    if (!this._scroll.scrollToSequence) {
        var firstVisibleItem = this.getFirstVisibleItem();
        if (firstVisibleItem) {
            viewSequence = firstVisibleItem.viewSequence;
            if (amount < 0 && firstVisibleItem.scrollOffset < 0 || amount > 0 && firstVisibleItem.scrollOffset > 0) {
                amount = 0;
            }
        }
    }
    if (!viewSequence) {
        return;
    }
    for (var i = 0; i < Math.abs(amount); i++) {
        var nextViewSequence = amount > 0 ? viewSequence.getNext() : viewSequence.getPrevious();
        if (nextViewSequence) {
            viewSequence = nextViewSequence;
        } else {
            break;
        }
    }
    _scrollToSequence.call(this, viewSequence, amount >= 0);
}
ScrollController.prototype.goToFirstPage = function () {
    if (!this._viewSequence) {
        return this;
    }
    if (this._viewSequence._ && this._viewSequence._.loop) {
        LayoutUtility.error('Unable to go to first item of looped ViewSequence');
        return this;
    }
    var viewSequence = this._viewSequence;
    while (viewSequence) {
        var prev = viewSequence.getPrevious();
        if (prev && prev.get()) {
            viewSequence = prev;
        } else {
            break;
        }
    }
    _scrollToSequence.call(this, viewSequence, false);
    return this;
};
ScrollController.prototype.goToPreviousPage = function () {
    _goToPage.call(this, -1);
    return this;
};
ScrollController.prototype.goToNextPage = function () {
    _goToPage.call(this, 1);
    return this;
};
ScrollController.prototype.goToLastPage = function () {
    if (!this._viewSequence) {
        return this;
    }
    if (this._viewSequence._ && this._viewSequence._.loop) {
        LayoutUtility.error('Unable to go to last item of looped ViewSequence');
        return this;
    }
    var viewSequence = this._viewSequence;
    while (viewSequence) {
        var next = viewSequence.getNext();
        if (next && next.get()) {
            viewSequence = next;
        } else {
            break;
        }
    }
    _scrollToSequence.call(this, viewSequence, true);
    return this;
};
ScrollController.prototype.goToRenderNode = function (node) {
    if (!this._viewSequence || !node) {
        return this;
    }
    if (this._viewSequence.get() === node) {
        var next = _calcScrollOffset.call(this) >= 0;
        _scrollToSequence.call(this, this._viewSequence, next);
        return this;
    }
    var nextSequence = this._viewSequence.getNext();
    var prevSequence = this._viewSequence.getPrevious();
    while ((nextSequence || prevSequence) && nextSequence !== this._viewSequence) {
        var nextNode = nextSequence ? nextSequence.get() : undefined;
        if (nextNode === node) {
            _scrollToSequence.call(this, nextSequence, true);
            break;
        }
        var prevNode = prevSequence ? prevSequence.get() : undefined;
        if (prevNode === node) {
            _scrollToSequence.call(this, prevSequence, false);
            break;
        }
        nextSequence = nextNode ? nextSequence.getNext() : undefined;
        prevSequence = prevNode ? prevSequence.getPrevious() : undefined;
    }
    return this;
};
ScrollController.prototype.ensureVisible = function (node) {
    if (node instanceof ViewSequence) {
        node = node.get();
    } else if (node instanceof Number || typeof node === 'number') {
        var viewSequence = this._viewSequence;
        while (viewSequence.getIndex() < node) {
            viewSequence = viewSequence.getNext();
            if (!viewSequence) {
                return this;
            }
        }
        while (viewSequence.getIndex() > node) {
            viewSequence = viewSequence.getPrevious();
            if (!viewSequence) {
                return this;
            }
        }
    }
    if (this._viewSequence.get() === node) {
        var next = _calcScrollOffset.call(this) >= 0;
        _ensureVisibleSequence.call(this, this._viewSequence, next);
        return this;
    }
    var nextSequence = this._viewSequence.getNext();
    var prevSequence = this._viewSequence.getPrevious();
    while ((nextSequence || prevSequence) && nextSequence !== this._viewSequence) {
        var nextNode = nextSequence ? nextSequence.get() : undefined;
        if (nextNode === node) {
            _ensureVisibleSequence.call(this, nextSequence, true);
            break;
        }
        var prevNode = prevSequence ? prevSequence.get() : undefined;
        if (prevNode === node) {
            _ensureVisibleSequence.call(this, prevSequence, false);
            break;
        }
        nextSequence = nextNode ? nextSequence.getNext() : undefined;
        prevSequence = prevNode ? prevSequence.getPrevious() : undefined;
    }
    return this;
};
ScrollController.prototype.scroll = function (delta) {
    this.halt();
    this._scroll.scrollDelta += delta;
    return this;
};
ScrollController.prototype.canScroll = function (delta) {
    var scrollOffset = _calcScrollOffset.call(this);
    var prevHeight = this._calcScrollHeight(false);
    var nextHeight = this._calcScrollHeight(true);
    var totalHeight;
    if (nextHeight !== undefined && prevHeight !== undefined) {
        totalHeight = prevHeight + nextHeight;
    }
    if (totalHeight !== undefined && totalHeight <= this._contextSizeCache[this._direction]) {
        return 0;
    }
    if (delta < 0 && nextHeight !== undefined) {
        var nextOffset = this._contextSizeCache[this._direction] - (scrollOffset + nextHeight);
        return Math.max(nextOffset, delta);
    } else if (delta > 0 && prevHeight !== undefined) {
        var prevOffset = -(scrollOffset - prevHeight);
        return Math.min(prevOffset, delta);
    }
    return delta;
};
ScrollController.prototype.halt = function () {
    this._scroll.scrollToSequence = undefined;
    this._scroll.scrollToRenderNode = undefined;
    this._scroll.ensureVisibleRenderNode = undefined;
    _setParticle.call(this, undefined, 0, 'halt');
    return this;
};
ScrollController.prototype.isScrolling = function () {
    return this._scroll.isScrolling;
};
ScrollController.prototype.getBoundsReached = function () {
    return this._scroll.boundsReached;
};
ScrollController.prototype.getVelocity = function () {
    return this._scroll.particle.getVelocity1D();
};
ScrollController.prototype.setVelocity = function (velocity) {
    return this._scroll.particle.setVelocity1D(velocity);
};
ScrollController.prototype.applyScrollForce = function (delta) {
    this.halt();
    if (this._scroll.scrollForceCount === 0) {
        this._scroll.scrollForceStartItem = this.alignment ? this.getLastVisibleItem() : this.getFirstVisibleItem();
    }
    this._scroll.scrollForceCount++;
    this._scroll.scrollForce += delta;
    return this;
};
ScrollController.prototype.updateScrollForce = function (prevDelta, newDelta) {
    this.halt();
    newDelta -= prevDelta;
    this._scroll.scrollForce += newDelta;
    return this;
};
ScrollController.prototype.releaseScrollForce = function (delta, velocity) {
    this.halt();
    if (this._scroll.scrollForceCount === 1) {
        var scrollOffset = _calcScrollOffset.call(this);
        _setParticle.call(this, scrollOffset, velocity, 'releaseScrollForce');
        this._scroll.pe.wake();
        this._scroll.scrollForce = 0;
        this._scroll.scrollDirty = true;
        if (this._scroll.scrollForceStartItem && this.options.paginated && this.options.paginationMode === PaginationMode.PAGE) {
            var item = this.alignment ? this.getLastVisibleItem() : this.getFirstVisibleItem();
            if (item.renderNode !== this._scroll.scrollForceStartItem.renderNode) {
                this.goToRenderNode(item.renderNode);
            } else if (this.options.paginationEnergyThresshold && Math.abs(this._scroll.particle.getEnergy()) >= this.options.paginationEnergyThresshold) {
                velocity = velocity || 0;
                if (velocity < 0 && item._node._next && item._node._next.renderNode) {
                    this.goToRenderNode(item._node._next.renderNode);
                } else if (velocity >= 0 && item._node._prev && item._node._prev.renderNode) {
                    this.goToRenderNode(item._node._prev.renderNode);
                }
            } else {
                this.goToRenderNode(item.renderNode);
            }
        }
        this._scroll.scrollForceStartItem = undefined;
    } else {
        this._scroll.scrollForce -= delta;
    }
    this._scroll.scrollForceCount--;
    return this;
};
ScrollController.prototype.getSpec = function (node, normalize) {
    var spec = LayoutController.prototype.getSpec.apply(this, arguments);
    if (spec && this._layout.capabilities && this._layout.capabilities.sequentialScrollingOptimized) {
        spec = {
            origin: spec.origin,
            align: spec.align,
            opacity: spec.opacity,
            size: spec.size,
            renderNode: spec.renderNode,
            transform: spec.transform
        };
        var translate = [
                0,
                0,
                0
            ];
        translate[this._direction] = this._scrollOffsetCache + this._scroll.groupStart;
        spec.transform = Transform.thenMove(spec.transform, translate);
    }
    return spec;
};
function _layout(size, scrollOffset, nested) {
    this._debug.layoutCount++;
    var scrollStart = 0 - Math.max(this.options.extraBoundsSpace[0], 1);
    var scrollEnd = size[this._direction] + Math.max(this.options.extraBoundsSpace[1], 1);
    if (this.options.layoutAll) {
        scrollStart = -1000000;
        scrollEnd = 1000000;
    }
    var layoutContext = this._nodes.prepareForLayout(this._viewSequence, this._nodesById, {
            size: size,
            direction: this._direction,
            reverse: this.options.alignment ? true : false,
            scrollOffset: this.options.alignment ? scrollOffset + size[this._direction] : scrollOffset,
            scrollStart: scrollStart,
            scrollEnd: scrollEnd
        });
    if (this._layout._function) {
        this._layout._function(layoutContext, this._layout.options);
    }
    this._scroll.unnormalizedScrollOffset = scrollOffset;
    if (this._postLayout) {
        this._postLayout(size, scrollOffset);
    }
    this._nodes.removeNonInvalidatedNodes(this.options.removeSpec);
    _calcBounds.call(this, size, scrollOffset);
    _calcScrollToOffset.call(this, size, scrollOffset);
    _snapToPage.call(this);
    var newScrollOffset = _calcScrollOffset.call(this, true);
    if (!nested && newScrollOffset !== scrollOffset) {
        return _layout.call(this, size, newScrollOffset, true);
    }
    scrollOffset = _normalizeViewSequence.call(this, size, scrollOffset);
    _updateSpring.call(this);
    this._nodes.removeVirtualViewSequenceNodes();
    return scrollOffset;
}
function _innerRender() {
    var specs = this._specs;
    for (var i3 = 0, j3 = specs.length; i3 < j3; i3++) {
        specs[i3].target = specs[i3].renderNode.render();
    }
    return specs;
}
ScrollController.prototype.commit = function commit(context) {
    var size = context.size;
    this._debug.commitCount++;
    var scrollOffset = _calcScrollOffset.call(this, true, true);
    if (this._scrollOffsetCache === undefined) {
        this._scrollOffsetCache = scrollOffset;
    }
    var emitEndScrollingEvent = false;
    var emitScrollEvent = false;
    var eventData;
    if (size[0] !== this._contextSizeCache[0] || size[1] !== this._contextSizeCache[1] || this._isDirty || this._scroll.scrollDirty || this._nodes._trueSizeRequested || this.options.alwaysLayout || this._scrollOffsetCache !== scrollOffset) {
        eventData = {
            target: this,
            oldSize: this._contextSizeCache,
            size: size,
            oldScrollOffset: this._scrollOffsetCache,
            scrollOffset: scrollOffset
        };
        if (this._scrollOffsetCache !== scrollOffset) {
            if (!this._scroll.isScrolling) {
                this._scroll.isScrolling = true;
                this._eventOutput.emit('scrollstart', eventData);
            }
            emitScrollEvent = true;
        } else if (this._scroll.isScrolling && !this._scroll.scrollForceCount) {
            emitEndScrollingEvent = true;
        }
        this._eventOutput.emit('layoutstart', eventData);
        if (this.options.flow && (this._isDirty || this.options.reflowOnResize && (size[0] !== this._contextSizeCache[0] || size[1] !== this._contextSizeCache[1]))) {
            var node = this._nodes.getStartEnumNode();
            while (node) {
                node.releaseLock();
                node = node._next;
            }
        }
        this._contextSizeCache[0] = size[0];
        this._contextSizeCache[1] = size[1];
        this._isDirty = false;
        this._scroll.scrollDirty = false;
        scrollOffset = _layout.call(this, size, scrollOffset);
        this._scrollOffsetCache = scrollOffset;
        eventData.scrollOffset = this._scrollOffsetCache;
        this._eventOutput.emit('layoutend', eventData);
    } else if (this._scroll.isScrolling && !this._scroll.scrollForceCount) {
        emitEndScrollingEvent = true;
    }
    var groupTranslate = this._scroll.groupTranslate;
    groupTranslate[0] = 0;
    groupTranslate[1] = 0;
    groupTranslate[2] = 0;
    groupTranslate[this._direction] = -this._scroll.groupStart - scrollOffset;
    var sequentialScrollingOptimized = this._layout.capabilities ? this._layout.capabilities.sequentialScrollingOptimized : false;
    var result = this._nodes.buildSpecAndDestroyUnrenderedNodes(sequentialScrollingOptimized ? groupTranslate : undefined);
    this._specs = result.specs;
    if (result.modified) {
        this._eventOutput.emit('reflow', { target: this });
    }
    if (emitScrollEvent) {
        this._eventOutput.emit('scroll', eventData);
    }
    if (eventData) {
        var visibleItem = this.options.alignment ? this.getLastVisibleItem() : this.getFirstVisibleItem();
        if (visibleItem && !this._visibleItemCache || !visibleItem && this._visibleItemCache || visibleItem && this._visibleItemCache && visibleItem.renderNode !== this._visibleItemCache.renderNode) {
            this._eventOutput.emit('pagechange', {
                target: this,
                oldViewSequence: this._visibleItemCache ? this._visibleItemCache.viewSequence : undefined,
                viewSequence: visibleItem ? visibleItem.viewSequence : undefined,
                oldIndex: this._visibleItemCache ? this._visibleItemCache.index : undefined,
                index: visibleItem ? visibleItem.index : undefined,
                renderNode: visibleItem ? visibleItem.renderNode : undefined,
                oldRenderNode: this._visibleItemCache ? this._visibleItemCache.renderNode : undefined
            });
            this._visibleItemCache = visibleItem;
        }
    }
    if (emitEndScrollingEvent) {
        this._scroll.isScrolling = false;
        eventData = {
            target: this,
            oldSize: size,
            size: size,
            oldScrollOffset: scrollOffset,
            scrollOffset: scrollOffset
        };
        this._eventOutput.emit('scrollend', eventData);
    }
    var transform = context.transform;
    if (sequentialScrollingOptimized) {
        var windowOffset = scrollOffset + this._scroll.groupStart;
        var translate = [
                0,
                0,
                0
            ];
        translate[this._direction] = windowOffset;
        transform = Transform.thenMove(transform, translate);
    }
    return {
        transform: transform,
        size: size,
        opacity: context.opacity,
        origin: context.origin,
        target: this.group.render()
    };
};
ScrollController.prototype.render = function render() {
    if (this.container) {
        return this.container.render.apply(this.container, arguments);
    } else {
        return this.id;
    }
};
module.exports = ScrollController;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./FlowLayoutNode":3,"./LayoutController":5,"./LayoutNode":6,"./LayoutNodeManager":7,"./LayoutUtility":8}],10:[function(require,module,exports){
(function (global){
var EventHandler = typeof window !== 'undefined' ? window.famous.core.EventHandler : typeof global !== 'undefined' ? global.famous.core.EventHandler : null;
function VirtualViewSequence(options) {
    options = options || {};
    this._ = options._ || new this.constructor.Backing(options);
    this.touched = true;
    this.value = options.value || this._.factory.create();
    this.index = options.index || 0;
    this.next = options.next;
    this.prev = options.prev;
    EventHandler.setOutputHandler(this, this._.eventOutput);
    this.value.pipe(this._.eventOutput);
}
VirtualViewSequence.Backing = function Backing(options) {
    this.factory = options.factory;
    this.eventOutput = new EventHandler();
};
VirtualViewSequence.prototype.getPrevious = function (noCreate) {
    if (this.prev) {
        this.prev.touched = true;
        return this.prev;
    }
    if (noCreate) {
        return undefined;
    }
    var value = this._.factory.createPrevious(this.get());
    if (!value) {
        return undefined;
    }
    this.prev = new VirtualViewSequence({
        _: this._,
        value: value,
        index: this.index - 1,
        next: this
    });
    return this.prev;
};
VirtualViewSequence.prototype.getNext = function (noCreate) {
    if (this.next) {
        this.next.touched = true;
        return this.next;
    }
    if (noCreate) {
        return undefined;
    }
    var value = this._.factory.createNext(this.get());
    if (!value) {
        return undefined;
    }
    this.next = new VirtualViewSequence({
        _: this._,
        value: value,
        index: this.index + 1,
        prev: this
    });
    return this.next;
};
VirtualViewSequence.prototype.get = function () {
    this.touched = true;
    return this.value;
};
VirtualViewSequence.prototype.getIndex = function () {
    this.touched = true;
    return this.index;
};
VirtualViewSequence.prototype.toString = function () {
    return '' + this.index;
};
VirtualViewSequence.prototype.cleanup = function () {
    var node = this.prev;
    while (node) {
        if (!node.touched) {
            node.next.prev = undefined;
            node.next = undefined;
            if (this._.factory.destroy) {
                while (node) {
                    this._.factory.destroy(node.value);
                    node = node.prev;
                }
            }
            break;
        }
        node.touched = false;
        node = node.prev;
    }
    node = this.next;
    while (node) {
        if (!node.touched) {
            node.prev.next = undefined;
            node.prev = undefined;
            if (this._.factory.destroy) {
                while (node) {
                    this._.factory.destroy(node.value);
                    node = node.next;
                }
            }
            break;
        }
        node.touched = false;
        node = node.next;
    }
    return this;
};
VirtualViewSequence.prototype.unshift = function () {
    if (console.error) {
        console.error('VirtualViewSequence.unshift is not supported and should not be called');
    }
};
VirtualViewSequence.prototype.push = function () {
    if (console.error) {
        console.error('VirtualViewSequence.push is not supported and should not be called');
    }
};
VirtualViewSequence.prototype.splice = function () {
    if (console.error) {
        console.error('VirtualViewSequence.splice is not supported and should not be called');
    }
};
VirtualViewSequence.prototype.swap = function () {
    if (console.error) {
        console.error('VirtualViewSequence.swap is not supported and should not be called');
    }
};
module.exports = VirtualViewSequence;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],11:[function(require,module,exports){
var LayoutUtility = require('../LayoutUtility');
function LayoutDockHelper(context, options) {
    var size = context.size;
    this._size = size;
    this._context = context;
    this._options = options;
    this._z = options && options.translateZ ? options.translateZ : 0;
    if (options && options.margins) {
        var margins = LayoutUtility.normalizeMargins(options.margins);
        this._left = margins[3];
        this._top = margins[0];
        this._right = size[0] - margins[1];
        this._bottom = size[1] - margins[2];
    } else {
        this._left = 0;
        this._top = 0;
        this._right = size[0];
        this._bottom = size[1];
    }
}
LayoutDockHelper.prototype.parse = function (data) {
    for (var i = 0; i < data.length; i++) {
        var rule = data[i];
        var value = rule.length >= 3 ? rule[2] : undefined;
        if (rule[0] === 'top') {
            this.top(rule[1], value, rule.length >= 4 ? rule[3] : undefined);
        } else if (rule[0] === 'left') {
            this.left(rule[1], value, rule.length >= 4 ? rule[3] : undefined);
        } else if (rule[0] === 'right') {
            this.right(rule[1], value, rule.length >= 4 ? rule[3] : undefined);
        } else if (rule[0] === 'bottom') {
            this.bottom(rule[1], value, rule.length >= 4 ? rule[3] : undefined);
        } else if (rule[0] === 'fill') {
            this.fill(rule[1], rule.length >= 3 ? rule[2] : undefined);
        } else if (rule[0] === 'margins') {
            this.margins(rule[1]);
        }
    }
};
LayoutDockHelper.prototype.top = function (node, height, z) {
    if (height instanceof Array) {
        height = height[1];
    }
    if (height === undefined) {
        var size = this._context.resolveSize(node, [
                this._right - this._left,
                this._bottom - this._top
            ]);
        height = size[1];
    }
    this._context.set(node, {
        size: [
            this._right - this._left,
            height
        ],
        origin: [
            0,
            0
        ],
        align: [
            0,
            0
        ],
        translate: [
            this._left,
            this._top,
            z === undefined ? this._z : z
        ]
    });
    this._top += height;
    return this;
};
LayoutDockHelper.prototype.left = function (node, width, z) {
    if (width instanceof Array) {
        width = width[0];
    }
    if (width === undefined) {
        var size = this._context.resolveSize(node, [
                this._right - this._left,
                this._bottom - this._top
            ]);
        width = size[0];
    }
    this._context.set(node, {
        size: [
            width,
            this._bottom - this._top
        ],
        origin: [
            0,
            0
        ],
        align: [
            0,
            0
        ],
        translate: [
            this._left,
            this._top,
            z === undefined ? this._z : z
        ]
    });
    this._left += width;
    return this;
};
LayoutDockHelper.prototype.bottom = function (node, height, z) {
    if (height instanceof Array) {
        height = height[1];
    }
    if (height === undefined) {
        var size = this._context.resolveSize(node, [
                this._right - this._left,
                this._bottom - this._top
            ]);
        height = size[1];
    }
    this._context.set(node, {
        size: [
            this._right - this._left,
            height
        ],
        origin: [
            0,
            1
        ],
        align: [
            0,
            1
        ],
        translate: [
            this._left,
            -(this._size[1] - this._bottom),
            z === undefined ? this._z : z
        ]
    });
    this._bottom -= height;
    return this;
};
LayoutDockHelper.prototype.right = function (node, width, z) {
    if (width instanceof Array) {
        width = width[0];
    }
    if (node) {
        if (width === undefined) {
            var size = this._context.resolveSize(node, [
                    this._right - this._left,
                    this._bottom - this._top
                ]);
            width = size[0];
        }
        this._context.set(node, {
            size: [
                width,
                this._bottom - this._top
            ],
            origin: [
                1,
                0
            ],
            align: [
                1,
                0
            ],
            translate: [
                -(this._size[0] - this._right),
                this._top,
                z === undefined ? this._z : z
            ]
        });
    }
    if (width) {
        this._right -= width;
    }
    return this;
};
LayoutDockHelper.prototype.fill = function (node, z) {
    this._context.set(node, {
        size: [
            this._right - this._left,
            this._bottom - this._top
        ],
        translate: [
            this._left,
            this._top,
            z === undefined ? this._z : z
        ]
    });
    return this;
};
LayoutDockHelper.prototype.margins = function (margins) {
    margins = LayoutUtility.normalizeMargins(margins);
    this._left += margins[3];
    this._top += margins[0];
    this._right -= margins[1];
    this._bottom -= margins[2];
    return this;
};
LayoutUtility.registerHelper('dock', LayoutDockHelper);
module.exports = LayoutDockHelper;
},{"../LayoutUtility":8}],12:[function(require,module,exports){
(function (global){
var Utility = typeof window !== 'undefined' ? window.famous.utilities.Utility : typeof global !== 'undefined' ? global.famous.utilities.Utility : null;
var LayoutUtility = require('../LayoutUtility');
var capabilities = {
        sequence: true,
        direction: [
            Utility.Direction.Y,
            Utility.Direction.X
        ],
        scrolling: true,
        trueSize: true,
        sequentialScrollingOptimized: true
    };
var context;
var size;
var direction;
var alignment;
var lineDirection;
var lineLength;
var offset;
var margins;
var margin = [
        0,
        0
    ];
var spacing;
var justify;
var itemSize;
var getItemSize;
var lineNodes;
function _layoutLine(next, endReached) {
    if (!lineNodes.length) {
        return 0;
    }
    var i;
    var lineSize = [
            0,
            0
        ];
    var lineNode;
    for (i = 0; i < lineNodes.length; i++) {
        lineSize[direction] = Math.max(lineSize[direction], lineNodes[i].size[direction]);
        lineSize[lineDirection] += (i > 0 ? spacing[lineDirection] : 0) + lineNodes[i].size[lineDirection];
    }
    var justifyOffset = justify[lineDirection] ? (lineLength - lineSize[lineDirection]) / (lineNodes.length * 2) : 0;
    var lineOffset = (direction ? margins[3] : margins[0]) + justifyOffset;
    var scrollLength;
    for (i = 0; i < lineNodes.length; i++) {
        lineNode = lineNodes[i];
        var translate = [
                0,
                0,
                0
            ];
        translate[lineDirection] = lineOffset;
        translate[direction] = next ? offset : offset - lineSize[direction];
        scrollLength = 0;
        if (i === 0) {
            scrollLength = lineSize[direction];
            if (endReached && (next && !alignment || !next && alignment)) {
                scrollLength += direction ? margins[0] + margins[2] : margins[3] + margins[1];
            } else {
                scrollLength += spacing[direction];
            }
        }
        lineNode.set = {
            size: lineNode.size,
            translate: translate,
            scrollLength: scrollLength
        };
        lineOffset += lineNode.size[lineDirection] + spacing[lineDirection] + justifyOffset * 2;
    }
    for (i = 0; i < lineNodes.length; i++) {
        lineNode = next ? lineNodes[i] : lineNodes[lineNodes.length - 1 - i];
        context.set(lineNode.node, lineNode.set);
    }
    lineNodes = [];
    return lineSize[direction] + spacing[direction];
}
function _resolveNodeSize(node) {
    var localItemSize = itemSize;
    if (getItemSize) {
        localItemSize = getItemSize(node.renderNode, size);
    }
    if (localItemSize[0] === true || localItemSize[1] === true) {
        var result = context.resolveSize(node, size);
        if (localItemSize[0] !== true) {
            result[0] = itemSize[0];
        }
        if (localItemSize[1] !== true) {
            result[1] = itemSize[1];
        }
        return result;
    } else {
        return localItemSize;
    }
}
function CollectionLayout(context_, options) {
    context = context_;
    size = context.size;
    direction = context.direction;
    alignment = context.alignment;
    lineDirection = (direction + 1) % 2;
    if (options.gutter !== undefined && console.warn) {
        console.warn('option `gutter` has been deprecated for CollectionLayout, use margins & spacing instead');
    }
    if (options.gutter && !options.margins && !options.spacing) {
        var gutter = Array.isArray(options.gutter) ? options.gutter : [
                options.gutter,
                options.gutter
            ];
        margins = [
            gutter[1],
            gutter[0],
            gutter[1],
            gutter[0]
        ];
        spacing = gutter;
    } else {
        margins = LayoutUtility.normalizeMargins(options.margins);
        spacing = options.spacing || 0;
        spacing = Array.isArray(spacing) ? spacing : [
            spacing,
            spacing
        ];
    }
    margin[0] = margins[direction ? 0 : 3];
    margin[1] = -margins[direction ? 2 : 1];
    justify = Array.isArray(options.justify) ? options.justify : options.justify ? [
        true,
        true
    ] : [
        false,
        false
    ];
    lineLength = size[lineDirection] - (direction ? margins[3] + margins[1] : margins[0] + margins[2]);
    var node;
    var nodeSize;
    var lineOffset;
    var bound;
    if (options.cells) {
        if (options.itemSize && console.warn) {
            console.warn('options `cells` and `itemSize` cannot both be specified for CollectionLayout, only use one of the two');
        }
        itemSize = [
            (size[0] - (margins[1] + margins[3] + spacing[0] * (options.cells[0] - 1))) / options.cells[0],
            (size[1] - (margins[0] + margins[2] + spacing[1] * (options.cells[1] - 1))) / options.cells[1]
        ];
    } else if (!options.itemSize) {
        itemSize = [
            true,
            true
        ];
    } else if (options.itemSize instanceof Function) {
        getItemSize = options.itemSize;
    } else if (options.itemSize[0] === undefined || options.itemSize[0] === undefined) {
        itemSize = [
            options.itemSize[0] === undefined ? size[0] : options.itemSize[0],
            options.itemSize[1] === undefined ? size[1] : options.itemSize[1]
        ];
    } else {
        itemSize = options.itemSize;
    }
    offset = context.scrollOffset + (alignment ? 0 : margin[alignment]);
    bound = context.scrollEnd + (alignment ? 0 : margin[alignment]);
    lineOffset = 0;
    lineNodes = [];
    while (offset < bound) {
        node = context.next();
        if (!node) {
            _layoutLine(true, true);
            break;
        }
        nodeSize = _resolveNodeSize(node);
        lineOffset += (lineNodes.length ? spacing[lineDirection] : 0) + nodeSize[lineDirection];
        if (lineOffset > lineLength) {
            offset += _layoutLine(true, !node);
            lineOffset = nodeSize[lineDirection];
        }
        lineNodes.push({
            node: node,
            size: nodeSize
        });
    }
    offset = context.scrollOffset + (alignment ? margin[alignment] : 0);
    bound = context.scrollStart + (alignment ? margin[alignment] : 0);
    lineOffset = 0;
    lineNodes = [];
    while (offset > bound) {
        node = context.prev();
        if (!node) {
            _layoutLine(false, true);
            break;
        }
        nodeSize = _resolveNodeSize(node);
        lineOffset += (lineNodes.length ? spacing[lineDirection] : 0) + nodeSize[lineDirection];
        if (lineOffset > lineLength) {
            offset -= _layoutLine(false, !node);
            lineOffset = nodeSize[lineDirection];
        }
        lineNodes.unshift({
            node: node,
            size: nodeSize
        });
    }
}
CollectionLayout.Capabilities = capabilities;
CollectionLayout.Name = 'CollectionLayout';
CollectionLayout.Description = 'Multi-cell collection-layout with margins & spacing';
module.exports = CollectionLayout;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../LayoutUtility":8}],13:[function(require,module,exports){
(function (global){
var Utility = typeof window !== 'undefined' ? window.famous.utilities.Utility : typeof global !== 'undefined' ? global.famous.utilities.Utility : null;
var capabilities = {
        sequence: true,
        direction: [
            Utility.Direction.X,
            Utility.Direction.Y
        ],
        scrolling: true
    };
function CoverLayout(context, options) {
    var node = context.next();
    if (!node) {
        return;
    }
    var size = context.size;
    var direction = context.direction;
    var itemSize = options.itemSize;
    var opacityStep = 0.2;
    var scaleStep = 0.1;
    var translateStep = 30;
    var zStart = 100;
    context.set(node, {
        size: itemSize,
        origin: [
            0.5,
            0.5
        ],
        align: [
            0.5,
            0.5
        ],
        translate: [
            0,
            0,
            zStart
        ],
        scrollLength: itemSize[direction]
    });
    var translate = itemSize[0] / 2;
    var opacity = 1 - opacityStep;
    var zIndex = zStart - 1;
    var scale = 1 - scaleStep;
    var prev = false;
    var endReached = false;
    node = context.next();
    if (!node) {
        node = context.prev();
        prev = true;
    }
    while (node) {
        context.set(node, {
            size: itemSize,
            origin: [
                0.5,
                0.5
            ],
            align: [
                0.5,
                0.5
            ],
            translate: direction ? [
                0,
                prev ? -translate : translate,
                zIndex
            ] : [
                prev ? -translate : translate,
                0,
                zIndex
            ],
            scale: [
                scale,
                scale,
                1
            ],
            opacity: opacity,
            scrollLength: itemSize[direction]
        });
        opacity -= opacityStep;
        scale -= scaleStep;
        translate += translateStep;
        zIndex--;
        if (translate >= size[direction] / 2) {
            endReached = true;
        } else {
            node = prev ? context.prev() : context.next();
            endReached = !node;
        }
        if (endReached) {
            if (prev) {
                break;
            }
            endReached = false;
            prev = true;
            node = context.prev();
            if (node) {
                translate = itemSize[direction] / 2;
                opacity = 1 - opacityStep;
                zIndex = zStart - 1;
                scale = 1 - scaleStep;
            }
        }
    }
}
CoverLayout.Capabilities = capabilities;
module.exports = CoverLayout;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],14:[function(require,module,exports){
module.exports = function CubeLayout(context, options) {
    var itemSize = options.itemSize;
    context.set(context.next(), {
        size: itemSize,
        origin: [
            0.5,
            0.5
        ],
        rotate: [
            0,
            Math.PI / 2,
            0
        ],
        translate: [
            itemSize[0] / 2,
            0,
            0
        ]
    });
    context.set(context.next(), {
        size: itemSize,
        origin: [
            0.5,
            0.5
        ],
        rotate: [
            0,
            Math.PI / 2,
            0
        ],
        translate: [
            -(itemSize[0] / 2),
            0,
            0
        ]
    });
    context.set(context.next(), {
        size: itemSize,
        origin: [
            0.5,
            0.5
        ],
        rotate: [
            Math.PI / 2,
            0,
            0
        ],
        translate: [
            0,
            -(itemSize[1] / 2),
            0
        ]
    });
    context.set(context.next(), {
        size: itemSize,
        origin: [
            0.5,
            0.5
        ],
        rotate: [
            Math.PI / 2,
            0,
            0
        ],
        translate: [
            0,
            itemSize[1] / 2,
            0
        ]
    });
};
},{}],15:[function(require,module,exports){
if (console.warn) {
    console.warn('GridLayout has been deprecated and will be removed in the future, use CollectionLayout instead');
}
module.exports = require('./CollectionLayout');
},{"./CollectionLayout":12}],16:[function(require,module,exports){
var LayoutDockHelper = require('../helpers/LayoutDockHelper');
module.exports = function HeaderFooterLayout(context, options) {
    var dock = new LayoutDockHelper(context, options);
    dock.top('header', options.headerSize || options.headerHeight);
    dock.bottom('footer', options.footerSize || options.footerHeight);
    dock.fill('content');
};
},{"../helpers/LayoutDockHelper":11}],17:[function(require,module,exports){
(function (global){
var Utility = typeof window !== 'undefined' ? window.famous.utilities.Utility : typeof global !== 'undefined' ? global.famous.utilities.Utility : null;
var LayoutUtility = require('../LayoutUtility');
var capabilities = {
        sequence: true,
        direction: [
            Utility.Direction.Y,
            Utility.Direction.X
        ],
        scrolling: true,
        trueSize: true,
        sequentialScrollingOptimized: true
    };
var set = {
        size: [
            0,
            0
        ],
        translate: [
            0,
            0,
            0
        ],
        scrollLength: undefined
    };
var margin = [
        0,
        0
    ];
function ListLayout(context, options) {
    var size = context.size;
    var direction = context.direction;
    var alignment = context.alignment;
    var revDirection = direction ? 0 : 1;
    var offset;
    var margins = LayoutUtility.normalizeMargins(options.margins);
    var spacing = options.spacing || 0;
    var node;
    var nodeSize;
    var itemSize;
    var getItemSize;
    var lastSectionBeforeVisibleCell;
    var lastSectionBeforeVisibleCellOffset;
    var lastSectionBeforeVisibleCellLength;
    var lastSectionBeforeVisibleCellScrollLength;
    var firstVisibleCell;
    var lastNode;
    var lastCellOffsetInFirstVisibleSection;
    var isSectionCallback = options.isSectionCallback;
    var bound;
    set.size[0] = size[0];
    set.size[1] = size[1];
    set.size[revDirection] -= margins[1 - revDirection] + margins[3 - revDirection];
    set.translate[0] = 0;
    set.translate[1] = 0;
    set.translate[2] = 0;
    set.translate[revDirection] = margins[direction ? 3 : 0];
    if (options.itemSize === true || !options.hasOwnProperty('itemSize')) {
        itemSize = true;
    } else if (options.itemSize instanceof Function) {
        getItemSize = options.itemSize;
    } else {
        itemSize = options.itemSize === undefined ? size[direction] : options.itemSize;
    }
    margin[0] = margins[direction ? 0 : 3];
    margin[1] = -margins[direction ? 2 : 1];
    offset = context.scrollOffset + margin[alignment];
    bound = context.scrollEnd + margin[alignment];
    while (offset < bound) {
        lastNode = node;
        node = context.next();
        if (!node) {
            if (lastNode && !alignment) {
                set.scrollLength = nodeSize + margin[0] + -margin[1];
                context.set(lastNode, set);
            }
            break;
        }
        nodeSize = getItemSize ? getItemSize(node.renderNode) : itemSize;
        nodeSize = nodeSize === true ? context.resolveSize(node, size)[direction] : nodeSize;
        set.size[direction] = nodeSize;
        set.translate[direction] = offset + (alignment ? spacing : 0);
        set.scrollLength = nodeSize + spacing;
        context.set(node, set);
        offset += set.scrollLength;
        if (isSectionCallback && isSectionCallback(node.renderNode)) {
            set.translate[direction] = Math.max(margin[0], set.translate[direction]);
            context.set(node, set);
            if (!firstVisibleCell) {
                lastSectionBeforeVisibleCell = node;
                lastSectionBeforeVisibleCellOffset = offset - nodeSize;
                lastSectionBeforeVisibleCellLength = nodeSize;
                lastSectionBeforeVisibleCellScrollLength = nodeSize;
            } else if (lastCellOffsetInFirstVisibleSection === undefined) {
                lastCellOffsetInFirstVisibleSection = offset - nodeSize;
            }
        } else if (!firstVisibleCell && offset >= 0) {
            firstVisibleCell = node;
        }
    }
    node = undefined;
    offset = context.scrollOffset + margin[alignment];
    bound = context.scrollStart + margin[alignment];
    while (offset > bound) {
        lastNode = node;
        node = context.prev();
        if (!node) {
            if (lastNode && alignment) {
                set.scrollLength = nodeSize + margin[0] + -margin[1];
                context.set(lastNode, set);
                if (lastSectionBeforeVisibleCell === lastNode) {
                    lastSectionBeforeVisibleCellScrollLength = set.scrollLength;
                }
            }
            break;
        }
        nodeSize = getItemSize ? getItemSize(node.renderNode) : itemSize;
        nodeSize = nodeSize === true ? context.resolveSize(node, size)[direction] : nodeSize;
        set.scrollLength = nodeSize + spacing;
        offset -= set.scrollLength;
        set.size[direction] = nodeSize;
        set.translate[direction] = offset + (alignment ? spacing : 0);
        context.set(node, set);
        if (isSectionCallback && isSectionCallback(node.renderNode)) {
            set.translate[direction] = Math.max(margin[0], set.translate[direction]);
            context.set(node, set);
            if (!lastSectionBeforeVisibleCell) {
                lastSectionBeforeVisibleCell = node;
                lastSectionBeforeVisibleCellOffset = offset;
                lastSectionBeforeVisibleCellLength = nodeSize;
                lastSectionBeforeVisibleCellScrollLength = set.scrollLength;
            }
        } else if (offset + nodeSize >= 0) {
            firstVisibleCell = node;
            if (lastSectionBeforeVisibleCell) {
                lastCellOffsetInFirstVisibleSection = offset + nodeSize;
            }
            lastSectionBeforeVisibleCell = undefined;
        }
    }
    if (isSectionCallback && !lastSectionBeforeVisibleCell) {
        node = context.prev();
        while (node) {
            if (isSectionCallback(node.renderNode)) {
                lastSectionBeforeVisibleCell = node;
                nodeSize = options.itemSize || context.resolveSize(node, size)[direction];
                lastSectionBeforeVisibleCellOffset = offset - nodeSize;
                lastSectionBeforeVisibleCellLength = nodeSize;
                lastSectionBeforeVisibleCellScrollLength = undefined;
                break;
            } else {
                node = context.prev();
            }
        }
    }
    if (lastSectionBeforeVisibleCell) {
        var correctedOffset = Math.max(margin[0], lastSectionBeforeVisibleCellOffset);
        if (lastCellOffsetInFirstVisibleSection !== undefined && lastSectionBeforeVisibleCellLength > lastCellOffsetInFirstVisibleSection - margin[0]) {
            correctedOffset = lastCellOffsetInFirstVisibleSection - lastSectionBeforeVisibleCellLength;
        }
        set.size[direction] = lastSectionBeforeVisibleCellLength;
        set.translate[direction] = correctedOffset;
        set.scrollLength = lastSectionBeforeVisibleCellScrollLength;
        context.set(lastSectionBeforeVisibleCell, set);
    }
}
ListLayout.Capabilities = capabilities;
ListLayout.Name = 'ListLayout';
ListLayout.Description = 'List-layout with margins, spacing and sticky headers';
module.exports = ListLayout;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../LayoutUtility":8}],18:[function(require,module,exports){
var LayoutDockHelper = require('../helpers/LayoutDockHelper');
module.exports = function NavBarLayout(context, options) {
    var dock = new LayoutDockHelper(context, {
            margins: options.margins,
            translateZ: 1
        });
    context.set('background', { size: context.size });
    var node;
    var i;
    var rightItems = context.get('rightItems');
    if (rightItems) {
        for (i = 0; i < rightItems.length; i++) {
            node = context.get(rightItems[i]);
            dock.right(node, options.rightItemWidth || options.itemWidth);
            dock.right(undefined, options.rightItemSpacer || options.itemSpacer);
        }
    }
    var leftItems = context.get('leftItems');
    if (leftItems) {
        for (i = 0; i < leftItems.length; i++) {
            node = context.get(leftItems[i]);
            dock.left(node, options.leftItemWidth || options.itemWidth);
            dock.left(undefined, options.leftItemSpacer || options.itemSpacer);
        }
    }
    dock.fill('title');
};
},{"../helpers/LayoutDockHelper":11}],19:[function(require,module,exports){
(function (global){
var Utility = typeof window !== 'undefined' ? window.famous.utilities.Utility : typeof global !== 'undefined' ? global.famous.utilities.Utility : null;
var capabilities = {
        sequence: true,
        direction: [
            Utility.Direction.Y,
            Utility.Direction.X
        ],
        scrolling: false
    };
var direction;
var size;
var ratios;
var total;
var offset;
var index;
var node;
var set = {
        size: [
            0,
            0
        ],
        translate: [
            0,
            0,
            0
        ]
    };
function ProportionalLayout(context, options) {
    size = context.size;
    direction = context.direction;
    ratios = options.ratios;
    total = 0;
    for (index = 0; index < ratios.length; index++) {
        total += ratios[index];
    }
    set.size[0] = size[0];
    set.size[1] = size[1];
    set.translate[0] = 0;
    set.translate[1] = 0;
    node = context.next();
    offset = 0;
    index = 0;
    while (node && index < ratios.length) {
        set.size[direction] = (size[direction] - offset) / total * ratios[index];
        set.translate[direction] = offset;
        context.set(node, set);
        offset += set.size[direction];
        total -= ratios[index];
        index++;
        node = context.next();
    }
}
ProportionalLayout.Capabilities = capabilities;
module.exports = ProportionalLayout;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],20:[function(require,module,exports){
(function (global){
var Utility = typeof window !== 'undefined' ? window.famous.utilities.Utility : typeof global !== 'undefined' ? global.famous.utilities.Utility : null;
var LayoutUtility = require('../LayoutUtility');
var capabilities = {
        sequence: true,
        direction: [
            Utility.Direction.X,
            Utility.Direction.Y
        ],
        trueSize: true
    };
var size;
var direction;
var revDirection;
var items;
var spacers;
var margins;
var spacing;
var sizeLeft;
var set = {
        size: [
            0,
            0
        ],
        translate: [
            0,
            0,
            0
        ],
        align: [
            0,
            0
        ],
        origin: [
            0,
            0
        ]
    };
var nodeSize;
var offset;
function NavBarLayout(context, options) {
    size = context.size;
    direction = context.direction;
    revDirection = direction ? 0 : 1;
    spacing = options.spacing || 0;
    items = context.get('items');
    spacers = context.get('spacers');
    margins = LayoutUtility.normalizeMargins(options.margins);
    set.size[0] = context.size[0];
    set.size[1] = context.size[1];
    set.size[revDirection] -= margins[1 - revDirection] + margins[3 - revDirection];
    set.translate[0] = 0;
    set.translate[1] = 0;
    set.translate[2] = 0.001;
    set.translate[revDirection] = margins[direction ? 3 : 0];
    set.align[0] = 0;
    set.align[1] = 0;
    set.origin[0] = 0;
    set.origin[1] = 0;
    offset = direction ? margins[0] : margins[3];
    sizeLeft = size[direction] - (offset + (direction ? margins[2] : margins[1]));
    sizeLeft -= (items.length - 1) * spacing;
    for (var i = 0; i < items.length; i++) {
        if (options.itemSize === undefined) {
            nodeSize = Math.round(sizeLeft / (items.length - i));
        } else {
            nodeSize = options.itemSize === true ? context.resolveSize(items[i], size)[direction] : options.itemSize;
        }
        set.scrollLength = nodeSize;
        if (i === 0) {
            set.scrollLength += direction ? margins[0] : margins[3];
        }
        if (i === items.length - 1) {
            set.scrollLength += direction ? margins[2] : margins[1];
        } else {
            set.scrollLength += spacing;
        }
        set.size[direction] = nodeSize;
        set.translate[direction] = offset;
        context.set(items[i], set);
        offset += nodeSize;
        sizeLeft -= nodeSize;
        if (i === options.selectedItemIndex) {
            set.scrollLength = 0;
            set.translate[direction] += nodeSize / 2;
            set.translate[2] = 0.002;
            set.origin[direction] = 0.5;
            context.set('selectedItemOverlay', set);
            set.origin[direction] = 0;
            set.translate[2] = 0.001;
        }
        if (i < items.length - 1) {
            if (spacers && i < spacers.length) {
                set.size[direction] = spacing;
                set.translate[direction] = offset;
                context.set(spacers[i], set);
            }
            offset += spacing;
        } else {
            offset += direction ? margins[2] : margins[1];
        }
    }
    set.scrollLength = 0;
    set.size[0] = size[0];
    set.size[1] = size[1];
    set.size[direction] = size[direction];
    set.translate[0] = 0;
    set.translate[1] = 0;
    set.translate[2] = 0;
    set.translate[direction] = 0;
    context.set('background', set);
}
NavBarLayout.Capabilities = capabilities;
NavBarLayout.Name = 'TabBarLayout';
NavBarLayout.Description = 'TabBar widget layout';
module.exports = NavBarLayout;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../LayoutUtility":8}],21:[function(require,module,exports){
(function (global){
var Utility = typeof window !== 'undefined' ? window.famous.utilities.Utility : typeof global !== 'undefined' ? global.famous.utilities.Utility : null;
var capabilities = {
        sequence: true,
        direction: [
            Utility.Direction.Y,
            Utility.Direction.X
        ],
        scrolling: true,
        trueSize: true
    };
var size;
var direction;
var revDirection;
var node;
var itemSize;
var diameter;
var offset;
var bound;
var angle;
var radius;
var itemAngle;
var radialOpacity;
var set = {
        opacity: 1,
        size: [
            0,
            0
        ],
        translate: [
            0,
            0,
            0
        ],
        rotate: [
            0,
            0,
            0
        ],
        origin: [
            0.5,
            0.5
        ],
        align: [
            0.5,
            0.5
        ],
        scrollLength: undefined
    };
function WheelLayout(context, options) {
    size = context.size;
    direction = context.direction;
    revDirection = direction ? 0 : 1;
    itemSize = options.itemSize || size[direction] / 2;
    diameter = options.diameter || itemSize * 3;
    radius = diameter / 2;
    itemAngle = Math.atan2(itemSize / 2, radius) * 2;
    radialOpacity = options.radialOpacity === undefined ? 1 : options.radialOpacity;
    set.opacity = 1;
    set.size[0] = size[0];
    set.size[1] = size[1];
    set.size[revDirection] = size[revDirection];
    set.size[direction] = itemSize;
    set.translate[0] = 0;
    set.translate[1] = 0;
    set.translate[2] = 0;
    set.rotate[0] = 0;
    set.rotate[1] = 0;
    set.rotate[2] = 0;
    set.scrollLength = itemSize;
    offset = context.scrollOffset;
    bound = Math.PI / 2 / itemAngle * itemSize + itemSize;
    while (offset <= bound) {
        node = context.next();
        if (!node) {
            break;
        }
        if (offset >= -bound) {
            angle = offset / itemSize * itemAngle;
            set.translate[direction] = radius * Math.sin(angle);
            set.translate[2] = radius * Math.cos(angle) - radius;
            set.rotate[revDirection] = direction ? -angle : angle;
            set.opacity = 1 - Math.abs(angle) / (Math.PI / 2) * (1 - radialOpacity);
            context.set(node, set);
        }
        offset += itemSize;
    }
    offset = context.scrollOffset - itemSize;
    while (offset >= -bound) {
        node = context.prev();
        if (!node) {
            break;
        }
        if (offset <= bound) {
            angle = offset / itemSize * itemAngle;
            set.translate[direction] = radius * Math.sin(angle);
            set.translate[2] = radius * Math.cos(angle) - radius;
            set.rotate[revDirection] = direction ? -angle : angle;
            set.opacity = 1 - Math.abs(angle) / (Math.PI / 2) * (1 - radialOpacity);
            context.set(node, set);
        }
        offset -= itemSize;
    }
}
WheelLayout.Capabilities = capabilities;
WheelLayout.Name = 'WheelLayout';
WheelLayout.Description = 'Spinner-wheel/slot-machine layout';
module.exports = WheelLayout;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],22:[function(require,module,exports){
(function (global){
var View = typeof window !== 'undefined' ? window.famous.core.View : typeof global !== 'undefined' ? global.famous.core.View : null;
var Surface = typeof window !== 'undefined' ? window.famous.core.Surface : typeof global !== 'undefined' ? global.famous.core.Surface : null;
var Utility = typeof window !== 'undefined' ? window.famous.utilities.Utility : typeof global !== 'undefined' ? global.famous.utilities.Utility : null;
var ContainerSurface = typeof window !== 'undefined' ? window.famous.surfaces.ContainerSurface : typeof global !== 'undefined' ? global.famous.surfaces.ContainerSurface : null;
var LayoutController = require('../LayoutController');
var ScrollController = require('../ScrollController');
var WheelLayout = require('../layouts/WheelLayout');
var ProportionalLayout = require('../layouts/ProportionalLayout');
var VirtualViewSequence = require('../VirtualViewSequence');
var DatePickerComponents = require('./DatePickerComponents');
var LayoutUtility = require('../LayoutUtility');
function DatePicker(options) {
    View.apply(this, arguments);
    options = options || {};
    this._date = new Date(options.date ? options.date.getTime() : undefined);
    this._components = [];
    this.classes = options.classes ? this.classes.concat(options.classes) : this.classes;
    _createLayout.call(this);
    _updateComponents.call(this);
    this._overlayRenderables = {
        top: _createRenderable.call(this, 'top'),
        middle: _createRenderable.call(this, 'middle'),
        bottom: _createRenderable.call(this, 'bottom')
    };
    _createOverlay.call(this);
    this.setOptions(this.options);
}
DatePicker.prototype = Object.create(View.prototype);
DatePicker.prototype.constructor = DatePicker;
DatePicker.prototype.classes = [
    'ff-widget',
    'ff-datepicker'
];
DatePicker.Component = DatePickerComponents;
DatePicker.DEFAULT_OPTIONS = {
    perspective: 500,
    wheelLayout: {
        itemSize: 100,
        diameter: 500
    },
    createRenderables: {
        item: true,
        top: false,
        middle: false,
        bottom: false
    },
    scrollController: {
        enabled: true,
        paginated: true,
        paginationMode: ScrollController.PaginationMode.SCROLL,
        mouseMove: true,
        scrollSpring: {
            dampingRatio: 1,
            period: 800
        }
    }
};
function _createRenderable(id, data) {
    var option = this.options.createRenderables[Array.isArray(id) ? id[0] : id];
    if (option instanceof Function) {
        return option.call(this, id, data);
    } else if (!option) {
        return undefined;
    }
    if (data !== undefined && data instanceof Object) {
        return data;
    }
    var surface = new Surface({
            classes: this.classes,
            content: data ? '<div>' + data + '</div>' : undefined
        });
    if (Array.isArray(id)) {
        for (var i = 0; i < id.length; i++) {
            surface.addClass(id[i]);
        }
    } else {
        surface.addClass(id);
    }
    return surface;
}
DatePicker.prototype.setOptions = function (options) {
    View.prototype.setOptions.call(this, options);
    if (!this.layout) {
        return this;
    }
    if (options.perspective !== undefined) {
        this.container.context.setPerspective(options.perspective);
    }
    var i;
    if (options.wheelLayout !== undefined) {
        for (i = 0; i < this.scrollWheels.length; i++) {
            this.scrollWheels[i].scrollController.setLayoutOptions(options.wheelLayout);
        }
        this.overlay.setLayoutOptions({ itemSize: this.options.wheelLayout.itemSize });
    }
    if (options.scrollController !== undefined) {
        for (i = 0; i < this.scrollWheels.length; i++) {
            this.scrollWheels[i].scrollController.setOptions(options.scrollController);
        }
    }
    return this;
};
DatePicker.prototype.setComponents = function (components) {
    this._components = components;
    _updateComponents.call(this);
    return this;
};
DatePicker.prototype.getComponents = function () {
    return this._components;
};
DatePicker.prototype.setDate = function (date) {
    this._date.setTime(date.getTime());
    _setDateToScrollWheels.call(this, this._date);
    return this;
};
DatePicker.prototype.getDate = function () {
    return this._date;
};
function _setDateToScrollWheels(date) {
    for (var i = 0; i < this.scrollWheels.length; i++) {
        var scrollWheel = this.scrollWheels[i];
        var component = scrollWheel.component;
        var item = scrollWheel.scrollController.getFirstVisibleItem();
        if (item && item.viewSequence) {
            var viewSequence = item.viewSequence;
            var renderNode = item.viewSequence.get();
            var currentValue = component.getComponent(renderNode.date);
            var destValue = component.getComponent(date);
            var steps = 0;
            if (currentValue !== destValue) {
                steps = destValue - currentValue;
                if (component.loop) {
                    var revSteps = steps < 0 ? steps + component.upperBound : steps - component.upperBound;
                    if (Math.abs(revSteps) < Math.abs(steps)) {
                        steps = revSteps;
                    }
                }
            }
            if (!steps) {
                scrollWheel.scrollController.goToRenderNode(renderNode);
            } else {
                while (currentValue !== destValue) {
                    viewSequence = steps > 0 ? viewSequence.getNext() : viewSequence.getPrevious();
                    renderNode = viewSequence ? viewSequence.get() : undefined;
                    if (!renderNode) {
                        break;
                    }
                    currentValue = component.getComponent(renderNode.date);
                    if (steps > 0) {
                        scrollWheel.scrollController.goToNextPage();
                    } else {
                        scrollWheel.scrollController.goToPreviousPage();
                    }
                }
            }
        }
    }
}
function _getDateFromScrollWheels() {
    var date = new Date(this._date);
    for (var i = 0; i < this.scrollWheels.length; i++) {
        var scrollWheel = this.scrollWheels[i];
        var component = scrollWheel.component;
        var item = scrollWheel.scrollController.getFirstVisibleItem();
        if (item && item.renderNode) {
            component.setComponent(date, component.getComponent(item.renderNode.date));
        }
    }
    return date;
}
function _createLayout() {
    this.container = new ContainerSurface(this.options.container);
    this.container.setClasses(this.classes);
    this.layout = new LayoutController({
        layout: ProportionalLayout,
        layoutOptions: { ratios: [] },
        direction: Utility.Direction.X
    });
    this.container.add(this.layout);
    this.add(this.container);
}
function _clickItem(scrollWheel, event) {
}
function _scrollWheelScrollStart() {
    this._scrollingCount++;
    if (this._scrollingCount === 1) {
        this._eventOutput.emit('scrollstart', { target: this });
    }
}
function _scrollWheelScrollEnd() {
    this._scrollingCount--;
    if (this._scrollingCount === 0) {
        this._eventOutput.emit('scrollend', {
            target: this,
            date: this._date
        });
    }
}
function _scrollWheelPageChange() {
    this._date = _getDateFromScrollWheels.call(this);
    this._eventOutput.emit('datechange', {
        target: this,
        date: this._date
    });
}
function _updateComponents() {
    this.scrollWheels = [];
    this._scrollingCount = 0;
    var dataSource = [];
    var sizeRatios = [];
    for (var i = 0; i < this._components.length; i++) {
        var component = this._components[i];
        component.createRenderable = _createRenderable.bind(this);
        var viewSequence = new VirtualViewSequence({
                factory: component,
                value: component.create(this._date)
            });
        var options = LayoutUtility.combineOptions(this.options.scrollController, {
                layout: WheelLayout,
                layoutOptions: this.options.wheelLayout,
                flow: false,
                direction: Utility.Direction.Y,
                dataSource: viewSequence,
                autoPipeEvents: true
            });
        var scrollController = new ScrollController(options);
        scrollController.on('scrollstart', _scrollWheelScrollStart.bind(this));
        scrollController.on('scrollend', _scrollWheelScrollEnd.bind(this));
        scrollController.on('pagechange', _scrollWheelPageChange.bind(this));
        var scrollWheel = {
                component: component,
                scrollController: scrollController,
                viewSequence: viewSequence
            };
        this.scrollWheels.push(scrollWheel);
        component.on('click', _clickItem.bind(this, scrollWheel));
        dataSource.push(scrollController);
        sizeRatios.push(component.sizeRatio);
    }
    this.layout.setDataSource(dataSource);
    this.layout.setLayoutOptions({ ratios: sizeRatios });
}
function OverlayLayout(context, options) {
    var height = (context.size[1] - options.itemSize) / 2;
    context.set('top', {
        size: [
            context.size[0],
            height
        ],
        translate: [
            0,
            0,
            1
        ]
    });
    context.set('middle', {
        size: [
            context.size[0],
            context.size[1] - height * 2
        ],
        translate: [
            0,
            height,
            1
        ]
    });
    context.set('bottom', {
        size: [
            context.size[0],
            height
        ],
        translate: [
            0,
            context.size[1] - height,
            1
        ]
    });
}
function _createOverlay() {
    this.overlay = new LayoutController({
        layout: OverlayLayout,
        layoutOptions: { itemSize: this.options.wheelLayout.itemSize },
        dataSource: this._overlayRenderables
    });
    this.add(this.overlay);
}
module.exports = DatePicker;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../LayoutController":5,"../LayoutUtility":8,"../ScrollController":9,"../VirtualViewSequence":10,"../layouts/ProportionalLayout":19,"../layouts/WheelLayout":21,"./DatePickerComponents":23}],23:[function(require,module,exports){
(function (global){
var Surface = typeof window !== 'undefined' ? window.famous.core.Surface : typeof global !== 'undefined' ? global.famous.core.Surface : null;
var EventHandler = typeof window !== 'undefined' ? window.famous.core.EventHandler : typeof global !== 'undefined' ? global.famous.core.EventHandler : null;
function decimal1(date) {
    return '' + date[this.get]();
}
function decimal2(date) {
    return ('0' + date[this.get]()).slice(-2);
}
function decimal3(date) {
    return ('00' + date[this.get]()).slice(-3);
}
function decimal4(date) {
    return ('000' + date[this.get]()).slice(-4);
}
function Base(options) {
    this._eventOutput = new EventHandler();
    this._pool = [];
    EventHandler.setOutputHandler(this, this._eventOutput);
    if (options) {
        for (var key in options) {
            this[key] = options[key];
        }
    }
}
Base.prototype.step = 1;
Base.prototype.classes = ['item'];
Base.prototype.getComponent = function (date) {
    return date[this.get]();
};
Base.prototype.setComponent = function (date, value) {
    return date[this.set](value);
};
Base.prototype.format = function (date) {
    return 'overide to implement';
};
Base.prototype.createNext = function (renderable) {
    var date = this.getNext(renderable.date);
    return date ? this.create(date) : undefined;
};
Base.prototype.getNext = function (date) {
    date = new Date(date.getTime());
    var newVal = this.getComponent(date) + this.step;
    if (this.upperBound !== undefined && newVal >= this.upperBound) {
        if (!this.loop) {
            return undefined;
        }
        newVal = Math.max(newVal % this.upperBound, this.lowerBound || 0);
    }
    this.setComponent(date, newVal);
    return date;
};
Base.prototype.createPrevious = function (renderable) {
    var date = this.getPrevious(renderable.date);
    return date ? this.create(date) : undefined;
};
Base.prototype.getPrevious = function (date) {
    date = new Date(date.getTime());
    var newVal = this.getComponent(date) - this.step;
    if (this.lowerBound !== undefined && newVal < this.lowerBound) {
        if (!this.loop) {
            return undefined;
        }
        newVal = newVal % this.upperBound;
    }
    this.setComponent(date, newVal);
    return date;
};
Base.prototype.installClickHandler = function (renderable) {
    renderable.on('click', function (event) {
        this._eventOutput.emit('click', {
            target: renderable,
            event: event
        });
    }.bind(this));
};
Base.prototype.createRenderable = function (classes, data) {
    return new Surface({
        classes: classes,
        content: '<div>' + data + '</div>'
    });
};
Base.prototype.create = function (date) {
    date = date || new Date();
    var renderable;
    if (this._pool.length) {
        renderable = this._pool[0];
        this._pool.splice(0, 1);
        renderable.setContent(this.format(date));
    } else {
        renderable = this.createRenderable(this.classes, this.format(date));
        this.installClickHandler(renderable);
    }
    renderable.date = date;
    return renderable;
};
Base.prototype.destroy = function (renderable) {
    this._pool.push(renderable);
};
function Year() {
    Base.apply(this, arguments);
}
Year.prototype = Object.create(Base.prototype);
Year.prototype.constructor = Year;
Year.prototype.classes = [
    'item',
    'year'
];
Year.prototype.format = decimal4;
Year.prototype.sizeRatio = 1;
Year.prototype.step = 1;
Year.prototype.loop = false;
Year.prototype.set = 'setFullYear';
Year.prototype.get = 'getFullYear';
function Month() {
    Base.apply(this, arguments);
}
Month.prototype = Object.create(Base.prototype);
Month.prototype.constructor = Month;
Month.prototype.classes = [
    'item',
    'month'
];
Month.prototype.sizeRatio = 2;
Month.prototype.lowerBound = 0;
Month.prototype.upperBound = 12;
Month.prototype.step = 1;
Month.prototype.loop = true;
Month.prototype.set = 'setMonth';
Month.prototype.get = 'getMonth';
Month.prototype.strings = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];
Month.prototype.format = function (date) {
    return this.strings[date.getMonth()];
};
function FullDay() {
    Base.apply(this, arguments);
}
FullDay.prototype = Object.create(Base.prototype);
FullDay.prototype.constructor = FullDay;
FullDay.prototype.classes = [
    'item',
    'fullday'
];
FullDay.prototype.sizeRatio = 2;
FullDay.prototype.step = 1;
FullDay.prototype.set = 'setDate';
FullDay.prototype.get = 'getDate';
FullDay.prototype.format = function (date) {
    return date.toLocaleDateString();
};
function WeekDay() {
    Base.apply(this, arguments);
}
WeekDay.prototype = Object.create(Base.prototype);
WeekDay.prototype.constructor = WeekDay;
WeekDay.prototype.classes = [
    'item',
    'weekday'
];
WeekDay.prototype.sizeRatio = 2;
WeekDay.prototype.lowerBound = 0;
WeekDay.prototype.upperBound = 7;
WeekDay.prototype.step = 1;
WeekDay.prototype.loop = true;
WeekDay.prototype.set = 'setDate';
WeekDay.prototype.get = 'getDate';
WeekDay.prototype.strings = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
];
WeekDay.prototype.format = function (date) {
    return this.strings[date.getDay()];
};
function Day() {
    Base.apply(this, arguments);
}
Day.prototype = Object.create(Base.prototype);
Day.prototype.constructor = Day;
Day.prototype.classes = [
    'item',
    'day'
];
Day.prototype.format = decimal1;
Day.prototype.sizeRatio = 1;
Day.prototype.lowerBound = 1;
Day.prototype.upperBound = 32;
Day.prototype.step = 1;
Day.prototype.loop = true;
Day.prototype.set = 'setDate';
Day.prototype.get = 'getDate';
function Hour() {
    Base.apply(this, arguments);
}
Hour.prototype = Object.create(Base.prototype);
Hour.prototype.constructor = Hour;
Hour.prototype.classes = [
    'item',
    'hour'
];
Hour.prototype.format = decimal2;
Hour.prototype.sizeRatio = 1;
Hour.prototype.lowerBound = 0;
Hour.prototype.upperBound = 24;
Hour.prototype.step = 1;
Hour.prototype.loop = true;
Hour.prototype.set = 'setHours';
Hour.prototype.get = 'getHours';
function Minute() {
    Base.apply(this, arguments);
}
Minute.prototype = Object.create(Base.prototype);
Minute.prototype.constructor = Minute;
Minute.prototype.classes = [
    'item',
    'minute'
];
Minute.prototype.format = decimal2;
Minute.prototype.sizeRatio = 1;
Minute.prototype.lowerBound = 0;
Minute.prototype.upperBound = 60;
Minute.prototype.step = 1;
Minute.prototype.loop = true;
Minute.prototype.set = 'setMinutes';
Minute.prototype.get = 'getMinutes';
function Second() {
    Base.apply(this, arguments);
}
Second.prototype = Object.create(Base.prototype);
Second.prototype.constructor = Second;
Second.prototype.classes = [
    'item',
    'second'
];
Second.prototype.format = decimal2;
Second.prototype.sizeRatio = 1;
Second.prototype.lowerBound = 0;
Second.prototype.upperBound = 60;
Second.prototype.step = 1;
Second.prototype.loop = true;
Second.prototype.set = 'setSeconds';
Second.prototype.get = 'getSeconds';
function Millisecond() {
    Base.apply(this, arguments);
}
Millisecond.prototype = Object.create(Base.prototype);
Millisecond.prototype.constructor = Millisecond;
Millisecond.prototype.classes = [
    'item',
    'millisecond'
];
Millisecond.prototype.format = decimal3;
Millisecond.prototype.sizeRatio = 1;
Millisecond.prototype.lowerBound = 0;
Millisecond.prototype.upperBound = 1000;
Millisecond.prototype.step = 1;
Millisecond.prototype.loop = true;
Millisecond.prototype.set = 'setMilliseconds';
Millisecond.prototype.get = 'getMilliseconds';
module.exports = {
    Base: Base,
    Year: Year,
    Month: Month,
    FullDay: FullDay,
    WeekDay: WeekDay,
    Day: Day,
    Hour: Hour,
    Minute: Minute,
    Second: Second,
    Millisecond: Millisecond
};
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],24:[function(require,module,exports){
(function (global){
var Surface = typeof window !== 'undefined' ? window.famous.core.Surface : typeof global !== 'undefined' ? global.famous.core.Surface : null;
var View = typeof window !== 'undefined' ? window.famous.core.View : typeof global !== 'undefined' ? global.famous.core.View : null;
var LayoutController = require('../LayoutController');
var TabBarLayout = require('../layouts/TabBarLayout');
function TabBar(options) {
    View.apply(this, arguments);
    this._selectedItemIndex = -1;
    options = options || {};
    this.classes = options.classes ? this.classes.concat(options.classes) : this.classes;
    this.layout = new LayoutController(this.options.layoutController);
    this.add(this.layout);
    this.layout.pipe(this._eventOutput);
    this._renderables = {
        items: [],
        spacers: [],
        background: _createRenderable.call(this, 'background'),
        selectedItemOverlay: _createRenderable.call(this, 'selectedItemOverlay')
    };
    this.setOptions(this.options);
}
TabBar.prototype = Object.create(View.prototype);
TabBar.prototype.constructor = TabBar;
TabBar.prototype.classes = [
    'ff-widget',
    'ff-tabbar'
];
TabBar.DEFAULT_OPTIONS = {
    tabBarLayout: {
        margins: [
            0,
            0,
            0,
            0
        ],
        spacing: 0
    },
    createRenderables: {
        item: true,
        background: false,
        selectedItemOverlay: false,
        spacer: false
    },
    layoutController: {
        autoPipeEvents: true,
        layout: TabBarLayout,
        flow: true,
        reflowOnResize: false,
        nodeSpring: {
            dampingRatio: 0.8,
            period: 300
        }
    }
};
function _setSelectedItem(index) {
    if (index !== this._selectedItemIndex) {
        var oldIndex = this._selectedItemIndex;
        this._selectedItemIndex = index;
        this.layout.setLayoutOptions({ selectedItemIndex: index });
        if (oldIndex >= 0 && this._renderables.items[oldIndex].removeClass) {
            this._renderables.items[oldIndex].removeClass('selected');
        }
        if (this._renderables.items[index].addClass) {
            this._renderables.items[index].addClass('selected');
        }
        if (oldIndex >= 0) {
            this._eventOutput.emit('tabchange', {
                target: this,
                index: index,
                oldIndex: oldIndex,
                item: this._renderables.items[index]
            });
        }
    }
}
function _createRenderable(id, data) {
    var option = this.options.createRenderables[id];
    if (option instanceof Function) {
        return option.call(this, id, data);
    } else if (!option) {
        return undefined;
    }
    if (data !== undefined && data instanceof Object) {
        return data;
    }
    var surface = new Surface({
            classes: this.classes,
            content: data ? '<div>' + data + '</div>' : undefined
        });
    surface.addClass(id);
    if (id === 'item') {
        if (this.options.tabBarLayout && this.options.tabBarLayout.itemSize && this.options.tabBarLayout.itemSize === true) {
            surface.setSize(this.layout.getDirection() ? [
                undefined,
                true
            ] : [
                true,
                undefined
            ]);
        }
    }
    return surface;
}
TabBar.prototype.setOptions = function (options) {
    View.prototype.setOptions.call(this, options);
    if (!this.layout) {
        return this;
    }
    if (options.tabBarLayout !== undefined) {
        this.layout.setLayoutOptions(options.tabBarLayout);
    }
    if (options.layoutController) {
        this.layout.setOptions(options.layoutController);
    }
    return this;
};
TabBar.prototype.setItems = function (items) {
    var currentIndex = this._selectedItemIndex;
    this._selectedItemIndex = -1;
    this._renderables.items = [];
    this._renderables.spacers = [];
    if (items) {
        for (var i = 0; i < items.length; i++) {
            var item = _createRenderable.call(this, 'item', items[i]);
            if (item.on) {
                item.on('click', _setSelectedItem.bind(this, i));
            }
            this._renderables.items.push(item);
            if (i < items.length - 1) {
                var spacer = _createRenderable.call(this, 'spacer', ' ');
                if (spacer) {
                    this._renderables.spacers.push(spacer);
                }
            }
        }
    }
    this.layout.setDataSource(this._renderables);
    if (this._renderables.items.length) {
        _setSelectedItem.call(this, Math.max(Math.min(currentIndex, this._renderables.items.length - 1), 0));
    }
    return this;
};
TabBar.prototype.getItems = function () {
    return this._renderables.items;
};
TabBar.prototype.getItemSpec = function (index, normalize) {
    return this.layout.getSpec(this._renderables.items[index], normalize);
};
TabBar.prototype.setSelectedItemIndex = function (index) {
    _setSelectedItem.call(this, index);
    return this;
};
TabBar.prototype.getSelectedItemIndex = function () {
    return this._selectedItemIndex;
};
TabBar.prototype.getSize = function () {
    return this.options.size || (this.layout ? this.layout.getSize() : View.prototype.getSize.call(this));
};
module.exports = TabBar;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../LayoutController":5,"../layouts/TabBarLayout":20}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkaXN0L2ZhbW91cy1mbGV4LWdsb2JhbC50ZW1wbGF0ZS5qcyIsInNyYy9GbGV4U2Nyb2xsVmlldy5qcyIsInNyYy9GbG93TGF5b3V0Tm9kZS5qcyIsInNyYy9MYXlvdXRDb250ZXh0LmpzIiwic3JjL0xheW91dENvbnRyb2xsZXIuanMiLCJzcmMvTGF5b3V0Tm9kZS5qcyIsInNyYy9MYXlvdXROb2RlTWFuYWdlci5qcyIsInNyYy9MYXlvdXRVdGlsaXR5LmpzIiwic3JjL1Njcm9sbENvbnRyb2xsZXIuanMiLCJzcmMvVmlydHVhbFZpZXdTZXF1ZW5jZS5qcyIsInNyYy9oZWxwZXJzL0xheW91dERvY2tIZWxwZXIuanMiLCJzcmMvbGF5b3V0cy9Db2xsZWN0aW9uTGF5b3V0LmpzIiwic3JjL2xheW91dHMvQ292ZXJMYXlvdXQuanMiLCJzcmMvbGF5b3V0cy9DdWJlTGF5b3V0LmpzIiwic3JjL2xheW91dHMvR3JpZExheW91dC5qcyIsInNyYy9sYXlvdXRzL0hlYWRlckZvb3RlckxheW91dC5qcyIsInNyYy9sYXlvdXRzL0xpc3RMYXlvdXQuanMiLCJzcmMvbGF5b3V0cy9OYXZCYXJMYXlvdXQuanMiLCJzcmMvbGF5b3V0cy9Qcm9wb3J0aW9uYWxMYXlvdXQuanMiLCJzcmMvbGF5b3V0cy9UYWJCYXJMYXlvdXQuanMiLCJzcmMvbGF5b3V0cy9XaGVlbExheW91dC5qcyIsInNyYy93aWRnZXRzL0RhdGVQaWNrZXIuanMiLCJzcmMvd2lkZ2V0cy9EYXRlUGlja2VyQ29tcG9uZW50cy5qcyIsInNyYy93aWRnZXRzL1RhYkJhci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDalpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDbFdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ3BkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUN4SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUMxY0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQzdLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQy9zQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDMUhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUN0TUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNoTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDeEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEVBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ3hLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDckRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ2xIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQzFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQzlSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQzlSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImlmICh0eXBlb2YgZmFtb3VzZmxleCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBmYW1vdXNmbGV4ID0ge307XG59XG5cbmZhbW91c2ZsZXguRmxleFNjcm9sbFZpZXcgPSByZXF1aXJlKCcuLi9zcmMvRmxleFNjcm9sbFZpZXcnKTtcbmZhbW91c2ZsZXguRmxvd0xheW91dE5vZGUgPSByZXF1aXJlKCcuLi9zcmMvRmxvd0xheW91dE5vZGUnKTtcbmZhbW91c2ZsZXguTGF5b3V0Q29udGV4dCA9IHJlcXVpcmUoJy4uL3NyYy9MYXlvdXRDb250ZXh0Jyk7XG5mYW1vdXNmbGV4LkxheW91dENvbnRyb2xsZXIgPSByZXF1aXJlKCcuLi9zcmMvTGF5b3V0Q29udHJvbGxlcicpO1xuZmFtb3VzZmxleC5MYXlvdXROb2RlID0gcmVxdWlyZSgnLi4vc3JjL0xheW91dE5vZGUnKTtcbmZhbW91c2ZsZXguTGF5b3V0Tm9kZU1hbmFnZXIgPSByZXF1aXJlKCcuLi9zcmMvTGF5b3V0Tm9kZU1hbmFnZXInKTtcbmZhbW91c2ZsZXguTGF5b3V0VXRpbGl0eSA9IHJlcXVpcmUoJy4uL3NyYy9MYXlvdXRVdGlsaXR5Jyk7XG5mYW1vdXNmbGV4LlNjcm9sbENvbnRyb2xsZXIgPSByZXF1aXJlKCcuLi9zcmMvU2Nyb2xsQ29udHJvbGxlcicpO1xuZmFtb3VzZmxleC5WaXJ0dWFsVmlld1NlcXVlbmNlID0gcmVxdWlyZSgnLi4vc3JjL1ZpcnR1YWxWaWV3U2VxdWVuY2UnKTtcblxuZmFtb3VzZmxleC53aWRnZXRzID0gZmFtb3VzZmxleC53aWRnZXRzIHx8IHt9O1xuZmFtb3VzZmxleC53aWRnZXRzLkRhdGVQaWNrZXIgPSByZXF1aXJlKCcuLi9zcmMvd2lkZ2V0cy9EYXRlUGlja2VyJyk7XG5mYW1vdXNmbGV4LndpZGdldHMuVGFiQmFyID0gcmVxdWlyZSgnLi4vc3JjL3dpZGdldHMvVGFiQmFyJyk7XG5cbmZhbW91c2ZsZXgubGF5b3V0cyA9IGZhbW91c2ZsZXgubGF5b3V0cyB8fCB7fTtcbmZhbW91c2ZsZXgubGF5b3V0cy5Db2xsZWN0aW9uTGF5b3V0ID0gcmVxdWlyZSgnLi4vc3JjL2xheW91dHMvQ29sbGVjdGlvbkxheW91dCcpO1xuZmFtb3VzZmxleC5sYXlvdXRzLkNvdmVyTGF5b3V0ID0gcmVxdWlyZSgnLi4vc3JjL2xheW91dHMvQ292ZXJMYXlvdXQnKTtcbmZhbW91c2ZsZXgubGF5b3V0cy5DdWJlTGF5b3V0ID0gcmVxdWlyZSgnLi4vc3JjL2xheW91dHMvQ3ViZUxheW91dCcpO1xuZmFtb3VzZmxleC5sYXlvdXRzLkdyaWRMYXlvdXQgPSByZXF1aXJlKCcuLi9zcmMvbGF5b3V0cy9HcmlkTGF5b3V0Jyk7XG5mYW1vdXNmbGV4LmxheW91dHMuSGVhZGVyRm9vdGVyTGF5b3V0ID0gcmVxdWlyZSgnLi4vc3JjL2xheW91dHMvSGVhZGVyRm9vdGVyTGF5b3V0Jyk7XG5mYW1vdXNmbGV4LmxheW91dHMuTGlzdExheW91dCA9IHJlcXVpcmUoJy4uL3NyYy9sYXlvdXRzL0xpc3RMYXlvdXQnKTtcbmZhbW91c2ZsZXgubGF5b3V0cy5OYXZCYXJMYXlvdXQgPSByZXF1aXJlKCcuLi9zcmMvbGF5b3V0cy9OYXZCYXJMYXlvdXQnKTtcbmZhbW91c2ZsZXgubGF5b3V0cy5Qcm9wb3J0aW9uYWxMYXlvdXQgPSByZXF1aXJlKCcuLi9zcmMvbGF5b3V0cy9Qcm9wb3J0aW9uYWxMYXlvdXQnKTtcbmZhbW91c2ZsZXgubGF5b3V0cy5XaGVlbExheW91dCA9IHJlcXVpcmUoJy4uL3NyYy9sYXlvdXRzL1doZWVsTGF5b3V0Jyk7XG5cbmZhbW91c2ZsZXguaGVscGVycyA9IGZhbW91c2ZsZXguaGVscGVycyB8fCB7fTtcbmZhbW91c2ZsZXguaGVscGVycy5MYXlvdXREb2NrSGVscGVyID0gcmVxdWlyZSgnLi4vc3JjL2hlbHBlcnMvTGF5b3V0RG9ja0hlbHBlcicpO1xuIiwidmFyIExheW91dFV0aWxpdHkgPSByZXF1aXJlKCcuL0xheW91dFV0aWxpdHknKTtcbnZhciBTY3JvbGxDb250cm9sbGVyID0gcmVxdWlyZSgnLi9TY3JvbGxDb250cm9sbGVyJyk7XG52YXIgTGlzdExheW91dCA9IHJlcXVpcmUoJy4vbGF5b3V0cy9MaXN0TGF5b3V0Jyk7XG52YXIgUHVsbFRvUmVmcmVzaFN0YXRlID0ge1xuICAgICAgICBISURERU46IDAsXG4gICAgICAgIFBVTExJTkc6IDEsXG4gICAgICAgIEFDVElWRTogMixcbiAgICAgICAgQ09NUExFVEVEOiAzLFxuICAgICAgICBISURESU5HOiA0XG4gICAgfTtcbmZ1bmN0aW9uIEZsZXhTY3JvbGxWaWV3KG9wdGlvbnMpIHtcbiAgICBTY3JvbGxDb250cm9sbGVyLmNhbGwodGhpcywgTGF5b3V0VXRpbGl0eS5jb21iaW5lT3B0aW9ucyhGbGV4U2Nyb2xsVmlldy5ERUZBVUxUX09QVElPTlMsIG9wdGlvbnMpKTtcbiAgICB0aGlzLl90aGlzU2Nyb2xsVmlld0RlbHRhID0gMDtcbiAgICB0aGlzLl9sZWFkaW5nU2Nyb2xsVmlld0RlbHRhID0gMDtcbiAgICB0aGlzLl90cmFpbGluZ1Njcm9sbFZpZXdEZWx0YSA9IDA7XG59XG5GbGV4U2Nyb2xsVmlldy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFNjcm9sbENvbnRyb2xsZXIucHJvdG90eXBlKTtcbkZsZXhTY3JvbGxWaWV3LnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEZsZXhTY3JvbGxWaWV3O1xuRmxleFNjcm9sbFZpZXcuUHVsbFRvUmVmcmVzaFN0YXRlID0gUHVsbFRvUmVmcmVzaFN0YXRlO1xuRmxleFNjcm9sbFZpZXcuREVGQVVMVF9PUFRJT05TID0ge1xuICAgIGxheW91dDogTGlzdExheW91dCxcbiAgICBkaXJlY3Rpb246IHVuZGVmaW5lZCxcbiAgICBwYWdpbmF0ZWQ6IGZhbHNlLFxuICAgIGFsaWdubWVudDogMCxcbiAgICBmbG93OiBmYWxzZSxcbiAgICBtb3VzZU1vdmU6IGZhbHNlLFxuICAgIHVzZUNvbnRhaW5lcjogZmFsc2UsXG4gICAgdmlzaWJsZUl0ZW1UaHJlc3Nob2xkOiAwLjUsXG4gICAgcHVsbFRvUmVmcmVzaEhlYWRlcjogdW5kZWZpbmVkLFxuICAgIHB1bGxUb1JlZnJlc2hGb290ZXI6IHVuZGVmaW5lZCxcbiAgICBsZWFkaW5nU2Nyb2xsVmlldzogdW5kZWZpbmVkLFxuICAgIHRyYWlsaW5nU2Nyb2xsVmlldzogdW5kZWZpbmVkXG59O1xuRmxleFNjcm9sbFZpZXcucHJvdG90eXBlLnNldE9wdGlvbnMgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIFNjcm9sbENvbnRyb2xsZXIucHJvdG90eXBlLnNldE9wdGlvbnMuY2FsbCh0aGlzLCBvcHRpb25zKTtcbiAgICBpZiAob3B0aW9ucy5wdWxsVG9SZWZyZXNoSGVhZGVyIHx8IG9wdGlvbnMucHVsbFRvUmVmcmVzaEZvb3RlciB8fCB0aGlzLl9wdWxsVG9SZWZyZXNoKSB7XG4gICAgICAgIGlmIChvcHRpb25zLnB1bGxUb1JlZnJlc2hIZWFkZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX3B1bGxUb1JlZnJlc2ggPSB0aGlzLl9wdWxsVG9SZWZyZXNoIHx8IFtcbiAgICAgICAgICAgICAgICB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgdW5kZWZpbmVkXG4gICAgICAgICAgICBdO1xuICAgICAgICAgICAgaWYgKCF0aGlzLl9wdWxsVG9SZWZyZXNoWzBdKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcHVsbFRvUmVmcmVzaFswXSA9IHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGU6IFB1bGxUb1JlZnJlc2hTdGF0ZS5ISURERU4sXG4gICAgICAgICAgICAgICAgICAgIHByZXZTdGF0ZTogUHVsbFRvUmVmcmVzaFN0YXRlLkhJRERFTixcbiAgICAgICAgICAgICAgICAgICAgZm9vdGVyOiBmYWxzZVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9wdWxsVG9SZWZyZXNoWzBdLm5vZGUgPSBvcHRpb25zLnB1bGxUb1JlZnJlc2hIZWFkZXI7XG4gICAgICAgIH0gZWxzZSBpZiAoIXRoaXMub3B0aW9ucy5wdWxsVG9SZWZyZXNoSGVhZGVyICYmIHRoaXMuX3B1bGxUb1JlZnJlc2gpIHtcbiAgICAgICAgICAgIHRoaXMuX3B1bGxUb1JlZnJlc2hbMF0gPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdGlvbnMucHVsbFRvUmVmcmVzaEZvb3Rlcikge1xuICAgICAgICAgICAgdGhpcy5fcHVsbFRvUmVmcmVzaCA9IHRoaXMuX3B1bGxUb1JlZnJlc2ggfHwgW1xuICAgICAgICAgICAgICAgIHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICB1bmRlZmluZWRcbiAgICAgICAgICAgIF07XG4gICAgICAgICAgICBpZiAoIXRoaXMuX3B1bGxUb1JlZnJlc2hbMV0pIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9wdWxsVG9SZWZyZXNoWzFdID0ge1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZTogUHVsbFRvUmVmcmVzaFN0YXRlLkhJRERFTixcbiAgICAgICAgICAgICAgICAgICAgcHJldlN0YXRlOiBQdWxsVG9SZWZyZXNoU3RhdGUuSElEREVOLFxuICAgICAgICAgICAgICAgICAgICBmb290ZXI6IHRydWVcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fcHVsbFRvUmVmcmVzaFsxXS5ub2RlID0gb3B0aW9ucy5wdWxsVG9SZWZyZXNoRm9vdGVyO1xuICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLm9wdGlvbnMucHVsbFRvUmVmcmVzaEZvb3RlciAmJiB0aGlzLl9wdWxsVG9SZWZyZXNoKSB7XG4gICAgICAgICAgICB0aGlzLl9wdWxsVG9SZWZyZXNoWzFdID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9wdWxsVG9SZWZyZXNoICYmICF0aGlzLl9wdWxsVG9SZWZyZXNoWzBdICYmICF0aGlzLl9wdWxsVG9SZWZyZXNoWzFdKSB7XG4gICAgICAgICAgICB0aGlzLl9wdWxsVG9SZWZyZXNoID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xufTtcbkZsZXhTY3JvbGxWaWV3LnByb3RvdHlwZS5zZXF1ZW5jZUZyb20gPSBmdW5jdGlvbiAobm9kZSkge1xuICAgIHJldHVybiB0aGlzLnNldERhdGFTb3VyY2Uobm9kZSk7XG59O1xuRmxleFNjcm9sbFZpZXcucHJvdG90eXBlLmdldEN1cnJlbnRJbmRleCA9IGZ1bmN0aW9uIGdldEN1cnJlbnRJbmRleCgpIHtcbiAgICB2YXIgaXRlbSA9IHRoaXMuZ2V0Rmlyc3RWaXNpYmxlSXRlbSgpO1xuICAgIHJldHVybiBpdGVtID8gaXRlbS52aWV3U2VxdWVuY2UuZ2V0SW5kZXgoKSA6IC0xO1xufTtcbkZsZXhTY3JvbGxWaWV3LnByb3RvdHlwZS5nb1RvUGFnZSA9IGZ1bmN0aW9uIGdvVG9QYWdlKGluZGV4KSB7XG4gICAgdmFyIHZpZXdTZXF1ZW5jZSA9IHRoaXMuX3ZpZXdTZXF1ZW5jZTtcbiAgICBpZiAoIXZpZXdTZXF1ZW5jZSkge1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgd2hpbGUgKHZpZXdTZXF1ZW5jZS5nZXRJbmRleCgpIDwgaW5kZXgpIHtcbiAgICAgICAgdmlld1NlcXVlbmNlID0gdmlld1NlcXVlbmNlLmdldE5leHQoKTtcbiAgICAgICAgaWYgKCF2aWV3U2VxdWVuY2UpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgfVxuICAgIHdoaWxlICh2aWV3U2VxdWVuY2UuZ2V0SW5kZXgoKSA+IGluZGV4KSB7XG4gICAgICAgIHZpZXdTZXF1ZW5jZSA9IHZpZXdTZXF1ZW5jZS5nZXRQcmV2aW91cygpO1xuICAgICAgICBpZiAoIXZpZXdTZXF1ZW5jZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5nb1RvUmVuZGVyTm9kZSh2aWV3U2VxdWVuY2UuZ2V0KCkpO1xuICAgIHJldHVybiB0aGlzO1xufTtcbkZsZXhTY3JvbGxWaWV3LnByb3RvdHlwZS5nZXRPZmZzZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Njcm9sbE9mZnNldENhY2hlO1xufTtcbkZsZXhTY3JvbGxWaWV3LnByb3RvdHlwZS5nZXRQb3NpdGlvbiA9IEZsZXhTY3JvbGxWaWV3LnByb3RvdHlwZS5nZXRPZmZzZXQ7XG5mdW5jdGlvbiBfc2V0UHVsbFRvUmVmcmVzaFN0YXRlKHB1bGxUb1JlZnJlc2gsIHN0YXRlKSB7XG4gICAgaWYgKHB1bGxUb1JlZnJlc2guc3RhdGUgIT09IHN0YXRlKSB7XG4gICAgICAgIHB1bGxUb1JlZnJlc2guc3RhdGUgPSBzdGF0ZTtcbiAgICAgICAgaWYgKHB1bGxUb1JlZnJlc2gubm9kZSAmJiBwdWxsVG9SZWZyZXNoLm5vZGUuc2V0UHVsbFRvUmVmcmVzaFN0YXR1cykge1xuICAgICAgICAgICAgcHVsbFRvUmVmcmVzaC5ub2RlLnNldFB1bGxUb1JlZnJlc2hTdGF0dXMoc3RhdGUpO1xuICAgICAgICB9XG4gICAgfVxufVxuZnVuY3Rpb24gX2dldFB1bGxUb1JlZnJlc2goZm9vdGVyKSB7XG4gICAgcmV0dXJuIHRoaXMuX3B1bGxUb1JlZnJlc2ggPyB0aGlzLl9wdWxsVG9SZWZyZXNoW2Zvb3RlciA/IDEgOiAwXSA6IHVuZGVmaW5lZDtcbn1cbkZsZXhTY3JvbGxWaWV3LnByb3RvdHlwZS5fcG9zdExheW91dCA9IGZ1bmN0aW9uIChzaXplLCBzY3JvbGxPZmZzZXQpIHtcbiAgICBpZiAoIXRoaXMuX3B1bGxUb1JlZnJlc2gpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5vcHRpb25zLmFsaWdubWVudCkge1xuICAgICAgICBzY3JvbGxPZmZzZXQgKz0gc2l6ZVt0aGlzLl9kaXJlY3Rpb25dO1xuICAgIH1cbiAgICB2YXIgcHJldkhlaWdodDtcbiAgICB2YXIgbmV4dEhlaWdodDtcbiAgICB2YXIgdG90YWxIZWlnaHQ7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCAyOyBpKyspIHtcbiAgICAgICAgdmFyIHB1bGxUb1JlZnJlc2ggPSB0aGlzLl9wdWxsVG9SZWZyZXNoW2ldO1xuICAgICAgICBpZiAocHVsbFRvUmVmcmVzaCkge1xuICAgICAgICAgICAgdmFyIGxlbmd0aCA9IHB1bGxUb1JlZnJlc2gubm9kZS5nZXRTaXplKClbdGhpcy5fZGlyZWN0aW9uXTtcbiAgICAgICAgICAgIHZhciBwdWxsTGVuZ3RoID0gcHVsbFRvUmVmcmVzaC5ub2RlLmdldFB1bGxUb1JlZnJlc2hTaXplID8gcHVsbFRvUmVmcmVzaC5ub2RlLmdldFB1bGxUb1JlZnJlc2hTaXplKClbdGhpcy5fZGlyZWN0aW9uXSA6IGxlbmd0aDtcbiAgICAgICAgICAgIHZhciBvZmZzZXQ7XG4gICAgICAgICAgICBpZiAoIXB1bGxUb1JlZnJlc2guZm9vdGVyKSB7XG4gICAgICAgICAgICAgICAgcHJldkhlaWdodCA9IHRoaXMuX2NhbGNTY3JvbGxIZWlnaHQoZmFsc2UpO1xuICAgICAgICAgICAgICAgIHByZXZIZWlnaHQgPSBwcmV2SGVpZ2h0ID09PSB1bmRlZmluZWQgPyAtMSA6IHByZXZIZWlnaHQ7XG4gICAgICAgICAgICAgICAgb2Zmc2V0ID0gcHJldkhlaWdodCA+PSAwID8gc2Nyb2xsT2Zmc2V0IC0gcHJldkhlaWdodCA6IHByZXZIZWlnaHQ7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5hbGlnbm1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dEhlaWdodCA9IHRoaXMuX2NhbGNTY3JvbGxIZWlnaHQodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIG5leHRIZWlnaHQgPSBuZXh0SGVpZ2h0ID09PSB1bmRlZmluZWQgPyAtMSA6IG5leHRIZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgIHRvdGFsSGVpZ2h0ID0gcHJldkhlaWdodCA+PSAwICYmIG5leHRIZWlnaHQgPj0gMCA/IHByZXZIZWlnaHQgKyBuZXh0SGVpZ2h0IDogLTE7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0b3RhbEhlaWdodCA+PSAwICYmIHRvdGFsSGVpZ2h0IDwgc2l6ZVt0aGlzLl9kaXJlY3Rpb25dKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvZmZzZXQgPSBNYXRoLnJvdW5kKHNjcm9sbE9mZnNldCAtIHNpemVbdGhpcy5fZGlyZWN0aW9uXSArIG5leHRIZWlnaHQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBuZXh0SGVpZ2h0ID0gbmV4dEhlaWdodCA9PT0gdW5kZWZpbmVkID8gbmV4dEhlaWdodCA9IHRoaXMuX2NhbGNTY3JvbGxIZWlnaHQodHJ1ZSkgOiBuZXh0SGVpZ2h0O1xuICAgICAgICAgICAgICAgIG5leHRIZWlnaHQgPSBuZXh0SGVpZ2h0ID09PSB1bmRlZmluZWQgPyAtMSA6IG5leHRIZWlnaHQ7XG4gICAgICAgICAgICAgICAgb2Zmc2V0ID0gbmV4dEhlaWdodCA+PSAwID8gc2Nyb2xsT2Zmc2V0ICsgbmV4dEhlaWdodCA6IHNpemVbdGhpcy5fZGlyZWN0aW9uXSArIDE7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnMuYWxpZ25tZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHByZXZIZWlnaHQgPSBwcmV2SGVpZ2h0ID09PSB1bmRlZmluZWQgPyB0aGlzLl9jYWxjU2Nyb2xsSGVpZ2h0KGZhbHNlKSA6IHByZXZIZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgIHByZXZIZWlnaHQgPSBwcmV2SGVpZ2h0ID09PSB1bmRlZmluZWQgPyAtMSA6IHByZXZIZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgIHRvdGFsSGVpZ2h0ID0gcHJldkhlaWdodCA+PSAwICYmIG5leHRIZWlnaHQgPj0gMCA/IHByZXZIZWlnaHQgKyBuZXh0SGVpZ2h0IDogLTE7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0b3RhbEhlaWdodCA+PSAwICYmIHRvdGFsSGVpZ2h0IDwgc2l6ZVt0aGlzLl9kaXJlY3Rpb25dKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvZmZzZXQgPSBNYXRoLnJvdW5kKHNjcm9sbE9mZnNldCAtIHByZXZIZWlnaHQgKyBzaXplW3RoaXMuX2RpcmVjdGlvbl0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG9mZnNldCA9IC0ob2Zmc2V0IC0gc2l6ZVt0aGlzLl9kaXJlY3Rpb25dKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciB2aXNpYmxlUGVyYyA9IE1hdGgubWF4KE1hdGgubWluKG9mZnNldCAvIHB1bGxMZW5ndGgsIDEpLCAwKTtcbiAgICAgICAgICAgIHN3aXRjaCAocHVsbFRvUmVmcmVzaC5zdGF0ZSkge1xuICAgICAgICAgICAgY2FzZSBQdWxsVG9SZWZyZXNoU3RhdGUuSElEREVOOlxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9zY3JvbGwuc2Nyb2xsRm9yY2VDb3VudCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodmlzaWJsZVBlcmMgPj0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgX3NldFB1bGxUb1JlZnJlc2hTdGF0ZShwdWxsVG9SZWZyZXNoLCBQdWxsVG9SZWZyZXNoU3RhdGUuQUNUSVZFKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChvZmZzZXQgPj0gMC4yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfc2V0UHVsbFRvUmVmcmVzaFN0YXRlKHB1bGxUb1JlZnJlc2gsIFB1bGxUb1JlZnJlc2hTdGF0ZS5QVUxMSU5HKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgUHVsbFRvUmVmcmVzaFN0YXRlLlBVTExJTkc6XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3Njcm9sbC5zY3JvbGxGb3JjZUNvdW50ICYmIHZpc2libGVQZXJjID49IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgX3NldFB1bGxUb1JlZnJlc2hTdGF0ZShwdWxsVG9SZWZyZXNoLCBQdWxsVG9SZWZyZXNoU3RhdGUuQUNUSVZFKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG9mZnNldCA8IDAuMikge1xuICAgICAgICAgICAgICAgICAgICBfc2V0UHVsbFRvUmVmcmVzaFN0YXRlKHB1bGxUb1JlZnJlc2gsIFB1bGxUb1JlZnJlc2hTdGF0ZS5ISURERU4pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgUHVsbFRvUmVmcmVzaFN0YXRlLkFDVElWRTpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgUHVsbFRvUmVmcmVzaFN0YXRlLkNPTVBMRVRFRDpcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX3Njcm9sbC5zY3JvbGxGb3JjZUNvdW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvZmZzZXQgPj0gMC4yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfc2V0UHVsbFRvUmVmcmVzaFN0YXRlKHB1bGxUb1JlZnJlc2gsIFB1bGxUb1JlZnJlc2hTdGF0ZS5ISURESU5HKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9zZXRQdWxsVG9SZWZyZXNoU3RhdGUocHVsbFRvUmVmcmVzaCwgUHVsbFRvUmVmcmVzaFN0YXRlLkhJRERFTik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFB1bGxUb1JlZnJlc2hTdGF0ZS5ISURESU5HOlxuICAgICAgICAgICAgICAgIGlmIChvZmZzZXQgPCAwLjIpIHtcbiAgICAgICAgICAgICAgICAgICAgX3NldFB1bGxUb1JlZnJlc2hTdGF0ZShwdWxsVG9SZWZyZXNoLCBQdWxsVG9SZWZyZXNoU3RhdGUuSElEREVOKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocHVsbFRvUmVmcmVzaC5zdGF0ZSAhPT0gUHVsbFRvUmVmcmVzaFN0YXRlLkhJRERFTikge1xuICAgICAgICAgICAgICAgIHZhciBjb250ZXh0Tm9kZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbmRlck5vZGU6IHB1bGxUb1JlZnJlc2gubm9kZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXY6ICFwdWxsVG9SZWZyZXNoLmZvb3RlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHQ6IHB1bGxUb1JlZnJlc2guZm9vdGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXg6ICFwdWxsVG9SZWZyZXNoLmZvb3RlciA/IC0tdGhpcy5fbm9kZXMuX2NvbnRleHRTdGF0ZS5wcmV2R2V0SW5kZXggOiArK3RoaXMuX25vZGVzLl9jb250ZXh0U3RhdGUubmV4dEdldEluZGV4XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgdmFyIHNjcm9sbExlbmd0aDtcbiAgICAgICAgICAgICAgICBpZiAocHVsbFRvUmVmcmVzaC5zdGF0ZSA9PT0gUHVsbFRvUmVmcmVzaFN0YXRlLkFDVElWRSkge1xuICAgICAgICAgICAgICAgICAgICBzY3JvbGxMZW5ndGggPSBsZW5ndGg7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9zY3JvbGwuc2Nyb2xsRm9yY2VDb3VudCkge1xuICAgICAgICAgICAgICAgICAgICBzY3JvbGxMZW5ndGggPSBNYXRoLm1pbihvZmZzZXQsIGxlbmd0aCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciBzZXQgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaXplOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZVswXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaXplWzFdXG4gICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNsYXRlOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC0wLjAwMVxuICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbExlbmd0aDogc2Nyb2xsTGVuZ3RoXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgc2V0LnNpemVbdGhpcy5fZGlyZWN0aW9uXSA9IE1hdGgubWF4KE1hdGgubWluKG9mZnNldCwgcHVsbExlbmd0aCksIDApO1xuICAgICAgICAgICAgICAgIHNldC50cmFuc2xhdGVbdGhpcy5fZGlyZWN0aW9uXSA9IHB1bGxUb1JlZnJlc2guZm9vdGVyID8gc2l6ZVt0aGlzLl9kaXJlY3Rpb25dIC0gbGVuZ3RoIDogMDtcbiAgICAgICAgICAgICAgICB0aGlzLl9ub2Rlcy5fY29udGV4dC5zZXQoY29udGV4dE5vZGUsIHNldCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59O1xuRmxleFNjcm9sbFZpZXcucHJvdG90eXBlLnNob3dQdWxsVG9SZWZyZXNoID0gZnVuY3Rpb24gKGZvb3Rlcikge1xuICAgIHZhciBwdWxsVG9SZWZyZXNoID0gX2dldFB1bGxUb1JlZnJlc2guY2FsbCh0aGlzLCBmb290ZXIpO1xuICAgIGlmIChwdWxsVG9SZWZyZXNoKSB7XG4gICAgICAgIF9zZXRQdWxsVG9SZWZyZXNoU3RhdGUocHVsbFRvUmVmcmVzaCwgUHVsbFRvUmVmcmVzaFN0YXRlLkFDVElWRSk7XG4gICAgICAgIHRoaXMuX3Njcm9sbC5zY3JvbGxEaXJ0eSA9IHRydWU7XG4gICAgfVxufTtcbkZsZXhTY3JvbGxWaWV3LnByb3RvdHlwZS5oaWRlUHVsbFRvUmVmcmVzaCA9IGZ1bmN0aW9uIChmb290ZXIpIHtcbiAgICB2YXIgcHVsbFRvUmVmcmVzaCA9IF9nZXRQdWxsVG9SZWZyZXNoLmNhbGwodGhpcywgZm9vdGVyKTtcbiAgICBpZiAocHVsbFRvUmVmcmVzaCAmJiBwdWxsVG9SZWZyZXNoLnN0YXRlID09PSBQdWxsVG9SZWZyZXNoU3RhdGUuQUNUSVZFKSB7XG4gICAgICAgIF9zZXRQdWxsVG9SZWZyZXNoU3RhdGUocHVsbFRvUmVmcmVzaCwgUHVsbFRvUmVmcmVzaFN0YXRlLkNPTVBMRVRFRCk7XG4gICAgICAgIHRoaXMuX3Njcm9sbC5zY3JvbGxEaXJ0eSA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xufTtcbkZsZXhTY3JvbGxWaWV3LnByb3RvdHlwZS5pc1B1bGxUb1JlZnJlc2hWaXNpYmxlID0gZnVuY3Rpb24gKGZvb3Rlcikge1xuICAgIHZhciBwdWxsVG9SZWZyZXNoID0gX2dldFB1bGxUb1JlZnJlc2guY2FsbCh0aGlzLCBmb290ZXIpO1xuICAgIHJldHVybiBwdWxsVG9SZWZyZXNoID8gcHVsbFRvUmVmcmVzaC5zdGF0ZSA9PT0gUHVsbFRvUmVmcmVzaFN0YXRlLkFDVElWRSA6IGZhbHNlO1xufTtcbkZsZXhTY3JvbGxWaWV3LnByb3RvdHlwZS5hcHBseVNjcm9sbEZvcmNlID0gZnVuY3Rpb24gKGRlbHRhKSB7XG4gICAgdmFyIGxlYWRpbmdTY3JvbGxWaWV3ID0gdGhpcy5vcHRpb25zLmxlYWRpbmdTY3JvbGxWaWV3O1xuICAgIHZhciB0cmFpbGluZ1Njcm9sbFZpZXcgPSB0aGlzLm9wdGlvbnMudHJhaWxpbmdTY3JvbGxWaWV3O1xuICAgIGlmICghbGVhZGluZ1Njcm9sbFZpZXcgJiYgIXRyYWlsaW5nU2Nyb2xsVmlldykge1xuICAgICAgICByZXR1cm4gU2Nyb2xsQ29udHJvbGxlci5wcm90b3R5cGUuYXBwbHlTY3JvbGxGb3JjZS5jYWxsKHRoaXMsIGRlbHRhKTtcbiAgICB9XG4gICAgdmFyIHBhcnRpYWxEZWx0YTtcbiAgICBpZiAoZGVsdGEgPCAwKSB7XG4gICAgICAgIGlmIChsZWFkaW5nU2Nyb2xsVmlldykge1xuICAgICAgICAgICAgcGFydGlhbERlbHRhID0gbGVhZGluZ1Njcm9sbFZpZXcuY2FuU2Nyb2xsKGRlbHRhKTtcbiAgICAgICAgICAgIHRoaXMuX2xlYWRpbmdTY3JvbGxWaWV3RGVsdGEgKz0gcGFydGlhbERlbHRhO1xuICAgICAgICAgICAgbGVhZGluZ1Njcm9sbFZpZXcuYXBwbHlTY3JvbGxGb3JjZShwYXJ0aWFsRGVsdGEpO1xuICAgICAgICAgICAgZGVsdGEgLT0gcGFydGlhbERlbHRhO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0cmFpbGluZ1Njcm9sbFZpZXcpIHtcbiAgICAgICAgICAgIHBhcnRpYWxEZWx0YSA9IHRoaXMuY2FuU2Nyb2xsKGRlbHRhKTtcbiAgICAgICAgICAgIFNjcm9sbENvbnRyb2xsZXIucHJvdG90eXBlLmFwcGx5U2Nyb2xsRm9yY2UuY2FsbCh0aGlzLCBwYXJ0aWFsRGVsdGEpO1xuICAgICAgICAgICAgdGhpcy5fdGhpc1Njcm9sbFZpZXdEZWx0YSArPSBwYXJ0aWFsRGVsdGE7XG4gICAgICAgICAgICBkZWx0YSAtPSBwYXJ0aWFsRGVsdGE7XG4gICAgICAgICAgICB0cmFpbGluZ1Njcm9sbFZpZXcuYXBwbHlTY3JvbGxGb3JjZShkZWx0YSk7XG4gICAgICAgICAgICB0aGlzLl90cmFpbGluZ1Njcm9sbFZpZXdEZWx0YSArPSBkZWx0YTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIFNjcm9sbENvbnRyb2xsZXIucHJvdG90eXBlLmFwcGx5U2Nyb2xsRm9yY2UuY2FsbCh0aGlzLCBkZWx0YSk7XG4gICAgICAgICAgICB0aGlzLl90aGlzU2Nyb2xsVmlld0RlbHRhICs9IGRlbHRhO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHRyYWlsaW5nU2Nyb2xsVmlldykge1xuICAgICAgICAgICAgcGFydGlhbERlbHRhID0gdHJhaWxpbmdTY3JvbGxWaWV3LmNhblNjcm9sbChkZWx0YSk7XG4gICAgICAgICAgICB0cmFpbGluZ1Njcm9sbFZpZXcuYXBwbHlTY3JvbGxGb3JjZShwYXJ0aWFsRGVsdGEpO1xuICAgICAgICAgICAgdGhpcy5fdHJhaWxpbmdTY3JvbGxWaWV3RGVsdGEgKz0gcGFydGlhbERlbHRhO1xuICAgICAgICAgICAgZGVsdGEgLT0gcGFydGlhbERlbHRhO1xuICAgICAgICB9XG4gICAgICAgIGlmIChsZWFkaW5nU2Nyb2xsVmlldykge1xuICAgICAgICAgICAgcGFydGlhbERlbHRhID0gdGhpcy5jYW5TY3JvbGwoZGVsdGEpO1xuICAgICAgICAgICAgU2Nyb2xsQ29udHJvbGxlci5wcm90b3R5cGUuYXBwbHlTY3JvbGxGb3JjZS5jYWxsKHRoaXMsIHBhcnRpYWxEZWx0YSk7XG4gICAgICAgICAgICB0aGlzLl90aGlzU2Nyb2xsVmlld0RlbHRhICs9IHBhcnRpYWxEZWx0YTtcbiAgICAgICAgICAgIGRlbHRhIC09IHBhcnRpYWxEZWx0YTtcbiAgICAgICAgICAgIGxlYWRpbmdTY3JvbGxWaWV3LmFwcGx5U2Nyb2xsRm9yY2UoZGVsdGEpO1xuICAgICAgICAgICAgdGhpcy5fbGVhZGluZ1Njcm9sbFZpZXdEZWx0YSArPSBkZWx0YTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIFNjcm9sbENvbnRyb2xsZXIucHJvdG90eXBlLmFwcGx5U2Nyb2xsRm9yY2UuY2FsbCh0aGlzLCBkZWx0YSk7XG4gICAgICAgICAgICB0aGlzLl90aGlzU2Nyb2xsVmlld0RlbHRhICs9IGRlbHRhO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xufTtcbkZsZXhTY3JvbGxWaWV3LnByb3RvdHlwZS51cGRhdGVTY3JvbGxGb3JjZSA9IGZ1bmN0aW9uIChwcmV2RGVsdGEsIG5ld0RlbHRhKSB7XG4gICAgdmFyIGxlYWRpbmdTY3JvbGxWaWV3ID0gdGhpcy5vcHRpb25zLmxlYWRpbmdTY3JvbGxWaWV3O1xuICAgIHZhciB0cmFpbGluZ1Njcm9sbFZpZXcgPSB0aGlzLm9wdGlvbnMudHJhaWxpbmdTY3JvbGxWaWV3O1xuICAgIGlmICghbGVhZGluZ1Njcm9sbFZpZXcgJiYgIXRyYWlsaW5nU2Nyb2xsVmlldykge1xuICAgICAgICByZXR1cm4gU2Nyb2xsQ29udHJvbGxlci5wcm90b3R5cGUudXBkYXRlU2Nyb2xsRm9yY2UuY2FsbCh0aGlzLCBwcmV2RGVsdGEsIG5ld0RlbHRhKTtcbiAgICB9XG4gICAgdmFyIHBhcnRpYWxEZWx0YTtcbiAgICB2YXIgZGVsdGEgPSBuZXdEZWx0YSAtIHByZXZEZWx0YTtcbiAgICBpZiAoZGVsdGEgPCAwKSB7XG4gICAgICAgIGlmIChsZWFkaW5nU2Nyb2xsVmlldykge1xuICAgICAgICAgICAgcGFydGlhbERlbHRhID0gbGVhZGluZ1Njcm9sbFZpZXcuY2FuU2Nyb2xsKGRlbHRhKTtcbiAgICAgICAgICAgIGxlYWRpbmdTY3JvbGxWaWV3LnVwZGF0ZVNjcm9sbEZvcmNlKHRoaXMuX2xlYWRpbmdTY3JvbGxWaWV3RGVsdGEsIHRoaXMuX2xlYWRpbmdTY3JvbGxWaWV3RGVsdGEgKyBwYXJ0aWFsRGVsdGEpO1xuICAgICAgICAgICAgdGhpcy5fbGVhZGluZ1Njcm9sbFZpZXdEZWx0YSArPSBwYXJ0aWFsRGVsdGE7XG4gICAgICAgICAgICBkZWx0YSAtPSBwYXJ0aWFsRGVsdGE7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRyYWlsaW5nU2Nyb2xsVmlldyAmJiBkZWx0YSkge1xuICAgICAgICAgICAgcGFydGlhbERlbHRhID0gdGhpcy5jYW5TY3JvbGwoZGVsdGEpO1xuICAgICAgICAgICAgU2Nyb2xsQ29udHJvbGxlci5wcm90b3R5cGUudXBkYXRlU2Nyb2xsRm9yY2UuY2FsbCh0aGlzLCB0aGlzLl90aGlzU2Nyb2xsVmlld0RlbHRhLCB0aGlzLl90aGlzU2Nyb2xsVmlld0RlbHRhICsgcGFydGlhbERlbHRhKTtcbiAgICAgICAgICAgIHRoaXMuX3RoaXNTY3JvbGxWaWV3RGVsdGEgKz0gcGFydGlhbERlbHRhO1xuICAgICAgICAgICAgZGVsdGEgLT0gcGFydGlhbERlbHRhO1xuICAgICAgICAgICAgdGhpcy5fdHJhaWxpbmdTY3JvbGxWaWV3RGVsdGEgKz0gZGVsdGE7XG4gICAgICAgICAgICB0cmFpbGluZ1Njcm9sbFZpZXcudXBkYXRlU2Nyb2xsRm9yY2UodGhpcy5fdHJhaWxpbmdTY3JvbGxWaWV3RGVsdGEsIHRoaXMuX3RyYWlsaW5nU2Nyb2xsVmlld0RlbHRhICsgZGVsdGEpO1xuICAgICAgICB9IGVsc2UgaWYgKGRlbHRhKSB7XG4gICAgICAgICAgICBTY3JvbGxDb250cm9sbGVyLnByb3RvdHlwZS51cGRhdGVTY3JvbGxGb3JjZS5jYWxsKHRoaXMsIHRoaXMuX3RoaXNTY3JvbGxWaWV3RGVsdGEsIHRoaXMuX3RoaXNTY3JvbGxWaWV3RGVsdGEgKyBkZWx0YSk7XG4gICAgICAgICAgICB0aGlzLl90aGlzU2Nyb2xsVmlld0RlbHRhICs9IGRlbHRhO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHRyYWlsaW5nU2Nyb2xsVmlldykge1xuICAgICAgICAgICAgcGFydGlhbERlbHRhID0gdHJhaWxpbmdTY3JvbGxWaWV3LmNhblNjcm9sbChkZWx0YSk7XG4gICAgICAgICAgICB0cmFpbGluZ1Njcm9sbFZpZXcudXBkYXRlU2Nyb2xsRm9yY2UodGhpcy5fdHJhaWxpbmdTY3JvbGxWaWV3RGVsdGEsIHRoaXMuX3RyYWlsaW5nU2Nyb2xsVmlld0RlbHRhICsgcGFydGlhbERlbHRhKTtcbiAgICAgICAgICAgIHRoaXMuX3RyYWlsaW5nU2Nyb2xsVmlld0RlbHRhICs9IHBhcnRpYWxEZWx0YTtcbiAgICAgICAgICAgIGRlbHRhIC09IHBhcnRpYWxEZWx0YTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobGVhZGluZ1Njcm9sbFZpZXcpIHtcbiAgICAgICAgICAgIHBhcnRpYWxEZWx0YSA9IHRoaXMuY2FuU2Nyb2xsKGRlbHRhKTtcbiAgICAgICAgICAgIFNjcm9sbENvbnRyb2xsZXIucHJvdG90eXBlLnVwZGF0ZVNjcm9sbEZvcmNlLmNhbGwodGhpcywgdGhpcy5fdGhpc1Njcm9sbFZpZXdEZWx0YSwgdGhpcy5fdGhpc1Njcm9sbFZpZXdEZWx0YSArIHBhcnRpYWxEZWx0YSk7XG4gICAgICAgICAgICB0aGlzLl90aGlzU2Nyb2xsVmlld0RlbHRhICs9IHBhcnRpYWxEZWx0YTtcbiAgICAgICAgICAgIGRlbHRhIC09IHBhcnRpYWxEZWx0YTtcbiAgICAgICAgICAgIGxlYWRpbmdTY3JvbGxWaWV3LnVwZGF0ZVNjcm9sbEZvcmNlKHRoaXMuX2xlYWRpbmdTY3JvbGxWaWV3RGVsdGEsIHRoaXMuX2xlYWRpbmdTY3JvbGxWaWV3RGVsdGEgKyBkZWx0YSk7XG4gICAgICAgICAgICB0aGlzLl9sZWFkaW5nU2Nyb2xsVmlld0RlbHRhICs9IGRlbHRhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgU2Nyb2xsQ29udHJvbGxlci5wcm90b3R5cGUudXBkYXRlU2Nyb2xsRm9yY2UuY2FsbCh0aGlzLCB0aGlzLl90aGlzU2Nyb2xsVmlld0RlbHRhLCB0aGlzLl90aGlzU2Nyb2xsVmlld0RlbHRhICsgZGVsdGEpO1xuICAgICAgICAgICAgdGhpcy5fdGhpc1Njcm9sbFZpZXdEZWx0YSArPSBkZWx0YTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbn07XG5GbGV4U2Nyb2xsVmlldy5wcm90b3R5cGUucmVsZWFzZVNjcm9sbEZvcmNlID0gZnVuY3Rpb24gKGRlbHRhLCB2ZWxvY2l0eSkge1xuICAgIHZhciBsZWFkaW5nU2Nyb2xsVmlldyA9IHRoaXMub3B0aW9ucy5sZWFkaW5nU2Nyb2xsVmlldztcbiAgICB2YXIgdHJhaWxpbmdTY3JvbGxWaWV3ID0gdGhpcy5vcHRpb25zLnRyYWlsaW5nU2Nyb2xsVmlldztcbiAgICBpZiAoIWxlYWRpbmdTY3JvbGxWaWV3ICYmICF0cmFpbGluZ1Njcm9sbFZpZXcpIHtcbiAgICAgICAgcmV0dXJuIFNjcm9sbENvbnRyb2xsZXIucHJvdG90eXBlLnJlbGVhc2VTY3JvbGxGb3JjZS5jYWxsKHRoaXMsIGRlbHRhLCB2ZWxvY2l0eSk7XG4gICAgfVxuICAgIHZhciBwYXJ0aWFsRGVsdGE7XG4gICAgaWYgKGRlbHRhIDwgMCkge1xuICAgICAgICBpZiAobGVhZGluZ1Njcm9sbFZpZXcpIHtcbiAgICAgICAgICAgIHBhcnRpYWxEZWx0YSA9IE1hdGgubWF4KHRoaXMuX2xlYWRpbmdTY3JvbGxWaWV3RGVsdGEsIGRlbHRhKTtcbiAgICAgICAgICAgIHRoaXMuX2xlYWRpbmdTY3JvbGxWaWV3RGVsdGEgLT0gcGFydGlhbERlbHRhO1xuICAgICAgICAgICAgZGVsdGEgLT0gcGFydGlhbERlbHRhO1xuICAgICAgICAgICAgbGVhZGluZ1Njcm9sbFZpZXcucmVsZWFzZVNjcm9sbEZvcmNlKHRoaXMuX2xlYWRpbmdTY3JvbGxWaWV3RGVsdGEsIGRlbHRhID8gMCA6IHZlbG9jaXR5KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHJhaWxpbmdTY3JvbGxWaWV3KSB7XG4gICAgICAgICAgICBwYXJ0aWFsRGVsdGEgPSBNYXRoLm1heCh0aGlzLl90aGlzU2Nyb2xsVmlld0RlbHRhLCBkZWx0YSk7XG4gICAgICAgICAgICB0aGlzLl90aGlzU2Nyb2xsVmlld0RlbHRhIC09IHBhcnRpYWxEZWx0YTtcbiAgICAgICAgICAgIGRlbHRhIC09IHBhcnRpYWxEZWx0YTtcbiAgICAgICAgICAgIFNjcm9sbENvbnRyb2xsZXIucHJvdG90eXBlLnJlbGVhc2VTY3JvbGxGb3JjZS5jYWxsKHRoaXMsIHRoaXMuX3RoaXNTY3JvbGxWaWV3RGVsdGEsIGRlbHRhID8gMCA6IHZlbG9jaXR5KTtcbiAgICAgICAgICAgIHRoaXMuX3RyYWlsaW5nU2Nyb2xsVmlld0RlbHRhIC09IGRlbHRhO1xuICAgICAgICAgICAgdHJhaWxpbmdTY3JvbGxWaWV3LnJlbGVhc2VTY3JvbGxGb3JjZSh0aGlzLl90cmFpbGluZ1Njcm9sbFZpZXdEZWx0YSwgZGVsdGEgPyB2ZWxvY2l0eSA6IDApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fdGhpc1Njcm9sbFZpZXdEZWx0YSAtPSBkZWx0YTtcbiAgICAgICAgICAgIFNjcm9sbENvbnRyb2xsZXIucHJvdG90eXBlLnJlbGVhc2VTY3JvbGxGb3JjZS5jYWxsKHRoaXMsIHRoaXMuX3RoaXNTY3JvbGxWaWV3RGVsdGEsIGRlbHRhID8gdmVsb2NpdHkgOiAwKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh0cmFpbGluZ1Njcm9sbFZpZXcpIHtcbiAgICAgICAgICAgIHBhcnRpYWxEZWx0YSA9IE1hdGgubWluKHRoaXMuX3RyYWlsaW5nU2Nyb2xsVmlld0RlbHRhLCBkZWx0YSk7XG4gICAgICAgICAgICB0aGlzLl90cmFpbGluZ1Njcm9sbFZpZXdEZWx0YSAtPSBwYXJ0aWFsRGVsdGE7XG4gICAgICAgICAgICBkZWx0YSAtPSBwYXJ0aWFsRGVsdGE7XG4gICAgICAgICAgICB0cmFpbGluZ1Njcm9sbFZpZXcucmVsZWFzZVNjcm9sbEZvcmNlKHRoaXMuX3RyYWlsaW5nU2Nyb2xsVmlld0RlbHRhLCBkZWx0YSA/IDAgOiB2ZWxvY2l0eSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGxlYWRpbmdTY3JvbGxWaWV3KSB7XG4gICAgICAgICAgICBwYXJ0aWFsRGVsdGEgPSBNYXRoLm1pbih0aGlzLl90aGlzU2Nyb2xsVmlld0RlbHRhLCBkZWx0YSk7XG4gICAgICAgICAgICB0aGlzLl90aGlzU2Nyb2xsVmlld0RlbHRhIC09IHBhcnRpYWxEZWx0YTtcbiAgICAgICAgICAgIGRlbHRhIC09IHBhcnRpYWxEZWx0YTtcbiAgICAgICAgICAgIFNjcm9sbENvbnRyb2xsZXIucHJvdG90eXBlLnJlbGVhc2VTY3JvbGxGb3JjZS5jYWxsKHRoaXMsIHRoaXMuX3RoaXNTY3JvbGxWaWV3RGVsdGEsIGRlbHRhID8gMCA6IHZlbG9jaXR5KTtcbiAgICAgICAgICAgIHRoaXMuX2xlYWRpbmdTY3JvbGxWaWV3RGVsdGEgLT0gZGVsdGE7XG4gICAgICAgICAgICBsZWFkaW5nU2Nyb2xsVmlldy5yZWxlYXNlU2Nyb2xsRm9yY2UodGhpcy5fbGVhZGluZ1Njcm9sbFZpZXdEZWx0YSwgZGVsdGEgPyB2ZWxvY2l0eSA6IDApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fdGhpc1Njcm9sbFZpZXdEZWx0YSAtPSBkZWx0YTtcbiAgICAgICAgICAgIFNjcm9sbENvbnRyb2xsZXIucHJvdG90eXBlLnVwZGF0ZVNjcm9sbEZvcmNlLmNhbGwodGhpcywgdGhpcy5fdGhpc1Njcm9sbFZpZXdEZWx0YSwgZGVsdGEgPyB2ZWxvY2l0eSA6IDApO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xufTtcbkZsZXhTY3JvbGxWaWV3LnByb3RvdHlwZS5jb21taXQgPSBmdW5jdGlvbiAoY29udGV4dCkge1xuICAgIHZhciByZXN1bHQgPSBTY3JvbGxDb250cm9sbGVyLnByb3RvdHlwZS5jb21taXQuY2FsbCh0aGlzLCBjb250ZXh0KTtcbiAgICBpZiAodGhpcy5fcHVsbFRvUmVmcmVzaCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDI7IGkrKykge1xuICAgICAgICAgICAgdmFyIHB1bGxUb1JlZnJlc2ggPSB0aGlzLl9wdWxsVG9SZWZyZXNoW2ldO1xuICAgICAgICAgICAgaWYgKHB1bGxUb1JlZnJlc2gpIHtcbiAgICAgICAgICAgICAgICBpZiAocHVsbFRvUmVmcmVzaC5zdGF0ZSA9PT0gUHVsbFRvUmVmcmVzaFN0YXRlLkFDVElWRSAmJiBwdWxsVG9SZWZyZXNoLnByZXZTdGF0ZSAhPT0gUHVsbFRvUmVmcmVzaFN0YXRlLkFDVElWRSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9ldmVudE91dHB1dC5lbWl0KCdyZWZyZXNoJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0OiB0aGlzLFxuICAgICAgICAgICAgICAgICAgICAgICAgZm9vdGVyOiBwdWxsVG9SZWZyZXNoLmZvb3RlclxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcHVsbFRvUmVmcmVzaC5wcmV2U3RhdGUgPSBwdWxsVG9SZWZyZXNoLnN0YXRlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59O1xubW9kdWxlLmV4cG9ydHMgPSBGbGV4U2Nyb2xsVmlldzsiLCJ2YXIgT3B0aW9uc01hbmFnZXIgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IHdpbmRvdy5mYW1vdXMuY29yZS5PcHRpb25zTWFuYWdlciA6IHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnID8gZ2xvYmFsLmZhbW91cy5jb3JlLk9wdGlvbnNNYW5hZ2VyIDogbnVsbDtcbnZhciBUcmFuc2Zvcm0gPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IHdpbmRvdy5mYW1vdXMuY29yZS5UcmFuc2Zvcm0gOiB0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJyA/IGdsb2JhbC5mYW1vdXMuY29yZS5UcmFuc2Zvcm0gOiBudWxsO1xudmFyIFZlY3RvciA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gd2luZG93LmZhbW91cy5tYXRoLlZlY3RvciA6IHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnID8gZ2xvYmFsLmZhbW91cy5tYXRoLlZlY3RvciA6IG51bGw7XG52YXIgUGFydGljbGUgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IHdpbmRvdy5mYW1vdXMucGh5c2ljcy5ib2RpZXMuUGFydGljbGUgOiB0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJyA/IGdsb2JhbC5mYW1vdXMucGh5c2ljcy5ib2RpZXMuUGFydGljbGUgOiBudWxsO1xudmFyIFNwcmluZyA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gd2luZG93LmZhbW91cy5waHlzaWNzLmZvcmNlcy5TcHJpbmcgOiB0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJyA/IGdsb2JhbC5mYW1vdXMucGh5c2ljcy5mb3JjZXMuU3ByaW5nIDogbnVsbDtcbnZhciBQaHlzaWNzRW5naW5lID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cuZmFtb3VzLnBoeXNpY3MuUGh5c2ljc0VuZ2luZSA6IHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnID8gZ2xvYmFsLmZhbW91cy5waHlzaWNzLlBoeXNpY3NFbmdpbmUgOiBudWxsO1xudmFyIExheW91dE5vZGUgPSByZXF1aXJlKCcuL0xheW91dE5vZGUnKTtcbnZhciBUcmFuc2l0aW9uYWJsZSA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gd2luZG93LmZhbW91cy50cmFuc2l0aW9ucy5UcmFuc2l0aW9uYWJsZSA6IHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnID8gZ2xvYmFsLmZhbW91cy50cmFuc2l0aW9ucy5UcmFuc2l0aW9uYWJsZSA6IG51bGw7XG5mdW5jdGlvbiBGbG93TGF5b3V0Tm9kZShyZW5kZXJOb2RlLCBzcGVjKSB7XG4gICAgTGF5b3V0Tm9kZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIGlmICghdGhpcy5vcHRpb25zKSB7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IE9iamVjdC5jcmVhdGUodGhpcy5jb25zdHJ1Y3Rvci5ERUZBVUxUX09QVElPTlMpO1xuICAgICAgICB0aGlzLl9vcHRpb25zTWFuYWdlciA9IG5ldyBPcHRpb25zTWFuYWdlcih0aGlzLm9wdGlvbnMpO1xuICAgIH1cbiAgICBpZiAoIXRoaXMuX3BlKSB7XG4gICAgICAgIHRoaXMuX3BlID0gbmV3IFBoeXNpY3NFbmdpbmUoKTtcbiAgICAgICAgdGhpcy5fcGUuc2xlZXAoKTtcbiAgICB9XG4gICAgaWYgKCF0aGlzLl9wcm9wZXJ0aWVzKSB7XG4gICAgICAgIHRoaXMuX3Byb3BlcnRpZXMgPSB7fTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBmb3IgKHZhciBwcm9wTmFtZSBpbiB0aGlzLl9wcm9wZXJ0aWVzKSB7XG4gICAgICAgICAgICB0aGlzLl9wcm9wZXJ0aWVzW3Byb3BOYW1lXS5pbml0ID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKCF0aGlzLl9sb2NrVHJhbnNpdGlvbmFibGUpIHtcbiAgICAgICAgdGhpcy5fbG9ja1RyYW5zaXRpb25hYmxlID0gbmV3IFRyYW5zaXRpb25hYmxlKDEpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX2xvY2tUcmFuc2l0aW9uYWJsZS5oYWx0KCk7XG4gICAgICAgIHRoaXMuX2xvY2tUcmFuc2l0aW9uYWJsZS5yZXNldCgxKTtcbiAgICB9XG4gICAgdGhpcy5fc3BlY01vZGlmaWVkID0gdHJ1ZTtcbiAgICB0aGlzLl9pbml0aWFsID0gdHJ1ZTtcbiAgICBpZiAoc3BlYykge1xuICAgICAgICB0aGlzLnNldFNwZWMoc3BlYyk7XG4gICAgfVxufVxuRmxvd0xheW91dE5vZGUucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShMYXlvdXROb2RlLnByb3RvdHlwZSk7XG5GbG93TGF5b3V0Tm9kZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBGbG93TGF5b3V0Tm9kZTtcbkZsb3dMYXlvdXROb2RlLkRFRkFVTFRfT1BUSU9OUyA9IHtcbiAgICBzcHJpbmc6IHtcbiAgICAgICAgZGFtcGluZ1JhdGlvOiAwLjgsXG4gICAgICAgIHBlcmlvZDogMzAwXG4gICAgfSxcbiAgICBwYXJ0aWNsZVJvdW5kaW5nOiAwLjAwMVxufTtcbnZhciBERUZBVUxUID0ge1xuICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICBvcGFjaXR5MkQ6IFtcbiAgICAgICAgICAgIDEsXG4gICAgICAgICAgICAwXG4gICAgICAgIF0sXG4gICAgICAgIHNpemU6IFtcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwXG4gICAgICAgIF0sXG4gICAgICAgIG9yaWdpbjogW1xuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDBcbiAgICAgICAgXSxcbiAgICAgICAgYWxpZ246IFtcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwXG4gICAgICAgIF0sXG4gICAgICAgIHNjYWxlOiBbXG4gICAgICAgICAgICAxLFxuICAgICAgICAgICAgMSxcbiAgICAgICAgICAgIDFcbiAgICAgICAgXSxcbiAgICAgICAgdHJhbnNsYXRlOiBbXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDBcbiAgICAgICAgXSxcbiAgICAgICAgcm90YXRlOiBbXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDBcbiAgICAgICAgXSxcbiAgICAgICAgc2tldzogW1xuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwXG4gICAgICAgIF1cbiAgICB9O1xuRmxvd0xheW91dE5vZGUucHJvdG90eXBlLnNldE9wdGlvbnMgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIHRoaXMuX29wdGlvbnNNYW5hZ2VyLnNldE9wdGlvbnMob3B0aW9ucyk7XG4gICAgdmFyIHdhc1NsZWVwaW5nID0gdGhpcy5fcGUuaXNTbGVlcGluZygpO1xuICAgIGZvciAodmFyIHByb3BOYW1lIGluIHRoaXMuX3Byb3BlcnRpZXMpIHtcbiAgICAgICAgdmFyIHByb3AgPSB0aGlzLl9wcm9wZXJ0aWVzW3Byb3BOYW1lXTtcbiAgICAgICAgaWYgKHByb3AuZm9yY2UpIHtcbiAgICAgICAgICAgIHByb3AuZm9yY2Uuc2V0T3B0aW9ucyhwcm9wLmZvcmNlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAod2FzU2xlZXBpbmcpIHtcbiAgICAgICAgdGhpcy5fcGUuc2xlZXAoKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuRmxvd0xheW91dE5vZGUucHJvdG90eXBlLnNldFNwZWMgPSBmdW5jdGlvbiAoc3BlYykge1xuICAgIHZhciBzZXQ7XG4gICAgaWYgKHNwZWMudHJhbnNmb3JtKSB7XG4gICAgICAgIHNldCA9IFRyYW5zZm9ybS5pbnRlcnByZXQoc3BlYy50cmFuc2Zvcm0pO1xuICAgIH1cbiAgICBpZiAoIXNldCkge1xuICAgICAgICBzZXQgPSB7fTtcbiAgICB9XG4gICAgc2V0Lm9wYWNpdHkgPSBzcGVjLm9wYWNpdHk7XG4gICAgc2V0LnNpemUgPSBzcGVjLnNpemU7XG4gICAgc2V0LmFsaWduID0gc3BlYy5hbGlnbjtcbiAgICBzZXQub3JpZ2luID0gc3BlYy5vcmlnaW47XG4gICAgdmFyIG9sZFJlbW92aW5nID0gdGhpcy5fcmVtb3Zpbmc7XG4gICAgdmFyIG9sZEludmFsaWRhdGVkID0gdGhpcy5faW52YWxpZGF0ZWQ7XG4gICAgdGhpcy5zZXQoc2V0KTtcbiAgICB0aGlzLl9yZW1vdmluZyA9IG9sZFJlbW92aW5nO1xuICAgIHRoaXMuX2ludmFsaWRhdGVkID0gb2xkSW52YWxpZGF0ZWQ7XG59O1xuRmxvd0xheW91dE5vZGUucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLl9pbnZhbGlkYXRlZCkge1xuICAgICAgICBmb3IgKHZhciBwcm9wTmFtZSBpbiB0aGlzLl9wcm9wZXJ0aWVzKSB7XG4gICAgICAgICAgICB0aGlzLl9wcm9wZXJ0aWVzW3Byb3BOYW1lXS5pbnZhbGlkYXRlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2ludmFsaWRhdGVkID0gZmFsc2U7XG4gICAgfVxuICAgIHRoaXMudHJ1ZVNpemVSZXF1ZXN0ZWQgPSBmYWxzZTtcbiAgICB0aGlzLnVzZXNUcnVlU2l6ZSA9IGZhbHNlO1xufTtcbkZsb3dMYXlvdXROb2RlLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiAocmVtb3ZlU3BlYykge1xuICAgIHRoaXMuX3JlbW92aW5nID0gdHJ1ZTtcbiAgICBpZiAocmVtb3ZlU3BlYykge1xuICAgICAgICB0aGlzLnNldFNwZWMocmVtb3ZlU3BlYyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fcGUuc2xlZXAoKTtcbiAgICAgICAgdGhpcy5fc3BlY01vZGlmaWVkID0gZmFsc2U7XG4gICAgfVxuICAgIHRoaXMuX2ludmFsaWRhdGVkID0gZmFsc2U7XG59O1xuRmxvd0xheW91dE5vZGUucHJvdG90eXBlLnJlbGVhc2VMb2NrID0gZnVuY3Rpb24gKGR1cmF0aW9uKSB7XG4gICAgdGhpcy5fbG9ja1RyYW5zaXRpb25hYmxlLmhhbHQoKTtcbiAgICB0aGlzLl9sb2NrVHJhbnNpdGlvbmFibGUucmVzZXQoMCk7XG4gICAgdGhpcy5fbG9ja1RyYW5zaXRpb25hYmxlLnNldCgxLCB7IGR1cmF0aW9uOiBkdXJhdGlvbiB8fCB0aGlzLm9wdGlvbnMuc3ByaW5nLnBlcmlvZCB8fCAxMDAwIH0pO1xufTtcbmZ1bmN0aW9uIF9nZXRSb3VuZGVkVmFsdWUzRChwcm9wLCBkZWYsIHByZWNpc2lvbiwgbG9ja1ZhbHVlKSB7XG4gICAgaWYgKCFwcm9wIHx8ICFwcm9wLmluaXQpIHtcbiAgICAgICAgcmV0dXJuIGRlZjtcbiAgICB9XG4gICAgcmV0dXJuIFtcbiAgICAgICAgTWF0aC5yb3VuZCgocHJvcC5jdXJTdGF0ZS54ICsgKHByb3AuZW5kU3RhdGUueCAtIHByb3AuY3VyU3RhdGUueCkgKiBsb2NrVmFsdWUpIC8gcHJlY2lzaW9uKSAqIHByZWNpc2lvbixcbiAgICAgICAgTWF0aC5yb3VuZCgocHJvcC5jdXJTdGF0ZS55ICsgKHByb3AuZW5kU3RhdGUueSAtIHByb3AuY3VyU3RhdGUueSkgKiBsb2NrVmFsdWUpIC8gcHJlY2lzaW9uKSAqIHByZWNpc2lvbixcbiAgICAgICAgTWF0aC5yb3VuZCgocHJvcC5jdXJTdGF0ZS56ICsgKHByb3AuZW5kU3RhdGUueiAtIHByb3AuY3VyU3RhdGUueikgKiBsb2NrVmFsdWUpIC8gcHJlY2lzaW9uKSAqIHByZWNpc2lvblxuICAgIF07XG59XG5GbG93TGF5b3V0Tm9kZS5wcm90b3R5cGUuZ2V0U3BlYyA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZW5kU3RhdGVSZWFjaGVkID0gdGhpcy5fcGUuaXNTbGVlcGluZygpO1xuICAgIGlmICghdGhpcy5fc3BlY01vZGlmaWVkICYmIGVuZFN0YXRlUmVhY2hlZCkge1xuICAgICAgICB0aGlzLl9zcGVjLnJlbW92ZWQgPSAhdGhpcy5faW52YWxpZGF0ZWQ7XG4gICAgICAgIHJldHVybiB0aGlzLl9zcGVjO1xuICAgIH1cbiAgICB0aGlzLl9pbml0aWFsID0gZmFsc2U7XG4gICAgdGhpcy5fc3BlY01vZGlmaWVkID0gIWVuZFN0YXRlUmVhY2hlZDtcbiAgICB0aGlzLl9zcGVjLnJlbW92ZWQgPSBmYWxzZTtcbiAgICBpZiAoIWVuZFN0YXRlUmVhY2hlZCkge1xuICAgICAgICB0aGlzLl9wZS5zdGVwKCk7XG4gICAgfVxuICAgIHZhciBzcGVjID0gdGhpcy5fc3BlYztcbiAgICB2YXIgcHJlY2lzaW9uID0gdGhpcy5vcHRpb25zLnBhcnRpY2xlUm91bmRpbmc7XG4gICAgdmFyIGxvY2tWYWx1ZSA9IHRoaXMuX2xvY2tUcmFuc2l0aW9uYWJsZS5nZXQoKTtcbiAgICB2YXIgcHJvcCA9IHRoaXMuX3Byb3BlcnRpZXMub3BhY2l0eTtcbiAgICBpZiAocHJvcCAmJiBwcm9wLmluaXQpIHtcbiAgICAgICAgc3BlYy5vcGFjaXR5ID0gTWF0aC5yb3VuZChNYXRoLm1heCgwLCBNYXRoLm1pbigxLCBwcm9wLmN1clN0YXRlLngpKSAvIHByZWNpc2lvbikgKiBwcmVjaXNpb247XG4gICAgfSBlbHNlIHtcbiAgICAgICAgc3BlYy5vcGFjaXR5ID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBwcm9wID0gdGhpcy5fcHJvcGVydGllcy5zaXplO1xuICAgIGlmIChwcm9wICYmIHByb3AuaW5pdCkge1xuICAgICAgICBzcGVjLnNpemUgPSBzcGVjLnNpemUgfHwgW1xuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDBcbiAgICAgICAgXTtcbiAgICAgICAgc3BlYy5zaXplWzBdID0gTWF0aC5yb3VuZCgocHJvcC5jdXJTdGF0ZS54ICsgKHByb3AuZW5kU3RhdGUueCAtIHByb3AuY3VyU3RhdGUueCkgKiBsb2NrVmFsdWUpIC8gMC4xKSAqIDAuMTtcbiAgICAgICAgc3BlYy5zaXplWzFdID0gTWF0aC5yb3VuZCgocHJvcC5jdXJTdGF0ZS55ICsgKHByb3AuZW5kU3RhdGUueSAtIHByb3AuY3VyU3RhdGUueSkgKiBsb2NrVmFsdWUpIC8gMC4xKSAqIDAuMTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBzcGVjLnNpemUgPSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHByb3AgPSB0aGlzLl9wcm9wZXJ0aWVzLmFsaWduO1xuICAgIGlmIChwcm9wICYmIHByb3AuaW5pdCkge1xuICAgICAgICBzcGVjLmFsaWduID0gc3BlYy5hbGlnbiB8fCBbXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMFxuICAgICAgICBdO1xuICAgICAgICBzcGVjLmFsaWduWzBdID0gTWF0aC5yb3VuZCgocHJvcC5jdXJTdGF0ZS54ICsgKHByb3AuZW5kU3RhdGUueCAtIHByb3AuY3VyU3RhdGUueCkgKiBsb2NrVmFsdWUpIC8gMC4xKSAqIDAuMTtcbiAgICAgICAgc3BlYy5hbGlnblsxXSA9IE1hdGgucm91bmQoKHByb3AuY3VyU3RhdGUueSArIChwcm9wLmVuZFN0YXRlLnkgLSBwcm9wLmN1clN0YXRlLnkpICogbG9ja1ZhbHVlKSAvIDAuMSkgKiAwLjE7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgc3BlYy5hbGlnbiA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgcHJvcCA9IHRoaXMuX3Byb3BlcnRpZXMub3JpZ2luO1xuICAgIGlmIChwcm9wICYmIHByb3AuaW5pdCkge1xuICAgICAgICBzcGVjLm9yaWdpbiA9IHNwZWMub3JpZ2luIHx8IFtcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwXG4gICAgICAgIF07XG4gICAgICAgIHNwZWMub3JpZ2luWzBdID0gTWF0aC5yb3VuZCgocHJvcC5jdXJTdGF0ZS54ICsgKHByb3AuZW5kU3RhdGUueCAtIHByb3AuY3VyU3RhdGUueCkgKiBsb2NrVmFsdWUpIC8gMC4xKSAqIDAuMTtcbiAgICAgICAgc3BlYy5vcmlnaW5bMV0gPSBNYXRoLnJvdW5kKChwcm9wLmN1clN0YXRlLnkgKyAocHJvcC5lbmRTdGF0ZS55IC0gcHJvcC5jdXJTdGF0ZS55KSAqIGxvY2tWYWx1ZSkgLyAwLjEpICogMC4xO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHNwZWMub3JpZ2luID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICB2YXIgdHJhbnNsYXRlID0gdGhpcy5fcHJvcGVydGllcy50cmFuc2xhdGU7XG4gICAgdmFyIHRyYW5zbGF0ZVg7XG4gICAgdmFyIHRyYW5zbGF0ZVk7XG4gICAgdmFyIHRyYW5zbGF0ZVo7XG4gICAgaWYgKHRyYW5zbGF0ZSAmJiB0cmFuc2xhdGUuaW5pdCkge1xuICAgICAgICB0cmFuc2xhdGVYID0gTWF0aC5yb3VuZCgodHJhbnNsYXRlLmN1clN0YXRlLnggKyAodHJhbnNsYXRlLmVuZFN0YXRlLnggLSB0cmFuc2xhdGUuY3VyU3RhdGUueCkgKiBsb2NrVmFsdWUpIC8gcHJlY2lzaW9uKSAqIHByZWNpc2lvbjtcbiAgICAgICAgdHJhbnNsYXRlWSA9IE1hdGgucm91bmQoKHRyYW5zbGF0ZS5jdXJTdGF0ZS55ICsgKHRyYW5zbGF0ZS5lbmRTdGF0ZS55IC0gdHJhbnNsYXRlLmN1clN0YXRlLnkpICogbG9ja1ZhbHVlKSAvIHByZWNpc2lvbikgKiBwcmVjaXNpb247XG4gICAgICAgIHRyYW5zbGF0ZVogPSBNYXRoLnJvdW5kKCh0cmFuc2xhdGUuY3VyU3RhdGUueiArICh0cmFuc2xhdGUuZW5kU3RhdGUueiAtIHRyYW5zbGF0ZS5jdXJTdGF0ZS56KSAqIGxvY2tWYWx1ZSkgLyBwcmVjaXNpb24pICogcHJlY2lzaW9uO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRyYW5zbGF0ZVggPSAwO1xuICAgICAgICB0cmFuc2xhdGVZID0gMDtcbiAgICAgICAgdHJhbnNsYXRlWiA9IDA7XG4gICAgfVxuICAgIHZhciBzY2FsZSA9IHRoaXMuX3Byb3BlcnRpZXMuc2NhbGU7XG4gICAgdmFyIHNrZXcgPSB0aGlzLl9wcm9wZXJ0aWVzLnNrZXc7XG4gICAgdmFyIHJvdGF0ZSA9IHRoaXMuX3Byb3BlcnRpZXMucm90YXRlO1xuICAgIGlmIChzY2FsZSB8fCBza2V3IHx8IHJvdGF0ZSkge1xuICAgICAgICBzcGVjLnRyYW5zZm9ybSA9IFRyYW5zZm9ybS5idWlsZCh7XG4gICAgICAgICAgICB0cmFuc2xhdGU6IFtcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGVYLFxuICAgICAgICAgICAgICAgIHRyYW5zbGF0ZVksXG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlWlxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIHNrZXc6IF9nZXRSb3VuZGVkVmFsdWUzRC5jYWxsKHRoaXMsIHNrZXcsIERFRkFVTFQuc2tldywgdGhpcy5vcHRpb25zLnBhcnRpY2xlUm91bmRpbmcsIGxvY2tWYWx1ZSksXG4gICAgICAgICAgICBzY2FsZTogX2dldFJvdW5kZWRWYWx1ZTNELmNhbGwodGhpcywgc2NhbGUsIERFRkFVTFQuc2NhbGUsIHRoaXMub3B0aW9ucy5wYXJ0aWNsZVJvdW5kaW5nLCBsb2NrVmFsdWUpLFxuICAgICAgICAgICAgcm90YXRlOiBfZ2V0Um91bmRlZFZhbHVlM0QuY2FsbCh0aGlzLCByb3RhdGUsIERFRkFVTFQucm90YXRlLCB0aGlzLm9wdGlvbnMucGFydGljbGVSb3VuZGluZywgbG9ja1ZhbHVlKVxuICAgICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKHRyYW5zbGF0ZSkge1xuICAgICAgICBpZiAoIXNwZWMudHJhbnNmb3JtKSB7XG4gICAgICAgICAgICBzcGVjLnRyYW5zZm9ybSA9IFRyYW5zZm9ybS50cmFuc2xhdGUodHJhbnNsYXRlWCwgdHJhbnNsYXRlWSwgdHJhbnNsYXRlWik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzcGVjLnRyYW5zZm9ybVsxMl0gPSB0cmFuc2xhdGVYO1xuICAgICAgICAgICAgc3BlYy50cmFuc2Zvcm1bMTNdID0gdHJhbnNsYXRlWTtcbiAgICAgICAgICAgIHNwZWMudHJhbnNmb3JtWzE0XSA9IHRyYW5zbGF0ZVo7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBzcGVjLnRyYW5zZm9ybSA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX3NwZWM7XG59O1xuZnVuY3Rpb24gX3NldFByb3BlcnR5VmFsdWUocHJvcCwgcHJvcE5hbWUsIGVuZFN0YXRlLCBkZWZhdWx0VmFsdWUsIGltbWVkaWF0ZSwgaXNUcmFuc2xhdGUpIHtcbiAgICBwcm9wID0gcHJvcCB8fCB0aGlzLl9wcm9wZXJ0aWVzW3Byb3BOYW1lXTtcbiAgICBpZiAocHJvcCAmJiBwcm9wLmluaXQpIHtcbiAgICAgICAgcHJvcC5pbnZhbGlkYXRlZCA9IHRydWU7XG4gICAgICAgIHZhciB2YWx1ZSA9IGRlZmF1bHRWYWx1ZTtcbiAgICAgICAgaWYgKGVuZFN0YXRlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHZhbHVlID0gZW5kU3RhdGU7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fcmVtb3ZpbmcpIHtcbiAgICAgICAgICAgIHZhbHVlID0gcHJvcC5wYXJ0aWNsZS5nZXRQb3NpdGlvbigpO1xuICAgICAgICB9XG4gICAgICAgIHByb3AuZW5kU3RhdGUueCA9IHZhbHVlWzBdO1xuICAgICAgICBwcm9wLmVuZFN0YXRlLnkgPSB2YWx1ZS5sZW5ndGggPiAxID8gdmFsdWVbMV0gOiAwO1xuICAgICAgICBwcm9wLmVuZFN0YXRlLnogPSB2YWx1ZS5sZW5ndGggPiAyID8gdmFsdWVbMl0gOiAwO1xuICAgICAgICBpZiAoaW1tZWRpYXRlKSB7XG4gICAgICAgICAgICBwcm9wLmN1clN0YXRlLnggPSBwcm9wLmVuZFN0YXRlLng7XG4gICAgICAgICAgICBwcm9wLmN1clN0YXRlLnkgPSBwcm9wLmVuZFN0YXRlLnk7XG4gICAgICAgICAgICBwcm9wLmN1clN0YXRlLnogPSBwcm9wLmVuZFN0YXRlLno7XG4gICAgICAgICAgICBwcm9wLnZlbG9jaXR5LnggPSAwO1xuICAgICAgICAgICAgcHJvcC52ZWxvY2l0eS55ID0gMDtcbiAgICAgICAgICAgIHByb3AudmVsb2NpdHkueiA9IDA7XG4gICAgICAgIH0gZWxzZSBpZiAocHJvcC5lbmRTdGF0ZS54ICE9PSBwcm9wLmN1clN0YXRlLnggfHwgcHJvcC5lbmRTdGF0ZS55ICE9PSBwcm9wLmN1clN0YXRlLnkgfHwgcHJvcC5lbmRTdGF0ZS56ICE9PSBwcm9wLmN1clN0YXRlLnopIHtcbiAgICAgICAgICAgIHRoaXMuX3BlLndha2UoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIHdhc1NsZWVwaW5nID0gdGhpcy5fcGUuaXNTbGVlcGluZygpO1xuICAgICAgICBpZiAoIXByb3ApIHtcbiAgICAgICAgICAgIHByb3AgPSB7XG4gICAgICAgICAgICAgICAgcGFydGljbGU6IG5ldyBQYXJ0aWNsZSh7IHBvc2l0aW9uOiB0aGlzLl9pbml0aWFsIHx8IGltbWVkaWF0ZSA/IGVuZFN0YXRlIDogZGVmYXVsdFZhbHVlIH0pLFxuICAgICAgICAgICAgICAgIGVuZFN0YXRlOiBuZXcgVmVjdG9yKGVuZFN0YXRlKVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHByb3AuY3VyU3RhdGUgPSBwcm9wLnBhcnRpY2xlLnBvc2l0aW9uO1xuICAgICAgICAgICAgcHJvcC52ZWxvY2l0eSA9IHByb3AucGFydGljbGUudmVsb2NpdHk7XG4gICAgICAgICAgICBwcm9wLmZvcmNlID0gbmV3IFNwcmluZyh0aGlzLm9wdGlvbnMuc3ByaW5nKTtcbiAgICAgICAgICAgIHByb3AuZm9yY2Uuc2V0T3B0aW9ucyh7IGFuY2hvcjogcHJvcC5lbmRTdGF0ZSB9KTtcbiAgICAgICAgICAgIHRoaXMuX3BlLmFkZEJvZHkocHJvcC5wYXJ0aWNsZSk7XG4gICAgICAgICAgICBwcm9wLmZvcmNlSWQgPSB0aGlzLl9wZS5hdHRhY2gocHJvcC5mb3JjZSwgcHJvcC5wYXJ0aWNsZSk7XG4gICAgICAgICAgICB0aGlzLl9wcm9wZXJ0aWVzW3Byb3BOYW1lXSA9IHByb3A7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwcm9wLnBhcnRpY2xlLnNldFBvc2l0aW9uKHRoaXMuX2luaXRpYWwgfHwgaW1tZWRpYXRlID8gZW5kU3RhdGUgOiBkZWZhdWx0VmFsdWUpO1xuICAgICAgICAgICAgcHJvcC5lbmRTdGF0ZS5zZXQoZW5kU3RhdGUpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5faW5pdGlhbCAmJiAhaW1tZWRpYXRlKSB7XG4gICAgICAgICAgICB0aGlzLl9wZS53YWtlKCk7XG4gICAgICAgIH0gZWxzZSBpZiAod2FzU2xlZXBpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuX3BlLnNsZWVwKCk7XG4gICAgICAgIH1cbiAgICAgICAgcHJvcC5pbml0ID0gdHJ1ZTtcbiAgICAgICAgcHJvcC5pbnZhbGlkYXRlZCA9IHRydWU7XG4gICAgfVxufVxuZnVuY3Rpb24gX2dldElmTkUyRChhMSwgYTIpIHtcbiAgICByZXR1cm4gYTFbMF0gPT09IGEyWzBdICYmIGExWzFdID09PSBhMlsxXSA/IHVuZGVmaW5lZCA6IGExO1xufVxuZnVuY3Rpb24gX2dldElmTkUzRChhMSwgYTIpIHtcbiAgICByZXR1cm4gYTFbMF0gPT09IGEyWzBdICYmIGExWzFdID09PSBhMlsxXSAmJiBhMVsyXSA9PT0gYTJbMl0gPyB1bmRlZmluZWQgOiBhMTtcbn1cbkZsb3dMYXlvdXROb2RlLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiAoc2V0LCBkZWZhdWx0U2l6ZSkge1xuICAgIGlmIChkZWZhdWx0U2l6ZSkge1xuICAgICAgICB0aGlzLl9yZW1vdmluZyA9IGZhbHNlO1xuICAgIH1cbiAgICB0aGlzLl9pbnZhbGlkYXRlZCA9IHRydWU7XG4gICAgdGhpcy5zY3JvbGxMZW5ndGggPSBzZXQuc2Nyb2xsTGVuZ3RoO1xuICAgIHRoaXMuX3NwZWNNb2RpZmllZCA9IHRydWU7XG4gICAgdmFyIHByb3AgPSB0aGlzLl9wcm9wZXJ0aWVzLm9wYWNpdHk7XG4gICAgdmFyIHZhbHVlID0gc2V0Lm9wYWNpdHkgPT09IERFRkFVTFQub3BhY2l0eSA/IHVuZGVmaW5lZCA6IHNldC5vcGFjaXR5O1xuICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkIHx8IHByb3AgJiYgcHJvcC5pbml0KSB7XG4gICAgICAgIF9zZXRQcm9wZXJ0eVZhbHVlLmNhbGwodGhpcywgcHJvcCwgJ29wYWNpdHknLCB2YWx1ZSA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkIDogW1xuICAgICAgICAgICAgdmFsdWUsXG4gICAgICAgICAgICAwXG4gICAgICAgIF0sIERFRkFVTFQub3BhY2l0eTJEKTtcbiAgICB9XG4gICAgcHJvcCA9IHRoaXMuX3Byb3BlcnRpZXMuYWxpZ247XG4gICAgdmFsdWUgPSBzZXQuYWxpZ24gPyBfZ2V0SWZORTJEKHNldC5hbGlnbiwgREVGQVVMVC5hbGlnbikgOiB1bmRlZmluZWQ7XG4gICAgaWYgKHZhbHVlIHx8IHByb3AgJiYgcHJvcC5pbml0KSB7XG4gICAgICAgIF9zZXRQcm9wZXJ0eVZhbHVlLmNhbGwodGhpcywgcHJvcCwgJ2FsaWduJywgdmFsdWUsIERFRkFVTFQuYWxpZ24pO1xuICAgIH1cbiAgICBwcm9wID0gdGhpcy5fcHJvcGVydGllcy5vcmlnaW47XG4gICAgdmFsdWUgPSBzZXQub3JpZ2luID8gX2dldElmTkUyRChzZXQub3JpZ2luLCBERUZBVUxULm9yaWdpbikgOiB1bmRlZmluZWQ7XG4gICAgaWYgKHZhbHVlIHx8IHByb3AgJiYgcHJvcC5pbml0KSB7XG4gICAgICAgIF9zZXRQcm9wZXJ0eVZhbHVlLmNhbGwodGhpcywgcHJvcCwgJ29yaWdpbicsIHZhbHVlLCBERUZBVUxULm9yaWdpbik7XG4gICAgfVxuICAgIHByb3AgPSB0aGlzLl9wcm9wZXJ0aWVzLnNpemU7XG4gICAgdmFsdWUgPSBzZXQuc2l6ZSB8fCBkZWZhdWx0U2l6ZTtcbiAgICBpZiAodmFsdWUgfHwgcHJvcCAmJiBwcm9wLmluaXQpIHtcbiAgICAgICAgX3NldFByb3BlcnR5VmFsdWUuY2FsbCh0aGlzLCBwcm9wLCAnc2l6ZScsIHZhbHVlLCBkZWZhdWx0U2l6ZSwgdGhpcy51c2VzVHJ1ZVNpemUpO1xuICAgIH1cbiAgICBwcm9wID0gdGhpcy5fcHJvcGVydGllcy50cmFuc2xhdGU7XG4gICAgdmFsdWUgPSBzZXQudHJhbnNsYXRlO1xuICAgIGlmICh2YWx1ZSB8fCBwcm9wICYmIHByb3AuaW5pdCkge1xuICAgICAgICBfc2V0UHJvcGVydHlWYWx1ZS5jYWxsKHRoaXMsIHByb3AsICd0cmFuc2xhdGUnLCB2YWx1ZSwgREVGQVVMVC50cmFuc2xhdGUsIHVuZGVmaW5lZCwgdHJ1ZSk7XG4gICAgfVxuICAgIHByb3AgPSB0aGlzLl9wcm9wZXJ0aWVzLnNjYWxlO1xuICAgIHZhbHVlID0gc2V0LnNjYWxlID8gX2dldElmTkUzRChzZXQuc2NhbGUsIERFRkFVTFQuc2NhbGUpIDogdW5kZWZpbmVkO1xuICAgIGlmICh2YWx1ZSB8fCBwcm9wICYmIHByb3AuaW5pdCkge1xuICAgICAgICBfc2V0UHJvcGVydHlWYWx1ZS5jYWxsKHRoaXMsIHByb3AsICdzY2FsZScsIHZhbHVlLCBERUZBVUxULnNjYWxlKTtcbiAgICB9XG4gICAgcHJvcCA9IHRoaXMuX3Byb3BlcnRpZXMucm90YXRlO1xuICAgIHZhbHVlID0gc2V0LnJvdGF0ZSA/IF9nZXRJZk5FM0Qoc2V0LnJvdGF0ZSwgREVGQVVMVC5yb3RhdGUpIDogdW5kZWZpbmVkO1xuICAgIGlmICh2YWx1ZSB8fCBwcm9wICYmIHByb3AuaW5pdCkge1xuICAgICAgICBfc2V0UHJvcGVydHlWYWx1ZS5jYWxsKHRoaXMsIHByb3AsICdyb3RhdGUnLCB2YWx1ZSwgREVGQVVMVC5yb3RhdGUpO1xuICAgIH1cbiAgICBwcm9wID0gdGhpcy5fcHJvcGVydGllcy5za2V3O1xuICAgIHZhbHVlID0gc2V0LnNrZXcgPyBfZ2V0SWZORTNEKHNldC5za2V3LCBERUZBVUxULnNrZXcpIDogdW5kZWZpbmVkO1xuICAgIGlmICh2YWx1ZSB8fCBwcm9wICYmIHByb3AuaW5pdCkge1xuICAgICAgICBfc2V0UHJvcGVydHlWYWx1ZS5jYWxsKHRoaXMsIHByb3AsICdza2V3JywgdmFsdWUsIERFRkFVTFQuc2tldyk7XG4gICAgfVxufTtcbm1vZHVsZS5leHBvcnRzID0gRmxvd0xheW91dE5vZGU7IiwiZnVuY3Rpb24gTGF5b3V0Q29udGV4dChtZXRob2RzKSB7XG4gICAgZm9yICh2YXIgbiBpbiBtZXRob2RzKSB7XG4gICAgICAgIHRoaXNbbl0gPSBtZXRob2RzW25dO1xuICAgIH1cbn1cbkxheW91dENvbnRleHQucHJvdG90eXBlLnNpemUgPSB1bmRlZmluZWQ7XG5MYXlvdXRDb250ZXh0LnByb3RvdHlwZS5kaXJlY3Rpb24gPSB1bmRlZmluZWQ7XG5MYXlvdXRDb250ZXh0LnByb3RvdHlwZS5zY3JvbGxPZmZzZXQgPSB1bmRlZmluZWQ7XG5MYXlvdXRDb250ZXh0LnByb3RvdHlwZS5zY3JvbGxTdGFydCA9IHVuZGVmaW5lZDtcbkxheW91dENvbnRleHQucHJvdG90eXBlLnNjcm9sbEVuZCA9IHVuZGVmaW5lZDtcbkxheW91dENvbnRleHQucHJvdG90eXBlLm5leHQgPSBmdW5jdGlvbiAoKSB7XG59O1xuTGF5b3V0Q29udGV4dC5wcm90b3R5cGUucHJldiA9IGZ1bmN0aW9uICgpIHtcbn07XG5MYXlvdXRDb250ZXh0LnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAobm9kZSkge1xufTtcbkxheW91dENvbnRleHQucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uIChub2RlLCBzZXQpIHtcbn07XG5MYXlvdXRDb250ZXh0LnByb3RvdHlwZS5yZXNvbHZlU2l6ZSA9IGZ1bmN0aW9uIChub2RlKSB7XG59O1xubW9kdWxlLmV4cG9ydHMgPSBMYXlvdXRDb250ZXh0OyIsInZhciBVdGlsaXR5ID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cuZmFtb3VzLnV0aWxpdGllcy5VdGlsaXR5IDogdHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcgPyBnbG9iYWwuZmFtb3VzLnV0aWxpdGllcy5VdGlsaXR5IDogbnVsbDtcbnZhciBFbnRpdHkgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IHdpbmRvdy5mYW1vdXMuY29yZS5FbnRpdHkgOiB0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJyA/IGdsb2JhbC5mYW1vdXMuY29yZS5FbnRpdHkgOiBudWxsO1xudmFyIFZpZXdTZXF1ZW5jZSA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gd2luZG93LmZhbW91cy5jb3JlLlZpZXdTZXF1ZW5jZSA6IHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnID8gZ2xvYmFsLmZhbW91cy5jb3JlLlZpZXdTZXF1ZW5jZSA6IG51bGw7XG52YXIgT3B0aW9uc01hbmFnZXIgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IHdpbmRvdy5mYW1vdXMuY29yZS5PcHRpb25zTWFuYWdlciA6IHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnID8gZ2xvYmFsLmZhbW91cy5jb3JlLk9wdGlvbnNNYW5hZ2VyIDogbnVsbDtcbnZhciBFdmVudEhhbmRsZXIgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IHdpbmRvdy5mYW1vdXMuY29yZS5FdmVudEhhbmRsZXIgOiB0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJyA/IGdsb2JhbC5mYW1vdXMuY29yZS5FdmVudEhhbmRsZXIgOiBudWxsO1xudmFyIExheW91dFV0aWxpdHkgPSByZXF1aXJlKCcuL0xheW91dFV0aWxpdHknKTtcbnZhciBMYXlvdXROb2RlTWFuYWdlciA9IHJlcXVpcmUoJy4vTGF5b3V0Tm9kZU1hbmFnZXInKTtcbnZhciBMYXlvdXROb2RlID0gcmVxdWlyZSgnLi9MYXlvdXROb2RlJyk7XG52YXIgRmxvd0xheW91dE5vZGUgPSByZXF1aXJlKCcuL0Zsb3dMYXlvdXROb2RlJyk7XG52YXIgVHJhbnNmb3JtID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cuZmFtb3VzLmNvcmUuVHJhbnNmb3JtIDogdHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcgPyBnbG9iYWwuZmFtb3VzLmNvcmUuVHJhbnNmb3JtIDogbnVsbDtcbnJlcXVpcmUoJy4vaGVscGVycy9MYXlvdXREb2NrSGVscGVyJyk7XG5mdW5jdGlvbiBMYXlvdXRDb250cm9sbGVyKG9wdGlvbnMsIG5vZGVNYW5hZ2VyKSB7XG4gICAgdGhpcy5pZCA9IEVudGl0eS5yZWdpc3Rlcih0aGlzKTtcbiAgICB0aGlzLl9pc0RpcnR5ID0gdHJ1ZTtcbiAgICB0aGlzLl9jb250ZXh0U2l6ZUNhY2hlID0gW1xuICAgICAgICAwLFxuICAgICAgICAwXG4gICAgXTtcbiAgICB0aGlzLl9jb21taXRPdXRwdXQgPSB7fTtcbiAgICB0aGlzLl9ldmVudElucHV0ID0gbmV3IEV2ZW50SGFuZGxlcigpO1xuICAgIEV2ZW50SGFuZGxlci5zZXRJbnB1dEhhbmRsZXIodGhpcywgdGhpcy5fZXZlbnRJbnB1dCk7XG4gICAgdGhpcy5fZXZlbnRPdXRwdXQgPSBuZXcgRXZlbnRIYW5kbGVyKCk7XG4gICAgRXZlbnRIYW5kbGVyLnNldE91dHB1dEhhbmRsZXIodGhpcywgdGhpcy5fZXZlbnRPdXRwdXQpO1xuICAgIHRoaXMuX2xheW91dCA9IHsgb3B0aW9uczogT2JqZWN0LmNyZWF0ZSh7fSkgfTtcbiAgICB0aGlzLl9sYXlvdXQub3B0aW9uc01hbmFnZXIgPSBuZXcgT3B0aW9uc01hbmFnZXIodGhpcy5fbGF5b3V0Lm9wdGlvbnMpO1xuICAgIHRoaXMuX2xheW91dC5vcHRpb25zTWFuYWdlci5vbignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9pc0RpcnR5ID0gdHJ1ZTtcbiAgICB9LmJpbmQodGhpcykpO1xuICAgIHRoaXMub3B0aW9ucyA9IE9iamVjdC5jcmVhdGUoTGF5b3V0Q29udHJvbGxlci5ERUZBVUxUX09QVElPTlMpO1xuICAgIHRoaXMuX29wdGlvbnNNYW5hZ2VyID0gbmV3IE9wdGlvbnNNYW5hZ2VyKHRoaXMub3B0aW9ucyk7XG4gICAgaWYgKG5vZGVNYW5hZ2VyKSB7XG4gICAgICAgIHRoaXMuX25vZGVzID0gbm9kZU1hbmFnZXI7XG4gICAgfSBlbHNlIGlmIChvcHRpb25zICYmIG9wdGlvbnMuZmxvdykge1xuICAgICAgICB0aGlzLl9ub2RlcyA9IG5ldyBMYXlvdXROb2RlTWFuYWdlcihGbG93TGF5b3V0Tm9kZSwgX2luaXRGbG93TGF5b3V0Tm9kZS5iaW5kKHRoaXMpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9ub2RlcyA9IG5ldyBMYXlvdXROb2RlTWFuYWdlcihMYXlvdXROb2RlKTtcbiAgICB9XG4gICAgdGhpcy5zZXREaXJlY3Rpb24odW5kZWZpbmVkKTtcbiAgICBpZiAob3B0aW9ucykge1xuICAgICAgICB0aGlzLnNldE9wdGlvbnMob3B0aW9ucyk7XG4gICAgfVxufVxuTGF5b3V0Q29udHJvbGxlci5ERUZBVUxUX09QVElPTlMgPSB7XG4gICAgbm9kZVNwcmluZzoge1xuICAgICAgICBkYW1waW5nUmF0aW86IDAuOCxcbiAgICAgICAgcGVyaW9kOiAzMDBcbiAgICB9LFxuICAgIHJlZmxvd09uUmVzaXplOiB0cnVlXG59O1xuZnVuY3Rpb24gX2luaXRGbG93TGF5b3V0Tm9kZShub2RlLCBzcGVjKSB7XG4gICAgaWYgKCFzcGVjICYmIHRoaXMub3B0aW9ucy5pbnNlcnRTcGVjKSB7XG4gICAgICAgIG5vZGUuc2V0U3BlYyh0aGlzLm9wdGlvbnMuaW5zZXJ0U3BlYyk7XG4gICAgfVxufVxuTGF5b3V0Q29udHJvbGxlci5wcm90b3R5cGUuc2V0T3B0aW9ucyA9IGZ1bmN0aW9uIHNldE9wdGlvbnMob3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zLmFsaWdubWVudCAhPT0gdW5kZWZpbmVkICYmIG9wdGlvbnMuYWxpZ25tZW50ICE9PSB0aGlzLm9wdGlvbnMuYWxpZ25tZW50KSB7XG4gICAgICAgIHRoaXMuX2lzRGlydHkgPSB0cnVlO1xuICAgIH1cbiAgICB0aGlzLl9vcHRpb25zTWFuYWdlci5zZXRPcHRpb25zKG9wdGlvbnMpO1xuICAgIGlmIChvcHRpb25zLmRhdGFTb3VyY2UpIHtcbiAgICAgICAgdGhpcy5zZXREYXRhU291cmNlKG9wdGlvbnMuZGF0YVNvdXJjZSk7XG4gICAgfVxuICAgIGlmIChvcHRpb25zLmxheW91dCkge1xuICAgICAgICB0aGlzLnNldExheW91dChvcHRpb25zLmxheW91dCwgb3B0aW9ucy5sYXlvdXRPcHRpb25zKTtcbiAgICB9IGVsc2UgaWYgKG9wdGlvbnMubGF5b3V0T3B0aW9ucykge1xuICAgICAgICB0aGlzLnNldExheW91dE9wdGlvbnMob3B0aW9ucy5sYXlvdXRPcHRpb25zKTtcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMuZGlyZWN0aW9uICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5zZXREaXJlY3Rpb24ob3B0aW9ucy5kaXJlY3Rpb24pO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy5ub2RlU3ByaW5nICYmIHRoaXMub3B0aW9ucy5mbG93KSB7XG4gICAgICAgIHRoaXMuX25vZGVzLnNldE5vZGVPcHRpb25zKHsgc3ByaW5nOiBvcHRpb25zLm5vZGVTcHJpbmcgfSk7XG4gICAgfVxuICAgIGlmIChvcHRpb25zLnByZWFsbG9jYXRlTm9kZXMpIHtcbiAgICAgICAgdGhpcy5fbm9kZXMucHJlYWxsb2NhdGVOb2RlcyhvcHRpb25zLnByZWFsbG9jYXRlTm9kZXMuY291bnQgfHwgMCwgb3B0aW9ucy5wcmVhbGxvY2F0ZU5vZGVzLnNwZWMpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbn07XG5mdW5jdGlvbiBfZm9yRWFjaFJlbmRlcmFibGUoY2FsbGJhY2spIHtcbiAgICB2YXIgZGF0YVNvdXJjZSA9IHRoaXMuX2RhdGFTb3VyY2U7XG4gICAgaWYgKGRhdGFTb3VyY2UgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMCwgaiA9IGRhdGFTb3VyY2UubGVuZ3RoOyBpIDwgajsgaSsrKSB7XG4gICAgICAgICAgICBjYWxsYmFjayhkYXRhU291cmNlW2ldKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSBpZiAoZGF0YVNvdXJjZSBpbnN0YW5jZW9mIFZpZXdTZXF1ZW5jZSkge1xuICAgICAgICB2YXIgcmVuZGVyYWJsZTtcbiAgICAgICAgd2hpbGUgKGRhdGFTb3VyY2UpIHtcbiAgICAgICAgICAgIHJlbmRlcmFibGUgPSBkYXRhU291cmNlLmdldCgpO1xuICAgICAgICAgICAgaWYgKCFyZW5kZXJhYmxlKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYWxsYmFjayhyZW5kZXJhYmxlKTtcbiAgICAgICAgICAgIGRhdGFTb3VyY2UgPSBkYXRhU291cmNlLmdldE5leHQoKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGZvciAodmFyIGtleSBpbiBkYXRhU291cmNlKSB7XG4gICAgICAgICAgICBjYWxsYmFjayhkYXRhU291cmNlW2tleV0pO1xuICAgICAgICB9XG4gICAgfVxufVxuTGF5b3V0Q29udHJvbGxlci5wcm90b3R5cGUuc2V0RGF0YVNvdXJjZSA9IGZ1bmN0aW9uIChkYXRhU291cmNlKSB7XG4gICAgdGhpcy5fZGF0YVNvdXJjZSA9IGRhdGFTb3VyY2U7XG4gICAgdGhpcy5fbm9kZXNCeUlkID0gdW5kZWZpbmVkO1xuICAgIGlmIChkYXRhU291cmNlIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgdGhpcy5fdmlld1NlcXVlbmNlID0gbmV3IFZpZXdTZXF1ZW5jZShkYXRhU291cmNlKTtcbiAgICB9IGVsc2UgaWYgKGRhdGFTb3VyY2UgaW5zdGFuY2VvZiBWaWV3U2VxdWVuY2UgfHwgZGF0YVNvdXJjZS5nZXROZXh0KSB7XG4gICAgICAgIHRoaXMuX3ZpZXdTZXF1ZW5jZSA9IGRhdGFTb3VyY2U7XG4gICAgfSBlbHNlIGlmIChkYXRhU291cmNlIGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICAgIHRoaXMuX25vZGVzQnlJZCA9IGRhdGFTb3VyY2U7XG4gICAgfVxuICAgIGlmICh0aGlzLm9wdGlvbnMuYXV0b1BpcGVFdmVudHMpIHtcbiAgICAgICAgaWYgKHRoaXMuX2RhdGFTb3VyY2UucGlwZSkge1xuICAgICAgICAgICAgdGhpcy5fZGF0YVNvdXJjZS5waXBlKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5fZGF0YVNvdXJjZS5waXBlKHRoaXMuX2V2ZW50T3V0cHV0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIF9mb3JFYWNoUmVuZGVyYWJsZS5jYWxsKHRoaXMsIGZ1bmN0aW9uIChyZW5kZXJhYmxlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHJlbmRlcmFibGUgJiYgcmVuZGVyYWJsZS5waXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlbmRlcmFibGUucGlwZSh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgcmVuZGVyYWJsZS5waXBlKHRoaXMuX2V2ZW50T3V0cHV0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LmJpbmQodGhpcykpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHRoaXMuX2lzRGlydHkgPSB0cnVlO1xuICAgIHJldHVybiB0aGlzO1xufTtcbkxheW91dENvbnRyb2xsZXIucHJvdG90eXBlLmdldERhdGFTb3VyY2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2RhdGFTb3VyY2U7XG59O1xuTGF5b3V0Q29udHJvbGxlci5wcm90b3R5cGUuc2V0TGF5b3V0ID0gZnVuY3Rpb24gKGxheW91dCwgb3B0aW9ucykge1xuICAgIGlmIChsYXlvdXQgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgICAgICB0aGlzLl9sYXlvdXQuX2Z1bmN0aW9uID0gbGF5b3V0O1xuICAgICAgICB0aGlzLl9sYXlvdXQuY2FwYWJpbGl0aWVzID0gbGF5b3V0LkNhcGFiaWxpdGllcztcbiAgICAgICAgdGhpcy5fbGF5b3V0LmxpdGVyYWwgPSB1bmRlZmluZWQ7XG4gICAgfSBlbHNlIGlmIChsYXlvdXQgaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgICAgdGhpcy5fbGF5b3V0LmxpdGVyYWwgPSBsYXlvdXQ7XG4gICAgICAgIHRoaXMuX2xheW91dC5jYXBhYmlsaXRpZXMgPSB1bmRlZmluZWQ7XG4gICAgICAgIHZhciBoZWxwZXJOYW1lID0gT2JqZWN0LmtleXMobGF5b3V0KVswXTtcbiAgICAgICAgdmFyIEhlbHBlciA9IExheW91dFV0aWxpdHkuZ2V0UmVnaXN0ZXJlZEhlbHBlcihoZWxwZXJOYW1lKTtcbiAgICAgICAgdGhpcy5fbGF5b3V0Ll9mdW5jdGlvbiA9IEhlbHBlciA/IGZ1bmN0aW9uIChjb250ZXh0LCBvcHRpb25zMikge1xuICAgICAgICAgICAgdmFyIGhlbHBlciA9IG5ldyBIZWxwZXIoY29udGV4dCwgb3B0aW9uczIpO1xuICAgICAgICAgICAgaGVscGVyLnBhcnNlKGxheW91dFtoZWxwZXJOYW1lXSk7XG4gICAgICAgIH0gOiB1bmRlZmluZWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fbGF5b3V0Ll9mdW5jdGlvbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5fbGF5b3V0LmNhcGFiaWxpdGllcyA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5fbGF5b3V0LmxpdGVyYWwgPSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIGlmIChvcHRpb25zKSB7XG4gICAgICAgIHRoaXMuc2V0TGF5b3V0T3B0aW9ucyhvcHRpb25zKTtcbiAgICB9XG4gICAgdGhpcy5zZXREaXJlY3Rpb24odGhpcy5fY29uZmlndXJlZERpcmVjdGlvbik7XG4gICAgdGhpcy5faXNEaXJ0eSA9IHRydWU7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuTGF5b3V0Q29udHJvbGxlci5wcm90b3R5cGUuZ2V0TGF5b3V0ID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLl9sYXlvdXQubGl0ZXJhbCB8fCB0aGlzLl9sYXlvdXQuX2Z1bmN0aW9uO1xufTtcbkxheW91dENvbnRyb2xsZXIucHJvdG90eXBlLnNldExheW91dE9wdGlvbnMgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIHRoaXMuX2xheW91dC5vcHRpb25zTWFuYWdlci5zZXRPcHRpb25zKG9wdGlvbnMpO1xuICAgIHJldHVybiB0aGlzO1xufTtcbkxheW91dENvbnRyb2xsZXIucHJvdG90eXBlLmdldExheW91dE9wdGlvbnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2xheW91dC5vcHRpb25zO1xufTtcbmZ1bmN0aW9uIF9nZXRBY3R1YWxEaXJlY3Rpb24oZGlyZWN0aW9uKSB7XG4gICAgaWYgKHRoaXMuX2xheW91dC5jYXBhYmlsaXRpZXMgJiYgdGhpcy5fbGF5b3V0LmNhcGFiaWxpdGllcy5kaXJlY3Rpb24pIHtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodGhpcy5fbGF5b3V0LmNhcGFiaWxpdGllcy5kaXJlY3Rpb24pKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX2xheW91dC5jYXBhYmlsaXRpZXMuZGlyZWN0aW9uLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2xheW91dC5jYXBhYmlsaXRpZXMuZGlyZWN0aW9uW2ldID09PSBkaXJlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRpcmVjdGlvbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbGF5b3V0LmNhcGFiaWxpdGllcy5kaXJlY3Rpb25bMF07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbGF5b3V0LmNhcGFiaWxpdGllcy5kaXJlY3Rpb247XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGRpcmVjdGlvbiA9PT0gdW5kZWZpbmVkID8gVXRpbGl0eS5EaXJlY3Rpb24uWSA6IGRpcmVjdGlvbjtcbn1cbkxheW91dENvbnRyb2xsZXIucHJvdG90eXBlLnNldERpcmVjdGlvbiA9IGZ1bmN0aW9uIChkaXJlY3Rpb24pIHtcbiAgICB0aGlzLl9jb25maWd1cmVkRGlyZWN0aW9uID0gZGlyZWN0aW9uO1xuICAgIHZhciBuZXdEaXJlY3Rpb24gPSBfZ2V0QWN0dWFsRGlyZWN0aW9uLmNhbGwodGhpcywgZGlyZWN0aW9uKTtcbiAgICBpZiAobmV3RGlyZWN0aW9uICE9PSB0aGlzLl9kaXJlY3Rpb24pIHtcbiAgICAgICAgdGhpcy5fZGlyZWN0aW9uID0gbmV3RGlyZWN0aW9uO1xuICAgICAgICB0aGlzLl9pc0RpcnR5ID0gdHJ1ZTtcbiAgICB9XG59O1xuTGF5b3V0Q29udHJvbGxlci5wcm90b3R5cGUuZ2V0RGlyZWN0aW9uID0gZnVuY3Rpb24gKGFjdHVhbCkge1xuICAgIHJldHVybiBhY3R1YWwgPyB0aGlzLl9kaXJlY3Rpb24gOiB0aGlzLl9jb25maWd1cmVkRGlyZWN0aW9uO1xufTtcbkxheW91dENvbnRyb2xsZXIucHJvdG90eXBlLmdldFNwZWMgPSBmdW5jdGlvbiAobm9kZSwgbm9ybWFsaXplKSB7XG4gICAgaWYgKCFub2RlKSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIGlmIChub2RlIGluc3RhbmNlb2YgU3RyaW5nIHx8IHR5cGVvZiBub2RlID09PSAnc3RyaW5nJykge1xuICAgICAgICBpZiAoIXRoaXMuX25vZGVzQnlJZCkge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICBub2RlID0gdGhpcy5fbm9kZXNCeUlkW25vZGVdO1xuICAgICAgICBpZiAoIW5vZGUpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRoaXMuX3NwZWNzKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fc3BlY3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBzcGVjID0gdGhpcy5fc3BlY3NbaV07XG4gICAgICAgICAgICBpZiAoc3BlYy5yZW5kZXJOb2RlID09PSBub2RlKSB7XG4gICAgICAgICAgICAgICAgaWYgKG5vcm1hbGl6ZSAmJiBzcGVjLnRyYW5zZm9ybSAmJiBzcGVjLnNpemUgJiYgKHNwZWMuYWxpZ24gfHwgc3BlYy5vcmlnaW4pKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0cmFuc2Zvcm0gPSBzcGVjLnRyYW5zZm9ybTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNwZWMuYWxpZ24gJiYgKHNwZWMuYWxpZ25bMF0gfHwgc3BlYy5hbGlnblsxXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybSA9IFRyYW5zZm9ybS50aGVuTW92ZSh0cmFuc2Zvcm0sIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcGVjLmFsaWduWzBdICogdGhpcy5fY29udGV4dFNpemVDYWNoZVswXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcGVjLmFsaWduWzFdICogdGhpcy5fY29udGV4dFNpemVDYWNoZVsxXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAwXG4gICAgICAgICAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoc3BlYy5vcmlnaW4gJiYgKHNwZWMub3JpZ2luWzBdIHx8IHNwZWMub3JpZ2luWzFdKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtID0gVHJhbnNmb3JtLm1vdmVUaGVuKFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAtc3BlYy5vcmlnaW5bMF0gKiBzcGVjLnNpemVbMF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLXNwZWMub3JpZ2luWzFdICogc3BlYy5zaXplWzFdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDBcbiAgICAgICAgICAgICAgICAgICAgICAgIF0sIHRyYW5zZm9ybSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IHNwZWMub3BhY2l0eSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpemU6IHNwZWMuc2l6ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNmb3JtXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBzcGVjO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG59O1xuTGF5b3V0Q29udHJvbGxlci5wcm90b3R5cGUucmVmbG93TGF5b3V0ID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuX2lzRGlydHkgPSB0cnVlO1xuICAgIHJldHVybiB0aGlzO1xufTtcbkxheW91dENvbnRyb2xsZXIucHJvdG90eXBlLmluc2VydCA9IGZ1bmN0aW9uIChpbmRleE9ySWQsIHJlbmRlcmFibGUsIGluc2VydFNwZWMpIHtcbiAgICBpZiAoaW5kZXhPcklkIGluc3RhbmNlb2YgU3RyaW5nIHx8IHR5cGVvZiBpbmRleE9ySWQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGlmICh0aGlzLl9kYXRhU291cmNlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX2RhdGFTb3VyY2UgPSB7fTtcbiAgICAgICAgICAgIHRoaXMuX25vZGVzQnlJZCA9IHRoaXMuX2RhdGFTb3VyY2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX25vZGVzQnlJZFtpbmRleE9ySWRdID09PSByZW5kZXJhYmxlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbm9kZXNCeUlkW2luZGV4T3JJZF0gPSByZW5kZXJhYmxlO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh0aGlzLl9kYXRhU291cmNlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX2RhdGFTb3VyY2UgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuX3ZpZXdTZXF1ZW5jZSA9IG5ldyBWaWV3U2VxdWVuY2UodGhpcy5fZGF0YVNvdXJjZSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGRhdGFTb3VyY2UgPSB0aGlzLl92aWV3U2VxdWVuY2UgfHwgdGhpcy5fZGF0YVNvdXJjZTtcbiAgICAgICAgaWYgKGluZGV4T3JJZCA9PT0gLTEpIHtcbiAgICAgICAgICAgIGRhdGFTb3VyY2UucHVzaChyZW5kZXJhYmxlKTtcbiAgICAgICAgfSBlbHNlIGlmIChpbmRleE9ySWQgPT09IDApIHtcbiAgICAgICAgICAgIGlmIChkYXRhU291cmNlID09PSB0aGlzLl92aWV3U2VxdWVuY2UpIHtcbiAgICAgICAgICAgICAgICBkYXRhU291cmNlLnNwbGljZSgwLCAwLCByZW5kZXJhYmxlKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fdmlld1NlcXVlbmNlLmdldEluZGV4KCkgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5leHRWaWV3U2VxdWVuY2UgPSB0aGlzLl92aWV3U2VxdWVuY2UuZ2V0TmV4dCgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAobmV4dFZpZXdTZXF1ZW5jZSAmJiBuZXh0Vmlld1NlcXVlbmNlLmdldCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl92aWV3U2VxdWVuY2UgPSBuZXh0Vmlld1NlcXVlbmNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkYXRhU291cmNlLnNwbGljZSgwLCAwLCByZW5kZXJhYmxlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRhdGFTb3VyY2Uuc3BsaWNlKGluZGV4T3JJZCwgMCwgcmVuZGVyYWJsZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKGluc2VydFNwZWMpIHtcbiAgICAgICAgdGhpcy5fbm9kZXMuaW5zZXJ0Tm9kZSh0aGlzLl9ub2Rlcy5jcmVhdGVOb2RlKHJlbmRlcmFibGUsIGluc2VydFNwZWMpKTtcbiAgICB9XG4gICAgaWYgKHRoaXMub3B0aW9ucy5hdXRvUGlwZUV2ZW50cyAmJiByZW5kZXJhYmxlICYmIHJlbmRlcmFibGUucGlwZSkge1xuICAgICAgICByZW5kZXJhYmxlLnBpcGUodGhpcyk7XG4gICAgICAgIHJlbmRlcmFibGUucGlwZSh0aGlzLl9ldmVudE91dHB1dCk7XG4gICAgfVxuICAgIHRoaXMuX2lzRGlydHkgPSB0cnVlO1xuICAgIHJldHVybiB0aGlzO1xufTtcbkxheW91dENvbnRyb2xsZXIucHJvdG90eXBlLnB1c2ggPSBmdW5jdGlvbiAocmVuZGVyYWJsZSwgaW5zZXJ0U3BlYykge1xuICAgIHJldHVybiB0aGlzLmluc2VydCgtMSwgcmVuZGVyYWJsZSwgaW5zZXJ0U3BlYyk7XG59O1xuZnVuY3Rpb24gX2dldFZpZXdTZXF1ZW5jZUF0SW5kZXgoaW5kZXgpIHtcbiAgICB2YXIgdmlld1NlcXVlbmNlID0gdGhpcy5fdmlld1NlcXVlbmNlO1xuICAgIHZhciBpID0gdmlld1NlcXVlbmNlID8gdmlld1NlcXVlbmNlLmdldEluZGV4KCkgOiBpbmRleDtcbiAgICBpZiAoaW5kZXggPiBpKSB7XG4gICAgICAgIHdoaWxlICh2aWV3U2VxdWVuY2UpIHtcbiAgICAgICAgICAgIHZpZXdTZXF1ZW5jZSA9IHZpZXdTZXF1ZW5jZS5nZXROZXh0KCk7XG4gICAgICAgICAgICBpZiAoIXZpZXdTZXF1ZW5jZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpID0gdmlld1NlcXVlbmNlLmdldEluZGV4KCk7XG4gICAgICAgICAgICBpZiAoaSA9PT0gaW5kZXgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmlld1NlcXVlbmNlO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChpbmRleCA8IGkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSBlbHNlIGlmIChpbmRleCA8IGkpIHtcbiAgICAgICAgd2hpbGUgKHZpZXdTZXF1ZW5jZSkge1xuICAgICAgICAgICAgdmlld1NlcXVlbmNlID0gdmlld1NlcXVlbmNlLmdldFByZXZpb3VzKCk7XG4gICAgICAgICAgICBpZiAoIXZpZXdTZXF1ZW5jZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpID0gdmlld1NlcXVlbmNlLmdldEluZGV4KCk7XG4gICAgICAgICAgICBpZiAoaSA9PT0gaW5kZXgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmlld1NlcXVlbmNlO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChpbmRleCA+IGkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB2aWV3U2VxdWVuY2U7XG59XG5MYXlvdXRDb250cm9sbGVyLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAoaW5kZXhPcklkKSB7XG4gICAgaWYgKHRoaXMuX25vZGVzQnlJZCB8fCBpbmRleE9ySWQgaW5zdGFuY2VvZiBTdHJpbmcgfHwgdHlwZW9mIGluZGV4T3JJZCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX25vZGVzQnlJZFtpbmRleE9ySWRdO1xuICAgIH1cbiAgICB2YXIgdmlld1NlcXVlbmNlID0gX2dldFZpZXdTZXF1ZW5jZUF0SW5kZXguY2FsbCh0aGlzLCBpbmRleE9ySWQpO1xuICAgIHJldHVybiB2aWV3U2VxdWVuY2UgPyB2aWV3U2VxdWVuY2UuZ2V0KCkgOiB1bmRlZmluZWQ7XG59O1xuTGF5b3V0Q29udHJvbGxlci5wcm90b3R5cGUuc3dhcCA9IGZ1bmN0aW9uIChpbmRleCwgaW5kZXgyKSB7XG4gICAgaWYgKHRoaXMuX3ZpZXdTZXF1ZW5jZSkge1xuICAgICAgICBfZ2V0Vmlld1NlcXVlbmNlQXRJbmRleC5jYWxsKHRoaXMsIGluZGV4KS5zd2FwKF9nZXRWaWV3U2VxdWVuY2VBdEluZGV4LmNhbGwodGhpcywgaW5kZXgyKSk7XG4gICAgICAgIHRoaXMuX2lzRGlydHkgPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbn07XG5MYXlvdXRDb250cm9sbGVyLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiAoaW5kZXhPcklkLCByZW1vdmVTcGVjKSB7XG4gICAgdmFyIHJlbmRlck5vZGU7XG4gICAgaWYgKHRoaXMuX25vZGVzQnlJZCB8fCBpbmRleE9ySWQgaW5zdGFuY2VvZiBTdHJpbmcgfHwgdHlwZW9mIGluZGV4T3JJZCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmVuZGVyTm9kZSA9IHRoaXMuX25vZGVzQnlJZFtpbmRleE9ySWRdO1xuICAgICAgICBpZiAocmVuZGVyTm9kZSkge1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuX25vZGVzQnlJZFtpbmRleE9ySWRdO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmVuZGVyTm9kZSA9IHRoaXMuX2RhdGFTb3VyY2Uuc3BsaWNlKGluZGV4T3JJZCwgMSlbMF07XG4gICAgfVxuICAgIGlmIChyZW5kZXJOb2RlICYmIHJlbW92ZVNwZWMpIHtcbiAgICAgICAgdmFyIG5vZGUgPSB0aGlzLl9ub2Rlcy5nZXROb2RlQnlSZW5kZXJOb2RlKHJlbmRlck5vZGUpO1xuICAgICAgICBpZiAobm9kZSkge1xuICAgICAgICAgICAgbm9kZS5yZW1vdmUocmVtb3ZlU3BlYyB8fCB0aGlzLm9wdGlvbnMucmVtb3ZlU3BlYyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKHJlbmRlck5vZGUpIHtcbiAgICAgICAgdGhpcy5faXNEaXJ0eSA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xufTtcbkxheW91dENvbnRyb2xsZXIucHJvdG90eXBlLnJlbW92ZUFsbCA9IGZ1bmN0aW9uIChyZW1vdmVTcGVjKSB7XG4gICAgaWYgKHRoaXMuX25vZGVzQnlJZCkge1xuICAgICAgICB2YXIgZGlydHkgPSBmYWxzZTtcbiAgICAgICAgZm9yICh2YXIga2V5IGluIHRoaXMuX25vZGVzQnlJZCkge1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuX25vZGVzQnlJZFtrZXldO1xuICAgICAgICAgICAgZGlydHkgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkaXJ0eSkge1xuICAgICAgICAgICAgdGhpcy5faXNEaXJ0eSA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRoaXMuX2RhdGFTb3VyY2UpIHtcbiAgICAgICAgdGhpcy5zZXREYXRhU291cmNlKFtdKTtcbiAgICB9XG4gICAgaWYgKHJlbW92ZVNwZWMpIHtcbiAgICAgICAgdmFyIG5vZGUgPSB0aGlzLl9ub2Rlcy5nZXRTdGFydEVudW1Ob2RlKCk7XG4gICAgICAgIHdoaWxlIChub2RlKSB7XG4gICAgICAgICAgICBub2RlLnJlbW92ZShyZW1vdmVTcGVjIHx8IHRoaXMub3B0aW9ucy5yZW1vdmVTcGVjKTtcbiAgICAgICAgICAgIG5vZGUgPSBub2RlLl9uZXh0O1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xufTtcbkxheW91dENvbnRyb2xsZXIucHJvdG90eXBlLmdldFNpemUgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3NpemUgfHwgdGhpcy5vcHRpb25zLnNpemU7XG59O1xuTGF5b3V0Q29udHJvbGxlci5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgIHJldHVybiB0aGlzLmlkO1xufTtcbkxheW91dENvbnRyb2xsZXIucHJvdG90eXBlLmNvbW1pdCA9IGZ1bmN0aW9uIGNvbW1pdChjb250ZXh0KSB7XG4gICAgdmFyIHRyYW5zZm9ybSA9IGNvbnRleHQudHJhbnNmb3JtO1xuICAgIHZhciBvcmlnaW4gPSBjb250ZXh0Lm9yaWdpbjtcbiAgICB2YXIgc2l6ZSA9IGNvbnRleHQuc2l6ZTtcbiAgICB2YXIgb3BhY2l0eSA9IGNvbnRleHQub3BhY2l0eTtcbiAgICBpZiAoc2l6ZVswXSAhPT0gdGhpcy5fY29udGV4dFNpemVDYWNoZVswXSB8fCBzaXplWzFdICE9PSB0aGlzLl9jb250ZXh0U2l6ZUNhY2hlWzFdIHx8IHRoaXMuX2lzRGlydHkgfHwgdGhpcy5fbm9kZXMuX3RydWVTaXplUmVxdWVzdGVkIHx8IHRoaXMub3B0aW9ucy5hbHdheXNMYXlvdXQpIHtcbiAgICAgICAgdmFyIGV2ZW50RGF0YSA9IHtcbiAgICAgICAgICAgICAgICB0YXJnZXQ6IHRoaXMsXG4gICAgICAgICAgICAgICAgb2xkU2l6ZTogdGhpcy5fY29udGV4dFNpemVDYWNoZSxcbiAgICAgICAgICAgICAgICBzaXplOiBzaXplLFxuICAgICAgICAgICAgICAgIGRpcnR5OiB0aGlzLl9pc0RpcnR5LFxuICAgICAgICAgICAgICAgIHRydWVTaXplUmVxdWVzdGVkOiB0aGlzLl9ub2Rlcy5fdHJ1ZVNpemVSZXF1ZXN0ZWRcbiAgICAgICAgICAgIH07XG4gICAgICAgIHRoaXMuX2V2ZW50T3V0cHV0LmVtaXQoJ2xheW91dHN0YXJ0JywgZXZlbnREYXRhKTtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5mbG93ICYmICh0aGlzLl9pc0RpcnR5IHx8IHRoaXMub3B0aW9ucy5yZWZsb3dPblJlc2l6ZSAmJiAoc2l6ZVswXSAhPT0gdGhpcy5fY29udGV4dFNpemVDYWNoZVswXSB8fCBzaXplWzFdICE9PSB0aGlzLl9jb250ZXh0U2l6ZUNhY2hlWzFdKSkpIHtcbiAgICAgICAgICAgIHZhciBub2RlID0gdGhpcy5fbm9kZXMuZ2V0U3RhcnRFbnVtTm9kZSgpO1xuICAgICAgICAgICAgd2hpbGUgKG5vZGUpIHtcbiAgICAgICAgICAgICAgICBub2RlLnJlbGVhc2VMb2NrKCk7XG4gICAgICAgICAgICAgICAgbm9kZSA9IG5vZGUuX25leHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fY29udGV4dFNpemVDYWNoZVswXSA9IHNpemVbMF07XG4gICAgICAgIHRoaXMuX2NvbnRleHRTaXplQ2FjaGVbMV0gPSBzaXplWzFdO1xuICAgICAgICB0aGlzLl9pc0RpcnR5ID0gZmFsc2U7XG4gICAgICAgIHZhciBzY3JvbGxFbmQ7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuc2l6ZSAmJiB0aGlzLm9wdGlvbnMuc2l6ZVt0aGlzLl9kaXJlY3Rpb25dID09PSB0cnVlKSB7XG4gICAgICAgICAgICBzY3JvbGxFbmQgPSAxMDAwMDAwO1xuICAgICAgICB9XG4gICAgICAgIHZhciBsYXlvdXRDb250ZXh0ID0gdGhpcy5fbm9kZXMucHJlcGFyZUZvckxheW91dCh0aGlzLl92aWV3U2VxdWVuY2UsIHRoaXMuX25vZGVzQnlJZCwge1xuICAgICAgICAgICAgICAgIHNpemU6IHNpemUsXG4gICAgICAgICAgICAgICAgZGlyZWN0aW9uOiB0aGlzLl9kaXJlY3Rpb24sXG4gICAgICAgICAgICAgICAgc2Nyb2xsRW5kOiBzY3JvbGxFbmRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICBpZiAodGhpcy5fbGF5b3V0Ll9mdW5jdGlvbikge1xuICAgICAgICAgICAgdGhpcy5fbGF5b3V0Ll9mdW5jdGlvbihsYXlvdXRDb250ZXh0LCB0aGlzLl9sYXlvdXQub3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbm9kZXMucmVtb3ZlTm9uSW52YWxpZGF0ZWROb2Rlcyh0aGlzLm9wdGlvbnMucmVtb3ZlU3BlYyk7XG4gICAgICAgIHRoaXMuX25vZGVzLnJlbW92ZVZpcnR1YWxWaWV3U2VxdWVuY2VOb2RlcygpO1xuICAgICAgICBpZiAoc2Nyb2xsRW5kKSB7XG4gICAgICAgICAgICBzY3JvbGxFbmQgPSAwO1xuICAgICAgICAgICAgbm9kZSA9IHRoaXMuX25vZGVzLmdldFN0YXJ0RW51bU5vZGUoKTtcbiAgICAgICAgICAgIHdoaWxlIChub2RlKSB7XG4gICAgICAgICAgICAgICAgaWYgKG5vZGUuX2ludmFsaWRhdGVkICYmIG5vZGUuc2Nyb2xsTGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbEVuZCArPSBub2RlLnNjcm9sbExlbmd0aDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbm9kZSA9IG5vZGUuX25leHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9zaXplID0gdGhpcy5fc2l6ZSB8fCBbXG4gICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICAwXG4gICAgICAgICAgICBdO1xuICAgICAgICAgICAgdGhpcy5fc2l6ZVswXSA9IHRoaXMub3B0aW9ucy5zaXplWzBdO1xuICAgICAgICAgICAgdGhpcy5fc2l6ZVsxXSA9IHRoaXMub3B0aW9ucy5zaXplWzFdO1xuICAgICAgICAgICAgdGhpcy5fc2l6ZVt0aGlzLl9kaXJlY3Rpb25dID0gc2Nyb2xsRW5kO1xuICAgICAgICB9XG4gICAgICAgIHZhciByZXN1bHQgPSB0aGlzLl9ub2Rlcy5idWlsZFNwZWNBbmREZXN0cm95VW5yZW5kZXJlZE5vZGVzKCk7XG4gICAgICAgIHRoaXMuX2NvbW1pdE91dHB1dC50YXJnZXQgPSByZXN1bHQuc3BlY3M7XG4gICAgICAgIHRoaXMuX2V2ZW50T3V0cHV0LmVtaXQoJ3JlZmxvdycsIHsgdGFyZ2V0OiB0aGlzIH0pO1xuICAgICAgICB0aGlzLl9ldmVudE91dHB1dC5lbWl0KCdsYXlvdXRlbmQnLCBldmVudERhdGEpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5vcHRpb25zLmZsb3cpIHtcbiAgICAgICAgcmVzdWx0ID0gdGhpcy5fbm9kZXMuYnVpbGRTcGVjQW5kRGVzdHJveVVucmVuZGVyZWROb2RlcygpO1xuICAgICAgICB0aGlzLl9jb21taXRPdXRwdXQudGFyZ2V0ID0gcmVzdWx0LnNwZWNzO1xuICAgICAgICBpZiAocmVzdWx0Lm1vZGlmaWVkKSB7XG4gICAgICAgICAgICB0aGlzLl9ldmVudE91dHB1dC5lbWl0KCdyZWZsb3cnLCB7IHRhcmdldDogdGhpcyB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl9zcGVjcyA9IHRoaXMuX2NvbW1pdE91dHB1dC50YXJnZXQ7XG4gICAgdmFyIHRhcmdldCA9IHRoaXMuX2NvbW1pdE91dHB1dC50YXJnZXQ7XG4gICAgZm9yICh2YXIgaSA9IDAsIGogPSB0YXJnZXQubGVuZ3RoOyBpIDwgajsgaSsrKSB7XG4gICAgICAgIHRhcmdldFtpXS50YXJnZXQgPSB0YXJnZXRbaV0ucmVuZGVyTm9kZS5yZW5kZXIoKTtcbiAgICB9XG4gICAgaWYgKG9yaWdpbiAmJiAob3JpZ2luWzBdICE9PSAwIHx8IG9yaWdpblsxXSAhPT0gMCkpIHtcbiAgICAgICAgdHJhbnNmb3JtID0gVHJhbnNmb3JtLm1vdmVUaGVuKFtcbiAgICAgICAgICAgIC1zaXplWzBdICogb3JpZ2luWzBdLFxuICAgICAgICAgICAgLXNpemVbMV0gKiBvcmlnaW5bMV0sXG4gICAgICAgICAgICAwXG4gICAgICAgIF0sIHRyYW5zZm9ybSk7XG4gICAgfVxuICAgIHRoaXMuX2NvbW1pdE91dHB1dC5zaXplID0gc2l6ZTtcbiAgICB0aGlzLl9jb21taXRPdXRwdXQub3BhY2l0eSA9IG9wYWNpdHk7XG4gICAgdGhpcy5fY29tbWl0T3V0cHV0LnRyYW5zZm9ybSA9IHRyYW5zZm9ybTtcbiAgICByZXR1cm4gdGhpcy5fY29tbWl0T3V0cHV0O1xufTtcbm1vZHVsZS5leHBvcnRzID0gTGF5b3V0Q29udHJvbGxlcjsiLCJ2YXIgVHJhbnNmb3JtID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cuZmFtb3VzLmNvcmUuVHJhbnNmb3JtIDogdHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcgPyBnbG9iYWwuZmFtb3VzLmNvcmUuVHJhbnNmb3JtIDogbnVsbDtcbnZhciBMYXlvdXRVdGlsaXR5ID0gcmVxdWlyZSgnLi9MYXlvdXRVdGlsaXR5Jyk7XG5mdW5jdGlvbiBMYXlvdXROb2RlKHJlbmRlck5vZGUsIHNwZWMpIHtcbiAgICB0aGlzLnJlbmRlck5vZGUgPSByZW5kZXJOb2RlO1xuICAgIHRoaXMuX3NwZWMgPSBzcGVjID8gTGF5b3V0VXRpbGl0eS5jbG9uZVNwZWMoc3BlYykgOiB7fTtcbiAgICB0aGlzLl9zcGVjLnJlbmRlck5vZGUgPSByZW5kZXJOb2RlO1xuICAgIHRoaXMuX3NwZWNNb2RpZmllZCA9IHRydWU7XG4gICAgdGhpcy5faW52YWxpZGF0ZWQgPSBmYWxzZTtcbiAgICB0aGlzLl9yZW1vdmluZyA9IGZhbHNlO1xufVxuTGF5b3V0Tm9kZS5wcm90b3R5cGUuc2V0T3B0aW9ucyA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG59O1xuTGF5b3V0Tm9kZS5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnJlbmRlck5vZGUgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5fc3BlYy5yZW5kZXJOb2RlID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuX3ZpZXdTZXF1ZW5jZSA9IHVuZGVmaW5lZDtcbn07XG5MYXlvdXROb2RlLnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLl9pbnZhbGlkYXRlZCA9IGZhbHNlO1xuICAgIHRoaXMudHJ1ZVNpemVSZXF1ZXN0ZWQgPSBmYWxzZTtcbn07XG5MYXlvdXROb2RlLnByb3RvdHlwZS5zZXRTcGVjID0gZnVuY3Rpb24gKHNwZWMpIHtcbiAgICB0aGlzLl9zcGVjTW9kaWZpZWQgPSB0cnVlO1xuICAgIGlmIChzcGVjLmFsaWduKSB7XG4gICAgICAgIGlmICghc3BlYy5hbGlnbikge1xuICAgICAgICAgICAgdGhpcy5fc3BlYy5hbGlnbiA9IFtcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIDBcbiAgICAgICAgICAgIF07XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fc3BlYy5hbGlnblswXSA9IHNwZWMuYWxpZ25bMF07XG4gICAgICAgIHRoaXMuX3NwZWMuYWxpZ25bMV0gPSBzcGVjLmFsaWduWzFdO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX3NwZWMuYWxpZ24gPSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIGlmIChzcGVjLm9yaWdpbikge1xuICAgICAgICBpZiAoIXNwZWMub3JpZ2luKSB7XG4gICAgICAgICAgICB0aGlzLl9zcGVjLm9yaWdpbiA9IFtcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIDBcbiAgICAgICAgICAgIF07XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fc3BlYy5vcmlnaW5bMF0gPSBzcGVjLm9yaWdpblswXTtcbiAgICAgICAgdGhpcy5fc3BlYy5vcmlnaW5bMV0gPSBzcGVjLm9yaWdpblsxXTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9zcGVjLm9yaWdpbiA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgaWYgKHNwZWMuc2l6ZSkge1xuICAgICAgICBpZiAoIXNwZWMuc2l6ZSkge1xuICAgICAgICAgICAgdGhpcy5fc3BlYy5zaXplID0gW1xuICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgMFxuICAgICAgICAgICAgXTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9zcGVjLnNpemVbMF0gPSBzcGVjLnNpemVbMF07XG4gICAgICAgIHRoaXMuX3NwZWMuc2l6ZVsxXSA9IHNwZWMuc2l6ZVsxXTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9zcGVjLnNpemUgPSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIGlmIChzcGVjLnRyYW5zZm9ybSkge1xuICAgICAgICBpZiAoIXNwZWMudHJhbnNmb3JtKSB7XG4gICAgICAgICAgICB0aGlzLl9zcGVjLnRyYW5zZm9ybSA9IHNwZWMudHJhbnNmb3JtLnNsaWNlKDApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAxNjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc3BlYy50cmFuc2Zvcm1bMF0gPSBzcGVjLnRyYW5zZm9ybVswXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX3NwZWMudHJhbnNmb3JtID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICB0aGlzLl9zcGVjLm9wYWNpdHkgPSBzcGVjLm9wYWNpdHk7XG59O1xuTGF5b3V0Tm9kZS5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gKHNldCwgc2l6ZSkge1xuICAgIHRoaXMuX2ludmFsaWRhdGVkID0gdHJ1ZTtcbiAgICB0aGlzLl9zcGVjTW9kaWZpZWQgPSB0cnVlO1xuICAgIHRoaXMuX3JlbW92aW5nID0gZmFsc2U7XG4gICAgdmFyIHNwZWMgPSB0aGlzLl9zcGVjO1xuICAgIHNwZWMub3BhY2l0eSA9IHNldC5vcGFjaXR5O1xuICAgIGlmIChzZXQuc2l6ZSkge1xuICAgICAgICBpZiAoIXNwZWMuc2l6ZSkge1xuICAgICAgICAgICAgc3BlYy5zaXplID0gW1xuICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgMFxuICAgICAgICAgICAgXTtcbiAgICAgICAgfVxuICAgICAgICBzcGVjLnNpemVbMF0gPSBzZXQuc2l6ZVswXTtcbiAgICAgICAgc3BlYy5zaXplWzFdID0gc2V0LnNpemVbMV07XG4gICAgfSBlbHNlIHtcbiAgICAgICAgc3BlYy5zaXplID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBpZiAoc2V0Lm9yaWdpbikge1xuICAgICAgICBpZiAoIXNwZWMub3JpZ2luKSB7XG4gICAgICAgICAgICBzcGVjLm9yaWdpbiA9IFtcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIDBcbiAgICAgICAgICAgIF07XG4gICAgICAgIH1cbiAgICAgICAgc3BlYy5vcmlnaW5bMF0gPSBzZXQub3JpZ2luWzBdO1xuICAgICAgICBzcGVjLm9yaWdpblsxXSA9IHNldC5vcmlnaW5bMV07XG4gICAgfSBlbHNlIHtcbiAgICAgICAgc3BlYy5vcmlnaW4gPSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIGlmIChzZXQuYWxpZ24pIHtcbiAgICAgICAgaWYgKCFzcGVjLmFsaWduKSB7XG4gICAgICAgICAgICBzcGVjLmFsaWduID0gW1xuICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgMFxuICAgICAgICAgICAgXTtcbiAgICAgICAgfVxuICAgICAgICBzcGVjLmFsaWduWzBdID0gc2V0LmFsaWduWzBdO1xuICAgICAgICBzcGVjLmFsaWduWzFdID0gc2V0LmFsaWduWzFdO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHNwZWMuYWxpZ24gPSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIGlmIChzZXQuc2tldyB8fCBzZXQucm90YXRlIHx8IHNldC5zY2FsZSkge1xuICAgICAgICB0aGlzLl9zcGVjLnRyYW5zZm9ybSA9IFRyYW5zZm9ybS5idWlsZCh7XG4gICAgICAgICAgICB0cmFuc2xhdGU6IHNldC50cmFuc2xhdGUgfHwgW1xuICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICAwXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgc2tldzogc2V0LnNrZXcgfHwgW1xuICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICAwXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgc2NhbGU6IHNldC5zY2FsZSB8fCBbXG4gICAgICAgICAgICAgICAgMSxcbiAgICAgICAgICAgICAgICAxLFxuICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICByb3RhdGU6IHNldC5yb3RhdGUgfHwgW1xuICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICAwXG4gICAgICAgICAgICBdXG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoc2V0LnRyYW5zbGF0ZSkge1xuICAgICAgICB0aGlzLl9zcGVjLnRyYW5zZm9ybSA9IFRyYW5zZm9ybS50cmFuc2xhdGUoc2V0LnRyYW5zbGF0ZVswXSwgc2V0LnRyYW5zbGF0ZVsxXSwgc2V0LnRyYW5zbGF0ZVsyXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fc3BlYy50cmFuc2Zvcm0gPSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHRoaXMuc2Nyb2xsTGVuZ3RoID0gc2V0LnNjcm9sbExlbmd0aDtcbn07XG5MYXlvdXROb2RlLnByb3RvdHlwZS5nZXRTcGVjID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuX3NwZWNNb2RpZmllZCA9IGZhbHNlO1xuICAgIHRoaXMuX3NwZWMucmVtb3ZlZCA9ICF0aGlzLl9pbnZhbGlkYXRlZDtcbiAgICByZXR1cm4gdGhpcy5fc3BlYztcbn07XG5MYXlvdXROb2RlLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiAocmVtb3ZlU3BlYykge1xuICAgIHRoaXMuX3JlbW92aW5nID0gdHJ1ZTtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IExheW91dE5vZGU7IiwidmFyIExheW91dENvbnRleHQgPSByZXF1aXJlKCcuL0xheW91dENvbnRleHQnKTtcbnZhciBMYXlvdXRVdGlsaXR5ID0gcmVxdWlyZSgnLi9MYXlvdXRVdGlsaXR5Jyk7XG52YXIgTUFYX1BPT0xfU0laRSA9IDEwMDtcbmZ1bmN0aW9uIExheW91dE5vZGVNYW5hZ2VyKExheW91dE5vZGUsIGluaXRMYXlvdXROb2RlRm4pIHtcbiAgICB0aGlzLkxheW91dE5vZGUgPSBMYXlvdXROb2RlO1xuICAgIHRoaXMuX2luaXRMYXlvdXROb2RlRm4gPSBpbml0TGF5b3V0Tm9kZUZuO1xuICAgIHRoaXMuX2xheW91dENvdW50ID0gMDtcbiAgICB0aGlzLl9jb250ZXh0ID0gbmV3IExheW91dENvbnRleHQoe1xuICAgICAgICBuZXh0OiBfY29udGV4dE5leHQuYmluZCh0aGlzKSxcbiAgICAgICAgcHJldjogX2NvbnRleHRQcmV2LmJpbmQodGhpcyksXG4gICAgICAgIGdldDogX2NvbnRleHRHZXQuYmluZCh0aGlzKSxcbiAgICAgICAgc2V0OiBfY29udGV4dFNldC5iaW5kKHRoaXMpLFxuICAgICAgICByZXNvbHZlU2l6ZTogX2NvbnRleHRSZXNvbHZlU2l6ZS5iaW5kKHRoaXMpLFxuICAgICAgICBzaXplOiBbXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMFxuICAgICAgICBdXG4gICAgfSk7XG4gICAgdGhpcy5fY29udGV4dFN0YXRlID0ge307XG4gICAgdGhpcy5fcG9vbCA9IHtcbiAgICAgICAgbGF5b3V0Tm9kZXM6IHsgc2l6ZTogMCB9LFxuICAgICAgICByZXNvbHZlU2l6ZTogW1xuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDBcbiAgICAgICAgXVxuICAgIH07XG59XG5MYXlvdXROb2RlTWFuYWdlci5wcm90b3R5cGUucHJlcGFyZUZvckxheW91dCA9IGZ1bmN0aW9uICh2aWV3U2VxdWVuY2UsIG5vZGVzQnlJZCwgY29udGV4dERhdGEpIHtcbiAgICB2YXIgbm9kZSA9IHRoaXMuX2ZpcnN0O1xuICAgIHdoaWxlIChub2RlKSB7XG4gICAgICAgIG5vZGUucmVzZXQoKTtcbiAgICAgICAgbm9kZSA9IG5vZGUuX25leHQ7XG4gICAgfVxuICAgIHZhciBjb250ZXh0ID0gdGhpcy5fY29udGV4dDtcbiAgICB0aGlzLl9sYXlvdXRDb3VudCsrO1xuICAgIHRoaXMuX25vZGVzQnlJZCA9IG5vZGVzQnlJZDtcbiAgICB0aGlzLl90cnVlU2l6ZVJlcXVlc3RlZCA9IGZhbHNlO1xuICAgIHRoaXMuX3JlZXZhbFRydWVTaXplID0gY29udGV4dERhdGEucmVldmFsVHJ1ZVNpemUgfHwgIWNvbnRleHQuc2l6ZSB8fCBjb250ZXh0LnNpemVbMF0gIT09IGNvbnRleHREYXRhLnNpemVbMF0gfHwgY29udGV4dC5zaXplWzFdICE9PSBjb250ZXh0RGF0YS5zaXplWzFdO1xuICAgIHZhciBjb250ZXh0U3RhdGUgPSB0aGlzLl9jb250ZXh0U3RhdGU7XG4gICAgY29udGV4dFN0YXRlLnN0YXJ0U2VxdWVuY2UgPSB2aWV3U2VxdWVuY2U7XG4gICAgY29udGV4dFN0YXRlLm5leHRTZXF1ZW5jZSA9IHZpZXdTZXF1ZW5jZTtcbiAgICBjb250ZXh0U3RhdGUucHJldlNlcXVlbmNlID0gdmlld1NlcXVlbmNlO1xuICAgIGNvbnRleHRTdGF0ZS5zdGFydCA9IHVuZGVmaW5lZDtcbiAgICBjb250ZXh0U3RhdGUubmV4dEdldEluZGV4ID0gMDtcbiAgICBjb250ZXh0U3RhdGUucHJldkdldEluZGV4ID0gMDtcbiAgICBjb250ZXh0U3RhdGUubmV4dFNldEluZGV4ID0gMDtcbiAgICBjb250ZXh0U3RhdGUucHJldlNldEluZGV4ID0gMDtcbiAgICBjb250ZXh0U3RhdGUuYWRkQ291bnQgPSAwO1xuICAgIGNvbnRleHRTdGF0ZS5yZW1vdmVDb3VudCA9IDA7XG4gICAgY29udGV4dC5zaXplWzBdID0gY29udGV4dERhdGEuc2l6ZVswXTtcbiAgICBjb250ZXh0LnNpemVbMV0gPSBjb250ZXh0RGF0YS5zaXplWzFdO1xuICAgIGNvbnRleHQuZGlyZWN0aW9uID0gY29udGV4dERhdGEuZGlyZWN0aW9uO1xuICAgIGNvbnRleHQucmV2ZXJzZSA9IGNvbnRleHREYXRhLnJldmVyc2U7XG4gICAgY29udGV4dC5hbGlnbm1lbnQgPSBjb250ZXh0RGF0YS5yZXZlcnNlID8gMSA6IDA7XG4gICAgY29udGV4dC5zY3JvbGxPZmZzZXQgPSBjb250ZXh0RGF0YS5zY3JvbGxPZmZzZXQgfHwgMDtcbiAgICBjb250ZXh0LnNjcm9sbFN0YXJ0ID0gY29udGV4dERhdGEuc2Nyb2xsU3RhcnQgfHwgMDtcbiAgICBjb250ZXh0LnNjcm9sbEVuZCA9IGNvbnRleHREYXRhLnNjcm9sbEVuZCB8fCBjb250ZXh0LnNpemVbY29udGV4dC5kaXJlY3Rpb25dO1xuICAgIHJldHVybiBjb250ZXh0O1xufTtcbkxheW91dE5vZGVNYW5hZ2VyLnByb3RvdHlwZS5yZW1vdmVOb25JbnZhbGlkYXRlZE5vZGVzID0gZnVuY3Rpb24gKHJlbW92ZVNwZWMpIHtcbiAgICB2YXIgbm9kZSA9IHRoaXMuX2ZpcnN0O1xuICAgIHdoaWxlIChub2RlKSB7XG4gICAgICAgIGlmICghbm9kZS5faW52YWxpZGF0ZWQgJiYgIW5vZGUuX3JlbW92aW5nKSB7XG4gICAgICAgICAgICBub2RlLnJlbW92ZShyZW1vdmVTcGVjKTtcbiAgICAgICAgfVxuICAgICAgICBub2RlID0gbm9kZS5fbmV4dDtcbiAgICB9XG59O1xuTGF5b3V0Tm9kZU1hbmFnZXIucHJvdG90eXBlLnJlbW92ZVZpcnR1YWxWaWV3U2VxdWVuY2VOb2RlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5fY29udGV4dFN0YXRlLnN0YXJ0U2VxdWVuY2UgJiYgdGhpcy5fY29udGV4dFN0YXRlLnN0YXJ0U2VxdWVuY2UuY2xlYW51cCkge1xuICAgICAgICB0aGlzLl9jb250ZXh0U3RhdGUuc3RhcnRTZXF1ZW5jZS5jbGVhbnVwKCk7XG4gICAgfVxufTtcbkxheW91dE5vZGVNYW5hZ2VyLnByb3RvdHlwZS5idWlsZFNwZWNBbmREZXN0cm95VW5yZW5kZXJlZE5vZGVzID0gZnVuY3Rpb24gKHRyYW5zbGF0ZSkge1xuICAgIHZhciBzcGVjcyA9IFtdO1xuICAgIHZhciByZXN1bHQgPSB7XG4gICAgICAgICAgICBzcGVjczogc3BlY3MsXG4gICAgICAgICAgICBtb2RpZmllZDogZmFsc2VcbiAgICAgICAgfTtcbiAgICB2YXIgbm9kZSA9IHRoaXMuX2ZpcnN0O1xuICAgIHdoaWxlIChub2RlKSB7XG4gICAgICAgIHZhciBtb2RpZmllZCA9IG5vZGUuX3NwZWNNb2RpZmllZDtcbiAgICAgICAgdmFyIHNwZWMgPSBub2RlLmdldFNwZWMoKTtcbiAgICAgICAgaWYgKHNwZWMucmVtb3ZlZCkge1xuICAgICAgICAgICAgdmFyIGRlc3Ryb3lOb2RlID0gbm9kZTtcbiAgICAgICAgICAgIG5vZGUgPSBub2RlLl9uZXh0O1xuICAgICAgICAgICAgX2Rlc3Ryb3lOb2RlLmNhbGwodGhpcywgZGVzdHJveU5vZGUpO1xuICAgICAgICAgICAgcmVzdWx0Lm1vZGlmaWVkID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChtb2RpZmllZCkge1xuICAgICAgICAgICAgICAgIGlmIChzcGVjLnRyYW5zZm9ybSAmJiB0cmFuc2xhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgc3BlYy50cmFuc2Zvcm1bMTJdICs9IHRyYW5zbGF0ZVswXTtcbiAgICAgICAgICAgICAgICAgICAgc3BlYy50cmFuc2Zvcm1bMTNdICs9IHRyYW5zbGF0ZVsxXTtcbiAgICAgICAgICAgICAgICAgICAgc3BlYy50cmFuc2Zvcm1bMTRdICs9IHRyYW5zbGF0ZVsyXTtcbiAgICAgICAgICAgICAgICAgICAgc3BlYy50cmFuc2Zvcm1bMTJdID0gTWF0aC5yb3VuZChzcGVjLnRyYW5zZm9ybVsxMl0gKiAxMDAwMDApIC8gMTAwMDAwO1xuICAgICAgICAgICAgICAgICAgICBzcGVjLnRyYW5zZm9ybVsxM10gPSBNYXRoLnJvdW5kKHNwZWMudHJhbnNmb3JtWzEzXSAqIDEwMDAwMCkgLyAxMDAwMDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJlc3VsdC5tb2RpZmllZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzcGVjcy5wdXNoKHNwZWMpO1xuICAgICAgICAgICAgbm9kZSA9IG5vZGUuX25leHQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fY29udGV4dFN0YXRlLmFkZENvdW50ID0gMDtcbiAgICB0aGlzLl9jb250ZXh0U3RhdGUucmVtb3ZlQ291bnQgPSAwO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xuTGF5b3V0Tm9kZU1hbmFnZXIucHJvdG90eXBlLmdldE5vZGVCeVJlbmRlck5vZGUgPSBmdW5jdGlvbiAocmVuZGVyYWJsZSkge1xuICAgIHZhciBub2RlID0gdGhpcy5fZmlyc3Q7XG4gICAgd2hpbGUgKG5vZGUpIHtcbiAgICAgICAgaWYgKG5vZGUucmVuZGVyTm9kZSA9PT0gcmVuZGVyYWJsZSkge1xuICAgICAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgICAgIH1cbiAgICAgICAgbm9kZSA9IG5vZGUuX25leHQ7XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG59O1xuTGF5b3V0Tm9kZU1hbmFnZXIucHJvdG90eXBlLmluc2VydE5vZGUgPSBmdW5jdGlvbiAobm9kZSkge1xuICAgIG5vZGUuX25leHQgPSB0aGlzLl9maXJzdDtcbiAgICBpZiAodGhpcy5fZmlyc3QpIHtcbiAgICAgICAgdGhpcy5fZmlyc3QuX3ByZXYgPSBub2RlO1xuICAgIH1cbiAgICB0aGlzLl9maXJzdCA9IG5vZGU7XG59O1xuTGF5b3V0Tm9kZU1hbmFnZXIucHJvdG90eXBlLnNldE5vZGVPcHRpb25zID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICB0aGlzLl9ub2RlT3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgdmFyIG5vZGUgPSB0aGlzLl9maXJzdDtcbiAgICB3aGlsZSAobm9kZSkge1xuICAgICAgICBub2RlLnNldE9wdGlvbnMob3B0aW9ucyk7XG4gICAgICAgIG5vZGUgPSBub2RlLl9uZXh0O1xuICAgIH1cbiAgICBub2RlID0gdGhpcy5fcG9vbC5sYXlvdXROb2Rlcy5maXJzdDtcbiAgICB3aGlsZSAobm9kZSkge1xuICAgICAgICBub2RlLnNldE9wdGlvbnMob3B0aW9ucyk7XG4gICAgICAgIG5vZGUgPSBub2RlLl9uZXh0O1xuICAgIH1cbn07XG5MYXlvdXROb2RlTWFuYWdlci5wcm90b3R5cGUucHJlYWxsb2NhdGVOb2RlcyA9IGZ1bmN0aW9uIChjb3VudCwgc3BlYykge1xuICAgIHZhciBub2RlcyA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xuICAgICAgICBub2Rlcy5wdXNoKHRoaXMuY3JlYXRlTm9kZSh1bmRlZmluZWQsIHNwZWMpKTtcbiAgICB9XG4gICAgZm9yIChpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICAgICAgX2Rlc3Ryb3lOb2RlLmNhbGwodGhpcywgbm9kZXNbaV0pO1xuICAgIH1cbn07XG5MYXlvdXROb2RlTWFuYWdlci5wcm90b3R5cGUuY3JlYXRlTm9kZSA9IGZ1bmN0aW9uIChyZW5kZXJOb2RlLCBzcGVjKSB7XG4gICAgdmFyIG5vZGU7XG4gICAgaWYgKHRoaXMuX3Bvb2wubGF5b3V0Tm9kZXMuZmlyc3QpIHtcbiAgICAgICAgbm9kZSA9IHRoaXMuX3Bvb2wubGF5b3V0Tm9kZXMuZmlyc3Q7XG4gICAgICAgIHRoaXMuX3Bvb2wubGF5b3V0Tm9kZXMuZmlyc3QgPSBub2RlLl9uZXh0O1xuICAgICAgICB0aGlzLl9wb29sLmxheW91dE5vZGVzLnNpemUtLTtcbiAgICAgICAgbm9kZS5jb25zdHJ1Y3Rvci5hcHBseShub2RlLCBhcmd1bWVudHMpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIG5vZGUgPSBuZXcgdGhpcy5MYXlvdXROb2RlKHJlbmRlck5vZGUsIHNwZWMpO1xuICAgICAgICBpZiAodGhpcy5fbm9kZU9wdGlvbnMpIHtcbiAgICAgICAgICAgIG5vZGUuc2V0T3B0aW9ucyh0aGlzLl9ub2RlT3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgbm9kZS5fcHJldiA9IHVuZGVmaW5lZDtcbiAgICBub2RlLl9uZXh0ID0gdW5kZWZpbmVkO1xuICAgIG5vZGUuX3ZpZXdTZXF1ZW5jZSA9IHVuZGVmaW5lZDtcbiAgICBub2RlLl9sYXlvdXRDb3VudCA9IDA7XG4gICAgaWYgKHRoaXMuX2luaXRMYXlvdXROb2RlRm4pIHtcbiAgICAgICAgdGhpcy5faW5pdExheW91dE5vZGVGbi5jYWxsKHRoaXMsIG5vZGUsIHNwZWMpO1xuICAgIH1cbiAgICByZXR1cm4gbm9kZTtcbn07XG5mdW5jdGlvbiBfZGVzdHJveU5vZGUobm9kZSkge1xuICAgIGlmIChub2RlLl9uZXh0KSB7XG4gICAgICAgIG5vZGUuX25leHQuX3ByZXYgPSBub2RlLl9wcmV2O1xuICAgIH1cbiAgICBpZiAobm9kZS5fcHJldikge1xuICAgICAgICBub2RlLl9wcmV2Ll9uZXh0ID0gbm9kZS5fbmV4dDtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9maXJzdCA9IG5vZGUuX25leHQ7XG4gICAgfVxuICAgIG5vZGUuZGVzdHJveSgpO1xuICAgIGlmICh0aGlzLl9wb29sLmxheW91dE5vZGVzLnNpemUgPCBNQVhfUE9PTF9TSVpFKSB7XG4gICAgICAgIHRoaXMuX3Bvb2wubGF5b3V0Tm9kZXMuc2l6ZSsrO1xuICAgICAgICBub2RlLl9wcmV2ID0gdW5kZWZpbmVkO1xuICAgICAgICBub2RlLl9uZXh0ID0gdGhpcy5fcG9vbC5sYXlvdXROb2Rlcy5maXJzdDtcbiAgICAgICAgdGhpcy5fcG9vbC5sYXlvdXROb2Rlcy5maXJzdCA9IG5vZGU7XG4gICAgfVxufVxuTGF5b3V0Tm9kZU1hbmFnZXIucHJvdG90eXBlLmdldFN0YXJ0RW51bU5vZGUgPSBmdW5jdGlvbiAobmV4dCkge1xuICAgIGlmIChuZXh0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZpcnN0O1xuICAgIH0gZWxzZSBpZiAobmV4dCA9PT0gdHJ1ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29udGV4dFN0YXRlLnN0YXJ0ICYmIHRoaXMuX2NvbnRleHRTdGF0ZS5zdGFydFByZXYgPyB0aGlzLl9jb250ZXh0U3RhdGUuc3RhcnQuX25leHQgOiB0aGlzLl9jb250ZXh0U3RhdGUuc3RhcnQ7XG4gICAgfSBlbHNlIGlmIChuZXh0ID09PSBmYWxzZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29udGV4dFN0YXRlLnN0YXJ0ICYmICF0aGlzLl9jb250ZXh0U3RhdGUuc3RhcnRQcmV2ID8gdGhpcy5fY29udGV4dFN0YXRlLnN0YXJ0Ll9wcmV2IDogdGhpcy5fY29udGV4dFN0YXRlLnN0YXJ0O1xuICAgIH1cbn07XG5mdW5jdGlvbiBfY29udGV4dEdldENyZWF0ZUFuZE9yZGVyTm9kZXMocmVuZGVyTm9kZSwgcHJldikge1xuICAgIHZhciBub2RlO1xuICAgIHZhciBzdGF0ZSA9IHRoaXMuX2NvbnRleHRTdGF0ZTtcbiAgICBpZiAoIXN0YXRlLnN0YXJ0KSB7XG4gICAgICAgIG5vZGUgPSB0aGlzLl9maXJzdDtcbiAgICAgICAgd2hpbGUgKG5vZGUpIHtcbiAgICAgICAgICAgIGlmIChub2RlLnJlbmRlck5vZGUgPT09IHJlbmRlck5vZGUpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5vZGUgPSBub2RlLl9uZXh0O1xuICAgICAgICB9XG4gICAgICAgIGlmICghbm9kZSkge1xuICAgICAgICAgICAgbm9kZSA9IHRoaXMuY3JlYXRlTm9kZShyZW5kZXJOb2RlKTtcbiAgICAgICAgICAgIG5vZGUuX25leHQgPSB0aGlzLl9maXJzdDtcbiAgICAgICAgICAgIGlmICh0aGlzLl9maXJzdCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2ZpcnN0Ll9wcmV2ID0gbm9kZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2ZpcnN0ID0gbm9kZTtcbiAgICAgICAgfVxuICAgICAgICBzdGF0ZS5zdGFydCA9IG5vZGU7XG4gICAgICAgIHN0YXRlLnN0YXJ0UHJldiA9IHByZXY7XG4gICAgICAgIHN0YXRlLnByZXYgPSBub2RlO1xuICAgICAgICBzdGF0ZS5uZXh0ID0gbm9kZTtcbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfVxuICAgIGlmIChwcmV2KSB7XG4gICAgICAgIGlmIChzdGF0ZS5wcmV2Ll9wcmV2ICYmIHN0YXRlLnByZXYuX3ByZXYucmVuZGVyTm9kZSA9PT0gcmVuZGVyTm9kZSkge1xuICAgICAgICAgICAgc3RhdGUucHJldiA9IHN0YXRlLnByZXYuX3ByZXY7XG4gICAgICAgICAgICByZXR1cm4gc3RhdGUucHJldjtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChzdGF0ZS5uZXh0Ll9uZXh0ICYmIHN0YXRlLm5leHQuX25leHQucmVuZGVyTm9kZSA9PT0gcmVuZGVyTm9kZSkge1xuICAgICAgICAgICAgc3RhdGUubmV4dCA9IHN0YXRlLm5leHQuX25leHQ7XG4gICAgICAgICAgICByZXR1cm4gc3RhdGUubmV4dDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBub2RlID0gdGhpcy5fZmlyc3Q7XG4gICAgd2hpbGUgKG5vZGUpIHtcbiAgICAgICAgaWYgKG5vZGUucmVuZGVyTm9kZSA9PT0gcmVuZGVyTm9kZSkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgbm9kZSA9IG5vZGUuX25leHQ7XG4gICAgfVxuICAgIGlmICghbm9kZSkge1xuICAgICAgICBub2RlID0gdGhpcy5jcmVhdGVOb2RlKHJlbmRlck5vZGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChub2RlLl9uZXh0KSB7XG4gICAgICAgICAgICBub2RlLl9uZXh0Ll9wcmV2ID0gbm9kZS5fcHJldjtcbiAgICAgICAgfVxuICAgICAgICBpZiAobm9kZS5fcHJldikge1xuICAgICAgICAgICAgbm9kZS5fcHJldi5fbmV4dCA9IG5vZGUuX25leHQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9maXJzdCA9IG5vZGUuX25leHQ7XG4gICAgICAgIH1cbiAgICAgICAgbm9kZS5fbmV4dCA9IHVuZGVmaW5lZDtcbiAgICAgICAgbm9kZS5fcHJldiA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgaWYgKHByZXYpIHtcbiAgICAgICAgaWYgKHN0YXRlLnByZXYuX3ByZXYpIHtcbiAgICAgICAgICAgIG5vZGUuX3ByZXYgPSBzdGF0ZS5wcmV2Ll9wcmV2O1xuICAgICAgICAgICAgc3RhdGUucHJldi5fcHJldi5fbmV4dCA9IG5vZGU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9maXJzdCA9IG5vZGU7XG4gICAgICAgIH1cbiAgICAgICAgc3RhdGUucHJldi5fcHJldiA9IG5vZGU7XG4gICAgICAgIG5vZGUuX25leHQgPSBzdGF0ZS5wcmV2O1xuICAgICAgICBzdGF0ZS5wcmV2ID0gbm9kZTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoc3RhdGUubmV4dC5fbmV4dCkge1xuICAgICAgICAgICAgbm9kZS5fbmV4dCA9IHN0YXRlLm5leHQuX25leHQ7XG4gICAgICAgICAgICBzdGF0ZS5uZXh0Ll9uZXh0Ll9wcmV2ID0gbm9kZTtcbiAgICAgICAgfVxuICAgICAgICBzdGF0ZS5uZXh0Ll9uZXh0ID0gbm9kZTtcbiAgICAgICAgbm9kZS5fcHJldiA9IHN0YXRlLm5leHQ7XG4gICAgICAgIHN0YXRlLm5leHQgPSBub2RlO1xuICAgIH1cbiAgICByZXR1cm4gbm9kZTtcbn1cbmZ1bmN0aW9uIF9jb250ZXh0TmV4dCgpIHtcbiAgICBpZiAoIXRoaXMuX2NvbnRleHRTdGF0ZS5uZXh0U2VxdWVuY2UpIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgaWYgKHRoaXMuX2NvbnRleHQucmV2ZXJzZSkge1xuICAgICAgICB0aGlzLl9jb250ZXh0U3RhdGUubmV4dFNlcXVlbmNlID0gdGhpcy5fY29udGV4dFN0YXRlLm5leHRTZXF1ZW5jZS5nZXROZXh0KCk7XG4gICAgICAgIGlmICghdGhpcy5fY29udGV4dFN0YXRlLm5leHRTZXF1ZW5jZSkge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgIH1cbiAgICB2YXIgcmVuZGVyTm9kZSA9IHRoaXMuX2NvbnRleHRTdGF0ZS5uZXh0U2VxdWVuY2UuZ2V0KCk7XG4gICAgaWYgKCFyZW5kZXJOb2RlKSB7XG4gICAgICAgIHRoaXMuX2NvbnRleHRTdGF0ZS5uZXh0U2VxdWVuY2UgPSB1bmRlZmluZWQ7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHZhciBuZXh0U2VxdWVuY2UgPSB0aGlzLl9jb250ZXh0U3RhdGUubmV4dFNlcXVlbmNlO1xuICAgIGlmICghdGhpcy5fY29udGV4dC5yZXZlcnNlKSB7XG4gICAgICAgIHRoaXMuX2NvbnRleHRTdGF0ZS5uZXh0U2VxdWVuY2UgPSB0aGlzLl9jb250ZXh0U3RhdGUubmV4dFNlcXVlbmNlLmdldE5leHQoKTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcmVuZGVyTm9kZTogcmVuZGVyTm9kZSxcbiAgICAgICAgdmlld1NlcXVlbmNlOiBuZXh0U2VxdWVuY2UsXG4gICAgICAgIG5leHQ6IHRydWUsXG4gICAgICAgIGluZGV4OiArK3RoaXMuX2NvbnRleHRTdGF0ZS5uZXh0R2V0SW5kZXhcbiAgICB9O1xufVxuZnVuY3Rpb24gX2NvbnRleHRQcmV2KCkge1xuICAgIGlmICghdGhpcy5fY29udGV4dFN0YXRlLnByZXZTZXF1ZW5jZSkge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBpZiAoIXRoaXMuX2NvbnRleHQucmV2ZXJzZSkge1xuICAgICAgICB0aGlzLl9jb250ZXh0U3RhdGUucHJldlNlcXVlbmNlID0gdGhpcy5fY29udGV4dFN0YXRlLnByZXZTZXF1ZW5jZS5nZXRQcmV2aW91cygpO1xuICAgICAgICBpZiAoIXRoaXMuX2NvbnRleHRTdGF0ZS5wcmV2U2VxdWVuY2UpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdmFyIHJlbmRlck5vZGUgPSB0aGlzLl9jb250ZXh0U3RhdGUucHJldlNlcXVlbmNlLmdldCgpO1xuICAgIGlmICghcmVuZGVyTm9kZSkge1xuICAgICAgICB0aGlzLl9jb250ZXh0U3RhdGUucHJldlNlcXVlbmNlID0gdW5kZWZpbmVkO1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICB2YXIgcHJldlNlcXVlbmNlID0gdGhpcy5fY29udGV4dFN0YXRlLnByZXZTZXF1ZW5jZTtcbiAgICBpZiAodGhpcy5fY29udGV4dC5yZXZlcnNlKSB7XG4gICAgICAgIHRoaXMuX2NvbnRleHRTdGF0ZS5wcmV2U2VxdWVuY2UgPSB0aGlzLl9jb250ZXh0U3RhdGUucHJldlNlcXVlbmNlLmdldFByZXZpb3VzKCk7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIHJlbmRlck5vZGU6IHJlbmRlck5vZGUsXG4gICAgICAgIHZpZXdTZXF1ZW5jZTogcHJldlNlcXVlbmNlLFxuICAgICAgICBwcmV2OiB0cnVlLFxuICAgICAgICBpbmRleDogLS10aGlzLl9jb250ZXh0U3RhdGUucHJldkdldEluZGV4XG4gICAgfTtcbn1cbmZ1bmN0aW9uIF9jb250ZXh0R2V0KGNvbnRleHROb2RlT3JJZCkge1xuICAgIGlmICh0aGlzLl9ub2Rlc0J5SWQgJiYgKGNvbnRleHROb2RlT3JJZCBpbnN0YW5jZW9mIFN0cmluZyB8fCB0eXBlb2YgY29udGV4dE5vZGVPcklkID09PSAnc3RyaW5nJykpIHtcbiAgICAgICAgdmFyIHJlbmRlck5vZGUgPSB0aGlzLl9ub2Rlc0J5SWRbY29udGV4dE5vZGVPcklkXTtcbiAgICAgICAgaWYgKCFyZW5kZXJOb2RlKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZW5kZXJOb2RlIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBqID0gcmVuZGVyTm9kZS5sZW5ndGg7IGkgPCBqOyBpKyspIHtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIHJlbmRlck5vZGU6IHJlbmRlck5vZGVbaV0sXG4gICAgICAgICAgICAgICAgICAgIGFycmF5RWxlbWVudDogdHJ1ZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmVuZGVyTm9kZTogcmVuZGVyTm9kZSxcbiAgICAgICAgICAgIGJ5SWQ6IHRydWVcbiAgICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gY29udGV4dE5vZGVPcklkO1xuICAgIH1cbn1cbmZ1bmN0aW9uIF9jb250ZXh0U2V0KGNvbnRleHROb2RlT3JJZCwgc2V0KSB7XG4gICAgdmFyIGNvbnRleHROb2RlID0gdGhpcy5fbm9kZXNCeUlkID8gX2NvbnRleHRHZXQuY2FsbCh0aGlzLCBjb250ZXh0Tm9kZU9ySWQpIDogY29udGV4dE5vZGVPcklkO1xuICAgIGlmIChjb250ZXh0Tm9kZSkge1xuICAgICAgICB2YXIgbm9kZSA9IGNvbnRleHROb2RlLm5vZGU7XG4gICAgICAgIGlmICghbm9kZSkge1xuICAgICAgICAgICAgaWYgKGNvbnRleHROb2RlLm5leHQpIHtcbiAgICAgICAgICAgICAgICBpZiAoY29udGV4dE5vZGUuaW5kZXggPCB0aGlzLl9jb250ZXh0U3RhdGUubmV4dFNldEluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgIExheW91dFV0aWxpdHkuZXJyb3IoJ05vZGVzIG11c3QgYmUgbGF5ZWQgb3V0IGluIHRoZSBzYW1lIG9yZGVyIGFzIHRoZXkgd2VyZSByZXF1ZXN0ZWQhJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuX2NvbnRleHRTdGF0ZS5uZXh0U2V0SW5kZXggPSBjb250ZXh0Tm9kZS5pbmRleDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY29udGV4dE5vZGUucHJldikge1xuICAgICAgICAgICAgICAgIGlmIChjb250ZXh0Tm9kZS5pbmRleCA+IHRoaXMuX2NvbnRleHRTdGF0ZS5wcmV2U2V0SW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgTGF5b3V0VXRpbGl0eS5lcnJvcignTm9kZXMgbXVzdCBiZSBsYXllZCBvdXQgaW4gdGhlIHNhbWUgb3JkZXIgYXMgdGhleSB3ZXJlIHJlcXVlc3RlZCEnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5fY29udGV4dFN0YXRlLnByZXZTZXRJbmRleCA9IGNvbnRleHROb2RlLmluZGV4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbm9kZSA9IF9jb250ZXh0R2V0Q3JlYXRlQW5kT3JkZXJOb2Rlcy5jYWxsKHRoaXMsIGNvbnRleHROb2RlLnJlbmRlck5vZGUsIGNvbnRleHROb2RlLnByZXYpO1xuICAgICAgICAgICAgbm9kZS5fdmlld1NlcXVlbmNlID0gY29udGV4dE5vZGUudmlld1NlcXVlbmNlO1xuICAgICAgICAgICAgbm9kZS5fbGF5b3V0Q291bnQrKztcbiAgICAgICAgICAgIGlmIChub2RlLl9sYXlvdXRDb3VudCA9PT0gMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NvbnRleHRTdGF0ZS5hZGRDb3VudCsrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29udGV4dE5vZGUubm9kZSA9IG5vZGU7XG4gICAgICAgIH1cbiAgICAgICAgbm9kZS51c2VzVHJ1ZVNpemUgPSBjb250ZXh0Tm9kZS51c2VzVHJ1ZVNpemU7XG4gICAgICAgIG5vZGUudHJ1ZVNpemVSZXF1ZXN0ZWQgPSBjb250ZXh0Tm9kZS50cnVlU2l6ZVJlcXVlc3RlZDtcbiAgICAgICAgbm9kZS5zZXQoc2V0LCB0aGlzLl9jb250ZXh0LnNpemUpO1xuICAgICAgICBjb250ZXh0Tm9kZS5zZXQgPSBzZXQ7XG4gICAgfVxuICAgIHJldHVybiBzZXQ7XG59XG5mdW5jdGlvbiBfY29udGV4dFJlc29sdmVTaXplKGNvbnRleHROb2RlT3JJZCwgcGFyZW50U2l6ZSkge1xuICAgIHZhciBjb250ZXh0Tm9kZSA9IHRoaXMuX25vZGVzQnlJZCA/IF9jb250ZXh0R2V0LmNhbGwodGhpcywgY29udGV4dE5vZGVPcklkKSA6IGNvbnRleHROb2RlT3JJZDtcbiAgICB2YXIgcmVzb2x2ZVNpemUgPSB0aGlzLl9wb29sLnJlc29sdmVTaXplO1xuICAgIGlmICghY29udGV4dE5vZGUpIHtcbiAgICAgICAgcmVzb2x2ZVNpemVbMF0gPSAwO1xuICAgICAgICByZXNvbHZlU2l6ZVsxXSA9IDA7XG4gICAgICAgIHJldHVybiByZXNvbHZlU2l6ZTtcbiAgICB9XG4gICAgdmFyIHJlbmRlck5vZGUgPSBjb250ZXh0Tm9kZS5yZW5kZXJOb2RlO1xuICAgIHZhciBzaXplID0gcmVuZGVyTm9kZS5nZXRTaXplKCk7XG4gICAgaWYgKCFzaXplKSB7XG4gICAgICAgIHJldHVybiBwYXJlbnRTaXplO1xuICAgIH1cbiAgICB2YXIgY29uZmlnU2l6ZSA9IHJlbmRlck5vZGUuc2l6ZSAmJiByZW5kZXJOb2RlLl90cnVlU2l6ZUNoZWNrICE9PSB1bmRlZmluZWQgPyByZW5kZXJOb2RlLnNpemUgOiB1bmRlZmluZWQ7XG4gICAgaWYgKGNvbmZpZ1NpemUgJiYgKGNvbmZpZ1NpemVbMF0gPT09IHRydWUgfHwgY29uZmlnU2l6ZVsxXSA9PT0gdHJ1ZSkpIHtcbiAgICAgICAgY29udGV4dE5vZGUudXNlc1RydWVTaXplID0gdHJ1ZTtcbiAgICAgICAgdmFyIGJhY2t1cFNpemUgPSByZW5kZXJOb2RlLl9iYWNrdXBTaXplO1xuICAgICAgICBpZiAocmVuZGVyTm9kZS5fdHJ1ZVNpemVDaGVjaykge1xuICAgICAgICAgICAgaWYgKGJhY2t1cFNpemUgJiYgY29uZmlnU2l6ZSAhPT0gc2l6ZSkge1xuICAgICAgICAgICAgICAgIHZhciBuZXdXaWR0aCA9IGNvbmZpZ1NpemVbMF0gPT09IHRydWUgPyBNYXRoLm1heChiYWNrdXBTaXplWzBdLCBzaXplWzBdKSA6IHNpemVbMF07XG4gICAgICAgICAgICAgICAgdmFyIG5ld0hlaWdodCA9IGNvbmZpZ1NpemVbMV0gPT09IHRydWUgPyBNYXRoLm1heChiYWNrdXBTaXplWzFdLCBzaXplWzFdKSA6IHNpemVbMV07XG4gICAgICAgICAgICAgICAgaWYgKG5ld1dpZHRoICE9PSBiYWNrdXBTaXplWzBdIHx8IG5ld0hlaWdodCAhPT0gYmFja3VwU2l6ZVsxXSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl90cnVlU2l6ZVJlcXVlc3RlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHROb2RlLnRydWVTaXplUmVxdWVzdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYmFja3VwU2l6ZVswXSA9IG5ld1dpZHRoO1xuICAgICAgICAgICAgICAgIGJhY2t1cFNpemVbMV0gPSBuZXdIZWlnaHQ7XG4gICAgICAgICAgICAgICAgc2l6ZSA9IGJhY2t1cFNpemU7XG4gICAgICAgICAgICAgICAgcmVuZGVyTm9kZS5fYmFja3VwU2l6ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICBiYWNrdXBTaXplID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl90cnVlU2l6ZVJlcXVlc3RlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgY29udGV4dE5vZGUudHJ1ZVNpemVSZXF1ZXN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9yZWV2YWxUcnVlU2l6ZSB8fCBiYWNrdXBTaXplICYmIChiYWNrdXBTaXplWzBdICE9PSBzaXplWzBdIHx8IGJhY2t1cFNpemVbMV0gIT09IHNpemVbMV0pKSB7XG4gICAgICAgICAgICByZW5kZXJOb2RlLl90cnVlU2l6ZUNoZWNrID0gdHJ1ZTtcbiAgICAgICAgICAgIHJlbmRlck5vZGUuX3NpemVEaXJ0eSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLl90cnVlU2l6ZVJlcXVlc3RlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFiYWNrdXBTaXplKSB7XG4gICAgICAgICAgICByZW5kZXJOb2RlLl9iYWNrdXBTaXplID0gW1xuICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgMFxuICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIGJhY2t1cFNpemUgPSByZW5kZXJOb2RlLl9iYWNrdXBTaXplO1xuICAgICAgICB9XG4gICAgICAgIGJhY2t1cFNpemVbMF0gPSBzaXplWzBdO1xuICAgICAgICBiYWNrdXBTaXplWzFdID0gc2l6ZVsxXTtcbiAgICB9XG4gICAgY29uZmlnU2l6ZSA9IHJlbmRlck5vZGUuX25vZGVzID8gcmVuZGVyTm9kZS5vcHRpb25zLnNpemUgOiB1bmRlZmluZWQ7XG4gICAgaWYgKGNvbmZpZ1NpemUgJiYgKGNvbmZpZ1NpemVbMF0gPT09IHRydWUgfHwgY29uZmlnU2l6ZVsxXSA9PT0gdHJ1ZSkpIHtcbiAgICAgICAgaWYgKHRoaXMuX3JlZXZhbFRydWVTaXplIHx8IHJlbmRlck5vZGUuX25vZGVzLl90cnVlU2l6ZVJlcXVlc3RlZCkge1xuICAgICAgICAgICAgY29udGV4dE5vZGUudXNlc1RydWVTaXplID0gdHJ1ZTtcbiAgICAgICAgICAgIGNvbnRleHROb2RlLnRydWVTaXplUmVxdWVzdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuX3RydWVTaXplUmVxdWVzdGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoc2l6ZVswXSA9PT0gdW5kZWZpbmVkIHx8IHNpemVbMF0gPT09IHRydWUgfHwgc2l6ZVsxXSA9PT0gdW5kZWZpbmVkIHx8IHNpemVbMV0gPT09IHRydWUpIHtcbiAgICAgICAgcmVzb2x2ZVNpemVbMF0gPSBzaXplWzBdO1xuICAgICAgICByZXNvbHZlU2l6ZVsxXSA9IHNpemVbMV07XG4gICAgICAgIHNpemUgPSByZXNvbHZlU2l6ZTtcbiAgICAgICAgaWYgKHNpemVbMF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgc2l6ZVswXSA9IHBhcmVudFNpemVbMF07XG4gICAgICAgIH0gZWxzZSBpZiAoc2l6ZVswXSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgc2l6ZVswXSA9IDA7XG4gICAgICAgICAgICB0aGlzLl90cnVlU2l6ZVJlcXVlc3RlZCA9IHRydWU7XG4gICAgICAgICAgICBjb250ZXh0Tm9kZS50cnVlU2l6ZVJlcXVlc3RlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNpemVbMV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgc2l6ZVsxXSA9IHBhcmVudFNpemVbMV07XG4gICAgICAgIH0gZWxzZSBpZiAoc2l6ZVsxXSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgc2l6ZVsxXSA9IDA7XG4gICAgICAgICAgICB0aGlzLl90cnVlU2l6ZVJlcXVlc3RlZCA9IHRydWU7XG4gICAgICAgICAgICBjb250ZXh0Tm9kZS50cnVlU2l6ZVJlcXVlc3RlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHNpemU7XG59XG5tb2R1bGUuZXhwb3J0cyA9IExheW91dE5vZGVNYW5hZ2VyOyIsInZhciBVdGlsaXR5ID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cuZmFtb3VzLnV0aWxpdGllcy5VdGlsaXR5IDogdHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcgPyBnbG9iYWwuZmFtb3VzLnV0aWxpdGllcy5VdGlsaXR5IDogbnVsbDtcbmZ1bmN0aW9uIExheW91dFV0aWxpdHkoKSB7XG59XG5MYXlvdXRVdGlsaXR5LnJlZ2lzdGVyZWRIZWxwZXJzID0ge307XG52YXIgQ2FwYWJpbGl0aWVzID0ge1xuICAgICAgICBTRVFVRU5DRTogMSxcbiAgICAgICAgRElSRUNUSU9OX1g6IDIsXG4gICAgICAgIERJUkVDVElPTl9ZOiA0LFxuICAgICAgICBTQ1JPTExJTkc6IDhcbiAgICB9O1xuTGF5b3V0VXRpbGl0eS5DYXBhYmlsaXRpZXMgPSBDYXBhYmlsaXRpZXM7XG5MYXlvdXRVdGlsaXR5Lm5vcm1hbGl6ZU1hcmdpbnMgPSBmdW5jdGlvbiAobWFyZ2lucykge1xuICAgIGlmICghbWFyZ2lucykge1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMFxuICAgICAgICBdO1xuICAgIH0gZWxzZSBpZiAoIUFycmF5LmlzQXJyYXkobWFyZ2lucykpIHtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIG1hcmdpbnMsXG4gICAgICAgICAgICBtYXJnaW5zLFxuICAgICAgICAgICAgbWFyZ2lucyxcbiAgICAgICAgICAgIG1hcmdpbnNcbiAgICAgICAgXTtcbiAgICB9IGVsc2UgaWYgKG1hcmdpbnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwXG4gICAgICAgIF07XG4gICAgfSBlbHNlIGlmIChtYXJnaW5zLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgbWFyZ2luc1swXSxcbiAgICAgICAgICAgIG1hcmdpbnNbMF0sXG4gICAgICAgICAgICBtYXJnaW5zWzBdLFxuICAgICAgICAgICAgbWFyZ2luc1swXVxuICAgICAgICBdO1xuICAgIH0gZWxzZSBpZiAobWFyZ2lucy5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIG1hcmdpbnNbMF0sXG4gICAgICAgICAgICBtYXJnaW5zWzFdLFxuICAgICAgICAgICAgbWFyZ2luc1swXSxcbiAgICAgICAgICAgIG1hcmdpbnNbMV1cbiAgICAgICAgXTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbWFyZ2lucztcbiAgICB9XG59O1xuTGF5b3V0VXRpbGl0eS5jbG9uZVNwZWMgPSBmdW5jdGlvbiAoc3BlYykge1xuICAgIHZhciBjbG9uZSA9IHt9O1xuICAgIGlmIChzcGVjLm9wYWNpdHkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjbG9uZS5vcGFjaXR5ID0gc3BlYy5vcGFjaXR5O1xuICAgIH1cbiAgICBpZiAoc3BlYy5zaXplICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY2xvbmUuc2l6ZSA9IHNwZWMuc2l6ZS5zbGljZSgwKTtcbiAgICB9XG4gICAgaWYgKHNwZWMudHJhbnNmb3JtICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY2xvbmUudHJhbnNmb3JtID0gc3BlYy50cmFuc2Zvcm0uc2xpY2UoMCk7XG4gICAgfVxuICAgIGlmIChzcGVjLm9yaWdpbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNsb25lLm9yaWdpbiA9IHNwZWMub3JpZ2luLnNsaWNlKDApO1xuICAgIH1cbiAgICBpZiAoc3BlYy5hbGlnbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNsb25lLmFsaWduID0gc3BlYy5hbGlnbi5zbGljZSgwKTtcbiAgICB9XG4gICAgcmV0dXJuIGNsb25lO1xufTtcbmZ1bmN0aW9uIF9pc0VxdWFsQXJyYXkoYSwgYikge1xuICAgIGlmIChhID09PSBiKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBpZiAoYSA9PT0gdW5kZWZpbmVkIHx8IGIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHZhciBpID0gYS5sZW5ndGg7XG4gICAgaWYgKGkgIT09IGIubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgICBpZiAoYVtpXSAhPT0gYltpXSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xufVxuTGF5b3V0VXRpbGl0eS5pc0VxdWFsU3BlYyA9IGZ1bmN0aW9uIChzcGVjMSwgc3BlYzIpIHtcbiAgICBpZiAoc3BlYzEub3BhY2l0eSAhPT0gc3BlYzIub3BhY2l0eSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmICghX2lzRXF1YWxBcnJheShzcGVjMS5zaXplLCBzcGVjMi5zaXplKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmICghX2lzRXF1YWxBcnJheShzcGVjMS50cmFuc2Zvcm0sIHNwZWMyLnRyYW5zZm9ybSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoIV9pc0VxdWFsQXJyYXkoc3BlYzEub3JpZ2luLCBzcGVjMi5vcmlnaW4pKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKCFfaXNFcXVhbEFycmF5KHNwZWMxLmFsaWduLCBzcGVjMi5hbGlnbikpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn07XG5MYXlvdXRVdGlsaXR5LmdldFNwZWNEaWZmVGV4dCA9IGZ1bmN0aW9uIChzcGVjMSwgc3BlYzIpIHtcbiAgICB2YXIgcmVzdWx0ID0gJ3NwZWMgZGlmZjonO1xuICAgIGlmIChzcGVjMS5vcGFjaXR5ICE9PSBzcGVjMi5vcGFjaXR5KSB7XG4gICAgICAgIHJlc3VsdCArPSAnXFxub3BhY2l0eTogJyArIHNwZWMxLm9wYWNpdHkgKyAnICE9ICcgKyBzcGVjMi5vcGFjaXR5O1xuICAgIH1cbiAgICBpZiAoIV9pc0VxdWFsQXJyYXkoc3BlYzEuc2l6ZSwgc3BlYzIuc2l6ZSkpIHtcbiAgICAgICAgcmVzdWx0ICs9ICdcXG5zaXplOiAnICsgSlNPTi5zdHJpbmdpZnkoc3BlYzEuc2l6ZSkgKyAnICE9ICcgKyBKU09OLnN0cmluZ2lmeShzcGVjMi5zaXplKTtcbiAgICB9XG4gICAgaWYgKCFfaXNFcXVhbEFycmF5KHNwZWMxLnRyYW5zZm9ybSwgc3BlYzIudHJhbnNmb3JtKSkge1xuICAgICAgICByZXN1bHQgKz0gJ1xcbnRyYW5zZm9ybTogJyArIEpTT04uc3RyaW5naWZ5KHNwZWMxLnRyYW5zZm9ybSkgKyAnICE9ICcgKyBKU09OLnN0cmluZ2lmeShzcGVjMi50cmFuc2Zvcm0pO1xuICAgIH1cbiAgICBpZiAoIV9pc0VxdWFsQXJyYXkoc3BlYzEub3JpZ2luLCBzcGVjMi5vcmlnaW4pKSB7XG4gICAgICAgIHJlc3VsdCArPSAnXFxub3JpZ2luOiAnICsgSlNPTi5zdHJpbmdpZnkoc3BlYzEub3JpZ2luKSArICcgIT0gJyArIEpTT04uc3RyaW5naWZ5KHNwZWMyLm9yaWdpbik7XG4gICAgfVxuICAgIGlmICghX2lzRXF1YWxBcnJheShzcGVjMS5hbGlnbiwgc3BlYzIuYWxpZ24pKSB7XG4gICAgICAgIHJlc3VsdCArPSAnXFxuYWxpZ246ICcgKyBKU09OLnN0cmluZ2lmeShzcGVjMS5hbGlnbikgKyAnICE9ICcgKyBKU09OLnN0cmluZ2lmeShzcGVjMi5hbGlnbik7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59O1xuTGF5b3V0VXRpbGl0eS5lcnJvciA9IGZ1bmN0aW9uIChtZXNzYWdlKSB7XG4gICAgY29uc29sZS5sb2coJ0VSUk9SOiAnICsgbWVzc2FnZSk7XG4gICAgdGhyb3cgbWVzc2FnZTtcbn07XG5MYXlvdXRVdGlsaXR5Lndhcm5pbmcgPSBmdW5jdGlvbiAobWVzc2FnZSkge1xuICAgIGNvbnNvbGUubG9nKCdXQVJOSU5HOiAnICsgbWVzc2FnZSk7XG59O1xuTGF5b3V0VXRpbGl0eS5sb2cgPSBmdW5jdGlvbiAoYXJncykge1xuICAgIHZhciBtZXNzYWdlID0gJyc7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGFyZyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgaWYgKGFyZyBpbnN0YW5jZW9mIE9iamVjdCB8fCBhcmcgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgbWVzc2FnZSArPSBKU09OLnN0cmluZ2lmeShhcmcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbWVzc2FnZSArPSBhcmc7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY29uc29sZS5sb2cobWVzc2FnZSk7XG59O1xuTGF5b3V0VXRpbGl0eS5jb21iaW5lT3B0aW9ucyA9IGZ1bmN0aW9uIChvcHRpb25zMSwgb3B0aW9uczIsIGZvcmNlQ2xvbmUpIHtcbiAgICBpZiAob3B0aW9uczEgJiYgIW9wdGlvbnMyICYmICFmb3JjZUNsb25lKSB7XG4gICAgICAgIHJldHVybiBvcHRpb25zMTtcbiAgICB9IGVsc2UgaWYgKCFvcHRpb25zMSAmJiBvcHRpb25zMiAmJiAhZm9yY2VDbG9uZSkge1xuICAgICAgICByZXR1cm4gb3B0aW9uczI7XG4gICAgfVxuICAgIHZhciBvcHRpb25zID0gVXRpbGl0eS5jbG9uZShvcHRpb25zMSB8fCB7fSk7XG4gICAgaWYgKG9wdGlvbnMyKSB7XG4gICAgICAgIGZvciAodmFyIGtleSBpbiBvcHRpb25zMikge1xuICAgICAgICAgICAgb3B0aW9uc1trZXldID0gb3B0aW9uczJba2V5XTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb3B0aW9ucztcbn07XG5MYXlvdXRVdGlsaXR5LnJlZ2lzdGVySGVscGVyID0gZnVuY3Rpb24gKG5hbWUsIEhlbHBlcikge1xuICAgIGlmICghSGVscGVyLnByb3RvdHlwZS5wYXJzZSkge1xuICAgICAgICBMYXlvdXRVdGlsaXR5LmVycm9yKCdUaGUgbGF5b3V0LWhlbHBlciBmb3IgbmFtZSBcIicgKyBuYW1lICsgJ1wiIGlzIHJlcXVpcmVkIHRvIHN1cHBvcnQgdGhlIFwicGFyc2VcIiBtZXRob2QnKTtcbiAgICB9XG4gICAgaWYgKHRoaXMucmVnaXN0ZXJlZEhlbHBlcnNbbmFtZV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBMYXlvdXRVdGlsaXR5Lndhcm5pbmcoJ0EgbGF5b3V0LWhlbHBlciB3aXRoIHRoZSBuYW1lIFwiJyArIG5hbWUgKyAnXCIgaXMgYWxyZWFkeSByZWdpc3RlcmVkIGFuZCB3aWxsIGJlIG92ZXJ3cml0dGVuJyk7XG4gICAgfVxuICAgIHRoaXMucmVnaXN0ZXJlZEhlbHBlcnNbbmFtZV0gPSBIZWxwZXI7XG59O1xuTGF5b3V0VXRpbGl0eS51bnJlZ2lzdGVySGVscGVyID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICBkZWxldGUgdGhpcy5yZWdpc3RlcmVkSGVscGVyc1tuYW1lXTtcbn07XG5MYXlvdXRVdGlsaXR5LmdldFJlZ2lzdGVyZWRIZWxwZXIgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHJldHVybiB0aGlzLnJlZ2lzdGVyZWRIZWxwZXJzW25hbWVdO1xufTtcbm1vZHVsZS5leHBvcnRzID0gTGF5b3V0VXRpbGl0eTsiLCJ2YXIgTGF5b3V0VXRpbGl0eSA9IHJlcXVpcmUoJy4vTGF5b3V0VXRpbGl0eScpO1xudmFyIExheW91dENvbnRyb2xsZXIgPSByZXF1aXJlKCcuL0xheW91dENvbnRyb2xsZXInKTtcbnZhciBMYXlvdXROb2RlID0gcmVxdWlyZSgnLi9MYXlvdXROb2RlJyk7XG52YXIgRmxvd0xheW91dE5vZGUgPSByZXF1aXJlKCcuL0Zsb3dMYXlvdXROb2RlJyk7XG52YXIgTGF5b3V0Tm9kZU1hbmFnZXIgPSByZXF1aXJlKCcuL0xheW91dE5vZGVNYW5hZ2VyJyk7XG52YXIgQ29udGFpbmVyU3VyZmFjZSA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gd2luZG93LmZhbW91cy5zdXJmYWNlcy5Db250YWluZXJTdXJmYWNlIDogdHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcgPyBnbG9iYWwuZmFtb3VzLnN1cmZhY2VzLkNvbnRhaW5lclN1cmZhY2UgOiBudWxsO1xudmFyIFRyYW5zZm9ybSA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gd2luZG93LmZhbW91cy5jb3JlLlRyYW5zZm9ybSA6IHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnID8gZ2xvYmFsLmZhbW91cy5jb3JlLlRyYW5zZm9ybSA6IG51bGw7XG52YXIgRXZlbnRIYW5kbGVyID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cuZmFtb3VzLmNvcmUuRXZlbnRIYW5kbGVyIDogdHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcgPyBnbG9iYWwuZmFtb3VzLmNvcmUuRXZlbnRIYW5kbGVyIDogbnVsbDtcbnZhciBHcm91cCA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gd2luZG93LmZhbW91cy5jb3JlLkdyb3VwIDogdHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcgPyBnbG9iYWwuZmFtb3VzLmNvcmUuR3JvdXAgOiBudWxsO1xudmFyIFZlY3RvciA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gd2luZG93LmZhbW91cy5tYXRoLlZlY3RvciA6IHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnID8gZ2xvYmFsLmZhbW91cy5tYXRoLlZlY3RvciA6IG51bGw7XG52YXIgUGh5c2ljc0VuZ2luZSA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gd2luZG93LmZhbW91cy5waHlzaWNzLlBoeXNpY3NFbmdpbmUgOiB0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJyA/IGdsb2JhbC5mYW1vdXMucGh5c2ljcy5QaHlzaWNzRW5naW5lIDogbnVsbDtcbnZhciBQYXJ0aWNsZSA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gd2luZG93LmZhbW91cy5waHlzaWNzLmJvZGllcy5QYXJ0aWNsZSA6IHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnID8gZ2xvYmFsLmZhbW91cy5waHlzaWNzLmJvZGllcy5QYXJ0aWNsZSA6IG51bGw7XG52YXIgRHJhZyA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gd2luZG93LmZhbW91cy5waHlzaWNzLmZvcmNlcy5EcmFnIDogdHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcgPyBnbG9iYWwuZmFtb3VzLnBoeXNpY3MuZm9yY2VzLkRyYWcgOiBudWxsO1xudmFyIFNwcmluZyA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gd2luZG93LmZhbW91cy5waHlzaWNzLmZvcmNlcy5TcHJpbmcgOiB0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJyA/IGdsb2JhbC5mYW1vdXMucGh5c2ljcy5mb3JjZXMuU3ByaW5nIDogbnVsbDtcbnZhciBTY3JvbGxTeW5jID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cuZmFtb3VzLmlucHV0cy5TY3JvbGxTeW5jIDogdHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcgPyBnbG9iYWwuZmFtb3VzLmlucHV0cy5TY3JvbGxTeW5jIDogbnVsbDtcbnZhciBWaWV3U2VxdWVuY2UgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IHdpbmRvdy5mYW1vdXMuY29yZS5WaWV3U2VxdWVuY2UgOiB0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJyA/IGdsb2JhbC5mYW1vdXMuY29yZS5WaWV3U2VxdWVuY2UgOiBudWxsO1xudmFyIEJvdW5kcyA9IHtcbiAgICAgICAgTk9ORTogMCxcbiAgICAgICAgUFJFVjogMSxcbiAgICAgICAgTkVYVDogMixcbiAgICAgICAgQk9USDogM1xuICAgIH07XG52YXIgU3ByaW5nU291cmNlID0ge1xuICAgICAgICBOT05FOiAnbm9uZScsXG4gICAgICAgIE5FWFRCT1VORFM6ICduZXh0LWJvdW5kcycsXG4gICAgICAgIFBSRVZCT1VORFM6ICdwcmV2LWJvdW5kcycsXG4gICAgICAgIE1JTlNJWkU6ICdtaW5pbWFsLXNpemUnLFxuICAgICAgICBHT1RPU0VRVUVOQ0U6ICdnb3RvLXNlcXVlbmNlJyxcbiAgICAgICAgRU5TVVJFVklTSUJMRTogJ2Vuc3VyZS12aXNpYmxlJyxcbiAgICAgICAgR09UT1BSRVZESVJFQ1RJT046ICdnb3RvLXByZXYtZGlyZWN0aW9uJyxcbiAgICAgICAgR09UT05FWFRESVJFQ1RJT046ICdnb3RvLW5leHQtZGlyZWN0aW9uJ1xuICAgIH07XG52YXIgUGFnaW5hdGlvbk1vZGUgPSB7XG4gICAgICAgIFBBR0U6IDAsXG4gICAgICAgIFNDUk9MTDogMVxuICAgIH07XG5mdW5jdGlvbiBTY3JvbGxDb250cm9sbGVyKG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gTGF5b3V0VXRpbGl0eS5jb21iaW5lT3B0aW9ucyhTY3JvbGxDb250cm9sbGVyLkRFRkFVTFRfT1BUSU9OUywgb3B0aW9ucyk7XG4gICAgdmFyIGxheW91dE1hbmFnZXIgPSBuZXcgTGF5b3V0Tm9kZU1hbmFnZXIob3B0aW9ucy5mbG93ID8gRmxvd0xheW91dE5vZGUgOiBMYXlvdXROb2RlLCBfaW5pdExheW91dE5vZGUuYmluZCh0aGlzKSk7XG4gICAgTGF5b3V0Q29udHJvbGxlci5jYWxsKHRoaXMsIG9wdGlvbnMsIGxheW91dE1hbmFnZXIpO1xuICAgIHRoaXMuX3Njcm9sbCA9IHtcbiAgICAgICAgYWN0aXZlVG91Y2hlczogW10sXG4gICAgICAgIHBlOiBuZXcgUGh5c2ljc0VuZ2luZSgpLFxuICAgICAgICBwYXJ0aWNsZTogbmV3IFBhcnRpY2xlKHRoaXMub3B0aW9ucy5zY3JvbGxQYXJ0aWNsZSksXG4gICAgICAgIGRyYWdGb3JjZTogbmV3IERyYWcodGhpcy5vcHRpb25zLnNjcm9sbERyYWcpLFxuICAgICAgICBmcmljdGlvbkZvcmNlOiBuZXcgRHJhZyh0aGlzLm9wdGlvbnMuc2Nyb2xsRnJpY3Rpb24pLFxuICAgICAgICBzcHJpbmdWYWx1ZTogdW5kZWZpbmVkLFxuICAgICAgICBzcHJpbmdGb3JjZTogbmV3IFNwcmluZyh0aGlzLm9wdGlvbnMuc2Nyb2xsU3ByaW5nKSxcbiAgICAgICAgc3ByaW5nRW5kU3RhdGU6IG5ldyBWZWN0b3IoW1xuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwXG4gICAgICAgIF0pLFxuICAgICAgICBncm91cFN0YXJ0OiAwLFxuICAgICAgICBncm91cFRyYW5zbGF0ZTogW1xuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwXG4gICAgICAgIF0sXG4gICAgICAgIHNjcm9sbERlbHRhOiAwLFxuICAgICAgICBub3JtYWxpemVkU2Nyb2xsRGVsdGE6IDAsXG4gICAgICAgIHNjcm9sbEZvcmNlOiAwLFxuICAgICAgICBzY3JvbGxGb3JjZUNvdW50OiAwLFxuICAgICAgICB1bm5vcm1hbGl6ZWRTY3JvbGxPZmZzZXQ6IDAsXG4gICAgICAgIGlzU2Nyb2xsaW5nOiBmYWxzZVxuICAgIH07XG4gICAgdGhpcy5fZGVidWcgPSB7XG4gICAgICAgIGxheW91dENvdW50OiAwLFxuICAgICAgICBjb21taXRDb3VudDogMFxuICAgIH07XG4gICAgdGhpcy5ncm91cCA9IG5ldyBHcm91cCgpO1xuICAgIHRoaXMuZ3JvdXAuYWRkKHsgcmVuZGVyOiBfaW5uZXJSZW5kZXIuYmluZCh0aGlzKSB9KTtcbiAgICB0aGlzLl9zY3JvbGwucGUuYWRkQm9keSh0aGlzLl9zY3JvbGwucGFydGljbGUpO1xuICAgIGlmICghdGhpcy5vcHRpb25zLnNjcm9sbERyYWcuZGlzYWJsZWQpIHtcbiAgICAgICAgdGhpcy5fc2Nyb2xsLmRyYWdGb3JjZUlkID0gdGhpcy5fc2Nyb2xsLnBlLmF0dGFjaCh0aGlzLl9zY3JvbGwuZHJhZ0ZvcmNlLCB0aGlzLl9zY3JvbGwucGFydGljbGUpO1xuICAgIH1cbiAgICBpZiAoIXRoaXMub3B0aW9ucy5zY3JvbGxGcmljdGlvbi5kaXNhYmxlZCkge1xuICAgICAgICB0aGlzLl9zY3JvbGwuZnJpY3Rpb25Gb3JjZUlkID0gdGhpcy5fc2Nyb2xsLnBlLmF0dGFjaCh0aGlzLl9zY3JvbGwuZnJpY3Rpb25Gb3JjZSwgdGhpcy5fc2Nyb2xsLnBhcnRpY2xlKTtcbiAgICB9XG4gICAgdGhpcy5fc2Nyb2xsLnNwcmluZ0ZvcmNlLnNldE9wdGlvbnMoeyBhbmNob3I6IHRoaXMuX3Njcm9sbC5zcHJpbmdFbmRTdGF0ZSB9KTtcbiAgICB0aGlzLl9ldmVudElucHV0Lm9uKCd0b3VjaHN0YXJ0JywgX3RvdWNoU3RhcnQuYmluZCh0aGlzKSk7XG4gICAgdGhpcy5fZXZlbnRJbnB1dC5vbigndG91Y2htb3ZlJywgX3RvdWNoTW92ZS5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLl9ldmVudElucHV0Lm9uKCd0b3VjaGVuZCcsIF90b3VjaEVuZC5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLl9ldmVudElucHV0Lm9uKCd0b3VjaGNhbmNlbCcsIF90b3VjaEVuZC5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLl9ldmVudElucHV0Lm9uKCdtb3VzZWRvd24nLCBfbW91c2VEb3duLmJpbmQodGhpcykpO1xuICAgIHRoaXMuX2V2ZW50SW5wdXQub24oJ21vdXNldXAnLCBfbW91c2VVcC5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLl9ldmVudElucHV0Lm9uKCdtb3VzZW1vdmUnLCBfbW91c2VNb3ZlLmJpbmQodGhpcykpO1xuICAgIHRoaXMuX3Njcm9sbFN5bmMgPSBuZXcgU2Nyb2xsU3luYyh0aGlzLm9wdGlvbnMuc2Nyb2xsU3luYyk7XG4gICAgdGhpcy5fZXZlbnRJbnB1dC5waXBlKHRoaXMuX3Njcm9sbFN5bmMpO1xuICAgIHRoaXMuX3Njcm9sbFN5bmMub24oJ3VwZGF0ZScsIF9zY3JvbGxVcGRhdGUuYmluZCh0aGlzKSk7XG4gICAgaWYgKHRoaXMub3B0aW9ucy51c2VDb250YWluZXIpIHtcbiAgICAgICAgdGhpcy5jb250YWluZXIgPSBuZXcgQ29udGFpbmVyU3VyZmFjZSh0aGlzLm9wdGlvbnMuY29udGFpbmVyKTtcbiAgICAgICAgdGhpcy5jb250YWluZXIuYWRkKHtcbiAgICAgICAgICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmlkO1xuICAgICAgICAgICAgfS5iaW5kKHRoaXMpXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoIXRoaXMub3B0aW9ucy5hdXRvUGlwZUV2ZW50cykge1xuICAgICAgICAgICAgdGhpcy5zdWJzY3JpYmUodGhpcy5jb250YWluZXIpO1xuICAgICAgICAgICAgRXZlbnRIYW5kbGVyLnNldElucHV0SGFuZGxlcih0aGlzLmNvbnRhaW5lciwgdGhpcyk7XG4gICAgICAgICAgICBFdmVudEhhbmRsZXIuc2V0T3V0cHV0SGFuZGxlcih0aGlzLmNvbnRhaW5lciwgdGhpcyk7XG4gICAgICAgIH1cbiAgICB9XG59XG5TY3JvbGxDb250cm9sbGVyLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoTGF5b3V0Q29udHJvbGxlci5wcm90b3R5cGUpO1xuU2Nyb2xsQ29udHJvbGxlci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBTY3JvbGxDb250cm9sbGVyO1xuU2Nyb2xsQ29udHJvbGxlci5Cb3VuZHMgPSBCb3VuZHM7XG5TY3JvbGxDb250cm9sbGVyLlBhZ2luYXRpb25Nb2RlID0gUGFnaW5hdGlvbk1vZGU7XG5TY3JvbGxDb250cm9sbGVyLkRFRkFVTFRfT1BUSU9OUyA9IHtcbiAgICBmbG93OiBmYWxzZSxcbiAgICB1c2VDb250YWluZXI6IGZhbHNlLFxuICAgIGNvbnRhaW5lcjogeyBwcm9wZXJ0aWVzOiB7IG92ZXJmbG93OiAnaGlkZGVuJyB9IH0sXG4gICAgdmlzaWJsZUl0ZW1UaHJlc3Nob2xkOiAwLjUsXG4gICAgc2Nyb2xsUGFydGljbGU6IHt9LFxuICAgIHNjcm9sbERyYWc6IHtcbiAgICAgICAgZm9yY2VGdW5jdGlvbjogRHJhZy5GT1JDRV9GVU5DVElPTlMuUVVBRFJBVElDLFxuICAgICAgICBzdHJlbmd0aDogMC4wMDEsXG4gICAgICAgIGRpc2FibGVkOiB0cnVlXG4gICAgfSxcbiAgICBzY3JvbGxGcmljdGlvbjoge1xuICAgICAgICBmb3JjZUZ1bmN0aW9uOiBEcmFnLkZPUkNFX0ZVTkNUSU9OUy5MSU5FQVIsXG4gICAgICAgIHN0cmVuZ3RoOiAwLjAwMjUsXG4gICAgICAgIGRpc2FibGVkOiBmYWxzZVxuICAgIH0sXG4gICAgc2Nyb2xsU3ByaW5nOiB7XG4gICAgICAgIGRhbXBpbmdSYXRpbzogMSxcbiAgICAgICAgcGVyaW9kOiAzNTBcbiAgICB9LFxuICAgIHNjcm9sbFN5bmM6IHsgc2NhbGU6IDAuMiB9LFxuICAgIG92ZXJzY3JvbGw6IHRydWUsXG4gICAgcGFnaW5hdGVkOiBmYWxzZSxcbiAgICBwYWdpbmF0aW9uTW9kZTogUGFnaW5hdGlvbk1vZGUuUEFHRSxcbiAgICBwYWdpbmF0aW9uRW5lcmd5VGhyZXNzaG9sZDogMC4wMSxcbiAgICBhbGlnbm1lbnQ6IDAsXG4gICAgdG91Y2hNb3ZlRGlyZWN0aW9uVGhyZXNzaG9sZDogdW5kZWZpbmVkLFxuICAgIHRvdWNoTW92ZU5vVmVsb2NpdHlEdXJhdGlvbjogMTAwLFxuICAgIG1vdXNlTW92ZTogZmFsc2UsXG4gICAgZW5hYmxlZDogdHJ1ZSxcbiAgICBsYXlvdXRBbGw6IGZhbHNlLFxuICAgIGFsd2F5c0xheW91dDogZmFsc2UsXG4gICAgZXh0cmFCb3VuZHNTcGFjZTogW1xuICAgICAgICAxMDAsXG4gICAgICAgIDEwMFxuICAgIF0sXG4gICAgZGVidWc6IGZhbHNlXG59O1xuU2Nyb2xsQ29udHJvbGxlci5wcm90b3R5cGUuc2V0T3B0aW9ucyA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgTGF5b3V0Q29udHJvbGxlci5wcm90b3R5cGUuc2V0T3B0aW9ucy5jYWxsKHRoaXMsIG9wdGlvbnMpO1xuICAgIGlmICh0aGlzLl9zY3JvbGwpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMuc2Nyb2xsU3ByaW5nKSB7XG4gICAgICAgICAgICB0aGlzLl9zY3JvbGwuc3ByaW5nRm9yY2Uuc2V0T3B0aW9ucyhvcHRpb25zLnNjcm9sbFNwcmluZyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdGlvbnMuc2Nyb2xsRHJhZykge1xuICAgICAgICAgICAgdGhpcy5fc2Nyb2xsLmRyYWdGb3JjZS5zZXRPcHRpb25zKG9wdGlvbnMuc2Nyb2xsRHJhZyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKG9wdGlvbnMuc2Nyb2xsU3luYyAmJiB0aGlzLl9zY3JvbGxTeW5jKSB7XG4gICAgICAgIHRoaXMuX3Njcm9sbFN5bmMuc2V0T3B0aW9ucyhvcHRpb25zLnNjcm9sbFN5bmMpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbn07XG5mdW5jdGlvbiBfaW5pdExheW91dE5vZGUobm9kZSwgc3BlYykge1xuICAgIGlmICghc3BlYyAmJiB0aGlzLm9wdGlvbnMuaW5zZXJ0U3BlYykge1xuICAgICAgICBub2RlLnNldFNwZWModGhpcy5vcHRpb25zLmluc2VydFNwZWMpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIF91cGRhdGVTcHJpbmcoKSB7XG4gICAgdmFyIHNwcmluZ1ZhbHVlID0gdGhpcy5fc2Nyb2xsLnNjcm9sbEZvcmNlQ291bnQgPyB1bmRlZmluZWQgOiB0aGlzLl9zY3JvbGwuc3ByaW5nUG9zaXRpb247XG4gICAgaWYgKHRoaXMuX3Njcm9sbC5zcHJpbmdWYWx1ZSAhPT0gc3ByaW5nVmFsdWUpIHtcbiAgICAgICAgdGhpcy5fc2Nyb2xsLnNwcmluZ1ZhbHVlID0gc3ByaW5nVmFsdWU7XG4gICAgICAgIGlmIChzcHJpbmdWYWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fc2Nyb2xsLnNwcmluZ0ZvcmNlSWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3Njcm9sbC5wZS5kZXRhY2godGhpcy5fc2Nyb2xsLnNwcmluZ0ZvcmNlSWQpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3Njcm9sbC5zcHJpbmdGb3JjZUlkID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMuX3Njcm9sbC5zcHJpbmdGb3JjZUlkID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zY3JvbGwuc3ByaW5nRm9yY2VJZCA9IHRoaXMuX3Njcm9sbC5wZS5hdHRhY2godGhpcy5fc2Nyb2xsLnNwcmluZ0ZvcmNlLCB0aGlzLl9zY3JvbGwucGFydGljbGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fc2Nyb2xsLnNwcmluZ0VuZFN0YXRlLnNldDFEKHNwcmluZ1ZhbHVlKTtcbiAgICAgICAgICAgIHRoaXMuX3Njcm9sbC5wZS53YWtlKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5mdW5jdGlvbiBfbW91c2VEb3duKGV2ZW50KSB7XG4gICAgaWYgKCF0aGlzLm9wdGlvbnMubW91c2VNb3ZlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMuX3Njcm9sbC5tb3VzZU1vdmUpIHtcbiAgICAgICAgdGhpcy5yZWxlYXNlU2Nyb2xsRm9yY2UodGhpcy5fc2Nyb2xsLm1vdXNlTW92ZS5kZWx0YSk7XG4gICAgfVxuICAgIHZhciBjdXJyZW50ID0gW1xuICAgICAgICAgICAgZXZlbnQuY2xpZW50WCxcbiAgICAgICAgICAgIGV2ZW50LmNsaWVudFlcbiAgICAgICAgXTtcbiAgICB2YXIgdGltZSA9IERhdGUubm93KCk7XG4gICAgdGhpcy5fc2Nyb2xsLm1vdXNlTW92ZSA9IHtcbiAgICAgICAgZGVsdGE6IDAsXG4gICAgICAgIHN0YXJ0OiBjdXJyZW50LFxuICAgICAgICBjdXJyZW50OiBjdXJyZW50LFxuICAgICAgICBwcmV2OiBjdXJyZW50LFxuICAgICAgICB0aW1lOiB0aW1lLFxuICAgICAgICBwcmV2VGltZTogdGltZVxuICAgIH07XG4gICAgdGhpcy5hcHBseVNjcm9sbEZvcmNlKHRoaXMuX3Njcm9sbC5tb3VzZU1vdmUuZGVsdGEpO1xufVxuZnVuY3Rpb24gX21vdXNlTW92ZShldmVudCkge1xuICAgIGlmICghdGhpcy5fc2Nyb2xsLm1vdXNlTW92ZSB8fCAhdGhpcy5vcHRpb25zLmVuYWJsZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgbW92ZURpcmVjdGlvbiA9IE1hdGguYXRhbjIoTWF0aC5hYnMoZXZlbnQuY2xpZW50WSAtIHRoaXMuX3Njcm9sbC5tb3VzZU1vdmUucHJldlsxXSksIE1hdGguYWJzKGV2ZW50LmNsaWVudFggLSB0aGlzLl9zY3JvbGwubW91c2VNb3ZlLnByZXZbMF0pKSAvIChNYXRoLlBJIC8gMik7XG4gICAgdmFyIGRpcmVjdGlvbkRpZmYgPSBNYXRoLmFicyh0aGlzLl9kaXJlY3Rpb24gLSBtb3ZlRGlyZWN0aW9uKTtcbiAgICBpZiAodGhpcy5vcHRpb25zLnRvdWNoTW92ZURpcmVjdGlvblRocmVzc2hvbGQgPT09IHVuZGVmaW5lZCB8fCBkaXJlY3Rpb25EaWZmIDw9IHRoaXMub3B0aW9ucy50b3VjaE1vdmVEaXJlY3Rpb25UaHJlc3Nob2xkKSB7XG4gICAgICAgIHRoaXMuX3Njcm9sbC5tb3VzZU1vdmUucHJldiA9IHRoaXMuX3Njcm9sbC5tb3VzZU1vdmUuY3VycmVudDtcbiAgICAgICAgdGhpcy5fc2Nyb2xsLm1vdXNlTW92ZS5jdXJyZW50ID0gW1xuICAgICAgICAgICAgZXZlbnQuY2xpZW50WCxcbiAgICAgICAgICAgIGV2ZW50LmNsaWVudFlcbiAgICAgICAgXTtcbiAgICAgICAgdGhpcy5fc2Nyb2xsLm1vdXNlTW92ZS5wcmV2VGltZSA9IHRoaXMuX3Njcm9sbC5tb3VzZU1vdmUudGltZTtcbiAgICAgICAgdGhpcy5fc2Nyb2xsLm1vdXNlTW92ZS5kaXJlY3Rpb24gPSBtb3ZlRGlyZWN0aW9uO1xuICAgICAgICB0aGlzLl9zY3JvbGwubW91c2VNb3ZlLnRpbWUgPSBEYXRlLm5vdygpO1xuICAgIH1cbiAgICB2YXIgZGVsdGEgPSB0aGlzLl9zY3JvbGwubW91c2VNb3ZlLmN1cnJlbnRbdGhpcy5fZGlyZWN0aW9uXSAtIHRoaXMuX3Njcm9sbC5tb3VzZU1vdmUuc3RhcnRbdGhpcy5fZGlyZWN0aW9uXTtcbiAgICB0aGlzLnVwZGF0ZVNjcm9sbEZvcmNlKHRoaXMuX3Njcm9sbC5tb3VzZU1vdmUuZGVsdGEsIGRlbHRhKTtcbiAgICB0aGlzLl9zY3JvbGwubW91c2VNb3ZlLmRlbHRhID0gZGVsdGE7XG59XG5mdW5jdGlvbiBfbW91c2VVcChldmVudCkge1xuICAgIGlmICghdGhpcy5fc2Nyb2xsLm1vdXNlTW92ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB2ZWxvY2l0eSA9IDA7XG4gICAgdmFyIGRpZmZUaW1lID0gdGhpcy5fc2Nyb2xsLm1vdXNlTW92ZS50aW1lIC0gdGhpcy5fc2Nyb2xsLm1vdXNlTW92ZS5wcmV2VGltZTtcbiAgICBpZiAoZGlmZlRpbWUgPiAwICYmIERhdGUubm93KCkgLSB0aGlzLl9zY3JvbGwubW91c2VNb3ZlLnRpbWUgPD0gdGhpcy5vcHRpb25zLnRvdWNoTW92ZU5vVmVsb2NpdHlEdXJhdGlvbikge1xuICAgICAgICB2YXIgZGlmZk9mZnNldCA9IHRoaXMuX3Njcm9sbC5tb3VzZU1vdmUuY3VycmVudFt0aGlzLl9kaXJlY3Rpb25dIC0gdGhpcy5fc2Nyb2xsLm1vdXNlTW92ZS5wcmV2W3RoaXMuX2RpcmVjdGlvbl07XG4gICAgICAgIHZlbG9jaXR5ID0gZGlmZk9mZnNldCAvIGRpZmZUaW1lO1xuICAgIH1cbiAgICB0aGlzLnJlbGVhc2VTY3JvbGxGb3JjZSh0aGlzLl9zY3JvbGwubW91c2VNb3ZlLmRlbHRhLCB2ZWxvY2l0eSk7XG4gICAgdGhpcy5fc2Nyb2xsLm1vdXNlTW92ZSA9IHVuZGVmaW5lZDtcbn1cbmZ1bmN0aW9uIF90b3VjaFN0YXJ0KGV2ZW50KSB7XG4gICAgaWYgKCF0aGlzLl90b3VjaEVuZEV2ZW50TGlzdGVuZXIpIHtcbiAgICAgICAgdGhpcy5fdG91Y2hFbmRFdmVudExpc3RlbmVyID0gZnVuY3Rpb24gKGV2ZW50Mikge1xuICAgICAgICAgICAgZXZlbnQyLnRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMuX3RvdWNoRW5kRXZlbnRMaXN0ZW5lcik7XG4gICAgICAgICAgICBfdG91Y2hFbmQuY2FsbCh0aGlzLCBldmVudDIpO1xuICAgICAgICB9LmJpbmQodGhpcyk7XG4gICAgfVxuICAgIHZhciBvbGRUb3VjaGVzQ291bnQgPSB0aGlzLl9zY3JvbGwuYWN0aXZlVG91Y2hlcy5sZW5ndGg7XG4gICAgdmFyIGkgPSAwO1xuICAgIHZhciBqO1xuICAgIHZhciB0b3VjaEZvdW5kO1xuICAgIHdoaWxlIChpIDwgdGhpcy5fc2Nyb2xsLmFjdGl2ZVRvdWNoZXMubGVuZ3RoKSB7XG4gICAgICAgIHZhciBhY3RpdmVUb3VjaCA9IHRoaXMuX3Njcm9sbC5hY3RpdmVUb3VjaGVzW2ldO1xuICAgICAgICB0b3VjaEZvdW5kID0gZmFsc2U7XG4gICAgICAgIGZvciAoaiA9IDA7IGogPCBldmVudC50b3VjaGVzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICB2YXIgdG91Y2ggPSBldmVudC50b3VjaGVzW2pdO1xuICAgICAgICAgICAgaWYgKHRvdWNoLmlkZW50aWZpZXIgPT09IGFjdGl2ZVRvdWNoLmlkKSB7XG4gICAgICAgICAgICAgICAgdG91Y2hGb3VuZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0b3VjaEZvdW5kKSB7XG4gICAgICAgICAgICB0aGlzLl9zY3JvbGwuYWN0aXZlVG91Y2hlcy5zcGxpY2UoaSwgMSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpKys7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZm9yIChpID0gMDsgaSA8IGV2ZW50LnRvdWNoZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGNoYW5nZWRUb3VjaCA9IGV2ZW50LnRvdWNoZXNbaV07XG4gICAgICAgIHRvdWNoRm91bmQgPSBmYWxzZTtcbiAgICAgICAgZm9yIChqID0gMDsgaiA8IHRoaXMuX3Njcm9sbC5hY3RpdmVUb3VjaGVzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fc2Nyb2xsLmFjdGl2ZVRvdWNoZXNbal0uaWQgPT09IGNoYW5nZWRUb3VjaC5pZGVudGlmaWVyKSB7XG4gICAgICAgICAgICAgICAgdG91Y2hGb3VuZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0b3VjaEZvdW5kKSB7XG4gICAgICAgICAgICB2YXIgY3VycmVudCA9IFtcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlZFRvdWNoLmNsaWVudFgsXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZWRUb3VjaC5jbGllbnRZXG4gICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIHZhciB0aW1lID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgIHRoaXMuX3Njcm9sbC5hY3RpdmVUb3VjaGVzLnB1c2goe1xuICAgICAgICAgICAgICAgIGlkOiBjaGFuZ2VkVG91Y2guaWRlbnRpZmllcixcbiAgICAgICAgICAgICAgICBzdGFydDogY3VycmVudCxcbiAgICAgICAgICAgICAgICBjdXJyZW50OiBjdXJyZW50LFxuICAgICAgICAgICAgICAgIHByZXY6IGN1cnJlbnQsXG4gICAgICAgICAgICAgICAgdGltZTogdGltZSxcbiAgICAgICAgICAgICAgICBwcmV2VGltZTogdGltZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjaGFuZ2VkVG91Y2gudGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy5fdG91Y2hFbmRFdmVudExpc3RlbmVyKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoIW9sZFRvdWNoZXNDb3VudCAmJiB0aGlzLl9zY3JvbGwuYWN0aXZlVG91Y2hlcy5sZW5ndGgpIHtcbiAgICAgICAgdGhpcy5hcHBseVNjcm9sbEZvcmNlKDApO1xuICAgICAgICB0aGlzLl9zY3JvbGwudG91Y2hEZWx0YSA9IDA7XG4gICAgfVxufVxuZnVuY3Rpb24gX3RvdWNoTW92ZShldmVudCkge1xuICAgIGlmICghdGhpcy5vcHRpb25zLmVuYWJsZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgcHJpbWFyeVRvdWNoO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZXZlbnQuY2hhbmdlZFRvdWNoZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGNoYW5nZWRUb3VjaCA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzW2ldO1xuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHRoaXMuX3Njcm9sbC5hY3RpdmVUb3VjaGVzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICB2YXIgdG91Y2ggPSB0aGlzLl9zY3JvbGwuYWN0aXZlVG91Y2hlc1tqXTtcbiAgICAgICAgICAgIGlmICh0b3VjaC5pZCA9PT0gY2hhbmdlZFRvdWNoLmlkZW50aWZpZXIpIHtcbiAgICAgICAgICAgICAgICB2YXIgbW92ZURpcmVjdGlvbiA9IE1hdGguYXRhbjIoTWF0aC5hYnMoY2hhbmdlZFRvdWNoLmNsaWVudFkgLSB0b3VjaC5wcmV2WzFdKSwgTWF0aC5hYnMoY2hhbmdlZFRvdWNoLmNsaWVudFggLSB0b3VjaC5wcmV2WzBdKSkgLyAoTWF0aC5QSSAvIDIpO1xuICAgICAgICAgICAgICAgIHZhciBkaXJlY3Rpb25EaWZmID0gTWF0aC5hYnModGhpcy5fZGlyZWN0aW9uIC0gbW92ZURpcmVjdGlvbik7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy50b3VjaE1vdmVEaXJlY3Rpb25UaHJlc3Nob2xkID09PSB1bmRlZmluZWQgfHwgZGlyZWN0aW9uRGlmZiA8PSB0aGlzLm9wdGlvbnMudG91Y2hNb3ZlRGlyZWN0aW9uVGhyZXNzaG9sZCkge1xuICAgICAgICAgICAgICAgICAgICB0b3VjaC5wcmV2ID0gdG91Y2guY3VycmVudDtcbiAgICAgICAgICAgICAgICAgICAgdG91Y2guY3VycmVudCA9IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZWRUb3VjaC5jbGllbnRYLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlZFRvdWNoLmNsaWVudFlcbiAgICAgICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgICAgICAgICAgdG91Y2gucHJldlRpbWUgPSB0b3VjaC50aW1lO1xuICAgICAgICAgICAgICAgICAgICB0b3VjaC5kaXJlY3Rpb24gPSBtb3ZlRGlyZWN0aW9uO1xuICAgICAgICAgICAgICAgICAgICB0b3VjaC50aW1lID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgICAgICAgICAgcHJpbWFyeVRvdWNoID0gaiA9PT0gMCA/IHRvdWNoIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAocHJpbWFyeVRvdWNoKSB7XG4gICAgICAgIHZhciBkZWx0YSA9IHByaW1hcnlUb3VjaC5jdXJyZW50W3RoaXMuX2RpcmVjdGlvbl0gLSBwcmltYXJ5VG91Y2guc3RhcnRbdGhpcy5fZGlyZWN0aW9uXTtcbiAgICAgICAgdGhpcy51cGRhdGVTY3JvbGxGb3JjZSh0aGlzLl9zY3JvbGwudG91Y2hEZWx0YSwgZGVsdGEpO1xuICAgICAgICB0aGlzLl9zY3JvbGwudG91Y2hEZWx0YSA9IGRlbHRhO1xuICAgIH1cbn1cbmZ1bmN0aW9uIF90b3VjaEVuZChldmVudCkge1xuICAgIHZhciBwcmltYXJ5VG91Y2ggPSB0aGlzLl9zY3JvbGwuYWN0aXZlVG91Y2hlcy5sZW5ndGggPyB0aGlzLl9zY3JvbGwuYWN0aXZlVG91Y2hlc1swXSA6IHVuZGVmaW5lZDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGV2ZW50LmNoYW5nZWRUb3VjaGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBjaGFuZ2VkVG91Y2ggPSBldmVudC5jaGFuZ2VkVG91Y2hlc1tpXTtcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB0aGlzLl9zY3JvbGwuYWN0aXZlVG91Y2hlcy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgdmFyIHRvdWNoID0gdGhpcy5fc2Nyb2xsLmFjdGl2ZVRvdWNoZXNbal07XG4gICAgICAgICAgICBpZiAodG91Y2guaWQgPT09IGNoYW5nZWRUb3VjaC5pZGVudGlmaWVyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2Nyb2xsLmFjdGl2ZVRvdWNoZXMuc3BsaWNlKGosIDEpO1xuICAgICAgICAgICAgICAgIGlmIChqID09PSAwICYmIHRoaXMuX3Njcm9sbC5hY3RpdmVUb3VjaGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbmV3UHJpbWFyeVRvdWNoID0gdGhpcy5fc2Nyb2xsLmFjdGl2ZVRvdWNoZXNbMF07XG4gICAgICAgICAgICAgICAgICAgIG5ld1ByaW1hcnlUb3VjaC5zdGFydFswXSA9IG5ld1ByaW1hcnlUb3VjaC5jdXJyZW50WzBdIC0gKHRvdWNoLmN1cnJlbnRbMF0gLSB0b3VjaC5zdGFydFswXSk7XG4gICAgICAgICAgICAgICAgICAgIG5ld1ByaW1hcnlUb3VjaC5zdGFydFsxXSA9IG5ld1ByaW1hcnlUb3VjaC5jdXJyZW50WzFdIC0gKHRvdWNoLmN1cnJlbnRbMV0gLSB0b3VjaC5zdGFydFsxXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGlmICghcHJpbWFyeVRvdWNoIHx8IHRoaXMuX3Njcm9sbC5hY3RpdmVUb3VjaGVzLmxlbmd0aCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB2ZWxvY2l0eSA9IDA7XG4gICAgdmFyIGRpZmZUaW1lID0gcHJpbWFyeVRvdWNoLnRpbWUgLSBwcmltYXJ5VG91Y2gucHJldlRpbWU7XG4gICAgaWYgKGRpZmZUaW1lID4gMCAmJiBEYXRlLm5vdygpIC0gcHJpbWFyeVRvdWNoLnRpbWUgPD0gdGhpcy5vcHRpb25zLnRvdWNoTW92ZU5vVmVsb2NpdHlEdXJhdGlvbikge1xuICAgICAgICB2YXIgZGlmZk9mZnNldCA9IHByaW1hcnlUb3VjaC5jdXJyZW50W3RoaXMuX2RpcmVjdGlvbl0gLSBwcmltYXJ5VG91Y2gucHJldlt0aGlzLl9kaXJlY3Rpb25dO1xuICAgICAgICB2ZWxvY2l0eSA9IGRpZmZPZmZzZXQgLyBkaWZmVGltZTtcbiAgICB9XG4gICAgdmFyIGRlbHRhID0gdGhpcy5fc2Nyb2xsLnRvdWNoRGVsdGE7XG4gICAgdGhpcy5yZWxlYXNlU2Nyb2xsRm9yY2UoZGVsdGEsIHZlbG9jaXR5KTtcbiAgICB0aGlzLl9zY3JvbGwudG91Y2hEZWx0YSA9IDA7XG59XG5mdW5jdGlvbiBfc2Nyb2xsVXBkYXRlKGV2ZW50KSB7XG4gICAgaWYgKCF0aGlzLm9wdGlvbnMuZW5hYmxlZCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBvZmZzZXQgPSBBcnJheS5pc0FycmF5KGV2ZW50LmRlbHRhKSA/IGV2ZW50LmRlbHRhW3RoaXMuX2RpcmVjdGlvbl0gOiBldmVudC5kZWx0YTtcbiAgICB0aGlzLnNjcm9sbChvZmZzZXQpO1xufVxuZnVuY3Rpb24gX3NldFBhcnRpY2xlKHBvc2l0aW9uLCB2ZWxvY2l0eSwgcGhhc2UpIHtcbiAgICBpZiAocG9zaXRpb24gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLl9zY3JvbGwucGFydGljbGVWYWx1ZSA9IHBvc2l0aW9uO1xuICAgICAgICB0aGlzLl9zY3JvbGwucGFydGljbGUuc2V0UG9zaXRpb24xRChwb3NpdGlvbik7XG4gICAgfVxuICAgIGlmICh2ZWxvY2l0eSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHZhciBvbGRWZWxvY2l0eSA9IHRoaXMuX3Njcm9sbC5wYXJ0aWNsZS5nZXRWZWxvY2l0eTFEKCk7XG4gICAgICAgIGlmIChvbGRWZWxvY2l0eSAhPT0gdmVsb2NpdHkpIHtcbiAgICAgICAgICAgIHRoaXMuX3Njcm9sbC5wYXJ0aWNsZS5zZXRWZWxvY2l0eTFEKHZlbG9jaXR5KTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmZ1bmN0aW9uIF9jYWxjU2Nyb2xsT2Zmc2V0KG5vcm1hbGl6ZSwgcmVmcmVzaFBhcnRpY2xlKSB7XG4gICAgaWYgKHJlZnJlc2hQYXJ0aWNsZSB8fCB0aGlzLl9zY3JvbGwucGFydGljbGVWYWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuX3Njcm9sbC5wYXJ0aWNsZVZhbHVlID0gdGhpcy5fc2Nyb2xsLnBhcnRpY2xlLmdldFBvc2l0aW9uMUQoKTtcbiAgICAgICAgdGhpcy5fc2Nyb2xsLnBhcnRpY2xlVmFsdWUgPSBNYXRoLnJvdW5kKHRoaXMuX3Njcm9sbC5wYXJ0aWNsZVZhbHVlICogMTAwMCkgLyAxMDAwO1xuICAgIH1cbiAgICB2YXIgc2Nyb2xsT2Zmc2V0ID0gdGhpcy5fc2Nyb2xsLnBhcnRpY2xlVmFsdWU7XG4gICAgaWYgKHRoaXMuX3Njcm9sbC5zY3JvbGxEZWx0YSB8fCB0aGlzLl9zY3JvbGwubm9ybWFsaXplZFNjcm9sbERlbHRhKSB7XG4gICAgICAgIHNjcm9sbE9mZnNldCArPSB0aGlzLl9zY3JvbGwuc2Nyb2xsRGVsdGEgKyB0aGlzLl9zY3JvbGwubm9ybWFsaXplZFNjcm9sbERlbHRhO1xuICAgICAgICBpZiAodGhpcy5fc2Nyb2xsLmJvdW5kc1JlYWNoZWQgJiBCb3VuZHMuUFJFViAmJiBzY3JvbGxPZmZzZXQgPiB0aGlzLl9zY3JvbGwuc3ByaW5nUG9zaXRpb24gfHwgdGhpcy5fc2Nyb2xsLmJvdW5kc1JlYWNoZWQgJiBCb3VuZHMuTkVYVCAmJiBzY3JvbGxPZmZzZXQgPCB0aGlzLl9zY3JvbGwuc3ByaW5nUG9zaXRpb24gfHwgdGhpcy5fc2Nyb2xsLmJvdW5kc1JlYWNoZWQgPT09IEJvdW5kcy5CT1RIKSB7XG4gICAgICAgICAgICBzY3JvbGxPZmZzZXQgPSB0aGlzLl9zY3JvbGwuc3ByaW5nUG9zaXRpb247XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5vcm1hbGl6ZSkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLl9zY3JvbGwuc2Nyb2xsRGVsdGEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zY3JvbGwubm9ybWFsaXplZFNjcm9sbERlbHRhID0gMDtcbiAgICAgICAgICAgICAgICBfc2V0UGFydGljbGUuY2FsbCh0aGlzLCBzY3JvbGxPZmZzZXQsIHVuZGVmaW5lZCwgJ19jYWxjU2Nyb2xsT2Zmc2V0Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9zY3JvbGwubm9ybWFsaXplZFNjcm9sbERlbHRhICs9IHRoaXMuX3Njcm9sbC5zY3JvbGxEZWx0YTtcbiAgICAgICAgICAgIHRoaXMuX3Njcm9sbC5zY3JvbGxEZWx0YSA9IDA7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRoaXMuX3Njcm9sbC5zY3JvbGxGb3JjZUNvdW50ICYmIHRoaXMuX3Njcm9sbC5zY3JvbGxGb3JjZSkge1xuICAgICAgICBpZiAodGhpcy5fc2Nyb2xsLnNwcmluZ1Bvc2l0aW9uICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHNjcm9sbE9mZnNldCA9IChzY3JvbGxPZmZzZXQgKyB0aGlzLl9zY3JvbGwuc2Nyb2xsRm9yY2UgKyB0aGlzLl9zY3JvbGwuc3ByaW5nUG9zaXRpb24pIC8gMjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNjcm9sbE9mZnNldCArPSB0aGlzLl9zY3JvbGwuc2Nyb2xsRm9yY2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKCF0aGlzLm9wdGlvbnMub3ZlcnNjcm9sbCkge1xuICAgICAgICBpZiAodGhpcy5fc2Nyb2xsLmJvdW5kc1JlYWNoZWQgPT09IEJvdW5kcy5CT1RIIHx8IHRoaXMuX3Njcm9sbC5ib3VuZHNSZWFjaGVkID09PSBCb3VuZHMuUFJFViAmJiBzY3JvbGxPZmZzZXQgPiB0aGlzLl9zY3JvbGwuc3ByaW5nUG9zaXRpb24gfHwgdGhpcy5fc2Nyb2xsLmJvdW5kc1JlYWNoZWQgPT09IEJvdW5kcy5ORVhUICYmIHNjcm9sbE9mZnNldCA8IHRoaXMuX3Njcm9sbC5zcHJpbmdQb3NpdGlvbikge1xuICAgICAgICAgICAgc2Nyb2xsT2Zmc2V0ID0gdGhpcy5fc2Nyb2xsLnNwcmluZ1Bvc2l0aW9uO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzY3JvbGxPZmZzZXQ7XG59XG5TY3JvbGxDb250cm9sbGVyLnByb3RvdHlwZS5fY2FsY1Njcm9sbEhlaWdodCA9IGZ1bmN0aW9uIChuZXh0LCBsYXN0Tm9kZU9ubHkpIHtcbiAgICB2YXIgY2FsY2VkSGVpZ2h0ID0gMDtcbiAgICB2YXIgbm9kZSA9IHRoaXMuX25vZGVzLmdldFN0YXJ0RW51bU5vZGUobmV4dCk7XG4gICAgd2hpbGUgKG5vZGUpIHtcbiAgICAgICAgaWYgKG5vZGUuX2ludmFsaWRhdGVkKSB7XG4gICAgICAgICAgICBpZiAobm9kZS50cnVlU2l6ZVJlcXVlc3RlZCkge1xuICAgICAgICAgICAgICAgIGNhbGNlZEhlaWdodCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChub2RlLnNjcm9sbExlbmd0aCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgY2FsY2VkSGVpZ2h0ID0gbGFzdE5vZGVPbmx5ID8gbm9kZS5zY3JvbGxMZW5ndGggOiBjYWxjZWRIZWlnaHQgKyBub2RlLnNjcm9sbExlbmd0aDtcbiAgICAgICAgICAgICAgICBpZiAoIW5leHQgJiYgbGFzdE5vZGVPbmx5KSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBub2RlID0gbmV4dCA/IG5vZGUuX25leHQgOiBub2RlLl9wcmV2O1xuICAgIH1cbiAgICByZXR1cm4gY2FsY2VkSGVpZ2h0O1xufTtcbmZ1bmN0aW9uIF9jYWxjQm91bmRzKHNpemUsIHNjcm9sbE9mZnNldCkge1xuICAgIHZhciBwcmV2SGVpZ2h0ID0gdGhpcy5fY2FsY1Njcm9sbEhlaWdodChmYWxzZSk7XG4gICAgdmFyIG5leHRIZWlnaHQgPSB0aGlzLl9jYWxjU2Nyb2xsSGVpZ2h0KHRydWUpO1xuICAgIHZhciBlbmZvcmVNaW5TaXplID0gdGhpcy5fbGF5b3V0LmNhcGFiaWxpdGllcyAmJiB0aGlzLl9sYXlvdXQuY2FwYWJpbGl0aWVzLnNlcXVlbnRpYWxTY3JvbGxpbmdPcHRpbWl6ZWQ7XG4gICAgaWYgKHByZXZIZWlnaHQgPT09IHVuZGVmaW5lZCB8fCBuZXh0SGVpZ2h0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5fc2Nyb2xsLmJvdW5kc1JlYWNoZWQgPSBCb3VuZHMuTk9ORTtcbiAgICAgICAgdGhpcy5fc2Nyb2xsLnNwcmluZ1Bvc2l0aW9uID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLl9zY3JvbGwuc3ByaW5nU291cmNlID0gU3ByaW5nU291cmNlLk5PTkU7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRvdGFsSGVpZ2h0O1xuICAgIGlmIChlbmZvcmVNaW5TaXplKSB7XG4gICAgICAgIGlmIChuZXh0SGVpZ2h0ICE9PSB1bmRlZmluZWQgJiYgcHJldkhlaWdodCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0b3RhbEhlaWdodCA9IHByZXZIZWlnaHQgKyBuZXh0SGVpZ2h0O1xuICAgICAgICB9XG4gICAgICAgIGlmICh0b3RhbEhlaWdodCAhPT0gdW5kZWZpbmVkICYmIHRvdGFsSGVpZ2h0IDw9IHNpemVbdGhpcy5fZGlyZWN0aW9uXSkge1xuICAgICAgICAgICAgdGhpcy5fc2Nyb2xsLmJvdW5kc1JlYWNoZWQgPSBCb3VuZHMuQk9USDtcbiAgICAgICAgICAgIHRoaXMuX3Njcm9sbC5zcHJpbmdQb3NpdGlvbiA9IHRoaXMub3B0aW9ucy5hbGlnbm1lbnQgPyAtbmV4dEhlaWdodCA6IHByZXZIZWlnaHQ7XG4gICAgICAgICAgICB0aGlzLl9zY3JvbGwuc3ByaW5nU291cmNlID0gU3ByaW5nU291cmNlLk1JTlNJWkU7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRoaXMub3B0aW9ucy5hbGlnbm1lbnQpIHtcbiAgICAgICAgaWYgKGVuZm9yZU1pblNpemUpIHtcbiAgICAgICAgICAgIGlmIChuZXh0SGVpZ2h0ICE9PSB1bmRlZmluZWQgJiYgc2Nyb2xsT2Zmc2V0ICsgbmV4dEhlaWdodCA8PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2Nyb2xsLmJvdW5kc1JlYWNoZWQgPSBCb3VuZHMuTkVYVDtcbiAgICAgICAgICAgICAgICB0aGlzLl9zY3JvbGwuc3ByaW5nUG9zaXRpb24gPSAtbmV4dEhlaWdodDtcbiAgICAgICAgICAgICAgICB0aGlzLl9zY3JvbGwuc3ByaW5nU291cmNlID0gU3ByaW5nU291cmNlLk5FWFRCT1VORFM7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIGZpcnN0UHJldkl0ZW1IZWlnaHQgPSB0aGlzLl9jYWxjU2Nyb2xsSGVpZ2h0KGZhbHNlLCB0cnVlKTtcbiAgICAgICAgICAgIGlmIChuZXh0SGVpZ2h0ICE9PSB1bmRlZmluZWQgJiYgZmlyc3RQcmV2SXRlbUhlaWdodCAmJiBzY3JvbGxPZmZzZXQgKyBuZXh0SGVpZ2h0ICsgc2l6ZVt0aGlzLl9kaXJlY3Rpb25dIDw9IGZpcnN0UHJldkl0ZW1IZWlnaHQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zY3JvbGwuYm91bmRzUmVhY2hlZCA9IEJvdW5kcy5ORVhUO1xuICAgICAgICAgICAgICAgIHRoaXMuX3Njcm9sbC5zcHJpbmdQb3NpdGlvbiA9IG5leHRIZWlnaHQgLSAoc2l6ZVt0aGlzLl9kaXJlY3Rpb25dIC0gZmlyc3RQcmV2SXRlbUhlaWdodCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2Nyb2xsLnNwcmluZ1NvdXJjZSA9IFNwcmluZ1NvdXJjZS5ORVhUQk9VTkRTO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChwcmV2SGVpZ2h0ICE9PSB1bmRlZmluZWQgJiYgc2Nyb2xsT2Zmc2V0IC0gcHJldkhlaWdodCA+PSAwKSB7XG4gICAgICAgICAgICB0aGlzLl9zY3JvbGwuYm91bmRzUmVhY2hlZCA9IEJvdW5kcy5QUkVWO1xuICAgICAgICAgICAgdGhpcy5fc2Nyb2xsLnNwcmluZ1Bvc2l0aW9uID0gcHJldkhlaWdodDtcbiAgICAgICAgICAgIHRoaXMuX3Njcm9sbC5zcHJpbmdTb3VyY2UgPSBTcHJpbmdTb3VyY2UuUFJFVkJPVU5EUztcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAodGhpcy5vcHRpb25zLmFsaWdubWVudCkge1xuICAgICAgICBpZiAocHJldkhlaWdodCAhPT0gdW5kZWZpbmVkICYmIHNjcm9sbE9mZnNldCAtIHByZXZIZWlnaHQgPj0gLXNpemVbdGhpcy5fZGlyZWN0aW9uXSkge1xuICAgICAgICAgICAgdGhpcy5fc2Nyb2xsLmJvdW5kc1JlYWNoZWQgPSBCb3VuZHMuUFJFVjtcbiAgICAgICAgICAgIHRoaXMuX3Njcm9sbC5zcHJpbmdQb3NpdGlvbiA9IC1zaXplW3RoaXMuX2RpcmVjdGlvbl0gKyBwcmV2SGVpZ2h0O1xuICAgICAgICAgICAgdGhpcy5fc2Nyb2xsLnNwcmluZ1NvdXJjZSA9IFNwcmluZ1NvdXJjZS5QUkVWQk9VTkRTO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIG5leHRCb3VuZHMgPSBlbmZvcmVNaW5TaXplID8gc2l6ZVt0aGlzLl9kaXJlY3Rpb25dIDogdGhpcy5fY2FsY1Njcm9sbEhlaWdodCh0cnVlLCB0cnVlKTtcbiAgICAgICAgaWYgKG5leHRIZWlnaHQgIT09IHVuZGVmaW5lZCAmJiBzY3JvbGxPZmZzZXQgKyBuZXh0SGVpZ2h0IDw9IG5leHRCb3VuZHMpIHtcbiAgICAgICAgICAgIHRoaXMuX3Njcm9sbC5ib3VuZHNSZWFjaGVkID0gQm91bmRzLk5FWFQ7XG4gICAgICAgICAgICB0aGlzLl9zY3JvbGwuc3ByaW5nUG9zaXRpb24gPSBuZXh0Qm91bmRzIC0gbmV4dEhlaWdodDtcbiAgICAgICAgICAgIHRoaXMuX3Njcm9sbC5zcHJpbmdTb3VyY2UgPSBTcHJpbmdTb3VyY2UuTkVYVEJPVU5EUztcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl9zY3JvbGwuYm91bmRzUmVhY2hlZCA9IEJvdW5kcy5OT05FO1xuICAgIHRoaXMuX3Njcm9sbC5zcHJpbmdQb3NpdGlvbiA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLl9zY3JvbGwuc3ByaW5nU291cmNlID0gU3ByaW5nU291cmNlLk5PTkU7XG59XG5mdW5jdGlvbiBfY2FsY1Njcm9sbFRvT2Zmc2V0KHNpemUsIHNjcm9sbE9mZnNldCkge1xuICAgIHZhciBzY3JvbGxUb1JlbmRlck5vZGUgPSB0aGlzLl9zY3JvbGwuc2Nyb2xsVG9SZW5kZXJOb2RlIHx8IHRoaXMuX3Njcm9sbC5lbnN1cmVWaXNpYmxlUmVuZGVyTm9kZTtcbiAgICBpZiAoIXNjcm9sbFRvUmVuZGVyTm9kZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLl9zY3JvbGwuYm91bmRzUmVhY2hlZCA9PT0gQm91bmRzLkJPVEggfHwgIXRoaXMuX3Njcm9sbC5zY3JvbGxUb0RpcmVjdGlvbiAmJiB0aGlzLl9zY3JvbGwuYm91bmRzUmVhY2hlZCA9PT0gQm91bmRzLlBSRVYgfHwgdGhpcy5fc2Nyb2xsLnNjcm9sbFRvRGlyZWN0aW9uICYmIHRoaXMuX3Njcm9sbC5ib3VuZHNSZWFjaGVkID09PSBCb3VuZHMuTkVYVCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBmb3VuZE5vZGU7XG4gICAgdmFyIHNjcm9sbFRvT2Zmc2V0ID0gMDtcbiAgICB2YXIgbm9kZSA9IHRoaXMuX25vZGVzLmdldFN0YXJ0RW51bU5vZGUodHJ1ZSk7XG4gICAgdmFyIGNvdW50ID0gMDtcbiAgICB3aGlsZSAobm9kZSkge1xuICAgICAgICBjb3VudCsrO1xuICAgICAgICBpZiAoIW5vZGUuX2ludmFsaWRhdGVkIHx8IG5vZGUuc2Nyb2xsTGVuZ3RoID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuYWxpZ25tZW50KSB7XG4gICAgICAgICAgICBzY3JvbGxUb09mZnNldCAtPSBub2RlLnNjcm9sbExlbmd0aDtcbiAgICAgICAgfVxuICAgICAgICBpZiAobm9kZS5yZW5kZXJOb2RlID09PSBzY3JvbGxUb1JlbmRlck5vZGUpIHtcbiAgICAgICAgICAgIGZvdW5kTm9kZSA9IG5vZGU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMub3B0aW9ucy5hbGlnbm1lbnQpIHtcbiAgICAgICAgICAgIHNjcm9sbFRvT2Zmc2V0IC09IG5vZGUuc2Nyb2xsTGVuZ3RoO1xuICAgICAgICB9XG4gICAgICAgIG5vZGUgPSBub2RlLl9uZXh0O1xuICAgIH1cbiAgICBpZiAoIWZvdW5kTm9kZSkge1xuICAgICAgICBzY3JvbGxUb09mZnNldCA9IDA7XG4gICAgICAgIG5vZGUgPSB0aGlzLl9ub2Rlcy5nZXRTdGFydEVudW1Ob2RlKGZhbHNlKTtcbiAgICAgICAgd2hpbGUgKG5vZGUpIHtcbiAgICAgICAgICAgIGlmICghbm9kZS5faW52YWxpZGF0ZWQgfHwgbm9kZS5zY3JvbGxMZW5ndGggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnMuYWxpZ25tZW50KSB7XG4gICAgICAgICAgICAgICAgc2Nyb2xsVG9PZmZzZXQgKz0gbm9kZS5zY3JvbGxMZW5ndGg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobm9kZS5yZW5kZXJOb2RlID09PSBzY3JvbGxUb1JlbmRlck5vZGUpIHtcbiAgICAgICAgICAgICAgICBmb3VuZE5vZGUgPSBub2RlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5hbGlnbm1lbnQpIHtcbiAgICAgICAgICAgICAgICBzY3JvbGxUb09mZnNldCArPSBub2RlLnNjcm9sbExlbmd0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5vZGUgPSBub2RlLl9wcmV2O1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChmb3VuZE5vZGUpIHtcbiAgICAgICAgaWYgKHRoaXMuX3Njcm9sbC5lbnN1cmVWaXNpYmxlU2VxdWVuY2UpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMuYWxpZ25tZW50KSB7XG4gICAgICAgICAgICAgICAgaWYgKHNjcm9sbFRvT2Zmc2V0IC0gZm91bmROb2RlLnNjcm9sbExlbmd0aCA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2Nyb2xsLnNwcmluZ1Bvc2l0aW9uID0gc2Nyb2xsVG9PZmZzZXQ7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Njcm9sbC5zcHJpbmdTb3VyY2UgPSBTcHJpbmdTb3VyY2UuRU5TVVJFVklTSUJMRTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHNjcm9sbFRvT2Zmc2V0ID4gc2l6ZVt0aGlzLl9kaXJlY3Rpb25dKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Njcm9sbC5zcHJpbmdQb3NpdGlvbiA9IHNpemVbdGhpcy5fZGlyZWN0aW9uXSAtIHNjcm9sbFRvT2Zmc2V0O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zY3JvbGwuc3ByaW5nU291cmNlID0gU3ByaW5nU291cmNlLkVOU1VSRVZJU0lCTEU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2Nyb2xsLmVuc3VyZVZpc2libGVSZW5kZXJOb2RlID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2Nyb2xsVG9PZmZzZXQgPSAtc2Nyb2xsVG9PZmZzZXQ7XG4gICAgICAgICAgICAgICAgaWYgKHNjcm9sbFRvT2Zmc2V0IDwgMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zY3JvbGwuc3ByaW5nUG9zaXRpb24gPSBzY3JvbGxUb09mZnNldDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2Nyb2xsLnNwcmluZ1NvdXJjZSA9IFNwcmluZ1NvdXJjZS5FTlNVUkVWSVNJQkxFO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc2Nyb2xsVG9PZmZzZXQgKyBmb3VuZE5vZGUuc2Nyb2xsTGVuZ3RoID4gc2l6ZVt0aGlzLl9kaXJlY3Rpb25dKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Njcm9sbC5zcHJpbmdQb3NpdGlvbiA9IHNpemVbdGhpcy5fZGlyZWN0aW9uXSAtIChzY3JvbGxUb09mZnNldCArIGZvdW5kTm9kZS5zY3JvbGxMZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zY3JvbGwuc3ByaW5nU291cmNlID0gU3ByaW5nU291cmNlLkVOU1VSRVZJU0lCTEU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2Nyb2xsLmVuc3VyZVZpc2libGVSZW5kZXJOb2RlID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3Njcm9sbC5zcHJpbmdQb3NpdGlvbiA9IHNjcm9sbFRvT2Zmc2V0O1xuICAgICAgICAgICAgdGhpcy5fc2Nyb2xsLnNwcmluZ1NvdXJjZSA9IFNwcmluZ1NvdXJjZS5HT1RPU0VRVUVOQ0U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5fc2Nyb2xsLnNjcm9sbFRvRGlyZWN0aW9uKSB7XG4gICAgICAgIHRoaXMuX3Njcm9sbC5zcHJpbmdQb3NpdGlvbiA9IHNjcm9sbE9mZnNldCAtIHNpemVbdGhpcy5fZGlyZWN0aW9uXTtcbiAgICAgICAgdGhpcy5fc2Nyb2xsLnNwcmluZ1NvdXJjZSA9IFNwcmluZ1NvdXJjZS5HT1RPTkVYVERJUkVDVElPTjtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9zY3JvbGwuc3ByaW5nUG9zaXRpb24gPSBzY3JvbGxPZmZzZXQgKyBzaXplW3RoaXMuX2RpcmVjdGlvbl07XG4gICAgICAgIHRoaXMuX3Njcm9sbC5zcHJpbmdTb3VyY2UgPSBTcHJpbmdTb3VyY2UuR09UT1BSRVZESVJFQ1RJT047XG4gICAgfVxuICAgIGlmICh0aGlzLl92aWV3U2VxdWVuY2UuY2xlYW51cCkge1xuICAgICAgICB2YXIgdmlld1NlcXVlbmNlID0gdGhpcy5fdmlld1NlcXVlbmNlO1xuICAgICAgICB3aGlsZSAodmlld1NlcXVlbmNlLmdldCgpICE9PSBzY3JvbGxUb1JlbmRlck5vZGUpIHtcbiAgICAgICAgICAgIHZpZXdTZXF1ZW5jZSA9IHRoaXMuX3Njcm9sbC5zY3JvbGxUb0RpcmVjdGlvbiA/IHZpZXdTZXF1ZW5jZS5nZXROZXh0KHRydWUpIDogdmlld1NlcXVlbmNlLmdldFByZXZpb3VzKHRydWUpO1xuICAgICAgICAgICAgaWYgKCF2aWV3U2VxdWVuY2UpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbmZ1bmN0aW9uIF9zbmFwVG9QYWdlKCkge1xuICAgIGlmICghdGhpcy5vcHRpb25zLnBhZ2luYXRlZCB8fCB0aGlzLl9zY3JvbGwuc2Nyb2xsRm9yY2VDb3VudCB8fCB0aGlzLl9zY3JvbGwuc3ByaW5nUG9zaXRpb24gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBpdGVtO1xuICAgIHN3aXRjaCAodGhpcy5vcHRpb25zLnBhZ2luYXRpb25Nb2RlKSB7XG4gICAgY2FzZSBQYWdpbmF0aW9uTW9kZS5TQ1JPTEw6XG4gICAgICAgIGlmICghdGhpcy5vcHRpb25zLnBhZ2luYXRpb25FbmVyZ3lUaHJlc3Nob2xkIHx8IE1hdGguYWJzKHRoaXMuX3Njcm9sbC5wYXJ0aWNsZS5nZXRFbmVyZ3koKSkgPD0gdGhpcy5vcHRpb25zLnBhZ2luYXRpb25FbmVyZ3lUaHJlc3Nob2xkKSB7XG4gICAgICAgICAgICBpdGVtID0gdGhpcy5vcHRpb25zLmFsaWdubWVudCA/IHRoaXMuZ2V0TGFzdFZpc2libGVJdGVtKCkgOiB0aGlzLmdldEZpcnN0VmlzaWJsZUl0ZW0oKTtcbiAgICAgICAgICAgIGlmIChpdGVtICYmIGl0ZW0ucmVuZGVyTm9kZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZ29Ub1JlbmRlck5vZGUoaXRlbS5yZW5kZXJOb2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICBjYXNlIFBhZ2luYXRpb25Nb2RlLlBBR0U6XG4gICAgICAgIGl0ZW0gPSB0aGlzLm9wdGlvbnMuYWxpZ25tZW50ID8gdGhpcy5nZXRMYXN0VmlzaWJsZUl0ZW0oKSA6IHRoaXMuZ2V0Rmlyc3RWaXNpYmxlSXRlbSgpO1xuICAgICAgICBpZiAoaXRlbSAmJiBpdGVtLnJlbmRlck5vZGUpIHtcbiAgICAgICAgICAgIHRoaXMuZ29Ub1JlbmRlck5vZGUoaXRlbS5yZW5kZXJOb2RlKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICB9XG59XG5mdW5jdGlvbiBfbm9ybWFsaXplUHJldlZpZXdTZXF1ZW5jZShzY3JvbGxPZmZzZXQpIHtcbiAgICB2YXIgY291bnQgPSAwO1xuICAgIHZhciBub3JtYWxpemVkU2Nyb2xsT2Zmc2V0ID0gc2Nyb2xsT2Zmc2V0O1xuICAgIHZhciBub3JtYWxpemVOZXh0UHJldiA9IGZhbHNlO1xuICAgIHZhciBub2RlID0gdGhpcy5fbm9kZXMuZ2V0U3RhcnRFbnVtTm9kZShmYWxzZSk7XG4gICAgd2hpbGUgKG5vZGUpIHtcbiAgICAgICAgaWYgKCFub2RlLl9pbnZhbGlkYXRlZCB8fCAhbm9kZS5fdmlld1NlcXVlbmNlKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBpZiAobm9ybWFsaXplTmV4dFByZXYpIHtcbiAgICAgICAgICAgIHRoaXMuX3ZpZXdTZXF1ZW5jZSA9IG5vZGUuX3ZpZXdTZXF1ZW5jZTtcbiAgICAgICAgICAgIG5vcm1hbGl6ZWRTY3JvbGxPZmZzZXQgPSBzY3JvbGxPZmZzZXQ7XG4gICAgICAgICAgICBub3JtYWxpemVOZXh0UHJldiA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChub2RlLnNjcm9sbExlbmd0aCA9PT0gdW5kZWZpbmVkIHx8IG5vZGUudHJ1ZVNpemVSZXF1ZXN0ZWQgfHwgc2Nyb2xsT2Zmc2V0IDwgMCkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgc2Nyb2xsT2Zmc2V0IC09IG5vZGUuc2Nyb2xsTGVuZ3RoO1xuICAgICAgICBjb3VudCsrO1xuICAgICAgICBpZiAobm9kZS5zY3JvbGxMZW5ndGgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMuYWxpZ25tZW50KSB7XG4gICAgICAgICAgICAgICAgbm9ybWFsaXplTmV4dFByZXYgPSBzY3JvbGxPZmZzZXQgPj0gMDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdmlld1NlcXVlbmNlID0gbm9kZS5fdmlld1NlcXVlbmNlO1xuICAgICAgICAgICAgICAgIG5vcm1hbGl6ZWRTY3JvbGxPZmZzZXQgPSBzY3JvbGxPZmZzZXQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbm9kZSA9IG5vZGUuX3ByZXY7XG4gICAgfVxuICAgIHJldHVybiBub3JtYWxpemVkU2Nyb2xsT2Zmc2V0O1xufVxuZnVuY3Rpb24gX25vcm1hbGl6ZU5leHRWaWV3U2VxdWVuY2Uoc2Nyb2xsT2Zmc2V0KSB7XG4gICAgdmFyIGNvdW50ID0gMDtcbiAgICB2YXIgbm9ybWFsaXplZFNjcm9sbE9mZnNldCA9IHNjcm9sbE9mZnNldDtcbiAgICB2YXIgbm9kZSA9IHRoaXMuX25vZGVzLmdldFN0YXJ0RW51bU5vZGUodHJ1ZSk7XG4gICAgd2hpbGUgKG5vZGUpIHtcbiAgICAgICAgaWYgKCFub2RlLl9pbnZhbGlkYXRlZCB8fCBub2RlLnNjcm9sbExlbmd0aCA9PT0gdW5kZWZpbmVkIHx8IG5vZGUudHJ1ZVNpemVSZXF1ZXN0ZWQgfHwgIW5vZGUuX3ZpZXdTZXF1ZW5jZSB8fCBzY3JvbGxPZmZzZXQgPiAwICYmICghdGhpcy5vcHRpb25zLmFsaWdubWVudCB8fCBub2RlLnNjcm9sbExlbmd0aCAhPT0gMCkpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuYWxpZ25tZW50KSB7XG4gICAgICAgICAgICBzY3JvbGxPZmZzZXQgKz0gbm9kZS5zY3JvbGxMZW5ndGg7XG4gICAgICAgICAgICBjb3VudCsrO1xuICAgICAgICB9XG4gICAgICAgIGlmIChub2RlLnNjcm9sbExlbmd0aCB8fCB0aGlzLm9wdGlvbnMuYWxpZ25tZW50KSB7XG4gICAgICAgICAgICB0aGlzLl92aWV3U2VxdWVuY2UgPSBub2RlLl92aWV3U2VxdWVuY2U7XG4gICAgICAgICAgICBub3JtYWxpemVkU2Nyb2xsT2Zmc2V0ID0gc2Nyb2xsT2Zmc2V0O1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5vcHRpb25zLmFsaWdubWVudCkge1xuICAgICAgICAgICAgc2Nyb2xsT2Zmc2V0ICs9IG5vZGUuc2Nyb2xsTGVuZ3RoO1xuICAgICAgICAgICAgY291bnQrKztcbiAgICAgICAgfVxuICAgICAgICBub2RlID0gbm9kZS5fbmV4dDtcbiAgICB9XG4gICAgcmV0dXJuIG5vcm1hbGl6ZWRTY3JvbGxPZmZzZXQ7XG59XG5mdW5jdGlvbiBfbm9ybWFsaXplVmlld1NlcXVlbmNlKHNpemUsIHNjcm9sbE9mZnNldCkge1xuICAgIHZhciBjYXBzID0gdGhpcy5fbGF5b3V0LmNhcGFiaWxpdGllcztcbiAgICBpZiAoY2FwcyAmJiBjYXBzLmRlYnVnICYmIGNhcHMuZGVidWcubm9ybWFsaXplICE9PSB1bmRlZmluZWQgJiYgIWNhcHMuZGVidWcubm9ybWFsaXplKSB7XG4gICAgICAgIHJldHVybiBzY3JvbGxPZmZzZXQ7XG4gICAgfVxuICAgIGlmICh0aGlzLl9zY3JvbGwuc2Nyb2xsRm9yY2VDb3VudCkge1xuICAgICAgICByZXR1cm4gc2Nyb2xsT2Zmc2V0O1xuICAgIH1cbiAgICB2YXIgbm9ybWFsaXplZFNjcm9sbE9mZnNldCA9IHNjcm9sbE9mZnNldDtcbiAgICBpZiAodGhpcy5vcHRpb25zLmFsaWdubWVudCAmJiBzY3JvbGxPZmZzZXQgPCAwKSB7XG4gICAgICAgIG5vcm1hbGl6ZWRTY3JvbGxPZmZzZXQgPSBfbm9ybWFsaXplTmV4dFZpZXdTZXF1ZW5jZS5jYWxsKHRoaXMsIHNjcm9sbE9mZnNldCk7XG4gICAgfSBlbHNlIGlmICghdGhpcy5vcHRpb25zLmFsaWdubWVudCAmJiBzY3JvbGxPZmZzZXQgPiAwKSB7XG4gICAgICAgIG5vcm1hbGl6ZWRTY3JvbGxPZmZzZXQgPSBfbm9ybWFsaXplUHJldlZpZXdTZXF1ZW5jZS5jYWxsKHRoaXMsIHNjcm9sbE9mZnNldCk7XG4gICAgfVxuICAgIGlmIChub3JtYWxpemVkU2Nyb2xsT2Zmc2V0ID09PSBzY3JvbGxPZmZzZXQpIHtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5hbGlnbm1lbnQgJiYgc2Nyb2xsT2Zmc2V0ID4gMCkge1xuICAgICAgICAgICAgbm9ybWFsaXplZFNjcm9sbE9mZnNldCA9IF9ub3JtYWxpemVQcmV2Vmlld1NlcXVlbmNlLmNhbGwodGhpcywgc2Nyb2xsT2Zmc2V0KTtcbiAgICAgICAgfSBlbHNlIGlmICghdGhpcy5vcHRpb25zLmFsaWdubWVudCAmJiBzY3JvbGxPZmZzZXQgPCAwKSB7XG4gICAgICAgICAgICBub3JtYWxpemVkU2Nyb2xsT2Zmc2V0ID0gX25vcm1hbGl6ZU5leHRWaWV3U2VxdWVuY2UuY2FsbCh0aGlzLCBzY3JvbGxPZmZzZXQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChub3JtYWxpemVkU2Nyb2xsT2Zmc2V0ICE9PSBzY3JvbGxPZmZzZXQpIHtcbiAgICAgICAgdmFyIGRlbHRhID0gbm9ybWFsaXplZFNjcm9sbE9mZnNldCAtIHNjcm9sbE9mZnNldDtcbiAgICAgICAgdmFyIHBhcnRpY2xlVmFsdWUgPSB0aGlzLl9zY3JvbGwucGFydGljbGUuZ2V0UG9zaXRpb24xRCgpO1xuICAgICAgICBfc2V0UGFydGljbGUuY2FsbCh0aGlzLCBwYXJ0aWNsZVZhbHVlICsgZGVsdGEsIHVuZGVmaW5lZCwgJ25vcm1hbGl6ZScpO1xuICAgICAgICBpZiAodGhpcy5fc2Nyb2xsLnNwcmluZ1Bvc2l0aW9uICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX3Njcm9sbC5zcHJpbmdQb3NpdGlvbiArPSBkZWx0YTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2FwcyAmJiBjYXBzLnNlcXVlbnRpYWxTY3JvbGxpbmdPcHRpbWl6ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX3Njcm9sbC5ncm91cFN0YXJ0IC09IGRlbHRhO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBub3JtYWxpemVkU2Nyb2xsT2Zmc2V0O1xufVxuU2Nyb2xsQ29udHJvbGxlci5wcm90b3R5cGUuZ2V0VmlzaWJsZUl0ZW1zID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBzaXplID0gdGhpcy5fY29udGV4dFNpemVDYWNoZTtcbiAgICB2YXIgc2Nyb2xsT2Zmc2V0ID0gdGhpcy5vcHRpb25zLmFsaWdubWVudCA/IHRoaXMuX3Njcm9sbC51bm5vcm1hbGl6ZWRTY3JvbGxPZmZzZXQgKyBzaXplW3RoaXMuX2RpcmVjdGlvbl0gOiB0aGlzLl9zY3JvbGwudW5ub3JtYWxpemVkU2Nyb2xsT2Zmc2V0O1xuICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICB2YXIgbm9kZSA9IHRoaXMuX25vZGVzLmdldFN0YXJ0RW51bU5vZGUodHJ1ZSk7XG4gICAgd2hpbGUgKG5vZGUpIHtcbiAgICAgICAgaWYgKCFub2RlLl9pbnZhbGlkYXRlZCB8fCBub2RlLnNjcm9sbExlbmd0aCA9PT0gdW5kZWZpbmVkIHx8IHNjcm9sbE9mZnNldCA+IHNpemVbdGhpcy5fZGlyZWN0aW9uXSkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgc2Nyb2xsT2Zmc2V0ICs9IG5vZGUuc2Nyb2xsTGVuZ3RoO1xuICAgICAgICBpZiAoc2Nyb2xsT2Zmc2V0ID49IDAgJiYgbm9kZS5fdmlld1NlcXVlbmNlKSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaCh7XG4gICAgICAgICAgICAgICAgaW5kZXg6IG5vZGUuX3ZpZXdTZXF1ZW5jZS5nZXRJbmRleCgpLFxuICAgICAgICAgICAgICAgIHZpZXdTZXF1ZW5jZTogbm9kZS5fdmlld1NlcXVlbmNlLFxuICAgICAgICAgICAgICAgIHJlbmRlck5vZGU6IG5vZGUucmVuZGVyTm9kZSxcbiAgICAgICAgICAgICAgICB2aXNpYmxlUGVyYzogbm9kZS5zY3JvbGxMZW5ndGggPyAoTWF0aC5taW4oc2Nyb2xsT2Zmc2V0LCBzaXplW3RoaXMuX2RpcmVjdGlvbl0pIC0gTWF0aC5tYXgoc2Nyb2xsT2Zmc2V0IC0gbm9kZS5zY3JvbGxMZW5ndGgsIDApKSAvIG5vZGUuc2Nyb2xsTGVuZ3RoIDogMSxcbiAgICAgICAgICAgICAgICBzY3JvbGxPZmZzZXQ6IHNjcm9sbE9mZnNldCAtIG5vZGUuc2Nyb2xsTGVuZ3RoLFxuICAgICAgICAgICAgICAgIHNjcm9sbExlbmd0aDogbm9kZS5zY3JvbGxMZW5ndGgsXG4gICAgICAgICAgICAgICAgX25vZGU6IG5vZGVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIG5vZGUgPSBub2RlLl9uZXh0O1xuICAgIH1cbiAgICBzY3JvbGxPZmZzZXQgPSB0aGlzLm9wdGlvbnMuYWxpZ25tZW50ID8gdGhpcy5fc2Nyb2xsLnVubm9ybWFsaXplZFNjcm9sbE9mZnNldCArIHNpemVbdGhpcy5fZGlyZWN0aW9uXSA6IHRoaXMuX3Njcm9sbC51bm5vcm1hbGl6ZWRTY3JvbGxPZmZzZXQ7XG4gICAgbm9kZSA9IHRoaXMuX25vZGVzLmdldFN0YXJ0RW51bU5vZGUoZmFsc2UpO1xuICAgIHdoaWxlIChub2RlKSB7XG4gICAgICAgIGlmICghbm9kZS5faW52YWxpZGF0ZWQgfHwgbm9kZS5zY3JvbGxMZW5ndGggPT09IHVuZGVmaW5lZCB8fCBzY3JvbGxPZmZzZXQgPCAwKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBzY3JvbGxPZmZzZXQgLT0gbm9kZS5zY3JvbGxMZW5ndGg7XG4gICAgICAgIGlmIChzY3JvbGxPZmZzZXQgPCBzaXplW3RoaXMuX2RpcmVjdGlvbl0gJiYgbm9kZS5fdmlld1NlcXVlbmNlKSB7XG4gICAgICAgICAgICByZXN1bHQudW5zaGlmdCh7XG4gICAgICAgICAgICAgICAgaW5kZXg6IG5vZGUuX3ZpZXdTZXF1ZW5jZS5nZXRJbmRleCgpLFxuICAgICAgICAgICAgICAgIHZpZXdTZXF1ZW5jZTogbm9kZS5fdmlld1NlcXVlbmNlLFxuICAgICAgICAgICAgICAgIHJlbmRlck5vZGU6IG5vZGUucmVuZGVyTm9kZSxcbiAgICAgICAgICAgICAgICB2aXNpYmxlUGVyYzogbm9kZS5zY3JvbGxMZW5ndGggPyAoTWF0aC5taW4oc2Nyb2xsT2Zmc2V0ICsgbm9kZS5zY3JvbGxMZW5ndGgsIHNpemVbdGhpcy5fZGlyZWN0aW9uXSkgLSBNYXRoLm1heChzY3JvbGxPZmZzZXQsIDApKSAvIG5vZGUuc2Nyb2xsTGVuZ3RoIDogMSxcbiAgICAgICAgICAgICAgICBzY3JvbGxPZmZzZXQ6IHNjcm9sbE9mZnNldCxcbiAgICAgICAgICAgICAgICBzY3JvbGxMZW5ndGg6IG5vZGUuc2Nyb2xsTGVuZ3RoLFxuICAgICAgICAgICAgICAgIF9ub2RlOiBub2RlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBub2RlID0gbm9kZS5fcHJldjtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5TY3JvbGxDb250cm9sbGVyLnByb3RvdHlwZS5nZXRGaXJzdFZpc2libGVJdGVtID0gZnVuY3Rpb24gKGluY2x1ZGVOb2RlKSB7XG4gICAgdmFyIHNpemUgPSB0aGlzLl9jb250ZXh0U2l6ZUNhY2hlO1xuICAgIHZhciBzY3JvbGxPZmZzZXQgPSB0aGlzLm9wdGlvbnMuYWxpZ25tZW50ID8gdGhpcy5fc2Nyb2xsLnVubm9ybWFsaXplZFNjcm9sbE9mZnNldCArIHNpemVbdGhpcy5fZGlyZWN0aW9uXSA6IHRoaXMuX3Njcm9sbC51bm5vcm1hbGl6ZWRTY3JvbGxPZmZzZXQ7XG4gICAgdmFyIG5vZGUgPSB0aGlzLl9ub2Rlcy5nZXRTdGFydEVudW1Ob2RlKHRydWUpO1xuICAgIHZhciBub2RlRm91bmRWaXNpYmxlUGVyYztcbiAgICB2YXIgbm9kZUZvdW5kU2Nyb2xsT2Zmc2V0O1xuICAgIHZhciBub2RlRm91bmQ7XG4gICAgd2hpbGUgKG5vZGUpIHtcbiAgICAgICAgaWYgKCFub2RlLl9pbnZhbGlkYXRlZCB8fCBub2RlLnNjcm9sbExlbmd0aCA9PT0gdW5kZWZpbmVkIHx8IHNjcm9sbE9mZnNldCA+IHNpemVbdGhpcy5fZGlyZWN0aW9uXSkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgc2Nyb2xsT2Zmc2V0ICs9IG5vZGUuc2Nyb2xsTGVuZ3RoO1xuICAgICAgICBpZiAoc2Nyb2xsT2Zmc2V0ID49IDAgJiYgbm9kZS5fdmlld1NlcXVlbmNlKSB7XG4gICAgICAgICAgICBub2RlRm91bmRWaXNpYmxlUGVyYyA9IG5vZGUuc2Nyb2xsTGVuZ3RoID8gKE1hdGgubWluKHNjcm9sbE9mZnNldCwgc2l6ZVt0aGlzLl9kaXJlY3Rpb25dKSAtIE1hdGgubWF4KHNjcm9sbE9mZnNldCAtIG5vZGUuc2Nyb2xsTGVuZ3RoLCAwKSkgLyBub2RlLnNjcm9sbExlbmd0aCA6IDE7XG4gICAgICAgICAgICBub2RlRm91bmRTY3JvbGxPZmZzZXQgPSBzY3JvbGxPZmZzZXQgLSBub2RlLnNjcm9sbExlbmd0aDtcbiAgICAgICAgICAgIGlmIChub2RlRm91bmRWaXNpYmxlUGVyYyA+PSB0aGlzLm9wdGlvbnMudmlzaWJsZUl0ZW1UaHJlc3Nob2xkIHx8IG5vZGVGb3VuZFNjcm9sbE9mZnNldCA+PSAwKSB7XG4gICAgICAgICAgICAgICAgbm9kZUZvdW5kID0gbm9kZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBub2RlID0gbm9kZS5fbmV4dDtcbiAgICB9XG4gICAgc2Nyb2xsT2Zmc2V0ID0gdGhpcy5vcHRpb25zLmFsaWdubWVudCA/IHRoaXMuX3Njcm9sbC51bm5vcm1hbGl6ZWRTY3JvbGxPZmZzZXQgKyBzaXplW3RoaXMuX2RpcmVjdGlvbl0gOiB0aGlzLl9zY3JvbGwudW5ub3JtYWxpemVkU2Nyb2xsT2Zmc2V0O1xuICAgIG5vZGUgPSB0aGlzLl9ub2Rlcy5nZXRTdGFydEVudW1Ob2RlKGZhbHNlKTtcbiAgICB3aGlsZSAobm9kZSkge1xuICAgICAgICBpZiAoIW5vZGUuX2ludmFsaWRhdGVkIHx8IG5vZGUuc2Nyb2xsTGVuZ3RoID09PSB1bmRlZmluZWQgfHwgc2Nyb2xsT2Zmc2V0IDwgMCkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgc2Nyb2xsT2Zmc2V0IC09IG5vZGUuc2Nyb2xsTGVuZ3RoO1xuICAgICAgICBpZiAoc2Nyb2xsT2Zmc2V0IDwgc2l6ZVt0aGlzLl9kaXJlY3Rpb25dICYmIG5vZGUuX3ZpZXdTZXF1ZW5jZSkge1xuICAgICAgICAgICAgdmFyIHZpc2libGVQZXJjID0gbm9kZS5zY3JvbGxMZW5ndGggPyAoTWF0aC5taW4oc2Nyb2xsT2Zmc2V0ICsgbm9kZS5zY3JvbGxMZW5ndGgsIHNpemVbdGhpcy5fZGlyZWN0aW9uXSkgLSBNYXRoLm1heChzY3JvbGxPZmZzZXQsIDApKSAvIG5vZGUuc2Nyb2xsTGVuZ3RoIDogMTtcbiAgICAgICAgICAgIGlmICh2aXNpYmxlUGVyYyA+PSB0aGlzLm9wdGlvbnMudmlzaWJsZUl0ZW1UaHJlc3Nob2xkIHx8IHNjcm9sbE9mZnNldCA+PSAwKSB7XG4gICAgICAgICAgICAgICAgbm9kZUZvdW5kVmlzaWJsZVBlcmMgPSB2aXNpYmxlUGVyYztcbiAgICAgICAgICAgICAgICBub2RlRm91bmRTY3JvbGxPZmZzZXQgPSBzY3JvbGxPZmZzZXQ7XG4gICAgICAgICAgICAgICAgbm9kZUZvdW5kID0gbm9kZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBub2RlID0gbm9kZS5fcHJldjtcbiAgICB9XG4gICAgcmV0dXJuIG5vZGVGb3VuZCA/IHtcbiAgICAgICAgaW5kZXg6IG5vZGVGb3VuZC5fdmlld1NlcXVlbmNlLmdldEluZGV4KCksXG4gICAgICAgIHZpZXdTZXF1ZW5jZTogbm9kZUZvdW5kLl92aWV3U2VxdWVuY2UsXG4gICAgICAgIHJlbmRlck5vZGU6IG5vZGVGb3VuZC5yZW5kZXJOb2RlLFxuICAgICAgICB2aXNpYmxlUGVyYzogbm9kZUZvdW5kVmlzaWJsZVBlcmMsXG4gICAgICAgIHNjcm9sbE9mZnNldDogbm9kZUZvdW5kU2Nyb2xsT2Zmc2V0LFxuICAgICAgICBzY3JvbGxMZW5ndGg6IG5vZGVGb3VuZC5zY3JvbGxMZW5ndGgsXG4gICAgICAgIF9ub2RlOiBub2RlRm91bmRcbiAgICB9IDogdW5kZWZpbmVkO1xufTtcblNjcm9sbENvbnRyb2xsZXIucHJvdG90eXBlLmdldExhc3RWaXNpYmxlSXRlbSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgaXRlbXMgPSB0aGlzLmdldFZpc2libGVJdGVtcygpO1xuICAgIHZhciBzaXplID0gdGhpcy5fY29udGV4dFNpemVDYWNoZTtcbiAgICBmb3IgKHZhciBpID0gaXRlbXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgdmFyIGl0ZW0gPSBpdGVtc1tpXTtcbiAgICAgICAgaWYgKGl0ZW0udmlzaWJsZVBlcmMgPj0gdGhpcy5vcHRpb25zLnZpc2libGVJdGVtVGhyZXNzaG9sZCB8fCBpdGVtLnNjcm9sbE9mZnNldCArIGl0ZW0uc2Nyb2xsTGVuZ3RoIDw9IHNpemVbdGhpcy5fZGlyZWN0aW9uXSkge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGl0ZW1zLmxlbmd0aCA/IGl0ZW1zW2l0ZW1zLmxlbmd0aCAtIDFdIDogdW5kZWZpbmVkO1xufTtcbmZ1bmN0aW9uIF9zY3JvbGxUb1NlcXVlbmNlKHZpZXdTZXF1ZW5jZSwgbmV4dCkge1xuICAgIHRoaXMuX3Njcm9sbC5zY3JvbGxUb1NlcXVlbmNlID0gdmlld1NlcXVlbmNlO1xuICAgIHRoaXMuX3Njcm9sbC5zY3JvbGxUb1JlbmRlck5vZGUgPSB2aWV3U2VxdWVuY2UuZ2V0KCk7XG4gICAgdGhpcy5fc2Nyb2xsLmVuc3VyZVZpc2libGVSZW5kZXJOb2RlID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuX3Njcm9sbC5zY3JvbGxUb0RpcmVjdGlvbiA9IG5leHQ7XG4gICAgdGhpcy5fc2Nyb2xsLnNjcm9sbERpcnR5ID0gdHJ1ZTtcbn1cbmZ1bmN0aW9uIF9lbnN1cmVWaXNpYmxlU2VxdWVuY2Uodmlld1NlcXVlbmNlLCBuZXh0KSB7XG4gICAgdGhpcy5fc2Nyb2xsLnNjcm9sbFRvU2VxdWVuY2UgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5fc2Nyb2xsLnNjcm9sbFRvUmVuZGVyTm9kZSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLl9zY3JvbGwuZW5zdXJlVmlzaWJsZVJlbmRlck5vZGUgPSB2aWV3U2VxdWVuY2UuZ2V0KCk7XG4gICAgdGhpcy5fc2Nyb2xsLnNjcm9sbFRvRGlyZWN0aW9uID0gbmV4dDtcbiAgICB0aGlzLl9zY3JvbGwuc2Nyb2xsRGlydHkgPSB0cnVlO1xufVxuZnVuY3Rpb24gX2dvVG9QYWdlKGFtb3VudCkge1xuICAgIHZhciB2aWV3U2VxdWVuY2UgPSB0aGlzLl9zY3JvbGwuc2Nyb2xsVG9TZXF1ZW5jZSB8fCB0aGlzLl92aWV3U2VxdWVuY2U7XG4gICAgaWYgKCF0aGlzLl9zY3JvbGwuc2Nyb2xsVG9TZXF1ZW5jZSkge1xuICAgICAgICB2YXIgZmlyc3RWaXNpYmxlSXRlbSA9IHRoaXMuZ2V0Rmlyc3RWaXNpYmxlSXRlbSgpO1xuICAgICAgICBpZiAoZmlyc3RWaXNpYmxlSXRlbSkge1xuICAgICAgICAgICAgdmlld1NlcXVlbmNlID0gZmlyc3RWaXNpYmxlSXRlbS52aWV3U2VxdWVuY2U7XG4gICAgICAgICAgICBpZiAoYW1vdW50IDwgMCAmJiBmaXJzdFZpc2libGVJdGVtLnNjcm9sbE9mZnNldCA8IDAgfHwgYW1vdW50ID4gMCAmJiBmaXJzdFZpc2libGVJdGVtLnNjcm9sbE9mZnNldCA+IDApIHtcbiAgICAgICAgICAgICAgICBhbW91bnQgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGlmICghdmlld1NlcXVlbmNlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBNYXRoLmFicyhhbW91bnQpOyBpKyspIHtcbiAgICAgICAgdmFyIG5leHRWaWV3U2VxdWVuY2UgPSBhbW91bnQgPiAwID8gdmlld1NlcXVlbmNlLmdldE5leHQoKSA6IHZpZXdTZXF1ZW5jZS5nZXRQcmV2aW91cygpO1xuICAgICAgICBpZiAobmV4dFZpZXdTZXF1ZW5jZSkge1xuICAgICAgICAgICAgdmlld1NlcXVlbmNlID0gbmV4dFZpZXdTZXF1ZW5jZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIF9zY3JvbGxUb1NlcXVlbmNlLmNhbGwodGhpcywgdmlld1NlcXVlbmNlLCBhbW91bnQgPj0gMCk7XG59XG5TY3JvbGxDb250cm9sbGVyLnByb3RvdHlwZS5nb1RvRmlyc3RQYWdlID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICghdGhpcy5fdmlld1NlcXVlbmNlKSB7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBpZiAodGhpcy5fdmlld1NlcXVlbmNlLl8gJiYgdGhpcy5fdmlld1NlcXVlbmNlLl8ubG9vcCkge1xuICAgICAgICBMYXlvdXRVdGlsaXR5LmVycm9yKCdVbmFibGUgdG8gZ28gdG8gZmlyc3QgaXRlbSBvZiBsb29wZWQgVmlld1NlcXVlbmNlJyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICB2YXIgdmlld1NlcXVlbmNlID0gdGhpcy5fdmlld1NlcXVlbmNlO1xuICAgIHdoaWxlICh2aWV3U2VxdWVuY2UpIHtcbiAgICAgICAgdmFyIHByZXYgPSB2aWV3U2VxdWVuY2UuZ2V0UHJldmlvdXMoKTtcbiAgICAgICAgaWYgKHByZXYgJiYgcHJldi5nZXQoKSkge1xuICAgICAgICAgICAgdmlld1NlcXVlbmNlID0gcHJldjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIF9zY3JvbGxUb1NlcXVlbmNlLmNhbGwodGhpcywgdmlld1NlcXVlbmNlLCBmYWxzZSk7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuU2Nyb2xsQ29udHJvbGxlci5wcm90b3R5cGUuZ29Ub1ByZXZpb3VzUGFnZSA9IGZ1bmN0aW9uICgpIHtcbiAgICBfZ29Ub1BhZ2UuY2FsbCh0aGlzLCAtMSk7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuU2Nyb2xsQ29udHJvbGxlci5wcm90b3R5cGUuZ29Ub05leHRQYWdlID0gZnVuY3Rpb24gKCkge1xuICAgIF9nb1RvUGFnZS5jYWxsKHRoaXMsIDEpO1xuICAgIHJldHVybiB0aGlzO1xufTtcblNjcm9sbENvbnRyb2xsZXIucHJvdG90eXBlLmdvVG9MYXN0UGFnZSA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIXRoaXMuX3ZpZXdTZXF1ZW5jZSkge1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgaWYgKHRoaXMuX3ZpZXdTZXF1ZW5jZS5fICYmIHRoaXMuX3ZpZXdTZXF1ZW5jZS5fLmxvb3ApIHtcbiAgICAgICAgTGF5b3V0VXRpbGl0eS5lcnJvcignVW5hYmxlIHRvIGdvIHRvIGxhc3QgaXRlbSBvZiBsb29wZWQgVmlld1NlcXVlbmNlJyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICB2YXIgdmlld1NlcXVlbmNlID0gdGhpcy5fdmlld1NlcXVlbmNlO1xuICAgIHdoaWxlICh2aWV3U2VxdWVuY2UpIHtcbiAgICAgICAgdmFyIG5leHQgPSB2aWV3U2VxdWVuY2UuZ2V0TmV4dCgpO1xuICAgICAgICBpZiAobmV4dCAmJiBuZXh0LmdldCgpKSB7XG4gICAgICAgICAgICB2aWV3U2VxdWVuY2UgPSBuZXh0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgX3Njcm9sbFRvU2VxdWVuY2UuY2FsbCh0aGlzLCB2aWV3U2VxdWVuY2UsIHRydWUpO1xuICAgIHJldHVybiB0aGlzO1xufTtcblNjcm9sbENvbnRyb2xsZXIucHJvdG90eXBlLmdvVG9SZW5kZXJOb2RlID0gZnVuY3Rpb24gKG5vZGUpIHtcbiAgICBpZiAoIXRoaXMuX3ZpZXdTZXF1ZW5jZSB8fCAhbm9kZSkge1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgaWYgKHRoaXMuX3ZpZXdTZXF1ZW5jZS5nZXQoKSA9PT0gbm9kZSkge1xuICAgICAgICB2YXIgbmV4dCA9IF9jYWxjU2Nyb2xsT2Zmc2V0LmNhbGwodGhpcykgPj0gMDtcbiAgICAgICAgX3Njcm9sbFRvU2VxdWVuY2UuY2FsbCh0aGlzLCB0aGlzLl92aWV3U2VxdWVuY2UsIG5leHQpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgdmFyIG5leHRTZXF1ZW5jZSA9IHRoaXMuX3ZpZXdTZXF1ZW5jZS5nZXROZXh0KCk7XG4gICAgdmFyIHByZXZTZXF1ZW5jZSA9IHRoaXMuX3ZpZXdTZXF1ZW5jZS5nZXRQcmV2aW91cygpO1xuICAgIHdoaWxlICgobmV4dFNlcXVlbmNlIHx8IHByZXZTZXF1ZW5jZSkgJiYgbmV4dFNlcXVlbmNlICE9PSB0aGlzLl92aWV3U2VxdWVuY2UpIHtcbiAgICAgICAgdmFyIG5leHROb2RlID0gbmV4dFNlcXVlbmNlID8gbmV4dFNlcXVlbmNlLmdldCgpIDogdW5kZWZpbmVkO1xuICAgICAgICBpZiAobmV4dE5vZGUgPT09IG5vZGUpIHtcbiAgICAgICAgICAgIF9zY3JvbGxUb1NlcXVlbmNlLmNhbGwodGhpcywgbmV4dFNlcXVlbmNlLCB0cnVlKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHZhciBwcmV2Tm9kZSA9IHByZXZTZXF1ZW5jZSA/IHByZXZTZXF1ZW5jZS5nZXQoKSA6IHVuZGVmaW5lZDtcbiAgICAgICAgaWYgKHByZXZOb2RlID09PSBub2RlKSB7XG4gICAgICAgICAgICBfc2Nyb2xsVG9TZXF1ZW5jZS5jYWxsKHRoaXMsIHByZXZTZXF1ZW5jZSwgZmFsc2UpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgbmV4dFNlcXVlbmNlID0gbmV4dE5vZGUgPyBuZXh0U2VxdWVuY2UuZ2V0TmV4dCgpIDogdW5kZWZpbmVkO1xuICAgICAgICBwcmV2U2VxdWVuY2UgPSBwcmV2Tm9kZSA/IHByZXZTZXF1ZW5jZS5nZXRQcmV2aW91cygpIDogdW5kZWZpbmVkO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbn07XG5TY3JvbGxDb250cm9sbGVyLnByb3RvdHlwZS5lbnN1cmVWaXNpYmxlID0gZnVuY3Rpb24gKG5vZGUpIHtcbiAgICBpZiAobm9kZSBpbnN0YW5jZW9mIFZpZXdTZXF1ZW5jZSkge1xuICAgICAgICBub2RlID0gbm9kZS5nZXQoKTtcbiAgICB9IGVsc2UgaWYgKG5vZGUgaW5zdGFuY2VvZiBOdW1iZXIgfHwgdHlwZW9mIG5vZGUgPT09ICdudW1iZXInKSB7XG4gICAgICAgIHZhciB2aWV3U2VxdWVuY2UgPSB0aGlzLl92aWV3U2VxdWVuY2U7XG4gICAgICAgIHdoaWxlICh2aWV3U2VxdWVuY2UuZ2V0SW5kZXgoKSA8IG5vZGUpIHtcbiAgICAgICAgICAgIHZpZXdTZXF1ZW5jZSA9IHZpZXdTZXF1ZW5jZS5nZXROZXh0KCk7XG4gICAgICAgICAgICBpZiAoIXZpZXdTZXF1ZW5jZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHdoaWxlICh2aWV3U2VxdWVuY2UuZ2V0SW5kZXgoKSA+IG5vZGUpIHtcbiAgICAgICAgICAgIHZpZXdTZXF1ZW5jZSA9IHZpZXdTZXF1ZW5jZS5nZXRQcmV2aW91cygpO1xuICAgICAgICAgICAgaWYgKCF2aWV3U2VxdWVuY2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAodGhpcy5fdmlld1NlcXVlbmNlLmdldCgpID09PSBub2RlKSB7XG4gICAgICAgIHZhciBuZXh0ID0gX2NhbGNTY3JvbGxPZmZzZXQuY2FsbCh0aGlzKSA+PSAwO1xuICAgICAgICBfZW5zdXJlVmlzaWJsZVNlcXVlbmNlLmNhbGwodGhpcywgdGhpcy5fdmlld1NlcXVlbmNlLCBuZXh0KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHZhciBuZXh0U2VxdWVuY2UgPSB0aGlzLl92aWV3U2VxdWVuY2UuZ2V0TmV4dCgpO1xuICAgIHZhciBwcmV2U2VxdWVuY2UgPSB0aGlzLl92aWV3U2VxdWVuY2UuZ2V0UHJldmlvdXMoKTtcbiAgICB3aGlsZSAoKG5leHRTZXF1ZW5jZSB8fCBwcmV2U2VxdWVuY2UpICYmIG5leHRTZXF1ZW5jZSAhPT0gdGhpcy5fdmlld1NlcXVlbmNlKSB7XG4gICAgICAgIHZhciBuZXh0Tm9kZSA9IG5leHRTZXF1ZW5jZSA/IG5leHRTZXF1ZW5jZS5nZXQoKSA6IHVuZGVmaW5lZDtcbiAgICAgICAgaWYgKG5leHROb2RlID09PSBub2RlKSB7XG4gICAgICAgICAgICBfZW5zdXJlVmlzaWJsZVNlcXVlbmNlLmNhbGwodGhpcywgbmV4dFNlcXVlbmNlLCB0cnVlKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHZhciBwcmV2Tm9kZSA9IHByZXZTZXF1ZW5jZSA/IHByZXZTZXF1ZW5jZS5nZXQoKSA6IHVuZGVmaW5lZDtcbiAgICAgICAgaWYgKHByZXZOb2RlID09PSBub2RlKSB7XG4gICAgICAgICAgICBfZW5zdXJlVmlzaWJsZVNlcXVlbmNlLmNhbGwodGhpcywgcHJldlNlcXVlbmNlLCBmYWxzZSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBuZXh0U2VxdWVuY2UgPSBuZXh0Tm9kZSA/IG5leHRTZXF1ZW5jZS5nZXROZXh0KCkgOiB1bmRlZmluZWQ7XG4gICAgICAgIHByZXZTZXF1ZW5jZSA9IHByZXZOb2RlID8gcHJldlNlcXVlbmNlLmdldFByZXZpb3VzKCkgOiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xufTtcblNjcm9sbENvbnRyb2xsZXIucHJvdG90eXBlLnNjcm9sbCA9IGZ1bmN0aW9uIChkZWx0YSkge1xuICAgIHRoaXMuaGFsdCgpO1xuICAgIHRoaXMuX3Njcm9sbC5zY3JvbGxEZWx0YSArPSBkZWx0YTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5TY3JvbGxDb250cm9sbGVyLnByb3RvdHlwZS5jYW5TY3JvbGwgPSBmdW5jdGlvbiAoZGVsdGEpIHtcbiAgICB2YXIgc2Nyb2xsT2Zmc2V0ID0gX2NhbGNTY3JvbGxPZmZzZXQuY2FsbCh0aGlzKTtcbiAgICB2YXIgcHJldkhlaWdodCA9IHRoaXMuX2NhbGNTY3JvbGxIZWlnaHQoZmFsc2UpO1xuICAgIHZhciBuZXh0SGVpZ2h0ID0gdGhpcy5fY2FsY1Njcm9sbEhlaWdodCh0cnVlKTtcbiAgICB2YXIgdG90YWxIZWlnaHQ7XG4gICAgaWYgKG5leHRIZWlnaHQgIT09IHVuZGVmaW5lZCAmJiBwcmV2SGVpZ2h0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdG90YWxIZWlnaHQgPSBwcmV2SGVpZ2h0ICsgbmV4dEhlaWdodDtcbiAgICB9XG4gICAgaWYgKHRvdGFsSGVpZ2h0ICE9PSB1bmRlZmluZWQgJiYgdG90YWxIZWlnaHQgPD0gdGhpcy5fY29udGV4dFNpemVDYWNoZVt0aGlzLl9kaXJlY3Rpb25dKSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICBpZiAoZGVsdGEgPCAwICYmIG5leHRIZWlnaHQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB2YXIgbmV4dE9mZnNldCA9IHRoaXMuX2NvbnRleHRTaXplQ2FjaGVbdGhpcy5fZGlyZWN0aW9uXSAtIChzY3JvbGxPZmZzZXQgKyBuZXh0SGVpZ2h0KTtcbiAgICAgICAgcmV0dXJuIE1hdGgubWF4KG5leHRPZmZzZXQsIGRlbHRhKTtcbiAgICB9IGVsc2UgaWYgKGRlbHRhID4gMCAmJiBwcmV2SGVpZ2h0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdmFyIHByZXZPZmZzZXQgPSAtKHNjcm9sbE9mZnNldCAtIHByZXZIZWlnaHQpO1xuICAgICAgICByZXR1cm4gTWF0aC5taW4ocHJldk9mZnNldCwgZGVsdGEpO1xuICAgIH1cbiAgICByZXR1cm4gZGVsdGE7XG59O1xuU2Nyb2xsQ29udHJvbGxlci5wcm90b3R5cGUuaGFsdCA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLl9zY3JvbGwuc2Nyb2xsVG9TZXF1ZW5jZSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLl9zY3JvbGwuc2Nyb2xsVG9SZW5kZXJOb2RlID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuX3Njcm9sbC5lbnN1cmVWaXNpYmxlUmVuZGVyTm9kZSA9IHVuZGVmaW5lZDtcbiAgICBfc2V0UGFydGljbGUuY2FsbCh0aGlzLCB1bmRlZmluZWQsIDAsICdoYWx0Jyk7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuU2Nyb2xsQ29udHJvbGxlci5wcm90b3R5cGUuaXNTY3JvbGxpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Njcm9sbC5pc1Njcm9sbGluZztcbn07XG5TY3JvbGxDb250cm9sbGVyLnByb3RvdHlwZS5nZXRCb3VuZHNSZWFjaGVkID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLl9zY3JvbGwuYm91bmRzUmVhY2hlZDtcbn07XG5TY3JvbGxDb250cm9sbGVyLnByb3RvdHlwZS5nZXRWZWxvY2l0eSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5fc2Nyb2xsLnBhcnRpY2xlLmdldFZlbG9jaXR5MUQoKTtcbn07XG5TY3JvbGxDb250cm9sbGVyLnByb3RvdHlwZS5zZXRWZWxvY2l0eSA9IGZ1bmN0aW9uICh2ZWxvY2l0eSkge1xuICAgIHJldHVybiB0aGlzLl9zY3JvbGwucGFydGljbGUuc2V0VmVsb2NpdHkxRCh2ZWxvY2l0eSk7XG59O1xuU2Nyb2xsQ29udHJvbGxlci5wcm90b3R5cGUuYXBwbHlTY3JvbGxGb3JjZSA9IGZ1bmN0aW9uIChkZWx0YSkge1xuICAgIHRoaXMuaGFsdCgpO1xuICAgIGlmICh0aGlzLl9zY3JvbGwuc2Nyb2xsRm9yY2VDb3VudCA9PT0gMCkge1xuICAgICAgICB0aGlzLl9zY3JvbGwuc2Nyb2xsRm9yY2VTdGFydEl0ZW0gPSB0aGlzLmFsaWdubWVudCA/IHRoaXMuZ2V0TGFzdFZpc2libGVJdGVtKCkgOiB0aGlzLmdldEZpcnN0VmlzaWJsZUl0ZW0oKTtcbiAgICB9XG4gICAgdGhpcy5fc2Nyb2xsLnNjcm9sbEZvcmNlQ291bnQrKztcbiAgICB0aGlzLl9zY3JvbGwuc2Nyb2xsRm9yY2UgKz0gZGVsdGE7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuU2Nyb2xsQ29udHJvbGxlci5wcm90b3R5cGUudXBkYXRlU2Nyb2xsRm9yY2UgPSBmdW5jdGlvbiAocHJldkRlbHRhLCBuZXdEZWx0YSkge1xuICAgIHRoaXMuaGFsdCgpO1xuICAgIG5ld0RlbHRhIC09IHByZXZEZWx0YTtcbiAgICB0aGlzLl9zY3JvbGwuc2Nyb2xsRm9yY2UgKz0gbmV3RGVsdGE7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuU2Nyb2xsQ29udHJvbGxlci5wcm90b3R5cGUucmVsZWFzZVNjcm9sbEZvcmNlID0gZnVuY3Rpb24gKGRlbHRhLCB2ZWxvY2l0eSkge1xuICAgIHRoaXMuaGFsdCgpO1xuICAgIGlmICh0aGlzLl9zY3JvbGwuc2Nyb2xsRm9yY2VDb3VudCA9PT0gMSkge1xuICAgICAgICB2YXIgc2Nyb2xsT2Zmc2V0ID0gX2NhbGNTY3JvbGxPZmZzZXQuY2FsbCh0aGlzKTtcbiAgICAgICAgX3NldFBhcnRpY2xlLmNhbGwodGhpcywgc2Nyb2xsT2Zmc2V0LCB2ZWxvY2l0eSwgJ3JlbGVhc2VTY3JvbGxGb3JjZScpO1xuICAgICAgICB0aGlzLl9zY3JvbGwucGUud2FrZSgpO1xuICAgICAgICB0aGlzLl9zY3JvbGwuc2Nyb2xsRm9yY2UgPSAwO1xuICAgICAgICB0aGlzLl9zY3JvbGwuc2Nyb2xsRGlydHkgPSB0cnVlO1xuICAgICAgICBpZiAodGhpcy5fc2Nyb2xsLnNjcm9sbEZvcmNlU3RhcnRJdGVtICYmIHRoaXMub3B0aW9ucy5wYWdpbmF0ZWQgJiYgdGhpcy5vcHRpb25zLnBhZ2luYXRpb25Nb2RlID09PSBQYWdpbmF0aW9uTW9kZS5QQUdFKSB7XG4gICAgICAgICAgICB2YXIgaXRlbSA9IHRoaXMuYWxpZ25tZW50ID8gdGhpcy5nZXRMYXN0VmlzaWJsZUl0ZW0oKSA6IHRoaXMuZ2V0Rmlyc3RWaXNpYmxlSXRlbSgpO1xuICAgICAgICAgICAgaWYgKGl0ZW0ucmVuZGVyTm9kZSAhPT0gdGhpcy5fc2Nyb2xsLnNjcm9sbEZvcmNlU3RhcnRJdGVtLnJlbmRlck5vZGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdvVG9SZW5kZXJOb2RlKGl0ZW0ucmVuZGVyTm9kZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMub3B0aW9ucy5wYWdpbmF0aW9uRW5lcmd5VGhyZXNzaG9sZCAmJiBNYXRoLmFicyh0aGlzLl9zY3JvbGwucGFydGljbGUuZ2V0RW5lcmd5KCkpID49IHRoaXMub3B0aW9ucy5wYWdpbmF0aW9uRW5lcmd5VGhyZXNzaG9sZCkge1xuICAgICAgICAgICAgICAgIHZlbG9jaXR5ID0gdmVsb2NpdHkgfHwgMDtcbiAgICAgICAgICAgICAgICBpZiAodmVsb2NpdHkgPCAwICYmIGl0ZW0uX25vZGUuX25leHQgJiYgaXRlbS5fbm9kZS5fbmV4dC5yZW5kZXJOb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ29Ub1JlbmRlck5vZGUoaXRlbS5fbm9kZS5fbmV4dC5yZW5kZXJOb2RlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHZlbG9jaXR5ID49IDAgJiYgaXRlbS5fbm9kZS5fcHJldiAmJiBpdGVtLl9ub2RlLl9wcmV2LnJlbmRlck5vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nb1RvUmVuZGVyTm9kZShpdGVtLl9ub2RlLl9wcmV2LnJlbmRlck5vZGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nb1RvUmVuZGVyTm9kZShpdGVtLnJlbmRlck5vZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3Njcm9sbC5zY3JvbGxGb3JjZVN0YXJ0SXRlbSA9IHVuZGVmaW5lZDtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9zY3JvbGwuc2Nyb2xsRm9yY2UgLT0gZGVsdGE7XG4gICAgfVxuICAgIHRoaXMuX3Njcm9sbC5zY3JvbGxGb3JjZUNvdW50LS07XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuU2Nyb2xsQ29udHJvbGxlci5wcm90b3R5cGUuZ2V0U3BlYyA9IGZ1bmN0aW9uIChub2RlLCBub3JtYWxpemUpIHtcbiAgICB2YXIgc3BlYyA9IExheW91dENvbnRyb2xsZXIucHJvdG90eXBlLmdldFNwZWMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICBpZiAoc3BlYyAmJiB0aGlzLl9sYXlvdXQuY2FwYWJpbGl0aWVzICYmIHRoaXMuX2xheW91dC5jYXBhYmlsaXRpZXMuc2VxdWVudGlhbFNjcm9sbGluZ09wdGltaXplZCkge1xuICAgICAgICBzcGVjID0ge1xuICAgICAgICAgICAgb3JpZ2luOiBzcGVjLm9yaWdpbixcbiAgICAgICAgICAgIGFsaWduOiBzcGVjLmFsaWduLFxuICAgICAgICAgICAgb3BhY2l0eTogc3BlYy5vcGFjaXR5LFxuICAgICAgICAgICAgc2l6ZTogc3BlYy5zaXplLFxuICAgICAgICAgICAgcmVuZGVyTm9kZTogc3BlYy5yZW5kZXJOb2RlLFxuICAgICAgICAgICAgdHJhbnNmb3JtOiBzcGVjLnRyYW5zZm9ybVxuICAgICAgICB9O1xuICAgICAgICB2YXIgdHJhbnNsYXRlID0gW1xuICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICAwXG4gICAgICAgICAgICBdO1xuICAgICAgICB0cmFuc2xhdGVbdGhpcy5fZGlyZWN0aW9uXSA9IHRoaXMuX3Njcm9sbE9mZnNldENhY2hlICsgdGhpcy5fc2Nyb2xsLmdyb3VwU3RhcnQ7XG4gICAgICAgIHNwZWMudHJhbnNmb3JtID0gVHJhbnNmb3JtLnRoZW5Nb3ZlKHNwZWMudHJhbnNmb3JtLCB0cmFuc2xhdGUpO1xuICAgIH1cbiAgICByZXR1cm4gc3BlYztcbn07XG5mdW5jdGlvbiBfbGF5b3V0KHNpemUsIHNjcm9sbE9mZnNldCwgbmVzdGVkKSB7XG4gICAgdGhpcy5fZGVidWcubGF5b3V0Q291bnQrKztcbiAgICB2YXIgc2Nyb2xsU3RhcnQgPSAwIC0gTWF0aC5tYXgodGhpcy5vcHRpb25zLmV4dHJhQm91bmRzU3BhY2VbMF0sIDEpO1xuICAgIHZhciBzY3JvbGxFbmQgPSBzaXplW3RoaXMuX2RpcmVjdGlvbl0gKyBNYXRoLm1heCh0aGlzLm9wdGlvbnMuZXh0cmFCb3VuZHNTcGFjZVsxXSwgMSk7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5sYXlvdXRBbGwpIHtcbiAgICAgICAgc2Nyb2xsU3RhcnQgPSAtMTAwMDAwMDtcbiAgICAgICAgc2Nyb2xsRW5kID0gMTAwMDAwMDtcbiAgICB9XG4gICAgdmFyIGxheW91dENvbnRleHQgPSB0aGlzLl9ub2Rlcy5wcmVwYXJlRm9yTGF5b3V0KHRoaXMuX3ZpZXdTZXF1ZW5jZSwgdGhpcy5fbm9kZXNCeUlkLCB7XG4gICAgICAgICAgICBzaXplOiBzaXplLFxuICAgICAgICAgICAgZGlyZWN0aW9uOiB0aGlzLl9kaXJlY3Rpb24sXG4gICAgICAgICAgICByZXZlcnNlOiB0aGlzLm9wdGlvbnMuYWxpZ25tZW50ID8gdHJ1ZSA6IGZhbHNlLFxuICAgICAgICAgICAgc2Nyb2xsT2Zmc2V0OiB0aGlzLm9wdGlvbnMuYWxpZ25tZW50ID8gc2Nyb2xsT2Zmc2V0ICsgc2l6ZVt0aGlzLl9kaXJlY3Rpb25dIDogc2Nyb2xsT2Zmc2V0LFxuICAgICAgICAgICAgc2Nyb2xsU3RhcnQ6IHNjcm9sbFN0YXJ0LFxuICAgICAgICAgICAgc2Nyb2xsRW5kOiBzY3JvbGxFbmRcbiAgICAgICAgfSk7XG4gICAgaWYgKHRoaXMuX2xheW91dC5fZnVuY3Rpb24pIHtcbiAgICAgICAgdGhpcy5fbGF5b3V0Ll9mdW5jdGlvbihsYXlvdXRDb250ZXh0LCB0aGlzLl9sYXlvdXQub3B0aW9ucyk7XG4gICAgfVxuICAgIHRoaXMuX3Njcm9sbC51bm5vcm1hbGl6ZWRTY3JvbGxPZmZzZXQgPSBzY3JvbGxPZmZzZXQ7XG4gICAgaWYgKHRoaXMuX3Bvc3RMYXlvdXQpIHtcbiAgICAgICAgdGhpcy5fcG9zdExheW91dChzaXplLCBzY3JvbGxPZmZzZXQpO1xuICAgIH1cbiAgICB0aGlzLl9ub2Rlcy5yZW1vdmVOb25JbnZhbGlkYXRlZE5vZGVzKHRoaXMub3B0aW9ucy5yZW1vdmVTcGVjKTtcbiAgICBfY2FsY0JvdW5kcy5jYWxsKHRoaXMsIHNpemUsIHNjcm9sbE9mZnNldCk7XG4gICAgX2NhbGNTY3JvbGxUb09mZnNldC5jYWxsKHRoaXMsIHNpemUsIHNjcm9sbE9mZnNldCk7XG4gICAgX3NuYXBUb1BhZ2UuY2FsbCh0aGlzKTtcbiAgICB2YXIgbmV3U2Nyb2xsT2Zmc2V0ID0gX2NhbGNTY3JvbGxPZmZzZXQuY2FsbCh0aGlzLCB0cnVlKTtcbiAgICBpZiAoIW5lc3RlZCAmJiBuZXdTY3JvbGxPZmZzZXQgIT09IHNjcm9sbE9mZnNldCkge1xuICAgICAgICByZXR1cm4gX2xheW91dC5jYWxsKHRoaXMsIHNpemUsIG5ld1Njcm9sbE9mZnNldCwgdHJ1ZSk7XG4gICAgfVxuICAgIHNjcm9sbE9mZnNldCA9IF9ub3JtYWxpemVWaWV3U2VxdWVuY2UuY2FsbCh0aGlzLCBzaXplLCBzY3JvbGxPZmZzZXQpO1xuICAgIF91cGRhdGVTcHJpbmcuY2FsbCh0aGlzKTtcbiAgICB0aGlzLl9ub2Rlcy5yZW1vdmVWaXJ0dWFsVmlld1NlcXVlbmNlTm9kZXMoKTtcbiAgICByZXR1cm4gc2Nyb2xsT2Zmc2V0O1xufVxuZnVuY3Rpb24gX2lubmVyUmVuZGVyKCkge1xuICAgIHZhciBzcGVjcyA9IHRoaXMuX3NwZWNzO1xuICAgIGZvciAodmFyIGkzID0gMCwgajMgPSBzcGVjcy5sZW5ndGg7IGkzIDwgajM7IGkzKyspIHtcbiAgICAgICAgc3BlY3NbaTNdLnRhcmdldCA9IHNwZWNzW2kzXS5yZW5kZXJOb2RlLnJlbmRlcigpO1xuICAgIH1cbiAgICByZXR1cm4gc3BlY3M7XG59XG5TY3JvbGxDb250cm9sbGVyLnByb3RvdHlwZS5jb21taXQgPSBmdW5jdGlvbiBjb21taXQoY29udGV4dCkge1xuICAgIHZhciBzaXplID0gY29udGV4dC5zaXplO1xuICAgIHRoaXMuX2RlYnVnLmNvbW1pdENvdW50Kys7XG4gICAgdmFyIHNjcm9sbE9mZnNldCA9IF9jYWxjU2Nyb2xsT2Zmc2V0LmNhbGwodGhpcywgdHJ1ZSwgdHJ1ZSk7XG4gICAgaWYgKHRoaXMuX3Njcm9sbE9mZnNldENhY2hlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5fc2Nyb2xsT2Zmc2V0Q2FjaGUgPSBzY3JvbGxPZmZzZXQ7XG4gICAgfVxuICAgIHZhciBlbWl0RW5kU2Nyb2xsaW5nRXZlbnQgPSBmYWxzZTtcbiAgICB2YXIgZW1pdFNjcm9sbEV2ZW50ID0gZmFsc2U7XG4gICAgdmFyIGV2ZW50RGF0YTtcbiAgICBpZiAoc2l6ZVswXSAhPT0gdGhpcy5fY29udGV4dFNpemVDYWNoZVswXSB8fCBzaXplWzFdICE9PSB0aGlzLl9jb250ZXh0U2l6ZUNhY2hlWzFdIHx8IHRoaXMuX2lzRGlydHkgfHwgdGhpcy5fc2Nyb2xsLnNjcm9sbERpcnR5IHx8IHRoaXMuX25vZGVzLl90cnVlU2l6ZVJlcXVlc3RlZCB8fCB0aGlzLm9wdGlvbnMuYWx3YXlzTGF5b3V0IHx8IHRoaXMuX3Njcm9sbE9mZnNldENhY2hlICE9PSBzY3JvbGxPZmZzZXQpIHtcbiAgICAgICAgZXZlbnREYXRhID0ge1xuICAgICAgICAgICAgdGFyZ2V0OiB0aGlzLFxuICAgICAgICAgICAgb2xkU2l6ZTogdGhpcy5fY29udGV4dFNpemVDYWNoZSxcbiAgICAgICAgICAgIHNpemU6IHNpemUsXG4gICAgICAgICAgICBvbGRTY3JvbGxPZmZzZXQ6IHRoaXMuX3Njcm9sbE9mZnNldENhY2hlLFxuICAgICAgICAgICAgc2Nyb2xsT2Zmc2V0OiBzY3JvbGxPZmZzZXRcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHRoaXMuX3Njcm9sbE9mZnNldENhY2hlICE9PSBzY3JvbGxPZmZzZXQpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5fc2Nyb2xsLmlzU2Nyb2xsaW5nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2Nyb2xsLmlzU2Nyb2xsaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLl9ldmVudE91dHB1dC5lbWl0KCdzY3JvbGxzdGFydCcsIGV2ZW50RGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbWl0U2Nyb2xsRXZlbnQgPSB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX3Njcm9sbC5pc1Njcm9sbGluZyAmJiAhdGhpcy5fc2Nyb2xsLnNjcm9sbEZvcmNlQ291bnQpIHtcbiAgICAgICAgICAgIGVtaXRFbmRTY3JvbGxpbmdFdmVudCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fZXZlbnRPdXRwdXQuZW1pdCgnbGF5b3V0c3RhcnQnLCBldmVudERhdGEpO1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmZsb3cgJiYgKHRoaXMuX2lzRGlydHkgfHwgdGhpcy5vcHRpb25zLnJlZmxvd09uUmVzaXplICYmIChzaXplWzBdICE9PSB0aGlzLl9jb250ZXh0U2l6ZUNhY2hlWzBdIHx8IHNpemVbMV0gIT09IHRoaXMuX2NvbnRleHRTaXplQ2FjaGVbMV0pKSkge1xuICAgICAgICAgICAgdmFyIG5vZGUgPSB0aGlzLl9ub2Rlcy5nZXRTdGFydEVudW1Ob2RlKCk7XG4gICAgICAgICAgICB3aGlsZSAobm9kZSkge1xuICAgICAgICAgICAgICAgIG5vZGUucmVsZWFzZUxvY2soKTtcbiAgICAgICAgICAgICAgICBub2RlID0gbm9kZS5fbmV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9jb250ZXh0U2l6ZUNhY2hlWzBdID0gc2l6ZVswXTtcbiAgICAgICAgdGhpcy5fY29udGV4dFNpemVDYWNoZVsxXSA9IHNpemVbMV07XG4gICAgICAgIHRoaXMuX2lzRGlydHkgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fc2Nyb2xsLnNjcm9sbERpcnR5ID0gZmFsc2U7XG4gICAgICAgIHNjcm9sbE9mZnNldCA9IF9sYXlvdXQuY2FsbCh0aGlzLCBzaXplLCBzY3JvbGxPZmZzZXQpO1xuICAgICAgICB0aGlzLl9zY3JvbGxPZmZzZXRDYWNoZSA9IHNjcm9sbE9mZnNldDtcbiAgICAgICAgZXZlbnREYXRhLnNjcm9sbE9mZnNldCA9IHRoaXMuX3Njcm9sbE9mZnNldENhY2hlO1xuICAgICAgICB0aGlzLl9ldmVudE91dHB1dC5lbWl0KCdsYXlvdXRlbmQnLCBldmVudERhdGEpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fc2Nyb2xsLmlzU2Nyb2xsaW5nICYmICF0aGlzLl9zY3JvbGwuc2Nyb2xsRm9yY2VDb3VudCkge1xuICAgICAgICBlbWl0RW5kU2Nyb2xsaW5nRXZlbnQgPSB0cnVlO1xuICAgIH1cbiAgICB2YXIgZ3JvdXBUcmFuc2xhdGUgPSB0aGlzLl9zY3JvbGwuZ3JvdXBUcmFuc2xhdGU7XG4gICAgZ3JvdXBUcmFuc2xhdGVbMF0gPSAwO1xuICAgIGdyb3VwVHJhbnNsYXRlWzFdID0gMDtcbiAgICBncm91cFRyYW5zbGF0ZVsyXSA9IDA7XG4gICAgZ3JvdXBUcmFuc2xhdGVbdGhpcy5fZGlyZWN0aW9uXSA9IC10aGlzLl9zY3JvbGwuZ3JvdXBTdGFydCAtIHNjcm9sbE9mZnNldDtcbiAgICB2YXIgc2VxdWVudGlhbFNjcm9sbGluZ09wdGltaXplZCA9IHRoaXMuX2xheW91dC5jYXBhYmlsaXRpZXMgPyB0aGlzLl9sYXlvdXQuY2FwYWJpbGl0aWVzLnNlcXVlbnRpYWxTY3JvbGxpbmdPcHRpbWl6ZWQgOiBmYWxzZTtcbiAgICB2YXIgcmVzdWx0ID0gdGhpcy5fbm9kZXMuYnVpbGRTcGVjQW5kRGVzdHJveVVucmVuZGVyZWROb2RlcyhzZXF1ZW50aWFsU2Nyb2xsaW5nT3B0aW1pemVkID8gZ3JvdXBUcmFuc2xhdGUgOiB1bmRlZmluZWQpO1xuICAgIHRoaXMuX3NwZWNzID0gcmVzdWx0LnNwZWNzO1xuICAgIGlmIChyZXN1bHQubW9kaWZpZWQpIHtcbiAgICAgICAgdGhpcy5fZXZlbnRPdXRwdXQuZW1pdCgncmVmbG93JywgeyB0YXJnZXQ6IHRoaXMgfSk7XG4gICAgfVxuICAgIGlmIChlbWl0U2Nyb2xsRXZlbnQpIHtcbiAgICAgICAgdGhpcy5fZXZlbnRPdXRwdXQuZW1pdCgnc2Nyb2xsJywgZXZlbnREYXRhKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50RGF0YSkge1xuICAgICAgICB2YXIgdmlzaWJsZUl0ZW0gPSB0aGlzLm9wdGlvbnMuYWxpZ25tZW50ID8gdGhpcy5nZXRMYXN0VmlzaWJsZUl0ZW0oKSA6IHRoaXMuZ2V0Rmlyc3RWaXNpYmxlSXRlbSgpO1xuICAgICAgICBpZiAodmlzaWJsZUl0ZW0gJiYgIXRoaXMuX3Zpc2libGVJdGVtQ2FjaGUgfHwgIXZpc2libGVJdGVtICYmIHRoaXMuX3Zpc2libGVJdGVtQ2FjaGUgfHwgdmlzaWJsZUl0ZW0gJiYgdGhpcy5fdmlzaWJsZUl0ZW1DYWNoZSAmJiB2aXNpYmxlSXRlbS5yZW5kZXJOb2RlICE9PSB0aGlzLl92aXNpYmxlSXRlbUNhY2hlLnJlbmRlck5vZGUpIHtcbiAgICAgICAgICAgIHRoaXMuX2V2ZW50T3V0cHV0LmVtaXQoJ3BhZ2VjaGFuZ2UnLCB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0OiB0aGlzLFxuICAgICAgICAgICAgICAgIG9sZFZpZXdTZXF1ZW5jZTogdGhpcy5fdmlzaWJsZUl0ZW1DYWNoZSA/IHRoaXMuX3Zpc2libGVJdGVtQ2FjaGUudmlld1NlcXVlbmNlIDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgIHZpZXdTZXF1ZW5jZTogdmlzaWJsZUl0ZW0gPyB2aXNpYmxlSXRlbS52aWV3U2VxdWVuY2UgOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgb2xkSW5kZXg6IHRoaXMuX3Zpc2libGVJdGVtQ2FjaGUgPyB0aGlzLl92aXNpYmxlSXRlbUNhY2hlLmluZGV4IDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgIGluZGV4OiB2aXNpYmxlSXRlbSA/IHZpc2libGVJdGVtLmluZGV4IDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgIHJlbmRlck5vZGU6IHZpc2libGVJdGVtID8gdmlzaWJsZUl0ZW0ucmVuZGVyTm9kZSA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICBvbGRSZW5kZXJOb2RlOiB0aGlzLl92aXNpYmxlSXRlbUNhY2hlID8gdGhpcy5fdmlzaWJsZUl0ZW1DYWNoZS5yZW5kZXJOb2RlIDogdW5kZWZpbmVkXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuX3Zpc2libGVJdGVtQ2FjaGUgPSB2aXNpYmxlSXRlbTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoZW1pdEVuZFNjcm9sbGluZ0V2ZW50KSB7XG4gICAgICAgIHRoaXMuX3Njcm9sbC5pc1Njcm9sbGluZyA9IGZhbHNlO1xuICAgICAgICBldmVudERhdGEgPSB7XG4gICAgICAgICAgICB0YXJnZXQ6IHRoaXMsXG4gICAgICAgICAgICBvbGRTaXplOiBzaXplLFxuICAgICAgICAgICAgc2l6ZTogc2l6ZSxcbiAgICAgICAgICAgIG9sZFNjcm9sbE9mZnNldDogc2Nyb2xsT2Zmc2V0LFxuICAgICAgICAgICAgc2Nyb2xsT2Zmc2V0OiBzY3JvbGxPZmZzZXRcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5fZXZlbnRPdXRwdXQuZW1pdCgnc2Nyb2xsZW5kJywgZXZlbnREYXRhKTtcbiAgICB9XG4gICAgdmFyIHRyYW5zZm9ybSA9IGNvbnRleHQudHJhbnNmb3JtO1xuICAgIGlmIChzZXF1ZW50aWFsU2Nyb2xsaW5nT3B0aW1pemVkKSB7XG4gICAgICAgIHZhciB3aW5kb3dPZmZzZXQgPSBzY3JvbGxPZmZzZXQgKyB0aGlzLl9zY3JvbGwuZ3JvdXBTdGFydDtcbiAgICAgICAgdmFyIHRyYW5zbGF0ZSA9IFtcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgMFxuICAgICAgICAgICAgXTtcbiAgICAgICAgdHJhbnNsYXRlW3RoaXMuX2RpcmVjdGlvbl0gPSB3aW5kb3dPZmZzZXQ7XG4gICAgICAgIHRyYW5zZm9ybSA9IFRyYW5zZm9ybS50aGVuTW92ZSh0cmFuc2Zvcm0sIHRyYW5zbGF0ZSk7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNmb3JtLFxuICAgICAgICBzaXplOiBzaXplLFxuICAgICAgICBvcGFjaXR5OiBjb250ZXh0Lm9wYWNpdHksXG4gICAgICAgIG9yaWdpbjogY29udGV4dC5vcmlnaW4sXG4gICAgICAgIHRhcmdldDogdGhpcy5ncm91cC5yZW5kZXIoKVxuICAgIH07XG59O1xuU2Nyb2xsQ29udHJvbGxlci5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgIGlmICh0aGlzLmNvbnRhaW5lcikge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250YWluZXIucmVuZGVyLmFwcGx5KHRoaXMuY29udGFpbmVyLCBhcmd1bWVudHMpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlkO1xuICAgIH1cbn07XG5tb2R1bGUuZXhwb3J0cyA9IFNjcm9sbENvbnRyb2xsZXI7IiwidmFyIEV2ZW50SGFuZGxlciA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gd2luZG93LmZhbW91cy5jb3JlLkV2ZW50SGFuZGxlciA6IHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnID8gZ2xvYmFsLmZhbW91cy5jb3JlLkV2ZW50SGFuZGxlciA6IG51bGw7XG5mdW5jdGlvbiBWaXJ0dWFsVmlld1NlcXVlbmNlKG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICB0aGlzLl8gPSBvcHRpb25zLl8gfHwgbmV3IHRoaXMuY29uc3RydWN0b3IuQmFja2luZyhvcHRpb25zKTtcbiAgICB0aGlzLnRvdWNoZWQgPSB0cnVlO1xuICAgIHRoaXMudmFsdWUgPSBvcHRpb25zLnZhbHVlIHx8IHRoaXMuXy5mYWN0b3J5LmNyZWF0ZSgpO1xuICAgIHRoaXMuaW5kZXggPSBvcHRpb25zLmluZGV4IHx8IDA7XG4gICAgdGhpcy5uZXh0ID0gb3B0aW9ucy5uZXh0O1xuICAgIHRoaXMucHJldiA9IG9wdGlvbnMucHJldjtcbiAgICBFdmVudEhhbmRsZXIuc2V0T3V0cHV0SGFuZGxlcih0aGlzLCB0aGlzLl8uZXZlbnRPdXRwdXQpO1xuICAgIHRoaXMudmFsdWUucGlwZSh0aGlzLl8uZXZlbnRPdXRwdXQpO1xufVxuVmlydHVhbFZpZXdTZXF1ZW5jZS5CYWNraW5nID0gZnVuY3Rpb24gQmFja2luZyhvcHRpb25zKSB7XG4gICAgdGhpcy5mYWN0b3J5ID0gb3B0aW9ucy5mYWN0b3J5O1xuICAgIHRoaXMuZXZlbnRPdXRwdXQgPSBuZXcgRXZlbnRIYW5kbGVyKCk7XG59O1xuVmlydHVhbFZpZXdTZXF1ZW5jZS5wcm90b3R5cGUuZ2V0UHJldmlvdXMgPSBmdW5jdGlvbiAobm9DcmVhdGUpIHtcbiAgICBpZiAodGhpcy5wcmV2KSB7XG4gICAgICAgIHRoaXMucHJldi50b3VjaGVkID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJldjtcbiAgICB9XG4gICAgaWYgKG5vQ3JlYXRlKSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHZhciB2YWx1ZSA9IHRoaXMuXy5mYWN0b3J5LmNyZWF0ZVByZXZpb3VzKHRoaXMuZ2V0KCkpO1xuICAgIGlmICghdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgdGhpcy5wcmV2ID0gbmV3IFZpcnR1YWxWaWV3U2VxdWVuY2Uoe1xuICAgICAgICBfOiB0aGlzLl8sXG4gICAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgaW5kZXg6IHRoaXMuaW5kZXggLSAxLFxuICAgICAgICBuZXh0OiB0aGlzXG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXMucHJldjtcbn07XG5WaXJ0dWFsVmlld1NlcXVlbmNlLnByb3RvdHlwZS5nZXROZXh0ID0gZnVuY3Rpb24gKG5vQ3JlYXRlKSB7XG4gICAgaWYgKHRoaXMubmV4dCkge1xuICAgICAgICB0aGlzLm5leHQudG91Y2hlZCA9IHRydWU7XG4gICAgICAgIHJldHVybiB0aGlzLm5leHQ7XG4gICAgfVxuICAgIGlmIChub0NyZWF0ZSkge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICB2YXIgdmFsdWUgPSB0aGlzLl8uZmFjdG9yeS5jcmVhdGVOZXh0KHRoaXMuZ2V0KCkpO1xuICAgIGlmICghdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgdGhpcy5uZXh0ID0gbmV3IFZpcnR1YWxWaWV3U2VxdWVuY2Uoe1xuICAgICAgICBfOiB0aGlzLl8sXG4gICAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgaW5kZXg6IHRoaXMuaW5kZXggKyAxLFxuICAgICAgICBwcmV2OiB0aGlzXG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXMubmV4dDtcbn07XG5WaXJ0dWFsVmlld1NlcXVlbmNlLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy50b3VjaGVkID0gdHJ1ZTtcbiAgICByZXR1cm4gdGhpcy52YWx1ZTtcbn07XG5WaXJ0dWFsVmlld1NlcXVlbmNlLnByb3RvdHlwZS5nZXRJbmRleCA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnRvdWNoZWQgPSB0cnVlO1xuICAgIHJldHVybiB0aGlzLmluZGV4O1xufTtcblZpcnR1YWxWaWV3U2VxdWVuY2UucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiAnJyArIHRoaXMuaW5kZXg7XG59O1xuVmlydHVhbFZpZXdTZXF1ZW5jZS5wcm90b3R5cGUuY2xlYW51cCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgbm9kZSA9IHRoaXMucHJldjtcbiAgICB3aGlsZSAobm9kZSkge1xuICAgICAgICBpZiAoIW5vZGUudG91Y2hlZCkge1xuICAgICAgICAgICAgbm9kZS5uZXh0LnByZXYgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBub2RlLm5leHQgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBpZiAodGhpcy5fLmZhY3RvcnkuZGVzdHJveSkge1xuICAgICAgICAgICAgICAgIHdoaWxlIChub2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuXy5mYWN0b3J5LmRlc3Ryb3kobm9kZS52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUgPSBub2RlLnByZXY7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgbm9kZS50b3VjaGVkID0gZmFsc2U7XG4gICAgICAgIG5vZGUgPSBub2RlLnByZXY7XG4gICAgfVxuICAgIG5vZGUgPSB0aGlzLm5leHQ7XG4gICAgd2hpbGUgKG5vZGUpIHtcbiAgICAgICAgaWYgKCFub2RlLnRvdWNoZWQpIHtcbiAgICAgICAgICAgIG5vZGUucHJldi5uZXh0ID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgbm9kZS5wcmV2ID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgaWYgKHRoaXMuXy5mYWN0b3J5LmRlc3Ryb3kpIHtcbiAgICAgICAgICAgICAgICB3aGlsZSAobm9kZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl8uZmFjdG9yeS5kZXN0cm95KG5vZGUudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBub2RlID0gbm9kZS5uZXh0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIG5vZGUudG91Y2hlZCA9IGZhbHNlO1xuICAgICAgICBub2RlID0gbm9kZS5uZXh0O1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbn07XG5WaXJ0dWFsVmlld1NlcXVlbmNlLnByb3RvdHlwZS51bnNoaWZ0ID0gZnVuY3Rpb24gKCkge1xuICAgIGlmIChjb25zb2xlLmVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ1ZpcnR1YWxWaWV3U2VxdWVuY2UudW5zaGlmdCBpcyBub3Qgc3VwcG9ydGVkIGFuZCBzaG91bGQgbm90IGJlIGNhbGxlZCcpO1xuICAgIH1cbn07XG5WaXJ0dWFsVmlld1NlcXVlbmNlLnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24gKCkge1xuICAgIGlmIChjb25zb2xlLmVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ1ZpcnR1YWxWaWV3U2VxdWVuY2UucHVzaCBpcyBub3Qgc3VwcG9ydGVkIGFuZCBzaG91bGQgbm90IGJlIGNhbGxlZCcpO1xuICAgIH1cbn07XG5WaXJ0dWFsVmlld1NlcXVlbmNlLnByb3RvdHlwZS5zcGxpY2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKGNvbnNvbGUuZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignVmlydHVhbFZpZXdTZXF1ZW5jZS5zcGxpY2UgaXMgbm90IHN1cHBvcnRlZCBhbmQgc2hvdWxkIG5vdCBiZSBjYWxsZWQnKTtcbiAgICB9XG59O1xuVmlydHVhbFZpZXdTZXF1ZW5jZS5wcm90b3R5cGUuc3dhcCA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoY29uc29sZS5lcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdWaXJ0dWFsVmlld1NlcXVlbmNlLnN3YXAgaXMgbm90IHN1cHBvcnRlZCBhbmQgc2hvdWxkIG5vdCBiZSBjYWxsZWQnKTtcbiAgICB9XG59O1xubW9kdWxlLmV4cG9ydHMgPSBWaXJ0dWFsVmlld1NlcXVlbmNlOyIsInZhciBMYXlvdXRVdGlsaXR5ID0gcmVxdWlyZSgnLi4vTGF5b3V0VXRpbGl0eScpO1xuZnVuY3Rpb24gTGF5b3V0RG9ja0hlbHBlcihjb250ZXh0LCBvcHRpb25zKSB7XG4gICAgdmFyIHNpemUgPSBjb250ZXh0LnNpemU7XG4gICAgdGhpcy5fc2l6ZSA9IHNpemU7XG4gICAgdGhpcy5fY29udGV4dCA9IGNvbnRleHQ7XG4gICAgdGhpcy5fb3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgdGhpcy5feiA9IG9wdGlvbnMgJiYgb3B0aW9ucy50cmFuc2xhdGVaID8gb3B0aW9ucy50cmFuc2xhdGVaIDogMDtcbiAgICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLm1hcmdpbnMpIHtcbiAgICAgICAgdmFyIG1hcmdpbnMgPSBMYXlvdXRVdGlsaXR5Lm5vcm1hbGl6ZU1hcmdpbnMob3B0aW9ucy5tYXJnaW5zKTtcbiAgICAgICAgdGhpcy5fbGVmdCA9IG1hcmdpbnNbM107XG4gICAgICAgIHRoaXMuX3RvcCA9IG1hcmdpbnNbMF07XG4gICAgICAgIHRoaXMuX3JpZ2h0ID0gc2l6ZVswXSAtIG1hcmdpbnNbMV07XG4gICAgICAgIHRoaXMuX2JvdHRvbSA9IHNpemVbMV0gLSBtYXJnaW5zWzJdO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX2xlZnQgPSAwO1xuICAgICAgICB0aGlzLl90b3AgPSAwO1xuICAgICAgICB0aGlzLl9yaWdodCA9IHNpemVbMF07XG4gICAgICAgIHRoaXMuX2JvdHRvbSA9IHNpemVbMV07XG4gICAgfVxufVxuTGF5b3V0RG9ja0hlbHBlci5wcm90b3R5cGUucGFyc2UgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgcnVsZSA9IGRhdGFbaV07XG4gICAgICAgIHZhciB2YWx1ZSA9IHJ1bGUubGVuZ3RoID49IDMgPyBydWxlWzJdIDogdW5kZWZpbmVkO1xuICAgICAgICBpZiAocnVsZVswXSA9PT0gJ3RvcCcpIHtcbiAgICAgICAgICAgIHRoaXMudG9wKHJ1bGVbMV0sIHZhbHVlLCBydWxlLmxlbmd0aCA+PSA0ID8gcnVsZVszXSA6IHVuZGVmaW5lZCk7XG4gICAgICAgIH0gZWxzZSBpZiAocnVsZVswXSA9PT0gJ2xlZnQnKSB7XG4gICAgICAgICAgICB0aGlzLmxlZnQocnVsZVsxXSwgdmFsdWUsIHJ1bGUubGVuZ3RoID49IDQgPyBydWxlWzNdIDogdW5kZWZpbmVkKTtcbiAgICAgICAgfSBlbHNlIGlmIChydWxlWzBdID09PSAncmlnaHQnKSB7XG4gICAgICAgICAgICB0aGlzLnJpZ2h0KHJ1bGVbMV0sIHZhbHVlLCBydWxlLmxlbmd0aCA+PSA0ID8gcnVsZVszXSA6IHVuZGVmaW5lZCk7XG4gICAgICAgIH0gZWxzZSBpZiAocnVsZVswXSA9PT0gJ2JvdHRvbScpIHtcbiAgICAgICAgICAgIHRoaXMuYm90dG9tKHJ1bGVbMV0sIHZhbHVlLCBydWxlLmxlbmd0aCA+PSA0ID8gcnVsZVszXSA6IHVuZGVmaW5lZCk7XG4gICAgICAgIH0gZWxzZSBpZiAocnVsZVswXSA9PT0gJ2ZpbGwnKSB7XG4gICAgICAgICAgICB0aGlzLmZpbGwocnVsZVsxXSwgcnVsZS5sZW5ndGggPj0gMyA/IHJ1bGVbMl0gOiB1bmRlZmluZWQpO1xuICAgICAgICB9IGVsc2UgaWYgKHJ1bGVbMF0gPT09ICdtYXJnaW5zJykge1xuICAgICAgICAgICAgdGhpcy5tYXJnaW5zKHJ1bGVbMV0pO1xuICAgICAgICB9XG4gICAgfVxufTtcbkxheW91dERvY2tIZWxwZXIucHJvdG90eXBlLnRvcCA9IGZ1bmN0aW9uIChub2RlLCBoZWlnaHQsIHopIHtcbiAgICBpZiAoaGVpZ2h0IGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgaGVpZ2h0ID0gaGVpZ2h0WzFdO1xuICAgIH1cbiAgICBpZiAoaGVpZ2h0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdmFyIHNpemUgPSB0aGlzLl9jb250ZXh0LnJlc29sdmVTaXplKG5vZGUsIFtcbiAgICAgICAgICAgICAgICB0aGlzLl9yaWdodCAtIHRoaXMuX2xlZnQsXG4gICAgICAgICAgICAgICAgdGhpcy5fYm90dG9tIC0gdGhpcy5fdG9wXG4gICAgICAgICAgICBdKTtcbiAgICAgICAgaGVpZ2h0ID0gc2l6ZVsxXTtcbiAgICB9XG4gICAgdGhpcy5fY29udGV4dC5zZXQobm9kZSwge1xuICAgICAgICBzaXplOiBbXG4gICAgICAgICAgICB0aGlzLl9yaWdodCAtIHRoaXMuX2xlZnQsXG4gICAgICAgICAgICBoZWlnaHRcbiAgICAgICAgXSxcbiAgICAgICAgb3JpZ2luOiBbXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMFxuICAgICAgICBdLFxuICAgICAgICBhbGlnbjogW1xuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDBcbiAgICAgICAgXSxcbiAgICAgICAgdHJhbnNsYXRlOiBbXG4gICAgICAgICAgICB0aGlzLl9sZWZ0LFxuICAgICAgICAgICAgdGhpcy5fdG9wLFxuICAgICAgICAgICAgeiA9PT0gdW5kZWZpbmVkID8gdGhpcy5feiA6IHpcbiAgICAgICAgXVxuICAgIH0pO1xuICAgIHRoaXMuX3RvcCArPSBoZWlnaHQ7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuTGF5b3V0RG9ja0hlbHBlci5wcm90b3R5cGUubGVmdCA9IGZ1bmN0aW9uIChub2RlLCB3aWR0aCwgeikge1xuICAgIGlmICh3aWR0aCBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgIHdpZHRoID0gd2lkdGhbMF07XG4gICAgfVxuICAgIGlmICh3aWR0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHZhciBzaXplID0gdGhpcy5fY29udGV4dC5yZXNvbHZlU2l6ZShub2RlLCBbXG4gICAgICAgICAgICAgICAgdGhpcy5fcmlnaHQgLSB0aGlzLl9sZWZ0LFxuICAgICAgICAgICAgICAgIHRoaXMuX2JvdHRvbSAtIHRoaXMuX3RvcFxuICAgICAgICAgICAgXSk7XG4gICAgICAgIHdpZHRoID0gc2l6ZVswXTtcbiAgICB9XG4gICAgdGhpcy5fY29udGV4dC5zZXQobm9kZSwge1xuICAgICAgICBzaXplOiBbXG4gICAgICAgICAgICB3aWR0aCxcbiAgICAgICAgICAgIHRoaXMuX2JvdHRvbSAtIHRoaXMuX3RvcFxuICAgICAgICBdLFxuICAgICAgICBvcmlnaW46IFtcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwXG4gICAgICAgIF0sXG4gICAgICAgIGFsaWduOiBbXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMFxuICAgICAgICBdLFxuICAgICAgICB0cmFuc2xhdGU6IFtcbiAgICAgICAgICAgIHRoaXMuX2xlZnQsXG4gICAgICAgICAgICB0aGlzLl90b3AsXG4gICAgICAgICAgICB6ID09PSB1bmRlZmluZWQgPyB0aGlzLl96IDogelxuICAgICAgICBdXG4gICAgfSk7XG4gICAgdGhpcy5fbGVmdCArPSB3aWR0aDtcbiAgICByZXR1cm4gdGhpcztcbn07XG5MYXlvdXREb2NrSGVscGVyLnByb3RvdHlwZS5ib3R0b20gPSBmdW5jdGlvbiAobm9kZSwgaGVpZ2h0LCB6KSB7XG4gICAgaWYgKGhlaWdodCBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgIGhlaWdodCA9IGhlaWdodFsxXTtcbiAgICB9XG4gICAgaWYgKGhlaWdodCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHZhciBzaXplID0gdGhpcy5fY29udGV4dC5yZXNvbHZlU2l6ZShub2RlLCBbXG4gICAgICAgICAgICAgICAgdGhpcy5fcmlnaHQgLSB0aGlzLl9sZWZ0LFxuICAgICAgICAgICAgICAgIHRoaXMuX2JvdHRvbSAtIHRoaXMuX3RvcFxuICAgICAgICAgICAgXSk7XG4gICAgICAgIGhlaWdodCA9IHNpemVbMV07XG4gICAgfVxuICAgIHRoaXMuX2NvbnRleHQuc2V0KG5vZGUsIHtcbiAgICAgICAgc2l6ZTogW1xuICAgICAgICAgICAgdGhpcy5fcmlnaHQgLSB0aGlzLl9sZWZ0LFxuICAgICAgICAgICAgaGVpZ2h0XG4gICAgICAgIF0sXG4gICAgICAgIG9yaWdpbjogW1xuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDFcbiAgICAgICAgXSxcbiAgICAgICAgYWxpZ246IFtcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAxXG4gICAgICAgIF0sXG4gICAgICAgIHRyYW5zbGF0ZTogW1xuICAgICAgICAgICAgdGhpcy5fbGVmdCxcbiAgICAgICAgICAgIC0odGhpcy5fc2l6ZVsxXSAtIHRoaXMuX2JvdHRvbSksXG4gICAgICAgICAgICB6ID09PSB1bmRlZmluZWQgPyB0aGlzLl96IDogelxuICAgICAgICBdXG4gICAgfSk7XG4gICAgdGhpcy5fYm90dG9tIC09IGhlaWdodDtcbiAgICByZXR1cm4gdGhpcztcbn07XG5MYXlvdXREb2NrSGVscGVyLnByb3RvdHlwZS5yaWdodCA9IGZ1bmN0aW9uIChub2RlLCB3aWR0aCwgeikge1xuICAgIGlmICh3aWR0aCBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgIHdpZHRoID0gd2lkdGhbMF07XG4gICAgfVxuICAgIGlmIChub2RlKSB7XG4gICAgICAgIGlmICh3aWR0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB2YXIgc2l6ZSA9IHRoaXMuX2NvbnRleHQucmVzb2x2ZVNpemUobm9kZSwgW1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yaWdodCAtIHRoaXMuX2xlZnQsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2JvdHRvbSAtIHRoaXMuX3RvcFxuICAgICAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgd2lkdGggPSBzaXplWzBdO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2NvbnRleHQuc2V0KG5vZGUsIHtcbiAgICAgICAgICAgIHNpemU6IFtcbiAgICAgICAgICAgICAgICB3aWR0aCxcbiAgICAgICAgICAgICAgICB0aGlzLl9ib3R0b20gLSB0aGlzLl90b3BcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBvcmlnaW46IFtcbiAgICAgICAgICAgICAgICAxLFxuICAgICAgICAgICAgICAgIDBcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBhbGlnbjogW1xuICAgICAgICAgICAgICAgIDEsXG4gICAgICAgICAgICAgICAgMFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIHRyYW5zbGF0ZTogW1xuICAgICAgICAgICAgICAgIC0odGhpcy5fc2l6ZVswXSAtIHRoaXMuX3JpZ2h0KSxcbiAgICAgICAgICAgICAgICB0aGlzLl90b3AsXG4gICAgICAgICAgICAgICAgeiA9PT0gdW5kZWZpbmVkID8gdGhpcy5feiA6IHpcbiAgICAgICAgICAgIF1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGlmICh3aWR0aCkge1xuICAgICAgICB0aGlzLl9yaWdodCAtPSB3aWR0aDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuTGF5b3V0RG9ja0hlbHBlci5wcm90b3R5cGUuZmlsbCA9IGZ1bmN0aW9uIChub2RlLCB6KSB7XG4gICAgdGhpcy5fY29udGV4dC5zZXQobm9kZSwge1xuICAgICAgICBzaXplOiBbXG4gICAgICAgICAgICB0aGlzLl9yaWdodCAtIHRoaXMuX2xlZnQsXG4gICAgICAgICAgICB0aGlzLl9ib3R0b20gLSB0aGlzLl90b3BcbiAgICAgICAgXSxcbiAgICAgICAgdHJhbnNsYXRlOiBbXG4gICAgICAgICAgICB0aGlzLl9sZWZ0LFxuICAgICAgICAgICAgdGhpcy5fdG9wLFxuICAgICAgICAgICAgeiA9PT0gdW5kZWZpbmVkID8gdGhpcy5feiA6IHpcbiAgICAgICAgXVxuICAgIH0pO1xuICAgIHJldHVybiB0aGlzO1xufTtcbkxheW91dERvY2tIZWxwZXIucHJvdG90eXBlLm1hcmdpbnMgPSBmdW5jdGlvbiAobWFyZ2lucykge1xuICAgIG1hcmdpbnMgPSBMYXlvdXRVdGlsaXR5Lm5vcm1hbGl6ZU1hcmdpbnMobWFyZ2lucyk7XG4gICAgdGhpcy5fbGVmdCArPSBtYXJnaW5zWzNdO1xuICAgIHRoaXMuX3RvcCArPSBtYXJnaW5zWzBdO1xuICAgIHRoaXMuX3JpZ2h0IC09IG1hcmdpbnNbMV07XG4gICAgdGhpcy5fYm90dG9tIC09IG1hcmdpbnNbMl07XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuTGF5b3V0VXRpbGl0eS5yZWdpc3RlckhlbHBlcignZG9jaycsIExheW91dERvY2tIZWxwZXIpO1xubW9kdWxlLmV4cG9ydHMgPSBMYXlvdXREb2NrSGVscGVyOyIsInZhciBVdGlsaXR5ID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cuZmFtb3VzLnV0aWxpdGllcy5VdGlsaXR5IDogdHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcgPyBnbG9iYWwuZmFtb3VzLnV0aWxpdGllcy5VdGlsaXR5IDogbnVsbDtcbnZhciBMYXlvdXRVdGlsaXR5ID0gcmVxdWlyZSgnLi4vTGF5b3V0VXRpbGl0eScpO1xudmFyIGNhcGFiaWxpdGllcyA9IHtcbiAgICAgICAgc2VxdWVuY2U6IHRydWUsXG4gICAgICAgIGRpcmVjdGlvbjogW1xuICAgICAgICAgICAgVXRpbGl0eS5EaXJlY3Rpb24uWSxcbiAgICAgICAgICAgIFV0aWxpdHkuRGlyZWN0aW9uLlhcbiAgICAgICAgXSxcbiAgICAgICAgc2Nyb2xsaW5nOiB0cnVlLFxuICAgICAgICB0cnVlU2l6ZTogdHJ1ZSxcbiAgICAgICAgc2VxdWVudGlhbFNjcm9sbGluZ09wdGltaXplZDogdHJ1ZVxuICAgIH07XG52YXIgY29udGV4dDtcbnZhciBzaXplO1xudmFyIGRpcmVjdGlvbjtcbnZhciBhbGlnbm1lbnQ7XG52YXIgbGluZURpcmVjdGlvbjtcbnZhciBsaW5lTGVuZ3RoO1xudmFyIG9mZnNldDtcbnZhciBtYXJnaW5zO1xudmFyIG1hcmdpbiA9IFtcbiAgICAgICAgMCxcbiAgICAgICAgMFxuICAgIF07XG52YXIgc3BhY2luZztcbnZhciBqdXN0aWZ5O1xudmFyIGl0ZW1TaXplO1xudmFyIGdldEl0ZW1TaXplO1xudmFyIGxpbmVOb2RlcztcbmZ1bmN0aW9uIF9sYXlvdXRMaW5lKG5leHQsIGVuZFJlYWNoZWQpIHtcbiAgICBpZiAoIWxpbmVOb2Rlcy5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICAgIHZhciBpO1xuICAgIHZhciBsaW5lU2l6ZSA9IFtcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwXG4gICAgICAgIF07XG4gICAgdmFyIGxpbmVOb2RlO1xuICAgIGZvciAoaSA9IDA7IGkgPCBsaW5lTm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGluZVNpemVbZGlyZWN0aW9uXSA9IE1hdGgubWF4KGxpbmVTaXplW2RpcmVjdGlvbl0sIGxpbmVOb2Rlc1tpXS5zaXplW2RpcmVjdGlvbl0pO1xuICAgICAgICBsaW5lU2l6ZVtsaW5lRGlyZWN0aW9uXSArPSAoaSA+IDAgPyBzcGFjaW5nW2xpbmVEaXJlY3Rpb25dIDogMCkgKyBsaW5lTm9kZXNbaV0uc2l6ZVtsaW5lRGlyZWN0aW9uXTtcbiAgICB9XG4gICAgdmFyIGp1c3RpZnlPZmZzZXQgPSBqdXN0aWZ5W2xpbmVEaXJlY3Rpb25dID8gKGxpbmVMZW5ndGggLSBsaW5lU2l6ZVtsaW5lRGlyZWN0aW9uXSkgLyAobGluZU5vZGVzLmxlbmd0aCAqIDIpIDogMDtcbiAgICB2YXIgbGluZU9mZnNldCA9IChkaXJlY3Rpb24gPyBtYXJnaW5zWzNdIDogbWFyZ2luc1swXSkgKyBqdXN0aWZ5T2Zmc2V0O1xuICAgIHZhciBzY3JvbGxMZW5ndGg7XG4gICAgZm9yIChpID0gMDsgaSA8IGxpbmVOb2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBsaW5lTm9kZSA9IGxpbmVOb2Rlc1tpXTtcbiAgICAgICAgdmFyIHRyYW5zbGF0ZSA9IFtcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgMFxuICAgICAgICAgICAgXTtcbiAgICAgICAgdHJhbnNsYXRlW2xpbmVEaXJlY3Rpb25dID0gbGluZU9mZnNldDtcbiAgICAgICAgdHJhbnNsYXRlW2RpcmVjdGlvbl0gPSBuZXh0ID8gb2Zmc2V0IDogb2Zmc2V0IC0gbGluZVNpemVbZGlyZWN0aW9uXTtcbiAgICAgICAgc2Nyb2xsTGVuZ3RoID0gMDtcbiAgICAgICAgaWYgKGkgPT09IDApIHtcbiAgICAgICAgICAgIHNjcm9sbExlbmd0aCA9IGxpbmVTaXplW2RpcmVjdGlvbl07XG4gICAgICAgICAgICBpZiAoZW5kUmVhY2hlZCAmJiAobmV4dCAmJiAhYWxpZ25tZW50IHx8ICFuZXh0ICYmIGFsaWdubWVudCkpIHtcbiAgICAgICAgICAgICAgICBzY3JvbGxMZW5ndGggKz0gZGlyZWN0aW9uID8gbWFyZ2luc1swXSArIG1hcmdpbnNbMl0gOiBtYXJnaW5zWzNdICsgbWFyZ2luc1sxXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2Nyb2xsTGVuZ3RoICs9IHNwYWNpbmdbZGlyZWN0aW9uXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBsaW5lTm9kZS5zZXQgPSB7XG4gICAgICAgICAgICBzaXplOiBsaW5lTm9kZS5zaXplLFxuICAgICAgICAgICAgdHJhbnNsYXRlOiB0cmFuc2xhdGUsXG4gICAgICAgICAgICBzY3JvbGxMZW5ndGg6IHNjcm9sbExlbmd0aFxuICAgICAgICB9O1xuICAgICAgICBsaW5lT2Zmc2V0ICs9IGxpbmVOb2RlLnNpemVbbGluZURpcmVjdGlvbl0gKyBzcGFjaW5nW2xpbmVEaXJlY3Rpb25dICsganVzdGlmeU9mZnNldCAqIDI7XG4gICAgfVxuICAgIGZvciAoaSA9IDA7IGkgPCBsaW5lTm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGluZU5vZGUgPSBuZXh0ID8gbGluZU5vZGVzW2ldIDogbGluZU5vZGVzW2xpbmVOb2Rlcy5sZW5ndGggLSAxIC0gaV07XG4gICAgICAgIGNvbnRleHQuc2V0KGxpbmVOb2RlLm5vZGUsIGxpbmVOb2RlLnNldCk7XG4gICAgfVxuICAgIGxpbmVOb2RlcyA9IFtdO1xuICAgIHJldHVybiBsaW5lU2l6ZVtkaXJlY3Rpb25dICsgc3BhY2luZ1tkaXJlY3Rpb25dO1xufVxuZnVuY3Rpb24gX3Jlc29sdmVOb2RlU2l6ZShub2RlKSB7XG4gICAgdmFyIGxvY2FsSXRlbVNpemUgPSBpdGVtU2l6ZTtcbiAgICBpZiAoZ2V0SXRlbVNpemUpIHtcbiAgICAgICAgbG9jYWxJdGVtU2l6ZSA9IGdldEl0ZW1TaXplKG5vZGUucmVuZGVyTm9kZSwgc2l6ZSk7XG4gICAgfVxuICAgIGlmIChsb2NhbEl0ZW1TaXplWzBdID09PSB0cnVlIHx8IGxvY2FsSXRlbVNpemVbMV0gPT09IHRydWUpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IGNvbnRleHQucmVzb2x2ZVNpemUobm9kZSwgc2l6ZSk7XG4gICAgICAgIGlmIChsb2NhbEl0ZW1TaXplWzBdICE9PSB0cnVlKSB7XG4gICAgICAgICAgICByZXN1bHRbMF0gPSBpdGVtU2l6ZVswXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobG9jYWxJdGVtU2l6ZVsxXSAhPT0gdHJ1ZSkge1xuICAgICAgICAgICAgcmVzdWx0WzFdID0gaXRlbVNpemVbMV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbG9jYWxJdGVtU2l6ZTtcbiAgICB9XG59XG5mdW5jdGlvbiBDb2xsZWN0aW9uTGF5b3V0KGNvbnRleHRfLCBvcHRpb25zKSB7XG4gICAgY29udGV4dCA9IGNvbnRleHRfO1xuICAgIHNpemUgPSBjb250ZXh0LnNpemU7XG4gICAgZGlyZWN0aW9uID0gY29udGV4dC5kaXJlY3Rpb247XG4gICAgYWxpZ25tZW50ID0gY29udGV4dC5hbGlnbm1lbnQ7XG4gICAgbGluZURpcmVjdGlvbiA9IChkaXJlY3Rpb24gKyAxKSAlIDI7XG4gICAgaWYgKG9wdGlvbnMuZ3V0dGVyICE9PSB1bmRlZmluZWQgJiYgY29uc29sZS53YXJuKSB7XG4gICAgICAgIGNvbnNvbGUud2Fybignb3B0aW9uIGBndXR0ZXJgIGhhcyBiZWVuIGRlcHJlY2F0ZWQgZm9yIENvbGxlY3Rpb25MYXlvdXQsIHVzZSBtYXJnaW5zICYgc3BhY2luZyBpbnN0ZWFkJyk7XG4gICAgfVxuICAgIGlmIChvcHRpb25zLmd1dHRlciAmJiAhb3B0aW9ucy5tYXJnaW5zICYmICFvcHRpb25zLnNwYWNpbmcpIHtcbiAgICAgICAgdmFyIGd1dHRlciA9IEFycmF5LmlzQXJyYXkob3B0aW9ucy5ndXR0ZXIpID8gb3B0aW9ucy5ndXR0ZXIgOiBbXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5ndXR0ZXIsXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5ndXR0ZXJcbiAgICAgICAgICAgIF07XG4gICAgICAgIG1hcmdpbnMgPSBbXG4gICAgICAgICAgICBndXR0ZXJbMV0sXG4gICAgICAgICAgICBndXR0ZXJbMF0sXG4gICAgICAgICAgICBndXR0ZXJbMV0sXG4gICAgICAgICAgICBndXR0ZXJbMF1cbiAgICAgICAgXTtcbiAgICAgICAgc3BhY2luZyA9IGd1dHRlcjtcbiAgICB9IGVsc2Uge1xuICAgICAgICBtYXJnaW5zID0gTGF5b3V0VXRpbGl0eS5ub3JtYWxpemVNYXJnaW5zKG9wdGlvbnMubWFyZ2lucyk7XG4gICAgICAgIHNwYWNpbmcgPSBvcHRpb25zLnNwYWNpbmcgfHwgMDtcbiAgICAgICAgc3BhY2luZyA9IEFycmF5LmlzQXJyYXkoc3BhY2luZykgPyBzcGFjaW5nIDogW1xuICAgICAgICAgICAgc3BhY2luZyxcbiAgICAgICAgICAgIHNwYWNpbmdcbiAgICAgICAgXTtcbiAgICB9XG4gICAgbWFyZ2luWzBdID0gbWFyZ2luc1tkaXJlY3Rpb24gPyAwIDogM107XG4gICAgbWFyZ2luWzFdID0gLW1hcmdpbnNbZGlyZWN0aW9uID8gMiA6IDFdO1xuICAgIGp1c3RpZnkgPSBBcnJheS5pc0FycmF5KG9wdGlvbnMuanVzdGlmeSkgPyBvcHRpb25zLmp1c3RpZnkgOiBvcHRpb25zLmp1c3RpZnkgPyBbXG4gICAgICAgIHRydWUsXG4gICAgICAgIHRydWVcbiAgICBdIDogW1xuICAgICAgICBmYWxzZSxcbiAgICAgICAgZmFsc2VcbiAgICBdO1xuICAgIGxpbmVMZW5ndGggPSBzaXplW2xpbmVEaXJlY3Rpb25dIC0gKGRpcmVjdGlvbiA/IG1hcmdpbnNbM10gKyBtYXJnaW5zWzFdIDogbWFyZ2luc1swXSArIG1hcmdpbnNbMl0pO1xuICAgIHZhciBub2RlO1xuICAgIHZhciBub2RlU2l6ZTtcbiAgICB2YXIgbGluZU9mZnNldDtcbiAgICB2YXIgYm91bmQ7XG4gICAgaWYgKG9wdGlvbnMuY2VsbHMpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMuaXRlbVNpemUgJiYgY29uc29sZS53YXJuKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ29wdGlvbnMgYGNlbGxzYCBhbmQgYGl0ZW1TaXplYCBjYW5ub3QgYm90aCBiZSBzcGVjaWZpZWQgZm9yIENvbGxlY3Rpb25MYXlvdXQsIG9ubHkgdXNlIG9uZSBvZiB0aGUgdHdvJyk7XG4gICAgICAgIH1cbiAgICAgICAgaXRlbVNpemUgPSBbXG4gICAgICAgICAgICAoc2l6ZVswXSAtIChtYXJnaW5zWzFdICsgbWFyZ2luc1szXSArIHNwYWNpbmdbMF0gKiAob3B0aW9ucy5jZWxsc1swXSAtIDEpKSkgLyBvcHRpb25zLmNlbGxzWzBdLFxuICAgICAgICAgICAgKHNpemVbMV0gLSAobWFyZ2luc1swXSArIG1hcmdpbnNbMl0gKyBzcGFjaW5nWzFdICogKG9wdGlvbnMuY2VsbHNbMV0gLSAxKSkpIC8gb3B0aW9ucy5jZWxsc1sxXVxuICAgICAgICBdO1xuICAgIH0gZWxzZSBpZiAoIW9wdGlvbnMuaXRlbVNpemUpIHtcbiAgICAgICAgaXRlbVNpemUgPSBbXG4gICAgICAgICAgICB0cnVlLFxuICAgICAgICAgICAgdHJ1ZVxuICAgICAgICBdO1xuICAgIH0gZWxzZSBpZiAob3B0aW9ucy5pdGVtU2l6ZSBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgICAgIGdldEl0ZW1TaXplID0gb3B0aW9ucy5pdGVtU2l6ZTtcbiAgICB9IGVsc2UgaWYgKG9wdGlvbnMuaXRlbVNpemVbMF0gPT09IHVuZGVmaW5lZCB8fCBvcHRpb25zLml0ZW1TaXplWzBdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaXRlbVNpemUgPSBbXG4gICAgICAgICAgICBvcHRpb25zLml0ZW1TaXplWzBdID09PSB1bmRlZmluZWQgPyBzaXplWzBdIDogb3B0aW9ucy5pdGVtU2l6ZVswXSxcbiAgICAgICAgICAgIG9wdGlvbnMuaXRlbVNpemVbMV0gPT09IHVuZGVmaW5lZCA/IHNpemVbMV0gOiBvcHRpb25zLml0ZW1TaXplWzFdXG4gICAgICAgIF07XG4gICAgfSBlbHNlIHtcbiAgICAgICAgaXRlbVNpemUgPSBvcHRpb25zLml0ZW1TaXplO1xuICAgIH1cbiAgICBvZmZzZXQgPSBjb250ZXh0LnNjcm9sbE9mZnNldCArIChhbGlnbm1lbnQgPyAwIDogbWFyZ2luW2FsaWdubWVudF0pO1xuICAgIGJvdW5kID0gY29udGV4dC5zY3JvbGxFbmQgKyAoYWxpZ25tZW50ID8gMCA6IG1hcmdpblthbGlnbm1lbnRdKTtcbiAgICBsaW5lT2Zmc2V0ID0gMDtcbiAgICBsaW5lTm9kZXMgPSBbXTtcbiAgICB3aGlsZSAob2Zmc2V0IDwgYm91bmQpIHtcbiAgICAgICAgbm9kZSA9IGNvbnRleHQubmV4dCgpO1xuICAgICAgICBpZiAoIW5vZGUpIHtcbiAgICAgICAgICAgIF9sYXlvdXRMaW5lKHRydWUsIHRydWUpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgbm9kZVNpemUgPSBfcmVzb2x2ZU5vZGVTaXplKG5vZGUpO1xuICAgICAgICBsaW5lT2Zmc2V0ICs9IChsaW5lTm9kZXMubGVuZ3RoID8gc3BhY2luZ1tsaW5lRGlyZWN0aW9uXSA6IDApICsgbm9kZVNpemVbbGluZURpcmVjdGlvbl07XG4gICAgICAgIGlmIChsaW5lT2Zmc2V0ID4gbGluZUxlbmd0aCkge1xuICAgICAgICAgICAgb2Zmc2V0ICs9IF9sYXlvdXRMaW5lKHRydWUsICFub2RlKTtcbiAgICAgICAgICAgIGxpbmVPZmZzZXQgPSBub2RlU2l6ZVtsaW5lRGlyZWN0aW9uXTtcbiAgICAgICAgfVxuICAgICAgICBsaW5lTm9kZXMucHVzaCh7XG4gICAgICAgICAgICBub2RlOiBub2RlLFxuICAgICAgICAgICAgc2l6ZTogbm9kZVNpemVcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIG9mZnNldCA9IGNvbnRleHQuc2Nyb2xsT2Zmc2V0ICsgKGFsaWdubWVudCA/IG1hcmdpblthbGlnbm1lbnRdIDogMCk7XG4gICAgYm91bmQgPSBjb250ZXh0LnNjcm9sbFN0YXJ0ICsgKGFsaWdubWVudCA/IG1hcmdpblthbGlnbm1lbnRdIDogMCk7XG4gICAgbGluZU9mZnNldCA9IDA7XG4gICAgbGluZU5vZGVzID0gW107XG4gICAgd2hpbGUgKG9mZnNldCA+IGJvdW5kKSB7XG4gICAgICAgIG5vZGUgPSBjb250ZXh0LnByZXYoKTtcbiAgICAgICAgaWYgKCFub2RlKSB7XG4gICAgICAgICAgICBfbGF5b3V0TGluZShmYWxzZSwgdHJ1ZSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBub2RlU2l6ZSA9IF9yZXNvbHZlTm9kZVNpemUobm9kZSk7XG4gICAgICAgIGxpbmVPZmZzZXQgKz0gKGxpbmVOb2Rlcy5sZW5ndGggPyBzcGFjaW5nW2xpbmVEaXJlY3Rpb25dIDogMCkgKyBub2RlU2l6ZVtsaW5lRGlyZWN0aW9uXTtcbiAgICAgICAgaWYgKGxpbmVPZmZzZXQgPiBsaW5lTGVuZ3RoKSB7XG4gICAgICAgICAgICBvZmZzZXQgLT0gX2xheW91dExpbmUoZmFsc2UsICFub2RlKTtcbiAgICAgICAgICAgIGxpbmVPZmZzZXQgPSBub2RlU2l6ZVtsaW5lRGlyZWN0aW9uXTtcbiAgICAgICAgfVxuICAgICAgICBsaW5lTm9kZXMudW5zaGlmdCh7XG4gICAgICAgICAgICBub2RlOiBub2RlLFxuICAgICAgICAgICAgc2l6ZTogbm9kZVNpemVcbiAgICAgICAgfSk7XG4gICAgfVxufVxuQ29sbGVjdGlvbkxheW91dC5DYXBhYmlsaXRpZXMgPSBjYXBhYmlsaXRpZXM7XG5Db2xsZWN0aW9uTGF5b3V0Lk5hbWUgPSAnQ29sbGVjdGlvbkxheW91dCc7XG5Db2xsZWN0aW9uTGF5b3V0LkRlc2NyaXB0aW9uID0gJ011bHRpLWNlbGwgY29sbGVjdGlvbi1sYXlvdXQgd2l0aCBtYXJnaW5zICYgc3BhY2luZyc7XG5tb2R1bGUuZXhwb3J0cyA9IENvbGxlY3Rpb25MYXlvdXQ7IiwidmFyIFV0aWxpdHkgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IHdpbmRvdy5mYW1vdXMudXRpbGl0aWVzLlV0aWxpdHkgOiB0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJyA/IGdsb2JhbC5mYW1vdXMudXRpbGl0aWVzLlV0aWxpdHkgOiBudWxsO1xudmFyIGNhcGFiaWxpdGllcyA9IHtcbiAgICAgICAgc2VxdWVuY2U6IHRydWUsXG4gICAgICAgIGRpcmVjdGlvbjogW1xuICAgICAgICAgICAgVXRpbGl0eS5EaXJlY3Rpb24uWCxcbiAgICAgICAgICAgIFV0aWxpdHkuRGlyZWN0aW9uLllcbiAgICAgICAgXSxcbiAgICAgICAgc2Nyb2xsaW5nOiB0cnVlXG4gICAgfTtcbmZ1bmN0aW9uIENvdmVyTGF5b3V0KGNvbnRleHQsIG9wdGlvbnMpIHtcbiAgICB2YXIgbm9kZSA9IGNvbnRleHQubmV4dCgpO1xuICAgIGlmICghbm9kZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBzaXplID0gY29udGV4dC5zaXplO1xuICAgIHZhciBkaXJlY3Rpb24gPSBjb250ZXh0LmRpcmVjdGlvbjtcbiAgICB2YXIgaXRlbVNpemUgPSBvcHRpb25zLml0ZW1TaXplO1xuICAgIHZhciBvcGFjaXR5U3RlcCA9IDAuMjtcbiAgICB2YXIgc2NhbGVTdGVwID0gMC4xO1xuICAgIHZhciB0cmFuc2xhdGVTdGVwID0gMzA7XG4gICAgdmFyIHpTdGFydCA9IDEwMDtcbiAgICBjb250ZXh0LnNldChub2RlLCB7XG4gICAgICAgIHNpemU6IGl0ZW1TaXplLFxuICAgICAgICBvcmlnaW46IFtcbiAgICAgICAgICAgIDAuNSxcbiAgICAgICAgICAgIDAuNVxuICAgICAgICBdLFxuICAgICAgICBhbGlnbjogW1xuICAgICAgICAgICAgMC41LFxuICAgICAgICAgICAgMC41XG4gICAgICAgIF0sXG4gICAgICAgIHRyYW5zbGF0ZTogW1xuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICB6U3RhcnRcbiAgICAgICAgXSxcbiAgICAgICAgc2Nyb2xsTGVuZ3RoOiBpdGVtU2l6ZVtkaXJlY3Rpb25dXG4gICAgfSk7XG4gICAgdmFyIHRyYW5zbGF0ZSA9IGl0ZW1TaXplWzBdIC8gMjtcbiAgICB2YXIgb3BhY2l0eSA9IDEgLSBvcGFjaXR5U3RlcDtcbiAgICB2YXIgekluZGV4ID0gelN0YXJ0IC0gMTtcbiAgICB2YXIgc2NhbGUgPSAxIC0gc2NhbGVTdGVwO1xuICAgIHZhciBwcmV2ID0gZmFsc2U7XG4gICAgdmFyIGVuZFJlYWNoZWQgPSBmYWxzZTtcbiAgICBub2RlID0gY29udGV4dC5uZXh0KCk7XG4gICAgaWYgKCFub2RlKSB7XG4gICAgICAgIG5vZGUgPSBjb250ZXh0LnByZXYoKTtcbiAgICAgICAgcHJldiA9IHRydWU7XG4gICAgfVxuICAgIHdoaWxlIChub2RlKSB7XG4gICAgICAgIGNvbnRleHQuc2V0KG5vZGUsIHtcbiAgICAgICAgICAgIHNpemU6IGl0ZW1TaXplLFxuICAgICAgICAgICAgb3JpZ2luOiBbXG4gICAgICAgICAgICAgICAgMC41LFxuICAgICAgICAgICAgICAgIDAuNVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIGFsaWduOiBbXG4gICAgICAgICAgICAgICAgMC41LFxuICAgICAgICAgICAgICAgIDAuNVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIHRyYW5zbGF0ZTogZGlyZWN0aW9uID8gW1xuICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgcHJldiA/IC10cmFuc2xhdGUgOiB0cmFuc2xhdGUsXG4gICAgICAgICAgICAgICAgekluZGV4XG4gICAgICAgICAgICBdIDogW1xuICAgICAgICAgICAgICAgIHByZXYgPyAtdHJhbnNsYXRlIDogdHJhbnNsYXRlLFxuICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgekluZGV4XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgc2NhbGU6IFtcbiAgICAgICAgICAgICAgICBzY2FsZSxcbiAgICAgICAgICAgICAgICBzY2FsZSxcbiAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgb3BhY2l0eTogb3BhY2l0eSxcbiAgICAgICAgICAgIHNjcm9sbExlbmd0aDogaXRlbVNpemVbZGlyZWN0aW9uXVxuICAgICAgICB9KTtcbiAgICAgICAgb3BhY2l0eSAtPSBvcGFjaXR5U3RlcDtcbiAgICAgICAgc2NhbGUgLT0gc2NhbGVTdGVwO1xuICAgICAgICB0cmFuc2xhdGUgKz0gdHJhbnNsYXRlU3RlcDtcbiAgICAgICAgekluZGV4LS07XG4gICAgICAgIGlmICh0cmFuc2xhdGUgPj0gc2l6ZVtkaXJlY3Rpb25dIC8gMikge1xuICAgICAgICAgICAgZW5kUmVhY2hlZCA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBub2RlID0gcHJldiA/IGNvbnRleHQucHJldigpIDogY29udGV4dC5uZXh0KCk7XG4gICAgICAgICAgICBlbmRSZWFjaGVkID0gIW5vZGU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVuZFJlYWNoZWQpIHtcbiAgICAgICAgICAgIGlmIChwcmV2KSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbmRSZWFjaGVkID0gZmFsc2U7XG4gICAgICAgICAgICBwcmV2ID0gdHJ1ZTtcbiAgICAgICAgICAgIG5vZGUgPSBjb250ZXh0LnByZXYoKTtcbiAgICAgICAgICAgIGlmIChub2RlKSB7XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlID0gaXRlbVNpemVbZGlyZWN0aW9uXSAvIDI7XG4gICAgICAgICAgICAgICAgb3BhY2l0eSA9IDEgLSBvcGFjaXR5U3RlcDtcbiAgICAgICAgICAgICAgICB6SW5kZXggPSB6U3RhcnQgLSAxO1xuICAgICAgICAgICAgICAgIHNjYWxlID0gMSAtIHNjYWxlU3RlcDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbkNvdmVyTGF5b3V0LkNhcGFiaWxpdGllcyA9IGNhcGFiaWxpdGllcztcbm1vZHVsZS5leHBvcnRzID0gQ292ZXJMYXlvdXQ7IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBDdWJlTGF5b3V0KGNvbnRleHQsIG9wdGlvbnMpIHtcbiAgICB2YXIgaXRlbVNpemUgPSBvcHRpb25zLml0ZW1TaXplO1xuICAgIGNvbnRleHQuc2V0KGNvbnRleHQubmV4dCgpLCB7XG4gICAgICAgIHNpemU6IGl0ZW1TaXplLFxuICAgICAgICBvcmlnaW46IFtcbiAgICAgICAgICAgIDAuNSxcbiAgICAgICAgICAgIDAuNVxuICAgICAgICBdLFxuICAgICAgICByb3RhdGU6IFtcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICBNYXRoLlBJIC8gMixcbiAgICAgICAgICAgIDBcbiAgICAgICAgXSxcbiAgICAgICAgdHJhbnNsYXRlOiBbXG4gICAgICAgICAgICBpdGVtU2l6ZVswXSAvIDIsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMFxuICAgICAgICBdXG4gICAgfSk7XG4gICAgY29udGV4dC5zZXQoY29udGV4dC5uZXh0KCksIHtcbiAgICAgICAgc2l6ZTogaXRlbVNpemUsXG4gICAgICAgIG9yaWdpbjogW1xuICAgICAgICAgICAgMC41LFxuICAgICAgICAgICAgMC41XG4gICAgICAgIF0sXG4gICAgICAgIHJvdGF0ZTogW1xuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIE1hdGguUEkgLyAyLFxuICAgICAgICAgICAgMFxuICAgICAgICBdLFxuICAgICAgICB0cmFuc2xhdGU6IFtcbiAgICAgICAgICAgIC0oaXRlbVNpemVbMF0gLyAyKSxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwXG4gICAgICAgIF1cbiAgICB9KTtcbiAgICBjb250ZXh0LnNldChjb250ZXh0Lm5leHQoKSwge1xuICAgICAgICBzaXplOiBpdGVtU2l6ZSxcbiAgICAgICAgb3JpZ2luOiBbXG4gICAgICAgICAgICAwLjUsXG4gICAgICAgICAgICAwLjVcbiAgICAgICAgXSxcbiAgICAgICAgcm90YXRlOiBbXG4gICAgICAgICAgICBNYXRoLlBJIC8gMixcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwXG4gICAgICAgIF0sXG4gICAgICAgIHRyYW5zbGF0ZTogW1xuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIC0oaXRlbVNpemVbMV0gLyAyKSxcbiAgICAgICAgICAgIDBcbiAgICAgICAgXVxuICAgIH0pO1xuICAgIGNvbnRleHQuc2V0KGNvbnRleHQubmV4dCgpLCB7XG4gICAgICAgIHNpemU6IGl0ZW1TaXplLFxuICAgICAgICBvcmlnaW46IFtcbiAgICAgICAgICAgIDAuNSxcbiAgICAgICAgICAgIDAuNVxuICAgICAgICBdLFxuICAgICAgICByb3RhdGU6IFtcbiAgICAgICAgICAgIE1hdGguUEkgLyAyLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDBcbiAgICAgICAgXSxcbiAgICAgICAgdHJhbnNsYXRlOiBbXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgaXRlbVNpemVbMV0gLyAyLFxuICAgICAgICAgICAgMFxuICAgICAgICBdXG4gICAgfSk7XG59OyIsImlmIChjb25zb2xlLndhcm4pIHtcbiAgICBjb25zb2xlLndhcm4oJ0dyaWRMYXlvdXQgaGFzIGJlZW4gZGVwcmVjYXRlZCBhbmQgd2lsbCBiZSByZW1vdmVkIGluIHRoZSBmdXR1cmUsIHVzZSBDb2xsZWN0aW9uTGF5b3V0IGluc3RlYWQnKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9Db2xsZWN0aW9uTGF5b3V0Jyk7IiwidmFyIExheW91dERvY2tIZWxwZXIgPSByZXF1aXJlKCcuLi9oZWxwZXJzL0xheW91dERvY2tIZWxwZXInKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gSGVhZGVyRm9vdGVyTGF5b3V0KGNvbnRleHQsIG9wdGlvbnMpIHtcbiAgICB2YXIgZG9jayA9IG5ldyBMYXlvdXREb2NrSGVscGVyKGNvbnRleHQsIG9wdGlvbnMpO1xuICAgIGRvY2sudG9wKCdoZWFkZXInLCBvcHRpb25zLmhlYWRlclNpemUgfHwgb3B0aW9ucy5oZWFkZXJIZWlnaHQpO1xuICAgIGRvY2suYm90dG9tKCdmb290ZXInLCBvcHRpb25zLmZvb3RlclNpemUgfHwgb3B0aW9ucy5mb290ZXJIZWlnaHQpO1xuICAgIGRvY2suZmlsbCgnY29udGVudCcpO1xufTsiLCJ2YXIgVXRpbGl0eSA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gd2luZG93LmZhbW91cy51dGlsaXRpZXMuVXRpbGl0eSA6IHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnID8gZ2xvYmFsLmZhbW91cy51dGlsaXRpZXMuVXRpbGl0eSA6IG51bGw7XG52YXIgTGF5b3V0VXRpbGl0eSA9IHJlcXVpcmUoJy4uL0xheW91dFV0aWxpdHknKTtcbnZhciBjYXBhYmlsaXRpZXMgPSB7XG4gICAgICAgIHNlcXVlbmNlOiB0cnVlLFxuICAgICAgICBkaXJlY3Rpb246IFtcbiAgICAgICAgICAgIFV0aWxpdHkuRGlyZWN0aW9uLlksXG4gICAgICAgICAgICBVdGlsaXR5LkRpcmVjdGlvbi5YXG4gICAgICAgIF0sXG4gICAgICAgIHNjcm9sbGluZzogdHJ1ZSxcbiAgICAgICAgdHJ1ZVNpemU6IHRydWUsXG4gICAgICAgIHNlcXVlbnRpYWxTY3JvbGxpbmdPcHRpbWl6ZWQ6IHRydWVcbiAgICB9O1xudmFyIHNldCA9IHtcbiAgICAgICAgc2l6ZTogW1xuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDBcbiAgICAgICAgXSxcbiAgICAgICAgdHJhbnNsYXRlOiBbXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDBcbiAgICAgICAgXSxcbiAgICAgICAgc2Nyb2xsTGVuZ3RoOiB1bmRlZmluZWRcbiAgICB9O1xudmFyIG1hcmdpbiA9IFtcbiAgICAgICAgMCxcbiAgICAgICAgMFxuICAgIF07XG5mdW5jdGlvbiBMaXN0TGF5b3V0KGNvbnRleHQsIG9wdGlvbnMpIHtcbiAgICB2YXIgc2l6ZSA9IGNvbnRleHQuc2l6ZTtcbiAgICB2YXIgZGlyZWN0aW9uID0gY29udGV4dC5kaXJlY3Rpb247XG4gICAgdmFyIGFsaWdubWVudCA9IGNvbnRleHQuYWxpZ25tZW50O1xuICAgIHZhciByZXZEaXJlY3Rpb24gPSBkaXJlY3Rpb24gPyAwIDogMTtcbiAgICB2YXIgb2Zmc2V0O1xuICAgIHZhciBtYXJnaW5zID0gTGF5b3V0VXRpbGl0eS5ub3JtYWxpemVNYXJnaW5zKG9wdGlvbnMubWFyZ2lucyk7XG4gICAgdmFyIHNwYWNpbmcgPSBvcHRpb25zLnNwYWNpbmcgfHwgMDtcbiAgICB2YXIgbm9kZTtcbiAgICB2YXIgbm9kZVNpemU7XG4gICAgdmFyIGl0ZW1TaXplO1xuICAgIHZhciBnZXRJdGVtU2l6ZTtcbiAgICB2YXIgbGFzdFNlY3Rpb25CZWZvcmVWaXNpYmxlQ2VsbDtcbiAgICB2YXIgbGFzdFNlY3Rpb25CZWZvcmVWaXNpYmxlQ2VsbE9mZnNldDtcbiAgICB2YXIgbGFzdFNlY3Rpb25CZWZvcmVWaXNpYmxlQ2VsbExlbmd0aDtcbiAgICB2YXIgbGFzdFNlY3Rpb25CZWZvcmVWaXNpYmxlQ2VsbFNjcm9sbExlbmd0aDtcbiAgICB2YXIgZmlyc3RWaXNpYmxlQ2VsbDtcbiAgICB2YXIgbGFzdE5vZGU7XG4gICAgdmFyIGxhc3RDZWxsT2Zmc2V0SW5GaXJzdFZpc2libGVTZWN0aW9uO1xuICAgIHZhciBpc1NlY3Rpb25DYWxsYmFjayA9IG9wdGlvbnMuaXNTZWN0aW9uQ2FsbGJhY2s7XG4gICAgdmFyIGJvdW5kO1xuICAgIHNldC5zaXplWzBdID0gc2l6ZVswXTtcbiAgICBzZXQuc2l6ZVsxXSA9IHNpemVbMV07XG4gICAgc2V0LnNpemVbcmV2RGlyZWN0aW9uXSAtPSBtYXJnaW5zWzEgLSByZXZEaXJlY3Rpb25dICsgbWFyZ2luc1szIC0gcmV2RGlyZWN0aW9uXTtcbiAgICBzZXQudHJhbnNsYXRlWzBdID0gMDtcbiAgICBzZXQudHJhbnNsYXRlWzFdID0gMDtcbiAgICBzZXQudHJhbnNsYXRlWzJdID0gMDtcbiAgICBzZXQudHJhbnNsYXRlW3JldkRpcmVjdGlvbl0gPSBtYXJnaW5zW2RpcmVjdGlvbiA/IDMgOiAwXTtcbiAgICBpZiAob3B0aW9ucy5pdGVtU2l6ZSA9PT0gdHJ1ZSB8fCAhb3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnaXRlbVNpemUnKSkge1xuICAgICAgICBpdGVtU2l6ZSA9IHRydWU7XG4gICAgfSBlbHNlIGlmIChvcHRpb25zLml0ZW1TaXplIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcbiAgICAgICAgZ2V0SXRlbVNpemUgPSBvcHRpb25zLml0ZW1TaXplO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGl0ZW1TaXplID0gb3B0aW9ucy5pdGVtU2l6ZSA9PT0gdW5kZWZpbmVkID8gc2l6ZVtkaXJlY3Rpb25dIDogb3B0aW9ucy5pdGVtU2l6ZTtcbiAgICB9XG4gICAgbWFyZ2luWzBdID0gbWFyZ2luc1tkaXJlY3Rpb24gPyAwIDogM107XG4gICAgbWFyZ2luWzFdID0gLW1hcmdpbnNbZGlyZWN0aW9uID8gMiA6IDFdO1xuICAgIG9mZnNldCA9IGNvbnRleHQuc2Nyb2xsT2Zmc2V0ICsgbWFyZ2luW2FsaWdubWVudF07XG4gICAgYm91bmQgPSBjb250ZXh0LnNjcm9sbEVuZCArIG1hcmdpblthbGlnbm1lbnRdO1xuICAgIHdoaWxlIChvZmZzZXQgPCBib3VuZCkge1xuICAgICAgICBsYXN0Tm9kZSA9IG5vZGU7XG4gICAgICAgIG5vZGUgPSBjb250ZXh0Lm5leHQoKTtcbiAgICAgICAgaWYgKCFub2RlKSB7XG4gICAgICAgICAgICBpZiAobGFzdE5vZGUgJiYgIWFsaWdubWVudCkge1xuICAgICAgICAgICAgICAgIHNldC5zY3JvbGxMZW5ndGggPSBub2RlU2l6ZSArIG1hcmdpblswXSArIC1tYXJnaW5bMV07XG4gICAgICAgICAgICAgICAgY29udGV4dC5zZXQobGFzdE5vZGUsIHNldCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBub2RlU2l6ZSA9IGdldEl0ZW1TaXplID8gZ2V0SXRlbVNpemUobm9kZS5yZW5kZXJOb2RlKSA6IGl0ZW1TaXplO1xuICAgICAgICBub2RlU2l6ZSA9IG5vZGVTaXplID09PSB0cnVlID8gY29udGV4dC5yZXNvbHZlU2l6ZShub2RlLCBzaXplKVtkaXJlY3Rpb25dIDogbm9kZVNpemU7XG4gICAgICAgIHNldC5zaXplW2RpcmVjdGlvbl0gPSBub2RlU2l6ZTtcbiAgICAgICAgc2V0LnRyYW5zbGF0ZVtkaXJlY3Rpb25dID0gb2Zmc2V0ICsgKGFsaWdubWVudCA/IHNwYWNpbmcgOiAwKTtcbiAgICAgICAgc2V0LnNjcm9sbExlbmd0aCA9IG5vZGVTaXplICsgc3BhY2luZztcbiAgICAgICAgY29udGV4dC5zZXQobm9kZSwgc2V0KTtcbiAgICAgICAgb2Zmc2V0ICs9IHNldC5zY3JvbGxMZW5ndGg7XG4gICAgICAgIGlmIChpc1NlY3Rpb25DYWxsYmFjayAmJiBpc1NlY3Rpb25DYWxsYmFjayhub2RlLnJlbmRlck5vZGUpKSB7XG4gICAgICAgICAgICBzZXQudHJhbnNsYXRlW2RpcmVjdGlvbl0gPSBNYXRoLm1heChtYXJnaW5bMF0sIHNldC50cmFuc2xhdGVbZGlyZWN0aW9uXSk7XG4gICAgICAgICAgICBjb250ZXh0LnNldChub2RlLCBzZXQpO1xuICAgICAgICAgICAgaWYgKCFmaXJzdFZpc2libGVDZWxsKSB7XG4gICAgICAgICAgICAgICAgbGFzdFNlY3Rpb25CZWZvcmVWaXNpYmxlQ2VsbCA9IG5vZGU7XG4gICAgICAgICAgICAgICAgbGFzdFNlY3Rpb25CZWZvcmVWaXNpYmxlQ2VsbE9mZnNldCA9IG9mZnNldCAtIG5vZGVTaXplO1xuICAgICAgICAgICAgICAgIGxhc3RTZWN0aW9uQmVmb3JlVmlzaWJsZUNlbGxMZW5ndGggPSBub2RlU2l6ZTtcbiAgICAgICAgICAgICAgICBsYXN0U2VjdGlvbkJlZm9yZVZpc2libGVDZWxsU2Nyb2xsTGVuZ3RoID0gbm9kZVNpemU7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGxhc3RDZWxsT2Zmc2V0SW5GaXJzdFZpc2libGVTZWN0aW9uID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBsYXN0Q2VsbE9mZnNldEluRmlyc3RWaXNpYmxlU2VjdGlvbiA9IG9mZnNldCAtIG5vZGVTaXplO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKCFmaXJzdFZpc2libGVDZWxsICYmIG9mZnNldCA+PSAwKSB7XG4gICAgICAgICAgICBmaXJzdFZpc2libGVDZWxsID0gbm9kZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBub2RlID0gdW5kZWZpbmVkO1xuICAgIG9mZnNldCA9IGNvbnRleHQuc2Nyb2xsT2Zmc2V0ICsgbWFyZ2luW2FsaWdubWVudF07XG4gICAgYm91bmQgPSBjb250ZXh0LnNjcm9sbFN0YXJ0ICsgbWFyZ2luW2FsaWdubWVudF07XG4gICAgd2hpbGUgKG9mZnNldCA+IGJvdW5kKSB7XG4gICAgICAgIGxhc3ROb2RlID0gbm9kZTtcbiAgICAgICAgbm9kZSA9IGNvbnRleHQucHJldigpO1xuICAgICAgICBpZiAoIW5vZGUpIHtcbiAgICAgICAgICAgIGlmIChsYXN0Tm9kZSAmJiBhbGlnbm1lbnQpIHtcbiAgICAgICAgICAgICAgICBzZXQuc2Nyb2xsTGVuZ3RoID0gbm9kZVNpemUgKyBtYXJnaW5bMF0gKyAtbWFyZ2luWzFdO1xuICAgICAgICAgICAgICAgIGNvbnRleHQuc2V0KGxhc3ROb2RlLCBzZXQpO1xuICAgICAgICAgICAgICAgIGlmIChsYXN0U2VjdGlvbkJlZm9yZVZpc2libGVDZWxsID09PSBsYXN0Tm9kZSkge1xuICAgICAgICAgICAgICAgICAgICBsYXN0U2VjdGlvbkJlZm9yZVZpc2libGVDZWxsU2Nyb2xsTGVuZ3RoID0gc2V0LnNjcm9sbExlbmd0aDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBub2RlU2l6ZSA9IGdldEl0ZW1TaXplID8gZ2V0SXRlbVNpemUobm9kZS5yZW5kZXJOb2RlKSA6IGl0ZW1TaXplO1xuICAgICAgICBub2RlU2l6ZSA9IG5vZGVTaXplID09PSB0cnVlID8gY29udGV4dC5yZXNvbHZlU2l6ZShub2RlLCBzaXplKVtkaXJlY3Rpb25dIDogbm9kZVNpemU7XG4gICAgICAgIHNldC5zY3JvbGxMZW5ndGggPSBub2RlU2l6ZSArIHNwYWNpbmc7XG4gICAgICAgIG9mZnNldCAtPSBzZXQuc2Nyb2xsTGVuZ3RoO1xuICAgICAgICBzZXQuc2l6ZVtkaXJlY3Rpb25dID0gbm9kZVNpemU7XG4gICAgICAgIHNldC50cmFuc2xhdGVbZGlyZWN0aW9uXSA9IG9mZnNldCArIChhbGlnbm1lbnQgPyBzcGFjaW5nIDogMCk7XG4gICAgICAgIGNvbnRleHQuc2V0KG5vZGUsIHNldCk7XG4gICAgICAgIGlmIChpc1NlY3Rpb25DYWxsYmFjayAmJiBpc1NlY3Rpb25DYWxsYmFjayhub2RlLnJlbmRlck5vZGUpKSB7XG4gICAgICAgICAgICBzZXQudHJhbnNsYXRlW2RpcmVjdGlvbl0gPSBNYXRoLm1heChtYXJnaW5bMF0sIHNldC50cmFuc2xhdGVbZGlyZWN0aW9uXSk7XG4gICAgICAgICAgICBjb250ZXh0LnNldChub2RlLCBzZXQpO1xuICAgICAgICAgICAgaWYgKCFsYXN0U2VjdGlvbkJlZm9yZVZpc2libGVDZWxsKSB7XG4gICAgICAgICAgICAgICAgbGFzdFNlY3Rpb25CZWZvcmVWaXNpYmxlQ2VsbCA9IG5vZGU7XG4gICAgICAgICAgICAgICAgbGFzdFNlY3Rpb25CZWZvcmVWaXNpYmxlQ2VsbE9mZnNldCA9IG9mZnNldDtcbiAgICAgICAgICAgICAgICBsYXN0U2VjdGlvbkJlZm9yZVZpc2libGVDZWxsTGVuZ3RoID0gbm9kZVNpemU7XG4gICAgICAgICAgICAgICAgbGFzdFNlY3Rpb25CZWZvcmVWaXNpYmxlQ2VsbFNjcm9sbExlbmd0aCA9IHNldC5zY3JvbGxMZW5ndGg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAob2Zmc2V0ICsgbm9kZVNpemUgPj0gMCkge1xuICAgICAgICAgICAgZmlyc3RWaXNpYmxlQ2VsbCA9IG5vZGU7XG4gICAgICAgICAgICBpZiAobGFzdFNlY3Rpb25CZWZvcmVWaXNpYmxlQ2VsbCkge1xuICAgICAgICAgICAgICAgIGxhc3RDZWxsT2Zmc2V0SW5GaXJzdFZpc2libGVTZWN0aW9uID0gb2Zmc2V0ICsgbm9kZVNpemU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsYXN0U2VjdGlvbkJlZm9yZVZpc2libGVDZWxsID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChpc1NlY3Rpb25DYWxsYmFjayAmJiAhbGFzdFNlY3Rpb25CZWZvcmVWaXNpYmxlQ2VsbCkge1xuICAgICAgICBub2RlID0gY29udGV4dC5wcmV2KCk7XG4gICAgICAgIHdoaWxlIChub2RlKSB7XG4gICAgICAgICAgICBpZiAoaXNTZWN0aW9uQ2FsbGJhY2sobm9kZS5yZW5kZXJOb2RlKSkge1xuICAgICAgICAgICAgICAgIGxhc3RTZWN0aW9uQmVmb3JlVmlzaWJsZUNlbGwgPSBub2RlO1xuICAgICAgICAgICAgICAgIG5vZGVTaXplID0gb3B0aW9ucy5pdGVtU2l6ZSB8fCBjb250ZXh0LnJlc29sdmVTaXplKG5vZGUsIHNpemUpW2RpcmVjdGlvbl07XG4gICAgICAgICAgICAgICAgbGFzdFNlY3Rpb25CZWZvcmVWaXNpYmxlQ2VsbE9mZnNldCA9IG9mZnNldCAtIG5vZGVTaXplO1xuICAgICAgICAgICAgICAgIGxhc3RTZWN0aW9uQmVmb3JlVmlzaWJsZUNlbGxMZW5ndGggPSBub2RlU2l6ZTtcbiAgICAgICAgICAgICAgICBsYXN0U2VjdGlvbkJlZm9yZVZpc2libGVDZWxsU2Nyb2xsTGVuZ3RoID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBub2RlID0gY29udGV4dC5wcmV2KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKGxhc3RTZWN0aW9uQmVmb3JlVmlzaWJsZUNlbGwpIHtcbiAgICAgICAgdmFyIGNvcnJlY3RlZE9mZnNldCA9IE1hdGgubWF4KG1hcmdpblswXSwgbGFzdFNlY3Rpb25CZWZvcmVWaXNpYmxlQ2VsbE9mZnNldCk7XG4gICAgICAgIGlmIChsYXN0Q2VsbE9mZnNldEluRmlyc3RWaXNpYmxlU2VjdGlvbiAhPT0gdW5kZWZpbmVkICYmIGxhc3RTZWN0aW9uQmVmb3JlVmlzaWJsZUNlbGxMZW5ndGggPiBsYXN0Q2VsbE9mZnNldEluRmlyc3RWaXNpYmxlU2VjdGlvbiAtIG1hcmdpblswXSkge1xuICAgICAgICAgICAgY29ycmVjdGVkT2Zmc2V0ID0gbGFzdENlbGxPZmZzZXRJbkZpcnN0VmlzaWJsZVNlY3Rpb24gLSBsYXN0U2VjdGlvbkJlZm9yZVZpc2libGVDZWxsTGVuZ3RoO1xuICAgICAgICB9XG4gICAgICAgIHNldC5zaXplW2RpcmVjdGlvbl0gPSBsYXN0U2VjdGlvbkJlZm9yZVZpc2libGVDZWxsTGVuZ3RoO1xuICAgICAgICBzZXQudHJhbnNsYXRlW2RpcmVjdGlvbl0gPSBjb3JyZWN0ZWRPZmZzZXQ7XG4gICAgICAgIHNldC5zY3JvbGxMZW5ndGggPSBsYXN0U2VjdGlvbkJlZm9yZVZpc2libGVDZWxsU2Nyb2xsTGVuZ3RoO1xuICAgICAgICBjb250ZXh0LnNldChsYXN0U2VjdGlvbkJlZm9yZVZpc2libGVDZWxsLCBzZXQpO1xuICAgIH1cbn1cbkxpc3RMYXlvdXQuQ2FwYWJpbGl0aWVzID0gY2FwYWJpbGl0aWVzO1xuTGlzdExheW91dC5OYW1lID0gJ0xpc3RMYXlvdXQnO1xuTGlzdExheW91dC5EZXNjcmlwdGlvbiA9ICdMaXN0LWxheW91dCB3aXRoIG1hcmdpbnMsIHNwYWNpbmcgYW5kIHN0aWNreSBoZWFkZXJzJztcbm1vZHVsZS5leHBvcnRzID0gTGlzdExheW91dDsiLCJ2YXIgTGF5b3V0RG9ja0hlbHBlciA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvTGF5b3V0RG9ja0hlbHBlcicpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBOYXZCYXJMYXlvdXQoY29udGV4dCwgb3B0aW9ucykge1xuICAgIHZhciBkb2NrID0gbmV3IExheW91dERvY2tIZWxwZXIoY29udGV4dCwge1xuICAgICAgICAgICAgbWFyZ2luczogb3B0aW9ucy5tYXJnaW5zLFxuICAgICAgICAgICAgdHJhbnNsYXRlWjogMVxuICAgICAgICB9KTtcbiAgICBjb250ZXh0LnNldCgnYmFja2dyb3VuZCcsIHsgc2l6ZTogY29udGV4dC5zaXplIH0pO1xuICAgIHZhciBub2RlO1xuICAgIHZhciBpO1xuICAgIHZhciByaWdodEl0ZW1zID0gY29udGV4dC5nZXQoJ3JpZ2h0SXRlbXMnKTtcbiAgICBpZiAocmlnaHRJdGVtcykge1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgcmlnaHRJdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbm9kZSA9IGNvbnRleHQuZ2V0KHJpZ2h0SXRlbXNbaV0pO1xuICAgICAgICAgICAgZG9jay5yaWdodChub2RlLCBvcHRpb25zLnJpZ2h0SXRlbVdpZHRoIHx8IG9wdGlvbnMuaXRlbVdpZHRoKTtcbiAgICAgICAgICAgIGRvY2sucmlnaHQodW5kZWZpbmVkLCBvcHRpb25zLnJpZ2h0SXRlbVNwYWNlciB8fCBvcHRpb25zLml0ZW1TcGFjZXIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHZhciBsZWZ0SXRlbXMgPSBjb250ZXh0LmdldCgnbGVmdEl0ZW1zJyk7XG4gICAgaWYgKGxlZnRJdGVtcykge1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVmdEl0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBub2RlID0gY29udGV4dC5nZXQobGVmdEl0ZW1zW2ldKTtcbiAgICAgICAgICAgIGRvY2subGVmdChub2RlLCBvcHRpb25zLmxlZnRJdGVtV2lkdGggfHwgb3B0aW9ucy5pdGVtV2lkdGgpO1xuICAgICAgICAgICAgZG9jay5sZWZ0KHVuZGVmaW5lZCwgb3B0aW9ucy5sZWZ0SXRlbVNwYWNlciB8fCBvcHRpb25zLml0ZW1TcGFjZXIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGRvY2suZmlsbCgndGl0bGUnKTtcbn07IiwidmFyIFV0aWxpdHkgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IHdpbmRvdy5mYW1vdXMudXRpbGl0aWVzLlV0aWxpdHkgOiB0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJyA/IGdsb2JhbC5mYW1vdXMudXRpbGl0aWVzLlV0aWxpdHkgOiBudWxsO1xudmFyIGNhcGFiaWxpdGllcyA9IHtcbiAgICAgICAgc2VxdWVuY2U6IHRydWUsXG4gICAgICAgIGRpcmVjdGlvbjogW1xuICAgICAgICAgICAgVXRpbGl0eS5EaXJlY3Rpb24uWSxcbiAgICAgICAgICAgIFV0aWxpdHkuRGlyZWN0aW9uLlhcbiAgICAgICAgXSxcbiAgICAgICAgc2Nyb2xsaW5nOiBmYWxzZVxuICAgIH07XG52YXIgZGlyZWN0aW9uO1xudmFyIHNpemU7XG52YXIgcmF0aW9zO1xudmFyIHRvdGFsO1xudmFyIG9mZnNldDtcbnZhciBpbmRleDtcbnZhciBub2RlO1xudmFyIHNldCA9IHtcbiAgICAgICAgc2l6ZTogW1xuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDBcbiAgICAgICAgXSxcbiAgICAgICAgdHJhbnNsYXRlOiBbXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDBcbiAgICAgICAgXVxuICAgIH07XG5mdW5jdGlvbiBQcm9wb3J0aW9uYWxMYXlvdXQoY29udGV4dCwgb3B0aW9ucykge1xuICAgIHNpemUgPSBjb250ZXh0LnNpemU7XG4gICAgZGlyZWN0aW9uID0gY29udGV4dC5kaXJlY3Rpb247XG4gICAgcmF0aW9zID0gb3B0aW9ucy5yYXRpb3M7XG4gICAgdG90YWwgPSAwO1xuICAgIGZvciAoaW5kZXggPSAwOyBpbmRleCA8IHJhdGlvcy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgdG90YWwgKz0gcmF0aW9zW2luZGV4XTtcbiAgICB9XG4gICAgc2V0LnNpemVbMF0gPSBzaXplWzBdO1xuICAgIHNldC5zaXplWzFdID0gc2l6ZVsxXTtcbiAgICBzZXQudHJhbnNsYXRlWzBdID0gMDtcbiAgICBzZXQudHJhbnNsYXRlWzFdID0gMDtcbiAgICBub2RlID0gY29udGV4dC5uZXh0KCk7XG4gICAgb2Zmc2V0ID0gMDtcbiAgICBpbmRleCA9IDA7XG4gICAgd2hpbGUgKG5vZGUgJiYgaW5kZXggPCByYXRpb3MubGVuZ3RoKSB7XG4gICAgICAgIHNldC5zaXplW2RpcmVjdGlvbl0gPSAoc2l6ZVtkaXJlY3Rpb25dIC0gb2Zmc2V0KSAvIHRvdGFsICogcmF0aW9zW2luZGV4XTtcbiAgICAgICAgc2V0LnRyYW5zbGF0ZVtkaXJlY3Rpb25dID0gb2Zmc2V0O1xuICAgICAgICBjb250ZXh0LnNldChub2RlLCBzZXQpO1xuICAgICAgICBvZmZzZXQgKz0gc2V0LnNpemVbZGlyZWN0aW9uXTtcbiAgICAgICAgdG90YWwgLT0gcmF0aW9zW2luZGV4XTtcbiAgICAgICAgaW5kZXgrKztcbiAgICAgICAgbm9kZSA9IGNvbnRleHQubmV4dCgpO1xuICAgIH1cbn1cblByb3BvcnRpb25hbExheW91dC5DYXBhYmlsaXRpZXMgPSBjYXBhYmlsaXRpZXM7XG5tb2R1bGUuZXhwb3J0cyA9IFByb3BvcnRpb25hbExheW91dDsiLCJ2YXIgVXRpbGl0eSA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gd2luZG93LmZhbW91cy51dGlsaXRpZXMuVXRpbGl0eSA6IHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnID8gZ2xvYmFsLmZhbW91cy51dGlsaXRpZXMuVXRpbGl0eSA6IG51bGw7XG52YXIgTGF5b3V0VXRpbGl0eSA9IHJlcXVpcmUoJy4uL0xheW91dFV0aWxpdHknKTtcbnZhciBjYXBhYmlsaXRpZXMgPSB7XG4gICAgICAgIHNlcXVlbmNlOiB0cnVlLFxuICAgICAgICBkaXJlY3Rpb246IFtcbiAgICAgICAgICAgIFV0aWxpdHkuRGlyZWN0aW9uLlgsXG4gICAgICAgICAgICBVdGlsaXR5LkRpcmVjdGlvbi5ZXG4gICAgICAgIF0sXG4gICAgICAgIHRydWVTaXplOiB0cnVlXG4gICAgfTtcbnZhciBzaXplO1xudmFyIGRpcmVjdGlvbjtcbnZhciByZXZEaXJlY3Rpb247XG52YXIgaXRlbXM7XG52YXIgc3BhY2VycztcbnZhciBtYXJnaW5zO1xudmFyIHNwYWNpbmc7XG52YXIgc2l6ZUxlZnQ7XG52YXIgc2V0ID0ge1xuICAgICAgICBzaXplOiBbXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMFxuICAgICAgICBdLFxuICAgICAgICB0cmFuc2xhdGU6IFtcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMFxuICAgICAgICBdLFxuICAgICAgICBhbGlnbjogW1xuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDBcbiAgICAgICAgXSxcbiAgICAgICAgb3JpZ2luOiBbXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMFxuICAgICAgICBdXG4gICAgfTtcbnZhciBub2RlU2l6ZTtcbnZhciBvZmZzZXQ7XG5mdW5jdGlvbiBOYXZCYXJMYXlvdXQoY29udGV4dCwgb3B0aW9ucykge1xuICAgIHNpemUgPSBjb250ZXh0LnNpemU7XG4gICAgZGlyZWN0aW9uID0gY29udGV4dC5kaXJlY3Rpb247XG4gICAgcmV2RGlyZWN0aW9uID0gZGlyZWN0aW9uID8gMCA6IDE7XG4gICAgc3BhY2luZyA9IG9wdGlvbnMuc3BhY2luZyB8fCAwO1xuICAgIGl0ZW1zID0gY29udGV4dC5nZXQoJ2l0ZW1zJyk7XG4gICAgc3BhY2VycyA9IGNvbnRleHQuZ2V0KCdzcGFjZXJzJyk7XG4gICAgbWFyZ2lucyA9IExheW91dFV0aWxpdHkubm9ybWFsaXplTWFyZ2lucyhvcHRpb25zLm1hcmdpbnMpO1xuICAgIHNldC5zaXplWzBdID0gY29udGV4dC5zaXplWzBdO1xuICAgIHNldC5zaXplWzFdID0gY29udGV4dC5zaXplWzFdO1xuICAgIHNldC5zaXplW3JldkRpcmVjdGlvbl0gLT0gbWFyZ2luc1sxIC0gcmV2RGlyZWN0aW9uXSArIG1hcmdpbnNbMyAtIHJldkRpcmVjdGlvbl07XG4gICAgc2V0LnRyYW5zbGF0ZVswXSA9IDA7XG4gICAgc2V0LnRyYW5zbGF0ZVsxXSA9IDA7XG4gICAgc2V0LnRyYW5zbGF0ZVsyXSA9IDAuMDAxO1xuICAgIHNldC50cmFuc2xhdGVbcmV2RGlyZWN0aW9uXSA9IG1hcmdpbnNbZGlyZWN0aW9uID8gMyA6IDBdO1xuICAgIHNldC5hbGlnblswXSA9IDA7XG4gICAgc2V0LmFsaWduWzFdID0gMDtcbiAgICBzZXQub3JpZ2luWzBdID0gMDtcbiAgICBzZXQub3JpZ2luWzFdID0gMDtcbiAgICBvZmZzZXQgPSBkaXJlY3Rpb24gPyBtYXJnaW5zWzBdIDogbWFyZ2luc1szXTtcbiAgICBzaXplTGVmdCA9IHNpemVbZGlyZWN0aW9uXSAtIChvZmZzZXQgKyAoZGlyZWN0aW9uID8gbWFyZ2luc1syXSA6IG1hcmdpbnNbMV0pKTtcbiAgICBzaXplTGVmdCAtPSAoaXRlbXMubGVuZ3RoIC0gMSkgKiBzcGFjaW5nO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKG9wdGlvbnMuaXRlbVNpemUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgbm9kZVNpemUgPSBNYXRoLnJvdW5kKHNpemVMZWZ0IC8gKGl0ZW1zLmxlbmd0aCAtIGkpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5vZGVTaXplID0gb3B0aW9ucy5pdGVtU2l6ZSA9PT0gdHJ1ZSA/IGNvbnRleHQucmVzb2x2ZVNpemUoaXRlbXNbaV0sIHNpemUpW2RpcmVjdGlvbl0gOiBvcHRpb25zLml0ZW1TaXplO1xuICAgICAgICB9XG4gICAgICAgIHNldC5zY3JvbGxMZW5ndGggPSBub2RlU2l6ZTtcbiAgICAgICAgaWYgKGkgPT09IDApIHtcbiAgICAgICAgICAgIHNldC5zY3JvbGxMZW5ndGggKz0gZGlyZWN0aW9uID8gbWFyZ2luc1swXSA6IG1hcmdpbnNbM107XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGkgPT09IGl0ZW1zLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgIHNldC5zY3JvbGxMZW5ndGggKz0gZGlyZWN0aW9uID8gbWFyZ2luc1syXSA6IG1hcmdpbnNbMV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZXQuc2Nyb2xsTGVuZ3RoICs9IHNwYWNpbmc7XG4gICAgICAgIH1cbiAgICAgICAgc2V0LnNpemVbZGlyZWN0aW9uXSA9IG5vZGVTaXplO1xuICAgICAgICBzZXQudHJhbnNsYXRlW2RpcmVjdGlvbl0gPSBvZmZzZXQ7XG4gICAgICAgIGNvbnRleHQuc2V0KGl0ZW1zW2ldLCBzZXQpO1xuICAgICAgICBvZmZzZXQgKz0gbm9kZVNpemU7XG4gICAgICAgIHNpemVMZWZ0IC09IG5vZGVTaXplO1xuICAgICAgICBpZiAoaSA9PT0gb3B0aW9ucy5zZWxlY3RlZEl0ZW1JbmRleCkge1xuICAgICAgICAgICAgc2V0LnNjcm9sbExlbmd0aCA9IDA7XG4gICAgICAgICAgICBzZXQudHJhbnNsYXRlW2RpcmVjdGlvbl0gKz0gbm9kZVNpemUgLyAyO1xuICAgICAgICAgICAgc2V0LnRyYW5zbGF0ZVsyXSA9IDAuMDAyO1xuICAgICAgICAgICAgc2V0Lm9yaWdpbltkaXJlY3Rpb25dID0gMC41O1xuICAgICAgICAgICAgY29udGV4dC5zZXQoJ3NlbGVjdGVkSXRlbU92ZXJsYXknLCBzZXQpO1xuICAgICAgICAgICAgc2V0Lm9yaWdpbltkaXJlY3Rpb25dID0gMDtcbiAgICAgICAgICAgIHNldC50cmFuc2xhdGVbMl0gPSAwLjAwMTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaSA8IGl0ZW1zLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgIGlmIChzcGFjZXJzICYmIGkgPCBzcGFjZXJzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHNldC5zaXplW2RpcmVjdGlvbl0gPSBzcGFjaW5nO1xuICAgICAgICAgICAgICAgIHNldC50cmFuc2xhdGVbZGlyZWN0aW9uXSA9IG9mZnNldDtcbiAgICAgICAgICAgICAgICBjb250ZXh0LnNldChzcGFjZXJzW2ldLCBzZXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb2Zmc2V0ICs9IHNwYWNpbmc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvZmZzZXQgKz0gZGlyZWN0aW9uID8gbWFyZ2luc1syXSA6IG1hcmdpbnNbMV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgc2V0LnNjcm9sbExlbmd0aCA9IDA7XG4gICAgc2V0LnNpemVbMF0gPSBzaXplWzBdO1xuICAgIHNldC5zaXplWzFdID0gc2l6ZVsxXTtcbiAgICBzZXQuc2l6ZVtkaXJlY3Rpb25dID0gc2l6ZVtkaXJlY3Rpb25dO1xuICAgIHNldC50cmFuc2xhdGVbMF0gPSAwO1xuICAgIHNldC50cmFuc2xhdGVbMV0gPSAwO1xuICAgIHNldC50cmFuc2xhdGVbMl0gPSAwO1xuICAgIHNldC50cmFuc2xhdGVbZGlyZWN0aW9uXSA9IDA7XG4gICAgY29udGV4dC5zZXQoJ2JhY2tncm91bmQnLCBzZXQpO1xufVxuTmF2QmFyTGF5b3V0LkNhcGFiaWxpdGllcyA9IGNhcGFiaWxpdGllcztcbk5hdkJhckxheW91dC5OYW1lID0gJ1RhYkJhckxheW91dCc7XG5OYXZCYXJMYXlvdXQuRGVzY3JpcHRpb24gPSAnVGFiQmFyIHdpZGdldCBsYXlvdXQnO1xubW9kdWxlLmV4cG9ydHMgPSBOYXZCYXJMYXlvdXQ7IiwidmFyIFV0aWxpdHkgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IHdpbmRvdy5mYW1vdXMudXRpbGl0aWVzLlV0aWxpdHkgOiB0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJyA/IGdsb2JhbC5mYW1vdXMudXRpbGl0aWVzLlV0aWxpdHkgOiBudWxsO1xudmFyIGNhcGFiaWxpdGllcyA9IHtcbiAgICAgICAgc2VxdWVuY2U6IHRydWUsXG4gICAgICAgIGRpcmVjdGlvbjogW1xuICAgICAgICAgICAgVXRpbGl0eS5EaXJlY3Rpb24uWSxcbiAgICAgICAgICAgIFV0aWxpdHkuRGlyZWN0aW9uLlhcbiAgICAgICAgXSxcbiAgICAgICAgc2Nyb2xsaW5nOiB0cnVlLFxuICAgICAgICB0cnVlU2l6ZTogdHJ1ZVxuICAgIH07XG52YXIgc2l6ZTtcbnZhciBkaXJlY3Rpb247XG52YXIgcmV2RGlyZWN0aW9uO1xudmFyIG5vZGU7XG52YXIgaXRlbVNpemU7XG52YXIgZGlhbWV0ZXI7XG52YXIgb2Zmc2V0O1xudmFyIGJvdW5kO1xudmFyIGFuZ2xlO1xudmFyIHJhZGl1cztcbnZhciBpdGVtQW5nbGU7XG52YXIgcmFkaWFsT3BhY2l0eTtcbnZhciBzZXQgPSB7XG4gICAgICAgIG9wYWNpdHk6IDEsXG4gICAgICAgIHNpemU6IFtcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwXG4gICAgICAgIF0sXG4gICAgICAgIHRyYW5zbGF0ZTogW1xuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwXG4gICAgICAgIF0sXG4gICAgICAgIHJvdGF0ZTogW1xuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwXG4gICAgICAgIF0sXG4gICAgICAgIG9yaWdpbjogW1xuICAgICAgICAgICAgMC41LFxuICAgICAgICAgICAgMC41XG4gICAgICAgIF0sXG4gICAgICAgIGFsaWduOiBbXG4gICAgICAgICAgICAwLjUsXG4gICAgICAgICAgICAwLjVcbiAgICAgICAgXSxcbiAgICAgICAgc2Nyb2xsTGVuZ3RoOiB1bmRlZmluZWRcbiAgICB9O1xuZnVuY3Rpb24gV2hlZWxMYXlvdXQoY29udGV4dCwgb3B0aW9ucykge1xuICAgIHNpemUgPSBjb250ZXh0LnNpemU7XG4gICAgZGlyZWN0aW9uID0gY29udGV4dC5kaXJlY3Rpb247XG4gICAgcmV2RGlyZWN0aW9uID0gZGlyZWN0aW9uID8gMCA6IDE7XG4gICAgaXRlbVNpemUgPSBvcHRpb25zLml0ZW1TaXplIHx8IHNpemVbZGlyZWN0aW9uXSAvIDI7XG4gICAgZGlhbWV0ZXIgPSBvcHRpb25zLmRpYW1ldGVyIHx8IGl0ZW1TaXplICogMztcbiAgICByYWRpdXMgPSBkaWFtZXRlciAvIDI7XG4gICAgaXRlbUFuZ2xlID0gTWF0aC5hdGFuMihpdGVtU2l6ZSAvIDIsIHJhZGl1cykgKiAyO1xuICAgIHJhZGlhbE9wYWNpdHkgPSBvcHRpb25zLnJhZGlhbE9wYWNpdHkgPT09IHVuZGVmaW5lZCA/IDEgOiBvcHRpb25zLnJhZGlhbE9wYWNpdHk7XG4gICAgc2V0Lm9wYWNpdHkgPSAxO1xuICAgIHNldC5zaXplWzBdID0gc2l6ZVswXTtcbiAgICBzZXQuc2l6ZVsxXSA9IHNpemVbMV07XG4gICAgc2V0LnNpemVbcmV2RGlyZWN0aW9uXSA9IHNpemVbcmV2RGlyZWN0aW9uXTtcbiAgICBzZXQuc2l6ZVtkaXJlY3Rpb25dID0gaXRlbVNpemU7XG4gICAgc2V0LnRyYW5zbGF0ZVswXSA9IDA7XG4gICAgc2V0LnRyYW5zbGF0ZVsxXSA9IDA7XG4gICAgc2V0LnRyYW5zbGF0ZVsyXSA9IDA7XG4gICAgc2V0LnJvdGF0ZVswXSA9IDA7XG4gICAgc2V0LnJvdGF0ZVsxXSA9IDA7XG4gICAgc2V0LnJvdGF0ZVsyXSA9IDA7XG4gICAgc2V0LnNjcm9sbExlbmd0aCA9IGl0ZW1TaXplO1xuICAgIG9mZnNldCA9IGNvbnRleHQuc2Nyb2xsT2Zmc2V0O1xuICAgIGJvdW5kID0gTWF0aC5QSSAvIDIgLyBpdGVtQW5nbGUgKiBpdGVtU2l6ZSArIGl0ZW1TaXplO1xuICAgIHdoaWxlIChvZmZzZXQgPD0gYm91bmQpIHtcbiAgICAgICAgbm9kZSA9IGNvbnRleHQubmV4dCgpO1xuICAgICAgICBpZiAoIW5vZGUpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvZmZzZXQgPj0gLWJvdW5kKSB7XG4gICAgICAgICAgICBhbmdsZSA9IG9mZnNldCAvIGl0ZW1TaXplICogaXRlbUFuZ2xlO1xuICAgICAgICAgICAgc2V0LnRyYW5zbGF0ZVtkaXJlY3Rpb25dID0gcmFkaXVzICogTWF0aC5zaW4oYW5nbGUpO1xuICAgICAgICAgICAgc2V0LnRyYW5zbGF0ZVsyXSA9IHJhZGl1cyAqIE1hdGguY29zKGFuZ2xlKSAtIHJhZGl1cztcbiAgICAgICAgICAgIHNldC5yb3RhdGVbcmV2RGlyZWN0aW9uXSA9IGRpcmVjdGlvbiA/IC1hbmdsZSA6IGFuZ2xlO1xuICAgICAgICAgICAgc2V0Lm9wYWNpdHkgPSAxIC0gTWF0aC5hYnMoYW5nbGUpIC8gKE1hdGguUEkgLyAyKSAqICgxIC0gcmFkaWFsT3BhY2l0eSk7XG4gICAgICAgICAgICBjb250ZXh0LnNldChub2RlLCBzZXQpO1xuICAgICAgICB9XG4gICAgICAgIG9mZnNldCArPSBpdGVtU2l6ZTtcbiAgICB9XG4gICAgb2Zmc2V0ID0gY29udGV4dC5zY3JvbGxPZmZzZXQgLSBpdGVtU2l6ZTtcbiAgICB3aGlsZSAob2Zmc2V0ID49IC1ib3VuZCkge1xuICAgICAgICBub2RlID0gY29udGV4dC5wcmV2KCk7XG4gICAgICAgIGlmICghbm9kZSkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9mZnNldCA8PSBib3VuZCkge1xuICAgICAgICAgICAgYW5nbGUgPSBvZmZzZXQgLyBpdGVtU2l6ZSAqIGl0ZW1BbmdsZTtcbiAgICAgICAgICAgIHNldC50cmFuc2xhdGVbZGlyZWN0aW9uXSA9IHJhZGl1cyAqIE1hdGguc2luKGFuZ2xlKTtcbiAgICAgICAgICAgIHNldC50cmFuc2xhdGVbMl0gPSByYWRpdXMgKiBNYXRoLmNvcyhhbmdsZSkgLSByYWRpdXM7XG4gICAgICAgICAgICBzZXQucm90YXRlW3JldkRpcmVjdGlvbl0gPSBkaXJlY3Rpb24gPyAtYW5nbGUgOiBhbmdsZTtcbiAgICAgICAgICAgIHNldC5vcGFjaXR5ID0gMSAtIE1hdGguYWJzKGFuZ2xlKSAvIChNYXRoLlBJIC8gMikgKiAoMSAtIHJhZGlhbE9wYWNpdHkpO1xuICAgICAgICAgICAgY29udGV4dC5zZXQobm9kZSwgc2V0KTtcbiAgICAgICAgfVxuICAgICAgICBvZmZzZXQgLT0gaXRlbVNpemU7XG4gICAgfVxufVxuV2hlZWxMYXlvdXQuQ2FwYWJpbGl0aWVzID0gY2FwYWJpbGl0aWVzO1xuV2hlZWxMYXlvdXQuTmFtZSA9ICdXaGVlbExheW91dCc7XG5XaGVlbExheW91dC5EZXNjcmlwdGlvbiA9ICdTcGlubmVyLXdoZWVsL3Nsb3QtbWFjaGluZSBsYXlvdXQnO1xubW9kdWxlLmV4cG9ydHMgPSBXaGVlbExheW91dDsiLCJ2YXIgVmlldyA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gd2luZG93LmZhbW91cy5jb3JlLlZpZXcgOiB0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJyA/IGdsb2JhbC5mYW1vdXMuY29yZS5WaWV3IDogbnVsbDtcbnZhciBTdXJmYWNlID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cuZmFtb3VzLmNvcmUuU3VyZmFjZSA6IHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnID8gZ2xvYmFsLmZhbW91cy5jb3JlLlN1cmZhY2UgOiBudWxsO1xudmFyIFV0aWxpdHkgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IHdpbmRvdy5mYW1vdXMudXRpbGl0aWVzLlV0aWxpdHkgOiB0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJyA/IGdsb2JhbC5mYW1vdXMudXRpbGl0aWVzLlV0aWxpdHkgOiBudWxsO1xudmFyIENvbnRhaW5lclN1cmZhY2UgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IHdpbmRvdy5mYW1vdXMuc3VyZmFjZXMuQ29udGFpbmVyU3VyZmFjZSA6IHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnID8gZ2xvYmFsLmZhbW91cy5zdXJmYWNlcy5Db250YWluZXJTdXJmYWNlIDogbnVsbDtcbnZhciBMYXlvdXRDb250cm9sbGVyID0gcmVxdWlyZSgnLi4vTGF5b3V0Q29udHJvbGxlcicpO1xudmFyIFNjcm9sbENvbnRyb2xsZXIgPSByZXF1aXJlKCcuLi9TY3JvbGxDb250cm9sbGVyJyk7XG52YXIgV2hlZWxMYXlvdXQgPSByZXF1aXJlKCcuLi9sYXlvdXRzL1doZWVsTGF5b3V0Jyk7XG52YXIgUHJvcG9ydGlvbmFsTGF5b3V0ID0gcmVxdWlyZSgnLi4vbGF5b3V0cy9Qcm9wb3J0aW9uYWxMYXlvdXQnKTtcbnZhciBWaXJ0dWFsVmlld1NlcXVlbmNlID0gcmVxdWlyZSgnLi4vVmlydHVhbFZpZXdTZXF1ZW5jZScpO1xudmFyIERhdGVQaWNrZXJDb21wb25lbnRzID0gcmVxdWlyZSgnLi9EYXRlUGlja2VyQ29tcG9uZW50cycpO1xudmFyIExheW91dFV0aWxpdHkgPSByZXF1aXJlKCcuLi9MYXlvdXRVdGlsaXR5Jyk7XG5mdW5jdGlvbiBEYXRlUGlja2VyKG9wdGlvbnMpIHtcbiAgICBWaWV3LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgdGhpcy5fZGF0ZSA9IG5ldyBEYXRlKG9wdGlvbnMuZGF0ZSA/IG9wdGlvbnMuZGF0ZS5nZXRUaW1lKCkgOiB1bmRlZmluZWQpO1xuICAgIHRoaXMuX2NvbXBvbmVudHMgPSBbXTtcbiAgICB0aGlzLmNsYXNzZXMgPSBvcHRpb25zLmNsYXNzZXMgPyB0aGlzLmNsYXNzZXMuY29uY2F0KG9wdGlvbnMuY2xhc3NlcykgOiB0aGlzLmNsYXNzZXM7XG4gICAgX2NyZWF0ZUxheW91dC5jYWxsKHRoaXMpO1xuICAgIF91cGRhdGVDb21wb25lbnRzLmNhbGwodGhpcyk7XG4gICAgdGhpcy5fb3ZlcmxheVJlbmRlcmFibGVzID0ge1xuICAgICAgICB0b3A6IF9jcmVhdGVSZW5kZXJhYmxlLmNhbGwodGhpcywgJ3RvcCcpLFxuICAgICAgICBtaWRkbGU6IF9jcmVhdGVSZW5kZXJhYmxlLmNhbGwodGhpcywgJ21pZGRsZScpLFxuICAgICAgICBib3R0b206IF9jcmVhdGVSZW5kZXJhYmxlLmNhbGwodGhpcywgJ2JvdHRvbScpXG4gICAgfTtcbiAgICBfY3JlYXRlT3ZlcmxheS5jYWxsKHRoaXMpO1xuICAgIHRoaXMuc2V0T3B0aW9ucyh0aGlzLm9wdGlvbnMpO1xufVxuRGF0ZVBpY2tlci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFZpZXcucHJvdG90eXBlKTtcbkRhdGVQaWNrZXIucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gRGF0ZVBpY2tlcjtcbkRhdGVQaWNrZXIucHJvdG90eXBlLmNsYXNzZXMgPSBbXG4gICAgJ2ZmLXdpZGdldCcsXG4gICAgJ2ZmLWRhdGVwaWNrZXInXG5dO1xuRGF0ZVBpY2tlci5Db21wb25lbnQgPSBEYXRlUGlja2VyQ29tcG9uZW50cztcbkRhdGVQaWNrZXIuREVGQVVMVF9PUFRJT05TID0ge1xuICAgIHBlcnNwZWN0aXZlOiA1MDAsXG4gICAgd2hlZWxMYXlvdXQ6IHtcbiAgICAgICAgaXRlbVNpemU6IDEwMCxcbiAgICAgICAgZGlhbWV0ZXI6IDUwMFxuICAgIH0sXG4gICAgY3JlYXRlUmVuZGVyYWJsZXM6IHtcbiAgICAgICAgaXRlbTogdHJ1ZSxcbiAgICAgICAgdG9wOiBmYWxzZSxcbiAgICAgICAgbWlkZGxlOiBmYWxzZSxcbiAgICAgICAgYm90dG9tOiBmYWxzZVxuICAgIH0sXG4gICAgc2Nyb2xsQ29udHJvbGxlcjoge1xuICAgICAgICBlbmFibGVkOiB0cnVlLFxuICAgICAgICBwYWdpbmF0ZWQ6IHRydWUsXG4gICAgICAgIHBhZ2luYXRpb25Nb2RlOiBTY3JvbGxDb250cm9sbGVyLlBhZ2luYXRpb25Nb2RlLlNDUk9MTCxcbiAgICAgICAgbW91c2VNb3ZlOiB0cnVlLFxuICAgICAgICBzY3JvbGxTcHJpbmc6IHtcbiAgICAgICAgICAgIGRhbXBpbmdSYXRpbzogMSxcbiAgICAgICAgICAgIHBlcmlvZDogODAwXG4gICAgICAgIH1cbiAgICB9XG59O1xuZnVuY3Rpb24gX2NyZWF0ZVJlbmRlcmFibGUoaWQsIGRhdGEpIHtcbiAgICB2YXIgb3B0aW9uID0gdGhpcy5vcHRpb25zLmNyZWF0ZVJlbmRlcmFibGVzW0FycmF5LmlzQXJyYXkoaWQpID8gaWRbMF0gOiBpZF07XG4gICAgaWYgKG9wdGlvbiBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgICAgIHJldHVybiBvcHRpb24uY2FsbCh0aGlzLCBpZCwgZGF0YSk7XG4gICAgfSBlbHNlIGlmICghb3B0aW9uKSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIGlmIChkYXRhICE9PSB1bmRlZmluZWQgJiYgZGF0YSBpbnN0YW5jZW9mIE9iamVjdCkge1xuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG4gICAgdmFyIHN1cmZhY2UgPSBuZXcgU3VyZmFjZSh7XG4gICAgICAgICAgICBjbGFzc2VzOiB0aGlzLmNsYXNzZXMsXG4gICAgICAgICAgICBjb250ZW50OiBkYXRhID8gJzxkaXY+JyArIGRhdGEgKyAnPC9kaXY+JyA6IHVuZGVmaW5lZFxuICAgICAgICB9KTtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShpZCkpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpZC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgc3VyZmFjZS5hZGRDbGFzcyhpZFtpXSk7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBzdXJmYWNlLmFkZENsYXNzKGlkKTtcbiAgICB9XG4gICAgcmV0dXJuIHN1cmZhY2U7XG59XG5EYXRlUGlja2VyLnByb3RvdHlwZS5zZXRPcHRpb25zID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICBWaWV3LnByb3RvdHlwZS5zZXRPcHRpb25zLmNhbGwodGhpcywgb3B0aW9ucyk7XG4gICAgaWYgKCF0aGlzLmxheW91dCkge1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMucGVyc3BlY3RpdmUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5jb250ZXh0LnNldFBlcnNwZWN0aXZlKG9wdGlvbnMucGVyc3BlY3RpdmUpO1xuICAgIH1cbiAgICB2YXIgaTtcbiAgICBpZiAob3B0aW9ucy53aGVlbExheW91dCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCB0aGlzLnNjcm9sbFdoZWVscy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxXaGVlbHNbaV0uc2Nyb2xsQ29udHJvbGxlci5zZXRMYXlvdXRPcHRpb25zKG9wdGlvbnMud2hlZWxMYXlvdXQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMub3ZlcmxheS5zZXRMYXlvdXRPcHRpb25zKHsgaXRlbVNpemU6IHRoaXMub3B0aW9ucy53aGVlbExheW91dC5pdGVtU2l6ZSB9KTtcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMuc2Nyb2xsQ29udHJvbGxlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCB0aGlzLnNjcm9sbFdoZWVscy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxXaGVlbHNbaV0uc2Nyb2xsQ29udHJvbGxlci5zZXRPcHRpb25zKG9wdGlvbnMuc2Nyb2xsQ29udHJvbGxlcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuRGF0ZVBpY2tlci5wcm90b3R5cGUuc2V0Q29tcG9uZW50cyA9IGZ1bmN0aW9uIChjb21wb25lbnRzKSB7XG4gICAgdGhpcy5fY29tcG9uZW50cyA9IGNvbXBvbmVudHM7XG4gICAgX3VwZGF0ZUNvbXBvbmVudHMuY2FsbCh0aGlzKTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5EYXRlUGlja2VyLnByb3RvdHlwZS5nZXRDb21wb25lbnRzID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLl9jb21wb25lbnRzO1xufTtcbkRhdGVQaWNrZXIucHJvdG90eXBlLnNldERhdGUgPSBmdW5jdGlvbiAoZGF0ZSkge1xuICAgIHRoaXMuX2RhdGUuc2V0VGltZShkYXRlLmdldFRpbWUoKSk7XG4gICAgX3NldERhdGVUb1Njcm9sbFdoZWVscy5jYWxsKHRoaXMsIHRoaXMuX2RhdGUpO1xuICAgIHJldHVybiB0aGlzO1xufTtcbkRhdGVQaWNrZXIucHJvdG90eXBlLmdldERhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2RhdGU7XG59O1xuZnVuY3Rpb24gX3NldERhdGVUb1Njcm9sbFdoZWVscyhkYXRlKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnNjcm9sbFdoZWVscy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgc2Nyb2xsV2hlZWwgPSB0aGlzLnNjcm9sbFdoZWVsc1tpXTtcbiAgICAgICAgdmFyIGNvbXBvbmVudCA9IHNjcm9sbFdoZWVsLmNvbXBvbmVudDtcbiAgICAgICAgdmFyIGl0ZW0gPSBzY3JvbGxXaGVlbC5zY3JvbGxDb250cm9sbGVyLmdldEZpcnN0VmlzaWJsZUl0ZW0oKTtcbiAgICAgICAgaWYgKGl0ZW0gJiYgaXRlbS52aWV3U2VxdWVuY2UpIHtcbiAgICAgICAgICAgIHZhciB2aWV3U2VxdWVuY2UgPSBpdGVtLnZpZXdTZXF1ZW5jZTtcbiAgICAgICAgICAgIHZhciByZW5kZXJOb2RlID0gaXRlbS52aWV3U2VxdWVuY2UuZ2V0KCk7XG4gICAgICAgICAgICB2YXIgY3VycmVudFZhbHVlID0gY29tcG9uZW50LmdldENvbXBvbmVudChyZW5kZXJOb2RlLmRhdGUpO1xuICAgICAgICAgICAgdmFyIGRlc3RWYWx1ZSA9IGNvbXBvbmVudC5nZXRDb21wb25lbnQoZGF0ZSk7XG4gICAgICAgICAgICB2YXIgc3RlcHMgPSAwO1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRWYWx1ZSAhPT0gZGVzdFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgc3RlcHMgPSBkZXN0VmFsdWUgLSBjdXJyZW50VmFsdWU7XG4gICAgICAgICAgICAgICAgaWYgKGNvbXBvbmVudC5sb29wKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZXZTdGVwcyA9IHN0ZXBzIDwgMCA/IHN0ZXBzICsgY29tcG9uZW50LnVwcGVyQm91bmQgOiBzdGVwcyAtIGNvbXBvbmVudC51cHBlckJvdW5kO1xuICAgICAgICAgICAgICAgICAgICBpZiAoTWF0aC5hYnMocmV2U3RlcHMpIDwgTWF0aC5hYnMoc3RlcHMpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGVwcyA9IHJldlN0ZXBzO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFzdGVwcykge1xuICAgICAgICAgICAgICAgIHNjcm9sbFdoZWVsLnNjcm9sbENvbnRyb2xsZXIuZ29Ub1JlbmRlck5vZGUocmVuZGVyTm9kZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHdoaWxlIChjdXJyZW50VmFsdWUgIT09IGRlc3RWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICB2aWV3U2VxdWVuY2UgPSBzdGVwcyA+IDAgPyB2aWV3U2VxdWVuY2UuZ2V0TmV4dCgpIDogdmlld1NlcXVlbmNlLmdldFByZXZpb3VzKCk7XG4gICAgICAgICAgICAgICAgICAgIHJlbmRlck5vZGUgPSB2aWV3U2VxdWVuY2UgPyB2aWV3U2VxdWVuY2UuZ2V0KCkgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgIGlmICghcmVuZGVyTm9kZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFZhbHVlID0gY29tcG9uZW50LmdldENvbXBvbmVudChyZW5kZXJOb2RlLmRhdGUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3RlcHMgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGxXaGVlbC5zY3JvbGxDb250cm9sbGVyLmdvVG9OZXh0UGFnZSgpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsV2hlZWwuc2Nyb2xsQ29udHJvbGxlci5nb1RvUHJldmlvdXNQYWdlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5mdW5jdGlvbiBfZ2V0RGF0ZUZyb21TY3JvbGxXaGVlbHMoKSB7XG4gICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSh0aGlzLl9kYXRlKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuc2Nyb2xsV2hlZWxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBzY3JvbGxXaGVlbCA9IHRoaXMuc2Nyb2xsV2hlZWxzW2ldO1xuICAgICAgICB2YXIgY29tcG9uZW50ID0gc2Nyb2xsV2hlZWwuY29tcG9uZW50O1xuICAgICAgICB2YXIgaXRlbSA9IHNjcm9sbFdoZWVsLnNjcm9sbENvbnRyb2xsZXIuZ2V0Rmlyc3RWaXNpYmxlSXRlbSgpO1xuICAgICAgICBpZiAoaXRlbSAmJiBpdGVtLnJlbmRlck5vZGUpIHtcbiAgICAgICAgICAgIGNvbXBvbmVudC5zZXRDb21wb25lbnQoZGF0ZSwgY29tcG9uZW50LmdldENvbXBvbmVudChpdGVtLnJlbmRlck5vZGUuZGF0ZSkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBkYXRlO1xufVxuZnVuY3Rpb24gX2NyZWF0ZUxheW91dCgpIHtcbiAgICB0aGlzLmNvbnRhaW5lciA9IG5ldyBDb250YWluZXJTdXJmYWNlKHRoaXMub3B0aW9ucy5jb250YWluZXIpO1xuICAgIHRoaXMuY29udGFpbmVyLnNldENsYXNzZXModGhpcy5jbGFzc2VzKTtcbiAgICB0aGlzLmxheW91dCA9IG5ldyBMYXlvdXRDb250cm9sbGVyKHtcbiAgICAgICAgbGF5b3V0OiBQcm9wb3J0aW9uYWxMYXlvdXQsXG4gICAgICAgIGxheW91dE9wdGlvbnM6IHsgcmF0aW9zOiBbXSB9LFxuICAgICAgICBkaXJlY3Rpb246IFV0aWxpdHkuRGlyZWN0aW9uLlhcbiAgICB9KTtcbiAgICB0aGlzLmNvbnRhaW5lci5hZGQodGhpcy5sYXlvdXQpO1xuICAgIHRoaXMuYWRkKHRoaXMuY29udGFpbmVyKTtcbn1cbmZ1bmN0aW9uIF9jbGlja0l0ZW0oc2Nyb2xsV2hlZWwsIGV2ZW50KSB7XG59XG5mdW5jdGlvbiBfc2Nyb2xsV2hlZWxTY3JvbGxTdGFydCgpIHtcbiAgICB0aGlzLl9zY3JvbGxpbmdDb3VudCsrO1xuICAgIGlmICh0aGlzLl9zY3JvbGxpbmdDb3VudCA9PT0gMSkge1xuICAgICAgICB0aGlzLl9ldmVudE91dHB1dC5lbWl0KCdzY3JvbGxzdGFydCcsIHsgdGFyZ2V0OiB0aGlzIH0pO1xuICAgIH1cbn1cbmZ1bmN0aW9uIF9zY3JvbGxXaGVlbFNjcm9sbEVuZCgpIHtcbiAgICB0aGlzLl9zY3JvbGxpbmdDb3VudC0tO1xuICAgIGlmICh0aGlzLl9zY3JvbGxpbmdDb3VudCA9PT0gMCkge1xuICAgICAgICB0aGlzLl9ldmVudE91dHB1dC5lbWl0KCdzY3JvbGxlbmQnLCB7XG4gICAgICAgICAgICB0YXJnZXQ6IHRoaXMsXG4gICAgICAgICAgICBkYXRlOiB0aGlzLl9kYXRlXG4gICAgICAgIH0pO1xuICAgIH1cbn1cbmZ1bmN0aW9uIF9zY3JvbGxXaGVlbFBhZ2VDaGFuZ2UoKSB7XG4gICAgdGhpcy5fZGF0ZSA9IF9nZXREYXRlRnJvbVNjcm9sbFdoZWVscy5jYWxsKHRoaXMpO1xuICAgIHRoaXMuX2V2ZW50T3V0cHV0LmVtaXQoJ2RhdGVjaGFuZ2UnLCB7XG4gICAgICAgIHRhcmdldDogdGhpcyxcbiAgICAgICAgZGF0ZTogdGhpcy5fZGF0ZVxuICAgIH0pO1xufVxuZnVuY3Rpb24gX3VwZGF0ZUNvbXBvbmVudHMoKSB7XG4gICAgdGhpcy5zY3JvbGxXaGVlbHMgPSBbXTtcbiAgICB0aGlzLl9zY3JvbGxpbmdDb3VudCA9IDA7XG4gICAgdmFyIGRhdGFTb3VyY2UgPSBbXTtcbiAgICB2YXIgc2l6ZVJhdGlvcyA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fY29tcG9uZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgY29tcG9uZW50ID0gdGhpcy5fY29tcG9uZW50c1tpXTtcbiAgICAgICAgY29tcG9uZW50LmNyZWF0ZVJlbmRlcmFibGUgPSBfY3JlYXRlUmVuZGVyYWJsZS5iaW5kKHRoaXMpO1xuICAgICAgICB2YXIgdmlld1NlcXVlbmNlID0gbmV3IFZpcnR1YWxWaWV3U2VxdWVuY2Uoe1xuICAgICAgICAgICAgICAgIGZhY3Rvcnk6IGNvbXBvbmVudCxcbiAgICAgICAgICAgICAgICB2YWx1ZTogY29tcG9uZW50LmNyZWF0ZSh0aGlzLl9kYXRlKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIHZhciBvcHRpb25zID0gTGF5b3V0VXRpbGl0eS5jb21iaW5lT3B0aW9ucyh0aGlzLm9wdGlvbnMuc2Nyb2xsQ29udHJvbGxlciwge1xuICAgICAgICAgICAgICAgIGxheW91dDogV2hlZWxMYXlvdXQsXG4gICAgICAgICAgICAgICAgbGF5b3V0T3B0aW9uczogdGhpcy5vcHRpb25zLndoZWVsTGF5b3V0LFxuICAgICAgICAgICAgICAgIGZsb3c6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGRpcmVjdGlvbjogVXRpbGl0eS5EaXJlY3Rpb24uWSxcbiAgICAgICAgICAgICAgICBkYXRhU291cmNlOiB2aWV3U2VxdWVuY2UsXG4gICAgICAgICAgICAgICAgYXV0b1BpcGVFdmVudHM6IHRydWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB2YXIgc2Nyb2xsQ29udHJvbGxlciA9IG5ldyBTY3JvbGxDb250cm9sbGVyKG9wdGlvbnMpO1xuICAgICAgICBzY3JvbGxDb250cm9sbGVyLm9uKCdzY3JvbGxzdGFydCcsIF9zY3JvbGxXaGVlbFNjcm9sbFN0YXJ0LmJpbmQodGhpcykpO1xuICAgICAgICBzY3JvbGxDb250cm9sbGVyLm9uKCdzY3JvbGxlbmQnLCBfc2Nyb2xsV2hlZWxTY3JvbGxFbmQuYmluZCh0aGlzKSk7XG4gICAgICAgIHNjcm9sbENvbnRyb2xsZXIub24oJ3BhZ2VjaGFuZ2UnLCBfc2Nyb2xsV2hlZWxQYWdlQ2hhbmdlLmJpbmQodGhpcykpO1xuICAgICAgICB2YXIgc2Nyb2xsV2hlZWwgPSB7XG4gICAgICAgICAgICAgICAgY29tcG9uZW50OiBjb21wb25lbnQsXG4gICAgICAgICAgICAgICAgc2Nyb2xsQ29udHJvbGxlcjogc2Nyb2xsQ29udHJvbGxlcixcbiAgICAgICAgICAgICAgICB2aWV3U2VxdWVuY2U6IHZpZXdTZXF1ZW5jZVxuICAgICAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zY3JvbGxXaGVlbHMucHVzaChzY3JvbGxXaGVlbCk7XG4gICAgICAgIGNvbXBvbmVudC5vbignY2xpY2snLCBfY2xpY2tJdGVtLmJpbmQodGhpcywgc2Nyb2xsV2hlZWwpKTtcbiAgICAgICAgZGF0YVNvdXJjZS5wdXNoKHNjcm9sbENvbnRyb2xsZXIpO1xuICAgICAgICBzaXplUmF0aW9zLnB1c2goY29tcG9uZW50LnNpemVSYXRpbyk7XG4gICAgfVxuICAgIHRoaXMubGF5b3V0LnNldERhdGFTb3VyY2UoZGF0YVNvdXJjZSk7XG4gICAgdGhpcy5sYXlvdXQuc2V0TGF5b3V0T3B0aW9ucyh7IHJhdGlvczogc2l6ZVJhdGlvcyB9KTtcbn1cbmZ1bmN0aW9uIE92ZXJsYXlMYXlvdXQoY29udGV4dCwgb3B0aW9ucykge1xuICAgIHZhciBoZWlnaHQgPSAoY29udGV4dC5zaXplWzFdIC0gb3B0aW9ucy5pdGVtU2l6ZSkgLyAyO1xuICAgIGNvbnRleHQuc2V0KCd0b3AnLCB7XG4gICAgICAgIHNpemU6IFtcbiAgICAgICAgICAgIGNvbnRleHQuc2l6ZVswXSxcbiAgICAgICAgICAgIGhlaWdodFxuICAgICAgICBdLFxuICAgICAgICB0cmFuc2xhdGU6IFtcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMVxuICAgICAgICBdXG4gICAgfSk7XG4gICAgY29udGV4dC5zZXQoJ21pZGRsZScsIHtcbiAgICAgICAgc2l6ZTogW1xuICAgICAgICAgICAgY29udGV4dC5zaXplWzBdLFxuICAgICAgICAgICAgY29udGV4dC5zaXplWzFdIC0gaGVpZ2h0ICogMlxuICAgICAgICBdLFxuICAgICAgICB0cmFuc2xhdGU6IFtcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICBoZWlnaHQsXG4gICAgICAgICAgICAxXG4gICAgICAgIF1cbiAgICB9KTtcbiAgICBjb250ZXh0LnNldCgnYm90dG9tJywge1xuICAgICAgICBzaXplOiBbXG4gICAgICAgICAgICBjb250ZXh0LnNpemVbMF0sXG4gICAgICAgICAgICBoZWlnaHRcbiAgICAgICAgXSxcbiAgICAgICAgdHJhbnNsYXRlOiBbXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgY29udGV4dC5zaXplWzFdIC0gaGVpZ2h0LFxuICAgICAgICAgICAgMVxuICAgICAgICBdXG4gICAgfSk7XG59XG5mdW5jdGlvbiBfY3JlYXRlT3ZlcmxheSgpIHtcbiAgICB0aGlzLm92ZXJsYXkgPSBuZXcgTGF5b3V0Q29udHJvbGxlcih7XG4gICAgICAgIGxheW91dDogT3ZlcmxheUxheW91dCxcbiAgICAgICAgbGF5b3V0T3B0aW9uczogeyBpdGVtU2l6ZTogdGhpcy5vcHRpb25zLndoZWVsTGF5b3V0Lml0ZW1TaXplIH0sXG4gICAgICAgIGRhdGFTb3VyY2U6IHRoaXMuX292ZXJsYXlSZW5kZXJhYmxlc1xuICAgIH0pO1xuICAgIHRoaXMuYWRkKHRoaXMub3ZlcmxheSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IERhdGVQaWNrZXI7IiwidmFyIFN1cmZhY2UgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IHdpbmRvdy5mYW1vdXMuY29yZS5TdXJmYWNlIDogdHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcgPyBnbG9iYWwuZmFtb3VzLmNvcmUuU3VyZmFjZSA6IG51bGw7XG52YXIgRXZlbnRIYW5kbGVyID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cuZmFtb3VzLmNvcmUuRXZlbnRIYW5kbGVyIDogdHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcgPyBnbG9iYWwuZmFtb3VzLmNvcmUuRXZlbnRIYW5kbGVyIDogbnVsbDtcbmZ1bmN0aW9uIGRlY2ltYWwxKGRhdGUpIHtcbiAgICByZXR1cm4gJycgKyBkYXRlW3RoaXMuZ2V0XSgpO1xufVxuZnVuY3Rpb24gZGVjaW1hbDIoZGF0ZSkge1xuICAgIHJldHVybiAoJzAnICsgZGF0ZVt0aGlzLmdldF0oKSkuc2xpY2UoLTIpO1xufVxuZnVuY3Rpb24gZGVjaW1hbDMoZGF0ZSkge1xuICAgIHJldHVybiAoJzAwJyArIGRhdGVbdGhpcy5nZXRdKCkpLnNsaWNlKC0zKTtcbn1cbmZ1bmN0aW9uIGRlY2ltYWw0KGRhdGUpIHtcbiAgICByZXR1cm4gKCcwMDAnICsgZGF0ZVt0aGlzLmdldF0oKSkuc2xpY2UoLTQpO1xufVxuZnVuY3Rpb24gQmFzZShvcHRpb25zKSB7XG4gICAgdGhpcy5fZXZlbnRPdXRwdXQgPSBuZXcgRXZlbnRIYW5kbGVyKCk7XG4gICAgdGhpcy5fcG9vbCA9IFtdO1xuICAgIEV2ZW50SGFuZGxlci5zZXRPdXRwdXRIYW5kbGVyKHRoaXMsIHRoaXMuX2V2ZW50T3V0cHV0KTtcbiAgICBpZiAob3B0aW9ucykge1xuICAgICAgICBmb3IgKHZhciBrZXkgaW4gb3B0aW9ucykge1xuICAgICAgICAgICAgdGhpc1trZXldID0gb3B0aW9uc1trZXldO1xuICAgICAgICB9XG4gICAgfVxufVxuQmFzZS5wcm90b3R5cGUuc3RlcCA9IDE7XG5CYXNlLnByb3RvdHlwZS5jbGFzc2VzID0gWydpdGVtJ107XG5CYXNlLnByb3RvdHlwZS5nZXRDb21wb25lbnQgPSBmdW5jdGlvbiAoZGF0ZSkge1xuICAgIHJldHVybiBkYXRlW3RoaXMuZ2V0XSgpO1xufTtcbkJhc2UucHJvdG90eXBlLnNldENvbXBvbmVudCA9IGZ1bmN0aW9uIChkYXRlLCB2YWx1ZSkge1xuICAgIHJldHVybiBkYXRlW3RoaXMuc2V0XSh2YWx1ZSk7XG59O1xuQmFzZS5wcm90b3R5cGUuZm9ybWF0ID0gZnVuY3Rpb24gKGRhdGUpIHtcbiAgICByZXR1cm4gJ292ZXJpZGUgdG8gaW1wbGVtZW50Jztcbn07XG5CYXNlLnByb3RvdHlwZS5jcmVhdGVOZXh0ID0gZnVuY3Rpb24gKHJlbmRlcmFibGUpIHtcbiAgICB2YXIgZGF0ZSA9IHRoaXMuZ2V0TmV4dChyZW5kZXJhYmxlLmRhdGUpO1xuICAgIHJldHVybiBkYXRlID8gdGhpcy5jcmVhdGUoZGF0ZSkgOiB1bmRlZmluZWQ7XG59O1xuQmFzZS5wcm90b3R5cGUuZ2V0TmV4dCA9IGZ1bmN0aW9uIChkYXRlKSB7XG4gICAgZGF0ZSA9IG5ldyBEYXRlKGRhdGUuZ2V0VGltZSgpKTtcbiAgICB2YXIgbmV3VmFsID0gdGhpcy5nZXRDb21wb25lbnQoZGF0ZSkgKyB0aGlzLnN0ZXA7XG4gICAgaWYgKHRoaXMudXBwZXJCb3VuZCAhPT0gdW5kZWZpbmVkICYmIG5ld1ZhbCA+PSB0aGlzLnVwcGVyQm91bmQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmxvb3ApIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgbmV3VmFsID0gTWF0aC5tYXgobmV3VmFsICUgdGhpcy51cHBlckJvdW5kLCB0aGlzLmxvd2VyQm91bmQgfHwgMCk7XG4gICAgfVxuICAgIHRoaXMuc2V0Q29tcG9uZW50KGRhdGUsIG5ld1ZhbCk7XG4gICAgcmV0dXJuIGRhdGU7XG59O1xuQmFzZS5wcm90b3R5cGUuY3JlYXRlUHJldmlvdXMgPSBmdW5jdGlvbiAocmVuZGVyYWJsZSkge1xuICAgIHZhciBkYXRlID0gdGhpcy5nZXRQcmV2aW91cyhyZW5kZXJhYmxlLmRhdGUpO1xuICAgIHJldHVybiBkYXRlID8gdGhpcy5jcmVhdGUoZGF0ZSkgOiB1bmRlZmluZWQ7XG59O1xuQmFzZS5wcm90b3R5cGUuZ2V0UHJldmlvdXMgPSBmdW5jdGlvbiAoZGF0ZSkge1xuICAgIGRhdGUgPSBuZXcgRGF0ZShkYXRlLmdldFRpbWUoKSk7XG4gICAgdmFyIG5ld1ZhbCA9IHRoaXMuZ2V0Q29tcG9uZW50KGRhdGUpIC0gdGhpcy5zdGVwO1xuICAgIGlmICh0aGlzLmxvd2VyQm91bmQgIT09IHVuZGVmaW5lZCAmJiBuZXdWYWwgPCB0aGlzLmxvd2VyQm91bmQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmxvb3ApIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgbmV3VmFsID0gbmV3VmFsICUgdGhpcy51cHBlckJvdW5kO1xuICAgIH1cbiAgICB0aGlzLnNldENvbXBvbmVudChkYXRlLCBuZXdWYWwpO1xuICAgIHJldHVybiBkYXRlO1xufTtcbkJhc2UucHJvdG90eXBlLmluc3RhbGxDbGlja0hhbmRsZXIgPSBmdW5jdGlvbiAocmVuZGVyYWJsZSkge1xuICAgIHJlbmRlcmFibGUub24oJ2NsaWNrJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuX2V2ZW50T3V0cHV0LmVtaXQoJ2NsaWNrJywge1xuICAgICAgICAgICAgdGFyZ2V0OiByZW5kZXJhYmxlLFxuICAgICAgICAgICAgZXZlbnQ6IGV2ZW50XG4gICAgICAgIH0pO1xuICAgIH0uYmluZCh0aGlzKSk7XG59O1xuQmFzZS5wcm90b3R5cGUuY3JlYXRlUmVuZGVyYWJsZSA9IGZ1bmN0aW9uIChjbGFzc2VzLCBkYXRhKSB7XG4gICAgcmV0dXJuIG5ldyBTdXJmYWNlKHtcbiAgICAgICAgY2xhc3NlczogY2xhc3NlcyxcbiAgICAgICAgY29udGVudDogJzxkaXY+JyArIGRhdGEgKyAnPC9kaXY+J1xuICAgIH0pO1xufTtcbkJhc2UucHJvdG90eXBlLmNyZWF0ZSA9IGZ1bmN0aW9uIChkYXRlKSB7XG4gICAgZGF0ZSA9IGRhdGUgfHwgbmV3IERhdGUoKTtcbiAgICB2YXIgcmVuZGVyYWJsZTtcbiAgICBpZiAodGhpcy5fcG9vbC5sZW5ndGgpIHtcbiAgICAgICAgcmVuZGVyYWJsZSA9IHRoaXMuX3Bvb2xbMF07XG4gICAgICAgIHRoaXMuX3Bvb2wuc3BsaWNlKDAsIDEpO1xuICAgICAgICByZW5kZXJhYmxlLnNldENvbnRlbnQodGhpcy5mb3JtYXQoZGF0ZSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJlbmRlcmFibGUgPSB0aGlzLmNyZWF0ZVJlbmRlcmFibGUodGhpcy5jbGFzc2VzLCB0aGlzLmZvcm1hdChkYXRlKSk7XG4gICAgICAgIHRoaXMuaW5zdGFsbENsaWNrSGFuZGxlcihyZW5kZXJhYmxlKTtcbiAgICB9XG4gICAgcmVuZGVyYWJsZS5kYXRlID0gZGF0ZTtcbiAgICByZXR1cm4gcmVuZGVyYWJsZTtcbn07XG5CYXNlLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKHJlbmRlcmFibGUpIHtcbiAgICB0aGlzLl9wb29sLnB1c2gocmVuZGVyYWJsZSk7XG59O1xuZnVuY3Rpb24gWWVhcigpIHtcbiAgICBCYXNlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59XG5ZZWFyLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoQmFzZS5wcm90b3R5cGUpO1xuWWVhci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBZZWFyO1xuWWVhci5wcm90b3R5cGUuY2xhc3NlcyA9IFtcbiAgICAnaXRlbScsXG4gICAgJ3llYXInXG5dO1xuWWVhci5wcm90b3R5cGUuZm9ybWF0ID0gZGVjaW1hbDQ7XG5ZZWFyLnByb3RvdHlwZS5zaXplUmF0aW8gPSAxO1xuWWVhci5wcm90b3R5cGUuc3RlcCA9IDE7XG5ZZWFyLnByb3RvdHlwZS5sb29wID0gZmFsc2U7XG5ZZWFyLnByb3RvdHlwZS5zZXQgPSAnc2V0RnVsbFllYXInO1xuWWVhci5wcm90b3R5cGUuZ2V0ID0gJ2dldEZ1bGxZZWFyJztcbmZ1bmN0aW9uIE1vbnRoKCkge1xuICAgIEJhc2UuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn1cbk1vbnRoLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoQmFzZS5wcm90b3R5cGUpO1xuTW9udGgucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gTW9udGg7XG5Nb250aC5wcm90b3R5cGUuY2xhc3NlcyA9IFtcbiAgICAnaXRlbScsXG4gICAgJ21vbnRoJ1xuXTtcbk1vbnRoLnByb3RvdHlwZS5zaXplUmF0aW8gPSAyO1xuTW9udGgucHJvdG90eXBlLmxvd2VyQm91bmQgPSAwO1xuTW9udGgucHJvdG90eXBlLnVwcGVyQm91bmQgPSAxMjtcbk1vbnRoLnByb3RvdHlwZS5zdGVwID0gMTtcbk1vbnRoLnByb3RvdHlwZS5sb29wID0gdHJ1ZTtcbk1vbnRoLnByb3RvdHlwZS5zZXQgPSAnc2V0TW9udGgnO1xuTW9udGgucHJvdG90eXBlLmdldCA9ICdnZXRNb250aCc7XG5Nb250aC5wcm90b3R5cGUuc3RyaW5ncyA9IFtcbiAgICAnSmFudWFyeScsXG4gICAgJ0ZlYnJ1YXJ5JyxcbiAgICAnTWFyY2gnLFxuICAgICdBcHJpbCcsXG4gICAgJ01heScsXG4gICAgJ0p1bmUnLFxuICAgICdKdWx5JyxcbiAgICAnQXVndXN0JyxcbiAgICAnU2VwdGVtYmVyJyxcbiAgICAnT2N0b2JlcicsXG4gICAgJ05vdmVtYmVyJyxcbiAgICAnRGVjZW1iZXInXG5dO1xuTW9udGgucHJvdG90eXBlLmZvcm1hdCA9IGZ1bmN0aW9uIChkYXRlKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RyaW5nc1tkYXRlLmdldE1vbnRoKCldO1xufTtcbmZ1bmN0aW9uIEZ1bGxEYXkoKSB7XG4gICAgQmFzZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufVxuRnVsbERheS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEJhc2UucHJvdG90eXBlKTtcbkZ1bGxEYXkucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gRnVsbERheTtcbkZ1bGxEYXkucHJvdG90eXBlLmNsYXNzZXMgPSBbXG4gICAgJ2l0ZW0nLFxuICAgICdmdWxsZGF5J1xuXTtcbkZ1bGxEYXkucHJvdG90eXBlLnNpemVSYXRpbyA9IDI7XG5GdWxsRGF5LnByb3RvdHlwZS5zdGVwID0gMTtcbkZ1bGxEYXkucHJvdG90eXBlLnNldCA9ICdzZXREYXRlJztcbkZ1bGxEYXkucHJvdG90eXBlLmdldCA9ICdnZXREYXRlJztcbkZ1bGxEYXkucHJvdG90eXBlLmZvcm1hdCA9IGZ1bmN0aW9uIChkYXRlKSB7XG4gICAgcmV0dXJuIGRhdGUudG9Mb2NhbGVEYXRlU3RyaW5nKCk7XG59O1xuZnVuY3Rpb24gV2Vla0RheSgpIHtcbiAgICBCYXNlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59XG5XZWVrRGF5LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoQmFzZS5wcm90b3R5cGUpO1xuV2Vla0RheS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBXZWVrRGF5O1xuV2Vla0RheS5wcm90b3R5cGUuY2xhc3NlcyA9IFtcbiAgICAnaXRlbScsXG4gICAgJ3dlZWtkYXknXG5dO1xuV2Vla0RheS5wcm90b3R5cGUuc2l6ZVJhdGlvID0gMjtcbldlZWtEYXkucHJvdG90eXBlLmxvd2VyQm91bmQgPSAwO1xuV2Vla0RheS5wcm90b3R5cGUudXBwZXJCb3VuZCA9IDc7XG5XZWVrRGF5LnByb3RvdHlwZS5zdGVwID0gMTtcbldlZWtEYXkucHJvdG90eXBlLmxvb3AgPSB0cnVlO1xuV2Vla0RheS5wcm90b3R5cGUuc2V0ID0gJ3NldERhdGUnO1xuV2Vla0RheS5wcm90b3R5cGUuZ2V0ID0gJ2dldERhdGUnO1xuV2Vla0RheS5wcm90b3R5cGUuc3RyaW5ncyA9IFtcbiAgICAnU3VuZGF5JyxcbiAgICAnTW9uZGF5JyxcbiAgICAnVHVlc2RheScsXG4gICAgJ1dlZG5lc2RheScsXG4gICAgJ1RodXJzZGF5JyxcbiAgICAnRnJpZGF5JyxcbiAgICAnU2F0dXJkYXknXG5dO1xuV2Vla0RheS5wcm90b3R5cGUuZm9ybWF0ID0gZnVuY3Rpb24gKGRhdGUpIHtcbiAgICByZXR1cm4gdGhpcy5zdHJpbmdzW2RhdGUuZ2V0RGF5KCldO1xufTtcbmZ1bmN0aW9uIERheSgpIHtcbiAgICBCYXNlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59XG5EYXkucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShCYXNlLnByb3RvdHlwZSk7XG5EYXkucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gRGF5O1xuRGF5LnByb3RvdHlwZS5jbGFzc2VzID0gW1xuICAgICdpdGVtJyxcbiAgICAnZGF5J1xuXTtcbkRheS5wcm90b3R5cGUuZm9ybWF0ID0gZGVjaW1hbDE7XG5EYXkucHJvdG90eXBlLnNpemVSYXRpbyA9IDE7XG5EYXkucHJvdG90eXBlLmxvd2VyQm91bmQgPSAxO1xuRGF5LnByb3RvdHlwZS51cHBlckJvdW5kID0gMzI7XG5EYXkucHJvdG90eXBlLnN0ZXAgPSAxO1xuRGF5LnByb3RvdHlwZS5sb29wID0gdHJ1ZTtcbkRheS5wcm90b3R5cGUuc2V0ID0gJ3NldERhdGUnO1xuRGF5LnByb3RvdHlwZS5nZXQgPSAnZ2V0RGF0ZSc7XG5mdW5jdGlvbiBIb3VyKCkge1xuICAgIEJhc2UuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn1cbkhvdXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShCYXNlLnByb3RvdHlwZSk7XG5Ib3VyLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEhvdXI7XG5Ib3VyLnByb3RvdHlwZS5jbGFzc2VzID0gW1xuICAgICdpdGVtJyxcbiAgICAnaG91cidcbl07XG5Ib3VyLnByb3RvdHlwZS5mb3JtYXQgPSBkZWNpbWFsMjtcbkhvdXIucHJvdG90eXBlLnNpemVSYXRpbyA9IDE7XG5Ib3VyLnByb3RvdHlwZS5sb3dlckJvdW5kID0gMDtcbkhvdXIucHJvdG90eXBlLnVwcGVyQm91bmQgPSAyNDtcbkhvdXIucHJvdG90eXBlLnN0ZXAgPSAxO1xuSG91ci5wcm90b3R5cGUubG9vcCA9IHRydWU7XG5Ib3VyLnByb3RvdHlwZS5zZXQgPSAnc2V0SG91cnMnO1xuSG91ci5wcm90b3R5cGUuZ2V0ID0gJ2dldEhvdXJzJztcbmZ1bmN0aW9uIE1pbnV0ZSgpIHtcbiAgICBCYXNlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59XG5NaW51dGUucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShCYXNlLnByb3RvdHlwZSk7XG5NaW51dGUucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gTWludXRlO1xuTWludXRlLnByb3RvdHlwZS5jbGFzc2VzID0gW1xuICAgICdpdGVtJyxcbiAgICAnbWludXRlJ1xuXTtcbk1pbnV0ZS5wcm90b3R5cGUuZm9ybWF0ID0gZGVjaW1hbDI7XG5NaW51dGUucHJvdG90eXBlLnNpemVSYXRpbyA9IDE7XG5NaW51dGUucHJvdG90eXBlLmxvd2VyQm91bmQgPSAwO1xuTWludXRlLnByb3RvdHlwZS51cHBlckJvdW5kID0gNjA7XG5NaW51dGUucHJvdG90eXBlLnN0ZXAgPSAxO1xuTWludXRlLnByb3RvdHlwZS5sb29wID0gdHJ1ZTtcbk1pbnV0ZS5wcm90b3R5cGUuc2V0ID0gJ3NldE1pbnV0ZXMnO1xuTWludXRlLnByb3RvdHlwZS5nZXQgPSAnZ2V0TWludXRlcyc7XG5mdW5jdGlvbiBTZWNvbmQoKSB7XG4gICAgQmFzZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufVxuU2Vjb25kLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoQmFzZS5wcm90b3R5cGUpO1xuU2Vjb25kLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFNlY29uZDtcblNlY29uZC5wcm90b3R5cGUuY2xhc3NlcyA9IFtcbiAgICAnaXRlbScsXG4gICAgJ3NlY29uZCdcbl07XG5TZWNvbmQucHJvdG90eXBlLmZvcm1hdCA9IGRlY2ltYWwyO1xuU2Vjb25kLnByb3RvdHlwZS5zaXplUmF0aW8gPSAxO1xuU2Vjb25kLnByb3RvdHlwZS5sb3dlckJvdW5kID0gMDtcblNlY29uZC5wcm90b3R5cGUudXBwZXJCb3VuZCA9IDYwO1xuU2Vjb25kLnByb3RvdHlwZS5zdGVwID0gMTtcblNlY29uZC5wcm90b3R5cGUubG9vcCA9IHRydWU7XG5TZWNvbmQucHJvdG90eXBlLnNldCA9ICdzZXRTZWNvbmRzJztcblNlY29uZC5wcm90b3R5cGUuZ2V0ID0gJ2dldFNlY29uZHMnO1xuZnVuY3Rpb24gTWlsbGlzZWNvbmQoKSB7XG4gICAgQmFzZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufVxuTWlsbGlzZWNvbmQucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShCYXNlLnByb3RvdHlwZSk7XG5NaWxsaXNlY29uZC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBNaWxsaXNlY29uZDtcbk1pbGxpc2Vjb25kLnByb3RvdHlwZS5jbGFzc2VzID0gW1xuICAgICdpdGVtJyxcbiAgICAnbWlsbGlzZWNvbmQnXG5dO1xuTWlsbGlzZWNvbmQucHJvdG90eXBlLmZvcm1hdCA9IGRlY2ltYWwzO1xuTWlsbGlzZWNvbmQucHJvdG90eXBlLnNpemVSYXRpbyA9IDE7XG5NaWxsaXNlY29uZC5wcm90b3R5cGUubG93ZXJCb3VuZCA9IDA7XG5NaWxsaXNlY29uZC5wcm90b3R5cGUudXBwZXJCb3VuZCA9IDEwMDA7XG5NaWxsaXNlY29uZC5wcm90b3R5cGUuc3RlcCA9IDE7XG5NaWxsaXNlY29uZC5wcm90b3R5cGUubG9vcCA9IHRydWU7XG5NaWxsaXNlY29uZC5wcm90b3R5cGUuc2V0ID0gJ3NldE1pbGxpc2Vjb25kcyc7XG5NaWxsaXNlY29uZC5wcm90b3R5cGUuZ2V0ID0gJ2dldE1pbGxpc2Vjb25kcyc7XG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBCYXNlOiBCYXNlLFxuICAgIFllYXI6IFllYXIsXG4gICAgTW9udGg6IE1vbnRoLFxuICAgIEZ1bGxEYXk6IEZ1bGxEYXksXG4gICAgV2Vla0RheTogV2Vla0RheSxcbiAgICBEYXk6IERheSxcbiAgICBIb3VyOiBIb3VyLFxuICAgIE1pbnV0ZTogTWludXRlLFxuICAgIFNlY29uZDogU2Vjb25kLFxuICAgIE1pbGxpc2Vjb25kOiBNaWxsaXNlY29uZFxufTsiLCJ2YXIgU3VyZmFjZSA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gd2luZG93LmZhbW91cy5jb3JlLlN1cmZhY2UgOiB0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJyA/IGdsb2JhbC5mYW1vdXMuY29yZS5TdXJmYWNlIDogbnVsbDtcbnZhciBWaWV3ID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cuZmFtb3VzLmNvcmUuVmlldyA6IHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnID8gZ2xvYmFsLmZhbW91cy5jb3JlLlZpZXcgOiBudWxsO1xudmFyIExheW91dENvbnRyb2xsZXIgPSByZXF1aXJlKCcuLi9MYXlvdXRDb250cm9sbGVyJyk7XG52YXIgVGFiQmFyTGF5b3V0ID0gcmVxdWlyZSgnLi4vbGF5b3V0cy9UYWJCYXJMYXlvdXQnKTtcbmZ1bmN0aW9uIFRhYkJhcihvcHRpb25zKSB7XG4gICAgVmlldy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIHRoaXMuX3NlbGVjdGVkSXRlbUluZGV4ID0gLTE7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgdGhpcy5jbGFzc2VzID0gb3B0aW9ucy5jbGFzc2VzID8gdGhpcy5jbGFzc2VzLmNvbmNhdChvcHRpb25zLmNsYXNzZXMpIDogdGhpcy5jbGFzc2VzO1xuICAgIHRoaXMubGF5b3V0ID0gbmV3IExheW91dENvbnRyb2xsZXIodGhpcy5vcHRpb25zLmxheW91dENvbnRyb2xsZXIpO1xuICAgIHRoaXMuYWRkKHRoaXMubGF5b3V0KTtcbiAgICB0aGlzLmxheW91dC5waXBlKHRoaXMuX2V2ZW50T3V0cHV0KTtcbiAgICB0aGlzLl9yZW5kZXJhYmxlcyA9IHtcbiAgICAgICAgaXRlbXM6IFtdLFxuICAgICAgICBzcGFjZXJzOiBbXSxcbiAgICAgICAgYmFja2dyb3VuZDogX2NyZWF0ZVJlbmRlcmFibGUuY2FsbCh0aGlzLCAnYmFja2dyb3VuZCcpLFxuICAgICAgICBzZWxlY3RlZEl0ZW1PdmVybGF5OiBfY3JlYXRlUmVuZGVyYWJsZS5jYWxsKHRoaXMsICdzZWxlY3RlZEl0ZW1PdmVybGF5JylcbiAgICB9O1xuICAgIHRoaXMuc2V0T3B0aW9ucyh0aGlzLm9wdGlvbnMpO1xufVxuVGFiQmFyLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoVmlldy5wcm90b3R5cGUpO1xuVGFiQmFyLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFRhYkJhcjtcblRhYkJhci5wcm90b3R5cGUuY2xhc3NlcyA9IFtcbiAgICAnZmYtd2lkZ2V0JyxcbiAgICAnZmYtdGFiYmFyJ1xuXTtcblRhYkJhci5ERUZBVUxUX09QVElPTlMgPSB7XG4gICAgdGFiQmFyTGF5b3V0OiB7XG4gICAgICAgIG1hcmdpbnM6IFtcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDBcbiAgICAgICAgXSxcbiAgICAgICAgc3BhY2luZzogMFxuICAgIH0sXG4gICAgY3JlYXRlUmVuZGVyYWJsZXM6IHtcbiAgICAgICAgaXRlbTogdHJ1ZSxcbiAgICAgICAgYmFja2dyb3VuZDogZmFsc2UsXG4gICAgICAgIHNlbGVjdGVkSXRlbU92ZXJsYXk6IGZhbHNlLFxuICAgICAgICBzcGFjZXI6IGZhbHNlXG4gICAgfSxcbiAgICBsYXlvdXRDb250cm9sbGVyOiB7XG4gICAgICAgIGF1dG9QaXBlRXZlbnRzOiB0cnVlLFxuICAgICAgICBsYXlvdXQ6IFRhYkJhckxheW91dCxcbiAgICAgICAgZmxvdzogdHJ1ZSxcbiAgICAgICAgcmVmbG93T25SZXNpemU6IGZhbHNlLFxuICAgICAgICBub2RlU3ByaW5nOiB7XG4gICAgICAgICAgICBkYW1waW5nUmF0aW86IDAuOCxcbiAgICAgICAgICAgIHBlcmlvZDogMzAwXG4gICAgICAgIH1cbiAgICB9XG59O1xuZnVuY3Rpb24gX3NldFNlbGVjdGVkSXRlbShpbmRleCkge1xuICAgIGlmIChpbmRleCAhPT0gdGhpcy5fc2VsZWN0ZWRJdGVtSW5kZXgpIHtcbiAgICAgICAgdmFyIG9sZEluZGV4ID0gdGhpcy5fc2VsZWN0ZWRJdGVtSW5kZXg7XG4gICAgICAgIHRoaXMuX3NlbGVjdGVkSXRlbUluZGV4ID0gaW5kZXg7XG4gICAgICAgIHRoaXMubGF5b3V0LnNldExheW91dE9wdGlvbnMoeyBzZWxlY3RlZEl0ZW1JbmRleDogaW5kZXggfSk7XG4gICAgICAgIGlmIChvbGRJbmRleCA+PSAwICYmIHRoaXMuX3JlbmRlcmFibGVzLml0ZW1zW29sZEluZGV4XS5yZW1vdmVDbGFzcykge1xuICAgICAgICAgICAgdGhpcy5fcmVuZGVyYWJsZXMuaXRlbXNbb2xkSW5kZXhdLnJlbW92ZUNsYXNzKCdzZWxlY3RlZCcpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9yZW5kZXJhYmxlcy5pdGVtc1tpbmRleF0uYWRkQ2xhc3MpIHtcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlcmFibGVzLml0ZW1zW2luZGV4XS5hZGRDbGFzcygnc2VsZWN0ZWQnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob2xkSW5kZXggPj0gMCkge1xuICAgICAgICAgICAgdGhpcy5fZXZlbnRPdXRwdXQuZW1pdCgndGFiY2hhbmdlJywge1xuICAgICAgICAgICAgICAgIHRhcmdldDogdGhpcyxcbiAgICAgICAgICAgICAgICBpbmRleDogaW5kZXgsXG4gICAgICAgICAgICAgICAgb2xkSW5kZXg6IG9sZEluZGV4LFxuICAgICAgICAgICAgICAgIGl0ZW06IHRoaXMuX3JlbmRlcmFibGVzLml0ZW1zW2luZGV4XVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5mdW5jdGlvbiBfY3JlYXRlUmVuZGVyYWJsZShpZCwgZGF0YSkge1xuICAgIHZhciBvcHRpb24gPSB0aGlzLm9wdGlvbnMuY3JlYXRlUmVuZGVyYWJsZXNbaWRdO1xuICAgIGlmIChvcHRpb24gaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgICAgICByZXR1cm4gb3B0aW9uLmNhbGwodGhpcywgaWQsIGRhdGEpO1xuICAgIH0gZWxzZSBpZiAoIW9wdGlvbikge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBpZiAoZGF0YSAhPT0gdW5kZWZpbmVkICYmIGRhdGEgaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuICAgIHZhciBzdXJmYWNlID0gbmV3IFN1cmZhY2Uoe1xuICAgICAgICAgICAgY2xhc3NlczogdGhpcy5jbGFzc2VzLFxuICAgICAgICAgICAgY29udGVudDogZGF0YSA/ICc8ZGl2PicgKyBkYXRhICsgJzwvZGl2PicgOiB1bmRlZmluZWRcbiAgICAgICAgfSk7XG4gICAgc3VyZmFjZS5hZGRDbGFzcyhpZCk7XG4gICAgaWYgKGlkID09PSAnaXRlbScpIHtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy50YWJCYXJMYXlvdXQgJiYgdGhpcy5vcHRpb25zLnRhYkJhckxheW91dC5pdGVtU2l6ZSAmJiB0aGlzLm9wdGlvbnMudGFiQmFyTGF5b3V0Lml0ZW1TaXplID09PSB0cnVlKSB7XG4gICAgICAgICAgICBzdXJmYWNlLnNldFNpemUodGhpcy5sYXlvdXQuZ2V0RGlyZWN0aW9uKCkgPyBbXG4gICAgICAgICAgICAgICAgdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgIHRydWVcbiAgICAgICAgICAgIF0gOiBbXG4gICAgICAgICAgICAgICAgdHJ1ZSxcbiAgICAgICAgICAgICAgICB1bmRlZmluZWRcbiAgICAgICAgICAgIF0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzdXJmYWNlO1xufVxuVGFiQmFyLnByb3RvdHlwZS5zZXRPcHRpb25zID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICBWaWV3LnByb3RvdHlwZS5zZXRPcHRpb25zLmNhbGwodGhpcywgb3B0aW9ucyk7XG4gICAgaWYgKCF0aGlzLmxheW91dCkge1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMudGFiQmFyTGF5b3V0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5sYXlvdXQuc2V0TGF5b3V0T3B0aW9ucyhvcHRpb25zLnRhYkJhckxheW91dCk7XG4gICAgfVxuICAgIGlmIChvcHRpb25zLmxheW91dENvbnRyb2xsZXIpIHtcbiAgICAgICAgdGhpcy5sYXlvdXQuc2V0T3B0aW9ucyhvcHRpb25zLmxheW91dENvbnRyb2xsZXIpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbn07XG5UYWJCYXIucHJvdG90eXBlLnNldEl0ZW1zID0gZnVuY3Rpb24gKGl0ZW1zKSB7XG4gICAgdmFyIGN1cnJlbnRJbmRleCA9IHRoaXMuX3NlbGVjdGVkSXRlbUluZGV4O1xuICAgIHRoaXMuX3NlbGVjdGVkSXRlbUluZGV4ID0gLTE7XG4gICAgdGhpcy5fcmVuZGVyYWJsZXMuaXRlbXMgPSBbXTtcbiAgICB0aGlzLl9yZW5kZXJhYmxlcy5zcGFjZXJzID0gW107XG4gICAgaWYgKGl0ZW1zKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBpdGVtID0gX2NyZWF0ZVJlbmRlcmFibGUuY2FsbCh0aGlzLCAnaXRlbScsIGl0ZW1zW2ldKTtcbiAgICAgICAgICAgIGlmIChpdGVtLm9uKSB7XG4gICAgICAgICAgICAgICAgaXRlbS5vbignY2xpY2snLCBfc2V0U2VsZWN0ZWRJdGVtLmJpbmQodGhpcywgaSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fcmVuZGVyYWJsZXMuaXRlbXMucHVzaChpdGVtKTtcbiAgICAgICAgICAgIGlmIChpIDwgaXRlbXMubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgICAgIHZhciBzcGFjZXIgPSBfY3JlYXRlUmVuZGVyYWJsZS5jYWxsKHRoaXMsICdzcGFjZXInLCAnICcpO1xuICAgICAgICAgICAgICAgIGlmIChzcGFjZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyYWJsZXMuc3BhY2Vycy5wdXNoKHNwYWNlcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHRoaXMubGF5b3V0LnNldERhdGFTb3VyY2UodGhpcy5fcmVuZGVyYWJsZXMpO1xuICAgIGlmICh0aGlzLl9yZW5kZXJhYmxlcy5pdGVtcy5sZW5ndGgpIHtcbiAgICAgICAgX3NldFNlbGVjdGVkSXRlbS5jYWxsKHRoaXMsIE1hdGgubWF4KE1hdGgubWluKGN1cnJlbnRJbmRleCwgdGhpcy5fcmVuZGVyYWJsZXMuaXRlbXMubGVuZ3RoIC0gMSksIDApKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuVGFiQmFyLnByb3RvdHlwZS5nZXRJdGVtcyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5fcmVuZGVyYWJsZXMuaXRlbXM7XG59O1xuVGFiQmFyLnByb3RvdHlwZS5nZXRJdGVtU3BlYyA9IGZ1bmN0aW9uIChpbmRleCwgbm9ybWFsaXplKSB7XG4gICAgcmV0dXJuIHRoaXMubGF5b3V0LmdldFNwZWModGhpcy5fcmVuZGVyYWJsZXMuaXRlbXNbaW5kZXhdLCBub3JtYWxpemUpO1xufTtcblRhYkJhci5wcm90b3R5cGUuc2V0U2VsZWN0ZWRJdGVtSW5kZXggPSBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICBfc2V0U2VsZWN0ZWRJdGVtLmNhbGwodGhpcywgaW5kZXgpO1xuICAgIHJldHVybiB0aGlzO1xufTtcblRhYkJhci5wcm90b3R5cGUuZ2V0U2VsZWN0ZWRJdGVtSW5kZXggPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkSXRlbUluZGV4O1xufTtcblRhYkJhci5wcm90b3R5cGUuZ2V0U2l6ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLnNpemUgfHwgKHRoaXMubGF5b3V0ID8gdGhpcy5sYXlvdXQuZ2V0U2l6ZSgpIDogVmlldy5wcm90b3R5cGUuZ2V0U2l6ZS5jYWxsKHRoaXMpKTtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IFRhYkJhcjsiXX0=


// --- file[pouchdb.js] ---

//    PouchDB 3.3.1
//    
//    (c) 2012-2015 Dale Harvey and the PouchDB team
//    PouchDB may be freely distributed under the Apache license, version 2.0.
//    For all details and documentation:
//    http://pouchdb.com
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;"undefined"!=typeof window?t=window:"undefined"!=typeof global?t=global:"undefined"!=typeof self&&(t=self),t.PouchDB=e()}}(function(){var define,module,exports;return function e(t,n,r){function o(s,a){if(!n[s]){if(!t[s]){var c="function"==typeof require&&require;if(!a&&c)return c(s,!0);if(i)return i(s,!0);var u=new Error("Cannot find module '"+s+"'");throw u.code="MODULE_NOT_FOUND",u}var f=n[s]={exports:{}};t[s][0].call(f.exports,function(e){var n=t[s][1][e];return o(n?n:e)},f,f.exports,e,t,n,r)}return n[s].exports}for(var i="function"==typeof require&&require,s=0;s<r.length;s++)o(r[s]);return o}({1:[function(e,t){"use strict";function n(e,t){for(var n=0;n<e.length;n++)if(t(e[n],n)===!0)return e[n];return!1}function r(e){return function(t,n){t||n[0]&&n[0].error?e(t||n[0]):e(null,n.length?n[0]:n)}}function o(e){var t={},n=[];return c.traverseRevTree(e,function(e,r,o,i){var s=r+"-"+o;return e&&(t[s]=0),void 0!==i&&n.push({from:i,to:s}),s}),n.reverse(),n.forEach(function(e){t[e.from]=void 0===t[e.from]?1+t[e.to]:Math.min(t[e.from],1+t[e.to])}),t}function i(e,t,n){var r="limit"in t?t.keys.slice(t.skip,t.limit+t.skip):t.skip>0?t.keys.slice(t.skip):t.keys;if(t.descending&&r.reverse(),!r.length)return e._allDocs({limit:0},n);var o={offset:t.skip};return p.all(r.map(function(n){var r=a.extend(!0,{key:n,deleted:"ok"},t);return["limit","skip","keys"].forEach(function(e){delete r[e]}),new p(function(t,i){e._allDocs(r,function(e,r){return e?i(e):(o.total_rows=r.total_rows,void t(r.rows[0]||{key:n,error:"not_found"}))})})})).then(function(e){return o.rows=e,o})}function s(){var e=this;f.call(this);var t,n=0,r=["change","delete","create","update"];this.on("newListener",function(o){if(~r.indexOf(o)){if(n)return void n++;n++;var i=0;t=this.changes({conflicts:!0,include_docs:!0,continuous:!0,since:"now",onChange:function(t){t.seq<=i||(i=t.seq,e.emit("change",t),t.doc._deleted?e.emit("delete",t):"1"===t.doc._rev.split("-")[0]?e.emit("create",t):e.emit("update",t))}})}}),this.on("removeListener",function(e){~r.indexOf(e)&&(n--,n||t.cancel())})}var a=e(34),c=e(29),u=e(19),f=e(38).EventEmitter,l=e(25),d=e(13),p=a.Promise;a.inherits(s,f),t.exports=s,s.prototype.post=a.adapterFun("post",function(e,t,n){return"function"==typeof t&&(n=t,t={}),"object"!=typeof e||Array.isArray(e)?n(u.error(u.NOT_AN_OBJECT)):void this.bulkDocs({docs:[e]},t,r(n))}),s.prototype.put=a.adapterFun("put",a.getArguments(function(e){var t,n,o,i,s=e.shift(),c="_id"in s;if("object"!=typeof s||Array.isArray(s))return(i=e.pop())(u.error(u.NOT_AN_OBJECT));for(s=a.clone(s);;)if(t=e.shift(),n=typeof t,"string"!==n||c?"string"!==n||!c||"_rev"in s?"object"===n?o=t:"function"===n&&(i=t):s._rev=t:(s._id=t,c=!0),!e.length)break;o=o||{};var f=a.invalidIdError(s._id);return f?i(f):a.isLocalId(s._id)&&"function"==typeof this._putLocal?s._deleted?this._removeLocal(s,i):this._putLocal(s,i):void this.bulkDocs({docs:[s]},o,r(i))})),s.prototype.putAttachment=a.adapterFun("putAttachment",function(e,t,n,r,o,i){function s(e){return e._attachments=e._attachments||{},e._attachments[t]={content_type:o,data:r},a.put(e)}var a=this;return"function"==typeof o&&(i=o,o=r,r=n,n=null),"undefined"==typeof o&&(o=r,r=n,n=null),a.get(e).then(function(e){if(e._rev!==n)throw u.error(u.REV_CONFLICT);return s(e)},function(t){if(t.reason===u.MISSING_DOC.message)return s({_id:e});throw t})}),s.prototype.removeAttachment=a.adapterFun("removeAttachment",function(e,t,n,r){var o=this;o.get(e,function(e,i){return e?void r(e):i._rev!==n?void r(u.error(u.REV_CONFLICT)):i._attachments?(delete i._attachments[t],0===Object.keys(i._attachments).length&&delete i._attachments,void o.put(i,r)):r()})}),s.prototype.remove=a.adapterFun("remove",function(e,t,n,o){var i;"string"==typeof t?(i={_id:e,_rev:t},"function"==typeof n&&(o=n,n={})):(i=e,"function"==typeof t?(o=t,n={}):(o=n,n=t)),n=a.clone(n||{}),n.was_delete=!0;var s={_id:i._id,_rev:i._rev||n.rev};return s._deleted=!0,a.isLocalId(s._id)&&"function"==typeof this._removeLocal?this._removeLocal(i,o):void this.bulkDocs({docs:[s]},n,r(o))}),s.prototype.revsDiff=a.adapterFun("revsDiff",function(e,t,n){function r(e,t){u.has(e)||u.set(e,{missing:[]}),u.get(e).missing.push(t)}function o(t,n){var o=e[t].slice(0);c.traverseRevTree(n,function(e,n,i,s,a){var c=n+"-"+i,u=o.indexOf(c);-1!==u&&(o.splice(u,1),"available"!==a.status&&r(t,c))}),o.forEach(function(e){r(t,e)})}"function"==typeof t&&(n=t,t={}),t=a.clone(t);var i=Object.keys(e);if(!i.length)return n(null,{});var s=0,u=new a.Map;i.map(function(t){this._getRevisionTree(t,function(r,a){if(r&&404===r.status&&"missing"===r.message)u.set(t,{missing:e[t]});else{if(r)return n(r);o(t,a)}if(++s===i.length){var c={};return u.forEach(function(e,t){c[t]=e}),n(null,c)}})},this)}),s.prototype.compactDocument=a.adapterFun("compactDocument",function(e,t,n){var r=this;this._getRevisionTree(e,function(i,s){if(i)return n(i);var a=o(s),u=[],f=[];Object.keys(a).forEach(function(e){a[e]>t&&u.push(e)}),c.traverseRevTree(s,function(e,t,n,r,o){var i=t+"-"+n;"available"===o.status&&-1!==u.indexOf(i)&&f.push(i)}),r._doCompaction(e,f,n)})}),s.prototype.compact=a.adapterFun("compact",function(e,t){"function"==typeof e&&(t=e,e={});var n=this;e=a.clone(e||{}),n.get("_local/compaction")["catch"](function(){return!1}).then(function(r){return"function"==typeof n._compact?(r&&r.last_seq&&(e.last_seq=r.last_seq),n._compact(e,t)):void 0})}),s.prototype._compact=function(e,t){function n(e){s.push(o.compactDocument(e.id,0))}function r(e){var n=e.last_seq;p.all(s).then(function(){return l(o,"_local/compaction",function(e){return!e.last_seq||e.last_seq<n?(e.last_seq=n,e):!1})}).then(function(){t(null,{ok:!0})})["catch"](t)}var o=this,i={returnDocs:!1,last_seq:e.last_seq||0},s=[];o.changes(i).on("change",n).on("complete",r).on("error",t)},s.prototype.get=a.adapterFun("get",function(e,t,r){function o(){var n=[],o=i.length;return o?void i.forEach(function(i){s.get(e,{rev:i,revs:t.revs,attachments:t.attachments},function(e,t){n.push(e?{missing:i}:{ok:t}),o--,o||r(null,n)})}):r(null,n)}if("function"==typeof t&&(r=t,t={}),"string"!=typeof e)return r(u.error(u.INVALID_ID));if(a.isLocalId(e)&&"function"==typeof this._getLocal)return this._getLocal(e,r);var i=[],s=this;if(!t.open_revs)return this._get(e,t,function(e,o){if(t=a.clone(t),e)return r(e);var i=o.doc,u=o.metadata,f=o.ctx;if(t.conflicts){var l=c.collectConflicts(u);l.length&&(i._conflicts=l)}if(a.isDeleted(u,i._rev)&&(i._deleted=!0),t.revs||t.revs_info){var d=c.rootToLeaf(u.rev_tree),p=n(d,function(e){return-1!==e.ids.map(function(e){return e.id}).indexOf(i._rev.split("-")[1])}),h=p.ids.map(function(e){return e.id}).indexOf(i._rev.split("-")[1])+1,v=p.ids.length-h;if(p.ids.splice(h,v),p.ids.reverse(),t.revs&&(i._revisions={start:p.pos+p.ids.length-1,ids:p.ids.map(function(e){return e.id})}),t.revs_info){var _=p.pos+p.ids.length;i._revs_info=p.ids.map(function(e){return _--,{rev:_+"-"+e.id,status:e.opts.status}})}}if(t.local_seq&&(a.info('The "local_seq" option is deprecated and will be removed'),i._local_seq=o.metadata.seq),t.attachments&&i._attachments){var m=i._attachments,g=Object.keys(m).length;if(0===g)return r(null,i);Object.keys(m).forEach(function(e){this._getAttachment(m[e],{encode:!0,ctx:f},function(t,n){var o=i._attachments[e];o.data=n,delete o.stub,delete o.length,--g||r(null,i)})},s)}else{if(i._attachments)for(var y in i._attachments)i._attachments.hasOwnProperty(y)&&(i._attachments[y].stub=!0);r(null,i)}});if("all"===t.open_revs)this._getRevisionTree(e,function(e,t){return e?r(e):(i=c.collectLeaves(t).map(function(e){return e.rev}),void o())});else{if(!Array.isArray(t.open_revs))return r(u.error(u.UNKNOWN_ERROR,"function_clause"));i=t.open_revs;for(var f=0;f<i.length;f++){var l=i[f];if("string"!=typeof l||!/^\d+-/.test(l))return r(u.error(u.INVALID_REV))}o()}}),s.prototype.getAttachment=a.adapterFun("getAttachment",function(e,t,n,r){var o=this;n instanceof Function&&(r=n,n={}),n=a.clone(n),this._get(e,n,function(e,i){return e?r(e):i.doc._attachments&&i.doc._attachments[t]?(n.ctx=i.ctx,void o._getAttachment(i.doc._attachments[t],n,r)):r(u.error(u.MISSING_DOC))})}),s.prototype.allDocs=a.adapterFun("allDocs",function(e,t){if("function"==typeof e&&(t=e,e={}),e=a.clone(e),e.skip="undefined"!=typeof e.skip?e.skip:0,"keys"in e){if(!Array.isArray(e.keys))return t(new TypeError("options.keys must be an array"));var n=["startkey","endkey","key"].filter(function(t){return t in e})[0];if(n)return void t(u.error(u.QUERY_PARSE_ERROR,"Query parameter `"+n+"` is not compatible with multi-get"));if("http"!==this.type())return i(this,e,t)}return this._allDocs(e,t)}),s.prototype.changes=function(e,t){return"function"==typeof e&&(t=e,e={}),new d(this,e,t)},s.prototype.close=a.adapterFun("close",function(e){return this._closed=!0,this._close(e)}),s.prototype.info=a.adapterFun("info",function(e){var t=this;this._info(function(n,r){return n?e(n):(r.db_name=r.db_name||t._db_name,r.auto_compaction=!(!t.auto_compaction||"http"===t.type()),void e(null,r))})}),s.prototype.id=a.adapterFun("id",function(e){return this._id(e)}),s.prototype.type=function(){return"function"==typeof this._type?this._type():this.adapter},s.prototype.bulkDocs=a.adapterFun("bulkDocs",function(e,t,n){if("function"==typeof t&&(n=t,t={}),t=a.clone(t),Array.isArray(e)&&(e={docs:e}),!e||!e.docs||!Array.isArray(e.docs))return n(u.error(u.MISSING_BULK_DOCS));for(var r=0;r<e.docs.length;++r)if("object"!=typeof e.docs[r]||Array.isArray(e.docs[r]))return n(u.error(u.NOT_AN_OBJECT));return e=a.clone(e),"new_edits"in t||(t.new_edits="new_edits"in e?e.new_edits:!0),t.new_edits||"http"===this.type()||e.docs.sort(function(e,t){var n=a.compare(e._id,t._id);if(0!==n)return n;var r=e._revisions?e._revisions.start:0,o=t._revisions?t._revisions.start:0;return a.compare(r,o)}),e.docs.forEach(function(e){e._deleted&&delete e._attachments}),this._bulkDocs(e,t,function(e,r){return e?n(e):(t.new_edits||(r=r.filter(function(e){return e.error})),void n(null,r))})}),s.prototype.registerDependentDatabase=a.adapterFun("registerDependentDatabase",function(e,t){function n(t){return t.dependentDbs=t.dependentDbs||{},t.dependentDbs[e]?!1:(t.dependentDbs[e]=!0,t)}var r=new this.constructor(e,this.__opts||{});l(this,"_local/_pouch_dependentDbs",n,function(e){return e?t(e):t(null,{db:r})})})},{}],2:[function(e,t){(function(n){"use strict";function r(e){return/^_(design|local)/.test(e)?e:encodeURIComponent(e)}function o(e){return e._attachments&&Object.keys(e._attachments)?l.Promise.all(Object.keys(e._attachments).map(function(t){var n=e._attachments[t];if(n.data&&"string"!=typeof n.data){if(h)return new l.Promise(function(e){l.readAsBinaryString(n.data,function(t){n.data=l.btoa(t),e()})});n.data=n.data.toString("base64")}})):l.Promise.resolve()}function i(e,t){if(/http(s?):/.test(e)){var n=l.parseUri(e);n.remote=!0,(n.user||n.password)&&(n.auth={username:n.user,password:n.password});var r=n.path.replace(/(^\/|\/$)/g,"").split("/");if(n.db=r.pop(),n.path=r.join("/"),t=t||{},t=l.clone(t),n.headers=t.headers||t.ajax&&t.ajax.headers||{},t.auth||n.auth){var o=t.auth||n.auth,i=l.btoa(o.username+":"+o.password);n.headers.Authorization="Basic "+i}return t.headers&&(n.headers=t.headers),n}return{host:"",path:"/",db:e,auth:!1}}function s(e,t){return a(e,e.db+"/"+t)}function a(e,t){if(e.remote){var n=e.path?"/":"";return e.protocol+"://"+e.host+":"+e.port+"/"+e.path+n+t}return"/"+t}function c(e,t){function n(e,t){var n=l.extend({},y,e);return p(n.method+" "+n.url),l.ajax(n,t)}function c(e){return e.split("/").map(encodeURIComponent).join("/")}var _=this;_.getHost=e.getHost?e.getHost:i;var m=_.getHost(e.name,e),g=s(m,"");_.getUrl=function(){return g},_.getHeaders=function(){return l.clone(m.headers)};var y=e.ajax||{};e=l.clone(e);var b=function(){n({headers:m.headers,method:"PUT",url:g},function(e){e&&401===e.status?n({headers:m.headers,method:"HEAD",url:g},function(e){e?t(e):t(null,_)}):e&&412!==e.status?t(e):t(null,_)})};e.skipSetup||n({headers:m.headers,method:"GET",url:g},function(e){e?404===e.status?(l.explain404("PouchDB is just detecting if the remote DB exists."),b()):t(e):t(null,_)}),_.type=function(){return"http"},_.id=l.adapterFun("id",function(e){n({headers:m.headers,method:"GET",url:a(m,"")},function(t,n){var r=n&&n.uuid?n.uuid+m.db:s(m,"");e(null,r)})}),_.request=l.adapterFun("request",function(e,t){e.headers=m.headers,e.url=s(m,e.url),n(e,t)}),_.compact=l.adapterFun("compact",function(e,t){"function"==typeof e&&(t=e,e={}),e=l.clone(e),n({headers:m.headers,url:s(m,"_compact"),method:"POST"},function(){function n(){_.info(function(r,o){o.compact_running?setTimeout(n,e.interval||200):t(null,{ok:!0})})}"function"==typeof t&&n()})}),_._info=function(e){n({headers:m.headers,method:"GET",url:s(m,"")},function(t,n){t?e(t):(n.host=s(m,""),e(null,n))})},_.get=l.adapterFun("get",function(e,t,o){"function"==typeof t&&(o=t,t={}),t=l.clone(t),void 0===t.auto_encode&&(t.auto_encode=!0);var i=[];t.revs&&i.push("revs=true"),t.revs_info&&i.push("revs_info=true"),t.local_seq&&i.push("local_seq=true"),t.open_revs&&("all"!==t.open_revs&&(t.open_revs=JSON.stringify(t.open_revs)),i.push("open_revs="+t.open_revs)),t.attachments&&i.push("attachments=true"),t.rev&&i.push("rev="+t.rev),t.conflicts&&i.push("conflicts="+t.conflicts),i=i.join("&"),i=""===i?"":"?"+i,t.auto_encode&&(e=r(e));var a={headers:m.headers,method:"GET",url:s(m,e+i)},c=e.split("/");(c.length>1&&"_design"!==c[0]&&"_local"!==c[0]||c.length>2&&"_design"===c[0]&&"_local"!==c[0])&&(a.binary=!0),n(a,function(e,t,n){return e?o(e):void o(null,t,n)})}),_.remove=l.adapterFun("remove",function(e,t,o,i){var a;"string"==typeof t?(a={_id:e,_rev:t},"function"==typeof o&&(i=o,o={})):(a=e,"function"==typeof t?(i=t,o={}):(i=o,o=t));var c=a._rev||o.rev;n({headers:m.headers,method:"DELETE",url:s(m,r(a._id))+"?rev="+c},i)}),_.getAttachment=l.adapterFun("getAttachment",function(e,t,n,o){"function"==typeof n&&(o=n,n={}),n=l.clone(n),void 0===n.auto_encode&&(n.auto_encode=!0),n.auto_encode&&(e=r(e)),n.auto_encode=!1,_.get(e+"/"+c(t),n,o)}),_.removeAttachment=l.adapterFun("removeAttachment",function(e,t,o,i){var a=s(m,r(e)+"/"+c(t))+"?rev="+o;n({headers:m.headers,method:"DELETE",url:a},i)}),_.putAttachment=l.adapterFun("putAttachment",function(e,t,o,i,a,u){"function"==typeof a&&(u=a,a=i,i=o,o=null),"undefined"==typeof a&&(a=i,i=o,o=null);var f=r(e)+"/"+c(t),p=s(m,f);if(o&&(p+="?rev="+o),"string"==typeof i){var _;try{_=l.atob(i)}catch(g){return u(d.error(d.BAD_ARG,"Attachments need to be base64 encoded"))}i=h?l.createBlob([l.fixBinary(_)],{type:a}):_?new v(_,"binary"):""}var y={headers:l.clone(m.headers),method:"PUT",url:p,processData:!1,body:i,timeout:6e4};y.headers["Content-Type"]=a,n(y,u)}),_.put=l.adapterFun("put",l.getArguments(function(e){var t,i,a,c=e.shift(),u="_id"in c,f=e.pop();return"object"!=typeof c||Array.isArray(c)?f(d.error(d.NOT_AN_OBJECT)):(c=l.clone(c),void o(c).then(function(){for(;;)if(t=e.shift(),i=typeof t,"string"!==i||u?"string"!==i||!u||"_rev"in c?"object"===i&&(a=l.clone(t)):c._rev=t:(c._id=t,u=!0),!e.length)break;a=a||{};var o=l.invalidIdError(c._id);if(o)throw o;var d=[];a&&"undefined"!=typeof a.new_edits&&d.push("new_edits="+a.new_edits),d=d.join("&"),""!==d&&(d="?"+d),n({headers:m.headers,method:"PUT",url:s(m,r(c._id))+d,body:c},function(e,t){return e?f(e):(t.ok=!0,void f(null,t))})})["catch"](f))})),_.post=l.adapterFun("post",function(e,t,n){return"function"==typeof t&&(n=t,t={}),t=l.clone(t),"object"!=typeof e?n(d.error(d.NOT_AN_OBJECT)):("_id"in e||(e._id=l.uuid()),void _.put(e,t,function(e,t){return e?n(e):(t.ok=!0,void n(null,t))}))}),_._bulkDocs=function(e,t,r){"undefined"!=typeof t.new_edits&&(e.new_edits=t.new_edits),l.Promise.all(e.docs.map(o)).then(function(){n({headers:m.headers,method:"POST",url:s(m,"_bulk_docs"),body:e},function(e,t){return e?r(e):(t.forEach(function(e){e.ok=!0}),void r(null,t))})})["catch"](r)},_.allDocs=l.adapterFun("allDocs",function(e,t){"function"==typeof e&&(t=e,e={}),e=l.clone(e);var r,o=[],i="GET";if(e.conflicts&&o.push("conflicts=true"),e.descending&&o.push("descending=true"),e.include_docs&&o.push("include_docs=true"),e.attachments&&o.push("attachments=true"),e.key&&o.push("key="+encodeURIComponent(JSON.stringify(e.key))),e.startkey&&o.push("startkey="+encodeURIComponent(JSON.stringify(e.startkey))),e.endkey&&o.push("endkey="+encodeURIComponent(JSON.stringify(e.endkey))),"undefined"!=typeof e.inclusive_end&&o.push("inclusive_end="+!!e.inclusive_end),"undefined"!=typeof e.limit&&o.push("limit="+e.limit),"undefined"!=typeof e.skip&&o.push("skip="+e.skip),o=o.join("&"),""!==o&&(o="?"+o),"undefined"!=typeof e.keys){var a="keys="+encodeURIComponent(JSON.stringify(e.keys));a.length+o.length+1<=f?o+=(-1!==o.indexOf("?")?"&":"?")+a:(i="POST",r=JSON.stringify({keys:e.keys}))}n({headers:m.headers,method:i,url:s(m,"_all_docs"+o),body:r},t)}),_._changes=function(e){var t="batch_size"in e?e.batch_size:u;e=l.clone(e),e.timeout=e.timeout||3e4;var r={timeout:e.timeout-5e3},o="undefined"!=typeof e.limit?e.limit:!1;0===o&&(o=1);var i;i="returnDocs"in e?e.returnDocs:!0;var a=o;if(e.style&&(r.style=e.style),(e.include_docs||e.filter&&"function"==typeof e.filter)&&(r.include_docs=!0),e.attachments&&(r.attachments=!0),e.continuous&&(r.feed="longpoll"),e.conflicts&&(r.conflicts=!0),e.descending&&(r.descending=!0),e.filter&&"string"==typeof e.filter&&(r.filter=e.filter,"_view"===e.filter&&e.view&&"string"==typeof e.view&&(r.view=e.view)),e.query_params&&"object"==typeof e.query_params)for(var c in e.query_params)e.query_params.hasOwnProperty(c)&&(r[c]=e.query_params[c]);var p,h="GET";if(e.doc_ids){r.filter="_doc_ids";var v=JSON.stringify(e.doc_ids);v.length<f?r.doc_ids=v:(h="POST",p={doc_ids:e.doc_ids})}if(e.continuous&&_._useSSE)return _.sse(e,r,i);var g,y,b=function(i,c){if(!e.aborted){r.since=i,"object"==typeof r.since&&(r.since=JSON.stringify(r.since)),e.descending?o&&(r.limit=a):r.limit=!o||a>t?t:a;var u="?"+Object.keys(r).map(function(e){return e+"="+r[e]}).join("&"),f={headers:m.headers,method:h,url:s(m,"_changes"+u),timeout:e.timeout,body:p};y=i,e.aborted||(g=n(f,c))}},E=10,w=0,S={results:[]},T=function(n,r){if(!e.aborted){var s=0;if(r&&r.results){s=r.results.length,S.last_seq=r.last_seq;var c={};c.query=e.query_params,r.results=r.results.filter(function(t){a--;var n=l.filterChange(e)(t);return n&&(i&&S.results.push(t),l.call(e.onChange,t)),n})}else if(n)return e.aborted=!0,void l.call(e.complete,n);r&&r.last_seq&&(y=r.last_seq);var u=o&&0>=a||r&&t>s||e.descending;if((!e.continuous||o&&0>=a)&&u)l.call(e.complete,null,S);else{n?w+=1:w=0;var f=1<<w,p=E*f,h=e.maximumWait||3e4;if(p>h)return void l.call(e.complete,n||d.error(d.UNKNOWN_ERROR));setTimeout(function(){b(y,T)},p)}}};return b(e.since||0,T),{cancel:function(){e.aborted=!0,g&&g.abort()}}},_.sse=function(e,t,n){function r(t){var r=JSON.parse(t.data);n&&u.results.push(r),u.last_seq=r.seq,l.call(e.onChange,r)}function o(t){return c.removeEventListener("message",r,!1),d===!1?(_._useSSE=!1,void(f=_._changes(e))):(c.close(),void l.call(e.complete,t))}t.feed="eventsource",t.since=e.since||0,t.limit=e.limit,delete t.timeout;var i="?"+Object.keys(t).map(function(e){return e+"="+t[e]}).join("&"),a=s(m,"_changes"+i),c=new EventSource(a),u={results:[],last_seq:!1},f=!1,d=!1;return c.addEventListener("message",r,!1),c.onopen=function(){d=!0},c.onerror=o,{cancel:function(){return f?f.cancel():(c.removeEventListener("message",r,!1),void c.close())}}},_._useSSE=!1,_.revsDiff=l.adapterFun("revsDiff",function(e,t,r){"function"==typeof t&&(r=t,t={}),n({headers:m.headers,method:"POST",url:s(m,"_revs_diff"),body:JSON.stringify(e)},r)}),_._close=function(e){e()},_.destroy=l.adapterFun("destroy",function(e){n({url:s(m,""),method:"DELETE",headers:m.headers},function(t,n){t?(_.emit("error",t),e(t)):(_.emit("destroyed"),e(null,n))})})}var u=25,f=1800,l=e(34),d=e(19),p=e(40)("pouchdb:http"),h="undefined"==typeof n||n.browser,v=e(18);c.destroy=l.toPromise(function(e,t,n){var r=i(e,t);t=t||{},"function"==typeof t&&(n=t,t={}),t=l.clone(t),t.headers=r.headers,t.method="DELETE",t.url=s(r,"");var o=t.ajax||{};t=l.extend({},t,o),l.ajax(t,n)}),c.valid=function(){return!0},t.exports=c}).call(this,e(39))},{}],3:[function(e,t){"use strict";function n(e,t){return new r.Promise(function(n,o){var s=r.createBlob([""],{type:"image/png"});e.objectStore(i).put(s,"key"),e.oncomplete=function(){var e=t.transaction([i],"readwrite"),s=e.objectStore(i).get("key");s.onerror=o,s.onsuccess=function(e){var t=e.target.result,o=URL.createObjectURL(t);r.ajax({url:o,cache:!0,binary:!0},function(e,t){e&&405===e.status?n(!0):(n(!(!t||"image/png"!==t.type)),e&&404===e.status&&r.explain404("PouchDB is just detecting blob URL support.")),URL.revokeObjectURL(o)})}}})["catch"](function(){return!1})}var r=e(34),o=e(5),i=o.DETECT_BLOB_SUPPORT_STORE;t.exports=n},{}],4:[function(e,t){"use strict";function n(e,t,n,i,s,g){function y(){var e=[f,u,c,d,l,a],t=m(i,e,"readwrite");return t.error?g(t.error):(D=t.txn,D.onerror=_(g),D.ontimeout=_(g),D.oncomplete=w,C=D.objectStore(f),L=D.objectStore(u),I=D.objectStore(c),N=D.objectStore(a),void T(function(e){return e?(H=!0,g(e)):void E()}))}function b(){r.processDocs(B,n,J,D,U,x,t)}function E(){function e(){++n===B.length&&b()}function t(t){var n=h(t.target.result);n&&J.set(n.id,n),e()}if(B.length)for(var n=0,o=0,i=B.length;i>o;o++){var s=B[o];if(s._id&&r.isLocalId(s._id))e();else{var a=C.get(s.metadata.id);a.onsuccess=t}}}function w(){H||(s.notify(n._name),n._docCount=-1,g(null,U))}function S(e,t){var n=I.get(e);n.onsuccess=function(n){if(n.target.result)t();else{var r=o.error(o.MISSING_STUB,"unknown stub attachment with digest "+e);r.status=412,t(r)}}}function T(e){function t(){++o===n.length&&e(r)}var n=[];if(B.forEach(function(e){e.data&&e.data._attachments&&Object.keys(e.data._attachments).forEach(function(t){var r=e.data._attachments[t];r.stub&&n.push(r.digest)})}),!n.length)return e();var r,o=0;n.forEach(function(e){S(e,function(e){e&&!r&&(r=e),t()})})}function x(e,t,n,r,o,i,s){var a=e.data;a._id=e.metadata.id,a._rev=e.metadata.rev,n&&(a._deleted=!0);var c=a._attachments&&Object.keys(a._attachments).length;return c?k(e,t,n,r,o,s):void O(e,t,n,r,o,s)}function A(e){var t=r.compactTree(e.metadata);p(t,e.metadata.id,D)}function O(e,t,r,o,i,s){function a(o){i&&n.auto_compaction&&A(e),l.seq=o.target.result,delete l.rev;var s=v(l,t,r),a=C.put(s);a.onsuccess=u}function c(e){e.preventDefault(),e.stopPropagation();var t=L.index("_doc_id_rev"),n=t.getKey(f._doc_id_rev);n.onsuccess=function(e){var t=L.put(f,e.target.result);t.onsuccess=a}}function u(){U[s]={ok:!0,id:l.id,rev:t},J.set(e.metadata.id,e.metadata),q(e,l.seq,o)}var f=e.data,l=e.metadata;f._doc_id_rev=l.id+"::"+l.rev,delete f._id,delete f._rev;var d=L.put(f);d.onsuccess=a,d.onerror=c}function k(e,t,n,r,o,i){function s(){u===f.length&&O(e,t,n,r,o,i)}function a(){u++,s()}var c=e.data,u=0,f=Object.keys(c._attachments);f.forEach(function(t){var n=e.data._attachments[t];if(n.stub)u++,s();else{var r=n.data;delete n.data;var o=n.digest;R(o,r,a)}})}function q(e,t,n){function r(){++i===s.length&&n()}function o(n){var o=e.data._attachments[n].digest,i=N.put({seq:t,digestSeq:o+"::"+t});i.onsuccess=r,i.onerror=function(e){e.preventDefault(),e.stopPropagation(),r()}}var i=0,s=Object.keys(e.data._attachments||{});if(!s.length)return n();for(var a=0;a<s.length;a++)o(s[a])}function R(e,t,n){var r=I.count(e);r.onsuccess=function(r){var o=r.target.result;if(o)return n();var i={digest:e,body:t},s=I.put(i);s.onsuccess=n}}for(var D,C,L,I,N,j,B=e.docs,F=0,M=B.length;M>F;F++){var P=B[F];P._id&&r.isLocalId(P._id)||(P=B[F]=r.parseDoc(P,t.new_edits),P.error&&!j&&(j=P))}if(j)return g(j);var U=new Array(B.length),J=new r.Map,H=!1,V=n._blobSupport?"blob":"base64";r.preprocessAttachments(B,V,function(e){return e?g(e):void y()})}var r=e(34),o=e(19),i=e(6),s=e(5),a=s.ATTACH_AND_SEQ_STORE,c=s.ATTACH_STORE,u=s.BY_SEQ_STORE,f=s.DOC_STORE,l=s.LOCAL_STORE,d=s.META_STORE,p=i.compactRevs,h=i.decodeMetadata,v=i.encodeMetadata,_=i.idbError,m=i.openTransactionSafely;t.exports=n},{}],5:[function(e,t,n){"use strict";n.ADAPTER_VERSION=5,n.DOC_STORE="document-store",n.BY_SEQ_STORE="by-sequence",n.ATTACH_STORE="attach-store",n.ATTACH_AND_SEQ_STORE="attach-seq-store",n.META_STORE="meta-store",n.LOCAL_STORE="local-store",n.DETECT_BLOB_SUPPORT_STORE="detect-blob-support"},{}],6:[function(e,t,n){(function(t){"use strict";function r(e,t,n){try{e.apply(t,n)}catch(r){"undefined"!=typeof PouchDB&&PouchDB.emit("error",r)}}var o=e(19),i=e(34),s=e(5);n.taskQueue={running:!1,queue:[]},n.applyNext=function(){if(!n.taskQueue.running&&n.taskQueue.queue.length){n.taskQueue.running=!0;var e=n.taskQueue.queue.shift();e.action(function(o,i){r(e.callback,this,[o,i]),n.taskQueue.running=!1,t.nextTick(n.applyNext)})}},n.idbError=function(e){return function(t){var n=t.target&&t.target.error&&t.target.error.name||t.target;e(o.error(o.IDB_ERROR,n,t.type))}},n.encodeMetadata=function(e,t,n){return{data:i.safeJsonStringify(e),winningRev:t,deletedOrLocal:n?"1":"0",seq:e.seq,id:e.id}},n.decodeMetadata=function(e){if(!e)return null;var t=i.safeJsonParse(e.data);return t.winningRev=e.winningRev,t.deletedOrLocal="1"===e.deletedOrLocal,t.seq=e.seq,t},n.decodeDoc=function(e){if(!e)return e;var t=i.lastIndexOf(e._doc_id_rev,":");return e._id=e._doc_id_rev.substring(0,t-1),e._rev=e._doc_id_rev.substring(t+1),delete e._doc_id_rev,e},n.readBlobData=function(e,t,n,r){n?e?"string"!=typeof e?i.readAsBinaryString(e,function(e){r(i.btoa(e))}):r(e):r(""):e?"string"!=typeof e?r(e):(e=i.fixBinary(atob(e)),r(i.createBlob([e],{type:t}))):r(i.createBlob([""],{type:t}))},n.fetchAttachmentsIfNecessary=function(e,t,n,r){function o(){++c===a.length&&r&&r()}function i(e,t){var r=e._attachments[t],i=r.digest,a=n.objectStore(s.ATTACH_STORE).get(i);a.onsuccess=function(e){r.body=e.target.result.body,o()}}var a=Object.keys(e._attachments||{});if(!a.length)return r&&r();var c=0;a.forEach(function(n){t.attachments&&t.include_docs?i(e,n):(e._attachments[n].stub=!0,o())})},n.postProcessAttachments=function(e){return i.Promise.all(e.map(function(e){if(e.doc&&e.doc._attachments){var t=Object.keys(e.doc._attachments);return i.Promise.all(t.map(function(t){var r=e.doc._attachments[t];if("body"in r){var o=r.body,s=r.content_type;return new i.Promise(function(a){n.readBlobData(o,s,!0,function(n){e.doc._attachments[t]=i.extend(i.pick(r,["digest","content_type"]),{data:n}),a()})})}}))}}))},n.compactRevs=function(e,t,n){function r(){f--,f||o()}function o(){i.length&&i.forEach(function(e){var t=u.index("digestSeq").count(IDBKeyRange.bound(e+"::",e+"::￿",!1,!1));t.onsuccess=function(t){var n=t.target.result;n||c["delete"](e)}})}var i=[],a=n.objectStore(s.BY_SEQ_STORE),c=n.objectStore(s.ATTACH_STORE),u=n.objectStore(s.ATTACH_AND_SEQ_STORE),f=e.length;e.forEach(function(e){var n=a.index("_doc_id_rev"),o=t+"::"+e;n.getKey(o).onsuccess=function(e){var t=e.target.result;if("number"!=typeof t)return r();a["delete"](t);var n=u.index("seq").openCursor(IDBKeyRange.only(t));n.onsuccess=function(e){var t=e.target.result;if(t){var n=t.value.digestSeq.split("::")[0];i.push(n),u["delete"](t.primaryKey),t["continue"]()}else r()}}})},n.openTransactionSafely=function(e,t,n){try{return{txn:e.transaction(t,n)}}catch(r){return{error:r}}}}).call(this,e(39))},{}],7:[function(e,t){(function(n){"use strict";function r(e,t){var n=this;D.queue.push({action:function(t){o(n,e,t)},callback:t}),w()}function o(e,t,o){function i(e){var t=e.createObjectStore(y,{keyPath:"id"});e.createObjectStore(m,{autoIncrement:!0}).createIndex("_doc_id_rev","_doc_id_rev",{unique:!0}),e.createObjectStore(_,{keyPath:"digest"}),e.createObjectStore(E,{keyPath:"id",autoIncrement:!1}),e.createObjectStore(g),t.createIndex("deletedOrLocal","deletedOrLocal",{unique:!1}),e.createObjectStore(b,{keyPath:"_id"});var n=e.createObjectStore(v,{autoIncrement:!0});n.createIndex("seq","seq"),n.createIndex("digestSeq","digestSeq",{unique:!0})}function f(e,t){var n=e.objectStore(y);n.createIndex("deletedOrLocal","deletedOrLocal",{unique:!1}),n.openCursor().onsuccess=function(e){var r=e.target.result;if(r){var o=r.value,i=a.isDeleted(o);o.deletedOrLocal=i?"1":"0",n.put(o),r["continue"]()}else t()}}function l(e){e.createObjectStore(b,{keyPath:"_id"}).createIndex("_doc_id_rev","_doc_id_rev",{unique:!0})}function w(e,t){var n=e.objectStore(b),r=e.objectStore(y),o=e.objectStore(m),i=r.openCursor();i.onsuccess=function(e){var i=e.target.result;if(i){var s=i.value,u=s.id,f=a.isLocalId(u),l=c.winningRev(s);if(f){var d=u+"::"+l,p=u+"::",h=u+"::~",v=o.index("_doc_id_rev"),_=IDBKeyRange.bound(p,h,!1,!1),m=v.openCursor(_);m.onsuccess=function(e){if(m=e.target.result){var t=m.value;t._doc_id_rev===d&&n.put(t),o["delete"](m.primaryKey),m["continue"]()}else r["delete"](i.primaryKey),i["continue"]()}}else i["continue"]()}else t&&t()}}function D(e){var t=e.createObjectStore(v,{autoIncrement:!0});t.createIndex("seq","seq"),t.createIndex("digestSeq","digestSeq",{unique:!0})}function I(e,t){var n=e.objectStore(m),r=e.objectStore(_),o=e.objectStore(v),i=r.count();i.onsuccess=function(e){var r=e.target.result;return r?void(n.openCursor().onsuccess=function(e){var n=e.target.result;if(!n)return t();for(var r=n.value,i=n.primaryKey,s=Object.keys(r._attachments||{}),a={},c=0;c<s.length;c++){var u=r._attachments[s[c]];a[u.digest]=!0}var f=Object.keys(a);for(c=0;c<f.length;c++){var l=f[c];o.put({seq:i,digestSeq:l+"::"+i})}n["continue"]()}):t()}}function N(e){function t(e){return e.data?x(e):(e.deletedOrLocal="1"===e.deletedOrLocal,e)}var n=e.objectStore(m),r=e.objectStore(y),o=r.openCursor();o.onsuccess=function(e){function o(){var e=a.id+"::",t=a.id+"::￿",r=n.index("_doc_id_rev").openCursor(IDBKeyRange.bound(e,t)),o=0;r.onsuccess=function(e){var t=e.target.result;if(!t)return a.seq=o,i();var n=t.primaryKey;n>o&&(o=n),t["continue"]()}}function i(){var e=A(a,a.winningRev,a.deletedOrLocal),t=r.put(e);t.onsuccess=function(){s["continue"]()}}var s=e.target.result;if(s){var a=t(s.value);return a.winningRev=a.winningRev||c.winningRev(a),a.seq?i():void o()}}}function j(e,t,n,r,o){try{if(e&&t)return o?IDBKeyRange.bound(t,e,!n,!1):IDBKeyRange.bound(e,t,!1,!n);if(e)return o?IDBKeyRange.upperBound(e):IDBKeyRange.lowerBound(e);if(t)return o?IDBKeyRange.lowerBound(t,!n):IDBKeyRange.upperBound(t,!n);if(r)return IDBKeyRange.only(r)}catch(i){return{error:i}}return null}function B(e,t,n){function r(){n(null,{total_rows:e,offset:t.skip,rows:A})}var o="startkey"in t?t.startkey:!1,i="endkey"in t?t.endkey:!1,s="key"in t?t.key:!1,f=t.skip||0,l="number"==typeof t.limit?t.limit:-1,d=t.inclusive_end!==!1,p="descending"in t&&t.descending?"prev":null,h=j(o,i,d,s,p);if(h&&h.error){var v=h.error;return"DataError"===v.name&&0===v.code?n(null,{total_rows:e,offset:t.skip,rows:[]}):n(u.error(u.IDB_ERROR,v.name,v.message))}var g=[y,m];t.attachments&&g.push(_);var b=C(J,g,"readonly");if(b.error)return n(b.error);var E=b.txn;E.oncomplete=function(){t.attachments?q(A).then(r):r()};var w=E.objectStore(y),S=p?w.openCursor(h,p):w.openCursor(h),A=[];S.onsuccess=function(e){function n(e,n){var o={id:e.id,key:e.id,value:{rev:i}};t.include_docs&&(o.doc=n,t.conflicts&&(o.doc._conflicts=c.collectConflicts(e)),O(o.doc,t,E));var s=a.isDeleted(e,i);if("ok"===t.deleted)s&&(o.value.deleted=!0,o.doc=null),A.push(o);else if(!s&&f--<=0&&(A.push(o),0===--l))return;r["continue"]()}if(e.target.result){var r=e.target.result,o=x(r.value),i=o.winningRev;if(t.include_docs){var s=E.objectStore(m).index("_doc_id_rev"),u=o.id+"::"+i;s.get(u).onsuccess=function(e){n(x(r.value),T(e.target.result))}}else n(o)}}}function F(t){if(-1!==e._docCount)return t(null,e._docCount);var n,r=C(J,[y],"readonly");if(r.error)return t(r.error);var o=r.txn,i=o.objectStore(y).index("deletedOrLocal");i.count(IDBKeyRange.only("0")).onsuccess=function(e){n=e.target.result
},o.onerror=k(t),o.oncomplete=function(){e._docCount=n,t(null,e._docCount)}}var M=t.name,P=null,U=!1,J=null;e._docCount=-1,e._blobSupport=null,e._name=M,e.type=function(){return"idb"},e._id=a.toPromise(function(e){e(null,P)}),e._bulkDocs=function(t,n,o){d(t,n,e,J,r.Changes,o)},e._get=function(e,t,n){function r(){n(s,{doc:o,metadata:i,ctx:c})}var o,i,s,c;if(t=a.clone(t),t.ctx)c=t.ctx;else{var f=C(J,[y,m,_],"readonly");if(f.error)return n(f.error);c=f.txn}c.objectStore(y).get(e).onsuccess=function(e){if(i=x(e.target.result),!i)return s=u.error(u.MISSING_DOC,"missing"),r();if(a.isDeleted(i)&&!t.rev)return s=u.error(u.MISSING_DOC,"deleted"),r();var n=c.objectStore(m),f=t.rev||i.winningRev,l=i.id+"::"+f;n.index("_doc_id_rev").get(l).onsuccess=function(e){return o=e.target.result,o&&(o=T(o)),o?void r():(s=u.error(u.MISSING_DOC,"missing"),r())}}},e._getAttachment=function(e,t,n){var r;if(t=a.clone(t),t.ctx)r=t.ctx;else{var o=C(J,[y,m,_],"readonly");if(o.error)return n(o.error);r=o.txn}var i=e.digest,s=e.content_type;r.objectStore(_).get(i).onsuccess=function(e){var r=e.target.result.body;R(r,s,t.encode,function(e){n(null,e)})}},e._allDocs=function(e,t){F(function(n,r){return n?t(n):0===e.limit?t(null,{total_rows:r,offset:e.skip,rows:[]}):void B(r,e,t)})},e._info=function(t){F(function(n,r){if(n)return t(n);if(null===J||!L[e._name]){var o=new Error("db isn't open");return o.id="idbNull",t(o)}var i=0,s=C(J,[m],"readonly");if(s.error)return t(s.error);var a=s.txn;a.objectStore(m).openCursor(null,"prev").onsuccess=function(e){var t=e.target.result;i=t?t.key:0},a.oncomplete=function(){t(null,{doc_count:r,update_seq:i,idb_attachment_format:e._blobSupport?"binary":"base64"})}})},e._changes=function(t){function n(e){function n(){return a.seq!==s?e["continue"]():(l=s,a.winningRev===i._rev?o(i):void r())}function r(){var e=i._id+"::"+a.winningRev,t=v.index("_doc_id_rev").openCursor(IDBKeyRange.bound(e,e+"￿"));t.onsuccess=function(e){o(T(e.target.result.value))}}function o(n){var r=t.processChange(n,a,t);r.seq=a.seq,w(r)&&(E++,p&&b.push(r),t.attachments&&t.include_docs?O(n,t,h,function(){q([r]).then(function(){t.onChange(r)})}):t.onChange(r)),E!==d&&e["continue"]()}var i=T(e.value),s=e.key;if(u&&!u.has(i._id))return e["continue"]();var a;return(a=S.get(i._id))?n():void(g.get(i._id).onsuccess=function(e){a=x(e.target.result),S.set(i._id,a),n()})}function o(e){var t=e.target.result;t&&n(t)}function i(){var e=[y,m];t.attachments&&e.push(_);var n=C(J,e,"readonly");if(n.error)return t.complete(n.error);h=n.txn,h.onerror=k(t.complete),h.oncomplete=s,v=h.objectStore(m),g=h.objectStore(y);var r;r=f?v.openCursor(null,f):v.openCursor(IDBKeyRange.lowerBound(t.since,!0)),r.onsuccess=o}function s(){function e(){t.complete(null,{results:b,last_seq:l})}!t.continuous&&t.attachments?q(b).then(e):e()}if(t=a.clone(t),t.continuous){var c=M+":"+a.uuid();return r.Changes.addListener(M,c,e,t),r.Changes.notify(M),{cancel:function(){r.Changes.removeListener(M,c)}}}var u=t.doc_ids&&new a.Set(t.doc_ids),f=t.descending?"prev":null;t.since=t.since||0;var l=t.since,d="limit"in t?t.limit:-1;0===d&&(d=1);var p;p="returnDocs"in t?t.returnDocs:!0;var h,v,g,b=[],E=0,w=a.filterChange(t),S=new a.Map;i()},e._close=function(e){return null===J?e(u.error(u.NOT_OPEN)):(J.close(),delete L[M],J=null,void e())},e._getRevisionTree=function(e,t){var n=C(J,[y],"readonly");if(n.error)return t(n.error);var r=n.txn,o=r.objectStore(y).get(e);o.onsuccess=function(e){var n=x(e.target.result);n?t(null,n.rev_tree):t(u.error(u.MISSING_DOC))}},e._doCompaction=function(e,t,n){var r=[y,m,_,v],o=C(J,r,"readwrite");if(o.error)return n(o.error);var i=o.txn,s=i.objectStore(y);s.get(e).onsuccess=function(n){var r=x(n.target.result);c.traverseRevTree(r.rev_tree,function(e,n,r,o,i){var s=n+"-"+r;-1!==t.indexOf(s)&&(i.status="missing")}),S(t,e,i);var o=r.winningRev,s=r.deletedOrLocal;i.objectStore(y).put(A(r,o,s))},i.onerror=k(n),i.oncomplete=function(){a.call(n)}},e._getLocal=function(e,t){var n=C(J,[b],"readonly");if(n.error)return t(n.error);var r=n.txn,o=r.objectStore(b).get(e);o.onerror=k(t),o.onsuccess=function(e){var n=e.target.result;n?(delete n._doc_id_rev,t(null,n)):t(u.error(u.MISSING_DOC))}},e._putLocal=function(e,t,n){"function"==typeof t&&(n=t,t={}),delete e._revisions;var r=e._rev,o=e._id;e._rev=r?"0-"+(parseInt(r.split("-")[1],10)+1):"0-1";var i,s=t.ctx;if(!s){var a=C(J,[b],"readwrite");if(a.error)return n(a.error);s=a.txn,s.onerror=k(n),s.oncomplete=function(){i&&n(null,i)}}var c,f=s.objectStore(b);r?(c=f.get(o),c.onsuccess=function(o){var s=o.target.result;if(s&&s._rev===r){var a=f.put(e);a.onsuccess=function(){i={ok:!0,id:e._id,rev:e._rev},t.ctx&&n(null,i)}}else n(u.error(u.REV_CONFLICT))}):(c=f.add(e),c.onerror=function(e){n(u.error(u.REV_CONFLICT)),e.preventDefault(),e.stopPropagation()},c.onsuccess=function(){i={ok:!0,id:e._id,rev:e._rev},t.ctx&&n(null,i)})},e._removeLocal=function(e,t){var n=C(J,[b],"readwrite");if(n.error)return t(n.error);var r,o=n.txn;o.oncomplete=function(){r&&t(null,r)};var i=e._id,s=o.objectStore(b),a=s.get(i);a.onerror=k(t),a.onsuccess=function(n){var o=n.target.result;o&&o._rev===e._rev?(s["delete"](i),r={ok:!0,id:i,rev:"0-0"}):t(u.error(u.MISSING_DOC))}};var H=L[M];if(H)return J=H.idb,P=H.instanceId,e._blobSupport=H.blobSupport,void n.nextTick(function(){o(null,e)});var V=indexedDB.open(M,h);"openReqList"in r||(r.openReqList={}),r.openReqList[M]=V,V.onupgradeneeded=function(e){function t(){var e=o[s-1];s++,e&&e(r,t)}var n=e.target.result;if(e.oldVersion<1)return i(n);var r=e.currentTarget.transaction;e.oldVersion<3&&l(n),e.oldVersion<4&&D(n);var o=[f,w,I,N],s=e.oldVersion;t()},V.onsuccess=function(t){J=t.target.result,J.onversionchange=function(){J.close(),delete L[M]},J.onabort=function(){J.close(),delete L[M]};var n=J.transaction([E,g],"readwrite"),r=n.objectStore(E).get(E);r.onsuccess=function(t){var r=function(){null!==e._blobSupport&&U&&(L[M]={idb:J,instanceId:P,blobSupport:e._blobSupport,loaded:!0},o(null,e))},i=t.target.result||{id:E};M+"_id"in i?(P=i[M+"_id"],U=!0,r()):(P=a.uuid(),i[M+"_id"]=P,n.objectStore(E).put(i).onsuccess=function(){U=!0,r()}),s||(s=p(n,J)),s.then(function(t){e._blobSupport=t,r()})}},V.onerror=k(o)}function i(e,t,n){"openReqList"in r||(r.openReqList={}),r.Changes.removeAllListeners(e),r.openReqList[e]&&r.openReqList[e].result&&(r.openReqList[e].result.close(),delete L[e]);var o=indexedDB.deleteDatabase(e);o.onsuccess=function(){r.openReqList[e]&&(r.openReqList[e]=null),a.hasLocalStorage()&&e in localStorage&&delete localStorage[e],n(null,{ok:!0})},o.onerror=k(n)}var s,a=e(34),c=e(29),u=e(19),f=e(6),l=e(5),d=e(4),p=e(3),h=l.ADAPTER_VERSION,v=l.ATTACH_AND_SEQ_STORE,_=l.ATTACH_STORE,m=l.BY_SEQ_STORE,g=l.DETECT_BLOB_SUPPORT_STORE,y=l.DOC_STORE,b=l.LOCAL_STORE,E=l.META_STORE,w=f.applyNext,S=f.compactRevs,T=f.decodeDoc,x=f.decodeMetadata,A=f.encodeMetadata,O=f.fetchAttachmentsIfNecessary,k=f.idbError,q=f.postProcessAttachments,R=f.readBlobData,D=f.taskQueue,C=f.openTransactionSafely,L={};r.valid=function(){var e="undefined"!=typeof openDatabase&&/(Safari|iPhone|iPad|iPod)/.test(navigator.userAgent)&&!/Chrome/.test(navigator.userAgent);return!e&&"undefined"!=typeof indexedDB&&"undefined"!=typeof IDBKeyRange},r.destroy=a.toPromise(function(e,t,n){D.queue.push({action:function(n){i(e,t,n)},callback:n}),w()}),r.Changes=new a.Changes,t.exports=r}).call(this,e(39))},{}],8:[function(e,t){t.exports=["idb","websql"]},{}],9:[function(e,t){"use strict";function n(e,t,n,s,v,_){function m(){return q?_(q):(v.notify(n._name),n._docCount=-1,void _(null,R))}function g(e,t){var n="SELECT count(*) as cnt FROM "+u+" WHERE digest=?";k.executeSql(n,[e],function(n,r){if(0===r.rows.item(0).cnt){var i=o.error(o.MISSING_STUB,"unknown stub attachment with digest "+e);t(i)}else t()})}function y(e){function t(){++o===n.length&&e(r)}var n=[];if(A.forEach(function(e){e.data&&e.data._attachments&&Object.keys(e.data._attachments).forEach(function(t){var r=e.data._attachments[t];r.stub&&n.push(r.digest)})}),!n.length)return e();var r,o=0;n.forEach(function(e){g(e,function(e){e&&!r&&(r=e),t()})})}function b(e,t,o,i,s,u,h){function v(){function t(e,t){function r(){return++i===s.length&&t(),!1}function o(t){var o="INSERT INTO "+f+" (digest, seq) VALUES (?,?)",i=[n._attachments[t].digest,e];k.executeSql(o,i,r,r)}var i=0,s=Object.keys(n._attachments||{});if(!s.length)return t();for(var a=0;a<s.length;a++)o(s[a])}var n=e.data,r=o?1:0,i=n._id,s=n._rev,a=d(n),u="INSERT INTO "+c+" (doc_id, rev, json, deleted) VALUES (?, ?, ?, ?);",p=[i,s,a,r];k.executeSql(u,p,function(e,n){var r=n.insertId;t(r,function(){y(e,r)})},function(){var e=l("seq",c,null,"doc_id=? AND rev=?");return k.executeSql(e,[i,s],function(e,n){var o=n.rows.item(0).seq,u="UPDATE "+c+" SET json=?, deleted=? WHERE doc_id=? AND rev=?;",f=[a,r,i,s];e.executeSql(u,f,function(e){t(o,function(){y(e,o)})})}),!1})}function _(e){b||(e?(b=e,i(b)):E===w.length&&v())}function m(e){E++,_(e)}function g(){if(s&&n.auto_compaction){var t=e.metadata.id,o=r.compactTree(e.metadata);p(o,t,k)}}function y(n,o){g(),e.metadata.seq=o,delete e.metadata.rev;var u=s?"UPDATE "+a+" SET json=?, max_seq=?, winningseq=(SELECT seq FROM "+c+" WHERE doc_id="+a+".id AND rev=?) WHERE id=?":"INSERT INTO "+a+" (id, winningseq, max_seq, json) VALUES (?,?,?,?);",f=r.safeJsonStringify(e.metadata),l=e.metadata.id,d=s?[f,o,t,l]:[l,o,o,f];n.executeSql(u,d,function(){R[h]={ok:!0,id:e.metadata.id,rev:t},D.set(l,e.metadata),i()})}var b=null,E=0;e.data._id=e.metadata.id,e.data._rev=e.metadata.rev;var w=Object.keys(e.data._attachments||{});o&&(e.data._deleted=!0),w.forEach(function(t){var n=e.data._attachments[t];if(n.stub)E++,_();else{var r=n.data;delete n.data;var o=n.digest;S(o,r,m)}}),w.length||v()}function E(){r.processDocs(A,n,D,k,R,b,t)}function w(e){function t(){++n===A.length&&e()}if(!A.length)return e();var n=0;A.forEach(function(e){if(e._id&&r.isLocalId(e._id))return t();var n=e.metadata.id;k.executeSql("SELECT json FROM "+a+" WHERE id = ?",[n],function(e,o){if(o.rows.length){var i=r.safeJsonParse(o.rows.item(0).json);D.set(n,i)}t()})})}function S(e,t,n){var r="SELECT digest FROM "+u+" WHERE digest=?";k.executeSql(r,[e],function(o,s){return s.rows.length?n():(r="INSERT INTO "+u+" (digest, body, escaped) VALUES (?,?,1)",void o.executeSql(r,[e,i.escapeBlob(t)],function(){n()},function(){return n(),!1}))})}var T=t.new_edits,x=e.docs,A=x.map(function(e){if(e._id&&r.isLocalId(e._id))return e;var t=r.parseDoc(e,T);return t}),O=A.filter(function(e){return e.error});if(O.length)return _(O[0]);var k,q,R=new Array(A.length),D=new r.Map;r.preprocessAttachments(A,"binary",function(e){return e?_(e):void s.transaction(function(e){k=e,y(function(e){e?q=e:w(E)})},h(_),m)})}var r=e(34),o=e(19),i=e(11),s=e(10),a=s.DOC_STORE,c=s.BY_SEQ_STORE,u=s.ATTACH_STORE,f=s.ATTACH_AND_SEQ_STORE,l=i.select,d=i.stringifyDoc,p=i.compactRevs,h=i.unknownError;t.exports=n},{}],10:[function(e,t,n){"use strict";function r(e){return"'"+e+"'"}n.ADAPTER_VERSION=7,n.DOC_STORE=r("document-store"),n.BY_SEQ_STORE=r("by-sequence"),n.ATTACH_STORE=r("attach-store"),n.LOCAL_STORE=r("local-store"),n.META_STORE=r("metadata-store"),n.ATTACH_AND_SEQ_STORE=r("attach-seq-store")},{}],11:[function(e,t){"use strict";function n(e){return e.replace(/\u0002/g,"").replace(/\u0001/g,"").replace(/\u0000/g,"")}function r(e){return e.replace(/\u0001\u0001/g,"\x00").replace(/\u0001\u0002/g,"").replace(/\u0002\u0002/g,"")}function o(e){return delete e._id,delete e._rev,JSON.stringify(e)}function i(e,t,n){return e=JSON.parse(e),e._id=t,e._rev=n,e}function s(e){for(var t="(";e--;)t+="?",e&&(t+=",");return t+")"}function a(e,t,n,r,o){return"SELECT "+e+" FROM "+("string"==typeof t?t:t.join(" JOIN "))+(n?" ON "+n:"")+(r?" WHERE "+("string"==typeof r?r:r.join(" AND ")):"")+(o?" ORDER BY "+o:"")}function c(e,t,n){function r(){++i===e.length&&o()}function o(){if(a.length){var e="SELECT DISTINCT digest AS digest FROM "+g+" WHERE seq IN "+s(a.length);n.executeSql(e,a,function(e,t){for(var n=[],r=0;r<t.rows.length;r++)n.push(t.rows.item(r).digest);if(n.length){var o="DELETE FROM "+g+" WHERE seq IN ("+a.map(function(){return"?"}).join(",")+")";e.executeSql(o,a,function(e){var t="SELECT digest FROM "+g+" WHERE digest IN ("+n.map(function(){return"?"}).join(",")+")";e.executeSql(t,n,function(e,t){for(var r=new p.Set,o=0;o<t.rows.length;o++)r.add(t.rows.item(o).digest);n.forEach(function(t){r.has(t)||(e.executeSql("DELETE FROM "+g+" WHERE digest=?",[t]),e.executeSql("DELETE FROM "+m+" WHERE digest=?",[t]))})})})}})}}if(e.length){var i=0,a=[];e.forEach(function(e){var o="SELECT seq FROM "+_+" WHERE doc_id=? AND rev=?";n.executeSql(o,[t,e],function(e,t){if(!t.rows.length)return r();var n=t.rows.item(0).seq;a.push(n),e.executeSql("DELETE FROM "+_+" WHERE seq=?",[n],r)})})}}function u(e){return function(t){var n=t&&t.constructor.toString().match(/function ([^\(]+)/),r=n&&n[1]||t.type,o=t.target||t.message;e(h.error(h.WSQ_ERROR,o,r))}}function f(e){if("size"in e)return 1e6*e.size;var t=/Android/.test(window.navigator.userAgent);return t?5e6:1}function l(e,t,n,r){var o="undefined"!=typeof sqlitePlugin&&sqlitePlugin.openDatabase&&sqlitePlugin.openDatabase.bind(sqlitePlugin),i=o||"undefined"!=typeof openDatabase&&openDatabase,s=y[e];return s||(s=y[e]=i(e,t,n,r),s._sqlitePlugin=!!o),s}function d(){return"undefined"!=typeof openDatabase||"undefined"!=typeof SQLitePlugin}var p=e(34),h=e(19),v=e(10),_=v.BY_SEQ_STORE,m=v.ATTACH_STORE,g=v.ATTACH_AND_SEQ_STORE,y={};t.exports={escapeBlob:n,unescapeBlob:r,stringifyDoc:o,unstringifyDoc:i,qMarks:s,select:a,compactRevs:c,unknownError:u,getSize:f,openDB:l,valid:d}},{}],12:[function(e,t){"use strict";function n(e,t,n,r,i){function s(){++u===c.length&&i&&i()}function a(e,t){var i=e._attachments[t],a={encode:!0,ctx:r};n._getAttachment(i,a,function(n,r){e._attachments[t]=o.extend(o.pick(i,["digest","content_type"]),{data:r}),s()})}var c=Object.keys(e._attachments||{});if(!c.length)return i&&i();var u=0;c.forEach(function(n){t.attachments&&t.include_docs?a(e,n):(e._attachments[n].stub=!0,s())})}function r(e,t){function c(){o.hasLocalStorage()&&(window.localStorage["_pouch__websqldb_"+K._name]=!0),t(null,K)}function I(e,t){e.executeSql(q),e.executeSql("ALTER TABLE "+p+" ADD COLUMN deleted TINYINT(1) DEFAULT 0",[],function(){e.executeSql(O),e.executeSql("ALTER TABLE "+d+" ADD COLUMN local TINYINT(1) DEFAULT 0",[],function(){e.executeSql("CREATE INDEX IF NOT EXISTS 'doc-store-local-idx' ON "+d+" (local, id)");var n="SELECT "+d+".winningseq AS seq, "+d+".json AS metadata FROM "+p+" JOIN "+d+" ON "+p+".seq = "+d+".winningseq";e.executeSql(n,[],function(e,n){for(var r=[],i=[],s=0;s<n.rows.length;s++){var a=n.rows.item(s),c=a.seq,u=JSON.parse(a.metadata);o.isDeleted(u)&&r.push(c),o.isLocalId(u.id)&&i.push(u.id)}e.executeSql("UPDATE "+d+"SET local = 1 WHERE id IN "+g(i.length),i,function(){e.executeSql("UPDATE "+p+" SET deleted = 1 WHERE seq IN "+g(r.length),r,t)})})})})}function N(e,t){var n="CREATE TABLE IF NOT EXISTS "+v+" (id UNIQUE, rev, json)";e.executeSql(n,[],function(){var n="SELECT "+d+".id AS id, "+p+".json AS data FROM "+p+" JOIN "+d+" ON "+p+".seq = "+d+".winningseq WHERE local = 1";e.executeSql(n,[],function(e,n){function r(){if(!o.length)return t(e);var n=o.shift(),i=JSON.parse(n.data)._rev;e.executeSql("INSERT INTO "+v+" (id, rev, json) VALUES (?,?,?)",[n.id,i,n.data],function(e){e.executeSql("DELETE FROM "+d+" WHERE id=?",[n.id],function(e){e.executeSql("DELETE FROM "+p+" WHERE seq=?",[n.seq],function(){r()})})})}for(var o=[],i=0;i<n.rows.length;i++)o.push(n.rows.item(i));r()})})}function j(e,t){function n(n){function r(){if(!n.length)return t(e);var o=n.shift(),i=a(o.hex,W),s=i.lastIndexOf("::"),c=i.substring(0,s),u=i.substring(s+2),f="UPDATE "+p+" SET doc_id=?, rev=? WHERE doc_id_rev=?";e.executeSql(f,[c,u,i],function(){r()})}r()}var r="ALTER TABLE "+p+" ADD COLUMN doc_id";e.executeSql(r,[],function(e){var t="ALTER TABLE "+p+" ADD COLUMN rev";e.executeSql(t,[],function(e){e.executeSql(k,[],function(e){var t="SELECT hex(doc_id_rev) as hex FROM "+p;e.executeSql(t,[],function(e,t){for(var r=[],o=0;o<t.rows.length;o++)r.push(t.rows.item(o));n(r)})})})})}function B(e,t){function n(e){var n="SELECT COUNT(*) AS cnt FROM "+h;e.executeSql(n,[],function(e,n){function r(){var n=E(L+", "+d+".id AS id",[d,p],C,null,d+".id ");n+=" LIMIT "+s+" OFFSET "+i,i+=s,e.executeSql(n,[],function(e,n){function o(e,t){var n=i[e]=i[e]||[];-1===n.indexOf(t)&&n.push(t)}if(!n.rows.length)return t(e);for(var i={},s=0;s<n.rows.length;s++)for(var a=n.rows.item(s),c=b(a.data,a.id,a.rev),u=Object.keys(c._attachments||{}),f=0;f<u.length;f++){var l=c._attachments[u[f]];o(l.digest,a.seq)}var d=[];if(Object.keys(i).forEach(function(e){var t=i[e];t.forEach(function(t){d.push([e,t])})}),!d.length)return r();var p=0;d.forEach(function(t){var n="INSERT INTO "+m+" (digest, seq) VALUES (?,?)";e.executeSql(n,t,function(){++p===d.length&&r()})})})}var o=n.rows.item(0).cnt;if(!o)return t(e);var i=0,s=10;r()})}var r="CREATE TABLE IF NOT EXISTS "+m+" (digest, seq INTEGER)";e.executeSql(r,[],function(e){e.executeSql(D,[],function(e){e.executeSql(R,[],n)})})}function F(e,t){var n="ALTER TABLE "+h+" ADD COLUMN escaped TINYINT(1) DEFAULT 0";e.executeSql(n,[],t)}function M(e,t){var n="ALTER TABLE "+d+" ADD COLUMN max_seq INTEGER";e.executeSql(n,[],function(e){var n="UPDATE "+d+" SET max_seq=(SELECT MAX(seq) FROM "+p+" WHERE doc_id=id)";e.executeSql(n,[],function(e){var n="CREATE UNIQUE INDEX IF NOT EXISTS 'doc-max-seq-idx' ON "+d+" (max_seq)";e.executeSql(n,[],t)})})}function P(e,t){e.executeSql('SELECT HEX("a") AS hex',[],function(e,n){var r=n.rows.item(0).hex;W=2===r.length?"UTF-8":"UTF-16",t()})}function U(){for(;X.length>0;){var e=X.pop();e(null,Q)}}function J(e,t){if(0===t){var n="CREATE TABLE IF NOT EXISTS "+_+" (dbid, db_version INTEGER)",r="CREATE TABLE IF NOT EXISTS "+h+" (digest UNIQUE, escaped TINYINT(1), body BLOB)",i="CREATE TABLE IF NOT EXISTS "+m+" (digest, seq INTEGER)",s="CREATE TABLE IF NOT EXISTS "+d+" (id unique, json, winningseq, max_seq INTEGER UNIQUE)",a="CREATE TABLE IF NOT EXISTS "+p+" (seq INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, json, deleted TINYINT(1), doc_id, rev)",c="CREATE TABLE IF NOT EXISTS "+v+" (id UNIQUE, rev, json)";e.executeSql(r),e.executeSql(c),e.executeSql(i,[],function(){e.executeSql(R),e.executeSql(D)}),e.executeSql(s,[],function(){e.executeSql(q),e.executeSql(a,[],function(){e.executeSql(O),e.executeSql(k),e.executeSql(n,[],function(){var t="INSERT INTO "+_+" (db_version, dbid) VALUES (?,?)";Q=o.uuid();var n=[l,Q];e.executeSql(t,n,function(){U()})})})})}else{var u=function(){var n=l>t;n&&e.executeSql("UPDATE "+_+" SET db_version = "+l);var r="SELECT dbid FROM "+_;e.executeSql(r,[],function(e,t){Q=t.rows.item(0).dbid,U()})},f=[I,N,j,B,F,M,u],g=t,y=function(e){f[g-1](e,y),g++};y(e)}}function H(){Y.transaction(function(e){P(e,function(){V(e)})},S(t),c)}function V(e){var t="SELECT sql FROM sqlite_master WHERE tbl_name = "+_;e.executeSql(t,[],function(e,t){t.rows.length?/db_version/.test(t.rows.item(0).sql)?e.executeSql("SELECT db_version FROM "+_,[],function(e,t){var n=t.rows.item(0).db_version;J(e,n)}):e.executeSql("ALTER TABLE "+_+" ADD COLUMN db_version INTEGER",[],function(){J(e,1)}):J(e,0)})}function G(e,t){if(-1!==K._docCount)return t(K._docCount);var n=E("COUNT("+d+".id) AS 'num'",[d,p],C,p+".deleted=0");e.executeSql(n,[],function(e,n){K._docCount=n.rows.item(0).num,t(K._docCount)})}var W,K=this,Q=null,z=T(e),X=[];K._docCount=-1,K._name=e.name;var Y=x(K._name,A,K._name,z);return Y?("function"!=typeof Y.readTransaction&&(Y.readTransaction=Y.transaction),o.isCordova()?window.addEventListener(K._name+"_pouch",function $(){window.removeEventListener(K._name+"_pouch",$,!1),H()},!1):H(),K.type=function(){return"websql"},K._id=o.toPromise(function(e){e(null,Q)}),K._info=function(e){Y.readTransaction(function(t){G(t,function(n){var r="SELECT MAX(seq) AS seq FROM "+p;t.executeSql(r,[],function(t,r){var o=r.rows.item(0).seq||0;e(null,{doc_count:n,update_seq:o,sqlite_plugin:Y._sqlitePlugin,websql_encoding:W})})})},S(e))},K._bulkDocs=function(e,t,n){f(e,t,K,Y,r.Changes,n)},K._get=function(e,t,n){function r(){n(c,{doc:i,metadata:a,ctx:l})}t=o.clone(t);var i,a,c;if(!t.ctx)return void Y.readTransaction(function(r){t.ctx=r,K._get(e,t,n)});var u,f,l=t.ctx;t.rev?(u=E(L,[d,p],d+".id="+p+".doc_id",[p+".doc_id=?",p+".rev=?"]),f=[e,t.rev]):(u=E(L,[d,p],C,d+".id=?"),f=[e]),l.executeSql(u,f,function(e,n){if(!n.rows.length)return c=s.error(s.MISSING_DOC,"missing"),r();var u=n.rows.item(0);return a=o.safeJsonParse(u.metadata),u.deleted&&!t.rev?(c=s.error(s.MISSING_DOC,"deleted"),r()):(i=b(u.data,a.id,u.rev),void r())})},K._allDocs=function(e,t){var r,s=[],a="startkey"in e?e.startkey:!1,c="endkey"in e?e.endkey:!1,u="key"in e?e.key:!1,f="descending"in e?e.descending:!1,l="limit"in e?e.limit:-1,h="skip"in e?e.skip:0,v=e.inclusive_end!==!1,_=[],m=[];if(u!==!1)m.push(d+".id = ?"),_.push(u);else if(a!==!1||c!==!1){if(a!==!1&&(m.push(d+".id "+(f?"<=":">=")+" ?"),_.push(a)),c!==!1){var g=f?">":"<";v&&(g+="="),m.push(d+".id "+g+" ?"),_.push(c)}u!==!1&&(m.push(d+".id = ?"),_.push(u))}"ok"!==e.deleted&&m.push(p+".deleted = 0"),Y.readTransaction(function(t){G(t,function(a){if(r=a,0!==l){var c=E(L,[d,p],C,m,d+".id "+(f?"DESC":"ASC"));c+=" LIMIT "+l+" OFFSET "+h,t.executeSql(c,_,function(t,r){for(var a=0,c=r.rows.length;c>a;a++){var u=r.rows.item(a),f=o.safeJsonParse(u.metadata),l=f.id,d=b(u.data,l,u.rev),p=d._rev,h={id:l,key:l,value:{rev:p}};if(e.include_docs&&(h.doc=d,h.doc._rev=p,e.conflicts&&(h.doc._conflicts=i.collectConflicts(f)),n(h.doc,e,K,t)),u.deleted){if("ok"!==e.deleted)continue;h.value.deleted=!0,h.doc=null}s.push(h)}})}})},S(t),function(){t(null,{total_rows:r,offset:e.skip,rows:s})})},K._changes=function(e){function t(){var t=d+".json AS metadata, "+d+".max_seq AS maxSeq, "+p+".json AS winningDoc, "+p+".rev AS winningRev ",r=d+" JOIN "+p,i=d+".id="+p+".doc_id AND "+d+".winningseq="+p+".seq",l=["maxSeq > ?"],h=[e.since];e.doc_ids&&(l.push(d+".id IN "+g(e.doc_ids.length)),h=h.concat(e.doc_ids));var v="maxSeq "+(s?"DESC":"ASC"),_=E(t,r,i,l,v),m=o.filterChange(e);e.view||e.filter||(_+=" LIMIT "+a);var y=e.since||0;Y.readTransaction(function(t){t.executeSql(_,h,function(t,r){function i(t){return function(){e.onChange(t)}}for(var s=0,l=r.rows.length;l>s;s++){var d=r.rows.item(s),p=o.safeJsonParse(d.metadata);y=d.maxSeq;var h=b(d.winningDoc,p.id,d.winningRev),v=e.processChange(h,p,e);if(v.seq=d.maxSeq,m(v)&&(f++,c&&u.push(v),e.attachments&&e.include_docs?n(h,e,K,t,i(v)):i(v)()),f===a)break}})},S(e.complete),function(){e.continuous||e.complete(null,{results:u,last_seq:y})})}if(e=o.clone(e),e.continuous){var i=K._name+":"+o.uuid();return r.Changes.addListener(K._name,i,K,e),r.Changes.notify(K._name),{cancel:function(){r.Changes.removeListener(K._name,i)}}}var s=e.descending;e.since=e.since&&!s?e.since:0;var a="limit"in e?e.limit:-1;0===a&&(a=1);var c;c="returnDocs"in e?e.returnDocs:!0;var u=[],f=0;t()},K._close=function(e){e()},K._getAttachment=function(e,t,n){var r,i=t.ctx,s=e.digest,c=e.content_type,f="SELECT escaped, CASE WHEN escaped = 1 THEN body ELSE HEX(body) END AS body FROM "+h+" WHERE digest=?";i.executeSql(f,[s],function(e,i){var s=i.rows.item(0),f=s.escaped?u.unescapeBlob(s.body):a(s.body,W);t.encode?r=btoa(f):(f=o.fixBinary(f),r=o.createBlob([f],{type:c})),n(null,r)})},K._getRevisionTree=function(e,t){Y.readTransaction(function(n){var r="SELECT json AS metadata FROM "+d+" WHERE id = ?";n.executeSql(r,[e],function(e,n){if(n.rows.length){var r=o.safeJsonParse(n.rows.item(0).metadata);t(null,r.rev_tree)}else t(s.error(s.MISSING_DOC))})})},K._doCompaction=function(e,t,n){return t.length?void Y.transaction(function(n){var r="SELECT json AS metadata FROM "+d+" WHERE id = ?";n.executeSql(r,[e],function(n,r){var s=o.safeJsonParse(r.rows.item(0).metadata);i.traverseRevTree(s.rev_tree,function(e,n,r,o,i){var s=n+"-"+r;-1!==t.indexOf(s)&&(i.status="missing")});var a="UPDATE "+d+" SET json = ? WHERE id = ?";n.executeSql(a,[o.safeJsonStringify(s),e])}),w(t,e,n)},S(n),function(){n()}):n()},K._getLocal=function(e,t){Y.readTransaction(function(n){var r="SELECT json, rev FROM "+v+" WHERE id=?";n.executeSql(r,[e],function(n,r){if(r.rows.length){var o=r.rows.item(0),i=b(o.json,e,o.rev);t(null,i)}else t(s.error(s.MISSING_DOC))})})},K._putLocal=function(e,t,n){function r(e){var r,f;i?(r="UPDATE "+v+" SET rev=?, json=? WHERE id=? AND rev=?",f=[o,u,a,i]):(r="INSERT INTO "+v+" (id, rev, json) VALUES (?,?,?)",f=[a,o,u]),e.executeSql(r,f,function(e,r){r.rowsAffected?(c={ok:!0,id:a,rev:o},t.ctx&&n(null,c)):n(s.error(s.REV_CONFLICT))},function(){return n(s.error(s.REV_CONFLICT)),!1})}"function"==typeof t&&(n=t,t={}),delete e._revisions;var o,i=e._rev,a=e._id;o=e._rev=i?"0-"+(parseInt(i.split("-")[1],10)+1):"0-1";var c,u=y(e);t.ctx?r(t.ctx):Y.transaction(function(e){r(e)},S(n),function(){c&&n(null,c)})},void(K._removeLocal=function(e,t){var n;Y.transaction(function(r){var o="DELETE FROM "+v+" WHERE id=? AND rev=?",i=[e._id,e._rev];r.executeSql(o,i,function(r,o){return o.rowsAffected?void(n={ok:!0,id:e._id,rev:"0-0"}):t(s.error(s.MISSING_DOC))})},S(t),function(){n&&t(null,n)})})):t(s.error(s.UNKNOWN_ERROR))}var o=e(34),i=e(29),s=e(19),a=e(22),c=e(10),u=e(11),f=e(9),l=c.ADAPTER_VERSION,d=c.DOC_STORE,p=c.BY_SEQ_STORE,h=c.ATTACH_STORE,v=c.LOCAL_STORE,_=c.META_STORE,m=c.ATTACH_AND_SEQ_STORE,g=u.qMarks,y=u.stringifyDoc,b=u.unstringifyDoc,E=u.select,w=u.compactRevs,S=u.unknownError,T=u.getSize,x=u.openDB,A=1,O="CREATE INDEX IF NOT EXISTS 'by-seq-deleted-idx' ON "+p+" (seq, deleted)",k="CREATE UNIQUE INDEX IF NOT EXISTS 'by-seq-doc-id-rev' ON "+p+" (doc_id, rev)",q="CREATE INDEX IF NOT EXISTS 'doc-winningseq-idx' ON "+d+" (winningseq)",R="CREATE INDEX IF NOT EXISTS 'attach-seq-seq-idx' ON "+m+" (seq)",D="CREATE UNIQUE INDEX IF NOT EXISTS 'attach-seq-digest-idx' ON "+m+" (digest, seq)",C=p+".seq = "+d+".winningseq",L=p+".seq AS seq, "+p+".deleted AS deleted, "+p+".json AS data, "+p+".rev AS rev, "+d+".json AS metadata";r.valid=u.valid,r.destroy=o.toPromise(function(e,t,n){r.Changes.removeAllListeners(e);var i=T(t),s=x(e,A,e,i);s.transaction(function(e){var t=[d,p,h,_,v,m];t.forEach(function(t){e.executeSql("DROP TABLE IF EXISTS "+t,[])})},S(n),function(){o.hasLocalStorage()&&(delete window.localStorage["_pouch__websqldb_"+e],delete window.localStorage[e]),n(null,{ok:!0})})}),r.Changes=new o.Changes,t.exports=r},{}],13:[function(e,t){"use strict";function n(e,t,n){function r(){i.cancel()}a.call(this);var i=this;this.db=e,t=t?o.clone(t):{};var s=n||t.complete||function(){},c=t.complete=o.once(function(t,n){t?i.emit("error",t):i.emit("complete",n),i.removeAllListeners(),e.removeListener("destroyed",r)});s&&(i.on("complete",function(e){s(null,e)}),i.on("error",function(e){s(e)}));var u=t.onChange;u&&i.on("change",u),e.once("destroyed",r),t.onChange=function(e){t.isCancelled||(i.emit("change",e),i.startSeq&&i.startSeq<=e.seq&&(i.emit("uptodate"),i.startSeq=!1),e.deleted?i.emit("delete",e):1===e.changes.length&&"1-"===e.changes[0].rev.slice(0,2)?i.emit("create",e):i.emit("update",e))};var f=new o.Promise(function(e,n){t.complete=function(t,r){t?n(t):e(r)}});i.once("cancel",function(){u&&i.removeListener("change",u),t.complete(null,{status:"cancelled"})}),this.then=f.then.bind(f),this["catch"]=f["catch"].bind(f),this.then(function(e){c(null,e)},c),e.taskqueue.isReady?i.doChanges(t):e.taskqueue.addTask(function(){i.isCancelled?i.emit("cancel"):i.doChanges(t)})}function r(e,t,n){var r=[{rev:e._rev}];"all_docs"===n.style&&(r=i.collectLeaves(t.rev_tree).map(function(e){return{rev:e.rev}}));var s={id:t.id,changes:r,doc:e};return o.isDeleted(t,e._rev)&&(s.deleted=!0),n.conflicts&&(s.doc._conflicts=i.collectConflicts(t),s.doc._conflicts.length||delete s.doc._conflicts),s}var o=e(34),i=e(29),s=e(19),a=e(38).EventEmitter,c=e(27),u=e(28);t.exports=n,o.inherits(n,a),n.prototype.cancel=function(){this.isCancelled=!0,this.db.taskqueue.isReady&&this.emit("cancel")},n.prototype.doChanges=function(e){var t=this,n=e.complete;if(e=o.clone(e),"live"in e&&!("continuous"in e)&&(e.continuous=e.live),e.processChange=r,"latest"===e.since&&(e.since="now"),e.since||(e.since=0),"now"===e.since)return void this.db.info().then(function(r){return t.isCancelled?void n(null,{status:"cancelled"}):(e.since=r.update_seq,void t.doChanges(e))},n);if(e.continuous&&"now"!==e.since&&this.db.info().then(function(e){t.startSeq=e.update_seq},function(e){if("idbNull"!==e.id)throw e}),"http"!==this.db.type()&&e.filter&&"string"==typeof e.filter&&!e.doc_ids)return this.filterChanges(e);"descending"in e||(e.descending=!1),e.limit=0===e.limit?1:e.limit,e.complete=n;var i=this.db._changes(e);if(i&&"function"==typeof i.cancel){var s=t.cancel;t.cancel=o.getArguments(function(e){i.cancel(),s.apply(this,e)})}},n.prototype.filterChanges=function(e){var t=this,n=e.complete;if("_view"===e.filter){if(!e.view||"string"!=typeof e.view){var r=s.error(s.BAD_REQUEST,"`view` filter parameter is not provided.");return void n(r)}var o=e.view.split("/");this.db.get("_design/"+o[0],function(r,i){if(t.isCancelled)return void n(null,{status:"cancelled"});if(r)return void n(s.generateErrorFromResponse(r));if(i&&i.views&&i.views[o[1]]){var a=u(i.views[o[1]].map);return e.filter=a,void t.doChanges(e)}var c=i.views?"missing json key: "+o[1]:"missing json key: views";r||(r=s.error(s.MISSING_DOC,c)),n(r)})}else{var i=e.filter.split("/");this.db.get("_design/"+i[0],function(r,o){if(t.isCancelled)return void n(null,{status:"cancelled"});if(r)return void n(s.generateErrorFromResponse(r));if(o&&o.filters&&o.filters[i[1]]){var a=c(o.filters[i[1]]);return e.filter=a,void t.doChanges(e)}var u=o&&o.filters?"missing json key: "+i[1]:"missing json key: filters";return r||(r=s.error(s.MISSING_DOC,u)),void n(r)})}}},{}],14:[function(e,t){"use strict";function n(e,t,n,r){return e.get(t)["catch"](function(n){if(404===n.status)return"http"===e.type()&&o.explain404("PouchDB is just checking if a remote checkpoint exists."),{_id:t};throw n}).then(function(t){return r.cancelled?void 0:(t.last_seq=n,e.put(t))})}function r(e,t,n,r){this.src=e,this.target=t,this.id=n,this.returnValue=r}var o=e(34),i=e(62),s=i.collate;r.prototype.writeCheckpoint=function(e){var t=this;return this.updateTarget(e).then(function(){return t.updateSource(e)})},r.prototype.updateTarget=function(e){return n(this.target,this.id,e,this.returnValue)},r.prototype.updateSource=function(e){var t=this;return this.readOnlySource?o.Promise.resolve(!0):n(this.src,this.id,e,this.returnValue)["catch"](function(e){var n="number"==typeof e.status&&4===Math.floor(e.status/100);if(n)return t.readOnlySource=!0,!0;throw e})},r.prototype.getCheckpoint=function(){var e=this;return e.target.get(e.id).then(function(t){return e.src.get(e.id).then(function(e){return 0===s(t.last_seq,e.last_seq)?e.last_seq:0},function(n){if(404===n.status&&t.last_seq)return e.src.put({_id:e.id,last_seq:0}).then(function(){return 0},function(n){return 401===n.status?(e.readOnlySource=!0,t.last_seq):0});throw n})})["catch"](function(e){if(404!==e.status)throw e;return 0})},t.exports=r},{}],15:[function(e,t){(function(n,r){"use strict";function o(e){e&&r.debug&&console.error(e)}function i(e,t,r){if(!(this instanceof i))return new i(e,t,r);var f=this;("function"==typeof t||"undefined"==typeof t)&&(r=t,t={}),e&&"object"==typeof e&&(t=e,e=void 0),"undefined"==typeof r&&(r=o),t=t||{},this.__opts=t;var l=r;f.auto_compaction=t.auto_compaction,f.prefix=i.prefix,s.call(f),f.taskqueue=new c;var d=new u(function(o,s){r=function(e,t){return e?s(e):(delete t.then,void o(t))},t=a.clone(t);var c,u,l=t.name||e;return function(){try{if("string"!=typeof l)throw u=new Error("Missing/invalid DB name"),u.code=400,u;if(c=i.parseAdapter(l,t),t.originalName=l,t.name=c.name,t.prefix&&"http"!==c.adapter&&"https"!==c.adapter&&(t.name=t.prefix+t.name),t.adapter=t.adapter||c.adapter,f._adapter=t.adapter,f._db_name=l,!i.adapters[t.adapter])throw u=new Error("Adapter is missing"),u.code=404,u;
if(!i.adapters[t.adapter].valid())throw u=new Error("Invalid Adapter"),u.code=404,u}catch(e){f.taskqueue.fail(e),f.changes=a.toPromise(function(t){t.complete&&t.complete(e)})}}(),u?s(u):(f.adapter=t.adapter,f.replicate={},f.replicate.from=function(e,t,n){return f.constructor.replicate(e,f,t,n)},f.replicate.to=function(e,t,n){return f.constructor.replicate(f,e,t,n)},f.sync=function(e,t,n){return f.constructor.sync(f,e,t,n)},f.replicate.sync=f.sync,f.destroy=a.adapterFun("destroy",function(e){var t=this,n=this.__opts||{};t.info(function(r,o){return r?e(r):(n.internal=!0,void t.constructor.destroy(o.db_name,n,e))})}),i.adapters[t.adapter].call(f,t,function(e){function n(e){"destroyed"===e&&(f.emit("destroyed"),i.removeListener(l,n))}return e?void(r&&(f.taskqueue.fail(e),r(e))):(i.on(l,n),f.emit("created",f),i.emit("created",t.originalName),f.taskqueue.ready(f),void r(null,f))}),t.skipSetup&&(f.taskqueue.ready(f),n.nextTick(function(){r(null,f)})),void(a.isCordova()&&cordova.fireWindowEvent(t.name+"_pouch",{})))});d.then(function(e){l(null,e)},l),f.then=d.then.bind(d),f["catch"]=d["catch"].bind(d)}var s=e(1),a=e(34),c=e(33),u=a.Promise;a.inherits(i,s),i.debug=e(40),t.exports=i}).call(this,e(39),"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],16:[function(e,t){(function(n){"use strict";function r(e,t){function r(t,n,r){if(e.binary||e.json||!e.processData||"string"==typeof t){if(!e.binary&&e.json&&"string"==typeof t)try{t=JSON.parse(t)}catch(o){return r(o)}}else t=JSON.stringify(t);Array.isArray(t)&&(t=t.map(function(e){return e.error||e.missing?s.generateErrorFromResponse(e):e})),r(null,t,n)}function c(e,t){var n,r;if(e.code&&e.status){var o=new Error(e.message||e.code);return o.status=e.status,t(o)}try{n=JSON.parse(e.responseText),r=s.generateErrorFromResponse(n)}catch(i){r=s.generateErrorFromResponse(e)}t(r)}function u(){return n.browser?"":new i("","binary")}var f=!1,l=a.getArguments(function(e){f||(t.apply(this,e),f=!0)});"function"==typeof e&&(l=e,e={}),e=a.clone(e);var d={method:"GET",headers:{},json:!0,processData:!0,timeout:1e4,cache:!1};return e=a.extend(!0,d,e),e.json&&(e.binary||(e.headers.Accept="application/json"),e.headers["Content-Type"]=e.headers["Content-Type"]||"application/json"),e.binary&&(e.encoding=null,e.json=!1),e.processData||(e.json=!1),o(e,function(t,n,o){if(t)return t.status=n?n.statusCode:400,c(t,l);var i,a=n.headers&&n.headers["content-type"],f=o||u();e.binary||!e.json&&e.processData||"object"==typeof f||!(/json/.test(a)||/^[\s]*\{/.test(f)&&/\}[\s]*$/.test(f))||(f=JSON.parse(f)),n.statusCode>=200&&n.statusCode<300?r(f,n,l):(e.binary&&(f=JSON.parse(f.toString())),i=s.generateErrorFromResponse(f),i.status=n.statusCode,l(i))})}var o=e(24),i=e(18),s=e(19),a=e(34);t.exports=r}).call(this,e(39))},{}],17:[function(e,t){(function(e){"use strict";function n(t,n){t=t||[],n=n||{};try{return new Blob(t,n)}catch(r){if("TypeError"!==r.name)throw r;for(var o=e.BlobBuilder||e.MSBlobBuilder||e.MozBlobBuilder||e.WebKitBlobBuilder,i=new o,s=0;s<t.length;s+=1)i.append(t[s]);return i.getBlob(n.type)}}t.exports=n}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],18:[function(e,t){t.exports={}},{}],19:[function(e,t,n){"use strict";function r(e){Error.call(e.reason),this.status=e.status,this.name=e.error,this.message=e.reason,this.error=!0}var o=e(43);o(r,Error),r.prototype.toString=function(){return JSON.stringify({status:this.status,name:this.name,message:this.message})},n.UNAUTHORIZED=new r({status:401,error:"unauthorized",reason:"Name or password is incorrect."}),n.MISSING_BULK_DOCS=new r({status:400,error:"bad_request",reason:"Missing JSON list of 'docs'"}),n.MISSING_DOC=new r({status:404,error:"not_found",reason:"missing"}),n.REV_CONFLICT=new r({status:409,error:"conflict",reason:"Document update conflict"}),n.INVALID_ID=new r({status:400,error:"invalid_id",reason:"_id field must contain a string"}),n.MISSING_ID=new r({status:412,error:"missing_id",reason:"_id is required for puts"}),n.RESERVED_ID=new r({status:400,error:"bad_request",reason:"Only reserved document ids may start with underscore."}),n.NOT_OPEN=new r({status:412,error:"precondition_failed",reason:"Database not open"}),n.UNKNOWN_ERROR=new r({status:500,error:"unknown_error",reason:"Database encountered an unknown error"}),n.BAD_ARG=new r({status:500,error:"badarg",reason:"Some query argument is invalid"}),n.INVALID_REQUEST=new r({status:400,error:"invalid_request",reason:"Request was invalid"}),n.QUERY_PARSE_ERROR=new r({status:400,error:"query_parse_error",reason:"Some query parameter is invalid"}),n.DOC_VALIDATION=new r({status:500,error:"doc_validation",reason:"Bad special document member"}),n.BAD_REQUEST=new r({status:400,error:"bad_request",reason:"Something wrong with the request"}),n.NOT_AN_OBJECT=new r({status:400,error:"bad_request",reason:"Document must be a JSON object"}),n.DB_MISSING=new r({status:404,error:"not_found",reason:"Database not found"}),n.IDB_ERROR=new r({status:500,error:"indexed_db_went_bad",reason:"unknown"}),n.WSQ_ERROR=new r({status:500,error:"web_sql_went_bad",reason:"unknown"}),n.LDB_ERROR=new r({status:500,error:"levelDB_went_went_bad",reason:"unknown"}),n.FORBIDDEN=new r({status:403,error:"forbidden",reason:"Forbidden by design doc validate_doc_update function"}),n.INVALID_REV=new r({status:400,error:"bad_request",reason:"Invalid rev format"}),n.FILE_EXISTS=new r({status:412,error:"file_exists",reason:"The database could not be created, the file already exists."}),n.MISSING_STUB=new r({status:412,error:"missing_stub"}),n.error=function(e,t,n){function o(t){for(var r in e)"function"!=typeof e[r]&&(this[r]=e[r]);void 0!==n&&(this.name=n),void 0!==t&&(this.reason=t)}return o.prototype=r.prototype,new o(t)},n.getErrorTypeByProp=function(e,t,r){var o=n,i=Object.keys(o).filter(function(n){var r=o[n];return"function"!=typeof r&&r[e]===t}),s=r&&i.filter(function(e){var t=o[e];return t.message===r})[0]||i[0];return s?o[s]:null},n.generateErrorFromResponse=function(e){var t,r,o,i,s,a=n;return r=e.error===!0&&"string"==typeof e.name?e.name:e.error,s=e.reason,o=a.getErrorTypeByProp("name",r,s),e.missing||"missing"===s||"deleted"===s||"not_found"===r?o=a.MISSING_DOC:"doc_validation"===r?(o=a.DOC_VALIDATION,i=s):"bad_request"===r&&o.message!==s&&(0===s.indexOf("unknown stub attachment")?(o=a.MISSING_STUB,i=s):o=a.BAD_REQUEST),o||(o=a.getErrorTypeByProp("status",e.status,s)||a.UNKNOWN_ERROR),t=a.error(o,s,r),i&&(t.message=i),e.id&&(t.id=e.id),e.status&&(t.status=e.status),e.statusText&&(t.name=e.statusText),e.missing&&(t.missing=e.missing),t}},{}],20:[function(e,t){(function(n,r){"use strict";function o(e,t,n){if("function"==typeof e.slice)return t||n?n?e.slice(t,n):e.slice(t):e.slice();t=Math.floor(t||0),n=Math.floor(n||0);var r=e.byteLength;if(t=0>t?Math.max(t+r,0):Math.min(r,t),n=0>n?Math.max(n+r,0):Math.min(r,n),0>=n-t)return new ArrayBuffer(0);var o=new ArrayBuffer(n-t),i=new Uint8Array(o),s=new Uint8Array(e,t,n-t);return i.set(s),o}function i(e){var t=[255&e,e>>>8&255,e>>>16&255,e>>>24&255];return t.map(function(e){return String.fromCharCode(e)}).join("")}function s(e){for(var t="",n=0;n<e.length;n++)t+=i(e[n]);return btoa(t)}var a=e(37),c=e(73),u=r.setImmediate||r.setTimeout,f=32768;t.exports=function(e,t){function r(e,t,n,r){d?e.appendBinary(t.substring(n,r)):e.append(o(t,n,r))}function i(){var n=_*h,o=n+h;if(_++,v>_)r(m,e,n,o),u(i);else{r(m,e,n,o);var a=m.end(!0),c=s(a);t(null,c),m.destroy()}}if(!n.browser){var l=a.createHash("md5").update(e).digest("base64");return void t(null,l)}var d="string"==typeof e,p=d?e.length:e.byteLength,h=Math.min(f,p),v=Math.ceil(p/h),_=0,m=d?new c:new c.ArrayBuffer;i()}}).call(this,e(39),"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],21:[function(e,t,n){"use strict";function r(e){return e.reduce(function(e,t){return e[t]=!0,e},{})}function o(e){if(!/^\d+\-./.test(e))return s.error(s.INVALID_REV);var t=e.indexOf("-"),n=e.substring(0,t),r=e.substring(t+1);return{prefix:parseInt(n,10),id:r}}function i(e,t){for(var n=e.start-e.ids.length+1,r=e.ids,o=[r[0],t,[]],i=1,s=r.length;s>i;i++)o=[r[i],{status:"missing"},[o]];return[{pos:n,ids:o}]}var s=e(19),a=e(26),c=r(["_id","_rev","_attachments","_deleted","_revisions","_revs_info","_conflicts","_deleted_conflicts","_local_seq","_rev_tree","_replication_id","_replication_state","_replication_state_time","_replication_state_reason","_replication_stats","_removed"]),u=r(["_attachments","_replication_id","_replication_state","_replication_state_time","_replication_state_reason","_replication_stats"]);n.invalidIdError=function(e){var t;if(e?"string"!=typeof e?t=s.error(s.INVALID_ID):/^_/.test(e)&&!/^_(design|local)/.test(e)&&(t=s.error(s.RESERVED_ID)):t=s.error(s.MISSING_ID),t)throw t},n.parseDoc=function(e,t){var r,f,l,d={status:"available"};if(e._deleted&&(d.deleted=!0),t)if(e._id||(e._id=a()),f=a(32,16).toLowerCase(),e._rev){if(l=o(e._rev),l.error)return l;e._rev_tree=[{pos:l.prefix,ids:[l.id,{status:"missing"},[[f,d,[]]]]}],r=l.prefix+1}else e._rev_tree=[{pos:1,ids:[f,d,[]]}],r=1;else if(e._revisions&&(e._rev_tree=i(e._revisions,d),r=e._revisions.start,f=e._revisions.ids[0]),!e._rev_tree){if(l=o(e._rev),l.error)return l;r=l.prefix,f=l.id,e._rev_tree=[{pos:r,ids:[f,d,[]]}]}n.invalidIdError(e._id),e._rev=r+"-"+f;var p={metadata:{},data:{}};for(var h in e)if(e.hasOwnProperty(h)){var v="_"===h[0];if(v&&!c[h]){var _=s.error(s.DOC_VALIDATION,h);throw _.message=s.DOC_VALIDATION.message+": "+h,_}v&&!u[h]?p.metadata[h.slice(1)]=e[h]:p.data[h]=e[h]}return p}},{}],22:[function(e,t){"use strict";function n(e){return decodeURIComponent(window.escape(e))}function r(e){return 65>e?e-48:e-55}function o(e,t,n){for(var o="";n>t;)o+=String.fromCharCode(r(e.charCodeAt(t++))<<4|r(e.charCodeAt(t++)));return o}function i(e,t,n){for(var o="";n>t;)o+=String.fromCharCode(r(e.charCodeAt(t+2))<<12|r(e.charCodeAt(t+3))<<8|r(e.charCodeAt(t))<<4|r(e.charCodeAt(t+1))),t+=4;return o}function s(e,t){return"UTF-8"===t?n(o(e,0,e.length)):i(e,0,e.length)}t.exports=s},{}],23:[function(e,t){"use strict";function n(e){for(var t=r,n=t.parser[t.strictMode?"strict":"loose"].exec(e),o={},i=14;i--;){var s=t.key[i],a=n[i]||"",c=-1!==["user","password"].indexOf(s);o[s]=c?decodeURIComponent(a):a}return o[t.q.name]={},o[t.key[12]].replace(t.q.parser,function(e,n,r){n&&(o[t.q.name][n]=r)}),o}var r={strictMode:!1,key:["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],q:{name:"queryKey",parser:/(?:^|&)([^&=]*)=?([^&]*)/g},parser:{strict:/^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,loose:/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/}};t.exports=n},{}],24:[function(e,t){"use strict";var n=e(17),r=e(34);t.exports=function(e,t){var o,i,s,a=function(){o.abort()};if(o=e.xhr?new e.xhr:new XMLHttpRequest,"GET"===e.method&&!e.cache){var c=-1!==e.url.indexOf("?");e.url+=(c?"&":"?")+"_nonce="+Date.now()}o.open(e.method,e.url),o.withCredentials=!0,e.json&&(e.headers.Accept="application/json",e.headers["Content-Type"]=e.headers["Content-Type"]||"application/json",e.body&&e.processData&&"string"!=typeof e.body&&(e.body=JSON.stringify(e.body))),e.binary&&(o.responseType="arraybuffer"),"body"in e||(e.body=null);for(var u in e.headers)e.headers.hasOwnProperty(u)&&o.setRequestHeader(u,e.headers[u]);return e.timeout>0&&(i=setTimeout(a,e.timeout),o.onprogress=function(){clearTimeout(i),i=setTimeout(a,e.timeout)},"undefined"==typeof s&&(s=-1!==Object.keys(o).indexOf("upload")),s&&(o.upload.onprogress=o.onprogress)),o.onreadystatechange=function(){if(4===o.readyState){var r={statusCode:o.status};if(o.status>=200&&o.status<300){var i;i=e.binary?n([o.response||""],{type:o.getResponseHeader("Content-Type")}):o.responseText,t(null,r,i)}else{var s={};try{s=JSON.parse(o.response)}catch(a){}t(s,r)}}},e.body&&e.body instanceof Blob?r.readAsBinaryString(e.body,function(e){o.send(r.fixBinary(e))}):o.send(e.body),{abort:a}}},{}],25:[function(e,t){"use strict";var n=e(72).upsert;t.exports=function(e,t,r,o){return n.call(e,t,r,o)}},{}],26:[function(e,t){"use strict";function n(e){return 0|Math.random()*e}function r(e,t){t=t||o.length;var r="",i=-1;if(e){for(;++i<e;)r+=o[n(t)];return r}for(;++i<36;)switch(i){case 8:case 13:case 18:case 23:r+="-";break;case 19:r+=o[3&n(16)|8];break;default:r+=o[n(16)]}return r}var o="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");t.exports=r},{}],27:[function(_dereq_,module,exports){"use strict";function evalFilter(input){return eval(["(function () { return ",input," })()"].join(""))}module.exports=evalFilter},{}],28:[function(_dereq_,module,exports){"use strict";function evalView(input){return eval(["(function () {","  return function (doc) {","    var emitted = false;","    var emit = function (a, b) {","      emitted = true;","    };","    var view = "+input+";","    view(doc);","    if (emitted) {","      return true;","    }","  }","})()"].join("\n"))}module.exports=evalView},{}],29:[function(e,t){"use strict";function n(e,t,n){for(var r,o=0,i=e.length;i>o;)r=o+i>>>1,n(e[r],t)<0?o=r+1:i=r;return o}function r(e,t,r){var o=n(e,t,r);e.splice(o,0,t)}function o(e){for(var t,n=e.shift(),r=[n.id,n.opts,[]],o=r;e.length;)n=e.shift(),t=[n.id,n.opts,[]],o[2].push(t),o=t;return r}function i(e,t){return e[0]<t[0]?-1:1}function s(e,t){for(var n=[{tree1:e,tree2:t}],o=!1;n.length>0;){var s=n.pop(),a=s.tree1,c=s.tree2;(a[1].status||c[1].status)&&(a[1].status="available"===a[1].status||"available"===c[1].status?"available":"missing");for(var u=0;u<c[2].length;u++)if(a[2][0]){for(var f=!1,l=0;l<a[2].length;l++)a[2][l][0]===c[2][u][0]&&(n.push({tree1:a[2][l],tree2:c[2][u]}),f=!0);f||(o="new_branch",r(a[2],c[2][u],i))}else o="new_leaf",a[2][0]=c[2][u]}return{conflicts:o,tree:e}}function a(e,t,n){var r,o=[],i=!1,a=!1;return e.length?(e.forEach(function(e){if(e.pos===t.pos&&e.ids[0]===t.ids[0])r=s(e.ids,t.ids),o.push({pos:e.pos,ids:r.tree}),i=i||r.conflicts,a=!0;else if(n!==!0){var c=e.pos<t.pos?e:t,u=e.pos<t.pos?t:e,f=u.pos-c.pos,l=[],d=[];for(d.push({ids:c.ids,diff:f,parent:null,parentIdx:null});d.length>0;){var p=d.pop();0!==p.diff?p.ids&&p.ids[2].forEach(function(e,t){d.push({ids:e,diff:p.diff-1,parent:p.ids,parentIdx:t})}):p.ids[0]===u.ids[0]&&l.push(p)}var h=l[0];h?(r=s(h.ids,u.ids),h.parent[2][h.parentIdx]=r.tree,o.push({pos:c.pos,ids:c.ids}),i=i||r.conflicts,a=!0):o.push(e)}else o.push(e)}),a||o.push(t),o.sort(function(e,t){return e.pos-t.pos}),{tree:o,conflicts:i||"internal_node"}):{tree:[t],conflicts:"new_leaf"}}function c(e,t){var n=f.rootToLeaf(e).map(function(e){var n=e.ids.slice(-t);return{pos:e.pos+(e.ids.length-n.length),ids:o(n)}});return n.reduce(function(e,t){return a(e,t,!0).tree},[n.shift()])}var u=e(65),f={};f.merge=function(e,t,n){e=u(!0,[],e),t=u(!0,{},t);var r=a(e,t);return{tree:c(r.tree,n),conflicts:r.conflicts}},f.winningRev=function(e){var t=[];return f.traverseRevTree(e.rev_tree,function(e,n,r,o,i){e&&t.push({pos:n,id:r,deleted:!!i.deleted})}),t.sort(function(e,t){return e.deleted!==t.deleted?e.deleted>t.deleted?1:-1:e.pos!==t.pos?t.pos-e.pos:e.id<t.id?1:-1}),t[0].pos+"-"+t[0].id},f.traverseRevTree=function(e,t){for(var n,r=e.slice();n=r.pop();)for(var o=n.pos,i=n.ids,s=i[2],a=t(0===s.length,o,i[0],n.ctx,i[1]),c=0,u=s.length;u>c;c++)r.push({pos:o+1,ids:s[c],ctx:a})},f.collectLeaves=function(e){var t=[];return f.traverseRevTree(e,function(e,n,r,o,i){e&&t.push({rev:n+"-"+r,pos:n,opts:i})}),t.sort(function(e,t){return t.pos-e.pos}),t.forEach(function(e){delete e.pos}),t},f.collectConflicts=function(e){var t=f.winningRev(e),n=f.collectLeaves(e.rev_tree),r=[];return n.forEach(function(e){e.rev===t||e.opts.deleted||r.push(e.rev)}),r},f.rootToLeaf=function(e){var t=[];return f.traverseRevTree(e,function(e,n,r,o,i){if(o=o?o.slice(0):[],o.push({id:r,opts:i}),e){var s=n+1-o.length;t.unshift({pos:s,ids:o})}return o}),t},t.exports=f},{}],30:[function(e,t,n){"use strict";function r(e,t){e=parseInt(e,10),t=parseInt(t,10),e!==e&&(e=0),t!==t||e>=t?t=(e||1)<<1:t+=1;var n=Math.random(),r=t-e;return~~(r*n+e)}function o(e){var t=0;return e||(t=2e3),r(e,t)}function i(e,t,n,r,i,s,a){return r.retry===!1?(i.emit("error",a),void i.removeAllListeners()):(r.default_back_off=r.default_back_off||0,r.retries=r.retries||0,"function"!=typeof r.back_off_function&&(r.back_off_function=o),r.retries++,r.max_retries&&r.retries>r.max_retries?(i.emit("error",new Error("tried "+r.retries+" times but replication failed")),void i.removeAllListeners()):(i.emit("requestError",a),"active"===i.state&&(i.emit("paused",a),i.state="stopped",i.once("active",function(){r.current_back_off=r.default_back_off})),r.current_back_off=r.current_back_off||r.default_back_off,r.current_back_off=r.back_off_function(r.current_back_off),void setTimeout(function(){c(e,t,n,r,i)},r.current_back_off)))}function s(){d.call(this),this.cancelled=!1,this.state="pending";var e=this,t=new l.Promise(function(t,n){e.once("complete",t),e.once("error",n)});e.then=function(e,n){return t.then(e,n)},e["catch"]=function(e){return t["catch"](e)},e["catch"](function(){})}function a(e,t,n){var r=n.filter?n.filter.toString():"";return e.id().then(function(e){return t.id().then(function(t){var o=e+t+r+JSON.stringify(n.query_params)+n.doc_ids;return l.MD5(o).then(function(e){return e=e.replace(/\//g,".").replace(/\+/g,"_"),"_local/"+e})})})}function c(e,t,n,r,o,s){function a(){if(0!==A.docs.length){var e=A.docs;return n.bulkDocs({docs:e,new_edits:!1}).then(function(t){if(F.cancelled)throw b(),new Error("cancelled");var n=[],r={};t.forEach(function(e){e.error&&(s.doc_write_failures++,n.push(e),r[e.id]=e)}),s.errors=n,P=P.concat(n),s.docs_written+=A.docs.length-n.length;var i=n.filter(function(e){return"unauthorized"!==e.name&&"forbidden"!==e.name});if(U=[],e.forEach(function(e){var t=r[e._id];t?o.emit("denied",l.clone(t)):U.push(e)}),i.length>0){var a=new Error("bulkDocs error");throw a.other_errors=n,y("target.bulkDocs failed to write docs",a),new Error("bulkWrite partial failure")}},function(t){throw s.doc_write_failures+=e.length,t})}}function c(e){for(var n=A.diffs,r=n[e].missing,o=[],i=0;i<r.length;i+=h)o.push(r.slice(i,Math.min(r.length,i+h)));return l.Promise.all(o.map(function(r){var o={revs:!0,open_revs:r,attachments:!0};return t.get(e,o).then(function(t){t.forEach(function(e){return F.cancelled?b():void(e.ok&&(s.docs_read++,A.pendingRevs++,A.docs.push(e.ok)))}),delete n[e]})}))}function u(){var e=Object.keys(A.diffs);return l.Promise.all(e.map(c))}function f(){var e=Object.keys(A.diffs).filter(function(e){var t=A.diffs[e].missing;return 1===t.length&&"1-"===t[0].slice(0,2)});return e.length?t.allDocs({keys:e,include_docs:!0}).then(function(e){if(F.cancelled)throw b(),new Error("cancelled");e.rows.forEach(function(e){!e.doc||e.deleted||"1-"!==e.value.rev.slice(0,2)||e.doc._attachments&&0!==Object.keys(e.doc._attachments).length||(s.docs_read++,A.pendingRevs++,A.docs.push(e.doc),delete A.diffs[e.id])})}):l.Promise.resolve()}function d(){return f().then(u)}function v(){return q=!0,M.writeCheckpoint(A.seq).then(function(){if(q=!1,F.cancelled)throw b(),new Error("cancelled");s.last_seq=C=A.seq;var e=l.clone(s);e.docs=U,o.emit("change",e),A=void 0,T()})["catch"](function(e){throw q=!1,y("writeCheckpoint completed with error",e),e})}function _(){var e={};return A.changes.forEach(function(t){e[t.id]=t.changes.map(function(e){return e.rev})}),n.revsDiff(e).then(function(e){if(F.cancelled)throw b(),new Error("cancelled");A.diffs=e,A.pendingRevs=0})}function m(){if(!F.cancelled&&!A){if(0===O.length)return void g(!0);A=O.shift(),_().then(d).then(a).then(v).then(m)["catch"](function(e){y("batch processing terminated with error",e)})}}function g(e){return 0===k.changes.length?void(0!==O.length||A||((L&&J.live||R)&&(o.emit("paused"),o.emit("uptodate",s)),R&&b())):void((e||R||k.changes.length>=I)&&(O.push(k),k={seq:0,changes:[],docs:[]},m()))}function y(e,t){D||(t.message||(t.message=e),s.ok=!1,s.status="aborting",s.errors.push(t),P=P.concat(t),O=[],k={seq:0,changes:[],docs:[]},b())}function b(){if(!(D||F.cancelled&&(s.status="cancelled",q))){s.status=s.status||"complete",s.end_time=new Date,s.last_seq=C,D=F.cancelled=!0;var a=P.filter(function(e){return"unauthorized"!==e.name&&"forbidden"!==e.name});if(a.length>0){var c=P.pop();P.length>0&&(c.other_errors=P),c.result=s,i(e,t,n,r,o,s,c)}else s.errors=P,o.emit("complete",s),o.removeAllListeners()}}function E(e){if(F.cancelled)return b();var t=l.filterChange(r)(e);t&&(0!==k.changes.length||0!==O.length||A||o.emit("outofdate",s),k.seq=e.seq,k.changes.push(e),g(0===O.length))}function w(e){return j=!1,F.cancelled?b():(e.results.length>0?(J.since=e.last_seq,T()):L?(J.live=!0,T()):R=!0,void g(!0))}function S(e){return j=!1,F.cancelled?b():void y("changes rejected",e)}function T(){function e(){r.cancel()}function n(){o.removeListener("cancel",e)}if(!j&&!R&&O.length<N){j=!0,o.once("cancel",e);var r=t.changes(J).on("change",E);r.then(n,n),r.then(w)["catch"](S)}}function x(){M.getCheckpoint().then(function(e){C=e,J={since:C,limit:I,batch_size:I,style:"all_docs",doc_ids:B,returnDocs:!0},r.filter&&(J.include_docs=!0),r.query_params&&(J.query_params=r.query_params),T()})["catch"](function(e){y("getCheckpoint rejected with ",e)})}var A,O=[],k={seq:0,changes:[],docs:[]},q=!1,R=!1,D=!1,C=0,L=r.continuous||r.live||!1,I=r.batch_size||100,N=r.batches_limit||10,j=!1,B=r.doc_ids,F={cancelled:!1},M=new p(t,n,e,F),P=[],U=[];s=s||{ok:!0,start_time:new Date,docs_read:0,docs_written:0,doc_write_failures:0,errors:[]};var J={};o.ready(t,n),o.once("cancel",b),"function"==typeof r.onChange&&o.on("change",r.onChange),"function"==typeof r.complete&&(o.once("error",r.complete),o.once("complete",function(e){r.complete(null,e)})),"undefined"==typeof r.since?x():(q=!0,M.writeCheckpoint(r.since).then(function(){return q=!1,F.cancelled?void b():(C=r.since,void x())})["catch"](function(e){throw q=!1,y("writeCheckpoint completed with error",e),e}))}function u(e,t){var n=t.PouchConstructor;return"string"==typeof e?new n(e):e.then?e:l.Promise.resolve(e)}function f(e,t,n,r){"function"==typeof n&&(r=n,n={}),"undefined"==typeof n&&(n={}),n.complete||(n.complete=r||function(){}),n=l.clone(n),n.continuous=n.continuous||n.live,n.retry="retry"in n?n.retry:v,n.PouchConstructor=n.PouchConstructor||this;var o=new s(n);return u(e,n).then(function(e){return u(t,n).then(function(t){return a(e,t,n).then(function(r){c(r,e,t,n,o)})})})["catch"](function(e){o.emit("error",e),n.complete(e)}),o}var l=e(34),d=e(38).EventEmitter,p=e(14),h=50,v=!1;l.inherits(s,d),s.prototype.cancel=function(){this.cancelled=!0,this.state="cancelled",this.emit("cancel")},s.prototype.ready=function(e,t){function n(){o.cancel()}function r(){e.removeListener("destroyed",n),t.removeListener("destroyed",n)}var o=this;this.once("change",function(){("pending"===this.state||"stopped"===this.state)&&(o.state="active",o.emit("active"))}),e.once("destroyed",n),t.once("destroyed",n),this.then(r,r)},n.toPouch=u,n.replicate=f},{}],31:[function(e,t){"use strict";var n=e(15),r=e(34),o=r.Promise,i=e(38).EventEmitter;n.adapters={},n.preferredAdapters=e(8),n.prefix="_pouch_";var s=new i,a=["on","addListener","emit","listeners","once","removeAllListeners","removeListener","setMaxListeners"];a.forEach(function(e){n[e]=s[e].bind(s)}),n.setMaxListeners(0),n.parseAdapter=function(e,t){var o,i,s=e.match(/([a-z\-]*):\/\/(.*)/);if(s){if(e=/http(s?)/.test(s[1])?s[1]+"://"+s[2]:s[2],o=s[1],!n.adapters[o].valid())throw"Invalid adapter";return{name:e,adapter:s[1]}}var a="idb"in n.adapters&&"websql"in n.adapters&&r.hasLocalStorage()&&localStorage["_pouch__websqldb_"+n.prefix+e];if("undefined"!=typeof t&&t.db)i="leveldb";else for(var c=0;c<n.preferredAdapters.length;++c)if(i=n.preferredAdapters[c],i in n.adapters){if(a&&"idb"===i)continue;break}if(o=n.adapters[i],i&&o){var u="use_prefix"in o?o.use_prefix:!0;return{name:u?n.prefix+e:e,adapter:i}}throw"No valid adapter found"},n.destroy=r.toPromise(function(e,t,i){function s(){u.destroy(d,t,function(t,r){t?i(t):(n.emit("destroyed",e),n.emit(e,"destroyed"),i(null,r||{ok:!0}))})}("function"==typeof t||"undefined"==typeof t)&&(i=t,t={}),e&&"object"==typeof e&&(t=e,e=void 0),t.internal||console.log("PouchDB.destroy() is deprecated and will be removed. Please use db.destroy() instead.");var a=n.parseAdapter(t.name||e,t),c=a.name,u=n.adapters[a.adapter],f="use_prefix"in u?u.use_prefix:!0,l=f?c.replace(new RegExp("^"+n.prefix),""):c,d=("http"===a.adapter||"https"===a.adapter?"":t.prefix||"")+c,p=r.extend(!0,{},t,{adapter:a.adapter});new n(l,p,function(e,a){return e?i(e):void a.get("_local/_pouch_dependentDbs",function(e,c){if(e)return 404!==e.status?i(e):s();var u=c.dependentDbs,l=Object.keys(u).map(function(e){var o=f?e.replace(new RegExp("^"+n.prefix),""):e,i=r.extend(!0,t,a.__opts||{});return a.constructor.destroy(o,i)});o.all(l).then(s,function(e){i(e)})})})}),n.adapter=function(e,t){t.valid()&&(n.adapters[e]=t)},n.plugin=function(e){Object.keys(e).forEach(function(t){n.prototype[t]=e[t]})},n.defaults=function(e){function t(t,o,i){("function"==typeof o||"undefined"==typeof o)&&(i=o,o={}),t&&"object"==typeof t&&(o=t,t=void 0),o=r.extend(!0,{},e,o),n.call(this,t,o,i)}return r.inherits(t,n),t.destroy=r.toPromise(function(t,o,i){return("function"==typeof o||"undefined"==typeof o)&&(i=o,o={}),t&&"object"==typeof t&&(o=t,t=void 0),o=r.extend(!0,{},e,o),n.destroy(t,o,i)}),a.forEach(function(e){t[e]=s[e].bind(s)}),t.setMaxListeners(0),t.preferredAdapters=n.preferredAdapters.slice(),Object.keys(n).forEach(function(e){e in t||(t[e]=n[e])}),t},t.exports=n},{}],32:[function(e,t){"use strict";function n(e,t,n,s){return"function"==typeof n&&(s=n,n={}),"undefined"==typeof n&&(n={}),n=o.clone(n),n.PouchConstructor=n.PouchConstructor||this,e=i.toPouch(e,n),t=i.toPouch(t,n),new r(e,t,n,s)}function r(e,t,n,r){function i(e){v||(v=!0,d.emit("cancel",e))}function a(e){d.emit("change",{direction:"pull",change:e})}function c(e){d.emit("change",{direction:"push",change:e})}function u(e){d.emit("denied",{direction:"push",doc:e})}function f(e){d.emit("denied",{direction:"pull",doc:e})}function l(e){return function(t,n){var r="change"===t&&(n===a||n===c),o="cancel"===t&&n===i,s=t in _&&n===_[t];(r||o||s)&&(t in m||(m[t]={}),m[t][e]=!0,2===Object.keys(m[t]).length&&d.removeAllListeners(t))}}var d=this;this.canceled=!1;var p,h;"onChange"in n&&(p=n.onChange,delete n.onChange),"function"!=typeof r||n.complete?"complete"in n&&(h=n.complete,delete n.complete):h=r,this.push=s(e,t,n),this.pull=s(t,e,n);var v=!1,_={},m={};n.live&&(this.push.on("complete",d.pull.cancel.bind(d.pull)),this.pull.on("complete",d.push.cancel.bind(d.push))),this.on("newListener",function(e){"change"===e?(d.pull.on("change",a),d.push.on("change",c)):"denied"===e?(d.pull.on("denied",f),d.push.on("denied",u)):"cancel"===e?(d.pull.on("cancel",i),d.push.on("cancel",i)):"error"===e||"removeListener"===e||"complete"===e||e in _||(_[e]=function(t){d.emit(e,t)},d.pull.on(e,_[e]),d.push.on(e,_[e]))}),this.on("removeListener",function(e){"change"===e?(d.pull.removeListener("change",a),d.push.removeListener("change",c)):"cancel"===e?(d.pull.removeListener("cancel",i),d.push.removeListener("cancel",i)):e in _&&"function"==typeof _[e]&&(d.pull.removeListener(e,_[e]),d.push.removeListener(e,_[e]),delete _[e])}),this.pull.on("removeListener",l("pull")),this.push.on("removeListener",l("push"));var g=o.Promise.all([this.push,this.pull]).then(function(e){var t={push:e[0],pull:e[1]};return d.emit("complete",t),h&&h(null,t),d.removeAllListeners(),t},function(e){throw d.cancel(),d.emit("error",e),h&&h(e),d.removeAllListeners(),e});this.then=function(e,t){return g.then(e,t)},this["catch"]=function(e){return g["catch"](e)}}var o=e(34),i=e(30),s=i.replicate,a=e(38).EventEmitter;o.inherits(r,a),t.exports=n,r.prototype.cancel=function(){this.canceled||(this.canceled=!0,this.push.cancel(),this.pull.cancel())}},{}],33:[function(e,t){"use strict";function n(){this.isReady=!1,this.failed=!1,this.queue=[]}t.exports=n,n.prototype.execute=function(){var e,t;if(this.failed)for(;e=this.queue.shift();)"function"!=typeof e?(t=e.parameters[e.parameters.length-1],"function"==typeof t?t(this.failed):"changes"===e.name&&"function"==typeof t.complete&&t.complete(this.failed)):e(this.failed);else if(this.isReady)for(;e=this.queue.shift();)"function"==typeof e?e():e.task=this.db[e.name].apply(this.db,e.parameters)},n.prototype.fail=function(e){this.failed=e,this.execute()},n.prototype.ready=function(e){return this.failed?!1:0===arguments.length?this.isReady:(this.isReady=e?!0:!1,this.db=e,void this.execute())},n.prototype.addTask=function(e,t){if("function"!=typeof e){var n={name:e,parameters:t};return this.queue.push(n),this.failed&&this.execute(),n}this.queue.push(e),this.failed&&this.execute()}},{}],34:[function(e,t,n){(function(t,r){function o(){return"undefined"!=typeof chrome&&"undefined"!=typeof chrome.storage&&"undefined"!=typeof chrome.storage.local}function i(){if(!(this instanceof i))return new i;var e=this;u.call(this),this.isChrome=o(),this.listeners={},this.hasLocal=!1,this.isChrome||(this.hasLocal=n.hasLocalStorage()),this.isChrome?chrome.storage.onChanged.addListener(function(t){null!=t.db_name&&e.emit(t.dbName.newValue)}):this.hasLocal&&("undefined"!=typeof addEventListener?addEventListener("storage",function(t){e.emit(t.key)}):window.attachEvent("storage",function(t){e.emit(t.key)}))}var s=e(29);n.extend=e(65),n.ajax=e(16),n.createBlob=e(17),n.uuid=e(26),n.getArguments=e(36);var a=e(18),c=e(19),u=e(38).EventEmitter,f=e(64);n.Map=f.Map,n.Set=f.Set;var l=e(21);n.Promise="function"==typeof r.Promise?r.Promise:e(47);var d=n.Promise;n.lastIndexOf=function(e,t){for(var n=e.length-1;n>=0;n--)if(e.charAt(n)===t)return n;return-1},n.clone=function(e){return n.extend(!0,{},e)},n.pick=function(e,t){for(var n={},r=0,o=t.length;o>r;r++){var i=t[r];n[i]=e[i]}return n},n.inherits=e(43),n.call=n.getArguments(function(e){if(e.length){var t=e.shift();"function"==typeof t&&t.apply(this,e)}}),n.isLocalId=function(e){return/^_local/.test(e)},n.isDeleted=function(e,t){t||(t=s.winningRev(e));var n=t.indexOf("-");-1!==n&&(t=t.substring(n+1));var r=!1;return s.traverseRevTree(e.rev_tree,function(e,n,o,i,s){o===t&&(r=!!s.deleted)}),r},n.revExists=function(e,t){var n=!1;return s.traverseRevTree(e.rev_tree,function(e,r,o){r+"-"+o===t&&(n=!0)}),n},n.filterChange=function(e){var t={},n=e.filter&&"function"==typeof e.filter;return t.query=e.query_params,function(r){if(e.filter&&n&&!e.filter.call(this,r.doc,t))return!1;if(e.include_docs){if(!e.attachments)for(var o in r.doc._attachments)r.doc._attachments.hasOwnProperty(o)&&(r.doc._attachments[o].stub=!0)}else delete r.doc;return!0}},n.parseDoc=l.parseDoc,n.invalidIdError=l.invalidIdError,n.isCordova=function(){return"undefined"!=typeof cordova||"undefined"!=typeof PhoneGap||"undefined"!=typeof phonegap},n.hasLocalStorage=function(){if(o())return!1;try{return localStorage}catch(e){return!1}},n.Changes=i,n.inherits(i,u),i.prototype.addListener=function(e,r,o,i){function s(){if(a.listeners[r]){if(c)return void(c="waiting");c=!0,o.changes({style:i.style,include_docs:i.include_docs,attachments:i.attachments,conflicts:i.conflicts,continuous:!1,descending:!1,filter:i.filter,doc_ids:i.doc_ids,view:i.view,since:i.since,query_params:i.query_params}).on("change",function(e){e.seq>i.since&&!i.cancelled&&(i.since=e.seq,n.call(i.onChange,e))}).on("complete",function(){"waiting"===c&&t.nextTick(function(){a.notify(e)}),c=!1}).on("error",function(){c=!1})}}if(!this.listeners[r]){var a=this,c=!1;this.listeners[r]=s,this.on(e,s)
}},i.prototype.removeListener=function(e,t){t in this.listeners&&u.prototype.removeListener.call(this,e,this.listeners[t])},i.prototype.notifyLocalWindows=function(e){this.isChrome?chrome.storage.local.set({dbName:e}):this.hasLocal&&(localStorage[e]="a"===localStorage[e]?"b":"a")},i.prototype.notify=function(e){this.emit(e),this.notifyLocalWindows(e)},n.atob="function"==typeof atob?function(e){return atob(e)}:function(e){var t=new a(e,"base64");if(t.toString("base64")!==e)throw"Cannot base64 encode full string";return t.toString("binary")},n.btoa="function"==typeof btoa?function(e){return btoa(e)}:function(e){return new a(e,"binary").toString("base64")},n.fixBinary=function(e){if(!t.browser)return e;for(var n=e.length,r=new ArrayBuffer(n),o=new Uint8Array(r),i=0;n>i;i++)o[i]=e.charCodeAt(i);return r},n.readAsBinaryString=function(e,t){var r=new FileReader,o="function"==typeof r.readAsBinaryString;r.onloadend=function(e){var r=e.target.result||"";return o?t(r):void t(n.arrayBufferToBinaryString(r))},o?r.readAsBinaryString(e):r.readAsArrayBuffer(e)},n.readAsArrayBuffer=function(e,t){var n=new FileReader;n.onloadend=function(e){var n=e.target.result||new ArrayBuffer(0);t(n)},n.readAsArrayBuffer(e)},n.once=function(e){var t=!1;return n.getArguments(function(n){if(t)throw new Error("once called  more than once");t=!0,e.apply(this,n)})},n.toPromise=function(e){return n.getArguments(function(r){var o,i=this,s="function"==typeof r[r.length-1]?r.pop():!1;s&&(o=function(e,n){t.nextTick(function(){s(e,n)})});var a=new d(function(t,o){var s;try{var a=n.once(function(e,n){e?o(e):t(n)});r.push(a),s=e.apply(i,r),s&&"function"==typeof s.then&&t(s)}catch(c){o(c)}});return o&&a.then(function(e){o(null,e)},o),a.cancel=function(){return this},a})},n.adapterFun=function(t,r){function o(e,t,n){if(i.enabled){for(var r=[e._db_name,t],o=0;o<n.length-1;o++)r.push(n[o]);i.apply(null,r);var s=n[n.length-1];n[n.length-1]=function(n,r){var o=[e._db_name,t];o=o.concat(n?["error",n]:["success",r]),i.apply(null,o),s(n,r)}}}var i=e(40)("pouchdb:api");return n.toPromise(n.getArguments(function(e){if(this._closed)return d.reject(new Error("database is closed"));var i=this;return o(i,t,e),this.taskqueue.isReady?r.apply(this,e):new n.Promise(function(n,r){i.taskqueue.addTask(function(o){o?r(o):n(i[t].apply(i,e))})})}))},n.arrayBufferToBinaryString=function(e){for(var t="",n=new Uint8Array(e),r=n.byteLength,o=0;r>o;o++)t+=String.fromCharCode(n[o]);return t},n.cancellableFun=function(e,t,r){r=r?n.clone(!0,{},r):{};var o=new u,i=r.complete||function(){},s=r.complete=n.once(function(e,t){e?i(e):(o.emit("end",t),i(null,t)),o.removeAllListeners()}),a=r.onChange||function(){},c=0;t.on("destroyed",function(){o.removeAllListeners()}),r.onChange=function(e){a(e),e.seq<=c||(c=e.seq,o.emit("change",e),e.deleted?o.emit("delete",e):1===e.changes.length&&"1-"===e.changes[0].rev.slice(0,1)?o.emit("create",e):o.emit("update",e))};var f=new d(function(e,t){r.complete=function(n,r){n?t(n):e(r)}});return f.then(function(e){s(null,e)},s),f.cancel=function(){f.isCancelled=!0,t.taskqueue.isReady&&r.complete(null,{status:"cancelled"})},t.taskqueue.isReady?e(t,r,f):t.taskqueue.addTask(function(){f.isCancelled?r.complete(null,{status:"cancelled"}):e(t,r,f)}),f.on=o.on.bind(o),f.once=o.once.bind(o),f.addListener=o.addListener.bind(o),f.removeListener=o.removeListener.bind(o),f.removeAllListeners=o.removeAllListeners.bind(o),f.setMaxListeners=o.setMaxListeners.bind(o),f.listeners=o.listeners.bind(o),f.emit=o.emit.bind(o),f},n.MD5=n.toPromise(e(20)),n.explain404=function(e){t.browser&&"console"in r&&"info"in console&&console.info("The above 404 is totally normal. "+e)},n.info=function(e){"undefined"!=typeof console&&"info"in console&&console.info(e)},n.parseUri=e(23),n.compare=function(e,t){return t>e?-1:e>t?1:0},n.updateDoc=function(e,t,r,o,i,a,u){if(n.revExists(e,t.metadata.rev))return r[o]=t,i();var f=n.isDeleted(e),l=n.isDeleted(t.metadata),d=/^1-/.test(t.metadata.rev);if(f&&!l&&u&&d){var p=t.data;p._rev=s.winningRev(e),p._id=t.metadata.id,t=n.parseDoc(p,u)}var h=s.merge(e.rev_tree,t.metadata.rev_tree[0],1e3),v=u&&(f&&l||!f&&"new_leaf"!==h.conflicts||f&&!l&&"new_branch"===h.conflicts);if(v){var _=c.error(c.REV_CONFLICT);return r[o]=_,i()}var m=t.metadata.rev;t.metadata.rev_tree=h.tree,e.rev_map&&(t.metadata.rev_map=e.rev_map);var g=s.winningRev(t.metadata);l=n.isDeleted(t.metadata,g);var y=0;(u||g===m)&&(y=f===l?0:l>f?-1:1),a(t,g,l,i,!0,y,o)},n.processDocs=function(e,t,r,o,i,a,u,f){function l(e,t,r){var o=s.winningRev(e.metadata),f=n.isDeleted(e.metadata,o);if("was_delete"in u&&f)return i[t]=c.error(c.MISSING_DOC,"deleted"),r();var l=f?0:1;a(e,o,f,r,!1,l,t)}function d(){++v===_&&f&&f()}if(e.length){var p=u.new_edits,h=new n.Map,v=0,_=e.length;e.forEach(function(e,r){if(e._id&&n.isLocalId(e._id))return void t[e._deleted?"_removeLocal":"_putLocal"](e,{ctx:o},function(e){i[r]=e?e:{ok:!0},d()});var s=e.metadata.id;h.has(s)?(_--,h.get(s).push([e,r])):h.set(s,[[e,r]])}),h.forEach(function(e,t){function o(){++c<e.length?s():d()}function s(){var s=e[c],u=s[0],f=s[1];r.has(t)?n.updateDoc(r.get(t),u,i,f,o,a,p):l(u,f,o)}var c=0;s()})}},n.preprocessAttachments=function(e,t,r){function o(e){try{return n.atob(e)}catch(t){var r=c.error(c.BAD_ARG,"Attachments need to be base64 encoded");return{error:r}}}function i(e,r){if(e.stub)return r();if("string"==typeof e.data){var i=o(e.data);if(i.error)return r(i.error);e.length=i.length,e.data="blob"===t?n.createBlob([n.fixBinary(i)],{type:e.content_type}):"base64"===t?n.btoa(i):i,n.MD5(i).then(function(t){e.digest="md5-"+t,r()})}else n.readAsArrayBuffer(e.data,function(o){"binary"===t?e.data=n.arrayBufferToBinaryString(o):"base64"===t&&(e.data=n.btoa(n.arrayBufferToBinaryString(o))),n.MD5(o).then(function(t){e.digest="md5-"+t,e.length=o.byteLength,r()})})}function s(){u++,e.length===u&&(a?r(a):r())}if(!e.length)return r();var a,u=0;e.forEach(function(e){function t(e){a=e,r++,r===n.length&&s()}var n=e.data&&e.data._attachments?Object.keys(e.data._attachments):[],r=0;if(!n.length)return s();for(var o in e.data._attachments)e.data._attachments.hasOwnProperty(o)&&i(e.data._attachments[o],t)})},n.compactTree=function(e){var t=[];return s.traverseRevTree(e.rev_tree,function(e,n,r,o,i){"available"!==i.status||e||(t.push(n+"-"+r),i.status="missing")}),t};var p=e(74);n.safeJsonParse=function(e){try{return JSON.parse(e)}catch(t){return p.parse(e)}},n.safeJsonStringify=function(e){try{return JSON.stringify(e)}catch(t){return p.stringify(e)}}}).call(this,e(39),"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],35:[function(e,t){t.exports="3.3.1"},{}],36:[function(e,t){"use strict";function n(e){return function(){var t=arguments.length;if(t){for(var n=[],r=-1;++r<t;)n[r]=arguments[r];return e.call(this,n)}return e.call(this,[])}}t.exports=n},{}],37:[function(){},{}],38:[function(e,t){function n(){this._events=this._events||{},this._maxListeners=this._maxListeners||void 0}function r(e){return"function"==typeof e}function o(e){return"number"==typeof e}function i(e){return"object"==typeof e&&null!==e}function s(e){return void 0===e}t.exports=n,n.EventEmitter=n,n.prototype._events=void 0,n.prototype._maxListeners=void 0,n.defaultMaxListeners=10,n.prototype.setMaxListeners=function(e){if(!o(e)||0>e||isNaN(e))throw TypeError("n must be a positive number");return this._maxListeners=e,this},n.prototype.emit=function(e){var t,n,o,a,c,u;if(this._events||(this._events={}),"error"===e&&(!this._events.error||i(this._events.error)&&!this._events.error.length)){if(t=arguments[1],t instanceof Error)throw t;throw TypeError('Uncaught, unspecified "error" event.')}if(n=this._events[e],s(n))return!1;if(r(n))switch(arguments.length){case 1:n.call(this);break;case 2:n.call(this,arguments[1]);break;case 3:n.call(this,arguments[1],arguments[2]);break;default:for(o=arguments.length,a=new Array(o-1),c=1;o>c;c++)a[c-1]=arguments[c];n.apply(this,a)}else if(i(n)){for(o=arguments.length,a=new Array(o-1),c=1;o>c;c++)a[c-1]=arguments[c];for(u=n.slice(),o=u.length,c=0;o>c;c++)u[c].apply(this,a)}return!0},n.prototype.addListener=function(e,t){var o;if(!r(t))throw TypeError("listener must be a function");if(this._events||(this._events={}),this._events.newListener&&this.emit("newListener",e,r(t.listener)?t.listener:t),this._events[e]?i(this._events[e])?this._events[e].push(t):this._events[e]=[this._events[e],t]:this._events[e]=t,i(this._events[e])&&!this._events[e].warned){var o;o=s(this._maxListeners)?n.defaultMaxListeners:this._maxListeners,o&&o>0&&this._events[e].length>o&&(this._events[e].warned=!0,console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",this._events[e].length),"function"==typeof console.trace&&console.trace())}return this},n.prototype.on=n.prototype.addListener,n.prototype.once=function(e,t){function n(){this.removeListener(e,n),o||(o=!0,t.apply(this,arguments))}if(!r(t))throw TypeError("listener must be a function");var o=!1;return n.listener=t,this.on(e,n),this},n.prototype.removeListener=function(e,t){var n,o,s,a;if(!r(t))throw TypeError("listener must be a function");if(!this._events||!this._events[e])return this;if(n=this._events[e],s=n.length,o=-1,n===t||r(n.listener)&&n.listener===t)delete this._events[e],this._events.removeListener&&this.emit("removeListener",e,t);else if(i(n)){for(a=s;a-->0;)if(n[a]===t||n[a].listener&&n[a].listener===t){o=a;break}if(0>o)return this;1===n.length?(n.length=0,delete this._events[e]):n.splice(o,1),this._events.removeListener&&this.emit("removeListener",e,t)}return this},n.prototype.removeAllListeners=function(e){var t,n;if(!this._events)return this;if(!this._events.removeListener)return 0===arguments.length?this._events={}:this._events[e]&&delete this._events[e],this;if(0===arguments.length){for(t in this._events)"removeListener"!==t&&this.removeAllListeners(t);return this.removeAllListeners("removeListener"),this._events={},this}if(n=this._events[e],r(n))this.removeListener(e,n);else for(;n.length;)this.removeListener(e,n[n.length-1]);return delete this._events[e],this},n.prototype.listeners=function(e){var t;return t=this._events&&this._events[e]?r(this._events[e])?[this._events[e]]:this._events[e].slice():[]},n.listenerCount=function(e,t){var n;return n=e._events&&e._events[t]?r(e._events[t])?1:e._events[t].length:0}},{}],39:[function(e,t){function n(){}var r=t.exports={};r.nextTick=function(){var e="undefined"!=typeof window&&window.setImmediate,t="undefined"!=typeof window&&window.MutationObserver,n="undefined"!=typeof window&&window.postMessage&&window.addEventListener;if(e)return function(e){return window.setImmediate(e)};var r=[];if(t){var o=document.createElement("div"),i=new MutationObserver(function(){var e=r.slice();r.length=0,e.forEach(function(e){e()})});return i.observe(o,{attributes:!0}),function(e){r.length||o.setAttribute("yes","no"),r.push(e)}}return n?(window.addEventListener("message",function(e){var t=e.source;if((t===window||null===t)&&"process-tick"===e.data&&(e.stopPropagation(),r.length>0)){var n=r.shift();n()}},!0),function(e){r.push(e),window.postMessage("process-tick","*")}):function(e){setTimeout(e,0)}}(),r.title="browser",r.browser=!0,r.env={},r.argv=[],r.on=n,r.addListener=n,r.once=n,r.off=n,r.removeListener=n,r.removeAllListeners=n,r.emit=n,r.binding=function(){throw new Error("process.binding is not supported")},r.cwd=function(){return"/"},r.chdir=function(){throw new Error("process.chdir is not supported")}},{}],40:[function(e,t,n){function r(){return"WebkitAppearance"in document.documentElement.style||window.console&&(console.firebug||console.exception&&console.table)||navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31}function o(){var e=arguments,t=this.useColors;if(e[0]=(t?"%c":"")+this.namespace+(t?" %c":" ")+e[0]+(t?"%c ":" ")+"+"+n.humanize(this.diff),!t)return e;var r="color: "+this.color;e=[e[0],r,"color: inherit"].concat(Array.prototype.slice.call(e,1));var o=0,i=0;return e[0].replace(/%[a-z%]/g,function(e){"%"!==e&&(o++,"%c"===e&&(i=o))}),e.splice(i,0,r),e}function i(){return"object"==typeof console&&console.log&&Function.prototype.apply.call(console.log,console,arguments)}function s(e){try{null==e?u.removeItem("debug"):u.debug=e}catch(t){}}function a(){var e;try{e=u.debug}catch(t){}return e}function c(){try{return window.localStorage}catch(e){}}n=t.exports=e(41),n.log=i,n.formatArgs=o,n.save=s,n.load=a,n.useColors=r;var u;u="undefined"!=typeof chrome&&"undefined"!=typeof chrome.storage?chrome.storage.local:c(),n.colors=["lightseagreen","forestgreen","goldenrod","dodgerblue","darkorchid","crimson"],n.formatters.j=function(e){return JSON.stringify(e)},n.enable(a())},{}],41:[function(e,t,n){function r(){return n.colors[f++%n.colors.length]}function o(e){function t(){}function o(){var e=o,t=+new Date,i=t-(u||t);e.diff=i,e.prev=u,e.curr=t,u=t,null==e.useColors&&(e.useColors=n.useColors()),null==e.color&&e.useColors&&(e.color=r());var s=Array.prototype.slice.call(arguments);s[0]=n.coerce(s[0]),"string"!=typeof s[0]&&(s=["%o"].concat(s));var a=0;s[0]=s[0].replace(/%([a-z%])/g,function(t,r){if("%"===t)return t;a++;var o=n.formatters[r];if("function"==typeof o){var i=s[a];t=o.call(e,i),s.splice(a,1),a--}return t}),"function"==typeof n.formatArgs&&(s=n.formatArgs.apply(e,s));var c=o.log||n.log||console.log.bind(console);c.apply(e,s)}t.enabled=!1,o.enabled=!0;var i=n.enabled(e)?o:t;return i.namespace=e,i}function i(e){n.save(e);for(var t=(e||"").split(/[\s,]+/),r=t.length,o=0;r>o;o++)t[o]&&(e=t[o].replace(/\*/g,".*?"),"-"===e[0]?n.skips.push(new RegExp("^"+e.substr(1)+"$")):n.names.push(new RegExp("^"+e+"$")))}function s(){n.enable("")}function a(e){var t,r;for(t=0,r=n.skips.length;r>t;t++)if(n.skips[t].test(e))return!1;for(t=0,r=n.names.length;r>t;t++)if(n.names[t].test(e))return!0;return!1}function c(e){return e instanceof Error?e.stack||e.message:e}n=t.exports=o,n.coerce=c,n.disable=s,n.enable=i,n.enabled=a,n.humanize=e(42),n.names=[],n.skips=[],n.formatters={};var u,f=0},{}],42:[function(e,t){function n(e){var t=/^((?:\d+)?\.?\d+) *(ms|seconds?|s|minutes?|m|hours?|h|days?|d|years?|y)?$/i.exec(e);if(t){var n=parseFloat(t[1]),r=(t[2]||"ms").toLowerCase();switch(r){case"years":case"year":case"y":return n*f;case"days":case"day":case"d":return n*u;case"hours":case"hour":case"h":return n*c;case"minutes":case"minute":case"m":return n*a;case"seconds":case"second":case"s":return n*s;case"ms":return n}}}function r(e){return e>=u?Math.round(e/u)+"d":e>=c?Math.round(e/c)+"h":e>=a?Math.round(e/a)+"m":e>=s?Math.round(e/s)+"s":e+"ms"}function o(e){return i(e,u,"day")||i(e,c,"hour")||i(e,a,"minute")||i(e,s,"second")||e+" ms"}function i(e,t,n){return t>e?void 0:1.5*t>e?Math.floor(e/t)+" "+n:Math.ceil(e/t)+" "+n+"s"}var s=1e3,a=60*s,c=60*a,u=24*c,f=365.25*u;t.exports=function(e,t){return t=t||{},"string"==typeof e?n(e):t["long"]?o(e):r(e)}},{}],43:[function(e,t){t.exports="function"==typeof Object.create?function(e,t){e.super_=t,e.prototype=Object.create(t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}})}:function(e,t){e.super_=t;var n=function(){};n.prototype=t.prototype,e.prototype=new n,e.prototype.constructor=e}},{}],44:[function(e,t){"use strict";function n(){}t.exports=n},{}],45:[function(e,t){"use strict";function n(e){function t(e,t){function r(e){u[t]=e,++f===n&!c&&(c=!0,a.resolve(d,u))}i(e).then(r,function(e){c||(c=!0,a.reject(d,e))})}if("[object Array]"!==Object.prototype.toString.call(e))return o(new TypeError("must be an array"));var n=e.length,c=!1;if(!n)return i([]);for(var u=new Array(n),f=0,l=-1,d=new r(s);++l<n;)t(e[l],l);return d}var r=e(48),o=e(51),i=e(52),s=e(44),a=e(46);t.exports=n},{}],46:[function(e,t,n){"use strict";function r(e){var t=e&&e.then;return e&&"object"==typeof e&&"function"==typeof t?function(){t.apply(e,arguments)}:void 0}var o=e(55),i=e(53),s=e(54);n.resolve=function(e,t){var a=o(r,t);if("error"===a.status)return n.reject(e,a.value);var c=a.value;if(c)i.safely(e,c);else{e.state=s.FULFILLED,e.outcome=t;for(var u=-1,f=e.queue.length;++u<f;)e.queue[u].callFulfilled(t)}return e},n.reject=function(e,t){e.state=s.REJECTED,e.outcome=t;for(var n=-1,r=e.queue.length;++n<r;)e.queue[n].callRejected(t);return e}},{}],47:[function(e,t,n){t.exports=n=e(48),n.resolve=e(52),n.reject=e(51),n.all=e(45),n.race=e(50)},{}],48:[function(e,t){"use strict";function n(e){if(!(this instanceof n))return new n(e);if("function"!=typeof e)throw new TypeError("resolver must be a function");this.state=s.PENDING,this.queue=[],this.outcome=void 0,e!==o&&i.safely(this,e)}var r=e(56),o=e(44),i=e(53),s=e(54),a=e(49);t.exports=n,n.prototype["catch"]=function(e){return this.then(null,e)},n.prototype.then=function(e,t){if("function"!=typeof e&&this.state===s.FULFILLED||"function"!=typeof t&&this.state===s.REJECTED)return this;var i=new n(o);if(this.state!==s.PENDING){var c=this.state===s.FULFILLED?e:t;r(i,c,this.outcome)}else this.queue.push(new a(i,e,t));return i}},{}],49:[function(e,t){"use strict";function n(e,t,n){this.promise=e,"function"==typeof t&&(this.onFulfilled=t,this.callFulfilled=this.otherCallFulfilled),"function"==typeof n&&(this.onRejected=n,this.callRejected=this.otherCallRejected)}var r=e(46),o=e(56);t.exports=n,n.prototype.callFulfilled=function(e){r.resolve(this.promise,e)},n.prototype.otherCallFulfilled=function(e){o(this.promise,this.onFulfilled,e)},n.prototype.callRejected=function(e){r.reject(this.promise,e)},n.prototype.otherCallRejected=function(e){o(this.promise,this.onRejected,e)}},{}],50:[function(e,t){"use strict";function n(e){function t(e){i(e).then(function(e){c||(c=!0,a.resolve(f,e))},function(e){c||(c=!0,a.reject(f,e))})}if("[object Array]"!==Object.prototype.toString.call(e))return o(new TypeError("must be an array"));var n=e.length,c=!1;if(!n)return i([]);for(var u=-1,f=new r(s);++u<n;)t(e[u]);return f}var r=e(48),o=e(51),i=e(52),s=e(44),a=e(46);t.exports=n},{}],51:[function(e,t){"use strict";function n(e){var t=new r(o);return i.reject(t,e)}var r=e(48),o=e(44),i=e(46);t.exports=n},{}],52:[function(e,t){"use strict";function n(e){if(e)return e instanceof r?e:i.resolve(new r(o),e);var t=typeof e;switch(t){case"boolean":return s;case"undefined":return c;case"object":return a;case"number":return u;case"string":return f}}var r=e(48),o=e(44),i=e(46);t.exports=n;var s=i.resolve(new r(o),!1),a=i.resolve(new r(o),null),c=i.resolve(new r(o),void 0),u=i.resolve(new r(o),0),f=i.resolve(new r(o),"")},{}],53:[function(e,t,n){"use strict";function r(e,t){function n(t){a||(a=!0,o.reject(e,t))}function r(t){a||(a=!0,o.resolve(e,t))}function s(){t(r,n)}var a=!1,c=i(s);"error"===c.status&&n(c.value)}var o=e(46),i=e(55);n.safely=r},{}],54:[function(e,t,n){n.REJECTED=["REJECTED"],n.FULFILLED=["FULFILLED"],n.PENDING=["PENDING"]},{}],55:[function(e,t){"use strict";function n(e,t){var n={};try{n.value=e(t),n.status="success"}catch(r){n.status="error",n.value=r}return n}t.exports=n},{}],56:[function(e,t){"use strict";function n(e,t,n){r(function(){var r;try{r=t(n)}catch(i){return o.reject(e,i)}r===e?o.reject(e,new TypeError("Cannot resolve promise with itself")):o.resolve(e,r)})}var r=e(57),o=e(46);t.exports=n},{}],57:[function(e,t){"use strict";function n(){o=!0;for(var e,t,n=a.length;n;){for(t=a,a=[],e=-1;++e<n;)t[e]();n=a.length}o=!1}function r(e){1!==a.push(e)||o||i()}for(var o,i,s=[e(37),e(59),e(58),e(60),e(61)],a=[],c=-1,u=s.length;++c<u;)if(s[c]&&s[c].test&&s[c].test()){i=s[c].install(n);break}t.exports=r},{}],58:[function(e,t,n){(function(e){"use strict";n.test=function(){return e.setImmediate?!1:"undefined"!=typeof e.MessageChannel},n.install=function(t){var n=new e.MessageChannel;return n.port1.onmessage=t,function(){n.port2.postMessage(0)}}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],59:[function(e,t,n){(function(e){"use strict";var t=e.MutationObserver||e.WebKitMutationObserver;n.test=function(){return t},n.install=function(n){var r=0,o=new t(n),i=e.document.createTextNode("");return o.observe(i,{characterData:!0}),function(){i.data=r=++r%2}}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],60:[function(e,t,n){(function(e){"use strict";n.test=function(){return"document"in e&&"onreadystatechange"in e.document.createElement("script")},n.install=function(t){return function(){var n=e.document.createElement("script");return n.onreadystatechange=function(){t(),n.onreadystatechange=null,n.parentNode.removeChild(n),n=null},e.document.documentElement.appendChild(n),t}}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],61:[function(e,t,n){"use strict";n.test=function(){return!0},n.install=function(e){return function(){setTimeout(e,0)}}},{}],62:[function(e,t,n){"use strict";function r(e){if(null!==e)switch(typeof e){case"boolean":return e?1:0;case"number":return f(e);case"string":return e.replace(/\u0002/g,"").replace(/\u0001/g,"").replace(/\u0000/g,"");case"object":var t=Array.isArray(e),r=t?e:Object.keys(e),o=-1,i=r.length,s="";if(t)for(;++o<i;)s+=n.toIndexableString(r[o]);else for(;++o<i;){var a=r[o];s+=n.toIndexableString(a)+n.toIndexableString(e[a])}return s}return""}function o(e,t){var n,r=t,o="1"===e[t];if(o)n=0,t++;else{var i="0"===e[t];t++;var s="",a=e.substring(t,t+d),c=parseInt(a,10)+l;for(i&&(c=-c),t+=d;;){var u=e[t];if("\x00"===u)break;s+=u,t++}s=s.split("."),n=1===s.length?parseInt(s,10):parseFloat(s[0]+"."+s[1]),i&&(n-=10),0!==c&&(n=parseFloat(n+"e"+c))}return{num:n,length:t-r}}function i(e,t){var n=e.pop();if(t.length){var r=t[t.length-1];n===r.element&&(t.pop(),r=t[t.length-1]);var o=r.element,i=r.index;if(Array.isArray(o))o.push(n);else if(i===e.length-2){var s=e.pop();o[s]=n}else e.push(n)}}function s(e,t){for(var r=Math.min(e.length,t.length),o=0;r>o;o++){var i=n.collate(e[o],t[o]);if(0!==i)return i}return e.length===t.length?0:e.length>t.length?1:-1}function a(e,t){return e===t?0:e>t?1:-1}function c(e,t){for(var r=Object.keys(e),o=Object.keys(t),i=Math.min(r.length,o.length),s=0;i>s;s++){var a=n.collate(r[s],o[s]);if(0!==a)return a;if(a=n.collate(e[r[s]],t[o[s]]),0!==a)return a}return r.length===o.length?0:r.length>o.length?1:-1}function u(e){var t=["boolean","number","string","object"],n=t.indexOf(typeof e);return~n?null===e?1:Array.isArray(e)?5:3>n?n+2:n+3:Array.isArray(e)?5:void 0}function f(e){if(0===e)return"1";var t=e.toExponential().split(/e\+?/),n=parseInt(t[1],10),r=0>e,o=r?"0":"2",i=(r?-n:n)-l,s=h.padLeft(i.toString(),"0",d);o+=p+s;var a=Math.abs(parseFloat(t[0]));r&&(a=10-a);var c=a.toFixed(20);return c=c.replace(/\.?0+$/,""),o+=p+c}var l=-324,d=3,p="",h=e(63);n.collate=function(e,t){if(e===t)return 0;e=n.normalizeKey(e),t=n.normalizeKey(t);var r=u(e),o=u(t);if(r-o!==0)return r-o;if(null===e)return 0;switch(typeof e){case"number":return e-t;case"boolean":return e===t?0:t>e?-1:1;case"string":return a(e,t)}return Array.isArray(e)?s(e,t):c(e,t)},n.normalizeKey=function(e){switch(typeof e){case"undefined":return null;case"number":return 1/0===e||e===-1/0||isNaN(e)?null:e;case"object":var t=e;if(Array.isArray(e)){var r=e.length;e=new Array(r);for(var o=0;r>o;o++)e[o]=n.normalizeKey(t[o])}else{if(e instanceof Date)return e.toJSON();if(null!==e){e={};for(var i in t)if(t.hasOwnProperty(i)){var s=t[i];"undefined"!=typeof s&&(e[i]=n.normalizeKey(s))}}}}return e},n.toIndexableString=function(e){var t="\x00";return e=n.normalizeKey(e),u(e)+p+r(e)+t},n.parseIndexableString=function(e){for(var t=[],n=[],r=0;;){var s=e[r++];if("\x00"!==s)switch(s){case"1":t.push(null);break;case"2":t.push("1"===e[r]),r++;break;case"3":var a=o(e,r);t.push(a.num),r+=a.length;break;case"4":for(var c="";;){var u=e[r];if("\x00"===u)break;c+=u,r++}c=c.replace(/\u0001\u0001/g,"\x00").replace(/\u0001\u0002/g,"").replace(/\u0002\u0002/g,""),t.push(c);break;case"5":var f={element:[],index:t.length};t.push(f.element),n.push(f);break;case"6":var l={element:{},index:t.length};t.push(l.element),n.push(l);break;default:throw new Error("bad collationIndex or unexpectedly reached end of input: "+s)}else{if(1===t.length)return t.pop();i(t,n)}}}},{}],63:[function(e,t,n){"use strict";function r(e,t,n){for(var r="",o=n-e.length;r.length<o;)r+=t;return r}n.padLeft=function(e,t,n){var o=r(e,t,n);return o+e},n.padRight=function(e,t,n){var o=r(e,t,n);return e+o},n.stringLexCompare=function(e,t){var n,r=e.length,o=t.length;for(n=0;r>n;n++){if(n===o)return 1;var i=e.charAt(n),s=t.charAt(n);if(i!==s)return s>i?-1:1}return o>r?-1:0},n.intToDecimalForm=function(e){var t=0>e,n="";do{var r=t?-Math.ceil(e%10):Math.floor(e%10);n=r+n,e=t?Math.ceil(e/10):Math.floor(e/10)}while(e);return t&&"0"!==n&&(n="-"+n),n}},{}],64:[function(e,t,n){"use strict";function r(){this.store={}}function o(e){if(this.store=new r,e&&Array.isArray(e))for(var t=0,n=e.length;n>t;t++)this.add(e[t])}n.Map=r,n.Set=o,r.prototype.mangle=function(e){if("string"!=typeof e)throw new TypeError("key must be a string but Got "+e);return"$"+e},r.prototype.unmangle=function(e){return e.substring(1)},r.prototype.get=function(e){var t=this.mangle(e);return t in this.store?this.store[t]:void 0},r.prototype.set=function(e,t){var n=this.mangle(e);return this.store[n]=t,!0},r.prototype.has=function(e){var t=this.mangle(e);return t in this.store},r.prototype["delete"]=function(e){var t=this.mangle(e);return t in this.store?(delete this.store[t],!0):!1},r.prototype.forEach=function(e){var t=this,n=Object.keys(t.store);n.forEach(function(n){var r=t.store[n];n=t.unmangle(n),e(r,n)})},o.prototype.add=function(e){return this.store.set(e,!0)},o.prototype.has=function(e){return this.store.has(e)},o.prototype["delete"]=function(e){return this.store["delete"](e)}},{}],65:[function(e,t){"use strict";function n(e){return null===e?String(e):"object"==typeof e||"function"==typeof e?c[d.call(e)]||"object":typeof e}function r(e){return null!==e&&e===e.window}function o(e){if(!e||"object"!==n(e)||e.nodeType||r(e))return!1;try{if(e.constructor&&!p.call(e,"constructor")&&!p.call(e.constructor.prototype,"isPrototypeOf"))return!1}catch(t){return!1}var o;for(o in e);return void 0===o||p.call(e,o)}function i(e){return"function"===n(e)}function s(){for(var e=[],t=-1,n=arguments.length,r=new Array(n);++t<n;)r[t]=arguments[t];var o={};e.push({args:r,result:{container:o,key:"key"}});for(var i;i=e.pop();)a(e,i.args,i.result);return o.key}function a(e,t,n){var r,s,a,c,u,f,l,d=t[0]||{},p=1,v=t.length,_=!1,m=/\d+/;for("boolean"==typeof d&&(_=d,d=t[1]||{},p=2),"object"==typeof d||i(d)||(d={}),v===p&&(d=this,--p);v>p;p++)if(null!=(r=t[p])){l=h(r);for(s in r)if(!(s in Object.prototype)){if(l&&!m.test(s))continue;if(a=d[s],c=r[s],d===c)continue;_&&c&&(o(c)||(u=h(c)))?(u?(u=!1,f=a&&h(a)?a:[]):f=a&&o(a)?a:{},e.push({args:[_,f,c],result:{container:d,key:s}})):void 0!==c&&(h(r)&&i(c)||(d[s]=c))}}n.container[n.key]=d}for(var c={},u=["Boolean","Number","String","Function","Array","Date","RegExp","Object","Error"],f=0;f<u.length;f++){var l=u[f];c["[object "+l+"]"]=l.toLowerCase()}var d=c.toString,p=c.hasOwnProperty,h=Array.isArray||function(e){return"array"===n(e)};t.exports=s},{}],66:[function(e,t){"use strict";var n=e(70),r=e(71),o=r.Promise;t.exports=function(e){var t=e.db,i=e.viewName,s=e.map,a=e.reduce,c=e.temporary,u=s.toString()+(a&&a.toString())+"undefined";if(!c&&t._cachedViews){var f=t._cachedViews[u];if(f)return o.resolve(f)}return t.info().then(function(e){function o(e){e.views=e.views||{};var t=i;-1===t.indexOf("/")&&(t=i+"/"+i);var n=e.views[t]=e.views[t]||{};if(!n[f])return n[f]=!0,e}var f=e.db_name+"-mrview-"+(c?"temp":r.MD5(u));return n(t,"_local/mrviews",o).then(function(){return t.registerDependentDatabase(f).then(function(e){var n=e.db;n.auto_compaction=!0;var r={name:f,db:n,sourceDB:t,adapter:t.adapter,mapFun:s,reduceFun:a};return r.db.get("_local/lastSeq")["catch"](function(e){if(404!==e.status)throw e}).then(function(e){return r.seq=e?e.seq:0,c||(t._cachedViews=t._cachedViews||{},t._cachedViews[u]=r,r.db.on("destroyed",function(){delete t._cachedViews[u]})),r})})})})}},{}],67:[function(_dereq_,module,exports){"use strict";module.exports=function(func,emit,sum,log,isArray,toJSON){return eval("'use strict'; ("+func.replace(/;\s*$/,"")+");")}},{}],68:[function(e,t,n){(function(t){"use strict";function r(e){return-1===e.indexOf("/")?[e,e]:e.split("/")}function o(e){return 1===e.length&&/^1-/.test(e[0].rev)}function i(e,t,n){try{return{output:t.apply(null,n)}}catch(r){return e.emit("error",r),{error:r}}}function s(e,t){var n=D(e.key,t.key);return 0!==n?n:D(e.value,t.value)}function a(e,t,n){return n=n||0,"number"==typeof t?e.slice(n,t+n):n>0?e.slice(n):e}function c(e){var t=e.value,n=t&&"object"==typeof t&&t._id||e.id;return n}function u(e){var t=new Error("builtin "+e+" function requires map values to be numbers or number arrays");return t.name="invalid_value",t.status=500,t}function f(e){for(var t=0,n=0,r=e.length;r>n;n++){var o=e[n];if("number"!=typeof o){if(!Array.isArray(o))throw u("_sum");t="number"==typeof t?[t]:t;for(var i=0,s=o.length;s>i;i++){var a=o[i];if("number"!=typeof a)throw u("_sum");"undefined"==typeof t[i]?t.push(a):t[i]+=a}}else"number"==typeof t?t+=o:t[0]+=o}return t}function l(e,t,n,r){var o=t[e];"undefined"!=typeof o&&(r&&(o=encodeURIComponent(JSON.stringify(o))),n.push(e+"="+o))}function d(e,t){var n=e.descending?"endkey":"startkey",r=e.descending?"startkey":"endkey";if("undefined"!=typeof e[n]&&"undefined"!=typeof e[r]&&D(e[n],e[r])>0)throw new A("No rows can match your key range, reverse your start_key and end_key or set {descending : true}");if(t.reduce&&e.reduce!==!1){if(e.include_docs)throw new A("{include_docs:true} is invalid for reduce");if(e.keys&&e.keys.length>1&&!e.group&&!e.group_level)throw new A("Multi-key fetches for reduce views must use {group: true}")}if(e.group_level){if("number"!=typeof e.group_level)throw new A('Invalid value for integer: "'+e.group_level+'"');if(e.group_level<0)throw new A('Invalid value for positive integer: "'+e.group_level+'"')}}function p(e,t,n){var o,i=[],s="GET";if(l("reduce",n,i),l("include_docs",n,i),l("attachments",n,i),l("limit",n,i),l("descending",n,i),l("group",n,i),l("group_level",n,i),l("skip",n,i),l("stale",n,i),l("conflicts",n,i),l("startkey",n,i,!0),l("endkey",n,i,!0),l("inclusive_end",n,i),l("key",n,i,!0),i=i.join("&"),i=""===i?"":"?"+i,"undefined"!=typeof n.keys){var a=2e3,c="keys="+encodeURIComponent(JSON.stringify(n.keys));c.length+i.length+1<=a?i+=("?"===i[0]?"&":"?")+c:(s="POST","string"==typeof t?o=JSON.stringify({keys:n.keys}):t.keys=n.keys)}if("string"==typeof t){var u=r(t);return e.request({method:s,url:"_design/"+u[0]+"/_view/"+u[1]+i,body:o})}return o=o||{},Object.keys(t).forEach(function(e){o[e]=Array.isArray(t[e])?t[e]:t[e].toString()}),e.request({method:"POST",url:"_temp_view"+i,body:o})}function h(e){return function(t){if(404===t.status)return e;throw t}}function v(e,t,n){function r(){return o(l)?B.resolve(c):t.db.get(a)["catch"](h(c))}function i(e){return e.keys.length?t.db.allDocs({keys:e.keys,include_docs:!0}):B.resolve({rows:[]})}function s(e,t){for(var n=[],r={},o=0,i=t.rows.length;i>o;o++){var s=t.rows[o],a=s.doc;if(a&&(n.push(a),r[a._id]=!0,a._deleted=!f[a._id],!a._deleted)){var c=f[a._id];"value"in c&&(a.value=c.value)}}var u=Object.keys(f);return u.forEach(function(e){if(!r[e]){var t={_id:e},o=f[e];"value"in o&&(t.value=o.value),n.push(t)}}),e.keys=j.uniq(u.concat(e.keys)),n.push(e),n}var a="_local/doc_"+e,c={_id:a,keys:[]},u=n[e],f=u.indexableKeysToKeyValues,l=u.changes;return r().then(function(e){return i(e).then(function(t){return s(e,t)})})}function _(e,t,n){var r="_local/lastSeq";return e.db.get(r)["catch"](h({_id:r,seq:0})).then(function(r){var o=Object.keys(t);return B.all(o.map(function(n){return v(n,e,t)})).then(function(t){var o=j.flatten(t);
return r.seq=n,o.push(r),e.db.bulkDocs({docs:o})})})}function m(e){var t="string"==typeof e?e:e.name,n=F[t];return n||(n=F[t]=new R),n}function g(e){return j.sequentialize(m(e),function(){return y(e)})()}function y(e){function t(e,t){var n={id:o._id,key:L(e)};"undefined"!=typeof t&&null!==t&&(n.value=L(t)),r.push(n)}function n(t,n){return function(){return _(e,t,n)}}var r,o,a;if("function"==typeof e.mapFun&&2===e.mapFun.length){var c=e.mapFun;a=function(e){return c(e,t)}}else a=N(e.mapFun.toString(),t,f,k,Array.isArray,JSON.parse);var u=e.seq||0,l=new R;return new B(function(t,c){function f(){l.finish().then(function(){e.seq=u,t()})}function d(){function t(e){c(e)}e.sourceDB.changes({conflicts:!0,include_docs:!0,style:"all_docs",since:u,limit:P}).on("complete",function(t){var c=t.results;if(!c.length)return f();for(var p={},h=0,v=c.length;v>h;h++){var _=c[h];if("_"!==_.doc._id[0]){r=[],o=_.doc,o._deleted||i(e.sourceDB,a,[o]),r.sort(s);for(var m,g={},y=0,b=r.length;b>y;y++){var E=r[y],w=[E.key,E.id];E.key===m&&w.push(y);var S=C(w);g[S]=E,m=E.key}p[_.doc._id]={indexableKeysToKeyValues:g,changes:_.changes}}u=_.seq}return l.add(n(p,u)),c.length<P?f():d()}).on("error",t)}d()})}function b(e,t,n){0===n.group_level&&delete n.group_level;var r,o=n.group||n.group_level;r=U[e.reduceFun]?U[e.reduceFun]:N(e.reduceFun.toString(),null,f,k,Array.isArray,JSON.parse);var s=[],c=n.group_level;t.forEach(function(e){var t=s[s.length-1],n=o?e.key:null;return o&&Array.isArray(n)&&"number"==typeof c&&(n=n.length>c?n.slice(0,c):n),t&&0===D(t.key[0][0],n)?(t.key.push([n,e.id]),void t.value.push(e.value)):void s.push({key:[[n,e.id]],value:[e.value]})});for(var u=0,l=s.length;l>u;u++){var d=s[u],p=i(e.sourceDB,r,[d.key,d.value,!1]);d.value=p.error?null:p.output,d.key=d.key[0][0]}return{rows:a(s,n.limit,n.skip)}}function E(e,t){return j.sequentialize(m(e),function(){return w(e,t)})()}function w(e,t){function n(t){return t.include_docs=!0,e.db.allDocs(t).then(function(e){return o=e.total_rows,e.rows.map(function(e){if("value"in e.doc&&"object"==typeof e.doc.value&&null!==e.doc.value){var t=Object.keys(e.doc.value).sort(),n=["id","key","value"];if(!(n>t||t>n))return e.doc.value}var r=q.parseIndexableString(e.doc._id);return{key:r[0],id:r[1],value:"value"in e.doc?e.doc.value:null}})})}function r(n){var r;if(r=i?b(e,n,t):{total_rows:o,offset:s,rows:n},t.include_docs){var a=j.uniq(n.map(c));return e.sourceDB.allDocs({keys:a,include_docs:!0,conflicts:t.conflicts,attachments:t.attachments}).then(function(e){var t={};return e.rows.forEach(function(e){e.doc&&(t["$"+e.id]=e.doc)}),n.forEach(function(e){var n=c(e),r=t["$"+n];r&&(e.doc=r)}),r})}return r}var o,i=e.reduceFun&&t.reduce!==!1,s=t.skip||0;"undefined"==typeof t.keys||t.keys.length||(t.limit=0,delete t.keys);var a=function(e){return e.reduce(function(e,t){return e.concat(t)})};if("undefined"!=typeof t.keys){var u=t.keys,f=u.map(function(e){var t={startkey:C([e]),endkey:C([e,{}])};return n(t)});return B.all(f).then(a).then(r)}var l={descending:t.descending};if("undefined"!=typeof t.startkey&&(l.startkey=C(t.descending?[t.startkey,{}]:[t.startkey])),"undefined"!=typeof t.endkey){var d=t.inclusive_end!==!1;t.descending&&(d=!d),l.endkey=C(d?[t.endkey,{}]:[t.endkey])}if("undefined"!=typeof t.key){var p=C([t.key]),h=C([t.key,{}]);l.descending?(l.endkey=p,l.startkey=h):(l.startkey=p,l.endkey=h)}return i||("number"==typeof t.limit&&(l.limit=t.limit),l.skip=s),n(l).then(r)}function S(e){return e.request({method:"POST",url:"_view_cleanup"})}function T(e){return e.get("_local/mrviews").then(function(t){var n={};Object.keys(t.views).forEach(function(e){var t=r(e),o="_design/"+t[0],i=t[1];n[o]=n[o]||{},n[o][i]=!0});var o={keys:Object.keys(n),include_docs:!0};return e.allDocs(o).then(function(r){var o={};r.rows.forEach(function(e){var r=e.key.substring(8);Object.keys(n[e.key]).forEach(function(n){var i=r+"/"+n;t.views[i]||(i=n);var s=Object.keys(t.views[i]),a=e.doc&&e.doc.views&&e.doc.views[n];s.forEach(function(e){o[e]=o[e]||a})})});var i=Object.keys(o).filter(function(e){return!o[e]}),s=i.map(function(t){return j.sequentialize(m(t),function(){return e.constructor.destroy(t,e.__opts)})()});return B.all(s).then(function(){return{ok:!0}})})},h({ok:!0}))}function x(e,n,o){if("http"===e.type())return p(e,n,o);if("string"!=typeof n){d(o,n);var i={db:e,viewName:"temp_view/temp_view",map:n.map,reduce:n.reduce,temporary:!0};return M.add(function(){return I(i).then(function(e){function t(){return e.db.destroy()}return j.fin(g(e).then(function(){return E(e,o)}),t)})}),M.finish()}var s=n,a=r(s),c=a[0],u=a[1];return e.get("_design/"+c).then(function(n){var r=n.views&&n.views[u];if(!r||"string"!=typeof r.map)throw new O("ddoc "+c+" has no view named "+u);d(o,r);var i={db:e,viewName:s,map:r.map,reduce:r.reduce};return I(i).then(function(e){return"ok"===o.stale||"update_after"===o.stale?("update_after"===o.stale&&t.nextTick(function(){g(e)}),E(e,o)):g(e).then(function(){return E(e,o)})})})}function A(e){this.status=400,this.name="query_parse_error",this.message=e,this.error=!0;try{Error.captureStackTrace(this,A)}catch(t){}}function O(e){this.status=404,this.name="not_found",this.message=e,this.error=!0;try{Error.captureStackTrace(this,O)}catch(t){}}var k,q=e(62),R=e(69),D=q.collate,C=q.toIndexableString,L=q.normalizeKey,I=e(66),N=e(67);k="undefined"!=typeof console&&"function"==typeof console.log?Function.prototype.bind.call(console.log,console):function(){};var j=e(71),B=j.Promise,F={},M=new R,P=50,U={_sum:function(e,t){return f(t)},_count:function(e,t){return t.length},_stats:function(e,t){function n(e){for(var t=0,n=0,r=e.length;r>n;n++){var o=e[n];t+=o*o}return t}return{sum:f(t),min:Math.min.apply(null,t),max:Math.max.apply(null,t),count:t.length,sumsqr:n(t)}}};n.viewCleanup=j.callbackify(function(){var e=this;return"http"===e.type()?S(e):T(e)}),n.query=function(e,t,n){"function"==typeof t&&(n=t,t={}),t=j.extend(!0,{},t),"function"==typeof e&&(e={map:e});var r=this,o=B.resolve().then(function(){return x(r,e,t)});return j.promisedCallback(o,n),o},j.inherits(A,Error),j.inherits(O,Error)}).call(this,e(39))},{}],69:[function(e,t){"use strict";function n(){this.promise=new r(function(e){e()})}var r=e(71).Promise;n.prototype.add=function(e){return this.promise=this.promise["catch"](function(){}).then(function(){return e()}),this.promise},n.prototype.finish=function(){return this.promise},t.exports=n},{}],70:[function(e,t){"use strict";var n=e(72).upsert;t.exports=function(e,t,r){return n.apply(e,[t,r])}},{}],71:[function(e,t,n){(function(t,r){"use strict";n.Promise="function"==typeof r.Promise?r.Promise:e(47),n.inherits=e(43),n.extend=e(65);var o=e(36);n.promisedCallback=function(e,n){return n&&e.then(function(e){t.nextTick(function(){n(null,e)})},function(e){t.nextTick(function(){n(e)})}),e},n.callbackify=function(e){return o(function(t){var r=t.pop(),o=e.apply(this,t);return"function"==typeof r&&n.promisedCallback(o,r),o})},n.fin=function(e,t){return e.then(function(e){var n=t();return"function"==typeof n.then?n.then(function(){return e}):e},function(e){var n=t();if("function"==typeof n.then)return n.then(function(){throw e});throw e})},n.sequentialize=function(e,t){return function(){var n=arguments,r=this;return e.add(function(){return t.apply(r,n)})}},n.flatten=function(e){for(var t=[],n=0,r=e.length;r>n;n++)t=t.concat(e[n]);return t},n.uniq=function(e){for(var t={},n=0,r=e.length;r>n;n++)t["$"+e[n]]=!0;var o=Object.keys(t),i=new Array(o.length);for(n=0,r=o.length;r>n;n++)i[n]=o[n].substring(1);return i};var i=e(37),s=e(73);n.MD5=function(e){return t.browser?s.hash(e):i.createHash("md5").update(e).digest("hex")}}).call(this,e(39),"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],72:[function(e,t,n){(function(t){"use strict";function r(e,t,n){return new i(function(r,i){return"string"!=typeof t?i(new Error("doc id is required")):void e.get(t,function(s,a){if(s){if(404!==s.status)return i(s);a={}}var c=n(a);return c?(c._id=t,c._rev=a._rev,void r(o(e,c,n))):r({updated:!1,rev:a._rev})})})}function o(e,t,n){return e.put(t).then(function(e){return{updated:!0,rev:e.rev}},function(o){if(409!==o.status)throw o;return r(e,t._id,n)})}var i;i="undefined"!=typeof window&&window.PouchDB?window.PouchDB.utils.Promise:"function"==typeof t.Promise?t.Promise:e(47),n.upsert=function(e,t,n){var o=this,i=r(o,e,t);return"function"!=typeof n?i:void i.then(function(e){n(null,e)},n)},n.putIfNotExists=function(e,t,n){var o=this;"string"!=typeof e&&(n=t,t=e,e=t._id);var i=function(e){return e._rev?!1:t},s=r(o,e,i);return"function"!=typeof n?s:void s.then(function(e){n(null,e)},n)},"undefined"!=typeof window&&window.PouchDB&&window.PouchDB.plugin(n)}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],73:[function(e,t,n){!function(e){if("object"==typeof n)t.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var r;try{r=window}catch(o){r=self}r.SparkMD5=e()}}(function(){"use strict";var e=function(e,t){return e+t&4294967295},t=function(t,n,r,o,i,s){return n=e(e(n,t),e(o,s)),e(n<<i|n>>>32-i,r)},n=function(e,n,r,o,i,s,a){return t(n&r|~n&o,e,n,i,s,a)},r=function(e,n,r,o,i,s,a){return t(n&o|r&~o,e,n,i,s,a)},o=function(e,n,r,o,i,s,a){return t(n^r^o,e,n,i,s,a)},i=function(e,n,r,o,i,s,a){return t(r^(n|~o),e,n,i,s,a)},s=function(t,s){var a=t[0],c=t[1],u=t[2],f=t[3];a=n(a,c,u,f,s[0],7,-680876936),f=n(f,a,c,u,s[1],12,-389564586),u=n(u,f,a,c,s[2],17,606105819),c=n(c,u,f,a,s[3],22,-1044525330),a=n(a,c,u,f,s[4],7,-176418897),f=n(f,a,c,u,s[5],12,1200080426),u=n(u,f,a,c,s[6],17,-1473231341),c=n(c,u,f,a,s[7],22,-45705983),a=n(a,c,u,f,s[8],7,1770035416),f=n(f,a,c,u,s[9],12,-1958414417),u=n(u,f,a,c,s[10],17,-42063),c=n(c,u,f,a,s[11],22,-1990404162),a=n(a,c,u,f,s[12],7,1804603682),f=n(f,a,c,u,s[13],12,-40341101),u=n(u,f,a,c,s[14],17,-1502002290),c=n(c,u,f,a,s[15],22,1236535329),a=r(a,c,u,f,s[1],5,-165796510),f=r(f,a,c,u,s[6],9,-1069501632),u=r(u,f,a,c,s[11],14,643717713),c=r(c,u,f,a,s[0],20,-373897302),a=r(a,c,u,f,s[5],5,-701558691),f=r(f,a,c,u,s[10],9,38016083),u=r(u,f,a,c,s[15],14,-660478335),c=r(c,u,f,a,s[4],20,-405537848),a=r(a,c,u,f,s[9],5,568446438),f=r(f,a,c,u,s[14],9,-1019803690),u=r(u,f,a,c,s[3],14,-187363961),c=r(c,u,f,a,s[8],20,1163531501),a=r(a,c,u,f,s[13],5,-1444681467),f=r(f,a,c,u,s[2],9,-51403784),u=r(u,f,a,c,s[7],14,1735328473),c=r(c,u,f,a,s[12],20,-1926607734),a=o(a,c,u,f,s[5],4,-378558),f=o(f,a,c,u,s[8],11,-2022574463),u=o(u,f,a,c,s[11],16,1839030562),c=o(c,u,f,a,s[14],23,-35309556),a=o(a,c,u,f,s[1],4,-1530992060),f=o(f,a,c,u,s[4],11,1272893353),u=o(u,f,a,c,s[7],16,-155497632),c=o(c,u,f,a,s[10],23,-1094730640),a=o(a,c,u,f,s[13],4,681279174),f=o(f,a,c,u,s[0],11,-358537222),u=o(u,f,a,c,s[3],16,-722521979),c=o(c,u,f,a,s[6],23,76029189),a=o(a,c,u,f,s[9],4,-640364487),f=o(f,a,c,u,s[12],11,-421815835),u=o(u,f,a,c,s[15],16,530742520),c=o(c,u,f,a,s[2],23,-995338651),a=i(a,c,u,f,s[0],6,-198630844),f=i(f,a,c,u,s[7],10,1126891415),u=i(u,f,a,c,s[14],15,-1416354905),c=i(c,u,f,a,s[5],21,-57434055),a=i(a,c,u,f,s[12],6,1700485571),f=i(f,a,c,u,s[3],10,-1894986606),u=i(u,f,a,c,s[10],15,-1051523),c=i(c,u,f,a,s[1],21,-2054922799),a=i(a,c,u,f,s[8],6,1873313359),f=i(f,a,c,u,s[15],10,-30611744),u=i(u,f,a,c,s[6],15,-1560198380),c=i(c,u,f,a,s[13],21,1309151649),a=i(a,c,u,f,s[4],6,-145523070),f=i(f,a,c,u,s[11],10,-1120210379),u=i(u,f,a,c,s[2],15,718787259),c=i(c,u,f,a,s[9],21,-343485551),t[0]=e(a,t[0]),t[1]=e(c,t[1]),t[2]=e(u,t[2]),t[3]=e(f,t[3])},a=function(e){var t,n=[];for(t=0;64>t;t+=4)n[t>>2]=e.charCodeAt(t)+(e.charCodeAt(t+1)<<8)+(e.charCodeAt(t+2)<<16)+(e.charCodeAt(t+3)<<24);return n},c=function(e){var t,n=[];for(t=0;64>t;t+=4)n[t>>2]=e[t]+(e[t+1]<<8)+(e[t+2]<<16)+(e[t+3]<<24);return n},u=function(e){var t,n,r,o,i,c,u=e.length,f=[1732584193,-271733879,-1732584194,271733878];for(t=64;u>=t;t+=64)s(f,a(e.substring(t-64,t)));for(e=e.substring(t-64),n=e.length,r=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],t=0;n>t;t+=1)r[t>>2]|=e.charCodeAt(t)<<(t%4<<3);if(r[t>>2]|=128<<(t%4<<3),t>55)for(s(f,r),t=0;16>t;t+=1)r[t]=0;return o=8*u,o=o.toString(16).match(/(.*?)(.{0,8})$/),i=parseInt(o[2],16),c=parseInt(o[1],16)||0,r[14]=i,r[15]=c,s(f,r),f},f=function(e){var t,n,r,o,i,a,u=e.length,f=[1732584193,-271733879,-1732584194,271733878];for(t=64;u>=t;t+=64)s(f,c(e.subarray(t-64,t)));for(e=u>t-64?e.subarray(t-64):new Uint8Array(0),n=e.length,r=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],t=0;n>t;t+=1)r[t>>2]|=e[t]<<(t%4<<3);if(r[t>>2]|=128<<(t%4<<3),t>55)for(s(f,r),t=0;16>t;t+=1)r[t]=0;return o=8*u,o=o.toString(16).match(/(.*?)(.{0,8})$/),i=parseInt(o[2],16),a=parseInt(o[1],16)||0,r[14]=i,r[15]=a,s(f,r),f},l=["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"],d=function(e){var t,n="";for(t=0;4>t;t+=1)n+=l[e>>8*t+4&15]+l[e>>8*t&15];return n},p=function(e){var t;for(t=0;t<e.length;t+=1)e[t]=d(e[t]);return e.join("")},h=function(e){return p(u(e))},v=function(){this.reset()};return"5d41402abc4b2a76b9719d911017c592"!==h("hello")&&(e=function(e,t){var n=(65535&e)+(65535&t),r=(e>>16)+(t>>16)+(n>>16);return r<<16|65535&n}),v.prototype.append=function(e){return/[\u0080-\uFFFF]/.test(e)&&(e=unescape(encodeURIComponent(e))),this.appendBinary(e),this},v.prototype.appendBinary=function(e){this._buff+=e,this._length+=e.length;var t,n=this._buff.length;for(t=64;n>=t;t+=64)s(this._state,a(this._buff.substring(t-64,t)));return this._buff=this._buff.substr(t-64),this},v.prototype.end=function(e){var t,n,r=this._buff,o=r.length,i=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];for(t=0;o>t;t+=1)i[t>>2]|=r.charCodeAt(t)<<(t%4<<3);return this._finish(i,o),n=e?this._state:p(this._state),this.reset(),n},v.prototype._finish=function(e,t){var n,r,o,i=t;if(e[i>>2]|=128<<(i%4<<3),i>55)for(s(this._state,e),i=0;16>i;i+=1)e[i]=0;n=8*this._length,n=n.toString(16).match(/(.*?)(.{0,8})$/),r=parseInt(n[2],16),o=parseInt(n[1],16)||0,e[14]=r,e[15]=o,s(this._state,e)},v.prototype.reset=function(){return this._buff="",this._length=0,this._state=[1732584193,-271733879,-1732584194,271733878],this},v.prototype.destroy=function(){delete this._state,delete this._buff,delete this._length},v.hash=function(e,t){/[\u0080-\uFFFF]/.test(e)&&(e=unescape(encodeURIComponent(e)));var n=u(e);return t?n:p(n)},v.hashBinary=function(e,t){var n=u(e);return t?n:p(n)},v.ArrayBuffer=function(){this.reset()},v.ArrayBuffer.prototype.append=function(e){var t,n=this._concatArrayBuffer(this._buff,e),r=n.length;for(this._length+=e.byteLength,t=64;r>=t;t+=64)s(this._state,c(n.subarray(t-64,t)));return this._buff=r>t-64?n.subarray(t-64):new Uint8Array(0),this},v.ArrayBuffer.prototype.end=function(e){var t,n,r=this._buff,o=r.length,i=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];for(t=0;o>t;t+=1)i[t>>2]|=r[t]<<(t%4<<3);return this._finish(i,o),n=e?this._state:p(this._state),this.reset(),n},v.ArrayBuffer.prototype._finish=v.prototype._finish,v.ArrayBuffer.prototype.reset=function(){return this._buff=new Uint8Array(0),this._length=0,this._state=[1732584193,-271733879,-1732584194,271733878],this},v.ArrayBuffer.prototype.destroy=v.prototype.destroy,v.ArrayBuffer.prototype._concatArrayBuffer=function(e,t){var n=e.length,r=new Uint8Array(n+t.byteLength);return r.set(e),r.set(new Uint8Array(t),n),r},v.ArrayBuffer.hash=function(e,t){var n=f(new Uint8Array(e));return t?n:p(n)},v})},{}],74:[function(e,t,n){"use strict";function r(e,t,n){var r=n[n.length-1];e===r.element&&(n.pop(),r=n[n.length-1]);var o=r.element,i=r.index;if(Array.isArray(o))o.push(e);else if(i===t.length-2){var s=t.pop();o[s]=e}else t.push(e)}n.stringify=function(e){var t=[];t.push({obj:e});for(var n,r,o,i,s,a,c,u,f,l,d,p="";n=t.pop();)if(r=n.obj,o=n.prefix||"",i=n.val||"",p+=o,i)p+=i;else if("object"!=typeof r)p+="undefined"==typeof r?null:JSON.stringify(r);else if(null===r)p+="null";else if(Array.isArray(r)){for(t.push({val:"]"}),s=r.length-1;s>=0;s--)a=0===s?"":",",t.push({obj:r[s],prefix:a});t.push({val:"["})}else{c=[];for(u in r)r.hasOwnProperty(u)&&c.push(u);for(t.push({val:"}"}),s=c.length-1;s>=0;s--)f=c[s],l=r[f],d=s>0?",":"",d+=JSON.stringify(f)+":",t.push({obj:l,prefix:d});t.push({val:"{"})}return p},n.parse=function(e){for(var t,n,o,i,s,a,c,u,f,l=[],d=[],p=0;;)if(t=e[p++],"}"!==t&&"]"!==t&&"undefined"!=typeof t)switch(t){case" ":case"	":case"\n":case":":case",":break;case"n":p+=3,r(null,l,d);break;case"t":p+=3,r(!0,l,d);break;case"f":p+=4,r(!1,l,d);break;case"0":case"1":case"2":case"3":case"4":case"5":case"6":case"7":case"8":case"9":case"-":for(n="",p--;;){if(o=e[p++],!/[\d\.\-e\+]/.test(o)){p--;break}n+=o}r(parseFloat(n),l,d);break;case'"':for(i="",s=void 0,a=0;;){if(c=e[p++],'"'===c&&("\\"!==s||a%2!==1))break;i+=c,s=c,"\\"===s?a++:a=0}r(JSON.parse('"'+i+'"'),l,d);break;case"[":u={element:[],index:l.length},l.push(u.element),d.push(u);break;case"{":f={element:{},index:l.length},l.push(f.element),d.push(f);break;default:throw new Error("unexpectedly reached end of input: "+t)}else{if(1===l.length)return l.pop();r(l.pop(),l,d)}}},{}],75:[function(e,t){(function(n){"use strict";var r=e(31);t.exports=r,r.ajax=e(16),r.utils=e(34),r.Errors=e(19),r.replicate=e(30).replicate,r.sync=e(32),r.version=e(35);var o=e(2);if(r.adapter("http",o),r.adapter("https",o),r.adapter("idb",e(7)),r.adapter("websql",e(12)),r.plugin(e(68)),!n.browser){var i=e(37);r.adapter("ldb",i),r.adapter("leveldb",i)}}).call(this,e(39))},{}]},{},[75])(75)});

// --- file[pouchdb.quick-search.js] ---

;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var global=typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};'use strict';

// Use a fork of pouchdb-mapreduce, which allows us
// deeper control over what's persisted, without needing ddocs
var mapReduce = require('pouchdb-mapreduce-no-ddocs');
Object.keys(mapReduce).forEach(function (key) {
  exports[key] = mapReduce[key];
});

var utils = require('./pouch-utils');
var lunr = require('lunr');
var uniq = require('uniq');
var Promise = utils.Promise;

var indexes = {};

var TYPE_TOKEN_COUNT = 'a';
var TYPE_DOC_INFO = 'b';

function add(left, right) {
  return left + right;
}

// get all the tokens found in the given text (non-unique)
// in the future, we might expand this to do more than just
// English. Also, this is a private Lunr API, hence why
// the Lunr version is pegged.
function getTokenStream(text, index) {
	text = text.replace(/<(?:.|\n)*?>/gm, ' ');
  return index.pipeline.run(lunr.tokenizer(text));
}

// given an object containing the field name and/or
// a deepField definition plus the doc, return the text for
// indexing
function getText(fieldBoost, doc) {
  var text;
  if (!fieldBoost.deepField) {
    text = doc[fieldBoost.field];
  } else { // "Enhance."
    text = doc;
    for (var i = 0, len = fieldBoost.deepField.length; i < len; i++) {
      text = text && text[fieldBoost.deepField[i]];
    }
  }
  if (text) {
    if (Array.isArray(text)) {
      text = text.join(' ');
    } else if (typeof text !== 'string') {
      text = text.toString();
    }
  }

  return text;
}

// map function that gets passed to map/reduce
// emits two types of key/values - one for each token
// and one for the field-len-norm
function createMapFunction(fieldBoosts, index, filter, db) {
  return function (doc, emit) {

    if (isFiltered(doc, filter, db)) {
      return;
    }

    var docInfo = [];

    for (var i = 0, len = fieldBoosts.length; i < len; i++) {
      var fieldBoost = fieldBoosts[i];

      var text = getText(fieldBoost, doc);

      var fieldLenNorm;
      if (text) {
        var terms = getTokenStream(text, index);
        for (var j = 0, jLen = terms.length; j < jLen; j++) {
			if(terms[j].length >2){
          var term = terms[j];
          // avoid emitting the value if there's only one field;
          // it takes up unnecessary space on disk
          var value = fieldBoosts.length > 1 ? i : undefined;
          emit(TYPE_TOKEN_COUNT + term, value);
	  }}
        fieldLenNorm = Math.sqrt(terms.length);
      } else { // no tokens
        fieldLenNorm = 0;
      }
      docInfo.push(fieldLenNorm);
    }

    emit(TYPE_DOC_INFO + doc._id, docInfo);
  };
}

exports.search = utils.toPromise(function (opts, callback) {
  var pouch = this;
  opts = utils.extend(true, {}, opts);
  var q = opts.query || opts.q;
  var mm = 'mm' in opts ? (parseFloat(opts.mm) / 100) : 1; // e.g. '75%'
  var fields = opts.fields;
  var highlighting = opts.highlighting;
  var includeDocs = opts.include_docs;
  var destroy = opts.destroy;
  var stale = opts.stale;
  var limit = opts.limit;
  var build = opts.build;
  var skip = opts.skip || 0;
  var language = opts.language || 'en';
  var filter = opts.filter;

  if (Array.isArray(fields)) {
    var fieldsMap = {};
    fields.forEach(function (field) {
      fieldsMap[field] = 1; // default boost
    });
    fields = fieldsMap;
  }

  var fieldBoosts = Object.keys(fields).map(function (field) {
    var deepField = field.indexOf('.') !== -1 && field.split('.');
    return {
      field: field,
      deepField: deepField,
      boost: fields[field]
    };
  });

  var index = indexes[language];
  if (!index) {
    index = indexes[language] = lunr();
    if (language !== 'en') {
      index.use(global.lunr[language]);
    }
  }

  // the index we save as a separate database is uniquely identified
  // by the fields the user want to index (boost doesn't matter)
  // plus the tokenizer

  var indexParams =  {
    language: language,
    fields: fieldBoosts.map(function (x) { return x.field; }).sort()
  };

  if (filter) {
    indexParams.filter = filter.toString();
  }

  var persistedIndexName = 'search-' + utils.MD5(JSON.stringify(indexParams));

  var mapFun = createMapFunction(fieldBoosts, index, filter, pouch);

  var queryOpts = {
    saveAs: persistedIndexName
  };
  if (destroy) {
    queryOpts.destroy = true;
    return pouch._search_query(mapFun, queryOpts, callback);
  } else if (build) {
    delete queryOpts.stale; // update immediately
    queryOpts.limit = 0;
    pouch._search_query(mapFun, queryOpts).then(function () {
      callback(null, {ok: true});
    })["catch"](callback);
    return;
  }

  // it shouldn't matter if the user types the same
  // token more than once, in fact I think even Lucene does this
  // special cases like boingo boingo and mother mother are rare
  var queryTerms = uniq(getTokenStream(q, index));
  if (!queryTerms.length) {
    return callback(null, {rows: []});
  }
  queryOpts.keys = queryTerms.map(function (queryTerm) {
    return TYPE_TOKEN_COUNT + queryTerm;
  });

  if (typeof stale === 'string') {
    queryOpts.stale = stale;
  }

  // search algorithm, basically classic TF-IDF
  //
  // step 1: get the doc+fields associated with the terms in the query
  // step 2: get the doc-len-norms of those document fields
  // step 3: calculate document scores using tf-idf
  //
  // note that we follow the Lucene convention (established in
  // DefaultSimilarity.java) of computing doc-len-norm (in our case, tecnically
  // field-lennorm) as Math.sqrt(numTerms),
  // which is an optimization that avoids having to look up every term
  // in that document and fully recompute its scores based on tf-idf
  // More info:
  // https://lucene.apache.org/core/3_6_0/api/core/org/apache/lucene/search/Similarity.html
  //

  // step 1
  pouch._search_query(mapFun, queryOpts).then(function (res) {

    if (!res.rows.length) {
      return callback(null, {rows: []});
    }

    var docIdsToFieldsToQueryTerms = {};
    var termDFs = {};

    res.rows.forEach(function (row) {
      var term = row.key.substring(1);
      var field = row.value || 0;

      // calculate termDFs
      if (!(term in termDFs)) {
        termDFs[term] = 1;
      } else {
        termDFs[term]++;
      }

      // calculate docIdsToFieldsToQueryTerms
      if (!(row.id in docIdsToFieldsToQueryTerms)) {
        var arr = docIdsToFieldsToQueryTerms[row.id] = [];
        for (var i = 0; i < fieldBoosts.length; i++) {
          arr[i] = {};
        }
      }

      var docTerms = docIdsToFieldsToQueryTerms[row.id][field];
      if (!(term in docTerms)) {
        docTerms[term] = 1;
      } else {
        docTerms[term]++;
      }
    });

    // apply the minimum should match (mm)
    if (queryTerms.length > 1) {
      Object.keys(docIdsToFieldsToQueryTerms).forEach(function (docId) {
        var allMatchingTerms = {};
        var fieldsToQueryTerms = docIdsToFieldsToQueryTerms[docId];
        Object.keys(fieldsToQueryTerms).forEach(function (field) {
          Object.keys(fieldsToQueryTerms[field]).forEach(function (term) {
            allMatchingTerms[term] = true;
          });
        });
        var numMatchingTerms = Object.keys(allMatchingTerms).length;
        var matchingRatio = numMatchingTerms / queryTerms.length;
        if ((Math.floor(matchingRatio * 100) / 100) < mm) {
          delete docIdsToFieldsToQueryTerms[docId]; // ignore this doc
        }
      });
    }

    if (!Object.keys(docIdsToFieldsToQueryTerms).length) {
      return callback(null, {rows: []});
    }

    var keys = Object.keys(docIdsToFieldsToQueryTerms).map(function (docId) {
      return TYPE_DOC_INFO + docId;
    });

    var queryOpts = {
      saveAs: persistedIndexName,
      keys: keys
    };

    // step 2
    return pouch._search_query(mapFun, queryOpts).then(function (res) {

      var docIdsToFieldsToNorms = {};
      res.rows.forEach(function (row) {
        docIdsToFieldsToNorms[row.id] = row.value;
      });
      // step 3
      // now we have all information, so calculate scores
      var rows = calculateDocumentScores(queryTerms, termDFs,
        docIdsToFieldsToQueryTerms, docIdsToFieldsToNorms, fieldBoosts);
      return rows;
    }).then(function (rows) {
      // filter before fetching docs or applying highlighting
      // for a slight optimization, since for now we've only fetched ids/scores
      return (typeof limit === 'number' && limit >= 0) ?
          rows.slice(skip, skip + limit) : skip > 0 ? rows.slice(skip) : rows;
    }).then(function (rows) {
      if (includeDocs) {
        return applyIncludeDocs(pouch, rows);
      }
      return rows;
    }).then(function (rows) {
      if (highlighting) {
        return applyHighlighting(pouch, opts, rows, fieldBoosts, docIdsToFieldsToQueryTerms);
      }
      return rows;

    }).then(function (rows) {
      callback(null, {rows: rows});
    });
  })["catch"](callback);
});


// returns a sorted list of scored results, like:
// [{id: {...}, score: 0.2}, {id: {...}, score: 0.1}];
//
// some background: normally this would be implemented as cosine similarity
// using tf-idf, which is equal to
// dot-product(q, d) / (norm(q) * norm(doc))
// (although there is no point in calculating the query norm,
// because all we care about is the relative score for a given query,
// so we ignore it, lucene does this too)
//
//
// but instead of straightforward cosine similarity, here I implement
// the dismax algorithm, so the doc score is the
// sum of its fields' scores, and this is done on a per-query-term basis,
// then the maximum score for each of the query terms is the one chosen,
// i.e. max(sumOfQueryTermScoresForField1, sumOfQueryTermScoresForField2, etc.)
//

function calculateDocumentScores(queryTerms, termDFs, docIdsToFieldsToQueryTerms,
                            docIdsToFieldsToNorms, fieldBoosts) {

  var results = Object.keys(docIdsToFieldsToQueryTerms).map(function (docId) {

    var fieldsToQueryTerms = docIdsToFieldsToQueryTerms[docId];
    var fieldsToNorms = docIdsToFieldsToNorms[docId];

    var queryScores = queryTerms.map(function (queryTerm) {
      return fieldsToQueryTerms.map(function (queryTermsToCounts, fieldIdx) {
        var fieldNorm = fieldsToNorms[fieldIdx];
        if (!(queryTerm in queryTermsToCounts)) {
          return 0;
        }
        var termDF = termDFs[queryTerm];
        var termTF = queryTermsToCounts[queryTerm];
        var docScore = termTF / termDF; // TF-IDF for doc
        var queryScore = 1 / termDF; // TF-IDF for query, count assumed to be 1
        var boost = fieldBoosts[fieldIdx].boost;
        return docScore * queryScore * boost / fieldNorm; // see cosine sim equation
      }).reduce(add, 0);
    });

    var maxQueryScore = 0;
    queryScores.forEach(function (queryScore) {
      if (queryScore > maxQueryScore) {
        maxQueryScore = queryScore;
      }
    });

    return {
      id: docId,
      score: maxQueryScore
    };
  });

  results.sort(function (a, b) {
    return a.score < b.score ? 1 : (a.score > b.score ? -1 : 0);
  });

  return results;
}

function applyIncludeDocs(pouch, rows) {
  return Promise.all(rows.map(function (row) {
    return pouch.get(row.id);
  })).then(function (docs) {
    docs.forEach(function (doc, i) {
      rows[i].doc = doc;
    });
  }).then(function () {
    return rows;
  });
}

// create a convenient object showing highlighting results
// this is designed to be like solr's highlighting feature, so it
// should return something like
// {'fieldname': 'here is some <strong>highlighted text</strong>.'}
//
function applyHighlighting(pouch, opts, rows, fieldBoosts,
                           docIdsToFieldsToQueryTerms) {

  var pre = opts.highlighting_pre || '<strong>';
  var post = opts.highlighting_post || '</strong>';

  return Promise.all(rows.map(function (row) {

    return Promise.resolve().then(function () {
      if (row.doc) {
        return row.doc;
      }
      return pouch.get(row.id);
    }).then(function (doc) {
      row.highlighting = {};
      docIdsToFieldsToQueryTerms[row.id].forEach(function (queryTerms, i) {
        var fieldBoost = fieldBoosts[i];
        var fieldName = fieldBoost.field;
        var text = getText(fieldBoost, doc);
        // TODO: this is fairly naive highlighting code; could improve
        // the regex
        Object.keys(queryTerms).forEach(function (queryTerm) {
          var regex = new RegExp('(' + queryTerm + '[a-z]*)', 'gi');
          var replacement = pre + '$1' + post;
          text = text.replace(regex, replacement);
          row.highlighting[fieldName] = text;
        });
      });
    });
  })).then(function () {
    return rows;
  });
}

// return true if filtered, false otherwise
// limit the try/catch to its own function to avoid deoptimization
function isFiltered(doc, filter, db) {
  try {
    return !!(filter && !filter(doc));
  } catch (e) {
    db.emit('error', e);
    return true;
  }
}

/* istanbul ignore next */
if (typeof window !== 'undefined' && window.PouchDB) {
  window.PouchDB.plugin(exports);
}

},{"./pouch-utils":38,"lunr":24,"pouchdb-mapreduce-no-ddocs":29,"uniq":37}],2:[function(require,module,exports){
'use strict';

module.exports = argsArray;

function argsArray(fun) {
  return function () {
    var len = arguments.length;
    if (len) {
      var args = [];
      var i = -1;
      while (++i < len) {
        args[i] = arguments[i];
      }
      return fun.call(this, args);
    } else {
      return fun.call(this, []);
    }
  };
}
},{}],3:[function(require,module,exports){

},{}],4:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],5:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],6:[function(require,module,exports){
'use strict';

module.exports = INTERNAL;

function INTERNAL() {}
},{}],7:[function(require,module,exports){
'use strict';
var Promise = require('./promise');
var reject = require('./reject');
var resolve = require('./resolve');
var INTERNAL = require('./INTERNAL');
var handlers = require('./handlers');
module.exports = all;
function all(iterable) {
  if (Object.prototype.toString.call(iterable) !== '[object Array]') {
    return reject(new TypeError('must be an array'));
  }

  var len = iterable.length;
  var called = false;
  if (!len) {
    return resolve([]);
  }

  var values = new Array(len);
  var resolved = 0;
  var i = -1;
  var promise = new Promise(INTERNAL);
  
  while (++i < len) {
    allResolver(iterable[i], i);
  }
  return promise;
  function allResolver(value, i) {
    resolve(value).then(resolveFromAll, function (error) {
      if (!called) {
        called = true;
        handlers.reject(promise, error);
      }
    });
    function resolveFromAll(outValue) {
      values[i] = outValue;
      if (++resolved === len & !called) {
        called = true;
        handlers.resolve(promise, values);
      }
    }
  }
}
},{"./INTERNAL":6,"./handlers":8,"./promise":10,"./reject":13,"./resolve":14}],8:[function(require,module,exports){
'use strict';
var tryCatch = require('./tryCatch');
var resolveThenable = require('./resolveThenable');
var states = require('./states');

exports.resolve = function (self, value) {
  var result = tryCatch(getThen, value);
  if (result.status === 'error') {
    return exports.reject(self, result.value);
  }
  var thenable = result.value;

  if (thenable) {
    resolveThenable.safely(self, thenable);
  } else {
    self.state = states.FULFILLED;
    self.outcome = value;
    var i = -1;
    var len = self.queue.length;
    while (++i < len) {
      self.queue[i].callFulfilled(value);
    }
  }
  return self;
};
exports.reject = function (self, error) {
  self.state = states.REJECTED;
  self.outcome = error;
  var i = -1;
  var len = self.queue.length;
  while (++i < len) {
    self.queue[i].callRejected(error);
  }
  return self;
};

function getThen(obj) {
  // Make sure we only access the accessor once as required by the spec
  var then = obj && obj.then;
  if (obj && typeof obj === 'object' && typeof then === 'function') {
    return function appyThen() {
      then.apply(obj, arguments);
    };
  }
}
},{"./resolveThenable":15,"./states":16,"./tryCatch":17}],9:[function(require,module,exports){
module.exports = exports = require('./promise');

exports.resolve = require('./resolve');
exports.reject = require('./reject');
exports.all = require('./all');
exports.race = require('./race');
},{"./all":7,"./promise":10,"./race":12,"./reject":13,"./resolve":14}],10:[function(require,module,exports){
'use strict';

var unwrap = require('./unwrap');
var INTERNAL = require('./INTERNAL');
var resolveThenable = require('./resolveThenable');
var states = require('./states');
var QueueItem = require('./queueItem');

module.exports = Promise;
function Promise(resolver) {
  if (!(this instanceof Promise)) {
    return new Promise(resolver);
  }
  if (typeof resolver !== 'function') {
    throw new TypeError('resolver must be a function');
  }
  this.state = states.PENDING;
  this.queue = [];
  this.outcome = void 0;
  if (resolver !== INTERNAL) {
    resolveThenable.safely(this, resolver);
  }
}

Promise.prototype['catch'] = function (onRejected) {
  return this.then(null, onRejected);
};
Promise.prototype.then = function (onFulfilled, onRejected) {
  if (typeof onFulfilled !== 'function' && this.state === states.FULFILLED ||
    typeof onRejected !== 'function' && this.state === states.REJECTED) {
    return this;
  }
  var promise = new Promise(INTERNAL);

  
  if (this.state !== states.PENDING) {
    var resolver = this.state === states.FULFILLED ? onFulfilled: onRejected;
    unwrap(promise, resolver, this.outcome);
  } else {
    this.queue.push(new QueueItem(promise, onFulfilled, onRejected));
  }

  return promise;
};

},{"./INTERNAL":6,"./queueItem":11,"./resolveThenable":15,"./states":16,"./unwrap":18}],11:[function(require,module,exports){
'use strict';
var handlers = require('./handlers');
var unwrap = require('./unwrap');

module.exports = QueueItem;
function QueueItem(promise, onFulfilled, onRejected) {
  this.promise = promise;
  if (typeof onFulfilled === 'function') {
    this.onFulfilled = onFulfilled;
    this.callFulfilled = this.otherCallFulfilled;
  }
  if (typeof onRejected === 'function') {
    this.onRejected = onRejected;
    this.callRejected = this.otherCallRejected;
  }
}
QueueItem.prototype.callFulfilled = function (value) {
  handlers.resolve(this.promise, value);
};
QueueItem.prototype.otherCallFulfilled = function (value) {
  unwrap(this.promise, this.onFulfilled, value);
};
QueueItem.prototype.callRejected = function (value) {
  handlers.reject(this.promise, value);
};
QueueItem.prototype.otherCallRejected = function (value) {
  unwrap(this.promise, this.onRejected, value);
};
},{"./handlers":8,"./unwrap":18}],12:[function(require,module,exports){
'use strict';
var Promise = require('./promise');
var reject = require('./reject');
var resolve = require('./resolve');
var INTERNAL = require('./INTERNAL');
var handlers = require('./handlers');
module.exports = race;
function race(iterable) {
  if (Object.prototype.toString.call(iterable) !== '[object Array]') {
    return reject(new TypeError('must be an array'));
  }

  var len = iterable.length;
  var called = false;
  if (!len) {
    return resolve([]);
  }

  var resolved = 0;
  var i = -1;
  var promise = new Promise(INTERNAL);
  
  while (++i < len) {
    resolver(iterable[i]);
  }
  return promise;
  function resolver(value) {
    resolve(value).then(function (response) {
      if (!called) {
        called = true;
        handlers.resolve(promise, response);
      }
    }, function (error) {
      if (!called) {
        called = true;
        handlers.reject(promise, error);
      }
    });
  }
}
},{"./INTERNAL":6,"./handlers":8,"./promise":10,"./reject":13,"./resolve":14}],13:[function(require,module,exports){
'use strict';

var Promise = require('./promise');
var INTERNAL = require('./INTERNAL');
var handlers = require('./handlers');
module.exports = reject;

function reject(reason) {
	var promise = new Promise(INTERNAL);
	return handlers.reject(promise, reason);
}
},{"./INTERNAL":6,"./handlers":8,"./promise":10}],14:[function(require,module,exports){
'use strict';

var Promise = require('./promise');
var INTERNAL = require('./INTERNAL');
var handlers = require('./handlers');
module.exports = resolve;

var FALSE = handlers.resolve(new Promise(INTERNAL), false);
var NULL = handlers.resolve(new Promise(INTERNAL), null);
var UNDEFINED = handlers.resolve(new Promise(INTERNAL), void 0);
var ZERO = handlers.resolve(new Promise(INTERNAL), 0);
var EMPTYSTRING = handlers.resolve(new Promise(INTERNAL), '');

function resolve(value) {
  if (value) {
    if (value instanceof Promise) {
      return value;
    }
    return handlers.resolve(new Promise(INTERNAL), value);
  }
  var valueType = typeof value;
  switch (valueType) {
    case 'boolean':
      return FALSE;
    case 'undefined':
      return UNDEFINED;
    case 'object':
      return NULL;
    case 'number':
      return ZERO;
    case 'string':
      return EMPTYSTRING;
  }
}
},{"./INTERNAL":6,"./handlers":8,"./promise":10}],15:[function(require,module,exports){
'use strict';
var handlers = require('./handlers');
var tryCatch = require('./tryCatch');
function safelyResolveThenable(self, thenable) {
  // Either fulfill, reject or reject with error
  var called = false;
  function onError(value) {
    if (called) {
      return;
    }
    called = true;
    handlers.reject(self, value);
  }

  function onSuccess(value) {
    if (called) {
      return;
    }
    called = true;
    handlers.resolve(self, value);
  }

  function tryToUnwrap() {
    thenable(onSuccess, onError);
  }
  
  var result = tryCatch(tryToUnwrap);
  if (result.status === 'error') {
    onError(result.value);
  }
}
exports.safely = safelyResolveThenable;
},{"./handlers":8,"./tryCatch":17}],16:[function(require,module,exports){
// Lazy man's symbols for states

exports.REJECTED = ['REJECTED'];
exports.FULFILLED = ['FULFILLED'];
exports.PENDING = ['PENDING'];
},{}],17:[function(require,module,exports){
'use strict';

module.exports = tryCatch;

function tryCatch(func, value) {
  var out = {};
  try {
    out.value = func(value);
    out.status = 'success';
  } catch (e) {
    out.status = 'error';
    out.value = e;
  }
  return out;
}
},{}],18:[function(require,module,exports){
'use strict';

var immediate = require('immediate');
var handlers = require('./handlers');
module.exports = unwrap;

function unwrap(promise, func, value) {
  immediate(function () {
    var returnValue;
    try {
      returnValue = func(value);
    } catch (e) {
      return handlers.reject(promise, e);
    }
    if (returnValue === promise) {
      handlers.reject(promise, new TypeError('Cannot resolve promise with itself'));
    } else {
      handlers.resolve(promise, returnValue);
    }
  });
}
},{"./handlers":8,"immediate":19}],19:[function(require,module,exports){
'use strict';
var types = [
  require('./nextTick'),
  require('./mutation.js'),
  require('./messageChannel'),
  require('./stateChange'),
  require('./timeout')
];
var draining;
var queue = [];
//named nextTick for less confusing stack traces
function nextTick() {
  draining = true;
  var i, oldQueue;
  var len = queue.length;
  while (len) {
    oldQueue = queue;
    queue = [];
    i = -1;
    while (++i < len) {
      oldQueue[i]();
    }
    len = queue.length;
  }
  draining = false;
}
var scheduleDrain;
var i = -1;
var len = types.length;
while (++ i < len) {
  if (types[i] && types[i].test && types[i].test()) {
    scheduleDrain = types[i].install(nextTick);
    break;
  }
}
module.exports = immediate;
function immediate(task) {
  if (queue.push(task) === 1 && !draining) {
    scheduleDrain();
  }
}
},{"./messageChannel":20,"./mutation.js":21,"./nextTick":3,"./stateChange":22,"./timeout":23}],20:[function(require,module,exports){
var global=typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};'use strict';

exports.test = function () {
  if (global.setImmediate) {
    // we can only get here in IE10
    // which doesn't handel postMessage well
    return false;
  }
  return typeof global.MessageChannel !== 'undefined';
};

exports.install = function (func) {
  var channel = new global.MessageChannel();
  channel.port1.onmessage = func;
  return function () {
    channel.port2.postMessage(0);
  };
};
},{}],21:[function(require,module,exports){
var global=typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};'use strict';
//based off rsvp https://github.com/tildeio/rsvp.js
//license https://github.com/tildeio/rsvp.js/blob/master/LICENSE
//https://github.com/tildeio/rsvp.js/blob/master/lib/rsvp/asap.js

var Mutation = global.MutationObserver || global.WebKitMutationObserver;

exports.test = function () {
  return Mutation;
};

exports.install = function (handle) {
  var called = 0;
  var observer = new Mutation(handle);
  var element = global.document.createTextNode('');
  observer.observe(element, {
    characterData: true
  });
  return function () {
    element.data = (called = ++called % 2);
  };
};
},{}],22:[function(require,module,exports){
var global=typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};'use strict';

exports.test = function () {
  return 'document' in global && 'onreadystatechange' in global.document.createElement('script');
};

exports.install = function (handle) {
  return function () {

    // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
    // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
    var scriptEl = global.document.createElement('script');
    scriptEl.onreadystatechange = function () {
      handle();

      scriptEl.onreadystatechange = null;
      scriptEl.parentNode.removeChild(scriptEl);
      scriptEl = null;
    };
    global.document.documentElement.appendChild(scriptEl);

    return handle;
  };
};
},{}],23:[function(require,module,exports){
'use strict';
exports.test = function () {
  return true;
};

exports.install = function (t) {
  return function () {
    setTimeout(t, 0);
  };
};
},{}],24:[function(require,module,exports){
/**
 * lunr - http://lunrjs.com - A bit like Solr, but much smaller and not as bright - 0.5.5
 * Copyright (C) 2014 Oliver Nightingale
 * MIT Licensed
 * @license
 */

(function(){

/**
 * Convenience function for instantiating a new lunr index and configuring it
 * with the default pipeline functions and the passed config function.
 *
 * When using this convenience function a new index will be created with the
 * following functions already in the pipeline:
 *
 * lunr.StopWordFilter - filters out any stop words before they enter the
 * index
 *
 * lunr.stemmer - stems the tokens before entering the index.
 *
 * Example:
 *
 *     var idx = lunr(function () {
 *       this.field('title', 10)
 *       this.field('tags', 100)
 *       this.field('body')
 *       
 *       this.ref('cid')
 *       
 *       this.pipeline.add(function () {
 *         // some custom pipeline function
 *       })
 *       
 *     })
 *
 * @param {Function} config A function that will be called with the new instance
 * of the lunr.Index as both its context and first parameter. It can be used to
 * customize the instance of new lunr.Index.
 * @namespace
 * @module
 * @returns {lunr.Index}
 *
 */
var lunr = function (config) {
  var idx = new lunr.Index

  idx.pipeline.add(
    lunr.trimmer,
    lunr.stopWordFilter,
    lunr.stemmer
  )

  if (config) config.call(idx, idx)

  return idx
}

lunr.version = "0.5.5"
/*!
 * lunr.utils
 * Copyright (C) 2014 Oliver Nightingale
 */

/**
 * A namespace containing utils for the rest of the lunr library
 */
lunr.utils = {}

/**
 * Print a warning message to the console.
 *
 * @param {String} message The message to be printed.
 * @memberOf Utils
 */
lunr.utils.warn = (function (global) {
  return function (message) {
    if (global.console && console.warn) {
      console.warn(message)
    }
  }
})(this)

/*!
 * lunr.EventEmitter
 * Copyright (C) 2014 Oliver Nightingale
 */

/**
 * lunr.EventEmitter is an event emitter for lunr. It manages adding and removing event handlers and triggering events and their handlers.
 *
 * @constructor
 */
lunr.EventEmitter = function () {
  this.events = {}
}

/**
 * Binds a handler function to a specific event(s).
 *
 * Can bind a single function to many different events in one call.
 *
 * @param {String} [eventName] The name(s) of events to bind this function to.
 * @param {Function} handler The function to call when an event is fired.
 * @memberOf EventEmitter
 */
lunr.EventEmitter.prototype.addListener = function () {
  var args = Array.prototype.slice.call(arguments),
      fn = args.pop(),
      names = args

  if (typeof fn !== "function") throw new TypeError ("last argument must be a function")

  names.forEach(function (name) {
    if (!this.hasHandler(name)) this.events[name] = []
    this.events[name].push(fn)
  }, this)
}

/**
 * Removes a handler function from a specific event.
 *
 * @param {String} eventName The name of the event to remove this function from.
 * @param {Function} handler The function to remove from an event.
 * @memberOf EventEmitter
 */
lunr.EventEmitter.prototype.removeListener = function (name, fn) {
  if (!this.hasHandler(name)) return

  var fnIndex = this.events[name].indexOf(fn)
  this.events[name].splice(fnIndex, 1)

  if (!this.events[name].length) delete this.events[name]
}

/**
 * Calls all functions bound to the given event.
 *
 * Additional data can be passed to the event handler as arguments to `emit`
 * after the event name.
 *
 * @param {String} eventName The name of the event to emit.
 * @memberOf EventEmitter
 */
lunr.EventEmitter.prototype.emit = function (name) {
  if (!this.hasHandler(name)) return

  var args = Array.prototype.slice.call(arguments, 1)

  this.events[name].forEach(function (fn) {
    fn.apply(undefined, args)
  })
}

/**
 * Checks whether a handler has ever been stored against an event.
 *
 * @param {String} eventName The name of the event to check.
 * @private
 * @memberOf EventEmitter
 */
lunr.EventEmitter.prototype.hasHandler = function (name) {
  return name in this.events
}

/*!
 * lunr.tokenizer
 * Copyright (C) 2014 Oliver Nightingale
 */

/**
 * A function for splitting a string into tokens ready to be inserted into
 * the search index.
 *
 * @module
 * @param {String} obj The string to convert into tokens
 * @returns {Array}
 */
lunr.tokenizer = function (obj) {
  if (!arguments.length || obj == null || obj == undefined) return []
  if (Array.isArray(obj)) return obj.map(function (t) { return t.toLowerCase() })

  var str = obj.toString().replace(/^\s+/, '')

  for (var i = str.length - 1; i >= 0; i--) {
    if (/\S/.test(str.charAt(i))) {
      str = str.substring(0, i + 1)
      break
    }
  }

  return str
    .split(/(?:\s+|\-)/)
    .filter(function (token) {
      return !!token
    })
    .map(function (token) {
      return token.toLowerCase()
    })
}
/*!
 * lunr.Pipeline
 * Copyright (C) 2014 Oliver Nightingale
 */

/**
 * lunr.Pipelines maintain an ordered list of functions to be applied to all
 * tokens in documents entering the search index and queries being ran against
 * the index.
 *
 * An instance of lunr.Index created with the lunr shortcut will contain a
 * pipeline with a stop word filter and an English language stemmer. Extra
 * functions can be added before or after either of these functions or these
 * default functions can be removed.
 *
 * When run the pipeline will call each function in turn, passing a token, the
 * index of that token in the original list of all tokens and finally a list of
 * all the original tokens.
 *
 * The output of functions in the pipeline will be passed to the next function
 * in the pipeline. To exclude a token from entering the index the function
 * should return undefined, the rest of the pipeline will not be called with
 * this token.
 *
 * For serialisation of pipelines to work, all functions used in an instance of
 * a pipeline should be registered with lunr.Pipeline. Registered functions can
 * then be loaded. If trying to load a serialised pipeline that uses functions
 * that are not registered an error will be thrown.
 *
 * If not planning on serialising the pipeline then registering pipeline functions
 * is not necessary.
 *
 * @constructor
 */
lunr.Pipeline = function () {
  this._stack = []
}

lunr.Pipeline.registeredFunctions = {}

/**
 * Register a function with the pipeline.
 *
 * Functions that are used in the pipeline should be registered if the pipeline
 * needs to be serialised, or a serialised pipeline needs to be loaded.
 *
 * Registering a function does not add it to a pipeline, functions must still be
 * added to instances of the pipeline for them to be used when running a pipeline.
 *
 * @param {Function} fn The function to check for.
 * @param {String} label The label to register this function with
 * @memberOf Pipeline
 */
lunr.Pipeline.registerFunction = function (fn, label) {
  if (label in this.registeredFunctions) {
    lunr.utils.warn('Overwriting existing registered function: ' + label)
  }

  fn.label = label
  lunr.Pipeline.registeredFunctions[fn.label] = fn
}

/**
 * Warns if the function is not registered as a Pipeline function.
 *
 * @param {Function} fn The function to check for.
 * @private
 * @memberOf Pipeline
 */
lunr.Pipeline.warnIfFunctionNotRegistered = function (fn) {
  var isRegistered = fn.label && (fn.label in this.registeredFunctions)

  if (!isRegistered) {
    lunr.utils.warn('Function is not registered with pipeline. This may cause problems when serialising the index.\n', fn)
  }
}

/**
 * Loads a previously serialised pipeline.
 *
 * All functions to be loaded must already be registered with lunr.Pipeline.
 * If any function from the serialised data has not been registered then an
 * error will be thrown.
 *
 * @param {Object} serialised The serialised pipeline to load.
 * @returns {lunr.Pipeline}
 * @memberOf Pipeline
 */
lunr.Pipeline.load = function (serialised) {
  var pipeline = new lunr.Pipeline

  serialised.forEach(function (fnName) {
    var fn = lunr.Pipeline.registeredFunctions[fnName]

    if (fn) {
      pipeline.add(fn)
    } else {
      throw new Error ('Cannot load un-registered function: ' + fnName)
    }
  })

  return pipeline
}

/**
 * Adds new functions to the end of the pipeline.
 *
 * Logs a warning if the function has not been registered.
 *
 * @param {Function} functions Any number of functions to add to the pipeline.
 * @memberOf Pipeline
 */
lunr.Pipeline.prototype.add = function () {
  var fns = Array.prototype.slice.call(arguments)

  fns.forEach(function (fn) {
    lunr.Pipeline.warnIfFunctionNotRegistered(fn)
    this._stack.push(fn)
  }, this)
}

/**
 * Adds a single function after a function that already exists in the
 * pipeline.
 *
 * Logs a warning if the function has not been registered.
 *
 * @param {Function} existingFn A function that already exists in the pipeline.
 * @param {Function} newFn The new function to add to the pipeline.
 * @memberOf Pipeline
 */
lunr.Pipeline.prototype.after = function (existingFn, newFn) {
  lunr.Pipeline.warnIfFunctionNotRegistered(newFn)

  var pos = this._stack.indexOf(existingFn) + 1
  this._stack.splice(pos, 0, newFn)
}

/**
 * Adds a single function before a function that already exists in the
 * pipeline.
 *
 * Logs a warning if the function has not been registered.
 *
 * @param {Function} existingFn A function that already exists in the pipeline.
 * @param {Function} newFn The new function to add to the pipeline.
 * @memberOf Pipeline
 */
lunr.Pipeline.prototype.before = function (existingFn, newFn) {
  lunr.Pipeline.warnIfFunctionNotRegistered(newFn)

  var pos = this._stack.indexOf(existingFn)
  this._stack.splice(pos, 0, newFn)
}

/**
 * Removes a function from the pipeline.
 *
 * @param {Function} fn The function to remove from the pipeline.
 * @memberOf Pipeline
 */
lunr.Pipeline.prototype.remove = function (fn) {
  var pos = this._stack.indexOf(fn)
  this._stack.splice(pos, 1)
}

/**
 * Runs the current list of functions that make up the pipeline against the
 * passed tokens.
 *
 * @param {Array} tokens The tokens to run through the pipeline.
 * @returns {Array}
 * @memberOf Pipeline
 */
lunr.Pipeline.prototype.run = function (tokens) {
  var out = [],
      tokenLength = tokens.length,
      stackLength = this._stack.length

  for (var i = 0; i < tokenLength; i++) {
    var token = tokens[i]

    for (var j = 0; j < stackLength; j++) {
      token = this._stack[j](token, i, tokens)
      if (token === void 0) break
    };

    if (token !== void 0) out.push(token)
  };

  return out
}

/**
 * Resets the pipeline by removing any existing processors.
 *
 * @memberOf Pipeline
 */
lunr.Pipeline.prototype.reset = function () {
  this._stack = []
}

/**
 * Returns a representation of the pipeline ready for serialisation.
 *
 * Logs a warning if the function has not been registered.
 *
 * @returns {Array}
 * @memberOf Pipeline
 */
lunr.Pipeline.prototype.toJSON = function () {
  return this._stack.map(function (fn) {
    lunr.Pipeline.warnIfFunctionNotRegistered(fn)

    return fn.label
  })
}
/*!
 * lunr.Vector
 * Copyright (C) 2014 Oliver Nightingale
 */

/**
 * lunr.Vectors implement vector related operations for
 * a series of elements.
 *
 * @constructor
 */
lunr.Vector = function () {
  this._magnitude = null
  this.list = undefined
  this.length = 0
}

/**
 * lunr.Vector.Node is a simple struct for each node
 * in a lunr.Vector.
 *
 * @private
 * @param {Number} The index of the node in the vector.
 * @param {Object} The data at this node in the vector.
 * @param {lunr.Vector.Node} The node directly after this node in the vector.
 * @constructor
 * @memberOf Vector
 */
lunr.Vector.Node = function (idx, val, next) {
  this.idx = idx
  this.val = val
  this.next = next
}

/**
 * Inserts a new value at a position in a vector.
 *
 * @param {Number} The index at which to insert a value.
 * @param {Object} The object to insert in the vector.
 * @memberOf Vector.
 */
lunr.Vector.prototype.insert = function (idx, val) {
  var list = this.list

  if (!list) {
    this.list = new lunr.Vector.Node (idx, val, list)
    return this.length++
  }

  var prev = list,
      next = list.next

  while (next != undefined) {
    if (idx < next.idx) {
      prev.next = new lunr.Vector.Node (idx, val, next)
      return this.length++
    }

    prev = next, next = next.next
  }

  prev.next = new lunr.Vector.Node (idx, val, next)
  return this.length++
}

/**
 * Calculates the magnitude of this vector.
 *
 * @returns {Number}
 * @memberOf Vector
 */
lunr.Vector.prototype.magnitude = function () {
  if (this._magniture) return this._magnitude
  var node = this.list,
      sumOfSquares = 0,
      val

  while (node) {
    val = node.val
    sumOfSquares += val * val
    node = node.next
  }

  return this._magnitude = Math.sqrt(sumOfSquares)
}

/**
 * Calculates the dot product of this vector and another vector.
 *
 * @param {lunr.Vector} otherVector The vector to compute the dot product with.
 * @returns {Number}
 * @memberOf Vector
 */
lunr.Vector.prototype.dot = function (otherVector) {
  var node = this.list,
      otherNode = otherVector.list,
      dotProduct = 0

  while (node && otherNode) {
    if (node.idx < otherNode.idx) {
      node = node.next
    } else if (node.idx > otherNode.idx) {
      otherNode = otherNode.next
    } else {
      dotProduct += node.val * otherNode.val
      node = node.next
      otherNode = otherNode.next
    }
  }

  return dotProduct
}

/**
 * Calculates the cosine similarity between this vector and another
 * vector.
 *
 * @param {lunr.Vector} otherVector The other vector to calculate the
 * similarity with.
 * @returns {Number}
 * @memberOf Vector
 */
lunr.Vector.prototype.similarity = function (otherVector) {
  return this.dot(otherVector) / (this.magnitude() * otherVector.magnitude())
}
/*!
 * lunr.SortedSet
 * Copyright (C) 2014 Oliver Nightingale
 */

/**
 * lunr.SortedSets are used to maintain an array of uniq values in a sorted
 * order.
 *
 * @constructor
 */
lunr.SortedSet = function () {
  this.length = 0
  this.elements = []
}

/**
 * Loads a previously serialised sorted set.
 *
 * @param {Array} serialisedData The serialised set to load.
 * @returns {lunr.SortedSet}
 * @memberOf SortedSet
 */
lunr.SortedSet.load = function (serialisedData) {
  var set = new this

  set.elements = serialisedData
  set.length = serialisedData.length

  return set
}

/**
 * Inserts new items into the set in the correct position to maintain the
 * order.
 *
 * @param {Object} The objects to add to this set.
 * @memberOf SortedSet
 */
lunr.SortedSet.prototype.add = function () {
  Array.prototype.slice.call(arguments).forEach(function (element) {
    if (~this.indexOf(element)) return
    this.elements.splice(this.locationFor(element), 0, element)
  }, this)

  this.length = this.elements.length
}

/**
 * Converts this sorted set into an array.
 *
 * @returns {Array}
 * @memberOf SortedSet
 */
lunr.SortedSet.prototype.toArray = function () {
  return this.elements.slice()
}

/**
 * Creates a new array with the results of calling a provided function on every
 * element in this sorted set.
 *
 * Delegates to Array.prototype.map and has the same signature.
 *
 * @param {Function} fn The function that is called on each element of the
 * set.
 * @param {Object} ctx An optional object that can be used as the context
 * for the function fn.
 * @returns {Array}
 * @memberOf SortedSet
 */
lunr.SortedSet.prototype.map = function (fn, ctx) {
  return this.elements.map(fn, ctx)
}

/**
 * Executes a provided function once per sorted set element.
 *
 * Delegates to Array.prototype.forEach and has the same signature.
 *
 * @param {Function} fn The function that is called on each element of the
 * set.
 * @param {Object} ctx An optional object that can be used as the context
 * @memberOf SortedSet
 * for the function fn.
 */
lunr.SortedSet.prototype.forEach = function (fn, ctx) {
  return this.elements.forEach(fn, ctx)
}

/**
 * Returns the index at which a given element can be found in the
 * sorted set, or -1 if it is not present.
 *
 * @param {Object} elem The object to locate in the sorted set.
 * @param {Number} start An optional index at which to start searching from
 * within the set.
 * @param {Number} end An optional index at which to stop search from within
 * the set.
 * @returns {Number}
 * @memberOf SortedSet
 */
lunr.SortedSet.prototype.indexOf = function (elem, start, end) {
  var start = start || 0,
      end = end || this.elements.length,
      sectionLength = end - start,
      pivot = start + Math.floor(sectionLength / 2),
      pivotElem = this.elements[pivot]

  if (sectionLength <= 1) {
    if (pivotElem === elem) {
      return pivot
    } else {
      return -1
    }
  }

  if (pivotElem < elem) return this.indexOf(elem, pivot, end)
  if (pivotElem > elem) return this.indexOf(elem, start, pivot)
  if (pivotElem === elem) return pivot
}

/**
 * Returns the position within the sorted set that an element should be
 * inserted at to maintain the current order of the set.
 *
 * This function assumes that the element to search for does not already exist
 * in the sorted set.
 *
 * @param {Object} elem The elem to find the position for in the set
 * @param {Number} start An optional index at which to start searching from
 * within the set.
 * @param {Number} end An optional index at which to stop search from within
 * the set.
 * @returns {Number}
 * @memberOf SortedSet
 */
lunr.SortedSet.prototype.locationFor = function (elem, start, end) {
  var start = start || 0,
      end = end || this.elements.length,
      sectionLength = end - start,
      pivot = start + Math.floor(sectionLength / 2),
      pivotElem = this.elements[pivot]

  if (sectionLength <= 1) {
    if (pivotElem > elem) return pivot
    if (pivotElem < elem) return pivot + 1
  }

  if (pivotElem < elem) return this.locationFor(elem, pivot, end)
  if (pivotElem > elem) return this.locationFor(elem, start, pivot)
}

/**
 * Creates a new lunr.SortedSet that contains the elements in the intersection
 * of this set and the passed set.
 *
 * @param {lunr.SortedSet} otherSet The set to intersect with this set.
 * @returns {lunr.SortedSet}
 * @memberOf SortedSet
 */
lunr.SortedSet.prototype.intersect = function (otherSet) {
  var intersectSet = new lunr.SortedSet,
      i = 0, j = 0,
      a_len = this.length, b_len = otherSet.length,
      a = this.elements, b = otherSet.elements

  while (true) {
    if (i > a_len - 1 || j > b_len - 1) break

    if (a[i] === b[j]) {
      intersectSet.add(a[i])
      i++, j++
      continue
    }

    if (a[i] < b[j]) {
      i++
      continue
    }

    if (a[i] > b[j]) {
      j++
      continue
    }
  };

  return intersectSet
}

/**
 * Makes a copy of this set
 *
 * @returns {lunr.SortedSet}
 * @memberOf SortedSet
 */
lunr.SortedSet.prototype.clone = function () {
  var clone = new lunr.SortedSet

  clone.elements = this.toArray()
  clone.length = clone.elements.length

  return clone
}

/**
 * Creates a new lunr.SortedSet that contains the elements in the union
 * of this set and the passed set.
 *
 * @param {lunr.SortedSet} otherSet The set to union with this set.
 * @returns {lunr.SortedSet}
 * @memberOf SortedSet
 */
lunr.SortedSet.prototype.union = function (otherSet) {
  var longSet, shortSet, unionSet

  if (this.length >= otherSet.length) {
    longSet = this, shortSet = otherSet
  } else {
    longSet = otherSet, shortSet = this
  }

  unionSet = longSet.clone()

  unionSet.add.apply(unionSet, shortSet.toArray())

  return unionSet
}

/**
 * Returns a representation of the sorted set ready for serialisation.
 *
 * @returns {Array}
 * @memberOf SortedSet
 */
lunr.SortedSet.prototype.toJSON = function () {
  return this.toArray()
}
/*!
 * lunr.Index
 * Copyright (C) 2014 Oliver Nightingale
 */

/**
 * lunr.Index is object that manages a search index.  It contains the indexes
 * and stores all the tokens and document lookups.  It also provides the main
 * user facing API for the library.
 *
 * @constructor
 */
lunr.Index = function () {
  this._fields = []
  this._ref = 'id'
  this.pipeline = new lunr.Pipeline
  this.documentStore = new lunr.Store
  this.tokenStore = new lunr.TokenStore
  this.corpusTokens = new lunr.SortedSet
  this.eventEmitter =  new lunr.EventEmitter

  this._idfCache = {}

  this.on('add', 'remove', 'update', (function () {
    this._idfCache = {}
  }).bind(this))
}

/**
 * Bind a handler to events being emitted by the index.
 *
 * The handler can be bound to many events at the same time.
 *
 * @param {String} [eventName] The name(s) of events to bind the function to.
 * @param {Function} handler The serialised set to load.
 * @memberOf Index
 */
lunr.Index.prototype.on = function () {
  var args = Array.prototype.slice.call(arguments)
  return this.eventEmitter.addListener.apply(this.eventEmitter, args)
}

/**
 * Removes a handler from an event being emitted by the index.
 *
 * @param {String} eventName The name of events to remove the function from.
 * @param {Function} handler The serialised set to load.
 * @memberOf Index
 */
lunr.Index.prototype.off = function (name, fn) {
  return this.eventEmitter.removeListener(name, fn)
}

/**
 * Loads a previously serialised index.
 *
 * Issues a warning if the index being imported was serialised
 * by a different version of lunr.
 *
 * @param {Object} serialisedData The serialised set to load.
 * @returns {lunr.Index}
 * @memberOf Index
 */
lunr.Index.load = function (serialisedData) {
  if (serialisedData.version !== lunr.version) {
    lunr.utils.warn('version mismatch: current ' + lunr.version + ' importing ' + serialisedData.version)
  }

  var idx = new this

  idx._fields = serialisedData.fields
  idx._ref = serialisedData.ref

  idx.documentStore = lunr.Store.load(serialisedData.documentStore)
  idx.tokenStore = lunr.TokenStore.load(serialisedData.tokenStore)
  idx.corpusTokens = lunr.SortedSet.load(serialisedData.corpusTokens)
  idx.pipeline = lunr.Pipeline.load(serialisedData.pipeline)

  return idx
}

/**
 * Adds a field to the list of fields that will be searchable within documents
 * in the index.
 *
 * An optional boost param can be passed to affect how much tokens in this field
 * rank in search results, by default the boost value is 1.
 *
 * Fields should be added before any documents are added to the index, fields
 * that are added after documents are added to the index will only apply to new
 * documents added to the index.
 *
 * @param {String} fieldName The name of the field within the document that
 * should be indexed
 * @param {Number} boost An optional boost that can be applied to terms in this
 * field.
 * @returns {lunr.Index}
 * @memberOf Index
 */
lunr.Index.prototype.field = function (fieldName, opts) {
  var opts = opts || {},
      field = { name: fieldName, boost: opts.boost || 1 }

  this._fields.push(field)
  return this
}

/**
 * Sets the property used to uniquely identify documents added to the index,
 * by default this property is 'id'.
 *
 * This should only be changed before adding documents to the index, changing
 * the ref property without resetting the index can lead to unexpected results.
 *
 * @param {String} refName The property to use to uniquely identify the
 * documents in the index.
 * @param {Boolean} emitEvent Whether to emit add events, defaults to true
 * @returns {lunr.Index}
 * @memberOf Index
 */
lunr.Index.prototype.ref = function (refName) {
  this._ref = refName
  return this
}

/**
 * Add a document to the index.
 *
 * This is the way new documents enter the index, this function will run the
 * fields from the document through the index's pipeline and then add it to
 * the index, it will then show up in search results.
 *
 * An 'add' event is emitted with the document that has been added and the index
 * the document has been added to. This event can be silenced by passing false
 * as the second argument to add.
 *
 * @param {Object} doc The document to add to the index.
 * @param {Boolean} emitEvent Whether or not to emit events, default true.
 * @memberOf Index
 */
lunr.Index.prototype.add = function (doc, emitEvent) {
  var docTokens = {},
      allDocumentTokens = new lunr.SortedSet,
      docRef = doc[this._ref],
      emitEvent = emitEvent === undefined ? true : emitEvent

  this._fields.forEach(function (field) {
    var fieldTokens = this.pipeline.run(lunr.tokenizer(doc[field.name]))

    docTokens[field.name] = fieldTokens
    lunr.SortedSet.prototype.add.apply(allDocumentTokens, fieldTokens)
  }, this)

  this.documentStore.set(docRef, allDocumentTokens)
  lunr.SortedSet.prototype.add.apply(this.corpusTokens, allDocumentTokens.toArray())

  for (var i = 0; i < allDocumentTokens.length; i++) {
    var token = allDocumentTokens.elements[i]
    var tf = this._fields.reduce(function (memo, field) {
      var fieldLength = docTokens[field.name].length

      if (!fieldLength) return memo

      var tokenCount = docTokens[field.name].filter(function (t) { return t === token }).length

      return memo + (tokenCount / fieldLength * field.boost)
    }, 0)

    this.tokenStore.add(token, { ref: docRef, tf: tf })
  };

  if (emitEvent) this.eventEmitter.emit('add', doc, this)
}

/**
 * Removes a document from the index.
 *
 * To make sure documents no longer show up in search results they can be
 * removed from the index using this method.
 *
 * The document passed only needs to have the same ref property value as the
 * document that was added to the index, they could be completely different
 * objects.
 *
 * A 'remove' event is emitted with the document that has been removed and the index
 * the document has been removed from. This event can be silenced by passing false
 * as the second argument to remove.
 *
 * @param {Object} doc The document to remove from the index.
 * @param {Boolean} emitEvent Whether to emit remove events, defaults to true
 * @memberOf Index
 */
lunr.Index.prototype.remove = function (doc, emitEvent) {
  var docRef = doc[this._ref],
      emitEvent = emitEvent === undefined ? true : emitEvent

  if (!this.documentStore.has(docRef)) return

  var docTokens = this.documentStore.get(docRef)

  this.documentStore.remove(docRef)

  docTokens.forEach(function (token) {
    this.tokenStore.remove(token, docRef)
  }, this)

  if (emitEvent) this.eventEmitter.emit('remove', doc, this)
}

/**
 * Updates a document in the index.
 *
 * When a document contained within the index gets updated, fields changed,
 * added or removed, to make sure it correctly matched against search queries,
 * it should be updated in the index.
 *
 * This method is just a wrapper around `remove` and `add`
 *
 * An 'update' event is emitted with the document that has been updated and the index.
 * This event can be silenced by passing false as the second argument to update. Only
 * an update event will be fired, the 'add' and 'remove' events of the underlying calls
 * are silenced.
 *
 * @param {Object} doc The document to update in the index.
 * @param {Boolean} emitEvent Whether to emit update events, defaults to true
 * @see Index.prototype.remove
 * @see Index.prototype.add
 * @memberOf Index
 */
lunr.Index.prototype.update = function (doc, emitEvent) {
  var emitEvent = emitEvent === undefined ? true : emitEvent

  this.remove(doc, false)
  this.add(doc, false)

  if (emitEvent) this.eventEmitter.emit('update', doc, this)
}

/**
 * Calculates the inverse document frequency for a token within the index.
 *
 * @param {String} token The token to calculate the idf of.
 * @see Index.prototype.idf
 * @private
 * @memberOf Index
 */
lunr.Index.prototype.idf = function (term) {
  var cacheKey = "@" + term
  if (Object.prototype.hasOwnProperty.call(this._idfCache, cacheKey)) return this._idfCache[cacheKey]

  var documentFrequency = this.tokenStore.count(term),
      idf = 1

  if (documentFrequency > 0) {
    idf = 1 + Math.log(this.tokenStore.length / documentFrequency)
  }

  return this._idfCache[cacheKey] = idf
}

/**
 * Searches the index using the passed query.
 *
 * Queries should be a string, multiple words are allowed and will lead to an
 * AND based query, e.g. `idx.search('foo bar')` will run a search for
 * documents containing both 'foo' and 'bar'.
 *
 * All query tokens are passed through the same pipeline that document tokens
 * are passed through, so any language processing involved will be run on every
 * query term.
 *
 * Each query term is expanded, so that the term 'he' might be expanded to
 * 'hello' and 'help' if those terms were already included in the index.
 *
 * Matching documents are returned as an array of objects, each object contains
 * the matching document ref, as set for this index, and the similarity score
 * for this document against the query.
 *
 * @param {String} query The query to search the index with.
 * @returns {Object}
 * @see Index.prototype.idf
 * @see Index.prototype.documentVector
 * @memberOf Index
 */
lunr.Index.prototype.search = function (query) {
  var queryTokens = this.pipeline.run(lunr.tokenizer(query)),
      queryVector = new lunr.Vector,
      documentSets = [],
      fieldBoosts = this._fields.reduce(function (memo, f) { return memo + f.boost }, 0)

  var hasSomeToken = queryTokens.some(function (token) {
    return this.tokenStore.has(token)
  }, this)

  if (!hasSomeToken) return []

  queryTokens
    .forEach(function (token, i, tokens) {
      var tf = 1 / tokens.length * this._fields.length * fieldBoosts,
          self = this

      var set = this.tokenStore.expand(token).reduce(function (memo, key) {
        var pos = self.corpusTokens.indexOf(key),
            idf = self.idf(key),
            similarityBoost = 1,
            set = new lunr.SortedSet

        // if the expanded key is not an exact match to the token then
        // penalise the score for this key by how different the key is
        // to the token.
        if (key !== token) {
          var diff = Math.max(3, key.length - token.length)
          similarityBoost = 1 / Math.log(diff)
        }

        // calculate the query tf-idf score for this token
        // applying an similarityBoost to ensure exact matches
        // these rank higher than expanded terms
        if (pos > -1) queryVector.insert(pos, tf * idf * similarityBoost)

        // add all the documents that have this key into a set
        Object.keys(self.tokenStore.get(key)).forEach(function (ref) { set.add(ref) })

        return memo.union(set)
      }, new lunr.SortedSet)

      documentSets.push(set)
    }, this)

  var documentSet = documentSets.reduce(function (memo, set) {
    return memo.intersect(set)
  })

  return documentSet
    .map(function (ref) {
      return { ref: ref, score: queryVector.similarity(this.documentVector(ref)) }
    }, this)
    .sort(function (a, b) {
      return b.score - a.score
    })
}

/**
 * Generates a vector containing all the tokens in the document matching the
 * passed documentRef.
 *
 * The vector contains the tf-idf score for each token contained in the
 * document with the passed documentRef.  The vector will contain an element
 * for every token in the indexes corpus, if the document does not contain that
 * token the element will be 0.
 *
 * @param {Object} documentRef The ref to find the document with.
 * @returns {lunr.Vector}
 * @private
 * @memberOf Index
 */
lunr.Index.prototype.documentVector = function (documentRef) {
  var documentTokens = this.documentStore.get(documentRef),
      documentTokensLength = documentTokens.length,
      documentVector = new lunr.Vector

  for (var i = 0; i < documentTokensLength; i++) {
    var token = documentTokens.elements[i],
        tf = this.tokenStore.get(token)[documentRef].tf,
        idf = this.idf(token)

    documentVector.insert(this.corpusTokens.indexOf(token), tf * idf)
  };

  return documentVector
}

/**
 * Returns a representation of the index ready for serialisation.
 *
 * @returns {Object}
 * @memberOf Index
 */
lunr.Index.prototype.toJSON = function () {
  return {
    version: lunr.version,
    fields: this._fields,
    ref: this._ref,
    documentStore: this.documentStore.toJSON(),
    tokenStore: this.tokenStore.toJSON(),
    corpusTokens: this.corpusTokens.toJSON(),
    pipeline: this.pipeline.toJSON()
  }
}

/**
 * Applies a plugin to the current index.
 *
 * A plugin is a function that is called with the index as its context.
 * Plugins can be used to customise or extend the behaviour the index
 * in some way. A plugin is just a function, that encapsulated the custom
 * behaviour that should be applied to the index.
 *
 * The plugin function will be called with the index as its argument, additional
 * arguments can also be passed when calling use. The function will be called
 * with the index as its context.
 *
 * Example:
 *
 *     var myPlugin = function (idx, arg1, arg2) {
 *       // `this` is the index to be extended
 *       // apply any extensions etc here.
 *     }
 *
 *     var idx = lunr(function () {
 *       this.use(myPlugin, 'arg1', 'arg2')
 *     })
 *
 * @param {Function} plugin The plugin to apply.
 * @memberOf Index
 */
lunr.Index.prototype.use = function (plugin) {
  var args = Array.prototype.slice.call(arguments, 1)
  args.unshift(this)
  plugin.apply(this, args)
}
/*!
 * lunr.Store
 * Copyright (C) 2014 Oliver Nightingale
 */

/**
 * lunr.Store is a simple key-value store used for storing sets of tokens for
 * documents stored in index.
 *
 * @constructor
 * @module
 */
lunr.Store = function () {
  this.store = {}
  this.length = 0
}

/**
 * Loads a previously serialised store
 *
 * @param {Object} serialisedData The serialised store to load.
 * @returns {lunr.Store}
 * @memberOf Store
 */
lunr.Store.load = function (serialisedData) {
  var store = new this

  store.length = serialisedData.length
  store.store = Object.keys(serialisedData.store).reduce(function (memo, key) {
    memo[key] = lunr.SortedSet.load(serialisedData.store[key])
    return memo
  }, {})

  return store
}

/**
 * Stores the given tokens in the store against the given id.
 *
 * @param {Object} id The key used to store the tokens against.
 * @param {Object} tokens The tokens to store against the key.
 * @memberOf Store
 */
lunr.Store.prototype.set = function (id, tokens) {
  this.store[id] = tokens
  this.length = Object.keys(this.store).length
}

/**
 * Retrieves the tokens from the store for a given key.
 *
 * @param {Object} id The key to lookup and retrieve from the store.
 * @returns {Object}
 * @memberOf Store
 */
lunr.Store.prototype.get = function (id) {
  return this.store[id]
}

/**
 * Checks whether the store contains a key.
 *
 * @param {Object} id The id to look up in the store.
 * @returns {Boolean}
 * @memberOf Store
 */
lunr.Store.prototype.has = function (id) {
  return id in this.store
}

/**
 * Removes the value for a key in the store.
 *
 * @param {Object} id The id to remove from the store.
 * @memberOf Store
 */
lunr.Store.prototype.remove = function (id) {
  if (!this.has(id)) return

  delete this.store[id]
  this.length--
}

/**
 * Returns a representation of the store ready for serialisation.
 *
 * @returns {Object}
 * @memberOf Store
 */
lunr.Store.prototype.toJSON = function () {
  return {
    store: this.store,
    length: this.length
  }
}

/*!
 * lunr.stemmer
 * Copyright (C) 2014 Oliver Nightingale
 * Includes code from - http://tartarus.org/~martin/PorterStemmer/js.txt
 */

/**
 * lunr.stemmer is an english language stemmer, this is a JavaScript
 * implementation of the PorterStemmer taken from http://tartaurs.org/~martin
 *
 * @module
 * @param {String} str The string to stem
 * @returns {String}
 * @see lunr.Pipeline
 */
lunr.stemmer = (function(){
  var step2list = {
      "ational" : "ate",
      "tional" : "tion",
      "enci" : "ence",
      "anci" : "ance",
      "izer" : "ize",
      "bli" : "ble",
      "alli" : "al",
      "entli" : "ent",
      "eli" : "e",
      "ousli" : "ous",
      "ization" : "ize",
      "ation" : "ate",
      "ator" : "ate",
      "alism" : "al",
      "iveness" : "ive",
      "fulness" : "ful",
      "ousness" : "ous",
      "aliti" : "al",
      "iviti" : "ive",
      "biliti" : "ble",
      "logi" : "log"
    },

    step3list = {
      "icate" : "ic",
      "ative" : "",
      "alize" : "al",
      "iciti" : "ic",
      "ical" : "ic",
      "ful" : "",
      "ness" : ""
    },

    c = "[^aeiou]",          // consonant
    v = "[aeiouy]",          // vowel
    C = c + "[^aeiouy]*",    // consonant sequence
    V = v + "[aeiou]*",      // vowel sequence

    mgr0 = "^(" + C + ")?" + V + C,               // [C]VC... is m>0
    meq1 = "^(" + C + ")?" + V + C + "(" + V + ")?$",  // [C]VC[V] is m=1
    mgr1 = "^(" + C + ")?" + V + C + V + C,       // [C]VCVC... is m>1
    s_v = "^(" + C + ")?" + v;                   // vowel in stem

  return function (w) {
    var   stem,
      suffix,
      firstch,
      re,
      re2,
      re3,
      re4;

    if (w.length < 3) { return w; }

    firstch = w.substr(0,1);
    if (firstch == "y") {
      w = firstch.toUpperCase() + w.substr(1);
    }

    // Step 1a
    re = /^(.+?)(ss|i)es$/;
    re2 = /^(.+?)([^s])s$/;

    if (re.test(w)) { w = w.replace(re,"$1$2"); }
    else if (re2.test(w)) { w = w.replace(re2,"$1$2"); }

    // Step 1b
    re = /^(.+?)eed$/;
    re2 = /^(.+?)(ed|ing)$/;
    if (re.test(w)) {
      var fp = re.exec(w);
      re = new RegExp(mgr0);
      if (re.test(fp[1])) {
        re = /.$/;
        w = w.replace(re,"");
      }
    } else if (re2.test(w)) {
      var fp = re2.exec(w);
      stem = fp[1];
      re2 = new RegExp(s_v);
      if (re2.test(stem)) {
        w = stem;
        re2 = /(at|bl|iz)$/;
        re3 = new RegExp("([^aeiouylsz])\\1$");
        re4 = new RegExp("^" + C + v + "[^aeiouwxy]$");
        if (re2.test(w)) {  w = w + "e"; }
        else if (re3.test(w)) { re = /.$/; w = w.replace(re,""); }
        else if (re4.test(w)) { w = w + "e"; }
      }
    }

    // Step 1c - replace suffix y or Y by i if preceded by a non-vowel which is not the first letter of the word (so cry -> cri, by -> by, say -> say)
    re = /^(.+?[^aeiou])y$/;
    if (re.test(w)) {
      var fp = re.exec(w);
      stem = fp[1];
      w = stem + "i";
    }

    // Step 2
    re = /^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/;
    if (re.test(w)) {
      var fp = re.exec(w);
      stem = fp[1];
      suffix = fp[2];
      re = new RegExp(mgr0);
      if (re.test(stem)) {
        w = stem + step2list[suffix];
      }
    }

    // Step 3
    re = /^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/;
    if (re.test(w)) {
      var fp = re.exec(w);
      stem = fp[1];
      suffix = fp[2];
      re = new RegExp(mgr0);
      if (re.test(stem)) {
        w = stem + step3list[suffix];
      }
    }

    // Step 4
    re = /^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/;
    re2 = /^(.+?)(s|t)(ion)$/;
    if (re.test(w)) {
      var fp = re.exec(w);
      stem = fp[1];
      re = new RegExp(mgr1);
      if (re.test(stem)) {
        w = stem;
      }
    } else if (re2.test(w)) {
      var fp = re2.exec(w);
      stem = fp[1] + fp[2];
      re2 = new RegExp(mgr1);
      if (re2.test(stem)) {
        w = stem;
      }
    }

    // Step 5
    re = /^(.+?)e$/;
    if (re.test(w)) {
      var fp = re.exec(w);
      stem = fp[1];
      re = new RegExp(mgr1);
      re2 = new RegExp(meq1);
      re3 = new RegExp("^" + C + v + "[^aeiouwxy]$");
      if (re.test(stem) || (re2.test(stem) && !(re3.test(stem)))) {
        w = stem;
      }
    }

    re = /ll$/;
    re2 = new RegExp(mgr1);
    if (re.test(w) && re2.test(w)) {
      re = /.$/;
      w = w.replace(re,"");
    }

    // and turn initial Y back to y

    if (firstch == "y") {
      w = firstch.toLowerCase() + w.substr(1);
    }

    return w;
  }
})();

lunr.Pipeline.registerFunction(lunr.stemmer, 'stemmer')
/*!
 * lunr.stopWordFilter
 * Copyright (C) 2014 Oliver Nightingale
 */

/**
 * lunr.stopWordFilter is an English language stop word list filter, any words
 * contained in the list will not be passed through the filter.
 *
 * This is intended to be used in the Pipeline. If the token does not pass the
 * filter then undefined will be returned.
 *
 * @module
 * @param {String} token The token to pass through the filter
 * @returns {String}
 * @see lunr.Pipeline
 */
lunr.stopWordFilter = function (token) {
  if (lunr.stopWordFilter.stopWords.indexOf(token) === -1) return token
}

lunr.stopWordFilter.stopWords = new lunr.SortedSet
lunr.stopWordFilter.stopWords.length = 119
lunr.stopWordFilter.stopWords.elements = [
  "",
  "a",
  "able",
  "about",
  "across",
  "after",
  "all",
  "almost",
  "also",
  "am",
  "among",
  "an",
  "and",
  "any",
  "are",
  "as",
  "at",
  "be",
  "because",
  "been",
  "but",
  "by",
  "can",
  "cannot",
  "could",
  "dear",
  "did",
  "do",
  "does",
  "either",
  "else",
  "ever",
  "every",
  "for",
  "from",
  "get",
  "got",
  "had",
  "has",
  "have",
  "he",
  "her",
  "hers",
  "him",
  "his",
  "how",
  "however",
  "i",
  "if",
  "in",
  "into",
  "is",
  "it",
  "its",
  "just",
  "least",
  "let",
  "like",
  "likely",
  "may",
  "me",
  "might",
  "most",
  "must",
  "my",
  "neither",
  "no",
  "nor",
  "not",
  "of",
  "off",
  "often",
  "on",
  "only",
  "or",
  "other",
  "our",
  "own",
  "rather",
  "said",
  "say",
  "says",
  "she",
  "should",
  "since",
  "so",
  "some",
  "than",
  "that",
  "the",
  "their",
  "them",
  "then",
  "there",
  "these",
  "they",
  "this",
  "tis",
  "to",
  "too",
  "twas",
  "us",
  "wants",
  "was",
  "we",
  "were",
  "what",
  "when",
  "where",
  "which",
  "while",
  "who",
  "whom",
  "why",
  "will",
  "with",
  "would",
  "yet",
  "you",
  "your"
]

lunr.Pipeline.registerFunction(lunr.stopWordFilter, 'stopWordFilter')
/*!
 * lunr.trimmer
 * Copyright (C) 2014 Oliver Nightingale
 */

/**
 * lunr.trimmer is a pipeline function for trimming non word
 * characters from the begining and end of tokens before they
 * enter the index.
 *
 * This implementation may not work correctly for non latin
 * characters and should either be removed or adapted for use
 * with languages with non-latin characters.
 *
 * @module
 * @param {String} token The token to pass through the filter
 * @returns {String}
 * @see lunr.Pipeline
 */
lunr.trimmer = function (token) {
  return token
    .replace(/^\W+/, '')
    .replace(/\W+$/, '')
}

lunr.Pipeline.registerFunction(lunr.trimmer, 'trimmer')
/*!
 * lunr.stemmer
 * Copyright (C) 2014 Oliver Nightingale
 * Includes code from - http://tartarus.org/~martin/PorterStemmer/js.txt
 */

/**
 * lunr.TokenStore is used for efficient storing and lookup of the reverse
 * index of token to document ref.
 *
 * @constructor
 */
lunr.TokenStore = function () {
  this.root = { docs: {} }
  this.length = 0
}

/**
 * Loads a previously serialised token store
 *
 * @param {Object} serialisedData The serialised token store to load.
 * @returns {lunr.TokenStore}
 * @memberOf TokenStore
 */
lunr.TokenStore.load = function (serialisedData) {
  var store = new this

  store.root = serialisedData.root
  store.length = serialisedData.length

  return store
}

/**
 * Adds a new token doc pair to the store.
 *
 * By default this function starts at the root of the current store, however
 * it can start at any node of any token store if required.
 *
 * @param {String} token The token to store the doc under
 * @param {Object} doc The doc to store against the token
 * @param {Object} root An optional node at which to start looking for the
 * correct place to enter the doc, by default the root of this lunr.TokenStore
 * is used.
 * @memberOf TokenStore
 */
lunr.TokenStore.prototype.add = function (token, doc, root) {
  var root = root || this.root,
      key = token[0],
      rest = token.slice(1)

  if (!(key in root)) root[key] = {docs: {}}

  if (rest.length === 0) {
    root[key].docs[doc.ref] = doc
    this.length += 1
    return
  } else {
    return this.add(rest, doc, root[key])
  }
}

/**
 * Checks whether this key is contained within this lunr.TokenStore.
 *
 * By default this function starts at the root of the current store, however
 * it can start at any node of any token store if required.
 *
 * @param {String} token The token to check for
 * @param {Object} root An optional node at which to start
 * @memberOf TokenStore
 */
lunr.TokenStore.prototype.has = function (token) {
  if (!token) return false

  var node = this.root

  for (var i = 0; i < token.length; i++) {
    if (!node[token[i]]) return false

    node = node[token[i]]
  }

  return true
}

/**
 * Retrieve a node from the token store for a given token.
 *
 * By default this function starts at the root of the current store, however
 * it can start at any node of any token store if required.
 *
 * @param {String} token The token to get the node for.
 * @param {Object} root An optional node at which to start.
 * @returns {Object}
 * @see TokenStore.prototype.get
 * @memberOf TokenStore
 */
lunr.TokenStore.prototype.getNode = function (token) {
  if (!token) return {}

  var node = this.root

  for (var i = 0; i < token.length; i++) {
    if (!node[token[i]]) return {}

    node = node[token[i]]
  }

  return node
}

/**
 * Retrieve the documents for a node for the given token.
 *
 * By default this function starts at the root of the current store, however
 * it can start at any node of any token store if required.
 *
 * @param {String} token The token to get the documents for.
 * @param {Object} root An optional node at which to start.
 * @returns {Object}
 * @memberOf TokenStore
 */
lunr.TokenStore.prototype.get = function (token, root) {
  return this.getNode(token, root).docs || {}
}

lunr.TokenStore.prototype.count = function (token, root) {
  return Object.keys(this.get(token, root)).length
}

/**
 * Remove the document identified by ref from the token in the store.
 *
 * By default this function starts at the root of the current store, however
 * it can start at any node of any token store if required.
 *
 * @param {String} token The token to get the documents for.
 * @param {String} ref The ref of the document to remove from this token.
 * @param {Object} root An optional node at which to start.
 * @returns {Object}
 * @memberOf TokenStore
 */
lunr.TokenStore.prototype.remove = function (token, ref) {
  if (!token) return
  var node = this.root

  for (var i = 0; i < token.length; i++) {
    if (!(token[i] in node)) return
    node = node[token[i]]
  }

  delete node.docs[ref]
}

/**
 * Find all the possible suffixes of the passed token using tokens
 * currently in the store.
 *
 * @param {String} token The token to expand.
 * @returns {Array}
 * @memberOf TokenStore
 */
lunr.TokenStore.prototype.expand = function (token, memo) {
  var root = this.getNode(token),
      docs = root.docs || {},
      memo = memo || []

  if (Object.keys(docs).length) memo.push(token)

  Object.keys(root)
    .forEach(function (key) {
      if (key === 'docs') return

      memo.concat(this.expand(token + key, memo))
    }, this)

  return memo
}

/**
 * Returns a representation of the token store ready for serialisation.
 *
 * @returns {Object}
 * @memberOf TokenStore
 */
lunr.TokenStore.prototype.toJSON = function () {
  return {
    root: this.root,
    length: this.length
  }
}


  /**
   * export the module via AMD, CommonnJS or as a browser global
   * Export code from https://github.com/umdjs/umd/blob/master/returnExports.js
   */
  ;(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
      // AMD. Register as an anonymous module.
      define(factory)
    } else if (typeof exports === 'object') {
      /**
       * Node. Does not work with strict CommonJS, but
       * only CommonJS-like enviroments that support module.exports,
       * like Node.
       */
      module.exports = factory()
    } else {
      // Browser globals (root is window)
      root.lunr = factory()
    }
  }(this, function () {
    /**
     * Just return a value to define the module export.
     * This example returns an object, but the module
     * can return a function as the exported value.
     */
    return lunr
  }))
})()

},{}],25:[function(require,module,exports){
!function(a,b){"function"==typeof define&&define.amd?define(b):"object"==typeof exports?module.exports=b():a.md5=b()}(this,function(){function a(a,b){var g=a[0],h=a[1],i=a[2],j=a[3];g=c(g,h,i,j,b[0],7,-680876936),j=c(j,g,h,i,b[1],12,-389564586),i=c(i,j,g,h,b[2],17,606105819),h=c(h,i,j,g,b[3],22,-1044525330),g=c(g,h,i,j,b[4],7,-176418897),j=c(j,g,h,i,b[5],12,1200080426),i=c(i,j,g,h,b[6],17,-1473231341),h=c(h,i,j,g,b[7],22,-45705983),g=c(g,h,i,j,b[8],7,1770035416),j=c(j,g,h,i,b[9],12,-1958414417),i=c(i,j,g,h,b[10],17,-42063),h=c(h,i,j,g,b[11],22,-1990404162),g=c(g,h,i,j,b[12],7,1804603682),j=c(j,g,h,i,b[13],12,-40341101),i=c(i,j,g,h,b[14],17,-1502002290),h=c(h,i,j,g,b[15],22,1236535329),g=d(g,h,i,j,b[1],5,-165796510),j=d(j,g,h,i,b[6],9,-1069501632),i=d(i,j,g,h,b[11],14,643717713),h=d(h,i,j,g,b[0],20,-373897302),g=d(g,h,i,j,b[5],5,-701558691),j=d(j,g,h,i,b[10],9,38016083),i=d(i,j,g,h,b[15],14,-660478335),h=d(h,i,j,g,b[4],20,-405537848),g=d(g,h,i,j,b[9],5,568446438),j=d(j,g,h,i,b[14],9,-1019803690),i=d(i,j,g,h,b[3],14,-187363961),h=d(h,i,j,g,b[8],20,1163531501),g=d(g,h,i,j,b[13],5,-1444681467),j=d(j,g,h,i,b[2],9,-51403784),i=d(i,j,g,h,b[7],14,1735328473),h=d(h,i,j,g,b[12],20,-1926607734),g=e(g,h,i,j,b[5],4,-378558),j=e(j,g,h,i,b[8],11,-2022574463),i=e(i,j,g,h,b[11],16,1839030562),h=e(h,i,j,g,b[14],23,-35309556),g=e(g,h,i,j,b[1],4,-1530992060),j=e(j,g,h,i,b[4],11,1272893353),i=e(i,j,g,h,b[7],16,-155497632),h=e(h,i,j,g,b[10],23,-1094730640),g=e(g,h,i,j,b[13],4,681279174),j=e(j,g,h,i,b[0],11,-358537222),i=e(i,j,g,h,b[3],16,-722521979),h=e(h,i,j,g,b[6],23,76029189),g=e(g,h,i,j,b[9],4,-640364487),j=e(j,g,h,i,b[12],11,-421815835),i=e(i,j,g,h,b[15],16,530742520),h=e(h,i,j,g,b[2],23,-995338651),g=f(g,h,i,j,b[0],6,-198630844),j=f(j,g,h,i,b[7],10,1126891415),i=f(i,j,g,h,b[14],15,-1416354905),h=f(h,i,j,g,b[5],21,-57434055),g=f(g,h,i,j,b[12],6,1700485571),j=f(j,g,h,i,b[3],10,-1894986606),i=f(i,j,g,h,b[10],15,-1051523),h=f(h,i,j,g,b[1],21,-2054922799),g=f(g,h,i,j,b[8],6,1873313359),j=f(j,g,h,i,b[15],10,-30611744),i=f(i,j,g,h,b[6],15,-1560198380),h=f(h,i,j,g,b[13],21,1309151649),g=f(g,h,i,j,b[4],6,-145523070),j=f(j,g,h,i,b[11],10,-1120210379),i=f(i,j,g,h,b[2],15,718787259),h=f(h,i,j,g,b[9],21,-343485551),a[0]=l(g,a[0]),a[1]=l(h,a[1]),a[2]=l(i,a[2]),a[3]=l(j,a[3])}function b(a,b,c,d,e,f){return b=l(l(b,a),l(d,f)),l(b<<e|b>>>32-e,c)}function c(a,c,d,e,f,g,h){return b(c&d|~c&e,a,c,f,g,h)}function d(a,c,d,e,f,g,h){return b(c&e|d&~e,a,c,f,g,h)}function e(a,c,d,e,f,g,h){return b(c^d^e,a,c,f,g,h)}function f(a,c,d,e,f,g,h){return b(d^(c|~e),a,c,f,g,h)}function g(b){txt="";var c,d=b.length,e=[1732584193,-271733879,-1732584194,271733878];for(c=64;c<=b.length;c+=64)a(e,h(b.substring(c-64,c)));b=b.substring(c-64);var f=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];for(c=0;c<b.length;c++)f[c>>2]|=b.charCodeAt(c)<<(c%4<<3);if(f[c>>2]|=128<<(c%4<<3),c>55)for(a(e,f),c=0;16>c;c++)f[c]=0;return f[14]=8*d,a(e,f),e}function h(a){var b,c=[];for(b=0;64>b;b+=4)c[b>>2]=a.charCodeAt(b)+(a.charCodeAt(b+1)<<8)+(a.charCodeAt(b+2)<<16)+(a.charCodeAt(b+3)<<24);return c}function i(a){for(var b="",c=0;4>c;c++)b+=m[a>>8*c+4&15]+m[a>>8*c&15];return b}function j(a){for(var b=0;b<a.length;b++)a[b]=i(a[b]);return a.join("")}function k(a){return j(g(a))}function l(a,b){return a+b&4294967295}function l(a,b){var c=(65535&a)+(65535&b),d=(a>>16)+(b>>16)+(c>>16);return d<<16|65535&c}var m="0123456789abcdef".split("");return"5d41402abc4b2a76b9719d911017c592"!=k("hello"),k});
},{}],26:[function(require,module,exports){
"use strict";

// Extends method
// (taken from http://code.jquery.com/jquery-1.9.0.js)
// Populate the class2type map
var class2type = {};

var types = [
  "Boolean", "Number", "String", "Function", "Array",
  "Date", "RegExp", "Object", "Error"
];
for (var i = 0; i < types.length; i++) {
  var typename = types[i];
  class2type["[object " + typename + "]"] = typename.toLowerCase();
}

var core_toString = class2type.toString;
var core_hasOwn = class2type.hasOwnProperty;

function type(obj) {
  if (obj === null) {
    return String(obj);
  }
  return typeof obj === "object" || typeof obj === "function" ?
    class2type[core_toString.call(obj)] || "object" :
    typeof obj;
}

function isWindow(obj) {
  return obj !== null && obj === obj.window;
}

function isPlainObject(obj) {
  // Must be an Object.
  // Because of IE, we also have to check the presence of
  // the constructor property.
  // Make sure that DOM nodes and window objects don't pass through, as well
  if (!obj || type(obj) !== "object" || obj.nodeType || isWindow(obj)) {
    return false;
  }

  try {
    // Not own constructor property must be Object
    if (obj.constructor &&
      !core_hasOwn.call(obj, "constructor") &&
      !core_hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
      return false;
    }
  } catch ( e ) {
    // IE8,9 Will throw exceptions on certain host objects #9897
    return false;
  }

  // Own properties are enumerated firstly, so to speed up,
  // if last one is own, then all properties are own.
  var key;
  for (key in obj) {}

  return key === undefined || core_hasOwn.call(obj, key);
}


function isFunction(obj) {
  return type(obj) === "function";
}

var isArray = Array.isArray || function (obj) {
  return type(obj) === "array";
};

function extend() {
  // originally extend() was recursive, but this ended up giving us
  // "call stack exceeded", so it's been unrolled to use a literal stack
  // (see https://github.com/pouchdb/pouchdb/issues/2543)
  var stack = [];
  var i = -1;
  var len = arguments.length;
  var args = new Array(len);
  while (++i < len) {
    args[i] = arguments[i];
  }
  var container = {};
  stack.push({args: args, result: {container: container, key: 'key'}});
  var next;
  while ((next = stack.pop())) {
    extendInner(stack, next.args, next.result);
  }
  return container.key;
}

function extendInner(stack, args, result) {
  var options, name, src, copy, copyIsArray, clone,
    target = args[0] || {},
    i = 1,
    length = args.length,
    deep = false,
    numericStringRegex = /\d+/,
    optionsIsArray;

  // Handle a deep copy situation
  if (typeof target === "boolean") {
    deep = target;
    target = args[1] || {};
    // skip the boolean and the target
    i = 2;
  }

  // Handle case when target is a string or something (possible in deep copy)
  if (typeof target !== "object" && !isFunction(target)) {
    target = {};
  }

  // extend jQuery itself if only one argument is passed
  if (length === i) {
    /* jshint validthis: true */
    target = this;
    --i;
  }

  for (; i < length; i++) {
    // Only deal with non-null/undefined values
    if ((options = args[i]) != null) {
      optionsIsArray = isArray(options);
      // Extend the base object
      for (name in options) {
        //if (options.hasOwnProperty(name)) {
        if (!(name in Object.prototype)) {
          if (optionsIsArray && !numericStringRegex.test(name)) {
            continue;
          }

          src = target[name];
          copy = options[name];

          // Prevent never-ending loop
          if (target === copy) {
            continue;
          }

          // Recurse if we're merging plain objects or arrays
          if (deep && copy && (isPlainObject(copy) ||
              (copyIsArray = isArray(copy)))) {
            if (copyIsArray) {
              copyIsArray = false;
              clone = src && isArray(src) ? src : [];

            } else {
              clone = src && isPlainObject(src) ? src : {};
            }

            // Never move original objects, clone them
            stack.push({
              args: [deep, clone, copy],
              result: {
                container: target,
                key: name
              }
            });

          // Don't bring in undefined values
          } else if (copy !== undefined) {
            if (!(isArray(options) && isFunction(copy))) {
              target[name] = copy;
            }
          }
        }
      }
    }
  }

  // "Return" the modified object by setting the key
  // on the given container
  result.container[result.key] = target;
}


module.exports = extend;



},{}],27:[function(require,module,exports){
'use strict';

var upsert = require('./upsert');
var utils = require('./utils');
var Promise = utils.Promise;

module.exports = function (opts) {
  var sourceDB = opts.db;
  var viewName = opts.viewName;
  var mapFun = opts.map;
  var reduceFun = opts.reduce;
  var temporary = opts.temporary;
  var saveAs = opts.saveAs;

  // the "undefined" part is for backwards compatibility
  var viewSignature = mapFun.toString() + (reduceFun && reduceFun.toString()) +
    'undefined' + (saveAs || '');

  if (!temporary && sourceDB._cachedViews) {
    var cachedView = sourceDB._cachedViews[viewSignature];
    if (cachedView) {
      return Promise.resolve(cachedView);
    }
  }

  return sourceDB.info().then(function (info) {

    var depDbName = info.db_name + '-';
    if (saveAs) {
      depDbName += saveAs;
    } else {
      depDbName += 'mrview-' + (temporary ? 'temp' : utils.MD5(viewSignature));
    }

    function registerMrView() {
      // save the view name in the source PouchDB so it can be cleaned up if necessary
      // (e.g. when the _design doc is deleted, remove all associated view data)
      function diffFunction(doc) {
        doc.views = doc.views || {};
        var fullViewName = viewName;
        if (fullViewName.indexOf('/') === -1) {
          fullViewName = viewName + '/' + viewName;
        }
        var depDbs = doc.views[fullViewName] = doc.views[fullViewName] || {};
        /* istanbul ignore if */
        if (depDbs[depDbName]) {
          return; // no update necessary
        }
        depDbs[depDbName] = true;
        return doc;
      }

      return upsert(sourceDB, '_local/mrviews', diffFunction);
    }

    function registerDependentDb() {
      return sourceDB.registerDependentDatabase(depDbName).then(function (res) {
        var db = res.db;
        db.auto_compaction = true;
        var view = {
          name: depDbName,
          db: db,
          sourceDB: sourceDB,
          adapter: sourceDB.adapter,
          mapFun: mapFun,
          reduceFun: reduceFun
        };
        return view.db.get('_local/lastSeq')["catch"](function (err) {
          /* istanbul ignore if */
          if (err.status !== 404) {
            throw err;
          }
        }).then(function (lastSeqDoc) {
            view.seq = lastSeqDoc ? lastSeqDoc.seq : 0;
            if (!temporary) {
              sourceDB._cachedViews = sourceDB._cachedViews || {};
              sourceDB._cachedViews[viewSignature] = view;
              view.db.on('destroyed', function () {
                delete sourceDB._cachedViews[viewSignature];
              });
            }
            return view;
          });
      });
    }

    return Promise.resolve().then(function () {
      if (viewName) {
        return registerMrView();
      }
      return Promise.resolve();
    }).then(registerDependentDb);
  });
};

},{"./upsert":35,"./utils":36}],28:[function(require,module,exports){
'use strict';

module.exports = function (func, emit, sum, log, isArray, toJSON) {
  /*jshint evil:true,unused:false */
  return eval("'use strict'; (" + func.replace(/;\s*$/, "") + ");");
};

},{}],29:[function(require,module,exports){
var process=require("__browserify_process");'use strict';

var pouchCollate = require('pouchdb-collate');
var TaskQueue = require('./taskqueue');
var collate = pouchCollate.collate;
var toIndexableString = pouchCollate.toIndexableString;
var normalizeKey = pouchCollate.normalizeKey;
var createView = require('./create-view');
var evalFunc = require('./evalfunc');
var log; 
/* istanbul ignore else */
if ((typeof console !== 'undefined') && (typeof console.log === 'function')) {
  log = Function.prototype.bind.call(console.log, console);
} else {
  log = function () {};
}
var utils = require('./utils');
var Promise = utils.Promise;
var persistentQueues = {};
var tempViewQueue = new TaskQueue();
var CHANGES_BATCH_SIZE = 50;

function parseViewName(name) {
  // can be either 'ddocname/viewname' or just 'viewname'
  // (where the ddoc name is the same)
  return name.indexOf('/') === -1 ? [name, name] : name.split('/');
}

function isGenOne(changes) {
  // only return true if the current change is 1-
  // and there are no other leafs
  return changes.length === 1 && /^1-/.test(changes[0].rev);
}

function tryCode(db, fun, args) {
  // emit an event if there was an error thrown by a map/reduce function.
  // putting try/catches in a single function also avoids deoptimizations.
  try {
    return {
      output : fun.apply(null, args)
    };
  } catch (e) {
    db.emit('error', e);
    return {error : e};
  }
}

function sortByKeyThenValue(x, y) {
  var keyCompare = collate(x.key, y.key);
  return keyCompare !== 0 ? keyCompare : collate(x.value, y.value);
}

function sliceResults(results, limit, skip) {
  skip = skip || 0;
  if (typeof limit === 'number') {
    return results.slice(skip, limit + skip);
  } else if (skip > 0) {
    return results.slice(skip);
  }
  return results;
}

function rowToDocId(row) {
  var val = row.value;
  // Users can explicitly specify a joined doc _id, or it
  // defaults to the doc _id that emitted the key/value.
  var docId = (val && typeof val === 'object' && val._id) || row.id;
  return docId;
}

function createBuiltInError(name) {
  var error = new Error('builtin ' + name +
    ' function requires map values to be numbers' +
    ' or number arrays');
  error.name = 'invalid_value';
  error.status = 500;
  return error;
}

function sum(values) {
  var result = 0;
  for (var i = 0, len = values.length; i < len; i++) {
    var num = values[i];
    if (typeof num !== 'number') {
      if (Array.isArray(num)) {
        // lists of numbers are also allowed, sum them separately
        result = typeof result === 'number' ? [result] : result;
        for (var j = 0, jLen = num.length; j < jLen; j++) {
          var jNum = num[j];
          if (typeof jNum !== 'number') {
            throw createBuiltInError('_sum');
          } else if (typeof result[j] === 'undefined') {
            result.push(jNum);
          } else {
            result[j] += jNum;
          }
        }
      } else { // not array/number
        throw createBuiltInError('_sum');
      }
    } else if (typeof result === 'number') {
      result += num;
    } else { // add number to array
      result[0] += num;
    }
  }
  return result;
}

var builtInReduce = {
  _sum: function (keys, values) {
    return sum(values);
  },

  _count: function (keys, values) {
    return values.length;
  },

  _stats: function (keys, values) {
    // no need to implement rereduce=true, because Pouch
    // will never call it
    function sumsqr(values) {
      var _sumsqr = 0;
      for (var i = 0, len = values.length; i < len; i++) {
        var num = values[i];
        _sumsqr += (num * num);
      }
      return _sumsqr;
    }
    return {
      sum     : sum(values),
      min     : Math.min.apply(null, values),
      max     : Math.max.apply(null, values),
      count   : values.length,
      sumsqr : sumsqr(values)
    };
  }
};

function addHttpParam(paramName, opts, params, asJson) {
  // add an http param from opts to params, optionally json-encoded
  var val = opts[paramName];
  if (typeof val !== 'undefined') {
    if (asJson) {
      val = encodeURIComponent(JSON.stringify(val));
    }
    params.push(paramName + '=' + val);
  }
}

function checkQueryParseError(options, fun) {
  var startkeyName = options.descending ? 'endkey' : 'startkey';
  var endkeyName = options.descending ? 'startkey' : 'endkey';

  if (typeof options[startkeyName] !== 'undefined' &&
    typeof options[endkeyName] !== 'undefined' &&
    collate(options[startkeyName], options[endkeyName]) > 0) {
    throw new QueryParseError('No rows can match your key range, reverse your ' +
        'start_key and end_key or set {descending : true}');
  } else if (fun.reduce && options.reduce !== false) {
    if (options.include_docs) {
      throw new QueryParseError('{include_docs:true} is invalid for reduce');
    } else if (options.keys && options.keys.length > 1 &&
        !options.group && !options.group_level) {
      throw new QueryParseError('Multi-key fetches for reduce views must use {group: true}');
    }
  }
  if (options.group_level) {
    if (typeof options.group_level !== 'number') {
      throw new QueryParseError('Invalid value for integer: "' + options.group_level + '"');
    }
    if (options.group_level < 0) {
      throw new QueryParseError('Invalid value for positive integer: ' +
        '"' + options.group_level + '"');
    }
  }
}

function httpQuery(db, fun, opts) {
  // List of parameters to add to the PUT request
  var params = [];
  var body;
  var method = 'GET';

  // If opts.reduce exists and is defined, then add it to the list
  // of parameters.
  // If reduce=false then the results are that of only the map function
  // not the final result of map and reduce.
  addHttpParam('reduce', opts, params);
  addHttpParam('include_docs', opts, params);
  addHttpParam('attachments', opts, params);
  addHttpParam('limit', opts, params);
  addHttpParam('descending', opts, params);
  addHttpParam('group', opts, params);
  addHttpParam('group_level', opts, params);
  addHttpParam('skip', opts, params);
  addHttpParam('stale', opts, params);
  addHttpParam('conflicts', opts, params);
  addHttpParam('startkey', opts, params, true);
  addHttpParam('endkey', opts, params, true);
  addHttpParam('inclusive_end', opts, params);
  addHttpParam('key', opts, params, true);

  // Format the list of parameters into a valid URI query string
  params = params.join('&');
  params = params === '' ? '' : '?' + params;

  // If keys are supplied, issue a POST request to circumvent GET query string limits
  // see http://wiki.apache.org/couchdb/HTTP_view_API#Querying_Options
  if (typeof opts.keys !== 'undefined') {
    var MAX_URL_LENGTH = 2000;
    // according to http://stackoverflow.com/a/417184/680742,
    // the de facto URL length limit is 2000 characters

    var keysAsString =
      'keys=' + encodeURIComponent(JSON.stringify(opts.keys));
    if (keysAsString.length + params.length + 1 <= MAX_URL_LENGTH) {
      // If the keys are short enough, do a GET. we do this to work around
      // Safari not understanding 304s on POSTs (see pouchdb/pouchdb#1239)
      params += (params[0] === '?' ? '&' : '?') + keysAsString;
    } else {
      method = 'POST';
      if (typeof fun === 'string') {
        body = JSON.stringify({keys: opts.keys});
      } else { // fun is {map : mapfun}, so append to this
        fun.keys = opts.keys;
      }
    }
  }

  // We are referencing a query defined in the design doc
  if (typeof fun === 'string') {
    var parts = parseViewName(fun);
    return db.request({
      method: method,
      url: '_design/' + parts[0] + '/_view/' + parts[1] + params,
      body: body
    });
  }

  // We are using a temporary view, terrible for performance but good for testing
  body = body || {};
  Object.keys(fun).forEach(function (key) {
    if (Array.isArray(fun[key])) {
      body[key] = fun[key];
    } else {
      body[key] = fun[key].toString();
    }
  });
  return db.request({
    method: 'POST',
    url: '_temp_view' + params,
    body: body
  });
}

function defaultsTo(value) {
  return function (reason) {
    /* istanbul ignore else */
    if (reason.status === 404) {
      return value;
    } else {
      throw reason;
    }
  };
}

// returns a promise for a list of docs to update, based on the input docId.
// the order doesn't matter, because post-3.2.0, bulkDocs
// is an atomic operation in all three adapters.
function getDocsToPersist(docId, view, docIdsToChangesAndEmits) {
  var metaDocId = '_local/doc_' + docId;
  var defaultMetaDoc = {_id: metaDocId, keys: []};
  var docData = docIdsToChangesAndEmits[docId];
  var indexableKeysToKeyValues = docData.indexableKeysToKeyValues;
  var changes = docData.changes;

  function getMetaDoc() {
    if (isGenOne(changes)) {
      // generation 1, so we can safely assume initial state
      // for performance reasons (avoids unnecessary GETs)
      return Promise.resolve(defaultMetaDoc);
    }
    return view.db.get(metaDocId)["catch"](defaultsTo(defaultMetaDoc));
  }

  function getKeyValueDocs(metaDoc) {
    if (!metaDoc.keys.length) {
      // no keys, no need for a lookup
      return Promise.resolve({rows: []});
    }
    return view.db.allDocs({
      keys: metaDoc.keys,
      include_docs: true
    });
  }

  function processKvDocs(metaDoc, kvDocsRes) {
    var kvDocs = [];
    var oldKeysMap = {};

    for (var i = 0, len = kvDocsRes.rows.length; i < len; i++) {
      var row = kvDocsRes.rows[i];
      var doc = row.doc;
      if (!doc) { // deleted
        continue;
      }
      kvDocs.push(doc);
      oldKeysMap[doc._id] = true;
      doc._deleted = !indexableKeysToKeyValues[doc._id];
      if (!doc._deleted) {
        var keyValue = indexableKeysToKeyValues[doc._id];
        if ('value' in keyValue) {
          doc.value = keyValue.value;
        }
      }
    }

    var newKeys = Object.keys(indexableKeysToKeyValues);
    newKeys.forEach(function (key) {
      if (!oldKeysMap[key]) {
        // new doc
        var kvDoc = {
          _id: key
        };
        var keyValue = indexableKeysToKeyValues[key];
        if ('value' in keyValue) {
          kvDoc.value = keyValue.value;
        }
        kvDocs.push(kvDoc);
      }
    });
    metaDoc.keys = utils.uniq(newKeys.concat(metaDoc.keys));
    kvDocs.push(metaDoc);

    return kvDocs;
  }

  return getMetaDoc().then(function (metaDoc) {
    return getKeyValueDocs(metaDoc).then(function (kvDocsRes) {
      return processKvDocs(metaDoc, kvDocsRes);
    });
  });
}

// updates all emitted key/value docs and metaDocs in the mrview database
// for the given batch of documents from the source database
function saveKeyValues(view, docIdsToChangesAndEmits, seq) {
  var seqDocId = '_local/lastSeq';
  return view.db.get(seqDocId)[
  "catch"](defaultsTo({_id: seqDocId, seq: 0}))
  .then(function (lastSeqDoc) {
    var docIds = Object.keys(docIdsToChangesAndEmits);
    return Promise.all(docIds.map(function (docId) {
      return getDocsToPersist(docId, view, docIdsToChangesAndEmits);
    })).then(function (listOfDocsToPersist) {
      var docsToPersist = utils.flatten(listOfDocsToPersist);
      lastSeqDoc.seq = seq;
      docsToPersist.push(lastSeqDoc);
      // write all docs in a single operation, update the seq once
      return view.db.bulkDocs({docs : docsToPersist});
    });
  });
}

function getQueue(view) {
  var viewName = typeof view === 'string' ? view : view.name;
  var queue = persistentQueues[viewName];
  if (!queue) {
    queue = persistentQueues[viewName] = new TaskQueue();
  }
  return queue;
}

function updateView(view) {
  return utils.sequentialize(getQueue(view), function () {
    return updateViewInQueue(view);
  })();
}

function updateViewInQueue(view) {
  // bind the emit function once
  var mapResults;
  var doc;

  function emit(key, value) {
    var output = {id: doc._id, key: normalizeKey(key)};
    // Don't explicitly store the value unless it's defined and non-null.
    // This saves on storage space, because often people don't use it.
    if (typeof value !== 'undefined' && value !== null) {
      output.value = normalizeKey(value);
    }
    mapResults.push(output);
  }

  var mapFun;
  // for temp_views one can use emit(doc, emit), see #38
  if (typeof view.mapFun === "function" && view.mapFun.length === 2) {
    var origMap = view.mapFun;
    mapFun = function (doc) {
      return origMap(doc, emit);
    };
  } else {
    mapFun = evalFunc(view.mapFun.toString(), emit, sum, log, Array.isArray, JSON.parse);
  }

  var currentSeq = view.seq || 0;

  function processChange(docIdsToChangesAndEmits, seq) {
    return function () {
      return saveKeyValues(view, docIdsToChangesAndEmits, seq);
    };
  }

  var queue = new TaskQueue();
  // TODO(neojski): https://github.com/daleharvey/pouchdb/issues/1521

  return new Promise(function (resolve, reject) {

    function complete() {
      queue.finish().then(function () {
        view.seq = currentSeq;
        resolve();
      });
    }

    function processNextBatch() {
      view.sourceDB.changes({
        conflicts: true,
        include_docs: true,
        style: 'all_docs',
        since: currentSeq,
        limit: CHANGES_BATCH_SIZE
      }).on('complete', function (response) {
        var results = response.results;
        if (!results.length) {
          return complete();
        }
        var docIdsToChangesAndEmits = {};
        for (var i = 0, l = results.length; i < l; i++) {
          var change = results[i];
          if (change.doc._id[0] !== '_') {
            mapResults = [];
            doc = change.doc;

            if (!doc._deleted) {
              tryCode(view.sourceDB, mapFun, [doc]);
            }
            mapResults.sort(sortByKeyThenValue);

            var indexableKeysToKeyValues = {};
            var lastKey;
            for (var j = 0, jl = mapResults.length; j < jl; j++) {
              var obj = mapResults[j];
              var complexKey = [obj.key, obj.id];
              if (obj.key === lastKey) {
                complexKey.push(j); // dup key+id, so make it unique
              }
              var indexableKey = toIndexableString(complexKey);
              indexableKeysToKeyValues[indexableKey] = obj;
              lastKey = obj.key;
            }
            docIdsToChangesAndEmits[change.doc._id] = {
              indexableKeysToKeyValues: indexableKeysToKeyValues,
              changes: change.changes
            };
          }
          currentSeq = change.seq;
        }
        queue.add(processChange(docIdsToChangesAndEmits, currentSeq));
        if (results.length < CHANGES_BATCH_SIZE) {
          return complete();
        }
        return processNextBatch();
      }).on('error', onError);
      /* istanbul ignore next */
      function onError(err) {
        reject(err);
      }
    }

    processNextBatch();
  });
}

function reduceView(view, results, options) {
  if (options.group_level === 0) {
    delete options.group_level;
  }

  var shouldGroup = options.group || options.group_level;

  var reduceFun;
  if (builtInReduce[view.reduceFun]) {
    reduceFun = builtInReduce[view.reduceFun];
  } else {
    reduceFun = evalFunc(
      view.reduceFun.toString(), null, sum, log, Array.isArray, JSON.parse);
  }

  var groups = [];
  var lvl = options.group_level;
  results.forEach(function (e) {
    var last = groups[groups.length - 1];
    var key = shouldGroup ? e.key : null;

    // only set group_level for array keys
    if (shouldGroup && Array.isArray(key) && typeof lvl === 'number') {
      key = key.length > lvl ? key.slice(0, lvl) : key;
    }

    if (last && collate(last.key[0][0], key) === 0) {
      last.key.push([key, e.id]);
      last.value.push(e.value);
      return;
    }
    groups.push({key: [
      [key, e.id]
    ], value: [e.value]});
  });
  for (var i = 0, len = groups.length; i < len; i++) {
    var e = groups[i];
    var reduceTry = tryCode(view.sourceDB, reduceFun, [e.key, e.value, false]);
    // CouchDB typically just sets the value to null if reduce errors out
    e.value = reduceTry.error ? null : reduceTry.output;
    e.key = e.key[0][0];
  }
  // no total_rows/offset when reducing
  return {rows: sliceResults(groups, options.limit, options.skip)};
}

function queryView(view, opts) {
  return utils.sequentialize(getQueue(view), function () {
    return queryViewInQueue(view, opts);
  })();
}

function queryViewInQueue(view, opts) {
  var totalRows;
  var shouldReduce = view.reduceFun && opts.reduce !== false;
  var skip = opts.skip || 0;
  if (typeof opts.keys !== 'undefined' && !opts.keys.length) {
    // equivalent query
    opts.limit = 0;
    delete opts.keys;
  }

  function fetchFromView(viewOpts) {
    viewOpts.include_docs = true;
    return view.db.allDocs(viewOpts).then(function (res) {
      totalRows = res.total_rows;
      return res.rows.map(function (result) {

        // implicit migration - in older versions of PouchDB,
        // we explicitly stored the doc as {id: ..., key: ..., value: ...}
        // this is tested in a migration test
        /* istanbul ignore next */
        if ('value' in result.doc && typeof result.doc.value === 'object' &&
            result.doc.value !== null) {
          var keys = Object.keys(result.doc.value).sort();
          // this detection method is not perfect, but it's unlikely the user
          // emitted a value which was an object with these 3 exact keys
          var expectedKeys = ['id', 'key', 'value'];
          if (!(keys < expectedKeys || keys > expectedKeys)) {
            return result.doc.value;
          }
        }

        var parsedKeyAndDocId = pouchCollate.parseIndexableString(result.doc._id);
        return {
          key: parsedKeyAndDocId[0],
          id: parsedKeyAndDocId[1],
          value: ('value' in result.doc ? result.doc.value : null)
        };
      });
    });
  }

  function onMapResultsReady(rows) {
    var finalResults;
    if (shouldReduce) {
      finalResults = reduceView(view, rows, opts);
    } else {
      finalResults = {
        total_rows: totalRows,
        offset: skip,
        rows: rows
      };
    }
    if (opts.include_docs) {
      var docIds = utils.uniq(rows.map(rowToDocId));

      return view.sourceDB.allDocs({
        keys: docIds,
        include_docs: true,
        conflicts: opts.conflicts,
        attachments: opts.attachments
      }).then(function (allDocsRes) {
        var docIdsToDocs = {};
        allDocsRes.rows.forEach(function (row) {
          if (row.doc) {
            docIdsToDocs['$' + row.id] = row.doc;
          }
        });
        rows.forEach(function (row) {
          var docId = rowToDocId(row);
          var doc = docIdsToDocs['$' + docId];
          if (doc) {
            row.doc = doc;
          }
        });
        return finalResults;
      });
    } else {
      return finalResults;
    }
  }

  var flatten = function (array) {
    return array.reduce(function (prev, cur) {
      return prev.concat(cur);
    });
  };

  if (typeof opts.keys !== 'undefined') {
    var keys = opts.keys;
    var fetchPromises = keys.map(function (key) {
      var viewOpts = {
        startkey : toIndexableString([key]),
        endkey   : toIndexableString([key, {}])
      };
      return fetchFromView(viewOpts);
    });
    return Promise.all(fetchPromises).then(flatten).then(onMapResultsReady);
  } else { // normal query, no 'keys'
    var viewOpts = {
      descending : opts.descending
    };
    if (typeof opts.startkey !== 'undefined') {
      viewOpts.startkey = opts.descending ?
        toIndexableString([opts.startkey, {}]) :
        toIndexableString([opts.startkey]);
    }
    if (typeof opts.endkey !== 'undefined') {
      var inclusiveEnd = opts.inclusive_end !== false;
      if (opts.descending) {
        inclusiveEnd = !inclusiveEnd;
      }

      viewOpts.endkey = toIndexableString(inclusiveEnd ? [opts.endkey, {}] : [opts.endkey]);
    }
    if (typeof opts.key !== 'undefined') {
      var keyStart = toIndexableString([opts.key]);
      var keyEnd = toIndexableString([opts.key, {}]);
      if (viewOpts.descending) {
        viewOpts.endkey = keyStart;
        viewOpts.startkey = keyEnd;
      } else {
        viewOpts.startkey = keyStart;
        viewOpts.endkey = keyEnd;
      }
    }
    if (!shouldReduce) {
      if (typeof opts.limit === 'number') {
        viewOpts.limit = opts.limit;
      }
      viewOpts.skip = skip;
    }
    return fetchFromView(viewOpts).then(onMapResultsReady);
  }
}

function httpViewCleanup(db) {
  return db.request({
    method: 'POST',
    url: '_view_cleanup'
  });
}

function localViewCleanup(db) {
  return db.get('_local/mrviews').then(function (metaDoc) {
    var docsToViews = {};
    Object.keys(metaDoc.views).forEach(function (fullViewName) {
      var parts = parseViewName(fullViewName);
      var designDocName = '_design/' + parts[0];
      var viewName = parts[1];
      docsToViews[designDocName] = docsToViews[designDocName] || {};
      docsToViews[designDocName][viewName] = true;
    });
    var opts = {
      keys : Object.keys(docsToViews),
      include_docs : true
    };
    return db.allDocs(opts).then(function (res) {
      var viewsToStatus = {};
      res.rows.forEach(function (row) {
        var ddocName = row.key.substring(8);
        Object.keys(docsToViews[row.key]).forEach(function (viewName) {
          var fullViewName = ddocName + '/' + viewName;
          /* istanbul ignore if */
          if (!metaDoc.views[fullViewName]) {
            // new format, without slashes, to support PouchDB 2.2.0
            // migration test in pouchdb's browser.migration.js verifies this
            fullViewName = viewName;
          }
          var viewDBNames = Object.keys(metaDoc.views[fullViewName]);
          // design doc deleted, or view function nonexistent
          var statusIsGood = row.doc && row.doc.views && row.doc.views[viewName];
          viewDBNames.forEach(function (viewDBName) {
            viewsToStatus[viewDBName] = viewsToStatus[viewDBName] || statusIsGood;
          });
        });
      });
      var dbsToDelete = Object.keys(viewsToStatus).filter(function (viewDBName) {
        return !viewsToStatus[viewDBName];
      });
      var destroyPromises = dbsToDelete.map(function (viewDBName) {
        return utils.sequentialize(getQueue(viewDBName), function () {
          return db.constructor.destroy(viewDBName, db.__opts);
        })();
      });
      return Promise.all(destroyPromises).then(function () {
        return {ok: true};
      });
    });
  }, defaultsTo({ok: true}));
}

exports._search_viewCleanup = utils.callbackify(function () {
  var db = this;
  if (db.type() === 'http') {
    return httpViewCleanup(db);
  }
  return localViewCleanup(db);
});

function queryTemp(db, fun, opts) {
  checkQueryParseError(opts, fun);

  var createViewOpts = {
    db : db,
    viewName : 'temp_view/temp_view',
    map : fun.map,
    reduce : fun.reduce,
    temporary : true
  };
  tempViewQueue.add(function () {
    return createView(createViewOpts).then(function (view) {
      function cleanup() {
        return view.db.destroy();
      }
      return utils.fin(updateView(view).then(function () {
        return queryView(view, opts);
      }), cleanup);
    });
  });
  return tempViewQueue.finish();
}

function queryPersistent(db, fun, opts) {

  function onViewReady(view) {
    if (opts.stale === 'ok' || opts.stale === 'update_after') {
      if (opts.stale === 'update_after') {
        process.nextTick(function () {
          updateView(view);
        });
      }
      return queryView(view, opts);
    } else { // stale not ok
      return updateView(view).then(function () {
        return queryView(view, opts);
      });
    }
  }
  if (opts.saveAs) {

    var autoOptions = {
      db: db,
      saveAs: opts.saveAs,
      map: fun.map,
      reduce: fun.reduce
    };
    if (opts.destroy) {
      return createView(autoOptions).then(function (view) {
        return view.db.destroy();
      });
    }
    checkQueryParseError(opts, fun);
    return createView(autoOptions).then(onViewReady);
  } else {
    var fullViewName = fun;
    var parts = parseViewName(fullViewName);
    var designDocName = parts[0];
    var viewName = parts[1];
    return db.get('_design/' + designDocName).then(function (doc) {
      var fun = doc.views && doc.views[viewName];

      if (!fun || typeof fun.map !== 'string') {
        throw new NotFoundError('ddoc ' + designDocName + ' has no view named ' +
          viewName);
      }
      checkQueryParseError(opts, fun);

      var createViewOpts = {
        db : db,
        viewName : fullViewName,
        map : fun.map,
        reduce : fun.reduce
      };
      return createView(createViewOpts).then(onViewReady);
    });
  }
}

function queryPromised(db, fun, opts) {
  if (db.type() === 'http') {
    return httpQuery(db, fun, opts);
  }

  if (typeof fun !== 'string' && !opts.saveAs) {
    // temp_view
    return queryTemp(db, fun, opts);
  } else {
    // persistent view
    return queryPersistent(db, fun, opts);
  }
}

exports._search_query = function (fun, opts, callback) {
  if (typeof opts === 'function') {
    callback = opts;
    opts = {};
  }
  opts = utils.extend(true, {}, opts);

  if (typeof fun === 'function') {
    fun = {map : fun};
  }
  if (fun.saveAs) {
    opts.saveAs = fun.saveAs;
    delete fun.saveAs;
  }

  var db = this;
  var promise = Promise.resolve().then(function () {
    return queryPromised(db, fun, opts);
  });
  utils.promisedCallback(promise, callback);
  return promise;
};

function QueryParseError(message) {
  this.status = 400;
  this.name = 'query_parse_error';
  this.message = message;
  this.error = true;
  try {
    Error.captureStackTrace(this, QueryParseError);
  } catch (e) {}
}

utils.inherits(QueryParseError, Error);

function NotFoundError(message) {
  this.status = 404;
  this.name = 'not_found';
  this.message = message;
  this.error = true;
  try {
    Error.captureStackTrace(this, NotFoundError);
  } catch (e) {}
}

utils.inherits(NotFoundError, Error);

},{"./create-view":27,"./evalfunc":28,"./taskqueue":34,"./utils":36,"__browserify_process":4,"pouchdb-collate":30}],30:[function(require,module,exports){
'use strict';

var MIN_MAGNITUDE = -324; // verified by -Number.MIN_VALUE
var MAGNITUDE_DIGITS = 3; // ditto
var SEP = ''; // set to '_' for easier debugging 

var utils = require('./utils');

exports.collate = function (a, b) {

  if (a === b) {
    return 0;
  }

  a = exports.normalizeKey(a);
  b = exports.normalizeKey(b);

  var ai = collationIndex(a);
  var bi = collationIndex(b);
  if ((ai - bi) !== 0) {
    return ai - bi;
  }
  if (a === null) {
    return 0;
  }
  switch (typeof a) {
    case 'number':
      return a - b;
    case 'boolean':
      return a === b ? 0 : (a < b ? -1 : 1);
    case 'string':
      return stringCollate(a, b);
  }
  return Array.isArray(a) ? arrayCollate(a, b) : objectCollate(a, b);
};

// couch considers null/NaN/Infinity/-Infinity === undefined,
// for the purposes of mapreduce indexes. also, dates get stringified.
exports.normalizeKey = function (key) {
  switch (typeof key) {
    case 'undefined':
      return null;
    case 'number':
      if (key === Infinity || key === -Infinity || isNaN(key)) {
        return null;
      }
      return key;
    case 'object':
      var origKey = key;
      if (Array.isArray(key)) {
        var len = key.length;
        key = new Array(len);
        for (var i = 0; i < len; i++) {
          key[i] = exports.normalizeKey(origKey[i]);
        }
      } else if (key instanceof Date) {
        return key.toJSON();
      } else if (key !== null) { // generic object
        key = {};
        for (var k in origKey) {
          if (origKey.hasOwnProperty(k)) {
            var val = origKey[k];
            if (typeof val !== 'undefined') {
              key[k] = exports.normalizeKey(val);
            }
          }
        }
      }
  }
  return key;
};

function indexify(key) {
  if (key !== null) {
    switch (typeof key) {
      case 'boolean':
        return key ? 1 : 0;
      case 'number':
        return numToIndexableString(key);
      case 'string':
        // We've to be sure that key does not contain \u0000
        // Do order-preserving replacements:
        // 0 -> 1, 1
        // 1 -> 1, 2
        // 2 -> 2, 2
        return key
          .replace(/\u0002/g, '\u0002\u0002')
          .replace(/\u0001/g, '\u0001\u0002')
          .replace(/\u0000/g, '\u0001\u0001');
      case 'object':
        var isArray = Array.isArray(key);
        var arr = isArray ? key : Object.keys(key);
        var i = -1;
        var len = arr.length;
        var result = '';
        if (isArray) {
          while (++i < len) {
            result += exports.toIndexableString(arr[i]);
          }
        } else {
          while (++i < len) {
            var objKey = arr[i];
            result += exports.toIndexableString(objKey) +
                exports.toIndexableString(key[objKey]);
          }
        }
        return result;
    }
  }
  return '';
}

// convert the given key to a string that would be appropriate
// for lexical sorting, e.g. within a database, where the
// sorting is the same given by the collate() function.
exports.toIndexableString = function (key) {
  var zero = '\u0000';
  key = exports.normalizeKey(key);
  return collationIndex(key) + SEP + indexify(key) + zero;
};

function parseNumber(str, i) {
  var originalIdx = i;
  var num;
  var zero = str[i] === '1';
  if (zero) {
    num = 0;
    i++;
  } else {
    var neg = str[i] === '0';
    i++;
    var numAsString = '';
    var magAsString = str.substring(i, i + MAGNITUDE_DIGITS);
    var magnitude = parseInt(magAsString, 10) + MIN_MAGNITUDE;
    if (neg) {
      magnitude = -magnitude;
    }
    i += MAGNITUDE_DIGITS;
    while (true) {
      var ch = str[i];
      if (ch === '\u0000') {
        break;
      } else {
        numAsString += ch;
      }
      i++;
    }
    numAsString = numAsString.split('.');
    if (numAsString.length === 1) {
      num = parseInt(numAsString, 10);
    } else {
      num = parseFloat(numAsString[0] + '.' + numAsString[1]);
    }
    if (neg) {
      num = num - 10;
    }
    if (magnitude !== 0) {
      // parseFloat is more reliable than pow due to rounding errors
      // e.g. Number.MAX_VALUE would return Infinity if we did
      // num * Math.pow(10, magnitude);
      num = parseFloat(num + 'e' + magnitude);
    }
  }
  return {num: num, length : i - originalIdx};
}

// move up the stack while parsing
// this function moved outside of parseIndexableString for performance
function pop(stack, metaStack) {
  var obj = stack.pop();

  if (metaStack.length) {
    var lastMetaElement = metaStack[metaStack.length - 1];
    if (obj === lastMetaElement.element) {
      // popping a meta-element, e.g. an object whose value is another object
      metaStack.pop();
      lastMetaElement = metaStack[metaStack.length - 1];
    }
    var element = lastMetaElement.element;
    var lastElementIndex = lastMetaElement.index;
    if (Array.isArray(element)) {
      element.push(obj);
    } else if (lastElementIndex === stack.length - 2) { // obj with key+value
      var key = stack.pop();
      element[key] = obj;
    } else {
      stack.push(obj); // obj with key only
    }
  }
}

exports.parseIndexableString = function (str) {
  var stack = [];
  var metaStack = []; // stack for arrays and objects
  var i = 0;

  while (true) {
    var collationIndex = str[i++];
    if (collationIndex === '\u0000') {
      if (stack.length === 1) {
        return stack.pop();
      } else {
        pop(stack, metaStack);
        continue;
      }
    }
    switch (collationIndex) {
      case '1':
        stack.push(null);
        break;
      case '2':
        stack.push(str[i] === '1');
        i++;
        break;
      case '3':
        var parsedNum = parseNumber(str, i);
        stack.push(parsedNum.num);
        i += parsedNum.length;
        break;
      case '4':
        var parsedStr = '';
        while (true) {
          var ch = str[i];
          if (ch === '\u0000') {
            break;
          }
          parsedStr += ch;
          i++;
        }
        // perform the reverse of the order-preserving replacement
        // algorithm (see above)
        parsedStr = parsedStr.replace(/\u0001\u0001/g, '\u0000')
          .replace(/\u0001\u0002/g, '\u0001')
          .replace(/\u0002\u0002/g, '\u0002');
        stack.push(parsedStr);
        break;
      case '5':
        var arrayElement = { element: [], index: stack.length };
        stack.push(arrayElement.element);
        metaStack.push(arrayElement);
        break;
      case '6':
        var objElement = { element: {}, index: stack.length };
        stack.push(objElement.element);
        metaStack.push(objElement);
        break;
      default:
        throw new Error(
          'bad collationIndex or unexpectedly reached end of input: ' + collationIndex);
    }
  }
};

function arrayCollate(a, b) {
  var len = Math.min(a.length, b.length);
  for (var i = 0; i < len; i++) {
    var sort = exports.collate(a[i], b[i]);
    if (sort !== 0) {
      return sort;
    }
  }
  return (a.length === b.length) ? 0 :
    (a.length > b.length) ? 1 : -1;
}
function stringCollate(a, b) {
  // See: https://github.com/daleharvey/pouchdb/issues/40
  // This is incompatible with the CouchDB implementation, but its the
  // best we can do for now
  return (a === b) ? 0 : ((a > b) ? 1 : -1);
}
function objectCollate(a, b) {
  var ak = Object.keys(a), bk = Object.keys(b);
  var len = Math.min(ak.length, bk.length);
  for (var i = 0; i < len; i++) {
    // First sort the keys
    var sort = exports.collate(ak[i], bk[i]);
    if (sort !== 0) {
      return sort;
    }
    // if the keys are equal sort the values
    sort = exports.collate(a[ak[i]], b[bk[i]]);
    if (sort !== 0) {
      return sort;
    }

  }
  return (ak.length === bk.length) ? 0 :
    (ak.length > bk.length) ? 1 : -1;
}
// The collation is defined by erlangs ordered terms
// the atoms null, true, false come first, then numbers, strings,
// arrays, then objects
// null/undefined/NaN/Infinity/-Infinity are all considered null
function collationIndex(x) {
  var id = ['boolean', 'number', 'string', 'object'];
  var idx = id.indexOf(typeof x);
  //false if -1 otherwise true, but fast!!!!1
  if (~idx) {
    if (x === null) {
      return 1;
    }
    if (Array.isArray(x)) {
      return 5;
    }
    return idx < 3 ? (idx + 2) : (idx + 3);
  }
  if (Array.isArray(x)) {
    return 5;
  }
}

// conversion:
// x yyy zz...zz
// x = 0 for negative, 1 for 0, 2 for positive
// y = exponent (for negative numbers negated) moved so that it's >= 0
// z = mantisse
function numToIndexableString(num) {

  if (num === 0) {
    return '1';
  }

  // convert number to exponential format for easier and
  // more succinct string sorting
  var expFormat = num.toExponential().split(/e\+?/);
  var magnitude = parseInt(expFormat[1], 10);

  var neg = num < 0;

  var result = neg ? '0' : '2';

  // first sort by magnitude
  // it's easier if all magnitudes are positive
  var magForComparison = ((neg ? -magnitude : magnitude) - MIN_MAGNITUDE);
  var magString = utils.padLeft((magForComparison).toString(), '0', MAGNITUDE_DIGITS);

  result += SEP + magString;

  // then sort by the factor
  var factor = Math.abs(parseFloat(expFormat[0])); // [1..10)
  if (neg) { // for negative reverse ordering
    factor = 10 - factor;
  }

  var factorStr = factor.toFixed(20);

  // strip zeros from the end
  factorStr = factorStr.replace(/\.?0+$/, '');

  result += SEP + factorStr;

  return result;
}

},{"./utils":31}],31:[function(require,module,exports){
'use strict';

function pad(str, padWith, upToLength) {
  var padding = '';
  var targetLength = upToLength - str.length;
  while (padding.length < targetLength) {
    padding += padWith;
  }
  return padding;
}

exports.padLeft = function (str, padWith, upToLength) {
  var padding = pad(str, padWith, upToLength);
  return padding + str;
};

exports.padRight = function (str, padWith, upToLength) {
  var padding = pad(str, padWith, upToLength);
  return str + padding;
};

exports.stringLexCompare = function (a, b) {

  var aLen = a.length;
  var bLen = b.length;

  var i;
  for (i = 0; i < aLen; i++) {
    if (i === bLen) {
      // b is shorter substring of a
      return 1;
    }
    var aChar = a.charAt(i);
    var bChar = b.charAt(i);
    if (aChar !== bChar) {
      return aChar < bChar ? -1 : 1;
    }
  }

  if (aLen < bLen) {
    // a is shorter substring of b
    return -1;
  }

  return 0;
};

/*
 * returns the decimal form for the given integer, i.e. writes
 * out all the digits (in base-10) instead of using scientific notation
 */
exports.intToDecimalForm = function (int) {

  var isNeg = int < 0;
  var result = '';

  do {
    var remainder = isNeg ? -Math.ceil(int % 10) : Math.floor(int % 10);

    result = remainder + result;
    int = isNeg ? Math.ceil(int / 10) : Math.floor(int / 10);
  } while (int);


  if (isNeg && result !== '0') {
    result = '-' + result;
  }

  return result;
};
},{}],32:[function(require,module,exports){
var global=typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};'use strict';

var PouchPromise;
/* istanbul ignore next */
if (typeof window !== 'undefined' && window.PouchDB) {
  PouchPromise = window.PouchDB.utils.Promise;
} else {
  PouchPromise = typeof global.Promise === 'function' ? global.Promise : require('lie');
}

// this is essentially the "update sugar" function from daleharvey/pouchdb#1388
// the diffFun tells us what delta to apply to the doc.  it either returns
// the doc, or false if it doesn't need to do an update after all
function upsertInner(db, docId, diffFun) {
  return new PouchPromise(function (fulfill, reject) {
    if (typeof docId !== 'string') {
      return reject(new Error('doc id is required'));
    }

    db.get(docId, function (err, doc) {
      if (err) {
        /* istanbul ignore next */
        if (err.status !== 404) {
          return reject(err);
        }
        doc = {};
      }
      var newDoc = diffFun(doc);
      if (!newDoc) {
        return fulfill({updated: false, rev: doc._rev});
      }
      newDoc._id = docId;
      newDoc._rev = doc._rev;
      fulfill(tryAndPut(db, newDoc, diffFun));
    });
  });
}

function tryAndPut(db, doc, diffFun) {
  return db.put(doc).then(function (res) {
    return {
      updated: true,
      rev: res.rev
    };
  }, function (err) {
    /* istanbul ignore next */
    if (err.status !== 409) {
      throw err;
    }
    return upsertInner(db, doc._id, diffFun);
  });
}

exports.upsert = function upsert(docId, diffFun, cb) {
  var db = this;
  var promise = upsertInner(db, docId, diffFun);
  if (typeof cb !== 'function') {
    return promise;
  }
  promise.then(function (resp) {
    cb(null, resp);
  }, cb);
};

exports.putIfNotExists = function putIfNotExists(docId, doc, cb) {
  var db = this;

  if (typeof docId !== 'string') {
    cb = doc;
    doc = docId;
    docId = doc._id;
  }

  var diffFun = function (existingDoc) {
    if (existingDoc._rev) {
      return false; // do nothing
    }
    return doc;
  };

  var promise = upsertInner(db, docId, diffFun);
  if (typeof cb !== 'function') {
    return promise;
  }
  promise.then(function (resp) {
    cb(null, resp);
  }, cb);
};


/* istanbul ignore next */
if (typeof window !== 'undefined' && window.PouchDB) {
  window.PouchDB.plugin(exports);
}

},{"lie":9}],33:[function(require,module,exports){
/*jshint bitwise:false*/
/*global unescape*/

(function (factory) {
    if (typeof exports === 'object') {
        // Node/CommonJS
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        // AMD
        define(factory);
    } else {
        // Browser globals (with support for web workers)
        var glob;
        try {
            glob = window;
        } catch (e) {
            glob = self;
        }

        glob.SparkMD5 = factory();
    }
}(function (undefined) {

    'use strict';

    ////////////////////////////////////////////////////////////////////////////

    /*
     * Fastest md5 implementation around (JKM md5)
     * Credits: Joseph Myers
     *
     * @see http://www.myersdaily.org/joseph/javascript/md5-text.html
     * @see http://jsperf.com/md5-shootout/7
     */

    /* this function is much faster,
      so if possible we use it. Some IEs
      are the only ones I know of that
      need the idiotic second function,
      generated by an if clause.  */
    var add32 = function (a, b) {
        return (a + b) & 0xFFFFFFFF;
    },

    cmn = function (q, a, b, x, s, t) {
        a = add32(add32(a, q), add32(x, t));
        return add32((a << s) | (a >>> (32 - s)), b);
    },

    ff = function (a, b, c, d, x, s, t) {
        return cmn((b & c) | ((~b) & d), a, b, x, s, t);
    },

    gg = function (a, b, c, d, x, s, t) {
        return cmn((b & d) | (c & (~d)), a, b, x, s, t);
    },

    hh = function (a, b, c, d, x, s, t) {
        return cmn(b ^ c ^ d, a, b, x, s, t);
    },

    ii = function (a, b, c, d, x, s, t) {
        return cmn(c ^ (b | (~d)), a, b, x, s, t);
    },

    md5cycle = function (x, k) {
        var a = x[0],
            b = x[1],
            c = x[2],
            d = x[3];

        a = ff(a, b, c, d, k[0], 7, -680876936);
        d = ff(d, a, b, c, k[1], 12, -389564586);
        c = ff(c, d, a, b, k[2], 17, 606105819);
        b = ff(b, c, d, a, k[3], 22, -1044525330);
        a = ff(a, b, c, d, k[4], 7, -176418897);
        d = ff(d, a, b, c, k[5], 12, 1200080426);
        c = ff(c, d, a, b, k[6], 17, -1473231341);
        b = ff(b, c, d, a, k[7], 22, -45705983);
        a = ff(a, b, c, d, k[8], 7, 1770035416);
        d = ff(d, a, b, c, k[9], 12, -1958414417);
        c = ff(c, d, a, b, k[10], 17, -42063);
        b = ff(b, c, d, a, k[11], 22, -1990404162);
        a = ff(a, b, c, d, k[12], 7, 1804603682);
        d = ff(d, a, b, c, k[13], 12, -40341101);
        c = ff(c, d, a, b, k[14], 17, -1502002290);
        b = ff(b, c, d, a, k[15], 22, 1236535329);

        a = gg(a, b, c, d, k[1], 5, -165796510);
        d = gg(d, a, b, c, k[6], 9, -1069501632);
        c = gg(c, d, a, b, k[11], 14, 643717713);
        b = gg(b, c, d, a, k[0], 20, -373897302);
        a = gg(a, b, c, d, k[5], 5, -701558691);
        d = gg(d, a, b, c, k[10], 9, 38016083);
        c = gg(c, d, a, b, k[15], 14, -660478335);
        b = gg(b, c, d, a, k[4], 20, -405537848);
        a = gg(a, b, c, d, k[9], 5, 568446438);
        d = gg(d, a, b, c, k[14], 9, -1019803690);
        c = gg(c, d, a, b, k[3], 14, -187363961);
        b = gg(b, c, d, a, k[8], 20, 1163531501);
        a = gg(a, b, c, d, k[13], 5, -1444681467);
        d = gg(d, a, b, c, k[2], 9, -51403784);
        c = gg(c, d, a, b, k[7], 14, 1735328473);
        b = gg(b, c, d, a, k[12], 20, -1926607734);

        a = hh(a, b, c, d, k[5], 4, -378558);
        d = hh(d, a, b, c, k[8], 11, -2022574463);
        c = hh(c, d, a, b, k[11], 16, 1839030562);
        b = hh(b, c, d, a, k[14], 23, -35309556);
        a = hh(a, b, c, d, k[1], 4, -1530992060);
        d = hh(d, a, b, c, k[4], 11, 1272893353);
        c = hh(c, d, a, b, k[7], 16, -155497632);
        b = hh(b, c, d, a, k[10], 23, -1094730640);
        a = hh(a, b, c, d, k[13], 4, 681279174);
        d = hh(d, a, b, c, k[0], 11, -358537222);
        c = hh(c, d, a, b, k[3], 16, -722521979);
        b = hh(b, c, d, a, k[6], 23, 76029189);
        a = hh(a, b, c, d, k[9], 4, -640364487);
        d = hh(d, a, b, c, k[12], 11, -421815835);
        c = hh(c, d, a, b, k[15], 16, 530742520);
        b = hh(b, c, d, a, k[2], 23, -995338651);

        a = ii(a, b, c, d, k[0], 6, -198630844);
        d = ii(d, a, b, c, k[7], 10, 1126891415);
        c = ii(c, d, a, b, k[14], 15, -1416354905);
        b = ii(b, c, d, a, k[5], 21, -57434055);
        a = ii(a, b, c, d, k[12], 6, 1700485571);
        d = ii(d, a, b, c, k[3], 10, -1894986606);
        c = ii(c, d, a, b, k[10], 15, -1051523);
        b = ii(b, c, d, a, k[1], 21, -2054922799);
        a = ii(a, b, c, d, k[8], 6, 1873313359);
        d = ii(d, a, b, c, k[15], 10, -30611744);
        c = ii(c, d, a, b, k[6], 15, -1560198380);
        b = ii(b, c, d, a, k[13], 21, 1309151649);
        a = ii(a, b, c, d, k[4], 6, -145523070);
        d = ii(d, a, b, c, k[11], 10, -1120210379);
        c = ii(c, d, a, b, k[2], 15, 718787259);
        b = ii(b, c, d, a, k[9], 21, -343485551);

        x[0] = add32(a, x[0]);
        x[1] = add32(b, x[1]);
        x[2] = add32(c, x[2]);
        x[3] = add32(d, x[3]);
    },

    /* there needs to be support for Unicode here,
       * unless we pretend that we can redefine the MD-5
       * algorithm for multi-byte characters (perhaps
       * by adding every four 16-bit characters and
       * shortening the sum to 32 bits). Otherwise
       * I suggest performing MD-5 as if every character
       * was two bytes--e.g., 0040 0025 = @%--but then
       * how will an ordinary MD-5 sum be matched?
       * There is no way to standardize text to something
       * like UTF-8 before transformation; speed cost is
       * utterly prohibitive. The JavaScript standard
       * itself needs to look at this: it should start
       * providing access to strings as preformed UTF-8
       * 8-bit unsigned value arrays.
       */
    md5blk = function (s) {
        var md5blks = [],
            i; /* Andy King said do it this way. */

        for (i = 0; i < 64; i += 4) {
            md5blks[i >> 2] = s.charCodeAt(i) + (s.charCodeAt(i + 1) << 8) + (s.charCodeAt(i + 2) << 16) + (s.charCodeAt(i + 3) << 24);
        }
        return md5blks;
    },

    md5blk_array = function (a) {
        var md5blks = [],
            i; /* Andy King said do it this way. */

        for (i = 0; i < 64; i += 4) {
            md5blks[i >> 2] = a[i] + (a[i + 1] << 8) + (a[i + 2] << 16) + (a[i + 3] << 24);
        }
        return md5blks;
    },

    md51 = function (s) {
        var n = s.length,
            state = [1732584193, -271733879, -1732584194, 271733878],
            i,
            length,
            tail,
            tmp,
            lo,
            hi;

        for (i = 64; i <= n; i += 64) {
            md5cycle(state, md5blk(s.substring(i - 64, i)));
        }
        s = s.substring(i - 64);
        length = s.length;
        tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (i = 0; i < length; i += 1) {
            tail[i >> 2] |= s.charCodeAt(i) << ((i % 4) << 3);
        }
        tail[i >> 2] |= 0x80 << ((i % 4) << 3);
        if (i > 55) {
            md5cycle(state, tail);
            for (i = 0; i < 16; i += 1) {
                tail[i] = 0;
            }
        }

        // Beware that the final length might not fit in 32 bits so we take care of that
        tmp = n * 8;
        tmp = tmp.toString(16).match(/(.*?)(.{0,8})$/);
        lo = parseInt(tmp[2], 16);
        hi = parseInt(tmp[1], 16) || 0;

        tail[14] = lo;
        tail[15] = hi;

        md5cycle(state, tail);
        return state;
    },

    md51_array = function (a) {
        var n = a.length,
            state = [1732584193, -271733879, -1732584194, 271733878],
            i,
            length,
            tail,
            tmp,
            lo,
            hi;

        for (i = 64; i <= n; i += 64) {
            md5cycle(state, md5blk_array(a.subarray(i - 64, i)));
        }

        // Not sure if it is a bug, however IE10 will always produce a sub array of length 1
        // containing the last element of the parent array if the sub array specified starts
        // beyond the length of the parent array - weird.
        // https://connect.microsoft.com/IE/feedback/details/771452/typed-array-subarray-issue
        a = (i - 64) < n ? a.subarray(i - 64) : new Uint8Array(0);

        length = a.length;
        tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (i = 0; i < length; i += 1) {
            tail[i >> 2] |= a[i] << ((i % 4) << 3);
        }

        tail[i >> 2] |= 0x80 << ((i % 4) << 3);
        if (i > 55) {
            md5cycle(state, tail);
            for (i = 0; i < 16; i += 1) {
                tail[i] = 0;
            }
        }

        // Beware that the final length might not fit in 32 bits so we take care of that
        tmp = n * 8;
        tmp = tmp.toString(16).match(/(.*?)(.{0,8})$/);
        lo = parseInt(tmp[2], 16);
        hi = parseInt(tmp[1], 16) || 0;

        tail[14] = lo;
        tail[15] = hi;

        md5cycle(state, tail);

        return state;
    },

    hex_chr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'],

    rhex = function (n) {
        var s = '',
            j;
        for (j = 0; j < 4; j += 1) {
            s += hex_chr[(n >> (j * 8 + 4)) & 0x0F] + hex_chr[(n >> (j * 8)) & 0x0F];
        }
        return s;
    },

    hex = function (x) {
        var i;
        for (i = 0; i < x.length; i += 1) {
            x[i] = rhex(x[i]);
        }
        return x.join('');
    },

    md5 = function (s) {
        return hex(md51(s));
    },



    ////////////////////////////////////////////////////////////////////////////

    /**
     * SparkMD5 OOP implementation.
     *
     * Use this class to perform an incremental md5, otherwise use the
     * static methods instead.
     */
    SparkMD5 = function () {
        // call reset to init the instance
        this.reset();
    };


    // In some cases the fast add32 function cannot be used..
    if (md5('hello') !== '5d41402abc4b2a76b9719d911017c592') {
        add32 = function (x, y) {
            var lsw = (x & 0xFFFF) + (y & 0xFFFF),
                msw = (x >> 16) + (y >> 16) + (lsw >> 16);
            return (msw << 16) | (lsw & 0xFFFF);
        };
    }


    /**
     * Appends a string.
     * A conversion will be applied if an utf8 string is detected.
     *
     * @param {String} str The string to be appended
     *
     * @return {SparkMD5} The instance itself
     */
    SparkMD5.prototype.append = function (str) {
        // converts the string to utf8 bytes if necessary
        if (/[\u0080-\uFFFF]/.test(str)) {
            str = unescape(encodeURIComponent(str));
        }

        // then append as binary
        this.appendBinary(str);

        return this;
    };

    /**
     * Appends a binary string.
     *
     * @param {String} contents The binary string to be appended
     *
     * @return {SparkMD5} The instance itself
     */
    SparkMD5.prototype.appendBinary = function (contents) {
        this._buff += contents;
        this._length += contents.length;

        var length = this._buff.length,
            i;

        for (i = 64; i <= length; i += 64) {
            md5cycle(this._state, md5blk(this._buff.substring(i - 64, i)));
        }

        this._buff = this._buff.substr(i - 64);

        return this;
    };

    /**
     * Finishes the incremental computation, reseting the internal state and
     * returning the result.
     * Use the raw parameter to obtain the raw result instead of the hex one.
     *
     * @param {Boolean} raw True to get the raw result, false to get the hex result
     *
     * @return {String|Array} The result
     */
    SparkMD5.prototype.end = function (raw) {
        var buff = this._buff,
            length = buff.length,
            i,
            tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            ret;

        for (i = 0; i < length; i += 1) {
            tail[i >> 2] |= buff.charCodeAt(i) << ((i % 4) << 3);
        }

        this._finish(tail, length);
        ret = !!raw ? this._state : hex(this._state);

        this.reset();

        return ret;
    };

    /**
     * Finish the final calculation based on the tail.
     *
     * @param {Array}  tail   The tail (will be modified)
     * @param {Number} length The length of the remaining buffer
     */
    SparkMD5.prototype._finish = function (tail, length) {
        var i = length,
            tmp,
            lo,
            hi;

        tail[i >> 2] |= 0x80 << ((i % 4) << 3);
        if (i > 55) {
            md5cycle(this._state, tail);
            for (i = 0; i < 16; i += 1) {
                tail[i] = 0;
            }
        }

        // Do the final computation based on the tail and length
        // Beware that the final length may not fit in 32 bits so we take care of that
        tmp = this._length * 8;
        tmp = tmp.toString(16).match(/(.*?)(.{0,8})$/);
        lo = parseInt(tmp[2], 16);
        hi = parseInt(tmp[1], 16) || 0;

        tail[14] = lo;
        tail[15] = hi;
        md5cycle(this._state, tail);
    };

    /**
     * Resets the internal state of the computation.
     *
     * @return {SparkMD5} The instance itself
     */
    SparkMD5.prototype.reset = function () {
        this._buff = "";
        this._length = 0;
        this._state = [1732584193, -271733879, -1732584194, 271733878];

        return this;
    };

    /**
     * Releases memory used by the incremental buffer and other aditional
     * resources. If you plan to use the instance again, use reset instead.
     */
    SparkMD5.prototype.destroy = function () {
        delete this._state;
        delete this._buff;
        delete this._length;
    };


    /**
     * Performs the md5 hash on a string.
     * A conversion will be applied if utf8 string is detected.
     *
     * @param {String}  str The string
     * @param {Boolean} raw True to get the raw result, false to get the hex result
     *
     * @return {String|Array} The result
     */
    SparkMD5.hash = function (str, raw) {
        // converts the string to utf8 bytes if necessary
        if (/[\u0080-\uFFFF]/.test(str)) {
            str = unescape(encodeURIComponent(str));
        }

        var hash = md51(str);

        return !!raw ? hash : hex(hash);
    };

    /**
     * Performs the md5 hash on a binary string.
     *
     * @param {String}  content The binary string
     * @param {Boolean} raw     True to get the raw result, false to get the hex result
     *
     * @return {String|Array} The result
     */
    SparkMD5.hashBinary = function (content, raw) {
        var hash = md51(content);

        return !!raw ? hash : hex(hash);
    };

    /**
     * SparkMD5 OOP implementation for array buffers.
     *
     * Use this class to perform an incremental md5 ONLY for array buffers.
     */
    SparkMD5.ArrayBuffer = function () {
        // call reset to init the instance
        this.reset();
    };

    ////////////////////////////////////////////////////////////////////////////

    /**
     * Appends an array buffer.
     *
     * @param {ArrayBuffer} arr The array to be appended
     *
     * @return {SparkMD5.ArrayBuffer} The instance itself
     */
    SparkMD5.ArrayBuffer.prototype.append = function (arr) {
        // TODO: we could avoid the concatenation here but the algorithm would be more complex
        //       if you find yourself needing extra performance, please make a PR.
        var buff = this._concatArrayBuffer(this._buff, arr),
            length = buff.length,
            i;

        this._length += arr.byteLength;

        for (i = 64; i <= length; i += 64) {
            md5cycle(this._state, md5blk_array(buff.subarray(i - 64, i)));
        }

        // Avoids IE10 weirdness (documented above)
        this._buff = (i - 64) < length ? buff.subarray(i - 64) : new Uint8Array(0);

        return this;
    };

    /**
     * Finishes the incremental computation, reseting the internal state and
     * returning the result.
     * Use the raw parameter to obtain the raw result instead of the hex one.
     *
     * @param {Boolean} raw True to get the raw result, false to get the hex result
     *
     * @return {String|Array} The result
     */
    SparkMD5.ArrayBuffer.prototype.end = function (raw) {
        var buff = this._buff,
            length = buff.length,
            tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            i,
            ret;

        for (i = 0; i < length; i += 1) {
            tail[i >> 2] |= buff[i] << ((i % 4) << 3);
        }

        this._finish(tail, length);
        ret = !!raw ? this._state : hex(this._state);

        this.reset();

        return ret;
    };

    SparkMD5.ArrayBuffer.prototype._finish = SparkMD5.prototype._finish;

    /**
     * Resets the internal state of the computation.
     *
     * @return {SparkMD5.ArrayBuffer} The instance itself
     */
    SparkMD5.ArrayBuffer.prototype.reset = function () {
        this._buff = new Uint8Array(0);
        this._length = 0;
        this._state = [1732584193, -271733879, -1732584194, 271733878];

        return this;
    };

    /**
     * Releases memory used by the incremental buffer and other aditional
     * resources. If you plan to use the instance again, use reset instead.
     */
    SparkMD5.ArrayBuffer.prototype.destroy = SparkMD5.prototype.destroy;

    /**
     * Concats two array buffers, returning a new one.
     *
     * @param  {ArrayBuffer} first  The first array buffer
     * @param  {ArrayBuffer} second The second array buffer
     *
     * @return {ArrayBuffer} The new array buffer
     */
    SparkMD5.ArrayBuffer.prototype._concatArrayBuffer = function (first, second) {
        var firstLength = first.length,
            result = new Uint8Array(firstLength + second.byteLength);

        result.set(first);
        result.set(new Uint8Array(second), firstLength);

        return result;
    };

    /**
     * Performs the md5 hash on an array buffer.
     *
     * @param {ArrayBuffer} arr The array buffer
     * @param {Boolean}     raw True to get the raw result, false to get the hex result
     *
     * @return {String|Array} The result
     */
    SparkMD5.ArrayBuffer.hash = function (arr, raw) {
        var hash = md51_array(new Uint8Array(arr));

        return !!raw ? hash : hex(hash);
    };

    return SparkMD5;
}));

},{}],34:[function(require,module,exports){
'use strict';
/*
 * Simple task queue to sequentialize actions. Assumes callbacks will eventually fire (once).
 */

var Promise = require('./utils').Promise;

function TaskQueue() {
  this.promise = new Promise(function (fulfill) {fulfill(); });
}
TaskQueue.prototype.add = function (promiseFactory) {
  this.promise = this.promise["catch"](function () {
    // just recover
  }).then(function () {
    return promiseFactory();
  });
  return this.promise;
};
TaskQueue.prototype.finish = function () {
  return this.promise;
};

module.exports = TaskQueue;

},{"./utils":36}],35:[function(require,module,exports){
'use strict';

var upsert = require('pouchdb-upsert').upsert;

module.exports = function (db, doc, diffFun) {
  return upsert.apply(db, [doc, diffFun]);
};
},{"pouchdb-upsert":32}],36:[function(require,module,exports){
var process=require("__browserify_process"),global=typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};'use strict';
/* istanbul ignore if */
if (typeof global.Promise === 'function') {
  exports.Promise = global.Promise;
} else {
  exports.Promise = require('lie');
}

exports.inherits = require('inherits');
exports.extend = require('pouchdb-extend');
var argsarray = require('argsarray');

exports.promisedCallback = function (promise, callback) {
  if (callback) {
    promise.then(function (res) {
      process.nextTick(function () {
        callback(null, res);
      });
    }, function (reason) {
      process.nextTick(function () {
        callback(reason);
      });
    });
  }
  return promise;
};

exports.callbackify = function (fun) {
  return argsarray(function (args) {
    var cb = args.pop();
    var promise = fun.apply(this, args);
    if (typeof cb === 'function') {
      exports.promisedCallback(promise, cb);
    }
    return promise;
  });
};

// Promise finally util similar to Q.finally
exports.fin = function (promise, cb) {
  return promise.then(function (res) {
    var promise2 = cb();
    if (typeof promise2.then === 'function') {
      return promise2.then(function () {
        return res;
      });
    }
    return res;
  }, function (reason) {
    var promise2 = cb();
    if (typeof promise2.then === 'function') {
      return promise2.then(function () {
        throw reason;
      });
    }
    throw reason;
  });
};

exports.sequentialize = function (queue, promiseFactory) {
  return function () {
    var args = arguments;
    var that = this;
    return queue.add(function () {
      return promiseFactory.apply(that, args);
    });
  };
};

exports.flatten = function (arrs) {
  var res = [];
  for (var i = 0, len = arrs.length; i < len; i++) {
    res = res.concat(arrs[i]);
  }
  return res;
};

// uniq an array of strings, order not guaranteed
// similar to underscore/lodash _.uniq
exports.uniq = function (arr) {
  var map = {};

  for (var i = 0, len = arr.length; i < len; i++) {
    map['$' + arr[i]] = true;
  }

  var keys = Object.keys(map);
  var output = new Array(keys.length);

  for (i = 0, len = keys.length; i < len; i++) {
    output[i] = keys[i].substring(1);
  }
  return output;
};

var crypto = require('crypto');
var Md5 = require('spark-md5');

exports.MD5 = function (string) {
  /* istanbul ignore else */
  if (!process.browser) {
    return crypto.createHash('md5').update(string).digest('hex');
  } else {
    return Md5.hash(string);
  }
};
},{"__browserify_process":4,"argsarray":2,"crypto":3,"inherits":5,"lie":9,"pouchdb-extend":26,"spark-md5":33}],37:[function(require,module,exports){
"use strict"

function unique_pred(list, compare) {
  var ptr = 1
    , len = list.length
    , a=list[0], b=list[0]
  for(var i=1; i<len; ++i) {
    b = a
    a = list[i]
    if(compare(a, b)) {
      if(i === ptr) {
        ptr++
        continue
      }
      list[ptr++] = a
    }
  }
  list.length = ptr
  return list
}

function unique_eq(list) {
  var ptr = 1
    , len = list.length
    , a=list[0], b = list[0]
  for(var i=1; i<len; ++i, b=a) {
    b = a
    a = list[i]
    if(a !== b) {
      if(i === ptr) {
        ptr++
        continue
      }
      list[ptr++] = a
    }
  }
  list.length = ptr
  return list
}

function unique(list, compare, sorted) {
  if(list.length === 0) {
    return list
  }
  if(compare) {
    if(!sorted) {
      list.sort(compare)
    }
    return unique_pred(list, compare)
  }
  if(!sorted) {
    list.sort()
  }
  return unique_eq(list)
}

module.exports = unique

},{}],38:[function(require,module,exports){
var process=require("__browserify_process"),global=typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};'use strict';

var Promise;
/* istanbul ignore next */
if (typeof window !== 'undefined' && window.PouchDB) {
  Promise = window.PouchDB.utils.Promise;
} else {
  Promise = typeof global.Promise === 'function' ? global.Promise : require('lie');
}
/* istanbul ignore next */
exports.once = function (fun) {
  var called = false;
  return exports.getArguments(function (args) {
    if (called) {
      console.trace();
      throw new Error('once called  more than once');
    } else {
      called = true;
      fun.apply(this, args);
    }
  });
};
/* istanbul ignore next */
exports.getArguments = function (fun) {
  return function () {
    var len = arguments.length;
    var args = new Array(len);
    var i = -1;
    while (++i < len) {
      args[i] = arguments[i];
    }
    return fun.call(this, args);
  };
};
/* istanbul ignore next */
exports.toPromise = function (func) {
  //create the function we will be returning
  return exports.getArguments(function (args) {
    var self = this;
    var tempCB = (typeof args[args.length - 1] === 'function') ? args.pop() : false;
    // if the last argument is a function, assume its a callback
    var usedCB;
    if (tempCB) {
      // if it was a callback, create a new callback which calls it,
      // but do so async so we don't trap any errors
      usedCB = function (err, resp) {
        process.nextTick(function () {
          tempCB(err, resp);
        });
      };
    }
    var promise = new Promise(function (fulfill, reject) {
      try {
        var callback = exports.once(function (err, mesg) {
          if (err) {
            reject(err);
          } else {
            fulfill(mesg);
          }
        });
        // create a callback for this invocation
        // apply the function in the orig context
        args.push(callback);
        func.apply(self, args);
      } catch (e) {
        reject(e);
      }
    });
    // if there is a callback, call it back
    if (usedCB) {
      promise.then(function (result) {
        usedCB(null, result);
      }, usedCB);
    }
    promise.cancel = function () {
      return this;
    };
    return promise;
  });
};

exports.inherits = require('inherits');
exports.Promise = Promise;

var crypto = require('crypto');
var md5 = require('md5-jkmyers');
exports.MD5 = function (string) {
  /* istanbul ignore if */
  if (process.browser) {
    return md5(string);
  }
  return crypto.createHash('md5').update(string).digest('hex');
};

exports.extend = require('pouchdb-extend');
},{"__browserify_process":4,"crypto":3,"inherits":5,"lie":9,"md5-jkmyers":25,"pouchdb-extend":26}]},{},[1])
;

