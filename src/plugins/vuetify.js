/** Vuetify Plugin */
import { createVuetify } from '@logue/vue2-helpers/vuetify';

/*
// Locale
import i18n from './i18n';
import { en, ja } from 'vuetify/lib/locale';
*/

import '@mdi/font/css/materialdesignicons.css';
import { loadFonts } from './webfontloader';

loadFonts();

export default createVuetify({
  theme: {
    dark: false,
    options: {
      customProperties: true,
    },
    themes: {
      dark: {
        primary: '#ff9015',
      },
      light: {
        primary: '#ff9015',
      },
    },
  },
});
