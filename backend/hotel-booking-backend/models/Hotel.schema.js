import mongoose from "mongoose";
const { Schema } = mongoose

const HotelSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
        },
        type: {
            type: String,
            require: true
        },
        city: {
            type: String,
            require: true
        },
        address: {
            type: String,
            require: true
        },
        distance: {
            type: String,
            require: true
        },
        title: {
            type: String,
            required: true,
        },
        desc: {
            type: String,
            require: true
        },
        photos: {
            type: [String],
        },
        rooms: {
            type: [String], //to store room id's
        },
        rating: {
            type: Number,
            min: 0,
            max: 5
        },
        cheapestPrice: {
            type: Number,
            require: true
        },
        feautred: {
            type: Boolean,
            default: false
        }

    },
    {
        timestamps: true
    }
)

export default mongoose.model("Hotel", HotelSchema)