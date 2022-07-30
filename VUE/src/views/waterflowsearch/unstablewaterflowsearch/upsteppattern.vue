<template>
<div>
 <div class="search" align="center" style="margin-top:20px;">
   <el-form ref="form" class="ItemInfo" :model="equipment_info" label-width="80px" :inline="true">
    <span>月份：</span>
    <el-date-picker
      id="time"
      style="width:200px;margin-left:0"
      v-model="timeframe"
      type="month"
      align="right"
     placeholder="选择月"
      format="yyyy-MM"
      value-format="yyyy-MM">
    </el-date-picker>

    <el-button type="primary" @click="search" style="margin-left:50px">查询</el-button>
    <span style="margin-left:30px;">选择显示模式：</span>
    <el-select v-model="value"  @change="Changestate" style="width:150px; margin-right:30px;" placeholder="请选择" >
      <el-option
        v-for="item in options1"
        :key="item.value"
        :label="item.label"
        :value="item.value"
       >
      </el-option>
    </el-select>
<el-form-item class="ItemInfoTime" style="margin-left:10px;">
    <download-excel
      :fields = "json_fields"
      :data="tableData1"
      :before-generate = "startDownload"
      :before-finish = "finishDownload"
      name="listdata.xls"
      type="xls">
      <el-button>导出Excel</el-button>
    </download-excel>
</el-form-item>
</el-form>
    </div>
      <div id="map"></div>
      <el-table :data="tableData1" border style="width: 100%" align="center"  :row-class-name="tableRowClassName1" :cell-style="cellStyle" >
      <el-table-column  prop="data" align="center"  label="地区"></el-table-column>
      <el-table-column  prop="water_score" align="center" sortable label="水流量评分"></el-table-column>
      <el-table-column  prop="equipment_num" align="center" sortable label="设备数"></el-table-column>
      <el-table-column  prop="un_stable_proportion" align="center"  sortable label="不稳定占比%"></el-table-column>
      <el-table-column  prop="average_time" align="center"  sortable label="平均用水时长"></el-table-column>
      </el-table>
      
</div>
</template>

<style>
  .el-table .warning-row {
    background: rgb(255, 0, 0);
  }

  .el-table .success-row {
    background: #59f306;
  }
</style>

<script>
import echarts from 'echarts'
import china from 'echarts/map/json/china.json'
import axios from 'axios'
import request from '@/utils/request';
import JsonExcel from 'vue-json-excel';

echarts.registerMap('china', china)
  var data = [
      ];
       var cityid={};
       var provincename=[];
       var cityname=[];
        var dataprovince = [];
          var geoid={};
  var provinces = ['shanghai', 'hebei', 'shanxi', 'neimenggu', 'liaoning', 'jilin', 'heilongjiang', 'jiangsu', 'zhejiang', 'anhui', 'fujian', 'jiangxi', 'shandong', 'henan', 'hubei', 'hunan', 'guangdong', 'guangxi', 'hainan', 'sichuan', 'guizhou', 'yunnan', 'xizang', 'shanxi1', 'gansu', 'qinghai', 'ningxia', 'xinjiang', 'beijing', 'tianjin', 'chongqing', 'xianggang', 'aomen', 'taiwan']
  var provincesText = ['上海', '河北', '山西', '内蒙古', '辽宁', '吉林', '黑龙江', '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南', '湖北', '湖南', '广东', '广西', '海南', '四川', '贵州', '云南', '西藏', '陕西', '甘肃', '青海', '宁夏', '新疆', '北京', '天津', '重庆', '香港', '澳门', '台湾']

