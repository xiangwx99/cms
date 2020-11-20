<template>
  <div class="upload">
    <div>更新图片</div>
    <el-divider />

    <el-button @click="drawer = true" 
      type="primary" 
      style="margin-bottom: 16px">
      点击上传图片
    </el-button>

  <el-row :gutter="20">
  <el-col :span="10">
    <el-select v-model="language" placeholder="请选择查询图片">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
  </el-col>
  <el-col :span="10"> 
      <el-button type="primary" plain @click="queryBanner">查询</el-button>
    </el-col>
  </el-row>

  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      label="导航栏"
      align="center"
      min-width="30%">
      <template slot-scope="scope">
        <span style="margin-left: 10px">
          {{ scope.row.headerList }}</span>
      </template>
    </el-table-column>

    <el-table-column
      label="语言类型"
      align="center"
      min-width="30%">
      <template slot-scope="scope">
        <span style="margin-left: 10px">
          {{ scope.row.language }}</span>
      </template>
    </el-table-column>

    <el-table-column
      label="图片预览"
      align="center"
      min-width="30%">
      <template slot-scope="scope">
        <a :href="scope.row.url" target="_blank">
          <img v-lazy="scope.row.url"
          :key="scope.row.url"
          style="width: 70px;
          height: 70px;
          vertical-align: middle;">
        </a>
      </template>
    </el-table-column>
    <el-table-column label="操作" align="center">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">
          修改</el-button>
        <el-button
          size="mini"
          @click="handleReplace(scope.$index, scope.row)">
          替换</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">
          删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <input type="file" 
    ref="file" 
    style="display: none" 
    @change="on_Change()">

    <el-drawer
      title="我是标题"
      :visible.sync="drawer"
      :with-header="false">
      <div class="upload-p">上传/更换 图片</div>
      

      <el-form :inline="true" :model="formUpBanner" class="demo-form-inline">
          <el-form-item label="请选择图片的类型: ">
            <el-select v-model="formUpBanner.pictureFormat" placeholder="请选择上传图片的类型">
              <el-option label="jpg" value="jpg"></el-option>
              <el-option label="png" value="png"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="请选择语言的种类: ">
            <el-select v-model="formUpBanner.language" placeholder="请选择语言种类" @change="gteNav">
              <el-option label="中文" value="zh"></el-option>
              <el-option label="英语" value="en"></el-option>
              <el-option label="日语" value="jp"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="请选择图片的格式: ">
            <el-select v-model="datas.barId" placeholder="请选择图片的格式">
              <div v-for="(item, index) in pictureType" :key="index">
                <el-option :label="item.headerList" :value="item.id"></el-option>
              </div>
            </el-select>
          </el-form-item>

          <div>
            <el-upload
              class="upload-demo"
              action="http://39.107.45.47:2222/features/addBannerPicture"
              :headers="headers"
              :data="datas"
              :before-upload="beforeUpload">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件,且不超过1M</div>
            </el-upload>
          </div>
      </el-form>
    </el-drawer>
    </div>
    
</template>

<script>
import { getAllBanner } from '../../network/getAllBanner'
import { getNavBar, getNavBarById } from "../../network/getNavBar";
import { deleteBanner } from "../../network/deleteBanner";
import { replaceBannerPicture, updateBannerPicture } from "../../network/replaceBannerPicture"

