<template>
  <div class="table">
    <el-tabs v-model="activeName"  >
        <el-tab-pane label="改写恒温算法2.0相关数据设置默认参数信息" name="stable_temp">
            <el-table
            :data="stable_temp_info"
            size="large"
            style="width: 100%"
            height="500"
            >
                <el-table-column
                    prop="para_name"
                    label="参数名称"
                   >
                </el-table-column>
                <el-table-column
                    prop="save_date"
                    label="备份参数值"
                   >
                    <template slot-scope="scope">
                        <div  class="txt">0X{{scope.row.save_date}}</div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="last_date"
                    label="原参数值"
                   >
                    <template slot-scope="scope">
                        <div  class="txt">0X{{scope.row.last_date}}</div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="recent_date"
                    label="当前参数值"
                   >
                    <template slot-scope="scope">
                        <div  class="txt">0X{{scope.row.recent_date}}</div>
                    </template>
                </el-table-column>
               
            </el-table>
        </el-tab-pane>
        <el-tab-pane label="改写非调试模式参数第一组" name="Un_debug_1">
            <el-table
            :data="Un_debug_1_info"
            size="large"
            style="width: 100%"
            height="500"
            >
                <el-table-column
                    prop="para_name"
                    label="参数名称"
                   >
                </el-table-column>
                <el-table-column
                    prop="save_date"
                    label="备份参数值"
                   >
                    <template slot-scope="scope">
                        <div  class="txt">0X{{scope.row.save_date}}</div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="last_date"
                    label="原参数值"
                   >
                    <template slot-scope="scope">
                        <div  class="txt">0X{{scope.row.last_date}}</div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="recent_date"
                    label="当前参数值"
                   >
                    <template slot-scope="scope">
                        <div  class="txt">0X{{scope.row.recent_date}}</div>
                    </template>
                </el-table-column>
               
                
            </el-table>
        </el-tab-pane>
        <el-tab-pane label="改写非调试模式参数第二组" name="Un_debug_2">
            <el-table
            :data="Un_debug_2_info"
            size="large"
            style="width: 100%"
            height="500"
            >
                <el-table-column
                    prop="para_name"
                    label="参数名称"
                   >
                </el-table-column>
                <el-table-column
                    prop="save_date"
                    label="备份参数值"
                   >
                    <template slot-scope="scope">
                        <div  class="txt">0X{{scope.row.save_date}}</div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="last_date"
                    label="原参数值"
                   >
                    <template slot-scope="scope">
                        <div  class="txt">0X{{scope.row.last_date}}</div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="recent_date"
                    label="当前参数值"
                   >
                    <template slot-scope="scope">
                        <div  class="txt">0X{{scope.row.recent_date}}</div>
                    </template>
                </el-table-column>
               
                
            </el-table>
        </el-tab-pane>
        <el-tab-pane label="改写总参数" name="All_para">
            <el-table
            :data="All_para_info"
            size="large"
            style="width: 100%"
            height="500"
            >
                <el-table-column
                    prop="para_name"
                    label="参数名称"
                   >
                </el-table-column>
                <el-table-column
                    prop="save_date"
                    label="备份参数值"
                   >
                    <template slot-scope="scope">
                        <div  class="txt">0X{{scope.row.save_date}}</div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="last_date"
                    label="原参数值"
                   >
                    <template slot-scope="scope">
                        <div  class="txt">0X{{scope.row.last_date}}</div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="recent_date"
                    label="当前参数值"
                   >
                    <template slot-scope="scope">
                        <div  class="txt">0X{{scope.row.recent_date}}</div>
                    </template>
                </el-table-column>
            </el-table>
        </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script type="text/ecmascript-6">
import request from '@/utils/request';
  export default {
    props: {
        ID_info: Object,
    },
    data () {
      return {
          activeName:"All_para",
          // 段序号

          stable_temp_info:[],
          Un_debug_1_info:[],
          Un_debug_2_info:[],
          All_para_info:[],
          All_para_info_list:[
                "CA",
                "CH",
                "FA",
                "FC",
                "FF",
                "FH",
                "FL",
                "FP",
                "Fd",
                "Fn",
                "HE",
                "HL",
                "HS",
                "HU",
                "Hb",
                "LF",
                "NE",
                "PH",
                "PL",
                "UA",
                "Ub",
                "dH",],
      }
    },
    components: {

    },
    methods: {
        deal_table_info_response(para_info){
            
            console.log(para_info.para_all_new)
            for(var key in para_info.para_all_new) {
                for (var i = 0; i < this.All_para_info_list.length; i++) {
                     if (this.All_para_info_list[i] == key ) {
                         let obj={
                            para_name: key,
                            save_date: para_info.para_all_save[key],
                            last_date: para_info.para_all_old[key],
                            recent_date: para_info.para_all_new[key],
                        }
                        this.All_para_info.push(obj);
                        break;     
                     }
                    
                }
            }
            this.All_para_info=JSON.parse(JSON.stringify(this.All_para_info)); 
        },
        get_info(){
            this.All_para_info = [];
            request.post( 'timemonitor/MultipleEquipmentInfoSingel', null, {
            params:
            {
                applianceid:         this.ID_info.equipment_ID ,
            },
            }).then(({ data: response }) => {
                console.log(response)
                if ( response.data.para_all_new == null || response.data.para_all_new.appliance_id == "") {
                     this.$message.info('暂无该设备信息');
                } else {
                    this.deal_table_info_response(response.data)
                }
                
            }).catch((err) => {
            });
        },
        
    },
    watch: {
        ID_info(val, oldVal) {
            console.log(1111, val, oldVal);
            this.get_info();
        }
    },
    mounted() {

        console.log(this.ID_info)
        this.get_info();
    },
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

 
</style>
