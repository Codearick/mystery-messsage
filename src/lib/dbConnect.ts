import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?: number
}

const connection: ConnectionObject = {};

async function dbConnect(): Promise <void> {
    if (connection.isConnected) {
        console.log("Already connected to Database!");
        return;
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || "", {});

        // console.log("DB On Console: ", db); // Check it once

        connection.isConnected = db.connections[0].readyState

        // console.log("connection OBJECT: ", db.connections) // Check it once

        console.log("DB Connected Successfully!");

    } catch (error) {
        console.log("DB Connection failed", error);
        process.exit(1);
    }
}

export default dbConnect;