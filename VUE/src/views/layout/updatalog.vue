<template>

<div class="block"  >
   
   
  <el-timeline>
<el-timeline-item timestamp="2022/7/22" placement="top"
       color="#0bbd87"
       size="normal ">
      <el-card>
        <h4>V1.5.3更新日志</h4>
         <p>1、新增风堵系数过大导致的熄火异常改参</p>
        <p>2、风机系数＞110时，首先恢复至100，其后再进行减5操作</p>
         <p>3、实时自动调参界面新增片段查询跳跃窗口</p>
      </el-card>
    </el-timeline-item>


<el-timeline-item timestamp="2022/7/19" placement="top"
       color="#0bbd87"
       size="normal ">
      <el-card>
        <h4>V1.5.2更新日志</h4>
         <p>1、基本自动改参功能通过验证</p>
      </el-card>
    </el-timeline-item>

<el-timeline-item timestamp="2022/7/7" placement="top"
       color="#0bbd87"
       size="normal ">
      <el-card>
        <h4>V1.5.1更新日志</h4>
         <p>1、首页新增故障设备监控表</p>
         <p>2、修复了首页型号柱状图显示不出的问题</p>
         <p>3、修复了设备排名跳转查询出错的问题</p>
         <p>4、性能监控新增是否恒温震荡判断</p>
      </el-card>
    </el-timeline-item>

<el-timeline-item timestamp="2022/7/5" placement="top"
       color="#0bbd87"
       size="normal ">
      <el-card>
        <h4>V1.5.0更新日志</h4>
         <p>1、优化性能监控中ut与F稳定值的获取</p>
         <p>2、新增日汇总模块</p>
      </el-card>
    </el-timeline-item>

<el-timeline-item timestamp="2022/6/28" placement="top"
       color="#0bbd87"
       size="normal ">
      <el-card>
        <h4>V1.4.9更新日志</h4>
         <p>1、修复参数查询在燃烧时查询出错的情况</p>
         <p>2、新增实时自动调参模块</p>
      </el-card>
    </el-timeline-item>


<el-timeline-item timestamp="2022/5/27" placement="top"
       color="#0bbd87"
       size="normal ">
      <el-card>
        <h4>V1.4.8更新日志</h4>
         <p>1、实时采集新增自动调参功能,自动修复风机、熄火、恒温</p>
         <p>2、修复了首页右下角榜单数据不全导致显示异常的情况</p>
      </el-card>
    </el-timeline-item>



<el-timeline-item timestamp="2022/5/9" placement="top"
       color="#0bbd87"
       size="normal ">
      <el-card>
        <h4>V1.4.7更新日志</h4>
         <p>1、新增批量修改参数功能</p>
         <p>2、优化实时迁移与实时监控</p>
      </el-card>
    </el-timeline-item>


<el-timeline-item timestamp="2022/4/6" placement="top"
       color="#0bbd87"
       size="normal ">
      <el-card>
        <h4>V1.4.6更新日志</h4>
         <p>1、更正nE参数的存取显示有误问题</p>
         <p>2、新增参数信息修改(开关机)功能</p>
         <p>3、新增超温异常故障诊断模块</p>
      </el-card>
    </el-timeline-item>


<el-timeline-item timestamp="2022/4/6" placement="top"
       color="#0bbd87"
       size="normal ">
      <el-card>
        <h4>V1.4.5更新日志</h4>
         <p>1、新增设备故障占比统计功能</p>
         <p>2、新增升温异常NE2、超调异常NE3的故障诊断功能</p>
         <p>3、修改部分页面翻页时出现的问题</p>
      </el-card>
    </el-timeline-item>


<el-timeline-item timestamp="2022/3/22" placement="top"
       color="#0bbd87"
       size="normal ">
      <el-card>
        <h4>V1.4.4更新日志</h4>
         <p>1、新增设备评分天数统计功能</p>
         <p>2、优化故障诊断与故障记录查询功能</p>
         <p>3、修改FH/FL/FD/FC/FP参数范围受限条件</p>
         
      </el-card>
    </el-timeline-item>


