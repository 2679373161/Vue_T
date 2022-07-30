<template>
  <div>
<div class="search" align="center" style="margin-top:20px">
 <el-form ref="form" class="ItemInfo" :model="equipment_info" label-width="80px" :inline="true">
    <el-select v-model="value" placeholder="月份/日期范围" style="width:120px;margin-left:30px;" @change="switchTimeselection">
   <el-option
        v-for="item in select"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
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
       style="margin-left:20px;"
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

    <div class="content" style="margin-top:20px">
          <el-table :data="tableData" ref="filterTable" @sort-change="changeTableSort" border style="width: 100%;margin-top:10px" align="center"
           :cell-style="cellStyle" row-key="id" :default-sort = "{prop: 'low60device', order: 'descending'}">
            <template v-for="(headerItem, headerIndex) in headerData">
            <el-table-column  type="index"  align="center" label="序号" :index="indexMethod"></el-table-column>
            <el-table-column  prop="time_date" align="center" label="时间"></el-table-column>
            <el-table-column v-if="headerItem.select1" :label="headerItem.label" :prop="headerItem.prop" :key="headerIndex" align="center">
              <template #header>
                <el-popover placement="bottom" title="请选择" trigger="click">
                  <div slot="reference" class="search-header">
                    <span class="search-title">{{ headerItem.label }}</span>
                    <i class="el-icon-files"></i>
                  </div>
                  <el-cascader
                    v-model="headerItem.value"
                    ref="cascaderAddr"
                    :options="headerItem.option"
                    style="width:300px;"
                    :props="{ multiple: true}"
                    clearable>
                  </el-cascader>
                  <br>
                  <el-button @click="filterprovinces">筛选</el-button>
                  <el-button @click="selectallprovince">全选</el-button>
                  <el-button @click="selectreset">重置</el-button>
                </el-popover>
              </template>
              <template slot-scope="scope">
                    {{ scope.row[headerItem.prop] }}
              </template>
            </el-table-column>
            </template>
            <el-table-column prop="high80device" align="center" sortable="custom" label="80-100">
           <template slot-scope="scope">
               <div>
                 <a href="javascript:;" @click="jumppage1(scope.row)">{{scope.row.high80device}}</a>
               </div>
             </template>
              </el-table-column>
            <el-table-column prop="sixto80device" align="center" sortable label="60-80">
             <template slot-scope="scope">
               <div>
                 <a href="javascript:;" @click="jumppage2(scope.row)">{{scope.row.sixto80device}}</a>
               </div>
             </template>
             </el-table-column> 
            <el-table-column prop="low60device" align="center"  sortable label="0-60">
             <template slot-scope="scope">
               <div>
                 <a href="javascript:;" @click="jumppage3(scope.row)">{{scope.row.low60device}}</a>
               </div>
             </template>
             </el-table-column>
            <el-table-column prop="totaldevice" align="center" sortable label="总数">
             <template slot-scope="scope">
               <div>
                 <a href="javascript:;" @click="jumppage4(scope.row)">{{scope.row.totaldevice}}</a>
               </div>
             </template>
             </el-table-column>
            <el-table-column  prop="area_code" v-if="false" align="center" label="地区编码"> </el-table-column>
          </el-table>
          </el-tab-pane>
        </el-tabs>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import JsonExcel from 'vue-json-excel';
