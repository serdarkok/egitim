<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column fixed prop="createdAt" label="Tarih"></el-table-column>
      <el-table-column prop="name" label="Kategori Adı"></el-table-column>
      <el-table-column fixed="right" label="Ayarlar" width="120">
        <template slot-scope="scope">
          <el-button @click="editClick(scope.row._id)"  v-if="scope.row._id != '5d930ede2a55cc289b587357'" type="text" size="small">Düzenle</el-button>
          <el-button @click="deleteClick(scope.row._id)" v-if="scope.row._id != '5d930ede2a55cc289b587357'" type="text" size="small">Sil</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
    layout: 'admin',
    data() {
        return {
            // tableData : '',
           /*  tableData : 
            [{"status":true,"_id":"5d88cfe6c7bec40e7c159b4a","name":"deneme olsun","createdAt":"2019-09-23T14:00:06.968Z","updatedAt":"2019-09-23T14:00:06.968Z","__v":0},{"status":false,"_id":"5d88d1d6c7bec40e7c159b4c","name":"deneme mi","createdAt":"2019-09-23T14:08:22.488Z","updatedAt":"2019-09-23T14:08:22.488Z","__v":0},{"status":true,"_id":"5d88d267c7bec40e7c159b4d","name":"oldu olacak","createdAt":"2019-09-23T14:10:47.567Z","updatedAt":"2019-09-23T14:10:47.567Z","__v":0},{"status":true,"_id":"5d88d281c7bec40e7c159b4e","name":"yaw ne alakası var","createdAt":"2019-09-23T14:11:13.775Z","updatedAt":"2019-09-23T14:11:13.775Z","__v":0}] */
        }
    },
    async asyncData(context) {
        try {
            // Eğer axios'a context dışında yukarıdaki gibi import ederek ulaşırsan api kısayollarını kullanamazsın.
          const _lists = await context.$axios.get('/categories');
          const _newLists = _lists.data.map(({ _id, name, createdAt }) => ({ _id: _id, name: name, createdAt: context.$moment(createdAt).format('DD MMMM YYYY') }));
          await context.store.commit('categories/SET_CATEGORY', _newLists);
          
          // tarih çevriminde forEach kullanımı
          /* 
            _lists.data.forEach((element, index) => {
              _lists.data[index].createdAt = context.$moment(_lists.data[index].createdAt).format('DD MMMM YYYY');
            }); 
          */
          if (_lists) {
              return { tableData : context.store.getters['categories/allCategories'] }
          }
        } catch (error) {
            console.log(error);
        }
    },

    methods : {
        editClick(id) {
            if (id) {
              this.$router.push('/admin/categories/edit/' + id);
            }
        },

        deleteClick(id) {
          if (id) {
          this.$alert('Dikkat, silmek istediğiniz kategori içerisindeki sorular "Kategorisiz" kategorisine aktarılacaktır. Silmek istediğinize emin misiniz?', 'Uyarı', {
            confirmButtonText: 'Tamam',
              callback: action => {
                if (action === 'confirm') {
                  //TODO delete
                    this.$store.commit('categories/REMOVE_CATEGORY', id);
                    this.$axios.get('/categories/delete?id='+id).then((result) => {
                  })
                  .catch((error) => {
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

<style>
</style>