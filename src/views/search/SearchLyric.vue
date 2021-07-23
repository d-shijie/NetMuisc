<template>
  <div class="search-lyric">
    <el-table @row-click="rowClick" size="mini" :data="lyrics" stripe>
      <el-table-column type="index"></el-table-column>
      <el-table-column width="50px">
        <template slot-scope="scope">
          <Like></Like>
        </template>
      </el-table-column>
      <el-table-column label="音乐标题">
        <template slot-scope="scope">
          <div class="name">
            <span>{{scope.row.name}}</span>
            <span><MVButton :mvid="scope.row.mvid"></MVButton></span>
          </div>
          <div class="lyric">
            {{scope.row.lyrics.txt}}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="歌手" prop="artists[0].name"></el-table-column>
      <el-table-column label="专辑" prop="album.name"></el-table-column>
      <el-table-column label="时长" >
        <template slot-scope="scope">
          {{scope.row.duration|timeFormat}}
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        @current-change="pageChange"
        small
        background
        layout="prev, pager, next"
        :total="$store.state.searchLyricTotal">
    </el-pagination>
  </div>
</template>

<script>
import {getSearchData} from "../../network/getSearchData";
import Like from "../../components/like/Like";
import MVButton from "../../components/mv/MVButton";
export default {
  name: "SearchLyric",
  components:{
    Like,
    MVButton,
  },
  data(){
    return {
      offset:0,
      lyrics:[],
      mvid:0
    }
  },
  created() {
    this.getSearchLyrics()
  },
  methods:{
    getSearchLyrics(){
      getSearchData(this.$store.state.keywords,20,this.offset*20,1006).then(res=>{
        this.lyrics=res.data.result.songs
        this.$store.state.searchLyricTotal=res.data.result.songCount
      }).catch(err=>{
        console.log(err)
      })
    },
    rowClick(row){
      this.$http.get("/song/url",{params:{id:row.id}}).then(res=>{
        this.$store.state.musicUrl=res.data.data[0].url
      })
    },
    pageChange(page){
      this.offset=page-1
      this.getSearchLyrics()
    }
  }
}
</script>

<style scoped>
.lyric {
  height: 100px;
  overflow: hidden;
}
.name {
  display: flex;
}
.name span:nth-child(1){
  margin-right: 5px;
}
</style>
