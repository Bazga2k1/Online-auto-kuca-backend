import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import methodsInv from "./handlers/inventoryHandlers.js";
import bodyParser from "body-parser";
dotenv.config({ path: `./.env` });

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json({ limit: '40mb' }));
app.use(bodyParser.urlencoded({ limit: '40mb', extended: true }));

  mongoose.connect(process.env.MONGO_URI,)
  .then(() => app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  }))
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
app.get('/cars', async (req, res) => {
    try {
        const cars = await methodsInv.getCars();
        res.status(200).json(cars);

    } catch (error){
        console.log("The error causing the failed fetch: ", error)
        res.status(500).json({ error: "Failed to fetch inventory!" });
    }
});

app.post('/cars', async (req, res) => {
	try {
        const { carName, price, carImageUrl } = req.body;
        const newCar = await methodsInv.addCar({ carName, price, carImageUrl });
        res.status(201).json(newCar);
		console.log("New car added!");
    } catch (error) {
        console.error("Error adding new car:", error);
        res.status(500).json({ error: "Failed to add car!" });
    }
});