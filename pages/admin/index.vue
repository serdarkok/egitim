<template>
    <div class="container-fluid">
      <div class="row">
        <el-container>
            <el-header>
                <el-menu
                    class="el-menu-demo"
                    mode="horizontal"
                    >
                    <el-menu-item index="1">Processing Center</el-menu-item>
                    <el-submenu index="2">
                        <template slot="title">Workspace</template>
                        <el-menu-item index="2-1">item one</el-menu-item>
                        <el-menu-item index="2-2">item two</el-menu-item>
                        <el-menu-item index="2-3">item three</el-menu-item>
                        <el-submenu index="2-4">
                        <template slot="title">item four</template>
                        <el-menu-item index="2-4-1">item one</el-menu-item>
                        <el-menu-item index="2-4-2">item two</el-menu-item>
                        <el-menu-item index="2-4-3">item three</el-menu-item>
                        </el-submenu>
                    </el-submenu>
                    <el-menu-item index="3"><a href="/admin/users">Info</a></el-menu-item>
                    <el-menu-item index="4">
                        <nuxt-link to="/admin/users" tag="a" no-prefetch> Kullanıcılar </nuxt-link>
                    </el-menu-item>
                    </el-menu>
            </el-header>
        </el-container>
      </div>
  </div>
</template>

<script>
export default {
  middleware: "auth"
};
</script>

<style scoped>
</style>