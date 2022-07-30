<template>
  <div id="app1">
   
 <div class="search" align="center" style="margin-top:20px;">
   <el-form ref="form" class="ItemInfo" :model="equipment_info" label-width="80px" :inline="true">
    <span>地区：</span>
    <el-cascader
   ref="cascaderAddr"
     v-model="value"
    :options="options"
     @change="handleChange"
      placeholder="请选择地区"
     style="width:250px; margin-right:0px;"
     filterable
    clearable></el-cascader>
     <span style="margin-left:30px">型号：</span>
    <el-cascader
     v-model="value2"
     ref="cascaderAddr1"
      @change="handleChange1"
    :options="typelist"
     placeholder="请选择型号"
     style="width:200px; margin-right:0px;"
     filterable
    clearable></el-cascader>
    <el-button type="text" style="margin-left:30px;" @click="chooseType">{{chooseTypetext}}<i class="el-icon-caret-right" v-if="!chooseTypeflag"></i><i class="el-icon-caret-left" v-if="chooseTypeflag"></i></el-button>
    <el-cascader
    v-if="chooseTypeflag"
     v-model="value3"
     ref="cascaderAddr2"
     @change="handleChange2"
    :options="appliancelist"
     placeholder="请选择设备"
     style="width:200px; margin-right:0px;"
      filterable
    clearable></el-cascader>

      <span style="margin-left:30px">日期: </span>
      <el-date-picker
      id="time"
      v-model="datatime"
        style="width:250px; margin-right:10px;"
      type="daterange"
      align="right"
     range-separator="-"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      format="yyyy-MM-dd"
      value-format="yyyy-MM-dd">
    </el-date-picker>
    <el-button type="primary" @click="search" style="margin-right:10px;">查询</el-button>
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
</el-form>
    </div>
    
        <el-card   v-if="filterflag" style="margin-top:10px;margin-bottom:10px"  class="box-card" shadow="never">
          <span>恒温片段划分：</span>
    <el-radio-group style="margin-top:10px;margin-bottom:0px"  v-model="radio3" @change="changefilter">
      <el-radio  style="margin-right:50px;" label="不限"></el-radio>
      <el-radio style="margin-right:50px;"  label="有效"></el-radio>
      <el-radio style="margin-right:50px;"  label="无效" ></el-radio>
    </el-radio-group>
    <br>
    <el-divider style="margin-top:0px; margin-bottom:0px" ></el-divider>
        <span style="margin-top:0px;margin-bottom:0px" >温度模式：</span>
  <el-radio-group style="margin-top:10px;margin-bottom:0px" v-model="radio4" :disabled="modelflag" @change="changefilter">
      <el-radio  style="margin-right:80px;margin-top:0px;margin-bottom:0px" label="不限" ></el-radio>
      <el-radio style="margin-right:80px;"  label="恒温"></el-radio>
      <el-radio style="margin-right:80px;"  label="不恒温"></el-radio>
      <el-radio style="margin-right:80px;"  label="加热异常"></el-radio>
      <el-radio style="margin-right:80px;"  label="恒温异常"></el-radio>
      <el-radio style="margin-right:80px;"  label="加热异常+恒温异常"></el-radio>
      <el-radio style="margin-right:50px;" v-if="radio3=='不限'"  label="无效片段"></el-radio>
    </el-radio-group>
     <br style="margin-top:10px;">
      <el-divider style="margin-top:0px; margin-bottom:0px" ></el-divider>
      <!-- <span>水流量片段划分：</span>
    <el-radio-group style="margin-top:10px;margin-bottom:0px"  v-model="radio5" @change="changefilter">
      <el-radio  style="margin-right:50px;" label="不限"></el-radio>
      <el-radio style="margin-right:50px;"  label="有效"></el-radio>
      <el-radio style="margin-right:50px;"  label="无效" ></el-radio>
    </el-radio-group>
    <br style="margin-top:10px;">
      <el-divider style="margin-top:0px; margin-bottom:0px" ></el-divider> -->
        <span style="margin-top:0px;margin-bottom:0px" >水流量模式：</span>
  <el-radio-group style="margin-top:10px;margin-bottom:0px" v-model="radio1" @change="changefilter">
      <el-radio  style="margin-right:80px;margin-top:0px;margin-bottom:0px" label="不限" ></el-radio>
      <el-radio style="margin-right:80px;"  label="稳定"></el-radio>
      <el-radio style="margin-right:80px;"  label="不稳定"></el-radio>
      <el-radio style="margin-right:80px;"  label="阶跃"></el-radio>
      <el-radio style="margin-right:80px;"  label="震荡"></el-radio>
      <el-radio style="margin-right:50px;" v-if="radio3!='有效'" label="无效片段"></el-radio>
    </el-radio-group>
    <br>
     <el-divider style="margin-top:0px; margin-bottom:0px" ></el-divider>
          <span style="margin-top:0px;margin-bottom:0px" >温度受水流量波动影响：</span>
  <el-radio-group style="margin-top:10px;margin-bottom:0px" v-model="radio5" @change="changefilter">
      <el-radio  style="margin-right:80px;margin-top:0px;margin-bottom:0px" label="全部" ></el-radio>
      <el-radio style="margin-right:80px;"  label="有影响"></el-radio>
      <el-radio style="margin-right:80px;"  label="无影响"></el-radio>
    </el-radio-group>
    <br>
        
     <el-divider style="margin-top:0px; margin-bottom:0px" ></el-divider>
          <span style="margin-top:0px;margin-bottom:0px" >故障类型：</span>
  <el-radio-group style="margin-top:10px;margin-bottom:0px" v-model="radio6" @change="changefilter">
      <el-radio  style="margin-right:80px;margin-top:0px;margin-bottom:0px" label="无故障+故障" ></el-radio>
      <el-radio style="margin-right:80px;"  label="熄火异常"></el-radio>
      <el-radio style="margin-right:80px;"  label="加热不足"></el-radio>
     
    </el-radio-group>
    <br>
      <el-divider style="margin-top:0px; margin-bottom:0px" ></el-divider>
      <span>有效时长：</span>
  <el-radio-group style="margin-top:10px;margin-bottom:0px"  v-model="radio2" @change="changefilter">
    
      <el-radio  style="margin-right:50px;" label="不限"></el-radio>
      <el-radio style="margin-right:50px;"  label="0-30秒"></el-radio>
      <el-radio style="margin-right:50px;"  label="30秒-3分钟" ></el-radio>
      <el-radio style="margin-right:50px;"  label="3-10分钟" ></el-radio>
      <el-radio style="margin-right:50px;"  label="10分钟以上" ></el-radio>
    </el-radio-group>
     <br style="margin-top:10px;">
      <el-divider style="margin-top:0px; margin-bottom:0px" ></el-divider>
     <div class="popover1" style="margin-top:0px;height:50px" >

    <span  style="margin-top:0px;display:inline-block;height:50px">温度评分：</span>
     <el-slider
      v-model="average"
      @change="changefilter"
      style="width:500px; margin-top:0px;margin-left:30px;display: inline-block;margin-bottom:0px"
      range
      :step="10"
      :marks="marks"
      :max="100">
    </el-slider>
     </div>
     
      
