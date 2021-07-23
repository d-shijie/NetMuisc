<template>
  <div class="top-fifty-mid">
    <el-table @row-click="rowClick" :data="hotAlbums">
      <el-table-column width="100px">
        <template slot-scope="scope">
          <img :src="scope.row.picUrl" alt="">
        </template>
      </el-table-column>
      <el-table-column prop="name"></el-table-column>
      <el-table-column >
        <template slot-scope="scope">
          {{scope.row.size}}首
        </template>
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          发布时间: {{scope.row.publishTime|dateFormat}}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "TopFiftyMid",
  props:{
    hotAlbums:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data(){
    return {
      albumData:{}
    }
  },
  methods:{
    rowClick(row){
      this.$router.push("/album/"+row.id)
    }
  }
}
</script>

<style scoped>
img {
  width: 60px;
  border-radius: 10px;
}
</style>
