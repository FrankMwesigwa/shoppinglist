import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import connectDB from './configs/db';
import users from './users/routes';
import auth from './auth/routes';
import profile from './profiles/routes';
import posts from './posts/routes';

const app = express();
dotenv.config();

connectDB();

//here we are using bodyparse from the express library
app.use(express.json());

app.use('/users', users);
app.use('/account', auth);
app.use('/profile', profile);
app.use('/posts', posts);

//Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 9005;

app.listen(port, () => console.log(`Server started on port ${port}`));
