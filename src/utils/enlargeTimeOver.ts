import * as d3 from 'd3';

export function drawEnlargeTimeLine(data: any): void {
  const svg = d3.select(".dayDetailSVG")
  const config = {
    width: parseInt(svg.style("width")),
    height: parseInt(svg.style("height")),
  }
  d3.selectAll(".enlarge").remove()
  const polylineData = data.data
  const polylineYear = data.day.substring(0, 4)

  const MinMaxValue = MaxMin(polylineData)
  const OpacityLinear = d3.scaleLinear()
    .domain(MinMaxValue)
    .range([0.3, 1])
  const scaleX = d3.scaleQuantize()
    .domain([0, 500]) // 连续的
    .range([0, 1, 2, 3, 4]); // 离散的
  const Points = ["0,0 4,4 2,2 0,4 4,0", "0,0 8,8 4,4 0,8 8,0", "0,0 12,12 6,6 0,12 12,0", "0,0 16,16 8,8 0,16 16,0", "0,0 20,20 10,10 0,20 20,0"]  //MinMaxValue[1]
  const LinePoints = [[4, 1], [8, 4], [12, 6], [16, 8], [20, 10]]

  const backgroundColor = ["#E25B45", "#516CA9", "#FF8357", "#89D5C9", "#FAC172", "#ADC965"]
  const years = ["2013", "2014", "2015", "2016", "2017", "2018"]
  var y_stack = (config.height - 10) / polylineData.length; //每个叉与前一个叉的y轴上的位移的参数
  var x_stack = config.width / 24

  svg.insert("g",".DetailG").attr("stroke", backgroundColor[years.indexOf(polylineYear)])
    .attr("class", "enlarge")
    .selectAll("polyline")
    .data(polylineData)
    .join("polyline")
    .attr("fill", "none")
    .attr("points", (d: any, i) => Points[scaleX(d.num)])
    .attr("transform", (d: any, i) => `translate(${x_stack * getTail(d.start) + x_stack /2 + (scaleX(d.num) -2) * -2},${i * y_stack})`)
    .attr("opacity", (d: any, i) => OpacityLinear(d.aqi))  //(d:any,i)=> Opacity(d.aqi)

  svg.select("g").selectAll("line")
    .data(polylineData)
    .join("line")
    .attr("x1", (d: any, i) => LinePoints[scaleX(d.num)][0] * 0.8)
    .attr("y1", (d: any, i) => LinePoints[scaleX(d.num)][1])
    .attr("x2", (d: any) => (d.duration / 24) * x_stack + LinePoints[scaleX(d.num)][0])
    .attr("y2", (d: any, i) => LinePoints[scaleX(d.num)][1])
    .attr("stroke-width", 0.5)
    // .attr("stroke", "white")
    .attr("transform", (d: any, i) => `translate(${x_stack * getTail(d.start) + x_stack /2 + (scaleX(d.num) -2) * -2},${i * y_stack})`)
  // .attr("opacity", (d: any, i) => OpacityLinear(d.aqi))

  function MaxMin(d: any) {
    let max = -1, min = 99999;
    d.forEach((element: any) => {
      let aqi = element.aqi
      if (aqi < min) min = aqi;
      else if (aqi > max) max = aqi;
    });
    return [min, max]
  }
  function getTail(d: string) {
    let n = parseInt(d.substring(d.length - 2))
    return n
  }
}