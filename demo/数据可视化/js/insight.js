/**
 * Created by zhaoxue on 2015/5/4.
 */

$(".insight_top_tit").mouseover(function(){
     $(this).find("ul").show();
     $(this).find("p span").addClass('insight_on')
})

$(".insight_top_tit").mouseout(function(){
     $(this).find("ul").hide();
     $(this).find("p span").removeClass('insight_on')
})

$(".insight_top_one li").click(function(){
     // $(".insight_top_one font").text($(this).text());
})
$(".insight_top_two li").click(function(){
     // $(".insight_top_two font").text($(this).text());
})

$(".insight_con ul").delegate("li font", "mouseenter", function(){
     $(this).css("overflow", "visible");
     $(this).siblings("span").hide();
});

$(".firstPage ul").delegate("li font", "mouseenter", function(){
     $(this).css({"overflow":"visible","cursor":"pointer"});
});

$(".insight_con ul").delegate("li font", "mouseleave", function(){
     $(this).css("overflow", "hidden");
     $(this).siblings("span").show();
});

var $insight = $(".insight_right")
var $bTn = $(".insight_bar")

$bTn.click(function(){
     if($insight.is(":visible")){
          $insight.hide();
          $(".insight_bar").addClass('insight_show');
          $(".talk-return").css('right','15px');
     }else{
          $insight.show();
          $(".insight_bar").removeClass('insight_show');
          $(".talk-return").css('right','330px');
          $(".insight_right").css('margin-right','0');
          function loaded(selector) {
               var myScroll = new IScroll(selector, { mouseWheel:true,click:true });
          }
          if($("#brandScroll").css("display") =='block'){
               loaded('#brandScroll');
          }else if($("#allScroll").css("display") =='block'){
               loaded('#allScroll');
          }

     }
})

$(".insight_rank_con").find("ul:nth-child(even)").addClass('insight_rank_line')
$(".insight_rank_con").find("ul:nth-child(odd)").addClass('insight_rank_none')

$(".insight_rank_con").hide();
$(".insight_rank_tit").click(function(){
     $(".insight_rank_con").show();
})

$(".insight_rank_con span").click(function(){
     $(".insight_rank_con").hide();
})

