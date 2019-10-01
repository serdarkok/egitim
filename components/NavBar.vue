<template>
        <div class="container-fluid">
      <div class="row">
        <el-container>
            <el-header>
                <el-menu class="el-menu-demo" mode="horizontal" :router="true">
                    <el-menu-item index="1" route="/admin"> Ana Sayfa </el-menu-item>
                    <el-submenu index="2">
                        <template slot="title">Kategoriler</template>
                        <el-menu-item index="2-1" route="/admin/categories/add"> Ekle </el-menu-item>
                        <el-menu-item index="2-2" route="/admin/categories"> Listele </el-menu-item>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title">Sorular</template>
                        <el-menu-item index="3-1" route="/admin/questions/add"> Ekle </el-menu-item>
                        <el-menu-item index="3-2" route="/admin/questions">Listele</el-menu-item>
                    </el-submenu>
                    <el-submenu index="4">
                        <template slot="title">Quizler</template>
                        <el-menu-item index="4-1" route="/admin/quizzes/add"> Ekle </el-menu-item>
                        <el-menu-item index="4-2" route="/admin/quizzes">Listele</el-menu-item>
                    </el-submenu>
                    <el-submenu index="5">
                        <template slot="title">Kullanıcılar</template>
                        <el-menu-item index="5-1">Ekle</el-menu-item>
                        <el-menu-item index="5-2">Listele</el-menu-item>
                    </el-submenu>
                    <el-menu-item index="6">
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