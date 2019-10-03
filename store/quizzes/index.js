const state = {
    quizzes: [],
}

const actions = {

}

const mutations = {
    REMOVE(state, data) {
        var i = state.quizzes.indexOf(data);
        state.quizzes.splice(i, 1);
    },

    SET(state, data) {
        console.log('Buraya kadar geldi');
        state.quizzes = data;
    }
}

const getters = {
    allQuizzes(state) {
        return state.quizzes;
    }
}

export default {
    namespaced : true,
    state,
    actions,
    mutations,
    getters
}