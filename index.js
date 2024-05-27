import dotenv from "dotenv";

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






import express from "express";
import authRoute from "./routes/auth.js"
import hotelsRoute from './routes/hotels.js'
import usersRoute from './routes/users.js'
import roomsRoute from './routes/rooms.js'
import cookieParser from "cookie-parser"
import cors from 'cors'
import {connect} from 'mongoose'

const app = express();


const port = process.env.PORT || 8800;

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
    origin: ['http://localhost:3000', 'https://apsbooking.onrender.com']
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



app.listen(port, ()=> {
  
  console.log("Connected to backend.!");
})