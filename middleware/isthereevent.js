const Cookie = require('js-cookie');

const isThereEvent = async function(context) {
    let _slug = context.route.params.quiz;
    try {
        const _ = await context.$axios.get('/quizzes/getQuizBySlug/' + _slug);
        if (_.data.status == false) {
            process.server? context.redirect('/404'): context.$router.push('/404');
        } else if(_.data.status == true) {
            context.app.$cookies.set('time', _.data.data.time);
        }
    } catch (error) {
        console.log(error);
    }
};

export default isThereEvent;