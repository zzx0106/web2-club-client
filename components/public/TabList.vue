<template>
    <div class="tab-list-container">
        <div v-show="tabList.length > 0" class="tab-item" v-for="(item, index) in tabList" :key="index">
            <div class="tab-item-header">
                <span class="tag" @click="sentSearchTag(item)">{{item.name}}</span>
                <span>&nbsp;x&nbsp;{{item.topic_ids.length}}</span>
            </div>
            <div class="tab-item-body">
                <p>{{item.content || '该语言暂无简介'}}</p>
            </div>
            <div class="tab-item-footer">
                <span>{{item.topic_ids.length}}篇文章</span>&nbsp;-&nbsp;
                <span>{{item.create_at | timeFormat}}</span>
            </div>
        </div>
    </div>
</template>
<script>
import {} from 'iview';
export default {
    props: {
        tabList: {
            default: [],
        },
    },
    data() {
        return {};
    },
    methods: {
        sentSearchTag(item) {
            this.$emit('sentSearchTag', item);
        },
    },
    computed: {
        resizeItem() {
            // if() {
            //     return 'one-of-line'
            // } else    if() {
            //     return 'one-of-line'
            // } else    if() {
            //     return 'one-of-line'
            // } else if(){
            // }
        },
    },
    components: {},
};
</script>
<style lang="sass" scoped>
@import '~assets/css/index.scss';
.tab-list-container {
    @include display-flex();
    @include flex-wrap(wrap);
    @include justify-content(space-between);
    margin: 20px 15px;

    .tab-item {
        flex: 1 1 25%;
        min-width: 250px;
        width: auto;
        border-bottom: 1px dotted #e4e6e8;
        padding: 8px 4px 12px 4px;
        .tab-item-header {
            font-size: 11px;
            color: #6a737c;
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
                transition: all 0.15s ease-in-out;
                cursor: pointer;
                font-size: 12px;
                color: #39739d;
                background-color: #e1ecf4;
                border-color: #e1ecf4;
                &:hover {
                    color: #39739d;
                    background-color: #cee0ed;
                    border-color: #e1ecf4;
                }
            }
        }
        .tab-item-body {
            padding: 0;
            padding-bottom: 5px;
            margin: 0;
            padding-top: 4px;
            padding-right: 8px;
            color: #848d95;
            box-sizing: content-box;
            font-size: 12px;
            height: 39px;
            line-height: 14px;
            overflow: hidden;
            margin-bottom: 4px;
        }
    }
}
</style>
