<template>
  <div class="videos">
    <div class="tags">
      <span class="name">{{ tagName.name }}</span>
      <ul>
        <li
          @click="itemClick(index)"
          :class="{ active: currentIndex === index }"
          v-for="(item, index) in tags.slice(0, 9)"
          :key="item.id"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
    <div class="videos">
      <div
        @mouseout="videoOut(item, index)"
        @mouseenter="videoEnter(item, index)"
        @click="videoClick(item)"
        class="video"
        ref="video"
        v-for="(item, index) in videos"
        :key="index"
      >
        <span class="play-time">{{ item.data.playTime | playTime }}</span>
        <span class="duration">{{ item.data.durationms | timeFormat }}</span>
        <img ref="img" :src="item.data.coverUrl" alt="" />
        <div class="title">{{ item.data.title }}</div>
        <div class="creator">by {{ item.data.creator.nickname }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getVideoTags } from "../../network/getVideoData";
import { getVideoCategory } from "../../network/getVideoData";
import { getVideos } from "../../network/getVideoData";
export default {
  name: "Videos",
  data() {
    return {
      tags: [], //视频标签
      tagName: "", //视频分类名
      currentIndex: 0, //控制标签样式,
      videos: [], //视频列表
    };
  },
  created() {
    //获取视频标签
    getVideoTags()
      .then((res) => {
        this.tags = res.data.data;
        this.tagName = res.data.data[0];
        this.getVideos(res.data.data[0].id);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  filters: {
    playTime(value) {
      return value > 10000 ? (value / 10000).toFixed(0) + "万" : value;
    },
  },
  methods: {
    //获取视频
    getVideos(id) {
      getVideos(id)
        .then((res) => {
          this.videos = res.data.datas;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 标签点击事件
    itemClick(index) {
      this.currentIndex = index;
      this.tagName = this.tags[index];
      this.getVideos(this.tags[index].id);
    },
    // 视频点击事件
    videoClick(item) {
      this.$router.push("/videoPlay/" + item.data.vid);
    },
    // 鼠标经过切换图片
    videoEnter(item, index) {
      this.$refs.img[index].src = item.data.previewUrl;
    },
    // 鼠标离开换回封面图
    videoOut(item, index) {
      this.$refs.img[index].src = item.data.coverUrl;
    },
  },
};
</script>

<style scoped>
.tags {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.name {
  display: inline-block;
  cursor: pointer;
  font-size: 15px;
  padding: 3px 25px;
  border-radius: 10px;
  color: rgb(63, 62, 62);
  border: 1px solid rgb(190, 190, 190);
}
.name:hover {
  background-color: #f2f2f2;
}
ul {
  display: flex;
}
li {
  padding: 3px 8px;
  cursor: pointer;
  margin: 0 5px;
  border-radius: 10px;
  font-size: 12px;
  color: rgb(61, 61, 61);
}
li:hover {
  color: #000;
}
.active {
  color: rgb(255, 42, 42);
  border: 1px solid #eee;
  background-color: rgb(228, 228, 228);
}
.videos {
  margin: 10px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.video {
  position: relative;
  cursor: pointer;
  margin: 10px 0;
  width: 31%;
}
.play-time,
.duration {
  font-size: 12px;
  color: #fff;
  position: absolute;
  right: 5px;
}
.duration {
  bottom: 45px;
}
.play-time {
  top: 5px;
}
.title {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-size: 13px;
  margin: 5px 0;
}
.creator {
  font-size: 13px;
  color: rgb(122, 122, 122);
}
img {
  border-radius: 10px;
  width: 100%;
}
</style>
