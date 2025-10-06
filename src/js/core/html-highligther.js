const AT_LEAST_ONE_LETTER = /\w+/;
const IS_TAG = /<\/?[\w\-:]+(?:\s+[^>]*)?\/?>/;
const IS_ATTRIBUTE = /(\b\w[\w\-]*)\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi;
const IS_QUOTE = /\"/g;

export function createHtmlHighlighter() {
    return {
        highlightAttribute(content, name, value) {
            if (content.includes('html-')) {
                return content;
            }

            return `<span class="html-attribute">${name.replace(
                IS_QUOTE,
                '',
            )}</span>=<span class="html-value">"${value.replace(IS_QUOTE, '')}"</span>`;
        },

        highlightTag(content) {
            let highlighted = content.replace('<', '&lt;').replace('>', '&gt;');
            const tagNameMatch = content.match(/<\/?([\w\-:]+)/);

            if (tagNameMatch) {
                const tagName = tagNameMatch[1];
                highlighted = highlighted.replace(tagName, `<span class="html-tag-name">${tagName}</span>`);
            }

            highlighted = highlighted.replace(IS_ATTRIBUTE, (match, name, value) =>
                this.highlightAttribute(match, name, value),
            );

            return highlighted;
        },

        highlight(text) {
            let result = '';

            const matches = [];

            const pattern = /<\/?[\w\-:]+(?:\s+[^>]*)?\/?>|[^<]+/gi;

            let match;
            while ((match = pattern.exec(text)) !== null) {
                matches.push({
                    content: match[0],
                    index: match.index,
                });
            }

            matches
                //.filter((token) => Boolean(AT_LEAST_ONE_LETTER.test(token.content)))
                .forEach((token, i) => {
                    if (IS_TAG.test(token.content)) {
                        result += this.highlightTag(token.content);

                        return;
                    }

                    result += `<span class="html-text">${token.content}</span>`;
                });

            return result;
        },
    };
}
