<template>
  <div class="mv-button">
    <div @click="playMV" class="play">
      <img src="../../assets/img/play/MV.png" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: "MVButton",
  props:{
    mvid:{
      type:Number,
      default:0
    }
  },
  methods:{
    playMV(){
      this.$router.push("/mv/"+this.mvid)
    }
  }
}
</script>

<style scoped>
img {
  cursor: pointer;
  width: 20px;
  height: 20px;
}
</style>
