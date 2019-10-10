<template>
    <el-row>
        <el-col :sm="{span: 20, offset: 2}" :md="{span: 12, offset: 6}"  :lg="{span: 12, offset: 6}" :xs="{span: 22, offset: 1}">
            <el-card :body-style="{ padding: '0px' }" class="mt-5" shadow="hover">
                <div slot="header">
                    <span>Soru Modülü</span>
                </div>
                <div class="question-wrap">
                    <div class="question">
                    Soru: {{ questions }}
                    </div>
                    <el-radio-group v-model="radio" fill="#007A2C" class="choices-wrap" size="medium">                        
                        <!-- <el-row v-for="(item, index) in todos.choices" :key="index">
                            <el-radio :label="item.dummy_id" border>{{item.name}}</el-radio>
                        </el-row> -->
                    </el-radio-group>
                </div>
            </el-card>            
        </el-col>
    </el-row>
</template>

<script>
// import io from 'socket.io-client'

export default {
    data() {
        return {
            questions: null,
            radio: null,
        }
    },

    sockets: {
        connect: function () {
            console.log(this.$socket.id);
        },
        customEmit: function (data) {
            console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
        }
    },  

    async beforeMount() {
        // console.log(this.$route.params.quiz);
        await this.$socket.emit('joinRoom', this.$route.params.quiz);
        // this.questions = this.$store.getters['socket/allQuestion'];
    },

    // mounted() {
    //     // this.socket = io();
    //     console.log('mounted tetiklendi');
    //     // this.socket.join(this.$route.params.quiz);
    //     this.$socket.on('sendQuestion', function(result) {
    //         console.log('tetiklendi');
    //         this.questions = result;
    //     });
    // }


    // computed: {
    //     todos() {
    //         return this.$socket.on('sendQuestion');
    //     }
    // }

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