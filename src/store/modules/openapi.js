import OASNormalize from 'oas-normalize';

const state = {
    document: null,
    currentServer: null,
    info: {},
    servers: [],
    paths: [],
    tags: [],
    operations: []
};

const getters = {
    getOperation: (state) => (operationId) => {
        return state.operations.find(x => x.operationId === operationId || x.id === operationId);
    }
};

const actions = {
    loadDocument({commit, dispatch}, rawDocument) {
        const oas = new OASNormalize(rawDocument, { enablePaths: true });
        oas.validate(true).then(doc => {
            console.log('loadDocument', doc);
            commit('SET_document', doc);
            commit('SET_info', doc.info);
            commit('SET_tags', doc.tags);
            commit('SET_servers', doc.servers);
            const paths = Object.entries(doc.paths)
                .map(([path, pathOperations]) => ({
                    path,
                    ...pathOperations
                }));
            commit('SET_paths', paths);
            const operations = Object.entries(doc.paths)
                .map(([path, pathOperations]) => (
                    Object.entries(pathOperations).map(([method, operation]) => ({
                        path,
                        method,
                        ...operation,
                    }))
                ))
                .reduce((arr, row) => arr.concat(row), [])
            ;
            commit('SET_operations', operations);

            dispatch('chooseServer', doc.servers[0]);
        });
    },

    chooseServer({commit, state}, server) {
        if(state.servers.includes(server)) {
            commit('SET_currentServer', server);
        }
    }
};

const mutations = {
    SET_document(state, document) {
        state.document = document;
    },

    SET_info(state, info) {
        state.info = info;
    },

    SET_paths(state, paths) {
        state.paths = paths;
    },

    SET_tags(state, tags) {
        state.tags = tags;
    },

    SET_operations(state, operations) {
        state.operations = operations;
    },

    SET_servers(state, servers) {
        state.servers = servers;
    },

    SET_currentServer(state, currentServer) {
        state.currentServer = currentServer;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
