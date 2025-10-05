function divideNodes(node, attr, bind) {
    const states = node.dataset[attr].split('&&');

    return states.map((state) => ({
        bind: bind,
        prop: state.split(':')[0].trim(),
        interpolation: state.trim(),
        hasInterpolation: state.split(':').length > 1,
        node,
    }));
}

export function createStoreBinder(store) {
    let nodes = [];

    return {
        init() {
            // Collect all binding by category
            nodes = nodes.concat(
                Array.from(document.querySelectorAll('*[data-bind-text]')).map((node) =>
                    divideNodes(node, 'bindText', 'Text'),
                ),
            );

            nodes = nodes.concat(
                Array.from(document.querySelectorAll('*[data-bind-show]')).map((node) =>
                    divideNodes(node, 'bindShow', 'Show'),
                ),
            );

            nodes = nodes.concat(
                Array.from(document.querySelectorAll('*[data-bind-class]')).map((node) =>
                    divideNodes(node, 'bindClass', 'Class'),
                ),
            );

            nodes = nodes.concat(
                Array.from(document.querySelectorAll('*[data-bind-style]')).map((node) =>
                    divideNodes(node, 'bindStyle', 'Style'),
                ),
            );

            nodes = nodes.flat();

            store.subscribe(this.handleStoreChange.bind(this));
        },

        handleStoreChange(newState, changes, prop) {
            const items = nodes.filter((item) => item.prop === prop);

            if (items.length) {
                items.forEach((item) => {
                    const action = item.bind;
                    this[`handle${action}`](item, changes[prop], newState, prop);
                });
            }
        },

        handleText(item, value) {
            const v = item.hasInterpolation ? eval(item.interpolation.replace('value', value)) : value;
            item.node.textContent = v;
        },

        handleClass(item, value) {
            const className = item.interpolation.split(':')[1];
            item.node.classList[Boolean(value) ? 'add' : 'remove'](className);
        },

        handleShow(item, value) {
            item.node.style.display = value ? 'flex' : 'none';
        },

        handleStyle(item, value) {
            const props = item.interpolation.split(':')[1];

            for (let prop of props.split(';')) {
                const [p, v] = prop.split('=');
                item.node.style[p.trim()] = eval(v.trim().replace('value', value));
            }
        },
    };
}
