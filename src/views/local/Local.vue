<template>
  <div class="local">
    <local-nav-bar :items="navbarItems" :path="paths"></local-nav-bar>
    <router-view></router-view>
  </div>
</template>

<script>
import LocalNavBar from "./LocalNavBar.vue";
export default {
  data() {
    return {
      navbarItems: ["下载管理", "本地音乐"],
      paths: ["/local/downloadManage", "/local/localMusic"],
    };
  },
  components: {
    LocalNavBar,
  },
  created() {},
  methods: {},
};
</script>
<style scoped >
/* @import url(); 引入css类 */
</style>