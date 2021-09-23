<template>
  <div class="like">
    <img
      @click.stop="likeMusic"
      src="../../assets/img/like/添加喜欢.png"
      alt=""
    />
    <img
      @click="unlikeMusic"
      v-if="false"
      src="../../assets/img/like/取消喜欢.png"
      alt=""
    />
  </div>
</template>

<script>
import { likeMusic } from "../../network/getProfileData";
export default {
  name: "Like",
  props: {
    id: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    likeMusic() {
      let query = {};
      query.id = this.id;
      query.like = true;
      likeMusic(query)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          this.$message.error({
            message: err + "(好像是服务器错误，传递的参数符合要求)",
          });
        });
    },
    unlikeMusic() {},
  },
};
</script>

<style scoped>
img {
  cursor: pointer;
  width: 20px;
}
</style>
