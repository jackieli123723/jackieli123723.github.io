---
title: 自定义函数实现alert,console等底层函数在，主要运用js的指针改变来实现
date: 2016-10-09 17:49:29
tags:
- javascript
- call&&apply
---

{% blockquote %}
javascript底层的alert和console等函数的自定义封装，可以实现自定义功能的调用，组件风格更好的代码维护，有两种方式一种是定义一个对象外挂方法，还有一种就是this指针指向改变调用函数
{% endblockquote %}
<!--more-->

```html
<button id="alert-old">alert原生</button>
<button id="alert-new">alert代理方式</button>
```

```js
window.onload = function() {

        var oAlert = document.getElementById("alert-old"),
            nAlert = document.getElementById("alert-new");

        oAlert.onclick = function() {
            alert('alert原生')
            console.log('alert原生')
        }

        function logApply() {
            console.log.apply(console, arguments);
        };

        function logCall(content) { //此处必须传参数否则打印的是个数组，call和apply的区别
            console.log.call(console, content);//同上其中 call() 是改变 this 的指向问题，这里是让 this 指向 console
        };

        var util = {}; //定义对象实现方法调用
        util.alert = function(content) {
            window.alert(content);
        };
        util.log = function(content) {
            console.log(content);
        };

        nAlert.onclick = function() {
            util.alert('alert代理方式')
            util.log("alert代理方式")
            logCall("alert代理方式")
            logApply("alert代理方式")
        }
    }
```
ps:这个是自己在学习vue的过程中模块化思想中的提炼