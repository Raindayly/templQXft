<template>
  <el-container style="height: 100vh; ">
    <el-aside  style="width:auto;background-color: rgb(238, 241, 246);height: 100%">
      <el-menu background-color="#545c64" class="el-menu-vertical-demo" style="height: 100%;color: #cccccc"  :collapse="!isCollapse" >

        <template v-for="(item,index) in menus" >
          <el-submenu v-if="item.children.length!=0" :index="index.toString()" :key="index"  @click="pushPath(item.path)">
            <template slot="title"><i :class="item.icon"></i>{{ item.name }}</template>
            <el-menu-item v-for="(child,index2) in item.children" @click="pushPath(child.path)" :key="index2"><i :class="child.icon"></i>{{ child.name }} </el-menu-item>
          </el-submenu>
          <el-menu-item v-else  @click="pushPath(item.path)"  :key="index"><i :class="item.icon"></i>{{ item.name }} </el-menu-item>
        </template>

      </el-menu>
    </el-aside>

    <el-container style="height: 100%;">
      <el-header
        style="display: flex;justify-content: space-between;align-items:center;font-size: 12px;border-bottom: 1px solid #cccccc;">
        <div style="display: flex;align-items: center;text-align: center;">
          <i @click="collapse" :class="collapseBtnClass" class="collapseBtn"></i>
          <el-breadcrumb separator="/" style="display: inline-block;margin-left: 10px;font-size: 14px;">
            <template ></template>
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div style="align-items:center;display: flex;">
          <i class="el-icon-data-line mgr10" style="font-size: 20px;cursor:pointer" @click="pushPath('/head')"></i>

          <el-dropdown @command="handleCommand" style="vertical-align: middle;">

            <span class="pointer">
              <el-avatar class="myAvatar"  fit="cover" style="vertical-align: middle"  :size="30"  :src="userinfo.avatarUrl">
                <img  class="avatar" style="vertical-align: middle"  fit="fill" :src="userinfo.avatarUrl" alt="">
              </el-avatar>
              <span class="mgl10" style="max-width: 100px">{{ userinfo.nickname }}</span>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="goProfile">个人信息</el-dropdown-item>
              <el-dropdown-item command="loginout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-main>
        <router-view @updateUserInfo="updateUserInfo"/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>

  import requset from "../../utils/request";
  import {setRoutes} from "../../router";

  export default {
    name: 'HomeView',
    components: {},
    created() {
      this.initMenus()
      this.initMianBaoxue()
      setRoutes
    },
    data() {
      return {
        collapseBtnClass:'el-icon-s-fold',
        isCollapse:true,
        userinfo: localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):{},
        menus:[]
      }
    },
    methods:{
      initMianBaoxue(){
      },
      initMenus(){
        let menus = localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")).menus:{}
        this.menus = menus?menus[0].children:null
      },
      updateUserInfo(){
        this.userinfo = localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):{}
        this.initMenus()
      },
      collapse(){
        this.isCollapse = !this.isCollapse
        if(this.isCollapse){
          this.collapseBtnClass = "el-icon-s-fold"
        }else {

            this.collapseBtnClass = "el-icon-s-unfold"
        }

      },
      handleCommand(command){
        switch (command) {
          case "loginout":
            this.$router.push("/login");
            localStorage.removeItem("user");
            localStorage.removeItem("menus");
            break;
          case "goProfile":
            this.$router.push("/home/person");
            break;
        }
      },
      pushPath(path){
        this.$router.push(path).catch((error)=>{
          console.log(error)
        })
      }
    },


  }
</script>

<style scoped>

  /*:deep(.myAvatar img){*/
  /*  width: 100%;*/
  /*  height: 100%;*/
  /*}*/
  .el-menu{
    border-right:none;
  }
  .el-menu-item ,.el-submenu >>> .el-submenu__title{
    color: #f7f7f7;
    min-width: 200px;
  }
  .avatar {
    width: 30px;
    height: 30px;
  }
  .collapseBtn{
    font-size: 20px;
    cursor:pointer;
    margin-top: 1px;
  }
  .el-breadcrumb{
    font-size: 16px;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }

</style>
