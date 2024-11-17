import express from "express";
import runpy from "./runpy.js";

const router = express.Router();

router.use("/runpy", runpy);

export default router;
