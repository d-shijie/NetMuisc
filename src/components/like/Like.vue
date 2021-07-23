<template>
 <div class="like">
   <img src="../../assets/img/like/添加喜欢.png" alt="">
   <img v-if="false" src="../../assets/img/like/取消喜欢.png" alt="">
 </div>
</template>

<script>
export default {
  name: "Like"
}
</script>

<style scoped>
img {
  cursor: pointer;
  width: 20px;
}
</style>
