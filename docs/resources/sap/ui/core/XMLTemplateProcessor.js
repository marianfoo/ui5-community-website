/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","sap/ui/base/DataType","sap/ui/base/ManagedObject","sap/ui/core/CustomData","sap/ui/core/Component","./mvc/View","./mvc/ViewType","./mvc/XMLProcessingMode","./mvc/EventHandlerResolver","./ExtensionPoint","./StashedControlSupport","sap/ui/base/SyncPromise","sap/base/Log","sap/base/util/ObjectPath","sap/base/util/values","sap/base/assert","sap/base/security/encodeXML","sap/base/util/LoaderExtensions","sap/base/util/JSTokenizer","sap/base/util/isEmptyObject"],function(e,n,t,r,i,a,o,s,u,l,f,c,p,d,g,m,v,h,w,b){"use strict";function y(e,r,i,a,o){var s=t.bindingParser(r,a,true,false,false,false,o);if(s&&typeof s==="object"){return s}var u=r=typeof s==="string"?s:r;var l=n.getType(e);if(l){if(l instanceof n){u=l.parseValue(r,{context:a,locals:o});if(!l.isValid(u)){p.error("Value '"+r+"' is not valid for type '"+l.getName()+"'.")}}}else{throw new Error("Property "+i+" has unknown type "+e)}return typeof u==="string"?t.bindingParser.escape(u):u}function C(e){return e.localName||e.nodeName}var _="http://www.w3.org/1999/xhtml";var x="http://www.w3.org/2000/xmlns/";var A="http://www.w3.org/2000/svg";var I="sap.ui.core";var M="http://schemas.sap.com/sapui5/extension/sap.ui.core.CustomData/1";var N="http://schemas.sap.com/sapui5/extension/sap.ui.core.support.Support.info/1";var S="http://schemas.sap.com/sapui5/extension/sap.ui.core.xmlcomposite/1";var V="http://schemas.sap.com/sapui5/extension/sap.ui.core.Internal/1";var P="http://schemas.sap.com/sapui5/preprocessorextension/";var E=/^(?:area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)$/;function R(e,n){function t(e,t,r,i,a){var o,s,u=[];for(o=e.firstChild;o;o=o.nextSibling){s=n(e,t,r,o,false,i,a);if(s){u.push(s.unwrap())}}return c.resolve(u)}function r(e,t,r,i,a){var o,s=Promise.resolve(),u=[i];for(o=e.firstChild;o;o=o.nextSibling){s=s.then(n.bind(null,e,t,r,o,false,i,a));u.push(s)}return Promise.all(u)}return e?r:t}var T={};T.loadTemplate=function(e,n){var t=e.replace(/\./g,"/")+("."+(n||"view")+".xml");return h.loadResource(t).documentElement};T.loadTemplatePromise=function(e,n){var t=e.replace(/\./g,"/")+("."+(n||"view")+".xml");return h.loadResource(t,{async:true}).then(function(e){return e.documentElement})};T.parseViewAttributes=function(e,n,t){var r=n.getMetadata().getAllProperties();for(var i=0;i<e.attributes.length;i++){var a=e.attributes[i];if(a.name==="controllerName"){n._controllerName=a.value}else if(a.name==="resourceBundleName"){n._resourceBundleName=a.value}else if(a.name==="resourceBundleUrl"){n._resourceBundleUrl=a.value}else if(a.name==="resourceBundleLocale"){n._resourceBundleLocale=a.value}else if(a.name==="resourceBundleAlias"){n._resourceBundleAlias=a.value}else if(a.name==="class"){n.addStyleClass(a.value)}else if(!t[a.name]&&r[a.name]){t[a.name]=y(r[a.name].type,a.value,a.name,n._oContainingView.oController)}}};T.enrichTemplateIds=function(e,n){T.enrichTemplateIdsPromise(e,n,false);return e};T.enrichTemplateIdsPromise=function(e,n,t){return j(e,n,true,t).then(function(){return e})};T.parseTemplate=function(e,n){return T.parseTemplatePromise(e,n,false).unwrap()};T.parseTemplatePromise=function(e,n,t,r){return j(e,n,false,t,r).then(function(){var e=c.resolve(arguments[0]);if(n.isA("sap.ui.core.Fragment")){return e}var r=arguments;if(n.isA("sap.ui.core.mvc.View")&&n._epInfo&&n._epInfo.all.length>0){e=U(t,n,{content:n._epInfo.all})}return e.then(function(){if(Array.isArray(r[0])){r[0]=r[0].filter(function(e){return e==null||!e._isExtensionPoint})}return r[0]})})};function L(e){var n,t=/^[a-zA-Z_$][a-zA-Z0-9_$]*$/;if(!e||typeof e!=="object"){n="core:require in XMLView can't be parsed to a valid object"}else{Object.keys(e).some(function(r){if(!t.test(r)){n="core:require in XMLView contains invalid identifier: '"+r+"'";return true}if(!e[r]||typeof e[r]!=="string"){n="core:require in XMLView contains invalide value '"+e[r]+"'under key '"+r+"'";return true}})}return n}function O(e,n){var t=e.getAttributeNS(I,"require"),r,i,a;if(t){try{r=w.parseJS(t)}catch(n){p.error("Require attribute can't be parsed on Node: ",e.nodeName);throw n}a=L(r);if(a){throw new Error(a+" on Node: "+e.nodeName)}if(!b(r)){i={};if(n){return new Promise(function(e,n){var t=Object.keys(r).reduce(function(e,n){i[n]=sap.ui.require(r[n]);return e&&i[n]!==undefined},true);if(t){e(i);return}sap.ui.require(g(r),function(){var n=arguments;Object.keys(r).forEach(function(e,t){i[e]=n[t]});e(i)},n)})}else{Object.keys(r).forEach(function(e){i[e]=sap.ui.requireSync(r[e])});return c.resolve(i)}}}}function U(e,n,t){var r=c.resolve();if(!b(t)){var i=[];var a;if(e){r=new Promise(function(e){a=e})}Object.keys(t).forEach(function(e){var r=t[e];r.forEach(function(e){e.targetControl=n;var t=sap.ui.require(e.providerClass);if(t){i.push(t.applyExtensionPoint(e))}else{var r=new Promise(function(n,t){sap.ui.require([e.providerClass],function(e){n(e)},t)}).then(function(n){return n.applyExtensionPoint(e)});i.push(r)}})});if(e){Promise.all(i).then(a)}}return r}function q(e,n,t){var r=t;for(var i=0;i<100;i++){var a=e.lookupNamespaceURI(r);if(a==null||a===n){return r}r=t+i}throw new Error("Could not find an unused namespace prefix after 100 tries, giving up")}function j(n,g,v,h,w){var L=[],j=q(n,V,"__ui5"),X=O(n,h)||c.resolve(),k={openStart:function(e,n){L.push(["openStart",[e,n]])},voidStart:function(e,n){L.push(["voidStart",[e,n]])},style:function(e,n){L.push(["style",[e,n]])},class:function(e){L.push(["class",[e]])},attr:function(e,n){L.push(["attr",[e,n]])},openEnd:function(){L.push(["openEnd"])},voidEnd:function(){L.push(["voidEnd"])},text:function(e){L.push(["text",[e]])},unsafeHtml:function(e){L.push(["unsafeHtml",[e]])},close:function(e){L.push(["close",[e]])},renderControl:function(e){L.push(X)}};h=h&&!!g._sProcessingMode;p.debug("XML processing mode is "+(g._sProcessingMode||"default")+".","","XMLTemplateProcessor");p.debug("XML will be processed "+h?"asynchronously":"synchronously"+".","","XMLTemplateProcessor");var B=sap.ui.getCore().getConfiguration().getDesignMode();if(B){g._sapui_declarativeSourceInfo={xmlNode:n,xmlRootNode:g._oContainingView===g?n:g._oContainingView._sapui_declarativeSourceInfo.xmlRootNode}}var W=g.sViewName||g._sFragmentName;if(!W){var F=g;var D=0;while(++D<1e3&&F&&F!==F._oContainingView){F=F._oContainingView}W=F.sViewName}if(g.isSubView()){Z(n,true,false,X)}else{if(n.localName==="View"&&n.namespaceURI!=="sap.ui.core.mvc"){p.warning("XMLView root node must have the 'sap.ui.core.mvc' namespace, not '"+n.namespaceURI+"'"+(W?" (View name: "+W+")":""))}n.setAttributeNS(x,"xmlns:"+j,V);G(n,false,false,X)}var H=0;function K(){for(;H<L.length;H++){var e=L[H];if(e&&typeof e.then==="function"){return e.then($).then(K)}}return L}function $(e){var n=[H,1].concat(e);Array.prototype.splice.apply(L,n)}return X.then(K);function z(e){return e}function J(e){return g._oContainingView.createId(e)}function Z(e,n,t,r){if(e.nodeType===1){var i=C(e);var a=e.namespaceURI===_;if(a||e.namespaceURI===A){var o=e.getAttribute("id");if(o==null){o=n===true?g.getId():undefined}else{o=re(g,e)}if(i==="style"){var s=e.attributes;var u=e.textContent;e=document.createElement(i);e.textContent=u;for(var l=0;l<s.length;l++){var f=s[l];if(!f.prefix){e.setAttribute(f.name,f.value)}}if(o!=null){e.setAttribute("id",o)}if(n===true){e.setAttribute("data-sap-ui-preserve",g.getId())}k.unsafeHtml(e.outerHTML);return}var c=E.test(i);if(c){k.voidStart(i,o)}else{k.openStart(i,o)}for(var d=0;d<e.attributes.length;d++){var m=e.attributes[d];if(m.name!=="id"){k.attr(a?m.name.toLowerCase():m.name,m.value)}}if(n===true){k.attr("data-sap-ui-preserve",g.getId())}if(c){k.voidEnd();if(e.firstChild){p.error("Content of void HTML element '"+i+"' will be ignored")}}else{k.openEnd();var v=e instanceof HTMLTemplateElement?e.content:e;G(v,false,false,r);k.close(i)}}else if(i==="FragmentDefinition"&&e.namespaceURI===I){G(e,false,true,r)}else{X=X.then(function(){return ee(e,r).then(function(e){for(var n=0;n<e.length;n++){var t=e[n];if(g.getMetadata().hasAggregation("content")){g._epInfo=g._epInfo||{contentControlsCount:0,last:null,all:[]};if(t._isExtensionPoint){t.index=g._epInfo.contentControlsCount;t.targetControl=g;t.aggregationName="content";if(g._epInfo.last){g._epInfo.last._nextSibling=t}g._epInfo.last=t;g._epInfo.all.push(t)}else{g._epInfo.contentControlsCount++;g.addAggregation("content",t)}}else if(g.getMetadata().hasAssociation("content")){g.addAssociation("content",t)}}return e})});k.renderControl(X)}}else if(e.nodeType===3&&!t){k.text(e.textContent)}}function G(e,n,t,r){var i=e.childNodes;for(var a=0;a<i.length;a++){Z(i[a],n,t,r)}}function Q(n,t){var r;var i=sap.ui.getCore().getLoadedLibraries();e.each(i,function(e,i){if(n===i.namespace||n===i.name){r=i.name+"."+(i.tagNames&&i.tagNames[t]||t)}});r=r||n+"."+t;function a(e){if(!e){p.error("Control '"+r+"' did not return a class definition from sap.ui.define.","","XMLTemplateProcessor");e=d.get(r)}if(!e){p.error("Can't find object class '"+r+"' for XML-view","","XMLTemplateProcessor")}return e}var o=r.replace(/\./g,"/");var s=sap.ui.require(o);if(!s){if(h){return new Promise(function(e,n){sap.ui.require([o],function(n){n=a(n);e(n)},n)})}else{s=sap.ui.requireSync(o);s=a(s)}}return s}function Y(e,n,t){if(e.namespaceURI===_||e.namespaceURI===A){var r=e.attributes["id"]?e.attributes["id"].textContent||e.attributes["id"].text:null;if(v){return T.enrichTemplateIdsPromise(e,g,h).then(function(){return[]})}else{var i=function(n){var t={id:r?re(g,e,r):undefined,xmlNode:e,containingView:g._oContainingView,processingMode:g._sProcessingMode};if(g.fnScopedRunWithOwner){return g.fnScopedRunWithOwner(function(){return new n(t)})}return new n(t)};if(h){return new Promise(function(e,n){sap.ui.require(["sap/ui/core/mvc/XMLView"],function(n){e([i(n)])},n)})}else{var a=sap.ui.requireSync("sap/ui/core/mvc/XMLView");return c.resolve([i(a)])}}}else{return ee(e,n,t)}}function ee(e,n,t){if(C(e)==="ExtensionPoint"&&e.namespaceURI===I){if(v){return c.resolve([])}else{var r=g instanceof a?g._oContainingView:g;var i=l._factory.bind(null,r,e.getAttribute("name"),function(){var r=c.resolve();var i=[];var a=e.childNodes;for(var o=0;o<a.length;o++){var s=a[o];if(s.nodeType===1){r=r.then(Y.bind(null,s,n,t));i.push(r)}}return c.all(i).then(function(e){var n=[];e.forEach(function(e){n=n.concat(e)});return n})},undefined,undefined,h);return c.resolve(g.fnScopedRunWithOwner?g.fnScopedRunWithOwner(i):i())}}else{var o=Q(e.namespaceURI,C(e));if(o&&typeof o.then==="function"){return o.then(function(r){return ne(e,r,n,t)})}else{return ne(e,o,n,t)}}}function ne(e,n,l,d){var _=e.namespaceURI,x={},A={},E="",L=[],q=null,j=null,X=e.getAttribute("stashed")==="true";if(!v){e.removeAttribute("stashed")}if(!n){return c.resolve([])}var k=n.getMetadata();var W=k.getAllSettings();var F=O(e,h);if(F){l=c.all([l,F]).then(function(e){return Object.assign({},e[0],e[1])})}l=l.then(function(i){if(b(i)){i=null}if(!v){for(var a=0;a<e.attributes.length;a++){var o=e.attributes[a],s=o.name,l=o.namespaceURI,f=W[s],c=o.value;if(s==="id"){x[s]=re(g,e,c)}else if(s==="class"){E+=c}else if(s==="viewName"){x[s]=c}else if(s==="fragmentName"){x[s]=c;x["containingView"]=g._oContainingView}else if(s==="binding"&&!f||s==="objectBindings"){if(!X){var d=t.bindingParser(c,g._oContainingView.oController);if(d){x.objectBindings=x.objectBindings||{};x.objectBindings[d.model||undefined]=d}}}else if(s==="metadataContexts"){if(!X){var h=null;try{h=T._calculatedModelMapping(c,g._oContainingView.oController,true)}catch(e){p.error(g+":"+e.message)}if(h){x.metadataContexts=h;if(T._preprocessMetadataContexts){T._preprocessMetadataContexts(n.getMetadata().getName(),x,g._oContainingView.oController)}}}}else if(s.indexOf(":")>-1){l=o.namespaceURI;if(l===M){var w=C(o);L.push(new r({key:w,value:y("any",c,w,g._oContainingView.oController,i)}))}else if(l===N){j=c}else if(l&&l.startsWith(P)){p.debug(g+": XMLView parser ignored preprocessor attribute '"+s+"' (value: '"+c+"')")}else if(l===V&&C(o)==="invisible"){f=W.visible;if(f&&f._iKind===0&&f.type==="boolean"){x.visible=false}}else if(l===I||l===V||s.startsWith("xmlns:")){}else{if(!q){q={}}if(!q.hasOwnProperty(o.namespaceURI)){q[o.namespaceURI]={}}q[o.namespaceURI][C(o)]=o.nodeValue;p.debug(g+": XMLView parser encountered unknown attribute '"+s+"' (value: '"+c+"') with unknown namespace, stored as sap-ui-custom-settings of customData")}}else if(f&&f._iKind===0){x[s]=y(f.type,c,s,g._oContainingView.oController,i)}else if(f&&f._iKind===1&&f.altTypes){if(!X){x[s]=y(f.altTypes[0],c,s,g._oContainingView.oController,i)}}else if(f&&f._iKind===2){if(!X){var d=t.bindingParser(c,g._oContainingView.oController,false,false,false,false,i);if(d){x[s]=d}else{p.error(g+": aggregations with cardinality 0..n only allow binding paths as attribute value (wrong value: "+s+"='"+c+"')")}}}else if(f&&f._iKind===3){if(!X){x[s]=J(c)}}else if(f&&f._iKind===4){if(!X){x[s]=c.split(/[\s,]+/g).filter(z).map(J)}}else if(f&&f._iKind===5){if(!X){var _=[];u.parse(c).forEach(function(e){var n=u.resolveEventHandler(e,g._oContainingView.oController,i);if(n){_.push(n)}else{p.warning(g+': event handler function "'+e+'" is not a function or does not exist in the controller.')}});if(_.length){x[s]=_}}}else if(f&&f._iKind===-1){if(k.isA("sap.ui.core.mvc.View")&&s=="async"){x[s]=y(f.type,c,s,g._oContainingView.oController,i)}else{p.warning(g+": setting '"+s+"' for class "+k.getName()+" (value:'"+c+"') is not supported")}}else{m(s==="xmlns",g+": encountered unknown setting '"+s+"' for class "+k.getName()+" (value:'"+c+"')");if(T._supportInfo){T._supportInfo({context:e,env:{caller:"createRegularControls",error:true,info:"unknown setting '"+s+"' for class "+k.getName()}})}}}if(q){L.push(new r({key:"sap-ui-custom-settings",value:q}))}if(L.length>0){x.customData=L}}return i}).catch(function(n){if(!n.isEnriched){var t=g.getMetadata().isA("sap.ui.core.mvc.View")?"View":"Fragment";var r=e&&e.cloneNode(false).outerHTML;n=new Error("Error found in "+t+" (id: '"+g.getId()+"').\nXML node: '"+r+"':\n"+n);n.isEnriched=true;p.error(n)}if(h&&g._sProcessingMode!==s.SequentialLegacy){throw n}});var D=R(h,H);function H(e,n,t,r,i,a,o){var s,u;if(r.nodeType===1){if(r.namespaceURI===S){x[C(r)]=r.querySelector("*");return}s=r.namespaceURI===_&&t&&t[C(r)];if(s){return D(r,s,false,a,o)}else if(n){if(!i&&r.getAttribute("stashed")==="true"&&!v){var l=r;r=r.cloneNode();l.removeAttribute("stashed");u=function(){var i=re(g,r);f.createStashedControl({wrapperId:i,fnCreate:function(){var r=h;h=false;try{return H(e,n,t,l,true,a,o).unwrap()}finally{h=r}}})};if(g.fnScopedRunWithOwner){g.fnScopedRunWithOwner(u)}else{u()}r.removeAttribute("visible");te(r,"invisible")}if(x[n.name]&&x[n.name].path&&typeof x[n.name].path==="string"){o={aggregation:n.name,id:x.id}}return Y(r,a,o).then(function(e){for(var t=0;t<e.length;t++){var r=e[t];var i=n.name;if(r._isExtensionPoint){if(!x[i]){x[i]=[]}var a=A[i];if(!a){a=A[i]=[]}r.index=x[i].length;r.aggregationName=i;r.closestAggregationBindingCarrier=o&&o.id;r.closestAggregationBinding=o&&o.aggregation;var s=a[a.length-1];if(s){s._nextSibling=r}a.push(r)}else if(n.multiple){if(!x[i]){x[i]=[]}if(typeof x[i].path==="string"){m(!x[i].template,"list bindings support only a single template object");x[i].template=r}else{x[i].push(r)}}else{m(!x[i],"multiple aggregates defined for aggregation with cardinality 0..1");x[i]=r}}return e})}else if(C(e)!=="FragmentDefinition"||e.namespaceURI!==I){throw new Error("Cannot add direct child without default aggregation defined for control "+k.getElementName())}}else if(r.nodeType===3){var c=r.textContent||r.text;if(c&&c.trim()){throw new Error("Cannot add text nodes as direct child of an aggregation. For adding text to an aggregation, a surrounding html tag is needed: "+c.trim())}}}var K=k.getDefaultAggregation();var $=k.getAllAggregations();return D(e,K,$,l,d).then(function(){var t;var r=c.resolve();var s=c.resolve();var u=e.getAttribute("type");var l=i.getOwnerComponentFor(g);var f=l&&l.isA("sap.ui.core.IAsyncContentCreation");if(v&&e.hasAttribute("id")){ie(g,e)}else if(!v){if(n.getMetadata().isA("sap.ui.core.mvc.View")){var p=function(){if(!n._sType&&!x.viewName){x.viewName="module:"+n.getMetadata().getName().replace(/\./g,"/")}if(f&&h){if(x.async===false){throw new Error("A nested view contained in a Component implementing 'sap.ui.core.IAsyncContentCreation' is processed asynchronously by default and cannot be processed synchronously.\n"+"Affected Component '"+l.getMetadata().getComponentName()+"' and View '"+x.viewName+"'.")}x.type=n._sType||u;s=a.create(x)}else{if(n.getMetadata().isA("sap.ui.core.mvc.XMLView")&&g._sProcessingMode){x.processingMode=g._sProcessingMode}return a._create(x,undefined,n._sType||u)}};if(g.fnScopedRunWithOwner){t=g.fnScopedRunWithOwner(p)}else{t=p()}}else if(n.getMetadata().isA("sap.ui.core.Fragment")&&h){if(u!==o.JS){x.processingMode=g._sProcessingMode}var d="sap/ui/core/Fragment";var m=sap.ui.require(d);x.name=x.name||x.fragmentName;if(m){s=m.load(x)}else{s=new Promise(function(e,n){sap.ui.require([d],function(n){n.load(x).then(function(n){e(n)})},n)})}}else{var b=function(){var e;if(g.fnScopedRunWithOwner){e=g.fnScopedRunWithOwner(function(){var e=new n(x);return e})}else{e=new n(x)}r=U(h,e,A);return e};if(w&&w.fnRunWithPreprocessor){t=w.fnRunWithPreprocessor(b)}else{t=b()}}}return s.then(function(e){return e||t}).then(function(n){if(E&&n.addStyleClass){n.addStyleClass(E)}if(!n){n=[]}else if(!Array.isArray(n)){n=[n]}if(T._supportInfo&&n){for(var t=0,i=n.length;t<i;t++){var a=n[t];if(a&&a.getId()){var o=T._supportInfo({context:e,env:{caller:"createRegularControls",nodeid:e.getAttribute("id"),controlid:a.getId()}}),s=j?j+",":"";s+=o;T._supportInfo.addSupportInfo(a.getId(),s)}}}if(B){n.forEach(function(n){if(k.getCompositeAggregationName){var t=e.getElementsByTagName(n.getMetadata().getCompositeAggregationName());for(var r=0;r<t.length;r++){e.removeChild(t[0])}}n._sapui_declarativeSourceInfo={xmlNode:e,xmlRootNode:g._sapui_declarativeSourceInfo.xmlRootNode,fragmentName:k.getName()==="sap.ui.core.Fragment"?x["fragmentName"]:null}})}return r.then(function(){return n})})})}function te(e,n){var t=q(e,V,j);e.setAttributeNS(V,t+":"+n,"true")}function re(e,n,t){if(n.getAttributeNS(V,"id")){return n.getAttribute("id")}else{return J(t?t:n.getAttribute("id"))}}function ie(e,n){n.setAttribute("id",J(n.getAttribute("id")));te(n,"id")}}T._preprocessMetadataContexts=null;T._calculatedModelMapping=function(e,n,r){var i,a={},o=t.bindingParser(e,n);function s(e){if(e.length%2===0){throw new Error("The last entry is no binding")}for(var n=1;n<=e.length;n=n+2){if(typeof e[n-1]=="string"){throw new Error("Binding expected not a string")}if(e[n]){if(typeof e[n]!="string"||e[n]!=","){throw new Error("Missing delimiter ','")}}}}if(o){if(!o.formatter){i=o;o={parts:[i]}}else{s(o.formatter.textFragments)}for(var u=0;u<o.parts.length;u++){i=o.parts[u];a[i.model]=a[i.model]||(r?[]:null);if(Array.isArray(a[i.model])){a[i.model].push(i)}else{a[i.model]=i}}}return a};return T},true);