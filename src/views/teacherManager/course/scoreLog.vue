<template>
    <div class="app-container">
      <el-row>
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column prop="stuId" label="StudentID" width="280" />
          <el-table-column prop="stuName" label="姓名"/>
          <el-table-column prop="classNameAndCourseName" label="课程" />
          <el-table-column prop="operator" label="操作者" width="200" />
          <el-table-column prop="behavior" label="行为" width="200">
            <template slot-scope="scope">
              <el-tag type="primary">{{scope.row.behavior}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="createDate" label="时间" width="280" />
          <el-table-column prop="scoreList" label="修改成绩" width="280">
            <template slot-scope="scope">
              <div v-for="(item, index) in scope.row.scoreList" :key="index">
                 <div>
                  {{ item.title }}:{{ item.score }}
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </div>
</template>

<script>
import { getAllScoreLog } from '../../../api/scoreLog'

export default {
  name: 'ScoreLog',
  data() {
    return {
      stuId: '',
      tableData: []
    }
  },
  mounted() {
    this.getRouterParams()
    this.getAllLog()
  },
  methods: {
    getAllLog() {
      getAllScoreLog(this.stuId).then(res => {
        this.tableData = res.data
      })
    },
    getRouterParams() {
      this.stuId = this.$route.query.stuId
    }
  }
}
</script>

<style scoped>

</style>
