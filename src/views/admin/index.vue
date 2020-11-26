<template>
  <div style="width: 95%;margin: 0 auto;margin-top: 15px;">
    <el-row>
      <el-col :span="4" v-if="roles==='admin'">
        <el-button plain icon="el-icon-circle-plus-outline" type="primary" @click="addNewAdmin">添加</el-button>
      </el-col>
      <el-col :span="6">
        <el-input v-model="matchStr" placeholder="请输入名字搜索">
          <el-button slot="append" icon="el-icon-search" @click="search" />
        </el-input>
      </el-col>
    </el-row>
    <el-row style="margin-top: 10px;">
      <el-table :data="adminList" border style="width: 100%;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)">
        <el-table-column prop="id" label="ID" align="center" width="130"/>
        <el-table-column prop="adminPhone" label="电话" align="center" width="220"/>
        <el-table-column align="center" prop="adminName" label="名字"/>
        <el-table-column prop="adminSex" align="center" label="性别"/>
        <el-table-column align="center" prop="adminAge" label="年龄"/>
        <el-table-column label="操作" align="center" v-if="roles==='admin'">
          <template slot-scope="scope">
            <el-button type="primary" plain size="mini" @click="editAdmin(scope.row)">编辑</el-button>
            <el-button type="danger" plain size="mini" @click="deleteAdmin(scope.row)">删除</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" v-else>
          <template slot-scope="scope">
            <el-button v-if="token==scope.row.id" type="primary" plain size="mini" @click="editAdmin(scope.row)">编辑</el-button>
            <el-button v-else plain size="mini" @click="editAdmin(scope.row)" disabled>编辑</el-button>
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
      <el-dialog
        title="新增管理员"
        :visible.sync="addAdminDialogVisible"
        width="45%"
      >
        <el-form :model="newAdmin" status-icon label-width="100px" class="demo-ruleForm">
          <el-form-item label="手机号">
            <el-input v-model="newAdmin.adminPhone" placeholder="请输入手机号，手机号即账号" auto-complete="off" />
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="newAdmin.adminPassword" placeholder="请输入密码" type="password" auto-complete="off" />
          </el-form-item>
          <el-form-item label="名字">
            <el-input v-model.number="newAdmin.adminName" placeholder="请输入名字" />
          </el-form-item>
          <el-form-item label="年龄">
            <el-input-number v-model="newAdmin.adminAge" :min="1" :max="100" />
          </el-form-item>
          <el-form-item label="性别">
            <el-select v-model="newAdmin.adminSex" placeholder="性别">
              <el-option label="男" value="男" />
              <el-option label="女" value="女" />
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addAdminDialogVisible = false">取 消</el-button>
          <el-button v-if="!isEdit" type="primary" @click="enshureAddAdmin">确 定</el-button>
          <el-button v-else type="success" @click="enshureUpdateAdmin">保 存</el-button>
        </span>
      </el-dialog>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { add, getPage, deleteById, getById, update, search } from '@/api/admin'
export default {
  name: 'AdminIndex',
  data() {
    return {
      isEdit: false,
      matchStr: '',
      adminList: [],
      pageNum: 1,
      pageSize: 10,
      totalNum: 0,
      addAdminDialogVisible: false,
      newAdmin: {
        adminPhone: '',
        adminPassword: '',
        adminName: '',
        adminAge: '',
        adminSex: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'roles',
      'token'
    ])
  },
  mounted() {
    console.log(this.roles, this.token, this.name)
    this.getPageList()
  },
  methods: {
    search() {
      this.pageNum = 1
      search(this.pageNum, this.pageSize, this.matchStr).then(res => {
        this.adminList = res.data.records
        this.totalNum = res.data.total
      })
    },
    handleCurrentChangeOfFenye(va) {
      this.pageNum = va
      this.getPageList()
    },
    enshureUpdateAdmin() {
      var A = Object.assign({}, this.newAdmin)
      if (A.adminPhone === '' || A.adminPassword === '' || A.adminName === '' ||
        A.adminAge === '' || A.adminSex === '') {
        this.$message.error('请完善信息')
        return
      }
      if (A.adminPhone.length !== 11) {
        this.$message.error('手机号/账号应为11位')
        return
      }
      if (A.adminPassword.length < 6) {
        this.$message.error('密码长度太短了，最少6位')
        return
      }
      A.adminPassword = this.$md5(A.adminPassword)
      this.$md5(this.newAdmin.adminPassword)
      update(A).then(res => {
        this.$message.success('新增成功')
        this.addAdminDialogVisible = false
        this.getPageList()
        for (var k in this.newAdmin) {
          delete this.newAdmin[k]
        }
      })
    },
    enshureAddAdmin() {
      var A = Object.assign({}, this.newAdmin)
      if (A.adminPhone === '' || A.adminPassword === '' || A.adminName === '' ||
        A.adminAge === '' || A.adminSex === '') {
        this.$message.error('请完善信息')
        return
      }
      if (A.adminPhone.length !== 11) {
        this.$message.error('手机号/账号应为11位')
        return
      }
      if (A.adminPassword.length < 6) {
        this.$message.error('密码长度太短了，最少6位')
        return
      }
      A.adminPassword = this.$md5(A.adminPassword)
      this.$md5(this.newAdmin.adminPassword)
      add(A).then(res => {
        this.$message.success('新增成功')
        this.addAdminDialogVisible = false
        this.getPageList()
        for (var k in this.newAdmin) {
          delete this.newAdmin[k]
        }
      })
    },
    addNewAdmin() {
      this.addAdminDialogVisible = true
    },
    getPageList() {
      getPage(this.pageNum, this.pageSize).then(res => {
        this.adminList = res.data.records
        this.totalNum = res.data.total
      })
    },
    editAdmin(row) {
      this.isEdit = true
      getById(row.id).then(res => {
        this.addAdminDialogVisible = true
        this.newAdmin = res.data
      })
    },
    deleteAdmin(row) {
      this.$confirm('此操作将永久删除该管理员, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteById(row.id).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getPageList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
