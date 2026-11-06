import { html } from '#lib/common-tags/index.js'

/**
 * Renders a TOC item image
 *
 * @param      {Object} eleventyConfig eleventy configuration
 *
 * @param      {Object} params `figure` data from `figures.yaml`
 * @property   {String} alt The alt text for the image
 * @property   {String} src The src path for the image
 *
 * @return {String} TOC image markup
 */
export default function (eleventyConfig) {
  return function (figureMedia) {
    const { alt, derivatives, src: canonicalSrc } = figureMedia
    let height, width, src

    switch (true) {
      case derivatives?.staticInlineFigureImage?.paths !== undefined &&
            derivatives?.staticInlineFigureImage?.dimensions !== undefined: {
        const { staticInlineFigureImage } = derivatives
        const { dimensions, paths } = staticInlineFigureImage

        height = dimensions.height
        width = dimensions.width
        src = paths.internal

        break
      }
      case Boolean(canonicalSrc):
        src = canonicalSrc
        break

      default:
        return ''
    }

    return html`
      <div class="card-image">
        <figure class="image">
          <img alt="${alt}"
               height="${height}"
               width="${width}"
               src="${src}"
          />
        </figure>
      </div>
    `
  }
}
