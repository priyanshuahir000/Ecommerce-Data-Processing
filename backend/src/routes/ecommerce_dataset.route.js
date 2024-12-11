import { Router } from "express";
import { getAllUser } from "../controllers/ecommerce_dataset.controller.js";

const router = Router();

router.route("/all").get(getAllUser);

export default router;
