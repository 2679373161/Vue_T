<template>
  <div>
    <div class="search" align="center" style="margin-top:20px; margin-bottom:20px;inline-block">
       <el-form ref="form" class="ItemInfo" :model="equipment_info" label-width="80px" :inline="true">
      <span>设备管理查询筛选项：</span>
      <span>地区：</span>
      <el-cascader
        ref="cascaderAddr1"
        :options="options"
        v-model="value"
        :props="{ checkStrictly: true }"
        style="width:200px"
        @change="handleChange"
        clearable
        filterable></el-cascader>
      <span>型号：</span>
      <el-autocomplete v-model="value2" placeholder="请输入型号" style="width:150px" clearable class="inline-input"
      :fetch-suggestions="querySearch" :trigger-on-focus="false" @change="handleSelect" @select="handleSelect" select-when-unmatched="true"></el-autocomplete>
      <span>设备：</span>
      <el-autocomplete v-model="value3" placeholder="请输入设备号" style="width:150px" clearable class="inline-input"
      :fetch-suggestions="querySearch1" :trigger-on-focus="false"></el-autocomplete>
      <el-button type="primary" @click="search" style="margin-left:20px;">查询</el-button>
<el-form-item class="ItemInfoTime" style="margin-left:10px;">
  <download-excel
      :fields = "json_fields"
      :data="tableData"
      :before-generate = "startDownload"
      :before-finish = "finishDownload"
      name="listdata.xls"
      type="xls">
      <el-button>导出Excel</el-button>
    </download-excel>
</el-form-item>
      <el-radio-group v-model="checkAll" size="small" style="margin-left:20px;width:200px;margin-right:0px;" @change="tankuang()">
      <el-radio-button label="自选"></el-radio-button>
      <el-radio-button label="全选"></el-radio-button>
      <el-radio-button label="全不选"></el-radio-button>
      </el-radio-group>

      <span style="margin-left:20px">迁移选项：</span>
     <el-radio-group v-model="checkList" style="margin-left:20px;width:200px;display:inline" @change="emigrate_select()">
      <el-radio-button label="已勾选"></el-radio-button>
      <el-radio-button label="未勾选"></el-radio-button>
      <el-radio-button label="全部"></el-radio-button>
    </el-radio-group>
  
</el-form>
    </div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      row-key="dev_id"
      border
      height="750px"
      @select="rowSelection"
      @select-all="pageSelect"
      :header-cell-style="{textAlign: 'center'}"
      :cell-style="{ textAlign: 'center' }">
      >
      <el-table-column  type="index"  align="center" width='60px' label="序号" :index="indexMethod"></el-table-column>
      <el-table-column
        label="设备"
        prop="dev_id">
      </el-table-column>
      <el-table-column
        label="型号"
        prop="dev_type">
      </el-table-column>
      <el-table-column
        prop="dev_province"
        label="省份">
      </el-table-column>
      <el-table-column
        prop="dev_city"
        label="城市">
      </el-table-column>
<el-table-column  prop="city_migrate_code" v-if="false" align="center" label="城市迁移编码"></el-table-column>

      <el-table-column
        type="selection"
        :reserve-selection="true"
        align="center"
        width="100px">
      </el-table-column>
    </el-table>

    <el-pagination align="center"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      background="true"
      prev-text="上一页"
      next-text="下一页"
      :current-page.sync="currentPage"
      :page-sizes="[25,50,100]"
      :page-size="perPage"
      layout="total, sizes,prev, pager, next, jumper"
      :total="total">
    </el-pagination>

    <el-dialog title="重要提示" :visible.sync="outerVisible" @close="checkAll='自选'">
    <el-dialog
      width="30%"
      title="再次确认"
      :visible.sync="innerVisible"
      append-to-body
      @close="innerVisible = false;outerVisible = false;checkAll='自选'">
      <span>该操作可能造成不可逆结果，慎重选择是否继续该操作？</span>
      <div slot="footer" class="dialog-footer">
      <el-button @click="innerVisible = false;outerVisible = false;checkAll='自选'">取消</el-button>
      <el-button type="primary" @click="innerVisible = false;outerVisible = false;setAll()">确定</el-button>
    </div>
    </el-dialog>
    <span>该操作会将数据库中已有设备全部进行迁移处理的修改，是否确定进行该操作？</span>
    <div slot="footer" class="dialog-footer">
      <el-button @click="outerVisible = false;checkAll='自选'">取消</el-button>
      <el-button type="primary" @click="innerVisible = true">确定</el-button>
    </div>
  </el-dialog>

  <el-dialog title="重要提示" :visible.sync="outerVisible1" @close="search()">
    <span>该操作会将该页设备在数据库中修改迁移处理，是否确定进行该操作？</span>
    <div slot="footer" class="dialog-footer">
      <el-button @click="outerVisible1 = false;search()">取消</el-button>
      <el-button type="primary" @click="outerVisible1 = false;pagesetAll()">确定</el-button>
    </div>
  </el-dialog>
  </div>
