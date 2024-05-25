import mongoose from 'mongoose'
// const { Schema } = mongoose;

const HotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    distance: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    photos: {
        type: [String],
        default:'https://static.leonardo-hotels.com/image/leonardohotelbucharestcitycenter_room_comfortdouble2_2022_4000x2600_7e18f254bc75491965d36cc312e8111f_1200x780_mobile_3.jpeg',
        
    },
    desc: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min:0,
        max: 5
    },
    
        rooms: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Room'
          }],
    
    
    cheapestPrice: {
        type: Number,
        required: true,
    },
    featured: {
        type: Boolean,
        default: false,
    },
});


export default mongoose.model("Hotel",HotelSchema )