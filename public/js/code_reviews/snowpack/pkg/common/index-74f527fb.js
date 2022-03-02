import { i as isObject } from './index-4c963986.js';
import { i as isWindow } from './index-c18b9186.js';

function isNode (val) {
  if (!isObject(val) || !isWindow(window) || typeof window.Node !== 'function') {
    return false
  }

  return typeof val.nodeType === 'number' &&
    typeof val.nodeName === 'string'
}

var isDom = isNode;

export { isDom as i };
