var APP = {},ua = navigator.userAgent;;
APP.styleType = 0; //0: td; 1: wifipix
APP.mapScale = [12, 14];
APP.baseUrl = "http://www.talkingdata.com/index/behavior";
APP.mobileFlag = /mobile/i.test(ua) || /android/i.test(ua) || /ios/i.test(ua) || /phone/i.test(ua)



APP.iconArray = [
     {
          id: 1,
          name: "airport",
          length: 43
     }, {
          id: 2,
          name: "ski",
          length: 43
     }, {
          id: 3,
          name: "golf",
          length: 43
     }, {
          id: 4,
          name: "hotels",
          length: 43
     }, {
          id: 5,
          name: "attractions",
          length: 43
     }, {
          id: 6,
          name: "hospital",
          length: 43
     }, {
          id: 7,
          name: "trainStation",
          length: 43
     }, {
          id:8,
          name: "universities",
          length: 43
     }
];
APP.circleGroup = [];
//ajax
function request(target, reqBody, errorCallback, successCallback) {
     $.ajax({
          url: APP.baseUrl + target,
          dataType: "jsonp",
          error: function(errorData) {
               // console.log(url + " request error----" + errorData);
               alert(url + " request error----" + errorData);
               errorCallback();
          },
          success: function(data) {
               /*var datas = {
                content : data.content,
                top1 : [
                {"id": 1,"name": "首都机场",catId: 1, coordinate: "116.608931211,40.0539156348",hot: 44873, baiduCoordinate: "116.621197991,40.0610504659",radius: 1200},
                {"id":1058,"name":"北京南站","catId":7,"hot":34546,"coordinate":"116.372836244,39.8635050364","baiduCoordinate":"116.385518282,39.871058223","radius":700},
                {"id":184,"name":"温都水城滑雪场","catId":2,"hot":1655,"coordinate":"116.364519186,40.1054472652","baiduCoordinate":"116.377276919,40.1128584801","radius":200},
                {"id":288,"name":"高尔夫中心","catId":3,"hot":9486,"coordinate":"116.443149749,39.9353698613","baiduCoordinate":"116.455940483,39.9424367891","radius":100},
                {"id":452,"name":"华威酒店","catId":4,"hot":28345,"coordinate":"116.368572921,39.9097596921","baiduCoordinate":"116.381258798,39.9172271656","radius":100},
                {"id":862,"name":"蓝色港湾","catId":5,"hot":12406,"coordinate":"116.467215805,39.9471208259","baiduCoordinate":"116.479934643,39.954174787","radius":510},
                {"id":979,"name":"北京大学人民医院","catId":6,"hot":14476,"coordinate":"116.349019201,39.9353915733","baiduCoordinate":"116.361776536,39.9425005768","radius":300},
                {"id":28,"name":"中国人民大学","catId":8,"hot":9863,"coordinate":"116.317261153,39.9642846603","baiduCoordinate":"116.329961374,39.9713631354","radius":900}
                ]
                }
                if((!APP.typeId || APP.typeId == 0) && (data.content.length>0 && data.content[0].catId)){
                data = datas
                }*/

               APP.mapData = data.content;
               //if(APP.mapData.poitopone) {
               for(var x in data.content){
                    if(data.content[x].name == '滑雪场'){
                         data.content.splice(x,1);
                         break
                    }
               }
               if (data.errCode == 0) {
                    if(data.content.poirankbycat) {
                         successCallback(data.content.poirankbycat);
                    }else{
                         successCallback(data.content);
                    }
               }
               //}else if (data.errCode == 0) {
               //    successCallback(data.content);
               //};

          }
     });
}
//类别列表查询回调
function formCat(content) {
     var catList = $('.insight_top_one ul.insight_bor');
     catList.html('<li data-id="0">全部地点</li>');
     for (var i = 0; i <= content.length - 1; i++) {
          for(var x=0; x<APP.iconArray.length; x++){
               if(content[i].id == APP.iconArray[x].id){
                    APP.iconArray[x].txt= content[i].name;
                    break;
               }
          }
          var item = $('<li></li>').text(content[i].name).attr("data-id",content[i].id);
          //$(item)[0].dataset.id = content[i].id;
          catList.append(item);
     };
}
//某类别列表查询回调
function formPoiRanking(content) {

     APP.circleGroup = [];

     var poiListHTML = $('.insight_con.area ul');
     map.clearOverlays();
     poiListHTML.html('');
     formRanking(content, poiListHTML, function(i, content, maxHot, type){
          //console.log(content[i].catId)
          APP.circleGroup.push(drawPoiDot(content[i].catId, content[i].id, coorToPoint(content[i].baiduCoordinate), content[i].name,content[i].catId,type,content[i].allRank,content[i].catRank));// "#F6B407", getHotPercent(content[i].hot, maxHot), 12),content[i].catId);
     });
     var pointArr =[];
     for (var i = APP.circleGroup.length - 1; i >= 0; i--) {
          pointArr.push(APP.circleGroup[i].point);
     }
     map.setViewport(pointArr);
}

