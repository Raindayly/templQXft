<template>
  <el-card class="box-card" body-style="height:100%">
<!--    <div v-for="o in 4" :key="o" class="text item">-->
<!--      {{'列表内容 ' + o }}-->
<!--    </div>-->
    <el-calendar class="calender" v-model="calender">
    </el-calendar>
  </el-card>
</template>

<script>
  export default {
    name: "RegistrationTable",
    data(){
      return{
        calender: new Date()
      }
    }
  }

</script>
<style>
  .el-calendar-day{
    height: 30px !important;
  }
</style>
<style scoped>
  .box-card {
    margin: 20px;
    width: 80%;
    height: 300px;
  }
  .calender{
    width: 100%;
    height: 100%;

  }

</style>