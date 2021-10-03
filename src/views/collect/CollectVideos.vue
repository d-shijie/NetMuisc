<template>
  <div class="collect-videos">
    <div class="top">
      <h4>收藏的视频({{ videoCount }})</h4>
      <el-input
        suffix-icon="el-icon-search"
        size="mini"
        v-model="keyword"
        @keyup.enter.native="search"
        placeholder="搜索我收藏的视频"
      ></el-input>
    </div>
    <all-list-2 :itemList="videos"></all-list-2>
  </div>
</template>

<script>
import AllList2 from "../../components/Layout/AllList2.vue";
import { getSublistMV } from "../../network/getMVData";

export default {
  components: { AllList2 },
  data() {
    return {
      videoCount: 0,
      videos: [],
      copyVideos: [],
      keyword: "",
    };
  },
  created() {
    this.getSublistMV();
  },
  methods: {
    getSublistMV() {
      getSublistMV()
        .then((res) => {
         
          this.videoCount = res.data.data.length;
          this.videos = res.data.data;
          this.copyVideos = this.videos;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //搜索 本质是对收藏歌单进行筛选
    search() {
      const arr = this.copyVideos.filter((item) => {
        return item.title.indexOf(this.keyword) !== -1;
      });
      this.videos = arr;
    },
  },
};
</script>
<style scoped >
/* @import url(); 引入css类 */
.top {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}
h4 {
  flex: 1;
}
.el-input {
  width: 200px;
}
</style>