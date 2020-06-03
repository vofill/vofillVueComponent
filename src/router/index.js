import Vue from 'vue'
import Router from 'vue-router'
import index from '@/view/Index'
import component from '@/view/Component'
import table from '@/view/Table'
import slider from '@/view/Slider'
import progressBar from '@/view/ProgressBar'
import lsSelect from '@/view/LRSelect'
import tree from '@/view/TreeData'
import timeaxis from '@/view/TimeAxis'

Vue.use(Router)

export default new Router({
  // mode: 'hash',
  linkActiveClass: '',
  linkExactActiveClass: '',
  routes: [
    {
      path: '/index',
      name: 'Index',
      component: index
    },
    {
      path: '/component',
      name: 'Component',
      component: component
    },
    {
      path: '/table',
      name: 'Table',
      component: table
    },
    {
      path: '/slider',
      name: 'Slider',
      component: slider
    },
    {
      path: '/progressBar',
      name: 'ProgressBar',
      component: progressBar
    },
    {
      path: '/lrSelect',
      name: 'LRSelect',
      component: lsSelect
    },
    {
      path: '/tree',
      name: 'Tree',
      component: tree
    },
    {
      path: '/timeaxis',
      name: 'TimeAxis',
      component: timeaxis
    }
  ]
})
