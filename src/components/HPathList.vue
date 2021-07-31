<template>
  <v-list nav dense>

    <v-list-group
    v-for="tag of operationsByTag"
    :key="tag"
    >
      <template #activator>
        <v-list-item-title>{{ tag.name }}</v-list-item-title>
      </template>

      <v-list-item
          v-for="(operation, i) of tag.operations"
          :key="i"
          dense
          :to="{name: 'operation', params: { operationId: operation.operationId || operation.id}}"
      >
        <v-list-item-title>{{ operation.path }}</v-list-item-title>
        <div>
          <v-chip
              class="h-chip__method"
              :color="operation.method | chipColor"
              label
          >
            {{ operation.method | upper }}
          </v-chip>
        </div>
      </v-list-item>
    </v-list-group>

  </v-list>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "HPathList",

  computed: {
    ...mapState('openapi', ['operations', 'tags']),

    operationsByTag() {
      return this.tags.map(tag => ({
          ...tag,
          operations: this.operations.filter(x => x.tags.includes(tag.name))
      }));
    }
  },

  filters: {
    chipColor(method) {
      method = method.toLowerCase();
      if (method === 'get') {
        return 'info';
      } else if (method === 'post') {
        return 'success';
      } else if (method === 'put') {
        return 'warning';
      } else if (method === 'delete') {
        return 'error';
      }
      return 'default';
    }
  },

  methods: {}
}
</script>

<style scoped>
::v-deep .h-chip__method {
  font-size: 0.75rem !important;
  min-width: 2rem !important;
  text-align: center !important;
  height: 1.5rem !important;
  justify-content: center !important;
  /*margin-left: 0.5rem;*/
}

::v-deep .h-chip__method .v-chip__content{
  /*margin: 0.5rem 0.5rem 0.5rem 0.5rem !important;*/
}
</style>
