import { store } from '../store/index.js';
import { binder } from '../store/binder.js';
import { updateInterfaceValues } from './interface.js';
import { code } from '../data/code.js';
import { cssHighlighter, htmlHighlighter } from '../services/highlighters.js';



function initScroll() {
    rect.scrollTo(0, 252);
    store.state.scrollHeight = Math.round(rect.scrollHeight);
}

function initCodeBlocks() {
    htmlCode.innerHTML = htmlHighlighter.highlight(code.HTML());
    cssCode.innerHTML = cssHighlighter.highlight(code.CSS());
}

function init() {
    binder.init();
    store.init();
    // Init store values
    initScroll();
    updateInterfaceValues();
    initCodeBlocks();
    // Loading
    store.state.loading = true;
}

init();
