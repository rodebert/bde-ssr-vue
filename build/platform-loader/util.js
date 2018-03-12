/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
 const makeMap = (str, expectsLowerCase) => {
	const map = Object.create(null);
	const list = str.split(',');
	for (let i = 0; i < list.length; i++) {
		map[list[i]] = true
	}
	return expectsLowerCase
		? val => map[val.toLowerCase()]
		: val => map[val];
}

/**
 * Always return false.
 */
const no = (a, b, c) => false;

// HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
// Phrasing Content https://html.spec.whatwg.org/multipage/dom.html#phrasing-content

const isNonPhrasingTag = makeMap(
	'address,article,aside,base,blockquote,body,caption,col,colgroup,dd,' +
	'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,' +
	'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,' +
	'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,' +
	'title,tr,track'
);

module.exports = { makeMap, no, isNonPhrasingTag };
