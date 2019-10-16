<template>
        <el-card :body-style="{ padding: '0px' }" shadow="hover">
            <div slot="header" class="questionText">
                {{ result.data.question.name }}
            </div>
            <!-- card body -->

            <div style="padding: 5px;">
                <ul class="item-select">
                    <li v-for="(item, index) in result.data.question.choices" :key="index">
                        <div class="bar" :style="{width: calculatePercent(item.total)}" :class="{ correct: item.correct }" >
                            <div>{{ calculate(item.total) }}</div>
                        </div>
                        <div class="choiceText" :class="{ correctText: item.correct }">
                        <span v-if="item.correct">Cevap: </span> {{ item.name }}
                        </div>
                    </li>
                </ul>
            </div>
        </el-card>
</template>

<script>
export default {
    props: {
        result: {
            type: Object,
            required: true,
        }
    },

    data() {
        return {
            guest: this.result.data.guest
        }
    },

    methods : {
        calculatePercent (data) {
            console.log(this.guest);
            var result = (data * this.guest);
            (result<1)?result=1:'';
            return result + '%';
        },
        calculate (data) {
            console.log(this.guest);
            var result = (data * this.guest);
            return result + '%';
        }
    }
};
</script>


<style scoped>
.item-select {
    list-style: none;
    padding-left: 0px;
    cursor: move;
}

.item-select li {
    padding: 5px;
    border-bottom: 1px solid #EBEEF5;
    font-size: 10px;
}

.choiceText {
    padding: 3px;
    max-width: 94%;
    font-weight: 700;
    border: 1px solid #DFDFDF;
    background: rgba(255,255,255,1);
    background: -moz-linear-gradient(top, rgba(255,255,255,1) 0%, rgba(246,246,246,1) 47%, rgba(237,237,237,1) 100%);
    background: -webkit-gradient(left top, left bottom, color-stop(0%, rgba(255,255,255,1)), color-stop(47%, rgba(246,246,246,1)), color-stop(100%, rgba(237,237,237,1)));
    background: -webkit-linear-gradient(top, rgba(255,255,255,1) 0%, rgba(246,246,246,1) 47%, rgba(237,237,237,1) 100%);
    background: -o-linear-gradient(top, rgba(255,255,255,1) 0%, rgba(246,246,246,1) 47%, rgba(237,237,237,1) 100%);
    background: -ms-linear-gradient(top, rgba(255,255,255,1) 0%, rgba(246,246,246,1) 47%, rgba(237,237,237,1) 100%);
    background: linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(246,246,246,1) 47%, rgba(237,237,237,1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#ededed', GradientType=0 );
}

.bar {
    height: 35px;
    width: 0px;
    max-width: 94% !important;
    background: rgba(150,150,150,1);
    background: -moz-linear-gradient(top, rgba(150,150,150,1) 0%, rgba(56,56,56,1) 100%);
    background: -webkit-gradient(left top, left bottom, color-stop(0%, rgba(150,150,150,1)), color-stop(100%, rgba(56,56,56,1)));
    background: -webkit-linear-gradient(top, rgba(150,150,150,1) 0%, rgba(56,56,56,1) 100%);
    background: -o-linear-gradient(top, rgba(150,150,150,1) 0%, rgba(56,56,56,1) 100%);
    background: -ms-linear-gradient(top, rgba(150,150,150,1) 0%, rgba(56,56,56,1) 100%);
    background: linear-gradient(to bottom, rgba(150,150,150,1) 0%, rgba(56,56,56,1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#969696', endColorstr='#383838', GradientType=0 );
    animation: acrossIn .30s ease-out both;
}

.bar div {
    position: absolute;
    right: -25px;
    top: 10px;
}

.questionText {
    font-weight: 700;
    font-size: 12px;
}

.correct {
    background: rgba(164,179,87,1);
    background: -moz-linear-gradient(top, rgba(164,179,87,1) 0%, rgba(117,137,12,1) 100%);
    background: -webkit-gradient(left top, left bottom, color-stop(0%, rgba(164,179,87,1)), color-stop(100%, rgba(117,137,12,1)));
    background: -webkit-linear-gradient(top, rgba(164,179,87,1) 0%, rgba(117,137,12,1) 100%);
    background: -o-linear-gradient(top, rgba(164,179,87,1) 0%, rgba(117,137,12,1) 100%);
    background: -ms-linear-gradient(top, rgba(164,179,87,1) 0%, rgba(117,137,12,1) 100%);
    background: linear-gradient(to bottom, rgba(164,179,87,1) 0%, rgba(117,137,12,1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#a4b357', endColorstr='#75890c', GradientType=0 );
}

.correctText {
    color: rgb(119, 138, 15);
}

@keyframes acrossIn {
  0% {
    transform: translate3d(-100%, 0, 0);
  }
  33% {
    transform: translate3d(-35%, 0, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}
</style>