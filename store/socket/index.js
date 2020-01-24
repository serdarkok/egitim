const state = () => ({
    question: '',
    result: '',
    userCount: 0,
});

const actions = {
    async SOCKET_sendQuestion ({ commit }, data) {
        switch(data.action) {
            case 'q_start':
                const _ = await this.$axios.get('/questions/'+data.id);
                // Burada quiz süresini objeye ekliyoruz. Eğer soruda süre yoksa quiz içerisindeki süreyi dikkate alacak.
                const quizTime = await this.$axios.get('/quizzes/getQuizBySlug/'+data.quiz_id);
                _.data.data.quizTime = quizTime.data.data.time;
                if (_) {
                    commit('SET_QUESTION', _.data.data);
                }
                break;
            
            case 'q_stop':
                commit('REMOVE_QUESTION');
                break;
            
            case 'a_start':
                const result = await this.$axios.get('/answers/'+data.id);
                
                console.log(result);
                
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
    },

    async SOCKET_addGuestCount({commit}, data) {
        commit('ADD_GUEST', data);
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
    },

    ADD_GUEST(state, data) {
        state.userCount = data;
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