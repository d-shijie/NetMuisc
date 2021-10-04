<template>
  <div class="friend">
    <div class="left">
      <div class="top">
        <h3>动态</h3>
        <el-button size="mini" type="danger" round>➕ 写动态</el-button>
      </div>
    </div>
    <div class="right">
      <div v-if="$store.state.showFriend" class="no-login">
        <img src="../../assets/img/login/网易.jpg" alt="" />
        <el-button @click="login" round type="danger">立即登录</el-button>
      </div>
      <div v-else class="user">
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
      <div class="hot-topic">
        <div class="top">
          <span><h6>热门话题</h6></span>
          <span @click="gotoTopic" class="more">更多</span>
        </div>
        <div
          @click="goto(item.actId)"
          class="topic"
          v-for="(item, index) in hotTopics"
          :key="item.actId"
        >
          <span><img :src="item.sharePicUrl" alt="" /></span>
          <span class="topic-info">
            <div class="topic-title">#{{ item.title }}#</div>
            <div class="topic-count">{{ item.participateCount }}人参与</div>
          </span>
        </div>
        <div class="add-friend">
          <h6>添加关注</h6>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getHotTopic } from "../../network/getTopicData";
export default {
  name: "Friend",
  data() {
    return {
      headUrl: "", //头像地址
      hotTopics: [], //热门话题
    };
  },
  created() {
    this.getHotTopic(5);
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
  methods: {
    // 获取热门话题
    getHotTopic(limit, offset) {
      getHotTopic(limit, offset)
        .then((res) => {
          this.hotTopics = res.data.hot;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    goto(id) {
      this.$router.push("/topicDetail/" + id);
    },
    gotoTopic() {
      this.$router.push("/topic");
    },
    login() {
      this.$store.commit("setShowLogin", true);
    },
  },
};
</script>

<style scoped>
.hot-topic {
  margin: 30px 15px 25px 15px;
}
.more {
  cursor: pointer;
  font-size: 12px;
  color: #949494;
}
.topic {
  cursor: pointer;
  display: flex;
  align-items: center;
  margin: 5px 0;
}
.topic:hover {
  background-color: #f2f2f2;
}
.topic img {
  margin-right: 5px;
  width: 40px;
  height: 40px;
  border-radius: 10px;
}
.topic-info {
  display: flex;
  color: #4d4d4d;
  flex-direction: column;
  justify-content: space-around;
  font-size: 12px;
}
.topic-title {
  margin-bottom: 5px;
}
.topic-count {
  color: #afafaf;
}
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
