
<template>
	<div class="Bigdiv">
    <body>
    <div class="viewport">
        <div class="column">
            <div class="overview panel">
                <div class="inner">
                    <div class="item">
                        <h4>{{total}}</h4>
                        <span>
                     <i class="icon-dot" style="color: #006cff"></i>
                            迁移设备
                        </span>
                    </div>
                     <div class="item">
                        <h4>{{monitor_equipment}}</h4>
                        <span>
                            <i class="icon-dot" style="color: #6acca3"></i>
                            监控设备
                        </span>
                    </div>
                    <div class="item">
                        <h4>{{new_equipmentzheng}}</h4>
                        
                        <span v-if="new_equipment>=0">
                            <i class="icon-dot" style="color: #FF6900"></i>
                            异常新增
                        </span>
                                                <span v-if="new_equipment<0">
                            <i class="icon-dot" style="color: #FF6900"></i>
                            异常减少
                        </span>
                    </div>
                   
                    <div class="item">
                        <h4>{{abnormal_equipment}}</h4>
                        <span>
                            <i class="icon-dot" style="color: #ed3f35"></i>
                            异常设备
                        </span>
                    </div>
                </div>
            </div>
           
             <!--监控-->
            <div class="monitor panel">
                <div class="inner">
                    <div class="tabs">
                        <a href="javascript:;" data-index="0" class="active">异常设备监控</a>
                        <a href="javascript:;" data-index="1">故障设备监控</a>
                         <el-button type="text"  @click="jumppage"  size="medium" round>查看详情 </el-button>
                     <!--   <b > <el-button type="text"  @click="jumppage"  size="medium" round>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;跳转至设备片段查询
    </el-button></b> -->
                       
                    </div>
                    <div class="content" style="display: block;">
                        <div class="head">
                            <span class="col" style="margin-left:15px;">设备</span>
                            <span class="col" style="margin-left:-50px;">地址</span>
                            <span class="col"  style="margin-right:-50px;" >时间</span>
                            <span class="col"  style="margin-right:-49px;" >事件</span>
                        </div>
                        <div class="marquee-view">
                            <div class="marquee">
                                <div class="row" v-if="this.tableData.length>=1">
                                    <span class="col">{{this.tableData[0].equipment}}</span>
                                    <span class="col">{{this.tableData[0].city}}</span>
                                    <span class="col">{{this.tableData[0].start_time}}</span>
                                    <span class="col">{{this.tableData[0].event}}</span>
                                    <span class="icon-dot"></span>
                                </div>
                                
                                 <div class="row" v-if="this.tableData.length>=2">
                                    <span class="col">{{this.tableData[1].equipment}}</span>
                                    <span class="col">{{this.tableData[1].city}}</span>
                                    <span class="col">{{this.tableData[1].start_time}}</span>
                                    <span class="col">{{this.tableData[1].event}}</span>
                                    <span class="icon-dot"></span>
                                </div>
 <div class="row" v-if="this.tableData.length>=3">
                                    <span class="col">{{this.tableData[2].equipment}}</span>
                                    <span class="col">{{this.tableData[2].city}}</span>
                                    <span class="col">{{this.tableData[2].start_time}}</span>
                                    <span class="col">{{this.tableData[2].event}}</span>
                                    <span class="icon-dot"></span>
                                </div>
                                 <div class="row" v-if="this.tableData.length>=4">
                                    <span class="col">{{this.tableData[3].equipment}}</span>
                                    <span class="col">{{this.tableData[3].city}}</span>
                                    <span class="col">{{this.tableData[3].start_time}}</span>
                                    <span class="col">{{this.tableData[3].event}}</span>
                                    <span class="icon-dot"></span>
                                </div>
                                 <div class="row" v-if="this.tableData.length>=5">
                                    <span class="col">{{this.tableData[4].equipment}}</span>
                                    <span class="col">{{this.tableData[4].city}}</span>
                                    <span class="col">{{this.tableData[4].start_time}}</span>
                                    <span class="col">{{this.tableData[4].event}}</span>
                                    <span class="icon-dot"></span>
                                </div>
                                 <div class="row" v-if="this.tableData.length>=6">
                                    <span class="col">{{this.tableData[5].equipment}}</span>
                                    <span class="col">{{this.tableData[5].city}}</span>
                                    <span class="col">{{this.tableData[5].start_time}}</span>
                                    <span class="col">{{this.tableData[5].event}}</span>
                                    <span class="icon-dot"></span>
                                </div>
                                 <div class="row" v-if="this.tableData.length>=7" >
                                    <span class="col">{{this.tableData[6].equipment}}</span>
                                    <span class="col">{{this.tableData[6].city}}</span>
                                    <span class="col">{{this.tableData[6].start_time}}</span>
                                    <span class="col">{{this.tableData[6].event}}</span>
                                    <span class="icon-dot"></span>
                                </div> <div class="row" v-if="this.tableData.length>=8">
                                    <span class="col">{{this.tableData[7].equipment}}</span>
                                    <span class="col">{{this.tableData[7].city}}</span>
                                    <span class="col">{{this.tableData[7].start_time}}</span>
                                    <span class="col">{{this.tableData[7].event}}</span>
                                    <span class="icon-dot"></span>
                                </div>
 <div class="row" v-if="this.tableData.length>=9">
                                    <span class="col">{{this.tableData[8].equipment}}</span>
                                    <span class="col">{{this.tableData[8].city}}</span>
                                    <span class="col">{{this.tableData[8].start_time}}</span>
                                    <span class="col">{{this.tableData[8].event}}</span>
                                    <span class="icon-dot"></span>
                                </div>
 <div class="row" v-if="this.tableData.length>=10" >
                                    <span class="col">{{this.tableData[9].equipment}}</span>
                                    <span class="col">{{this.tableData[9].city}}</span>
                                    <span class="col">{{this.tableData[9].start_time}}</span>
                                    <span class="col">{{this.tableData[9].event}}</span>
                                    <span class="icon-dot"></span>
                                </div>


                            </div>
                        </div>
                    </div>
                    <div class="content">
                        <div class="head">
                                      <span class="col" style="margin-left:15px;">设备</span>
                            <span class="col" style="margin-left:-50px;">地址</span>
                            <span class="col"  style="margin-right:-50px;" >时间</span>
                            <span class="col"  style="margin-right:-49px;" >事件</span>
                        </div>
                        <div class="marquee-view">
                            <div class="marquee">
                                <div class="row" v-if="this.faultData.length>=1">
                                    <span class="col">{{this.faultData[0].equipment}}</span>
                                    <span class="col">{{this.faultData[0].city}}</span>
                                    <span class="col">{{this.faultData[0].timedate}}</span>
                                    <span class="col">{{this.faultData[0].event}}</span>
                                    <span class="icon-dot"></span>
                                </div>
                                
                                 <div class="row" v-if="this.tableData.length>=2">
                                    <span class="col">{{this.faultData[1].equipment}}</span>
                                    <span class="col">{{this.faultData[1].city}}</span>
                                    <span class="col">{{this.faultData[1].timedate}}</span>
                                    <span class="col">{{this.faultData[1].event}}</span>
                                    <span class="icon-dot"></span>
                                </div>
 <div class="row" v-if="this.tableData.length>=3">
                                    <span class="col">{{this.faultData[2].equipment}}</span>
                                    <span class="col">{{this.faultData[2].city}}</span>
                                    <span class="col">{{this.faultData[2].timedate}}</span>
                                    <span class="col">{{this.faultData[2].event}}</span>
                                    <span class="icon-dot"></span>
                                </div>
                                 <div class="row" v-if="this.tableData.length>=4">
                                    <span class="col">{{this.faultData[3].equipment}}</span>
                                    <span class="col">{{this.faultData[3].city}}</span>
                                    <span class="col">{{this.faultData[3].timedate}}</span>
                                    <span class="col">{{this.faultData[3].event}}</span>
                                    <span class="icon-dot"></span>
                                </div>
                                 <div class="row" v-if="this.tableData.length>=5">
                                    <span class="col">{{this.faultData[4].equipment}}</span>
                                    <span class="col">{{this.faultData[4].city}}</span>
                                    <span class="col">{{this.faultData[4].timedate}}</span>
                                    <span class="col">{{this.faultData[4].event}}</span>
                                    <span class="icon-dot"></span>
                                </div>
                                 <div class="row" v-if="this.tableData.length>=6">
                                      <span class="col">{{this.faultData[5].equipment}}</span>
                                    <span class="col">{{this.faultData[5].city}}</span>
                                    <span class="col">{{this.faultData[5].timedate}}</span>
                                    <span class="col">{{this.faultData[5].event}}</span>
                                    <span class="icon-dot"></span>
                                </div>
                                 <div class="row" v-if="this.tableData.length>=7" >
                                    <span class="col">{{this.faultData[6].equipment}}</span>
                                    <span class="col">{{this.faultData[6].city}}</span>
                                    <span class="col">{{this.faultData[6].timedate}}</span>
                                    <span class="col">{{this.faultData[6].event}}</span>
                                    <span class="icon-dot"></span>
                                </div> <div class="row" v-if="this.tableData.length>=8">
                                    <span class="col">{{this.faultData[7].equipment}}</span>
                                    <span class="col">{{this.faultData[7].city}}</span>
                                    <span class="col">{{this.faultData[7].timedate}}</span>
                                    <span class="col">{{this.faultData[7].event}}</span>
                                    <span class="icon-dot"></span>
                                </div>
 <div class="row" v-if="this.tableData.length>=9">
                                    <span class="col">{{this.faultData[8].equipment}}</span>
                                    <span class="col">{{this.faultData[8].city}}</span>
                                    <span class="col">{{this.faultData[8].timedate}}</span>
                                    <span class="col">{{this.faultData[8].event}}</span>
                                    <span class="icon-dot"></span>
                                </div>
 <div class="row" v-if="this.tableData.length>=10" >
                                    <span class="col">{{this.faultData[9].equipment}}</span>
                                    <span class="col">{{this.faultData[9].city}}</span>
                                    <span class="col">{{this.faultData[9].timedate}}</span>
                                    <span class="col">{{this.faultData[9].event}}</span>
                                    <span class="icon-dot"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--点位-->
            <div class="point panel">
                <div class="inner">
                    <h3>用水片段统计</h3>
                     <div class="filter">
                        <a href="javascript:;" data-key1="day7" class="active" >最近一周</a>
                        <a href="javascript:;" data-key1="day1" >昨日</a>
                    </div>
                    <div class="chart">
                        <div id="pie"></div>
                        <div class="data">
                            <div class="item">
                                <h4>{{this.abnormalcount[0]}}</h4>
                                <span>
                                    <i class="icon-dot" style="color: #ed3f35"></i>
                                    异常片段
                                </span>
                            </div>
                            <div class="item">
                                <h4>{{this.normalcount[0]}}</h4>
                                <span>
                                    <i class="icon-dot" style="color: 	#00FF7F"></i>
                                    正常片段
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 迁移数据 -->
            <div class="qianyi panel">
                <div class="inner">
                  <!--   <div class="chart"> -->
                      <h11 >迁移用时日趋势（最近一个月）</h11>
                        <div id="qianyiline"></div>
                    <!-- /div> -->
                </div>
            </div>
        </div>
        <div class="column">
                      <!-- 地图 -->
            <div class="map">
                <h3>
                        <span class="icon-cube"></span>
                    昨日全国每台设备平均指标
         <div class="overview panel">
                                 <div class="inner">
                    <div class="item" align="center"  >
                      
                        <h4>   {{avg_water_num}}</h4>
                        <span>
                     <i class="icon-dot" style="color: #006cff"></i>
                            有效用水片段
                        </span>
                    </div>
                     <div class="item" align="center">
                  <h4>{{avg_water_time}}</h4>
                        <span>
                            <i class="icon-dot" style="color: #6acca3"></i>
                             有效用水时间
                        </span>
                    </div>
                    <div class="item" align="center">
                        <h4>{{avg_heat_time}}</h4>
                        <span>
                            <i class="icon-dot" style="color: #FF6900"></i>
                             加热时间
                        </span>
                    </div>
                    <div class="item" align="center">
                        <h4>{{dev_avg_heat_score}}</h4>
                        <span>
                            <i class="icon-dot" style="color:	#FF0000"></i>
                             升温段得分
                        </span>
                    </div>
                     <div class="item" align="center">
                        <h4>{{dev_avg_stable_score}}</h4>
                        <span>
                            <i class="icon-dot" style="color: #00FF7F"></i>
                             恒温段得分
                        </span>
                    </div>


                   
  </div>

            </div>

             
                </h3>
                 <div class="filter">
                        <a href="javascript:;" data-map="day7" class="active" >最近一周</a>
                        <a href="javascript:;" data-map="day1" >昨日</a>
                 </div>
                <div class="chart">
                    <div id="geo"></div>
                </div>
            </div>
            <!-- 用户 -->
            <div class="users panel">
                <div class="inner">
                    <h3>全国各型号温度评分排名</h3>
                    <div class="filter">
                        <a href="javascript:;" data-user="day7" class="active" >最近一周</a>
                        <a href="javascript:;" data-user="day1" >昨日</a>
                    </div>
                    <div class="chart">
                        <div id="bar"></div>
                        <div class="data">
                            <div class="item">
                                 <h4>{{this.typetotal[0]}}</h4>
                                     <span>
                                    <i class="icon-dot" style="color: #ed3f35"></i>
                                    型号总量
                                </span>
                            </div>
                            <div class="item">
                                 <h4>{{this.typeavgscore[0]}}</h4>
                                 <span>
                                    <i class="icon-dot" style="color: #eacf19"></i>
                                    型号均分
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
              <!-- 服务器剩余空间日趋势 -->
            <div class="free panel">
                <div class="inner">
                    <h3>服务器剩余空间日趋势（最近一个月）</h3>
                   <div id="freespace"></div>
                </div>
            </div>
        </div>
