<template>
  <div style="width: 95%;margin: 0 auto;margin-top: 15px;">
    <el-row>
      <el-col :span="4">
        <el-button plain icon="el-icon-circle-plus-outline" type="primary" @click="addNewUser">添加</el-button>
      </el-col>
      <el-col :span="6">
        <el-input v-model="matchStr" placeholder="请输入名字搜索">
          <el-button slot="append" icon="el-icon-search" @click="search" />
        </el-input>
      </el-col>
    </el-row>
    <el-row style="margin-top: 10px;">
      <el-table
        :data="userList"
        border
        style="width: 100%;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)"
      >
        <el-table-column prop="id" label="ID" align="center" width="90" />
        <el-table-column prop="user_name" label="名字" align="center" width="130" />
        <el-table-column prop="user_phone" label="电话" align="center" width="130" />
        <el-table-column prop="bu_name" label="楼房" align="center" width="130" />
        <el-table-column prop="bu_home" label="房间号" align="center" width="130" />
        <el-table-column prop="user_sex" label="性别" align="center" width="130" />
        <el-table-column prop="user_age" label="年龄" align="center" width="130" />
        <el-table-column prop="user_remark" label="备注" align="center" />
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="primary" plain size="mini" @click="editUser(scope.row)">编辑</el-button>
            <el-button type="danger" plain size="mini" @click="deleteUser(scope.row)">删除</el-button>
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
        :visible.sync="addUserDialogVisible"
        width="45%"
      >
        <el-form :model="newUser" status-icon label-width="100px" class="demo-ruleForm">
          <el-form-item label="所属楼房">
            <el-cascader v-model="editBuName" :options="buildingFormat" clearable @change="handleChangeOfBuilding" />
          </el-form-item>
          <el-form-item label="名字">
            <el-input v-model="newUser.userName" placeholder="请输入用户名字" auto-complete="off" />
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="newUser.userPhone" placeholder="请输入手机号，手机号即账号" auto-complete="off" />
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="newUser.userPassword" placeholder="请输入密码" type="password" auto-complete="off" />
          </el-form-item>
          <el-form-item label="年龄">
            <el-input-number v-model="newUser.userAge" :min="0" :max="100" />
          </el-form-item>
          <el-form-item label="性别">
            <el-select v-model="newUser.userSex" placeholder="性别">
              <el-option label="男" value="男" />
              <el-option label="女" value="女" />
            </el-select>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="newUser.userRemark" placeholder="请输入备注信息" type="textarea" auto-complete="off" />
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addUserDialogVisible = false">取 消</el-button>
          <el-button v-if="!isEdit" type="primary" @click="enshureAddUser">确 定</el-button>
          <el-button v-else type="success" @click="enshureUpdateUser">保 存</el-button>
        </span>
      </el-dialog>
    </div>

  </div>
</template>

<script>
import { add, getPage, deleteById, update, search } from '@/api/user'
import { getHomeFormat } from '@/api/building'
export default {
  name: 'WebuserIndex',
  data() {
    return {
      isEdit: false,
      matchStr: '',
      userList: [],
      buildingFormat: [],
      pageNum: 1,
      pageSize: 10,
      totalNum: 0,
      addUserDialogVisible: false,
      editBuName: '',
      newUser: {
        buId: 0,
        userName: '',
        userPhone: '',
        userPassword: '',
        userAge: '',
        userSex: '',
        userRemark: ''
      }
    }
  },
  mounted() {
    this.getHomeFormat()
    this.getPage()
  },
  methods: {
    handleCurrentChangeOfFenye(va) {
      this.pageNum = va
      this.getPage()
    },
    search() {
      this.pageNum = 1
      search(this.pageNum, this.pageSize, this.matchStr).then(res => {
        this.userList = res.data.rows
        this.totalNum = res.data.total
      })
    },
    editUser(row) {
      this.isEdit = true
      this.addUserDialogVisible = true
      this.editBuName = [row.bu_name, row.bu_id]
      this.newUser.buId = row.bu_id
      this.newUser.userName = row.user_name
      this.newUser.userPhone = row.user_phone
      this.newUser.userPassword = ''
      this.newUser.userAge = row.user_age
      this.newUser.userSex = row.user_sex
      this.newUser.userRemark = row.user_remark
      this.newUser.id = row.id
    },
    deleteUser(row) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
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
    getPage() {
      getPage(this.pageNum, this.pageSize).then(res => {
        this.userList = res.data.rows
        this.totalNum = res.data.total
      })
    },
    enshureUpdateUser() {
      for (var k in this.newUser) {
        if (this.newUser[k] === '') {
          this.$message.info('请完善信息！')
          return
        }
      }
      this.newUser.userPassword = this.$md5(this.newUser.userPassword)
      update(this.newUser).then(res => {
        this.$message.success('修改成功！')
        this.addUserDialogVisible = false
        this.isEdit = false
        for (var k in this.newUser) {
          this.newUser[k] = ''
        }
        this.getPage()
      })
    },
    enshureAddUser() {
      if (!this.newUser.buId || !this.newUser.userName || !this.newUser.userPhone || !this.newUser.userPassword ||
        !this.newUser.userAge || !this.newUser.userSex) {
        this.$message.info('请完善信息！')
        console.log(this.newUser)
        return
      }
      this.newUser.userPassword = this.$md5(this.newUser.userPassword)
      add(this.newUser).then(res => {
        this.$message.success('添加成功')
        this.addUserDialogVisible = false
        for (var k in this.newUser) {
          this.newUser[k] = ''
        }
        this.getPage()
      })
    },
    addNewUser() {
      this.addUserDialogVisible = true
    },
    getHomeFormat() {
      getHomeFormat().then(res => {
        this.buildingFormat = res.data
      })
    },
    handleChangeOfBuilding(value) {
      this.newUser.buId = value[1]
    }
  }
}
</script>

<style scoped>

</style>
