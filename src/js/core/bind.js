export function createStoreBinder(store) {
    let nodes = null;

    return {
        init() {
            nodes = new Map(
                Array.from(document.querySelectorAll('*[data-bind]')).map((node) => [
                    node.dataset.bind.split(':')[1],
                    node,
                ]),
            );

            store.subscribe(this.handleStoreChange.bind(this));
        },

        handleStoreChange(newState, changes, prop) {
            const node = nodes.get(prop);

            const action = node.dataset.bind.split(':')[0];

            this[`handle${action.toUpperCase()}`](node, newState[prop], newState, prop);
        },

        handleTEXT(node, value) {
            node.textContent = value;
        },
    };
}
