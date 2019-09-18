const Cookie = require('js-cookie');

const _verifyUser = (context, { redirect }) => {

    // const _auth = store.state.auth.user.auth;
    let token = null;
    
/*     const _status = context.store.state.auth.user.auth;
    console.log('_status confirm: ' + _status); */
/*     if (!_status) {
        Cookie.remove('token');
        return redirect('/');
    } */

    process.server ? console.log('Burası server') : console.log('Burası client');
    if (process.server) {
        token = { token: context.req.headers.cookie.split(';').find(c => c.trim().startsWith('token=')).substr(6) }
    }
    else {
        token = { token: Cookie.get('token') }
    }
    
    context.app.$axios.post('/verifyToken', token).then((result)=> {
        context.store.commit('auth/CHANGE_AUTH', result.data);
    });
}

export default _verifyUser;