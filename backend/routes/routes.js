import express from "express";
import runpy from "./runpy.js";
import project from "./project.js";

const router = express.Router();

router.use("/runpy", runpy);
router.use("/project", project);

export default router;
