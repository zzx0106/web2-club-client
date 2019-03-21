<template>
    <div class="detail-container">
        <div class="top">
            <title class="detail-title">{{topicDataById.title}}</title>
        </div>
        <div class="sub-top">
            <div class="one">
                <img class="left"
                     :src="topicDataById.author && topicDataById.author.avatar"
                     width="50"
                     height="50"
                     alt="">
                <div class="right">
                    <div class="author-nickname">{{topicDataById.author && topicDataById.author.nickname}}
                        <Button v-if="topicDataById.author_id === user.id"
                                class="follower"
                                size="small"
                                type="primary">
                            自己
                        </Button>
                        <Button v-else
                                @click="followAuthor(topicDataById.author_id, isFollowing)"
                                class="follower"
                                size="small"
                                type="success">
                            <span class="is-follow">{{isFollowing ? '已关注' : '关注'}}</span>
                            <span>{{topicDataById.author && topicDataById.author.followers.length}}</span>
                        </Button>
                    </div>
                    <div class="author-level">{{topicDataById.author && topicDataById.author.level}}级大神</div>
                </div>
            </div>
            <div class="two">
                <div class="left">
                    <div v-show="!topicDataById.good"
                         class="good">顶</div>
                    <!-- <div class="iconfont" :class="[topicDataById.is_collect? 'icon-like_fill' : 'icon-like']"></div> -->
                    <div class="icon-box">
                        <i class="iconfont icon-like"></i>{{topicDataById.collect_count || 0}}</div>
                    <div class="icon-box">
                        <i class="iconfont icon-browse"></i>{{topicDataById.visit_count || 0}}</div>
                    <div class="icon-box">
                        <i class="iconfont icon-message"></i> {{(topicDataById.replies || []).length}}</div>
                </div>
                <div class="right">
                    <div class="create-at">创建于: {{topicDataById.create_at | timeFormat}}</div>
                    <div class="last-reply-at">最后一次回复: {{topicDataById.last_reply_at | timeFormat}}</div>

                </div>
            </div>
        </div>
        <div style="margin-top: 30px;margin-bottom: 50px;">
            <!-- 文本显示处 -->
            <div class="quill-editor ql-container ql-snow"
                 id="ql-editor">
                <div class="ql-editor"
                     ref="content"
                     v-html="topicDataById.content"></div>
            </div>
        </div>
        <div class="topic-ups">

            <Tooltip :delay="1500"
                     class="topic-ups-box"
                     content="觉得文章不错？赞一个吧！"
                     placement="top">
                <transition name="ups">
                    <span v-show="isTopicUpShow">+1</span>
                </transition>
                <Button class="topic-ups-icon-button"
                        type="success"
                        icon="md-thumbs-up"
                        @click="topicUp">
                    赞一个
                </Button>
            </Tooltip>
            <Tooltip class="topic-ups-box"
                     :delay="1500"
                     content="分享给好友或者谁"
                     placement="top">
                <Button class="topic-share-icon-button"
                        type="info"
                        icon="md-share">分享</Button>
            </Tooltip>
        </div>
        <div class="radio-box">
            <Radio class="radio"
                   :arr="radioArr"
                   @radioType="radioChange"></Radio>
        </div>
        <ul class="replies-box"
            v-if="(topicDataById.replies || []).length > 0">
            <li class="replies-item"
                v-for="(item, index) in topicDataById.replies"
                :key="index">
                <div class="replies-item-content">
                    <div class="replies-left">
                        <img class="replies-avatar"
                             :src="item.author.avatar"
                             alt="头像" />
                        <div class="replies-level">{{item.author.level}}级大神</div>
                        <div class="replies-is-start">{{item.author.is_start}}</div>
                    </div>
                    <div class="replies-right">
                        <div class="replies-top">
                            <div class="replies-nickname">{{item.author.nickname}}</div>
                            <span class="replies-time">{{item.create_at | timeFormat}}</span>
                        </div>
                        <div class="replies-center">
                            <!-- 文本显示处 -->
                            <div class="quill-editor ql-container ql-snow"
                                 id="ql-editor">
                                <div class="ql-editor"
                                     ref="content"
                                     v-html="item.content"></div>
                            </div>
                        </div>
                        <div class="replies-bottom">
                            <div></div>
                        </div>
                    </div>
                    <div class="replies-ups-box">
                        <div class="replies-ups"
                             @click="upReplies(item)">
                            <i v-if="isUpReplies(item)"
                               class="icon-ups iconfont icon-appreciatefill" />
                            <i v-else
                               class="icon-ups iconfont icon-appreciate" />
                            <span>{{item.ups.length}}</span>
                        </div>
                        <Icon @click="repliesSomeOne(item)"
                              class="replies-icon"
                              type="ios-return-left" />
                    </div>
                </div>
                <div class="replies-time-line">
                    <div></div>
                    <span>{{item.create_at | dateFormat('yyyy-MM-dd')}}</span>
                    <div></div>
                </div>
            </li>
        </ul>
        <div class="replies-none"
             v-else>
            <Icon class="replies-none-icon"
                  type="md-chatboxes" />
            <div class="replies-none-text">评论空空如也!</div>
        </div>
        <QuillEditor id="editor"
                     ref="editor"
                     class="editor-box"
                     @editorContent="editorContent($event)"></QuillEditor>
        <Button class="btn-submit"
                type="primary"
                @click="submit(topicDataById.id)">回复</Button>
        <div class="to-replie"
             @click="scrollToReplie">
            <Icon type="md-chatboxes" />
            <p>回复</p>
        </div>
        <div class="to-save"
             :class="{'is-saved' : topicDataById.is_collect}"
             @click="toSave">
            <i v-if="!topicDataById.is_collect"
               class="iconfont icon-like" />
            <i v-else
               class="iconfont icon-like_fill" />
            <p v-if="!topicDataById.is_collect"> 收藏</p>
            <p v-else> 已收藏</p>
        </div>
        <BackTop :height="100"
                 :bottom="105">
        </BackTop>
        <!-- <Footer>Footer</Footer> -->
    </div>
