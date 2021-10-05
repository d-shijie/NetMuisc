<template>
  <div class="recent-songs">
    <alert :x="x" :y="y" ref="alert" class="alert" :songId="songId"></alert>
    <el-table
      @row-contextmenu="rightClick"
      @row-click="rowClick"
      size="mini"
      :data="songs"
      stripe
    >
      <el-table-column type="index"></el-table-column>
      <el-table-column label="音乐标题" prop="name">
        <template slot-scope="scope">
          {{ scope.row.song.name }}
        </template>
      </el-table-column>
      <el-table-column label="歌手">
        <template slot-scope="scope">
          {{ scope.row.song.ar[0].name }}
        </template>
      </el-table-column>
      <el-table-column label="播放次数">
        <template slot-scope="scope">
          {{ scope.row.playCount }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getMusicUrl, getMusicDetail } from "../../network/getMusicListData";
import Alert from "../../components/alert/Alert.vue";
export default {
  props: {
    songs: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    Alert,
  },
  data() {
    return {
      songs: [],
      x: "",
      y: "",
      songId: 0,
    };
  },
  created() {},
  methods: {
    rowClick(row) {
      this.$store.commit("setPlaylist", this.songs);
      this.$store.commit("setIsPlay", true);
      getMusicDetail(row.song.id)
        .then((res) => {
          let payload = {};
          payload.imgUrl = res.data.songs[0].al.picUrl;
          payload.id = res.data.songs[0].id;
          payload.name = res.data.songs[0].name;
          payload.artist = res.data.songs[0].ar[0].name;
          payload.dt = res.data.songs[0].dt;
          this.$store.commit("setMusicInfo", payload);
        })
        .catch((err) => {
          console.log(err);
        });
      clearInterval(this.$store.state.timer);
      this.$store.state.beginTime = 0;
      this.$store.state.timer = setInterval(() => {
        this.$store.state.beginTime = this.$store.state.beginTime + 1000;
      }, 1000);
      getMusicUrl(row.song.id)
        .then((res) => {
          this.$store.commit("setMusicUrl", res.data.data[0].url);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 鼠标右键点击 让alert出现在标准位置需双击
    rightClick(row, colum, event) {
      event.preventDefault();
      this.x = event.pageX - 230 + "px";
      this.y = event.pageY - 30 + "px";
      this.songId = row.song.id;
      this.$store.commit("setShowAlert", true);

      this.$refs.alert.setLocation();
    },
  },
};
</script>
<style scoped >
/* @import url(); 引入css类 */
</style>