import { h } from 'https://unpkg.com/preact@latest?module';
import { useState } from "https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module";

import htm from "https://unpkg.com/htm?module";
const html = htm.bind(h);

import { BrowserWindow } from "./browser-window.mjs";

const PageOne = (props) => {

  return html`
    <h2>You're on <span class="text-pink-500">page one</span></h2>
    <p>(click on one of those sweet links to go to page two)</p>
  `;
};

const PageTwo = () => {
  return html`
    <h2>You're on <span class="text-pink-500">page two</span></h2>
    <p>
      ... but so far as the browser is concerned, this is all just the same
      "page" :(
    </p>
    <p>(☝️ click the refresh icon and see what happens)</p>
  `;
};

const routes = {
  one: PageOne,
  two: PageTwo,
};

const NoUrlChange = () => {
  const [route, setRoute] = useState("one");
  const [showSassyMsg, setShowSassyMsg] = useState(false);

  const changeRoute = (route, resetSassyMsg) => {
    if (resetSassyMsg) {
      setShowSassyMsg(false);
    }

    setRoute(route);
  };

  const handleRefresh = () => {
    if (route === "two") {
      setShowSassyMsg(true);
    }

    return changeRoute("one", false);
  };

  const url = html`<span class="text-pink-500">https://a-website.com/</span>`;

  const renderToast = () => {
    return showSassyMsg
      ? html`<div
          class="text-center text-xl cursor-pointer w-full p-2 bg-red-500 shadow text-white absolute top-20 left-0 right-0 z-20"
        >
          Oh sorry, were you on page two and expecting to stay there after
          refreshing? I had no idea 😨
        </div>`
      : null;
  };

  const btnCls = "text-sm text-indigo-600 bg-transparent border border-solid border-indigo-600 hover:bg-indigo-600 hover:text-white active:bg-pink-600 font-bold uppercase px-2 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"

  return html`
    <${BrowserWindow} url="${url}" onRefresh=${() => handleRefresh()}>
      <div aria-live="polite">${renderToast()}</div>
      <div class="my-0 md:my-24 flex justify-center items-center w-full">
        <div class="pt-8 pb-6 px-6 bg-white rounded shadow-xl my-6 w-11/12 md:w-8/12">
            <nav class="border relative border-indigo-700 border-solid rounded-sm pt-6 md:pt-8 pl-4 pr-4 pb-4 flex flex-row justify-center">
              <p class="text-sm inline p-2 absolute -top-8 left-2 bg-gray-700 text-white rounded-sm z-10">Fancy website nav</p>
              <button onClick=${() => changeRoute("one", true)} class=${btnCls}>Go to page one</button>
              <button onClick=${() => changeRoute("two", true)} class=${btnCls}>Go to page two</button>
            </nav>
            <${routes[route]}/>
        </div>
      </div>
    </${BrowserWindow}>
    `;
};

export { NoUrlChange };
