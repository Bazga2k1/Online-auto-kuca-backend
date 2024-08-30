import mongoose from "mongoose";

// Modeli
import Car from "../models/cars.js";
import Color from "../models/colors.js";
import Engine from "../models/engines.js";
import Interior from "../models/interiors.js";
import Rim from "../models/rims.js";

async function getCars() { // Getter za automobile u inventaru
    const cars = await Car.find();
    return cars.map((Car) => Car.toObject());
};

async function getColors() { // Getter za boje u inventaru
    const colors = await Color.find();
    return colors.map((Color) => Color.toObject());
};

async function getEngines() { // Getter za motore u inventaru
    const engines = await Engine.find();
    return engines.map((Engine) => Engine.toObject());
};

async function getInteriors() { // Getter za interijere u inventaru
    const interiors = await Interior.find();
    return interiors.map((Interior) => Interior.toObject());
}

async function getRims() { // Getter za naplatke u inventaru
    const rims = await Rim.find();
    return rims.map((Rim) => Rim.toObject());
};

// Export metoda
const methodsInv = {
    getCars,
    getColors,
    getEngines,
    getInteriors,
    getRims
};

export default methodsInv;