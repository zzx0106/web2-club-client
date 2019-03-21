<template>
    <div class="search-contener">
        <ListView v-if="search_type === 'topic'"
                  :topicData="STATE_searchData" />
        <ul v-else>
            <li @click="goUserDetail(item)"
                class="follow-item"
                v-if="STATE_searchData.length > 0"
                v-for="(item, index) in STATE_searchData"
                :key="item._id">
                <div class="follow-item-left">
                    <img :src="item.avatar"
                         :alt="item.nickname"
                         width="100%"
                         height="auto">
                </div>
                <div class="follow-item-center">
                    <h1>{{item.nickname}}</h1>
                    <div>
                        <span>积分：{{item.score}}</span>
                    </div>
                    <div>
                        <span>简介：{{item.simple_message}}</span>
                    </div>
                    <div>
                        <span>职位：{{item.job || '暂未填写'}}</span>
                    </div>
                    <div>
                        <span v-for="_item in item.good_at_technology">{{_item}}</span>
                    </div>
                </div>
            </li>
            <li class="nothing"
                v-show="!(STATE_searchData.length > 0)">
                <Icon type="ios-paper-outline" />
                <p>暂无数据</p>
            </li>
        </ul>

    </div>
</template>
<script>
import ListView from "~/components/public/ListView.vue";
import { mapState } from "vuex";

export default {
    data() {
        return {
            keyword: this.$route.query.keyword,
            topicData: [],
            search_type: "topic"
        };
    },

    mounted() {
        // const search_type = this.$route.query.search_type || "topic"; // 搜索类型
        // this.search_type = search_type;
        // if (this.$route.query && this.$route.query.keyword) {
        //     const search = await this.$http.search({
        //         search_type,
        //         keyword: this.$route.query.keyword
        //     });
        //     console.log("search", JSON.parse(JSON.stringify(search)));
        //     if (search.data.length > 0) {
        //         this.topicData = search.data;
        //     }
        // } else {
        //     this.$Message.warning("需要填写搜索内容");
        // }
        // console.log(this.$route.query.wd);
    },
    methods: {
        goUserDetail(item) {
            console.log(this.$route);
            location.href = `/user/info/articles?name=${item.name}&searchUser=${
                item.name
            }`;
        }
    },
    computed: {
        // ...mapState(['STATE_searchData'])
        ...mapState({
            STATE_searchData: function(state) {
                console.log("this.$route", this);
                const search_type = this.$route.query.search_type || "topic"; // 搜索类型
                this.search_type = search_type;
                return state.STATE_searchData;
            }
        })
    },
    watch: {
        // 监听路由改变
        async $route() {
            console.log("监听路由改变");
            // const search_type = this.$route.query.search_type || "topic"; // 搜索类型
            // this.search_type = search_type;
            // if (this.$route.query && this.$route.query.keyword) {
            //     const search = await this.$http.search({
            //         search_type,
            //         keyword: this.$route.query.keyword
            //     });
            //     console.log("search", JSON.parse(JSON.stringify(search)));
            //     if (search.data.length > 0) {
            //         this.topicData = search.data;
            //     }
            // } else {
            //     this.$Message.warning("需要填写搜索内容");
            // }
        }
    },
    components: {
        ListView
    }
};
</script>
<style lang="sass" scoped>
@import '~assets/css/index.scss';
.search-contener {
    .follow-item {
        @include display-flex();
        @include align-items(flex-start);
        height: 100px;
        padding: 0 25px;
        border-bottom: 1px solid #eff0f1;
        .follow-item-left {
            width: 45px;
            height: 45px;
            margin-right: 20px;
            overflow: hidden;
            border-radius: 20%;
            margin-top: 10px;
        }
        .follow-item-center {
            @include flex(1);
            h1 {
                font-size: 1.333rem;
                font-weight: 600;
                color: #2e3135;
            }
            span {
                margin-top: 0.6rem;
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
