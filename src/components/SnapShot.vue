<template>
  <div class="SnapShot">
    <div class="Header">
      <p>AirPuVis</p>
    </div>
    <div class="information">
      <el-switch
        v-model="value"
        active-color="#13ce66"
        inactive-color="#ff4949"
      >
      </el-switch>
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
    };
  },
  setup() {
    const ymd: any = computed(() => store.getters.selectedYMD);
    watch(ymd, () => {
      if (ymd != null) drawPatternMap(store.getters.selectedYMD);
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
  height: 60%;
}

.patternMap {
  width: 100%;
  height: 35%;
}
</style>