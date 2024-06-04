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
    default: '',
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