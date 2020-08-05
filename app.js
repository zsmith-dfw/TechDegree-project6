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
  const project = projects[projectId];
  res.render("project", { project });
});

// 404 Error Handler
app.use((req, res, next) => {
  console.log("Unfortunately this page does not exist");
  const err = new Error();
  err.message = "Oh no! This page does not exist";
  err.status = 404;
  next(err);
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.log(`Global err handler caught a ${err.name}`);
  err.message = `Oops!  It looks like there's been a ${err.name} on the server.`;
  err.status = err.status || 500;
  res.status(err.status);
  res.render("error", { err });
});

app.listen(3000, () => {
  console.log("Hear you loud and clear on localhost:3000!");
});
