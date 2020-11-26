<template>
  <div style="width: 95%;margin: 20px;">
    <el-row>
      <el-col :span="4">
        <el-button plain icon="el-icon-circle-plus-outline" type="primary" @click="addNewCar">添加</el-button>
      </el-col>
      <el-col :span="6">
        <el-radio-group v-model="carStatus" @change="carStatusChange" size="medium">
          <el-radio-button label="1" >已分配</el-radio-button>
          <el-radio-button label="2" >未分配</el-radio-button>
        </el-radio-group>
      </el-col>
    </el-row>

    <el-row style="margin: 15px;">
      <el-table v-loading="loading" :data="carList" border style="width: 100%;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)">
        <el-table-column prop="id" label="ID" align="center" width="60" />
        <el-table-column prop="user_name" label="所属用户" align="center" width="100" />
        <el-table-column prop="car_addr" label="位置" align="center" width="300" />
        <el-table-column prop="car_long" label="长度(m)" align="center" width="80" />
        <el-table-column prop="car_width" label="宽度(m)" align="center" width="80" />
        <el-table-column prop="car_remark" label="备注" align="center" />
        <el-table-column label="操作" align="center" width="160">
          <template slot-scope="scope">
            <el-button type="warning" plain size="mini" @click="editCar(scope.row)">编辑
            </el-button>
            <el-button style="margin-top: 5px;" type="danger" plain size="mini" @click="deleteCar(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>

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

    <!--对话框-->
    <div>
      <el-dialog title="新增车位" :visible.sync="addCarPostionDialogVisible" width="45%">
        <el-form :model="newCar" status-icon label-width="100px" class="demo-ruleForm">
          <el-form-item label="所属用户">
            <el-autocomplete
              v-model="selectUser"
              style="line-height: normal;padding: 7px;"
              :fetch-suggestions="querySearchMatchUser"
              placeholder="请输入用户"
              @select="handleUserSelect"
            >
              <template slot-scope="{ item }">
                <div>
                  <span>{{ item.userName }}&nbsp;&nbsp;&nbsp;</span>
                  <span style="color: #b4b4b4;font-size: 12px;text-align: right">{{ item.userPhone }}</span>
                </div>
              </template>
            </el-autocomplete>
          </el-form-item>
          <el-form-item label="长">
            <el-input-number v-model="newCar.carLong" :precision="2" :step="0.1" :max="10"></el-input-number>
          </el-form-item>
          <el-form-item label="宽">
            <el-input-number v-model="newCar.carWidth" :precision="2" :step="0.1" :max="10"></el-input-number>
          </el-form-item>
          <el-form-item label="位置">
            <el-input placeholder="请输入停车位位置..." v-model="newCar.carAddr"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input type="textarea" :rows="2" placeholder="请输入备注信息..." v-model="newCar.carRemark"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addCarPostionDialogVisible = false">取 消</el-button>
          <el-button v-if="!isEdit" type="primary" @click="enshureAddCar">确 定</el-button>
          <el-button v-else type="success" @click="enshureUpdateCar">保 存</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { searchByName } from '../../api/user'
import { add, getPage, deleteById, update } from '../../api/car'
export default {
  name: 'CarPositionIndex',
  data() {
    return {
      loading: false,
      isEdit: false,
      pageNum: 1,
      pageSize: 10,
      totalNum: 0,
      addCarPostionDialogVisible: false,
      newCar: {
        userId: '',
        carLong: 3,
        carWidth: 2,
        carRemark: '',
        carAddr: ''
      },
      timeout: null,
      selectUser: '',
      carList: [],
      carStatus: 1
    }
  },
  mounted() {
    this.getPage()
  },
  methods: {
    carStatusChange(v) {
      this.carStatus = v
      this.getPage()
    },
    editCar(row) {
      this.isEdit = true
      this.addCarPostionDialogVisible = true
      this.selectUser = row.user_name
      this.newCar.id = row.id
      this.newCar.userId = row.user_id
      this.newCar.carLong = row.car_long
      this.newCar.carWidth = row.car_width
      this.newCar.carAddr = row.car_addr
      this.newCar.carRemark = row.car_remark
    },
    deleteCar(row) {
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
    getPage() {
      this.loading = true
      getPage(this.pageNum, this.pageSize, this.carStatus).then(res => {
        this.carList = res.data.rows
        this.totalNum = res.data.total
        this.loading = false
      })
    },
    handleUserSelect(item) {
      console.log(item)
      this.selectUser = item.userName
      this.newCar.userId = item.id
    },
    querySearchMatchUser(queryString, cb) {
      if (queryString === '') {
        return
      }
      searchByName(queryString).then(res => {
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(res.data)
        }, 1000)
      })
    },
    addNewCar() {
      this.addCarPostionDialogVisible = true
    },
    enshureAddCar() {
      if (this.newCar.carRemark === '') {
        this.$message.info('请完善信息！')
      }
      add(this.newCar).then(res => {
        this.$message.success('添加成功！')
        this.addCarPostionDialogVisible = false
        this.newCar.userId = ''
        this.newCar.carLong = 3
        this.newCar.carWidth = 2
        this.newCar.carRemark = ''
        this.newCar.carAddr = ''
        this.getPage()
      })
    },
    enshureUpdateCar() {
      update(this.newCar).then(res => {
        this.$message.success('修改成功！')
        this.addCarPostionDialogVisible = false
        this.getPage()
        for (var k in this.newCar) {
          this.newCar[k] = ''
        }
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
