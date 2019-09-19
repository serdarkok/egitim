const Cookie = require('js-cookie');

const _verifyUser = (context) => {

    // const _auth = store.state.auth.user.auth;
    let token = null;
    
    process.server ? console.log('Burası server') : console.log('Burası client');
    if (!process.server) {
        token = { token: Cookie.get('token') }
        // console.log(token);
        context.app.$axios.post('/verifyToken', token).then(async (result)=> {
            const aci = await context.store.commit('auth/CHANGE_AUTH', result.data);
        });
    }

    const _status = context.store.state.auth.user.auth;
    console.log('_status confirm: ' + _status);

    if (!_status) {
        console.log('Cookie silinecek');
        // Cookie.remove('token');
        process.server ? context.app.$cookies.removeAll() : this.$cookies.remove('token');;
        return context.redirect('/');
    }
}

export default _verifyUser;