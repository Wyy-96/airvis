<template>
  <div class="MapSVG">
    <button @click="btn"></button>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { DrawWind } from "@/utils/drawWindDirection";
import axios from "axios"
// @Option
//  props 里面设置接收参数
//  data 里面设置变量
//  computed 里面设置计算属性
//  watch 里面设置监听属性
//  methods 里面设置事件方法
@Options({
  props: {},
  methods: {},
  created(){},
   watch: {},
  data() {
			return {}
		},
})
export default class MapSVG extends Vue {
  setup(){
    const { WindDirection } = DrawWind()
    const btn = (() =>{
      console.log("ok")
    	WindDirection ();
    })
    return {
      btn
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.MapSVG {
  width: 900px;
  height: 100%;
  border: 1px solid red;
  float: left;
}
button {
  width  50px
  height 30px
}
</style>