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
        type: Double,
        required: true
    },

    imageUrl: {
        type: String,
        required: true,
        unique: true
    }

});

const Color = moongose.model('color', colorSchema);
export default Color;