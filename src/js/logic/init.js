import { store } from '../store/index.js';
import { binder } from '../store/binder.js';
import { updateInterfaceValues } from './interface.js';

function initDisplayProperties() {
    store.state.displayOffsetTop = true;
    store.state.displayOffsetLeft = true;
    store.state.displayClientTop = true;
    store.state.displayClientLeft = true;
    store.state.displayClientWidth = true;
    store.state.displayClientHeight = true;
    store.state.displayOffsetWidth = true;
    store.state.displayOffsetHeight = true;
    store.state.displayScrollTop = true;
    store.state.displayScrollHeight = true;
}

function initScroll() {
    rect.scrollTo(0, 206);
    store.state.scrollHeight = Math.round(rect.scrollHeight);
}

function init() {
    binder.init();
    // Init store values
    initScroll();
    initDisplayProperties();
    updateInterfaceValues();
}

init();
