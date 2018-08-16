<template>
  <div class="home">
    views/Home
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import { get } from '@/tools/request';


export default {
  name: 'home',
  components: {
    // HelloWorld,
  },
  created() {
    get('/a',
    {
      a: 1,
      b: 2
    }).then(() => {
      console.log(1)
    }).catch((err) => {
      this.$notify({
        title: `Error ${err.code}`,
        message: err.msg,
        type: "error"
      });
      console.log(err)
    })
}
};
</script>
