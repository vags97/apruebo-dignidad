import minifyTheme from "minify-css-string";
import es from 'vuetify/lib/locale/es'

export default {
    lang: {
        locales: {es},
        current: 'es'
    },
    icons: {
        iconfont: 'mdiSvg',
    },
    theme: {
        options: {
            minifyTheme,
            customProperties: true
        },
        themes: {
            light: {
                primary: '#ff1f81',
                secondary: '#00d6ff'
            }
        }
    },
}
