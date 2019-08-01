const DEV_API_URL = 'http://localhost:1337';
const PROD_API_URL = 'http://localhost:1337';

const API_URL = process.env.NODE_ENV == 'development' ? DEV_API_URL : PROD_API_URL;

export const api_route = (path) => API_URL + path;

export default {
	API_URL,
	LOGIN_ERROR_REDIRECT_ROUTE: { client: 'home', server: '/' }
};
