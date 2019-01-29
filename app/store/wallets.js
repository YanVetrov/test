export const state = () => ({
    data: false,
    load: true,
})
export const namespaced = true
export const getters = {
    data: state => state.data,
    load: state => state.load,
}
export const mutations = {
    data: (state, data) => state.data = data,
    load: (state, load) => state.load = load,
}
export const actions = {
    async getList({ commit }, { currency = "USD", page = "1", limit = "10" }) {
        commit('load', false);
        let [err, res] = await this.app.$rest.to('user/wallet/get', { currency, page, limit });
        commit('load', true);
        console.log(err, res);
        if (!err && res && res.success) {
            commit('data', res.data.wallets)
        };
    },
}