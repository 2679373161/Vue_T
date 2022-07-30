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

<!--tableData熄火指标flag=1-->
<el-table  ref="tableRef"  :data="tableData.slice((currentPage-1)*perPage,currentPage*perPage)"  :cell-style="cellStyle"  height="900px" border style="width: 100%;margin-top:20px" align="center">
      <el-table-column  type="index"  align="center" width='100px' label="序号" :index="indexMethod"></el-table-column>
    <el-table-column  prop="time_date" align="center" width='250px' label="时间"></el-table-column>
    <el-table-column  prop="dev_type" align="center" width='230px' label="型号"></el-table-column>
    <el-table-column  prop="fault" align="center" width='950px' label="故障"></el-table-column>




   <el-table-column
      label="操作"
      align="center">
      <template slot-scope="scope">
        <el-button
          @click="jumppage1(scope.row)"
          type="text"
          size="small"
          align="left">
          期间故障详情
        </el-button>
      </template>
    </el-table-column>



</el-table>

   






  </div>


 

 
  <el-pagination align="center" v-if="this.downloadflag!=1"
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

 var e0=[];
var e1=[];
var e2=[];
var e3=[];
var e4=[];
var e5=[];
var e6=[];
var e8=[];
var ea=[];
var ee=[];
var f2=[];
var c0=[];
var c1=[];
var c2=[];
var c3=[];
var c4=[];
var c5=[];
var c6=[];
var c7=[];
var c8=[];
var eh=[];
var ef=[];

