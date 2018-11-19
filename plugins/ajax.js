import Vue from 'vue';
import SuperHttp from '../utils/super_http';

Vue.prototype.$http = new SuperHttp(true, true);
