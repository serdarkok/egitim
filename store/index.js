import vuex from 'vuex';
import auth from './auth';
import user from './user';

const createStore = () => {
    return new vuex.Store({
        modules: {
            auth: auth,
            user: user
        },

        actions : {
            // nuxtServerInit({ commit }, { req }){
            //     let auth = null
    
            //     if(req.headers.cookie){
            //         const parsedCookie = cookieparser.parse(req.headers.cookie)
    
            //         try {
            //             auth = JSON.parse(parsedCookie.auth)
            //         } catch(err){
    
            //         }
            //     }
    
            //     commit('setAuth', auth)
            // }
        }
        
    });
}

export default createStore;