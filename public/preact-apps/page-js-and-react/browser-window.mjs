import { React } from 'https://unpkg.com/es-react/dev'
import htm from 'https://unpkg.com/htm?module'
const html = htm.bind(React.createElement);

const BrowserWindow = props => {
    const { children, url } = props
    return html`
    <div aria-label="Pseudo browser window" class="browser w-full min-h-full">
      <div class="browser-navigation-bar">
        <i aria-label="close button"></i><i aria-label="minimize button"></i><i aria-label="fullscreen button"></i>
        <input aria-label="URL bar" class="url-bar" value=${url} />
      </div>

      <div class="browser-container">
        <div aria-live="polite" class="bg-blue-300 flex justify-center items-center">
          ${children}
        </div>
      </div>
    </div>
    `
}

export { BrowserWindow }