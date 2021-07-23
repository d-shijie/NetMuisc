<template>
 <div class="top-fifty-left">
   <AllList :item-list="hotAlbums"></AllList>
 </div>
</template>

<script>
import AllList from "../Layout/AllList";
export default {
  name: "TopFiftyLeft",
  components:{
    AllList
  },
  props:{
    hotAlbums: {
      type:Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style scoped>

</style>
