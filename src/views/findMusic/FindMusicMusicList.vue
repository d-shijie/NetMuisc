<template>
  <div class="music-list">
    <div class="title">
      <div class="name">{{cat}}></div>
      <div class="tag">
        <div @click="tagClick(index)" :class="{active:currentIndex===index}" class="tags" v-for="(item,index) in playlistCategory">
          {{item.name}}
        </div>
      </div>
    </div>
    <div class="music-lists">
      <div @click="itemClick(item)" class="item" v-for="(item,index) in musicLists">
        <span class="el-icon-video-play">{{item.playCount|countFilter}}</span>
        <span class="el-icon-user">{{item.creator.nickname}}</span>
        <img :src="item.coverImgUrl" alt="">
        <p class="playlist-name">
          {{item.name}}
        </p>
      </div>
    </div>
    <el-pagination
        :current-page="offset"
        small
        @current-change="pageChange"
        :page-size="60"
        background
        layout="prev, pager, next"
        :total="total">
    </el-pagination>
  </div>
</template>

<script>
import {getPlaylistCategory} from "../../network/getFindMusicData";
import {getMusicList} from "../../network/getFindMusicData";
export default {
  name: "FindMusicMusicList",
  data(){
    return {
      playlistCategory:[],
      currentIndex:0,
      offset:0,
      total:0,
      cat:"",
      name:"",
      musicLists:[]
    }
  },
  created() {
    this.getPlaylistCategory()
    getMusicList('hot','华语',60,this.offset*60)
        .then(res=>{
          this.musicLists=res.data.playlists
          this.total=res.data.total
        })
        .catch(err=>{
          console.log(err)
        })
  },
  methods:{
    getPlaylistCategory(){
      getPlaylistCategory().then(res=>{
        this.playlistCategory=res.data.tags
        this.cat=this.playlistCategory[this.currentIndex].name
      }).catch(err=>{
        console.log(err)
      })
    },
    tagClick(index){
      this.currentIndex=index
      this.offset=0
      this.getPlaylistCategory()
      getMusicList('hot',this.playlistCategory[this.currentIndex].name,60,this.offset*60)
          .then(res=>{
            this.musicLists=res.data.playlists
            this.total=res.data.total
          }).catch(err=>{
        console.log(err)
      })
    },
    itemClick(item){
      this.$router.push("/musiclist/"+item.id)
    },
    pageChange(page){
      this.offset=page
      getMusicList('hot',this.playlistCategory[this.currentIndex].name,60,this.offset*60)
          .then(res=>{
            this.musicLists=res.data.playlists
            this.total=res.data.total
          }).catch(err=>{
        console.log(err)
      })
    }
  },
  filters:{
    countFilter(value){
      return value>10000? (value/10000).toFixed(0)+"万":value
    }
  }
}
</script>

<style scoped>
.playlist-name {
  font-size: 14px;
  color: #2d2d2d;
  margin-top: 5px;
}
.music-lists{
  justify-content: space-between;
  display: flex;
  flex-wrap: wrap;
}
.item {
  position: relative;
  cursor: pointer;
  margin: 15px 0;
  width: 23%;
}
.item span:nth-child(1) {
  color: #ffffff;
  right: 5px;
  font-size: 12px;
  top: 3px;
  position: absolute;
}
.item span:nth-child(2){
  color: #ffffff;
  left: 5px;
  top: 160px;
  font-size: 12px;
  position: absolute;
}
.item img {
  border-radius: 10px;
  width: 100%;
}
.title{
  display: flex;
}
.tag {
  width: 500px;
  justify-content: space-between;
  display: flex;
}
.name {
  width: 90px;
  text-align: center;
  cursor: pointer;
  color: #4e4d4d;
  border: 2px solid #eeeeee;
  padding: 0px 15px;
  border-radius: 10px;
  margin-right: 200px;
}
.name:hover{
  background-color: #eeeeee;
}
.tags{
  padding: 3px 7px;
  border-radius: 10px;
  font-size: 12px;
  cursor: pointer;
  display: flex;
}
.active {
  background-color: #eeeeee;
  color: #f61919;
}
</style>
