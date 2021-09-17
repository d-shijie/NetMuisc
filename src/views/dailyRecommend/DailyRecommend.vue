<template>
  <div class="daily-recommend">
    <div class="date">
      <span class="now">{{ nowDay }}</span>
      <span class="desc">每日歌曲推荐</span>
    </div>
    <music :songs="songs"></music>
  </div>
</template>

<script>
import Music from "../../components/music/Music.vue";

export default {
  name: "DailyReommend",
  components: { Music },
  data() {
    return {
      songs: [],
    };
  },
  computed: {
    nowDay() {
      let time = new Date();
      let d = time.getDate();
      return d;
    },
  },
  created() {
    this.songs = this.$store.state.dailyRecommend;
  },
  methods: {},
};
</script>
<style scoped >
/* @import url(); 引入css类 */
.date {
}
.now {
  display: inline-block;
  font-size: 30px;
  padding: 20px;
  color: red;
  font-weight: 600;
  border-radius: 10px;
  border: 4px solid red;
}
.desc {
  display: inline-block;
  font-size: 18px;
  font-weight: 600;
  margin-left: 10px;
}
</style>