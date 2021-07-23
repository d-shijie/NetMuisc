<template>
  <div class="all-list">
    <div @click="itemClick(item)" @mouseover="itemOver(index)" @mouseleave="itemOut" v-for="(item,index) in itemList" class="item">
     <div class="img"><img v-if="currentIndex===index" class="play-icon" src="../../assets/img/play/播放.png" alt=""> <img :src="item.picUrl" alt=""></div>
      <div class="name">
        {{item.name}}
      </div>
      <div class="publish-time">
        {{item.publishTime|dateFormat}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AllList",
  props:{
    itemList:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data(){
    return {
      currentIndex:""
    }
  },
  methods:{
    itemOver(index){
      this.currentIndex=index
    },
    itemOut(){
      this.currentIndex=""
    },
    itemClick(item){
      this.$router.push("/album/"+item.id)
    }
  }
}
</script>

<style scoped>
.all-list {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.item {
  cursor: pointer;
  margin:10px 20px;
  width: 18%;
}
img {
  height: 130px;
  border-radius: 10px;
  width: 100%;
}
.name {
  margin: 10px 0;
  font-size: 14px;
}
.publish-time {
  color: #909090;
  font-size: 12px;
}
.active{

}
.img {
  position: relative;
}
.play-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  width: 40px;
  height: 40px;
}
</style>
