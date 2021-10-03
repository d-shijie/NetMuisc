<template>
  <div class="download-manage">
    <div class="tab-bar">
      <span
        @click="itemClick(index)"
        :class="{ active: currentIndex === index }"
        class="item"
        v-for="(item, index) in tabbar"
        :key="index"
      >
        {{ item }}
      </span>
    </div>
    <el-button class="el-icon-caret-right" size="medium" type="danger" round
      >播放全部</el-button
    >
    <h3>需要查询本地文件</h3>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabbar: ["已下载单曲", "已下载声音", "已下载MV", "正在下载"],
      currentIndex: 0,
    };
  },
  created() {},
  methods: {
    itemClick(index) {
      this.currentIndex = index;
    },
  },
};
</script>
<style scoped >
/* @import url(); 引入css类 */
.tab-bar {
  margin: 30px 0 25px 0;
  font-size: 14px;
}
.tab-bar span {
  cursor: pointer;
  margin-right: 10px;
  padding: 5px 10px;
  border-radius: 22px;
  color: rgb(95, 95, 95);
}

.active {
  background-color: #f2f2f2;
  color: rgb(250, 91, 91) !important;
}
</style>