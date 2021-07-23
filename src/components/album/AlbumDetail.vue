<template>
  <div class="album-detail">
    <h4>专辑介绍</h4>
    <div class="content" v-for="item in desc">
      {{item}}
    </div>
  </div>
</template>

<script>
export default {
  name: "AlbumDetail",
  data(){
    return {
      desc:""
    }
  },
  created() {
    this.getAlbumDesc()
  },
  methods:{
    getAlbumDesc(){
      this.$http.get("/album",{
        params:{id:this.$route.params.id}
      }).then(res=>{
        this.desc=res.data.album.description.split(/[(\r\n)\r\n]+/)


      }).catch(err=>{
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
.album-detail {
  width: 100%;
}
.content {
  margin: 20px;

}
</style>
