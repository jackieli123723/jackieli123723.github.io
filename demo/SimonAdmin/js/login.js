 $(function(){
   var oWindowWidth= $(window).width();
   var oWindowHeight= $(window).height();     
  $(".login_img_bg").width(oWindowWidth);
  $(".login_img_bg").height(oWindowHeight);
  $(window).resize(function(){
   autoMiddle();
  })
  function autoMiddle(){
       oWindowWidth= $(window).width();
       oWindowHeight= $(window).height();     
      $(".login_img_bg").width(oWindowWidth);
      $(".login_img_bg").height(oWindowHeight);
  }

  var drawBG = function() {
    particlesJS("particles", {
        "particles": {
            "number": {
                "value": 150,
                "density": {
                    "enable": true,
                    "value_area": 1800
                }
            },
            "color": {
                "value": "#ffffff"
            },
            "shape": {
                "type": "none",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 4
                }
            },
            "opacity": {
                "value": 0.05,
                "random": false,
                "anim": {
                    "enable": true,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 20,
                    "size_min": 0.2,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 250,
                "color": "#ffffff",
                "opacity": 0.2,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 0.5,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "window",
            "events": {
                "onhover": {
                    "enable": false,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": false,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 180,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 0.3,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });

}
window.onload = window.onresize = function() {
    drawBG();

}

  show_msg.timer = null;
  function show_msg(msg, timeOut) {
    var c = $("#msg_dis_container");
    timeOut = timeOut || 1000;
    if(c.length==0){
      $(document.body).append('<div class="motify" style="display:none" id="msg_dis_container"><div class="motify-inner" id="msg_dis_content"></div></div>');
      c = $("#msg_dis_container");
    }
    $("#msg_dis_content").html(msg);
    c.css("display","block");
    clearTimeout(show_msg.timer);
    show_msg.timer = setTimeout(function(){
      c.css("display","none");
    },timeOut);
  }

    var code;
    function createCode(){
        //首先默认code为空字符串
        code = '';
        //设置长度，这里看需求，我这里设置了4
        var codeLength = 4;
        var codeV = $(".login_vcode");
        //设置随机字符
        var random = new Array(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R', 'S','T','U','V','W','X','Y','Z');
        //循环codeLength 我设置的4就是循环4次
        for(var i = 0; i < codeLength; i++){
            //设置随机数范围,这设置为0 ~ 36
             var index = Math.floor(Math.random()*36);
             //字符串拼接 将每次随机的字符 进行拼接
             code += random[index]; 
        }
        //将拼接好的字符串赋值给展示的Value
        codeV.text(code)
    }

    createCode();

   $(".login_vcode").click(function(){
      createCode();
  })


          
   var userName = localStorage.setItem("userName","17b55a4a81c3686b9f4a8074a6ad94d4");  
   var passWord = localStorage.setItem("passWord","94de41a813c1398fefa45b2effd0eb05");  
   var rember = localStorage.getItem("rember")

    if(rember){
       $(".login_check").addClass("active"); 
    }

  $(".login_check").click(function(){
    $this=$(this);
    if($this.hasClass("active")){
      $this.removeClass("active");
      localStorage.removeItem("rember");  
    }else{
      $this.addClass("active")
      localStorage.setItem("rember",true);  
    }
  })



  function getUserName(){
    var GwwRli1= ['\x6c','\x69','\x6c','\x69','\x64','\x6f','\x6e','\x67'];return GwwRli1["\x6a\x6f\x69\x6e"]("");
  }
 
   function getPassWord(){
    var UuVdCDF1= ['\x6c','\x69','\x6c','\x69','\x64','\x6f','\x6e','\x67','\x2e','\x63','\x6e'];return UuVdCDF1["\x6a\x6f\x69\x6e"]("");
  }

   function isRember() {
        if (!rember) {
            $("#user").val('');
            $("#pwd").val('');
        }else{
            $("#user").val(localStorage.getItem("userName") ? getUserName() : "");
            $("#pwd").val(localStorage.getItem("passWord") ? getPassWord() :"");
        }
    }

    isRember();

   var bLogining = false;
  $("#btn-submit").on("click", function(){

    if($("#user").val().length<1){
      show_msg("用户名不能为空");
      return ;
    }
    if($("#pwd").val().length<1){
      show_msg("密码不能为空");
      return ;
    }
      if($("#code").val().length<1){
      show_msg("验证码不能为空");
      return ;
    }


    if(hex_md5($("#user").val()) !== localStorage.getItem("userName")){
      show_msg("用户名错误");
      return ;
    }
     if(hex_md5($("#pwd").val()) !== localStorage.getItem("passWord")){
      show_msg("密码错误");
      return ;
    }
     if($("#code").val().toLowerCase() !== $(".login_vcode").text().toLowerCase()){
      show_msg("验证码错误");
       createCode();
      return ;
    }
    
    if (bLogining) {
      show_msg("正在登录，请稍等……");
      return;
    }

    bLogining = true;
    localStorage.setItem("isLogin",true); 
    window.location.href="index.html"

  });

   $("body").keydown(function(e) {
         if (e.keyCode == "13") {
             $('#btn-submit').click();
         }
     });

  (function(){
   var oWindowWidth= $(window).width();
   var oWindowHeight= $(window).height();     
  $(".login_img_bg").width(oWindowWidth);
  $(".login_img_bg").height(oWindowHeight);
  $(window).resize(function(){
   autoMiddle();
  })
  function autoMiddle(){
       oWindowWidth= $(window).width();
       oWindowHeight= $(window).height();     
      $(".login_img_bg").width(oWindowWidth);
      $(".login_img_bg").height(oWindowHeight);
  }
})()

})




