<template>
  <div class="h-server-selector">
      <v-select
          :items="items"
          v-model="activeItem"
          label="Server"
          hide-details
      >

      </v-select>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "HServerSelector",


  computed: {
    ...mapState('openapi', ["currentServer", "servers"]),

    items() {
      return this.servers.map(server => ({
        ...server,
        text: server.url,
        value: server.url
      }))
    },

    activeItem: {
      get() {
        return this.items.find(x => x.value === this.currentServer.url);
      },
      set(value) {
        this.chooseServer(this.servers.find(x => x.url === value));
      }
    }
  },

  methods: {
    ...mapActions('openapi', ['chooseServer'])
  }
}
</script>

<style scoped>
.h-server-selector {
  padding: 0.5rem;
}
</style>
