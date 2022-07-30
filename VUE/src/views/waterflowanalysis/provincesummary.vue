<template>
  <div>
    <div class="search" align="center" style="margin-top:20px">
      <el-form ref="form" class="ItemInfo" :model="equipment_info" label-width="80px" :inline="true"> 
    <span>月份选取：</span> 
    <el-date-picker
      v-model="model"
      type="monthrange"
      placeholder="选择月"
      format="yyyy-MM"
      style="margin-left:0px;"
      value-format="yyyy-MM">
    </el-date-picker>
    
    <span style="margin-left:30px;">省份选取：</span> 
    <el-cascader
      v-model="value"
      ref="cascaderAddr"
      :options="options"
      :props="{ multiple: true}"
      placeholder="请选择省份"
      style="width:300px;margin-left:0px;"
      clearable
      :disabled="allSelect===true">
    </el-cascader>

    <el-switch
      v-model="allSelect"
      active-text="开启全选"
      style="margin-left:30px;"
      @change="selectAll">
    </el-switch>

    <el-button type="primary" @click="search" style="margin-left:30px;">查询</el-button>

     <el-link style="margin-left:30px;" @click="jumppage" :underline="false">转至城市<i class="el-icon-caret-right"></i> </el-link>
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

    <div class="content" style="margin-top:20px">
      <h4 align="left"><strong>{{model[0]}}至{{model[1]}}月省份信息汇总</strong></h4>
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="表格" name="first">
          <el-table :data="tableData" ref="filterTable" @sort-change="changeTableSort" border style="width: 100%;margin-top:10px" align="center" :cell-style="cellStyle" row-key="id" :tree-props="{children: 'children', hasChildren: 'hasChildren'}" >
            <template v-for="(headerItem, headerIndex) in headerData">
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
            <el-table-column  prop="time_date" align="center" sortable label="年-月"></el-table-column>
            <el-table-column  prop="equipment_num" align="center" sortable label="设备数"></el-table-column>
            <el-table-column  prop="water_score" align="center" sortable label="水流量评估分数(0~100)"></el-table-column>
            <el-table-column  prop="un_stable_proportion" align="center"  sortable label="不稳定占比%"></el-table-column>
            <el-table-column  prop="un_stable_time" align="center" sortable :sort-method="(a,b) => sortBytime(a ,b , 'un_stable_time')" label="不稳定时长"></el-table-column>
            <el-table-column  prop="water_valid_time" align="center" sortable :sort-method="(a,b) => sortBytime(a ,b , 'water_valid_time')" label="累计有效时长"></el-table-column>
            <el-table-column  prop="un_stable_behavior" align="center"  sortable label="不稳定次数"></el-table-column>
            <el-table-column  prop="water_num" align="center" sortable label="有效用水次数"></el-table-column>
            <el-table-column  prop="average_time" align="center" sortable :sort-method="(a,b) => sortBytime(a ,b , 'average_time')" label="平均用水时长"></el-table-column>
            <el-table-column  prop="maximum_time" align="center" sortable :sort-method="(a,b) => sortBytime(a ,b , 'maximum_time')" label="最长用水时长"></el-table-column>
            
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="柱状图对比" name="second">
          <div align="center" style="margin-top:10px;margin-bottom:10px;">
            <span>排序：</span> 
            <el-select v-model="value1" clearable placeholder="请选择统计量" style="width:150px;" size="small" @change="handleChange">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-radio v-model="radio" label="1" @change="changeTrendorder" style="margin-left:10px;">默认</el-radio>
            <el-radio v-model="radio" label="2" @change="changeTrendorder">升序</el-radio>
            <el-radio v-model="radio" label="3" @change="changeTrendorder">降序</el-radio>
          </div>
          <div id='myChart'></div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import * as echarts from 'echarts';
