<template>
  <div class="gender">
    <h3>{{ username }}的动态</h3>
    <div class="item" v-for="(item, index) in events" :key="index">
      <div class="user">
        <span><img :src="item.user.avatarUrl" alt="" /></span>
        <div class="user-info">
          <div class="nickname">
            <span @click="gotoProfile(item.user.userId)">{{
              item.user.nickname
            }}</span>
            <span v-if="item.type === 18"> 分享单曲</span>
            <span v-else-if="item.type === 19"> 分享专辑</span>
            <span v-else-if="item.type === 17 || item.type === 28">
              分享播客</span
            >
            <span v-else-if="item.type === 31"> 分享评论</span>
            <span v-else-if="item.type === 22"> 转发</span>
            <span v-if="item.type === 39"> 发布视频</span>
            <span v-else-if="item.type === 35 || item.type === 13">
              分享歌单</span
            >
            <span v-if="item.type === 24"> 分享专栏文章</span>
            <span v-else-if="item.type === 41 || item.type === 21">
              分享视频</span
            >
          </div>
          <div class="event-time">{{ item.eventTime | detailTimeFormat }}</div>
        </div>
      </div>
      <div class="msg">
        <div class="text">{{ JSON.parse(item.json).msg }}</div>
        <div v-if="JSON.parse(item.json).resource" class="resource">
          <div class="content">
            <span
              @click="gotoProfile(JSON.parse(item.json).resource.user.userId)"
            >
              {{ JSON.parse(item.json).resource.user.nickname }}</span
            >
            <span>: {{ JSON.parse(item.json).resource.content }}</span>
          </div>
          <div class="resource-name">
            {{ JSON.parse(item.json).resource.resourceName }}
          </div>
        </div>
        <div
          v-if="JSON.parse(item.json).song"
          @click="getSongUrl(JSON.parse(item.json).song.id)"
          class="song"
        >
          <span>
            <img :src="JSON.parse(item.json).song.album.picUrl" alt="" />
          </span>
          <span>
            <div class="song-name">
              {{ JSON.parse(item.json).song.name }}
            </div>
            <div class="creator">
              {{ JSON.parse(item.json).song.artists[0].name }}
            </div>
          </span>
        </div>
        <div
          v-if="JSON.parse(item.json).playlist"
          @click="gotoPlayList(JSON.parse(item.json).playlist.id)"
          class="song"
        >
          <span>
            <img :src="JSON.parse(item.json).playlist.coverImgUrl" alt="" />
          </span>
          <span>
            <div class="song-name">
              <span class="tag">歌单</span>
              {{ JSON.parse(item.json).playlist.name }}
            </div>
            <div class="creator">
              by {{ JSON.parse(item.json).playlist.creator.nickname }}
            </div>
          </span>
        </div>
        <div
          v-if="JSON.parse(item.json).djRadio"
          @click="gotoDj(JSON.parse(item.json).djRadio.id)"
          class="song"
        >
          <span>
            <img :src="JSON.parse(item.json).djRadio.picUrl" alt="" />
          </span>
          <span>
            <div class="song-name">
              <span class="tag">{{
                JSON.parse(item.json).djRadio.category
              }}</span>
              {{ JSON.parse(item.json).djRadio.name }}
            </div>
            <div class="creator">
              by {{ JSON.parse(item.json).djRadio.dj.nickname }}
            </div>
          </span>
        </div>
        <div
          v-if="JSON.parse(item.json).mv"
          @click="gotoMV(JSON.parse(item.json).mv.id)"
          class="mv"
        >
          <span class="mv-box">
            <span class="el-icon-caret-right"> </span>
            <span class="mv-name">
              {{ JSON.parse(item.json).mv.name }}
            </span>
            <span class="el-icon-video-play">
              {{ JSON.parse(item.json).mv.playCount | playCount }}
            </span>
            <span class="duration">
              {{ JSON.parse(item.json).mv.duration | timeFormat }}
            </span>
            <img :src="JSON.parse(item.json).mv.imgurl" alt="" />
          </span>
        </div>
        <div
          v-if="JSON.parse(item.json).video"
          @click="gotoVideo(JSON.parse(item.json).video.videoId)"
          class="mv"
        >
          <span
            v-if="JSON.parse(item.json).video.videoId !== ''"
            class="mv-box"
          >
            <span class="el-icon-caret-right"> </span>
            <span class="mv-name">
              {{ JSON.parse(item.json).video.name }}
            </span>
            <span class="el-icon-video-play">
              {{ JSON.parse(item.json).video.playTime | playCount }}
            </span>
            <span class="duration">
              {{ JSON.parse(item.json).video.durationms | timeFormat }}
            </span>
            <img :src="JSON.parse(item.json).video.coverUrl" alt="" />
          </span>
          <div class="alert" v-if="JSON.parse(item.json).video.videoId === ''">
            该视频已删除
          </div>
        </div>
        <div v-if="JSON.parse(item.json).event" class="event">
          <div class="content">
            {{ JSON.parse(JSON.parse(item.json).event.json).msg }}
          </div>

          <div class="img">
            <span
              @click="
                gotoVideo(
                  JSON.parse(JSON.parse(item.json).event.json).video.videoId
                )
              "
              class="el-icon-caret-right"
            >
            </span>
            <img
              v-if="JSON.parse(JSON.parse(item.json).event.json).video"
              :src="JSON.parse(JSON.parse(item.json).event.json).video.coverUrl"
              alt=""
            />
          </div>
        </div>
        <img
          width="50%"
          height="200px"
          v-if="item.pics[0]"
          :src="item.pics[0].originUrl"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script>
