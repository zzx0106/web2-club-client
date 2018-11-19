import * as types from './mutation-type';
const mutations = {
    showLeftSider(state, showLeft) {
        state.showLeft = showLeft;
    },
    toFetchUserInfo(state) {
        state.changeUserInfo = !state.changeUserInfo;
    },
};
export default mutations;
