import { createApp } from '../src/app';

export default context => {
	return new Promise((resolve, reject) => {
		const { app, router, store } = createApp();
		router.push(context.url);

		router.onReady(() => {
			const matchedComponents = router.getMatchedComponents()

			if (!matchedComponents.length) {
				return reject({ code: 404 })
			}

			Promise.all(
				matchedComponents
					.filter(Component => !!Component.asyncData)
					.map(Component => Component.asyncData({
						store,
						route: router.currentRoute
					}))
			).then(() => {
				context.state = store.state
				resolve(app)
			}).catch(reject);
		}, reject);
	});
};
