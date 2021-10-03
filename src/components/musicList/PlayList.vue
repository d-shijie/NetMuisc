<template>
  <div class="play-list">
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
import { getMusicListDetail } from "../../network/getMusicListData";
import Like from "../like/Like";
import Alert from "../alert/Alert.vue";
export default {
  name: "PlayList",
  data() {
    return {
      songs: [],
      x: "",
      y: "",
      songId: 0,
    };
  },
  components: {
    Like,
    Alert,
  },
  created() {
    this.getMusicListSongs();
  },
  methods: {
    getMusicListSongs() {
      getMusicListDetail(this.$route.params.id)
        .then((res) => {
          if (res.data.playlist.trackIds > res.data.playlist.tracks) {
            this.$message.info("登陆后获取全部音乐");
          }
          this.songs = res.data.playlist.tracks;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    rowClick(row) {
      this.$http.get("/song/url", { params: { id: row.id } }).then((res) => {
        this.$store.state.musicUrl = res.data.data[0].url;
      });
    },
    // 鼠标右键点击 让alert出现在标准位置需双击
    rightClick(row, colum, event) {
      event.preventDefault();
      this.x = event.pageX + "px";
      this.y = event.pageY - 30 + "px";
      this.songId = row.id;
      this.$store.commit("setShowAlert", true);
      this.$refs.alert.setLocation();
    },
  },
};
</script>

<style scoped>
</style>
