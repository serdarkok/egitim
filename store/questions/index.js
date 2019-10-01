const state = {
    questions : [],
}

const actions = {

}

const mutations = {
    REMOVE_QUESTION(state, data) {
        var i = state.questions.indexOf(data);
        state.questions.splice(i, 1);
    },

    SET_QUESTION(state, data) {
        console.log('Buraya kadar geldi');
        state.questions = data;
    }
}

const getters = {
    allQuestions(state) {
        return state.questions;
    }
}

export default {
    namespaced : true,
    state,
    actions,
    mutations,
    getters
}