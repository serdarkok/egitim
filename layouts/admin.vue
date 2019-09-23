<template>
    <div class="body-wrap">
        <NavBar></NavBar>
        <div class="container mt-3">
            <nuxt />
        </div>
    </div>
</template>

<script>
import NavBar from "@/components/NavBar";

export default {
    components: { NavBar },
}
</script>

<style >
    .body-wrap{
        background-color: #F4F4F4;
    }
</style>