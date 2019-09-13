// import axios from '@nuxtjs/axios';

const state = {
    user : {
        username: null,
        password: null,
    }
}

const actions = {

    postLogin({ commit }, data) {
        console.log('Action çalıştı...');
        console.log(data);

        this.$axios.post('/postLogin', data).then((data)=> {
            console.log(data);
          })
          .catch((err) => {
            console.log(err);
          });
    },

}

const mutations = {

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