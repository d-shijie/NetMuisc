<template>
  <div class="topic-detail">
      <h3>话题接口404</h3>
  </div>
</template>

<script>
import { getTopicDetail, getTopicEvent } from "../../network/getTopicData";
export default {
  name: "TopicDetail",
  data() {
    return {};
  },
  created() {
    this.getTopicDetail(this.$route.params.id);
    this.getTopicEvent(this.$route.params.id);
  },
  methods: {
    getTopicDetail(id) {
      getTopicDetail(id)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getTopicEvent(id) {
      getTopicEvent(id)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style scoped >
/* @import url(); 引入css类 */
</style>