var map = new BMap.Map("container", {
     enableMapClick: false
}); // 创建地图实例


//TODO 地图样式


var mapStyleTD = [{
     "featureType": "water",
     "elementType": "all",
     "stylers": {
          "color": "#191f3c"
     }
}, {
     "featureType": "land",
     "elementType": "all",
     "stylers": {
          "color": "#282f57"
     }
}, {
     "featureType": "green",
     "elementType": "all",
     "stylers": {
          "color": "#282f57"
     }
}, {
     "featureType": "manmade",
     "elementType": "all",
     "stylers": {
          "color": "#282f57"
     }
}, {
     "featureType": "building",
     "elementType": "all",
     "stylers": {
          "color": "#3f4b8c"
     }
}, {
     "featureType": "boundary",
     "elementType": "geometry",
     "stylers": {
          "color": "#445195"
     }
}, {
     "featureType": "railway",
     "elementType": "geometry",
     "stylers": {
          "color": "#445195"
     }
}, {
     "featureType": "highway",
     "elementType": "geometry.stroke",
     "stylers": {
          "color": "#202749"
     }
}, {
     "featureType": "arterial",
     "elementType": "geometry.fill",
     "stylers": {
          "color": "#414e98"
     }
}, {
     "featureType": "local",
     "elementType": "geometry.fill",
     "stylers": {
          "color": "#303a6d"
     }
}, {
     "featureType": "local",
     "elementType": "geometry.stroke",
     "stylers": {
          "color": "#2d3667"
     }
}, {
     "featureType": "subway",
     "elementType": "all",
     "stylers": {
          "color": "#445195"
     }
}, {
     "featureType": "all",
     "elementType": "labels.text.stroke",
     "stylers": {
          "color": "#141831"
     }
}, {
     "featureType": "all",
     "elementType": "labels.text.fill",
     "stylers": {
          "color": "#5564b2"
     }
}, {
     "featureType": "poi",
     "elementType": "all",
     "stylers": {
          "visibility": "off"
     }
}, {
     "featureType": "subway",
     "elementType": "all",
     "stylers": {
          "visibility": "off"
     }
}, {
     "featureType": "arterial",
     "elementType": "geometry.stroke",
     "stylers": {
          "color": "#181e3e"
     }
}, {
     "featureType": "highway",
     "elementType": "geometry",
     "stylers": {
          "color": "#414e98",
          "weight": "0.9"
     }
}, {
     "featureType": "highway",
     "elementType": "labels",
     "stylers": {
          "color": "#353f7d",
          "visibility": "off"
     }
}];


map.setMapStyle({
     styleJson: (APP.styleType == 0) ? mapStyleTD : mapStyleWP
});
map.getContainer().style.background = "rgb(48, 56, 69)";
var top_left_control = new BMap.ScaleControl({
     anchor: BMAP_ANCHOR_TOP_LEFT
}); // 左上角，添加比例尺
var top_left_navigation = new BMap.NavigationControl(); //左上角，添加默认缩放平移控件
map.addControl(top_left_control);
map.addControl(top_left_navigation);
 
//map.centerAndZoom("北京", APP.mapScale[0]); // 初始化地图，设置中心点坐标和地图级别
// map.enableScrollWheelZoom(); // 允许滚轮缩放
map.setMaxZoom(19);//设置最大级别
map.setMinZoom(11)//设置最小级别
//放大到一定级别显示小标识点名称
map.addEventListener('zoomend',function(){
     if(map.getZoom()>=14){
          minIconLabel(true);
     }else{
          minIconLabel();
     }
});

map.enableScrollWheelZoom();
var point = new BMap.Point(116.404, 39.915);
 map.centerAndZoom(point,12);

var b = new BMap.Bounds(new BMap.Point(113.920412,38.298325),new BMap.Point(119.06635,41.564158));
try {
     BMapLib.AreaRestriction.setBounds(map, b);
} catch (e) {
     alert(e);
}



// 定义弹出框的构造函数
function Layers (center,opts){
     this._center = center;
     this._opts = opts;
     this._dom = {};
}
// 继承API的BMap.Overlay
Layers.prototype = new BMap.Overlay();

// 实现初始化方法
Layers.prototype.initialize = function(map){
// 保存map对象实例
     this._map = map;
     // 创建div元素，作为自定义覆盖物的容器
     this._dom.div = document.createElement("div");
     var html = "<em></em><div class='layersTitle'><span class='iconimg'><img src='assets/images/"+this._opts.icon+".png'/></span><strong title='"+this._opts.name+"'>"+this._opts.name+"</strong><small>关闭</small></div>"+
                                                  "<dl><dt><span>总热度排名</span><b>"+this._opts.allRank+"</b></dt><dd><span>"+this._opts.typeTxt+"热度排名</span><b>"+this._opts.catRank+"</b></dd></dl>";
     if(!APP.heatMapFlag){
          html += "<div class='layersBottom'><a>到这里的人，都来自哪里 &gt;&gt;</a></div>";
     }
     this._dom.div.innerHTML =html;
     this._dom.div.className = "layers";
     var _this = this;
     // 将div添加到覆盖物容器中
     map.getPanes().markerPane.appendChild(this._dom.div);
     map.getPanes().labelPane.style.zIndex=399;
     $(this._dom.div).find("small").bind('touchstart click',function(){
          _this.del();
     });
     $(this._dom.div).find(".layersBottom a").bind('touchstart click',function(){
          navIntoPoi(_this._opts.marker.id,_this._center,true);
     });



     map.panTo(this._center);


// 需要将div元素作为方法的返回值，当调用该覆盖物的show、
// hide方法，或者对覆盖物进行移除时，API都将操作此元素。
     return this._dom.div;
}
Layers.prototype.draw = function(){
     // 根据地理坐标转换为像素坐标，并设置给容器
     var position = map.pointToOverlayPixel(this._center);
     var ua = navigator.userAgent;
     if(/mobile/i.test(ua) || /android/i.test(ua) || /ios/i.test(ua) || /phone/i.test(ua)){
               this._dom.div.style.left = position.x-150  + "px";
          this._dom.div.style.top = position.y-112 + "px";
          $(".layers em").css('display','none');

     }else{
          this._dom.div.style.left = position.x+20  + "px";
          this._dom.div.style.top = position.y-30 + "px";

     };
};
// 添加自定义方法
Layers.prototype.del = function(){
     this._dom.div.style.display = 'none'
}