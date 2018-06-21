/**
 * Created by peterpan on 2018/5/23.
 */
import './css/base.css';

import Vue from 'vue';
import App from './app.vue';
Vue.config.devtools = true;

import router from './router';

// 引入mockjs
require('./mock.js');

import axios from 'axios';
Vue.prototype.http = axios;

import Velocity from 'velocity-animate';
Vue.prototype.velocity = Velocity;

// 封装vue-bus.js
import VueBus from './vue-bus/vue-bus.js'
Vue.use(VueBus);
/**
 * 使用vue-bus要注意：
 * 1.$bus.on应该在create钩子内使用，如果在mounted使用，可能会接收不到来自其他组件created钩子内发出的事件
 * 2.如果使用了$bus.on，在beforeDestry钩子里应该再使用$bus.off解除，因为组件销毁后就没有必要把监听的句柄存储在vue-bus里了。
 *
 */

/* eslint-disable no-new */
let vm = new Vue({
    el: '#app',
    router,
    render: h => h(App),

    //  常用的三个钩子，钩子内的this指向的是调用它的Vue实例
    created: function () {
        //  实例创建完成后调用，此阶段完成了数据的观测等，但尚未挂载，$el还不可用。需要初始化处理一些数据时会比较有用。
        console.log('Vue实例创建完成');
    },
    mounted: function () {
        //  el挂载到实例上后会调用，第一个业务逻辑一般从这里开始。
        console.log("Vue实例挂载完成");
    },
    beforeDestroy: function () {
        //  实例销毁之前调用。主要是解绑一些使用addEventListener监听的事件等。
    },
});