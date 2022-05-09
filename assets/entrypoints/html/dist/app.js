import { onDocumentReady } from '../../../js/helpers'
import { initialize as initContent } from '../../../js/content'
import { initialize as initSidebarDrawer } from '../../../js/sidebar/sidebar-drawer'
import { initialize as initSidebarContent } from '../../../js/sidebar/sidebar-list'
import { initialize as initSidebarSearch } from '../../../js/sidebar/sidebar-search'
import { initialize as initVersions } from '../../../js/sidebar/sidebar-version-select'
import { initialize as initSearchPage } from '../../../js/search-page'
import { initialize as initTheme } from '../../../js/theme'
import { initialize as initMakeup } from '../../../js/makeup'
import { initialize as initModal } from '../../../js/modal'
import { initialize as initKeyboardShortcuts } from '../../../js/keyboard-shortcuts'
import { initialize as initQuickSwitch } from '../../../js/quick-switch'
import { initialize as initTooltips } from '../../../js/tooltips/tooltips'
import { initialize as initHintsPage } from '../../../js/tooltips/hint-page'
import { initialize as initCopyButton } from '../../../js/copy-button'
import { initialize as initSettings } from '../../../js/settings'

onDocumentReady(() => {
  initTheme()
  initSidebarDrawer()
  initSidebarContent()
  initSidebarSearch()
  initVersions()
  initContent()
  initMakeup()
  initModal()
  initKeyboardShortcuts()
  initQuickSwitch()
  initTooltips()
  initHintsPage()
  initSearchPage()
  initCopyButton()
  initSettings()
})
