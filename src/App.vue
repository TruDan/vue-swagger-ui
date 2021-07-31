<template>
  <v-app>

    <v-navigation-drawer
        app
        clipped
    >

      <v-list-item :to="{name: 'home'}">
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            Application
          </v-list-item-title>
          <v-list-item-subtitle>
            subtext
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
      <h-server-selector />
      <v-divider></v-divider>

      <h-path-list />

    </v-navigation-drawer>

    <v-app-bar
        app
        color="primary"
        dark
        fixed
        clipped-left
    >
      <div class="d-flex align-center">
        <v-img
            alt="Vuetify Logo"
            class="shrink mr-2"
            contain
            src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
            transition="scale-transition"
            width="40"
        />

        <v-img
            alt="Vuetify Name"
            class="shrink mt-1 hidden-sm-and-down"
            contain
            min-width="100"
            src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
            width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
          href="https://github.com/vuetifyjs/vuetify/releases/latest"
          target="_blank"
          text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>

        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

import {mapActions} from "vuex";
import HPathList from "@/components/HPathList";
import HServerSelector from "@/components/HServerSelector";

// function status(response) {
//   if (response.status >= 200 && response.status < 300) {
//     return Promise.resolve(response)
//   } else {
//     return Promise.reject(new Error(response.statusText))
//   }
// }
//
// function json(response) {
//   return response.json()
// }


export default {
  name: 'App',
  components: {HServerSelector, HPathList},
  data: () => ({
    //
  }),

  mounted() {
    this.loadData();
  },

  methods: {
    ...mapActions('openapi', ['loadDocument']),
    loadData() {
      this.loadDocument('https://petstore3.swagger.io/api/v3/openapi.json');
      // fetch('https://petstore3.swagger.io/api/v3/openapi.json')
      //     .then(status)
      //     .then(json)
      //     .then(data => {
      //       console.log(data);
      //       this.loadDocument(data);
      //     })
      // .catch(err => {
      //   console.error(err);
      // });
    }
  }
};
</script>
