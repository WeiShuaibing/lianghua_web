<template>
  <div class="app-container">
    <el-row>
      <el-col :span="4">
        <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addNew">添加</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="scoringId" label="ID" width="280"/>
        <el-table-column prop="title" label="内容" />
        <el-table-column prop="createDate" label="创建时间" width="280" />
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="primary" size="small" icon="el-icon-edit" @click="editScoring(scope.row)">编辑</el-button>
            <el-popconfirm confirm-button-text='确认' cancel-button-text='不用了' icon="el-icon-info" icon-color="red" title="确定删除吗？" @onConfirm="deleteScoring(scope.row.scoringId)">
              <el-button type="danger" size="small" icon="el-icon-delete" slot="reference">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-row>

    <!--新增对话框-->
    <div>
      <el-dialog title="新增计分项" :visible.sync="addVisible">
        <div style="width: 80%;margin: 0 auto;">
          <el-input type="textarea" autosize placeholder="请输入内容" v-model="scoring.title" :rows="2"></el-input>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addVisible = false">取 消</el-button>
          <el-button v-if="!isEdit" type="primary" @click="saveNewScoring">保存</el-button>
          <el-button v-if="isEdit" type="primary" @click="enshureEdit">更新</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { save, getAll, deleteById } from '../../api/scoring'
export default {
  name: 'ScoringIndex',
  data() {
    return {
      tableData: [],
      isEdit: false,
      addVisible: false,
      scoring: {
        scoringId: 0,
        title: ''
      }
    }
  },
  mounted() {
    this.all()
  },
  methods: {
    addNew() {
      this.addVisible = true
    },
    enshureEdit() {
      this.saveNewScoring()
      this.isEdit = false
    },
    editScoring(row) {
      this.isEdit = true
      this.addVisible = true
      this.scoring = row
    },
    saveNewScoring() {
      save(this.scoring).then(res => {
        this.scoring.scoringId = 0
        this.scoring.title = ''
        this.addVisible = false
        this.all()
      })
    },
    all() {
      getAll().then(res => {
        this.tableData = res.data
      })
    },
    deleteScoring(id) {
      deleteById(id).then(res => {
        this.all() // 删除数据后重新加载页面的数据
      })
    }
  }
}
</script>

<style scoped>

</style>
