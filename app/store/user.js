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
            let {login,password,code} = data;
            let obj = {login,password};
            code&&(obj.code=code);
            console.log('INIT LOGIN')
            let [err, res] = await this._vm.$rest.to('user/auth/sign-in', {tokenAuth: true, ...obj})
            console.log('CLOSE LOGIN')
            commit('load', true)
            console.log(err, res)
            if (res) {
                commit('user', res.data)
                localStorage.setItem('token', res.data.token)
                console.log(res.data.token)
                return true;
            }
            else if(err.error.errorCode===6231533598118172)return '2fa';
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
        async destroySession({commit}) {
            commit('load', false)
            let [err, res] = await this._vm.$rest.to('user/auth/destroyToken',{token:localStorage.getItem('token')})
            commit('load', true)
            console.log(err, res)
            if (res)return true;
            else return err.error.message;
        },
        async changeEmail({commit,dispatch},{email}) {
            commit('load', false)
            let [err, res] = await this._vm.$rest.to('user/profile/changeEmail',{email})
            commit('load', true)
            console.log(err, res)
            if (res){
                dispatch('check');
                return true;
            }
            else return err.error.message;
        },
        async otpCreate({commit}) {
            commit('load', false)
            let [err, res] = await this._vm.$rest.to('user/profile/secure/otp/create')
            commit('load', true)
            console.log(err, res)
            if (res)return res.data.otp;
            else return err.error.message;
        },
        async otpDelete({commit,dispatch}) {
            commit('load', false)
            let [err, res] = await this._vm.$rest.to('user/profile/secure/otp/delete')
            commit('load', true)
            console.log(err, res)
            if (res){
                dispatch('check');
                return true;}
            else return err.error.message;
        },
        async otpConfirm({commit,dispatch},{code}) {
            commit('load', false)
            let [err, res] = await this._vm.$rest.to('user/profile/secure/otp/confirm',{code})
            commit('load', true)
            console.log(err, res)
            if (res){
                dispatch('check');
                return true;}
            else return err.error.message;
        },
        async changePassword({commit},{oldPassword,newPassword}) {
            commit('load', false)
            let [err, res] = await this._vm.$rest.to('user/profile/changePassword',{oldPassword,newPassword})
            commit('load', true)
            console.log(err, res)
            if (res)return true;
            else return err.error.message;
        },
        async check({commit}) {
            commit('load',false)
            let [err, res] = await this._vm.$rest.to('user/auth/session/get')
            commit('load',true)
            console.log(err, res)
            if (res.data) {
                commit('user', res.data)
                return true;
            }
            else return false;
        }
    }
}