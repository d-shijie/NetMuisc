<template>
  <div class="music-list-sub">
    <div @click="itemClick(item)" class="item" v-for="(item,index) in subscribers">
     <div class="left"><img :src="item.avatarUrl" alt=""></div>
     <div class="right">
       <div class="nickname">
         <span>{{item.nickname}}</span>
         <span style="background-color:#bbbbfd; border-radius: 50%" v-if="item.gender===1" class="el-icon-male"></span>
         <span style="background-color:#cea0a0; border-radius: 50%" v-else class="el-icon-female"></span>
       </div>
       <div class="desc">{{item.signature|textFilter}}</div>
     </div>
   </div>
    <el-pagination
        small
        @current-change="pageChange"
        :page-size="50"
        background
        layout="prev, pager, next"
        :total="total">
    </el-pagination>
  </div>
</template>

<script>
import {getMusicListSubs} from "../../network/getMusicListData";

export default {
  name: "MusicListSubers",
  data(){
    return {
      offset:0,
      total:0,
      subscribers:[]
    }
  },
  filters:{
    textFilter(value){
      if(value.length>10){
          return "点击进入主页查看更多"
      }else {
        return  value
      }
    }
  },
  created() {
    this.getMusicListSubs()
  },
  methods:{
    getMusicListSubs(){
      getMusicListSubs(this.$route.params.id,50,this.offset*50).then(res=>{
        this.subscribers=res.data.subscribers
        this.total=res.data.total
      }).catch(err=>{
        console.log(err)
      })
    },
    pageChange(page){
      this.offset=page
      this.getMusicListSubs()
    },
    itemClick(item){
      this.$router.push("/profile/"+item.userId)
    }
  }
}
</script>

<style scoped>
.music-list-sub {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
}
.item {
  cursor: pointer;
  margin: 10px 0;
  align-items: center;
  width: 40%;
  display: flex;
}
.right {
  display: flex;
  height: 90px;
  flex-direction: column;
  justify-content: space-around;
}
.left img {
  width: 90px;
  height: 90px;
  border-radius: 50%;
}
.left {
  margin-right: 15px;
}
span {
  font-size: 14px;
}
.desc {
  font-size: 12px;
  color: #727272;
}
.nickname span:nth-child(1){
  margin-right: 5px;
}
</style>
