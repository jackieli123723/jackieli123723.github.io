/**
 *directionResult.html controller
 */
var xdata;
var ydata;
var browserData;
var versionsData;
function datacenterCtr($scope,$http,$routeParams){
	$scope.$root.currentPage = 'datacenter';
	$scope.secdimenlist = [{'name':'24小时','v':'24hour'},
	                       {'name':'周','v':'week'},
	                       {'name':'月','v':'month'},
	                       {'name':'日','v':'day'},
	                       {'name':'品牌','v':'mob'},
	                       {'name':'机型','v':'model'},
	                       {'name':'系统','v':'os'},
	                       {'name':'分辨率','v':'pix'},
	                       {'name':'运营商','v':'car'},
	                       {'name':'联网方式','v':'g'},
	                       {'name':'国家','v':'con'},
	                       {'name':'中国省份','v':'pro'}];

	
	$scope.target='a';
	$scope.dimension = 'mob';
	$scope.starttime = getDate();
	$scope.endtime=getDate();
	$scope.shownum = 10;
	$scope.secdimension="";
	$scope.all = 0;
	$scope.datetype = "1";
	$scope.nowdatas = [];
	$scope.sorcedata=[];
	//col,line
	$scope.drawType = 'col';
	$scope.secxdata = [];
	$scope.secydata = [];
	$scope.secshowdata=[];
	$scope.secshowall = 0;
	
	$scope.nowsecdimlist = removedata($scope.secdimenlist,$scope.dimension);
	
	$scope.jobdesc = '';
	$http.get("/GetJobDesc?"+"jobid="+$routeParams.jobid).success(function(data){
			$scope.jobdesc = data;
	});
	$scope.getTarget = function(){
		if($scope.target == 'a'){
			return '活跃用户';
		}else if($scope.target == 'n'){
			return '新增用户';
		}else if($scope.target == 't'){
			return '活跃次数';
		}
	}
	
	$scope.changeTarget = function(data){
		$scope.secdimension = '';
		$scope.target = data;
		$scope.changeTime();
		$http.get("/rank/dc/dc?datetype="+$scope.datetype+"&metric="+$scope.target+"&startdate="+$scope.starttime+"&enddate="+$scope.endtime+"&dimensionfir="+$scope.dimension+"&top=30").success(function(data){
			$scope.sorcedata = data;
			$scope.showdata(data,$scope.shownum);
		});
	}
	
	$scope.getDimension = function(){
		if($scope.datetype == '1' && $scope.dimension == ""){
			return '24小时';
		}else if($scope.datetype == '2' && $scope.dimension == ""){
			return '日趋势';
		}else if($scope.datetype == '3' && $scope.dimension == ""){
			return '周趋势';
		}else if($scope.datetype == '4' && $scope.dimension == ""){
			return '月趋势';
		}else if($scope.dimension == 'mob'){
			return '品牌分布';
		}else if($scope.dimension == 'model'){
			return '机型分布';
		}else if($scope.dimension == 'pix'){
			return '分辨率分布';
		}else if($scope.dimension == 'car'){
			return '运营商分布';
		}else if($scope.dimension == 'os'){
			return '系统分布';
		}else if($scope.dimension == 'con'){
			return '国家分布';
		}else if($scope.dimension == 'pro'){
			return '中国地区分布';
		}else if($scope.dimension == 'g'){
			return '联网方式分布';
		}
	}
	
	$scope.getSecDimension = function(){
		if($scope.datetype == '1' && $scope.secdimension == ""){
			return '24小时';
		}else if($scope.datetype == '2' && $scope.secdimension == ""){
			return '日趋势';
		}else if($scope.datetype == '3' && $scope.secdimension == ""){
			return '周趋势';
		}else if($scope.datetype == '4' && $scope.secdimension == ""){
			return '月趋势';
		}else if($scope.secdimension == 'mob'){
			return '品牌分布';
		}else if($scope.secdimension == 'model'){
			return '机型分布';
		}else if($scope.secdimension == 'pix'){
			return '分辨率分布';
		}else if($scope.secdimension == 'car'){
			return '运营商分布';
		}else if($scope.secdimension == 'os'){
			return '系统分布';
		}else if($scope.secdimension == 'con'){
			return '国家分布';
		}else if($scope.secdimension == 'pro'){
			return '中国地区分布';
		}else if($scope.secdimension == 'g'){
			return '联网方式分布';
		}
	}
	
	var title;
	var result;
	$scope.changeDimension = function(data){
		$scope.secdimension = '';
		
		if(data == '24hours'){
			$scope.datetype="1";
			$scope.dimension="";
		}else if(data == 'day'){
			$scope.datetype = "2";
			$scope.dimension="";
		}else if(data == 'week'){
			$scope.datetype = '3';
			$scope.dimension="";
		}else if(data == 'month'){
			$scope.datetype = "4";
			$scope.dimension="";
		}else{
			$scope.datetype ='1';
			$scope.dimension = data;
		}
		
		if(data == 'model'){
			$scope.nowsecdimlist = removedata($scope.secdimenlist,"mob");
		}
		if(data == 'pro'){
			$scope.nowsecdimlist = removedata($scope.secdimenlist,"con");
		}
		if(data == "con"){
			$scope.nowsecdimlist = removedata($scope.secdimenlist,"pro");
		}
		
		$scope.nowsecdimlist = removedata($scope.nowsecdimlist, data);
		
		if($scope.datetype !='' && $scope.dimension == ""){
			$scope.drawType = 'line';
			$http.get("/rank/dc/dc?datetype="+$scope.datetype+"&metric="+$scope.target+"&startdate="+$scope.starttime+"&enddate="+$scope.endtime+"&top=30").success(function(data){
				$scope.sorcedata = data;
				$scope.showline(data);
			});
		}else{
			$scope.changeTime();
			if($scope.drawType == 'line'){
				$scope.drawType = 'col';
			}
			$http.get("/rank/dc/dc?datetype="+$scope.datetype+"&metric="+$scope.target+"&startdate="+$scope.starttime+"&enddate="+$scope.endtime+"&dimensionfir="+$scope.dimension+"&top=30").success(function(data){
				$scope.sorcedata = data;
				$scope.showdata(data,$scope.shownum);
			});
		}
	}
	
	$scope.changeSecDimension = function(data){
		$scope.secdimension = data;
		$scope.changeTime();
		$http.get("/rank/dc/dc?datetype="+$scope.datetype+"&metric="+$scope.target+"&startdate="+$scope.starttime+"&enddate="+$scope.endtime+"&dimensionfir="+$scope.dimension+"&dimensionsec="+$scope.secdimension+"&top=30").success(function(data){
			$scope.sorcedata = data;
			var re = calTabledata(data);
			$scope.secxdata = re.xdata;
			$scope.secydata = re.ydata;
			$scope.showdata(data,$scope.shownum);
		});
	}
	
	$scope.changesecshowdata = function(data){
		for (var i = 0; i < $scope.secydata.length; i++) {
			if($scope.secydata[i].name == data.name){
				$scope.secshowdata = $scope.secydata[i].data;
				$scope.secshowall = $scope.secydata[i].all;
			}
		}
	}
	
	if($scope.datetype == "1"){
		if($scope.starttime.split(" ").length == 1){
			$scope.starttime += " 00";
			$scope.endtime += " 23";
		}
	}
	$http.get("/rank/dc/dc?datetype="+$scope.datetype+"&metric="+$scope.target+"&startdate="+$scope.starttime+"&enddate="+$scope.endtime+"&dimensionfir="+$scope.dimension+"&top=30").success(function(data){
		$scope.sorcedata = data;
		$scope.showdata(data,$scope.shownum);
	});
	
	$scope.changeShowNum = function(num){
		$scope.shownum = num;
		$scope.showdata($scope.sorcedata,$scope.shownum);
	}
	$scope.changeShowType = function(type){
		$scope.drawType = type;
		$scope.showdata($scope.sorcedata,$scope.shownum);
	}
	
	
	$scope.showdata = function(data,num){
		if($scope.drawType == 'col'){
			var result = {};
			if($scope.secdimension == ''){
				result = calcuResult(data,num);
			}else{
				result = calSecResult(data, num);
			}
			xdata = result.xdata;
			ydata = result.ydata;
			$scope.all = result.all;
			$scope.nowdatas = result.nowdata;
			setdataAndDraw($scope.getTarget(), $scope.getDimension(), result.xdata, result.ydata);
		}else if($scope.drawType == 'pie'){
			if($scope.secdimension == ''){
				setdataAndDrawPie($scope.getTarget(),$scope.getDimension(),$scope.sorcedata,$scope.shownum);
			}else{
				drowSecPie($scope.getTarget(),$scope.getDimension(),$scope.sorcedata,$scope.shownum,$scope.secdimension);
			}
		}
	}
	
	$scope.showline = function(data){
		title = $scope.getTarget()+"-"+$scope.getDimension();
		
		xdata = [];
		ydata = [];
		var da = {};
		da.name=$scope.getTarget();
		da.data=[];
		for (var i = 0; i < data.length; i++) {
			var value = parseInt(data[i].v);
			xdata.push(data[i].k);
			da.data.push(value);
		}
		ydata.push(da);
		drawLinepix(title,xdata,ydata);
	}
	
	$scope.changeTime = function(){
		if($scope.datetype == "1"){
			if($scope.starttime.split(" ").length == 1){
				$scope.starttime += " 00";	
			}
			if($scope.endtime.split(" ").length == 1){
				$scope.endtime += " 23";
			}
		}else{
			if($scope.starttime.split(" ").length == 2){
				$scope.starttime = $scope.starttime.split(" ")[0];
				
			}
			if($scope.endtime.split(" ").length == 2){
				$scope.endtime = $scope.endtime.split(" ")[0];
			}
		}
	}
}

