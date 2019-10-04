<template>
<el-row v-if="questions" :gutter="10">
  <el-col :span="12">
      <el-card :body-style="{ padding: '0px' }" shadow="never" class="heights">
          <div slot="header" :body-style="{ height: '10px' }">
            <el-select v-model="selected_category" placeholder="Soru Kategorisi Seç" size="small">
                <el-option label="Hepsi" value=""> </el-option>
                <el-option
                v-for="item in categories"
                :key="item._id"
                :label="item.name"
                :value="item._id">
                </el-option>
            </el-select>
          </div>
          <ul class="item-select">
              <li v-for="(item, index) in questions" :key="index" v-if="item.c_id._id == selected_category || selected_category == ''">
                    <el-row type="flex" align="middle">
                        <el-col :span="22">{{ item.name }}</el-col>
                        <el-col :span="2"><el-button size="mini" type="success" @click="addQuestion(item)" icon="el-icon-arrow-right" plain></el-button></el-col>
                    </el-row>
              </li>
          </ul>
      </el-card>
  </el-col>
  <el-col :span="12">
    <el-card :body-style="{ padding: '0px' }" shadow="never" class="heights">
        <div slot="header">
            <el-row type="flex" align="middle" justify="space-between">
                <el-col :span="16">
                    <span>Eklenen Sorular</span>
                </el-col>
                <el-col :span="8">
                    <el-button type="primary" size="mini" @click="sendForm" plain submit :disabled="questions1 < 1">Kaydet</el-button>
                    <el-button type="warning" size="mini" @click="mainPage" plain>İptal</el-button>
                </el-col>
            </el-row>
        </div>
        <draggable
            tag="ul"
            class="item-select"
            v-model="questions1">
              <li v-for="(item, index) in questions1" :key="index" :body-style="{ cursor: 'move' }">
                    <el-row type="flex" align="middle">
                        <el-col :span="3"><el-button size="mini" type="danger" icon="el-icon-arrow-left" @click="removeQuestion(item)" plain></el-button></el-col>
                        <el-col :span="21">{{ item.name }}</el-col>
                    </el-row>
              </li>
        </draggable>
    </el-card>
    <!-- <raw :value="questions1" title="Ornek" /> -->
  </el-col>
</el-row>
</template>

<script>
export default {
    layout: 'admin',

    data() {
        return {
            questions: '',
            questions1: [],
            categories: null,
            selected_category: '',
            checked: null,
        }
    },

    mounted() {
        this.$nextTick( async () => {
            const _questions = await this.$axios.get("/questions");
            this.questions = _questions.data;
            const _categories = await this.$axios.get('/categories');
            if (_categories) {
                this.$store.commit('categories/SET_CATEGORY', _categories.data);
            }
            this.categories = this.$store.getters["categories/allCategories"];
        });
    },

    methods : {
        addQuestion(data) {
            this.questions1.push(data);
            this.questions = this.questions.filter(obj => {
                if (obj._id != data._id) {
                    return obj;
                }
            });
        },

        removeQuestion(data) {
            this.questions.push(data);
            this.questions1 = this.questions1.filter(obj => {
                if (obj._id != data._id) {
                    return obj;
                }
            });            
        },

        // select içerisindeki seçilen kategoriye göre questions'u düzenler
        changeCategory(data) {
            this.questions = this.questions.filter(obj => {
                if (obj.c_id._id == data) {
                    return obj;
                } else if (data == '') {
                    return obj;
                } else {
                }
            });
        },

        mainPage() {
        this.$router.push('/admin/quizzes');
        },

        async sendForm() {
        console.log(this.form);
        // TODO BURAYA QUIZ MODELİ İÇİNDEKİ QUESTİON KEY'İNE EKLEME YAPACAKSIN
/*         this.$axios.post('/questions/add', this.form).then((result) => {
            console.log(result);
        })
        .catch((error) => {
            console.log(error);
        }) */
        }
    }
}
</script>

<style>
.bgcolor {
    background-color: #e3e3e3;
}

.heights {
    height: 500px;
}

.item-select {
    list-style: none;
    padding-left: 0px;
    cursor: move;
}

.item-select li {
    padding: 5px;
    border-bottom: 1px solid #EBEEF5;
}

.el-card__header {
    padding: 10px 20px;
}
</style>