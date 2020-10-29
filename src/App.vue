<template>
  <v-app>
    <ToolBar />
    <v-content class="mx-4">
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import ToolBar from "@/components/ToolBar";

export default {
  name: "App",
  components: { ToolBar },
  data: () => ({}),
};
</script>
