<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column fixed prop="createdAt" :formatter="changeDate" label="Tarih"></el-table-column>
      <el-table-column prop="c_id.name" label="Kategori"></el-table-column>
      <el-table-column prop="name" label="Soru"></el-table-column>
      <el-table-column fixed="right" label="Ayarlar" width="120">
        <template slot-scope="scope">
          <el-button type="text" @click="editClick(scope.row._id)" size="small">Düzenle</el-button>
          <el-button type="text" @click="deleteClick(scope.row._id)" size="small">Sil</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import moment from "moment";

export default {
  layout: "admin",
  data() {
    return {
      message: ""
    };
  },
  async asyncData(context) {
    try {
      // Eğer axios'a context dışında import ederek ulaşırsan api kısayollarını kullanamazsın.
      const _lists = await context.$axios.get("/questions");
      console.log(_lists.data);
      await context.store.commit("questions/SET_QUESTION", _lists.data);
      if (_lists) {
        return { tableData: context.store.getters["questions/allQuestions"] };
      }
    } catch (error) {
      console.log(error);
    }
  },

  methods: {
    changeDate(context, row, column) {
      return moment(row.createdAt).format("DD MMMM YYYY");
    },

    editClick(id) {
      if (id) {
        this.$router.push("/admin/questions/edit/" + id);
      }
    },

    deleteClick(id) {
      if (id) {
        this.$alert("Silmek istediğinize emin misiniz?", "Uyarı", {
          confirmButtonText: "Tamam",
          callback: action => {
            if (action === "confirm") {
              //TODO delete
              this.$store.commit("questions/REMOVE_QUESTION", id);
              this.$axios
                .get("/questions/delete/" + id)
                .then(result => {
                  console.log(result);
                })
                .catch(error => {
                  console.log(error);
                });
            }
          }
        }); // $alert
      }
    }
  }
};
</script>

<style scoped>
</style>