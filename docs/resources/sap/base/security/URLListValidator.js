/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var e=/^(?:([^:\/?#]+):)?((?:\/\/((?:\[[^\]]+\]|[^\/?#:]+))(?::([0-9]+))?)?([^?#]*))(?:\?([^#]*))?(?:#(.*))?$/;var a=/^([a-z0-9-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*$/i;var t=/^([a-z0-9-._~!$&'()*+,;=:@\/?]|%[0-9a-f]{2})*$/i;var r=t;var f=/^([a-z0-9!$'*+:^_`{|}~-]|%[0-9a-f]{2})+(?:\.([a-z0-9!$'*+:^_`{|}~-]|%[0-9a-f]{2})+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;var i=/^([0-9]{1,3}\.){3}[0-9]{1,3}$/;var s=/^(([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])$/;var n=/^\[[^\]]+\]$/;var l=/^\[(((([0-9a-f]{1,4}:){6}|(::([0-9a-f]{1,4}:){5})|(([0-9a-f]{1,4})?::([0-9a-f]{1,4}:){4})|((([0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::([0-9a-f]{1,4}:){3})|((([0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::([0-9a-f]{1,4}:){2})|((([0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:)|((([0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::))(([0-9a-f]{1,4}:[0-9a-f]{1,4})|(([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])))|((([0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4})|((([0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::))\]$/i;var u=/^([a-z0-9]([a-z0-9\-]*[a-z0-9])?\.)*[a-z0-9]([a-z0-9\-]*[a-z0-9])?$/i;var p={};p._createEntry=function(e,a,t,r){return new o(e,a,t,r)};function o(e,a,t,r){Object.defineProperties(this,{protocol:{value:e&&e.toUpperCase(),enumerable:true},host:{value:a&&a.toUpperCase(),enumerable:true},port:{value:t,enumerable:true},path:{value:r,enumerable:true}})}var v=[];p.clear=function(){v=[]};p.add=function(e,a,t,r){var f=this._createEntry(e,a,t,r);v.push(f)};p._delete=function(e){v.splice(v.indexOf(e),1)};p.entries=function(){return v.slice()};p.validate=function(p){var o=e.exec(p);if(!o){return false}var h=o[1],c=o[2],$=o[3],z=o[4],g=o[5],_=o[6],x=o[7];if(h){h=h.toUpperCase();if(v.length<=0){if(!/^(https?|ftp)/i.test(h)){return false}}}if($){if(i.test($)){if(!s.test($)){return false}}else if(n.test($)){if(!l.test($)){return false}}else if(!u.test($)){return false}$=$.toUpperCase()}if(g){if(h==="MAILTO"){var R=c.split(",");for(var d=0;d<R.length;d++){if(!f.test(R[d])){return false}}}else{var b=g.split("/");for(var d=0;d<b.length;d++){if(!a.test(b[d])){return false}}}}if(_){if(!t.test(_)){return false}}if(x){if(!r.test(x)){return false}}if(v.length>0){var m=false;for(var d=0;d<v.length;d++){if(!h||!v[d].protocol||h==v[d].protocol){var C=false;if($&&v[d].host&&/^\*/.test(v[d].host)){if(!v[d]._hostRegexp){var E=v[d].host.slice(1).replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&");v[d]._hostRegexp=RegExp(E+"$")}var U=v[d]._hostRegexp;if(U.test($)){C=true}}else if(!$||!v[d].host||$==v[d].host){C=true}if(C){if(!$&&!z||!v[d].port||z==v[d].port){if(v[d].path&&/\*$/.test(v[d].path)){if(!v[d]._pathRegexp){var O=v[d].path.slice(0,-1).replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&");v[d]._pathRegexp=RegExp("^"+O)}var U=v[d]._pathRegexp;if(U.test(g)){m=true}}else if(!v[d].path||g==v[d].path){m=true}}}}if(m){break}}if(!m){return false}}return true};return p});