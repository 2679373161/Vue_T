<template>
  <div>
    
    <el-menu
     :default-active="temp_my_data"
     router
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      :background-color="bgcolor"
      :text-color="txcolor"
      :active-text-color="acttxcolor"
    >
      <el-menu-item index="0" @click="menuState">
        <i class="el-icon-menu" style="color:black"></i>
        <span slot="title">展开/收起</span>
      </el-menu-item>
             <el-menu-item index="1" @click="$router.push({name: 'MenuHomenew2'})">
        <i class="el-icon-s-home" style="color:black"></i>
        <span slot="title">首页</span>
    </el-menu-item>
   <!--
      <el-menu-item index="12" @click="$router.push({name: 'MenuHomenew1'})">
        <i class="el-icon-s-home" style="color:black"></i>
        <span slot="title">首页</span>


      </el-menu-item>
    

    -->
      <!-- <el-submenu index="4">
        <template slot="title">
          <el-tooltip ref="tooltip" :disabled="!isCollapse" class="item" effect="dark" content="基础数据管理" placement="top-end" >
            <i class="iconfont icon-libindex"></i>
          </el-tooltip>
          <span slot="title">基础数据管理</span>
        </template>
      <el-menu-item index="4-1" @click="$router.push({name: 'citydata'})">
        <i class="iconfont icon-libindex"></i>
        <span slot="title">城市管理</span>
      </el-menu-item>
     <el-menu-item index="4-2" @click="$router.push({name: 'typedata'})">
        <i class="iconfont icon-libindex"></i>
        <span slot="title">型号管理</span>
      </el-menu-item>
      <el-menu-item index="4-3" @click="$router.push({name: 'equipmentdata'})">
        <i class="iconfont icon-libindex"></i>
        <span slot="title">设备管理</span>
      </el-menu-item> -->
     <!-- <el-menu-item index="4-2" @click="$router.push({name: 'indexdregion'})">
        <i class="iconfont icon-libindex"></i>
        <span slot="title">综合查询</span>
      </el-menu-item>
      <el-menu-item index="4-3" @click="$router.push({name: 'indexdregion'})">
        <i class="iconfont icon-libindex"></i>
        <span slot="title">综合查询</span>
      </el-menu-item> -->
      <!-- </el-submenu> -->

      <!-- <el-menu-item index="4" @click="$router.push({name: 'basicdatamanagement'})">
        <i class="iconfont icon-libindex"></i>
        <span slot="title">基础数据管理</span>
      </el-menu-item> -->
      




      <el-submenu index="4">
        <template slot="title">
          <el-tooltip ref="tooltip" :disabled="!isCollapse" class="item" effect="dark" content="基础数据管理" placement="top-end" >
            <i class="iconfont icon-libindex"></i>
          </el-tooltip>
          <span slot="title">基础数据管理</span>
        </template>
        <el-menu-item index="4-1" @click="$router.push({name: 'migration'})">
          <i class="iconfont icon-libindex"></i>
          <span slot="title">迁移管理</span>
        </el-menu-item>
        <el-menu-item index="4-2" @click="$router.push({name: 'monitoring'})">
          <i class="iconfont icon-libindex"></i>
          <span slot="title">监控管理</span>
        </el-menu-item>
    </el-submenu>
      <!-- <el-submenu index="6">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title"> 基础信息</span>
        </template>
        <el-menu-item index="6-1" @click="$router.push({name: 'BasicInformation'})">
          <i class="el-icon-document"></i>
         地区信息
        </el-menu-item>
         <el-menu-item index="6-2" @click="$router.push({name: 'BasicInformation1'})">
          <i class="el-icon-document"></i>
         型号信息
        </el-menu-item>
        
      </el-submenu> -->

         <!-- <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title"> 指标汇总</span>
        </template>
        <el-menu-item index="2-1" @click="$router.push({name: 'datasummary'})">
          <i class="el-icon-document"></i>
         地区数据信息
        </el-menu-item>
        <el-menu-item index="2-2" @click="$router.push({name: 'datasummary1'})">
          <i class="el-icon-document"></i>
          型号数据信息
        </el-menu-item>
         <el-menu-item index="2-3" @click="$router.push({name: 'datasummary2'})">
          <i class="el-icon-document"></i>
          设备数据信息
        </el-menu-item>
      </el-submenu> -->
 
     <el-menu-item index="10" @click="$router.push({name: 'test'})">
        <i class="el-icon-user"></i>
        实时自动调参（测试版）
      </el-menu-item> 

      <el-submenu index="2">
        <template slot="title">
          <el-tooltip ref="tooltip" :disabled="!isCollapse" class="item" effect="dark" content="水流量查询" placement="top-end" >
            <i class="iconfont icon-libshuiliuliang"></i>
          </el-tooltip>
          <span slot="title">水流量查询</span>
        </template>
        <el-menu-item index="2-1" @click="$router.push({name: 'indexdregion'})">
          <i class="iconfont icon-libindex"></i>
          <span slot="title">用水片段查询</span>
        </el-menu-item>
        <el-menu-item index="2-2" @click="$router.push({name: 'indextime'})">
          <i class="iconfont icon-libindex"></i>
          <span slot="title">用水行为查询</span>
        </el-menu-item>
        <el-menu-item index="2-3" @click="$router.push({name: 'indexmodeltype'})">
          <i class="iconfont icon-libindex"></i>
          <span slot="title">设备列表查询</span>
        </el-menu-item>
      </el-submenu>

      <el-submenu index="3">
        <template slot="title">
          <el-tooltip ref="tooltip1" :disabled="!isCollapse" class="item" effect="dark" content="水流量分析" placement="top-end">
            <i class="iconfont icon-libquanshuiliuliang"></i>
          </el-tooltip>
          <span slot="title">水流量分析</span>
        </template>
        <el-submenu index="3-1">
          <template slot="title">
          <i class="el-icon-location" style="color:black"></i>
          <span slot="title">地区汇总及统计</span>
          </template>
          <el-menu-item index="3-1-1" @click="$router.push({name: 'provincesummary'})">
            <i class="iconfont icon-libshengfen"></i>
            省份汇总
          </el-menu-item>
          <el-menu-item index="3-1-2" @click="$router.push({name: 'citysummary'})">
            <i class="iconfont icon-libchengshi"></i>
            城市汇总
          </el-menu-item>
          <el-menu-item index="3-1-3" @click="$router.push({name: 'upsteppattern'})">
            <i class="el-icon-map-location" style="color:black"></i>
            地区稳定情况统计
          </el-menu-item>
        </el-submenu>
        <el-submenu index="3-2">
          <template slot="title">
          <i class="iconfont icon-libxinghao"></i>
          <span slot="title">型号汇总及统计</span>
          </template>
          <el-menu-item index="3-2-1" @click="$router.push({name: 'typesummary'})">
            <i class="iconfont icon-libxinghao"></i>
            型号汇总
          </el-menu-item>
          <el-menu-item index="3-2-2" @click="$router.push({name: 'devicedata'})">
            <i class="iconfont icon-libbiaoge"></i>
            某地区型号设备统计
          </el-menu-item>
        </el-submenu>
        <el-submenu index="3-3">
          <template slot="title">
          <i class="el-icon-time" style="color:black"></i>
          <span slot="title">时间汇总分析</span>
          </template>
          <el-menu-item index="3-3-1" @click="$router.push({name: 'timesummary1'})">
            <i class="el-icon-time" style="color:black"></i>
            时间期间汇总
          </el-menu-item>
          <el-menu-item index="3-3-2" @click="$router.push({name: 'detaildata'})">
            <i class="el-icon-date" style="color:black"></i>
            单设备每月稳定情况
          </el-menu-item>
          <el-menu-item index="3-3-3" @click="$router.push({name: 'datelist'})">
            <i class="el-icon-data-line" style="color:black"></i>
            单设备每日运行数据
          </el-menu-item>
        </el-submenu>
        <!-- <el-submenu index="3-3">
          <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">时间汇总趋势</span>
          </template>
          <el-menu-item index="3-3-1" @click="$router.push({name: 'timesummary1'})">
            <i class="el-icon-document"></i>
            月份汇总趋势
          </el-menu-item>
          <el-menu-item index="3-3-2" @click="$router.push({name: 'timesummary2'})">
            <i class="el-icon-document"></i>
            日期汇总趋势
          </el-menu-item>
        </el-submenu> -->
      </el-submenu>
      <!-- <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">燃热运行状态</span>
        </template>
        <el-menu-item index="3-1" @click="$router.push({name: 'datelist'})">
          <i class="el-icon-document"></i>
          运行状态数据
        </el-menu-item>
        <el-menu-item index="3-2" @click="$router.push({name: 'polylinechart'})">
          <i class="el-icon-document"></i>
          运行状态曲线
        </el-menu-item>
      </el-submenu> -->
      
        <!-- <el-menu-item index="4" @click="$router.push({name: 'stablepattern'})">
        <i class="el-icon-location"></i>
        单设备水流量模式分析
        </el-menu-item>
         <el-menu-item index="5" @click="$router.push({name: 'polylinechart'})">
        <i class="el-icon-location"></i>
        燃热运行状态查询
        </el-menu-item> 
       <el-menu-item index="7" @click="$router.push({name: 'upsteppattern'})">
        <i class="el-icon-location"></i>
        单月不稳定水流量查询
        </el-menu-item>  -->
         
         <!-- <el-menu-item index="8" @click="$router.push({name: 'updatalog'})">
        <i class="el-icon-notebook-1"></i>
        <span slot="title">版本更新日志</span>
        </el-menu-item> -->
      <el-submenu index="6">
        <template slot="title">
          <el-tooltip ref="tooltip" :disabled="!isCollapse" class="item" effect="dark" content="温度查询" placement="top-end" >
            <i class="iconfont icon-libshuiliuliang"></i>
          </el-tooltip>
          <span slot="title">温度查询</span>
        </template>
        <el-menu-item index="6-3" @click="$router.push({name: 'indextemporder'})">
          <i class="iconfont icon-libindex"></i>
          <span slot="title">设备排名</span>
        </el-menu-item>
        <el-menu-item index="6-1" @click="$router.push({name: 'indextemp'})">
          <i class="iconfont icon-libindex"></i>
          <span slot="title">片段查询</span>
        </el-menu-item>
        <el-menu-item index="6-2" @click="$router.push({name: 'indextempequipment'})">
          <i class="iconfont icon-libindex"></i>
          <span slot="title">设备查询</span>
        </el-menu-item>  
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">
          <el-tooltip ref="tooltip1" :disabled="!isCollapse" class="item" effect="dark" content="温度分析" placement="top-end">
            <i class="iconfont icon-libquanshuiliuliang"></i>
          </el-tooltip>
          <span slot="title">温度分析</span>
        </template>
        <el-submenu index="5-1">
          <template slot="title">
          <i class="el-icon-location" style="color:black"></i>
          <span slot="title">地区汇总及统计</span>
          </template>
          <el-menu-item index="5-1-1" @click="$router.push({name: 'temp_provincesummary'})">
            <i class="iconfont icon-libshengfen"></i>
            省份汇总
          </el-menu-item>
          <el-menu-item index="5-1-2" @click="$router.push({name: 'temp_citysummary'})">
            <i class="iconfont icon-libchengshi"></i>
            城市汇总
          </el-menu-item>
          <!-- <el-menu-item index="5-1-3" @click="$router.push({name: 'temp_upsteppattern'})">
            <i class="el-icon-map-location" style="color:black"></i>
            地区稳定情况统计
          </el-menu-item> -->
        </el-submenu>
        <el-submenu index="5-2">
          <template slot="title">
          <i class="iconfont icon-libxinghao"></i>
          <span slot="title">型号汇总及统计</span>
          </template>
          <el-menu-item index="5-2-1" @click="$router.push({name: 'temp_typesummary'})">
            <i class="iconfont icon-libxinghao"></i>
            型号汇总
          </el-menu-item>
          <!-- <el-menu-item index="5-2-2" @click="$router.push({name: 'temp_devicedata'})">
            <i class="iconfont icon-libbiaoge"></i>
            某地区型号设备统计
          </el-menu-item> -->
        </el-submenu>
        <!-- <el-submenu index="5-3">
          <template slot="title">
          <i class="el-icon-time" style="color:black"></i>
          <span slot="title">时间汇总分析</span>
          </template>
          <el-menu-item index="5-3-1" @click="$router.push({name: 'temp_timesummary1'})">
            <i class="el-icon-time" style="color:black"></i>
            时间期间汇总
          </el-menu-item>
          <el-menu-item index="5-3-2" @click="$router.push({name: 'temp_detaildata'})">
            <i class="el-icon-date" style="color:black"></i>
            单设备每月稳定情况
          </el-menu-item>
          <el-menu-item index="5-3-3" @click="$router.push({name: 'temp_datelist'})">
            <i class="el-icon-data-line" style="color:black"></i>
            单设备每日运行数据
          </el-menu-item>
        </el-submenu> -->
      </el-submenu>


 <el-submenu index="11">
        <template slot="title"><i class="el-icon-warning" style="color:black"></i>
   
          <span slot="title">故障诊断</span>
        </template>
        <el-submenu index="11-1">
          <template slot="title">
          <i class="el-icon-warning-outline" style="color:black"></i>
          <span slot="title">熄火异常</span>
          </template>
          <el-menu-item index="11-1-1" @click="$router.push({name: 'faultflameout'})">
            <i class="el-icon-s-order" style="color:black"></i>
            熄火异常诊断
          </el-menu-item>
 <el-menu-item index="11-1-2" @click="$router.push({name: 'flameoutday'})">
            <i class="el-icon-s-order" style="color:black"></i>
            熄火异常每日详情
          </el-menu-item>
        </el-submenu>
        <el-submenu index="11-2">
          <template slot="title">
          <i class="el-icon-warning-outline" style="color:black"></i>
          <span slot="title">加热不足</span>
          </template>
          <el-menu-item index="11-2-1" @click="$router.push({name: 'faultunheatable'})">
            <i class="el-icon-s-order" style="color:black"></i>
            加热不足诊断
          </el-menu-item>
       <el-menu-item index="11-2-2" @click="$router.push({name: 'unheatableday'})">
            <i class="el-icon-s-order" style="color:black"></i>
            加热不足每日详情
          </el-menu-item>
        </el-submenu>
        <el-submenu index="11-3">
          <template slot="title">
          <i class="el-icon-warning-outline" style="color:black"></i>
          <span slot="title">升温异常</span>
          </template>
 <el-menu-item index="11-3-1" @click="$router.push({name: 'overfault'})">
            <i class="el-icon-s-order" style="color:black"></i>
           升温异常诊断
          </el-menu-item>
 <el-menu-item index="11-3-2" @click="$router.push({name: 'overfaultday'})">
            <i class="el-icon-s-order" style="color:black"></i>
            升温异常每日详情
          </el-menu-item>
        </el-submenu>

        <el-submenu index="11-4">
          <template slot="title">
          <i class="el-icon-warning-outline" style="color:black"></i>
          <span slot="title">超调异常</span>
          </template>
 <el-menu-item index="11-4-1" @click="$router.push({name: 'overshootfault'})">
            <i class="el-icon-s-order" style="color:black"></i>
           超调异常诊断
          </el-menu-item>
 <el-menu-item index="11-4-2" @click="$router.push({name: 'overshootfaultday'})">
            <i class="el-icon-s-order" style="color:black"></i>
            超调异常每日详情
          </el-menu-item>
        </el-submenu>
        <el-submenu index="11-5">
          <template slot="title">
          <i class="el-icon-warning-outline" style="color:black"></i>
          <span slot="title">超温异常</span>
          </template>
 <el-menu-item index="11-5-1" @click="$router.push({name: 'overtemp'})">
            <i class="el-icon-s-order" style="color:black"></i>
           超温异常诊断
          </el-menu-item>
 <el-menu-item index="11-5-2" @click="$router.push({name: 'overtempday'})">
            <i class="el-icon-s-order" style="color:black"></i>
            超温异常每日详情
          </el-menu-item>
        </el-submenu>

      </el-submenu>



    <el-submenu index="12">
        <template slot="title">
          <el-tooltip ref="tooltip" :disabled="!isCollapse" class="item" effect="dark" content="评分分布" placement="top-end" >
            <i class="iconfont icon-libshuiliuliang"></i>
          </el-tooltip>
          <span slot="title">评分分布</span>
        </template>
        <el-menu-item index="12-1" @click="$router.push({name: 'statistics'})">
          <i class="iconfont icon-libindex"></i>
          <span slot="title">天数统计</span>
        </el-menu-item>
        <el-menu-item index="12-2" @click="$router.push({name: 'devicedistribution'})">
          <i class="iconfont icon-libindex"></i>
          <span slot="title">设备统计</span>
        </el-menu-item>  
      </el-submenu>


 <el-submenu index="13">
        <template slot="title"><i class="el-icon-warning" style="color:black"></i>
   
          <span slot="title">故障统计</span>
        </template>
        <el-submenu index="13-1">
          <template slot="title">
          <i class="el-icon-warning-outline" style="color:black"></i>
          <span slot="title">故障次数汇总</span>
          </template>
          <el-menu-item index="13-1-1" @click="$router.push({name: 'typefaultsum'})">
            <i class="el-icon-s-order" style="color:black"></i>
            型号故障次数统计
          </el-menu-item>
 <el-menu-item index="13-1-2" @click="$router.push({name: 'typefaultsum3'})">
            <i class="el-icon-s-order" style="color:black"></i>
           型号故障次数显示
          </el-menu-item>
 <el-menu-item index="13-1-3" @click="$router.push({name: 'typefaultsum2'})">
            <i class="el-icon-s-order" style="color:black"></i>
           型号主要故障次数显示
          </el-menu-item>
           <el-menu-item index="13-1-4" @click="$router.push({name: 'prodmonthfaultsum'})">
            <i class="el-icon-s-order" style="color:black"></i>
           生产日期故障次数显示
          </el-menu-item>

        </el-submenu>

                <el-submenu index="13-3">
          <template slot="title">
          <i class="el-icon-warning-outline" style="color:black"></i>
          <span slot="title">故障设备汇总</span>
          </template>
          <el-menu-item index="13-3-1" @click="$router.push({name: 'typenumsum'})">
            <i class="el-icon-s-order" style="color:black"></i>
            型号故障设备占比
          </el-menu-item>


        </el-submenu>
        <el-submenu index="13-2">
          <template slot="title">
          <i class="el-icon-warning-outline" style="color:black"></i>
          <span slot="title">故障每日详情</span>
          </template>
                 <el-menu-item index="13-2-3" @click="$router.push({name: 'typenumday'})">
            <i class="el-icon-s-order" style="color:black"></i>
            故障设备占比详情
          </el-menu-item>
          <el-menu-item index="13-2-1" @click="$router.push({name: 'typefault'})">
            <i class="el-icon-s-order" style="color:black"></i>
            型号故障次数详情
          </el-menu-item>

       <el-menu-item index="13-2-2" @click="$router.push({name: 'equfault'})">
            <i class="el-icon-s-order" style="color:black"></i>
            设备故障次数详情
          </el-menu-item>


        </el-submenu>

      </el-submenu>
 <el-submenu index="14">
        <template slot="title"><i class="el-icon-warning" style="color:black"></i>
   
          <span slot="title">设备预警</span>
        </template>
        <el-submenu index="14-1">
          <template slot="title">
          <i class="el-icon-collection" style="color:black"></i>
          <span slot="title">设备统计</span>
          </template>
          <el-menu-item index="14-1-1" @click="$router.push({name: 'total'})">
            <i class="el-icon-collection" style="color:black"></i>
            设备统计
          </el-menu-item>
        </el-submenu>
         <el-submenu index="14-2">
          <template slot="title">
          <i class="el-icon-warning" style="color:black"></i>
          <span slot="title">设备预警</span>
          </template>
          <el-menu-item index="14-2-1" @click="$router.push({name: 'Variation'})">
            <i class="el-icon-warning" style="color:black"></i>
            设备性能逐渐变差
          </el-menu-item>
        </el-submenu>
 </el-submenu>

   







    
