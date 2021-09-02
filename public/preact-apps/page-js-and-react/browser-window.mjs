import { React } from "https://unpkg.com/es-react/dev";
import htm from "https://unpkg.com/htm?module";
const html = htm.bind(React.createElement);

const Refresh = (props) => {
  const { onClick } = props
  return html`
    <button onClick=${onClick} aria-label="refresh-button">
      <svg
        class="refresh"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="none"
          stroke="#000"
          stroke-width="2"
          d="M20,8 C18.5974037,5.04031171 15.536972,3 12,3 C7.02943725,3 3,7.02943725 3,12 C3,16.9705627 7.02943725,21 12,21 L12,21 C16.9705627,21 21,16.9705627 21,12 M21,3 L21,9 L15,9"
        />
      </svg>
    </button>
  `;
};

const BrowserWindow = (props) => {
  const { children, url, onRefresh } = props;
  return html`
    <div
      aria-label="Pseudo browser window"
      class="browser w-full min-h-full"
      aria-live="polite"
    >
      <div class="browser-navigation-bar">
        <i aria-label="close button"></i>
        <i aria-label="minimize button"></i>
        <i aria-label="fullscreen button"></i>
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
