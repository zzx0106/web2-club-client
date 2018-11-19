<template>
    <div class="sidebar-contaner">
        <div>
            <!-- <Affix :offset-top="47"> -->
            <Menu :active-name="nowRouter" width="165">
                <MenuItem ref="menuitem" :to="item.path" replace class="item" :name="item.path" v-for="(item, index) in tabs" :key="index">
                <Icon :type="item.icon" />
                <span>{{item.name}}</span>
                </MenuItem>
            </Menu>
            <!-- </Affix> -->
        </div>

    </div>
</template>
<script>
import { Affix, Menu, MenuItem, Icon, Submenu, MenuGroup } from 'iview';
export default {
    props: {
        tabs: {
            type: Array,
            default: function() {
                return [];
            },
        },
    },
    data() {
        return {
            nowRouter: '/topic/home',
        };
    },
    mounted() {
        this.nowRouter = this.$route.path;
    },
    components: { Affix, Menu, MenuItem, Icon, Submenu, MenuGroup },
};
</script>
<style lang="sass" scoped>
    .sidebar-contaner {
        width: 165px;
        .item {
            height: 35px;
        }
        .link {
            width: 100%;
            height: 100%;
            color: black;
            display: block;
            position: absolute;
            top: 0;
            left: 0;
        }
    }
</style>
