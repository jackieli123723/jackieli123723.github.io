/**
 *directionResult.html controller
 */
var xdata;
var ydata;
var browserData;
var versionsData;
function directionResultCtr($scope,$http,$routeParams){
	$scope.target='active';
	$scope.dimension = 'mobile';
	$scope.shownum = 10;
	$scope.all = 0;
	$scope.nowdatas = [];
	$scope.sorcedata=[];
	//col,line
	$scope.drawType = 'col';
	
	$scope.jobdesc = '';
	$http.get("/GetJobDesc?"+"jobid="+$routeParams.jobid).success(function(data){
			$scope.jobdesc = data;
	});
	$scope.getTarget = function(){
		if($scope.target == 'active'){
			return '活跃用户';
		}else if($scope.target == 'increase'){
			return '新增用户';
		}else if($scope.target == 'activetime'){
			return '活跃次数';
		}
	}
	
	$scope.changeTarget = function(data){
		$scope.target = data;
		$http.get("/GetDataCenterData?target="+$scope.target+"&dimension="+$scope.dimension+"&jobid="+$routeParams.jobid).success(function(data){
			$scope.sorcedata = data;
			if($scope.drawType == 'col'){
				result = calcuResultone(data,$scope.shownum);
				xdata = result.xdata;
				ydata = result.ydata;
				$scope.all = result.all;
				$scope.nowdatas = result.nowdata;
				setdataAndDrawone($scope.getTarget(), $scope.getDimension(), result.xdata, result.ydata);
			}else if($scope.drawType == 'pie'){
				setdataAndDrawPieone($scope.getTarget(),$scope.getDimension(),$scope.sorcedata,$scope.shownum);
			}
		});
	}
	
	$scope.getDimension = function(){
		if($scope.dimension == '24hours'){
			return '24小时';
		}else if($scope.dimension == 'day'){
			return '日趋势';
		}else if($scope.dimension == 'week'){
			return '周趋势';
		}else if($scope.dimension == 'month'){
			return '月趋势';
		}else if($scope.dimension == 'mobile'){
			return '品牌分布';
		}else if($scope.dimension == 'model'){
			return '机型分布';
		}else if($scope.dimension == 'pixel'){
			return '分辨率分布';
		}else if($scope.dimension == 'carrier'){
			return '运营商分布';
		}else if($scope.dimension == 'osversion'){
			return '系统分布';
		}else if($scope.dimension == 'country'){
			return '国家分布';
		}else if($scope.dimension == 'province'){
			return '中国地区分布';
		}else if($scope.dimension == 'nettype'){
			return '联网方式分布';
		}
	}
	var title;
	var result;
	$scope.changeDimension = function(data){
		$scope.dimension = data;
		$http.get("/GetDataCenterData?target="+$scope.target+"&dimension="+$scope.dimension+"&jobid="+$routeParams.jobid).success(function(data){
			$scope.sorcedata = data;
			if($scope.drawType == 'col'){
				result = calcuResultone(data,$scope.shownum);
				xdata = result.xdata;
				ydata = result.ydata;
				$scope.all = result.all;
				$scope.nowdatas = result.nowdata;
				setdataAndDrawone($scope.getTarget(), $scope.getDimension(), result.xdata, result.ydata);
			}else if($scope.drawType == 'pie'){
				setdataAndDrawPieone($scope.getTarget(),$scope.getDimension(),$scope.sorcedata,$scope.shownum);
			}
		});
	}
	$http.get("/GetDataCenterData?target="+$scope.target+"&dimension="+$scope.dimension+"&jobid="+$routeParams.jobid).success(function(data){
		$scope.sorcedata = data;
		console.log(data);
		if($scope.drawType == 'col'){
			result = calcuResultone(data,$scope.shownum);
			xdata = result.xdata;
			ydata = result.ydata;
			$scope.all = result.all;
			$scope.nowdatas = result.nowdata;
			setdataAndDrawone($scope.getTarget(), $scope.getDimension(), result.xdata, result.ydata);
		}else if($scope.drawType == 'pie'){
			setdataAndDrawPieone($scope.getTarget(),$scope.getDimension(),$scope.sorcedata,$scope.shownum);
		}
		
	});
	
	$scope.changeShowNum = function(num){
		$scope.shownum = num;
		if($scope.drawType == 'col'){
			result = calcuResultone($scope.sorcedata,$scope.shownum);
			xdata = result.xdata;
			ydata = result.ydata;
			$scope.all = result.all;
			$scope.nowdatas = result.nowdata;
			setdataAndDrawone($scope.getTarget(), $scope.getDimension(), result.xdata, result.ydata);
		}else if($scope.drawType == 'pie'){
			setdataAndDrawPieone($scope.getTarget(),$scope.getDimension(),$scope.sorcedata,$scope.shownum);
		}
	}
	$scope.changeShowType = function(type){
		$scope.drawType = type;
		if($scope.drawType == 'col'){
			result = calcuResultone($scope.sorcedata,$scope.shownum);
			xdata = result.xdata;
			ydata = result.ydata;
			$scope.all = result.all;
			$scope.nowdatas = result.nowdata;
			setdataAndDrawone($scope.getTarget(), $scope.getDimension(), result.xdata, result.ydata);
		}else if($scope.drawType == 'pie'){
			setdataAndDrawPieone($scope.getTarget(),$scope.getDimension(),$scope.sorcedata,$scope.shownum);
		}
	}
}

function setdataAndDrawone(target,dimension,xdata,ydata){
	title= target+"-"+dimension;
	drawColumnStacked();
}

function setdataAndDrawPieone(target,dimension,data,shownum){
	title = target+"-"+dimension;
	var colors = Highcharts.getOptions().colors;
	var bdatas = [];
	var otherdata = 0;
	for(var i = 0; i < data.length;i++){
		if(i < shownum){
			bdatas.push({name:data[i].name,y:data[i].value,color:colors[i]})
		}else{
			otherdata += data[i].value;
		}
	}
	bdatas.push({name:'other',y:otherdata,color:colors[data.length]});
	browserData = bdatas;
	drawPieChart();
}

function calcuResultone(datas,num){
	var result = {};
	var xdata = [];
	var ydata = {};
	ydata.name="all";
	ydata.data=[];
	var otherall=0;
	var all = 0;
	var nowdata = [];
	for (var int = 0; int < datas.length; int++) {
		if(int < num){
			xdata.push(datas[int].name);
			ydata.data.push(datas[int].value);
			all += datas[int].value;
			nowdata.push(datas[int]);
		}else{
			otherall += datas[int].value;
			all += datas[int].value;
		}
	}
	xdata.push("other");
	ydata.data.push(otherall);
	var tempdata ={};
	tempdata.name = "other";
	tempdata.value=otherall;
	nowdata.push(tempdata);
	result.xdata = xdata;
	result.ydata=[];
	result.ydata.push(ydata);
	result.all = all;
	result.tempdata = tempdata;
	result.nowdata = nowdata;
	return result;
}

