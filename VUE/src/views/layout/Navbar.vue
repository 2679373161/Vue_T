<template>
  <div>
    <b-navbar
      toggleable="lg"
      type="dark"
      id="headerbg"
    >
          <span>越用越恒温智能控制平台V1.5.3</span>
          <div>
          <el-switch class="switch" v-model="colorModeswitch" active-text="夜晚模式" inactive-text="正常模式" active-color="#426ab3" inactive-color="#d1c7b7" @change="modeChange"></el-switch>
          <el-dropdown trigger="click" @command="handleCommand">
            <span class="el-dropdown-link">
            <i class="el-icon-setting"></i>设置
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="b">
                <i class="el-icon-star-off"></i>
                主题外观
                <!-- <el-switch v-model="switchcolorsetting"></el-switch> -->
              </el-dropdown-item>
              <el-dropdown-item command="c">
                <i class="el-icon-s-operation"></i>
                系统设置
              </el-dropdown-item>
              <el-dropdown-item command="d">
                <i class="el-icon-s-operation"></i>
                算法参数设置
              </el-dropdown-item>
              <el-dropdown-item command="a">
                <i class="el-icon-notebook-1"></i>
                版本更新日志
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          </div>
    </b-navbar>

    <el-dialog title="自定义主题外观" :visible.sync="outerVisible" show-close center @close='closeDialog'>
      <div class="dialogDiv">
        <div class="menu">
          <span>菜单：</span>
          <span>背景颜色：</span>
          <el-color-picker v-model="menuColor" show-alpha size="mini" @change="menuchange"></el-color-picker>
          <span>字体颜色：</span>
          <el-color-picker v-model="menutxColor" show-alpha size="mini" @change="menuchange"></el-color-picker>
          <span>选中颜色：</span>
          <el-color-picker v-model="menuacttxColor" show-alpha size="mini" @change="menuchange"></el-color-picker>
        </div>
        <div class="view">
          <span>页面：</span>
          <span>背景颜色：</span>
          <el-color-picker v-model="viewColor" show-alpha size="mini" @change="viewchange"></el-color-picker>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="success" size="mini" round @click="btn">保存</el-button>
        <el-button type="primary" size="mini" round @click="btn1">还原</el-button>
      </span>
    </el-dialog>

    <el-dialog title="算法参数设置" :visible.sync="outerVisible1" v-model="activeName" type="card" show-close center>
 

      <div class="dialogDiv" align="center">

         <el-tabs type="border-card" align="center">
  <el-tab-pane label="MySQL基本配置参数"   >
  <span style="margin-left:51.5px">原始数据库名：</span>
  <el-input placeholder="请输入修改内容" align="center" style="width:150px" v-model="OriginalDB" Clearable>
  </el-input>
  <span style="margin-left:132px">运行数据库名：</span>
  <el-input placeholder="请输入修改内容" style="width:150px" v-model="RunDB" Clearable>
  </el-input>
 <br>
  <br>
  <span style="margin-left:52.5px">指标数据库名：</span>
  <el-input placeholder="请输入修改内容" style="width:150px" v-model="IndexDB" Clearable>
  </el-input>
<span style="margin-left:132px">数据库用户名：</span>
  <el-input placeholder="请输入修改内容" style="width:150px" v-model="Username" Clearable>
  </el-input>
  <br>
  <br>
  <span style="margin-left:70px">数据库密码：</span>
  <el-input placeholder="请输入修改内容" style="width:150px" v-model="Password" Clearable>
  </el-input>
  <span style="margin-left:162px">设备表名：</span>
  <el-input placeholder="请输入修改内容" style="width:150px" v-model="Equipments" Clearable>
  </el-input>
</el-tab-pane>

 <el-tab-pane label="数据处理任务基本配置参数">
  <span style="margin-left:38px">定时自动标志位：</span>
<el-radio-group> <!-- 此处需要样式优化 暂用选择框代替 -->
 <el-switch
  style="display: block" v-model="AutoFlag" active-color="#13ce66" inactive-color="#ff4949" active-text="开启" inactive-text="关闭">
