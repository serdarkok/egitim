const state = {
    question: '',
}

const actions = {
    async SOCKET_sendQuestion ({ commit }, data) {
        switch(data.action) {
            case 'start':
                const _ = await this.$axios.get('/questions/'+data.id);
                if (_) {
                    commit('SET_QUESTION', _.data.data);
                }
                break;
            
            case 'stop':
                commit('REMOVE_QUESTION');
                break;
            
            case 'answer':
                break;
        }
    }
}

const mutations = {
    SET_QUESTION(state, data) {
        state.question = data;
    },

    REMOVE_QUESTION(state, data) {
        state.question = null;
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