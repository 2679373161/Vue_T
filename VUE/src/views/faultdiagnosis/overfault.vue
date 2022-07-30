<template>
  <div id="app1">
   
  <div class="search" align="center" style="margin-top:20px;">
    <el-form ref="form" class="ItemInfo" :model="equipment_info" label-width="80px" :inline="true">
    <span>升温异常诊断查询筛选项：</span>
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
      :disabled="data_state"
      id="ti"
      v-model="datatime"
      style="width:200px;margin-left:0"
      type="date"
      align="right"
      placeholder="选择日期"
      format="yyyy-MM-dd"
      value-format="yyyy-MM-dd">
    </el-date-picker>
    <el-button type="primary" @click="search" >查询</el-button>
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

<!--tableData熄火指标flag=1-->
<el-table  ref="tableRef" :data="tableData" height="900px" border style="width: 100%;margin-top:20px" align="center">
      <el-table-column  type="index"  align="center" width='60px' label="序号" :index="indexMethod"></el-table-column>
    <el-table-column  prop="time_date" align="center" width='180px' label="时间"></el-table-column>
    <el-table-column  prop="province" align="center" width='60px' label="省份"></el-table-column>
    <el-table-column  prop="dev_city" align="center" width='80px' label="城市"></el-table-column>
    <el-table-column  prop="dev_type" align="center" width='100px' label="型号"></el-table-column>
    <el-table-column  prop="dev_id" align="center" width='150px' label="设备号"></el-table-column>
    <el-table-column  prop="fault_type" align="center" width='120px' label="故障类型"></el-table-column>
       <el-table-column  prop="current_level_num" align="center" width='150px' label="当前场景片段数"></el-table-column> 
    <el-table-column  prop="total_num" align="center" width='150px' label="总有效片段数"></el-table-column>
   <el-table-column   prop="overtime_num" align="center" width='150px' label="升温异常片段数"></el-table-column>
 <el-table-column  prop="otp" align="center" width='120px' label="异常占比"></el-table-column>
       <el-table-column  prop="avg_overtime" align="center" width='150px' label="平均升温时间"></el-table-column> 
    <el-table-column  prop="avg_heat_flow" align="center" width='150px' label="平均升温水流量"></el-table-column>
   <el-table-column   prop="avg_temp_diff" align="center" width='150px' label="平均温差"></el-table-column>


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
          "当前场景片段数":'current_level_num',
          "总有效片段数":'total_num',
       "升温异常片段数":'overtime_num',
          "异常占比":'otp',
          "平均升温时间":'avg_overtime',
      "平均升温水流量":'avg_heat_flow',
            "平均温差":'avg_temp_diff'
          },





      flag:"2",
 chartVisible:false,


     
       date:new Date(),
    fanye:0,
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
      datatime:"",
      
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
        if(self.tableData.length==0){
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
//改进
      jumppage(row) {
       console.log(row)

      let routeData = this.$router.resolve({
     path:'overfaultday',
 query: {
    
     city: row.city,
   id: row.dev_id,
   type:row.dev_type,
  time:this.datatime,

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
      this.tableData=[]
      this.tableData=[]
      this.total=0
      if(this.fanye==0){
  this.temp_currentPage=1
}
    request.post('fault2/page/faultsummaries2', null, {
      params:
           { 
          flag: 2,
          perPage: this.perPage,
          currentPage:this.temp_currentPage,
          province_code: this.value[0],
          city_code: this.value[1],
          type: this.value2,
          equipment: this.value3,
          time_date:this.datatime,
          
        },
    }).then(({ data: response }) => { 
 if (response.data.data==""){
                  this.$message.error('很抱歉，查询结果为空');
    
       }


        console.log(response.data)
        console.log(response.data.data.length)
      
        for(var i=0;i<response.data.data.length;i++){
          this.tableData[i]={
            city:response.data.data[i].city_code,
          province:response.data.data1[i].dev_province,
          dev_city:response.data.data1[i].dev_city,
          dev_type:response.data.data[i].dev_type,
          dev_id:response.data.data[i].dev_id,
          time_date:response.data.data[i].start_time+"-"+response.data.data[i].time_date,
          current_level_num:response.data.data[i].current_level_num,

          total_num:response.data.data[i].total_num,
    
          overtime_num:response.data.data[i].overtime_num,
          otp:response.data.data[i].otp,
          avg_overtime:response.data.data[i].avg_overtime,

          avg_heat_flow:response.data.data[i].avg_heat_flow,
          avg_temp_diff:response.data.data[i].avg_temp_diff,



          }
        }
               for(var i=0;i<response.data.data.length;i++){
        
            this.tableData[i].fault_type="升温异常"
         
        this.currentPage=this.temp_currentPage
        this.total=response.data.count
this.tableData=JSON.parse(JSON.stringify(this.tableData)); 

console.log(this.tableData)
}
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
       request.post('fault2/page/gettype2', null, {
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
             
request.post('fault2/page/gettype2', null, {
    

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
        request.post('fault2/page/getequipment2', null, {
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
    
     request.post('fault2/page/ceshi2', null, {
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
           //默认时间显示近一周
  const dt  = new Date();

  dt.setTime(dt.getTime()-86400000);//一天是86400000
 
  this.datatime=this.dateFormat(dt),//昨天的时间
  

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
