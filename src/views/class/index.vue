<template>
  <div class="app-container">
    <el-row>
      <el-col :span="4">
        <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addNew">添加</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="classId" label="ID" width="280" />
        <el-table-column prop="name" label="班级名称" />
        <el-table-column prop="term" label="学期" width="250" />
        <el-table-column prop="week" label="教学周" width="250" />
        <el-table-column prop="remark" label="备注" />
        <el-table-column prop="createDate" label="创建时间" width="280" />
        <el-table-column label="操作" width="300">
          <template slot-scope="scope">
            <el-button type="success" size="small" @click="getCourse(scope.row.classId, true)">课程</el-button>
            <el-button type="primary" size="small" icon="el-icon-edit" @click="editClass(scope.row)">编辑</el-button>
            <el-popconfirm confirm-button-text="确认" cancel-button-text="不用了" icon="el-icon-info" icon-color="red" title="确定删除吗？" @onConfirm="deleteCourse(scope.row)">
              <el-button slot="reference" type="danger" size="small" icon="el-icon-delete">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-row>

    <!--对话框，显示班级所拥有的的课程-->
    <el-dialog title="课程" :visible.sync="showCourseVisible">
      <el-table :data="coursesOfClass">
        <el-table-column property="courseId" label="ID" width="200" />
        <el-table-column property="name" label="课程名称" />
        <el-table-column property="score" label="学分" width="200" />
      </el-table>
    </el-dialog>

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

    <!--新增对话框-->
    <div>
      <el-dialog title="新增班级" :visible.sync="addVisible">
        <div style="width: 80%;margin: 0 auto;">
          <el-row>
            <el-col :span="4"> <span style="line-height: 2">班级名称：</span></el-col>
            <el-col :span="18"><el-input v-model="myclass.name" placeholder="请输入..." /></el-col>
          </el-row>
          <el-row style="margin-top: 20px;">
            <el-col :span="4"> <span style="line-height: 2">学期：</span></el-col>
            <el-col :span="18">
              <el-select v-model="myclass.term" placeholder="请选择">
                <template v-for="item in 20">
                  <el-option :key="item" :label="item | termFilter1" :value="item | termFilter1" />
                  <el-option :key="item * 100" :label="item | termFilter2" :value="item | termFilter2" />
                </template>
              </el-select>
            </el-col>
          </el-row>
          <el-row style="margin-top: 20px;">
            <el-col :span="4"> <span style="line-height: 2">教学周：</span></el-col>
            <el-col :span="18">
              <el-select v-model="myclass.week" style="width: 600px;" multiple placeholder="请选择">
                <el-option v-for="item in 20" :key="item" :label="item | weekFilter" :value="item | weekFilter" />
              </el-select>
            </el-col>
          </el-row>
          <el-row style="margin-top: 20px;">
            <el-col :span="4"> <span style="line-height: 2">备注：</span></el-col>
            <el-col :span="18"><el-input v-model="myclass.remark" placeholder="请输入..." /></el-col>
          </el-row>
          <el-row style="margin-top: 20px;">
            <el-col :span="4"> <span style="line-height: 2">课程：</span></el-col>
            <el-col :span="18">
              <el-select v-model="myclass.course" style="width: 600px;" multiple placeholder="请选择">
                <el-option v-for="item in allCourse" :key="item.courseId" :label="item.name" :value="item.courseId" />
              </el-select>
            </el-col>
          </el-row>
        </div>
        <div slot="footer" style="margin-top: 60px;" class="dialog-footer">
          <el-button @click="addVisible = false">取 消</el-button>
          <el-button v-if="!isEdit" type="primary" @click="saveNewClass">保存</el-button>
          <el-button v-if="isEdit" type="primary" @click="enshureEdit">更新</el-button>
        </div>
      </el-dialog>
    </div>

  </div>
</template>

<script>
import { getAll, getCourseOfClassId } from '../../api/course'
import { save, getPage, update, deleteById } from '../../api/class'

export default {
  name: 'ClassIndex',
  filters: {
    termFilter1(val) {
      return val + 2020 + '上学期'
    },
    termFilter2(val) {
      return val + 2020 + '下学期'
    },
    weekFilter(val) {
      return '第' + val + '周'
    }
  },
  data() {
    return {
      tableData: [],
      allCourse: [],
      coursesOfClass: [],
      isEdit: false,
      addVisible: false,
      showCourseVisible: false,
      myclass: {
        name: '',
        term: '',
        week: [],
        remark: '',
        course: []
      },
      pageNum: 1,
      pageSize: 10,
      totalNum: 0
    }
  },
  mounted() {
    this.getAllCourse()
    this.getPageClass()
  },
  methods: {
    deleteCourse(row) {
      console.log(row.classId)
      deleteById(row.classId).then(res => {
        this.getPageClass()
      })
    },
    async editClass(row) {
      this.addVisible = true
      this.isEdit = true

      this.myclass.classId = row.classId
      this.myclass.name = row.name
      this.myclass.term = row.term
      this.myclass.remark = row.remark
      this.myclass.week = row.week.split(',')

      this.myclass.course.length = 0
      getCourseOfClassId(row.classId).then(res => {
        this.coursesOfClass = res.data
        this.coursesOfClass.forEach(value => {
          this.myclass.course.push(value.courseId)
        })
      })
      console.log('ssss')
      console.log(row)
    },
    getCourse(id, show) {
      getCourseOfClassId(id).then(res => {
        this.coursesOfClass = res.data
        if (show) {
          this.showCourseVisible = true
        } else {
          this.showCourseVisible = false
        }
      })
    },
    addNew() {
      this.addVisible = true
    },
    saveNewClass() {
      if (this.myclass.name === '' || this.myclass.term === '' || this.myclass.week.length === 0 || this.myclass.course.length === 0) {
        this.$message.warning('请完善相关信息')
        return
      }
      save({
        name: this.myclass.name,
        term: this.myclass.term,
        week: this.myclass.week.toString(),
        course: this.myclass.course.toString(),
        remark: this.myclass.remark
      }).then(res => {
        this.addVisible = false
        this.getPageClass()
      })
    },
    UpdateClass() {
      if (this.myclass.name === '' || this.myclass.term === '' || this.myclass.week.length === 0 || this.myclass.course.length === 0) {
        this.$message.warning('请完善相关信息')
        return
      }
      update({
        classId: this.myclass.classId,
        name: this.myclass.name,
        term: this.myclass.term,
        week: this.myclass.week.toString(),
        course: this.myclass.course.toString(),
        remark: this.myclass.remark
      }).then(res => {
        this.addVisible = false
        this.getPageClass()
      })
    },
    enshureEdit() {
      this.UpdateClass()
    },
    getAllCourse() {
      getAll().then(res => {
        this.allCourse = res.data
      })
    },
    getPageClass() {
      getPage(this.pageNum, this.pageSize).then(res => {
        this.tableData = res.data.records
        this.totalNum = res.data.total
      })
    },
    handleCurrentChangeOfFenye(va) {
      this.pageNum = va
      this.getPageClass()
    }
  }
}
</script>

<style scoped>

</style>
