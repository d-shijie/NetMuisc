<template>
  <div  class="singer-mv">
    <AllList2  :item-list="MVs"></AllList2>
  </div>
</template>

<script>
import {getSingerMVs} from "../../network/getSingerData";
import AllList2 from "../Layout/AllList2";
import Scroll from "../scroll/Scroll";
export default {
  name: "MV",
  components:{
    AllList2,
    Scroll
  },
  data(){
    return {
      MVs:[],
      isBottom:null,
      isTop:null,
      scroll:"",
      offset:0
    }
  },
  mounted() {

  },
  created() {
    this.getSingerMVs()
  },
  methods:{
    getSingerMVs(){
      getSingerMVs(this.$route.params.id,30,this.offset).then(res=>{
        this.MVs.push(...res.data.mvs)
      }).catch(err=>{
        console.log(err)
      })
    },
    isScrollBottom() {
      const box = this.$refs.chatListWrapper
      let scrollTop = box.scrollTop
      let scrollHeight = box.scrollHeight
      console.log(scrollTop,scrollHeight)
      if (scrollTop === scrollHeight) {
        this.isBottom = true
        this.isTop = false
      } else {
        this.isTop = false
        this.isBottom = false
        if (scrollTop === 0) {
          this.isTop = true
        }
      }
    },
  }
}
</script>

<style scoped>
.singer-mv {
  position: relative;
}
</style>
