<template>
  <div class="album">
    <div class="detail">
      <img class="album-pic" :src="albumDetail.picUrl" alt="">
      <div class="info">
        <h3>{{albumDetail.name}}{{"("+alia+")"}}</h3>
        <div class="choices">
          <el-button type="danger" class="el-icon-video-play" size="mini" round>播放全部</el-button>
          <el-button size="mini" class="el-icon-folder-add" round>收藏</el-button>
          <el-button size="mini" class="el-icon-download" round>下载全部</el-button>
          <el-button size="mini" class="el-icon-position" round>{{shareCount}}</el-button>
        </div>
        <p>歌手: {{artistName}}</p>
        <p>时间: {{albumDetail.publishTime|dateFormat}}</p>
      </div>
    </div>
    <Title :title-data="titleData"></Title>
    <keep-alive>
      <router-view :songs="songs"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import {getAlbumData} from "../../network/getAlbumData";
import Title from "../title/Title";
export default {
  name: "Album",
  components:{
    Title
  },
  data(){
    return {
      songs:[],
      albumDetail:{},
      shareCount:0,
      alia:"",
      artistName:"",
      titleData:["歌曲列表","评论","专辑详情"]
    }
  },
  created() {
    this.getAlbumData()
  },
  computed:{
  },
  methods:{
    getAlbumData(){
      getAlbumData(this.$route.params.id).then(res=>{
        this.songs=res.data.songs
        this.albumDetail=res.data.album
        this.alia=res.data.album.alias[0]
        this.shareCount=res.data.album.info.shareCount
        this.artistName=res.data.album.artist.name
      })
          .catch(err=>{
            console.log(err)
          })
      // this.$http.post("/album",{id:this.$route.params.id}).then(res=>{
      //   this.albumData=res.data
      //   console.log(this.albumData)
      // }).catch(err=>{
      //   console.log(err)
      // })
    }
  }
}
</script>

<style scoped>
.album-pic {
  width: 200px;
  height: 200px;
  border-radius: 10px;
}
.detail {
  display: flex;
}
.info {
  margin-left: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
p {
  font-size: 13px;
}
</style>
