<template>
  <div ref="login" v-drag v-if="$store.state.showLogin" class="login">
    <span @click="close" class="close">X</span>
    <div v-if="show" class="qr-login">
      <h2 @click="getQR">扫码登录(点我获取二维码)</h2>
      <div class="qr-code" ref="qrCodeUrl"></div>
      <p>使用<a href="javaScript:;">网易云音乐APP</a>扫码登录</p>
      <div class="other">
        <i @click="otherClick">选择其他登录方式></i>
      </div>
    </div>
    <div v-else class="other-login">
      <span @click="shift" class="shift">
        <img src="../../assets/img/login/音乐.png" alt="" />
      </span>
      <span class="text"><span class="little"></span>扫码登录更安全</span>
      <div class="background">
        <img src="../../assets/img/login/login.webp" alt="" />
      </div>
      <el-form
        size="mini"
        :model="loginRuleForm"
        :rules="loginRules"
        ref="loginRuleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="loginRuleForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginRuleForm.password"></el-input>
        </el-form-item>
      </el-form>
      <div><el-checkbox v-model="checked">自动登录</el-checkbox></div>
      <div class="login-btn">
        <el-button @click="login" type="danger">登录</el-button>
      </div>
      <div class="register">
        <a href="javascript:;">注册</a>
      </div>
      <div class="brands">
        <span><img src="../../assets/img/login/微信.jpg" alt="" /></span>
        <span><img src="../../assets/img/login/QQ.jpg" alt="" /></span>
        <span><img src="../../assets/img/login/网易.jpg" alt="" /></span>
        <span><img src="../../assets/img/login/微博.jpg" alt="" /></span>
      </div>
      <el-checkbox v-model="checked2"
        >同意 <a href="javascript:;">《服务条款》</a>
        <a href="javascript:;">《隐私政策》</a>
        <a href="javascript:;">《儿童隐私政策》</a></el-checkbox
      >
    </div>
  </div>
</template>

