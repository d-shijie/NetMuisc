<template>
  <div class="all-mv">
    <h3>全部MV</h3>
    <div class="area">
      <span>地区:</span>
      <div class="area-item" v-for="(item, index) in areaInfo" :key="index">
        <span
          @click="areaClick(index, item)"
          :class="{ active: currentIndexArea === index }"
          >{{ item }}</span
        >
      </div>
    </div>
    <div class="type">
      <span>类型:</span>
      <div class="type-item" v-for="(item, index) in typeInfo" :key="index">
        <span
          @click="typeClick(index, item)"
          :class="{ active: currentIndexType === index }"
        >
          {{ item }}</span
        >
      </div>
    </div>
    <div class="order">
      <span>排序:</span>
      <div class="order-item" v-for="(item, index) in orderInfo" :key="index">
        <span
          @click="orderClick(index, item)"
          :class="{ active: currentIndexOrder === index }"
        >
          {{ item }}</span
        >
      </div>
    </div>
    <all-list-2 :itemList="mvs"></all-list-2>
    <el-pagination
      :current-page="offset"
      small
      @current-change="pageChange"
      :page-size="30"
      background
      layout="prev, pager, next"
      :total="total"
    >
      >
    </el-pagination>
  </div>
</template>

<script>
import AllList2 from "../../components/Layout/AllList2.vue";
import { getAllMv } from "../../network/getMVData";
export default {
  components: { AllList2 },
  name: "AllMV",
  data() {
    return {
      typeInfo: ["全部", "官方版", "原声", "现场版", "网易出品"],
      areaInfo: ["全部", "内地", "港台", "欧美", "日本", "韩国"],
      orderInfo: ["上升最快", "最新", "最热"],
      currentIndexArea: 0,
      currentIndexType: 0,
      currentIndexOrder: 0,
      offset: 0,
      mvs: [],
      total: 0,
    };
  },
  created() {
    this.getAllMv("全部", "全部", "上升最快", 30);
  },
  methods: {
    // 地区分类点击
    areaClick(index, item) {
      this.currentIndexArea = index;
      this.offset = 0;
      this.getAllMv(
        this.areaInfo[this.currentIndexArea],
        this.typeInfo[this.currentIndexType],
        this.orderInfo[this.currentIndexOrder],
        30
      );
    },
    // 类型分类点击
    typeClick(index, item) {
      this.currentIndexType = index;
      this.offset = 0;
      this.getAllMv(
        this.areaInfo[this.currentIndexArea],
        this.typeInfo[this.currentIndexType],
        this.orderInfo[this.currentIndexOrder],
        30
      );
    },
    // 排序分类点击
    orderClick(index, item) {
      this.currentIndexOrder = index;
      this.offset = 0;
      this.getAllMv(
        this.areaInfo[this.currentIndexArea],
        this.typeInfo[this.currentIndexType],
        this.orderInfo[this.currentIndexOrder],
        30
      );
    },
    // 获取mv列表
    getAllMv(area, type, order, limit) {
      getAllMv(area, type, order, limit, this.offset * limit)
        .then((res) => {
          this.mvs = res.data.data;
          if (res.data.count) {
            this.total = res.data.count;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 下一页
    pageChange(page) {
      this.offset = page;
      this.getAllMv(
        this.areaInfo[this.currentIndexArea],
        this.typeInfo[this.currentIndexType],
        this.orderInfo[this.currentIndexOrder],
        30
      );
    },
  },
};
</script>
<style scoped >
/* @import url(); 引入css类 */
.order,
.type,
.area {
  display: flex;
  flex-wrap: wrap;
  font-size: 12px;
  align-items: center;
  width: 100%;
  margin: 10px 0;
}
.order-item,
.type-item,
.area-item {
  padding: 0 25px;
  cursor: pointer;
  margin: 5px 0 5px 0;
  border-right: 1px solid #eeeeee;
}
.order-item span,
.type-item span,
.area-item span {
  padding: 1px 8px;
  border-radius: 10px;
}

.active {
  background-color: #eeeeee;
  color: #f64444;
}
</style>