<template>
  <div class="search-user">
  <el-table @row-click="rowClick" :data="users" size="medium" stripe>
    <el-table-column width="100px">
      <template slot-scope="scope">
        <img :src="scope.row.avatarUrl" alt="">
      </template>
    </el-table-column>
    <el-table-column class="sex">
      <template slot-scope="scope">
        <span class="nickname">{{scope.row.nickname}}</span>
        <span  v-if="scope.row.gender===1" style="background-color:#a7a7f5;border-radius: 50%" class="el-icon-male"></span>
        <span v-else style="background-color:#f1baba;border-radius: 50%" class="el-icon-female"></span>
      </template>
    </el-table-column>
    <el-table-column prop="description">
      <template slot-scope="scope">
        {{scope.row.description||scope.row.signature}}
      </template>
    </el-table-column>
  </el-table>
    <el-pagination
        small
        @current-change="pageChange"
        :page-size="100"
        background
        layout="prev, pager, next"
        :total="$store.state.searchUserTotal">
    </el-pagination>
  </div>
</template>

<script>
import {getSearchData} from "../../network/getSearchData";

export default {
  name: "SearchUser",
  data(){
    return {
      offset:0,
      users:[]
    }
  },
  created() {
    this.getSearchUsers()
  },
  methods:{
    getSearchUsers(){
      getSearchData(this.$store.state.keywords,30,this.offset*30,1002).then(res=>{
        this.$store.state.searchUserTotal=res.data.result.userprofileCount
        this.users=res.data.result.userprofiles
      }).catch(err=>{
        console.log(err)
      })
    },
    rowClick(row){
      this.$router.push("/profile/"+row.userId)
    },
    pageChange(page){
      this.offset=page
      this.getSearchUsers()
    }
  }
}
</script>

<style scoped>
img {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: 1px solid #eeeeee;
}
.nickname{
  display: inline-block;
  margin-right: 5px;
}
.sex span {
  display: inline-block;
}
</style>
