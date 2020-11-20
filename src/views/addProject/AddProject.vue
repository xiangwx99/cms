<template>
<div class="upload">
  <div>更新图片</div>
  <el-divider />

  <el-button @click="changeDrawer" 
    type="primary" 
    style="margin-bottom: 16px;" 
    ref="drawClick">
    点击上传图片
  </el-button>

  <el-row :gutter="20">
  <el-col :span="6">
    <el-select v-model="datas.language" placeholder="请选择查询/增加语言类型">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
  </el-col>
  <el-col :span="3"> 
      <el-button type="primary" plain @click="queryProject">查询</el-button>
    </el-col>
  </el-row>


  <el-table
    :data="tableData"
    style="width: 100%">
    <!-- <el-table-column
      label="图片名称"
      align="center"
      min-width="12%">
      <template slot-scope="scope">
        <span style="margin-left: 10px">
          {{ scope.row.name }}</span>
      </template>
    </el-table-column> -->

    <el-table-column
      label="icon预览"
      align="center"
      min-width="12%">
      <template slot-scope="scope">
        <a :href="scope.row.icon" target="_blank">
          <img v-lazy="scope.row.icon" :key="scope.row.icon"
          style="width: 70px;
          height: 70px;
          vertical-align: middle;">
        </a>
      </template>
    </el-table-column>

    <el-table-column
      label="infoPicture预览"
      align="center"
      min-width="16%">
      <template slot-scope="scope">
        <a :href="scope.row.infoPicture" target="_blank">
          <img v-lazy="scope.row.infoPicture" :key="scope.row.infoPicture"
          style="width: 70px;
          height: 70px;
          vertical-align: middle;">
        </a>
      </template>
    </el-table-column>

    <el-table-column
      label="开发商"
      align="center"
      min-width="14%">
      <template slot-scope="scope">
        <span style="margin-left: 10px">
          {{ scope.row.developer }}</span>
      </template>
    </el-table-column>

    <el-table-column
      label="游戏名"
      align="center"
      min-width="14%">
      <template slot-scope="scope">
        <span style="margin-left: 10px">
          {{ scope.row.gameName }}</span>
      </template>
    </el-table-column>

    <el-table-column
      label="网址"
      align="center"
      min-width="14%">
      <template slot-scope="scope">
        <span style="margin-left: 10px">
          {{ scope.row.internetSite }}</span>
      </template>
    </el-table-column>

    <el-table-column
      label="发行商"
      align="center"
      min-width="14%">
      <template slot-scope="scope">
        <span style="margin-left: 10px">
          {{ scope.row.publisher }}</span>
      </template>
    </el-table-column>

    
    <el-table-column
      label="语言类型"
      align="center"
      min-width="14%">
      <template slot-scope="scope">
        <span style="margin-left: 10px">
          {{ scope.row.language }}</span>
      </template>
    </el-table-column>

    <el-table-column
      label="参与部分"
      align="center"
      min-width="10%">
      <template slot-scope="scope">
        <span style="margin-left: 10px">
          {{ scope.row.participation }}</span>
      </template>
    </el-table-column>

    <!-- <el-table-column
      label="typeId"
      align="center"
      min-width="10%">
      <template slot-scope="scope">
        <span style="margin-left: 10px">
          {{ scope.row.typeId }}</span>
      </template>
    </el-table-column> -->

    <el-table-column label="操作" align="center" min-width="30%">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">
          修改</el-button>
        <!-- <el-button
          size="mini"
          @click="handleReplace(scope.$index, scope.row)">
          替换</el-button> -->
        <!-- <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">
          删除</el-button> -->
      </template>
    </el-table-column>
  </el-table>

  <el-drawer
    title="我是标题"
    :visible.sync="drawer"
    :with-header="false">
    <div class="upload-p">上传图片</div>
    

    <el-form :inline="true" :model="datas" class="demo-form-inline">
      <el-form-item label="语言类型: ">
        <el-select v-model="datas.language" placeholder="请选择查询/增加语言类型">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="类型ID: ">
        <el-input v-model="datas.typeId"></el-input>
      </el-form-item>

      <el-form-item label="游戏名: ">
        <el-input v-model="datas.gameName"></el-input>
      </el-form-item>

      <el-form-item label="开发商: ">
        <el-input v-model="datas.developer"></el-input>
      </el-form-item>

      <el-form-item label="发行商: ">
        <el-input v-model="datas.publisher"></el-input>
      </el-form-item>

      <el-form-item label="参与部分: ">
        <el-input v-model="datas.participation"></el-input>
      </el-form-item>

      <el-form-item label="网址: ">
        <el-input v-model="datas.internetSite"></el-input>
      </el-form-item>

      <el-form-item label="icon: ">
        <input type="file" @change="uploadIcon">
      </el-form-item>

      <el-form-item label="infoPicture: ">
        <input type="file" @change="uploadInfoPicture">
      </el-form-item>

      <el-form-item>
        <el-button @click="addProject">提交保存</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</div>
    
