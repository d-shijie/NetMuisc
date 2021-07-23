<template>
  <div class="tab-bar">
    <ul>
      <li @click="itemClick(index)" :class="{active:currentIndex===index}" v-for="(item,index) in choices">{{item}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "TabBar",
  data(){
    return {
      currentIndex:0,
      paths:["/findMusic","/video","/friend","/living","/personalFM"]
    }
  },
  props:{
    choices:{
      type:Array,
      default(){
        return []
      }
    },

  },
  methods:{
    itemClick(index){
      if(this.$route.path.indexOf(this.paths)===-1){
        this.currentIndex=index
      }else {
        this.currentIndex=""
      }
      switch (index){
        case 0:
          this.$router.push("/findMusic")
          break;
        case 1:
          this.$router.push("/video")
          break;
        case 2:
          this.$router.push("/friend")
          break;
        case 3:
          this.$router.push("/living")
          break;
        case 4:
          this.$router.push("/personalFM")
          break;
      }
    }
  }
}
</script>

<style scoped>
ul {
  margin-top:10px ;
}
li{
  cursor: pointer;
  font-size: 15px;
  margin: 5px 10px;
  padding: 10px 5px;
}
li:hover {
  background-color: #f2f2f2;
}
.active{
  font-size: 16px;
  background-color: #f2f2f2;
  font-weight: 800;
}
</style>
