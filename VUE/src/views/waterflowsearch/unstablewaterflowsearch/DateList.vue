<template>

  <div class="overflow-auto">
    <div class="search" align="center">
<!-- <div>
   <el-backtop :bottom="60">
    <i class="el-icon-top"
     style="{
        height: 100%;
        width: 100%;
        background-color: #f2f5f6;
        box-shadow: 0 0 6px rgba(0,0,0, .12);
        text-align: center;
        line-height: 40px;    
        color: #1989fa;
      }"></i>
  </el-backtop>

</div> -->
     <span>地区：</span>
   <el-cascader style="width:200px;margin-left:0 ;"
    v-model="value1"
    :options="options1"
    @change="handleChange"
    placeholder="请选择地区">
    </el-cascader>
  <span style="margin-left:30px">型号/设备：</span>
   <el-cascader
     v-model="value2"
     ref="cascaderAddr1"
    :options="options2"
     placeholder="请选择型号/设备"
     style="width:250px;margin-left:0"
    clearable></el-cascader>
     <span style="margin-left:30px">日期：</span>
    <el-date-picker
      id="ti"
      v-model="datatime"
      style="width:200px;margin-left:0"
      type="date"
      align="right"
      placeholder="选择日期"
      format="yyyy-MM-dd"
      value-format="yyyy-MM-dd">
    </el-date-picker>

    <el-button type="primary" @click="search">查询</el-button>
    
    <!-- <el-select v-model="value"  @change="flowProcess1" style="width:150px;" placeholder="请选择" >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
       >
      </el-option>
    </el-select> -->
  
    
    </div>
  <div  align="right">
  
    <el-tag type="success"  style="margin-right:50px;">稳定模式</el-tag>
     <el-tag style="margin-right:50px;">阶跃模式</el-tag>
     <el-tag  type="danger" style="margin-right:150px;">震荡模式</el-tag>
   
    <span>选择显示模式：</span>
      <el-cascader
      v-model="value"
      ref="cascaderAddr"
      @change="flowProcess1"
       :props="{ checkStrictly: true }"
      :options="options"
      :show-all-levels="false"
      placeholder="请选择"
      style="width:100px; margin-right:260px;"
      clearable>
    </el-cascader>
  </div>
      <el-popover
       v-model='flag1'
      @hide="hide1"
      ref="popover"
      popper-class="popoverClass"
      placement="right"
      width="600"
      height="500"
      trigger="manual">
  
      <h4>单段通用指标</h4>
       <el-table :data="tableData2" border height="100" style="width: 100%" align="center">
      <el-table-column width="80" prop="dataTime" align="center" label="时长"></el-table-column>
      <el-table-column width="80" prop="maxVaule" align="center" label="最大值"></el-table-column>
      <el-table-column width="80" prop="minVaule" align="center" label="最小值"></el-table-column>
      <el-table-column width="80" prop="average"  align="center" label="平均值"></el-table-column>
      <el-table-column width="80" prop="standard_dev" align="center" label="极差"></el-table-column>
       <el-table-column width="80" prop="standard_dev1" align="center" label="标准差"></el-table-column>
       <el-table-column width="90" prop="standard_dev2" align="center" label="变异系数"></el-table-column>
      </el-table>
    <h4 v-if="flag"  style="margin-top:20px;">不稳定段特征指标</h4>
       <el-table v-if="flag" :data="tableData3" border height="120" style="width: 100%" align="center">
      <el-table-column  prop="model" align="center" label="模式"></el-table-column>
      <el-table-column  prop="up" align="center" label="向上突变次数"></el-table-column>
      <el-table-column  prop="down" align="center" label="向下突变次数"></el-table-column>
      <el-table-column  prop="maxChange"  align="center" label="最大差值"></el-table-column>
      
      </el-table>
      <div id='myChart3' slot="reference"  style="margin-top:0px;"> </div>
     
    </el-popover>
      <el-form ref="form" class="ItemInfo" :model="equipment_info" label-width="80px" :inline="true">
