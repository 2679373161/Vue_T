<template>
  <div id="app">
    <div class="filterBtn">
      <el-button type="primary" size="small" align="left"   @click="filterMaskOne = true">
        数据筛选<i class="el-icon-s-operation el-icon--right"></i>
      </el-button>
      <transition name="fade">
        <div
          class="filterMaskOne"
          v-show="filterMaskOne"
          @click="filterMaskOne = false"
        >
          <div class="filterMaskOneContent" @click.stop>
            <div class="filterHeader" align="left">
              <span >数据筛选</span>
            </div>
            <div class="filterBody">
              <div class="outPrompt" v-show="topData.length == 0">
                暂无筛选条件，请添加筛选条件...
              </div>
              <div
                class="filterBodyCondition"
                v-for="(item, index) in topData"
                :key="index"
              >
                <div
                  class="leftleft"
                  @mouseenter="mouseEnterItem(index)"
                  @mouseleave="mouseLeaveItem(index)"
                >
                  <span
                    >{{ item.wordTitle }}：
                    <i
                      class="el-icon-error"
                      v-show="whichIndex == index"
                      @click="clickIcon(index)"
                    ></i>
                  </span>
                </div>
                <div class="rightright" align="left">
                  <el-input
                    v-model.trim="item.content"
                    clearable
                    v-show="item.type == 1"
                    placeholder="请输入"
                    size="small"
                    :popper-append-to-body="false"
                  ></el-input>
                    <el-select
                    ref="selectAddr"
                    v-model="item.optionArr"
                    v-show="item.type == 2"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="whatItem in item.options"
                      :key="whatItem.id"
                      :label="whatItem.value"
                      :value="whatItem.id"
                      size="small"
                    >
                    </el-option>
                    </el-select>
                  <el-cascader
                    ref="selectAddr1"
                    v-model="item.optionArr"
                    v-show="item.type == 4"
                    :options="item.options"
                     @change="changecondition"
                    placeholder="请选择"
                  >
                  </el-cascader>
                  <el-form 
                  ref="form" 
                  align="left"
                  style="margin-bottom:0px;margin-top:5px;height:40px"
                  :model="item.form" 
                  :rules="rules" 
                   v-show="item.type == 5"
                  :hide-required-asterisk="true"
                  :inline="true"> 
                   <el-form-item  prop="min"  style="width: 70px;margin-right:5px;">
                  <el-input v-model="item.form.min" style="width: 65px;" @change="handleMinChange(index)"></el-input>
                  </el-form-item> 
                  <el-form-item  prop="max" label="-"  label-width="10px" style="width: 100px;margin-left:0px;margin-right:0px;">
                  <el-input v-model="item.form.max" style="width: 70px;" @change="handleMaxChange(index)"></el-input>
                  </el-form-item> 
                  </el-form> 

                  <el-date-picker
                    v-model="item.timeArr"
                    v-show="item.type == 3"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                  >
                  </el-date-picker>
                </div>
              </div>
            </div>
            <div class="filterFooter">
              <div class="filterBtn">
                <el-button
                  type="text"
                  icon="el-icon-circle-plus-outline"
                  @click="filterMaskTwo = true"
                  >添加筛选条件</el-button
                >
                <transition name="fade">
                  <div
                    class="filterMaskTwo"
                    align="left"
                    v-show="filterMaskTwo"
                    @click="filterMaskTwo = false"
                  >
                    <div class="filterMaskContentTwo" @click.stop>
                      <div class="innerPrompt" v-show="bottomData.length == 0">
                        暂无内容...
                      </div>
                      <div
                        class="contentTwoItem"
                        align="left"
                        @click="clickBottomItem"
                        v-for="(item, index) in bottomData"
                        :key="index"
                      >
                        <div class="mingzi">
                          {{ item.wordTitle }}
                        </div>
                      </div>
                    </div>
                  </div>
                </transition>
              </div>
              <div class="resetAndConfirmBtns">
                <el-button size="small" @click="resetFilter">重置</el-button>
                <el-button type="primary" size="small" @click="confirmFilter">确认</el-button
                >
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import request from '@/utils/request';
const MIN_NUMBER = 0; 
const MAX_NUMBER = 150; 
export default {
   computed: mapState({
    userInfo: (state) => state.userModule.userInfo,
  }),
  name: "app",
  data() {
    return {
        radio1:'不限',//向父组件传递模式筛选项
        radio2:"不限",//向父组件传递时长筛选项
        average:[0,100],//向父组件传递
         level:'不限',//向父组件传递波动等级筛选项
      form: {min:"1",max:"120"},
      filterMaskOne: false, // 分别用于控制两个弹框的显示与隐藏
      filterMaskTwo: false,
      whichIndex: -1, // 用于记录点击的索引
      apiFilterArr:[], //存储用户填写的筛选内容
      apiFilterArr1:[], //存储用户填写的筛选内容
      apiFilterArr4:[],  //存储用户填写的筛选内容
      apiFilterArr2:[], //存储用户填写的筛选内容
      apiFilterArr3:[], //存储用户填写的筛选内容
      stablelevel:[         //波动量化等级对应分数范围
        {         
         scorelow:0,
         scorehigh:99
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
      scorehigh:"",
      topData: [ // 配置常用的筛选项
        {
          wordTitle: "水流量模式",
          type: 4, // 1 为input 2为select 3为DatePicker
          content: "", // content为输入框绑定的输入数据
          options: [
            {
              value: 1,
              label: "全选",
            },
             {
              value: 6,
              label: "稳定",
            },
             {
              value: 9,
              label: "不稳定",
            },
            {
              value: 7,
              label: "阶跃",
            },
            {
              value: 8,
              label: "震荡",
            },
          ], // options为所有的下拉框内容
          optionArr: [], // optionArr为选中的下拉框内容
          timeArr: [], // timeArr为日期选择区间
           form: {min:"1",max:"120"}
        },
        {
          wordTitle: "时长",
          type: 2,
          content: "",
          options: [ 
             {
              id: 0,
              value: "不限",
            },
            {
              id: 1,
              value: "1-2分钟",
            },
            {
              id: 2,
              value: "2-5分钟",
            },
            {
              id: 3,
              value: "5-10分钟",
            },
            {
              id: 4,
              value: "10分钟以上",
            },
            
            ],
          optionArr: [],
          timeArr: [],
          form: {min:"2",max:"120"}
        },
       {
          wordTitle: "均值",
          type: 5,
          content: "",
          options: [],
          optionArr: [],
          timeArr: [],
          form: {min:"10",max:"120"}
        },
          
       
      ],
      bottomData: [ // 配置不常用的筛选项
        {
          wordTitle: "标准差",
          type: 5,
          content: "",
          options: [], // 发请求获取下拉框选项
          optionArr: [],
          timeArr: [],
          form: {min:"5",max:"120"}
        },
        {
          wordTitle: "波动等级",
          type: 2,
          content: "",
          options: [ 
             {
              id: 0,
              value: "不限",
            },
            {
              id: 1,
              value: "一等",
            },
            {
              id: 2,
              value: "二等",
            },
            {
              id: 3,
              value: "三等",
            }, 
            ],
          optionArr: [],
          timeArr: [],
          form: {min:"10",max:"120"}
        },
      
      ],
      tableData:[],
        rules: { min: [{required: true, message: '必填项，请维护', trigger: 'blur'},  //检索规则
                   { validator: this.validateCom, trigger: 'blur' }, 
                   { validator: this.validateMin, trigger: 'blur' }, ],
                    max: [{required: true, message: '必填项，请维护', trigger: 'blur'},
                    { validator: this.validateCom, trigger: 'blur' }, 
                    { validator: this.validateMax, trigger: 'blur' }, ]} 
          
    };
  },
   props:{
     city:{
       type: String
     },
     dev_id:{
        type: String
     },
     timeHigh:{
       type: String
     },
     timeLow:{
       type: String
     }
   },
  mounted() {
    // 在初始化加载的时候，我们就把我们配置的常用和不常用的筛选项保存一份
    // 当用户点击重置按钮的时候，再取出来使其恢复到最初的筛选条件状态
    sessionStorage.setItem("topData",JSON.stringify(this.topData))
    sessionStorage.setItem("bottomData",JSON.stringify(this.bottomData))
  },
  methods: {
    //并对外暴露操作方法，判断是否符合校验规则 参数组件索引编号
    getFormData(index) { 

     const ret = {}; 
     this.$refs.form[index].validate((valid) => { 

       ret.valid = valid; ret.form = this.form; });
    //  console.log(ret)
      return ret; },
resetForm() { 
  this.$refs.form[2].resetFields(); },
  //改变一个值时，重新进行校验，并对两个输入框阈值重新设定
handleMinChange(index) { 
 this.form=this.$refs.form[index].model
  this.$refs.form[index].validateField('max'); },
  //改变一个值时，重新进行校验，并对两个输入框阈值重新设定
handleMaxChange(index) { 
  this.form=this.$refs.form[index].model
 console.log(this.form)
  this.$refs.form[index].validateField('min'); },
  // 公共校验:区间校验以及是否符合范围
validateCom(rule, value, callback) { 
  const one = Number(value); 
 // console.log(value)
  if (!Number.isNaN(one)) { if (one <MIN_NUMBER) 
  { return callback(new Error('输入值必须大于0')); } 
  else if (one > MAX_NUMBER) {
    return callback(new Error('输入值必须小于150'));
  } 
   
  return callback(); 
  }
  return callback(new Error('输入值必须为数值'));
   },
   //关联校验，第一个值是否满足要求
  validateMin(rule, value, callback) { 
    const one = Number(value); 
  const max = Number(this.form.max); 
  if (!max || one < max) { return callback(); }return callback(new Error('输入值不得大于最大阈值')); },
  //关联校验，第二个值是否满足要求
  validateMax(rule, value, callback) 
  { const one = Number(value); 
  //console.log(this.form.min)
  const min = Number(this.form.min);
   if (!min || one > min) 
  { return callback(); }
  return callback(new Error('输入值不得小于最小阈值')); },
   
   
   //鼠标移入显示删除小图标
    mouseEnterItem(index) {
      this.whichIndex = index;
    },
    //改变模式显示
    changecondition(value){
       function checkAdult(model) {
            
    return model.wordTitle == "波动等级";
};
         const name=this.$refs['selectAddr1'][0].getCheckedNodes()
// console.log(value)
//console.log(name[0].data.label)
if(name[0].data.label=="阶跃"){
         //   console.log( typeof this.bottomData[0])
            var i=this.bottomData.findIndex(checkAdult)
          //  // console.log(i)
          //  //将不常用筛选项推入常用数组
           if(i!=-1){
          this.topData.push(this.bottomData[i]);
          this.bottomData.splice(i, 1);

           }
           for(var i=1;i<this.stablelevel.length;i++)
             {
               if(i==1){
                  this.stablelevel[i]={
             scorelow:0,
             scorehigh:70
           }
           }else{
                this.stablelevel[i]={
             scorelow:70+(i-2)*11,
             scorehigh:80+(i-2)*10
           }

           }

             } 
          
     //    console.log(this.stablelevel)
         

}if(name[0].data.label=="稳定"||name[0].data.label=="全选"){
 
while(this.topData.length>3){
        this.bottomData.push(this.topData[this.topData.length-1]);
          this.topData.splice(this.topData.length-1, 1);

}

}else if(name[0].data.label=="震荡"){
   var i=this.bottomData.findIndex(checkAdult)
          //  //将不常用筛选项推入常用数组
           if(i!=-1){
          this.topData.push(this.bottomData[i]);
          this.bottomData.splice(i, 1);

           }
          
    for(var i=1;i<this.stablelevel.length;i++)
    {
      if(i==1){
           this.stablelevel[i]={
          scorelow:0,
          corehigh:60
           }
           }else{
       this.stablelevel[i]={
          scorelow:60+(i-2)*11,
          scorehigh:70+(i-2)*10
           }

           }

             } 
   // console.log(this.stablelevel)
}
    },
    //筛选查询后端数据
    filtersearch(){
     // console.log(this.apiFilterArr1)
      request.post('tableStoreDates/page/list', null, {
        params:
        { 
          city: this.city, 
          pagetype: 'indexdregion',
          flag:2,
          dev_id: this.dev_id,
          timeLow : this.timeLow,    //时间范围
          timeHigh : this.timeHigh,
          model: this.apiFilterArr[0],
          timelength:this.apiFilterArr4[0],
          averagelow:this.apiFilterArr3[0],
          averagehigh:this.apiFilterArr3[1],
          scorelow:this.scorelow,
          scorehigh:this.scorehigh

        },
      }).then(({ data: response }) => {
       
       // console.log(this.options5)
      this.tableData=response.data.data
  
      for(var i=0;i<this.tableData.length;i++){


        if(this.tableData[i].pattern=="6"){
          this.tableData[i].pattern="稳定模式"
        }else if(this.tableData[i].pattern=="7"){
          this.tableData[i].pattern="阶跃模式"
        }else{
            this.tableData[i].pattern="震荡模式"
        }
      }
         this. passValue(this.tableData)
      
     //console.log(this.tableData)
      }).catch((err) => {
        this.$message.error(err);
        // console.log(err);
      });
    },
    //向父组件传递参数
     passValue(table){
               // console.log(this.tableData)
                table=JSON.parse(JSON.stringify(table))
                this.tableData=table
                this.$emit("returnDate",this.apiFilterArr[0],this.apiFilterArr4[0],this.apiFilterArr3[0],this.apiFilterArr3[1],this.level)
              //  console.log(this.tableData)
           //   this.$emit('confirmEvent',  this.tableData)
            },
    // 鼠标离开将索引回复到默认-1
    mouseLeaveItem() {
      this.whichIndex = -1;
    },
    /* 点击某一项的删除小图标，把这一项添加到bottomData数组中
       然后把这一项从topData数组中删除掉(根据索引判别是哪一项) 
       最后删除一个就把索引置为初始索引 -1   */
    clickIcon(i) {
      this.bottomData.push(this.topData[i]);
      this.topData.splice(i, 1);
      this.whichIndex = -1;
    },
    // 点击底部的项的时候，通过事件对象，看看点击的是底部的哪一项
    // 然后把对应的那一项追加到topData中用于展示，同时把bottom数组
    // 中的哪一项进行删除
    clickBottomItem(event) {
      this.bottomData.forEach((item, index) => {
        if (item.wordTitle == event.target.innerText) {
          this.topData.push(item);
          this.bottomData.splice(index, 1);
        }
      });
    },
    // 点击确认筛选
    async confirmFilter() {
      //筛选条件是否符合要求判断
      var filterflag=true
      //默认波动范围
        this.scorelow='0'
          this.scorehigh='99'
      // 如果所有的输入框的content内容为空，且选中的下拉框数组为空，且时间选择器选中的数组为空
      // 就说明用户没有输入内容，那么我们就提示用户要输入内容以后再进行筛选
      let isEmpty = this.topData.every((item)=>{
        return (item.content == "") && (item.optionArr.length == 0) && (item.timeArr.length == 0)
      })
      if(isEmpty == true){
         this.$alert('请输入内容以后再进行筛选', '筛选提示', {
          confirmButtonText: '确定'
        });
      }else{
        // 收集参数发筛选请求，这里要分类型，把不为空的既有用户输入内容的
        // 存到存到数据筛选的数组中去，然后发请求给后端。
         
        this.topData.forEach((item)=>{
         // console.log(index)
           function checkAdult(model) {
            
    return model.wordTitle == item.wordTitle;
};
          if(item.type == 1){
            if(item.content != ""){
              let filterItem = {
                wordTitle:item.wordTitle,
                value:item.content
              }
              var i=this.apiFilterArr2.findIndex(checkAdult)
               if(i==-1)
              {
                    this.apiFilterArr2.push(filterItem)
              }else{
                this.apiFilterArr2[i].value=filterItem.value
              }
            
            }
          }else if(item.type == 2){
           //  console.log(item.optionArr)
           
            if(item.optionArr.length!=0){
             //  console.log(item.optionArr)
              let filterItem = {
                wordTitle:item.wordTitle,
                value:item.optionArr
              }
                if (item.wordTitle=="时长")
            {
                 var i=this.apiFilterArr1.findIndex(checkAdult)
               if(i==-1)
              {
                   // this.apiFilterArr1.push(filterItem)
                    this.apiFilterArr4[0]=item.optionArr
                   
              }else{
               // this.apiFilterArr1[i].value=filterItem.value
                  this.apiFilterArr4[0]=item.optionArr
              }
              
            }else if(item.wordTitle=="波动等级"){
                this.level=item.optionArr
                     this.scorelow=this.stablelevel[item.optionArr].scorelow
                      this.scorehigh=this.stablelevel[item.optionArr].scorehigh
            }
              
            
            }
          }else if(item.type == 3){
            if(item.timeArr.length > 0){
              let filterItem = {
                wordTitle:item.wordTitle,
                value:item.timeArr
              }
              var i=this.apiFilterArr2.findIndex(checkAdult)
               if(i==-1)
              {
                    this.apiFilterArr2.push(filterItem)
              }else{
                this.apiFilterArr2[i].value=filterItem.value
              }
            
            }
          }else if(item.type == 4){
             if(item.optionArr!=''){
              let filterItem = {
                wordTitle:item.wordTitle,
                value:item.optionArr[0]
              }
           
           if(item.wordTitle=="水流量模式")
            {
          this.apiFilterArr[0]=filterItem.value
            }
              
            
            }

          }else if(item.type == 5) {
              
            
              //  console.log(item.optionArr)
           if(item.wordTitle=="均值")
            {
               var i=this.topData.findIndex(checkAdult)
          //   console.log(i)
           
                this.apiFilterArr3[0]=item.form.min;
                this.apiFilterArr3[1]=item.form.max;
                filterflag= this.getFormData(i).valid

            }
              
          }
        })
        // 把筛选的内容放到一个数组里面，传递给后端（当然不一定把参数放到数组里面）
        // 具体以怎样的形式传递给后端，可以具体商量
        if(filterflag){

      //   this.filtersearch()
          //向父组件传递
          this. passValue(this.tableData)
        }
       
      }
    },
    // 重置时，再把最初的配置筛选项取出来赋给对应的两个数组
    resetFilter() {
      this.apiFilterArr=[]
      this.apiFilterArr1=[]
      this.apiFilterArr4=[]
       this.apiFilterArr3=[]
      this.topData = JSON.parse(sessionStorage.getItem("topData"))
      this.bottomData = JSON.parse(sessionStorage.getItem("bottomData"))
    },
  },
};
</script>
<style lang="scss" scoped>
.filterBtn {
  width: 114px;
  height: 40px;
  .filterMaskOne {
    top: 0;
    left: 0;
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 999;
    background-color: rgba(0, 0, 0, 0.3);
    .filterMaskOneContent {
      position: absolute;
      top: 152px;
      right: 38px;
      width: 344px;
      height: 371px;
      background-color: #fff;
      box-shadow: 0px 0px 4px 3px rgba(194, 194, 194, 0.25);
      border-radius: 4px;
      .filterHeader {
        width: 344px;
        height: 48px;
        border-bottom: 1px solid #e9e9e9;
        span {
          display: inline-block;
          font-weight: 600;
          font-size: 16px;
          margin-left: 24px;
          margin-top: 16px;
        }
      }
      .filterBody {
        width: 344px;
        height: 275px;
        overflow-y: auto;
        overflow-x: hidden;
        box-sizing: border-box;
        padding: 12px 24px 0 24px;
        .outPrompt {
          color: #666;
        }
        .filterBodyCondition {
          width: 100%;
          min-height: 40px;
          display: flex;
          margin-bottom: 14px;
          .leftleft {
            width: 88px;
            height: 40px;
            display: flex;
            align-items: center;
            margin-right: 20px;
            span {
              position: relative;
              width: 100px;
              font-size: 14px;
              color: #333;
              text-align:left;
              margin-left: 0px;
              i {
                color: #666;
                right: -8px;
                top: -8px;
                position: absolute;
                font-size: 15px;
                cursor: pointer;
              }
              i:hover {
                color: #5f95f7;
              }
            }
          }
          .rightright {
            width: calc(100% - 70px);
            height: 100%;
            /deep/ input::placeholder {
              color: rgba(0, 0, 0, 0.25);
              font-size: 13px;
            }
            /deep/ .el-input__inner {
              height: 40px;
              line-height: 40px;
            }
            /deep/ .el-select {
              .el-input--suffix {
                /deep/ input::placeholder {
                  color: rgba(0, 0, 0, 0.25);
                  font-size: 13px;
                }
                .el-input__inner {
                  border: none;
                }
                .el-input__inner:hover {
                  background: rgba(95, 149, 247, 0.05);
                }
              }
            }
            .el-date-editor {
              width: 100%;
              font-size: 12px;
            }
            .el-range-editor.el-input__inner {
              padding-left: 2px;
              padding-right: 0;
            }
            /deep/.el-range-input {
              font-size: 13px !important;
            }
            /deep/ .el-range-separator {
              padding: 0 !important;
              font-size: 12px !important;
              width: 8% !important;
              margin: 0;
            }
            /deep/ .el-range__close-icon {
              width: 16px;
            }
          }
        }
      }
      .filterFooter {
        width: 344px;
        height: 48px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        padding-left: 24px;
        padding-right: 12px;
        border-top: 1px solid #e9e9e9;
        .filterBtn {
          .filterMaskTwo {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.3);
            z-index: 1000;
            .filterMaskContentTwo {
              width: 240px;
              height: 320px;
              background: #ffffff;
              box-shadow: 0px 0px 4px 3px rgba(194, 194, 194, 0.25);
              border-radius: 4px;
              position: absolute;
              top: 360px;
              right: 180px;
              overflow-y: auto;
              box-sizing: border-box;
              padding: 12px 0 18px 0;
              overflow-x: hidden;
              .innerPrompt {
                color: #666;
                width: 100%;
                padding-left: 20px;
                margin-top: 12px;
              }
              .contentTwoItem {
                width: 100%;
                height: 36px;
                line-height: 36px;
                font-size: 14px;
                color: #333333;
                cursor: pointer;
                .mingzi {
                  width: 100%;
                  height: 36px;
                  box-sizing: border-box;
                  
                  padding-left: 18px;
                }
              }
              .contentTwoItem:hover {
                background: rgba(95, 149, 247, 0.05);
              }
            }
          }
        }
      }
    }
  }
}
// 控制淡入淡出效果
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>

