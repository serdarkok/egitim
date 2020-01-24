import vuex from 'vuex';
import auth from './auth';
import user from './user';
import categories from './categories';
import questions from './questions';
import quizzes from './quizzes';
import socket from './socket';
import axios from '@nuxtjs/axios';

const createStore = () => {
    return new vuex.Store({
        modules: {
            auth: auth,
            user: user,
            categories: categories,
            questions: questions,
            quizzes: quizzes,
            socket: socket,
        },

        actions : {
             async nuxtServerInit({ dispatch }, { req }){
/*                // process.server?console.log('Nuxtserverinit Server Tarafı'):console.log('Nuxtserverinit Client Tarafı');

                let {user} = '';
                if (req.headers.cookie) {
                    try {
                        user = { token: req.headers.cookie.split(';').find(c => c.trim().startsWith('token=')).substr(6) }
                    } catch (err) {
                        console.log(err);
                    }
                }
                // await dispatch('auth/verifyToken', user); */
                console.log(req.header.url);
                console.log('Original URL: ' + req);

                // axios.get('')
            } 
        }
        
    });
}

export default createStore;