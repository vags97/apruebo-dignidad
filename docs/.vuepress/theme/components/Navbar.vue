<template>
  <div>
    <v-navigation-drawer
        app
        v-model="drawer"
        temporary
        absolute
    >
      <v-list
          nav
          dense
      >
        <v-list-item
            v-for="item in userLinks"
            :key="item.link"
        >
          <v-list-item-title>
            <NavLink
                :item="item"
                class="primary--text"
            />
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
        app
        color="primary"
    >
      <v-app-bar-nav-icon
          color="white"
          @click="drawer = true"
          class="d-sm-flex d-md-none"
      />
      <RouterLink
          :to="$localePath"
          class="home-link"
      >
        <img
            v-if="$site.themeConfig.logo"
            class="logo"
            :src="$withBase($site.themeConfig.logo)"
            :alt="$site.themeConfig.title"
        >
      </RouterLink>

      <div
          class="links"
          :style="linksWrapMaxWidth ? {
        'max-width': linksWrapMaxWidth + 'px'
      } : {}"
      >
        <AlgoliaSearchBox
            v-if="isAlgoliaSearch"
            :options="algolia"
        />
        <SearchBox v-else-if="$site.themeConfig.search !== false && $page.frontmatter.search !== false" />
        <NavLinks
            class="can-hide"
            :user-links="userLinks"
        />
      </div>
    </v-app-bar>
  </div>
</template>

<script>
import AlgoliaSearchBox from '@AlgoliaSearchBox'
import SearchBox from '@SearchBox'
import NavLinks from '@theme/components/NavLinks.vue'
import {resolveNavLinkItem} from "../util";
import NavLink from "./NavLink";

export default {
  name: 'Navbar',
  components: {
    NavLinks,
    NavLink,
    SearchBox,
    AlgoliaSearchBox
  },
  data () {
    return {
      linksWrapMaxWidth: null,
      drawer: false
    }
  },

  computed: {
    nav () {
      const { locales } = this.$site
      if (locales && Object.keys(locales).length > 1) {
        const currentLink = this.$page.path
        const routes = this.$router.options.routes
        const themeLocales = this.$site.themeConfig.locales || {}
        const languageDropdown = {
          text: this.$themeLocaleConfig.selectText || 'Languages',
          ariaLabel: this.$themeLocaleConfig.ariaLabel || 'Select language',
          items: Object.keys(locales).map(path => {
            const locale = locales[path]
            const text = themeLocales[path] && themeLocales[path].label || locale.lang
            let link
            // Stay on the current page
            if (locale.lang === this.$lang) {
              link = currentLink
            } else {
              // Try to stay on the same page
              link = currentLink.replace(this.$localeConfig.path, path)
              // fallback to homepage
              if (!routes.some(route => route.path === link)) {
                link = path
              }
            }
            return { text, link }
          })
        }
        return [...this.userNav, languageDropdown]
      }
      return this.userNav
    },
    userNav () {
      return this.$themeLocaleConfig.nav || this.$site.themeConfig.nav || []
    },
    userLinks () {
      return (this.nav || []).map(link => {
        return Object.assign(resolveNavLinkItem(link), {
          items: (link.items || []).map(resolveNavLinkItem)
        })
      })
    },
    algolia () {
      return this.$themeLocaleConfig.algolia || this.$site.themeConfig.algolia || {}
    },

    isAlgoliaSearch () {
      return this.algolia && this.algolia.apiKey && this.algolia.indexName
    }
  },

  mounted () {
    const MOBILE_DESKTOP_BREAKPOINT = 719 // refer to config.styl
    const NAVBAR_VERTICAL_PADDING = parseInt(css(this.$el, 'paddingLeft')) + parseInt(css(this.$el, 'paddingRight'))
    const handleLinksWrapWidth = () => {
      if (document.documentElement.clientWidth < MOBILE_DESKTOP_BREAKPOINT) {
        this.linksWrapMaxWidth = null
      } else {
        this.linksWrapMaxWidth = this.$el.offsetWidth - NAVBAR_VERTICAL_PADDING
          - (this.$refs.siteName && this.$refs.siteName.offsetWidth || 0)
      }
    }
    handleLinksWrapWidth()
    window.addEventListener('resize', handleLinksWrapWidth, false)
  }
}

function css (el, property) {
  // NOTE: Known bug, will return 'auto' if style value is 'auto'
  const win = el.ownerDocument.defaultView
  // null means not to return pseudo styles
  return win.getComputedStyle(el, null)[property]
}
</script>

<style lang="stylus">
$navbar-vertical-padding = 0.7rem
$navbar-horizontal-padding = 1.5rem


a, span, img
  display inline-block
.logo
  height $navbarHeight - 1rem
  min-width $navbarHeight - 1rem
  margin-right 0.8rem
  vertical-align top
.site-name
  font-size 1.3rem
  font-weight 600
  color $titleColor
  position relative
.links
  padding-left 1.5rem
  box-sizing border-box
  background-color inherit
  white-space nowrap
  font-size 0.9rem
  position absolute
  right $navbar-horizontal-padding
  display flex
  .search-box
    flex: 0 0 auto
    vertical-align top

@media (max-width: $MQNarrow)
  .can-hide
    display none
  .links
    padding-left 1.5rem
  .site-name
    width calc(100vw - 9.4rem)
    overflow hidden
    white-space nowrap
    text-overflow ellipsis
</style>
