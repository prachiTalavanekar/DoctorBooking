// import express from 'express'
// import cors from 'cors'
// import 'dotenv/config'
// import connectDB from './config/mongodb.js'
// import connectCloudinary from './config/cloudinary.js'
// import adminRouter from './routes/adminRoute.js'


// // app config
// const app =express()
// const port = process.env.PORT || 4000
// connectDB()
// connectCloudinary()

// // middlewares
// app.use(express.json())
// app.use(cors())

// // api endpoints
// app.use('/api/admin',adminRouter)
// //localhost:4000/api/admin/add-doctor


// app.get('/',(req,res)=>{
// res.send('API is working properly..❤️')
// })

// app.listen(port,()=> console.log("server started on port ➡️ ",port))


import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/userRoute.js';
import chatbotRouter from './routes/chatbotRoute.js';
import translateRoute from './routes/translateRoute.js'


// App config
dotenv.config();
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();


// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

// Routes
app.use('/api/admin', adminRouter);
app.use('/api/doctor',doctorRouter);
app.use('/api/user', userRouter)
app.use('/api/chatbot', chatbotRouter)
app.use('/api/chatbot', translateRoute);
app.use('/api', translateRoute); // 👈 This makes /api/translate available


app.get('/', (req, res) => {
  res.send('API is working properly..❤️');
});

app.listen(port, () => console.log(`Server started on port ➡️  ${port}`));
