<template>
  <div class="client">
    <div v-if="show">
      <h3>收藏的播客</h3>
      <h2>暂无数据哦</h2>
    </div>
    <div v-if="!show">请登录</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userId: window.localStorage.getItem("userId"),
    };
  },
  watch: {},
  computed: {
    show() {
      if (this.userId) {
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
</style>