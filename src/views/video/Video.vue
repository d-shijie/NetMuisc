<template>
  <div class="video">
    <Title :title-data="titleData"></Title>
    <router-view></router-view>
  </div>
</template>

<script>
import Title from "../../components/title/Title";
export default {
  name: "Video",
  components:{
    Title
  },
  data(){
    return {
      titleData:["视频","MV"]
    }
  }
}
</script>

<style scoped>

</style>
