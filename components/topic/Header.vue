<template>
    <Layout class="header-contaner"
            mode="horizontal">
        <div class="little-logo more"
             :class="{'show' : showLeft}">
            <Icon class='logo-menu'
                  @click.native="changeLeftSider"
                  type="md-menu"
                  size="30"></Icon>
            <span class="small-logo">WEB2</span>
        </div>
        <Sider class="header header-logo"
               hide-trigger
               width="165"
               collapsible
               v-model="isCollapsed"
               breakpoint="sm"
               hide-trigger
               :default-collapsed="true"
               :collapsed-width="165">
            <span class="big-logo">WEB2</span>
        </Sider>

        <Content class="header header-search"
                 :collapsed-width="0"
                 :collapsible="true"
                 v-model="isCollapsed"
                 style="color:black"
                 breakpoint="sm"
                 hide-trigger
                 :default-collapsed="false">
            <Input @on-search="searchSomething"
                   class="search"
                   search
                   placeholder="搜搜看有些什么...">
            <Select v-model="search_type"
                    slot="prepend"
                    transfer
                    style="width: 80px">
                <Option value="topic">找文章</Option>
                <Option value="user">找人</Option>
            </Select>
            </Input>
        </Content>
        <div class="header header-other">
            <div :key="2">
                <Tooltip :content="tipMessage"
                         placement="bottom"
                         :transfer="true">
                    <Badge :count="messageCount"
                           :offset="[12, 5]">
                        <Icon v-if="messageCount > 0"
                              class="header-icon"
                              type="md-notifications" />
                        <Icon v-else
                              class="header-icon"
                              type="ios-notifications-outline" />
                    </Badge>
                </Tooltip>
            </div>
            <div class="user-avatar"
                 @click="goToUserInfo()"
                 :key="1">
                <Poptip style="padding:0;"
                        trigger="hover"
                        :transfer="true">
                    <img class="avatar"
                         :src="userInfo.avatar"
                         alt="">
                    <div v-if=""
                         class="api"
                         slot="content">
                        <div class="item top-box">
                            <div class="top-box-name">{{userInfo.nickname}}</div>
                            <div class="top-box-level">{{userInfo.level}}级</div>
                        </div>
                        <div class="item item-dark">积分: {{userInfo.score}}</div>
                        <div class="item item-dark">文章: {{userInfo.topic_count}}</div>
                        <div class="item item-dark">粉丝: {{userInfo.followers && userInfo.followers.length}}</div>
                        <div class="item item-dark">收藏: {{userInfo.collect_topic_count}}</div>
                        <div class="item logout"
                             @click="logout()">
                            退出
                        </div>
                    </div>
                </Poptip>

            </div>
        </div>
    </Layout>
</template>
<script>
import {
    Menu,
    Input,
    MenuItem,
    Icon,
    Submenu,
    MenuGroup,
    Tooltip,
    Badge,
    Poptip
} from "iview";
import { mapState, mapMutations, mapActions } from "vuex";
import { getUserDataInGlobal, clearCookie } from "@/utils/tools";
export default {
    props: {},
    data() {
        return {
            isCollapsed: false,
            show: false,
            userInfo: {},
            messageCount: 0,
            search_type: "topic" // 搜索类型
        };
    },
    async mounted() {
        const userInfo = getUserDataInGlobal();
        if (userInfo) {
            const user = await this.$http.getUserByName(userInfo.name);
            if (user.msg === "ok") {
                this.userInfo = user.data;
            } else {
                // 查询失败就设置为缓存中的
                this.userInfo = userInfo;
            }
        } else {
            this.$router.push("/user/login");
        }
        console.log(
            "getUserDataInGlobal",
            JSON.parse(JSON.stringify(userInfo))
        );
    },
    computed: {
        ...mapState(["showLeft"]),
        tipMessage() {
            console.log("this.messageCount.length", this.messageCount.length);
            return this.messageCount > 0 ? "有新消息啦" : "消息通知";
        }
    },
    methods: {
        ...mapMutations(["showLeftSider"]),
        ...mapActions(["ACTION_search"]),
        // leftSiderChange(e) {
        //     console.log('小鸡巴', e);
        //     this.show = e;
        // },
        searchSomething(e) {
            let input = e.replace(/(^\s*)|(\s*$)/g, "");
            if (input) {
                this.ACTION_search({
                    search_type: this.search_type,
                    keyword: e
                });
                
                this.$router.push({
                    path: "/topic/search",
                    query: {
                        search_type: this.search_type,
                        keyword: e
                    }
                });
            } else {
                this.$Message.warning("需要填写搜索内容");
            }
        },
        changeLeftSider() {
            this.$emit("changeLeftSider", true);
            // this.showLeftSider(true);
        },
        goToUserInfo() {
            this.$router.push({
                path: `/user/info/articles`,
                query: {
                    name: this.userInfo.name
                }
            });
        },
        logout() {
            localStorage.removeItem("uz2");
            this.$router.push("/user/login");
            this.$http.logout();
        }
    },
    components: {
        Input,
        Menu,
        MenuItem,
        Icon,
        Submenu,
        MenuGroup,
        Tooltip,
        Badge,
        Poptip
    }
};
</script>
<style lang="sass" scoped>
    @import '~assets/css/index.scss';
    .header-contaner {
        height: 100%;
        .big-logo {
            height: 43px;
            line-height: 43px;
            font-size: 22px;
            display: inherit;
            font-weight: 700;
            color: #2db7f5;
        }
        .small-logo {
            font-weight: 800;
            color: #2db7f5;
        }
        .little-logo {
            @include display-flex();
            @include align-items(center);
            display: none;
        }
        .show {
            @include display-flex();
        }
        .header {
            height: 100%;
            @include display-flex();
            @include align-items(center);
           
        }
        .header-logo {
            background: #fff;
            text-algin: center;
            @include justify-content(center);
        }
        .header-search {
            overflow: hidden;
            @include justify-content(start);
            .search {
                margin-left: 10px;
                max-width: 352px;
            }
        }
        .header-other {

            @include flex-direction(row);
            @include justify-content(space-around);
            width: 123px;
            line-height: 46px;
            font-size: 15px;
            .ivu-poptip {
                height: 46px;
                display: block;
            }
            
            .header-icon {
                font-size: 31px;
                text-align: center;
                line-height: 46px;
            }
            
            .user-avatar {
                .avatar {
                    width: 45px;
                    height: 45px;
                    border-radius: 50%;
                    display: block;
                }         
            }
        }
    }   
</style>
