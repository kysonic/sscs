import { createStore } from '../core/store.js';

// Store support only first level props
export const store = createStore({
    // Display
    displayOffsetTop: true,
    displayOffsetLeft: true,
    displayClientTop: true,
    displayClientLeft: true,
    displayClientWidth: true,
    displayClientHeight: true,
    displayOffsetWidth: true,
    displayOffsetHeight: true,
    displayScrollTop: true,
    displayScrollHeight: true,
    displayScrollTopByHeight: true,
    // Values
    offsetTop: 0,
    offsetLeft: 0,
    clientTop: 0,
    clientLeft: 0,
    clientWidth: 0,
    clientHeight: 0,
    offsetWidth: 0,
    offsetHeight: 0,
    scrollTop: 0,
    scrollHeight: 0,
    // Rect
    rectSize: 300,
    rectBorder: 50,
    rectPadding: 20,
    // Globals
    showHtml: false,
    tip: '',
    tipTitle: ''
});

// COMPUTED

function computedScrollTopVisual(state) {
    store.emit(
        'scrollTopVisual',
        state['scrollTop'] - state['rectBorder'] > 0 ? state['scrollTop'] - state['rectBorder'] : 0,
    );
}

function computedScrollHeightVisual(state) {
    const value = state['scrollHeight'] - state['offsetHeight'] + state['clientTop'] - state['scrollTop'];
    store.emit('scrollHeightVisual', value > 0 ? value : 0);
}

function computedDisplayScrollTop(state) {
    store.emit(
        'computedDisplayScrollTop',
        state['scrollTop'] - state['rectBorder'] > state['rectBorder'] / 2 && state['displayScrollTop'],
    );
}

store.subscribe((state, changes, prop) => {
    switch (prop) {
        case 'scrollTop':
            computedScrollTopVisual(state);
            computedDisplayScrollTop(state);
            computedScrollHeightVisual(state);
            break;
        case 'displayScrollTop':
            computedDisplayScrollTop(state);
            break;
        case 'scrollHeight':
            computedScrollHeightVisual(state);
        case 'offsetHeight':
            computedScrollHeightVisual(state);
        case 'clientTop':
            computedScrollHeightVisual(state);
            break;
        default:
            break;
    }
});