<div class="column">
            <!-- 数据条数 -->
             <div class="order panel">
                <div class="inner">                 
  <h6  style="color: 	#FFFFFF;">自{{this.start_time1}}起更新至{{this.update_time}}</h6>
                    <!-- 数据 -->
                    <div class="data">
                        <div class="item">
                            <h4>{{this.day_data_sum}}万条</h4>
                            <span>
                                <i class="icon-dot" style="color: #ed3f35;"></i>
                                全国日数据总量
                            </span>
                        </div>
                        <div class="item">
                            <h4>{{this.total_data_sum}}百万条</h4>
                            <span>
                                <i class="icon-dot" style="color: #eacf19;"></i>
                                累计数据总量
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 销售额 -->
            <div class="sales panel">
                <div class="inner">
                    <div class="caption">
                        <h3>温度评分趋势</h3>
                        <a href="javascript:;" class="active" data-type="type">型号</a>
                        <a href="javascript:;" data-type="region">区域</a>
                        <a href="javascript:;" data-type="city">城市</a>
                        <a href="javascript:;" data-type="china">全国</a>
                    </div>
                    <div class="chart">
                        <div class="label">满分:100</div>
                        <div id="line"></div>
                    </div>
                </div>
            </div>
  <!-- 渠道 季度 -->
            <div class="wrap">
                <div class="channel panel">
                    <div class="inner">
                        <h3>评分分布</h3>
                        <div class="filter">
                        <a href="javascript:;" data-temp="day7" class="active" >最近一周</a>
                        <a href="javascript:;" data-temp="day1" >昨日</a>
                    </div>
                        <div class="data">
                            <div class="item">
                                <h4>{{this.One_hundred7}}</h4>
                                <span>
                                    <i class="icon-plane"></i>
                                    100
                                </span>
                            </div>
                            <div class="item">
                                <h4>{{this.Top_eight_five7}}</h4>
                                <span>
                                    <i class="icon-bag"></i>
                                    85-100
                                </span>
                            </div>
                        </div>
                        <div class="data">
                            <div class="item">
                                <h4>{{this.Under_eight_five7}}</h4>
                                <span>
                                    <i class="icon-train"></i>
                                    60-85
                                </span>
                            </div>
                            <div class="item">
                                <h4>{{this.Under_sixty7}}</h4>
                                <span>
                                    <i class="icon-bus"></i>
                                     ＜60
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 昨日剩余空间 -->
                <div class="freeday panel">
                    <div class="inner">
                        <h3>目前所剩空间</h3>
                        <div class="chart">
                            <div class="box">
                                <div id="gauge"></div>
                                <div class="label">{{parseInt(this.freespace)%120}}<small> %</small></div>
                            </div>
                            <div class="data">
                                <div class="item">
                                    <h4>{{this.freespace}}</h4>
                                    <span>
                                        <i class="icon-dot" style="color: #6acca3"></i>
                                        G
                                    </span>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
             <!-- 排行榜 -->
            <div class="top panel">
                <div class="inner">
                    <div class="all">
                        <h3>全国区域排名</h3>
                        <ul>
                            <li>
                                <i class="icon-cup1" style="color: #d93f36;"></i>
                                
                                <span>{{this.first_region}}</span>
                            </li>
                            <li>
                                <i class="icon-cup2" style="color: #68d8fe;"></i>
                               <span>{{this.second_region}}</span>
                            </li>
                            <li>
                                <i class="icon-cup3" style="color: #4c9bfd;"></i>
                              <span>{{this.third_region}}</span>
                            </li>
                        </ul>
                    </div> 
                    <div class="province">
                        <h3>各省较差设备 <i class="date"> {{this.province}}较差设备   <el-button type="text"  @click="jumppageindextemporder"   >跳转至设备排名
    </el-button> </i></h3>
                       
                        <div class="data">
                            <ul class="sup">
                                <li>
                                <el-button  v-if="this.province_score.length>=1"  @click="youxia"  type="text" autofocus="true" v-focus plain>
                                    <span>{{this.first_province}} &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;{{this.province_score[0].temp_score}}</span>
                                     </el-button> 
                                </li>
                                <li>
                                   <el-button  v-if="this.province_score.length>=2"     @click="youxia1"  type="text" plain>
                                    <span>{{this.second_province}} &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;{{this.province_score[1].temp_score}}</span>
                                    </el-button> 
                                </li>
                                <li>
                                   <el-button   v-if="this.province_score.length>=3"      @click="youxia2"  type="text" plain>
                                    <span>{{this.third_province}}  &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;{{this.province_score[2].temp_score}}</span> </el-button>
                                   
                                </li>
                                <li>
                                   <el-button     v-if="this.province_score.length>=4"    @click="youxia3"  type="text" plain>
                                    <span>{{this.fourth_province}} &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;{{this.province_score[3].temp_score}}</span> </el-button>
                                    
                                </li>
                                <li>
                                   <el-button    v-if="this.province_score.length>=5"     @click="youxia4"  type="text" plain>
                                    <span>{{this.fifth_province}} &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;{{this.province_score[4].temp_score}}</span> </el-button>
                                    
                                </li>
                            </ul> 
                            <ul class="sub">
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
                 <!-- 迁移数据 -->
            <div class="excavate panel">
                <div class="inner">
                      <h11 >挖掘用时日趋势（最近一个月）</h11>
                        <div id="excavateline"></div>
                </div>
            </div>
        </div>
    </div>
    </body>
</div>
</template>

<script>
//柱状图
var item = {
        name: '',
        value: 80,
        // 柱子颜色
        itemStyle: {
            color: '#254065'
        },
        // 鼠标经过柱子颜色
        emphasis: {
            itemStyle: {
                color: '#254065'
            }
        },
        // 工具提示隐藏
        tooltip: {
            extraCssText: 'opacity:0'
        }
    };

var transfer_time=[]
var transfer_xdata=""
var excavate_time=[]
var excavate_xdata=[]
var remainingfreespace={
    xAxisData:[],//日期
    seriesLineData:[], //剩余空间
	tooltip:[],
  }

var bingzhuangtuData={
      data: [
                    { value: 0, name: '恒温+加热正常' },
                   
                    { value: 0, name: '加热异常' }, { value: 0, name: '恒温+加热异常' } ,
                    { value: 0, name: '恒温异常' },
                ],
      data1: [
                    { value: 0, name: '恒温+加热正常' },
                
                    { value: 0, name: '加热异常' },    { value: 0, name: '恒温+加热异常' } ,
                    { value: 0, name: '恒温异常' },
                ],     
 }
//趋势图用
var typebest="";
var typeworst="";
var typeworst_ydata=[];
var typebest_ydata=[];
var regionbest="";
var regionworst="";
var regionworst_ydata=[];
var regionbest_ydata=[];
var citybest="";
var cityworst="";
var cityworst_ydata=[];
var citybest_ydata=[];
var china_ydata=[];
/* var qushi_xdata=[]; */
var zhuzhuang_xdata7=[];
var zhuzhuang_ydata7=[];
var zhuzhuang_xdata1=[];
var zhuzhuang_ydata1=[];
var geodata= {name:[],equipment_num:[],tempscore3:[],waterscore3:[]};
var geodata1= {name:[],equipment_num:[],tempscore3:[],waterscore3:[]};
import $ from 'jquery';
import echarts from 'echarts'
import request from '@/utils/request';
import china from 'echarts/map/json/china.json'
// 引入导出Excel表格依赖
    //import FileSaver from "file-saver";
    //import XLSX from "xlsx";
