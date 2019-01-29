import Vue from 'vue'
import axios from 'axios'
import promiseDestructor from 'await-to-js';

const config = require('../_config/app.json');

const Rest = {
    install(Vue, options) {
        Vue.prototype.$rest = this
    },
    api(method, param) {
        return axios({
            url: config.baseUrl + config.apiPath + method + '/',
            data: param,
            headers: {
                token: localStorage.getItem('token')
            },
            method: 'post'
        })
            .then(res => {
                if (res.data.success === false) {
                    return Promise.reject(res.data)
                }
                return res.data;
            }).catch(err => {
                return Promise.reject(err)
            })
    },
    to(method, param) {
        return promiseDestructor(this.api(method, param))
    },
    baseUrl: config.baseUrl,
    apiPath: config.baseUrl + config.apiPath,
    fsPath: config.baseUrl + config.fsPath,

    renderError(err) {
        console.log('Api validation ERROR ===>', err);
        if (err.error && err.error.errorCode) {
            if (errorMessages[err.error.errorCode])
                return errorMessages[err.error.errorCode];
            return {}
        }
        return {}
    }
};
Vue.use(Rest);

export default ({app}) => {
    app.$rest = Rest
}

const errorMessages = {
    40301: {auth2Create403: 'You are not authorized'},
    214321: {email: 'Wrong Email'},
    11000654: {nickname: 'This nickname already in use'},
    busyNickname: {nickname: 'This nickname already in use'},
    241351: {nickname: 'User not found'},
    543264363444: {password: 'Wrong password'},
    6231533598118172: {code2Auth: 'Wrong 2Auth Code'},
    63426324: {code2Auth: 'Your account blocked by 5 min'},
    3421537955653247: {confirm2Auth: 'Wrong code'},
    2801537954040709: {create2Auth: '2Auth already exist'},
    5031536611147282: {currentPassword: 'Wrong current password'},
    5341529529941981: {parentId: 'Wrong parent id'}
};