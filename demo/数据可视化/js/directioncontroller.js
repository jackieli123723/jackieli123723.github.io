/**
 * direction.html 's controller
 */
var username = "";
function createJobController($scope,$http) {
	$scope.$root.currentPage = 'direction';
	$http.get("/rank/getUserInfo").success(function(data){
		username = data.username;
		$scope.$root.user = data;
	});
	$scope.jobs = [];
	$scope.target="apprank";
	$scope.type = 'and';
	$scope.searchResults = [];
	$scope.jobname="";
	$scope.changeType = function() {
		var type = '';
		if ($scope.type == 'and') {
			type = 'or';
		}
		if ($scope.type == 'or') {
			type = 'and';
		}
		$scope.type = type;
	};
	$scope.setusetype = function(jobid, type) {
		for (var int = 0; int < $scope.jobs.length; int++) {
			if ($scope.jobs[int].id == jobid) {
				$scope.jobs[int].operate = type;
			}
		}
	}
	$scope.getJobType=function(type,jobid){
		for (var int = 0; int < $scope.jobs.length; int++) {
			var job = $scope.jobs[int];
			if (job.id == jobid) {
				return job.jobtype==type;
			}
		}
	};
	$scope.getType = function(type) {
		if ($scope.type == type) {
			return true;
		}
	};
	$scope.removeapp = function(app, jobid) {
		for (var int = 0; int < $scope.jobs.length; int++) {
			var job = $scope.jobs[int];
			if (job.id == jobid) {
				job.apps = removeApps(job.apps, app);
			}
		}
	};
	$scope.addapp = function(appname, jobid) {
		for (var int = 0; int < $scope.jobs.length; int++) {
			var job = $scope.jobs[int];
			if (job.id == jobid) {
				job.apps.push(appname);
				$scope.searchResults = new Array();
			}
		}
	};
	$scope.removejob = function(jobid) {
		var jobarray = new Array();
		for (var int = 0; int < $scope.jobs.length; int++) {
			if ($scope.jobs[int].id != jobid) {
				jobarray.push($scope.jobs[int]);
			}
		}
		$scope.jobs = jobarray;
	};
	$scope.addnewjob = function(jobtype) {
		var job = {};
		job.id = $scope.jobs.length;
		if (job.id < 0) {
			job.id = 0;
		}
		job.startdate = getDate();
		job.enddate = getDate();
		job.apps = new Array();
		if(jobtype == "apps"){
			job.operate = "install";
			job.mmordate = "date";
		}else if(jobtype == "area"){
			job.operate = "is";
			job.mmordate = "date";
		}else if(jobtype == "mobilemodel"){
			if($scope.type == 'and'){
				if(checkMobileModel($scope.jobs)){
					job.operate = "use";
					job.mmordate = checkMobileModel($scope.jobs);
				}else{
					alert("机型筛选在条件为‘and’的情况下只能有一个。请修改条件或删除规则");
					return;
				}
			}else{
				job.operate = "use";
				job.mmordate = 'mobile';
			}
		}
		
		job.jobtype = jobtype;
		$scope.jobs.push(job);
	};
	$scope.search = function(text,jobtype,mmordate) {
		var array = new Array();
		if(jobtype == 'apps'){
			$http.jsonp("/rank/apps?name="+text+"&num=10&callback=JSON_CALLBACK").success(function(data) {
				$scope.searchResults = data.apps;
			});
		}else if(jobtype == 'mobilemodel'){
			var array = new Array();
			if(mmordate == "mobile"){
				$http.jsonp("/rank/device/search?platform=1&state=-1&brand="+text+"&callback=JSON_CALLBACK").success(function(data) {
					for(var int = 0; int  < data.length;int++){
						var dr={};
						if(data[int].outputBrand){
							dr.hash=data[int].outputBrand;
						}else{
							dr.hash=data[int].brand;
						}
						if(data[int].outputBrandCn){
							dr.appName=data[int].outputBrandCn;
						}else{
							dr.appName=data[int].brand;
						}
						array.push(dr);
					}
					$scope.searchResults = uniq(array);
				});
			}else if(mmordate == "model"){
				var s = getMobileNum($scope.jobs);
				var branch = "";
				if(!(s == 0  || s > 1)){
					branch = s;
				}
				$http.jsonp("/rank/device/search?platform=1&state=-1&brand="+branch+"&mobile="+text+"&callback=JSON_CALLBACK").success(function(data) {
					for(var int = 0; int  < data.length;int++){
						var dr={};
						if(data[int].outputModel){
							dr.hash=data[int].outputModel;
						}else{
							dr.hash=data[int].model;
						}
						if(data[int].outputModel){
							dr.appName=data[int].outputModel;
						}else{
							dr.appName=data[int].model;
						}
						array.push(dr);
					}
					$scope.searchResults = uniq(array);
				});
			}

		}else if(jobtype == 'area'){
			$http.get("/seararea?area="+text).success(function(data){
				$scope.searchResults = data;
			})
		}
	};
	$scope.submitJob=function(jobname){
		var t = $scope.target.split(',');
		var isempty = true;
		for(var i = 0 ;  i < t.length;i++){
			if(t[i] != ""){
				isempty = false;
			}
		}
		if(isempty){
			alert("请选择一个目标任务");
			return;
		}
		$scope.jobname = jobname;
		var finaljob={};
		finaljob.jobs = $scope.jobs;
		finaljob.type = $scope.type;
		finaljob.jobname = $scope.jobname;
		finaljob.target = $scope.target;
		finaljob.username=username;
		$http.post("jobReciver",finaljob).success(function(data){
			alert(data);
			window.location.reload();
		});
	};
	$scope.getChecked = function(target){
		var tar = $scope.target.split(",");
		for(var i = 0 ; i < tar.length;i++){
			if(tar[i] == target){
				return true;
			}
		}
		return false;
	}
	
	$scope.changeCheck = function(target){
		var tar = $scope.target.split(",");
		var list = "";
		var isin = false;
		for(var i=0;i<tar.length;i++){
			if(tar[i] == target){
				isin = true;
			}else if(tar[i] != ""){
				list += tar[i]+",";
			}
		}
		if(!isin){
			list += target+",";
		}
		$scope.target = list;
	}
}

