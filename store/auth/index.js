// import axios from '@nuxtjs/axios';
import Cookie from 'js-cookie';
import Jwt from 'jsonwebtoken';

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
        console.log('Action çalıştı...');

        await this.$axios.post('/postLogin', data)
        .then((result)=> {
            console.log(result.data);
            if (result.data.auth) {
                commit('CHANGE_AUTH', result);
                Cookie.set('token', result.data.token);
            }
            
            // this.$router.push('/admin');
            
        })
        .catch((err) => {
            console.log(err);
          });
    },

}

const mutations = {
    CHANGE_AUTH(state, {data}) {
        console.log(data);
        state.user.auth = data;
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