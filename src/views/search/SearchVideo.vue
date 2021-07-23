<template>
  <div class="search-video">
    <AllList2 :item-list="videos"></AllList2>
    <el-pagination
        :current-page="offset"
        small
        @current-change="pageChange"
        :page-size="30"
        background
        layout="prev, pager, next"
        :total="$store.state.searchVideoTotal">
    </el-pagination>
  </div>
</template>

<script>
import {getSearchData} from "../../network/getSearchData";
import AllList2 from "../../components/Layout/AllList2";
export default {
  name: "SearchVideo",
  components:{
    AllList2
  },
  data(){
    return {
      videos:[],
      offset:0,
    }
  },
  created() {
    this.getSearchVideos()
  },
  methods:{
    getSearchVideos(){
      getSearchData(this.$store.state.keywords,30,this.offset*30,1014).then(res=>{
        this.$store.state.searchVideoTotal=res.data.result.videoCount
        this.videos=res.data.result.videos
      }).catch(err=>{
        console.log(err)
      })
    },
    pageChange(page){
      this.offset=page
      this.getSearchVideos()
    }
  }
}
</script>

<style scoped>

</style>
