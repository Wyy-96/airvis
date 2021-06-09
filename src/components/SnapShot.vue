<template>
  <div class="SnapShot">
    <div class="Header">
      <p>AirPuVis</p>
    </div>
    <div class="information">
      <div class="info">
        <el-table
        :data="tableData"
        :cell-style="{padding:'5px 0px' ,background: '#000000', color:'#CFCCCC'}"
        :header-cell-style = "{
          background: '#000000',
          color:'#CFCCCC'
        }"
        style="width: 100%;background-color:#000000">
          <el-table-column prop="date" label="空气质量" width="80">
          </el-table-column>
          <el-table-column prop="address" label="污染指数分级" width="120"> </el-table-column> 
          <el-table-column prop="address"> <el-avatar shape="square" :size="15" ></el-avatar></el-table-column>
        </el-table>
      </div>
      <div class="selectWind">
        <p>是否显示风向</p>
        <el-switch
          v-model="value"
          style="margin-top: 11px"
          active-color="#13ce66"
          inactive-color="#969292"
        >
        </el-switch>
      </div>
      <div class="selecTime">
        <p>{{ selectYMD }}</p>
      </div>
    </div>
    <div class="patternMap"></div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, watch, ref } from "vue";
import * as d3 from "d3";
import store from "@/store";
import { drawPatternMap } from "@/utils/patternMap";
export default defineComponent({
  name: "SnapShot",
  setup() {
    const selectYMD = ref("");
    const value = ref(true);
    const ymd: any = computed(() => store.getters.selectedYMD);
    watch(ymd, () => {
      if (ymd != null) {
        selectYMD.value =
          ymd.value.substring(0, 4) +
          "年" +
          ymd.value.substring(4, 6) +
          "月" +
          ymd.value.substring(6, 8) +
          "日";
        drawPatternMap(store.getters.selectedYMD);
      }
    });

    watch(value, () => {
      if (value.value == true) d3.select("canvas").style("opacity", "1");
      else d3.select("canvas").style("opacity", "0");
    });


    const tableData = [{
            date: '优',
            address: 'AQI < 50 '
          }, {
            date: '良',
            address: 'AQI < 100 '
          }, {
            date: '轻度污染',
            address: 'AQI < 150 '
          }, {
            date: '中度污染',
            address: 'AQI < 200 '
          }, {
            date: '重度污染',
            address: 'AQI < 300 '
          }, {
            date: '严重污染',
            address: 'AQI < 500 '
          }]
    return {
      selectYMD,
      value,
      tableData
    };
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

.selectWind {
  width: 100%;
  height: 30px;
}

.selectWind p {
  float: left;
  font: 1em sans-serif;
  color: white;
  margin-top: 10px;
  margin-left: 40px;
}

.info {
  width: 100%;
  height: 250px;
}

.selecTime p {
  color: white;
  font: 2em sans-serif;
}

>>>.el-avatar{
  background: red
}
</style>