function removedata(arr,value){
	var array = [];
	for (var int = 0; int < arr.length; int++) {
		if(arr[int].v != value){
			array.push(arr[int]);
		}
	}
	return array;
}

function drawLinepix(titles,xdata,ydata){
	title = titles;
	drawLine();
}

function setdataAndDraw(target,dimension,xdata,ydata){
	title= target+"-"+dimension;
	drawColumnStacked();
}

function setdataAndDrawPie(target,dimension,data,shownum){
	title = target+"-"+dimension;
	var colors = Highcharts.getOptions().colors;
	var bdatas = [];
	var otherdata = 0;
	for(var i = 0; i < data.length;i++){
		if(i < shownum){
			bdatas.push({name:data[i].k,y:parseInt(data[i].v),color:colors[i]})
		}else{
			otherdata += parseInt(data[i].v);
		}
	}
	bdatas.push({name:'other',y:otherdata,color:colors[data.length]});
	browserData = bdatas;
	drawPieChart();
}

function drowSecPie(target,dimension,data,shownum,secdimension){
	title = target+"-"+dimension+"-"+secdimension;
	var colors = Highcharts.getOptions().colors;
	var bdatas = [];
	var ydatas = [];
	
	var nowindex = 0;
	var ynum = 10;
	
	for (var i = 0; i < data.length; i++) {
		var value = parseInt(data[i].v);
		var datas = data[i].k.split(",");
		if(datas[0] == '' || datas[1] == ''){
			continue;
		}
		if(bdatas.length>=10){
			continue;
		}
		
		if(!_.contains(bdatas,datas[0])){
			bdatas.push(datas[0]);
			nowindex = bdatas.length-1;
			ydatas.push({
				y:value,
				color:colors[i],
				drilldown:{
					name:secdimension,
					categories:[datas[1]],
					data:[value],
					color:colors[i]
				}
			});
		}else{
			if(ydatas[nowindex].drilldown.categories.length >=5){
				continue;
			}
			ydatas[nowindex].y += value;
			ydatas[nowindex].drilldown.categories.push(datas[1]);
			ydatas[nowindex].drilldown.data.push(value);
		}
	}
	browserData=[];
	versionsData=[];
    for (var i = 0; i < ydatas.length; i++) {

        // add browser data
        browserData.push({
            name: bdatas[i],
            y: ydatas[i].y,
            color: ydatas[i].color
        });

        // add version data
        for (var j = 0; j < ydatas[i].drilldown.data.length; j++) {
            var brightness = 0.2 - (j / ydatas[i].drilldown.data.length) / 5 ;
            versionsData.push({
                name: ydatas[i].drilldown.categories[j],
                y: ydatas[i].drilldown.data[j],
                color: Highcharts.Color(ydatas[i].color).brighten(brightness).get()
            });
        }
    }
    drawPieChart();
}

