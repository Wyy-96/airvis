<template>
  <div class="TimeLine">
    <div class="dayDetail"></div>
    <!-- <div class="selectTime"></div> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, watch } from "vue";
import { drawEnlargeTimeLine } from "@/utils/enlargeTimeOver";
import { drawDayDetail } from "@/utils/dayDetail";
import store from "@/store";
import * as d3 from "d3";
export default defineComponent({
  name: "TimeLine",
  setup() {
    const timeLineOver = computed(() => store.getters.selectedData);
    watch(timeLineOver, () => {
      drawDayDetail();
    });

    const enlargeTime = computed(() => store.getters.nowData);
    watch(enlargeTime, () => {
      if (enlargeTime.value[0] != undefined){
        drawEnlargeTimeLine(enlargeTime.value[0]);
        d3.select(".DetailG").attr("opacity",0.1)
      }
      else {
        d3.select(".DetailG").attr("opacity",1)
        d3.select(".enlarge").remove()};
    });
    return {
      enlargeTime,
    };
  },
  mounted() {
    this.addSVG();
  },
  methods: {
    addSVG() {
      const divMap = d3.select(".dayDetail");
      const config = {
        width: parseInt(divMap.style("width")) - 5,
        height: parseInt(divMap.style("height")) - 5,
      };
      divMap
        .append("svg")
        .attr("class","dayDetailSVG")
        .attr("width", config.width)
        .attr("height", config.height);
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.TimeLine {
  width: 100%;
  height: 165px;
  border-bottom: 1px solid #313131;
  margin-bottom: 5px;
}

.dayDetail {
  width: 100%;
  height: 100%;
  float: left;
}
</style>