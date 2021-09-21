<template>
  <div class="gender">
    <h3>{{ username }}的动态</h3>
  </div>
</template>

<script>
import { getUserGender, getProfileDetail } from "../../network/getProfileData";
export default {
  name: "Gender",
  data() {
    return {
      username: "", // 用户名
      events: [], //用户动态
    };
  },
  created() {
    this.getUserGender();
    this.getProfileDetail();
  },
  computed: {
    Events() {
      return this.events === [];
    },
  },
  methods: {
    // 获取用户动态
    getUserGender() {
      getUserGender(this.$route.params.id)
        .then((res) => {
          this.events = res.data.events;
        })
        .catch((err) => {
          console.log(err);
        });
    },
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
  },
};
</script>
<style scoped '>
/* @import url(); 引入css类 */
</style>