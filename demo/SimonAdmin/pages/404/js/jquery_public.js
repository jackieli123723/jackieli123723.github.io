/**
 * Created by Lenovo on 2016/5/26.
 */
/*ͼ���ƶ��ķ���*/
$(function(){
    var H = $(window).height();
    $(".fly_man").each(function () {
        var num = Math.random()*15000+10000;
        $(this).stop().animate({"top":H+800},num);
    });
});
function moveHero(){
    clearTimeout();
    /*��ȡbody�Ŀ�����*/
    var WIDTH = $(window).width();
    var HEIGHT = $(window).height();
    var _flyBox = $(".flyBox");
    for(var i=0;i<1;i++){
        img = new Image();
        img.className = "fly_man";
        img.src = "images/fly_man.png";
        /*�������ͼ��Ŀ���*/
        img.width = Math.random()*130+30;
        _flyBox.append(img);
        $(img).each(function () {
            /*�������ͼ��Ķ���ִ��ʱ��*/
            var num = Math.random()*15000+15000;
            var num1 = parseInt(Math.random()*10+25);
            /*�������ͼƬ��x������*/
            var _width = Math.random()*WIDTH+200-50;
            $(this).css({"left":_width,"top":"-260px","z-index":num1});
            $(this).stop().animate({"top":HEIGHT+800},num);
        })
    }
    setTimeout(moveHero,1000);
}
/*���������Ļ�߶ȵ�ͼ��ķ���*/
function clearImg(){
    clearTimeout();
    /*��ȡbody�Ŀ�����.cloudBox */
    var H = $(window).height();
    var imgs = $("img.fly_man");
    imgs.each(function () {
        if(parseInt($(this).css("top"))>H+750){
            $(this).remove();
        }
    });
    setTimeout(clearImg,4000);
}
/*�ƶ��ƶ��ķ���*/
function moveCloud(){
    var w = $(window).width();
    $(".st01").stop().animate({"left":"15%"},10000).animate({"left":"-7%"},10000);
    $(".st03").stop().animate({"left":"0%"},8000).animate({"left":"8%"},12000);
    $(".st04").stop().animate({"left":"34%"},7000).animate({"left":"13%"},13000);
    $(".st06").stop().animate({"left":"51%"},12000).animate({"left":"33%"},8000);
    $(".st10").stop().animate({"left":"77%"},12000).animate({"left":"105%"},8000);

    $(".st02").stop().animate({"left":"35%"},8000).animate({"left":"50%"},12000);
    $(".st05").stop().animate({"left":"51%"},11000).animate({"left":"66%"},9000);
    $(".st07").stop().animate({"left":"64%"},13000).animate({"left":"80%"},7000);
    $(".st08").stop().animate({"left":"110%"},12000).animate({"left":"93%"},8000);
    $(".st09").stop().animate({"left":"105%"},12000).animate({"left":"75%"},8000);
    setTimeout(moveCloud,20000);
}
moveCloud();
moveHero();
clearImg();