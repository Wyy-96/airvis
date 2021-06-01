import * as d3 from 'd3';
import axios from "axios"

export function drawLineOverview(): void {
  axios({//格式a
    method: 'get',
    url: 'api/getData/getLineOverData'
  }).then(function (resp) {
    Draw(resp.data.LineOverData)
  });

  function Draw(data: any) {
    const divMap = d3.select(".TimeOverview")
    const config = {
      width: parseInt(divMap.style("width")),
      height: parseInt(divMap.style("height")),
    }
    console.log(data)
    var svg = divMap.append("svg")
      .attr("width", config.width)
      .attr("height", config.height);

    var rect = svg.append("g").selectAll("rect")
      .data(data)
      .join("rect")
      .attr("class", (d: any) => "day" + d.day)
      .attr("height", config.height)
      .attr("width", config.width / 186)
      .attr("x", (d, i) => config.width / 31 / 6 * i)
      .attr("fill", (d, i) => "#000000");
    var y_stack = 0.65; //每个叉与前一个叉的y轴上的位移的参数
    var day = svg.selectAll("g")
      .data(data)
      .join("g")
      .attr("transform", (d, i) => `translate(${config.width / 31 / 6 * i},0)`);
    day.selectAll("polyline")
      .data((d:any) => d.data)
      .join("polyline")
      .attr("points", "0,0 7.5,10 3.75,5 0,10 7.5,0 3.75,5")
      .attr("stroke", "white")
      .attr("transform", (d:any, i) => `translate(0,${y_stack * d.id})`)
    day.selectAll("line")
      .data((d:any) => d.data)
      .join("line")
      .attr("x1", 7.5)
      .attr("y1", 5)
      .attr("x2", (d:any) => (d.duration / 24) * 7.5 + 3.75)
      .attr("y2", 5)
      .attr("stroke", "white")
      .attr("transform", (d:any, i) => `translate(0,${y_stack * d.id})`)
  }


}