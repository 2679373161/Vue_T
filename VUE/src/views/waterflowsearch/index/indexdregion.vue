<template>
  <div id="app1">
   
 <div class="search" align="center" style="margin-top:20px;">
   <el-form ref="form" class="ItemInfo" :model="equipment_info" label-width="80px" :inline="true">
    <span>地区：</span>
    <el-cascader
   ref="cascaderAddr"
     v-model="value"
    :options="options"
     @change="handleChange"
      placeholder="请选择地区"
     style="width:250px; margin-right:0px;"
    clearable></el-cascader>
     <span style="margin-left:30px">型号：</span>
    <el-cascader
     v-model="value2"
     ref="cascaderAddr1"
      @change="handleChange1"
    :options="typelist"
     placeholder="请选择型号"
     style="width:200px; margin-right:0px;"
    clearable></el-cascader>
    <el-button type="text" style="margin-left:30px;" @click="chooseType">{{chooseTypetext}}<i class="el-icon-caret-right" v-if="!chooseTypeflag"></i><i class="el-icon-caret-left" v-if="chooseTypeflag"></i></el-button>
    <el-cascader
    v-if="chooseTypeflag"
     v-model="value3"
     ref="cascaderAddr1"
    :options="appliancelist"
     placeholder="请选择设备"
     style="width:200px; margin-right:0px;"
    clearable></el-cascader>
    
      <span style="margin-left:30px">日期: </span>
      <el-date-picker
      id="time"
      v-model="datatime"
        style="width:250px; margin-right:10px;"
      type="daterange"
      align="right"
     range-separator="-"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      format="yyyy-MM-dd"
      value-format="yyyy-MM-dd">
    </el-date-picker>
    <el-button type="primary" @click="search" style="margin-right:10px;">查询</el-button>
  <!-- <el-switch
  v-model="filterflag"
  active-text="默认筛选"
  active-color="#13ce66"
  inactive-color="#ff4949">
</el-switch> -->
<Filterconditions  ref="getSelectData"  @returnDate='returnDate' 
      align="right" 
    style="margin-top:0px;display: inline-block;"
     :city='value[1]' 
     :dev_id='value2[1]' 
     :timeLow='datatime[0]' 
     :timeHigh='datatime[1]'>
     </Filterconditions>
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



        <el-card   v-if="filterflag" style="margin-top:10px;margin-bottom:10px"  class="box-card" shadow="never">
          <span>水流量片段划分：</span>
    <el-radio-group style="margin-top:10px;margin-bottom:0px"  v-model="radio3" @change="changefilter">
      <el-radio  style="margin-right:50px;" label="不限"></el-radio>
      <el-radio style="margin-right:50px;"  label="有效"></el-radio>
      <el-radio style="margin-right:50px;"  label="无效" ></el-radio>
    </el-radio-group>
     <br style="margin-top:10px;">
      <el-divider style="margin-top:0px; margin-bottom:0px" ></el-divider>
        <span style="margin-top:0px;margin-bottom:0px" >水流量模式：</span>
  <el-radio-group style="margin-top:10px;margin-bottom:0px" v-model="radio1" :disabled="modelflag" @change="changefilter">
      <el-radio  style="margin-right:80px;margin-top:0px;margin-bottom:0px" label="不限" ></el-radio>
      <el-radio style="margin-right:80px;"  label="稳定"></el-radio>
      <el-radio style="margin-right:80px;"  label="不稳定"></el-radio>
      <el-radio style="margin-right:80px;"  label="阶跃"></el-radio>
      <el-radio style="margin-right:50px;"  label="震荡"></el-radio>
    </el-radio-group>
