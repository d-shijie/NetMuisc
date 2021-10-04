<template>
  <div @click="close" class="logout" v-if="$store.state.showLogout">
    <div class="top-count">
      <span @click="goto('/gender/')" class="activity">
        <div class="count">
          {{ this.$store.state.userInfo.profile.eventCount }}
        </div>
        <div class="text">动态</div>
      </span>
      <span @click="goto('/follow/')" class="flowed">
        <div class="count">
          {{ this.$store.state.userInfo.profile.follows }}
        </div>
        <div class="text">关注</div>
      </span>
      <span @click="goto('/followed/')" class="fans">
        <div class="count">
          {{ this.$store.state.userInfo.profile.followeds }}
        </div>
        <div class="text">粉丝</div>
      </span>
    </div>
    <el-button size="medium" @click="signIn" round>签到</el-button>
    <logout-item @click.native="gotoProfile" :border="true">
      <div class="el-icon-user" slot="left"></div>
      <div slot="center">我的信息</div>
      <div class="el-icon-arrow-right" slot="right"></div>
    </logout-item>
    <logout-item>
      <div class="el-icon-collection" slot="left"></div>
      <div slot="center">会员中心</div>
      <div class="el-icon-arrow-right" slot="right"></div>
    </logout-item>
    <logout-item>
      <div class="el-icon-medal" slot="left"></div>
      <div slot="center">等级</div>
      <div class="el-icon-arrow-right" slot="right"></div>
    </logout-item>
    <logout-item>
      <div class="el-icon-shopping-cart-full" slot="left"></div>
      <div slot="center">商城</div>
      <div class="el-icon-arrow-right" slot="right"></div>
    </logout-item>
    <logout-item :path="'/setUserInfo/' + userId" :border="true">
      <div class="el-icon-s-custom" slot="left"></div>
      <div slot="center">个人信息设置</div>
      <div class="el-icon-arrow-right" slot="right"></div>
    </logout-item>
    <logout-item>
      <div class="el-icon-open" slot="left"></div>
      <div slot="center">绑定社交账号</div>
      <div class="el-icon-arrow-right" slot="right"></div>
    </logout-item>
    <logout-item :border="true">
      <div class="el-icon-service" slot="left"></div>
      <div slot="center">我的客服</div>
      <div class="el-icon-arrow-right" slot="right"></div>
    </logout-item>
    <logout-item @click.native="logout" :border="true">
      <div class="el-icon-switch-button" slot="left"></div>
      <div slot="center">退出</div>
    </logout-item>
  </div>
</template>

<script>
import { logout } from "../../network/getLoginData";
import LogoutItem from "./LogoutItem.vue";
import { singIn } from "../../network/getProfileData";
export default {
  components: { LogoutItem },
  data() {
    return {
      profile: this.$store.state.userInfo,
    };
  },
  created() {},
  computed: {
    userId() {
      return window.localStorage.getItem("userId");
    },
  },
  methods: {
    close() {
      this.$store.commit("showLogout", false);
    },
    //账号退出
    logout() {
      logout()
        .then((res) => {
          window.localStorage.clear();
          this.$bus.$emit("clearAvatarUrl");
          this.$store.commit("setUserInfo", {});
          this.$store.commit("setShowFriend", false);
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 签到
    signIn() {
      singIn()
        .then((res) => {
          this.$message.success({
            message: "签到成功",
          });
        })
        .catch((err) => {
          console.log(err);
          this.$message.error({
            message: "今日已签到",
          });
        });
    },
    gotoProfile() {
      this.$router.push("/profile/" + window.localStorage.getItem("userId"));
    },
    goto(path) {
      let id = window.localStorage.getItem("userId");
      this.$router.push(path + id);
    },
  },
};
</script>
<style scoped >
/* @import url(); 引入css类 */
.logout {
  width: 250px;
  border-radius: 10px;
  background-color: #fff;
  overflow: hidden;
  border: 1px solid #eee;
}
.top-count {
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.top-count span {
  cursor: pointer;
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
.el-button {
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 10px;
}
</style>