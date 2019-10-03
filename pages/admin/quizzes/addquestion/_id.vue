<template>
<el-row v-if="questions">
  <el-col :span="12" class="border heights">
      <el-table :data="questions" style="width: 100%" @selection-change="handleSelectionChange" ref="multipleTable" @current-change="selectRow">
        <el-table-column type="selection" width="35"></el-table-column>
        <el-table-column fixed prop="name" label="Adı"></el-table-column>
      </el-table>
  </el-col>
  <el-col :span="12" class="border heights ">
    <draggable
        tag="ul"
        class="yl"
        v-model="questions1"
        @start="isDragging = true"
        @end="isDragging = false"
      >
      <li  class="list-group-item"
           v-for="(element, index) in questions1"
           :key="index">
           {{ element.name }}
           </li>
            </draggable>
  </el-col>

</el-row>
</template>

<script>
export default {
    layout: 'admin',

    data() {
        return {
            questions: '',
            questions1: ''
        }
    },

    async mounted() {
      const _questions = await this.$axios.get("/questions");
      this.questions = _questions.data;
    },

    methods : {
        toggleSelection(rows) {
            if (rows) {
            rows.forEach(row => {
                this.$refs.multipleTable.toggleRowSelection(row);
            });
            } else {
            this.$refs.multipleTable.clearSelection();
            }
        },
        handleSelectionChange(val) {
            console.log('secildi');
            this.questions1 = val;
        },
        selectRow(row){
            console.log(row);
            // this.handleSelectionChange(val);
        }
    
    }
    
}
</script>

<style>
.bgcolor {
    background-color: #e3e3e3;
}

.heights {
    height: 300px;
}

.yl {
    list-style: none;
    padding-left: 0px;
}

.yl li {
    background-color: #f4f4f4;
    padding: 5px;
    margin-top: 5px;
    cursor: move;
}
</style>