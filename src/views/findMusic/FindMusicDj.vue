<template>
  <div class="find-music-dj">
    <el-carousel :interval="5000" type="card" height="200px">
      <el-carousel-item v-for="(item, index) in banners" :key="index">
        <img class="banner" :src="item.pic" alt="" />
      </el-carousel-item>
    </el-carousel>
    <SlideRow :items="categories"></SlideRow>
    <SmallTitle :text="'付费精品'"></SmallTitle>
    <DjItems :djs="payGoods"></DjItems>
    <SmallTitle :text="'电台个性推荐'"></SmallTitle>
    <DjItems :djs="personalize"></DjItems>
    <SmallTitle :text="'有声书'"></SmallTitle>
    <DjItems :djs="soundBooks"></DjItems>
    <SmallTitle :text="'创作翻唱'"></SmallTitle>
    <DjItems :djs="create"></DjItems>
    <SmallTitle :text="'音乐推荐'"></SmallTitle>
    <DjItems :djs="musicRecommend"></DjItems>
    <SmallTitle :text="'情感'"></SmallTitle>
    <DjItems :djs="emotion"></DjItems>
    <SmallTitle :text="'脱口秀'"></SmallTitle>
    <DjItems :djs="talkShow"></DjItems>
  </div>
</template>

<script>
import { getDjBanner } from "../../network/getFindMusicData";
import { getPayGoods } from "../../network/getFindMusicData";
import { getDjPersonalize } from "../../network/getFindMusicData";
import { getDjCategory } from "../../network/getFindMusicData";
import { getDjCategoryRecommend } from "../../network/getFindMusicData";
import SmallTitle from "./SmallTitle";
import DjItems from "./DjItems";
import SlideRow from "../../components/slide/SlideRow";
export default {
  name: "FindMusicDj",
  components: {
    SmallTitle,
    DjItems,
    SlideRow,
  },
  data() {
    return {
      categories: [],
      banners: [],
      payGoods: [],
      personalize: [],
      create: [],
      emotion: [],
      talkShow: [],
      musicRecommend: [],
      soundBooks: [],
    };
  },
  created() {
    getDjCategory()
      .then((res) => {
        this.categories = res.data.categories;
      })
      .catch((err) => {
        console.log(err);
      });
    getDjBanner()
      .then((res) => {
        this.banners = res.data.data;
      })
      .catch((err) => {
        console.log(err);
      });
    this.getPayGoods();
    this.getDjPersonalize();
    getDjCategoryRecommend(2001)
      .then((res) => {
        this.create = res.data.djRadios.splice(1, 5);
      })
      .catch((err) => {
        console.log(err);
      });
    getDjCategoryRecommend(3)
      .then((res) => {
        this.emotion = res.data.djRadios.splice(1, 5);
      })
      .catch((err) => {
        console.log(err);
      });
    getDjCategoryRecommend(8)
      .then((res) => {
        this.talkShow = res.data.djRadios.splice(1, 5);
      })
      .catch((err) => {
        console.log(err);
      });
    getDjCategoryRecommend(2)
      .then((res) => {
        this.musicRecommend = res.data.djRadios.splice(1, 5);
      })
      .catch((err) => {
        console.log(err);
      });
    getDjCategoryRecommend(10001)
      .then((res) => {
        this.soundBooks = res.data.djRadios.splice(1, 5);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    getPayGoods() {
      getPayGoods(4)
        .then((res) => {
          this.payGoods = res.data.data.list;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getDjPersonalize() {
      getDjPersonalize(5)
        .then((res) => {
          this.personalize = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.banner {
  width: 100%;
  height: 200px;
  border-radius: 10px;
  border: 1px solid #f2f2f2;
}
</style>
