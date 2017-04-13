/**
 * New node file
 */
function drawColumnStacked() {
		$('#columnStacked').highcharts('destory');
        $('#columnStacked').highcharts({
            chart: {
                type: 'column'
            },
            title: {
                text: title
            },
            xAxis: {
                categories: xdata
            },
            yAxis: {
                min: 0,
                title: {
                    text: ''
                },
                stackLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold',
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                    }
                }
            },
            legend: {
                align: 'right',
                x: -70,
                verticalAlign: 'top',
                y: 20,
                floating: true,
                backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColorSolid) || 'white',
                borderColor: '#CCC',
                borderWidth: 1,
                shadow: false
            },
            tooltip: {
                formatter: function() {
                    return '<b>'+ this.x +'</b><br/>'+
                        this.series.name +': '+ this.y +'<br/>'+
                        'Total: '+ this.point.stackTotal;
                }
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: true,
                        color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                    }
                }
            },
            series: ydata
        });
    }

function drawPieChart(){
	 $('#columnStacked').highcharts({
         chart: {
             type: 'pie'
         },
         title: {
             text: title
         },
         yAxis: {
             title: {
                 text: title
             }
         },
         plotOptions: {
             pie: {
                 shadow: false,
                 center: ['50%', '50%']
             }
         },
         tooltip: {
     	    valueSuffix: ''
         },
         series: [{
             name: 'Browsers',
             data: browserData,
             size: '100%',
             dataLabels: {
                 formatter: function() {
                     return this.y > 5 ? this.point.name : null;
                 },
                 color: 'white',
                 distance: -30
             }
         }, {
             name: 'Versions',
             data: versionsData,
             size: '120%',
             innerSize: '100%',
             dataLabels: {
                 formatter: function() {
                     // display only if larger than 1
                     return this.y > 1 ? '<b>'+ this.point.name +':</b> '+ this.y +'%'  : null;
                 }
             }
         }]
     });
}

function drawLine(){
	$('#columnStacked').highcharts({
        title: {
            text: title,
            x: -20 //center
        },
        subtitle: {
            text:'',
            x: -20
        },
        xAxis: {
            categories: xdata
        },
        yAxis: {
            title: {
                text: 'number'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: ''
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: ydata
    });
}