<h4 style="margin-top:30px;"><strong>单日数据指标</strong></h4>
<el-form-item class="ItemInfoTime" style="margin-left:10px;">
<download-excel
      :fields = "json_fields1"
      :data="tableData1"
      :before-generate = "startDownload1"
      :before-finish = "finishDownload1"
      
      name="listdata.xls"
      type="xls">
      <el-button  >导出Excel</el-button>
    </download-excel>
    </el-form-item>
</el-form>
       <el-table
      :data="tableData1"
      border
      style="width: 100%">
      <el-table-column  prop="water_score" align="center" label="水流量评分"></el-table-column>
       <el-table-column  prop="water_valid_time" align="center" label="总时长"></el-table-column>
      <el-table-column prop="water_num" align="center" label="用水总次数"></el-table-column>
      <el-table-column prop="average_time" align="center" label="平均用水时长"></el-table-column>
      <el-table-column prop="un_stable_behavior"  align="center" label="不稳定用水次数"></el-table-column>
       <el-table-column  prop="un_stable_proportion" align="center" label="不稳定时间占比%"></el-table-column>
    </el-table>
    <!-- element ui表格 -->
      <el-form ref="form" class="ItemInfo" :model="equipment_info" label-width="80px" :inline="true">
    <h4 style="margin-top:20px;"><strong>详细数据</strong></h4>
    <el-form-item class="ItemInfoTime" style="margin-left:10px;">
<download-excel
      :fields = "json_fields"
      :data="tableData"
      :before-generate = "startDownload"
      :before-finish = "finishDownload"
      
      name="listdata.xls"
      type="xls">
      <el-button  >导出Excel</el-button>
    </download-excel>
       </el-form-item>
</el-form>
        <el-table
      :data="tableData.slice((currentPage-1)*perPage,currentPage*perPage)"  
      id="my-table" 
      stripe="true"
      style="width: 100%"
      align="center"
      :row-style="{width:0}"
       :cell-style="{padding:'2px'}">
      <el-table-column
        type="index"
        label="序号"
        :index="indexMethod"
        width="180">
      </el-table-column>
      <el-table-column
        prop="datatime"
        label="时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="flame"
        label="火焰反馈"
        width="180">
      </el-table-column>
      <el-table-column
        prop="out_temp"
        label="出水温度"
        width="180">
      </el-table-column>
      <el-table-column
        prop="set_temp"
        label="设置温度"
        width="180">
      </el-table-column>
      <el-table-column
        prop="flow"
        label="水流量"
        width="180">
      </el-table-column>
      </el-table>


    <el-pagination align="center" style="margin:20px 150px"
  
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      background="true"
      prev-text="上一页"
      next-text="下一页"
      :current-page="currentPage"
      :page-sizes="[20,100,200, 500, 1000, 2000]"
      :page-size="perPage"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.length">
     
    </el-pagination>

  </div>
  
</template>
<script>
import JsonExcel from 'vue-json-excel';
import request from '@/utils/request';
import Manager from "@/assets/js/test.js";
 var time1=[];
 var flame=[];
 var  setTemp=[];
 var outTemp=[];
 var   flow=[];
 var zone_id=[];
 var model1=[];
 var color=[];
 var stableFirstlast=[];
 var stepFirstlast=[];
 var oscillateFirstlast=[];
