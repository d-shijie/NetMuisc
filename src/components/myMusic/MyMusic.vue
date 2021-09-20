<template>
  <div class="my-music">
    <header>我的音乐</header>
    <ul>
      <li
        :class="{ active: show(index) }"
        @click="itemClick(index)"
        v-for="(item, index) in myMusics"
        :key="index"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    myMusics: {
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
  data() {
    return {
      currentIndex: 0,
    };
  },
  created() {},
  methods: {
    itemClick(index) {
      this.$router.push(this.path[index])
    },
  },
};
</script>
<style scoped >
/* @import url(); 引入css类 */
.my-music {
  padding: 5px 12px;
}
header {
  font-size: 12px;
  padding: 5px 0;
  color: rgb(70, 70, 70);
}
li {
  cursor: pointer;
  font-size: 16px;
  padding: 10px 3px;
}
li:hover {
  background-color: #f2f2f2;
}
.active {
  background-color: #f2f2f2;
  font-weight: 600;
}
</style>