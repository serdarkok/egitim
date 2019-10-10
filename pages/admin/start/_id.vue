<template>
<el-row v-if="data">
       <el-col :span="20" :offset="2">
        <el-card :body-style="{ padding: '0px', width: '100%' }" shadow="hover">
          <div>
            <el-table :data="data.questions" style="width: 100%">
            <el-table-column fixed prop="name" label="Soru"></el-table-column>
            <el-table-column fixed="right" label="Ayarlar" width="260">
                <template slot-scope="scope">
                <el-button type="danger" v-if="showTime == scope.row._id" @click="setTimeQuestion(scope.row._id, 'stop')" size="mini" plain>Yayında {{cloneTime}}</el-button>
                <el-button type="success" v-else :disabled="snozeTime" @click="setTimeQuestion(scope.row._id, 'start')" size="mini" plain>Yayınla</el-button>
                <el-button type="warning" size="mini" plain>Cevabı Göster</el-button>
                </template>
            </el-table-column>
            </el-table>     
          </div>
        </el-card>
      </el-col>
</el-row>      
</template>

<script>
let hello;
export default {
    layout: 'admin',
    data() {
        return {
            time: 0,
            cloneTime: 0,
            showTime: false,
            snozeTime: false,
            data: null,
        }
    },    
    
    mounted() {
        this.$nextTick( async () => {
            const id = this.$route.params.id;
            const _ = await this.$axios.get('/quizzes/getStart/'+id);
            this.data = _.data;
            this.time = _.data.time;
        });
    },

    methods: {
        setTimeQuestion(data, action) {
            if (action == "start") {
                    this.sendID(data);
                    this.cloneTime = this.data.time;
                    this.showTime = data;
                        hello = setInterval(() => {
                                this.cloneTime--;
                                if (this.cloneTime > 0) {
                                    this.snozeTime = true
                                }
                                else {
                                    this.time = this.data.time;
                                    this.snozeTime = false;
                                    clearInterval(hello);
                                }
                        }, 1000);
            }
            else {
                clearInterval(hello);
                this.showTime = false;
                this.time = this.data.time;
                this.snozeTime = false;
            }
        },

        sendID(id) {
            // customEmit(id);
            this.$socket.emit('newQuestion', id);
        },

    },
}
</script>

<style>

</style>