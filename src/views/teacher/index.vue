<template>
  <div class="app-container">
    <el-row>
      <el-col :span="4">
        <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addNew">添加</el-button>
      </el-col>
      <el-col :span="6">
        <el-input v-model="matchStr" placeholder="请输入关键字搜索教师" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="searchTeacher" />
        </el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="teaId" label="ID" width="80" />
        <el-table-column prop="name" label="姓名" width="180" />
        <el-table-column prop="phone" label="电话" width="180" />
        <el-table-column prop="classCourseName" label="所教班级" />
        <el-table-column prop="remark" label="备注" width="280" />
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="primary" size="small" icon="el-icon-edit" @click="editTeacher(scope.row)">编辑</el-button>
            <el-popconfirm confirm-button-text="确认" cancel-button-text="不用了" icon="el-icon-info" icon-color="red" title="确定删除吗？" @onConfirm="deleteTeacher(scope.row.teaId)">
              <el-button slot="reference" type="danger" size="small" icon="el-icon-delete">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-row>

    <!--新增教师信息对话框-->
    <div>
      <el-dialog title="新增教师" :visible.sync="addVisible">
        <div style="width: 80%;margin: 0 auto;">
          <el-row>
            <el-col :span="4"> <span style="line-height: 2">姓名：</span></el-col>
            <el-col :span="18"><el-input v-model="teacher.name" placeholder="请输入..." /></el-col>
          </el-row>
          <el-row style="margin-top: 20px;">
            <el-col :span="4"> <span style="line-height: 2">手机：</span></el-col>
            <el-col :span="18"><el-input v-model="teacher.phone" maxlength="11" placeholder="请输入..." /></el-col>
          </el-row>
          <el-row style="margin-top: 20px;">
            <el-col :span="4"> <span style="line-height: 2">所教课程：</span></el-col>
            <el-col :span="18">
              <el-cascader v-model="teacher.courseId" style="width: 400px;" :clearable="true" placeholder="试试搜索：指南" :props="{ multiple: true }" :options="allCourses" filterable />
            </el-col>
          </el-row>
          <el-row style="margin-top: 20px;">
            <el-col :span="4"> <span style="line-height: 2">备注：</span></el-col>
            <el-col :span="18"><el-input v-model="teacher.remark" type="textarea" :rows="2" placeholder="请输入..." /></el-col>
          </el-row>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addVisible = false">取 消</el-button>
          <el-button v-if="!isEdit" type="primary" @click="saveNewTeacher">保存</el-button>
          <el-button v-if="isEdit" type="primary" @click="enshureEdit">更新</el-button>
        </div>
      </el-dialog>
    </div>
    <!--分页组件 start-->
    <div style="height: 40px;" />
    <el-pagination
      background
      style="margin-bottom: 100px;"
      :current-page="pageNum"
      :page-size="pageSize"
      :total="totalNum"
      layout="total, prev, pager, next, jumper"
      @current-change="handleCurrentChangeOfFenye"
    />
    <!--分页组件 end-->
  </div>
</template>

<script>
import { getAllCourseWithFormat } from '@/api/course'
import { saveTeacher, getPageOfteacher, deleteById } from '@/api/teacher'

export default {
  name: 'TeacherIndex',
  data() {
    return {
      tableData: [],
      isEdit: false,
      addVisible: false,
      allCourses: [],
      matchStr: '',
      teacher: {
        teaId: null,
        name: '',
        phone: '',
        courseId: [],
        remark: ''
      },
      pageNum: 1,
      pageSize: 10,
      totalNum: 0
    }
  },
  watch: {
  },
  mounted() {
    this.getPage()
    this.getAllCourseData()
  },
  methods: {
    editTeacher(row) {
      this.isEdit = true
      this.addVisible = true
      this.teacher.name = row.name
      this.teacher.teaId = row.teaId
      this.teacher.phone = row.phone
      this.teacher.remark = row.remark
    },
    enshureEdit() {
      this.saveNewTeacher()
    },
    deleteTeacher(id) {
      deleteById(id).then(res => {
        this.getPage()
      })
    },
    addNew() {
      this.addVisible = true
    },
    saveNewTeacher() {
      if (this.teacher.name === '' || this.teacher.phone === '' || this.teacher.courseId.length === 0) {
        this.$message.warning('请完善信息')
        return
      }
      var ids = []
      this.teacher.courseId.forEach(e => {
        ids.push(e[1])
      })
      saveTeacher({
        name: this.teacher.name,
        teaId: this.teacher.teaId,
        phone: this.teacher.phone,
        password: this.$md5(this.teacher.phone),
        classCourseRel: ids.toString(),
        remark: this.teacher.remark
      }).then(res => {
        this.getPage()
        this.addVisible = false
      })
    },
    searchTeacher() {
      this.getPage()
    },
    getPage() {
      getPageOfteacher(this.pageNum, this.pageSize, this.matchStr).then(res => {
        this.tableData = res.data.records
        this.totalNum = res.data.total
      })
    },
    getAllCourseData() {
      getAllCourseWithFormat().then(res => {
        this.allCourses = res.data
      })
    },
    handleCurrentChangeOfFenye(va) {
      this.pageNum = va
      this.getPage()
    }
  }
}
</script>

<style scoped>

</style>
