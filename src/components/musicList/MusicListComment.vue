<template>
  <div class="music-list-comment">
    <el-input v-model="content" type="textarea" :rows="3"> </el-input>
    <div class="btns">
      <el-button size="mini" round>@</el-button>
      <el-button size="mini" round>#</el-button>
      <el-button @click="send" class="send" size="mini" round>发送</el-button>
    </div>
    <h4>精彩评论</h4>
    <Comment @refresh="refresh" :comments="hotComments"></Comment>
    <h4>最新评论</h4>
    <Comment @refresh="refresh" :comments="comments"></Comment>
    <el-pagination
      small
      @current-change="pageChange"
      :page-size="30"
      background
      layout="prev, pager, next"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
import { getMusicListComments } from "../../network/getMusicListData";
import Comment from "../comment/Comment";
import { sendComment } from "../../network/getProfileData";
export default {
  name: "MusicListComment",
  components: {
    Comment,
  },
  data() {
    return {
      offset: 0,//评论分页
      total: 0,// 评论总数
      hotComments: [],//热门评论
      comments: [],// 评论列表
      content: "",//发送的评论
    };
  },
  created() {
    this.getMusicListComments();
  },
  methods: {
    // 获取歌单评论
    getMusicListComments() {
      getMusicListComments(this.$route.params.id, 30, this.offset * 30)
        .then((res) => {
          this.hotComments = res.data.hotComments;
          this.comments = res.data.comments;
          this.total = res.data.total;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    pageChange(page) {
      this.offset = page;
      this.getMusicListComments();
    },
    refresh() {
      this.getMusicListComments();
    },
    // 发送评论
    send() {
      sendComment(1, 2, this.$route.params.id, this.content)
        .then((res) => {
          this.getMusicListComments();
          this.content = "";
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.btns {
  margin: 10px 0 20px 0;
}
.send {
  float: right;
}
</style>
