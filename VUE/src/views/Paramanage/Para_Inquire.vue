<template>
    <div id="app1">
        <div class="search" align="center" style="margin-top:20px;">
            <span>设备参数信息修改:</span>
            <span>设备:</span>
            <el-autocomplete v-model="equipment_ID"
            placeholder="请输入设备号"
            style="width:160px"
            clearable
            class="inline-input"
            :trigger-on-focus="false">
            </el-autocomplete>
            <el-button type="primary" @click="Get_Para_info" :disabled="button_state" style="margin-left:50px;">{{button_content}}</el-button>
        </div>
            <el-main>
                <el-tabs v-model="activeName"  >
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
                                <template slot-scope="scope">
                                    <div  class="txt">0X{{scope.row.recent_date}}</div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="advice_date"
                                label="建议值"
                                width="180">
                                <template slot-scope="scope">
                                    <div  class="txt">0X{{scope.row.advice_date}}</div>
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
                                <template slot-scope="scope_1">
                                    <div  class="txt">0X{{scope_1.row.default_value}}</div>
                                </template>
                            </el-table-column> -->
                            <el-table-column
                                prop="recent_date"
                                label="当前值"
                                width="180">
                                <template slot-scope="scope_1">
                                    <div  class="txt">0X{{scope_1.row.recent_date}}</div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="advice_date"
                                label="建议值"
                                width="180">
                                <template slot-scope="scope_1">
                                    <div  class="txt">0X{{scope_1.row.advice_date}}</div>
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
                                <template slot-scope="scope_2">
                                    <div  class="txt">0X{{scope_2.row.default_value}}</div>
                                </template>
                            </el-table-column> -->
                            <el-table-column
                                prop="recent_date"
                                label="当前值"
                                width="180">
                                <template slot-scope="scope_2">
                                    <div  class="txt">0X{{scope_2.row.recent_date}}</div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="advice_date"
                                label="建议值"
                                width="180">
                                <template slot-scope="scope_2">
                                    <div  class="txt">0X{{scope_2.row.advice_date}}</div>
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
                                <template slot-scope="scope5_1">
                                    <div  class="txt">0X{{scope5_1.row.default_value}}</div>
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
                                <template slot-scope="scope_3">
                                    <div  class="txt">0X{{scope_3.row.default_value}}</div>
                                </template>
                            </el-table-column> -->
                            <el-table-column
                                prop="recent_date"
                                label="当前值"
                                width="180">
                                <template slot-scope="scope_3">
                                    <div  class="txt">0X{{scope_3.row.recent_date}}</div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="advice_date"
                                label="建议值"
                                width="180">
                                <template slot-scope="scope_3">
                                    <div  class="txt">0X{{scope_3.row.advice_date}}</div>
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

            <div id="button_out_para" slot="footer">
                <el-button type="primary" style="margin-left:30px" size="large" :disabled="button_state_para" round @click="para_out">{{button_txt_para}}</el-button>
                <el-button type="primary" style="margin-left:30px" size="large" :disabled="button_state_para" round @click="para_out_default">{{button_txt_para_default}}</el-button>
            </div>
            <el-dialog title="参数修改记录" :visible.sync="outerVisible_para_history"  show-close center  fullscreen>
            <el-container class="dialogDiv">
                <el-header><h5>设备:{{equipment_ID}}</h5> </el-header>
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
        </el-dialog>

    </div>

</template>

<script>
import request from '@/utils/request';

