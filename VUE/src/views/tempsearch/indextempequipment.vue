<template>
  <div id="app1">

 <div class="search" align="center" style="margin-top:20px">
 <el-form ref="form" class="ItemInfo" :model="equipment_info" label-width="80px" :inline="true"> 
  <el-select v-model="theme" @change='changetheme' placeholder="请选择">
    <el-option
      v-for="item in themescope"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
    <el-cascader
     v-model="value"
     ref="cascaderAddr"
    :options="options"
     @change="handleChange"
      collapse-tags
      :placeholder='name'
      :props="{ checkStrictly: true }"
     style="width:250px; margin-right:0px;"
    clearable></el-cascader>
     <span v-if='this.searchmark=="1"' style="margin-left:30px">型号：</span>
    <span v-if='this.searchmark=="2"' style="margin-left:30px">城市：</span>
    <el-cascader
    
     v-model="value2"
     ref="cascaderAddr1"
    :options="options1"
     :placeholder="name1"
     style="width:250px; margin-right:0px;"
    clearable></el-cascader>
      <span style="margin-left:30px">日期: </span>
      <!-- <el-date-picker
      id="time"
      v-model="month"
        style="width:150px; margin-right:0px;"
      type="month"
      align="right"
     placeholder="选择月"
      format="yyyy-MM"
      value-format="yyyy-MM">
    </el-date-picker> -->
     <el-date-picker
      id="time"
      v-model="month"
        style="width:250px; margin-right:0px;"
      type="daterange"
      align="right"
     range-separator="-"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      format="yyyy-MM-dd"
      value-format="yyyy-MM-dd">
    </el-date-picker>
    <el-button type="primary" @click="search">查询</el-button>
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

   <el-divider style="margin-top:0px; margin-bottom:0px" ></el-divider>
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
  <span  style="margin-top:0px;margin-left:30px;display:inline-block;height:50px">升温段评分：</span>
     <el-slider
      v-model="heat_average"
      @change="search"
      style="width:400px; margin-top:0px;margin-left:30px;display: inline-block;margin-bottom:0px"
      range
      :step="10"
      :marks="marks"
      :max="100">
    </el-slider>
 <span  style="margin-top:0px;margin-left:30px;display:inline-block;height:50px">恒温段评分：</span>
     <el-slider
      v-model="stable_average"
      @change="search"
      style="width:400px; margin-top:0px;margin-left:30px;display: inline-block;margin-bottom:0px"
      range
      :step="10"
      :marks="marks"
      :max="100">
    </el-slider>
     <el-divider style="margin-top:0px; margin-bottom:0px" ></el-divider>
    </div>
     <el-table 
      :data="tableData"  
     
       @sort-change="changeTableSort" border  style="width: 100%;margin-top:10px;" align="center" :row-class-name="tableRowClassName1" 
      :default-sort = "{prop: 'temp_score', order: 'ascending'}">
        <el-table-column  type="index" align="center" label="序号" :index="indexMethod"></el-table-column>
        


       <el-table-column 
        align="center"
        v-for="item in options2"
        :key="item"
        :prop="item.prop"
        :label="item.label">
         </el-table-column>
        <el-table-column  prop="time_date" align="center" sortable label="日期"></el-table-column>
      <el-table-column  prop="dev_id" align="center" label="设备"
        :filters="tablefilter1"
      :filter-method="filterHandler"></el-table-column>
      <el-table-column  prop="temp_score"   align="center" sortable label="温度评估分数(0~100)"></el-table-column>
       <el-table-column  prop="heat_temp_score" align="center" sortable label="平均升温段评分"></el-table-column>
       <el-table-column  prop="stable_temp_score" align="center" sortable label="平均恒温段评分"></el-table-column>
              <el-table-column  prop="ave_heat_duration" align="center" sortable :sort-method="(a,b) => sortBytime(a ,b , 'ave_heat_duration')" label="平均每次加热时长"></el-table-column>
             <el-table-column  prop="overshoot_value" align="center" sortable label="平均超调量"></el-table-column>
               <el-table-column  prop="ave_un_sable_duration" align="center" sortable :sort-method="(a,b) => sortBytime(a ,b , 'ave_un_sable_duration')" label="平均每次不恒温时长"></el-table-column>

       <el-table-column  prop="temp_range" align="center" sortable label="平均极差"></el-table-column>
      <el-table-column  prop="ave_unstable_proportion" align="center" sortable label="不恒温时长占比%"></el-table-column>
      <el-table-column  prop="temp_valid_time" align="center" sortable :sort-method="(a,b) => sortBytime(a ,b , 'temp_valid_time')" label="温度有效时长/日"></el-table-column>
      <el-table-column  prop="temp_num" align="center" sortable label="温度有效片段数/日"></el-table-column>
     <el-table-column v-if="flag1" prop="city_code" align="center" label="城市编号"></el-table-column>
      <el-table-column
      align="center"
      label="操作"
      >
      <template slot-scope="scope">
        <el-button
          @click="jumppage(scope.row)"
          type="text"
          size="small"
          align="center">
          设备详细
        </el-button>
      </template>
    </el-table-column>
    
      </el-table>
