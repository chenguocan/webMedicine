<template>
  <div>
    <div>
      <el-button @click="toOrder">预约通话</el-button>
      <div id="chen"></div>
    </div>
  </div>
</template>

<script>

export default {
  name: "Index",
  methods:{

    toOrder(){
      this.$router.push("/liveroom");
    }
  }
}
</script>

<style scoped>

</style>
