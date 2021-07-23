<template>
  <div class="music-list-comment">
    <el-input
        type="textarea"
        :rows="3">
    </el-input>
    <div class="btns">
      <el-button size="mini" round>@</el-button>
      <el-button size="mini" round>#</el-button>
      <el-button class="send" size="mini" round>发送</el-button>
    </div>
    <h4>精彩评论</h4>
    <Comment :comments="hotComments"></Comment>
    <h4>最新评论</h4>
    <Comment :comments="comments"></Comment>
    <el-pagination
        small
        @current-change="pageChange"
        :page-size="30"
        background
        layout="prev, pager, next"
        :total="total">
    </el-pagination>
  </div>
</template>

<script>
import {getMusicListComments} from "../../network/getMusicListData";
import Comment from "../comment/Comment";
export default {
  name: "MusicListComment",
  components:{
    Comment,
  },
  data(){
    return {
      offset:0,
      total:0,
      hotComments:[],
      comments:[]
    }
  },
  created() {
    this.getMusicListComments()
  },
  methods:{
    getMusicListComments(){
      getMusicListComments(this.$route.params.id,30,this.offset*30).then(res=>{
        this.hotComments=res.data.hotComments
        this.comments=res.data.comments
        this.total=res.data.total
      }).catch(err=>{
        console.log(err)
      })
    },
    pageChange(page){
      this.offset=page
      this.getMusicListComments()
    }
  }
}
</script>

<style scoped>
.btns {
  margin: 10px 0 20px 0;
}
.send {
  float: right;
}
</style>
