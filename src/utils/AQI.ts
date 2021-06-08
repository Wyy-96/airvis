import * as d3 from 'd3';
import axios from "axios"
import store from "@/store";

export function drawAQIMap(ymd: any, hour: any): void {
  // axios({
  //   method: 'get',
  //   url: 'api/getData/getAQIData',
  //   data: ymd + hour,
  // }).then(function (resp) {
  //   Draw(resp.data)
  // });
  // 向后台请求数据
  axios.get("api/getdata/getAQIData", {
    params: {
      ymdh: ymd + hour
    },
  })
    .then(function (resp) {
      Draw(resp.data)
    });


  function Draw(data: any) {
    const divMap = d3.select("#chart")
    const config = {
      width: parseInt(divMap.style("width")) - 2,
      height: parseInt(divMap.style("height")) - 2,
    }
    const svg = divMap.select("div").append("svg")
      .attr("width", config.width)
      .attr("height", config.height)
    const mapG = svg.append("g")

    var projection = d3.geoMercator() //投影
      .center([121, 38])
      .translate([500, 400])
      .scale(500)

    
  }
}