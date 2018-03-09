import fetch from 'node-fetch';

const { CONTENT_API_BASE_URL } = process.env;
const cache = {};

import { mockArticles, mockTweet } from './mocks/';

const getTweetData = (id) => {
	return fetch(`https://publish.twitter.com/oembed?url=https%3A%2F%2Ftwitter.com%2FInterior%2Fstatus%2F${id}`)
		.then(response => response.json().catch(err => Promise.resolve(mockTweet)));
}

const loadArticle = (articleId) => {
	const mockArticle = () => Promise.resolve(mockArticles[articleId]);

	return fetch(`${CONTENT_API_BASE_URL}${articleId}`)
		.catch(mockArticle)
		.then(response => response.json().catch(mockArticle))
		.then(json => getArticleJson(json))
};

async function getArticle(articleId) {
	if (!articleId) {
		return {};
	}

	const articleJson = await loadArticle(articleId);
	cache[articleId] = articleJson;
	return articleJson;
}

async function getArticleJson(responseJson) {
	if (!responseJson.cmsId) return { error: true, errorId: 1, message: 'Article not found' };

	const id = responseJson.cmsId;
	const title = responseJson.headlinePlain;
	const { teaserImg, teaserText } = getTeaserJson(responseJson);
	const body = responseJson.text.data.blocks.map(({ text, type }) => ({ text, type }));

	// add tweet data
	body.push({
		key: '12312dasdasdaasd',
		type: 'tweet',
		data: await getTweetData('965993478273622016')
	});

	return { id, title, teaserImg, teaserText, body };
}

function getTeaserJson(responseJson) {
	const teaser = responseJson.teasers.variants[0];
	const teaserText = teaser.teaserText.data.blocks[0].text || null;
	const teaserImg = teaser.imageFragment ? teaser.imageFragment.image.binaryPath : null;

	return { teaserImg, teaserText }
}

export default getArticle;
