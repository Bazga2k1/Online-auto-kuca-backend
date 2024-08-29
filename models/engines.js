import mongoose from "mongoose";

const engineSchema = new moongose.Schema({

    engineName: {
        type: String,
        required: true,
        unique: true
    },

    displacement: {
        type: Int32,
        required: true
    },

    power: {
        type: Int32,
        required: true
    },

    torque: {
        type: Int32,
        required: true
    },

    economy: {
        type: Double,
        required: true
    },

    fuelType: {
        type: String,
        required: true
    },

    priceE: {
        type: Double,
        required: true
    },

    imageUrl: {
        type: String,
        required: true
    }

});

const Engine = moongose.model('engine', engineSchema);
export default Engine;