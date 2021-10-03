<template>
  <div class="local-navbar">
    <span
      @click="itemClick(index)"
      :class="{ active: show(index) }"
      v-for="(item, index) in items"
      :key="index"
    >
      {{ item }}
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
    path: {
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
  computed: {
    show() {
      return function (index) {
        if (this.$route.path.indexOf(this.path[index]) !== -1) {
          return true;
        } else {
          return false;
        }
      };
    },
  },
  methods: {
    itemClick(index) {
      this.$router.push(this.path[index]);
    },
  },
};
</script>
<style scoped>
/* @import url(); 引入css类 */
span {
  font-size: 16px;
  cursor: pointer;
  color: rgb(59, 59, 59);
  margin-right: 15px;
}
span:hover {
  color: #000;
}
.active {
  font-weight: 600;
  font-size: 18px;
  border-bottom: 3px solid rgb(255, 75, 75);
  padding-bottom: 5px;
}
</style>