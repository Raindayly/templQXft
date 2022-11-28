<template>
    <div class="xyFlexCenter loginBg position-relative" style="height:100%;">
        <div class="position-absolute right-0 top-0">
            <el-switch
                v-model="theme"
                active-color="#ffffff"
                inactive-color="#000000"
                >
            </el-switch>
        </div>
        <div>
            <el-form :rules="submitValidate" ref="loginForm" >
                <el-form-item prop="username" label="用户名">
                    <el-input v-model="submitForm.userName"></el-input>
                </el-form-item>
                <div class="position-relative">
                    <el-form-item prop="password" label="密码" >
                        <el-input v-model="submitForm.password"></el-input>
                    </el-form-item>
                    <el-form-item style="margin-top: 45px;">
                        <el-button style="width:300px">登录</el-button>
                    </el-form-item>
                    <a href="" class="label-link position-absolute right-0" style="top:10px">忘记密码?</a>
                </div>
                <el-form-item >
                    <p class="login-callout mt-font ">
                    New to xxx?
                    <a href="">创建新账号</a>
                    </p>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            submitForm:{
                userName:'',
                password:''
            },
            submitValidate:{

            },
            theme:true
        }
    },
}
</script>
<style>
@import '@/styles/common.css';
.loginBg {
    background-color: var(--color-bg-default);
}
.login-callout{
    padding: 16px 16px;
    text-align: center;
    border: 1px solid var(--color-border-default);
    border-radius: 6px;
    color: var(--color-font-black);
    font-size: var(--size-font-default);
    line-height: var(--size-font-default);
}
</style>