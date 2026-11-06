import { html } from '#lib/common-tags/index.js'

/**
 * Renders the menu list
 *
 * @param      {Object}  eleventyConfig
 * @param      {Object}  params
 */
export default function (eleventyConfig) {
  const menuItem = eleventyConfig.getFilter('menuItem')

  const { menuType } = eleventyConfig.globalData.config

  return function (params) {
    const { currentURL, navigation } = params

    /**
     * True when the current page is this page or one of its descendants
     */
    const containsCurrent = (page) =>
      page.url === currentURL || (page.children || []).some(containsCurrent)

    const listItem = (depth) => (page) => {
      let element = ''
      if (!page.children || page.children.length === 0) {
        return `<li class="page-item">${menuItem({ currentURL, page })}</li>`
      } else if (depth > 0 && menuType !== 'brief') {
        /**
         * Nested sections collapse into an accordion, open on the section
         * holding the current page. The title stays a link; the summary's
         * arrow is the only part that toggles (see custom.css).
         */
        const open = containsCurrent(page) ? ' open' : ''
        element += '<li class="section-item section-item--accordion">'
        element += `<details${open}>`
        element += `<summary>${menuItem({ currentURL, page })}</summary>`
        element += renderList(page.children, depth + 1)
        element += '</details></li>'
        return element
      } else {
        element += `<li class="section-item">${menuItem({ currentURL, page })}`
        if (menuType !== 'brief') {
          element += renderList(page.children, depth + 1)
        }
        element += '</li>'
        return element
      }
    }

    const renderList = (items, depth = 0) => {
      return html`
        <ol>
          ${items.map(listItem(depth)).join('')}
        </ol>
      `
    }

    return renderList(navigation)
  }
}
