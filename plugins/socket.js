import Vue from 'vue';
import VueSocketIO from 'vue-socket.io';

export default function({store}) {
    Vue.use(new VueSocketIO({
        debug: false,
        connection: 'http://'+process.env.BASE_URL+':'+process.env.PORT,
        vuex: {
            store,
            actionPrefix: 'SOCKET_',
            mutationPrefix: 'SOCKET_'
        },
        // options: { path: "/my-app/" } //Optional options
    }));
}