<template>
  <div class="mv-rank-list">
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
</template>

<script>
export default {
  name: "MVRankList",
  props: {
    MVBanks: {
      tyep: Array,
      default() {
        return [];
      },
    },
    tags: {
      tyep: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      tagName: "内地",
      currentIndex: 0, //控制标签样式,
    };
  },
  created() {},
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.tagName = this.tags[index];
      this.$emit('tagClick',this.tagName)
    },
    goto(id) {
      this.$router.push("/mv/" + id);
    },
  },
};
</script>
<style scoped >
/* @import url(); 引入css类 */
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
.mv-rank-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.mv-rank-list .mv {
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
.mv-rank-list .mv:nth-child(odd) {
  border-right: 1px solid #eee;
}
.mv-rank-list .mv img {
  border-radius: 10px;
  width: 50%;
}
.mv-rank-list .mv .desc {
  margin-left: 10px;
  font-size: 13px;
  color: rgb(102, 102, 102);
}
.mv-rank-list .mv .desc .mv-name {
  margin: 15px 0;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 150px;
}
</style>