// import express from "express";
import dotenv from "dotenv";
// import mongoose from 'mongoose'
// import authRoute from "./routes/auth.js"
// import hotelsRoute from './routes/hotels.js'
// import usersRoute from './routes/users.js'
// import roomsRoute from './routes/rooms.js'
// import cookieParser from "cookie-parser"
// import cors from 'cors'

// const app = express();

dotenv.config();


// const connect = async () => {
//     try {
//         await mongoose.connect(
//           'mongodb://Arkhopravo:Arkhopravo@cluster0.jblawby.mongodb.net/booking?retryWrites=true&w=majority'
//         );
//         console.log("Connected to mongoDB");
//       } catch (error) {
//         throw error;
//       };
    
// }

// mongoose.connection.on("disconnected", ()=>{
//     console.log("mongoDB disconnected"); 
// })

// mongoose.connect(
//   'mongodb://Arkhopravo:Arkhopravo@cluster0.jblawby.mongodb.net/booking?retryWrites=true&w=majority'
//   // 'mongodb+srv://arkhopsarkar:4wimyFN5FMTgEaUf@cluster0.2au5ams.mongodb.net/?retryWrites=true&w=majority'
//   // 'mongodb+srv://arkhopsarkar:4wimyFN5FMTgEaUf@cluster0.2au5ams.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
//   )
//   .then(() => {
//       console.log("mongodb connected with the server!");
//   })
//   .catch(err => {
//       console.log(err);
      
//   })



// app.use((err, req,res,next) => {
//    const  errorStatus = err.status || 500
//    const  errorMessage = err.message || "something went wrong"
//    return res.status(500).json({
//     success:false,
//     status:errorStatus,
//     message:errorMessage,
//     stack: err.stack,
//    })
// })
// //middlewaras
// app.use(cookieParser());
// app.use(cors());
// app.use(express.json());
// app.use("/api/auth", authRoute);
// app.use("/api/users", usersRoute);
// app.use("/api/hotels", hotelsRoute);
// app.use("/api/rooms", roomsRoute);


// app.listen(8800, ()=> {
    
//     console.log("Connected to backend.!");
// })


import express from "express";
import authRoute from "./routes/auth.js"
import hotelsRoute from './routes/hotels.js'
import usersRoute from './routes/users.js'
import roomsRoute from './routes/rooms.js'
import cookieParser from "cookie-parser"
import cors from 'cors'
import {connect} from 'mongoose'

const app = express();



// mongodb connection
connect(
  process.env.MONGO_DB
  )
  .then(() => {
      console.log("mongodb connected with the server!");
  })
  .catch(err => {
      console.log(err);
      
  })




  app.use((err, req,res,next) => {
    const  errorStatus = err.status || 500
    const  errorMessage = err.message || "something went wrong"
    return res.status(500).json({
     success:false,
     status:errorStatus,
     message:errorMessage,
     stack: err.stack,
    })
 })

//middlewaras
app.use(cookieParser());

app.use(cors(
  {
    origin: ['http://localhost:3000']
  }
));

app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);


app.get('/test', (req, res) => {
  res.send("I am working")
})



app.listen(8800, ()=> {
  
  console.log("Connected to backend.!");
})