<template>
    <div style="width: 95%;margin: 0 auto;">
      <el-row style="margin-top: 15px;">
        <el-col :span="2">
          <label style="line-height: 2">新建备份:</label>
        </el-col>
        <el-col :span="6">
          <el-input v-model="backupText" placeholder="请输入备份信息..."></el-input>
        </el-col>
        <el-col :span="2" :offset="1">
          <el-button :loading="backupButtonLoading" type="success" @click="addNewBackup">新建备份</el-button>
        </el-col>
      </el-row>

      <el-row>
        <el-divider content-position="left">备份记录：</el-divider>
      </el-row>
      <el-row>
        <el-table
          :data="backupList"
          stripe
          style="width: 100%">
          <el-table-column
            prop="id"
            label="ID"
            width="100">
          </el-table-column>
          <el-table-column
            prop="backup_text"
            label="备份信息">
          </el-table-column>
          <el-table-column
            prop="backup_path"
            label="备份地址">
          </el-table-column>
          <el-table-column
            prop="admin_name"
            label="操作者"
            width="150">
          </el-table-column>
          <el-table-column prop="create_date" label="备份时间" width="200">
            <template slot-scope="scope">
              {{ scope.row.create_date | dateFormat }}
            </template>
          </el-table-column>
          <el-table-column prop="create_date" label="操作" width="160">
            <template slot-scope="scope">
              <el-button type="warning" size="mini" @click="dbRestore(scope.row)">恢复</el-button>
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
import { addBackup, getPage, dbRestore } from '../../api/system'
export default {
  name: 'SystemIndex',
  data() {
    return {
      backupText: '',
      backupButtonLoading: false,
      backupList: [],
      pageNum: 1,
      pageSize: 15,
      totalNum: 0
    }
  },
  mounted() {
    this.getAllBackupList()
  },
  filters: {
    dateFormat(value) {
      var d = new Date(value)
      return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()
    }
  },
  methods: {
    dbRestore(row) {
      dbRestore(row.backup_path).then(res => {
        this.$message.success(row.backup_text + ' 数据恢复成功')
      })
    },
    handleCurrentChangeOfFenye(va) {
      this.pageNum = va
      this.getAllBackupList()
    },
    addNewBackup() {
      this.backupButtonLoading = true
      addBackup({
        backupText: this.backupText
      }).then(res => {
        this.$message.success('备份成功！')
        this.backupButtonLoading = false
        this.getAllBackupList()
        this.backupText = ''
      })
    },
    getAllBackupList() {
      getPage(this.pageNum, this.pageSize).then(res => {
        this.backupList = res.data.rows
        this.totalNum = res.data.total
      })
    }
  }
}
</script>

<style scoped>

</style>
