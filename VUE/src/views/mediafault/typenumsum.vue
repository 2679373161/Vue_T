<template>
  <div id="app1">
   
  <div class="search" align="center" style="margin-top:20px;">
      <el-form ref="form" class="ItemInfo" :model="equipment_info" label-width="80px" :inline="true">
    <span>型号故障统计查询筛选项：</span>

      <span>型号：</span>
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



      <span style="margin-left:30px">日期: </span>
      <el-date-picker
        v-model="datatime"
        style="width:250px; margin-right:10px;"
        type="daterange"
        align="right"
        range-separator="-"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :default-value="'2011-09-09'-'2021-02-02'"
        :picker-options="pickerOptions"    
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd">
      </el-date-picker>


    <el-button type="primary" @click="search" >查询</el-button>

<el-form-item class="ItemInfoTime">
<download-excel
        style="margin-left:30px"
      :fields = "json_fields"
     
      :data="tableData"
      :before-generate = "startDownload"
      :before-finish = "finishDownload"
     
      name="listdata.xls"
      type="xls">
      <el-button >导出Excel</el-button>
    </download-excel>
</el-form-item>
</el-form>
      
       
  


<div class="mytable">
<!--tableData熄火指标flag=1-->
<el-table ref="tableRef" :data="tableData.slice((currentPage-1)*perPage,currentPage*perPage)"  :cell-style="cellStyle"  max-height="900" border style="width: 100%;margin-top:20px" align="center">
      <el-table-column  type="index"  align="center"  label="序号" :index="indexMethod"></el-table-column>
    <el-table-column  prop="time_date" align="center" width='200px'  label="时间"></el-table-column>
    <el-table-column  prop="dev_type" align="center"  label="型号"></el-table-column>
       <el-table-column   prop="total" align="center"  label="设备总数"></el-table-column>
    <el-table-column  v-if="false"  prop="e0num" align="center"  label="出水传感器故障E0"></el-table-column>
       <el-table-column  v-if="this.sume0!=0"  prop="e0per" align="center"  label="出水传感器故障E0占比"></el-table-column>

    <el-table-column  v-if="false" prop="e1num" align="center"  label="意外熄火E1"></el-table-column>
       <el-table-column  v-if="this.sume1!=0" prop="e1per" align="center"  label="意外熄火E1占比"></el-table-column>
  
       <el-table-column v-if="false"  prop="e2num" align="center"  label="伪火故障E2"></el-table-column> 
         <el-table-column v-if="this.sume2!=0"  prop="e2per" align="center"  label="伪火故障E2占比"></el-table-column> 
  
    <el-table-column v-if="false" prop="e3num" align="center"  label="温控器故障E3"></el-table-column>
      <el-table-column v-if="this.sume3!=0" prop="e3per" align="center"  label="温控器故障E3占比"></el-table-column>

   <el-table-column v-if="false"  prop="e4num" align="center"  label="超温故障E4"></el-table-column>
      <el-table-column v-if="this.sume4!=0"  prop="e4per" align="center"  label="超温故障E4占比"></el-table-column>

    <el-table-column v-if="false" prop="e5num" align="center"  label="风机故障E5"></el-table-column>
       <el-table-column v-if="this.sume5!=0" prop="e5per" align="center"  label="风机故障E5占比"></el-table-column>

    <el-table-column  v-if="false"  prop="e6num" align="center"  label="开关阀故障E6"></el-table-column>
       <el-table-column  v-if="this.sume6!=0"  prop="e6per" align="center"  label="开关阀故障E6占比"></el-table-column>

    <el-table-column  v-if="false"    prop="e8num" align="center"  label="水泵故障E8"></el-table-column>
         <el-table-column  v-if="this.sume8!=0"    prop="e8per" align="center"  label="水泵故障E8占比"></el-table-column>

       <el-table-column  v-if="false"   prop="eanum" align="center"  label="C0故障EA"></el-table-column> 
          <el-table-column  v-if="this.sumea!=0"   prop="eaper" align="center"  label="C0故障EA占比"></el-table-column> 

    <el-table-column v-if="false"    prop="eenum" align="center"  label="超时故障EE"></el-table-column>
      <el-table-column v-if="this.sumee!=0"    prop="eeper" align="center"  label="超时故障EE占比"></el-table-column>

   <el-table-column  v-if="false" prop="f2num" align="center"  label="进水温度传感器故障F2"></el-table-column>
      <el-table-column  v-if="this.sumf2!=0" prop="f2per" align="center"  label="进水温度传感器故障F2占比"></el-table-column>

    <el-table-column v-if="false" prop="c0num" align="center"  label="点火失败C0"></el-table-column>
      <el-table-column v-if="this.sumc0!=0" prop="c0per" align="center"  label="点火失败C0占比"></el-table-column>
 
    <el-table-column v-if="false" prop="c1num" align="center"  label="残火故障C1"></el-table-column>
       <el-table-column v-if="this.sumc1!=0" prop="c1per" align="center"  label="残火故障C1占比"></el-table-column>

    <el-table-column v-if="false" prop="c2num" align="center"  label="风压开关/传感器误接触故障C2"></el-table-column>
        <el-table-column v-if="this.sume2!=0" prop="c2per" align="center"  label="风压开关/传感器误接触故障C2占比"></el-table-column>

       <el-table-column v-if="false" prop="c3num" align="center"  label="风压开关/传感器无法接通故障C3"></el-table-column> 
         <el-table-column v-if="this.sumc3!=0" prop="c3per" align="center"  label="风压开关/传感器无法接通故障C3占比"></el-table-column> 
  
    <el-table-column v-if="false" prop="c4num" align="center"  label="风堵故障C4"></el-table-column>
      <el-table-column v-if="this.sumc4!=0" prop="c4per" align="center"  label="风堵故障C4占比"></el-table-column>

   <el-table-column v-if="false"  prop="c5num" align="center"  label="水路堵塞故障C5"></el-table-column>
      <el-table-column v-if="this.sumc5!=0"  prop="c5per" align="center"  label="水路堵塞故障C5占比"></el-table-column>

    <el-table-column v-if="false" prop="c6num" align="center"  label="水流传感器故障C6"></el-table-column>
      <el-table-column v-if="this.sumc6!=0" prop="c6per" align="center"  label="水流传感器故障C6占比"></el-table-column>

    <el-table-column v-if="false" prop="c7num" align="center"  label="负荷异常C7"></el-table-column>
       <el-table-column v-if="this.sumc7!=0" prop="c7per" align="center"  label="负荷异常C7占比"></el-table-column>

    <el-table-column v-if="false" prop="c8num" align="center"  label="热电偶异常C8"></el-table-column>
        <el-table-column v-if="this.sumc8!=0" prop="c8per" align="center"  label="热电偶异常C8占比"></el-table-column>

       <el-table-column v-if="false" prop="ehnum" align="center"  label="CH4异常EH"></el-table-column> 
          <el-table-column v-if="this.sumeh!=0" prop="ehper" align="center"  label="CH4异常EH占比"></el-table-column> 

    <el-table-column v-if="false" prop="efnum" align="center"  label="气泡水故障EF"></el-table-column>
    <el-table-column v-if="this.sumef!=0" prop="efper" align="center"  label="气泡水故障EF占比"></el-table-column>



  <el-table-column
      label="操作"
      align="center">
      <template slot-scope="scope">
        <el-button
          @click="jumppage1(scope.row)"
          type="text"
          size="small"
          align="left">
          期间每日占比详情
        </el-button>
      </template>
    </el-table-column>


