<template>
  <div @click="goto" :class="{show:border}" class="logout-item">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
  props: {
    path: {
      type: String,
      default: "",
    },
    border:{
        type:Boolean,
        default:false
    }
  },
  data() {
    return {};
  },
  created() {},
  methods: {
      goto(){
          this.$router.push(this.path)
      }
  },
};
</script>
<style scoped >
/* @import url(); 引入css类 */
.logout-item {
  padding: 10px 0;
  margin: 0 10px;
  display: flex;
  cursor: pointer;
  align-items: center;
 
}
.logout-item:hover {
  background-color: rgb(238, 238, 238);
}
.left {
  font-size: 20px;
  width: 25px;
}
.right {
  width: 20px;
}
.center {
  flex: 1;
  font-size: 13px;
  color: rgb(83, 83, 83);
}
.show{
 border-top: 1px solid #eee;
}
</style>