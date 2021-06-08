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

})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.TimeOverview {
  width: 100%;
  height: 120px;
}
</style>