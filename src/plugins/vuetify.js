import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        dark: false,
        options: {
            customProperties: true
        },
        themes: {
            dark: {
                primary: "#ff9015"
            },
            light: {
                primary: "#ff9015"
            }
        }
    }
});