import request from '@/utils/request';
import JsonExcel from 'vue-json-excel';
var water_score=[];
var un_stable_proportion=[];
var totalTime=[];
var average_time=[];
var un_stable_time=[];
var totalNum=[];
var un_stable_behavior=[];
var province=[];
var allOption=[];
var template=new Array();
var lengend1={'水流量评估分数':true,'不稳定占比':false,'累计有效时长':false,'平均用水时长':false,'不稳定时长':false,'不稳定次数':false,'有效用水次数':false}
export default {
  components: {
      'download-excel': JsonExcel
    }, 
  computed: mapState({
    userInfo: (state) => state.userModule.userInfo,
  }),
  data() {
    return {
      headerData:[
        {
          label: '省份',
          prop: 'data',
          select1:true,
          value:[],
          option:[],
        },
        // {
        //   label: '年-月',
        //   prop: 'time_date',
        //   select2:true,
        // },
        // {
        //   label: '设备数',
        //   prop: 'equipment_num',
        //   select3:true,
        // },
        // {
        //   label: '不稳定占比%',
        //   prop: 'un_stable_proportion',
        //   select4:true,
        // },
        // {
        //   label: '不稳定时长',
        //   prop: 'un_stable_time',
        //   select5:true,
        // },
        // {
        //   label: '累计有效时长',
        //   prop: 'water_valid_time',
        //   select6:true,
        // },
        // {
        //   label: '不稳定次数',
        //   prop: 'un_stable_behavior',
        //   select7:true,
        // },
        // {
        //   label: '有效用水次数',
        //   prop: 'water_num',
        //   select8:true,
        // },
        // {
        //   label: '平均用水时长',
        //   prop: 'average_time',
        //   select9:true,
        // },
        // {
        //   label: '最长用水时长',
        //   prop: 'maximum_time',
        //   select10:true,
        // },
        // {
        //   label: '最短用水时长',
        //   prop: 'minimum_time',
        //   select11:true,
        // },
        // {
        //   label: '水流量评估分数(0~100)',
        //   prop: 'water_score',
        //   select12:true,
        // }
      ],
      msg: 'Welcome to Your Vue.js App',
      model:[],
      options:[],
      value:[],
      province:[],
      water_score:[],
      un_stable_proportion:[],
      totalTime:[],
      average_time:[],
      un_stable_time:[],
      totalNum:[],
      un_stable_behavior:[],
      radio:'1',
      tableData:[],
      tableData1:[],
      activeName: 'first',
      options1: [{
        value: '2',
        label: '不稳定占比'
      }, {
        value: '3',
        label: '累计有效时长'
      }, {
        value: '4',
        label: '平均用水时长'
      }, {
        value: '5',
        label: '不稳定时长'
      }, {
        value: '6',
        label: '不稳定次数'
      }, {
        value: '7',
        label: '有效用水次数'
      },{
        value: '1',
        label: '水流量评估分数'
      }],
      value1: '1',
      allSelect:true,
      // search2:[],
      json_fields: {
       

          '省份': 'data',
          '年-月': 'time_date',
          '设备数': 'equipment_num',
          '水流量评估分数': 'water_score',
          '不稳定占比%': 'un_stable_proportion',
          '不稳定时长': 'un_stable_time',
          '累计有效时长': 'water_valid_time',
          '不稳定次数': 'un_stable_behavior',
          '有效用水次数': 'water_num',
          '平均用水时长': 'average_time',
          '最长用水时长': 'maximum_time',
          },
    };
  },
  mounted() {

  },
  methods: 
  { 
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
      if(column=='un_stable_time'||column=='water_valid_time'||column=='average_time'||column=='maximum_time'||column=='minimum_time'){
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
    // getFilterlist(){
    //   var filters=[];
    //   for(var i=0;i<this.tableData.length;i++){
    //     filters[i]={text:this.tableData[i].data,value:this.tableData[i].data}
    //   }
    //   console.log(filters)
    //   return filters;
    // },
    // // getFilterlist1(){
    // //   for(var i=0;i<this.tableData.length;i++){
    // //     this.options10[i]={label:this.tableData[i].data,value:this.tableData[i].data}
    // //   }
    // // },
    // filterHandler(value, row, column){
    //   // console.log(row)
    //   const property = column.property;
    //   if(value=='全选'){
    //     return true;
    //   }
    //   return row[property] === value;
    // },
    getOptionlist(){
      for(var i=0;i<this.tableData.length;i++){
        console.log(this.tableData[i])
        this.headerData[0].option[i]={label:this.tableData[i].data,value:this.tableData[i].data}
        console.log(this.headerData[0].option[i])
         this.headerData[0].option=JSON.parse(JSON.stringify(this.headerData[0].option)); 
      }
    },//获取表格省份选项
    filterprovinces(){
      console.log(this.headerData[0].value)
      var k=0
      var tmpData=new Array()
      for(var i=0;i<this.headerData[0].value.length;i++){
        console.log(this.tableData1)
        for(var j=0;j<this.tableData1.length;j++){
          if(this.tableData1[j].data==this.headerData[0].value[i]){
            tmpData[k]=this.tableData1[j]
            console.log(this.tableData1[j])
            k++
          }
        }
      }
      this.tableData=tmpData
    },//筛选按省份
    selectallprovince(){
      var tmpData=new Array()   
      this.headerData[0].value=[]
      for(var j=0;j<this.tableData1.length;j++){
        this.headerData[0].value[j]=this.tableData1[j].data
        tmpData[j]=this.tableData1[j]
      }
      this.headerData[0].value=JSON.parse(JSON.stringify(this.headerData[0].value)); 
      console.log(this.headerData[0].value)
      this.tableData=tmpData
    },//全选省份
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
      if(row.row.time_date==this.model[0]+'~'+this.model[1]){
        if(row.row.un_stable_proportion>50){
          return {"color":"red","background":"#f2eada"}
        }
        return {"background":"#f2eada"}
      }else{
        if(row.row.un_stable_proportion>50){
          return {"color":"red"}
        }
      }
    },
    selectAll(){
      if(this.allSelect==true){
        this.value=allOption;
      }else{
        this.value=[];
      }
    },
    handleChange(){
      this.changeTrendorder();
    },
    changeTrendorder(){
      // this.un_stable_proportion=[];
      // this.province=[];
      var conditon=[];
      // lengend1={}
      lengend1={'水流量评估分数':false,'不稳定占比':false,'累计有效时长':false,'平均用水时长':false,'不稳定时长':false,'不稳定次数':false,'有效用水次数':false}
      console.log(lengend1)
      switch(this.value1){
        case '2': conditon=this.un_stable_proportion;lengend1['不稳定占比']=true;break;
        case '3': conditon=this.totalTime;lengend1['累计有效时长']=true;break;
        case '4': conditon=this.average_time;lengend1['平均用水时长']=true;break;
        case '5': conditon=this.un_stable_time;lengend1['不稳定时长']=true;break;
        case '6': conditon=this.un_stable_behavior;lengend1['不稳定次数']=true;break;
        case '7': conditon=this.totalNum;lengend1['有效用水次数']=true;break;
        case '1': conditon=this.water_score;lengend1['水流量评估分数']=true;break;
        default: break;
      }
      if(this.radio==='2'){
        var space=0;
        for(var i=0;i<un_stable_proportion.length-1;i++){
          for(var j=i+1;j<un_stable_proportion.length;j++){
            if(conditon[i]>conditon[j]){
              space=this.un_stable_proportion[i];
              this.un_stable_proportion[i]=this.un_stable_proportion[j];
              this.un_stable_proportion[j]=space;
              space=this.province[i];
              this.province[i]=this.province[j];
              this.province[j]=space;
              space=this.totalTime[i];
              this.totalTime[i]=this.totalTime[j];
              this.totalTime[j]=space;
              space=this.average_time[i];
              this.average_time[i]=this.average_time[j];
              this.average_time[j]=space;
              space=this.un_stable_time[i];
              this.un_stable_time[i]=this.un_stable_time[j];
              this.un_stable_time[j]=space;
              space=this.totalNum[i];
              this.totalNum[i]=this.totalNum[j];
              this.totalNum[j]=space;
              space=this.un_stable_behavior[i];
              this.un_stable_behavior[i]=this.un_stable_behavior[j];
              this.un_stable_behavior[j]=space;
        space=this.water_score[i];
              this.water_score[i]=this.water_score[j];
              this.water_score[j]=space;


            }
          }
        }
        this.drawTable();
      }else if(this.radio==='3'){
        var space=0;
        for(var i=0;i<un_stable_proportion.length-1;i++){
          for(var j=i+1;j<un_stable_proportion.length;j++){
            if(conditon[i]<conditon[j]){
              space=this.un_stable_proportion[i];
              this.un_stable_proportion[i]=this.un_stable_proportion[j];
              this.un_stable_proportion[j]=space;
              space=this.province[i];
              this.province[i]=this.province[j];
              this.province[j]=space;
              space=this.totalTime[i];
              this.totalTime[i]=this.totalTime[j];
              this.totalTime[j]=space;
              space=this.average_time[i];
              this.average_time[i]=this.average_time[j];
              this.average_time[j]=space;
              space=this.un_stable_time[i];
              this.un_stable_time[i]=this.un_stable_time[j];
              this.un_stable_time[j]=space;
              space=this.totalNum[i];
              this.totalNum[i]=this.totalNum[j];
              this.totalNum[j]=space;
              space=this.un_stable_behavior[i];
              this.un_stable_behavior[i]=this.un_stable_behavior[j];
              this.un_stable_behavior[j]=space;
        space=this.water_score[i];
              this.water_score[i]=this.water_score[j];
              this.water_score[j]=space;

            }
          }
        }
        this.drawTable();
      }else{
        this.search();
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
      return total;
    },
    sec2time(time){
      if(time<3600&&time>60){
        return Math.floor(time/60)+'m'+Math.floor(time%60)+'s'
      }else if(time<60){
        return time+'s'
      }else{
        return Math.floor(time/3600)+'h'+Math.floor(time%3600/60)+'m'+Math.floor(time%3600%60)+'s'
      }
    },
    tableAddTreeprops(data,province,provinceNotrepetitive){
      var averageData=[];
      var equipment_num=0;
      var un_stable_proportion=0;
      var un_stable_time=0;
      var totalTime=0;
      var un_stable_behavior=0;
      var water_num=0;
      var average_time=0;
      var maximum_time=0;
      var minimum_time=1000;
      var water_score=0;
      var k=0;
      template=[];
      // provinceNotrepetitive1=[];
      var data1=new Array();
      var province1=new Array();
      var provinceNotrepetitive1=new Array();
      for(var i=0;i<data.length;i++){
        data1[i]=data[i];
        province1[i]=province[i];
        data1[i].data=province1[i];
      }
      // for(var i=0;i<provinceRepetitive.length;i++){
      //   provinceRepetitive1[i]=provinceRepetitive[i]
      // }
      for(var j=0;j<provinceNotrepetitive.length;j++){
        provinceNotrepetitive1[j]=provinceNotrepetitive[j]
        template[j]=new Array();
        for(var i=0;i<data1.length;i++){
          if(data1[i].data==provinceNotrepetitive1[j]){
            template[j][k]=data1[i];
            template[j][k++].id=j+1+''+k;
            equipment_num+=data1[i].equipment_num;
            un_stable_proportion+=data1[i].un_stable_proportion;
            un_stable_time+=this.time2sec(data1[i].un_stable_time);
            totalTime+=this.time2sec(data1[i].water_valid_time);
            un_stable_behavior+=data1[i].un_stable_behavior;
            water_num+=data1[i].water_num;
            average_time+=this.time2sec(data1[i].average_time);
            if(maximum_time<this.time2sec(data1[i].maximum_time)){
              maximum_time=this.time2sec(data1[i].maximum_time)
            }
            if(minimum_time>this.time2sec(data1[i].minimum_time)){
              minimum_time=this.time2sec(data1[i].minimum_time)
            }
            water_score+=data1[i].water_score;
            data1.splice(i,1);
            i-=1;
            // console.log(template[j][k])
          }
        }
        averageData[j]={id: j+1+'a',data: template[j][0].data,time_date: this.model[0]+'~'+this.model[1],equipment_num: Math.floor(equipment_num/k),un_stable_proportion: Number(parseFloat(un_stable_proportion/k).toFixed(2)),
                        un_stable_time: this.sec2time(Math.floor(un_stable_time/k)),water_valid_time: this.sec2time(Math.floor(totalTime/k)),un_stable_behavior: Math.floor(un_stable_behavior/k),
                        water_num: Math.floor(water_num/k),average_time: this.sec2time(Math.floor(average_time/k)),maximum_time: this.sec2time(maximum_time),minimum_time: this.sec2time(minimum_time),
                        water_score: Math.floor(water_score/k),children: template[j]}
        k=0;
        equipment_num=0;
        un_stable_proportion=0;
        un_stable_time=0;
        totalTime=0;
        un_stable_behavior=0;
        water_num=0;
        average_time=0;
        maximum_time=0;
        minimum_time=1000;
        water_score=0;
      }
      console.log(template);
      return averageData;
      
    },
    search(){
      average_time=[];
      un_stable_time=[];
      totalTime=[];
      un_stable_proportion=[];
      totalNum=[];
      un_stable_behavior=[];
      province=[];
      this.radio='1';
      request.post('tableStoreDates/page/list', null, {
        params:
        { 
          pagetype:'locationsummary',
          flag:'provincesum',
          month:this.model[0],
          month1:this.model[1],
          type1:this.value,
        },
      }).then(({ data: response }) => {
        // this.tableData=response.data.data;
        this.tableData=this.tableAddTreeprops(response.data.data,response.data.province,response.data.province1);
        
        if(this.tableData[0]==undefined){
          this.tableData=[{data:''}]
        }
        this.tableData1=this.tableData;
        for(var i=0;i<this.tableData.length;i++){
          // this.tableData[i].data=response.data.province[i];
          totalTime[i]=this.time2sec(this.tableData[i].water_valid_time);
          un_stable_time[i]=this.time2sec(this.tableData[i].un_stable_time);
          average_time[i]=this.time2sec(this.tableData[i].average_time);
          un_stable_proportion[i]=this.tableData[i].un_stable_proportion;
          totalNum[i]=this.tableData[i].water_num;
          un_stable_behavior[i]=this.tableData[i].un_stable_behavior;
          province[i]=this.tableData[i].data
           water_score[i]=this.tableData[i].water_score
          // console.log(response.data.data.time_date[i]);
        }
        console.log(response.data.data[0].time_date);
        // un_stable_proportion=response.data.un_stable_proportion;
        // province=response.data.province;
        // for(var i=0;i<province.length;i++){
        //   province[i]+=
        // }
        this.water_score=water_score;
        this.totalTime=totalTime;
        this.average_time=average_time;
        this.un_stable_time=un_stable_time;
        this.un_stable_proportion=un_stable_proportion;
        this.totalNum=totalNum;
        this.un_stable_behavior=un_stable_behavior;
        this.province=province;
        this.getOptionlist();
        this.drawTable();
      }).catch((err) => {
        this.$message.error(err);
      });
    },
    drawTable(){
      var chartDom = document.getElementById('myChart');
      var myChart = echarts.init(chartDom);
      var option;
      option = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'cross'        // 默认为直线，可选为：'line' | 'shadow'
        },
    },
    legend: {
        data: ['水流量评估分数','不稳定占比','累计有效时长','平均用水时长','不稳定时长','不稳定次数','有效用水次数'],
        selected:lengend1,
        textStyle: {
          fontSize: 14
        },
    },
    dataZoom: [{
        type: 'slider',
        start: 0,
        end: 100
    }, {
        type: 'inside',
        start: 0,
        end: 100
    }],
    grid: {
        left: '3%',
        right: '8%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            data: this.province,
            axisLabel: {
              fontWeight: "bold",
              fontSize: 14,
              interval: 0, 
              rotate: 30
            }
        }
    ],
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
              fontSize: 14,
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
              fontSize: 14,
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
              fontSize: 14,
            },
            nameTextStyle: {
              fontWeight: "bolder",
              fontSize: 15
            }
        }
    ],
    series: [{
            name: '水流量评估分数',
            type: 'bar',
            yAxisIndex: 0,
            barGap: 0,
            label: {
                show: true,
                position: 'top',
                formatter: '{c}分',
                color: 'black',
                align:'center',
                rotate: 45
            },
            itemStyle:{
              color:'red'
            },
            emphasis: {
                focus: 'series'
            },
            data: this.water_score,
        },

        {
            name: '不稳定占比',
            type: 'bar',
            yAxisIndex: 0,
            barGap: 0,
            label: {
                show: true,
                position: 'top',
                formatter: '{c}%',
                color: 'black',
                align:'center',
                rotate: 45
            },
            itemStyle:{
              color:'pink'
            },
            emphasis: {
                focus: 'series'
            },
            data: this.un_stable_proportion,
        },
        {
            name: '累计有效时长',
            type: 'bar',
            yAxisIndex: 1,
            label: {
                show: true,
                position: 'top',
                formatter: function(params){return Math.floor(params.value/3600)+'h'+Math.floor(params.value%3600/60)+'m'+Math.floor(params.value%3600%60)+'s'},
                color: 'black',
                align:'center',
                rotate: 45
            },
            itemStyle:{
              color:'orange'
            },
            emphasis: {
                focus: 'series'
            },
            data: this.totalTime,
        },
        {
            name: '平均用水时长',
            type: 'bar',
            yAxisIndex: 1,
            label: {
                show: true,
                position: 'top',
                formatter: '{c}s',
                color: 'black',
                align:'center',
                rotate: 45
            },
            itemStyle:{
              color:'yellow'
            },
            emphasis: {
                focus: 'series'
            },
            data: this.average_time,
        },
        {
            name: '不稳定时长',
            type: 'bar',
            yAxisIndex: 1,
            label: {
               show: true,
                position: 'top',
                formatter: function(params){return Math.floor(params.value/3600)+'h'+Math.floor(params.value%3600/60)+'m'+Math.floor(params.value%3600%60)+'s'},
                color: 'black',
                align:'center',
                rotate: 45
            },
            itemStyle:{
              color:'lightgreen'
            },
            emphasis: {
                focus: 'series'
            },
            data: this.un_stable_time,
        },
        {
            name: '不稳定次数',
            type: 'bar',
            yAxisIndex: 2,
            label: {
                show: true,
                position: 'top',
                formatter: '{c}',
                color: 'black',
                align:'center',
                rotate: 45
            },
            itemStyle:{
              color:'lightblue'
            },
            emphasis: {
                focus: 'series'
            },
            data: this.un_stable_behavior,
        },
        {
            name: '有效用水次数',
            type: 'bar',
            yAxisIndex: 2,
            label: {
                show: true,
                position: 'top',
                formatter: '{c}',
                color: 'black',
                align:'center',
                rotate: 45
            },
            itemStyle:{
              color:'violet'
            },
            emphasis: {
                focus: 'series'
            },
            data: this.totalNum,
        }
    ]
};
       myChart.setOption(option,true);
      window.addEventListener('resize', () => { myChart.resize(); });//// 建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
    },
    jumppage(){
      let routeData = this.$router.resolve({
        path:'citysummary',
        query: {
          time: this.model[0],
          time1: this.model[1],
          province:this.value,
          flag:'1',
        }
      });
      window.open(routeData.href);
    }
  },
  watch: {},
  created() {
    this.axios.get( "data/chinacity.json").then((response)=>{
      this.options=response.data;
      this.options=JSON.parse(JSON.stringify(this.options)); 
      
      // var a=[];
      // for(var i=0;i<this.options.length;i++){
      //   a[0]=this.options[i].value;
      //   this.allOption[i]=a;
      //       // console.log(this.allOption)
      // }
    }).catch((response)=>{
      console.log(response);
    });
    allOption=[];
    request.post('tableStoreDates/page/list', null, {
        params:
        { 
          pagetype:'selectAll',
        },
      }).then(({ data: response }) => {
        for(var i=0;i<response.data.province.length;i++){
          allOption[i]=new Array();
          allOption[i][0]=response.data.province[i];
        }
        this.value=allOption;
        request.post('tableStoreDates/page/list', null, {
        params:
        { 
          pagetype: 'datafeatures',
        },
      }).then(({ data: response }) => {
        console.log(response.data.lastmonth)
        this.model=[response.data.lastmonth,response.data.lastmonth]
      }).catch((err) => {
      });
      // console.log(this.value)
      setTimeout(() => {
        this.search();
        }, 400)
      }).catch((err) => {
        // this.$message.error(err);
      });
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
