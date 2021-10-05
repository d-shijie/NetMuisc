<template>
  <div class="cloud">
    <div v-if="show">
      <h3>我的音乐云盘</h3>
      <alert
        :x="x"
        :y="y"
        ref="alert"
        class="alert"
        :titles="titles"
        :styles="styles"
        :songId="songId"
        @delete="deleteSuccess"
      ></alert>
      <div class="btns">
        <el-button round size="medium" type="danger">▶ 播放全部</el-button>
        <el-button round size="mini">➕ 上传音乐</el-button>
      </div>
      <el-table
        @row-contextmenu="rightClick"
        @row-click="rowClick"
        size="mini"
        :data="songs"
        stripe
      >
        <el-table-column type="index"></el-table-column>
        <el-table-column label="音乐标题" prop="songName"></el-table-column>
        <el-table-column label="歌手">
          <template slot-scope="scope">
            {{ scope.row.artist | artist }}
          </template>
        </el-table-column>
        <el-table-column label="专辑" prop="album"></el-table-column>
        <el-table-column label="大小">
          <template slot-scope="scope">
            {{ scope.row.fileSize | size }}
          </template>
        </el-table-column>
        <el-table-column label="上传时间">
          <template slot-scope="scope">
            {{ scope.row.addTime | dateFormat }}
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-if="!show">请登录</div>
  </div>
</template>

<script>
import { getUserCloud, deleteCloudMusic } from "../../network/getCloudData";
import { getMusicUrl, getMusicDetail } from "../../network/getMusicListData";
import Alert from "../../components/alert/Alert.vue";
export default {
  data() {
    return {
      songs: [],
      titles: ["删除"],
      styles: ["el-icon-delete"],
      x: "",
      y: "",
      songId: 0,
    };
  },
  components: {
    Alert,
  },
  computed: {
    show() {
      if (window.localStorage.getItem("userId")) {
        return true;
      } else {
        return false;
      }
    },
  },
  filters: {
    size(value) {
      return (value / 1024 / 1024).toFixed(1) + "M";
    },
    artist(value) {
      let arr = value.split("+");
      let str = arr.join("/");
      return str;
    },
  },
  created() {
    this.getUserCloud();
  },
  methods: {
    //获取云盘数据
    getUserCloud() {
      getUserCloud()
        .then((res) => {
          this.songs = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    rowClick(row) {
      this.$store.commit("setPlaylist", this.songs);
      getMusicDetail(row.simpleSong.id)
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
      getMusicUrl(row.simpleSong.id)
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
      this.x = event.pageX + "px";
      this.y = event.pageY - 30 + "px";
      this.songId = row.simpleSong.id;
      this.$store.commit("setShowAlert", true);
      this.$refs.alert.setLocation();
    },
    deleteSuccess() {
      this.getUserCloud();
    },
  },
};
</script>
<style scoped>
/* @import url(); 引入css类 */
.btns {
  margin: 20px 0;
}
.alert {
  position: absolute;
}
</style>