const express = require("express");
const server = express();

server.use(express.json());

let people = [
	{ id: 1, name: "José", email: "juze123@gmail.com" },
	{ id: 2, name: "Kaka", email: "kaka123@gmail.com" },
	{ id: 3, name: "Moisés", email: "moises123@gmail.com" },
];

server.get("/people", (req, res) => {
	return res.json(people);
});

server.get("/people/:id", (req, res) => {
	const id = parseInt(req.params.id);
	const person = people.find((item) => item.id === id);
	const status = person ? 200 : 404;

	return res.status(status).json(person);
});

server.post("/people", (req, res) => {
	const { name, email } = req.body;
	const id = people[people.length - 1].id + 1;

	const newPerson = { id, name, email };

	people.push(newPerson);

	return res.status(201).json(newPerson);
});

server.put("/people/:id", (req, res) => {
	const id = parseInt(req.params.id);
	const { name, email } = req.body;

	const index = people.findIndex((item) => item.id === id);
	const status = index >= 0 ? 200 : 404;

	if (index >= 0) {
		people[index] = { id, name, email };
	}

	return res.status(status).json(people[index]);
});

server.delete("/people/:id", (req, res) => {
	const id = parseInt(req.params.id);
	const index = people.findIndex((item) => item.id === id);
	const status = index ? 200 : 404;

	people.splice(index, 1);

	return res.status(status).json(people);
});

server.listen(8080);