<span v-if="levelflag" style="margin-top:0px;height:50px">波动等级：</span>
 <el-radio-group v-if="levelflag" style="margin-top:10px;margin-bottom:0px" v-model="level" :disabled="modelflag" @change="changefilter">
    
      <el-radio  style="margin-right:60px;margin-top:0px;margin-bottom:0px" label="不限" ></el-radio>
      <el-radio style="margin-right:60px;"  label="一等" ></el-radio>
      <el-radio style="margin-right:60px;"  label="二等" ></el-radio>
      <el-radio style="margin-right:60px;"  label="三等" ></el-radio>
      
    </el-radio-group>
    <br>
      <el-divider style="margin-top:0px; margin-bottom:0px" ></el-divider>
      <span>有效时长：</span>
  <el-radio-group style="margin-top:10px;margin-bottom:0px"  v-model="radio2" @change="changefilter">
    
      <el-radio  style="margin-right:50px;" label="不限"></el-radio>
      <el-radio style="margin-right:50px;"  label="0-30秒"></el-radio>
      <el-radio style="margin-right:50px;"  label="30秒-3分钟" ></el-radio>
      <el-radio style="margin-right:50px;"  label="3-10分钟" ></el-radio>
      <el-radio style="margin-right:50px;"  label="10分钟以上" ></el-radio>
    </el-radio-group>
     <br style="margin-top:10px;">
      <el-divider style="margin-top:0px; margin-bottom:0px" ></el-divider>
     <div class="popover1" style="margin-top:0px;height:50px" >

    <span  style="margin-top:0px;display:inline-block;height:50px">水流量评分：</span>
     <el-slider
      v-model="average"
      :disabled="level=='一等'||level=='二等'||level=='三等'"
      @change="changefilter"
      style="width:500px; margin-top:0px;margin-left:30px;display: inline-block;margin-bottom:0px"
      range
      :step="10"
      :marks="marks"
      :max="100">
    </el-slider>
     </div>
     
      
</el-card>
 <el-table ref="tableRef"
 :data="tableData" @sort-change="changeTableSort" border height="800" style="width: 100%;margin-top:0px" align="center" :row-class-name="tableRowClassName1"
      :default-sort = "{prop: 'water_score', order: 'ascending'}">
       <el-table-column  type="index"  align="center" width='60px' label="序号"></el-table-column>
        <!-- <el-table-column  prop="dev_type" align="center" width='120px' label="型号"></el-table-column> -->
      <el-table-column  prop="dev_id" align="center" width='150px' label="设备"></el-table-column>
       <el-table-column  prop="water_pattern" align="center" sortable  column-key="duration_time"
         :filters="[{text: '稳定模式', value: '稳定模式'}, {text: '阶跃模式', value: '阶跃模式'}, {text: '震荡模式', value: '震荡模式'}]"
      :filter-method="filterHandler"
         label="模式"></el-table-column>
      <el-table-column  prop="water_score" align="center" sortable label="水流量评分"></el-table-column>
      <el-table-column  prop="start_time" align="center" sortable label="开始时间"></el-table-column>
      <el-table-column  prop="end_time" align="center" sortable label="结束时间"></el-table-column>
      <el-table-column  prop="duration_time" align="center" sortable :sort-method="(a,b) => sortBytime(a ,b , 'duration_time')" label="用水时长" column-key="duration_time" :filters="getfilterNameItem()" ></el-table-column>
      <el-table-column  prop="deviation" align="center" sortable label="标准差"></el-table-column>
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
        <h4 style="margin-top:0px;margin-left:0px" align="center">{{city}}{{" "}}{{" "}}燃气热水器片段运行状态{{" "}}{{" "}}{{type}}</h4>
        <div align="center">
          <span>水流量片段模式：{{pattern}}</span>
        </div>
        <div id='myChart' ></div>
        <div align="center">
          <el-table :data="tableData2" border  style="width: 100%;margin-top:40px;">
            <el-table-column  prop="duration_time" align="center"  label="用水时长" ></el-table-column>
            <el-table-column  prop="deviation" align="center"  label="标准差"></el-table-column>
            <el-table-column  prop="up" align="center"  label="向上突变次数"></el-table-column>
            <el-table-column  prop="down" align="center"  label="向下突变次数"></el-table-column>
        </el-table>
        </div>
      </el-dialog>
      <!-- <el-drawer
       title='燃气热水器运行状态'
         direction="ltr"
        size="50%"
  :visible.sync="drawer"
  :with-header="false">
    <h4 style="margin-top:120px;margin-left:20px" >{{city}}</h4>
    <h4 style="margin-top:0px;margin-left:20px" >{{type}}</h4>
    <h4 style="margin-top:10px;margin-left:20px" >燃气热水器运行状态</h4>
    <div id='myChart' ></div>
    <el-table 
      :data="tableData2" border   style="width: 600px;margin-top:50px;margin-left:150px" :row-class-name="tableRowClassName1">
      <el-table-column  prop="duration_time" align="center"  label="用水时长" ></el-table-column>
      <el-table-column  prop="extreme" align="center"  label="极差"></el-table-column>
      <el-table-column  prop="average" align="center"  label="均值"></el-table-column>
      <el-table-column  prop="deviation" align="center"  label="标准差"></el-table-column>
      <el-table-column  prop="up" align="center"  label="向上突变次数"></el-table-column>
      <el-table-column  prop="down" align="center"  label="向下突变次数"></el-table-column>
      </el-table>
