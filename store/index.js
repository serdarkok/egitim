import vuex from 'vuex';
import auth from './auth';
import user from './user';

const createStore = () => {
    return new vuex.Store({
        modules: {
            auth: auth,
            user: user
        } 
    });
}

export default createStore;