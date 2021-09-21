<template>
  <div class="followed">
    <h3>{{ username }}的粉丝</h3>
    <follow-list :list="followeds"></follow-list>
  </div>
</template>

<script>
import {
  getProfileDetail,
  getUserFolloweds,
} from "../../network/getProfileData";
import FollowList from "./FollowList.vue";
export default {
  components: { FollowList },
  name: "Followed",
  data() {
    return {
      username: "",
      followeds: [], //粉丝列表
    };
  },
  created() {
    this.getProfileDetail();
    this.getUserFolloweds();
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
    // 获取用户粉丝列表
    getUserFolloweds() {
      getUserFolloweds(this.$route.params.id)
        .then((res) => {
          
          this.followeds = res.data.followeds;
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