<template>
  <div class="search-singers">
    <el-table @row-click="rowClick" size="mini" :data="$store.state.searchSingers">
      <el-table-column width="100px">
        <template slot-scope="scope">
          <img :src="scope.row.picUrl" alt="">
        </template>
      </el-table-column>
      <el-table-column >
        <template slot-scope="scope">
           {{scope.row.name}}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {getSearchData} from "../../network/getSearchData";
export default {
  name: "SearchSingers",
  data(){
    return {
      singerData:[]
    }
  },
  created() {
    this.getSingerData()
  },
  methods:{
    getSingerData(){
      getSearchData(this.$store.state.keywords,20,this.$store.state.searchSingerOffset*20,100)
          .then(res=>{
            this.$store.state.singerTotal=res.data.result.artistCount
            this.$store.state.searchSingers=res.data.result.artists
          }).catch(err=>{
        console.log(err)
      })
    },
    rowClick(row){
      this.$router.push("/singer/"+row.id)
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
