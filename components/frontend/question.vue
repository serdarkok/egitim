<template>
<el-card :body-style="{ padding: '0px' }" class="mt-5" shadow="hover">
    <div slot="header">
        <span>Soru Modülü</span>
    </div>
    <div class="question-wrap" v-if="q">
        <div class="question">
        Soru: {{ q.name }}
        </div>
        <ul class="choices-wrap">
            <li v-for="(item, index) in q.choices" :key="index" @click="selectChoice(index, $event.target)" v-bind:class="{ifSelect: ifSelect}">
                {{item.name}}
            </li>
        </ul>
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
        }
    }
}
</script>

<style scoped>
.question-wrap {
    padding: 10px;
    font-size: 16px;
}

.question-wrap .question {
    font-weight: 700;
    margin-bottom: 15px;    
}

.choices-wrap {
    list-style: none;
    display: flex;
    flex-direction: column;
}

.choices-wrap li {
    cursor: pointer;
    padding: 10px;
    border-top: 1px solid #F2F2F2;
    border-left: 1px solid #F2F2F2;
    border-right: 1px solid #F2F2F2;
    width: 100%;
    min-height: 60px;
    align-items: center;
    display: flex;
}

.choices-wrap li:first-child {
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
}

.choices-wrap li:last-child {
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    border-bottom: 1px solid #F2F2F2;
}

.ifSelect {
    background-color: #d09191;
    color: #FFFFFF;
}

</style>