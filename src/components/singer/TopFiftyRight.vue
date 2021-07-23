<template>
  <div class="top-fifty-right">
    <el-table @row-click="rowClick" size="mini" :data="hotSongs" stripe>
      <el-table-column type="index"></el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <Like></Like>
        </template>
      </el-table-column>
      <el-table-column prop="name">
      </el-table-column>
      <el-table-column prop="dt">
        <template slot-scope="scope">
          {{scope.row.dt|timeFormat}}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Like from "../like/Like";
export default {
  name: "TopFiftyRight",
  components:{
    Like
  },
  props:{
    hotSongs:{
      type:Array,
      default(){
        return []
      }
    }
  },
  methods:{
    rowClick(row){
      this.$http.get("/song/url",{params:{id:row.id}}).then(res=>{
        this.$store.state.musicUrl=res.data.data[0].url
      }).catch(err=>{
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>

</style>