</el-drawer> -->
  </div>
</template>

<style>
  .el-table .stable-row {
    background: #c1ffc12a;
  }

  .el-table .step-row {
    background: #83fcfc2d;
  }
   .el-table .shock-row {
    background: #ff6a6a28;
  }
  .el-table .invalid-row {
    background: #9c9c9c8c;
  }
</style>
<script>
import JsonExcel from 'vue-json-excel';
import request from '@/utils/request';
import Filterconditions from './filterconditions.vue';
import Manager from "@/assets/js/test.js";//求指标
var time1=[]
var jumpinitialflag=false
export default {
  components: {'download-excel': JsonExcel,
    Filterconditions},
  data() {
    return {
json_fields: {
          "设备":{ 
            field:"dev_id",
            callback:value =>{
              return  "&nbsp;" +value;
            }
            },
          
          '模式':'water_pattern',
          '水流量评分': 'water_score',
          '开始时间': 'start_time',
          '结束时间':'end_time',
           '用水时长': 'duration_time',
          '标准差':'deviation',

          },
    
  
      
      modelflag:false,//是否禁用模式划分筛选标志位
      options:[],
      value:'',
      options1:[],
      value2:[],
      value3:[],
      searchlist:[],
      appliancelist:[],
      typelist:[],
      datatime:[],
       tableData:[],
       tableData2:[],//每片指标
       tableData1:[],
       outTemp:[],
       flow:[],
       setTemp:[],
       flame:[],
        drawer: false,
        valuearray:[],
        filterflag:true,
          radio1:'不稳定',//模式筛选项
        radio2:"不限",//时长筛选项
        radio3:"有效",//有效片段筛选项
        average:[0,100],
        marks: {
          0: '0',
          30: '30',
          60: '60',
          90: '90',
          100:'100',
        },
        city:'',
        type:'',
        level:'不限',//波动等级筛选项
        levelflag:false ,//波动筛选标志位
       stablelevel:[         //波动量化等级对应分数范围
        {         
         scorelow:0,
         scorehigh:100
      },
       {         
         scorelow:0,
         scorehigh:60
      },
       {         
         scorelow:60,
         scorehigh:70
      },
       {         
         scorelow:70,
         scorehigh:80
      },
      ],
      scorelow:'',
      scorehigh:'',
      chooseTypeflag:false,
      chooseTypetext:'可设备单选',
      pattern:"",
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

    sortBytime(obj1, obj2, column){
      console.log(obj1, obj2, column)
      var at = this.time2sec(obj1[column])
      var bt = this.time2sec(obj2[column])
      console.log(at, bt)
      if(at>bt){
        return 1
      }else{
        return -1
      }
    },
    sortBytime1(obj1,column,order){
      var condition=[];
      if(column=='duration_time'){
        for(var i=0;i<obj1.length;i++){
          condition[i]=this.time2sec(obj1[i][column])
        }
      }else{
        for(var i=0;i<obj1.length;i++){
          condition[i]=obj1[i][column]
        }
      }
      if(order=='ascending'){                 //升序
        var space={};
        var space1=0;
        for(var i=0;i<obj1.length-1;i++){
          for(var j=i+1;j<obj1.length;j++){
            if(condition[i]>condition[j]){
              space1=condition[i];
              condition[i]=condition[j];
              condition[j]=space1;
              space=obj1[i];
              obj1[i]=obj1[j];
              obj1[j]=space;
            }
          }
        }
      }else if(order=='descending'){          //降序
        var space={};
        var space1=0;
        for(var i=0;i<obj1.length-1;i++){
          for(var j=i+1;j<obj1.length;j++){
            if(condition[i]<condition[j]){
              space1=condition[i];
              condition[i]=condition[j];
              condition[j]=space1;
              space=obj1[i];
              obj1[i]=obj1[j];
              obj1[j]=space;
            }
          }
        }
      }
      console.log(obj1)
      return obj1;
    },
    changeTableSort(item){
			let that = this
      console.log(item)
      for(var i=0;i<that.tableData.length;i++){
        that.tableData[i].children=that.sortBytime1(that.tableData[i].children,item.prop,item.order);
      }
		},
    chooseType(){
        this.chooseTypeflag=!this.chooseTypeflag
        if(this.chooseTypeflag==false){
          this.chooseTypetext='可型号单选'
          this.value3=[]
          this.search()
        }else{
          this.chooseTypetext='所有设备'
        }
      },
    closeDialog(){
      this.drawer=false
    },
    //城市改变选择型号信息
     handleChange(value){
   this.options1=[]
    this.value2=[]
    this.searchlist=[]
    this.typelist=[]
      request.post('tableStoreDates/page/list', null, {
        params:
        { 
          city: value[1], 
          pagetype: 'model2_vue'
          // timeLow : this.datatime[0],    //时间范围
          // timeHigh : this.datatime[1],
        },
      }).then(({ data: response }) => {
        if(response.data.devtype==null){
          this.$message.error('该地区暂无设备数据');
          this.tableData=[]
        
        }
        var j=0
        for(var i=0; i<response.data.devtype.length;i++){
            this.options1[i]={label:response.data.devtype[i],
                              value:response.data.devtype[i],
                              children:[]
                              
            }
            this.searchlist[i]=response.data.devtype[i],
            this.typelist[i]={
                             label:response.data.devtype[i],
                              value:response.data.devtype[i],
            }
        }
            for(var i=0;i<response.data.devid.length;i++){
                
                j=response.data.devtype.indexOf(response.data.total[i])
               this.options1[j].children[this.options1[j].children.length]={
                                                                label:response.data.devid[i],
                              value:response.data.devid[i]

               }
                           
            }
        console.log(this.options1)
       this.typelist=JSON.parse(JSON.stringify(this.typelist)); 
       if(this.$route.query.id!=undefined){
         if(jumpinitialflag==false){
           this.value2=[this.$route.query.type]
           setTimeout(() => {
         this.handleChange1(this.value2)
          this.value3=[this.$route.query.id]
        //  this.value3=JSON.parse(JSON.stringify(this.value3))
          //  this.chooseTypeflag=true
           console.log(this.value3)
           jumpinitialflag=true
           this.search()
       }, 50)

         }else{
           this.value2=[this.options1[0].value]
           setTimeout(() => {
         this.handleChange1(this.value2)
       }, 50)
         }
       }else{
          this.value2=[this.options1[0].value]
          console.log(this.value2)
          setTimeout(() => {
         this.handleChange1(this.value2)
       }, 50)
       }
       
  //    console.log(this.options1[0])
      }).catch((err) => {
        // this.$message.error(err);
        // console.log(err);
      });


    },
    //城市改变选择型号信息
    handleChange1(value){
   this.appliancelist=[]
    this.value3=[]
            var j=0
                
                j=this.searchlist.indexOf(value[0])
                console.log(this.value2)

                for(var i=0;i<this.options1[j].children.length;i++){
              this.appliancelist[i]={
                              label: this.options1[j].children[i].label,
                              value: this.options1[j].children[i].value,

               }   
            }
        console.log(this.appliancelist)
       this.appliancelist=JSON.parse(JSON.stringify(this.appliancelist));
       
       


    },
    //显示运行曲线
    jumppage(row){
      this.pattern=row.water_pattern
       var v;
       var v1;
            const dt = new Date(row.start_time);
            const dt1 = new Date(row.end_time);
//             dt.setTime(dt.setSeconds(dt.getSeconds()-1));
            v=this.dateFormat(dt);
            v1=this.dateFormat(dt1);
 request.post('tableStoreDates/page/list', null, {
        params:
        { 
          city: this.value[1], 
          pagetype: 'indexdregion',
          dev_id: row.dev_id,
          flag:"1",
          timeLow : v,    //时间范围
          timeHigh : v1,
        },
      }).then(({ data: response }) => {
        time1 = response.data.data_time;
        console.log(response.data.data)
      //   console.log(this.flame);
      for(var i=0;i<time1.length;i++){

        this.flame[i]=Number(response.data.flame[i])*10
      }
        this.setTemp = response.data.set_temp;
        this.outTemp = response.data.out_temp;
       this.flow = response.data.flow;
       //  console.log(this.$refs['cascaderAddr'].getCheckedNodes())
       var name=this.$refs['cascaderAddr'].getCheckedNodes()
      this.city=name[0].pathLabels[0]+name[0].pathLabels[1];
        // name=this.$refs['cascaderAddr1'].getCheckedNodes()
       this.type="机型："+this.value2[0]+" 设备："+row.dev_id;
     this.tableData2[0]={duration_time:row.duration_time,
     extreme:row.extreme,
     average:row.average,
     deviation:row.deviation,
    up: Manager.Confirm(this.flow).up,
    down:Manager.Confirm(this.flow).down,



     }
  setTimeout(() => {
   
    this.drawTable();
   
  }, 10);
      
       this. drawer=true
      }).catch((err) => {
        // this.$message.error(err);
        // console.log(err);
      });

    },
    //默认筛选查询
     changefilter(value){
           var model=''
           var timelength=''
           var timelow=''
           var timehigh=''
     // console.log(value)
       
         if(this.radio2=="不限"){
         timelength=0
         timelow=0
       }else if(this.radio2=="0-30秒"){
         timelength=1
         timelow=0
         timehigh=30
       }else if(this.radio2=="30秒-3分钟"){
         timelength=2
          timelow=30
         timehigh=180
       }else if(this.radio2=="3-10分钟"){
         timelength=3
          timelow=180
         timehigh=600
       }else if(this.radio2=="10分钟以上"){
         timelength=4
          timelow=600
       //  timehigh=120
       }
       //开启波动等级筛选
       if(this.levelflag==true)    
       {
         if(this.level=="不限"){
         this.scorelow=this.stablelevel[0].scorelow
         this.scorehigh=this.stablelevel[0].scorehigh
       }else if(this.level=="一等"){
         this.scorelow=this.stablelevel[1].scorelow
         this.scorehigh=this.stablelevel[1].scorehigh
       }else if(this.level=="二等"){
         this.scorelow=this.stablelevel[2].scorelow
         this.scorehigh=this.stablelevel[2].scorehigh
       }else if(this.level=="三等"){
         this.scorelow=this.stablelevel[3].scorelow
         this.scorehigh=this.stablelevel[3].scorehigh
       }
       }else{
          this.scorelow='0'
          this.scorehigh='100'
       }
       //有效片段划分
       if(this.radio3=='不限'){
         this.modelflag=true
         model=0
       }else if(this.radio3=='有效'){
         this.modelflag=false
         //水流量模式
         if(this.radio1=="不限"){
         this.levelflag=false
         model=1
       }else if(this.radio1=="稳定"){
         this.levelflag=false
         model=6
       }else if(this.radio1=="阶跃"){
         for(var i=1;i<this.stablelevel.length;i++)
             {
               if(i==1){
                  this.stablelevel[i]={
             scorelow:0,
             scorehigh:70
           }
           }else if(i==2){
                this.stablelevel[i]={
             scorelow:70,
             scorehigh:80
           }
           }else{
             this.stablelevel[i]={
             scorelow:80,
             scorehigh:100
           }
           }
             } 
         this.levelflag=true
         model=7
       }else if(this.radio1=="震荡"){
    for(var i=1;i<this.stablelevel.length;i++)
    {
      if(i==1){
           this.stablelevel[i]={
          scorelow:0,
          scorehigh:60
           }
           }else if(i==2){
       this.stablelevel[i]={
          scorelow:60,
          scorehigh:70
           }
           }else{
             this.stablelevel[i]={
             scorelow:70,
             scorehigh:100
           }
           }
             } 
         this.levelflag=true
         model=8
       }else if(this.radio1=="不稳定"){
        model=5
        this.levelflag=false
       }

       }else if(this.radio3=='无效'){
         this.levelflag=false
         this.modelflag=true
         model=9
       }

      var score=[]
      if(this.levelflag==true&&(this.level=='一等'||this.level=='二等'||this.level=='三等')){
        score[0]=this.scorelow
        score[1]=this.scorehigh
      }else{
        score[0]=this.average[0]
        score[1]=this.average[1]
      }

      var flag
       if(this.value3.length==0){
         flag=3
       }else{
         flag=2
       }
       var flag1
       if(value=="重新查询"){
         flag1=1
       }else{
         flag1=0
       }

      request.post('tableStoreDates/page/list', null, {
        params:
        { 
          city: this.value[1], 
          pagetype: 'indexdregion',
          dev_type: this.value2[0], 
          dev_id: this.value3[0],
          timeLow : this.datatime[0],    //时间范围
          timeHigh : this.datatime[1],
          flag:flag,
          flag1:flag1,
          model: model,
          timelength:timelength,
          // averagelow:this.average[0],  //均值范围
          // averagehigh:this.average[1],
          scorelow:score[0],      //等级范围
          scorehigh:score[1]

        },
      }).then(({ data: response }) => {
        console.log(response.data.data)
                         if (response.data.data==""){
                  this.$message.error('很抱歉，该设备在筛选条件查询结果为空');
           }
       // console.log(this.options5)
       this.tableData=[]
      this.tableData1=response.data.data
      var j=0
      for(var i=0;i<this.tableData1.length;i++){


        if(this.tableData1[i].water_pattern=="6"){
          this.tableData1[i].water_pattern="稳定模式"
        }else if(this.tableData1[i].water_pattern=="7"){
          this.tableData1[i].water_pattern="阶跃模式"
        }else if(this.tableData1[i].water_pattern=="8"){
            this.tableData1[i].water_pattern="震荡模式"
        }else{
          this.tableData1[i].water_pattern="无效片段"
        }
       if(timelength==0)
       {
        this.tableData[j++]=this.tableData1[i]
       }else if(timelength>=1&&timelength<4){
         var timetosec=this.time2sec (this.tableData1[i].duration_time)
         if(timetosec>=timelow&&timetosec<timehigh){
           this.tableData[j++]=this.tableData1[i]
         }
       }else{
           var timetosec=this.time2sec (this.tableData1[i].duration_time)
         if(timetosec>=timelow){
           this.tableData[j++]=this.tableData1[i]
         }
       }
      

      }
       this.tableData=JSON.parse(JSON.stringify(this.tableData)); 
   this.$nextTick(()=>{
	this.$refs.tableRef.doLayout()
})
      
     //console.log(this.tableData)
      }).catch((err) => {
        // this.$message.error(err);
        // console.log(err);
        this.$confirm(err.response.data.msg, '提示', {
          confirmButtonText: '继续查询',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // this.$message({
          //   type: 'success',
          //   message: '删除成功!'
          // });
          this.changefilter("重新查询")
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消查询'
          });          
        });
      });
    },
    time2sec(time){
      var hour='';
      var min='';
      var sec='';
      var total=0;
      var j=0;
      var k=0;
      // hour=time.split('h')[0];
      // min=time.split('h')[1].split('m')[0];
      // sec=time.split('h')[1].split('m')[1].split('s')[0];
      for(var i=0;i<time.length;i++){
        if(time.slice(i,i+1)=='h'){
          hour=time.slice(0,i)
          j=i+1;
        }
        if(time.slice(i,i+1)=='m'){
          if(j!=0){
            min=time.slice(j,i)
          }else{
            min=time.slice(0,i)
          }
          k=i+1;
        }
        if(time.slice(i,i+1)=='s'){
          if(k!=0){
            sec=time.slice(k,i)
          }else{
            sec=time.slice(0,i)
          }
          k=i+1;
        }
      }
      total=hour*3600+min*60+(sec-0);
      // console.log(sec)
      return total;
    },
    sec2time(time){
      if(time<3600&&time>60){
        return Math.floor(time/60)+'m'+Math.floor(time%60)+'s'
      }else if(time<60){
        return time+"s"
      }else{
        return Math.floor(time/3600)+'h'+Math.floor(time%3600/60)+'m'+Math.floor(time%3600%60)+'s'
      }
    },
    //接收子组件传递结果
      returnDate(model,time,average1,average2,level){
              //   console.log("接收到的值==>>"+e)
              //  console.log(this.$refs.getSelectData.tableData)
               console.log(model,time,average1,average2,level)
            //   this.tableData=this.$refs.getSelectData.tableData
            //   this.tableData=JSON.parse(JSON.stringify(this.tableData)); 
               this.$nextTick(()=>{
	             this.$refs.tableRef.doLayout()
                 })
                 if(model==6){
                   this.radio1='稳定'
                   this.levelflag=false
                 }else if(model==7){
                   this.levelflag=true
                   this.radio1="阶跃"
                 }else if(model==8){
                   this.radio1="震荡"
                    this.levelflag=true
                 }else{
                    this.levelflag=false
                    this.radio1="不限"
                 }
                 if(time==1){
                   this.radio2="1-2分钟"
                 }else if(time==2){
                    this.radio2="2-5分钟"
                 }else if(time==3){
                    this.radio2="5-10分钟"
                 }else if(time==4){
                    this.radio2="10分钟以上"
                 }else{
                   this.radio2="不限"
                 }
                 this.average=[average1,average2]
                  if(level==1){
                   this.level="一等"
                 }else if(level==2){
                    this.level="二等"
                 }else if(level==3){
                    this.level="三等"
                 }else{
                   this.level="不限"
                 }
                this.changefilter(0)
            },
 
     filterHandler(value, row, column) {
        const property = column['property'];
       // console.log(property)
        return row[property] === value;
      },
      timeFormat:function(time) {
            var time1=new Date('12:23:23')
            console.log(time1)
        var hours=time.split('h')
       var minutes=[]
       var seconds=[]
       var minute=''
       var second=''
       var hour='0'
    // 拼接 可改成自己所要的时间格式
         if(hours.length==1){
           minutes=hours[0].split("m")
           seconds=minutes[1].split("s")
          minute = minutes[0].toString().padStart(2, "0");
          second =seconds[0].toString().padStart(2, "0");
          hour=hour.toString().padStart(2,"0")

         }
         console.log(seconds[0])
         console.log(hour+":"+minute+":"+second)
    return hour+":"+minute+":"+second;
    },
    //时间格式
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
    //画图
     drawTable(){

      
      //   console.log(time1);

        const myChart = this.$echarts.init(document.getElementById('myChart'));
        const option = {
        // backgroundColor: '#12cf96',//背景色
        
          // tooltip: {
          //     trigger: 'axis'
          // },

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
            data: ['水流量','出水温度','设置温度',"火焰反馈"],
             selected:{'水流量':true,'出水温度':false,'设置温度':false,'火焰反馈':true}

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
           //  right:10,
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
            boundaryGap: false,
            name: '时间',
            data: time1,

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
          }],
 
         

          // 数据信息
          series: [
            {
              name: '水流量',
              yAxisIndex: 1,
              type: 'line',
              data: this.flow,

              markPoint: {
                data: [
                  { type: 'max', name: '最大值' },
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
              data: this.outTemp,
              itemStyle: {      
                            normal: {
                                lineStyle: {
                                    width: 2,
                                    type: 'dashed' ,//'dotted'虚线 'solid'实线
                                     color:"black",
                                }
                            }
                        },
                       
              markPoint: {
                data: [
                  { type: 'max', name: '最大值' },
                ],
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
              data: this.setTemp,
              itemStyle: {      
                            normal: {
                                lineStyle: {
                                    width: 2,
                                    type: 'dashed' ,//'dotted'虚线 'solid'实线
                                     color:"black",
                                }
                            }
                        },

            },  {
              name: '火焰反馈',
              yAxisIndex: 0,
              type: 'line',
              data: this.flame,
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

            },
            

          ],
        };
       
        

     

//console.log(n)
        myChart.setOption(option,true);
           const _this = this;
  
        // 建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
        // window.addEventListener('resize', () => { myChart.resize(); });
      
    },
    //查询按钮
    search(){
     this.tableData=[]
this.changefilter(0)



    },
     cellStyle(row,column,rowIndex,columnIndex){
  // console.log(row)
 if(row.column.label=="模式"&&row.row.water_pattern=="稳定模式"){
      // console.log(row)
          return 'background: #C1FFC1'
        }else if(row.column.label=="模式"&&row.row.water_pattern=="阶跃模式"){
          return 'background: #99ffff';
        }else if(row.column.label=="模式"&&row.row.water_pattern=="震荡模式"){

            return 'background: #FF6A6A';
        }


      },
      //表格底色
       tableRowClassName1({row, rowIndex}) {
        if (row.water_pattern == "稳定模式") {
          return 'stable-row';
        } else if (row.water_pattern == "阶跃模式") {
          return 'step-row';
        }else if (row.water_pattern == "震荡模式") {
          return 'shock-row';
        }
        return 'invalid-row';
      
      },
        getfilterNameItem() {
          let apiArr = [  // 从后端获取筛选的字段
            { text: "大于1m", value: "1m" },
            { text: "大于2m", value: "2m" },
            { text: "大于5m", value: "5m" },
          ];
          return apiArr; // return返回去
      },
        filterChange(filterObj) {
       console.log(filterObj.duration_time) 
      //     request.post('tableStoreDates/page/list', null, {
      //   params:
      //   { 
      //     city: this.value[1], 
      //     pagetype: 'indexdregion',
      //     dev_id: this.value2[1],
      //      timeLow : this.datatime[0],    //时间范围
      //     timeHigh : this.datatime[1],
      //   },
      // }).then(({ data: response }) => {
       
      //  // console.log(this.options5)
      // this.tableData=response.data.data
      // for(var i=0;i<this.tableData.length;i++){


      //   if(this.tableData[i].pattern=="6"){
      //     this.tableData[i].pattern="稳定模式"
      //   }else if(this.tableData[i].pattern=="7"){
      //     this.tableData[i].pattern="阶跃模式"
      //   }else{
      //       this.tableData[i].pattern="震荡模式"
      //   }
      // }
      
     
      // }).catch((err) => {
      //   this.$message.error(err);
      //   // console.log(err);
      // });
     // console.log(filterObj);
    },
    //月份格式转换
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
  },
  created() {

  this.axios.get( "data/chinacity copy.json").then((response)=>{
this.options=response.data;

 this.options=JSON.parse(JSON.stringify(this.options)); 
 




//如果单独打开不起作用
if(this.$route.query.id!=undefined){
  this.chooseTypeflag=true
  var city=this.$route.query.city.slice(0,2)+"0000" 
  this.value=[city,this.$route.query.city]
  var mon=[this.$route.query.month,this.$route.query.month1]
this.datatime=[mon[0],mon[1]]

// setTimeout(() => {
   this.handleChange(this.value)
// }, 150);
}else{
  // this.chooseTypeflag=false
  this.value=[this.options[0].value,this.options[0].children[0].value]
  request.post('tableStoreDates/page/list', null, {
        params:
        { 
          pagetype: 'datafeatures',
        },
      }).then(({ data: response }) => {
        console.log(response.data.data)
        this.datatime=[response.data.data.update_time,response.data.data.update_time]
         setTimeout(() => {
  this.search()
 }, 150);
      }).catch((err) => {
      });
this.handleChange(this.value)


}



}).catch((response)=>{
//console.log(response);
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
  width: 1000px;
  height: 500px;
  margin: auto;
  // grid: {
  //   x: 0;
  //   y: 0;
  //   x2: 0;
  //   y2: 0;
  // }

}
</style>
