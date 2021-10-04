<template>
  <div ref="alert" v-if="$store.state.showAlert" class="alert">
    <div
      @click="itemClick(index, item)"
      :class="classes[index]"
      class="item"
      v-for="(item, index) in items"
      :key="index"
    >
      {{ item }}
    </div>
    <div
      @click="deleteCloudMusic(item)"
      :class="styles[index]"
      class="item"
      v-for="(item, index) in titles"
      :key="'dir' + index"
    >
      {{ item }}
    </div>
  </div>
</template>

<script>
import { deleteCloudMusic } from "../../network/getCloudData";
import { getMusicUrl } from "../../network/getMusicListData";
export default {
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      },
    },
    styles: {
      type: Array,
      default() {
        return [];
      },
    },
    x: {
      type: String,
      default: "",
    },
    y: {
      type: String,
      default: "",
    },
    songId: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      items: ["播放(enter)", "下一首播放", "收藏到歌单", "分享", "下载"],
      classes: [
        "el-icon-video-play",
        "el-icon-refresh",
        "el-icon-folder-add",
        "el-icon-s-promotion",
        "el-icon-download",
      ],
    };
  },
  created() {},
  mounted() {},
  methods: {
    itemClick(index, item) {
      this.$store.commit("setShowAlert", false);
      // 播放按钮
      if (item === "播放(enter)") {
        getMusicUrl(this.songId)
          .then((res) => {
            this.$store.commit("setMusicUrl", res.data.data[0].url);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    // 控制alert位置
    setLocation() {
      this.$refs.alert.style.left = this.x;
      this.$refs.alert.style.top = this.y;
    },
    // 删除云盘歌曲
    deleteCloudMusic(item) {
      this.$store.commit("setShowAlert", false);

      if (item === "删除") {
        let query = {};
        query.id = this.songId;
        deleteCloudMusic(query)
          .then((res) => {
            this.$emit("delete");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
};
</script>
<style scoped >
/* @import url(); 引入css类 */
.alert {
  position: absolute;
  z-index: 100;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border: 1px solid rgb(170, 167, 167);
  box-shadow: -3px 3px 5px rgba(0, 0, 0, 0.3);
  font-size: 13px;
  width: 150px;
}
.item {
  padding: 10px;
  cursor: pointer;
}
.item:hover {
  background-color: #f2f2f2;
}
</style>