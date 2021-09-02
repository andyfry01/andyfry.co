import { React, ReactDOM } from 'https://unpkg.com/es-react/dev'
import htm from 'https://unpkg.com/htm?module'
const html = htm.bind(React.createElement);

import { InitialSetup } from './initial-setup.mjs'
import { RoutingChangeDemo } from './routing-change-demo.mjs'

ReactDOM.render(html`<${RoutingChangeDemo} />`, document.getElementById('routing-change-demo'))
ReactDOM.render(html`<${InitialSetup} />`, document.getElementById('app-initial-setup'))
