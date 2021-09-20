<template>
  <div class="mv-rank">
    <h3>MV排行榜</h3>
    <MVRankList
      class="mvRankList"
      @tagClick="tagClick"
      :MVBanks="mvs"
      :tags="tags"
    ></MVRankList>
  </div>
</template>

<script>
import MVRankList from "../../views/video/MVRankList.vue";
import { getMVBank } from "../../network/getMVData";
export default {
  name: "MVRank",

  components: { MVRankList },
  data() {
    return {
      tags: ["内地", "港台", "欧美", "日本", "韩国"], //标签列表 类型关键字
      mvs: [], //mv列表
      total: 0, // mv总数
    };
  },
  created() {
    this.getMVBank("");
  },
  methods: {
    getMVBank(area) {
      getMVBank(50, area)
        .then((res) => {
          console.log(res);
          this.mvs = res.data.data;
          if (res.data.count) {
            this.total = res.data.count;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    tagClick(tagName) {
      this.getMVBank(tagName);
    },
  },
};
</script>
<style scoped >
/* @import url(); 引入css类 */
.mv-rank {
  position: relative;
}
h3 {
  position: absolute;
  top: -40px;
}
.mvRankList {
  margin-top: 50px;
}
</style>