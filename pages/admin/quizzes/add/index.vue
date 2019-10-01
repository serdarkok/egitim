<template>
    <el-form
    :model="form"
    :label-position="labelPosition" 
    label-width="100px" 
    >
    {{ questions }}
      <el-form-item label="Quiz Adı" prop="name">
          <el-input v-model="form.name" placeholder="İsim"></el-input>
      </el-form-item>
      <el-form-item label="Soru Süresi" prop="name">
          <el-input-number v-model="form.time" :min="0" :max="100" size="small" :step="5"></el-input-number>
      </el-form-item>
      <el-form-item label="Başla">
        <el-date-picker
            v-model="form.start.date"
            type="date"
            format="dd.MM.yyyy"
            value-format="timestamp"
            placeholder="Tarihi"
            firstDayOfWeek="3"
            >
        </el-date-picker>
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
            <el-form-item label="Bitiş">
        <el-date-picker
            v-model="form.finish.date"
            type="date"
            format="dd.MM.yyyy"
            value-format="timestamp"
            placeholder="Tarihi"
            firstDayOfWeek="3"
            >
        </el-date-picker>
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
      <el-form-item label="Kategori Seç">
        <el-select v-model="form.category" placeholder="Select">
            <el-option
                v-for="item in questions"
                :key="item._id"
                :label="item.name"
                :value="item._id">
            </el-option>
        </el-select>
      </el-form-item>
    </el-form>
</template>

<script>
export default {
    layout: 'admin',
    data() {
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
            questions: []
        }
    },

    async mounted() {
      const _ = await this.$axios.get('/questions');
      this.questions = _.data;
    }
}
</script>

<style>

</style>