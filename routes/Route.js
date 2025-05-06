import express from "express";
import { testController } from "../controllers/Controller.js";

// router object
const router = express.Router();

// Define route and controller
router.get("/", testController);

export default router;