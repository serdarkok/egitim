<template>
        <div class="container-fluid">
      <div class="row">
        <el-container>
            <el-header>
                <el-menu class="el-menu-demo" mode="horizontal">
                    <el-menu-item index="1">
                        <nuxt-link to="/admin/">Ana Sayfa</nuxt-link>
                    </el-menu-item>
                    <el-submenu index="2">
                        <template slot="title">Kategoriler</template>
                        <el-menu-item index="2-1">
                            <nuxt-link to="/admin/categories/add">Ekle</nuxt-link>
                        </el-menu-item>
                        <el-menu-item index="2-2">
                            <nuxt-link to="/admin/categories">Listele</nuxt-link>
                        </el-menu-item>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title">Sorular</template>
                        <el-menu-item index="3-1">
                            <nuxt-link to="/admin/questions/add">Ekle</nuxt-link>
                        </el-menu-item>
                        <el-menu-item index="3-2">Listele</el-menu-item>
                    </el-submenu>
                    <el-submenu index="4">
                        <template slot="title">Kullanıcılar</template>
                        <el-menu-item index="4-1">Ekle</el-menu-item>
                        <el-menu-item index="4-2">Listele</el-menu-item>
                    </el-submenu>
                    <el-menu-item index="5">
                        <el-button type="warning" @click="Logout">Çıkış Yap</el-button>
                    </el-menu-item>
                    </el-menu>
            </el-header>
        </el-container>
      </div>
  </div>
</template>

<script>
export default {
    methods : {
        Logout() {
        this.$store.dispatch('auth/logOut');
    }
  }
}
</script>