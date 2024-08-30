import mongoose from "mongoose";

const rimSchema = new mongoose.Schema({

    rimName: {
        type: String,
        required: true,
        unique: true
    },

    rimSize: {
        type: String,
        required: true
    },

    priceR: {
        type: Number,
        required: true
    },

    rimImageUrl: {
        type: String,
        required: true,
        unique: true
    }

});

const Rim = mongoose.model('rim', rimSchema);
export default Rim;