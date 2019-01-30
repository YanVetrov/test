export const state = () => ({
    list: [{},{},{},{}],
    load: true,
    one: false,
})
export const namespaced = true
export const getters = {
    list: state => state.list,
    load: state => state.load,
    one: state => state.one,
}
export const mutations = {
    list: (state, list) => state.list = list,
    load: (state, load) => state.load = load,
    one: (state, one) => state.one = one,
}
export const actions = {
    async getList({ commit }) {
        commit('load', false);
        let [err, res] = await this._vm.$rest.to('user/merchant/getList');
        commit('load', true);
        console.log(err, res.data.merchants);
        if (!err && res && res.success) commit('list', res.data.merchants);
    },
    async getOne({ commit }, merchantId) {
        commit('load', false);
        let [err, res] = await this._vm.$rest.to('user/merchant/get', { merchantId });
        commit('load', true);
        console.log(err, res);
        if (!err && res && res.success) {
            commit('one', res.data.merchant)
            return res.data.merchant
        };
    },
    async create({ commit }, name) {
        commit('load', false);
        let [err, res] = await this._vm.$rest.to('user/merchant/create', { name });
        commit('load', true);
        console.log(err, res);
        if (!err && res && res.success) return res.data.merchant._id;
        else return false;
    },
    async edit({ commit }, {
        merchantId = '',
        name = "",
        secretKey = "",
        successUrl = "",
        failUrl = "",
        handlerUrl = "",
        domain = "",
        key = '',
        autoExchange=false,
    }) {
        commit('load', false);
        let [err, res] = await this._vm.$rest.to('user/merchant/update', {
            merchantId,
            name,
            secretKey,
            successUrl,
            failUrl,
            handlerUrl,
            domain,
            key,
            autoExchange
        });
        commit('load', true);
        console.log(err, res);
        if (!err && res && res.success) return true;
        else return false;
    },
    async remove({ commit }, merchantId) {
        commit('load', false);
        let [err, res] = await this._vm.$rest.to('user/merchant/delete', { merchantId });
        commit('load', true);
        console.log(err, res);
        if (!err && res && res.success) return true;
        else return false;
    },
}