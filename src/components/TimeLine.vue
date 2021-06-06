<template>
  <div class="TimeLine">

  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
  }
})
export default class TimeLine extends Vue {

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.TimeLine{
    width 100%
    height 148px
    border-bottom 1px solid white
    margin-bottom 10px
}
</style>