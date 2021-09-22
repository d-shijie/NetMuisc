<template>
  <div class="dj">
    <div class="detail">
      <img class="dj-icon" :src="djInfo.imgUrl" alt="" />
      <div class="info">
        <h2>{{ djInfo.name }}</h2>
        <div class="nickname">
          <span><img class="dj-head-icon" :src="djInfo.djUrl" alt="" /></span>
          <span @click="gotoProfile(djInfo)">{{ djInfo.creator }}</span>
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
            >订阅({{ djInfo.subCount }})</el-button
          >
          <el-button size="medium" class="el-icon-position" round
            >分享({{ djInfo.shareCount }})</el-button
          >
        </div>
        <div class="desc">
          <span class="category">{{ djInfo.category }}</span>
          <p>{{ djInfo.desc }}</p>
        </div>
      </div>
    </div>
    <Title :title-data="titleData"></Title>
    <router-view></router-view>
  </div>
</template>

<script>
import { getDjDetail } from "../../network/getDjData";
import Title from "../title/Title";
export default {
  name: "Dj",
  components: {
    Title,
  },
  data() {
    return {
      titleData: ["节目", "订阅者"],
      djInfo: {
        imgUrl: "",
        category: "",
        name: "",
        creator: "",
        subCount: 0,
        shareCount: 0,
        desc: "",
        programCount: "",
        djUrl: "",
      },
    };
  },
  created() {
    this.getDjDetail();
  },
  methods: {
    getDjDetail() {
      getDjDetail(this.$route.params.id)
        .then((res) => {
          const result = res.data.data;
          this.djInfo.imgUrl = result.picUrl;
          this.djInfo.category = result.category;
          this.djInfo.name = result.name;
          this.djInfo.creator = result.dj.nickname;
          this.djInfo.subCount = result.subCount;
          this.djInfo.shareCount = result.shareCount;
          this.djInfo.desc = result.desc;
          this.djInfo.programCount = result.programCount;
          this.djInfo.djUrl = result.dj.avatarUrl;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    gotoProfile(info) {
      console.log(info);
    },
  },
};
</script>

<style scoped>
.nickname {
  color: #9b9bf3;
  font-size: 12px;
  margin: 15px 0;
}
.info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.detail {
  display: flex;
}
.desc {
  font-size: 12px;
}
.category {
  border: 1px solid #e8e869;
  color: #eeee8b;
}
.dj-icon {
  margin-right: 15px;
  width: 200px;
  height: 200px;
  border-radius: 10px;
}
.dj-head-icon {
  width: 25px;
  height: 25px;
  margin-right: 5px;
  border-radius: 50%;
}
</style>
