<template>
  <div class="dj-program">
   <div class="info">
     <i>共{{total}}期</i>
     <span :class="{active:flag===true}" @click="topOrder" class="el-icon-top"></span>
     <span :class="{active:flag===false}" @click="bottomOrder" class="el-icon-bottom"></span>
     <span class="text">排序</span>
   </div>
    <el-table @row-click="rowClick" :data="programs" stripe size="mini">
      <el-table-column type="index">
      </el-table-column>
      <el-table-column width="100px">
        <template slot-scope="scope">
             <img :src="scope.row.coverUrl" alt="">
        </template>
      </el-table-column>
      <el-table-column width="200px" prop="name"></el-table-column>
      <el-table-column >
        <template slot-scope="scope">
          <span class="el-icon-video-play">{{scope.row.listenerCount|countFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <span class="el-icon-thumb">{{scope.row.likedCount|countFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column >
        <template slot-scope="scope">
          {{scope.row.createTime|dateFormat}}
        </template>
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          {{scope.row.duration|timeFormat}}
        </template>
      </el-table-column>

    </el-table>
    <el-pagination
        class="pagination"
        @current-change="pageChange"
        small
        background
        layout="prev, pager, next"
        :total="total">
    </el-pagination>
  </div>
</template>

<script>
import {getDjPrograms} from "../../network/getDjData";

export default {
  name: "DjProgram",
  data(){
    return {
      offset:0,
      total:0,
      programs:[],
      flag:true
    }
  },
  filters:{
    countFilter(value){
      return value>10000? (value/10000).toFixed(0)+"万":value
    }
  },
  created() {
    this.getDjPrograms()
  },
  methods:{
    getDjPrograms(){
      getDjPrograms(this.$route.params.id,100,this.offset*100,this.flag).then(res=>{
        this.total=res.data.count
        this.programs=res.data.programs
      }).catch(err=>{
        console.log(err)
      })
    },
    rowClick(row){
      this.$http.get("/song/url",{params:{
        id:row.id
        }}).then(res=>{
          this.$store.state.musicUrl=res.data.data[0].url
      }).catch(err=>{
        console.log(err)
      })
    },
    pageChange(page){
      this.offset=page
      this.getDjPrograms()
    },
    topOrder(){
      this.flag=true
      this.getDjPrograms()
    },
    bottomOrder(){
      this.flag=false
      this.getDjPrograms()
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
.img {
  position: relative;
}
.play {
  position: absolute;
  width: 30px;
  height: 30px;
  bottom: 0;
  right: 0;
}
.info span:nth-child(2),
.info span:nth-child(3){
  float: right;
  display: inline-block;
  padding: 1px;
  border: 1px solid #878787;
  background-color: #f2f2f2;
}
.info span:nth-child(2):hover,
.info span:nth-child(3):hover{
  background-color: #959595;
}
.text{
  margin-right: 5px;
  font-size: 12px;
  color: #787676;
  display: inline-block;
  float: right;
  margin-top: 5px;
}
.active {
  background-color:#787676;
}
</style>
