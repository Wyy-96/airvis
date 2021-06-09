import * as d3 from 'd3';
import axios from "axios"
import store from "@/store";
import { packSiblings } from 'd3';

export function drawPatternMap(ymd: any): void {
  // 向后台请求数据
  axios.get("api/getdata/getPatternMap", {
    params: {
      ymd: store.getters.selectedYMD
    },
  })
    .then(function (resp) {
      Draw(resp.data.patterndata)
    });


  function Draw(data: any) {
    d3.select('.Detail').select('.patternmap').remove()
    const divMap = d3.select(".Detail")
    const config = {
      width: parseInt(divMap.style("width")) - 2,
      height: parseInt(divMap.style("height")) - 2,
    }
    const svg = divMap.append("svg") //select("div").
      .attr("width", config.width)
      .attr("height", 350)
      .attr("class","patternmap")

    const mapG = svg.append("g")
      .attr("class", "Pattern")
      //.style("transform", "scale(1,1.07)")

    const projection = d3.geoMercator() //投影
      .center([102, 36])
      .translate([300, 200])
      .scale(400);

    //const colorIndex = d3.scaleLinear([0, 50, 100, 150, 200, 300, 501], ["#5BD665", "#F7F452", "#FD9813", "#F5461A", "#7E0303", "#330101", "#130000"])
    const color = d3.schemeCategory10;

    //const color = ["#5BD665", "#F7F452", "#FD9813", "#F5461A", "#7E0303", "#330101", "#130000"]
    const location = mapG.selectAll(".location")   //根据经纬度坐标coor的位置添加g元素
      .data(data)
      .join("g")
      .attr("class", "location")
      .attr("transform", function (d: any) {
        //计算标注点的位置
        const coor: any = projection([d["lon"], d["lat"]]);
        return "translate(" + coor[0] + "," + coor[1] + ")";
      });

    location.append("rect")   //在g元素中加一个rect，调整合适的角度位置
      .attr("width", 1.6)
      .attr("height", 1.6)
      .attr("transform", `rotate(${0}) translate(-0.8,-0.8)`)
      //.attr("fill", (d: any) => colorIndex(parseFloat(d["Pattern"])))
      .attr("fill", function (d:any) {
        if (d.second_pattern == -1) {
            // 筛掉
            return "rgba(255,255,255,0.1)"
        } else {
            return color[d.second_pattern]
        }
    })
  }

 
}