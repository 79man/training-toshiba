import { createI18n } from 'vue-i18n'
import numberFormats from '@/formats/numberFormats'
import dateTimeFormats from '@/formats/dateTimeFormats'
/**
 * Load locale messages
 *
 * The loaded `JSON` locale messages is pre-compiled by `@intlify/vue-i18n-loader`, which is integrated into `vue-cli-plugin-i18n`.
 * See: https://github.com/intlify/vue-i18n-loader#rocket-i18n-resource-pre-compilation
 */
function loadLocaleMessages() {
  const locales = require.context(
    '../locales',
    true,
    /[A-Za-z0-9-_,\s]+\.json$/i
  )
  const messages = {}
  locales.keys().forEach((key) => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i)
    if (matched && matched.length > 1) {
      const locale = matched[1]
      messages[locale] = locales(key).default
    }
  })
  return messages
}

function fetchBrowserLang() {
  const lang = window.navigator.language.split('-')
  return lang[0]
}
export default createI18n({
  legacy: true,
  locale: fetchBrowserLang() || process.env.VUE_APP_I18N_LOCALE || 'en',
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
  numberFormats,
  dateTimeFormats,
  messages: loadLocaleMessages()
})