</el-switch>
</el-radio-group>
<span style="margin-left:180px">开启线程数：</span>
 <el-input placeholder="请输入修改内容" style="width:150px" v-model="Thread" Clearable>
  </el-input>

<br>
<br>
  <span style="margin-left:12.5px">运行数据写入标志位：</span>
<el-radio-group> <!-- 此处需要样式优化 暂用选择框代替 -->
 <el-switch style="display: block" v-model="DataWriteFlag" active-color="#13ce66" inactive-color="#ff4949" active-text="开启" inactive-text="关闭">
</el-switch>
</el-radio-group>
<span style="margin-left:164.5px">数据处理周期：</span>
  <el-input placeholder="请输入修改内容" style="width:150px" v-model="CycleTime" Clearable>
  </el-input>

 <br>
  <br>
  <span style="margin-left:14px">片段数据写入标志位：</span>
<el-radio-group> <!-- 此处需要样式优化 暂用选择框代替 -->
 <el-switch style="display: block" v-model="FragmentWriteFlag" active-color="#13ce66" inactive-color="#ff4949" active-text="开启" inactive-text="关闭">
</el-switch>
</el-radio-group>
 <span style="margin-left:140px">定时自动运行时间：</span>
  <el-input placeholder="请输入修改内容" style="width:150px" v-model="Timing" Clearable>
  </el-input>
    <!-- 该内容需要优化此处的时间 -->
<br>
<br>
<span style="margin-left:-111px">删除基础数据，防止迁移甩锅，暂不启用：</span>
  <el-radio-group> <!-- 此处需要样式优化 暂用选择框代替 -->
    <el-switch
  style="display: block" v-model="BasicDataDelete" active-color="#13ce66" inactive-color="#ff4949" active-text="开启" inactive-text="关闭">
</el-switch>
  </el-radio-group>
  <span style="margin-left:115px">运行数据保留时间(天)：</span>
  <el-input placeholder="请输入修改内容" style="width:150px" v-model="OperationDataSaveTime" Clearable>
  </el-input>
<br>
<br>
  <span style="margin-left:-98px">数据处理起止时间：</span>
  <el-date-picker id="time" v-model="datatime_s_e" style="width:250px; margin-right:10px;" type="daterange" align="right" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"
      format="yyyy-MM-dd"
      value-format="yyyy-MM-dd">
    </el-date-picker>
 <span style="margin-left:105px">定时任务运行周期(天)：</span>
  <el-input placeholder="请输入修改内容" style="width:150px" v-model="TimingPeriod" Clearable>
  </el-input>



  
</el-tab-pane>

  <el-tab-pane label="数据清洗基本配置参数">

  <span style="margin-left:10px">两用水片段时间间隔：</span>
  <el-input placeholder="请输入修改内容" align="center" style="width:150px" v-model="FragmentInterval" Clearable>
  </el-input>
  <span style="margin-left:90px">两用水行为时间间隔：</span>
  <el-input placeholder="请输入修改内容" style="width:150px" v-model="BehaviorInterval" Clearable>
  </el-input>
  <br>
  <br>
<span style="margin-left:-17px">第一次插值时间间隔下限：</span>
  <el-input placeholder="请输入修改内容" style="width:150px" v-model="FirstInterpolationLower" Clearable>
  </el-input>
  <span style="margin-left:62px">第一次插值时间间隔上限：</span>
  <el-input placeholder="请输入修改内容" style="width:150px" v-model="FirstInterpolationUpper" Clearable>
  </el-input>
  <br>
  <br>
  <span style="margin-left:-14px">第二次插值时间间隔下限：</span>
  <el-input placeholder="请输入修改内容" style="width:150px" v-model="SecondInterpolationLower" Clearable>
  </el-input>
  <span style="margin-left:60px"> 第二次插值时间间隔上限：</span>
  <el-input placeholder="请输入修改内容" style="width:150px" v-model="SecondInterpolationUpper" Clearable>
  </el-input>
  <br>
  <br>
   <span style="margin-left:55px"> 过滤无效时间：</span>
  <el-input placeholder="请输入修改内容" style="width:150px" v-model="InvalidTime   " Clearable>
  </el-input>
  <span style="margin-left:105px">水流片段有效时间：</span>
  <el-input placeholder="请输入修改内容" style="width:150px" v-model="WaterValidTime" Clearable>
  </el-input>
 <br>
  <br>
  <span style="margin-left:30px">温度片段有效时间：</span>
  <el-input placeholder="请输入修改内容" style="width:150px" v-model="TempValidTime" Clearable>
  </el-input>
  <span style="margin-left:72px">有效用水行为时长(分钟)：</span>
  <el-input placeholder="请输入修改内容" style="width:150px" v-model="EffectiveBehaviorTime" Clearable>
  </el-input>
