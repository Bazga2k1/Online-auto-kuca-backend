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
        type: Double,
        required: true
    },

    imageUrl: {
        type: String,
        required: true,
        unique: true
    }

});

const Interior = moongose.model('interior', interiorSchema);
export default Interior;