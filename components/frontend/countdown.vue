<template>
<div class="countdown">
        <el-progress type="circle" :percentage="ss" :width="45" :stroke-width="4" :show-text="false">
        </el-progress>
        <div class="text"> {{value}} </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            value: null,
            ss: 0,
        }
    },

    props: {
        count: {
            type: Number
        },
    },

    mounted() {
        this.value = this.count;
        const _count = setInterval(() => {
            this.value = --this.value;
            this.ss = (((this.value) * 100) / this.count);
            if (this.value <= 0) {
                console.log('şuan küçük');
                clearInterval(_count);
            }
        }, 1000);
    }
}
</script>

<style scoped>
.countdown {
    position: relative;
    width: 45px;
    height: 45px;
}

.countdown .text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-weight: 700;
}
</style>
