export const state = () => ({
    data: false,
    load: true,
})
export const getters = {
    data: state => state.data,
    load: state => state.load,
}
export const mutations = {
    data: (state, data) => state.data = data,
    load: (state, load) => state.load = load,
}
export const actions = {
    async create({ commit },{fromCurrency,toCurrency,amount}) {
        commit('load', false);
        let [err, res] = await this._vm.$rest.to('user/exchange/create',{fromCurrency,toCurrency,amount});
        commit('load', true);
        console.log(err, res);
        if (!err && res && res.success) return true;
        else return false;
    },
}