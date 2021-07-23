<template>
  <div class="music-list">
    <el-table @row-click="rowClick" size="mini" :data="songs">
      <el-table-column type="index"></el-table-column>
      <el-table-column >
        <template>
          <like></like>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="音乐标题"></el-table-column>
      <el-table-column prop="ar[0].name" label="歌手"></el-table-column>
      <el-table-column prop="al.name" label="专辑"></el-table-column>
      <el-table-column  label="时长">
        <template slot-scope="scope">
          {{scope.row.dt|timeFormat}}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Like from "../like/Like";
export default {
  name: "AlbumMusicList",
  components:{
    Like
  },
  props:{
    songs:{
      type:Array,
      default(){
        return []
      }
    }
  },
  methods:{
    rowClick(row){
      this.$http.get("/song/url",{params:{id:row.id}}).then(res=>{
      if(res.data.data[0].url===null){
          this.$message.error("找不到资源")
        }else {
          this.$store.state.musicUrl=res.data.data[0].url
        }
      }).catch(err=>{
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>

</style>
