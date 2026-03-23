import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect("mongodb+srv://ghulevaishzzz2004_db_user:wQ9lMkjKiNkUlVHN@cluster0.pfx1jl.mongodb.net/TechQuiz")
    .then(() => {
        console.log("DB CONNECTED")
    })
};