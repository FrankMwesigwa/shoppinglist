import mongoose from 'mongoose';
import router from '../profiles/routes';
import profile from '../profiles/profile';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log('MongoDB Connected .... ');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;
