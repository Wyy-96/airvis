import * as d3 from 'd3';
import axios from "axios"
import store from "@/store";

export function drawAQIMap(): void {
  const divMap = d3.select(".MapSVG")
  const config = {
    width: parseInt(divMap.style("width")) - 2,
    height: parseInt(divMap.style("height")) - 2,
  }
  
}