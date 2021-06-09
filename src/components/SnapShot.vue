<template>
  <div class="SnapShot">
    <div class="Header">
      <p>AirPuVis</p>
    </div>
    <div class="information">
      <div class = "selectWind">
        <p> 是否显示风向</p>
        <el-switch
        v-model="value"
        style="margin-top: 11px"
        active-color="#13ce66"
        inactive-color="#969292"
      >
      </el-switch>
      </div>
      <div class = "selecTime"> {{ selectYMD }}</div>
    </div>
    <div class="patternMap"></div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, watch } from "vue";
import * as d3 from "d3";
import store from "@/store";
import { drawPatternMap } from "@/utils/patternMap";
export default defineComponent({
  name: "SnapShot",
  data() {
    return {
      value: true,
      selectYMD : ''
    };
  },
  setup() {
    const ymd: any = computed(() => store.getters.selectedYMD);
    watch(ymd, () => {
      if (ymd != null) {
        selectYMD.value = ymd
        drawPatternMap(store.getters.selectedYMD);
        }
    });
    return {};
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.SnapShot {
  width: 300px;
  height: 100%;
  border: 1px solid #CCCCCC;
  float: left;
}

.Header {
  width: 100%;
  height: 30px;
  line-height: 30px;
  background-color: #5A94DF;
  text-align: left;
}

.Header p {
  margin: 0px;
  margin-left: 10px;
  color: #ffffff;
  font-weight: bold;
}

.information {
  width: 100%;
  height: 55%;
}

.patternMap {
  width: 100%;
  height: 40%;
}

.selectWind{
  width 100%
  height 30px
}
.selectWind p{
  float left
  font 1em sans-serif
  color white
  margin-top 10px
  margin-left 40px

}
</style>