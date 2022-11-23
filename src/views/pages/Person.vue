<template>
  <el-card class="box-card">
    <el-upload
      style="text-align: center"
      class="avatar-uploader"
      action="http://localhost:9090/file/image/upload"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :on-error="handleAvatarError"
      >
      <img v-if="submitForm.avatarUrl" style="object-fit: cover" :src="submitForm.avatarUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <el-form label-position="left" label-width="80px">
      <el-form-item label="账号">
        <el-input v-model="submitForm.username"></el-input>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="submitForm.nickname"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="submitForm.password"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="submitForm.email"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="submitForm.iphone"></el-input>
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="submitForm.address"></el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="saveUserInfo">保存</el-button>
  </el-card>
</template>
<script>
  import requset from "../../utils/request";

  export default {
    data() {
      return {
        submitForm: {
          username: "",
          address: "",
          nickname: "",
          email: "",
          password: "",
          iphone: "",
          avatarUrl:"",
        },
        userInfo:localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):{}
      }
    },
    created() {
      requset.get("/user/username/" + this.userInfo.username).then(res => {
        if (res.code == "200") {
          this.submitForm = res.data
        }else {
          this.$message.error(res.msg)
        }
      })
    },
    methods:{

      getUserInfo(){
        requset.get(`/user/userinfo`).then(res => {
          if(res.code == "200"){
            localStorage.setItem("user",JSON.stringify(res.data))

            this.$message.success("更新用户信息成功")
            this.$emit("updateUserInfo")

          }else {
            this.$message.error("更新用户信息失败")
          }
        })
      },
      saveUserInfo(){
        requset.post(`/user/save`, this.submitForm).then(res => {
          if (res.code == "200") {
            this.$message.success("保存成功！")
            this.getUserInfo()
          } else {
            this.$message.error(res.msg)
          }
        })
      },

      //头像上传

      handleAvatarSuccess(res) {
        this.submitForm.avatarUrl = res
      },
      handleAvatarError(){
        this.submitForm.avatarUrl = ""
      }

    },

  }
</script>
<style>
  .avatar-uploader .el-upload {
    border: 1px solid #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #a5bde4;
  }
</style>
<style scoped>
  .box-card {
    width: 480px;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
</style>