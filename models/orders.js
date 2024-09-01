import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({

    selectedCar: {
        type: String,
        required: true,
    },

    selectedCarPrice: {
        type: Number,
        required: true,
    },

    selectedRim: {
        type: String,
        required: true,
    },

    selectedRimPrice: {
        type: Number,
        required: true,
    },

    selectedEngine: {
        type: String,
        required: true,
    },

    selectedEnginePrice: {
        type: Number,
        required: true,
    },

    selectedInterior: {
        type: String,
        required: true,
    },

    selectedInteriorPrice: {
        type: Number,
        required: true,
    },

    selectedColor: {
        type: String,
        required: true,
    },

    selectedColorPrice: {
        type: Number,
        required: true,
    },

    totalOrderPrice: {
        type: Number,
        required: true
    },

    deliveryLocation: {
        type: String,
        required: true,
    }

});