var e0string=[];
var e1string=[];
var e2string=[];
var e3string=[];
var e4string=[];
var e5string=[];
var e6string=[];
var e8string=[];
var eastring=[];
var eestring=[];
var f2string=[];
var c0string=[];
var c1string=[];
var c2string=[];
var c3string=[];
var c4string=[];
var c5string=[];
var c6string=[];
var c7string=[];
var c8string=[];
var ehstring=[];
var efstring=[];
var sum=[];
export default {
  components: {
      'download-excel': JsonExcel
    }, 
  data() {
    return {
     


  

     fanye:0,
     shijian:0,
      downloadflag:0,
       date:new Date(),
 
      checkList:"熄火异常",
  
       applianceid:"",
       canshu:"",
      tableData1:[],
      value: '',
      activeName: 'second',
      outerVisible:false,
  
      options:[],
      options2: [],  //型号框下拉
      flag:"2",
      // value1:[],
      value2:[],
 
      // shebeikuang:"请选择设备",
      xinghao: [],
      shebei: [],
      perPage:25,// 每页显示条数
      currentPage: 1, // 当前页
      temp_currentPage: 1,

      total: 0, // 默认总条数
      
      tableData:[],
      time_date:[],
      datatime:[],
       dev_type:"",
 



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


    cellStyle(row,column,rowIndex,columnIndex){
  
        if(row.row.fault!="无故障"){
          return {"color":"red","background":"#f2eada"}
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
     path:'typefault',
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
                 
      this.tableData=[]
     


      this.tableData=[]
      this.total=0
if(this.fanye==0){
  this.temp_currentPage=1
}
    request.post('faultstatistics/page/initialize', null, {
      params:
           { 
    
          perPage: this.temp_currentPage,
          currentPage:1,

          type: this.value2,
          flag:"2",
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

          this.tableData[i]={

          dev_type:response.data.data[i].dev_type
          }
        
          this.tableData[i].time_date=this.datatime[0]+"-"+this.datatime[1]
          e0[i]=response.data.data[i].e0;
          if(e0[i]>0){
            e0string[i]="出水传感器故障"+e0[i]+"  "
          }else{
            e0string[i]=""
          }
          e1[i]=response.data.data[i].e1;
          if(e1[i]>0){
            e1string[i]="意外熄火"+e1[i]+"  "
          }else{
            e1string[i]=""
          }
          e2[i]=response.data.data[i].e2;
              if(e2[i]>0){
            e2string[i]="伪火故障"+e2[i]+"  "
          }else{
            e2string[i]=""
          }
          e3[i]=response.data.data[i].e3;
             if(e3[i]>0){
            e3string[i]="温控器故障"+e3[i]+"  "
          }else{
            e3string[i]=""
          }
          e4[i]=response.data.data[i].e4;
          if(e4[i]>0){
            e4string[i]="超温故障"+e4[i]+"  "
          }else{
            e4string[i]=""
          }
          e5[i]=response.data.data[i].e5;
                if(e5[i]>0){
            e5string[i]="风机故障"+e5[i]+"  "
          }else{
            e5string[i]=""
          }
         e6[i]=response.data.data[i].e6;
           if(e6[i]>0){
            e6string[i]="开关阀故障"+e6[i]+"  "
          }else{
            e6string[i]=""
          }
         e8[i]=response.data.data[i].e8;
         if(e8[i]>0){
            e8string[i]="水泵故障"+e8[i]+"  "
          }else{
            e8string[i]=""
          }
          ea[i]=response.data.data[i].ea;
          if(ea[i]>0){
            eastring[i]="C0故障"+ea[i]+"  "
          }else{
            eastring[i]=""
          }
          ee[i]=response.data.data[i].ee;
          if(ee[i]>0){
            eestring[i]="超时故障"+ee[i]+"  "
          }else{
            eestring[i]=""
          }
          f2[i]=response.data.data[i].f2;
          if(f2[i]>0){
            f2string[i]="进水温度传感器故障"+f2[i]+"  "
          }else{
            f2string[i]=""
          }
          c0[i]=response.data.data[i].c0;
          if(c0[i]>0){
            c0string[i]="点火失败"+c0[i]+"  "
          }else{
            c0string[i]=""
          }
            c1[i]=response.data.data[i].c1;
             if(c1[i]>0){
            c1string[i]="残火故障"+c1[i]+"  "
          }else{
            c1string[i]=""
          }
            c2[i]=response.data.data[i].c2;
            if(c2[i]>0){
            c2string[i]="风压开关/传感器误接触故障"+c2[i]+"  "
          }else{
            c2string[i]=""
          }
          c3[i]=response.data.data[i].c3;
          if(c3[i]>0){
            c3string[i]="风压开关/传感器无法接通故障"+c3[i]+"  "
          }else{
            c3string[i]=""
          }
              c4[i]=response.data.data[i].c4;
              if(c4[i]>0){
            c4string[i]="风堵故障"+c4[i]+"  "
          }else{
            c4string[i]=""
          }
              c5[i]=response.data.data[i].c5;
              if(c5[i]>0){
            c5string[i]="水路堵塞故障"+c5[i]+"  "
          }else{
            c5string[i]=""
          }
         c6[i]=response.data.data[i].c6;
         if(c6[i]>0){
            c6string[i]="水流传感器故障"+c6[i]+"  "
          }else{
            c6string[i]=""
          }
          c7[i]=response.data.data[i].c7;
          if(c7[i]>0){
            c7string[i]="负荷异常"+c7[i]+"  "
          }else{
            c7string[i]=""
          }
         c8[i]=response.data.data[i].c8;
         if(c8[i]>0){
            c8string[i]="热电偶异常"+c8[i]+"  "
          }else{
            c8string[i]=""
          }
          eh[i]=response.data.data[i].eh;
          if(eh[i]>0){
            ehstring[i]="CH4异常"+eh[i]+"  "
          }else{
            ehstring[i]=""
          }
          ef[i]=response.data.data[i].ef;
           if(ef[i]>0){
            efstring[i]="气泡水故障"+ef[i]+"  "
          }else{
            efstring[i]=""
          }
    sum[i]=e0[i]+e1[i]+e2[i]+e3[i]+e4[i]+e5[i]+e6[i]+e8[i]+ea[i]+ee[i]+f2[i]+c0[i]+c1[i]+c2[i]+c3[i]+c4[i]+c5[i]+c6[i]+c7[i]+c8[i]+eh[i]+ef[i]
 
   if(sum[i]==0){
     this.tableData[i].fault="无故障"
   }else{
     this.tableData[i].fault=e0string[i]+e1string[i]+e2string[i]+e3string[i]+e4string[i]+e5string[i]+e6string[i]+e8string[i]+eastring[i]+eestring[i]+f2string[i]+c0string[i]+c1string[i]+c2string[i]+c3string[i]+c4string[i]+c5string[i]+c6string[i]+c7string[i]+c8string[i]+ehstring[i]+efstring[i]
   }

        }          

        this.total=response.data.count
this.tableData=JSON.parse(JSON.stringify(this.tableData)); 

console.log(this.tableData)

      



    

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
         if(this.downloadflag==1){
           this.currentPage=1
           
         }
         else{
         this.currentPage=this.temp_currentPage}
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

<style lang="scss">

</style>
