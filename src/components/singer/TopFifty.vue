<template>
  <div class="top-fifty">
    <div class="shift">
      <span @click="itemClick1" :class="{active:currentIndex===1}" class="el-icon-menu"></span>
      <span @click="itemClick2" :class="{active:currentIndex===2}" class="el-icon-s-operation"></span>
      <span @click="itemClick3" :class="{active:currentIndex===3}" class="el-icon-s-grid"></span>
    </div>
    <top-fifty-left v-if="currentIndex===1" :hot-albums="singerAlbums"></top-fifty-left>
    <top-fifty-mid v-if="currentIndex===2" :hot-albums="singerAlbums"></top-fifty-mid>
    <top-fifty-right v-if="currentIndex===3" :hot-songs="hotSongs"></top-fifty-right>
  </div>
</template>

<script>
import {getTopFiftySongs} from "../../network/getAlbumData";
import {getTopFiftyAlbums} from "../../network/getAlbumData";
import TopFiftyRight from "./TopFiftyRight";
import TopFiftyMid from "./TopFiftyMid";
import TopFiftyLeft from "./TopFiftyLeft";
export default {
  name: "TopFifty",
  components:{
    TopFiftyRight,
    TopFiftyMid,
    TopFiftyLeft
  },
  data(){
    return {
      hotSongs:[],
      singerAlbums:[],
      currentIndex:3
    }
  },
  created() {
    this.getTopFiftySongs()
    this.getTopFiftyAlbums()
  },
  methods:{
     getTopFiftySongs(){
       getTopFiftySongs(this.$route.params.id,"hot",50).then(res=>{
         this.hotSongs=res.data.hotSongs
       }).catch(err=>{
         console.log(err)
       })
    },
    getTopFiftyAlbums(){
       getTopFiftyAlbums(this.$route.params.id,50).then(res=>{
         this.singerAlbums=res.data.hotAlbums
       })
      .catch(err=>{
        console.log(err)
      })
    },
    itemClick1(){
      this.currentIndex=1
    },
    itemClick2(){
      this.currentIndex=2
    },
    itemClick3(){
      this.currentIndex=3
    }
  },
}
</script>

<style scoped>
.top-fifty {
  position: relative;
}
.shift {
  position: absolute;
  right: 0;
  top:-30px
}
.active{
  background-color: #eeeeee;
}
</style>