export default {
  name: 'Upload',

  created() {
    this.showBanner()

    getNavBar("zh").then(res => {
      res.bars.forEach(element => {
        element.headerList = element.headerList + "banner图"
        this.pictureType.push(element)
      })
    })
  },

  data() {
    return {
      issue: '0',
      tableData: [],
      updateId: '',
      formUpBanner: {
        pictureType: '',
        pictureFormat: '',
        language: 'zh'
      },
      datas: {
        barId: '',
        language: 'zh'
      },
      pictureType: [],
      headers: {
        "passport": this.$store.getters.passport
      },
      drawer: false,
      isReplace: '',
      barId: '',
      bannerId: '',
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
      language: 'zh'
    }
  },

  methods: {
    showBanner() {
      this.tableData = []
      getAllBanner(this.language).then(res => res.forEach(element => {
        let item = {}
        item.barId = element.barId
        
        if(element.language == "zh") {
          item.language = "中文"
        } else if(element.language == "en") {
          item.language = "英语"
        } else {
          item.language = "日语"
        }
        item.headerList = ""
        item.id = element.id
        getNavBarById(element.barId).then(res => {
          item.headerList = res.bars.headerList.toString()
        })
        item.isReplace= element.isReplace
        item.name = "图片" + element.id
        item.url = 'http://39.107.45.47:8888/group1/' + element.pictureName
        this.tableData.push(item)
      }))
      
    },

    queryBanner() {
      this.showBanner()
    },

    handleEdit(index, row) {
      this.updateId = row.id
      this.$refs.file.click()
    },

    gteNav() {
      this.datas.language = this.formUpBanner.language
      this.pictureType = [this.formUpBanner.language]
      getNavBar(this.formUpBanner.language).then(res => {
        res.bars.forEach(element => {
          element.headerList = element.headerList + "banner图"
          this.pictureType.push(element)
        })
      })
    },

    on_Change() {
      var e = window.event || arguments.callee.caller.arguments[0];
      let files = Array.prototype.slice.call(e.target.files)
      let file = files[0]
      var formData = new FormData(); 
      formData.append("file", file); 
      formData.append("id", this.updateId);
      formData.append("language", this.language);
      updateBannerPicture(formData).then(res => {
        if(res.message === "update success!") {
          this.$message({
            type: 'success',
            message: '更新成功!'
          });
        } else {
          this.$message({
            type: 'error',
            message: '更新失败!'
          });
        }
      })
      this.showBanner()
    },

    handleReplace(index, row) {
      this.$confirm('此操作将替换该banner, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        row.isReplace = true
        replaceBannerPicture(row.isReplace, row.barId, row.id).then(res => {
        if(res) {
          this.$message({
            type: 'success',
            message: '替换成功!'
          });
        } else {
          this.$message({
            type: 'success',
            message: '替换失败!'
          });
        }
      })
      }).catch(() => {
        row.isReplace = false
        this.$message({
          type: 'info',
          message: '已取消替换'
        }); 
      })
    },

    handleDelete(index, row) {
      this.$confirm('此操作将删除该banner, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        replaceBannerPicture(row.isReplace, row.barId, row.id).then(res => {
        if(res) {
          deleteBanner(row.id).then(res => {
            if(res) {
              this.$message({
                type: 'success',
                message: '删除成功'
              })
            } else {
              this.$message({
                type: 'error',
                message: '删除失败'
              })
            }
          })
          this.showBanner()          
        } else {
          this.$message({
            type: 'success',
            message: '删除失败!'
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



    beforeUpload(file) {
      // console.log(file);
      if(file.size / 1024 > 1024) {
        this.$message({
            type: 'error',
            message: '请选择1M以下的图片'
        });
        return false
      }
      console.log(file.name);
      if (this.datas.barId === "" || this.formUpBanner.pictureFormat === "") {
        this.$message({
          message: '请同时选择图片类型与格式',
          type: 'error'
        });
        return false
      } else {
        let reg = "." + this.formUpBanner.pictureFormat
        let issue = file.name.indexOf(reg, this.formUpBanner.pictureFormat.length - 4);
        if(issue !== -1) {
          return true
        } else {
          this.$notify({
            title: '提示',
            message: '请选择' + this.formUpBanner.pictureFormat + '格式的图片',
            duration: 0
          });
          return false
        }
      }
    },
    
    beforeRemove(file) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },

    remove(file){
      console.log(file.id);
      deleteBanner(file.id).then(res => {
        if(res) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        } else {
          this.$message({
            type: 'info',
            message: '删除失败'
          }); 
        }
      })
    },
    
    replaceBanner() {
      console.log(this.isReplace, this.barId, this.bannerId);
      replaceBannerPicture(this.isReplace, this.barId, this.bannerId).then(res => {
        console.log(res);
      })
    },
    
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

a {
  display: inline-block;
}
</style>