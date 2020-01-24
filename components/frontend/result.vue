<template>
        <el-card :body-style="{ padding: '0px' }" shadow="hover" class="result-wrapper">
            <div slot="header" class="questionText">
                {{ result.data.question.name }}
            </div>
            <!-- card body -->
            <div style="padding: 5px;">
                  <ul class="item-select">
                    <li v-for="(item, index) in result.data.question.choices" :key="index">
                      <div class="options"> {{ getOptions[index] }} </div>
                        <div class="bar" :style="{width: calculate(item.total)}" :class="{ correct: item.correct, answer: checkAnswer(item.dummy_id, userAnswer) }" >
                            <div>{{ calculate(item.total) }}</div>
                        </div>
                        <div class="choiceText" :class="{ correctText: item.correct }">
                        <span v-if="item.correct">Cevap: </span>{{ item.name }}
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
        },
        userAnswer: {
            type: String
        }
    },

    data() {
        return {
            guest: this.result.data.guest,
            getSeries : null,
            series: [{
                data: [],
                categories: [],
            }],
            getOptions: [],
            options : ['A)', 'B)', 'C)', 'D)', 'E)'],
        }
    },

    methods : {
        calculate(total) {
            console.log(this.result.data.totalAnswer);
            if(this.result.data.totalAnswer > 0) {
            var result = ((total * 100) / this.result.data.totalAnswer);
            console.log(result);
            return Math.round(result) + '%';
            } else {
              return 0;
            }

            // return result.toPrecision(3) + '%';
        },
        checkAnswer(a,b) {
            if (a == b) {
                return true;
            }
                return false;
        }
    },

    mounted() {
      // console.log(this.result.data.question.choices);
       this.result.data.question.choices.forEach((element, index) => {
        this.getOptions.push(this.options[index]);
      });
    }
};
</script>


<style scoped>
.item-select {
    list-style: none;
    padding-left: 0px;
    padding-right: 20px;
    cursor: move;
}

.item-select li {
    padding: 5px;
    border-bottom: 1px solid #EBEEF5;
    font-size: 10px;
    position: relative;
    padding-left: 20px;
}

.questionText {
  font-size: 16px;
  font-weight: 700;
}

.options {
  position: absolute;
  left: 0px;
  font-size: 15px;
  font-weight: 700;
  top: 7px;
}

.correct {
  background-color: rgb(8, 150, 32) !important;
}

.answer {
  background-color: rgb(150, 8, 67) !important;
}

.bar {
  background-color: rgb(8, 86, 150);
  padding: 15px;
  padding-left: 5px;
  color: #FFFFFF;
  font-weight: 700;
  position: relative;
  animation: acrossIn .30s ease-out both;
}

.correctText {
    color: rgb(119, 138, 15);
}

.bar div {
  position: absolute;
  right: -25px;
  top: 7px;
  color: #333333;
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