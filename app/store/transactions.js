export const state = () => ({
    data: false,
    load: true,
    total_pages: 1,
    current_page: 1,
})
export const namespaced = true
export const getters = {
    data: state => state.data,
    load: state => state.load,
    current_page: state => state.current_page,
    total_pages: state => state.total_pages
}
export const mutations = {
    data: (state, data) => state.data = data,
    load: (state, load) => state.load = load,
    total_pages: (state, pages) => state.total_pages = pages,
    current_page: (state, page) => state.current_page = page,
}
export const actions = {
    async getList({ commit }, { currency = "USD", page = "1", limit = "10" }) {
        commit('load', false);
        console.log('IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII')
        let [err, res] = await this._vm.$rest.to('user/transaction/getList', { currency, page, limit });
        commit('load', true);
        console.log(err, res);
        if (!err && res) {
            commit('data', res.data.transactions)
            commit('current_page', res.data.count.select_page || 1);
            commit('total_pages', res.data.count.pages || 1);
        };
    },
}