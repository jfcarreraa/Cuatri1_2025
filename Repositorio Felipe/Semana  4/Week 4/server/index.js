const express = require('express');
const app = express();
// database connection
const mongoose = require("mongoose");
const db = mongoose.connect("mongodb+srv://jfcarreraa:MDBPassword117@cluster0.rkggp.mongodb.net/");

const {
  taskPatch,
  taskPost,
  taskGet,
  taskDelete
} = require("./controllers/taskController.js");

const {
  teacherPatch,
  teacherPost,
  teacherGet,
  teacherDelete
} = require("./controllers/teacherController.js");

// parser for the request body (required for the POST and PUT methods)
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// check for cors
const cors = require("cors");
app.use(cors({
  domains: '*',
  methods: "*"
}));


// listen to the task request
app.get("/api/tasks", taskGet);
app.post("/api/tasks", taskPost);
app.patch("/api/tasks", taskPatch);
app.put("/api/tasks", taskPatch);
app.delete("/api/tasks", taskDelete);

app.get("/api/teacher", teacherGet);
app.post("/api/teacher", teacherPost);
app.patch("/api/teacher", teacherPatch);
app.put("/api/teacher", teacherPatch);
app.delete("/api/teacher", teacherDelete);


app.listen(3000, () => console.log(`Example app listening on port 3000!`))
