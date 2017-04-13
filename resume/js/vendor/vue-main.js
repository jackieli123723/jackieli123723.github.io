

var Production = Vue.component('Production', {
    template: '#production',
    computed: {
        filteredUsers: function() {
            var self = this
            return self.productions.filter(function(production) {
                return production.productionNmae.indexOf(self.searchQuery) !== -1
            })
        }
    },
    methods: {
        sortBy: function(sortparam) {
            this.sortparam = sortparam;
        }
    },
    data: function() {
        return {
            searchQuery: '',
            sortparam: '',
            productions: [{
                "href": "http://dataviewer.ilongyuan.com.cn/app/gameBasic/gameBasicView.do?appId=289ee05803487e57&platform=1",
                "author": "Jackieli",
                "productionNmae": "龙渊网络科技数据平台统计",
                "day": 1,
                "eye": 27,
                "comment": 160,
                "heart": 325,
                "tags": [
                    "大数据",
                    "echarts3.0"
                ]
            }, {
                "href": "http://www.lilidong.cn/demo/vue/vue-to-do-list2-vue2.0-app-del.html",
                "author": "Jackieli",
                "productionNmae": "vuejs+localStorage实现工作计划to-do-list",
                "day": 10,
                "eye": 250,
                "comment": 564,
                "heart": 546,
                "tags": [
                    "vue.js",
                    "localStorage"
                ]
            }, {
                "href": "http://m.yuzhelin.com/",
                "author": "Jackieli",
                "productionNmae": "比邻优O2O商城移动端（app）",
                "day": 33,
                "eye": 250,
                "comment": 435,
                "heart": 20,
                "tags": [
                    "fis3s",
                    "jello",
                    "mvc前后端分离"
                ]
            }, {
                "href": "http://m.bilinyou.com/",
                "author": "Jackieli",
                "productionNmae": "富盈数据报表（app）",
                "day": 67,
                "eye": 250,
                "comment": 67,
                "heart": 32,
                "tags": [
                    "fis3s",
                    "jello",
                    "echarts3.0"
                ]
            }, {
                "href": "http://daqsoft.com/",
                "author": "Jackieli",
                "productionNmae": "大旗软件官网",
                "day": 323,
                "eye": 205,
                "comment": 66,
                "heart": 60,
                "tags": [
                    "html5",
                    "css3",
                    "官网"
                ]
            }, {
                "href": "http://www.selake.com",
                "author": "Jackieli",
                "productionNmae": "石象湖官方网站",
                "day": 67,
                "eye": 250,
                "comment": 10,
                "heart": 20,
                "tags": [
                    "景区"
                ]
            }, {
                "href": "http://www.tpanzhihua.com/",
                "author": "Jackieli",
                "productionNmae": "攀枝花旅游信息网",
                "day": 134,
                "eye": 270,
                "comment": 105,
                "heart": 230,
                "tags": [
                    "攀枝花",
                    "信息网"
                ]
            }, {
                "href": "http://www.djy517.com/index.do",
                "author": "Jackieli",
                "productionNmae": "都江堰旅游门户网-都江堰旅游官方平台",
                "day": 150,
                "eye": 544,
                "comment": 10,
                "heart": 70,
                "tags": [
                    "都江堰",
                    "旅游",
                    "官方平台"
                ]
            }, {
                "href": "http://www.hysjq.com/index.do",
                "author": "Jackieli",
                "productionNmae": "华蓥山旅游网",
                "day": 140,
                "eye": 250,
                "comment": 145,
                "heart": 546,
                "tags": [
                    "旅游网"
                ]
            }, {
                "href": "http://txianning.com/index.do",
                "author": "Jackieli",
                "productionNmae": "咸宁旅游资讯网:香城泉都-浪漫咸宁",
                "day": 180,
                "eye": 250,
                "comment": 567,
                "heart": 54,
                "tags": [
                    "资讯网"
                ]
            }]

        }
    }
});



