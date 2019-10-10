const state = {
    question: '',
}

const actions = {

    SOCKET_newMessage({ commit }, data) {
        console.log('gerekli belgeler:', data);
        console.log('Message recieved', data);
    },

    async SOCKET_sendQuestion ({ commit }, veri) {
        const _ = await this.$axios.get('/questions/'+veri);
        console.log(_);
        if (_) {
            commit('SET_QUESTION', _.data.data);
        }
    }
}

const mutations = {
    SET_QUESTION(state, data) {
        state.question = data;
    }
 }

const getters = {
    allQuestion(state) {
        return state.question;
    }
}

export default {
    namespaced : true,
    state,
    actions,
    mutations,
    getters
}