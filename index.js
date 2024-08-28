import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: `./.env` });

const app = express();
const router = express.Router();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected"))
  .catch((error) => console.log(error));

console.log("Loaded .env file with MONGO_URI:", process.env.MONGO_URI);

// Registracija
app.post("/register", (req, res) => {
    const { ime_firme, ime_prezime, oib, email, password } = req.body;
  
    if (users.some((user) => user.ime_firme === ime_firme && user.oib === oib)) { // Provjera postojanja registracije
      return res.status(400).json({ error: "Ova firma je već registrirana!" });
    }
  
    const newUser = {
      id: users.length + 1,
      ime_firme,
      ime_prezime,
      oib,
      email,
      password 
    };
  
    users.push(newUser);
  
    res.status(201).json({ id: newUser.id, ime_firme: newUser.ime_firme, oib: newUser.oib });


let cars = [];
let rims = [];
let engines = [];
let interiors = [];
let colors = [];

// Inventar automobila
app.get('/', (req, res) => {
    res.json(cars);
});

app.post('/', (req, res) => { // Odabir automobila
    let odabirAuto = req.body;
    cars.push(odabirAuto);
    res.json(odabirAuto);
});

// Inventar naplataka
app.get('/konfiguracija1', (req, res) => {
    res.json(rims);
});

app.post('/konfiguracija1', (req, res) => { // Odabir naplataka
    let OdabirNap = req.body;
    rims.push(OdabirNap);
    res.json(OdabirNap);
});

// Inventar motora
app.get('/konfiguracija2', (req, res) => {
    res.json(engines);
});

app.post('/konfiguracija2', (req, res) => { // Odabir motora
    let odabirMot = req.body;
    engines.push(odabirMot);
    res.json(odabirMot);
});

// Inventar interijera
app.get('/konfiguracija3', (req, res) => {
    res.json(interiors);
});

app.post('/konfiguracija3', (req, res) => { // Odabir interijera
    let odabirInt = req.body;
    interiors.push(odabirInt);
    res.json(odabirInt);
});

// Inventar boja
app.get('/konfiguracija4', (req, res) => {
    res.json(colors);
});

app.post('/konfiguracija4', (req, res) => { // Odabir boja
    let odabirBoj = req.body;
    colors.push(odabirBoj);
    res.json(odabirBoj);
});

// Total narudžbe
app.post('/narudzba', (req, res) => {
    let narudzba = req.body.narudzba;
    let deliveryLocation = req.body.deliveryLocation;
    //let total_price = calculateTotalPrice(narudzba);
    res.json({narudzba: narudzba, deliveryLocation: deliveryLocation, total_price: total_price});
});

/* Funkcija za izračunavanje sveukupne cijene
function calculateTotalPrice(order) {

    return 0;
}*/

});