<template>
  <div class="dj-rank">
    <div class="top">
      <span @click="itemClick1" :class="{active:currentIndex===1}">节目榜</span>
      <span @click="itemClick2" :class="{active:currentIndex===2}">新晋电台榜</span>
      <span @click="itemClick3" :class="{active:currentIndex===3}">热门电台榜</span>
    </div>
    <el-table v-if="currentIndex===1" :data="ranks" stripe >
      <el-table-column type="index">
      </el-table-column>
      <el-table-column width="80px">
        <template slot-scope="scope">
          <div class="img"><img :src="scope.row.program.coverUrl||scope.row.picUrl" alt=""></div>
        </template>
      </el-table-column>
      <el-table-column prop="program.name||name">
        <template slot-scope="scope">
          <span style="color: #2d2d2d;font-size: 14px">{{scope.row.program.name}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="program.dj.brand||dj.nickname">
        <template slot-scope="scope">
          <span style="color: #8e8e8e;font-size: 12px">{{scope.row.program.dj.brand}}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-table @row-click="rowClick" v-if="currentIndex===2" :data="newDjs" stripe >
      <el-table-column type="index"></el-table-column>
      <el-table-column width="80px">
        <template slot-scope="scope">
          <div class="img"><img :src="scope.row.picUrl" alt=""></div>
        </template>
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <span style="color: #2d2d2d;font-size: 14px">{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <span style="color: #8e8e8e;font-size: 12px">{{scope.row.dj.nickname}}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-table @row-click="rowClick" v-if="currentIndex===3" :data="hotDjs" stripe >
      <el-table-column type="index"></el-table-column>
      <el-table-column width="80px">
        <template slot-scope="scope">
          <div class="img"><img :src="scope.row.picUrl" alt=""></div>
        </template>
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <span style="color: #2d2d2d;font-size: 14px">{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <span style="color: #8e8e8e;font-size: 12px">{{scope.row.dj.nickname}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {getDjRank} from "../../network/getDjData";
import {getHotNewDjs} from "../../network/getDjData";

export default {
  name: "DjRank",
  data(){
    return {
      currentIndex:1,
      offset:0,
      ranks:[],
      newDjs:[],
      hotDjs:[]
    }
  },
  created() {
    this.getDjRank()
  },
  methods:{
    getDjRank(){
      this.offset=0
      getDjRank(this.offset*100).then(res=>{
        this.ranks=res.data.toplist
      }).catch(err=>{
        console.log(err)
      })
    },
    itemClick1(){
      this.offset=0
      this.currentIndex=1
      this.getDjRank()
    },
    itemClick2(){
      this.offset=0
      this.currentIndex=2
      getHotNewDjs(100,this.offset*100,'new').then(res=>{
        this.newDjs=res.data.toplist
      }).catch(err=>{
        console.log(err)
      })
    },
    itemClick3(){
      this.currentIndex=3
      getHotNewDjs(100,this.offset*100,'hot').then(res=>{
        this.hotDjs=res.data.toplist
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
  width: 60px;
  height: 60px;
  border-radius: 10px;
}
.top {
  width: 325px;
  height: 30px;
  display: flex;
  justify-content: space-between;
  border-radius: 30px;
  margin: 0 auto;
  overflow: hidden;
  border: 2px solid #eeeeee;
}
.top span {
  cursor: pointer;
  display: inline-block;
  width: 33%;
  font-size: 12px;
  border-radius: 15px;
  height: 100%;
  text-align: center;
  line-height: 30px;
}
.top span:hover {
  background-color: #eeeeee;
}
.active {
  color: #ffffff;
  background-color: #c9c9c9;
}
</style>
