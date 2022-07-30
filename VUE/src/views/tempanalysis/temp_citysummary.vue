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

    <span style="margin-left:30px;">城市选取：</span> 
    <el-cascader
      v-model="value"
      ref="cascaderAddr"
      :options="options"
      :props="{ multiple: true,}"
      placeholder="请选择城市"
      style="width:400px;margin-left:0px;"
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
      <h4 align="left"><strong>{{model[0]}}至{{model[1]}}月城市信息汇总</strong></h4>
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="表格" name="first">
          <el-table :data="tableData" ref="filterTable" @sort-change="changeTableSort" border style="width: 100%;margin-top:10px" align="center" :cell-style="cellStyle" row-key="id" :tree-props="{children: 'children', hasChildren: 'hasChildren'}" :default-sort = "{prop: 'temp_score', order: 'ascending'}">
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
                    style="width:400px;"
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
            <!-- <el-table-column  prop="time_date" align="center" sortable label="年-月"></el-table-column>
            <el-table-column  prop="equipment_num" align="center" sortable label="设备数"></el-table-column>
            <el-table-column  prop="temp_score" align="center" sortable label="水流量评估分数(0~100)"></el-table-column>
            <el-table-column  prop="abnormal_heat_pro" align="center"  sortable label="不稳定占比%"></el-table-column>
            <el-table-column  prop="abnormal_stable_temp_pro" align="center" sortable :sort-method="(a,b) => sortBytime(a ,b , 'abnormal_stable_temp_pro')" label="不稳定时长"></el-table-column>
            <el-table-column  prop="abnormal_all_pro" align="center" sortable :sort-method="(a,b) => sortBytime(a ,b , 'abnormal_all_pro')" label="累计有效时长"></el-table-column>
            <el-table-column  prop="ave_unstable_proportion" align="center"  sortable label="不稳定次数"></el-table-column>
            <el-table-column  prop="temp_num" align="center" sortable label="有效用水次数"></el-table-column>
            <el-table-column  prop="ave_heat_duration" align="center" sortable :sort-method="(a,b) => sortBytime(a ,b , 'ave_heat_duration')" label="平均用水时长"></el-table-column>
            <el-table-column  prop="ave_un_sable_duration" align="center" sortable :sort-method="(a,b) => sortBytime(a ,b , 'ave_un_sable_duration')" label="最长用水时长"></el-table-column> -->
            <el-table-column  prop="time_date" align="center" sortable label="年-月"></el-table-column>
            <el-table-column  prop="equipment_num" align="center" sortable label="设备数"></el-table-column>
            <el-table-column  prop="temp_score" align="center" sortable label="温度评估分数(0~100)"></el-table-column>
            <el-table-column  prop="temp_num" align="center" sortable label="温度有效片段"></el-table-column>
            <el-table-column  prop="abnormal_heat_pro" align="center" sortable label="仅加热异常模式占比%"></el-table-column>
            <el-table-column  prop="abnormal_stable_temp_pro" align="center"  sortable label="仅恒温异常模式占比%"></el-table-column>
            <el-table-column  prop="abnormal_all_pro" align="center"  sortable label="加热+恒温异常模式占比%"></el-table-column>
            <el-table-column  prop="ave_heat_duration" align="center" sortable :sort-method="(a,b) => sortBytime(a ,b , 'ave_heat_duration')" label="加热时长/台"></el-table-column>
            <el-table-column  prop="ave_un_sable_duration" align="center" sortable :sort-method="(a,b) => sortBytime(a ,b , 'ave_un_sable_duration')" label="不恒温时长/台"></el-table-column>
            <el-table-column  prop="ave_unstable_proportion" align="center" sortable label="不恒温时长占比%"></el-table-column>
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

