<template>
    <el-row>
        <el-col :sm="{span: 20, offset: 2}" :md="{span: 12, offset: 6}"  :lg="{span: 12, offset: 6}" :xs="{span: 22, offset: 1}" >
            <div class="question-wrap" v-loading="loading">
            <Question :q="this.q" v-if="q"></Question>
            <div class="wait-wrap" v-else>
                <div id="loader">
                    <div id="top"></div>
                    <div id="bottom"></div>
                    <div id="line"></div>
                </div>
                <div class="please-wait">lütfen soru için <br/> bekleyiniz</div>
            </div>
            </div>
        </el-col>
    </el-row>
</template>

<script>
// import io from 'socket.io-client'
import {mapState} from 'vuex';
import Question from '@/components/frontend/question';

export default {
    components: {Question},
    data() {
        return {
            q: null,
            loading: false,
        }
    },

    sockets: {
        connect: function () {
            console.log(this.$socket.id);
        }
    },  

    async beforeMount() {
        console.log(this.$route.params.quiz);
        await this.$socket.emit('joinRoom', this.$route.params.quiz);
        // this.questions = this.$store.getters['socket/allQuestion'];
    },

    computed: mapState('socket', ['question']),

    watch: {
        question(data) {
            this.loading = true;
            setTimeout(() => {
                this.loading = !this.loading;
                this.q = data;
            }, 650);
        }
    }

}
</script>

<style scoped>
    .question-wrap {
        min-height: 300px;
        background-color: #FFFFFF;
        border: 1px solid #DFDFDF;
        border-radius: 12px;
        margin-top: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    #loader {
    animation: loader 5s cubic-bezier(.8,0,.2,1) infinite;
    height: 40px;
    width: 41px;
    position: absolute;
    top:calc(50% - 50px);
    left:calc(50% - 20px);
    }
    @keyframes loader {
    90% { transform: rotate(0deg); }
    100% { transform: rotate(180deg); }
    }
    #top {
    animation: top 5s linear infinite;
    border-top: 20px solid #EBEEF5;
    border-right: 20px solid transparent;
    border-left: 20px solid transparent;
    height: 0px;
    width: 1px;
    transform-origin: 50% 100%;
    }
    @keyframes top {
    90% { transform: scale(0); }
    100% { transform: scale(0);}
    }
    #bottom {
    animation: bottom 5s linear infinite;
    border-right: 20px solid transparent;
    border-bottom: 20px solid #EBEEF5;
    border-left: 20px solid transparent;
    height: 0px;
    width: 1px;
    transform: scale(0);
    transform-origin: 50% 100%;
    }
    @keyframes bottom {
    10% { transform: scale(0); }
    90% { transform: scale(1); }
    100% { transform: scale(1); }
    }
    #line {
    animation: line 5s linear infinite;
    border-left: 1px dotted #EBEEF5;
    height: 0px;
    width: 0px;
    position: absolute;
    top: 20px;
    left: 20px;
    }
    @keyframes line {
    10% { height: 20px; }
    100% { height: 20px; }
    }
    .please-wait {
        position: relative;
        display: block;
        text-align: center;
    }
</style>