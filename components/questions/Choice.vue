<template>
  <el-row>
    <el-col :span="12">
      <el-form-item v-for="(c,i) in choices" v-bind:key="i" v-bind:label="c.id" prop="choice">
        <el-input v-model="c.name">
          <template slot="suffix">
            <el-switch v-model="c.radio"></el-switch>
          </template>
        </el-input>
      </el-form-item>
    </el-col>
  </el-row>
</template>

<script>
export default {
    props : {
        choices : {
            type: Array,
        }
    }
}
</script>