function getDate() {
	var now = new Date();
	var d = now.setDate(now.getDate() -1);
	var date = new Date(d);
	strTime = date.toLocaleDateString();
	strYear = date.getUTCFullYear();
	strMonth = date.getUTCMonth()+1;
	strDay = date.getUTCDate();
	var displayTime = strYear;
	if(strMonth < 10){
		displayTime += "-0"+strMonth;
	}else{
		displayTime += "-"+strMonth;
	}
	if(strDay < 10){
		displayTime += "-0"+strDay;
	}else{
		displayTime += "-"+strDay;
	}
	return displayTime;
}
function checkMobileModel(jobs){
	var mobilenum = 0;
	var modelnum = 0;
	for(var int = 0; int < jobs.length;int++){
		if(jobs[int].mmordate=='mobile'){
			mobilenum++;
		}
		if(jobs[int].mmordate=='model'){
			modelnum++;
		}
	}
	if((mobilenum-modelnum) == 1 || mobilenum == 0){
		if(mobilenum == 0){
			return "mobile";
		}else{
			return "model";
		}
	}else{
		return false;
	}
}
function removeApps(apps, app) {
	var appArray = new Array();
	for (var int = 0; int < apps.length; int++) {
		if (apps[int].hash != app.hash) {
			appArray.push(apps[int]);
		}
	}
	return appArray;
}

function jobhistoryCtr($scope,$http){
	$scope.history={};
	if(username == ""){
		$http.get("/rank/getUserInfo").success(function(data){
			var username = data.username;
			$http.get("/getjobhistory?username="+username).success(function(data){
				$scope.history=data;
			})
		})
	}else{
		$http.get("/getjobhistory?username="+username).success(function(data){
			$scope.history=data;
		})
	}
	$scope.deletejob = function(jobid){
		
		$http.get("/deletejob?jobid="+jobid).success(function(data){
			alert(data);
			window.location.reload();
		});
	}
	$scope.getTarget = function(target,jobid){
		for(var i = 0; i < $scope.history.length;i++){
			if($scope.history[i].jobid == jobid){
				var tar = $scope.history[i].target;
				if(!tar){
					if(target == 'apprank'){
						return true;
					}
				}else{
					var t = tar.split(",");
					for(var j = 0 ; j < t.length;j++){
						if(t[j] == target){
							return true;
						}
					}
				}
			}
		}
	}
	$scope.recal = function(jobid){
		$http.get("/recalJob?jobid="+jobid).success(function(data){
			alert(data);
			window.location.reload();
		});
	}
}
function uniq(some){
	var tmp = [];
	for(var i = 0; i<some.length;i++){
		var iscon = false;
		for(var j = 0;j<tmp.length;j++){
			if((tmp[j].hash == some[i].hash) && (tmp[j].appName == some[i].appName)){
				iscon = true;
			}
		}
		if(!iscon){
			tmp.push(some[i]);
		}
	}
	return _.first(tmp,10);
}

function getMobileNum(jobs){
	var num = 0;
	var mobilearr = [];
	for(var i = 0 ; i < jobs.length;i++){
		if(jobs[i].mmordate == "mobile"){
			var apps = jobs[i].apps;
			for(var j = 0 ; j < apps.length;j++){
				mobilearr.push(apps[j].hash);
				num++;
			}
		}
	}
	if(num != 1){
		return num;
	}else{
		return mobilearr[0];
	}
}