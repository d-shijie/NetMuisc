<template>
  <div class="find-music-rank">
    <h3>官方榜</h3>
    <div class="top-item">
      <div class="left">
        <div class="item-img">
          <img :src="rise.url" alt="">
          <span class="updateTime">{{rise.updateTime|dateFormat}}更新</span>
        </div>
      </div>
      <div class="right">
        <el-table @row-click="rowClick" width="500px" stripe size="mini" :data="riseRank">
          <el-table-column type="index"></el-table-column>
          <el-table-column prop="name"></el-table-column>
          <el-table-column prop="ar[0].name"></el-table-column>
        </el-table>
      </div>
    </div>
    <div class="top-item">
      <div class="left">
        <div class="item-img">
          <img :src="news.url" alt="">
          <span class="updateTime">{{news.updateTime|dateFormat}}更新</span>
        </div>
      </div>
      <div class="right">
        <el-table @row-click="rowClick" width="500px" stripe size="mini" :data="newMusicRank">
          <el-table-column type="index"></el-table-column>
          <el-table-column prop="name"></el-table-column>
          <el-table-column prop="ar[0].name"></el-table-column>
        </el-table>
      </div>
    </div>
    <div class="top-item">
      <div class="left">
        <div class="item-img">
          <img :src="create.url" alt="">
          <span class="updateTime">{{create.updateTime|dateFormat}}更新</span>
        </div>
      </div>
      <div class="right">
        <el-table @row-click="rowClick" width="500px" stripe size="mini" :data="createMusicRank">
          <el-table-column type="index"></el-table-column>
          <el-table-column prop="name"></el-table-column>
          <el-table-column prop="ar[0].name"></el-table-column>
        </el-table>
      </div>
    </div>
    <div class="top-item">
      <div class="left">
        <div class="item-img">
          <img :src="hot.url" alt="">
          <span class="updateTime">{{hot.updateTime|dateFormat}}更新</span>
        </div>
      </div>
      <div class="right">
        <el-table @row-click="rowClick" width="500px" stripe size="mini" :data="hotMusicRank">
          <el-table-column type="index"></el-table-column>
          <el-table-column prop="name"></el-table-column>
          <el-table-column prop="ar[0].name"></el-table-column>
        </el-table>
      </div>
    </div>
    <h3>全球榜</h3>
    <div class="bottom">
      <div @click="itemClick(item)" class="bottom-item" v-for="(item,index) in rankList">
        <span class="el-icon-video-play">{{item.playCount|countFiler}}</span>
        <img :src="item.coverImgUrl" alt="">
        <p>{{item.name}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import {getRankList} from "../../network/getRankData";
import {getMusicListDetail} from "../../network/getMusicListData";

export default {
  name: "FindMusicRank",
  data(){
    return{
      rankList:[],
      rise:{
        url:"",
        updateTime:""
      },
      news:{
        url:"",
        updateTime:""
      },
      create:{
        url:"",
        updateTime:""
      },
      hot:{
        url:"",
        updateTime:""
      },
      riseRank:[],
      newMusicRank:[],
      hotMusicRank:[],
      createMusicRank:[]
    }
  },
  created() {
    getRankList().then(res=>{
      this.rise.url=res.data.list[0].coverImgUrl
      this.rise.updateTime=res.data.list[0].updateTime
      this.news.url=res.data.list[1].coverImgUrl
      this.news.updateTime=res.data.list[1].updateTime
      this.create.url=res.data.list[2].coverImgUrl
      this.create.updateTime=res.data.list[2].updateTime
      this.hot.url=res.data.list[3].coverImgUrl
      this.hot.updateTime=res.data.list[3].updateTime
      this.rankList=res.data.list.splice(4,32)
    }).catch(err=>{
      console.log(err)
    })
    getMusicListDetail( 3779629).then(res=>{
      this.newMusicRank=res.data.playlist.tracks.splice(0,5)
    }).catch(err=>{
      console.log(err)
    })
    getMusicListDetail( 19723756).then(res=>{
      this.riseRank=res.data.playlist.tracks.splice(0,5)
    }).catch(err=>{
      console.log(err)
    })
    getMusicListDetail( 3778678).then(res=>{
      this.hotMusicRank=res.data.playlist.tracks.splice(0,5)
    }).catch(err=>{
      console.log(err)
    })
    getMusicListDetail( 2884035).then(res=>{
      this.createMusicRank=res.data.playlist.tracks.splice(0,5)
    }).catch(err=>{
      console.log(err)
    })
  },
  methods:{
    rowClick(row){
      this.$http.get("/song/url",{params:{id:row.id}}).then(res=>{
        this.$store.state.musicUrl=res.data.data[0].url
      }).catch(err=>{
        console.log(err)
      })
    },
    itemClick(item){
      this.$router.push("/musiclist/"+item.id)
    }
  },
  filters:{
    countFiler(value){
      return value>10000?(value/10000).toFixed(0)+"万":value
    }
  }
}
</script>

<style scoped>
.bottom{
  display: flex;
  flex-wrap: wrap;
}
p {
  font-size: 14px;
  color: #474747;
  margin-top: 5px;
}

.bottom-item span:nth-child(1) {
  position: absolute;
  color: #ffffff;
  font-size: 12px;
  right: 5px;
  top: 3px;
}
.bottom-item {
  position: relative;
  cursor: pointer;
  width: 18%;
  margin: 10px 15px 25px 0;
}
.bottom-item img {
  width: 100%;
  border-radius: 10px;
}
.top-item{
  align-items: center;
  display: flex;
  margin: 10px 0 20px 0;
}
.left {
  position: relative;
  width: 25%;
  margin-right: 10px;
}
.left img {
  width: 100%;
  border-radius: 10px;
}
.item-img {

}
.right {

  width: 600px;
}
.item-img .updateTime {
  position: absolute;
  color: #555555;
  left: 50px;
  top: 150px;
  font-size: 12px;

}
</style>
