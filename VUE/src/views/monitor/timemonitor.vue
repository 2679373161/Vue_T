<template>
  <div id="app1">
   
  <div class="search" align="center" style="margin-top:20px;">
      <span>实时监控：</span>
      <span>设备：</span>
      <el-autocomplete v-model="value3" :disabled="equipment_state" placeholder="请输入设备号" style="width:170px" clearable class="inline-input"
      :fetch-suggestions="querySearch1" :trigger-on-focus="false"></el-autocomplete>

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
    <el-button type="primary" @click="search" :disabled="button_state" style="margin-left:50px;">{{button_content}}</el-button>
    <!-- <el-button type="primary" icon="el-icon-edit" @click="modify_para"  :disabled="modify_state" style="margin-left:50px;" round>参数修改</el-button> -->
    <el-button type="primary" icon="el-icon-edit" @click="modify_para_new"   style="margin-left:50px;" round>参数修改</el-button>
  </div>    
  <br>

 
    
     
<div id='mainbox'>
  <div class="column">
      <div id='myChart3' slot="reference"  style="margin-top:0px;"> </div>
  </div>
  <div class="column">
      <div id='myChart4' slot="reference" style="margin-top:0px;"></div>
  </div>
 </div>
 <el-form ref="form" class="ItemInfo" :model="equipment_info" label-width="80px" :inline="true">
 <h4 style="margin-top:30px;"><strong>单日数据指标</strong></h4>
<el-form-item class="ItemInfoTime" style="margin-left:10px;">
<download-excel
      :fields = "json_fields"
      :data="tableData1"
      :before-generate = "startDownload"
      :before-finish = "finishDownload"
      name="listdata.xls"
      type="xls">
      <el-button  >当前页导出Excel</el-button>
    </download-excel>
    </el-form-item>
 <el-button   type="primary" @click="download" >当前页显示全部筛选数据</el-button>
 </el-form>
        <el-table
      :data="tableData1" :cell-style="tableRowClassName1" border style="width: 100%  ">
       <el-table-column  type="index"  align="center" width='60px' label="序号" :index="indexMethod"></el-table-column>
      <el-table-column  prop="start_time"        align="center" label="开始时间"></el-table-column>
      <el-table-column  prop="end_time"          align="center" label="结束时间"></el-table-column>
    
        <el-table-column
        prop="water_pattern"
        label="水流量模式"
       >
      </el-table-column>
        <el-table-column
        prop="temp_pattern"
        label="温度模式"
       >
       </el-table-column>
      <el-table-column  prop="water_score"       align="center" label="水流量评分"></el-table-column>
      <el-table-column  prop="temp_score"        align="center" label="温度评分"></el-table-column>
      <el-table-column  prop="new_temp_score"    align="center" label="新温度评分"></el-table-column>
      <el-table-column  prop="heat_temp_score"   align="center" label="加热段评分"></el-table-column>
      <el-table-column  prop="stable_temp_score" align="center" label="恒温段评分"></el-table-column>
      
      <el-table-column
        label="片段运行详情"
        align="center">
        <template slot-scope="scope">
        <el-button
          @click="Openchart(scope.row)"
          type="text"
          size="small"
          align="left">
          片段运行详情
        </el-button>
      </template>
    </el-table-column>    
    </el-table>
 <el-dialog :visible="drawer" show-close center @close='closeDialog' fullscreen >
          <h4 style="margin-top:0px;margin-left:0px;" align="center">{{city}}{{" "}}{{" "}}燃气热水器片段运行状态{{" "}}{{" "}}{{type}}</h4>
        <div id='myChart' ></div>
        <div align="center">
  <el-table :data="tableData2" border  :cell-style="tableRowClassName1" style="width: 100%;margin-left:0px;margin-top:0px;">
      <el-table-column
        prop="start_time"
        label="开始时间"
        width='150px'
        >
      </el-table-column>
      <el-table-column
        prop="end_time"
        label="结束时间"
        width='150px'
       >
      </el-table-column>
        <el-table-column
        prop="water_pattern"
        label="水流量模式"
       >
      </el-table-column>
        <el-table-column
        prop="temp_pattern"
        label="温度模式"
       >
         </el-table-column>
      <el-table-column
        prop="duration_time"
        label="用水持续时间"
        >
      </el-table-column>
      <el-table-column
        prop="flow_avg"
        label="平均水流量"
        >
      </el-table-column>
      <el-table-column
        prop="small_water"
        label="小水流量标志位"
       >
      </el-table-column>
      <el-table-column
        prop="deviation"
        label="水流量标准差"
        >
      </el-table-column>
      <el-table-column
        prop="up_number"
        label="水流量向上突变次数"
       >
      </el-table-column>
      <el-table-column
        prop="down_number"
        label="水流量向下突变次数"
        >
      </el-table-column>
      <el-table-column
        prop="heat_duration"
        label="升温持续时长"
        >
      </el-table-column>
      <el-table-column
        prop="un_stable_temp_duration"
        label="不恒温时长"
        >
      </el-table-column>
      <el-table-column
        prop="un_stable_temp_percent"
        label="不恒温占比"
        >
      </el-table-column>
      <el-table-column
        prop="un_heat_dev"
        label="温度标准差"
        >
      </el-table-column>
      <el-table-column
        prop="overshoot_value"
        label="超调值"
        >
      </el-table-column>
      <el-table-column
        prop="state_accuracy"
        label="恒温准确度"
        >
      </el-table-column>
      <el-table-column
        prop="temp_judge_flag"
        label="水流对温度有无影响"
        >
      </el-table-column>
      <!-- <el-table-column
        prop="water_flag"
        label="水流标志位"
        >
      </el-table-column>
      <el-table-column
        prop="temp_flag"
        label="温度标志位"
        >
      </el-table-column>
      <el-table-column
        prop="abnormal_state"
        label="正常恒温"
       >
      </el-table-column> -->

        </el-table>
        </div>

</el-dialog>

