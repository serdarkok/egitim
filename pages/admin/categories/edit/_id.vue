<template>
  <div>
  <div>
    <el-form label-width="100px" >
      <el-form-item label="Name" prop="name">
        <el-input v-model="form.data.name"></el-input>
      </el-form-item>
      <el-form-item label="Aktif mi?">
        <el-checkbox-group v-model="form.data.status">
          <el-checkbox name="type" v-model="form.data.status"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" plain submit>Kaydet</el-button>
        <el-button type="warning" size="small" plain>İptal</el-button>
      </el-form-item>
    </el-form>
    {{ form.name }} {{ form.status }}
  </div>
  </div>
</template>

<script>
export default {
    layout : 'admin',
    data() {
        return {
            form: '',
        }
    },

    mounted(context) {
        const _id = this.$route.params.id
        if (_id) {
            this.$axios.get('/categories/' + _id).then((result) => {
                this.form = result.data;
                console.log(this.form.data);
            });
        }
    }
}
</script>

<style>

</style>