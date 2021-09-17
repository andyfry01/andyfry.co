import { h } from 'https://unpkg.com/preact@latest?module';
import { useState } from "https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module";
import htm from "https://unpkg.com/htm?module";

const html = htm.bind(h);

import { BrowserWindow } from "./browser-window.mjs";

const PageOne = () => {
  return html`
    <h2>You're on <span class="text-pink-500">page one</span></h2>
    <p>(click on one of those sweet links to go to page two)</p>
  `;
};

const PageTwo = () => {
  return html`
    <h2>You're on <span class="text-green-500">page two</span></h2>
    <p>(neat how the url changed right?)</p>
  `;
};

const routes = {
  one: PageOne,
  two: PageTwo,
};

const urlFragments = {
  one: "page-one",
  two: "page-two",
};

const RoutingChangeDemo = () => {
  const [urlFragment, setUrlFragment] = useState("page-one");
  const [route, setRoute] = useState("one");

  const changeRoute = (route) => {
    setRoute(route);
    setUrlFragment(urlFragments[route]);
  };

  const urlCls = route === "one" ? "text-pink-500" : "text-green-500"

  const url = html`<span>https://a-website.com/</span
    ><span class=${urlCls}>${urlFragment}</span>`;
  const btnCls =
    "text-sm text-indigo-600 bg-transparent border border-solid border-indigo-600 hover:bg-indigo-600 hover:text-white active:bg-pink-600 font-bold uppercase px-2 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150";

  return html`
    <${BrowserWindow} url="${url}">
        <div class="my-0 md:my-24 flex justify-center items-center w-full">
            <div class="pt-8 pb-6 px-6 bg-white rounded shadow-xl my-6 w-11/12 md:w-8/12">
                <nav class="border relative border-indigo-700 border-solid rounded-sm pt-6 md:pt-8 pl-4 pr-4 pb-4 flex flex-row justify-center">
                <p class="text-sm inline p-2 absolute -top-8 left-2 bg-gray-700 text-white rounded-sm z-10">Fancy website nav</p>
                <button onClick=${() =>
                    changeRoute("one")} class=${btnCls}>Go to page one</button>
                <button onClick=${() =>
                    changeRoute("two")} class=${btnCls}>Go to page two</button>
                </nav>
                <${routes[route]} />
            </div>
        </div>
    </${BrowserWindow}>
    `;
};

export { RoutingChangeDemo };
