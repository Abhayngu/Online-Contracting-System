const express = require('express');
const dotenv = require('dotenv');

const app = express();

// body parser
app.use(express.json());

// Setting up dotenv path
dotenv.config({ path: './config/config.env' });

// Starting server
app.listen(
	process.env.PORT,
	console.log(`server started at port ${process.env.PORT}`)
);
