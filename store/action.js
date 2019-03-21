import * as types from './mutation-type';
const actions = {
    // asyncSetUserInfo(commit, user) {
    //     commit('setUserInfo', show)
    //     state.showLeft = showLeft;
    // },
    async ACTION_search({ commit }, payload) {
        const { search_type, keyword } = payload;
        commit('MUTATION_setSearchInfo', []); // 清空数组
        const search = await this.$http.search({
            search_type,
            keyword,
        });
        console.log('search', JSON.parse(JSON.stringify(search)));
        if (search.data.length > 0) {
            commit('MUTATION_setSearchInfo', search.data);
        }
    },
};
export default actions;
