<template>
  <div class="nav">
    <div>添加QQ</div>
    <el-divider />

    <div class="container">
      <el-row :gutter="20">
        <el-col :span="12">
            <el-input
              placeholder="请输入真实姓名"
              type="small"
              v-model="nickName"
              clearable
              size="medium">
            </el-input>
        </el-col>
      </el-row>
      
      <el-row :gutter="20">
        <el-col :span="12">
            <el-input
              placeholder="请输入QQ号码"
              type="small"
              v-model="account"
              clearable
              size="medium">
            </el-input>
        </el-col>
        <el-col :span="12"> 
          <el-button type="primary" plain @click="addQq">保存</el-button>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="15">
          <el-table :data="tableData">
            <el-table-column prop="name" label="真实姓名" min-width="35%" align="center">
            </el-table-column>
            <el-table-column prop="qQ" label="QQ号码" align="center" min-width="35%">
            </el-table-column>
            <el-table-column align="center" min-width="30%">
              <template slot="header">
                <div>操作</div>
              </template>
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="showDisplayQQ(scope.$index, scope.row)">替换</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>

    <el-drawer
      title="我是标题"
      :visible.sync="drawer"
      :with-header="false">
      <div class="upload-p">上传图片</div>
      

      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="替换QQ: ">
              <el-select v-model="value" placeholder="请选择替换QQ">
              <el-option
                v-for="item in options"
                :key="item.qQ"
                :label="item.qQ"
                :value="item.id">
              </el-option>
              </el-select>
        </el-form-item>
      <el-form-item>
        <el-button @click="replaceQq">提交保存</el-button>
      </el-form-item>
      </el-form>
    </el-drawer>

  </div>
</template>

<script>
import { addQQ, getQQ, delQQ, replaceQQ } from "../../network/addQq";
import { getNavBar } from "../../network/getNavBar";
export default {
  name: 'Navigation',

  created() {
    getQQ(null).then(res => {
      res.forEach(element => this.tableData.push(element))
    })
  },

  data() {
    return {
      drawer: false,
      tableData: [],
      nickName: '',
      account: '',
      options: [],
      value: '',
      id: null
    }
  },

  methods: {
    addQq() {
      if(this.nickName && this.account > 0) {
        addQQ(this.nickName, this.account).then(res => {
          let i = 0
          if(res) {
            this.$message({
            message: '添加成功',
            type: 'success'
          });
          getQQ().then(res => {
            this.tableData.push(res[res.length - 1])
          })
          }
        })
        
      } else {
        this.$message({
          message: 'QQ账号或者密码不能为空',
          type: 'error'
        });
      }
    },

    showDisplayQQ(index, row) {
      this.drawer = true
      this.id = row.id
      getQQ(true).then(res => {
        // res.forEach(element => this.tableData.push(element))
        this.options = res
      })
      
    },

    replaceQq() {
      replaceQQ(this.id, this.value).then(res => {
        if(res) {
          this.$message({
            type: 'success',
            message: '替换成功!'
          });
        } else {
          this.$message({
            type: 'error',
            message: '替换失败'
          }); 
        }
      })      
    },

    handleDelete(index, row) {
      this.$confirm('此操作将删除该QQ, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delQQ(row.id).then(res => {
          if(res) {
            this.tableData = []
            getQQ().then(res => {
              res.forEach(element => this.tableData.push(element))
            })
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          } else {
            this.$message({
              type: 'error',
              message: '删除失败'
            }); 
          }
        })
      }).catch(() => {
        row.isReplace = false
        this.$message({
          type: 'info',
          message: '已取消删除操作'
        }); 
      })
    },


  
  }
}
</script>

<style scoped>
.container {
  padding: 8px;
  box-shadow: 0 1px 5px rgba(0,0,0,0.2), 
              0 2px 2px rgba(0,0,0,0.14), 
              0 3px 1px -2px rgba(0,0,0,0.12);
  border-radius: 3px;
  min-height: 300px;
}

.el-table  {
  border: 1px solid #e1e6eb;
  border-radius: 3px;
}

.el-button {
  padding: 10px;
}

.el-row {
  margin-bottom: 16px;
}

.container {
  padding: 8px;
  box-shadow: 0 1px 5px rgba(0,0,0,0.2), 
              0 2px 2px rgba(0,0,0,0.14), 
              0 3px 1px -2px rgba(0,0,0,0.12);
  border-radius: 3px;
}

.el-select {
  margin-bottom: 10px;
}

.el-table  {
  border: 1px solid #e1e6eb;
  border-radius: 3px;
}

.upload-p {
  padding: 4px 12px;
  height: 50px;
  line-height: 42px;
  box-shadow: 0 1px 8px rgba(0,0,0,0.2), 0 3px 4px rgba(0,0,0,0.14), 0 3px 3px -2px rgba(0,0,0,0.12);
  font-size: 18px;
}

.el-form {
  padding: 16px;
}

.footer {
  position: fixed;
  width: 100%;
  bottom: 0;
  box-shadow: 8 1px 0px rgba(0,0,0,0.2), 4 3px 0px rgba(0,0,0,0.14), -2 3px 3px -2px rgba(0,0,0,0.12);
}

a {
  display: inline-block;
}
</style>