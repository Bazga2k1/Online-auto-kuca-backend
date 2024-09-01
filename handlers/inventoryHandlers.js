import mongoose from "mongoose";

// Modeli
import Car from "../models/cars.js";
import Color from "../models/colors.js";
import Engine from "../models/engines.js";
import Interior from "../models/interiors.js";
import Rim from "../models/rims.js";

/* ------------------------------------------ Automobili ------------------------------------------ */

async function getCars() { // Getter za automobile u inventaru
    const cars = await Car.find();
    return cars.map((Car) => Car.toObject());
};

async function addCar(carData) { // Dodavanje novog automobila
    const car = new Car(carData);
    await car.save();
    return car.toObject();
};

/* ------------------------------------------------------------------------------------------------ */


/* --------------------------------------------- Boje --------------------------------------------- */

async function getColors() { // Getter za boje u inventaru
    const colors = await Color.find();
    return colors.map((Color) => Color.toObject());
};

async function addColor(colorData) { // Dodavanje nove boje
    const color = new Color(colorData);
    await color.save();
    return color.toObject();
};

/* ------------------------------------------------------------------------------------------------ */


/* -------------------------------------------- Motori -------------------------------------------- */

async function getEngines() { // Getter za motore u inventaru
    const engines = await Engine.find();
    return engines.map((Engine) => Engine.toObject());
};

async function addEngine(engineData) { // Dodavanje novog motora
    const engine = new Engine(engineData);
    await engine.save();
    return engine.toObject();
};

/* ------------------------------------------------------------------------------------------------ */


/* ------------------------------------------ Interijeri ------------------------------------------ */

async function getInteriors() { // Getter za interijere u inventaru
    const interiors = await Interior.find();
    return interiors.map((Interior) => Interior.toObject());
};

async function addInterior(interiorData) { // Dodavanje novog interijera
    const interior = new Interior(interiorData);
    await interior.save();
    return interior.toObject();
};

/* ------------------------------------------------------------------------------------------------ */


/* ------------------------------------------- Naplatci ------------------------------------------- */

async function getRims() { // Getter za naplatke u inventaru
    const rims = await Rim.find();
    return rims.map((Rim) => Rim.toObject());
};

async function addRim(rimData) { // Dodavanje novog seta naplataka
    const rim = new Rim(rimData);
    await rim.save();
    return rim.toObject();
}

/* ------------------------------------------------------------------------------------------------ */


// Export metoda
const methodsInv = {
    getCars,
    addCar,

    getColors,
    addColor,

    getEngines,
    addEngine,

    getInteriors,
    addInterior,

    getRims,
    addRim
};

export default methodsInv;