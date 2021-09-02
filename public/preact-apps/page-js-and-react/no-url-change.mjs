import React, { useState } from "https://unpkg.com/es-react/dev";
import htm from "https://unpkg.com/htm?module";
const html = htm.bind(React.createElement);

import { BrowserWindow } from "./browser-window.mjs";

const PageOne = () => {
  return html`
    <h2>You're on <span class="text-pink-500">page one</span></h2>
    <p>(click on one of those sweet links to go to page two)</p>
  `;
};

const PageTwo = () => {
  return html`
    <h2>You're on <span class="text-pink-500">page two</span></h2>
    <p>... but so far as the browser is concerned, this is all just the same "page" :(</p>
    <p>(☝️ click that little refresh icon and see what happens)</p>
  `;
};

const routes = {
  one: PageOne,
  two: PageTwo,
};

const NoUrlChange = () => {
  const [route, setRoute] = useState("one");
  const [hasRefreshed, setHasRefreshed] = useState(false)
  const [sassyMsg, setSassyMsg] = useState("")

  const changeRoute = (route) => {
    if (route === "two" && hasRefreshed) {

    }
    setRoute(route);
  };

  const handleRefresh = () => {
    if (!hasRefreshed) {
      setHasRefreshed(true)
      return changeRoute("one");
    }

    setRoute("one");
  }

  const url = html`<span class="text-pink-500">https://a-website.com/</span>`;

  return html`
    <${BrowserWindow} url="${url}" onRefresh=${() => handleRefresh()}>
        <div class="py-12 px-12 bg-white rounded shadow-xl z-20 my-20 w-5/6">
            <nav class="mb-6">
                <h2 class="font-bold text-xl">Fancy Website Navigation 👌</h2>
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
};

export { NoUrlChange };
