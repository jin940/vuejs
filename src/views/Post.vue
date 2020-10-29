<template>
  <div>
    <h1>{{ head }}</h1>
    <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="submit">
      <v-text-field
        v-model="title"
        :rules="titleRules"
        label="Title"
        required
      ></v-text-field>

      <v-textarea
        v-model="body"
        solo
        :rules="bodyRules"
        label="Body"
        required
      ></v-textarea>
      <div v-if="this.$route.params.id">
        <v-btn :disabled="!valid" color="success" class="mr-4" type="submit">
          Update
        </v-btn>
        <v-btn color="error" class="mr-4" @click="reset"> Reset Form </v-btn>

        <v-btn color="warning" @click="resetValidation">
          Reset Validation
        </v-btn>
      </div>
      <div v-else>
        <v-btn :disabled="!valid" color="success" class="mr-4" type="submit">
          Create
        </v-btn>
        <v-btn color="error" class="mr-4" @click="reset"> Reset Form </v-btn>

        <v-btn color="warning" @click="resetValidation">
          Reset Validation
        </v-btn>
      </div>
    </v-form>
  </div>
</template>

<script>
import axios from "axios";
import { SERVER_API_URL } from "../shared/Constant";

export default {
  name: "Post",
  data: () => ({
    post: [],
    valid: true,
    title: "",
    titleRules: [(v) => !!v || "Title is required"],
    body: "",
    bodyRules: [(v) => !!v || "Body is required"],
    userId: "",
    head: "",
  }),

  methods: {
    reset() {
      console.log(this.$refs);
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    submit() {
      if (this.$refs.form.validate()) {
        if (this.$route.params.id) {
          axios //update post
            .post(`${SERVER_API_URL}/post-update/${this.$route.params.id}`, {
              userId: this.userId,
              title: this.title,
              body: this.body,
            })
            .then((res) => {
              console.log(res);
              this.$router.push("/");
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          //create post
          axios
            .post(`${SERVER_API_URL}/post-create/`, {
              userId: 1,
              title: this.title,
              body: this.body,
            })
            .then((res) => {
              console.log(res);
              this.$router.push("/");
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
    },
  },
  created() {
    if (this.$route.params.id) {
      //update post If has id in url params
      this.head = "Update Post";
      axios
        .get(`${SERVER_API_URL}/post-detail/${this.$route.params.id}`)
        .then((res) => {
          this.post = res.data;
          this.title = this.post.title;
          this.body = this.post.body;
          this.userId = this.post.userId;
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      // create post
      this.head = "Create Post";
    }
  },
};
</script>