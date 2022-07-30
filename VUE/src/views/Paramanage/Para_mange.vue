<template>
    <div id="app1">
        <div class="search" align="center" style="margin-top:20px;">
            <span>设备参数记录查询:</span>
            <span>设备:</span>
            <el-autocomplete v-model="equipment_ID"
            :disabled="equipment_state"
            placeholder="请输入设备号"
            style="width:150px"
            clearable
            class="inline-input"
            :fetch-suggestions="querySearch1"
            :trigger-on-focus="false">
            </el-autocomplete>

            <span style="margin-left:30px">日期: </span>

            <el-date-picker
            :disabled="data_state"
            v-model="para_history_time"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd">
            </el-date-picker>

            <el-button type="primary" @click="Get_Para_history_info" :disabled="button_state" style="margin-left:50px;">{{button_content}}</el-button>
        </div>
        <el-main>
            <el-tabs v-model="activeName"  >
                <el-tab-pane label="改写恒温算法2.0相关数据设置默认参数信息" name="first">
                    <!-- <el-radio-group v-model="duanma_list" style="margin-left:20px;width:200px；display:inline" @change="duanma_select">
                        <el-radio-button label="段序号0"></el-radio-button>
                        <el-radio-button label="段序号1"></el-radio-button>
                        <el-radio-button label="段序号2"></el-radio-button>
                        <el-radio-button label="段序号3"></el-radio-button>
                    </el-radio-group> -->
                    <el-table
                    :data="tableData_para_temp_history"
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
                            <template slot-scope="scope">
                                <div  class="txt">0X{{scope.row.NEW_data}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="OLD_data"
                            label="修改前值"
                            width="180">
                            <template slot-scope="scope">
                                <div  class="txt">0X{{scope.row.OLD_data}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="time_data"
                            label="修改时间"
                            width="180">
                            <template slot-scope="scope">
                                <div  class="txt">{{scope.row.time_data}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="编辑"
                            align="center">
                            <template slot-scope="scope">
                                <el-button
                                @click="delete_para_history(scope.row)"
                                type="text"
                                size="small"
                                align="left">
                                    删除
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="改写非调试模式参数第一组" name="third">
                    <el-table
                    :data="tableData_para_un_1_history"
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
                            <template slot-scope="scope_1">
                                <div  class="txt">0X{{scope_1.row.NEW_data}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="OLD_data"
                            label="修改前值"
                            width="180">
                            <template slot-scope="scope_1">
                                <div  class="txt">0X{{scope_1.row.OLD_data}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="time_data"
                            label="修改时间"
                            width="180">
                            <template slot-scope="scope_1">
                                <div  class="txt">{{scope_1.row.time_data}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="编辑"
                            align="center">
                            <template slot-scope="scope">
                                <el-button
                                @click="delete_para_history(scope.row)"
                                type="text"
                                size="small"
                                align="left">
                                    删除
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="改写非调试模式参数第二组" name="fourth">
                    <el-table
                    :data="tableData_para_un_2_history"
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
                            <template slot-scope="scope4_1">
                                <div  class="txt">0X{{scope4_1.row.NEW_data}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="OLD_data"
                            label="修改前值"
                            width="180">
                            <template slot-scope="scope4_2">
                                <div  class="txt">0X{{scope4_2.row.OLD_data}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="time_data"
                            label="修改时间"
                            width="180">
                            <template slot-scope="scope4_3">
                                <div  class="txt">{{scope4_3.row.time_data}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="编辑"
                            align="center">
                            <template slot-scope="scope">
                                <el-button
                                @click="delete_para_history(scope.row)"
                                type="text"
                                size="small"
                                align="left">
                                    删除
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="改写总参数" name="fifth">
                    <el-table
                    :data="tableData_para_single_history"
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
                        <el-table-column
                            label="编辑"
                            align="center">
                            <template slot-scope="scope">
                                <el-button
                                @click="delete_para_history(scope.row)"
                                type="text"
                                size="small"
                                align="left">
                                    删除
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
            </el-tabs>
        </el-main>
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

      button_state: false,

      // 参数类别
      activeName: 'first',
      // 段序号
      //   duanma_list: '段序号0',
      // 参数历史时间信息
      para_history_time: [],
      // 列表信息
      tableData_para_temp_history_look: [],
      tableData_para_temp_history: [],
      tableData_para_un_1_history: [] ,
      tableData_para_un_2_history: [] ,
      tableData_para_single_history: [] ,
    };
  },
  methods:{
    // 格式转化功能区

    /**
    * 时间数据转化
    * @param time
    * @returns time
    */
    dateFormat(time) {
      var date=new Date(time);
      var year=date.getFullYear();
      var month= date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
      var day=date.getDate()<10 ? "0"+date.getDate() : date.getDate();
      var hours=date.getHours()<10 ? "0"+date.getHours() : date.getHours();
      var minutes=date.getMinutes()<10 ? "0"+date.getMinutes() : date.getMinutes();
      var seconds=date.getSeconds()<10 ? "0"+date.getSeconds() : date.getSeconds();
      // 拼接 可改成自己所要的时间格式
      return year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;
    },

    // 组件功能函数区
    /**
    * 历史记录删除
    * @param row.ID row.time row.code
    * @returns massage
    */
    delete_para_history(row) {
      /** * 请求判断 */
      this.$confirm('此操作将永久删除该条记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(row.code)
        console.log(row.time_data)
        request.post( 'sentcmd/delechangeparameter', null, {
          params:
              { 
                applianceid: this.equipment_ID ,
                changecode: row.code ,
                starttime: row.time_data ,
              },
        }).then(({ data: response }) => {
          if (response.data.outcmd == "5") {
            this.Get_Para_history_info()
            this.$message.success('删除成功!')

          } else {
            this.$message.info('删除失败!')
          }
        }).catch((err) => {

        });

      }).catch(() => {

        this.$message.info('已取消删除');
      });

      //   request.post( 'sentcmd/delechangeparameter', null, {
      //     params:
      //       { 
      //         applianceid: this.equipment_ID ,
      //         changeCode: row.code ,
      //         DelTime: row.time_data ,
      //       },
      //   }).then(({ data: response }) => {
      //     if (response.data.outcmd == "5") {
      //       this.$notify.error({
      //         title: '警告',
      //         message: '参数记录为空',
      //         duration: 1000,
      //       }); 
      //     }
      //   }).catch((err) => {

    //   });
    },
    Get_Para_history_info() {

      if (this.equipment_ID.length == 0) {
        this.$message.info('请完善设备号');
      }
      else
      {
        request.post( 'timemonitor/EquipmentHistoryMonitoring', null, {// 请求数据
          params:
                { 
                  applianceid: this.equipment_ID ,
                  starttime: this.para_history_time[0] ,
                  endtime: this.para_history_time[1] ,
                },
        }).then(({ data: response }) => {
          this.tableData_para_temp_history= []
          this.tableData_para_un_1_history= [] 
          this.tableData_para_un_2_history= [] 
          this.tableData_para_single_history= []
          console.log(response.data)
          if (response.data.tableData_para_single_history != null)
          {
            for (let i = 0; i < response.data.tableData_para_single_history.length; i += 1) {
              this.tableData_para_single_history[i] = {
                para_name: response.data.tableData_para_single_history[i].para_name,
                code: response.data.tableData_para_single_history[i].code,
                time_data: response.data.tableData_para_single_history[i].updatetime,
                OLD_data: (response.data.tableData_para_single_history[i].last_value).padStart(2,'0').toUpperCase(),
                NEW_data: (response.data.tableData_para_single_history[i].value).padStart(2,'0').toUpperCase(),
                latest_parameter_flag: response.data.tableData_para_single_history[i].latest_parameter_flag,
              }
            }
            this.tableData_para_single_history = JSON.parse(JSON.stringify(this.tableData_para_single_history));
            console.log(this.tableData_para_single_history);
          }
          // 参数恒温算法 两位 16进制 大写显示
          if (response.data.tableData_para_temp_history != null)
          {
            for (let i = 0; i < response.data.tableData_para_temp_history.length; i += 1) {
              this.tableData_para_temp_history[i] = {
                para_name: response.data.tableData_para_temp_history[i].para_name,
                code: response.data.tableData_para_temp_history[i].code,
                time_data: response.data.tableData_para_temp_history[i].updatetime,
                OLD_data: (response.data.tableData_para_temp_history[i].last_value).padStart(2,'0').toUpperCase(),
                NEW_data: (response.data.tableData_para_temp_history[i].value).padStart(2,'0').toUpperCase(),
                latest_parameter_flag: response.data.tableData_para_temp_history[i].latest_parameter_flag,
              }
            }
            this.tableData_para_temp_history = JSON.parse(JSON.stringify(this.tableData_para_temp_history));
            console.log(this.tableData_para_temp_history);
          }
          // 非参数参数2
          if (response.data.tableData_para_un_2_history != null)
          {
            for (let i = 0; i < response.data.tableData_para_un_2_history.length; i += 1) {
              this.tableData_para_un_2_history[i] = {
                para_name: response.data.tableData_para_un_2_history[i].para_name,
                code: response.data.tableData_para_un_2_history[i].code,
                time_data: response.data.tableData_para_un_2_history[i].updatetime,
                OLD_data: (response.data.tableData_para_un_2_history[i].last_value).padStart(2,'0').toUpperCase(),
                NEW_data: (response.data.tableData_para_un_2_history[i].value).padStart(2,'0').toUpperCase(),
                latest_parameter_flag: response.data.tableData_para_un_2_history[i].latest_parameter_flag,
              }
            }
            this.tableData_para_un_2_history = JSON.parse(JSON.stringify(this.tableData_para_un_2_history));
            console.log(this.tableData_para_un_2_history);
          }
          // 非参数恒温算法1
          if (response.data.tableData_para_un_1_history != null)
          {
            for (let i = 0; i < response.data.tableData_para_un_1_history.length; i += 1) {
              this.tableData_para_un_1_history[i] = {
                para_name: response.data.tableData_para_un_1_history[i].para_name,
                code: response.data.tableData_para_un_1_history[i].code,
                time_data: response.data.tableData_para_un_1_history[i].updatetime,
                OLD_data: (response.data.tableData_para_un_1_history[i].last_value).padStart(2,'0').toUpperCase(),
                NEW_data: (response.data.tableData_para_un_1_history[i].value).padStart(2,'0').toUpperCase(),
                latest_parameter_flag: response.data.tableData_para_un_1_history[i].latest_parameter_flag,
              }
            }
            this.tableData_para_un_1_history = JSON.parse(JSON.stringify(this.tableData_para_un_1_history));
            console.log(this.tableData_para_un_1_history);
          }
          // this.duanma_select();
        }).catch((err) => {

        });
      }
    },
    // 自处理任务区
    // duanma_select() {
    //   var num = 0;
    //   if (this.duanma_list == "段序号0") {
    //     num = 0;
    //   } else if (this.duanma_list == "段序号1") {
    //     num = 1;
    //   } else if (this.duanma_list == "段序号2") {
    //     num = 2;
    //   }else if (this.duanma_list == "段序号3") {
    //     num = 3;
    //   }
    //   console.log(this.tableData_para_temp_history.length / 4)
    //   for (var i = 0; i < ((this.tableData_para_temp_history.length) / 4); i++) {
    //     this.tableData_para_temp_history_look[i] = {
    //       para_name: this.tableData_para_temp_history[4 * i + num].para_name,
    //       advice_date: this.tableData_para_temp_history[4 * i + num].advice_date,
    //       recent_date: this.tableData_para_temp_history[4 * i + num].recent_date,
    //       modify_date: this.tableData_para_temp_history[4 * i + num].modify_date,
    //       code: this.tableData_para_temp_history[4 * i + num].code,
    //       isEdit: false
    //     }
    //   }
    //   this.tableData_para_temp_history_look = JSON.parse(JSON.stringify(this.tableData_para_temp_history_look));
    // },
  },
  created() {
    const dt  = new Date();
    const dt1 = new Date();
    dt.setTime(dt.getTime());
    dt1.setTime(dt.getTime()-604800000);  // 一周
    this.para_history_time[0]=this.dateFormat(dt1); // 一周前的时间
    this.para_history_time[1]=this.dateFormat(dt);  // 今天的时间
  },
};
</script>