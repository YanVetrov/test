export default {
    namespaced: true,
    state: {
        user: 1,
        load: true,
    },
    getters: {
        user: (state) => state.user,
        load: (state) => state.load,
    },
    mutations: {
        user: (state, data) => state.user = data,
        load: (state, data) => state.load = data
    },
    actions: {
        async login({commit}, data) {
            commit('load', false)
            let [err, res] = await this._vm.$rest.to('user/auth/sign-in', {tokenAuth: true, ...data})
            commit('load', true)
            console.log(err, res.data.affiliate)
            if (res) {
                commit('user', res.data)
                localStorage.setItem('token', res.data.token)
                console.log(res.data.token)
                return true;
            }
            else return false
        },
        async check() {
            let [err, res] = await this._vm.$rest.to('user/auth/session/get')
            console.log(err, res)
            if (res.data) return true;
            else return false;
        }
    }
}