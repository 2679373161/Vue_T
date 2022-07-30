<template>
  <div id="app1">
   
  <div class="search" align="center" style="margin-top:20px;">
    <el-form ref="form" class="ItemInfo" :model="equipment_info" label-width="80px" :inline="true">
    <el-form-item label="地区：" >

       <el-cascader
        ref="cascaderAddr1"
        :options="options"
        v-model="value"
        :props="{ checkStrictly: true }"
        style="width:200px"
        @change="handleChange"
        clearable
        filterable>
        </el-cascader>
    </el-form-item>
    <el-form-item label="型号：" >

    <el-select v-model="value2" 
       @change="handleSelect"
      filterable
      allow-create
      clearable
      :fetch-suggestions="querySearch"
      :trigger-on-focus="false"
      placeholder="请选择型号">
      <el-option  
      v-for="item in options2"
      :key="item.value"
      :label="item.label"
      :value="item.value" 
      style="width:180px" 
        ></el-option>
    </el-select>
    </el-form-item>


    <el-form-item label="设备：" >
        <el-select v-model="value3"
        @change="handleSelect2"
            filterable
            allow-create
            clearable
            :fetch-suggestions="querySearch1"
            :trigger-on-focus="false"
            placeholder="请选择设备号">
        <el-option  
            v-for="item in options3"
            :key="item.value"
            :label="item.label"
            :value="item.value" 
            style="width:180px" 
        ></el-option>
        </el-select>
    </el-form-item>
    <el-form-item label="日期:" >
        <el-date-picker
        v-model="datatime"
        type="date"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
        placeholder="选择日期">
        </el-date-picker>
        <el-button type="primary" @click="emigrate_monitoring"  style="margin-left:10px">查询</el-button>
    </el-form-item>
        
    
    <el-form-item label="筛选：" >
    
        <el-radio-group v-model="checkList" style="margin-left:20px;width:200px;display:inline" @change="emigrate_monitoring()">
            <el-radio-button label="异常"></el-radio-button>
            <el-radio-button label="正常"></el-radio-button>
            <el-radio-button label="全部"></el-radio-button>
        </el-radio-group>
    </el-form-item>
    <el-button type="primary" @click="download" >当前页显示全部筛选数据</el-button>
    <el-form-item class="ItemInfoTime" style="margin-left:10px;">
    <download-excel     
        :fields = "json_fields"
        :data="tableData"
        :before-generate = "startDownload"
        :before-finish = "finishDownload"  
        name="listdata.xls"
        type="xls">
        <el-button>当前页导出Excel</el-button>
        </download-excel>
    </el-form-item>
</el-form>

  </div>
  <el-table ref="tableRef" :data="tableData"   height="750px" border style="width: 100%;margin-top:20px" align="center">
    <el-table-column  type="index"  align="center" width='60px' label="序号" :index="indexMethod"></el-table-column>
    <el-table-column  prop="dev_region" align="center" width='150px' label="地区"></el-table-column>
    <el-table-column  prop="province" align="center" width='150px' label="省份"></el-table-column>
    <el-table-column  prop="city" align="center" width='150px' label="城市"></el-table-column>
    <el-table-column  prop="dev_type" align="center" width='150px' label="型号"></el-table-column>
    <el-table-column  prop="dev_id" align="center" width='150px' label="设备"></el-table-column>
    <el-table-column  prop="temp_score" align="center" width='150px' label="期间温度评分"></el-table-column>
    <el-table-column  prop="e1" align="center" width='150px' label="E1故障数"></el-table-column>
    <el-table-column  prop="c4" align="center" width='150px' label="C4故障数"></el-table-column>
        <el-table-column  prop="zhendangflag" align="center" width='150px' label="是否存在恒温振荡"></el-table-column>
    <el-table-column  prop="worst_score" align="center" width='150px' label="恒温最差段评分"></el-table-column>
    <el-table-column  prop="worst_time" align="center" width='150px' label="最差片段起止时间"></el-table-column>
   <el-table-column  prop="city_code" v-if="false" align="center" label="城市编码"></el-table-column>
 <el-table-column  prop="province_code" v-if="false" align="center" label="省份编码"></el-table-column>
       <el-table-column
      align="center"
      label="片段详情"
      >
      <template slot-scope="scope">
        <el-button
          @click="jumppagefragement(scope.row)"
          type="text"
          size="small"
          align="center">
          片段详情
        </el-button>
      </template>
    </el-table-column>
    <el-table-column
      label="操作"
      align="center">
      <template slot-scope="scope">
        <el-button
          @click="jumppage1(scope.row)"
          type="text"
          size="small"
          align="left">
          手动改参
        </el-button>
      </template>
    </el-table-column>
    
    <el-table-column
      label="自动参数修改"
      align="center">
      <template slot-scope="scope">
        <el-button
          @click="Open_popup(scope.row)"
          type="primary"
          size="small"
          :disabled = scope.row.State
          align="left">
          修改信息详情
        </el-button>
      </template>
    </el-table-column>
   

  </el-table>
  
 
  <el-pagination align="center" v-if="this.downloadflag!=1"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      background="true"
      prev-text="上一页"
      next-text="下一页"
      :current-page.sync="current_Page"
      :page-sizes="[25,50,100]"
      :page-size="perPage"
      layout="total, sizes, prev, pager, next"
      :total="total">
    </el-pagination>

    <el-dialog
      title="期间温度评分曲线" 
      align="center"
      :visible.sync="chartVisible"
      @open="open()"
      width="100%">
      <div id='myChart' style="width: 100%; height: 100%"></div>
  </el-dialog>

    <el-dialog
      title="设备修改参数信息详情" 
      align="center"
      :visible.sync="Para_info_Visible"
      width="100%">
        <el-collapse v-model="activeNames" >
            <el-collapse-item title="熄火故障 " name="1" style="white-space: pre-wrap;">
                <!-- <div>发生熄火故障 自调节建议:将参数FL 0X2a 修改为 0X1a</div> -->
                <div>{{this.error_info_fire}}</div>

            </el-collapse-item>
            <el-collapse-item title="风堵故障 " name="2" style="white-space: pre-wrap;">
                <!-- <div>发生风机故障 自调节建议:将参数maximum_load_fan_duty_cycle_deviation_coefficien 0Xa2 修改为 0Xa1</div> -->
                <div>{{this.error_info_fan}}</div>
            </el-collapse-item>
            <el-collapse-item title="恒温故障 " name="3" style="white-space: pre-wrap;">
                <!-- <div>暂未开发</div> -->
                <div>{{this.error_info_heate}}</div>
            </el-collapse-item>
        <el-collapse-item title="恒温震荡故障 " name="4" style="white-space: pre-wrap;">
                <!-- <div>暂未开发</div>this.error_info_zhen -->
                <div>{{this.error_info_zhen}}</div>
            </el-collapse-item>
        </el-collapse>
            <el-button type="primary" style="margin-left:10px;" @click="onSubmit">确认修改</el-button>
            <el-button type="primary" style="margin-left:10px;" @click="onSubmit_feedback">反馈修改错误</el-button>
            <el-button type="primary" style="margin-left:10px;" @click="onSubmit_cancel">取消修改</el-button>   
  </el-dialog>
  </div>
