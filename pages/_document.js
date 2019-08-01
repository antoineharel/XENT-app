import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
	render() {
		return (
			<Html>
				<Head />
				<body>
					<Main />
					{process.env.NODE_ENV === 'production' && <script src="/static/scripts/disdev.js" />}
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
