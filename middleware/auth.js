const _verifyUser = ({store, redirect} ) => {

    const _auth = store.state.auth.user.auth;

    // console.log(process.server);
    // console.log('Auth: ' + JSON.stringify(_auth));

    if (!_auth) {
        return redirect ('/');
    }

}

export default _verifyUser;