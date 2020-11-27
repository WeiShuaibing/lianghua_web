<template>
  <div class="app-container">
    <el-row>
      <el-col :span="4">
        <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addNew">添加</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="courseId" label="ID" width="280"/>
        <el-table-column prop="name" label="课程名称" />
        <el-table-column prop="score" label="学分" width="180" />
        <el-table-column prop="createDate" label="创建时间" width="280" />
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="primary" size="small" icon="el-icon-edit" @click="editCourse(scope.row)">编辑</el-button>
            <el-popconfirm confirm-button-text='确认' cancel-button-text='不用了' icon="el-icon-info" icon-color="red" title="确定删除吗？" @onConfirm="deleteCourse(scope.row.courseId)">
              <el-button type="danger" size="small" icon="el-icon-delete" slot="reference">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-row>

    <!--新增对话框-->
    <div>
      <el-dialog title="新增课程" :visible.sync="addVisible">
        <div style="width: 80%;margin: 0 auto;">
          <el-row>
            <el-col :span="4"> <span style="line-height: 2">課程名字：</span></el-col>
            <el-col :span="18">
              <el-input placeholder="请输入..." v-model="course.name"></el-input>
            </el-col>
          </el-row>
          <el-row style="margin-top: 20px;">
            <el-col :span="4"> <span style="line-height: 2">学分：</span></el-col>
            <el-col :span="18">
              <el-select v-model="course.score" placeholder="请选择">
                <el-option label="1分" value="1" />
                <el-option label="2分" value="2" />
                <el-option label="3分" value="3" />
                <el-option label="4分" value="4" />
                <el-option label="5分" value="5" />
                <el-option label="6分" value="6" />
                <el-option label="7分" value="7" />
                <el-option label="8分" value="8" />
                <el-option label="9分" value="9" />
                <el-option label="10分" value="10" />
              </el-select>
            </el-col>
          </el-row>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addVisible = false">取 消</el-button>
          <el-button v-if="!isEdit" type="primary" @click="saveNewCourse">保存</el-button>
          <el-button v-if="isEdit" type="primary" @click="enshureEdit">更新</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { save, getAll, deleteById } from '../../api/course'

export default {
  name: 'CourseIndex',
  data() {
    return {
      tableData: [],
      isEdit: false,
      addVisible: false,
      course: {
        courseId: 0,
        name: '',
        score: null // 学分
      }
    }
  },
  mounted() {
    this.all()
  },
  methods: {
    addNew() {
      this.addVisible = true
    },
    enshureEdit() {
      this.saveNewCourse()
      this.isEdit = false
    },
    editCourse(row) {
      this.isEdit = true
      this.addVisible = true
      this.course = row
    },
    saveNewCourse() {
      save(this.course).then(res => {
        this.course.courseId = 0
        this.course.name = ''
        this.course.score = ''
        this.addVisible = false
        this.all()
      })
    },
    all() {
      getAll().then(res => {
        this.tableData = res.data
      })
    },
    deleteCourse(id) {
      deleteById(id).then(res => {
        this.all() // 删除数据后重新加载页面的数据
      })
    }
  }

}
</script>

<style scoped>

</style>
