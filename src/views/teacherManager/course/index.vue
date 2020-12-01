<template>
  <div class="app-container">
    <h2>课程管理</h2>
    <el-row>
      <el-table :data="tableData" stripe style="width: 100%">
        <!--        <el-table-column prop="courseId" label="courseId" width="280" />-->
        <el-table-column prop="myclass.name" label="班级名称" />
        <el-table-column prop="course.name" label="课程名称" />
        <el-table-column prop="course.score" label="课程学分" width="280" />
        <el-table-column prop="scoringIds" label="计分项" width="280">
          <template slot-scope="scope">
            <div v-for="item in scope.row.scorings" :key="item.scoringId">
              <span>{{ item.title }}:{{ item.num }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="300">
          <template slot-scope="scope">
            <el-button type="primary" size="small" icon="el-icon-edit" @click="ednitJiFenXiang(scope.row)">计分项</el-button>
            <el-button type="success" size="small" @click="toScoreManager(scope.row)">成绩管理</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>

    <!--计分项修改对话框-->
    <div>
      <el-dialog title="计分项修改" :visible.sync="jiFenXiangVisible">
        <div style="width: 70%;margin: 0 auto;">
          <span style="color: #24da70;">计分项的和应等于1，每项权重在0~1之间</span>
          <el-row v-for="item in scorings" :key="item.scoringId" style="margin-top: 20px;">
            <el-col :span="6"> <span style="line-height: 2">{{ item.title }}：</span></el-col>
            <el-col :span="12">
              <el-input-number v-model="item.num" :min="0" :step="0.1" :max="1" label="描述文字" @change="jiFenxiangChange(item)" />
            </el-col>
          </el-row>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="jiFenXiangVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveScoringInfo">保存</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getMyCourseAllInfo } from '@/api/teacher'
import { getAll } from '@/api/scoring'
import { updateClasscourserel } from '@/api/classcourserel'

export default {
  name: 'TeacherCourseIndex',
  data() {
    return {
      tableData: [],
      scorings: [],
      jiFenXiangVisible: false,
      editClasCourseRelId: 0,
      editScoringInfo: {}
    }
  },
  mounted() {
    this.getMyCourse()
    this.getAllScoring()
  },
  methods: {
    jiFenxiangChange(item) {
      this.editScoringInfo[item.scoringId] = item.num
    },
    saveScoringInfo() {
      var totalNum = 0
      for (var key in this.editScoringInfo) {
        totalNum = totalNum + this.editScoringInfo[key]
      }
      if (totalNum !== 1) {
        this.$message.warning('计分项的和应该为1')
      } else {
        // 将数据发送到后端进行保存
        updateClasscourserel({
          classCourseRel: this.editClasCourseRelId,
          scoringIds: JSON.stringify(this.editScoringInfo)
        }).then(res => {
          this.jiFenXiangVisible = false
          this.editClasCourseRelId = 0
          this.getMyCourse()
        })
      }
    },
    ednitJiFenXiang(row) {
      console.log(row)
      this.editScoringInfo = {}
      this.jiFenXiangVisible = true
      this.editClasCourseRelId = row.classCourseRel
    },
    toScoreManager(row) {
      // 跳转到成绩管理页面
      this.$router.push({ path: '/teacher/course/ScoreIndex', query: { classId: row.classId, courseId: row.courseId, classCourseRel: row.classCourseRel }})
    },
    getMyCourse() {
      getMyCourseAllInfo().then(res => {
        this.tableData = res.data
      })
    },
    getAllScoring() {
      getAll().then(res => {
        this.scorings = res.data
      })
    }
  }
}
</script>

<style scoped>

</style>
