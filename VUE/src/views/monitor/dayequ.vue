<template>
  <div id="app1">
   
  <div class="search" align="center" style="margin-top:20px;">
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

    <el-button type="primary" @click="emigrate_monitoring" >查询</el-button>

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
  <el-table ref="tableRef" :data="tableData.slice((currentPage-1)*perPage,currentPage*perPage)"  height="750px" border style="width: 100%;margin-top:20px" align="center">
    <el-table-column  type="index"  align="center" width='60px' label="序号" :index="indexMethod"></el-table-column>
    <el-table-column  prop="dev_region" align="center" width='150px' label="地区"></el-table-column>
    <el-table-column  prop="province" align="center" width='150px' label="省份"></el-table-column>
    <el-table-column  prop="city" align="center" width='150px' label="城市"></el-table-column>
    <el-table-column  prop="dev_type" align="center" width='150px' label="型号"></el-table-column>
    <el-table-column  prop="dev_id" align="center" width='150px' label="设备"></el-table-column>
    <el-table-column  prop="temp_score" align="center" width='150px' label="期间温度评分"></el-table-column>
    <el-table-column  prop="heat_mark" align="center" width='150px' label="升温时长评分"></el-table-column>
    <el-table-column  prop="over_shoot_mark" align="center" width='150px' label="温度过冲评分"></el-table-column>
    <el-table-column  prop="un_heat_dev_mark" align="center" width='150px' label="恒温段波动评分"></el-table-column>
        <el-table-column  prop="un_stable_mark" align="center" width='150px' label="恒温段不恒温占比评分"></el-table-column>
   <el-table-column  prop="city_code" v-if="false" align="center" label="城市编码"></el-table-column>
 <el-table-column  prop="province_code" v-if="false" align="center" label="省份编码"></el-table-column>
    <el-table-column
      label="操作"
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
          期间设备详情
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
      

          '期间温度评分':'temp_score'
          },

       xData:[],
       yData:[],
       chartVisible:false,
       mindutycyccoeff:"",
       maxdutycyccoeff:"",
       mincurrcoeff:"",
       maxcurrcoeff:"",
       windpressuresensor:"",
       rewaterflow:"",
       segment:"",
       ka:"",
       kb:"",
       kc:"",
       kf:"",
       T1a:"",
       T1c:"",
       T2a:"",
       T2c:"",
       Tda:"",
       Tdc:"",
       Wo:"",
       Wc:"",
       applianceid:"",
       canshu:"",
       options1: [{
          value: 'PH',
          label: 'PH'
        }, {
          value: 'FH',
          label: 'FH'
        }, {
          value: 'PL',
          label: 'PL'
        }, {
          value: 'FL',
          label: 'FL'
        }, {
          value: 'dH',
          label: 'dH'
        }, {
          value: 'Fd',
          label: 'Fd'
        }, {
          value: 'CH',
          label: 'CH'
        }, {
          value: 'Fc',
          label: 'Fc'
        }],
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

      this.tableData=[]
      this.total=0
      var v;
      var v1;
      const dt = new Date();
      const dt1 = new Date();
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
        this.currentPage=1
        this.temp_currentPage=1
        request.post('equday/page/initialize', null, {
        params:
        { 
          flag: flag,
          perPage: this.perPage,
          currentPage:1,
          province_code: this.value[0],
          city_code: this.value[1],
          type: this.value2,
          equipment: this.value3,
          timeLow:this.datatime,
          timeHigh:this.datatime,
        },
       }
       ).then(({ data: response }) => {
        // if(this.value3==""){ 
          this.total=response.data.count
        // }else{
        //   this.total=1
        // }
        console.log(response.data.data)
        for(var i=0;i<response.data.data1.length;i++){
          this.tableData[i]={dev_region:response.data.data1[i].dev_region,province:response.data.data1[i].dev_province,
          city:response.data.data1[i].dev_city,dev_type:response.data.data[i].dev_type,dev_id:response.data.data[i].dev_id,
          temp_score:response.data.data[i].temp_score,city_code:response.data.data[i].city_code,province_code:response.data.data[i].province_code,
           un_heat_dev_mark:response.data.data[i].un_heat_dev_mark, un_stable_mark:response.data.data[i].un_stable_mark, 
            over_shoot_mark:response.data.data[i].over_shoot_mark,heat_mark:response.data.data[i].un_stable_mark, 
          }
        }
               for(var i=0;i<response.data.data1.length;i++){
          if(this.tableData[i].temp_score=="0"){
            this.tableData[i].temp_score="无效片段"
          }
        }
        this.tableData=JSON.parse(JSON.stringify(this.tableData)); 
        this.currentPage=this.temp_currentPage
       }).catch((err) => {
        
       });
       }
           
       },

   jumppage(row) {
       console.log(row)

      let routeData = this.$router.resolve({
     path:'indextempequipment',
 query: {
province:row.province_code,
   city:row.city_code, 
   type:row.dev_type,
   id: row.dev_id,
   month:this.datatime,
   month1:this.datatime,
  }
});
 window.open(routeData.href);
      },

      open(){
        this.$nextTick(() => {
        //  执行echarts方法
        this.chartData=[];
         var v;
         var v1;
         const dt = new Date();
         const dt1 = new Date();
         dt.setTime(dt.getTime()-86400000);
         dt1.setTime(dt.getTime()-2592000000);
         v=this.dateFormat(dt);
         v1=this.dateFormat(dt1);
         request.post('equday/page/Datachart', null, {
          params:
          { 
           equipment:this.applianceid ,
           timeLow:this.datatime,
           timeHigh:this.datatime,
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


    handleClick(tab, event) {
        console.log(tab, event);
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

    dateFormat:function(time) {
    var date=new Date(time);
    var year=date.getFullYear();
    var month= date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
    var day=date.getDate()<10 ? "0"+date.getDate() : date.getDate();

    // 拼接 可改成自己所要的时间格式
    return year+"-"+month+"-"+day;
    },

    download(){
     
      this.downloadflag=1

      
    },
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.perPage=val;
      },
    handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage=val;
      },

      //翻页索引号变化
      indexMethod(index){

         return(this.currentPage-1)*this.perPage+index+1;
      },

       // 地区框切换触发函数
       handleChange() {
       this.value2 = []
       this.value3 = []
       request.post('equday/page/gettype', null, {
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
             
request.post('equday/page/gettype', null, {
    

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
        request.post('equday/page/getequipment', null, {
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
     request.post('equday/page/ceshi', null, {
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
  const dt1 = new Date();
  dt.setTime(dt.getTime());
  dt1.setTime(dt.getTime()-604800000);  //一周
  //this.datatime[0]=this.dateFormat(dt1),//一周前的时间
  this.datatime=this.dateFormat(dt-86400000);  //今天的时间

    this.axios.get( "data/chinacity copy.json").then((response)=>{
      this.options = response.data;
      this.options = JSON.parse(JSON.stringify(this.options)); 
    }).catch((response)=>{
     
    }
   
    
    )
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
