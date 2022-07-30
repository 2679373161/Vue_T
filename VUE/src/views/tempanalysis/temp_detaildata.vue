<template>
  <!-- <h3>您好 <span v-if="userInfo">{{userInfo.name}}</span></h3> -->
  <div>
    <div class="search" align="center">
    <!-- <el-cascader
    v-model="value"
    :options="options"
    @change="handleChange"
    placeholder="请选择地区/型号/设备"
    style="width:350px; margin-right:50px;">
    </el-cascader> -->
    <span>地区：</span>
    <el-cascader
     v-model="value"
     ref="cascaderAddr"
    :options="options"
     @change="handleChange"
      placeholder="请选择地区"
     style="width:200px;margin-left:0;"
    clearable></el-cascader>
    <span style="margin-left:30px">型号/设备：</span>
    <el-cascader
     v-model="value2"
     ref="cascaderAddr1"
    :options="options1"
     placeholder="请选择型号/设备"
     style="width:250px;margin-left:0"
    clearable></el-cascader>
    <span style="margin-left:30px">月份：</span>
      <el-date-picker
      style="width:200px;margin-left:0"
      id="time"
      v-model="c"
      type="month"
     placeholder="选择月"
      format="yyyy-MM"
      value-format="yyyy-MM">
    </el-date-picker>
    <el-button type="primary" @click="search">查询</el-button>
    </div>
     
     <h4 style="margin-top: 20px;"><strong>当月每日数据信息情况</strong></h4>
     <div id='myChart1'>
    </div>
  </div>
</template>
<script>
var month=['1月', '2月', '3月', '4月', '5月', '6月','7月','8月','9月','10月','11月','12月'];

import { mapState } from 'vuex';
import request from '@/utils/request';
import * as echarts from 'echarts';

var option;
var cellSize = [80, 80];
var pieRadius = 30;
var stable_proportion=[];
var un_stable_proportion=[];
function Month2Time(months){
       var timelow;
          var timehigh;
     var dt=new Date(months)
        dt.setHours(0);
         var year = dt.getFullYear(); //得到年份
       var month = dt.getMonth(); //得到月份
       var date = dt.getDate(); //得到日期     
       month = month + 1;
      month = month.toString().padStart(2, "0");
       date = date.toString().padStart(2, "0");
      timelow = `${year}-${month}-${date}`;


       dt.setTime(dt.setMonth(dt.getMonth()+1));
        var year2 = dt.getFullYear(); //得到年份
       var month2 = dt.getMonth(); //得到月份
        var date2 = dt.getDate(); //得到日期  
        month2 = month2 + 1;
         month2= month2.toString().padStart(2, "0");
       date2 = date2.toString().padStart(2, "0");
       var time1=`${year2}-${month2}-${date2}`
       dt.setDate(0)

        var year1 = dt.getFullYear(); //得到年份
       var month1 = dt.getMonth(); //得到月份
        var date1 = dt.getDate(); //得到日期  
        month1 = month1 + 1;
         month1 = month1.toString().padStart(2, "0");
       date1 = date1.toString().padStart(2, "0");
       var timehigh=`${year1}-${month1}-${date1}`
      var mon=new Array();
       mon[0]=timelow
       mon[1]=timehigh
       mon[2]=time1;
     //  console.log(mon)
      return mon;

    };
function getVirtulData(c) {
  
    var date = +echarts.number.parseDate(Month2Time(c)[0]);
    var end = +echarts.number.parseDate(Month2Time(c)[2]);
    var dayTime = 3600 * 24 * 1000;
    var data = [];
    for (var time = date; time < end; time += dayTime) {
        data.push([
            echarts.format.formatTime('yyyy-MM-dd', time),
           Math.floor(Math.random() * 10000)
        ]);
    }
   // console.log(data)
    return data;
}

function getPieSeries(scatterData, chart) {
    return scatterData.map(function (item, index) {
       //console.log(index)
        var center = chart.convertToPixel('calendar', item);
      // console.log(center)
        // var colorselect=0
        // if(stable_proportion[index]==0&&un_stable_proportion[index]==0)
        // {
        //       colorselect=1
        // }
        return {
            id: index + 'pie',
            type: 'pie',
            center: center,
            label: {
                normal: {
                    formatter: '{d}%',
                    position: 'inside'
                }
            },
    //           color:['#00ff55', '#f10303'],
    //         legend: {
    //     data: ['正常','不正常'],
    //     bottom: 20,
    //   //  color:['#00ff55', '#f10303'],

    // },
        
           // color:['#00ff55', '#f10303','#000'],
             itemStyle:{
              
              //  colorselect:1,
            //   color:['#00ff55', '#f10303'],
             color: function(colors) {
                var colorList = [
            '#00ff55', '#f10303', '#808080','#808080','#DCDCDC','#FF9393'
            ];
              //  if(colorselect==1){
              
              //    return colorList[3]
              //  }else{

                 return colorList[colors.dataIndex]
              //  }
           
           
        }

             },
            radius: pieRadius,
            data: dat(stable_proportion[index],un_stable_proportion[index]),
            // [
            //     {name: '稳定', value: Number(stable_proportion[index])},
            //     {name: '不稳定', value: Number(un_stable_proportion[index])},
            // ],
        };
    });
}

