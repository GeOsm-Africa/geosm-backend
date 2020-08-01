/**!
 * The MIT License
 *
 * Copyright (c) 2013 the angular-openlayers-directive Team, http://tombatossals.github.io/angular-openlayers-directive
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * angular-google-maps
 * https://github.com/tombatossals/angular-openlayers-directive
 *
 * @authors https://github.com/tombatossals/angular-openlayers-directive/graphs/contributors
 */

/*! angular-openlayers-directive 12-08-2015 */
!function(a,b){"function"==typeof define&&define.amd?define(["ol"],function(c){return a.angularOpenlayersDirective=b(c)}):a.angularOpenlayersDirective=b(a.ol)}(this,function(a){angular.module("openlayers-directive",["ngSanitize"]).directive("openlayers",["$log","$q","$compile","olHelpers","olMapDefaults","olData",function(b,c,d,e,f,g){return{restrict:"EA",transclude:!0,replace:!0,scope:{center:"=olCenter",defaults:"=olDefaults",view:"=olView",events:"=olEvents"},template:'<div class="angular-openlayers-map" ng-transclude></div>',controller:["$scope",function(a){var b=c.defer();a.getMap=function(){return b.promise},a.setMap=function(a){b.resolve(a)},this.getOpenlayersScope=function(){return a}}],link:function(b,c,d){var h=e.isDefined,i=e.createLayer,j=e.setMapEvents,k=e.setViewEvents,l=e.createView,m=f.setDefaults(b);h(d.width)&&(isNaN(d.width)?c.css("width",d.width):c.css("width",d.width+"px")),h(d.height)&&(isNaN(d.height)?c.css("height",d.height):c.css("height",d.height+"px")),h(d.lat)&&(m.center.lat=parseFloat(d.lat)),h(d.lon)&&(m.center.lon=parseFloat(d.lon)),h(d.zoom)&&(m.center.zoom=parseFloat(d.zoom));var n=a.control.defaults(m.controls),o=a.interaction.defaults(m.interactions),p=l(m.view),q=new a.Map({target:c[0],controls:n,interactions:o,renderer:m.renderer,view:p});if(!d.customLayers){var r={type:"Tile",source:{type:"OSM"}},s=i(r,p.getProjection(),"default");q.addLayer(s),q.set("default",!0)}if(!h(d.olCenter)){var t=a.proj.transform([m.center.lon,m.center.lat],m.center.projection,p.getProjection());p.setCenter(t),p.setZoom(m.center.zoom)}j(m.events,q,b),k(m.events,q,b),b.setMap(q),g.setMap(q,d.id)}}}]),angular.module("openlayers-directive").directive("olCenter",["$log","$location","olMapDefaults","olHelpers",function(b,c,d,e){return{restrict:"A",scope:!1,replace:!1,require:"openlayers",link:function(f,g,h,i){var j=e.safeApply,k=e.isValidCenter,l=e.isDefined,m=e.isArray,n=e.isNumber,o=e.isSameCenterOnMap,p=e.setCenter,q=e.setZoom,r=i.getOpenlayersScope();r.getMap().then(function(f){var g=d.getDefaults(r),i=f.getView(),s=r.center;if(-1!==h.olCenter.search("-"))return b.error('[AngularJS - Openlayers] The "center" variable can\'t use a "-" on his key name: "'+h.center+'".'),void p(i,g.view.projection,g.center,f);l(s)||(s={}),k(s)||(b.warn("[AngularJS - Openlayers] invalid 'center'"),s.lat=g.center.lat,s.lon=g.center.lon,s.zoom=g.center.zoom,s.projection=g.center.projection),s.projection||("pixel"!==g.view.projection?s.projection=g.center.projection:s.projection="pixel"),n(s.zoom)||(s.zoom=1),p(i,g.view.projection,s,f),i.setZoom(s.zoom);var t;if(s.centerUrlHash===!0){var u=function(){var a,b=c.search();if(l(b.c)){var d=b.c.split(":");3===d.length&&(a={lat:parseFloat(d[0]),lon:parseFloat(d[1]),zoom:parseInt(d[2],10)})}return a};t=u(),r.$on("$locationChangeSuccess",function(){var a=u();a&&!o(a,f)&&j(r,function(b){b.center.lat=a.lat,b.center.lon=a.lon,b.center.zoom=a.zoom})})}var v;r.$watchCollection("center",function(c){if(c){if(c.projection||(c.projection=g.center.projection),c.autodiscover)return v||(v=new a.Geolocation({projection:a.proj.get(c.projection)}),v.on("change",function(){if(c.autodiscover){var a=v.getPosition();j(r,function(b){b.center.lat=a[1],b.center.lon=a[0],b.center.zoom=12,b.center.autodiscover=!1,v.setTracking(!1)})}})),void v.setTracking(!0);k(c)||(b.warn("[AngularJS - Openlayers] invalid 'center'"),c=g.center);var d=i.getCenter();if(d){if("pixel"===g.view.projection)return void i.setCenter(c.coord);var e=a.proj.transform(d,g.view.projection,c.projection);(e[1]!==c.lat||e[0]!==c.lon)&&p(i,g.view.projection,c,f)}i.getZoom()!==c.zoom&&q(i,c.zoom,f)}}),f.on("moveend",function(){j(r,function(b){if(l(b.center)){var d=f.getView().getCenter();if(b.center.zoom=i.getZoom(),"pixel"===g.view.projection)return void(b.center.coord=d);if(b.center){var h=a.proj.transform(d,g.view.projection,b.center.projection);if(b.center.lat=h[1],b.center.lon=h[0],e.notifyCenterUrlHashChanged(r,b.center,c.search()),m(b.center.bounds)){var j=i.calculateExtent(f.getSize()),k=b.center.projection,n=g.view.projection;b.center.bounds=a.proj.transformExtent(j,n,k)}}}})})})}}}]),angular.module("openlayers-directive").directive("olLayer",["$log","$q","olMapDefaults","olHelpers",function(a,b,c,d){return{restrict:"E",scope:{properties:"=olLayerProperties"},replace:!1,require:"^openlayers",link:function(a,b,e,f){var g=d.isDefined,h=d.equals,i=f.getOpenlayersScope(),j=d.createLayer,k=d.setVectorLayerEvents,l=d.detectLayerType,m=d.createStyle,n=d.isBoolean,o=d.addLayerBeforeMarkers,p=d.isNumber,q=d.insertLayer,r=d.removeLayer;i.getMap().then(function(b){var d,f=b.getView().getProjection(),s=c.setDefaults(i),t=b.getLayers();if(a.$on("$destroy",function(){r(t,d.index),b.removeLayer(d)}),g(a.properties))a.$watch("properties",function(c,e){if(g(c.source)&&g(c.source.type)){if(!g(c.visible))return void(c.visible=!0);if(!g(c.opacity))return void(c.opacity=1);var i;if(g(d)){var u=function(a){return function(b){return b!==a}}(d);if(g(e)&&!h(c.source,e.source)){var v=d.index;t.removeAt(v),d=j(c,f),g(d)&&(q(t,v,d),"Vector"===l(c)&&k(s.events,b,a,c.name))}(g(e)&&c.opacity!==e.opacity||u(d))&&(p(c.opacity)||p(parseFloat(c.opacity)))&&d.setOpacity(c.opacity),g(c.index)&&c.index!==d.index&&(r(t,d.index),q(t,c.index,d)),(g(e)&&n(c.visible)&&c.visible!==e.visible||u(d))&&d.setVisible(c.visible),(g(c.style)&&!h(c.style,e.style)||u(d))&&(i=angular.isFunction(c.style)?c.style:m(c.style),d.setStyle&&angular.isFunction(d.setStyle)&&d.setStyle(i))}else d=j(c,f),g(c.index)?q(t,c.index,d):o(t,d),"Vector"===l(c)&&k(s.events,b,a,c.name),n(c.visible)&&d.setVisible(c.visible),c.opacity&&d.setOpacity(c.opacity),angular.isArray(c.extent)&&d.setExtent(c.extent),c.style&&(i=angular.isFunction(c.style)?c.style:m(c.style),d.setStyle&&angular.isFunction(d.setStyle)&&d.setStyle(i))}},!0);else if(g(e.sourceType)&&g(e.sourceUrl)){var u={source:{url:e.sourceUrl,type:e.sourceType}};d=j(u,f,e.layerName),"Vector"===l(u)&&k(s.events,b,a,e.name),o(t,d)}})}}}]),angular.module("openlayers-directive").directive("olPath",["$log","$q","olMapDefaults","olHelpers",function(a,b,c,d){return{restrict:"E",scope:{properties:"=olGeomProperties"},require:"^openlayers",replace:!0,template:'<div class="popup-label path" ng-bind-html="message"></div>',link:function(a,b,e,f){var g=d.isDefined,h=d.createFeature,i=d.createOverlay,j=d.createVectorLayer,k=d.insertLayer,l=d.removeLayer,m=f.getOpenlayersScope();m.getMap().then(function(d){var f=c.getDefaults(m),n=f.view.projection,o=j(),p=d.getLayers();if(k(p,p.getLength(),o),a.$on("$destroy",function(){l(p,o.index)}),g(e.coords)){var q=e.proj||"EPSG:4326",r=JSON.parse(e.coords),s={type:"Polygon",coords:r,projection:q,style:f.styles.path},t=h(s,n);if(o.getSource().addFeature(t),e.message){a.message=e.message;var u=t.getGeometry().getExtent(),v=i(b,u);d.addOverlay(v)}}else;})}}}]),angular.module("openlayers-directive").directive("olView",["$log","$q","olData","olMapDefaults","olHelpers",function(a,b,c,d,e){return{restrict:"A",scope:!1,replace:!1,require:"openlayers",link:function(a,b,c,f){var g=f.getOpenlayersScope(),h=e.isNumber,i=e.safeApply,j=e.createView;g.getMap().then(function(a){var b=d.getDefaults(g),c=g.view;c.projection||(c.projection=b.view.projection),c.maxZoom||(c.maxZoom=b.view.maxZoom),c.minZoom||(c.minZoom=b.view.minZoom),c.rotation||(c.rotation=b.view.rotation);var e=j(c);a.setView(e),g.$watchCollection("view",function(a){h(a.rotation)&&e.setRotation(a.rotation)}),e.on("change:rotation",function(){i(g,function(b){b.view.rotation=a.getView().getRotation()})})})}}}]),angular.module("openlayers-directive").directive("olControl",["$log","$q","olData","olMapDefaults","olHelpers",function(a,b,c,d,e){return{restrict:"E",scope:{properties:"=olControlProperties"},replace:!1,require:"^openlayers",link:function(a,b,c,d){var f,g,h=e.isDefined,i=d.getOpenlayersScope();i.getMap().then(function(b){var d=e.getControlClasses,i=d();return a.$on("$destroy",function(){b.removeControl(f)}),h(a.properties)&&h(a.properties.control)?(f=a.properties.control,void b.addControl(f)):void(c.name&&(h(a.properties)&&(g=a.properties),f=new i[c.name](g),b.addControl(f)))})}}}]),angular.module("openlayers-directive").directive("olMarker",["$log","$q","olMapDefaults","olHelpers",function(b,c,d,e){var f=function(){return{projection:"EPSG:4326",lat:0,lon:0,coord:[],show:!0,showOnMouseOver:!1,showOnMouseClick:!1,keepOneOverlayVisible:!1}},g=function(){function a(a){return b.map(function(a){return a.map}).indexOf(a)}var b=[];return{getInst:function(c,d){var f=a(d);if(-1===f){var g=e.createVectorLayer();g.set("markers",!0),d.addLayer(g),b.push({map:d,markerLayer:g,instScopes:[]}),f=b.length-1}return b[f].instScopes.push(c),b[f].markerLayer},deregisterScope:function(c,d){var e=a(d);if(-1===e)throw Error("This map has no markers");var f=b[e].instScopes,g=f.indexOf(c);if(-1===g)throw Error("Scope wan't registered");f.splice(g,1),f.length||(d.removeLayer(b[e].markerLayer),delete b[e])}}}();return{restrict:"E",scope:{lat:"=lat",lon:"=lon",label:"=label",properties:"=olMarkerProperties",style:"=olStyle"},transclude:!0,require:"^openlayers",replace:!0,template:'<div class="popup-label marker"><div ng-bind-html="message"></div><ng-transclude></ng-transclude></div>',link:function(c,h,i,j){var k=e.isDefined,l=j.getOpenlayersScope(),m=e.createFeature,n=e.createOverlay,o=h.find("ng-transclude").children().length>0;l.getMap().then(function(e){var j,p,q,r=g.getInst(c,e),s=f(),t=d.getDefaults(l),u=t.view.projection;return c.$on("$destroy",function(){r.getSource().removeFeature(q),k(j)&&e.removeOverlay(j),g.deregisterScope(c,e)}),k(c.properties)?void c.$watch("properties",function(d){function f(b){if(!d.label.show){var f=!1,g=e.getEventPixel(b),i=e.forEachFeatureAtPixel(g,function(a){return a}),l=!1;i===q&&(l=!0,f=!0,k(j)||(p="pixel"===s.projection?s.coord:a.proj.transform([s.lon,s.lat],s.projection,u),j=n(h,p),e.addOverlay(j)),!d.onClick||"click"!==b.type&&"touchend"!==b.type||c.$apply(function(){d.onClick.call(q,b,d)}),e.getTarget().style.cursor="pointer"),!f&&j&&(l=!0,e.removeOverlay(j),j=void 0,e.getTarget().style.cursor=""),l&&b.preventDefault()}}function g(b){if(!d.label.show){var c=!1,f=e.getEventPixel(b),g=e.forEachFeatureAtPixel(f,function(a){return a}),i=!1;g===q&&(i=!0,c=!0,k(j)||(p="pixel"===s.projection?s.coord:a.proj.transform([s.lon,s.lat],s.projection,u),j=n(h,p),angular.forEach(e.getOverlays(),function(a){e.removeOverlay(a)}),e.addOverlay(j)),e.getTarget().style.cursor="pointer"),!c&&j&&(i=!0,j=void 0,e.getTarget().style.cursor=""),i&&b.preventDefault()}}function i(a){angular.forEach(e.getOverlays(),function(a){e.removeOverlay(a)}),a.preventDefault()}var l=function(){function a(){c=!0,b&&clearTimeout(b),b=setTimeout(function(){c=!1,b=null},500)}var b,c=!1;return e.getViewport().querySelector("canvas.ol-unselectable").addEventListener("touchmove",a),function(){c||(f.apply(null,arguments),a())}}();if(k(q)){var v=a.proj.transform([d.lon,d.lat],s.projection,e.getView().getProjection());if(!angular.equals(q.getGeometry().getCoordinates(),v)){var w=new a.geom.Point(v);q.setGeometry(w)}}else s.projection=d.projection?d.projection:s.projection,s.coord=d.coord?d.coord:s.coord,s.lat=d.lat?d.lat:s.lat,s.lon=d.lon?d.lon:s.lon,k(d.style)?s.style=d.style:s.style=t.styles.marker,q=m(s,u),k(q)||b.error("[AngularJS - Openlayers] Received invalid data on the marker."),r.getSource().addFeature(q);k(j)&&e.removeOverlay(j),k(d.label)&&(c.message=d.label.message,(o||k(c.message)&&0!==c.message.length)&&(d.label&&d.label.show===!0&&(p="pixel"===s.projection?s.coord:a.proj.transform([d.lon,d.lat],s.projection,u),j=n(h,p),e.addOverlay(j)),j&&d.label&&d.label.show===!1&&(e.removeOverlay(j),j=void 0),d.label&&d.label.show===!1&&d.label.showOnMouseOver&&e.getViewport().addEventListener("mousemove",f),(d.label&&d.label.show===!1&&d.label.showOnMouseClick||d.onClick)&&(e.getViewport().addEventListener("click",l),e.getViewport().querySelector("canvas.ol-unselectable").addEventListener("touchend",l)),d.label&&d.label.show===!1&&d.label.keepOneOverlayVisible&&(e.getViewport().addEventListener("mousemove",g),e.getViewport().addEventListener("click",i))))},!0):(s.lat=c.lat?c.lat:s.lat,s.lon=c.lon?c.lon:s.lon,s.message=i.message,s.style=c.style?c.style:t.styles.marker,q=m(s,u),k(q)||b.error("[AngularJS - Openlayers] Received invalid data on the marker."),r.getSource().addFeature(q),void((s.message||o)&&(c.message=i.message,p=a.proj.transform([s.lon,s.lat],s.projection,u),j=n(h,p),e.addOverlay(j))))})}}}]),angular.module("openlayers-directive").service("olData",["$log","$q","olHelpers",function(a,b,c){var d=c.obtainEffectiveMapId,e={},f=function(a,b){var c=d(a,b);a[c].resolvedDefer=!0},g=function(a,c){var e,f=d(a,c);return angular.isDefined(a[f])&&a[f].resolvedDefer!==!0?e=a[f].defer:(e=b.defer(),a[f]={defer:e,resolvedDefer:!1}),e},h=function(a,b){var c,e=d(a,b);return c=angular.isDefined(a[e])&&a[e].resolvedDefer!==!1?a[e].defer:g(a,b)};this.setMap=function(a,b){var c=g(e,b);c.resolve(a),f(e,b)},this.getMap=function(a){var b=h(e,a);return b.promise}}]),angular.module("openlayers-directive").factory("olHelpers",["$q","$log","$http",function(b,c,d){var e=function(a){return angular.isDefined(a)},f=function(a,b,c){a.on(b,function(d){var e=d.coordinate,f=a.getView().getProjection().getCode();"pixel"===f&&(e=e.map(function(a){return parseInt(a,10)})),c.$emit("openlayers.map."+b,{coord:e,projection:f,event:d})})},g=["Road","Aerial","AerialWithLabels","collinsBart","ordnanceSurvey"],h=function(){return{attribution:a.control.Attribution,fullscreen:a.control.FullScreen,mouseposition:a.control.MousePosition,rotate:a.control.Rotate,scaleline:a.control.ScaleLine,zoom:a.control.Zoom,zoomslider:a.control.ZoomSlider,zoomtoextent:a.control.ZoomToExtent}},i=["osm","sat","hyb"],j=["World_Imagery","World_Street_Map","World_Topo_Map","World_Physical_Map","World_Terrain_Base","Ocean_Basemap","NatGeo_World_Map"],k={style:a.style.Style,fill:a.style.Fill,stroke:a.style.Stroke,circle:a.style.Circle,icon:a.style.Icon,image:a.style.Image,regularshape:a.style.RegularShape,text:a.style.Text},l=function(a,b){return b&&a instanceof b?a:b?new b(a):a},m=function s(a,b){var c;if(b?c=a[b]:(b="style",c=a),"style"===b&&a instanceof Function)return a;if(!(c instanceof Object))return c;var d;if("[object Object]"===Object.prototype.toString.call(c)){d={};var e=k[b];if(e&&c instanceof e)return c;Object.getOwnPropertyNames(c).forEach(function(a,f,g){var h=k[a];return e&&h&&h.prototype instanceof k[b]?(console.assert(1===g.length,"Extra parameters for "+b),d=s(c,a),l(d,h)):(d[a]=s(c,a),void("text"!==a&&"string"!=typeof d[a]&&(d[a]=l(d[a],k[a]))))})}else d=c;return l(d,k[b])},n=function(a){if(a.type)return a.type;switch(a.source.type){case"ImageWMS":return"Image";case"ImageStatic":return"Image";case"GeoJSON":return"Vector";case"JSONP":return"Vector";case"TopoJSON":return"Vector";case"KML":return"Vector";case"TileVector":return"Vector";default:return"Tile"}},o=function(b){var d;switch(b.projection){case"pixel":if(!e(b.extent))return void c.error("[AngularJS - Openlayers] - You must provide the extent of the image if using pixel projection");d=new a.proj.Projection({code:"pixel",units:"pixels",extent:b.extent});break;default:d=new a.proj.get(b.projection)}return d},p=function(a){return-1!==["watercolor","terrain","toner"].indexOf(a)},q=function(b,f){var h;switch(b.type){case"MapBox":if(!b.mapId||!b.accessToken)return void c.error("[AngularJS - Openlayers] - MapBox layer requires the map id and the access token");var k="http://api.tiles.mapbox.com/v4/"+b.mapId+"/{z}/{x}/{y}.png?access_token="+b.accessToken,l=window.devicePixelRatio;l>1&&(k=k.replace(".png","@2x.png")),h=new a.source.XYZ({url:k,attributions:r(b),tilePixelRatio:l>1?2:1});break;case"ImageWMS":b.url&&b.params||c.error("[AngularJS - Openlayers] - ImageWMS Layer needs valid server url and params properties"),h=new a.source.ImageWMS({url:b.url,attributions:r(b),crossOrigin:"undefined"==typeof b.crossOrigin?"anonymous":b.crossOrigin,params:b.params});break;case"TileWMS":(b.url||b.urls)&&b.params||c.error("[AngularJS - Openlayers] - TileWMS Layer needs valid url (or urls) and params properties");var m={crossOrigin:"undefined"==typeof b.crossOrigin?"anonymous":b.crossOrigin,params:b.params,attributions:r(b)};b.url&&(m.url=b.url),b.urls&&(m.urls=b.urls),h=new a.source.TileWMS(m);break;case"WMTS":(b.url||b.urls)&&b.tileGrid||c.error("[AngularJS - Openlayers] - WMTS Layer needs valid url (or urls) and tileGrid properties");var n={projection:f,layer:b.layer,attributions:r(b),matrixSet:"undefined"===b.matrixSet?f:b.matrixSet,format:"undefined"===b.format?"image/jpeg":b.format,requestEncoding:"undefined"===b.requestEncoding?"KVP":b.requestEncoding,tileGrid:new a.tilegrid.WMTS({origin:b.tileGrid.origin,resolutions:b.tileGrid.resolutions,matrixIds:b.tileGrid.matrixIds})};e(b.url)&&(n.url=b.url),e(b.urls)&&(n.urls=b.urls),h=new a.source.WMTS(n);break;case"OSM":h=new a.source.OSM({attributions:r(b)}),b.url&&h.setUrl(b.url);break;case"BingMaps":if(!b.key)return void c.error("[AngularJS - Openlayers] - You need an API key to show the Bing Maps.");var o={key:b.key,attributions:r(b),imagerySet:b.imagerySet?b.imagerySet:g[0]};b.maxZoom&&(o.maxZoom=b.maxZoom),h=new a.source.BingMaps(o);break;case"MapQuest":if(!b.layer||-1===i.indexOf(b.layer))return void c.error("[AngularJS - Openlayers] - MapQuest layers needs a valid 'layer' property.");h=new a.source.MapQuest({attributions:r(b),layer:b.layer});break;case"EsriBaseMaps":if(!b.layer||-1===j.indexOf(b.layer))return void c.error("[AngularJS - Openlayers] - ESRI layers needs a valid 'layer' property.");var q="http://services.arcgisonline.com/ArcGIS/rest/services/",s=q+b.layer+"/MapServer/tile/{z}/{y}/{x}";h=new a.source.XYZ({attributions:r(b),url:s});break;case"GeoJSON":if(!b.geojson&&!b.url)return void c.error("[AngularJS - Openlayers] - You need a geojson property to add a GeoJSON layer.");e(b.url)?h=new a.source.GeoJSON({projection:f,url:b.url}):(e(b.geojson.projection)||(b.geojson.projection=f),h=new a.source.GeoJSON(b.geojson));break;case"JSONP":if(!b.url)return void c.error("[AngularJS - Openlayers] - You need an url properly configured to add a JSONP layer.");e(b.url)&&(h=new a.source.ServerVector({format:new a.format.GeoJSON,loader:function(){var a=b.url+"&outputFormat=text/javascript&format_options=callback:JSON_CALLBACK";d.jsonp(a,{cache:b.cache}).success(function(a){h.addFeatures(h.readFeatures(a))}).error(function(a){c(a)})},projection:f}));break;case"TopoJSON":if(!b.topojson&&!b.url)return void c.error("[AngularJS - Openlayers] - You need a topojson property to add a TopoJSON layer.");h=b.url?new a.source.TopoJSON({projection:f,url:b.url}):new a.source.TopoJSON(b.topojson);break;case"TileJSON":h=new a.source.TileJSON({url:b.url,attributions:r(b),crossOrigin:"anonymous"});break;case"TileVector":b.url&&b.format||c.error("[AngularJS - Openlayers] - TileVector Layer needs valid url and format properties"),h=new a.source.TileVector({url:b.url,projection:f,attributions:r(b),format:b.format,tileGrid:new a.tilegrid.XYZ({maxZoom:b.maxZoom||19})});break;case"TileTMS":b.url&&b.tileGrid||c.error("[AngularJS - Openlayers] - TileTMS Layer needs valid url and tileGrid properties"),h=new a.source.TileImage({url:b.url,maxExtent:b.maxExtent,attributions:r(b),tileGrid:new a.tilegrid.TileGrid({origin:b.tileGrid.origin,resolutions:b.tileGrid.resolutions}),tileUrlFunction:function(a){var c=a[0],d=a[1],e=a[2];if(0>d||0>e)return"";var f=b.url+c+"/"+d+"/"+e+".png";return f}});break;case"TileImage":h=new a.source.TileImage({url:b.url,attributions:r(b),tileGrid:new a.tilegrid.TileGrid({origin:b.tileGrid.origin,resolutions:b.tileGrid.resolutions}),tileUrlFunction:function(a){var c=a[0],d=a[1],e=-a[2]-1,f=b.url.replace("{z}",c.toString()).replace("{x}",d.toString()).replace("{y}",e.toString());return f}});break;case"KML":var t=b.extractStyles||!1;h=new a.source.KML({url:b.url,projection:b.projection,radius:b.radius,extractStyles:t});break;case"Stamen":if(!b.layer||!p(b.layer))return void c.error("[AngularJS - Openlayers] - You need a valid Stamen layer.");h=new a.source.Stamen({layer:b.layer});break;case"ImageStatic":if(!b.url||!angular.isArray(b.imageSize)||2!==b.imageSize.length)return void c.error("[AngularJS - Openlayers] - You need a image URL to create a ImageStatic layer.");h=new a.source.ImageStatic({url:b.url,attributions:r(b),imageSize:b.imageSize,projection:f,imageExtent:f.getExtent(),imageLoadFunction:b.imageLoadFunction});break;case"XYZ":b.url||c.error("[AngularJS - Openlayers] - XYZ Layer needs valid url and params properties"),h=new a.source.XYZ({url:b.url,attributions:r(b),minZoom:b.minZoom,maxZoom:b.maxZoom})}return h||c.warn('[AngularJS - Openlayers] - No source could be found for type "'+b.type+'"'),h},r=function(b){var c=[];return e(b.attribution)&&c.unshift(new a.Attribution({html:b.attribution})),c};return{isDefined:e,isNumber:function(a){return angular.isNumber(a)},createView:function(b){var c=o(b);return new a.View({projection:c,maxZoom:b.maxZoom,minZoom:b.minZoom,extent:b.extent})},isDefinedAndNotNull:function(a){return angular.isDefined(a)&&null!==a},isString:function(a){return angular.isString(a)},isArray:function(a){return angular.isArray(a)},isObject:function(a){return angular.isObject(a)},equals:function(a,b){return angular.equals(a,b)},isValidCenter:function(a){return angular.isDefined(a)&&("boolean"==typeof a.autodiscover||angular.isNumber(a.lat)&&angular.isNumber(a.lon)||angular.isArray(a.coord)&&2===a.coord.length&&angular.isNumber(a.coord[0])&&angular.isNumber(a.coord[1])||angular.isArray(a.bounds)&&4===a.bounds.length&&angular.isNumber(a.bounds[0])&&angular.isNumber(a.bounds[1])&&angular.isNumber(a.bounds[1])&&angular.isNumber(a.bounds[2]))},safeApply:function(a,b){var c=a.$root.$$phase;"$apply"===c||"$digest"===c?a.$eval(b):a.$apply(b)},isSameCenterOnMap:function(b,c){var d=b.projection||"EPSG:4326",e=[b.lon,b.lat],f=c.getView().getProjection(),g=a.proj.transform(c.getView().getCenter(),f,d),h=c.getView().getZoom();return g[1].toFixed(4)===e[1].toFixed(4)&&g[0].toFixed(4)===e[0].toFixed(4)&&h===b.zoom?!0:!1},setCenter:function(b,c,d,e){if(e&&b.getCenter()){var f=a.animation.pan({duration:150,source:b.getCenter()});e.beforeRender(f)}if(d.projection===c)b.setCenter([d.lon,d.lat]);else{var g=[d.lon,d.lat];b.setCenter(a.proj.transform(g,d.projection,c))}},setZoom:function(b,c,d){var e=a.animation.zoom({duration:150,resolution:d.getView().getResolution()});d.beforeRender(e),b.setZoom(c)},isBoolean:function(a){return"boolean"==typeof a},obtainEffectiveMapId:function(a,b){var d,e;if(angular.isDefined(b))d=b;else if(1===Object.keys(a).length)for(e in a)a.hasOwnProperty(e)&&(d=e);else 0===Object.keys(a).length?d="main":c.error("[AngularJS - Openlayers] - You have more than 1 map on the DOM, you must provide the map ID to the olData.getXXX call");return d},createStyle:m,setMapEvents:function(a,b,c){if(e(a)&&angular.isArray(a.map))for(var d in a.map){var g=a.map[d];f(b,g,c)}},setVectorLayerEvents:function(a,b,c,d){e(a)&&angular.isArray(a.layers)&&angular.forEach(a.layers,function(a){angular.element(b.getViewport()).on(a,function(f){var g=b.getEventPixel(f),h=b.forEachFeatureAtPixel(g,function(a,b){return b.get("name")===d?a:null});e(h)&&c.$emit("openlayers.layers."+d+"."+a,h,f)})})},setViewEvents:function(a,b,c){if(e(a)&&angular.isArray(a.view)){var d=b.getView();angular.forEach(a.view,function(a){d.on(a,function(b){c.$emit("openlayers.view."+a,d,b)})})}},detectLayerType:n,createLayer:function(b,c,d){var f,g=n(b),h=q(b.source,c);if(h){switch("Vector"===g&&b.clustering&&(h=new a.source.Cluster({source:h,distance:b.clusteringDistance})),g){case"Image":f=new a.layer.Image({source:h});break;case"Tile":f=new a.layer.Tile({source:h});break;case"Heatmap":f=new a.layer.Heatmap({source:h});break;case"Vector":f=new a.layer.Vector({source:h})}return e(d)?f.set("name",d):e(b.name)&&f.set("name",b.name),f}},createVectorLayer:function(){return new a.layer.Vector({source:new a.source.Vector})},notifyCenterUrlHashChanged:function(a,b,c){if(b.centerUrlHash){var d=b.lat.toFixed(4)+":"+b.lon.toFixed(4)+":"+b.zoom;e(c.c)&&c.c===d||a.$emit("centerUrlHash",d)}},getControlClasses:h,detectControls:function(a){var b={},c=h();return a.forEach(function(a){for(var d in c)a instanceof c[d]&&(b[d]=a)}),b},createFeature:function(b,c){var d;switch(b.type){case"Polygon":d=new a.geom.Polygon(b.coords);break;default:d=e(b.coord)&&"pixel"===b.projection?new a.geom.Point(b.coord):new a.geom.Point([b.lon,b.lat])}e(b.projection)&&"pixel"!==b.projection&&(d=d.transform(b.projection,c));var f=new a.Feature({geometry:d});if(e(b.style)){var g=m(b.style);f.setStyle(g)}return f},addLayerBeforeMarkers:function(a,b){for(var c,d=0;d<a.getLength();d++){var f=a.item(d);if(f.get("markers")){c=d;break}}if(e(c)){var g=a.item(c);b.index=c,a.setAt(c,b),g.index=a.getLength(),a.push(g)}else b.index=a.getLength(),a.push(b)},removeLayer:function(a,b){a.removeAt(b);for(var c=b;c<a.getLength();c++){var d=a.item(c);if(null===d){a.insertAt(c,null);break}d.index=c}},insertLayer:function(a,b,c){if(a.getLength()<b){for(;a.getLength()<b;)a.push(null);c.index=b,a.push(c)}else{c.index=b,a.insertAt(c.index,c);for(var d=b+1;d<a.getLength();d++){var e=a.item(d);if(null===e){a.removeAt(d);break}e.index=d}}},createOverlay:function(b,c){b.css("display","block");var d=new a.Overlay({position:c,element:b,positioning:"center-left"});return d}}}]),angular.module("openlayers-directive").factory("olMapDefaults",["$q","olHelpers",function(b,c){var d="data:image/png;base64,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",e=function(){return{view:{projection:"EPSG:3857",minZoom:void 0,maxZoom:void 0,rotation:0,extent:void 0},center:{lat:0,lon:0,zoom:1,autodiscover:!1,bounds:[],centerUrlHash:!1,projection:"EPSG:4326"},styles:{path:{stroke:{color:"blue",width:8}},marker:{image:new a.style.Icon({anchor:[.5,1],anchorXUnits:"fraction",anchorYUnits:"fraction",opacity:.9,src:d})}},events:{map:[],markers:[],layers:[]},controls:{attribution:!0,rotate:!1,zoom:!0},interactions:{mouseWheelZoom:!1},renderer:"canvas"}},f=c.isDefined,g={};return{getDefaults:function(a){if(!f(a))for(var b in g)return g[b];return g[a.$id]},setDefaults:function(a){var b=a.defaults,c=a.$id,d=e();return f(b)&&(f(b.layers)&&(d.layers=angular.copy(b.layers)),f(b.controls)&&(d.controls=angular.copy(b.controls)),f(b.events)&&(d.events=angular.copy(b.events)),f(b.interactions)&&(d.interactions=angular.copy(b.interactions)),f(b.renderer)&&(d.renderer=b.renderer),f(b.view)&&(d.view.maxZoom=b.view.maxZoom||d.view.maxZoom,d.view.minZoom=b.view.minZoom||d.view.minZoom,d.view.projection=b.view.projection||d.view.projection,d.view.extent=b.view.extent||d.view.extent),f(b.styles)&&(d.styles=angular.extend(d.styles,b.styles))),g[c]=d,d}}}])});