import * as d3 from 'd3';
import axios from "axios"
import store from "@/store";

export function drawAQIMap(data:any): void {
  const divMap = d3.select("#chart")
  const config = {
    width: parseInt(divMap.style("width")) - 2,
    height: parseInt(divMap.style("height")) - 2,
  }
  console.log(data)
}