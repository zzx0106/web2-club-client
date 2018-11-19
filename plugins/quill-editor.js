// 富文本 编辑器
import Vue from 'vue';
import Quill from 'quill';
import VueQuillEditor from 'vue-quill-editor';

import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';

import { ImageDrop } from 'quill-image-drop-module'; // 富文本支持复制图片
import ImageResize from 'quill-image-resize-module'; // 富文本支持改变图片大小

Quill.register('modules/imageDrop', ImageDrop);
Quill.register('modules/imageResize', ImageResize);
Vue.use(VueQuillEditor);
