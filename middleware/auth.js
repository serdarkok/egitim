const _verifyUser = ({store, redirect} ) => {

    const _auth = store.state.auth.user.auth;

    if(req.headers.cookie){
        const parsedCookie = cookieparser.parse(req.headers.cookie)

        try {
            token = JSON.parse(parsedCookie.token)
        } catch(err){

        }
    }

    // console.log(process.server);
    // console.log('Auth: ' + JSON.stringify(_auth));

    if (!_auth) {
        return redirect ('/');
    }

}

export default _verifyUser;