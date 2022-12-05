<template>
    <div>
      <div style="margin: 10px 0">
        <el-input v-model="name" style="width: 200px" suffix-icon="el-icon-search" placeholder="请输入菜单名称"></el-input>
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
            <el-form-item label="是否有子级">
              <el-select v-model="addForm.hasChildren" placeholder="请选择">
                <el-option
                  v-for="item in choice"
                  :key="item.value"
                  :label="item.flag"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="父级菜单">
              <el-select v-model="addForm.parentNode" placeholder="请选择">
                <el-option
                  v-for="item in parentOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="跳转路径">
              <el-input v-model="addForm.path"></el-input>
            </el-form-item>
            <el-form-item label="组件文件名">
              <el-input v-model="addForm.component"></el-input>
            </el-form-item>
            <el-form-item label="图标">
              <template><i :class="addForm.icon" style="position: absolute;top: 10px;right:30px;z-index: 100"></i>
              </template>
  
              <el-select v-model="addForm.icon" placeholder="请选择" style="width: 100%;">
                <template v-for="item in iconsOptions">
                  <el-option
                    :key="item.id"
                    :label="item.name"
                    :value="item.value">
                    <i :class="item.value"></i>
                  </el-option>
                </template>
              </el-select>
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
                row-key="id" default-expand-all
                :tree-props="{children: 'children', hasChildren: 'haschildren'}"
      >
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column prop="name" label="名称">
        </el-table-column>
        <el-table-column prop="path" label="跳转路径">
        </el-table-column>
        <el-table-column prop="component" label="组件文件名">
        </el-table-column>
        <el-table-column prop="icon" label="图标">
          <template slot-scope="scope">
            <i :class="scope.row.icon"></i>
          </template>
        </el-table-column>
        <el-table-column prop="description" label="描述">
        </el-table-column>
  
        <el-table-column prop="option" label="操作" align="center" width="300px" fixed="right">
          <template slot-scope="scope">
            <el-button v-if="scope.row.pid == null&&scope.row.path===''" type="primary"
                       @click="handleOpenAddChildDialog(scope.row.id)">添加子菜单 <i class="el-icon-circle-plus-outline"></i>
            </el-button>
            <el-button type="success" @click="handleEdit(scope.row)">编辑 <i class="el-icon-edit"></i></el-button>
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
          parentOptions: [],
          handleAddDialog: false,
          addForm: {
            icon: "",
            path: "",
            parentNode: "",
            name: "",
            description: "",
            component: "",
            pid: ""
          },
          iconsOptions: [],
          choice: [
            {
              flag: "是",
              value: 1
            }, {
              flag: "否",
              value: 0
            }],
          dialogTitle: "新增"
        }
      },
      created() {
        this.load()
      },
  
      methods: {
        load() {
          requset.get(`/menu`, {
            params: {
              pageNum: this.pageNum,
              pageSize: this.pageSize,
              name: this.name
            }
          }).then(res => {
            if (res.code === "200") {
  
              this.tableData = res.data.records;
              console.log(this.tableData)
              this.total = res.data.total
            } else {
              this.$message.error(res.msg)
            }
  
  
          })
  
          requset.get('/menu/allmenusandid').then(res => {
            if (res.code === "200") {
              this.parentOptions = res.data
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
          this.addForm = {
            icon: "",
            path: "",
            parentNode: "",
            hasChildren:"",
            name: "",
            description: "",
            component: "",
            pid: ""
          }
  
        },
        handleOpenAddChildDialog(pid) {
          this.dialogTitle = "新增子菜单";
          this.handleAddDialog = true;
          this.addForm = {};
          this.addForm.pid = pid
        },
        handleSave() {
          console.log(this.addForm)
          this.handleAddDialog = false;
          requset.post(`/menu/save`, this.addForm).then(res => {
            if (res.code === "200") {
              this.load();
              this.$message.success("保存成功！");
              this.$emit("updateUserInfo")
            } else {
              this.$message.error("保存失败！")
            }
          })
  
        },
        handleEdit(row) {
          this.dialogTitle = "编辑";
          this.handleAddDialog = true;
          this.addForm = JSON.parse(JSON.stringify(row));
          requset.get(`/menu/icons`).then(res => {
            if (res.code === "200") {
              this.iconsOptions = res.data
            } else {
              this.$message.error(res.msg)
            }
          })
        },
        handleDel(ids) {
          requset.post(`/menu/delete`, ids).then(res => {
            if (res.code === "200") {
              this.$message.success("删除成功");
              this.load();
            } else {
              this.$message.error("删除失败");
            }
          })
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