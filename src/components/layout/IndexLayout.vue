<template>
  <el-container>
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu :default-openeds="['1', '3']">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-menu"></i>导航</template>
        <el-menu-item-group>
          <el-menu-item index="1-1" @click="toMessages">查看留言</el-menu-item>
          <el-menu-item index="1-2" @click="addNav">查询导航</el-menu-item>
          <el-menu-item index="1-3" @click="addProject">添加项目</el-menu-item>
          <el-menu-item index="1-4" @click="toUploadBanner">上传背景图</el-menu-item>
          <el-menu-item index="1-5" @click="toaddGameType">添加游戏类型</el-menu-item>
          <el-menu-item index="1-6" @click="toaddQq">添加QQ</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <!-- <el-submenu index="2">
        <template slot="title"><i class="el-icon-message"></i>导航二</template>
        <el-menu-item-group>
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-setting"></i>导航三</template>
        <el-menu-item-group>
          <el-menu-item index="3-1">选项1</el-menu-item>
          <el-menu-item index="3-2">选项2</el-menu-item>
        </el-menu-item-group>
      </el-submenu> -->
    </el-menu>
    </el-aside>
  
    <el-container>
    <el-header style="text-align: right; font-size: 14px; height: 40px">
      <el-dropdown >
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown" split-button>
          <el-dropdown-item @click.native="loginout">退出登录</el-dropdown-item>
          <!-- <el-dropdown-item>查看</el-dropdown-item>
          <el-dropdown-item>新增</el-dropdown-item> -->
        </el-dropdown-menu>
      </el-dropdown>
      <!-- <span>猪八戒</span> -->
    </el-header>
    
    <el-main>
      <slot></slot>
    </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { loginOut } from '../../network/loginOut'
import axios from 'axios'
export default {
  name: 'IndexLayout',
  data() {
    return {
      
    }
  },

  mounted() {
    
  },

  methods: {
    toMessages() {
      this.$router.push('/home/messages')
    },

    toUploadBanner() {
      this.$router.push('/home/upload')
    },

    addNav() {
      this.$router.push('/home/addNav')
    },

    addProject() {
      this.$router.push('/home/addProject')
    },

    toaddGameType() {
      this.$router.push('/home/addGameType')
    },

    toaddQq() {
      this.$router.push('/home/addQq')
    },
    loginout() {
      axios({
        url: 'http://39.107.45.47:2222/user/loginOut',
        method: 'post',
        headers: {
          'passport': this.$store.getters.passport
        }
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
      
      // loginOut();
      this.$store.commit('removeUserToken')
      this.$router.push('/login')
      
    }
  }
}
</script>

<style scoped>
  .el-header {
    position: fixed;
    z-index: 1;
    top: 0;
    left: 200px;
    right: 0;
    background-color: #B3C0D1;
    color: #333;
    line-height: 40px;
  }
  
  .el-aside {
    position: fixed;
    top: 0;
    left: 0;
    color: #333;
  }

  .el-main {
    overflow: hidden !important;
    margin-top: 40px;
    margin-left: 200px;
    margin-right: 0px;
    border-radius: 4px;
    /* box-shadow: 0 0 5px #B3C0D1; */
  }
</style>