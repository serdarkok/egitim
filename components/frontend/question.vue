<template>
<el-card :body-style="{ padding: '0px' }" shadow="hover">
    <div slot="header">
        <span>Soru Ekranı</span>
    </div>
    <div class="question-wrap" v-if="q">
        <div class="question">
        <img :src="q.photo" v-if="q.photo" />
        <el-row>
            <el-image style="width: 200px; height: 100px" :src="getPhoto(q.photo)" v-if="q.photo" fit="scale-down"></el-image>
        </el-row>
        {{ q.name }}
        </div>
        <div class="choice-wrap">
            <table class="choice-wrap">
                <label v-for="(item, index) in q.choices" :key="index" style="display: block;">
                    <tr>
                        <td style="vertical-align: top;"><input type="radio" v-model="radio" @click="sendRadio(item.dummy_id)" :value="item.dummy_id" class="option-input radio" name="example" /></td>
                        <td><span>{{item.name}}</span></td>
                    </tr>
                </label>
            </table>
        </div>
    </div>
</el-card>
</template>

<script>
export default {
    props: {
        q: {
            type: Object,
        }
    },

    data() {
        return {
            radio: null,
            question_id: this.q._id,
            ifSelect: false,
        }
    },

    methods: {
        selectChoice(index, event) {
            let list = event.classList;
            if (!list.contains('ifSelect')) {
                list.add('ifSelect');
            } else {
                list.remove('ifSelect');
            }

            // this.ifSelect = !this.ifSelect;
        },

        sendRadio(radio) {
            console.log(this.question_id);
            const total = {
                question_id: this.question_id,
                radio: radio
            }
            this.$emit('getRadio', total);
            // this.$emit('addChoice', {data: i});
        },

        getPhoto(photo) {
            return '/uploads/' + photo;
        }
    }
}
</script>

<style scoped>
.question-wrap {
    padding: 10px;
    font-size: 15px;
}

.question-wrap .question {
    font-weight: 700;
    margin-bottom: 15px;    
}

.choice-wrap td{
    margin: 0px;
}

.ifSelect {
    background-color: #d09191;
    color: #FFFFFF;
}

label {
    font-size: 13px;
    line-height: 35px;
    display: block;
    position: relative;
    cursor: pointer;
}

label span {
    display: inline-block;
    font-size: 13px;
    line-height: 20px;
    padding-left: 0px;
    text-indent: 0px;
}

.option-input {
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  -o-appearance: none;
  appearance: none;
  position: relative;
  top: 5.33333px;
  right: 0;
  bottom: 0;
  left: 0;
  height: 18px;
  width: 18px;
  transition: all 0.15s ease-out 0s;
  background: #cbd1d8;
  border: none;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  margin-right: 0.5rem;
  outline: none;
  position: relative;
  z-index: 1000;
}
.option-input:hover {
  background: #9faab7;
}
.option-input:checked {
  background: #06863c;
}
.option-input:checked::before {
  height: 13px;
  width: 18px;
  position: absolute;
  content: '⬤';
  display: inline-block;
  font-size: 10.1px;
  text-align: center;
  line-height: 17px;
}
.option-input:checked::after {
  background: #ff0000;
  content: '';
  display: block;
  position: relative;
  z-index: 100;
}
.option-input.radio {
  border-radius: 50%;
}
.option-input.radio::after {
  border-radius: 50%;
}

</style>