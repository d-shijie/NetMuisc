<template>
  <div class="singer-detail">
    <h4>{{artistName}}简介</h4>
    <p v-for="item in desc">{{item}}</p>
  </div>
</template>

<script>
import {getSingerDetail} from "../../network/getSingerData";
import {getSingerDetailJsonp} from "../../network/getSingerData";
export default {
  name: "SingleDetail",
  data(){
    return {
      desc:[],
      artistName:""
    }
  },
  created() {
    this.getSingerDetail()
  },
  methods:{
    getSingerDetail(){
      getSingerDetail(this.$route.params.id).then(res=>{
        this.artistName=res.data.artist.name
        this.desc=res.data.artist.briefDesc.split("。")
      }).catch(err=>{
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
p {
  margin-top: 10px;
}
</style>
