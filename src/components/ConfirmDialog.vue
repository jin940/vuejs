<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="290">
      <template v-slot:activator="{ on, attr }">
        <v-btn color="primary" dark v-bind="attr" v-on="on"> Delete </v-btn>
      </template>
      <v-card>
        <v-card-title class="headline">
          Are you sure you want to delete?
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">
            Disagree
          </v-btn>
          <v-btn color="green darken-1" text @click="remove()"> Agree </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    remove() {
        this.$emit('remove')
        this.dialog = false;
    },
  },
};
</script>

