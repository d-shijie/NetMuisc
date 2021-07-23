<template>
  <div class="singer" ref="singer">
    <div class="detail">
      <div class="left">
        <img :src="singerDetail.picUrl" alt="">
      </div>
      <div class="right">
        <h2>{{singerDetail.name}}</h2>
        <p>{{alia}}</p>
        <el-button class="el-icon-circle-plus-outline" size="medium" round>收藏</el-button>
        <div class="size">
          <span>单曲数:{{singerDetail.musicSize}}</span>
          <span>专辑数:{{singerDetail.albumSize}}</span>
          <span>MV数:{{singerDetail.mvSize}}</span>
        </div>
      </div>
    </div>
    <Title :title-data="titleData"></Title>
    <router-view></router-view>
  </div>
</template>

<script>
import Title from "../title/Title";
export default {
  name: "Singer",
  data(){
    return {
      singerDetail:{},
      titleData:["专辑","mv","歌手详情","相似歌手"],
      alia:""
    }
  },
  components:{
    Title
  },
  mounted() {
    this.$refs.singer.addEventListener('click', this.scrollTop)
  },
  computed:{

  },
  created() {
    this.getSingerData()
  },
  methods:{
    getSingerData(){
      this.$http.get("/artists/detail",{params:{id:this.$route.params.id}}).then(res=>{
        this.singerDetail=res.data.artist
        this.alia=res.data.artist.alias[0]
      }).catch(err=>{
        console.log(err)
      })
    },
    scrollTop(){
      this.scroll = document.documentElement.scrollTop || document.body.scrollTop;
    }
  }
}
</script>

<style scoped>
.detail {
  display: flex;
}
.left img {
  margin-right: 20px;
  width: 200px;
  border-radius: 10px;
  height: 200px;
}
.right {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
span {
  display: inline-block;
  margin: 0 10px;
}
.el-button {
  width: 100px;
}
</style>