export default {
  components: {},
  data() {
    return {

      // 设备ID号
      equipment_ID: 188016488514318,
      // 参数查询按键相关
      button_content: '查询',
      button_txt_para: '参数下发',
      button_txt_para_default: '一键下发默认参数',
      button_state: false,
      button_state_para: true,
      // 参数类别
      activeName: 'first',
      // 段序号
      duanma_list: '段序号0',
      // 参数表格数据
      tableData_para_temp: [],

      tableData_para_temp_look: [],

      tableData_para_un_1: [],

      tableData_para_un_2: [],

      tableData_para_single_look: [{
        para_name: "",
      }],
      tableData_para_single: [],
      tableData_para_history: [],
      tableData_para_history_new: [],
      // 单参数
      single_para_list: [],
      // 定时器标志位
      timer_flag_para_getinfo: null,
      // 参数修改记录表格
      outerVisible_para_history:false,
      // 参数修改成功标志位
      Flag_para_un_1 : false,
      Flag_para_un_2 : false,
      Flag_para_temp : false,
      Flag_para_all : false,
      Flag_para_single : false,
      tableData_para_one_code : [],
      activeName_temp:'first',

    };
  },
  methods: {
    // 功能函数区（格式转化等）
    dateFormat(time) {
      let date = new Date(time);
      let year = date.getFullYear();
      let month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
      let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      let hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      let minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      let seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      // 拼接 可改成自己所要的时间格式
      return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
    },
    // 自处理任务区
    deal_table_data() {
      // 设备参数采集信息处理
      request.post('timemonitor/EquipmentIndexMonitoring', null, {
        params:
            {
              dev_id: this.equipment_ID,
            },
      }).then(({ data: response }) => {
        console.log(response.data)
        // 单参数修改
        // eslint-disable-next-line vars-on-top
        if (this.activeName_temp == "second" || this.activeName_temp == "fifth") {
            for (let i = 0; i < response.data.tableData_para_single_out.length; i += 1) {

            this.tableData_para_single[i] = {
                para_name: response.data.tableData_para_single_out[i].para_name,
                code: response.data.tableData_para_single_out[i].code,
                serial_number: response.data.tableData_para_single_out[i].serial_number,
                advice_date: (response.data.tableData_para_single_out[i].advice_date).padStart(2,'0').toUpperCase(),
                recent_date: (response.data.tableData_para_single_out[i].recent_date).padStart(2,'0').toUpperCase(),
                modify_date: (response.data.tableData_para_single_out[i].modify_date).padStart(2,'0').toUpperCase(),
                Min_limit: (response.data.tableData_para_single_out[i].Min_limit).padStart(2,'0').toUpperCase(),
                Max_limit: (response.data.tableData_para_single_out[i].Max_limit).padStart(2,'0').toUpperCase(),
                default_value: (response.data.tableData_para_single_out[i].default_value).padStart(2,'0').toUpperCase(),
                limit_data : "0X"+(response.data.tableData_para_single_out[i].Min_limit).padStart(2,'0').toUpperCase() + "-"+"0X"+(response.data.tableData_para_single_out[i].Max_limit).padStart(2,'0').toUpperCase() ,
                isEdit: false
            }

            this.single_para_list[i] = {
                value: response.data.tableData_para_single_out[i].para_name,
                label: response.data.tableData_para_single_out[i].para_name,
            }

            }
            this.single_para_list = JSON.parse(JSON.stringify(this.single_para_list));
            this.tableData_para_single = JSON.parse(JSON.stringify(this.tableData_para_single));
            this.getDatalist();
        }
        // 参数恒温算法 两位 16进制 大写显示
        if (this.activeName_temp == "first") {
            for (let i = 0; i < response.data.tableData_para_temp_out.length; i += 1) {
            this.tableData_para_temp[i] = {
                para_name: response.data.tableData_para_temp_out[i].para_name,
                code: response.data.tableData_para_temp_out[i].code,
                advice_date: (response.data.tableData_para_temp_out[i].advice_date).padStart(2,'0').toUpperCase(),
                recent_date: (response.data.tableData_para_temp_out[i].recent_date).padStart(2,'0').toUpperCase(),
                modify_date: (response.data.tableData_para_temp_out[i].modify_date).padStart(2,'0').toUpperCase(),
                default_value: (response.data.tableData_para_temp_out[i].default_value).padStart(2,'0').toUpperCase(),
                Min_limit: (response.data.tableData_para_temp_out[i].Min_limit).padStart(2,'0').toUpperCase(),
                Max_limit: (response.data.tableData_para_temp_out[i].Max_limit).padStart(2,'0').toUpperCase(),
                isEdit: false
            }
            }
            this.tableData_para_temp = JSON.parse(JSON.stringify(this.tableData_para_temp));
            this.duanma_select();
        }
        
        // 非参数参数2
        if (this.activeName_temp == "fourth") {
            for (let i = 0; i < response.data.tableData_para_un_2_out.length; i += 1) {
            this.tableData_para_un_2[i] = {
                para_name: response.data.tableData_para_un_2_out[i].para_name,
                code: response.data.tableData_para_un_2_out[i].code,
                advice_date: (response.data.tableData_para_un_2_out[i].advice_date).padStart(2,'0').toUpperCase(),
                recent_date: (response.data.tableData_para_un_2_out[i].recent_date).padStart(2,'0').toUpperCase(),
                modify_date: (response.data.tableData_para_un_2_out[i].modify_date).padStart(2,'0').toUpperCase(),
                default_value: (response.data.tableData_para_un_2_out[i].default_value).padStart(2,'0').toUpperCase(),
                Min_limit: (response.data.tableData_para_un_2_out[i].Min_limit).padStart(2,'0').toUpperCase(),
                Max_limit: (response.data.tableData_para_un_2_out[i].Max_limit).padStart(2,'0').toUpperCase(),
                limit_data : "0X"+(response.data.tableData_para_un_2_out[i].Min_limit).padStart(2,'0').toUpperCase() + "-"+"0X"+(response.data.tableData_para_un_2_out[i].Max_limit).padStart(2,'0').toUpperCase(),
                isEdit: false
            }
            }
            this.tableData_para_un_2 = JSON.parse(JSON.stringify(this.tableData_para_un_2));
        }
        // 非参数恒温算法1
        if (this.activeName_temp == "third") {
            for (let i = 0; i < response.data.tableData_para_un_1_out.length; i += 1) {
            this.tableData_para_un_1[i] = {
                para_name: response.data.tableData_para_un_1_out[i].para_name,
                code: response.data.tableData_para_un_1_out[i].code,
                advice_date: (response.data.tableData_para_un_1_out[i].advice_date).padStart(2,'0').toUpperCase(),
                recent_date: (response.data.tableData_para_un_1_out[i].recent_date).padStart(2,'0').toUpperCase(),
                modify_date: (response.data.tableData_para_un_1_out[i].modify_date).padStart(2,'0').toUpperCase(),
                default_value: (response.data.tableData_para_un_1_out[i].default_value).padStart(2,'0').toUpperCase(),
                Min_limit: (response.data.tableData_para_un_1_out[i].Min_limit).padStart(2,'0').toUpperCase(),
                Max_limit: (response.data.tableData_para_un_1_out[i].Max_limit).padStart(2,'0').toUpperCase(),
                limit_data : "0X"+(response.data.tableData_para_un_1_out[i].Min_limit).padStart(2,'0').toUpperCase() + "-"+"0X"+(response.data.tableData_para_un_1_out[i].Max_limit).padStart(2,'0').toUpperCase() ,
                isEdit: false
            }
            }
            this.tableData_para_un_1 = JSON.parse(JSON.stringify(this.tableData_para_un_1));
        }
        
      }).catch((err) => {

      });

      request.post('sentcmd/rewriteFind', null, {// 该函数用于将修改标志全部置0
        params:
        {
          applianceid: this.equipment_ID,
        },
      }).then(({ data: response }) => {

      }).catch((err) => {

      });
    },
    // 参数修改函数区
    /**
    * 单参数修改接口
    * @param 
    * @returns 
    */
    single_para_modify(){
        //单独改写参数

        //暂时不要请求该函数
        if ( this.tableData_para_single_look[0].modify_date != null) {
            request.post('sentcmd/rewritesingleparacmd', null, {
            params:
            { 
                applianceid:    this.equipment_ID,
               index:          (this.tableData_para_single_look[0].serial_number).padStart(2,'0').toLowerCase(),
                singlemin:      this.tableData_para_single_look[0].singlemin,
                singlemax:      this.tableData_para_single_look[0].singlemax,
               value:          (this.tableData_para_single_look[0].modify_date).padStart(2,'0').toLowerCase(),
            },
            }).then(({ data: response }) => {
                if (response.data.errflag == "2") {
                    this.button_txt_para = "参数下发";
                    this.button_state_para = false;

                    this.button_state = false; // 参数查询按钮禁用

                    clearInterval(this.timer_flag_para)
                    this.timer_flag_para = null
                    this.$alert('单独改写参数中存在非法输入 请修改格式', '失败', {
                        confirmButtonText: '确定',
                    });
                    this.deal_table_data();// 处理表格数据
                    // this.outerVisible=false;
                }else if (response.data.errflag == "3") {
                    this.button_txt_para = "参数下发";
                    this.button_state_para = false;

                    this.button_state = false; // 参数查询按钮禁用

                    clearInterval(this.timer_flag_para)
                    this.timer_flag_para = null
                    this.$alert('单独改写参数修改失败 改写参数与返回参数不同请再次尝试', '失败', {
                        confirmButtonText: '确定',
                    });
                    this.deal_table_data();// 处理表格数据
                    // this.outerVisible=false;
                }else if (response.data.errflag == "4") {
                    this.button_txt_para = "参数下发";
                    this.button_state_para = false;

                    this.button_state = false; // 参数查询按钮禁用

                    clearInterval(this.timer_flag_para)
                    this.timer_flag_para = null
                    this.$alert('单独改写参数修改失败 输入范围超出', '失败', {
                        confirmButtonText: '确定',
                    });
                    this.deal_table_data();// 处理表格数据
                    // this.outerVisible=false;
                }else if (response.data.outcmd != null) {
                    this.para_table_data = true;//参数获取成功
                }
            }).catch((err) => {
            
            });     
        }
    },
    /**
    * 单参数修改接口默认
    * @param 
    * @returns 
    */
    single_para_modify_default(){
        //单独改写参数

        //暂时不要请求该函数
        if ( this.tableData_para_single_look[0].default_value != null) {
            request.post('sentcmd/rewritesingleparacmd', null, {
            params:
            { 
                applianceid:    this.equipment_ID,
                index:          this.tableData_para_single_look[0].serial_number,
                value:          this.tableData_para_single_look[0].default_value,
            },
            }).then(({ data: response }) => {
                if (response.data.errflag == "2") {
                    this.button_txt_para_default = "一键下发默认参数";
                    this.button_state_para = false;

                    this.button_state = false; // 参数查询按钮禁用

                    clearInterval(this.timer_flag_para)
                    this.timer_flag_para = null
                    this.$alert('单独改写参数中存在非法输入 请修改格式', '失败', {
                        confirmButtonText: '确定',
                    });
                    this.deal_table_data();// 处理表格数据
                    // this.outerVisible=false;
                }else if (response.data.errflag == "3") {
                    this.button_txt_para_default = "一键下发默认参数";
                    this.button_state_para = false;

                    this.button_state = false; // 参数查询按钮禁用

                    clearInterval(this.timer_flag_para)
                    this.timer_flag_para = null
                    this.$alert('单独改写参数修改失败 改写参数与返回参数不同请再次尝试', '失败', {
                        confirmButtonText: '确定',
                    });
                    this.deal_table_data();// 处理表格数据
                    // this.outerVisible=false;
                }else if (response.data.errflag == "4") {
                    this.button_txt_para_default = "一键下发默认参数";
                    this.button_state_para = false;

                    this.button_state = false; // 参数查询按钮禁用

                    clearInterval(this.timer_flag_para)
                    this.timer_flag_para = null
                    this.$alert('单独改写参数修改失败 输入范围超出', '失败', {
                        confirmButtonText: '确定',
                    });
                    this.deal_table_data();// 处理表格数据
                    // this.outerVisible=false;
                }else if (response.data.outcmd != null) {
                    this.para_table_data = true;//参数获取成功
                }
            }).catch((err) => {
            
            });     
        }
    },
    /**
    * 改写恒温算法相关数据
    * @param 
    * @returns 
    */
    temp_para_modify() {
        //改写恒温算法相关数据

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
            applianceid:    this.equipment_ID,
            segment:        num,
            // script:         "10",
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

                this.button_state = false; // 参数查询按钮禁用

                clearInterval(this.timer_flag_para)
                this.timer_flag_para = null
                this.$alert('恒温算法相关数据中存在非法输入 请修改格式', '失败', {
                    confirmButtonText: '确定',
                });
                this.deal_table_data();// 处理表格数据
                // this.outerVisible=false;
            }else if (response.data.errflag == "3") {
                this.button_txt_para = "参数下发";
                this.button_state_para = false;

                this.button_state = false; // 参数查询按钮禁用

                clearInterval(this.timer_flag_para)
                this.timer_flag_para = null
                this.$alert('恒温算法相关参数修改失败 改写参数与返回参数不同请再次尝试', '失败', {
                    confirmButtonText: '确定',
                });
                this.deal_table_data();// 处理表格数据
                // this.outerVisible=false;
            }else if (response.data.errflag == "4") {
                this.button_txt_para = "参数下发";
                this.button_state_para = false;

                this.button_state = false; // 参数查询按钮禁用

                clearInterval(this.timer_flag_para)
                this.timer_flag_para = null
                this.$alert('恒温算法相关参数修改失败 输入范围超出', '失败', {
                    confirmButtonText: '确定',
                });
                this.deal_table_data();// 处理表格数据
                // this.outerVisible=false;
            }else if (response.data.outcmd != null) {
                this.para_table_data = true;//参数获取成功
            }
        }).catch((err) => {
        
        });
    },
        /**
    * 改写恒温算法相关数据默认
    * @param 
    * @returns 
    */
    temp_para_modify_default() {
        //改写恒温算法相关数据

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
            applianceid:    this.equipment_ID,
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

                this.button_state = false; // 参数查询按钮禁用

                clearInterval(this.timer_flag_para)
                this.timer_flag_para = null
                this.$alert('恒温算法相关数据中存在非法输入 请修改格式', '失败', {
                    confirmButtonText: '确定',
                });
                this.deal_table_data();// 处理表格数据
                // this.outerVisible=false;
            }else if (response.data.errflag == "3") {
                this.button_txt_para_default = "一键下发默认参数";
                this.button_state_para = false;

                this.button_state = false; // 参数查询按钮禁用

                clearInterval(this.timer_flag_para)
                this.timer_flag_para = null
                this.$alert('恒温算法相关参数修改失败 改写参数与返回参数不同请再次尝试', '失败', {
                    confirmButtonText: '确定',
                });
                this.deal_table_data();// 处理表格数据
                // this.outerVisible=false;
            }else if (response.data.errflag == "4") {
                this.button_txt_para_default = "一键下发默认参数";
                this.button_state_para = false;

                this.button_state = false; // 参数查询按钮禁用

                clearInterval(this.timer_flag_para)
                this.timer_flag_para = null
                this.$alert('恒温算法相关参数修改失败 输入范围超出', '失败', {
                    confirmButtonText: '确定',
                });
                this.deal_table_data();// 处理表格数据
                // this.outerVisible=false;
            }else if (response.data.outcmd != null) {
                this.para_table_data = true;//参数获取成功
            }
        }).catch((err) => {
        
        });
    },
    /**
    * 改写非调试模式参数第一组
    * @param 
    * @returns 
    */
    un_para_modify_1() {
        //改写非调试模式参数第一组

        //暂时不要请求该函数
        request.post('sentcmd/updatenobedugparafirstcmd', null, {
        params:
        { 
            applianceid:        this.equipment_ID,
            rewaterflow:        (this.tableData_para_un_1[0].modify_date).padStart(2,'0').toLowerCase(),
            windpressuresensor: (this.tableData_para_un_1[1].modify_date).padStart(2,'0').toLowerCase(),
        },
        }).then(({ data: response }) => {
            if (response.data.errflag == "2") {
                this.button_txt_para = "参数下发";
                this.button_state_para = false;

                this.button_state = false; // 参数查询按钮禁用

                clearInterval(this.timer_flag_para)
                this.timer_flag_para = null
                this.$alert('非调试模式参数第一组中存在非法输入 请修改格式', '失败', {
                    confirmButtonText: '确定',
                });
                this.deal_table_data();// 处理表格数据
                // this.outerVisible=false;
            }else if (response.data.errflag == "3") {
                this.button_txt_para = "参数下发";
                this.button_state_para = false;

                this.button_state = false; // 参数查询按钮禁用

                clearInterval(this.timer_flag_para)
                this.timer_flag_para = null
                this.$alert('非调试模式参数第一组参数修改失败 改写参数与返回参数不同请再次尝试', '失败', {
                    confirmButtonText: '确定',
                });
                this.deal_table_data();// 处理表格数据
                // this.outerVisible=false;
            }else if (response.data.errflag == "4") {
                this.button_txt_para = "参数下发";
                this.button_state_para = false;

                this.button_state = false; // 参数查询按钮禁用

                clearInterval(this.timer_flag_para)
                this.timer_flag_para = null
                this.$alert('非调试模式参数第一组参数修改失败 输入范围超出', '失败', {
                    confirmButtonText: '确定',
                });
                this.deal_table_data();// 处理表格数据
                // this.outerVisible=false;
            }else if (response.data.outcmd != null) {
                this.para_table_data = true;//参数获取成功
            }
        }).catch((err) => {
        
        });
    },
    /**
    * 改写非调试模式参数第一组默认
    * @param 
    * @returns 
    */
    un_para_modify_1_default() {
        //改写非调试模式参数第一组

        //暂时不要请求该函数
        request.post('sentcmd/updatenobedugparafirstcmd', null, {
        params:
        { 
            applianceid:        this.equipment_ID,
            rewaterflow:        (this.tableData_para_un_1[0].default_value).padStart(2,'0').toLowerCase(),
            windpressuresensor: (this.tableData_para_un_1[1].default_value).padStart(2,'0').toLowerCase(),
        },
        }).then(({ data: response }) => {
            if (response.data.errflag == "2") {
                this.button_txt_para_default = "一键下发默认参数";
                this.button_state_para = false;

                this.button_state = false; // 参数查询按钮禁用

                clearInterval(this.timer_flag_para)
                this.timer_flag_para = null
                this.$alert('非调试模式参数第一组中存在非法输入 请修改格式', '失败', {
                    confirmButtonText: '确定',
                });
                this.deal_table_data();// 处理表格数据
                // this.outerVisible=false;
            }else if (response.data.errflag == "3") {
                this.button_txt_para_default = "一键下发默认参数";
                this.button_state_para = false;

                this.button_state = false; // 参数查询按钮禁用

                clearInterval(this.timer_flag_para)
                this.timer_flag_para = null
                this.$alert('非调试模式参数第一组参数修改失败 改写参数与返回参数不同请再次尝试', '失败', {
                    confirmButtonText: '确定',
                });
                this.deal_table_data();// 处理表格数据
                // this.outerVisible=false;
            }else if (response.data.errflag == "4") {
                this.button_txt_para_default = "一键下发默认参数";
                this.button_state_para = false;

                this.button_state = false; // 参数查询按钮禁用

                clearInterval(this.timer_flag_para)
                this.timer_flag_para = null
                this.$alert('非调试模式参数第一组参数修改失败 输入范围超出', '失败', {
                    confirmButtonText: '确定',
                });
                this.deal_table_data();// 处理表格数据
                // this.outerVisible=false;
            }else if (response.data.outcmd != null) {
                this.para_table_data = true;//参数获取成功
            }
        }).catch((err) => {
        
        });
    },
    /**
    * 改写非调试模式参数第二组
    * @param 
    * @returns 
    */
    un_para_modify_2() {
        //改写非调试模式参数第二组
                
        //暂时不要请求该函数
        request.post('sentcmd/rewritenodebugsecondcmd', null, {
        params:
        { 
            applianceid:     this.equipment_ID,
            maxcurrcoeff:    (this.tableData_para_un_2[0].modify_date).padStart(2,'0').toLowerCase(),
            mincurrcoeff:    (this.tableData_para_un_2[1].modify_date).padStart(2,'0').toLowerCase(),
            maxdutycyccoeff: (this.tableData_para_un_2[2].modify_date).padStart(2,'0').toLowerCase(),
            mindutycyccoeff: (this.tableData_para_un_2[3].modify_date).padStart(2,'0').toLowerCase(),
        },
        }).then(({ data: response }) => {
            if (response.data.errflag == "2") {
                this.button_txt_para = "参数下发";
                this.button_state_para = false;

                this.button_state = false; // 参数查询按钮禁用

                clearInterval(this.timer_flag_para)
                this.timer_flag_para = null
                this.$alert('非调试模式参数第二组中存在非法输入 请修改格式', '失败', {
                    confirmButtonText: '确定',
                });
                this.deal_table_data();// 处理表格数据
                // this.outerVisible=false;
            }else if (response.data.errflag == "3") {
                this.button_txt_para = "参数下发";
                this.button_state_para = false;

                this.button_state = false; // 参数查询按钮禁用

                clearInterval(this.timer_flag_para)
                this.timer_flag_para = null
                this.$alert('非调试模式参数第二组参数修改失败 改写参数与返回参数不同请再次尝试', '失败', {
                    confirmButtonText: '确定',
                });
                this.deal_table_data();// 处理表格数据
                // this.outerVisible=false;
            }else if (response.data.errflag == "4") {
                this.button_txt_para = "参数下发";
                this.button_state_para = false;
                
                this.button_state = false; // 参数查询按钮禁用

                clearInterval(this.timer_flag_para)
                this.timer_flag_para = null
                this.$alert('非调试模式参数第二组参数修改失败 输入范围超出', '失败', {
                    confirmButtonText: '确定',
                });
                this.deal_table_data();// 处理表格数据
                // this.outerVisible=false;
            }else if (response.data.outcmd != null) {
                this.para_table_data = true;//参数获取成功
            }
        }).catch((err) => {
        
        });
    },
    /**
    * 改写非调试模式参数第二组默认
    * @param 
    * @returns 
    */
    un_para_modify_2_default() {
        //改写非调试模式参数第二组
                
        //暂时不要请求该函数
        request.post('sentcmd/rewritenodebugsecondcmd', null, {
        params:
        { 
            applianceid:     this.equipment_ID,
            maxcurrcoeff:    (this.tableData_para_un_2[0].default_value).padStart(2,'0').toLowerCase(),
            mincurrcoeff:    (this.tableData_para_un_2[1].default_value).padStart(2,'0').toLowerCase(),
            maxdutycyccoeff: (this.tableData_para_un_2[2].default_value).padStart(2,'0').toLowerCase(),
            mindutycyccoeff: (this.tableData_para_un_2[3].default_value).padStart(2,'0').toLowerCase(),
        },
        }).then(({ data: response }) => {
            if (response.data.errflag == "2") {
                this.button_txt_para_default = "一键下发默认参数";
                this.button_state_para = false;

                this.button_state = false; // 参数查询按钮禁用

                clearInterval(this.timer_flag_para)
                this.timer_flag_para = null
                this.$alert('非调试模式参数第二组中存在非法输入 请修改格式', '失败', {
                    confirmButtonText: '确定',
                });
                this.deal_table_data();// 处理表格数据
                // this.outerVisible=false;
            }else if (response.data.errflag == "3") {
                this.button_txt_para_default = "一键下发默认参数";
                this.button_state_para = false;

                this.button_state = false; // 参数查询按钮禁用

                clearInterval(this.timer_flag_para)
                this.timer_flag_para = null
                this.$alert('非调试模式参数第二组参数修改失败 改写参数与返回参数不同请再次尝试', '失败', {
                    confirmButtonText: '确定',
                });
                this.deal_table_data();// 处理表格数据
                // this.outerVisible=false;
            }else if (response.data.errflag == "4") {
                this.button_txt_para_default = "一键下发默认参数";
                this.button_state_para = false;
                
                this.button_state = false; // 参数查询按钮禁用

                clearInterval(this.timer_flag_para)
                this.timer_flag_para = null
                this.$alert('非调试模式参数第二组参数修改失败 输入范围超出', '失败', {
                    confirmButtonText: '确定',
                });
                this.deal_table_data();// 处理表格数据
                // this.outerVisible=false;
            }else if (response.data.outcmd != null) {
                this.para_table_data = true;//参数获取成功
            }
        }).catch((err) => {
        
        });
    },
    /**
    * 总参数修改处理函数
    * @param 
    * @returns 
    */
    all_para_modify() {
        
        
            request.post('sentcmd/rewriteparametersettingcmd', null, {
            params:
            { 
                applianceid:    this.equipment_ID,
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
                    
                    this.button_state = false; // 参数查询按钮禁用
                    
                    clearInterval(this.timer_flag_para)
                    this.timer_flag_para = null
                    this.$alert('多参数改写中存在非法输入 请修改格式', '失败', {
                        confirmButtonText: '确定',
                    });
                    this.deal_table_data();// 处理表格数据
                    // this.outerVisible=false;
                }else if (response.data.errflag == "3") {
                    this.button_txt_para = "参数下发";
                    this.button_state_para = false;

                    this.button_state = false; // 参数查询按钮禁用

                    clearInterval(this.timer_flag_para)
                    this.timer_flag_para = null
                    this.$alert('多参数改写参数修改失败 改写参数与返回参数不同请再次尝试', '失败', {
                        confirmButtonText: '确定',
                    });
                    this.deal_table_data();// 处理表格数据
                    // this.outerVisible=false;
                }else if (response.data.errflag == "4") {
                    this.button_txt_para = "参数下发";
                    this.button_state_para = false;
                    
                    this.button_state = false; // 参数查询按钮禁用

                    clearInterval(this.timer_flag_para)
                    this.timer_flag_para = null
                    this.$alert('多参数改写数修改失败 输入范围超出', '失败', {
                        confirmButtonText: '确定',
                    });
                    this.deal_table_data();// 处理表格数据
                    // this.outerVisible=false;
                }else if (response.data.outcmd != null) {
                    console.log(response)
                    this.para_table_data = true;//参数获取成功
                }
                
            }).catch((err) => {

            });
        
    },
    /**
    * 总参数修改处理函数默认
    * @param 
    * @returns 
    */
    all_para_modify_default() {
        
            request.post('sentcmd/rewriteparametersettingcmd', null, {
            params:
            { 
                applianceid:    this.equipment_ID,
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
                    
                    this.button_state = false; // 参数查询按钮禁用
                    
                    clearInterval(this.timer_flag_para)
                    this.timer_flag_para = null
                    this.$alert('多参数改写中存在非法输入 请修改格式', '失败', {
                        confirmButtonText: '确定',
                    });
                    this.deal_table_data();// 处理表格数据
                    // this.outerVisible=false;
                }else if (response.data.errflag == "3") {
                    this.button_txt_para_default = "一键下发默认参数";
                    this.button_state_para = false;

                    this.button_state = false; // 参数查询按钮禁用

                    clearInterval(this.timer_flag_para)
                    this.timer_flag_para = null
                    this.$alert('多参数改写参数修改失败 改写参数与返回参数不同请再次尝试', '失败', {
                        confirmButtonText: '确定',
                    });
                    this.deal_table_data();// 处理表格数据
                    // this.outerVisible=false;
                }else if (response.data.errflag == "4") {
                    this.button_txt_para_default = "一键下发默认参数";
                    this.button_state_para = false;
                    
                    this.button_state = false; // 参数查询按钮禁用

                    clearInterval(this.timer_flag_para)
                    this.timer_flag_para = null
                    this.$alert('多参数改写数修改失败 输入范围超出', '失败', {
                        confirmButtonText: '确定',
                    });
                    this.deal_table_data();// 处理表格数据
                    // this.outerVisible=false;
                }else if (response.data.outcmd != null) {
                    this.para_table_data = true;//参数获取成功
                }
            }).catch((err) => {

            });
        
    },
    // 时钟函数区
    deal_timer() {

    },
    deal_timer_para_getinfo() { // 处理获取所有信息
        if (this.para_table_data == true) { // 完成标志
          this.button_content = '查询';
          this.button_state = false;


          clearInterval(this.timer_flag_para_getinfo)

          this.timer_flag_para_getinfo = null
          this.deal_table_data();// 处理表格数据
            request.post('sentcmd/rewriteFind', null, {// 该函数用于将修改标志全部置0
            params:
            {
            applianceid: this.equipment_ID,
            },
            }).then(({ data: response }) => {
            }).catch((err) => {

            });
          this.$notify({
            title: '成功',
            message: '设备参数信息采集完成',
            type: 'success',
            duration: 3000,
          });
          this.button_txt_para = "参数下发";
          this.button_state_para = false;
        }
    //   }).catch((err) => {

    //   });
    },
    deal_timer_para() { // 等待参数写入完成
                
      if(this.para_table_data == true) {
        clearInterval(this.timer_flag_para)
        this.timer_flag_para = null
        this.$alert('修改完成', '成功', {
          confirmButtonText: '确定',
        });
        this.button_content = '查询';
        this.button_state = false;


          clearInterval(this.timer_flag_para_getinfo)

          this.timer_flag_para_getinfo = null
          this.$notify({
            title: '成功',
            message: '设备参数信息修改完成',
            type: 'success',
            duration: 3000,
          });
          this.button_txt_para = "参数下发";
          this.button_txt_para_default = "一键下发默认参数";
          this.button_state_para = false;
          request.post('sentcmd/rewriteFind', null, {// 该函数用于将修改标志全部置0
            params:
            {
            applianceid: this.equipment_ID,
            },
            }).then(({ data: response }) => {
            }).catch((err) => {

            });
          this.deal_table_data()();// 重新获取表格数据
          

          
      }
    },
    duanma_select() {
      var num = 0;
      if (this.duanma_list == "段序号0") {
        num = 0;
      } else if (this.duanma_list == "段序号1") {
        num = 1;
      } else if (this.duanma_list == "段序号2") {
        num = 2;
      }else if (this.duanma_list == "段序号3") {
        num = 3;
      }
      console.log(this.tableData_para_temp.length / 4)
      for (var i = 0; i < ((this.tableData_para_temp.length) / 4); i++) {
        this.tableData_para_temp_look[i] = {
          para_name: this.tableData_para_temp[4 * i + num].para_name,
          advice_date: this.tableData_para_temp[4 * i + num].advice_date,
          recent_date: this.tableData_para_temp[4 * i + num].recent_date,
          modify_date: this.tableData_para_temp[4 * i + num].modify_date,
          code: this.tableData_para_temp[4 * i + num].code,
          limit_data : "0X"+this.tableData_para_temp[4 * i + num].Min_limit + "-"+"0X"+this.tableData_para_temp[4 * i + num].Max_limit ,
          default_value: this.tableData_para_temp[4 * i + num].default_value,
          isEdit: false,
        }
      }
      this.tableData_para_temp_look = JSON.parse(JSON.stringify(this.tableData_para_temp_look));
    },

    // 组件功能区

    Get_Para_info() {
        if (this.equipment_ID.length == 0) {
        this.$message.info('请完善设备号');
      }
      else
      {
        this.activeName_temp = this.activeName;
        request.post('sentcmd/rewriteFind', null, {// 该函数用于将修改标志全部置0
            params:
            {
            applianceid: this.equipment_ID,
            },
        }).then(({ data: response }) => {
            // 获取设备参数信息
            this.para_table_data = false;//参数获取成功
            var Index_num = 4;
            if (this.activeName_temp == "first") {
                Index_num = 1;
            } else if (this.activeName_temp == "third") {
                Index_num = 2;
            } else if (this.activeName_temp == "fourth") {
                Index_num = 3;
            }else if (this.activeName_temp == "second" || this.activeName_temp == "fifth") {
                Index_num = 4;
            }
            request.post('sentcmd/querysetparameter', null, {// 获取设备信息
            params:
            {
            applianceid: this.equipment_ID,
            Index_Para_Find:Index_num,
            },
            }).then(({ data: response }) => {
                console.log(response.data)
                //参数获取情况判断
               if (response.data.Info_Falg != null && response.data.Info_Falg == "ok") {

                        this.para_table_data = true;//参数获取成功

                    } else {
                        this.$notify.error({
                            title: '错误',
                            message: '参数获取失败'
                        });
                        this.button_content = '查询';
                        this.button_state = false;//参数修改按钮可用
                clearInterval(this.timer_flag_para_getinfo)
                        this.timer_flag_para_getinfo = null
                }
            }).catch((err) => {

            });
            if (this.timer_flag_para_getinfo == null) {
            this.button_content = '参数读取中...'
            this.button_state = true // 查询禁用

            this.button_state_para = true // 参数下发禁用
            this.timer_flag_para_getinfo = setInterval(this.deal_timer_para_getinfo, 3000) // 3秒执行一次deal_timer_para函数
            }
        }).catch((err) => {

        });
      }
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
    para_out_for_default() { // 参数下发处理函数
     request.post('timemonitor/EquipmentRewriteFlag', null, {//该函数用于查询参数是否修改过
          params:
        { 
          applianceid: this.equipment_ID,
        },
        }).then(({ data: response }) => {
            if (response.data.RewriteSuccessFlag == 1) {
                this.$alert('修改设备参数过程中 该设备参数已被他人修改 请刷新当前数据', '错误', {
                    confirmButtonText: '刷新',
                });
                this.Get_Para_info();
            }else if (response.data.RewriteSuccessFlag == 0) {
                if (this.timer_flag_para == null) {

                    this.button_txt_para_default = '参数下发中...'
                    this.button_state_para = true // 参数下发按钮禁用

                    this.button_state = true // 参数查询按钮禁用

                    this.para_table_data = false;//参数获取成功
                    if ( this.activeName == "first") {
                        this.temp_para_modify_default();// 恒温算法参数接口
                    }
                    // if ( this.activeName == "third") {
                    //     this.un_para_modify_1_default();// 非参数算法参数接口1
                    // }
                    // if ( this.activeName == "fourth") {
                    //     this.un_para_modify_2_default();// 非参数算法参数接口2
                    // }
                    // if ( this.activeName == "second") {
                    //     this.single_para_modify_default();//单个参数修改接口
                    // }
                    if ( this.activeName == "fifth") {
                        this.all_para_modify_default();// 总参数修改接口
                    }

                    this.timer_flag_para = setInterval(this.deal_timer_para, 3000) // 3秒执行一次deal_timer_para函数
                    
                }

            }
        }).catch((err) => {
        
        });

    },
    para_out() { // 参数下发处理函数
     request.post('timemonitor/EquipmentRewriteFlag', null, {//该函数用于查询参数是否修改过
          params:
        { 
          applianceid: this.equipment_ID,
        },
        }).then(({ data: response }) => {
            if (response.data.RewriteSuccessFlag == 1) {
                this.$alert('修改设备参数过程中 该设备参数已被他人修改 请刷新当前数据', '错误', {
                    confirmButtonText: '刷新',
                });
                this.Get_Para_info();
            }else if (response.data.RewriteSuccessFlag == 0) {
                if (this.timer_flag_para == null) {

                    this.button_txt_para = '参数下发中...'
                    this.button_state_para = true // 参数下发按钮禁用

                    this.button_state = true // 参数查询按钮禁用

                    this.Flag_para_un_1 = false ;
                    this.Flag_para_un_2 = false ;
                    this.Flag_para_temp = false ;
                    this.Flag_para_all  = false ;
                    this.Flag_para_single = false ;

                    this.para_table_data = false;//参数获取成功
                    if ( this.activeName == "first") {

                        this.temp_para_modify();// 恒温算法参数接口

                    }
                    if ( this.activeName == "third") {

                        this.un_para_modify_1();// 非参数算法参数接口1
                        
                    }
                    if ( this.activeName == "fourth") {

                        this.un_para_modify_2();// 非参数算法参数接口2

                    }
                    if ( this.activeName == "second") {

                        this.single_para_modify();//单个参数修改接口

                    }
                    if ( this.activeName == "fifth") {

                        this.all_para_modify();// 总参数修改接口

                    }

                    this.timer_flag_para = setInterval(this.deal_timer_para, 3000) // 3秒执行一次deal_timer_para函数
                    
                }

            }
        }).catch((err) => {
        
        });

    },
    getDatalist() {// 下拉框参数内容
        for (var i=0;i<this.single_para_list.length;i++) {
            if (this.tableData_para_single[i].para_name == this.tableData_para_single_look[0].para_name) {
                this.tableData_para_single_look[0]={
                    para_name :  this.tableData_para_single[i].para_name,
                    advice_date: this.tableData_para_single[i].advice_date,
                    recent_date: this.tableData_para_single[i].recent_date,
                    modify_date: this.tableData_para_single[i].modify_date,
                    serial_number       : this.tableData_para_single[i].serial_number,
                    code       : this.tableData_para_single[i].code,
                    default_value: this.tableData_para_single[i].default_value,
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
    para_history (row)// 修改历史弹窗
    {
        this.tableData_para_one_code = [];
        request.post('timemonitor/EquipmentHistoryMonitoring', null, {
        params:
        { 
          applianceid: this.equipment_ID,
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
      if(this.$route.query.equipment_ID==null){
         this.equipment_ID=188016488514318
      }else{
this.equipment_ID=this.$route.query.equipment_ID}
  },
};
</script>

<style lang="scss">
    //按键居中处理
    #button_out_para{
        text-align:center;
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
