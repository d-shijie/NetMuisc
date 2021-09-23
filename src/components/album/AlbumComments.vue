<template>
  <div class="album-comments">
    <el-input
      type="textarea"
      :rows="3"
      v-model="content"
      placeholder="请输入内容"
    >
    </el-input>
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
      class="pagination"
      @current-change="pageChange"
      small
      background
      layout="prev, pager, next"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
import { getAlbumComments } from "../../network/getAlbumData";
import Comment from "../comment/Comment";
import { sendComment } from "../../network/getProfileData";
export default {
  name: "AlbumComments",
  components: {
    Comment,
  },
  data() {
    return {
      offset: 0,
      total: 0,
      hotComments: [],
      comments: [],
      content: "",
    };
  },
  created() {
    this.getAlbumComments();
  },
  methods: {
    getAlbumComments() {
      getAlbumComments(this.$route.params.id, 50, this.offset * 50)
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
      this.getAlbumComments();
    },
    refresh() {
      this.getAlbumComments();
    },
    // 发送评论
    send() {
      sendComment(1, 3, this.$route.params.id, this.content)
        .then((res) => {
          this.getAlbumComments();
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
h4 {
  margin: 20px 0;
}
.btns {
  margin-top: 10px;
}
.el-input {
  margin-top: 10px;
}
.send {
  float: right;
}
</style>