//APP
function formAppRanking(applist) {
     $('.insight_top_one').hide();
     $('.insight_top_two').hide();
     $('.insight_top_three').show();
     $('.insight_list_tit').show();

     $('.insight_con.area').hide();

     var applistHTML = $('.insight_con.app ul');
     formRanking(applist, applistHTML);


}
//品牌
function formBrandRanking(brandList, name) {
     var applistHTML = $('.insight_con.brand ul');
     formRanking(brandList, applistHTML);

     // $('.insight_con.brand').hide();
}


function formRanking(arr, ulElement, iterator) {

     var list = arr.content || arr;
     if(list.length == 0){
          //ulElement.html('<p style="text-align:center;padding-top:30px;">暂未查询到数据...</p>')
          return;
     }
     var maxHot = list[0].hot;
     ulElement.html('').parent(".brand").show();

     //判断如果是同类型，则前五显示大图标   iterator（i,list.maxHost,flag） flag: other/icon 其他/图标
     console.log(APP.mapData.poitopone);
     if(!APP.mapData.poitopone){
          for (var i = 0; i <= list.length - 1; i++) {

               //跳过滑雪场类型的数据
               if(list[i].catId == 2){
                    continue;
               }

               var item = $('<li></li>').attr("data-coor",list[i].baiduCoordinate).attr('data-id', list[i].id);
               var itemName = $('<font></font>').text(list[i].name);
               var itemHotbar = getHotbar(list[i].hot, maxHot);
               var flag = 'other';
               ulElement.append(item.append(itemName).append(itemHotbar));
               if(i<5){
                    flag = 'icon'
               }
               iterator&&iterator(i, list, maxHot,flag);
          };
     }else{//否则各类别TOP1显示大图标
          for(var x = 0; x<APP.mapData.poitopone.length; x++){//渲染各类别TOP1图标

               //跳过滑雪场类型的数据
               if(APP.mapData.poitopone[x].catId == 2){
                    continue;
               }
               iterator&&iterator( x, APP.mapData.poitopone, APP.mapData.poitopone[0].hot, 'icon');
          }
          for (var i = 0; i <= list.length - 1; i++) {

               //跳过滑雪场类型的数据
               if(list[i].catId == 2){
                    continue;
               }
               var item = $('<li></li>').attr("data-coor",list[i].baiduCoordinate).attr('data-id', list[i].id);
               var itemName = $('<font></font>').text(list[i].name);
               var itemHotbar = getHotbar(list[i].hot, maxHot);
               var status = null;
               ulElement.append(item.append(itemName).append(itemHotbar));
               for(var ii = 0; ii<APP.mapData.poitopone.length; ii++){
                    if(list[i].id == APP.mapData.poitopone[ii].id){//如果此坐标已经在TOP1列表中则忽略
                         status = true;
                         break
                    }
               }
               if(!status) {
                    iterator && iterator(i, list, maxHot, 'other');
               }

          };
     }

     var f = ulElement.attr('class'),$transition;
     if(f == 'allUL' || f == 'brandUL') {
          if(f == 'allUL') {
               $transition = "#allScroll";
          }else{
               $transition = "#brandScroll";
          }
          function loaded(selector) {
               var myScroll = new IScroll(selector, { mouseWheel:true,click:true });
          }

          document.addEventListener('touchmove', function (e) {
               e.preventDefault();
          }, false);
          if(APP.mobileFlag) {
               loaded($transition);
          }
     }

     /*ulElement.find('li:eq(0) em').removeClass('insight_other').addClass('insight_orange');
      ulElement.find('li:eq(1) em').removeClass('insight_other').addClass('insight_yellow');
      ulElement.find('li:eq(2) em').removeClass('insight_other').addClass('insight_green');*/
}

