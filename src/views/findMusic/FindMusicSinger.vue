<template>
  <div class="find-music-singer">
    <div class="area">
      <span>语种:</span>
      <div class="area-item" v-for="(item, index) in areaInfo">
        <span
          @click="areaClick(index)"
          :class="{ active: currentIndexArea === index }"
          >{{ item }}</span
        >
      </div>
    </div>
    <div class="type">
      <span>分类:</span>
      <div class="type-item" v-for="(item, index) in typeInfo">
        <span
          @click="typeClick(index)"
          :class="{ active: currentIndexType === index }"
        >
          {{ item }}</span
        >
      </div>
    </div>
    <div class="initial">
      <span>筛选:</span>
      <div class="hot">
        <span @click="hotClick" :class="{ active: currentIndexInitial === '' }"
          >热门</span
        >
      </div>
      <div class="initial-item" v-for="(item, index) in initialInfo">
        <span
          @click="initialClick(index)"
          :class="{ active: currentIndexInitial === index }"
          >{{ item }}</span
        >
      </div>
      <div class="other">
        <span
          @click="otherClick"
          :class="{ active: currentIndexInitial === '#' }"
          >#</span
        >
      </div>
    </div>
    <div class="singers">
      <div
        @click="$router.push('/singer/' + item.id)"
        class="item"
        v-for="(item, index) in singers"
      >
        <img :src="item.picUrl" alt="" />
        <p>{{ item.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { getSingerList } from "../../network/getSingerData";

export default {
  name: "FindMusicSinger",
  data() {
    return {
      type: -1,
      area: -1,
      initial: -1,
      typeInfo: ["全部", "男歌手", "女歌手", "乐队组合"],
      areaInfo: ["全部", "华语", "欧美", "日本", "韩国", "其他"],
      initialInfo: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "M",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
      ],
      currentIndexInitial: "",
      currentIndexType: 0,
      currentIndexArea: 0,
      singers: [],
    };
  },
  created() {
    this.getSingerList();
  },
  methods: {
    getSingerList() {
      getSingerList(50, 0, this.type, this.area, this.initial)
        .then((res) => {
          this.singers = res.data.artists;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    areaClick(index) {
      this.currentIndexArea = index;
      switch (index) {
        case 0:
          this.area = -1;
          this.getSingerList();
          break;
        case 1:
          this.area = 7;
          this.getSingerList();
          break;
        case 2:
          this.area = 96;
          this.getSingerList();
          break;
        case 3:
          this.area = 8;
          this.getSingerList();
          break;
        case 4:
          this.area = 16;
          this.getSingerList();
          break;
        case 5:
          this.area = 0;
          this.getSingerList();
          break;
      }
    },
    typeClick(index) {
      this.currentIndexType = index;
      switch (index) {
        case 0:
          this.type = -1;
          break;
        case 1:
          this.type = 1;
          break;
        case 2:
          this.type = 2;
          break;
        case 3:
          this.type = 3;
          break;
      }
      this.getSingerList();
    },
    initialClick(index) {
      this.currentIndexInitial = index;
      this.initial = this.initialInfo[index];
      this.getSingerList();
    },
    hotClick() {
      this.currentIndexInitial = "";
      this.initial = -1;
      this.getSingerList();
    },
    otherClick() {
      this.currentIndexInitial = "#";
      this.initial = 0;
      this.getSingerList();
    },
  },
};
</script>

<style scoped>
.other {
  padding: 1px 25px;
}
.other span {
  cursor: pointer;
  padding: 1px 8px;
  margin-left: 0;
  border-radius: 10px;
}
.singers {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.hot {
  margin-left: 26px;
  padding: 1px 20px;
  border-right: 1px solid #eeeeee;
}
.hot span {
  cursor: pointer;
  padding: 1px 8px;
  margin-left: -20px;
  border-radius: 10px;
}
.singers .item {
  width: 18%;
  cursor: pointer;
  margin-bottom: 20px;
}
.singers .item img {
  width: 100%;
  border-radius: 10px;
}
.initial,
.type,
.area {
  display: flex;
  flex-wrap: wrap;
  font-size: 12px;
  align-items: center;
  width: 100%;
  margin: 10px 0;
}
p {
  margin-top: 5px;
}
.initial-item,
.type-item,
.area-item {
  padding: 0 25px;
  cursor: pointer;
  margin: 5px 0 5px 0;
  border-right: 1px solid #eeeeee;
}
.initial-item span,
.type-item span,
.area-item span {
  padding: 1px 8px;
  border-radius: 10px;
}
.active {
  background-color: #eeeeee;
  color: #f64444;
}
</style>
