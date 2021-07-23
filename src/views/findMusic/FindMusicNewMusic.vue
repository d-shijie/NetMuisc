<template>
  <div class="find-music-new-music">
    <div class="title">
      <span @click="newMusicClick" :class="{active:currentIndex===1}">新歌速递</span>
      <span @click="newClick" :class="{active:currentIndex===2}">新碟上架</span>
    </div>
    <div class="type">
      <div class="types">
        <span @click="typeClick(index)" :class="{active2:currentIndexType===index}" v-for="(item,index) in types">
          {{item}}
        </span>
      </div>
      <div class="btns">
        <el-button class="el-icon-video-play" type="danger" round size="mini">播放全部</el-button>
        <el-button class="el-icon-document-add" round size="mini">收藏全部</el-button>
      </div>
    </div>
    <el-table v-if="currentIndex===1" size="mini" @row-click="rowClick" stripe :data="newMusics">
      <el-table-column type="index"></el-table-column>
      <el-table-column width="100px">
        <template slot-scope="scope">
          <img :src="scope.row.album.picUrl" alt="">
        </template>
      </el-table-column>
      <el-table-column prop="name"></el-table-column>
      <el-table-column>
        <template  style="color: #8e8e8e;font-size: 12px" slot-scope="scope">
          {{scope.row.artists[0].name}}
        </template>
      </el-table-column>
      <el-table-column>
        <template style="color: #8e8e8e;font-size: 12px"  slot-scope="scope">
          {{scope.row.album.name}}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {getNewMusic} from "../../network/getMusicListData";
import {getNewDish} from "../../network/getMusicListData";

export default {
  name: "FindMusicNewMusic",
  data(){
    return {
      type:0,
      currentIndex:1,
      currentIndexType:0,
      types:["全部","华语","欧美","日本","韩国"],
      newMusics:[],
      area:"ALL",
      dishType:"new"
    }
  },
  created() {
    this.getNewMusic()
    this.getNewDishes()
  },
  methods:{
    getNewMusic(){
      getNewMusic(this.type).then(res=>{
        this.newMusics=res.data.data
      }).catch(err=>{
        console.log(err)
      })
    },
    getNewDishes(){
      getNewDish(50,0,this.area,this.dishType).then(res=>{
        console.log(res)
      }).catch(err=>{
        console.log(err)
      })
    },
    newMusicClick(){
      this.currentIndex=1
      this.currentIndexType=0
      this.type=0
    },
    newClick(){
      this.currentIndex=2
      this.currentIndexType=0
      this.type=0
    },
    typeClick(index){
      this.currentIndexType=index
      switch (index){
        case 0:
          this.type=0
          break;
        case 1:
          this.type=7
          break;
        case 2:
          this.type=96
          break;
        case 3:
          this.type=8
          break;
        case 4:
          this.type=16
          break;
      }
      this.getNewMusic()
    },
    rowClick(row){
      this.$http.get("/song/url",{params:{
          id:row.id
        }}).then(res=>{
        this.$store.state.musicUrl=res.data.data[0].url
      }).catch(err=>{
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
img {
  width: 100%;
  border-radius: 10px;
}
.type{
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.types span{
  cursor: pointer;
  margin-right: 20px;
  color: #474747;
  font-size: 14px;
}
.title {
  width: 250px;
  margin-left: 50%;
  transform: translateX(-50%);
  display: flex;
  height: 25px;
  border-radius: 30px;
  overflow: hidden;
  justify-content: space-between;
  border: 1px solid #eeeeee;
}
.title span {
  width: 50%;
  cursor: pointer;
  border-radius: 30px;
  font-size: 12px;
  line-height: 25px;
  text-align: center;
}
.title span:hover{
  background-color: #eeeeee;
}
.active {
  background-color: #bfbfbf;
}
.active2 {
  font-weight: 800;
}
</style>
