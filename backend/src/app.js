import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

app.use(
  cors({
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
    origin: "*",
  })
);


app.use(bodyParser.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.static("public"));

import productRoutes from "./routes/product.routes.js";

app.use("/api/v1/products", productRoutes);

export { app };
