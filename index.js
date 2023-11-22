import express from "express";
import bodyParser from "body-parser";
import {router} from './routes/user.js'
import { connectMongo } from "./connection.js";

const app = express();
const port = 8000;

connectMongo("mongodb://localhost:27017/user-app")

app.use(bodyParser.json());

app.use('/user',router)

app.listen(port, () => console.log("Listening on Port 8000..."));