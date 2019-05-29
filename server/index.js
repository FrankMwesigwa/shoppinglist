import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import items from './items/routes';

const app = express();
dotenv.config();

//here we are using bodyparse middleware
app.use(bodyParser.json());

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected .... '))
    .catch(err => console.log(err));

app.use('/api/items', items)

const port = process.env.PORT || 9005

app.listen(port, () => console.log(`Server started on port ${port}`))