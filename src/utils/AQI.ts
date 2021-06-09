import * as d3 from 'd3';
import axios from "axios"
import store from "@/store";
import { packSiblings } from 'd3';

export function drawAQIMap(ymd: any, hour: any): void {
  // 向后台请求数据
  if(hour.length < 2){
    hour = '0' +hour
  }
  axios.get("api/getdata/getAQIData", {
    params: {
      ymdh: ymd + hour
    },
  })
    .then(function (resp) {
      Draw(resp.data.aqiList)
      drawFlag(resp.data.flag)
    });


  function Draw(data: any) {
    const divMap = d3.select("#chart")
    const config = {
      width: parseInt(divMap.style("width")) - 2,
      height: parseInt(divMap.style("height")) - 2,
    }
    const svg = divMap.select("div").append("svg") //select("div").
      .attr("width", config.width)
      .attr("height", config.height)

    const mapG = svg.append("g")
      .attr("class", "AQI")
      .style("transform", "scale(1,1.07)")

    var projection = d3.geoMercator() //投影
      .center([102, 36])
      .translate([450, 315])
      .scale(750);

    var colorIndex = d3.scaleLinear([0, 50, 100, 150, 200, 300, 501], ["#5BD665", "#F7F452", "#FD9813", "#F5461A", "#7E0303", "#330101", "#130000"])


    const color = ["#5BD665", "#F7F452", "#FD9813", "#F5461A", "#7E0303", "#330101", "#130000"]
    var location = mapG.selectAll(".location")   //根据经纬度坐标coor的位置添加g元素
      .data(data)
      .join("g")
      .attr("class", "location")
      .attr("transform", function (d: any) {
        //计算标注点的位置
        var coor: any = projection([d["lon"], d["lat"]]);
        return "translate(" + coor[0] + "," + coor[1] + ")";
      });

    location.append("rect")   //在g元素中加一个rect，调整合适的角度位置
      .attr("width", 1.6)
      .attr("height", 1.6)
      .attr("transform", `rotate(${0}) translate(-0.8,-0.8)`)
      .attr("fill", (d: any) => colorIndex(parseFloat(d["AQI"])))

  }

  function drawFlag(data: any) {
    var projection = d3.geoMercator() //投影
      .center([102, 36])
      .translate([450, 315])
      .scale(750);

    const mapG = d3.select("#flag")
    .append("svg")
    .attr("width",848)
    .attr("height",648)
    .append("g").style("transform", "scale(1,1.07)")

    mapG.selectAll(".flag")
      .data(data)
      .join("g")
      .attr("class", "flag")
      .attr("id", (d: any, i) => i)
      .attr("transform", (d: any, i) => {
        let scaleXY = projection([d.lon, d.lat])

        if (scaleXY != null){
          scaleXY[0] = scaleXY[0] - 25
          scaleXY[1] = scaleXY[1] + 10
          return "translate(" + scaleXY[0] + "," + scaleXY[1] + ")"
        }
        return null
      })
      .append("polygon")     //画一个旗帜
      .attr("points", "0,-28 20,-20 0,-8 0,-28")
      .attr("stroke", "#999")
      .attr("fill", (d:any,i) => d.pattern == -1 ? "#999" : d3.schemeCategory10[d.pattern])
      .on("click",function(event,d){
        let  data:any = d3.select(this).data()[0]
        if( data != null)
          var flagid = data["id"]
          var pattern = data["pattern"]
          store.commit('timeLineData/SET_FLAG_ID',[flagid,pattern])
      })

    d3.selectAll(".flag").append("polygon")     //画一个黑旗杆
      .attr("points", "0,0 0,-30 2,-30 2,0 0,0")
      .attr("stroke", "#A0522D")
      .attr("fill", "#A0522D")

  }
}