<template>
  <div class="music-player">
    <div class="left">
      <img :src="$store.state.musicInfo.imgUrl" alt="" />
      <span class="info">
        <div class="name">
          {{ $store.state.musicInfo.name }}
          <like :id="$store.state.musicInfo.id"></like>
        </div>
        <div class="artist">
          {{ $store.state.musicInfo.artist }}
        </div>
      </span>
    </div>
    <div class="center">
      <div class="top">
        <span class="el-icon-refresh-right"></span>
        <span @click="prev" class="el-icon-caret-left"></span>
        <span
          @click="play"
          v-if="!$store.state.isPlay"
          class="el-icon-video-play"
        ></span>
        <span @click="pause" v-else class="el-icon-video-pause"></span>
        <span @click="next" class="el-icon-caret-right"></span>
        <span>词</span>
      </div>
      <div class="bottom">
        <span class="begin">{{ $store.state.beginTime | time }}</span>
        <el-slider
          :max="$store.state.musicInfo.dt"
          v-model="$store.state.beginTime"
        ></el-slider>
        <span class="end">{{ $store.state.musicInfo.dt | time }}</span>
      </div>
    </div>
    <div class="right">
      <span class="el-icon-more"></span>
      <span class="el-icon-unlock"></span>
      <span class="el-icon-phone"></span>
      <span class="el-icon-s-custom"></span>
      <span class="el-icon-s-unfold"></span>
    </div>
  </div>
</template>

<script>
import { getMusicDetail, getMusicUrl } from "../../network/getMusicListData";
import Like from "../../components/like/Like.vue";
export default {
  data() {
    return {
      begin: 0,
    };
  },
  components: {
    Like,
  },
  created() {},
  filters: {
    time(value) {
      const time = new Date(value);
      const m = time.getMinutes();
      const s = (time.getSeconds() + "").padStart(2, "0");
      return m + ":" + s;
    },
  },
  methods: {
    // 获取音乐详情
    getMusicDetail() {
      getMusicDetail(this.$store.state.musicId)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 播放
    play() {
      if (this.$store.state.musicUrl !== "") {
        this.$store.commit("setIsPlay", true);
      }
      this.$emit("play");
    },
    // 暂停
    pause() {
      if (this.$store.state.musicUrl !== "") {
        this.$store.commit("setIsPlay", false);
      }
      this.$emit("pause");
    },
    // 下一首
    next() {
      let ids = [];
      this.$store.state.playlist.forEach((item) => {
        if (item.song) {
          ids.push(item.song.id);
        } else {
          ids.push(item.id);
        }
      });
      let index = ids.findIndex((item) => {
        return item === this.$store.state.musicId;
      });
      index += 1;
      this.$store.commit("setMusicId", ids[index]);
      getMusicDetail(ids[index])
        .then((res) => {
          let payload = {};
          payload.imgUrl = res.data.songs[0].al.picUrl;
          payload.id = res.data.songs[0].id;
          payload.name = res.data.songs[0].name;
          payload.artist = res.data.songs[0].ar[0].name;
          payload.dt = res.data.songs[0].dt;
          this.$store.commit("setMusicInfo", payload);
        })
        .catch((err) => {
          console.log(err);
        });
      clearInterval(this.$store.state.timer);
      this.$store.state.beginTime = 0;
      this.$store.state.timer = setInterval(() => {
        this.$store.state.beginTime = this.$store.state.beginTime + 1000;
      }, 1000);
      getMusicUrl(ids[index])
        .then((res) => {
          this.$store.commit("setMusicUrl", res.data.data[0].url);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //上一首
    prev() {
      let ids = [];
      this.$store.state.playlist.forEach((item) => {
        if (item.song) {
          ids.push(item.song.id);
        } else {
          ids.push(item.id);
        }
      });
      let index = ids.findIndex((item) => {
        return item === this.$store.state.musicId;
      });
      if (index === 0) {
        index === ids.length;
      } else {
        index -= 1;
      }
      this.$store.commit("setMusicId", ids[index]);
      getMusicDetail(ids[index])
        .then((res) => {
          let payload = {};
          payload.imgUrl = res.data.songs[0].al.picUrl;
          payload.id = res.data.songs[0].id;
          payload.name = res.data.songs[0].name;
          payload.artist = res.data.songs[0].ar[0].name;
          payload.dt = res.data.songs[0].dt;
          this.$store.commit("setMusicInfo", payload);
        })
        .catch((err) => {
          console.log(err);
        });
      clearInterval(this.$store.state.timer);
      this.$store.state.beginTime = 0;
      this.$store.state.timer = setInterval(() => {
        this.$store.state.beginTime = this.$store.state.beginTime + 1000;
      }, 1000);
      getMusicUrl(ids[index])
        .then((res) => {
          this.$store.commit("setMusicUrl", res.data.data[0].url);
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
.music-player {
  width: 100%;
  height: 70px;
  background-color: #fff;
  border-top: 1px solid rgb(184, 184, 184);
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
}
.left {
  width: 250px;
  display: flex;
  align-items: center;
}
.center {
  flex: 1;
  display: flex;
  padding: 5px 0;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
.right {
  display: flex;
  align-items: center;
  width: 250px;
  justify-content: space-around;
}
.left img {
  border-radius: 10px;
  margin: 0 10px;
  width: 50px;
}
.left .name {
  font-size: 15px;
  display: flex;
  align-items: center;
  overflow: hidden;
}
.left .artist {
  margin-top: 5px;
  font-size: 13px;
}
.right span {
  font-size: 22px;
  cursor: pointer;
}
.center .top {
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  width: 50%;
  align-items: center;
}
.center .top span {
  font-size: 14px;
  cursor: pointer;
}
.center .top span:hover {
  color: #a3a3a3;
}
.center .top span:nth-child(2),
.center .top span:nth-child(4) {
  font-size: 25px;
}
.center .top span:nth-child(3) {
  font-size: 35px;
}
.center .top span:nth-child(5) {
  font-size: 14px;
}
.center .bottom {
  width: 80%;
  margin: 0 auto;
  height: 10px;
  align-items: center;
  display: flex;
}
.center .bottom .begin,
.center .bottom .end {
  width: 30px;
  text-align: center;
  font-size: 12px;
  color: #a3a3a3;
}
.center .bottom .el-slider {
  flex: 1;
  margin: 0 10px;
}
::v-deep .el-slider__bar {
  background-color: rgb(231, 96, 96) !important;
}
</style>