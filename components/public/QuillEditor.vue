<template>
    <div>
        <div id="toolbar"
             v-show="show">

            <!-- Add font size dropdown -->
            <select class="ql-header">
                <option value="1">标题1</option>
                <option value="2">标题2</option>
                <option value="3">标题3</option>
                <option selected>正文</option>
            </select>
            <!-- 粗体 -->
            <button class="ql-bold"></button>
            <!-- 斜体 -->
            <button class="ql-italic"></button>
            <!-- 下划线 -->
            <button class="ql-underline"></button>
            <button class="ql-code-block"></button>
            <select class="ql-align"></select>
            <select class="ql-color"></select>
            <select class="ql-background"></select>
            <button class="ql-image"></button>
            <button class="ql-link"></button>
            <button class="ql-video"></button>
            <!-- Add subscript and superscript buttons -->
            <button class="ql-script"
                    value="sub"></button>
            <button class="ql-script"
                    value="super"></button>
        </div>
        <Upload multiple
                :show-upload-list="false"
                :before-upload="beforeUpload"
                :on-success="handleSuccess"
                :max-size="2048"
                :format="['jpg','jpeg','png','gif']"
                :action="formUrl"
                :data="uploadData">
            <Button icon="ios-cloud-upload-outline">Upload files</Button>
        </Upload>
        <no-ssr>
            <quill-editor :content="content"
                          class="editor-contener"
                          id="ql-editor"
                          ref='textEditor'
                          @change="onEditorChange($event)"
                          @focus="onEditorFocus($event)"
                          @blur="onEditorBlur($event)"
                          @ready="onEditorReady($event)"
                          @syntaxChange="syntaxChange($event)"
                          :options='editorOption'></quill-editor>
        </no-ssr>
        <!-- <div class="quill-editor ql-container ql-snow"  id="ql-editor" >
        <div class="ql-editor" ref="content" v-html="editorContent2"></div>
    </div> -->
    </div>
</template>

