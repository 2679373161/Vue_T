<template>
  <div id="app1">
   
  <div class="search" align="center" style="margin-top:20px;">
    <el-form ref="form" class="ItemInfo" :model="equipment_info" label-width="80px" :inline="true">
    <span>加热不足每日详情查询筛选项：</span>
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

      <span>设备：</span>
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
<el-form-item class="ItemInfoTime" style="margin-left:10px;">
<download-excel
      :fields = "json_fields1"
      :data="tableData1"
      :before-generate = "startDownload"
      :before-finish = "finishDownload"     
      name="listdata.xls"
      type="xls">
      <el-button>导出Excel</el-button>
    </download-excel>
</el-form-item>
</el-form>

<!--tableData1加热不足指标flag=0-->
   <el-table  ref="tableRef" :data="tableData1" height="900px" border style="width: 100%;margin-top:20px" align="center">
      <el-table-column  type="index"  align="center" width='60px' label="序号" :index="indexMethod"></el-table-column>
    <el-table-column  prop="time_date" align="center" width='180px' label="时间"></el-table-column>
    <el-table-column  prop="province" align="center" width='60px' label="省份"></el-table-column>
    <el-table-column  prop="dev_city" align="center" width='80px' label="城市"></el-table-column>
    <el-table-column  prop="dev_type" align="center" width='100px' label="型号"></el-table-column>
    <el-table-column  prop="dev_id" align="center" width='150px' label="设备号"></el-table-column>
    <el-table-column  prop="fault_type" align="center" width='120px' label="故障类型"></el-table-column>
    <el-table-column  prop="total_num" align="center" width='240px' label="参与统计是否加热不足的片段总数"></el-table-column>
    <el-table-column  prop="low_temp_num" align="center" width='140px' label="加热不足片段数"></el-table-column>
        <el-table-column   prop="set_temp" align="center" width='80px' label="设定温度"></el-table-column>
    <el-table-column  prop="low_temp_min_flow" align="center" width='180px' label="加热不足水流量最小值"></el-table-column>
    <el-table-column  prop="temp_diff" align="center" width='150px' label="最小水流处温度差"></el-table-column>
    <el-table-column  prop="liter_diff" align="center" width='180px' label="提供负荷与实际负荷之差"></el-table-column>
    <el-table-column  v-if="false" prop="city" align="center" width='100px' label="城市编号"></el-table-column>
  <el-table-column
      label="操作1"
      align="center">
      <template slot-scope="scope">
        <el-button
          @click="jumppage1(scope.row)"
          type="text"
          size="small"
          align="left">
          优化参数
        </el-button>
      </template>
    </el-table-column>
      <el-table-column
      label="操作2"
      align="center">
      <template slot-scope="scope">
        <el-button
          @click="jumppage(scope.row)"
          type="text"
          size="small"
          align="left">
          每日详情
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
 var xData=[];
 var yData=[];

