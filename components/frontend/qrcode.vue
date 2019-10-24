<template>
    <qrcode-vue :value="value" :size="size" level="H"></qrcode-vue>
</template>

<script>
import QrcodeVue from 'qrcode.vue';

export default {
    props: {
        value : {
            type: String,
            required: true
        },
        size : {
            type: Number,
            required: true
        }
    },
    components: {
      QrcodeVue,
    },
}
</script>

<style scoped>

</style>