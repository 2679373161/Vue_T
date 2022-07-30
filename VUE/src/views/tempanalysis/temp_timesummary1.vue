<template>

  <div>
    <div class="category" align="right">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
        <el-menu-item index="1" @click="switchLocation">地区</el-menu-item>
        <el-menu-item index="2" @click="switchType">型号</el-menu-item>
        <el-menu-item index="3" @click="switchAppliance">设备</el-menu-item>
      </el-menu>

    </div>

    <div class="content1"  align="center" style="margin-top:20px;">     <!--菜单下所有搜索部分-->
    <div class="search1" align="center" v-if="flag==true">              <!--//地区.搜索部分-->
    <el-select v-model="value9" placeholder="省份/城市范围" style="width:120px;margin-left:30px;">
      <el-option
        v-for="item in options5"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-cascader
     v-model="value10"
     ref="cascaderAddr"
    :options="options6"
      placeholder="请选择省份"
     style="width:250px; margin-left:0px;"
    clearable
    v-if="value9=='1'"></el-cascader>  
    <el-cascader
     v-model="value"
     ref="cascaderAddr"
    :options="options"
      placeholder="请选择城市"
     style="width:250px; margin-left:0px;"
    clearable
    v-if="value9=='2'"></el-cascader>
    
    <el-select v-model="value11" placeholder="月份/日期范围" style="width:120px;margin-left:30px;" @change="switchTimeselection">
      <el-option
        v-for="item in options4"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select> 
     <el-date-picker
      v-model="value1"
      type="monthrange"
      start-placeholder="开始月份"
      end-placeholder="结束月份"
       format="yyyy-MM"
     style="margin-left:0px;"
      value-format="yyyy-MM"
      v-if="value11=='1'">
    </el-date-picker>
    <el-date-picker
      v-model="value1"
      type="daterange"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      format="yyyy-MM-dd"
     style="margin-left:0px;"
      value-format="yyyy-MM-dd"
      v-if="value11=='2'">
    </el-date-picker>
    <el-button type="primary" @click="search" style="margin-left:30px;">查询</el-button>
    </div>
    
    <div class="search2" align="center" v-if="flag1==true">             <!--型号.搜索部分-->
    <span>型号选取：</span> 
    <el-cascader
     v-model="value2"
     ref="cascaderAddr"
    :options="options1"
      placeholder="请选择型号"
     style="width:250px; margin-left:0px;"
    clearable></el-cascader>
    
    <el-select v-model="value7" placeholder="月份/日期范围" style="width:120px;margin-left:30px;" @change="switchTimeselection">
      <el-option
        v-for="item in options4"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select> 
     <el-date-picker
      v-model="value3"
      type="monthrange"
      start-placeholder="开始月份"
      end-placeholder="结束月份"
       format="yyyy-MM"
     style="margin-left:0px;"
      value-format="yyyy-MM"
      v-if="value7=='1'">
    </el-date-picker>
    <el-date-picker
      v-model="value3"
      type="daterange"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      format="yyyy-MM-dd"
     style="margin-left:0px;"
      value-format="yyyy-MM-dd"
      v-if="value7=='2'">
    </el-date-picker>
    <el-button type="primary" @click="search1" style="margin-left:30px;">查询</el-button>
    </div>

    <div class="search3" align="center" v-if="flag2==true">        <!--设备.搜索部分-->
    <span>地区选取：</span> 
    <el-cascader
     v-model="value4"
     ref="cascaderAddr"
    :options="options2"
    @change="handleChange"
      placeholder="请选择城市"
     style="width:250px; margin-left:0px;"
    clearable></el-cascader>
    
    <span style="margin-left:30px;">设备选取：</span>
    <el-cascader
     v-model="value5"
     ref="cascaderAddr"
    :options="options3"
      placeholder="请选择型号"
     style="width:250px; margin-left:0px;"
    clearable></el-cascader>

    <el-select v-model="value8" placeholder="月份/日期范围" style="width:120px;margin-left:30px;" @change="switchTimeselection">
      <el-option
        v-for="item in options4"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select> 
    <el-date-picker
      v-model="value6"
      type="monthrange"
      start-placeholder="开始月份"
      end-placeholder="结束月份"
       format="yyyy-MM"
     style="margin-left:0px;"
      value-format="yyyy-MM"
      v-if="value8=='1'">
    </el-date-picker>
    <el-date-picker
      v-model="value6"
      type="daterange"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      format="yyyy-MM-dd"
     style="margin-left:0px;"
      value-format="yyyy-MM-dd"
      v-if="value8=='2'">
    </el-date-picker>
    <el-button type="primary" @click="search2" style="margin-left:30px;">查询</el-button>
    </div>

    <div class="content2" style="margin-top:20px">                       <!--菜单下所有标签、图表部分-->
      <h4 align="left" v-if="flag==true&&value9=='2'"><strong>{{tableData[0].data1}}-{{tableData[0].data}}{{tableData[0].time_date}}至{{tableData[tableData.length-1].time_date}}信息汇总</strong></h4>
      <h4 align="left" v-if="flag==true&&value9=='1'"><strong>{{tableData[0].data}}{{tableData[0].time_date}}至{{tableData[tableData.length-1].time_date}}信息汇总</strong></h4>
      <h4 align="left" v-if="flag1==true"><strong>{{tableData1[0].dev_type}}型号{{tableData1[0].time_date}}至{{tableData1[tableData1.length-1].time_date}}信息汇总</strong></h4>
      <h4 align="left" v-if="flag2==true"><strong>{{tableData2[0].data1}}-{{tableData2[0].data}}{{tableData2[0].dev_type}}型号{{tableData2[0].dev_id}}设备{{tableData2[0].time_date}}至{{tableData2[tableData2.length-1].time_date}}信息汇总</strong></h4>
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="表格" name="first"><!--表格切换防止出现渲染问题（二选一）：1.给不同表格添加各自的key；2.直接使用v-show，不用v-if-->
          <el-table :data="tableData" v-if="flag==true" key="one" border style="width: 100%;margin-top:10px" align="center" :cell-style="cellStyle" :default-sort = "{prop: 'water_score', order: 'ascending'}">
            <el-table-column key='1' prop="data" align="center"  label="地区"></el-table-column>
            <el-table-column key='100' prop="equipment_num" align="center" sortable label="设备数"></el-table-column>
            <el-table-column key='2' prop="time_date" align="center" sortable label="年-月" v-if="value11=='1'"></el-table-column>
            <el-table-column key='200' prop="time_date" align="center" sortable label="年-月-日" v-if="value11=='2'"></el-table-column>
            <el-table-column key='34' prop="water_score" align="center" sortable label="水流量评估分数(0~100)"></el-table-column>
            <el-table-column key='3' prop="un_stable_proportion" align="center"  sortable label="不稳定占比%"></el-table-column>
            <el-table-column key='4' prop="un_stable_time" align="center"  sortable :sort-method="(a,b) => sortBytime(a ,b , 'un_stable_time')" label="不稳定时长/s"></el-table-column>
            <el-table-column key='5' prop="water_valid_time" align="center" sortable :sort-method="(a,b) => sortBytime(a ,b , 'water_valid_time')" label="累计有效时长/s"></el-table-column>
            <el-table-column key='6' prop="un_stable_behavior" align="center"  sortable label="不稳定次数"></el-table-column>
            <el-table-column key='7' prop="water_num" align="center" sortable label="有效用水次数"></el-table-column>
            <el-table-column key='8' prop="average_time" align="center" sortable :sort-method="(a,b) => sortBytime(a ,b , 'average_time')" label="平均用水时长/s"></el-table-column>
            <el-table-column key='9' prop="maximum_time" align="center" sortable :sort-method="(a,b) => sortBytime(a ,b , 'maximum_time')" label="最长用水时长/s"></el-table-column>
          </el-table>
          <el-table :data="tableData1" v-if="flag1==true" key="two" border style="width: 100%;margin-top:10px" align="center" :cell-style="cellStyle" :default-sort = "{prop: 'water_score', order: 'ascending'}">
            <el-table-column key='11' prop="dev_type" align="center"  label="型号"></el-table-column>
            <el-table-column key='101' prop="equipment_num" align="center" sortable label="设备数"></el-table-column>
            <el-table-column key='12' prop="time_date" align="center" sortable label="年-月" v-if="value7=='1'"></el-table-column>
            <el-table-column key='201' prop="time_date" align="center" sortable label="年-月-日" v-if="value7=='2'"></el-table-column>
            <el-table-column key='35' prop="water_score" align="center" sortable label="水流量评估分数(0~100)"></el-table-column>
            <el-table-column key='13' prop="un_stable_proportion" align="center"  sortable label="不稳定占比%"></el-table-column>
            <el-table-column key='14' prop="un_stable_time" align="center" sortable :sort-method="(a,b) => sortBytime(a ,b , 'un_stable_time')" label="不稳定时长/s"></el-table-column>
            <el-table-column key='15' prop="water_valid_time" align="center" sortable :sort-method="(a,b) => sortBytime(a ,b , 'water_valid_time')" label="累计有效时长/s"></el-table-column>
            <el-table-column key='16' prop="un_stable_behavior" align="center"  sortable label="不稳定次数"></el-table-column>
            <el-table-column key='17' prop="water_num" align="center" sortable label="有效用水次数"></el-table-column>
            <el-table-column key='18' prop="average_time" align="center" sortable :sort-method="(a,b) => sortBytime(a ,b , 'average_time')" label="平均用水时长/s"></el-table-column>
            <el-table-column key='19' prop="maximum_time" align="center" sortable :sort-method="(a,b) => sortBytime(a ,b , 'maximum_time')" label="最长用水时长/s"></el-table-column>
          </el-table>
          <el-table :data="tableData2" v-if="flag2==true" key="three" border style="width: 100%;margin-top:10px" align="center" :cell-style="cellStyle" :default-sort = "{prop: 'water_score', order: 'ascending'}">
            <el-table-column key='21' prop="dev_id" align="center" label="设备"></el-table-column>
            <el-table-column key='22' prop="data1" align="center" label="省份"></el-table-column>
            <el-table-column key='23' prop="data" align="center" label="地区"></el-table-column>
            <el-table-column key='24' prop="dev_type" align="center" label="型号"></el-table-column>
            <el-table-column key='25' prop="time_date" align="center" sortable label="年-月" v-if="value8=='1'"></el-table-column>
            <el-table-column key='202' prop="time_date" align="center" sortable label="年-月-日" v-if="value8=='2'"></el-table-column>
            <el-table-column key='36' prop="water_score" align="center" sortable label="水流量评估分数(0~100)"></el-table-column>
            <el-table-column key='26' prop="un_stable_proportion" align="center" sortable label="不稳定占比%"></el-table-column>
            <el-table-column key='27' prop="un_stable_time" align="center" sortable :sort-method="(a,b) => sortBytime(a ,b , 'un_stable_time')" label="不稳定时长/s"></el-table-column>
            <el-table-column key='28' prop="water_valid_time" align="center" sortable :sort-method="(a,b) => sortBytime(a ,b , 'water_valid_time')" label="累计有效时长/s"></el-table-column>
            <el-table-column key='29' prop="un_stable_behavior" align="center"  sortable label="不稳定次数"></el-table-column>
            <el-table-column key='30' prop="water_num" align="center" sortable label="有效用水次数"></el-table-column>
            <el-table-column key='31' prop="average_time" align="center" sortable :sort-method="(a,b) => sortBytime(a ,b , 'average_time')" label="平均用水时长/s"></el-table-column>
            <el-table-column key='32' prop="maximum_time" align="center" sortable :sort-method="(a,b) => sortBytime(a ,b , 'maximum_time')" label="最长用水时长/s"></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="趋势图" name="second">
          <div id='myChart'></div>
        </el-tab-pane>
      </el-tabs>
    </div>
    </div>

  </div>
