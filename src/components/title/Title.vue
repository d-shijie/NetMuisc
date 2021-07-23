<template>
  <div class="title">
    <ul>
      <li @click="itemClick(index)" :class="{active:currentIndex===index}" v-for="(item,index)  in titleData">
        <p>{{item}}</p>
        <span v-if="currentIndex===index"></span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Title",
  data(){
    return {
      currentIndex:0
    }
  },
  props:{
    titleData:{
      type:Array,
      default(){
        return []
      }
    }
  },
  methods:{
    itemClick(index) {
      switch (index){
        case 0:
          this.$router.push("singlesongs")
          break;
        case 1:
          this.$router.push("singers")
              break;
        case 2:
          this.$router.push("searchalbum")
          break;
        case 3:
          this.$router.push("searchvideo")
          break;
        case 4:
          this.$router.push("searchmusiclist")
          break;
        case 5:
          this.$router.push("searchlyric")
          break;
        case 6:
          this.$router.push("searchliving")
          break;
        case 7:
          this.$router.push("searchuser")
          break;
      }
      this.currentIndex=index
    }
  }
}
</script>

<style scoped>
ul {
  margin-top: 20px;
  display: flex;
}
li {
  text-align: center;
  cursor: pointer;
  font-size: 14px;
  margin-right:30px;
}
span {
  width: 80%;
  height: 3px;
  border-radius: 3px;
  display: inline-block;
  background-color: #cd0909;
}
.active {
  font-weight: 600;
}
</style>
