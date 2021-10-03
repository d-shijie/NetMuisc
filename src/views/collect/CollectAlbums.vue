<template>
  <div class="albums">
    <div class="top">
      <h4>收藏的专辑({{ albumCount }})</h4>
      <el-input
        suffix-icon="el-icon-search"
        size="mini"
        v-model="keyword"
        @keyup.enter.native="search"
        placeholder="搜索我收藏的专辑"
      ></el-input>
    </div>
    <div
      @click="goto(item.id)"
      class="album"
      v-for="(item, index) in albums"
      :key="item.id"
    >
      <img :src="item.picUrl | pic" alt="" />
      <div class="name">{{ item.name }}</div>
      <div class="artist">{{ item.artists[0].name }}</div>
      <div class="size">{{ item.size }}首</div>
    </div>
  </div>
</template>

<script>
import { getSublistAlbum } from "../../network/getAlbumData";
export default {
  data() {
    return {
      albumCount: 0,
      albums: [],
      copyAlbums: [],
      keyword: "",
    };
  },
  created() {
    this.getSublistAlbum();
  },
  filters: {
    pic(value) {
      if (value === null) {
        return "https://img0.baidu.com/it/u=2926187340,947096600&fm=15&fmt=auto";
      } else {
        return value;
      }
    },
  },
  methods: {
    getSublistAlbum() {
      getSublistAlbum()
        .then((res) => {
          this.albumCount = res.data.count;
          this.albums = res.data.data;
          this.copyAlbums = this.albums;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    goto(id) {
      this.$router.push("/musiclist/" + id);
    },
    search() {
      const arr = this.copyAlbums.filter((item) => {
        return item.name.indexOf(this.keyword) !== -1;
      });
      this.albums = arr;
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
.album {
  display: flex;
  padding: 10px 0;
  align-items: center;
}
.album img {
  border-radius: 5px;
  width: 60px;
  margin: 0 10px;
}
.album .name {
  flex: 1;
  font-size: 14px;
}
.album .artist {
  width: 250px;
  font-size: 12px;
  color: rgb(170, 170, 170);
}
.album .size {
  width: 50px;
  font-size: 12px;
  color: rgb(170, 170, 170);
}
.album:nth-child(even) {
  background-color: #f2f2f2;
}
</style>