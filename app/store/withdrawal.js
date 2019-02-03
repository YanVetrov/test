export const state = () => ({
    data: false,
    load: true,
})
export const getters = {
    data: state => state.data,
    load: state => state.load,
}
export const namespaced = true
export const mutations = {
    data: (state, data) => state.data = data,
    load: (state, load) => state.load = load,
}
export const actions = {
    async create({commit, dispatch}, {address, amount}) {
        commit('load', false);
        let [err, res] = await this._vm.$rest.to('user/withdrawal/create', {address, amount});
        commit('load', true);
        console.log(err, res);
        if (!err && res && res.success) {
            dispatch('wallets/getList', {}, {root: true})
            dispatch('transactions/getList', {currency:'BTC'}, {root: true})
            return true;
        }
        else return err.error.message;
    },
}