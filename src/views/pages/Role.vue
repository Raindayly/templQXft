<template>
  <div>
    <div style="margin: 10px 0">

      <el-input v-model="name" style="width: 200px" suffix-icon="el-icon-search" placeholder="请输入角色名称"></el-input>
      <el-button type="primary" @click="search" style="margin-left: 5px">搜索</el-button>
      <el-button type="success" @click="reset" style="margin-left: 5px">重置</el-button>
    </div>
    <div style="margin: 10px 0">
      <el-dialog
        :title="dialogTitle"
        :visible.sync="handleAddDialog"
        width="30%"
      >
        <el-form label-width="80px" :model="addForm">
          <el-form-item label="名称">
            <el-input v-model="addForm.name"></el-input>
          </el-form-item>
          <el-form-item label="唯一标识">
            <el-input v-model="addForm.flag"></el-input>
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="addForm.description"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
              <el-button @click="handleAddDialog = false">取 消</el-button>
              <el-button type="primary" @click="handleSave">保存</el-button>
          </span>
      </el-dialog>
      <el-dialog
        :title="dialogTitle"
        :visible.sync="handleMenuAssignDialog"
        width="30%"
        @open="handleTreeDialogOpen"
      >
        <el-tree
          :props="treeProps"
          :data="treeData"
          node-key="id"
          default-expand-all
          :default-checked-keys="checkedArr"
          show-checkbox
          @check="handleCheckChange">
        </el-tree>

        <span slot="footer" class="dialog-footer">
              <el-button @click="handleMenuAssignDialog = false">取 消</el-button>
              <el-button type="primary" @click="handleSaveTree">保存</el-button>
          </span>
      </el-dialog>
      <el-button type="primary" @click="handleOpenAddDialog">新增 <i class="el-icon-circle-plus-outline"></i>
      </el-button>
      <el-button type="danger" @click="handleDel(ids)">批量删除 <i class="el-icon-remove-outline"></i></el-button>
      <el-button type="primary" @click="handleExport">导出 <i class="el-icon-bottom"></i></el-button>
      <el-upload
        class="upload-demo"
        action="http://localhost:9090/user/import"
        :show-file-list="false"
        :accept="'xlsx'"
      >
        <el-button type="primary" @click="handleUpload">导入 <i class="el-icon-top"></i></el-button>
      </el-upload>
    </div>
    <el-table :data="tableData" border stripe :header-cell-style="{backgroundColor:'#eaeaea'}"
              @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column prop="name" label="名称">
      </el-table-column>
      <el-table-column prop="flag" label="唯一标识">
      </el-table-column>
      <el-table-column prop="description" label="描述">
      </el-table-column>

      <el-table-column prop="option" label="操作" align="center" width="280px" fixed="right">
        <template slot-scope="scope">
          <el-button type="info" @click="handleMenuAssign(scope.row.id)">菜单分配 <i class="el-icon-menu"></i></el-button>
          <el-button type="success" @click="handleEdit(scope.row.id)">编辑 <i class="el-icon-edit"></i></el-button>
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
    data() {
      return {
        tableData: [],
        pageNum: 1,
        pageSize: 5,
        name: "",
        total: 0,
        ids: [],
        treeData: [],
        treeProps: {
          label: "name"
        },
        checkedArr: [],
        handleMenuAssignDialog: false,
        handleAddDialog: false,
        addForm: {
          id: "",
          name: "",
          key:"",
          description: ""
        },
        dialogTitle: "新增",
        currentRoleId: "",
        treeSubmitParams: {
          currentRoleId: "",
          currentRoleMenuIdArr: []
        }
      }
    },
    created() {
      this.load()
    },

    methods: {
      load() {
        requset.get(`/role/page`, {
          params: {
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            name: this.name
          }
        }).then(res => {
          if (res.code == "200") {
            this.tableData = res.data.records
            this.total = res.data.total
          } else {
            this.$message.error(res.msg)
          }


        })
      },

      getUserInfo() {
        requset.get(`/user/userinfo`).then(res => {
          if (res.code == "200") {
            localStorage.setItem("user", JSON.stringify(res.data))

            this.$message.success("更新用户信息成功")
            this.$emit("updateUserInfo")

          } else {
            this.$message.error("更新用户信息失败")
          }
        })
      },
      search() {
        this.load();
      },
      reset() {
        this.name = "";
        this.load()
      },
      handleSizeChange(val) {
        this.pageSize = val
        this.load()
      },
      handleCurrentChange(val) {
        this.pageNum = val
        this.load()
      },
      handleOpenAddDialog() {
        this.dialogTitle = "新增"
        this.handleAddDialog = true
        this.addForm = {}

      },
      handleSave() {
        this.handleAddDialog = false;
        requset.post(`/role/save`, this.addForm).then(res => {
          if (res.code == "200") {
            this.load();
            this.$message.success("保存成功！")
            this.getUserInfo()
          } else {
            this.$message.error("保存失败！")
          }
        })

      },
      handleEdit(id) {
        this.dialogTitle = "编辑"
        requset.get(`/role/${id}`).then(res => {
          if (res.code == "200") {
            this.addForm = res.data
            this.handleAddDialog = true
          } else {
            this.$message.error(res.msg)
          }
        })
      },
      handleDel(ids) {
        let params = ids;
        requset.post(`/role/delete`, params).then(res => {
          if (res.code == "200") {
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
      handleExport() {
        window.open("http://localhost:9090/user/export")
      },
      handleUpload() {
        this.load()
      },
      handleMenuAssign(id) {
        this.dialogTitle = "菜单分配"
        this.currentRoleId = id
        this.handleMenuAssignDialog = true
        requset.get(`/role/menu/${id}`).then(res => {
          if (res.code == "200") {
            this.checkedArr = res.data
            requset.get("/menu/allmenus").then(res => {
              if (res.code == "200") {
                this.treeData = res.data

              } else {
                this.$message.error(res.msg)
              }
            })
          } else {
            this.$message.error(res.msg)
          }
        })


      },
      handleCheckChange(a, b) {
        this.treeSubmitParams.currentRoleId = this.currentRoleId
        this.treeSubmitParams.currentRoleMenuIdArr = b.checkedKeys
      },
      handleSaveTree() {
        requset.post("/role/savemenu", this.treeSubmitParams).then(res => {
          if (res.code == "200") {
            this.$message.success("保存成功")
            this.handleMenuAssignDialog = false
            this.checkedArr = []
          } else {
            this.$message.error(res.msg)
          }
        })
      },
      handleTreeDialogOpen(){
        this.checkedArr=[]
        this.treeData = []
      }

    }

  }
</script>

<style>
  .upload-demo {
    display: inline-block;
    margin-left: 10px;
  }
</style>