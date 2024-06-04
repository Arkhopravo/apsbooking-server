import mongoose from 'mongoose'
// const { Schema } = mongoose;

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'customer', 'employee'],
        default: 'customer'
    },
   picture: {
    type: String,
    default: 'https://img.freepik.com/free-photo/3d-render-boy-holding-camera-his-hands_1142-38602.jpg?size=338&ext=jpg&ga=GA1.1.1224184972.1711843200&semt=ais',
   },
   mobile: {
    type: String,
    requried: true,
    unique:true
   },
   address: {
    type:String,
    requried: true,
    unique:false,
   },
    bio: {
    type: String,
   }
},
{ timestamps: true}
);


export default mongoose.model("User",UserSchema )