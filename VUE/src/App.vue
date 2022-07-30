<template>
  <div id="app">
    <el-row>
      <navbar @menucolor="color" @viewcolor="color1" @menucolorclosesave="menucolorclosesave" @viewcolorclosesave="viewcolorclosesave"></navbar>
    </el-row>
    <el-row>
      <el-container>
        <el-aside width="collapse" :style="menuColor()"><Menu /></el-aside>
        <el-main :style="viewColor()">
          <div class="container-fluid" position="absolute">
            <router-view />
          </div>
        </el-main>
      </el-container>
    </el-row>
  </div>
</template>


<script>
import Navbar from './views/layout/Navbar.vue';
import Menu from './views/menu/Menu.vue';
import local from '@/assets/local.js';
import request from '@/utils/request';
// import setting from './views/layout/setting.vue';

export default {
  components: { Navbar, Menu,},
  data() {
    return {
      menucolor:'',
      viewcolor:'',
    };
  },
  methods:{
    color(x,y) {
      console.log(x)
      if(x=="") {
      }else{
        this.menucolor=x
        console.log(this.menucolor)
        if(this.menucolor==null) {
          this.menucolor='rgba(255, 255, 255, 1)'
        }
        console.log(this.menucolor)
        if(y==1) {
          var push="data/"+"menucolor"
          request.put(push, null, {
            params:
            { 
              Label:"menucolor",
              Id:"3",
              Value:this.menucolor
            },
          }).then(({ data: response }) => {
          })
        }
      }
    },
    color1(x,y) {
      if(x=="") {
      }else{
        this.viewcolor=x
        console.log(this.viewcolor)
        if(this.viewcolor==null) {
          this.viewcolor='rgba(255, 255, 255, 1)'
        }
        if(y==1) {
          var push="data/"+"viewcolor"
          request.put(push, null, {
            params:
            { 
              Label:"viewcolor",
              Id:"3",
              Value:this.viewcolor
            },
          }).then(({ data: response }) => {
          })
        }
      }
    },
    // menucolorclosesave(x){
    //   if(x==1){
    //     this.menucolor=local.get('menucolor')
    //   }
    // },
    // viewcolorclosesave(x){
    //   if(x==1){
    //     this.viewcolor=local.get('viewcolor')
    //   }
    // },
    menuColor() {
      return "background-color: "+this.menucolor
    },
    viewColor() {
      return "background-color: "+this.viewcolor
    }
  },
  created() {
    request.post('data/page/initialize', null, {
      params:
      { 
        pagetype:"1"
      },
    }).then(({ data: response }) => {
      console.log(response.data)
      this.menucolor=response.data.data.menucolor
      this.viewcolor=response.data.data.viewcolor
      console.log(this.menucolor)
    }).catch((err) => {
      this.$message.error(err);
    });
   }
};
</script>

<style lang="scss" scoped>
.el-main {
  padding: 0px;
  margin: 0;
  
}
.container-fluid{
  padding: 0;
  margin: 0;
}
</style>