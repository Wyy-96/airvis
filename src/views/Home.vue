<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/> -->
    <div class="top">
      <SnapShot />
      <MapSVG />
      <Detail />
    </div>
    <div class="bottom">
      <TimeLine />
      <TimeOverview />
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
// import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import MapSVG from "@/components/MapSvg.vue";
import Detail from "@/components/Detail.vue";
import TimeLine from "@/components/TimeLine.vue";
import SnapShot from "@/components/SnapShot.vue";
import TimeOverview from "@/components/TimeOverview.vue"
@Options({
  components: {
    // HelloWorld,
    SnapShot,
    MapSVG,
    Detail,
    TimeLine,
    TimeOverview,
  },
})
export default class Home extends Vue {
  
}
</script>
<style lang="stylus">
.top {
  width: 100%;
  height: 650px;
}

.bottom {
  width: 100%;
  height: 300px;
}
</style>