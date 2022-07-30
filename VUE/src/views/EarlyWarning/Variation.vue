<template>
  <div id="app1">
     <div class="search" align="center" style="margin-top:20px;">
         <span>设备管理查询筛选项：</span>
         <span style="margin-left:30px">日期: </span>
          <el-date-picker
      :disabled="data_state"
      id="ti"
      v-model="datatime"
      style="width:200px;margin-left:0"
      type="date"
      align="right"
      placeholder="选择日期"
      format="yyyy-MM-dd"
      value-format="yyyy-MM-dd">
    </el-date-picker>
         <el-button type="primary" @click="search" >查询</el-button>
         <br/>
         <download-excel
          :fields = "json_fields"
          :data="tableData"
          :before-generate = "startDownload"
          :before-finish = "finishDownload"
          name="listdata.xls"
          align="center"
          type="xls">
          <el-button>导出Excel</el-button>
         </download-excel>
     </div>
     <div class="table" align="center" style="margin-top:20px;">
         <!--tableData设备统计指标-->
         <el-table  ref="tableRef" :data="tableData" height="900px" border style="width: 100%;margin-top:20px" align="center">
             <el-table-column  type="index"  align="center" width='60px' label="序号" :index="indexMethod"></el-table-column>
             <el-table-column  prop="dev_id" align="center" width='180px' label="设备"></el-table-column>
             <el-table-column  prop="dev_city" align="center" width='80px' label="城市"></el-table-column>
             <el-table-column  prop="dev_type" align="center" width='100px' label="型号"></el-table-column>
             <el-table-column  prop="start_time" align="center" width='150px' label="开始时间"></el-table-column>
             <el-table-column  prop="end_time" align="center" width='150px' label="结束时间"></el-table-column>
             <el-table-column  prop="temp_score_down_percent" align="center" width='150px' label="温度评分下降占比"></el-table-column>
             <el-table-column
                label="评分变化曲线"
                align="center">
                <template slot-scope="scope">
                <el-button
                @click="openscorechart(scope.row)"
                type="text"
                size="small"
                align="left">
                评分变化曲线
                </el-button>
                </template>
             </el-table-column>
             <el-table-column
               label="设备统计"
               align="center">
               <template slot-scope="scope">
               <el-button
               @click="jumppage1(scope.row)"
               type="text"
               size="small"
               align="left">
               设备统计
               </el-button>
               </template>
             </el-table-column>
             <el-table-column
               label="片段详情"
               align="center">
               <template slot-scope="scope">
               <el-button
               @click="jumppage(scope.row)"
               type="text"
               size="small"
               align="left">
               片段详情段
               </el-button>
               </template>
             </el-table-column>
         </el-table>
     </div>
     <div class="drawscorechart"  height="900px" weith=100%>
    <el-dialog
       title="评分曲线"
       :visible.sync="dialogVisible"
        @open="openscore()"
       width="30%">
       <div id="scorechart" height=100%  weith=100%></div>
</el-dialog>
     </div>
  </div>
