<template>
  <div id="app1">
     <div class="search" align="center" style="margin-top:20px;">
         <span>设备管理查询筛选项：</span>
         <span>地区：</span>
          <el-cascader
            ref="cascaderAddr1"
            :options="options"
            v-model="value"
            :props="{ checkStrictly: true }"
            style="width:200px"
            @change="handleChange"
            clearable
            filterable></el-cascader>
         <span>型号：</span>
         <el-select v-model="value2" 
            @change="handleSelect"
            filterable
            allow-create
            clearable
            :fetch-suggestions="querySearch"
            :trigger-on-focus="false"
            placeholder="请选择型号">
            <el-option  
              v-for="item in options2"
              :key="item.value"
              :label="item.label"
              :value="item.value" 
              style="width:180px" 
            ></el-option>
         </el-select>
         <span>设备：</span>
         <el-select v-model="value3"
           @change="handleSelect1"
           filterable
           allow-create
           clearable
           :fetch-suggestions="querySearch1"
           :trigger-on-focus="false"
           placeholder="请选择设备号">
           <el-option  
            v-for="item in options3"
            :key="item.value"
            :label="item.label"
            :value="item.value" 
            style="width:180px" 
           ></el-option>
         </el-select>
         <span style="margin-left:30px">日期: </span>
         <el-date-picker
        v-model="datatime"
        style="width:250px; margin-right:10px;"
        type="daterange"
        align="right"
        range-separator="-"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :default-value="'2011-09-09'-'2021-02-02'"
        :picker-options="pickerOptions"    
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
             <el-table-column  prop="total_count" align="center" width='150px' label="有效片段数"></el-table-column>
             <el-table-column
                label="进水温度统计"
                align="center">
                <template slot-scope="scope">
                <el-button
                @click="openintempchart(scope.row)"
                type="text"
                size="small"
                align="left">
                进水温度统计
                </el-button>
                </template>
             </el-table-column>
             <el-table-column
                label="初始余热统计"
                align="center">
                <template slot-scope="scope">
                <el-button
                @click="openresidualheatchart(scope.row)"
                type="text"
                size="small"
                align="left">
                初始余热统计
                </el-button>
                </template>
             </el-table-column>
              <el-table-column
                label="有效片段种类统计"
                align="center">
                <template slot-scope="scope">
                <el-button
                @click="openfunnelchart(scope.row)"
                type="text"
                size="small"
                align="left">
                有效片段种类统计
                </el-button>
                </template>
             </el-table-column>
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
     <div class="drawintempchart"  height="900px" weith=100%>
     <el-dialog
       :visible.sync="dialogVisibleintemp"
        @open="openintemp()"
       width="30%">
       <div id="intempchart" height=100%  weith=100%></div>
</el-dialog>
     </div>
     <div class="drawresidualheatchart"  height="900px" weith=100%>
     <el-dialog
       :visible.sync="dialogVisibleresidualheat"
        @open="openresidualheat()"
       width="30%">
       <div id="residualheatchart" height=100%  weith=100%></div>
