<template>
  <div>
    <el-form :label-position="labelPosition" label-width="100px">
      <el-form-item label="Soru">
        <el-input
          type="textarea"
          :autosize="{ minRows: 3, maxRows: 10}"
          maxlength="500"
          show-word-limit
          v-model="form.desc"
        ></el-input>
      </el-form-item>
        <Choice form="form.choice"></Choice>
      <el-form-item label="Aktif mi?">
        <el-checkbox-group v-model="form.status">
          <el-checkbox name="type" v-model="form.status"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" plain submit>Kaydet</el-button>
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
      form: {
        name: "",
        choice: {
            name: 'Denee pşs',
            radio: false,
        },
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
  components: { Choice }
};
</script>

<style>
</style>