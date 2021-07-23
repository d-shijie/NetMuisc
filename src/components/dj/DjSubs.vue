<template>
  <div class="dj-subs">
   <div @click="itemClick(item)" class="item" v-for="(item,index) in subscribers">
     <img :src="item.avatarUrl" alt="">
     <div class="info">
       <div class="nickname">
         <span>{{item.nickname}}</span>
         <span v-if="item.gender===1" style="background-color:#acacfa;border-radius: 50%" class="el-icon-male"></span>
         <span v-else style="background-color:#f8bebe;border-radius: 50%" class="el-icon-female"></span>
       </div>
       <div class="desc">{{item.signature}}</div>
     </div>
   </div>
  </div>
</template>

<script>
import {getDjSubscribers} from "../../network/getDjData";

export default {
  name: "DjSubs",
  data(){
    return {
         subscribers:[]
    }
  },
  created() {
    this.getDjSubscribers()
  },
  methods:{
    getDjSubscribers(){
      getDjSubscribers(this.$route.params.id,30,Date.now()).then(res=>{
        console.log(res.data.subscribers)
        this.subscribers=res.data.subscribers
      }).catch(err=>{
        console.log(err)
      })
    },
    itemClick(item){
      this.$router.push("/profile/"+item.userId)
    }
  }
}
</script>

<style scoped>
.dj-subs{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.info {
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.nickname span:nth-child(1){
  display: inline-block;
  margin-right: 5px;
}
.desc {
  color: #616161;
  font-size: 12px;
}
.item {

  display: flex;
  align-items: center;
  cursor: pointer;
  width: 44%;
  margin: 15px 0;
}
img {
  margin-right: 15px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
</style>
