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
  name: "login",
  data() {
    return {
      validCredentials: {
        username: "lightscope",
        password: "lightscope"
      },
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
      console.log(data);
      this.$store.dispatch('auth/postLogin', data).then(()=> {
        console.log('Çalıştı action');
      })
      .catch((err) => {
        console.log(err);
      })
    },
    simulateLogin() { 
       this.$axios.post('/api/auth/', this.model).then((data)=> {
          this.$message.success(data)
        })
        .catch((err) => {
          console.log(err);
        });
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

.login {
  position: absolute;
  top: 40%;
  transform: translate(-50%, -50%);
  flex: 1;
  left: 50%;
}

.login-button {
  width: 100%;
  margin-top: 0px;
}
.login-form {
  width: 290px;
}
.forgot-password {
  margin-top: 10px;
}

h2 {
  margin-bottom: 20px;
  text-align: center;
}
</style>
