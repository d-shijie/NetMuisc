<template>
  <div class="tab-bar">
    <ul>
      <li
        @click="itemClick(index)"
        :class="{ active: show(index) }"
        v-for="(item, index) in choices"
        :key="index"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "TabBar",
  data() {
    return {
      currentIndex: 0,
      paths: ["/findMusic", "/video", "/friend", "/living", "/personalFM"],
    };
  },
  props: {
    choices: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  computed: {
    show() {
      return function (index) {
        if (this.$route.path.indexOf(this.paths[index]) !== -1) {
          return true;
        } else {
          return false;
        }
      };
    },
  },
  methods: {
    itemClick(index) {
      this.$router.push(this.paths[index]);
    },
  },
};
</script>

<style scoped>
ul {
  margin-top: 10px;
}
li {
  cursor: pointer;
  font-size: 15px;
  margin: 5px 10px;
  padding: 10px 5px;
}
li:hover {
  background-color: #f2f2f2;
}
.active {
  font-size: 16px;
  background-color: #f2f2f2;
  font-weight: 800;
}
</style>
