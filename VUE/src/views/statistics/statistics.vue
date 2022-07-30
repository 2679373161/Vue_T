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
   <el-divider style="margin-top:0px; margin-bottom:0px" ></el-divider>
   <span  style="margin-top:0px;margin-left:30px;display:inline-block;height:50px">有效天数：</span>
 <el-input
  placeholder=""
  v-model="input"
  style="width:80px"
  clearable>
</el-input>
<span>—</span>
 <el-input
  placeholder=""
  v-model="input1"
  style="width:80px"
  clearable>
</el-input>
   <span  style="margin-top:0px;margin-left:30px;display:inline-block;height:50px">温度评分：</span>
     <el-slider
      v-model="average"
      @change="search"
      style="width:400px; margin-top:0px;margin-left:30px;display: inline-block;margin-bottom:0px"
      range
      :step="10"
      :marks="marks"
      :max="100">
    </el-slider>


     <el-divider style="margin-top:0px; margin-bottom:0px" ></el-divider>


<el-table ref="tableRef" :data="tableData.slice((currentPage-1)*perPage,currentPage*perPage)" 
 height="900px" border style="width: 100%;margin-top:20px" align="center">
      <el-table-column  type="index"  align="center" width='100px' label="序号" :index="indexMethod"></el-table-column>
    <el-table-column  prop="time_date" align="center" width='200px' label="时间"></el-table-column>
    <el-table-column  prop="province" align="center" width='100px' label="省份"></el-table-column>
    <el-table-column  prop="dev_city" align="center" width='100px' label="城市"></el-table-column>
    <el-table-column  prop="dev_type" align="center" width='130px' label="型号"></el-table-column>
    <el-table-column  prop="dev_id" align="center" width='190px' label="设备号"></el-table-column>
     <el-table-column  prop="total" align="center" width='150px' label="有效天数"></el-table-column>
    <el-table-column  prop="temp_score" align="center" width='150px' label="温度平均分"></el-table-column>
    <el-table-column  prop="high80" align="center" width='170px' label="高于80分天数占比"></el-table-column>
       <el-table-column  prop="sixto80" align="center" width='210px' label="60到80分天数占比"></el-table-column> 
    <el-table-column  prop="low60" align="center" width='170px' label="低于60分天数占比"></el-table-column>
   
    <el-table-column  prop="heat_mark" align="center" width='150px' label="升温时长平均分"></el-table-column>
    <el-table-column  prop="heat_mark60" align="center" width='150px' label="低于60升温时长评分占比"></el-table-column>
     <el-table-column  prop="over_shoot_mark" align="center" width='150px' label="温度过冲平均分"></el-table-column>
    <el-table-column  prop="over_shoot_mark60" align="center" width='150px' label="低于60温度过冲评分天数占比"></el-table-column>
      <el-table-column  prop="un_stable_mark" align="center" width='150px' label="恒温段不恒温占比平均分"></el-table-column> 
   <el-table-column  prop="un_stable_mark60" align="center" width='150px' label="低于60恒温段不恒温占比评分天数占比"></el-table-column>
       <el-table-column  prop="un_heat_dev_mark" align="center" width='150px' label="恒温段波动平均分"></el-table-column>
    <el-table-column  prop="un_heat_dev_mark60" align="center" width='150px' label="低于60恒温段波动评分天数占比"></el-table-column>
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
          "时间":'time_date',
          "省份": 'province',
          "城市": 'dev_city',
          "型号": 'dev_type',
          "设备号": 'dev_id',
          "有效天数": 'total',
          "温度平均分":'temp_score',
          "低于60分天数占比": 'low60',
          "升温时长平均分": 'heat_mark',
          "低于60升温时长评分占比": 'heat_mark60',
          "温度过冲平均分": 'over_shoot_mark',
          "低于60温度过冲评分天数占比": 'over_shoot_mark60',

          "恒温段不恒温占比平均分": 'un_stable_mark',
          "低于60恒温段不恒温占比评分天数占比": 'un_stable_mark60',
          "恒温段波动平均分":'un_heat_dev_mark',
          "低于60恒温段波动评分天数占比": 'un_heat_dev_mark60',



          },

     input:0,
     input1:14,
