<template>
  <div v-if="form">
    <el-form
    label-width="100px"
    :model="form"
    :rules="rules"
    ref="form"
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
        <el-button type="primary" @click="editCategory" size="small" plain submit>Güncelle</el-button>
        <el-button type="warning" @click="mainPage" size="small" plain>İptal</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
    layout : 'admin',
    data() {
        return {
            form: '',
            rules: {
              name : [
                { required: true, message: "Kategori alanı gereklidir", trigger: "blur" },
                { min: 3, message: "Kategori 3 karakterden kısa olmamalıdır", trigger: "blur" }
              ]
            }
        }
    },

    async mounted() {
        const _id = this.$route.params.id
        if (_id) {
            const _result = await this.$axios.get('/categories/' + _id);
              if (_result) {
                this.form = _result.data.data;
              }
        }
    },

    methods : {
      mainPage() {
        this.$router.push('/admin');
      },

      async editCategory() {
        // Validation
        const valid = await this.$refs.form.validate();
            if (!valid) {
            return;
        }
        const _ = await this.$axios.post('/categories/edit', this.form);
        if (_.status === 200) {
          this.$message({
            type: 'success',
            message: 'Güncelleme işlemi gerçekleşmiştir'
        });
        // redirect main page
        this.mainPage();
        }
      },
    }
}
</script>

<style>

</style>