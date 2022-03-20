/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./LabelEnablement","sap/ui/base/Object","sap/ui/performance/trace/Interaction","sap/base/util/uid","sap/ui/util/ActivityDetection","sap/ui/thirdparty/jquery","sap/base/security/encodeXML","sap/base/security/encodeCSS","sap/base/assert","sap/ui/performance/Measurement","sap/base/Log","sap/base/util/extend","./InvisibleRenderer","./Patcher"],function(e,t,r,n,i,s,a,o,l,u,f,d,c,p){"use strict";var h=["renderControl","cleanupControlWithoutRendering","accessibilityState","icon"];var g=["write","writeEscaped","writeAcceleratorKey","writeControlData","writeElementData","writeAttribute","writeAttributeEscaped","addClass","writeClasses","addStyle","writeStyles","writeAccessibilityState","writeIcon","translate","getConfiguration","getHTML"];var m=["openStart","voidStart","attr","class","style","openEnd","voidEnd","text","unsafeHtml","close"];var y=["render","flush","destroy"];var v=document.createElement("template");var b="data-sap-ui-stylekey";function C(){var e=this,n,o,d,E,S,I,P="",R=false,D,T="",M={},H={},_=[],O=new p,j,B;this._setFocusHandler=function(e){l(e&&t.isA(e,"sap.ui.core.FocusHandler"),"oFocusHandler must be an sap.ui.core.FocusHandler");n=e};function L(){l(!(j=B=""));o=e.aBuffer=[];d=e.aRenderedControls=[];E=e.aStyleStack=[{}];D=undefined;R=false;P=""}function k(e,t){l(e&&typeof e=="string"&&/^[a-z_][a-zA-Z0-9_\-]*$/.test(e),"The "+t+" name provided '"+e+"' is not valid; it must contain alphanumeric characters, hyphens or underscores")}function F(e){l(P,"There is no open tag; '"+e+"' must not be called without an open tag")}function U(e){var t=e===undefined?!P:e;l(t,"There is an open tag; '"+P+"' tag has not yet ended with '"+(R?"voidEnd":"openEnd")+"'")}function V(e){k(e,"attr");l((e!="class"||B!="class"&&(B="attr"))&&(e!="style"||j!="style"&&(j="attr")),"Attributes 'class' and 'style' must not be written when the methods with the same name"+" have been called for the same element already")}function q(e){l(B!="attr"&&(B="class"),"Method class() must not be called after the 'class' attribute has been written for the same element");l(typeof e=="string"&&!/\s/.test(e)&&arguments.length===1,"Method 'class' must be called with exactly one class name")}function W(e){l(j!="attr"&&(j="style"),"Method style() must not be called after the 'style' attribute has been written for the same element");l(e&&typeof e=="string"&&!/\s/.test(e),"Method 'style' must be called with a non-empty string name")}this.write=function(e){l(typeof e==="string"||typeof e==="number","sText must be a string or number");o.push.apply(o,arguments);return this};this.writeEscaped=function(e,t){if(e!=null){e=a(String(e));if(t){e=e.replace(/&#xa;/g,"<br>")}o.push(e)}return this};this.writeAttribute=function(e,t){l(typeof e==="string","sName must be a string");l(typeof t==="string"||typeof t==="number"||typeof t==="boolean","value must be a string, number or boolean");o.push(" ",e,'="',t,'"');return this};this.writeAttributeEscaped=function(e,t){l(typeof e==="string","sName must be a string");o.push(" ",e,'="',a(String(t)),'"');return this};this.addStyle=function(e,t){l(typeof e==="string","sName must be a string");if(t!=null&&t!=""){l(typeof t==="string"||typeof t==="number","value must be a string or number");var r=E[E.length-1];if(!r.aStyle){r.aStyle=[]}r.aStyle.push(e+": "+t+";")}return this};this.writeStyles=function(){var e=E[E.length-1];if(e.aStyle&&e.aStyle.length){this.writeAttribute(b,_.push(e.aStyle.join(" "))-1)}e.aStyle=null;return this};this.addClass=function(e){if(e){l(typeof e==="string","sName must be a string");var t=E[E.length-1];if(!t.aClasses){t.aClasses=[]}t.aClasses.push(e)}return this};this.writeClasses=function(e){l(!e||typeof e==="boolean"||t.isA(e,"sap.ui.core.Element"),"oElement must be empty, a boolean, or an sap.ui.core.Element");var r=E[E.length-1];var n;if(e){n=e.aCustomStyleClasses}else if(e===false){n=[]}else{n=r.aCustomStyleClasses}if(r.aClasses||n){var i=[].concat(r.aClasses||[],n||[]);if(i.length){this.writeAttribute("class",i.join(" "))}}if(!e){r.aCustomStyleClasses=null}r.aClasses=null;return this};this.openStart=function(e,t){k(e,"tag");U();l(!(j=B=""));P=e;this.write("<"+e);if(t){if(typeof t=="string"){this.attr("id",t)}else{this.writeElementData(t)}}return this};this.openEnd=function(e){F("openEnd");U(!R);l(e===undefined||e===true,"The private parameter bExludeStyleClasses must be true or omitted!");P="";this.writeClasses(e===true?false:undefined);this.writeStyles();this.write(">");return this};this.close=function(e){k(e,"tag");U();this.write("</"+e+">");return this};this.voidStart=function(e,t){this.openStart(e,t);R=true;return this};this.voidEnd=function(e){F("voidEnd");U(R||!P);R=false;P="";this.writeClasses(e?false:undefined);this.writeStyles();this.write(">");return this};this.unsafeHtml=function(e){U();this.write(e);return this};this.text=function(e){U();this.writeEscaped(e);return this};this.attr=function(e,t){V(e);if(e=="style"){E[E.length-1].aStyle=[t]}else{this.writeAttributeEscaped(e,t)}return this};this.class=function(e){if(e){q.apply(this,arguments);this.addClass(a(e))}return this};this.style=function(e,t){W(e);this.addStyle(e,t);return this};this.accessibilityState=this.writeAccessibilityState;this.icon=this.writeIcon;H.openStart=function(e,t){k(e,"tag");U();l(!(j=B=""));P=e;if(!t){O.openStart(e)}else if(typeof t=="string"){O.openStart(e,t)}else{O.openStart(e,t.getId());N(this,t)}return this};H.voidStart=function(e,t){this.openStart(e,t);R=true;return this};H.attr=function(e,t){V(e);F("attr");O.attr(e,t);return this};H.class=function(e){if(e){q.apply(this,arguments);F("class");O.class(e)}return this};H.style=function(e,t){W(e);F("style");O.style(e,t);return this};H.openEnd=function(e){if(e!==true){var t=E[E.length-1];var r=t.aCustomStyleClasses;if(r){r.forEach(O.class,O);t.aCustomStyleClasses=null}}F("openEnd");U(!R);l(e===undefined||e===true,"The private parameter bExludeStyleClasses must be true or omitted!");P="";O.openEnd();return this};H.voidEnd=function(e){if(!e){var t=E[E.length-1];var r=t.aCustomStyleClasses;if(r){r.forEach(O.class,O);t.aCustomStyleClasses=null}}F("voidEnd");U(R||!P);R=false;P="";O.voidEnd();return this};H.text=function(e){U();if(e!=null){O.text(e)}return this};H.unsafeHtml=function(e){U();O.unsafeHtml(e);return this};H.close=function(e){k(e,"tag");U();O.close(e);return this};function G(e){I=true;try{var t=new s.Event("BeforeRendering");t.srcControl=e;e._handleEvent(t)}finally{I=false}}this.cleanupControlWithoutRendering=function(e){l(!e||t.isA(e,"sap.ui.core.Control"),"oControl must be an sap.ui.core.Control or empty");if(!e){return}var r=e.getDomRef();if(r){G(e);C.preserveContent(r,false,false);if(!r.hasAttribute(A)){e.bOutput=false}}};this.renderControl=function(e){l(!e||t.isA(e,"sap.ui.core.Control"),"oControl must be an sap.ui.core.Control or empty");if(!e){return this}if(!S){S=[]}if(S&&S.length>0){u.pause(S[0]+"---renderControl")}else if(e.getParent()&&e.getParent().getMetadata().getName()=="sap.ui.core.UIArea"){u.pause(e.getParent().getId()+"---rerender")}S.unshift(e.getId());u.start(e.getId()+"---renderControl","Rendering of "+e.getMetadata().getName(),["rendering","control"]);G(e);u.pause(e.getId()+"---renderControl");var r;var i=e.getMetadata();var a=e.getVisible();if(a){r=i.getRenderer()}else{var p=i.getProperty("visible");var h=p&&p._oParent&&p._oParent.getName()=="sap.ui.core.Control";r=h?c:i.getRenderer()}u.resume(e.getId()+"---renderControl");var g=e.aBindParameters,m;if(g&&g.length>0&&(m=e.getDomRef())){var y=s(m);for(var v=0;v<g.length;v++){var b=g[v];y.off(b.sEventType,b.fnProxy)}}if(r&&typeof r.render==="function"){if(o.length){D=false}else if(D===undefined){if(C.getApiVersion(r)==2){m=m||e.getDomRef()||c.getDomRef(e);if(C.isPreservedContent(m)){D=false}else{if(m&&n){n.storePatchingControlFocusInfo(m)}O.setRootNode(m);D=true}}else{D=false}}else if(!T&&D){if(C.getApiVersion(r)!=2){T=e.getId();D=false}}var w={};if(e.aCustomStyleClasses&&e.aCustomStyleClasses.length>0){w.aCustomStyleClasses=e.aCustomStyleClasses}E.push(w);if(D){var A=O.getCurrentNode();r.render(H,e);if(O.getCurrentNode()==A){O.unsafeHtml("",e.getId());e.bOutput=false}else{e.bOutput=true}}else{var I=o.length;r.render(M,e);e.bOutput=o.length!==I}E.pop();if(T&&T===e.getId()){O.unsafeHtml(o.join(""),T,$);T="";D=true;o=[]}}else{f.error("The renderer for class "+i.getName()+" is not defined or does not define a render function! Rendering of "+e.getId()+" will be skipped!")}d.push(e);var P=e.getUIArea();if(P){P._onControlRendered(e)}if(r===c){e.bOutput="invisible"}u.end(e.getId()+"---renderControl");S.shift();if(S&&S.length>0){u.resume(S[0]+"---renderControl")}else if(e.getParent()&&e.getParent().getMetadata().getName()=="sap.ui.core.UIArea"){u.resume(e.getParent().getId()+"---rerender")}return this};this.getHTML=function(e){l(e&&t.isA(e,"sap.ui.core.Control"),"oControl must be an sap.ui.core.Control");var r=o;var n=o=this.aBuffer=[];this.renderControl(e);o=this.aBuffer=r;return n.join("")};function X(e){var t,r=d.length;for(t=0;t<r;t++){d[t]._sapui_bInAfterRenderingPhase=true}I=true;try{for(t=0;t<r;t++){var i=d[t];if(i.bOutput&&i.bOutput!=="invisible"){var a=new s.Event("AfterRendering");a.srcControl=i;u.start(i.getId()+"---AfterRendering","AfterRendering of "+i.getMetadata().getName(),["rendering","after"]);i._handleEvent(a);u.end(i.getId()+"---AfterRendering")}}}finally{for(t=0;t<r;t++){delete d[t]._sapui_bInAfterRenderingPhase}I=false}try{n.restoreFocus(e)}catch(e){f.warning("Problems while restoring the focus after rendering: "+e,null)}for(t=0;t<r;t++){var i=d[t],o=i.aBindParameters,l;if(o&&o.length>0&&(l=i.getDomRef())){var c=s(l);for(var p=0;p<o.length;p++){var h=o[p];c.on(h.sEventType,h.fnProxy)}}}}function z(e,t,r){var s;if(!D){s=n&&n.getControlFocusInfo();var a=o.join("");if(a&&_.length){if(r instanceof SVGElement&&r.localName!="foreignObject"){v.innerHTML="<svg>"+a+"</svg>";v.replaceWith.apply(v.content.firstChild,v.content.firstChild.childNodes)}else{v.innerHTML=a}$(v.content.childNodes);e(v.content)}else{e(a)}}else{var l=O.getRootNode();if(l.nodeType==11){s=n&&n.getControlFocusInfo();e(l.lastChild?l:"")}else{s=n&&n.getPatchingControlFocusInfo()}O.reset()}X(s);L();i.refresh();if(t){t()}}function K(e,t){var r=e.getAttribute(b);if(r!=t){return 0}e.style=_[t];e.removeAttribute(b);return 1}function $(e){if(!_.length){return}var t=0;e.forEach(function(e){if(e.nodeType==1){t+=K(e,t);e.querySelectorAll("["+b+"]").forEach(function(e){t+=K(e,t)})}});_=[]}this.flush=function(e,t,n){l(typeof e==="object"&&e.ownerDocument==document,"oTargetDomNode must be a DOM element");var i=r.notifyAsyncStep();if(!t&&typeof n!=="number"&&!n){C.preserveContent(e)}z(function(t){for(var r=0;r<d.length;r++){var i=d[r].getDomRef();if(i&&!C.isPreservedContent(i)){if(C.isInlineTemplate(i)){s(i).empty()}else{s(i).remove()}}}if(typeof n==="number"){if(n<=0){x(e,"prepend",t)}else{var a=e.children[n-1];if(a){x(a,"after",t)}else{x(e,"append",t)}}}else if(!n){s(e).html(t)}else{x(e,"append",t)}},i,e)};this.render=function(e,n){l(e&&t.isA(e,"sap.ui.core.Control"),"oControl must be a control");l(typeof n==="object"&&n.ownerDocument==document,"oTargetDomNode must be a DOM element");if(I){f.error("Render must not be called within Before or After Rendering Phase. Call ignored.",null,this);return}var i=r.notifyAsyncStep();L();this.renderControl(e);z(function(t){if(e&&n){var r=e.getDomRef();if(!r||C.isPreservedContent(r)){r=c.getDomRef(e)||document.getElementById(w.Dummy+e.getId())}var i=r&&r.parentNode!=n;if(i){if(!C.isPreservedContent(r)){if(C.isInlineTemplate(r)){s(r).empty()}else{s(r).remove()}}if(t){x(n,"append",t)}}else{if(t){if(r){if(C.isInlineTemplate(r)){s(r).html(t)}else{x(r,"after",t);s(r).remove()}}else{x(n,"append",t)}}else{if(C.isInlineTemplate(r)){s(r).empty()}else{if(!e.getParent()||!e.getParent()._onChildRerenderedEmpty||!e.getParent()._onChildRerenderedEmpty(e,r)){s(r).remove()}}}}}},i,n)};this.destroy=function(){L()};var Z={};h.forEach(function(e){M[e]=H[e]=Z[e]=this[e]},this);m.forEach(function(e){M[e]=Z[e]=this[e]},this);g.forEach(function(e){M[e]=Z[e]=this[e]},this);y.forEach(function(e){Z[e]=this[e]},this);this.getRendererInterface=function(){return M};this.getInterface=function(){return Z};L()}C.prototype.getConfiguration=function(){return sap.ui.getCore().getConfiguration()};C.prototype.translate=function(e){};C.prototype.writeAcceleratorKey=function(){return this};C.prototype.writeControlData=function(e){l(e&&t.isA(e,"sap.ui.core.Control"),"oControl must be an sap.ui.core.Control");this.writeElementData(e);return this};C.prototype.writeElementData=function(e){l(e&&t.isA(e,"sap.ui.core.Element"),"oElement must be an sap.ui.core.Element");this.attr("id",e.getId());N(this,e);return this};C.prototype.writeAccessibilityState=function(r,n){if(!sap.ui.getCore().getConfiguration().getAccessibility()){return this}if(arguments.length==1&&!t.isA(r,"sap.ui.core.Element")){n=r;r=null}var i={};if(r!=null){var s=r.getMetadata();var a=function(e,t,n){var a=s.getProperty(e);if(a&&r[a._sGetter]()===n){i[t]="true"}};var o=function(t,n){var a=s.getAssociation(t);if(a&&a.multiple){var o=r[a._sGetter]();if(t=="ariaLabelledBy"){var l=e.getReferencingLabels(r);var u=l.length;if(u){var f=[];for(var d=0;d<u;d++){if(o.indexOf(l[d])<0){f.push(l[d])}}o=f.concat(o)}}if(o.length>0){i[n]=o.join(" ")}}};a("editable","readonly",false);a("enabled","disabled",false);a("visible","hidden",false);if(e.isRequired(r)){i["required"]="true"}a("selected","selected",true);a("checked","checked",true);o("ariaDescribedBy","describedby");o("ariaLabelledBy","labelledby")}if(n){var l=function(e){var t=typeof e;return e===null||t==="number"||t==="string"||t==="boolean"};var u={};var f,d,c;for(f in n){d=n[f];if(l(d)){u[f]=d}else if(typeof d==="object"&&l(d.value)){c="";if(d.append&&(f==="describedby"||f==="labelledby")){c=i[f]?i[f]+" ":""}u[f]=c+d.value}}Object.assign(i,u)}if(t.isA(r,"sap.ui.core.Element")&&r.getParent()&&r.getParent().enhanceAccessibilityState){r.getParent().enhanceAccessibilityState(r,i)}for(var p in i){if(i[p]!=null&&i[p]!==""){this.attr(p==="role"?p:"aria-"+p,i[p])}}return this};C.prototype.writeIcon=function(e,t,r){var i=sap.ui.require("sap/ui/core/IconPool");if(!i){f.warning("Synchronous loading of IconPool due to sap.ui.core.RenderManager#icon call. "+"Ensure that 'sap/ui/core/IconPool is loaded before this function is called","SyncXHR",null,function(){return{type:"SyncXHR",name:"rendermanager-icon"}});i=sap.ui.requireSync("sap/ui/core/IconPool")}var s=i.isIconURI(e),a=false,l,u,c,p,h;if(typeof t==="string"){t=[t]}if(s){u=i.getIconInfo(e);if(!u){f.error("An unregistered icon: "+e+" is used in sap.ui.core.RenderManager's writeIcon method.");return this}if(!t){t=[]}t.push("sapUiIcon");if(!u.suppressMirroring){t.push("sapUiIconMirrorInRTL")}}if(s){this.openStart("span")}else{this.voidStart("img")}if(Array.isArray(t)){t.forEach(function(e){this.class(e)},this)}if(s){c={"data-sap-ui-icon-content":u.content,role:"presentation",title:u.text||null};this.style("font-family","'"+o(u.fontFamily)+"'")}else{c={role:"presentation",alt:"",src:e}}r=d(c,r);if(!r.id){r.id=n()}if(s){p=r.alt||r.title||u.text||u.name;h=r.id+"-label";if(r["aria-labelledby"]){a=true;r["aria-labelledby"]+=" "+h}else if(!r.hasOwnProperty("aria-label")){r["aria-label"]=p}}if(typeof r==="object"){for(l in r){if(r.hasOwnProperty(l)&&r[l]!==null){this.attr(l,r[l])}}}if(s){this.openEnd();if(a){this.openStart("span");this.style("display","none");this.attr("id",h);this.openEnd();this.text(p);this.close("span")}this.close("span")}else{this.voidEnd()}return this};C.prototype.getRenderer=function(e){l(e&&t.isA(e,"sap.ui.core.Control"),"oControl must be an sap.ui.core.Control");return C.getRenderer(e)};var w=C.RenderPrefixes={Invisible:c.PlaceholderPrefix,Dummy:"sap-ui-dummy-",Temporary:"sap-ui-tmp-"};C.getRenderer=function(e){l(e&&t.isA(e,"sap.ui.core.Control"),"oControl must be an sap.ui.core.Control");return e.getMetadata().getRenderer()};C.forceRepaint=function(e){var t=e?window.document.getElementById(e):null;var r=typeof e=="string"?t:e;if(r){f.debug("forcing a repaint for "+(r.id||String(r)));var n=r.style.display;var i=document.activeElement;r.style.display="none";r.offsetHeight;r.style.display=n;if(document.activeElement!==i&&i){i.focus()}}};C.createInvisiblePlaceholderId=function(e){return c.createInvisiblePlaceholderId(e)};var E="sap-ui-preserve",S="sap-ui-static",A="data-sap-ui-preserve",I="data-sap-ui-area";function P(){var e=s(document.getElementById(E));if(e.length===0){e=s("<div></div>",{"aria-hidden":"true",id:E}).addClass("sapUiHidden").addClass("sapUiForcedHidden").css("width","0").css("height","0").css("overflow","hidden").appendTo(document.body)}return e}function R(e){s("<div></div>",{id:w.Dummy+e.id}).addClass("sapUiHidden").insertBefore(e)}var D=[];C.attachPreserveContent=function(e,t){C.detachPreserveContent(e);D.push({fn:e,context:t})};C.detachPreserveContent=function(e){D=D.filter(function(t){return t.fn!==e})};C.preserveContent=function(e,t,r,n){l(typeof e==="object"&&e.ownerDocument==document,"oRootNode must be a DOM element");D.forEach(function(t){t.fn.call(t.context||C,{domNode:e})});var i=P();function a(t){while(t&&t!=e&&t.parentNode){t=t.parentNode;if(t.hasAttribute(A)){return true}if(t.hasAttribute("data-sap-ui")){break}}}function o(e,t,r){if(e===t){return true}for(var n=t.getParent();n;n=n.isA("sap.ui.core.UIComponent")?n.oContainer:n.getParent()){if(n.isA("sap.ui.core.Control")){if(!n.getVisible()){return false}var i=n.getDomRef();if(i&&!i.contains(r)){return false}}if(n===e){return true}}}function f(t){if(t.id===E||t.id===S){return}var l=t.getAttribute(A);if(l){if(n){var u=sap.ui.getCore().byId(l);if(u&&o(n,u,t)){return}}if(t===e||a(t)){R(t)}i.append(t)}else if(r&&t.id){C.markPreservableContent(s(t),t.id);i.append(t);return}if(!t.hasAttribute(I)){var d=t.firstChild;while(d){t=d;d=d.nextSibling;if(t.nodeType===1){f(t)}}}}u.start(e.id+"---preserveContent","preserveContent for "+e.id,["rendering","preserve"]);if(t){f(e)}else{s(e).children().each(function(e,t){f(t)})}u.end(e.id+"---preserveContent")};C.findPreservedContent=function(e){l(typeof e==="string","sId must be a string");var t=P(),r=t.children("["+A+"='"+e.replace(/(:|\.)/g,"\\$1")+"']");return r};C.markPreservableContent=function(e,t){e.attr(A,t)};C.isPreservedContent=function(e){return e&&e.getAttribute(A)&&e.parentNode&&e.parentNode.id==E};C.getPreserveAreaRef=function(){return P()[0]};var T="data-sap-ui-template";C.markInlineTemplate=function(e){e.attr(T,"")};C.isInlineTemplate=function(e){return e&&e.hasAttribute(T)};C.getApiVersion=function(e){if(e.hasOwnProperty("apiVersion")){return e.apiVersion}return 1};function N(e,t){var r=t.getId();e.attr("data-sap-ui",r);if(t.__slot){e.attr("slot",t.__slot)}t.getCustomData().forEach(function(r){var n=r._checkWriteToDom(t);if(n){e.attr(n.key.toLowerCase(),n.value)}});var n=t.getDragDropConfig().some(function(e){return e.isDraggable(t)});if(!n){var i=t.getParent();if(i&&i.getDragDropConfig){n=i.getDragDropConfig().some(function(e){return e.isDraggable(t)})}}if(n){e.attr("draggable","true");e.attr("data-sap-ui-draggable","true")}return this}var M={before:"beforebegin",prepend:"afterbegin",append:"beforeend",after:"afterend"};function x(e,t,r){if(typeof r=="string"){e.insertAdjacentHTML(M[t],r)}else{e[t](r)}}return C},true);