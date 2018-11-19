<template>
    <div class="nav-tab-contaner">
        <LoadMain :loaded="loaded">
            <ListView slot="load" :topicData="data" />
        </LoadMain>
    </div>
</template>
<script>
import { Message } from 'iview';
import ListView from '~/components/public/ListView.vue';
import LoadMain from '~/components/public/LoadMain.vue';
export default {
    data() {
        return {
            data: [],
            loaded: false,
        };
    },
    async mounted() {
        this.loaded = false;

        try {
            console.log('this.router.query.name', this.$route.query.name);
            const result = await this.$http.get_collect_by_name(this.$route.query.name);
            // const result = await this.$http.getTopicsByAuthorId('5b5d67e6a33d6159dc70e2b3');
            if (result.msg === 'ok') {
                console.log(' result.data', JSON.parse(JSON.stringify(result.data)));
                this.data = result.data;
            }
        } catch (error) {
            console.log(error);
            Message.error('请求失败');
        }
        this.loaded = true;
    },
    methods: {},
    computed: {
        type() {
            return this.$route.params.nav || '0';
        },
    },
    components: { ListView, LoadMain },
};
</script>
<style lang="sass" scoped>
    .nav-tab-contaner {
       
    }
</style>