</el-card>
 <el-table ref="tableRef"
 :data="tableData" @sort-change="changeTableSort" border height="800" style="width: 100%;margin-top:0px" align="center" :cell-style="tableRowClassName1"
      :default-sort = "{prop: 'temp_score', order: 'ascending'}">
       <el-table-column  type="index"  align="center" width='60px' label="序号"></el-table-column>
        <!-- <el-table-column  prop="dev_type" align="center" width='120px' label="型号"></el-table-column> -->
      <el-table-column  prop="dev_id" align="center" width='150px' label="设备"></el-table-column>
       <el-table-column  prop="temp_pattern" align="center" column-key="temp_pattern"
         label="温度模式"></el-table-column>
        <!--<el-table-column  prop="fault_code" align="center"  label="故障类型"></el-table-column>-->
        <el-table-column  prop="e1num" align="center"  label="熄火次数"></el-table-column>
        <el-table-column  prop="heat_temp_score" align="center" sortable label="加热段评分"></el-table-column>
        <el-table-column  prop="stable_temp_score" align="center" sortable label="恒温段评分"></el-table-column>

         <el-table-column  prop="temp_score" align="center" sortable label="温度评分"></el-table-column>
         <el-table-column  prop="new_temp_score" align="center" sortable label="新温度评分"></el-table-column>
         <el-table-column  prop="score_by_weight" align="center" sortable label="分权重评分"></el-table-column>
       <el-table-column  prop="water_pattern" align="center" column-key="water_pattern"
         :filters="[{text: '稳定模式', value: '稳定模式'}, {text: '阶跃模式', value: '阶跃模式'}, {text: '震荡模式', value: '震荡模式'}]"
      :filter-method="filterHandler"
         label="水流量模式"></el-table-column>
      <el-table-column  prop="water_score" align="center" sortable label="水流量评分"></el-table-column>
      <el-table-column  prop="effect_flag" align="center"  label="温度受水流量波动影响"></el-table-column>
      <el-table-column  prop="start_time" align="center" sortable label="开始时间"></el-table-column>
      <el-table-column  prop="end_time" align="center" sortable label="结束时间"></el-table-column>
      <el-table-column  prop="duration_time" align="center" sortable label="用水时长" :sort-method="(a,b) => sortBytime(a ,b , 'duration_time')" column-key="duration_time"></el-table-column>
      <el-table-column  prop="heat_duration" align="center" sortable label="升温时间" :sort-method="(a,b) => sortBytime(a ,b , 'heat_duration')"></el-table-column>
      <el-table-column  prop="un_stable_temp_percent" align="center" sortable label="恒温异常占比%"></el-table-column>
      <!-- <el-table-column v-if="false" prop="extreme" align="center" sortable label="极差"></el-table-column> -->
      <el-table-column  prop="overshoot_value" align="center" sortable label="温度超调℃"></el-table-column>
      <el-table-column  prop="state_accuracy" align="center" sortable label="温度稳态精度℃"></el-table-column>
      <!-- <el-table-column v-if="false" prop="deviation" align="center" sortable label="标准差"></el-table-column> -->
      <el-table-column
      label="操作"
      align="center">
      <template slot-scope="scope">
        <el-button
          @click="jumppage(scope.row)"
          type="text"
          size="small"
          align="left">
         运行曲线
        </el-button>
      </template>
    </el-table-column>
    
      </el-table>

     <el-dialog :visible="drawer" show-close center @close='closeDialog' fullscreen>
       <!--<div :class="[fullScreenStatus.tracks ? 'fullscreen' : 'myChart']">-->
        <h3 style="margin-top:0px;margin-left:0px" align="center">{{daytime}}{{city}}{{" "}}{{" "}}燃气热水器片段运行状态{{" "}}{{" "}}{{type}}</h3>
        <div align="center">
          <span>温度片段模式：{{pattern[0]}}</span>
          <span style="margin-left:20px">水流量片段模式：{{pattern[1]}}</span>
          <span style="margin-left:20px">温度曲线颜色：</span>
          <el-tag type="warning"  style="margin-right:50px;">加热段正常</el-tag>
          <el-tag type="success" style="margin-right:50px;">恒温段稳定</el-tag>
          <el-tag  type="danger" style="margin-right:50px;">加热段/恒温段异常部分</el-tag>
      
        </div>
        <div id='myChart' ></div>
<br>
    <sapn style="margin-top:60px;margin-left:180px;">温度评分指标</sapn>
        <div align="center">
          <el-table :data="tableData4" border  style="width: 80%;margin-left:0px;;margin-top:0px;">
            <el-table-column  prop="temp_score" align="center"  label="温度评分" ></el-table-column>
            <el-table-column  prop="heat_temp_score" align="center"  label="升温段评分" ></el-table-column>
           <el-table-column  prop="stable_temp_score" align="center"  label="恒温段评分" ></el-table-column>
         <el-table-column  prop="score_by_weight" align="center"  label="分权重评分" ></el-table-column>
   <el-table-column  prop="heat_weight" align="center"  label="升温段评分权重" ></el-table-column>
   <el-table-column  prop="stable_weight" align="center"  label="恒温段评分权重" ></el-table-column>
    <el-table-column  prop="heat_percent" align="center"  label="升温时长占比" ></el-table-column>
        </el-table>
        </div>

        <sapn style="margin-top:170px;margin-left:180px;">水流量指标</sapn>
        <div align="center">
          <el-table :data="tableData2" border  style="width: 80%;margin-left:0px;margin-top:0px;">
            <el-table-column  prop="duration_time" align="center"  label="用水时长" ></el-table-column>
            <el-table-column  prop="deviation" align="center"  label="标准差"></el-table-column>
            <el-table-column  prop="up" align="center"  label="向上突变次数"></el-table-column>
            <el-table-column  prop="down" align="center"  label="向下突变次数"></el-table-column>
        </el-table>
        </div>

        <sapn style="margin-top:10px;margin-left:180px;">温度指标</sapn>
         <div align="center">
        <el-table :data="tableData3" border  style="width: 80%;margin-top:0px;">
            <el-table-column  prop="heat_duration" align="center"  label="升温时长" ></el-table-column>
            <el-table-column  prop="un_stable_temp_duration" align="center"  label="不恒温时长"></el-table-column>
            <el-table-column  prop="un_stable_temp_percent" align="center"  label="不恒温占比"></el-table-column>
            <el-table-column  prop="un_heat_dev" align="center"  label="偏离程度"></el-table-column>
        </el-table>
        </div>
        </el-dialog>
    <!-- </div>-->
     
 </div>
</template>

<style>
  .el-table .stable-row {
    background: #1981196c;
  }

  .el-table .heatabnormal-row {
    background: #f1b02373;
  }
   .el-table .stableabnormal-row {
    background: #ff6a6a62;
  }
  .el-table .bothabnormal-row {
    background: #a706068c;
  }
  .el-table .invalid-row {
    background: #9c9c9c8c;
  }
</style>
<script>
import request from '@/utils/request';
import Manager from "@/assets/js/test.js";//求指标
import JsonExcel from 'vue-json-excel';

