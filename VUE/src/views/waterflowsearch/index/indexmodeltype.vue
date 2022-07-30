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
     <el-table :data="tableData" @sort-change="changeTableSort" border  style="width: 100%;margin-top:10px;" align="center" :row-class-name="tableRowClassName1" 
      :default-sort = "{prop: 'water_score', order: 'ascending'}">
        <el-table-column  type="index" align="center" label="序号"></el-table-column>
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
      <el-table-column  prop="water_score" align="center" sortable label="水流量评估分数(0~100)"></el-table-column>
      <el-table-column  prop="un_stable_proportion" align="center" sortable label="不稳定占比%"></el-table-column>
      <el-table-column  prop="water_valid_time" align="center" sortable :sort-method="(a,b) => sortBytime(a ,b , 'water_valid_time')" label="总用水时长/日"></el-table-column>
       <el-table-column  prop="average_time" align="center" sortable :sort-method="(a,b) => sortBytime(a ,b , 'average_time')" label="平均每次用水时长"></el-table-column>
        <el-table-column  prop="maximum_time" align="center" sortable :sort-method="(a,b) => sortBytime(a ,b , 'maximum_time')" label="最大用水时长"></el-table-column>
      <el-table-column  prop="water_num" align="center" sortable label="用水次数/日"></el-table-column>
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
import request from '@/utils/request';
import JsonExcel from 'vue-json-excel';
  var cityname=[];
  var initialflag=[true,true]
  var value1=[]
  var value2=[]
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
            "水流量评估分数":'water_score',
            "不稳定占比%":'un_stable_proportion',
           "总用水时长/日":'water_valid_time',
           "平均每次用水时长":'average_time',
           "最大用水时长":'maximum_time',
           "用水次数/日":'water_num'


          },
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
  created() {

  this.axios.get( "data/chinacity copy.json").then((response)=>{
this.options=response.data;

 this.options=JSON.parse(JSON.stringify(this.options)); 
 request.post('tableStoreDates/page/list', null, {
        params:
        { 
          pagetype: 'datafeatures',
        },
      }).then(({ data: response }) => {
        console.log(response.data.data)
        this.month=[response.data.data.update_time,response.data.data.update_time]
      }).catch((err) => {
      });

//console.log(this.options);
}).catch((response)=>{
//console.log(response);
})

    this.changetheme("0")


  },
  methods:{
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
      if(column=='water_valid_time'||column=='average_time'||column=='maximum_time'){
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
     search(){
 this.tableData=[];
 this.tablefilter1=[]
 //  console.log(this.tableData);
      request.post('tableStoreDates/page/list', null, {
        params:
        { 
          pagetype:'indexmodeltype',
          category: this.value2[0],
          timeLow : this.month[0],    //时间范围
          timeHigh : this.month[1],
          city:this.value[1],
          dev_id:this.value[0],
          flag:this.searchmark,
        },
      }).then(({ data: response }) => {
      console.log(response.data.time)
      console.log(response.data.filter)
      console.log(response.data.dev_type)
        console.log(response.data)
                  if (response.data.data==""){
                  this.$message.error('很抱歉，该设备在筛选条件查询结果为空');
           }

      if(this.searchmark=="2"){
         cityname=response.data.province;
     }else{
       cityname=response.data.dev_type;
     }
   for(var i=0;i<response.data.filter.length;i++){
     console.log(response.data.zhengshu[response.data.filter[i]])
     this.tableData[i]={dev_id:response.data.filter[i],dev_type:cityname[i],water_valid_time:this.sec2time(parseInt(response.data.time[response.data.filter[i]][0])),
     average_time:this.sec2time(parseInt(response.data.time[response.data.filter[i]][1])),maximum_time:this.sec2time(parseInt(response.data.time[response.data.filter[i]][2])),
     water_score:response.data.zhengshu[response.data.filter[i]][0],water_num:response.data.zhengshu[response.data.filter[i]][1],
     un_stable_proportion:Number(parseFloat(response.data.xiaoshu[response.data.filter[i]][0]).toFixed(2)),time_date:this.month[0]+"~"+this.month[1]}
     
     this.tablefilter1[i]={
    text:response.data.filter[i],
    value:response.data.filter[i]

     }
   }
   console.log(this.tableData)
   this.tableData=JSON.parse(JSON.stringify(this.tableData)); 
     
      }).catch((err) => {
        // this.$message.error(err);
        // console.log(err);
      });


    },
    //页面跳转
     jumppage(row) {
     //  console.log(row)
 //  var mon= this.Month2Time(this.timeframe)
  //  console.log(mon)
  var city=''
  var type=""
  if(this.searchmark=="1"){
    city=this.value[1]
    type=row.dev_type
  }else{

    city=row.city_code
     type=this.value[0]

  }
      let routeData = this.$router.resolve({
     path:'indexdregion',
    
  //  name:'flow',
 query: {
   city:city,
   id: row.dev_id,
   month:this.month[0],
   month1:this.month[1],
   type:type
 }
});
 window.open(routeData.href);
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

        if(response.data.devtype==null){
          this.$message.error('该地区暂无设备数据');
          this.tableData=[]
        
        }

        var j=0
        for(var i=0; i<response.data.devtype.length;i++){
            this.options1[i]={label:response.data.devtype[i],
                              value:response.data.devtype[i],
                             
                              
            }
        }
            
       this.options1=JSON.parse(JSON.stringify(this.options1)); 
       this.value2=[this.options1[0].value]
       this.search()
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
