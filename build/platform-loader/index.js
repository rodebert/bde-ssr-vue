const deindent = require('de-indent');

const { parseHTML } = require('./parser');

const { PLATFORM } = process.env;
/**
 * Loosley base on https://github.com/vuejs/vue/blob/dev/src/sfc/parser.js
 */
function parseComponent(content, options) {
	let result = '';
	let depth = 0;
	let currentStart = 0;
	let skip = false;

	function start(tag, attrs, unary, start, end) {
		if (depth === 0) {

			const platformAttr = attrs.find(attr => attr.name === 'platform');

			if (platformAttr && platformAttr.value !== PLATFORM) {
				skip = true;
			}
			else {
				let cumulatedAttrs = attrs.reduce((cumulated, { name, value }) => {
					cumulated += ` ${name}${value ? `="${value}"` : ''}`;
					return cumulated;
				}, '');

				currentStart = end;
				result += `<${tag}${cumulatedAttrs}>`;
			}
		}

		if (!unary) {
			depth++
		}
	}

	function end(tag, start, end) {
		if (depth === 1) {
			if (skip) {
				skip = false;
			}
			else {
				let text = deindent(content.slice(currentStart, start));
				result += text;
				result += "</" + tag + ">";
			}
		}

		depth--;
	}

	parseHTML(content, {
		start,
		end
	});

	return result;
}


module.exports = function (source) {
	if (!PLATFORM) {
		return source;
	}

	const regEx = new RegExp(`<(template|script|style) platform="${PLATFORM}">`);

	return regEx.test(source) ? parseComponent(source) : source;
};
