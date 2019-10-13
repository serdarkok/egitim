<template>
  <div>
    <el-form 
    :label-position="labelPosition" 
    label-width="100px" 
    :model="form"
    :rules="rules"
    ref="form"
    @submit.native.prevent="sendForm"
    >
      <el-form-item label="Resim">
      <el-upload
        class="upload-demo"
        list-type="picture-card"
        action="/api/questions/add/photo"
        :on-remove="photoRemove"
        :on-success="photoSuccess"
        name="photo"
        :on-error="photoError"
        :limit="1">
        <i class="el-icon-plus"></i>
        <div slot="tip" class="el-upload__tip">jpg/png/gif uzantılı resim yüklenebilir.</div>
      </el-upload> 
      <el-dialog v-model="dialogVisible" size="tiny">
        <img width="100%" :src="dialogImageUrl" alt>
      </el-dialog>
      </el-form-item>
      <el-form-item label="Soru" prop="name">
        <el-input
          type="textarea"
          :autosize="{ minRows: 3, maxRows: 10}"
          maxlength="500"
          show-word-limit
          v-model="form.name"
        ></el-input>
      </el-form-item>
      <Choice :choices="form.choices" @addChoice="addChoice" @removeChoice="removeChoice" @selectRadio="selectRadio"></Choice>
      <el-form-item label="Kategori" prop="c_id">
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
      <el-form-item label="Aktif mi?" class="mt-2">
        <el-checkbox-group v-model="form.status">
          <el-checkbox name="type" v-model="form.status"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="sendForm" plain submit>Kaydet</el-button>
        <el-button type="warning" size="small" @click="mainPage" plain>İptal</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Choice from '@/components/admin/questions/Choice';

export default {
  layout: "admin",
  data() {
    return {
      labelPosition: "right",
      loading: "false",
      categories : '',
      dialogImageUrl: '',
      dialogVisible: false,
      form: {
        photo: '',
        name: '',
        c_id: '',
        choices: [
          {dummy_id: '1', name: null, correct: false},
          {dummy_id: '2', name: null, correct: false},
        ],
        status: true,
      },
      rules: {
        name: [
          {
            required: true,
            message: "Soru alanı gereklidir",
            trigger: "blur"
          },
          {
            min: 3,
            message: "Soru 3 karakterden kısa olmamalıdır",
            trigger: "blur"
          }
        ],
        c_id: [ {required: true, message: "Bir kategori seçmelisiniz", trigger: "blur"} ],
      }
    };
  },
  components: { Choice },

  methods : {
    // Seçenek ekler
    addChoice(data) {
      this.form.choices.push({dummy_id: String(this.form.choices.length + 1), name: '', correct: false});
    },

    // Seçenek kaldırır
    removeChoice(data) {
      // Choice.vue'den gelen index sayısına göre silme yapar
      this.form.choices.splice(data, 1);
      // this.form.choice array'i içerisindeki id'yi tekrar sıralar 1234...
      const _ = this.form.choices.map((obj, index) => ({dummy_id : String(index + 1), name: obj.name, correct: obj.correct }));
      this.form.choices = _;
    },

    // Şıklardan sadece 1 tanesi doğru olabilir
    selectRadio(i, result) {
        // Choice componentinden gelen switch true ya da false'i aşağıdaki if'e girerek choice array'i içindeki objeleri değiştirir.
        const _ = this.form.choices.map((obj, index) => {
          if (index === i && result === true) {
            obj.correct = result
          }
          else if (index != i && result === false) {
            obj.correct = result
          }
          else {
            obj.correct = false;
          }
          return obj;
        })
        this.form.choices = _;
    },

    mainPage() {
      this.$router.push('/admin/questions');
    },

    async sendForm() {
      const valid = await this.$refs.form.validate();
        if (!valid) {
          return;
      }

      console.log(this.form);
      this.$axios.post('/questions/add', this.form).then((result) => {
        if (result.status === 200) {
            this.$message({
              type: 'success',
              message: 'Kayıt işlemi gerçekleşmiştir'
            });
            // redirect main page
            this.mainPage();
        }
      })
      .catch((error) => {
        console.log(error);
      })
    },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('Avatar picture must be JPG format!');
        }
        if (!isLt2M) {
          this.$message.error('Avatar picture size can not exceed 2MB!');
        }
        return isJPG && isLt2M;
      },

      photoRemove(file, fileList) {
        this.$axios.delete('/questions/add/photo?photo='+this.form.photo);
      },

      photoPictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },

      photoError(err, file) {
        this.$alert("Yükleme sırasında hata oluştu. Aynı isimde dosya sunucuda mevcut olabilir, lütfen kontrol ediniz!", "Uyarı", {
        confirmButtonText: "Anladım",
        });
      },    
      
      photoSuccess(res, file) {
        this.form.photo = res.file;
      },

  },

    async mounted() {
      const _ = await this.$axios.get('/categories');
      this.categories = _.data;
  }
};
</script>

<style>
.el-upload--picture-card {
  width: 100px;
  height: 100px;
  line-height: 110px;
}

.el-upload-list--picture-card .el-upload-list__item {
    width: 100px;
  height: 100px;
  line-height: 96px;
}
</style>