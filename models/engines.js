import mongoose from "mongoose";

const engineSchema = new mongoose.Schema({

    engineName: {
        type: String,
        required: true,
        unique: true
    },

    displacement: {
        type: Number,
        required: true
    },

    power: {
        type: Number,
        required: true
    },

    torque: {
        type: Number,
        required: true
    },

    economy: {
        type: Number,
        required: true
    },

    fuelType: {
        type: String,
        required: true
    },

    priceE: {
        type: Number,
        required: true
    },

    engineImageUrl: {
        type: String,
        required: true
    }

});

const Engine = mongoose.model('engine', engineSchema);
export default Engine;