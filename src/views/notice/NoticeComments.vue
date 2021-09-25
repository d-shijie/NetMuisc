<template>
  <div class="comments">
    <div v-if="comments === []" class="warn">暂无评论</div>
  </div>
</template>

<script>
export default {
  props: {
    comments: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>
<style scoped>
/* @import url(); 引入css类 */
</style>