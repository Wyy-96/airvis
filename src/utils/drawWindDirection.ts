/**
* @param state 响应式对象
* @param emit  触发事件
*/
// import echarts from "echarts";
import axios from "axios"
export function DrawWind() {

  // 添加一个选项卡
  function WindDirection() {
    console.log("ok")
    axios({//格式a
      method: 'get',
      url: 'api/getData/getWindData'
    }).then(function (resp) {
      console.log(resp.data);
    }).catch(resp => {
      console.log('请求失败：' + resp.status + ',' + resp.statusText);
    });
    // const option = {
    //   geo: [{
    //       map: 'china',
    //       roam: true,
    //       center: [121, 38],
    //       zoom:5,
    //   }],
    //   series: [{
    //       type: 'lines',
    //       coordinateSystem: 'geo',
    //       polyline: true,
    //       data: drawdata,
    //       silent: true,
    //       lineStyle: {
    //           // color: '#c23531',
    //           // color: 'rgb(200, 35, 45)',
    //           opacity: 0,
    //           width: 2
    //       },
    //       progressiveThreshold: 500,
    //       progressive: 200
    //   }, {
    //       type: 'lines',
    //       coordinateSystem: 'geo',
    //       polyline: true,
    //       data: drawdata,
    //       lineStyle: {
    //           width: 0
    //       },
    //       effect: {
    //           constantSpeed: 20,
    //           show: true,
    //           trailLength: 0.8,
    //           symbolSize: 1.5
    //       },
    //       zlevel: 1
    //   }]
    // }
    // const chart = echarts.init(document.getElementById('chart') as HTMLDivElement);
    // chart.setOption(option)
  }


  return {
    WindDirection,
  };
}