<template>
  <div id="app">
    <Login class="login"></Login>
    <logout class="logout"></logout>
    <massage></massage>
    <notice></notice>
    <el-container>
      <el-header>
        <nav-bar @getKeywords="getKeywords"></nav-bar>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <tab-bar :choices="choices"></tab-bar>
          <my-music :path="path" :myMusics="myMusics"></my-music>
          <el-menu
            v-if="show"
            :unique-opened="true"
            :collapse-transition="false"
            active-text-color="red"
          >
            <el-submenu :index="''">
              <template slot="title">
                <span class="title-aside">创建的歌单</span>
              </template>
              <el-menu-item
                @click="back(item.id)"
                v-for="(item, index) in createdPlayList"
                :key="item.id"
                :index="'/musiclist/' + item.id"
              >
                <i class="el-icon-video-play"></i>
                <span slot="title">{{ item.name }}</span>
              </el-menu-item>
            </el-submenu>
          </el-menu>
          <el-menu
            v-if="show"
            :unique-opened="true"
            :collapse-transition="false"
            active-text-color="red"
          >
            <el-submenu :index="''">
              <template slot="title">
                <span class="title-aside">收藏的歌单</span>
              </template>
              <el-menu-item
                @click="back(item.id)"
                v-for="(item, index) in sublistPlaylist"
                :key="item.id"
                :index="'/musiclist/' + item.id"
              >
                <i class="el-icon-video-play"></i>
                <span slot="title">{{ item.name }}</span>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <keep-alive
            exclude="Search,Singer,Album,MV,MusicList,Profile,Dj,DjCategory,DailyReommend,VideoPlay,AllMV,TopicDetail,
            gender,Follow,Followed,a"
          >
            <router-view
              :key="$route.fullPath"
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
import Massage from "./views/message/Massge.vue";
import Notice from "./views/notice/Notice.vue";
import {
  loginStatus,
  getProfileDetail,
  getUserPlayList,
} from "./network/getProfileData";
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
      createdPlayList: [1, 2, 3], //用户创建的歌单
      sublistPlaylist: [], //用户收藏的歌单
    };
  },
  computed: {
    musicUrl() {
      return this.$store.state.musicUrl;
    },
    show() {
      return window.localStorage.getItem("userId");
    },
  },
  created() {
    // 因为不手动退出后台一直登录处于登录状态 做一些对应处理
    loginStatus()
      .then((res) => {
        getProfileDetail(window.localStorage.getItem("userId"))
          .then((res) => {
            this.$store.commit("setUserInfo", res.data);
            this.$bus.$emit("getHeadUrl", res.data.profile.avatarUrl);
          })
          .catch((err) => {
            console.log(err);
          });
        this.getUserPlayList();
      })
      .catch((err) => {
        window.localStorage.clear();
      });
  },
  components: {
    NavBar,
    TabBar,
    Login,
    Logout,
    MyMusic,
    Massage,
    Notice,
  },
  filters: {},
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
    getUserPlayList() {
      getUserPlayList(window.localStorage.getItem("userId"))
        .then((res) => {
          console.log(res);
          this.createdPlayList = res.data.playlist.filter((item) => {
            return item.subscribed == false;
          });
          res.data.playlist.forEach((item) => {
            if (!this.createdPlayList.includes(item)) {
              this.sublistPlaylist.push(item);
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    back(id) {
      this.$router.push("/musiclist/" + id);
    },
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
  padding-bottom: 80px;
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
  z-index: 100;
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
.title-aside {
  color: rgb(124, 124, 124);
  font-size: 13px;
}
</style>
