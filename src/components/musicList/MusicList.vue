<template>
  <div class="music-list">
    <div class="detail">
      <img class="album-pic" :src="musicListDetail.imgUrl" alt="" />
      <div class="info">
        <h2>{{ musicListDetail.musicListName }}</h2>
        <div class="creator">
          <span
            ><img :src="musicListDetail.creatorUrl" alt="" />{{
              musicListDetail.creator
            }}</span
          >
          <span>{{ musicListDetail.createTime | dateFormat }}创建</span>
        </div>
        <div class="choices">
          <el-button
            type="danger"
            class="el-icon-video-play"
            size="medium"
            round
            >播放全部</el-button
          >
          <el-button size="medium" class="el-icon-folder-add" round
            >收藏{{ "(" + subCount + ")" }}</el-button
          >
          <el-button size="medium" class="el-icon-position" round
            >分享{{ "(" + musicListDetail.shareCount + ")" }}</el-button
          >
          <el-button size="medium" class="el-icon-download" round
            >VIP下载</el-button
          >
        </div>
        <div class="tags">标签:{{ musicListDetail.tags.join("/") }}</div>
        <div class="size">
          <span>歌曲:{{ musicListDetail.size }}</span>
          <span>播放:{{ musicListDetail.playCount | countFilter }}</span>
        </div>
        <div class="desc">简介:{{ desc }}</div>
      </div>
    </div>
    <Title :title-data="titleData"></Title>
    <router-view></router-view>
  </div>
</template>

<script>
import { getMusicListDetail } from "../../network/getMusicListData";
import Title from "../title/Title";
export default {
  name: "MusicList",
  data() {
    return {
      musicListDetail: {
        imgUrl: "",
        commentCount: 0,
        subCount: 0,
        shareCount: 0,
        size: 0,
        playCount: 0,
        tags: [],
        creator: "",
        createTime: "",
        musicListName: "",
        creatorUrl: "",
        desc: "",
      },
      titleData: ["歌曲列表", "评论", "收藏者"],
    };
  },
  components: {
    Title,
  },
  computed: {
    subCount() {
      return this.musicListDetail.subCount > 10000
        ? (this.musicListDetail.subCount / 10000).toFixed(0) + "万"
        : this.musicListDetail.subCount;
    },
    desc() {
      return this.musicListDetail.desc.length > 50
        ? "太多了......"
        : this.musicListDetail.desc;
    },
  },
  created() {
    this.getMusicListDetail();
  },
  methods: {
    getMusicListDetail() {
      getMusicListDetail(this.$route.params.id)
        .then((res) => {
          console.log(res);
          const result = res.data.playlist;
          this.musicListDetail.imgUrl = result.coverImgUrl;
          this.musicListDetail.commentCount = result.commentCount;
          this.musicListDetail.subCount = result.subscribedCount;
          this.musicListDetail.shareCount = result.shareCount;
          this.musicListDetail.size = result.trackCount;
          this.musicListDetail.playCount = result.playCount;
          this.musicListDetail.tags = result.tags;
          this.musicListDetail.creator = result.creator.nickname;
          this.musicListDetail.createTime = result.createTime;
          this.musicListDetail.musicListName = result.name;
          this.musicListDetail.creatorUrl = result.creator.avatarUrl;
          this.musicListDetail.desc = result.description;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  filters: {
    countFilter(value) {
      return value > 10000 ? (value / 10000).toFixed(0) + "万" : value;
    },
  },
};
</script>

<style scoped>
img {
  width: 200px;
  height: 200px;
  border-radius: 10px;
}
.detail {
  display: flex;
}
span {
  margin-right: 20px;
}
.info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 15px;
}
.info img {
  width: 25px;
  height: 25px;
  border-radius: 50%;
}
.creator {
  display: flex;
  align-items: center;
  color: #797979;
  font-size: 12px;
}
.tags,
.size,
.desc {
  color: #5e5e5e;
  font-size: 13px;
}
</style>
