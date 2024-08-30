import mongoose from "mongoose";

const interiorSchema = new mongoose.Schema({

    interiorName: {
        type: String,
        required: true,
        unique: true
    },

    description: {
        type: String,
        required: true,
        unique: true
    },

    priceI: {
        type: Number,
        required: true
    },

    interiorImageUrl: {
        type: String,
        required: true,
        unique: true
    }

});

const Interior = mongoose.model('interior', interiorSchema);
export default Interior;