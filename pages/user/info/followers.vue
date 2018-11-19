<template>
    <!-- 粉丝列表 -->
    <div class="nav-tab-contaner">
        <LoadMain :loaded="loaded">
            <ul slot="load">
                <li @click="goUserDetail(item)" class="follow-item" v-if="followers.length > 0" v-for="(item, index) in followers" :key="item._id">
                    <div class="follow-item-left">
                        <img :src="item.avatar" :alt="item.nickname" width="100%" height="auto">
                    </div>
                    <div class="follow-item-center">
                        <h1>{{item.nickname}}</h1>
                        <div>
                            <span v-for="_item in item.good_at_technology">{{_item}}</span>
                        </div>
                    </div>
                    <div class="follow-item-right" @click="followAuthor(item)">
                        关注
                    </div>
                </li>
                <li class="nothing" v-show="!(followers.length > 0)">
                    <Icon type="ios-paper-outline" />
                    <p>暂无数据</p>
                </li>
            </ul>
        </LoadMain>
    </div>
</template>
<script>
import { Message, Icon } from 'iview';
import LoadMain from '~/components/public/LoadMain.vue';
import { mapMutations } from 'vuex';
export default {
    data() {
        return {
            followers: [
                // {
                //     name: 'user.name',
                //     nickname: 'zzx',
                //     avatar: 'http://www.gravatar.com/avatar/26a1840dda866325064ed36a63fb0c66?size=45',
                //     _id: '123123',
                //     good_at_technology: ['java', 'js'],
                // },
            ],
            loaded: true,
        };
    },
    async mounted() {
        this.loaded = false;
        try {
            const result = await this.$http.getFollowers();
            if (result.msg === 'ok') {
                this.followers = result.data.followers;
            }
        } catch (error) {
            console.log(error);
            Message.error('请求失败');
        }
        this.loaded = true;
    },
    methods: {
        ...mapMutations(['toFetchUserInfo']),
        goUserDetail(item) {
            console.log(item);
        },
        async followAuthor({ _id = '' }) {
            if (_id) {
                try {
                    const result = await this.$http.addFollowers({ author_id: _id });
                    console.log(result, this.user);
                    if (result.msg === 'ok') {
                        if (result.data.type === 0) {
                            this.toFetchUserInfo();
                            Message.success(result.data.rspinf);
                        } else {
                            Message.error(result.data.rspinf);
                        }
                    }
                } catch (error) {
                    console.error(error);
                    Message.error('操作失败');
                }
            }
        },
    },
    computed: {},
    components: { LoadMain, Icon },
};
</script>
<style lang="sass" scoped>
@import '~assets/css/index.scss';
.nav-tab-contaner {
    .follow-item {
        @include display-flex();
        @include align-items(center);
        height: 100px;
        padding: 0 25px;
        .follow-item-left {
            width: 45px;
            height: 45px;
            margin-right: 20px;
            overflow: hidden;
            border-radius: 20%;
        }
        .follow-item-center {
            @include flex(1);
            h1 {
                font-size: 1.333rem;
                font-weight: 600;
                color: #2e3135;
            }
            span {
                margin-top: .6rem;
                font-size: 12px;
                font-weight: 500;
                color: #b9c0c8;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                margin-right: 8px;
            }
        }
        .follow-item-right {
            width: 90px;
            height: 30p;
            line-height: 30px;
            text-align: center;
            background: #3385ff;
            color: #fff;
            border-radius: 5px;
            cursor: pointer;
            &:hover {
                background: #317ef3; 
            }
        }
    }
}
</style>
