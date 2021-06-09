<template>
  <div class="MapSVG">
    
    <div id="map"></div>
    <div id="chart"></div>
    <div id="flag"></div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, watch} from "vue";
import { WindDirection } from "@/utils/drawWindDirection";
import { drawAQIMap } from '@/utils/AQI'
import { drawGeoMap } from '@/utils/drawGeoMap';
import * as d3 from "d3"
import axios from "axios";
import store from "@/store";
export default defineComponent({
  name: "MapSVG",
  setup() {
    const Hour = computed(() => store.getters.selectedTime);
    watch(Hour, () => {
      d3.select("#flag").select("svg").remove()
      d3.select("#chart").select("div").select("svg").remove()
      const ymd = store.getters.selectedYMD
      WindDirection(ymd,Hour.value[0]);
      drawAQIMap(ymd,Hour.value[0]);
     
    });
    return {
    };
  },
  mounted() {
    this.$nextTick(function () {
      drawGeoMap()
    });
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.MapSVG {
  width: 1000px;
  height: 650px;
  border: 1px solid #CCCCCC;
  float: left;
}

button {
  width: 50px;
  height: 30px;
}

#chart {
  width: 900px;
  height: 100%;
}
#map{
  position absolute;
  left 300
  top 0
  width: 900px;
  height: 650px;
}
#flag{
  position absolute;
  left 280
  top 0
  width: 900px;
  height: 650px;
}
</style>