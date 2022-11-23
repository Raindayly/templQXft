<template>
  <div>
    <div style="margin: 10px 0">
      <el-input v-model="name" style="width: 200px" suffix-icon="el-icon-search" placeholder="请输入文件名"></el-input>
      <el-button type="primary" @click="search" style="margin-left: 5px">搜索</el-button>
      <el-button type="success" @click="reset" style="margin-left: 5px">重置</el-button>
    </div>
    <div style="margin: 10px 0">

      <el-button type="primary" >上传文件<i class="el-icon-circle-plus-outline"></i>
      </el-button>
      <el-button type="danger" @click="handleDel(ids)">批量删除 <i class="el-icon-remove-outline"></i></el-button>
      <el-upload
        class="upload-demo"
        action="http://localhost:9090/file/import"
        :show-file-list="false"
        :accept="'xlsx'"
      >
        <el-button type="primary" >导入 <i class="el-icon-top"></i></el-button>
      </el-upload>
    </div>
    <el-table :data="tableData" border stripe :header-cell-style="{backgroundColor:'#eaeaea'}"
              @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column prop="id" label="id" width="180">
      </el-table-column>
      <el-table-column prop="name" label="文件名">
      </el-table-column>
      <el-table-column prop="type" label="文件类型">
      </el-table-column>

      <el-table-column prop="url" label="文件预览">
        <template slot-scope="scope">
 <el-avatar shape="square" :size="size" :src="scope.row.url"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column prop="size" label="文件大小" width="260">
      </el-table-column>
      <el-table-column prop="enable" label="是否启用" width="260">
      </el-table-column>
      <el-table-column prop="option" label="操作" align="center" width="220px" fixed="right">
        <template slot-scope="scope">
          <el-button type="danger" @click="handleDel([scope.row.id])">删除 <i class="el-icon-remove-outline"></i>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination style="padding: 10px 0"
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :page-sizes="[5, 10]"
                   :page-size="pageSize"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="total">
    </el-pagination>
  </div>
</template>

<script>
  import requset from "../../utils/request";

  export default {
    name: "File",
    data(){
      return{
        name:"",
        tableData:[],
        pageNum:1,
        pageSize:5,
        total:0,
        ids: [],
      }
    },
    created() {
      this.load()
    },
    methods:{
      load() {
        requset.get(`/file/page`, {
          params: {
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            name: this.name,
          }
        }).then(res => {
          if(res.code == "200"){
            this.tableData = res.data.records
            this.total = res.data.total
          }else {
            this.$message.error(res.msg)
          }


        })
      },
      search() {
        this.load();
      },
      reset() {
        this.name=""
      },
      handleDel(ids) {
        let params = ids;
        requset.post(`/file/delete`, params).then(res => {
          if (res.code=="200") {
            this.$message.success("删除成功")
            this.load();
          } else {
            this.$message.error("删除失败")
          }
        })
      },
      handleSelectionChange(list) {
        let arr = list.map(v => v.id)
        this.ids = arr
      },
      handleSizeChange(val) {
        this.pageSize = val
        this.load()
      },
      handleCurrentChange(val) {
        this.pageNum = val
        this.load()
      },
      handleDel(ids) {
        let params = ids;
        requset.post(`/file/delete`, params).then(res => {
          if (res.code=="200") {
            this.$message.success("删除成功")
            this.load();
          } else {
            this.$message.error("删除失败")
          }
        })
      },
    }
  }
</script>

<style scoped>
  .upload-demo{
    display: inline-block;
    margin-left: 10px;
  }
</style>