var temp_score=[];
var abnormal_stable_temp_pro=[];
var totalTime=[];
var ave_heat_duration=[];
var ave_un_sable_duration=[];
var totalNum=[];
var abnormal_all_pro=[];
var province=[];
var citycode=[];
var allOption=[];
var optionLastpage=[];
var template=new Array();
var lengend1={'温度评估得分':true,'恒温异常模式占比':false,'不恒温时长占比':false,'加热时长/台':false,'不恒温时长/台':false,'加热+恒温异常模式占比':false,'温度有效片段':false}

export default {components: {
      'download-excel': JsonExcel
    },

  computed: mapState({
    userInfo: (state) => state.userModule.userInfo,
  }),
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      headerData:[
        {
          label: '城市',
          prop: 'data',
          select1:true,
          value:[],
          option:[],
        },
      ],json_fields: {
          '城市': 'data',
            "年-月":'time_date',

          '设备数': 'equipment_num',
          '温度评估分数': 'temp_score',
          '温度有效片段':'temp_num',
          

          '仅加热异常模式占比': 'abnormal_heat_pro',
          '仅恒温异常模式占比': 'abnormal_stable_temp_pro',
          '加热+恒温异常模式占比':'abnormal_stable_temp_pro',
            '加热时长/台': 'ave_heat_duration',
          '不恒温时长/台': 'ave_un_sable_duration',
          '不恒温时长占比':'ave_unstable_proportion',


          },

     temp_score:[],
      model:[],
      options:[],
      value:[],
      province:[],
      abnormal_stable_temp_pro:[],
      totalTime:[],
      ave_heat_duration:[],
      ave_un_sable_duration:[],
      totalNum:[],
      abnormal_all_pro:[],
      radio:'1',
      tableData:[],
      tableData1:[],
      activeName: 'first',
      options1: [{
        value: '2',
        label: '恒温异常模式占比'
      }, {
        value: '3',
        label: '不恒温时长占比'
      }, {
        value: '4',
        label: '加热时长/台'
      }, {
        value: '5',
        label: '不恒温时长/台'
      }, {
        value: '6',
        label: '加热+恒温异常模式占比'
      }, {
        value: '7',
        label: '温度有效片段'
      }, {
        value: '1',
        label: '温度评估分数'
      }
      ],
      value1: '1',
      allSelect:true,
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

　　if (at > bt) {
    　　return 1
　　} else {
    　　return -1
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
    sortBytime1(obj1,column,order){
      var condition=[];
      if(column=='ave_heat_duration'||column=='ave_un_sable_duration'){
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
    // getFilterlist(){
    //   var filters=[];
    //   for(var i=0;i<this.tableData.length;i++){
    //     filters[i]={text:this.tableData[i].data,value:this.tableData[i].data}
    //   }
    //   console.log(filters)
    //   return filters;
    // },
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
        if(row.row.abnormal_heat_pro+row.row.abnormal_stable_temp_pro+row.row.abnormal_all_pro>50){
          return {"color":"red","background":"#f2eada"}
        }
        return {"background":"#f2eada"}
      }else{
        if(row.row.abnormal_heat_pro+row.row.abnormal_stable_temp_pro+row.row.abnormal_all_pro>50){
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
      // this.abnormal_heat_pro=[];
      // this.province=[];
      var conditon=[];
      lengend1={'温度评估分数':false,'恒温异常模式占比':false,'不恒温时长占比':false,'加热时长/台':false,'不恒温时长/台':false,'加热+恒温异常模式占比':false,'温度有效片段':false}
      switch(this.value1){
        case '2': conditon=this.abnormal_stable_temp_pro;lengend1['恒温异常模式占比']=true;break;
        case '3': conditon=this.totalTime;lengend1['不恒温时长占比']=true;break;
        case '4': conditon=this.ave_heat_duration;lengend1['加热时长/台']=true;break;
        case '5': conditon=this.ave_un_sable_duration;lengend1['不恒温时长/台']=true;break;
        case '6': conditon=this.abnormal_all_pro;lengend1['加热+恒温异常模式占比']=true;break;
        case '7': conditon=this.totalNum;lengend1['温度有效片段']=true;break;
        case '1': conditon=this.temp_score;lengend1['温度评估分数']=true;break;
        default: break;
      }
      if(this.radio==='2'){
        var space=0;
        for(var i=0;i<abnormal_stable_temp_pro.length-1;i++){
          for(var j=i+1;j<abnormal_stable_temp_pro.length;j++){
            if(conditon[i]>conditon[j]){
              space=this.abnormal_stable_temp_pro[i];
              this.abnormal_stable_temp_pro[i]=this.abnormal_stable_temp_pro[j];
              this.abnormal_stable_temp_pro[j]=space;
              space=this.province[i];
              this.province[i]=this.province[j];
              this.province[j]=space;
              space=this.totalTime[i];
              this.totalTime[i]=this.totalTime[j];
              this.totalTime[j]=space;

              space=this.temp_score[i];
              this.temp_score[i]=this.temp_score[j];
              this.temp_score[j]=space;

              space=this.ave_heat_duration[i];
              this.ave_heat_duration[i]=this.ave_heat_duration[j];
              this.ave_heat_duration[j]=space;
              space=this.ave_un_sable_duration[i];
              this.ave_un_sable_duration[i]=this.ave_un_sable_duration[j];
              this.ave_un_sable_duration[j]=space;
              space=this.totalNum[i];
              this.totalNum[i]=this.totalNum[j];
              this.totalNum[j]=space;
              space=this.abnormal_all_pro[i];
              this.abnormal_all_pro[i]=this.abnormal_all_pro[j];
              this.abnormal_all_pro[j]=space;
            }
          }
        }
        this.drawTable();
      }else if(this.radio==='3'){
        var space=0;
        for(var i=0;i<abnormal_stable_temp_pro.length-1;i++){
          for(var j=i+1;j<abnormal_stable_temp_pro.length;j++){
            if(conditon[i]<conditon[j]){
              space=this.abnormal_stable_temp_pro[i];
              this.abnormal_stable_temp_pro[i]=this.abnormal_stable_temp_pro[j];
              this.abnormal_stable_temp_pro[j]=space;
              space=this.province[i];
              this.province[i]=this.province[j];
              this.province[j]=space;
              space=this.totalTime[i];
              this.totalTime[i]=this.totalTime[j];
              this.totalTime[j]=space;

              space=this.temp_score[i];
              this.temp_score[i]=this.temp_score[j];
              this.temp_score[j]=space;


              space=this.ave_heat_duration[i];
              this.ave_heat_duration[i]=this.ave_heat_duration[j];
              this.ave_heat_duration[j]=space;
              space=this.ave_un_sable_duration[i];
              this.ave_un_sable_duration[i]=this.ave_un_sable_duration[j];
              this.ave_un_sable_duration[j]=space;
              space=this.totalNum[i];
              this.totalNum[i]=this.totalNum[j];
              this.totalNum[j]=space;
              space=this.abnormal_all_pro[i];
              this.abnormal_all_pro[i]=this.abnormal_all_pro[j];
              this.abnormal_all_pro[j]=space;
            }
          }
        }
        this.drawTable();
      }else{
        this.search();
      }
    },
    getCitycode(){
      citycode=[];
      for(var i=0;i<this.value.length;i++){
        citycode[i]=this.value[i][1];
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
        return time+'s'
      }else{
        return Math.floor(time/3600)+'h'+Math.floor(time%3600/60)+'m'+Math.floor(time%3600%60)+'s'
      }
    },
    tableAddTreeprops(data,province,provinceNotrepetitive){
      var averageData=[];
      var equipment_num=0;
      var abnormal_stable_temp_pro=0;
      var ave_un_sable_duration=0;
      var totalTime=0;
      var abnormal_all_pro=0;
      var temp_num=0;
      var ave_heat_duration=0;
      var abnormal_heat_pro=0;
      var temp_score=0;
      var k=0;
      template=[];
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
            abnormal_stable_temp_pro+=data1[i].abnormal_stable_temp_pro;
            ave_un_sable_duration+=this.time2sec(data1[i].ave_un_sable_duration);
            totalTime+=data1[i].ave_unstable_proportion;
            abnormal_all_pro+=data1[i].abnormal_all_pro;
            temp_num+=data1[i].temp_num;
            ave_heat_duration+=this.time2sec(data1[i].ave_heat_duration);
            abnormal_heat_pro+=data1[i].abnormal_heat_pro
            temp_score+=data1[i].temp_score;
            data1.splice(i,1);
            i-=1;
            console.log(template[j][k])
          }
        }
        averageData[j]={id: j+1+'a',data: template[j][0].data,time_date: this.model[0]+'~'+this.model[1],equipment_num: Math.floor(equipment_num/k),abnormal_stable_temp_pro: Number(parseFloat(abnormal_stable_temp_pro/k).toFixed(2)),
                        ave_un_sable_duration: this.sec2time(Math.floor(ave_un_sable_duration/k)),ave_unstable_proportion: Number(parseFloat(totalTime/k).toFixed(2)),abnormal_all_pro: Number(parseFloat(abnormal_all_pro/k).toFixed(2)),
                        temp_num: Math.floor(temp_num/k),ave_heat_duration: this.sec2time(Math.floor(ave_heat_duration/k)),abnormal_heat_pro: Number(parseFloat(abnormal_heat_pro/k).toFixed(2)),
                        temp_score: Math.floor(temp_score/k),children: template[j]}
        k=0;
        equipment_num=0;
        abnormal_stable_temp_pro=0;
        ave_un_sable_duration=0;
        totalTime=0;
        abnormal_all_pro=0;
        temp_num=0;
        ave_heat_duration=0;
        abnormal_heat_pro=0;
        temp_score=0;
      }
      console.log(template);
      return averageData;
      
    },
    search(){
      ave_heat_duration=[];
      ave_un_sable_duration=[];
      totalTime=[];
      abnormal_stable_temp_pro=[];
      totalNum=[];
      abnormal_all_pro=[];
      province=[];
      this.radio='1';
      this.getCitycode();
      console.log(citycode)
      request.post('tableStoreDates/page/list', null, {
        params:
        { 
          pagetype:'locationsummary',
          month:this.model[0],
          month1:this.model[1],
          type1:citycode,
        },
      }).then(({ data: response }) => {
        // this.tableData=response.data.data;
        this.tableData=this.tableAddTreeprops(response.data.data,response.data.province,response.data.province1);
        if(this.tableData[0]==undefined){
          this.tableData=[{data:''}]
        }
        setTimeout(() => {
          this.$refs.filterTable.sort('temp_score','ascending')
        }, 10);
        this.tableData1=this.tableData;
        for(var i=0;i<this.tableData.length;i++){
          // this.tableData[i].data=response.data.province[i];
          totalTime[i]=this.tableData[i].ave_unstable_proportion;
          ave_un_sable_duration[i]=this.time2sec(this.tableData[i].ave_un_sable_duration);
          ave_heat_duration[i]=this.time2sec(this.tableData[i].ave_heat_duration);
          abnormal_stable_temp_pro[i]=this.tableData[i].abnormal_stable_temp_pro;
          totalNum[i]=this.tableData[i].temp_num;
          abnormal_all_pro[i]=this.tableData[i].abnormal_all_pro;
          province[i]=this.tableData[i].data
          temp_score[i]=this.tableData[i].temp_score
        }
        this.temp_score=temp_score;
        this.totalTime=totalTime;
        this.ave_heat_duration=ave_heat_duration;
        this.ave_un_sable_duration=ave_un_sable_duration;
        this.abnormal_stable_temp_pro=abnormal_stable_temp_pro;
        this.totalNum=totalNum;
        this.abnormal_all_pro=abnormal_all_pro;
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
        }
      },
      legend: {
        data: ['温度评估分数','恒温异常模式占比','不恒温时长占比','加热时长/台','不恒温时长/台','加热+恒温异常模式占比','温度有效片段'],
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
            name: '占比%',
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
      series: [
   {
            name: '温度评估分数',
            type: 'bar',
            yAxisIndex: 0,
            label: {
                show: true,
                position: 'top',
                formatter: '{c}分',
                // formatter: function(params){return Math.floor(params.value/3600)+'h'+Math.floor(params.value%3600/60)+'m'+Math.floor(params.value%3600%60)+'s'},
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
            data: this.temp_score,
        },


        {
            name: '恒温异常模式占比',
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
            data: this.abnormal_stable_temp_pro,
        },
        {
            name: '不恒温时长占比',
            type: 'bar',
            yAxisIndex: 0,
            label: {
                show: true,
                position: 'top',
                formatter: '{c}%',
                // formatter: function(params){return Math.floor(params.value/3600)+'h'+Math.floor(params.value%3600/60)+'m'+Math.floor(params.value%3600%60)+'s'},
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
            name: '加热时长/台',
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
            data: this.ave_heat_duration,
        },
        {
            name: '不恒温时长/台',
            type: 'bar',
            yAxisIndex: 1,
            label: {
               show: true,
                position: 'top',
                formatter: '{c}s',
                // formatter: function(params){return Math.floor(params.value/3600)+'h'+Math.floor(params.value%3600/60)+'m'+Math.floor(params.value%3600%60)+'s'},
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
            data: this.ave_un_sable_duration,
        },
        {
            name: '加热+恒温异常模式占比',
            type: 'bar',
            yAxisIndex: 0,
            label: {
                show: true,
                position: 'top',
                formatter: '{c}%',
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
            data: this.abnormal_all_pro,
        },
        {
            name: '温度有效片段',
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
  },
  watch: {},
  created() {
    this.axios.get( "data/chinacity copy.json").then((response)=>{
      this.options=response.data;
      this.options=JSON.parse(JSON.stringify(this.options)); 
      //console.log(this.options);
    }).catch((response)=>{
      //console.log(response);
    });
    allOption=[];
    request.post('tableStoreDates/page/list', null, {
        params:
        { 
          pagetype:'selectAll',
        },
      }).then(({ data: response }) => {
        for(var i=0; i<response.data.province_code.length;i++){
          allOption[i]=new Array();
          allOption[i][0]=response.data.province_code[i];
          allOption[i][1]=response.data.city_code[i];                                                   
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
        // this.model=["2021-01","2021-06"];
        if(this.$route.query.flag=='1'){
          this.allSelect=false;
          this.model[0]=this.$route.query.time;
          this.model[1]=this.$route.query.time1;
                console.log(typeof this.$route.query.province)
          var a=0;
          if((typeof this.$route.query.province)==(typeof '')){
            for(var i=0;i<allOption.length;i++){
              if(allOption[i][0]==this.$route.query.province){
                optionLastpage.splice(a++,0,allOption[i])
                console.log(optionLastpage)
              }
            }
          }else{
            for(var j=0;j<this.$route.query.province.length;j++){
              for(var i=0;i<allOption.length;i++){
                if(allOption[i][0]==this.$route.query.province[j]){
                  optionLastpage.splice(a++,0,allOption[i])
                  console.log(optionLastpage)
                }
              }
            }
          }
          this.value=optionLastpage;
          // this.$route.query.flag=='0';
        }   
        setTimeout(() => {
        this.search();
        }, 400)
      }).catch((err) => {
        this.$message.error(err);
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

//  /deep/ .el-cascader__tags { 
//    flex-wrap: unset; 
//    overflow: auto;
//  }
// .el-cascader {
// min-height: calc(100% - 150px);
// // height: calc(100% - 450px);
// // margin-top:20px;
// height: 40px;
// overflow-y: auto;
// }
/deep/ .el-cascader__tags {
      width: 100%;
      // display: inline-block;
      max-width: 370px;
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
