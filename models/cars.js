import mongoose from "mongoose";

const carSchema = new mongoose.Schema({

    carName: {
        type: String,
        required: true,
        unique: true
    },

    price: {
        type: Number,
        required: true,
    },

    carImageUrl: {
        type: String,
        required: true,
        unique: true
    }

});

const Car = mongoose.model('car', carSchema);
export default Car;