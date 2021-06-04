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
    const option = {
      geo: [{
        map: 'china',
        roam: true,
        center: [102, 36],
        zoom: 1.2,
        itemStyle: {
          opacity: 1,
          borderColor: echarts.color.modifyHSL('#ffffff'),
          color:echarts.color.modifyHSL('#000000')
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
      series: [{
        type: 'lines',
        coordinateSystem: 'geo',
        polyline: true,
        data: winddata,
        lineStyle: {
          color: echarts.color.modifyHSL('#5A94DF'),
          width: 0
        },
        effect: {
          constantSpeed: 20,
          show: true,
          trailLength: 0.9,
          symbolSize: 1.5
        },
        zlevel: 1
      }]
    }
    const chart = echarts.init(document.getElementById('chart') as HTMLDivElement);
    chart.setOption(option)
  }


  return {
    WindDirection,
  };
}