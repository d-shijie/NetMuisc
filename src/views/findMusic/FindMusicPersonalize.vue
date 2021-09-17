<template>
  <div class="personalize">
    <el-carousel :interval="5000" type="card" height="200px">
      <el-carousel-item v-for="(item, index) in banners" :key="index">
        <img class="banner" :src="item.imageUrl" alt="" />
      </el-carousel-item>
    </el-carousel>
    <SmallTitle :text="'推荐歌单'"></SmallTitle>
    <div class="recommend-music-list">
      <div @click="goto" class="everyday-recommend">
        <img src="../../assets/img/login/音乐.png" alt="" />
        <p>每日歌曲推荐 {{nowDay}}号</p>
      </div>
      <div
        @mouseenter="mouseEnter(index)"
        @mouseout="mouseOut"
        @click="itemClick(item)"
        class="item"
        v-for="(item, index) in recommendMusicList"
        :key="index"
      >
        <div class="img">
          <span>
            <img
              v-if="currentIndex === index"
              class="play"
              src="../../assets/img/play/播放.png"
              alt=""
            />
          </span>
          <img class="cover" :src="item.picUrl" alt="" />
        </div>
        <p>{{ item.name }}</p>
      </div>
    </div>
    <SmallTitle :text="'独家放送'"></SmallTitle>
    <div class="unique">
      <div
        @mouseenter="currentIndex1 = index"
        @mouseout="currentIndex1 = ''"
        @click="uniqueClick(item)"
        class="unique-item"
        v-for="(item, index) in unique"
      >
        <div class="unique-cover">
          <img
            v-if="currentIndex1 === index"
            class="play2"
            src="../../assets/img/play/播放.png"
            alt=""
          />
          <img :src="item.picUrl" alt="" />
        </div>
        <p>{{ item.name }}</p>
      </div>
    </div>
    <SmallTitle :text="'最新音乐'"></SmallTitle>
    <div class="new-music">
      <div class="new-music-item" v-for="(item, index) in newMusic">
        <div @click="newMusicItemClick(item)" class="new-music-item-img">
          <img :src="item.picUrl" alt="" />
        </div>
        <div class="new-music-item-info">
          <p style="font-size: 12px">{{ item.name }}</p>
          <div class="new-music-item-detail">
            <span style="margin-right: 5px" v-if="item.song.mvid !== 0"
              ><MVButton :mvid="item.song.mvid"></MVButton
            ></span>
            <span style="font-size: 12px; color: #8e8e8e">{{
              item.song.artists[0].name
            }}</span>
          </div>
        </div>
      </div>
    </div>
    <SmallTitle :text="'推荐MV'"></SmallTitle>
    <div class="recommend-mv">
      <div
        @click="$router.push('/mv/' + item.id)"
        class="recommend-mv-item"
        v-for="(item, index) in recommendMV"
      >
        <span class="el-icon-video-play">{{ item.playCount }}</span>
        <img :src="item.picUrl" alt="" />
        <p>{{ item.name }}</p>
      </div>
    </div>
    <SmallTitle :text="'主播电台'"></SmallTitle>
    <div class="recommend-djs">
      <div
        @click="$router.push('/dj/' + item.id)"
        class="recommend-djs-item"
        v-for="(item, index) in recommendDjs"
      >
        <img :src="item.picUrl" alt="" />
        <p>{{ item.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { getFindMusicBanner } from "../../network/getFindMusicData";
import { getFindMusicPersonalizeMusicList } from "../../network/getFindMusicData";
import { getNotLoginFindMusicPersonalizeMusicList } from "../../network/getFindMusicData";
import { getFindMusicUnique } from "../../network/getFindMusicData";
import { getFindMusicNewMusic } from "../../network/getFindMusicData";
import { getRecommendMV } from "../../network/getFindMusicData";
import { getRecommendDjs } from "../../network/getFindMusicData";
import SmallTitle from "./SmallTitle";
import MVButton from "../../components/mv/MVButton";
export default {
  name: "FindMusicPersonalize",
  components: {
    SmallTitle,
    MVButton,
  },
  data() {
    return {
      banners: [],
      recommendMusicList: [],
      currentIndex: "",
      unique: [],
      currentIndex1: "",
      newMusic: [],
      recommendMV: [],
      recommendDjs: [],
    };
  },
  computed: {
    nowDay() {
      let day=new Date()
      let d=day.getDate()
      return d
    },
  },
  created() {
    this.getFindMusicBanner();
    this.getNotLoginFindMusicPersonalizeMusicList();
    this.getFindMusicUnique();
    this.getFindMusicNewMusic();
    this.getRecommendMV();
    this.getRecommendDjs();
  },
  mounted() {},
  methods: {
    getFindMusicBanner() {
      getFindMusicBanner(0)
        .then((res) => {
          this.banners = res.data.banners;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getNotLoginFindMusicPersonalizeMusicList() {
      getNotLoginFindMusicPersonalizeMusicList(9)
        .then((res) => {
          this.recommendMusicList = res.data.result;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getFindMusicUnique() {
      getFindMusicUnique(3)
        .then((res) => {
          this.unique = res.data.result;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getFindMusicNewMusic() {
      getFindMusicNewMusic(12)
        .then((res) => {
          this.newMusic = res.data.result;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getRecommendMV() {
      getRecommendMV()
        .then((res) => {
          this.recommendMV = res.data.result;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getRecommendDjs() {
      getRecommendDjs()
        .then((res) => {
          this.recommendDjs = res.data.result;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    itemClick(item) {
      this.$router.push("/musiclist/" + item.id);
    },
    mouseEnter(index) {
      this.currentIndex = index;
    },
    mouseOut() {
      this.currentIndex = "";
    },
    uniqueClick(item) {
      this.$router.push("/mv/" + item.id);
    },
    newMusicItemClick(item) {
      this.$http
        .get("/song/url", { params: { id: item.id } })
        .then((res) => {
          console.log(res);
          this.$store.state.musicUrl = res.data.data[0].url;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    goto() {
      if (window.sessionStorage.getItem("userId")) {
        this.$router.push("/dailyRecommend");
      } else {
        this.$message.error({
          message: "登陆后获取",
        });
      }
    },
  },
};
</script>

<style scoped>
.recommend-djs {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.recommend-djs-item {
  width: 28%;
  height: 150px;
  margin: 10px;
}
.recommend-djs-item img {
}
.recommend-mv {
  margin-bottom: 50px;
  display: flex;
  justify-content: space-between;
}
.recommend-mv-item {
  cursor: pointer;
  width: 24%;
}
.recommend-mv-item span:nth-child(1) {
  position: absolute;
  z-index: 1000;
}
.new-music-item-detail {
  display: flex;
  align-items: center;
}
.new-music-item {
  position: relative;
  display: flex;
  margin: 5px;
}
.new-music-item-info {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.new-music-item .new-music-item-img {
  position: relative;
  margin-right: 5px;
  cursor: pointer;
}
.new-music-item .new-music-item-img img {
  width: 60px;
  height: 60px;
}
.new-music {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.new-music-item {
  width: 32%;
}
.unique {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}
.unique-item {
  cursor: pointer;
  width: 32%;
}
.unique-cover {
  position: relative;
}
.unique-cover .play2 {
  left: 5px;
  top: 3px;
  width: 30px;
  height: 30px;
  position: absolute;
}
.unique-item img {
  height: 140px;
}
img {
  width: 100%;
  height: 100%;
  border-radius: 10px;
}
.everyday-recommend {
  width: 18%;
}
.everyday-recommend img {
  height: 120px;
  margin-top: 10px;
  border: 1px solid #eeeeee;
  cursor: pointer;
}
.item {
  cursor: pointer;
  margin: 10px;
  width: 16%;
}
.recommend-music-list {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.img {
  position: relative;
}
p {
  margin-top: 5px;
  font-size: 14px;
}
.img span {
  position: absolute;
  bottom: 3px;
  right: 3px;
}
.play {
  width: 30px;
  height: 30px;
}
</style>