import request from '@/utils/request';
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
          "日期":'time_date',
          "地区": 'province',
          "80-100": 'high80device',
          "60-80": 'sixto80device',
          "0-60": 'low60device',
          "总数": 'totaldevice',
          },
    headerData:[
        {
          label: '地区',
          prop: 'province',
          select1:true,
          value:[],
          option:[],
        },],  
    options1: [{
        value: '1',
        label: '大于80分'
      }, {
        value: '2',
        label: '60-80'
      }, {
        value: '3',
        label: '60以下'
      }, ],
      value1: '1',
      date:new Date(),
      datatime:[], //日期选择框
      activeName: 'first', //表格or柱状图
      perPage:25,// 每页显示条数
      currentPage: 1, // 当前页
      temp_currentPage: 1,
      total: 0, // 默认总条数
      tableData:[],
      tableData1:[],
      value:'1',
      radio:'1',
      select:[
        {
          value: '1',
          label: '省份'
        }, {
          value: '2',
          label: '城市'
      }
      ],
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
    };
  },
  methods:{
    switchTimeselection(){
      setTimeout(() => {  
        this.search()
           }, 50)
           },
    changeTableSort(item){
			let that = this
      console.log(item)
      for(var i=0;i<that.tableData.length;i++){
        that.tableData[i].children=that.sortBytime1(that.tableData[i].children,item.prop,item.order);
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
search(){
       
       this.tableData=[]
       this.total=0
    request.post('statistics/page/getidnumber', null, {
      params:
           { 
          flag: this.flag,
          perPage: this.perPage,
          currentPage:this.temp_currentPage,
          searchflag:this.value,
          timeLow:this.datatime[0],
          timeHigh:this.datatime[1],
        },
    }).then(({ data: response }) => { 

      if(this.tableData[0]==undefined){
          this.tableData=[{data:''}]
        }
if (this.value==1){
        for(var i=0;i<response.data.data.length;i++){
          this.tableData[i]={
          time_date:this.datatime[0]+'-'+this.datatime[1],
          province:response.data.data1[i].dev_province,
          area_code:response.data.data[i].province_code, 
          high80device:response.data.data[i].high80device,
          sixto80device:response.data.data[i].sixto80device,
          low60device:response.data.data[i].low60device,
          totaldevice:response.data.data[i].high80device+response.data.data[i].sixto80device+response.data.data[i].low60device
          }
        }
           console.log(response.data.data[0].province_code)
        this.total=response.data.count
        this.tableData=JSON.parse(JSON.stringify(this.tableData)); 
} 
if (this.value==2){
        for(var i=0;i<response.data.data.length;i++){
          this.tableData[i]={
          time_date:this.datatime[0]+'-'+this.datatime[1],
          province:response.data.data1[i].dev_city,
          area_code:response.data.data[i].city_code, 
          high80device:response.data.data[i].high80device,
          sixto80device:response.data.data[i].sixto80device,
          low60device:response.data.data[i].low60device,
          totaldevice:response.data.data[i].high80device+response.data.data[i].sixto80device+response.data.data[i].low60device
          }
        }
        this.total=response.data.count
this.tableData=JSON.parse(JSON.stringify(this.tableData)); 
}
      console.log(this.tableData[0])
       this.tableData1=this.tableData;
        this.getOptionlist();
      if (response.data.data==""){
                  this.$message.error('很抱歉，查询结果为空');
       }

        //this.drawTable();

}).catch((err) => {
        this.$message.error(err);
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

//80-100
jumppage1(row){
  if(this.value==1){
 let routeData = this.$router.resolve({
      path:'indextempequipment',   
      query: {
        flag:"1",
        province:row.area_code,
        average0:"80",
        average1:"100",
        month:this.datatime[0],
        month1:this.datatime[1],
      }
      })
      window.open(routeData.href);
  }else if(this.value==2){
    console.log("444")
 let routeData = this.$router.resolve({
      path:'indextempequipment',   
      query: {
        flag:"2",
        province:row.area_code.slice(0,2)+"0000", 
        city:row.area_code,
        average0:"80",
        average1:"100",
        month:this.datatime[0],
        month1:this.datatime[1],
      }
      })
      window.open(routeData.href);
  }  
    },
//60-80
jumppage2(row){
  if(this.value==1){
 let routeData = this.$router.resolve({
      path:'indextempequipment',   
      query: {
        flag:"1",
        province:row.area_code,
        average0:"60",
        average1:"80",
        month:this.datatime[0],
        month1:this.datatime[1],
      }
      })
      window.open(routeData.href);
  }else if(this.value==2){
    console.log("444")
 let routeData = this.$router.resolve({
      path:'indextempequipment',   
      query: {
        flag:"2",
        province:row.area_code.slice(0,2)+"0000", 
        city:row.area_code,
        average0:"60",
        average1:"80",
        month:this.datatime[0],
        month1:this.datatime[1],
      }
      })
      window.open(routeData.href);
  }  
    },
//0-60
jumppage3(row){
  if(this.value==1){
 let routeData = this.$router.resolve({
      path:'indextempequipment',   
      query: {
        flag:"1",
        province:row.area_code,
        average0:"0",
        average1:"60",
        month:this.datatime[0],
        month1:this.datatime[1],
      }
      })
      window.open(routeData.href);
  }else if(this.value==2){
    console.log("444")
 let routeData = this.$router.resolve({
      path:'indextempequipment',   
      query: {
        flag:"2",
        province:row.area_code.slice(0,2)+"0000", 
        city:row.area_code,
        average0:"0",
        average1:"60",
        month:this.datatime[0],
        month1:this.datatime[1],
      }
      })
      window.open(routeData.href);
  }  
    },
//总台数
jumppage4(row){
  if(this.value==1){
 let routeData = this.$router.resolve({

      path:'indextempequipment',   
      query: {
        flag:"1",
        province:row.area_code,
        average0:"0",
        average1:"100",
        month:this.datatime[0],
        month1:this.datatime[1],
      }
      })
      window.open(routeData.href);
  }else if(this.value==2){
    console.log("444")
 let routeData = this.$router.resolve({
      path:'indextempequipment',   
      query: {
        flag:"2",
        province:row.area_code.slice(0,2)+"0000", 
        city:row.area_code,
        average0:"0",
        average1:"100",
        month:this.datatime[0],
        month1:this.datatime[1],
      }
      })
      window.open(routeData.href);
  }  
    },
//获取表格省份选项
getOptionlist(){
      for(var i=0;i<this.tableData.length;i++){
        console.log(this.tableData[i])
        this.headerData[0].option[i]={label:this.tableData[i].province,value:this.tableData[i].province}
        console.log(this.headerData[0].option[i])
        
         this.headerData[0].option=JSON.parse(JSON.stringify(this.headerData[0].option)); 
      }
    },
//筛选按省份
  filterprovinces(){
      console.log(this.headerData[0].value)
      var k=0
      var tmpData=new Array()
      for(var i=0;i<this.headerData[0].value.length;i++){
        console.log(this.tableData1)
        for(var j=0;j<this.tableData1.length;j++){
          if(this.tableData1[j].province==this.headerData[0].value[i]){
            tmpData[k]=this.tableData1[j]
            console.log(this.tableData1[j])
            k++
          }
        }
      }
      this.tableData=tmpData
            if (this.tableData==""){
                  this.$message.error('很抱歉，查询结果为空');
       }

    },
    //全选省份
    selectallprovince(){
      var tmpData=new Array()   
      this.headerData[0].value=[]
      console.log(this.tableData1)
      for(var j=0;j<this.tableData1.length;j++){
        this.headerData[0].value[j]=this.tableData1[j].province
        tmpData[j]=this.tableData1[j]
      }
      this.headerData[0].value=JSON.parse(JSON.stringify(this.headerData[0].value)); 
      console.log(this.headerData[0].value)
      this.tableData=tmpData
            if (this.tableData==""){
                  this.$message.error('很抱歉，查询结果为空');
       }

    },
    selectreset(){
      var tmpData=new Array()   
      this.headerData[0].value=[]
      for(var j=0;j<this.tableData1.length;j++){      
        tmpData[j]=this.tableData1[j]           
      }
      this.tableData=tmpData
    },//重置
    cellStyle(row,column,rowIndex,columnIndex){
      // console.log(row)
        if(row.row.low60device>20){
          return {"color":"red","background":"#f2eada"}
        }
        return {"background":"#f2eada"}
      
    },

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.perPage=val;
        this.search();
       },
     handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage=val;
        this.search();
},
  indexMethod(index){
         if(this.downloadflag==1){
           this.currentPage=1
           
         }
         else{
         this.currentPage=this.temp_currentPage}
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

    this.axios.get( "data/chinacity copy.json").then((response)=>{
      this.options = response.data;
      this.options = JSON.parse(JSON.stringify(this.options)); 
    }).catch((response)=>{
    })
  },
};
</script>

<style  lang="scss"  scoped>
h2 {
  text-align: center;
  padding: 30px;
  font-size: 18px;
}
#myChart {
  top: 0px;
  width: 1300px;
  height: 600px;
  margin: 0 auto;
}

/deep/ .el-cascader__tags {
      width: 100%;
      // display: inline-block;
      max-width: 270px;
      max-height: 40px;
      overflow-y: auto;
      // text-overflow: ellipsis;
      white-space: nowrap;
    }

/deep/.el-tabs{
  .el-tabs__item{
            font-size: 15px ;
            font-weight: 400;
            color: #808080;
          }
  .el-tabs__item.is-active{
    font-size: 15px ;
            font-weight: 400;
            color: #409EFF;
          }
}    
</style>

