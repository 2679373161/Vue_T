<template>
    <div id="app1">
    <div >
    <el-form ref="form"  label-width="80px" style="margin-top:20px;margin-right:40px;">
        <el-form-item label="参数管理">
            <el-button type="primary"   @click="Para_info" :disabled="button_state" >参数信息管理</el-button>
            <!-- <el-button type="primary"   @click="Para_info_save" :disabled="button_state" style="margin-left:30px;" >参数信息备份</el-button> -->
            <el-switch
            v-model="save_state"
            active-text="开启参数备份"
            inactive-text="取消参数备份"
            style="margin-left:30px;"
            @change="Para_info_save">
            </el-switch>
            <!-- <MultipleParaInfoTable></MultipleParaInfoTable> -->
        </el-form-item>
        <el-form-item label="设备筛选">
            <!-- <el-radio-group v-model="State_List" style="margin-left:30px; isplay:inline" size="medium" @change="State_change_deal()">
                <el-radio-button  label="全部"></el-radio-button>
                <el-radio-button  label="未修改"></el-radio-button>
                <el-radio-button  label="修改中"></el-radio-button>
                <el-radio-button  label="修改但失败"></el-radio-button>
                <el-radio-button  label="修改且成功"></el-radio-button>
                <el-radio-button  label="状态异常"></el-radio-button>
            </el-radio-group> -->
            <el-select v-model="State_List" clearable placeholder="请选择" @change="State_change_deal()">
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="设备管理">
            <el-button type="primary"    @click="Choose_Para_rewriteflag" :disabled="button_state" >全选所有设备</el-button>
            <el-button type="primary"    @click="Clear_Para_rewriteflag" :disabled="button_state" style="margin-left:30px;">取消全选所有设备</el-button>
            <el-button type="primary"   @click="Upload_file" :disabled="button_state_para" style="margin-left:30px;">设备管理</el-button>
        </el-form-item>
        <el-form-item >
            <div class="bar" align="center" >
                <span style="margin-left:20px">修改进度:{{loading_string}}</span>
                <!-- success exception -->
                <el-progress :percentage="loading_num" :status="loading_flag"></el-progress>
            </div>
        </el-form-item>
    </el-form>
    </div>
        <!-- <div class="search" align="center" style="margin-top:20px;"> -->
            
            
            <!-- <el-progress type="circle" :percentage="loading_num" color="#8e71c7" style="margin-left:30px;"></el-progress> -->
            <!-- <el-button @click="toExcel" style="margin-left:30px;">导出表格数据到Excel</el-button>    -->
                
        <!-- </div> -->
        
        <!-- <div class="single" align="center" style="margin-top:0px;">
            <span style="margin-right:20px">型号选项:</span>
            <el-autocomplete v-model="equipment_type"
            :disabled="equipment_type_state"
            placeholder="请输入设备型号"
            style="width:150px"
            clearable
            class="inline-input"
            :fetch-suggestions="querySearch1"
            :trigger-on-focus="false">
            </el-autocomplete>
            <el-button type="primary" @click="Para_filter" :disabled="button_state" style="margin-left:20px;">查找</el-button>
        </div> -->
        <el-main style="padding-left:0;padding-right:0;">
            <el-table
            ref="tableData_equipment_info"
            :data="tableData_equipment_info"
            :cell-style="tableRowClasscolor"
            row-key="equipment_ID"
            @select-all="pageSelect"
            @select="rowSelection"
            border
            size="large"
            style="width: 100%"
            height="750"
            >
                <el-table-column  
                    type="index"  
                    align="center" 
                    label="序号" 
                    :index="indexMethod"
                    >
                </el-table-column>
                <el-table-column
                    prop="equipment_ID"
                    label="设备号"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="equipment_State"
                    label="设备状态"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="Equipment_Para_O"
                    label="改前参数值"
                    align="center">
                    <template slot-scope="scope">
                        <div v-if="scope.row.Equipment_Para_O == '-'"  class="txt">{{scope.row.Equipment_Para_O}}</div>
                        <div v-else class="txt">0X{{scope.row.Equipment_Para_O}}</div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="Equipment_Para_N"
                    label="改后参数值"
                    align="center">
                    <template slot-scope="scope">
                        <div v-if="scope.row.Equipment_Para_N == '-'"  class="txt">{{scope.row.Equipment_Para_N}}</div>
                        <div v-else class="txt" >0X{{scope.row.Equipment_Para_N}}</div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="Equipment_Para_T"
                    label="修改的参数"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="equipment_Time"
                    label="上次修改时间"
                    align="center">
                </el-table-column>
                <el-table-column
                    label="操作"
                    align="center">
                    <template slot-scope="scope">
                        <el-button
                        @click="Get_para_info_all(scope.row)"
                        type="text"
                        size="small"
                        align="left">
                            设备详情
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column
                    label="信息管理"
                    align="center">
                    <template slot-scope="scope">
                        <el-button
                        @click="Get_para_info_delet(scope.row)"
                        type="text"
                        size="small"
                        align="left">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column
                    type="selection"
                    :reserve-selection="true"
                    align="left"
                    width="180px">
                </el-table-column>
            </el-table>
        </el-main>
          <el-pagination align="center"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            background
            prev-text="上一页"
            next-text="下一页"
            :current-page.sync="currentPage"
            :page-sizes="[25,50,100]"
            :page-size="perPage"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>

        <el-dialog title="参数信息管理" :visible.sync="outerVisible"  show-close center  fullscreen>
        <el-container class="dialogDiv">
            <el-main>
                <el-tabs v-model="activeName"  >
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
                                    >
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
                                <!-- <el-table-column
                                    prop="recent_date"
                                    label="当前值"
                                    width="180">
                                    <template slot-scope="scope4_1">
                                        <div  class="txt">0X{{scope4_1.row.recent_date}}</div>
                                    </template>
                                </el-table-column> -->
                                <!-- <el-table-column
                                    prop="advice_date"
                                    label="建议值"
                                    width="180">
                                    <template slot-scope="scope4_2">
                                        <div  class="txt">0X{{scope4_2.row.advice_date}}</div>
                                    </template>
                                </el-table-column> -->

                                <el-table-column
                                    prop="modify_date"
                                    label="修改值"
                                    >
                                    <template slot-scope="scope_3">
                                    <el-input v-if="scope_3.row.isEdit" class="item" v-model="scope_3.row.modify_date" placeholder="请输入内容"></el-input>
                                    <div v-else class="txt">0X{{scope_3.row.modify_date}}</div>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                prop="limit_data"
                                label="取值范围"
                                >
                                <!-- <template slot="header" slot-scope="scope">
                                    <el-button type="primary" icon="el-icon-search" size="small" plain @click="change_scale">进制转化</el-button>
                                </template> -->
                            </el-table-column>
                                <!-- <el-table-column
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
                                </el-table-column> -->
                            </el-table>
                        </el-tab-pane>
                        <el-tab-pane label="改写总参数" name="fifth">
                        <el-table
                        :data="tableData_para_single_temp_FF"
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
                                <template slot-scope="scope">
                                        <el-select v-model="scope.row.para_name"  @change="getDatalist_temp_parp(value)" placeholder="请选择" filterable allow-create>
                                        <el-option v-for="item in single_para_list_temp " :key="item.id" :label="item.label" :value="item.value">
                                        </el-option>
                                        </el-select>
                                    </template>
                            </el-table-column>
                            <!-- <el-table-column
                                prop="default_value"
                                label="默认参数"
                                width="180">
                                <template slot-scope="scope5_1">
                                    <div  class="txt">0X{{scope5_1.row.default_value}}</div>
                                </template>
                            </el-table-column> -->
                            <!-- <el-table-column
                                prop="recent_date"
                                label="当前值"
                                width="180">
                                <template slot-scope="scope5_1">
                                    <div  class="txt">0X{{scope5_1.row.recent_date}}</div>
                                </template>
                            </el-table-column> -->

                            <el-table-column
                                prop="modify_date"
                                label="修改值"
                                >
                                <template slot-scope="scope_2">
                                <el-input v-if="scope_2.row.isEdit" class="item" v-model="scope_2.row.modify_date" placeholder="请输入内容"></el-input>
                                <div v-else class="txt">0X{{scope_2.row.modify_date}}</div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="limit_data"
                                label="取值范围"
                                >
                                <!-- <template slot="header" slot-scope="scope">
                                    <el-button type="primary" icon="el-icon-search" size="small" plain @click="change_scale">进制转化</el-button>
                                </template> -->
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                    </el-tabs>
            </el-main>
    
        </el-container>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" style="margin-left:30px" size="large" :disabled="button_state_para" round @click="para_out">批量修改选中设备</el-button>
             <el-switch
            v-model="Start_state"
            active-text="打开开关机协议"
            inactive-text="关闭开关机协议"
            style="margin-left:30px;"
            @change="Para_info_start">
            </el-switch>
        </span>
    </el-dialog>
    <el-dialog title="设备信息管理" :visible.sync="outerVisible_upload"  show-close center  >
        <el-tabs v-model="activeName"  >
            <el-tab-pane label="Excel上传设备信息" name="first">
            <el-container class="dialogDiv">
                    <span>
                        <el-upload ref="upload"
                        accept=".csv,.xls,.xlsx"
                        action="http://47.98.170.3:443/api/api/timemonitor/GetUpdata"
                        name="file_G"
                        :auto-upload="false"
                        :multiple="false"
                        :file-list="fileList"
                        :before-upload="beforeUpload"
                        :on-success ="successUpload"
                        :on-remove="fileRemove"
                        :on-change="fileChange">
                            <el-button size="large" type="primary">选择文件</el-button>
                            <div slot="tip" >一次只能上传一个csv文件，且不超过10M</div>
                        </el-upload>
                    </span>

            </el-container>
            <el-container class="dialogDiv" style="margin-top:20px;">
                <el-button size="large" @click="closeDialog">取 消</el-button>
                <el-button type="primary" size="large" :disabled="uploadDisabled" @click="submitUpload">上 传</el-button>
                <!-- <download-excel
                :fields = "json_fields"
                :data="tableData_equipment_info_default"
                :before-generate = "startDownload"
                :before-finish = "finishDownload"
                name="listdata"
                type="xlsx"
                style="margin-left:10px">
                    <el-button>导出Excel模板</el-button>
                </download-excel> -->
            </el-container>
        </el-tab-pane>
        <el-tab-pane label="手动上传" name="second">
            <el-button size="mini" icon="el-icon-plus" @click="handleAdd()" type="primary">添加</el-button>
             <el-button
              type="success"
              icon="el-icon-delete"
              size="mini"
              @click="handleDeleteDetails"
            >删除</el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="handleDeleteAllDetails"
            >清空</el-button>
            <el-button size="mini" type="primary" @click="Upload_file_out"  style="margin-left:30px;">设备信息上传</el-button>
            <el-table
            :data="tableData_upload"
            size="large"
            style="width: 100%"
            height="500"
            :row-class-name="rowClassName"
            @selection-change="handleDetailSelectionChange"
            @cell-mouse-enter="handleCellEnter"
            @cell-mouse-leave="handleCellLeave"
            ref="tb"
            >
             <el-table-column type="selection" width="30" align="center" />
                <el-table-column label="序号" align="center" prop="xh" width="50"></el-table-column>
                <el-table-column
                    prop="equipment_ID"
                    label="设备编号"
                    >
                    <template slot-scope="scope_2">
                    <el-input v-if="scope_2.row.isEdit" class="item" v-model="scope_2.row.equipment_ID" placeholder="请输入设备ID"></el-input>
                    <div v-else class="txt">{{scope_2.row.equipment_ID}}</div>
                    </template>
                </el-table-column>
            </el-table>
            
        </el-tab-pane>
        <el-tab-pane label="手动删除" name="third">
            <el-button size="mini" type="primary" @click="Upload_mysql_delete"  style="margin-left:30px;">设备信息删除</el-button>
            <el-table
            :data="tableData_equipment_info_dele"
            size="large"
            style="width: 100%"
            height="500"
             ref="csf"
            :row-class-name="rowClassNamenum"
            @selection-change="handleDetailSelectionChanged"
            @cell-mouse-enter="handleCellEnter"
            @cell-mouse-leave="handleCellLeave"
           row-key="equipment_ID"
            >
             <!-- <el-table-column type="selection" width="30" align="center" > </el-table-column> -->
                <el-table-column
                    type="selection"
                    :reserve-selection="true"
                    align="center"
                    width="30">
               </el-table-column> 
                <el-table-column   type="index"   label="序号" align="center"  width="50"  :index="indexMethod"></el-table-column>
               
                <el-table-column
                    prop="equipment_ID"
                    label="设备编号"
                    >
                    <!-- <template slot-scope="scope_2">
                    <el-input v-if="scope_2.row.isEdit" class="item" v-model="scope_2.row.equipment_ID" placeholder="请输入设备ID"></el-input>
                    <div v-else class="txt">{{scope_2.row.equipment_ID}}</div>
                    </template> -->
                </el-table-column>
                 
            </el-table>
            
            <el-pagination align="center"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            background
            prev-text="上一页"
            next-text="下一页"
            :current-page.sync="currentPage"
            :page-sizes="[25,50,100]"
            :page-size="perPage"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
        </el-tab-pane>

          <el-tab-pane label="Excel上传删除设备信息" name="six">
            <el-container class="dialogDiv">
                    <span>
                        <el-upload ref="uploadelece"
                        accept=".csv,.xls,.xlsx"
                        action="http://47.98.170.3:443/api/api/timemonitor/GetDelete"
                        name="file_D"
                        :auto-upload="false"
                        :multiple="false"
                        :file-list="fileList"
                        :before-upload="beforeUpload"
                        :on-success ="successdelece"
                        :on-remove="fileRemove"
                        :on-change="fileChange">
                            <el-button size="large" type="primary">选择删除文件</el-button>
                            <div slot="tip" >一次只能上传一个csv文件，且不超过10M</div>
                        </el-upload>
                    </span>

            </el-container>
            <el-container class="dialogDiv" style="margin-top:20px;">
                <el-button size="large" @click="closeDialog">取 消</el-button>
                <el-button type="primary" size="large" :disabled="uploadDisabled" @click="submitUploaddelect">删 除</el-button>

            </el-container>
        </el-tab-pane>

    </el-tabs>
    </el-dialog>
    <el-dialog title="设备参数详情" :visible.sync="outerVisible_para_info"  show-close center  fullscreen>
        <MultipleParaInfoTable :ID_info ="ID_row_info"></MultipleParaInfoTable>
    </el-dialog>
