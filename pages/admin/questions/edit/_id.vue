<template>
  <div v-if="form">
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
          :show-file-list="true"
          :on-error="photoError"
          :file-list="uploaded_photo"
          :limit="1">
          <i class="el-icon-plus"></i>
          <div slot="tip" class="el-upload__tip">jpg/png/gif uzantılı resim yüklenebilir.</div>
        </el-upload> 
         <el-dialog v-model="dialogVisible" size="tiny">
          <img width="100%" :src="dialogImageUrl" alt>
        </el-dialog>
      </el-form-item>
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
        <el-select v-model="form.c_id._id" placeholder="Seçiniz">
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
        <el-button type="primary" @click="sendForm" size="small" plain submit>Kaydet</el-button>
        <el-button type="warning" @click="mainPage" size="small" plain>İptal</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Choice from '@/components/admin/questions/Choice';

export default {
    layout : 'admin',
    components: { Choice },
    data() {
        return {
            dialogImageUrl: '',
            dialogVisible: true,          
            labelPosition: "right",
            loading: "false",
            categories : '',
            uploaded_photo: [],
            form: '',
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
        }
    },

    async mounted() {
        const _id = this.$route.params.id
        if (_id) {
            const _result = await this.$axios.get('/questions/' + _id);
              if (_result) {
                this.form = _result.data.data;
                if (this.form.photo) {
                  const _ = {
                    name: this.form.photo,
                    url: '/uploads/'+this.form.photo
                  };
                  
                  this.uploaded_photo.push(_);
                  this.dialogVisible = true;
                }
              }
        }
      const _ = await this.$axios.get('/categories');
      this.categories = _.data;
    },

    methods : {
        // Seçenek ekler
        addChoice(data) {
        this.form.choices.push({dummy_id: String(this.form.choices.length + 1), name: '', correct: false});
        },

        mainPage() {
            this.$router.push('/admin/questions');
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

        async sendForm() {
        // Validation
        const valid = await this.$refs.form.validate();
            if (!valid) {
            return;
        }
        console.log(this.form);
        const _ = await this.$axios.post('/questions/edit', this.form);
        if (_.status === 200) {
          this.$message({
            type: 'success',
            message: 'Güncelleme işlemi gerçekleşmiştir'
        });
        // redirect main page
        this.mainPage();
        }
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
        this.form.photo = null;
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
    }
}
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
}
</style>