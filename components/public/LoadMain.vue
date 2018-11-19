<template>
    <!-- 提供加载icon以及渐变显示的插槽 -->
    <div class="load-main">
        <transition name="fade">
            <slot name="load">
            </slot>
        </transition>
        <Spin size="large" fix v-show="!loaded"></Spin>
    </div>
</template>
<script>
import { Message, Spin } from 'iview';

export default {
    props: ['loaded'],
    components: { Spin },
};
</script>
<style lang="sass" scoped>
.fade-enter-active,
.fade-leave-active {
    transition: 0.5s ease;
}
.fade-enter,
.fade-leave-active {
    opacity: 0;
}
.load-main {
    position: relative;
    min-height: 200px;
}
</style>
