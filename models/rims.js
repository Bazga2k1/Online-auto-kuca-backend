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
        type: Double,
        required: true
    },

    imageUrl: {
        type: String,
        required: true,
        unique: true
    }

});

const Rim = moongose.model('rim', rimSchema);
export default Rim;