<template>
  <div class="collect">
    <div v-if="show">
      <collect-nav-bar :items="items"></collect-nav-bar>
      <router-view class="view"></router-view>
    </div>
    <div v-if="!show">请登录</div>
  </div>
</template>

<script>
import CollectNavBar from "./CollectNavBar.vue";

export default {
  components: { CollectNavBar },
  data() {
    return {
      items: [
        {
          name: "专辑",
          path: "/collect/collectAlbums",
        },
        {
          name: "歌手",
          path: "/collect/collectSingers",
        },
        {
          name: "视频",
          path: "/collect/collectVideos",
        },
        {
          name: "专栏",
          path: "/collect/collectSpecials",
        },
      ],
    };
  },
  computed: {
    show() {
      if (window.localStorage.getItem("userId")) {
        return true;
      } else {
        return false;
      }
    },
  },
  created() {},
  methods: {},
};
</script>
<style scoped >
/* @import url(); 引入css类 */
.view {
  margin-top: 30px;
}
</style>