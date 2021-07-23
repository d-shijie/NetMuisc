<template>
  <div class="similar-singers">
    <h2>需要登录后才能获取数据</h2>
  </div>
</template>

<script>
import {getSimilarSingers} from "../../network/getSingerData";

export default {
  name: "SimilarSingers",
  data(){
    return {
     singers:[]
    }
  },
  created() {
    this.getSimilarSingers()
  },
  methods:{
    getSimilarSingers(){
      getSimilarSingers(this.$route.params.id).then(res=>{
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