echarts.registerMap('china', china)
var geoid={};
	export default {
    directives: {
      focus: {
        inserted: function(el) {
          el.focus();
        }
      }
    },
	  name: 'hello',
	  components: {
		// ColumnarBrokenLine
	  },
	data () {
	    return {
      freespace:"",
      out_table:"#out-table-a",
      total:"",
			new_equipment:"",
      new_equipmentzheng:"",
    	monitor_equipment:"",
      abnormal_equipment:"",
      equipment:"",
      abnormalcount:[],
      normalcount:[],
      region:[],
      total:"",
			new_equipment:"",
    	monitor_equipment:"",
      abnormal_equipment:"",  
      equipment:"",
      city:"",
      start_time:"",
      event:"",
      tableData:[],
      faultData:[],
      One_hundred:0,
      Under_eight_five:0,
      Top_eight_five:0,
      Under_sixty:0,
      One_hundred7:0,
      Under_eight_five7:0,
      Top_eight_five7:0,
      Under_sixty7:0,
 first_region:"",
          second_region:"",
          third_region:"",

         first_province:"",
         second_province:"",
        third_province:"",
        fourth_province:"",
        fifth_province:"",
       province_score:"",
       equ:"",
      province:"",
avg_water_time:"",
avg_water_num:"",
avg_heat_time:"",
dev_avg_heat_score:"",
dev_avg_stable_score:"",
     typetotal:"",
           typeavgscore:"",
           /* 数据条数 */
           start_time1:"",
      update_time:"",
      day_data_sum:"",
      total_data_sum:"",
       typetotal:[],
      typeavgscore:[],
	    }
	 },
  mounted(){
   this.Width();
   this.huoqu();
   this.temporder();
    setTimeout(() => {
     this.freespaceFn();
     this.gaugeFn();
     this.shanxingtuFn();
     this.zhuzhuangtuFn(); 
     this.zhexiantuFn();
     this.mapFn();
     this.yichang();
     this.youxia();
     this.qianyiquxianFn();
     this.excavateFn();
    },2000);
  },
  
  methods: {
      //定义导出Excel表格事件
       // exportExcel() {
        /* 从表生成工作簿对象 */
       // var wb = XLSX.utils.table_to_book(document.querySelector(this.out_table));
        /* 获取二进制字符串作为输出 */
       // var wbout = XLSX.write(wb, {
           // bookType: "xlsx",
          //  bookSST: true,
          //  type: "array"
      //  });
       // var xlsxParam = { raw: true }
       // try {
       //     FileSaver.saveAs(
            //Blob 对象表示一个不可变、原始数据的类文件对象。
            //Blob 表示的不一定是JavaScript原生格式的数据。
            //File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
            //返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
          //  new Blob([wbout], { type: "application/octet-stream" }),
            //设置导出文件名称
          //  "sheetjs.xlsx"
         //   );
      //  } catch (e) {
     //       if (typeof console !== "undefined") console.log(e, wbout);
     //   }
     //   return wbout;
     //   },
  /* 迁移曲线 */
qianyiquxianFn(){
   let data=transfer_time
  
  // 基于准备好的dom，初始化echarts实例
		var nowChartwfreespace = this.$echarts.init(document.getElementById('qianyiline'));
		// 绘制柱状折线图-营业收入统计
	var option = {
    tooltip: {
        show: true,
        formatter: function (params) {
          	return "日期："+params.name+"<br />迁移时间："+fomartTime(params.data)
        }
    },
    grid: {
		        left: '5%',
		        right: '5%',
		        bottom: '15%',
		        top:'10%',
		        containLabel: true
		    },
    xAxis: {
        type: 'category',
        data: transfer_xdata,
        axisLabel : {
						formatter: '{value}',
						textStyle:{
							color:'#fff',
							fontSize:10
						},
						interval: 14, 
                        rotate: 30
					},
    },
    yAxis: {
        type: 'value',
        // interval :2,
        axisLabel: {
          	textStyle:{
							color:'#fff',
							fontSize:9
						},
            formatter:function (value, index) {
                return fomartTime(value)
            }
        },
        	splitLine : {
						show:false,
						lineStyle: {
							color: '#5e6067',
							type: 'dashed',
							width: 1
						}
          			},
					nameTextStyle:{
						color:'#fff',
					},
					scale:true,
    },
    series: [{
        data:data,//这个数组我的单位是分钟
        type: 'line'
    }]
};
 
function fomartTime (value) {
    let h =String(value/60|0).padStart(2,'0')
    let m =String(value%60|0).padStart(2,'0')
    return h+'m'+m+'s'
}
 
 
		if (option && typeof option=== "object") {
			nowChartwfreespace.setOption(option, true);
			}
},
/* 挖掘趋势曲线 */
excavateFn(){
   let tdata=excavate_time
  let data =tdata.map(item=>{
    let data=item.split(':')
    return data[0]*120+data[1]*60+Number(data[2])
  })
  console.log(data);
  // 基于准备好的dom，初始化echarts实例
		var nowChartwfreespace = this.$echarts.init(document.getElementById('excavateline'));
		// 绘制柱状折线图-营业收入统计
	var option = {
    tooltip: {
        show: true,
        formatter: function (params) { 
         	return "日期："+params.name+"<br />迁移时间："+fomartTime(params.data)
        }
    },
    grid: {
		        left: '7%',
		        right: '5%',
		        bottom: '30%',
		        top:'10%',
		        containLabel: true
		    },
    xAxis: {
        type: 'category',
        data: excavate_xdata,
        axisLabel : {
						formatter: '{value}',
						textStyle:{
							color:'#fff',
							fontSize:10
						},
						interval: 14, 
                        rotate: 30
					},
    },
    yAxis: {
        type: 'value',
        // interval :2,
        axisLabel: {
          	textStyle:{
							color:'#fff',
							fontSize:9
						},
            formatter:function (value, index) {
                return fomartTime(value)
            }
        },
        	splitLine : {
						show:false,
						lineStyle: {
							color: '#5e6067',
							type: 'dashed',
							width: 1
						}
          			},
					nameTextStyle:{
						color:'#fff',
					},
					scale:true,
    },
    series: [{
        data:data,//这个数组我的单位是分钟
        type: 'line'
    }]
};
 
function fomartTime (value) {
    let h =String(value/1200|0).padStart(2,'0')
    let m =String(value/60|0).padStart(2,'0')
    let s =String(value%60|0).padStart(2,'0')
    return h+'h'+m+'m'+s+'s'
}
 
 
		if (option && typeof option=== "object") {
			nowChartwfreespace.setOption(option, true);
			}
},
 temporder(){
                                  
    request.post('indextemp1/page/menu2', null, {
      params:
      { 
      },
    }).then(({ data: response }) => { 
        console.log(response.data)
 this.total=response.data.migratenum
        this.monitor_equipment=response.data.monitornum
        this.abnormal_equipment=response.data.abnormal_count
        this.new_equipment=response.data.new_create
        if(this.new_equipment<0){
          this.new_equipmentzheng=-this.new_equipment
        }else if(this.new_equipment>=0)
        {
          this.new_equipmentzheng=this.new_equipment
        }
        //扇形统计图 
        bingzhuangtuData.data[0].value=response.data.data[0].temp_all_normal
           bingzhuangtuData.data[2].value=response.data.data[0].temp_all_abnormal
          
           bingzhuangtuData.data[1].value=response.data.data[0].elevate_temp_abnormal
           bingzhuangtuData.data[3].value=response.data.data[0].constant_temp_abnormal
           bingzhuangtuData.data1[2].value=response.data.data[1].temp_all_abnormal
           bingzhuangtuData.data1[0].value=response.data.data[1].temp_all_normal
           bingzhuangtuData.data1[1].value=response.data.data[1].elevate_temp_abnormal
           bingzhuangtuData.data1[3].value=response.data.data[1].constant_temp_abnormal 
           this.abnormalcount[0]=response.data.data[0].temp_all_abnormal+response.data.data[0].elevate_temp_abnormal+response.data.data[0].constant_temp_abnormal
           this.normalcount[0]=response.data.data[0].temp_all_normal
           this.abnormalcount[1]=response.data.data[1].temp_all_abnormal+response.data.data[1].elevate_temp_abnormal+response.data.data[1].constant_temp_abnormal
           this.normalcount[1]=response.data.data[1].temp_all_normal
            //评分段设备数百分比
            console.log(response.data.feature)
            var score_100=Number(response.data.feature.one_hundred)
           var score_up85=Number(response.data.feature.top_eight_five)
           var score_down85=Number(response.data.feature.under_eight_five)
            var score_down65=Number(response.data.feature.under_sixty)
            var score_all=(score_100+score_up85+score_down85+score_down65)
  
            this.One_hundred=Number( score_100/score_all*100).toFixed(0)+"%";
            this.Top_eight_five=Number(score_up85/score_all*100).toFixed(0)+"%";
            this.Under_eight_five=Number(score_down85/score_all*100).toFixed(0)+"%";
            this.Under_sixty=Number(score_down65/score_all*100).toFixed(0)+"%";
            for(var i=1;i<7;i++){
             score_100= score_100+parseInt(response.data.data4[i].one_hundred)
             score_up85=score_up85+parseInt(response.data.data4[i].top_eight_five)
             score_down85=score_down85+parseInt(response.data.data4[i].under_eight_five)
             score_down65=score_down65+parseInt(response.data.data4[i].under_sixty)
          }
           score_all=(score_100+score_up85+score_down85+score_down65)
               this.One_hundred7=Number( score_100/score_all*100).toFixed(0)+"%";
               this.Top_eight_five7=Number(score_up85/score_all*100).toFixed(0)+"%";
               this.Under_eight_five7=Number(score_down85/score_all*100).toFixed(0)+"%";
               this.Under_sixty7=Number(score_down65/score_all*100).toFixed(0)+"%"; 
                      //平均用水次数、用水时间、升温时间、加热段恒温段得分
          this.avg_water_time=response.data.feature.avg_water_time
          this.avg_water_num=response.data.feature.avg_water_num
          this.avg_heat_time=response.data.feature.avg_heat_time
          this.dev_avg_heat_score=response.data.feature.dev_avg_heat_score
          this.dev_avg_stable_score=response.data.feature.dev_avg_stable_score
 //右下角榜单
          //地区排名
          this.first_region=response.data.ranking.first_region
          this.second_region=response.data.ranking.second_region
          this.third_region=response.data.ranking.third_region
    //省份评分
        this.province_score=response.data.province_score
//省份排名
if(this.province_score.length==5){
       this.first_province=response.data.ranking.fifth_province
         this.second_province=response.data.ranking.fourth_province
         this.third_province=response.data.ranking.third_province
         this.fourth_province=response.data.ranking.second_province
        this.fifth_province=response.data.ranking.first_province
}
  if(this.province_score.length==4){
       this.first_province=response.data.ranking.fourth_province
         this.second_province=response.data.ranking.third_province
         this.third_province=response.data.ranking.second_province
         this.fourth_province=response.data.ranking.first_province
}  
  if(this.province_score.length==3){
       this.first_province=response.data.ranking.third_province
         this.second_province=response.data.ranking.second_province
         this.third_province=response.data.ranking.first_province
}   
if(this.province_score.length==2){
       this.first_province=response.data.ranking.second_province
         this.second_province=response.data.ranking.first_province
      
}  
if(this.province_score.length==1){
       this.first_province=response.data.ranking.first_province
}  
//设备排名(倒着排)
        this.equ=response.data.equ
//equ的数据处理
//处理equ[i]
for (var i=0;i<5;i++){
            if (this.equ[i].sixth_equ==""&&this.equ[i].fifth_equ!=""){
              this.equ[i].sixth_equ=this.equ[i].fifth_equ
              this.equ[i].fifth_equ=this.equ[i].fourth_equ
              this.equ[i].fourth_equ=this.equ[i].third_equ
              this.equ[i].third_equ=this.equ[i].second_equ
              this.equ[i].second_equ=this.equ[i].first_equ
               this.equ[i].first_equ=""
            }
                  if (this.equ[i].fifth_equ==""&&this.equ[i].fourth_equ!=""){
              this.equ[i].sixth_equ=this.equ[i].fourth_equ
              this.equ[i].fifth_equ=this.equ[i].third_equ
              this.equ[i].fourth_equ=this.equ[i].second_equ
              this.equ[i].third_equ=this.equ[i].first_equ
              this.equ[i].second_equ=""
               this.equ[i].first_equ=""
            }
                    if (this.equ[i].fourth_equ==""&&this.equ[i].third_equ!=""){
              this.equ[i].sixth_equ=this.equ[i].third_equ
              this.equ[i].fifth_equ=this.equ[i].second_equ
              this.equ[i].fourth_equ=this.equ[i].first_equ
              this.equ[i].third_equ=""
              this.equ[i].second_equ=""
               this.equ[i].first_equ=""
            }
                    if (this.equ[i].third_equ==""&&this.equ[i].second_equ!=""){
              this.equ[i].sixth_equ=this.equ[i].second_equ
              this.equ[i].fifth_equ=this.equ[i].first_equ
              this.equ[i].fourth_equ=""
              this.equ[i].third_equ=""
              this.equ[i].second_equ=""
               this.equ[i].first_equ=""
            }
                    if (this.equ[i].second_equ==""&&this.equ[i].first_equ!=""){
              this.equ[i].sixth_equ=this.equ[i].first_equ
              this.equ[i].fifth_equ=""
              this.equ[i].fourth_equ=""
              this.equ[i].third_equ=""
              this.equ[i].second_equ=""
               this.equ[i].first_equ=""
            }
}
console.log(this.equ)
//监控恒温片段表

           for(var i=0;i<response.data.monitor_fragement.length;i++){
            this.tableData[i]={
             equipment:response.data.monitor_fragement[i].dev_id,
              city:response.data.monitor_fragement_city[i].dev_city,
              start_time:response.data.monitor_fragement[i].start_time+"-"+response.data.monitor_fragement[i].end_time,
               event:response.data.monitor_fragement[i].temp_pattern,
          }
             if(this.tableData[i].event=="12"){
            this.tableData[i].event="恒温异常"
            }else if(this.tableData[i].event=="21"){
            this.tableData[i].event="加热异常"
            }else if(this.tableData[i].event=="22"){
            this.tableData[i].event="加热+恒温异常"
            }else if(this.tableData[i].event=="13"){
            this.tableData[i].event="恒温熄火"
            }else if(this.tableData[i].event=="23"){
            this.tableData[i].event="加热异常、恒温熄火"
            }
          }
          
           this.tableData=JSON.parse(JSON.stringify(this.tableData)); 
          console.log(this.tableData)
         console.log(this.tableData.length)
//监控故障设备表
            for(var i=0;i<response.data.fault_monitor.length;i++){
            this.faultData[i]={
             equipment:response.data.fault_monitor[i].dev_id,
              city:response.data.fault_city[i].dev_city,
              timedate:response.data.fault_monitor[i].time_date,
              c0:response.data.fault_monitor[i].c0,
              c1:response.data.fault_monitor[i].c1,
              c2:response.data.fault_monitor[i].c2,
              c3:response.data.fault_monitor[i].c3,
              c4:response.data.fault_monitor[i].c4,
              c5:response.data.fault_monitor[i].c5,
              c6:response.data.fault_monitor[i].c6,
              c7:response.data.fault_monitor[i].c7,
               e0:response.data.fault_monitor[i].e0,
              e1:response.data.fault_monitor[i].e1,
              e2:response.data.fault_monitor[i].e2,
              e3:response.data.fault_monitor[i].e3,
              e4:response.data.fault_monitor[i].e4,
              e5:response.data.fault_monitor[i].e5,
              e6:response.data.fault_monitor[i].e6,
              e8:response.data.fault_monitor[i].e8,
              ee:response.data.fault_monitor[i].ee,
              eh:response.data.fault_monitor[i].eh,
              ef:response.data.fault_monitor[i].ef,
              ea:response.data.fault_monitor[i].ea,
              f2:response.data.fault_monitor[i].f2,
              event:""
          }
             if(this.faultData[i].c0!=0){
            this.faultData[i].event+=" c0"
            }            
             if(this.faultData[i].c1!=0){
            this.faultData[i].event+=" c1"
            }
      if(this.faultData[i].c2!=0){
            this.faultData[i].event+=" c2"
            }            
             if(this.faultData[i].c3!=0){
            this.faultData[i].event+=" c3"
            }
         if(this.faultData[i].c4!=0){
            this.faultData[i].event+=" c4"
            }            
             if(this.faultData[i].c5!=0){
            this.faultData[i].event+=" c5"
            }
      if(this.faultData[i].c6!=0){
            this.faultData[i].event+=" c6"
            }            
             if(this.faultData[i].c7!=0){
            this.faultData[i].event+=" c7"
            }
      if(this.faultData[i].e0!=0){
            this.faultData[i].event+=" e0"
            }            
             if(this.faultData[i].e1!=0){
            this.faultData[i].event+=" e1"
            }
      if(this.faultData[i].e2!=0){
            this.faultData[i].event+=" e2"
            }            
             if(this.faultData[i].e3!=0){
            this.faultData[i].event+=" e3"
            }
if(this.faultData[i].e4!=0){
            this.faultData[i].event+=" e4"
            }            
             if(this.faultData[i].e5!=0){
            this.faultData[i].event+=" e5"
            }
      if(this.faultData[i].e6!=0){
            this.faultData[i].event+=" e6"
            }            
             if(this.faultData[i].e8!=0){
            this.faultData[i].event+=" e8"
            }
             if(this.faultData[i].ea!=0){
            this.faultData[i].event+=" ea"
            }         
                if(this.faultData[i].ee!=0){
            this.faultData[i].event+=" ee"
            }
       if(this.faultData[i].f2!=0){
            this.faultData[i].event+=" f2"
            }         
                if(this.faultData[i].eh!=0){
            this.faultData[i].event+=" eh"
            }
                if(this.faultData[i].ef!=0){
            this.faultData[i].event+=" ef"
            }
          }
          
           this.faultData=JSON.parse(JSON.stringify(this.faultData)); 
          console.log(this.faultData)
         console.log(this.faultData.length)




        }).catch((err) => {
       
    });
	
  },
    Width(){
    // 1、页面一加载就要知道页面宽度计算
    var setFont = function () {
        // 因为要定义变量可能和别的变量相互冲突，污染，所有用自调用函数
        var html = document.documentElement;// 获取html
        // 获取宽度
        var width = html.clientWidth;

        // 判断
        if (width < 1024) width = 1024
        if (width > 1920) width = 1920
        // 设置html的基准值
        var fontSize = width / 80 + 'px';
        // 设置给html
        html.style.fontSize = fontSize;
    }
    setFont();
    // 2、页面改变的时候也需要设置
    // 尺寸改变事件
    window.onresize = function () {
        setFont();
    }
},

shanxingtuFn() {
    const myCharts = this.$echarts.init(document.getElementById('pie'));
    var option = {
  title: {

    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
   orient: 'horizontal',
    top: 'bottom',
     textStyle: { //图例文字的样式
                            color: '#green',
                            fontSize: 16
                        },
  },
  series: [
    {
      name: '用水片段',
      type: 'pie',
      radius: '70%',
        center: ['45%', '40%'],
     data: bingzhuangtuData.data,
label: {
                        normal: {
                            show: false,
                        },
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
    }
  ],
  color: ['#60cda0',  '#006cff', '#ed8884', '#FF6900', ]
};
    if (option && typeof option === "object") {
			myCharts.setOption(option, true);
			}
  
       
            
             //点击效果
    var data1 = {
        day1: bingzhuangtuData.data1,
        day7: bingzhuangtuData.data
    }
     var data2 = {
        day7: [this.abnormalcount[0],this.normalcount[0]],
        day1: [this.abnormalcount[1],this.normalcount[1]]
    }
    $('.point ').on('click', '.filter a', function () {
        $(this).addClass('active').siblings('a').removeClass('active');
        //option series   data
        //获取自定义属性值
        var key = $(this).attr('data-key1');
        //取出对应的值
        var key1 = data1[key];
        console.log(data1[key]);
        console.log(data2[key][0]);
        var key2=data2[key];
          $('.point .item h4:eq(0)').text(key2[0]);
        $('.point .item h4:eq(1)').text(key2[1]);
        //将值设置到 图表中
        option.series[0].data = key1;
        //再次调用才能在页面显示
         if (option && typeof option === "object") {
			myCharts.setOption(option, true);
			}
    });
	}, 	

zhuzhuangtuFn () {
  const myCharts = this.$echarts.init(document.getElementById('bar'));
    // 中间省略的数据  准备三项
    var item = {
        name: '',
        value: 1200,
        // 柱子颜色
        itemStyle: {
            color: '#254065'
        },
        // 鼠标经过柱子颜色
        emphasis: {
            itemStyle: {
                color: '#254065'
            }
        },
        // 工具提示隐藏
        tooltip: {
            extraCssText: 'opacity:0'
        }
    };
   var option = {
        // 工具提示
        tooltip: {
            // 触发类型  经过轴触发axis  经过轴触发item
            trigger: 'item',
            // 轴触发提示才有效
            axisPointer: {
                // 默认为直线，可选为：'line' 线效果 | 'shadow' 阴影效果       
                type: 'shadow'
            }
        },
        // 图表边界控制
        grid: {
            // 距离 上右下左 的距离
            left: '0',
            right: '3%',
            bottom: '3%',
            top: '5%',
            // 大小是否包含文本【类似于boxsizing】
            containLabel: true,
            //显示边框
            show: true,
            //边框颜色
            borderColor: 'rgba(0, 240, 255, 0.3)'
        },
        // 控制x轴
        xAxis: [
            {
                // 使用类目，必须有data属性
                type: 'category',
                // 使用 data 中的数据设为刻度文字
                data: zhuzhuang_xdata7,
             axisLabel : {//坐标轴刻度标签的相关设置。
                interval:0,
                rotate:"45",
                color: '#4c9bfd'
            },
                // 刻度设置
                 axisTick: {
                    // true意思：图形在刻度中间
                    // false意思：图形在刻度之间
                    alignWithLabel: false,
                    show: false
                }, 
                //文字
            }
        ],
        // 控制y轴
        yAxis: [
            {
                // 使用数据的值设为刻度文字
                type: 'value',
                axisTick: {
                    // true意思：图形在刻度中间
                    // false意思：图形在刻度之间
                    alignWithLabel: false,
                    show: false
                },
                //文字
                axisLabel: {
                    color: '#4c9bfd'
                },
                splitLine: {
                    lineStyle: {
                        color: 'rgba(0, 240, 255, 0.3)'
                    }
                },
            }
        ],
        // 控制x轴
        series: [

            {
                // series配置
                // 颜色
                itemStyle: {
                    // 提供的工具函数生成渐变颜色
                    color: new echarts.graphic.LinearGradient(
                        // (x1,y2) 点到点 (x2,y2) 之间进行渐变
                        0, 0, 0, 1,
                        [
                            { offset: 0, color: '#00fffb' }, // 0 起始颜色
                            { offset: 1, color: '#0061ce' }  // 1 结束颜色
                        ]
                    )
                },
                // 图表数据名称
                name: '平均温度得分',
                // 图表类型
                type: 'bar',
                // 柱子宽度
                barWidth: '60%',
                // 数据
                data: zhuzhuang_ydata7
            }
        ]
    };
    
myCharts.setOption(option, true);
       //点击效果
    var data1 = {
        day1:[zhuzhuang_xdata1,zhuzhuang_ydata1],
        day7:[zhuzhuang_xdata7,zhuzhuang_ydata7]
    }
     var data2 = {
        day1:[this.typetotal[1],this.typeavgscore[1]],
        day7:[this.typetotal[0],this.typeavgscore[0]]
    }
    $('.users ').on('click', '.filter a', function () {
        $(this).addClass('active').siblings('a').removeClass('active');
        //option series   data
        //获取自定义属性值
        var key = $(this).attr('data-user');
        //取出对应的值
        var xdata = data1[key][0];
        var ydata = data1[key][1];
           var key2=data2[key];
          $('.users .item h4:eq(0)').text(key2[0]);
        $('.users .item h4:eq(1)').text(key2[1]);
        //将值设置到 图表中
        option.xAxis[0].data=xdata;
        option.series[0].data = ydata;
        //再次调用才能在页面显示
         if (option && typeof option === "object") {
			myCharts.setOption(option, true);
			}
    });
}, 	
zhexiantuFn () {
  const myCharts = this.$echarts.init(document.getElementById('line'));
    var option = {
        //鼠标提示工具
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            // 类目类型                                  
            type: 'category',
            // x轴刻度文字                                  
            data: ['前七天', '前六天', '前五天', '前四天', '前三天', '前两天','昨天'],
            axisTick: {
                show: false//去除刻度线
            },
            axisLabel: {
                color: '#4c9bfd'//文本颜色
            },
            axisLine: {
                show: false//去除轴线  
            },
            boundaryGap: false//去除轴内间距
        },
        yAxis: {
            // 数据作为刻度文字                                  
            type: 'value',
            axisTick: {
                show: false//去除刻度线
            },
            axisLabel: {
                color: '#4c9bfd'//文本颜色
            },
            axisLine: {
                show: false//去除轴线  
            },
            boundaryGap: false//去除轴内间距
        },
        //图例组件
        legend: {
            textStyle: {
                color: '#4c9bfd' // 图例文字颜色

            },
            right: '10%'//距离右边10%
        },
        // 设置网格样式
        grid: {
            show: true,// 显示边框
            top: '20%',
            left: '3%',
            right: '4%',
            bottom: '3%',
            borderColor: '#012f4a',// 边框颜色
            containLabel: true // 包含刻度文字在内
        },
        series: [{
            name: typebest,
            // 数据                                  
            data: typebest_ydata,
            // 图表类型                                  
            type: 'line',
            // 圆滑连接                                  
            smooth: true,
            itemStyle: {
                color: '#00f2f1'  // 线颜色
            }
        },
        {
            name: typeworst,
            // 数据                                  
            data:typeworst_ydata,
            // 图表类型                                  
            type: 'line',
            // 圆滑连接                                  
            smooth: true,
            itemStyle: {
                color: '#ed3f35'  // 线颜色
            }
        }]
    };

     if (option && typeof option === "object") {
			myCharts.setOption(option, true);
			}
             //点击效果
    var data = {
        type: [
               typebest,
               typeworst,
               typebest_ydata,
               typeworst_ydata
        ],
        region: [
               regionbest,
               regionworst,
               regionbest_ydata,
               regionworst_ydata
        ],
        city: [
               citybest,
               cityworst,
               citybest_ydata,
               cityworst_ydata
        ],
        china: [
               "全国平均",
               "",
               china_ydata,
               []
        ]
    }
    $('.sales ').on('click', '.caption a', function () {
        $(this).addClass('active').siblings('a').removeClass('active');
        //option series   data
        //获取自定义属性值
        var key = $(this).attr('data-type');
        //取出对应的值
        key = data[key];
        //将值设置到 图表中
        option.series[0].name=key[0]
        option.series[1].name=key[1]
        option.series[0].data = key[2];
        option.series[1].data = key[3];
        //再次调用才能在页面显示
        if (option && typeof option === "object") {
			myCharts.setOption(option, true);
			}
    });
    //定时器
    var index = 0;
    var timer = setInterval(function () {
        index++;
        if (index > 4) {
            index = 0;
        };
        $('.sales .caption a').eq(index).click();
    }, 40000);

},//缺少点击效果
    
//剩余空间
	freespaceFn(){
// 基于准备好的dom，初始化echarts实例
		var nowChartwfreespace = this.$echarts.init(document.getElementById('freespace'));
		// 绘制柱状折线图-营业收入统计
		var optionfreespace = {
			tooltip : {
				trigger: 'axis',
				formatter: function(params){
					console.log(params);
					if(params[0].data==""){
						return "日期："+remainingfreespace.tooltip[params[0].dataIndex]+"<br />剩余空间：无数据"
					}else{
						return "日期："+remainingfreespace.tooltip[params[0].dataIndex]+"<br />剩余空间："+params[0].data
					}
				},
				textStyle:{
					color:"#ad2727"
				}
			},
			calculable : true,
			
			grid: {
		        left: '5%',
		        right: '5%',
		        bottom: '10%',
		        top:'22%',
		        containLabel: true
		    },
			xAxis : [
				{
					type : 'category',
					data : remainingfreespace.xAxisData, 
					axisLabel : {
						formatter: '{value}',
						textStyle:{
							color:'#fff',
							fontSize:10
						},
						interval: 14, 
                        rotate: 30
					},
				}
			],
			yAxis : [
				{
					type : 'value',
					name : '剩余空间/G',
         nameTextStyle: {
                          align: "left"
    },
					// min: "auto",
                    // max: "auto",
          // interval: 20000,
					axisLabel : {
						formatter: '{value}',
						textStyle:{
							color:'#fff',
							fontSize:9
						},
					},
					splitLine : {
						show:false,
						lineStyle: {
							color: '#5e6067',
							type: 'dashed',
							width: 1
						}
          			},
					nameTextStyle:{
						color:'#fff',
					},
					scale:true,
				},
				
			],
			series : [
				{
					name:'剩余空间',
					type:'line',
					data:remainingfreespace.seriesLineData,
					itemStyle: {
						normal: {
							color: '#ad2727',
						},
					}
				}
			]
		};

		if (optionfreespace && typeof optionfreespace=== "object") {
			nowChartwfreespace.setOption(optionfreespace, true);
			}
	},
    /* 昨日剩余空间 */
  gaugeFn() {
      const myCharts = this.$echarts.init(document.getElementById('gauge'));
    var option = {
        series: [
            {
                type: 'pie',
                radius: ['130%', '150%'],  // 放大图形
                center: ['50%', '80%'],    // 往下移动  套住75%文字
                label: {
                    show: false,
                },
                startAngle: 180,
                hoverOffset: 0,  // 鼠标经过不变大
                data: [
                    {
                        value: parseInt(this.freespace)/120*100,
                        itemStyle: { // 颜色渐变#00c9e0->#005fc1
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [
                                    { offset: 0, color: '#00c9e0' },
                                    { offset: 1, color: '#005fc1' }
                                ]
                            }
                        }
                    },
                    { value: (120-parseInt(this.freespace))/120*100, itemStyle: { color: '#12274d' } }, // 颜色#12274d

                    { value: 100, itemStyle: { color: 'transparent' } }// 透明隐藏第三块区域
                ]
            }
        ]
    };
   if (option && typeof option === "object") {
			myCharts.setOption(option, true);
			}
},
    jumppage(){
        this.$confirm('请选择查看的详情', '提示', {
            distinguishCancelAndClose: true,
            confirmButtonText: '设备片段详情',
            cancelButtonText: '设备故障详情',
            type: 'warning'
        }).then(() => {
            let routeData = this.$router.resolve({
                path:'indextemp',
                query: {
                equipment_ID: this.value3,
                }
                });
                window.open(routeData.href);
            
        }).catch((action) => {
            // console.log(action)
            if (action == 'close'){
                this.$message.info('已取消查询');
            } else {
                let routeData = this.$router.resolve({
                path:'equfault',
                query: {
                equipment_ID: this.value3,
                }
                });
                window.open(routeData.href);
            }
        });
    },
jumppageindextemporder(){
    let routeData = this.$router.resolve({
      path:'indextemporder',   

      });
      window.open(routeData.href);
},

huoqu()
{
request.post('indextemp1/page/menu2', null, {
      params:
      { 
      },
    }).then(({ data: response }) => {
      console.log(response.data);
      /* 数据条数 */
      this.start_time1=response.data.data4[0].start_time
       this.update_time=response.data.data4[0].update_time
       this.day_data_sum=Number(parseFloat(response.data.data4[0].day_data_sum/10000).toFixed(2))
       this.total_data_sum=Number(parseFloat(response.data.data4[0].total_data_sum/1000000).toFixed(2))
 /* 迁移挖掘时间 */
       transfer_time=response.data.transfer_time
      transfer_xdata=response.data.transfer_xdata




       for(var i=0;i<response.data.excavate_time.length;i++){
       excavate_time[i]=response.data.excavate_time[response.data.excavate_time.length-1-i]
     
 excavate_xdata[i]=response.data.excavate_xdata[response.data.excavate_time.length-1-i]}

       /* 剩余空间趋势 */
       this.freespace=response.data.feature.free_space
       for(var i=0;i<response.data.data4.length;i++){
        remainingfreespace.seriesLineData[i]=response.data.data4[response.data.data4.length-1-i].free_space
		remainingfreespace.tooltip[i]=response.data.data4[response.data.data4.length-1-i].update_time
	    remainingfreespace.xAxisData[i]=remainingfreespace.tooltip[i].slice(5,10)
	  }
      geodata.name=response.data.province
      geodata.equipment_num=response.data.equipment_num
      geodata.tempscore3=response.data.tempscore
      geodata.waterscore3=response.data.waterscore
      geodata1.name=response.data.province1
      geodata1.equipment_num=response.data.equipment_num1
      geodata1.tempscore3=response.data.tempscore1
      geodata1.waterscore3=response.data.waterscore1
      /* this.under_eight_five=response.data.feature.under_eight_five
      this.under_sixty=response.data.feature.under_sixty
      this.top_eight_five=response.data.feature.top_eight_five
      this.one_hundred=response.data.feature.one_hundred */
         typeworst=response.data.typequshiworst[0].dev_type
         typebest=response.data.typequshibest[0].dev_type
         regionworst=response.data.regionqushiworst[0].dev_region
         regionbest=response.data.regionqushibest[0].dev_region
         cityworst=response.data.cityqushiworst[0].dev_city
         citybest=response.data.cityqushibest[0].dev_city
         length=response.data.typequshiworst.length
         var j=0
     for (var i=7-length;i<7;i++){
      var j=i-7+length
               typeworst_ydata[i]=response.data.typequshiworst[j].avgscore
               typebest_ydata[i]=response.data.typequshibest[j].avgscore
               regionworst_ydata[i]=response.data.regionqushiworst[j].avgscore
               regionbest_ydata[i]=response.data.regionqushibest[j].avgscore
               cityworst_ydata[i]=response.data.cityqushiworst[j].avgscore
               citybest_ydata[i]=response.data.cityqushibest[j].avgscore
               china_ydata[i]=response.data.china_ydata[j]
      }

      for (var i=0;i<5;i++)
      {
        zhuzhuang_xdata7[i]=response.data.zhuzhuangtu7[i].dev_type
        zhuzhuang_ydata7[i]=response.data.zhuzhuangtu7[i].avgscore
      }
          zhuzhuang_xdata7[5]='......'
          zhuzhuang_ydata7[5]=item
          var j=6
          for(var q=response.data.zhuzhuangtu7.length-3;q<response.data.zhuzhuangtu7.length;q++)
          {
            zhuzhuang_xdata7[j]=response.data.zhuzhuangtu7[q].dev_type
            zhuzhuang_ydata7[j]=response.data.zhuzhuangtu7[q].avgscore
            j++
          }
           for (var i=0;i<5;i++)
      {
        zhuzhuang_xdata1[i]=response.data.zhuzhuangtu1[i].dev_type
        zhuzhuang_ydata1[i]=response.data.zhuzhuangtu1[i].avgscore
      }
          zhuzhuang_xdata1[5]='......'
          zhuzhuang_ydata1[5]=item
          var j=6
          for(var q=response.data.zhuzhuangtu1.length-3;q<response.data.zhuzhuangtu1.length;q++)
          {
            zhuzhuang_xdata1[j]=response.data.zhuzhuangtu1[q].dev_type
            zhuzhuang_ydata1[j]=response.data.zhuzhuangtu1[q].avgscore
            j++
          }
     //型号总量
      this.typetotal[0]=response.data.typetotal[0]
             this.typetotal[1]=response.data.typetotal[1]
      //型号均分
             this.typeavgscore[0]=response.data.typeavgscore1
             this.typeavgscore[1]=response.data.typeavgscore2
        
      this.region=response.data.region
    }).catch((err) => { 
    });
},
/*大屏*/
mapFn(){
const myCharts = this.$echarts.init(document.getElementById('geo'));
var geoCoordMap = {};
      var mapFeatures = this.$echarts.getMap("china").geoJson.features;
      mapFeatures.forEach(function(v) {
        // console.log(v)
        var name = v.properties.name;
        geoid[name]=v.id
        geoCoordMap[name] = v.properties.cp;
      });

 var convertData = function(data) {
		 
        var res = [];
        for (var i = 0; i < data.name.length; i++) {
          var geoCoord = geoCoordMap[data.name[i]];
          if (geoCoord) {
            res.push({
              name: data.name[i],
              value:  data.tempscore3[i],
              value1: data.waterscore3[i],
              value2: data.equipment_num[i]
            });
          }
        }
        return res;
      };



var option = {
  title: {
				text: "全国各省基本数据情况",
                // subtext: this.month,
                subtext: '按温度评分进行颜色划分',
                left: 'left',
				textStyle: {
					color: '#b1e2fe'
				},
				subtextStyle: {
					color: '#b1e2fe'
				}
			},
    backgroundColor: '#080a20',
    tooltip: {
        formatter: function(params) {
          for(var i=0;i<geodata.name.length;i++){
            if(geodata.name[i]===params.name){return geodata.name[i]+"<br/>温度评分："+params.data.value+"<br/>水流量评分："+params.data.value1+"<br/>设备数："+params.data.value2}
          }
          return params.name+"<br/>"+"无数据"
         },
      },
    legend: {
				left: 'left',
				data: ['强', '中', '弱'],
				textStyle: {
					color: '#ccc'
				}
			},
      visualMap: {
            orient:'vertical',
            bottom: 10,
            right: 'right',
            pieces: [//自定义『分段式视觉映射组件（visualMapPiecewise）』的每一段的范围，以及每一段的文字，以及每一段的特别的样式
				{
                label: '90~100',
                gt: 90,
                lte: 100,
                color: '#67C23A'
            },
            {
                label: '80~90',
                gt: 80,
                lte: 90,
                color: '#9acd32'
            }, {
                label: '70~80',
                gt: 70,
                lte: 80,
                color: '#B1B93E'
            }, {
                label: '60~70',
                gt: 60,
                lte: 70,
                color: '#CC9533'
            }, {
                label: '50~60',
                gt: 50,
                lte: 60,
                color: '#cd853f'
            }, {
                label: '30~50',
                gt: 30,
                lte: 50,
                color: '#cd6939'
            },
			{
                label: '0~30',
                gt: 0,
                lte: 30,
                color: '#cd2626'
            }],
            textStyle:{
              color:"#fff"
            }
        },  
   geo: {
          show: true,
          map: "china",
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
      
    series:[
         {
            type: "map",
            map: "china",
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
            data: convertData(geodata)
			
          },
			console.log(convertData(geodata))
				
			]
};
 if (option && typeof option === "object") {
			myCharts.setOption(option, true);
			}
        //点击效果
    var data = {
        day1:geodata1,
        day7: geodata
    }
    $('.map ').on('click', '.filter a', function () {
        $(this).addClass('active').siblings('a').removeClass('active');
        //option series   data
        //获取自定义属性值
        var key = $(this).attr('data-map');
        console.log(data);
        //取出对应的值
         key=data[key]
        //将值设置到 图表中
       console.log(key);
        option.series[0].data= convertData(key);
         console.log(option);
        //再次调用才能在页面显示
         if (option && typeof option === "object") {
			myCharts.setOption(option, true);
			}
    });
},

yichang () {
    //事件委托
    $('.monitor').on('click', ' a', function () {
        //点击当前的a 加类名 active  他的兄弟删除类名
        $(this).addClass('active').siblings().removeClass('active');
        //获取一一对应的下标 
        var index = $(this).index();
        //选取content 然后狗日对应下标的 显示   当前的兄弟.content隐藏
        $('.content').eq(index).show().siblings('.content').hide();
    });
    //滚动
    //原理：把marquee下面的子盒子都复制一遍 加入到marquee中
    //      然后动画向上滚动，滚动到一半重新开始滚动
    //因为选取的是两个marquee  所以要遍历
     $('.monitor .marquee').each(function (index, dom) {
        //将每个 的所有子级都复制一遍
        var rows = $(dom).children().clone();
        //再将新的到的加入原来的
        $(dom).append(rows);
    }); 
 //评分分布点击效果
     var data = {
        day1:[this.One_hundred,this.Under_eight_five,this.Top_eight_five,this.Under_sixty],
        day7:[this.One_hundred7,this.Under_eight_five7,this.Top_eight_five7,this.Under_sixty7]
    }
  
    $('.channel ').on('click', '.filter a', function (){
        $(this).addClass('active').siblings('a').removeClass('active');
        //option series   data
        //获取自定义属性值
        var key = $(this).attr('data-temp');
        console.log(key);
        //取出对应的值
            key=data[key];
console.log(key);
        $('.channel .item h4:eq(0)').text(key[0]);
        $('.channel .item h4:eq(1)').text(key[1]);
        $('.channel .item h4:eq(2)').text(key[2]);
        $('.channel .item h4:eq(3)').text(key[3]);
    });
},

youshang () {
  let tdata=['08:27','08:15','08:45','08:10','08:29']
  let data =tdata.map(item=>{
    let data=item.split(':')
    return data[0]*60+Number(data[1])
  })
  console.log(data);
  // 基于准备好的dom，初始化echarts实例
		var nowChartwfreespace = this.$echarts.init(document.getElementById('line1'));
		// 绘制柱状折线图-营业收入统计
	var option = {
    tooltip: {
        show: true,
        formatter: function (params) {
            return fomartTime(params.data)
        }
    },
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value',
        // interval :2,
        axisLabel: {
            formatter:function (value, index) {
                return fomartTime(value)
            }
        },
    },
    series: [{
        data: [5.5, 21.4, 15, 8, 158.5, 98, 32],//这个数组我的单位是分钟
        type: 'bar'
    }]
};
 
function fomartTime (value) {
    let unit=['分钟','小时','天'],
    day=0,hour=0,min=0,second=0,returnStr=0,
    arrVal=value.toString().split(".");
    if(arrVal.length>1){
       second=parseFloat("0."+arrVal[1]);
       second*=60;
       value=parseInt(arrVal[0]);
    }
    returnStr=value+unit[0];
    if(value>=60){
        hour=parseInt(value/60);
        min=value%60;
    }
    if(hour){
       returnStr=hour+unit[1];
       if(min){
           returnStr+=min+unit[0]
       }
    }
    if(second){
        returnStr+=second.toFixed(0)+'秒'
    }
     return returnStr
}
 
 
		if (option && typeof option=== "object") {
			nowChartwfreespace.setOption(option, true);
			}
    /* var data = {
        day30: { AvgWaterNum:1, AvgWatertime:1,AvgHeattime: 1},
        day7: { AvgWaterNum: 2, AvgWatertime:2,AvgHeattime: 2 },
        day1: { AvgWaterNum:3, AvgWatertime:3,AvgHeattime: 2 }
    } */
    //点击事件
    /* $('.order').on('click', '.filter a', function () {
        //点击之后加类名
        $(this).addClass('active').siblings().removeClass('active');
        // 先获取点击a的 data-key自定义属性
        var key = $(this).attr('data-key');
        //获取自定义属性
        // data{}==>data.shuxing data['shuxing]
        key = data[key];//
        $('.order .item h4:eq(0)').text(key.AvgWaterNum);
        $('.order .item h4:eq(1)').text(key.AvgWatertime);
        $('.order .item h4:eq(2)').text(key.AvgHeattime);
    }); */
    //定时器 
   /*  var index = 0;
    var aclick = $('.order a');
    setInterval(function () {
        index++;
        if (index > 3) {
            index = 0;
        }
        //每san秒调用点击事件
        aclick.eq(index).click();
    }, 3000); */
},

 youxia () {

       this.province=this.first_province
        //if key==0{
          console.log(this.equ)
          if(this.province_score.length==5){
                var data = [
        { name: this.equ[4].sixth_equ, num: '' }, 
         { name: this.equ[4].fifth_equ, num: '' },
        { name: this.equ[4].fourth_equ, num: '' },
         { name: this.equ[4].third_equ, num: '' },
         { name: this.equ[4].second_equ, num: '' },
        { name: this.equ[4].first_equ, num: ''}, 
    ]
          }
         if(this.province_score.length==4){
                var data = [
        { name: this.equ[3].sixth_equ, num: '' }, 
         { name: this.equ[3].fifth_equ, num: '' },
        { name: this.equ[3].fourth_equ, num: '' },
         { name: this.equ[3].third_equ, num: '' },
         { name: this.equ[3].second_equ, num: '' },
        { name: this.equ[3].first_equ, num: ''}, 
    ]
          }         if(this.province_score.length==3){
                var data = [
        { name: this.equ[2].sixth_equ, num: '' }, 
         { name: this.equ[2].fifth_equ, num: '' },
        { name: this.equ[2].fourth_equ, num: '' },
         { name: this.equ[2].third_equ, num: '' },
         { name: this.equ[2].second_equ, num: '' },
        { name: this.equ[2].first_equ, num: ''}, 
    ]
          }         if(this.province_score.length==2){
                var data = [
        { name: this.equ[1].sixth_equ, num: '' }, 
         { name: this.equ[1].fifth_equ, num: '' },
        { name: this.equ[1].fourth_equ, num: '' },
         { name: this.equ[1].third_equ, num: '' },
         { name: this.equ[1].second_equ, num: '' },
        { name: this.equ[1].first_equ, num: ''}, 
    ]
          }         if(this.province_score.length==1){
                var data = [
        { name: this.equ[0].sixth_equ, num: '' }, 
         { name: this.equ[0].fifth_equ, num: '' },
        { name: this.equ[0].fourth_equ, num: '' },
         { name: this.equ[0].third_equ, num: '' },
         { name: this.equ[0].second_equ, num: '' },
        { name: this.equ[0].first_equ, num: ''}, 
    ]
          }
    $('.inner').on('mouseenter', '.sup li', function () {
    //    $(this).addClass('active').siblings().removeClass('active');
        //获取随机的值  sort方法 是给数组排序 a-b是从小到大
        //.5-随机0-1的数 可能为正可能为负 排序就会随机
        var radomData = data.sort(function (a, b) {  });
        var html1 = '';
        radomData.forEach(function (item) {
            html1 += `<li>
                    <span>${item.name}</span>
                   <span>${item.num} </span>
</li>`;
        });
        //渲染
        $('.sub').html(html1);
    });
    $('.province .sup li').eq(0).mouseenter();
    var index = 0;

},
youxia1 () {

       this.province=this.second_province
        //if key==0{
          if (this.province_score.length==5){
                var data = [
  { name: this.equ[3].sixth_equ, num: '' },
   { name: this.equ[3].fifth_equ, num: '' },
    { name: this.equ[3].fourth_equ, num: '' },
  { name: this.equ[3].third_equ, num: '' },
 { name: this.equ[3].second_equ, num: '' },
        { name: this.equ[3].first_equ, num: ''},
       
//}
    ]
          }
          if (this.province_score.length==4){
                var data = [
  { name: this.equ[2].sixth_equ, num: '' },
   { name: this.equ[2].fifth_equ, num: '' },
    { name: this.equ[2].fourth_equ, num: '' },
  { name: this.equ[2].third_equ, num: '' },
 { name: this.equ[2].second_equ, num: '' },
        { name: this.equ[2].first_equ, num: ''},
       
//}
    ]
          }
        if (this.province_score.length==3){
                var data = [
  { name: this.equ[1].sixth_equ, num: '' },
   { name: this.equ[1].fifth_equ, num: '' },
    { name: this.equ[1].fourth_equ, num: '' },
  { name: this.equ[1].third_equ, num: '' },
 { name: this.equ[1].second_equ, num: '' },
        { name: this.equ[1].first_equ, num: ''},
       
//}
    ]
          }
                  if (this.province_score.length==2){
                var data = [
  { name: this.equ[0].sixth_equ, num: '' },
   { name: this.equ[0].fifth_equ, num: '' },
    { name: this.equ[0].fourth_equ, num: '' },
  { name: this.equ[0].third_equ, num: '' },
 { name: this.equ[0].second_equ, num: '' },
        { name: this.equ[0].first_equ, num: ''},
       
//}
    ]
          }          

    $('.inner').on('mouseenter', '.sup li', function () {
    //    $(this).addClass('active').siblings().removeClass('active');
        //获取随机的值  sort方法 是给数组排序 a-b是从小到大
        //.5-随机0-1的数 可能为正可能为负 排序就会随机
        var radomData = data.sort(function (a, b) {  });
        var html1 = '';
        radomData.forEach(function (item) {
            html1 += `<li>
                    <span>${item.name}</span>
                   <span>${item.num} </s></span>
</li>`;
        });
        //渲染
        $('.sub').html(html1);
    });
    $('.province .sup li').eq(0).mouseenter();
    var index = 0;

},
youxia2 () {

      this.province=this.third_province
        //if key==0{
          if(this.province_score.length==5){
              var data = [
        { name: this.equ[2].sixth_equ, num: '' }, 
         { name: this.equ[2].fifth_equ, num: '' },
        { name: this.equ[2].fourth_equ, num: '' },
         { name: this.equ[2].third_equ, num: '' },
         { name: this.equ[2].second_equ, num: '' },
        { name: this.equ[2].first_equ, num: ''}, 
    ]
          }
          if(this.province_score.length==4){
              var data = [
        { name: this.equ[1].sixth_equ, num: '' }, 
         { name: this.equ[1].fifth_equ, num: '' },
        { name: this.equ[1].fourth_equ, num: '' },
         { name: this.equ[1].third_equ, num: '' },
         { name: this.equ[1].second_equ, num: '' },
        { name: this.equ[1].first_equ, num: ''}, 
    ]
          }      if(this.province_score.length==3){
              var data = [
        { name: this.equ[0].sixth_equ, num: '' }, 
         { name: this.equ[0].fifth_equ, num: '' },
        { name: this.equ[0].fourth_equ, num: '' },
         { name: this.equ[0].third_equ, num: '' },
         { name: this.equ[0].second_equ, num: '' },
        { name: this.equ[0].first_equ, num: ''}, 
    ]
          }
    $('.inner').on('mouseenter', '.sup li', function () {
    //    $(this).addClass('active').siblings().removeClass('active');
        //获取随机的值  sort方法 是给数组排序 a-b是从小到大
        //.5-随机0-1的数 可能为正可能为负 排序就会随机
        var radomData = data.sort(function (a, b) {  });
        var html1 = '';
        radomData.forEach(function (item) {
            html1 += `<li>
                    <span>${item.name}</span>
                   <span>${item.num} </s></span>
</li>`;
        });
        //渲染
        $('.sub').html(html1);
    });
    $('.province .sup li').eq(0).mouseenter();
    var index = 0;

},
youxia3 () {
this.province=this.fourth_province
      
        //if key==0{
          if(this.province_score.length==5){
               var data = [
        { name: this.equ[1].sixth_equ, num: '' }, 
         { name: this.equ[1].fifth_equ, num: '' },
        { name: this.equ[1].fourth_equ, num: '' },
         { name: this.equ[1].third_equ, num: '' },
         { name: this.equ[1].second_equ, num: '' },
        { name: this.equ[1].first_equ, num: ''}, 
    ]
          }
          if(this.province_score.length==4){
               var data = [
        { name: this.equ[0].sixth_equ, num: '' }, 
         { name: this.equ[0].fifth_equ, num: '' },
        { name: this.equ[0].fourth_equ, num: '' },
         { name: this.equ[0].third_equ, num: '' },
         { name: this.equ[0].second_equ, num: '' },
        { name: this.equ[0].first_equ, num: ''}, 
    ]
          }
    $('.inner').on('mouseenter', '.sup li', function () {
    //    $(this).addClass('active').siblings().removeClass('active');
        //获取随机的值  sort方法 是给数组排序 a-b是从小到大
        //.5-随机0-1的数 可能为正可能为负 排序就会随机
        var radomData = data.sort(function (a, b) {  });
        var html1 = '';
        radomData.forEach(function (item) {
            html1 += `<li>
                    <span>${item.name}</span>
                   <span>${item.num} </s></span>
</li>`;
        });
        //渲染
        $('.sub').html(html1);
    });
    $('.province .sup li').eq(0).mouseenter();
    var index = 0;

},
youxia4 () {
this.province=this.fifth_province
     
        //if key==0{
          if(this,this.province_score.length==5){
              var data = [
        { name: this.equ[0].sixth_equ, num: '' }, 
         { name: this.equ[0].fifth_equ, num: '' },
        { name: this.equ[0].fourth_equ, num: '' },
         { name: this.equ[0].third_equ, num: '' },
         { name: this.equ[0].second_equ, num: '' },
        { name: this.equ[0].first_equ, num: ''}, 
    ] 
          }

    
    
    $('.inner').on('mouseenter', '.sup li', function () {
    //    $(this).addClass('active').siblings().removeClass('active');
        //获取随机的值  sort方法 是给数组排序 a-b是从小到大
        //.5-随机0-1的数 可能为正可能为负 排序就会随机
        var radomData = data.sort(function (a, b) {  });
        var html1 = '';
        radomData.forEach(function (item) {
            html1 += `<li>
                    <span>${item.name}</span>
                   <span>${item.num} </s></span>
</li>`;
        });
        //渲染
        $('.sub').html(html1);
    });
    $('.province .sup li').eq(0).mouseenter();
    var index = 0;

},



  },
  
}


