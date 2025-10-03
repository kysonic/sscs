export function createStore(initialState = {}) {
    const subscribers = new Set();

    let state = new Proxy(initialState, {
        set(target, property, value) {
            const oldValue = target[property];
            target[property] = value;

            if (oldValue !== value) {
                subscribers.forEach((callback) => callback({ ...target }, { [property]: value }, property));
            }

            return true;
        },
    });

    return {
        get state() {
            return state;
        },

        setState(newState) {
            Object.assign(state, newState);
        },

        subscribe(callback) {
            subscribers.add(callback);
            return () => subscribers.delete(callback);
        },

        reset() {
            Object.keys(state).forEach((key) => delete state[key]);
            Object.assign(state, { ...initialState });
        },
    };
}
