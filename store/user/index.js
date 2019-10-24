const state = () => {

}

const actions = {

    registerUser({ commit }, data) {
        console.log('Action çalıştı...');
        console.log(data);

        this.$axios.post('/registerUser', data).then((data)=> {
            console.log(data.data);
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