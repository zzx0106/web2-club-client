<template>
    <div class="sidebar-contaner">
        右侧边栏
    </div>
</template>
<script>
import { Menu, MenuItem, Icon, Submenu, MenuGroup } from 'iview';
export default {
    props: {
      
    },
    components: { Menu, MenuItem, Icon, Submenu, MenuGroup },
};
</script>
<style lang="sass" scoped>
    .sidebar-contaner {
        background: #fff;
        color: black;
        height: 700px;
    }
</style>
