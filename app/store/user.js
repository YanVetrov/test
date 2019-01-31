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
            console.log('INIT LOGIN')
            let [err, res] = await this._vm.$rest.to('user/auth/sign-in', {tokenAuth: true, ...data})
            console.log('CLOSE LOGIN')
            commit('load', true)
            console.log(err, res)
            if (res) {
                commit('user', res.data)
                localStorage.setItem('token', res.data.token)
                console.log(res.data.token)
                return true;
            }
            else return err.error.message
        },
        async reg({commit}, {login,password,email}) {
            commit('load', false)
            console.log('INIT reg')
            let [err, res] = await this._vm.$rest.to('user/auth/register', {login,password,email})
            console.log('CLOSE reg')
            commit('load', true)
            console.log(err, res)
            if (res)return true;
            else return err.error.message;
        },
        async check() {
            let [err, res] = await this._vm.$rest.to('user/auth/session/get')
            console.log(err, res)
            if (res.data) return true;
            else return false;
        }
    }
}