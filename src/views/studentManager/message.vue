<template>
  <div class="app-container">
    <el-row style="margin-top: 30px;">
      <el-col :span="3">
        <el-select v-model="value" placeholder="请选择老师">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-col>
      <el-col :span="10">
        <el-input
          v-model="message"
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
        />
      </el-col>
      <el-col :span="2" :offset="1">
        <el-button type="primary">留言</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Message',
  data() {
    return {
      message: '',
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }]
    }
  },
  mounted() {
  },
  methods: {}
}
</script>

<style scoped>

</style>
