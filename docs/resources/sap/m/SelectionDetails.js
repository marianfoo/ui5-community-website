/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Control","sap/m/Button","sap/ui/base/Interface","sap/ui/Device","sap/ui/core/library","./SelectionDetailsRenderer","sap/base/util/uid","sap/ui/thirdparty/jquery"],function(t,e,i,o,a,n,r,s,g){"use strict";var p=e.extend("sap.m.SelectionDetails",{metadata:{library:"sap.m",defaultAggregation:"items",aggregations:{items:{type:"sap.m.SelectionDetailsItem",multiple:true,bindable:"bindable"},actions:{type:"sap.ui.core.Item",multiple:true},actionGroups:{type:"sap.ui.core.Item",multiple:true},_popover:{type:"sap.m.ResponsivePopover",multiple:false,visibility:"hidden"},_button:{type:"sap.m.Button",multiple:false,visibility:"hidden"}},events:{beforeOpen:{},beforeClose:{},navigate:{parameters:{item:{type:"sap.m.SelectionDetailsItem"},direction:{type:"string"},content:{type:"sap.ui.core.Control"}}},actionPress:{parameters:{action:{type:"sap.ui.core.Item"},items:{type:"sap.m.SelectionDetailsItem"},level:{type:"sap.m.SelectionDetailsActionLevel"}}}}}});p._MAX_ACTIONGROUPS=5;p._POPOVER_MAX_HEIGHT=500;p.prototype.init=function(){this._bWrapLabels=false;this._oRb=sap.ui.getCore().getLibraryResourceBundle("sap.m");this.setAggregation("_button",new i({id:this.getId()+"-button",type:t.ButtonType.Transparent,press:[this._onToolbarButtonPress,this]}),true);this._oItemFactory=null};p.prototype.onBeforeRendering=function(){this._updateButton()};p.prototype.onAfterRendering=function(){document.getElementById(this.getAggregation("_button").getId()).setAttribute("aria-haspopup","dialog")};p.prototype.exit=function(){this.detachSelectionHandler();this._oItemFactory=null;this._oChangeHandler=null};p.prototype.isOpen=function(){var t=this.getAggregation("_popover");return t?t.isOpen():false};p.prototype.isEnabled=function(){return this.getItems().length>0};p.prototype.close=function(){var t=this.getAggregation("_popover");if(t){t.close()}return this};p.prototype.navTo=function(t,e){if(this.isOpen()){sap.ui.require(["sap/m/Page","sap/m/Toolbar","sap/m/ToolbarSpacer","sap/m/Title"],this._handleNavLazy.bind(this,t,e))}return this};p.prototype.getWrapLabels=function(){return this._bWrapLabels};p.prototype.setWrapLabels=function(t){var e=this.getAggregation("_popover");this._bWrapLabels=t;if(e&&e.isOpen()){e.invalidate()}return this};p.prototype.setPopoverModal=function(t){this._getPopover().setModal(t);return this};p.prototype._handleNavLazy=function(t,e,i,o,a,n,r){var g=this.getId()+"-page-for-"+e.getId()+"-uid-"+s();this._setPopoverHeight(p._POPOVER_MAX_HEIGHT);var h=new i(g,{customHeader:this._getPageToolbar(o,a,n,true,t),content:[e]});this._oNavContainer.addPage(h);this._oNavContainer.to(g)};p.prototype._getPageToolbar=function(e,o,r,s,g){var p=new e({design:t.ToolbarDesign.Transparent}).addStyleClass("sapMSDPageHeader");if(s){var h=new i({icon:"sap-icon://nav-back",press:this._onBackButtonPress.bind(this)});p.addAggregation("content",h,true)}var l=new o;var u=new r({text:g,titleStyle:n.TitleLevel.H5});p.addAggregation("content",l,true);p.addAggregation("content",u,true);p.addAggregation("content",l.clone(),true);if(a.system.phone){p.addAggregation("content",this._getCloseButton(),true)}return p};p.prototype._setPopoverHeight=function(t){if(!a.system.phone){var e=this._getPopover(),i=e.$("cont"),o=this._getMaxPopoverHeight();t=Math.min(p._POPOVER_MAX_HEIGHT,t);e._oControl._deregisterContentResizeHandler();i.animate({height:Math.min(t,o)},sap.ui.getCore().getConfiguration().getAnimation()?100:0,function(){e.setProperty("contentHeight",t+"px",true);e._oControl._registerContentResizeHandler()})}};p.prototype._getMaxPopoverHeight=function(){var t=this._getPopover(),e=t.$(),i,o,n;if(!e.length){return 0}i=e.offset().top;o=a.resize.height;n=t._oControl;n._adaptPositionParams();return o-i-n._marginBottom};p.prototype._onBackButtonPress=function(){var t=this._oNavContainer.getCurrentPage().getContent()[0];this._oNavContainer.attachEventOnce("afterNavigate",function(){this.fireNavigate({item:this._oItemForNavigation,direction:"back",content:t})},this);this._oNavContainer.back();if(this._oNavContainer.getCurrentPage()===this._oInitialPage){this._setPopoverHeight(this._getInitialPageHeight())}};p.prototype._getCloseButton=function(){return new i({icon:"sap-icon://decline",press:this.close.bind(this)})};p.prototype._aFacadeMethods=["addCustomData","getCustomData","indexOfCustomData","insertCustomData","removeCustomData","removeAllCustomData","destroyCustomData","data","addEventDelegate","removeEventDelegate","close","isOpen","isEnabled","attachBeforeOpen","detachBeforeOpen","attachBeforeClose","detachBeforeClose","attachNavigate","detachNavigate","attachActionPress","detachActionPress","addAction","removeAction","removeAllActions","addActionGroup","removeActionGroup","removeAllActionGroups","navTo","getWrapLabels","setWrapLabels"];p.prototype.getFacade=function(){var t=new o(this,p.prototype._aFacadeMethods,true);t.getItems=this._getItemFacades.bind(this);this.getFacade=function(){return t};return t};p.prototype._getItemFacades=function(){var t=this.getItems();var e=[];for(var i=0;i<t.length;i++){e.push(t[i].getFacade())}return e};p.prototype._updateButton=function(){var t,e,i=this.getAggregation("_button"),o;if(this._oSelectionData&&this._oSelectionData.length>=0){e=this._oSelectionData.length}else{e=this.getItems().length}if(e>0){t=this._oRb.getText("SELECTIONDETAILS_BUTTON_TEXT_WITH_NUMBER",[e]);o=true}else{t=this._oRb.getText("SELECTIONDETAILS_BUTTON_TEXT");o=false}i.setText(t);i.setEnabled(o);i.setTooltip(t)};p.prototype._onToolbarButtonPress=function(){sap.ui.require(["sap/m/NavContainer","sap/m/ResponsivePopover","sap/m/Page","sap/m/Toolbar","sap/m/OverflowToolbar","sap/m/ToolbarSpacer","sap/m/Button","sap/m/List","sap/m/StandardListItem","sap/ui/layout/FixFlex","sap/m/ScrollContainer","sap/m/Title"],this._handlePressLazy.bind(this))};p.prototype._handlePressLazy=function(t,e,i,o,a,n,r,s,g,p,h,l){var u=this._getPopover(t,e,o,n,i,s,p,h,l);if(this._oItemFactory){this._callFactory()}this.fireBeforeOpen();this._addMainListItems();this._addActionGroupListItems(g);this._addListActions(a,n,r);this._oNavContainer.setProperty("defaultTransitionName","show",true);this._oNavContainer.to(this._oInitialPage);this._oNavContainer.setProperty("defaultTransitionName","slide",true);u.openBy(this.getAggregation("_button"));u.invalidate()};p.prototype._callFactory=function(){var t=this._oItemFactory.factory,e=this._oItemFactory.data,i=this._oSelectionData,o;this.fireEvent("beforeUpdate",{items:this.getItems()});this.destroyAggregation("items",true);for(var a=0;a<i.length;a++){o=t(i[a].displayData,i[a].data,i[a].context,e,i[a].shapeString);if(o){o._sMarkerShapeString=i[a].shapeString;this.addAggregation("items",o,true)}}this.fireEvent("afterUpdate",{items:this.getItems()})};p.prototype._getInitialPage=function(t,e,i,o){if(!this._oInitialPage){this._oInitialPage=new t(this.getId()+"-page",{showHeader:false,enableScrolling:false});if(a.system.phone){this._oInitialPage.setProperty("showHeader",true,true);this._oInitialPage.setAggregation("customHeader",this._getPageToolbar(e,i,o),true)}}return this._oInitialPage};p.prototype._getNavContainer=function(t){if(!this._oNavContainer){this._oNavContainer=new t(this.getId()+"-nav-container")}return this._oNavContainer};p.prototype._getPopover=function(e,i,o,n,r,s,g,p,h){var l=this.getAggregation("_popover"),u,c,d,_,f;if(!l){l=new i({id:this.getId()+"-popover",placement:t.PlacementType.Bottom,showHeader:false,contentWidth:"25rem",contentHeight:"500px",beforeClose:this.fireBeforeClose.bind(this)}).addStyleClass("sapMSD");l.setProperty=this._setPopoverProperty;c=this._getInitialPage(r,o,n,h);_=this._getActionGroupList(s);u=this._getNavContainer(e);f=this._getMainList(s);d=this._createMainContainer(g);d.setAggregation("flexContent",f,true);d.addAggregation("fixContent",_,true);c.addAggregation("content",d,true);u.addPage(c);l.addAggregation("content",u,true);if(!a.system.phone){l.addEventDelegate({onAfterRendering:this._updatePopoverContentHeight.bind(this)})}l.addEventDelegate({onBeforeRendering:function(){this.getWrapLabels()?l.addStyleClass("sapMSDWrapLabels"):l.removeStyleClass("sapMSDWrapLabels")}.bind(this)});this.setAggregation("_popover",l,true)}return l};p.prototype._setPopoverProperty=function(t,i){var o=this._oControl.getMetadata().getProperty(t);if(o&&t==="modal"&&this._oControl.setModal){this._oControl.setModal(i)}else{this._oControl.setProperty.apply(this._oControl,arguments)}return e.prototype.setProperty.apply(this,arguments)};p.prototype._updatePopoverContentHeight=function(){var t=this._getInitialPageHeight(),e=this._getPopover();if(a.browser.edge&&this._oMainList.getDomRef()&&this._oMainList.getDomRef().getBoundingClientRect().height===0){e.setContentHeight(p._POPOVER_MAX_HEIGHT+"px");return}if(this._oNavContainer.getCurrentPage()===this._oInitialPage&&t<p._POPOVER_MAX_HEIGHT){e.setProperty("contentHeight",t+"px",true)}else{e.setProperty("contentHeight",p._POPOVER_MAX_HEIGHT+"px",true)}};p.prototype._getInitialPageHeight=function(){var t=this._oInitialPage&&this._oInitialPage.getFooter(),e=this._oMainList.$().outerHeight(),i=this._oActionGroupList.$().outerHeight(),o=t&&t.$().outerHeight()||0;return e+i+o};p.prototype._createMainContainer=function(t){return new t(this.getId()+"-mainContainer",{fixFirst:false,minFlexSize:-1})};p.prototype._getMainList=function(t){if(!this._oMainList){this._oMainList=new t(this.getId()+"-list")}return this._oMainList};p.prototype._addMainListItems=function(){var t,e,i;this._oMainList.removeAllAggregation("items",true);e=this.getItems();for(t=0;t<e.length;t++){if(!e[t].hasListeners("_navigate")){e[t].attachEvent("_navigate",this._onNavigate,this)}if(!e[t].hasListeners("_actionPress")){e[t].attachEvent("_actionPress",this._onActionPress,this)}i=e[t]._getListItem();this._oMainList.addAggregation("items",i,true)}};p.prototype._getActionGroupList=function(t){if(!this._oActionGroupList){this._oActionGroupList=new t(this.getId()+"-actionGroupList",{showNoData:false})}return this._oActionGroupList};p.prototype._addActionGroupListItems=function(e){this._oActionGroupList.destroyAggregation("items",true);var i=this.getActionGroups(),o,a,n=Math.min(p._MAX_ACTIONGROUPS,i.length);for(a=0;a<n;a++){o=new e(this.getId()+"-actionGroup-"+a,{title:i[a].getText(),type:t.ListType.Navigation,press:[{action:i[a],level:t.SelectionDetailsActionLevel.Group},this._onActionPress,this]});if(a===0){o.addStyleClass("sapMSDFirstActionGroup")}this._oActionGroupList.addAggregation("items",o,true)}};p.prototype._addListActions=function(e,i,o){var a,n,r,s,g;this._oInitialPage.destroyAggregation("footer",true);if(!this.getActions().length){return}g=new e(this.getId()+"-action-toolbar").addStyleClass("sapContrast sapContrastPlus");this._oInitialPage.setAggregation("footer",g,true);g.addAggregation("content",new i,true);r=this.getActions();for(n=0;n<r.length;n++){s=r[n];a=new o(this.getId()+"-action-"+n,{text:s.getText(),enabled:s.getEnabled(),press:[{action:s,level:t.SelectionDetailsActionLevel.List},this._onActionPress,this]});g.addAggregation("content",a,true)}};p.prototype._onActionPress=function(t,e){this.fireActionPress({action:e&&e.action||t.getParameter("action"),items:t.getParameter("items")||this.getItems(),level:e&&e.level||t.getParameter("level")})};p.prototype._onNavigate=function(t){this._oItemForNavigation=t.getSource();this.fireNavigate({item:t.getSource(),direction:"to"})};p.prototype._handleSelectionChange=function(t){var e=t.getParameter("data");if(Array.isArray(e)){this._oSelectionData=e;this._updateButton()}};p.prototype.registerSelectionDetailsItemFactory=function(t,e){if(typeof t==="function"){e=t;t=undefined}if(typeof e==="function"){this._oItemFactory={factory:e,data:t}}return this};p.prototype.attachSelectionHandler=function(t,e){if(!this._oChangeHandler&&typeof t==="string"&&e&&typeof e.attachEvent==="function"){this._oChangeHandler={eventId:t,listener:e};e.attachEvent(t,this._handleSelectionChange,this)}return this};p.prototype.detachSelectionHandler=function(){if(this._oChangeHandler){this._oChangeHandler.listener.detachEvent(this._oChangeHandler.eventId,this._handleSelectionChange,this);this._oChangeHandler=null}return this};return p});