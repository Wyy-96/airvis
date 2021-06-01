<template>
  <div class="TimeOverview">
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { drawLineOverview } from '@/utils/drawTimeOverview'
@Options({
  props: {
  }
})
export default class TimeOverview extends Vue {
  mounted(){
    drawLineOverview()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.TimeOverview{
    width 100%
    height 100px
    border 1px solid #CCCCCC
}
</style>