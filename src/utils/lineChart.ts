import * as d3 from 'd3';
import axios from "axios";
import store from "@/store";

export function drawLineChart(data: any, ymd: any): void {
  axios({//格式a
    method: 'get',
    url: 'api/getData/getFlagDetail',
    params: {
      flagid: store.getters.flagID,
      ymd: ymd
    },
  }).then(function (resp) {
    drawlinechart(resp.data.actualAQI, resp.data.patternAQI, resp.data.pattern);
    store.commit('timeLineData/SET_PULLUTION', resp.data.pollution)
    store.commit('timeLineData/SET_PULLUTION_HOUR', 0)
  });
  const strokewidth = '1px';
  const height = 300,
    width = 600,
    margin = 30;

  const drawlinechart = (actualAQI: any, patternAQI: any, pattern: any) => {
    d3.select('.Polyline').select('.linechart').remove()
    const actual_data = actualAQI
    const data = patternAQI

    const xScale = d3.scaleLinear()
      .domain([0, 23])
      .range([margin, width - margin]);

    const maxValue_actual = actual_data.max
    const minValue_actual = actual_data.min

    const dataarr = new Array();
    for (let i = 0; i < data.pattern.length; i++) {
      dataarr.push((data.pattern)[i].value);
    }

    const maxValue = Math.max.apply(null, dataarr);
    const minValue = Math.min.apply(null, dataarr);
    // console.log(maxValue, minValue);

    const yScale = d3.scaleLinear()
      .domain([maxValue_actual, minValue_actual])
      .range([0, height - margin]);

    const xAxis = d3.axisBottom(xScale);
    //const yAxis = d3.axisLeft(yScale);

    const svg = d3.select('.Polyline').append('svg').attr('width', width).attr('height', height).attr("class", "linechart")
    svg.append('g')
      .attr("transform", "translate(0," + (height - margin) + ")")
      .attr("class", "axis")
      .call(xAxis)

    const color = d3.schemeCategory10;
    const patternScale = d3.scaleLinear() // 把分解的模式数值映射到实际AQIscale上
      .domain([minValue, maxValue])
      .range([minValue_actual, maxValue_actual])

    const line2 = d3.line() //d3线段生成器
      .x((d: any) => xScale(d.hour))
      .y(function (d: any) {
        return yScale(d.value);
      });
    const line = d3.line() //d3线段生成器
      .x((d: any) => xScale(d.hour))
      .y(function (d: any) {
        //console.log(patternScale(d.value));
        return yScale(patternScale(d.value));
      });

    svg.append("g")
      .attr("class", "gpath2")
      .append("path") // 实际AQI值
      .data([actual_data])
      .join("path")
      .attr("d", (d: any) => {
        return line2(d.data)
      })
      .attr("stroke", color[pattern])
      .attr("stroke-width", strokewidth)
      .attr("fill", "none")
      .attr("transform", "translate(0,0)")
      .style("stroke-dasharray", "5,5")

    svg.append("g")
      .attr("class", "gpath")
      .append("path")
      .data([data])
      .join("path")
      .attr("d", (d: any) => line(d.pattern))
      .attr("stroke", color[pattern])
      .attr("stroke-width", strokewidth)
      .attr("fill", "none")
      .attr("transform", "translate(0,0)");


    var hour = []
    for (let i = 0; i <= 23; i++) {
      hour[i] = i;
    }
    svg.append("g")
      .selectAll("rect")
      .data(hour)
      .join("rect")
      .attr("id", (d:any)=>"timeRect" + d)
      .attr("height", height - 30)
      .attr("width", 2)
      .attr("x", (d, i) => xScale(i))
      .attr("fill", "#DF7410")
      .attr("opacity", 0)

    svg.append("g").selectAll("rect")
      .data(hour)
      .join("rect")
      .attr("class", "timeRect")
      .attr("height", height - 20)
      .attr("width", (width - 40) / 24)
      .attr("x", (d, i) => (width - 40) / 24 * i)
      .attr("fill", "#A1CCE9")
      .attr("transform", "translate(22,0)")
      .attr("opacity", 0)
      .on("click", function (d, i) {
        RemovehightLight()
        let id = d3.select(this).data()[0]
        d3.select("#timeRect" + id).attr("class", "timeRect_active").attr("opacity", 1)
        store.commit("timeLineData/SET_PULLUTION_HOUR", id)

      }).on("mouseover", function (d, i) {
        d3.select(this).attr("opacity", 0.1);
      })
      .on("mouseout", function (d, i) {
        d3.select(this).attr("opacity", 0);
        var series = d3.selectAll('.timeRect_active')
        if (series != null) series.attr("opacity", 1)
      })

    function RemovehightLight() {
      var series = d3.selectAll('.timeRect_active')
      if (series != null) series.attr("class", '').attr("opacity", 0)
    }

  }
}