<script>
// import "quill/dist/quill.js";
import hljs from "highlight.js";
import { Upload } from "iview";
import * as qiniu from "qiniu-js";
export default {
    components: {
        Upload
    },
    data() {
        return {
            editorContent: "",
            editorContent2: "",
            editorOption: {},
            show: false,
            editor: null,
            vcontent: "",
            content: "",
            formUrl: "", // 七牛cdn
            qiniu_store: "//piwjkv3gk.bkt.clouddn.com/", // 七牛仓库
            uploadType: "image", // 上传类型
            uploadData: {}, // 表单传递的data
            qiniu_token: "", // 七牛token
            fullscreenLoading: false // 上传读条
        };
    },
    mounted() {
        this.formUrl = location.protocol + "//up-z2.qiniu.com";
        hljs.configure({
            languages: [
                "JavaScript",
                "TypeScript",
                "HTML",
                "XML",
                "Java",
                "Python",
                "CSS",
                "Less",
                "SCSS",
                "Stylus",
                "SQL",
                "PHP",
                "Nginx",
                "HTTP",
                "Go"
            ]
        });
        hljs.initHighlighting();
        this.editorOption = {
            placeholder: "",
            theme: "snow",
            modules: {
                // history: {
                //     delay: 0,
                //     maxStack: 500,
                //     userOnly: true
                // },
                // syntax: true,
                syntax: {
                    highlight: text => {
                        return hljs.highlightAuto(text).value;
                    }
                },
                imageResize: true,
                toolbar: {
                    container: "#toolbar",
                    handlers: {
                        image(value) {
                            if (value) {
                                // this.uploadType = "image";
                                document
                                    .querySelector(".ivu-upload .ivu-btn")
                                    .click();
                            } else {
                                this.quill.format("image", false);
                            }
                        }
                    }
                }
                // toolbar:
                // [
                //     // toggled buttons
                //     ['bold', 'italic', 'underline', 'strike'],
                //     ['blockquote', 'code-block', 'image'],
                //     // custom button values
                //     // [{ header: 1 }, { header: 2 }],
                //     [{ list: 'ordered' }, { list: 'bullet' }],
                //     // superscript/subscript
                //     [{ script: 'sub' }, { script: 'super' }],
                //     // outdent/indent
                //     // [{ indent: '-1' }, { indent: '+1' }],
                //     // [{ direction: 'rtl' }], // text direction
                //     // custom dropdown
                //     [{ size: ['标题1', false, 'large', 'huge'] }],
                //     [{ header: [1, 2, 3, 4, false] }],
                //     // dropdown with defaults from theme
                //     [{ color: [] }, { background: [] }],
                //     [{ font: [] }],
                //     [{ align: [] }],
                //     [
                //         // // remove formatting button
                //         'clean'
                //     ]
                // ['link', 'image', 'video']
                // ]
            }
        };
    },
    methods: {
        beforeUpload(file) {
            console.log("befor upload");
            return this.qiniuUpload(file);
        },
        qiniuUpload(file) {
            this.fullscreenLoading = true;
            const suffix = file.name.split(".");
            const ext = suffix.splice(suffix.length - 1, 1)[0];
            // if (this.uploadType === "image") {
            // return promise 的原因是让this.uploadData 与form表单同步
            // 否则在this.uploadData值之前表单就会提交
            // console.log("进入这里");
            return this.$http.get_qiniu_token().then(res => {
                let time = new Date().getTime();
                this.uploadData = {
                    key: `image/${suffix.join(".")}_${time}.${ext}`,
                    token: res.data.uploadToken
                };
                console.log("this.uploadData", this.uploadData);
            });
            // } else {
            //     console.log("token 获取失败");
            // }
            // } else if (this.uploadType === "video") {
            // }
        },
        handleSuccess(e, file, fileList) {
            // 千古奇坑，method的函数在初始化时会被执行一次，这里必须要加判断，否则quill.insertEmbed里面有innerHTML，会报错，奇坑
            if (process.browser) {
                this.fullscreenLoading = false;
                let url = "";
                if (this.uploadType === "image") {
                    // 获得文件上传后的URL地址
                    console.log("handleSuccess", e);
                    console.log("handleSuccess", file);
                    console.log("handleSuccess", fileList);
                    url = location.protocol + this.qiniu_store + e.key;
                } else if (this.uploadType === "video") {
                    url = STATVIDEO + e.key;
                }

                // 获取富文本组件实例
                let quill = this.$refs.textEditor.quill;
                // 如果上传成功
                if (url) {
                    // 获取光标所在位置
                    let length = quill.getSelection().index;
                    quill.insertEmbed(
                        length,
                        this.uploadType,
                        url,
                        Quill.sources.USER
                    );
                    // 调整光标到最后
                    quill.setSelection(length + 1);
                } else {
                    // 提示信息，需引入Message
                    Message.error("图片插入失败");
                }
            }
        },

        onEditorChange({ html, text, quill }) {
            // this.editorContent2 = hljs.highlightAuto(text).value;
            // this.editorContent2 = this.editorContent;
        },
        onEditorBlur(e) {},
        onEditorFocus(e) {},
        onEditorReady(e) {
            this.editor = e;
            this.show = true;
        },
        click() {
            console.log(this.editorContent);
        },
        syntaxChange({ html, text }) {
            this.vcontent = html;
            // this.content = text;
            this.$emit("editorContent", html);
        },
        cleanContent() {
            console.log("清除成功");
            this.editor.setText("");
        },
        atController(data) {
            // this.editor.setContents([
            //     { insert: 'Hello ' },
            //     { insert: 'World!', attributes: { bold: true } },
            //     { insert: '\n' },
            // ]);
            console.log(this.vcontent + data);
            this.content =
                this.vcontent.substring(0, this.vcontent.length - 4) +
                data +
                "</p>";
            // var Delta = this.editor.getContents();
            // this.editor.updateContents(
            //     Delta.retain(6) // Keep 'Hello '
            //         .delete(5) // 'World' is deleted
            //         .insert('Quill')
            //         .retain(1, { bold: true }) // Apply bold to exclamation mark
            // );
            // this.editor.insertText(this.editorContent.length, data, {
            //     color: '#08c',
            //     Blockquote: true,
            // }); // 插入的元素不会导致光标前移
        }
    }
};
</script>
<style>
.ivu-upload {
    display: none;
}
.ql-toolbar.ql-snow {
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
    border-top: 1px solid #ccc;
    border-bottom: none;
}
.editor-contener {
    text-align: left;
}
.ql-container {
    font-size: 14px;
}
.ql-snow .ql-tooltip {
    z-index: 30;
}
.ql-editor {
    min-height: 150px;
}
#ql-editor h1 {
    font-weight: 500;
}
#ql-editor h2 {
    font-weight: 500;
}
#ql-editor h3 {
    font-weight: 500;
}
#ql-editor pre {
    font-family: Menlo, Monaco, Consolas, Courier New, monospace, monospace;
    font-size: 14px;
}
</style>
