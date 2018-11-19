<template>
    <div class="info-container">
        <header class="info-header">
            <div @click="pageToGo('home')" class="info-header-left">
                logo
            </div>
            <div class="info-header-right">
                <div @click="pageToGo('home')" class="ihr-item">首页</div>
                <div @click="pageToGo('classify')" class="ihr-item">分类</div>
                <div @click="pageToGo('other')" class="ihr-item">其他</div>
            </div>
        </header>
        <div class="frame-container">
            <div class="main-container">
                <div class="top-container">
                    <div class="left-box">
                        <img :src="userInfo.avatar" alt="">
                    </div>
                    <div class="center-box">
                        <h1 class="h1-nickname">{{userInfo.nickname}}</h1>
                        <h3><i class="iconfont icon-wxbdingwei" />工作地址：{{userInfo.job_address}}
                            <span v-show="!updateInfoFlag[0]" @click="updateInfo(0)" class="touch-style">
                                <Icon type="md-create" />编辑
                            </span>
                            <Input @on-search="submitUpdateInfo($event, 0)" v-show="updateInfoFlag[0]" style="width:180px;border-radius: 5px;height:20px;" search enter-button="确定" placeholder="输入工作地址" />
                        </h3>
                        <h3><i class="iconfont icon-wxbzhanghu" />职位：{{userInfo.job}}
                            <span v-show="!updateInfoFlag[1]" @click="updateInfo(1)" class="touch-style">
                                <Icon type="md-create" />编辑
                            </span>
                            <Input @on-search="submitUpdateInfo($event, 1)" v-show="updateInfoFlag[1]" style="width:180px;border-radius: 5px;height:20px;" search enter-button="确定" placeholder="输入工作地址" />
                        </h3>
                        <h3><i class="iconfont icon-link" />个人网站：{{userInfo.personal_web}}
                            <span v-show="!updateInfoFlag[2]" @click="updateInfo(2)" class="touch-style">
                                <Icon type="md-create" />编辑
                            </span>
                            <Input @on-search="submitUpdateInfo($event, 2)" v-show="updateInfoFlag[2]" style="width:180px;border-radius: 5px;height:20px;" search enter-button="确定" placeholder="输入工作地址" />
                        </h3>
                        <h3><i class="iconfont icon-github" />GitHub：{{userInfo.github}}
                            <span v-show="!updateInfoFlag[3]" @click="updateInfo(3)" class="touch-style">
                                <Icon type="md-create" />编辑
                            </span>
                            <Input @on-search="submitUpdateInfo($event, 3)" v-show="updateInfoFlag[3]" style="width:180px;border-radius: 5px;height:20px;" search enter-button="确定" placeholder="输入GitHub地址" />
                        </h3>
                    </div>
                    <div class="right-box"></div>
                </div>
                <div class="center-container">
                    <div class="content-box">
                        <div class="nav">
                            <Menu mode="horizontal" :active-name="activeName" @on-select="changeNav">
                                <MenuItem name="articles">
                                文章
                                </MenuItem>
                                <MenuItem name="collections">
                                收藏
                                </MenuItem>
                                <MenuItem name="following">
                                关注
                                </MenuItem>
                                <MenuItem name="followers">
                                粉丝
                                </MenuItem>
                            </Menu>
                            <div>
                                <nuxt-child :key="$route.params.id" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="main2-container">
                <div class="mc-top">
                    <div @click="goType('following')" class="mct-title">
                        <div class="mct-item-title">关注</div>
                        <div class="mct-item-count">{{userInfo.following && userInfo.following.length}}</div>
                    </div>
                    <div @click="goType('followers')" class="mct-title">
                        <div class="mct-item-title">粉丝</div>
                        <div class="mct-item-count">{{userInfo.followers && userInfo.followers.length}}</div>
                    </div>
                    <div @click="goType('collections')" class="mct-title">
                        <div class="mct-item-title">收藏</div>
                        <div class="mct-item-count">{{userInfo.collect_topic_count}}</div>
                    </div>
                </div>
                <div class="mc-bottom">
                    <div class="mct-title">
                        <div class="mct-item-title">积分： </div>
                        <div class="mct-item-count">{{userInfo.score || 0}}</div>
                    </div>
                    <div class="mct-title">
                        <div class="mct-item-title">等级： </div>
                        <div class="mct-item-count">{{userInfo.level || 1}} <span style="font-size: 12px;color: #FDD000">LV</span></div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
<script>
import { Message, Tabs, TabPane, Menu, MenuItem } from 'iview';
import { mapMutations, mapState } from 'vuex';
import { getUserDataInGlobal } from '@/utils/tools';

