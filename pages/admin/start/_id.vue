<template>
  <el-row v-if="data">
    <el-col :span="20" :offset="2">
      <el-card :body-style="{ padding: '0px', width: '100%' }" shadow="hover">
        <div>
          <el-table :data="data.questions" style="width: 100%">
            <el-table-column fixed prop="name" label="Soru"></el-table-column>
            <el-table-column fixed="right" label="Ayarlar" width="260">
              <template slot-scope="scope">
                <el-button type="danger" v-if="showTime == scope.row._id" @click="setQuestion(scope.row, 'q_stop')" size="mini" plain >Yayında {{cloneTime}}</el-button>
                <el-button type="success" v-else :disabled="snozeTime" @click="setQuestion(scope.row, 'q_start')" size="mini" plain >Yayınla</el-button>
                <el-button type="warning" size="mini" v-if="showAnswer == scope.row._id" @click="setQuestion(scope.row, 'a_stop')" plain>Cevabı Gizle</el-button>
                <el-button type="warning" size="mini" v-else @click="setQuestion(scope.row, 'a_start')" plain>Cevabı Göster</el-button>
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
  layout: "admin",
  data() {
    return {
      quiz_id: null,
      time: 0,
      cloneTime: 0,
      showTime: false,
      snozeTime: false,
      showAnswer: false,
      data: null,
    };
  },

  mounted() {
    this.$nextTick(async () => {
      const id = this.$route.params.id;
      const _ = await this.$axios.get("/quizzes/getStart/" + id);
      this.data = _.data;
      this.time = _.data.time;
      this.quiz_id = id;
    });
  },

  methods: {
    setQuestion(data, action) {
        switch (action) {
            case 'q_start':
                this.sendID(data, action);
                this.cloneTime = data.time || this.data.time;
                this.showTime = data._id;
                this.showAnswer = false;
                this.snozeTime = true;
                hello = setInterval(() => {
                this.cloneTime--;
                if (this.cloneTime == 0) {
                    this.time = data.time || this.data.time;
                    this.snozeTime = false;
                    clearInterval(hello);
                }
                }, 1000);                
                break;
            
            case 'q_stop':
                clearInterval(hello);
                this.showTime = false;
                this.time = data.time || this.data.time;
                this.snozeTime = false;
                this.sendID(data, action);
                break;

            case 'a_start':
                clearInterval(hello);
                this.showTime = false;
                this.snozeTime = false;
                this.showAnswer = data._id;
                this.sendID(data, action);
                break;

            case 'a_stop':
                clearInterval(hello);
                this.showTime = false;
                this.showAnswer = false;
                this.time = data.time || this.data.time;
                this.snozeTime = false;
                this.sendID(data, action);
                break;

            default:
                break;
        }
    },

    sendID(data, action) {
      this.$socket.emit("newQuestion", { id: data._id, quiz_id: this.quiz_id, action: action });
    }
  }
};
</script>

<style>
</style>