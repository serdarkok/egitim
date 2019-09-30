<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column fixed prop="createdAt" :formatter="changeDate" label="Tarih"></el-table-column>
      <el-table-column prop="c_id.name" label="Kategori"></el-table-column>
      <el-table-column prop="name" label="Soru"></el-table-column>
      <el-table-column fixed="right" label="Ayarlar" width="120">
        <template slot-scope="scope">
          <el-button type="text" @click="editClick(scope.row._id)" size="small">Düzenle</el-button>
          <el-button type="text" size="small">Sil</el-button>
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
      message: "Deneme"
      // tableData : '',
      /*  tableData : 
            [{"status":true,"_id":"5d88cfe6c7bec40e7c159b4a","name":"deneme olsun","createdAt":"2019-09-23T14:00:06.968Z","updatedAt":"2019-09-23T14:00:06.968Z","__v":0},{"status":false,"_id":"5d88d1d6c7bec40e7c159b4c","name":"deneme mi","createdAt":"2019-09-23T14:08:22.488Z","updatedAt":"2019-09-23T14:08:22.488Z","__v":0},{"status":true,"_id":"5d88d267c7bec40e7c159b4d","name":"oldu olacak","createdAt":"2019-09-23T14:10:47.567Z","updatedAt":"2019-09-23T14:10:47.567Z","__v":0},{"status":true,"_id":"5d88d281c7bec40e7c159b4e","name":"yaw ne alakası var","createdAt":"2019-09-23T14:11:13.775Z","updatedAt":"2019-09-23T14:11:13.775Z","__v":0}] */
    };
  },
  async asyncData(context) {
    try {
      // Eğer axios'a context dışında yukarıdaki gibi import ederek ulaşırsan api kısayollarını kullanamazsın.
      const _lists = await context.$axios.get("/questions");

      return { tableData: _lists.data };
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
    }
  }
};
</script>

<style scoped>
</style>