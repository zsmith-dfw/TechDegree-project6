const express = require("express");
const app = express();
const { projects } = require("./data.json");

app.set("view engine", "pug");
app.use("/static", express.static("public"));
app.get("/", (req, res) => {
  res.render("index", { projects });
});

app.get("/about", (req, res) => {
  res.render("about");
});
// Checks if project IDs exist
app.get("/projects/:id", (req, res) => {
  const projectId = req.params.id;
  const project = projects.find(({ id }) => id === +projectId);
    res.render("project", { project });
  
});

// Error Handler
app.use((req, res, next) => {
  const err = new Error("Oh no! This page does not exist");
  console.log("Unfortunately this page does not exist");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.error = err;
  res.status(err.status || 500);
  res.render("error", err);
});

app.listen(3000, () => {
  console.log("Hear you loud and clear on localhost:3000!");
});