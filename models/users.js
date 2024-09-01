import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    companyName: {
        type: String,
        required: true,
        unique: true
    },

    ownerFullName: {
        type: String,
        required: true
    },

    userOIB: {
        type: Number,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    }

});

const User = mongoose.model('user', userSchema);
export default User;