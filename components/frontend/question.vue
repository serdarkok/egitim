<template>
<el-card :body-style="{ padding: '0px' }" shadow="hover" class="result-wrapper">
    <div slot="header">
        <el-row type="flex" justify="space-between" align="middle">
            <el-col :span="21">
                <span class="selected-option" v-if="selected">Seçtiğin Cevap: {{ options[selected - 1] }}</span>
            </el-col>
            <el-col :span="3">
                <countdown :count="q.time || q.quizTime"></countdown>
            </el-col>
        </el-row>
    </div>
    <div class="question-wrap" v-if="q">
        <div class="question-text">
            <img :src="q.photo" v-if="q.photo" />
            <el-row>
                <el-image style="width: 200px; height: 100px" :src="getPhoto(q.photo)" v-if="q.photo" fit="scale-down"></el-image>
            </el-row>
            {{ q.name }}
        </div>
        <ul class="choice-wrap">
            <li v-for="(item, index) in q.choices" :key="index" @click="sendRadio(item.dummy_id)" :value="item.dummy_id">
                <div class="choice-name selected" v-if="selected == index + 1">{{ options[index] }}</div>
                <div class="choice-name" v-else>{{ options[index] }}</div>
                <div class="choice-value">{{item.name}}</div>
            </li>
        </ul>
<!--         <table class="choice-wrap">
            <label v-for="(item, index) in q.choices" :key="index" style="display: block;">
                <tr>
                    <td style="vertical-align: top;">{{ options[index] }}) <input type="radio" v-model="radio" @click="sendRadio(item.dummy_id)" :value="item.dummy_id" class="option-input radio" name="example" /></td>
                    <td><span>{{item.name}}</span></td>
                </tr>
            </label>
        </table> -->
    </div>

    <el-dialog
    title="Bilgi"
    :visible.sync="dialogVisible"
    width="90%"
    :before-close="handleClose">
    <span>Cevabını kaydettik, süre bitene kadar cevabını <br/> değiştirebilirsin</span>
    <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" type="warning" plain size="small">Tamam</el-button>
    </span>
    </el-dialog>    
</el-card>
</template>

<script>
import countdown from './countdown';

export default {
    components: {countdown},
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
            count: this.$cookies.get('time'),
            options: ['A', 'B', 'C', 'D', 'E'],
            selected: null,
            dialogVisible: false,
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
            console.log(radio);
            this.selected = radio;
            const total = {
                question_id: this.question_id,
                radio: radio
            }
            this.$emit('getRadio', total);
            this.dialogVisible = true;
            // this.$emit('addChoice', {data: i});
        },

        getPhoto(photo) {
            return '/uploads/' + photo;
        }
    }, 

    mounted() {
        this.selected = null;
    }
}
</script>

<style>

.el-card__header {
    padding: 5px 10px;
}

.question-wrap {
    padding: 10px;
    font-size: 15px;
}

.question-wrap .question-text {
    font-weight: 700;
    font-size: 18px;
    margin-bottom: 15px;    
}

.choice-wrap{
    list-style: none;
    padding-left: 5px;
}

.choice-wrap li {
    background: #606c88; /* Old browsers */
    background: -moz-linear-gradient(top,  #606c88 0%, #3f4c6b 100%); /* FF3.6-15 */
    background: -webkit-linear-gradient(top,  #606c88 0%,#3f4c6b 100%); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(to bottom,  #606c88 0%,#3f4c6b 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#606c88', endColorstr='#3f4c6b',GradientType=0 ); /* IE6-9 */
    color: #FFFFFF;
    border-radius: 7px;
    font-size: 13px;
    margin-top: 10px;
    padding: 10px 2px;
    padding-left: 20px;
    position: relative;
    cursor: pointer;
}

.choice-name {
    position: absolute;
    color: #FFFFFF;
    background: #ff670f; /* Old browsers */
    background: -moz-linear-gradient(top,  #ff670f 0%, #ff670f 100%); /* FF3.6-15 */
    background: -webkit-linear-gradient(top,  #ff670f 0%,#ff670f 100%); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(to bottom,  #ff670f 0%,#ff670f 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ff670f', endColorstr='#ff670f',GradientType=0 ); /* IE6-9 */
    left: 0;
    height: 100%;
    display: flex;
    align-items: center;
    top: 0;
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
    width: 16px;
    font-weight: 700;
    padding-left: 3px;    
}

.selected {
    /* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#a4b357+0,75890c+100;Olive+3D+%233 */
    background: #a4b357; /* Old browsers */
    background: -moz-linear-gradient(top,  #a4b357 0%, #75890c 100%); /* FF3.6-15 */
    background: -webkit-linear-gradient(top,  #a4b357 0%,#75890c 100%); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(to bottom,  #a4b357 0%,#75890c 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#a4b357', endColorstr='#75890c',GradientType=0 ); /* IE6-9 */
}

.selected-option {
    font-weight: 700;
    padding-left: 5px;
    color: rgb(9, 95, 48);
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

.result-wrapper {
    width: 100%;
    max-width: 450px;
}

</style>