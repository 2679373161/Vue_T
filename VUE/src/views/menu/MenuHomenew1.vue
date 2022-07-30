<template>
	<div class="Bigdiv">
	<!-- <div class="header">
		<span>物业数据平台</span>
	</div> -->
	<div class="divBox">
		<div class="el-col el-col-24 left">
				<div class="el-col el-col-6">
				<div class="bg">
					<h5 class="title"><span></span>{{provinceTitle}}</h5>
					<div  id="propertyFee"></div>
				</div>
			</div>
			<div class="el-col el-col-6">
				<div class="bg">
					<h5 class=" title"><span></span>{{cityTitle}}</h5>
					<div  id="businessIncome"></div>
				</div>
			</div>
			<div class="el-col el-col-6">
				<div class="bg">
					<h5 class="title"><span></span>{{typeTitle}}</h5>
					<div id="netProfit"></div>
				</div>
			</div>
			<div class="el-col el-col-6">
				<div class="bg">
					<h5 class="title"><span></span>{{applianceTitle}}</h5>
					<div id="liabilities"></div>
				</div>
			</div>
		

		</div>
		<div class="el-col el-col-24 bottom">
			<div class="el-col el-col-6 bottomL">
				<div>
					<div class="bg">
						<h5 class="title"><span></span>全国用水片段一周统计图{{timeTitle}}</h5>
						<div id="personNum"></div>
					</div>
				</div>
				<div>
					<div class="bg">
						<h5 class="title"><span></span>上月最差型号{{worsttypetrendTitle}}月份趋势走向</h5>
						<div id="prepaidPropertyCharges"></div>
					</div>
				</div>
				<div>
					<div class="bg">
						<h5 class="title"><span></span>{{freespaceTitle}}</h5>
						<div id="freespace"></div>
					</div>
				</div>
			</div>
			<div class="el-col el-col-12 bottomC">
				<div class="bg">
					<div class="el-col el-col-12 pos-rela">
					<!--<h5 class="title"><span></span>{{waterElectricTitle}}</h5>-->
						<div class="gaojingBox">
							<div id="equipmentChart"></div>
						</div>

						<!-- <div class="pub-pos-a map-left-value">
							<ul>
								<li  v-for="(item,index) in companyleft"  :key="index" >{{item}}</li>
							</ul>
						</div>
						<div class="pub-pos-a map-right-value">
							<ul>
								<li  v-for="(item,index) in companyright"  :key="index" >{{item}}</li>
							</ul>
						</div> -->
						<div class="charge">
						  	<div   v-for="(item,index) in realData"  :key="index"  class="el-col-8 yesterday">
								<label class="font-s">{{item.title}}<span class="font-s-data">{{item.time}}</span></label>
								<h1 >{{item.money}}<span class="font-s-unit">{{item.unit}}</span></h1>
							</div>
						</div>
						<div class="bottom-Statistics clearfix">
							<div  v-for="(item,index) in realData1"  :key="index"  class="yesterday float-left-c">
								<label class="font-s">{{item.title}}</label>
								<h1 >{{item.data}}<span class="font-s-unit">{{item.unit}}</span></h1>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="el-col el-col-6 bottomR">
				<div>
					<div class="bg">
						<h5 class="title"><span></span>{{regiontrendTitle}}</h5>
						<div id="propertyFeeid"></div>
					</div>
				</div>
				<div>
					<div class="bg">
						<h5 class="title"><span></span>{{trendTitle}}</h5>
						<div id="waterElectric"></div>
					</div>
				</div>
				<!-- <div>
					<div class="bg">
						<h5 class="title"><span></span>{{operationsMultipleTitle}}</h5>
						<div id="operationsMultiple"></div>
					</div>
				</div> -->
			</div>

		</div>
	</div>
</div>
</template>

