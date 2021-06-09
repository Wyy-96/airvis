/**
* @param state 响应式对象
* @param emit  触发事件
*/
import * as echarts from 'echarts';
import axios from "axios";
import store from "@/store";
import * as d3 from "d3"

export function WindDirection(ymd: any, hour: any) {

  // 添加一个选项卡
  if(hour.length < 2){
    hour = '0' +hour
  }
  console.log(ymd + hour)
  axios.get("api/getData/getWindData", {
    params: {
      ymdh: ymd + hour
    },
  })
    .then(function (resp) {
      draw(resp.data.china, resp.data.winddata)
      if( d3.selectAll("canvas").data().length == 2 ){
        d3.select("canvas").remove()
      }
    });
  
  



  function draw(china: any, winddata: any) {
    console.log(china,winddata)
    echarts.registerMap('china', china, {});

    const option = {
      geo: [{
        map: 'china',
        roam: true,
        center: [102, 36],
        zoom: 1.2,
        itemStyle: {
          opacity: 0,
          borderColor: echarts.color.modifyHSL('#ffffff'),
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
            color: echarts.color.modifyHSL('#FDFDFD'), //#7EAFF0
            width: 0
          },
          effect: {
            constantSpeed: 20,
            show: true,
            trailLength: 0.7,
            symbolSize: 1.5,
            opacity: 1,
          },
          zlevel: 2
        },
      ],
    }
    let div = document.getElementById('chart')
    if (div != null) {
      const chart = echarts.init(div);
      chart.setOption(option)
    }

  }
}