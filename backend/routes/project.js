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
		const supabase = getDatabaseConnection();
		const name = req.body.name;
		const desc = req.body.desc;
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

/**
 * Body of request must be a JSON object containing any number of the three fields, "name", "desc", "tree". Must pass in request 
 * Returns a JSON object containing a field called "message" with a success message and a list called "data", where the sole entry is the new version of the updated project
 * Ex:
 * 
 * Request: localhost:8080/api/project/updateProject/1
 * {
    "desc": "test"
 * }
	Response:
	{
		"message": "Project updated successfully",
		"data": [
			{
				"id": 1,
				"name": "first project",
				"desc": "test",
				"tree": "{\"code\":\"\",\"output\":\"\",\"images\":[],\"desc\":\"\",\"stage\":\"\",\"children\":[]}"
			}
		]
	}
 */
router.patch("/updateProject/:id", async (req, res) => {
	try {
		const supabase = getDatabaseConnection();
		const id = req.params.id;
		if (!id) {
			throw new Error("No id provided!");
		}

		const { data, error } = await supabase
			.from("projects")
			.update(req.body)
			.eq("id", id)
			.select();
		if (!data) {
			throw new Error(error);
		}
		return res.status(200).json({
			message: "Project updated successfully",
			data,
		});
	} catch (error) {
		res.status(500).json(error);
	}
});

/**
 * Must pass id in request through params
 * Returns a JSON object containing a field called "message" with a success message and a list called "data", where the sole entry is the deleted project
 * Ex:
 * 
 * Request: localhost:8080/api/project/deleteProject/1
	Response:
	{
		"message": "Project deleted successfully",
		"data": [
			{
				"id": 1,
				"name": "first project",
				"desc": "test",
				"tree": "{\"code\":\"\",\"output\":\"\",\"images\":[],\"desc\":\"\",\"stage\":\"\",\"children\":[]}"
			}
		]
	}
 */
router.delete("/deleteProject/:id", async (req, res) => {
	try {
		const supabase = getDatabaseConnection();
		const id = req.params.id;
		if (!id) {
			throw new Error("No id provided!");
		}

		const { data, error } = await supabase
			.from("projects")
			.delete()
			.eq("id", id)
			.select();
		if (!data) {
			throw new Error(error);
		}
		return res.status(200).json({
			message: "Project deleted successfully",
			data,
		});
	} catch (error) {
		res.status(500).json(error);
	}
});

export default router;
