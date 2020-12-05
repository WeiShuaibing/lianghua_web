<template>
  <div class="app-container">
    <el-row style="margin-top: 30px;">
      <el-col :span="3">
        <el-select v-model="selectTeacherId" placeholder="请选择老师">
          <el-option
            v-for="item in teachers"
            :key="item.teaId"
            :label="item.name"
            :value="item.teaId"
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
        <el-button type="primary" @click="toSave">留言</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="message" label="留言" />
        <el-table-column prop="teaName" label="老师" />
        <el-table-column prop="reply" label="回复" />
        <el-table-column prop="createDate" label="创建时间" width="280" />
      </el-table>
    </el-row>
  </div>
</template>

<script>
import { getAllMyTeacher } from '@/api/student'
import { saveMessage, getAllMessage } from '@/api/message'
export default {
  name: 'Message',
  data() {
    return {
      message: '',
      teachers: [],
      selectTeacherId: '',
      tableData: []
    }
  },
  mounted() {
    this.getTeachers()
    this.getAll()
  },
  methods: {
    getAll() {
      getAllMessage().then(res => {
        console.log(res.data)
        this.tableData = res.data
      })
    },
    getTeachers() {
      getAllMyTeacher().then(res => {
        this.teachers = res.data
      })
    },
    toSave() {
      saveMessage({
        teaId: this.selectTeacherId,
        message: this.message
      }).then(res => {
        if (res.code === 20000) {
          this.$message.success('留言成功')
          this.message = ''
          this.getAll()
        } else {
          this.$message.warning(res.msg)
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
