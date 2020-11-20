<template>
  <div class="login">
    <div class="container">
      <div class="tap">登录</div>
      <el-form :label-position="labelPosition" label-width="80px" :model="user" ref="user">
        <el-row>
          <el-col :span="21">
            <el-form-item
              label="账号:"
              prop="username"
              :rules="[
                { required: true, message: '账号不能为空'}
              ]"
            >
              <el-input
                v-model="user.username"
                placeholder="请输入账号"
                prefix-icon="el-icon-s-custom"
                maxlength="11"
                show-word-limit
                autocomplete="off"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="21">
            <el-form-item
              label="密码:"
              prop="passwd"
              :rules="[
                { required: true, message: '密码不能为空'}
              ]"
            >
              <el-input
                v-model="user.passwd"
                placeholder="请输入账号密码"
                type="password"
                prefix-icon="el-icon-s-custom"
                autocomplete="off"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="21">
            <el-form-item label>
              <el-button type="primary" class="submit" @click="submitForm('user')">登录</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
// 网络请求
import { getLoginInfo } from "../../network/login";

export default {
  name: "Login",
  data() {
    return {
      labelPosition: "right",
      user: {
        username: "",
        passwd: "",
      },
      id: ""
    };
  },

  methods: {
    submitForm(formName) {
       this.$refs[formName].validate((valid) => {
          if (valid) {
            getLoginInfo(this.user.username, this.user.passwd).then(res => {
              this.$store.commit('saveUserToken', res.passport)
                if(res.message === 'success') {
                  this.$router.push('/home');
                } else {
                  this.$message({
                    message: "请输入正确的账号或者密码",
                    type: 'error'
                  })
                } 
            })
          } else {
            return false;
          }
       })
    }
  },

  created() {
    // console.log(this.$store.getters.userToken);
  }
};
</script>

<style scoped>
.login {
  position: relative;
  width: 100%;
  height: 100%;
}
.container {
  padding: 60px 0 50px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 550px;
  box-shadow: 0 6px 20px 5px rgba(40, 120, 255, 0.1),
    0 16px 24px 2px rgba(0, 0, 0, 0.05);
}
.tap {
  padding-bottom: 40px;
  text-align: center;
  font-size: 36px;
  line-height: 34px;
  color: #396afe;
  font-weight: 700;
}
.submit {
  background-color: #2878ff;
  width: 100%;
  color: #fff;
  border: 0;
  border-radius: 4px;
}
</style>