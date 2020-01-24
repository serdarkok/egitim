<template>
    <el-row>
        <el-col :sm="{span: 20, offset: 2}" :md="{span: 12, offset: 6}"  :lg="{span: 12, offset: 6}" :xs="{span: 22, offset: 1}" >
            <div class="question-wrap" v-loading="loading">
            <Question :q="this.q" v-if="q" @getRadio="getRadio"></Question>
            <Result v-else-if="a" :result="a" :userAnswer="answer.radio"></Result>
            <div class="wait-wrap" v-else>
                <div class="nb-spinner"></div>
                    <div class="please-wait" v-html="waitText"></div>
                </div>
            </div>
        </el-col>
    </el-row>
</template>

<script>
import {mapState} from 'vuex';
import Question from '@/components/frontend/question';
import Result from '@/components/frontend/result';
import Cookie from 'js-cookie';

export default {
    components: {Question, Result},
    middleware: [ 'controlLogin', 'isthereevent'],
    // middleware: 'isthereevent',
    data() {
        return {        
            q: null, // questions
            a: null, // answers
            loading: false,
            waitText: 'lütfen bekleyiniz, sorular karşınıza otomatik gelecektir',
            answer: { // kullanıcı cevap verdiğinde doldurulacak property
                user_id: null,
                radio: null,
                question_id: null,
                quiz_slug: this.$route.params.quiz,
            },
        }
    },

    sockets: {
        connect: function () {
            console.log(this.$socket.id);
            this.$socket.emit('joinRoom', this.$route.params.quiz);
            this.$store.dispatch('socket/addGuestCount');
        },
        disconnect: function () {
            console.log('BAGLANTI DUSTU');
        },
        reconnect: function () {
            this.$socket.emit('joinRoom', this.$route.params.quiz);
            console.log('TEKRAR RECONNECT OLDU...');
        }
    },

    async beforeCreate() {
        // console.log(this.$route.params.quiz);
    },

    async beforeMount() {
        // console.log(this.$route.params.quiz);
        await this.$socket.emit('joinRoom', this.$route.params.quiz);
        // this.questions = this.$store.getters['socket/allQuestion'];
    },

    computed: mapState('socket', ['question', 'result']),

    watch: {
        question(data) {
          if (Cookie.get('user_id')) {
            this.loading = true;
            setTimeout(() => {
                this.loading = false;
                this.q = data;
            }, 500);
          } else {
            this.waitText = `oturumunuz sonlanmış <br/> <a href="./login" type="warning">lütfen tekrar giriş yapınız</a>`;
            this.q = null;
          }
        },

        result(data) {
          if (Cookie.get('user_id')) {
            this.loading = true;
            setTimeout(() => {
                this.loading = false;
                this.a = data;
            }, 650);
          } else {
            this.waitText = `oturumunuz sonlanmış <br/> <a href="./login" type="warning">lütfen tekrar giriş yapınız</a>`;
            this.a = null;
          }
        }
    },

    methods: {
        getRadio(data) {
            this.answer.question_id = data.question_id;
            this.answer.radio = data.radio;
            this.answer.user_id = Cookie.get('user_id');
            this.answer.quiz_slug = this.$route.params.quiz;
            console.log(this.answer);
            this.$axios.post('/answers/add', this.answer).then((data) => {
                if (data.status) {
/*                     this.$message({
                    showClose: true,                        
                        type: 'success',
                        message: 'Cevabınızı kayıt edilmiştir.'
                    }); */
                }
            });
        }
    },
}
</script>

<style scoped>
    .question-wrap {
        min-height: 300px;
        background-color: #FFFFFF;
        border-radius: 12px;
        margin-top: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

.nb-spinner {
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    width: 60px;
    height: 60px;
    background: transparent;
    border-top: 4px solid #03A9F4;
    border-right: 4px solid transparent;
    border-radius: 50%;
    -webkit-animation: 1s spin linear infinite;
    animation: 1s spin linear infinite;
}
    
@-webkit-keyframes spin {
    from {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    to {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}
          
@keyframes spin {
    from {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    to {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}

    .please-wait {
        position: relative;
        display: block;
        margin-top: 10px;
        text-align: center;
    }
</style>