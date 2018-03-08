import getArticle from './get_article';

const getStage = (articleIds) => {
	return Promise.all(articleIds.map(articleId => getArticle(articleId)));
}

export default getStage;
