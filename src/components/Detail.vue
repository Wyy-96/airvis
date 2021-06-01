<template>
  <div class="Detail">
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';


@Options({
  props: {
  }
})
export default class Detail extends Vue {

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.Detail{
    width 590px
    height 100%
    border 1px solid #CCCCCC
    float left
}
</style>