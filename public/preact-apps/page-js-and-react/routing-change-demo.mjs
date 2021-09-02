import React, {
    useState,
} from 'https://unpkg.com/es-react/dev';
import htm from 'https://unpkg.com/htm?module'
const html = htm.bind(React.createElement);

import { BrowserWindow } from './browser-window.mjs'

const PageOne = () => {
    return html`
        <h2>You're on <span class="text-pink-500">page one</span></h2>
        <p>(click on one of those sweet links to go to page two)</p>
    `
}


const PageTwo = () => {
    return html`
        <h2>You're on <span class="text-green-500">page two</span></h2>
        <p>(neat how the url changed right?)</p>
    `
}

const routes = {
    one: PageOne,
    two: PageTwo
}

const urlFragments = {
    one: "page-one",
    two: "page-two"
}

const RoutingChangeDemo = () => {
    const [urlFragment, setUrlFragment] = useState("page-one")
    const [route, setRoute] = useState("one")

    const changeRoute = route => {
        setRoute(route)
        setUrlFragment(urlFragments[route])
    }

    const url = html`<span>https://a-website.com/</span><span class="text-pink-500">${urlFragment}</span>`
    
    return html`
    <${BrowserWindow} url="${url}">
        <div class="py-12 px-12 bg-white rounded shadow-xl z-20 my-20 w-5/6">
            <nav class="mb-6">
                <h2 class="font-bold text-xl">A List-o-Links</h2>
                <div class="flex flex-row justify-center">
                    <button 
                        class="mr-4 underline text-blue-500 visited:text-purple:500"
                        onClick=${() => changeRoute("one")}>
                        Go to page one
                    </button>
                    <br />
                    <button 
                        class="underline text-blue-500 visited:text-purple:500"
                        onClick=${() => changeRoute("two")}>
                        Go to page two
                    </button>
                </div>
            </nav>

            <${routes[route]} />
        </div>
    </${BrowserWindow}>
    `;
}

export { RoutingChangeDemo }