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
      draw(resp.data.china, resp.data.winddata)
    });
  }

  function draw(china: any, winddata: any) {
    echarts.registerMap('china', china, {});
    var COLORS = ["#070093", "#1c3fbf", "#1482e5", "#70b4eb", "#b4e0f3", "#ffffff"];


    
    

    const option = {
      geo: [{
        map: 'china',
        roam: true,
        center: [102, 36],
        zoom: 1.2,
        itemStyle: {
          opacity: 0.5,
          borderColor: echarts.color.modifyHSL('#ffffff'),
          color: echarts.color.modifyHSL('#252725') //echarts.color.modifyHSL('#000000')
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
      series: [
          {
          type: 'lines',
          coordinateSystem: 'geo',
          polyline: true,
          data: winddata,
          lineStyle: {
            color: echarts.color.modifyHSL('#F0F2F559'), //#7EAFF0
            width: 0
          },
          effect: {
            constantSpeed: 20,
            show: true,
            trailLength: 0.7,
            symbolSize: 1.5,
            opacity: 0.4,
          },
          zlevel: 2
        },
      ],
    }
    const chart = echarts.init(document.getElementById('chart') as HTMLElement);
    chart.setOption(option)
  }


  return {
    WindDirection,
  };
}