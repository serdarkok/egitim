<template>
  <div>
    <el-form :label-position="labelPosition" label-width="100px">
      <el-form-item label="Soru">
        <el-input
          type="textarea"
          :autosize="{ minRows: 3, maxRows: 10}"
          maxlength="500"
          show-word-limit
          v-model="form.name"
        ></el-input>
      </el-form-item>
      <Choice :choices="form.choices" @addChoice="addChoice" @removeChoice="removeChoice" @selectRadio="selectRadio"></Choice>
      <el-form-item label="Kategori">
        <el-select v-model="form.c_id" placeholder="Seçiniz">
          <el-option
            v-for="item in categories"
            :key="item._id"
            :label="item.name"
            :value="item._id"
            >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Aktif mi?">
        <el-checkbox-group v-model="form.status">
          <el-checkbox name="type" v-model="form.status"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="sendForm" plain submit>Kaydet</el-button>
        <el-button type="warning" size="small" plain>İptal</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Choice from '@/components/questions/Choice';

export default {
  layout: "admin",
  data() {
    return {
      labelPosition: "right",
      loading: "false",
      categories : '',
      form: {
        name: "",
        c_id:"",
        choices: [
          {id: '1', name: '', radio: false},
          {id: '2', name: '', radio: false},
        ],
        status: true,
      },
      rules: {
        name: [
          {
            required: true,
            message: "Kategori alanı gereklidir",
            trigger: "blur"
          },
          {
            min: 3,
            message: "Kategori 3 karakterden kısa olmamalıdır",
            trigger: "blur"
          }
        ]
      }
    };
  },
  components: { Choice },

  methods : {
    // Seçenek ekler
    addChoice(data) {
      this.form.choices.push({id: String(this.form.choices.length + 1), name: '', radio: false});
    },

    // Seçenek kaldırır
    removeChoice(data) {
      // Choice.vue'den gelen index sayısına göre silme yapar
      this.form.choices.splice(data, 1);
      // this.form.choice array'i içerisindeki id'yi tekrar sıralar 1234...
      const _ = this.form.choices.map((obj, index) => ({id : String(index + 1), name: obj.name, radio: obj.radio }));
      this.form.choices = _;
    },

    // Şıklardan sadece 1 tanesi doğru olabilir
    selectRadio(i, result) {
        // Choice componentinden gelen switch true ya da false'i aşağıdaki if'e girerek choice array'i içindeki objeleri değiştirir.
        const _ = this.form.choices.map((obj, index) => {
          if (index === i && result === true) {
            obj.radio = result
          }
          else if (index != i && result === false) {
            obj.radio = result
          }
          else {
            obj.radio = false;
          }
          return obj;
        })
        this.form.choices = _;
    },

    sendForm() {
      this.$axios.post('/questions/add', this.form).then((result) => {
        console.log(result);
      })
      // console.log(this.form);
    }
  },

    async mounted() {
      const _ = await this.$axios.get('/categories');
      this.categories = _.data;
  }
};
</script>

<style>
</style>