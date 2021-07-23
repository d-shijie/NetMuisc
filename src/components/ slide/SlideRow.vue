<template>
  <div class="slide-row">
    <span @click="slideLeft" style="cursor: pointer" class="el-icon-arrow-left"></span>
    <span @click="$router.push('djrank')" class="rank">排行榜</span>
    <div ref="ul" class="ul">
      <div :style="{left:left+'px'}" ref="tags" class="tags">
        <div class="rank"></div>
        <div @click="itemClick(item)" ref="item" class="item" v-for="(item,index) in items">
          <div class="item-img"><img :src="item.picWebUrl" alt=""></div>
        </div>
      </div>
    </div>
    <span @click="slideRight" style="cursor: pointer" class="el-icon-arrow-right"></span>
  </div>
</template>

<script>
export default {
  name: "SlideRow",
  data(){
    return {
      left:0
    }
  },
  props:{
    items: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods:{
    slideRight(){
      if(this.left<0){
        const timer=setInterval(()=>{
          this.left+=10
          if(this.left===-530||this.left===-1100||this.left===0){
            clearInterval(timer)
          }
        },10)
      }else {
        this.$message.info("前面没有了哦")
      }
    },
    slideLeft(){
      if(this.left>-1100){
        const timer= setInterval(()=>{
          this.left-=10
          if(this.left===-530||this.left===-1100){
            clearInterval(timer)
          }
        },10)
      }else
        this.$message.info("后面没有更多了哟")
    },
    itemClick(item){
      this.$router.push("/djcategory/"+item.id)
    }
  }
}
</script>

<style scoped>
.rank {
  display: inline-block;
  width: 50px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  border-radius: 50%;
  font-size: 12px;
  cursor: pointer;
  background-color: #f3f3f3;
}
.slide-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.ul {
  width: 70%;
  overflow: hidden;
}
.tags {
  position: relative;
  text-align: center;
  justify-content: space-between;
  display: flex;
}
.item {
  cursor: pointer;
  width: 50px;
  border: 1px solid #eeeeee;
  margin-right: 40px;
  height: 50px;
  border-radius: 50%;
  background-color: #f3f3f3;
}
.item:hover,
.rank:hover{
  background-color: #efefef;
}
.item-img {
  overflow: hidden;
}
span {
  position: relative;
  z-index: 1000;
}
</style>
