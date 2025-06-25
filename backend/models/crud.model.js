import mongoose from "mongoose";

const crudSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"]
        },
        title: {
            type: String,
            required: [true, "title is required"],

        },
        message: {
            type: String,
            required: [true, "message is required"]
        },
        email: {
            type: String,
            unique: false,  // Explicitly set to non-unique
            required: false // Not required
        },
        photo: {
            type: String,
            required: false // URL to the profile photo
        }
    },
    { timestamps: true }
);

export const Crud = mongoose.model("Crud", crudSchema);