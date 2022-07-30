<template>
  <div id="app1">
   
  <div class="search" align="center" style="margin-top:20px;">
      <el-form ref="form" class="ItemInfo" :model="equipment_info" label-width="80px" :inline="true">
      <span>实时采集：</span>
      
      <span>设备：</span>
      <el-autocomplete v-model="value3" :disabled="equipment_state" placeholder="请输入设备号" style="width:150px" clearable class="inline-input"
      :fetch-suggestions="querySearch1" :trigger-on-focus="false"></el-autocomplete>

      <span style="margin-left:30px">日期: </span>

    <span class="demonstration"></span>
    <el-date-picker
    
      :disabled="data_state"
      v-model="value4"
      type="datetimerange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
       format="yyyy-MM-dd HH:mm:ss"
      value-format="yyyy-MM-dd HH:mm:ss">
    </el-date-picker>
 <span style="margin-left:30px">自动调参开关: </span>
 <el-switch
  v-model="adjust"
  active-color="#13ce66"
  inactive-color="#666666">
</el-switch>
    <el-button type="primary" @click="search" :disabled="button_state" style="margin-left:50px;">{{button_content}}</el-button>

<el-button type="primary" @click="download" >当前页显示全部筛选数据</el-button>
  <el-form-item class="ItemInfoTime" style="margin-left:10px;">
    <download-excel
      :fields = "json_fields"
      :data="tableData"
      :before-generate = "startDownload"
      :before-finish = "finishDownload"
      name="listdata.xls"
      type="xls">
      <el-button>当前页导出Excel</el-button>
    </download-excel>
</el-form-item>

</el-form>
  </div>
  <el-table ref="tableRef" :data="tableData" :cell-style="tableRowClassName1"  height="750px" border style="width: 100%;margin-top:20px" align="center">
  
    <el-table-column  type="index"  align="center" width='60px' label="序号" :index="indexMethod"></el-table-column>
    <el-table-column  prop="dev_id" align="center" width='150px' label="设备"></el-table-column>
    <el-table-column  prop="starttime" align="center" width='150px' label="开始时间"  format="yyyy-MM-dd HH:mm:ss"></el-table-column>
    <el-table-column  prop="endtime" align="center" width='150px' label="结束时间"  format="yyyy-MM-dd HH:mm:ss"></el-table-column>
<el-table-column  prop="temp_pattern" align="center" width='150px' label="温度模式"></el-table-column>
        <el-table-column  prop="heat_temp_score" align="center" sortable label="加热段评分"></el-table-column>
        <el-table-column  prop="stable_temp_score" align="center" sortable label="恒温段评分"></el-table-column>
    <el-table-column  prop="newtempscore" align="center" width='100px' label="温度评分"></el-table-column>
    <el-table-column  prop="heat_duration" align="center" width='100px' label="升温时间"></el-table-column>
    <el-table-column  prop="un_stable_temp_percent" align="center" width='100px' label="恒温异常占比"></el-table-column>
    <el-table-column  prop="overshoot_value" align="center" width='100px' label="温度超调"></el-table-column>
    <el-table-column  prop="state_accuracy" align="center" width='100px' label="温度稳态精度"></el-table-column>
    <el-table-column  prop="water_pattern" align="center" width='100px' label="水流量模式"></el-table-column>
   <el-table-column  prop="water_score" align="center" width='100px' label="水流量得分"></el-table-column>
    <el-table-column  prop="deviation" align="center" width='100px' label="水流量标准差"></el-table-column>
       <el-table-column
      label="操作"
      align="center">
      <template slot-scope="scope">
        <el-button
          @click="jumppage(scope.row)"
          type="text"
          size="small"
          align="left">
         运行曲线
        </el-button>
      </template>
    </el-table-column>

    

  </el-table>
     <el-dialog :visible="drawer" show-close center @close='closeDialog' fullscreen>
       <!--<div :class="[fullScreenStatus.tracks ? 'fullscreen' : 'myChart']">-->
        <h3 style="margin-top:0px;margin-left:0px" align="center">{{daytime}}{{city}}{{" "}}{{" "}}燃气热水器片段运行状态{{" "}}{{" "}}{{type}}</h3>
        <div align="center">
          <span>温度片段模式：{{pattern[0]}}</span>
          <span style="margin-left:20px">水流量片段模式：{{pattern[1]}}</span>
          <span style="margin-left:20px">温度曲线颜色：</span>
          <el-tag type="warning"  style="margin-right:50px;">加热段正常</el-tag>
          <el-tag type="success" style="margin-right:50px;">恒温段稳定</el-tag>
          <el-tag  type="danger" style="margin-right:50px;">加热段/恒温段异常部分</el-tag>
      
        </div>
        <div id='myChart' ></div>
<br>
        </el-dialog>


  <el-pagination align="center" v-if="this.downloadflag!=1"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      background="true"
      prev-text="上一页"
      next-text="下一页"
      :current-page.sync="currentPage"
      :page-sizes="[25,50,100]"
      :page-size="perPage"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<style>
  
