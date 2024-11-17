import express from "express";
import runpy from "./runpy.js";
import project from "./project.js";
import samba from "./samba.js"

const router = express.Router();

router.use("/runpy", runpy);
router.use("/project", project);
router.user("/sambaRoutes", samba)

export default router;
