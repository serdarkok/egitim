<template>
  <div class="login">
    <el-card>
      <h2>Giriş Ekranı</h2>
      <h5 style="text-align: center;">Lütfen isim soyisim yazarak giriş yapınız</h5>
      <el-form
        class="login-form"
        :rules="rules"
        :model="model"
        ref="form"
        @submit.native.prevent="getLogin"
      >
        <el-form-item prop="name">
          <el-input v-model="model.name" placeholder="İsim ve Soyisim">
            <span slot="prepend">
              <i class="el-icon-user"></i>
            </span>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            :loading="loading"
            type="primary"
            class="login-button"
            native-type="submit"
            size="small"
            plain
          >Giriş Yap</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import Cookie from 'js-cookie';

export default {
  // socket: {
  //   connect: function() {
  //     console.log('connection');
  //   }
  // },

  layout: "login",
  middleware: 'alreadyLogin',
  name: "login",
  data() {
    return {
      model : {
        name: null,
        socket_id: null,
      },
      loading: false,
      rules: {
        name: [
          { required: true, message: "İsim Soyisim alanı gereklidir", trigger: "blur" },
          { min: 4, message: "İsim Soyisim alanı 5 karakterden kısa olmamalıdır", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    async getLogin() {
      try {
      const valid = await this.$refs.form.validate();
        if (!valid) {
          return;
      }
        console.log(this.$route.params.quiz);
        const _ = await this.$axios.post('/guests/add', this.model);
        console.log(_);
        Cookie.set('user_id', _.data.message._id, { expires: 0.1 });
        this.$router.push('./');
      }
      catch (error) {
        console.log(error);
      }
    }
  },

  mounted() {
    this.$socket.on('connect', (socket) => {
        console.log(this.$socket.id);
        this.model.socket_id = this.$socket.id;
    });
  },

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
body {
  background: url("~assets/images/bg-background.png");
  background-size: cover;
}
</style>