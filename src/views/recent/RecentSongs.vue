<template>
  <div class="recent-songs">
    <el-table @row-click="rowClick" size="mini" :data="songs" stripe>
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
import { getMusicUrl } from "../../network/getMusicListData";
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
    return {};
  },
  created() {},
  methods: {
    rowClick(row) {
      getMusicUrl(row.song.id)
        .then((res) => {
          this.$store.commit("setMusicUrl", res.data.data[0].url);
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