$(window).ready(function(){
     if(APP.styleType == 0){
          $('.insight_bot a').attr('href', 'mailto:dv@tendcloud.com');
     }else{
          $('.insight_bot a').attr('href', 'mailto:info@wifipix.com');
     }
     getCatList(formCat);
     $(".insight_top_one font").trigger('change');
});


$(".insight_top_one font").change(function(){
	//自定义事件
	try{
		var eventid = $(this).text();
		var lable = $(".insight_top_two").find("font").text();
		TDAPP.onEvent(eventid,lable);
	}catch(e){
		console.log(e);
	}
     var catId = $(".insight_top_one font:eq(0)").attr("data-id");
     var timeFilter = $(".insight_top_two font:eq(0)").attr("data-id");
     APP.typeId = catId;

     getPoiRanking(catId, timeFilter, formPoiRanking);
})

$(".insight_top_two font").change(function(){
	//自定义事件
	try{
		var eventid = $(".insight_top_one").find("font").text();
		var lable = $(this).text();
		TDAPP.onEvent(eventid,lable);
	}catch(e){
		console.log(e);
	}
     var catId = $(".insight_top_one font")[0].dataset.id;
     var timeFilter = $(".insight_top_two font")[0].dataset.id;
     getPoiRanking(catId, timeFilter, formPoiRanking);
})

$(".insight_top_three font").change(function(){
	//自定义事件
	try{
		var eventid = $(this).text();
		TDAPP.onEvent(eventid);
	}catch(e){
		console.log(e);
	}
     var id = $(".insight_top_three font")[0].dataset.id;
     var timeFilter = $(".insight_top_three font")[0].dataset.sort;
     getDetailRanking(id, timeFilter);
})

$(".insight_top_one").delegate('li', 'click',function(){
     var item = $(".insight_top_one font");
     item.text($(this).text());
     item[0].dataset.id = $(this)[0].dataset.id;
     item.trigger('change');
})

$(".insight_top_two").delegate('li', 'click',function(){
     var item = $(".insight_top_two font");
     item.text($(this).text());
     item[0].dataset.id = $(this)[0].dataset.id;
     item.trigger('change');
})

$(".insight_top_three").delegate('li', 'click',function(){
     var item = $(".insight_top_three font");
     item.text($(this).text());
     item[0].dataset.sort = $(this)[0].dataset.id;
     item.trigger('change');
})

$(".insight_top_tit").delegate('li', 'click', function() {
     $(this).parent().hide();
})

$(".insight_list_tit").delegate('li', 'click', function(){
	try{
		var eventid = $(".insight_top_three font").text();
		var lable = $(this).text();
		TDAPP.onEvent(eventid,lable);
	}catch(e){
		console.log(e);
	}
     $(this).siblings().removeClass('on');
     $(this).addClass('on');
     if($(this)[0].dataset.type == 'app'){
          $('.insight_con.brand').hide();
          $('.insight_con.app').show();
          var $transition = "#appScroll";
     }else{
          $('.insight_con.app').hide();
          $('.insight_con.brand').show();
          var $transition = "#brandScroll";
     }

     function loaded(selector) {
          var myScroll = new IScroll(selector, { mouseWheel: true });
     }
     document.addEventListener('touchmove', function (e) {
          e.preventDefault();
     }, false);
     loaded($transition);
})

$('.insight_con ul').delegate('li', 'click', function(e){
	try{
		var tags = $(".insight_top_one");
		var tsgs2 = $(".insight_top_two");
		if(tags.css("display") === "block"){
			var eventid = tags.find("font").text() || "";
			var lable = tsgs2.find("font").text() || "";
			var kv = {"add":$(this).text()};
			//console.log(eventid,lable,kv);
			TDAPP.onEvent(eventid,lable,kv);
		}
	}catch(e){
		console.log(e);
	}
     var type = $('.insight_list_tit .on')[0].dataset.type;
     if(type == 'app'){
          $('.insight_con.brand').hide();
          $('.insight_con.app').show();
     }else{
          $('.insight_con.app').hide();
          $('.insight_con.brand').show();
     }


     var id = $(this)[0].dataset.id;
     var coor = $(this)[0].dataset.coor;
     var name = $(this).find('font').html();
     navIntoPoi(id, coor);
});

$('.insight_return').click(function(){
     returnMainPage();
     if(APP.mobileFlag){//ֻ���ƶ��˲�ִ��
          $(".insight_right").hide();
          $(".insight_bar").addClass("insight_show");
     }
})



