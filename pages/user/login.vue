<template>
    <div class="login-container">
        <div class="title-line">
            <span class="line"></span>
            <span class="tit"
                  style="font-size: 38px;">登录</span>
            <span class="line"></span>
        </div>
        <div class="sub-title-box">
            <div class="sub-title"
                 @click="changeShow()">
                <span class="sub-tit">账号登录登录</span>
            </div>
            <div>or</div>
            <div class="sub-title"
                 @click="changeShow()">
                <span class="sub-tit">邮箱登录登录</span>
            </div>
        </div>
        <Form class="form-container"
              ref="formValidate"
              :model="formValidate"
              :rules="ruleValidate">
            <FormItem prop="name"
                      v-show="show">
                <Row>
                    <Col span="23">
                    <Input type="text"
                           v-model="formValidate.name"
                           placeholder="账号">
                    <Icon type="ios-person-outline"
                          slot="prepend"></Icon>
                    </Input>
                    </Col>
                </Row>
            </FormItem>
            <FormItem prop="email"
                      v-show="!show">
                <Row>
                    <Col span="23">
                    <Input v-model="formValidate.email"
                           placeholder="E-maill">
                    <Icon type="md-mail"
                          slot="prepend" />
                    </Input>
                    </Col>
                </Row>
            </FormItem>
            <FormItem prop="password">
                <Row>
                    <Col span="23">
                    <Input type="password"
                           v-model="formValidate.password"
                           placeholder="密码">
                    <Icon type="ios-lock-outline"
                          slot="prepend"></Icon>
                    </Input>
                    </Col>
                </Row>
            </FormItem>

            <FormItem>
                <Button class="btn-submit"
                        type="primary"
                        @click="handleSubmit('formInline')">登录</Button>
                <br />
                <a href="javascript:;"
                   @click="toRegist()">没有账号？注册</a>
            </FormItem>
        </Form>
    </div>

</template>
<script>
import {
    Form,
    FormItem,
    Button,
    Input,
    Slider,
    iSwitch,
    CheckboxGroup,
    Checkbox,
    Row,
    Col,
    Select,
    Option,
    DatePicker,
    Message
} from "iview";
import { setUserDataInGlobal } from "~/utils/tools.js";
import { mapMutations } from "vuex";
export default {
    data() {
        const validateName = async (rule, value, callback) => {
            if (!value) {
                return callback(new Error("name不能为空"));
            }
            return callback();
        };
        const validateEmail = async (rule, value, callback) => {
            if (!value) {
                return callback(new Error("email不能为空"));
            }
            return callback();
        };
        const validatePassword = (rule, value, callback) => {
            if (value === "") {
                return callback(new Error("密码不能为空"));
            } else {
                return callback();
            }
        };
        return {
            formValidate: {
                name: "",
                email: "",
                password: ""
            },
            ruleValidate: {
                name: [{ validator: validateName, trigger: "blur" }],
                email: [{ validator: validateEmail, trigger: "blur" }],
                password: [{ validator: validatePassword, trigger: "blur" }]
            },
            show: true
        };
    },
    mounted() {
        this.bodyListener = e => {
            if(e.keyCode === 13 && this.$route.name === 'user-login') {
                this.handleSubmit('formInline');
            }
        };
        document.body.addEventListener("keyup", this.bodyListener, false);
    },
    beforeDestroy() {
        document.body.removeEventListener("keyup", this.bodyListener);
    },
    methods: {
        ...mapMutations(["setUserInfo"]),
        async handleSubmit() {
            try {
                let { name, email, password } = this.formValidate;
                let user = "";
                const httpkey = await this.$http.getKey();
                if (httpkey.msg === "ok") {
                    let { key } = httpkey.data;
                    if (this.show) {
                        if(!name || !password) {
                            this.$Message.error('账号或密码不能为空');
                            return;
                        }
                        user = await this.$http.login({ name, password }, key);
                    } else {
                        if(!email || !password) {
                            this.$Message.error('邮箱或密码不能为空');
                            return;
                        }
                        user = await this.$http.loginByEmail(
                            { email, password },
                            key
                        );
                    }
                    if (user.msg === "ok") {
                        Message.success("登录成功，欢迎回来！");
                        setUserDataInGlobal(user); // 存入缓存
                        this.$router.push({ path: "/topic/home", query: {} });
                    } else {
                        Message.error(user.rspinf);
                    }
                } else {
                    Message.error(httpkey.rspinf);
                }
            } catch (error) {
                console.log(error);
            }
        },
        toRegist() {
            this.$router.push({
                path: "/user/register"
            });
        },
        changeShow() {
            this.show = !this.show;
        }
    },
    components: {
        Form,
        FormItem,
        Button,
        Input,
        Slider,
        iSwitch,
        CheckboxGroup,
        Checkbox,
        Row,
        Col,
        Select,
        Option,
        DatePicker,
        Message
    }
};
</script>
<style lang="sass" scoped>
    @import '~assets/css/index.scss';
    .login-container {
        // width: $base-width;
        margin: 0 auto;
        padding-bottom: 100px;
        min-width: 383px;
        .title-line {
            @include display-flex();
            @include align-items(center);
            @include justify-content(center);
            // width: $base-width;
            height: 28px;
            // margin: 0 auto;
            // border-bottom: 1px solid #ddd;
            text-align: center;
            height: 80px;
            margin-top: 40px;
            
            .tit {
                height: 56px;
                line-height: 56px;
                margin: 0 auto;
                padding: 0 20px;
                font-size: 40px;
                background: #fff;
                text-align: center;
            }
            .line {
                @include flex(1);
                background: #ddd;
                height: 1px;
                &:first-child {
                    margin-left: 50px;
                }
                &:last-child {
                    margin-right: 50px;
                }
            }
        }
        .sub-title-box {
            @include display-flex();
            @include align-items(center);
            @include justify-content(center);
            height: 80px;
            font-size: 15px;
            .sub-title {
                font-size: 18px;
                color: #3B9BFF;
                cursor: pointer;
                margin-right: 10px;
                margin-left: 10px;
            }
        }
    }
    .form-container {
        width: 400px;
        margin: 0 auto;
        .btn-submit {
            width: 383px;
        }
    }
</style>
