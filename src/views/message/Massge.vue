<template>
  <div class="message" v-if="$store.state.showMessage">
    <div class="top">
      <span @click="show" class="el-icon-arrow-left"></span>
      <span class="username">{{ $store.state.sendUserName }}</span>
    </div>
    <scroll class="content">
      <div class="message-list">
        <div
          class="message-item"
          v-for="(item, index) in messages"
          :key="index"
        >
          <span> {{ JSON.parse(item.msg).msg }}</span>
          <i class="icon"></i>
        </div>
      </div>
    </scroll>
    <div class="bottom">
      <textarea
        placeholder="请输入内容"
        v-model="message"
        name="message"
        id=""
      ></textarea>
      <div class="send">
        <span class="el-icon-folder"></span>
        <el-button @click="sendMessage" round size="mini">发送</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { sendMessage } from "../../network/getProfileData";

import Scroll from "../../components/scroll/Scroll.vue";
export default {
  data() {
    return {
      message: "", // 私信的消息
      messages: [], // 已私信过的消息
    };
  },
  components: {
    Scroll,
  },
  created() {},
  methods: {
    // 获取已发送信息
    sendMessage() {
      sendMessage(this.$store.state.sendUserId, this.message)
        .then((res) => {
          this.messages = res.data.newMsgs.reverse();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    show() {
      this.$store.commit("setShowNotice", true);
      this.$store.commit("setShowMessage", false);
    },
  },
};
</script>
<style scoped >
/* @import url(); 引入css类 */
.content {
  height: 50vh;
  overflow: hidden;
}
.message {
  position: absolute;
  right: 0;
  border-left: 1px solid #eee;
  box-shadow: -2px 0 5px #eee;
  top: 60px;
  background-color: #fff;
  height: 75vh;
  width: 370px;
  z-index: 100;
  overflow: hidden;
}
.top {
  margin: 10px;
  display: flex;
  align-items: center;
}
.top span:nth-child(1) {
  width: 20px;
}
.username {
  flex: 1;
  font-size: 13px;
  font-weight: 600;
  text-align: center;
}
.message-list {
  overflow: hidden;
}
.message-item {
  text-align: right;
  margin-top: 30px;
  margin-bottom: 3px;
}
.message-item span {
  margin-right: 15px;
  padding: 5px 8px;
  font-size: 13px;
  border-radius: 10px;
  background-color: rgb(213, 213, 255);
}
.message-item .icon {
  width: 0;
  display: inline-block;
  height: 0;
  position: relative;
  right: 25px;
  bottom: -8px;
  border-bottom: 10px solid rgb(213, 213, 255);
  border-left: 10px solid transparent;
}
.bottom {
  position: absolute;
  bottom: 0;
  margin-top: 5px;
  width: 100%;
  height: 130px;
  z-index: 1000;
}
textarea {
  border: 1px solid rgb(180, 180, 180);
  border-radius: 10px;
  width: 90%;
  height: 70px;
  margin: 0 auto;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  outline: none;
  resize: none;
  font-size: 13px;
  padding: 5px;
}
.send {
  width: 100%;
  position: absolute;
  bottom: 15px;
  padding: 0 20px;
  display: flex;

  align-items: center;
}
.send .el-button {
  position: absolute;
  right: 55px;
}
</style>