function getIcon(id, iconArray) {
     for (var i = iconArray.length - 1; i >= 0; i--) {
          if (iconArray[i]["id"] == id) {
               return iconArray[i];
          }
     };
}

// APP.circleGroup
//图标，label渲染函数
function drawPoiDot(seq, id, point, poi_name,catId,type,allRank,catRank) {// color, percent, level,catId) {
     var myIcon,hoverIcon;
     var marker;
     var iconLength = 12; //default for other pois than top 5
     seq = parseInt(seq);
     if (type =='icon' && $(".insight_top_two font:eq(0)").attr("data-id") != 0) {
          var icon = getIcon(seq, APP.iconArray);
          iconLength = icon.length;
          myIcon = new BMap.Icon("assets/images/" + icon.name + ".png", new BMap.Size(iconLength-10, iconLength*2))
          //hoverIcon =  new BMap.Icon("assets/images/" + icon.name + ".png", new BMap.Size(iconLength*2, iconLength*2));
          hoverIcon = new BMap.Icon("assets/images/" + icon.name + ".png", new BMap.Size(iconLength-10, iconLength*2), {
               imageOffset: new BMap.Size(-34, 0)
          })


     } else {
          myIcon = new BMap.Icon("assets/images/other.png", new BMap.Size(iconLength, iconLength));
          hoverIcon = new BMap.Icon("assets/images/other.png", new BMap.Size(iconLength, iconLength), {
               imageOffset: new BMap.Size(-12, 0)
          });
     }
     marker = new BMap.Marker(point, {
          icon: myIcon,
          title: poi_name
     });
     marker.id = id;
     marker.seq = seq;
     marker.type = type;
     marker.iconName = icon ? icon.name : 'other';
     marker.addEventListener('click', function() {
          //marker.removeEventListener('mouseout')
          poplayer(marker,point,poi_name,catId,allRank,catRank,myIcon,hoverIcon);
          // $('.insight_con.area ul li:eq(' + (seq - 1) + ')').trigger('click');
     });
     //(function (m,h){
     marker.addEventListener('mouseover', function() {
          this.setIcon(hoverIcon);
     });
     marker.addEventListener('mouseout', function() {
          this.setIcon(myIcon);
     });
     //})(myIcon,hoverIcon)
     /* marker.addEventListener('mouseover', function() {
      this.setIcon(new BMap.Icon("assets/images/" + this.iconName + ".png"));
      //this.setImageUrl("assets/images/" + this.iconName + ".png");
      //poplayer(seq,id,point,poi_name,catId,allRank,catRank);
      // $('.insight_con.area ul li:eq(' + (seq - 1) + ')').trigger('click');
      });*/


     var opts = {
               position: point//, // 指定文本标注所在的地理位置
               //offset: new BMap.Size(0, 2) //设置文本偏移量
          };
     if(APP.mobileFlag) {//只有移动端才执行
          if(poi_name.length>=7){
               opts.offset = new BMap.Size(-(poi_name.length*13/2), 0);
          }else{
               opts.offset = new BMap.Size(-(poi_name.length*16/2), 0);
          }
     }
     marker.label = new BMap.Label(poi_name, opts); // 创建文本标注对象
     marker.label.setStyle({
          color: "white",
          border: "0",
          background: (APP.styleType == 0) ? "transparent" : "#586e80",
          fontSize: "12px",
          borderRadius: "10px",
          padding: "0px 10px",
          height: "20px",
          lineHeight: "20px",
          fontFamily: "微软雅黑",
          transform: "translateX(-50%)"
     });


     map.addOverlay(marker.label);

     if (type !='icon' ) {
          marker.label.hide();
     }
     map.addOverlay(marker);
     return marker;
}
//弹出框
function poplayer (marker,point,name,catId,allRank,catRank,myIcon,hoverIcon){
     /*var position = map.pointToPixel(point),
      wX = $(window).width(),
      wY = $(window).height(),
      oX = $('.layers').width(),
      oY = $('.layers').height();
      $('.layers').removeAttr("style");
      $('.layers em').removeAttr("style");
      if((wX-position.x) < oX){
      $('.layers').css({"right" : (wX - position.x)+20+"px"});
      $('.layers em').css({"right" : "-10px"});
      }else{
      $('.layers').css({"left" : (position.x)+20+"px"});
      $('.layers em').css({"left" : "-10px"});
      }
      if((wY-position.y) < oY){
      $('.layers').css({"bottom" : (wY - position.y)-35+"px"});
      $('.layers em').css({"bottom" : "30px"});
      }else{
      $('.layers').css({"top" : (position.y)-35+"px"});
      $('.layers em').css({"top" : "30px"});
      };*/

     map.removeOverlay(APP.myLayer);
     APP.myLayer = null;
     // 添加自定义覆盖物
     var opts = {
          name: name,
          marker:marker,
          allRank: allRank,
          catRank:catRank,
          myIcon:myIcon,
          hoverIcon:hoverIcon
     }
     for(var i=0; i <APP.iconArray.length; i++){
          if(catId == APP.iconArray[i].id){
               opts.icon = APP.iconArray[i].name;
               opts.typeTxt = APP.iconArray[i].txt;
               break;
          }
     }
     APP.myLayer = new Layers(point,opts);
     map.addOverlay(APP.myLayer);

}

