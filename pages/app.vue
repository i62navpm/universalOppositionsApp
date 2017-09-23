<template lang="pug">
  transition(name="fade" mode="out-in")
    router-view
</template>

<script>
import AWSLambdaSDK from '@/utils/lambda.service'

export default {
  layout: 'userApp',
  beforeCreate () {
    this.$store.state.route.name === 'app' && this.$router.replace({name: 'app-hello'})
  },
  created() {
    this.lambda = new AWSLambdaSDK()
  }
}
</script>

<style scoped lang="scss">
.main {
  .content-username {
    width: 0;

    .username {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
