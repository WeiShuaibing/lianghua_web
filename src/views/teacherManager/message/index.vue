<template>
  <div class="app-container">
    <!--<el-row>
      <el-col :span="5">
        <el-input v-model="matchStr" placeholder="请输入关键字搜索信息" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="searchMessage" />
        </el-input>
      </el-col>
    </el-row>-->
    <el-row style="margin-top: 20px;">
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="messageId" label="ID" width="100" />
        <el-table-column prop="stuName" label="留言" />
        <el-table-column prop="message" label="问题" />
        <el-table-column prop="reply" label="回复" />
        <el-table-column prop="createDate" label="创建时间" width="280" />
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="primary" size="small" icon="el-icon-edit" @click="reply(scope.row)">回复</el-button>
            <!--<el-popconfirm confirm-button-text="确认" cancel-button-text="不用了" icon="el-icon-info" icon-color="red" title="确定删除吗？" @onConfirm="deleteMessage(scope.row)">
              <el-button slot="reference" type="danger" size="small" icon="el-icon-delete">删除</el-button>
            </el-popconfirm>-->
          </template>
        </el-table-column>
      </el-table>
    </el-row>

    <!--回复对话框-->
    <el-dialog title="新增教师" :visible.sync="replyVisible">
      <div style="width: 80%;margin: 0 auto;">
        <el-row>
          <el-col :span="4"> <span style="line-height: 2">回复：</span></el-col>
          <el-col :span="18"><el-input v-model="replyMessage" type="textarea" :row="2" placeholder="请输入..." /></el-col>
        </el-row>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="replyVisible = false">取 消</el-button>
        <el-button type="primary" @click="shureReply">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getMyMessage } from '@/api/teacher'
import { teaReply } from '@/api/message'

export default {
  name: 'MessageIndex',
  data() {
    return {
      matchStr: '',
      tableData: [],
      replyMessage: '',
      replyId: '',
      replyVisible: false
    }
  },
  mounted() {
    this.getAll()
  },
  methods: {
    shureReply() {
      teaReply(this.replyId, this.replyMessage).then(res => {
        this.getAll()
        this.replyVisible = false
      })
    },
    getAll() {
      getMyMessage().then(res => {
        this.tableData = res.data
      })
    },
    searchMessage() {
    },
    reply(row) {
      this.replyId = row.messageId
      this.replyVisible = true
    },
    deleteMessage() {}
  }
}
</script>

<style scoped>

</style>
