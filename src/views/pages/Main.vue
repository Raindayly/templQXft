<template>
  <div class="flex" style="flex-direction: column">
    <div class="flex" style="justify-content: space-around">
      <el-card class="w300 h100 pointer" shadow="hover">
        今日登录会员数 {{}}
      </el-card>
      <el-card class="w300 h100 pointer" shadow="hover">
        总会员数 {{pageInfo.allVipNum}}
      </el-card>
      <el-card class="w300 h100 pointer" shadow="hover">
        总文件数{{pageInfo.allFileNum}}
      </el-card>
    </div>
    <div class="flex mgt50" style="justify-content: space-around">
      <div id="QxChart" class="card" style="height: 400px;flex: 0 1 500px"></div>
      <div id="RecentDataChart" class="card" style="height: 400px;flex: 0 1 500px"></div>
    </div>
  </div>


</template>

<script>

  import requset from "../../utils/request";

  export default {
    name: "Main",

    created() {
      this.initMyEcharts();
      this.initPageInfo();
    },
    mounted() {
      this.QxChart = this.$echarts.init(document.getElementById("QxChart"))
      this.RecentDataChart = this.$echarts.init(document.getElementById("RecentDataChart"))
      this.QxChart.setOption({
        title: {
          text: '各季度会员数量'
        },
        tooltip: {},
        xAxis: {
          data: ['Q1', 'Q2', 'Q3', 'Q4']
        },
        yAxis: {},
        series: []
      });
    },
    data() {
      return {
        QxChart: {},
        RecentDataChart: {},
        pageInfo:{}
      }
    },
    methods: {
      initMyEcharts() {
        requset.get("/charts").then(res => {
          if (res.code == "200") {
            let q1 = res.data.q1
            let q2 = res.data.q2
            let q3 = res.data.q3
            let q4 = res.data.q4
            this.QxChart.setOption({
              series: [
                {
                  name: '会员数量',
                  type: 'bar',
                  data: [q1, q2, q3, q4]
                },
                {
                  name: '会员数量',
                  type: 'line',
                  data: [q1, q2, q3, q4]
                }
              ]
            })
          }
        })
        requset.get("/charts/recently").then(res => {
          if(res.code =="200"){
            this.RecentDataChart.setOption({
              title: {
                text: '近七天会员数量'
              },
              tooltip: {},
              xAxis: {
                data: res.data.xData.reverse()
              },
              yAxis: {},
              series: {
                name: '会员数量',
                type: 'line',
                data: res.data.yData.reverse()
              }

            })

          }
        })
      },
      initPageInfo(){
        requset.get("/home/homepageinfo").then(res=>{
          if(res.code=="200"){
            this.pageInfo = res.data

          }
        })
      }

    }

  }
</script>

<style scoped>
  .card {
    border-radius: 4px;
    border: 1px solid #EBEEF5;
    background-color: #FFF;
    overflow: hidden;
    color: #303133;
    -webkit-transition: .3s;
    transition: .3s
  }

  .el-card.is-always-shadow, .el-card.is-hover-shadow:focus, .el-card.is-hover-shadow:hover {
    -webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1)
  }

  .el-card__header {
    padding: 18px 20px;
    border-bottom: 1px solid #EBEEF5;
    -webkit-box-sizing: border-box;
    box-sizing: border-box
  }

  .el-card__body {
    padding: 20px
  }
</style>