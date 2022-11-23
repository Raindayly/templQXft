<template>
  <div>
    <div style="margin: 10px 0">

      <el-input v-model="username" style="width: 200px" suffix-icon="el-icon-search" placeholder="请输入姓名"></el-input>
      <el-input v-model="email" style="width: 200px;margin-left: 5px" suffix-icon="el-icon-message"
                placeholder="请输入邮箱"></el-input>
      <el-input v-model="address" style="width: 200px;margin-left: 5px" suffix-icon="el-icon-position"
                placeholder="请输入地址"></el-input>
      <el-button type="primary" @click="search" style="margin-left: 5px">搜索</el-button>
      <el-button type="success" @click="reset" style="margin-left: 5px">重置</el-button>
    </div>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="AssginUserDialogStatus"
    >
      <el-table
        ref="assginRoleTable"
        :data="roleTableData"
        highlight-current-row
        @row-click="handleAssginRoleCurrentChange"
        style="width: 100%">
        <el-table-column
          type="index"
          width="50">
        </el-table-column>
        <el-table-column

          property="name"
          label="角色身份"
          width="120">
        </el-table-column>
        <el-table-column
          property="description"
          label="角色描述"
          width="120">
        </el-table-column>
        <el-table-column
          property="flag"
          label="角色标识"
        >
        </el-table-column>
      </el-table>
      <div style="margin-top: 20px">
        <el-button @click="handleSaveUserRole">保存</el-button>
        <el-button @click="AssginUserDialogStatus = false">关闭</el-button>
      </div>
    </el-dialog>
    <div style="margin: 10px 0">
      <el-dialog
        :title="dialogTitle"
        :visible.sync="handleAddDialog"
        width="30%"
      >
        <el-form label-width="80px" :model="addForm">
          <el-form-item label="账号">
            <el-input v-model="addForm.username"></el-input>
          </el-form-item>
          <el-form-item label="昵称">
            <el-input v-model="addForm.nickname"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="addForm.email"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="addForm.iphone"></el-input>
          </el-form-item>
          <el-form-item label="地址">
            <el-input v-model="addForm.address"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
              <el-button @click="handleAddDialog = false">取 消</el-button>
              <el-button type="primary" @click="handleSave">保存</el-button>
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
      <el-table-column prop="id" label="id" width="180">
      </el-table-column>
      <el-table-column prop="username" label="账号">
      </el-table-column>
      <el-table-column prop="nickname" label="昵称">
      </el-table-column>
      <el-table-column prop="role" label="角色">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.role =='admin'" type="success" size="small">管理员</el-tag>
          <el-tag v-if="scope.row.role =='member'" type="info" size="small">默认用户</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="email" label="邮箱" width="260">
      </el-table-column>
      <el-table-column prop="password" label="密码" width="260">
      </el-table-column>
      <el-table-column prop="iphone" label="手机号" width="200">
      </el-table-column>
      <el-table-column prop="address" label="地址" width="260">
      </el-table-column>
      <el-table-column prop="option" label="操作" align="center" width="280px" fixed="right">
        <template slot-scope="scope">
          <el-button type="info" @click="handleAssginUserDialog(scope.row.id)">分配角色 <i class="el-icon-user"></i>
          </el-button>
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
        username: "",
        address: "",
        email: "",
        total: 0,
        ids: [],
        handleAddDialog: false,
        AssginUserDialogStatus: false,
        roleTableData: [],
        currentAssginUserDialogUserId:null,
        assginRoleCurrentRow: null,
        addForm: {
          username: "",
          address: "",
          nickname: "",
          email: "",
          password: "",
          iphone: "",
        },
        dialogTitle: "新增"
      }
    },
    created() {
      this.load()
    },

    methods: {
      load() {
        requset.get(`/user/page`, {
          params: {
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            username: this.username,
            address: this.address,
            email: this.email,
          }
        }).then(res => {
          if (res.code === "200") {
            this.tableData = res.data.records;
            this.total = res.data.total
          } else {
            this.$message.error(res.msg)
          }


        })
      },

      getUserInfo() {
        requset.get(`/user/userinfo`).then(res => {
          if (res.code === "200") {
            localStorage.setItem("user", JSON.stringify(res.data));

            this.$message.success("更新用户信息成功");
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
        this.username = "";
        this.email = "";
        this.address = "";
        this.load()
      },
      handleSizeChange(val) {
        this.pageSize = val;
        this.load()
      },
      handleCurrentChange(val) {
        this.pageNum = val;
        this.load()
      },
      handleOpenAddDialog() {
        this.dialogTitle = "新增";
        this.handleAddDialog = true;
        this.addForm = {}
      },
      handleAssginUserDialog(id) {
        this.dialogTitle = "角色分配";
        this.AssginUserDialogStatus = true;
        this.currentAssginUserDialogUserId = id;
        requset.get("/role").then(res => {
          if (res.code === "200") {
            this.roleTableData = res.data
          }
        })
      },
      handleAssginRoleCurrentChange(val) {
        this.assginRoleCurrentRow = val
      },
      handleSave() {
        this.handleAddDialog = false;
        requset.post(`/user/save`, this.addForm).then(res => {
          if (res.code === "200") {
            this.load();
            this.$message.success("保存成功！");
            this.getUserInfo()
          } else {
            this.$message.error("保存失败！")
          }
        })
      },
      handleSaveUserRole() {
        requset.get("/user/save_role", {
          params: {
            id:this.currentAssginUserDialogUserId,
            role: this.assginRoleCurrentRow.flag
          }
        }).then(res => {
          if (res.code === "200") {
            this.AssginUserDialogStatus = false
            this.$message.success("保存成功!")
          } else {
            this.$message.error(res.msg)
          }
        })
      },
      handleEdit(id) {
        this.dialogTitle = "编辑";
        requset.get(`/user/info?id=${id}`).then(res => {
          if (res.code === "200") {
            this.addForm = res.data;
            this.handleAddDialog = true
          }
        })
      },

      handleDel(ids) {
        if (ids.length >= 1) {
          requset.post(`/user/delete`, ids).then(res => {
            if (res.code === "200") {
              this.$message.success("删除成功");
              this.load();
            } else {
              this.$message.error("删除失败")
            }
          })
        } else {
          this.$message.info("至少选择一条数据进行删除")
        }

      },
      handleSelectionChange(list) {
        list.map(v => v.id);
        this.ids = list
      },
      handleExport() {
        window.open("http://localhost:9090/user/export")
      },
      handleUpload() {
        this.load()
      },


    }

  }
</script>

<style>
  .upload-demo {
    display: inline-block;
    margin-left: 10px;
  }
</style>