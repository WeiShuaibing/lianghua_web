<template>
  <div class="app-container">
    <el-row>
      <el-col :span="5">
        <el-input v-model="matchStr" placeholder="请输入关键字搜索信息" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="searchMessage" />
        </el-input>
      </el-col>
    </el-row>
    <el-row style="margin-top: 20px;">
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="messageID" label="ID" width="100" />
        <el-table-column prop="stuName" label="提问者" />
        <el-table-column prop="message" label="问题" />
        <el-table-column prop="reply" label="回复" />
        <el-table-column prop="createDate" label="创建时间" width="280" />
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="primary" size="small" icon="el-icon-edit" @click="reply(scope.row)">编辑</el-button>
            <el-popconfirm confirm-button-text="确认" cancel-button-text="不用了" icon="el-icon-info" icon-color="red" title="确定删除吗？" @onConfirm="deleteMessage(scope.row)">
              <el-button slot="reference" type="danger" size="small" icon="el-icon-delete">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'MessageIndex',
  data() {
    return {
      matchStr: '',
      tableData: []
    }
  },
  mounted() {
  },
  methods: {
    searchMessage() {
    },
    reply() {},
    deleteMessage() {}
  }
}
</script>

<style scoped>

</style>
