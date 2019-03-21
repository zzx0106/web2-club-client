import { Message } from 'iview';
import Cookies from 'universal-cookie';
import config from '../config/config';
const { baseClientURL } = config.axios_config;
class Api {
    constructor() {}
    get() {
        throw new Error('Abstract methods must be implemented');
    }

    post() {
        throw new Error('Abstract methods must be implemented');
    }
    /**
     * @param {String} email 用户email
     */
    getUserByEmail(email) {
        return this.post(baseClientURL + '/user/get_user_by_email', { email });
    }
    /**
     * @param {String} name 用户name
     */
    getUserByName(name) {
        return this.post(baseClientURL + '/user/get_user_by_name', { name });
    }
    /**
     * @param {String} name 用户name
     */
    getTopicsByAuthorId() {
        return this.get(baseClientURL + '/topic/user_topics');
    }
    /**
     * 获取秘钥
     */
    getKey() {
        return this.get(baseClientURL + '/user/get_key');
    }
    register(params, key) {
        if (Object.keys(params).some((item) => !!!params[item])) {
            Message.error('输入不能为空！');
            return;
        }
        return this.post(baseClientURL + '/user/register', params, { is_med: true, key });
    }
    login(params, key) {
        if (Object.keys(params).some((item) => !!!params[item])) {
            Message.error('输入不能为空！');
            return;
        }
        return this.post(baseClientURL + '/user/login', params, { is_med: true, key });
    }
    loginByEmail(params, key) {
        if (Object.keys(params).some((item) => !!!params[item])) {
            Message.error('输入不能为空！');
            return;
        }
        return this.post(baseClientURL + '/user/login_by_email', params, { is_med: true, key });
    }
    /**
     * @param tab 分类
     * @param headers header头部
     */
    getTopic({ tab = 'all', headers }) {
        return this.get(baseClientURL + `/topic/topics?tab=${tab}`, { headers });
    }
    /**
     * @param id id
     * @param headers header头部
     */
    getTopicByTopicId({ id, headers }) {
        return this.get(baseClientURL + `/topic/${id}/detail`, { headers });
    }
    proxyLogin(params, key) {
        if (Object.keys(params).some((item) => !!!params[item])) {
            Message.error('输入不能为空！');
            return;
        }
        return this.post('/login', params, { is_med: true, key });
    }
    /**
     * 回复
     */
    replie(tid, content) {
        return this.post(baseClientURL + `/reply/${tid}/add`, content);
    }
    /**
     * 获取所有tabs
     */
    allTabs(headers) {
        return this.get(baseClientURL + `/topic/all_tabs`, { headers });
    }
    /**
     * 获取指定tab
     */
    findTab(tab) {
        return this.post(baseClientURL + `/topic/find_tab`, tab);
    }
    /**
     * 新增文章
     * @param {String} title 标题
     * @param {String} tab 分类
     * @param {String} content 内容
     */
    createTopic(params) {
        return this.post(baseClientURL + `/topic/topics`, params);
    }
    /**
     * 主题收藏
     * @param {String} topic_id 主题id
     */
    add_collect(params) {
        return this.post(baseClientURL + '/topic/add_collect', params);
    }
    /**
     * 取消主题收藏
     * @param {String} topic_id 主题id
     */
    remove_collect(params) {
        return this.post(baseClientURL + '/topic/remove_collect', params);
    }
    /**
     * 评论点赞
     * @param {String} rid 回复用户的id
     */
    upReplies(rid) {
        return this.get(baseClientURL + '/reply/' + rid + '/up');
    }
    /**
     * 文章点赞
     * @param {String} tid 文章id
     */
    upTopic(tid) {
        return this.get(baseClientURL + '/topic/' + tid + '/up');
    }
    /**
     * 关注作者
     * @param {String} author_id 作者id
     */
    addFollowers(params) {
        return this.post(baseClientURL + '/user/add_followers', params);
    }
    /**
     * 删除关注作者
     * @param {String} author_id 作者id
     */
    deleteFollowers(params) {
        return this.post(baseClientURL + '/user/delete_followers', params);
    }
    /**
     * 获取关注列表
     */
    getFollowing() {
        return this.get(baseClientURL + '/user/get_following');
    }
    /**
     * 获取粉丝
     */
    getFollowers(params) {
        return this.get(baseClientURL + '/user/get_followers');
    }
    /**
     * 关注作者
     * @param {String} author_id 作者id
     */
    find_tab_topic(tid, headers) {
        console.log('find_tab_topic', tid, headers);
        return this.get(baseClientURL + '/topic/classify/' + tid, { headers });
    }
    get_collect_by_name(name) {
        return this.get(baseClientURL + '/user/' + name + '/get_collects');
    }
    /**
     * 更新用户信息
     * @param {String} info_type 需要更新的数据类型
     * @param {String} info_data 需要更新的数据
     */
    update_person_info(params) {
        return this.post(baseClientURL + '/user/update_person_info', params);
    }
    get_qiniu_token() {
        return this.get(baseClientURL + '/topic/get_qiniu_token');
    }
    search(params) {
        return this.post(baseClientURL + '/search', params);
    }
    logout() {
        return this.get(baseClientURL + '/user/logout');
    }
    // setCookie(cookie) {
    //     this.setCookie(cookie);
    // }
}
export default Api;
