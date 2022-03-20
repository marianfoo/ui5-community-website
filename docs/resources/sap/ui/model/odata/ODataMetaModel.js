/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./_ODataMetaModelUtils","sap/base/Log","sap/base/util/extend","sap/base/util/isEmptyObject","sap/ui/base/BindingParser","sap/ui/base/ManagedObject","sap/ui/base/SyncPromise","sap/ui/model/BindingMode","sap/ui/model/ClientContextBinding","sap/ui/model/Context","sap/ui/model/FilterProcessor","sap/ui/model/MetaModel","sap/ui/model/json/JSONListBinding","sap/ui/model/json/JSONModel","sap/ui/model/json/JSONPropertyBinding","sap/ui/model/json/JSONTreeBinding","sap/ui/performance/Measurement"],function(e,t,o,n,i,r,a,s,d,l,u,c,p,h,y,f,g){"use strict";var m=new Map,C="sap.ui.model.odata.ODataMetaModel",O=[C],M=C+"/load",v=/^((\/dataServices\/schema\/\d+)\/(?:complexType|entityType)\/\d+)\/property\/\d+$/;var S=p.extend("sap.ui.model.odata.ODataMetaListBinding"),b=r.extend("sap.ui.model.odata._resolver",{metadata:{properties:{any:"any"}}});S.prototype.applyFilter=function(){var e=this,t=u.combineFilters(this.aFilters,this.aApplicationFilters);this.aIndices=u.apply(this.aIndices,t,function(t,o){return o==="@sapui.name"?t:e.oModel.getProperty(o,e.oList[t])},this.mNormalizeCache);this.iLength=this.aIndices.length};var D=c.extend("sap.ui.model.odata.ODataMetaModel",{constructor:function(t,o,n){var i=n.annotationsLoaded(),r=this;function d(){var n;if(r.bDestroyed){throw new Error("Meta model already destroyed")}g.average(M,"",O);n=JSON.parse(JSON.stringify(t.getServiceMetadata()));r.oModel=new h(n);r.oModel.setDefaultBindingMode(r.sDefaultBindingMode);e.merge(o?o.getAnnotationsData():{},n,r);g.end(M)}c.apply(this);this.oModel=null;this.mContext2Promise={};this.sDefaultBindingMode=s.OneTime;this.oLoadedPromise=i?i.then(d):new Promise(function(e,t){d();e()});this.oLoadedPromiseSync=a.resolve(this.oLoadedPromise);this.oMetadata=t;this.oDataModel=n;this.mQueryCache={};this.mQName2PendingRequest={};this.oResolver=undefined;this.mSupportedBindingModes={OneTime:true}}});D.prototype._getObject=function(e,o){var n=o,r,a,s,d,u,c,p,h=e||"",y;if(!o||o instanceof l){h=this.resolve(e||"",o);if(!h){t.error("Invalid relative path w/o context",e,C);return null}}if(h.charAt(0)==="/"){n=this.oModel._getObject("/");h=h.slice(1)}p="/";u=n;while(h){c=undefined;r=undefined;if(h.charAt(0)==="["){try{y=i.parseExpression(h,1);d=y.at;if(h.length===d+1||h.charAt(d+1)==="/"){r=y.result;c=h.slice(0,d+1);h=h.slice(d+2)}}catch(e){if(!(e instanceof SyntaxError)){throw e}}}if(c===undefined){d=h.indexOf("/");if(d<0){c=h;h=""}else{c=h.slice(0,d);h=h.slice(d+1)}}if(!u){if(t.isLoggable(t.Level.WARNING,C)){t.warning("Invalid part: "+c,"path: "+e+", context: "+(o instanceof l?o.getPath():o),C)}break}if(r){if(n===o){t.error("A query is not allowed when an object context has been given",e,C);return null}if(!Array.isArray(u)){t.error("Invalid query: '"+p+"' does not point to an array",e,C);return null}a=p+c;c=this.mQueryCache[a];if(c===undefined){this.oResolver=this.oResolver||new b({models:this.oModel});for(s=0;s<u.length;s+=1){this.oResolver.bindObject(p+s);this.oResolver.bindProperty("any",r);try{if(this.oResolver.getAny()){this.mQueryCache[a]=c=s;break}}finally{this.oResolver.unbindProperty("any");this.oResolver.unbindObject()}}}}u=u[c];p=p+c+"/"}return u};D.prototype._getOrCreateSharedModelCache=function(){var e=this.oDataModel;if(!this.oSharedModelCache){this.oSharedModelCache={bFirstCodeListRequested:false,oModel:new e.constructor(e.getCodeListModelParameters())}}return this.oSharedModelCache};D.prototype._mergeMetadata=function(t){var o=this.getODataEntityContainer(),n=e.getChildAnnotations(t.annotations,o.namespace+"."+o.name,true),i=o.entitySet.length,r=this.oModel.getObject("/dataServices/schema"),a=this;t.entitySets.forEach(function(n){var i,s,d=n.entityType,l=d.slice(0,d.lastIndexOf("."));if(!a.getODataEntitySet(n.name)){o.entitySet.push(JSON.parse(JSON.stringify(n)));if(!a.getODataEntityType(d)){i=a.oMetadata._getEntityTypeByName(d);s=e.getSchema(r,l);s.entityType.push(JSON.parse(JSON.stringify(i)));e.visitParents(s,t.annotations,"entityType",e.visitEntityType,s.entityType.length-1)}}});e.visitChildren(o.entitySet,n,"EntitySet",r,null,i)};D.prototype._sendBundledRequest=function(){var e=this.mQName2PendingRequest,t=Object.keys(e),o=this;if(!t.length){return}this.mQName2PendingRequest={};t=t.sort();t.forEach(function(e,o){t[o]=encodeURIComponent(e)});this.oDataModel.addAnnotationUrl("$metadata?sap-value-list="+t.join(",")).then(function(t){var n;o._mergeMetadata(t);for(n in e){try{e[n].resolve(t)}catch(t){e[n].reject(t)}}},function(t){var o;for(o in e){e[o].reject(t)}})};D.prototype.bindContext=function(e,t,o){return new d(this,e,t,o)};D.prototype.bindList=function(e,t,o,n,i){return new S(this,e,t,o,n,i)};D.prototype.bindProperty=function(e,t,o){return new y(this,e,t,o)};D.prototype.bindTree=function(e,t,o,n){return new f(this,e,t,o,n)};D.prototype.destroy=function(){c.prototype.destroy.apply(this,arguments);if(this.oSharedModelCache){this.oSharedModelCache.oModel.destroy();delete this.oSharedModelCache}return this.oModel&&this.oModel.destroy.apply(this.oModel,arguments)};D.prototype.fetchCodeList=function(e){var o=this;return this.oLoadedPromiseSync.then(function(){var n,i,r,s,d,l,u,c,p="com.sap.vocabularies.CodeList.v1."+e,h=o.getODataEntityContainer()[p];if(!h||!h.Url.String){return null}if(h.Url.String!=="./$metadata"){throw new Error(p+"/Url/String has to be './$metadata' for the service "+o.oDataModel.getCodeListModelParameters().serviceUrl)}s=h.CollectionPath.String;l=o.oDataModel.getMetadataUrl();n=l+"#"+s;u=m.get(n);if(u){return u}r=o._getOrCreateSharedModelCache();i=r.oModel;c=new a(function(e,t){i.read("/"+s,{error:t,success:e,urlParameters:{$skip:0,$top:5e3}})});d=new a(function(e,t){try{e(o._getPropertyNamesForCodeListCustomizing(s))}catch(e){t(e)}});u=a.all([c,d]).then(function(e){var n=e[0].results,i=e[1];return n.reduce(function(e,n){var r=n[i.code],a={Text:n[i.text],UnitSpecificScale:n[i.unitSpecificScale]};if(i.standardCode){a.StandardCode=n[i.standardCode]}if(a.UnitSpecificScale===null){t.error("Ignoring customizing w/o unit-specific scale for code "+r+" from "+s,o.oDataModel.getCodeListModelParameters().serviceUrl,C)}else{e[r]=a}return e},{})}).catch(function(e){if(i.bDestroyed){m.delete(n)}else{t.error("Couldn't load code list: "+s+" for "+o.oDataModel.getCodeListModelParameters().serviceUrl,e,C)}throw e}).finally(function(){if(r.bFirstCodeListRequested){if(!i.bDestroyed){i.destroy()}delete o.oSharedModelCache}else{r.bFirstCodeListRequested=true}});m.set(n,u);return u})};D.prototype.getMetaContext=function(e){var t,o,n,i,r,a,s,d,l;function u(e){var t=e.indexOf("(");return t>=0?e.slice(0,t):e}if(!e){return null}d=e.split("/");if(d[0]!==""){throw new Error("Not an absolute path: "+e)}d.shift();s=u(d[0]);o=this.getODataEntitySet(s);if(o){l=o.entityType}else{i=this.getODataFunctionImport(s);if(i){if(d.length===1){r=this.getODataFunctionImport(s,true)}l=i.returnType;if(l.lastIndexOf("Collection(",0)===0){l=l.slice(11,-1)}}else{throw new Error("Entity set or function import not found: "+s)}}d.shift();while(d.length){n=this.getODataEntityType(l);if(n){a=u(d[0]);t=this.getODataAssociationEnd(n,a)}else{n=this.getODataComplexType(l)}if(t){l=t.type;if(t.multiplicity==="1"&&a!==d[0]){throw new Error("Multiplicity is 1: "+d[0])}d.shift()}else{r=this.getODataProperty(n,d,true);if(d.length){throw new Error("Property not found: "+d.join("/"))}break}}r=r||this.getODataEntityType(l,true);return this.createBindingContext(r)};D.prototype.getODataAssociationEnd=function(t,o){var n=t?e.findObject(t.navigationProperty,o):null,i=n?e.getObject(this.oModel,"association",n.relationship):null,r=i?e.findObject(i.end,n.toRole,"role"):null;return r};D.prototype.getODataAssociationSetEnd=function(t,o){var n,i=null,r=this.getODataEntityContainer(),a=t?e.findObject(t.navigationProperty,o):null;if(r&&a){n=e.findObject(r.associationSet,a.relationship,"association");i=n?e.findObject(n.end,a.toRole,"role"):null}return i};D.prototype.getODataComplexType=function(t,o){return e.getObject(this.oModel,"complexType",t,o)};D.prototype.getODataEntityContainer=function(t){var o=t?undefined:null,n=this.oModel.getObject("/dataServices/schema");if(n){n.forEach(function(n,i){var r=e.findIndex(n.entityContainer,"true","isDefaultEntityContainer");if(r>=0){o=t?"/dataServices/schema/"+i+"/entityContainer/"+r:n.entityContainer[r];return false}});if(!o&&n.length===1&&n[0].entityContainer&&n[0].entityContainer.length===1){o=t?"/dataServices/schema/0/entityContainer/0":n[0].entityContainer[0]}}return o};D.prototype.getODataEntitySet=function(t,o){return e.getFromContainer(this.getODataEntityContainer(),"entitySet",t,o)};D.prototype.getODataEntityType=function(t,o){return e.getObject(this.oModel,"entityType",t,o)};D.prototype.getODataFunctionImport=function(t,o){var n=t&&t.indexOf("/")>=0?t.split("/"):undefined,i=n?e.getObject(this.oModel,"entityContainer",n[0]):this.getODataEntityContainer();return e.getFromContainer(i,"functionImport",n?n[1]:t,o)};D.prototype.getODataProperty=function(t,o,n){var i,r=Array.isArray(o)?o:[o],a=null,s;while(t&&r.length){i=e.findIndex(t.property,r[0]);if(i<0){break}r.shift();a=t.property[i];s=t.$path+"/property/"+i;if(r.length){t=this.getODataComplexType(a.type)}}return n?s:a};D.prototype.getODataValueLists=function(t){var i=false,r,a=t.getPath(),s=this.mContext2Promise[a],d=this;if(s){return s}r=v.exec(a);if(!r){throw new Error("Unsupported property context with path "+a)}s=new Promise(function(s,l){var u=t.getObject(),c,p=e.getValueLists(u);if(!(""in p)&&u["sap:value-list"]){i=true;c=d.oModel.getObject(r[2]).namespace+"."+d.oModel.getObject(r[1]).name;d.mQName2PendingRequest[c+"/"+u.name]={resolve:function(t){o(u,(t.annotations.propertyAnnotations[c]||{})[u.name]);p=e.getValueLists(u);if(n(p)){l(new Error("No value lists returned for "+a))}else{delete d.mContext2Promise[a];s(p)}},reject:l};setTimeout(d._sendBundledRequest.bind(d),0)}else{s(p)}});if(i){this.mContext2Promise[a]=s}return s};D.prototype.getProperty=function(){return this._getObject.apply(this,arguments)};D.prototype.isList=function(){return this.oModel.isList.apply(this.oModel,arguments)};D.prototype.loaded=function(){return this.oLoadedPromise};D.prototype.refresh=function(){throw new Error("Unsupported operation: ODataMetaModel#refresh")};D.prototype.requestCurrencyCodes=function(){return Promise.resolve(this.fetchCodeList("CurrencyCodes"))};D.prototype.requestUnitsOfMeasure=function(){return Promise.resolve(this.fetchCodeList("UnitsOfMeasure"))};D.prototype.setLegacySyntax=function(e){if(e){throw new Error("Legacy syntax not supported by ODataMetaModel")}};D.prototype.setProperty=function(){throw new Error("Unsupported operation: ODataMetaModel#setProperty")};D.prototype._getPropertyNamesForCodeListCustomizing=function(e){var t="/"+e+"/##",o=this.oDataModel.getObject(t),n=o["Org.OData.Core.V1.AlternateKeys"],i=D._getKeyPath(o,t),r=this.oDataModel.getObject("/"+e+"/"+i+"/##");if(n){if(n.length!==1){throw new Error("Single alternative expected: "+t+"Org.OData.Core.V1.AlternateKeys")}else if(n[0].Key.length!==1){throw new Error("Single key expected: "+t+"Org.OData.Core.V1.AlternateKeys/0/Key")}i=n[0].Key[0].Name.Path}return{code:i,standardCode:r["com.sap.vocabularies.CodeList.v1.StandardCode"]&&r["com.sap.vocabularies.CodeList.v1.StandardCode"].Path,text:r["com.sap.vocabularies.Common.v1.Text"].Path,unitSpecificScale:r["com.sap.vocabularies.Common.v1.UnitSpecificScale"].Path}};D._getKeyPath=function(e,t){var o=e.key.propertyRef;if(o&&o.length===1){return o[0].name}throw new Error("Single key expected: "+t)};D.getCodeListTerm=function(e){if(e==="/##@@requestCurrencyCodes"){return"CurrencyCodes"}else if(e==="/##@@requestUnitsOfMeasure"){return"UnitsOfMeasure"}};return D});