</style>
<script>
import JsonExcel from 'vue-json-excel';
import request from '@/utils/request';
//var url="http://47.98.170.3:1016/api/"
var time1=[]
var temp_num=[]
var jumpinitialflag=false
var heatnormal=[]
var stabletempnormal=[]
var abnormal=[]
var heatstage=[]
var stablestage=[]
var watereffectstage=[]
var watereffect=[]
var wuxiao=[]
export default {
  components: {
      'download-excel': JsonExcel
    }, 
  data() {
    return {
      json_fields: {
          "设备":{ 
            field:"dev_id",
            callback:value =>{
              return  "&nbsp;" +value;
            }
            },
           '开始时间':'starttime',
           '结束时间':'endtime',
           '温度模式':'temp_pattern',
           '加热段评分':'heat_temp_score',
 
          '恒温段评分': 'stable_temp_score',
          '温度得分': 'temp_score',
          '新温度得分':'newtempscore',
          '升温时间':'heat_duration',
'恒温异常占比':'un_stable_temp_percent',
'温度超调':'overshoot_value',
'温度稳态精度':'state_accuracy',
'水流量模式':'water_pattern',
'水流量得分':'water_score',
'水流量标准差':'deviation'


          },
          adjust:false,
      value:[],
      options:[],
      // value1:[],
      value2:[],
     value3:182518931003942,
     //value3: 109951162778761,
      // shebeikuang:"请选择设备",
      xinghao: [],
      shebei: [],
      perPage:25,// 每页显示条数
      currentPage: 1, // 当前页
      temp_currentPage: 1,
      total: 0, // 默认总条数
      tableData:[],
      value4:[],
      timer_flag:null, //定时器
      timer_count:null,
      button_state:false,  //采集按钮是否禁用
      equipment_state:false,
      data_state:false,
      button_content:"采集",  //按钮内容
      deviation:'',
      water_score:'',
      water_pattern:'',
      heat_duration:'',
      un_stable_temp_percent:'',
      overshoot_value:'',
      state_accuracy:'',
      temp_score:'',
     newtempscore:"",
      temp_pattern:'',
      starttime:[],
      endtime:[],
      applianceid_temp : '',
      starttime_temp : '',
      endtime_temp : '',
      stable_temp_score:'',
      heat_temp_score:'',
      downloadflag:0,
pattern:[],

fullScreenStatus: {
            tracks: false,
        },
valu4:'',//型号中转
      modelflag:false,//是否禁用模式划分筛选标志位
      outpwm2:[[]],
      outpwm1:[],

      searchlist:[],
      appliancelist:[],
      typelist:[],
      datatime:[],
      temp_flag:[],
       temp_flag1:[],
        temp_flag2:[],
       tableData2:[],//水流量指标
       tableData1:[],
       tableData3:[],//温度指标
       tableData4:[],
       ut:[],
       ut1:[],
       ut2:[],
       inTemp:[],
       inTemp1:[],
       inTemp2:[],
       fenduan:[],
       fenduan1:[],
       fenduan2:[],
       outTemp:[],
       outTemp1:[],
       outTemp2:[],
     hengwen:[],
shengwen:[],
yichang:[],
       outpwm:[],
       outpwmtime:[],
       flow:[],
          flow1:[],
             flow2:[],
       setTemp:[],
          setTemp1:[],
             setTemp2:[],
       heat_temp_score:[],
       stable_temp_score:[],
       flame:[],
        flame1:[],
         flame2:[],
       watereffect:[],
         watereffect1:[],
           watereffect2:[],
       color:[],
        drawer: false,
        valuearray:[],

    };
  },
  methods:{

    jumppage(row){
       this.fullScreenStatus[row] = !this.fullScreenStatus[row]
this.hengwen=[]
this.shengwen=[]
this.yichang=[]
this.ut1=[]
this.ut2=[]
this.outpwm1=[]
this.outpwm2=[]
this.inTemp1=[]
this.inTemp2=[]
this.fenduan1=[]
this.fenduan2=[]
this.flame2=[]
this.flow2=[]
this.watereffect2=[]
this.temp_flag2=[]
this.outTemp2=[]
this.setTemp2=[]
time1=[]
this.outpwmtime=[]
           var v;
       var v1;
      this.pattern[0]=row.temp_pattern
      this.pattern[1]=row.water_pattern
            const dt = new Date(row.starttime);
            const dt1 = new Date(row.endtime);
//             dt.setTime(dt.setSeconds(dt.getSeconds()-1));
            v=this.dateFormat(dt);
            v1=this.dateFormat(dt1);
 request.post('indextemp/page/initialize', null, {
        params:
        {  
          dev_id: row.dev_id,
          flag:"1",
          realflag:"1",
          timeLow : v,    //时间范围
          timeHigh : v1,
        },
      }).then(({ data: response }) => {
          console.log(response.data)
        //console.log(response.data.data2.heat_temp_score)
        time1 = response.data.data_time;
       // console.log(time1)
        this.daytime=time1[0].slice(0,11)

for(var i=0;i<response.data.aliyun_info.length;i++){
          this.outpwmtime[i]=response.data.aliyun_info[i].datatime
          this.outpwm[i]=response.data.aliyun_info[i].actualpwm
           this.ut[i]=response.data.aliyun_info[i].ut
          this.fenduan[i]=response.data.aliyun_info[i].comloadsegment

}
      for(var i=0;i<time1.length;i++){
        this.temp_flag[i]=Number(response.data.temp_pattern[i])
        this.flame[i]=Number(response.data.flame[i])*10
        temp_num[i]=response.data.data[i].temp_pattern
        this.watereffect[i]=Number(response.data.effect_mark[i])*10
      }
      this.ut1=this.yiweishuzu(this.outpwmtime,this.ut)
this.ut2=this.erweishuzu(this.ut1)
this.outpwm1=this.yiweishuzu(this.outpwmtime,this.outpwm)
this.fenduan1=this.yiweishuzu(this.outpwmtime,this.fenduan)
this.fenduan2=this.erweishuzu(this.fenduan1)

 this.outpwm2=this.erweishuzu(this.outpwm1)

 this.temp_flag1=this.yiweishuzu(time1,this.temp_flag)
this.temp_flag2=this.erweishuzu(this.temp_flag1)
console.log(this.temp_flag2)   
  this.flame1=this.yiweishuzu(time1,this.flame)
this.flame2=this.erweishuzu(this.flame1)
   this.watereffect1=this.yiweishuzu(time1,this.watereffect)
this.watereffect2=this.erweishuzu(this.watereffect1)

        this.heat_temp_score = row.heat_temp_score;
       //console.log(eat_temp_score)
       this.stable_temp_score = row.stable_temp_score;
        this.inTemp=response.data.in_temp;

        console.log(time1)
        this.inTemp1=this.yiweishuzu(time1,this.inTemp)
//console.log(this.inTemp1)
 this.inTemp2=this.erweishuzu(this.inTemp1)

 //console.log(this.inTemp2)
        this.setTemp = response.data.set_temp;
        this.outTemp = response.data.out_temp;
       this.flow = response.data.flow;

   this.setTemp1=this.yiweishuzu(time1,this.setTemp)
this.setTemp2=this.erweishuzu(this.setTemp1)
   this.outTemp1=this.yiweishuzu(time1,this.outTemp)
this.outTemp2=this.erweishuzu(this.outTemp1)
//console.log(this.outTemp2)
   this.flow1=this.yiweishuzu(time1,this.flow)
this.flow2=this.erweishuzu(this.flow1)

     this.colorDifferenciate(row.temp_pattern)
  setTimeout(() => {
    
    this.drawTable();
   
  }, 100);
      
       this. drawer=true
      }).catch((err) => {
        this.$message.error(err);
        // console.log(err);
      });

    },
yiweishuzu(time,value){//时间+变量值构成的一维数组
  let yiweishuzu = [];
var a=0
var b=0
for(var i=0;i<2*time.length;i++){
          if(i%2==0||i==0){
            yiweishuzu[i]=time[a++]
          }else{
             yiweishuzu[i]=value[b++]
          }
}
return yiweishuzu
},
erweishuzu(yiweishuzu){//一维数组按2平分成二维数组
let obj = [];

const len = 2;

  for (let i = 0; i < yiweishuzu.length; i++) {  // 循环截取  每次截取2个

       const arr = yiweishuzu.slice(i, i + 2);

      obj.push(arr);

       i = i + len - 1;

     }
     return obj
},
    closeDialog(){
      this.drawer=false
    },

    //划分颜色
    colorDifferenciate(temp_pattern){
      var j=0;
      var k=0;
      var m=0;
      this.yichang=[]
     this.shengwen=[]
      this.hengwen=[]
      this.color=[]
      abnormal=[]
      heatnormal=[]
      stabletempnormal=[]
      heatstage=[]
      stablestage=[]
    
      watereffectstage=[]
      var waterflag
      var unwaterflag
            for(var i=0;i<temp_num.length;i++){
        if(watereffect[i]=="1"){
          waterflag=i
          break
        }
        }
            for(var i=0;i<temp_num.length;i++){
        if(watereffect[i]=="1"&&watereffect[i+1]=="0"){
          unwaterflag=i
          break
        }
        }
        console.log(temp_pattern)
if(temp_pattern!="无效片段"){ 
       wuxiao[0]=''
      wuxiao[1]=''

      var gappoint=temp_num.length-1
      //console.log(temp_num)
      for(var i=0;i<temp_num.length;i++){
       if(temp_num[i]!="1" && temp_num[i]!="2"&&temp_num[i]!="13"){
          gappoint=i
          break
        }
      }
      watereffectstage[0]=time1[waterflag]
      watereffectstage[1]=time1[unwaterflag]
      heatstage[0]=time1[0]
      heatstage[1]=time1[gappoint]
      stablestage[0]=time1[gappoint]
      stablestage[1]=time1[temp_num.length-1]
    
      if(temp_pattern==="加热异常"||temp_pattern==="加热+恒温异常"){
        abnormal.splice(j,0,0,gappoint)
        j=j+2
      }else{
        heatnormal.splice(k++,0,0,gappoint)
      }
      //注意
      for(var i=gappoint;i<temp_num.length;i++){
        if(temp_num[i]==0&&(temp_num[i+1]!=0||i+1==temp_num.length)){
          stabletempnormal.splice(m,0,gappoint,i)
          m=m+2
          gappoint=i
        }
        if(temp_num[i]!=0&&(temp_num[i+1]==0||i+1==temp_num.length)){
          abnormal.splice(j,0,gappoint,i)
          j=j+2
          gappoint=i
        }
      }

    var a=0

//恒温正常曲线
var j=0
var k=-1
for(i=0;i<stabletempnormal.length;i=i+2){
 for(j=k+1;j<this.outTemp2.length;j++){
if(j>=stabletempnormal[i]&&j<=stabletempnormal[i+1]){
      this.hengwen[j]=this.outTemp2[j]
      k=j
}else{
  this.hengwen[j]=""
}
  
}
}
//console.log(this.hengwen)
//异常部分
var j=0
var k=-1
for(i=0;i<abnormal.length;i=i+2){
 for(j=k+1;j<this.outTemp2.length;j++){
if(j>=abnormal[i]&&j<=abnormal[i+1]){
      this.yichang[j]=this.outTemp2[j]
      k=j
}else{
  this.yichang[j]=""
}
  
}
}
//console.log(this.yichang)
//升温过程
var j=0
var k=-1
for(i=0;i<heatnormal.length;i=i+2){
 for(j=k+1;j<this.outTemp2.length;j++){
if(j>=heatnormal[i]&&j<=heatnormal[i+1]){
      this.shengwen[j]=this.outTemp2[j]
      k=j
}else{
  this.shengwen[j]=""
}
  
}

}
}else if (temp_pattern=="无效片段"){
       wuxiao[0]=time1[0]
      wuxiao[1]=time1[temp_num.length-1]
      heatstage[0]=''
      heatstage[1]=''
      stablestage[0]=''
      stablestage[1]=''
 for(j=0;j<this.outTemp2.length;j++){

      this.yichang[j]=this.outTemp2[j]


  
}

}
},
  //画图
     drawTable(){
        const myChart = this.$echarts.init(document.getElementById('myChart'));
        const option = {
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
            data: ['水流量','进水温度','出水温度','设置温度',"火焰反馈","ut输入","实际比例阀输出","实际燃烧负荷段","温度受水流量波动影响","温度模式标志位"],
             selected:{'水流量':true,'进水温度':true,'出水温度':true,'设置温度':true,'火焰反馈':true,'ut输入':true,'实际比例阀输出':true,"实际燃烧负荷段":true,'温度受水流量波动影响':true,'温度模式标志位':false}

          },
        

          ],
          dataZoom: {   
              start:0,
              end: 100,
              type:'inside'
            },




      //  grid: {
      //       left: '10%',
      //       right: '15%',
      //       bottom: '10%'
      //   },
          // 缩放操作
          toolbox: {
            show: true,
             bottom:10,
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
            type: 'time',
            boundaryGap: false,
            name: '时间',
           

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
            axisLabel: {
              formatter: '{value} ',
            },
            inverse: false,
          },
                  {
            type: 'value',
            name: '比例阀输出',
            max:1500,
            position: 'right',
             offset: 50,
            axisLine: {
                show: true,
                lineStyle: {
                    color: 'black'
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
          visualMap: [
          {
            show: false,
            // type: 'continuous',
            dimension: 0,
            seriesIndex:1,
            pieces: this.color,  //pieces的值由动态数据决定
            textStyle: { //图例文字的样式
              color: 'black',
              fontSize: 16
            },
          }],
         

          // 数据信息
          series: [
            {
              name: '水流量',
              yAxisIndex: 1,
              type: 'line',
              data: this.flow2,
              symbol: 'none',
              markPoint: {
                data: [
                { type: 'max', name: '最大值'},
                
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
              data: this.hengwen,
              symbol: 'none',
              itemStyle: {      
                            normal: {
                                lineStyle: {
                                    width: 4,
                                    type: 'solid' ,//'dotted'虚线 'solid'实线
                                    color:'green'
                                }
                            }
                        },
                       
              markPoint: {
                data: [
                  { type: 'max', name: '最大值' },
                ],
                 label: {
                    formatter: '{c}℃'//单位
                }
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
              data: this.yichang,
              symbol: 'none',
              itemStyle: {      
                            normal: {
                                lineStyle: {
                                    width: 4,
                                    type: 'solid' ,//'dotted'虚线 'solid'实线
                                    color:'red'
                                }
                            }
                        },
                       
              markPoint: {
                data: [
                  { type: 'max', name: '最大值' },
                ],
                 label: {
                    formatter: '{c}℃'//单位
                }
              },
              markLine: {
                data: [
                  { type: 'average', name: '平均值' },
                ],
              },
              markArea: {
                
                data: [
                  [
                    {
                      name: '加热段',
                      xAxis: heatstage[0],
                      itemStyle: {
                        color: 'rgba(253, 199, 83, 0.383)'
                      },
                    },
                  
                    {
                      xAxis: heatstage[1]
                    }
                  ],
               

                 
                  [
                    {
                      name: '恒温段',
                      xAxis: stablestage[0],
                      itemStyle: {
                        color: 'rgba(137, 253, 83, 0.383)'
                      },
                    },
                    {
                      xAxis: stablestage[1]
                    }
                  ],                  
                                  [
                    {
                      name: '无效用水片段',
                      xAxis: wuxiao[0],
                      itemStyle: {
                        color: '#f0fcff'
                      },
                    },
                    {
                      xAxis: wuxiao[1]
                    }
                  ]
                ]
              }
            },
       {
              name: '出水温度',
              yAxisIndex: 0,
              type: 'line',
              data: this.shengwen,
              symbol: 'none',
              itemStyle: {      
                            normal: {
                                lineStyle: {
                                    width: 4,
                                    type: 'solid' ,//'dotted'虚线 'solid'实线
                                    color:'orange'
                                }
                            }
                        },
                       
              markPoint: {
                data: [
                  { type: 'max', name: '最大值' },
                ],
                 label: {
                    formatter: '{c}℃'//单位
                }
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
              data: this.setTemp2,
              symbol: 'none',
              itemStyle: {      
                            normal: {
                                lineStyle: {
                                    width: 2,
                                    type: 'dashed' ,//'dotted'虚线 'solid'实线
                                     color:"blue",
                                }
                            }
                        },

            },  {
              name: '火焰反馈',
              yAxisIndex: 0,
              type: 'line',
              data: this.flame2,
              symbol: 'none',
                 areaStyle: {},
              itemStyle: {      
                            normal: {
                                lineStyle: {
                                    width: 2,
                                    type: 'solid' ,//'dotted'虚线 'solid'实线
                                     color:"black",
                                }
                            }
                        },

            },{
              name: '温度受水流量波动影响',
              yAxisIndex: 0,
              type: 'line',
              data: this.watereffect2,
              symbol: 'none',
                 areaStyle: {},
              itemStyle: {      
                            normal: {
                                lineStyle: {
                                    width: 2,
                                    type: 'solid' ,//'dotted'虚线 'solid'实线
                                     color:"black",
                                }
                            }
                        },
            markPoint: {
              
                data: [
                { value:"加热段"+this.heat_temp_score, name: '升温段评分',xAxis:heatstage[0], yAxis: this.flow[0]+4,symbol:'diamond'},
                { value:"恒温段"+this.stable_temp_score, name: '恒温段评分',xAxis:stablestage[0], yAxis: this.outTemp[2],symbol:'diamond'},
                ],
                label: {
                    formatter: '{c}分'//单位
                }
              },
              
            }, 

              
              {
              name: '温度模式标志位',
              yAxisIndex: 0,
              type: 'line',
              data: this.temp_flag2,
              symbol: 'none',
                 areaStyle: {},
              itemStyle: {      
                            normal: {
                                lineStyle: {
                                    width: 2,
                                    type: 'solid' ,//'dotted'虚线 'solid'实线
                                     color:"yellow",
                                }
                            }
                        },

            },
                          {
              name: '进水温度',
              yAxisIndex: 0,
              type: 'line',
              data: this.inTemp2,
              symbol: 'none',
                 color:"pink",
              itemStyle: {      
                            normal: {
                                lineStyle: {
                                    width: 2,
                                    type: 'solid' ,//'dotted'虚线 'solid'实线
                                     color:"pink",
                                }
                            }
                        },

            },{
              name: 'ut输入',
              yAxisIndex: 2,
              type: 'line',
              data: this.ut2,
              symbol: 'none',
                 color:"purple",
              itemStyle: {      
                            normal: {
                                lineStyle: {
                                    width: 2,
                                    type: 'solid' ,//'dotted'虚线 'solid'实线
                                     color:"purple",
                                }
                            }
                        },

            },
                                      {
              name: '实际比例阀输出',
              yAxisIndex: 2,
              type: 'line',
              data: this.outpwm2,
              symbol: 'none',
                 color:"black",
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
                                      {
              name: '实际燃烧负荷段',
              yAxisIndex: 0,
              type: 'line',
              data: this.fenduan2,
              
              symbol: 'none',
              areaStyle: {},
                 color:"brown ",
              itemStyle: {      
                            normal: {
                                lineStyle: {
                                    width: 2,
                                    type: 'solid' ,//'dotted'虚线 'solid'实线
                                     color:"brown ",
                                }
                            }
                        },

            },





          ],
        };
       
        

     

//console.log(n)
        myChart.setOption(option,true);
           const _this = this;
  
        // 建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
        // window.addEventListener('resize', () => { myChart.resize(); });
      
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
   tableRowClassName1({row, column, rowIndex, columnIndex}) {
         if(column.label=="温度模式"){
           if (row.temp_pattern == "恒温正常") {
          return 'background: #1981196c';
        } else if (row.temp_pattern == "加热异常") {
          return 'background: #f1b02373';
        }else if (row.temp_pattern == "恒温异常") {
          return 'background: #ff6a6a62';
        }else if(row.temp_pattern == "加热+恒温异常"){
          return 'background: #a706068c';
        }else if(row.temp_pattern=="恒温熄火"){
            return 'background: #FFE4C4';	
            }else if(row.temp_pattern=="加热异常、恒温熄火"){
           return 'background: ##FFE4E1';	  
            }
        return 'background: #9c9c9c8c';
         }
        if(column.label=="水流量模式"){
           if (row.water_pattern == "稳定模式") {
          return 'background: #c1ffc12a';
        } else if (row.water_pattern == "阶跃模式") {
          return 'background: #83fcfc2d';
        }else if (row.water_pattern == "震荡模式") {
          return 'background: #ff6a6a28';
        }
        return 'background: #9c9c9c8c';
         }
    //    console.log(row,column,row.column)
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
    return year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;
    },
    deal_timer(){
      this.timer_count++;
    //  console.log(this.timer_count);
        
      request.post('collection/page/getinfo',null,{
        params:{
        equipment: this.value3,
        timeLow:this.value4[0],
        timeHigh:this.value4[1],
        currentPage:this.temp_currentPage,
        perPage:this.perPage,
        },
      }).then(({data:response}) => {
        console.log(response.data.flag_state);

        if(response.data.flag_state == "1"){
          this.button_content = "挖掘处理";
        }else if (response.data.flag_state == "3"){//迁移失败
          this.button_content = "采集";
          this.button_state = false;
          this.equipment_state = false;
          this.data_state = false;
          clearInterval(this.timer_flag)

          this.timer_flag = null
          this.timer_count = null
          // 提示框 请求失败缺少信息
          this.$notify.error({
            title: '错误',
            message: '数据迁移失败 请检查设备信息是否正确'
          });
          }else if (response.data.flag_state == "4"){//挖掘失败
          this.button_content = "采集";
          this.button_state = false;
          this.equipment_state = false;
          this.data_state = false;
          clearInterval(this.timer_flag)

          this.timer_flag = null
          this.timer_count = null
           // 提示框 请求失败缺少信息
          this.$notify.error({
            title: '错误',
            message: '数据挖掘失败 请检查设备信息是否正确'
          });

          }else if (response.data.flag_state == "5"){//挖掘失败
          this.button_content = "采集";
          this.button_state = false;
          this.equipment_state = false;
          this.data_state = false;
          clearInterval(this.timer_flag)

          this.timer_flag = null
          this.timer_count = null
           // 提示框 请求失败缺少信息
          this.$notify.error({
            title: '错误',
            message: '数据挖掘失败 时间段内无设备信息'
          });
}
          else if (response.data.flag_state == "6"){//迁移失败
          this.button_content = "采集";
          this.button_state = false;
          this.equipment_state = false;
          this.data_state = false;
          clearInterval(this.timer_flag)

          this.timer_flag = null
          this.timer_count = null
           // 提示框 请求失败缺少信息
          this.$notify.error({
            title: '错误',
            message: '数据迁移失败 迁移数据为空'
          });
}
          else if (response.data.flag_state == "2"){
          this.total =response.data.count
          console.log(response.data)
           for (var i=0;i<response.data.data.length;i++) {
            this.tableData[i]={
            heat_temp_score:response.data.data[i].heat_temp_score,
           stable_temp_score:response.data.data[i].stable_temp_score,

              dev_id:response.data.data[i].dev_id,
              starttime:response.data.data[i].start_time,
              endtime:response.data.data[i].end_time,
              deviation:response.data.data[i].deviation,
              water_score:response.data.data[i].water_score,
              water_pattern:response.data.data[i].water_pattern,
              heat_duration:response.data.data[i].heat_duration,
              un_stable_temp_percent:response.data.data[i].un_stable_temp_percent,
              overshoot_value:response.data.data[i].overshoot_value,
              state_accuracy:response.data.data[i].state_accuracy,
              temp_score:response.data.data[i].temp_score,
              newtempscore:response.data.data[i].new_temp_score,
              temp_pattern:response.data.data[i].temp_pattern,
           }
           if(this.tableData[i].water_pattern=="6"){
            this.tableData[i].water_pattern="稳定模式"
            }else if(this.tableData[i].water_pattern=="7"){
            this.tableData[i].water_pattern="阶跃模式"
            }else if(this.tableData[i].water_pattern=="8"){
                this.tableData[i].water_pattern="震荡模式"
            }else{
            this.tableData[i].water_pattern="无效片段"
            }
            if(this.tableData[i].temp_pattern=="11"){
            this.tableData[i].temp_pattern="恒温正常"
            }else if(this.tableData[i].temp_pattern=="12"){
            this.tableData[i].temp_pattern="恒温异常"
            }else if(this.tableData[i].temp_pattern=="21"){
            this.tableData[i].temp_pattern="加热异常"
            }else if(this.tableData[i].temp_pattern=="22"){
            this.tableData[i].temp_pattern="加热+恒温异常"
            }else if(this.tableData[i].temp_pattern=="0"){
            this.tableData[i].temp_pattern="无效片段"
            }
            else if(this.tableData[i].temp_pattern=="13"){
            this.tableData[i].temp_pattern="恒温熄火"
            }else if(this.tableData[i].temp_pattern=="23"){
            this.tableData[i].temp_pattern="加热异常、恒温熄火"
            }
          }
          this.tableData=JSON.parse(JSON.stringify(this.tableData)); 
          this.button_content = "采集";
          this.button_state = false;
          this.equipment_state = false;
          this.data_state = false;
          clearInterval(this.timer_flag)

          this.timer_flag = null
          this.timer_count = null
          this.currentPage=this.temp_currentPage
            this.$notify({
          title: '成功',
          message: '设备信息采集完成',
          type: 'success',
          duration: 3000,
        });
        }else{

        }
        console.log(response);
      }).catch((err) =>{

      })
    },
    search(){
      this.downloadflag=0
      this.tableData=[]
      this.total=0
      var v;
      var v1;
      const dt = new Date();
      const dt1 = new Date();
      dt.setTime(dt.getTime()-86400000);
      dt1.setTime(dt.getTime()-2592000000);
      v=this.dateFormat(dt);
      v1=this.dateFormat(dt1);
       
      if(this.value3==""||this.value4.length==0) {  // 判断是否为空
      // 提示框 请求失败缺少信息
        this.$notify.error({
          title: '错误',
          message: '请补全设备及时间信息'
        });
      
      }else{
        if(this.timer_flag == null) {
          this.button_state = true;  //按键功能是否为禁用
          this.equipment_state = true; //设备输入功能是否为禁用
          this.data_state = true //日期输入功能是否为禁用
          this.button_content = "正在迁移"; //按键内容

          this.timer_flag = setInterval(this.deal_timer,5000) // 5秒执行一次deal_timer函数
          this.applianceid_temp = this.value3;
          this.starttime_temp = this.value4[0];
          this.endtime_temp = this.value4[1];
        }
        var adjust_flag
        if(this.adjust==false){
          adjust_flag=0
        }else if(this.adjust=true){
          adjust_flag=1
        }
        request.post('cleantasks/sigleapplicance', null, {

        params:
        { 
          adjust_task_flag:adjust_flag,
          downloadflag:this.downloadflag,
          applianceid: this.value3,
          starttime:this.value4[0],
          endtime :this.value4[1],
        },
      }).then(({ data: response }) => {

      }).catch((err) => {
        
      });
    

      }
    },

    download(){
      
      this.downloadflag=1
 console.log(this.temp_currentPage);
         this.tableData=[]
         this.total=0
        request.post('collection/page/getinfo',null,{
        params: {
          perPage: this.perPage,
          // 切记此处的修改
          //currentPage: this.temp_currentPage,// 用于页面显示处理
          downloadflag:this.downloadflag,
          equipment: this.applianceid_temp,
          timeLow: this.starttime_temp,
          timeHigh: this.endtime_temp,
        },
      }).then(({data: response}) => {
        if (response.data.flag_state == "2") {
          this.total =response.data.count
          console.log(response.data)
          for (var i=0;i<response.data.data.length;i++) {
            this.tableData[i]={
        heat_temp_score:response.data.data[i].heat_temp_score,
           stable_temp_score:response.data.data[i].stable_temp_score,
              dev_id: response.data.data[i].dev_id,
              starttime: response.data.data[i].start_time,
              endtime: response.data.data[i].end_time,
              deviation: response.data.data[i].deviation,
              water_score: response.data.data[i].water_score,
              water_pattern: response.data.data[i].water_pattern,
              heat_duration: response.data.data[i].heat_duration,
              un_stable_temp_percent: response.data.data[i].un_stable_temp_percent,
              overshoot_value: response.data.data[i].overshoot_value,
              state_accuracy: response.data.data[i].state_accuracy,
              temp_score: response.data.data[i].temp_score,
              newtempscore: response.data.data[i].new_temp_score,
              temp_pattern: response.data.data[i].temp_pattern,
            }
           if(this.tableData[i].water_pattern=="6"){
            this.tableData[i].water_pattern="稳定模式"
            }else if(this.tableData[i].water_pattern=="7"){
            this.tableData[i].water_pattern="阶跃模式"
            }else if(this.tableData[i].water_pattern=="8"){
                this.tableData[i].water_pattern="震荡模式"
            }else{
            this.tableData[i].water_pattern="无效片段"
            }
            if(this.tableData[i].temp_pattern=="11"){
            this.tableData[i].temp_pattern="恒温正常"
            }else if(this.tableData[i].temp_pattern=="12"){
            this.tableData[i].temp_pattern="恒温异常"
            }else if(this.tableData[i].temp_pattern=="21"){
            this.tableData[i].temp_pattern="加热异常"
            }else if(this.tableData[i].temp_pattern=="22"){
            this.tableData[i].temp_pattern="加热+恒温异常"
            }else if(this.tableData[i].temp_pattern=="0"){
            this.tableData[i].temp_pattern="无效片段"
            }else if(this.tableData[i].temp_pattern=="13"){
            this.tableData[i].temp_pattern="恒温熄火"
            }else if(this.tableData[i].temp_pattern=="23"){
            this.tableData[i].temp_pattern="加热异常、恒温熄火"
            }


          }
          this.tableData=JSON.parse(JSON.stringify(this.tableData)); 
          this.currentPage = this.temp_currentPage // 切记要加上保证页码正确 原因不知道
        }
      }).catch((err) =>{

      })
    
    },

     handlepagechange(){
       this.downloadflag=0,
         console.log(this.temp_currentPage);
         this.tableData=[]
         this.total=0
        request.post('collection/page/getinfo',null,{
        params: {
          downloadflag:this.downloadflag,
          perPage: this.perPage,
          // 切记此处的修改
          currentPage: this.temp_currentPage,// 用于页面显示处理

          equipment: this.applianceid_temp,
          timeLow: this.starttime_temp,
          timeHigh: this.endtime_temp,
        },
      }).then(({data: response}) => {
        if (response.data.flag_state == "2") {
          this.total =response.data.count
          console.log(response.data)
          for (var i=0;i<response.data.data.length;i++) {
            this.tableData[i]={
        heat_temp_score:response.data.data[i].heat_temp_score,
           stable_temp_score:response.data.data[i].stable_temp_score,
              dev_id: response.data.data[i].dev_id,
              starttime: response.data.data[i].start_time,
              endtime: response.data.data[i].end_time,
              deviation: response.data.data[i].deviation,
              water_score: response.data.data[i].water_score,
              water_pattern: response.data.data[i].water_pattern,
              heat_duration: response.data.data[i].heat_duration,
              un_stable_temp_percent: response.data.data[i].un_stable_temp_percent,
              overshoot_value: response.data.data[i].overshoot_value,
              state_accuracy: response.data.data[i].state_accuracy,
              temp_score: response.data.data[i].temp_score,
              newtempscore: response.data.data[i].new_temp_score,
              temp_pattern: response.data.data[i].temp_pattern,
            }
           if(this.tableData[i].water_pattern=="6"){
            this.tableData[i].water_pattern="稳定模式"
            }else if(this.tableData[i].water_pattern=="7"){
            this.tableData[i].water_pattern="阶跃模式"
            }else if(this.tableData[i].water_pattern=="8"){
                this.tableData[i].water_pattern="震荡模式"
            }else{
            this.tableData[i].water_pattern="无效片段"
            }
            if(this.tableData[i].temp_pattern=="11"){
            this.tableData[i].temp_pattern="恒温正常"
            }else if(this.tableData[i].temp_pattern=="12"){
            this.tableData[i].temp_pattern="恒温异常"
            }else if(this.tableData[i].temp_pattern=="21"){
            this.tableData[i].temp_pattern="加热异常"
            }else if(this.tableData[i].temp_pattern=="22"){
            this.tableData[i].temp_pattern="加热+恒温异常"
            }else if(this.tableData[i].temp_pattern=="0"){
            this.tableData[i].temp_pattern="无效片段"
            }
          else if(this.tableData[i].temp_pattern=="13"){
            this.tableData[i].temp_pattern="恒温熄火"
            }else if(this.tableData[i].temp_pattern=="23"){
            this.tableData[i].temp_pattern="加热异常、恒温熄火"
            }
          }
          this.tableData=JSON.parse(JSON.stringify(this.tableData)); 
          this.currentPage = this.temp_currentPage // 切记要加上保证页码正确 原因不知道
        }
      }).catch((err) =>{

      })
    },
    
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.perPage=val;
        this.currentPage=1;
        this.temp_currentPage = 1;
        this.handlepagechange();
    },
    handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage=val;
        this.temp_currentPage = val;
        this.handlepagechange();
    },
    indexMethod(index){
       if(this.downloadflag==1){
           this.currentPage=1
           return(this.currentPage-1)*this.perPage+index+1;
         }
         else{
         return(this.currentPage-1)*this.perPage+index+1;
    }
    },
  
    // 地区框切换触发函数
    handleChange() {
      this.value2 = []
      this.value3 = []
      request.post( 'monitor/page/gettype', null, {
        params:
          { 
            flag: this.value.length,
            province_code: this.value[0],
            city_code: this.value[1],
          },
      }).then(({ data: response }) => {
        console.log(response.data.data)
        this.xinghao = response.data.data
        // this.options1=response.data.data
        // console.log(this.options1)
      }).catch((err) => {
      });  
    },
    // 型号框输入触发函数
    handleSelect() {
      console.log(this.value2)
      if (this.value2.length == 0) {
        this.shebei = []
      } else {
        request.post('monitor/page/getequipment', null, {
          params:
          { 
            flag: this.value.length,
            province_code: this.value[0],
            city_code: this.value[1],
            type: this.value2
          },
        }).then(({ data: response }) => {
          console.log(response.data.data)
          this.shebei = response.data.data
          // this.options1=response.data.data
          // console.log(this.options1)
        }).catch((err) => {
        });  
      }
    },
    // 型号输入框获取相似选项
    querySearch(queryString, cb) {
      var xinghao = this.xinghao;
      var results = queryString ? xinghao.filter(this.createFilter(queryString)) : xinghao;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (xinghao) => {
        return (xinghao.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    // 设备输入框获取相似选项
    querySearch1(queryString, cb) {
      var shebei = this.shebei;
      var results = queryString ? shebei.filter(this.createFilter1(queryString)) : shebei;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter1(queryString) {
      return (shebei) => {
        return (shebei.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
  },
  created() {
    // request.post('monitor/page/gettype', null, {
    //     params:
    //     { 
    //       flag:"type"
    //     },
    //   }).then(({ data: response }) => {
    //     this.options=response.data.Dev_type
    //   }).catch((err) => {
    //   });
    this.axios.get( "data/chinacity copy.json").then((response)=>{
      this.options = response.data;
      this.options = JSON.parse(JSON.stringify(this.options)); 
    }).catch((response)=>{
    })
  },
};
</script>

<style lang="scss">
#myChart {
  // width: 50%;
  // height: 500px;
  // border: 1px solid red;
  // margin: 0 auto;
 
    top: 20px;
  width: 1500px;
  height: 500px;
  margin: auto;

  // background-color: rgba(137, 253, 83, 0.383);
  // grid: {
  //   x: 0;
  //   y: 0;
  //   x2: 0;
  //   y2: 0;
  // }
}
.el-dialog{
    position: fixed!important;
  top: 500 !important;
  left: 500 !important;
  width: 100% !important;
  height: 100% !important;
  margin: 0 !important;
  z-index: 100;
  color: #FFFF;
  background-color: #FFFF;
}
</style>
