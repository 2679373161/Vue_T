<template>
  <div class="page">
      <div class="SelectOption">
        <el-form :inline="true" :model="equipment" class="demo-form-inline">
            <el-form-item label="设备ID:" style="margin-left:10%;">
                <!-- <el-input v-model="equipment.dev_ID" placeholder="设备ID"></el-input> -->
                 <!-- <el-autocomplete   v-model="equipment.dev_ID"  placeholder="请输入设备号"  :fetch-suggestions="querySearch" :trigger-on-focus="false" @select="handleSelect" ></el-autocomplete> -->
                 <el-select v-model="equipment.dev_ID"
                        filterable
                        allow-create
                        clearable
                        :fetch-suggestions="querySearch"
                        :trigger-on-focus="false"
                        placeholder="请选择设备号">
                    <el-option  
                        v-for="item in equipment_ID_ALL"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value" 
                        style="width:180px" 
                    ></el-option>
                    </el-select>


            </el-form-item>
            <el-form-item label="日期:" style="margin-left:10px;">
                 <el-date-picker
                :disabled="data_state"
                v-model="equipment.dev_Time"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="筛选选项:" style="margin-left:10px;">
                <el-select v-model="equipment.dev_State" clearable placeholder="设备状态">
                    <!-- <el-option label="未联网设备" value="shanghai"></el-option>
                    <el-option label="参数下发失败设备" value="beijing"></el-option>
                    <el-option label="持续监测设备" value="shanghai"></el-option>
                    <el-option label="修复成功设备" value="beijing"></el-option>
                    <el-option label="修复失败设备" value="shanghai"></el-option>
                    <el-option label="未处理设备" value="beijing"></el-option> -->
                    <el-option label="修改成功" value="1"></el-option>
                    <el-option label="修改失败" value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="故障选项:" style="margin-left:10px;">
                <el-select v-model="equipment.ErrorType" placeholder="请选择故障类型" disabled clearable>
                    <el-option  v-for="item in ErrorList" :key="item.value" :label="item.label"
                        :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" style="margin-left:10px;" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>
      </div>
      <div class="TableContent">
            <el-table
            ref="tableData_equipment_info"
            :data="tableData_equipment_info"
            :cell-style="tableRowClasscolor"
            row-key="equipment_ID"
            border
            size="large"
            style="width: 100%"
            height="750"
            >
                <el-table-column  
                    type="index"  
                    align="center" 
                    label="序号" 
                    :index="indexMethod"
                    >
                </el-table-column>
                <el-table-column
                    prop="equipment_ID"
                    label="设备号"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="equipment_Fault_Type"
                    label="故障编码"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="equipment_Time"
                    label="修改时间"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="equipment_Change_State"
                    label="修改状态"
                    align="center">
                </el-table-column>
  
                <el-table-column
                    label="操作"
                    align="center">
                    <template slot-scope="scope">
                        <el-button
                        @click="Get_para_info_all(scope.row)"
                        type="text"
                        size="small"
                        align="left">
                            参数记录
                        </el-button>
                    </template>
                </el-table-column>


            </el-table>


      </div>
      <el-dialog :title=" Head_Info "  :visible.sync="outerVisible_para_info"  show-close center  fullscreen>
          <el-form :inline="true" :model="Modify_Records" class="demo-form-inline">
                <el-form-item label="筛选选项:" style="margin-left:10px;">
                <el-select v-model="Modify_Records.Records_State" @change="Row_Info_Change" clearable placeholder="设备状态">

                    <el-option label="修改" value="1"></el-option>
                    <el-option label="未修改" value="0"></el-option>
                    
                    <el-option label="全部信息" value="2"></el-option>
                </el-select>
            </el-form-item>
            </el-form>
        
        
          <el-table
            ref="tableData_Row_info_show"
            :data="tableData_Row_info_show"
            :cell-style="tableRowClasscolor"
            row-key="equipment_ID"
            border
            size="large"
            style="width: 100%"
            height="750"
            >
            <el-table-column
                    prop="equipment_Para_name"
                    label="参数名称"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="equipment_Para_Old"
                    label="历史参数"
                    align="center">
                    <template slot-scope="scope">
                        <div  class="txt">0X{{scope.row.equipment_Para_Old}}</div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="equipment_Para_Now"
                    label="当前参数"
                    align="center">
                    <template slot-scope="scope">
                        <div  class="txt">0X{{scope.row.equipment_Para_Now}}</div>
                    </template>
                </el-table-column>



            </el-table>
        
        
      </el-dialog>

  </div>
</template>

