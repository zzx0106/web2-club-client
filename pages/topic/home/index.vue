<template>
    <div class="home-container">
        <div class="top">
            <title class="home-title">首页</title>
            <div class="add-btin">
                <Button size="large" icon="md-add" type="info" @click="newTopic">Add</Button>
            </div>
        </div>
        <div class="sub-top">
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
    async asyncData({ req, store, redirect }) {
        const headers = req && req.headers;
        const isServer = process.server;
        if (isServer && !!!headers.cookie) redirect({ path: '/user/login' });
        try {
            const tab = 'all';
            const topicData = await store.$http.getTopic({ tab, headers });
            if (topicData.msg !== 'ok') return { topicData: [] };
            return { topicData: topicData.data };
        } catch (error) {
            console.log(error);
            if (error && error.response.status === 401) redirect({ path: '/user/login' });
            return { topicData: [] };
        }
    },
    data() {
        return {
            radioArr: ['Instring', 'Hot', 'Newest'],
            topicData: {},
        };
    },
    async mounted() {
        this.topicData.sort((o, n) => {
            return n.visit_count + n.collect_count + n.ups.length - (o.visit_count + o.collect_count + o.ups.length);
        });
    },
    methods: {
        radioChange(type) {
            switch (type) {
                case 'Hot':
                    this.topicData.sort((o, n) => {
                        return n.visit_count - o.visit_count;
                    });
                    break;
                case 'Newest':
                    this.topicData.sort((o, n) => {
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
        },
        newTopic() {
            this.$router.push({
                path: '/topic/create',
            });
        },
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
    .home-container {
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
            @include justify-content(flex-end);
            padding-bottom: 16px;
        }
    }
</style>
