<template>
<el-col :span="12" :offset="6">
    <el-row type="flex" justify="center" align="middle">
        <el-col :span="24">
            <img src="~assets/images/not-found.svg" />
        </el-col>
        <el-col :span="24" class="text12">
            İlgili etkinlik/anket/quiz bulunamadı. Etkinliğin süresi geçmiş veya daha önce hiç oluşturulmamış olabilir.
        </el-col>
    </el-row>
    
    
        
</el-col>
    
</template>

<script>
export default {
    
}
</script>

<style scoped>
.text12 {
    font-family: "Open Sans";
}
</style>