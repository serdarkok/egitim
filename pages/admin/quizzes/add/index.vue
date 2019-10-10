<template>
    <el-form
    :model="form"
    :label-position="labelPosition" 
    label-width="100px" 
    :rules="rules"
    ref="form"
    >
      <el-form-item label="Quiz Adı" prop="name">
          <el-input v-model="form.name" placeholder="İsim"></el-input>
      </el-form-item>
      <el-form-item label="Takma Ad" prop="slug">
          <el-input v-model="form.slug" placeholder="Takma Ad" @keypress.native="isAlfa">
            <template slot="prepend">http://poly.me/</template>
          </el-input>
      </el-form-item>
      <el-form-item label="Süresi" prop="time">
          <el-input-number v-model="form.time" :min="0" :max="100" size="small" :step="5"></el-input-number>
      </el-form-item>
      <el-row>
        <el-divider content-position="left">Başlangıç Tarih ve Saati</el-divider>
      <el-col :span="7">
        <el-form-item label="Tarih" prop="start.date">
            <el-date-picker
                v-model="form.start.date"
                type="date"
                format="dd.MM.yyyy"
                value-format="yyyy-MM-dd"
                placeholder="Tarihi"
                firstDayOfWeek="3"
                >
            </el-date-picker>
            </el-form-item>
      </el-col>
      <el-col :span="10">
        <el-form-item label="Saat" prop="start.time">
        <el-time-select
            placeholder="Saati"
            v-model="form.start.time"
            :picker-options="{
                start: '08:30',
                step: '00:15',
                end: '22:30'
            }"
        >
        </el-time-select>
      </el-form-item>
      </el-col>
    </el-row>
      <el-row>
        <el-divider content-position="left">Bitiş Tarih ve Saati</el-divider>
      <el-col :span="7">
        <el-form-item label="Tarih" prop="finish.date">
            <el-date-picker
                v-model="form.finish.date"
                type="date"
                format="dd.MM.yyyy"
                value-format="yyyy-MM-dd"
                placeholder="Tarihi"
                firstDayOfWeek="3"
                >
            </el-date-picker>
            </el-form-item>
      </el-col>
      <el-col :span="10">
        <el-form-item label="Saat" prop="finish.time">
        <el-time-select
            placeholder="Saati"
            v-model="form.finish.time"
            :picker-options="{
                start: '08:30',
                step: '00:15',
                end: '22:30'
            }"
        >
        </el-time-select>
      </el-form-item>
      </el-col>
    </el-row>
    <el-row>
        <el-form-item>
            <el-button type="primary" size="small" @click="sendForm" plain submit>Kaydet</el-button>
            <el-button type="warning" size="small" @click="mainPage" plain>İptal</el-button>
        </el-form-item>
    </el-row>
    </el-form>
</template>

<script>
export default {
    layout: 'admin',
    data() {
        // Bu kısım custom validation kısmıdır. Bitiş tarihini başlangıç tarihine göre kıyaslayarak uyarı verir
        var validatePass = (rule, value, callback) => {
            if (value == '') {
                callback(new Error('Bitiş tarihi girmelisiniz'));
            } else if (value < this.form.start.date) {
            callback(new Error('Başlangıç tarihinden sonra olmalıdır'));
            } else {
                callback();
            }
        };
        return {
            labelPosition: 'right',
            form: {
                time: '',
                name: '',
                start: {
                    date: '',
                    time: ''
                },
                finish: {
                    date: '',
                    time: ''
                }
            },
            rules: {
                name: [
                {
                    required: true,
                    message: "Quiz Adı alanı gereklidir",
                    trigger: "blur"
                },
                {
                    min: 3,
                    message: "Soru 3 karakterden kısa olmamalıdır",
                    trigger: "blur"
                }
                ],
                time: [
                    {type: 'number', min: 5, message: "Süre en az 5 saniye olmalıdır", trigger: "change"}
                    ],
                start: {
                    date: [{required: true, message: "Başlangıç tarihi girmelisiniz"}],
                    time: [{required: true, message: "Başlangıç saati girmelisiniz"}],
                },
                finish: {
                    date: [{required: true, validator: validatePass, trigger: "blur"}],
                    time: [{required: true, message: "Bitiş saati girmelisiniz"}]
                },
                slug : {
                    required: true,
                    message: "Takma ad girmelisiniz.",
                    trigger: "blur"
                },

            }
        }
    },

    async mounted() {
    },

    methods : {
    mainPage() {
      this.$router.push('/admin/quizzes');
    },

    // Sadece latin harfleri çalıştırır
    isAlfa($event) {
        // console.log($event.keyCode); //keyCodes değeri gösterir
        let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
        if (keyCode > 31 && (keyCode < 65 || keyCode > 90) && (keyCode < 97 || keyCode > 122)) { // 46 is dot
            $event.preventDefault();
        }
    },

    async sendForm() {
       const valid = await this.$refs.form.validate();
        if (!valid) {
          return;
      }
      this.$axios.post('/quizzes/add', this.form).then((result) => {
        this.$message({
          type: 'success',
          message: 'Kayıt işlemi gerçekleşmiştir'
        });
        this.$router.push('/admin/quizzes');
      })
      .catch((error) => {
        console.log(error);
      });
    },

  },
    }
</script>

<style>

</style>