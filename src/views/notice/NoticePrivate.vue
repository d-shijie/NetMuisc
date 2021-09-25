<template>
  <div class="private">
    <scroll class="content">
      <div
        @click="gotoProfile(item.fromUser.userId)"
        class="item"
        v-for="(item, index) in msgs"
        :key="index"
      >
        <span class="time">{{ item.lastMsgTime | detailTimeFormat }}</span>
        <img :src="item.fromUser.avatarUrl" alt="" />
        <span class="nickname">
          <div class="name">{{ item.fromUser.nickname }}</div>
          <div class="msg">
            {{ JSON.parse(item.lastMsg).msg }}
          </div>
        </span>
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from "../../components/scroll/Scroll.vue";
export default {
  props: {
    msgs: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    Scroll,
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    gotoProfile(id) {
      this.$router.push("/profile/" + id);
      location.reload();
    },
  },
};
</script>
<style scoped >
/* @import url(); 引入css类 */
.content {
  height: 61vh;
  overflow: hidden;
}
.item {
  position: relative;
  margin: 10px 0;
  display: flex;
  cursor: pointer;
  align-items: center;
}
.item:hover {
  background-color: #f2f2f2;
}
.time {
  position: absolute;
  right: 0;
  top: 5px;
  color: rgb(122, 122, 122);
  font-size: 12px;
}
.item img {
  margin-right: 10px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.nickname {
  flex: 1;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}
.name {
  font-size: 13px;
  color: rgb(197, 197, 255);
}
.msg {
  text-overflow: ellipsis;
  overflow: hidden;
  width: 300px;
  margin-top: 5px;
  color: rgb(77, 77, 77);
  font-size: 12px;
  white-space: nowrap;
}
</style>