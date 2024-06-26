import dotenv from "dotenv";
import express, { Express } from "express";
import cors, { CorsOptions } from "cors";
import UserRouter from "../src/domains/User/controllers/index";
import MusicRouter from "../src/domains/Music/controllers/index";
import ArtistRouter from "../src/domains/Artist/controllers/index";
import cookieParser from 'cookie-parser';

dotenv.config();

export const app: Express = express();

const options : CorsOptions = {
  credentials: true,
  origin: process.env.APP_URL
};


app.use(cookieParser());
app.use(cors(options));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use("/api/users", UserRouter);
app.use("/api/musics", MusicRouter);
app.use("/api/artists", ArtistRouter);

export default app;