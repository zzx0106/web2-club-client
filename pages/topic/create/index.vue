<template>
    <div class="create-container">
        <div class="top">
            <title class="home-title">新建</title>
            <Select filterable @on-change="onOpenChange" v-model="tabsSelect" multiple style="width:260px">
                <Option v-if="tabsList.length > 0" v-for="item in tabsList" :value="item.name" :key="item.name">{{ item.name }}</Option>
            </Select>
        </div>
        <div class="content">
            <p>没有找到分类？添加一个新的！</p>
            <Button style="margin: 10px 0;" type="primary" @click="showModal = true">添加分类</Button>
            <Modal class="modal-box" v-model="showModal" title="新增分类" :loading="loading" @on-ok="checkTab" ok-text="确定" cancel-text="取消" width="400">
                <Input v-model="tab" placeholder="类型" clearable style="width: 200px" />
                <p style="16px;margin-top:10px;">必须是没有的分类才能添加！</p>
            </Modal>
            <br>
            <div>
                <Input class="topic-title" v-model="title" placeholder="请输入标题" clearable />
                <div class="tags">

                    <Tag @on-close="handleClose(item)" v-for="(item, index) in tabs" :key="index" type="border" closable color="primary">{{item.name}}</Tag>
                </div>
                <QuillEditor id="topic-editor" ref="editor" class="editor-box" @editorContent="editorContent($event)"></QuillEditor>
                <Button class="btn-submit" type="primary" @click="submit()">发表文章</Button>

            </div>
        </div>
        <div></div>
    </div>
</template>
<script>
import { Button, Message } from 'iview';
import Radio from '~/components/public/Radio.vue';
import ListView from '~/components/public/ListView.vue';
import QuillEditor from '~/components/public/QuillEditor.vue';

export default {
    // async asyncData({ route, req, store, redirect }) {
    //     const isClient = process.client;
    //     const isServer = process.server;
    //     const headers = req && req.headers;
    //     console.log('route', !!!headers);
    //     console.log('route', headers);
    //     // if (!!!headers) redirect({ path: '/user/login' });
    //     try {
    //         let tabs;
    //         console.log('headers', headers);
    //         if (isClient) tabs = await store.$http.allTabs({ headers });
    //         if (isServer) tabs = await store.$http.allTabs({ headers });

    //         if (tabs.msg !== 'ok') return { tabsList: [] };
    //         return { tabsList: tabs.data };
    //     } catch (error) {
    //         console.log(error);
    //     }
    // },
    data() {
        return {
            tabs: '',
            showModal: false,
            loading: true,
            tab: '', // 输入的tab
            tabs: [], // 提交的tabs
            tabsList: [], // 下拉框的tabs
            tabsSelect: [], // 下拉框选中的tabs
            title: '',
        };
    },
    async mounted() {
        try {
            let tabs = await this.$http.allTabs();
            console.log('tabs', tabs);
            if (tabs.msg !== 'ok') {
                Message.error(tabs.rspinf);
                return;
            }
            this.tabsList = tabs.data.tabs.sort((one, two) => {
                return two.hot - one.hot;
            });
        } catch (error) {
            console.log(error);
        }
    },
    methods: {
        onOpenChange(typeArr) {
            this.tabs = this.tabsList.filter((item) => {
                // 找到对应数组
                return typeArr.indexOf(item.name) !== -1;
            });
        },
        handleClose(item) {
            this.tabsSelect = this.tabsSelect.filter((_item) => {
                return _item !== item.name;
            });
            this.tabs = this.tabs.filter((_item) => {
                return _item !== item;
            });
        },
        async checkTab() {
            this.loading = true;
            try {
                const result = await this.$http.findTab({ tab: this.tab });
                const someTab = this.tabs.some((item) => {
                    console.log(item.name, this.tab);
                    return item.name === this.tab;
                });
                console.log('someTab', someTab);
                if (result.msg === 'ok' && result.data.type === 0 && !someTab) {
                    // 0 未有 1已有
                    this.showModal = false;
                    this.tabs.push({
                        name: this.tab,
                        hot: 1, // 1创建数据库时会默认为1
                    });
                } else {
                    this.showModal = true;
                    this.loading = false;
                    Message.error('该分类已存在');
                }
            } catch (error) {
                this.showModal = false;
                console.log(error);
                Message.error('请求失败');
            }
        },
        editorContent(html) {
            this.content = html;
        },
        async submit() {
            try {
                if (this.title.length < 5) {
                    Message.error('标题长度要大于5个字');
                    return;
                }
                if (this.tabs.length < 1) {
                    Message.error('至少有一个分类');
                    return;
                }
                if (this.content.length < 10) {
                    Message.error('输入内容过少，或为空');
                    return;
                }
                console.log({
                    title: this.title,
                    tab: this.tabs,
                    content: this.content,
                });
                const reslut = await this.$http.createTopic({
                    title: this.title,
                    tab: this.tabs,
                    content: this.content,
                });
                if (reslut.msg === 'ok') {
                    Message.success('发表成功');
                    setTimeout(() => {
                        window.history.go(-1); // 返回首页
                    }, 2000);
                } else {
                    Message.error(reslut.data.rspinf);
                }
                console.log('result', reslut, 'color:red;font-weight:bold;');
            } catch (error) {
                console.log(error);
                // Message.error('系统错误');
            }
        },
    },
    components: {
        Button,
        Radio,
        ListView,
        QuillEditor,
    },
};
</script>
<style lang="sass" scoped>
    @import '~assets/css/index.scss';
    .create-container {
        .top {
            @include display-flex();
            @include align-items(center);
            margin-bottom: 27px;
            .home-title {
                @include flex(1);
                display: block;
                font-size: 27px;
                color: #242729;
                font-weight: 600;
            }
        }
        .content {
            margin: 10px 15px;;
            .modal-box {
                font-size: 16px !important;
            }
        }
   
        .topic-title {
            input {
                font-size: 17px !important;
            }
            font-weight: 500;
            margin-bottom: 10px;
        }
        #topic-editor {
            margin-top: 15px;
        }
        .btn-submit {
            margin-top: 10px;
        }
    }
</style>