<el-dialog title="参数优化" :visible.sync="outerVisible"  show-close center @close='closeDialog' fullscreen>
        <el-container class="dialogDiv">
            <el-header><h5>设备:{{applianceid_temp}}</h5> </el-header>
                <el-main>
                    <el-tabs v-model="activeName" @tab-click="handleClick" >
                        <el-tab-pane label="改写恒温算法2.0相关数据设置默认参数信息" name="first">
                            <el-radio-group v-model="duanma_list" style="margin-left:20px;width:200px；display:inline" @change="duanma_select">
                                <el-radio-button label="段序号0"></el-radio-button>
                                <el-radio-button label="段序号1"></el-radio-button>
                                <el-radio-button label="段序号2"></el-radio-button>
                                <el-radio-button label="段序号3"></el-radio-button>
                            </el-radio-group>
                            <el-table
                            :data="tableData_para_temp_look"
                            size="large"
                            style="width: 100%"
                            @cell-mouse-enter="handleCellEnter"
                            @cell-mouse-leave="handleCellLeave"
                            height="500"
                            >
                                <el-table-column
                                    prop="para_name"
                                    label="参数名称"
                                    width="180">
                                </el-table-column>
                                <!-- <el-table-column
                                prop="default_value"
                                label="默认参数"
                                width="180">
                                <template slot-scope="scope">
                                    <div  class="txt">0X{{scope.row.default_value}}</div>
                                </template>
                            </el-table-column> -->
                                <el-table-column
                                    prop="recent_date"
                                    label="当前值"
                                    width="180">
                                    <template slot-scope="scope1_1">
                                        <div  class="txt">0X{{scope1_1.row.recent_date}}</div>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="advice_date"
                                    label="建议值"
                                    width="180">
                                    <template slot-scope="scope1_2">
                                        <div  class="txt">0X{{scope1_2.row.advice_date}}</div>
                                    </template>
                                </el-table-column>

                                <el-table-column
                                    prop="modify_date"
                                    label="修改值"
                                    width="180">
                                    <template slot-scope="scope">
                                        <el-input v-if="scope.row.isEdit" class="item" v-model="scope.row.modify_date" placeholder="请输入内容"></el-input>
                                        <div v-else class="txt">0X{{scope.row.modify_date}}</div>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                prop="limit_data"
                                label="取值范围"
                                width="180">
                                <!-- <template slot="header" slot-scope="scope">
                                    <el-button type="primary" icon="el-icon-search" size="small" plain @click="change_scale">进制转化</el-button>
                                </template> -->
                            </el-table-column>
                                <el-table-column
                                    label="修改记录"
                                    align="center">
                                    <template slot-scope="scope">
                                        <el-button
                                        @click="para_history(scope.row)"
                                        type="text"
                                        size="small"
                                        align="left">
                                            修改历史
                                        </el-button>
                                    </template>
                                </el-table-column>  
                            </el-table>
                        </el-tab-pane>
                        <el-tab-pane label="改写非调试模式参数第一组" name="third">
                            <el-table
                            :data="tableData_para_un_1"
                            size="large"
                            style="width: 100%"
                            @cell-mouse-enter="handleCellEnter"
                            @cell-mouse-leave="handleCellLeave"
                            height="500"
                            >
                                <el-table-column
                                    prop="para_name"
                                    label="参数名称"
                                    width="180">
                                </el-table-column>
                                <!-- <el-table-column
                                prop="default_value"
                                label="默认参数"
                                width="180">
                                <template slot-scope="scope">
                                    <div  class="txt">0X{{scope.row.default_value}}</div>
                                </template>
                                </el-table-column> -->
                                <el-table-column
                                    prop="recent_date"
                                    label="当前值"
                                    width="180">
                                    <template slot-scope="scope2_1">
                                        <div  class="txt">0X{{scope2_1.row.recent_date}}</div>
                                    </template>
                                </el-table-column>

                                <el-table-column
                                    prop="advice_date"
                                    label="建议值"
                                    width="180">
                                    <template slot-scope="scope2_2">
                                        <div  class="txt">0X{{scope2_2.row.advice_date}}</div>
                                    </template>
                                </el-table-column>

                                <el-table-column
                                    prop="modify_date"
                                    label="修改值"
                                    width="180">
                                    <template slot-scope="scope_1">
                                    <el-input v-if="scope_1.row.isEdit" class="item" v-model="scope_1.row.modify_date" placeholder="请输入内容"></el-input>
                                    <div v-else class="txt">0X{{scope_1.row.modify_date}}</div>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                prop="limit_data"
                                label="取值范围"
                                width="180">
                                <!-- <template slot="header" slot-scope="scope">
                                    <el-button type="primary" icon="el-icon-search" size="small" plain @click="change_scale">进制转化</el-button>
                                </template> -->
                            </el-table-column>
                                <el-table-column
                                    label="修改记录"
                                    align="center">
                                    <template slot-scope="scope">
                                        <el-button
                                        @click="para_history(scope.row)"
                                        type="text"
                                        size="small"
                                        align="left">
                                            修改历史
                                        </el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-tab-pane>
                        <el-tab-pane label="改写非调试模式参数第二组" name="fourth">
                            <el-table
                            :data="tableData_para_un_2"
                            size="large"
                            style="width: 100%"
                            @cell-mouse-enter="handleCellEnter"
                            @cell-mouse-leave="handleCellLeave"
                            height="500"
                            >
                                <el-table-column
                                    prop="para_name"
                                    label="参数名称"
                                    width="180">
                                </el-table-column>
                                <!-- <el-table-column
                                prop="default_value"
                                label="默认参数"
                                width="180">
                                <template slot-scope="scope">
                                    <div  class="txt">0X{{scope.row.default_value}}</div>
                                </template>
                                </el-table-column> -->
                                <el-table-column
                                    prop="recent_date"
                                    label="当前值"
                                    width="180">
                                    <template slot-scope="scope3_1">
                                        <div  class="txt">0X{{scope3_1.row.recent_date}}</div>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="advice_date"
                                    label="建议值"
                                    width="180">
                                    <template slot-scope="scope3_2">
                                        <div  class="txt">0X{{scope3_2.row.advice_date}}</div>
                                    </template>
                                </el-table-column>

                                <el-table-column
                                    prop="modify_date"
                                    label="修改值"
                                    width="180">
                                    <template slot-scope="scope_2">
                                    <el-input v-if="scope_2.row.isEdit" class="item" v-model="scope_2.row.modify_date" placeholder="请输入内容"></el-input>
                                    <div v-else class="txt">0X{{scope_2.row.modify_date}}</div>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                prop="limit_data"
                                label="取值范围"
                                width="180">
                                <!-- <template slot="header" slot-scope="scope">
                                    <el-button type="primary" icon="el-icon-search" size="small" plain @click="change_scale">进制转化</el-button>
                                </template> -->
                            </el-table-column>
                                <el-table-column
                                    label="修改记录"
                                    align="center">
                                    <template slot-scope="scope">
                                        <el-button
                                        @click="para_history(scope.row)"
                                        type="text"
                                        size="small"
                                        align="left">
                                            修改历史
                                        </el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-tab-pane>
                        <el-tab-pane label="改写总参数" name="fifth">
                            <el-table
                            :data="tableData_para_single"
                            size="large"
                            style="width: 100%"
                            @cell-mouse-enter="handleCellEnter"
                            @cell-mouse-leave="handleCellLeave"
                            height="500"
                            >
                                <el-table-column
                                    prop="para_name"
                                    label="参数名称"
                                    width="180">
                                </el-table-column>
                                <!-- <el-table-column
                                prop="default_value"
                                label="默认参数"
                                width="180">
                                <template slot-scope="scope">
                                    <div  class="txt">0X{{scope.row.default_value}}</div>
                                </template>
                                </el-table-column> -->
                                <el-table-column
                                    prop="recent_date"
                                    label="当前值"
                                    width="180">
                                    <template slot-scope="scope5_1">
                                        <div  class="txt">0X{{scope5_1.row.recent_date}}</div>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="advice_date"
                                    label="建议值"
                                    width="180">
                                    <template slot-scope="scope5_2">
                                        <div  class="txt">0X{{scope5_2.row.advice_date}}</div>
                                    </template>
                                </el-table-column>

                                <el-table-column
                                    prop="modify_date"
                                    label="修改值"
                                    width="180">
                                    <template slot-scope="scope_2">
                                    <el-input v-if="scope_2.row.isEdit" class="item" v-model="scope_2.row.modify_date" placeholder="请输入内容"></el-input>
                                    <div v-else class="txt">0X{{scope_2.row.modify_date}}</div>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                prop="limit_data"
                                label="取值范围"
                                width="180">
                                <!-- <template slot="header" slot-scope="scope">
                                    <el-button type="primary" icon="el-icon-search" size="small" plain @click="change_scale">进制转化</el-button>
                                </template> -->
                            </el-table-column>
                                <el-table-column
                                    label="修改记录"
                                    align="center">
                                    <template slot-scope="scope">
                                        <el-button
                                        @click="para_history(scope.row)"
                                        type="text"
                                        size="small"
                                        align="left">
                                            修改历史
                                        </el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-tab-pane>
                        <el-tab-pane label="单个参数修改" name="second">
                            <el-table
                            :data="tableData_para_single_look"
                            size="large"
                            style="width: 100%"
                            @cell-mouse-enter="handleCellEnter"
                            @cell-mouse-leave="handleCellLeave"
                            height="200"
                            >
                                <el-table-column
                                    prop="para_name"
                                    label="参数名称"
                                    width="180">
                                    <template slot-scope="scope">
                                        <el-select v-model="scope.row.para_name"  @change="getDatalist(value)" placeholder="请选择" filterable allow-create>
                                        <el-option v-for="item in single_para_list " :key="item.id" :label="item.label" :value="item.value">
                                        </el-option>
                                        </el-select>
                                    </template>

                                </el-table-column>
                                <!-- <el-table-column
                                prop="default_value"
                                label="默认参数"
                                width="180">
                                <template slot-scope="scope">
                                    <div  class="txt">0X{{scope.row.default_value}}</div>
                                </template>
                                </el-table-column> -->
                                <el-table-column
                                    prop="recent_date"
                                    label="当前值"
                                    width="180">
                                    <template slot-scope="scope4_1">
                                        <div  class="txt">0X{{scope4_1.row.recent_date}}</div>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="advice_date"
                                    label="建议值"
                                    width="180">
                                    <template slot-scope="scope4_2">
                                        <div  class="txt">0X{{scope4_2.row.advice_date}}</div>
                                    </template>
                                </el-table-column>

                                <el-table-column
                                    prop="modify_date"
                                    label="修改值"
                                    width="180">
                                    <template slot-scope="scope_3">
                                    <el-input v-if="scope_3.row.isEdit" class="item" v-model="scope_3.row.modify_date" placeholder="请输入内容"></el-input>
                                    <div v-else class="txt">0X{{scope_3.row.modify_date}}</div>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                prop="limit_data"
                                label="取值范围"
                                width="180">
                                <!-- <template slot="header" slot-scope="scope">
                                    <el-button type="primary" icon="el-icon-search" size="small" plain @click="change_scale">进制转化</el-button>
                                </template> -->
                            </el-table-column>
                                <el-table-column
                                    label="修改记录"
                                    align="center">
                                    <template slot-scope="scope">
                                        <el-button
                                        @click="para_history(scope.row)"
                                        type="text"
                                        size="small"
                                        align="left">
                                            修改历史
                                        </el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-tab-pane>
                    </el-tabs>
            </el-main>
        </el-container>

      <span slot="footer" class="dialog-footer">
           <el-button type="primary" style="margin-left:30px" size="large" :disabled="button_state_para" round @click="para_out">{{button_txt_para}}</el-button>
           <el-button type="primary" style="margin-left:30px" size="large" :disabled="button_state_para" round @click="para_out_default">{{button_txt_para_default}}</el-button>
      </span>
    </el-dialog>

 <el-dialog title="参数修改记录" :visible.sync="outerVisible_para_history"  show-close center @close='closeDialog' fullscreen>
        <el-container class="dialogDiv">
            <el-header><h5>设备:{{applianceid_temp}}</h5> </el-header>
                <el-main>
                     <el-table
                        :data="tableData_para_one_code"
                        size="large"
                        style="width: 100%"
                        @cell-mouse-enter="handleCellEnter"
                        @cell-mouse-leave="handleCellLeave"
                        height="500"
                        >
                            <el-table-column
                                prop="para_name"
                                label="参数名称"
                                width="180">
                            </el-table-column>
                            <el-table-column
                                prop="NEW_data"
                                label="修改后值"
                                width="180">
                                <template slot-scope="scope5_1">
                                    <div  class="txt">0X{{scope5_1.row.NEW_data}}</div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="OLD_data"
                                label="修改前值"
                                width="180">
                                <template slot-scope="scope5_2">
                                    <div  class="txt">0X{{scope5_2.row.OLD_data}}</div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="time_data"
                                label="修改时间"
                                width="180">
                                <template slot-scope="scope5_3">
                                    <div  class="txt">{{scope5_3.row.time_data}}</div>
                                </template>
                            </el-table-column>
                        </el-table>
                </el-main>
       </el-container>

    <span slot="footer" class="dialog-footer">
        
    </span>
</el-dialog>

  <el-pagination align="center"  v-if="this.downloadflag!=1"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      background="true"
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

<script>
import JsonExcel from 'vue-json-excel';
import echarts from 'echarts'
import request from '@/utils/request';
import Manager from "@/assets/js/test.js";
// var url="http://127.0.0.1:1016/api/"
var time1=[]   //用水片段的横坐标
var time2=[]   //一天的曲线横坐标
var time3=[]   //评分曲线的横坐标
var flow1=[]   //一天的曲线横坐标
var flame1=[]   //一天的曲线横坐标
var setTemp1=[]
var outTemp1=[]
var outTemp1=[]
var water_score=[]
var temp_score=[]
var new_temp_score=[]


