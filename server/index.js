const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const app = express();

// body parser
app.use(express.json());

// Setting up dotenv path
dotenv.config({ path: './config/config.env' });

// Connecting to data base
const connectToDataBase = async () => {
	const c = await mongoose.connect(process.env.DB, {});
	console.log('Database connected ', c.connection.host);
};

// Starting server
app.listen(
	process.env.PORT,
	console.log(`server started at port ${process.env.PORT}`)
);

connectToDataBase();
