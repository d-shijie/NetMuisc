<template>
  <div class="dj-category">
    <h2>dj分类</h2>
  </div>
</template>

<script>
import {getDjProgramDetail} from "../../network/getDjData";

export default {
  name: "DjCategory",
  data(){
    return {
      programInfo:{}
    }
  },
  created() {
    this.$message.info("没找到接口-.-")
  },
  methods:{
    getDjProgramDetail(){
      getDjProgramDetail(this.$route.params.id).then(res=>{
        console.log(res)
      }).catch(err=>{
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>

</style>