</template>
<script>
import hljs from "highlight.js";

import {
    Affix,
    Message,
    Button,
    Icon,
    Submenu,
    MenuGroup,
    Anchor,
    AnchorLink
} from "iview";
import LeftSidebar from "~/components/topic/LeftSidebar.vue";
import RightSidebar from "~/components/topic/RightSidebar.vue";
import Body from "~/components/topic/Body.vue";
import sHeader from "~/components/topic/Header.vue";
// import Breadcrumb from '~/components/public/Breadcrumb.vue';
import QuillEditor from "~/components/public/QuillEditor.vue";
import Radio from "~/components/public/Radio.vue";
import { getUserDataInGlobal, scrollTop } from "~/utils/tools.js";
export default {
    async asyncData({ req, store, route, redirect }) {
        if (route.path === "/topic/") redirect({ path: "/topic/home" });
        const headers = req && req.headers;
        const isServer = process.server;
        if (isServer && !!!headers.cookie) redirect({ path: "/user/login" });
        try {
            const { detail } = route.params;
            const topicDataById = await store.$http.getTopicByTopicId({
                id: detail,
                headers
            });
            if (topicDataById.msg !== "ok") return { topicDataById: [] };
            return { topicDataById: topicDataById.data };
        } catch (error) {
            console.log(error);
        }
    },
    data() {
        return {
            BreadcrumbArr: [
                {
                    icon: "ios-home-outline",
                    name: "首页",
                    href: "javascript:void(0)"
                },
                {
                    icon: "logo-buffer",
                    name: "详情",
                    href: ""
                }
            ],
            topicDataById: "",
            content: "",
            radioArr: ["Time", "Hot"],
            show: false,
            user: {}, // 缓存用户信息
            isTopicUpShow: false // topic点赞显示
        };
    },
    mounted() {
        this.show = true;
        if (this.topicDataById) {
            this.topicDataById.replies.sort((o, n) => {
                return Date.parse(n.create_at) - Date.parse(o.create_at);
            });
        }
        this.user = getUserDataInGlobal();
        console.log(
            "topicDataById",
            JSON.parse(JSON.stringify(this.topicDataById))
        );
    },
    methods: {
        editorContent(html) {
            console.log("html", html);
            this.content = html;
        },
        async submit(tid) {
            try {
                if (!this.content.trim()) {
                    Message.error("输入不能为空");
                    return;
                }
                if (!!!tid) {
                    Message.error("评论失败");
                    return;
                }

                const result = await this.$http.replie(tid, {
                    content: this.content
                });
                if (result.msg === "ok") {
                    const {
                        avatar,
                        is_star,
                        level,
                        name,
                        nickname,
                        id,
                        create_at
                    } = this.user;
                    let mySelf = {
                        author: {
                            avatar,
                            is_star,
                            level,
                            name,
                            nickname
                        },
                        id,
                        reply_id: this.topicDataById.author_id,
                        content: this.content,
                        create_at: new Date(),
                        ups: []
                    };
                    // 提交后加入评论末尾
                    let old_replies = this.topicDataById.replies;
                    old_replies = JSON.parse(JSON.stringify(old_replies));
                    old_replies.push(mySelf);
                    this.topicDataById.replies = old_replies;
                    this.$refs.editor.cleanContent(); // 清除富文本框内容
                    Message.success("回复成功");
                    return;
                } else {
                    Message.error("评论失败");
                    return;
                }
            } catch (error) {
                console.log(error);
                Message.error("系统错误");
            }
        },
        radioChange(type) {
            if (type === "Hot") {
                this.topicDataById.replies.sort((o, n) => {
                    return n.ups.length - o.ups.length;
                });
            } else {
                this.topicDataById.replies.sort((o, n) => {
                    return Date.parse(n.create_at) - Date.parse(o.create_at);
                });
            }
        },
        repliesSomeOne(item) {
            let at = ` &nbsp;&nbsp;<em style="color: #08c;">@${
                item.author.nickname
            }</em><span> &nbsp;&nbsp;</span>`;
            // this.$emit('at', at);
            this.$refs.editor.atController(at);
            // console.log(JSON.parse(JSON.stringify(item)));
        },
        scrollToReplie() {
            const sTop =
                document.documentElement.scrollTop || document.body.scrollTop;
            scrollTop(window, sTop, document.body.scrollHeight, 1000);
        },
        async toSave() {
            try {
                let result = null;
                const { is_collect, id } = this.topicDataById;
                console.log("is_collect", { topic_id: id });
                if (!is_collect)
                    result = await this.$http.add_collect({ topic_id: id });
                if (is_collect)
                    result = await this.$http.remove_collect({ topic_id: id });
                if (result.msg === "ok") {
                    if (result.data.type === "ok") {
                        this.topicDataById.is_collect = !this.topicDataById
                            .is_collect;
                        Message.success(result.data.rspinf);
                    } else {
                        Message.error(result.data.rspinf);
                    }
                } else {
                    Message.error(result.rspinf);
                }
            } catch (error) {
                console.log(error);
                // Message.error('收藏失败');
            }
        },
        async upReplies(item) {
            try {
                if (item.id === this.user.id) {
                    Message.success("嗯哼？不能自己赞自己哦");
                    return;
                }
                const result = await this.$http.upReplies(item.id);
                if (result.msg === "ok") {
                    if (result.data.type === 0) {
                        item.ups.push(this.user.id);
                        Message.success(result.data.rspinf);
                    } else if (result.data.type === 1) {
                        item.ups.remove(this.user.id);
                        Message.success(result.data.rspinf);
                    } else {
                        Message.error(result.data.rspinf);
                    }
                } else {
                    Message.error("点赞失败");
                }
            } catch (error) {
                console.error(error);
            }
        },
        isUpReplies(item) {
            if (process.server) return false;
            return item.ups.indexOf(this.user.id) !== -1;
        },
        // 点赞
        async topicUp() {
            try {
                if (
                    this.topicDataById.ups.some(item => {
                        return item.id === this.user.id;
                    })
                ) {
                    Message.error("您已经点过赞了哦");
                    return;
                }
                const result = await this.$http.upTopic(this.topicDataById.id);
                if (result.msg === "ok") {
                    if (result.data.type !== 2) {
                        this.topicDataById.ups.push({
                            id: this.user.id,
                            nickname: this.user.nickname,
                            avatar: this.user.avatar
                        });
                        this.isTopicUpShow = true;
                        setTimeout(() => {
                            // 执行动画
                            this.isTopicUpShow = false;
                        }, 50);
                        Message.success(result.data.rspinf);
                    } else {
                        Message.error(result.data.rspinf);
                    }
                } else {
                    Message.error(result.rspinf);
                }
            } catch (error) {
                console.error(error);
            }
        },
        // 加关注
        async followAuthor(id, isFollowing) {
            if (id) {
                try {
                    if (isFollowing) {
                        const result = await this.$http.deleteFollowers({
                            author_id: id
                        });
                        console.log(result, this.user);
                        if (result.msg === "ok") {
                            if (result.data.type === 0) {
                                this.topicDataById.author.followers = this.topicDataById.author.followers.filter(
                                    item => item._id !== this.user.id
                                );
                                console.log(
                                    "this.topicDataById.author.followers",
                                    this.topicDataById.author.followers
                                );
                                Message.success(result.data.rspinf);
                            } else {
                                Message.error(result.data.rspinf);
                            }
                        }
                    } else {
                        const result = await this.$http.addFollowers({
                            author_id: id
                        });
                        console.log(result, this.user);
                        if (result.msg === "ok") {
                            if (result.data.type === 0) {
                                this.topicDataById.author.followers.push({
                                    name: this.user.name,
                                    nickname: this.user.nickname,
                                    avatar: this.user.avatar,
                                    _id: this.user._id
                                });
                                Message.success(result.data.rspinf);
                            } else {
                                Message.error(result.data.rspinf);
                            }
                        }
                    }
                } catch (error) {
                    console.error(error);
                    Message.error("操作失败");
                }
            }
        }
    },
    computed: {
        isFollowing() {
            if (process.server) return;
            // 该作者是否已被你关注
            if (this.topicDataById) {
                const { _id } = this.user;
                return this.topicDataById.author.followers.some(item => {
                    return item._id === _id;
                });
            }
        }
    },
    components: {
        QuillEditor,
        Button,
        Radio,
        Anchor,
        AnchorLink
        // Breadcrumb,
    }
};
</script>