</script>


<style scoped > 
.table-a{
  position: absolute;
  top: 73%;
  left: 5%;
  width: 90%;
}
/**表格背景透明 */
/*透明化整体*/
.table-a /deep/  .el-table,
.el-table__expanded-cell {
  background-color: transparent !important;
}
/*透明化行、单元格,删除表头下横线*/
.table-a /deep/ tr, .table-a /deep/ th, .table-a /deep/ td {
  background: #1439391c !important;
  color:#fff;
  border-bottom: 0px; /*删除表头下横线*/
}
/* 删除表格下横线 *//*去除最底下的横线 */
.table-a ::v-deep .el-table::before {
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0px;
}
/*hover时样式*/
.table-a /deep/  .el-table tbody tr:hover>td {
  background-color: #29c2c278 !important
}
/* 表格内容(有用)*/
.table-a /deep/ .el-table__row {
  background: #1439391c !important;
  color: #46d4ff;
}
    body{
    line-height: 1.15;
    font-size: 0.5rem;
    margin: 0;
    padding: 0;
    background-repeat: no-repeat;
    background-position: 0 0 / cover;
    background-color: #101129;
}
*{
    margin: 0;
    padding: 0;
    font-weight: normal;
}
ul{
    list-style: none;
}
a{
    text-decoration: none;
}
.viewport {
    /* 限定大小 */
    min-width: 1024px;
    max-width: 1920px;
    min-height: 780px;
    margin: 0 auto;
    background: url(../../assets/images/logo5.png) no-repeat 0 0 / contain;
    display: flex;
    padding: 3.667rem 0.833rem 0;
}
.column{
    flex: 3;
    position: relative;
}
.column:nth-child(2){
    flex: 4;
    margin: 1.333rem 0.833rem 0;
}
.panel {
    /* 边框 */
    box-sizing: border-box;
    border: 2px solid red;
    border-image: url(../../assets/images/border.png) 51 38 21 132;
    border-width: 2.125rem 1.583rem 0.875rem 5.5rem;
    position: relative;
    margin-bottom: 0.833rem;
}
.panel .inner {
    /* 装内容 */
    /* height: 60px; */
    position: absolute;
    top: -2.125rem;
    right: -1.583rem;
    bottom: -0.875rem;
    left: -5.5rem;
    padding: 1rem 1.5rem;
}
.panel h3{
    font-size: 0.833rem;
    color: #fff;
}
.panel h11{
    color: #fff;
}
.panel #freespace{
		width:100%;
		/* height: calc(100% - 5px); */
		height:100%;
	}
