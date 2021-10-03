<template>
  <div class="set-userinfo">
    <h3>编辑个人信息</h3>
    <div class="head-img">
      <img :src="headImg" alt="" />
      <el-upload
        :before-upload="handleBeforeUpload"
        action="#"
        :auto-upload="false"
        accept="image/png,image/jpeg,image/jpg"
        list-type="picture"
      >
        <el-button size="mini" round>修改头像</el-button>
      </el-upload>
    </div>
    <el-form ref="form" :model="userInfo" label-width="80px">
      <el-form-item label="昵称:">
        <el-input v-model="userInfo.nickname"></el-input>
      </el-form-item>
      <el-form-item label="签名:">
        <el-input
          resize="none"
          type="textarea"
          row="6"
          v-model="userInfo.signature"
        ></el-input>
      </el-form-item>
      <el-form-item label="生日:">
        <el-col :span="11">
          <el-date-picker
            type="date"
            value-format="timestamp"
            placeholder="选择日期"
            v-model="userInfo.birthday"
          ></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio v-model="userInfo.gender" :label="0">保密</el-radio>
        <el-radio v-model="userInfo.gender" :label="1">男</el-radio>
        <el-radio v-model="userInfo.gender" :label="2">女</el-radio>
      </el-form-item>
      <el-form-item label="地区:">
        <VDistpicker hide-area @selected="onSelected"></VDistpicker>
      </el-form-item>
      <el-form-item>
        <el-button @click="changeUserInfo" size="mini" round type="danger"
          >保存</el-button
        >
        <el-button size="mini" @click="dialogVisible = true" round
          >取消</el-button
        >
      </el-form-item>
    </el-form>
    <el-dialog title="修改未保存" :visible.sync="dialogVisible" width="30%">
      <span>修改的信息尚未保存，是否保存后离开</span>
      <span slot="footer">
        <el-button round size="mini" @click="cancel">取消</el-button>
        <el-button size="mini" type="danger" round @click="confirm"
          >保存</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import VDistpicker from "v-distpicker";
import { getProfileDetail, changeUserInfo } from "../../network/getProfileData";
export default {
  data() {
    return {
      headImg: "", // 头像url
      userInfo: {
        gender: "",
        birthday: "",
        nickname: "",
        province: "",
        city: "",
        signature: "",
      }, // 修改用户信息请求数据
      dialogVisible: false,
      headers: {
        "Content-Type": "multipart/form-data",
      }, // 更新头像请求体
    };
  },
  components: {
    VDistpicker,
  },
  created() {
    this.getProfileDetail();
  },
  methods: {
    // 用户信息
    getProfileDetail() {
      getProfileDetail(window.localStorage.getItem("userId"))
        .then((res) => {
          const result = res.data.profile;
          this.headImg = res.data.profile.avatarUrl;
          this.userInfo.gender = result.gender;
          this.userInfo.birthday = result.birthday;
          this.userInfo.nickname = result.nickname;
          this.userInfo.province = result.province;
          this.userInfo.city = result.city;
          this.userInfo.signature = result.signature;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    onSelected(data) {
      console.log(data);
      this.userInfo.province = data.province.code;
      this.userInfo.city = data.city.code;
    },
    // 修改用户信息
    changeUserInfo() {
      changeUserInfo(this.userInfo)
        .then((res) => {
          console.log(this.userInfo);
          this.$message.success({
            message: "修改成功",
          });
          this.getProfileDetail();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    cancel() {
      this.dialogVisible = false;
      this.$router.go(-1);
    },
    confirm() {
      this.dialogVisible = false;
      this.changeUserInfo();
    },
    handleBeforeUpload(file) {
      console.log(file);
      if (
        !(
          file.type === "image/png" ||
          file.type === "image/jpg" ||
          file.type === "image/jpeg"
        )
      ) {
        this.$notify.warning({
          title: "警告",
          message:
            "请上传格式为image/png, image/gif, image/jpg, image/jpeg的图片",
        });
      }
      let size = file.size / 1024 / 1024 / 2;
      if (size > 2) {
        this.$notify.warning({
          title: "警告",
          message: "图片大小必须小于2M",
        });
      }
      let fd = new FormData(); //通过form数据格式来传
      fd.append("imageFile", file); //传文件
      console.log(fd.get("imageFile"));
      this.$http({
        url: "http://localhost:8080/avatar/upload",
        method: "post",
        data: fd,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then((data) => {
        console.log(data);
      });
    },
  },
};
</script>
<style scoped >
.set-userinfo {
  position: relative;
}
/* @import url(); 引入css类 */
.el-form {
  margin: 15px 0;
}
.el-form-item {
  width: 500px;
  resize: none;
}
.head-img {
  position: absolute;
  right: 50px;
  top: 30px;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.head-img .el-button {
  width: 100px;
}
img {
  margin-bottom: 20px;
  width: 150px;
}
</style>