</el-table>
</div>
   






  </div>


 

 
  <el-pagination align="center"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      background="true"
      prev-text="上一页"
      next-text="下一页"
      :current-page.sync="currentPage"
      :page-sizes="[25,50,100]"
      :page-size="perPage"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>



  </div>
</template>

<style>
  
</style>
<script>
import * as echarts from 'echarts';
import request from '@/utils/request';
import JsonExcel from 'vue-json-excel';
//var url="http://47.98.170.3:1016/api/"
 var xData=[];
 var yData=[];

export default {
  components: {
      'download-excel': JsonExcel
    }, 
  data() {
    return {
     


  


     shijian:0,
     fanye:0,
       date:new Date(),
 
      checkList:"熄火异常",
  
       applianceid:"",
       canshu:"",
      tableData1:[],
      value: '',
      activeName: 'second',
      outerVisible:false,
      value:[],
      options:[],
      options2: [],  //型号框下拉
      options3:[],  //设备框下拉
      // value1:[],
      value2:[],
      value3:[],
      // shebeikuang:"请选择设备",
      xinghao: [],
      shebei: [],
      perPage:25,// 每页显示条数
      currentPage: 1, // 当前页
      temp_currentPage: 1,

      total: 0, // 默认总条数
      flag:"1",
      tableData:[],
      chartData:[],
      temp_score:[],
      time_date:[],
      datatime:[],
      sume0:0,
      sume1:0,
      sume2:0,
      sume3:0,
      sume4:0,
      sume5:0,
      sume6:0,
      sume8:0,
      sumea:0,
      sumee:0,
      sumf2:0,
      sumc0:0,
      sumc1:0,
      sumc2:0,
      sumc3:0,
      sumc4:0,
      sumc5:0,
      sumc6:0,
      sumc7:0,
      sumc8:0,
      sumeh:0,
      sumef:0,
      sum:[],

      //新加pickerOptions（）
      pickerOptions: {
          shortcuts: [{
            text: '当天',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              end.setTime(start.getTime());
              start.setTime(start.getTime());
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              end.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
      // chooseTypeflag:false,
      // chooseTypetext:'可设备单选',
    };
  },
  methods:{

   cellStyle({row, column, rowIndex, columnIndex}) {
         if(column.label=="出水传感器E0占比"){
           if (row.e0num >0) {
          return {"color":"red","background":"#ff6a6a62"};
        } else 

        return 'background: #FFFFFF';
         }if(column.label=="意外熄火E1占比"){
           if (row.e1num >0) {
          return {"color":"red","background":"#ff6a6a62"};
        } else 

        return 'background: #FFFFFF';
         }if(column.label=="伪火故障E2占比"){
           if (row.e2num >0) {
          return {"color":"red","background":"#ff6a6a62"};
        } else 

        return 'background: #FFFFFF';
         }if(column.label=="温控器故障E3占比"){
           if (row.e3num >0) {
          return {"color":"red","background":"#ff6a6a62"};
        } else 

        return 'background: #FFFFFF';
         }if(column.label=="超温故障E4占比"){
           if (row.e4num >0) {
          return {"color":"red","background":"#ff6a6a62"};
        } else 

        return 'background: #FFFFFF';
         }if(column.label=="风机故障E5占比"){
           if (row.e5num >0) {
          return {"color":"red","background":"#ff6a6a62"};
        } else 

        return 'background: #FFFFFF';
         }if(column.label=="开关阀故障E6占比"){
           if (row.e6num >0) {
          return {"color":"red","background":"#ff6a6a62"};
        } else 

        return 'background: #FFFFFF';
         }if(column.label=="水泵故障E8占比"){
           if (row.e8num >0) {
          return {"color":"red","background":"#ff6a6a62"};
        } else 

        return 'background: #FFFFFF';
         }if(column.label=="超时故障EE占比"){
           if (row.eenum >0) {
          return {"color":"red","background":"#ff6a6a62"};
        } else 

        return 'background: #FFFFFF';
         }if(column.label=="进水温度传感器故障F2占比"){
           if (row.f2num >0) {
          return {"color":"red","background":"#ff6a6a62"};
        } else 

        return 'background: #FFFFFF';
         }if(column.label=="点火失败C0占比"){
           if (row.c0num >0) {
          return {"color":"red","background":"#ff6a6a62"};
        } else 

        return 'background: #FFFFFF';
         }if(column.label=="残火故障C1占比"){
           if (row.c1num >0) {
          return {"color":"red","background":"#ff6a6a62"};
        } else 

        return 'background: #FFFFFF';
         }if(column.label=="风压开关/传感器误接触故障C2占比"){
           if (row.c2num >0) {
          return {"color":"red","background":"#ff6a6a62"};
        } else 

        return 'background: #FFFFFF';
         }if(column.label=="风压开关/传感器无法接通故障C3占比"){
           if (row.c3num >0) {
          return {"color":"red","background":"#ff6a6a62"};
        } else 

        return 'background: #FFFFFF';
         }if(column.label=="风堵故障C4占比"){
           if (row.c4num >0) {
          return {"color":"red","background":"#ff6a6a62"};
        } else 

        return 'background: #FFFFFF';
         }if(column.label=="水路堵塞故障C5占比"){
           if (row.c5num >0) {
          return {"color":"red","background":"#ff6a6a62"};
        } else 

        return 'background: #FFFFFF';
         }if(column.label=="水流传感器故障C6占比"){
           if (row.c6num >0) {
          return {"color":"red","background":"#ff6a6a62"};
        } else 

        return 'background: #FFFFFF';
         }if(column.label=="负荷异常C7占比"){
           if (row.c7num >0) {
          return {"color":"red","background":"#ff6a6a62"};
        } else 

        return 'background: #FFFFFF';
         }if(column.label=="热电偶异常C8占比"){
           if (row.c8num >0) {
          return {"color":"red","background":"#ff6a6a62"};
        } else 

        return 'background: #FFFFFF';
         }if(column.label=="CH4异常EH占比"){
           if (row.ehnum >0) {
          return {"color":"red","background":"#ff6a6a62"};
        } else 

        return 'background: #FFFFFF';
         }if(column.label=="气泡水故障EF占比"){
           if (row.efnum >0) {
          return {"color":"red","background":"#ff6a6a62"};
        } else 

        return 'background: #FFFFFF';
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

     


      jumppage1(row) {
       console.log(row)

      let routeData = this.$router.resolve({
     path:'typenumday',
 query: {

   type: row.dev_type,
   time0:this.datatime[0],
   time1:this.datatime[1]
  }
});
 window.open(routeData.href);
      },

      search(){


          console.log("666")
                 
            this.sume0=0
      this.sume1=0
      this.sume2=0
      this.sume3=0
      this.sume4=0
      this.sume5=0
      this.sume6=0
      this.sume8=0
      this.sumea=0
      this.sumee=0
      this.sumf2=0
      this.sumc0=0
      this.sumc1=0
      this.sumc2=0
      this.sumc3=0
      this.sumc4=0
      this.sumc5=0
      this.sumc6=0
      this.sumc7=0
      this.sumc8=0
      this.sumeh=0
      this.sumef=0
     


      this.tableData=[]
      this.total=0
if(this.fanye==0){
  this.temp_currentPage=1
}
    request.post('faultstatistics/page/equfaultnumsum', null, {
      params:
           { 
    
          perPage: this.perPage,
          currentPage:1,
         
          type: this.value2,
      
          timeLow:this.datatime[0],
          timeHigh:this.datatime[1],
        },
    }).then(({ data: response }) => { 
 if (response.data.data==""){
                  this.$message.error('很抱歉，查询结果为空');
    
       }


        console.log(response.data)
        console.log(response.data.data.length)
      
        for(var i=0;i<response.data.data.length;i++){       
          this.tableData[i]=response.data.data[i]
          this.tableData[i].time_date=this.datatime[0]+"-"+this.datatime[1]
          this.sum[i]=this.tableData[i].total
          this.tableData[i].e0per=(this.tableData[i].e0num/this.sum[i]*100).toFixed(1)+'%'
          this.tableData[i].e1per=(this.tableData[i].e1num/this.sum[i]*100).toFixed(1)+'%'
          this.tableData[i].e2per=(this.tableData[i].e2num/this.sum[i]*100).toFixed(1)+'%'
          this.tableData[i].e3per=(this.tableData[i].e3num/this.sum[i]*100).toFixed(1)+'%'
          this.tableData[i].e4per=(this.tableData[i].e4num/this.sum[i]*100).toFixed(1)+'%'
          this.tableData[i].e5per=(this.tableData[i].e5num/this.sum[i]*100).toFixed(1)+'%'
          this.tableData[i].e6per=(this.tableData[i].e6num/this.sum[i]*100).toFixed(1)+'%'
          this.tableData[i].e8per=(this.tableData[i].e8num/this.sum[i]*100).toFixed(1)+'%'
          this.tableData[i].eaper=(this.tableData[i].eanum/this.sum[i]*100).toFixed(1)+'%'
          this.tableData[i].eeper=(this.tableData[i].eenum/this.sum[i]*100).toFixed(1)+'%'
          this.tableData[i].f2per=(this.tableData[i].f2num/this.sum[i]*100).toFixed(1)+'%'
          this.tableData[i].c0per=(this.tableData[i].c0num/this.sum[i]*100).toFixed(1)+'%'
          this.tableData[i].c1per=(this.tableData[i].c1num/this.sum[i]*100).toFixed(1)+'%'
          this.tableData[i].c2per=(this.tableData[i].c2num/this.sum[i]*100).toFixed(1)+'%'
          this.tableData[i].c3per=(this.tableData[i].c3num/this.sum[i]*100).toFixed(1)+'%'
          this.tableData[i].c4per=(this.tableData[i].c4num/this.sum[i]*100).toFixed(1)+'%'
          this.tableData[i].c5per=(this.tableData[i].c5num/this.sum[i]*100).toFixed(1)+'%'
          this.tableData[i].c6per=(this.tableData[i].c6num/this.sum[i]*100).toFixed(1)+'%'
          this.tableData[i].c7per=(this.tableData[i].c7num/this.sum[i]*100).toFixed(1)+'%'
          this.tableData[i].c8per=(this.tableData[i].c8num/this.sum[i]*100).toFixed(1)+'%'
          this.tableData[i].ehper=(this.tableData[i].ehnum/this.sum[i]*100).toFixed(1)+'%'
          this.tableData[i].efper=(this.tableData[i].efnum/this.sum[i]*100).toFixed(1)+'%'



      this.sume0=this.tableData[i].e0num+this.sume0
      this.sume1=this.tableData[i].e1num+this.sume1
      this.sume2=this.tableData[i].e2num+this.sume2
      this.sume3=this.tableData[i].e3num+this.sume3
      this.sume4=this.tableData[i].e4num+this.sume4
      this.sume5=this.tableData[i].e5num+this.sume5
      this.sume6=this.tableData[i].e6num+this.sume6
      this.sume8=this.tableData[i].e8num+this.sume8
      this.sumea=this.tableData[i].eanum+this.sumea
      this.sumee=this.tableData[i].eenum+this.sumee
      this.sumf2=this.tableData[i].f2num+this.sumf2
      this.sumc0=this.tableData[i].c0num+this.sumc0
      this.sumc1=this.tableData[i].c1num+this.sumc1
      this.sumc2=this.tableData[i].c2num+this.sumc2
      this.sumc3=this.tableData[i].c3num+this.sumc3
      this.sumc4=this.tableData[i].c4num+this.sumc4
      this.sumc5=this.tableData[i].c5num+this.sumc5
      this.sumc6=this.tableData[i].c6num+this.sumc6
      this.sumc7=this.tableData[i].c7num+this.sumc7
      this.sumc8=this.tableData[i].c8num+this.sumc8
      this.sumeh=this.tableData[i].ehnum+this.sumeh
      this.sumef=this.tableData[i].efnum+this.sumef

        }

        this.total=response.data.count
this.tableData=JSON.parse(JSON.stringify(this.tableData)); 
this.sume0=sum(this.tableData.e0num)
console.log(this.sume0)
console.log(this.tableData)
console.log(total)


}).catch((err) => {
       
    });
	
  },

 


    dateFormat:function(time) {
    var date=new Date(time);
    var year=date.getFullYear();
    var month= date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
    var day=date.getDate()<10 ? "0"+date.getDate() : date.getDate();
    var hours=date.getHours()<10 ? "0"+date.getHours() : date.getHours();
    var minutes=date.getMinutes()<10 ? "0"+date.getMinutes() : date.getMinutes();
    var seconds=date.getSeconds()<10 ? "0"+date.getSeconds() : date.getSeconds();
    // 拼接 可改成自己所要的时间格式
    return year+"-"+month+"-"+day;
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




  },
  created() {
        
      
      if(this.$route.query.id!=null){

this.value3=this.$route.query.id
this.value2=this.$route.query.type
this.shijian=this.$route.query.time//接收到的日期时间，需转换为时间戳再减去13天的时间戳，再转换为日期
 
 

  var city=this.$route.query.city.slice(0,2)+"0000" 
  console.log(city);
  this.value=[city,this.$route.query.city]


      }

     request.post('faultstatistics/page/gettype', null, {
         params:
         { 
         },
       }).then(({ data: response }) => {
         console.log(response.data);
         this.options2=response.data.data;  //型号框下拉内容
        console.log(this.options2)
       }).catch((response) => {
       });   //型号设备下拉框前后端交互
	   setTimeout(() => {

 this.search()
    },100);
 if(this.$route.query.id!=null){
  this.datatime[0]=this.dateFormat(this.shijian);  //点击的日期
  this.datatime[1]=this.dateFormat(this.shijian);  //点击的日期

  const sj=new Date(this.datatime[0])
   sj.setTime(sj.getTime()-86400000*6);  //一周
  console.log(sj)
this.datatime[0]=this.dateFormat(sj)//一周前的时间


  //this.datatime[0].getTime()-86400000*13
 }else{
           //默认时间显示近一周
  const dt  = new Date();
  const dt1 = new Date();
  dt.setTime(dt.getTime()-86400000);//一天是86400000
  dt1.setTime(dt.getTime()-86400000*6);  //一周
  this.datatime[0]=this.dateFormat(dt1),//一周前的时间
  this.datatime[1]=this.dateFormat(dt);  //今天的时间
}
    this.axios.get( "data/chinacity copy.json").then((response)=>{
      this.options = response.data;
      this.options = JSON.parse(JSON.stringify(this.options)); 
    }).catch((response)=>{
    })
  },
};
</script>

<style >

</style>
