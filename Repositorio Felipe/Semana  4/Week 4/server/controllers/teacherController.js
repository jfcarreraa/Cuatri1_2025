const Teacher = require("../models/teacherModel");

/**
 * Creates a Teacher
 *
 * @param {*} req
 * @param {*} res
 */
const teacherPost = (req, res) => {
  var teacher = new Teacher();

  teacher.username = req.body.username;
  teacher.firstName = req.body.firstName;
  teacher.lastName = req.body.lastName;

  if (teacher.username && teacher.firstName && teacher.lastName) {
    teacher.save(function (err) {
      if (err) {
        res.status(422);
        console.log('error while saving the teacher', err)
        res.json({
          error: 'There was an error saving the teacher'
        });
      }
      res.status(201);//CREATED
      res.header({
        'location': `http://localhost:3000/api/teacher/?id=${teacher.id}`
      });
      res.json(teacher);
    });
  } else {
    res.status(422);
    console.log('error while saving the Teacher')
    res.json({
      error: 'No valid data provided for Teacher'
    });
  }
};

/**
 * Get all Teacher
 *
 * @param {*} req
 * @param {*} res
 */
const teacherGet = (req, res) => {
  // if an specific Teacher is required
  if (req.query && req.query.id) {
    Teacher.findById(req.query.id, function (err, teacher) {
      if (err) {
        res.status(404);
        console.log('error while queryting the teacher', err)
        res.json({ error: "teacher doesnt exist" })
      }
      res.json(teacher);
    });
  } else {
    // get all Teacher
    Teacher.find(function (err, teacher) {
      if (err) {
        res.status(422);
        res.json({ "error": err });
      }
      res.json(teachers);
    });

  }
};

/**
 * Delete one Teacher
 *
 * @param {*} req
 * @param {*} res
 */
const teacherDelete = (req, res) => {
  // if an specific Teacher is required
  if (req.query && req.query.id) {
    Teacher.findById(req.query.id, function (err, teacher) {
      if (err) {
        res.status(500);
        console.log('error while queryting the teacher', err)
        res.json({ error: "teacher doesnt exist" })
      }
      //if the teacher exists
      if(teacher) {
        teacher.remove(function(err){
          if(err) {
            res.status(500).json({message: "There was an error deleting the teacher"});
          }
          res.status(204).json({});
        })
      } else {
        res.status(404);
        console.log('error while queryting the teacher', err)
        res.json({ error: "teacher doesnt exist" })
      }
    });
  } else {
    res.status(404).json({ error: "You must provide a Teacher ID" });
  }
};

/**
 * Updates a Teacher
 *
 * @param {*} req
 * @param {*} res
 */
const teacherPatch = (req, res) => {
  // get Teacher by id
  if (req.query && req.query.id) {
    Teacher.findById(req.query.id, function (err, teacher) {
      if (err) {
        res.status(404);
        console.log('error while queryting the teacher', err)
        res.json({ error: "teacher doesnt exist" })
      }

      // update the teacher object (patch)
      teacher.username = req.body.username ? req.body.username : teacher.username;
      teacher.firstName = req.body.firstName? req.body.firstName : teacher.firstName;
      teacher.lastName = req.body.lastName? req.body.lastName : teacher.lastName;
      // update the teacher object (put)
      // teacher.title = req.body.title
      // teacher.detail = req.body.detail

      teacher.save(function (err) {
        if (err) {
          res.status(422);
          console.log('error while saving the teacher', err)
          res.json({
            error: 'There was an error saving the teacher'
          });
        }
        res.status(200); // OK
        res.json(teacher);
      });
    });
  } else {
    res.status(404);
    res.json({ error: "Teacher doesnt exist" })
  }
};

module.exports = {
  teacherGet,
  teacherPost,
  teacherPatch,
  teacherDelete
}