/* 概览区域 */
.overview{
    height: 4.583rem;
  }
  .overview .inner{
    display: flex;
    justify-content: space-between;
  }
  .overview h4{
    font-size: 1.167rem;
    padding-left: 0.2rem;
    color: #fff;
    margin-bottom: 0.333rem
  }
  .overview span{
    font-size: 0.667rem;
    color: #4c9bfd;
}
/* 监控 */
.monitor{
	height: 20rem;
  }
  .monitor .inner{
	padding: 1rem 0;
	display: flex;
	flex-direction: column;
  }
  .monitor .tabs{
	padding: 0 1.5rem;
	margin-bottom: 0.75rem;
  }
  .monitor .tabs a{
	color: #1950c4;
	font-size: 0.75rem;
	padding: 0 1.125rem;
  }
  
  .monitor .tabs a:first-child{
	border-right: 0.083rem solid #00f2f1;
	padding-left: 0;
  }
  
  .monitor .tabs a.active{
	color: #fff;
  }
  .monitor .content{
	flex: 1;
	display: none;
	position: relative;
  }
  .monitor .head{
	background: rgba(255, 255, 255, 0.1);
	font-size: 0.583rem;
	padding: 0.5rem 1.5rem;
	color: #68d8fe;
	display: flex;
	justify-content: space-between;
	line-height: 1.05;
  }
  .monitor .col:nth-child(1) {
	width: 3.2rem;
  }
  .monitor .col:nth-child(2) {
	width: 8.4rem;
	/* 不换行  一行省略*/
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
  }
  .monitor .col:nth-child(3) {
	width: 3.2rem;
  }
  .monitor .marquee-view{
  position: absolute;
  top: 1.6rem;
  bottom: 0; 
  width: 100%; 
  overflow: hidden;
}

