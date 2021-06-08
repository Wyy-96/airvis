import * as d3 from 'd3';
import axios from "axios"
import store from "@/store";

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
      width: parseInt(divMap.style("width")) - 2,
      height: parseInt(divMap.style("height")) - 2,
    }

    const MinMaxValue = MaxMin(data)
    const OpacityLinear = d3.scaleLinear()
      .domain(MinMaxValue[0])
      .range([0.2, 1])
    const scaleX = d3.scaleQuantize()
      .domain([0, 500]) // 连续的
      .range([0, 1, 2, 3, 4]); // 离散的
    const Points = ["0,0 2,2 1,1 0,2 2,0", "0,0 4,4 2,2 0,4 4,0", "0,0 6,6 3,3 0,6 6,0", "0,0 8,8 4,4 0,8 8,0", "0,0 10,10 5,5 0,10 10,0"]  //MinMaxValue[1]
    const LinePoints = [[2, 1], [4, 2], [6, 3], [8, 4], [10, 5]]

    var svg = divMap.append("svg")
      .attr("width", config.width)
      .attr("height", config.height);


    const backgroundColor = ["#E25B45", "#516CA9", "#FF8357", "#89D5C9", "#FAC172", "#ADC965"]
    svg.append("g")
      .selectAll("rect")
      .data(data)
      .join("rect")
      .attr("height", config.height / 6 - 2)
      .attr("width", config.width)
      .attr("transform", (d, i) => `translate(0,${config.height / 6 * i + i * 0.8})`)
      .attr("fill", "none");

    var yearRect = svg.append("g").selectAll("g")
      .data(data)
      .join("g")
      .attr("stroke", (d, i) => backgroundColor[i]) //
      .attr("transform", (d, i) => `translate(0,${config.height / 6 * i + i * 0.8})`)

    var dayRect = yearRect.selectAll("g")
      .data((d: any) => d)
      .join("g")
      .attr("fill", "none")
      .attr("transform", (d, i) => `translate(${config.width / 31 * i},0)`)

    var y_stack = 0.4; //每个叉与前一个叉的y轴上的位移的参数
    var x_stack = config.width / 31 / 24

    dayRect.selectAll("polyline")
      .data((d: any) => d.data)
      .join("polyline")
      .attr("fill", "none")
      .attr("points", (d: any, i) => Points[scaleX(d.num)])
      // .attr("stroke", "white")
      .attr("transform", (d: any, i) => `translate(${x_stack * getTail(d.start)},${i * y_stack})`)
      .attr("opacity", (d: any, i) => OpacityLinear(d.aqi))  //(d:any,i)=> Opacity(d.aqi)

    dayRect.selectAll("line")
      .data((d: any) => d.data)
      .join("line")
      .attr("x1", (d: any, i) => LinePoints[scaleX(d.num)][0] * 0.8)
      .attr("y1", (d: any, i) => LinePoints[scaleX(d.num)][1])
      .attr("x2", (d: any) => (d.duration / 24) * 4 + LinePoints[scaleX(d.num)][0])
      .attr("y2", (d: any, i) => LinePoints[scaleX(d.num)][1])
      .attr("stroke-width", 0.5)
      // .attr("stroke", "white")
      .attr("transform", (d: any, i) => `translate(${x_stack * getTail(d.start)},${i * y_stack})`)
    // .attr("opacity", (d: any, i) => OpacityLinear(d.aqi))

    yearRect.selectAll("rect")
      .data((d: any) => d)
      .join("rect")
      .attr("height", config.height / 6 - 2)
      .attr("width", config.width / 31 - 1)
      .attr("x", (d, i) => config.width / 31 * i)
      .attr("id", (d: any, i) => d.day)
      .attr("class", "dayRect")
      .attr("stroke", "none") //#3D3C3C
      .attr("fill", "#ffffff")
      .attr("opacity", 0.05)
      .on("click", function (d, i) {
        RemovehightLight()
        d3.select(this).attr("class", "active").attr("opacity", 0.3)
        store.commit("timeLineData/SET_SELECTED_DATA",d3.select(this).data())  //SET_SELECTED_Y_M_D
        let Y_M_D:any = d3.select(this).data()[0]
        store.commit("timeLineData/SET_SELECTED_Y_M_D",Y_M_D.day)
        console.log(store.getters.selectedYMD)
      }).on("mouseover", function (d, i) {
        d3.select(this).attr("opacity", 0.2);
        store.commit("timeLineData/SET_NOW_DATA",d3.select(this).data())
      })
      .on("mouseout", function (d, i) {
        d3.select(this).attr("opacity", 0.05);
        store.commit("timeLineData/SET_NOW_DATA","")
        var series = d3.selectAll('.active')
        if (series != null) series.attr("opacity", 0.3)
      })

    function getTail(d: string) {
      let n = parseInt(d.substring(d.length - 2))
      return n
    }

    function MaxMin(d: any) {
      let max = -1, min = 99999;
      let numMax = -1, numMin = 9999999;
      d.forEach((element: any) => {
        element.forEach((el: any) => {
          el.data.forEach((e: any) => {
            let aqi = e.aqi
            let num = e.num
            if (aqi < min) min = aqi;
            else if (aqi > max) max = aqi;

            if (num < numMin) numMin = num
            else if (num > numMax) numMax = num
          });
        });
      });
      return [[min, max], [numMin, numMax]]
    }

    function RemovehightLight() {
      var series = d3.selectAll('.active')
      if (series != null) series.attr("class", 'dayRect').attr("opacity", 0.05)

    }


  }

}