(function ($) {
    var tdcService = angular.module('tdcs', ['tdcConfig']),
        urlBase;

    tdcService.factory('loginService', function ($http, $rootScope, $q, tdcConfig) {
        urlBase = tdcConfig.urlBase;
        urlBase = urlBase +'/index';
//        urlBase = 'https://www.talkingdata.com/index';
//        urlBase = 'http://localhost:9006/index';
//        urlBase = 'http://10.10.67.40:9006/index';
        var deferred = $q.defer();

        $rootScope.domain = "http://www.talkingdata.com";

        $rootScope.accountBase = "https://account.talkingdata.com";

        $rootScope.uuid = 'b69d9581-7604-4f00-a1e7-eead5e29a4c5';
        if(window.location.href.indexOf('debug') !== -1){
            $rootScope.resourceHost = 'http://debug.talkingdata.com/mi/observatory/';
        }else if(window.location.href.indexOf('www') !== -1){
            $rootScope.resourceHost = 'http://mi.talkingdata.com/';
        }
        $rootScope.setApptypes = function () {
        	$rootScope.apptypes=[{ id: 102, text: $rootScope.resource.OnlineShopping }, { id: 86, text: $rootScope.resource.Finance }, { id: 90, text: $rootScope.resource.EducationReading },{ id: 91, text: $rootScope.resource.HealthFitness }, { id: 89, text: $rootScope.resource.Lifestyle }, { id: 95, text: $rootScope.resource.VideoPlayer },{ id: 103, text: $rootScope.resource.News }, { id: 83, text: $rootScope.resource.Navigation },{ id: 87, text: $rootScope.resource.Photography }, { id: 97, text: $rootScope.resource.SocialNetworking },{ id: 100, text: $rootScope.resource.Utilities }, { id: 98, text: $rootScope.resource.Security }];
        }

        $rootScope.setAppTypesmap = function () {
        	$rootScope.apptypesmap =  {'5':$rootScope.resource.Wedding,'16':$rootScope.resource.Trip,'17':$rootScope.resource.FinanceO2O,'18':$rootScope.resource.Retail,'19':$rootScope.resource.Luxury,'1':$rootScope.resource.O2O,'3':$rootScope.resource.Food,'4':$rootScope.resource.HouseProperty,'6':$rootScope.resource.HouseFurnishing,'7':$rootScope.resource.HomeService,'8':$rootScope.resource.Edu,'9':$rootScope.resource.Trval,'10':$rootScope.resource.BeautyService,'11':$rootScope.resource.MomBaby, '12': $rootScope.resource.Tickets, '13': $rootScope.resource.Auto, '14': $rootScope.resource.CommunityService , '15': $rootScope.resource.HealthCare,
        			'-1':$rootScope.resource.AllGenres, '-1':$rootScope.resource.Ranking,81:$rootScope.resource.App,104:$rootScope.resource.Game,118:$rootScope.resource.EBook, 102: $rootScope.resource.OnlineShopping , 86: $rootScope.resource.Finance , 90: $rootScope.resource.EducationReading ,91: $rootScope.resource.HealthFitness , 89: $rootScope.resource.Lifestyle , 95: $rootScope.resource.VideoPlayer ,103: $rootScope.resource.News , 83: $rootScope.resource.Navigation , 87: $rootScope.resource.Photography ,97: $rootScope.resource.SocialNetworking ,100: $rootScope.resource.Utilities, 98: $rootScope.resource.Security, 105: $rootScope.resource.Shooting , 106: $rootScope.resource.Action ,107: $rootScope.resource.Adventure , 109: $rootScope.resource.Casual , 110: $rootScope.resource.Puzzle , 108: $rootScope.resource.Simulation , 111 : $rootScope.resource.Strategy , 113 : $rootScope.resource.RPG , 114 : $rootScope.resource.BoardCard , 115 : $rootScope.resource.Onlinegames , 116 : $rootScope.resource.Sports ,117 : $rootScope.resource.Education,
        			'27':$rootScope.resource.AutomobileServices,
        			'28': $rootScope.resource.DrivingLicenseNumberPlate,'29': $rootScope.resource.AutomobileInformation,'30': $rootScope.resource.AutomobileTrading,'31':$rootScope.resource.AutomobileMaintenance ,
        			'32': $rootScope.resource.TrafficViolationAutomobileInsurance,'33': $rootScope.resource.Fuelmanagement,'34': $rootScope.resource.DrivingTools,
        			'20': $rootScope.resource.Finance,'21': $rootScope.resource.Bank,'22': $rootScope.resource.Securities,'23': $rootScope.resource.Insurance,
        			'24': $rootScope.resource.FinancialProducts,'25': $rootScope.resource.Payment,'26': $rootScope.resource.LifeApplication};
        }

        $rootScope.setGametypes = function () {
        	$rootScope.gametypes = [{ id: 105, text: $rootScope.resource.Shooting }, { id: 106, text: $rootScope.resource.Action }, { id: 107, text: $rootScope.resource.Adventure },{ id: 109, text: $rootScope.resource.Casual }, { id: 110, text: $rootScope.resource.Puzzle }, { id: 108, text: $rootScope.resource.Simulation },{ id: 111, text: $rootScope.resource.Strategy }, { id: 113, text: $rootScope.resource.RPG },{ id: 114, text: $rootScope.resource.BoardCard }, { id: 115, text: $rootScope.resource.Onlinegames },{ id: 116, text: $rootScope.resource.Sports }, { id: 117, text: $rootScope.resource.Education }];
        }

        $rootScope.setAutotypes = function () {
        	$rootScope.autotypes = [{ id: 28, text: $rootScope.resource.DrivingLicenseNumberPlate }, { id: 29, text: $rootScope.resource.AutomobileInformation },
        	                        { id: 30, text: $rootScope.resource.AutomobileTrading },{ id: 31, text: $rootScope.resource.AutomobileMaintenance },
        	                        { id: 32, text: $rootScope.resource.TrafficViolationAutomobileInsurance }, { id: 33, text: $rootScope.resource.Fuelmanagement },
        	                        { id: 34, text: $rootScope.resource.DrivingTools }];
        }

        $rootScope.setFinancetypes = function () {
        	$rootScope.financetypes = [{ id: 21, text: $rootScope.resource.Bank }, { id: 22, text: $rootScope.resource.Securities },{ id: 23, text: $rootScope.resource.Insurance },
        	                           { id: 24, text: $rootScope.resource.FinancialProducts }, { id: 25, text: $rootScope.resource.Payment },{ id: 26, text: $rootScope.resource.LifeApplication }];
        }

        $rootScope.setO2Otypes = function () {
        	$rootScope.o2otypes = [{ id: 3, text: $rootScope.resource.Food }, { id: 4, text: $rootScope.resource.HouseProperty }, { id: 5, text: $rootScope.resource.Wedding }, { id: 6, text: $rootScope.resource.HouseFurnishing },
        	                        { id: 8, text: $rootScope.resource.Edu }, { id: 9, text: $rootScope.resource.Trval },{ id: 10, text: $rootScope.resource.BeautyService }, { id: 11, text: $rootScope.resource.MomBaby },{ id: 12, text: $rootScope.resource.Tickets }, { id: 13, text: $rootScope.resource.Auto },
        	                        { id: 14, text: $rootScope.resource.CommunityService },
        	                        { id: 15, text: $rootScope.resource.HealthCare },
        	                        { id: 16, text: $rootScope.resource.Trip }, { id: 17, text: $rootScope.resource.FinanceO2O }, { id: 18, text: $rootScope.resource.Retail }, { id: 19, text: $rootScope.resource.Luxury }];
        }

        $rootScope.setUsertypes = function () {
        	$rootScope.usertypes = [{ id: 104, text: $rootScope.resource.Gamer }, { id: 87, text: $rootScope.resource.Snapper }, { id: 118, text: $rootScope.resource.NovelAddict },{ id: 86, text: $rootScope.resource.MoneyManager }, { id: 102, text: $rootScope.resource.FrequentShopper }, { id: 90, text: $rootScope.resource.Studious },{ id: 95, text: $rootScope.resource.TVSeriersAddict }, { id: 92, text: $rootScope.resource.SportsLover }];
        }

        $rootScope.setUsertypemap = function () {
        	$rootScope.usertypemap =  { 104: $rootScope.resource.Gamer ,  87: $rootScope.resource.Snapper ,  118: $rootScope.resource.NovelAddict , 86: $rootScope.resource.MoneyManager ,  102: $rootScope.resource.FrequentShopper , 90: $rootScope.resource.Studious ,95: $rootScope.resource.TVSeriersAddict, 92: $rootScope.resource.SportsLover };
        }

        $rootScope.setDateTypeMap = function () {
        	$rootScope.datetypemap = { 0: $rootScope.resource.Day , 1 : $rootScope.resource.Week , 2 : $rootScope.resource.Month };
        }

        $rootScope.setProfileDateTypeMap = function (){
        	$rootScope.profileDateTypeMap = { 3 : $rootScope.resource.Week , 4 : $rootScope.resource.Month }
        }

        $rootScope.setChartLegend = function (){
        	$rootScope.chartlegend = [$rootScope.resource.Rank, $rootScope.resource.CoverageRate];
        }


        $rootScope.setReportTypesmap = function () {
        	$rootScope.reporttypesmap =  {0:'企业期刊', 1:'行业白皮书', 2:'移动数据报告', 3:'行业观点', 4:'移动数据报告'};
        }

        $rootScope.setReportTypesmap();

        $rootScope.setAreaMap = function () {
        	$rootScope.areaMap =  {
        			'-1':$rootScope.resource.All,
        			// 23个省
        			Guangdong:$rootScope.resource.Guangdong, Qinghai:$rootScope.resource.Qinghai, Sichuan:$rootScope.resource.Sichuan, Hainan:$rootScope.resource.Hainan, Shaanxi:$rootScope.resource.Shaanxi,
        			Gansu:$rootScope.resource.Gansu, Yunnan:$rootScope.resource.Yunnan, Hunan:$rootScope.resource.Hunan, Hubei:$rootScope.resource.Hubei, Heilongjiang:$rootScope.resource.Heilongjiang,
        			Guizhou:$rootScope.resource.Guizhou, Shandong:$rootScope.resource.Shandong, Jiangxi:$rootScope.resource.Jiangxi, Henan:$rootScope.resource.Henan, Hebei:$rootScope.resource.Hebei,
        			Shanxi:$rootScope.resource.Shanxi, Anhui:$rootScope.resource.Anhui, Fujian:$rootScope.resource.Fujian, Zhejiang:$rootScope.resource.Zhejiang, Jiangsu:$rootScope.resource.Jiangsu,
        			Jilin:$rootScope.resource.Jilin, Liaoning:$rootScope.resource.Liaoning, Taiwan:$rootScope.resource.Taiwan,
        			// 5个自治区
        			Xinjiang:$rootScope.resource.Xinjiang, Guangxi:$rootScope.resource.Guangxi, Ningxia:$rootScope.resource.Ningxia, NeiMongol:$rootScope.resource.NeiMongol, Xizang:$rootScope.resource.Xizang,
        			// 4个直辖市
        			Beijing:$rootScope.resource.Beijing, Tianjin:$rootScope.resource.Tianjin, Shanghai:$rootScope.resource.Shanghai, Chongqing:$rootScope.resource.Chongqing,
        			// 2个特别行政区
        			HongKong:$rootScope.resource.HongKong, Macao:$rootScope.resource.Macao
        	}
        }


        $rootScope.getTitle = function (currpage) {
        	if(currpage==='datareport'){
        		return 'TalkingData-'+$rootScope.resource.DataReportsL;
        	} else if(currpage==='app'){
        		return 'TalkingData-'+$rootScope.resource.AppRankingL;
        	} else {
        		return 'TalkingData-'+$rootScope.resource.MobileIndexL;
        	}
        };

        $rootScope.language = "zh_CN";
 //       window.$zopimFnload($rootScope.language,true)
        window.language= $rootScope.language;
        $rootScope.getResource =  function () {
    		jQuery.i18n.properties({// 加载资浏览器语言对应的资源文件
    			name : 'messageResources', // 资源文件名称
    			language : $rootScope.language, //默认为英文当改为zh_CN时页面显示中文语言
    			path : '/index/i18n/', // 资源文件路径
    			mode : 'map', // 用 Map 的方式使用资源文件中的值
    			callback : function() {// 加载成功后设置显示内容
    				$rootScope.resource = $.i18n.map;
    			}
    		});
    		try { $rootScope.$digest(); } catch(e){};
    		$rootScope.setApptypes();
    		$rootScope.setGametypes();
    		$rootScope.setO2Otypes();
    		$rootScope.setUsertypes();
    		$rootScope.setUsertypemap();
    		$rootScope.setAppTypesmap();
    		$rootScope.setAreaMap();
    		$rootScope.setDateTypeMap();
    		$rootScope.setProfileDateTypeMap();
    		$rootScope.setChartLegend();
    		$rootScope.setAutotypes();
    		$rootScope.setFinancetypes();
    	}


        $rootScope.shareDisplay={display:'block'};
        $rootScope.changeLang = function (lan) {
            if (lan === "en_US" || lan === "en_us" ) {
                $rootScope.language = "zh_CN";
                $rootScope.shareDisplay={display:'block'};
            } else {
                $rootScope.language = "en_US";
                $rootScope.shareDisplay={display:'none'};
            }
            console.log('change '+$rootScope.language);
//            window.language= $rootScope.language;
//            window.$zopimFnload($rootScope.language,true);
            $rootScope.getResource();
        };


        $rootScope.getShareDisplay = function () {
        	return $rootScope.shareDisplay;
        };




        $rootScope.setLang = function (lan) {
        	if(lan ==='en_us'){
        		lan = 'en_US';
        	} else if(lan ==='zh_cn'){
        		lan = 'zh_CN';
        	}

        	console.log(lan);
        	if($rootScope.language != lan){
        		console.log('reset');
        		$rootScope.language = lan;
        		$rootScope.getResource();
        	}
//        	window.language= $rootScope.language;
//        	window.$zopimFnload($rootScope.language,true);
        };
		if(window.location.hash == "#/en_US" || window.location.hash == "#/en_us"){
			$rootScope.setLang("en_US")
		}else if(window.location.hash == "#/zh_CN" || window.location.hash == "#/zh_cn"){
			$rootScope.setLang("zh_CN")
		}
        $rootScope.getResource();

        $rootScope.getBodyClass = function (currpage) {
        	if(currpage==='mobileIndex'){
        		return 'index';
        	} else if(currpage==='apprank'){
        		return 'body-thirdPage';
        	} else if(currpage==='datareport'){
        		return 'data-reports';
        	} else if(currpage==='reportdetail'){
        		return 'reports-detail';
        	} else {
        		return 'body-secPage';
        	}
        };


        $rootScope.bodyStyle={ display: 'none'};
        $rootScope.getBodyElementStyle = function () {
        	return $rootScope.bodyStyle;
        };

        angular.element(document).ready(function() {
        	$rootScope.bodyStyle={};
        });


        $rootScope.getBodyStyle = function (currpage) {
        	if(currpage==='mobileIndex' || currpage==='datareport'||currpage==='reportdetail'){
        		return { display: 'none' };
        	} else {
        		return { display: 'block'};
        	}
        };


        $rootScope.getDay = function () {
        	return $rootScope.resouce.Day;
        };

        $rootScope.getWeek = function () {
        	return $rootScope.resouce.Week;
        };

        $rootScope.getMonth = function () {
        	return $rootScope.resouce.Month;
        };


        sjson={
//				   title:'新闻标题111',
//				   pic:'https://www.talkingdata.com/imgs/8693964245073640147'
        		title : 'TalkingData移动观象台'
		};


//       window._bd_share_config={
//        		"common":{
//        			"bdSnsKey":{},
//        			"bdDesc":"",
//        			"bdMini":"2",
//        			"bdMiniList":false,
//        			"bdPic":"https://www.talkingdata.com/imgs/8693964245073640147",
//        			"bdStyle":"1",
//        			"bdSize":"16",
//
//        			onBeforeClick: function(cmd, config){
//            			config.bdText = $rootScope.share;
//            			config.bdDesc = $rootScope.share;
//            			config.bdPic = $rootScope.domain+'/'+$rootScope.sharePic;
//            			config.bdUrl = $rootScope.shareUrl;
//            			return config;
//            		}
//        		},
//        		"share":{"bdCustomStyle":"bdshare:"},
//        		"image":{"viewList":["tsina","qzone","weixin"],"viewText":"分享到：","viewSize":"16","bdStyle":"1"}
//        };
//
//        with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?v=86835285.js?cdnversion='+~(-new Date()/36e5)]

        return deferred.promise;
    });

    tdcService.service('dataService', function ($http,$rootScope, $q, loginService,$cookies,tdcConfig) {
        Highcharts.setOptions({ global: { useUTC: false } });
        moment.lang('talkingdata');

        $rootScope.getResource();
        var me = this;
        this.errmsg=null;
        var before;

        this.getClick = function () {
        	return $cookies.click;
        };


        this.setClick = function () {
            $cookies.click = 1;
        };

        function jsonp(url, params) {
//            params.callback = "JSON_CALLBACK";
        	var request;
        	params = params || {};
        	params.__r = Date.now();
        	if((url+params.dimensionfir) ==='/rank/dc/dcpro'){
        		request = $http({
    				method: 'GET',
    				url: urlBase + url,
    				params: params
//    				,
//    				timeout:1000*60*2
    			}).error(function(data, status, headers, config){
    				if(url !='/rank/ranks' && url !='/rank/user/logout'){
    					console.log('请求超时，请重试'+url);
//    					this.datadisplay='display:none';
//    	        		this.imgdisplay='display:none';
//    	        		this.errdisplay='display:block';
    				}
    			});
        	} else {
        		if(before != (url+params.dimensionfir+params.dimensionsec+params.dimensionthi+params.datetype)){
        			//目前无请求
        			request = $http({
        				method: 'GET',
        				url: urlBase + url,
        				params: params
//        				,
//        				timeout:1000*60*2
        			}).error(function(data, status, headers, config){
        				if(url !='/rank/ranks' && url !='/rank/user/logout'){
        					console.log('请求超时，请重试'+url);
//        					this.datadisplay='display:none';
//        	        		this.imgdisplay='display:none';
//        	        		this.errdisplay='display:block';
        				}
        			});
        		} else {
        			request = $http({
        				method: 'GET',
        				url: urlBase + url,
        				params: params
//        				,
//        				timeout:1000*60*2
        			}).error(function(data, status, headers, config){
        				console.log('请求超时，请重试'+url);
        				this.datadisplay='display:none';
    	        		this.imgdisplay='display:none';
    	        		this.errdisplay='display:block';
        			});
        		}
        		before = url+params.dimensionfir+params.dimensionsec+params.dimensionthi+params.datetype;
    		}
        	return request;
        }

        function reportJsonp(url, params) {
        	var request;
        	params = params || {};
        	params.__r = Date.now();
        		request = $http({
    				method: 'GET',
    				url: url,
    				params: params
//    				,
//    				timeout:1000*60*2
    			}).error(function(data, status, headers, config){
    				if(url !='/rank/ranks' && url !='/rank/user/logout'){
    					console.log('请求超时，请重试'+url);
    				}
    			});

        	return request;
        }


        this.ranktype = 1;
        this.datetype = 1;
        this.top = 100;
        this.platform = 2;
        this.platformIcon = 'images/icon-android.png';
        this.platformIconOther = 'images/icon-ios.png';

        //list
        this.inituserTwo = false;
        this.logstyleTwo = { display: 'none' };
        this.logedstyleTwo = { display: 'none'};
        this.nullstyleTwo = { display: 'block' };

        this.inituser = false;
        this.logstyle = { display: 'none' };
        this.logedstyle = { display: 'none'};
        this.nullstyle = { display: 'block' };
        this.platformDesc="Android平台";
        this.setPlatform = function () {
        	$cookies.click = 1;

           if(this.platform===1){
               this.platform = 2;
               this.platformDesc="Android平台";
           } else if(this.platform===2){
               this.platform = 1;
               this.platformDesc="IOS平台";
           }

           if(this.platform === 1){
        	   this.currUserTypeBak = null;
        	   this.typeidBak=-1;
           }
        };

        this.navTo = function (dimension) {
            this.scrollTop = $(document.body).scrollTop();
            	window.location.href = '#/' + dimension+'/'+$rootScope.language;
        };

        this.errmsg=0;
        this.retry = function () {
            this.errmsg=this.errmsg+1;
        };

        this.maxTimeLine;

        this.date = moment().subtract('day', 1).format('YYYY-MM-DD');
        this.date = moment().format('YYYY-MM-DD');
        this.initdatetype = false;
        this.year = moment().subtract('day', 1).format('YYYY')

        this.setDateType = function (dt) {
        	this.datetype = dt;
        	this.maxTimeLine=this.getDateBefore(this.date,dt).replace('-0','-').split('-')[1];

        	this.curr=this.maxTimeLine;
        	if(dt===1){
        		this.year = moment().subtract('week', 1).startOf('week').format('YYYY')
        		this.dateDesc = this.getDateBegin()+'日-'+this.getDateEnd()+'日';
        	} else if(dt===2){
        		this.year = moment().subtract('month', 1).format('YYYY')
        		this.dateDesc = this.getCurrDate()+'月';
        	} else if(dt===3){
        		this.year = moment(this.date).subtract('month', 3).format('YYYY')
        		this.dateDesc = this.getCurrDate().replace('-0','Q');
        	}
        };
        this.setMaxTimeLine = function(time){
            if(time){
                this.date = time;
                this.date = time;
                this.initdatetype = false;
                this.year = moment(time,"YYYY-MM-DD").format('YYYY')
            }else{
                this.date = moment().subtract('day', 1).format('YYYY-MM-DD');
                this.date = moment().format('YYYY-MM-DD');
                this.initdatetype = false;
                this.year = moment().subtract('day', 1).format('YYYY')
            }
        };
        this.getClass = function (rank) {
        	if(rank===1){
        		return 'orange';
        	} else if(rank===2){
        		return 'yellow';
        	} else if(rank===3){
        		return 'green';
        	} else {
        		return 'other';
        	}
        };

        //初始情况不能move left
        this.moveLeft=0;
        //初始情况只能move right
        this.moveRight=0;

//        this.usertype = $rootScope.usertypes[0];

        this.mobviewboxmap = { '苹果': '0 0 49 60' ,  '三星': '0 0 181 60' ,  '步步高': '0 0 271 60' , '宇龙酷派': '0 0 218 60' ,  '海信': '0 0 340 60' , 'HTC': '0 0 181 60' ,'华为': '0 0 79 60', '金立': '0 0 263 60', '联想': '0 0 393 60', 'LG': '0 0 138 60', '魅族': '0 0 338 60'
        	, '小米': '0 0 93 60', '摩托罗拉': '0 0 60 60', '索尼': '0 0 344 60', 'TCL': '0 0 185 60', 'OPPO': '0 0 363 60'};

        this.types = [{ id: -1, type: $rootScope.resource.AllGenres }];
        this.appType = this.types[0];
        this.istype = 1;


        $http.jsonp(urlBase + '/rank/dc/mobs?callback=JSON_CALLBACK').success(function (data) {
            me.mobs = data;
        });

        $http.jsonp(urlBase + '/rank/dc/cars?callback=JSON_CALLBACK').success(function (data) {
            me.cars = data;
        });


        this.getDateType = function () {
            var dt = [$rootScope.resource.Week, $rootScope.resource.Month, $rootScope.resource.Quarter];
            return dt[me.datetype-1];
        };

        this.getDateBefore = function (val, datetype) {
            val = val || me.date;
            var dt = ['YYYY-MM-DD', 'w', 'YYYY-MM'];
            if (datetype === 0) {
            	//日
                return moment(val).format(dt[datetype]);
            } else if (datetype === 2) {
            	//月
                return moment(val).subtract('months', 1).format(dt[datetype]);
            }  else if (datetype === 1){
            	//周
                var m = moment(val),
                    week = m.week()-1;

                if (week === 0 && m.month() === 11){ week = 53;}
                else if (week === 52 && m.month() === 0) {week = 1;}
                else if (week === 0 && m.month() === 0) {week = 52;}

                if(week<10){
                	return this.year+'-0' + week;
                } else{
                	return this.year+'-' + week;
                }
            } else{
            	//季度
            	var m = moment(val),
            	quarter = m.quarter()-1;
            	if(quarter===0){
            		quarter=4;
            	}

            	return m.format('YYYY-0') + quarter;
            }
        };


        this.getDateBegin = function () {
        	switch(this.datetype){
        		case 1: {
        			return moment(this.getCurrDate(), 'gggg-w').startOf('week').format('YYYY-MM-DD');
        		}
        		case 2: {
        			return moment(this.getCurrDate(), 'YYYY-MM').startOf('month').format('YYYY-MM-DD');
        		}
        		case 3: {
        			return moment(this.getCurrDate().replace('-0','-'), 'YYYY-Q').startOf('quarter').format('YYYY-MM-DD');
        		}
        	}
        };

        this.getDateEnd = function () {
        	switch(this.datetype){
        		case 1: {
        			return moment(this.getCurrDate(), 'gggg-w').endOf('week').format('YYYY-MM-DD');
        		}
        		case 2: {
        			return moment(this.getCurrDate(), 'YYYY-MM').endOf('month').format('YYYY-MM-DD');
        		}
        		case 3: {
        			return moment(this.getCurrDate().replace('-0','-'), 'YYYY-Q').endOf('quarter').format('YYYY-MM-DD');
        		}
        	}
        };


        this.getDate = function (val, datetype) {
            val = val || me.date;
            var dt = ['YYYY-MM-DD', 'w', 'YYYY-MM'];
            if (datetype === 0||datetype === 2) {
                return moment(val).format(dt[datetype]);
            } else if (datetype === 1){
                var m = moment(val),
                    week = m.week();

                if (week === 0 && m.month() === 11) week = 53;
                if (week === 52 && m.month() === 0) week = 1;
                if(week<10){
                	return m.format('YYYY-0') + week;
                } else{
                	return m.format('YYYY-') + week;
                }
            } else{
            	var m = moment(val),
            	quarter = m.quarter();
            	return m.format('YYYY-0') + quarter;
            }
        };

        this.curr;
        this.getCurrDate = function () {
        	if(this.curr < 10){
        		return this.year + '-0' + this.curr;
        	}else{
        		return this.year + '-' + this.curr;
        	}
        }

        this.getDateDetail = function (val, datetype) {
            val = val || me.date;
            datetype = datetype || me.datetype;

            if (datetype == 0) return moment(val).format('YYYY-MM-DD');

            var start, end;

            switch (datetype) {
                case '1':
                case 1:
                    start = moment(val).startOf('week').add('days', 1).format('YYYY-MM-DD');
                    end = moment(val).endOf('week').add('days', 1).format('YYYY-MM-DD');
                    break;
                case '2':
                case 2:
                    start = moment(val).startOf('month').format('YYYY-MM-DD');
                    end = moment(val).endOf('month').format('YYYY-MM-DD');
                    break;
            }

            return start + ' - ' + end;
        };


    	this.area=$rootScope.resource.All;
    	this.currUserType = null;
    	this.areaEn = '-1';
        this.typeid=-1;
        this.areaBak=$rootScope.resource.All;
    	this.areaEnBak = '-1';
        this.typeidBak=-1;
        this.setArea = function (areaEn) {
        	if(this.areaEnBak==areaEn){
            	this.areaEnBak = '-1';
        	} else {
        		this.areaEnBak = areaEn;
        	}
        };
        this.setUserType = function (type) {
        	if(this.typeidBak == type.id){
        		this.typeidBak='-1';
        	} else {
        		this.typeidBak=type.id;
        	}
        };
        this.setAll = function () {
        	this.areaBak=$rootScope.resource.All;
        	this.currUserTypeBak = null;
        	this.areaEnBak = '-1';
        	this.typeidBak=-1;
        };


        this.export = function (keyword,jobid) {
            var qs = !keyword ? {
                platform: me.platform,
                date: me.getDate(),
                datetype: me.datetype,
                area: me.region.id,
                typeid: me.appType.id,
                istype: me.istype,
                tagid: me.tag.id,
                istag: me.istag,
                top: me.top,
                ranktype: me.ranktype,
                jobid:jobid,
                source: me.source.id
            } : {
                platform: me.platform,
                date: me.getDate(),
                datetype: me.datetype,
                area: me.region.id,
                name: keyword,
                source: me.source.id
            };

            return jsonp('/rank/excel', qs);
        };

        this.exportGrow = function () {
            var qs = {
            	 platform: me.platform,
                 date: me.getDate(),
                 area: me.region.id,
                 typeid: me.appType.id,
                 istype: me.istype,
                 tagid: me.tag.id,
                 istag: me.istag,
                 comparetype: me.comparetype,
                 filtertype: me.filtertype.id,
                 min: me.min,
                 max: me.max,
                 top: me.top,
                 ranktype: me.growtype.id,
                 ranktype: me.source.id,
                 name: me.keyword
            };

            return jsonp('/rank/excelGrow', qs);
        };

        this.exportTrend = function (hash, datetype, start, end, source) {
            var qs = {
                platform: me.platform,
                startdate: start,
                enddate: end,
                area: me.region.id,
                hash: hash,
                datetype: datetype,
                source: source
            };

            return jsonp('/rank/excelranktrends', qs);
        };

        this.init = false;
        this.getDimensionTop = function (dimensionfir,date,datetype,platform,area,typeid) {
        	var result;
        	var top=100;
        	if((!!area && area!=-1 || !!typeid && typeid!=-1)&& dimensionfir!='pro' ){
        		result= jsonp('/rank/dc/dc2d', {
                    datetype: datetype,
                    startdate: date,
                    enddate: date,
                    metric: 'n',
                    dimensionfir: dimensionfir,
                    dimensionsec: 'pro',
                    dimensionthi: 'typeid',
                    platform:platform,
                    secvalue:area,
                    thivalue:typeid
                });
        	} else {
        		if(dimensionfir==='pro' && area!=null ){
        			top=10;
        		}
        		result= jsonp('/rank/dc/dc', {
                    datetype: datetype,
                    startdate: date,
                    enddate: date,
                    metric: 'a',
                    dimensionfir: dimensionfir,
                    platform:platform,
                    top: top
                });
        	}
            return  result;
        };
        this.getDimensionTrend = function (startDate,endDate,datetype) {
            var result= jsonp('/rank/dc/dcusertrend', {
                datetype: datetype,
                startdate: startDate,
                enddate: endDate,
                metric: 'a',
                top: 30
            });
            return  result;
        };
        this.getTopApp = function (date,datetype,typeid) {
            var me = this;
            typeid = typeid == -1?undefined:typeid;
        	date = date.replace('-0','-');
        	if(datetype=='1'){
                return reportJsonp('https://www.talkingdata.com/mi/business/v1/ranking/weekly/overall', {
                    date: me.getDateBegin(),
                    rankingSize: 100,
                    typeId:typeid
                });
        	}else if(datetype=='2'){
                return reportJsonp('https://www.talkingdata.com/mi/business/v1/ranking/monthly/overall', {
                    date: me.getDateBegin(),
                    rankingSize: 100,
                    typeId:typeid
                });
        	}else if(datetype=='3'){
                return reportJsonp('https://www.talkingdata.com/mi/business/v1/ranking/monthly/overall', {
                    date: me.getDateBegin(),
                    rankingSize: 100,
                    typeId:typeid
                });
        	}

            // return jsonp('/rank/ranks', {
            //     platform: 2,
            //     date: date,
            //     datetype: datetype,
            //     typeid: typeid,
            //     istype: istype
            // });
        };
        this.getAvailableDate = function(){
            return reportJsonp('https://www.talkingdata.com/mi/business/v1/common/availableDate');
        }
        this.getAppTypesOfAll = function(){
            return reportJsonp(' https://www.talkingdata.com/mi/business/v1/typeinfo');
        }

        this.getMonthTrend = function (start, end) {
            return jsonp('/rank/dc/monthtrend', {
                startdate: start,
                enddate: end
            });
        };

        this.getAppUserLike = function (hash,parentId, datetype, start, end) {
            return jsonp('/rank/dc/appuserlike', {
            	hash: hash,
            	parentid:parentId,
            	datetype: datetype,
                startdate: start,
                enddate: end
            });
        };

        this.getAppArea = function (hash,parentId,datetype, start, end) {
            return jsonp('/rank/dc/apparea', {
            	hash: hash,
            	parentid:parentId,
            	datetype: datetype,
                startdate: start,
                enddate: end
            });
        };

        // this.getAppTrend = function (hash, parentId,datetype, start, end, typeid) {
        // 	if(start.length===6){start=start.replace('-','-0');}
        // 	if(end.length===6){end=end.replace('-','-0');}
        //     return jsonp('/rank/ranktrends',{
        //         platform: 2,
        //         startdate: start,
        //         enddate: end,
        //         hash: hash,
        //         parentid:parentId,
        //         datetype: datetype,
        //         typeid:typeid
        //     });
        // };
        this.getAppTrend = function (appId, start, end, datatype) {
            if(datatype==0){
                return reportJsonp('https://www.talkingdata.com/mi/business/v1/kpi/'+appId+'/rankingKpi/daily',{
                    startDate: start,
                    endDate: end,
                    appId: appId,
                });
        	}else if(datatype==1){
                return reportJsonp('https://www.talkingdata.com/mi/business/v1/kpi/'+appId+'/rankingKpi/weekly',{
                    startDate: start,
                    endDate: end,
                    appId: appId,
                });
        	}else if(datatype==2){
                return reportJsonp('https://www.talkingdata.com/mi/business/v1/kpi/'+appId+'/rankingKpi/monthly',{
                    startDate: start,
                    endDate: end,
                    appId: appId,
                });
        	}
        };

        this.getAppTypes = function (hash) {
            return jsonp('/rank/apptypes', { hash: hash });
        };

        // this.getDateReportList = function (resourcetype) {
        //     return jsonp('/rank/dr/drlist', {
        //         resourcetype: resourcetype,
        //         type: 3,
        //         servicecode: 3731,
        //         page: 9
        //     });
        // };
        this.getDateReportList = function (url,resourcetype,tag,page) {
            return reportJsonp(url+'/paging.json', {
                category: resourcetype,
                tag: tag,
                page: page,
                size:9
            });
        };
        this.getDateReportCat = function (url) {
            return reportJsonp(url+'/categories.json', {});
        };
        this.getDateReportTag = function (url) {
            return reportJsonp(url+'/tags.json', {});
        };

        this.getReportContent = function (url,id) {
            return reportJsonp(url+'/'+id+'.json', {});
        };
        this.getLastReport = function (url) {
            return reportJsonp(url+'/latest.json', {});
        };
        this.getHotReport = function (url) {
            return reportJsonp(url+'/hottest.json', {});
        };

        this.getStat = function () {
            return jsonp('/rank/dc/stat', {});
        };

        this.getUser = function () {
            return jsonp('/rank/user/name', {});
        };
        this.getUserSecond = function () {
            return jsonp('/rank/user/name', {});
        };
        this.logout = function () {
            return jsonp('/rank/user/logout', {});
        };

        this.getCacheMark = function (date, datetype) {
            return jsonp('/rank/dc/cachemark',{
                date: date,
                datetype: datetype
            });
        };
    });

})(jQuery);