<!--
    <el-menu-item index="7" @click="$router.push({name: 'equipmentmonitor'})">
        <i class="el-icon-s-home" style="color:black"></i>
        <span slot="title">性能监控</span>
    </el-menu-item>
    -->
<!--
    <el-menu-item index="8" @click="$router.push({name: 'collection'})">
        <i class="iconfont icon-libindex" style="color:black"></i>
        <span slot="title">实时采集</span>
    </el-menu-item>
-->


 <el-submenu index="8">
        <template slot="title"><i class="iconfont icon-libindex" style="color:black"></i>
   
          <span slot="title">实时采集</span>
        </template>
        <el-submenu index="8-1">
          <template slot="title">
          <i class="el-icon-collection" style="color:black"></i>
          <span slot="title">实时采集</span>
          </template>
          <el-menu-item index="8-1-1" @click="$router.push({name: 'collection'})">
            <i class="el-icon-collection" style="color:black"></i>
            实时片段采集
          </el-menu-item>
         <el-menu-item index="8-1-2" @click="$router.push({name: 'timemonitor'})">
            <i class="el-icon-collection" style="color:black"></i>
            实时运行监控
          </el-menu-item>
        </el-submenu>
         <el-submenu index="8-2">
          <template slot="title">
          <i class="el-icon-warning" style="color:black"></i>
          <span slot="title">实时记录</span>
          </template>
          <el-menu-item index="8-2-1" @click="$router.push({name: 'recoding'})">
            <i class="el-icon-warning" style="color:black"></i>
            实时故障记录
          </el-menu-item>
         
         <el-menu-item index="8-2-2" @click="$router.push({name: 'upload'})">
            <i class="el-icon-warning" style="color:black"></i>
            实时调参记录
          </el-menu-item>

        </el-submenu>
         <el-submenu index="8-3">
          <template slot="title">
          <i class="el-icon-warning" style="color:black"></i>
          <span slot="title">识别结果</span>
          </template>
 
                    <el-menu-item index="8-3-3" @click="$router.push({name: 'E1fault'})">
            <i class="el-icon-warning" style="color:black"></i>
          燃气压偏低或感应针问题
          </el-menu-item>
          <el-menu-item index="8-3-4" @click="$router.push({name: 'C4fault'})">
            <i class="el-icon-warning" style="color:black"></i>
            风机堵塞
          </el-menu-item>
          <!--
         <el-menu-item index="8-2-2" @click="$router.push({name: 'recoding'})">
            <i class="el-icon-warning" style="color:black"></i>
            实时调参记录
          </el-menu-item>