//显示label
function minIconLabel (n){
     if(APP.heatMapFlag){ //如果是详情热力图时，则跳出
          return;
     }
     if(n) {
          for (var i = 0; i < APP.circleGroup.length; i++) {
               if(APP.circleGroup[i].type != 'icon'){
                    APP.circleGroup[i].label.show();
               }
          }
     }else{
          for (var i = 8; i < APP.circleGroup.length; i++) {
               if(APP.circleGroup[i].type != 'icon'){
                    APP.circleGroup[i].label.hide();
               }
          }
     }
}
//类别列表查询
function getCatList(callback) {
     var target = '/category';
     request(target, null, function() {}, callback);
}
//某类别查询 （包括全部类别）
function getPoiRanking(catId, sortType, callback) {
     var catId = catId;
     var sortType = sortType;
     // console.log('catId: %s, sortType: %s', catId, sortType);

     if (catId == undefined) {
          catId = 0;
     };

     if (sortType == undefined) {
          sortType = 1;
     };

     var target;
     target = '/poirankings/' + catId + '/' + sortType;
     request(target, null, function() {}, callback);
}

function getDetailRanking(id, sortType){
     var target;

     target = '/apprankings/' + id + '/' + sortType;//'/apprankings/' + id + '/' + sortType;
     request(target, null, function() {}, function(content) {
          formAppRanking(content.app);
          formBrandRanking(content.brand);

          getHeatmapData(id, sortType);

     });
}

