<template>
  <el-row>
    <el-col :span="12">
      <el-form-item label="Şık 1" prop="choice">
        <el-input v-model="form.name">
          <template slot="suffix">
            <el-radio v-model="form.radio"></el-radio>
          </template>
        </el-input>
      </el-form-item>
    </el-col>
  </el-row>
</template>

<script>
export default {
    props : {
        form: {
            type: Object,
            required: true,
            default: {
                name: 'Unknown',
                radio: false
            }
        }
    }
}
</script>