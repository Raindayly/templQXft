<template>
  <div class="container">
    <div style="display: flex;justify-content: center;border-bottom: solid 1px #e6e6e6" >
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">处理中心</el-menu-item>
        <el-menu-item index="2">处理中心</el-menu-item>
        <el-menu-item index="3">处理中心</el-menu-item>
        <el-menu-item index="4"></el-menu-item>
      </el-menu>
    </div>
    <el-container>
      <el-aside width="300px">
        <RegistrationTable/>
      </el-aside>
      <el-main>Main</el-main>
      <el-aside width="300px">Aside</el-aside>
    </el-container>
  </div>


</template>

<script>

  import RegistrationTable from "@/views/head/components/RegistrationTable";

  export default {
    name: "HeadIndex",
    components:{
      RegistrationTable
    },
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style scoped>
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    display: flex;
    justify-content: center;
  }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
  }
  body > .el-container {
    margin-bottom: 40px;
    height: 100%;
  }
  .container{
    display: flex;
    flex-direction: column;
    height: 100%;
  }
</style>