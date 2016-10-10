layout: post
title: vuejs+localStorage实现工作计划to-do-list
date: 2016-09-20 16:39:06
tags:
- vue.js
- localStorage
---

{% blockquote %}
Vue.js 的数据双向绑定和html5 localStorage 的数据存储功能实现一个自己的工作列表
{% endblockquote %}
[vuejs+localStorage demo地址原始方式未组件化](http://lilidong.cn/demo/vue/)
[vuejs+localStorage demo地址webpack打包组件化](http://lilidong.cn/demo/vue-app/)
[vuejs+localStorage demo地址webpack打包组件化加删除功能](http://lilidong.cn/demo/vue-app-del/) 
功能需求分析
（1）input输入可以生成对应的列表内容（初始化为未完成）
（2）点击每个列表内容切换该工作计划的状态为完成还是未完成
（3）localStorage来存储我们输入的工作计划内容同步<!--more-->


效果
![](http://odg9m8tq2.bkt.clouddn.com/QQ%E6%88%AA%E5%9B%BE20160920165725.png)


废话不多说上代码


{% blockquote %}
css部分这个不用多说就没贴代码，看代码就看js部分和html结构部分，但是css中有个牛逼的属性见下css-code
{% endblockquote %}
v-cloak 作用在{{变量}}渲染的时候不出现，解析后再出现结果

```css
    [v-cloak]{
        display: none;
    }
```

html结构部分

```html
<div id="demo" class="reminder-container" v-cloak>
    <h1 v-text="title"></h1>
    <br/>
    <input type="text" v-model="newItem"  v-on:keyup.enter="newAdd" placeholder="enter输入" />
    <ul class="reminders">
      <li v-for="item in items" v-bind:class="{isFinshed:item.isFinshed}" v-on:click="toggleFinshed(item)">
        {{ item.label }} <span class="fr">{{item.isFinshed ? "完成" : "未完成" }}</span>
      </li>
    </ul>

</div>
```

```js
    var KEY = "workPlan";
    var Store = {
        fetch: function() {
                return JSON.parse(localStorage.getItem(KEY) || '[]');//返回一个js对象
            },
        //将传入的data对象存下
        save: function(data) {
            localStorage.setItem(KEY, JSON.stringify(data));
        }
    };

    var vm=new Vue({
     el:'#demo',
     data: {
        title:"添加自己的工作计划(vue.js)",
        newItem:'',
        items:[
            { label: 'web前端', isFinshed: true },
            { label: 'Bar', isFinshed: false },
            { label: 'Foo', isFinshed: false },
            { label: 'Bar', isFinshed: true }
          ],
        items: [],
        items: Store.fetch()        
     },

     watch: {
        items: {
            handler: function (items) {
            Store.save(items);
            },
            deep: true
        }   
     },

      methods: {
        toggleFinshed: function (item) {
         item.isFinshed = !item.isFinshed
        },
        newAdd: function () {
         //console.log(this.newItem);
         this.items.push({
            label:this.newItem,
            isFinshed:false
         })
         this.newItem = '';

        }
      }

    })
```

ps:注意点有以下几个部分
初始数据items: Store.fetch() 从localStorage 中读取若有v-for 循环 没有则为空数组
1.自己实现一个Store函数来操作输入数据
2.watch 监听数据改变 deep: true必须为这个 如果你有兴趣可以改为false试试 看看什么效果
3.toggleFinshed 函数切换状态 newAdd 增加新列 必须重新清空一次


写的可能很粗糙，文笔不好将就看吧
