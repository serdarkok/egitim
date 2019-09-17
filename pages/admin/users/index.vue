<template>
    <div class="container-fluid">
        <el-card>
            <el-alert>
                Burası da admin panel'de user kısmı olacak. geri dönmek çok kolay.
                <nuxt-link to="/admin" no-prefetch> Ana Sayfa </nuxt-link>
            </el-alert>
        </el-card>
    </div>
</template>

<script>
export default {

    middleware: 'auth',
    
}
</script>

<style scoped>

</style>