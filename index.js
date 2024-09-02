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
/* ------------------------------------------ Automobili ------------------------------------------ */
app.get('/cars', async (req, res) => {
    try {
        const cars = await methodsInv.getCars();
        res.status(200).json(cars);

    } catch (error){
        console.log("The error causing the failed fetch: ", error)
        res.status(500).json({ error: "Failed to fetch cars!" });
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

/* ------------------------------------------------------------------------------------------------ */


/* ------------------------------------------- Naplatci ------------------------------------------- */
app.get('/rims', async (req, res) => {
  try {
      const rims = await methodsInv.getRims();
      res.status(200).json(rims);
  } catch (error) {
      console.error("Error fetching rims:", error);
      res.status(500).json({ error: "Failed to fetch rims!" });
  }
});

app.post('/rims', async (req, res) => {
  try {
      const { rimName, rimSize, priceR, rimImageUrl } = req.body;
      const newRim = await methodsInv.addRim({ rimName, rimSize, priceR, rimImageUrl });
      res.status(201).json(newRim);
      console.log("New rim,", rimName, "added!");
  } catch (error) {
      console.error("Error adding new rim:", error);
      res.status(500).json({ error: "Failed to add rim!" });
  }
});

/* ------------------------------------------------------------------------------------------------ */


/* -------------------------------------------- Motori -------------------------------------------- */
app.get('/engines', async (req, res) => {
  try {
      const engines = await methodsInv.getEngines();
      res.status(200).json(engines);
  } catch (error) {
      console.error("Error fetching engines:", error);
      res.status(500).json({ error: "Failed to fetch engines!" });
  }
});

app.post('/engines', async (req, res) => {
  try {
      const { engineName, horsepower } = req.body;
      const newEngine = await methodsInv.addEngine({ engineName, horsepower });
      res.status(201).json(newEngine);
  } catch (error) {
      console.error("Error adding new engine:", error);
      res.status(500).json({ error: "Failed to add engine!" });
  }
});

/* ------------------------------------------------------------------------------------------------ */


/* ------------------------------------------ Interijeri ------------------------------------------ */
app.get('/interiors', async (req, res) => {
  try {
      const interiors = await methodsInv.getInteriors();
      res.status(200).json(interiors);
  } catch (error) {
      console.error("Error fetching interiors:", error);
      res.status(500).json({ error: "Failed to fetch interiors!" });
  }
});

app.post('/interiors', async (req, res) => {
  try {
      const { interiorType, material } = req.body;
      const newInterior = await methodsInv.addInterior({ interiorType, material });
      res.status(201).json(newInterior);
  } catch (error) {
      console.error("Error adding new interior:", error);
      res.status(500).json({ error: "Failed to add interior!" });
  }
});

/* ------------------------------------------------------------------------------------------------ */


/* --------------------------------------------- Boje --------------------------------------------- */
app.get('/colors', async (req, res) => {
  try {
      const colors = await methodsInv.getColors();
      res.status(200).json(colors);
  } catch (error) {
      console.error("Error fetching colors:", error);
      res.status(500).json({ error: "Failed to fetch colors!" });
  }
});

app.post('/colors', async (req, res) => {
  try {
      const { colorName, hexValue } = req.body;
      const newColor = await methodsInv.addColor({ colorName, hexValue });
      res.status(201).json(newColor);
  } catch (error) {
      console.error("Error adding new color:", error);
      res.status(500).json({ error: "Failed to add color!" });
  }
});

/* ------------------------------------------------------------------------------------------------ */


/* ------------------------------------------- Narudžbe ------------------------------------------- */
app.get('/orders', async (req, res) => {
  try {
      const orders = await methodsInv.getOrders();
      res.status(200).json(orders);
  } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).json({ error: "Failed to fetch orders!" });
  }
});

app.post('/orders', async (req, res) => {
  try {
      const orderData = req.body;
      const newOrder = await methodsInv.addOrder(orderData);
      res.status(201).json(newOrder);
  } catch (error) {
      console.error("Error adding new order:", error);
      res.status(500).json({ error: "Failed to add order!" });
  }
});

/* ------------------------------------------------------------------------------------------------ */


/* ------------------------------------------- Korisnici ------------------------------------------- */
app.get('/users', async (req, res) => {
  try {
      const users = await methodsInv.getUsers();
      res.status(200).json(users);
  } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "Failed to fetch users!" });
  }
});

app.post('/users', async (req, res) => {
  try {
      const { companyName, ownerFullName, userOIB, email, password } = req.body;
      const newUser = await methodsInv.addUser({ companyName, ownerFullName, userOIB, email, password });
      res.status(201).json(newUser);
  } catch (error) {
      console.error("Error adding new user:", error);
      res.status(500).json({ error: "Failed to add user!" });
  }
});