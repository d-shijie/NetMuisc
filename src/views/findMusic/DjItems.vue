<template>
  <div class="dj-item" >
    <div @click="$router.push('/dj/'+item.id)"
         class="item"
         v-for="(item,index) in djs">
      <span>{{item.creatorName}}</span>
      <img :src="item.picUrl" alt="">
      <p>{{item.name}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "DjItems",
  props:{
    djs:{
      type:Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style scoped>
.dj-item{
  display: flex;
  justify-content: space-between;
}
.item {
   cursor: pointer;
  position: relative;
  width: 18%;
}
span {
  left: 5px;
  top: 130px;
  color: #ffffff;
  font-size: 12px;
  position: absolute;
}
.item img {
  width: 150px;
  height: 150px;
  border-radius: 10px;
}
p {
  margin-top: 5px;
  font-size: 14px;
}
</style>
