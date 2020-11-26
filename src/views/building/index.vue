<template>
  <div style="width: 95%;margin: 0 auto;margin-top: 35px;">
    <el-row>
      <el-col :span="6">
        <el-input v-model="matchStr" placeholder="请输入关键词搜索">
          <el-button slot="append" icon="el-icon-search" @click="search" />
        </el-input>
      </el-col>
      <el-col :span="3" :offset="15">
        <el-button plain icon="el-icon-circle-plus-outline" type="primary" @click="addNewBuilding">添加房间</el-button>
      </el-col>
    </el-row>
    <el-row style="margin-top: 15px;">
      <el-table :data="buildingList" border style="width: 100%;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)">
        <el-table-column prop="id" label="ID" align="center" width="130"/>
        <el-table-column prop="buName" align="center" label="楼房" width="220"/>
        <el-table-column align="center" prop="buHome" label="房间"/>
        <el-table-column prop="buRemark" align="center" label="备注"/>
        <el-table-column prop="createDate" align="center" label="添加时间"/>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="primary" plain size="mini" @click="editAdmin(scope.row)">编辑</el-button>
            <el-button type="danger" plain size="mini" @click="delete(scope.row)">删除</el-button>
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

    <!--新增房间对话框-->
    <div>
      <el-dialog title="新增房间" :visible.sync="addBuildingDialogVisible" width="35%">
        <el-form :model="newBuilding">
          <el-form-item label="单元楼：" label-width="120px">
            <el-autocomplete popper-class="my-autocomplete" v-model="newBuilding.buName" :fetch-suggestions="querySearchBuildingName" placeholder="请输入单元楼" @select="handleBuNameSelect">
              <template slot-scope="{ item }">
                <div class="name">{{ item.buName }}</div>
              </template>
            </el-autocomplete>
          </el-form-item>
          <el-form-item label="房间号:" label-width="120px">
            <el-input v-model="newBuilding.buHome" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="房间备注:" label-width="120px">
            <el-input v-model="newBuilding.buRemark" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addBuildingDialogVisible = false">取 消</el-button>
          <el-button v-if="!isEdit" type="primary" @click="enshureAddBuilding">确 定</el-button>
          <el-button v-else type="success" @click="saveEdit">修 改</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { selectAllBuName, add, getPage, deleteById, update, search } from '@/api/building'
export default {
  name: 'BuildingIndex',
  data() {
    return {
      isEdit: false,
      buildingList: [],
      pageNum: 1,
      pageSize: 10,
      totalNum: 0,
      addBuildingDialogVisible: false,
      newBuilding: {
        buName: '',
        buHome: '',
        buRemark: ''
      },
      matchStr: ''
    }
  },
  mounted() {
    this.getAllBuilding()
  },
  methods: {
    search() {
      this.pageNum = 1
      search(this.pageNum, this.pageSize, this.matchStr).then(res => {
        this.buildingList = res.data.records
        this.totalNum = res.data.total
      })
    },
    saveEdit() {
      update(this.newBuilding).then(res => {
        this.$message.success('修改成功')
        this.addBuildingDialogVisible = false
        this.getAllBuilding()
        for (var i in this.newBuilding) {
          delete this.newBuilding[i]
        }
      })
    },
    editAdmin(row) {
      this.isEdit = true
      this.addBuildingDialogVisible = true
      this.newBuilding = row
    },
    delete(row) {
      this.$confirm('此操作将永久删除该房间信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteById(row.id).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getAllBuilding()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    enshureAddBuilding() {
      add(this.newBuilding).then(res => {
        this.$message.success('新增成功')
        this.addBuildingDialogVisible = false
        this.getAllBuilding()
        for (var i in this.newBuilding) {
          delete this.newBuilding[i]
        }
      })
    },
    getAllBuilding() {
      getPage(this.pageNum, this.pageSize).then(res => {
        this.buildingList = res.data.records
        this.totalNum = res.data.total
      })
    },
    addNewBuilding() {
      this.addBuildingDialogVisible = true
    },
    querySearchBuildingName(queryString, cb) {
      selectAllBuName().then(res => {
        var results = res.data ? res.data.filter(this.buildingNameFilter(queryString)) : res.data
        // 调用 callback 返回建议列表的数据
        cb(results)
      })
    },
    buildingNameFilter(queryString) {
      return (restaurant) => {
        return (restaurant.buName.indexOf(queryString) === 0 || restaurant.buName.indexOf(queryString) > 0)
      }
    },
    handleBuNameSelect(item) {
      this.newBuilding.buName = item.buName
    },
    handleCurrentChangeOfFenye(va) {
      this.pageNum = va
      this.getPageList()
    }
  }
}
</script>

<style scoped>

</style>
