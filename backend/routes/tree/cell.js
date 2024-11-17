class Cell {
	constructor({ code, output, images, description, stage }) {
		this.code = code;
		this.output = output;
		this.images = images;
		this.desc = description;
		this.stage = stage; // Assign stage properly
		this.children = []; // Initialize children as an empty array
	}
}
