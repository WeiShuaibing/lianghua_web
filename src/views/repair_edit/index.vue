<template>
  <div style="width: 95%;margin: 20px;">
    <el-row>
      <el-col :span="6">
        <label>筛选:&nbsp;&nbsp;&nbsp;</label>
        <el-radio-group v-model="seesu_status" @change="statusChange" size="medium">
          <el-radio-button label="1">未处理</el-radio-button>
          <el-radio-button label="2" >已确认</el-radio-button>
          <el-radio-button label="3" >已处理</el-radio-button>
        </el-radio-group>
      </el-col>
    </el-row>
    <el-row style="margin-top: 15px">
      <el-table v-loading="loading" :data="repairList" border style="width: 100%;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)">
        <el-table-column prop="id" label="ID" align="center" width="60" />
        <el-table-column prop="user_name" label="发起人" align="center" width="100" />
        <el-table-column prop="repair_text" label="维修描述" align="center" width="300" />
        <el-table-column align="center" label="图片">
          <template slot-scope="scope">
            <img v-for="(itme, index) in scope.row.repair_imgs" :key="index" :src="itme" alt="" style="width: 120px;padding: 5px">
          </template>
        </el-table-column>
        <el-table-column prop="su_evaluate" label="评分" align="center" width="150">
          <template slot-scope="scope">
            <span v-if="scope.row.repair_evaluate===-1">尚未评分</span>
            <span v-else>{{scope.row.repair_evaluate}}分:{{scope.row.repair_evaluate_text}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="admin_name" label="处理人" align="center" width="100" />
        <el-table-column prop="create_date" label="发起时间" width="170" align="center">
          <template slot-scope="scope">
            {{ scope.row.create_date | dateFormat }}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="130">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.repair_status === 1"
              type="warning"
              plain
              size="mini"
              @click="updateStatus(scope.row, 2)"
            >确认收到
            </el-button>
            <el-button
              v-if="scope.row.repair_status === 2"
              type="primary"
              plain
              size="mini"
              @click="updateStatus(scope.row, 3)"
            >确认处理
            </el-button>
            <el-button
              v-if="scope.row.repair_status === 3"
              type="success"
              plain
              disabled
              size="mini"
            >&nbsp;已处理&nbsp;
            </el-button>
<!--            <el-button style="margin-top: 5px;" type="danger" plain size="mini" @click="deleteRepair(scope.row)">删除</el-button>-->
          </template>
        </el-table-column>
      </el-table>
    </el-row>
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
import { getPageOfEdit, deleteById, updateStatus } from '../../api/repair'
export default {
  name: 'RepairIndex',
  data() {
    return {
      seesu_status: 1,
      repairList: [],
      pageNum: 1,
      pageSize: 10,
      totalNum: 0,
      loading: false
    }
  },
  filters: {
    dateFormat(value) {
      var d = new Date(value)
      return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()
    }
  },
  mounted() {
    this.getPage()
  },
  methods: {
    statusChange(v) {
      this.seesu_status = v
      this.getPage()
    },
    handleCurrentChangeOfFenye(va) {
      this.pageNum = va
      this.getPage()
    },
    deleteRepair(row) {
      this.$confirm('此操作将永久删除该维修记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteById(row.id).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getPage()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    updateStatus(row, status) {
      updateStatus(row.id, status).then(res => {
        this.$message.success('处理成功！')
        this.getPage()
      })
    },
    getPage() {
      this.loading = true
      getPageOfEdit(this.pageNum, this.pageSize, this.seesu_status).then(res => {
        this.repairList = res.data.rows
        this.totalNum = res.data.total
        this.repairList.forEach((item, index) => {
          item.repair_imgs = item.repair_imgs.split(',')
          for (var i in item.repair_imgs) {
            item.repair_imgs[i] = this.$BASE_HOST + item.repair_imgs[i]
          }
        })
        this.loading = false
      })
    }
  }
}
</script>

<style scoped>

</style>
