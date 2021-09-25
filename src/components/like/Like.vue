<template>
  <div class="like">
    <img
      @click.stop="likeMusic"
      src="../../assets/img/like/添加喜欢.png"
      alt=""
      v-if="!liked"
    />
    <img
      @click.stop="unlikeMusic"
      v-else
      src="../../assets/img/like/取消喜欢.png"
      alt=""
    />
  </div>
</template>

<script>
import {
  likeMusic,
  loginStatus,
  getLikedList,
} from "../../network/getProfileData";
export default {
  name: "Like",
  props: {
    id: {
      type: Number,
      default: 0,
    },
    // liked: {
    //   type: Boolean,
    //   default: false,
    // },
  },
  data() {
    return {
      liked: false,
    };
  },
  created() {
    getLikedList(window.sessionStorage.getItem("userId"))
      .then((res) => {
        if (res.data.ids.indexOf(this.id) !== -1) {
          this.liked = true;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    likeMusic() {
      let query = {};
      query.id = this.id;
      query.like = true;
      loginStatus()
        .then((res) => {
          likeMusic(query)
            .then((res) => {
              this.$message.success({
                message: "喜欢成功",
              });
              this.liked = true;
            })
            .catch((err) => {
              this.$message.error({
                message: err,
              });
            });
        })
        .catch((err) => {
          this.$message.error({
            message: "请先登录",
          });
        });
    },
    unlikeMusic() {
      let query = {};
      query.id = this.id;
      query.like = false;
      loginStatus()
        .then((res) => {
          likeMusic(query)
            .then((res) => {
              this.$message.success({
                message: "取消喜欢成功",
              });
              this.liked = false;
            })
            .catch((err) => {
              this.$message.error({
                message: err,
              });
            });
        })
        .catch((err) => {
          this.$message.error({
            message: "请先登录",
          });
        });
    },
  },
};
</script>

<style scoped>
img {
  cursor: pointer;
  width: 20px;
}
</style>