import { getUserGender, getProfileDetail } from "../../network/getProfileData";
import { getMusicUrl } from "../../network/getMusicListData";
export default {
  name: "a",
  data() {
    return {
      username: "", // 用户名
      events: [], //用户动态
    };
  },
  created() {
    this.getUserGender();
    this.getProfileDetail();
  },

  mounted() {},
  computed: {
    Events() {
      return this.events === [];
    },
  },
  filters: {
    playCount(value) {
      return value > 10000 ? (value / 10000).toFixed(0) + "万" : value;
    },
  },
  destroyed() {
    console.log(1);
  },
  methods: {
    log(json) {
      console.log(json);
    },
    // 获取用户动态
    getUserGender() {
      getUserGender(this.$route.params.id)
        .then((res) => {
          console.log(res.data.events);
          this.events = res.data.events;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 获取用户详情
    getProfileDetail() {
      getProfileDetail(this.$route.params.id)
        .then((res) => {
          this.username = res.data.profile.nickname;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    gotoProfile(id) {
      this.$router.push("/profile/" + id);
    },
    // 获取音乐url
    getSongUrl(id) {
      getMusicUrl(id)
        .then((res) => {
          this.$store.commit("setMusicUrl", res.data.data[0].url);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    gotoPlayList(id) {
      this.$router.push("/musiclist/" + id);
    },
    gotoDj(id) {
      this.$router.push("/dj/" + id);
    },
    gotoMV(id) {
      this.$router.push("/mv/" + id);
    },
    gotoVideo(id) {
      this.$router.push("/videoPlay/" + id);
    },
  },
};
</script>
<style scoped >
/* @import url(); 引入css类 */
.img {
  position: relative;
}
.img span {
  position: absolute;
  left: 50%;
}
.alert {
  background-color: #f2f2f2;
  padding: 15px;
  border-radius: 10px;
  text-align: center;
  font-size: 12px;
  color: rgb(150, 150, 150);
}
.mv img {
  width: 400px;
  height: 250px;
}
.mv-box {
  position: relative;
}
.mv-name,
.el-icon-video-play,
.duration,
.el-icon-caret-right {
  color: #fff;
  position: absolute;
}
.event img {
  width: 400px;
  height: 250px;
}
.el-icon-caret-right {
  left: 50%;
  transform: translateX(-50%);
  top: 0;
  font-size: 30px;
  border-radius: 50%;
  padding: 3px;
  background-color: rgba(0, 0, 0, 0.3);
  border: 1px solid rgb(180, 180, 180);
}
.el-icon-caret-right:hover {
  background-color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
}
.el-icon-video-play {
  left: 10px;
}
.el-icon-video-play,
.duration {
  bottom: -110px;
}
.duration {
  right: 10px;
}
.mv-name {
  top: -110px;
  left: 10px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.tag {
  border: 1px solid rgb(255, 105, 105);
  display: inline-block;
  color: rgb(255, 97, 97);
  padding: 3px;
  font-size: 12px;
}
.song,
.resource {
  background-color: #f2f2f2;
  border-radius: 10px;
  padding: 15px;
  cursor: pointer;
  margin: 10px 0;
}
.song:hover {
  background-color: #eee;
}
.resource:hover {
  background-color: #eee;
}
.content {
  letter-spacing: 1px;
  line-height: 30px;
  font-size: 14px;
}
.song {
  display: flex;
  align-items: center;
}
.song div {
  margin-left: 10px;
}
.song-name {
  font-size: 13px;

  color: rgb(71, 71, 71);
}
.creator {
  margin-top: 10px;
  font-size: 12px;
  color: rgb(143, 143, 143);
}
.song img {
  width: 50px;
}
.content span:nth-child(1) {
  color: rgb(133, 133, 255);
}
.content span:nth-child(1):hover {
  color: rgb(87, 87, 255);
}
.msg {
  font-size: 14px;
  color: rgb(65, 65, 65);
}
.msg img {
  border-radius: 10px;
  margin: 10px 0;
}
.resource-name {
  font-size: 12px;
  margin: 10px 0;
  color: rgb(146, 146, 146);
}
.item {
  padding: 30px 0;
  border-bottom: 1px solid #eee;
}
.user {
  margin: 10px 0;
  display: flex;
}
.user img {
  width: 40px;
  margin-right: 10px;
  border-radius: 50%;
}
.user-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.event-time {
  font-size: 12px;
  color: rgb(128, 128, 128);
}
.nickname {
  font-size: 13px;
  color: rgb(90, 90, 90);
}
.nickname span:nth-child(1) {
  cursor: pointer;
  color: rgb(145, 145, 255);
}
</style>