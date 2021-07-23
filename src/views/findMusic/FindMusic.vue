<template>
  <div class="find-music">
    <Title class="title" :title-data="titleData"></Title>
    <keep-alive>
    <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import Title from "../../components/title/Title";
export default {
  name: "FindMusic",
  components:{
    Title
  },
  data(){
    return {
      titleData:["个性推荐","歌单","主播电台","排行榜","歌手","最新音乐"]
    }
  }
}
</script>

<style scoped>

</style>
