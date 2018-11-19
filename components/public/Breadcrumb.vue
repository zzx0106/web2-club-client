<template>
    <Breadcrumb class="bread">
        <BreadcrumbItem class="bread-item" :to="item.href" @click.native.stop.prevent="click"  v-for="(item, index) in arr" :key="index">
            <Icon :type="item.icon"></Icon> {{item.name}}
        </BreadcrumbItem>
    </Breadcrumb>
</template>
<script>
export default {
    props: ['arr'],
    methods: {
        click() {
            console.log('点击')
        }
    }
};
</script>
<style lang="sass" scoped>
    @import '~assets/css/index.scss';
    .bread {
        @include display-flex();
        margin: 10px 0 0 15px;
    }
</style>
