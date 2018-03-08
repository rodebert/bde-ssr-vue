import fetch from 'node-fetch';

const { CONTENT_API_BASE_URL } = process.env;
const cache = {};

import mockArticles from './mocks/articles';

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

function getArticleJson(responseJson) {
	if (!responseJson.cmsId) return { error: true, errorId: 1, message: 'Article not found' };

	const id = responseJson.cmsId;
	const title = responseJson.headlinePlain;
	const { teaserImg, teaserText } = getTeaserJson(responseJson);
	const body = responseJson.text.data.blocks.map(({ text, type }) => ({ text, type }));

	return { id, title, teaserImg, teaserText, body };
}

function getTeaserJson(responseJson) {
	const teaser = responseJson.teasers.variants[0];
	const teaserText = teaser.teaserText.data.blocks[0].text || null;
	const teaserImg = teaser.imageFragment ? teaser.imageFragment.image.binaryPath : null;

	return { teaserImg, teaserText }
}

export default getArticle;
