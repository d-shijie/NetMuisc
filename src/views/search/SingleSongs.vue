<template>
  <div class="single-songs" ref="singleSongs">
    <el-table @row-click="rowClick"  size="mini" :data="this.$store.state.singleSongs" stripe>
      <el-table-column type="index"></el-table-column>
      <el-table-column width="50px">
        <template slot-scope="scope">
          <Like></Like>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="音乐标题"></el-table-column>
      <el-table-column prop="artists[0].name" label="歌手"></el-table-column>
      <el-table-column prop="album.name" label="专辑"></el-table-column>
      <el-table-column prop="duration" label="时长">
        <template slot-scope="scope">
          {{scope.row.duration|timeFormat}}
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        :current-page="$store.state.singleSongsOffset"
        small
        @current-change="pageChange"
        :page-size="100"
        background
        layout="prev, pager, next"
        :total="$store.state.singleTotal">
    </el-pagination>
  </div>
</template>

<script>
import Like from "../../components/like/Like";
import {getSearchData} from "../../network/getSearchData";
export default {
  name: "SingleSongs",
  props:{

  },
  data(){
    return {

    }
  },
  components:{
    Like
  },
  methods:{
    rowClick(row){
      this.$http.get("/song/url",{params:{id:row.id}}).then(res=>{
        this.$store.state.musicUrl=res.data.data[0].url
      }).catch(err=>{
        console.log(err)
      })
    },
    pageChange(page){
      this.$store.state.singleSongsOffset=page
      getSearchData(this.$store.state.keywords,100,this.$store.state.singleSongsOffset*100,1).then(res=>{
        this.$store.state.singleTotal=res.data.result.songCount
        this.$store.state.singleSongs=res.data.result.songs
      }).catch(err=>{
        console.log(err)
      })
    }
  },
  activated() {
    getSearchData(this.$store.state.keywords,100,this.$store.state.singleSongsOffset,1).then(res=>{
      this.$store.state.total=res.data.result.songCount
      this.$store.state.singleSongs=res.data.result.songs
    }).catch(err=>{
      console.log(err)
    })
  },
  filters:{
    timeFormat(value){
      const time=new Date(value)
      const m=(time.getMinutes()+"")
      const s=(time.getSeconds()+"").padStart(2,"0")
      return m+":"+s
    }
  }
}
</script>

<style scoped>

</style>
