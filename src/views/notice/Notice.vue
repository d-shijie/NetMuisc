<template>
  <div class="notice" v-if="$store.state.showNotice">
    <span @click.stop="close" class="el-icon-circle-close"></span>
    <h3>消息(评论，通知和@我本人账号数据为空所有没做)</h3>
    <div class="bar">
      <span
        @click="barClick(index)"
        :class="{ active: currentIndex === index }"
        v-for="(item, index) in barItems"
        :key="index"
        >{{ item }}</span
      >
    </div>
    <notice-private :msgs="privateMsgs"></notice-private>
    <notice-comments :comments="comments"></notice-comments>
    <notice-forwards :forwards="forwards"></notice-forwards>
    <notices :notices="notices"></notices>
  </div>
</template>

<script>
import {
  getNoticePrivate,
  getNoticeComments,
  getNoticeForwards,
  getNotice,
} from "../../network/getProfileData";
import NoticePrivate from "./NoticePrivate.vue";
import NoticeComments from "./NoticeComments.vue";
import notices from "./Notices.vue";
import NoticeForwards from "./NoticeForwards.vue";
export default {
  components: { NoticePrivate, NoticeComments, notices, NoticeForwards },
  data() {
    return {
      barItems: ["私信", "评论", "@我", "通知"],
      currentIndex: 0,
      privateMsgs: [], //私信
      comments: [], //评论
      forwards: [], //@我
      notices: [], //通知
    };
  },
  created() {
    this.getNoticePrivate();
  },
  methods: {
    barClick(index) {
      this.currentIndex = index;
      switch (index) {
        case 0:
          this.getNoticePrivate();
          break;
        case 1:
          this.getNoticeComments();
          break;
        case 2:
          this.getNoticeForwards();
          break;
        case 3:
          this.getNotice();
          break;
      }
    },
    // 获取私信
    getNoticePrivate() {
      getNoticePrivate()
        .then((res) => {
          this.privateMsgs = res.data.msgs;
          this.components = [];
          this.forwards = [];
          this.notices = [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 获取评论
    getNoticeComments() {
      getNoticeComments(window.localStorage.getItem("userId"))
        .then((res) => {
          this.comments = res.data.comments;
          this.privateMsgs = [];
          this.forwards = [];
          this.notices = [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 获取@我
    getNoticeForwards() {
      getNoticeForwards()
        .then((res) => {
          this.forwards = res.data.forwards;
          this.privateMsgs = [];
          this.components = [];
          this.notices = [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 获取通知
    getNotice() {
      getNotice()
        .then((res) => {
          this.notices = res.data.notices;
          this.privateMsgs = [];
          this.components = [];
          this.forwards = [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    close() {
      this.$store.commit("setShowNotice", false);
    },
  },
};
</script>
<style scoped >
/* @import url(); 引入css类 */
.el-icon-circle-close {
  font-size: 20px;
  margin-bottom: 10px;
}
.notice {
  padding: 20px;
  position: absolute;
  right: 0;
  border-left: 1px solid #eee;
  box-shadow: -2px 0 5px #eee;
  top: 60px;
  background-color: #fff;
  height: 76vh;
  width: 370px;
  z-index: 100;
  overflow: hidden;
}
.bar {
  border: 1px solid #eee;
  border-radius: 15px;
  overflow: hidden;
  width: 100%;
  margin: 10px;
  display: flex;
  justify-content: space-between;
}
.bar span {
  text-align: center;
  flex: 1;
  cursor: pointer;
  padding: 8px 0;
  font-size: 13px;
  border-radius: 15px;
}
.bar span:hover {
  background-color: #f2f2f2 !important;
}
.active {
  background-color: rgb(151, 151, 151);
  color: rgb(253, 253, 253);
}
</style>