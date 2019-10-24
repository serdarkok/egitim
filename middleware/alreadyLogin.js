const Cookie = require('js-cookie');
let user_id = null;

const alreadyLogin = function(context) {
    const url = context.req.originalUrl;
    if (!process.server) {
        user_id = Cookie.get('user_id');
        if (!user_id) {
            
        }        
    } else
    {
        user_id = context.app.$cookies.get('user_id');
        if (!user_id) {
            return context.redirect(url);
        } else {
            return context.redirect('./');
        }
    }
}


export default alreadyLogin;