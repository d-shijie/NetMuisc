<template>
  <div class="nav-bar">
    <img src="../../assets/img/navbar/logo.png" alt="">
    <div class="search">
      <span @click="back"  class="el-icon-arrow-left"></span>
      <span  class="el-icon-arrow-right"></span>
      <input @keyup.enter="getSearchData" v-model="$store.state.keywords" size="mini" placeholder="搜索" prefix-icon="el-icon-search">
      </input>
      <span class="el-icon-mic" ></span>
    </div>
    <div class="other">
      <img class="headImg" @click="headClick" :src="headUrl"></img>
      <span class="el-icon-star-on"></span>
      <span class="el-icon-setting"></span>
      <span class="el-icon-message"></span>
      <span class="el-icon-crop"></span>
      <span class="el-icon-minus"></span>
      <span class="el-icon-full-screen"></span>
      <span class="el-icon-close"></span>
    </div>
  </div>
</template>

<script>
import { getSearchData } from "../../network/getSearchData";
import {
  loginStatus,
  
} from "../../network/getProfileData";
export default {
  name: "NavBar",
  mounted() {
    this.$bus.$on("getHeadUrl", (url) => {
      this.headUrl = url;
    });
    this.$bus.$on("clearAvatarUrl", () => {
      this.headUrl = require("../../assets/img/navbar/头像.png");
    });
  },
  data() {
    return {
      keywords: "",
      headUrl: require("../../assets/img/navbar/头像.png"),
      qrurl: "",
    };
  },
  methods: {
    getSearchData() {
      if (this.$store.state.keywords !== "") {
        this.$router.push("/search");
        getSearchData(
          this.$store.state.keywords,
          100,
          this.$store.state.singleSongsOffset,
          1
        )
          .then((res) => {
            this.$store.state.singleTotal = res.data.result.songCount;
            this.$store.state.singleSongs = res.data.result.songs;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    back() {
      this.$router.back();
    },
   

    headClick() {
      if (window.localStorage.getItem("userId")) {
        this.$store.commit("showLogout", true);
      } else {
        this.$store.commit("setShowLogin", true);
        
      }
    },
  },
};
</script>

<style scoped>
.nav-bar {
  justify-content: space-between;
  display: flex;
  align-items: center;
}
.headImg {
  cursor: pointer;
  border-radius: 50%;
}
img {
  width: 90px;
  height: 100%;
}
* {
  margin: 0;
  padding: 0;
}
.search {
  justify-content: space-between;
  display: flex;
  align-items: center;
}
.el-input {
  border-radius: 10px;
  outline: none;
}
input {
  width: 180px;
  height: 28px;
  font-size: 13px;
  color: #ffffff;
  background-color: rgba(227, 100, 100, 0.5);
  border-radius: 15px;
  outline: none;
}
.search span {
  margin: 0 10px;
  display: inline-block;
  border-radius: 50%;
  padding: 5px;
  background-color: rgba(0, 0, 0, 0.2);
}
.other img {
  width: 30px;
  margin-right: 50px;
}
.other {
  display: flex;
  align-items: center;
}
.other span {
  display: inline-block;
  padding: 10px;
  margin: 0 8px;
}
.other span:nth-child(5) {
  border-right: 1px solid #eeeeee;
}
</style>
