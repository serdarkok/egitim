<template>
  <div class="body-wrap">
    <NavBar></NavBar>
    <div class="container mt-3">
        <el-row :gutter="12">
            <el-col :span="24">
                <el-card shadow="hover">
                    <nuxt />
                </el-card>
            </el-col>
        </el-row>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";

export default {
  components: { NavBar }
};
</script>

<style >
.body-wrap {
  background-color: #f4f4f4;
}

body {
  background-color: #f4f4f4;
}
</style>