</el-tab-pane>




<el-tab-pane label="数据挖掘基本参数配置" >
        <span style="margin-left:-4px">升温过程判稳温度阈值：</span>
          <el-input placeholder="请输入修改内容" style="width:150px" v-model="HeatStableThreshold" Clearable></el-input>
        <span style="margin-left:100px"> 恒温过程温度阈值：</span>
          <el-input placeholder="请输入修改内容" style="width:150px" v-model="ConstantTempThreshold" Clearable></el-input>
         <br>
         <br> 
        <span style="margin-left:25px"> 开机过冲温度阈值：</span>
          <el-input placeholder="请输入修改内容" style="width:150px" v-model="OvershootThreshold"></el-input>
        <span style="margin-left:100px"> 水流量变化量阈值：</span>
          <el-input placeholder="请输入修改内容" style="width:150px" v-model="FlowChangeThreshold"></el-input>
          <br>
         <br> 
        <span style="margin-left:0px">  水流量识别采集点个数：</span>
          <el-input placeholder="请输入修改内容" style="width:150px" v-model="BeforeCollectionPoint"></el-input>
        <span style="margin-left:74px"> 水流量识别采集点个数：</span>
          <el-input placeholder="请输入修改内容" style="width:150px" v-model="AfterCollectionPoint"></el-input>

   
</el-tab-pane>


 <el-tab-pane label="补偿恒温识别基本参数配置">
             <span style="margin-left:-13px">不恒温时长判定阈值(秒)：</span>
             <el-input v-model="DisturbanceDuration" placeholder="请输入修改内容" style="width:150px" clearable></el-input>
             <span style="margin-left:68px">有效不恒温时长阈值(秒)：</span>
             <el-input v-model="NonConstantTempDuration" placeholder="请输入修改内容" style="width:150px" clearable></el-input>
<br>
<br>
             <span style="margin-left:-68px">不恒温时长占比判定阈值(百分比)：</span>
             <el-input v-model="DisturbanceProportion" placeholder="请输入修改内容" style="width:150px" clearable></el-input>

             <span style="margin-left:109.5px">加热时长阈值(秒)：</span>
             <el-input v-model="HeatingDuration" placeholder="请输入修改内容" style="width:150px" clearable></el-input>
           </el-tab-pane>





</el-tabs>
       

        

          <!-- <div class="autosystemcheckbox">
            <span>选择统计时间维度：</span>
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
            <el-checkbox-group v-model="checkedTimemode" @change="handleCheckedTimeModeChange">
              <el-checkbox v-for="time in timemode" :label="time" :key="time">{{time}}</el-checkbox>
            </el-checkbox-group>
          </div> -->
    
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="mini" round @click="parameter_change" >确定</el-button><!--@click="btn2"-->
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import request from '@/utils/request';
//引用css样式
  //    <!-- variant="primary" -->
