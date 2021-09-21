<template>
  <div class="profile">
    <div class="user-info">
      <img :src="userInfo.avatarUrl" alt="" />
      <div class="info">
        <h2>{{ userInfo.username }}</h2>
        <div class="detail">
          <div class="level">
            <span>Lv{{ userInfo.level }}</span>
            <span
              style="border-radius: 50%; background-color: #acacf5"
              v-if="userInfo.sex === 1"
              class="el-icon-male"
            ></span>
            <span
              style="border-radius: 50%; background-color: #ffc9c9"
              v-else
              class="el-icon-female"
            ></span>
          </div>
          <div class="btns">
            <el-button class="el-icon-message" size="medium" round
              >发私信</el-button
            >
            <el-button class="el-icon-plus" size="medium" round>关注</el-button>
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                <el-button class="other" size="medium" circle>...</el-button>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item class="clearfix">
                  加入黑名单
                </el-dropdown-item>
                <el-dropdown-item class="clearfix"> 举报 </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
        <div class="count">
          <div @click="goto('/gender/')" class="activity">
            <span>{{ userInfo.activityCount }}</span>
            <span>动态</span>
          </div>
          <div @click="goto('/follow/')" class="activity">
            <span>{{ userInfo.liked }}</span>
            <span>关注</span>
          </div>
          <div @click="goto('/followed/')" class="activity">
            <span>{{ userInfo.fans }}</span>
            <span>粉丝</span>
          </div>
        </div>
        <p>所在地区:</p>
        <p>社交网络:未知</p>
        <p>个人介绍:{{ userInfo.desc | descFilter }}</p>
      </div>
    </div>
    <h4>歌单({{ userInfo.playlistCount }})</h4>
    <div class="play-lists">
      <div
        @click="listClick(item.id)"
        class="play-list"
        v-for="(item, index) in playList.slice(0, userInfo.playlistCount)"
        :key="item.id"
      >
        <span class="el-icon-video-play">
          {{ item.playCount | playTime }}
        </span>
        <img :src="item.coverImgUrl" alt="" />
        <div class="list-name">
          {{ item.name }}
        </div>
        <div class="list-count">{{ item.trackCount }}首</div>
      </div>
    </div>
    <h4>收藏({{ playList.length - userInfo.playlistCount }})</h4>
    <div class="play-lists">
      <div
        @click="listClick(item.id)"
        class="play-list"
        v-for="(item, index) in playList.slice(
          userInfo.playlistCount,
          playList.length
        )"
        :key="item.id"
      >
        <span class="el-icon-video-play">
          {{ item.playCount | playTime }}
        </span>
        <img :src="item.coverImgUrl" alt="" />
        <div class="list-name">
          {{ item.name }}
        </div>
        <div class="list-count">{{ item.trackCount }}首</div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getProfileDetail,
  getUserAccount,
  getUserSubcount,
  getUserPlayList,
} from "../../network/getProfileData";

export default {
  name: "Profile",
  data() {
    return {
      userInfo: {
        avatarUrl: "",
        activityCount: 0,
        liked: 0,
        fans: 0,
      }, // 用户数据
      playList: [], //用户歌单 创建加收藏
    };
  },
  created() {
    this.getProfileDetail();
    this.getUserPlayList();
    // this.getUserAccount();
  },
  methods: {
    //获取用户详情
    getProfileDetail() {
      getProfileDetail(this.$route.params.id)
        .then((res) => {
          const result = res.data.profile;
          this.userInfo.playlistCount = result.playlistCount;
          this.userInfo.avatarUrl = result.avatarUrl;
          this.userInfo.username = result.nickname;
          this.userInfo.level = res.data.level;
          this.userInfo.listenSongs = res.data.listenSongs;
          this.userInfo.createDays = res.data.createDays;
          this.userInfo.birthday = result.birthday;
          this.userInfo.liked = result.follows;
          this.userInfo.fans = result.followeds;
          this.userInfo.sex = result.gender;
          this.userInfo.desc = result.signature;
          this.userInfo.createTime = result.createTime;
          this.userInfo.city = result.city;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 获取用户歌单
    getUserPlayList() {
      getUserPlayList(this.$route.params.id)
        .then((res) => {
          console.log(res);
          this.playList = res.data.playlist;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    listClick(id) {
      this.$router.push("/musiclist/" + id);
    },
    goto(path) {
      this.$router.push(path + this.$route.params.id);
    },
    // getUserAccount() {
    //   getUserAccount()
    //     .then((res) => {
    //       // console.log(res);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // },
    // getUserSubcount() {
    //   getUserSubcount()
    //     .then((res) => {
    //       console.log(res);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // },
  },
  filters: {
    descFilter(value) {
      return value.length === 0 ? "暂无介绍" : value;
    },
    playTime(value) {
      return value > 10000 ? (value / 10000).toFixed(0) + "万" : value;
    },
  },
};
</script>

<style scoped>
.play-lists {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.play-list {
  position: relative;
  width: 23%;
  cursor: pointer;
  font-size: 14px;
  margin-right: 15px;
  margin-bottom: 20px;
}
.el-icon-video-play {
  position: absolute;
  color: #fff;
  font-size: 12px;
  top: 5px;
  right: 5px;
}
.play-list img {
  width: 100%;
  border-radius: 10px;
}
.play-list .list-name {
  margin: 5px 0;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  color: #414141;
}
.play-list .list-count {
  color: rgb(141, 141, 141);
}
.other {
  margin-left: 10px;
}
h4 {
  margin: 20px 0;
}
.count {
  margin-top: 10px;
  align-items: center;
  display: flex;
}
.activity {
  cursor: pointer;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.activity span:nth-child(1) {
  padding-top: 15px;
  font-size: 18px;
}
.activity:nth-child(2) {
  border-left: 1px solid #eeeeee;
  border-right: 1px solid #eeeeee;
}
.activity span:nth-child(2) {
  font-size: 12px;
  display: inline-block;
  padding: 10px 20px;
}
p {
  font-size: 12px;
  margin: 5px 0;
}
.user-info {
  align-items: center;
  display: flex;
}
h2 {
  margin-bottom: 10px;
}
.info {
  width: 100%;
}
.user-info > img {
  width: 200px;
  height: 200px;
  margin-right: 30px;
  border-radius: 50%;
}
.info span:nth-child(1) {
  margin-right: 5px;
}
.detail {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #eeeeee;
  padding-bottom: 10px;
}
</style>
