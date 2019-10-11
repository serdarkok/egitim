<template>
    <el-row>
        <el-col :sm="{span: 20, offset: 2}" :md="{span: 12, offset: 6}"  :lg="{span: 12, offset: 6}" :xs="{span: 22, offset: 1}">
            <el-card :body-style="{ padding: '0px' }" class="mt-5" shadow="hover" v-loading="loading">
                <div slot="header">
                    <span>Soru Modülü</span>
                </div>
                <div class="question-wrap" v-if="q">
                    <div class="question">
                    Soru: {{ q.name }}
                    </div>
                    <el-radio-group v-model="radio" fill="#007A2C" class="choices-wrap" size="medium">                        
                        <el-row v-for="(item, index) in q.choices" :key="index">
                            <el-radio :label="item.dummy_id" border>{{item.name}}</el-radio>
                        </el-row>
                    </el-radio-group>
                </div>
            </el-card>            
        </el-col>
    </el-row>
</template>

<script>
// import io from 'socket.io-client'
import {mapState} from 'vuex';

export default {
    data() {
        return {
            radio: null,
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
        // console.log(this.$route.params.quiz);
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
    padding: 10px;
    font-size: 16px;
}

.question-wrap .question {
    font-weight: 700;
    margin-bottom: 15px;    
}

.choices-wrap {
    margin-left: 10px;
    font-size: 19px;
}

.choices-wrap .el-row {
    margin-bottom: 20px;
}
</style>