const timeModeoptions = ['年', '月', '日'];
const localsave=1;
const notlocalsave=0;
const closesave=0;
var testflag=0;
export default {
  computed: mapState({
    userInfo: (state) => state.userModule.userInfo,
  }),
  data() {
    return {
      activeName: 'first',
      outerVisible: false,
      outerVisible1: false,
     
      menuColor:"",
      menutxColor:'',
      menuacttxColor:'',
      viewColor:'',
      colorModeswitch:false,
      dataSystemswitch:false,
      timeStamp:'08:00',
      time:[],
      checkAll: false,
      checkedTimemode: [],
      timemode:timeModeoptions,
      isIndeterminate: true,
      switchcolorsetting:false,
      OriginalDB:"",
      RunDB:"",
      IndexDB:"",
      Username:"",
      Password:"",
      Equipments:"",
       FragmentInterval:"",
      InvalidTime:"",
      BehaviorInterval:"",
      FirstInterpolationLower:"",
      FirstInterpolationUpper:"",
      SecondInterpolationLower:"",
      SecondInterpolationUpper:"",
      WaterValidTime:"",
      TempValidTime  :"",
      EffectiveBehaviorTime:"",
      HeatStableThreshold:"",
      ConstantTempThreshold:"",
      OvershootThreshold:"",
      FlowChangeThreshold:"",
      BeforeCollectionPoint:"",
      AfterCollectionPoint:"" ,
      DisturbanceDuration:"",
      DisturbanceProportion:"",               
      NonConstantTempDuration:"",           
      HeatingDuration:"",
      AutoFlag: false,
      DataWriteFlag: false,
      FragmentWriteFlag: false,
      Thread: '',
      datatime_s_e: [],
      CycleTime: '',
      Timing: '',
      TimingPeriod: '',
      
      OperationDataSaveTime: '',
      BasicDataDelete: false,


    };
  },
  methods:{
  parameter_change() {
    request.post('indextemp/page/parameter_change',null,{
    params:
    {
      OriginalDB:this.OriginalDB,
      RunDB:this.RunDB,
      IndexDB:this.IndexDB,
      Username:this.Username,
      Password:this.Password,
      Equipments:this.Equipments,
      FragmentInterval:this.FragmentInterval,
      InvalidTime:this.InvalidTime,
      BehaviorInterval:this.BehaviorInterval,
      FirstInterpolationLower:this.FirstInterpolationLower,
      FirstInterpolationUpper:this.FirstInterpolationUpper,
      SecondInterpolationLower:this.SecondInterpolationLower,
      SecondInterpolationUpper:this. SecondInterpolationUpper,
      WaterValidTime:this.WaterValidTime,
      TempValidTime:this.TempValidTime,
      EffectiveBehaviorTime:this.EffectiveBehaviorTime,
      HeatStableThreshold:this.HeatStableThreshold,
          ConstantTempThreshold:this.ConstantTempThreshold,
          OvershootThreshold:this.OvershootThreshold,
          FlowChangeThreshold:this.FlowChangeThreshold, 
          BeforeCollectionPoint:this.BeforeCollectionPoint,
          AfterCollectionPoint:this.AfterCollectionPoint, 
          DisturbanceDuration:this.DisturbanceDuration,
          DisturbanceProportion:this.DisturbanceProportion,               
          NonConstantTempDuration:this.NonConstantTempDuration,           
          HeatingDuration:this.HeatingDuration,
          AutoFlag: this.AutoFlag,
          DataWriteFlag: this.DataWriteFlag,
          FragmentWriteFlag: this.FragmentWriteFlag,
          Thread: this.Thread,
          StartTime: this.datatime_s_e[0],
          EndTime: this.datatime_s_e[1],
          CycleTime: this.CycleTime,
          Timing: this.Timing,
          TimingPeriod: this.TimingPeriod,
          BasicDataDelete: this.BasicDataDelete,
          OperationDataSaveTime: this.OperationDataSaveTime,

   
    },
  }).then(({data:response})=>{
    this.total=response.data.count
  }).catch((err)=>{

  })
  },
    handleClick() {
      this.outerVisible1="true"
      
      },
     
    handleCheckAllChange(val) {
      this.checkedTimemode = val ? timeModeoptions : [];
      this.isIndeterminate = false;
    },//数据管理：点击“全选”，复选框组则全部选中
    handleCheckedTimeModeChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.timemode.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.timemode.length;
    },//数据管理：判断复选框组的状态是否全部选中，一旦有一个没选中“全选”则显示“-”
    handleCommand(command) {
      if(command=="a"){
        this.$router.push({name: 'updatalog'})
      }else if(command=="b"){
        this.outerVisible=true
      }else(
        this.outerVisible1=true
      )
    },//下拉菜单：点击事件判断各菜单选项
    menuchange(){
      this.$emit("menucolor",this.menuColor,notlocalsave)
      this.$bus.$emit("sendmenucolor",{data:[this.menuColor,this.menutxColor,this.menuacttxColor],btnflag:notlocalsave})
    },//主题外观：点击颜色组件确定颜色给菜单组件+app侧栏，仅暂时性预览，不录入本地存储
    viewchange(){
      this.$emit("viewcolor",this.viewColor,notlocalsave)
    },//主题外观：点击颜色组件确定颜色给app页面，仅暂时性预览，不录入本地存储
    modeChange(){
      if(this.colorModeswitch==false){
        this.menuColor="#f6f5ec"
        this.menutxColor="#130c0e"
        this.menuacttxColor="#00ae9d"
        this.viewColor="#fffffb"
        this.$emit("menucolor",this.menuColor,notlocalsave)
        this.$bus.$emit("sendmenucolor",{data:[this.menuColor,this.menutxColor,this.menuacttxColor],btnflag:notlocalsave})
        this.$emit("viewcolor",this.viewColor,notlocalsave)
      }else{
        this.menuColor="#7c8577"
        this.menutxColor="#fff"
        this.menuacttxColor="#ffd04b"
        this.viewColor="#5e7c85"
        this.$emit("menucolor",this.menuColor,notlocalsave)
        this.$bus.$emit("sendmenucolor",{data:[this.menuColor,this.menutxColor,this.menuacttxColor],btnflag:notlocalsave})
        this.$emit("viewcolor",this.viewColor,notlocalsave)
      }
    },//主题模式切换：“正常模式”“夜晚模式”，颜色给菜单组件+侧栏+页面，录入本地存储
    btn(){
      this.$emit("menucolor",this.menuColor,localsave)
      this.$bus.$emit("sendmenucolor",{data:[this.menuColor,this.menutxColor,this.menuacttxColor],btnflag:localsave})
      this.$emit("viewcolor",this.viewColor,localsave)
    },//主题外观：点击保存传颜色给菜单组件+侧栏+页面，此时才将颜色真正录入本地存储
    btn1(){
      this.menuColor="#f6f5ec"
      this.menutxColor="#130c0e"
      this.menuacttxColor="#00ae9d"
      this.viewColor="#fffffb"
      this.$emit("menucolor",this.menuColor,localsave)
      this.$bus.$emit("sendmenucolor",{data:[this.menuColor,this.menutxColor,this.menuacttxColor],btnflag:localsave})
      this.$emit("viewcolor",this.viewColor,localsave)
    },//主题外观：点击还原传正常颜色给菜单组件+侧栏+页面，此时将颜色真正录入本地存储
    closeDialog(){
      request.post('data/page/initialize', null, {
        params:
        { 
         pagetype:"1"
        },
      }).then(({ data: response }) => {
        console.log(response.data.data)
        this.$emit("menucolor",response.data.data.menucolor,closesave)
        this.$bus.$emit("sendmenucolor",{data:[response.data.data.bgcolor,response.data.data.txcolor,response.data.data.acttxcolor],btnflag:closesave})
        this.$emit("viewcolor", response.data.data.viewcolor,closesave)
      })
      // this.$emit("menucolorclosesave",closesave)
      // this.$bus.$emit("sendmenucolorclosesave",{closeflag:closesave})
      // this.$emit("viewcolorclosesave",closesave)
    },
    btn2(){
      var timeflag=[0,0,0];
      for(var i=0;i<this.checkedTimemode.length;i++){
        if(this.checkedTimemode[i]=='年'){
          timeflag[0]=1
        }
        if(this.checkedTimemode[i]=='月'){
          timeflag[1]=1
        }
        if(this.checkedTimemode[i]=='日'){
          timeflag[2]=1
        }
      }
      // request.post('tableStoreDates/page/list', null, {
      //   params:
      //   { 
      //     pagetype:'chuli',
      //     Flag:this.dataSystemswitch,
      //     timeStamp:this.timeStamp,
      //     start:this.time[0],
      //     end:this.time[1],
      //     yearflag:timeflag[0],
      //     monthflag:timeflag[1],
      //     dayflag:timeflag[2],
      //   },
      // }).then(({ data: response }) => {
        
      // }).catch((err) => {
      //   this.$message.error(err);
      // });
      // console.log(testflag)
      var push="datasavemine/"+"timestamp"
      request.put(push, null, {
        params:{
          Label:"timestamp",
          Id:"3",
          Value:this.timeStamp,
          Flag:!this.dataSystemswitch,
          start:this.time[0],
          end:this.time[1],
        },
      }).then(({ data: response }) => {
        console.log(response.data.data)
      }).catch((err) => {
      });
    }//数据管理：点击确定将参数传给后端接口
  },
  created(){
    request.post('data/page/initialize', null, {
      params:
      { 
      },
    }).then(({ data: response }) => {
      this.menuColor=response.data.data.menucolor
      this.menutxColor=response.data.data.txcolor
      this.menuacttxColor=response.data.data.acttxcolor
      this.viewColor=response.data.data.viewcolor
      this.timeStamp=response.data.data.timestamp
      // var push="datasavemine/"+"timestamp"
      // request.put(push, null, {
      //   params:{
      //     Label:"timestamp",
      //     Id:"3",
      //     Value:this.timeStamp,
      //     Flag:!this.dataSystemswitch,
      //     start:this.time[0],
      //     end:this.time[1],
      //   },
      // }).then(({ data: response }) => {
      //   console.log(response.data.tableStoreDate)
      // }).catch((err) => {
      //   // this.$message.error(err);
      // });
    })
    
  }
};
</script>
<style lang="scss" scoped>
#headerbg
{ 
  background-color:#11264f;
  color:white;
  display: flex;
  justify-content: space-between;
  height:60px;
  font-size:25px;
  align-items: center;
  
  .el-dropdown{
    color:white;
    font-size:15px;
    align-items: center;
  }
}

