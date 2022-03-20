/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/EventProvider","sap/base/assert","sap/base/Log","sap/ui/dom/containsOrEquals","sap/ui/events/KeyCodes","sap/ui/thirdparty/jquery","sap/ui/dom/jquery/Selectors"],function(e,t,i,s,o,a){"use strict";var n=e.extend("sap.ui.core.delegate.ItemNavigation",{constructor:function(t,i,s){e.apply(this);this.oDomRef=null;if(t){this.setRootDomRef(t)}this.aItemDomRefs=[];if(i){this.setItemDomRefs(i)}this.iTabIndex=-1;this.iActiveTabIndex=s?-1:0;this.iFocusedIndex=-1;this.iSelectedIndex=-1;this.bCycling=true;this.bTableMode=false;this.iPageSize=-1;this._bMouseDownHappened=false;this.oDisabledModifiers={sapend:["alt","shift"],saphome:["alt","shift"]}}});n.Events={BeforeFocus:"BeforeFocus",AfterFocus:"AfterFocus",BorderReached:"BorderReached",FocusAgain:"FocusAgain",FocusLeave:"FocusLeave"};n.prototype.setDisabledModifiers=function(e){this.oDisabledModifiers=e;return this};n.prototype.getDisabledModifiers=function(e){return this.oDisabledModifiers};n.prototype.hasDisabledModifier=function(e){var t=this.oDisabledModifiers[e.type.replace("modifiers","")];if(Array.isArray(t)){for(var i=0;i<t.length;i++){if(e[t[i]+"Key"]){return true}}}return false};n.prototype.setRootDomRef=function(e){this.oDomRef=e;if(!a(this.oDomRef).data("sap.INItem")){if(this.iFocusedIndex>=0){a(this.oDomRef).attr("tabindex",this.iTabIndex)}else{a(this.oDomRef).attr("tabindex",this.iActiveTabIndex)}}a(this.oDomRef).data("sap.INRoot",this);return this};n.prototype.getRootDomRef=function(){return this.oDomRef};n.prototype.getItemDomRefs=function(){return this.aItemDomRefs};n.prototype.setItemDomRefs=function(e){t(typeof e==="object"&&typeof e.length==="number","aItemDomRefs must be an array of DOM elements");this.aItemDomRefs=e;if(this.iFocusedIndex>-1){var i=e.length;if(this.iFocusedIndex>i-1){this.iFocusedIndex=i-1}var s=document.activeElement;if(s&&s!=this.aItemDomRefs[this.iFocusedIndex]){for(var o=0;o<i;o++){if(s==this.aItemDomRefs[o]){this.iFocusedIndex=o;break}}}}for(var o=0;o<this.aItemDomRefs.length;o++){if(this.aItemDomRefs[o]){var n=a(this.aItemDomRefs[o]);if(o==this.iFocusedIndex&&!n.data("sap.INRoot")){n.attr("tabindex",this.iActiveTabIndex)}else if(n.attr("tabindex")=="0"){n.attr("tabindex",-1)}n.data("sap.INItem",true);n.data("sap.InNavArea",true);if(n.data("sap.INRoot")&&o!=this.iFocusedIndex){n.data("sap.INRoot").setNestedItemsTabindex()}}}return this};n.prototype.setItemsTabindex=function(){for(var e=0;e<this.aItemDomRefs.length;e++){if(this.aItemDomRefs[e]){var t=a(this.aItemDomRefs[e]);if(t.is(":sapFocusable")){if(e==this.iFocusedIndex&&!t.data("sap.INRoot")){t.attr("tabindex",this.iActiveTabIndex)}else{t.attr("tabindex",-1)}}}}return this};n.prototype.setNestedItemsTabindex=function(){if(a(this.oDomRef).data("sap.INItem")){for(var e=0;e<this.aItemDomRefs.length;e++){if(this.aItemDomRefs[e]&&a(this.aItemDomRefs[e]).attr("tabindex")=="0"){a(this.aItemDomRefs[e]).attr("tabindex",-1)}}}return this};n.prototype.destroy=function(){if(this.oDomRef){a(this.oDomRef).removeData("sap.INRoot");this.oDomRef=null}if(this.aItemDomRefs){for(var e=0;e<this.aItemDomRefs.length;e++){if(this.aItemDomRefs[e]){a(this.aItemDomRefs[e]).removeData("sap.INItem");a(this.aItemDomRefs[e]).removeData("sap.InNavArea")}}this.aItemDomRefs=null}this._bItemTabIndex=undefined;this.iFocusedIndex=-1};n.prototype.setCycling=function(e){this.bCycling=e;return this};n.prototype.setTableMode=function(e,t){this.bTableMode=e;if(this.oConfiguration===undefined){this.oConfiguration=sap.ui.getCore().getConfiguration()}this.bTableList=e?t:false;return this};n.prototype.setPageSize=function(e){this.iPageSize=e;return this};n.prototype.setSelectedIndex=function(e){this.iSelectedIndex=e;return this};n.prototype.setColumns=function(e,t){this.iColumns=e;this.bNoColumnChange=t;return this};n.prototype.setHomeEndColumnMode=function(e,t){this._bStayInRow=e;this._bCtrlEnabled=t;return this};n.prototype.focusItem=function(e,t,s){i.info("FocusItem: "+e+" iFocusedIndex: "+this.iFocusedIndex,"focusItem","ItemNavigation");if(e==this.iFocusedIndex&&this.aItemDomRefs[this.iFocusedIndex]==document.activeElement){this.fireEvent(n.Events.FocusAgain,{index:e,event:t});return}if(!this.aItemDomRefs[e]||!a(this.aItemDomRefs[e]).is(":sapFocusable")){if(this.bTableMode){var h=e%this.iColumns;var f=e;if(t&&t.keyCode==o.ARROW_RIGHT){if(h<this.iColumns-1){e+=this.oConfiguration.getRTL()?-1:1}}else if(t&&t.keyCode==o.ARROW_LEFT){if(h>1){e-=this.oConfiguration.getRTL()?-1:1}}else{if(h>1){e-=1}}if(e!=f){this.focusItem(e,t)}}return}this.fireEvent(n.Events.BeforeFocus,{index:e,event:t});this.setFocusedIndex(e);this.bISetFocus=true;if(t&&a(this.aItemDomRefs[this.iFocusedIndex]).data("sap.INRoot")){var r=a(this.aItemDomRefs[this.iFocusedIndex]).data("sap.INRoot");r._sFocusEvent=t.type}i.info("Set Focus on ID: "+this.aItemDomRefs[this.iFocusedIndex].id,"focusItem","ItemNavigation");this.aItemDomRefs[this.iFocusedIndex].focus({preventScroll:s});this.fireEvent(n.Events.AfterFocus,{index:e,event:t})};n.prototype.setFocusedIndex=function(e){var t;if(this.aItemDomRefs.length<0){this.iFocusedIndex=-1;return this}if(e<0){e=0}if(e>this.aItemDomRefs.length-1){e=this.aItemDomRefs.length-1}a(this.oDomRef).attr("tabindex",this.iTabIndex);if(this.iFocusedIndex!==-1&&this.aItemDomRefs.length>this.iFocusedIndex){a(this.aItemDomRefs[this.iFocusedIndex]).attr("tabindex",-1);t=a(this.aItemDomRefs[this.iFocusedIndex]);if(t.data("sap.INRoot")&&e!=this.iFocusedIndex){a(t.data("sap.INRoot").aItemDomRefs[t.data("sap.INRoot").iFocusedIndex]).attr("tabindex",-1)}}this.iFocusedIndex=e;var i=this.aItemDomRefs[this.iFocusedIndex];t=a(this.aItemDomRefs[this.iFocusedIndex]);if(!t.data("sap.INRoot")){a(i).attr("tabindex",this.iActiveTabIndex)}return this};n.prototype.getFocusedDomRef=function(){return this.aItemDomRefs[this.iFocusedIndex]};n.prototype.getFocusedIndex=function(){return this.iFocusedIndex};n.prototype.onfocusin=function(e){var t=e.target;var i=0;if(t==this.oDomRef){if(!this._bItemTabIndex){this.setItemsTabindex();this._bItemTabIndex=true}if(this._bMouseDownHappened){return}var s;if(a(this.oDomRef).data("sap.INItem")&&this._sFocusEvent&&!a(this.oDomRef).data("sap.InNavArea")){switch(this._sFocusEvent){case"sapnext":s=0;break;case"sapprevious":s=this.aItemDomRefs.length-1;break;default:if(this.iSelectedIndex!=-1){s=this.iSelectedIndex}else if(this.iFocusedIndex!=-1){s=this.iFocusedIndex}else{s=0}break}this._sFocusEvent=undefined}else{if(this.iSelectedIndex!=-1){s=this.iSelectedIndex}else if(this.iFocusedIndex!=-1){s=this.iFocusedIndex}else{s=0}}this.focusItem(s,e);if(this.iFocusedIndex==-1){for(i=s+1;i<this.aItemDomRefs.length;i++){this.focusItem(i,e);if(this.iFocusedIndex==i){break}}if(this.iFocusedIndex==-1&&s>0){for(i=s-1;i>=0;i--){this.focusItem(i,e);if(this.iFocusedIndex==i){break}}}}e.preventDefault();e.stopPropagation()}else if(!this.bISetFocus){if(this.aItemDomRefs&&e.target!=this.aItemDomRefs[this.iFocusedIndex]){for(i=0;i<this.aItemDomRefs.length;i++){if(e.target==this.aItemDomRefs[i]){this.focusItem(i,e);break}}}else{this.fireEvent(n.Events.AfterFocus,{index:this.iFocusedIndex,event:e})}}this.bISetFocus=false};n.prototype.onsapfocusleave=function(e){if(!e.relatedControlId||!s(this.oDomRef,sap.ui.getCore().byId(e.relatedControlId).getFocusDomRef())){var t;if(this.iSelectedIndex!=-1){t=this.iSelectedIndex}else if(this.iFocusedIndex!=-1){t=this.iFocusedIndex}else{t=0}this.setFocusedIndex(t);var i;if(a(this.oDomRef).data("sap.INItem")){var o;i=a(this.oDomRef);while(!o){i=i.parent();if(i.data("sap.INRoot")){o=i.get(0)}}if(!e.relatedControlId||s(o,sap.ui.getCore().byId(e.relatedControlId).getFocusDomRef())){a(this.aItemDomRefs[this.iFocusedIndex]).attr("tabindex",-1)}}i=a(this.oDomRef);if(i.data("sap.InNavArea")===false){i.data("sap.InNavArea",true)}this.fireEvent(n.Events.FocusLeave,{index:t,event:e})}};n.prototype.onmousedown=function(e){var t=e.target;var i=function(e,t){var i=false;var s=a(e);while(!s.is(":sapFocusable")&&s.get(0)!=t){s=s.parent()}if(s.get(0)!=t){i=true}return i};if(s(this.oDomRef,t)){for(var o=0;o<this.aItemDomRefs.length;o++){var n=this.aItemDomRefs[o];if(s(n,t)){if(!this.bTableMode){this.focusItem(o,e,true)}else{if(n===t||!i(t,n)){this.focusItem(o,e,true)}}return}}if(t==this.oDomRef){this._bMouseDownHappened=true;var h=this;window.setTimeout(function(){h._bMouseDownHappened=false},20)}}};n.prototype.onsapnext=function(e){if(!s(this.oDomRef,e.target)){return}if(a(this.oDomRef).data("sap.InNavArea")){return}if(this.bTableMode&&this.aItemDomRefs.indexOf(e.target)===-1){return}var t=this.iFocusedIndex,i=true,h=false;if(t>-1){if(this.bTableMode){var f=this.aItemDomRefs.length/this.iColumns,r=Math.floor(t/this.iColumns),d=t%this.iColumns;if(e.keyCode==o.ARROW_DOWN){if(r<f-1){t+=this.iColumns}}else{if(d<this.iColumns-1){t+=1}}}else{do{if(this.iColumns>1&&e.keyCode==o.ARROW_DOWN){if(t+this.iColumns>=this.aItemDomRefs.length){if(!this.bNoColumnChange){if(t%this.iColumns<this.iColumns-1){t=t%this.iColumns+1}else if(this.bCycling){t=0}}else{t=this.iFocusedIndex;h=true}}else{t=t+this.iColumns}}else{if(t==this.aItemDomRefs.length-1){if(a(this.oDomRef).data("sap.INItem")){return}else if(this.bCycling){t=0}else{t=this.iFocusedIndex;h=true}}else{t++}}if(t===this.iFocusedIndex){if(i){i=false}else{throw new Error("ItemNavigation has no visible/existing items and is hence unable to select the next one")}}}while(!this.aItemDomRefs[t]||!a(this.aItemDomRefs[t]).is(":sapFocusable"))}this.focusItem(t,e);if(h){this.fireEvent(n.Events.BorderReached,{index:t,event:e})}e.preventDefault();e.stopPropagation()}};n.prototype.onsapnextmodifiers=function(e){if(this.hasDisabledModifier(e)){return}this.onsapnext(e)};n.prototype.onsapprevious=function(e){if(!s(this.oDomRef,e.target)){return}if(a(this.oDomRef).data("sap.InNavArea")){return}if(this.bTableMode&&this.aItemDomRefs.indexOf(e.target)===-1){return}var t=this.iFocusedIndex,i=true,h=false;var f=0;if(t>-1){if(this.bTableMode){var r=Math.floor(t/this.iColumns);f=t%this.iColumns;if(e.keyCode==o.ARROW_UP){if(r>0){t-=this.iColumns}}else{if(f>0){t-=1}}}else{do{if(this.iColumns>1&&e.keyCode==o.ARROW_UP){if(t-this.iColumns<0){if(!this.bNoColumnChange){f=0;if(t%this.iColumns>0){f=t%this.iColumns-1}else if(this.bCycling){f=Math.min(this.iColumns-1,this.aItemDomRefs.length-1)}if(t===0&&f===0){t=0}else{var d=Math.ceil(this.aItemDomRefs.length/this.iColumns);t=f+(d-1)*this.iColumns;if(t>=this.aItemDomRefs.length){t=t-this.iColumns}}}else{t=this.iFocusedIndex;h=true}}else{t=t-this.iColumns}}else{if(t==0){if(a(this.oDomRef).data("sap.INItem")){return}else if(this.bCycling){t=this.aItemDomRefs.length-1}else{t=this.iFocusedIndex;h=true}}else{t--}}if(t==this.iFocusedIndex){if(i){i=false}else{throw new Error("ItemNavigation has no visible/existing items and is hence unable to select the previous one")}}}while(!this.aItemDomRefs[t]||!a(this.aItemDomRefs[t]).is(":sapFocusable"))}this.focusItem(t,e);if(h){this.fireEvent(n.Events.BorderReached,{index:t,event:e})}e.preventDefault();e.stopPropagation()}};n.prototype.onsappreviousmodifiers=function(e){if(this.hasDisabledModifier(e)){return}this.onsapprevious(e)};n.prototype.onsappageup=function(e){if(!s(this.oDomRef,e.target)){return}if(this.bTableMode&&this.aItemDomRefs.indexOf(e.target)===-1){return}var t=0;var i=false;if(this.iPageSize>0){t=this.iFocusedIndex;if(t>-1){t=t-this.iPageSize;while(t>0&&!a(this.aItemDomRefs[t]).is(":sapFocusable")){t--}if(t<0){if(!this.bNoColumnChange){t=0}else{t=this.iFocusedIndex;i=true}}this.focusItem(t,e)}}else if(this.bTableMode){t=this.iFocusedIndex%this.iColumns;this.focusItem(t,e)}if(i){this.fireEvent(n.Events.BorderReached,{index:t,event:e})}e.preventDefault();e.stopPropagation()};n.prototype.onsappagedown=function(e){if(!s(this.oDomRef,e.target)){return}if(this.bTableMode&&this.aItemDomRefs.indexOf(e.target)===-1){return}var t=0;var i=false;if(this.iPageSize>0){t=this.iFocusedIndex;if(t>-1){t=t+this.iPageSize;while(t<this.aItemDomRefs.length-1&&!a(this.aItemDomRefs[t]).is(":sapFocusable")){t++}if(t>this.aItemDomRefs.length-1){if(!this.bNoColumnChange){t=this.aItemDomRefs.length-1}else{t=this.iFocusedIndex;i=true}}this.focusItem(t,e)}}else if(this.bTableMode){var o=this.aItemDomRefs.length/this.iColumns,h=this.iFocusedIndex%this.iColumns;t=(o-1)*this.iColumns+h;this.focusItem(t,e)}if(i){this.fireEvent(n.Events.BorderReached,{index:t,event:e})}e.preventDefault();e.stopPropagation()};n.prototype.onsaphome=function(e){if(!s(this.oDomRef,e.target)){return}if(this.bTableMode&&this.aItemDomRefs.indexOf(e.target)===-1){return}var t=0;var i=0;if(this.bTableMode){if(!this.bTableList&&!(e.metaKey||e.ctrlKey)){i=Math.floor(this.iFocusedIndex/this.iColumns);t=i*this.iColumns}}else{if((e.metaKey||e.ctrlKey)&&!this._bCtrlEnabled){return}if(this._bStayInRow&&!(this._bCtrlEnabled&&(e.metaKey||e.ctrlKey))&&this.iColumns>0){i=Math.floor(this.iFocusedIndex/this.iColumns);t=i*this.iColumns}else{while(!this.aItemDomRefs[t]||!a(this.aItemDomRefs[t]).is(":sapFocusable")){t++;if(t==this.aItemDomRefs.length){return}}}}this.focusItem(t,e);e.preventDefault();e.stopPropagation()};n.prototype.onsaphomemodifiers=function(e){if(this.hasDisabledModifier(e)){return}this.onsaphome(e)};n.prototype.onsapend=function(e){if(!s(this.oDomRef,e.target)){return}if(this.bTableMode&&this.aItemDomRefs.indexOf(e.target)===-1){return}var t=this.aItemDomRefs.length-1;var i=0;if(this.bTableMode){if(!this.bTableList&&!(e.metaKey||e.ctrlKey)){i=Math.floor(this.iFocusedIndex/this.iColumns);t=i*this.iColumns+this.iColumns-1}}else{if((e.metaKey||e.ctrlKey)&&!this._bCtrlEnabled){return}if(this._bStayInRow&&!(this._bCtrlEnabled&&(e.metaKey||e.ctrlKey))&&this.iColumns>0){i=Math.floor(this.iFocusedIndex/this.iColumns);t=(i+1)*this.iColumns-1;if(t>=this.aItemDomRefs.length){t=this.aItemDomRefs.length-1}}else{while(!this.aItemDomRefs[t]||!a(this.aItemDomRefs[t]).is(":sapFocusable")){t--;if(t<0){return}}}}this.focusItem(t,e);e.preventDefault();e.stopPropagation()};n.prototype.onsapendmodifiers=function(e){if(this.hasDisabledModifier(e)){return}this.onsapend(e)};n.prototype.setTabIndex0=function(){this.iTabIndex=0;this.iActiveTabIndex=0};n.prototype.onkeyup=function(e){if(e.keyCode==o.F2){var t=a(this.oDomRef);if(t.data("sap.InNavArea")){t.data("sap.InNavArea",false)}else if(t.data("sap.InNavArea")===false){t.data("sap.InNavArea",true)}e.preventDefault();e.stopPropagation()}};return n});