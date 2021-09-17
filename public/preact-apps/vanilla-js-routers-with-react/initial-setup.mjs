import { h } from 'https://unpkg.com/preact@latest?module';
import htm from 'https://unpkg.com/htm?module'
const html = htm.bind(h);
import { BrowserWindow } from './browser-window.mjs'

const InitialSetup = () => {
    return html`
    <${BrowserWindow} url="https://the-future.rocks">
        <div class="my-0 md:my-24 flex justify-center items-center w-full">
            <div class="pt-8 pb-6 px-6 bg-white rounded shadow-xl my-6 w-10/12 md:w-1/2 md:py-16">
                <p class="font-bold">Look ma! No node_modules!</p>
            </div>
        </div>
    </${BrowserWindow}>
    `
}

export { InitialSetup }