function calcuResult(datas,num){
	var result = {};
	var xdata = [];
	var ydata = {};
	ydata.name="all";
	ydata.data=[];
	var otherall=0;
	var all = 0;
	var nowdata = [];
	for (var int = 0; int < datas.length; int++) {
		var value = parseInt(datas[int].v);
		if(int < num){
			xdata.push(datas[int].k);
			ydata.data.push(value);
			all += value;
			nowdata.push(datas[int]);
		}else{
			otherall += value;
			all += value;
		}
	}
	xdata.push("other");
	ydata.data.push(otherall);
	var tempdata ={};
	tempdata.k = "other";
	tempdata.v=otherall;
	nowdata.push(tempdata);
	result.xdata = xdata;
	result.ydata=[];
	result.ydata.push(ydata);
	result.all = all;
	result.tempdata = tempdata;
	result.nowdata = nowdata;
	return result;
}


function calSecResult(data,num){
	var result = {};
	var xdata = [];
	var ydata = [];
	
	var nowindex = 0;
	var tempdata = [];
	var all = 0;
	
	var secnum = 10;
	
	for (var int = 0; int < data.length; int++) {
		if(xdata.length >= num){
			break;
		}
		var value = parseInt(data[int].v);
		all += value;
		var datas = data[int].k.split(",");
		if(datas[0] == '' || datas[1] == ''){
			continue;
		}
		if(!_.contains(xdata,datas[0])){
			xdata.push(datas[0]);
			nowindex = xdata.length-1;
			var xvalue = [];
			var secv = {};
			secv.name=datas[1];
			secv.value=value;
			xvalue.push(secv)
			tempdata.push(xvalue);
		}else{
			var secv = {};
			secv.name=datas[1];
			secv.value=value;
			tempdata[nowindex].push(secv);
		}
	}
	var basixlist = tempdata[0];
	for (var int = 0; int < basixlist.length; int++) {
		if(ydata.length >= secnum){
			break;
		}
		var ob = {};
		ob.name = basixlist[int].name;
		ob.data = [];
		ob.data.push(basixlist[int].value);
		ydata.push(ob);
	}
	for (var int = 1; int < tempdata.length; int++) {
		var list = tempdata[int];
		for (var j = 0; j < ydata.length; j++) {
			ydata[j].data[int] = findata(list, ydata[j].name);
		}
	}
	
	result.ydata = ydata;
	result.xdata = xdata;
	result.all = all;
	return result;
}

function findata(arr,name){
	for (var int = 0; int < arr.length; int++) {
		if(arr[int].name == name){
			return arr[int].value;
		}
	}
}

function calTabledata(data){
	var result={};
	var xdata=[];
	var ydata=[];
	var temp_xdata = [];
	
	var nowindex = 0;
	for (var i = 0; i < data.length; i++) {
		var value = parseInt(data[i].v);
		var datas = data[i].k.split(",");
		if(datas[0] == "" || datas[1] == ""){
			continue;
		}
		if(!_.contains(temp_xdata,datas[0])){
			xdata.push({name:datas[0]});
			temp_xdata.push(datas[0]);
			nowindex = xdata.length-1;
			var yd = {};
			yd.name=datas[0];
			yd.all = value;
			yd.data = [];
			var ydd = {};
			ydd.name = datas[1];
			ydd.data = value;
			yd.data.push(ydd);
			ydata.push(yd);
		}else{
			ydata[nowindex].data.push({
				name:datas[1],
				data:value
			});
			ydata[nowindex].all += value;
		}
	}
	result.xdata = xdata;
	result.ydata =ydata;
	return result;
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
