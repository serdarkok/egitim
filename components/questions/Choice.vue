<template>
  <div>
    <el-row v-for="(c,i) in choices" v-bind:key="i" align="middle" type="flex" class="choice-row">
      <el-col :span="12">
        <el-form-item v-bind:label="c.dummy_id" prop="choices">
          <el-input v-model="c.name">
            <template slot="suffix">
              <el-switch v-model="c.correct" @change="selectRadio(i, c.correct)"></el-switch>
            </template>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12" class="button-set">
          <el-button type="default" v-if="Number(i) > 1" icon="el-icon-delete" size="mini" @click="removeChoice(i)" circle></el-button>
          <el-button type="default" v-if="i == choices.length - 1 && choices.length < 5 " icon="el-icon-plus" @click="addChoice(i)" size="mini" circle></el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
    props : {
        choices : {
            type: Array,
        }
    },
    methods: {
      addChoice(i) {
        this.$emit('addChoice', {data: i});
      },
      removeChoice(i) {
        this.$emit('removeChoice', i);
      },
      selectRadio(i, veri) {
        this.$emit('selectRadio', i, veri);
      }
    }
}
</script>

<style>

.el-form-item {
  margin-bottom: 0px;
}

.choice-row {
  margin-bottom: 15px;
}

.choice-row:first-child {
  margin-top: 20px;
}

.button-set {
  padding-left: 5px;  
}
</style>