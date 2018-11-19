<template>
    <div class="classify-list-container">
        <div class="top">
            <title class="home-title">分类 [ {{this.$route.query.name || ''}} ]</title>
        </div>
        <div class="sub-top">
            <div class="sub-title">{{this.$route.query.hot || ''}} 篇文章</div>
            <Radio class="radio" :arr="radioArr" @radioType="radioChange"></Radio>
        </div>
        <ListView :topicData="topicData" />
        <BackTop :height="100" :bottom="105">
        </BackTop>
    </div>
</template>
<script>
import { Button, BackTop } from 'iview';
import Radio from '~/components/public/Radio.vue';
import ListView from '~/components/public/ListView.vue';
export default {
    async asyncData({ req, store, params, redirect }) {
        const headers = req && req.headers;
        const isServer = process.server;
        if (isServer && !!!headers.cookie) redirect({ path: '/user/login' });
        try {
            const tabId = params.tagTopicList;
            const topicData = await store.$http.find_tab_topic(tabId, headers);
            console.log('请求', topicData);
            if (topicData.msg !== 'ok') return { topicData: [] };
            return { topicData: topicData.data.topics };
        } catch (error) {
            console.log(error);
        }
    },
    data() {
        return {
            radioArr: ['Instring', 'Hot', 'Newest'],
            topicData: [],
        };
    },
    async mounted() {
        console.log('this', this.$route.params.list);
        // // const topicData = await this.$http.getTopic();
        // console.log('...', this);
        // this.topicData.sort((o, n) => {
        //     return n.visit_count + n.collect_count + n.ups.length - (o.visit_count + o.collect_count + o.ups.length);
        // });
        console.log(',topicData', this.topicData);
        console.log(',topicData', JSON.parse(JSON.stringify(this.topicData)));
        // console.log(',piasfas', this.topicData);
    },
    methods: {
        radioChange(type) {
            console.log(type)
            switch (type) {
                case 'Hot':
                    this.topicData.sort((o, n) => {
                        return n.visit_count - o.visit_count;
                    });
                    break;
                case 'Newest':
                    this.topicData.sort((o, n) => {
                        console.log('Date.parse(n.create_at)', Date.parse(n.create_at));
                        return Date.parse(n.create_at) - Date.parse(o.create_at);
                    });
                    break;
                default:
                    this.topicData.sort((o, n) => {
                        return (
                            n.visit_count +
                            n.collect_count +
                            n.ups.length -
                            (o.visit_count + o.collect_count + o.ups.length)
                        );
                    });
                    break;
            }
            console.log(JSON.parse(JSON.stringify(this.topicData)));
        },
        // newTopic() {
        //     this.$router.push({
        //         path: '/topic/create',
        //     });
        // },
    },
    components: {
        Button,
        Radio,
        ListView,
        BackTop,
    },
};
</script>
<style lang="sass" scoped>
    @import '~assets/css/index.scss';
    .classify-list-container {
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
            .sub-title {
                font-size: 20px;
                color: #242729;
                font-weight: 600;
                margin-left: 15px;
            }
        }
    }
</style>
