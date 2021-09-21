<template>
  <div class="follows">
    <div
      class="item"
      @click="itemClick(item.userId)"
      v-for="(item, index) in list"
      :key="item.userId"
    >
      <span v-if="!item.followed" class="btn">
        <el-button size="mini" round>➕ 关注</el-button>
      </span>
      <span v-else-if="item.followed" class="btn">
        <el-button size="mini" disabled round>已关注</el-button>
      </span>
      <span v-if="show === 1" class="btn">
        <el-button class="el-icon-message" size="mini" round>私信</el-button>
      </span>
      <span><img :src="item.avatarUrl" alt="" /></span>
      <span>
        <div class="nickname">
          {{ item.nickname }}
        </div>
        <div class="count">
          <span>关注：{{ item.follows }}</span>
          <span>粉丝：{{ item.followeds }}</span>
        </div>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
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
      if (this.$route.path.indexOf("/follow")) {
        return 2;
      } else if (this.$route.path.indexOf("/followed")) {
        return 1;
      }
    },
  },
  methods: {
    itemClick(id) {
      this.$router.push("/profile/" + id);
    },
  },
};
</script>
<style scoped >
/* @import url(); 引入css类 */
.follows {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.item {
  position: relative;
  padding: 10px 15px;
  width: 40%;
  align-items: center;
  display: flex;
}
.item .btn {
  position: absolute;
  right: 10px;
}
.item:hover {
  background-color: #f2f2f2;
}
img {
  border: 1px solid rgb(170, 170, 170);
  margin-right: 10px;
  width: 80px;
  border-radius: 50%;
}
.nickname {
  font-size: 14px;
  color: rgb(66, 66, 66);
  margin-left: 10px;
}
.count {
  font-size: 12px;
  margin-top: 20px;
}
.count span {
  display: inline-block;
  padding: 0 10px;
}
.count span:nth-child(1) {
  border-right: 1px solid #eee;
}
</style>