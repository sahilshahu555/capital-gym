import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    is_active: {
        type: Boolean,
        required: true
    },
    fee_paid: {
        type: Boolean,
        required: true
    },
    joining_date: {
        type: String,
        required: true, 
    }
    

},{ timestamps: true })

export const User =
    mongoose.models.User || mongoose.model('User', UserSchema)