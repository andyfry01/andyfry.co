import { h, Component, render } from "https://unpkg.com/preact@latest?module";
import htm from "https://unpkg.com/htm?module";
import { useState } from "https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module";

// Initialize htm with Preact
const html = htm.bind(h);

const Page = (props) => {
  const { label, title, onPageChange, animations } = props

  const baseWrapper = "py-12 px-12 bg-white rounded shadow-xl z-20 my-20"
  const wrappercls = animations ? `${baseWrapper} animate__animated animate__fadeInUp` : baseWrapper

  return html`<div class=${wrappercls}>
    <div>
      <h1 class="text-3xl font-bold text-center mb-4 cursor-pointer">
        ${title}
      </h1>
    </div>
    <div>
      <label for="demo-1">${label}</label>
      <input
        id="demo-1"
        type="text"
        placeholder="Fill in a value! (or not)"
        class="block text-sm p-4 rounded-lg w-full border outline-none bg-gray-100"
      />
    </div>
    <div class="text-center mt-6">
      <button
        class="py-3 w-64 text-xl text-white bg-purple-400 rounded"
        onClick=${() => onPageChange()}
      >
        Go to next step
      </button>
    </div>
  </div>`;
};

const PageOne = (props) => {
  const { animations, onPageChange } = props
  return html`<${Page} title="Step one ☝️" label="What is your name?" onPageChange=${onPageChange} animations=${animations} />`
}

const PageTwo = (props) => {
  const { animations, onPageChange } = props
  return html`<${Page} title="Step two ✌️" label="What is your quest?" onPageChange=${onPageChange} animations=${animations} />`
}

const App = (props) => {  
  const [url, setUrl] = useState("https://website.com/what-is-your-name");
  const [page, setPage] = useState("one")

  const { animations } = props

  const routes = { 
    "one": PageOne,
    "two": PageTwo
  }

  const onPageChange = () => {
    if (page === "one") {
      setPage("two") 
      setUrl("https://website.com/what-is-your-quest")
    }

    if (page === "two") {
      setPage("one") 
      setUrl("https://website.com/what-is-your-name")
    }
  }


  return html`
    <div aria-label="Pseudo browser window" class="browser w-full min-h-full">
      <div class="browser-navigation-bar">
        <i aria-label="close button"></i><i aria-label="minimize button"></i><i aria-label="fullscreen button"></i>
        <input aria-label="URL bar" class="url-bar" value=${url} />
      </div>

      <div class="browser-container">
        <div aria-live="polite" class="bg-purple-400 flex justify-center items-center">
          <${routes[page]} onPageChange=${onPageChange} animations=${animations} />
        </div>
      </div>
    </div>
  `;
}

render(html`<${App} animations=${false} />`, document.getElementById("no-animations"));
render(html`<${App} animations=${true} />`, document.getElementById("animations"));