<script>
  import echarts from 'echarts'
  import request from '@/utils/request';
  import CONSTANTS from '../../../public/data/Constants.js';
  import china from 'echarts/map/json/china.json'
  echarts.registerMap('china', china)
  var geoid={};
  var data = {name:[],equipment_num:[],tempscore3:[],waterscore3:[]};
  var temporderinprovince={
    itemTitle:['温度评分','水流量评分'],
    xAxisData:[],//省份名
    seriesBarData:[], //温度评分
    seriesBarData1:[],//水流量评分
  }
  var temporderincity={
    itemTitle:['温度评分','水流量评分'],
    xAxisData:[],//城市名
    seriesBarData:[], //温度评分
    seriesBarData1:[],//水流量评分
  }
  var temporderintype={
    itemTitle:['温度评分','水流量评分'],
    xAxisData:[],//型号
    seriesBarData:[], //温度评分
    seriesBarData1:[],//水流量评分
  }
  var temporderinappliance={
    itemTitle:['温度评分','水流量评分'],
    xAxisData:[],//设备
    seriesBarData:[], //温度评分
    seriesBarData1:[],//水流量评分
  }
  var nationaltrendinmonth={
    itemTitle:['温度评分','水流量评分'],
    xAxisData:[],//省份名
    seriesLineData1:[], //温度评分
    seriesLineData2:[],//水流量评分
  }
  var worsttypetrendinmonth={
    itemTitle:['温度评分','水流量评分'],
    xAxisData:[],//月份
    seriesLineData1:[], //温度评分
    seriesLineData2:[],//水流量评分
  }
  var behaviorTime={
	  itemTitle:['加热正常、恒温正常','加热异常、恒温正常','加热正常、恒温异常','加热异常、恒温异常'],
	  data:
      [
        {value:0, name:'加热正常、恒温正常'},
        {value:0, name:'加热异常、恒温正常'},
        {value:0, name:'加热正常、恒温异常'},
        {value:0, name:'加热异常、恒温异常'},
      ]
	}
  var remainingfreespace={
    xAxisData:[],//日期
    seriesLineData:[], //剩余空间
	tooltip:[],
  }
  var Regiontempwater=[]
  var region=[]
	export default {
	  name: 'hello',
	  components: {
		// ColumnarBrokenLine
	  },
	  data () {
	    return {
				msg: '',
				cityTitle:'上月城市温度评分排名',
				typeTitle:'上月型号温度评分排名',
				applianceTitle:'上月设备温度评分排名',
				provinceTitle:'上月省份温度评分排名',
				timeTitle:'',
				trendTitle:'全国评分月份趋势走向',
				regiontrendTitle:"全国区域月份趋势走向(温度评分)",
				worsttypetrendTitle:"",
				freespaceTitle:"服务器剩余空间日趋势（最近一个月）",
				realData:[
                {
                  title:'全国数据总量',
                  time:'',
                  money:'',
                  unit:'万条',
                },
                {
                  title:'累计数据总量',
                  time:'',
      			  money:'',
     			  unit:'百万条'
    			},
                {
                  title:'目前所剩空间',
                  time:'',
      			  money:'',
     			  unit:'G'
    			}
  				],
                realData1:[
                {
        		  title:'在管城市',
        		  data:'',
        		  unit:'个'
        		},
        		{
        		  title:'在管型号',
        		  data:'',
        		  unit:'个'
        		},
        		{
        		  title:'在管设备',
        		  data:'',
        		  unit:'台'
        		},
    			], //  地图收费统计


	    }
	 },
  mounted(){
    this.temporder()
    setTimeout(() => {
      this.temp_order_in_city('businessIncome'); //温度排名  城市（画图）
	    this.temp_order_in_type('netProfit'); //温度排名  型号（画图）
	    this.temp_order_in_appliance('liabilities');//温度排名  设备（画图）
	  this.temp_order_in_province('propertyFee'); //当年物业费
	  this.personNumFn(); //上月最差设备行为时长分布
	 this.freespaceFn(); //剩余空间
	  this.waterElectricFn(); //全国月份趋势走向
	  this.regionMonthFn();// 全国区域月份趋势走向
	  this.worstTypeMonthFn();// 最差型号月份趋势走向
	  this.drawMap();  //地图
    },800)
  },
  methods: {
	  //温度排名  省份（画图）
	temp_order_in_province(id){
        // 基于准备好的dom，初始化echarts实例
    	var nowChartBusinessIncome = this.$echarts.init(document.getElementById(id));
        // 绘制柱状折线图-营业收入统计
        var optionBusiness = {
			tooltip : {
				trigger: 'axis'
			},
			calculable : true,
			legend: {
				data:temporderinprovince.itemTitle,
		        textStyle:{//图例文字的样式
           			color:'#fff',
				   },
			},
			grid: {
		        left: '3%',
		        right: '4%',
		        bottom: '10%',
		        top:'20%',
		        containLabel: true
		    },
			xAxis : [
				{
					type : 'category',
					data : temporderinprovince.xAxisData,
					axisLabel : {
						formatter: '{value}',
						textStyle:{
							color:'#fff',
							fontSize:10,
						},
            interval: 0, 
            rotate: 30
					}
				}
			],
			yAxis : [
				{
					type : 'value',
					name : '评分',
					left:'10',
					min: 0,
          // max: 60000,
          // interval: 20000,
					axisLabel : {
						formatter: '{value}',
						textStyle:{
							color:'#fff',
							fontSize:10
						},
					},
					splitLine : {
						show:true,
						lineStyle: {
							color: '#5e6067',
							type: 'dashed',
							width: 1
						}
          },
					nameTextStyle:{
						color:'#fff',
					}
				}
			],
			series : [
				{
					name:'温度评分',
					type:'bar',
					barWidth : 5,
					data:temporderinprovince.seriesBarData,
					itemStyle: {
						normal: {
							color: '#ad2727',
						},
					}
				},
				{
					name:'水流量评分',
					type:'bar',
                    barWidth : 5,
					itemStyle: {
						normal: {
							color: '#2774a0',
						},
          },
					data:temporderinprovince.seriesBarData1
				}
			]
		};


    	if (optionBusiness && typeof optionBusiness === "object") {
		    nowChartBusinessIncome.setOption(optionBusiness, true);
		  }
	} ,
	//温度排名  城市（画图）
	temp_order_in_city(id){
        // 基于准备好的dom，初始化echarts实例
    	var nowChartBusinessIncome = this.$echarts.init(document.getElementById(id));
        // 绘制柱状折线图-营业收入统计
        var optionBusiness = {
			tooltip : {
				trigger: 'axis'
			},
			calculable : true,
			legend: {
				data:temporderincity.itemTitle,
		        textStyle:{//图例文字的样式
           			color:'#fff',
				   },
			},
			grid: {
		        left: '3%',
		        right: '4%',
		        bottom: '10%',
		        top:'20%',
		        containLabel: true
		    },
			xAxis : [
				{
					type : 'category',
					data : temporderincity.xAxisData,
					axisLabel : {
						formatter: '{value}',
						textStyle:{
							color:'#fff',
							fontSize:10,
						},
            interval: 0, 
            rotate: 30
					}
				}
			],
			yAxis : [
				{
					type : 'value',
					name : '评分',
					left:'10',
					min: 0,
          // max: 60000,
          // interval: 20000,
					axisLabel : {
						formatter: '{value}',
						textStyle:{
							color:'#fff',
							fontSize:10
						},
					},
					splitLine : {
						show:true,
						lineStyle: {
							color: '#5e6067',
							type: 'dashed',
							width: 1
						}
          },
					nameTextStyle:{
						color:'#fff',
					}
				}
			],
			series : [
				{
					name:'温度评分',
					type:'bar',
					barWidth : 5,
					data:temporderincity.seriesBarData,
					itemStyle: {
						normal: {
							color: '#ad2727',
						},
					}
				},
				{
					name:'水流量评分',
					type:'bar',
          barWidth : 5,
					itemStyle: {
						normal: {
							color: '#2774a0',
						},
          },
					data:temporderincity.seriesBarData1
				}
			]
		};


    	if (optionBusiness && typeof optionBusiness === "object") {
		    nowChartBusinessIncome.setOption(optionBusiness, true);
		  }
	} ,
  //温度排名（调取）
  temporder(){
    request.post('indextemp/page/menu', null, {
      params:
      { 
      },
    }).then(({ data: response }) => {
      console.log(response.data.province)
      temporderincity.xAxisData=response.data.city
      temporderincity.seriesBarData=response.data.tempscore
      temporderincity.seriesBarData1=response.data.waterscore
      temporderintype.xAxisData=response.data.dev_type
      temporderintype.seriesBarData=response.data.tempscore1
      temporderintype.seriesBarData1=response.data.waterscore1
      temporderinappliance.xAxisData=response.data.dev_id
      temporderinappliance.seriesBarData=response.data.tempscore2
      temporderinappliance.seriesBarData1=response.data.waterscore2
      data.name=response.data.province
      data.equipment_num=response.data.equipment_num
      data.tempscore3=response.data.tempscore3
      data.waterscore3=response.data.waterscore3
	  temporderinprovince.xAxisData=response.data.province1
      temporderinprovince.seriesBarData=response.data.tempscore4
      temporderinprovince.seriesBarData1=response.data.waterscore4
	  nationaltrendinmonth.xAxisData=response.data.months
      nationaltrendinmonth.seriesLineData1=response.data.tempscore5
      nationaltrendinmonth.seriesLineData2=response.data.waterscore5
	  Regiontempwater=response.data.data2
if (response.data.data2.length == "0"){
    Regiontempwater[0] = '-'
    Regiontempwater[1] = '-'
    Regiontempwater[2]  = '-'
    Regiontempwater[3]  = '-'
    Regiontempwater[4]  = '-'
    Regiontempwater[5]  = '-'
   }
   else if (response.data.data2.length == "1"){
    Regiontempwater[1] = '-'
    Regiontempwater[2]  = '-'
    Regiontempwater[3]  = '-'
    Regiontempwater[4]  = '-'
    Regiontempwater[5]  = '-'
   }else if(response.data.data2.length == "2"){
    Regiontempwater[2]  = '-'
    Regiontempwater[3]  = '-'
    Regiontempwater[4]  = '-'
    Regiontempwater[5]  = '-'
   }else if(response.data.data2.length == "3"){
     Regiontempwater[3]  = '-'
    Regiontempwater[4]  = '-'
    Regiontempwater[5]  = '-'
   }else if(response.data.data2.length == "4"){
     Regiontempwater[4]  = '-'
    Regiontempwater[5]  = '-'
   }else if(response.data.data2.length == "5"){
    Regiontempwater[5]  = '-'
   }


	  region=response.data.region
	  this.worsttypetrendTitle=temporderintype.xAxisData[0]
	  for(var i=0;i<response.data.data3.length;i++){
		  worsttypetrendinmonth.xAxisData[i]=response.data.data3[i].time_date.slice(0,7)
		  worsttypetrendinmonth.seriesLineData1[i]=response.data.data3[i].temp_score
		  worsttypetrendinmonth.seriesLineData2[i]=response.data.data3[i].water_score
	  }
      this.realData[0].money=Number(parseFloat(response.data.data.day_data_sum/10000).toFixed(2))
	  this.realData[0].time="更新至"+response.data.data.update_time
	  this.realData[1].money=Number(parseFloat(response.data.data.total_data_sum/1000000).toFixed(2))
	  this.realData[1].time=response.data.data1.update_time+"起"
	  this.realData[2].money=Number(parseFloat(response.data.data.free_space).toFixed(2))
	  this.realData1[0].data=response.data.data.city_count
	  this.realData1[1].data=response.data.data.type_count
	  this.realData1[2].data=response.data.data.equ_count
	  //this.timeTitle=temporderinappliance.xAxisData[0]

	  behaviorTime.data[0].value=1//扇形图
	  behaviorTime.data[1].value=1
	  behaviorTime.data[2].value=1
	  behaviorTime.data[3].value=2
	  
	  for(var i=0;i<response.data.data4.length;i++){
        remainingfreespace.seriesLineData[i]=response.data.data4[response.data.data4.length-1-i].free_space
		remainingfreespace.tooltip[i]=response.data.data4[response.data.data4.length-1-i].update_time
	    remainingfreespace.xAxisData[i]=remainingfreespace.tooltip[i].slice(5,10)
	  }
	  console.log(remainingfreespace)
    }).catch((err) => { 
    });
	
  },
  //温度排名  型号（画图）
	temp_order_in_type(id){
        // 基于准备好的dom，初始化echarts实例
    	var nowChartBusinessIncome = this.$echarts.init(document.getElementById(id));
        // 绘制柱状折线图-营业收入统计
        var optionBusiness = {
			tooltip : {
				trigger: 'axis'
			},
			calculable : true,
			legend: {
				data:temporderintype.itemTitle,
		        textStyle:{//图例文字的样式
           			color:'#fff',
				   },
			},
			grid: {
		        left: '3%',
		        right: '4%',
		        bottom: '10%',
		        top:'20%',
		        containLabel: true
		    },
			xAxis : [
				{
					type : 'category',
					data : temporderintype.xAxisData,
					axisLabel : {
						formatter: '{value}',
						textStyle:{
							color:'#fff',
							fontSize:10,
						},
            interval: 0, 
            rotate: 30
					}
				}
			],
			yAxis : [
				{
					type : 'value',
					name : '评分',
					left:'10',
					min: 0,
          // max: 60000,
          // interval: 20000,
					axisLabel : {
						formatter: '{value}',
						textStyle:{
							color:'#fff',
							fontSize:10
						},
					},
					splitLine : {
						show:true,
						lineStyle: {
							color: '#5e6067',
							type: 'dashed',
							width: 1
						}
          },
					nameTextStyle:{
						color:'#fff',
					}
				}
			],
			series : [
				{
					name:'温度评分',
					type:'bar',
					barWidth : 5,
					data:temporderintype.seriesBarData,
					itemStyle: {
						normal: {
							color: '#ad2727',
						},
					}
				},
				{
					name:'水流量评分',
					type:'bar',
          barWidth : 5,
					itemStyle: {
						normal: {
							color: '#2774a0',
						},
          },
					data:temporderintype.seriesBarData1
				}
			]
		};


    	if (optionBusiness && typeof optionBusiness === "object") {
		    nowChartBusinessIncome.setOption(optionBusiness, true);
		  }
	} ,
	//温度排名  设备（画图）
	temp_order_in_appliance(id){
        // 基于准备好的dom，初始化echarts实例
    	var nowChartBusinessIncome = this.$echarts.init(document.getElementById(id));
        // 绘制柱状折线图-营业收入统计
        var optionBusiness = {
			tooltip : {
				trigger: 'axis'
			},
			calculable : true,
			legend: {
				data:temporderinappliance.itemTitle,
		        textStyle:{//图例文字的样式
           			color:'#fff',
				   },
			},
			grid: {
		        left: '3%',
		        right: '4%',
		        bottom: '10%',
		        top:'20%',
		        containLabel: true
		    },
			xAxis : [
				{
					type : 'category',
					data : temporderinappliance.xAxisData,
					axisLabel : {
						formatter: '{value}',
						textStyle:{
							color:'#fff',
							fontSize:8,
						},
            interval: 0, 
            rotate: 45
					}
				}
			],
			yAxis : [
				{
					type : 'value',
					name : '评分',
					left:'10',
					min: 0,
          // max: 60000,
          // interval: 20000,
					axisLabel : {
						formatter: '{value}',
						textStyle:{
							color:'#fff',
							fontSize:10
						},
					},
					splitLine : {
						show:true,
						lineStyle: {
							color: '#5e6067',
							type: 'dashed',
							width: 1
						}
          },
					nameTextStyle:{
						color:'#fff',
					}
				}
			],
			series : [
				{
					name:'温度评分',
					type:'bar',
					barWidth : 10,
					data:temporderinappliance.seriesBarData,
					itemStyle: {
						normal: {
							color: '#ad2727',
						},
					}
				},
				{
					name:'水流量评分',
					type:'bar',
                     barWidth : 10,
					itemStyle: {
						normal: {
							color: '#2774a0',
						},
          },
					data:temporderinappliance.seriesBarData1
				}
			]
		};


    	if (optionBusiness && typeof optionBusiness === "object") {
		    nowChartBusinessIncome.setOption(optionBusiness, true);
		  }
	} ,
// 规模成长
	propertyFee(id){
	// 基于准备好的dom，初始化echarts实例
		var nowChartPropertyFee = this.$echarts.init(document.getElementById(id));
		// 绘制柱状折线图-营业收入统计
		var optionBusiness = {
			tooltip : {
				trigger: 'axis'
			},
			calculable : true,
			legend: {
				data:CONSTANTS.propertyFee.itemTitle,
				textStyle:{//图例文字的样式
					color:'#fff',
				},
			},
			grid: {
		        left: '3%',
		        right: '4%',
		        bottom: '10%',
		        top:'30%',
		        containLabel: true
		    },
			xAxis : [
				{
					type : 'category',
					data : CONSTANTS.propertyFee.xAxisData,

					axisLabel : {
						formatter: '{value}',
						textStyle:{
							color:'#fff',
							fontSize:10
						}
					},
				}
			],
			yAxis : [
				{
					type : 'value',
					name : '(万元)',
					data: CONSTANTS.propertyFee.yAxisData,
					axisLabel : {
						formatter: '{value}',
						textStyle:{
							color:'#fff',
							fontSize:10
						},
					},

					splitLine : {
						show:true,
						lineStyle: {
							color: '#5e6067',
							type: 'dashed',
							width: 1
						}
          			},
					nameTextStyle:{
						color:'#fff',
					}
				},
				{
					type : 'value',
					name : '',
					data: CONSTANTS.propertyFee.yAxisData1,
					axisLabel : {
						formatter: '{value}%',
						textStyle:{
							color:'#fff',
							fontSize:10
						}

					},
					splitLine : {
						show:true,
						lineStyle: {
							color: '#5e6067',
							type: 'dashed',
							width: 1
						}
          },
				}
			],
			series : [

				{
					name:'完成值',
					type:'bar',
					barWidth : 5,
					data:CONSTANTS.propertyFee.seriesBarData,
					itemStyle: {
						normal: {
							color: '#f691b8',
						},
					}
				},
				{
					name:'目标值',
					type:'line',
					symbol:'none',
					itemStyle:{
						normal:{
							lineStyle: {
							 width:1,
							type:'solid'
							}
						}
					},
					data:CONSTANTS.propertyFee.seriesLineData1
				},
				{
					name:'清次率',
					type:'line',
					yAxisIndex: 1,
					data:CONSTANTS.propertyFee.seriesLineData2
				},
				{
					name:'收缴率',
					type:'line',
					yAxisIndex: 1,
					data:CONSTANTS.propertyFee.seriesLineData3,
				}
			]
		};


		if (optionBusiness && typeof optionBusiness === "object") {
			nowChartPropertyFee.setOption(optionBusiness, true);
			}
	},
	// 多种经营
		operationsMultipleFn(id){
	// 基于准备好的dom，初始化echarts实例
		var nowChartPropertyFee = this.$echarts.init(document.getElementById(id));
		// 绘制柱状折线图-营业收入统计
		var optionBusiness = {
			tooltip : {
				trigger: 'axis'
			},
			calculable : true,
			legend: {
				data:CONSTANTS[id].itemTitle,
				textStyle:{//图例文字的样式
					color:'#fff',
				},
			},
			grid: {
		        left: '5%',
		        right: '4%',
		        bottom: '10%',
		        top:'30%',
		        containLabel: true
		    },
			xAxis : [
				{
					type : 'category',
					data : CONSTANTS[id].xAxisData,

					axisLabel : {
						formatter: '{value}',
						textStyle:{
							color:'#fff',
							fontSize:10
						}
					},
				}
			],
			yAxis : [
				{
					type : 'value',
					name : '(万元)',
					data: CONSTANTS[id].yAxisData,
					min: 0,
          max: 70000,
          interval: 20000,
					axisLabel : {
						formatter: '{value}',
						textStyle:{
							color:'#fff',
							fontSize:10
						},
					},

					splitLine : {
						show:true,
						lineStyle: {
							color: '#5e6067',
							type: 'dashed',
							width: 1
						}
          			},
					nameTextStyle:{
						color:'#fff',
					}
				},
				{
					type : 'value',
					name : '',
					data: CONSTANTS[id].yAxisData1,
					axisLabel : {
						formatter: '{value}%',
						textStyle:{
							color:'#fff',
							fontSize:10
						}

					},
					splitLine : {
						show:true,
						lineStyle: {
							color: '#5e6067',
							type: 'dashed',
							width: 1
						}
          },
				}
			],
			series : [

				{
					name:'完成值',
					type:'bar',
					barWidth : 5,
					data:CONSTANTS[id].seriesBarData,
					itemStyle: {
						normal: {
							color: '#f691b8',
						},
					}
				},
				{
					name:'目标值',
					type:'line',
					symbol:'none',
					itemStyle:{
						normal:{
							lineStyle: {
							 width:1,
							type:'solid'
							}
						}
					},
					data:CONSTANTS[id].seriesLineData1
				},
				{
					name:'月度完成率',
					type:'line',
					yAxisIndex: 1,
					data:CONSTANTS[id].seriesLineData2
				},
				{
					name:'年度度完成率',
					type:'line',
					yAxisIndex: 1,
					data:CONSTANTS[id].seriesLineData3,
				}
			]
		};


		if (optionBusiness && typeof optionBusiness === "object") {
			nowChartPropertyFee.setOption(optionBusiness, true);
			}
	},
	// 上月最差设备行为时长分布
	personNumFn(){
		var nowChartPersonNum = this.$echarts.init(document.getElementById('personNum'));
		// 绘制柱状折线图-营业收入统计
		var optionPersonNum = {
			tooltip : {
			   	trigger: 'item',
			    formatter: "{a} <br/>{b} : {c} ({d}%)"
			},
			legend: {
				orient : 'horizontal',
				align : 'auto',
				itemWidth:20,
				textStyle: {
		            fontSize: 12,
		            color: '#fff'
		       },
				data:behaviorTime.itemTitle
			},
			calculable : false,
			series : [
				{
					name:'片段分布',
					type:'pie',
					radius : ['00%', '60%'],
					// center : ['35%', '50%'],
//					// for funnel
//					x: '60%',
//					width: '35%',
					left: 'center',
					bottom: '-10%',
					// height:"auto",
					label: {
        show: 'true',
        formatter: '{b} \n({c}个)',
        color:"#fff",
		alignTo:'edge',
		positon:'outer',
		margin:'-45%'
      },
    //   labelLine: {
    //     length: 15,
	// 	 showAbove:"true"
    //   },
					data:behaviorTime.data
				}
			]
		};


		if (optionPersonNum && typeof optionPersonNum === "object") {
			nowChartPersonNum.setOption(optionPersonNum, true);
			}
	},
	//剩余空间
	freespaceFn(){
// 基于准备好的dom，初始化echarts实例
		var nowChartwWaterElectric = this.$echarts.init(document.getElementById('freespace'));
		// 绘制柱状折线图-营业收入统计
		var optionWaterElectric = {
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
		        top:'20%',
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
					// min: "auto",
                    // max: "auto",
          // interval: 20000,
					axisLabel : {
						formatter: '{value}',
						textStyle:{
							color:'#fff',
							fontSize:10
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


		if (optionWaterElectric && typeof optionWaterElectric === "object") {
			nowChartwWaterElectric.setOption(optionWaterElectric, true);
			}
	},
	// 全国各省平均评分月份趋势走向
	waterElectricFn(){
	// 基于准备好的dom，初始化echarts实例
		var nowChartwWaterElectric = this.$echarts.init(document.getElementById('waterElectric'));
		// 绘制柱状折线图-营业收入统计
		var optionWaterElectric = {
			tooltip : {
				trigger: 'axis'
			},
			calculable : true,
			legend: {
				data:nationaltrendinmonth.itemTitle,
				textStyle:{//图例文字的样式
					color:'#fff',
				},
				top:"10px"
			},
			grid: {
		        left: '5%',
		        right: '5%',
		        bottom: '10%',
		        top:'30%',
		        containLabel: true
		    },
			xAxis : [
				{
					type : 'category',
					data : nationaltrendinmonth.xAxisData,
					axisLabel : {
						formatter: '{value}',
						textStyle:{
							color:'#fff',
							fontSize:10
						},
						interval: 0, 
                        rotate: 30
					},
				}
			],
			yAxis : [
				{
					type : 'value',
					name : '分数',
					// min: "auto",
                    // max: "auto",
          // interval: 20000,
					axisLabel : {
						formatter: '{value}',
						textStyle:{
							color:'#fff',
							fontSize:10
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
					name:'温度评分',
					type:'line',
					data:nationaltrendinmonth.seriesLineData1,
					itemStyle: {
						normal: {
							color: '#ad2727',
						},
					}
				},
				{
					name:'水流量评分',
					type:'line',
					data:nationaltrendinmonth.seriesLineData2,
					itemStyle: {
						normal: {
							color: '#2774a0',
						},
					}
				}
			]
		};


		if (optionWaterElectric && typeof optionWaterElectric === "object") {
			nowChartwWaterElectric.setOption(optionWaterElectric, true);
			}
	},
	// 全国区域月份趋势走向
	regionMonthFn(){
	// 基于准备好的dom，初始化echarts实例
		var nowChartwWaterElectric = this.$echarts.init(document.getElementById('propertyFeeid'));
		// 绘制柱状折线图-营业收入统计
		var optionWaterElectric = {
			tooltip : {
				trigger: 'axis'
			},
			calculable : true,
			legend: {
				data:region,
				textStyle:{//图例文字的样式
					color:'#fff',
				},
				top:"10px"
			},
			grid: {
		        left: '5%',
		        right: '5%',
		        bottom: '10%',
		        top:'30%',
		        containLabel: true
		    },
			xAxis : [
				{
					type : 'category',
					data : Regiontempwater[0].Month,
					axisLabel : {
						formatter: '{value}',
						textStyle:{
							color:'#fff',
							fontSize:10
						},
						interval: 0, 
                        rotate: 30
					},
				}
			],
			yAxis : [
				{
					type : 'value',
					name : '分数',
					// min: "auto",
                    // max: "auto",
          // interval: 20000,
					axisLabel : {
						formatter: '{value}',
						textStyle:{
							color:'#fff',
							fontSize:10
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
					name:region[0],
					type:'line',
					data:Regiontempwater[0].Tempscore,
					itemStyle: {
						normal: {
							color: '#8FA61A',
						},
					}
				},
				{
					name:region[1],
					type:'line',
					data:Regiontempwater[1].Tempscore,
					itemStyle: {
						normal: {
							color: '#4D5DBF',
						},
					}
				},
				{
					name:region[2],
					type:'line',
					data:Regiontempwater[2].Tempscore,
					itemStyle: {
						normal: {
							color: '#528FFC',
						},
					}
				},
				{
					name:region[3],
					type:'line',
					data:Regiontempwater[3].Tempscore,
					itemStyle: {
						normal: {
							color: '#D9BC0D',
						},
					}
				},
				{
					name:region[4],
					type:'line',
					data:Regiontempwater[4].Tempscore,
					itemStyle: {
						normal: {
							color: '#BE62D4',
						},
					}
				},
				{
					name:region[5],
					type:'line',
					data:Regiontempwater[5].Tempscore,
					itemStyle: {
						normal: {
						color: '#F89606',
						},
					}
				}
			]
		};


		if (optionWaterElectric && typeof optionWaterElectric === "object") {
			nowChartwWaterElectric.setOption(optionWaterElectric, true);
			}
	},
	// 最差型号月份趋势走向
	worstTypeMonthFn(){
	// 基于准备好的dom，初始化echarts实例
		var nowChartwWaterElectric = this.$echarts.init(document.getElementById('prepaidPropertyCharges'));
		// 绘制柱状折线图-营业收入统计
		var optionWaterElectric = {
			tooltip : {
				trigger: 'axis'
			},
			calculable : true,
			legend: {
				data:worsttypetrendinmonth.itemTitle,
				textStyle:{//图例文字的样式
					color:'#fff',
				},
				top:"5px"
			},
			grid: {
		        left: '5%',
		        right: '5%',
		        bottom: '10%',
		        top:'30%',
		        containLabel: true
		    },
			xAxis : [
				{
					type : 'category',
					data : worsttypetrendinmonth.xAxisData,
					axisLabel : {
						formatter: '{value}',
						textStyle:{
							color:'#fff',
							fontSize:10
						},
						interval: 0, 
                        rotate: 30
					},
				}
			],
			yAxis : [
				{
					type : 'value',
					name : '分数',
					// min: "auto",
                    // max: "auto",
          // interval: 20000,
					axisLabel : {
						formatter: '{value}',
						textStyle:{
							color:'#fff',
							fontSize:10
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
					name:'温度评分',
					type:'line',
					data:worsttypetrendinmonth.seriesLineData1,
					itemStyle: {
						normal: {
							color: '#ad2727',
						},
					}
				},
				{
					name:'水流量评分',
					type:'line',
					data:worsttypetrendinmonth.seriesLineData2,
					itemStyle: {
						normal: {
							color: '#2774a0',
						},
					}
				}
			]
		};


		if (optionWaterElectric && typeof optionWaterElectric === "object") {
			nowChartwWaterElectric.setOption(optionWaterElectric, true);
			}
	},
	// 地图
	  drawMap(){
      var mapName = "china";
      var geoCoordMap = {};
    	var equipmentChart = this.$echarts.init(document.getElementById('equipmentChart'))
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
         console.log(res)
        return res;
      };
	   
		  var	optionEqipment = {
			title: {
				text: "上月全国各省基本数据情况",
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
			legend: {
				left: 'left',
				data: ['强', '中', '弱'],
				textStyle: {
					color: '#ccc'
				}
			},
		  tooltip: {
        formatter: function(params) {
        //   console.log(params)
          for(var i=0;i<data.name.length;i++){
            if(data.name[i]===params.name){return data.name[i]+"<br/>温度评分："+params.data.value+"<br/>水流量评分："+params.data.value1+"<br/>设备数："+params.data.value2}
          }
          return params.name+"<br/>"+"无数据"       
         },
      },
      visualMap: {
            orient:"horizontal",
            bottom: 10,
            right: 'center',
            pieces: [
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
            data: convertData(data)
			
          },
			console.log(convertData(data))
				
			]
		};
    	equipmentChart.setOption(optionEqipment, true);
		
	},
	 // 9物业费单价 10物业费预收
	propertyFeeFn(id){
			var  propertyFeeidChart = this.$echarts.init(document.getElementById(id));
			var optionPropertyFeeid = {
					grid: {
							left: '3%',
							right: '20%',
							bottom: '10%',
							top:'30%',
							containLabel: true
					},
					tooltip : {
							trigger: 'axis',

					},

					xAxis : [
							{
									name:CONSTANTS[id].xAxisName,
									type : 'value',
									scale:true,
									axisLine:{
										lineStyle:{color: '#fff'},
									},
									axisLabel : {
											formatter: '{value}'
									},
									splitLine : {
										show:true,
										lineStyle: {
											color: '#5e6067',
											type: 'dashed',
											width: 1
										}
									},
							}
					],
					yAxis : [
							{
									name:CONSTANTS[id].yAxisName,
									type : 'value',
									scale:true,
									axisLabel : {
											formatter: '{value} '
									},
									axisLine:{
										lineStyle:{color: '#fff'},
									},
								splitLine : {
									show:true,
									lineStyle: {
										color: '#5e6067',
										type: 'dashed',
										width: 1
									}
								},
							}
					],
					series : CONSTANTS[id].zaiguanmianji
			};
						if (optionPropertyFeeid && typeof optionPropertyFeeid === "object") {
							propertyFeeidChart.setOption(optionPropertyFeeid, true);
						}

	},
	windowResize(){

//  	var nowChartBusinessIncome = this.$echarts.init(document.getElementById('businessIncome')); //营业收入统计
//
//				// var  nowChart = this.$echarts.init(document.getElementById('nowChart'))
//				// var  dataChart = this.$echarts.init(document.getElementById('dataChart'))
//				// var  monthChart = this.$echarts.init(document.getElementById('monthChart'))
//				var  equipmentChart = this.$echarts.init(document.getElementById('equipmentChart'))
//				window.onresize = function(){
//				nowChartBusinessIncome.resize(); //营业收入统计
//				nowChartNetProfit.resize(); //净利润统计
//			// 　　nowChart.resize()
//			// 　　dataChart.resize()
//			// 　　monthChart.resize()
//				equipmentChart.resize();
//			}

    },
  },
  
}
</script>

<style scoped>
	.Bigdiv{
		height: 900px;
		  background:url("../../assets/bigdata.png");
    background-size: 100%;
    /* color: #333; */
    /* text-align: center; */
   
	}
	.header{
		height: 45px;
		vertical-align: middle;
	}
	.header img{
		width: 25px;
		vertical-align: middle;
   	 	margin-left: 15px;
		/*margin-top: 20px;
		margin-right: 20px;*/
	}
	.header span{

		font-size: 14px;
		line-height: 45px;
		color: #fff;
	}
	.divBox{
		padding:0 9px;
	
		width: 100%;
		height: calc(100% - 45px);

	}
	.left{
		height:28%;
	}
	.left>div{

		height: 100%;
		/*margin-bottom: 10px;*/
		padding: 0px;
		

	}
	.left>div .bg{
		background: rgba(10,18,44,0.65);
		height: 100%;
		
	}
	#businessIncome,#netProfit,#liabilities,#propertyFee,#propertyFeeid,#prepaidPropertyCharges{
		width: 100%;
		/* height: calc(100% - 5px); */
		height:100%;
		/* background-color:#000;
		opacity: .5; */
		
	}
	#waterElectric,#personNum,#freespace{
		width: 100%;
		/* height: calc(100% - 5px); */
		height:100%;
	}
	#equipmentChart{
		width: 100%;
		height: 100%;
	}



	.title{
		padding: 0px 0;
		margin: 0;
		width: 100%;
		color: #b1e2fe;
		font-size: 12px;
		font-weight: normal;
		text-align: left;
		line-height: 16px;
		height: 16px;
	}
	.title span{
		float: left;
		width: 3px;
		background: #b1e2fe;
		height: 16px;
		margin-right: 15px;
	}

	.bottom{
		height: calc(71% - 5px);
		margin-top: 5px;
		
	
	}
	.bottom>div{
		height: 100%;
	}
	.bottomL>div{
		width: 100%;
		height: 33.3%;
		padding-right: 5px;

	}
	.bottomL>div .bg{
		background: rgba(10,18,44,0.65);
    	height: 100%;
	
	}
	.bottomL>div:nth-child(1){
		padding-bottom:5px ;
		

	}
	.bottomL>div:nth-child(3){
		padding-top:5px ;
	
	}


	.bottomR>div{
		width: 100%;
		height: 50%;
		padding-right: 5px;
	}
	.bottomR>div .bg{
		background: rgba(10,18,44,0.65);
    	height: 100%;
	}
	.bottomR>div:nth-child(1){
		padding-bottom:5px ;

	}
	.bottomR>div:nth-child(3){
		padding-top:5px ;
	}
	.bottomC{
		padding-right: 5px;
		 margin-right: 0;
		 
	}
	.bottomC>.bg{
		background: rgba(10,18,44,0.65);
    	height: 100%;
		

	}





	.gaojingBox{
		width: 100%;
		height: 100%;
		
		
	}

	.pos-rela{
		position: relative;
		width: 95%;
		height: 100%;
		
	}
	.pub-pos-a {
		position: absolute;
		top:10%;
		color: #fff;
		padding: 0px;
		z-index: 100;
    	opacity: .5;
		 background-color: #000;
		 text-align: left;
	}
	/* .map-left-value{
		left: 0;
	}
	.map-right-value{
		right: 0;
	} */
	.charge{
		position: absolute;
		top:8%;
		left: 5%;
		width:100%;
		z-index: 100;
	}
	.bottom-Statistics{
		position: absolute;
		bottom:10%;
		left: 3%;
		width: 40%;
		z-index: 100;
	}
	.bottom-Statistics label{
		padding: 10px 0;
    margin: 0;
    width: 100%;
    color: #b1e2fe;
    font-size: 12px;
    height: 16px;
    text-align: left;
	}
	.bottom-Statistics .yesterday>h1{
		color: #fff;
		font-size: 24px;
	}
	.bottom-Statistics 	.font-s-unit{
		font-size: 10px;
	}
	.font-s{
		font-size: 14px;
		padding: 10px 0;
	    margin: 0;
	    width: 100%;
	    color: #fff;
	    height: 16px;
	    text-align: left;
	}
	.font-s-data{
		font-size: 10px;
	}
	.yesterday{text-align: left;}
	.yesterday>h1{
		font-size: 30px;
		color: #b1e2fe;
		margin: 0;
    font-weight: 800;
	}
	.font-s-unit{
		font-size: 13px;
	}
	.float-left-c{
		float: left;
		padding: 0 0 0 15px;
	}
	.w-50{
		width:50%;
		float: left;
	}
</style>