.monitor .row{
  line-height: 1.05;
  padding: 0.5rem 1.5rem;
  color: #61a8ff;
  font-size: 0.5rem;
  position: relative;
  display: flex;
  justify-content: space-between;
}
.monitor .row:hover{
  color:#68d8ff;
  background: rgba(255, 255, 255, 0.1);
}
.monitor .row:hover .icon-dot{
  opacity: 1;
}

.monitor .icon-dot{
  position: absolute;
  left: 0.64rem;
  opacity: 0;
}
.monitor .marquee-view{
	position: absolute;
	top: 1.6rem;
	bottom: 0; 
	width: 100%; 
	overflow: hidden;
  }
  
  .monitor .row{
	line-height: 1.05;
	padding: 0.5rem 1.5rem;
	color: #61a8ff;
	font-size: 0.5rem;
	position: relative; 
	display: flex;
	justify-content: space-between;
  }
  .monitor .row:hover{
	color:#68d8ff;
	background: rgba(255, 255, 255, 0.1);
  }
  .monitor .row:hover .icon-dot{
	opacity: 1;
  }
  
  .monitor .icon-dot{
	position: absolute;
	left: 0.64rem;
	opacity: 0;
}
/* ------------------------------------------------------------动画 */
@keyframes row{
  0%{}
  100%{
    transform: translateY(-50%);
  }
}
/* 调用动画 */
.monitor .marquee {
  /* //infinite永久调用动画 */
  animation: row  10s linear infinite;
}
/*鼠标划入 停止动画  */
.monitor .marquee:hover {
  animation-play-state: paused;
}
/* 点位 */
.point {
  height: 14.167rem;
}
.point .chart {
  display: flex;
  margin-top: 0rem;
  justify-content: space-between;
}
#pie {
  width: 13rem;
  height: 10rem;
  margin-left: -0.4rem;
}
.point .data {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 7rem;
  padding: 1.5rem 1.25rem;
  box-sizing: border-box;
  background-image: url(../../assets/images/rect.png);
  background-size: cover;
}
.point h4 {
  margin-bottom: 0.5rem;
  font-size: 1.167rem;
  color: #fff;
}
.point span {
  display: block;
  color: #4c9bfd;
  font-size: 0.667rem;
}
.point .filter {
  display: flex;
}
.point .filter a {
  display: block;
  height: 0.75rem;
  line-height: 1;
  padding: 0 0.75rem;
  color: #1950c4;
  font-size: 0.75rem;
  border-right: 0.083rem solid #00f2f1;
}
.point .filter a:first-child {
  padding-left: 0;
}
.point .filter a:last-child {
  border-right: none;
}
.point .filter a.active {
  color: #fff;
  font-size: 0.833rem;
}
/* 挖掘 */
.excavate {
  height: 14.167rem;
}
.excavate .chart {
  display: flex;
  margin-top: 0rem;
  justify-content: space-between;
}
#excavateline {
   width: 100%;
  height: 100%;
  /* margin-left: -0.4rem; */
}
.excavate h11 {
  /* margin-bottom: 0.5rem; */
  font-size: 1.167rem;
  color: #fff;
}
/* 迁移 */
.qianyi {
  height: 14.167rem;
}
.qianyi .chart {
  display: flex;
  margin-top: 0rem;
  justify-content: space-between;
}
#qianyiline {
   width: 100%;
  height: 100%;
  /* margin-left: -0.4rem; */
}
.qianyi h11 {
  /* margin-bottom: 0.5rem; */
  font-size: 1.167rem;
  color: #fff;
}
/* 地图  */
.map {
  height: 24.1rem;
  margin-bottom: 0.833rem;
  display: flex;
  flex-direction: column;
}
.map h3 {
  line-height: 1;
  padding: 0.667rem 0;
  margin: 0;
  font-size: 0.833rem;
  color: #fff;
}
.map .icon-cube {
  color: #68d8fe;
}
.map .chart {
  flex: 1;
  background-color: rgba(255, 255, 255, 0.05);
}
#geo {
  width: 100%;
  height: 100%;
}
.map .filter {
  display: flex;
}
.map .filter a {
  display: block;
  height: 0.75rem;
  line-height: 1;
  padding: 0 0.75rem;
  color: #1950c4;
  font-size: 0.75rem;
  border-right: 0.083rem solid #00f2f1;
}
.map .filter a:first-child {
  padding-left: 0;
}
.map .filter a:last-child {
  border-right: none;
}
.map .filter a.active {
  color: #fff;
  font-size: 0.833rem;
}
/* 型号排名 */
.users {
  height: 14.167rem;
  display: flex;
}
.users .chart {
  display: flex;
  margin-top: 1rem;
}
#bar {
  width: 24.5rem;
  height: 10rem;
}
.users .data {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 7rem;
  padding: 1.5rem 1.25rem;
  box-sizing: border-box;
  background-image: url(../../assets/images/rect.png);
  background-size: cover;
}
.users h4 {
  margin-bottom: 0.5rem;
  font-size: 1.167rem;
  color: #fff;
}
.users span {
  display: block;
  color: #4c9bfd;
  font-size: 0.667rem;
}
.users .filter {
  display: flex;
}
.users .filter a {
  display: block;
  height: 0.75rem;
  line-height: 1;
  padding: 0 0.75rem;
  color: #1950c4;
  font-size: 0.75rem;
  border-right: 0.083rem solid #00f2f1;
}
.users .filter a:first-child {
  padding-left: 0;
}
.users .filter a:last-child {
  border-right: none;
}
.users .filter a.active {
  color: #fff;
  font-size: 0.833rem;
}
/* 订单 */
.order {
  height: 6.167rem;
}
.order .filter {
  display: flex;
}
.order .filter a {
  display: block;
  height: 0.75rem;
  line-height: 1;
  padding: 0 0.75rem;
  color: #1950c4;
  font-size: 0.75rem;
  border-right: 0.083rem solid #00f2f1;
}
.order .filter a:first-child {
  padding-left: 0;
}
.order .filter a:last-child {
  border-right: none;
}
.order .filter a.active {
  color: #fff;
  font-size: 0.833rem;
}
.order .data {
  display: flex;
  margin-top: 0.833rem;
}
.order .item {
  width: 50%;
}
.order h4 {
  font-size: 1.167rem;
  color: #fff;
  margin-bottom: 0.417rem;
}
.order span {
  display: block;
  color: #4c9bfd;
  font-size: 0.667rem;
}
/* 销售区域 */
.sales {
  height: 10.333rem;
}
.sales .caption {
  display: flex;
  line-height: 1;
}
.sales h3 {
  height: 0.75rem;
  padding-right: 0.75rem;
  border-right: 0.083rem solid #00f2f1;
}
.sales a {
  padding: 0.167rem;
  font-size: 0.667rem;
  margin: -0.125rem 0 0 0.875rem;
  border-radius: 0.125rem;
  color: #0bace6;
}
.sales a.active {
  background-color: #4c9bfd;
  color: #fff;
}
.sales .inner {
  display: flex;
  flex-direction: column;
}
.sales .chart {
  flex: 1;
  padding-top: 0.6rem;
  position: relative;
}
.sales .label {
  position: absolute;
  left: 1.75rem;
  top: 0.75rem;
  color: #4996f5;
  font-size: 0.583rem;
}
#line {
  width: 100%;
  height: 100%;
}
/* 渠道区块 */
.wrap {
  display: flex;
}
.channel,
.quarter {
  flex: 1;
  height: 9.667rem;
}
.channel {
  margin-right: 1rem;
}
.channel .data {
  overflow: hidden;
}
.channel .item {
  margin-top: 0.85rem;
}
.channel .item:first-child {
  float: left;
}
.channel .item:last-child {
  float: right;
}
.channel h4 {
  color: #fff;
  font-size: 1.333rem;
  margin-bottom: 0.2rem;
}
.channel small {
  color: #fff;
  font-size: 0.75rem;
}
.channel span {
  display: block;
  color: #4c9bfd;
  font-size: 0.583rem;
}
.channel .filter {
  display: flex;
}
.channel .filter a {
  display: block;
  height: 0.75rem;
  line-height: 1;
  padding: 0 0.75rem;
  color: #1950c4;
  font-size: 0.75rem;
  border-right: 0.083rem solid #00f2f1;
}
.channel .filter a:first-child {
  padding-left: 0;
}
.channel .filter a:last-child {
  border-right: none;
}
.channel .filter a.active {
  color: #fff;
  font-size: 0.833rem;
}
/* 季度区块 */
.quarter .inner {
  display: flex;
  flex-direction: column;
  margin: 0 -0.25rem;
}
.quarter .chart {
  flex: 1;
  padding-top: 0.75rem;
}
.quarter .box {
  position: relative;
}
.quarter .label {
  transform: translate(-50%, -30%);
  color: #fff;
  font-size: 1.25rem;
  position: absolute;
  left: 50%;
  top: 50%;
}
.quarter .label small {
  font-size: 50%;
}
#gauge {
  height: 3.5rem;
}
.quarter .data {
  display: flex;
  justify-content: space-between;
}
.quarter .item {
  width: 50%;
}
.quarter h4 {
  color: #fff;
  font-size: 1rem;
  margin-bottom: 0.4rem;
}
.quarter span {
  display: block;
  width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  color: #4c9bfd;
  font-size: 0.583rem;
}
/* 排行榜 */
.top {
  height: 11.8rem;
}
.top .inner {
  display: flex;
}
.top .all {
  display: flex;
  flex-direction: column;
  width: 7rem;
  color: #4c9bfd;
  font-size: 0.6rem;
  vertical-align: middle;
}
.top .all ul {
  padding-left: 0.5rem;
  margin-top: 0.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.top .all li {
  overflow: hidden;
}
.top .all [class^="icon-"] {
  font-size: 1.5rem;
  vertical-align: middle;
  margin-right: 0.5rem;
}
.top .province {
  flex: 1;
  display: flex;
  flex-direction: column;
  color: #fff;
}
.top .province i {
  padding: 0 0rem;
  margin-top: 0.208rem;
  float: right;
  font-style: normal;
  font-size: 0.583rem;
  color: #0bace6;
}
.top .province s {
  display: inline-block;
  transform: scale(0.8);
  text-decoration: none;
}
.top .province .icon-up {
  color: #dc3c33;
}
.top .province .icon-down {
  color: #36be90;
}
.top .province .data {
  flex: 1;
  display: flex;
  margin-top: 0.6rem;
}
.top .province ul {
  flex: 1;
  line-height: 1;
  margin-bottom: 0.25rem;
}
.top .province ul li {
  display: flex;
  justify-content: space-between;
}
.top .province ul span {
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.top .province ul.sup {
  font-size: 0.583rem;
}
.top .province ul.sup li {
  color: #4995f4;
  padding: 0.5rem;
}
.top .province ul.sup li.active {
  color: #a3c6f2;
  background-color: rgba(10, 67, 188, 0.2);
}
.top .province ul.sub {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  font-size: 0.5rem;
  background-color: rgba(10, 67, 188, 0.2);
}
.top .province ul.sub li {
  color: #52ffff;
  padding: 0.417rem 0.6rem;
}
.clock {
  position: absolute;
  top: -1.5rem;
  right: 1.667rem;
  font-size: 0.833rem;
  color: #0bace6;
}
.clock i {
  margin-right: 5px;
  font-size: 0.833rem;
}
@media screen and (max-width: 1600px) {
  .top span {
    transform: scale(0.9);
  }
  .top .province ul.sup li {
    padding: 0.4rem 0.5rem;
  }
  .top .province ul.sub li {
    padding: 0.23rem 0.5rem;
  }
  .quarter span {
    transform: scale(0.9);
  }
}
/* 剩余空间 */
.free {
  height: 14.167rem;
  display: flex;
}

.users h4 {
  margin-bottom: 0.5rem;
  font-size: 1.167rem;
  color: #fff;
}
.users span {
  display: block;
  color: #4c9bfd;
  font-size: 0.667rem;
}

/* 昨日剩余空间 */
.freeday{
  flex:0.8;
  height: 9.667rem;
}
.freeday .inner {
  display: flex;
  flex-direction: column;
  margin: 0 -0.85rem;
   
}
.freeday .chart {
  flex: 1;
  padding-top: 0.95rem;
}
.freeday .box {
  position: relative;
}
.freeday .label {
  transform: translate(-50%, -30%);
  color: #fff;
  font-size: 1rem;
  position: absolute;
  left: 50%;
  top: 50%;
}
.freeday .label small {
  font-size: 50%;
}
#gauge {
  height:3rem;
  width: 100%;
}
.freeday .data {
  display: flex;
  justify-content: space-between;
}
.freeday .item {
  width: 50%;
}
.freeday h4 {
  color: #fff;
  font-size: 1rem;
  margin-bottom: 0.4rem;
}
.freeday span {
  display: block;
  width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  color: #4c9bfd;
  font-size: 0.583rem;
}


</style>