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
      <el-form-item label="Name" prop="name">
        <el-input v-model="form.name"></el-input>
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
    {{ form.name }} {{ form.status }}
  </div>
</template>

<script>
export default {
  layout: "admin",
  data() {
    return {
      labelPosition: "right",
      loading: 'false',
      form: {
        name: "",
        status: true,
      },
      rules: {
        name: [
          { required: true, message: "Kategori alanı gereklidir", trigger: "blur" },
          { min: 3, message: "Kategori 3 karakterden kısa olmamalıdır", trigger: "blur" }
        ]
      }
    };
  },

  methods : {
      mainPage() {
          this.$router.push('/admin');
      },
      async sendForm() {
        let valid = await this.$refs.form.validate();
            if (!valid) {
            return;
        }

        this.$axios.post('/categories/add', this.form).then((result) => {
            console.log(result);
            this.$message.success("Kayıt işlemi gerçekleşmiştir");
            this.form.name = '';
        })
        .catch((error) => {
            console.log(error);
        });
      }
  }
};
</script>

<style>
.el-form-item {
    margin-bottom: 7px;
}

.el-form-item__error {
    font-size: 11px;
    padding-top: 0px;
}
</style>