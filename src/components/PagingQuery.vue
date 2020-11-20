<template>
  <div class="page-query">
    <div>
      <span>每页的行数: </span>
        <el-select v-model="value" placeholder="" class="select" @change="changeValue">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <span>
          <span class="pre choosehover" @click="preClick">上一页&lt;</span>
          <span>{{page}}</span>
          <span class="pre choosehover" @click="nextClick">&gt;下一页</span>
        </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageQuery',
  data() {
    return {
      options: [{
          value: 3,
          label: '3'
        }, {
          value: 7,
          label: '7'
        }, {
          value: 15,
          label: '15'
        }, {
          value: '30',
          label: '30'
        }, {
          value: '50',
          label: '50'
        }, {
          value: '100',
          label: '100'
        }],
      value: 7
    }
  },
  props: {
    page: {
      type: Number,
      default() {
        return 
      }
    }
  },
  methods: {
    preClick() {
      this.$emit('subPage')
    },

    nextClick() {
      this.$emit('addPage')
    },

    changeValue() {
      this.$emit('changeLimit', this.value)
    }
  }
}
</script>

<style scoped>
.page-query {
  margin-top: 15px;
}
.select {
  width: 70px;
}
.pre {
  margin-left: 10px;
  margin-right: 10px;
}
.choosehover:hover {
  cursor: pointer;
  color: aqua;
}
</style>