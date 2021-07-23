<template>
  <div class="search">
    <h4 v-if="$route.path.indexOf('/singlesongs')!==-1">找到{{$store.state.singleTotal}}首单曲</h4>
    <h4 v-if="$route.path.indexOf('/singers')!==-1">找到{{$store.state.singerTotal}}位歌手</h4>
    <h4 v-if="$route.path.indexOf('/searchalbum')!==-1">找到{{$store.state.searchAlbumTotal}}张专辑</h4>
    <h4 v-if="$route.path.indexOf('/searchvideo')!==-1">找到{{$store.state.searchVideoTotal}}个视频</h4>
    <h4 v-if="$route.path.indexOf('/searchmusiclist')!==-1">找到{{$store.state.searchMusicListTotal}}个歌单</h4>
    <h4 v-if="$route.path.indexOf('/searchlyric')!==-1">找到{{$store.state.searchLyricTotal}}个歌词</h4>
    <h4 v-if="$route.path.indexOf('/searchliving')!==-1">找到{{$store.state.searchLivingTotal}}个主播电台</h4>
    <h4 v-if="$route.path.indexOf('/searchuser')!==-1">找到{{$store.state.searchUserTotal}}个用户</h4>
    <Title :title-data="titleData"></Title>
    <router-view></router-view>
  </div>
</template>

<script>
import Title from "../../components/title/Title";
import Like from "../../components/like/Like";
export default {
  name: "Search",
  props:{

  },
  components:{
    Title,
    Like
  },
  data(){
    return {
      titleData:["单曲","歌手","专辑","视频","歌单","歌词","主播电台","用户"],
    }
  },
  created() {

  },
  methods:{

  }
}
</script>

<style scoped>

</style>
