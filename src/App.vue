<template>
  <div id="app">
    <Login class="login"></Login>
    <el-container>
      <el-header>
        <nav-bar @getKeywords="getKeywords"></nav-bar>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <tab-bar :choices="choices"></tab-bar>
        </el-aside>
        <el-main>
          <keep-alive exclude="Search,Singer,Album,MV,MusicList,Profile,Dj,DjCategory">
            <router-view :is-show-play="isShowPlay" @play="audioPlay" @pause="audioPause" ref="main" :keywords="keywords">
            </router-view></keep-alive>
        </el-main>
      </el-container>
    </el-container>
    <div class="audio"><audio @pause="pause" @play="play" @timeupdate="timeUpdate" ref="audio"  :src="musicUrl" class="audio" autoplay controls loop></audio></div>
  </div>
</template>

<script>
import NavBar from "./views/navbar/NavBar";
import TabBar from "./components/tabbar/TabBar";
import Login from "./components/login/Login";
export default {
  name: 'App',
  data(){
    return {
      keywords:"",
      choices: ["发现音乐","视频","朋友","直播","私人FM"],
      scroll:"",
      is_play:false,
      isShowPlay:true,
    }
  },
  computed:{
    musicUrl(){
      return this.$store.state.musicUrl
    }
  },
  components: {
    NavBar,
    TabBar,
    Login
  },
  methods:{
    timeUpdate(time){
      this.$bus.$emit("timeUpdate",this.$refs.audio.currentTime)
    },
    audioPause(){
      this.$refs.audio.pause()
    },
    audioPlay(){
      this.$refs.audio.play()
    },
    getKeywords(keywords){
      this.keywords=keywords
    },
    pause(){
      this.isShowPlay=true
    },
    play(){
      this.isShowPlay=false
    }
  }
}
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
.login {
  position: absolute;
  top: 30px;
  transform: translateX(-50%);
  margin-left: 50%;
  z-index: 100;
}
</style>
