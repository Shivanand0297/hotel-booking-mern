import mongoose from "mongoose";
const { Schema } = mongoose

const UserSchema = new Schema(
    {
        username: {
            type: String,
            trim: true,
            required: true,
            unique: true
        },
        email: {
            type: String,
            require: true,
            unique: true
        },
        country: {
            type: String,
        },
        img: {
            type: String,
        },
        city: {
            type: String,
        },
        phone: {
            type: String,
        },
        password: {
            type: String,
            require: true
        },
        isAdmin: {
            type: Boolean,
            default: false
        },
        paymentId: String
    },
    {
        timestamps: true
    }
)

export default mongoose.model("User", UserSchema)