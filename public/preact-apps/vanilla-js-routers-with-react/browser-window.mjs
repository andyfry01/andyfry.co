import { h } from 'https://unpkg.com/preact?module';
import htm from "https://unpkg.com/htm?module";
const html = htm.bind(h);

const Refresh = (props) => {
  const { onClick } = props
  return html`
    <button class="toolbar-btn" onClick=${onClick} aria-label="refresh-button">
      <svg
        class="button-svg"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path
          fill="none"
          stroke="#000"
          stroke-width="2.25"
          d="M20,8 C18.5974037,5.04031171 15.536972,3 12,3 C7.02943725,3 3,7.02943725 3,12 C3,16.9705627 7.02943725,21 12,21 L12,21 C16.9705627,21 21,16.9705627 21,12 M21,3 L21,9 L15,9"
        />
      </svg>
    </button>
  `;
};

const BackButton = props => {
  const { onClick } = props
  return html`
    <button class="toolbar-btn" onClick=${onClick} aria-label="back-button">
      <svg class="button-svg" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 16 16">
        <rect width="16" height="16" id="icon-bound" fill="none" />
        <polygon stroke="#000"
          stroke-width="0.1" points="8.414,13.586 3.828,9 16,9 16,7 3.828,7 8.414,2.414 7,1 0,8 7,15" />
      </svg>
    </button>`
}

const ForwardsButton = props => {
  const { onClick } = props
  return html`
    <button class="toolbar-btn" onClick=${onClick} aria-label="forwards-button">
      <svg class="button-svg" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 16 16" style=${{transform: 'rotate(180deg'}}>
        <rect width="16" height="16" id="icon-bound" fill="none" />
        <polygon stroke="#000"
          stroke-width="0.1" points="8.414,13.586 3.828,9 16,9 16,7 3.828,7 8.414,2.414 7,1 0,8 7,15" />
      </svg>
    </button>`
}

const BrowserWindow = (props) => {
  const { children, tab, url, onRefresh } = props;
  const renderTab = () => {
    if (tab) {
      return html`<div class="tab">${tab}</div>`
    }
  }
  return html`
    <div
      aria-label="Pseudo browser window"
      class="browser w-full min-h-full"
      aria-live="polite"
    >
      <div class="browser-tab-bar">
        <i aria-label="close button"></i>
        <i aria-label="minimize button"></i>
        <i aria-label="fullscreen button"></i>
        ${renderTab()}
      </div>
      <div class="browser-navigation-bar">
        <${BackButton} onClick=${() => null} />
        <${ForwardsButton} onClick=${() => null} />
        <${Refresh} onClick=${onRefresh} />
        <div aria-label="URL bar" class="url-bar">${url}</div>
      </div>

      <div class="browser-container">
        <div
          aria-live="polite"
          class="bg-blue-300 flex justify-center items-center"
        >
          ${children}
        </div>
      </div>
    </div>
  `;
};

export { BrowserWindow };
