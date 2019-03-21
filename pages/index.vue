<template>
    <section class="container">
        <div class="index-title">
            欢迎来到WEB2-CLUB
        </div>
    </section>
</template>

<script>
import AppLogo from "~/components/AppLogo.vue";
import { Button, Table } from "iview";
// import { Button } from 'element-ui';

export default {
    async asyncData({ req, store, route, redirect }) {
        const headers = req && req.headers;
        const isServer = process.server;
        if (isServer && !!!headers.cookie) {
            redirect({ path: "/user/login" });
        } else {
            redirect({ path: "/topic/home" });
        }
    },
    data() {
        return {
            name: "123",
            description: "....."
        };
    },
    mounted() {
        // this.$router.push("/topic/home");

        // this.$Spin.show({
        //     render: h => {
        //         return h("div", [
        //             h("Icon", {
        //                 class: "demo-spin-icon-load",
        //                 props: {
        //                     type: "ios-loading",
        //                     size: 18
        //                 }
        //             }),
        //             h("div", "请稍后")
        //         ]);
        //     }
        // });
    },
    mounted() {
        console.log(window);
    },
    components: {
        AppLogo,
        Button
    }
};
</script>

<style lang="scss" scoped>
.container {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    .index-title {
        color: #2db7f5;
        font-size: 40px;
        font-weight: 600;
    }
}

.title {
    font-family: "Quicksand", "Source Sans Pro", -apple-system,
        BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial,
        sans-serif; /* 1 */
    display: block;
    font-weight: 300;
    font-size: 100px;
    color: #35495e;
    letter-spacing: 1px;
}

.subtitle {
    font-weight: 300;
    font-size: 42px;
    color: #526488;
    word-spacing: 5px;
    padding-bottom: 15px;
}

.links {
    padding-top: 15px;
}
</style>

