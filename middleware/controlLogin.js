const controlLogin = async function(context) {
    if (process.server)
    {
        const _data = {
            _id: context.app.$cookies.get('user_id'),
            event: context.params.quiz
        }
        
        // URL Oluşturuldu
        const url = context.req.headers.host + '/' + context.params.quiz;

        if(_data._id != undefined) {

            const _result = await context.$axios.post('/guests/guestControl', _data);

            if(_result.data.length < 1) {
                context.app.$cookies.remove('user_id');
                return context.redirect(url+'/login');
            }

        } else {
            return context.redirect(url+'/login');
        }

    }

}

export default controlLogin;