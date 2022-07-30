<template>
  <div>
    
     <div class="search" align="center" style="margin-top:20px; margin-bottom:20px;">
       <span>地区：</span>
         <el-cascader
     ref="cascaderAddr"
     @change="handleChange"
     v-model="value"
    :options="options"
     style="width:200px;margin-left:0;"
    clearable></el-cascader>
    
         <div class="monthselect" >
    <span style="margin-left:30px">月份：</span>
     <el-date-picker
     style="width:200px;margin-left:0"
      v-model="month"
      type="month"
      placeholder="选择月"
       format="yyyy-MM"
      value-format="yyyy-MM">
    </el-date-picker>
    
    <el-button type="primary" @click="search" style="margin-left:50px">查询</el-button>
    <el-button type="text" style="margin-left:50px;" @click="chooseType">{{chooseTypetext}}<i class="el-icon-caret-right" v-if="!chooseTypeflag"></i><i class="el-icon-caret-left" v-if="chooseTypeflag"></i></el-button>
      
      <el-cascader
        ref="cascaderAddr"
        v-if="chooseTypeflag"
        v-model="value2"
        :options="options1"
        style="width:250px;margin-left:0"
        placeholder="请选择型号"
        @change="search"
        clearable>
      </el-cascader>
         </div>
  </div>
   <h4 style="margin-top: 20px;"><strong>{{text1}}-各型号设备数据信息汇总</strong></h4>
 <div class="popover1">
    
      <h4 style="width: 520px" ><strong>{{city}}数据统计</strong></h4>
   
    
  </div>
      <el-table :data="tableData" border height="500" style="width: 100%" align="center"  :row-class-name="tableRowClassName1" 
      :default-sort = "{prop: 'un_stable_proportion', order: 'descending'}">
      <el-table-column  type="index" align="center" label="序号"></el-table-column>
      <el-table-column  prop="dev_type" align="center" label="型号"></el-table-column>
      <el-table-column  prop="dev_id" align="center" label="设备"></el-table-column>
      <el-table-column  prop="water_score" align="center" sortable label="水流量评分"></el-table-column>
      <el-table-column  prop="un_stable_proportion" align="center" sortable label="不稳定占比%"></el-table-column>
      <el-table-column  prop="water_valid_time" align="center" sortable label="总用水时长"></el-table-column>
      <el-table-column  prop="average_time" align="center" sortable label="平均用水时长"></el-table-column>
      <el-table-column  prop="water_num" align="center" sortable label="总用水次数"></el-table-column>
      <el-table-column
      label="操作"
      align="center"
      >
      <template slot-scope="scope">
        <el-button
          @click="jumppage(scope.row)"
          type="text"
          size="small"
          align="left">
          设备详细
        </el-button>
      </template>
    </el-table-column>
    
      </el-table>
 

    
  </div>
</template>
<script>
import request from '@/utils/request';
  import VDistpicker from 'v-distpicker'

  var cityname=[];
export default {
  components: { VDistpicker },
  data() {
    return {
     chooseTypeflag:false,
     typeflag:"1",
        chooseTypetext:'可型号单选',
     options: [],
       options1: [],
      tableData: [],
      value1:"",
      value2:[],
      month:this.$route.query.month,
       //model: 'Jun',
      text1:'',
      city_id: this.$route.query.id,
       value:[],
       id:this.$route.query.id,
      }
  },


  created() { 
    this.axios.get( "data/chinacity copy.json").then((response)=>{
      this.options=response.data;
      this.options=JSON.parse(JSON.stringify(this.options)); 
      var provincenum=this.$route.query.city;
      console.log(provincenum)
      if(provincenum===undefined){
        this.value=[this.options[0].value,this.options[0].children[0].value]
        this.month="2021-01"
        this.handleChange(this.value)
        this.searchcity(this.value[1],this.month)
      }else{
        provincenum=provincenum.slice(0,2)
        this.value[0]=provincenum+'0000';
        this.value[1]=this.$route.query.city
        this.handleChange(this.value)
        this.searchcity(this.$route.query.city,this.$route.query.month)

      }
}).catch((response)=>{
//console.log(response);
})
 

  },
  methods: {
    chooseType(){
        this.chooseTypeflag=!this.chooseTypeflag
        if(this.chooseTypeflag==false){
          this.typeflag="1"
          this.chooseTypetext='可型号单选'
          this.value2=''
          this.search()
        }else{
          this.typeflag="0"
          this.chooseTypetext='全部型号设备'
        }
      },
    jumppage(row) {
       console.log(row)
 //  var mon= this.Month2Time(this.timeframe)
  //  console.log(mon)
      let routeData = this.$router.resolve({
     path:'detaildata',
    
  //  name:'flow',
 query: {
   city:row.city_code,
   name1:String(row.dev_type),
   id: row.dev_id,
   month:this.month,
   cityname:this.city
 }
});
 window.open(routeData.href);
      },
    searchcity(value,month){
     // cityname=[];
       this.tableData=[];
       cityname=[];
      request.post('tableStoreDates/page/list', null, {
        params:
        { 
          pagetype:'localized_vue',
          category: "city",
          month:month,
          city:value,
          flag:'1',
        },
      }).then(({ data: response }) => {
     //data=[];
   //  cityname=response.data.province;
    // console.log(response.data.data)
   this.tableData=response.data.data;
   cityname=response.data.province;
   for(var i=0;i<response.data.data.length;i++){
     this.tableData[i].un_stable_proportion=Number(this.tableData[i].un_stable_proportion);
   }
  //  console.log(cityname);
   this.text1=cityname[0];  
      }).catch((err) => {
        this.$message.error(err);
        // console.log(err);
      });

    },
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
                              // children:[]
                              
            }
        }
            // for(var i=0;i<response.data.devid.length;i++){
                
            //     j=response.data.devtype.indexOf(response.data.total[i])
            //     console.log(response.data.devtype.indexOf(response.data.total[i]))
            //    this.options1[j].children[ this.options1[j].children.length]={
            //                                                     label:response.data.devid[i],
            //                   value:response.data.devid[i]

              //  }
                           
            // }
       // console.log(this.options5)
       this.options1=JSON.parse(JSON.stringify(this.options1)); 
      //console.log(response.data.total)
      }).catch((err) => {
        this.$message.error(err);
        // console.log(err);
      });


    },
    search(){
 this.tableData=[];
   console.log(this.tableData);
      request.post('tableStoreDates/page/list', null, {
        params:
        { 
          pagetype:'localized_vue',
          category: "city",
          month:this.month,
          city:this.value[1],
          dev_id:this.value2[0],
          flag:this.typeflag
        },
      }).then(({ data: response }) => {
     //data=[];
   //  cityname=response.data.province;
    // console.log(response.data.data)
  //  console.log(this.value2[0]);
  //  console.log(response.data.data);
    cityname=response.data.province;
   this.tableData=response.data.data;
   console.log(this.tableData);
   this.text1=cityname[0];      
   for(var i=0;i<response.data.data.length;i++){
     this.tableData[i].un_stable_proportion=Number(this.tableData[i].un_stable_proportion);
   }
     
      }).catch((err) => {
      });


    }
  },
};
</script>

<style  lang="scss"  scoped>
.divwrap{
   //margin-right: 50px;
  margin-left: 10%;
  margin-top: 30px;
  margin-bottom: 30px;
 // background-color: aqua;
  width: 400px;
  display: inline-block;
}
.monthselect{
   
  // background-color: rgb(25, 0, 255);  
  //width: 300px;
  display: inline-block;
}


</style>