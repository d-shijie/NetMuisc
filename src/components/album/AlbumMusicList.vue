<template>
  <div class="music-list">
    <alert :x="x" :y="y" ref="alert" class="alert" :songId="songId"></alert>
    <el-table
      @row-contextmenu="rightClick"
      @row-click="rowClick"
      size="mini"
      :data="songs"
    >
      <el-table-column type="index"></el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <like :id="scope.row.id"></like>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="音乐标题"></el-table-column>
      <el-table-column prop="ar[0].name" label="歌手"></el-table-column>
      <el-table-column prop="al.name" label="专辑"></el-table-column>
      <el-table-column label="时长">
        <template slot-scope="scope">
          {{ scope.row.dt | timeFormat }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Like from "../like/Like";
import { likeMusic } from "../../network/getProfileData";
import { getMusicDetail } from "../../network/getMusicListData";
import Alert from "../alert/Alert.vue";
export default {
  name: "AlbumMusicList",
  components: {
    Like,
    Alert,
  },
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
      songs: [],
      x: "",
      y: "",
      songId: 0,
    };
  },
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
      this.$http
        .get("/song/url", { params: { id: row.id } })
        .then((res) => {
          if (res.data.data[0].url === null) {
            this.$message.error("找不到资源");
          } else {
            this.$store.state.musicUrl = res.data.data[0].url;
          }
        })
        .catch((err) => {
          console.log(err);
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
