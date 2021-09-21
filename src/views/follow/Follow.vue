<template>
  <div class="follow">
    <h3>{{ username }}的关注</h3>
    <follow-list :list="follows"></follow-list>
  </div>
</template>

<script>
import { getProfileDetail, getUserFollows } from "../../network/getProfileData";
import FollowList from "./FollowList.vue";
export default {
  name: "Follow",
  components: { FollowList },
  data() {
    FollowList;
    return {
      username: "", //用户名
      follows: [],
    };
  },
  created() {
    this.getProfileDetail();
    this.getUserFollows();
  },
  methods: {
    // 获取用户详情
    getProfileDetail() {
      getProfileDetail(this.$route.params.id)
        .then((res) => {
          this.username = res.data.profile.nickname;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //获取用户关注列表
    getUserFollows() {
      getUserFollows(this.$route.params.id)
        .then((res) => {
          console.log(res);
          this.follows = res.data.follow;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style scoped >
/* @import url(); 引入css类 */
</style>