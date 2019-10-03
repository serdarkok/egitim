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
            <el-button type="text" @click="addQuestions(scope.row.id)" size="small">Soru Ekle</el-button>
            <el-button type="text" @click="editQuiz(scope.row._id)" size="small">Düzenle</el-button>
            <el-button type="text" @click="deleteClick(scope.row._id)" size="small">Sil</el-button>
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
            await context.store.commit("quizzes/SET", _lists.data);
        
          if (_lists) {
              return { tableData : context.store.getters["quizzes/allQuizzes"] }
          }
        } catch (error) {
            console.log(error);
        }
    },

    methods: {
        changeDate(context, row, column) {
        return moment(column).format("DD MMMM YYYY hh:mm");
        },

        editQuiz(data) {
            this.$router.push('/admin/quizzes/edit/'+data);
        },

        deleteClick(id) {
            if (id) {
                this.$alert('Silmek istediğinize emin misiniz?', 'Uyarı', {
                    confirmButtonText: 'Tamam',
                    callback: action => {
                        if (action === 'confirm') {
                        //TODO delete
                            this.$store.commit("quizzes/REMOVE", id);
                            this.$axios.delete('/quizzes/delete?id='+id).then((result) => {
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                        }
                    }
                }); // $alert
            }
        },

        addQuestions(id) {
            this.$router.push('/admin/quizzes/addquestion');
        }
    }
}
</script>

<style>

</style>