import User from "../models/users.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

function _excludeProperties(obj, excludedProps) {
    let result = { ...obj };
    excludedProps.forEach((prop) => {
      const { [prop]: _, ...rest } = result;
      result = rest;
    });
    return result;
};

async function _generatePassword(password) { // Hashiranje lozinke
    return await bcrypt.hash(password, 10);
};

async function _comparePasswords(password, hashPassword) { // Usporedba lozinki hashiranjem unesene lozinke
    return bcrypt.compare(password, hashPassword);
};

async function getUsers() {
    const users = await User.find();
    return users.map((user) => user.toObject());
};

async function addUser(userData) {
    const user = new User(userData);
    const securePass = await _generatePassword(user.password);
    user.password = securePass;
    await user.save();
    return _excludeProperties(user.toObject(), ["password"]);
};

async function checkUser(email, password) {
    const user = await User.findOne({ email: email });
    if (!user) {
      return null;
    }
    const pass = await _comparePasswords(password, user.password);
    
    return pass ? _excludeProperties(user.toObject(), ["password"]) : null;
};

async function findUserByEmail(email) {
    return await User.findOne({ email });
};

async function findCompany(companyName, userOIB){
    return await User.findOne({ companyName, userOIB });
};


const methodsUsr = {
    getUsers,
    addUser,
    checkUser,
    findUserByEmail,
    findCompany
};

export default methodsUsr;