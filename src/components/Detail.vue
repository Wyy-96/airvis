<template>
  <div class="Detail">
    <div class="Pie"></div>
    <div class="Polyline"></div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, watch} from "vue";
import { drawLineChart } from "@/utils/lineChart";
import { drawPieChart } from '@/utils/Pie'
import store from "@/store";
export default defineComponent({
  name: "MapSVG",
  setup() {
    const flag:any = computed(() => store.getters.flagID);
    watch(flag, () => {
      if(flag != null)
        drawLineChart(flag.value[0],store.getters.selectedYMD);
    });
    const pHour = computed(() => store.getters.pullutionHour);
    watch(pHour, () => {
      if(pHour != null)
        drawPieChart();
    });
    return {
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.Detail{
    width 590px
    height 100%
    border 1px solid #333333
    float left
}
.Polyline {
  width 590px
  height 50%
}
.Pie {
  width 590px
  height 50%
} 
</style>