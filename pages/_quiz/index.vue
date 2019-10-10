<template>
    <el-row>
        <el-col :sm="{span: 20, offset: 2}" :md="{span: 12, offset: 6}"  :lg="{span: 12, offset: 6}" :xs="{span: 22, offset: 1}">
            <el-card :body-style="{ padding: '0px' }" class="mt-5" shadow="hover">
                <div slot="header">
                    <span>Soru Modülü</span>
                </div>
                <div class="question-wrap">
                    <div class="question">
                    Soru: Aşağıdakilerden hangisi kronik pankreatit tanısıyla izlenen bir hastada ekzokrin pankreas fonksiyonlarını değerlendirmek için kullanılan testlerden biri değildir?
                    </div>
                    <el-radio-group v-model="radio" fill="#007A2C" class="choices-wrap" size="medium">
                        <el-row>
                        <el-radio :label="3" border>Reseptör Agonis</el-radio>
                        </el-row>
                        <el-row>
                        <el-radio :label="6" border>Trijinal Forteks</el-radio>
                        </el-row>                        
                        <el-row>
                        <el-radio :label="8" border>Antiagulenler</el-radio>
                        </el-row>
                        <el-row>
                        <el-radio :label="12" border>Psödo Agonistler</el-radio>
                        </el-row>                        
                    </el-radio-group>
                </div>
            </el-card>            
        </el-col>
    </el-row>
</template>

<script>
export default {
    data() {
        return {
            radio: null,
        }
    },

    beforeMount() {
        // console.log(this.$route.params.quiz);
        this.$socket.emit('joinRoom', this.$route.params.quiz);
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
    margin-left: 10px;
    font-size: 19px;
}

.choices-wrap .el-row {
    margin-bottom: 20px;
}
</style>