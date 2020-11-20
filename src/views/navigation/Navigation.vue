<template>
  <div class="nav">
    <div>查询导航</div>
    <el-divider />

    <!-- <el-button @click="drawer = true" type="primary" style="margin-bottom: 16px;">
      添加导航
    </el-button> -->

    <div class="container">
      <el-row :gutter="20">
        <el-col :span="7">
          <el-select v-model="value" placeholder="请选择查询语言类型">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
        </el-select>
        </el-col>
        <el-col :span="2"> 
          <el-button type="primary" plain @click="queryNav">查询</el-button>
        </el-col>
      </el-row>
      <el-row :gutter="20">

      </el-row>

      <el-row :gutter="20">
        <el-col :span="10">
          <el-table :data="tableData">
            <el-table-column prop="id" label="导航栏编号" min-width="40" align="center">
            </el-table-column>
            <el-table-column prop="headerList" label="导航栏名称" align="center" min-width="60%">
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
        <el-form-item label="语言类型: ">
              <el-select v-model="value" placeholder="请选择查询/增加语言类型">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
              </el-select>
        </el-form-item>

        <el-form-item label="导航栏名称: ">
          <el-input v-model="navigationBar"></el-input>
        </el-form-item> 


        <el-form-item>
          <el-button @click="addNav">提交保存</el-button>
        </el-form-item>
      </el-form>
   </el-drawer>
  </div>
</template>

<script>
import { addNavBar } from "../../network/addNavBar";
import { getNavBar } from "../../network/getNavBar";
export default {
  name: 'Navigation',

  created() {
    getNavBar("zh").then(res => {
      res.bars.forEach(element => this.tableData.push(element))
    })
  },

  data() {
    return {
      tableData: [],
      navigationBar: '',
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
      drawer: false
    }
  },

  methods: {
    addNav() {
      if(this.navigationBar && this.navigationBar.length > 0) {
        addNavBar(this.navigationBar, this.value).then(res => {
          let i = 0
          if(res.message === 'add success!') {
            this.$message({
            message: '添加成功',
            type: 'success'
          });
          getNavBar(this.value).then(res => {
            this.tableData.push(res.bars[res.bars.length - 1])
          })
          }
        })
        
      } else {
        this.$message({
          message: '导航栏名称不能为空',
          type: 'error'
        });
        
      }
    },
    queryNav() {
      this.tableData = []
      getNavBar(this.value).then(res => {
        res.bars.forEach(element => this.tableData.push(element))
      })
    }
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
</style>