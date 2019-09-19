// import axios from '@nuxtjs/axios';
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
        await this.$axios.post('/postLogin', data)
        .then((result)=> {
            if (result.data.auth) {
                commit('CHANGE_AUTH', result.data);
                Cookie.set('token', result.data.token);
            }
        })
        .catch((err) => {
            console.log(err);
          });
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
        this.$router.push('/')
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