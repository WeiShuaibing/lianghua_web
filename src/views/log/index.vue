<template>
<div style="width: 95%;margin: 0 auto;margin-top: 20px;">
  <div style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
    <el-table
      :data="logList"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="ID"
        width="100">
      </el-table-column>
      <el-table-column
        prop="user"
        label="操作者"
        width="180">
      </el-table-column>
      <el-table-column
        prop="operation"
        label="操作">
      </el-table-column>
      <el-table-column
        prop="date"
        width="180"
        label="操作时间">
      </el-table-column>
      <el-table-column prop="operationStatus" width="200" label="状态">
        <template slot-scope="scope">
          <el-tag :type="scope.row.operationStatus | tagTypeFilter">{{scope.row.operationStatus}}</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>

  <!--分页-->
  <el-row>
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
  </el-row>
</div>
</template>

<script>
import { getPage } from '../../api/log'
export default {
  name: 'LogIndex',
  data() {
    return {
      pageNum: 1,
      pageSize: 10,
      totalNum: 0,
      logList: []
    }
  },
  filters: {
    tagTypeFilter(value) {
      if (value === 'success') {
        return 'success'
      } else {
        return 'warning'
      }
    }
  },
  mounted() {
    this.getPageData()
  },
  methods: {
    handleCurrentChangeOfFenye(va) {
      this.pageNum = va
      this.getPageData()
    },
    getPageData() {
      getPage(this.pageNum, this.pageSize).then(res => {
        this.logList = res.data.records
        this.totalNum = res.data.total
      })
    }
  }
}
</script>

<style scoped>

</style>
