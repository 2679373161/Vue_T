<template>
  <div class="page"  style="margin-top:20px;">
      <div class="InfoGet"  center >
        <el-form ref="form" class="ItemInfo" :model="Equment_info" label-width="80px"  :inline="true">
            <!-- 设备型号筛选 -->
            <el-form-item class="ItemInfoType" label="设备型号" prop="EqumentType" style="margin-left:15rem;">
                <el-select v-model="Equment_info.EqumentType" placeholder="请选择设备型号" clearable>
                    <el-option  v-for="item in TypeList" :key="item.value" :label="item.label"
                        :value="item.value" clearable></el-option>
                </el-select>
            </el-form-item>
            <!-- 故障筛选 -->
            <el-form-item class="ItemInfoError" label="故障类型" prop="ErrorType">
                <el-select v-model="Equment_info.ErrorType" placeholder="请选择故障类型" clearable>
                    <el-option  v-for="item in ErrorList" :key="item.value" :label="item.label"
                        :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <!-- 时间筛选 -->
            <el-form-item class="ItemInfoTime" label="日期" prop="TimeData">
                <el-date-picker
                    v-model="Equment_info.TimeData"
                    type="daterange"
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd">
                </el-date-picker>
                <el-button type="primary" @click="Search_Info"  style="margin-left:0.9rem;">查询</el-button>
            </el-form-item>
            <el-form-item class="ItemInfoTime" >
            <download-excel
                :fields = "json_fields"
                :data="Equment_AllInfo"
                name="listdata.xls"
                type="xls">
                <el-button>当前页导出Excel</el-button>
            </download-excel>
            <!-- :before-generate = "startDownload"
                :before-finish = "finishDownload" -->
            </el-form-item>
        </el-form>
    
      </div>
    <el-table ref="tableRef" :data="Equment_AllInfo" :cell-style="cellStyle"  max-height="900" border style="width: 100%;margin-top:0.5rem" align="center">
        <el-table-column  type="index"  align="center"  label="序号" :index="indexMethod"></el-table-column>
        <el-table-column  prop="time" align="center"  label="时间"></el-table-column>
        <el-table-column  prop="type" align="center"  label="型号"></el-table-column>
        <el-table-column  prop="errortype" align="center"  label="主要故障类型"></el-table-column>
        <el-table-column  prop="errorcount" align="center"  label="故障次数"></el-table-column>
         <el-table-column  prop="per" align="center"  label="该故障占比"></el-table-column>
        <el-table-column  prop="errorelsecount" align="center"  label="其他故障次数"></el-table-column>
        <el-table-column  prop="allerrorcount" align="center"  label="总故障次数"></el-table-column>
        <el-table-column
      label="操作"
      align="center">
      <template slot-scope="scope">
        <el-button
          @click="jumppage1(scope.row)"
          type="text"
          size="small"
          align="left">
          设备故障详情
        </el-button>
      </template>
    </el-table-column>

    </el-table>
      <el-pagination align="center"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      background
      prev-text="上一页"
      next-text="下一页"
      :current-page.sync="currentPage"
      :page-sizes="[25,50]"
      :page-size="perPage"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script type="text/ecmascript-6">
