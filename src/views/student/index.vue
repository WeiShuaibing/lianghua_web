<template>
  <div class="app-container">
    <el-row>
      <el-col :span="2">
        <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addNew">添加</el-button>
      </el-col>
      <el-col :span="2">
        <el-upload
          class="upload"
          :show-file-list="false"
          action=""
          :multiple="false"
          accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          :before-upload="batchImport"
          :limit="1"
        >
          <el-button type="success" icon="el-icon-upload2">上传</el-button>
        </el-upload>
      </el-col>
      <el-col :span="2">
        <!--        <el-button type="warning" icon="el-icon-download" @click="exportData">导出</el-button>-->
        <xlsx-workbook>
          <xlsx-sheet
            v-for="sheet in sheets"
            :key="sheet.name"
            :collection="tableData"
            :sheet-name="sheet.name"
          />
          <xlsx-download>
            <el-button type="warning" icon="el-icon-download">导出</el-button>
          </xlsx-download>
        </xlsx-workbook>
      </el-col>
      <el-col :span="6">
        <el-input v-model="matchStr" placeholder="请输入关键字搜索学生" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="searchStudent" />
        </el-input>
      </el-col>
    </el-row>
    <el-row style="margin-top: 20px;">
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="stuId" label="ID" width="100" />
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="className" label="所属班级" />
        <el-table-column prop="age" label="年龄" />
        <el-table-column prop="sex" label="性别" />
        <el-table-column prop="remark" label="备注" />
        <el-table-column prop="createDate" label="创建时间" width="280" />
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="primary" size="small" icon="el-icon-edit" @click="editStudent(scope.row)">编辑</el-button>
            <el-popconfirm confirm-button-text="确认" cancel-button-text="不用了" icon="el-icon-info" icon-color="red" title="确定删除吗？" @onConfirm="deleteStudent(scope.row.stuId)">
              <el-button slot="reference" type="danger" size="small" icon="el-icon-delete">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-row>

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

    <!--新增对话框-->
    <div>
      <el-dialog title="新增学生" :visible.sync="addVisible">
        <div style="width: 80%;margin: 0 auto;">
          <el-row>
            <el-col :span="4"> <span style="line-height: 2">姓名：</span></el-col>
            <el-col :span="18"><el-input v-model="student.name" placeholder="请输入..." /></el-col>
          </el-row>
          <el-row style="margin-top: 20px;">
            <el-col :span="4"> <span style="line-height: 2">年龄：</span></el-col>
            <el-col :span="18">
              <el-select v-model="student.age" placeholder="请选择">
                <el-option v-for="item in 90" :key="item" :label="item + 10" :value="item + 10" />
                <el-option label="女" value="女" />
              </el-select>
            </el-col>
          </el-row>
          <el-row style="margin-top: 20px;">
            <el-col :span="4"> <span style="line-height: 2">性别：</span></el-col>
            <el-col :span="18">
              <el-select v-model="student.sex" placeholder="请选择">
                <el-option label="男" value="男" />
                <el-option label="女" value="女" />
              </el-select>
            </el-col>
          </el-row>
          <el-row style="margin-top: 20px;">
            <el-col :span="4"> <span style="line-height: 2">备注：</span></el-col>
            <el-col :span="18"><el-input v-model="student.remark" type="textarea" :rows="2" placeholder="请输入..." /></el-col>
          </el-row>
          <el-row style="margin-top: 20px;">
            <el-col :span="4"> <span style="line-height: 2">班级：</span></el-col>
            <el-col :span="18">
              <el-select v-model="student.classId" placeholder="请选择班级">
                <el-option v-for="item in allClass" :key="item.classId" :label="item.name" :value="item.classId" />
              </el-select>
            </el-col>
          </el-row>

        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addVisible = false">取 消</el-button>
          <el-button v-if="!isEdit" type="primary" @click="saveNewStudent">保存</el-button>
          <el-button v-if="isEdit" type="primary" @click="enshureEdit">更新</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getAllClass } from '@/api/class'
import { saveStudent, getPageOfStudent, deleteById, saveBatchStudent } from '@/api/student'
import XLSX from 'xlsx'
import { XlsxDownload, XlsxWorkbook, XlsxSheet } from 'vue-xlsx'
export default {
  name: 'StudentIndex',
  components: { XlsxDownload, XlsxWorkbook, XlsxSheet },
  data() {
    return {
      sheetName: null,
      sheets: [{ name: '学生信息', data: [{ c: 2 }] }],
      tableData: [],
      allClass: [],
      allCourseOfClass: [],
      addVisible: false,
      isEdit: false,
      matchStr: '',
      student: {
        name: '',
        age: null,
        sex: '男',
        remark: '',
        classId: null,
        className: ''
      },
      pageNum: 1,
      pageSize: 10,
      totalNum: 0
    }
  },
  mounted() {
    this.getPage()
    this.getAllClassData()
  },
  methods: {
    exportData(wb) {
      console.log(wb)
    },
    batchImport(file) {
      var _this = this
      _this.file2Xce(file).then(item => {
        if (item && item.length > 0) {
          // xlsxJson就是解析出来的json数据,数据格式如下
          if (item[0] && item[0].sheet && item[0].sheet.length) {
            console.log(item[0].sheet) // 这是最终解析的数据
            saveBatchStudent(item[0].sheet).then(res => {
              console.log(res)
              if (res.code === 20000) {
                _this.$message.success('数据导入成功！')
                _this.getPage()
              }
            })
          }
        }
      })
      return false //  取消默认上传
    },
    searchStudent() {
      this.getPage()
    },
    editStudent(row) {
      this.addVisible = true
      this.isEdit = true
      this.student = row
    },
    enshureEdit() {
      saveStudent(this.student).then(res => {
        this.addVisible = false
        this.isEdit = false
        // 清空填写的属性值
        /* this.student.name = ''
        this.student.age = null
        this.student.sex = ''
        this.student.remark = ''
        this.student.classId = null
        this.student.className = ''*/
      })
    },
    deleteStudent(id) {
      deleteById(id).then(res => {
        console.log(res)
        this.getPage()
      })
    },
    handleCurrentChangeOfFenye(va) {
      this.pageNum = va
      this.getPage()
    },
    addNew() {
      this.addVisible = true
    },
    saveNewStudent() {
      if (this.student.name === '' || this.student.age === null || this.student.sex === '' ||
      this.student.classId === null) {
        this.$message.warning('请完善相关信息！')
        return
      }
      saveStudent(this.student).then(res => {
        this.addVisible = false
        this.getPage()
      })
    },
    getPage() {
      getPageOfStudent(this.pageNum, this.pageSize, this.matchStr).then(res => {
        this.tableData = res.data.records
        this.totalNum = res.data.total
      })
    },
    getAllClassData() {
      getAllClass().then(res => {
        this.allClass = res.data
      })
    },
    /**
     * 解析文件
     * @param {Object} file
     */
    file2Xce(file) {
      return new Promise(function(resolve, reject) {
        const reader = new FileReader()
        reader.onload = function(e) {
          const data = e.target.result
          this.wb = XLSX.read(data, {
            type: 'binary'
          })
          const result = []
          this.wb.SheetNames.forEach(sheetName => {
            result.push({
              sheetName: sheetName,
              sheet: XLSX.utils.sheet_to_json(this.wb.Sheets[sheetName])
            })
          })
          /* console.log("解析")
          console.log(result) */
          resolve(result)
        }
        reader.readAsBinaryString(file)
      })
    }
  }
}
</script>

<style scoped>

</style>