</template>
<script>

var datemonth=[];//接收月份范围
var un_stable_proportion=[];
var totalTime=[];
var average_time=[];
var un_stable_time=[];
var totalNum=[];
var un_stable_behavior=[];//接收原始统计量（其中时长已经从字符串转换成秒）
var locationflag=0; 
var typeflag=0;
var applianceflag=0;//各菜单下内容是否初始化的标志位

import { mapState } from 'vuex';
import request from '@/utils/request';
export default {
  computed: mapState({
    userInfo: (state) => state.userModule.userInfo,
  }),
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
        options6:[],
        value10:[],       //地区→省份选择框
        options: [],
        value:[],         //地区→城市选择框
        value1: [],       //地区→月份及日期选择框
        options1: [],
        value2:[],        //型号→型号选择框
        value3: [],       //型号→月份选择框
        options2: [],
        value4:[],        //设备→城市选择框
        options3: [],
        value5: [],       //设备→型号选择框
        value6: [],       //设备→月份及日期选择框
        options4: [{
          value: '1',
          label: '月份选取'
        }, {
          value: '2',
          label: '日期选取'
        }],
        value11:'1',
        value7:'1',
        value8: '1',      //地区、型号、设备→月份/日期功能选择框
        options5:[{
          value: '1',
          label: '省份选取'
        }, {
          value: '2',
          label: '城市选取'
        }],
        value9:'1',        //地区→省份/城市功能选择框
        activeIndex: '1', //页头菜单返回值
        flag:false,      
        flag1:false,
        flag2:false,      //切换不同页头菜单组件显示的标志位
        tableData:[],     
        tableData1:[],
        tableData2:[],    //三个部分的表格
        activeName: 'first',//标签返回值
    };
  },
  mounted() {
    this.switchLocation();
  },
  methods: {
    sortBytime(obj1, obj2, column){
      console.log(obj1, obj2, column)
　　var at = this.time2sec(obj1[column])
　　var bt = this.time2sec(obj2[column])
　　 console.log(at, bt)

　　if (at > bt) {
    　　return -1
　　} else {
    　　return 1
　　}
    },

    cellStyle(row,column,rowIndex,columnIndex){
      // console.log(row)
      if(row.row.un_stable_proportion>50){
        return 'color:red'
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
      total=hour*3600+min*60+sec*1;
      console.log(sec)
      return total;
    },

    switchTimeselection(){
      if(this.value8=='1'){
        this.value6=['2021-01','2021-12'];
      }else{
        this.value6=['2021-01-01','2021-01-31'];
      }
      if(this.value7=='1'){
        this.value3=['2021-01','2021-12'];
      }else{
        this.value3=['2021-01-01','2021-01-31'];
      }
      if(this.value11=='1'){
        this.value1=['2021-01','2021-12'];
      }else{
        this.value1=['2021-01-01','2021-01-31'];
      }
    },

    switchLocation(){
      this.flag2=false;
      this.flag1=false;
      this.flag=true;
      if(locationflag===0){
        this.initialLocation();
        setTimeout(() => {
          this.search();
        }, 100);
        locationflag=1;
      }else{
        setTimeout(() => {
          this.search();
        }, 100);
      }
    },

    switchType(){
      this.flag=false;
      this.flag2=false;
      this.flag1=true;
      if(typeflag===0){
        this.initialType();
        setTimeout(() => {
          this.search1();
        }, 100);
        typeflag=1;
      }else{
        setTimeout(() => {
          this.search1();
        }, 100);
      }
    },

    switchAppliance(){
      this.flag=false;
      this.flag1=false;
      this.flag2=true;
      if(applianceflag===0){
        this.initialAppliance();
        this.handleChange();
        // this.value5=['00012HES','1099512620912']
        setTimeout(() => {
          this.search2();
        }, 100);
        applianceflag=1;
      }else{
        setTimeout(() => {
          this.search2();
        }, 100);
      }
    },

    initialLocation(){
      this.options=[];
      this.options6=[];
      this.value=[];
      this.value10=[];
      this.value1=[];
      this.value11=[];
      console.log(1)
        this.axios.get( "data/chinacity.json").then((response)=>{
          this.options6=response.data;
          this.options6=JSON.parse(JSON.stringify(this.options6)); 
        }).catch((response)=>{
        });
        this.axios.get( "data/chinacity copy.json").then((response)=>{
          this.options=response.data;
          this.options=JSON.parse(JSON.stringify(this.options)); 
          console.log(this.options)
        }).catch((response)=>{
        });
        console.log(1)
      this.value=['110000','110100'];
      this.value10=['110000'];
      this.value1=['2021-01','2021-12'];
      this.value11='1';
    },
    
    initialType(){
      this.options1=[];
      this.value2=[];
      this.value3=[];
      this.value7=[];
      request.post('tableStoreDates/page/list', null, {
        params:
        { 
          pagetype:'typesummary',
          flag:'1'
        },
      }).then(({ data: response }) => {
        for(var i=0;i<response.data.data.length;i++){
          this.options1[i]={label: response.data.data[i].dev_type,value: response.data.data[i].dev_type}
        }
        this.options1=JSON.parse(JSON.stringify(this.options1)); 
        this.value2=['00012HES']
        this.value3=['2021-01','2021-12'];
        this.value7='1';
      }).catch((err) => {
        this.$message.error(err);
      });
    },

    handleChange(){
      this.options3=[];
      request.post('tableStoreDates/page/list', null, {
        params:
        { 
          pagetype:'model2_vue',
          city: this.value4[1],
        },
      }).then(({ data: response }) => {
        var j=0
        for(var i=0; i<response.data.devtype.length;i++){
          this.options3[i]={label:response.data.devtype[i],value:response.data.devtype[i],children:[]}                                                  
        }
        for(var i=0;i<response.data.devid.length;i++){                
          j=response.data.devtype.indexOf(response.data.total[i])
          this.options3[j].children[this.options3[j].children.length]={label:response.data.devid[i],value:response.data.devid[i]}
        }
        this.options3=JSON.parse(JSON.stringify(this.options3));
        this.value5=[this.options3[0].value,this.options3[0].children[0].value]                                                                                                             
      }).catch((err) => {
        // this.$message.error(err);
      });
    },

    initialAppliance(){
      this.options2=[];
      this.options3=[];
      this.value4=[];
      this.value5=[];
      this.value6=[];
      this.value8=[];
      this.axios.get( "data/chinacity copy.json").then((response)=>{
        this.options2=response.data;
        this.options2=JSON.parse(JSON.stringify(this.options2)); 
      }).catch((response)=>{
      })
      this.value4=['110000','110100'];
      this.value6=['2021-01','2021-12'];
      this.value8='1';
    },

    search(){
      datemonth=[];
      average_time=[];
      un_stable_time=[];
      totalTime=[];
      un_stable_proportion=[];
      totalNum=[];
      un_stable_behavior=[];
        request.post('tableStoreDates/page/list', null, {
        params:
        { 
          pagetype:'timesummary',
          flag:'1',         //判断后端查地区部分
          flag1:this.value9,//判断后端查省份/城市
          category:this.value11,//判断后端查月份/日期
          city: this.value[1],//城市编号
          city1: this.value10[0],//省份编号
          month:this.value1[0],
          month1:this.value1[1],//月份范围
          timeLow:this.value1[0],
          timeHigh:this.value1[1],//日期范围
        },
      }).then(({ data: response }) => {
        this.tableData=response.data.data;
        console.log(response.data.data)
        if(this.tableData[0]==undefined){
          this.tableData=[{data:''}]
        }
        for(var i=0;i<response.data.data.length;i++){
          this.tableData[i].data=response.data.province[i];
          console.log(response.data.province[i])
          if(this.value9=='2'){
            this.tableData[i].data1=response.data.province1[i];
          }
          totalTime[i]=this.time2sec(this.tableData[i].water_valid_time);
          un_stable_time[i]=this.time2sec(this.tableData[i].un_stable_time);
          average_time[i]=this.time2sec(this.tableData[i].average_time);
          un_stable_proportion[i]=response.data.data[i].un_stable_proportion;
          totalNum[i]=response.data.data[i].water_num;
          un_stable_behavior[i]=response.data.data[i].un_stable_behavior;
        }
        console.log(response.data.month)
        datemonth=response.data.month;
        // city=response.data.province[0];
      // this.c=response.data.stable_time;
      //  // var model_data=[['稳定模式'],['小幅波动模式'],['向上阶跃模式'],['向下阶跃模式'],['震荡模式']];
      //  if(JSON.stringify(stableTime)!='{}')
      //  {
      //    stableTime.splice(0,0,"稳定模式")
      //   fluctuationTime.splice(0,0,"小幅波动模式")
      //   upTime.splice(0,0,"向上阶跃模式")
      //   downTime.splice(0,0,"向下阶跃模式")
      //   oscTime.splice(0,0,"震荡模式")

      //  }
       
        setTimeout(() => {
           this.drawTable()
        }, 100);
      }).catch((err) => {
        // this.$message.error(err);
      });   
    },

    search1(){
      datemonth=[];
      average_time=[];
      un_stable_time=[];
      totalTime=[];
      un_stable_proportion=[];
      totalNum=[];
      un_stable_behavior=[];
        request.post('tableStoreDates/page/list', null, {
        params:
        { 
          pagetype:'timesummary',
          flag:'2',
          flag1:this.value7,
          city: this.value2[0],
          month:this.value3[0],
          month1:this.value3[1],
          timeLow:this.value1[0],
          timeHigh:this.value1[1],//日期范围
        },
      }).then(({ data: response }) => {
        this.tableData1=response.data.data;
        if(this.tableData1[0]==undefined){
          this.tableData1=[{data:''}]
        }
        for(var i=0;i<response.data.data.length;i++){
          totalTime[i]=this.time2sec(this.tableData1[i].water_valid_time);
          un_stable_time[i]=this.time2sec(this.tableData1[i].un_stable_time);
          average_time[i]=this.time2sec(this.tableData1[i].average_time);
          un_stable_proportion[i]=response.data.data[i].un_stable_proportion;
          totalNum[i]=response.data.data[i].water_num;
          un_stable_behavior[i]=response.data.data[i].un_stable_behavior;
        }
        datemonth=response.data.month;
        console.log(response.data.month)
        // dev_type=response.data.dev_type[0];
      // this.c=response.data.stable_time;
      //  // var model_data=[['稳定模式'],['小幅波动模式'],['向上阶跃模式'],['向下阶跃模式'],['震荡模式']];
      //  if(JSON.stringify(stableTime)!='{}')
      //  {
      //    stableTime.splice(0,0,"稳定模式")
      //   fluctuationTime.splice(0,0,"小幅波动模式")
      //   upTime.splice(0,0,"向上阶跃模式")
      //   downTime.splice(0,0,"向下阶跃模式")
      //   oscTime.splice(0,0,"震荡模式")

      //  }
       
        setTimeout(() => {
           this.drawTable()
        }, 100);
      }).catch((err) => {
        // this.$message.error(err);
      });   
    },
    
    search2(){
      datemonth=[];
      average_time=[];
      un_stable_time=[];
      totalTime=[];
      un_stable_proportion=[];
      totalNum=[];
      un_stable_behavior=[];
      request.post('tableStoreDates/page/list', null, {
        params:
        { 
          pagetype:'timesummary',
          flag1:this.value8,
          city: this.value4[1],
          category:this.value5[0],
          dev_id:this.value5[1],
          month:this.value6[0],
          month1:this.value6[1],
          timeLow:this.value1[0],
          timeHigh:this.value1[1],//日期范围
        },
      }).then(({ data: response }) => {
        this.tableData2=response.data.data;
        if(this.tableData2[0]==undefined){
          this.tableData2=[{data:''}]
        }
        for(var i=0;i<response.data.data.length;i++){
          this.tableData2[i].data=response.data.province[i];
          this.tableData2[i].data1=response.data.province1[i];
          totalTime[i]=this.time2sec(this.tableData2[i].water_valid_time);
          un_stable_time[i]=this.time2sec(this.tableData2[i].un_stable_time);
          average_time[i]=this.time2sec(this.tableData2[i].average_time);
          un_stable_proportion[i]=response.data.data[i].un_stable_proportion;
          totalNum[i]=response.data.data[i].water_num;
          un_stable_behavior[i]=response.data.data[i].un_stable_behavior;
        }
        datemonth=response.data.month;
        // dev_type=response.data.dev_type[0];
      // this.c=response.data.stable_time;
      //  // var model_data=[['稳定模式'],['小幅波动模式'],['向上阶跃模式'],['向下阶跃模式'],['震荡模式']];
      //  if(JSON.stringify(stableTime)!='{}')
      //  {
      //    stableTime.splice(0,0,"稳定模式")
      //   fluctuationTime.splice(0,0,"小幅波动模式")
      //   upTime.splice(0,0,"向上阶跃模式")
      //   downTime.splice(0,0,"向下阶跃模式")
      //   oscTime.splice(0,0,"震荡模式")

      //  }
       
        setTimeout(() => {
           this.drawTable()
        }, 100);
      }).catch((err) => {
        // this.$message.error(err);
      });   
    },

    drawTable() {
      const myChart = this.$echarts.init(document.getElementById('myChart'));
      const option = {
      // title: {
      //   text: this.model_choose_text() ,
      //   left: '5%',
      //   top: '45%',
      //   textStyle: {
      //     fontSize: 20,
      //     color: "rgba(5, 29, 99, 1)",
      //     fontStyle: "normal",
      //     fontWeight: "bold",
      //     width:20
      //   }, 
      // },
      legend: {
        data: ['不稳定占比','累计有效时长','平均用水时长','不稳定时长','不稳定次数','有效用水次数'],
        selected:{'不稳定占比':true,'累计有效时长':false,'平均用水时长':false,'不稳定时长':false,'不稳定次数':false,'有效用水次数':false},
        textStyle: {
          fontSize: 14
        },
      },
      dataZoom: [{
        type: 'slider',
        start: 0,
        end: 100},{
        type: 'inside',
        start: 0,
        end: 100}
      ],
         axisPointer: {
                type: 'line',
                 status: "show",
                  lineStyle: {
                color: '#7581BD',
                width: 2
            },
            },
        tooltip: {
            trigger: 'axis',
            showContent: true,
              axisPointer: {
                type: 'cross',
                 status: "show",
                  lineStyle: {
                color: '#7581BD',
                width: 2
            },
            },     
        },
        // dataset: { 
        //     source:[
        //         this.monthFeedback(),
        //         // this.modelDatafeedback()[0],
        //         // this.modelDatafeedback()[1],
        //         // this.modelDatafeedback()[2],
        //         // this.modelDatafeedback()[3],
        //         // this.modelDatafeedback()[4],
        //          stableTime,
        //          fluctuationTime,
        //          upTime,
        //          downTime,
        //         oscTime,

        //     ]
        //          },
        xAxis: {
          type: 'category',
          triggerEvent:false,  
          axisPointer: {
          value: 0,
          status: "show",
          },
          splitLine: {
            show: true
          },
          axisLabel: {
            fontWeight: "bold",
            fontSize: 14,
            interval: 0, 
            rotate: 30
          },
          data:datemonth,
        },
        yAxis: [
        {
            type: 'value',
            name: '不稳定占比%',
            position: 'left',
            axisLine: {
                show: true,
                lineStyle: {
                    color: 'black'
                }
            },
            axisLabel: {
              formatter: '{value}%',
              fontWeight: "bold",
              fontSize: 14
            },
            nameTextStyle: {
              fontWeight: "bolder",
              fontSize: 15
            }
        },
        {
            type: 'value',
            name: '时长/s',
            position: 'right',
            axisLine: {
                show: true,
                lineStyle: {
                    color: 'green'
                }
            },
            axisLabel: {
              formatter: '{value}s',
              fontWeight: "bold",
              fontSize: 14
            },
            nameTextStyle: {
              fontWeight: "bolder",
              fontSize: 15
            }
        },
        {
            type: 'value',
            name: '次数',
            position: 'right',
             offset: 80,
            axisLine: {
                show: true,
                lineStyle: {
                    color: 'red'
                }
            },
            axisLabel: {
              formatter: '{value}',
              fontWeight: "bold",
              fontSize: 14
            },
            nameTextStyle: {
              fontWeight: "bolder",
              fontSize: 15
            }
        }
      ],
        // grid: {top: '40%'},
        series: [
            { 
              name: '不稳定占比',//'不稳定占比','累计有效时长','平均用水时长','不稳定时长','不稳定次数','有效用水次数'
              type: 'line',
              yAxisIndex: 0,
              itemStyle:{
                color:'pink'
              },
              data:un_stable_proportion,
            },{
              name: '累计有效时长',
              type: 'line',
              yAxisIndex: 1,
              itemStyle:{
                color:'orange'
              },
              data:totalTime,
            },{
              name: '平均用水时长',
              type: 'line',
              yAxisIndex: 1,
              itemStyle:{
                color:'yellow'
              },
              data:average_time,
            },{
              name: '不稳定时长',
              type: 'line',
              yAxisIndex: 1,
              itemStyle:{
                color:'lightgreen'
              },
              data:un_stable_time,
            },{
              name: '不稳定次数',
              type: 'line',
              yAxisIndex: 2,
              itemStyle:{
                color:'lightblue'
              },
              data:un_stable_behavior,
            },{
              name: '有效用水次数',
              type: 'line',
              yAxisIndex: 2,
              itemStyle:{
                color:'violet'
              },
              data:totalNum,
            }      
            // {
            //     type: 'pie',
            //     id: 'pie',
            //     radius: '30%',
            //     center: ['50%', '25%'],
            //     emphasis: {focus: 'data'},
            //     label: {
            //         formatter: '{b}: {@1} ({d}%)'
            //     },
            //     encode: {
            //         itemName: 'product',
            //         value: 1,
            //         tooltip: 1
            //     }
            // }
        ]
    };

// myChart.on('updateAxisPointer', function (event) {
//         var xAxisInfo = event.axesInfo[0];
//         if (xAxisInfo) {
//             var dimension = xAxisInfo.value + 1;
//             myChart.setOption({
//                 legend:{
//                   textStyle: {
//                     fontSize: 14
//                   },
//                 },
//                 series: {
//                     id: 'pie',
//                     label: {
//                       formatter: '{b}: {@[' + dimension + ']} ({d}%)',
//                       fontWeight: "bold",
//                       fontSize: 14
//                     },
//                     encode: {
//                       value: dimension,
//                       tooltip: dimension
//                     }
//                 }
//             });
//         }
//     });
    
      myChart.setOption(option,true);
      window.addEventListener('resize', () => { myChart.resize(); });
    },
  },
  watch: {},
  created() {
    locationflag=0;
    typeflag=0;
    applianceflag=0;
    this.switchLocation();
  },

};
</script>

<style  lang="scss"  scoped>
.search{
  margin-bottom: 20px;
  margin-top: 20px;
}

h2 {
  text-align: center;
  padding: 30px;
  font-size: 18px;
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

.el-menu {
  border-inline-width:5px;
  height: 100%;
  width: 100%;
   .el-menu-item {
     font-size: 17px ;
    color: rgba(0, 0, 0, 0.459);
    &.is-active {
      font-size: 17px ;
      background-color: rgba(205, 217, 233, 0.616);
      color: rgba(3, 78, 190, 0.767);
    }
  }

}

#myChart {
  top: 0px;
  width: 1300px;
  height: 600px;
  margin: 0 auto;
}
</style>