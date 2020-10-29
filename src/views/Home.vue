<template>
  <div id="testing">
    <h1>Home</h1>

    <v-btn color="success" class="mr-4" @click="routePost">Create Post</v-btn>
    <v-simple-table height="300">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Title</th>
            <th class="text-left">Body</th>
            <th class></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="post in posts" :key="post.id">
            <td>
              <router-link :to="{ name: 'Post', params: { id: post.id } }">{{
                post.title
              }}</router-link>
            </td>
            <td>{{ post.body }}</td>
            <td>
              <ConfirmDialog @remove="removePost(post.id)"></ConfirmDialog>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <div class="text-center">
      <v-pagination
        v-model="page"
        :length="this.length"
        circle
        dark
        @input="pageInput"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { SERVER_API_URL } from "../shared/Constant";

export default {
  name: "Home",
  data: () => ({
    posts: [],
    page: 1, 
    length: null, //total length for page
    count: null, //total number of post
  }),

  created() {
    this.page = this.$store.state.page;
    this.getPosts();
  },
  methods: {
    getPosts(){
      axios
      .get(`${SERVER_API_URL}/list?page=${this.$store.state.page}`)
      .then((res) => {
        this.page = this.$store.state.page;
        this.posts = res.data.results;
        this.count = res.data.count;
        this.length = Math.ceil(this.count / 5);
      })
      .catch((error) => {
        console.log(error);
      });
    },
    removePost(id) {
      this.$store.state.page = this.page;
      axios
        .delete(`${SERVER_API_URL}/post-delete/${id}`)
        .then(() => {
          this.$store.state.page = (this.count - 1) / 5;
          this.getPosts();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    routePost() {
      this.$store.state.page = this.page;
      console.log(this.$store.state.page)
      this.$router.push("/post");
    },
    pageInput() {
      axios
        .get(`${SERVER_API_URL}/list?page=${this.page}`)
        .then((res) => {
          this.posts = res.data.results;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
