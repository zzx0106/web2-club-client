<template>
    <div>
        <div id="toolbar" v-show="show">

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
            <button class="ql-script" value="sub"></button>
            <button class="ql-script" value="super"></button>
        </div>
        <no-ssr>
            <quill-editor :content="content" class="editor-contener" id="ql-editor" ref='textEditor' @change="onEditorChange($event)" @focus="onEditorFocus($event)" @blur="onEditorBlur($event)" @ready="onEditorReady($event)" @syntaxChange="syntaxChange($event)" :options='editorOption'></quill-editor>
        </no-ssr>
        <!-- <div class="quill-editor ql-container ql-snow"  id="ql-editor" >
        <div class="ql-editor" ref="content" v-html="editorContent2"></div>
    </div> -->
    </div>
</template>

<script>
import hljs from 'highlight.js';
export default {
    data() {
        return {
            editorContent: '',
            editorContent2: '',
            editorOption: {},
            show: false,
            editor: null,
            vcontent: '',
            content: '',
        };
    },
    mounted() {
        hljs.configure({
            languages: [
                'JavaScript',
                'TypeScript',
                'HTML',
                'XML',
                'Java',
                'Python',
                'CSS',
                'Less',
                'SCSS',
                'Stylus',
                'SQL',
                'PHP',
                'Nginx',
                'HTTP',
                'Go',
            ],
        });
        hljs.initHighlighting();
        this.editorOption = {
            placeholder: '',
            theme: 'snow',
            modules: {
                // history: {
                //     delay: 0,
                //     maxStack: 500,
                //     userOnly: true
                // },
                // syntax: true,
                syntax: {
                    highlight: (text) => {
                        return hljs.highlightAuto(text).value;
                    },
                },
                imageResize: true,
                toolbar: '#toolbar',
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
            },
        };
    },
    methods: {
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
            this.$emit('editorContent', html);
        },
        cleanContent() {
            console.log('清除成功');
            this.editor.setText('');
        },
        atController(data) {
            // this.editor.setContents([
            //     { insert: 'Hello ' },
            //     { insert: 'World!', attributes: { bold: true } },
            //     { insert: '\n' },
            // ]);
            console.log(this.vcontent + data);
            this.content = this.vcontent.substring(0, this.vcontent.length - 4) + data + '</p>';
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
        },
    },
};
</script>
<style>
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
