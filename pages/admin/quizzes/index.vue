<template>
    <div>
        <el-table :data="tableData" style="width: 100%">
        <el-table-column fixed prop="start.date" :formatter="changeDate" label="Başlangıç Tarihi"></el-table-column>
        <el-table-column fixed prop="finish.date" :formatter="changeDate" label="Bitiş Tarihi"></el-table-column>
        <el-table-column prop="name" label="Quiz Adı"></el-table-column>
        <el-table-column label="Durumu">
            <template slot-scope="scope">
            <el-tag v-if="scope.row.status == false " type="danger" size="mini">Kapalı</el-tag>
            <el-tag v-else type="success" size="mini">Açık</el-tag>
            </template>
        </el-table-column>
        <el-table-column fixed="right" label="Ayarlar" width="180">
            <template slot-scope="scope">
            <el-button type="text" size="small">Soru Ekle</el-button>
            <el-button type="text" size="small">Düzenle</el-button>
            <el-button type="text" size="small">Sil</el-button>
            </template>
        </el-table-column>
        </el-table>
    </div>
</template>

<script>
import moment from "moment";
export default {
    layout: 'admin',
    data() {
        return {
            tableData: ''
        }
    },
    async asyncData(context) {
        try {
          const _lists = await context.$axios.get('/quizzes');
        
          if (_lists) {
              return { tableData : _lists.data }
          }
        } catch (error) {
            console.log(error);
        }
    },

    methods: {
        changeDate(context, row, column) {
        return moment(column).format("DD MMMM YYYY hh:mm");
        },
    }
}
</script>

<style>

</style>