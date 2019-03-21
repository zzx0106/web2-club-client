<template>
    <div class="list-view">
        <ul class="list">
            <li v-show="topicData.length > 0" class="list-item" v-for="(item, index) in topicData" :key="item.id">
                <div class="tags">
                    <div class="tag">
                        <div class="tag-top">
                            <span>{{(item.ups || []).length}}</span>
                        </div>
                        <div class="tag-bottom">
                            <span>ups</span>
                        </div>
                    </div>
                    <div class="tag">
                        <div class="tag-top">
                            <span>{{item.visit_count}}</span>
                        </div>
                        <div class="tag-bottom">
                            <span>views</span>
                        </div>
                    </div>
                    <div class="tag">
                        <div class="tag-top">
                            <span>{{item.reply_count}}</span>
                        </div>
                        <div class="tag-bottom">
                            <span>answer</span>
                        </div>
                    </div>
                </div>
                <div class="content">
                    <div class="content-title">
                        <!-- <div class="title-tag">
                            <i class="title-tag-icon iconfont icon-integral"></i>
                            <span>+100</span>
                        </div> -->
                        <nuxt-link class="title" :to="`/topic/${item.id || item._id }`">{{item.title}}</nuxt-link>
                    </div>
                    <div class="content-box">
                        <ul class="content-tags">
                            <li v-show="item.tab.length > 0" v-for="(_item, _index) in item.tab" class="tag" :key="_index">{{_item.name}}</li>
                        </ul>
                        <div class="content-time">
                            <div class="create-at">
                                <span>create at : {{item.create_at | timeFormat}}</span>
                            </div>
                            <nuxt-link class="create-user" to="aaa/">{{item.author && item.author.nickname}}
                            </nuxt-link>
                            <div class="create-user-level">{{item.author && item.author.level}}</div>
                        </div>
                    </div>
                </div>
            </li>
            <li class="nothing" v-show="!(topicData.length > 0)">
                <Icon type="ios-paper-outline" />
                <p>暂无数据</p>
            </li>
        </ul>
    </div>
</template>
<script>
import {} from 'iview';
export default {
    props: ['topicData'],
    data() {
        return {
            radioArr: 'Instring',
            data: [
                // {
                //        id: '123',
                // author_id: 'zzx222',
                // tab: 'all',
                // content,
                // 'title',
                // 'last_reply_at',
                // 'good',
                // 'top',
                // 'reply_count',
                // 'visit_count',
                // 'create_at',
                // 'author',
                // }
            ],
        };
    },
    methods: {},
    components: {},
};
</script>
<style lang="sass" scoped>
    @import '~assets/css/index.scss';
    .list-view {
        border-top: 1px solid #d6d9dc;
        .list {
            .list-item {
                @include display-flex();
                oveflow: hidden;
                border-bottom: 1px solid #eff0f1;
                padding: 12px 8px;
                .tags {
                    @include display-flex();
                    @include flex-wrap(nowrap);
                    @include align-items(flex-start);
                    float: none;
                    margin-right: 0;
                    padding: 0 8px 0 0;
                    box-sizing: content-box;
                    .tag {
                        @include display-flex();
                        @include flex-direction(column);
                        min-width: 38px;
                        margin: 0 3px 0 0;
                        font-size: 11px;
                        color: #848d95;
                        padding: 3px  6px;
                        .tag-top {
                            font-size: 17px;
                            font-weight: 300;
                            color: #6a737c;
                            text-align: center;
                            // margin-bottom: 4px;
                        }
                        .tab-bottom {

                        }
                    }
                }
                .content {
                    @include flex(1);
                    .content-title {
                        @include display-flex();
                        .title-tag {
                            @include display-flex();
                            @include align-items(center);
                            @include justify-content(flex-start);
                            @include flex-wrap(nowrap);
                            height: 20px;
                            // width: 55px;
                            font-size: 11px;
                            padding: 3px 6px;
                            background-color: #0077dd;
                            border-radius: 2px;
                            color: #fff;
                            background-color: #2d8cf0;
                            border-color: #2d8cf0;
                            margin-right: 5px;
                            line-height: 20px;
                            .title-tag-icon {
                                margin-top: 2px;
                                font-size: 5px;
                            }
                        }
                        .title {
                            @include flex(1);
                            font-size: 16px;
                            font-weight: 400;
                            color: #07C;
                            &:hover {
                                color: #3af;
                            }
                        }
                    }
                    .content-box {
                        @include display-flex();
                        @include justify-content(space-between);
                        @include align-items(center);
                        @include flex-wrap(wrap);
                        .content-tags {
                            @include display-flex();
                            .tag {
                                display: inline-block;
                                padding: 6px 8px;
                                margin: 2px 8px 2px 0;
                                font-size: 11px;
                                line-height: 1;
                                white-space: nowrap;
                                text-decoration: none;
                                text-align: center;
                                border-width: 1px;
                                border-style: solid;
                                border-radius: 3px;
                                transition: all .15s ease-in-out;
                                cursor: pointer;
                                font-size: 12px;
                                color: #39739d;
                                background-color: #E1ECF4;
                                border-color: #E1ECF4;
                                &:hover {
                                    color: #39739d;
                                    background-color: #CEE0ED;
                                    border-color: #E1ECF4;
                                }
                            }
                        }
                        .content-time {
                            @include display-flex();
                            @include justify-content(space-between);
                            font-size: 12px;
                            .create-at {
                                color: #9199a1;
                            }
                            .create-user {
                                color: #07C;
                                margin-left: 5px;
                                font-weight: 600;
                                &:hover {
                                    color: #3af;
                                }
                            }
                            .create-user-level {
                                font-weight: 600;
                                margin-left: 5px;
                                color: #FF9900;
                            }
                        }
                    }
                  
               
                }
            }
        }
    }
</style>
