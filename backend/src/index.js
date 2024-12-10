import dotenv from "dotenv";
import { app } from "./app.js";
import connectDB from "./db/index.js";

dotenv.config({
  path: "./.env",
});

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.error(`Express Error: ${error.message}`);
    });
    app.listen(process.env.PORT || 4000, () => {
      console.log(`Server is listening on port ${process.env.PORT || 4000}`);
    });
  })
  .catch((error) => {
    console.error(`MONGODB connection failed !!! Error: ${error.message}`);
  });
