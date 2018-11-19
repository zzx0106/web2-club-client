<template>
    <div class="body-contaner">
        <nuxt-child :key="$route.params.id" />
    </div>
</template>
<script>
import { Menu, MenuItem, Icon, Submenu, MenuGroup } from 'iview';
export default {
    asyncData(context) {
        console.log('async--------------');
        // const topic = await this.$http.getTopic();
        // console.log('topic', topic);
    },
    props: {},
    components: { Menu, MenuItem, Icon, Submenu, MenuGroup },
};
</script>
<style lang="sass" scoped>
    .body-contaner {
       
    }
</style>
