<template>
  <div id="app">
    <Login class="login"></Login>
    <logout class="logout"></logout>
    <el-container>
      <el-header>
        <nav-bar @getKeywords="getKeywords"></nav-bar>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <tab-bar :choices="choices"></tab-bar>
          <my-music :path="path" :myMusics="myMusics"></my-music>
        </el-aside>
        <el-main>
          <keep-alive
            exclude="Search,Singer,Album,MV,MusicList,Profile,Dj,DjCategory,DailyReommend,VideoPlay,AllMV,TopicDetail,
            gender,Follow,Followed,a"
          >
            <router-view
              :is-show-play="isShowPlay"
              @play="audioPlay"
              @pause="audioPause"
              ref="main"
              :keywords="keywords"
            >
            </router-view
          ></keep-alive>
        </el-main>
      </el-container>
    </el-container>
    <div class="audio">
      <audio
        @pause="pause"
        @play="play"
        @timeupdate="timeUpdate"
        ref="audio"
        :src="musicUrl"
        class="audio"
        autoplay
        controls
        loop
      ></audio>
    </div>
  </div>
</template>

<script>
import NavBar from "./views/navbar/NavBar";
import TabBar from "./components/tabbar/TabBar";
import Login from "./components/login/Login";
import Logout from "./components/logout/Logout.vue";
import MyMusic from "./components/myMusic/MyMusic.vue";

export default {
  name: "App",
  data() {
    return {
      keywords: "", //搜索关键字
      choices: ["发现音乐", "视频", "朋友", "直播", "私人FM"], //侧边栏标题
      scroll: "",
      is_play: false, //控制audio
      isShowPlay: true, //控制audio显示
      myMusics: [
        "本地与下载",
        "最近播放",
        "我的音乐云盘",
        "我的播客",
        "我的收藏",
      ], //侧边栏标题
      path: ["/local", "/recent", "/cloud", "/client", "/collect"], //侧边栏前往地址
    };
  },
  computed: {
    musicUrl() {
      return this.$store.state.musicUrl;
    },
  },
  created() {
    window.sessionStorage.clear();
  },
  components: {
    NavBar,
    TabBar,
    Login,
    Logout,
    MyMusic,
  },
  methods: {
    // 发送auido当前时间
    timeUpdate(time) {
      this.$bus.$emit("timeUpdate", this.$refs.audio.currentTime);
    },
    // 暂定auido
    audioPause() {
      this.$refs.audio.pause();
    },
    // 播放audio
    audioPlay() {
      this.$refs.audio.play();
    },
    //
    getKeywords(keywords) {
      this.keywords = keywords;
    },
    pause() {
      this.isShowPlay = true;
    },
    play() {
      this.isShowPlay = false;
    },
    // closeLogout() {
    //   this.$store.commit("setShowLogout", false);
    // },
  },
};
</script>

<style>
@import "assets/css/normalize.css";
* {
  margin: 0;
  padding: 0;
}
#app {
  position: relative;
  overflow: hidden;
  width: 1020px;
  height: 660px;
  margin: 30px auto;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.3);
  border: 1px solid #eeeeee;
}
.el-header {
  background: #e03737;
}
.el-aside {
  height: 100%;
  border-right: 1px solid #afafaf;
}
.el-main {
  margin-bottom: 100px;
}
.el-container {
  height: 100%;
}
.audio {
  background-color: #f2f2f2;
  position: absolute;
  bottom: 0;
  width: 100%;
}
.login,
.logout {
  position: absolute;
  top: 60px;
  /* transform: translateX(-50%); */
  margin-left: 50%;
  z-index: 100;
}
</style>
