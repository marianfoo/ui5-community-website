/*
 * ! OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./QueryPanel","sap/m/Text","sap/m/SegmentedButton","sap/m/SegmentedButtonItem","sap/ui/layout/Grid","sap/ui/layout/GridData"],function(e,t,r,n,a,o){"use strict";var s=e.extend("sap.m.p13n.SortPanel",{renderer:{}});s.prototype.PRESENCE_ATTRIBUTE="sorted";s.prototype.CHANGE_REASON_SORTORDER="sortorder";s.prototype._createRemoveButton=function(){var t=e.prototype._createRemoveButton.apply(this,arguments);t.setLayoutData(new o({span:"XL3 L3 M3 S4"}));return t};s.prototype._createOrderSwitch=function(e,t){var a=new r({enabled:e?true:false,layoutData:new o({span:"XL2 L2 M2 S4"}),items:[new n({key:"asc",icon:"sap-icon://sort-ascending"}),new n({key:"desc",icon:"sap-icon://sort-descending"})],select:function(e){var t=e.getParameter("key");var r=e.getSource().getParent().getContent()[2];r.setText(this._getSortOrderText(t==="desc"));var n=e.oSource.getParent().getContent()[0].getSelectedItem().getKey();this._changeOrder(n,t=="desc")}.bind(this)});a.setSelectedItem(t?a.getItems()[1]:a.getItems()[0]);return a};s.prototype._createSortOrderText=function(e){return new t({layoutData:new o({span:"XL3 L3 M3 S3",visibleS:false}),text:this._getSortOrderText(e)}).addStyleClass("sapUiTinyMarginTop")};s.prototype._createQueryRowGrid=function(e){var t=this._createKeySelect(e.name);var r=this._createOrderSwitch(e.name,e.descending);var n=this._createSortOrderText(e.descending);return new a({containerQuery:true,defaultSpan:"XL4 L4 M4 S4",content:[t,r,n]}).addStyleClass("sapUiTinyMargin")};s.prototype._selectKey=function(t){e.prototype._selectKey.apply(this,arguments);var r=t.getSource().getParent().getParent();var n=t.getParameter("selectedItem").getKey();r.getContent()[0].getContent()[1].setEnabled(n!==this.NONE_KEY);var a=r.getContent()[0].getContent()[1].getSelectedKey()==="desc";this._changeOrder(n,a)};s.prototype._getSortOrderText=function(e){return e?this._getResourceText("p13n.SORT_DESCENDING"):this._getResourceText("p13n.SORT_ASCENDING")};s.prototype._changeOrder=function(e,t){var r=this._getP13nModel().getProperty("/items").filter(function(t){return t.name===e});r[0].descending=t;this.fireChange({reason:this.CHANGE_REASON_SORTORDER,item:r[0]})};return s});