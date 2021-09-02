import { React } from 'https://unpkg.com/es-react/dev'
import htm from 'https://unpkg.com/htm?module'
const html = htm.bind(React.createElement);
import { BrowserWindow } from './browser-window.mjs'

const InitialSetup = () => {
    return html`
    <${BrowserWindow} url="https://so-nice.to/just-use-a/script-tag.html">
        <div class="py-12 px-12 bg-white rounded shadow-xl z-20 my-20">
            <p class="font-bold">Look ma! No node_modules!</p>
        </div>
    </${BrowserWindow}>
    `
}

export { InitialSetup }