<template>
  <div class="videos">
    <h2>登陆后获取</h2>
  </div>
</template>

<script>
import axios from "axios";
import {getVideoTags} from "../../network/getVideoData";
import {getVideoCategory} from "../../network/getVideoData";
import {getVideos} from "../../network/getVideoData";
export default {
  name: "Videos",
  data(){
    return {

    }
  },
  created() {
    getVideoTags().then(res=>{
      console.log(res)
    }).catch(err=>{
      console.log(err)
    })
    this.getVideos()
  },
  methods:{
    getVideos(){
      getVideos(60100).then(res=>{
        console.log(res)
      }).catch(err=>{
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>

</style>
