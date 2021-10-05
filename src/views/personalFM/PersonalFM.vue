<template>
  <div class="personal-fm">
    <div class="left">
      <div class="cover">
        <span v-if="isShowPlay === true" @click="play"
          ><img class="play" src="../../assets/img/play/播放.png" alt=""
        /></span>
        <span v-else @click="pause"
          ><img
            class="el-icon-video-pause"
            src="../../assets/img/play/暂停.png"
            alt=""
        /></span>
        <img class="cover-img" :src="coverUrl" alt="" />
      </div>
      <div class="btns">
        <el-button class="el-icon-star-off" circle> </el-button>
        <el-button class="el-icon-delete" circle> </el-button>
        <el-button @click="next" class="el-icon-caret-right" circle>
        </el-button>
        <el-button class="el-icon-loading" circle> </el-button>
      </div>
    </div>
    <div class="right">
      <div class="info">
        <h2>{{ fmInfo.name }}</h2>
        <div class="detail">
          <span style="color: #575757; font-size: 12px"
            >专辑:{{ fmInfo.album }}</span
          >
          <span style="color: #575757; font-size: 12px"
            >歌手:{{ fmInfo.singer }}</span
          >
        </div>
        <div class="box">
          <div ref="box" class="lyric">
            <div
              :data-index="index"
              ref="lyric"
              :class="{ active: lyricIndex === index }"
              class="text"
              v-for="(item, index) in lyricArr"
            >
              {{ item.lyric }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getPersonalFMs } from "../../network/getPeosonalFM";
import { getLyric } from "../../network/getPeosonalFM";

export default {
  name: "PersonalFM",
  props: {
    isShowPlay: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      fms: [],
      index: 0,
      coverUrl: "",
      fmInfo: {
        name: "",
        album: "",
        singer: "",
        mvid: "",
        id: "",
        lyric: "",
      },
      lyricArr: [],
      lineArr: [],
      lyricIndex: 1,
      currentTime: 0,
    };
  },
  created() {
    this.$store.state.musicInfo = {
      imgUrl: "https://img0.baidu.com/it/u=2926187340,947096600&fm=15&fmt=auto",
      id: 0,
      name: "歌曲",
      artist: "歌手",
      dt: 0,
    };
    this.getPersonalFMs();
    this.$bus.$on("timeUpdate", (time) => {
      for (let i = 0; i < this.lyricArr.length; i++) {
        if (time > parseInt(this.lyricArr[i].time)) {
          const index = this.$refs.lyric[i].dataset.index;
          if (i === parseInt(index)) {
            this.lyricIndex = i;
            this.$refs.box.style.transform = `translateY(${
              170 - 30 * (i + 1)
            }px)`;
          }
        }
      }
    });
  },
  methods: {
    getPersonalFMs() {
      getPersonalFMs()
        .then((res) => {
          this.coverUrl = res.data.data[this.index].album.picUrl;
          this.fmInfo.name = res.data.data[this.index].name;
          this.fmInfo.album = res.data.data[this.index].album.name;
          this.fmInfo.singer = res.data.data[this.index].artists[0].name;
          this.fmInfo.mvid = res.data.data[this.index].mvid;
          this.fms = res.data.data;
          this.fmInfo.id = res.data.data[this.index].privilege.id;
          getLyric(this.fmInfo.id)
            .then((res) => {
              this.fmInfo.lyric = res.data.lrc.lyric;
              this.lineArr = this.fmInfo.lyric.split("\n");
              const regTime = /\[\d{2}:\d{2}.\d{2,3}\]/;
              this.lineArr.forEach((item) => {
                if (item === "") return;
                const obj = {};
                const time = item.match(regTime);
                obj.lyric =
                  item.split("]")[1].trim() === ""
                    ? ""
                    : item.split("]")[1].trim();
                obj.time = time
                  ? this.formatLyricTime(time[0].slice(1, time[0].length - 1))
                  : 0;
                obj.uid = Math.random().toString().slice(-6);
                if (obj.lyric === "") {
                } else {
                  this.lyricArr.push(obj);
                }
              });
            })
            .cache((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    play() {
      this.$http
        .get("/song/url", { params: { id: this.fmInfo.id } })
        .then((res) => {
          this.$store.state.musicUrl = res.data.data[0].url;
        })
        .catch((err) => {
          console.log(err);
        });
      this.$emit("play");
    },
    pause() {
      this.$emit("pause");
    },
    next() {
      if (this.index === this.fms.length - 1) {
        location.reload();
      }
      getLyric(this.fmInfo.id).then((res) => {
        this.index++;
        this.getPersonalFMs();
        this.pause();
        this.currentTime = 0;
        this.fmInfo.lyric = res.data.lrc.lyric;
        this.lineArr = this.fmInfo.lyric.split("\n");
        const regTime = /\[\d{2}:\d{2}.\d{2,3}\]/;
        this.lineArr.forEach((item) => {
          if (item === "") return;
          const obj = {};
          const time = item.match(regTime);
          obj.lyric =
            item.split("]")[1].trim() === "" ? "" : item.split("]")[1].trim();
          obj.time = time
            ? this.formatLyricTime(time[0].slice(1, time[0].length - 1))
            : 0;
          obj.uid = Math.random().toString().slice(-6);
          if (obj.lyric === "") {
          } else {
            this.lyricArr.push(obj);
          }
        });
      });
    },
    formatLyricTime(time) {
      const regMin = /.*:/;
      const regSec = /:.*\./;
      const regMs = /\./;
      const min = parseInt(time.match(regMin)[0].slice(0, 2));
      let sec = parseInt(time.match(regSec)[0].slice(1, 3));
      const ms = time.slice(
        time.match(regMs).index + 1,
        time.match(regMs).index + 3
      );
      if (min !== 0) {
        sec += min * 60;
      }
      return Number(sec + "." + ms);
    },
  },
};
</script>

<style scoped>
.text {
  margin: 10px 0;
  color: #5c5c5c;
  font-size: 14px;
}
.detail {
  margin-top: 25px;
  align-items: center;
  display: flex;
  justify-content: space-between;
}
.lyric {
  margin-top: 30px;
  padding: 0 30px 0 15px;
  height: 400px;
}
.btns {
  width: 70%;
  display: flex;
  margin-top: 30px;
  justify-content: space-between;
  margin-left: 50%;
  transform: translateX(-50%);
}
.cover {
  margin-top: 50px;
  position: relative;
  margin-left: 50%;
  transform: translateX(-50%);
  width: 70%;
  position: relative;
}
.cover span {
  cursor: pointer;
  position: absolute;
  width: 50px;
  height: 50px;
}
.cover span:nth-child(1) {
  margin-top: 50%;
  transform: translate(-50%, -50%);
  margin-left: 50%;
}
.cover span:nth-child(2) {
  right: 5px;
  bottom: 5px;
}
.cover span img {
  width: 100%;
}
.cover-img {
  border-radius: 10px;
  width: 100%;
}
.personal-fm {
  display: flex;
}
.left {
  width: 50%;
}
.right {
  width: 50%;
}
.active {
  font-weight: 800 !important;
  color: #000000;
}
.box {
  margin: 30px 0;
  overflow: hidden;
}
</style>
