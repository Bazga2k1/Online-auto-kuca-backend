import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
import { AutoEncryptionLoggerLevel } from "mongodb";

const app = express();
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://Admin:<db_password>@cars.pgsyb.mongodb.net/?retryWrites=true&w=majority&appName=cars";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

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