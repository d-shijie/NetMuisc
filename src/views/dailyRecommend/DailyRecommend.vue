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
import PlayList from '../../components/musicList/PlayList.vue';
import { getDailyRecommend } from "../../network/getFindMusicData";
export default {
  name: "DailyReommend",
  components: { Music },
  data() {
    PlayList
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
    getDailyRecommend()
      .then((res) => {
        this.songs = res.data.data.dailySongs;
      })
      .catch((err) => {
        this.$message.error({
          message: "未登录",
        });
      });
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