function dat(a,b){
  if(a==0&&b==0){
    return [{name: '稳定', value: null},{name: '不稳定', value: null},{name: '无数据', value: 0}]
  }else {
    return [{name: '稳定', value: Number(a)},{name: '不稳定', value: Number(b)},{name: '无数据', value: null}]
  }
}

function getPieSeriesUpdate(scatterData, chart) {
    return scatterData.map(function (item, index) {
        var center = chart.convertToPixel('calendar', item);
        return {
            id: index + 'pie',
            center: center
        };
    });
}

var scatterData = [];
export default {
  computed: mapState({
    userInfo: (state) => state.userModule.userInfo,
  }),
  data() {
    return {
        options: [],
        options1:[],
        value2:[],
        value:[],
        value1: ["2021-01","2021-12"],
        type:"",
        c:'',
        city:this.$route.query.city,
        cityname:this.$route.query.cityname,
        map:''
    };
  },
  mounted() {
     
  },
  methods: {
    handleChange(value){
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
                              children:[]
                              
            }
        }
            for(var i=0;i<response.data.devid.length;i++){
                
                j=response.data.devtype.indexOf(response.data.total[i])
               this.options1[j].children[ this.options1[j].children.length]={
                                                                label:response.data.devid[i],
                              value:response.data.devid[i]

               }
                           
            }
       // console.log(this.options5)
       this.options1=JSON.parse(JSON.stringify(this.options1)); 
      //console.log(response.data.total)
      }).catch((err) => {
        this.$message.error(err);
        // console.log(err);
      });


    },
    Month2Time(months){
       var timelow;
          var timehigh;
     var dt=new Date(months)
        dt.setHours(0);
         var year = dt.getFullYear(); //得到年份
       var month = dt.getMonth(); //得到月份
       var date = dt.getDate(); //得到日期   
       month = month + 1;  
      month = month.toString().padStart(2, "0");
       date = date.toString().padStart(2, "0");

      timelow = `${year}-${month}-${date}`;

        
       dt.setTime(dt.setMonth(dt.getMonth()+1));
        var year2 = dt.getFullYear(); //得到年份
       var month2 = dt.getMonth(); //得到月份
        var date2 = dt.getDate(); //得到日期  
         month2= month2.toString().padStart(2, "0");
       date2 = date2.toString().padStart(2, "0");
       var time1=`${year2}-${month2}-${date2}`
       dt.setDate(0)

        var year1 = dt.getFullYear(); //得到年份
       var month1 = dt.getMonth(); //得到月份
        var date1 = dt.getDate(); //得到日期
        month1 = month1 + 1;  
         month1 = month1.toString().padStart(2, "0");
       date1 = date1.toString().padStart(2, "0");
       var timehigh=`${year1}-${month1}-${date1}`
        console.log(Number(date1))
      var mon=new Array();
       mon[0]=timelow
       mon[1]=timehigh
       mon[2]=time1;
       mon[3]=Number(date1)
      return mon;

    },
    drawTable(){
     const myChart = this.$echarts.init(document.getElementById('myChart1'));
     this.map=this.$echarts.init(document.getElementById('myChart1'));
     option = {
    tooltip : {},
    // color:['#00ff55', '#f10303'],
    legend: {
        data: [{name:'稳定', textStyle:{color:'black'}},{name:'不稳定',textStyle:{color:'black'}},{name:'无数据',textStyle:{color:'black'}}],
        bottom: 20,
        // itemStyle:{

        // //  color:['#00ff55' ,'#f10303']
        // }
    },
   
    calendar: {
        top: 'middle',
        left: 'center',
        orient: 'vertical',
        cellSize: cellSize,
        yearLabel: {
            show: true,
            fontSize: 30
        },
        dayLabel: {
            margin: 10,
            firstDay: 1,
            textStyle: {
            color: "#000",
            fontSize: 15
    },
            nameMap: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
        },
        monthLabel: {
           position: 'start',
            nameMap:"cn",
            show: true,
            fontSize: 20
        },
        range: [this.c]
    },
    series: [{
        id: 'label',
        type: 'scatter',
        coordinateSystem: 'calendar',
        symbolSize: 1,
        label: {
            show: true,
            color:"#000",
            formatter: function (params) {
                return echarts.format.formatTime('dd', params.value[0]);
            },
            offset: [-cellSize[0] / 2 + 10, -cellSize[1] / 2 + 10],
            fontSize: 14
        },
        data: scatterData
    }],
    
    
};
var pieInitialized;
setTimeout(function () {
    pieInitialized = true;
    myChart.setOption({
        series: getPieSeries(scatterData, myChart),
        
     
    });
    //  console.log(myChart.getOption())
    // console.log(option)
}, 100);
 // console.log(option)
// app.onresize = function () {
//     if (pieInitialized) {
    
//         myChart.setOption({
//             series: getPieSeriesUpdate(scatterData, myChart),
//              legend: {
//         data: ['正常', '不正常'],
//         bottom: 20,
//     },
//         });
//     }
// };
const _this=this;
 myChart.on('click',function (params) {
   
 
     _this.daydata(params.seriesIndex);

       
	});
  
    
 myChart.setOption(option,true);

    },
    search(){
      scatterData=[];
      stable_proportion=[]
      un_stable_proportion=[]
      //this.map.clear();
        scatterData = getVirtulData(this.c);
  var mon=this.Month2Time(this.c)
      request.post('tableStoreDates/page/list', null, {
        params:
        { 
          pagetype:'localized_vue',
          category: "month",
          month:mon[0],
          month1:mon[1],
          city:this.value[1],
          dev_id: this.value2[1]

        },
      }).then(({ data: response }) => {
   
   
    var j=0
    var mondate=new Date(mon[0])
     //console.log(response.data.time_date[0])
   // console.log(mondate)
    
    //console.log(mon[3])
   // console.log(Date(response.data.time_date[j]))
    
    for(var i=0;i<mon[3];i++)
    {
         var ji=new Date(response.data.time_date[j])
         
        
       if((mondate-ji)==0){
        // console.log(i)
          var stable=parseFloat(100-Number(response.data.un_stable_proportion[j])).toFixed(2);
        var un_stable=parseFloat(Number(response.data.un_stable_proportion[j])).toFixed(2);
         stable_proportion[i]=stable
          un_stable_proportion[i]=un_stable;
         j++
       }else{
           stable_proportion[i]=0
          un_stable_proportion[i]=0;

       }
          mondate.setTime(mondate.setDate(mondate.getDate()+1));

    }
    
      this.drawTable();
      }).catch((err) => {
        this.$message.error(err);
     
      });
     
    },
    daydata(day){

 month = day.toString().padStart(2, "0");
var day1=this.c+"-"+month;
//console.log(day1)
  let routeData = this.$router.resolve({
     path:'DateList',
    
  //  name:'flow',
 query: {
   city:this.value[1],
   name1:this.value2[0],
   id: this.value2[1],
   month:day1,
   cityname:this.cityname
 }
});
 window.open(routeData.href);

    },
  },
  watch: {},
  created() {
    var mon
    var city
    var dev_id
    this.axios.get( "data/chinacity copy.json").then((response)=>{
      this.options=response.data;
      this.options=JSON.parse(JSON.stringify(this.options)); 
      var provincenum=this.$route.query.city;
      if(provincenum===undefined){
        this.value=[this.options[0].value,this.options[0].children[0].value]
        this.handleChange(this.value)
        setTimeout(() => {
          this.value2=[this.options1[0].value,this.options1[0].children[0].value]
          // this.value2=JSON.parse(JSON.stringify(this.value2)); 
          this.c="2021-01"
          this.search()
        }, 100);
      }else{
        provincenum=provincenum.slice(0,2)
        this.value[0]=provincenum+'0000';
        this.value[1]=this.$route.query.city
        this.handleChange(this.value)
        this.value2[0]=this.$route.query.name1
        this.value2[1]=this.$route.query.id
        this.c=this.$route.query.month
        this.search()
      }
    }).catch((response)=>{
    })
  //   request.post('tableStoreDates/page/list', null, {
  //       params:
  //       { 
  //         pagetype:'localized_vue',
  //         category: "month",
  //         month:mon[0],
  //         month1:mon[1],
  //         city:city,
  //         dev_id: dev_id
  //       },
  //     }).then(({ data: response }) => {
  //   var j=0
  //   var mondate=new Date(mon[0])
  //    //console.log(response.data.time_date[0])
  //  // console.log(mondate)
    
  //   //console.log(mon[3])
  //  // console.log(Date(response.data.time_date[j]))
    
  //   for(var i=0;i<mon[3];i++)
  //   {
  //        var ji=new Date(response.data.time_date[j])
         
        
  //      if((mondate-ji)==0){
  //       // console.log(i)
  //       var stable=parseFloat(100-Number(response.data.un_stable_proportion[j])).toFixed(2);
  //       var un_stable=parseFloat(Number(response.data.un_stable_proportion[j])).toFixed(2);
  //        stable_proportion[i]=stable
  //         un_stable_proportion[i]=un_stable;
  //        j++
  //      }else{
  //          stable_proportion[i]=0
  //         un_stable_proportion[i]=0;

  //      }
  //         mondate.setTime(mondate.setDate(mondate.getDate()+1));

  //   }
   
     
  //    setTimeout(() => {
  //        this.drawTable();
  //    }, 100);
  //     }).catch((err) => {
  //       this.$message.error(err);
  //       // console.log(err);
  //     });

    
  
 
  },

};
</script>

 <style  lang="scss"  scoped>
.search button{
  margin-left: 50px;
}

.search{
  margin-left: 0px;
  margin-bottom: 20px;
  margin-top: 20px;
}

h2 {
  text-align: center;
  padding: 30px;
  font-size: 18px;
}

#myChart1 {
  top: 0px;
  width: 1200px;
  height: 700px;
  margin: 0 auto;
}
</style>