</template>
<script>
import request from '@/utils/request';
//var url="http://127.0.0.1:1016/api/"
import JsonExcel from 'vue-json-excel';
var pageselect=[]
var pageselect_city=[]
var pageselectflag=""
export default {
    components: {
      'download-excel': JsonExcel
    }, 
  data() {
    return {
      perPage:100,// 每页显示条数
      currentPage: 1, // 当前页
      total: 0, // 默认总条数
      fanye:0,
      temp_currentPage: 1,
      checkAll:"自选",
      tableData: [],
      options:[],//城市列表
      options1:[],//备用列表
      options2:[],//备用列表
      value:[],
      migratcity_cod:[],
      // value1:[],
      value2:"",
      value3:"",
      // themescope:[{
      //   value: '0',
      //   label: '全部设备'
      // },
      // {
      //   value: '1',
      //   label: '省份选择'
      // },
      // {
      //   value: '2',
      //   label: '城市选择'
      // },
      // {
      //   value: '3',
      //   label: '型号选择'
      // }],
      // theme:'0', //默认城市查询
      chooseTypeflag:false,
      chooseTypetext:'可型号单选',
      typelist:[],
      outerVisible: false,
      innerVisible: false,
      outerVisible1: false,
      xinghao:[],
      shebei:[],
      checkList:'全部',
      //multipleSelection: [],
       json_fields: {
          "设备":{ 
            field:"dev_id",
            callback:value =>{
              return  "&nbsp;" +value;
            }
            },
            "型号":{ 
            field:"dev_type",
            callback:value =>{
              return  "&nbsp;" +value;
            }
            },

          '省份': 'dev_province',
          '城市': 'dev_city',
          '迁移':'handle_flag'
          }
    }
  },
        
  methods: {
    //默认选中迁移选项
    selection(data) {
      for(var i=0;i<data.length;i++) {
        if(data[i].handle_flag=="1") {
          this.$refs.multipleTable.toggleRowSelection(this.tableData[i],true);
        }
      }
    },
    //表格迁移选项单行点击触发函数
    rowSelection(selection, row) {
      console.log(selection,row)
      let selected = selection.length && selection.indexOf(row) !== -1
	      console.log(selected)  // true就是选中，0或者false是取消选中
      if(selected==false) {
        // this.popoverflag=true
        // this.open(row)
        this.modifydata("",row.dev_id,"0",row.city_migrate_code)
      }else{
        this.modifydata("",row.dev_id,"1",row.city_migrate_code)
      }
    },

 startDownload(){
        let self = this
        if(self.tableData.length==0) {
          self.$message({
            message: '警告，请勾选数据',
            type: 'warning'
          })
        }
      },
      finishDownload(){
        let self = this
        self.$message({
          message: '恭喜，数据导出成功',
          type: 'success'
        })
      },


    //全选设备组件触发弹框
    tankuang() {
      if(this.checkAll=="自选") {
        this.outerVisible = false
      }else{
        this.outerVisible = true
      }
      // checkAll_store=
    },
    //全选触发弹框确定修改函数
    setAll() {
      if(this.checkAll=="全选") {
        this.modifydata1("selectall","1")
        // eslint-disable-next-line space-before-blocks
      }else if(this.checkAll=="全不选"){
        this.$refs.multipleTable.clearSelection();
        this.modifydata1("selectall","0")
      }
    },
    //表格迁移选项每页表头全选触发弹框函数
    pageSelect(selection) {
      this.outerVisible1=true
      pageselect=[]
      pageselect_city=[]
      pageselectflag=""
      for(var i=0;i<this.tableData.length;i++) {
        pageselect[i]=this.tableData[i].dev_id
     pageselect_city[i]=this.tableData[i].city_migrate_code
      }
      if(selection.length==0) {
        pageselectflag="0"
      }else{
        pageselectflag="1"
      }
    },
    pagesetAll() {
      if(pageselectflag=="0") {
        this.modifydata("pageall","","0","")
      }else{
        this.modifydata("pageall","","1","")
      }
    },
    //向后端发送修改迁移标志位（全选组件专用）
    modifydata1(flag1,flag) {
      request.post('Basicdata/page/modify', null, {
        params:
          { 
            flag1:flag1,
            province_code:this.value[0],
            city_code:this.value[1],
            type:this.value2,
            equipment:this.value3,
            flag:flag,
            pageselect:pageselect,
           // pageselect_city:pageselect_city
          },
      }).then(({ data: response }) => {
        this.search()
        console.log(this.tableData)
      }).catch((err) => {
      });
    },
    //向后端发送修改迁移标志位
   
    modifydata(flag1,id,flag,city_migrate_code) {
      request.post('Basicdata/page/modify', null, {
        params:
          { 
            flag1:flag1,
            id:id,
            flag:flag,
            pageselect:pageselect,
            pageselect_city:pageselect_city,
            city_migrate_code:city_migrate_code
          },
      }).then(({ data: response }) => {
        this.search()
      }).catch((err) => {
      });
      
    },
    //点击查询函数返回设备情况
    search() {
      this.tableData=[]
      this.total=0
      this.checkAll="自选"
      this.$refs.multipleTable.clearSelection();
      var flag
      if(this.checkList=="已勾选") {
        flag=1
      }else if(this.checkList=="未勾选") {
        flag=0
      }else if(this.checkList=="全部") {
        flag=2
      }
    if(this.fanye==0){
       this.temp_currentPage=1
      } 
      request.post('Basicdata/page/list', null, {
        params:
        { 
          flag:flag,
          orderflag:"1",
          perPage:this.perPage,
          currentPage:this.temp_currentPage,
          province_code:this.value[0],
          city_code:this.value[1],
          type:this.value2,
          equipment:this.value3,
        },
      }).then(({ data: response }) => {
        this.total=response.data.total
        this.tableData=response.data.data
        this.selection(response.data.data)
       this.currentPage=this.temp_currentPage
      }).catch((err) => {

      });  
      console.log(this.currentPage)
      console.log(this.temp_currentPage)
      
    },
    //迁移勾选选择显示
    emigrate_select() {
      this.tableData=[]
      this.currentPage = 1
      this.temp_currentPage = 1
      this.fanye=1
      var flag
      if(this.checkList=="已勾选") {
        flag=1
      }else if(this.checkList=="未勾选") {
        flag=0
      }else if(this.checkList=="全部") {
        flag=2
      }
      request.post('Basicdata/page/list', null, {
        params:
        { 
          flag:flag,
          orderflag:"1",
          perPage:this.perPage,
          currentPage:this.temp_currentPage,
          province_code:this.value[0],
          city_code:this.value[1],
          type:this.value2,
          equipment:this.value3,
        },
      }).then(({ data: response }) => {
        this.total=response.data.total
        this.tableData=response.data.data
        this.selection(response.data.data)
      }).catch((err) => {

      });  
    },
    //地区框切换触发函数
    handleChange() {
      this.value2=[]
      this.value3=[]
      request.post('Basicdata/page/gettype', null, {
        params:
          { 
            flag:this.value.length,
            province_code:this.value[0],
            city_code:this.value[1],
          },
      }).then(({ data: response }) => {
        console.log(response.data.data)
        this.xinghao=response.data.data

      }).catch((err) => {
      });  
    },
    //型号框输入触发函数
    handleSelect() {
      console.log(this.value2)
      if(this.value2.length==0) {
        this.shebei=[]
      }else{
        request.post('Basicdata/page/getequipment', null, {
          params:
          { 
            flag:this.value.length,
            province_code:this.value[0],
            city_code:this.value[1],
            type:this.value2
          },
        }).then(({ data: response }) => {
          console.log(response.data.data)
          this.shebei=response.data.data
          // this.options1=response.data.data
          // console.log(this.options1)
        }).catch((err) => {
        });  
      }
    },
    //型号输入框获取相似选项
    querySearch(queryString, cb) {
      var xinghao = this.xinghao;
      var results = queryString ? xinghao.filter(this.createFilter(queryString)) : xinghao;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (xinghao) => {
        return (xinghao.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    //设备输入框获取相似选项
    querySearch1(queryString, cb) {
      var shebei = this.shebei;
      var results = queryString ? shebei.filter(this.createFilter1(queryString)) : shebei;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter1(queryString) {
      return (shebei) => {
        return (shebei.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.perPage=val;
      this.currentPage=1;
      this.temp_currentPage = 1;
      this.fanye=1
      this.search();
      this.fanye=0
       },
    //分页页码切换触发函数
     handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage=val;
      this.temp_currentPage = val;
      console.log( this.currentPage);
      this.fanye=1
      this.search();
      this.fanye=0
       },
       indexMethod(index){
        return(this.currentPage-1)*this.perPage+index+1;
       },
  },
  created() {
    this.checkAll="自选"
    this.axios.get( "data/chinacity copy.json").then((response)=>{
      this.options=response.data;
      this.options=JSON.parse(JSON.stringify(this.options)); 
    }).then(({ data: response }) => {
 
      }).catch((response)=>{
       
       this.search()
    }
   
    )
    
  }
    
}


  
</script>

<style  lang="scss"  scoped>

/deep/ .el-table__header-wrapper .el-checkbox__input::after {
    content: '迁移';
    position: absolute;
    margin-left: 5px;
  
}
</style>