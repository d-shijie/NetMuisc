<template>
  <div class="music">
    <el-table @row-click="rowClick" size="mini" :data="songs" stripe>
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
import Like from "../like/Like.vue";
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
  components: {
    Like,
  },
  created() {},
  methods: {
    rowClick(row) {
      this.$http.get("/song/url", { params: { id: row.id } }).then((res) => {
        this.$store.state.musicUrl = res.data.data[0].url;
      });
    },
  },
};
</script>
<style scoped >
/* @import url(); 引入css类 */
</style>