<script>
import { getPhoneLogin } from "../../network/getLoginData";
import {
  getFindMusicPersonalizeMusicList,
  getDailyRecommend,
} from "../../network/getFindMusicData";
import {
  getUserInfo,
  getLoginKey,
  getQrImg,
  qrCheck,
} from "../../network/getProfileData";
import vueQr from "vue-qr";
import QRCode from "qrcodejs2";
export default {
  name: "Login",
  components: {
    vueQr,
  },
  data() {
    return {
      show: true,
      checked: false,
      checked2: false,
      loginRuleForm: {
        phone: "13658229170",
        password: "asd85134477",
      }, // 账号密码
      loginRules: {
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { min: 11, max: 11, message: "请输入正确的手机号", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 18, message: "请输入正确的密码", trigger: "blur" },
        ],
      },
      qrurl: "", // 二维码地址
      unikey: "", // 二维码key
    };
  },
  mounted() {
    this.getQR();
  },
  activated() {},
  methods: {
    getQR() {
      this.getLoginKey();
      this.creatQrCode();
    },
    // 获取二维码key以及url
    getLoginKey() {
      getLoginKey()
        .then((res) => {
          this.unikey = res.data.data.unikey;
          getQrImg(res.data.data.unikey)
            .then((res) => {
              this.qrurl = res.data.data.qrurl;
              qrCheck(this.unikey)
                .then((res) => {})
                .catch((err) => {
                  console.log(err);
                });
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 创建二维码图片
    creatQrCode() {
      new QRCode(this.$refs.qrCodeUrl, {
        text: this.qrurl, // 需要转换为二维码的内容
        width: 200,
        height: 200,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H,
      });
    },
    close() {
      this.$store.state.showLogin = false;
    },
    otherClick() {
      this.show = false;
    },
    shift() {
      this.show = true;
    },
    login() {
      this.$refs.loginRuleForm.validate((valid) => {
        if (valid === false) {
          this.$message.error("请填写正确账号密码");
        } else if (this.checked2 === false) {
          this.$message.error("请勾选下方协议");
        } else {
          getPhoneLogin(this.loginRuleForm.phone, this.loginRuleForm.password)
            .then((res) => {
              window.localStorage.setItem("token", res.data.token);
              this.$bus.$emit("getHeadUrl", res.data.profile.avatarUrl);
              window.localStorage.setItem("userId", res.data.account.id);
              this.$store.state.showLogin = false;
              this.$store.commit("setShowFriend", true);
              getFindMusicPersonalizeMusicList()
                .then((res) => {})
                .catch((err) => {
                  console.log(err);
                });
              getUserInfo(res.data.account.id)
                .then((res) => {
                  this.$store.commit("setUserInfo", res.data);
                })
                .catch((err) => {
                  console.log(err);
                });
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    },
  },
  directives: {
    drag: function (el) {
      let dragBox = el; //获取当前元素
      let imgMakeBox; //父盒子
      let moveW = 0; //移动元素的width
      let moveH = 0; //移动元素的height
      let parentW = 0; //父盒子的width
      let parentH = 0; //父盒子的height
      dragBox.onmousedown = (e) => {
        imgMakeBox = document.getElementById("app");
        moveW = dragBox.offsetWidth;
        moveH = dragBox.offsetHeight;
        parentW = imgMakeBox.offsetWidth; //父盒子的width
        parentH = imgMakeBox.offsetHeight; //父盒子的height
        let disX = e.pageX - dragBox.offsetLeft;
        let disY = e.pageY - dragBox.offsetTop;
        document.onmousemove = (e) => {
          let left = e.pageX - disX;
          let top = e.pageY - disY;
          let resW = parentW - moveW;
          let resH = parentH - moveH;
          left = left >= resW ? resW : left <= 0 ? 0 : left;
          top = top >= resH ? resH : top <= 0 ? 0 : top;
          dragBox.style.left = left - 350 + "px";
          dragBox.style.top = top + "px";
        };
        document.onmouseup = (e) => {
          document.onmousemove = null;
          document.onmouseup = null;
        };
      };
    },
  },
};
</script>

<style scoped>
.agree {
  font-size: 12px;
}
.brands {
  width: 220px;
  justify-content: space-between;
  margin: 0 auto;
  display: flex;
}
.brands span {
  display: inline-block;
  width: 20%;
}
.brands img {
  width: 30px;
  border-radius: 50%;
  border: 1px solid #eeeeee;
  height: 30px;
}
.login-btn,
.register {
  margin: 15px 0;
  text-align: center;
}
.register {
  color: #2d2d2d;
  text-decoration: underline;
}
.el-form {
  padding-right: 40px;
  margin-top: 20px;
}
.el-button {
  width: 200px;
}
.el-checkbox:nth-child(2) {
  font-size: 12px;
}
.el-checkbox:nth-child(1) {
  margin: 0 50px;
}
.background {
  width: 100%;
}
.background img {
  width: 100%;
}
.little {
  position: absolute;
  display: inline-block;
  width: 0;
  border: 6px solid transparent;
  border-top-color: #adadad;
  border-right-color: #adadad;
  top: 0;
  left: -7px;
  height: 0;
  line-height: 0;
}
.text {
  position: relative;
  display: inline-block;
  background-color: #adadad;
  padding: 5px;
  border-radius: 5px;
  font-size: 12px;
}
.shift {
  margin-right: 5px;
  cursor: pointer;
  display: inline-block;
  width: 50px;
  height: 50px;
}
.shift img {
  width: 100%;
}
p {
  text-align: center;
}
a {
  text-decoration: none;
}
h2 {
  margin-top: 100px;
  text-align: center;
}
.qr-code {
  overflow: hidden;
  width: 100%;
  text-align: center;
  line-height: 100px;
  margin: 30px 0 30px 80px;
  height: 200px;
}
.login {
  height: 530px;
  width: 350px;
  background-color: #ffffff;
  border: 1px solid #eeeeee;
}
.close {
  display: inline-block;
  padding: 3px;
  font-size: 20px;
  cursor: pointer;
  position: absolute;
  right: 2px;
  top: 2px;
}
.other {
  margin-top: 100px;
  cursor: pointer;
  font-size: 12px;
  text-align: center;
}
</style>
