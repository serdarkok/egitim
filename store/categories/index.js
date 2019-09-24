const state = {
    categories : []
}

const actions = {
    async addCategory({ commit }, data) {
        try {
           const _result = await this.$axios.post('/categories/add', data);
           console.log(_result.data.message);
           if (_result.status === 200) {
            commit('ADD_CATEGORY', _result.data.message);
           }
        } catch (error) {
            console.log(error);
        }
    },
}

const mutations = {

    ADD_CATEGORY(state, data) {
        state.categories.push(data);
    },

    REMOVE_CATEGORY(state, data) {
        var i = state.categories.indexOf(data);
        state.categories.splice(i, 1);
    },

    SET_CATEGORY(state, data) {
        // console.log(data);
        state.categories = data;
    }
}

const getters = {
    allCategories(state) {
        return state.categories;
    }
}

export default {
    namespaced : true,
    state,
    actions,
    mutations,
    getters
}