</template>
<script>
import * as  ecStat from 'echarts-stat';
import * as echarts from 'echarts';
import request from '@/utils/request';
import JsonExcel from 'vue-json-excel';
export default{
  components: {'download-excel': JsonExcel},
  data(){return{
      json_fields: {       
          "设备":{ 
            field:"dev_id",
            callback:value =>{
              return  "&nbsp;" +value;
            }
            },
          '城市': 'dev_city',
         "型号":{ 
            field:"dev_type",
            callback:value =>{
              return  "&nbsp;" +value;
            }
            },
            "开始时间":'start_time',
            "结束时间":'end_time',
            "评分下降比":'temp_score_down_percent'
          },
      tableData:[],
      datatime:"",
      dialogVisible: false,
      score:[],
      time_date:[],
      intemp:[],
      residualheat:[],
      tempscoreavg:[],
      upperlimit:[],
      lowerlimit:[]
     };
    },
  methods:{
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
        search(){
            this.$message('查询中，请稍等');      
            this.tableData=[]
            this.tableData=[]
            this.total=0
            request.post('earlywarning/page/search', null, {
            params:
            { 
             datatime:this.datatime
             },
           }).then(({ data: response }) => { 
           if (response.data.data==""){
                  this.$message.error('很抱歉，查询结果为空');
           }
           if (response.data.data!=""){
           this.$message({
           message: '恭喜你，查询成功',
           type: 'success'
           });
          }
         console.log(response.data)
         console.log(response.data.data.length)
         for(var i=0;i<response.data.data.length;i++){
         this.tableData[i]={
          dev_id:response.data.data[i].dev_id,
          dev_city:response.data.data[i].dev_city,
          dev_type:response.data.data[i].dev_type,
          start_time:response.data.data[i].start_time,
          end_time:response.data.data[i].end_time,
          temp_score_down_percent:response.data.data[i].temp_score_down_percent,
          city_code:response.data.data[i].city_code
          }
         }
         this.tableData=JSON.parse(JSON.stringify(this.tableData)); 
         this.$nextTick(() => {
        this.drawfenbuchart()
      },100)
         }).catch((err) => { 
         })
          },
          //时间格式转换
          dateFormat:function(time) {
    var date=new Date(time);
    var year=date.getFullYear();
    var month= date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
    var day=date.getDate()<10 ? "0"+date.getDate() : date.getDate();
    var hours=date.getHours()<10 ? "0"+date.getHours() : date.getHours();
    var minutes=date.getMinutes()<10 ? "0"+date.getMinutes() : date.getMinutes();
    var seconds=date.getSeconds()<10 ? "0"+date.getSeconds() : date.getSeconds();
    // 拼接 可改成自己所要的时间格式
    return year+"-"+month+"-"+day;
    },
    
      jumppage(row) {
       console.log(row)

      let routeData = this.$router.resolve({
     path:'indextemp',
 query: {
     temp_pattern:"有效",
     city: row.city_code,
   id: row.dev_id,
   type:row.dev_type,
   month:row.start_time,
   month1:row.end_time,

  }
});
 window.open(routeData.href);
      },
       jumppage1(row) {
       console.log(row)

      let routeData = this.$router.resolve({
     path:'total',
 query: {
     city: row.city_code,
   id: row.dev_id,
   type:row.dev_type,
   month:row.start_time,
   month1:row.end_time,

  }
});
 window.open(routeData.href);
      },
openscorechart(row){
      request.post('earlywarning/page/scorechart', null, {
            params:
            {
             city_code:row.city_code,            
             equipment: row.dev_id,
             start_time:row.start_time,
             end_time:row.end_time
             },
           }).then(({ data: response }) => { 
           console.log(response.data)
            this.score=response.data.score
            this.time_date=response.data.datetime
            this.tempscoreavg=response.data.tempscoreavg
            this.upperlimit=response.data.upperlimit
            this.lowerlimit=response.data.lowerlimit
              this.dialogVisible=true
         }).catch((err) => { 
         })
    },
    openscore(){
      this.$nextTick(() => {
        this.drawscorechart()
      },100)
    },
     drawscorechart(){
     const myChart = this.$echarts.init(document.getElementById('scorechart'));
 const   option = {
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
          color:['black','red','red','green'],
          // 图例
          legend: [{
            data: ['评分均值','评分上限','评分下限','片段评分'],
             selected:{'评分均值':true,'评分上限':true,'评分下限':true,'片段评分':true}

          },],
          // 缩放操作
          toolbox: {
            show: true,
             top:10,
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
    data:this.time_date,
    name: '时间'
    },
  yAxis: [
    {
            name: '片段评分',
            type: 'value',
            axisLabel: {
              formatter: '{value} 分',
            },
          },
  ], 
  series: [
    {
              name: '评分均值',
              yAxisIndex: 0,
              type: 'line',
              data: this.tempscoreavg,
              symbol: 'none',
              itemStyle: {      
                            normal: {
                                lineStyle: {
                                    width: 2,
                                    type: 'solid' ,//'dotted'虚线 'solid'实线
                                }
                            }
                        },

            },
        {
              name: '评分上限',
              yAxisIndex: 0,
              type: 'line',
              data: this.upperlimit,
              symbol: 'none',
              itemStyle: {      
                            normal: {
                                lineStyle: {
                                    width: 2,
                                    type: 'dotted' ,//'dotted'虚线 'solid'实线
                                }
                            }
                        },

            },
            {
              name: '评分下限',
              yAxisIndex: 0,
              type: 'line',
              data: this.lowerlimit,
              symbol: 'none',
              itemStyle: {      
                            normal: {
                                lineStyle: {
                                    width: 2,
                                    type: 'dotted' ,//'dotted'虚线 'solid'实线
                                }
                            }
                        },

            },
            {
              name: '片段评分',
              yAxisIndex: 0,
              type: 'line',
              data: this.score,
              symbol: 'none',
              itemStyle: {      
                            normal: {
                                lineStyle: {
                                    width: 2,
                                    type: 'solid' ,//'dotted'虚线 'solid'实线
                                }
                            }
                        },

            },

  ]
};
 myChart.setOption(option,true);
    },
  
    },
  created() {
//默认时间显示近一周
  const dt  = new Date();

  dt.setTime(dt.getTime()-86400000);//一天是86400000
 
  this.datatime=this.dateFormat(dt),//昨天的时间
   setTimeout(() => {

 this.search()
    },100);
    this.axios.get( "data/chinacity copy.json").then((response)=>{
      this.options = response.data;
      this.options = JSON.parse(JSON.stringify(this.options)); 
    }).catch((response)=>{
    })
  },

};
</script>
<style lang="scss">

#scorechart {
  width: 100%;
  height: 100%;
  margin: auto;

}
</style>