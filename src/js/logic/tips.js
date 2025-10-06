import { store } from '../store/index.js';
import { TIPS } from '../data/tips.js';

window.addEventListener('click', (event) => {
    if (event.target.dataset.tip) {
        store.state.tip = TIPS[event.target.dataset.tip] ?? 'XXX';
        store.state.tipTitle = event.target.dataset.tip;
    }
});

closeDialog.addEventListener('click', () => {
    store.state.tip = '';
});
