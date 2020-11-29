<template>
  <div class="app-container">
    <h2>学生成绩页面</h2>
    <el-row>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="student.stuId" label="StudentID" width="80" />
        <el-table-column prop="student.name" label="姓名" width="200" />
        <el-table-column prop="phone" label="手机" width="200" />
        <el-table-column prop="student.sex" label="性别" width="80" />
        <el-table-column prop="student.age" label="年龄" width="80" />
        <el-table-column prop="student.remark" label="备注" width="280" />
        <el-table-column prop="finalScore" label="最终成绩" width="100" />
        <el-table-column prop="score.score" label="成绩" width="280">
          <template slot-scope="scope">
            <div v-for="(item, index) in scope.row.score" :key="item.id">
              <div v-if="index === 'score'">
                <div v-for="i in item" :key="i.scoringId">
                  {{ i.title }}:{{ i.score }}
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="success" size="small" @click="inputScore(scope.row)">录入成绩</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>

    <!--录入成绩对话框-->
    <div>
      <el-dialog title="录入成绩" :visible.sync="inputScoreVisible">
        <div style="width: 70%;margin: 0 auto;">
          <el-row v-for="item in scoringInfo" :key="item.scoringId" style="margin-top: 15px;">
            <el-col :span="12"> <span style="line-height: 2">{{ item.title }}({{ item.scoringScore }})：</span></el-col>
            <el-col :span="12">
              <el-input-number v-model="item.score" :min="1" :step="1" :max="100" label="输入成绩" />
            </el-col>
          </el-row>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="inputScoreVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveInputScore">保存</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getPageOfScore, saveScore } from '@/api/score'
import { getScoringInfoById } from '@/api/classcourserel'

export default {
  name: 'StudentScore',
  filters: {
    scoreItemFilter(val) {
      return val
    }
  },
  data() {
    return {
      tableData: [],
      inputScoreVisible: false,
      classId: 0,
      courseId: 0,
      editScoreId: 0,
      classCourseRel: 0,
      currentEditStuId: 0,
      currentStuTotalScore: 0,
      scoringInfo: [], // 计分项信息
      totalNum: 0,
      pageNum: 1,
      pageSize: 10
    }
  },
  mounted() {
    this.getRouterParams()
    this.getScoreInfo()
    this.getScoringInfo()
  },
  methods: {
    getRouterParams() {
      this.classId = this.$route.query.classId
      this.courseId = this.$route.query.courseId
      this.classCourseRel = this.$route.query.classCourseRel
    },
    saveInputScore() {
      saveScore({
        id: this.editScoreId,
        stuId: this.currentEditStuId,
        classCourseRelId: this.classCourseRel,
        score: JSON.stringify(this.scoringInfo)
      }).then(res => {
        this.inputScoreVisible = false
        this.getScoreInfo()
      })
    },
    inputScore(row) {
      this.currentEditStuId = row.student.stuId
      if (row.score !== null) {
        this.editScoreId = row.score.id
      }
      this.inputScoreVisible = true
    },
    getScoreInfo() {
      getPageOfScore(this.classId, this.courseId, this.classCourseRel, this.pageNum, this.pageSize).then(res => {
        this.tableData = res.data.records
        // 格式化tableData中的成绩数据
        for (var item in this.tableData) {
          if (this.tableData[item]['score'] !== null) {
            this.tableData[item]['score']['score'] = JSON.parse(this.tableData[item]['score']['score'])
          }
        }
        this.totalNum = res.data.total

        console.log(this.tableData)
      })
    },
    getScoringInfo() { // 根据relId获取计分项的信息
      getScoringInfoById(this.classCourseRel).then(res => {
        this.scoringInfo = res.data
      })
    }
  }
}
</script>

<style scoped>

</style>
