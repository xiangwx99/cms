<template>
  <div class="message">
      <div>留言板</div>
      <el-divider />

      <div class="container">
        <el-table :data="tableData" align="center">
          <el-table-column prop="id" label="编号" min-width="5%" align="center">
          </el-table-column>
          <!-- <el-table-column prop="createdAt" label="创建时间" min-width="12%" align="center">
          </el-table-column> -->
          <el-table-column prop="email" label="邮箱" min-width="12%" align="center">
          </el-table-column>
          <el-table-column prop="message" label="留言内容" min-width="12%" align="center">
          </el-table-column>
          <el-table-column prop="messageAt" label="留言时间" min-width="12%" align="center">
          </el-table-column>
          <el-table-column prop="messageFrom" label="留言作者" min-width="12%" align="center">
          </el-table-column>
          <!-- <el-table-column prop="updatedAt" label="updatedAt" min-width="12%" align="center">
          </el-table-column> -->
        </el-table>
        <div class="f-right">
          <paging-query :page="page" @changeLimit="changeLimit"
                        @subPage="subPage"
                        @addPage="addPage">
            </paging-query></div>
      </div>
  </div>
</template>

<script>
import { getLeaveComments } from '../../network/getLeaveComments'
// 工具包
import { timestampToTime } from "../../common/util"
import PagingQuery from "../../components/PagingQuery"

export default {
  name: "Messages",

  components: {
    PagingQuery
  },

  data() {
    return {
      tableData: [],
      page: 1,
      limit: 7
    }
  },

  mounted() {
    getLeaveComments(1, 7).then(res => {
      if(res) {
        res.forEach(element => {
        element.createdAt = timestampToTime(element.createdAt)
        element.messageAt = timestampToTime(element.messageAt)
        element.updatedAt = timestampToTime(element.updatedAt)
        this.tableData.push(element)
      });
      }
    })
  },

  methods: {
    changeLimit(limit) {
      this.limit = limit
      this.tableData = []
      getLeaveComments(this.page, this.limit).then(res => {
        if(res) {
          res.forEach(element => {
          element.createdAt = timestampToTime(element.createdAt)
          element.messageAt = timestampToTime(element.messageAt)
          element.updatedAt = timestampToTime(element.updatedAt)
          this.tableData.push(element)
        });
        }
      })
    },
    subPage() {
      this.page --
      if(this.page <= 0) {
        this.page = 1
      }
      this.tableData = []
      getLeaveComments(this.page, this.limit).then(res => {
        if(res) {
          res.forEach(element => {
          element.createdAt = timestampToTime(element.createdAt)
          element.messageAt = timestampToTime(element.messageAt)
          element.updatedAt = timestampToTime(element.updatedAt)
          this.tableData.push(element)
        });
        }
      })      
    },
    addPage() {
      this.page ++
      this.tableData = []
      getLeaveComments(this.page, this.limit).then(res => {
        if(res) {
          res.forEach(element => {
          element.createdAt = timestampToTime(element.createdAt)
          element.messageAt = timestampToTime(element.messageAt)
          element.updatedAt = timestampToTime(element.updatedAt)
          this.tableData.push(element)
        });
        }
      })
    }
  }
}
</script>

<style scoped>
.message {
  padding: 8px;
  box-shadow: 0 1px 5px rgba(0,0,0,0.2), 
              0 2px 2px rgba(0,0,0,0.14), 
              0 3px 1px -2px rgba(0,0,0,0.12);
  border-radius: 3px;
}

.el-table  {
  border: 1px solid #e1e6eb;
  border-radius: 3px;
}

.f-right {
  /* float: right; */
}

.el-input__inner {
  border: none;
}
</style>