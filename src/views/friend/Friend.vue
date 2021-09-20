<template>
  <div class="friend">
    <div class="left">
      <div class="top">
        <h3>动态</h3>
        <el-button size="mini" type="danger" round>➕ 写动态</el-button>
      </div>
    </div>
    <div class="right">
      <div v-if="$store.state.showFriend === false" class="no-login">
        <img src="../../assets/img/login/网易.jpg" alt="" />
        <el-button round type="danger">立即登录</el-button>
      </div>
      <div v-if="$store.state.showFriend === true" class="user">
        <span> <img :src="headUrl" alt="" /></span>
        <span class="nickname">{{
          this.$store.state.userInfo.profile.nickname
        }}</span>
        <div class="top-count">
          <span class="activity">
            <div class="count">
              {{ this.$store.state.userInfo.profile.gender }}
            </div>
            <div class="text">动态</div>
          </span>
          <span class="flowed">
            <div class="count">
              {{ this.$store.state.userInfo.profile.follows }}
            </div>
            <div class="text">关注</div>
          </span>
          <span class="fans">
            <div class="count">
              {{ this.$store.state.userInfo.profile.followeds }}
            </div>
            <div class="text">粉丝</div>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Friend",
  data() {
    return {
      headUrl: "",
    };
  },
  mounted() {
    this.$bus.$on("getHeadUrl", (url) => {
      this.headUrl = url;
    });
  },
  computed: {
    profile() {
      return this.$store.getters.userInfo;
    },
    showLogin() {
      if (window.sessionStorage.getItem("userId")) {
        return false;
      } else {
        return true;
      }
    },
  },
};
</script>

<style scoped>
.friend {
  display: flex;
}
.left {
  flex: 4;
  border-right: 1px solid #eee;
  padding-right: 15px;
  height: 72vh;
}
.right {
  flex: 2;
}
.top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.no-login {
  width: 100%;
  position: relative;
}
.no-login img {
  width: 100% !important;
}
.user {
  padding: 15px;
  background-color: #eee;
}
.user img {
  border-radius: 50%;
  width: 50px;
}
.nickname {
  font-size: 12px;
  margin-left: 5px;
}
.no-login .el-button {
  width: 80%;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: -20px;
}
.top-count {
  margin-top: 10px;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.top-count span {
  cursor: pointer;
  padding-right: 30px;
  border-right: 1px solid rgb(180, 180, 180);
}
.top-count span .text:hover {
  color: #000000;
}
.count {
  text-align: center;
  font-weight: 600;
  font-size: 18px;
}
.text {
  font-size: 12px;
  margin-top: 5px;
  color: rgb(82, 82, 82);
}
</style>