var time1=[]
var temp_num=[]
var jumpinitialflag=false
var heatnormal=[]
var stabletempnormal=[]
var abnormal=[]
var heatstage=[]
var stablestage=[]
var wuxiao=[]
var watereffectstage=[]
var watereffect=[]
export default {
  components: {
      'download-excel': JsonExcel
    },

  data() {
    return {
             fullScreenStatus: {
            tracks: false,
        },
      valu4:'',//型号中转
      modelflag:false,//是否禁用模式划分筛选标志位
      outpwm2:[[]],
      outpwm1:[],
      ut:[],
      ut1:[],
      ut2:[],
      options:[],
      value:'',
      options1:[],
      value2:[],
      value3:[],
      searchlist:[],
      appliancelist:[],
      typelist:[],
      datatime:[],
       tableData:[],
      temp_flag:[],
       temp_flag1:[],
        temp_flag2:[],
       tableData2:[],//水流量指标
       tableData1:[],
       tableData3:[],//温度指标
       tableData4:[],
       inTemp:[],
       inTemp1:[],
       inTemp2:[],
       fenduan:[],
       fenduan1:[],
       fenduan2:[],
       outTemp:[],
       outTemp1:[],
       outTemp2:[],
     hengwen:[],
shengwen:[],
yichang:[],
       outpwm:[],
       outpwmtime:[],
       flow:[],
          flow1:[],
             flow2:[],
       setTemp:[],
          setTemp1:[],
             setTemp2:[],
       heat_temp_score:[],
       stable_temp_score:[],
       flame:[],
        flame1:[],
         flame2:[],
       watereffect:[],
         watereffect1:[],
           watereffect2:[],
       color:[],
        drawer: false,
        valuearray:[],
        filterflag:true,
        radio1:'不限',//水流量模式筛选项
        radio2:"不限",//时长筛选项
        radio3:"有效",//温度有效片段筛选项
        radio4:"不恒温",//恒温模式筛选项
        radio5:"全部",//水流波动对温度影响
        radio6:"无故障+故障",
        average:[0,100],
        marks: {
          0: '0',
          30: '30',
          60: '60',
          90: '90',
          100:'100',
        },
        daytime:'',
        city:'',
        type:'',
        chooseTypeflag:true,
        chooseTypetext:'可设备单选',
        pattern:[],
         json_fields: {
          "设备":{ 
            field:"dev_id",
            callback:value =>{
              return  "&nbsp;" +value;
            }
            },
           '温度模式': 'temp_pattern', 
           '加热段评分': 'heat_temp_score', 
           '恒温段评分': 'stable_temp_score', 
           '温度评分': 'temp_score', 
           '新温度评分': 'new_temp_score', 
           '分权重评分':'score_by_weight',
           '水流量模式': 'water_pattern', 
           '水流量评分': 'water_score', 
           '温度受水流量波动影响': 'effect_flag', 
           '故障类型':'fault_code',
           '开始时间': 'start_time', 
           '结束时间': 'end_time', 
           '用水时长': 'duration_time', 
           '升温时间': 'heat_duration', 
           '恒温异常占比%': 'un_stable_temp_percent', 
           '温度超调℃': 'overshoot_value', 
           '温度稳态精度': 'state_accuracy', 
          
          },
    };
  },
  methods:{
    sortBytime(obj1, obj2, column){
     // console.log(obj1, obj2, column)
      var at = this.time2sec(obj1[column])
      var bt = this.time2sec(obj2[column])
    //  console.log(at, bt)
      if(at>bt){
        return 1
      }else{
        return -1
      }
    },

    sortBy(obj1,column,order){
      var condition=[];
      if(column=='duration_time'||column=='heat_duration'){
        for(var i=0;i<obj1.length;i++){
          condition[i]=this.time2sec(obj1[i][column])
        }
      }else{
        for(var i=0;i<obj1.length;i++){
          condition[i]=obj1[i][column]
        }
      }
      if(order=='ascending'){                 //升序
        var space={};
        var space1=0;
        for(var i=0;i<obj1.length-1;i++){
          for(var j=i+1;j<obj1.length;j++){
            if(condition[i]>condition[j]){
              space1=condition[i];
              condition[i]=condition[j];
              condition[j]=space1;
              space=obj1[i];
              obj1[i]=obj1[j];
              obj1[j]=space;
            }
          }
        }
      }else if(order=='descending'){          //降序
        var space={};
        var space1=0;
        for(var i=0;i<obj1.length-1;i++){
          for(var j=i+1;j<obj1.length;j++){
            if(condition[i]<condition[j]){
              space1=condition[i];
              condition[i]=condition[j];
              condition[j]=space1;
              space=obj1[i];
              obj1[i]=obj1[j];
              obj1[j]=space;
            }
          }
        }
      }
   //   console.log(obj1)
      return obj1;
    },
    changeTableSort(item){
			let that = this
  //    console.log(item)
      for(var i=0;i<that.tableData.length;i++){
        that.tableData[i].children=that.sortBytime1(that.tableData[i].children,item.prop,item.order);
      }
		},
    chooseType(){
        this.chooseTypeflag=!this.chooseTypeflag
        if(this.chooseTypeflag==false){
          this.chooseTypetext='可型号单选'
          this.value3=[]
          this.search()
        }else{
          this.chooseTypetext='所有设备'
        }
      },
    closeDialog(){
      this.drawer=false
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
    //城市改变选择型号信息
     handleChange(value){
   this.options1=[]
    this.value2=[]
    this.searchlist=[]
    this.typelist=[]
    var equipment_flag=0
     if(this.value2.length==0){
       equipment_flag=1
     }
     else{
       equipment_flag=0
     }

      request.post('tableStoreDates/page/list', null, {
        params:
        { 
          equipment_flag:equipment_flag,
          city: value[1], 
          pagetype: 'model2_vue'
          // timeLow : this.datatime[0],    //时间范围
          // timeHigh : this.datatime[1],
        },
      }).then(({ data: response }) => {
        var j=0
        for(var i=0; i<response.data.devtype.length;i++){
            this.options1[i]={label:response.data.devtype[i],
                              value:response.data.devtype[i],
                              children:[]
                              
            }
            this.searchlist[i]=response.data.devtype[i],
            this.typelist[i]={
                             label:response.data.devtype[i],
                              value:response.data.devtype[i],
            }
        }
            for(var i=0;i<response.data.devid.length;i++){
                
                j=response.data.devtype.indexOf(response.data.total[i])
               this.options1[j].children[ this.options1[j].children.length]={
                                                                label:response.data.devid[i],
                              value:response.data.devid[i]

               }
                           
            }
     //   console.log(this.options1)
       this.typelist=JSON.parse(JSON.stringify(this.typelist)); 
       if(this.$route.query.id!=undefined){
         if(jumpinitialflag==false){
           this.value2=[this.$route.query.type]
           setTimeout(() => {
       //      console.log(this.$route.query.type);
         this.handleChange1(this.value2)
          this.value3=[this.$route.query.id]
        //  this.value3=JSON.parse(JSON.stringify(this.value3))
          //  this.chooseTypeflag=true
       //    console.log(this.value3)
           jumpinitialflag=true
           this.search()
       }, 500)

         }else{
           this.value2=[this.options1[0].value]
           setTimeout(() => {
         this.handleChange1(this.value2)
       }, 50)
         }
       }else{
          this.value2=[this.options1[0].value]
   //       console.log(this.value2)
          setTimeout(() => {
         this.handleChange1(this.value2)
       }, 50)
       }
  //    console.log(this.options1[0])
      }).catch((err) => {
        this.$message.error(err);
        // console.log(err);
      });


    },
    //城市改变选择型号信息
     handleChange1(value){
   this.appliancelist=[]
    this.value3=[]
    
           var num=0
           var equ_total=[]
           var equ_num=0
num=this.searchlist.length
             
  for(j=0;j<num;j++){
               equ_num=equ_num+this.options1[j].children.length
               equ_total[j]=this.options1[j].children.length}
            
if(this.value2.length!=0){

              
              
            
         //      console.log(equ_total)
               //console.log(this.options1)
                
                j=this.searchlist.indexOf(value[0])
            //    console.log(j)
                
                for(var i=0;i<this.options1[j].children.length;i++){
              this.appliancelist[i]={
                              label: this.options1[j].children[i].label,
                              value: this.options1[j].children[i].value,
              }
               }
                           
            }else if(this.value2.length==0){    
   
               // j=this.searchlist.indexOf(value[0])

              var x=0
              for(var j=0;j<num;j++){
             
           
             for(var i=0;i<equ_total[j];i++){
              
              
              this.appliancelist[x++]={
                              label: this.options1[j].children[i].label,
                              value: this.options1[j].children[i].value,
              
            }
              }
               }
              
            }
       // console.log(this.value3)
       this.appliancelist=JSON.parse(JSON.stringify(this.appliancelist)); 
       


    },
    handleChange2(value){
 var num=0
           var equ_total=[]
           //var equ_num=0
num=this.searchlist.length
             
  for(j=0;j<num;j++){
              // equ_num=equ_num+this.options1[j].children.length
               equ_total[j]=this.options1[j].children.length}
//console.log(this.options1)
            for(var j=0;j<num;j++){
               for(var i=0;i<equ_total[j];i++){
              if (this.value3==this.options1[j].children[i].label)

               {    this.value2=this.options1[j].label
                    //this.value2[0]=this.options1[j].label
               }

              }
            }
    },
    //显示运行曲线
    jumppage(row){
       this.fullScreenStatus[row] = !this.fullScreenStatus[row]
this.hengwen=[]
this.shengwen=[]
this.yichang=[]
this.ut1=[]
this.ut2=[]
this.outpwm1=[]
this.outpwm2=[]
this.inTemp1=[]
this.inTemp2=[]
this.fenduan1=[]
this.fenduan2=[]
this.flame2=[]
this.flow2=[]
this.watereffect2=[]
this.temp_flag2=[]
this.outTemp2=[]
this.setTemp2=[]
time1=[]
this.outpwmtime=[]

      this.pattern[0]=row.temp_pattern
      this.pattern[1]=row.water_pattern
           var v;
       var v1;
            const dt = new Date(row.start_time);
            const dt1 = new Date(row.end_time);
//             dt.setTime(dt.setSeconds(dt.getSeconds()-1));
            v=this.dateFormat(dt);
            v1=this.dateFormat(dt1);
 request.post('indextemp/page/initialize', null, {
        params:
        { 
          city: this.value[1], 
          dev_id: row.dev_id,
          flag:"1",
          timeLow : v,    //时间范围
          timeHigh : v1,
        },
      }).then(({ data: response }) => {
      
        //console.log(response.data.data2.heat_temp_score)
        time1 = response.data.data_time;
       // console.log(time1)
        this.daytime=time1[0].slice(0,11)
        this.tableData3=response.data.data1
     this.tableData4[0]={temp_score:response.data.data1[0].new_temp_score,
     heat_temp_score:response.data.data1[0].heat_temp_score,
     stable_temp_score:response.data.data1[0].stable_temp_score,
     score_by_weight:response.data.data1[0].score_by_weight,
     heat_weight: Number(response.data.data1[0].heat_weight).toFixed(3),
      stable_weight:Number(1-response.data.data1[0].heat_weight).toFixed(3),
     heat_percent:Number(response.data.data1[0].heat_percent).toFixed(3),
     }
     this.tableData4=JSON.parse(JSON.stringify(this.tableData4)); 
      for(var i=0;i<time1.length;i++){
        this.temp_flag[i]=Number(response.data.temp_pattern[i])
        this.flame[i]=Number(response.data.flame[i])*10
        temp_num[i]=response.data.data[i].temp_pattern
        this.watereffect[i]=Number(response.data.effect_mark[i])*10
      }



for(var i=0;i<response.data.aliyun_info.length;i++){
          this.outpwmtime[i]=response.data.aliyun_info[i].datatime
          this.outpwm[i]=response.data.aliyun_info[i].actualpwm

          this.fenduan[i]=response.data.aliyun_info[i].comloadsegment
          this.ut[i]=response.data.aliyun_info[i].ut

}

this.ut1=this.yiweishuzu(this.outpwmtime,this.ut)
this.ut2=this.erweishuzu(this.ut1)
this.outpwm1=this.yiweishuzu(this.outpwmtime,this.outpwm)
this.fenduan1=this.yiweishuzu(this.outpwmtime,this.fenduan)
this.fenduan2=this.erweishuzu(this.fenduan1)

 this.outpwm2=this.erweishuzu(this.outpwm1)
 this.temp_flag1=this.yiweishuzu(time1,this.temp_flag)
this.temp_flag2=this.erweishuzu(this.temp_flag1)
        
  this.flame1=this.yiweishuzu(time1,this.flame)
this.flame2=this.erweishuzu(this.flame1)


   this.watereffect1=this.yiweishuzu(time1,this.watereffect)
this.watereffect2=this.erweishuzu(this.watereffect1)



     
//console.log(this.outpwmtime)

//console.log(this.outpwm)


//console.log(this.outpwm2)
     // console.log(response.data)
      
        this.inTemp=response.data.in_temp;
        console.log(time1)
        this.inTemp1=this.yiweishuzu(time1,this.inTemp)
//console.log(this.inTemp1)
 this.inTemp2=this.erweishuzu(this.inTemp1)

 //console.log(this.inTemp2)
        this.setTemp = response.data.set_temp;
        this.outTemp = response.data.out_temp;
       this.flow = response.data.flow;

   this.setTemp1=this.yiweishuzu(time1,this.setTemp)
this.setTemp2=this.erweishuzu(this.setTemp1)
   this.outTemp1=this.yiweishuzu(time1,this.outTemp)
this.outTemp2=this.erweishuzu(this.outTemp1)
//console.log(this.outTemp2)
   this.flow1=this.yiweishuzu(time1,this.flow)
this.flow2=this.erweishuzu(this.flow1)
       this.heat_temp_score = response.data.heat_temp_score;
       //console.log(eat_temp_score)
       this.stable_temp_score = response.data.stable_temp_score;
      //  console.log(this.$refs['cascaderAddr'].getCheckedNodes())
       var name=this.$refs['cascaderAddr'].getCheckedNodes()
      this.city=name[0].pathLabels[0]+name[0].pathLabels[1];
        // name=this.$refs['cascaderAddr1'].getCheckedNodes()
       this.type="机型："+this.value4+" 设备："+row.dev_id;

     this.tableData2[0]={duration_time:row.duration_time,
     extreme:row.extreme,
     average:row.average,
     deviation:row.deviation,
     up: Manager.Confirm(this.flow).up,
     down:Manager.Confirm(this.flow).down,
     }
     this.tableData2=JSON.parse(JSON.stringify(this.tableData2)); 



     console.log(row.duration_time)
     console.log(this.tableData2[0])
     this.colorDifferenciate(row.temp_pattern)
  setTimeout(() => {
    
    this.drawTable();
   
  }, 10);
      
       this. drawer=true
      }).catch((err) => {
        this.$message.error(err);
        // console.log(err);
      });

    },

yiweishuzu(time,value){//时间+变量值构成的一维数组
  let yiweishuzu = [];
var a=0
var b=0
for(var i=0;i<2*time.length;i++){
          if(i%2==0||i==0){
            yiweishuzu[i]=time[a++]
          }else{
             yiweishuzu[i]=value[b++]
          }
}
return yiweishuzu
},
erweishuzu(yiweishuzu){//一维数组按2平分成二维数组
let obj = [];

const len = 2;

  for (let i = 0; i < yiweishuzu.length; i++) {  // 循环截取  每次截取2个

       const arr = yiweishuzu.slice(i, i + 2);

      obj.push(arr);

       i = i + len - 1;

     }
     return obj
},

    //默认筛选查询
     changefilter(value){
           var model=''
           var model1=''
           var timelength=''
           var timelow=''
           var timehigh=''
           var effect_flag=''
           
     // console.log(value)
       
        if(this.radio2=="不限"){
         timelength=0
         timelow=0
       }else if(this.radio2=="0-30秒"){
         timelength=1
         timelow=0
         timehigh=30
       }else if(this.radio2=="30秒-3分钟"){
         timelength=2
          timelow=30
         timehigh=180
       }else if(this.radio2=="3-10分钟"){
         timelength=3
          timelow=180
         timehigh=600
       }else if(this.radio2=="10分钟以上"){
         timelength=4
          timelow=600
       //  timehigh=120
       }
       
       //恒温片段划分
       if(this.radio3=='不限'){
         this.modelflag=false
         //温度模式
         if(this.radio4=="不限"){
         model1="00"
       }else if(this.radio4=="恒温"){
         model1="011"
       }else if(this.radio4=="不恒温"){
         model1="02"
       }else if(this.radio4=="加热异常"){
         model1="021"
       }else if(this.radio4=="恒温异常"){
         model1="012"
       }else if(this.radio4=="加热异常+恒温异常"){
         model1="022"
       }

       else if(this.radio4=="无效片段"){
         model1="03"
       }
       }else if(this.radio3=='有效'){
         this.modelflag=false
         //温度模式
         if(this.radio4=="不限"){
         model1="10"
       }else if(this.radio4=="恒温"){
         model1="111"
       }else if(this.radio4=="不恒温"){
         model1="12"
       }else if(this.radio4=="加热异常"){
         model1="121"
       }else if(this.radio4=="恒温异常"){
         model1="112"
       }else if(this.radio4=="加热异常+恒温异常"){
         model1="122"
       }

       }else if(this.radio3=='无效'){
         this.modelflag=true
         model1="23"
       }
         //水流量模式
       if(this.radio1=="不限"){
         this.levelflag=false
         model=1
       }else if(this.radio1=="稳定"){
         this.levelflag=false
         model=6
       }else if(this.radio1=="阶跃"){
         this.levelflag=true
         model=7
       }else if(this.radio1=="震荡"){
         this.levelflag=true
         model=8
       }else if(this.radio1=="不稳定"){
        model=5
       }else if(this.radio1=="无效片段"){
        model=9
       }
       //水流量模式
       if(this.radio5=="全部"){
        effect_flag='2'
       }else if(this.radio5=="有影响"){
        effect_flag='1'
       }else if(this.radio5=="无影响"){
         effect_flag='0'
       }

       var fault_flag=''
       if(this.radio6=="熄火异常"){
         fault_flag='E0'
       }else if(this.radio6=="加热不足"){
         fault_flag='E1'
       }else if(this.radio6=="无故障+故障"){
         fault_flag='all'
       }
    
       var flag
       if(this.value3.length==0){
         flag=3
       }else{
         flag=2
       }
       var flag1
       if(value=="重新查询"){
         flag1=1
       }else{
         flag1=0
       }
      //  console.log(this.value2)
      //  console.log(this.value3[0])
       // console.log(this.value2[0])

if (Array.isArray) {
    if(Array.isArray(this.value2)) {
        this.value4=this.value2[0]
    }
    else {
      this.value4=this.value2
    }
    
    }

        //console.log(this.value4)
      request.post('indextemp/page/initialize', null, {
        params:
        {
          fault_flag:fault_flag,
          effect_flag:effect_flag,
          city: this.value[1],
          dev_type:this.value4, 
          dev_id: this.value3[0],
          timeLow : this.datatime[0],    //时间范围
          timeHigh : this.datatime[1],
          flag:flag,
          flag1:flag1,
          model: model,
          model1: model1,
          averagelow:this.average[0],  //温度评分范围
          averagehigh:this.average[1],
        },
      }).then(({ data: response }) => {
       
        console.log(response.data.data)
       this.tableData=[]
       this.tableData1=response.data.data
      // console.log(this.tableData1);
       if (response.data.data==""){
                  this.$message.error('很抱歉，查询结果为空');
    
       }

      var j=0
      for(var i=0;i<this.tableData1.length;i++){
            if(this.tableData1[i].fault_code=="E0"){
          this.tableData1[i].fault_code="熄火异常"
        }            if(this.tableData1[i].fault_code=="E1"){
          this.tableData1[i].fault_code="加热不足"
        }            if(this.tableData1[i].fault_code==""){
          this.tableData1[i].fault_code="无故障"
        }

        if(this.tableData1[i].effect_flag=="0"){
          this.tableData1[i].effect_flag="无影响"
        }
        if(this.tableData1[i].effect_flag=="1"){
          this.tableData1[i].effect_flag="有影响"
        }
        if(this.tableData1[i].water_pattern=="6"){
          this.tableData1[i].water_pattern="稳定模式"
        }else if(this.tableData1[i].water_pattern=="7"){
          this.tableData1[i].water_pattern="阶跃模式"
        }else if(this.tableData1[i].water_pattern=="8"){
            this.tableData1[i].water_pattern="震荡模式"
        }else{
          this.tableData1[i].water_pattern="无效片段"
        }
        if(this.tableData1[i].temp_pattern=="11"){
          this.tableData1[i].temp_pattern="恒温正常"
        }else if(this.tableData1[i].temp_pattern=="12"){
          this.tableData1[i].temp_pattern="恒温异常"
        }else if(this.tableData1[i].temp_pattern=="21"){
          this.tableData1[i].temp_pattern="加热异常"
        }else if(this.tableData1[i].temp_pattern=="22"){
          this.tableData1[i].temp_pattern="加热+恒温异常"
        }else if(this.tableData1[i].temp_pattern=="0"){
          this.tableData1[i].temp_pattern="无效片段"
        }

       if(timelength==0)
       {
        this.tableData[j++]=this.tableData1[i]
       }else if(timelength>=1&&timelength<4){
         var timetosec=this.time2sec (this.tableData1[i].duration_time)
         if(timetosec>=timelow&&timetosec<timehigh){
           this.tableData[j++]=this.tableData1[i]
         }
       }else{
           var timetosec=this.time2sec (this.tableData1[i].duration_time)
         if(timetosec>=timelow){
           this.tableData[j++]=this.tableData1[i]
           
         }
       }
      

      }
       this.tableData=JSON.parse(JSON.stringify(this.tableData)); 
   this.$nextTick(()=>{
	this.$refs.tableRef.doLayout()
})
      
     //console.log(this.tableData)
      }).catch((err) => {
//         this.$alert(err.response.data.msg, '通知', {
//           confirmButtonText: '确定',
//           callback: action => {
//             this.$message({
//               type: 'info',
//               message: `action: ${ action }`
//             });
//           }
//          })
      this.$confirm(err.response.data.msg, '提示', {
          confirmButtonText: '继续查询',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // this.$message({
          //   type: 'success',
          //   message: '删除成功!'
          // });
          this.changefilter("重新查询")
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消查询'
          });          
        });
      });
    },
    time2sec(time){
      var hour='';
      var min='';
      var sec='';
      var total=0;
      var j=0;
      var k=0;
      // hour=time.split('h')[0];
      // min=time.split('h')[1].split('m')[0];
      // sec=time.split('h')[1].split('m')[1].split('s')[0];
      for(var i=0;i<time.length;i++){
        if(time.slice(i,i+1)=='h'){
          hour=time.slice(0,i)
          j=i+1;
        }
        if(time.slice(i,i+1)=='m'){
          if(j!=0){
            min=time.slice(j,i)
          }else{
            min=time.slice(0,i)
          }
          k=i+1;
        }
        if(time.slice(i,i+1)=='s'){
          if(k!=0){
            sec=time.slice(k,i)
          }else{
            sec=time.slice(0,i)
          }
          k=i+1;
        }
      }
      total=hour*3600+min*60+(sec-0);
      // console.log(sec)
      return total;
    },
    sec2time(time){
      if(time<3600&&time>60){
        return Math.floor(time/60)+'m'+Math.floor(time%60)+'s'
      }else if(time<60){
        return time+"s"
      }else{
        return Math.floor(time/3600)+'h'+Math.floor(time%3600/60)+'m'+Math.floor(time%3600%60)+'s'
      }
    },
  
     filterHandler(value, row, column) {
        const property = column['property'];
       // console.log(property)
        return row[property] === value;
      },
      timeFormat:function(time) {
            var time1=new Date('12:23:23')
            
        var hours=time.split('h')
       var minutes=[]
       var seconds=[]
       var minute=''
       var second=''
       var hour='0'
    // 拼接 可改成自己所要的时间格式
         if(hours.length==1){
           minutes=hours[0].split("m")
           seconds=minutes[1].split("s")
          minute = minutes[0].toString().padStart(2, "0");
          second =seconds[0].toString().padStart(2, "0");
          hour=hour.toString().padStart(2,"0")

         }
         //console.log(seconds[0])
        // console.log(hour+":"+minute+":"+second)
    return hour+":"+minute+":"+second;
    },
    //时间格式
     dateFormat:function(time) {
    var date=new Date(time);
    var year=date.getFullYear();
    var month= date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
    var day=date.getDate()<10 ? "0"+date.getDate() : date.getDate();
    var hours=date.getHours()<10 ? "0"+date.getHours() : date.getHours();
    var minutes=date.getMinutes()<10 ? "0"+date.getMinutes() : date.getMinutes();
    var seconds=date.getSeconds()<10 ? "0"+date.getSeconds() : date.getSeconds();
    // 拼接 可改成自己所要的时间格式
    return year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;
    },
    //划分颜色
    colorDifferenciate(temp_pattern){
      var j=0;
      var k=0;
      var m=0;
      this.yichang=[]
     this.shengwen=[]
      this.hengwen=[]
      this.color=[]
      abnormal=[]
      heatnormal=[]
      stabletempnormal=[]
      heatstage=[]
      stablestage=[]
    
      watereffectstage=[]
      var waterflag
      var unwaterflag
            for(var i=0;i<temp_num.length;i++){
        if(watereffect[i]=="1"){
          waterflag=i
          break
        }
        }
            for(var i=0;i<temp_num.length;i++){
        if(watereffect[i]=="1"&&watereffect[i+1]=="0"){
          unwaterflag=i
          break
        }
        }
        console.log(temp_pattern)
if(temp_pattern!="无效片段"){ 
         wuxiao[0]=''
      wuxiao[1]=''
      var gappoint=temp_num.length-1
      //console.log(temp_num)
      for(var i=0;i<temp_num.length;i++){
       if(temp_num[i]!="1" && temp_num[i]!="2"&&temp_num[i]!="13"){
          gappoint=i
          break
        }
      }
      watereffectstage[0]=time1[waterflag]
      watereffectstage[1]=time1[unwaterflag]
      heatstage[0]=time1[0]
      heatstage[1]=time1[gappoint]
      stablestage[0]=time1[gappoint]
      stablestage[1]=time1[temp_num.length-1]
    
      if(temp_pattern==="加热异常"||temp_pattern==="加热+恒温异常"){
        abnormal.splice(j,0,0,gappoint)
        j=j+2
      }else{
        heatnormal.splice(k++,0,0,gappoint)
      }
      //注意
      for(var i=gappoint;i<temp_num.length;i++){
        if(temp_num[i]==0&&(temp_num[i+1]!=0||i+1==temp_num.length)){
          stabletempnormal.splice(m,0,gappoint,i)
          m=m+2
          gappoint=i
        }
        if(temp_num[i]!=0&&(temp_num[i+1]==0||i+1==temp_num.length)){
          abnormal.splice(j,0,gappoint,i)
          j=j+2
          gappoint=i
        }
      }

    var a=0

//恒温正常曲线
var j=0
var k=-1
for(i=0;i<stabletempnormal.length;i=i+2){
 for(j=k+1;j<this.outTemp2.length;j++){
if(j>=stabletempnormal[i]&&j<=stabletempnormal[i+1]){
      this.hengwen[j]=this.outTemp2[j]
      k=j
}else{
  this.hengwen[j]=""
}
  
}
}
//console.log(this.hengwen)
//异常部分
var j=0
var k=-1
for(i=0;i<abnormal.length;i=i+2){
 for(j=k+1;j<this.outTemp2.length;j++){
if(j>=abnormal[i]&&j<=abnormal[i+1]){
      this.yichang[j]=this.outTemp2[j]
      k=j
}else{
  this.yichang[j]=""
}
  
}
}
//console.log(this.yichang)
//升温过程
var j=0
var k=-1
for(i=0;i<heatnormal.length;i=i+2){
 for(j=k+1;j<this.outTemp2.length;j++){
if(j>=heatnormal[i]&&j<=heatnormal[i+1]){
      this.shengwen[j]=this.outTemp2[j]
      k=j
}else{
  this.shengwen[j]=""
}
  
}

}
}else if (temp_pattern=="无效片段"){
       wuxiao[0]=time1[0]
      wuxiao[1]=time1[temp_num.length-1]
      heatstage[0]=''
      heatstage[1]=''
      stablestage[0]=''
      stablestage[1]=''
 for(j=0;j<this.outTemp2.length;j++){

      this.yichang[j]=this.outTemp2[j]


  
}
}
    },
    //画图
     drawTable(){
        const myChart = this.$echarts.init(document.getElementById('myChart'));
        const option = {
          // 鼠标位置提示
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
          
          // 图例
          legend: [{
            data: ['水流量','进水温度','出水温度','设置温度',"火焰反馈","ut输入","实际比例阀输出","实际燃烧负荷段","温度受水流量波动影响","温度模式标志位"],
             selected:{'水流量':true,'进水温度':true,'出水温度':true,'设置温度':true,'火焰反馈':true,'ut输入':true,'实际比例阀输出':true,"实际燃烧负荷段":true,'温度受水流量波动影响':true,'温度模式标志位':false}

          },
        

          ],
          dataZoom: {   
              start:0,
              end: 100,
              type:'inside'
            },




      //  grid: {
      //       left: '10%',
      //       right: '15%',
      //       bottom: '10%'
      //   },
          // 缩放操作
          toolbox: {
            show: true,
             bottom:10,
            feature: {
              dataZoom: {
                yAxisIndex: 'none',
              },
              dataView: { readOnly: false },
              magicType: { type: ['line', 'bar'] },
              restore: {},
              saveAsImage: {},
            },
          },
          xAxis: {
            type: 'time',
            boundaryGap: false,
            name: '时间',
           

          },
          yAxis: [{
            name: '温度',
            type: 'value',
            max:100,
            axisLabel: {
              formatter: '{value} °C',
            },
          },
          {
            name: '水流量',
            type: 'value',
            //data:[0-200],
            axisLabel: {
              formatter: '{value} ',
            },
            inverse: false,
          },
                  {
            type: 'value',
            name: '比例阀输出',
            max:1500,
            position: 'right',
             offset: 50,
            axisLine: {
                show: true,
                lineStyle: {
                    color: 'black'
                }
            },
            axisLabel: {
              formatter: '{value}',
              fontWeight: "bold",
              fontSize: 14,
            },
            nameTextStyle: {
              fontWeight: "bolder",
              fontSize: 15
            }
        }

          
          
          
          ],
          visualMap: [
          {
            show: false,
            // type: 'continuous',
            dimension: 0,
            seriesIndex:1,
            pieces: this.color,  //pieces的值由动态数据决定
            textStyle: { //图例文字的样式
              color: 'black',
              fontSize: 16
            },
          }],
         

          // 数据信息
          series: [
            {
              name: '水流量',
              yAxisIndex: 1,
              type: 'line',
              data: this.flow2,
              symbol: 'none',
              markPoint: {
                data: [
                { type: 'max', name: '最大值'},
                
                ],
               
              },
              
              markLine: {
                data: [
                  { type: 'average', name: '平均值' },
                ],
              },

            },
                         {
              name: '出水温度',
              yAxisIndex: 0,
              type: 'line',
              data: this.hengwen,
              symbol: 'none',
              itemStyle: {      
                            normal: {
                                lineStyle: {
                                    width: 4,
                                    type: 'solid' ,//'dotted'虚线 'solid'实线
                                    color:'green'
                                }
                            }
                        },
                       
              markPoint: {
                data: [
                  { type: 'max', name: '最大值' },
                ],
                 label: {
                    formatter: '{c}℃'//单位
                }
              },
              markLine: {
                data: [
                  { type: 'average', name: '平均值' },
                ],
              },
 
            },
             {
              name: '出水温度',
              yAxisIndex: 0,
              type: 'line',
              data: this.yichang,
              symbol: 'none',
              itemStyle: {      
                            normal: {
                                lineStyle: {
                                    width: 4,
                                    type: 'solid' ,//'dotted'虚线 'solid'实线
                                    color:'red'
                                }
                            }
                        },
                       
              markPoint: {
                data: [
                  { type: 'max', name: '最大值' },
                ],
                 label: {
                    formatter: '{c}℃'//单位
                }
              },
              markLine: {
                data: [
                  { type: 'average', name: '平均值' },
                ],
              },
              markArea: {
                
                data: [
                  [
                    {
                      name: '加热段',
                      xAxis: heatstage[0],
                      itemStyle: {
                        color: 'rgba(253, 199, 83, 0.383)'
                      },
                    },
                  
                    {
                      xAxis: heatstage[1]
                    }
                  ],
               

                 
                  [
                    {
                      name: '恒温段',
                      xAxis: stablestage[0],
                      itemStyle: {
                        color: 'rgba(137, 253, 83, 0.383)'
                      },
                    },
                    {
                      xAxis: stablestage[1]
                    }
                  ],                  [
                    {
                      name: '无效用水片段',
                      xAxis: wuxiao[0],
                      itemStyle: {
                        color: '#f0fcff'
                      },
                    },
                    {
                      xAxis: wuxiao[1]
                    }
                  ]
                ]
              }
            },
       {
              name: '出水温度',
              yAxisIndex: 0,
              type: 'line',
              data: this.shengwen,
              symbol: 'none',
              itemStyle: {      
                            normal: {
                                lineStyle: {
                                    width: 4,
                                    type: 'solid' ,//'dotted'虚线 'solid'实线
                                    color:'orange'
                                }
                            }
                        },
                       
              markPoint: {
                data: [
                  { type: 'max', name: '最大值' },
                ],
                 label: {
                    formatter: '{c}℃'//单位
                }
              },
              markLine: {
                data: [
                  { type: 'average', name: '平均值' },
                ],
              },
     
            },



            {
              name: '设置温度',
              yAxisIndex: 0,
              type: 'line',
              data: this.setTemp2,
              symbol: 'none',
              itemStyle: {      
                            normal: {
                                lineStyle: {
                                    width: 2,
                                    type: 'dashed' ,//'dotted'虚线 'solid'实线
                                     color:"blue",
                                }
                            }
                        },

            },  {
              name: '火焰反馈',
              yAxisIndex: 0,
              type: 'line',
              data: this.flame2,
              symbol: 'none',
                 areaStyle: {},
              itemStyle: {      
                            normal: {
                                lineStyle: {
                                    width: 2,
                                    type: 'solid' ,//'dotted'虚线 'solid'实线
                                     color:"black",
                                }
                            }
                        },

            },{
              name: '温度受水流量波动影响',
              yAxisIndex: 0,
              type: 'line',
              data: this.watereffect2,
              symbol: 'none',
                 areaStyle: {},
              itemStyle: {      
                            normal: {
                                lineStyle: {
                                    width: 2,
                                    type: 'solid' ,//'dotted'虚线 'solid'实线
                                     color:"black",
                                }
                            }
                        },
            markPoint: {
              
                data: [
                { value:"加热段"+this.heat_temp_score, name: '升温段评分',xAxis:heatstage[0], yAxis: this.flow[0]+4,symbol:'diamond'},
                { value:"恒温段"+this.stable_temp_score, name: '恒温段评分',xAxis:stablestage[0], yAxis: this.outTemp[2],symbol:'diamond'},
                ],
                label: {
                    formatter: '{c}分'//单位
                }
              },
              
            }, 

              
              {
              name: '温度模式标志位',
              yAxisIndex: 0,
              type: 'line',
              data: this.temp_flag2,
              symbol: 'none',
                 areaStyle: {},
              itemStyle: {      
                            normal: {
                                lineStyle: {
                                    width: 2,
                                    type: 'solid' ,//'dotted'虚线 'solid'实线
                                     color:"yellow",
                                }
                            }
                        },

            },
                          {
              name: '进水温度',
              yAxisIndex: 0,
              type: 'line',
              data: this.inTemp2,
              symbol: 'none',
                 color:"pink",
              itemStyle: {      
                            normal: {
                                lineStyle: {
                                    width: 2,
                                    type: 'solid' ,//'dotted'虚线 'solid'实线
                                     color:"pink",
                                }
                            }
                        },

            }, {
              name: 'ut输入',
              yAxisIndex: 2,
              type: 'line',
              data: this.ut2,
              symbol: 'none',
                 color:"purple",
              itemStyle: {      
                            normal: {
                                lineStyle: {
                                    width: 2,
                                    type: 'solid' ,//'dotted'虚线 'solid'实线
                                     color:"purple",
                                }
                            }
                        },

            },
                                      {
              name: '实际比例阀输出',
              yAxisIndex: 2,
              type: 'line',
              data: this.outpwm2,
              symbol: 'none',
                 color:"black",
              itemStyle: {      
                            normal: {
                                lineStyle: {
                                    width: 2,
                                    type: 'solid' ,//'dotted'虚线 'solid'实线
                                     color:"black",
                                }
                            }
                        },

            },
                                      {
              name: '实际燃烧负荷段',
              yAxisIndex: 0,
              type: 'line',
              data: this.fenduan2,
              
              symbol: 'none',
              areaStyle: {},
                 color:"brown ",
              itemStyle: {      
                            normal: {
                                lineStyle: {
                                    width: 2,
                                    type: 'solid' ,//'dotted'虚线 'solid'实线
                                     color:"brown ",
                                }
                            }
                        },

            },





          ],
        };
       
        

     

//console.log(n)
        myChart.setOption(option,true);
           const _this = this;
  
        // 建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
        // window.addEventListener('resize', () => { myChart.resize(); });
      
    },
    //查询按钮
    search(){
     

this.changefilter(0)



    },
   
      //表格底色
       tableRowClassName1({row, column, rowIndex, columnIndex}) {
 if(column.label=="故障类型"){
    if(row.fault_code=="熄火异常"){
            return 'background: #FFE4C4';	
            }else if(row.fault_code=="加热不足"){
           return 'background: 	#FFFF00';	  
            }

 }
         if(column.label=="温度模式"){
           if (row.temp_pattern == "恒温正常") {
          return 'background: #1981196c';
        } else if (row.temp_pattern == "加热异常") {
          return 'background: #f1b02373';
        }else if (row.temp_pattern == "恒温异常") {
          return 'background: #ff6a6a62';
        }else if(row.temp_pattern == "加热+恒温异常"){
          return 'background: #a706068c';
        }

        return 'background: #9c9c9c8c';
         }
        if(column.label=="水流量模式"){
           if (row.water_pattern == "稳定模式") {
          return 'background: #c1ffc12a';
        } else if (row.water_pattern == "阶跃模式") {
          return 'background: #83fcfc2d';
        }else if (row.water_pattern == "震荡模式") {
          return 'background: #ff6a6a28';
        }
        return 'background: #9c9c9c8c';
         }
        //console.log(row,column,row.column)
        if(column.label=="温度受水流量波动影响"){
          if(row.effect_flag=="有影响"){
          return 'background: #a706068c';
          }else if(row.effect_flag=="无影响"){
            return 'background: #83fcfc2d';
          }
        }
      },
        getfilterNameItem() {
          let apiArr = [  // 从后端获取筛选的字段
            { text: "大于1m", value: "1m" },
            { text: "大于2m", value: "2m" },
            { text: "大于5m", value: "5m" },
          ];
          return apiArr; // return返回去
      },
        filterChange(filterObj) {
     //  console.log(filterObj.duration_time) 
      //     request.post('tableStoreDates/page/list', null, {
      //   params:
      //   { 
      //     city: this.value[1], 
      //     pagetype: 'indexdregion',
      //     dev_id: this.value2[1],
      //      timeLow : this.datatime[0],    //时间范围
      //     timeHigh : this.datatime[1],
      //   },
      // }).then(({ data: response }) => {
       
      //  // console.log(this.options5)
      // this.tableData=response.data.data
      // for(var i=0;i<this.tableData.length;i++){


      //   if(this.tableData[i].pattern=="6"){
      //     this.tableData[i].pattern="稳定模式"
      //   }else if(this.tableData[i].pattern=="7"){
      //     this.tableData[i].pattern="阶跃模式"
      //   }else{
      //       this.tableData[i].pattern="震荡模式"
      //   }
      // }
      
     
      // }).catch((err) => {
      //   this.$message.error(err);
      //   // console.log(err);
      // });
     // console.log(filterObj);
    },
    //月份格式转换
     Month2Time(months){
       var timelow;
          var timehigh;
     var dt=new Date(months)
        dt.setHours(0);
         var year = dt.getFullYear(); //得到年份
       var month = dt.getMonth(); //得到月份
       var date = dt.getDate(); //得到日期   
       month = month + 1;  
      month = month.toString().padStart(2, "0");
       date = date.toString().padStart(2, "0");

      timelow = `${year}-${month}-${date}`;

        
       dt.setTime(dt.setMonth(dt.getMonth()+1));
        var year2 = dt.getFullYear(); //得到年份
       var month2 = dt.getMonth(); //得到月份
        var date2 = dt.getDate(); //得到日期  
         month2= month2.toString().padStart(2, "0");
       date2 = date2.toString().padStart(2, "0");
       var time1=`${year2}-${month2}-${date2}`
       dt.setDate(0)

        var year1 = dt.getFullYear(); //得到年份
       var month1 = dt.getMonth(); //得到月份
        var date1 = dt.getDate(); //得到日期
        month1 = month1 + 1;  
         month1 = month1.toString().padStart(2, "0");
       date1 = date1.toString().padStart(2, "0");
       var timehigh=`${year1}-${month1}-${date1}`
       // console.log(Number(date1))
      var mon=new Array();
       mon[0]=timelow
       mon[1]=timehigh
       mon[2]=time1;
       mon[3]=Number(date1)
      return mon;

    },
  },
  created() {

  this.axios.get( "data/chinacity copy.json").then((response)=>{
this.options=response.data;

 this.options=JSON.parse(JSON.stringify(this.options)); 
 




//如果单独打开不起作用
if(this.$route.query.id!=undefined){
  this.chooseTypeflag=true
   if(this.$route.query.temp_pattern=="有效")
  {this.radio3="有效"}else{this.radio3="不限"}
  this.radio4="不限"
  var city=this.$route.query.city.slice(0,2)+"0000" 
  //console.log(city);
  this.value=[city,this.$route.query.city]
  var mon=[this.$route.query.month,this.$route.query.month1]
this.datatime=[mon[0],mon[1]]
this.handleChange(this.value)
}else{
  this.value=[this.options[0].value,this.options[0].children[0].value]
  request.post('tableStoreDates/page/list', null, {
        params:
        { 
          pagetype: 'datafeatures',
        },
      }).then(({ data: response }) => {
        console.log(response.data.data)
        this.datatime=[response.data.data.update_time,response.data.data.update_time]
      }).catch((err) => {
      });
this.handleChange(this.value)
}



}).catch((response)=>{
//console.log(response);
})

 

 
     
      
  
    

  },
};
</script>

<style lang="scss">

#myChart {
  // width: 50%;
  // height: 500px;
  // border: 1px solid red;
  // margin: 0 auto;
 
    top: 20px;
  width: 1500px;
  height: 500px;
  margin: auto;

  // background-color: rgba(137, 253, 83, 0.383);
  // grid: {
  //   x: 0;
  //   y: 0;
  //   x2: 0;
  //   y2: 0;
  // }
}
.el-dialog{
    position: fixed!important;
  top: 500 !important;
  left: 500 !important;
  width: 100% !important;
  height: 100% !important;
  margin: 0 !important;
  z-index: 100;
  color: #FFFF;
  background-color: #FFFF;
}
</style>
