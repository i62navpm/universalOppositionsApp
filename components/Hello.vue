<template lang="pug">
  v-container(fluid style="min-height: 0;" grid-list-lg)
    v-layout(column wrap)
      v-flex(sm10 offset-sm1 md6 offset-md3)
        router-link(:to="'list'")
          v-card.purple.white--text
            v-container(fluid, grid-list-lg)
              v-layout(row)
                v-flex(xs7)
                  div
                    .headline English general list
                    div Search your name in final list ang get your position
                v-flex(xs5)
                  v-card-media(src='https://i.redd.it/yuw4cb0mfzjx.png', height='125px', contain)
</template>

<script>
export default {
  name: 'hello'
}
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
}
</style>
