<template>
  <div class="search-living">
    <el-table @row-click="rowClick" size="medium" stripe :data="livings">
      <el-table-column width="100px">
        <template slot-scope="scope">
          <img :src="scope.row.picUrl" alt="">
        </template>
      </el-table-column>
      <el-table-column prop="name">
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          by   {{scope.row.dj.nickname}}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {getSearchData} from "../../network/getSearchData";
export default {
  name: "SearchLiving",
  data(){
    return {
      offset:0,
      livings:[]
    }
  },
  created() {
    this.getSearchLivings()
  },
  methods:{
    getSearchLivings(){
      getSearchData(this.$store.state.keywords,10,this.offset*10,1009).then(res=>{
        this.livings=res.data.result.djRadios
        this.$store.state.searchLivingTotal=res.data.result.djRadiosCount
      }).catch(err=>{
        console.log(err)
      })
    },
    rowClick(row){
      this.$router.push("/dj/"+row.id)
    }
  }
}
</script>

<style scoped>
img {
  width: 70px;
  height: 70px;
  border-radius: 10px;
}
</style>
