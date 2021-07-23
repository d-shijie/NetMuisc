<template>
  <div class="mv">
    <div class="left">
      <h4 @click="back">< MV详情</h4>
      <video autoplay controls :src="$store.state.mvUrl"></video>
      <div class="artist">
        <span><img :src="mvInfo.cover" alt=""></span>
        <span>{{mvInfo.artistName}}</span>
      </div>
      <h2>{{mvInfo.name}}</h2>
      <div class="info">
        <span>发行时间:{{mvInfo.publishTime+'  '}}</span>
        <span>播放次数:{{mvInfo.playCount}}</span>
      </div>
      <div class="btns">
        <el-button class="el-icon-thumb" size="medium" round>赞{{'('+mvInfo.likedCount+')'}}</el-button>
        <el-button class="el-icon-folder-add" size="medium" round>收藏{{'('+mvInfo.subCount+')'}}</el-button>
        <el-button class="el-icon-s-promotion" size="medium" round>分享{{'('+mvInfo.shareCount+')'}}</el-button>
        <el-button class="el-icon-download" size="medium" round>下载</el-button>
        <a>举报</a>
      </div>
      <h4 class="title">评论{{'('+mvInfo.commentCount+')'}}</h4>
      <el-input
          :rows="3"
          type="textarea">
      </el-input>
      <div class="send">
        <span>@</span>
        <span>#</span>
        <el-button class="send-btn" size="mini" round>发送</el-button>
      </div>
      <h4 v-if="showHotComments">精彩评论</h4>
      <Comment :comments="hotComments"></Comment>
      <h4>最新评论</h4>
      <Comment :comments="comments"></Comment>
      <el-pagination
          :current-page="commentsOffset"
          small
          @current-change="pageChange"
          :page-size="50"
          background
          layout="prev, pager, next"
          :total="commentsTotal">
      </el-pagination>
    </div>
    <div class="right">
    <div @click="itemClick(item)" class="item" v-for="(item,index) in simiMVs">
      <div class="item-left">
        <span class="play-count">{{item.playCount|countFormat}}</span>
        <span class="time">{{item.duration|timeFormat}}</span>
        <img :src="item.cover" alt="">
      </div>
      <div class="item-right">
        <div class="name">{{item.name}}</div>
        <div class="artistName">by {{item.artists[0].name}}</div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import {getMVUrl} from "../../network/getMVData";
import {getMVInfo} from "../../network/getMVData";
import {getMVCount} from "../../network/getMVData";
import {getMVComment} from "../../network/getMVData";
import {getSimiMV} from "../../network/getMVData";
import Comment from "../comment/Comment";
export default {
  name: "MV",
  components:{
    Comment
  },
  data(){
    return {
      mvInfo:{
        name:"",
        artistName:"",
        cover:"",
        publishTime:"",
        playCount:0,
        commentCount:0,
        subCount:0,
        likedCount:0,
        shareCount:0
      },
      hotComments:[],
      comments:[],
      commentsOffset:0,
      commentsTotal:0,
      simiMVs:[]
    }
  },
  computed:{
    showHotComments(){
      return this.hotComments !== [];
    }
  },
  created() {
    this.getMVUrl()
    this.getMVInfo()
    this.getMVCount()
    this.getMVComment()
    this.getSimiMV()
  },
  methods:{
    getMVUrl(){
      getMVUrl(this.$route.params.id).then(res=>{
        this.$store.state.mvUrl=res.data.data.url
      }).catch(err=>{
        console.log(err)
      })
    },
    back(){
      this.$router.back()
    },
    getMVInfo(){
      getMVInfo(this.$route.params.id).then(res=>{
        this.mvInfo.cover=res.data.data.cover
        this.mvInfo.artistName=res.data.data.artistName
        this.mvInfo.playCount=res.data.data.playCount
        this.mvInfo.publishTime=res.data.data.publishTime
        this.mvInfo.name=res.data.data.name
        this.mvInfo.subCount=res.data.data.subCount
      }).catch(err=>{
        console.log(err)
      })
    },
    getMVCount(){
      getMVCount(this.$route.params.id).then(res=>{
        this.mvInfo.likedCount=res.data.likedCount
        this.mvInfo.shareCount=res.data.shareCount
        this.mvInfo.commentCount=res.data.commentCount
      }).catch(err=>{
        console.log(err)
      })
    },
    getMVComment(){
      getMVComment(this.$route.params.id,50,this.commentsOffset*50).then(res=>{
        this.hotComments=res.data.hotComments
        this.comments=res.data.comments
        this.commentsTotal=res.data.total
      }).catch(err=>{
        console.log(err)
      })
    },
    pageChange(page){
      this.commentsOffset=page
      this.getMVComment()
    },
    getSimiMV(){
      getSimiMV(this.$route.params.id).then(res=>{
        this.simiMVs=res.data.mvs
        console.log(res)
      }).catch(err=>{
        console.log(err)
      })
    },
    itemClick(item){
      this.$router.push("/mv/"+item.id)
      location.reload()
    }
  },
  filters:{
    countFormat(value){
      return value>10000? (value/10000).toFixed(0)+"万":value
    }
  }
}
</script>

<style scoped>
.item {
  cursor: pointer;
  display: flex;
  margin: 5px 0;
}
.item-left {
  position: relative;
  width: 50%;
}
.item-right {
  display: flex;
  margin-left: 10px;
  flex-direction: column;
  justify-content: space-around;
}
.name {
  font-size: 14px;
}
.artistName {
  font-size: 12px;
  color: #6a6a6a;
}
.play-count {
  font-size: 12px;
  color: #ffffff;
  position: absolute;
  right: 2px;
  top: 2px;
}
.time {
  font-size: 12px;
  color: #ffffff;
  position: absolute;
  right: 2px;
  bottom: 2px;
}
.item-left img {
  width: 100%;
  border-radius: 10px;
}
.left {

  float: left;
  width: 65%;
}
h2 {
  margin: 30px 0;
}
.right {
  float: right;
  width: 32%;
}
video {
  margin: 10px 0 30px 0;
  width: 100%;
}
h4 {
  cursor: pointer;
}
.title {
  margin-bottom: 10px;
}
.artist {
  color: #6d6d6d;
  display: flex;
  align-items: center;
}
.artist img {
  margin-right: 10px;
  width: 50px;
  border-radius: 50%;
  height: 50px;
}
.info {
  color: #747474;
  font-size: 12px;
}
.btns {
  position: relative;
  display: flex;
  align-items: center;
  margin: 30px 0;
}
.btns a {
  position: absolute;
  right: 0;
  cursor: pointer;
  color: #7b7b7b;
  font-size: 12px;
  text-decoration: underline;
}
.btns a:hover {
  color: #383838;
}
.send {
  position: relative;
  margin: 10px 0 30px 0;
}
.send span {
  cursor: pointer;
  display: inline-block;
  margin-right: 10px;
}
.send-btn {
  float: right;
}
.el-pagination {
  position: relative;
  bottom: 10px;
  transform:translateX(50%);
  margin-right: 50%;
}
</style>
