<template>
  <div style="width: 95%;margin: 0 auto;margin-top: 15px;">
    <el-row>
      <el-col :span="4">
        <el-button plain icon="el-icon-circle-plus-outline" type="primary" @click="addNewNotice">添加</el-button>
      </el-col>
      <el-col :span="6">
        <el-input v-model="matchStr" placeholder="请输入关键词搜索">
          <el-button slot="append" icon="el-icon-search" @click="search" />
        </el-input>
      </el-col>
    </el-row>
    <el-row style="margin-top: 10px;">
      <el-table
        :data="noticeList"
        border
        style="width: 100%;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)"
      >
        <el-table-column prop="id" label="ID" align="center" width="90" />
        <el-table-column prop="noText" label="公告" align="center" />
        <el-table-column prop="noEnddate" label="截止时间" align="center" width="130" />
        <el-table-column prop="createDate" label="创建时间" align="center" width="130" />
        <el-table-column label="操作" align="center" width="150">
          <template slot-scope="scope">
            <el-button type="primary" plain size="mini" @click="editNotice(scope.row)">编辑</el-button>
            <el-button type="danger" plain size="mini" @click="deleteNotice(scope.row)">删除</el-button>
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

    <!--对话框 新增管理员-->
    <div>
      <el-dialog title="新增公告" :visible.sync="addNoticeDialogVisible" width="50%">
        <el-form :model="newNotice" status-icon label-width="100px" class="demo-ruleForm">
          <el-form-item label="公告">
            <el-input v-model="newNotice.noText" type="textarea" placeholder="请输入公告" auto-complete="off" />
          </el-form-item>
          <el-form-item label="截止时间">
            <el-date-picker value-format="yyyy-MM-dd" v-model="newNotice.noEnddate" type="date" placeholder="选择日期" />
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addNoticeDialogVisible = false">取 消</el-button>
          <el-button v-if="!isEdit" type="primary" @click="enshureAddNewNotice">确 定</el-button>
          <el-button v-else type="success" @click="enshureUpdateNotice">保 存</el-button>
        </span>
      </el-dialog>
    </div>

  </div>
</template>

<script>
import { add, getPage, deleteById, search, update } from '@/api/notice'
export default {
  name: 'GongGaoIndex',
  data() {
    return {
      isEdit: false,
      noticeList: [],
      addNoticeDialogVisible: false,
      pageNum: 1,
      pageSize: 10,
      totalNum: 0,
      newNotice: {
        noText: '',
        noEnddate: ''
      },
      matchStr: ''
    }
  },
  mounted() {
    this.getPage()
  },
  methods: {
    search() {
      this.pageNum = 1
      search(this.pageNum, this.pageSize, this.matchStr).then(res => {
        this.noticeList = res.data.records
        this.totalNum = res.data.total
      })
    },
    enshureUpdateNotice() {
      this.isEdit = false
      update(this.newNotice).then(res => {
        this.addNoticeDialogVisible = false
        this.getPage()
        for (var k in this.newNotice) {
          this.newNotice[k] = ''
        }
      })
    },
    enshureAddNewNotice() {
      if (this.newNotice.noText === '' || this.newNotice.noEnddate === '') {
        this.$message.info('请完善信息')
        return
      }
      add(this.newNotice).then(res => {
        this.$message.success('新增成功！')
        this.addNoticeDialogVisible = false
        this.getPage()
        for (var k in this.newNotice) {
          this.newNotice[k] = ''
        }
      })
    },
    getPage() {
      getPage(this.pageNum, this.pageSize).then(res => {
        this.noticeList = res.data.records
        this.totalNum = res.data.total
      })
    },
    addNewNotice() {
      this.addNoticeDialogVisible = true
    },
    editNotice(row) {
      this.isEdit = true
      this.addNoticeDialogVisible = true
      this.newNotice = row
    },
    deleteNotice(row) {
      this.$confirm('此操作将永久删除该公告, 是否继续?', '提示', {
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
    handleCurrentChangeOfFenye(va) {
      this.pageNum = va
      this.getPage()
    }
  }
}
</script>

<style scoped>

</style>
