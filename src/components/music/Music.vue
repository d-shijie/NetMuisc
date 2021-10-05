<template>
  <div class="music">
    <alert :x="x" :y="y" ref="alert" class="alert" :songId="songId"></alert>
    <el-table
      @row-contextmenu="rightClick"
      @row-click="rowClick"
      size="mini"
      :data="songs"
      stripe
    >
      <el-table-column type="index"></el-table-column>
      <el-table-column width="50px">
        <template slot-scope="scope">
          <Like :id="scope.row.id"></Like>
        </template>
      </el-table-column>
      <el-table-column label="音乐标题" prop="name"></el-table-column>
      <el-table-column label="歌手">
        <template slot-scope="scope">
          {{ scope.row.ar[0].name }}
        </template>
      </el-table-column>
      <el-table-column label="专辑" prop="al.name"></el-table-column>
      <el-table-column label="时长">
        <template slot-scope="scope">
          {{ scope.row.dt | timeFormat }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Alert from "../alert/Alert.vue";
import Like from "../like/Like.vue";
import { getMusicDetail } from "../../network/getMusicListData";
export default {
  props: {
    songs: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      x: "",
      y: "",
      songId: 0,
    };
  },
  components: {
    Like,
    Alert,
  },
  created() {},
  methods: {
    rowClick(row) {
       this.$store.commit("setPlaylist", this.songs);
      getMusicDetail(row.id)
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
      this.$http.get("/song/url", { params: { id: row.id } }).then((res) => {
        this.$store.state.musicUrl = res.data.data[0].url;
      });
    },
    // 鼠标右键点击 让alert出现在标准位置需双击
    rightClick(row, colum, event) {
      event.preventDefault();
      this.x = event.pageX - 250 + "px";
      this.y = event.pageY - 30 + "px";
      this.songId = row.id;
      this.$store.commit("setShowAlert", true);
      this.$refs.alert.setLocation();
    },
  },
};
</script>
<style scoped >
/* @import url(); 引入css类 */
</style>