const Router = require('nextjs-dynamic-routes');

//========================== ROUTES ============================

const routes = [
	{
		name: 'home',
		pattern: '/'
	},
	{
		name: 'not_found',
		pattern: '/*'
	}
];

//===============================================================

const router = new Router();

for (var i = 0; i < routes.length; i++) router.add(routes[i]);
module.exports = router;