<style lang="sass" scoped>
    @import '~assets/css/index.scss';
    .detail-container {
        background: #fff;
        .top {
            @include display-flex();
            margin-bottom: 27px;
            .detail-title {
                @include flex(1);
                display: block;
                font-size: 27px;
                color: #242729;
                font-weight: 600;
            }
        }
        .sub-top {
            @include display-flex();
            @include justify-content(flex-start);
            @include flex-direction(column);
            margin: 10px 16px;
            .one {
                @include display-flex();
                margin-bottom: 20px;
                .left {

                }
                .right {
                    @include display-flex();
                    @include flex-direction(column);
                    @include justify-content(space-between);
                    margin-left: 10px;
                    font-size: 16px;
                    font-weight: 500;
                    .author-nickname {
                        font-weight: 700;
                        .follower {
                            margin-left: 5px;
                            .is-follow {
                                border-right: 1px solid rgba(255, 255, 255, 0.4);
                                padding-right: 2px;
                                margin-right: 2px;
                            }
                        }
                    }
                }
            }
            .two {
                @include display-flex();
                @include align-items(center);
                @include justify-content(space-between);
                .left {
                    @include display-flex();
                    @include align-items(felx-end);
                    .icon-box {
                        @include display-flex();
                        @include flex-direction(row);
                        @include align-items(center);
                        margin-left: 12px;
                        .iconfont {
                            margin-right: 3px;
                            font-weight: 500;
                            font-size: 18px;
                        }
                    }
                    .good {
                        height: 23px;
                        color: #fff;
                        background: #ee5e7b;
                        font-size: 14px;
                        padding: 0px 4px;
                        font-weight: bold;
                        border-radius: 4px;
                        line-height: 1.5;
                        font-family: fantasy;
                    }
                    
                }
                .right {
                    @include display-flex();
                    @include align-items(center);
                    @include justify-content(space-between);
                    .create-at {
                        margin-right: 15px;
                    }
                }
            }
        }
        .return-top{
            padding: 10px;
            background: rgba(0, 153, 229, .6);
            color: #fff;
            text-align: center;
            border-radius: 2px;
        }
        .to-replie {
            z-index: 5;
            width: 48px;
            height: 40px;
            cursor: pointer;
            text-align: center;
            background: #f50;
            color: #fff;
            border-radius: 2px;
            box-shadow: 0 1px 3px rgba(0,0,0,.2);
            position: fixed;
            bottom: 60px;
            right: 30px;
            transition: opacity .2s ease-in-out;
        }
        .to-save {
            z-index: 5;
            width: 48px;
            height: 40px;
            cursor: pointer;
            text-align: center;
            background: #16c2c2;
            color: #fff;
            border-radius: 2px;
            box-shadow: 0 1px 3px rgba(0,0,0,.2);
            position: fixed;
            bottom: 15px;
            right: 30px;
            transition: opacity .2s ease-in-out;
            .iconfont {
                font-size: 12px;
            }
        }
        .is-saved {
            background: #9266f9;
        }
        #ql-editor {
            border-left: none;
            border-right: none;
        }
        .btn-submit {
            width: 126px;
            margin-top: 10px;
        }
        .editor-box {
            margin-left: -1px; //避免左边框重叠
            margin-top: 30px;
        }
        .radio-box {
            @include display-flex();
            @include justify-content(flex-end);
            padding-bottom: 16px;
        }
        .replies-none {
            @include display-flex();
            @include flex-direction(column);
            @include align-items(center);
            .replies-none-icon {
                color: rgba(0,0,0,0.5);
                font-size: 45px;
            }
            .replies-none-text {
                font-size: 16px;
                font-weight: 600;
                text-align: center;
            }
        }
        .topic-ups {
            @include display-flex();
            @include justify-content(center);
            @include align-items(center);
            .topic-ups-box {
               position: relative;
                button {
                    width: 90px;
                }
               .topic-ups-icon-button {
                    border-top-right-radius: 0;
                    border-top-left-radius: 5px;
                    border-bottom-right-radius: 0;
                    border-bottom-left-radius: 5px;
               }
               .topic-share-icon-button {
                    border-top-left-radius: 0;
                    border-top-right-radius: 5px;
                    border-bottom-left-radius: 0;
                    border-bottom-right-radius: 5px;
               }
            }
      
        }
        .replies-box {
            .replies-item {
                .replies-item-content {
                    @include display-flex();
                    @include align-items(flex-start);
                    margin: 0 15px;
                    padding: 15px 15px;
                    // border-top: 1px solid rgba(71,74,79,0.2);
                    .replies-left {
                        .replies-level {
                            font-size: 14px;
                            text-align: center;
                        }
                        .replies-avatar {
                            width: 40px;
                            height: 40px;
                            border-radius: 50%;
                            margin: 0 auto 15px auto;
                            display: block;
                        }
                    }
                    .replies-right {
                        @include flex(1);
                        @include display-flex();
                        @include flex-direction(column);
                        @include align-items(flex-start);
                        @include justify-content(flex-start);
                        margin-left: 15px;
                        .replies-top {
                            @include display-flex();
                            @include align-items(flex-start);
                            margin-bottom: 5px;
                            .replies-nickname {
                                font-size: 16px;
                                font-weight: 600;
                                color: #666;
                                line-height: 1;
                            }
                            .replies-time {
                                color: #08c;
                                font-weight: 400;
                                margin-left: 5px;
                                font-size: 12px;
                            }
                        }
                        .replies-center {
                            width: 100%;
                            font-size: 14px;
                            .ql-container.ql-snow {
                                border: none;
                                .ql-editor {
                                    padding: 0;
                                    min-height: 60px;
                                    overflow: hidden;
                                }
                            }
                        }
                    }
                    .replies-ups-box {
                        @include display-flex();
                        @include flex-direction(column);
                        .replies-ups {
                            @include display-flex();
                            @include align-items(center);
                            cursor: pointer;
                            .icon-ups {
                                font-size: 18px;
                                margin-right: 5px;
                            }
                            span {
                                font-size: 15px;
                            }
                        }
                        .replies-icon {
                            cursor: pointer;
                            margin-top: 20px;
                            font-weight: bold;
                            font-size: 20px;
                        }
                    }
                }
                .replies-time-line {
                    @include display-flex();
                    @include align-items(center);
                    span {
                        border-radius: 8px;
                        font-size: 13px;
                        font-weight: 500;
                        line-height: 19px;
                        // padding: 0 10px;
                    }
                    div {
                        @include flex(1);
                        background: #474a4f;
                        margin: 0 15px;
                        content: "";
                        height: 1px;
                        position: relative;
                        z-index: 1;
                        opacity: 0.2;
                    }
                }
            }
        }
        .ups-enter-active , .ups-leave-active{
            transition: all .4s ease;
            position: absolute;
            left: 15px;
            font-size: 15px;
            font-weight: 600;
            font-family: fantasy;
            color: #ee5e7b;
            top: -20px;
        }
        .ups-enter {
            top: -20px;
            opacity: 1;
        }
        .ups-leave-to /* .fade-leave-active below version 2.1.8 */ {
            top: -40px;
            // opacity: 0;
        }
    }
</style>
