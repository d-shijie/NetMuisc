<template>
    <div class="small-title">
      <h3>{{text}}></h3>
    </div>
</template>

<script>
export default {
  name: "SmallTitle",
  props:{
    text:{
      type:String,
      default:""
    },
    path:{
      type:String,
      default:""
    }
  },
  methods:{

  }
}
</script>

<style scoped>
.small-title {
  margin: 20px 0 10px 0;
}
h3 {
  cursor: pointer;
  color: #2d2d2d;
}
h3:hover{
  color: #000;
}
</style>
