<template>
  <div class="collect-special">
    <div class="top">
      <h4>收藏的专栏</h4>
      <el-input
        suffix-icon="el-icon-search"
        size="mini"
        v-model="keyword"
        @keyup.enter.native="search"
        placeholder="搜索我收藏的专栏"
      ></el-input>
    </div>
    <div class="zero">
      <img :src="pic" alt="" />
      <i>暂无收藏专栏(账号无数据没做)</i>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pic: "https://img0.baidu.com/it/u=2926187340,947096600&fm=15&fmt=auto",
    };
  },
  created() {},
  methods: {},
};
</script>
<style scoped >
/* @import url(); 引入css类 */
.top {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}
h4 {
  flex: 1;
}
.el-input {
  width: 200px;
}
.zero {
  position: fixed;
  left: 55%;
  top: 45%;
  width: 80px;
}
.zero img {
  width: 100%;
}
i {
  font-size: 13px;
}
</style>