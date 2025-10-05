import { store } from '../store/index.js';

export function updateInterfaceValues() {
    store.state.offsetTop = rect.offsetTop;
    store.state.offsetLeft = rect.offsetLeft;
    store.state.clientTop = rect.clientTop;
    store.state.clientLeft = rect.clientLeft;
    store.state.clientHeight = rect.clientHeight;
    store.state.offsetHeight = rect.offsetHeight;
    store.state.offsetWidth = rect.offsetWidth;
    store.state.clientWidth = rect.clientWidth;
    store.state.scrollTop = rect.scrollTop;
    store.state.scrollHeight = rect.scrollHeight;
}
