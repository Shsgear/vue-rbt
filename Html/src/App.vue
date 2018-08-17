<template>
  <div id="app">
    <el-container>
      <el-header :height="'100px'">
        <el-row :gutter="10">
          <el-col :xl="5"><div class="grid-content bg-purple">DOBI AutoRobot</div></el-col>
          <el-col :xl="10">
            <div class="grid-content bg-purple-light header-midd-menu">
              <div class="menu-item">机器人列表</div>
              <div class="menu-item">刷单日志</div>
              <div class="menu-item">刷单配置</div>
            </div>
            </el-col>
          <el-col :xl="9">
            <div class="grid-content bg-purple-light">
              登录 / 账户名
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
    
  }
}
</script>

<style lang="scss">
html, body {
  height: 100%;
  overflow: hidden;
}
#app {
  height: 100%;
}

.el-container {
  position: relative;
  height: 100%;
}
.el-main {
  position: absolute;
  top: 100px;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 20px;
  background-color: #E9EEF3;
  color: #333;
}
  .el-row {
    // margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    height: 100px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .el-header {
    // background-color: #B3C0D1;
    color: #333;
    text-align: center;
    // line-height: 60px;
  }


</style>

