import Cookie from 'js-cookie';

const state = {
    user : {
        auth : null,
    },
    error : {
        status: false,
        message: null,
    },
}

const actions = {
    async postLogin({ commit }, data) {
        // api/auth.js'i çağırıyor
        try {
            const _result = await this.$axios.post('/postLogin', data)
            if (_result.data.auth) {
                commit('CHANGE_AUTH', _result.data);
                Cookie.set('token', _result.data.token);
            }
        } catch (error) {
            console.log(error);
        }
    },

    async verifyToken({commit}, data) {
        const _control = await this.$axios.post('/verifyToken', data);
        if (_control) {
            commit('CHANGE_AUTH', _control.data);
        }
    },

    async logOut({ commit }) {
        Cookie.remove('token');
        commit('CHANGE_AUTH', {auth: false});
        this.$router.push('/login');
    }
}

const mutations = {
    CHANGE_AUTH(state, data) {
        state.user = data;
    },
}

const getters = {

}

export default {
    namespaced : true,
    state,
    actions,
    mutations,
    getters
}