export default {
     components: {
      'download-excel': JsonExcel
    }, 
  data() {
    return {
 json_fields: {

           '时间':'datatime',
           '火焰反馈':'flame',
           '出水温度':'out_temp',
           '设置温度':'set_temp',
           '水流量':'flow',

           },
            json_fields1: {

           '总时长':'water_valid_time',
           '用水总次数':'water_num',
           '平均用水时长':'average_time',
           '不稳定用水次数':'un_stable_behavior',
           '不稳定时间占比%':'un_stable_proportion',

           },
      total: 0, // 默认总条数
      datalist: [],
      // pagesize:20,
      activeBtn:true,
      perPage: 20, // 每页显示条数
      currentPage: 1, // 当前页
      total: 100, // 默认总条数
        options: [{
          value: '1',
          label: '全部'
          
        }, {
          value: '6',
          label: '稳定'
        }, {
          value: '0',
          label: '不稳定',
          children:[
            {
               value: '7',
               label: '阶跃',
          },
           {
               value: '8',
               label: '震荡',
          }
          ]
        }],
        
      value:'0',
       options1: [],
       options2:[{
          label:this.$route.query.name1,
          value:this.$route.query.name1,
          children:[{
             label:this.$route.query.id,
          value:this.$route.query.id
          }]
        }],
        value2:[this.$route.query.name1,this.$route.query.id],
       value1:[],
       // value:["shanghai","51100HT5","144036023814135"],
        datatime: "",    //时间范围
        tableData: [],
        tableData2:[],
        tableData1:[],
        tableData3:[],
        time1:[],
        flow:[],
        flag1: false,
        outTemp:[],
        setTemp:[],
        flame:[],
        flag:false

    };
  },


  created() {
    this.axios.get( "data/chinacity copy.json").then((response)=>{
      this.options1=response.data;
      this.options1=JSON.parse(JSON.stringify(this.options1)); 
      var provincenum=this.$route.query.city;
      if(provincenum===undefined){
        this.value1=[this.options1[0].value,this.options1[0].children[0].value]
        this.handleChange(this.value1)
        setTimeout(() => {
          this.value2=[this.options2[0].value,this.options2[0].children[0].value]
          request.post('tableStoreDates/page/list', null, {
        params:
        { 
          pagetype: 'datafeatures',
        },
      }).then(({ data: response }) => {
        console.log(response.data.data)
        this.datatime=response.data.data.update_time
       this.search()
      }).catch((err) => {
      });
          // this.datatime="2021-01-01"
           console.log(this.datatime)
          
        }, 200);
      }else{
        provincenum=provincenum.slice(0,2)
        this.value1[0]=provincenum+'0000'
        this.value1[1]=this.$route.query.city
        this.handleChange(this.value1)
        this.value2[0]=this.$route.query.name1
        this.value2[1]=this.$route.query.id
        this.datatime=this.$route.query.month ||this.getNowTime()
        this.search()
      }
    }).catch((response)=>{
    })
      
      
    //   request.post('tableStoreDates/page/list', null, {
    //     params:
    //     { 
    //       pagetype:'localized_vue',
    //       category: "day",
    //       timeLow : mon[0],    //时间范围
    //       timeHigh : mon[1],
    //       city:this.$route.query.city,
    //       dev_id:this.$route.query.id,
    //       month2: this.$route.query.month
    //     },
    //   }).then(({ data: response }) => {
    //        this.tableData = response.data.data;
    //        time1 = response.data.data_time;
    //     // console.log(this.datatime);
    //     flame = response.data.flame;
    //     // console.log(this.flame);
    //     this.tableData1=response.data.data1;
    //     model1=response.data.model;
    //      zone_id=response.data.zone_id;
    //     setTemp = response.data.set_temp;
    //     outTemp = response.data.out_temp;
    //     flow = response.data.flow;
    //   //  console.log(zone_id)
    //  this.flowProcess();
    //    this.flowProcess1();
     
      
    //   }).catch((err) => {
    //     this.$message.error(err);
    //     // console.log(err);
    //   });

    

  },
  methods: {
    getNowTime() {
       var now = new Date();
       var year = now.getFullYear(); //得到年份
       var month = now.getMonth(); //得到月份
       var date = now.getDate(); //得到日期
       month = month + 1;
       month = month.toString().padStart(2, "0");
       date = date.toString().padStart(2, "0");
       var defaultDate = `${year}-${month}-${date}`;
       return defaultDate
   },
      hide1(){
       this.flag1=false;
        this.flag=false
      },
       show1(){
      
       this.flag1=true;
       //   console.log(this.flag1)
      //  setTimeout(() => {
      //    this.flag1=false
      //  }, 1000);

      },
      show2(){
         this.flag=true
      },
      show3(){
         this.flag=false
      },
      model_choose_table(){
      this.options2.splice(0,this.options2.length);
      // for(var i=0;i<table_label[this.model].length;i++){
      //   this.options2[i]={prop:"col"+i,label:table_label[this.model][i]}
      // };
      // const dt = new Date(indexes[0].total_time);
      // console.log(indexes);
     // this.tableData[0]={col0:'',col1:'',col2:'',col3:'',col4:''};
      if(indexes.length!=0)
      {
      this.tableData[0].col0=this.timeEvent(indexes[0].total_time);
      this.tableData[0].col1=indexes[0].mode_proportion;
      this.tableData[0].col2=this.timeEvent(indexes[0].min_time);
      this.tableData[0].col3=this.timeEvent(indexes[0].max_time);
      this.tableData[0].col4=indexes[0].total_num;
      }
  
    },
    colorDifferenciate(){
      var j=0;
      var k=0;
      var m=0;
      color=[];
      stableFirstlast=[];
      stepFirstlast=[];
      oscillateFirstlast=[];
      for(var i=0;i<time1.length;i++){
        if(model1[i]=='6'&&flow[i]=='0'){
          if(j%2==1){
            if(i==(time1.length-1)){
              stableFirstlast.splice(j++,0,i)
            }else{
              stableFirstlast.splice(j++,0,i+1)
            }
          }else{
            stableFirstlast.splice(j++,0,i)
          }
        }else if(model1[i]=='7'&&flow[i]=='0'){
          if(k%2==1){
            if(i==(time1.length-1)){
              stepFirstlast.splice(k++,0,i)
            }else{
              stepFirstlast.splice(k++,0,i+1)
            }
          }else{
            stepFirstlast.splice(k++,0,i)
          }
        }else if(model1[i]=='8'&&flow[i]=='0'){
          if(m%2==1){
            if(i==(time1.length-1)){
              oscillateFirstlast.splice(m++,0,i)
            }else{
              oscillateFirstlast.splice(m++,0,i+1)
            }
          }else{
            oscillateFirstlast.splice(m++,0,i)
          }
        }
      }
      for(var i=0;i<stableFirstlast.length;i=i+2){
        color.push({gt: stableFirstlast[i],lte: stableFirstlast[i+1],label: '稳定',color: 'green'})
      }
      for(var i=0;i<stepFirstlast.length;i=i+2){
        color.push({gt: stepFirstlast[i],lte: stepFirstlast[i+1],label: '阶跃',color: 'blue'})
      }
      for(var i=0;i<oscillateFirstlast.length;i=i+2){
        color.push({gt: oscillateFirstlast[i],lte: oscillateFirstlast[i+1],label: '震荡',color: 'red'})
      }
    //  console.log(color)
    },
      flowProcess(){
  
      for(var i=0;i<time1.length;i++){

            if(i<time1.length-2){

            

             if(zone_id[i+1]==='1'){
            var v;
            const dt2 = new Date(time1[i]);
            dt2.setTime(dt2.setSeconds(dt2.getSeconds()+1));
            v=this.dateFormat(dt2);
            time1.splice(i+1,0,v);
            flow.splice(i+1,0,",");
             model1.splice(i+1,0,',');
           //  var temp=Number(zone_id[i])
              zone_id.splice(i+1,1,zone_id[i]+1,'0');
           //console.log(zone_id[i+1])
            flame.splice(i+1,0,',');
            setTemp.splice(i+1,0,',');
            outTemp.splice(i+1,0,',');
          }

            }
        
        
      }
      this.colorDifferenciate();
 // console.log(zone_id.length)
  //console.log(time1.length)
      //return arr;
    },
       flowProcess1(){
              
         console.log(time1)
      var arr=[];
      for(var i=0;i<time1.length;i++){
        if(this.value.length==1)
        {

           if (this.value[0]=='1')
          {
           if(model1[i]=="9"){
          console.log("bushi",i)
             this.flow[i]=',';
          this.outTemp[i]=','
          this.setTemp[i]=",";
          this.flame[i]=','
           }else{console.log("youshuju",i)
          console.log(i)
             this.flow[i]=flow[i]
           this.flame[i]=Number(flame[i])*10
           this.outTemp[i]=outTemp[i]
           this.setTemp[i]=setTemp[i]
           console.log(this.flow[i])
           }
           
           }else if(this.value[0]==="6"){

              if(this.value!=model1[i])
        {
          this.flow[i]=',';
          this.outTemp[i]=','
          this.setTemp[i]=",";
          this.flame[i]=','
        }
        else{
           this.flow[i]=flow[i]
           this.outTemp[i]=outTemp[i]
           this.setTemp[i]=setTemp[i]
           this.flame[i]=Number(flame[i])*10
          if(zone_id[i+1]==1){
            var v;
            const dt = new Date(time1[i]);
            dt.setTime(dt.setSeconds(dt.getSeconds()+1));
            v=this.dateFormat(dt);
            time1.splice(i+1,0,v);
            flow.splice(i+1,0,",");
            model1.splice(i+1,0,',');
            zone_id.splice(i+1,1,zone_id[i]+1,'0');
            flame.splice(i+1,0,',');
            setTemp.splice(i+1,0,',');
            outTemp.splice(i+1,0,',');
           // this.flow[i]=flow[i]

          }
        }


           }else if (this.value[0]==="0"){
            // console.log("000")
         if(model1[i]=="6"||model1[i]=="9")
        {
          this.flow[i]=',';
          this.outTemp[i]=','
          this.setTemp[i]=",";
          this.flame[i]=','
        }
        else{
           this.flow[i]=flow[i]
           this.outTemp[i]=outTemp[i]
           this.setTemp[i]=setTemp[i]
           this.flame[i]=Number(flame[i])*10
          if(zone_id[i+1]==1){
            var v;
            const dt = new Date(time1[i]);
            dt.setTime(dt.setSeconds(dt.getSeconds()+1));
            v=this.dateFormat(dt);
            time1.splice(i+1,0,v);
            flow.splice(i+1,0,",");
            model1.splice(i+1,0,',');
            zone_id.splice(i+1,1,zone_id[i]+1,'0');
            flame.splice(i+1,0,',');
            setTemp.splice(i+1,0,',');
            outTemp.splice(i+1,0,',');
           // this.flow[i]=flow[i]

          }
        }

           }


        }else {
           if(this.value[1]==="7"){
              if(model1[i]!='7')
        {
          this.flow[i]=',';
          this.outTemp[i]=','
          this.setTemp[i]=",";
          this.flame[i]=','
        }
        else{
           this.flow[i]=flow[i]
           this.outTemp[i]=outTemp[i]
           this.setTemp[i]=setTemp[i]
           this.flame[i]=Number(flame[i])*10
          if(zone_id[i+1]==1){
            var v;
            const dt = new Date(time1[i]);
            dt.setTime(dt.setSeconds(dt.getSeconds()+1));
            v=this.dateFormat(dt);
            time1.splice(i+1,0,v);
            flow.splice(i+1,0,",");
            model1.splice(i+1,0,',');
            zone_id.splice(i+1,1,zone_id[i]+1,'0');
            flame.splice(i+1,0,',');
            setTemp.splice(i+1,0,',');
            outTemp.splice(i+1,0,',');
           // this.flow[i]=flow[i]

          }
        }

      

           }else{

 
              if(model1[i]!='8')
        {
          this.flow[i]=',';
          this.outTemp[i]=','
          this.setTemp[i]=",";
          this.flame[i]=','
        }
        else{
           this.flow[i]=flow[i]
           this.outTemp[i]=outTemp[i]
           this.setTemp[i]=setTemp[i]
           this.flame[i]=Number(flame[i])*10
          if(zone_id[i+1]==1){
            var v;
            const dt = new Date(time1[i]);
            dt.setTime(dt.setSeconds(dt.getSeconds()+1));
            v=this.dateFormat(dt);
            time1.splice(i+1,0,v);
            flow.splice(i+1,0,",");
            model1.splice(i+1,0,',');
            zone_id.splice(i+1,1,zone_id[i]+1,'0');
            flame.splice(i+1,0,',');
            setTemp.splice(i+1,0,',');
            outTemp.splice(i+1,0,',');
           // this.flow[i]=flow[i]

          }
        }


           }


        }
        console.log(this.flow[i])
      }
      //  setTimeout(() => {
          this.drawTable();
     //  }, 10);
     //console.log(this.flow)
    },
       handleChange(value){
   this.options2=[]
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

        
        }else{
        var j=0
        for(var i=0; i<response.data.devtype.length;i++){
            this.options2[i]={label:response.data.devtype[i],
                              value:response.data.devtype[i],
                              children:[]
                              
            }
        }
            for(var i=0;i<response.data.devid.length;i++){
                
                j=response.data.devtype.indexOf(response.data.total[i])
               this.options2[j].children[ this.options2[j].children.length]={
                                                                label:response.data.devid[i],
                              value:response.data.devid[i]

               }
                           
            }
       // console.log(this.options5)
       this.options2=JSON.parse(JSON.stringify(this.options2)); }
      //console.log(response.data.total)
      }).catch((err) => {
        this.$message.error(err);
        // console.log(err);
      });


    },
    startDownload1(){
        let self = this
        if(self.tableData1.length==0) {
          self.$message({
            message: '警告，请勾选数据',
            type: 'warning'
          })
        }
      },
      finishDownload1(){
        let self = this
        self.$message({
          message: '恭喜，数据导出成功',
          type: 'success'
        })
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
     dateFormat:function(time) {
    var date=new Date(time);
    var year=date.getFullYear();
    var month= date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
    var day=date.getDate()<10 ? "0"+date.getDate() : date.getDate();
    var hours=date.getHours()<10 ? "0"+date.getHours() : date.getHours();
    var minutes=date.getMinutes()<10 ? "0"+date.getMinutes() : date.getMinutes();
    var seconds=date.getSeconds()<10 ? "0"+date.getSeconds() : date.getSeconds();
    // 拼接 可改成自己所要的时间格式
    return year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;
    },
    Day2Time(month){
     var dt=new Date(month)
        dt.setHours(0);
       var timelow=this.dateFormat(dt)
       dt.setTime(dt.setDate(dt.getDate()+1));
       var timehigh=this.dateFormat(dt)
      var mon=new Array();
       mon[0]=timelow
       mon[1]=timehigh
      return mon;

    },
    // 按时间段查询
    search() {
      
      time1=[]
      flow=[]
      this.flow=[];
      
     var mon=this.Day2Time(this.datatime)
     console.log(this.datatime)
      request.post('tableStoreDates/page/list', null, {
        params:
        { 
          pagetype:'localized_vue',
          category: "day",
          timeLow : mon[0],    //时间范围
          timeHigh : mon[1],
          city:this.value1[1],
          dev_id:this.value2[1],
          month2: this.datatime
        },
      }).then(({ data: response }) => {
     console.log(response.data.data);
     if(response.data.data==""){
       this.$message.error('很抱歉，该设备在筛选条件查询结果为空');
       this.tableData=[]
        this.tableData1=[];
   
         zone_id=[]
        setTemp = [];
        outTemp = [];
        flow = [];
        this.drawTable()
     }else{
       
   
           this.tableData = response.data.data;
           
           time1 = response.data.data_time;
        // console.log(this.datatime);
        flame = response.data.flame;
        // console.log(this.flame);
        this.tableData1=response.data.data1;
        model1=response.data.model;
         zone_id=response.data.zone_id;
        setTemp = response.data.set_temp;
        outTemp = response.data.out_temp;
        flow = response.data.flow;
      //  console.log(zone_id)
       this.flowProcess();
       this.flowProcess1();
       }
      
      }).catch((err) => {
        this.$message.error(err);
        console.log(err);
      });
    },
     sampleVariance(data,meanValue) {
           
   
        var len = data.length;
        if (!len || len < 2) {
            return 0;
        }
        if (data.length >= 2) {

           // var meanValue = mean(data);
            var sum = 0;
            var temple;

            for (var i = 0; i < data.length; i++) {
                // if (isNumber(data[i])) {
                    temple = data[i] - meanValue;
                    sum += temple * temple;
                // }
            }
            return  Math.sqrt(sum / (data.length - 1))
        }
    },
    drawTable(){

      console.log("666")
      //   console.log(time1);
      console.log(this.flow)
        const myChart = this.$echarts.init(document.getElementById('myChart3'));
        const option = {
        // backgroundColor: '#12cf96',//背景色
          title: {
            text: '燃气热水器运行状态',
          },
          // tooltip: {
          //     trigger: 'axis'
          // },

          // 鼠标位置提示
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
          // 图例
          legend: [{
            data: ['水流量','出水温度','设置温度',"火焰反馈"],
             selected:{'水流量':true,'出水温度':false,'设置温度':false,'火焰反馈':false}

          },
          ],
          dataZoom: {   
              start:0,
              end: 100,
              type:'inside'
            },

       grid: {
            left: '10%',
            right: '15%',
            bottom: '10%'
        },
          // 缩放操作
          toolbox: {
            show: true,
            feature: {
              dataZoom: {
                yAxisIndex: 'none',
              },
              dataView: { readOnly: false },
              magicType: { type: ['line', 'bar'] },
              restore: {},
              saveAsImage: {},
            },
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            name: '时间',
            data: time1,

          },
          yAxis: [{
            name: '温度',
            type: 'value',
            max:100,
            axisLabel: {
              formatter: '{value} °C',
            },
          },
          {
            name: '水流量',
            type: 'value',
            //data:[0-200],
            max:160,
            axisLabel: {
              formatter: '{value} ',
            },
            inverse: false,
          }],
          visualMap: {
    show: false,
    dimension: 0,
    pieces: color,  //pieces的值由动态数据决定
    textStyle: { //图例文字的样式

             color: 'black',
                fontSize: 16
},
    // outOfRange: {
    //     color: 'green'
    // }
},
         

          // 数据信息
          series: [
            {
              name: '水流量',
              yAxisIndex: 1,
              type: 'line',
              data: this.flow,

              markPoint: {
                data: [
                  { type: 'max', name: '最大值' },
                ],
              },
              markLine: {
                data: [
                  { type: 'average', name: '平均值' },
                ],
              },

            },
             {
              name: '出水温度',
              yAxisIndex: 0,
              type: 'line',
              data: this.outTemp,
              itemStyle: {      
                            normal: {
                                lineStyle: {
                                    width: 2,
                                    type: 'dashed' ,//'dotted'虚线 'solid'实线
                                     color:"black",
                                }
                            }
                        },
                       
              markPoint: {
                data: [
                  { type: 'max', name: '最大值' },
                ],
              },
              markLine: {
                data: [
                  { type: 'average', name: '平均值' },
                ],
              },

            },
            {
              name: '设置温度',
              yAxisIndex: 0,
              type: 'line',
              data: this.setTemp,
              itemStyle: {      
                            normal: {
                                lineStyle: {
                                    width: 2,
                                    type: 'dashed' ,//'dotted'虚线 'solid'实线
                                     color:"black",
                                }
                            }
                        },

            },  {
              name: '火焰反馈',
              yAxisIndex: 0,
              type: 'line',
              data: this.flame,
              itemStyle: {      
                            normal: {
                                lineStyle: {
                                    width: 2,
                                    type: 'solid' ,//'dotted'虚线 'solid'实线
                                     color:"black",
                                }
                            }
                        },

            },
            

          ],
        };
       
        

     

//console.log(n)
        myChart.setOption(option,true);
           const _this = this;
    myChart.getZr().off("click");      
    myChart.getZr().on('click',function (params) {
	    var pointInPixel= [params.offsetX, params.offsetY];
      console.log(params)
	    if (myChart.containPixel('grid',pointInPixel)) {
	        /*此处添加具体执行代码*/
         
          var pointInGrid=myChart.convertFromPixel({seriesIndex:0},pointInPixel);
	        //X轴序号
	        var xIndex=pointInGrid[0];
 
            //获取当前图表的option
	        var op=myChart.getOption();
 
            //获得图表中我们想要的数据
          if(op.series[0].data[xIndex]==','){
              _this.hide1()
             _this.tableData2[0]={
          dataTime:  '',
          maxVaule:'',
          minVaule:'',
          average: '',
          standard_dev: '',
          standard_dev1: '',
          standard_dev2:'',
             }
              _this.tableData2=JSON.parse(JSON.stringify(_this.tableData2)); 
          }
          else{
            _this.show1();
            for(var i=xIndex;(op.series[0].data[i]!='0');i--){

              if(i==0)
              break;
            }
            
           // console.log(i)
            for(var j=xIndex;op.series[0].data[j]!='0';j++)
            {
                    if(j==op.series[0].data.length)
                    break;

            }

            var firstpoint=i+1;
            var lastpoint=j-1;
            var v=0;
            var num=0;
            var diff;
            var time_begin = new Date(time1[firstpoint]);
            var time_end = new Date(time1[lastpoint]);
            var c=(time_end-time_begin)/1000;
            var max=_this.flow[firstpoint];
            var min=_this.flow[firstpoint];
            var data1=[];
            c=String(c);
            var ConfirmList=[]
            // dt = dt.valueOf()
            //  console.log(firstpoint)
            //  console.log(lastpoint)
            for(var t=firstpoint;t<=lastpoint;t++){
         
              ConfirmList[v]=_this.flow[t]
              if(max<_this.flow[t])
              {
                max=_this.flow[t];
              }
              if(min>_this.flow[t]&&_this.flow[t]!=0)
              {
                min=_this.flow[t];
              }
              data1[v]=Number(_this.flow[t]);
              num=num+Number(_this.flow[t]);
              v++;
            }; 
            console.log(ConfirmList)
            if(model1[firstpoint]=="8")
            {
                 _this.tableData3[0]={
                   model:"震荡模式",
                   up: Manager.Confirm(ConfirmList).up,
                   down:Manager.Confirm(ConfirmList).down,
                   maxChange:Manager.Confirm(ConfirmList).maxChange
                 }
                 _this.show2();


            }else if(model1[firstpoint]=="7"){

               _this.tableData3[0]={
                   model:"阶跃模式",
                   up: Manager.Confirm(ConfirmList).up,
                   down:Manager.Confirm(ConfirmList).down,
                   maxChange:Manager.Confirm(ConfirmList).maxChange
                 }
                 _this.show2();
            }else{
              _this.show3()
            }
               _this.tableData3=JSON.parse(JSON.stringify(_this.tableData3)); 
         //   console.log(Manager.Confirm(ConfirmList))
          
            diff= String(Number(max)-Number(min)) ;
            num=parseFloat(num/(v)).toFixed(2);
         
            _this.tableData2[0]={
          dataTime:  c,
          maxVaule:max,
          minVaule:min,
          average: String(num),
          standard_dev: diff,
          standard_dev1: String(parseFloat(_this.sampleVariance(data1,num)).toFixed(2)),
         standard_dev2:String(parseFloat(parseFloat(_this.sampleVariance(data1,num)).toFixed(2)/num).toFixed(4)),
          }
        
           _this.tableData2=JSON.parse(JSON.stringify(_this.tableData2)); 
          }
	        
       
	    }else(
        _this.hide1()
      )
	});
        // 建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
        // window.addEventListener('resize', () => { myChart.resize(); });
      
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
      }


  
  }

};
</script>

 <style  lang="scss"  scoped>
.search{
  margin-left: 0px;
  margin-bottom: 20px;
  margin-top: 20px;
}

.search button{
  margin-left: 50px;
}

#myChart3 {
  top: 30px;
  width: 800px;
  height: 500px;
  //margin-bottom: 30px;
  margin: auto;
  grid: {
    x: 0;
    y: 0;
    x2: 0;
    y2: 0;
  }
}

</style>