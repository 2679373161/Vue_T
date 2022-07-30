<template>
  <div id="app1">
   
  <div class="search" align="center" style="margin-top:20px;">
     <el-form ref="form" class="ItemInfo" :model="equipment_info" label-width="80px" :inline="true">
    <span>故障实时记录统计：</span>
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
      <el-button >当前页导出Excel</el-button>
    </download-excel>
</el-form-item>
</el-form>
      
       
  




<el-table  ref="tableRef" :data="tableData" :cell-style="cellStyle"  height="900px" border style="width: 100%;margin-top:20px" align="center">
      <el-table-column  type="index"  align="center"  label="序号" :index="indexMethod"></el-table-column>
    <el-table-column  prop="data_time" align="center"  label="时间"></el-table-column>
      <el-table-column  prop="dev_type" align="center"  label="型号"></el-table-column>
    <el-table-column  prop="dev_id" align="center"  label="设备号"></el-table-column>
          <el-table-column
      label="调参详情"
      align="center">
      <template slot-scope="scope">
        <el-button
          @click="jumppage(scope.row)"
          type="text"
          size="small"
          align="left">
        调参详情
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
      value:[],
      options:[],
      options2: [],  //型号框下拉
      options3:[],  //设备框下拉
   
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

     jumppage(row) {
       console.log(row)

      let routeData = this.$router.resolve({
     path:'upload',
 query: {

   id: row.dev_id,

  }
});
 window.open(routeData.href);
      },

    dateFormat1:function(time) {
    var date=new Date(time);
    var year=date.getFullYear();
    var month= date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
    var day=date.getDate()<10 ? "0"+date.getDate() : date.getDate();
    var hours=date.getHours()<10 ? "0"+date.getHours() : date.getHours();
    var minutes=date.getMinutes()<10 ? "0"+date.getMinutes() : date.getMinutes();
    var seconds=date.getSeconds()<10 ? "0"+date.getSeconds() : date.getSeconds();
    // 拼接 可改成自己所要的时间格式
    return year+"-"+month;
    },

      

      search(){




          console.log("666")
                 
            this.tableData=[]
     


      this.total=0
      console.log(this.fanye)
if(this.fanye==0){
  this.temp_currentPage=1
}
console.log(this.temp_currentPage)
    request.post('collection/page/idfault', null, {
      params:
           { 
    
          perPage: this.perPage,
          currentPage:this.temp_currentPage,
          flag:"E1",
          type: this.value2,
          id: this.value3,

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


        }

        this.total=response.data.count
this.tableData=JSON.parse(JSON.stringify(this.tableData)); 
	this.currentPage=this.temp_currentPage ;
this.sume0=sum(this.tableData.e0)
console.log(this.sume0)
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
      this.fanye=1
      this.search();
      this.fanye=0
    },
    indexMethod(index) {
      return(this.currentPage-1)*this.perPage+index+1;
    
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
        request.post('collection/page/getequ', null, {
          params:
          { 
            

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
     request.post('collection/page/gettype', null, {
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
 if(this.$route.query.type!=null&&this.$route.query.prodmonth==null){
  this.datatime[0]=this.dateFormat(this.$route.query.time);  //点击的日期
  this.datatime[1]=this.dateFormat(this.$route.query.time);  //点击的日期
this.value2=this.$route.query.type


  //this.datatime[0].getTime()-86400000*13
 }else if(this.$route.query.prodmonth!=null&&this.$route.query.type==null){

console.log(new Date("2022-03-20"))




 this.datatime[0]=this.dateFormat(this.$route.query.time0);  //点击的日期
  this.datatime[1]=this.dateFormat(this.$route.query.time1);  //点击的日期
 
//this.value2=this.$route.query.type
//接收到的日期时间，需转换为时间戳再减去13天的时间戳，再转换为日期

 //console.log(this.value1[0],this.value1[1])



      }
 else{
           //默认时间显示近一周
  const dt  = new Date();
  const dt1 = new Date();
  dt1.setTime(dt.getTime());//一天是86400000
  dt.setTime(dt.getTime()+86400000*1);  //一周
  this.datatime[0]=this.dateFormat(dt1),//今天
  this.datatime[1]=this.dateFormat(dt);  //明天
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
