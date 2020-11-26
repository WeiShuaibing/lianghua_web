<template>
  <div style="width: 95%;margin: 20px;">
    <el-row>
      <el-col :span="8">
        <label>筛选:&nbsp;&nbsp;&nbsp;</label>
        <el-radio-group v-model="payorderType" @change="payTypeChange" size="medium">
          <el-radio-button label="1">物业费</el-radio-button>
          <el-radio-button label="2" >停车费</el-radio-button>
          <el-radio-button label="3" >水费</el-radio-button>
          <el-radio-button label="4" >电费</el-radio-button>
        </el-radio-group>
      </el-col>
      <el-col :span="4" :offset="12">
        <el-button plain icon="el-icon-circle-plus-outline" type="primary" @click="newPayOrder">新建缴费单</el-button>
      </el-col>
    </el-row>
    <el-row style="margin-top: 15px">
      <el-table v-loading="loading" :data="orderList" border style="width: 100%;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)">
        <el-table-column prop="id" label="ID" align="center" width="60" />
        <el-table-column label="类型" align="center" width="100">
          <template slot-scope="scope">
             {{scope.row.pay_type | typeFilter}}
          </template>
        </el-table-column>
        <el-table-column prop="pay_text" label="缴费描述" align="center" width="300" />
        <el-table-column prop="pay_money" label="应缴金额" align="center" width="80" />
        <el-table-column prop="user_name" label="用户" align="center" width="90" />
        <el-table-column label="截止时间" align="center" width="140">
          <template slot-scope="scope">
            {{scope.row.pay_enddate | dateFormat}}
          </template>
        </el-table-column>
        <el-table-column prop="payrecord_status" label="缴费状态" width="100" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.payrecord_status === 1" type="success">已缴费</el-tag>
            <el-tag v-if="scope.row.payrecord_status === 2" type="danger">未缴费</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="pay_remark" label="备注" align="center" />
        <el-table-column label="操作" align="center" width="160">
          <template slot-scope="scope">
            <el-button v-if="scope.row.payrecord_status !== 1" type="warning" plain size="mini" @click="editPayorder(scope.row)">编辑
            </el-button>
            <el-button style="margin-top: 5px;" type="danger" plain size="mini" @click="deletePayorder(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row>
      <div style="height: 40px;" />
      <el-pagination
        background
        style="margin-bottom: 100px;"
        :current-page="pageNum"
        :page-size="pageSize"
        :total="totalNum"
        layout="total, prev, pager, next, jumper"
        @current-change="handleCurrentChangeOfFenye"/>
    </el-row>

    <div>
      <el-dialog title="新建缴费单" :visible.sync="addPayDialogVisible" width="45%">
        <el-form :model="payOrder" status-icon label-width="100px" class="demo-ruleForm">
          <el-form-item label="类型">
            <el-select v-model="payOrder.payType" placeholder="请选择">
              <el-option value="1" label="物业费"></el-option>
              <el-option value="2" label="停车费"></el-option>
              <el-option label="水费" value="3"></el-option>
              <el-option label="电费" value="4"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="指定用户">
            <el-autocomplete v-model="selectUser" style="line-height: normal;padding: 7px;" :fetch-suggestions="querySearchMatchUser" placeholder="请输入用户" @select="handleUserSelect">
              <template slot-scope="{ item }">
                <div>
                  <span>{{ item.userName }}&nbsp;&nbsp;&nbsp;</span>
                  <span style="color: #b4b4b4;font-size: 12px;text-align: right">{{ item.userPhone }}</span>
                </div>
              </template>
            </el-autocomplete>
          </el-form-item>
          <el-form-item label="缴费描述">
            <el-input type="textarea" v-model="payOrder.payText" placeholder="请输入关于缴费的描述信息..." auto-complete="off" />
          </el-form-item>
          <el-form-item label="应缴金额">
            <el-input-number v-model="payOrder.payMoney" :precision="2" :step="0.1" :max="100000"></el-input-number>
          </el-form-item>
          <el-form-item label="截止时间">
            <el-date-picker v-model="payOrder.payEnddate" type="date" placeholder="截止日期" format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="payOrder.payRemark" placeholder="请输入备注信息" type="textarea" auto-complete="off" />
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancleAdd">取 消</el-button>
          <el-button v-if="!isEdit" type="primary" @click="enshureAddPay">确 定</el-button>
          <el-button v-else type="success" @click="enshureUpdatePay">保 存</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { add, getPage, deleteById, update } from '../../api/payorder'
import { searchByName } from '../../api/user'
export default {
  name: 'RepairIndex',
  data() {
    return {
      isEdit: false,
      loading: false,
      addPayDialogVisible: false,
      pageNum: 1,
      pageSize: 10,
      totalNum: 0,
      payOrder: {
        userId: '',
        payType: '',
        payText: '',
        payEnddate: '',
        payRemark: '',
        payMoney: ''
      },
      orderList: [],
      payorderType: 1,
      editPayType: '',
      selectUser: ''
    }
  },
  filters: {
    typeFilter(v) {
      if (v === 1) return '物业费'
      if (v === 2) return '停车费'
      if (v === 3) return '水费'
      if (v === 4) return '电费'
    },
    dateFormat(value) {
      var d = new Date(value)
      return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
    }
  },
  mounted() {
    this.getPage()
  },
  methods: {
    handleUserSelect(item) {
      this.selectUser = item.userName
      this.payOrder.userId = item.id
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
    cancleAdd() {
      this.addPayDialogVisible = false
      this.isEdit = false
    },
    editPayorder(row) {
      this.isEdit = true
      this.addPayDialogVisible = true
      this.payOrder.id = row.id
      this.payOrder.payType = row.payType
      this.payOrder.payText = row.payText
      this.payOrder.payText = row.payText
      this.payOrder.payEnddate = row.payEnddate
      this.payOrder.payRemark = row.payRemark
      this.payOrder.payMoney = row.payMoney
    },
    deletePayorder(row) {
      this.$confirm('此操作将永久删除该订单信息, 是否继续?', '提示', {
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
    payTypeChange(v) {
      this.payorderType = v
      this.getPage()
    },
    getPage() {
      this.loading = true
      getPage(this.pageNum, this.pageSize, this.payorderType).then(res => {
        this.orderList = res.data.rows
        this.totalNum = res.data.total
        this.loading = false
      })
    },
    newPayOrder() {
      this.addPayDialogVisible = true
    },
    enshureAddPay() {
      if (this.payOrder.userId === '' || this.payOrder.payType === '' || this.payOrder.payText === '' || this.payOrder.payEnddate === '' || this.payOrder.payRemark === '' || this.payOrder.payMoney === '') {
        this.$message.info('请完善信息')
        return
      }
      add(this.payOrder).then(res => {
        this.$message.success('添加成功！')
        this.addPayDialogVisible = false
        this.payOrder.payType = ''
        this.payOrder.payText = ''
        this.payOrder.payEnddate = ''
        this.payOrder.payRemark = ''
        this.payOrder.payMoney = ''
      })
    },
    enshureUpdatePay() {
      update(this.payOrder).then(res => {
        this.$message.success('修改成功！')
        this.addPayDialogVisible = false
        for (var k in this.payOrder) {
          this.payOrder[k] = ''
        }
        this.getPage()
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
