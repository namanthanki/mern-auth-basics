import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import User from "./models/User.js";
import jwt from "jsonwebtoken";

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://naman:9026878868$=UchihaMongo@auth-test.uyw5cof.mongodb.net/?retryWrites=true&w=majority")

app.post("/api/register", async (req, res) => {
    console.log(req.body);
    try {
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
        res.json({ status: "ok" })
    } catch(error) {
        res.json({ status: "error", error: `${error.message}`});
    }
})



app.post("/api/login", async(req, res) => {
    const foundUser = await User.findOne({
        email: req.body.email,
        password: req.body.password
    })

    if(foundUser) {
        const token = jwt.sign(
            {
                name: foundUser.name,
                email: foundUser.email
            }, 
            'lrie4636ytoruetf424goa646dudpqw2342522reyf242ewihfelwido'
        )

        return res.json({ status: "ok", user: token });
    } else {
        return res.json({ status: "error", user: false });
    }
})

app.get("/api/content", async (req, res) => {
    const token = req.headers["x-access-token"];

    try {
        const decoded = jwt.verify(token, "lrie4636ytoruetf424goa646dudpqw2342522reyf242ewihfelwido");
        const email = decoded.email;
        const user = await User.findOne({ email: email });

        return res.json({ status: "ok", content: user.content });
    } catch(error) {
        console.log(error);
        return res.json({ status: "error", error: "Invalid Token" })
    }
})

app.post("/api/content", async (req, res) => {
    const token = req.headers["x-access-token"];

    try {
        const decoded = jwt.verify(token, "lrie4636ytoruetf424goa646dudpqw2342522reyf242ewihfelwido");
        const email = decoded.email;
        await User.updateOne(
            { email: email },
            { $set: { content: req.body.content }}
        );

        return res.json({ status: "ok" });
    } catch(error) {
        console.log(error);
        return res.json({ status: "error", error: "Invalid Token" })
    }
})

app.listen(7803, () => {
    console.log("Listening to Server");
})