-->
        </el-submenu>

 </el-submenu>





<!--
    <el-menu-item index="9" @click="$router.push({name: 'timemonitor'})">
        <i class="iconfont icon-libindex" style="color:black"></i>
        <span slot="title">实时监控</span>
    </el-menu-item>
  -->
    <el-submenu index="10">
        <template slot="title">
            <el-tooltip ref="tooltip" :disabled="!isCollapse" class="item" effect="dark" content="设备参数信息管理" placement="top-end" >
                <i class="iconfont icon-libshuiliuliang"></i>
            </el-tooltip>
            <span slot="title">参数信息管理</span>
        </template>
        <el-menu-item index="10-1" @click="$router.push({name: 'Para_Inquire'})">
            <i class="iconfont icon-libindex"></i>
            <span slot="title">参数信息修改</span>
        </el-menu-item>
                <el-menu-item index="10-2" @click="$router.push({name: 'Para_Inquire_start'})">
            <i class="iconfont icon-libindex"></i>
            <span slot="title">参数信息修改(开关机)</span>
        </el-menu-item>
        <el-menu-item index="10-3" @click="$router.push({name: 'Para_mange'})">
            <i class="iconfont icon-libindex"></i>
            <span slot="title">参数修改日志管理</span>
        </el-menu-item>
