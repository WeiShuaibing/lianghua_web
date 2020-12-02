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
      selectTeacherId: ''
    }
  },
  mounted() {
    this.getTeachers()
  },
  methods: {
    getAll() {
      getAllMessage().then(res => {
      })
    },
    getTeachers() {
      getAllMyTeacher().then(res => {
        console.log(res.data)
        this.teachers = res.data
      })
    },
    toSave() {
      saveMessage({
        teaId: this.selectTeacherId,
        message: this.message
      }).then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style scoped>

</style>
