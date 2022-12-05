<template>
  <el-container style="height: 100vh; ">
    <el-aside >
      <!-- {{menus}} -->
      <el-menu router>
          <recursionMenu  v-for="item in menus" :menu="item"  :key="item.path" :path="item.path"></recursionMenu>
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
import recursionMenu from "@/components/homeMain/homeMain.vue"
  export default {
    name: 'Home',
    components: {
      recursionMenu
    },
    mounted() {
      this.initMenus()
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
      initMenus(){
        this.menus = this.$store.state.pageInfo.menus
        console.log(this.menus);
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
  .el-menu{
    border-right:none;
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
