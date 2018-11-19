import Vue from 'vue';
import Vuex from 'vuex';
import SuperHttp from '../utils/super_http_server';
import state from './state';
import mutations from './mutation';
import { globalMethod } from '../utils/tools';
Vue.use(Vuex);
globalMethod(); // 加载全局方法
const createStore = () => {
    let store = new Vuex.Store({
        strict: process.env.NODE_ENV !== 'production',
        state,
        mutations,
    });
    store.$http = new SuperHttp(true, true);
    return store;
};
if (module.hot) {
    // state热重载，避免数据丢失
    // 使 action 和 mutation 成为可热重载模块
    module.hot.accept(['./mutation.js'], () => {
        // 获取更新后的模块
        // 因为 babel 6 的模块编译格式问题，这里需要加上 `.default`
        const newMutations = require('./mutation.js').default;
        // 加载新模块
        store.hotUpdate({
            mutations: newMutations,
        });
    });
}
export default createStore;