export default {
   components: {
      'download-excel': JsonExcel
    }, 
  data() {
    return {
           json_fields: {

           '开始时间':'start_time',
           '结束时间':'end_time',
           '水流量模式':'water_pattern',
           '温度模式':'temp_pattern',
           '水流量评分':'water_score', 
             '温度得分': 'temp_score',
          '新温度得分':'new_temp_score',
           '加热段评分':'heat_temp_score',
 
          '恒温段评分': 'stable_temp_score',
           },
      //显示模式多选
      selectoptions: [{
        value: '1',
        label: '全部'
          
      }, {
        value: '11',
        label: '正常'
      }, {
        value: '0',
        label: '异常',
        children:[
          {
            value: '12',
            label: '加热正常+恒温异常',
          },
          {
            value: '21',
            label: '加热异常+恒温正常',
          },{
            value: '22',
            label: '加热异常+恒温异常',
          },{
            value: '13',
            label: '恒温熄火',
          },{
            value: '23',
            label: '加热异常+恒温熄火',
          }
        ]
      }],

      value:'11',

      //时间多选
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      },

      options:[],
      // value1:[],
      value2:[],
      value3: 109951162778761,
      // shebeikuang:"请选择设备",
      xinghao: [],
      shebei: [],
      perPage:25,// 每页显示条数
      currentPage: 1, // 当前页
      temp_currentPage: 1,
      total: 0, // 默认总条数
      timer_flag:null, //定时器
      timer_count:null,
      button_state:false,  //监控按钮是否禁用
      equipment_state:false,
      data_state:false,
      button_content:"监控",  //按钮内容
      downloadflag:0,
      //所有指标
      datatime: "", 
      datatime_history: "", 
      start_time:[],
      end_time:[],
      duration_time:'',
      water_pattern:'',
      flow_avg:'',
      small_water:'',
      deviation:'',
      up_number:'',
      down_number:'',
      water_score:'',
      heat_duration:'',
      un_stable_temp_duration:'',
      un_stable_temp_percent:'',
      un_heat_dev:'',
      temp_pattern:'',
      overshoot_value:'',
      state_accuracy:'',
      temp_score:'',
      new_temp_score:'',
      heat_temp_score:'',
      stable_temp_score:'',
      temp_judge_flag:'',
      water_flag:'',
      temp_flag:'',
      abnormal_state:'',

      //弹窗标志位
      flag1: false,
      flag:false,

      //数据与时间
      tableData:[],
      tableData1:[],  //单日数据指标
      tableData2:[],  //单日数据指标 未知？
      tableData3:[],  //不稳定段数据指标 未知？
      value4:[],    //时间函数

      //是否打开片段运行曲线

      drawer: false,
      outTemp:[],
      flow:[],
      setTemp:[],
      flame:[],

      //参数修改按钮标志
      modify_state: true,
      //修改界面显示标志
      outerVisible:false,
      //参数修改记录表格
      outerVisible_para_history:false,
      //换页参数处理
      endtime_temp:'',
      starttime_temp:'',
      applianceid_temp:'',
    //参数表格数据
    tableData_para_temp: [],

    tableData_para_temp_look: [],

    tableData_para_un_1:[],

    tableData_para_un_2:[],

    tableData_para_single_look:[{
        para_name: "",
    }],
    tableData_para_else: [],
    tableData_para_single:[],
    tableData_para_one_code:[],
    //参数修改类
    activeName: 'first',
    //段序号
    duanma_list:"段序号0",
    //单参数
    single_para_list: [],
    //按钮名称
    button_txt_para:"参数下发",
    button_txt_para_default: '一键下发默认参数',
    //按钮状态
    button_state_para: false,
    //信息获取状态
    para_table_data: false,
      // chooseTypeflag:false,
      // chooseTypetext:'可设备单选',
      // Timer:"",
      // TimerList:[],
      // getlist:0
    };
  },
  methods:{
    modify_para_new(){
        this.$confirm('设备信息查询是否需要开关机?', '提示', {
            distinguishCancelAndClose: true,
            confirmButtonText: '是',
            cancelButtonText: '否',
            type: 'warning'
        }).then(() => {
            let routeData = this.$router.resolve({
                path:'Para_Inquire_start',
                query: {
                equipment_ID: this.value3,
                }
                });
                window.open(routeData.href);
            
        }).catch((action) => {
            // console.log(action)
            if (action == 'close'){
                this.$message.info('已取消查询');
            } else {
                let routeData = this.$router.resolve({
                path:'Para_Inquire',
                query: {
                equipment_ID: this.value3,
                }
                });
                window.open(routeData.href);
            }
        });
    },
    drawscoreTable(){
      var chartDom = document.getElementById('myChart4');
      var myChart = echarts.init(chartDom);
      var option;
      option = {
        grid: {
          left: '10%',
          right: '15%',
          bottom: '10%'
        },
        legend:{data: [{name: '温度评分',textStyle: {color: 'red'}},
          {name: '新温度评分',textStyle: {color: 'green'}},
          {name: '水流量评分',textStyle: {color: 'blue'}}
        ],
        selected:{'温度评分':true,'新温度评分':false,'水流量':true}},
        dataZoom: {   
          start:0,
          end: 100,
          type:'inside'
        },
        toolbox: {
          show: true,
          feature: {
            dataZoom: {
              yAxisIndex: "none"
            },
            dataView: {
              readOnly: false
            },
            magicType: {
              type: ["line", "bar"]
            },
            restore: {},
            saveAsImage: {}
          }
        },
        title: {
          text:'评分曲线'
        },
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
        xAxis: {
          type: 'category',
          boundaryGap: false,
          name: '时间',
          data: time3,

        },
        yAxis: {
          type: 'value',
          name: '评分',
        },
        series: [
          {
            name:"温度评分",
            data:temp_score,
            type: 'line'
          },
          {
            name:"新温度评分",
            data:new_temp_score,
            type: 'line'
          },
          {
            name:"水流量评分",
            data:water_score,
            type: 'line'
          },
        ]
      };
      myChart.setOption(option,true);
      this.xData=[];
      this.charttemp_score=[];
      this.chartwater_score=[];
      this.chartnew_temp_score=[];
    },
    closeDialog(){
      this.drawer=false
    },
    Openchart(row){
      var v;
      var v1;
      const dt=new Date(row.start_time);
      const dt1=new Date(row.end_time);
      v=this.dateFormatmiao(dt);
      v1=this.dateFormatmiao(dt1);

      //默认时间显示当天
      request.post('timemonitor/page/list', null, {
        params:
        { 
          dev_id:this.value3,
          flag:"1",
          timeLow :v,    //时间范围
          timeHigh :v1
        },
      }).then(({ data: response }) => {
        console.log(response.data.data)
        time1 = response.data.data_time;
        console.log(response.data.data)
        console.log(response.data.data[i])
        //   console.log(this.flame);
        for(var i=0;i<time1.length;i++){

          this.flame[i]=Number(response.data.flame[i])*10
        }
        this.setTemp = response.data.set_temp;
        this.outTemp = response.data.out_temp;
        this.flow = response.data.flow;
        console.log(this.flow);
        //  console.log(this.$refs['cascaderAddr'].getCheckedNodes())
        //var name=this.$refs['cascaderAddr'].getCheckedNodes()
        //this.city=name[0].pathLabels[0]+name[0].pathLabels[1];
        // name=this.$refs['cascaderAddr1'].getCheckedNodes()
        this.type=" 设备："+this.value3;
        this.tableData2[0]={
          start_time:row.start_time,
          end_time:row.end_time,
          duration_time:row.duration_time,
          water_pattern:row.water_pattern,
          flow_avg:row.flow_avg,
          small_water:row.small_water,
          deviation:row.deviation,
          up_number:row.up_number,
          down_number:row.down_number,
          heat_duration:row.heat_duration,
          un_stable_temp_duration:row.un_stable_temp_duration,
          un_stable_temp_percent:row.un_stable_temp_percent,
          un_heat_dev:row.un_heat_dev,
          temp_pattern:row.temp_pattern,
          overshoot_value:row.overshoot_value,
          state_accuracy:row.state_accuracy,
          temp_judge_flag:row.temp_judge_flag,
          water_flag:row.water_flag,
          temp_flag:row.temp_flag,
          abnormal_state:row.abnormal_state,
        }
       
        console.log(this.tableData2[0])
        setTimeout(() => {
   
          this.drawTableFragment();
   
        }, 10);
        this. drawer=true
      }).catch((err) => {
        this.$message.error(err);
        console.log(err);
      });

    },

    drawTableFragment(){
      
      //   console.log(time1);

      const myCharts = this.$echarts.init(document.getElementById('myChart'));
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
                  type: 'solid' ,//'dotted'虚线 'solid'实线
                  color:"Lime",
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
                  type: 'solid' ,//'dotted'虚线 'solid'实线
                  color:"blue",
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
      myCharts.setOption(option,true);
      const _this = this;
  
      // 建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
      // window.addEventListener('resize', () => { myCharts.resize(); });
      
    },
    // 按时间段查询 一天的曲线



    drawTable(){
      const myChart = this.$echarts.init(document.getElementById('myChart3'));
      const option = {
        // backgroundColor: '#12cf96',//背景色
        title: {
          text: '燃气热水器运行状态',
        },
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
          selected:{'水流量':true,'出水温度':false,'设置温度':false,'火焰反馈':false}

        },
        ],
        dataZoom: {   
          start:0,
          end: 100,
          type:'inside'
        },

        grid: {
          left: '10%',
          right: '15%',
          bottom: '10%'
        },
        // 缩放操作
        toolbox: {
          show: true,
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
          data: time2,

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
          max:160,
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
            data: flow1,

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
            data: outTemp1,
            itemStyle: {      
              normal: {
                lineStyle: {
                  width: 2,
                  type: 'solid' ,//'dotted'虚线 'solid'实线
                  color:"Lime",
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
            data: setTemp1,
            itemStyle: {      
              normal: {
                lineStyle: {
                  width: 2,
                  type: 'solid' ,//'dotted'虚线 'solid'实线
                  color:"blue",
                }
              }
            },

          },  {
            name: '火焰反馈',
            yAxisIndex: 0,
            type: 'line',
            data: flame1,
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
    
      //console.log(error)
      myChart.setOption(option,true);
      const _this = this;
  
      // 建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
      // window.addEventListener('resize', () => { myChart.resize(); });
      
    },


    //详细时间精确到秒，用于用水片段运行曲线
    dateFormat:function(time) {
      var date=new Date(time);
      var year=date.getFullYear();
      var month= date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
      var day=date.getDate()<10 ? "0"+date.getDate() : date.getDate();
      var hours="00";
      var minutes="00";
      var seconds="00";
      //console.log(year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds)
      // 拼接 可改成自己所要的时间格式
      return year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;
    },
    //详细时间精确到秒，用于一天运行曲线

       
    getCurrentTime() {
      //获取当前时间并打印
      var _this = this;
      let yy = new Date().getFullYear();
      let mm = new Date().getMonth()+1<10 ? '0'+(new Date().getMonth()+1) : new Date().getMonth()+1;
      let dd = new Date().getDate()<10 ? '0'+new Date().getDate() : new Date().getDate();
      let hh = new Date().getHours()<10 ? '0'+new Date().getHours() : new Date().getHours();
      let mf = new Date().getMinutes()<10 ? '0'+new Date().getMinutes() : new Date().getMinutes();
      let ss = new Date().getSeconds()<10 ? '0'+new Date().getSeconds() : new Date().getSeconds();
      return yy+'-'+mm+'-'+dd+' '+hh+':'+mf+':'+ss;
    },
    //详细时间精确到秒，用于用水片段运行曲线
    dateFormatmiao:function(time) {
      var date=new Date(time);
      var year=date.getFullYear();
      var month= date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
      var day=date.getDate()<10 ? "0"+date.getDate() : date.getDate();
      var hours=date.getHours()<10 ? "0"+date.getHours() : date.getHours();
      var minutes=date.getMinutes()<10 ? "0"+date.getMinutes() : date.getMinutes();
      var seconds=date.getSeconds()<10 ? "0"+date.getSeconds() : date.getSeconds();
      //console.log(year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds)
      // 拼接 可改成自己所要的时间格式
      return year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;
    },
    modify_para(){
        
        console.log(this.para_table_data);
        if (this.para_table_data == true) { //数据获取成功
                
                // console.log(response.data.tableData_para_temp_out)
                //单参数修改
            request.post('timemonitor/EquipmentIndexMonitoring', null, {
            params:
            { 
                 dev_id: this.applianceid_temp,
            },
            }).then(({ data: response }) => {
                for (var i=0;i<response.data.tableData_para_single_out.length;i++) {
                    this.tableData_para_single[i] = {
                        para_name: response.data.tableData_para_single_out[i].para_name,
                        code     : response.data.tableData_para_single_out[i].code,
                        serial_number     :  response.data.tableData_para_single_out[i].serial_number,
                        advice_date:(response.data.tableData_para_single_out[i].advice_date).padStart(2,'0').toUpperCase(),
                        recent_date:(response.data.tableData_para_single_out[i].recent_date).padStart(2,'0').toUpperCase(),
                        modify_date: (response.data.tableData_para_single_out[i].modify_date).padStart(2,'0').toUpperCase(),
                        Min_limit: (response.data.tableData_para_single_out[i].Min_limit).padStart(2,'0').toUpperCase(),
                        Max_limit: (response.data.tableData_para_single_out[i].Max_limit).padStart(2,'0').toUpperCase(),
                        default_value: (response.data.tableData_para_single_out[i].default_value).padStart(2,'0').toUpperCase(),
                        limit_data : "0X"+(response.data.tableData_para_single_out[i].Min_limit).padStart(2,'0').toUpperCase() + "-"+"0X"+(response.data.tableData_para_single_out[i].Max_limit).padStart(2,'0').toUpperCase() ,
                        isEdit: false 
                    }
                    this.single_para_list[i]={
                        value:response.data.tableData_para_single_out[i].para_name,
                        label:response.data.tableData_para_single_out[i].para_name,
                    }
                
                }
                this.single_para_list=JSON.parse(JSON.stringify(this.single_para_list)); 
                this.tableData_para_single=JSON.parse(JSON.stringify(this.tableData_para_single)); 
                //参数恒温算法 两位 16进制 大写显示
                for (var i=0;i<response.data.tableData_para_temp_out.length;i++) {
                    this.tableData_para_temp[i] = {
                        para_name: response.data.tableData_para_temp_out[i].para_name,
                        code: response.data.tableData_para_temp_out[i].code,
                        advice_date:(response.data.tableData_para_temp_out[i].advice_date).padStart(2,'0').toUpperCase(),
                        recent_date:(response.data.tableData_para_temp_out[i].recent_date).padStart(2,'0').toUpperCase(),
                        modify_date: (response.data.tableData_para_temp_out[i].modify_date).padStart(2,'0').toUpperCase(),
                        default_value: (response.data.tableData_para_temp_out[i].default_value).padStart(2,'0').toUpperCase(),
                        Min_limit: (response.data.tableData_para_temp_out[i].Min_limit).padStart(2,'0').toUpperCase(),
                        Max_limit: (response.data.tableData_para_temp_out[i].Max_limit).padStart(2,'0').toUpperCase(),
                        isEdit: false 
                    }
                }
                this.tableData_para_temp=JSON.parse(JSON.stringify(this.tableData_para_temp)); 
                //非参数参数2
                for (var i=0;i<response.data.tableData_para_un_2_out.length;i++) {
                    this.tableData_para_un_2[i] = {
                        para_name: response.data.tableData_para_un_2_out[i].para_name,
                        code: response.data.tableData_para_un_2_out[i].code,
                        advice_date:(response.data.tableData_para_un_2_out[i].advice_date).padStart(2,'0').toUpperCase(),
                        recent_date:(response.data.tableData_para_un_2_out[i].recent_date).padStart(2,'0').toUpperCase(),
                        modify_date: (response.data.tableData_para_un_2_out[i].modify_date).padStart(2,'0').toUpperCase(),
                        default_value: (response.data.tableData_para_un_2_out[i].default_value).padStart(2,'0').toUpperCase(),
                        Min_limit: (response.data.tableData_para_un_2_out[i].Min_limit).padStart(2,'0').toUpperCase(),
                        Max_limit: (response.data.tableData_para_un_2_out[i].Max_limit).padStart(2,'0').toUpperCase(),
                        limit_data : "0X"+(response.data.tableData_para_un_2_out[i].Min_limit).padStart(2,'0').toUpperCase() + "-"+"0X"+(response.data.tableData_para_un_2_out[i].Max_limit).padStart(2,'0').toUpperCase(),
                        isEdit: false 
                    }
                }
                this.tableData_para_un_2=JSON.parse(JSON.stringify(this.tableData_para_un_2)); 
                //非参数恒温算法1
                for (var i=0;i<response.data.tableData_para_un_1_out.length;i++) {
                    this.tableData_para_un_1[i] = {
                        para_name: response.data.tableData_para_un_1_out[i].para_name,
                        code: response.data.tableData_para_un_1_out[i].code,
                        advice_date:(response.data.tableData_para_un_1_out[i].advice_date).padStart(2,'0').toUpperCase(),
                        recent_date:(response.data.tableData_para_un_1_out[i].recent_date).padStart(2,'0').toUpperCase(),
                        modify_date: (response.data.tableData_para_un_1_out[i].modify_date).padStart(2,'0').toUpperCase(),
                        default_value: (response.data.tableData_para_un_1_out[i].default_value).padStart(2,'0').toUpperCase(),
                        Min_limit: (response.data.tableData_para_un_1_out[i].Min_limit).padStart(2,'0').toUpperCase(),
                        Max_limit: (response.data.tableData_para_un_1_out[i].Max_limit).padStart(2,'0').toUpperCase(),
                        limit_data : "0X"+(response.data.tableData_para_un_1_out[i].Min_limit).padStart(2,'0').toUpperCase() + "-"+"0X"+(response.data.tableData_para_un_1_out[i].Max_limit).padStart(2,'0').toUpperCase() ,
                        isEdit: false 
                    }
                }
                this.tableData_para_un_1=JSON.parse(JSON.stringify(this.tableData_para_un_1)); 
                this.duanma_select();
                this.getDatalist();
            }).catch((err) => {
            
            });
            
            request.post('sentcmd/rewriteFind', null, {//该函数用于将修改标志全部置0
                params:
                { 
                    applianceid: this.applianceid_temp,
                },
            }).then(({ data: response }) => {
                
            }).catch((err) => {
            
            });

            this.outerVisible=true;
        }else if (this.para_table_data == false) {
            this.modify_state = true;
            request.post('sentcmd/querysetparameter', null, {
            params:
            { 
                applianceid: this.value3,
            },
            }).then(({ data: response }) => {

                //此处加入参数返回情况
                if (response.data.noparasettingoutcmd != null && response.data.parasettingoutcmd != null && response.data.suanfadataoutcmd != null ) {
                    this.para_table_data = true;//参数获取成功

                     this.$notify.error({
                        title: '成功',
                        message: '参数获取成功'
                    });

                    this.modify_state = false;//参数修改按钮可用
                } else {
                    this.$notify.error({
                        title: '错误',
                        message: '参数获取失败'
                    });
                    this.modify_state = false;//参数修改按钮可用
                }
                console.log(response.data)
            }).catch((err) => {
            
            });
        }
        
        
    },
    deal_timer(){
       this.downloadflag=0
      this.timer_count++;
      console.log(this.timer_count);

      const dt  = new Date();
      const dt1 = new Date();

      const dt2 = new Date();
      dt.setTime(dt.getTime());


      request.post('collection/page/getinfo',null,{
        params:{
        //Id    :  this.Id,   
	    	//Start_time:this.Start_time,
	    	//End_time : this.End_time   ,
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
          this.button_content = "监控";
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
          this.button_content = "监控";
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
          this.button_content = "监控";
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
          this.button_content = "监控";
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
        }else if (response.data.flag_state == "2"){//完成监控
          

          request.post('timemonitor/page/list', null, {
            params:
            { 
              flag:0,
              dev_id:this.value3,
              timeLow:this.value4[0],
              timeHigh:this.value4[1],
            },
          }).then(({ data: response }) => {
            this.total = response.data.total;

            for (var i=0;i<response.data.data.length;i++) {
              time3[2*i]=response.data.data[i].start_time;
              time3[2*i+1]=response.data.data[i].end_time;
              water_score[2*i]=response.data.water_score[i];
              water_score[2*i+1]=response.data.water_score[i];
              temp_score[2*i]=response.data.temp_score[i];
              temp_score[2*i+1]=response.data.temp_score[i];
              new_temp_score[2*i]=response.data.new_temp_score[i];
              new_temp_score[2*i+1]=response.data.new_temp_score[i];
            }
            time2 = response.data.data_time;  
            console.log(time2)
            // flame1 = response.data.flame;
            for(var i=0;i<response.data.flame.length;i++){
                flame1[i]=Number(response.data.flame[i])*10
            }
            //model1=response.data.model;
            //zone_id=response.data.zone_id;
            setTemp1 = response.data.set_temp;
            outTemp1 = response.data.out_temp;
            flow1 = response.data.flow;
            console.log(flow1 )
            //water_score=response.data.water_score;
            //temp_score=response.data.temp_score;
            console.log(temp_score)
            //new_temp_score=response.data.new_temp_score;

            for (var i=0;i<response.data.data.length;i++) {
            
            this.tableData1[i]={
              start_time: response.data.data[i].start_time,
              end_time: response.data.data[i].end_time,
              water_score: response.data.data[i].water_score,  
              temp_score: response.data.data[i].temp_score,
              new_temp_score: response.data.data[i].new_temp_score,
              heat_temp_score:response.data.data[i].heat_temp_score,
              stable_temp_score:response.data.data[i].stable_temp_score,
              duration_time:response.data.data[i].duration_time,
              water_pattern:response.data.data[i].water_pattern,
              flow_avg:response.data.data[i].flow_avg,
              small_water:response.data.data[i].small_water,
              deviation:response.data.data[i].deviation,
              up_number:response.data.data[i].up_number,
              down_number:response.data.data[i].down_number,
              heat_duration:response.data.data[i].heat_duration,
              un_stable_temp_duration:response.data.data[i].un_stable_temp_duration,
              un_stable_temp_percent:response.data.data[i].un_stable_temp_percent,
              un_heat_dev:response.data.data[i].un_heat_dev,
              temp_pattern:response.data.data[i].temp_pattern,
              overshoot_value:response.data.data[i].overshoot_value,
              state_accuracy:response.data.data[i].state_accuracy,
              temp_judge_flag:response.data.data[i].temp_judge_flag,
              water_flag:response.data.data[i].water_flag,
              temp_flag:response.data.data[i].temp_flag,
              abnormal_state:response.data.data[i].abnormal_state,
            
            }
            if(this.tableData1[i].water_pattern=="6"){
            this.tableData1[i].water_pattern="稳定模式"
            }else if(this.tableData1[i].water_pattern=="7"){
            this.tableData1[i].water_pattern="阶跃模式"
            }else if(this.tableData1[i].water_pattern=="8"){
                this.tableData1[i].water_pattern="震荡模式"
            }else{
            this.tableData1[i].water_pattern="无效片段"
            }
            if(this.tableData1[i].temp_pattern=="11"){
            this.tableData1[i].temp_pattern="恒温正常"
            }else if(this.tableData1[i].temp_pattern=="12"){
            this.tableData1[i].temp_pattern="恒温异常"
            }else if(this.tableData1[i].temp_pattern=="21"){
            this.tableData1[i].temp_pattern="加热异常"
            }else if(this.tableData1[i].temp_pattern=="22"){
            this.tableData1[i].temp_pattern="加热+恒温异常"
            }else if(this.tableData1[i].temp_pattern=="0"){
            this.tableData1[i].temp_pattern="无效片段"
            }else if(this.tableData1[i].temp_pattern=="13"){
            this.tableData1[i].temp_pattern="恒温熄火"
            }else if(this.tableData1[i].temp_pattern=="23"){
            this.tableData1[i].temp_pattern="加热异常、恒温熄火"
            }

          }
          
        //   this.total =this.tableData1.length
          console.log(this.tableData[1])
          console.log(this.tableData1)
          this.tableData=JSON.parse(JSON.stringify(this.tableData)); 
          this.tableData1=JSON.parse(JSON.stringify(this.tableData1)); 

            setTimeout(() => {
              this.drawTable();
              this.drawscoreTable();
            }, 200);
          }).catch((err) => {
            this.$message.error(err);
            console.log(err);
          });


          this.button_content = "监控";
          this.button_state = false;
          this.equipment_state = false;
          this.data_state = false;
          clearInterval(this.timer_flag)

          this.timer_flag = null
          this.timer_count = null
          this.currentPage=this.temp_currentPage
          this.$notify({
            title: '成功',
            message: '设备信息监控完成',
            type: 'success',
            duration: 3000,
          });

        }else{

        }
      }).catch((err) =>{

      })
    },
    para_out_default() { // 默认参数下发处理函数
    if ( this.activeName == "first" || this.activeName == "fifth") {
        this.$confirm('此操作将更改当前页所有参数为默认值, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            this.para_out_for_default();

        }).catch(() => {

            this.$message.info('已取消更改');
        });
    } else {
        this.$message.info('该组参数不支持该功能');
    }
    },
    duanma_select(){
        var num = 0;
        if (this.duanma_list == "段序号0") {
            num = 0;
        } else if (this.duanma_list== "段序号1") {
            num = 1;
        } else if (this.duanma_list =="段序号2") {
            num = 2;
        }else if (this.duanma_list =="段序号3") {
            num = 3;
        }
        console.log(this.tableData_para_temp.length/4)
        for (var i=0;i<((this.tableData_para_temp.length)/4);i++) {
            this.tableData_para_temp_look[i] = {
                para_name:   this.tableData_para_temp[4*i+num].para_name,
                advice_date: this.tableData_para_temp[4*i+num].advice_date,
                recent_date: this.tableData_para_temp[4*i+num].recent_date,
                modify_date: this.tableData_para_temp[4*i+num].modify_date,
                limit_data : "0X"+this.tableData_para_temp[4 * i + num].Min_limit + "-"+"0X"+this.tableData_para_temp[4 * i + num].Max_limit ,
                code: this.tableData_para_temp[4*i+num].code,
                default_value: this.tableData_para_temp[4 * i + num].default_value,
                isEdit: false 
            }
        }
        this.tableData_para_temp_look=JSON.parse(JSON.stringify(this.tableData_para_temp_look)); 
        

    },
    search1() {
      request.post('timemonitor/page/list', null, {
        params:
        { 
          flag:0,
          dev_id:this.value3,
          timeLow:"2021-12-01 + 00:00:00",
          timeHigh:this.value4,
        },
      }).then(({ data: response }) => {
        time2 = response.data.data_time;  
        console.log(time2)
        flame1 = response.data.flame;
        //model1=response.data.model;
        //zone_id=response.data.zone_id;
        setTemp1 = response.data.set_temp;
        outTemp1 = response.data.out_temp;
        flow1 = response.data.flow;
        console.log(flow1 )
        water_score=response.data.water_score;
        temp_score=response.data.temp_score;
        console.log(temp_score)
        new_temp_score=response.data.new_temp_score;
        setTimeout(() => {
          this.drawTable();
        }, 200);
      }).catch((err) => {
        this.$message.error(err);
        console.log(err);
      });
    },
    search(){
      this.tableData=[]
      this.tableData1=[]
      this.total=0

      const dt  = new Date();
      const dt1 = new Date();

      const dt2 = new Date();
      dt.setTime(dt.getTime());
      var time=this.datatime+" "+"00"+":"+"00"+":"+"00";
      var time1=this.datatime+" "+"23"+":"+"59"+":"+"59";

        console.log(time)
        console.log(time1)
      if (this.datatime==this.dateFormat(dt2)) {
        this.value4[0]=this.dateFormat(dt);  //今天的0点时间
        this.value4[1]=this.getCurrentTime(dt1);    

      }else{
        this.value4[0]=time;  //所选天的0点时间
        this.value4[1]=time1;//所选天的23：59：59

      }//默认时间显示当天

      if(this.value3==""||this.value4.length==0) { // 判断是否为空
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
        
        request.post('cleantasks/sigleapplicance', null, {
          params:
        { 
          applianceid: this.value3,
          starttime:this.value4[0],
          endtime :this.value4[1],
        },
        }).then(({ data: response }) => {
            
        }).catch((err) => {
        
        });
        
        this.tableData_para_temp =[]
        this.tableData_para_un_1 =[]
        this.tableData_para_un_2 =[]


        // 列表数据获取

        // this.para_table_data = false;
        // this.modify_state = true;
        // request.post('sentcmd/querysetparameter', null, {
        // params:
        // { 
        //   applianceid: this.value3,
        // },
        // }).then(({ data: response }) => {
        //     console.log(response)
        //     //此处加入参数返回情况
        //     if (response.data.noparasettingoutcmd != null && response.data.parasettingoutcmd != null && response.data.suanfadataoutcmd != null ) {
        //         this.para_table_data = true;

        //         this.modify_state = false;// 参数修改按钮可用
        //     } else {
        //         this.$notify.error({
        //         title: '失败',
        //         message: '该设备参数信息获取失败',
        //         });
        //         this.modify_state = false;// 参数修改按钮可用
        //     }
        //     console.log(response.data)
        // }).catch((err) => {
        
        // });

      }
      
    },
    para_history(row)
    {

    this.tableData_para_one_code = [];
         request.post('timemonitor/EquipmentHistoryMonitoring', null, {
        params:
        { 
          applianceid: this.applianceid_temp,
          code:row.code,
          single_flag: "1",
        },
        }).then(({ data: response }) => {
            console.log(response.data);
            if (response.data.tableData_para_one_code != null) {
                console.log(response.data.tableData_para_one_code.length)
                console.log(response)
                for (let i = 0; i < response.data.tableData_para_one_code.length; i += 1) {
                this.tableData_para_one_code[i] = {
                para_name: response.data.tableData_para_one_code[i].para_name,
                code: response.data.tableData_para_one_code[i].code,
                time_data: response.data.tableData_para_one_code[i].updatetime,
                OLD_data: (response.data.tableData_para_one_code[i].last_value).padStart(2,'0').toUpperCase(),
                NEW_data: (response.data.tableData_para_one_code[i].value).padStart(2,'0').toUpperCase(),
                latest_parameter_flag: response.data.tableData_para_one_code[i].latest_parameter_flag,
                }
            }
            this.outerVisible_para_history = true;
            this.tableData_para_one_code = JSON.parse(JSON.stringify(this.tableData_para_one_code));
            console.log(this.tableData_para_one_code);
            } else {
                this.$notify.error({
                title: '警告',
                message: '参数记录为空',
                duration: 1000,
                }); 
            }
        }).catch((err) => {
        
        });
        // this.datatime_history = this.datatime;
    },
//表格底色
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
        // console.log(row,column,row.column)
      },

    download(){
      this.downloadflag=1
       console.log(this.temp_currentPage);
       this.tableData1=[]
       this.total=0
        request.post('timemonitor/page/list', null, {
            params:
            { 
              downloadflag:this.downloadflag,
              perPage: this.perPage,
              // 切记此处的修改
              currentPage: this.temp_currentPage,// 用于页面显示处理

              flag: 2,
              dev_id:this.applianceid_temp,
              timeLow:this.starttime_temp,
              timeHigh:this.endtime_temp,
            },
          }).then(({ data: response }) => {
            this.total = response.data.total;
        for (var i=0;i<response.data.data.length;i++) {
            this.tableData1[i]={
              start_time: response.data.data[i].start_time,
              end_time: response.data.data[i].end_time,
              water_score: response.data.data[i].water_score,  
              temp_score: response.data.data[i].temp_score,
              new_temp_score: response.data.data[i].new_temp_score,
              heat_temp_score:response.data.data[i].heat_temp_score,
              stable_temp_score:response.data.data[i].stable_temp_score,
              duration_time:response.data.data[i].duration_time,
              water_pattern:response.data.data[i].water_pattern,
              flow_avg:response.data.data[i].flow_avg,
              small_water:response.data.data[i].small_water,
              deviation:response.data.data[i].deviation,
              up_number:response.data.data[i].up_number,
              down_number:response.data.data[i].down_number,
              heat_duration:response.data.data[i].heat_duration,
              un_stable_temp_duration:response.data.data[i].un_stable_temp_duration,
              un_stable_temp_percent:response.data.data[i].un_stable_temp_percent,
              un_heat_dev:response.data.data[i].un_heat_dev,
              temp_pattern:response.data.data[i].temp_pattern,
              overshoot_value:response.data.data[i].overshoot_value,
              state_accuracy:response.data.data[i].state_accuracy,
              temp_judge_flag:response.data.data[i].temp_judge_flag,
              water_flag:response.data.data[i].water_flag,
              temp_flag:response.data.data[i].temp_flag,
              abnormal_state:response.data.data[i].abnormal_state,
            
            }
            if(this.tableData1[i].water_pattern=="6"){
            this.tableData1[i].water_pattern="稳定模式"
            }else if(this.tableData1[i].water_pattern=="7"){
            this.tableData1[i].water_pattern="阶跃模式"
            }else if(this.tableData1[i].water_pattern=="8"){
                this.tableData1[i].water_pattern="震荡模式"
            }else{
            this.tableData1[i].water_pattern="无效片段"
            }
            if(this.tableData1[i].temp_pattern=="11"){
            this.tableData1[i].temp_pattern="恒温正常"
            }else if(this.tableData1[i].temp_pattern=="12"){
            this.tableData1[i].temp_pattern="恒温异常"
            }else if(this.tableData1[i].temp_pattern=="21"){
            this.tableData1[i].temp_pattern="加热异常"
            }else if(this.tableData1[i].temp_pattern=="22"){
            this.tableData1[i].temp_pattern="加热+恒温异常"
            }else if(this.tableData1[i].temp_pattern=="0"){
            this.tableData1[i].temp_pattern="无效片段"
            }else if(this.tableData1[i].temp_pattern=="13"){
            this.tableData1[i].temp_pattern="恒温熄火"
            }else if(this.tableData1[i].temp_pattern=="23"){
            this.tableData1[i].temp_pattern="加热异常、恒温熄火"
            }

        }
        
          this.tableData1=JSON.parse(JSON.stringify(this.tableData1)); 
          this.currentPage = this.temp_currentPage // 切记要加上保证页码正确 原因不知道

      }).catch((err) =>{

      })
    },


    handlepagechange(){
       this.downloadflag=0
       console.log(this.temp_currentPage);
       this.tableData1=[]
       this.total=0
        request.post('timemonitor/page/list', null, {
            params:
            { 
              perPage: this.perPage,
              // 切记此处的修改
              currentPage: this.temp_currentPage,// 用于页面显示处理

              flag: 2,
              dev_id:this.applianceid_temp,
              timeLow:this.starttime_temp,
              timeHigh:this.endtime_temp,
            },
          }).then(({ data: response }) => {
            this.total = response.data.total;
        for (var i=0;i<response.data.data.length;i++) {
            this.tableData1[i]={
              start_time: response.data.data[i].start_time,
              end_time: response.data.data[i].end_time,
              water_score: response.data.data[i].water_score,  
              temp_score: response.data.data[i].temp_score,
              new_temp_score: response.data.data[i].new_temp_score,
              heat_temp_score:response.data.data[i].heat_temp_score,
              stable_temp_score:response.data.data[i].stable_temp_score,
              duration_time:response.data.data[i].duration_time,
              water_pattern:response.data.data[i].water_pattern,
              flow_avg:response.data.data[i].flow_avg,
              small_water:response.data.data[i].small_water,
              deviation:response.data.data[i].deviation,
              up_number:response.data.data[i].up_number,
              down_number:response.data.data[i].down_number,
              heat_duration:response.data.data[i].heat_duration,
              un_stable_temp_duration:response.data.data[i].un_stable_temp_duration,
              un_stable_temp_percent:response.data.data[i].un_stable_temp_percent,
              un_heat_dev:response.data.data[i].un_heat_dev,
              temp_pattern:response.data.data[i].temp_pattern,
              overshoot_value:response.data.data[i].overshoot_value,
              state_accuracy:response.data.data[i].state_accuracy,
              temp_judge_flag:response.data.data[i].temp_judge_flag,
              water_flag:response.data.data[i].water_flag,
              temp_flag:response.data.data[i].temp_flag,
              abnormal_state:response.data.data[i].abnormal_state,
            
            }
            if(this.tableData1[i].water_pattern=="6"){
            this.tableData1[i].water_pattern="稳定模式"
            }else if(this.tableData1[i].water_pattern=="7"){
            this.tableData1[i].water_pattern="阶跃模式"
            }else if(this.tableData1[i].water_pattern=="8"){
                this.tableData1[i].water_pattern="震荡模式"
            }else{
            this.tableData1[i].water_pattern="无效片段"
            }
            if(this.tableData1[i].temp_pattern=="11"){
            this.tableData1[i].temp_pattern="恒温正常"
            }else if(this.tableData1[i].temp_pattern=="12"){
            this.tableData1[i].temp_pattern="恒温异常"
            }else if(this.tableData1[i].temp_pattern=="21"){
            this.tableData1[i].temp_pattern="加热异常"
            }else if(this.tableData1[i].temp_pattern=="22"){
            this.tableData1[i].temp_pattern="加热+恒温异常"
            }else if(this.tableData1[i].temp_pattern=="0"){
            this.tableData1[i].temp_pattern="无效片段"
            }else if(this.tableData1[i].temp_pattern=="13"){
            this.tableData1[i].temp_pattern="恒温熄火"
            }else if(this.tableData1[i].temp_pattern=="23"){
            this.tableData1[i].temp_pattern="加热异常、恒温熄火"
            }

        }
        
          this.tableData1=JSON.parse(JSON.stringify(this.tableData1)); 
          this.currentPage = this.temp_currentPage // 切记要加上保证页码正确 原因不知道

      }).catch((err) =>{

      })
    },
    //参数下发
    para_out()
    {
        request.post('timemonitor/EquipmentRewriteFlag', null, {//该函数用于查询参数是否修改过
          params:
        { 
          applianceid: this.applianceid_temp,
        },
        }).then(({ data: response }) => {
            if (response.data.RewriteSuccessFlag == 1) {
                this.$alert('修改设备参数过程中 该设备参数已被他人修改 请刷新当前数据', '错误', {
                    confirmButtonText: '刷新',
                });
                this.modify_para();
            }else if (response.data.RewriteSuccessFlag == 0) {
                this.para_table_data = false;
                //改写非调试模式参数第一组

                //暂时不要请求该函数
                if (this.activeName == "third") {
                    request.post('sentcmd/updatenobedugparafirstcmd', null, {
                    params:
                    { 
                        applianceid:        this.applianceid_temp,
                        rewaterflow:        (this.tableData_para_un_1[0].modify_date).padStart(2,'0').toLowerCase(),
                        windpressuresensor: (this.tableData_para_un_1[1].modify_date).padStart(2,'0').toLowerCase(),
                    },
                    }).then(({ data: response }) => {
                        if (response.data.errflag == "2") {

                            this.button_txt_para = "参数下发";

                            this.button_state_para = false;

                            clearInterval(this.timer_flag_para)

                            this.timer_flag_para = null

                            this.$alert('非调试模式参数第一组中存在非法输入 请修改格式', '失败', {
                                confirmButtonText: '确定',
                            });

                            this.para_table_data = true;

                            this.modify_para();
                            // this.outerVisible=false;
                        }else if (response.data.errflag == "3") {

                            this.button_txt_para = "参数下发";

                            this.button_state_para = false;

                            clearInterval(this.timer_flag_para)

                            this.timer_flag_para = null

                            this.$alert('非调试模式参数第一组中下发失败 改写参数与返回参数不同请再次尝试', '失败', {
                                confirmButtonText: '确定',
                            });

                            this.para_table_data = true;
                            
                            this.modify_para();
                            // this.outerVisible=false;
                        }else if (response.data.errflag == "4") {

                            this.button_txt_para = "参数下发";

                            this.button_state_para = false;

                            clearInterval(this.timer_flag_para)

                            this.timer_flag_para = null

                            this.$alert('非调试模式参数第一组中输入超出范围', '失败', {
                                confirmButtonText: '确定',
                            });

                            this.para_table_data = true;
                            
                            this.modify_para();
                            // this.outerVisible=false;
                        }else if (response.data.outcmd != null)  {
                            this.para_table_data = true;
                        }
                    }).catch((err) => {
                    
                    });
                }

                //改写非调试模式参数第二组
                if (this.activeName == "fourth") {
                    //暂时不要请求该函数
                    request.post('sentcmd/rewritenodebugsecondcmd', null, {
                    params:
                    { 
                        applianceid:     this.applianceid_temp,
                        maxcurrcoeff:    (this.tableData_para_un_2[0].modify_date).padStart(2,'0').toLowerCase(),
                        mincurrcoeff:    (this.tableData_para_un_2[1].modify_date).padStart(2,'0').toLowerCase(),
                        maxdutycyccoeff: (this.tableData_para_un_2[2].modify_date).padStart(2,'0').toLowerCase(),
                        mindutycyccoeff: (this.tableData_para_un_2[3].modify_date).padStart(2,'0').toLowerCase(),
                    },
                    }).then(({ data: response }) => {
                        console.log(response)
                         if (response.data.errflag == "2") {

                            this.button_txt_para = "参数下发";

                            this.button_state_para = false;

                            clearInterval(this.timer_flag_para)

                            this.timer_flag_para = null

                            this.$alert('非调试模式参数第二组中存在非法输入 请修改格式', '失败', {
                                confirmButtonText: '确定',
                            });

                            this.para_table_data = true;

                            this.modify_para();
                            // this.outerVisible=false;
                        }else if (response.data.errflag == "3") {

                            this.button_txt_para = "参数下发";

                            this.button_state_para = false;

                            clearInterval(this.timer_flag_para)

                            this.timer_flag_para = null

                            this.$alert('非调试模式参数第二组中下发失败 改写参数与返回参数不同请再次尝试', '失败', {
                                confirmButtonText: '确定',
                            });

                            this.para_table_data = true;
                            
                            this.modify_para();
                            // this.outerVisible=false;
                        }else if (response.data.errflag == "4") {

                            this.button_txt_para = "参数下发";

                            this.button_state_para = false;

                            clearInterval(this.timer_flag_para)

                            this.timer_flag_para = null

                            this.$alert('非调试模式参数第二组中输入超出范围', '失败', {
                                confirmButtonText: '确定',
                            });

                            this.para_table_data = true;
                            
                            this.modify_para();
                            // this.outerVisible=false;
                        }else if (response.data.outcmd != null)  {
                            this.para_table_data = true;
                        }
                    }).catch((err) => {
                    
                    });
                }
                //改写恒温算法相关数据
                if (this.activeName == "first") {
                    var num = '0';
                    if (this.duanma_list == "段序号0") {
                        num = '00';
                    } else if (this.duanma_list== "段序号1") {
                        num = '01';
                    } else if (this.duanma_list =="段序号2") {
                        num = '02';
                    }else if (this.duanma_list =="段序号3") {
                        num = '03';
                    }

                    //暂时不要请求该函数
                    request.post('sentcmd/rewriteQueryParaSettingCmd', null, {
                    params:
                    { 
                        applianceid:    this.applianceid_temp,
                        segment:        num,
                        ka:             (this.tableData_para_temp_look[0].modify_date).padStart(2,'0').toLowerCase(),
                        kb:             (this.tableData_para_temp_look[1].modify_date).padStart(2,'0').toLowerCase(),
                        kc:             (this.tableData_para_temp_look[2].modify_date).padStart(2,'0').toLowerCase(),
                        kf:             (this.tableData_para_temp_look[3].modify_date).padStart(2,'0').toLowerCase(),
                        T1a:            (this.tableData_para_temp_look[4].modify_date).padStart(2,'0').toLowerCase(),
                        T1c:            (this.tableData_para_temp_look[5].modify_date).padStart(2,'0').toLowerCase(),
                        T2a:            (this.tableData_para_temp_look[6].modify_date).padStart(2,'0').toLowerCase(),
                        T2c:            (this.tableData_para_temp_look[7].modify_date).padStart(2,'0').toLowerCase(),
                        Tda:            (this.tableData_para_temp_look[8].modify_date).padStart(2,'0').toLowerCase(),
                        Tdc:            (this.tableData_para_temp_look[9].modify_date).padStart(2,'0').toLowerCase(),
                        Wc:             (this.tableData_para_temp_look[10].modify_date).padStart(2,'0').toLowerCase(),
                        Wo:             (this.tableData_para_temp_look[11].modify_date).padStart(2,'0').toLowerCase(),
                    },
                    }).then(({ data: response }) => {
                         if (response.data.errflag == "2") {

                            this.button_txt_para = "参数下发";

                            this.button_state_para = false;

                            clearInterval(this.timer_flag_para)

                            this.timer_flag_para = null

                            this.$alert('恒温算法相关数据中存在非法输入 请修改格式', '失败', {
                                confirmButtonText: '确定',
                            });

                            this.para_table_data = true;

                            this.modify_para();
                            // this.outerVisible=false;
                        }else if (response.data.errflag == "3") {

                            this.button_txt_para = "参数下发";

                            this.button_state_para = false;

                            clearInterval(this.timer_flag_para)

                            this.timer_flag_para = null

                            this.$alert('恒温算法相关数据中下发失败 改写参数与返回参数不同请再次尝试', '失败', {
                                confirmButtonText: '确定',
                            });

                            this.para_table_data = true;

                            this.modify_para();
                            // this.outerVisible=false;
                        }else if (response.data.errflag == "4") {

                            this.button_txt_para = "参数下发";

                            this.button_state_para = false;

                            clearInterval(this.timer_flag_para)

                            this.timer_flag_para = null

                            this.$alert('恒温算法相关数据中输入超出范围', '失败', {
                                confirmButtonText: '确定',
                            });

                            this.para_table_data = true;

                            this.modify_para();
                            // this.outerVisible=false;
                        }else if (response.data.outcmd != null)  {
                            this.para_table_data = true;
                        }
                    }).catch((err) => {
                    
                    });
                }
                //单独改写参数
                
                //暂时不要请求该函数
                if ( this.tableData_para_single_look[0].modify_date != null && this.activeName == "second") {
                    request.post('sentcmd/rewritesingleparacmd', null, {
                    params:
                    { 
                        applianceid:    this.applianceid_temp,
                        index:          (this.tableData_para_single_look[0].serial_number).padStart(2,'0').toLowerCase(),
                        singlemin:      this.tableData_para_single_look[0].singlemin,
                        singlemax:      this.tableData_para_single_look[0].singlemax,
                        value:          (this.tableData_para_single_look[0].modify_date).padStart(2,'0').toLowerCase(),
                    },
                    }).then(({ data: response }) => {
                        if (response.data.errflag == "2") {

                        this.button_txt_para = "参数下发";

                        this.button_state_para = false;

                        clearInterval(this.timer_flag_para)

                        this.timer_flag_para = null

                        this.$alert('单独改写参数中存在非法输入 请修改格式', '失败', {
                            confirmButtonText: '确定',
                        });

                        this.para_table_data = true;

                        this.modify_para();
                        // this.outerVisible=false;
                    }else if (response.data.errflag == "3") {

                        this.button_txt_para = "参数下发";

                        this.button_state_para = false;

                        clearInterval(this.timer_flag_para)

                        this.timer_flag_para = null

                        this.$alert('单独改写参数中下发失败 改写参数与返回参数不同请再次尝试', '失败', {
                            confirmButtonText: '确定',
                        });

                        this.para_table_data = true;

                        this.modify_para();
                        // this.outerVisible=false;
                    }else if (response.data.errflag == "4") {

                        this.button_txt_para = "参数下发";

                        this.button_state_para = false;

                        clearInterval(this.timer_flag_para)

                        this.timer_flag_para = null

                        this.$alert('单独改写参数中输入超出范围', '失败', {
                            confirmButtonText: '确定',
                        });

                        this.para_table_data = true;

                        this.modify_para();
                        // this.outerVisible=false;
                    }else if (response.data.outcmd != null)  {
                            this.para_table_data = true;
                        }
                    }).catch((err) => {
                    
                    });     
                }
                if (this.activeName == "fifth") {
                    request.post('sentcmd/rewriteparametersettingcmd', null, {
                    params:
                    { 
                        applianceid:    this.applianceid_temp,
                        script:         "0a",
                        FA:             (this.tableData_para_single[0].modify_date).padStart(2,'0').toLowerCase(), 
	                    FF:             (this.tableData_para_single[1].modify_date).padStart(2,'0').toLowerCase(),
	                    PH:             (this.tableData_para_single[2].modify_date).padStart(2,'0').toLowerCase(),
	                    FH:             (this.tableData_para_single[3].modify_date).padStart(2,'0').toLowerCase(),
	                    PL:             (this.tableData_para_single[4].modify_date).padStart(2,'0').toLowerCase(),
	                    FL:             (this.tableData_para_single[5].modify_date).padStart(2,'0').toLowerCase(),
	                    dH:             (this.tableData_para_single[6].modify_date).padStart(2,'0').toLowerCase(),
	                    Fd:             (this.tableData_para_single[7].modify_date).padStart(2,'0').toLowerCase(),
	                    CH:             (this.tableData_para_single[8].modify_date).padStart(2,'0').toLowerCase(),
	                    FC:             (this.tableData_para_single[9].modify_date).padStart(2,'0').toLowerCase(),
	                    nE:             (this.tableData_para_single[10].modify_date).padStart(2,'0').toLowerCase(),
	                    CA:             (this.tableData_para_single[11].modify_date).padStart(2,'0').toLowerCase(),
	                    FP:             (this.tableData_para_single[12].modify_date).padStart(2,'0').toLowerCase(),
	                    HS:             (this.tableData_para_single[14].modify_date).padStart(2,'0').toLowerCase(),
	                    Hb:             (this.tableData_para_single[15].modify_date).padStart(2,'0').toLowerCase(),
	                    HE:             (this.tableData_para_single[16].modify_date).padStart(2,'0').toLowerCase(),
	                    HL:             (this.tableData_para_single[17].modify_date).padStart(2,'0').toLowerCase(),
	                    HU:             (this.tableData_para_single[18].modify_date).padStart(2,'0').toLowerCase(),
	                    Fn:             (this.tableData_para_single[21].modify_date).padStart(2,'0').toLowerCase(),
                    },
                    }).then(({ data: response }) => {
                        if (response.data.errflag == "2") {

                        this.button_txt_para = "参数下发";

                        this.button_state_para = false;

                        clearInterval(this.timer_flag_para)

                        this.timer_flag_para = null

                        this.$alert('多参数改写中存在非法输入 请修改格式', '失败', {
                            confirmButtonText: '确定',
                        });

                        this.para_table_data = true;

                        this.modify_para();
                        // this.outerVisible=false;
                        }else if (response.data.errflag == "3") {

                        this.button_txt_para = "参数下发";

                        this.button_state_para = false;

                        clearInterval(this.timer_flag_para)

                        this.timer_flag_para = null

                        this.$alert('多参数改写中下发失败 改写参数与返回参数不同请再次尝试', '失败', {
                            confirmButtonText: '确定',
                        });

                        this.para_table_data = true;

                        this.modify_para();
                        // this.outerVisible=false;
                        }else if (response.data.errflag == "4") {

                        this.button_txt_para = "参数下发";

                        this.button_state_para = false;

                        clearInterval(this.timer_flag_para)

                        this.timer_flag_para = null

                        this.$alert('多参数改写中输入超出范围', '失败', {
                            confirmButtonText: '确定',
                        });

                        this.para_table_data = true;

                        this.modify_para();
                        // this.outerVisible=false;
                        }else if (response.data.outcmd != null)  {
                            this.para_table_data = true;
                        }
                    }).catch((err) => {
                        
                    }); 
                }


                if(this.timer_flag_para == null) {
                    this.button_txt_para = "参数下发中..."
                    this.button_state_para = true

                    this.timer_flag_para = setInterval(this.deal_timer_para,1000) // 1秒执行一次deal_timer_para函数

                }
            }
        }).catch((err) => {
        
        });

        
       
    },
    deal_timer_para(){
            if (this.para_table_data == true) {

                this.button_txt_para = "参数下发";
                this.button_txt_para_default = "一键下发默认参数";
                this.button_state_para = false;

                clearInterval(this.timer_flag_para)

                this.timer_flag_para = null

                this.$alert('修改完成', '成功', {
                    confirmButtonText: '确定',
                });

                this.outerVisible=false;
                // this.modify_para();
            }
    
    },
    para_out_for_default()
    {
        request.post('timemonitor/EquipmentRewriteFlag', null, {//该函数用于查询参数是否修改过
        params:
        { 
          applianceid: this.applianceid_temp,
        },
        }).then(({ data: response }) => {
            if (response.data.RewriteSuccessFlag == 1) {
                this.$alert('修改设备参数过程中 该设备参数已被他人修改 请刷新当前数据', '错误', {
                    confirmButtonText: '刷新',
                });
                this.modify_para();
            }else if (response.data.RewriteSuccessFlag == 0) {
                this.para_table_data = false;
                //改写非调试模式参数第一组

                //暂时不要请求该函数
                if (this.activeName == "third") {
                    request.post('sentcmd/updatenobedugparafirstcmd', null, {
                    params:
                    { 
                        applianceid:        this.applianceid_temp,
                        rewaterflow:        (this.tableData_para_un_1[0].default_value ).padStart(2,'0').toLowerCase(),
                        windpressuresensor: (this.tableData_para_un_1[1].default_value ).padStart(2,'0').toLowerCase(),
                    },
                    }).then(({ data: response }) => {
                        if (response.data.errflag == "2") {

                            this.button_txt_para_default = "一键下发默认参数";
                            
                            this.button_state_para = false;

                            clearInterval(this.timer_flag_para)

                            this.timer_flag_para = null

                            this.$alert('非调试模式参数第一组中存在非法输入 请修改格式', '失败', {
                                confirmButtonText: '确定',
                            });

                            this.para_table_data = true;

                            this.modify_para();
                            // this.outerVisible=false;
                        }else if (response.data.errflag == "3") {

                            this.button_txt_para_default = "一键下发默认参数";

                            this.button_state_para = false;

                            clearInterval(this.timer_flag_para)

                            this.timer_flag_para = null

                            this.$alert('非调试模式参数第一组中下发失败 改写参数与返回参数不同请再次尝试', '失败', {
                                confirmButtonText: '确定',
                            });

                            this.para_table_data = true;
                            
                            this.modify_para();
                            // this.outerVisible=false;
                        }else if (response.data.errflag == "4") {

                            this.button_txt_para_default = "一键下发默认参数";

                            this.button_state_para = false;

                            clearInterval(this.timer_flag_para)

                            this.timer_flag_para = null

                            this.$alert('非调试模式参数第一组中输入超出范围', '失败', {
                                confirmButtonText: '确定',
                            });

                            this.para_table_data = true;
                            
                            this.modify_para();
                            // this.outerVisible=false;
                        }else if (response.data.outcmd != null)  {
                            this.para_table_data = true;
                        }
                    }).catch((err) => {
                    
                    });
                }

                //改写非调试模式参数第二组
                if (this.activeName == "fourth") {
                    //暂时不要请求该函数
                    request.post('sentcmd/rewritenodebugsecondcmd', null, {
                    params:
                    { 
                        applianceid:     this.applianceid_temp,
                        maxcurrcoeff:    (this.tableData_para_un_2[0].default_value).padStart(2,'0').toLowerCase(),
                        mincurrcoeff:    (this.tableData_para_un_2[1].default_value).padStart(2,'0').toLowerCase(),
                        maxdutycyccoeff: (this.tableData_para_un_2[2].default_value).padStart(2,'0').toLowerCase(),
                        mindutycyccoeff: (this.tableData_para_un_2[3].default_value).padStart(2,'0').toLowerCase(),
                    },
                    }).then(({ data: response }) => {
                        console.log(response)
                         if (response.data.errflag == "2") {

                            this.button_txt_para_default = "一键下发默认参数";

                            this.button_state_para = false;

                            clearInterval(this.timer_flag_para)

                            this.timer_flag_para = null

                            this.$alert('非调试模式参数第二组中存在非法输入 请修改格式', '失败', {
                                confirmButtonText: '确定',
                            });

                            this.para_table_data = true;

                            this.modify_para();
                            // this.outerVisible=false;
                        }else if (response.data.errflag == "3") {

                            this.button_txt_para_default = "一键下发默认参数";

                            this.button_state_para = false;

                            clearInterval(this.timer_flag_para)

                            this.timer_flag_para = null

                            this.$alert('非调试模式参数第二组中下发失败 改写参数与返回参数不同请再次尝试', '失败', {
                                confirmButtonText: '确定',
                            });

                            this.para_table_data = true;
                            
                            this.modify_para();
                            // this.outerVisible=false;
                        }else if (response.data.errflag == "4") {

                            this.button_txt_para_default = "一键下发默认参数";

                            this.button_state_para = false;

                            clearInterval(this.timer_flag_para)

                            this.timer_flag_para = null

                            this.$alert('非调试模式参数第二组中输入超出范围', '失败', {
                                confirmButtonText: '确定',
                            });

                            this.para_table_data = true;
                            
                            this.modify_para();
                            // this.outerVisible=false;
                        }else if (response.data.outcmd != null)  {
                            this.para_table_data = true;
                        }
                    }).catch((err) => {
                    
                    });
                }
                //改写恒温算法相关数据
                if (this.activeName == "first") {
                    var num = '0';
                    if (this.duanma_list == "段序号0") {
                        num = '00';
                    } else if (this.duanma_list== "段序号1") {
                        num = '01';
                    } else if (this.duanma_list =="段序号2") {
                        num = '02';
                    }else if (this.duanma_list =="段序号3") {
                        num = '03';
                    }

                    //暂时不要请求该函数
                    request.post('sentcmd/onekeyrescontempparacmd', null, {
                    params:
                    { 
                        applianceid:    this.applianceid_temp,
                        segment:        num,
                        // script:         "11",
                        ka:             (this.tableData_para_temp_look[0].recent_date).padStart(2,'0').toLowerCase(),
                        kb:             (this.tableData_para_temp_look[1].recent_date).padStart(2,'0').toLowerCase(),
                        kc:             (this.tableData_para_temp_look[2].recent_date).padStart(2,'0').toLowerCase(),
                        kf:             (this.tableData_para_temp_look[3].recent_date).padStart(2,'0').toLowerCase(),
                        T1a:            (this.tableData_para_temp_look[4].recent_date).padStart(2,'0').toLowerCase(),
                        T1c:            (this.tableData_para_temp_look[5].recent_date).padStart(2,'0').toLowerCase(),
                        T2a:            (this.tableData_para_temp_look[6].recent_date).padStart(2,'0').toLowerCase(),
                        T2c:            (this.tableData_para_temp_look[7].recent_date).padStart(2,'0').toLowerCase(),
                        Tda:            (this.tableData_para_temp_look[8].recent_date).padStart(2,'0').toLowerCase(),
                        Tdc:            (this.tableData_para_temp_look[9].recent_date).padStart(2,'0').toLowerCase(),
                        Wc:             (this.tableData_para_temp_look[10].recent_date).padStart(2,'0').toLowerCase(),
                        Wo:             (this.tableData_para_temp_look[11].recent_date).padStart(2,'0').toLowerCase(),
                    },
                    }).then(({ data: response }) => {
                         if (response.data.errflag == "2") {

                            this.button_txt_para_default = "一键下发默认参数";

                            this.button_state_para = false;

                            clearInterval(this.timer_flag_para)

                            this.timer_flag_para = null

                            this.$alert('恒温算法相关数据中存在非法输入 请修改格式', '失败', {
                                confirmButtonText: '确定',
                            });

                            this.para_table_data = true;

                            this.modify_para();
                            // this.outerVisible=false;
                        }else if (response.data.errflag == "3") {

                            this.button_txt_para_default = "一键下发默认参数";

                            this.button_state_para = false;

                            clearInterval(this.timer_flag_para)

                            this.timer_flag_para = null

                            this.$alert('恒温算法相关数据中下发失败 改写参数与返回参数不同请再次尝试', '失败', {
                                confirmButtonText: '确定',
                            });

                            this.para_table_data = true;

                            this.modify_para();
                            // this.outerVisible=false;
                        }else if (response.data.errflag == "4") {

                            this.button_txt_para_default = "一键下发默认参数";

                            this.button_state_para = false;

                            clearInterval(this.timer_flag_para)

                            this.timer_flag_para = null

                            this.$alert('恒温算法相关数据中输入超出范围', '失败', {
                                confirmButtonText: '确定',
                            });

                            this.para_table_data = true;

                            this.modify_para();
                            // this.outerVisible=false;
                        }else if (response.data.outcmd != null)  {
                            this.para_table_data = true;
                        }
                    }).catch((err) => {
                    
                    });
                }
                //单独改写参数
                
                //暂时不要请求该函数
                if ( this.tableData_para_single_look[0].default_value != null && this.activeName == "second") {
                    request.post('sentcmd/rewritesingleparacmd', null, {
                    params:
                    { 
                        applianceid:    this.applianceid_temp,
                        index:          (this.tableData_para_single_look[0].serial_number).padStart(2,'0').toLowerCase(),
                        value:          (this.tableData_para_single_look[0].default_value).padStart(2,'0').toLowerCase(),
                    },
                    }).then(({ data: response }) => {
                        if (response.data.errflag == "2") {

                        this.button_txt_para_default = "一键下发默认参数";

                        this.button_state_para = false;

                        clearInterval(this.timer_flag_para)

                        this.timer_flag_para = null

                        this.$alert('单独改写参数中存在非法输入 请修改格式', '失败', {
                            confirmButtonText: '确定',
                        });

                        this.para_table_data = true;

                        this.modify_para();
                        // this.outerVisible=false;
                    }else if (response.data.errflag == "3") {

                        this.button_txt_para_default = "一键下发默认参数";

                        this.button_state_para = false;

                        clearInterval(this.timer_flag_para)

                        this.timer_flag_para = null

                        this.$alert('单独改写参数中下发失败 改写参数与返回参数不同请再次尝试', '失败', {
                            confirmButtonText: '确定',
                        });

                        this.para_table_data = true;

                        this.modify_para();
                        // this.outerVisible=false;
                    }else if (response.data.errflag == "4") {

                        this.button_txt_para_default = "一键下发默认参数";

                        this.button_state_para = false;

                        clearInterval(this.timer_flag_para)

                        this.timer_flag_para = null

                        this.$alert('单独改写参数中输入超出范围', '失败', {
                            confirmButtonText: '确定',
                        });

                        this.para_table_data = true;

                        this.modify_para();
                        // this.outerVisible=false;
                    }else if (response.data.outcmd != null)  {
                            this.para_table_data = true;
                        }
                    }).catch((err) => {
                    
                    });     
                }
                if (this.activeName == "fifth") {
                    request.post('sentcmd/rewriteparametersettingcmd', null, {
                    params:
                    { 
                        applianceid:    this.applianceid_temp,
                        script:         "0b",
                        FA:             (this.tableData_para_single[0].recent_date).padStart(2,'0').toLowerCase(), 
	                    FF:             (this.tableData_para_single[1].recent_date).padStart(2,'0').toLowerCase(),
	                    PH:             (this.tableData_para_single[2].recent_date).padStart(2,'0').toLowerCase(),
	                    FH:             (this.tableData_para_single[3].recent_date).padStart(2,'0').toLowerCase(),
	                    PL:             (this.tableData_para_single[4].recent_date).padStart(2,'0').toLowerCase(),
	                    FL:             (this.tableData_para_single[5].recent_date).padStart(2,'0').toLowerCase(),
	                    dH:             (this.tableData_para_single[6].recent_date).padStart(2,'0').toLowerCase(),
	                    Fd:             (this.tableData_para_single[7].recent_date).padStart(2,'0').toLowerCase(),
	                    CH:             (this.tableData_para_single[8].recent_date).padStart(2,'0').toLowerCase(),
	                    FC:             (this.tableData_para_single[9].recent_date).padStart(2,'0').toLowerCase(),
	                    nE:             (this.tableData_para_single[10].recent_date).padStart(2,'0').toLowerCase(),
	                    CA:             (this.tableData_para_single[11].recent_date).padStart(2,'0').toLowerCase(),
	                    FP:             (this.tableData_para_single[12].recent_date).padStart(2,'0').toLowerCase(),
	                    HS:             (this.tableData_para_single[14].recent_date).padStart(2,'0').toLowerCase(),
	                    Hb:             (this.tableData_para_single[15].recent_date).padStart(2,'0').toLowerCase(),
	                    HE:             (this.tableData_para_single[16].recent_date).padStart(2,'0').toLowerCase(),
	                    HL:             (this.tableData_para_single[17].recent_date).padStart(2,'0').toLowerCase(),
	                    HU:             (this.tableData_para_single[18].recent_date).padStart(2,'0').toLowerCase(),
	                    Fn:             (this.tableData_para_single[21].recent_date).padStart(2,'0').toLowerCase(),
                    },
                    }).then(({ data: response }) => {
                        if (response.data.errflag == "2") {

                        this.button_txt_para_default = "一键下发默认参数";

                        this.button_state_para = false;

                        clearInterval(this.timer_flag_para)

                        this.timer_flag_para = null

                        this.$alert('多参数改写中存在非法输入 请修改格式', '失败', {
                            confirmButtonText: '确定',
                        });

                        this.para_table_data = true;

                        this.modify_para();
                        // this.outerVisible=false;
                        }else if (response.data.errflag == "3") {

                        this.button_txt_para_default = "一键下发默认参数";

                        this.button_state_para = false;

                        clearInterval(this.timer_flag_para)

                        this.timer_flag_para = null

                        this.$alert('多参数改写中下发失败 改写参数与返回参数不同请再次尝试', '失败', {
                            confirmButtonText: '确定',
                        });

                        this.para_table_data = true;

                        this.modify_para();
                        // this.outerVisible=false;
                        }else if (response.data.errflag == "4") {

                        this.button_txt_para_default = "一键下发默认参数";

                        this.button_state_para = false;

                        clearInterval(this.timer_flag_para)

                        this.timer_flag_para = null

                        this.$alert('多参数改写中输入超出范围', '失败', {
                            confirmButtonText: '确定',
                        });

                        this.para_table_data = true;

                        this.modify_para();
                        // this.outerVisible=false;
                        }else if (response.data.outcmd != null)  {
                            this.para_table_data = true;
                        }
                    }).catch((err) => {
                        
                    }); 
                }


                if(this.timer_flag_para == null) {
                    this.button_txt_para_default = "参数下发中..."
                    this.button_state_para = true

                    this.timer_flag_para = setInterval(this.deal_timer_para,1000) // 1秒执行一次deal_timer_para函数

                }
            }
        }).catch((err) => {
        
        });

        
       
    },
    getDatalist(){
        for (var i=0;i<this.single_para_list.length;i++) {
            if (this.tableData_para_single[i].para_name == this.tableData_para_single_look[0].para_name) {

                this.tableData_para_single_look[0]={
                    para_name :  this.tableData_para_single[i].para_name,
                    advice_date: this.tableData_para_single[i].advice_date,
                    recent_date: this.tableData_para_single[i].recent_date,
                    modify_date: this.tableData_para_single[i].modify_date,
                    serial_number       : this.tableData_para_single[i].serial_number,
                    default_value: this.tableData_para_single[i].default_value,
                    code       : this.tableData_para_single[i].code,
                    limit_data : "0X"+this.tableData_para_single[i].Min_limit + "-"+"0X"+this.tableData_para_single[i].Max_limit ,
                    singlemax:this.tableData_para_single[i].Max_limit,
                    singlemin:this.tableData_para_single[i].Min_limit,
                    isEdit: false ,
                }
                this.tableData_para_single_look=JSON.parse(JSON.stringify(this.tableData_para_single_look)); 
                break;
            }
        }
    },
     startDownload(){
        let self = this
        if(self.tableData1.length==0) {
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
     /** 鼠标移入cell */
    handleCellEnter (row, column, cell, event) {
    if (row.code != "030025" && row.code != "030031" &&row.code != "030032") {
        row.isEdit = true   
    } else {
        row.isEdit = false
    }
      
    },
    /** 鼠标移出cell */
    handleCellLeave (row, column, cell, event) {
      row.isEdit = false
    },


  },
  created() {
    
    //默认时间显示当天
    const dt  = new Date();
    dt.setTime(dt.getTime());
    this.datatime=this.dateFormat(dt);  //今天的时间

          

  },
};
</script>

<style lang="scss">
.el-dialog-div {
  height: 500px!important;
 // overflow: auto;
}
#mainbox {
  display: flex;
  top: 30px;
  width:100%;
  height: 500px;
  .column {
    flex:50%;
    
  }
  }
#myChart3 {
  top: 30px;
  width: 100%;
  height: 500px;
  //margin-bottom: 30px;
 //margin: auto;

  }
#myChart4 {
  top: 30px;
  width: 100%;
  height: 500px;
  //margin-bottom: 30px;
 //margin: auto;

  }
#myChart {
  // width: 50%;
  // height: 500px;
  // border: 1px solid red;
  // margin: 0 auto;
 
  top: 20px;
  width: 1000px;
  height: 400px;
  margin: auto;
  // grid: {
  //   x: 0;
  //   y: 0;
  //   x2: 0;
  //   y2: 0;
  // }

}

.dialogDiv {
  display: flex;
  overflow: auto;
  align-items: center;
  flex-wrap: wrap;
  justify-content:center;//水平居中
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
</style>
