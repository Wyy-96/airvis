<template>
  <div class="Detail">
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, watch} from "vue";
import { drawLineChart } from "@/utils/lineChart";
import { drawPatternMap } from "@/utils/patternMap";
import axios from "axios";
import store from "@/store";
export default defineComponent({
  name: "MapSVG",
  setup() {
    const flag:any = computed(() => store.getters.flagID);
    watch(flag, () => {
      if(flag != null)
        drawLineChart(flag.value[0],store.getters.selectedYMD);
    });
    const ymd:any = computed(() => store.getters.selectedYMD);
    watch(ymd, () => {
      if(ymd != null)
        drawPatternMap(store.getters.selectedYMD);
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
    border 1px solid #CCCCCC
    float left
}
</style>