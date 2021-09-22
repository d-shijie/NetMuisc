<template>
  <div class="mvs">
    <div class="tags">
      <span class="name">{{ tagName }}</span>
      <ul>
        <li
          @click="itemClick(index)"
          :class="{ active: currentIndex === index }"
          v-for="(item, index) in tags"
          :key="index"
        >
          {{ item }}
        </li>
      </ul>
    </div>
    <SmallTitle path="/allmv" text="最新MV"></SmallTitle>
    <all-list-2 :itemList="musics['最新'].list"></all-list-2>
    <SmallTitle path="/allmv" text="热播MV"></SmallTitle>
    <all-list-2 :itemList="musics['最热'].list"></all-list-2>
    <SmallTitle path="/allmv" text="网易出品MV"></SmallTitle>
    <all-list-2 :itemList="musics['网易出品'].list"></all-list-2>
    <SmallTitle path="/mvRank" text="MV排行榜"></SmallTitle>
    <div class="types">
      <span
        @click="typeClick(index, item)"
        class="type"
        :class="{ active: typeCurrentIndex === index }"
        v-for="(item, index) in tags"
        :key="index"
      >
        {{ item }}
      </span>
    </div>
    <div class="mvs">
      <div
        @click="goto(item.id)"
        class="mv"
        v-for="(item, index) in MVBanks"
        :key="item.id"
      >
        <div class="rank">
          <div class="count">{{ "0" + (index + 1) }}</div>
          <div class="icon"></div>
        </div>
        <img :src="item.cover" alt="" />
        <div class="desc">
          <div class="mv-name">
            {{ item.name }}
          </div>
          <div class="artistName">
            {{ item.artistName }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AllList2 from "../../components/Layout/AllList2.vue";
import { getAllMv, getMVBank } from "../../network/getMVData";
import SmallTitle from "../findMusic/SmallTitle.vue";

export default {
  components: { SmallTitle, AllList2 },
  name: "MVs",
  data() {
    return {
      tagName: "内地", //标签名
      tags: ["内地", "港台", "欧美", "日本", "韩国"], //标签列表 类型关键字
      currentIndex: 0, //控制标签样式,
      typeCurrentIndex: 0,
      musics: {
        最新: { list: [] },
        最热: { list: [] },
        网易出品: { list: [] },
      }, // mv列表数据
      MVBanks: [], //mv前十列表
    };
  },
  created() {
    this.getAllMv("内地", "", "最新", 6);
    this.getAllMv("内地", "", "最热", 6);
    this.getAllMv("内地", "网易出品", "", 6);
    this.getMVBank("内地");
  },
  methods: {
    // 获取mv列表
    getAllMv(area, type, order, limit) {
      getAllMv(area, type, order, limit)
        .then((res) => {
          if (type) {
            this.musics[type].list = res.data.data;
          } else if (order) {
            this.musics[order].list = res.data.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 获取mv排行榜
    getMVBank(area) {
      getMVBank(10, area)
        .then((res) => {
          this.MVBanks = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // mv点击事件
    itemClick(index) {
      this.currentIndex = index;
      this.tagName = this.tags[index];
      this.getAllMv(this.tags[index], "", "最新", 6);
    },
    //mv排行分类点击事件
    typeClick(index, item) {
      this.typeCurrentIndex = index;
      this.getMVBank(item);
    },
    // mv排行点击事件
    goto(id) {
      this.$router.push("/mv/" + id);
    },
  },
};
</script>

<style scoped>
/* .mvs {
  padding-bottom: 60px;
} */
.tags {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.name {
  display: inline-block;
  cursor: pointer;
  font-size: 15px;
  padding: 3px 25px;
  border-radius: 10px;
  color: rgb(63, 62, 62);
  border: 1px solid rgb(190, 190, 190);
}
.name:hover {
  background-color: #f2f2f2;
}
ul {
  display: flex;
}
li {
  padding: 3px 8px;
  cursor: pointer;
  margin: 0 5px;
  border-radius: 10px;
  font-size: 12px;
  color: rgb(61, 61, 61);
}
li:hover {
  color: #000;
}
.active {
  color: rgb(255, 42, 42) !important;
  border: 1px solid #eee !important;
  background-color: rgb(228, 228, 228) !important;
}
.types .type {
  display: inline-block;
  font-size: 13px;
  cursor: pointer;
  padding: 3px 5px;
  color: rgb(121, 121, 121);
  margin-right: 15px;
  border-radius: 10px;
}
.mvs {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.mvs .mv {
  align-items: center;
  padding: 15px;
  display: flex;
  border-bottom: 1px solid #eee;
  width: 45%;
}
.rank {
  margin-right: 10px;
  font-size: 18px;
  font-weight: 200;
  color: #ccc;
}
.mv:nth-child(even) {
  flex: 1;
}
.mvs .mv:nth-child(odd) {
  border-right: 1px solid #eee;
}
.mvs .mv img {
  border-radius: 10px;
  width: 50%;
}
.mvs .mv .desc {
  margin-left: 10px;
  font-size: 13px;
  color: rgb(102, 102, 102);
}
.mvs .mv .desc .mv-name {
  margin: 15px 0;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 150px;
}
</style>