</template>

<style>
  
</style>
<script>
import * as echarts from 'echarts';
import request from '@/utils/request';
import JsonExcel from 'vue-json-excel';

export default {
  components: {
      'download-excel': JsonExcel
    }, 
  data() {
    return {
      downloadflag:0,
       date:new Date(),
       json_fields: {
            '地区':'dev_region',
            '省份': 'province',
            '城市': 'city',
            "型号":{ 
            field:"dev_type",
                callback:value =>{
                    return  "&nbsp;" +value;
                }
            },
            "设备":{ 
                field:"dev_id",
                callback:value =>{
                    return  "&nbsp;" +value;
                }
            },
            '期间温度评分':'temp_score',
            'E1故障数':'e1',
           'C4故障数':'c4',
           '是否存在恒温振荡':'zhendangflag',
           '恒温段最差评分':'worst_score'
        },
       checkList:"异常",
       xData:[],
       yData:[],
       chartVisible:false,
       Para_info_Visible:false,
       mindutycyccoeff:"",
       maxdutycyccoeff:"",
       mincurrcoeff:"",
       maxcurrcoeff:"",
       windpressuresensor:"",
       rewaterflow:"",

       equipment_info:{},
       activeNames: ['1','2','3','4'],

       applianceid:"",
       canshu:"",
       value: '',
       activeName: 'second',

      value:[],
      options:[],
      options2: [],  //型号框下拉
      options3:[],  //设备框下拉

      value2:[],
      value3:[],

      xinghao: [],
      shebei: [],
      perPage:25,// 每页显示条数
      current_Page: 1, // 当前页
      temp_currentPage: 1,

      total: 0, // 默认总条数
      
      tableData:[],
      chartData:[],
      temp_score:[],
      time_date:[],
      datatime:[],
      temp_datatime:[],
      error_info_fire:'',
      error_info_fan:'',
      error_info_heate:'',

      data_info_fire:{},
      data_info_fire_xhrow:{},
      data_info_windblockage:{},
      data_info_fan:{},
      data_info_heate:{},
      data_info_heate_htrow:{},
      error_info_zhen_flag:0,
      error_info_fire_flag: 0,
      error_info_fan_flag:0,
      error_info_heate_flag:0,
      error_info_heate_k_flag:0,
      
      row_error_equ_id:'',
      row_error_equ_type:'',
      row_error_equ_starttime:'',
      row_error_equ_endtime:'',
          fanye:0,
    };
  },
  methods:{
  jumppagefragement(row) {
       console.log(row)

      let routeData = this.$router.resolve({
     path:'indextemp',
 query: {

   id: row.dev_id,
  city:row.city_code,
  type:row.dev_type,
  month:this.datatime,
  month1:this.datatime
  }
});
 window.open(routeData.href);
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
      
//监控异常勾选选择显示
    emigrate_monitoring() {
      this.downloadflag=0
      this.tableData=[]
      var flag
      if(this.checkList=="异常") {
        flag="1"

      }else if(this.checkList=="正常") {
        flag="0"
      }else if(this.checkList=="全部") {
        flag="2"
      }
    if(this.fanye==0){
       this.temp_currentPage=1
      } 
      this.tableData=[]
      this.total=0
      var v;
      var v1;
      const dt = new Date();
      const dt1 = new Date();
      dt.setTime(dt.getTime()-86400000);
      dt1.setTime(dt.getTime()-2592000000);
      v=this.dateFormat(dt);
      v1=this.dateFormat(dt1);
      if(this.datatime.length == 0) {
          this.$notify.error({
            title: '错误',
            message: '请补全时间信息'
          });
      }else{
        this.current_Page = this.temp_currentPage;
        this.temp_datatime = this.dateFormat_End(this.datatime);
        request.post('monitor/page/DataError', null, {
        params:
        { 
          flag: flag,
          perPage: this.perPage,
          currentPage:this.temp_currentPage,
          province_code: this.value[0],
          city_code: this.value[1],
          type: this.value2,
          equipment: this.value3,
          timeLow:this.datatime,
          timeHigh:this.temp_datatime,
        },
       }
       ).then(({ data: response }) => {
        console.log(response.data)
        // if(this.value3==""){ 
          this.total=response.data.count
        // }else{
        //   this.total=1
        // }
        var temp_state = true;
        var temp_state_Heater = false;
        var temp_state_Fire = false;
        var temp_state_fan = false;
        var temp_state_zhen=false
        for(var i=0;i<response.data.data1.length;i++){
            temp_state = true;
            temp_state_Heater = false;
            temp_state_Fire = false;
            temp_state_fan = false;
            temp_state_zhen=false
            if ((((response.data.data[i].worst_score - 0) <= 80)&&(response.data.data[i].worst_temppattern != "")&&(response.data.data[i].worst_temppattern != "0")&&(response.data.data[i].worst_temppattern != "11")) ) {
                temp_state_Heater = true;
            }
            if ((response.data.data[i].c4 != "0")) {
                temp_state_fan = true;
            }
            if ((response.data.data[i].e1 != "0")) {
                temp_state_Fire = true;
            }
            if ((response.data.data[i].zhendangflag != "0")) {
                temp_state_zhen = true;
            }
            if (temp_state_Heater||temp_state_fan||temp_state_Fire||temp_state_zhen) {

                temp_state = false;
            }
          this.tableData[i]={
                dev_region  : response.data.data1[i].dev_region,
                province    : response.data.data1[i].dev_province,
                province_code:response.data.data[i].province_code,
                city        : response.data.data1[i].dev_city,
                city_code   : response.data.data[i].city_code,

                dev_type    : response.data.data[i].dev_type,
                dev_id      : response.data.data[i].dev_id,

                temp_score  : response.data.data[i].temp_score,

                e1:response.data.data[i].e1,
                e1_state:temp_state_Fire,

                c4:response.data.data[i].c4,
                c4_state:temp_state_fan,

                time_date   :response.data.data[i].time_date,
                worst_score:response.data.data[i].worst_score,
                h1_state:temp_state_Heater,
                zhendangflag:response.data.data[i].zhendangflag,
                worst_start :response.data.data[i].worst_start,
                worst_end :response.data.data[i].worst_end,
                worst_time:response.data.data[i].worst_start+'-'+response.data.data[i].worst_end,
                State:temp_state
          }
         
        }
               for(var i=0;i<response.data.data1.length;i++){
          if(this.tableData[i].temp_score=="0"){
            this.tableData[i].temp_score="无效片段"
            this.tableData[i].worst_time='无效片段'
          }
                    if(this.tableData[i].zhendangflag>0){
            this.tableData[i].zhendangflag="是"
          }else{
             this.tableData[i].zhendangflag="否"
          }
        }
        this.tableData=JSON.parse(JSON.stringify(this.tableData)); 
        this.current_Page=this.temp_currentPage
       }).catch((err) => {
        
       });
       }
       
           
       },

   jumppage(row) {
       console.log(row)
        this.temp_datatime = this.dateFormat_End(this.datatime);
      let routeData = this.$router.resolve({
     path:'indextempequipment',
    query: {
        province:row.province_code,
        city:row.city_code, 
        type:row.dev_type,
        id: row.dev_id,
        month:this.datatime,
        month1:this.temp_datatime,
    }
    });
    window.open(routeData.href);
      },
    Open_popup(row){
       this.Get_para_info(row);//获取修改信息
        
    },
    onSubmit_cancel(){
        this.Para_info_Visible =false;
    },
    onSubmit_feedback(){
        //deal
        this.$message.info('错误信息已反馈');
    },
    Get_para_info(row_info){
        //请求接口
        this.row_error_equ_id = '';
        this.row_error_equ_type = '';
        this.row_error_equ_starttime = '';
        this.row_error_equ_endtime = '';
        request.post('Basicdata/modifyfaulty', null, {
        params:
        { 
            dev_type    :row_info.dev_type,
            devId       :row_info.dev_id,
            timedate    :row_info.time_date,
        },
       }
       ).then(({ data: response }) => {
           this.data_info_fire={}
           this.data_info_fire_xhrow={}
           this.data_info_windblockage={}
           
            this.data_info_fan={}
            this.data_info_zhen_row={}
            this.data_info_zhen_two={}
            this.data_info_heate_htrow={}
            this.data_info_heate={} //数据清空
            this.error_info_windblockageflag =0
            this.error_info_fire_flag       = 0
            this.error_info_fan_flag        = 0
            this.error_info_zhen_flag       = 0
            this.error_info_heate_flag      = 0
            this.error_info_heate_k_flag    = 0
             console.log(response.data)
           if (row_info.e1_state == true) { //熄火故障信息
                this.error_info_fire_flag       = 1
                this.data_info_fire = response.data.htemper;
                console.log(this.data_info_fire.Flag)
                this.data_info_fire_xhrow= response.data.xhrow;
                 console.log(this.data_info_fire_xhrow)
  if (response.data.windblockage.Flagerror == 1&&response.data.htemper.Flagerror != 1) { //整机关键参数无误，风堵导致熄火
           console.log(response.data.windblockage)
               
               if (response.data.windblockage.Flag[0] ==0 && response.data.windblockage.Flag[1] ==1) {  //关键参数出错
                this.error_info_windblockageflag =1
                 this.data_info_windblockage = response.data.windblockage;
                this.error_info_fire = "熄火故障：将参数" + response.data.windblockage.Code[1] + "0X"+response.data.windblockage.Pvule16[1] +"修改为0X"+ response.data.windblockage.Hvule16[1]

               }else if (response.data.windblockage.Flag[0] ==1 && response.data.windblockage.Flag[1] ==0) {
                   this.error_info_windblockageflag =1
                    this.data_info_windblockage = response.data.windblockage;
                this.error_info_fire = "熄火故障：将参数" + response.data.windblockage.Code[0] + "0X"+response.data.windblockage.Pvule16[0] +"修改为0X"+ response.data.windblockage.Hvule16[0]
                   
               }else if (response.data.windblockage.Flag[0] ==1 && response.data.windblockage.Flag[1] ==1) {
                   this.error_info_windblockageflag =1
                    this.data_info_windblockage = response.data.windblockage;
                this.error_info_fire = "熄火故障：将参数" +response.data.windblockage.Code[0]+"  "+response.data.windblockage.Code[1] + "0X"+response.data.windblockage.Pvule16[0]+"  "+"0X"+response.data.windblockage.Pvule16[1] +"\n"+"修改为0X"+ response.data.windblockage.Hvule16[0]+"  "+ "0X"+response.data.windblockage.Hvule16[1]
               }



  }
               if (response.data.htemper.Flagerror == 1&&response.data.windblockage.Flagerror == 0) { //只存在关键参数出错
                    var tempcode_msg =''
                    var tempPvule_msg =''
                    var tempHvule_msg =''
                    for(var i=0;i<response.data.htemper.Code.length;i++)
                    {
                        tempcode_msg = tempcode_msg + response.data.htemper.Code[i]+" ";
                        tempPvule_msg = tempPvule_msg + "0X"+response.data.htemper.Pvule[i]+" ";
                        tempHvule_msg = tempHvule_msg + "0X"+response.data.htemper.Hvule[i]+" ";
                    }
                this.error_info_fire = "熄火故障：将参数" + tempcode_msg + tempPvule_msg +"修改为"+ tempHvule_msg  
               }else if(response.data.windblockage.Flagerror == 1&&response.data.htemper.Flagerror == 1){//整机关键参数和风堵系数
     var tempcode_msg =''
                    var tempPvule_msg =''
                    var tempHvule_msg =''
                    for(var i=0;i<response.data.htemper.Code.length;i++)
                    {
                        tempcode_msg = tempcode_msg + response.data.htemper.Code[i]+" ";
                        tempPvule_msg = tempPvule_msg + "0X"+response.data.htemper.Pvule[i]+" ";
                        tempHvule_msg = tempHvule_msg + "0X"+response.data.htemper.Hvule[i]+" ";
                    }
              if (response.data.windblockage.Flag[0] ==0 && response.data.windblockage.Flag[1] ==1) { //关键参数出错
                this.error_info_fire = "熄火故障：将参数" + response.data.windblockage.Code[1] + "0X"+response.data.windblockage.Pvule16[1] +"修改为0X"+ response.data.windblockage.Hvule16[1]+"  "+ tempcode_msg + tempPvule_msg +"修改为"+ tempHvule_msg  
   this.error_info_windblockageflag =1
    this.data_info_windblockage = response.data.windblockage;
               }else if (response.data.windblockage.Flag[0] ==1 && response.data.windblockage.Flag[1] ==0) {
                this.error_info_fire = "熄火故障：将参数" + response.data.windblockage.Code[0] + "0X"+response.data.windblockage.Pvule16[0] +"修改为0X"+ response.data.windblockage.Hvule16[0]+"  "+tempcode_msg + tempPvule_msg +"修改为"+ tempHvule_msg  
                      this.error_info_windblockageflag =1
                       this.data_info_windblockage = response.data.windblockage;
               }else if (response.data.windblockage.Flag[0] ==1 && response.data.windblockage.Flag[1] ==1) {
              
              this.error_info_fire = "熄火故障：将参数" +response.data.windblockage.Code[0]+"  "+response.data.windblockage.Code[1] + "0X"+response.data.windblockage.Pvule16[0]+"  "+"0X"+response.data.windblockage.Pvule16[1] +"\n"+"修改为0X"+ response.data.windblockage.Hvule16[0]+"  "+ "0X"+response.data.windblockage.Hvule16[1]+"  "+ tempcode_msg + tempPvule_msg +"修改为"+ tempHvule_msg  
                this.error_info_windblockageflag =1
                 this.data_info_windblockage = response.data.windblockage;
             }


               }
               
               
               else if (response.data.htemper.Flagerror == 0&&response.data.windblockage.Flagerror == 0) { //PL参数存在问题

                this.error_info_fire = "熄火故障：将参数" + response.data.htemper.Code[0] +"0X"+ response.data.htemper.Pvule[0] +"修改为0X"+ response.data.htemper.Hvule[0]
               }else if (response.data.htemper.Flagerror == 2) { //PL参数达到上限

                this.error_info_fire = "熄火故障修改次数已达上限" 
               }
               
           }else{
               this.error_info_fire = '无熄火故障'
           }
           if (row_info.c4_state == true) { //风机故障信息
           console.log(response.data.htemperc4)
                this.data_info_fan = response.data.htemperc4;
                this.error_info_fan_flag        = 1
               if (response.data.htemperc4.Flag[0] ==0 && response.data.htemperc4.Flag[1] ==1) { //关键参数出错
                this.error_info_fan = "风堵故障：将参数" + response.data.htemperc4.Code[1] + "0X"+response.data.htemperc4.Pvule16[1] +"修改为0X"+ response.data.htemperc4.Hvule16[1]

               }else if (response.data.htemperc4.Flag[0] ==1 && response.data.htemperc4.Flag[1] ==0) {
                this.error_info_fan = "风堵故障：将参数" + response.data.htemperc4.Code[0] + "0X"+response.data.htemperc4.Pvule16[0] +"修改为0X"+ response.data.htemperc4.Hvule16[0]
                   
               }else if (response.data.htemperc4.Flag[0] ==1 && response.data.htemperc4.Flag[1] ==1) {
                this.error_info_fan = "风堵故障：将参数" +response.data.htemperc4.Code[0]+"  "+response.data.htemperc4.Code[1] + "0X"+response.data.htemperc4.Pvule16[0]+"  "+"0X"+response.data.htemperc4.Pvule16[1] +"\n"+"修改为0X"+ response.data.htemperc4.Hvule16[0]+"  "+ "0X"+response.data.htemperc4.Hvule16[1]
               }else if (response.data.htemperc4.Flag[0] ==0 && response.data.htemperc4.Flag[1] ==0) {
                this.error_info_fan = "风机参数均已调至90，无需继续修改"
               }
               
           }else{
            this.error_info_fan = '无风堵故障'       
           }
           if(row_info.zhendangflag=="是"){//恒温振荡改参
          
              this.data_info_zhen_row  = response.data.rowzhen;
              console.log(this.data_info_zhen_row)
              this.data_info_zhen_two  = response.data.htempzhen;
              this.error_info_zhen_flag = 1
              if(response.data.htempzhen.Flag[0]==1){
                  var tempZ1_msg ='';
                 for(var i=0;i<response.data.htempzhen.Code.length;i++){
                  console.log(tempZ1_msg)
                        tempZ1_msg = tempZ1_msg +"将参数"+response.data.htempzhen.Code[i]+"  "+response.data.htempzhen.Pvule[i]+"修改为  "+response.data.htempzhen.Hvule[i]+"\n";
                 }
                    this.error_info_zhen = "恒温震荡参数出错"+tempZ1_msg;
              }
           else{
                  this.error_info_zhen = "恒温震荡改参次数达到上限";
           }
           }else{
            this.error_info_zhen = "无恒温振荡故障"
           }

           if (row_info.h1_state == true &&row_info.zhendangflag=="否") { //恒温故障信息
           this.data_info_heate = response.data.htemperheng;
           this.data_info_heate_htrow=response.data.htrow;
           this.row_error_equ_starttime = row_info.worst_start;
           this.row_error_equ_endtime = row_info.worst_end;
               if (response.data.htemperheng.Code[0] =="ka") { //比例参数
                    var tempH1_msg ='';
                    this.error_info_heate_flag      = 1 //比例参数故障
                   for(var i=0;i<response.data.htemperheng.Code.length;i++){
                        tempH1_msg = tempH1_msg +"将参数"+response.data.htemperheng.Code[i]+"  "+response.data.htemperheng.Pvule[i]+"修改为  "+response.data.htemperheng.Hvule[i]+"\n";
                    }
                    this.error_info_heate = "恒温故障分段比例出错"+ "\n"+tempH1_msg;
               }else{
                   var tempH1_msg ='';
                   this.error_info_heate_k_flag      = 1 //故障
                   for(var i=0;i<response.data.htemperheng.Code.length;i++){
                        tempH1_msg = tempH1_msg + "\n"+"将参数"+response.data.htemperheng.Code[i]+"0X"+response.data.htemperheng.Pvule[i]+"修改为0X"+response.data.htemperheng.Hvule[i]+"\n";
                    }
                    this.error_info_heate = "恒温故障整机关键参数出错"+tempH1_msg;
               }
           }else
           {if(row_info.zhendangflag=="是"){
            this.error_info_heate = '存在恒温振荡故障,待该故障修复后方可修复恒温故障'    
           }else{
                this.error_info_heate = '无恒温故障' 
           }
              
           }
            this.row_error_equ_id = row_info.dev_id;
            this.row_error_equ_type = row_info.dev_type;
            this.Para_info_Visible =true;
       }).catch((err) => {
        
       });
        //接收信息处理

        //信息填充
        // "熄火故障：将参数" + para_name + "0X"+para_value +"修改为0X"+ para_value_C
        // "风机故障：将参数" + para_name + "0X"+para_value +"修改为0X"+ para_value_C
        // "恒温故障：将参数" + para_name + "0X"+para_value +"修改为0X"+ para_value_C
        // this.error_info_fire = ''
        // this.error_info_fan = ''
        // this.error_info_heate = ''

        // this.error_info_fire = id
        // this.error_info_fan = type
        // this.error_info_heate = time
    },
      open(){
        this.$nextTick(() => {
        //  执行echarts方法
        this.chartData=[];
         var v;
         var v1;
         const dt = new Date();
         const dt1 = new Date();
         dt.setTime(dt.getTime()-86400000);
         dt1.setTime(dt.getTime()-2592000000);
         v=this.dateFormat(dt);
         v1=this.dateFormat(dt1);
         this.temp_datatime = this.dateFormat_End(this.datatime);
         request.post('monitor/page/Datachart', null, {
          params:
          { 
           equipment:this.applianceid ,
           timeLow:this.datatime,
           timeHigh:this.temp_datatime ,
          },
         }
         ).then(({ data: response }) => {
        for(var i=0;i<response.data.data.length;i++){
          this.xData.push(response.data.data[i]['time_date']);
          this.yData.push(response.data.data[i]['temp_score'])
          }
          this.drawTable();
        }
                      
       );
        })
      },
    
    
     drawTable(){

      var chartDom = document.getElementById('myChart');
      var myChart = echarts.init(chartDom);
      var option;
      option = {
         toolbox: {
           show: true,
           feature: {
           dataZoom: {
           yAxisIndex: "none"
          },
          
      dataView: {
        readOnly: false
          },
      magicType: {
        type: ["line", "bar"]
         },
      restore: {},
      saveAsImage: {}
          }
         },
      title: {
            text:this.applianceid,
          },
      tooltip: {
            trigger: 'axis',
        axisPointer: {
              type: 'cross',
              animation: false,
        label: {
                backgroundColor: '#505765',
              },
            },
          },
      xAxis: {
      
        type: 'category',
        data:this.xData,
        axisLabel: {
              fontWeight: "bold",
              fontSize: 14,
              interval: 0, 
              rotate: 30
            }
        },
      yAxis: {
        type: 'value',
         },
      series: [
        {
         name:"温度评分",
         data:this.yData,
         type: 'line'
    }
  ]
};
       myChart.setOption(option,true);
       this.xData=[];
       this.yData=[];
     },
    zhuanhaun(str){
      var strz
      strz=parseInt(str,10)
      str=strz.toString(16)
      if(strz<16){str="0"+str}
      return (str)
    },
    onSubmit(){
            // this.error_info_fire_flag       = 0
            // this.error_info_fan_flag        = 0
            // this.error_info_heate_flag      = 0
            // this.error_info_heate_k_flag    = 0
        var request_params = {};
        this.$set(request_params,"devId",this.row_error_equ_id)
        this.$set(request_params,"devtype",this.row_error_equ_type)
        if (this.error_info_fire_flag == 1) { //熄火故障信息
            this.$set(request_params,"merrox","1")
            if(this.data_info_fire.Flag==null){
               this.$set(request_params,"zhengjiflag",1)
               this.$set(request_params,"xflag",0)
            }
            else{
              this.$set(request_params,"zhengjiflag",0)
               this.$set(request_params,"xflag",this.data_info_fire.Flag[0])
            }
           
            this.$set(request_params,"xrow",this.data_info_fire_xhrow.Nowrow)
            this.$set(request_params,"xover",this.data_info_fire_xhrow.Perrow)
            this.$set(request_params,"xstarow",this.data_info_fire_xhrow.Hourow)
        }else{
            this.$set(request_params,"merrox","0")    
        }
        
        if ( this.error_info_windblockageflag ==1) { //风机故障信息
            this.$set(request_params,"windblockage","1")
            this.$set(request_params,"num",this.data_info_windblockage.Hvule)
               console.log(this.data_info_fan.Hvule)
            this.$set(request_params,"sendMinFlag",this.data_info_windblockage.Flag[1])
            this.$set(request_params,"sendMaxFlag",this.data_info_windblockage.Flag[0])

            this.$set(request_params,"indexMin",this.data_info_windblockage.Index[1])
            this.$set(request_params,"indexMax",this.data_info_windblockage.Index[0])

            this.$set(request_params,"minDutyCycCoeff",this.data_info_windblockage.Pvule[1])
            this.$set(request_params,"maxDutyCycCoeff",this.data_info_windblockage.Pvule[0])
        }else{
            this.$set(request_params,"merroc4","0")    
        }


        if (this.error_info_fan_flag  == 1) { //风机故障信息
            this.$set(request_params,"merroc4","1")
            this.$set(request_params,"num",this.data_info_fan.Hvule)
               console.log(this.data_info_fan.Hvule)
            this.$set(request_params,"sendMinFlag",this.data_info_fan.Flag[1])
            this.$set(request_params,"sendMaxFlag",this.data_info_fan.Flag[0])

            this.$set(request_params,"indexMin",this.data_info_fan.Index[1])
            this.$set(request_params,"indexMax",this.data_info_fan.Index[0])

            this.$set(request_params,"minDutyCycCoeff",this.data_info_fan.Pvule[1])
            this.$set(request_params,"maxDutyCycCoeff",this.data_info_fan.Pvule[0])
        }else{
            this.$set(request_params,"merroc4","0")    
        }
        if (this.error_info_heate_flag  == 1) { //恒温故障信息
            this.$set(request_params,"merrogt","1")
            this.$set(request_params,"starttime",this.row_error_equ_starttime)
            this.$set(request_params,"endtime",this.row_error_equ_endtime)
            this.$set(request_params,"ka",this.data_info_heate.Hvule[0] )
            this.$set(request_params,"kb",this.data_info_heate.Hvule[1] )
            this.$set(request_params,"kc",this.data_info_heate.Hvule[2] )
        }else{
            this.$set(request_params,"merrogt","0")    
        }
        if (this.error_info_heate_k_flag  == 1) { //恒温关键参数故障信息
            this.$set(request_params,"merrohg","1")
            this.$set(request_params,"Hgrow",this.data_info_heate_htrow.Nowrow)
            this.$set(request_params,"Hgover",this.data_info_heate_htrow.Perrow)
            this.$set(request_params,"Hgstrow",this.data_info_heate_htrow.Hourow)
        }else{
            this.$set(request_params,"merrohg","0")    
        }
        //this.$set(this.Student,sex,"男")
       if (this.error_info_zhen_flag ==1){//恒温震荡参数修改
            this.$set(request_params,"Merrozhen","1")
            this.$set(request_params,"downsenet",this.data_info_zhen_row.Nowrow)
            this.$set(request_params,"backout",this.data_info_zhen_two.Hvule)
                   
        }else{
            this.$set(request_params,"Merrozhen","0") 
        }
        request.post('Basicdata/hxcqueryrewrint', null, {
            params:request_params
        }
        ).then(({ data: response }) => {
          console.log(response.data.flagerror)
            if (response.data.flagerror != "0"&&response.data.flagerror != "00"&&response.data.flagerror != "000"&&response.data.flagerror != "0000") {
                this.$message.info('修改完成');
            }
            else{
              this.$message.info('修改失败');
            }
        }).catch((err) => {
        
       });
    },
    handleClick(tab, event) {
        console.log(tab, event);
      },
    jumppage1(row) {
      let routeData = this.$router.resolve({
        path:'Para_Inquire',
        query: {

        equipment_ID: row.dev_id,

        }
    });
    window.open(routeData.href);
      },
    // Openchart(devid)

    dateFormat:function(time) {
        var date=new Date(time);
        var year=date.getFullYear();
        var month= date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
        var day=date.getDate()<10 ? "0"+date.getDate() : date.getDate();
        var hours=date.getHours()<10 ? "0"+date.getHours() : date.getHours();
        var minutes=date.getMinutes()<10 ? "0"+date.getMinutes() : date.getMinutes();
        var seconds=date.getSeconds()<10 ? "0"+date.getSeconds() : date.getSeconds();
        // 拼接 可改成自己所要的时间格式
        return year+"-"+month+"-"+day;
    },
    dateFormat_Strat:function(time) {
        var date=new Date(time);
        var year=date.getFullYear();
        var month= date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
        var day=date.getDate()<10 ? "0"+date.getDate() : date.getDate();

        // 拼接 可改成自己所要的时间格式
        return year+"-"+month+"-"+day;
    },
    dateFormat_End:function(time) {
        var date=new Date(time);
        var year=date.getFullYear();
        var month= date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
        var day=date.getDate()<10 ? "0"+date.getDate() : date.getDate();
        
        // 拼接 可改成自己所要的时间格式
        return year+"-"+month+"-"+day;
    },
    download(){
     
      this.downloadflag=1
      this.search()
      
    },
    search(){
       this.tableData=[]
      var flag
      if(this.checkList=="异常") {
        flag="1"

      }else if(this.checkList=="正常") {
        flag="0"
      }else if(this.checkList=="全部") {
        flag="2"
      }

      this.tableData=[]
      this.total=0
      var v;
      var v1;
      const dt = new Date();
    const dt1 = new Date();
      dt.setTime(dt.getTime()-86400000);
      dt1.setTime(dt.getTime()-2592000000);
      v=this.dateFormat(dt);
      v1=this.dateFormat(dt1);
      if(this.datatime.length == 0) {
          this.$notify.error({
           title: '错误',
            message: '请补全时间信息'
          });
      }else{
        console.log(this.downloadflag)
        this.temp_datatime = this.dateFormat_End(this.datatime);
        request.post('monitor/page/DataError', null, {
        params:
        { 
          downloadflag:this.downloadflag,
          flag:flag,
          perPage: this.perPage,
          currentPage:this.temp_currentPage,
          province_code: this.value[0],
          city_code: this.value[1],
          type: this.value2,
          equipment: this.value3,
          timeLow:this.datatime,
          timeHigh:this.temp_datatime,
        },
       }
       ).then(({ data: response }) => {
         if(this.value3==""){ 
          this.total=response.data.count
         }else{
           this.total=1
         }
         if(this.downloadflag==0){
        for(var i=0;i<response.data.data1.length;i++){
          this.tableData[i]={dev_region:response.data.data1[i].dev_region,province:response.data.data1[i].dev_province,
          city:response.data.data1[i].dev_city,dev_type:response.data.data[i].dev_type,dev_id:response.data.data[i].dev_id,
          temp_score:response.data.data[i].temp_score}
        }
         }
          if(this.downloadflag==1){
            
             for(var i=0;i<response.data.data1.length;i++){
            this.tableData[i]={dev_region:response.data.data1[i].dev_region,province:response.data.data1[i].dev_province,
          city:response.data.data1[i].dev_city,dev_type:response.data.data[i].dev_type,dev_id:response.data.data[i].dev_id,
          temp_score:response.data.data[i].temp_score
          }
          }
          }
           this.tableData=JSON.parse(JSON.stringify(this.tableData)); 
        console.log(this.tableData)
   
        this.current_Page=this.temp_currentPage
       }).catch((err) => {
        
       });
       }
       },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.perPage=val;
      this.current_Page=1;
      this.temp_currentPage = 1;
        this.fanye=1
        this.emigrate_monitoring();
          this.fanye=0
       },
     handleCurrentChange(val) {

      console.log(`当前页: ${val}`);
      this.current_Page=val;
      this.temp_currentPage = val;
        console.log( this.current_Page);
  this.fanye=1
        this.emigrate_monitoring();
          this.fanye=0
       },
       indexMethod(index){
        if(this.downloadflag == 1){
           this.current_Page=1
         }else{
         //this.current_Page=this.temp_currentPage
         }
        return(this.current_Page-1)*this.perPage+index+1;
       },
       // 地区框切换触发函数
       handleChange() {
       this.value2 = []
       this.value3 = []
       request.post('monitor/page/gettype', null, {
        params:
          { 
            flag: this.value.length,
            province_code: this.value[0],
            city_code: this.value[1],
          },
       }).then(({ data: response }) => {
        console.log(response.data.data)
        this.options2 = response.data.data
        this.options3=response.data.data1;

       }).catch((err) => {
       });  
       },
       handleSelect2()//设备号触发函数:当按省份型号查询后，取消型号后再次选择设备号时会执行此条函数
       { 
             
        request.post('monitor/page/gettype', null, {
    

        params:
          { 
            flag: this.value.length,
            province_code: this.value[0],
            city_code: this.value[1],
          },
       }).then(({ data: response }) => {
        console.log(response.data.data)

        this.options3=response.data.data1;

       }).catch((err) => {
       });  
       },
        // 型号框输入触发函数
    handleSelect() {
      console.log(this.value2)
      var shebeiflag
      shebeiflag= this.value.length//0：只有型号查询 1：省份和型号 2：省份城市和型号
      if (this.value2.length == 0) {//型号空时
        if(shebeiflag==0){
          shebeiflag=3//地区型号空
        }
           
      } 
        request.post('monitor/page/getequipment', null, {
          params:
          { 
            flag: shebeiflag,
            province_code: this.value[0],
            city_code: this.value[1],
            type: this.value2
          },
        }).then(({ data: response }) => {
          console.log(response.data.data)
          this.options3 = response.data.data

        }).catch((err) => {
        });  
      
    },
    // 型号输入框获取相似选项
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
    // 设备输入框获取相似选项
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
  },
  created() {
     request.post('monitor/page/ceshi', null, {
         params:
         { 
         },
       }).then(({ data: response }) => {
         console.log(response.data);
         this.options2=response.data.data;  //型号框下拉内容
         this.options3=response.data.data1;   //设备框下拉内容
       }).catch((response) => {
       });   //型号设备下拉框前后端交互

           //默认时间显示近一周
    const dt  = new Date();
    //const dt1 = new Date();
    dt.setTime(dt.getTime());
    //dt1.setTime(dt.getTime()-604800000);  //一周
    //this.datatime[0]=this.dateFormat(dt1),//一周前的时间
    this.datatime=this.dateFormat_Strat(dt-86400000);  //今天的时间
     
    this.axios.get( "data/chinacity copy.json").then((response)=>{
      this.options = response.data;
      this.options = JSON.parse(JSON.stringify(this.options)); 
    }).catch((response)=>{
    })
     this.emigrate_monitoring()
  },
};
</script>

<style lang="scss">
.el-dialog {
     display: flex;
     flex-direction: column;
     margin:0 !important;
     position:absolute;
     top:50%;
     left:50%;
     transform:translate(-50%,-50%);
     height:500px;
     max-height:calc(100% - 200px);
     max-width:calc(100% - 200px);
     width:67%
}
</style>
