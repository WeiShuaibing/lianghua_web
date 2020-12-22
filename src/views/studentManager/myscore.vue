<template>
  <div class="app-container">
    <el-row>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="course.name" label="课程" />
        <el-table-column prop="className" label="成绩">
          <template slot-scope="scope">
            <div v-if="scope.row.score">
              <div v-for="item in scope.row.score.scoreList" :key="item.scoringId">
                <div>{{ item.title }}:{{ item.score }}</div>
              </div>
            </div>

          </template>
        </el-table-column>
        <el-table-column prop="course.score" label="学分" width="200" />
      </el-table>
    </el-row>
  </div>
</template>

<script>
import { getMyScore } from '@/api/student'

export default {
  name: 'MyScore',
  data() {
    return {
      tableData: []
    }
  },
  mounted() {
    this.getInfo()
  },
  methods: {
    getInfo() {
      getMyScore().then(res => {
        this.tableData = res.data
        console.log(res.data)
      })
    }
  }
}
</script>

<style scoped>

</style>
