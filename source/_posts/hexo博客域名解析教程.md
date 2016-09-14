---
title: hexo博客域名解析教程
date: 2016-09-13 23:30:31
tags:
- hexo
- dns
- www
---

{% blockquote %}
hexo博客域名解析教程，域名网址解析,将GitHub关联到域名上 例如：xxxx..github.io解析到www.yourwebsite.com
{% endblockquote %}


创建CNAME。
（1）登陆访问github。
（2）进入github中需要关联域名的相应项目。
（3）在该项目下创建CNAME，<!--more-->
![](http://odg9m8tq2.bkt.clouddn.com/1.png)
（4）其CNAME内容即是域名。
![](http://odg9m8tq2.bkt.clouddn.com/1222.png)
（5）ping xxxx..github.io
![](http://odg9m8tq2.bkt.clouddn.com/QQ%E6%88%AA%E5%9B%BE20160914000614.png)
（6）dns解析
![](http://odg9m8tq2.bkt.clouddn.com/dns.png)
（7）访问xxx.github.com ---ok
