<template>
  <div class="comment">
    <div
      @mouseleave="mouseLeave"
      @mouseenter="mouseEnter(index)"
      class="row"
      v-for="(item, index) in comments"
    >
      <img class="head-icon" :src="item.user.avatarUrl" alt="" />
      <div class="info">
        <div class="text">
          <span @click="gotoProfile(item)" class="nickname"
            >{{ item.user.nickname }}:</span
          >
          <span>{{ item.content }}</span>
        </div>
        <div class="date">
          <p class="time">{{ item.time | detailTimeFormat }}</p>
        </div>
      </div>
      <div class="btns">
        <el-button v-if="currentIndex === index" round size="mini"
          >举报</el-button
        >
        <el-button round size="mini" class="el-icon-thumb"></el-button>
        <el-button round size="mini" class="el-icon-position"></el-button>
        <el-button
          round
          size="mini"
          class="el-icon-chat-line-square"
        ></el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Comment",
  data() {
    return {
      currentIndex: "",
    };
  },
  props: {
    comments: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    mouseEnter(index) {
      this.currentIndex = index;
    },
    mouseLeave() {
      this.currentIndex = "";
    },
    gotoProfile(item) {
      this.$router.push("/profile/" + item.user.userId);
    },
  },
};
</script>

<style scoped>
.row {
  position: relative;
  padding: 20px 0;
  align-items: center;
  border-bottom: 1px solid #eeeeee;
  margin: 15px 0;
  display: flex;
}
.head-icon {
  width: 40px;
  margin-right: 10px;
  height: 40px;
  border-radius: 50%;
}
.nickname {
  cursor: pointer;
  color: #a5a5f3;
}
.text {
  margin-bottom: 10px;
  font-size: 12px;
}
.time {
  font-size: 12px;
}
.btns {
  position: absolute;
  right: 0;
  bottom: 0;
}
</style>
