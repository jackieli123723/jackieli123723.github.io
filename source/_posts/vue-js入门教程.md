---
title: vue.js入门教程
date: 2016-09-13 13:49:29
tags:
- vue.js
- web前端
---

{% blockquote %}
Vue.js 不是一个框架，它只是一个提供 MVVM 风格的双向数据绑定的库，专注于 UI 层面。Vue.js 提供的核心是 MVVM 中的 VM，也就是 ViewModel。ViewModel 负责连接 View 和 Model，保证视图和数据的一致性。如果你用过 AngularJS，你会发现 Vue.js 同时还借鉴了 Angular 的 directive 和 filter 的概念，但是 API 要简单易懂得多，整体也轻巧得多。在组件化这一点上，Vue.js 和 facebook 的 React.js 更为接近，可以定义可复用和嵌套的组件类，并且可以在模板中声明式地使用组件。
{% endblockquote %}
<!--more-->
{% codeblock %}
var vm = new Vue({
    // 选项...
})
{% endcodeblock %}

那么 ViewModel 是如何连接 View 和 Model 的呢？假设我们有这样的 HTML：

{% codeblock  %}
<div id="demo">
     <p>{{message}}</p>
    <input v-model="message">
</div>
{% endcodeblock %}

然后有这样的数据：
{% codeblock %}
var data = {
    message: 'Hello Vue.js!'
}
{% endcodeblock %}

我们要做的就是这样：
{% codeblock %}
var demo = new Vue({
    el: '#demo',
    data: data
})
{% endcodeblock %}



效果：http://jsfiddle.net/yyx990803/vjvMp/




看上去就像是渲染了个模板而已，但其实 Vue.js 已经建立了 DOM 和数据之间的连接，此时任何对 data.message 的改动，都会触发 DOM 的更新。而更神奇的是 v-model 这条 directive 是双向的数据绑定，当用户在输入栏里打字的时候，数据会被同步回 data.message 当中去。

另外方便的是，返回的 demo 这个 ViewModel 对象会自动代理 data 上的属性，所以你可以直接运行 demo.message = 'what!'，能够得到和直接操作数据一样的结果。这个特点在之后会常常用到。


除了直接绑定一个数据值之外，你还可以在绑定中使用表达式：

{% codeblock %}
<div id="demo">
    <p>{{message}}</p>
    <input v-model="message">
</div>
{% endcodeblock %}

效果：http://jsfiddle.net/yyx990803/vjvMp/1/ 你在输入框中输入的文字会被实时倒转。

怎么样，是不是很简单。如果你等不及下面的中文版教程，又对自己的英文比较有信心的话，赶紧去官网 vuejs.org 去看更多的教程和示例吧。