const express = require("express");

const server = express();
server.use(express.json());

server.listen(3000);

const projects = [
  {
    id: "1",
    title: "Teste"
  }
];

server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.post("/projects", (req, res) => {
  const { id, title } = req.body;

  const project = projects.push({
    id: id,
    title: title
  });

  return res.json(projects[project - 1]);
});

server.put("/projects/:id", (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  let index;

  index = projects.findIndex(item => item.id == id);

  projects[index].title = title;

  return res.json(projects[index]);
});

server.delete("/projects/:id", (req, res) => {
  const { id } = req.params;
  let index;

  index = projects.findIndex(item => item.id == id);

  if (index === -1) {
    return res.status(400).json({ error: "Project does not exists." });
  }

  projects.splice(index, 1);

  return res.json({ message: "Successfully deleted." });
});
