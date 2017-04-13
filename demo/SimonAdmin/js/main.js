$(function() {

    show_msg.timer = null;
    function show_msg(msg, timeOut) {
        var c = $("#msg_dis_container");
        timeOut = timeOut || 1000;
        if (c.length == 0) {
            $(document.body).append('<div class="motify" style="display:none" id="msg_dis_container"><div class="motify-inner" id="msg_dis_content"></div></div>');
            c = $("#msg_dis_container");
        }
        $("#msg_dis_content").html(msg);
        c.css("display", "block");
        clearTimeout(show_msg.timer);
        show_msg.timer = setTimeout(function() {
            c.css("display", "none");
        }, timeOut);
    }

    var isLogin = localStorage.getItem("isLogin")
    function isLoginCheck() {
        if (!isLogin) {
            $("#loginBtn").trigger('click')
            $("#myModal").off("click")
          
        }
    }
    isLoginCheck()

    $(".logout-button,.fa-power-off").on("click", function() {
        localStorage.removeItem("isLogin");
        window.location.href = "login.html";
    })

    $(".go-login").on("click",function(){
          window.location.href = "login.html";
    })



})
