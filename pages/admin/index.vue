<template>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-divider content-position="left"><h2>Yaklaşan Etkinlikler</h2></el-divider>
      </el-col>
      <el-col :span="12" v-for="(item, index) in quizzes" :key="index">
        <el-card :body-style="{ padding: '0px', width: '100%' }" shadow="hover">
          <div slot="header" class="kirmizi-wrap clearfix">
            <span class="kirmizi-cover">
              </span>
              <h3 class="cover-h3">{{ index + 1 }}</h3>
              <el-button style="float: right;" type="warning" size="mini" plain>İstatistikler</el-button>
              <el-button style="float: right;" type="primary" @click="startQuiz(item._id)" size="mini" class="mr-2" plain>Başlat</el-button>
              <el-tag style="float: right;" type="info" size="mini" class="mt-1"><a :href="'http://test.me/'+item.slug" target="_blank">http://test.me/{{item.slug}}</a></el-tag>
          </div>
          <div>
            <ul class="item-select">
              <li>
                Etkinlik Adı: <h4>{{ item.name }}</h4>
              </li>
              <li>
                Başlangıç Tarihi: <h4>{{ changeDate(item.start.date) }}</h4>
              </li>
              <li>
                Bitiş Tarihi: <h4>{{ changeDate(item.finish.date) }}</h4>
              </li>                                 
            </ul>
          </div>
        </el-card>
      </el-col>
    </el-row>
</template>

<script>
export default {
  layout: "admin",
  // middleware: "auth",

  sockets: {
    connect: function () {
      console.log('socket connected');
      
       },
       customEmit: function (data) {
           console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)');
       }
  },  

data() {
    return {
      quizzes: null,
    }
  },

  methods : {
    changeDate(data) {
      return this.$moment(data).format("DD MMMM YYYY HH:SS");
    },
    startQuiz(data) {
      this.$router.push('/admin/start/'+data);
    }
  },

  async mounted() {
    const _ = await this.$axios.get('/quizzes/mainpage');
    console.log(_);
    if (_) {
      console.log(_);
      this.quizzes = _.data;
    }
  }
};
</script>

<style>
a {
  color: #909399;
  text-decoration: none;
}
.item-select {
    list-style: none;
    padding-left: 0px;
    cursor: move;
}

.item-select li {
    padding: 5px;
    border-bottom: 1px solid #EBEEF5;
}

.kirmizi-wrap {
  position: relative;
}

.kirmizi-cover {
  position: absolute;
  left: -100px;
  top: -40px;
  width: 130px;
  height: 80px;
  z-index: 1;
  background-color: #00BD38;
  transform: rotate(-45deg);
}

.cover-h3 {
  position: absolute;
  top: -20px;
  left: -18px;
  color: #FFFFFF;
  font-weight: bold;
  font-size: 29px;
  z-index: 2;
}
</style>