export default {
  components: {
      'download-excel': JsonExcel
    },

  created () {
    // setTimeout(() => {
    //     this.showChinaMap();
       
    //     }, 100)
      dataprovince=[];
      data=[];
      this.data=[]
      // request.post('tableStoreDates/page/list', null, {
      //   params:
      //   { 
      //     pagetype: 'datafeatures',
      //   },
      // }).then(({ data: response }) => {
      //   console.log(response.data.data)
      //   this.timeframe=response.data.lastmonth
      // }).catch((err) => {
      // });
      
        request.post('tableStoreDates/page/list', null, {
        params:
        { 
          pagetype:'localized_vue',
          flag1:1
        //  category: this.tableChoose(),
          // month:this.timeframe,
         // type1:this.value1,
        },
      }).then(({ data: response }) => {
     data=[];
     this.timeframe=response.data.month1
     provincename=response.data.province;
     this.tableData1=response.data.data
    // var numflag=''
     for(var i=0;i<response.data.data.length;i++){

      this.tableData1[i].data=response.data.province[i];
      this.tableData1[i].un_stable_proportion=Number(this.tableData1[i].un_stable_proportion);
      this.tableData1[i].stable_proportion=parseFloat(100-Number(this.tableData1[i].un_stable_proportion)).toFixed(2);;
     // numflag=response.data.un_stable_proportion[i].slice(0,-2);
       data[i]={
         name: response.data.province[i],
         value: Number(response.data.un_stable_proportion[i])
       }
     }
   // console.log( data)
     if(this.value=="3"){
           var j=0;
       for(var i=0;i<data.length;i++)
       {
          if(data[i].value>50){

            this.data[j]={
                name: data[i].name,
                value: data[i].value

            }
            j++
          }
       }
     }else if(this.value=="2"){

        var j=0;
       for(var i=0;i<data.length;i++)
       {
          if(data[i].value<50){

            this.data[j]={
                name: data[i].name,
                value: data[i].value

            }
            j++
          }
       }


     }else{

   for(var i=0;i<data.length;i++)
       {
            this.data[i]={
                name: data[i].name,
                value: data[i].value
            }
       }
     }
    setTimeout(() => {
      this.map1();
    }, 200)
      }).catch((err) => {
      });
  },

  data () {
    return {
      map: {},
       timeframe: '',    //时间范围
     
      tableData1:[],
      flag1:false,
      options1: [{
          value: '1',
          label: '显示全部'
        }, {
          value: '2',
          label: '显示较为稳定'
        }, {
          value: '3',
          label: '显示较不稳定'
        }],
        value: '1',
        data:[],
        dataprovince:[],
        city:'',
        json_fields: {
          '地区': 'data',
          '水流量分数': 'water_score',
          '设备数': 'equipment_num',
          '不稳定占比%': 'un_stable_proportion',
          '平均用水时长': 'average_time',
          },

    }
  },
  props: {},
  methods: {
    Changestate(){
   var mapname=this.map._model.option.geo[0].map
      if(mapname=="china")
      {
        this.data=[];
 if(this.value=="3"){
           var j=0;
       for(var i=0;i<data.length;i++)
       {
          if(data[i].value>50){

            this.data[j]={
                name: data[i].name,
                value: data[i].value

            }
            j++
          }
       }
     }else if(this.value=="2"){
         var j=0;
       for(var i=0;i<data.length;i++)
       {
          if(data[i].value<50){

            this.data[j]={
                name: data[i].name,
                value: data[i].value

            }
            j++
          }
       }

     }else{

        for(var i=0;i<data.length;i++)
       {
          

            this.data[i]={
                name: data[i].name,
                value: data[i].value

            }
           
        
       }
     }

   //console.log(data)
   this.map1();


      }else{

          this.dataprovince=[];
         if(this.value=="3"){
           var j=0;
       for(var i=0;i<dataprovince.length;i++)
       {
          if(dataprovince[i].value>50){

            this.dataprovince[j]={
                name: dataprovince[i].name,
                value: dataprovince[i].value

            }
            j++
          }
       }
     }else if(this.value=="2"){
         var j=0;
       for(var i=0;i<dataprovince.length;i++)
       {
          if(dataprovince[i].value<50){

            this.dataprovince[j]={
                name: dataprovince[i].name,
                value: dataprovince[i].value

            }
            j++
          }
       }

     }else{

        for(var i=0;i<dataprovince.length;i++)
       {
          

            this.dataprovince[i]={
                name: dataprovince[i].name,
                value: dataprovince[i].value

            }
           
        
       }
     //  console.log(this.dataprovince)
     }
     this.getProvinceMapOpt (mapname);
      }
      
    },
    startDownload(){
        let self = this
        if(self.tableData1.length==0) {
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
       var mapname=this.map._model.option.geo[0].map
       if(mapname=="china"){
           dataprovince=[];
      data=[];
      this.data=[]
     request.post('tableStoreDates/page/list', null, {
        params:
        { 
          pagetype:'localized_vue',
        //  category: this.tableChoose(),
          month:this.timeframe,
         // type1:this.value1,
        },
      }).then(({ data: response }) => {
     data=[];
     provincename=response.data.province;
     this.tableData1=response.data.data
    // var numflag=''
     for(var i=0;i<response.data.data.length;i++){

      this.tableData1[i].data=response.data.province[i],
      this.tableData1[i].un_stable_proportion=Number(this.tableData1[i].un_stable_proportion),
     this.tableData1[i].stable_proportion=parseFloat(100-Number(this.tableData1[i].un_stable_proportion)).toFixed(2);;
     // numflag=response.data.un_stable_proportion[i].slice(0,-2);
       data[i]={
         name: response.data.province[i],
         value: Number(response.data.un_stable_proportion[i])
       }
     }
   // console.log( data)
  //    if(this.value=="3"){
  //          var j=0;
  //      for(var i=0;i<data.length;i++)
  //      {
  //         if(data[i].value>50){

  //           this.data[j]={
  //               name: data[i].name,
  //               value: data[i].value

  //           }
  //           j++
  //         }
  //      }
  //    }else if(this.value=="2"){

  //       var j=0;
  //      for(var i=0;i<data.length;i++)
  //      {
  //         if(data[i].value<50){

  //           this.data[j]={
  //               name: data[i].name,
  //               value: data[i].value

  //           }
  //           j++
  //         }
  //      }


  //    }else{

  //  for(var i=0;i<data.length;i++)
  //      {
          

  //           this.data[i]={
  //               name: data[i].name,
  //               value: data[i].value

  //           }
           
          
  //      }



  //    }
       

  // // console.log(data)
  //  this.map1();
       this.Changestate();

    // console.log(this.map)
      }).catch((err) => {
        this.$message.error(err);
        // console.log(err);
      });
         
       }else{
         this.dataprovince=[]
         dataprovince=[]
       
               var num=provinces.indexOf(mapname)
               var name=provincesText[num]
           
        this.searchprovince(geoid[name])

  


       }
     
 


    },
    getNowTime() {
       var now = new Date();
       var year = now.getFullYear(); //得到年份
       var month = now.getMonth(); //得到月份
     //  var date = now.getDate(); //得到日期
       month = month + 1;
       month = month.toString().padStart(2, "0");
     //  date = date.toString().padStart(2, "0");
       var defaultDate = `${year}-${month}`;
       return defaultDate
   },
      tableRowClassName({row, rowIndex}) {
        if (row.y === 1) {
          return 'warning-row';
        } else if (row.y === 0) {
          return 'success-row';
        }
        return '';
      },
       tableRowClassName1({row, rowIndex}) {
        // if (row.un_stable_proportion > 50) {
        //   return 'warning-row';
        // } else if (row.un_stable_proportion < 50) {
        //   return 'success-row';
        // }
        // return '';
      
      },
      cellStyle(row,column,rowIndex,columnIndex){
        console.log(row)
        if(row.row.un_stable_proportion>50){
          return 'color:red'
        }
      },
        Month2Time(months){
         
     var dt=new Date(month)
        dt.setHours(0);
         var year = dt.getFullYear(); //得到年份
       var month = dt.getMonth(); //得到月份
       var date = dt.getDate(); //得到日期     
      month = month.toString().padStart(2, "0");
       date = date.toString().padStart(2, "0");
      timelow = `${year}-${month}-${date}`;


       dt.setTime(dt.setMonth(dt.getMonth()+1));
       dt.setDate(0)

        var year1 = dt.getFullYear(); //得到年份
       var month1 = dt.getMonth(); //得到月份
        var date1 = dt.getDate(); //得到日期  
         month1 = month1.toString().padStart(2, "0");
       date1 = date1.toString().padStart(2, "0");
       var timehigh=`${year1}-${month1}-${date1}`
      var mon=new Array();
       mon[0]=timelow
       mon[1]=timehigh
      return mon;

    },
      jumppage(city) {
       //console.log(row)
 //  var mon= this.Month2Time(this.timeframe)
  //  console.log(mon)
      let routeData = this.$router.resolve({
     path:'devicedata',
    
  //  name:'flow',
 query: {
    city: city,
   month:this.timeframe,
 }
});
 window.open(routeData.href);
      },
      
      sleep(){
        setTimeout(() => {
          this.search();
        }, 100);
      },
    getMapOpt (place) {
      const _this = this;
     
      var geoCoordMap = {};
      
      var mapFeatures = this.$echarts.getMap(place || 'china').geoJson.features;
      // myChart.hideLoading();
      mapFeatures.forEach(function(v) {
        // 地区名称
        var name = v.properties.name;
        // 地区经纬度
      //  console.log(v)
      cityid[name]=v.id;
        geoCoordMap[name] = v.properties.cp;
      });
      var convertData = function(data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
          var geoCoord = geoCoordMap[data[i].name];
          if (geoCoord) {
            res.push({
              name: data[i].name,
              value: geoCoord.concat(data[i].value)
            });
          }
        }
        return res;
      };

      const option = {
      backgroundColor: '#fff', //地图背景颜色
      //以下是地图标题，我在此处设空，需要的可以自己加上
      title: {
          text: '',
          subtext: '',
          left: 'center'
        },
        //以下是地图右侧“还原”“下载”工具框
        toolbox: {
            show: true,
            orient: 'vertical',
            left: 'right',
            top: 'center',
            feature: {
                restore: {},
                saveAsImage: {},
                myTool:{
                            show : true,
                            title : '返回上级',
                            icon : 'path://M920.4 390.1c-17.6-41.5-42.9-78.8-74.9-110.9s-69.4-57.3-110.9-74.9c-43-18.3-88.6-27.6-135.6-27.6H147.2L254.3 69.6c7.8-7.8 7.8-20.5 0-28.3s-20.5-7.8-28.3 0L87.4 179.9c-5.5 3.6-9.1 9.7-9.1 16.8 0 7 3.6 13.2 9.1 16.8L226 352.1c7.8 7.8 20.5 7.8 28.3 0s7.8-20.5 0-28.3L147.2 216.7H599c170.4 0 309 138.6 309 309s-138.6 309-309 309H288.3c-11 0-20 9-20 20s9 20 20 20H599c46.9 0 92.5-9.3 135.6-27.6 41.5-17.6 78.8-42.9 110.9-74.9 32.1-32.1 57.3-69.4 74.9-110.9 18.3-43 27.6-88.6 27.6-135.6s-9.3-92.5-27.6-135.6z',
                            onclick : function (){
                              _this.map.clear();
                              _this.map1();
                              _this.sleep();
                            }
                }
            }
        },
        tooltip: {
          formatter: function(params) {
            for(var i=0;i<dataprovince.length;i++){
              if(dataprovince[i].name===params.name){return dataprovince[i].name+"<br/>不稳定占比："+dataprovince[i].value+"%"}
              
            }
            return params.name+"<br/>"+"无数据"
          }
        },    
      visualMap: {
          orient:"horizontal",
           bottom: 10,
            right: 'center',
            pieces: [
            {
                label: '0~20(稳定)',
                gt: 0,
                lte: 20,
                color: '#7AE24C'
            }, {
                label: '20~40(较稳定)',
                gt: 20,
                lte: 40,
                color: '#B1B93E'
            }, {
                label: '40~60(稍不稳定)',
                gt: 40,
                lte: 60,
                color: '#CC9533'
            }, {
                label: '60~80(较不稳定)',
                gt: 60,
                lte: 80,
                color: '#E26222'
            }, {
                label: '80~100(不稳定)',
                gt: 80,
                lte: 100,
                color: '#f10303'
            }],
        },
      geo: {
        map: place || 'china',
        label: {
            emphasis: {
                show: false
            },
            // 不需要显示地名可直接删除normal此项
            normal: {
              show: true, // 是否显示对应地名
              textStyle: {
                  color: 'rgba(0,0,0)'
              }
            }
        },
        roam: true,
        itemStyle: {
            normal: {
                areaColor: '#fff', //地图颜色
                borderColor: '#3B5077' //地图边线颜色
            },
            emphasis: {
                areaColor: '#B7DFED' //鼠标移入颜色
            }
        }
       },
       series: [
          {
            name: "散点",
            type: "scatter",
            coordinateSystem: "geo",
            data: this.dataprovince,
            symbolSize: function(val) {
              return val[2] / 10;
            },
            label: {
              normal: {
                formatter: "{b}",
                position: "right",
                show: false
              },
              emphasis: {
                show: true
              }
            },
            itemStyle: {
              normal: {
                color: "#05C3F9"
              }
            }
          },
          {
            type: "map",
            map: place || 'china',
            geoIndex: 0,
            aspectScale: 0.75, //长宽比
            showLegendSymbol: false, // 存在legend时显示
            label: {
              normal: {
                show: true
              },
              emphasis: {
                show: false,
                textStyle: {
                  color: "#fff"
                }
              }
            },
            roam: true,
            itemStyle: {
              normal: {
                areaColor: "#031525",
                borderColor: "#3B5077"
              },
              emphasis: {
                areaColor: "#2B91B7"
              }
            },
            animation: true,
            data:this.dataprovince
          },
        ]
      }
      return option
    },
    searchcity(value){
      cityname=[];
       this.tableData=[]
      request.post('tableStoreDates/page/list', null, {
        params:
        { 
          pagetype:'localized_vue',
          category: "city",
          month:this.timeframe,
          city:value,
        },
      }).then(({ data: response }) => {
     //data=[];
     cityname=response.data.province;
    // console.log(response.data.data)
   this.tableData=response.data.data;
       
     
      }).catch((err) => {
        this.$message.error(err);
        // console.log(err);
      });

    },
    searchprovince(value){

      dataprovince=[]
      this.dataprovince=[]
      request.post('tableStoreDates/page/list', null, {
        params:
        { 
          pagetype:'localized_vue',
          category: "province",
          month:this.timeframe,
          city:value,
        },
      }).then(({ data: response }) => {
    // data=[];
     this.tableData1=[]
    cityname=response.data.province;
    this.tableData=response.data.data1;
   // console.log(response.data.province)
    this.tableData1=response.data.data
     for(var i=0;i<response.data.data.length;i++){

      this.tableData1[i].data=response.data.province[i],
      this.tableData1[i].un_stable_proportion=Number(this.tableData1[i].un_stable_proportion),
      this.tableData1[i].stable_proportion=parseFloat(100-Number(this.tableData1[i].un_stable_proportion)).toFixed(2);;
       dataprovince[i]={
         name: response.data.province[i],
         value: Number(response.data.un_stable_proportion[i])
       }
     }
     
       this.Changestate();
        
     
      }).catch((err) => {
        this.$message.error(err);
        // console.log(err);
      });

    },
    
    // 显示各省地图，这里使用axios请求本地文件，provice文件夹存在的位置为public/province（旧版本是static）
    getProvinceMapOpt (provinceAlphabet) {
      axios.get('province/' + provinceAlphabet + '.json').then((s) => {
        echarts.registerMap(provinceAlphabet, s.data)
        const option = this.getMapOpt(provinceAlphabet)
        this.map.setOption(option, true)
        const _this=this
        this.map.on('click',function (params) {
          if(_this.map._model.option.geo[0].map!="china")
          {
             // _this.hide2(params.name);
            /// console.log(cityid[params.name])
            _this.jumppage(cityid[params.name])
         //  _this.searchcity(cityid[params.name])
          }
                 
	});
  
    
        
      })
    },
  
    
    map1(){
      var mapName = "china";
      var geoCoordMap = {};
    
     // console.log(this.data)
     // console.log(data)
          let myChart = this.$echarts.init(document.getElementById("map"));
        this.map = this.$echarts.init(document.getElementById("map"));
      // myChart.showLoading();
      var mapFeatures = this.$echarts.getMap(mapName).geoJson.features;
      // myChart.hideLoading();
      mapFeatures.forEach(function(v) {
        // 地区名称
      //  console.log(v)
        var name = v.properties.name;
        // 地区经纬度
        geoid[name]=v.id
        geoCoordMap[name] = v.properties.cp;
      });
    //  console.log(data);
    //  console.log(toolTipData);
      var max = 480,
        min = 9; // todo
      var maxSize4Pin = 100,
        minSize4Pin = 20;

      var convertData = function(data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
          var geoCoord = geoCoordMap[data[i].name];
          if (geoCoord) {
            res.push({
              name: data[i].name,
              value: geoCoord.concat(data[i].value)
            });
          }
        }
        return res;
      };
      var option = {
        tooltip: {
          formatter: function(params) {
            for(var i=0;i<data.length;i++){
              if(data[i].name===params.name){return data[i].name+"<br/>不稳定占比："+data[i].value+"%"}
              
            }
            return params.name+"<br/>"+"无数据"
//             console.log(params)
//             if (isNaN(params.value)) {
//               var  tool=params.name+"<br/>"+"无数据"
//               return tool
//             } else{
//                 var  tool=params.name+"<br/>不稳定占比："+params.value+"%"
//               return tool
//             }
          },
          // '{b0}<br/>不稳定占比: {c0}%',
          // function(params) {
          //   console.log(params);
          //   if (typeof params.value[2] == "undefined") {
          //     var toolTiphtml = "";
          //     for (var i = 0; i < toolTipData.length; i++) {
          //       if (params.name == toolTipData[i].name) {
          //         toolTiphtml += toolTipData[i].name + ":<br>";
          //         for (var j = 0; j < toolTipData[i].value.length; j++) {
          //           toolTiphtml +=
          //             toolTipData[i].value[j].name +
          //             ":" +
          //             toolTipData[i].value[j].value +
          //             "<br>";
          //         }
          //       }
          //     }
          //     console.log(toolTiphtml);
          //     // console.log(convertData(data))
          //     return toolTiphtml;
          //   } else {
          //     var toolTiphtml = "";
          //     for (var i = 0; i < toolTipData.length; i++) {
          //       if (params.name == toolTipData[i].name) {
          //         toolTiphtml += toolTipData[i].name + ":<br>";
          //         for (var j = 0; j < toolTipData[i].value.length; j++) {
          //           toolTiphtml +=
          //             toolTipData[i].value[j].name +
          //             ":" +
          //             toolTipData[i].value[j].value +
          //             "<br>";
          //         }
          //       }
          //     }
          //     console.log(toolTiphtml);
          //     // console.log(convertData(data))
          //     return toolTiphtml;
          //   }
          // }
        },
        visualMap: {
           orient:"horizontal",
           bottom: 10,
            right: 'center',
            pieces: [
            {
                label: '0~20(稳定)',
                gt: 0,
                lte: 20,
                color: '#7AE24C'
            }, {
                label: '20~40(较稳定)',
                gt: 20,
                lte: 40,
                color: '#B1B93E'
            }, {
                label: '40~60(稍不稳定)',
                gt: 40,
                lte: 60,
                color: '#CC9533'
            }, {
                label: '60~80(较不稳定)',
                gt: 60,
                lte: 80,
                color: '#E26222'
            }, {
                label: '80~100(不稳定)',
                gt: 80,
                lte: 100,
                color: '#f10303'
            }],
            // outOfRange: {
            //     color: '#00ff55'
            // }
        },
        geo: {
          show: true,
          map: mapName,
          label: {
            normal: {
              show: true
            },
            emphasis: {
              show: false
            }
          },
          roam: true,
          itemStyle: {
            normal: {
              areaColor: "#fff",
              borderColor: "#3B5077"
            },
            emphasis: {
              areaColor: "#B7DFED"
            }
          }
        },
        series: [
          // {
          //   name: "散点",
          //   type: "scatter",
          //   coordinateSystem: "geo",
          //   data: this.data,
          //   symbolSize: function(val) {
          //     return val[2] / 10;
          //   },
          //   label: {
          //     normal: {
          //       formatter: "{b}",
          //       position: "right",
          //       show: false
          //     },
          //     emphasis: {
          //       show: true
          //     }
          //   },
          //   itemStyle: {
          //     normal: {
          //       color: "#05C3F9"
          //     }
          //   }
          // },
          {
            type: "map",
            map: mapName,
            geoIndex: 0,
            aspectScale: 0.75, //长宽比
            showLegendSymbol: false, // 存在legend时显示
            label: {
              normal: {
                show: true
              },
              emphasis: {
                show: false,
                textStyle: {
                  color: "#fff"
                }
              }
            },
            roam: true,
            itemStyle: {
              normal: {
                areaColor: "#031525",
                borderColor: "#3B5077"
              },
              emphasis: {
                areaColor: "#2B91B7"
              }
            },
            animation: true,
            data: this.data
          },
          
        ]
      };
      myChart.setOption(option,true);
    
       const _this = this;
    myChart.off('click');      
    myChart.on('click',function (params) {
    //  console.log(params.name)
	    const provinceIndex = provincesText.findIndex(x => {
          // console.log(params.name)
          // console.log(x)
          return params.name === x
        })
          // console.log(provinceIndex)
         if (provinceIndex === -1) {return}
         const flag=provincename.findIndex(x => {
          // console.log(params.name)
          // console.log(x)
          return params.name === x
        })
// console.log(flag)
         if(flag!==-1){
            const provinceAlphabet = provinces[provinceIndex]

    // console.log(provincename)
          // console.log(geoid[params.name])
      if(provinceAlphabet==="shanghai"||provinceAlphabet==="beijing"||provinceAlphabet==="tianjin"||provinceAlphabet==="chongqing")
      {
         //  _this.flag1=true
          _this.searchprovince(geoid[params.name])
         // _this.hide2(params.name)
          _this.jumppage(geoid[params.name].slice(0,3)+'100')

      }else{
      //  _this.hide1()
        _this.getProvinceMapOpt(provinceAlphabet)
        setTimeout(() => {
             _this.searchprovince(geoid[params.name])
        }, 300);
     
       // _this.getProvinceMapOpt(provinceAlphabet)

      }


         }
      
       
	});
  
    }
  },
  
    mounted() {
      this.map1()
//     this.$nextTick(() => {
      
// this.map1();
//       /*获取地图数据*/
//     })
  },

  computed: {}

}
</script>


<style lang="scss" scoped>
  #map {
    width: 100%;
    height: 700px;
   // background-color: rgb(248, 6, 6);
  }
  .popover1 h4{
     display: inline-block;
  }
   .popover1 button{
     display: inline-block;
     
  }
</style>