<el-timeline-item timestamp="2022/3/14" placement="top"
       color="#0bbd87"
       size="normal ">
      <el-card>
        <h4>V1.4.3更新日志</h4>
         <p>1、新增故障片段筛选功能</p>
         <p>2、新增故障诊断与故障记录查询功能</p>
         <p>3、优化前端控制迁移功能</p>
      </el-card>
    </el-timeline-item>


<el-timeline-item timestamp="2022/2/28" placement="top"
       color="#0bbd87"
       size="normal ">
      <el-card>
        <h4>V1.4.2更新日志</h4>
         <p>1、新增恒温熄火片段</p>
         <p>2、完善了片段查询中只输入城市与设备号即可查询片段的功能</p>

      </el-card>
    </el-timeline-item>

<el-timeline-item timestamp="2022/2/24" placement="top"
       color="#0bbd87"
       size="normal ">
      <el-card>
        <h4>V1.4.1更新日志</h4>
         <p>1、新首页的更新与部署</p>
         <p>2、修复了设备查询跳转至设备详情界面无法跳转查询</p>
         <p>3、设备查询新增升温段评分、恒温段评分以及其它主要指标</p>
         <p>4、设备查询新增升温段与恒温段的评分筛选功能</p>
      </el-card>
    </el-timeline-item>


<el-timeline-item timestamp="2022/2/14" placement="top"
       color="#0bbd87"
       size="normal ">
      <el-card>
        <h4>V1.4.0更新日志</h4>
         <p>1、设备查询界面新增温度评分筛选查询</p>
         <p>2、修复了型号查询显示不出数据的bug</p>
         <p>3、添加表格导出功能</p>
         <p>4、修复了界面跳转显示不出数据的bug</p>
      </el-card>
    </el-timeline-item>


<el-timeline-item timestamp="2022/1/18" placement="top"
       color="#0bbd87"
       size="normal ">
      <el-card>
        <h4>V1.3.9更新日志</h4>
         <p>1、新增默认参数下发功能</p>
         <p>2、新增参数范围提示功能</p>
         <p>3、运行曲线图中新增加热段与恒温段评分</p>
         <p>4、新增单参数历史修改记录</p>
      </el-card>
    </el-timeline-item>



<el-timeline-item timestamp="2022/1/9" placement="top"
       color="#0bbd87"
       size="normal ">
      <el-card>
        <h4>V1.3.8更新日志</h4>
         <p>1、新增参数修改界面与参数修改历史记录界面</p>
         <p>2、新增性能监控中的设备进行参数修改功能</p>
         <p>3、修正了性能监控中温度评分与设备详情中温度评分不一致的问题</p>
         <p>4、片段查询新增新温度评分，运行曲线新增温度受水流量波动影响与温度模式标志位曲线</p>
      </el-card>
    </el-timeline-item>


<el-timeline-item timestamp="2021/12/25" placement="top"
       color="#0bbd87"
       size="normal ">
      <el-card>
        <h4>V1.3.7更新日志</h4>
        <p>1、实时监控中新增参数修改功能</p>
         <p>2、性能监控界面新增异常识别功能</p>
         
      </el-card>
    </el-timeline-item>


