/**
* @param state 响应式对象
* @param emit  触发事件
*/
import * as echarts from 'echarts';
import axios from "axios"

export function DrawWind() {

  // 添加一个选项卡
  function WindDirection() {
    axios({//格式a
      method: 'get',
      url: 'api/getData/getWindData'
    }).then(function (resp) {
      draw(resp.data.china, resp.data.winddata, resp.data.records)
    });
  }

  function draw(china: any, winddata: any, data: any) {
    echarts.registerMap('china', china, {});
    console.log(data)
    var COLORS = ["#070093", "#1c3fbf", "#1482e5", "#70b4eb", "#b4e0f3", "#ffffff"];


    
    

    const option = {
      geo: [{
        map: 'china',
        roam: true,
        center: [102, 36],
        zoom: 1.2,
        zlevel: 1,
        itemStyle: {
          opacity: 1,
          borderColor: echarts.color.modifyHSL('#ffffff'),
          color: echarts.color.modifyHSL('#FDFFFD') //echarts.color.modifyHSL('#000000')
        },
        regions: [
          {
            name: "南海诸岛",
            value: 0,
            itemStyle: {
              opacity: 0,
              label: {
                show: false
              }
            }
          }
        ]
      }],
      visualMap: {
        min: 0,
        max: 400,
        show:true,
        seriesIndex: 0,
        color: ["rgba(28,28,28,1)","rgba(139,0,0,1)","rgba(160,32,240,1)","rgba(255,0,0,1)",
        "rgba(255,165,0,1)","rgba(255,255,0,1)","rgba(0,255,0,1)"]
      },
      series: [
        {
          type: 'heatmap',
          coordinateSystem: 'geo',
          data: data,
          animation: false,
          encode: {
            tooltip: 2
          },
          pointSize: 2,
          blurSize: 3,
          zlevel: 3,
          opacity: 1,
        },
        //   {
        //   type: 'lines',
        //   coordinateSystem: 'geo',
        //   polyline: true,
        //   data: winddata,
        //   lineStyle: {
        //     color: echarts.color.modifyHSL('#F0F2F559'), //#7EAFF0
        //     width: 0
        //   },
        //   effect: {
        //     constantSpeed: 20,
        //     show: true,
        //     trailLength: 0.7,
        //     symbolSize: 1.5,
        //     opacity: 0.4,
        //   },
        //   zlevel: 2
        // },
      ],
    }
    const chart = echarts.init(document.getElementById('chart') as HTMLElement);
    chart.setOption(option)
  }


  return {
    WindDirection,
  };
}