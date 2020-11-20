<template>
  <div class="upload">
    <div>更新图片</div>
    <el-divider />

    <el-button @click="drawer = true" type="primary" style="margin-left: 16px;">
      点击上传图片
    </el-button>

      <el-upload
        class="upload-demo"
        action="http://172.16.40.102:2222/features/addBannerPicture"
        :headers="headers"
        :on-preview="handlePreview"
        :file-list="fileList" 
        list-type="picture"
        :on-change="onChanges"
        :before-upload="beforeUpload"
        :before-remove="beforeRemove"
        :on-remove="remove">
        <!-- <el-button size="small" type="primary">点击上传</el-button> -->
      </el-upload>

      <el-drawer
        title="我是标题"
        :visible.sync="drawer"
        :with-header="false">
        <div class="upload-p">上传/更换 图片</div>
        

        <el-form :inline="true" :model="formUpBanner" class="demo-form-inline">
          <el-form-item label="请选择执行的操作: ">
            <el-select v-model="isReplace" placeholder="请选择执行的操作">
              <el-option label="上传图片" value="false"></el-option>
              <el-option label="替换图片" value="true"></el-option>
            </el-select>
          </el-form-item>

          <div v-if="isReplace === 'true'">
            <el-form-item label="请选择图片的格式: ">
              <el-select v-model="barId" placeholder="请选择上传图片的类型">
                <div v-for="(item, index) in pictureType" :key="index">
                  <el-option :label="item.headerList" :value="item.id"></el-option>
                </div>
              </el-select>
            </el-form-item>

            <el-form-item label="请输入替换图片bannerId: ">
              <el-input v-model="bannerId"></el-input>
            </el-form-item>

            
            <div>
              <el-form-item>
                <el-button @click="replaceBanner">点击更换</el-button>
              </el-form-item>
            </div>
          </div>

          <div v-else>
            <el-form-item label="请选择图片的类型: ">
              <el-select v-model="formUpBanner.pictureFormat" placeholder="请选择上传图片的类型">
                <el-option label="jpg" value="jpg"></el-option>
                <el-option label="png" value="png"></el-option>
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
                action="http://172.16.40.102:2222/features/addBannerPicture"
                :headers="headers"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :data="datas"
                :on-change="onChanges"
                :before-upload="beforeUpload">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
              </el-upload>
            </div>
          </div>
        </el-form>
      </el-drawer>
    </div>
    
</template>

<script>
import { getAllBanner } from '../../network/getAllBanner'
import { getNavBar } from "../../network/getNavBar";
import { deleteBanner } from "../../network/deleteBanner";
import { replaceBannerPicture } from "../../network/replaceBannerPicture"

export default {
  name: 'Upload',

  created() {
    getAllBanner().then(res => res.forEach(element => {
      let item = {}
      item.barId = element.barId
      item.id = element.id
      item.isReplace= element.isReplace
      item.name = "图片" + element.id
      item.url = 'http://182.92.211.173:8888/group1/' + element.pictureName
      this.fileList.push(item)
    }))

    getNavBar("zh").then(res => {
      res.bars.forEach(element => {
        element.headerList = element.headerList + "banner图"
        this.pictureType.push(element)
      })
    })
  },

  data() {
    return {
      formUpBanner: {
        pictureType: '',
        pictureFormat: ''
      },
      datas: {
        barId: ''
      },
      pictureType: [],
      tableData: [],
      fileList: [],
      headers: {
        "passport": this.$store.getters.passport
      },
      drawer: false,
      isReplace: '',
      barId: '',
      bannerId: ''
    }
  },

  methods: {
    beforeUpload(file) {
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
    handleRemove(file, fileList) {
      return false
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
    handlePreview(file) {
      window.open(file.url);   
    },
    replaceBanner() {
      console.log(this.isReplace, this.barId, this.bannerId);
      replaceBannerPicture(this.isReplace, this.barId, this.bannerId).then(res => {
        console.log(res);
      })
    },
    onChanges(file) {
      console.log(file);
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
</style>