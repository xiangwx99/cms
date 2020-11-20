<template>
  <div class="nav">
    <div>添加游戏类型</div>
    <el-divider />

    <el-button @click="drawer = true" type="primary" style="margin-bottom: 16px;">
      添加游戏类型
    </el-button>

    <div class="container">
      <el-row :gutter="20">
        <!-- <el-col :span="5">请选择语言类型:</el-col> -->
        <el-col :span="10">
          <el-select v-model="value" @change="queryBar">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
            <!-- <el-input
              placeholder="请输入参与项目的编号"
              type="small"
              v-model="barId"
              clearable
              size="medium">
            </el-input> -->
          <el-select v-model="barId" placeholder="请选择导航栏名称">
            <el-option
              v-for="item in bars"
              :key="item.value"
              :label="item.headerList"
              :value="item.id">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="5"> 
          <el-button type="primary" plain @click="queryGame">查询</el-button>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="10">
          <el-table :data="tableData">
            <el-table-column prop="id" label="项目位置" min-width="40" align="center">
            </el-table-column>
            <el-table-column prop="type" label="项目名称" align="center" min-width="60%">
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>

    <el-drawer
      title="我是标题"
      :visible.sync="drawer"
      :with-header="false">
      <div class="upload-p">添加项目  </div>
      

      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="选择语言类型: ">
              <el-select v-model="value" @change="queryBar">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
              </el-select>
        </el-form-item>

        <el-form-item label="参与项目导航: ">
          <!-- <el-input v-model="projectId">
            
          </el-input> -->
          <el-select v-model="projectId">
            <el-option
              v-for="item in bars"
              :key="item.value"
              :label="item.headerList"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="参与项目类型: ">
          <el-input v-model="projectType"></el-input>
        </el-form-item>  


        <el-form-item>
          <el-button @click="addGame">提交保存</el-button>
        </el-form-item>
      </el-form>
   </el-drawer>
  </div>
</template>

<script>
import { addGameType } from "../../network/addGameType";
import { getGameType } from "../../network/getGameType";
import { getNavBar, getNavBarById } from "../../network/getNavBar";
export default {
  name: 'AddGameType',

  created() {
    getGameType(this.barId, this.value).then(res => {
      res.types.forEach(element => {
        element.id = ""
        getNavBarById(element.barId).then(res => {
          element.id = res.bars.headerList 
        })
        this.tableData.push(element)
      });
    })
    this.queryBar()
  },

  data() {
    return {
      bars: [],
      tableData: [],
      barId: '',
      type: '',
      options: [{
        value: "zh",
        label: '中文'
      }, {
        value: "en",
        label: '英语'
      },
       {
        value: "jp",
        label: '日语'
      }],
      value: 'zh',
      drawer: false,
      projectId: null,
      projectType: null
    }
  },

  methods: {
    addGame() {
      if(this.projectId && this.projectType) {
        addGameType(this.projectId, this.projectType, this.value).then(res => {
          let i = 0
          if(res.message === 'add success!') {
            this.$message({
            message: '添加成功',
            type: 'success'
          });
          }
        })
        
      } else {
        
        this.$message({
          message: '项目编号或类型不能为空',
          type: 'error'
        });
        
      }
    },
    queryBar() {
      this.bars = []
      getNavBar(this.value).then(res => {
        res.bars.forEach(element => {
          this.bars.push(element)
        })
      })
    },
    queryGame() {
      this.tableData = []
      getGameType(this.barId, this.value).then(res => {
        res.types.forEach(element => {
          element.id = ""
          getNavBarById(element.barId).then(res => {
            element.id = res.bars.headerList 
          })
          this.tableData.push(element)
        });
      })
    }
  }
}
</script>

<style scoped>
.nav {
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
</style>