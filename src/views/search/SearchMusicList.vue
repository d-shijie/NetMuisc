<template>
<div class="search-music-list">
  <el-table @row-click="rowClick"  :data="musicList" stripe>
    <el-table-column width="100px">
      <template slot-scope="scope">
        <img :src="scope.row.coverImgUrl" alt="">
      </template>
    </el-table-column>
    <el-table-column prop="name"></el-table-column>
    <el-table-column prop="trackCount">
      <template slot-scope="scope">
        {{scope.row.trackCount}}首
      </template>
    </el-table-column>
    <el-table-column prop="creator.nickname">
      <template slot-scope="scope">
       by: {{scope.row.creator.nickname}}
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
      :current-page="offset"
      small
      @current-change="pageChange"
      background
      layout="prev, pager, next"
      :total="$store.state.searchMusicListTotal">
  </el-pagination>
</div>
</template>

<script>
import {getSearchData} from "../../network/getSearchData";

export default {
  name: "SearchMusicList",
  data(){
    return {
     musicList:[],
      offset:0
    }
  },
  created() {
  this.getSearchMusicList()
  },
  methods:{
    getSearchMusicList(){
      getSearchData(this.$store.state.keywords,30,this.offset*30,1000).then(res=>{
        this.$store.state.searchMusicListTotal=res.data.result.playlistCount
        this.musicList=res.data.result.playlists
      }).catch(err=>{
        console.log(err)
      })
    },
    pageChange(page){
      this.offset=page
      this.getSearchMusicList()
    },
    rowClick(row){
      this.$router.push("/musiclist/"+row.id)
    }
  }
}
</script>

<style scoped>
img {
  width: 60px;
  height: 60px;
  border-radius: 10px;
}

</style>
