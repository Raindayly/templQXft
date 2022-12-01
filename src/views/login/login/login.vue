<template>
    <div class="xyFlexCenter loginBg position-relative" style="height:100%;">
        <div class="position-absolute right-0 top-0">
            <el-switch
                v-model="theme"
                active-color="#333"
                inactive-color="#999"
                @change="wicg"
                >
            </el-switch>
        </div>
        <div class="all">
            <el-form :rules="submitValidate" ref="loginForm" >
                <el-form-item prop="username" label="用户名">
                    <el-input v-model="submitForm.userName"></el-input>
                </el-form-item>
                <div class="position-relative">
                    <el-form-item prop="password" label="密码" >
                        <el-input v-model="submitForm.password"></el-input>
                    </el-form-item>
                    <el-form-item style="margin-top: 45px;">
                        <el-button @click="login" style="width:300px">登录</el-button>
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
import utils from '@/libs/utils';
import {getStore , setStore} from '@/utils/localstoreage.js'
import { login , getUser } from '@/apis/userInfo.js'
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
    methods: {
        wicg(value){
            if(value){
                window.document.documentElement.setAttribute("theme","light");
            }else{
                window.document.documentElement.setAttribute("theme","dark");
            }
        },
        async login(){
            try {
                const loginRes = await login(this.submitForm)
                this.throwError(loginRes)
                this.$message.success(loginRes.message)
                const userRes = await getUser()
                console.log(userRes);
                setStore("userInfo",userRes.result)
                utils.initRouter(this)
            } catch (error) {
                this.$message.error(error)
            }

        },
        
    },
}
</script>
<style lang="scss">
@import '@/styles/common.scss';
@import '@/styles/mixin.scss';

.loginBg {
    background-color: var(--test-var-color);
}

.login-callout {
    padding: 16px 16px;
    text-align: center;
    border: 1px solid var(--color-border-default);
    border-radius: 6px;
    color: var(--color-font-black);
    font-size: var(--size-font-default);
    line-height: var(--size-font-default);
}

// .all {
//     @include background-main-color($background-main-color1);
//     @include font-main-color($font-main-color1) //background-main-color 为mixin中定义的名称，括号里为theme中声明的值。
// }
</style>