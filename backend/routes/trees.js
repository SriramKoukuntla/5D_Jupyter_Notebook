import express from "express";

const router = express.Router();

router.post("/createNode", async (req, res) => {
	try {
		const parentNode = req.body.parent;
		const childNode = req.body.info;
	} catch (error) {
		res.status(500).json(error);
	}
});

// router.patch("/updateParentNode", async (req, res) => {
//     try {
//         const newChildren = req.body.children;
//         const {code, output, images, description, stage}
//     }
// });

export default router;
