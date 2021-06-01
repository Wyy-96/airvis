<template>
  <div class="SnapShot">
    <div class="Header">
      <p>AirPuVis</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
  }
})
export default class SnapShot extends Vue {

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.SnapShot{
    width 300px
    height 100%
    border 1px solid #CCCCCC
    float left
}
.Header {
  width 100%
  height 30px
  line-height 30px
  background-color #5A94DF;
  text-align left
}
.Header p{
  margin 0px
  margin-left 10px
  color #ffffff
  font-weight bold
}
</style>