var Skill = Vue.component('Skill', {
    template: '#skill'
});
var Work = Vue.component('Work', {
    template: '#work',
    data: function() {
        return {
            searchQuery: '',
            datesArticles: {
            '2016年': [
                {  
                    title: '龙渊数据统计平台',
                    slug: '游戏数据统计',
                    teaser: '数据可视化',
                    published_at: '2016.07'
                },
                  {  
                    title: '龙渊SDK移动端',
                    slug: 'webapp',
                    teaser: '移动端适配',
                    published_at: '2016.08'
                },
                  {  
                    title: '龙渊游戏开放平台',
                    slug: '游戏接入',
                    teaser: '文档说明中心',
                    published_at: '2016.10'
                }

            ],
            '2015年': [
                 {  
                    title: '比邻优商城',
                    slug: 'webapp',
                    teaser: 'O2O',
                    published_at: '2015.08'
                },
                  {  
                    title: '比邻优社区',
                    slug: '社区服务',
                    teaser: '二手，借书等等',
                    published_at: '2015.10'
                },
                  {  
                    title: '数据报表app',
                    slug: '线下门店数据整合',
                    teaser: '数据报表',
                    published_at: '2015.12'
                }
            ],
            '2014年': [
                {
                    title: '都江堰景区官网',
                    slug: '720全景',
                    teaser: '监控平台',
                    published_at: '2015.02'
                },
                {
                    title: '集客宝全球旅游分销系统，智慧旅游平台 ',
                    slug: '分销系统',
                    teaser: '后台',
                    published_at: '2015.03'
                },
                {
                    title: '成都保利(成都)石象湖旅游景区 ',
                    slug: 'app,地图，触摸屏，720全景，订票网站，旅游大数据,视频监控',
                    teaser: '旅游',
                    published_at: '2015.04'
                },
                {
                    title: '咸宁旅游资讯网 ',
                    slug: '旅游信息平台',
                    teaser: '大数据',
                    published_at: '2015.05'
                },
                {
                    title: '攀枝花旅游资讯网,app ',
                    slug: '资讯网',
                    teaser: '资讯网',
                    published_at: '2015.06'
                },
                {
                    title: '绵竹旅游资讯网pc和移动端，电商平台，订票，app，wap版本',
                    slug: '三端一整套',
                    teaser: '线上线下',
                    published_at: '2015.07'
                }
            ],
            '2013年': [
                {
                    title: '博智信息实习',
                    slug: '前端',
                    teaser: '实习',
                    published_at: '2013.09'
                }
            ]
        }

        }
    },
    computed: {
        searchedArticles() {
            var searchRegex = new RegExp(this.searchQuery, 'i');
            var searchedObj = {};

            if (this.searchQuery == '') {
                return this.datesArticles;
            }

            for (var date in this.datesArticles) {
                searchedObj[date] = this.datesArticles[date].filter((article) => {
                    return searchRegex.test(article.title) ||
                        searchRegex.test(article.teaser) ||
                        searchRegex.test(article.published_at) ||
                        searchRegex.test(date);
                });
            }
            return searchedObj;
        }
    },
    methods: {
        anyArticle() {
            return this.countAllArticles() ? true : false;
        },
        countAllArticles() {
            var count = 0;
            for (var date in this.searchedArticles) {
                count += this.searchedArticles[date].length;
            }
            return count;
        }
    }

});
var Education = Vue.component('Education', {
    template: '#education'
});
var Register = Vue.component('Register', {
    template: '#register'
});

var Login = Vue.component('Login', {
    template: '#login'
});


var routes = [{
        path: '/production',
        component: Production
    }, {
        path: '/skill',
        component: Skill
    }, {
        path: '/work',
        component: Work
    }, {
        path: '/education',
        component: Education
    }, {
        path: '/register',
        component: Register
    }, {
        path: '/login',
        component: Login
    },
    {
        path: '*',
        redirect: '/production'
    }
]

var router = new VueRouter({
     mode: 'history',
    routes // （缩写）相当于 routes: routes
})

//     export default{
//     mode: 'history',
//     routes: [
//         {path: '/home', component: Home},
//         {path: '/about', component: About},
//         {path: '/news', component: News},
//         {path: '*', redirect: '/home'},
//     ]
// }


//等效下面
var app = new Vue({
    router
}).$mount('#app')

// var app = new Vue({
//     router,
//     el: "#app"
// })
