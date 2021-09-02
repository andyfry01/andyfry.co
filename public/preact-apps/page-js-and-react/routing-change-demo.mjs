import React, {
    useState,
} from 'https://unpkg.com/es-react/dev';
import htm from 'https://unpkg.com/htm?module'
const html = htm.bind(React.createElement);

import { BrowserWindow } from './browser-window.mjs'

const PageOne = () => {
    return html`
        <h2>You're on page one</h2>
        <p>(click on one of those sweet links to go to page two)</p>
    `
}


const PageTwo = () => {
    return html`
        <h2>You're on page two</h2>
        <p>(neat how the url changed right?)</p>
    `
}

const routes = {
    one: PageOne,
    two: PageTwo
}

const urlFragments = {
    one: "first-page",
    two: "second-page"
}

const RoutingChangeDemo = () => {
    const [urlFragment, setUrlFragment] = useState("test")
    const [route, setRoute] = useState("one")

    const changeRoute = route => {
        setRoute(route)
        setUrlFragment(urlFragments[route])
    }

    const url = html`<span>https://a-website.com/</span><div class="draw-border">${urlFragment}</div>`
    

    return html`
    <${BrowserWindow} url="${url}">
    ${url}
        <div class="py-12 px-12 bg-white rounded shadow-xl z-20 my-20">
            <nav>
                <button 
                    class="underline text-blue-500 visited:text-purple:500"
                    onClick=${() => changeRoute("one")}>
                    Go to page one
                </button>
                <br />
                <button 
                    class="underline text-blue-500 visited:text-purple:500"
                    onClick=${() => changeRoute("two")}>
                    Go to page two
                </button>
            </nav>

            <${routes[route]} />
        </div>
    </${BrowserWindow}>
    `
}

export { RoutingChangeDemo }