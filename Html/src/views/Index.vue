<template>
  <div class="index">
    <el-table 
      :data="robotAccountListData"
      border 
      style="width: 100%" 
      tooltip-effect="dark"
    >
      <el-table-column 
        type="selection" 
        width="55"
      ></el-table-column>
      <el-table-column type="index" label="序号" width="180" sortable></el-table-column>
      <el-table-column prop="account" label="机器人账号" width="180" sortable></el-table-column>
      <el-table-column prop="date" label="创建时间" sortable></el-table-column>
      <el-table-column prop="status" label="状态" sortable>
        <template slot-scope="scope">
          <el-switch v-model="scope.row.status" active-color="#13ce66" inactive-color="#ff4949" @change=change(scope.$index,scope.row)></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- <el-button size="mini" type="warning">停止刷单</el-button> -->
          <el-button size="mini" type="primary" :disabled="scope.row.status">选择刷单方案</el-button>
          <el-button size="mini" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// @ is an alias to /src
// import { get } from '../tools/request';


export default {
  name: 'Index',
  components: {
    // Header
  },
  data() {
    return {
      robotAccountListData: [
        {
          account: "11",
          date: "2018-07-12",
          status: true,
          // operate: "12"
        },
        {
          account: "12",
          date: "2018-01-01",
          status: false,
        },
        {
          account: "13",
          date: "2018-01-02",
          status: false,
        }
      ]
    }
  },
  methods:{
    change:function(index,row){
      console.log( index,typeof row.status);

    }
  },
  created() {
    
  }
};
</script>

<style lang="scss" scoped>
.index {
  height: 100%;  
}
</style>

