<template>
  <div class="MapSVG">
  <div id ="chart"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent} from "vue";
import { DrawWind } from "@/utils/drawWindDirection";
import axios from "axios"
export default defineComponent({
  name: 'MapSVG',
  setup(){
    return {
    }
  },
  mounted() {
  this.$nextTick(function () { // 仅在渲染整个视图之后运行的代码
    const {WindDirection} = DrawWind()
    WindDirection()
  })
}
})
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
  width  50px
  height 30px
}
#chart{
  width 900px
  height 100%
}
</style>