// .el-dialog .el-dialog__body{
//       display: flex;
//       justify-content: center;
//       align-items: center;
// }
// .el-dialog{
//   display: flex;
//   flex-direction: column;
//   margin:0 !important;
//   position:absolute;
//   top:50%;
//   left:50%;
//   transform:translate(-50%,-50%);
//   /*height:600px;*/
//   max-height:calc(100% - 30px);
//   max-width:calc(100% - 30px);
// }
// // .el-dialog .el-dialog__body{
// //   flex:1;
// //   overflow: auto;
// //   align-items: right;
.dialogDiv {
  display: flex;
  overflow: auto;
  align-items: center;
  flex-wrap: wrap;
  .menu{
    display: flex;
    align-items: center;//组件垂直居中
    // justify-content:center;//水平居中
    margin-bottom: 3%;
    width:100%;
    .span{
      align-items: center;
    }
    .el-color-picker{
      align-items: center;
      margin-right: 5%;
    }
  }
  .view{
    display: flex;
    align-items: center;//组件垂直居中
    // justify-content:center;//水平居中
    width:100%;
    .span{
      align-items: center;
    }
    .el-color-picker{
      align-items: center;
      margin-right: 5%;
    }
  }
  .dataSystemswitch{
    display: flex;
    align-items: center;//组件垂直居中
    justify-content:center;//水平居中
    margin-bottom: 3%;
    width:100%;
  }
  .autosystem{
    display: flex;
    align-items: center;//组件垂直居中
    justify-content:center;//水平居中
    width:100%;
    flex-wrap: wrap;
    .autosystemdatepicker{
      align-items: center;
      margin-bottom: 3%;
    }
    .autosystemcheckbox{
      display: flex;
      align-items: center;
      .span{
        display: flex;
        align-items: center;
      }
      .el-checkbox{
        display: flex;
        align-items: center;
      }
      .el-checkbox-group{
        display: flex;
        align-items: center;
      }
    }
  }
}
// }


</style>
<style>
.switch{
    margin-right: 20px;
    align-items: center;
  }
.switch .el-switch__label {
  display: flex;
      color: #fff;
      align-items: center;
    }
.el-dialog {
     display: flex;
     flex-direction: column;
     margin:0 !important;
     position:absolute;
     top:50%;
     left:50%;
     transform:translate(-50%,-50%);
     height:500px;
     max-height:calc(100% - 200px);
     max-width:calc(100% - 200px);
     width:67%
}
.el-dialog .el-dialog__body {
     flex:1;
     overflow: auto;
}
</style>