import { h, Component, render } from 'https://unpkg.com/preact@latest?module';
import htm from 'https://unpkg.com/htm?module'
const html = htm.bind(h);

import { InitialSetup } from './initial-setup.mjs'
import { RoutingChangeDemo } from './routing-change-demo.mjs'
import { NoUrlChange } from './no-url-change.mjs'
import { PokedexDemo } from './pokedex-demo.mjs'
import { PokedexRouteChange } from './pokedex-route-change.mjs'
import { PokedexAccessibleRouteChange } from './pokedex-accessible-route-change.mjs'

render(html`<${NoUrlChange} />`, document.getElementById('no-url-change'))
render(html`<${RoutingChangeDemo} />`, document.getElementById('routing-change-demo'))
render(html`<${InitialSetup} />`, document.getElementById('app-initial-setup'))
render(html`<${PokedexDemo} />`, document.getElementById('pokedex-demo'))
render(html`<${PokedexRouteChange} />`, document.getElementById('pokedex-route-change'))
render(html`<${PokedexAccessibleRouteChange} />`, document.getElementById('pokedex-accessible-route-change'))