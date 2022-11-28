<template>
  <div class="background">
    <div class="loginboxcontainer">
      <el-card class="login-box" shadow="hover">
        <el-form :rules="rules" ref="ruleLoginForm" validate-on-rule-change v-show="isLoginStatus" label-position="top" label-width="80px" :model="submitLoginForm">
          <el-form-item prop="username" label="用户名">
            <el-input v-model="submitLoginForm.username" clearable></el-input>
          </el-form-item>
          <el-form-item prop="password" label="密码" >
            <el-input v-model="submitLoginForm.password" show-password></el-input>
          </el-form-item>
        </el-form>
        <el-form :rules="rules" ref="ruleRegisterForm" v-show="!isLoginStatus" label-position="left"  :model="submitRegisterForm">
          <h3 style="text-align: center;margin-bottom: 10px">注册</h3>
          <el-form-item  prop="username" >
            <el-input placeholder="请输入用户名" v-model="submitRegisterForm.username"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input placeholder="请输入密码"  v-model="submitRegisterForm.password"></el-input>
          </el-form-item>
          <el-form-item  prop="password">
            <el-input placeholder="请确认密码" v-model="submitRegisterForm.confirmPassword"></el-input>
          </el-form-item>
        </el-form>
        <div class="login-btn-box">
          <div style="display:inline-block;position: relative;left: 50%;transform: translateX(-50%)">
            <el-button  v-show="isLoginStatus" class="login-btn" type="primary" @click="handleSubmitLoginForm">登录</el-button>
            <el-button v-show="!isLoginStatus" class="login-btn" type="primary" @click="handleChangeStatus">返回登录</el-button>
            <el-button v-show="isLoginStatus" class="login-btn" type="primary" @click="handleChangeStatus">注册</el-button>
            <el-button v-show="!isLoginStatus" class="login-btn" type="primary" @click="handleSignIn">注册</el-button>
          </div>
        </div>
      </el-card>
    </div>
  </div>

</template>
<script>
  import requset from "../utils/request";
  import {handleRouter, setRoutes} from "../router";
  import {getStore, setStore} from "../utils/localstoreage";

  export default {
    data() {
      return {
        submitLoginForm: {
          username: "",
          password: ""
        },
        submitRegisterForm:{
          confirmPassword:"",
          username:"",
          password:"",
        },
        isLoginStatus:true,
        rules:{
          username: [
            { required: false, message: '请输入用户名', trigger: 'change' },
            { min: 3, max: 10, message: '长度在 3 到 5 个字符', trigger: 'change' }
          ],
          password: [
            { required: false, message: '请输入密码', trigger: 'change' },
            { min: 3, max: 10, message: '长度在 3 到 5 个字符', trigger: 'change' }
          ],
          email: [
            { required: false, message: '请输入邮箱', trigger: 'change' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'change' }
          ],
          iphone: [
            { required: false, message: '请输入手机号码', trigger: 'change' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'change' }
          ],
          address: [
            { required: false, message: '请输入地址', trigger: 'change' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'change' }
          ],
          nickname: [
            { required: false, message: '请输入昵称', trigger: 'change' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'change' }
          ]
        }
      }
    },
    methods:{
      handleSubmitLoginForm(){
        this.$refs["ruleLoginForm"].validate(valid=>{
          if(valid){
            requset.post("/login",this.submitLoginForm).then(res=>{
              if(res.code === "200"){
                localStorage.setItem("token",res.data)
                requset.get("/user/userinfo").then(userres=>{
                  if(res.code == "200") {
                    localStorage.setItem("menus",JSON.stringify(userres.data.menus))
                    localStorage.setItem("user",JSON.stringify(userres.data))
                    this.$message.success("登录成功")
                    setStore("isTokenTimeOut","false")
                    this.$router.push('/').catch(()=>{})
                  }
                })
              }else{
                this.$message.error(res.msg)
              }
            })
          }
        })

      },
      handleChangeStatus(){
        this.isLoginStatus = !this.isLoginStatus

      },
      handleSignIn(){
        this.$refs["ruleRegisterForm"].validate(valid=>{
          if(valid){
            if(this.submitRegisterForm.password !== this.submitRegisterForm.confirmPassword){
              this.$message.error("两次输入的密码不一致");
            }else {
              requset.post("/register",this.submitRegisterForm).then(res=>{
                if(res.code==="200"){
                  this.$router.push('/');
                  this.$message.success("注册成功");
                  localStorage.setItem("user",JSON.stringify(res.data))
                }else{
                  this.$message.error(res.msg)
                }
              })
            }

          }
        })

      }
    },
    created() {
      if(getStore("isTokenTimeOut") === "true"){
        this.$message.error("登录超时,请重新登录")
      }
    }
  }
</script>
<style scoped>
.login-box {
  width: 300px;
  margin: auto;
  border-radius: 20px;

}

.loginboxcontainer {
  position: relative;
  top: 25vh;

}

.login-btn-box {
  position: relative;

}

.login-btn {
  margin: 10px 20px;
  background: #ae6ab9;
  border-color: #ae6ab9;
}

.login-btn:hover {
  border-color: #b37eb9;
  background: #b37eb9;
}

.background {
  background: linear-gradient(#3d92ff, pink);
  height: 100vh;
}
</style>