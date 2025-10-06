const createCssRules = () => {
    const selectorRule = '\\s*(\\.|#)(\\w+) {\\s*';
    const selectorRegexp = new RegExp(selectorRule, 'gi');
    const propertyRule = '([\\w-]+):[s]*([\\w\\d%,()\\s]+);\\s+';
    const propertyRegexp = new RegExp(propertyRule, 'gi');
    const closeSelectorRule = '\\s*}\\s*';
    const closeSelectorRegexp = new RegExp(closeSelectorRule);
    const pattern = new RegExp(selectorRule + '|' + propertyRule + '|' + closeSelectorRule, 'gi');

    return {
        selectorRule,
        selectorRegexp,
        propertyRule,
        propertyRegexp,
        closeSelectorRule,
        closeSelectorRegexp,
        pattern,
    };
};

const RULES = createCssRules();

export function createCssHighlighter() {
    return {
        highlightProperty(match) {
            let highlighted = match[0];

            highlighted = highlighted
                .replace(match[3], `<span class="css-property">${match[3]}</span>`)
                .replace(match[4], `<span class="css-value">${match[4]}</span>`);

            return highlighted;
        },

        highlightSelector(match) {
            let highlighted = match[0];

            highlighted = highlighted.replace(match[2], `<span class="css-selector">${match[2]}</span>`);

            return highlighted;
        },

        highlightCloseSelector(match) {
            let highlighted = match[0];

            return highlighted;
        },

        highlight(text) {
            let result = '';

            const matches = [];

            let match;
            while ((match = RULES.pattern.exec(text)) !== null) {
                matches.push(match);
            }

            matches.forEach((match, i) => {
                if (RULES.selectorRegexp.test(match[0])) {
                    result += this.highlightSelector(match);
                }

                if (RULES.propertyRegexp.test(match[0])) {
                    result += this.highlightProperty(match);
                }

                if (RULES.closeSelectorRegexp.test(match[0])) {
                    result += this.highlightCloseSelector(match);
                }
            });

            return result;
        },
    };
}
