//@ui5-bundle com/sap/ui5community/Component-preload.js
sap.ui.require.preload({
	"com/sap/ui5community/Component.js":function(){sap.ui.define(["sap/ui/core/UIComponent","com/sap/ui5community/model/models","sap/ui/model/json/JSONModel"],function(e,t,i){"use strict";return e.extend("com.sap.ui5community.Component",{metadata:{manifest:"json"},init:function(){e.prototype.init.apply(this,arguments);this.getRouter().initialize();const o=new i({filter:"all",tokens:[],search:""});this.setModel(o,"settings");this.setModel(t.createDeviceModel(),"device")}})});
},
	"com/sap/ui5community/control/PackageListItemContent.control.xml":'<core:FragmentDefinition xmlns="sap.m" xmlns:core="sap.ui.core" xmlns:tnt="sap.tnt"><FlexBox id="trend-item-box" class="item-box" alignItems="Start"><NumericContent id="trend-rank" value="{$this>rank}" valueColor="{$this>rankColor}"\r\n      indicator="{$this>rankIndicator}" tooltip="{$this>rankTooltip}" class="sapUiSmallMarginTop"\r\n      visible="{= !!${$this>rank} &amp;&amp; ${$this>showRank}}" withMargin="true" /><VBox id="trend-item-inner-box" class="sapUiSmallMargin min-width-zero"><Link id="trend-title" text="{$this>name}" href="{$this>link}" target="_blank" emphasized="true" /><FormattedText id="trend-desc" htmlText="{$this>description}" /><HBox id="trend-item-tags-box" class="sapUiTinyMarginTop" wrap="Wrap"><tnt:InfoLabel id="trend-item-type" class="sapUiTinyMarginEnd" text="{$this>type}" renderMode="Narrow"\r\n          colorScheme="2" displayOnly="false" /><tnt:InfoLabel id="trend-item-tag3" class="sapUiTinyMarginEnd" text="{$this>tags/0}" renderMode="Narrow"\r\n          colorScheme="5" displayOnly="false" visible="{= !!${$this>tags/0} }" /><tnt:InfoLabel id="trend-item-tag1" class="sapUiTinyMarginEnd" text="{$this>tags/1}" renderMode="Narrow"\r\n          colorScheme="5" displayOnly="false" visible="{= !!${$this>tags/1} }" /><tnt:InfoLabel id="trend-item-tag2" class="sapUiTinyMarginEnd" text="{$this>tags/2}" renderMode="Narrow"\r\n          colorScheme="5" displayOnly="false" visible="{= !!${$this>tags/2} }" /></HBox></VBox><Image id="trend-cat-type" width="4rem" src="{$this>typeImage}" class="sapUiSmallMarginTop sapUiSmallMarginEnd" /></FlexBox></core:FragmentDefinition>',
	"com/sap/ui5community/control/PackageListItemContent.js":function(){sap.ui.define(["sap/ui/core/XMLComposite"],function(t){const e=t.extend("com.sap.ui5community.control.PackageListItemContent",{metadata:{properties:{name:{type:"string"},description:{type:"string"},link:{type:"string"},type:{type:"string"},tags:{type:"array"},createdAt:{type:"Date"},updatedAt:{type:"Date"},rank:{type:"int"},rankTooltip:{type:"string"},rankIndicator:{type:"sap.m.DeviationIndicator"},showRank:{type:"boolean",defaultValue:true},rankColor:{type:"sap.m.ValueColor"},typeImage:{type:"string"}}}});e.prototype.setType=function(t){this.setProperty("type",t,true);const e=t==="code-repository"?"resources/img/github.png":t==="docker-image"?"resources/img/docker.png":t==="npm-package"?"resources/img/npm.png":t==="pypi-package"?"resources/img/pypi.png":"";this.setProperty("typeImage",e)};e.prototype.setRankIndicator=function(t){this.setProperty("rankIndicator",t,true);if(t===sap.m.DeviationIndicator.Up){this.setProperty("rankColor",sap.m.ValueColor.Good);return}if(t===sap.m.DeviationIndicator.Down){this.setProperty("rankColor",sap.m.ValueColor.Error);return}this.setProperty("rankColor",sap.m.ValueColor.Neutral)};return e},true);
},
	"com/sap/ui5community/controller/App.controller.js":function(){sap.ui.define(["./BaseController","sap/ui/model/json/JSONModel"],function(n,o){"use strict";return n.extend("com.sap.ui5community.controller.App",{onInit:function(){}})});
},
	"com/sap/ui5community/controller/BaseController.js":function(){sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/core/routing/History","sap/ui/core/UIComponent","com/sap/ui5community/model/formatter"],function(e,t,o,n){"use strict";return e.extend("com.sap.ui5community.controller.BaseController",{formatter:n,getModel:function(e){return this.getView().getModel(e)},setModel:function(e,t){return this.getView().setModel(e,t)},getResourceBundle:function(){return this.getOwnerComponent().getModel("i18n").getResourceBundle()},navTo:function(e,t,o){this.getRouter().navTo(e,t,o)},getRouter:function(){return o.getRouterFor(this)},onNavBack:function(){var e=t.getInstance().getPreviousHash();if(e!==undefined){window.history.back()}else{this.getRouter().navTo("appHome",{},true)}}})});
},
	"com/sap/ui5community/controller/MainView.controller.js":function(){sap.ui.define(["./BaseController","com/sap/ui5community/model/formatter","sap/ui/model/Filter","sap/ui/model/FilterOperator"],function(e,t,n,o){"use strict";return e.extend("com.sap.ui5community.controller.MainView",{onInit:function(){},onUpdateToken:function(e){const t=this.getView().getModel("settings");let n=t.getProperty("/search");n=n.trim();let o=t.getProperty("/tokens");let i=e.getParameter("type");if(i==="added"){o.push(e.getParameter("addedTokens")[0].getProperty("key"))}else if(i==="removed"){let t=e.getParameter("removedTokens")[0].getProperty("key");o=o.filter(e=>e!==t)}this._applySearchFilter(n,o)},onNavBack:function(){history.go(-1)},onPress:function(e){const t=e.getSource().getBindingContext("packages").getObject().name;this.navTo("RouteObjectView",{name:t})},liveSearch:function(e){const t=this.getView().getModel("settings");let n=e.getParameter("value").trim();let o=t.getProperty("/tokens");this._applySearchFilter(n,o)},_applySearchFilter:function(e,t){if(!e){e=""}this.getView().getModel("settings").setProperty("/search",e);this.getView().getModel("settings").setProperty("/tokens",t);const i=this.getView().byId("_IDGenList1");const r=i.getBinding("items");const s=new n({path:"name",operator:o.Contains,value1:e});const a=new n({path:"description",operator:o.Contains,value1:e});let l=[];for(let e=0;e<t.length;e++){let i=new n({path:"type",operator:o.Contains,value1:t[e]});l.push(i)}const c=new n({filters:l,and:false});const g=new n({filters:[s,a],and:false});if(l.length>0){r.filter(new n({filters:[g,c],and:true}))}else{r.filter(g)}}})});
},
	"com/sap/ui5community/controller/ObjectView.controller.js":function(){sap.ui.define(["./BaseController","com/sap/ui5community/model/formatter","sap/ui/core/routing/History"],function(t,e,n){"use strict";return t.extend("com.sap.ui5community.controller.ObjectView",{onInit:function(){this.getRouter().getRoute("RouteObjectView").attachPatternMatched(this.onPatternMatched,this)},onPatternMatched:function(t){const e=t.getParameter("arguments").name;let n=this.getModel("packages");let a=n.getData();let i=a.findIndex(t=>t.name===e);if(!i){}this.getView().bindElement({path:`/${i}`,model:"packages"})},onNavBack:function(){var t=n.getInstance().getPreviousHash();if(t!==undefined){history.go(-1)}else{this.getRouter().navTo("RouteMainView",{},true)}}})});
},
	"com/sap/ui5community/i18n/i18n.properties":'# This is the resource bundle for com.sap.ui5community\n\n#Texts for manifest.json\n\n#XTIT: Application name\nappTitle=ui5community Packages\n\n#YDES: Application description\nappDescription=Description of com.sap.ui5community\n#XTIT: Main view title\ntitle=ui5community Packages\n\nlistItemTagUpdated=listItemTagUpdated\nlistItemTagCreated=listItemTagCreated',
	"com/sap/ui5community/manifest.json":'{"_version":"1.12.0","sap.app":{"id":"com.sap.ui5community","type":"application","i18n":"i18n/i18n.properties","applicationVersion":{"version":"0.0.1"},"title":"{{appTitle}}","description":"{{appDescription}}","resources":"resources.json","dataSources":{"packages":{"uri":"model/packages.json","type":"JSON"},"types":{"uri":"model/types.json","type":"JSON"}}},"sap.ui":{"fullWidth":true,"technology":"UI5","icons":{"icon":"","favIcon":"","phone":"","phone@2":"","tablet":"","tablet@2":""},"deviceTypes":{"desktop":true,"tablet":true,"phone":true}},"sap.ui5":{"flexEnabled":true,"dependencies":{"minUI5Version":"1.60.0","libs":{"sap.m":{},"sap.ui.core":{}}},"contentDensities":{"compact":true,"cozy":true},"models":{"i18n":{"type":"sap.ui.model.resource.ResourceModel","settings":{"bundleName":"com.sap.ui5community.i18n.i18n"}},"packages":{"type":"sap.ui.model.json.JSONModel","dataSource":"packages"},"types":{"type":"sap.ui.model.json.JSONModel","dataSource":"types"}},"resources":{"css":[{"uri":"css/style.css"}]},"routing":{"config":{"routerClass":"sap.m.routing.Router","viewType":"XML","async":true,"viewPath":"com.sap.ui5community.view","controlAggregation":"pages","controlId":"app","clearControlAggregation":false},"routes":[{"name":"RouteMainView","pattern":"","target":["TargetMainView"]},{"name":"RouteObjectView","pattern":"RouteObjectView/{name}","target":["TargetObjectView"]}],"targets":{"TargetMainView":{"viewType":"XML","transition":"slide","clearControlAggregation":false,"viewId":"MainView","viewName":"MainView"},"TargetObjectView":{"viewType":"XML","transition":"slide","clearControlAggregation":false,"viewId":"ObjectView","viewName":"ObjectView"}}},"rootView":{"viewName":"com.sap.ui5community.view.App","type":"XML","async":true,"id":"app"}}}',
	"com/sap/ui5community/model/formatter.js":function(){sap.ui.define([],function(){"use strict";return{formatRank:function(n){return+n+1},formatIndicator:function(n,t){if(n<t||isNaN(t)){return sap.m.DeviationIndicator.Up}if(n>t){return sap.m.DeviationIndicator.Down}return sap.m.DeviationIndicator.None},formatPastRankTooltip:function(n){const t=this.getView().getModel("i18n").getResourceBundle();if(isNaN(n)){return t.getText("noPrevListing")}return t.getText("prevListing",[+n+1])},isPresent:function(n){return!!n},containsNpmPackages:function(n){return n&&n.some(function(n){return n.type==="npm-package"})},formatHighlight:function(n,t){if(!n){return""}if(!t){return n}const e=n.toLowerCase().indexOf(t.toLowerCase());if(e>=0){const i=e+t.length;return`${n.slice(0,e)}<em>${n.slice(e,i)}</em>${n.slice(i)}`}return n},containsDockerImages:function(n){return n&&n.some(function(n){return n.type==="docker-image"})},containsPypiPackages:function(n){return n&&n.some(function(n){return n.type==="pypi-package"})},containsCodeRepositories:function(n){return n&&n.some(function(n){return n.type==="code-repository"})}}});
},
	"com/sap/ui5community/model/models.js":function(){sap.ui.define(["sap/ui/model/json/JSONModel","sap/ui/Device"],function(e,n){"use strict";return{createDeviceModel:function(){var i=new e(n);i.setDefaultBindingMode("OneWay");return i}}});
},
	"com/sap/ui5community/view/App.view.xml":'<mvc:View\n\tcontrollerName="com.sap.ui5community.controller.App"\n\tdisplayBlock="true"\n\txmlns="sap.m"\n\txmlns:mvc="sap.ui.core.mvc"><Shell appWidthLimited="false"><App id="app"\n\t\t\tbusy="{appView>/busy}"\n\t\t\tbusyIndicatorDelay="{appView>/delay}"/></Shell></mvc:View>',
	"com/sap/ui5community/view/MainView.view.xml":'<mvc:View controllerName="com.sap.ui5community.controller.MainView"\n    xmlns:mvc="sap.ui.core.mvc" displayBlock="true"\n    xmlns:f="sap.f"\n    xmlns="sap.m"\n    xmlns:tnt="sap.tnt"\n    xmlns:grid="sap.ui.layout.cssgrid"\n    xmlns:ui5cc="com.sap.ui5community.control"\n    xmlns:core="sap.ui.core"><Page id="page" title="{i18n>title}"><content><FlexBox id="_IDGenFlexBox1" direction="Column" alignItems="{= ${device>/system/phone} === true ? \'Inherit\' : \'Center\' }" justifyContent="Center"><MultiInput startSuggestion="0" placeholder="Search for..." class="enlargeSearchfield sapUiMediumMarginTopBottom" id="multiInput" width="100%" liveChange=".liveSearch" tokenUpdate=".onUpdateToken" showValueHelp="false" value="{settings>/search}" suggestionItems="{\n                                path: \'types>/\',\n                                sorter: { path: \'name\' }\n                            }"><core:Item key="{types>name}" text="{types>name}" /><layoutData><FlexItemData minWidth="{= ${device>/system/phone} === true ? \'\' : \'500px\' }" /></layoutData></MultiInput><List id="_IDGenList1" headerText="Packages" mode="None" items="{path: \'packages>/\'}"><CustomListItem id="_IDGenCustomListItem1" type="Navigation" press="onPress"><ui5cc:PackageListItemContent name="{packages>name}" description="{\n                                        parts: [\'packages>description\', \'settings>/search\'],\n                                        formatter: \'.formatter.formatHighlight\'\n                                      }" type="{packages>type}"/></CustomListItem><layoutData><FlexItemData minWidth="{= ${device>/system/phone} === true ? \'\' : \'800px\' }" /></layoutData></List></FlexBox></content></Page></mvc:View>\n',
	"com/sap/ui5community/view/ObjectView.view.xml":'<mvc:View\r\n\tcontrollerName="com.sap.ui5community.controller.ObjectView"\r\n\txmlns="sap.m"\r\n\txmlns:mvc="sap.ui.core.mvc"\r\n\txmlns:semantic="sap.f.semantic"\r\n\txmlns:form="sap.ui.layout.form"\r\n    xmlns:md="cc.md"><semantic:SemanticPage\r\n\t\tid="page"\r\n\t\theaderPinnable="false"\r\n\t\ttoggleHeaderOnTitleClick="false"\r\n\t\tbusy="{objectView>/busy}"\r\n\t\tbusyIndicatorDelay="{objectView>/delay}"><semantic:titleHeading><Title id="_IDGenTitle1" text="{packages>name}" /></semantic:titleHeading><semantic:content><md:Markdown id="_IDGenMarkdown1" content="{packages>readme}" /></semantic:content></semantic:SemanticPage></mvc:View>'
});