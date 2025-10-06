import { store } from '../store/index.js';
import { updateInterfaceValues } from './interface.js';
import { code } from '../data/code.js';
import { cssHighlighter, htmlHighlighter } from '../services/highlighters.js';

// Resize
window.addEventListener('resize', updateInterfaceValues);

// Scroll
rect.addEventListener('scroll', () => {
    store.state.scrollTop = Math.round(rect.scrollTop);
    store.state.scrollHeight = Math.round(rect.scrollHeight);
});

// Buttons
buttons.addEventListener('click', (e) => {
    if (e.target.dataset.bindClass) {
        const storeProperty = e.target.dataset.bindClass.split(':')[0];

        store.state[storeProperty] = !store.state[storeProperty];
    }
});

// Inputs
size.addEventListener('change', (e) => {
    store.state.rectSize = e.target.value;
});

border.addEventListener('change', (e) => {
    store.state.rectBorder = e.target.value;
});

padding.addEventListener('change', (e) => {
    store.state.rectPadding = e.target.value;
});

const rectPropsToCssVars = {
    rectSize: '--rect-size',
    rectBorder: '--rect-border-size',
    rectPadding: '--rect-padding-size',
};

// Handle Rect properties changes
store.subscribe((state, changes, prop) => {
    if (Object.keys(rectPropsToCssVars).includes(prop)) {
        document.documentElement.style.setProperty(rectPropsToCssVars[prop], state[prop] + 'px');
        updateInterfaceValues();
        // Update CSS so how vars changed
        cssCode.innerHTML = cssHighlighter.highlight(code.CSS(state['rectSize'], state['rectBorder'], state['rectPadding']));
    }
});

showHtml.addEventListener('click', () => {
    store.state.showHtml = true;
});

showSchema.addEventListener('click', () => {
    store.state.showHtml = false;
});