function getHeatmapData(poiId, sortType) {
     if (APP.heatmap){
          if(APP.heatmap.poiId == poiId && APP.heatmap.sortType == sortType) {
               APP.heatmap.toggle();
               $(".loading").hide();
               return;
          }else{
               $(".loading").show();
               APP.heatmap.hide();
               APP.heatmap = null;
          }
     }

     var target;

     target = '/heatmapdata/' + poiId + '/' + sortType;
     request(target, null, function() {}, function(content) {
          APP.heatmapData = content;
          //if(APP.heatMapFlag) {
          openHeatmap(poiId,sortType);
          //}
     })
}

function getHotbar(hot, maxHot) {
     // console.log('length: %s, fullLength: %s', hot, maxHot);
     var itemHotbar = $('<em></em>').addClass('insight_other').attr('style', 'width:' + getHotPercent(hot, maxHot) * 100 + '%');
     var hotBar = $('<span></span>').html(itemHotbar);
     // console.log("hotBar: " + hotBar.html());
     return hotBar;
}

function getHotPercent(length, fullLength) {
     length = parseFloat(length);
     fullLength = parseFloat(fullLength);
     // console.log('length: %s, fullLength: %s', length, fullLength);
     return (length / fullLength);
}

function coorToPoint(coor) {
     var lng = parseFloat(coor.split(',')[0]);
     var lat = parseFloat(coor.split(',')[1]);
     return new BMap.Point(lng, lat);
}

function navIntoPoi(id, coor, type) {
     $(".insight_con.brand").show();
     if(APP.mobileFlag){//只有在移动端才执行
          $(".insight_right").hide();
          $(".insight_bar").addClass("insight_show")
          $(".talk-return").css({right:'8px',top:'14px'})
     }
     // console.log('id: %s, coor: %s', id, coor);
     var marker = getIcon(id, APP.circleGroup);
     var point = typeof coor == 'string' ? coorToPoint(coor) :coor;
     marker.label.show();
     APP.currentPoi = id;
     //map.panTo(coorToPoint(coor));
     map.centerAndZoom(point, APP.mapScale[0]);
     $('.insight_return').show();
     $('.insight_rank').show();

     if(!type){
          $(".insight_top_three font")[0].dataset.id = id;
     }
     var sortType = $(".insight_top_three font")[0].dataset.sort;

     getDetailRanking(id, sortType);
     APP.heatMapFlag = id;
     $(".loading").show();
     map.removeOverlay(APP.myLayer);
     for(var i=0; i<APP.circleGroup.length; i++){
          if(APP.circleGroup[i].id != id){
               APP.circleGroup[i].label.hide();
               APP.circleGroup[i].hide();
          }else{
               APP.circleGroup[i].label.show();
               APP.circleGroup[i].show();

          }
     }
}

function returnMainPage() {

     APP.heatMapFlag = false;
     $(".loading").hide();
     map.removeOverlay(APP.myLayer);

     APP.heatmap && APP.heatmap.hide();

     APP.heatmapData = null;
     //var point ={lng: 116.50679, lat: 39.983917}
     //console.log(map.getCenter())
     //map.zoomTo(map.getZoom() - 2);
     //map.panTo({lng: 116.459992, lat: 39.943947})
     //console.log(map.getZoom())
     // var marker = getIcon(APP.currentPoi, APP.circleGroup);
     var pointArr =[];
     for (var i = APP.circleGroup.length - 1; i >= 0; i--) {
          pointArr.push(APP.circleGroup[i].point);
          APP.circleGroup[i].show();
          if (APP.circleGroup[i].type != 'icon' ) {
               APP.circleGroup[i].label.hide();
          }else{
               APP.circleGroup[i].label.show();
          };
     }
     map.setViewport(pointArr);


     $('.insight_return').hide();
     $('.insight_rank').hide();
     $('.insight_right .secondPage').hide();
     $('.insight_right .firstPage').show();

}