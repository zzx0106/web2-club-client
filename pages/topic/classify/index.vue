<template>
    <div class="classify-container">
        <div class="top">
            <title class="home-title">分类</title>
        </div>
        <div class="sub-top">
            <Input v-model="tabType" placeholder="请输入语言类型" search clearable style="width: 200px" />
            <Radio class="radio" :arr="radioArr" @radioType="radioChange"></Radio>
        </div>
        <div>
            <TabList @sentSearchTag="getSearchTag" :tabList="this.tabsList" />
        </div>
    </div>
</template>
<script>
import { Input } from 'iview';
import Radio from '~/components/public/Radio';
import TabList from '~/components/public/TabList';
export default {
    async asyncData({ req, store, route, redirect }) {
        if (route.path === '/topic/') redirect({ path: '/topic/home' });
        const headers = req && req.headers;
        const isServer = process.server;
        if (isServer && !!!headers.cookie) redirect({ path: '/user/login' });
    },
    data() {
        return {
            radioArr: ['Popular', 'Name', 'Newest'],
            tabType: '',
            tabsList: [],
        };
    },
    async mounted() {
        try {
            let tabs = await this.$http.allTabs();
            if (tabs.msg !== 'ok') {
                Message.error(tabs.rspinf);
                return;
            }
            this.tabsList = tabs.data.tabs.sort((one, two) => {
                return two.hot - one.hot;
            });
            console.log('tabsList', JSON.parse(JSON.stringify(this.tabsList)));
        } catch (error) {
            console.log(error);
        }
    },
    methods: {
        radioChange(type) {
            if (process.server) return false;
            if (type === 'Newest') {
                // 按时间
                this.tabsList = this.tabsList.sort((one, two) => {
                    return Date.parse(two.create_at) - Date.parse(one.create_at);
                });
            } else if (type === 'Name') {
                // 按首字母排序
                this.tabsList = this.tabsList.sort((one, two) => {
                    return (
                        one.name
                            .substring(0, 1)
                            .toLowerCase()
                            .charCodeAt() -
                        two.name
                            .substring(0, 1)
                            .toLowerCase()
                            .charCodeAt()
                    );
                });
            } else {
                // 安热度
                this.tabsList = this.tabsList.sort((one, two) => {
                    return two.hot - one.hot;
                });
            }
        },
        getSearchTag(item) {
            this.$router.push({
                path: `/topic/classify/${item._id}`,
                query: {
                    name: item.name,
                    hot: item.hot,
                },
            });
        },
    },
    components: {
        Radio,
        Input,
        TabList,
    },
};
</script>
<style lang="sass" scoped>
    @import '~assets/css/index.scss';
    .classify-container {
        .top {
            @include display-flex();
            margin-bottom: 27px;
            .home-title {
                @include flex(1);
                display: block;
                font-size: 27px;
                color: #242729;
                font-weight: 600;
            }
        }
        .sub-top {
            @include display-flex();
            @include justify-content(space-between);
            padding-bottom: 16px;
            margin: 0 15px;
        }
    }
</style>
