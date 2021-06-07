<template>
  <div class="TimeOverview"></div>
</template>

<script lang="ts">
import { defineComponent, computed, watch} from "vue";
import { drawLineOverview } from '@/utils/drawTimeOverview';
import axios from "axios"
import store from '@/store'

export default defineComponent({
  name: 'TimeOverview',
  setup(){
  },
  mounted() {
      drawLineOverview()
  },
//   watch(()=>book.name,()=>{//通过一个函数返回要监听的属性
//  	console.log('书名改变了')
//  })

})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.TimeOverview {
  width: 100%;
  height: 120px;
}
</style>