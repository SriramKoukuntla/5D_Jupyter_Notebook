import express from "express";
import { getDatabaseConnection } from "../entities.js";

const router = express.Router();

/**
 * request: pass in name as "name" and desc as "desc" in body of request as JSON object
 * returns json object with success message and data field, with newly inserted project:
 * {
    "message": "Project created successfully",
    "data": [
        {
            "id": 7,
            "name": "first project",
            "desc": "testing",
            "tree": "{\"code\":\"\",\"output\":\"\",\"images\":[],\"desc\":\"\",\"stage\":\"\",\"children\":[]}"
        }
    ]
}
 */
router.post("/createProject", async (req, res) => {
	try {
		const name = req.body.name;
		const desc = req.body.desc;
		const supabase = getDatabaseConnection();
		const root = {
			code: "",
			output: "",
			images: [],
			desc: "",
			stage: "",
			children: [],
		};

		const { data, error } = await supabase
			.from("projects")
			.insert({ name: name, desc: desc, tree: JSON.stringify(root) })
			.select();
		if (!data) {
			throw new Error(error);
		}
		return res.status(201).json({
			message: "Project created successfully",
			data,
		});
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
