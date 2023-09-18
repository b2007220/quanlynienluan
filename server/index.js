const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./routes');
const { queryParser } = require('express-query-parser');

const app = express();

app.use(
	queryParser({
		parseNull: true,
		parseUndefined: true,
		parseBoolean: true,
		parseNumber: true,
	}),
);

app.use(
	cors({
		origin: '*',
	}),
);

app.use(bodyParser.json());

app.use('/api', router);

app.use((error, req, res, next) => {
	console.log(error);
	res.status(500).json({ message: 'Something went wrong' });
});

app.listen(3000, () => {
	console.log('Server is running at port 3000');
});
