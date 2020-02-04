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
            timer: ''
        }
    },

    props: {
        count: {
            type: Number
        },
    },

    mounted() {
        this.value = this.count;
        this.timer = setInterval(() => {
            this.value = --this.value;
            this.ss = (((this.value) * 100) / this.count);
            console.log(this.ss);
            if (this.value <= 0) {
                console.log('şuan küçük');
                clearInterval(this.timer);
                this.$emit('stopAnswer', true);
            }
        }, 1000);
    },

    beforeDestroy() {
        clearInterval(this.timer);
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
