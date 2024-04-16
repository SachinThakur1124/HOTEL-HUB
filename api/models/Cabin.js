import mongoose from 'mongoose';

const CabinSchema = new mongoose.Schema({
    name:{
        type: String,
        required : true,
    },
    type:{
        type: String,
        required : true,
    },
    city:{
        type: String,
        required : true,
    },
    img: {
        type: String,
      },
    address:{
        type: String,
        required : true,
    },
    distance:{
        type: String,
        required : true,
    },
    photos:{
        type: [String],
    },
    title:{
        type: String,
        required : true,
    },
    desc:{
        type: String,
        required : true,
    },
    rating:{
        type: Number,
        min:0,
        max:5,
    },
    cheapestPrice:{
        type: Number,
        required : true,
    },
    innerDesc:{
        type: String,
        required: true
     },
});

export default mongoose.model("Cabin", CabinSchema);