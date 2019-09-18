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
            nuxtServerInit({ commit }, { req }){
                process.server?console.log('Server Tarafı'):console.log('Client Tarafı');

            //     let token = null
    
            //     if(req.headers.cookie){
            //         const parsedCookie = cookieparser.parse(req.headers.cookie)
    
            //         try {
            //             token = JSON.parse(parsedCookie.token)
            //         } catch(err){
    
            //         }
            //     }
    
            //     commit('setAuth', auth)
            }
        }
        
    });
}

export default createStore;