</el-dialog>
     </div>
         <div class="drawfunnelchart"  height="900px" weith=100%>
     <el-dialog
       :visible.sync="dialogVisiblefunnel"
        @open="openfunnel()"
       width="30%">
       <div id="funnelchart" height=100%  weith=100%></div>
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
            "有效片段数":'total_count'
          },
      value:[],
      options:[],
      options2: [],  //型号框下拉
      options3:[],  //设备框下拉
      value2:[],
      value3:[],
      tableData:[],
      datatime:[],
      dialogVisible: false,
      dialogVisibleintemp: false,
      dialogVisibleresidualheat: false,
      dialogVisiblefunnel: false,
      score:[],
      time_date:[],
      intemp:[],
      residualheat:[],
      funnel:[
                    { value: 0, name: '正常' },
                    { value: 0, name: '加热异常' }, 
                    { value: 0, name: '恒温异常' },
                    { value: 0, name: '恒温+加热异常' } ,
                ],
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
      // 地区框切换触发函数
       handleChange() {
       this.value2 = []
       this.value3 = []
       request.post('scoresummary/page/gettype', null, { 
        params:
          { table:"bo",
            flag: this.value.length,
            province_code: this.value[0],
            city_code: this.value[1],
          },
       }).then(({ data: response }) => {
        console.log(response.data.data)
        this.options2 = response.data.data
       }).catch((err) => {
       });  
       },
       // 型号框输入触发函数
       handleSelect() {
         console.log(this.value2)
         var shebeiflag
         shebeiflag= this.value.length//0：只有型号查询 1：省份和型号 2：省份城市和型号
         if (this.value2.length == 0) {//型号空时
         if(shebeiflag==0){shebeiflag=3//地区型号空
         }
         } 
         request.post('scoresummary/page/getequipment', null, {
          params:
          { 
            table:"bo",
            flag: shebeiflag,
            province_code: this.value[0],
            city_code: this.value[1],
            type: this.value2
          },
         }).then(({ data: response }) => {
          console.log(response.data.data)
          this.options3 = response.data.data
         }).catch((err) => {
         });  
      
        },
        search(){if (this.value2==""){
              this.$message.error('很抱歉，请选择型号');
        }else{
            this.$message('查询中，请稍等');      
            this.tableData=[]
            this.tableData=[]
            this.total=0
            request.post('scoresummary/page/search', null, {
            params:
            { 
             province_code: this.value[0],
             city_code: this.value[1],
             type: this.value2,
             equipment: this.value3,
             start_time:this.datatime[0],
             end_time:this.datatime[1]
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
          total_count:response.data.data[i].total_num
          }
         }
         this.tableData=JSON.parse(JSON.stringify(this.tableData)); 
       
         }).catch((err) => { 
         })
        }
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
     city: this.value[1],
   id: row.dev_id,
   type:row.dev_type,
   month:row.start_time,
   month1:row.end_time,

  }
});
 window.open(routeData.href);
      },
    openscorechart(row){
      console.log(this.value[1])
      request.post('scoresummary/page/scorechart', null, {
            params:
            {
             city_code:this.value[1],            
             equipment: row.dev_id,
             start_time:row.start_time,
             end_time:row.end_time
             },
           }).then(({ data: response }) => { 
           console.log(response.data)
            this.score=response.data.score
            this.time_date=response.data.datetime
            this.intemp=response.data.intemp
            this.residualheat=response.data.outtemp
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
          color:['blue','red','blake'],
          // 图例
          legend: [{
            data: ['进水温度','初始余热','片段评分'],
             selected:{'进水温度':true,'初始余热':true,'片段评分':true}

          },],
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
    type: 'category',
    data:this.time_date,
    name: '时间'
    },
  yAxis: [
    {
            name: '温度',
            type: 'value',
            max:100,
            axisLabel: {
              formatter: '{value} °C',
            },
          },
    {
            name: '评分',
            type: 'value',
            max:100,
            axisLabel: {
              formatter: '{value} 分',
            },
          },
  ], 
  series: [
    {
              name: '进水温度',
              yAxisIndex: 0,
              type: 'line',
              data: this.intemp,
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
              name: '初始余热',
              yAxisIndex: 0,
              type: 'line',
              data: this.residualheat,
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
              name: '片段评分',
              yAxisIndex: 1,
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
  openintempchart(row){
      request.post('scoresummary/page/intempchart', null, {
            params:
            {  
             city_code:this.value[1],            
             equipment: row.dev_id,
             start_time:row.start_time,
             end_time:row.end_time
             },
           }).then(({ data: response }) => { 
           console.log(response.data)
                  this.intemp=response.data.intemp
              this.dialogVisibleintemp=true
         }).catch((err) => { 
         })
    },
    openintemp(){
      this.$nextTick(() => {
        this.drawintempchart()
      },100)
    },
    drawintempchart(){
     const myChart = this.$echarts.init(document.getElementById('intempchart'));
                var bins = ecStat.histogram(this.intemp);
   const option = {
                    title: {
                        text: '进水温度直方图',
                        left: 'center',
                        top: 20
                    },
                    color: ['rgb(25, 183, 207)'],
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
                    grid: {
                        left: '3%',
                        right: '3%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                         boundaryGap: '5%',
                        scale: true, //这个一定要设，不然barWidth和bins对应不上
                    },
                    yAxis: {
                    },
                    series: [{
                        name: 'height',
                        type: 'bar',
                        barWidth: '99.3%',
                        // barCategoryGap: 0,
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                        data: bins.data
                    }]
                };

 myChart.setOption(option,true);

    },
openresidualheatchart(row){
      request.post('scoresummary/page/residualheatchart', null, {
            params:
            {  
             city_code:this.value[1],            
             equipment: row.dev_id,
             start_time:row.start_time,
             end_time:row.end_time
             },
           }).then(({ data: response }) => { 
           console.log(response.data)
                  this.residualheat=response.data.residualheat
              this.dialogVisibleresidualheat=true
         }).catch((err) => { 
         })
    },
 openresidualheat(){
      this.$nextTick(() => {
        this.draweresidualheatchart()
      },100)
    },
    draweresidualheatchart(){
     const myChart = this.$echarts.init(document.getElementById('residualheatchart'));
                var bins = ecStat.histogram(this.residualheat);
   const option = {
                    title: {
                        text: '余热直方图',
                        left: 'center',
                        top: 20
                    },
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
                    color: ['rgb(25, 183, 207)'],
                    grid: {
                        left: '3%',
                        right: '3%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                         boundaryGap: '5%',
                        scale: true, //这个一定要设，不然barWidth和bins对应不上
                    },
                    yAxis: {
                    },
                    series: [{
                        name: 'height',
                        type: 'bar',
                        barWidth: '99.3%',
                        // barCategoryGap: 0,
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                        data: bins.data
                    }]
                };

 myChart.setOption(option,true);

    },

openfunnelchart(row){
  

      request.post('scoresummary/page/funnelchart', null, {
            params:
            {  
             city_code:this.value[1],            
             equipment: row.dev_id,
             start_time:row.start_time,
             end_time:row.end_time
             },
           }).then(({ data: response }) => { 
           console.log(response.data)
                   this.funnel[0].value=response.data.funnel.pattern11
                   this.funnel[1].value=response.data.funnel.pattern21
                   this.funnel[2].value=response.data.funnel.pattern12
                   this.funnel[3].value=response.data.funnel.pattern22
                   console.log(this.funnel)
              this.dialogVisiblefunnel=true
         }).catch((err) => { 
         })
    },
 openfunnel(){
      this.$nextTick(() => {
        this.drawfunnelchart()
      },100)
      
    },
    drawfunnelchart(){
     const myChart = this.$echarts.init(document.getElementById('funnelchart'));

   const option = {
  title: {
    text: '有效片段种类统计',
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  },
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
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: '50%',
      data:this.funnel,
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
};
 myChart.setOption(option,true);

    },

 handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.perPage=val;
      this.currentPage=1;
      this.temp_currentPage = 1;
      this.Search_Info();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage=val;
      this.temp_currentPage = val;
      this.Search_Info();
    },

    },
  created() {
//如果单独打开不起作用
if(this.$route.query.id!=undefined){
  var city=this.$route.query.city.slice(0,2)+"0000" 
  console.log(city);
  this.value=[city,this.$route.query.city]
  var mon=[this.$route.query.month,this.$route.query.month1]
this.datatime=[mon[0],mon[1]]
this.handleChange(this.value)
this.value2=this.$route.query.type
this.value3=this.$route.query.id
this.search()
}else{
  //默认时间显示近一周
  const dt  = new Date();
  const dt1 = new Date();
  dt.setTime(dt.getTime()-86400000);//一天是86400000
  dt1.setTime(dt.getTime()-86400000*30);  //一月
  this.datatime[0]=this.dateFormat(dt1),//一周前的时间
  this.datatime[1]=this.dateFormat(dt);  //今天的时间
  this.axios.get( "data/chinacity copy.json").then((response)=>{
      this.options = response.data;
      this.options = JSON.parse(JSON.stringify(this.options));
    }).catch((response)=>{
    })
    this.value=[this.options[0].value,this.options[0].children[0].value]
    this.handleChange(this.value)
}

//默认时间显示近一周
  // const dt  = new Date();
  // const dt1 = new Date();
  // dt.setTime(dt.getTime()-86400000);//一天是86400000
  // dt1.setTime(dt.getTime()-86400000*30);  //一月
  // this.datatime[0]=this.dateFormat(dt1),//一周前的时间
  // this.datatime[1]=this.dateFormat(dt);  //今天的时间
  

  //   this.axios.get( "data/chinacity copy.json").then((response)=>{
  //     this.options = response.data;
  //     this.options = JSON.parse(JSON.stringify(this.options));
  //   }).catch((response)=>{
  //   })
  },

};
</script>
<style lang="scss">

#scorechart {
  width: 100%;
  height: 100%;
  margin: auto;

}
#intempchart {
  width: 100%;
  height: 100%;
  margin: auto;

}
#residualheatchart {
  width: 100%;
  height: 100%;
  margin: auto;

}
#funnelchart {
  width: 100%;
  height: 100%;
  margin: auto;

}
</style>
