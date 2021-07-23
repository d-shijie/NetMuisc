<template>
  <div class="play-list">
    <el-table @row-click="rowClick" size="mini" :data="songs" stripe>
      <el-table-column type="index"></el-table-column>
      <el-table-column width="50px">
        <template slot-scope="scope">
          <Like></Like>
        </template>
      </el-table-column>
      <el-table-column label="音乐标题" prop="name"></el-table-column>
      <el-table-column label="歌手">
        <template slot-scope="scope">
          {{scope.row.ar[0].name}}
        </template>
      </el-table-column>
      <el-table-column label="专辑" prop="al.name"></el-table-column>
      <el-table-column label="时长">
        <template slot-scope="scope">
          {{scope.row.dt|timeFormat}}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {getMusicListDetail} from "../../network/getMusicListData";
import Like from "../like/Like";
export default {
  name: "PlayList",
  data(){
    return {
      songs:[]
    }
  },
  components:{
    Like
  },
  created() {
    this.getMusicListSongs()
  },
  methods:{
    getMusicListSongs(){
      getMusicListDetail(this.$route.params.id).then(res=>{
        if(res.data.playlist.trackIds>res.data.playlist.tracks){
          this.$message.info("登陆后获取全部音乐")
        }
        this.songs=res.data.playlist.tracks
      }).catch(err=>{
        console.log(err)
      })
    },
    rowClick(row){
      this.$http.get("/song/url",{params:{id:row.id}}).then(res=>{
       this.$store.state.musicUrl=res.data.data[0].url
      })
    }
  }
}
</script>

<style scoped>

</style>
