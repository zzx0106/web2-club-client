import * as types from './mutation-type';
const mutations = {
    showLeftSider(state, showLeft) {
        state.showLeft = showLeft;
    },
    toFetchUserInfo(state) {
        state.changeUserInfo = !state.changeUserInfo;
    },
    MUTATION_setSearchInfo(state, searchData) {
        state.STATE_searchData = searchData;
    },
};
export default mutations;
