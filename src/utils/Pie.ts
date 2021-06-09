import * as d3 from 'd3';
import axios from "axios";
import store from "@/store";

export function drawPieChart(): void {
  const pollution = store.getters.pullution
  const pHour = store.getters.pullutionHour

  drawPie(pollution)
  function drawPie(data: any) {
    d3.select(".Pie").select("svg").remove()
    const divMap = d3.select(".Pie")
    const config = {
      width: parseInt(divMap.style("width")) - 2,
      height: parseInt(divMap.style("height")) - 2,
    }

    const test: any = [-config.height, -config.height / 2, config.height * 2.1, config.height * 2.1]
    const svg = divMap.append("svg")
      .attr("viewBox", test);

    // 计算目标数据的弧形数据
    const pie = d3.pie()
      .sort(null)
      .value((d: any) => d.value)

    const arcs = pie(data[pHour])

    console.log(arcs)
    // 饼图的内外半径路径计算
    const arc: any = d3.arc()
      .innerRadius(0)
      .outerRadius(Math.min(config.width, config.height) / 2 - 1)  //data[pHour].map((d:any) => d.name)

    //颜色比例尺
    const color: any = d3.scaleOrdinal()
      .domain(Object.values(data[pHour]))
      .range(d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), data[pHour].length).reverse())

    svg.append("g")
      .attr("stroke", "white")
      .selectAll("path")
      .data(arcs)
      .join("path")
      .attr("fill", (d: any) => color(d.data.name))
      .attr("d", arc)
      .append("title")
      .text((d: any) => `${d.data.name}: ${d.data.value.toLocaleString()}`);


    const radius = Math.min(config.width, config.height) / 2 * 0.8;
    const arcLabel = d3.arc().innerRadius(radius).outerRadius(radius);

    svg.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 18)
      .attr("text-anchor", "middle")
      .selectAll("text")
      .data(arcs)
      .join("text")
      .attr("transform", (d:any) => `translate(${arcLabel.centroid(d)})`)
      .call(text => text.append("tspan")
        .attr("y", "-0.4em")
        .attr("font-weight", "bold")
        .text((d:any) => d.data.name))
      .call(text => text.filter(d => (d.endAngle - d.startAngle) > 0.25).append("tspan")
        .attr("x", 0)
        .attr("y", "0.7em")
        .attr("fill-opacity", 0.7)
        .text((d:any) => d.data.value.toLocaleString()));
  }
}