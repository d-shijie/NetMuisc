<template>
  <div class="search-album">
    <el-table @row-click="rowClick" :data="albums" stripe>
      <el-table-column width="100px">
        <template slot-scope="scope">
          <img :src="scope.row.picUrl" alt="">
        </template>
      </el-table-column>
      <el-table-column prop="name"></el-table-column>
      <el-table-column prop="artist.name"></el-table-column>
    </el-table>
    <el-pagination
        :current-page="offset"
        small
        @current-change="pageChange"
        :page-size="20"
        background
        layout="prev, pager, next"
        :total="$store.state.searchAlbumTotal"
    ></el-pagination>
  </div>
</template>

<script>
import {getSearchData} from "../../network/getSearchData";

export default {
  name: "SearchAlbum",
  data(){
    return {
      offset:0,
      total:0,
      albums:[]
    }
  },
  created() {
    this.getSearchAlbums()
  },
  methods:{
    getSearchAlbums(){
      getSearchData(this.$store.state.keywords,20,this.offset,10).then(res=>{
        this.$store.state.searchAlbumTotal=res.data.result.albumCount
        this.albums=res.data.result.albums
      })
    },
    rowClick(row){
      this.$router.push("/album/"+row.id)
    },
    pageChange(page){
      this.offset=page
      this.getSearchAlbums()
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
