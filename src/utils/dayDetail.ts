import * as d3 from 'd3';
import axios from "axios"
import store from "@/store";

export function drawDayDetail(): void {
  axios({//格式a
    method: 'get',
    url: 'api/getData/getPatternsData'
  }).then(function (resp) {
    Draw(resp.data)
  });

  function Draw(data: any) {
    const PatternsData = data.PatternsData
    const dayDetailData = data.dayDetailData

    d3.selectAll(".DetailG").remove()
    const svg = d3.select(".dayDetailSVG")
    const config = {
      width: parseInt(svg.style("width")) - 2,
      height: parseInt(svg.style("height")) - 2,
    }

    drawDetail()
    // drawPatterns()


    function drawDetail() {
      var root = (d: any) => {
        const root = d3.hierarchy(d);
        return d3.tree()(root);
      }
      var dataLength = dayDetailData.length
      var linktest = d3.linkHorizontal()
        .x((d: any) => (d.data.start_time) * hour_x)
        .y((d: any) => d.y * 12 + d.x * 19)

      var color = d3.schemeCategory10;
      var hour_x = config.width / 24;

      dayDetailData.forEach((element:any) => {
        let key = Object.keys(element)
        if(key.includes("children") == true){
          dataLength += element["children"].length
        }
      });

      var treeMap = svg.append("g")
        .attr("class","DetailG")
        .selectAll("g")
        .data(dayDetailData)
        .join("g")
        .attr("class", (d: any, i) => "g" + d.id)
        .attr("stroke", "white")
        .attr("transform", (d, i) => `translate(${hour_x / 2},${ (config.height / dataLength) * i})`);

      var link = treeMap.selectAll("path")
        .data((d) => root(d).links())
        .join("path")
        .attr("class", "link")
        .attr("d", (d: any) => {
          return linktest(d)
        })
        .attr("stroke-width",0.5)
        .attr("opacity",0.9);

      var node = treeMap.selectAll("g")
        .data((d) => root(d).descendants())
        .join("g")
        .attr("class", "node")
        .attr("transform", (d: any) => {
          return `translate(${(d.data.start_time) * hour_x},${d.y * 12 + d.x * 19})`
        });

      node.append("circle")
        .attr("fill", (d: any) => d.data.pattern == -1 ? "#999" : color[d.data.pattern])
        .attr("r", 2.5);

      node.append("line")
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", (d: any) => d.data.duration * hour_x)
        .attr("y2", 0)
        .attr("stroke", (d: any) => d.data.pattern == -1 ? "#999" : color[d.data.pattern])
        .attr("stroke-width", "1.5px")
      .attr("transform", (d, i) => `translate(0,${0})`)

    }

    function drawPatterns() {
      var color = d3.schemeCategory10;
      var patternType = [{ name: "pattern_1" }, { name: "pattern_2" }, { name: "pattern_3" }, { name: "pattern_4" },
      { name: "pattern_5" }, { name: "pattern_6" }]

      var xScale = d3.scaleLinear()
        .domain([0, 23])
        .range([0, config.width]);

      var yScale = d3.scaleLinear()
        .domain([25, 0])
        .range([0, config.height]);

      //画a折线
      var alinePath = d3.line() //d3线段生成器
        .x((d: any) => xScale(d.hour))
        .y((d: any) => yScale(d.value));

      var gpath = svg.append("g").selectAll("g")
        .data(PatternsData)
        .join("g")

      gpath.append("path")
        .attr("d", (d: any) => alinePath(d.pattern))
        .attr("stroke", (d, i) => color[i])
        .attr("stroke-width", "1px")
        .attr("fill", "none")
        .attr("transform", "translate(25,0)");
    }
  }
}