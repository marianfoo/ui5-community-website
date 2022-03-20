/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/Log","sap/ui/core/InvisibleRenderer"],function(e,t){"use strict";return{findDropTargetsAbove:function(e,t){return this._findDropTargets(e,t,this._isAbove)},findDropTargetsBelow:function(e,t){return this._findDropTargets(e,t,this._isBelow)},getItemWrapper:function(e){var i=e.getDomRef(),n;if(i){return i.parentElement}n=document.getElementById(t.createInvisiblePlaceholderId(e));if(n){return n.parentElement}return null},createConfig:function(e,t){return{grid:e,item:t}},_findDropTargets:function(e,t,i){var n=[],r=this.getItemWrapper(t),o=e.getItems().filter(function(e){return i(r,this.getItemWrapper(e))}.bind(this)),s=this.createConfig(e,this._findClosest(t,o),t,i);if(s.item){n.push(s)}else{n=Array.from(document.querySelectorAll(".sapFGridContainer")).filter(function(e){return i(r,e)}).map(function(e){var n=jQuery(e).control(0);var r=this.createConfig(n,this._findClosest(t,n.getItems()),t,i);r.distFromItemToGrid=this._getDistance(t,n,i);return r}.bind(this)).sort(function(e,t){return e.distFromItemToGrid-t.distFromItemToGrid})}return n},_findClosest:function(e,t,i){var n=null,r=Number.POSITIVE_INFINITY;t.forEach(function(t){var o=this._getDistance(e,t,i);if(o<r){n=t;r=o}}.bind(this));return n},_getDistance:function(t,i,n){var r=t.getDomRef().getBoundingClientRect(),o=i.getDomRef().getBoundingClientRect();var s={x:o.left};if(n===this._isAbove){s.y=o.top+o.height}else{s.y=o.top}var u={x:s.x+o.width,y:s.y};var a={x:r.left+r.width/2,y:r.top+r.height/2};var f=(u.x-s.x)*(u.x-s.x)+(u.y-s.y)*(u.y-s.y);var g=((a.x-s.x)*(u.x-s.x)+(a.y-s.y)*(u.y-s.y))/f;var c={};if(g<0){c.x=s.x;c.y=s.y}else if(g>1){c.x=u.x;c.y=u.y}else{c.x=s.x+g*(u.x-s.x);c.y=s.y+g*(u.y-s.y)}var d=c.x-a.x,l=c.y-a.y,m=d*d+l*l;if(m>Number.MAX_SAFE_INTEGER){e.warning("Maximum safe integer value exceeded.",m,"GridContainerUtils")}return m},_isAbove:function(e,t){var i=e.getBoundingClientRect().top,n=t.getBoundingClientRect().top;return n-i<0},_isBelow:function(e,t){var i=e.getBoundingClientRect().top,n=t.getBoundingClientRect().top;return n-i>0}}});