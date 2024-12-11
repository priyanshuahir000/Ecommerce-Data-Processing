import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true, // credentials: true is required for setting cookies
  })
);
app.use(bodyParser.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.static("public"));

import ecommerce_dataset_route from "./routes/ecommerce_dataset.route.js";

app.use("/api/v1", ecommerce_dataset_route);

export { app };