<!--
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
       :total="tableData.length">
    </el-pagination>
    -->
  </div>
</template>

<style>
  .el-table .stable-row {
    background: #c1ffc12a;
  }

  .el-table .step-row {
    background: #83fcfc2d;
  }
   .el-table .shock-row {
    background: #ff6a6a28;
  }
</style>
<script>
import JsonExcel from 'vue-json-excel';

import request from '@/utils/request';
  var cityname=[];
  var initialflag=[true,true]
  var value1=[]
  var value2=[]
  var jumpinitialflag="0"
export default {
 components: {
      'download-excel': JsonExcel
    }, 
  data() {
    return {
json_fields: {
           "型号":{ 
            field:"dev_type",
            callback:value =>{
              return  "&nbsp;" +value;
            }
            },
            "日期":'time_date',

            
          "设备":{ 
            field:"dev_id",
            callback:value =>{
              return  "&nbsp;" +value;
            }
            },
          '温度评估分数': 'temp_score',
          '平均升温段评分': 'heat_temp_score',
          '平均恒温段段评分': 'stable_temp_score',
          '平均每次加热时长': 'ave_heat_duration',
           '超调量':'overshoot_value' ,
            '平均每次不恒温时长': 'ave_un_sable_duration',
          '平均极差': 'temp_range',
          
          '不恒温时长占比': 'ave_unstable_proportion',
          '温度有效时长/日':'temp_valid_time',
            
         
          '温度有效片段数/日':'temp_num'
          },
stable_average:[0,100],
heat_average:[0,100],
average:[0,100],
        marks: {
          0: '0',
          30: '30',
          60: '60',
          90: '90',
          100:'100',
        },

            perPage:25,// 每页显示条数
      currentPage: 1, // 当前页
      temp_currentPage: 1,
        options:[],
        
        themescope:[{
          value: '0',
          label: '地区'

        },
        {
          value: '1',
          label: '型号'
        }],
        theme:'0',
         options2:[{
          prop: 'dev_type',
          label: '型号',

         },     
         ],
         options1:[],
         value2:'',
        value:"",
        month:[],
        name:'请选择城市',//默认显示1
        name1:"请选择型号",//默认显示2
        tableData:[],
        searchmark:"1",
        flag1:false,
        tablefilter1:[{text: '稳定模式', value: '稳定模式'}, {text: '阶跃模式', value: '阶跃模式'}, {text: '震荡模式', value: '震荡模式'}]
    
    
    };
  },
  created() {
  

  this.axios.get( "data/chinacity copy.json").then((response)=>{
this.options=response.data;

 this.options=JSON.parse(JSON.stringify(this.options));




console.log(this.$route.query.flag)

 if(this.$route.query.flag=="2"){
   this.value=[this.$route.query.province,this.$route.query.city]
   this.month=[this.$route.query.month,this.$route.query.month1]
   this.average=[this.$route.query.average0,this.$route.query.average1]
   this.search()  
 }else if(this.$route.query.flag=="1"){
   this.value=[this.$route.query.province]
   this.month=[this.$route.query.month,this.$route.query.month1]
   this.average=[this.$route.query.average0,this.$route.query.average1]
   this.search()  
 }else{

  if(this.$route.query.type!=null){
   request.post('tableStoreDates/page/list', null, {
        params:
        { 
          pagetype: 'datafeatures',
        },
      }).then(({ data: response }) => {
          // this.total=response.data.count
        console.log(response.data.data)
        this.month=[response.data.data.update_time,response.data.data.update_time]
      }).catch((err) => {
      });
            this.options1[0]={label:this.$route.query.type,
                              value:this.$route.query.type,}
     this.options1=JSON.parse(JSON.stringify(this.options1));
     // console.log(this.options1)
      this.value2=[this.$route.query.type]
      console.log(this.value2)
         this.value=[this.$route.query.province,this.$route.query.city]
         jumpinitialflag=3
         // this.value[1]=this.$route.query.city
      setTimeout(() => {
             this.search()
        }, 100);



  }else{
       jumpinitialflag="1"
   request.post('tableStoreDates/page/list', null, {
        params:
        { 
          pagetype: 'datafeatures',
        },
      }).then(({ data: response }) => {
          // this.total=response.data.count
        console.log(response.data.data)
        this.month=[response.data.data.update_time,response.data.data.update_time]
      }).catch((err) => {
      });
      this.changetheme("0")
  }

 }
 

//console.log(this.options);
}).catch((response)=>{
//console.log(response);
})

    


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
    sortBytime(obj1, obj2, column){
      console.log(obj1, obj2, column)
      var at = this.time2sec(obj1[column])
      var bt = this.time2sec(obj2[column])
      console.log(at, bt)
      if(at>bt){
        return 1
      }else{
        return -1
      }
    },
    sortBytime1(obj1,column,order){
      var condition=[];
      if(column=='temp_valid_time'||column=='ave_heat_duration'||column=='ave_un_sable_duration'){
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
      console.log(obj1)
      return obj1;
    },
    changeTableSort(item){
			let that = this
      console.log(item)
      for(var i=0;i<that.tableData.length;i++){
        that.tableData[i].children=that.sortBytime1(that.tableData[i].children,item.prop,item.order);
      }
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
  //改变查询主题，更改options内容
    changetheme(value){
       //  console.log(value)
       this.tableData=[]
       this.value2=[]
         if(value=="0"){
           this.name="请选择城市"
            this.name1="请选择型号"
this.axios.get( "data/chinacity copy.json").then((response)=>{
this.options=response.data;

 this.options=JSON.parse(JSON.stringify(this.options));
 if(initialflag[0]==true){
   this.value=[this.options[0].value,this.options[0].children[0].value]
   
   initialflag[0]=false
 }else{
  this.value=value1
  console.log(value1)
}
 this.searchmark='1'
  this.options2[0].label="型号"
  
  this.options2=JSON.parse(JSON.stringify(this.options2)); 
setTimeout(() => {
             this.handleChange(this.value)
        }, 50);
}
).catch((response)=>{
//console.log(response);
})
         }else{
             this.name="请选择型号"
            this.name1="请选择城市"
             this.options=[];
        request.post('tableStoreDates/page/list', null, {
        params:
        { 
          pagetype:'typesummary',
          flag:'1'
        },
      }).then(({ data: response }) => {
        for(var i=0;i<response.data.data.length;i++){
          this.options[i]={label: response.data.data[i].dev_type,value: response.data.data[i].dev_type}
        }
        this.options=JSON.parse(JSON.stringify(this.options)); 
        this.searchmark='2'
         this.options2[0].label="城市"
       this.options2=JSON.parse(JSON.stringify(this.options2)); 
       if(initialflag[1]==true){
         this.value=[this.options[0].value]
         console.log(this.value)
         initialflag[1]=false
       }else{
         this.value=value2
         console.log(value2)
       } 
       setTimeout(() => {
             this.handleChange(this.value)
        }, 50);
      //  this.value=[['00012HES'],['00016HGS']]
       // console.log(response.data.data)
      }).catch((err) => {
        // this.$message.error(err);
      });
      
         }
    },
     search(){
           
   
 this.tableData=[];
 this.tablefilter1=[]
 //this.total=0
       // this.currentPage=1
        //this.temp_currentPage=1
        console.log(this.value2)
        console.log(this.value[1],this.$route.query.city)
        if(this.value[1]!=this.$route.query.city){
          jumpinitialflag=1
        }
      request.post('indextemp/page/tempequipment', null, {
        params:
        { 
         perPage: this.perPage,
      //    currentPage:this.temp_currentPage,
          category: this.value2[0],
          timeLow : this.month[0],    //时间范围
          timeHigh : this.month[1],
          city:this.value[1],
          province:this.value[0],
          flag:this.searchmark,
          flag1:jumpinitialflag,
          id:this.$route.query.id
        },
      }).then(({ data: response }) => {

 
       


      //  this.total=response.data.count
       if (response.data.data==""){
                  this.$message.error('很抱歉，查询结果为空');
    
       }

      console.log(response.data.data)
      console.log(response.data.filter)
      console.log(response.data.dev_type)
      if(jumpinitialflag=="0"){
        jumpinitialflag="1"
      }
      if(this.searchmark=="2"){
         cityname=response.data.province;
     }else{
       cityname=response.data.dev_type;
     }
     var j=0
   for(var i=0;i<response.data.filter.length;i++){
     //console.log(response.data.zhengshu[response.data.filter[i]])
     //console.log(response.data.tabledates3[i].dev_province)
          if(response.data.zhengshu[response.data.filter[i]][0]>=this.average[0]&&response.data.zhengshu[response.data.filter[i]][0]<=this.average[1]&&response.data.zhengshu[response.data.filter[i]][5]>=this.heat_average[0]&&response.data.zhengshu[response.data.filter[i]][5]<=this.heat_average[1]&&response.data.zhengshu[response.data.filter[i]][6]>=this.stable_average[0]&&response.data.zhengshu[response.data.filter[i]][6]<=this.stable_average[1]){

     this.tableData[j++]={
     //dev_province:response.data.tabledates3[i].dev_province,
     // dev_city:response.data.tabledates3[i].dev_city,

       dev_id:response.data.filter[i],
     dev_type:cityname[i],
     temp_valid_time:this.sec2time(parseInt(response.data.time[response.data.filter[i]][0])),
     ave_heat_duration:this.sec2time(parseInt(response.data.time[response.data.filter[i]][1])),
     ave_un_sable_duration:this.sec2time(parseInt(response.data.time[response.data.filter[i]][2])),
     temp_score:response.data.zhengshu[response.data.filter[i]][0],
     temp_num:response.data.zhengshu[response.data.filter[i]][1],
     overshoot_value:response.data.zhengshu[response.data.filter[i]][3],
     temp_range:response.data.zhengshu[response.data.filter[i]][4],
heat_temp_score:response.data.zhengshu[response.data.filter[i]][5],
stable_temp_score:response.data.zhengshu[response.data.filter[i]][6],
     ave_unstable_proportion:Number(parseFloat(response.data.xiaoshu[response.data.filter[i]][0]).toFixed(2)),
     time_date:this.month[0]+"~"+this.month[1]}
     
     this.tablefilter1[j]={
    text:response.data.filter[i],
    value:response.data.filter[i]
     }
     }
   }
   //console.log(this.tableData)
   this.tableData=JSON.parse(JSON.stringify(this.tableData)); 
     // this.currentPage=this.temp_currentPage
     
      }).catch((err) => {
        // this.$message.error(err);
        // console.log(err);
      });
     
   //  console.log(this.currentPage)
    },

     // 页面数量
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



//页面跳转
     jumppage(row) {
     //  console.log(row)
 //  var mon= this.Month2Time(this.timeframe)
  //  console.log(mon)
   var city1=""
   var type1=""
request.post('indextemp/page/provincecodesearch',null, {
          params:
          { 
            id: row.dev_id,
            
          },
}).then(({ data: response }) => {
  city1=response.data.data.city_code
  type1=response.data.data.dev_type
let routeData = this.$router.resolve({
path:'indextemp',
    
 query: {
   city: city1,
   id: row.dev_id,
   type:type1,
   month:this.month[0],
   month1:this.month[1],
   
 }
});

 window.open(routeData.href);

     }).catch((err) => {
         this.$message.error(err);
      });

      },
      //设备列筛选
       filterHandler(value, row, column) {
        const property = column['property'];
       // console.log(property)
        return row[property] === value;
      },
      //城市下型号选择
       handleChange(value){

         if(this.searchmark=="1")
         {
           value1=value
           this.options1=[]
    this.value2=[]
      request.post('tableStoreDates/page/list', null, {
        params:
        { 
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
                             
                              
            }
        }
            console.log( this.options1)
       this.options1=JSON.parse(JSON.stringify(this.options1));
       if(this.$route.query.province!=undefined){
         if(jumpinitialflag==false){
           this.value2=[this.$route.query.type]
           
         }else{
           this.value2=[this.options1[0].value]
         }
       } else{
         this.value2=[this.options1[0].value]
       }
       setTimeout(() => {
       this.search()
       }, 50)
      //console.log(response.data.total)
      }).catch((err) => {
        // this.$message.error(err);
        // console.log(err);
      });
         }else{
           console.log(value)
           value2=value
       this.options1=[]
        this.value2=[]
      request.post('tableStoreDates/page/list', null, {
        params:
        { 
          city: value[0], 
          pagetype: 'model2_vue',
          flag:'1'
          // timeLow : this.datatime[0],    //时间范围
          // timeHigh : this.datatime[1],
        },
      }).then(({ data: response }) => {
        var j=0
        for(var i=0; i<response.data.province.length;i++){
            this.options1[i]={label:response.data.province[i],
                              value:response.data.city_code[i],
                             
                              
            }
        }
            
       this.options1=JSON.parse(JSON.stringify(this.options1)); 
       this.value2=[this.options1[0].value]
    
       this.search()
      }).catch((err) => {
        // this.$message.error(err);
       
      });


         }
  


    },
    //表格底色
     tableRowClassName1({row, rowIndex}) {
        if (row.un_stable_proportion> 50) {
          return 'shock-row';
        } 
        return '';
      
      },
  }
};
</script>

<style lang="scss">
.el-cascader__tags {
//	display: inline-flex;
//	margin-right: 60px;
overflow: auto;
//	flex-wrap: nowrap;
}
</style>