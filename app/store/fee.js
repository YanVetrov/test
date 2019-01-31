export const state = () => ({
    fee: false,
    rate:false,
    load: true,
})
export const getters = {
    fee: state => state.fee,
    load: state => state.load,
    rate:state=>state.rate,
}
export const mutations = {
    fee: (state, fee) => state.fee = fee,
    load: (state, load) => state.load = load,
    rate:(state,rate)=>state.rate=rate
}
export const namespaced = true
export const actions = {
    async getFee({ commit }) {
        commit('load', false);
        let [err, res] = await this._vm.$rest.to('public/settings/fees/get',);
        commit('load', true);
        console.log(err, res);
        if (!err && res && res.success) commit('fee', res.data);
    },
    async getRate({ commit }) {
        commit('load', false);
        let [err, res] = await this._vm.$rest.to('public/settings/rate/get',);
        commit('load', true);
        console.log(err, res);
        if (!err && res && res.success) commit('rate', res.data.btc);
    },
}