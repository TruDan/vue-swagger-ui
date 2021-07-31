<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>
            {{ operation.summary }}
          </v-card-title>
          <v-card-subtitle>
            {{ operation.description }}
          </v-card-subtitle>

          <code>{{ operation.method | upper }} {{ operationUrl }}</code>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col sm="12" lg="6">
        <v-card>
          <v-card-title>Request</v-card-title>

          <v-simple-table v-if="operation.parameters">
            <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Required</th>
            </tr>
            </thead>
            <tr
                v-for="parameter of operation.parameters"
                :key="parameter.name">
              <td>
                <strong>{{ parameter.name }}</strong><br/>
                <em>{{ parameter.schema.type }}</em>
              </td>
              <td>{{ parameter.description }}</td>
              <td>
                <v-switch readonly
                          :value="parameter.required"/>
              </td>
            </tr>
          </v-simple-table>

        </v-card>
      </v-col>
      <v-col sm="12" lg="6">
        <v-card>
          <v-card-title>Response</v-card-title>


          <v-subheader>Responses</v-subheader>

          <v-expansion-panels accordion>
            <v-expansion-panel
                v-for="([code, response]) of Object.entries(operation.responses)"
                :key="code">
              <v-expansion-panel-header>{{ code }} {{ response.description }}</v-expansion-panel-header>
              <v-expansion-panel-content v-if="response.content">
                <v-tabs v-model="responseTab">
                  <v-tab v-for="([responseType]) of Object.entries(response.content)"
                         :key="responseType">
                    {{ responseType }}
                  </v-tab>
                </v-tabs>

                <v-tab-items v-model="responseTab">
                  <v-tab-item
                      v-for="([responseType, responseContent]) of Object.entries(response.content)"
                      :key="responseType">
                    <json-viewer copyable boxed sort :value="responseContent.schema"></json-viewer>
                  </v-tab-item>
                </v-tab-items>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>

        </v-card>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
import {mapGetters, mapState} from "vuex";
import JsonViewer from 'vue-json-viewer';

export default {
  name: "OperationView",

  props: ['operationId'],

  components: {
    JsonViewer
  },

  data: () => ({
    operation: {},
    responseTab: null,
  }),

  computed: {
    ...mapState('openapi', ['currentServer']),
    operationUrl() {
      return `${this.currentServer.url}${this.operation.path}`;
    }
  },

  watch: {
    operationId() {
      this.loadData();
    },
    '$route.params.operationId'() {
      this.loadData();
    }
  },

  created() {
    this.loadData();
  },

  methods: {
    ...mapGetters('openapi', ['getOperation']),
    loadData() {
      this.operation = this.getOperation()(this.operationId);
    }
  }
}
</script>

<style scoped>

</style>
