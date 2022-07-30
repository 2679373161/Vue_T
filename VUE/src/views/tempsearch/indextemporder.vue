<template>
  <div id="app1">
    <div class="search" align="center" style="margin-top:20px;">
      <el-form ref="form" class="ItemInfo" :model="equipment_info" label-width="80px" :inline="true">
    <el-select v-model="value" placeholder="月份/日期范围" style="width:120px;margin-left:30px;" @change="switchTimeselection">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select> 
    <el-date-picker
      v-model="value1"
      type="month"
      placeholder="月份单选"
       format="yyyy-MM"
     style="margin-left:0px;"
      value-format="yyyy-MM"
      v-if="value=='1'">
    </el-date-picker>
    <el-date-picker
      v-model="value2"
      type="date"
      placeholder="日期单选"
      format="yyyy-MM-dd"
      style="margin-left:0px;"
      value-format="yyyy-MM-dd"
      v-if="value=='2'">
    </el-date-picker>
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

    <el-table :data="tableData" key="one" border style="width: 100%;margin-top:10px" align="center" :cell-style="cellStyle">
        <el-table-column type="index" align="center" width='60px' label="序号"></el-table-column>
        <el-table-column key='1' prop="dev_city" align="center"  label="地区"></el-table-column>
        <el-table-column key='3' prop="dev_type" align="center" label="型号"></el-table-column>
        <el-table-column key='100' prop="dev_id" align="center" label="设备"></el-table-column>
        <el-table-column key='2' prop="time_date" align="center" label="年-月" v-if="value=='1'"></el-table-column>
        <el-table-column key='200' prop="time_date" align="center" label="年-月-日" v-if="value=='2'"></el-table-column>

        <el-table-column v-if="value=='1'"    key='34' prop="temp_score" align="center" label="温度评估分数（0~100）"></el-table-column>
        <el-table-column v-if="value=='2'"  key='34' prop="temp_score" align="center" label="温度评估分数（0~100）"></el-table-column>

        <el-table-column key='4' prop="city_code" v-if="false" align="center" label="城市编码"></el-table-column>
      
        <el-table-column
            label="操作"
            align="center">
            <template slot-scope="scope">
                <el-button
                    @click="jumppage(scope.row)"
                    type="text"
                    size="small"
                    align="left">
                    设备详情
                </el-button>
            </template>
        </el-table-column>
       
    </el-table>

  </div>
</template>

<script>
import request from '@/utils/request';
import Manager from "@/assets/js/test.js";//求指标
import JsonExcel from 'vue-json-excel';
export default {
   components: {
      'download-excel': JsonExcel
    }, 
  data() {
    return {
      value:'1',
      options:[
        {
          value: '1',
          label: '月份选取'
        }, {
          value: '2',
          label: '日期选取'
      }],
      value1:'',
      value2:'',
      tableData:[],
       json_fields: {
          '地区': 'dev_city',
          '型号': 'dev_type',
          "设备":{ 
            field:"dev_id",
            callback:value =>{
              return  "&nbsp;" +value;
            }
            },
          "年-月":{ 
            field:"time_date",
            callback:value =>{
              return  "&nbsp;" +value;
            }
            },
          '温度评估分数': 'temp_score',
          },
    };
  },
  methods:{
    switchTimeselection(){
      setTimeout(() => {  
        this.search()
      }, 50)
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
    jumppage(row){
      var month
      var month1
      if(this.value=="1"){
          var dt=new Date(row.time_date)
          dt.setDate(1)
          console.log(row.time_date,dt)
          var y =dt.getFullYear(); //得到年份
          var m =dt.getMonth()+1; //得到月份
          var d =dt.getDate(); //得到日期  
          m = m.toString().padStart(2, "0");
          d = d.toString().padStart(2, "0");
          month=`${y}-${m}-${d}`
          dt.setTime(dt.setMonth(dt.getMonth()+1));
          dt.setDate(0)
          console.log(dt)
          var y =dt.getFullYear(); //得到年份
          var m =dt.getMonth()+1; //得到月份
          var d =dt.getDate(); //得到日期  
          m = m.toString().padStart(2, "0");
          d = d.toString().padStart(2, "0");
          month1=`${y}-${m}-${d}`
      }else{
          month=row.time_date
          month1=row.time_date
      }
      let routeData = this.$router.resolve({
      path:'indextempequipment',   
      query: {
        province:row.city_code.slice(0,2)+"0000",
        city:row.city_code,
        type:row.dev_type,
        id:row.dev_id,
        month:month,
        month1:month1,
      }
      });
      window.open(routeData.href);
    },
    search(){
      var flag1
      
      if(this.value=="1"){
        flag1="1"
      }
      else{
        flag1="0" 
      }
      request.post('indextemp/page/temporder', null, {
        params:
          { 
            flag1:flag1,
            month:this.value1,
            day:this.value2
          },
      }).then(({ data: response }) => {
        console.log(response.data.data)
        this.tableData=response.data.data
        for(var i=0;i<response.data.data.length;i++){
            this.tableData[i].dev_city=response.data.city[i]

        
        }    
       
      }).catch((err) => {
      });  
    }
  },
  created() {
    request.post('indextemp/page/temporder', null, {
      params:
        { 
          flag:1,
          flag1:1,
        },
      }).then(({ data: response }) => {
        console.log(response.data.month1)
        this.value1=response.data.month1
        this.value2=response.data.day1
        this.tableData=response.data.data

        for(var i=0;i<response.data.data.length;i++){
            this.tableData[i].dev_city=response.data.city[i]
        }

      }).catch((err) => {
      });             
  },
};
</script>

<style lang="scss">

#myChart {
    top: 40px;
  width: 1000px;
  height: 500px;
  margin: auto;
}
</style>
