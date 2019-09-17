// import axios from '@nuxtjs/axios';
import Cookie from 'js-cookie';

const state = {
    user : {
        auth : null,
    }
}

const actions = {

    async postLogin({ commit }, data) {
        console.log('Action çalıştı...');
        // console.log(data);

        await this.$axios.post('/postLogin', data)
        .then((data)=> {
            commit('CHANGE_AUTH', data);
            // this.$router.push('/admin');
            // return data;
            data ? Cookie.set('auth', data.data):'';
          })
        .catch((err) => {
            console.log(err);
          });
    },

}

const mutations = {
    CHANGE_AUTH(state, {data}) {
        state.user.auth = data;
    }
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