<el-menu-item index="10-4" @click="$router.push({name: 'Para_multiple'})">
            <i class="iconfont icon-libindex"></i>
            <span slot="title">多设备参数管理</span>
        </el-menu-item>
    </el-submenu>
        <el-menu-item index="11" @click="$router.push({name: 'dayequ'})">
        <i class="el-icon-s-home" style="color:black"></i>
        <span slot="title">设备日汇总</span>
    </el-menu-item>

    </el-menu>

    
  </div>

</template>
<script>
import local from '@/assets/local.js'
import request from '@/utils/request';

export default {
  data() {
    return {
      isCollapse:false,
      bgcolor:'',
      txcolor:'',
      acttxcolor:'',
      temp_my_data:"1",
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    menuState() {
      this.isCollapse=!this.isCollapse;
    },
  },
  created() {
if ( window.location.href.split('#')[1] == "/") {
      this.temp_my_data = "1";
      console.log(this.temp_my_data);
    } else if (window.location.href.split('#')[1] == "/migration") {
      this.temp_my_data = "4-1";
    }else if (window.location.href.split('#')[1] == "/monitoring") {
      this.temp_my_data = "4-2";
    }else if (window.location.href.split('#')[1] == "/indexdregion") {
      this.temp_my_data = "2-1";
    }else if (window.location.href.split('#')[1] == "/indextime") {
      this.temp_my_data = "2-2";
    }else if (window.location.href.split('#')[1] == "/indexmodeltype") {
      this.temp_my_data = "2-3";
    }else if (window.location.href.split('#')[1] == "/provincesummary") {
      this.temp_my_data = "3-1-1";
    }else if (window.location.href.split('#')[1] == "/citysummary") {
      this.temp_my_data = "3-1-2";
    }else if (window.location.href.split('#')[1] == "/upsteppattern") {
      this.temp_my_data = "3-1-3";
    }else if (window.location.href.split('#')[1] == "/typesummary") {
      this.temp_my_data = "3-2-1";
    }else if (window.location.href.split('#')[1] == "/devicedata") {
      this.temp_my_data = "3-2-2";
    }else if (window.location.href.split('#')[1] == "/timesummary1") {
      this.temp_my_data = "3-3-1";
    }else if (window.location.href.split('#')[1] == "/detaildata") {
      this.temp_my_data = "3-3-2";
    }else if (window.location.href.split('#')[1] == "/datelist") {
      this.temp_my_data = "3-3-3";
    }else if (window.location.href.split('#')[1] == "/indextemp") {
      this.temp_my_data = "6-1";
    }else if (window.location.href.split('#')[1] == "/indextempequipment") {
      this.temp_my_data = "6-2";
    }else if (window.location.href.split('#')[1] == "/indextemporder") {
      this.temp_my_data = "6-3";
    }else if (window.location.href.split('#')[1] == "/temp_provincesummary") {
      this.temp_my_data = "5-1-1";
    }else if (window.location.href.split('#')[1] == "/temp_citysummary") {
      this.temp_my_data = "5-1-2";
    }else if (window.location.href.split('#')[1] == "/temp_typesummary") {
      this.temp_my_data = "5-2-1";
    }else if (window.location.href.split('#')[1] == "/equipmentmonitor") {
      this.temp_my_data = "7";
     } else if (window.location.href.split('#')[1] == "/collection") {
      this.temp_my_data = "8";
    }else if (window.location.href.split('#')[1] == "/timemonitor") {
      this.temp_my_data = "9";
    }else if (window.location.href.split('#')[1] == "/Para_Inquire") {
      this.temp_my_data = "10-1";
    }else if (window.location.href.split('#')[1] == "/Para_mange") {
      this.temp_my_data = "10-2";
    }else if (window.location.href.split('#')[1] == "/Para_multiple") {
      this.temp_my_data = "10-3";
    }else if (window.location.href.split('#')[1] == "/faultsummaries") {
      this.temp_my_data = "11-1";
    }else if (window.location.href.split('#')[1] == "/faultdiagnosis") {
      this.temp_my_data = "11-2";
    }else if (window.location.href.split('#')[1] == "/statistics") {
      this.temp_my_data = "12-1";
    }else if (window.location.href.split('#')[1] == "/devicedistribution") {
      this.temp_my_data = "12-2";
    }
else if (window.location.href.split('#')[1] == "/typefaultsum") {
      this.temp_my_data = "13-1-1";
    }else if (window.location.href.split('#')[1] == "/typefaultsum3") {
      this.temp_my_data = "13-1-2";
    }else if (window.location.href.split('#')[1] == "/typefaultsum2") {
      this.temp_my_data = "13-1-3";
    }else if (window.location.href.split('#')[1] == "/typefault") {
      this.temp_my_data = "13-2-1";
    }else if (window.location.href.split('#')[1] == "/equfault") {
      this.temp_my_data = "13-2-2";
    }
    else if (window.location.href.split('#')[1] == "/total") {
      this.temp_my_data = "14-1-1";
    }else if (window.location.href.split('#')[1] == "/Variation") {
      this.temp_my_data = "14-2-1";
    }
    else{
      this.temp_my_data = "1";
    }


    request.post('data/page/initialize', null, {
      params:
      { 
        pagetype:"1"
      },
    }).then(({ data: response }) => {
      console.log(response.data)
      this.bgcolor=response.data.data.bgcolor
      this.txcolor=response.data.data.txcolor
      this.acttxcolor=response.data.data.acttxcolor
    }).catch((err) => {
      this.$message.error(err);
    });
    this.$bus.$on("sendmenucolor",d=>{console.log(d);
      if(d.data[0]!="") {
        this.bgcolor='';
        this.bgcolor=d.data[0];
        if(this.bgcolor==null) {
          this.bgcolor='rgba(255, 255, 255, 1)'
        }
        if(d.btnflag==1) {
          var push="data/"+"bgcolor"
          request.put(push, null, {
            params:
            { 
              Label:"bgcolor",
              Id:"3",
              Value:this.bgcolor
            },
          }).then(({ data: response }) => {
          })
        }
      }  
      if(d.data[1]!="") {
        this.txcolor='';
        this.txcolor=d.data[1];
        if(this.txcolor==null) {
          this.txcolor='rgba(255, 255, 255, 1)'
        }
        if(d.btnflag==1) {
          var push="data/"+"txcolor"
          request.put(push, null, {
            params:
            { 
              Label:"txcolor",
              Id:"3",
              Value:this.txcolor
            },
          }).then(({ data: response }) => {
          })
        }
      }
      if(d.data[2]!="") {
        this.acttxcolor='';
        this.acttxcolor=d.data[2];
        if(this.acttxcolor==null) {
          this.acttxcolor='rgba(255, 255, 255, 1)'
        }
        if(d.btnflag==1) {
          var push="data/"+"acttxcolor"
          request.put(push, null, {
            params:
            { 
              Label:"acttxcolor",
              Id:"3",
              Value:this.acttxcolor
            },
          }).then(({ data: response }) => {
          })
        }
      }
    })
    // this.$bus.$on("sendmenucolorclosesave",d=>{
    //   if(d.closeflag==1){
    //     this.bgcolor=local.get('bgcolor')
    //     this.txcolor=local.get('txcolor')
    //     this.acttxcolor=local.get('acttxcolor')
    //   }
    // })
     
 }
};

</script>

<style  lang="scss"  scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 270px;
  min-height: 93.5vh;
}

// .bottom {
//   clear: both;
//   text-align: center;
// }

.el-tooltip__popper {
  padding: 8px 10px;
}
  
</style>
