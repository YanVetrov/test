export default {
    state: {
        count: 55
    },
    mutations: {
        increment: state => state.count++,
        decrement: state => state.count--
    },
    getters:{
        count:(state)=>state.count
    }
}