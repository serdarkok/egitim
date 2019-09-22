<template>
  <div class="login">
    <el-card>
      <h2>Giriş Ekranı</h2>
      <el-form
        class="login-form"
        :model="model"
        :rules="rules"
        ref="form"
        @submit.native.prevent="login"
      >
        <el-form-item prop="username">
          <el-input v-model="model.username" placeholder="Kullanıcı adı">
            <span slot="prepend">
              <i class="el-icon-user"></i>
            </span>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="model.password" placeholder="Şifre" type="password">
            <span slot="prepend">
              <i class="el-icon-lock"></i>
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
import axios from '@nuxtjs/axios';

export default {
  layout: 'login',
  name: "login",
  data() {
    return {
      model: {
        username: "",
        password: ""
      },
      loading: false,
      rules: {
        username: [
          {
            required: true,
            message: "Username is required",
            trigger: "blur"
          },
          {
            min: 4,
            message: "Username length should be at least 5 characters",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "Password is required", trigger: "blur" },
          {
            min: 5,
            message: "Password length should be at least 5 characters",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    getLogin(data) {
      this.loading = true;
      // store/auth/index.js çağırılıyor
      this.$store.dispatch('auth/postLogin', data).then(()=> {
          const _auth = this.$store.state.auth.user;
          if (_auth.auth) {
            this.$message.success('Giriş başarılı...');
            // console.log(this);
            // this.$router.push('/admin');
            window.location.href = '/admin';
            //context.redirect('/admin')
          }
          else {
            this.$message.error("Username or password is invalid");
          }
      })
      .catch((err) => {
        console.log(err);
      })
      this.loading = false;
    },
    async login() {
      let valid = await this.$refs.form.validate();
      if (!valid) {
        return;
      }
      this.loading = true;
      await this.getLogin(this.model);
      this.loading = false;
/*       if (
        this.model.username === this.validCredentials.username &&
        this.model.password === this.validCredentials.password
      ) {
        this.$message.success("Login successfull");
      } else {
        this.$message.error("Username or password is invalid");
      } */
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
body {
  background: url("~assets/images/bg-background.png");
  background-size: cover;
}

</style>
