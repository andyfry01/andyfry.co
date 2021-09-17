import { h } from 'https://unpkg.com/preact@latest?module';
import { useState } from "https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module";
import htm from "https://unpkg.com/htm?module";
import { BrowserWindow } from "./browser-window.mjs";

const html = htm.bind(h);


const Charmander = () => {
  return html`
    <div>
      <p class="font-bold text-lg">Charmander's Pokedex Entry</p>
      <div class="videoWrapper" style=${{ "--aspect-ratio": "3 / 4" }}>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/oyhQQIeU-JY"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        >
        </iframe>
      </div>
    </div>
  `;
};

const Bulbasaur = () => {
  return html`
    <div>
      <p class="font-bold text-lg">Bulbasaur's Pokedex Entry</p>
      <div class="videoWrapper" style=${{ "--aspect-ratio": "3 / 4" }}>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/F_-x2ErAtsA"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        >
        </iframe>
      </div>
    </div>
  `;
};

const Snorlax = () => {
  return html`
    <div>
      <p class="font-bold text-lg">Snorlax's Pokedex Entry</p>
      <div class="videoWrapper" style=${{ "--aspect-ratio": "3 / 4" }}>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/GXNc8QDH-Dc"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        >
        </iframe>
      </div>
    </div>
  `;
};

const routes = {
  charmander: { component: Charmander, urlFragment: "charmander" },
  snorlax: { component: Snorlax, urlFragment: "bulbasaur" },
  bulbasaur: { component: Bulbasaur, urlFragment: "snorlax" },
};

const PokedexRouteChange = () => {
  const [urlFragment, setUrlFragment] = useState(routes.charmander.urlFragment);
  const [route, setRoute] = useState("charmander");

  const changeRoute = (route) => {
    setRoute(route);
    setUrlFragment(routes[route].urlFragment);
  };

  const url = html`<span>https://pokedex.co.jp/</span
    ><span class="text-pink-500">${urlFragment}</span>`;

  return html`
    <${BrowserWindow} url="${url}">
      <div class="my-0 md:my-24 flex justify-center items-center w-full">
        <div class="pt-8 pb-6 px-6 bg-white rounded shadow-xl my-6 w-11/12 md:w-8/12">
          <nav class="border relative border-indigo-700 border-solid rounded-sm pt-6 md:pt-8 pl-4 pr-4 pb-4 flex flex-row justify-center mb-6">
            <p class="text-sm inline p-2 absolute -top-8 left-2 bg-gray-700 text-white rounded-sm z-10">Pokedex Browser</p>
            <div class="flex flex-col md:flex-row justify-start align-center md:justify-center">
                  <button 
                      class="mr-4 underline text-blue-500 visited:text-purple:500"
                      onClick=${() => changeRoute("charmander")}>
                      Charmander 🔥
                  </button>
                  <br />
                  <button 
                      class="underline text-blue-500 visited:text-purple:500 mr-4"
                      onClick=${() => changeRoute("snorlax")}>
                      Snorlax 😴
                  </button>
                  <button 
                      class="underline text-blue-500 visited:text-purple:500"
                      onClick=${() => changeRoute("bulbasaur")}>
                      Bulbasaur 🌱
                  </button>
              </div>
          </nav>
            <${routes[route].component} />
        </div>
      </div>
    </${BrowserWindow}>
    `;
};

export { PokedexRouteChange };
