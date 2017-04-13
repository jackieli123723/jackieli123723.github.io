function Heatmap(poiId) {
    var heatmapOverlay;
    // heatmapOverlay.poiId = poiId;

    return {
        poiId: poiId,

        init: function(data, options) {
            if (!isSupportCanvas()) {
                alert('热力图目前只支持有canvas支持的浏览器,您所使用的浏览器不能使用热力图功能~')
            }

            if(APP.heatmap){
                heatmapOverlay = new BMapLib.HeatmapOverlay(options);
                heatmapOverlay.visible = false;
                map.addOverlay(heatmapOverlay);
            }else{
                heatmapOverlay = APP.heatmap;
            }


            heatmapOverlay.setDataSet({
                data: data,
                max: 100
            });
            heatmapOverlay.show();
        },

        isVisible: function(){
            return heatmapOverlay.visible;
        },

        show: function() {
            // console.log('heatmap show');
            if(!heatmapOverlay.visible){
                heatmapOverlay.show();
                heatmapOverlay.visible = true;
            }
        },

        hide: function() {
            // console.log('heatmap hide');
            if (heatmapOverlay && heatmapOverlay.visible) {
                map.removeOverlay(heatmapOverlay)
                //heatmapOverlay.clear();
              //  heatmapOverlay.hide();
              //  heatmapOverlay.visible = false;
            };
        },

        toggle: function(){
            if (heatmapOverlay.visible) {
                heatmapOverlay.hide();
                heatmapOverlay.visible = false;
            }else{
                heatmapOverlay.show();
                heatmapOverlay.visible = true;
            }
        },

        clear: function() {
            map.clearOverlays();
        }
    }
}

//判断浏览区是否支持canvas
function isSupportCanvas() {
    var elem = document.createElement('canvas');
    return !!(elem.getContext && elem.getContext('2d'));
}

var data = [{
    "lng": 116.418261,
    "lat": 39.921984,
    "count": 90
}, {
    "lng": 116.423332,
    "lat": 39.916532,
    "count": 51
}, {
    "lng": 116.419787,
    "lat": 39.930658,
    "count": 55
}];

// APP.heatmapData = data;
function openHeatmap(poiId) {
    APP.heatmap = Heatmap(poiId);
    // APP.heatmap.poiId = poiId;
    if(APP.heatMapFlag == poiId) {//如果视图不在热力图视口，不再渲染。
        APP.heatmap.init(APP.heatmapData, {
            'radius': 20,
            gradient: {
                // enter n keys between 0 and 1 here
                // for gradient color customization
                '.1': 'white',
                '.3': '#3B6867',
                '.5': '#5CCD64',
                '.7': '#E0FF00',
                '.95': '#FC1C00'
            }
        });
        $(".loading").hide();
        APP.heatmap.show();
    }
}

