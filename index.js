const express = require("express");

const server = express();
server.use(express.json());

server.listen(3000);

const projects = [
  {
    id: "1",
    title: "Teste",
    tasks: []
  }
];

let requests_count = 1;

server.use((req, res, next) => {
  console.log(`Número de requisições: ${requests_count++}`);

  next();
});

function checkProjectExists(req, res, next) {
  const { id } = req.params;

  const project_exists = projects.findIndex(item => item.id == id);

  if (project_exists == -1) {
    return res.status(400).json({ error: "Parameter 'id' does exists." });
  }

  next();
}

server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.post("/projects", (req, res) => {
  const { id, title } = req.body;

  const project = {
    id,
    title,
    tasks: []
  };

  projects.push(project);

  return res.json(project);
});

server.put("/projects/:id", checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  let index;

  index = projects.findIndex(item => item.id == id);

  projects[index].title = title;

  return res.json(projects[index]);
});

server.delete("/projects/:id", checkProjectExists, (req, res) => {
  const { id } = req.params;
  let index;

  index = projects.findIndex(item => item.id == id);

  if (index === -1) {
    return res.status(400).json({ error: "Project does not exists." });
  }

  projects.splice(index, 1);

  return res.json({ message: "Successfully deleted." });
});

// Restoration performed
/* server.post("/projects/:id/tasks", checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const index = projects.findIndex(item => item.id == id);

  if (typeof projects[index].tasks === "undefined") {
    projects[index].tasks = [];
  }

  projects[index].tasks.push(title);

  return res.json(projects);
}); */

server.post("/projects/:id/tasks", checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.tasks.push(title);

  return res.json(project);
});
