<template>
  <div class="video-play">
    <div class="left">
      <h4 @click="back">< 视频详情</h4>
      <video :src="videoUrl" autoplay controls></video>
      <div class="creator">
        <span class="nickname">
          <span><img :src="creatorInfo.avatarUrl" alt="" /></span>
          <span class="name">{{ creatorInfo.nickname }}</span>
        </span>
        <span class="like"> <el-button size="mini">关注</el-button> </span>
      </div>
      <h3>{{ videoDetail.title }}</h3>
      <div class="time">
        <span class="pubilish-time">
          发布: {{ videoDetail.publishTime | dateFormat }}
        </span>
        <span class="play-time">
          播放: {{ videoDetail.playTime | playTime }}
        </span>
      </div>
      <div class="tags">
        <span
          class="tag"
          v-for="(item, index) in videoDetail.videoGroup"
          :key="item.id"
        >
          {{ item.name }}
        </span>
      </div>
      <div class="btns">
        <el-button
          :class="{ active: videoInfo.liked }"
          class="el-icon-thumb"
          size="medium"
          round
          >赞({{ videoInfo.likedCount }})</el-button
        >

        <el-button class="el-icon-folder-add" size="medium" round
          >收藏</el-button
        >

        <el-button class="el-icon-position" size="medium" round
          >分享({{ videoInfo.shareCount }})</el-button
        >
        <a>举报</a>
      </div>
      <h4>热门评论</h4>
      <comment :comments="hotComments"></comment>
      <h4>最新评论</h4>
      <comment :comments="comments"></comment>
      <el-pagination
        class="pagination"
        @current-change="pageChange"
        small
        background
        layout="prev, pager, next"
        :total="total"
      >
      </el-pagination>
    </div>
    <div class="right">
      <h4>相关推荐</h4>
      <div
        @click="goto(item.vid)"
        class="video"
        v-for="(item, index) in similarVideos"
        :key="item.vid"
      >
        <img :src="item.coverUrl" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import Comment from "../../components/comment/Comment.vue";

import {
  getVideoUrl,
  getVideoDetail,
  getSimilarVideos,
  getVideoInfo,
  getVideoComment,
} from "../../network/getVideoData";
export default {
  components: { Comment },
  name: "VideoPlay",
  data() {
    return {
      videoUrl: "",// 视频播放地址
      creatorInfo: {},// 作者信息
      videoDetail: {},// 视频详情
      videoInfo: {},// 视频数据
      hotComments: [],//热门评论
      comments: [],// 评论列表
      total: 0,//评论总数
      offset: 0,// 评论页数
      similarVideos: [],//相似视频
    };
  },
  filters: {
    playTime(value) {
      return value > 10000 ? (value / 10000).toFixed(0) + "万" : value;
    },
  },
  created() {
    this.getVideoUrl(this.$route.params.id);
    this.getVideoDetail(this.$route.params.id);
    this.getVideoInfo(this.$route.params.id);
    this.getVideoComment();
    this.getSimilarVideos(this.$route.params.id);
  },
  methods: {
      // 获取视频播放地址
    getVideoUrl(id) {
      getVideoUrl(id)
        .then((res) => {
          this.videoUrl = res.data.urls[0].url;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 获取视频详情
    getVideoDetail(id) {
      getVideoDetail(id)
        .then((res) => {
          this.videoDetail = res.data.data;
          this.creatorInfo = res.data.data.creator;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 获取视频数据
    getVideoInfo(id) {
      getVideoInfo(id)
        .then((res) => {
          this.videoInfo = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //获取评论列表
    getVideoComment() {
      getVideoComment(this.$route.params.id, 50, this.offset * 50)
        .then((res) => {
          this.hotComments = res.data.hotComments;
          this.comments = res.data.comments;
          this.total = res.data.total;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 获取相似视频
    getSimilarVideos(id) {
      getSimilarVideos(id)
        .then((res) => {
          this.similarVideos = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    pageChange(page) {
      this.offset = page;
      this.getVideoComment();
    },
    back() {
      this.$router.go(-1);
    },
    goto(id) {
      this.$router.push("/videoPlay/" + id);
      this.getVideoUrl(this.$route.params.id);
      this.getVideoDetail(this.$route.params.id);
      this.getVideoInfo(this.$route.params.id);
      this.getVideoComment();
      this.getSimilarVideos(this.$route.params.id);
    },
  },
};
</script>
<style scoped >
/* @import url(); 引入css类 */
.video-play {
  display: flex;
}
.left {
  flex: 4;
}
h4 {
  cursor: pointer;
}
video {
  width: 100%;
  margin: 10px 0;
}
.creator {
  margin-bottom: 20px;
}
.nickname {
  display: inline-block;
  height: 50px;
}
.nickname img {
  width: 50px;
  border-radius: 50%;
}
.name {
  margin-left: 5px;
  font-size: 15px;
  color: rgb(51, 51, 51);
}
.creator .el-button {
  float: right;
}
.time {
  margin: 10px 0;
  font-size: 12px;
  color: #ccc;
}
.time span {
  margin-right: 20px;
}
.tags .tag {
  display: inline-block;
  font-size: 12px;
  padding: 2px 5px;
  border-radius: 10px;
  margin-right: 5px;
  background-color: #f2f2f2;
}
.btns {
  margin: 10px 0;
}
.btns a {
  float: right;
  font-size: 12px;
  color: rgb(146, 146, 146);
  text-decoration: underline;
  cursor: pointer;
  margin-top: 10px;
}
a:hover {
  color: #000;
}
.right {
  margin-left: 20px;
  flex: 2;
}
.video {
  width: 100%;
  margin: 10px 0;
}
.video img {
  width: 80%;
  height: 120px;
  cursor: pointer;
  border-radius: 10px;
}
.active {
  color: red !important;
}
</style>