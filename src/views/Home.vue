<template>
  <v-container fluid>
    <v-card>
      <v-card-title>
        {{ info.title }}
      </v-card-title>
      <v-card-text>
        <vue-markdown
          :source="info.description"
          :options="{
            html: true,
            linkify: true,
            typographer: true,
            breaks: true,
          }"
        />
      </v-card-text>
      <v-card-text>
        <v-btn v-if="info.termsOfService" :href="info.termsOfService" text>
          Terms of Service
        </v-btn>
        <v-btn v-if="info.contact" :href="`mailto:${info.contact.email}`" text>
          {{ info.contact.name || 'Contact the developer(s)' }}
        </v-btn>
        <v-btn v-if="info.license" :href="info.license.url" text>
          {{ info.license.name }}
        </v-btn>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';
import VueMarkdown from 'vue-markdown-render';

export default {
  name: 'Home',

  components: {
    VueMarkdown,
  },

  computed: {
    ...mapState('openapi', ['info']),
  },
};
</script>
