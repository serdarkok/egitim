const Cookie = require('js-cookie');
let user_id = null;

const controlLogin = function(context) {

    if (!process.server) {
        user_id = Cookie.get('user_id');
        if (!user_id) {
            
        }        
    } else
    {
        console.log();
        const url = context.req.headers.host + '/' + context.params.quiz;
        user_id = context.app.$cookies.get('user_id');
        if (!user_id) {
            return context.redirect(url+'/login');
        }
    }

}

export default controlLogin;