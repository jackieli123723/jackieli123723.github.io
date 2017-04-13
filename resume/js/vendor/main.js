$(function() {
  var style=[
        `
        background-image:-webkit-gradient( 
        linear, left top, right top,
        color-stop(0, #f22), color-stop(0.15, #f2f), 
        color-stop(0.3, #22f), color-stop(0.45, #2ff), 
        color-stop(0.6, #2f2),color-stop(0.75, #2f2), 
        color-stop(0.9, #ff2), color-stop(1, #f22) );
        color:transparent;
        -webkit-background-clip: text;
        font-size:2em
        `
    ].join(';')
    console.log('%c欢迎大家关注我的个人网站：lilidong.cn', style);
    window.onscroll = function() {
        var scrollTop = document.body.scrollTop;
        var he = 100;
        if (scrollTop >= 100) {
            $(".toTop").show();
        } else {
            $(".toTop").hide();
        }

        if (scrollTop >= 100) {
            $('.navbar-default').addClass('is-hide');
        } else {
            $('.navbar-default').removeClass('is-hide');
        }

    }
    $(".toTop").click(function() {
        $('body,html').animate({ scrollTop: 0 }, 500);
        return false;
    })

    $(".nav li").click(function() {
        var $this = $(this);
        $this.addClass("active").siblings().removeClass("active");
    })

    function htmlLoadOver() {
        $(".loading-overlay").addClass("loaded");
    }

    function complete() {
        if (document.readyState == "complete") {
            htmlLoadOver();
        } else {
            document.onreadystatechange = function() {
                if (document.readyState == "complete") {
                    htmlLoadOver();
                }
            }
        }
    }
    complete();

 $('body').niceScroll({
        cursorcolor: "#ccc",//#CC0071 光标颜色
        cursoropacitymax: 0.5, //改变不透明度非常光标处于活动状态（scrollabar“可见”状态），范围从1到0
        touchbehavior: false, //使光标拖动滚动像在台式电脑触摸设备
        cursorwidth: "5px", //像素光标的宽度
        cursorborder: "0", //   游标边框css定义
        cursorborderradius: "5px",//以像素为光标边界半径
        autohidemode: false //是否隐藏滚动条
    });


    var form = $("#form");
    $("#subbtn").click(function(){
        var nick = form.find("input[name=nick]").val();
        if(!nick){
            showerr("请填写昵称");
            return;
        }
        if(nick.length<2 || nick.length>12){
            showerr("昵称2到12个字符");
            return;
        }
        var phone = form.find("input[name=phone]").val();
        if(!phone){
            showerr("请填写手机号");
            return;
        }
        if(!phoneCheck(phone)){
            showerr("手机格式不正确");
            return;
        }
        var password = form.find("input[name=password]").val();
        if(!password){
            showerr("请填写密码");
            return;
        }
        if(password.length<6 || password.length>12){
            showerr("密码6到12位");
            return;
        }
        var repassword = form.find("input[name=repassword]").val();
        if(!repassword){
            showerr("请填确认密码");
            return;
        }
        if(password!=repassword){
            showerr("密码与确认密码不一致");
            return;
        }
        var data = {
            nick:nick,
            email:email,
            password:password
        }
        hiderr();
    
    });
    
    var emailCheck =function(email) {  
        var pattern = /^([\.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;  
        if (!pattern.test(email)) 
            return false;  
        return true;  
    }

    var phoneCheck = function(s) {
              var patrn = /^(((10[0-9]{1})|(13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
              if (!patrn.exec(s)) return false;
              return true;
          }
 
    var showerr=function(ifo){
        $(".error").show();
        $(".errorinfo").html(ifo);
    }
    var hiderr =function(){
        $(".error").hide();
    }



    



})


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