import request from '@/utils/request';
import JsonExcel from 'vue-json-excel';
export default {
  data () {
    return {
      // 导出excel信息
      json_fields: {
        
        '设备型号':'type',
        '时间':'time',
        '故障类型':'errortype',
        '故障次数':'errorcount',
        '其他故障次数':'errorelsecount',
        '总故障次数':'allerrorcount',
      },
      // 页面信息
      fanye:0,
      currentPage: 1, // 当前页
      temp_currentPage: 1,// 临时页数
      perPage:25,// 每页显示条数
      total: 0, // 默认总条数
      // 设备信息
      Equment_info:{
        ErrorType:'',
        TimeData:[],
        EqumentType:'',
      },
      Equment_AllInfo:[],
      // 故障列表
      ErrorList: [
        {
          value:'E0',
          label:'出水传感器故障(E0)',
        },
        {
          value:'E1',
          label:'意外熄火(E1)',
        },
        {
          value:'E2',
          label:'伪火故障(E2)',
        },
        {
          value:'E3',
          label:'温控器故障(E3)',
        },
        {
          value:'E4',
          label:'超温故障(E4)',
        },
        {
          value:'E5',
          label:'风机故障(E5)',
        },
        {
          value:'E6',
          label:'开关阀故障(E6)',
        },
        {
          value:'E8',
          label:'水泵故障(E8)',
        },
        {
          value:'EA',
          label:'CO故障(EA)',
        },
        {
          value:'EE',
          label:'超时故障(EE)',
        },
        {
          value:'ED',
          label:'紫外杀菌灯故障(Ed)',
          disabled: true
        },
        {
          value:'F2',
          label:'进水温度传感器故障(F2)',
        },
        {
          value:'C0',
          label:'点火失败(C0)',
        },
        {
          value:'C1',
          label:'残火故障(C1)',
        },
        {
          value:'C2',
          label:'风压开关/传感器误接通故障(C2)',
        },
        {
          value:'C3',
          label:'风压开关/传感器无法接通故障(C3)',
        },
        {
          value:'C4',
          label:'风堵故障(C4)',
        },
        {
          value:'C5',
          label:'水路堵塞故障(C5)',
        },
        {
          value:'C6',
          label:'水流传感器故障(C6)',
        },
        {
          value:'C7',
          label:'负荷异常(C7)',
        },
        {
          value:'C8',
          label:'热电偶异常(C8)',
        },
        {
          value:'EH',
          label:'CH4异常(EH)',
        },
        {
          value:'EF',
          label:'气泡水故障(EF)',
        },
      ],
      // 设备型号列表
      TypeList:[],
    }
  },
  components: {
    'download-excel': JsonExcel
  },
  methods:{
    cellStyle(row,column,rowIndex,columnIndex){
  
        if(row.row.allerrorcount!=0){
          return {"color":"red","background":"#f2eada"}
        }
      
    },

    AllInfo_init() {
      if (this.$route.query.type != null) {
        this.Equment_info.EqumentType = this.$route.query.type; 
        this.Equment_info.TimeData[0] = this.$route.query.time0; // 一周前的时间
        this.Equment_info.TimeData[1] = this.$route.query.time1; // 今天的时间
      }
      request.post('faultstatistics/page/typesearch', null, {
        params:
           {
             dev_type: this.Equment_info.EqumentType, 
             start_time: this.Equment_info.TimeData[0],
             end_time: this.Equment_info.TimeData[1],
             perPage: this.perPage,
             // 切记此处的修改
             currentPage: this.temp_currentPage,// 用于页面显示处理
           },
      }).then(({ data: response }) => {
        console.log(response)
        // 设备型号筛选初始化
        for (let index = 0; index < response.data.MideaTypeFault_info.length; index++) {
           
          this.TypeList.push({
            value: response.data.MideaTypeFault_info[index].dev_type,
            label: response.data.MideaTypeFault_info[index].dev_type,
          });
          // 填充错误类别
          for (var listnum = 0; listnum < this.ErrorList.length; listnum++) { 
            if ((this.ErrorList[listnum].value.toLowerCase()) == (response.data.MideaTypeFault_info[index].max_error).toLowerCase()) {
              this.Equment_AllInfo[index] = {
                time: response.data.MideaTypeFault_info[index].time_date,
                type: response.data.MideaTypeFault_info[index].dev_type,
                // errortype: response.data.MideaTypeFault_info[index].max_error,
                errortype: this.ErrorList[listnum].label,
                errorcount: response.data.MideaTypeFault_info[index].max_error_count,
                errorelsecount: response.data.MideaTypeFault_info[index].max_other_count,
                allerrorcount: response.data.MideaTypeFault_info[index].all_error_count,
               // per:(response.data.MideaTypeFault_info[index].max_error_count/response.data.MideaTypeFault_info[index].all_error_count*100).toFixed(0)+'%',
              };
              if(this.Equment_AllInfo[index].allerrorcount==0){
           this.Equment_AllInfo[index].per="0%" }
           else{
             this.Equment_AllInfo[index].per=(this.Equment_AllInfo[index].errorcount/this.Equment_AllInfo[index].allerrorcount*100).toFixed(0)+'%'
           }

              break;
            }

          }
        }
        this.total = response.data.total_info_num
        console.log(response.data.total_info_num)
        console.log(this.total)
        this.TypeList=JSON.parse(JSON.stringify(this.TypeList));
        this.Equment_AllInfo=JSON.parse(JSON.stringify(this.Equment_AllInfo));
 
        console.log(this.Equment_AllInfo)

      }).catch((err) => {
        this.$message({
          showClose: true,
          message: '信息获取失败,请检查网络连接',
          type: 'error'
        });
        console.log(err);
      }); 
 
    },
    Search_Info() {
    //   console.log(this.Equment_info.EqumentType)
    //   console.log(this.Equment_info.ErrorType)
    //   console.log(this.Equment_info.TimeData)
    //   console.log(this.Equment_info.TimeData[0])
    //   console.log(this.Equment_info.TimeData[1])
      this.Equment_AllInfo = []
      if(this.fanye==0){
  this.temp_currentPage=1
}
      if (this.Equment_info.TimeData == null || this.Equment_info.TimeData.length == 0) {
        this.Equment_info.TimeData = [];
      }
      request.post('faultstatistics/page/typesearch', null, {
        params:
           {
             dev_type: this.Equment_info.EqumentType,
             error_type: this.Equment_info.ErrorType.toLowerCase(),
             start_time: this.Equment_info.TimeData[0],
             end_time: this.Equment_info.TimeData[1],
             perPage: this.perPage,
             // 切记此处的修改
             currentPage: this.temp_currentPage,// 用于页面显示处理
           },
      }).then(({ data: response }) => {
        for (let index = 0; index < response.data.MideaTypeFault_info.length; index++) {
        // 填充错误类别
          for (var listnum = 0; listnum < this.ErrorList.length; listnum++) { 
            if ((this.ErrorList[listnum].value.toLowerCase()) == (response.data.MideaTypeFault_info[index].max_error).toLowerCase()) {
              this.Equment_AllInfo[index] = {
                time: response.data.MideaTypeFault_info[index].time_date,
                type: response.data.MideaTypeFault_info[index].dev_type,
                // errortype: response.data.MideaTypeFault_info[index].max_error,
                errortype: this.ErrorList[listnum].label,
                errorcount: response.data.MideaTypeFault_info[index].max_error_count,
                errorelsecount: response.data.MideaTypeFault_info[index].max_other_count,
                allerrorcount: response.data.MideaTypeFault_info[index].all_error_count,
              };              if(this.Equment_AllInfo[index].allerrorcount==0){
           this.Equment_AllInfo[index].per="0%" }
           else{
             this.Equment_AllInfo[index].per=(this.Equment_AllInfo[index].errorcount/this.Equment_AllInfo[index].allerrorcount*100).toFixed(0)+'%'
           }
              break;
            }
          }
        }
           this.total = response.data.total_info_num
        console.log(response.data.total_info_num)
        console.log(this.total)
        this.Equment_AllInfo=JSON.parse(JSON.stringify(this.Equment_AllInfo));

        this.currentPage=this.temp_currentPage ;
        if (this.Equment_AllInfo.length == 0) {
          this.$message({
            showClose: true,
            message: '获取信息为空',
            type: 'error'
          });    
        }
        console.log(this.Equment_AllInfo)
      }).catch((err) => {
        this.$message({
          showClose: true,
          message: '信息获取失败,请检查网络连接',
          type: 'error'
        });
        console.log(err);
      }); 
    },
    dateFormat:function(time) {
      var date=new Date(time);
      var year=date.getFullYear();
      var month= date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
      var day=date.getDate()<10 ? "0"+date.getDate() : date.getDate();
      var hours=date.getHours()<10 ? "0"+date.getHours() : date.getHours();
      var minutes=date.getMinutes()<10 ? "0"+date.getMinutes() : date.getMinutes();
      var seconds=date.getSeconds()<10 ? "0"+date.getSeconds() : date.getSeconds();
      // 拼接 可改成自己所要的时间格式
    //   return year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;
      return year+"-"+month+"-"+day;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.perPage=val;
      this.currentPage=1;
      this.temp_currentPage = 1;
      this.fanye=1
      this.Search_Info();
      this.fanye=0
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage=val;
      this.temp_currentPage = val;
      this.fanye=1
      this.Search_Info();
      this.fanye=0
    },
    indexMethod(index) {
      return(this.currentPage-1)*this.perPage+index+1;
    
    }, jumppage1(row) {
       console.log(row)

      let routeData = this.$router.resolve({
     path:'equfault',
 query: {

   type: row.type,
   time:row.time,

  }
});
 window.open(routeData.href);
      },
  },
  created() {
    // 初始化表单信息
    // 默认时间显示近一周
    const dt  = new Date();
    const dt1 = new Date();
    dt.setTime(dt.getTime()- 86400000);
    dt1.setTime(dt.getTime() - 86400000*6); // 一周
    this.Equment_info.TimeData[0] = this.dateFormat(dt1); // 一周前的时间
    this.Equment_info.TimeData[1] = this.dateFormat(dt); // 今天的时间
    console.log(this.Equment_info.TimeData)
    this.AllInfo_init(); 

  },
}
</script>

<style scoped lang="scss" >

.InfoGet{
    // width: 100%;
    margin:0px auto;
    // .ItemInfo {
    //     display: flex;
    //     padding-top: 1%;
    // }
}


</style>
