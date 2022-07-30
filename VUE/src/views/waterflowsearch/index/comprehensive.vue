<template>
  <div>
<el-menu
  :default-active="flag1"
  class="el-menu-demo"
  mode="horizontal"
  @select="handleSelect"
 style="margin-top:0px; height:65px;margin-bottom:0px;"
  background-color="#fff"
  text-color="#000"
  active-text-color="#00ccff">
  <el-menu-item index="1" @click="$router.push({name: 'indexdregion'})">用水片段</el-menu-item>
  <el-menu-item index="3" @click="$router.push({name: 'indextime'})">用水行为</el-menu-item>
  <el-menu-item index="2" @click="$router.push({name: 'indexmodeltype'})">设备列表</el-menu-item>
   
  
</el-menu>
   
  </div>

</template>
<script>

export default {
 created(){
   //
  // console.log(this.flag1)
 },
 data() {
    return {
     // flag1:'',
    flag:''
  
    }
   
  },
   props:[ 'flag1']
          
        ,
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },

};
</script>

 <style  lang="scss"  scoped>
</style>
