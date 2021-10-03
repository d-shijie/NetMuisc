<template>
  <div class="recent">
    <div class="top">
      <h3>最近播放</h3>
      <i>共{{ songs.length }}首</i>
      <a href="javascript:;">清空列表</a>
    </div>
    <el-button class="el-icon-video-play" round type="danger" size="medium"
      >播放全部</el-button
    >
    <recent-songs :songs="songs"></recent-songs>
  </div>
</template>

<script>
import { getUserRecord } from "../../network/getProfileData";
import RecentSongs from "./RecentSongs.vue";
export default {
  data() {
    return {
      songs: [], // 最近播放歌曲
    };
  },
  components: {
    RecentSongs,
  },
  created() {
    this.getUserRecord();
  },
  methods: {
    getUserRecord() {
      getUserRecord(window.localStorage.getItem("userId"), 0)
        .then((res) => {
          this.songs = res.data.allData;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style scoped >
/* @import url(); 引入css类 */
.top {
  display: flex;
  align-items: center;
}
i {
  margin-left: 10px;
  color: rgb(88, 88, 88);
  font-size: 13px;
}
a {
  flex: 1;
  text-align: right;
  text-decoration: none;
  color: rgb(136, 136, 255);
}
.el-button {
  margin-top: 10px;
}
</style>