<el-timeline-item timestamp="2021/12/18" placement="top"
       color="#0bbd87"
       size="normal ">
      <el-card>
        <h4>V1.3.6更新日志</h4>
        <p>1、优化数据管理中的页数查询与默认查询问题</p>
         <p>2、优化性能监控中的平均分显示与日期查询问题</p>
         <p>3、新增实时监控功能</p>
      </el-card>
    </el-timeline-item>


  <el-timeline-item timestamp="2021/12/11" placement="top"
       color="#0bbd87"
       size="normal ">
      <el-card>
        <h4>V1.3.5更新日志</h4>
        <p>1、优化迁移管理和监控管理的已勾选未勾选的逻辑问题<br>2、性能监控界面的设备框和型号框修改为了下拉框，下拉框内容为已监控的设备
        <br>3、性能监控界面的时间选择器添加了默认显示最近一周的时间，另外增加了当天、昨天、最近一周三个多选
        </p>
      </el-card>
    </el-timeline-item>
  <el-timeline-item timestamp="2021/12/9" placement="top"
       color="#0bbd87"
       size="normal ">
      <el-card>
        <h4>V1.3.4更新日志</h4>
        <p>1、优化实时采集功能<br>2、添加了性能监控中温度评分查询与评分曲线的显示功能</p>
      </el-card>
    </el-timeline-item>
  <el-timeline-item timestamp="2021/12/3" placement="top"
       color="#0bbd87"
       size="normal ">
      <el-card>
        <h4>V1.3.3更新日志</h4>
        <p>1、完成了实时采集功能</p>
      </el-card>
    </el-timeline-item>
  <el-timeline-item timestamp="2021/11/30" placement="top"
       color="#0bbd87"
       size="normal ">
      <el-card>
        <h4>V1.3.2更新日志</h4>
        <p>1、使右上角设置中的算法参数设置可以实现对ini文件参数的修改（ini文件在后端读取的路径采用绝对路径）</p>
      </el-card>
    </el-timeline-item>
  <el-timeline-item timestamp="2021/11/26" placement="top"
       color="#0bbd87"
       size="normal ">
      <el-card>
        <h4>V1.3.1更新日志</h4>
        <p>1、添加实时采集界面，实现输入设备号、开始时间、结束时间能够存到Mysql表中，在Mysql表中记录每一条采集数据</p>
      </el-card>
    </el-timeline-item>
  <el-timeline-item timestamp="2021/11/20" placement="top"
       color="#0bbd87"
       size="normal ">
      <el-card>
        <h4>V1.3.0更新日志</h4>
        <p>1、将性能监控界面的筛选查询方式修改成与迁移管理类似的查询方式，并在查询到的表格中添加“操作1：运行曲线”与“操作2：期间每日详情”两列</p>
      </el-card>
    </el-timeline-item>
    <el-timeline-item timestamp="2021/11/15" placement="top"
       color="#0bbd87"
       size="normal ">
      <el-card>
        <h4>V1.2.9更新日志</h4>
        <p>1、将基础数据管理分成迁移管理界面和监控管理界面，并实现对Mysql表中迁移和监控标志位的读取和修改</p>
      </el-card>
    </el-timeline-item>
    <el-timeline-item timestamp="2021/11/13" placement="top"
       color="#0bbd87"
       size="normal ">
      <el-card>
        <h4>V1.2.8更新日志</h4>
        <p>1、将基本数据管理模块的查询功能从主题选择转换成多组合条件灵活查询，并添加“已勾选”与“未勾选”的显示选择</p>
      </el-card>
    </el-timeline-item>
    <el-timeline-item timestamp="2021/11/06" placement="top"
       size="normal ">
      <el-card>
        <h4>V1.2.7更新日志</h4>
        <p>1、将基本数据管理模块进行完善，可省份、城市、型号主题查询管理，全选、分页即查、单页全选、弹框确认等功能</p>
      </el-card>
    </el-timeline-item>
    <el-timeline-item timestamp="2021/11/05" placement="top"
       size="normal ">
      <el-card>
        <h4>V1.2.6更新日志</h4>
        <p>1、将水流量片段查询页面功能与温度片段查询页面功能跟进最新数据库字段匹配</p>
      </el-card>
    </el-timeline-item>
    <el-timeline-item timestamp="2021/11/04" placement="top"
       size="normal ">
      <el-card>
        <h4>V1.2.5更新日志</h4>
        <p>1、将基本数据管理模块进行改动，最终于设备上进行迁移与监控控制</p>
      </el-card>
    </el-timeline-item>
    <el-timeline-item timestamp="2021/10/30" placement="top"
       size="normal ">
      <el-card>
        <h4>V1.2.4更新日志</h4>
        <p>1、构想讨论性能监控与性能验证页面功能，并将性能监控页面的功能架构大致完成</p>
      </el-card>
    </el-timeline-item>
    <el-timeline-item timestamp="2021/10/18" placement="top"
       size="normal ">
      <el-card>
        <h4>V1.2.3更新日志</h4>
        <p>1、调整片段曲线界面显示，并解决温度片段颜色划分bug</p>
      </el-card>
    </el-timeline-item>
    <el-timeline-item timestamp="2021/10/16" placement="top"
       size="normal ">
      <el-card>
        <h4>V1.2.2更新日志</h4>
        <p>1、首页添加“服务器剩余空间近一个月日趋势图”并添加目前所剩空间</p>
      </el-card>
    </el-timeline-item>
    <el-timeline-item timestamp="2021/10/15" placement="top"
       size="normal ">
      <el-card>
        <h4>V1.2.1更新日志</h4>
        <p>1、将温度片段查询的筛选条件进行完善</p>
        <p>2、进一步完成解决“设备排名”与“设备查询”温度评分不一致的问题</p>
      </el-card>
    </el-timeline-item>
    <el-timeline-item timestamp="2021/10/12" placement="top"
      size="normal ">
      <el-card>
        <h4>V1.2.0更新日志</h4>
        <p>1、解决“设备排名”与“设备查询”温度评分不一致的问题</p>
        <p>2、从“设备查询”跳转至“温度片段查询”时条件为：温度模式不限；划分片段不限</p>
        <p>3、首页布局进行调整，并将“昨日时长分布”调整为“上月最差设备用水行为时长分布”</p>
      </el-card>
    </el-timeline-item>
    <el-timeline-item timestamp="2021/10/11" placement="top"
       size="normal ">
      <el-card>
        <h4>V1.1.9更新日志</h4>
        <p>1、温度片段查询部分表格对温度模式以及水流量模式进行颜色划分</p>
        <p>2、对所有柱状图都进行了改善，对于跨月查询直接显示汇总柱状图数据（横坐标去除月份信息）</p>
        <p>3、对柱状图排序功能进行调整，点击切换统计值便直接切换显示该统计值排序后的柱状图数据</p>
      </el-card>
    </el-timeline-item>
    <el-timeline-item timestamp="2021/10/10" placement="top"
       size="normal ">
      <el-card>
        <h4>V1.1.8更新日志</h4>
        <p>1、首页添加了“全国区域月份趋势走向(温度评分)”以及“（温度评分）最差型号月份趋势走向”两个折线趋势图</p>
        <p>2、对温度片段查询得到的温度曲线进行“加热段稳定”、“恒温段稳定”以及“异常”划分颜色</p>
      </el-card>
    </el-timeline-item>
    <el-timeline-item timestamp="2021/10/09" placement="top"
       size="normal ">
      <el-card>
        <h4>V1.1.7更新日志</h4>
        <p>1、首页地图水流量颜色划分进行了完善</p>
        <p>2、添加温度设备排名页面，并通过点击跳转至设备查询页面（直接显示查询结果）</p>
      </el-card>
    </el-timeline-item>
    <el-timeline-item timestamp="2021/10/08" placement="top"
       size="normal ">
      <el-card>
        <h4>V1.1.6更新日志</h4>
        <p>1、首页地图数据信息从数据表里读取显示</p>
        <p>2、将水流量以及温度设备查询页面修改为一设备一行，显示该日期范围内各设备统计值汇总</p>
        <p>3、将查询与分析功能的所有页面日期搜索框都默认从数据库里查询调取会前端默认显示</p>
      </el-card>
    </el-timeline-item>
    <el-timeline-item timestamp="2021/10/06" placement="top"
       size="normal ">
      <el-card>
        <h4>V1.1.5更新日志</h4>
        <h5>数据迁移</h5>
        <p>1、完成了9、10月份数据迁移及清洗</p>
        <h5>前端功能</h5>
        <p>1、对首页其余图表进行更新完善，并调整布局</p>
        <p>2、对温度查询页面的查询条件进行型号与设备分离，并添加了弹框提示是否继续查询的功能</p>
        <h5>后端算法</h5>
        <p>1、对两次用水时间过近的行为的升温问题进行分析</p>
        <p>2、增加地区指标表，划分6个地区</p>
      </el-card>
    </el-timeline-item>
    <el-timeline-item timestamp="2021/10/05" placement="top"
       size="normal ">
      <el-card>
        <h4>V1.1.4更新日志</h4>
        <h5>数据迁移</h5>
        <p>1、创建了保存36个城市的时间表，保存36个城市的起始运行和结束运行的时间表，保存36个城市的设备、型号、开始运行时间、结束运行时间的总表</p>
        <p>2、创建省市分区的表、设备表添加是否有数据的标志位</p>
        <p>3、按照需求删除了挖掘需要的设备表数量，改成一个城市50台</p>
        <h5>前端功能</h5>
        <p>对首页进行统计值以及基本信息的显示，其中城市、型号、设备排名以及地图数据为真实查询数据，其余数据皆为“假值”先作为功能顶替</p>
        <h5>后端算法</h5>
        <p>对数据的整体特征量的汇总程序进行编写，主要为开始时间、结束时间、更新时间、城市数量、型号数量、设备数量、整体数据量、当天数据量和平均每天数据量。</p>
      </el-card>
    </el-timeline-item>
    <el-timeline-item timestamp="2021/10/03" placement="top"
       size="normal ">
      <el-card>
        <h4>V1.1.3更新日志</h4>
        <h5>数据迁移</h5>
        <p>1、清洗和迁移了36个城市的8个月数据，共2876台设备，72个型号</p>
        <h5>前端功能</h5>
        <p>1、将水流量查询与分析两个模块结构重新规划</p>
        <p>2、一些页面完善默认查询显示功能</p>
        <h5>后端算法</h5>
        <p>1、对数据的汇总流程进行修改，修改为数据追加的方式。在查询索引前判断设备是否有数据，只对当天有数据的设备进行查询索引，减少空数据的索引时长。</p>
        <p>2、由于最耗时的是多次SQL操作，减少SQL操作次数，增加单次操作读取的数量。</p>
      </el-card>
    </el-timeline-item>
    <el-timeline-item timestamp="2021/9/30" placement="top"
       size="normal ">
      <el-card>
        <h4>V1.1.2更新日志</h4>
        <p>1、添加用水片段与用水行为的有效无效划分筛选</p>
        <p>2、对图表显示进行了改善</p>
        <p>3、对“某地区型号设备统计”页面进行搜索功能的改善，可查询某地区所有型号所有设备数据，或再选择显示某型号的所有设备数据</p>
      </el-card>
    </el-timeline-item>
    <el-timeline-item timestamp="2021/9/29" placement="top"
       size="normal ">
      <el-card>
        <h4>V1.1.1更新日志</h4>
        <p>1、首页改为直接显示各设备用水行为的图表信息</p>
        <p>2、数据管理部分添加“城市”“型号”“设备”三部分管理，并经过改善</p>
        <p>3、将水流量查询部分添加评分，并更改运行曲线展示功能</p>
        <p>4、将数据管理部分都改成即点即修改（去掉确认按钮）</p>
        <p>5、目前数据更新为北上广深，仅1月</p>
      </el-card>
    </el-timeline-item>
    <el-timeline-item timestamp="2021/9/13" placement="top"
       size="normal ">
      <el-card>
        <h4>V1.1.0更新日志</h4>
        <p>1、首页的用水片段以及用水汇总部分完善显示信息并添加功能</p>
        <p>2、增添基础数据管理页面（目前仅页面显示，还未投入实际使用）</p>
        <p>3、页头设置菜单的系统设置以及算法参数设置也仅页面显示，尚未开放</p>
      </el-card>
    </el-timeline-item>
    <el-timeline-item timestamp="2021/8/29" placement="top"
       size="normal ">
      <el-card>
        <h4>V1.0.9更新日志</h4>
        <p>1、增加系统相关设置功能，主题设置、数据管理（尚未开放）等</p>
         <p>2、修缮整体页面布局</p>
      </el-card>
    </el-timeline-item>
     <el-timeline-item timestamp="2021/8/17" placement="top"
       size="normal ">
      <el-card>
        <h4>V1.0.8更新日志</h4>
        <p>1、增加综合索引页面，可对用水片段和设备稳定情况进行查询</p>
         <p>2、增加信息汇总页面，可按地区、型号及时间对设备稳定情况进行汇总</p>
         <p>3、改善信息汇总与综合索引页面</p>
      </el-card>
    </el-timeline-item>
         <el-timeline-item timestamp="2021/8/11" placement="top"
       size="normal ">
      <el-card>
        <h4>V1.0.7更新日志</h4>
        <p>1、增加综合索引页面，可以对单个用水行为进行查询，对该行为曲线进行显示</p>
        <p>2、对单次用水可进行自定义、多条件进行排序、筛选</p>
        <p>3、设备列表页面可对地区、型号两个维度进行查询</p>
        <p>4、信息汇总页面可对地区、型号、单个设备总体情况进行显示</p>
        <p>5、可以对一段时间范围的地区、型号、设备情况的变化趋势进行显示</p>
      </el-card>
    </el-timeline-item>
     <el-timeline-item timestamp="2021/8/4" placement="top"
       size="normal ">
      <el-card>
        <h4>V1.0.6更新日志</h4>
        <p>1、增加单月不稳定水流量查询页面</p>
      </el-card>
    </el-timeline-item>
     <el-timeline-item timestamp="2021/7/27" placement="top"
       size="normal ">
      <el-card>
        <h4>V1.0.5更新日志</h4>
        <p>1、水流量模式分析页面下增加水流量模式分布页面</p>
        <p>2、水流量模式分布页面显示当月水流量均值分布的直方图和单个模式片段的时长分布直方图</p>
      </el-card>
    </el-timeline-item>
     <el-timeline-item timestamp="2021/7/24" placement="top"
       size="normal ">
      <el-card>
        <h4>V1.0.4更新日志</h4>
        <p>1、将水流量模式页面查询数据与图表不一致问题修改</p>
        <p>2、单月模式分析页面和期间模式分析页面查询结果与北京、上海、天津共64台设备2021年1-6月数据一致</p>
      </el-card>
    </el-timeline-item>
      <el-timeline-item timestamp="2021/7/22" placement="top">
      <el-card>
        <h4>V1.0.3更新日志</h4>
        <p>1、将水流量模式的标准差、极差散点图和直方图修改为显示单月模式片段的分布情况</p>
        <p>2、单月模式分析页面增加模式时长占比情况</p>
        <p>3、增加北京、上海、天津共64台设备2021年1-6月数据</p>
        <p>4、将燃热运行状态数据和曲线显示合并成燃热运行状态查询，上面显示曲线下面显示数据</p>
      </el-card>
    </el-timeline-item>
    <el-timeline-item timestamp="2021/7/21" placement="top">
      <el-card>
        <h4>V1.0.2更新日志</h4>
        <p>1、单设备水流量分析页面模式数据模式显示改为在曲线下面显示</p>
        <p>2、增加水流量模式的标准差和极差分布散点图和直方图</p>
      </el-card>
    </el-timeline-item> 
    <el-timeline-item timestamp="2021/7/19" placement="top">
      <el-card>
        <h4>V1.0.1更新日志</h4>
        <p>1、增加指标汇总页面(地区指标、型号指标、设备指标三个维度)</p>
        <p>2、单设备水流量分析页面增加单段模式极差、标准差、变异系数等指标</p>
      </el-card>
    </el-timeline-item>

  </el-timeline>
</div>
</template>

<script>


export default {



};
</script>

 <style  lang="scss"  scoped>
 .block{
  // margin-right: 50px;
  margin-left: 50px;
  margin-top: 60px;
  margin-bottom: 30px;
}

</style>
