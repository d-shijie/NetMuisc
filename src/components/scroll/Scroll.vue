<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll"
export default {
  name: "Scroll",
  props:{
    pullUpLoad:{
      type:Boolean,
      default(){
        return false
      }
    },
    probeType:{
      type:Number,
      default:0
    }
  },
  data(){
    return {
      scroll:null
    }
  },
  mounted() {
    this.scroll=new BScroll(this.$refs.wrapper,{
      click:true, //允许点击
      pullUpLoad:this.pullUpLoad, // 下拉加载
      probeType:this.probeType // 滑动显示坐标
    })
    this.scroll.on("pullingUp",()=>{
      this.$emit("pullingUp")
    })
  },
  methods:{
    scrollTo(x,y,time){
      this.scroll.scrollTo(0,0,0)
    },
    finishPullUp(){
      this.scroll.finishPullUp()
    }
  }
}
</script>

<style scoped>

</style>
