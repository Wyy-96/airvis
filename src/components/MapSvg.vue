<template>
  <div class="MapSVG">
    <div id="chart"></div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, watch} from "vue";
import { DrawWind } from "@/utils/drawWindDirection";
import { drawAQIMap } from '@/utils/AQI'
import axios from "axios";
import store from "@/store";
export default defineComponent({
  name: "MapSVG",
  setup() {
    const Hour = computed(() => store.getters.selectedTime);
    watch(Hour, () => {
      const ymd = store.getters.selectedYMD
      drawAQIMap(ymd,Hour.value[0]);
    });
    return {
    };
  },
  mounted() {
    this.$nextTick(function () {
      // 仅在渲染整个视图之后运行的代码
      const { WindDirection } = DrawWind();
      WindDirection();
    });
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.MapSVG {
  width: 1000px;
  height: 100%;
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
</style>