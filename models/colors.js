import mongoose from "mongoose";

const colorSchema = new mongoose.Schema({

    colorName: {
        type: String,
        required: true,
        unique: true
    },

    type: {
        type: String,
        required: true
    },

    priceC: {
        type: Number,
        required: true
    },

    colorImageUrl: {
        type: String,
        required: true,
        unique: true
    }

});

const Color = mongoose.model('color', colorSchema);
export default Color;