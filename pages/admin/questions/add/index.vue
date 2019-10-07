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
        action="/api/questions/add/photo"
        :before-upload="beforeAvatarUpload"
        ref="upload"
        name="Photo"
        :show-file-list="true"
        :on-success="handleAvatarSuccess">
        <el-button size="mini" type="primary" icon="el-icon-upload2" plain>bilgisayardan yükle</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">upload to server</el-button>
        <div slot="tip" class="el-upload__tip">jpg/png/gif yüklenebilir</div>
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>        
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
    {{ form.fileList }}
  </div>
</template>

<script>
import Choice from '@/components/questions/Choice';

export default {
  layout: "admin",
  data() {
    return {
      imageUrl: '',
      labelPosition: "right",
      loading: "false",
      categories : '',
      form: {
        file: '',
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
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      })
    },

    submitUpload() {
        this.$refs.upload.submit();
    },

      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
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
      }

  },

    async mounted() {
      const _ = await this.$axios.get('/categories');
      this.categories = _.data;
  }
};
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>