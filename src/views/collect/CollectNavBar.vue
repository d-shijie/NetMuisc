<template>
  <div class="collect-narbar">
    <span
      @click="itemClick(index, item.path)"
      :class="{ active: show(item.path) }"
      v-for="(item, index) in items"
      :key="index"
    >
      {{ item.name }}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  computed: {
    show() {
      return function (path) {
        if (this.$route.path === path) {
          return true;
        } else {
          return false;
        }
      };
    },
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    itemClick(index, path) {
      this.currentIndex = index;
      this.$router.push(path);
    },
  },
};
</script>
<style scoped >
/* @import url(); 引入css类 */
span {
  cursor: pointer;
  padding: 5px 0;
  margin-right: 15px;
}
.active {
  font-size: 18px;
  border-bottom: 3px solid red;
  font-weight: 600;
}
</style>