</template>

<script>
import { addPartNamePicture, findPartNamePicture, updatePartNamePicture } from '../../network/addPartNamePicture'

export default {
  name: 'addProject',

  created() {
    findPartNamePicture(null, 0, 1000, this.datas.language).then(res =>{
      res.forEach(element => {
        let item = {}
        item.developer = element.developer
        item.gameName = element.gameName
        item.name = "图片" + element.id
        item.id = element.id
        item.publisher = element.publisher
        item.icon = 'http://39.107.45.47:8888/group1/' + element.icon
        item.infoPicture = 'http://39.107.45.47:8888/group1/' + element.infoPicture
        item.internetSite = element.internetSite
        item.participation = element.participation
        item.typeId = element.typeId
        if(element.language == 'zh') {
          item.language = "中文"
        } else if(element.language == 'en') {
          item.language = "英语"
        } else if(element.language == "jp") {
          item.language = "日语"
        } else {
          item.language = element.language
        }
        this.tableData.push(item)
      })
    })
  },

  data() {
    return {
      datas: {
        typeId: null,
        gameName: "",
        developer: '',
        publisher: '',
        participation: '',
        internetSite: '',
        icon: null,
        infoPicture: null,
        language: 'zh'
      },
      tableData: [],
      drawer: false,
      update: false,
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
      }]
    
    }
  },

  methods: {
    uploadIcon(e) {
      this.datas.icon = e.target.files
    },

    uploadInfoPicture(e) {
      this.datas.infoPicture = e.target.files
    },

    changeDrawer() {
      this.drawer = true
      this.datas.typeId = null
      this.datas.language = null
      this.datas.gameName = null
      this.datas.developer = null
      this.datas.publisher = null
      this.datas.publisher = null
      this.datas.participation = null
      this.datas.internetSite = null
    },

    addProject() {
      let icon = Array.prototype.slice.call(this.datas.icon)
      let infoPicture = Array.prototype.slice.call(this.datas.infoPicture)
      this.datas.icon = icon[0]
      this.datas.infoPicture = infoPicture[0]
      let formData = new FormData()
      formData.append("language", this.datas.language) 
      formData.append("icon", this.datas.icon) 
      formData.append("typeId", this.datas.typeId)
      formData.append("gameName", this.datas.gameName)
      formData.append("developer", this.datas.developer)
      formData.append("publisher", this.datas.publisher)
      formData.append("participation", this.datas.participation)
      formData.append("internetSite", this.datas.internetSite)
      formData.append("infoPicture", this.datas.infoPicture)
      formData.append("id", this.datas.id)
      if(this.update) {
        updatePartNamePicture(formData).then(res => {
          if(res.message) {
            this.$message({
              type: 'success',
              message: '修改成功'
            })
          } else {
            this.$message({
              type: 'error',
              message: '修改失败'
            })
          }
        })
      } else {
        addPartNamePicture(formData).then(res => {
          if(res.message) {
            this.$message({
              type: 'success',
              message: '添加成功'
            })
          } else {
            this.$message({
              type: 'error',
              message: '添加失败'
            })
          }
        })
      }
      this.update = false
    },

    handleEdit(index, row) {
      console.log(row);
      this.update = true
      this.drawer = true
      this.datas.typeId = row.typeId
      this.datas.language = row.language
      this.datas.gameName = row.gameName
      this.datas.developer = row.developer
      this.datas.publisher = row.publisher
      this.datas.publisher = row.publisher
      this.datas.participation = row.participation
      this.datas.internetSite = row.internetSite
      this.datas.id = row.id
    },

    queryProject() {
      this.tableData = []
      findPartNamePicture(null, 0, 100, this.datas.language).then(res =>{
        res.forEach(element => {
          let item = {}
          item.developer = element.developer
          item.gameName = element.gameName
          item.name = "图片" + element.id
          item.id = element.id
          item.publisher = element.publisher
          item.icon = 'http://39.107.45.47:8888/group1/' + element.icon
          item.infoPicture = 'http://39.107.45.47:8888/group1/' + element.infoPicture
          item.internetSite = element.internetSite
          item.participation = element.participation
          item.typeId = element.typeId
          if(element.language == 'zh') {
            item.language = "中文"
          } else if(element.language == 'en') {
            item.language = "英语"
          } else if(element.language == "jp") {
            item.language = "日语"
          } else {
            item.language = element.language
          }
          this.tableData.push(item)
        })
      })
    },

    handleReplace(index, row) {
      console.log(row);
    },

    handleDelete(index, row) {
      console.log(row);
    }
  }
}
</script>

<style scoped>

.upload {
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