</div>

</template>

<script>
import request from '@/utils/request';

import service from '@/utils/request';

import JsonExcel from 'vue-json-excel';

import transform from '@/views/Paramanage/exportToExcel';
import MultipleParaInfoTable from '@/components/MultipleParaInfoTable';

let pageselect = []
export default {
  components: {
    'download-excel': JsonExcel,
    MultipleParaInfoTable,
  
  },
  data() {
    return {
      // 筛选表信息
      State_List: '全部',
      options: [{
          value: '全部',
          label: '全部'
        },{
          value: '未修改',
          label: '未修改'
        }, {
          value: '修改中',
          label: '修改中'
        }, {
          value: '修改失败',
          label: '修改失败'
        }, {
          value: '修改成功',
          label: '修改成功'
        }, {
          value: '状态异常',
          label: '状态异常'
        }],
      // 列表信息
      tableData_equipment_info_save:[],// 后端返回数组
      tableData_equipment_info_nothing:[],// 无修改数组
      tableData_equipment_info:[],
      tableData_equipment_info_dele:[],
      tableData_para_single_look:[{
        para_name: "",
      }],
      tableData_para_single:[],
      // 单参数
      tableData_para_single_temp_FF:[],
      // 单参数
      single_para_list: [],
      single_para_list_temp: [
          {
            label: "FF",
            value: "FF"
          },
          {
            label: "HS",
            value: "HS"
          },
      ],
      // 页码信息
      currentPage: 1,
      temp_currentPage:1,
      total: 1,
      perPage: 100,// 每页显示条数
      // 弹框信息
      outerVisible:false,
      outerVisible_upload:false,
      outerVisible_para_info:false,
      activeName:'second',
      loading_flag:'',
      loading_num: 0,
      loading_string:'',
      button_state_para:false,
      button_state:false,
      tableData_equipment_info_default:[{
          equipment_ID: "",
      }],
      json_fields: { 
        applianceid: 'equipment_ID',
        // 设备状态: 'equipment_State',
        // 上次修改时间: 'equipment_Time',
        // 是否修改: 'Isrewirted',
        // 段序号
      },
      uploadDisabled : true ,// 未选择文件则禁用上传按钮
      fileList : [], // 选择的文件列表
      tableData_upload:[{
        equipment_ID:'',
        isEdit: false,
      }],
      checkedDetail:[],
      ID_row_info:'',
      save_state: false ,
      Start_state: false,
    };
  },
  methods:{


    //设备信息删除
    handleDetailSelectionChanged(selection) {
       this.checkedDetail_d=[] 
        for (var i = 0;i < selection.length; i++) {
          this.checkedDetail_d[i] = selection[i].equipment_ID
         if (this.tableData_equipment_info_dele[i].Isrewirted == true) {
           this.tableData_equipment_info_dele[i].Isrewirted =true
          this.$refs.tableData_equipment_info_dele.toggleRowSelection(this.tableData_equipment_info_dele[i],true);
          console.log("true")
        } else {
 
          console.log("false")
        }                
      }      
    },
    rowClassNamenum({ row, rowIndex }) {

        row.num = rowIndex + 1;
    },
        Upload_mysql_delete(selection){
    
    this.$confirm('数据库中删除输入的设备, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {
        this.$message.info('信息删除中');       
        let pageselect_info_2 = []
        for (var i = 0;i < this.checkedDetail_d.length;i++) {       
                pageselect_info_2[i] = this.checkedDetail_d[i]         
        }
        console.log(pageselect_info_2)
        request.post( 'timemonitor/EquipmentInfoDelete', null, {
        params:
          {
            applianceid: pageselect_info_2,
          },
      }).then(({ data: response }) => {
        console.log(response)
          this.$message.info('删除完成共'+response.data.upload_ok +"台");
          console.log(response)
          //刷新表格数据逻辑未写入
          this.table_data_refresh()
          //刷新表格数据逻辑未写入
      }).catch((err) => {
      });

    }).catch(() => {
        
        this.$message.info('已取消操作');
       
    });
    },
    submitUploaddelect() {
        
       this.$refs.uploadelece.submit()
    },
    successdelece(){
     
        this.outerVisible_upload = false
        this.uploadDisabled = false //未选择文件则禁用上传按钮
        this.$message.success('success')
        this.table_data_refresh();
    },
    ////////
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
    Get_para_info_all(row)
    {
        this.ID_row_info = row;
        this.outerVisible_para_info =true
    },
    Get_para_info_delet(row)
    {
        
        var temp_id = [row.equipment_ID]
         this.$confirm('是否删除该设备?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            message: '此操作将删除设备'+row.equipment_ID+'的所有信息, 是否继续?',
        }).then(() => {
            request.post( 'timemonitor/EquipmentInfoDelete', null, {
            params:
            {
                applianceid: temp_id,
            },
            }).then(({ data: response }) => {
                this.$message.info('删除完成');
                //刷新表格数据逻辑未写入
                this.table_data_refresh()
                //刷新表格数据逻辑未写入
            }).catch((err) => {
            });

        }).catch(() => {
            this.$message.info('已取消操作');
        });
    },
    selection(data) {
      // eslint-disable-next-line no-plusplus
      for (var i = 0;i < this.tableData_equipment_info.length; i++) {
        // eslint-disable-next-line eqeqeq
        // 此处handleflag如何来的？？
        // 后端传输给出
        if (this.tableData_equipment_info[i].Isrewirted == true) {
          this.$refs.tableData_equipment_info.toggleRowSelection(this.tableData_equipment_info[i],true);
        } else {
          this.$refs.tableData_equipment_info.toggleRowSelection(this.tableData_equipment_info[i],false);
        }
      }
      console.log( data)
    },
    // 信息上传
     handleAdd(){
    if (this.tableData_upload == undefined) {
        this.tableData_upload = new Array();
      }
      let obj = {};
      obj.equipment_ID = "";
      obj.isEdit = false;

      this.tableData_upload.push(obj);
    },
    handleDetailSelectionChange(selection) {
        console.log(selection.pop())
      if (selection.length > 1) {
        this.$refs.tb.clearSelection();
        this.$refs.tb.toggleRowSelection(selection.pop());
      } else {
        this.checkedDetail = selection;
      }
    },
    handleDeleteDetails() {
      if (this.checkedDetail.length == 0) {
        this.$alert("请先选择要删除的数据", "提示", {
          confirmButtonText: "确定",
        });
      } else {
        this.tableData_upload.splice(this.checkedDetail[0].xh - 1, 1);
      }
    },
    handleDeleteAllDetails() {
        this.tableData_upload = undefined;
    },
    rowClassName({ row, rowIndex }) {

        row.xh = rowIndex + 1;
    },
    Upload_file_out(){
    this.$confirm('向数据库中写入表内全部设备, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {
        this.$message.info('信息写入中');
        let pageselect_info = []
        for (var i = 0;i < this.tableData_upload.length;i++) {
          pageselect_info[i] = this.tableData_upload[i].equipment_ID
        }
        request.post( 'timemonitor/EquipmentInfoCreat', null, {
        params:
          {
            applianceid: pageselect_info,
          },
      }).then(({ data: response }) => {
          this.$message.info('写入完成');
          console.log(response)
          //刷新表格数据逻辑未写入
          this.table_data_refresh()
          //刷新表格数据逻辑未写入
      }).catch((err) => {
      });

    }).catch(() => {
        
        this.$message.info('已取消操作');
    });
    },
    Upload_file(){ //上传文件管理界面
      this.outerVisible_upload = true
    },
    // 取消
    closeDialog() {
      this.$refs.upload.clearFiles() //清除上传文件对象
      this.$refs.uploadelece.clearFiles() //清除上传文件对象
      this.fileList = [] //清空选择的文件列表
      this.outerVisible_upload = false
    },
        // 点击上传：手动上传到服务器，此时会触发组件的http-request
        
    submitUpload() {
        
       this.$refs.upload.submit()
    },
        // 自定义上传方法，param是默认参数，可以取得file文件信息，具体信息如下图
    uploadHttpRequest(param) {
      const formData = new FormData() //FormData对象，添加参数只能通过append('key', value)的形式添加
      formData.append('file', param.file) //添加文件对象
      formData.append('uploadType', param.file.type)
      request.post( 'timemonitor/GetUpdata', null, {
        params:
        {
          file: formData,
        },
      }).then(({ data: response }) => {
        if (response.data.success == "1") {
          this.$message.success('上传文件完成');
          this.table_data_refresh()
        }
      }).catch((err) => {

      });
      // axios.post(url, formData)
      //     .then( res => {
      //         const { data: { code, mark } } = res
      //         if(code === 0) {
      //             param.onSuccess()  // 上传成功的文件显示绿色的对勾
      //             this.uploadMark = mark
      //         }
      //         return this.countData(this.uploadMark) //根据响应的 mark 值调用统计结果接口，返回一个promise以便进行链式调用
      //     })
      //     .then( res => { //链式调用，统计结果的响应
      //         const { data: { code, data } } = res
      //         if(code === 0) {
      //             console.log('统计结果', data)
      //         }
      //     })
      //     .catch( err => {
      //         console.log('失败', err)
      //         param.onError() //上传失败的文件会从文件列表中删除
      //     })
    },
    // 上传文件之前的钩子：判断上传文件格式、大小等，若返回false则停止上传
    successUpload(){
        this.outerVisible_upload = false
        this.uploadDisabled = false //未选择文件则禁用上传按钮
        this.$message.success('success')
        this.table_data_refresh();
    },
    beforeUpload(file) {
      //文件类型
      const isType = file.type === 'application/vnd.ms-excel' || 'text/csv'
      console.log(file.type)
      const isTypeComputer = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      const fileType = isType || isTypeComputer
      if(!fileType) {
        this.$message.error('上传文件只能是xls/xlsx/csv格式!')
      }

      // 文件大小限制为10M
      const fileLimit = file.size / 1024 / 1024 < 10;
      if(!fileLimit) {
        this.$message.error('上传文件大小不超过10M!');
      }
      this.$message.info('设备信息上传中');
      this.uploadDisabled = true //未选择文件则禁用上传按钮
      return fileType && fileLimit
    },
        // 文件发生改变
    fileChange(file, fileList) {
      if(fileList.length < 1) {
        this.uploadDisabled = true //未选择文件则禁用上传按钮
      } else {
        this.uploadDisabled = false //未选择文件则禁用上传按钮
      }
      if (fileList.length > 0) {
        this.fileList = [fileList[fileList.length - 1]] // 展示最后一次选择的文件
      }
    },
    // 移除选择的文件
    fileRemove(file, fileList) {
      if(fileList.length < 1) {
        this.uploadDisabled = true //未选择文件则禁用上传按钮
      }
    },
      // 组件功能函数区
    toExcel() {
      // 调用我们封装好的方法，传3个参数过去，分别为：数据，文件名，回到函数(可根据自己需求决定回调是否需要)
      this.$confirm('请选择导出数据', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '当页数据',
        cancelButtonText: '全部数据'
      })
        .then(() => {
          this.$message({
            type: 'info',
            message: '当页数据导出'
          });
          transform(this.tableData_equipment_info, '多设备修改状态信息本页', this.callback)  
        })
        .catch(action => {
            
          this.$message({
            type: 'info',
            message: action === 'cancel'
              ? '全部数据导出'
              : '取消导出数据'
          })
          if (action =='cancel' ) {
            transform(this.tableData_equipment_info, '多设备修改状态信息全部', this.callback) 
          }
        });
    },

    Para_info()
    {
      request.post( 'timemonitor/EquipmentIndexMonitoring', null, {
        params:
          {
            multiple_falg: "1",
          },
      }).then(({ data: response }) => {
        console.log(response)
        for (var i=0;i<response.data.tableData_para_single_out.length;i++) {
          this.tableData_para_single[i] = {
            para_name: response.data.tableData_para_single_out[i].para_name,
            code     : response.data.tableData_para_single_out[i].code,
            serial_number     :  response.data.tableData_para_single_out[i].serial_number,
            Min_limit: (response.data.tableData_para_single_out[i].Min_limit).padStart(2,'0').toUpperCase(),
            Max_limit: (response.data.tableData_para_single_out[i].Max_limit).padStart(2,'0').toUpperCase(),
            limit_data : "0X"+(response.data.tableData_para_single_out[i].Min_limit).padStart(2,'0').toUpperCase() + "-"+"0X"+(response.data.tableData_para_single_out[i].Max_limit).padStart(2,'0').toUpperCase() ,
            isEdit: false 
          }
          if (response.data.tableData_para_single_out[i].para_name == "FF") {
              this.tableData_para_single_temp_FF[0] = {
                    para_name: response.data.tableData_para_single_out[i].para_name,
                    code     : response.data.tableData_para_single_out[i].code,
                    serial_number     :  response.data.tableData_para_single_out[i].serial_number,
                    Min_limit: (response.data.tableData_para_single_out[i].Min_limit).padStart(2,'0').toUpperCase(),
                    Max_limit: (response.data.tableData_para_single_out[i].Max_limit).padStart(2,'0').toUpperCase(),
                    limit_data : "0X"+(response.data.tableData_para_single_out[i].Min_limit).padStart(2,'0').toUpperCase() + "-"+"0X"+(response.data.tableData_para_single_out[i].Max_limit).padStart(2,'0').toUpperCase() ,
                    isEdit: false 
              }
              this.tableData_para_single_temp_FF=JSON.parse(JSON.stringify(this.tableData_para_single_temp_FF)); 
          }
          this.single_para_list[i]={
            value:response.data.tableData_para_single_out[i].para_name,
            label:response.data.tableData_para_single_out[i].para_name,
          }

        }
        this.single_para_list=JSON.parse(JSON.stringify(this.single_para_list)); 
        this.tableData_para_single=JSON.parse(JSON.stringify(this.tableData_para_single)); 
        this.getDatalist();
        this.outerVisible = true
      }).catch((err) => {
      });

    },
    // 表格监控选项每页表头全选触发弹框函数
    pageSelect(selection) {
      this.$confirm('此操作将改变本页所有设备修改状态, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        pageselect = []
        for (var i = 0;i < this.tableData_equipment_info.length;i++) {
          pageselect[i] = this.tableData_equipment_info[i].equipment_ID
        }

        if (selection.length == 0) {
          this.modifydata('pageall',pageselect,'rewriteflag_temp','0','','')
        //   pageselectflag = "0"
        } else {
          this.modifydata('pageall',pageselect,'rewriteflag_temp','1','','')
        //   pageselectflag = "1"
        }
        // this.modifydata('select_all','','rewriteflag_temp','0','','')
        this.$message.info('修改中');
      }).catch(() => {
        console.log("222")
        this.table_data_refresh();
        this.$message.info('已取消操作');
      });
      console.log(selection)
    },
    // 表格修改选项单行点击触发函数
    rowSelection(selection, row) {
    //   console.log(selection,row)
      let selected = selection.length && selection.indexOf(row) !== -1
	      console.log(selected)  // true就是选中，0或者false是取消选中
      if (selected == false) {
        // this.popoverflag=true
        // this.open(row)
        this.modifydata('single',row.equipment_ID,'rewriteflag_temp','0','','')
      } else {
        this.modifydata('single',row.equipment_ID,'rewriteflag_temp','1','','')
      }
    },
    // 表格底色
    tableRowClasscolor({row, column}) {
      if(column.label=="设备状态") {
        if (row.equipment_State == "修改成功") {
          return 'background: #96e6a1';
        } 
        if (row.equipment_State == "修改失败") {

          return 'background: #ffb199';
        } 
        if(row.equipment_State == "状态异常") {

          return 'background: #a706068c';
        }
        if(row.equipment_State == "等待修改") {

          return 'background: #1981196c';
        } 
        return 'background: #9c9c9c8c';
      }

    },
    State_change_deal() {
      this.table_data_refresh();
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.perPage=val;
      this.currentPage=1;
      this.temp_currentPage = 1;
      this.table_data_refresh();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage=val;
      this.temp_currentPage = val;
      this.table_data_refresh();
 
    },
    indexMethod(index) {
    //   this.temppagenum=this.currentPage; //必须要 要不页面页数会出错
      return (this.currentPage - 1) * this.perPage + index + 1;
    },
    para_out(){
    if (this.activeName == 'second') {
      if (this.tableData_para_single_look[0].para_name == "") {
        this.$message.info('请补全参数信息!')
        return
      }
      if (this.tableData_para_single_look[0].modify_date != "") {
        this.$confirm('此操作将使用单参数下发协议批量修改参数记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          message: '此操作将使用单参数下发协议批量修改参数记录, 是否继续?'+this.tableData_para_single_look[0].para_name +'修改为0X'+(this.tableData_para_single_look[0].modify_date).padStart(2,'0').toLowerCase(),
          type: 'warning'
        }).then(() => {
            request.post( 'sentcmd/sumnoparasettingfirstcheck', null, { //待定
            params:
          {
            pattern: 3,
            index:          (this.tableData_para_single_look[0].serial_number).padStart(2,'0').toLowerCase(),
            singlemin:      this.tableData_para_single_look[0].singlemin,
            singlemax:      this.tableData_para_single_look[0].singlemax,
            value:          (this.tableData_para_single_look[0].modify_date).padStart(2,'0').toLowerCase(),
          },
          }).then(({ data: response }) => {
        console.log(response )
        if (response.data.errflag == "1") {
          this.modifydata('','','para_out','',(this.tableData_para_single_look[0].modify_date).padStart(2,'0').toLowerCase(),(this.tableData_para_single_look[0].serial_number).padStart(2,'0').toLowerCase())
          this.outerVisible = false
          this.$message.info('下发中');
          }else if (response.data.errflag == "2") {
              this.button_state_para = false;
              this.button_state = false;

              clearInterval(this.timer_flag_para)

              this.timer_flag_para = null

              this.$alert('单独改写参数中存在非法输入 请修改格式', '失败', {
                confirmButtonText: '确定',
              });

                

                
              // this.outerVisible=false;
            }else if (response.data.errflag == "3") {

                

              this.button_state_para = false;
              this.button_state = false;
              clearInterval(this.timer_flag_para)

              this.timer_flag_para = null

              this.$alert('单独改写参数中下发失败 改写参数与返回参数不同请再次尝试', '失败', {
                confirmButtonText: '确定',
              });

                

                
              // this.outerVisible=false;
            }else if (response.data.errflag == "4") {

                

              this.button_state_para = false;
              this.button_state = false;
              clearInterval(this.timer_flag_para)

              this.timer_flag_para = null

              this.$alert('单独改写参数中输入超出范围', '失败', {
                confirmButtonText: '确定',
              });
            }
              
          }).catch((err) => {
              
          });
        }).catch(() => {
          this.$message.info('已取消参数下发');
        });

      } else {
        this.$message.info('请补全参数信息!')
      }
    }else if (this.activeName == 'fifth') {
        if (this.tableData_para_single_temp_FF[0].modify_date != "") {
        this.$confirm('此操作将使用多参数参数下发协议批量修改参数记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          message: '此操作将使用多参数参数下发协议批量修改参数记录, 是否继续?'+this.tableData_para_single_temp_FF[0].para_name +'修改为0X'+(this.tableData_para_single_temp_FF[0].modify_date).padStart(2,'0').toLowerCase(),
          type: 'warning'
        }).then(() => {
            request.post( 'sentcmd/sumnoparasettingfirstcheck', null, { //待定
            params:
          {
            pattern: 3,
            index:          (this.tableData_para_single_temp_FF[0].serial_number).padStart(2,'0').toLowerCase(),
            singlemin:      this.tableData_para_single_temp_FF[0].Min_limit,
            singlemax:      this.tableData_para_single_temp_FF[0].Max_limit,
            value:          (this.tableData_para_single_temp_FF[0].modify_date).padStart(2,'0').toLowerCase(),
          },
          }).then(({ data: response }) => {
              console.log(response )
        if (response.data.errflag == "1") {
          this.modifydata('','','para_out','',(this.tableData_para_single_temp_FF[0].modify_date).padStart(2,'0').toLowerCase(),(this.tableData_para_single_temp_FF[0].serial_number).padStart(2,'0').toLowerCase())
          this.outerVisible = false
          this.$message.info('下发中');
          }else if (response.data.errflag == "2") {

                

              this.button_state_para = false;
              this.button_state = false;
              clearInterval(this.timer_flag_para)

              this.timer_flag_para = null

              this.$alert('单独改写多参数中存在非法输入 请修改格式', '失败', {
                confirmButtonText: '确定',
              });

                

                
              // this.outerVisible=false;
            }else if (response.data.errflag == "3") {

                

              this.button_state_para = false;
              this.button_state = false;
              clearInterval(this.timer_flag_para)

              this.timer_flag_para = null

              this.$alert('单独改写多参数中下发失败 改写参数与返回参数不同请再次尝试', '失败', {
                confirmButtonText: '确定',
              });

                

                
              // this.outerVisible=false;
            }else if (response.data.errflag == "4") {

                

              this.button_state_para = false;
              this.button_state = false;
              clearInterval(this.timer_flag_para)

              this.timer_flag_para = null

              this.$alert('单独改写多参数中输入超出范围', '失败', {
                confirmButtonText: '确定',
              });
            }
              
          }).catch((err) => {
              
          });
        }).catch(() => {
          this.$message.info('已取消参数下发');
        });    
      } else {
        this.$message.info('请补全参数信息!')
      }
        
    }
        
    },

    // 自处理任务区
    Para_info_start(){
        if (this.Start_state == true) {
            this.$confirm('此功能开启后将应用开关机协议，是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {

                this.$message.info('功能已开启');
            }).catch(() => {
                this.Start_state = false
                this.$message.info('已取消');
            });      
        } else {
            this.$confirm('此功能关闭后将关闭开关机协议，是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {

                this.$message.info('功能已开启');
            }).catch(() => {
                this.Start_state = true
                this.$message.info('已取消');
            });     
        }
    },
    Para_info_save(){
        if (this.save_state == true) {
            this.$confirm('此功能开启后将自动备份设备未修改前参数信息，是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {

                this.$message.info('功能已开启');
            }).catch(() => {
                this.save_state = false
                this.$message.info('已取消');
            });      
        } else {
            this.$confirm('此功能关闭后将不会自动备份设备未修改前参数信息，是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {

                this.$message.info('功能已开启');
            }).catch(() => {
                this.save_state = true
                this.$message.info('已取消');
            });     
        }
       
    },
    Choose_Para_rewriteflag(){//全选在管设备
      this.$confirm('此操作将选中所有在管设备, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.modifydata('select_all','','rewriteflag_temp','1','','')
        this.$message.info('修改中');
      }).catch(() => {
        this.$message.info('已取消修改');
      }); 
    },
    Clear_Para_rewriteflag(){//清空在管设备
      this.$confirm('此操作将取消选中所有在管设备, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.modifydata('select_all','','rewriteflag_temp','0','','')
        this.$message.info('修改中');
      }).catch(() => {
        this.$message.info('已取消修改');
      }); 
    },
    // 向后端发送修改标志位
    // para: num_falg   "pageall" or "select_all" or "single"
    //       id          equipment_ID for row and "single"

    //       fun        "rewriteflag_temp" or "para_out"
    //       value      "1" or "0"
    //       value_para "para_num"
    //       index      "indexvalue"    
    modifydata(num_falg,id,fun,value,value_para,index) {
      request.post( 'timemonitor/EquipmentRewriteFlagTempModify', null, {
        params:
          {
            num_falg: num_falg,
            applianceid: id,
            rewriteflag_temp: value,
            fun: fun,
            value_para: value_para,
            index: index,
          },
      }).then(({ data: response }) => {
        console.log(response)
        if (response.data.para_out_flag == "1") { // 参数下发请求
          this.para_out_single();
          this.loading_string = "数据请求中"
          this.loading_flag=''
          if(this.timer_flag_para == null) {
            // this.button_txt_para_default = "参数下发中..."
            this.button_state_para = true
            this.button_state = true;
            this.timer_flag_para = setInterval(this.busy_table_info_get,5000) // 1秒执行一次deal_timer_para函数
          }
          this.$message.success('下发完成，修改中');
        }
        if (response.data.all_change_flag == "1") { // 清空或全选标志
          this.$message.success('修改完成');
          this.table_data_refresh();
        }
        if (response.data.page_change_flag == "1") {
            this.$message.success('修改完成');
            this.table_data_refresh();
        }
      }).catch((err) => {
      });
    },
    //参数下发 
    para_out_single()
    {
        var temp_start_state = "0"
        var temp_save_state = "0"
        if (this.Start_state == true) {
            temp_start_state = "1"
        } else {
            temp_start_state = "0"
        }  
        if (this.save_state == true) {
            temp_save_state = "1"
        } else {
            temp_save_state = "0"
        }  
        if (this.activeName == 'second') {
            request.post( 'sentcmd/batchonerewrite', null, {
            params:
            {
                Starent :       temp_start_state,
                Backups:        temp_save_state,
                index:          (this.tableData_para_single_look[0].serial_number).padStart(2,'0').toLowerCase(),
                singlemin:      this.tableData_para_single_look[0].singlemin,
                singlemax:      this.tableData_para_single_look[0].singlemax,
                value:          (this.tableData_para_single_look[0].modify_date).padStart(2,'0').toLowerCase(),
            },
            }).then(({ data: response }) => {
            }).catch((err) => {
            });    
        }else if (this.activeName == 'fifth') {
            request.post( 'sentcmd/batchsumpara', null, {
            params:
            {
                Starent :       temp_start_state,
                Backups:        temp_save_state,
                index:          (this.tableData_para_single_temp_FF[0].serial_number).padStart(2,'0').toLowerCase(),
                singlemin:      this.tableData_para_single_temp_FF[0].Min_limit,
                singlemax:      this.tableData_para_single_temp_FF[0].Max_limit,
                value:          (this.tableData_para_single_temp_FF[0].modify_date).padStart(2,'0').toLowerCase(),
            },
            }).then(({ data: response }) => {
            }).catch((err) => {
            });
        }
        
    },
    //0全部1未修改3修改但失败4修改且成功5状态异常
    table_data_refresh()
    {

      this.$refs.tableData_equipment_info.clearSelection();//切记清空
      this.tableData_equipment_info=[]
      this.tableData_equipment_info_save=[]
      if (this.State_List == '全部') {
        this.refresh_flage = 0
      }else if (this.State_List == '未修改') {
        this.refresh_flage = 1
      }else if (this.State_List == '修改中') {
        this.refresh_flage = 2
      }else if (this.State_List == '修改失败') {
        this.refresh_flage = 3
      }else if (this.State_List == '修改成功') {
        this.refresh_flage = 4
      }else if (this.State_List == '状态异常') {
        this.refresh_flage = 5
      }
        
      request.post( 'timemonitor/MultipleEquipmentInfo', null, {
        params:
            {
              currentPage: this.currentPage,
              perPage:     this.perPage,
              refresh_flage: this.refresh_flage,
            },
      }).then(({ data: response }) => {
        this.tableData_equipment_info_save = JSON.parse(JSON.stringify(response.data.tableData_equipment_info));
        this.total = response.data.count
        for (var i = 0; i < ((this.tableData_equipment_info_save.length)); i++) {
          if (this.tableData_equipment_info_save[i].Isrewirted == "true") {
            this.tableData_equipment_info_save[i].Isrewirted = true
          } else {
            this.tableData_equipment_info_save[i].Isrewirted = false
          }
        }
        this.tableData_equipment_info = JSON.parse(JSON.stringify(this.tableData_equipment_info_save));
        console.log(this.tableData_equipment_info)
        this.tableData_equipment_info_dele =[];
        for (var i = 0;i < this.tableData_equipment_info.length; i++) {
         this.tableData_equipment_info_dele[i] =this.tableData_equipment_info[i]
       }
        this.selection(this.tableData_equipment_info)

      }).catch((err) => {

      });
    },
    getDatalist_temp_parp(){
      for (var i=0;i<this.single_para_list.length;i++) {
        if (this.tableData_para_single[i].para_name == this.tableData_para_single_temp_FF[0].para_name) {

          this.tableData_para_single_temp_FF[0]={
            para_name :  this.tableData_para_single[i].para_name,
            // advice_date: this.tableData_para_single[i].advice_date,
            // recent_date: this.tableData_para_single[i].recent_date,
            // modify_date: this.tableData_para_single[i].modify_date,
            modify_date: "",
            serial_number       : this.tableData_para_single[i].serial_number,
            // default_value: this.tableData_para_single[i].default_value,
            code       : this.tableData_para_single[i].code,
            limit_data : "0X"+this.tableData_para_single[i].Min_limit + "-"+"0X"+this.tableData_para_single[i].Max_limit ,
            singlemax:this.tableData_para_single[i].Max_limit,
            singlemin:this.tableData_para_single[i].Min_limit,
            Min_limit: this.tableData_para_single[i].Min_limit,
            Max_limit: this.tableData_para_single[i].Max_limit,
            isEdit: false ,
          }
          this.tableData_para_single_temp_FF=JSON.parse(JSON.stringify(this.tableData_para_single_temp_FF)); 
          break;
        }  
      }  
    },
    getDatalist(){
      for (var i=0;i<this.single_para_list.length;i++) {
        if (this.tableData_para_single[i].para_name == this.tableData_para_single_look[0].para_name) {

          this.tableData_para_single_look[0]={
            para_name :  this.tableData_para_single[i].para_name,
            // advice_date: this.tableData_para_single[i].advice_date,
            // recent_date: this.tableData_para_single[i].recent_date,
            // modify_date: this.tableData_para_single[i].modify_date,
            modify_date: "",
            serial_number       : this.tableData_para_single[i].serial_number,
            // default_value: this.tableData_para_single[i].default_value,
            code       : this.tableData_para_single[i].code,
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
    busy_table_info_get()
    {
      request.post( 'timemonitor/MultipleEquipmentInfo', null, {
      params:
        {
          loading_flag: '1',
        },
    }).then(({ data: response }) => {
      this.loading_num = response.data.loading
      if (this.loading_num == "100") {
          this.loading_num = parseInt(response.data.loading)
          this.loading_flag = 'success'
          this.loading_string = "全部下发完成，共修改"+response.data.count_equipment+"台设备!"+"下发成功设备"+response.data.count_success_e+"台,下发失败设备"+response.data.count_fail_e+"台。"
          this.table_data_refresh();
          this.button_state_para = false;
          this.button_state = false;

          clearInterval(this.timer_flag_para)

          this.timer_flag_para = null

          this.$alert('修改完成', '成功', {
              confirmButtonText: '确定',
          });
      } else {
          this.loading_num = parseInt(response.data.loading)
          this.loading_flag = ''
          this.loading_string = "总计"+response.data.count_equipment+"台,已完成"+response.data.count_equipment_ok+"台!"
      }
      
    }).catch((err) => {

    });
    },


  },
  created() {
      console.log(request)
    this.State_List = '全部',
    this.tableData_equipment_info=[],
    this.tableData_equipment_info_save=[],
    request.post( 'timemonitor/EquipmentRewriteFlagTempClear', null, {
      params:
        {
          rewriteflag_temp : '0',
        },
    }).then(({ data: response }) => {

    }).catch((err) => {

    });
    request.post( 'timemonitor/MultipleEquipmentInfo', null, {
      params:
        {
          currentPage: '1',
          perPage:     '100',
        },
    }).then(({ data: response }) => {

      console.log(response)
      this.tableData_equipment_info_save = JSON.parse(JSON.stringify(response.data.tableData_equipment_info));
      this.total = response.data.count
      for (var i = 0; i < ((this.tableData_equipment_info_save.length)); i++) {
        if (this.tableData_equipment_info_save[i].Isrewirted == "true") {
          this.tableData_equipment_info_save[i].Isrewirted = true
        } else {
          this.tableData_equipment_info_save[i].Isrewirted = false
        }
      }
      if (response.data.busy_flag == "1") {
        this.$message.success('系统正忙!')

        
        this.tableData_equipment_info = JSON.parse(JSON.stringify(this.tableData_equipment_info_save));
        if(this.timer_flag_para == null) {
            // this.button_txt_para_default = "参数下发中..."
            this.button_state_para = true
            this.button_state = true
            this.timer_flag_para = setInterval(this.busy_table_info_get,5000) // 1秒执行一次deal_timer_para函数
        }

      } else {

        this.tableData_equipment_info = JSON.parse(JSON.stringify(this.tableData_equipment_info_save));
      }
      this.tableData_equipment_info_dele =[];
        for (var i = 0;i < this.tableData_equipment_info.length; i++) {
         this.tableData_equipment_info_dele[i] =this.tableData_equipment_info[i]
       }

      this.selection(this.tableData_equipment_info)
      this.loading_num = response.data.loading
      if (this.loading_num == "100") {
          this.loading_num = parseInt(response.data.loading)
          this.loading_flag = 'success'
          this.loading_string = "全部下发完成，共修改"+response.data.count_equipment+"台设备!"+"下发成功设备"+response.data.count_success_e+"台,下发失败设备"+response.data.count_fail_e+"台。"
      } else {
          this.loading_num = parseInt(response.data.loading)
          this.loading_flag = ''
          
          this.loading_string = "总计"+response.data.count_equipment+"台,已完成"+response.data.count_equipment_ok+"台!"
      }
    }).catch((err) => {

    }); 
  },
    destroyed: function () {
        console.log("我已经离开了！");
        clearInterval(this.timer_flag_para)
        this.timer_flag_para = null
  },
};
</script>


<style  lang="scss"  scoped>

/deep/ .el-table__header-wrapper .el-checkbox__input::after {
    content: '当页修改全选';
    position: absolute;
    margin-left: 5px;
  
}
.bar{
     
    height: 30px;
    width: 100%;
    
    
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