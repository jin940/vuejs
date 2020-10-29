<template>
  <v-app-bar app flat dark>
      <v-toolbar-title>
        <span><router-link :to="{ name:'Home'}" class="noLine white--text">Lorem</router-link></span>
      </v-toolbar-title>
  </v-app-bar>
</template>

<script>
export default {
  name: "ToolBar",
  data: () => ({}),
};
</script>

<style scoped>
.noLine{
    text-decoration: none;
}
</style>