export default {
    data() {
        return {
            userInfo: {},
            updateInfoFlag: [false, false, false, false],
            navData: {},
            navIndex: 0,
        };
    },
    created() {},
    mounted() {
        // 请求用户数据
        this.getUserInfo();
    },
    methods: {
        goType(e) {
            this.$router.push({
                path: `/user/info/${e}`,
                query: {
                    name: this.userInfo.name,
                },
            });
        },
        pageToGo(type) {
            this.$router.push(`/topic/${type}`);
        },
        async getUserInfo() {
            const userInfo = getUserDataInGlobal();
            if (userInfo) {
                const user = await this.$http.getUserByName(userInfo.name);
                if (user.msg === 'ok') {
                    this.userInfo = user.data;
                } else {
                    // 查询失败就设置为缓存中的
                    this.userInfo = userInfo;
                }
                let avatarUrl = this.userInfo['avatar'];
                if (avatarUrl.indexOf('size') !== -1)
                    this.userInfo['avatar'] = avatarUrl.substring(0, avatarUrl.indexOf('size') + 5) + '90';
            } else {
                this.$router.push('/user/login');
            }
            this.navData = {
                type: '0',
                name: this.userInfo.name,
            };
        },
        updateInfo(index) {
            this.updateInfoFlag = this.updateInfoFlag.map((item, _index) => {
                if (_index === index) {
                    return !item;
                }
                return item;
            });
        },
        // 处理对应的参数
        infoHandle(e, index) {
            switch (index) {
                case 0:
                    this.userInfo['job_address'] = e;
                    break;
                case 1:
                    this.userInfo['job'] = e;
                    break;
                case 2:
                    this.userInfo['personal_web'] = e;
                    break;
                case 3:
                    this.userInfo['github'] = e;
                    break;
            }
        },
        // 处理对应的参数
        typeHandle(index) {
            switch (index) {
                case 0:
                    return 'job_address';
                case 1:
                    return 'job';
                case 2:
                    return 'personal_web';
                case 3:
                    return 'github';
            }
        },
        async submitUpdateInfo(e, index) {
            console.log(e, index, this.typeHandle(index));
            const result = await this.$http.update_person_info({
                info_type: this.typeHandle(index),
                info_data: e,
            });
            console.log('result', result);
            this.infoHandle(e, index);
            // 控制哪些显示哪些隐藏
            this.updateInfoFlag = this.updateInfoFlag.map((item, _index) => {
                if (_index === index) {
                    return !item;
                }
                return item;
            });
        },
        changeNav(e) {
            this.$router.push({
                path: `/user/info/${e}`,
                query: {
                    name: this.userInfo.name,
                },
            });
        },
    },
    watch: {
        // 动态监听changeUserInfo变化，并改变用户数据
        changeUserInfo() {
            this.getUserInfo();
        },
    },
    computed: {
        ...mapState(['changeUserInfo']),
        activeName() {
            return this.$route.name.split('-')[2] || 'articles';
        },
    },
    components: {
        Message,
    },
};
</script>
<style lang="sass" scoped>
@import '~assets/css/index.scss';
.info-container {
    margin: 0 auto;
    background: #f4f5f5;
    .info-header {
        @include display-flex();
        @include align-items(center);
        @include justify-content(space-between);
        width: 100%;
        max-width: 1260px;
        height: 47px;
        background: #fafafb;
        box-shadow: 0 1px 0 rgba(12,13,14,0.1), 0 1px 6px rgba(59,64,69,0.1);
        margin: 0;
        padding: 0;
        overflow: hidden;
        margin-bottom: 10px;
        .info-header-left {
            width: 100px;
            margin-left: 15px;
            text-align: center;
            cursor: pointer;
        }
        .info-header-right {
            @include display-flex();
            @include align-items(center);
            @include justify-content(space-around);
            margin-right: 15px;
            font-size: 17px;
            .ihr-item {
                text-align: center;
                width: 100px;
                cursor: pointer;
                transition: 0.5s ease color;
                font-weight: 500;
                &:hover {
                    color: #07C;
                }
            }
        }
    }
    .frame-container {
        @include display-flex();
        width: 960px;
        margin: 0 auto 0 auto ;
        .main-container {
            background: #f4f5f5;
            width: 700px;
            .top-container {
                @include display-flex();
                padding: 30px;
                background: #fff;
                .left-box {
                    border-radius: 50%;
                    overflow: hidden;
                    margin-right: 30px;
                    width: 90px;
                    height: 90px;
                    img {
                        width: 90px;
                        height: 90px;
                    }
                }
                .center-box {
                    @include flex(1);
                    h3 {
                        @include display-flex();
                        @include align-items(center);
                        height: 35px;
                        line-height: 35px;
                    }
                    .iconfont {
                        font-size: 16px;
                        margin-right: 10px;
                        span {
                            color: red;
                        }
                    }
                    .touch-style {
                        cursor: pointer;
                        font-size: 12px;
                        color: #999;
                    }
                    .h1-nickname {
                        margin: 0;
                        padding: 0;
                        font-size: 2.167rem;
                        font-weight: 600;
                        line-height: 1.2;
                        color: #000;
                    }
                }
            }
            .center-container {
                background: #fff;
                margin-top: 15px;
                .content-box {
                    .nav {
                        ul {
                            li {
                                width: 80px;
                                text-align: center;
                            }
                        }
                    }
                }
            }
        }
        .main2-container {
            width: 240px;
            margin-left: 12px;
            .mc-top {
                @include display-flex();
                @include justify-content(space-around);
                padding: 16px 0;
                height: 75px;
                background: #fff;
                .mct-title {
                    cursor: pointer;
                    .mct-item-title {
                        font-family: apple-system,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Arial,sans-serif;
                        font-size: 16px;
                        font-weight: 500;
                    }
                    .mct-item-count {
                        font-size: 15px;
                        font-weight: 600;
                        text-align: center;
                    }

                }
            }
            .mc-bottom {
                padding: 16px 0;
                margin-top: 15px;
                height: 75px;
                background: #fff;
                .mct-title {
                    @include display-flex();
                    @include align-items(center);
                    margin-left: 17px;
                    .mct-item-title {
                        font-family: apple-system,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Arial,sans-serif;
                        font-size: 16px;
                        font-weight: 500;
                    }
                    .mct-item-count {
                        font-size: 15px;
                        font-weight: 600;
                        text-align: center;
                    }

                }
            }
        }
    }
}
</style>
