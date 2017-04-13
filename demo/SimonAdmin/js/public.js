var gm_indexName = "index.html";
$(function(){
    //userState();
    web_reload();


    var allcookies = document.cookie;//获取cookie
    var arrMain=allcookies.split(";");//把cookie值转成数组
    var usernum =arrMain.join().indexOf("Hm_lvt_3");
    
    var indexStr = arrMain.join(",");
    if(indexStr.indexOf("user")>=0){
        var strNum =0;
        while(strNum<arrMain.length){
            if(arrMain[strNum].indexOf("userCenter")>=0){
                var userStr =arrMain[strNum].substring(arrMain[strNum].length-1,arrMain[strNum].length);
                if(userStr>=0){
                    $(".lodingBox").hide();
                }else{
                    $(".lodingBox").show();
                    alert("请重新登录！");
                    return window.location.href = gm_indexName;
                }
                break;
            }
            strNum++;
        }
    }else{
        $(".lodingBox").show();
        alert("请重新登录！");
        return window.location.href = gm_indexName;
    }

    $(".js_userOut").click(function(){
        var name = " ";
        alert("退出成功！");
        document.cookie ="userCenter=" + name;//输出cookie
        window.location.href = gm_indexName;
    });
});
//刷新返回对应页面
function web_reload(){
    $(".leftMenu").each(function(i){
        $(this).click(function(){
            $(".leftMenu").removeClass("nav-active");
            $(this).addClass("nav-active");
        });
    });
};
//日常数据列表