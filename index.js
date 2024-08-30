import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import methodsInv from "./handlers/inventoryHandlers.js";
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

// Registracija nove firme
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

});


// Glavne rute
router.route('/').get(async (req, res) => {
    try {
        const cars = await methodsInv.getCars();
        res.status(200).json(cars);

    } catch (error){
        console.log("The error causing the failed fetch: ", error)
        res.status(500).json({ error: "Failed to fetch inventory!" });
    }
});