<template>
    <div class="topic-container">
        <Layout>
            <!-- <Affix class="top"> -->
            <Header class="top-header">
                <sHeader @changeLeftSider="changeLeftSider" />
            </Header>
            <!-- </Affix> -->
            <Sider ref="side1" :style="{position: 'fixed', height: '100vh', overflow: 'auto', zIndex: 10}" class="left-sider" width="165" hide-trigger collapsible v-model="isCollapsed2" breakpoint="sm" hide-trigger :default-collapsed="true" :collapsed-width="165">
                <LeftSidebar :tabs="tabs" />
            </Sider>
            <Layout>
                <Sider :style="{zIndex: -1}" @on-collapse="leftSiderChange" :class="{'hidden-left': showLeft}" class="left-sider" width="165" hide-trigger collapsible v-model="isCollapsed2" breakpoint="sm" hide-trigger :default-collapsed="true" :collapsed-width="165">
                </Sider>
                <Content class="center-content">
                    <Body/>
                </Content>
                <!-- <Sider collapsible width="270" breakpoint="md" hide-trigger :default-collapsed="true" v-model="isCollapsed" :collapsed-width="270">
                    <RightSidebar />
                </Sider> -->
            </Layout>
            <!-- <Footer>Footer</Footer> -->
        </Layout>
    </div>
</template>
<script>
import { Affix, Layout, Header, Sider, Content, Menu, MenuItem, Icon, Submenu, MenuGroup } from 'iview';
import LeftSidebar from '~/components/topic/LeftSidebar.vue';
import RightSidebar from '~/components/topic/RightSidebar.vue';
import Body from '~/components/topic/Body.vue';
import sHeader from '~/components/topic/Header.vue';
import { mapState, mapMutations } from 'vuex';
export default {
    // async asyncData({ store }) {
    //     console.log('进入asycn1111');
    // },
    data() {
        return {
            tabs: [
                {
                    name: '首页',
                    path: '/topic/home',
                    icon: 'ios-home',
                },
                {
                    name: '分类',
                    path: '/topic/classify',
                    icon: 'md-pricetag',
                },
                {
                    name: '其他',
                    path: '/topic/other',
                    icon: 'ios-apps',
                },
            ],
            isCollapsed: true,
            isCollapsed2: true,
            hiddenLeftSider: false, // 是否隐藏左侧
            selfShow: false, //自发性点击
        };
    },
    mounted() {
        this.showLeftSider(window.innerWidth < 768);
        window.onclick = (e) => {
            if (window.innerWidth > 768) return; // 只有小屏走这里
            if (!this.selfShow) return;
            if (e.target.className.indexOf('logo-menu') !== -1) {
                // 如果点击logo菜单
            } else {
                // 其他位置
                this.selfShow = !this.selfShow;
                this.$refs.side1.toggleCollapse();
            }
        };
    },
    methods: {
        ...mapMutations(['showLeftSider']),
        leftSiderChange(e) {
            if (this.selfShow) return;
            this.showLeftSider(e);
        },
        changeLeftSider() {
            this.selfShow = !this.selfShow;
            this.$refs.side1.toggleCollapse();
        },
    },
    computed: {
        ...mapState(['showLeft']),
    },
    components: {
        Affix,
        sHeader,
        Body,
        Layout,
        Header,
        LeftSidebar,
        RightSidebar,
        Content,
        Menu,
        MenuItem,
        Icon,
        Submenu,
        MenuGroup,
    },
};
</script>

<style lang="sass" scoped>
    @import '~assets/css/index.scss';
    .topic-container {
        .top-header {
            position: fixed;
            z-index: 20;
            top: 0;
            width: 100%;
            max-width: 1260px;
            height: 47px;
            background: #fafafb;
            box-shadow: 0 1px 0 rgba(12,13,14,0.1), 0 1px 6px rgba(59,64,69,0.1);
            margin: 0;
            padding: 0;
            overflow: hidden;
        }
        .hidden-left {
            display: none;
        }
        .left-sider {
            position: fiexd !important;
            overflow: hidden;
            background: #fff;
            padding-top: 47px;
            z-index: 0;
            &::after {
                content: '';
                display: block;
                width: 1px;
                height: 100%;
                background: #dcdee2;
                position: absolute;
                top: 0;
                bottom: 0;
                right: 0;
                z-index: 1;
            }
        }
        .center-content {
            margin-top: 47px;
            background: #fff;
        }
    }
</style>
