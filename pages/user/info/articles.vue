<template>
    <div class="nav-tab-contaner">
        <LoadMain :loaded="loaded">
            <ListView slot="load" :topicData="data" />
        </LoadMain>
    </div>
</template>
<script>
import { Message, Spin } from 'iview';
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
            const result = await this.$http.getTopicsByAuthorId();
            if (result.msg === 'ok') {
                console.log(' result.data', result.data);
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
    components: { ListView, Spin, LoadMain },
};
</script>
<style lang="sass" scoped>
.nav-tab-contaner {
    position: relative;
    min-height: 200px;
}
</style>