export default {
  components: {
      'download-excel': JsonExcel
    }, 
  data() {
    return {
     
  
 json_fields: {
                   
          '省份': 'province',
          '城市': 'dev_city',
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
          "时间":'time_date',
          "故障类型":'fault_type',
          "参与统计是否熄火的片段总数":'total_num',
          "熄火片段数":'flameout_num',
          
         
            "片段最大熄火次数":'max_flameout_count'
          },
json_fields1: {
                   
          '省份': 'province',
          '城市': 'dev_city',
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
          "时间":'time_date',
          "故障类型":'fault_type', 
          "参与统计是否加热不足的片段总数":'total_num',
          "加热不足片段数":'low_temp_num',
            "设定温度":'set_temp',
   
            "加热不足水流量最小值":'low_temp_min_flow',
            "最小水流处温度差":'temp_diff',
            "提供负荷与实际负荷之差":'liter_diff'
           
          },




fanye:0,
      flag:0,
 chartVisible:false,


      downloadflag:0,
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
      
      tableData:[],
      chartData:[],
      temp_score:[],
      time_date:[],
      datatime:[],
      
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









     startDownload(){
        let self = this
         if(self.tableData1.length==0) {
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

      jumppage(row) {
       console.log(row)

      let routeData = this.$router.resolve({
     path:'indextemp',
 query: {

     city: row.city,
   id: row.dev_id,
   type:row.dev_type,
   month:this.datatime[0],
   month1:this.datatime[1],

  }
});
 window.open(routeData.href);
      },


      jumppage1(row) {
       console.log(row)

      let routeData = this.$router.resolve({
     path:'Para_Inquire',
 query: {

   equipment_ID: row.dev_id,

  }
});
 window.open(routeData.href);
      },

      search(){


          console.log("666")
                 this.downloadflag=0
      this.tableData=[]


      this.tableData=[]
      this.total=0
      
if(this.fanye==0){
  this.temp_currentPage=1
}


    request.post('fault/page/faultdiagnosis', null, {
      params:
           { 
          flag: 0,
          perPage: this.perPage,
          currentPage:this.temp_currentPage,
          province_code: this.value[0],
          city_code: this.value[1],
          type: this.value2,
          equipment: this.value3,
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
          this.tableData1[i]={
            city:response.data.data[i].city_code,
          province:response.data.data1[i].dev_province,
          dev_city:response.data.data1[i].dev_city,
          dev_type:response.data.data[i].dev_type,
          dev_id:response.data.data[i].dev_id,
    
          temp_num:response.data.data[i].temp_num,

          total_num:response.data.data[i].total_num,
    
          flameout_num:response.data.data[i].flameout_num,
          max_flameout_count:response.data.data[i].max_flameout_count,
          set_temp:response.data.data[i].set_temp,

          low_temp_min_flow:response.data.data[i].low_temp_min_flow,
          temp_diff:response.data.data[i].temp_diff,
          low_temp_num:response.data.data[i].low_temp_num,
          time_date:response.data.data[i].time_date,
          liter_diff:response.data.data[i].liter_diff,
          }
        }
               for(var i=0;i<response.data.data.length;i++){
 
    
            this.tableData1[i].fault_type="加热不足"
          }
        
        this.total=response.data.count
        this.currentPage=this.temp_currentPage
this.tableData1=JSON.parse(JSON.stringify(this.tableData1)); 

console.log(this.tableData1)



    

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
       // 地区框切换触发函数
       handleChange() {
       this.value2 = []
       this.value3 = []
       request.post('fault/page/gettype', null, {
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
        // this.options1=response.data.data
        // console.log(this.options1)
       }).catch((err) => {
       });  
       },
       handleSelect2()//设备号触发函数:当按省份型号查询后，取消型号后再次选择设备号时会执行此条函数
       { 
             
request.post('fault/page/gettype', null, {
    

        params:
          { 
            flag: this.value.length,
            province_code: this.value[0],
            city_code: this.value[1],
          },
       }).then(({ data: response }) => {
        console.log(response.data.data)

        this.options3=response.data.data1;
        // this.options1=response.data.data
        // console.log(this.options1)
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
        request.post('fault/page/getequipment', null, {
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
          // this.options1=response.data.data
          // console.log(this.options1)
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
        
      
      if(this.$route.query.id!=null){

this.value3=this.$route.query.id
this.value2=this.$route.query.type
this.shijian=this.$route.query.time//接收到的日期时间，需转换为时间戳再减去13天的时间戳，再转换为日期
 
 

  var city=this.$route.query.city.slice(0,2)+"0000" 
  console.log(city);
  this.value=[city,this.$route.query.city]


      }

     request.post('fault/page/ceshi', null, {
         params:
         { 
         },
       }).then(({ data: response }) => {
         console.log(response.data);
         this.options2=response.data.data;  //型号框下拉内容
         this.options3=response.data.data1;   //设备框下拉内容
       }).catch((response) => {
       });   //型号设备下拉框前后端交互
	   setTimeout(() => {

 this.search()
    },100);
 if(this.$route.query.id!=null){
  this.datatime[0]=this.dateFormat(this.shijian);  //点击的日期
  this.datatime[1]=this.dateFormat(this.shijian);  //点击的日期

  const sj=new Date(this.datatime[0])
   sj.setTime(sj.getTime()-86400000*13);  //一周
  console.log(sj)
this.datatime[0]=this.dateFormat(sj)//一周前的时间


  //this.datatime[0].getTime()-86400000*13
 }else{
           //默认时间显示近一周
  const dt  = new Date();
  const dt1 = new Date();
  dt.setTime(dt.getTime()-86400000);//一天是86400000
  dt1.setTime(dt.getTime()-86400000*13);  //一周
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