average:[0,100],
        marks: {
          0: '0',
          30: '30',
          60: '60',
          90: '90',
          100:'100',
        },



      effect:14,



      flag:"1",
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
         if((self.tableData.length==0&&this.flag==1)) {
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




 

      search(){


          console.log("666")
                
       this.effectday1()
     
     

      this.tableData=[]
      this.total=0
      this.temp_currentPage=1



    request.post('statistics/page/statistics', null, {
      params:
           { 
          flag: this.flag,
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
        var j=0
        if (this.flag==1){
        for(var i=0;i<response.data.data.length;i++){
         if(response.data.data[i].temp_score>=this.average[0]&&response.data.data[i].temp_score<=this.average[1]&&response.data.data[i].high80+response.data.data[i].sixto80+response.data.data[i].low60>=this.input&&response.data.data[i].high80+response.data.data[i].sixto80+response.data.data[i].low60<=this.input1)

          this.tableData[j++]={
           time_date:this.datatime[0]+'-'+this.datatime[1],
            city:response.data.data[i].city_code,
          province:response.data.data1[i].dev_province,
          dev_city:response.data.data1[i].dev_city,
          dev_type:response.data.data[i].dev_type,
          dev_id:response.data.data[i].dev_id,
          high80:response.data.data[i].high80,
          sixto80:response.data.data[i].sixto80,
          low60:response.data.data[i].low60,
          total:response.data.data[i].high80+response.data.data[i].sixto80+response.data.data[i].low60,
          temp_score:response.data.data[i].temp_score,
         heat_mark60:response.data.data[i].heat_mark60,
          over_shoot_mark60:response.data.data[i].over_shoot_mark60,
         un_stable_mark60:response.data.data[i].un_stable_mark60,
          un_heat_dev_mark60:response.data.data[i].un_heat_dev_mark60,
       heat_mark:response.data.data[i].heat_mark,
          over_shoot_mark:response.data.data[i].over_shoot_mark,
         un_stable_mark:response.data.data[i].un_stable_mark,
          un_heat_dev_mark:response.data.data[i].un_heat_dev_mark,
          }
        }
               
        this.total=this.tableData.length

        for(var i=0;i<response.data.data.length;i++){
          this.tableData[i].high80=(this.tableData[i].high80/this.tableData[i].total*100).toFixed(0)+'%'
          this.tableData[i].sixto80=(this.tableData[i].sixto80/this.tableData[i].total*100).toFixed(0)+'%'
           this.tableData[i].low60=(this.tableData[i].low60/this.tableData[i].total*100).toFixed(0)+'%'
            this.tableData[i].heat_mark60=(this.tableData[i].heat_mark60/this.tableData[i].total*100).toFixed(0)+'%'
             this.tableData[i].over_shoot_mark60=(this.tableData[i].over_shoot_mark60/this.tableData[i].total*100).toFixed(0)+'%'
           this.tableData[i]. un_stable_mark60=(this.tableData[i]. un_stable_mark60/this.tableData[i].total*100).toFixed(0)+'%'
             this.tableData[i].un_heat_dev_mark60=(this.tableData[i].un_heat_dev_mark60/this.tableData[i].total*100).toFixed(0)+'%'
        }

this.tableData=JSON.parse(JSON.stringify(this.tableData)); 

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
       request.post('statistics/page/gettype', null, {
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
             
request.post('statistics/page/gettype', null, {
    

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
        request.post('statistics/page/getequipment', null, {
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
      effectday1(){
        console.log("000")
     var shijian0 = new Date(this.datatime[0]);
       var shijian1 = new Date(this.datatime[1]);

      this.input1=(shijian1-shijian0)/86400000+1
      console.log(this.effect)
      }
  },
  created() {
        
 
      if(this.$route.query.id!=null){

this.value3=this.$route.query.id
this.value2=this.$route.query.type

  var city=this.$route.query.city.slice(0,2)+"0000" 
  console.log(city);
  this.value=[city,this.$route.query.city]


      }

     request.post('statistics/page/ceshi', null, {
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
  const dt1 = new Date();
  dt.setTime(dt.getTime()-86400000);//一天是86400000
  dt1.setTime(dt.getTime()-86400000*13);  //一周
  this.datatime[0]=this.dateFormat(dt1),//一周前的时间
  this.datatime[1]=this.dateFormat(dt);  //今天的时间

	   setTimeout(() => {

 this.effectday1()
    },100);

      
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
