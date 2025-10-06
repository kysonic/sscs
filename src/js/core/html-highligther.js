const createHtmlRules = () => {
    const tagRule = '<\\/?[\\w\\-:]+(?:\\s+[^>]*)?\\/?>';
    const tagRegexp = new RegExp(tagRule, 'gi');
    const attributeRule = `(\\b\\w[\\w\\-]*)\\s*=\\s*("[^"]*"|'[^']*'|[^\\s>]+)`;
    const attributeRegexp = new RegExp(attributeRule, 'gi');
    const quoteRule = '\\"';
    const quoteRegexp = new RegExp(quoteRule, 'gi');
    const notBracketRule = '[^<]+';
    const notBracketRegexp = new RegExp(notBracketRule);
    const tagNameRule = '</?([\\w\\-:]+)';
    const tagNameRegexp = new RegExp(tagNameRule);

    const pattern = new RegExp(tagRule + '|' + notBracketRule, 'gi');

    return {
        tagRule,
        tagRegexp,
        attributeRule,
        attributeRegexp,
        quoteRule,
        quoteRegexp,
        notBracketRule,
        notBracketRegexp,
        tagNameRule,
        tagNameRegexp,
        pattern,
    };
};

const RULES = createHtmlRules();

export function createHtmlHighlighter() {
    return {
        highlightAttribute(content, name, value) {
            if (content.includes('html-')) {
                return content;
            }

            return `<span class="html-attribute">${name.replace(
                RULES.quoteRegexp,
                '',
            )}</span>=<span class="html-value">"${value.replace(RULES.quoteRegexp, '')}"</span>`;
        },

        highlightTag(match) {
            let highlighted = match[0].replace('<', '&lt;').replace('>', '&gt;');
            const tagNameMatch = match[0].match(RULES.tagNameRegexp);

            if (tagNameMatch) {
                const tagName = tagNameMatch[1];
                highlighted = highlighted.replace(tagName, `<span class="html-tag-name">${tagName}</span>`);
            }

            highlighted = highlighted.replace(RULES.attributeRegexp, (match, name, value) =>
                this.highlightAttribute(match, name, value),
            );

            return highlighted;
        },

        highlightText(match) {
            const highlighted = `<span class="html-text">${match[0]}</span>`;

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
                if (RULES.tagRegexp.test(match[0])) {
                    result += this.highlightTag(match);

                    return;
                }

                result += this.highlightText(match);
            });

            return result;
        },
    };
}
