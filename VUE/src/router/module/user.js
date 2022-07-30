const userRoutes = [
  {
    path: '/datelist',
    name: 'datelist',
    meta: {
      auth: true,
    },
    component: () => import('@/views/waterflowsearch/unstablewaterflowsearch/DateList.vue'),//设备数据→单设备每日运行数据
  },
  {
    path: '/devicedata',
    name: 'devicedata',
    meta: {
      auth: true,
    },
    component: () => import('@/views/waterflowsearch/unstablewaterflowsearch/devicedata.vue'),//某地区型号设备统计
  },
  {
    path: '/detaildata',
    name: 'detaildata',
    meta: {
      auth: true,
    },
    component: () => import('@/views/waterflowsearch/unstablewaterflowsearch/detaildata.vue'),//单设备每月稳定情况
  },
  {
    path: '/comprehensive',
    name: 'comprehensive',
    meta: {
      auth: true,
    },
    component: () => import('@/views/waterflowsearch/index/comprehensive.vue'),//综合索引
  },
  {
    path: '/indexdregion',
    name: 'indexdregion',
    meta: {
      auth: true,
    },
    component: () => import('@/views/waterflowsearch/index/indexdregion.vue'),//用水片段
  },
  {
    path: '/indexmodeltype',
    name: 'indexmodeltype',
    meta: {
      auth: true,
    },
    component: () => import('@/views/waterflowsearch/index/indexmodeltype.vue'),//设备
  },
  {
    path: '/indextime',
    name: 'indextime',
    meta: {
      auth: true,
    },
    component: () => import('@/views/waterflowsearch/index/indextime.vue'),//用水行为
  },
  {
    path: '/indextemp',
    name: 'indextemp',
    meta: {
      auth: true,
    },
    component: () => import('@/views/tempsearch/indextemp.vue'),//恒温 片段查询
  },
  {
    path: '/indextempequipment',
    name: 'indextempequipment',
    meta: {
      auth: true,
    },
    component: () => import('@/views/tempsearch/indextempequipment.vue'),//恒温 设备查询
  },
  {
    path: '/indextemporder',
    name: 'indextemporder',
    meta: {
      auth: true,
    },
    component: () => import('@/views/tempsearch/indextemporder.vue'),//恒温 设备排名
  },
 // {
    //path: '/MenuHomenew1',
  //  name: 'MenuHomenew1',
   // meta: {
   //   auth: true,
  //  },
  //  component: () => import('@/views/menu/MenuHomenew1.vue'),//首页
  //},
 
         {
    path: '/MenuHomenew2',
    name: 'MenuHomenew2',
    meta: {
     auth: true,
    },
  component: () => import('@/views/menu/MenuHomenew2.vue'),//首页
  },


  {
    path: '/updatalog',
    name: 'updatalog',
    meta: {
      auth: true,
    },
    component: () => import('@/views/layout/updatalog.vue'),  //版本更新日志
  },
  {
    path: '/upsteppattern',
    name: 'upsteppattern',
    meta: {
      auth: true,
    },
    component: () => import('@/views/waterflowsearch/unstablewaterflowsearch/upsteppattern.vue'),//地区稳定情况统计
  }, {
    path: '/provincesummary',
    name: 'provincesummary',
    meta: {
      auth: true,
    },
    component: () => import('@/views/waterflowanalysis/provincesummary.vue'),  //按地区汇总对比页面.省份
  }, {
    path: '/citysummary',
    name: 'citysummary',
    meta: {
      auth: true,
    },
    component: () => import('@/views/waterflowanalysis/citysummary.vue'),  //按地区汇总对比页面.城市
  }, {
    path: '/typesummary',
    name: 'typesummary',
    meta: {
      auth: true,
    },
    component: () => import('@/views/waterflowanalysis/typesummary.vue'),//按型号汇总对比页面
  }, {
    path: '/timesummary1',
    name: 'timesummary1',
    meta: {
      auth: true,
    },
    component: () => import('@/views/waterflowanalysis/timesummary1.vue'),//按时间汇总对比页面
  }, {
    path: '/migration',
    name: 'migration',
    meta: {
      auth: true,
    },
    component: () => import('@/views/basicdatamenu/migration.vue'),//基本数据管理
  }, {
    path: '/monitoring',
    name: 'monitoring',
    meta: {
      auth: true,
    },
    component: () => import('@/views/basicdatamenu/monitoring.vue'),//监视数据管理
  }, {
    path: '/temp_provincesummary',
    name: 'temp_provincesummary',
    meta: {
      auth: true,
    },
    component: () => import('@/views/tempanalysis/temp_provincesummary.vue'),  //按地区汇总对比页面.省份
  }, {
    path: '/temp_citysummary',
    name: 'temp_citysummary',
    meta: {
      auth: true,
    },
    component: () => import('@/views/tempanalysis/temp_citysummary.vue'),  //按地区汇总对比页面.城市
  }, {
    path: '/temp_typesummary',
    name: 'temp_typesummary',
    meta: {
      auth: true,
    },
    component: () => import('@/views/tempanalysis/temp_typesummary.vue'),//按型号汇总对比页面
  }, {
    path: '/temp_timesummary1',
    name: 'temp_timesummary1',
    meta: {
      auth: true,
    },
    component: () => import('@/views/tempanalysis/temp_timesummary1.vue'),//按时间汇总对比页面.月份范围
  },
  {
    path: '/temp_datelist',
    name: 'temp_datelist',
    meta: {
      auth: true,
    },
    component: () => import('@/views/tempanalysis/temp_DateList.vue'),//设备数据→单设备每日运行数据
  },
  {
    path: '/temp_devicedata',
    name: 'temp_devicedata',
    meta: {
      auth: true,
    },
    component: () => import('@/views/tempanalysis/temp_devicedata.vue'),//某地区型号设备统计
  },
  {
    path: '/temp_detaildata',
    name: 'temp_detaildata',
    meta: {
      auth: true,
    },
    component: () => import('@/views/tempanalysis/temp_detaildata.vue'),//单设备每月稳定情况
  },{
    path: '/temp_upsteppattern',
    name: 'temp_upsteppattern',
    meta: {
      auth: true,
    },
    component: () => import('@/views/tempanalysis/temp_upsteppattern.vue'),//地区稳定情况统计
  },
  {
    path: '/equipmentmonitor',
    name: 'equipmentmonitor',
    meta: {
      auth: true,
    },
    component: () => import('@/views/monitor/equipmentmonitor.vue'),//用水片段
  },
  {
    path: '/collection',
    name: 'collection',
    meta: {
      auth: true,
    },
    component: () => import('@/views/collection/collection.vue'),//实时采集
  },
  {
    path: '/timemonitor',
    name: 'timemonitor',
    meta: {
      auth: true,
    },
    component: () => import('@/views/timemonitor/timemonitor.vue'),//实时监控
  },
  {
    path: '/Para_Inquire',
    name: 'Para_Inquire',
    meta: {
      auth: true,
    },
    component: () => import('@/views/Paramanage/Para_Inquire.vue'),//查看某设备的参数信息
  },
  {
    path: '/Para_mange',
    name: 'Para_mange',
    meta: {
      auth: true,
    },
    component: () => import('@/views/Paramanage/Para_mange.vue'),//查看某设备的参数信息
  },
  {
        path: '/Para_multiple',
        name: 'Para_multiple',
        meta: {
          auth: true,
        },
        component: () => import('@/views/Paramanage/Para_multiple.vue'),// 多设备参数管理页面
      },
    {
      path: '/flameoutday',
      name: 'flameoutday',
      meta: {
        auth: true,
      },
      component: () => import('@/views/faultdiagnosis/flameoutday.vue'),//按时间汇总对比页面
    },     {
      path: '/unheatableday',
      name: 'unheatableday',
      meta: {
        auth: true,
      },
      component: () => import('@/views/faultdiagnosis/unheatableday.vue'),//按时间汇总对比页面
    },   {
      path: '/faultflameout',
      name: 'faultflameout',
      meta: {
        auth: true,
      },
      component: () => import('@/views/faultdiagnosis/faultflameout.vue'),//按时间汇总对比页面
    },  {
      path: '/faultunheatable',
      name: 'faultunheatable',
      meta: {
        auth: true,
      },
      component: () => import('@/views/faultdiagnosis/faultunheatable.vue'),//按时间汇总对比页面
    }, {
      path: '/statistics',
      name: 'statistics',
      meta: {
        auth: true,
      },
      component: () => import('@/views/statistics/statistics.vue'),//按时间汇总对比页面
    },
    {
      path: '/devicedistribution',
      name: 'devicedistribution',
      meta: {
        auth: true,
      },
      component: () => import('@/views/statistics/devicedistribution.vue'),//按时间汇总对比页面
    },
    {
      path: '/typefaultsum',
      name: 'typefaultsum',
      meta: {
        auth: true,
      },
      component: () => import('@/views/mediafault/typefaultsum.vue'),//按时间汇总对比页面
    },     {
      path: '/typefaultsum2',
      name: 'typefaultsum2',
      meta: {
        auth: true,
      },
      component: () => import('@/views/mediafault/typefaultsum2.vue'),//按时间汇总对比页面
    },     {
      path: '/equfault',
      name: 'equfault',
      meta: {
        auth: true,
      },
      component: () => import('@/views/mediafault/equfault.vue'),//按时间汇总对比页面
    },   {
      path: '/typefault',
      name: 'typefault',
      meta: {
        auth: true,
      },
      component: () => import('@/views/mediafault/typefault.vue'),//按时间汇总对比页面
    },{
      path: '/prodmonthfaultsum',
      name: 'prodmonthfaultsum',
      meta: {
        auth: true,
      },
      component: () => import('@/views/mediafault/prodmonthfaultsum.vue'),//按时间汇总对比页面
    },
     
    
    {
      path: '/typefaultsum3',
      name: 'typefaultsum3',
      meta: {
        auth: true,
      },
      component: () => import('@/views/mediafault/typefaultsum3.vue'),//按时间汇总对比页面
    },{
      path: '/typenumday',
      name: 'typenumday',
      meta: {
        auth: true,
      },
      component: () => import('@/views/mediafault/typenumday.vue'),//按时间汇总对比页面
    },{
      path: '/typenumsum',
      name: 'typenumsum',
      meta: {
        auth: true,
      },
      component: () => import('@/views/mediafault/typenumsum.vue'),//按时间汇总对比页面
    },  {
      path: '/overfaultday',
      name: 'overfaultday',
      meta: {
        auth: true,
      },
      component: () => import('@/views/faultdiagnosis/overfaultday.vue'),//按时间汇总对比页面
    },  {
      path: '/overfault',
      name: 'overfault',
      meta: {
        auth: true,
      },
      component: () => import('@/views/faultdiagnosis/overfault.vue'),//按时间汇总对比页面
    },{
      path: '/overtempday',
      name: 'overtempday',
      meta: {
        auth: true,
      },
      component: () => import('@/views/faultdiagnosis/overtempday.vue'),//按时间汇总对比页面
    },  {
      path: '/overtemp',
      name: 'overtemp',
      meta: {
        auth: true,
      },
      component: () => import('@/views/faultdiagnosis/overtemp.vue'),//按时间汇总对比页面
    },   {
      path: '/overshootfaultday',
      name: 'overshootfaultday',
      meta: {
        auth: true,
      },
      component: () => import('@/views/faultdiagnosis/overshootfaultday.vue'),//按时间汇总对比页面
    },  {
      path: '/overshootfault',
      name: 'overshootfault',
      meta: {
        auth: true,
      },
      component: () => import('@/views/faultdiagnosis/overshootfault.vue'),//按时间汇总对比页面
    }, {
      path: '/Para_Inquire_start',
      name: 'Para_Inquire_start',
      meta: {
        auth: true,
      },
      component: () => import('@/views/Paramanage/Para_Inquire_start.vue'),//按时间汇总对比页面
    },  {
      path: '/test',
      name: 'test',
      meta: {
        auth: true,
      },
      component: () => import('@/views/test/test.vue'),//按时间汇总对比页面
    },{
      path: '/total',
      name: 'total',
      meta: {
        auth: true,
      },
      component: () => import('@/views/EarlyWarning/total.vue'),//整体统计
    }, {
      path: '/Variation',
      name: 'Variation',
      meta: {
        auth: true,
      },
      component: () => import('@/views/EarlyWarning/Variation.vue'),//性能逐渐变差设备统计
    },{
      path: '/recoding',
      name: 'recoding',
      meta: {
        auth: true,
      },
      component: () => import('@/views/collection/recoding.vue'),//性能逐渐变差设备统计
    },{
      path: '/C4fault',
      name: 'C4fault',
      meta: {
        auth: true,
      },
      component: () => import('@/views/collection/C4fault.vue'),//性能逐渐变差设备统计
    },{
      path: '/E1fault',
      name: 'E1fault',
      meta: {
        auth: true,
      },
      component: () => import('@/views/collection/E1fault.vue'),//性能逐渐变差设备统计
    },{
      path: '/H1fault',
      name: 'H1fault',
      meta: {
        auth: true,
      },
      component: () => import('@/views/collection/H1fault.vue'),//性能逐渐变差设备统计
    },{
      path: '/upload',
      name: 'upload',
      meta: {
        auth: true,
      },
      component: () => import('@/views/collection/upload.vue'),//性能逐渐变差设备统计
    },{
      path: '/dayequ',
      name: 'dayequ',
      meta: {
        auth: true,
      },
      component: () => import('@/views/monitor/dayequ.vue'),//性能逐渐变差设备统计
    },


];

export default userRoutes;