<script type="text/ecmascript-6">
import request from '@/utils/request';
  export default {
    data () {
      return {
        data_state :false,
        equipment: {
          dev_ID: '',
          dev_Time: [],
          dev_State: '',
          ErrorType:'',
        },
        Modify_Records:{
            Records_State:'',
        },
        Head_Info:'',
        equipment_ID_ALL:[],
        equipment_ID_ROW:'',
        equipment_ID_ALL_unique:[],
        tableData_equipment_info:[
            {
            },
        ],
        tableData_Row_info_show:[
            {
            },
        ],
        tableData_Row_info:[
            {
            },
        ],
        outerVisible_para_info:false,

        activeName:'Stable_para',
        // 故障列表
      ErrorList: [
        {
          value:'E0',
          label:'出水传感器故障(E0)',
        },
        {
          value:'E1',
          label:'意外熄火(E1)',
        },
        {
          value:'E2',
          label:'伪火故障(E2)',
        },
        {
          value:'E3',
          label:'温控器故障(E3)',
        },
        {
          value:'E4',
          label:'超温故障(E4)',
        },
        {
          value:'E5',
          label:'风机故障(E5)',
        },
        {
          value:'E6',
          label:'开关阀故障(E6)',
        },
        {
          value:'E8',
          label:'水泵故障(E8)',
        },
        {
          value:'EA',
          label:'CO故障(EA)',
        },
        {
          value:'EE',
          label:'超时故障(EE)',
        },
        {
          value:'ED',
          label:'紫外杀菌灯故障(Ed)',
          disabled: true
        },
        {
          value:'F2',
          label:'进水温度传感器故障(F2)',
        },
        {
          value:'C0',
          label:'点火失败(C0)',
        },
        {
          value:'C1',
          label:'残火故障(C1)',
        },
        {
          value:'C2',
          label:'风压开关/传感器误接通故障(C2)',
        },
        {
          value:'C3',
          label:'风压开关/传感器无法接通故障(C3)',
        },
        {
          value:'C4',
          label:'风堵故障(C4)',
        },
        {
          value:'C5',
          label:'水路堵塞故障(C5)',
        },
        {
          value:'C6',
          label:'水流传感器故障(C6)',
        },
        {
          value:'C7',
          label:'负荷异常(C7)',
        },
        {
          value:'C8',
          label:'热电偶异常(C8)',
        },
        {
          value:'EH',
          label:'CH4异常(EH)',
        },
        {
          value:'EF',
          label:'气泡水故障(EF)',
        },
      ],

      }
    },
    components: {

    },
    methods: {
      onSubmit() {       

        request.post( 'collection/page/getparachangeinfo', null, {
        params:
          {
            dev_id: this.equipment.dev_ID,
            timeLow: this.equipment.dev_Time[0],
            timeHigh: this.equipment.dev_Time[1],
            dev_change_state: this.equipment.dev_State,
          },
        }).then(({ data: response }) => {
            this.tableData_equipment_info=[]
            this.equipment_ID_ALL = []
            console.log(response.data)
            if (response.data.Para_data.length != 0) {
                for (var i = 0; i < ((response.data.Para_data.length)); i++) {
                    var temp_msg =''
                    if (response.data.Para_data[i].success_flag == "1" || response.data.Para_data[i].success_flag == "2") {
                        temp_msg ="修改成功"
                    }else if (response.data.Para_data[i].success_flag == "0"){
                        temp_msg ="修改失败"
                    }else{
                        temp_msg ="信息缺失"
                    }
                    this.tableData_equipment_info[i] = {
                        equipment_ID: (response.data.Para_data[i].dev_id),
                        equipment_Fault_Type:(response.data.Para_data[i].fault_type), 
                        equipment_Para_name: (response.data.Para_data[i].pername),
                        equipment_Para_Old: (response.data.Para_data[i].up_value).padStart(2,'0').toUpperCase(),
                        equipment_Para_Now: (response.data.Para_data[i].curre_value).padStart(2,'0').toUpperCase(),
                        equipment_Time : (response.data.Para_data[i].updata_time),
                        equipment_Change_State: temp_msg,
                        State:response.data.Para_data[i].success_flag
                    }

                }
                for (var t = 0; t < ((response.data.Para_data_all.length)); t++) {
                    this.equipment_ID_ALL_unique[t] = response.data.Para_data_all[t].dev_id
                        
                    
                }
                this.equipment_ID_ALL_unique = this.unique(this.equipment_ID_ALL_unique )
                for (var t = 0; t < ((this.equipment_ID_ALL_unique.length)); t++) {
                    this.equipment_ID_ALL[t] = {
                        value: this.equipment_ID_ALL_unique[t]
                    }
                }
                
                
                console.log(this.equipment_ID_ALL);
                
                this.tableData_equipment_info = JSON.parse(JSON.stringify(this.tableData_equipment_info_save));    

            } else {
                this.$message.success('查询信息为空!')
            }
        }).catch((err) => {

        });

        console.log('submit!');

      },
        querySearch(queryString, cb) {
            var equipment_ID_ALL = this.equipment_ID_ALL;
            var results = queryString ? equipment_ID_ALL.filter(this.createFilter(queryString)) : equipment_ID_ALL;
            // 调用 callback 返回建议列表的数据
            console.log(results)
            cb(results);
    
        },
        createFilter(queryString) {
            return (singelID) => {
            return (singelID.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
        },
      handleSelect(item) {
        console.log(item);
      },
        indexMethod(index) {
        //   this.temppagenum=this.currentPage; //必须要 要不页面页数会出错
        // return (this.currentPage - 1) * this.perPage + index + 1;
        return index+1
        },
        // handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
        // this.perPage=val;
        // this.currentPage=1;
        // this.temp_currentPage = 1;
        // this.table_data_refresh();
        // },
        // handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        // this.currentPage=val;
        // this.temp_currentPage = val;
        // this.table_data_refresh();
    
        // },
            // 表格底色
        tableRowClasscolor({row, column}) {
        if(column.label=="修改状态") {
            if (row.equipment_Change_State == "修改成功") {
            return 'background: #96e6a1';
            } 
            if (row.equipment_Change_State == "修改失败") {

            return 'background: #ffb199';
            } 
            return 'background: #9c9c9c8c';
        }

        },
        Row_Info_Get(id,id_time) {       
        request.post( 'collection/page/getparaRowinfo', null, {
        params:
          {
            dev_id: id,
            time: id_time,
          },
        }).then(({ data: response }) => {
            this.tableData_Row_info = [];
            this.tableData_Row_info_show = [];
            this.Modify_Records.Records_State = '';
            console.log(response.data);
            for (var i = 0; i < ((response.data.Row_data.length)); i++) {
                this.tableData_Row_info[i] = {
                        equipment_Para_name: (response.data.Row_data[i].pername),
                        equipment_Para_Old: (response.data.Row_data[i].up_value).padStart(2,'0').toUpperCase(),
                        equipment_Para_Now: (response.data.Row_data[i].curre_value).padStart(2,'0').toUpperCase(),
                        State:response.data.Row_data[i].success_flag
                }
            }
            this.tableData_Row_info = JSON.parse(JSON.stringify(this.tableData_Row_info));
            this.tableData_Row_info_show = JSON.parse(JSON.stringify(this.tableData_Row_info));    

            this.outerVisible_para_info =true

        }).catch((err) => {

        });
        },
        Get_para_info_all(row){
            //console.log(row.equipment_ID);
            this.equipment_ID_ROW = row.equipment_ID;
            this.Head_Info = '设备参数修改记录 设备：'+this.equipment_ID_ROW;
            if (row.equipment_Change_State == "修改失败") {
                this.$message({
                    message: '修改失败 无修改记录',
                    type: 'warning',
                    duration:1500
                });
            }else{

                this.Row_Info_Get(row.equipment_ID,row.equipment_Time);

            }
            
            
        },
        // Get_Modify_Records(row){
        //     console.log(row);
        //     console.log(this.equipment_ID_ROW );

        // },
        unique(arr){
            return Array.from(new Set(arr))
        },
        Row_Info_Change()
        {
            this.tableData_Row_info_show = [];
            if (this.Modify_Records.Records_State == "1") { //修改成功
                for (var i = 0 , k =0; i < ((this.tableData_Row_info.length)); i++) {
                    if  (this.tableData_Row_info[i].State == "1" )  {
                        this.tableData_Row_info_show[k] ={
                            equipment_Para_name: (this.tableData_Row_info[i].equipment_Para_name),
                            equipment_Para_Old: this.tableData_Row_info[i].equipment_Para_Old,
                            equipment_Para_Now: this.tableData_Row_info[i].equipment_Para_Now,
                            State:this.tableData_Row_info[i].State
                        }
                        k++;
                    }
                }
            }else if (this.Modify_Records.Records_State == "0") { //修改但未改
                for (var i = 0 , k =0; i < ((this.tableData_Row_info.length)); i++) {
                    if  (this.tableData_Row_info[i].State == "2" )  {
                        this.tableData_Row_info_show[k] ={
                            equipment_Para_name: (this.tableData_Row_info[i].equipment_Para_name),
                            equipment_Para_Old: this.tableData_Row_info[i].equipment_Para_Old,
                            equipment_Para_Now: this.tableData_Row_info[i].equipment_Para_Now,
                            State:this.tableData_Row_info[i].State
                        }
                        k++;
                    }
                }
            }else{ //all
                this.tableData_Row_info_show = JSON.parse(JSON.stringify(this.tableData_Row_info)); 
            }
        },


    },
    created() {
      console.log('create!');
      if(this.$route.query.id!=null){
        this.equipment.dev_ID=this.$route.query.id
      }
      this.onSubmit();
    },
  }
</script>

<style scoped lang="scss" >
    .SelectOption{
        margin-top: 10px;
    }
 
</style>
