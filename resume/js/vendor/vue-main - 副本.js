'use strict';


  const demoGrid = Vue.extend({
        template: '#grid-template',
          props: {
            data: Array,
            columns: Array,
            filterKey: String
          },
          data: function () {
            var sortOrders = {}
            this.columns.forEach(function (key) {
              sortOrders[key] = 1
            })
            return {
              sortKey: '',
              sortOrders: sortOrders
            }
          },
          methods: {
            sortBy: function (key) {
              this.sortKey = key
              this.sortOrders[key] = this.sortOrders[key] * -1
            }
          }
  })


    const Production = Vue.component('Production', {
        template: '#production',
        components: {      
        'demo-grid' : demoGrid
         },
        data: function() {
            return {
                'searchQuery': '',
                'gridColumns': ['name', 'power'],
                'gridData': [
                  { name: 'Chuck Norris', power: Infinity },
                  { name: 'Bruce Lee', power: 9000 },
                  { name: 'Jackie Chan', power: 7000 },
                  { name: 'Jet Li', power: 8000 }
                ],
                'production': [{
                        'href': 'http://dataviewer.ilongyuan.com.cn/app/gameBasic/gameBasicView.do?appId=289ee05803487e57&platform=1',
                        'author': 'Jackieli',
                        'productionNmae': "龙渊网络科技数据平台统计",
                        'day': 1,
                        'eye': 27,
                        'comment': 160,
                        'heart': 325,
                        'tags': ['大数据', 'echarts3.0']
                    }, {
                        'href': 'http://www.lilidong.cn/demo/vue/vue-to-do-list2-vue2.0-app-del.html',
                        'author': 'Jackieli',
                        'productionNmae': "vuejs+localStorage实现工作计划to-do-list",
                        'day': 10,
                        'eye': 250,
                        'comment': 564,
                        'heart': 546,
                        'tags': ['vue.js', 'localStorage']
                    }, {
                        'href': 'http://m.bilinyou.com/',
                        'author': 'Jackieli',
                        'productionNmae': "比邻优O2O商城移动端（app）",
                        'day': 33,
                        'eye': 250,
                        'comment': 435,
                        'heart': 20,
                        'tags': ['fis3s', 'jello', 'mvc前后端分离']
                    }, {
                        'href': 'http://m.bilinyou.com/',
                        'author': 'Jackieli',
                        'productionNmae': "富盈数据报表（app）",
                        'day': 67,
                        'eye': 250,
                        'comment': 67,
                        'heart': 32,
                        'tags': ['fis3s', 'jello', 'echarts3.0']
                    }, {
                        'href': 'http://daqsoft.com/',
                        'author': 'Jackieli',
                        'productionNmae': "大旗软件官网",
                        'day': 323,
                        'eye': 205,
                        'comment': 66,
                        'heart': 60,
                        'tags': ['html5', 'css3', '官网']
                    }, {
                        'href': 'http://www.selake.com',
                        'author': 'Jackieli',
                        'productionNmae': "石象湖官方网站",
                        'day': 67,
                        'eye': 250,
                        'comment': 10,
                        'heart': 20,
                        'tags': ['景区']
                    }, {
                        'href': 'http://www.tpanzhihua.com/',
                        'author': 'Jackieli',
                        'productionNmae': "攀枝花旅游信息网",
                        'day': 134,
                        'eye': 270,
                        'comment': 105,
                        'heart': 230,
                        'tags': ['攀枝花', '信息网']
                    }, {
                        'href': 'http://www.djy517.com/index.do',
                        'author': 'Jackieli',
                        'productionNmae': "都江堰旅游门户网-都江堰旅游官方平台",
                        'day': 150,
                        'eye': 544,
                        'comment': 10,
                        'heart': 70,
                        'tags': ['都江堰', '旅游', '官方平台']
                    }, {
                        'href': 'http://www.hysjq.com/index.do',
                        'author': 'Jackieli',
                        'productionNmae': "华蓥山旅游网",
                        'day': 140,
                        'eye': 250,
                        'comment': 145,
                        'heart': 546,
                        'tags': ['旅游网']
                    }, {
                        'href': 'http://txianning.com/index.do',
                        'author': 'Jackieli',
                        'productionNmae': "咸宁旅游资讯网:香城泉都-浪漫咸宁",
                        'day': 180,
                        'eye': 250,
                        'comment': 567,
                        'heart': 54,
                        'tags': ['资讯网']
                    }

                ]
            }
        }
    });

 

    const Skill = Vue.component('Skill', {
        template: '#skill'
    });
    const Work = Vue.component('Work', {
        template: '#work'
    });
    const Education = Vue.component('Education', {
        template: '#education'
    });
    const Register = Vue.component('Register', {
        template: '#register'
    });

    const Login = Vue.component('Login', {
        template: '#login',
        data: function() {
            return {
                items: [
                    'Vue.js: The Basics',
                    'Vue.js Components',
                    'Server Side Rendering with Vue',
                    'Vue + Firebase'
                ]
            }
        }
    });


    const routes = [{
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
    }
    // {
    //     path: '*',
    //     redirect: '/production'
    // }
    ]

    const router = new VueRouter({
        // mode: 'history',
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

    const app = new Vue({
        router
    }).$mount('#app')



