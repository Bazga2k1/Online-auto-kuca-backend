import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import methodsInv from "./handlers/inventoryHandlers.js";
import methodsUsr from "./handlers/userHandlers.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import Order from "./models/orders.js";
dotenv.config({ path: `./.env` });

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json({ limit: '40mb' }));
app.use(bodyParser.urlencoded({ limit: '40mb', extended: true }));
app.use(cookieParser());

mongoose.connect(process.env.MONGO_URI,)
  .then(() => app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  }))
.catch((error) => console.log(error));

console.log("Loaded .env file with MONGO_URI:", process.env.MONGO_URI);

/* ----------------------------------------- Registracija ----------------------------------------- */
app.post("/register", async (req, res) => {
  const { companyName, ownerFullName, userOIB, email, password } = req.body;

  try {
      const existingUser = await methodsUsr.findCompany(companyName, userOIB);

      if (existingUser) { // Provjera postojanja firme u bazi
          return res.status(400).json({ error: "Ova firma je već registrirana!" });
      }

      const newUser = await methodsUsr.addUser({ companyName, ownerFullName, userOIB, email, password });

      res.status(201).json({ companyName: newUser.companyName, userOIB: newUser.userOIB });
      console.log("Firma", companyName, "uspješno registrirana sa vlasnikom", ownerFullName);
  } catch (error) {
      console.error("Error during registration:", error);
      res.status(500).json({ error: "Failed to register user!" });
  }
});

/* ------------------------------------------------------------------------------------------------ */


/* ------------------------------------------- Prijava ------------------------------------------- */
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await methodsUsr.findUserByEmail(email);
  
      if (!user) {
        return res.status(400).json({ error: "User not found!" });
    };
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: "Invalid credentials" });
    };
  
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET_KEY
    );

      res.json({ token });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Server error" });
    };
});

app.get('/login/auth-status', (req, res) => {
  const token = req.headers['authorization'].split(' ')[1];

  if (!token) {
    return res.status(401).json({ userExists: false });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ userExists: false });
    }

    res.status(200).json({ userExists: true });
  });
});

app.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out successfully' });
});
/* ----------------------------------------------------------------------------------------------- */


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
      const { engineName, displacement, power, torque, economy, fuelType, priceE, engineImageUrl } = req.body;
      const newEngine = await methodsInv.addEngine({ engineName, displacement, power, torque, economy, fuelType, priceE, engineImageUrl });
      res.status(201).json(newEngine);
      console.log("New engine", engineName, "added!");
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
      const { interiorName, description, priceI, interiorImageUrl } = req.body;
      const newInterior = await methodsInv.addInterior({ interiorName, description, priceI, interiorImageUrl });
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
      const { colorName, type, priceC, colorImageUrl } = req.body;
      const newColor = await methodsInv.addColor({ colorName, type, priceC, colorImageUrl });
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
      console.log("Narudžba zaprimljena!");
  } catch (error) {
      console.error("Error adding new order:", error);
      res.status(500).json({ error: "Failed to add order!" });
  }
});

app.post('/orders/find', async (req, res) => {
    try {
      const order = await Order.findOne(req.body);
  
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
  
      res.status(200).json({ orderId: order._id });
    } catch (error) {
      console.error("Error finding order:", error);
      res.status(500).json({ error: "Failed to find order" });
    }
  });

/* ------------------------------------------------------------------------------------------------ */


/* ------------------------------------------- Korisnici ------------------------------------------- */
app.get('/users', async (req, res) => {
  try {
      const users = await methodsUsr.getUsers();
      res.status(200).json(users);
  } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "Failed to fetch users!" });
  }
});

app.post('/users', async (req, res) => {
  try {
      const { companyName, ownerFullName, userOIB, email, password } = req.body;
      const newUser = await methodsUsr.addUser({ companyName, ownerFullName, userOIB, email, password });
      res.status(201).json(newUser);
  } catch (error) {
      console.error("Error adding new user:", error);
      res.status(500).json({ error: "Failed to add user!" });
  }
});