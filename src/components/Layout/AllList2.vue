<template>
  <div class="all-list">
    <div
      @click="itemClick(item)"
      class="item"
      v-for="(item, index) in itemList"
    >
      <div class="img">
        <span class="play-count">{{
          item.playCount || item.playTime | playCountFormat
        }}</span>
        <span class="time">{{
          item.duration || item.durationms | timeFormat
        }}</span>
        <img :src="item.imgurl || item.coverUrl || item.cover" alt="" />
      </div>
      <p>{{ item.name || item.title }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "AllList2",
  props: {
    itemList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    itemClick(item) {
      if (item.id) {
        this.$router.push("/mv/" + item.id);
      } else if (item.vid) {
        this.$router.push("/mv/" + item.vid);
      }
    },
  },
  filters: {
    playCountFormat(value) {
      return value > 10000 ? (value / 10000).toFixed(0) + "万" : value;
    },
  },
};
</script>

<style scoped>
.all-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.item {
  cursor: pointer;
  margin: 10px 0;
  width: 31%;
}
.img {
  position: relative;
  width: 100%;
}
.img img {
  height: 120px;
  width: 100%;
  border-radius: 10px;
}
p {
  margin-top: 10px;
  font-size: 14px;
}
.play-count {
  position: absolute;
  right: 5px;
  top: 5px;
  font-size: 12px;
  color: #ffffff;
}
.time {
  position: absolute;
  right: 5px;
  bottom: 5px;
  font-size: 12px;
  color: #ffffff;
}
</style>
