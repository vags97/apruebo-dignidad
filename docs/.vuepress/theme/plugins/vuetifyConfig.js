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
            /*
            #008ef6
            #f87519
            #2fb083
            #7c21d9
            #ffbc00
             */
            light: {
                primary: '#7c21d9',
                secondary: '#2fb083',
            }
        }
    }
}
