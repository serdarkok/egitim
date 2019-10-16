const state = {
    question: '',
    result: '',
}

const actions = {
    async SOCKET_sendQuestion ({ commit }, data) {
        switch(data.action) {
            case 'q_start':
                const _ = await this.$axios.get('/questions/'+data.id);
                if (_) {
                    commit('SET_QUESTION', _.data.data);
                }
                break;
            
            case 'q_stop':
                commit('REMOVE_QUESTION');
                break;
            
            case 'a_start':
                const result = await this.$axios.get('/answer/'+data.id);
                if (result) {
                    commit('REMOVE_QUESTION');
                    commit('SET_ANSWER', result);
                }
                break;

            case 'a_stop':
                    commit('REMOVE_QUESTION');
                    commit('REMOVE_ANSWER');
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
    },

    SET_ANSWER(state, data) {
        state.result = data;
    },

    REMOVE_ANSWER(state, date) {
        state.result = null;
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