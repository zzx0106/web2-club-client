<template>
    <div class="register-container">
        <div class="title-line">
            <span class="line"></span>
            <span class="tit"
                  style="font-size: 38px;">注册</span>
            <span class="line"></span>
        </div>
        <Form class="form-container"
              ref="formValidate"
              :model="formValidate"
              :rules="ruleValidate">
            <FormItem prop="name">
                <Row>
                    <Col span="23">
                    <Input type="text"
                           v-model="formValidate.name"
                           placeholder="账号">
                    <Icon type="ios-person-outline"
                          slot="prepend"></Icon>
                    </Input>
                    </Col>
                    <Col span="1">
                    <Icon v-show="formValidate.name_checked.success"
                          class="success-icon"
                          type="md-checkmark-circle" />
                    <Icon v-show="formValidate.name_checked.error"
                          class="error-icon"
                          type="ios-close-circle" />
                    </Col>
                </Row>
            </FormItem>
            <FormItem prop="nickname">
                <Row>
                    <Col span="23">
                    <Input v-model="formValidate.nickname"
                           placeholder="昵称">
                    <Icon type="md-color-wand"
                          slot="prepend"></Icon>
                    </Input>
                    </Col>
                    <Col span="1">
                    <Icon v-show="formValidate.nickname_checked.success"
                          class="success-icon"
                          type="md-checkmark-circle" />
                    <Icon v-show="formValidate.nickname_checked.error"
                          class="error-icon"
                          type="ios-close-circle" />
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
                    <Col span="1">
                    <Icon v-show="formValidate.password_checked.success"
                          class="success-icon"
                          type="md-checkmark-circle" />
                    <Icon v-show="formValidate.password_checked.error"
                          class="error-icon"
                          type="ios-close-circle" />
                    </Col>
                </Row>
            </FormItem>
            <FormItem prop="re_password">
                <Row>
                    <Col span="23">
                    <Input type="password"
                           v-model="formValidate.re_password"
                           placeholder="请再次输入密码">
                    <Icon type="ios-lock-outline"
                          slot="prepend" />
                    </Input>
                    </Col>
                    <Col span="1">
                    <Icon v-show="formValidate.re_password_checked.success"
                          class="success-icon"
                          type="md-checkmark-circle" />
                    <Icon v-show="formValidate.re_password_checked.error"
                          class="error-icon"
                          type="ios-close-circle" />
                    </Col>
                </Row>
                </Input>
            </FormItem>
            <FormItem prop="email">
                <Row>
                    <Col span="23">
                    <Input v-model="formValidate.email"
                           placeholder="E-maill">
                    <Icon type="md-mail"
                          slot="prepend" />
                    </Input>
                    </Col>
                    <Col span="1">
                    <Icon v-show="formValidate.email_checked.success"
                          class="success-icon"
                          type="md-checkmark-circle" />
                    <Icon v-show="formValidate.email_checked.error"
                          class="error-icon"
                          type="ios-close-circle" />
                    </Col>
                </Row>

            </FormItem>
            <FormItem>
                <Button class="btn-submit"
                        type="primary"
                        @click="handleSubmit('formInline')">注册</Button>
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
export default {
    data() {
        const validateName = async (rule, value, callback) => {
            let { name_checked } = this.formValidate;
            if (!value) {
                [name_checked.error, name_checked.success] = [true, false];
                return callback(new Error("name不能为空"));
            }
            try {
                const user = await this.$http.getUserByName(value);
                if (user.data) {
                    [name_checked.error, name_checked.success] = [true, false];
                    return callback(new Error("该账号已被注册！"));
                }
                [name_checked.error, name_checked.success] = [false, true];
                return callback();
            } catch (err) {
                [name_checked.error, name_checked.success] = [true, false];
                return callback(new Error("查询失败"));
            }
        };
        const validateNickname = async (rule, value, callback) => {
            let { nickname_checked } = this.formValidate;
            if (!value) {
                [nickname_checked.error, nickname_checked.success] = [
                    true,
                    false
                ];
                return callback(new Error("昵称不能为空"));
            }
            [nickname_checked.error, nickname_checked.success] = [false, true];
            return callback();
        };
        const validatePassword = (rule, value, callback) => {
            let { password_checked } = this.formValidate;
            if (value === "") {
                [password_checked.error, password_checked.success] = [
                    true,
                    false
                ];
                return callback(new Error("密码不能为空"));
            } else {
                if (this.formValidate.re_password !== "") {
                    // 对第二个密码框单独验证
                    this.$refs.formValidate.validateField("re_password");
                }
                [password_checked.error, password_checked.success] = [
                    false,
                    true
                ];
                return callback();
            }
        };
        const validateReProssWord = (rule, value, callback) => {
            let { re_password_checked } = this.formValidate;

            if (value === "") {
                [re_password_checked.error, re_password_checked.success] = [
                    true,
                    false
                ];
                return callback(new Error("请再次输入密码"));
            } else if (value !== this.formValidate.password) {
                [re_password_checked.error, re_password_checked.success] = [
                    true,
                    false
                ];
                return callback(new Error("两次输入不同!"));
            } else {
                [re_password_checked.error, re_password_checked.success] = [
                    false,
                    true
                ];
                return callback();
            }
        };
        const validateEmail = async (rule, value, callback) => {
            let { email_checked } = this.formValidate;
            if (!value) {
                [email_checked.error, email_checked.success] = [true, false];
                return callback(new Error("email不能为空"));
            }
            try {
                const user = await this.$http.getUserByEmail(value);
                if (user.data) {
                    [email_checked.error, email_checked.success] = [
                        true,
                        false
                    ];
                    return callback(new Error("该邮箱已被注册！"));
                }
                [email_checked.error, email_checked.success] = [false, true];
                return callback();
            } catch (err) {
                [email_checked.error, email_checked.success] = [true, false];
                console.log("拦截err", err);
                return callback(new Error("查询失败"));
            }
        };
        return {
            formValidate: {
                name: "",
                name_checked: {
                    error: false, //是否失败
                    success: false // 是否成功
                },
                nickname: "",
                nickname_checked: {
                    error: false, //是否失败
                    success: false // 是否成功
                },
                email: "",
                email_checked: {
                    error: false, //是否失败
                    success: false // 是否成功
                },
                password: "",
                password_checked: {
                    error: false, //是否失败
                    success: false // 是否成功
                },
                re_password: "",
                re_password_checked: {
                    error: false, //是否失败
                    success: false // 是否成功
                }
            },
            ruleValidate: {
                name: [{ validator: validateName, trigger: "blur" }],
                nickname: [{ validator: validateNickname, trigger: "blur" }],
                email: [{ validator: validateEmail, trigger: "blur" }],
                password: [{ validator: validatePassword, trigger: "blur" }],
                re_password: [
                    { validator: validateReProssWord, trigger: "blur" }
                ]
            }
        };
    },
    mounted() {
        this.bodyListener = e => {
            if (e.keyCode === 13 && this.$route.name === "user-register") {
                this.handleSubmit();
            }
            console.log("enter", this.$route);
        };
        document.body.addEventListener("keyup", this.bodyListener, false);
    },
    beforeDestroy() {
        document.body.removeEventListener("keyup", this.bodyListener);
    },
    methods: {
        async handleSubmit() {
            try {
                let {
                    name,
                    nickname,
                    password,
                    re_password,
                    email
                } = this.formValidate;
                if (!name || !nickname || !password || !re_password || !email) {
                    this.$Message.error("请务必将信息填写完整");
                    return;
                }
                const httpkey = await this.$http.getKey();
                if (httpkey.msg === "ok") {
                    let { key } = httpkey.data;
                    const request = await this.$http.register(
                        { name, nickname, password, re_password, email },
                        key
                    );
                    if (request.msg === "ok") {
                        Message.success("注册成功！");
                        this.$router.push({ path: "/user/login" });
                    } else {
                        Message.error(request.rspinf || "注册失败");
                    }
                } else {
                    Message.error(request.rspinf || "注册失败");
                }
            } catch (error) {
                Message.error("注册失败！");
                console.log(error);
            }
        },
        handleReset(name) {
            this.$refs[name].resetFields();
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
        DatePicker
    }
};
</script>

<style lang="sass" scoped>
@import "~assets/css/index.scss";
.register-container {
    // width: $base-width;
    margin: 0 auto;
    padding-bottom: 100px;
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
    .form-container {
        width: 400px;
        margin: 0 auto;
        .btn-submit {
            width: 383px;
        }
    }
    .success-icon {
        width: 30px;
        height: 30px;
        font-size: 20px;
        text-align: center;
        line-height: 30px;
        color: #0aba07;
    }
    .error-icon {
        width: 30px;
        height: 30px;
        font-size: 20px;
        text-align: center;
        line-height: 30px;
        color: #ff0000;
    }
}
</style>
